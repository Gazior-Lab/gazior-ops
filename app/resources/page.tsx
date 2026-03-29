"use client";

import Layout from "@/components/Layout";
import {
  ArrowUpRight,
  Clock3,
  FileText,
  Filter,
  Folder,
  FolderKanban,
  Grid2x2,
  Link as LinkIcon,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Upload,
  Zap,
} from "lucide-react";

type Resource = {
  id: number;
  name: string;
  type: "Doc" | "File" | "Link";
  category: string;
  updated: string;
  pinned?: boolean;
  owner: string;
  status: "Active" | "Review" | "Archived";
  note: string;
};

export default function ResourcesPage() {
  const resources: Resource[] = [
    {
      id: 1,
      name: "Product Strategy Doc",
      type: "Doc",
      category: "Product",
      updated: "2d ago",
      pinned: true,
      owner: "Karim",
      status: "Active",
      note: "Core strategic direction, priorities, and market assumptions.",
    },
    {
      id: 2,
      name: "Design System Figma",
      type: "Link",
      category: "Design",
      updated: "1d ago",
      pinned: true,
      owner: "Sarah",
      status: "Active",
      note: "Main source of truth for UI components and premium interface patterns.",
    },
    {
      id: 3,
      name: "API Architecture",
      type: "Doc",
      category: "Engineering",
      updated: "5d ago",
      owner: "Rahim",
      status: "Review",
      note: "System structure, service boundaries, and implementation decisions.",
    },
    {
      id: 4,
      name: "Landing Page Assets",
      type: "File",
      category: "Marketing",
      updated: "3d ago",
      owner: "Nabila",
      status: "Active",
      note: "Campaign visuals, supporting assets, and launch-ready media files.",
    },
    {
      id: 5,
      name: "Research Summary Template",
      type: "Doc",
      category: "Knowledge",
      updated: "4d ago",
      owner: "Nabila",
      status: "Active",
      note: "Reusable format for turning interviews and experiments into structured insight.",
    },
    {
      id: 6,
      name: "Sprint Execution Board",
      type: "Link",
      category: "Operations",
      updated: "8h ago",
      owner: "Karim",
      status: "Active",
      note: "Live delivery tracking for priorities, blockers, and ownership.",
    },
    {
      id: 7,
      name: "Old Brand Assets Archive",
      type: "File",
      category: "Marketing",
      updated: "12d ago",
      owner: "Sarah",
      status: "Archived",
      note: "Previous brand materials kept for historical reference only.",
    },
  ];

  const stats = [
    {
      label: "Total resources",
      value: resources.length,
      subtext: "Files, docs, and links across the workspace",
      icon: Folder,
      accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
    },
    {
      label: "Documents",
      value: resources.filter((r) => r.type === "Doc").length,
      subtext: "Structured written sources of truth",
      icon: FileText,
      accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    },
    {
      label: "Links",
      value: resources.filter((r) => r.type === "Link").length,
      subtext: "Connected tools and external workspace references",
      icon: LinkIcon,
      accent: "text-amber-300 border-amber-400/20 bg-amber-400/10",
    },
    {
      label: "Pinned",
      value: resources.filter((r) => r.pinned).length,
      subtext: "High-value resources surfaced for fast access",
      icon: Star,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
  ];

  const categories = [
    "Product",
    "Design",
    "Engineering",
    "Marketing",
    "Knowledge",
    "Operations",
  ];

  const pinnedResources = resources.filter((r) => r.pinned);

  const resourceGroups = [
    {
      title: "Strategic docs",
      note: "Direction, planning, and core decisions",
      count: 5,
      icon: FolderKanban,
      accent: "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
    },
    {
      title: "Operational assets",
      note: "Execution materials and reusable working files",
      count: 7,
      icon: Grid2x2,
      accent: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    },
    {
      title: "Live references",
      note: "Links to external systems and real-time tools",
      count: 4,
      icon: LinkIcon,
      accent: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    },
  ];

  const getTypeStyle = (type: Resource["type"]) => {
    switch (type) {
      case "Doc":
        return "border-indigo-400/20 bg-indigo-400/10 text-indigo-300";
      case "Link":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      default:
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    }
  };

  const getStatusStyle = (status: Resource["status"]) => {
    switch (status) {
      case "Active":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      case "Review":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  return (
    <Layout currentPageName="Resources">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(139,92,246,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-blue-300" />
                Resource layer
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Central hub for resources, assets, and source material
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                Organize documents, links, files, and reusable assets so your
                team can access what matters fast, reduce duplication, and keep
                execution connected to the right source of truth.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Workspace mode
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Shared resource system
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Focus area
                  </p>
                  <p className="mt-1 text-sm font-medium text-cyan-300">
                    Findability + structure
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Operating signal
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    High-value resources centralized
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-90">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Resource health</p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  Well organized
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Key materials are visible, categorized, and easy to access.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Main opportunity</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Better filtering
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Improve metadata, tags, freshness signals, and ownership.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {stat.subtext}
                  </p>
                </div>
                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${stat.accent}`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Resource groups */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {resourceGroups.map((group) => (
            <div
              key={group.title}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border ${group.accent}`}
              >
                <group.icon className="h-5 w-5" />
              </div>

              <p className="text-sm font-semibold text-white">{group.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {group.note}
              </p>
              <p className="mt-4 text-2xl font-semibold text-white">
                {group.count}
              </p>
            </div>
          ))}
        </section>

        {/* Main */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left */}
          <div className="space-y-6 xl:col-span-8">
            {/* Categories */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Resource Categories
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Group resources by function so the team can retrieve the
                    right material faster.
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                  <Filter className="h-4 w-4" />
                  Filter library
                </button>
              </div>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-medium text-slate-300"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Pinned */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Pinned Resources
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    The highest-value items your team should always be able to
                    reach instantly.
                  </p>
                </div>

                <div className="inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300">
                  <Star className="h-3.5 w-3.5" />
                  Priority access
                </div>
              </div>

              <div className="space-y-3">
                {pinnedResources.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-[22px] border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            {r.name}
                          </p>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getTypeStyle(
                              r.type,
                            )}`}
                          >
                            {r.type}
                          </span>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                              r.status,
                            )}`}
                          >
                            {r.status}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {r.note}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                          <span>Category: {r.category}</span>
                          <span>Owner: {r.owner}</span>
                          <span>Updated: {r.updated}</span>
                        </div>
                      </div>

                      <Star className="h-4 w-4 text-yellow-300" />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* All resources */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Resource Library
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    A structured view of your documents, files, and connected
                    references.
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                  <Search className="h-4 w-4" />
                  Search resources
                </button>
              </div>

              <div className="space-y-3">
                {resources.map((r) => (
                  <div
                    key={r.id}
                    className="rounded-[22px] border border-white/8 bg-black/20 p-4 transition hover:bg-white/[0.05]"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            {r.name}
                          </p>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getTypeStyle(
                              r.type,
                            )}`}
                          >
                            {r.type}
                          </span>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                              r.status,
                            )}`}
                          >
                            {r.status}
                          </span>
                          {r.pinned && (
                            <span className="rounded-full border border-amber-400/20 bg-amber-400/10 px-2.5 py-1 text-[11px] font-medium text-amber-300">
                              Pinned
                            </span>
                          )}
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {r.note}
                        </p>

                        <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                          <span>Category: {r.category}</span>
                          <span>Owner: {r.owner}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="inline-flex items-center gap-1 text-xs text-slate-400">
                          <Clock3 className="h-3.5 w-3.5" />
                          {r.updated}
                        </span>

                        <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                          Open
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6 xl:col-span-4">
            {/* Quick actions */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Quick Actions
                  </h3>
                  <p className="text-sm text-slate-400">
                    Fast ways to add and maintain workspace resources
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05]">
                  <Upload className="h-4 w-4 text-cyan-300" />
                  Upload file
                </button>

                <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05]">
                  <FileText className="h-4 w-4 text-indigo-300" />
                  Create document
                </button>

                <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300 transition hover:bg-white/[0.05]">
                  <LinkIcon className="h-4 w-4 text-amber-300" />
                  Add link
                </button>
              </div>
            </div>

            {/* Resource health */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Resource Health
                  </h3>
                  <p className="text-sm text-slate-400">
                    Signals that determine how useful the library is
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Ownership clarity", value: "Strong" },
                  { label: "Freshness visibility", value: "Moderate" },
                  { label: "Duplicate control", value: "Improving" },
                  { label: "Access speed", value: "High" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
                  >
                    <span className="text-sm text-slate-300">{item.label}</span>
                    <span className="text-sm font-semibold text-white">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <ShieldCheck className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Resource Principles
                  </h3>
                  <p className="text-sm text-slate-400">
                    What makes a premium resource system useful
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Keep resources structured and easy to find",
                  "Avoid duplication and outdated source material",
                  "Attach ownership to important resources",
                  "Surface the most valuable items by default",
                  "Prioritize clarity over volume",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* System note */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-sm leading-6 text-slate-300">
                  A strong resource page is not just storage. It is a retrieval
                  system for the whole company, helping the team find the right
                  context, faster, with less friction.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1.5 text-xs font-medium text-cyan-300">
                  <Zap className="h-3.5 w-3.5" />
                  Find faster, execute better
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
