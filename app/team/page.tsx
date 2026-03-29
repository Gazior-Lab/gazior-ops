"use client";

import Layout from "@/components/Layout";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  CircleDot,
  GitBranch,
  ShieldAlert,
  Sparkles,
  TrendingUp,
  UserRound,
  Users,
  Workflow,
  Zap,
} from "lucide-react";

type Member = {
  id: number;
  name: string;
  role: string;
  team: string;
  active: number;
  completed: number;
  focusLoad: "Low" | "Medium" | "High" | "Critical";
  dependency: number;
  health: "Healthy" | "Moderate" | "High load" | "At risk";
  ownership: string;
  collaboration: string[];
  strengths: string[];
};

export default function TeamPage() {
  const members: Member[] = [
    {
      id: 1,
      name: "Rahim",
      role: "Frontend Engineer",
      team: "Development",
      active: 3,
      completed: 8,
      focusLoad: "High",
      dependency: 4,
      health: "High load",
      ownership: "Workspace UI architecture and shared interaction patterns",
      collaboration: ["Sarah", "Karim"],
      strengths: ["Frontend systems", "Shared layout", "UI performance"],
    },
    {
      id: 2,
      name: "Sarah",
      role: "Product Designer",
      team: "Design",
      active: 2,
      completed: 6,
      focusLoad: "Medium",
      dependency: 2,
      health: "Healthy",
      ownership: "Premium design system and product experience quality",
      collaboration: ["Rahim", "Karim", "Nabila"],
      strengths: ["Design systems", "UX clarity", "Interface consistency"],
    },
    {
      id: 3,
      name: "Nabila",
      role: "Knowledge Lead",
      team: "Knowledge",
      active: 2,
      completed: 4,
      focusLoad: "Medium",
      dependency: 3,
      health: "Moderate",
      ownership: "Internal learning workflows and knowledge structure",
      collaboration: ["Sarah", "Karim"],
      strengths: ["Documentation", "Knowledge ops", "Research synthesis"],
    },
    {
      id: 4,
      name: "Karim",
      role: "Product Manager",
      team: "Product",
      active: 3,
      completed: 5,
      focusLoad: "Critical",
      dependency: 5,
      health: "At risk",
      ownership: "Product direction, prioritization, and execution alignment",
      collaboration: ["Rahim", "Sarah", "Nabila"],
      strengths: ["Prioritization", "Product thinking", "Cross-team alignment"],
    },
  ];

  const totalMembers = members.length;
  const atRisk = members.filter((m) => m.health === "At risk").length;
  const highLoad = members.filter((m) => m.health === "High load").length;
  const healthy = members.filter((m) => m.health === "Healthy").length;
  const totalActive = members.reduce((sum, m) => sum + m.active, 0);
  const totalCompleted = members.reduce((sum, m) => sum + m.completed, 0);
  const avgDependency = Math.round(
    members.reduce((sum, m) => sum + m.dependency, 0) / members.length,
  );

  const highestDependency = [...members].sort(
    (a, b) => b.dependency - a.dependency,
  )[0];

  const getHealthStyle = (health: Member["health"]) => {
    switch (health) {
      case "At risk":
        return "border-rose-400/20 bg-rose-400/10 text-rose-300";
      case "High load":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      case "Moderate":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      default:
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
    }
  };

  const getFocusStyle = (focus: Member["focusLoad"]) => {
    switch (focus) {
      case "Critical":
        return "border-rose-400/20 bg-rose-400/10 text-rose-300";
      case "High":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      case "Medium":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const getInitials = (name: string) =>
    name
      .split(" ")
      .map((part) => part[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const collaborationLinks = [
    {
      pair: "Design ↔ Product",
      note: "Strong alignment on direction, experience, and prioritization",
      strength: "High",
    },
    {
      pair: "Product ↔ Development",
      note: "Critical for execution flow and feature quality",
      strength: "High",
    },
    {
      pair: "Knowledge ↔ Product",
      note: "Research and structured learning support product decisions",
      strength: "Medium",
    },
    {
      pair: "Design ↔ Knowledge",
      note: "Helps maintain consistency across internal systems and docs",
      strength: "Moderate",
    },
  ];

  const teamPrinciples = [
    "Every critical workflow should have a backup owner",
    "Ownership should be visible before execution starts",
    "Collaboration quality matters as much as output volume",
    "Reduce dependency concentration on single contributors",
    "Team pages should reveal both momentum and structural risk",
  ];

  return (
    <Layout currentPageName="Team">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.14),rgba(79,70,229,0.10),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Team intelligence layer
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Build a stronger team system, not just a people list
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                See ownership, capacity, collaboration strength, and dependency
                risk in one premium view. This page helps your R&D team stay
                resilient as the company grows.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Team mode
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Cross-functional execution
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Focus area
                  </p>
                  <p className="mt-1 text-sm font-medium text-cyan-300">
                    Capacity + ownership clarity
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Structural signal
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {atRisk > 0
                      ? `${atRisk} member needs support`
                      : "Team structure looks stable"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-90">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Team health</p>
                <p
                  className={`mt-2 text-lg font-semibold ${
                    atRisk > 0 || highLoad > 0
                      ? "text-amber-300"
                      : "text-emerald-300"
                  }`}
                >
                  {atRisk > 0 || highLoad > 0 ? "Needs balancing" : "Healthy"}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Monitor load and reduce concentration around critical roles.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Dependency risk</p>
                <p className="mt-2 text-lg font-semibold text-rose-300">
                  {highestDependency.name}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Highest dependency owner with {highestDependency.dependency}{" "}
                  linked workstreams.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              label: "Team members",
              value: totalMembers,
              subtext: "Core contributors in active scope",
              icon: Users,
              accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
            },
            {
              label: "Active workload",
              value: totalActive,
              subtext: "Work currently distributed across team",
              icon: Zap,
              accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
            },
            {
              label: "Delivered",
              value: totalCompleted,
              subtext: "Completed outputs in visible cycle",
              icon: CheckCircle2,
              accent:
                "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
            },
            {
              label: "At risk",
              value: atRisk,
              subtext: "People needing immediate support",
              icon: ShieldAlert,
              accent: "text-rose-300 border-rose-400/20 bg-rose-400/10",
            },
            {
              label: "Avg dependency",
              value: avgDependency,
              subtext: "Average critical dependency count",
              icon: Workflow,
              accent: "text-amber-300 border-amber-400/20 bg-amber-400/10",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
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

        {/* Main content */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left */}
          <div className="space-y-6 xl:col-span-8">
            {/* Team roster */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Team Operating Roster
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Role clarity, current load, ownership area, and dependency
                    exposure for each contributor.
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                  View org detail
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {members.map((member) => (
                  <div
                    key={member.id}
                    className="rounded-[24px] border border-white/8 bg-black/20 p-5 transition hover:bg-white/[0.05]"
                  >
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-start lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-sm font-semibold text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                            {getInitials(member.name)}
                          </div>

                          <div className="min-w-0">
                            <h4 className="text-base font-semibold text-white">
                              {member.name}
                            </h4>
                            <p className="mt-1 text-sm text-slate-400">
                              {member.role} · {member.team}
                            </p>
                          </div>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getHealthStyle(member.health)}`}
                          >
                            {member.health}
                          </span>

                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getFocusStyle(member.focusLoad)}`}
                          >
                            {member.focusLoad} focus
                          </span>
                        </div>

                        <p className="mt-4 max-w-2xl text-sm leading-6 text-slate-300">
                          {member.ownership}
                        </p>

                        <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-4">
                          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                              Active
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">
                              {member.active}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                              Completed
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">
                              {member.completed}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                              Dependency
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">
                              {member.dependency}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                            <p className="text-[11px] uppercase tracking-[0.16em] text-slate-500">
                              Collaboration
                            </p>
                            <p className="mt-2 text-lg font-semibold text-white">
                              {member.collaboration.length}
                            </p>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {member.strengths.map((strength) => (
                            <span
                              key={strength}
                              className="rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-[11px] text-slate-300"
                            >
                              {strength}
                            </span>
                          ))}
                        </div>

                        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                          <span>
                            Collaborates with:{" "}
                            <span className="text-slate-300">
                              {member.collaboration.join(", ")}
                            </span>
                          </span>
                        </div>
                      </div>

                      <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                        View workload
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Collaboration map */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-white">
                  Collaboration Signals
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  Where cross-functional alignment is strong, and where it needs
                  more structure.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                {collaborationLinks.map((link) => (
                  <div
                    key={link.pair}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${
                          link.strength === "High"
                            ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                            : link.strength === "Medium"
                              ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                              : "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        <GitBranch className="h-4.5 w-4.5" />
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                          link.strength === "High"
                            ? "border-emerald-400/20 bg-emerald-400/10 text-emerald-300"
                            : link.strength === "Medium"
                              ? "border-cyan-400/20 bg-cyan-400/10 text-cyan-300"
                              : "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {link.strength}
                      </span>
                    </div>

                    <p className="mt-4 text-sm font-semibold text-white">
                      {link.pair}
                    </p>
                    <p className="mt-2 text-sm leading-6 text-slate-400">
                      {link.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6 xl:col-span-4">
            {/* Health summary */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <TrendingUp className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Team Health Snapshot
                  </h3>
                  <p className="text-sm text-slate-400">
                    Balance, resilience, and delivery readiness
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Healthy contributors", value: healthy },
                  { label: "High-load contributors", value: highLoad },
                  { label: "At-risk contributors", value: atRisk },
                  { label: "Dependency concentration", value: "Elevated" },
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

            {/* Team risks */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Structural Risks
                  </h3>
                  <p className="text-sm text-slate-400">
                    Team issues that can slow R&D execution
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Product direction is highly concentrated on one owner",
                  "Frontend delivery speed depends heavily on a small number of contributors",
                  "Knowledge operations need more redundancy as team complexity grows",
                  "Critical decisions should be documented earlier to reduce bottlenecks",
                ].map((risk) => (
                  <div
                    key={risk}
                    className="flex items-start gap-3 rounded-2xl border border-rose-400/10 bg-rose-400/5 p-4"
                  >
                    <CircleDot className="mt-0.5 h-4 w-4 text-rose-300" />
                    <p className="text-sm leading-6 text-slate-300">{risk}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Leadership notes */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <UserRound className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Leadership Notes
                  </h3>
                  <p className="text-sm text-slate-400">
                    Suggested actions for a stronger operating system
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Pair critical owners with backup contributors",
                  "Review high-dependency roles each sprint",
                  "Use shared docs for decisions before implementation starts",
                  "Promote collaboration between product, design, and knowledge",
                ].map((note) => (
                  <div
                    key={note}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <p className="text-sm leading-6 text-slate-300">{note}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <CheckCircle2 className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Team Principles
                  </h3>
                  <p className="text-sm text-slate-400">
                    How a premium R&D team should operate
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {teamPrinciples.map((item) => (
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
          </div>
        </section>
      </div>
    </Layout>
  );
}
