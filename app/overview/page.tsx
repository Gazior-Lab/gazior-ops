"use client";

import React from "react";
import Layout from "@/components/Layout";
import {
  ArrowUpRight,
  CheckCircle2,
  AlertTriangle,
  Clock,
  ListTodo,
  Megaphone,
  Target,
  Users,
  BookOpen,
  Rocket,
  Sparkles,
  ShieldAlert,
} from "lucide-react";

export default function Overview() {
  const user = {
    full_name: "Zisan Ahmed",
  };

  const tasks = [
    {
      id: 1,
      title: "Design landing page",
      status: "in_progress",
      department: "Design",
      due_date: "2026-03-15",
      owner: "Sarah",
      priority: "High",
    },
    {
      id: 2,
      title: "Implement auth system",
      status: "done",
      department: "Development",
      due_date: "2026-03-10",
      owner: "Rahim",
      priority: "High",
    },
    {
      id: 3,
      title: "Marketing campaign planning",
      status: "in_progress",
      department: "Marketing",
      due_date: "2026-03-18",
      owner: "Karim",
      priority: "Medium",
    },
    {
      id: 4,
      title: "Fix dashboard bugs",
      status: "todo",
      department: "Development",
      due_date: "2026-03-05",
      owner: "Nabil",
      priority: "High",
    },
  ];

  const updates = [
    {
      id: 1,
      title: "New design system components added",
      author_name: "Sarah",
      department: "Design",
      tag: "System",
    },
    {
      id: 2,
      title: "Backend API performance improved",
      author_name: "Rahim",
      department: "Development",
      tag: "Performance",
    },
    {
      id: 3,
      title: "New marketing campaign launched",
      author_name: "Karim",
      department: "Marketing",
      tag: "Launch",
    },
  ];

  const initiatives = [
    {
      id: 1,
      name: "Platform Foundation",
      owner: "Rahim",
      progress: 74,
      health: "On Track",
      healthStyle: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
      summary:
        "Authentication, architecture cleanup, and core dashboard stability.",
    },
    {
      id: 2,
      name: "Design System v2",
      owner: "Sarah",
      progress: 61,
      health: "In Review",
      healthStyle: "text-amber-300 bg-amber-400/10 border-amber-400/20",
      summary:
        "Premium reusable UI patterns for product consistency and speed.",
    },
    {
      id: 3,
      name: "Go-to-Market Readiness",
      owner: "Karim",
      progress: 43,
      health: "Needs Focus",
      healthStyle: "text-rose-300 bg-rose-400/10 border-rose-400/20",
      summary:
        "Positioning, messaging, launch materials, and funnel preparation.",
    },
  ];

  const learningResources = [
    "R&D operating model playbook",
    "Product discovery interview notes",
    "Launch readiness checklist",
  ];

  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const overdue = tasks.filter(
    (t) =>
      t.due_date && new Date(t.due_date) < new Date() && t.status !== "done",
  ).length;

  const completionRate =
    totalTasks > 0 ? Math.round((completed / totalTasks) * 100) : 0;

  const greeting = user?.full_name
    ? `Welcome back, ${user.full_name.split(" ")[0]}`
    : "Welcome back";

  const getStatusStyle = (status: string) => {
    switch (status) {
      case "done":
        return "text-emerald-300 bg-emerald-400/10 border-emerald-400/20";
      case "in_progress":
        return "text-amber-300 bg-amber-400/10 border-amber-400/20";
      default:
        return "text-slate-300 bg-white/5 border-white/10";
    }
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case "done":
        return "Completed";
      case "in_progress":
        return "In Progress";
      default:
        return "Planned";
    }
  };

  const stats = [
    {
      title: "Execution Load",
      value: totalTasks,
      subtitle: "Total active tasks across teams",
      icon: ListTodo,
      accent:
        "from-indigo-500/20 to-violet-500/10 text-indigo-300 border-indigo-400/20",
    },
    {
      title: "In Motion",
      value: inProgress,
      subtitle: "Work currently moving forward",
      icon: Clock,
      accent:
        "from-amber-500/20 to-orange-500/10 text-amber-300 border-amber-400/20",
    },
    {
      title: "Completed",
      value: completed,
      subtitle: `${completionRate}% completion rate`,
      icon: CheckCircle2,
      accent:
        "from-emerald-500/20 to-teal-500/10 text-emerald-300 border-emerald-400/20",
    },
    {
      title: "Risks",
      value: overdue,
      subtitle:
        overdue > 0 ? "Requires immediate attention" : "No urgent blockers",
      icon: AlertTriangle,
      accent: overdue
        ? "from-rose-500/20 to-red-500/10 text-rose-300 border-rose-400/20"
        : "from-cyan-500/20 to-sky-500/10 text-cyan-300 border-cyan-400/20",
    },
  ];

  const priorityTasks = [...tasks]
    .sort((a, b) => {
      const aOverdue =
        a.due_date && new Date(a.due_date) < new Date() && a.status !== "done";
      const bOverdue =
        b.due_date && new Date(b.due_date) < new Date() && b.status !== "done";

      if (aOverdue && !bOverdue) return -1;
      if (!aOverdue && bOverdue) return 1;
      return 0;
    })
    .slice(0, 4);

  return (
    <Layout currentPageName="Overview">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}

        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.16),rgba(34,211,238,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_30%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
                R&D premium workspace
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                {greeting}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                Align roadmap, execution, ownership, product learning, and team
                momentum from one focused command center.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Current focus
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Ship stable platform foundations
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Team mode
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-300">
                    Building with momentum
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Delivery health
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {overdue > 0
                      ? `${overdue} risk item(s)`
                      : "Healthy pipeline"}
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-85">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Quarter goal</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  Product Velocity
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Build clarity, accountability, and stronger execution loops.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Confidence</p>
                <p className="mt-2 text-lg font-semibold text-cyan-300">82%</p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Strong momentum with a few execution risks.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    {stat.title}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {stat.subtitle}
                  </p>
                </div>

                <div
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border bg-linear-to-br ${stat.accent}`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Main strategic grid */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left */}
          <div className="space-y-6 xl:col-span-8">
            {/* Active initiatives */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Strategic Initiatives
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    The most important work driving this cycle forward.
                  </p>
                </div>
                <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                  View roadmap
                  <ArrowUpRight className="h-4 w-4" />
                </button>
              </div>

              <div className="space-y-4">
                {initiatives.map((initiative) => (
                  <div
                    key={initiative.id}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <h4 className="text-sm font-semibold text-white">
                            {initiative.name}
                          </h4>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${initiative.healthStyle}`}
                          >
                            {initiative.health}
                          </span>
                        </div>

                        <p className="mt-2 text-sm leading-6 text-slate-400">
                          {initiative.summary}
                        </p>

                        <p className="mt-3 text-xs text-slate-500">
                          Owner:{" "}
                          <span className="text-slate-300">
                            {initiative.owner}
                          </span>
                        </p>
                      </div>

                      <div className="w-full lg:w-60">
                        <div className="mb-2 flex items-center justify-between text-xs">
                          <span className="text-slate-400">Progress</span>
                          <span className="font-medium text-white">
                            {initiative.progress}%
                          </span>
                        </div>
                        <div className="h-2.5 rounded-full bg-white/10">
                          <div
                            className="h-2.5 rounded-full bg-linear-to-r from-indigo-400 via-violet-400 to-cyan-400"
                            style={{ width: `${initiative.progress}%` }}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Priority tasks */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Priority Execution Queue
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    High-visibility work that needs clarity and follow-through.
                  </p>
                </div>
                <div className="inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1.5 text-xs font-medium text-indigo-300">
                  <Target className="h-3.5 w-3.5" />
                  Accountability first
                </div>
              </div>

              <div className="space-y-3">
                {priorityTasks.map((task) => {
                  const isOverdue =
                    task.due_date &&
                    new Date(task.due_date) < new Date() &&
                    task.status !== "done";

                  return (
                    <div
                      key={task.id}
                      className="flex flex-col gap-4 rounded-2xl border border-white/8 bg-black/20 p-4 lg:flex-row lg:items-center lg:justify-between"
                    >
                      <div className="min-w-0 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-sm font-semibold text-white">
                            {task.title}
                          </p>
                          <span
                            className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(task.status)}`}
                          >
                            {getStatusLabel(task.status)}
                          </span>
                          {isOverdue && (
                            <span className="rounded-full border border-rose-400/20 bg-rose-400/10 px-2.5 py-1 text-[11px] font-medium text-rose-300">
                              Overdue
                            </span>
                          )}
                        </div>

                        <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                          <span>Owner: {task.owner}</span>
                          <span>Dept: {task.department}</span>
                          <span>Priority: {task.priority}</span>
                          <span>Due: {task.due_date}</span>
                        </div>
                      </div>

                      <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                        Open task
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="space-y-6 xl:col-span-4">
            {/* Team focus */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                  <Users className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Team Focus
                  </h3>
                  <p className="text-sm text-slate-400">
                    Ownership and alignment snapshot
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  { label: "Clear ownership", value: "86%" },
                  { label: "Execution confidence", value: "82%" },
                  { label: "Team workload balance", value: "Moderate" },
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

            {/* Risks */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
                  <ShieldAlert className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Attention Needed
                  </h3>
                  <p className="text-sm text-slate-400">
                    Items that can slow delivery
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {overdue > 0 ? (
                  <>
                    <div className="rounded-2xl border border-rose-400/15 bg-rose-400/8 p-4">
                      <p className="text-sm font-medium text-rose-200">
                        {overdue} overdue task{overdue > 1 ? "s" : ""} detected
                      </p>
                      <p className="mt-1 text-xs leading-5 text-rose-200/70">
                        Review blocked work, confirm ownership, and reset
                        delivery expectations where needed.
                      </p>
                    </div>
                    <div className="rounded-2xl border border-white/8 bg-black/20 p-4">
                      <p className="text-sm text-slate-300">
                        Recommended action
                      </p>
                      <p className="mt-1 text-xs leading-5 text-slate-400">
                        Run a blocker review and convert unclear tasks into
                        owned deliverables.
                      </p>
                    </div>
                  </>
                ) : (
                  <div className="rounded-2xl border border-emerald-400/15 bg-emerald-400/8 p-4">
                    <p className="text-sm font-medium text-emerald-200">
                      No immediate execution risk
                    </p>
                    <p className="mt-1 text-xs leading-5 text-emerald-200/70">
                      The pipeline looks healthy. Keep momentum by maintaining
                      clear owners and review checkpoints.
                    </p>
                  </div>
                )}
              </div>
            </div>

            {/* Knowledge */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                  <BookOpen className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Learning Resources
                  </h3>
                  <p className="text-sm text-slate-400">
                    Keep knowledge close to execution
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {learningResources.map((item) => (
                  <div
                    key={item}
                    className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 px-4 py-3"
                  >
                    <p className="text-sm text-slate-300">{item}</p>
                    <ArrowUpRight className="h-4 w-4 text-slate-500" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Bottom grid */}
        <section className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* Product momentum */}
          <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                <Rocket className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Product Momentum
                </h3>
                <p className="text-sm text-slate-400">
                  Build, validate, and prepare for release
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Experiments",
                  value: "08",
                  note: "Validation in progress",
                },
                {
                  title: "Features",
                  value: "14",
                  note: "Across active roadmap",
                },
                {
                  title: "Launch readiness",
                  value: "67%",
                  note: "Operationally improving",
                },
              ].map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl border border-white/8 bg-black/20 p-4"
                >
                  <p className="text-xs uppercase tracking-[0.14em] text-slate-500">
                    {item.title}
                  </p>
                  <p className="mt-2 text-2xl font-semibold text-white">
                    {item.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {item.note}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Updates */}
          <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
            <div className="mb-5 flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-cyan-400/20 bg-cyan-400/10 text-cyan-300">
                <Megaphone className="h-5 w-5" />
              </div>
              <div>
                <h3 className="text-lg font-semibold text-white">
                  Recent Updates
                </h3>
                <p className="text-sm text-slate-400">
                  Important team signals and delivery highlights
                </p>
              </div>
            </div>

            <div className="space-y-3">
              {updates.map((update) => (
                <div
                  key={update.id}
                  className="rounded-2xl border border-white/8 bg-black/20 p-4"
                >
                  <div className="flex items-start gap-3">
                    <div className="mt-0.5 flex h-9 w-9 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-indigo-300">
                      <Megaphone className="h-4 w-4" />
                    </div>

                    <div className="min-w-0 flex-1">
                      <div className="flex flex-wrap items-center gap-2">
                        <p className="text-sm font-medium text-white">
                          {update.title}
                        </p>
                        <span className="rounded-full border border-white/10 bg-white/5 px-2 py-0.5 text-[11px] text-slate-300">
                          {update.tag}
                        </span>
                      </div>

                      <p className="mt-1 text-xs text-slate-400">
                        {update.author_name} · {update.department}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
