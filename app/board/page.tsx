"use client";

import { useMemo, useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ArrowUpRight,
  CalendarDays,
  CheckCircle2,
  Clock3,
  FolderKanban,
  PauseCircle,
  PlayCircle,
  Plus,
  Search,
  ShieldAlert,
  Sparkles,
  UserRound,
} from "lucide-react";

type Priority = "low" | "medium" | "high" | "urgent";
type Department =
  | "development"
  | "design"
  | "marketing"
  | "product"
  | "research";
type Status = "backlog" | "todo" | "in_progress" | "review" | "done";

interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  department: Department;
  assigned_to_name: string;
  initiative: string;
  due_date: string;
}

const columns: {
  id: Status;
  label: string;
  description: string;
  icon: React.ElementType;
  accent: string;
  countStyle: string;
}[] = [
  {
    id: "backlog",
    label: "Backlog",
    description: "Ideas and queued work",
    icon: PauseCircle,
    accent: "border-white/10 bg-white/5 text-slate-300",
    countStyle: "text-slate-300 bg-white/5 border-white/10",
  },
  {
    id: "todo",
    label: "Ready",
    description: "Prepared for execution",
    icon: Clock3,
    accent: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
    countStyle: "text-cyan-300 bg-cyan-400/10 border-cyan-400/20",
  },
  {
    id: "in_progress",
    label: "In Progress",
    description: "Currently being worked on",
    icon: PlayCircle,
    accent: "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
    countStyle: "text-indigo-300 bg-indigo-400/10 border-indigo-400/20",
  },
  {
    id: "review",
    label: "Review",
    description: "Awaiting validation",
    icon: ShieldAlert,
    accent: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    countStyle: "text-amber-300 bg-amber-400/10 border-amber-400/20",
  },
  {
    id: "done",
    label: "Done",
    description: "Delivered and completed",
    icon: CheckCircle2,
    accent: "border-emerald-400/20 bg-emerald-400/10 text-emerald-300",
    countStyle: "text-emerald-300 bg-emerald-400/10 border-emerald-400/20",
  },
];

const priorityStyles: Record<Priority, string> = {
  low: "border-white/10 bg-white/5 text-slate-300",
  medium: "border-cyan-400/20 bg-cyan-400/10 text-cyan-300",
  high: "border-orange-400/20 bg-orange-400/10 text-orange-300",
  urgent: "border-rose-400/20 bg-rose-400/10 text-rose-300",
};

const departmentStyles: Record<Department, string> = {
  development: "bg-indigo-400/10 text-indigo-300 border-indigo-400/20",
  design: "bg-fuchsia-400/10 text-fuchsia-300 border-fuchsia-400/20",
  marketing: "bg-amber-400/10 text-amber-300 border-amber-400/20",
  product: "bg-cyan-400/10 text-cyan-300 border-cyan-400/20",
  research: "bg-emerald-400/10 text-emerald-300 border-emerald-400/20",
};

const initialTasks: Task[] = [
  {
    id: "1",
    title: "Implement dashboard shell and premium overview layout",
    status: "in_progress",
    priority: "high",
    department: "development",
    assigned_to_name: "Zisan Ahmed",
    initiative: "Core Collaboration Foundation",
    due_date: "2026-04-04",
  },
  {
    id: "2",
    title: "Design manifesto page with stronger vision hierarchy",
    status: "todo",
    priority: "medium",
    department: "design",
    assigned_to_name: "Ayesha Khan",
    initiative: "Premium Design System v2",
    due_date: "2026-04-06",
  },
  {
    id: "3",
    title: "Review launch messaging and positioning notes",
    status: "backlog",
    priority: "low",
    department: "marketing",
    assigned_to_name: "Rafiq Hossain",
    initiative: "Go-to-Market Readiness",
    due_date: "2026-04-11",
  },
  {
    id: "4",
    title: "Set up task creation flow and execution form logic",
    status: "review",
    priority: "urgent",
    department: "development",
    assigned_to_name: "Zisan Ahmed",
    initiative: "Execution Workflow Upgrade",
    due_date: "2026-04-02",
  },
  {
    id: "5",
    title: "Organize research repository for learning resources",
    status: "todo",
    priority: "high",
    department: "research",
    assigned_to_name: "Nabila Rahman",
    initiative: "Knowledge Hub & Learning Resources",
    due_date: "2026-04-09",
  },
  {
    id: "6",
    title: "Define experiment card structure for product tracking",
    status: "in_progress",
    priority: "high",
    department: "product",
    assigned_to_name: "Karim Uddin",
    initiative: "Product Tracking & Experiment Layer",
    due_date: "2026-04-05",
  },
  {
    id: "7",
    title: "Finalize board interactions and drag-state polish",
    status: "done",
    priority: "medium",
    department: "design",
    assigned_to_name: "Ayesha Khan",
    initiative: "Premium Design System v2",
    due_date: "2026-03-29",
  },
];

export default function BoardPage() {
  const [deptFilter, setDeptFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);
  const [tasks, setTasks] = useState<Task[]>(initialTasks);

  const filteredTasks = useMemo(() => {
    return tasks.filter((task) => {
      const deptMatch = deptFilter === "all" || task.department === deptFilter;
      const priorityMatch =
        priorityFilter === "all" || task.priority === priorityFilter;
      return deptMatch && priorityMatch;
    });
  }, [tasks, deptFilter, priorityFilter]);

  const handleDrop = (status: Status) => {
    if (!draggedTaskId) return;

    setTasks((prev) =>
      prev.map((task) =>
        task.id === draggedTaskId
          ? {
              ...task,
              status,
            }
          : task,
      ),
    );

    setDraggedTaskId(null);
  };

  const stats = {
    total: filteredTasks.length,
    inProgress: filteredTasks.filter((t) => t.status === "in_progress").length,
    review: filteredTasks.filter((t) => t.status === "review").length,
    urgent: filteredTasks.filter((t) => t.priority === "urgent").length,
  };

  return (
    <Layout currentPageName="Board">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.16),rgba(34,211,238,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
                Visual execution workflow
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Move work clearly from idea to delivery
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                A premium board for tracking active work, surfacing bottlenecks,
                and helping the team understand ownership, priority, and
                execution flow at a glance.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Workflow
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Backlog → Ready → In Progress → Review → Done
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Team mode
                  </p>
                  <p className="mt-1 text-sm font-medium text-cyan-300">
                    Accountable execution
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-85">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Visible items</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  {stats.total}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Tasks in the current filtered view.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Urgent items</p>
                <p className="mt-2 text-lg font-semibold text-rose-300">
                  {stats.urgent}
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  High-attention work that needs fast movement.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Controls */}
        <section className="rounded-[26px] border border-white/10 bg-white/4 p-4 backdrop-blur-xl lg:p-5">
          <div className="flex flex-col gap-4">
            <div className="">
              <h3 className="text-lg font-semibold text-white">
                Execution Board
              </h3>
              <p className="mt-1 text-sm text-slate-400">
                Drag tasks between columns to update status and maintain
                workflow clarity.
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <div className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-300 md:flex">
                <Search className="h-4 w-4" />
                Search tasks
              </div>

              <Select value={deptFilter} onValueChange={setDeptFilter}>
                <SelectTrigger className="w-40 rounded-2xl border-white/10 bg-white/5 text-slate-200">
                  <SelectValue placeholder="Department" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#0c1222] text-slate-200">
                  <SelectItem value="all">All teams</SelectItem>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="product">Product</SelectItem>
                  <SelectItem value="research">Research</SelectItem>
                </SelectContent>
              </Select>

              <Select value={priorityFilter} onValueChange={setPriorityFilter}>
                <SelectTrigger className="w-37.5 rounded-2xl border-white/10 bg-white/5 text-slate-200">
                  <SelectValue placeholder="Priority" />
                </SelectTrigger>
                <SelectContent className="border-white/10 bg-[#0c1222] text-slate-200">
                  <SelectItem value="all">All priorities</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>

              <Button className="rounded-2xl bg-linear-to-r from-indigo-500 to-cyan-400 text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] hover:opacity-95">
                <Plus className="mr-2 h-4 w-4" />
                New Task
              </Button>
            </div>
          </div>
        </section>

        {/* Quick stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {[
            {
              label: "In progress",
              value: stats.inProgress,
              icon: PlayCircle,
              accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
            },
            {
              label: "In review",
              value: stats.review,
              icon: ShieldAlert,
              accent: "text-amber-300 border-amber-400/20 bg-amber-400/10",
            },
            {
              label: "Urgent",
              value: stats.urgent,
              icon: AlertIcon,
              accent: "text-rose-300 border-rose-400/20 bg-rose-400/10",
            },
            {
              label: "Workflow health",
              value: stats.review + stats.urgent > 2 ? "Focus" : "Stable",
              icon: FolderKanban,
              accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
            },
          ].map((item) => (
            <div
              key={item.label}
              className="rounded-3xl border border-white/10 bg-white/4 p-3 2xl:p-5 backdrop-blur-xl"
            >
              <div className="flex items-center justify-between gap-4">
                <div
                  className={`flex h-10 2xl:h-12 w-10 2xl:w-12 items-center justify-center rounded-xl 2xl:rounded-2xl border ${item.accent}`}
                >
                  <item.icon className="h-5 w-5" />
                </div>
                <p className="text-sm flex-1 font-medium text-slate-300">
                  {item.label}
                </p>
                <p className="text-sm 2xl:text-2xl font-semibold tracking-tight text-white">
                  {item.value}
                </p>
              </div>
            </div>
          ))}
        </section>

        {/* Board */}
        <section className="">
          <div className="grid grid-cols-3 gap-4">
            {columns.map((col) => {
              const colTasks = filteredTasks.filter(
                (task) => task.status === col.id,
              );
              const ColumnIcon = col.icon;

              return (
                <div
                  key={col.id}
                  onDragOver={(e) => e.preventDefault()}
                  onDrop={() => handleDrop(col.id)}
                  className="rounded-[26px] border border-white/10 bg-white/4 p-3 backdrop-blur-xl"
                >
                  {/* Column header */}
                  <div className="mb-3 rounded-[20px] border border-white/8 bg-black/20 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <div className="min-w-0">
                        <div className="flex items-center gap-2">
                          <div
                            className={`flex h-9 w-9 items-center justify-center rounded-2xl border ${col.accent}`}
                          >
                            <ColumnIcon className="h-4.5 w-4.5" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-semibold text-white">
                              {col.label}
                            </p>
                            <p className="text-xs text-slate-400">
                              {col.description}
                            </p>
                          </div>
                        </div>
                      </div>

                      <span
                        className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${col.countStyle}`}
                      >
                        {colTasks.length}
                      </span>
                    </div>
                  </div>

                  {/* Tasks */}
                  <div className="max-h-80 overflow-hidden overflow-y-scroll space-y-3 rounded-[22px] border border-white/6 bg-black/10 p-2.5">
                    {colTasks.length === 0 ? (
                      <div className="flex min-h-45 items-center justify-center rounded-[18px] border border-dashed border-white/10 bg-white/2 p-6 text-center">
                        <div>
                          <p className="text-sm font-medium text-slate-300">
                            No tasks here
                          </p>
                          <p className="mt-1 text-xs leading-5 text-slate-500">
                            Drag an item into this stage when work progresses.
                          </p>
                        </div>
                      </div>
                    ) : (
                      colTasks.map((task) => (
                        <div
                          key={task.id}
                          draggable
                          onDragStart={() => setDraggedTaskId(task.id)}
                          className="group cursor-grab rounded-[22px] border border-white/8 bg-[linear-gradient(180deg,rgba(255,255,255,0.04),rgba(255,255,255,0.02))] p-4 shadow-[0_8px_24px_rgba(0,0,0,0.18)] transition hover:border-white/15 hover:bg-white/5 active:cursor-grabbing"
                        >
                          <div className="flex items-start justify-between gap-3">
                            <div className="min-w-0 flex-1">
                              <div className="flex flex-wrap items-center gap-2">
                                <span
                                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${priorityStyles[task.priority]}`}
                                >
                                  {task.priority}
                                </span>
                                <span
                                  className={`rounded-full border px-2 py-0.5 text-[10px] font-medium capitalize ${departmentStyles[task.department]}`}
                                >
                                  {task.department}
                                </span>
                              </div>

                              <p className="mt-3 text-sm font-semibold leading-6 text-white">
                                {task.title}
                              </p>
                            </div>

                            <button className="opacity-0 transition group-hover:opacity-100">
                              <ArrowUpRight className="h-4 w-4 text-slate-500" />
                            </button>
                          </div>

                          <div className="mt-4 rounded-2xl border border-white/8 bg-black/20 p-3">
                            <p className="text-[11px] uppercase tracking-[0.14em] text-slate-500">
                              Initiative
                            </p>
                            <p className="mt-1 text-xs leading-5 text-slate-300">
                              {task.initiative}
                            </p>
                          </div>

                          <div className="mt-4 flex flex-col gap-2 text-xs text-slate-400">
                            <div className="flex items-center gap-2">
                              <UserRound className="h-3.5 w-3.5" />
                              <span>{task.assigned_to_name}</span>
                            </div>
                            <div className="flex items-center gap-2">
                              <CalendarDays className="h-3.5 w-3.5" />
                              <span>{task.due_date}</span>
                            </div>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </section>
      </div>
    </Layout>
  );
}

function AlertIcon(props: React.SVGProps<SVGSVGElement>) {
  return <ShieldAlert {...props} />;
}
