export type LeadSource = "Inbound Form" | "Cold Outreach" | "Messenger";
export type LeadStatus = "New" | "Contacted" | "Evaluating" | "Unqualified";
export type Budget =
  | "<10k"
  | "10k-25k"
  | "25k-50k"
  | "50k-100k"
  | "100k+"
  | "not-sure";

export interface Lead {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  source: LeadSource;
  interest: string;
  budget: Budget;
  status: LeadStatus;
  date: string;
}

export interface CreateLeadDTO {
  name: string;
  role: string;
  company: string;
  email: string;
  source: LeadSource;
  interest: string;
  budget: Budget;
  createdAt: string;
}
