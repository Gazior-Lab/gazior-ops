"use server";

import clientPromise from "@/lib/mongodb";
import { Lead, CreateLeadDTO, LeadStatus } from "@/types/leads";
import { calculateLeadStatus, formatLeadDate } from "@/utils/formatLeads";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const DB_NAME = process.env.MONGODB_DATABASE;
const COLLECTION_NAME = "inquiries";

// Helper function to connect to the specific database
async function getDb() {
  const client = await clientPromise;
  return client.db(DB_NAME); // Change to your actual DB name
}

/**
 * Fetch all leads from the database
 */
export async function getLeads(): Promise<Lead[]> {
  try {
    const db = await getDb();
    const leads = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    // Map MongoDB _id (ObjectId) and Dates to strings for the frontend
    return leads.map((lead) => {
      const formattedLeads: Lead = {
        id: lead._id.toString(),
        name: lead.name,
        role: lead.role,
        company: lead.company,
        email: lead.email,
        source: lead.source || "Inbound Form",
        interest: lead.interest,
        budget: lead.budget,
        status: "New",
        date: formatLeadDate(lead.createdAt), // Creates "Today, 09:24 AM"
      };

      return {
        ...formattedLeads,
        // Pass the raw MongoDB date as the second argument so the math works
        status: calculateLeadStatus(formattedLeads, lead.createdAt),
      };
    });
  } catch (error) {
    throw new Error(`Failed to fetch leads from the database. ${error}`);
  }
}

/**
 * Create a new lead (used by your contact form)
 */
export async function createLead(
  data: CreateLeadDTO,
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const db = await getDb();
    const result = await db.collection(COLLECTION_NAME).insertOne({
      ...data,
      status: "New",
      createdAt: new Date(),
    });

    revalidatePath("/leads");

    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Failed to create lead:", error);
    return { success: false, error: "Failed to save lead to the database." };
  }
}

/**
 * Update the status of an existing lead (e.g., qualifying them)
 */
export async function updateLeadStatus(
  id: string,
  status: LeadStatus,
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDb();
    await db
      .collection(COLLECTION_NAME)
      .updateOne(
        { _id: new ObjectId(id) },
        { $set: { status, updatedAt: new Date() } },
      );

    revalidatePath("/leads");

    return { success: true };
  } catch (error) {
    console.error("Failed to update lead status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

/**
 * Delete a lead
 */
export async function deleteLead(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDb();
    await db.collection("leads").deleteOne({ _id: new ObjectId(id) });

    revalidatePath("/leads");

    return { success: true };
  } catch (error) {
    console.error("Failed to delete lead:", error);
    return { success: false, error: "Failed to delete lead." };
  }
}
