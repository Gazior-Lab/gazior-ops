"use client";

import Layout from "@/components/Layout";
import {
  AlertTriangle,
  ArrowUpRight,
  CheckCircle2,
  Filter,
  Flag,
  Layers3,
  ListChecks,
  PauseCircle,
  PlayCircle,
  ShieldAlert,
  Sparkles,
  Target,
  Users,
} from "lucide-react";

type Task = {
  id: number;
  title: string;
  owner: string;
  team: string;
  status: "Planned" | "In Progress" | "Review" | "Blocked" | "Done";
  priority: "Low" | "Medium" | "High" | "Critical";
  dueDate: string;
  initiative: string;
};

export default function ExecutionPage() {
  const tasks: Task[] = [
    {
      id: 1,
      title: "Finalize role-based visibility for workspace modules",
      owner: "Rahim",
      team: "Development",
      status: "In Progress",
      priority: "High",
      dueDate: "2026-04-04",
      initiative: "Core Collaboration Foundation",
    },
    {
      id: 2,
      title: "Refine premium header and shared page shell patterns",
      owner: "Sarah",
      team: "Design",
      status: "Review",
      priority: "High",
      dueDate: "2026-04-02",
      initiative: "Premium Design System v2",
    },
    {
      id: 3,
      title: "Create searchable taxonomy for internal learning resources",
      owner: "Nabila",
      team: "Knowledge",
      status: "Planned",
      priority: "Medium",
      dueDate: "2026-04-08",
      initiative: "Knowledge Hub & Learning Resources",
    },
    {
      id: 4,
      title: "Connect experiment tracking metrics to product dashboard",
      owner: "Karim",
      team: "Product",
      status: "Blocked",
      priority: "Critical",
      dueDate: "2026-04-01",
      initiative: "Product Tracking & Experiment Layer",
    },
    {
      id: 5,
      title: "Stabilize dashboard state handling across shared layout",
      owner: "Rahim",
      team: "Development",
      status: "Done",
      priority: "Medium",
      dueDate: "2026-03-28",
      initiative: "Core Collaboration Foundation",
    },
    {
      id: 6,
      title: "Design accountability card for team responsibility mapping",
      owner: "Sarah",
      team: "Design",
      status: "In Progress",
      priority: "High",
      dueDate: "2026-04-06",
      initiative: "Premium Design System v2",
    },
  ];

  const blockers = [
    {
      title: "Metrics schema still not finalized",
      owner: "Karim",
      impact: "Blocking product tracking visibility",
    },
    {
      title: "Search indexing approach needs approval",
      owner: "Nabila",
      impact: "Slowing knowledge hub execution",
    },
  ];

  const executionStreams = [
    {
      name: "Build",
      count: 7,
      note: "Implementation and active development",
      icon: PlayCircle,
      accent: "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
    },
    {
      name: "Review",
      count: 3,
      note: "Awaiting validation or stakeholder review",
      icon: Layers3,
      accent: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    },
    {
      name: "Blocked",
      count: 2,
      note: "Needs intervention to move forward",
      icon: PauseCircle,
      accent: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    },
    {
      name: "Completed",
      count: 12,
      note: "Delivered in the current execution cycle",
      icon: CheckCircle2,
      accent: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    },
  ];

  const totalTasks = tasks.length;
  const inProgress = tasks.filter(
    (task) => task.status === "In Progress",
  ).length;
  const review = tasks.filter((task) => task.status === "Review").length;
  const blocked = tasks.filter((task) => task.status === "Blocked").length;
  const done = tasks.filter((task) => task.status === "Done").length;
  const planned = tasks.filter((task) => task.status === "Planned").length;
  const completionRate = totalTasks ? Math.round((done / totalTasks) * 100) : 0;

  const getStatusStyle = (status: Task["status"]) => {
    switch (status) {
      case "In Progress":
        return "border-indigo-400/20 bg-indigo-400/10 text-indigo-300";
      case "Review":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      case "Blocked":
        return "border-rose-400/20 bg-rose-400/10 text-rose-300";
      case "Done":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const getPriorityStyle = (priority: Task["priority"]) => {
    switch (priority) {
      case "Critical":
        return "border-rose-400/20 bg-rose-400/10 text-rose-300";
      case "High":
        return "border-orange-400/20 bg-orange-400/10 text-orange-300";
      case "Medium":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const workload = [
    { name: "Rahim", focus: "Platform", active: 3, health: "High load" },
    { name: "Sarah", focus: "UI System", active: 2, health: "Healthy" },
    { name: "Nabila", focus: "Knowledge Ops", active: 2, health: "Moderate" },
    { name: "Karim", focus: "Product Tracking", active: 3, health: "At risk" },
  ];

  return (
    <Layout currentPageName="Execution">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(79,70,229,0.16),rgba(6,182,212,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
                Delivery command center
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Execution with clarity, ownership, and momentum
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                Turn roadmap priorities into visible, accountable work. Track
                progress, surface blockers early, and help the team focus on
                what moves delivery forward.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Current mode
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Sprint execution
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Focus area
                  </p>
                  <p className="mt-1 text-sm font-medium text-cyan-300">
                    Ownership + delivery flow
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Health signal
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {blocked > 0
                      ? `${blocked} issue(s) need escalation`
                      : "Execution is stable"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-90">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Completion rate</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {completionRate}%
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Completed tasks within current visible execution scope.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Execution health</p>
                <p
                  className={`mt-2 text-lg font-semibold ${blocked > 0 ? "text-amber-300" : "text-emerald-300"}`}
                >
                  {blocked > 0 ? "Needs focus" : "Healthy"}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Delivery is moving, with a few areas needing immediate
                  follow-up.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {[
            {
              label: "Total work",
              value: totalTasks,
              subtext: "Visible execution items",
              icon: ListChecks,
              accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
            },
            {
              label: "In progress",
              value: inProgress,
              subtext: "Currently being worked on",
              icon: PlayCircle,
              accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
            },
            {
              label: "In review",
              value: review,
              subtext: "Awaiting feedback or approval",
              icon: Layers3,
              accent: "text-amber-300 border-amber-400/20 bg-amber-400/10",
            },
            {
              label: "Blocked",
              value: blocked,
              subtext: "Needs intervention",
              icon: ShieldAlert,
              accent: "text-rose-300 border-rose-400/20 bg-rose-400/10",
            },
            {
              label: "Planned",
              value: planned,
              subtext: "Ready to be pulled next",
              icon: Target,
              accent: "text-slate-200 border-white/10 bg-white/5",
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
                  className={`flex h-8 2xl:h-12 w-8 2xl:w-12 items-center justify-center rounded-2xl border ${stat.accent}`}
                >
                  <stat.icon className="h-4 2xl:h-5 w-4 2xl:w-5" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Main grid */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left side */}
          <div className="space-y-6 xl:col-span-8">
            {/* Queue */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Execution Queue
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Work prioritized by ownership, urgency, and delivery state.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                    View board
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {tasks.map((task) => {
                  const isUrgent =
                    task.priority === "Critical" || task.status === "Blocked";

                  return (
                    <div
                      key={task.id}
                      className={`rounded-[22px] border p-4 transition ${
                        isUrgent
                          ? "border-rose-400/15 bg-rose-400/5"
                          : "border-white/8 bg-black/20"
                      }`}
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(task.status)}`}
                            >
                              {task.status}
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getPriorityStyle(task.priority)}`}
                            >
                              {task.priority} priority
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                              {task.team}
                            </span>
                          </div>

                          <h4 className="mt-3 text-base font-semibold text-white">
                            {task.title}
                          </h4>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                            <span>Owner: {task.owner}</span>
                            <span>Due: {task.dueDate}</span>
                            <span>Initiative: {task.initiative}</span>
                          </div>
                        </div>

                        <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs 2xl:text-sm text-slate-200 transition hover:bg-white/10">
                          Open item
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Streams */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5">
                <h3 className="text-lg font-semibold text-white">
                  Execution Streams
                </h3>
                <p className="mt-1 text-sm text-slate-400">
                  A quick operational view of where work is flowing right now.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-2">
                {executionStreams.map((stream) => (
                  <div
                    key={stream.name}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div
                        className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${stream.accent}`}
                      >
                        <stream.icon className="h-4.5 w-4.5" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium text-white">
                          {stream.name}
                        </p>
                        <p className="mt-1 text-xs leading-5 text-slate-400">
                          {stream.note}
                        </p>
                      </div>

                      <p className="text-3xl font-semibold tracking-tight text-white">
                        {stream.count}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6 xl:col-span-4">
            {/* Blockers */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
                  <AlertTriangle className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Active Blockers
                  </h3>
                  <p className="text-sm text-slate-400">
                    Issues slowing execution right now
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {blockers.map((blocker) => (
                  <div
                    key={blocker.title}
                    className="rounded-2xl border border-rose-400/10 bg-rose-400/5 p-4"
                  >
                    <p className="text-sm font-medium text-rose-200">
                      {blocker.title}
                    </p>
                    <p className="mt-2 text-xs text-slate-300">
                      Owner: {blocker.owner}
                    </p>
                    <p className="mt-1 text-xs leading-5 text-slate-400">
                      {blocker.impact}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Workload */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Ownership Load
                  </h3>
                  <p className="text-sm text-slate-400">
                    Who is carrying the most active work
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {workload.map((person) => (
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
                          person.health === "At risk"
                            ? "border-rose-400/20 bg-rose-400/10 text-rose-300"
                            : person.health === "High load"
                              ? "border-amber-400/20 bg-amber-400/10 text-amber-300"
                              : "border-white/10 bg-white/5 text-slate-300"
                        }`}
                      >
                        {person.health}
                      </span>
                    </div>

                    <div className="mt-3 flex items-center justify-between text-xs text-slate-400">
                      <span>Active items</span>
                      <span className="font-medium text-white">
                        {person.active}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Discipline */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <Flag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Execution Principles
                  </h3>
                  <p className="text-sm text-slate-400">
                    How the team should operate
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Every task must have one clear owner",
                  "Blocked work should be visible immediately",
                  "Review stage should be short and intentional",
                  "Priorities must connect to roadmap initiatives",
                  "Execution should create learning, not only output",
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
