import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type PageName =
  | "Overview"
  | "Roadmap"
  | "Execution"
  | "Board"
  | "Companies"
  | "Leads"
  | "Customers"
  | "Team"
  | "Knowledge"
  | "Resources"
  | "Products"
  | "Updates"
  | "Manifesto"
  | "Acquisition"
  | "Inbox"
  | "Sent"
  | "Drafts"
  | "Scheduled"
  | "Templates"
  | "Accounts";

export interface NavItemType {
  name: PageName;
  subtitle: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  page: string;
}

export interface NavGroupType {
  title: string;
  items: NavItemType[];
}
