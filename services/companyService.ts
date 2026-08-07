"use server";

import clientPromise from "@/lib/mongodb";
import {
  Company,
  CreateInquiryInput,
  LeadStatus,
  LifecycleStage,
} from "@/types/InquiryTypes";
import { ObjectId } from "mongodb";
import { revalidatePath } from "next/cache";

const DB_NAME = process.env.MONGODB_DATABASE;
const COLLECTION_NAME = "inquiries"; // Shared collection with the public site

async function getDb() {
  const client = await clientPromise;
  if (!DB_NAME) throw new Error("MONGODB_DATABASE is not defined");
  return client.db(DB_NAME);
}

// 1. Fetch all companies for the Hub
export async function getCompanies(): Promise<Company[]> {
  try {
    const db = await getDb();
    const docs = await db
      .collection(COLLECTION_NAME)
      .find({})
      .sort({ createdAt: -1 })
      .toArray();

    return docs.map((doc) => ({
      ...doc,
      _id: doc._id.toString(),
      companyName: doc.companyName || doc.company || "", // Backward compatibility fallback
      primaryObjective: doc.primaryObjective || doc.interest || "Not Sure Yet",
      businessChallenge: doc.businessChallenge || doc.message || "",
      status: doc.status || "Questionnaire Pending",
      lifecycleStage: doc.lifecycleStage || "New Lead",
      createdAt: doc.createdAt || Date.now().toString(),
      discovery: doc.discovery || {},
      qualification: doc.qualification || {
        score: 0,
        priority: null,
        recommendedService: null,
      },
      ai: doc.ai || {
        summary: "",
        painPoints: [],
        recommendations: [],
        confidence: 0,
      },
    })) as Company[];
  } catch (error) {
    throw new Error(`Failed to fetch companies: ${error}`);
  }
}

// 2. Fetch a single company for the Intelligence Profile
export async function getCompanyById(id: string): Promise<Company | null> {
  try {
    const db = await getDb();
    const doc = await db
      .collection(COLLECTION_NAME)
      .findOne({ _id: new ObjectId(id) });

    if (!doc) return null;

    return {
      ...doc,
      _id: doc._id.toString(),
      companyName: doc.companyName || doc.company || "",
      primaryObjective: doc.primaryObjective || doc.interest || "Not Sure Yet",
      businessChallenge: doc.businessChallenge || doc.message || "",
      status: doc.status || "Questionnaire Pending",
      lifecycleStage: doc.lifecycleStage || "New Lead",
      createdAt: doc.createdAt || Date.now().toString(),
      discovery: doc.discovery || {},
      qualification: doc.qualification || {
        score: 0,
        priority: null,
        recommendedService: null,
      },
      ai: doc.ai || {
        summary: "",
        painPoints: [],
        recommendations: [],
        confidence: 0,
      },
    } as Company;
  } catch (error) {
    console.error(`Failed to fetch company with ID ${id}:`, error);
    return null;
  }
}

// 3. Create a new company (For manual entry via the Gazior Ops UI)
export async function createCompany(
  data: CreateInquiryInput,
): Promise<{ success: boolean; id?: string; error?: string }> {
  try {
    const db = await getDb();

    const newCompany = {
      name: data.name || "",
      email: data.email || "",
      role: data.role || "",
      companyName: data.company || "",
      website: data.website || "",
      industry: null,
      country: null,
      businessType: null,
      primaryObjective: data.primaryObjective || "Not Sure Yet",
      businessChallenge: data.businessChallenge || "",
      source: data.source || "Gazior Ops Manual Entry",
      status: "Questionnaire Pending",
      lifecycleStage: "New Lead",
      createdAt: data.createdAt || Date.now().toString(),
      discovery: {
        employees: data.employees || null,
        budget: data.budget || "Not Sure Yet",
        timeline: data.timeline || null,
        techStack: data.techStack || [],
        currentSituation:
          data.currentSituation || "We're exploring possible solutions",
        additionalNotes: data.additionalNotes || "",
      },
      qualification: { score: 0, priority: null, recommendedService: null },
      ai: { summary: "", painPoints: [], recommendations: [], confidence: 0 },
    };

    const result = await db.collection(COLLECTION_NAME).insertOne(newCompany);

    revalidatePath("/companies");
    return { success: true, id: result.insertedId.toString() };
  } catch (error) {
    console.error("Failed to create company:", error);
    return { success: false, error: "Failed to save company to the database." };
  }
}

// 4. Update Status & Lifecycle
export async function updateCompanyStatus(
  id: string,
  status: LeadStatus,
  lifecycleStage?: LifecycleStage,
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDb();
    const updateData: Record<string, string> = {
      status,
      updatedAt: Date.now().toString(),
    };

    if (lifecycleStage) {
      updateData.lifecycleStage = lifecycleStage;
    }

    await db
      .collection(COLLECTION_NAME)
      .updateOne({ _id: new ObjectId(id) }, { $set: updateData });

    revalidatePath("/companies");
    revalidatePath(`/companies/${id}`);
    return { success: true };
  } catch (error) {
    console.error("Failed to update company status:", error);
    return { success: false, error: "Failed to update status." };
  }
}

// 5. Delete a company
export async function deleteCompany(
  id: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const db = await getDb();
    await db.collection(COLLECTION_NAME).deleteOne({ _id: new ObjectId(id) });

    revalidatePath("/companies");
    return { success: true };
  } catch (error) {
    console.error("Failed to delete company:", error);
    return { success: false, error: "Failed to delete company." };
  }
}
