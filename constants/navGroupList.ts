import { NavGroupType } from "@/types/layout";
import {
  LayoutDashboard,
  ListTodo,
  Columns3,
  Users,
  Megaphone,
  FolderOpen,
  Target,
  BookOpen,
  Rocket,
  Sparkles,
  Inbox,
  Wallet,
} from "lucide-react";

export const navGroupList: NavGroupType[] = [
  {
    title: "Workspace",
    items: [
      {
        name: "Overview",
        icon: LayoutDashboard,
        page: "Overview",
        subtitle: "Monitor team momentum, priorities, and execution health.",
      },
      {
        name: "Roadmap",
        icon: Target,
        page: "Roadmap",
        subtitle:
          "Visualize milestones, dependencies, and delivery confidence.",
      },
      {
        name: "Execution",
        icon: ListTodo,
        page: "Execution",
        subtitle: "Track accountable work, progress, blockers, and deadlines.",
      },
      {
        name: "Board",
        icon: Columns3,
        page: "Board",
        subtitle:
          "Manage workflow visually across planning, review, and delivery.",
      },
    ],
  },
  {
    title: "Growth & Sales",
    items: [
      {
        name: "Leads",
        icon: Inbox,
        page: "Leads",
        subtitle: "Triage inbound inquiries and qualify cold outreach targets.",
      },
      {
        name: "Customers",
        icon: Wallet,
        page: "Customers",
        subtitle: "Track ICP alignment, sales funnels, and customer momentum.",
      },
    ],
  },
  {
    title: "Team & Knowledge",
    items: [
      {
        name: "Team",
        icon: Users,
        page: "Team",
        subtitle:
          "Clarify ownership, responsibilities, and contribution areas.",
      },
      {
        name: "Knowledge",
        icon: BookOpen,
        page: "Knowledge",
        subtitle:
          "Keep research, notes, SOPs, and learning resources organized.",
      },
      {
        name: "Resources",
        icon: FolderOpen,
        page: "Resources",
        subtitle:
          "Centralize assets, links, templates, and reusable materials.",
      },
    ],
  },
  {
    title: "Product",
    items: [
      {
        name: "Products",
        icon: Rocket,
        page: "Products",
        subtitle:
          "Follow product development, validation, and release readiness.",
      },
      {
        name: "Updates",
        icon: Megaphone,
        page: "Updates",
        subtitle: "Share announcements, team decisions, and important changes.",
      },
      {
        name: "Manifesto",
        icon: Sparkles,
        page: "Manifesto",
        subtitle:
          "Align the team around vision, values, and operating principles.",
      },
    ],
  },
];
