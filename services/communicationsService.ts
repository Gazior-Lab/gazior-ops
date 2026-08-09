"use server";

import clientPromise from "@/lib/mongodb";
import {
  EmailAccountDTO,
  EmailThread,
  EmailTemplate,
  EmailMessage,
} from "@/types/Communication";
import { revalidatePath } from "next/cache";
import { ObjectId } from "mongodb"; // Fixed: Imported ObjectId

import { sendViaSmtp } from "@/lib/mailAdapter";

const DB_NAME = process.env.MONGODB_DATABASE;

async function getDb() {
  const client = await clientPromise;
  if (!DB_NAME) throw new Error("MONGODB_DATABASE is not defined");
  return client.db(DB_NAME);
}

// ==============================
// 1. Account Management
// ==============================

/**
 * Fetch connected accounts.
 * STRICT SECURITY: Never returns IMAP/SMTP credentials to the frontend.
 */
export async function getAccounts(): Promise<EmailAccountDTO[]> {
  try {
    const db = await getDb();
    const docs = await db.collection("email_accounts").find({}).toArray();

    return docs.map((doc) => {
      // Fixed: Delete sensitive fields directly to avoid unused variable errors
      const safeData = { ...doc };
      delete safeData.imapSettings;
      delete safeData.smtpSettings;

      return {
        ...safeData,
        _id: doc._id.toString(),
        email: doc.email || "",
        displayName: doc.displayName || "",
        provider: doc.provider || "IMAP/SMTP",
        status: doc.status || "disconnected",
        isDefault: doc.isDefault || false,
        lastSyncAt: doc.lastSyncAt,
        createdAt: doc.createdAt || Date.now().toString(),
      } as EmailAccountDTO;
    });
  } catch (error) {
    console.error("Failed to fetch email accounts:", error);
    return [];
  }
}

// ==============================
// 2. Inbox & Threads
// ==============================

/**
 * Fetch the active inbox threads.
 * Sorts by the most recently active messages.
 */
export async function getInboxThreads(): Promise<EmailThread[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection("email_threads")
      .find({})
      .sort({ lastMessageAt: -1 })
      .toArray();

    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      companyId: doc.companyId?.toString() || null,
      contactId: doc.contactId?.toString() || null,
      subject: doc.subject || "(No Subject)",
      participants: doc.participants || [],
      previewSnippet: doc.previewSnippet || "",
      isRead: doc.isRead || false,
      messageCount: doc.messageCount || 1,
      lastMessageAt: doc.lastMessageAt || Date.now().toString(),
      createdAt: doc.createdAt || Date.now().toString(),
    })) as EmailThread[];
  } catch (error) {
    console.error("Failed to fetch inbox threads:", error);
    return [];
  }
}

/**
 * Fetch all messages within a specific thread.
 */
export async function getThreadMessages(
  threadId: string,
): Promise<EmailMessage[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection("email_messages")
      .find({ threadId })
      .sort({ createdAt: 1 }) // Chronological order for reading
      .toArray();

    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      threadId: doc.threadId || "",
      accountId: doc.accountId || "",
      from: doc.from || { name: "", email: "" },
      to: doc.to || [],
      subject: doc.subject || "",
      textBody: doc.textBody || "",
      htmlBody: doc.htmlBody || "",
      hasAttachments: doc.hasAttachments || false,
      direction: doc.direction || "inbound",
      status: doc.status || "received",
      createdAt: doc.createdAt || Date.now().toString(),
    })) as EmailMessage[];
  } catch (error) {
    console.error(`Failed to fetch messages for thread ${threadId}:`, error);
    return [];
  }
}

// ==============================
// 3. Templates
// ==============================

export async function getTemplates(): Promise<EmailTemplate[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection("email_templates")
      .find({})
      .sort({ updatedAt: -1 })
      .toArray();

    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      name: doc.name || "",
      category: doc.category || "General",
      subject: doc.subject || "",
      body: doc.body || "",
      preview: doc.preview || "",
      createdAt: doc.createdAt || Date.now().toString(),
      updatedAt: doc.updatedAt || Date.now().toString(),
    })) as EmailTemplate[];
  } catch (error) {
    console.error("Failed to fetch templates:", error);
    return [];
  }
}

// ==============================
// 4. Outbound Operations
// ==============================

/**
 * Save an email as a draft without sending it.
 */
export async function saveDraft(messageData: Partial<EmailMessage>) {
  try {
    const db = await getDb();

    // Fixed: Exclude _id to prevent MongoDB driver type collision
    const { _id, ...insertData } = messageData;

    const draft = {
      ...insertData,
      status: "draft",
      createdAt: Date.now().toString(),
    };

    const result = await db.collection("email_messages").insertOne(draft);

    revalidatePath("/communications/drafts");
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Failed to save draft:", error);
    return { success: false, error: "Failed to save draft." };
  }
}

// ==============================
// 5. Active Sending
// ==============================

export async function sendEmail(data: {
  to: string;
  cc?: string;
  bcc?: string;
  subject: string;
  body: string;
  companyId?: string;
}) {
  try {
    const db = await getDb();

    // 1. Fetch the default connected account to send from
    const account = await db
      .collection("email_accounts")
      .findOne({ isDefault: true, status: "connected" });

    if (!account || !account.smtpSettings) {
      return {
        success: false,
        error:
          "No active default email account found. Please connect an account in Settings.",
      };
    }

    // NOTE: In production, you would decrypt account.smtpSettings.password here using your encryption key.
    const smtpConfig = {
      host: account.smtpSettings.host,
      port: account.smtpSettings.port,
      secure: account.smtpSettings.secure,
      username: account.smtpSettings.username,
      password: account.smtpSettings.password,
    };

    // 2. Send the email via the Adapter
    const providerMessageId = await sendViaSmtp(smtpConfig, {
      from: `"${account.displayName}" <${account.email}>`,
      to: data.to,
      cc: data.cc,
      bcc: data.bcc,
      subject: data.subject,
      textBody: data.body,
      htmlBody: data.body,
    });

    // 3. Find or Create the Thread for this CRM Company
    let threadId;

    if (data.companyId) {
      // Look for an existing thread for this company to append to
      const existingThread = await db
        .collection("email_threads")
        .findOne({ companyId: new ObjectId(data.companyId) });

      if (existingThread) {
        threadId = existingThread._id.toString();
        // Update thread metadata
        await db.collection("email_threads").updateOne(
          { _id: existingThread._id },
          {
            $set: {
              lastMessageAt: Date.now().toString(),
              previewSnippet: data.body.substring(0, 100),
            },
            $inc: { messageCount: 1 },
          },
        );
      }
    }

    // If no thread exists, create a new one
    if (!threadId) {
      const newThread = await db.collection("email_threads").insertOne({
        companyId: data.companyId ? new ObjectId(data.companyId) : null,
        subject: data.subject,
        participants: [data.to, account.email],
        previewSnippet: data.body.substring(0, 100),
        isRead: true, // Outbound messages are inherently read
        messageCount: 1,
        lastMessageAt: Date.now().toString(),
        createdAt: Date.now().toString(),
      });
      threadId = newThread.insertedId.toString();
    }

    // 4. Save the actual message to the database
    // Fixed: Removed explicit generic casting to allow MongoDB's driver to infer the Document shape safely without _id conflict
    const newMsg = {
      threadId,
      accountId: account._id.toString(),
      providerMessageId,
      from: { name: account.displayName, email: account.email },
      to: [{ name: "", email: data.to }], // Splitting comma-separated strings can be added here
      subject: data.subject,
      textBody: data.body,
      hasAttachments: false,
      direction: "outbound",
      status: "sent",
      sentAt: Date.now().toString(),
      createdAt: Date.now().toString(),
    };

    await db.collection("email_messages").insertOne(newMsg);

    // Revalidate UI
    revalidatePath("/communications");
    if (data.companyId) revalidatePath(`/companies/${data.companyId}`);

    return { success: true };
  } catch (error: unknown) {
    // Fixed: Strictly typed 'unknown' instead of 'any'
    console.error("Failed to send email:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to send email.";
    return { success: false, error: errorMessage };
  }
}

// ==============================
// 6. Connect New Mailbox
// ==============================

export async function connectAccount(data: {
  email: string;
  displayName: string;
  imapHost: string;
  imapPort: number;
  smtpHost: string;
  smtpPort: number;
  username: string;
  password: string; // Plaintext from form, backend will handle it securely
}) {
  try {
    const db = await getDb();

    // Check if account already exists
    const existing = await db
      .collection("email_accounts")
      .findOne({ email: data.email });
    if (existing) {
      return {
        success: false,
        error: "An account with this email is already connected.",
      };
    }

    // Check if this is the first account (make it default if so)
    const count = await db.collection("email_accounts").countDocuments();
    const isDefault = count === 0;

    // NOTE: In a production environment, you MUST encrypt `data.password`
    // using a symmetric encryption library (like Node's native `crypto` module)
    // before saving it to the database.

    const newAccount = {
      email: data.email,
      displayName: data.displayName,
      provider: "IMAP/SMTP",
      status: "connected",
      isDefault,
      lastSyncAt: Date.now().toString(),
      createdAt: Date.now().toString(),
      imapSettings: {
        host: data.imapHost,
        port: data.imapPort,
        secure: data.imapPort === 993, // Standard IMAP SSL port
        username: data.username,
        password: data.password, // ENCRYPT THIS IN PRODUCTION
      },
      smtpSettings: {
        host: data.smtpHost,
        port: data.smtpPort,
        secure: data.smtpPort === 465 || data.smtpPort === 587, // Standard SMTP SSL ports
        username: data.username,
        password: data.password, // ENCRYPT THIS IN PRODUCTION
      },
    };

    await db.collection("email_accounts").insertOne(newAccount);

    revalidatePath("/communications/accounts");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to connect account:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to connect account.";
    return { success: false, error: errorMessage };
  }
}

// ==============================
// 7. Template Management
// ==============================

export async function createTemplate(data: {
  name: string;
  category: string;
  subject: string;
  body: string;
}) {
  try {
    const db = await getDb();

    const newTemplate = {
      name: data.name,
      category: data.category,
      subject: data.subject,
      body: data.body,
      preview: data.body.substring(0, 120), // Auto-generate a preview snippet
      createdAt: Date.now().toString(),
      updatedAt: Date.now().toString(),
    };

    await db.collection("email_templates").insertOne(newTemplate);

    revalidatePath("/communications/templates");
    return { success: true };
  } catch (error: unknown) {
    console.error("Failed to create template:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Failed to create template.";
    return { success: false, error: errorMessage };
  }
}
