// ==============================
// Enums & Static Types
// ==============================

export type AccountStatus = "connected" | "error" | "disconnected" | "syncing";
export type MessageDirection = "inbound" | "outbound";
export type MessageStatus =
  | "draft"
  | "scheduled"
  | "sending"
  | "sent"
  | "received"
  | "failed";
export type TemplateCategory = "Sales" | "Client" | "General";

// ==============================
// 1. Email Accounts (Mailboxes)
// ==============================

export interface EmailAccount {
  _id?: string;
  email: string;
  displayName: string;
  provider: string; // e.g., "Custom IMAP/SMTP", "Google", "Microsoft"
  status: AccountStatus;
  isDefault: boolean;
  lastSyncAt?: string;
  createdAt: string;

  // NOTE: In the database, these will contain the actual encrypted credentials.
  // When sending this object to the frontend, these MUST be stripped out.
  imapSettings?: {
    host: string;
    port: number;
    secure: boolean;
    username: string;
  };
  smtpSettings?: {
    host: string;
    port: number;
    secure: boolean;
    username: string;
  };
}

// Frontend-safe version (DTO) that never exposes secrets
export type EmailAccountDTO = Omit<
  EmailAccount,
  "imapSettings" | "smtpSettings"
>;

// ==============================
// 2. Email Threads (Conversations)
// ==============================

export interface EmailThread {
  _id?: string;

  // CRM Association (The core of the module)
  companyId?: string | null;
  contactId?: string | null;

  // Thread Meta
  subject: string;
  participants: string[]; // Array of unique email addresses involved
  previewSnippet: string;

  // State
  isRead: boolean;
  messageCount: number;
  lastMessageAt: string;
  createdAt: string;
}

// ==============================
// 3. Email Messages (Individual Emails)
// ==============================

export interface EmailMessage {
  _id?: string;
  threadId: string; // Associates to EmailThread._id
  accountId: string; // The Gazior Ops account that sent/received this

  // Provider Identifiers (Crucial for preventing duplicates)
  providerMessageId?: string; // e.g., "<1234@mail.gmail.com>"
  inReplyTo?: string;
  references?: string[];

  // Routing
  from: { name: string; email: string };
  to: { name: string; email: string }[];
  cc?: { name: string; email: string }[];
  bcc?: { name: string; email: string }[];

  // Content
  subject: string;
  textBody: string;
  htmlBody?: string;
  hasAttachments: boolean;
  // attachments: FileReference[] // For V2 when connecting to file storage

  // State & Timing
  direction: MessageDirection;
  status: MessageStatus;
  scheduledFor?: string; // If status is "scheduled"
  sentAt?: string;
  receivedAt?: string;
  createdAt: string;
}

// ==============================
// 4. Email Templates
// ==============================

export interface EmailTemplate {
  _id?: string;
  name: string;
  category: TemplateCategory | string;
  subject: string;
  body: string; // Contains {{variables}}
  preview: string;
  createdAt: string;
  updatedAt: string;
}
