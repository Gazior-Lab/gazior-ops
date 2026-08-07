// ==============================
// Static Data & Strict Types
// ==============================

export const PRIMARY_OBJECTIVES = [
  "Modernize Business Operations",
  "Automate Manual Processes",
  "Connect Business Systems",
  "Improve Executive Reporting",
  "Build Internal Platform",
  "Improve Financial Visibility",
  "Scale Sales Operations",
  "Need Technical Consultation",
  "Not Sure Yet",
] as const;
export type PrimaryObjective = (typeof PRIMARY_OBJECTIVES)[number];

export const BUDGETS = [
  "Under $10k",
  "$10k – $25k",
  "$25k – $50k",
  "$50k – $100k",
  "$100k+",
  "Not Sure Yet",
] as const;
export type Budget = (typeof BUDGETS)[number];

export const CURRENT_SITUATIONS = [
  "We're relying on manual processes",
  "Our systems don't work together",
  "We need better reporting",
  "We're planning a new internal platform",
  "We're replacing an existing system",
  "We're scaling rapidly",
  "We're exploring possible solutions",
] as const;
export type CurrentSituation = (typeof CURRENT_SITUATIONS)[number];

export const EMPLOYEE_RANGES = [
  "1–10",
  "11–50",
  "51–200",
  "201–500",
  "500+",
] as const;
export type EmployeeRange = (typeof EMPLOYEE_RANGES)[number];

export const PROJECT_TIMELINES = [
  "Immediately",
  "Within 1 Month",
  "1–3 Months",
  "3–6 Months",
  "6+ Months",
  "Just Exploring",
] as const;
export type ProjectTimeline = (typeof PROJECT_TIMELINES)[number];

export const TECH_STACK_OPTIONS = [
  "HubSpot",
  "Salesforce",
  "Pipedrive",
  "Stripe",
  "QuickBooks",
  "Xero",
  "Shopify",
  "WooCommerce",
  "Power BI",
  "Tableau",
  "Looker",
  "Google Analytics",
  "Snowflake",
  "BigQuery",
  "PostgreSQL",
  "MySQL",
  "MongoDB",
  "AWS",
  "Azure",
  "Google Cloud",
  "Zapier",
  "Make",
  "Other",
] as const;
export type TechStack = (typeof TECH_STACK_OPTIONS)[number];

export const LEAD_SOURCES = [
  "Inbound Form",
  "Standalone Discovery Page",
  "Cold Outreach",
  "LinkedIn",
  "Referral",
  "Email",
  "Partner",
] as const;
export type LeadSource = (typeof LEAD_SOURCES)[number];

export const LIFECYCLE_STAGES = [
  "New Lead",
  "Discovery",
  "Qualified",
  "Proposal Sent",
  "Negotiation",
  "Won",
  "Lost",
  "Customer",
] as const;
export type LifecycleStage = (typeof LIFECYCLE_STAGES)[number];

export const LEAD_STATUSES = [
  "Questionnaire Pending",
  "Waiting for Discovery",
  "Discovery Completed",
  "Meeting Scheduled",
  "Proposal Sent",
  "Follow Up",
  "On Hold",
  "Closed",
] as const;
export type LeadStatus = (typeof LEAD_STATUSES)[number];

// ==============================
// Nested Intelligence Objects
// ==============================

export interface DiscoveryDetails {
  employees: EmployeeRange | string | null;
  budget: Budget | string;
  timeline: ProjectTimeline | string | null;
  currentSituation: CurrentSituation | string;
  techStack: TechStack[] | string[];
  additionalNotes: string;
}

export interface Qualification {
  score: number;
  priority: "Elite" | "High" | "Medium" | "Low" | null;
  recommendedService: string | null;
}

export interface AIAnalysis {
  summary: string;
  painPoints: string[];
  recommendations: string[];
  confidence: number;
}

// ==============================
// Main Company Lead Document
// (Represents the full MongoDB Document)
// ==============================

export interface CompanyLead {
  _id?: string;

  // Contact
  name: string;
  email: string;
  role: string;

  // Company Firmographics
  company: string;
  website: string;
  industry: string | null;
  country: string | null;
  businessType: string | null;

  // Initial Inquiry Context
  primaryObjective: PrimaryObjective | string;
  businessChallenge: string;

  // Pipeline Tracking
  source: LeadSource | string;
  lifecycleStage: LifecycleStage | string;
  status: LeadStatus | string;
  createdAt: string;
  updatedAt?: string;

  // Deep Intelligence
  discovery: DiscoveryDetails;
  qualification: Qualification;
  ai: AIAnalysis;
}

// ==============================
// Input DTOs (Data Transfer Objects)
// ==============================

export interface CreateInquiryInput {
  name: string;
  email: string;
  role?: string;
  company: string;
  website: string;
  primaryObjective: PrimaryObjective | string;
  businessChallenge: string;
  source?: LeadSource | string;
  createdAt?: string;

  // Optional discovery fields if filled via standalone page
  employees?: EmployeeRange | string | null;
  budget?: Budget | string;
  timeline?: ProjectTimeline | string | null;
  techStack?: TechStack[] | string[];
  currentSituation?: CurrentSituation | string;
  additionalNotes?: string;
}

export interface UpdateDiscoveryInput {
  employees?: EmployeeRange | string | null;
  timeline?: ProjectTimeline | string | null;
  techStack?: TechStack[] | string[];
  additionalNotes?: string;
  updatedAt?: string;
}

// ==============================
// Main Company Document
// (Represents the full MongoDB Document)
// ==============================

export interface Company {
  _id?: string;

  // Contact
  name: string;
  email: string;
  role: string;

  // Company Firmographics
  companyName: string; // Changed from 'company' to 'companyName' to avoid clashing with the interface name
  website: string;
  industry: string | null;
  country: string | null;
  businessType: string | null;

  // Initial Inquiry Context
  primaryObjective: PrimaryObjective | string;
  businessChallenge: string;

  // Pipeline Tracking
  source: LeadSource | string;
  lifecycleStage: LifecycleStage | string;
  status: LeadStatus | string;
  createdAt: string;
  updatedAt?: string;

  // Deep Intelligence
  discovery: DiscoveryDetails;
  qualification: Qualification;
  ai: AIAnalysis;
}
