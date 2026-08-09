import { NavGroupType } from "@/types/LayoutTypes";
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
  Building2,
  Wallet,
  Activity,
  Inbox,
  Send,
  FileEdit,
  Clock,
  LayoutTemplate,
  AtSign,
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
    title: "Growth",
    items: [
      {
        name: "Acquisition",
        icon: Activity,
        page: "Acquisition",
        subtitle: "Monitor website traffic, top pages, and visitor flow.",
      },
      {
        name: "Companies",
        icon: Building2,
        page: "Companies",
        subtitle:
          "Manage account intelligence, discovery, and sales pipelines.",
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
    title: "Communications",
    items: [
      {
        name: "Inbox",
        icon: Inbox,
        page: "communications", // Maps to /communications
        subtitle: "Manage incoming emails and active CRM threads.",
      },
      {
        name: "Sent",
        icon: Send,
        page: "communications/sent",
        subtitle: "Review your sent messages and follow-ups.",
      },
      {
        name: "Drafts",
        icon: FileEdit,
        page: "communications/drafts",
        subtitle: "Finish composed messages before sending.",
      },
      {
        name: "Scheduled",
        icon: Clock,
        page: "communications/scheduled",
        subtitle: "Emails queued for future delivery.",
      },
      {
        name: "Templates",
        icon: LayoutTemplate,
        page: "communications/email-templates",
        subtitle: "Manage reusable email templates with CRM variables.",
      },
      {
        name: "Accounts",
        icon: AtSign,
        page: "communications/accounts",
        subtitle: "Configure mailbox connections and sender profiles.",
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
