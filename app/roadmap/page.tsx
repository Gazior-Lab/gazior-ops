"use client";

import React from "react";
import Layout from "@/components/Layout";
import {
  ArrowUpRight,
  CalendarRange,
  CheckCircle2,
  Clock3,
  GitBranch,
  Rocket,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";

type Initiative = {
  id: number;
  title: string;
  category: string;
  owner: string;
  status: "On Track" | "In Review" | "At Risk" | "Planned";
  progress: number;
  dueDate: string;
  impact: string;
  confidence: number;
  summary: string;
  dependencies: string[];
  milestones: {
    name: string;
    date: string;
    done: boolean;
  }[];
};

export default function RoadmapPage() {
  const initiatives: Initiative[] = [
    {
      id: 1,
      title: "Core Collaboration Foundation",
      category: "Platform",
      owner: "Rahim",
      status: "On Track",
      progress: 76,
      dueDate: "2026-04-20",
      impact: "High",
      confidence: 87,
      summary:
        "Stabilize workspace architecture, role-based flows, task ownership visibility, and team collaboration foundations.",
      dependencies: ["Auth System", "Team Permissions", "Activity Feed"],
      milestones: [
        { name: "Access control defined", date: "2026-03-12", done: true },
        {
          name: "Workspace structure finalized",
          date: "2026-03-21",
          done: true,
        },
        { name: "Role visibility shipped", date: "2026-04-05", done: false },
        { name: "Collaboration core release", date: "2026-04-20", done: false },
      ],
    },
    {
      id: 2,
      title: "Premium Design System v2",
      category: "Design",
      owner: "Sarah",
      status: "In Review",
      progress: 61,
      dueDate: "2026-04-14",
      impact: "High",
      confidence: 79,
      summary:
        "Create a premium and consistent interface language across dashboard, roadmap, product tracking, and learning modules.",
      dependencies: [
        "Brand Tokens",
        "Navigation Refresh",
        "Reusable UI Patterns",
      ],
      milestones: [
        { name: "Visual direction approved", date: "2026-03-10", done: true },
        { name: "Layout system refactor", date: "2026-03-25", done: true },
        { name: "Component library rollout", date: "2026-04-08", done: false },
        { name: "UI consistency audit", date: "2026-04-14", done: false },
      ],
    },
    {
      id: 3,
      title: "Knowledge Hub & Learning Resources",
      category: "Knowledge",
      owner: "Nabila",
      status: "Planned",
      progress: 34,
      dueDate: "2026-05-02",
      impact: "Medium",
      confidence: 72,
      summary:
        "Centralize SOPs, research notes, onboarding resources, and reusable documents to improve team learning speed.",
      dependencies: ["Resource Taxonomy", "Search Layer", "Tagging Model"],
      milestones: [
        { name: "Content structure defined", date: "2026-03-30", done: true },
        { name: "Taxonomy and tags", date: "2026-04-10", done: false },
        { name: "Internal search connected", date: "2026-04-22", done: false },
        { name: "Knowledge hub launch", date: "2026-05-02", done: false },
      ],
    },
    {
      id: 4,
      title: "Product Tracking & Experiment Layer",
      category: "Product",
      owner: "Karim",
      status: "At Risk",
      progress: 42,
      dueDate: "2026-04-28",
      impact: "High",
      confidence: 58,
      summary:
        "Enable product-level initiative tracking, experiment visibility, validation notes, and release-readiness insight.",
      dependencies: [
        "Metrics Model",
        "Experiment Templates",
        "Release Checklist",
      ],
      milestones: [
        { name: "Experiment schema drafted", date: "2026-03-18", done: true },
        {
          name: "Tracking dashboard connected",
          date: "2026-04-03",
          done: false,
        },
        { name: "Validation summaries added", date: "2026-04-15", done: false },
        { name: "Release readiness view", date: "2026-04-28", done: false },
      ],
    },
  ];

  const timeline = [
    {
      phase: "Now",
      window: "March",
      items: ["UI refinement", "Ownership clarity", "Roadmap structure"],
    },
    {
      phase: "Next",
      window: "April",
      items: [
        "Design system rollout",
        "Tracking workflows",
        "Execution visibility",
      ],
    },
    {
      phase: "Later",
      window: "May",
      items: [
        "Knowledge hub maturity",
        "Experiment intelligence",
        "Operational polish",
      ],
    },
  ];

  const roadmapStats = [
    {
      label: "Active initiatives",
      value: initiatives.length,
      subtext: "Current roadmap scope",
      icon: Target,
      accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
    },
    {
      label: "On track",
      value: initiatives.filter((i) => i.status === "On Track").length,
      subtext: "Healthy delivery momentum",
      icon: CheckCircle2,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
    {
      label: "Average confidence",
      value: `${Math.round(
        initiatives.reduce((sum, item) => sum + item.confidence, 0) /
          initiatives.length,
      )}%`,
      subtext: "Delivery confidence signal",
      icon: Sparkles,
      accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    },
    {
      label: "At risk",
      value: initiatives.filter((i) => i.status === "At Risk").length,
      subtext: "Needs leadership attention",
      icon: ShieldAlert,
      accent: "text-rose-300 border-rose-400/20 bg-rose-400/10",
    },
  ];

  const getStatusStyle = (status: Initiative["status"]) => {
    switch (status) {
      case "On Track":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      case "In Review":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      case "At Risk":
        return "border-rose-400/20 bg-rose-400/10 text-rose-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const getProgressBarStyle = (status: Initiative["status"]) => {
    switch (status) {
      case "On Track":
        return "from-emerald-400 via-teal-400 to-cyan-400";
      case "In Review":
        return "from-amber-400 via-orange-400 to-yellow-400";
      case "At Risk":
        return "from-rose-400 via-pink-400 to-orange-400";
      default:
        return "from-indigo-400 via-violet-400 to-cyan-400";
    }
  };

  return (
    <Layout currentPageName="Roadmap">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.16),rgba(34,211,238,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <CalendarRange className="h-3.5 w-3.5 text-indigo-300" />
                Strategic delivery view
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Roadmap that connects vision to execution
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                Visualize the initiatives that matter most, monitor delivery
                confidence, expose dependencies, and help every team member
                understand where their work fits.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Current cycle
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Q2 Delivery Acceleration
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Strategic focus
                  </p>
                  <p className="mt-1 text-sm font-medium text-cyan-300">
                    Clarity, velocity, ownership
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Executive summary
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Strong momentum with targeted risk areas
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-90">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Delivery horizon</p>
                <p className="mt-2 text-lg font-semibold text-white">90 Days</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Short-term roadmap aligned to immediate team execution.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Roadmap health</p>
                <p className="mt-2 text-lg font-semibold text-emerald-300">
                  Stable
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Good trajectory, but dependencies need active management.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {roadmapStats.map((stat) => (
            <StatCard
              key={stat.label}
              value={stat.value}
              icon={stat.icon}
              subtitle={stat.subtext}
              title={stat.label}
              accent={stat.accent}
            />
          ))}
        </section>

        {/* Main grid */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left */}
          <div className="space-y-6 xl:col-span-8">
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Strategic Initiatives
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    High-impact initiatives organized by ownership, confidence,
                    and delivery momentum.
                  </p>
                </div>

                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                  View all milestones
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {initiatives.map((initiative) => (
                  <div
                    key={initiative.id}
                    className="rounded-3xl border border-white/8 bg-black/20 p-5"
                  >
                    <div className="flex flex-col gap-5">
                      <div className="flex flex-col gap-4 lg:items-start lg:justify-between">
                        <div className="w-full">
                          <div className="flex flex-wrap items-center gap-2">
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                              {initiative.category}
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                                initiative.status,
                              )}`}
                            >
                              {initiative.status}
                            </span>
                            <span className="rounded-full border border-cyan-400/20 bg-cyan-400/10 px-2.5 py-1 text-[11px] font-medium text-cyan-300">
                              {initiative.impact} impact
                            </span>
                          </div>

                          <h4 className="mt-3 text-lg font-semibold text-white">
                            {initiative.title}
                          </h4>

                          <p className="mt-2 max-w-3xl text-sm leading-6 text-slate-400">
                            {initiative.summary}
                          </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 lg:w-100.7">
                          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                              Owner
                            </p>
                            <p className="mt-2 text-sm font-medium text-white">
                              {initiative.owner}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                              Due
                            </p>
                            <p className="mt-2 text-sm font-medium text-white">
                              {initiative.dueDate}
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                              Progress
                            </p>
                            <p className="mt-2 text-sm font-medium text-white">
                              {initiative.progress}%
                            </p>
                          </div>

                          <div className="rounded-2xl border border-white/8 bg-white/3 p-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                              Confidence
                            </p>
                            <p className="mt-2 text-sm font-medium text-white">
                              {initiative.confidence}%
                            </p>
                          </div>
                        </div>
                      </div>

                      <div>
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="text-slate-400">
                            Delivery progress
                          </span>
                          <span className="font-medium text-white">
                            {initiative.progress}%
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full bg-white/10">
                          <div
                            className={`h-2.5 rounded-full bg-linear-to-r ${getProgressBarStyle(
                              initiative.status,
                            )}`}
                            style={{ width: `${initiative.progress}%` }}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4 lg:grid-cols-2">
                        <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <GitBranch className="h-4 w-4 text-slate-400" />
                            <h5 className="text-sm font-medium text-white">
                              Dependencies
                            </h5>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {initiative.dependencies.map((dependency) => (
                              <span
                                key={dependency}
                                className="rounded-full border border-white/10 bg-black/20 px-3 py-1.5 text-xs text-slate-300"
                              >
                                {dependency}
                              </span>
                            ))}
                          </div>
                        </div>

                        <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                          <div className="mb-3 flex items-center gap-2">
                            <Clock3 className="h-4 w-4 text-slate-400" />
                            <h5 className="text-sm font-medium text-white">
                              Milestones
                            </h5>
                          </div>

                          <div className="space-y-3">
                            {initiative.milestones.map((milestone) => (
                              <div
                                key={milestone.name}
                                className="flex items-start justify-between gap-3"
                              >
                                <div className="flex items-start gap-2">
                                  <div
                                    className={`mt-0.5 h-2.5 w-2.5 rounded-full ${
                                      milestone.done
                                        ? "bg-emerald-400"
                                        : "bg-slate-500"
                                    }`}
                                  />
                                  <div>
                                    <p className="text-sm text-slate-200">
                                      {milestone.name}
                                    </p>
                                    <p className="text-xs text-slate-500">
                                      {milestone.date}
                                    </p>
                                  </div>
                                </div>

                                {milestone.done && (
                                  <span className="text-[11px] font-medium text-emerald-300">
                                    Done
                                  </span>
                                )}
                              </div>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6 xl:col-span-4">
            {/* Timeline */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                  <CalendarRange className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Delivery Horizon
                  </h3>
                  <p className="text-sm text-slate-400">
                    Near-term roadmap framing
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                {timeline.map((phase, index) => (
                  <div
                    key={phase.phase}
                    className="relative rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    {index !== timeline.length - 1 && (
                      <div className="absolute left-6.75 top-14 h-8 w-px bg-white/10" />
                    )}

                    <div className="flex gap-3">
                      <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-white/10 bg-white/5 text-xs font-semibold text-white">
                        {index + 1}
                      </div>

                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            {phase.phase}
                          </p>
                          <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                            {phase.window}
                          </span>
                        </div>

                        <div className="mt-3 flex flex-wrap gap-2">
                          {phase.items.map((item) => (
                            <span
                              key={item}
                              className="rounded-full border border-white/10 bg-white/3 px-2.5 py-1 text-[11px] text-slate-300"
                            >
                              {item}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Ownership */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Ownership Signals
                  </h3>
                  <p className="text-sm text-slate-400">
                    Who is driving the roadmap
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  {
                    name: "Rahim",
                    focus: "Platform & architecture",
                    load: "High",
                  },
                  {
                    name: "Sarah",
                    focus: "Design system & UX quality",
                    load: "Medium",
                  },
                  {
                    name: "Nabila",
                    focus: "Knowledge structure",
                    load: "Medium",
                  },
                  { name: "Karim", focus: "Product tracking", load: "High" },
                ].map((person) => (
                  <div
                    key={person.name}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {person.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {person.focus}
                        </p>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${
                          person.load === "High"
                            ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                            : "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {person.load} load
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Product vision fit */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <Rocket className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Vision Alignment
                  </h3>
                  <p className="text-sm text-slate-400">
                    Why this roadmap matters
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Make project plans visually understandable",
                  "Clarify team roles and responsibility ownership",
                  "Centralize learning resources and research",
                  "Track products and experiments with confidence",
                  "Build a motivating premium internal workspace",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-cyan-400" />
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
