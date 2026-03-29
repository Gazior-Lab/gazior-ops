"use client";

import Layout from "@/components/Layout";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  GitBranch,
  Sparkles,
} from "lucide-react";

type Member = {
  id: number;
  name: string;
  role: string;
  team: string;
  active: number;
  completed: number;
  focusLoad: "Low" | "Medium" | "High" | "Critical";
  dependency: number; // how many tasks depend on this person
  health: "Healthy" | "Moderate" | "High load" | "At risk";
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
    },
  ];

  const atRisk = members.filter((m) => m.health === "At risk").length;

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
        return "text-rose-300";
      case "High":
        return "text-amber-300";
      case "Medium":
        return "text-cyan-300";
      default:
        return "text-slate-300";
    }
  };

  return (
    <Layout currentPageName="Team">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(6,182,212,0.16),rgba(79,70,229,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Team intelligence layer
              </div>

              <h2 className="text-3xl font-semibold text-white lg:text-4xl">
                People, capacity, and collaboration clarity
              </h2>

              <p className="mt-3 text-sm text-slate-300">
                Understand not just who is working, but how work flows through
                people. Detect overload, dependency risk, and ownership gaps
                early.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-90">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Team health</p>
                <p
                  className={`mt-2 text-lg font-semibold ${
                    atRisk ? "text-rose-300" : "text-emerald-300"
                  }`}
                >
                  {atRisk ? "Needs attention" : "Stable"}
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Dependency risk</p>
                <p className="mt-2 text-lg font-semibold text-amber-300">
                  High concentration
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* MEMBERS */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          <div className="xl:col-span-8 space-y-3">
            {members.map((m) => (
              <div
                key={m.id}
                className="rounded-[22px] border border-white/8 bg-black/20 p-5"
              >
                <div className="flex justify-between gap-4">
                  <div className="min-w-0 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`rounded-full border px-2 py-1 text-[11px] ${getHealthStyle(
                          m.health,
                        )}`}
                      >
                        {m.health}
                      </span>

                      <span className="text-xs text-slate-400">{m.team}</span>
                    </div>

                    <h4 className="mt-2 text-white font-medium">{m.name}</h4>

                    <p className="text-xs text-slate-400 mt-1">{m.role}</p>

                    <div className="mt-3 flex flex-wrap gap-4 text-xs text-slate-400">
                      <span>Active: {m.active}</span>
                      <span>Completed: {m.completed}</span>
                      <span
                        className={`font-medium ${getFocusStyle(m.focusLoad)}`}
                      >
                        Focus: {m.focusLoad}
                      </span>
                      <span>Dependencies: {m.dependency}</span>
                    </div>
                  </div>

                  <button className="text-xs text-slate-300 flex items-center gap-1">
                    View workload <ArrowUpRight className="h-3 w-3" />
                  </button>
                </div>
              </div>
            ))}
          </div>

          {/* RIGHT SIDE */}
          <div className="xl:col-span-4 space-y-6">
            {/* RISKS */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="flex items-center gap-2 mb-3">
                <AlertTriangle className="text-rose-300 h-4 w-4" />
                <h3 className="text-white text-sm font-medium">Team Risks</h3>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p>• Product decisions concentrated on one owner</p>
                <p>• Frontend delivery dependent on single contributor</p>
                <p>• Knowledge layer lacks redundancy</p>
              </div>
            </div>

            {/* COLLAB */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="flex items-center gap-2 mb-3">
                <GitBranch className="text-cyan-300 h-4 w-4" />
                <h3 className="text-white text-sm font-medium">
                  Collaboration Signals
                </h3>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p>• Cross-team collaboration active in Design ↔ Product</p>
                <p>• Development working in isolated streams</p>
                <p>• Knowledge team supporting multiple domains</p>
              </div>
            </div>

            {/* PRINCIPLES */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="flex items-center gap-2 mb-3">
                <CheckCircle2 className="text-emerald-300 h-4 w-4" />
                <h3 className="text-white text-sm font-medium">
                  Team Principles
                </h3>
              </div>

              <div className="space-y-3 text-sm text-slate-300">
                <p>• Reduce single points of failure</p>
                <p>• Balance cognitive load, not just tasks</p>
                <p>• Encourage shared ownership across domains</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
