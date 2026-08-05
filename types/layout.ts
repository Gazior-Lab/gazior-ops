import { LucideProps } from "lucide-react";
import { ForwardRefExoticComponent, RefAttributes } from "react";

export type PageName =
  | "Overview"
  | "Roadmap"
  | "Execution"
  | "Board"
  | "Leads"
  | "Customers"
  | "Team"
  | "Knowledge"
  | "Resources"
  | "Products"
  | "Updates"
  | "Manifesto";

export interface NavItemType {
  name: string;
  subtitle: string;
  icon: ForwardRefExoticComponent<
    Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>
  >;
  page: string;
}

export interface NavGroupType {
  title: PageName;
  items: NavItemType[];
}
