"use client";

import Layout from "@/components/Layout";
import {
  ArrowUpRight,
  BookOpen,
  BrainCircuit,
  FileText,
  FlaskConical,
  FolderKanban,
  Layers3,
  Library,
  Search,
  ShieldCheck,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

type Playbook = {
  title: string;
  description: string;
  tag: string;
  status: "Core" | "Operational" | "Growing";
};

type ResearchItem = {
  title: string;
  description: string;
  category: string;
  freshness: "New" | "Active" | "Reference";
};

type KnowledgeAsset = {
  name: string;
  type: string;
};

export default function KnowledgePage() {
  const playbooks: Playbook[] = [
    {
      title: "Product Discovery Framework",
      description:
        "A repeatable system for validating ideas, identifying user pain points, and deciding what deserves investment.",
      tag: "Core",
      status: "Core",
    },
    {
      title: "Launch Readiness Checklist",
      description:
        "Operational checklist covering product quality, team readiness, communication, and release confidence.",
      tag: "Execution",
      status: "Operational",
    },
    {
      title: "Experiment Review Workflow",
      description:
        "How the team documents experiment setup, interprets results, and converts findings into decisions.",
      tag: "Learning",
      status: "Growing",
    },
  ];

  const research: ResearchItem[] = [
    {
      title: "User Interview Insights - v1",
      description:
        "Patterns from early customer conversations, friction points, and recurring unmet needs.",
      category: "Research",
      freshness: "New",
    },
    {
      title: "Market Positioning Notes",
      description:
        "Competitive insights, differentiation angles, and evolving messaging opportunities.",
      category: "Strategy",
      freshness: "Active",
    },
    {
      title: "Onboarding Friction Review",
      description:
        "What users struggle with during first-use experience and what that means for product priorities.",
      category: "Product Learning",
      freshness: "Active",
    },
    {
      title: "Internal Decision Archive",
      description:
        "Historical decisions, tradeoffs, and context for why the team chose certain directions.",
      category: "Reference",
      freshness: "Reference",
    },
  ];

  const assets: KnowledgeAsset[] = [
    { name: "UI Component Library", type: "System" },
    { name: "Experiment Templates", type: "Template" },
    { name: "Design Tokens", type: "System" },
    { name: "Internal Docs Structure", type: "Ops" },
    { name: "Sprint Retrospective Template", type: "Template" },
    { name: "Research Summary Format", type: "Template" },
  ];

  const activeLearning = [
    "Improving onboarding flow based on user friction",
    "Experiment tracking system design",
    "Knowledge tagging and search structure",
    "Turning delivery updates into reusable institutional memory",
  ];

  const principles = [
    "Document learnings before they disappear",
    "Capture reasoning, not only outcomes",
    "Keep knowledge close to execution",
    "Make important insights reusable across teams",
    "Prefer structured systems over scattered notes",
  ];

  const knowledgePillars = [
    {
      title: "Playbooks",
      note: "Repeatable operating workflows",
      icon: Layers3,
      accent: "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
    },
    {
      title: "Research",
      note: "What the team is learning from reality",
      icon: FlaskConical,
      accent: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    },
    {
      title: "Assets",
      note: "Reusable systems, templates, and resources",
      icon: FolderKanban,
      accent: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    },
    {
      title: "Memory",
      note: "Institutional context and decision history",
      icon: Library,
      accent: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    },
  ];

  const stats = [
    {
      label: "Total resources",
      value: 24,
      subtext: "Structured knowledge across the workspace",
      icon: BookOpen,
      accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
    },
    {
      label: "Playbooks",
      value: 6,
      subtext: "Operational frameworks and guides",
      icon: Layers3,
      accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    },
    {
      label: "Research notes",
      value: 12,
      subtext: "Insights, interviews, and findings",
      icon: FlaskConical,
      accent: "text-amber-300 border-amber-400/20 bg-amber-400/10",
    },
    {
      label: "Reusable assets",
      value: 8,
      subtext: "Templates, systems, and shared resources",
      icon: FolderKanban,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
  ];

  const getFreshnessStyle = (freshness: ResearchItem["freshness"]) => {
    switch (freshness) {
      case "New":
        return "border-indigo-400/20 bg-indigo-400/10 text-indigo-300";
      case "Active":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const getStatusStyle = (status: Playbook["status"]) => {
    switch (status) {
      case "Core":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      case "Operational":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      default:
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
    }
  };

  return (
    <Layout currentPageName="Knowledge">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(99,102,241,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Learning layer
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Turn knowledge into execution advantage
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                Capture insights, preserve decisions, reuse proven workflows,
                and keep institutional knowledge close to the work that drives
                product progress.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    System role
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Shared team memory
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Focus area
                  </p>
                  <p className="mt-1 text-sm font-medium text-cyan-300">
                    Reuse + learning velocity
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Knowledge health
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Growing with structure
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-90">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Knowledge signal</p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">
                  Compounding
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  The team is building reusable intelligence, not just isolated
                  notes.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Main opportunity</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Better retrieval
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Improve tagging, linking, and decision traceability.
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

        {/* Knowledge pillars */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {knowledgePillars.map((pillar) => (
            <div
              key={pillar.title}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl"
            >
              <div
                className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl border ${pillar.accent}`}
              >
                <pillar.icon className="h-5 w-5" />
              </div>
              <p className="text-sm font-semibold text-white">{pillar.title}</p>
              <p className="mt-2 text-sm leading-6 text-slate-400">
                {pillar.note}
              </p>
            </div>
          ))}
        </section>

        {/* Main */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left */}
          <div className="space-y-6 xl:col-span-8">
            {/* Playbooks */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Playbooks & Operating Systems
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Structured workflows that make team execution more
                    repeatable and less dependent on memory.
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                  Open library
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {playbooks.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                              item.status,
                            )}`}
                          >
                            {item.status}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
                            {item.tag}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      </div>

                      <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                        Open playbook
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-white">
                  Research & Insight Repository
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Learning generated from users, market signals, product work,
                  and internal reflection.
                </p>
              </div>

              <div className="space-y-3">
                {research.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-[22px] border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex flex-col gap-3 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            {item.title}
                          </p>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getFreshnessStyle(
                              item.freshness,
                            )}`}
                          >
                            {item.freshness}
                          </span>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
                            {item.category}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {item.description}
                        </p>
                      </div>

                      <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                        View note
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Reusable assets */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-white">
                  Reusable Assets
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Shared building blocks that help the team move faster with
                  consistency.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-3">
                {assets.map((item) => (
                  <div
                    key={item.name}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-cyan-300">
                        <FileText className="h-4.5 w-4.5" />
                      </div>
                      <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] text-slate-300">
                        {item.type}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-medium text-white">
                      {item.name}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6 xl:col-span-4">
            {/* Active learning */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Zap className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Active Learning
                  </h3>
                  <p className="text-sm text-slate-400">
                    What the team is trying to understand right now
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {activeLearning.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <Zap className="mt-1 h-4 w-4 text-cyan-300" />
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Retrieval health */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                  <Search className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Retrieval Quality
                  </h3>
                  <p className="text-sm text-slate-400">
                    How discoverable and reusable the knowledge layer is
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Tagging structure", value: "Improving" },
                  { label: "Decision traceability", value: "Moderate" },
                  { label: "Reusable formats", value: "Strong" },
                  { label: "Cross-team access", value: "Healthy" },
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
                    Knowledge Principles
                  </h3>
                  <p className="text-sm text-slate-400">
                    How the team should treat learning as infrastructure
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {principles.map((item) => (
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

            {/* Knowledge note */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-amber-400/20 bg-amber-400/10 text-amber-300">
                  <BrainCircuit className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    System Note
                  </h3>
                  <p className="text-sm text-slate-400">
                    A premium knowledge system should do more than store files
                  </p>
                </div>
              </div>

              <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                <p className="text-sm leading-6 text-slate-300">
                  The strongest R&D teams treat knowledge as an operating layer:
                  searchable, reusable, connected to decisions, and directly
                  useful inside execution.
                </p>

                <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-400/10 px-3 py-1.5 text-xs font-medium text-amber-300">
                  <Star className="h-3.5 w-3.5" />
                  Make learning compound
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
