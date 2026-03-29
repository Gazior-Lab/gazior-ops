"use client";

import { useData } from "@/context/MainContext";
import {
  Menu,
  Search,
  Bell,
  Command,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PropsType {
  currentPage: string;
}

const user = {
  full_name: "Zisan Ahmed",
  department: "R&D Operations",
  role: "Product Lead",
};

const initials = user.full_name
  .split(" ")
  .map((n) => n[0])
  .join("")
  .toUpperCase();

const pageMeta: Record<string, { title: string; subtitle: string }> = {
  Overview: {
    title: "Overview",
    subtitle: "Monitor team momentum, priorities, and execution health.",
  },
  Roadmap: {
    title: "Roadmap",
    subtitle: "Visualize milestones, dependencies, and delivery confidence.",
  },
  Execution: {
    title: "Execution",
    subtitle: "Track accountable work, progress, blockers, and deadlines.",
  },
  Board: {
    title: "Board",
    subtitle: "Manage workflow visually across planning, review, and delivery.",
  },
  Team: {
    title: "Team",
    subtitle: "Clarify ownership, responsibilities, and contribution areas.",
  },
  Knowledge: {
    title: "Knowledge",
    subtitle: "Keep research, notes, SOPs, and learning resources organized.",
  },
  Resources: {
    title: "Resources",
    subtitle: "Centralize assets, links, templates, and reusable materials.",
  },
  Products: {
    title: "Products",
    subtitle: "Follow product development, validation, and release readiness.",
  },
  Updates: {
    title: "Updates",
    subtitle: "Share announcements, team decisions, and important changes.",
  },
  Manifesto: {
    title: "Manifesto",
    subtitle: "Align the team around vision, values, and operating principles.",
  },
  Dashboard: {
    title: "Overview",
    subtitle: "Monitor team momentum, priorities, and execution health.",
  },
};

const Header = ({ currentPage }: PropsType) => {
  const { setSidebarOpen } = useData();
  const meta = pageMeta[currentPage] || {
    title: currentPage,
    subtitle: "Manage your workspace with clarity and momentum.",
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[rgba(7,10,20,0.72)] backdrop-blur-2xl">
      <div className="mx-auto flex h-20 w-full max-w-420 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left */}
        <div className="flex min-w-0 items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0">
            <div className="flex items-center gap-2 text-xs text-slate-500">
              <span>Workspace</span>
              <ChevronRight className="h-3.5 w-3.5" />
              <span className="text-slate-400">{meta.title}</span>
            </div>

            <div className="mt-1 flex items-center gap-3">
              <h1 className="truncate text-xl font-semibold tracking-tight text-white lg:text-2xl">
                {meta.title}
              </h1>

              <span className="hidden rounded-full border border-indigo-400/20 bg-indigo-400/10 px-2.5 py-1 text-[11px] font-medium text-indigo-300 md:inline-flex">
                Premium Workspace
              </span>
            </div>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <button className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2.5 text-sm text-slate-300 transition hover:bg-white/10 lg:flex">
            <Search className="h-4 w-4" />
            <span>Search</span>
            <span className="ml-1 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] text-slate-400">
              <Command className="h-3 w-3" />K
            </span>
          </button>

          {/* Strategic badge */}
          <div className="hidden xl:flex items-center gap-2 rounded-2xl border border-cyan-400/20 bg-cyan-400/10 px-3 py-2 text-xs font-medium text-cyan-200">
            <Sparkles className="h-3.5 w-3.5" />
            Strategic mode
          </div>

          {/* Notification */}
          <button className="relative flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-400" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-2.5 py-2">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium text-slate-100">
                {user.full_name}
              </p>
              <p className="text-xs text-slate-400">
                {user.role} · {user.department}
              </p>
            </div>

            <div className="relative">
              <Avatar className="h-10 w-10 bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-[0_10px_25px_rgba(99,102,241,0.35)]">
                <AvatarFallback className="text-xs font-semibold">
                  {initials}
                </AvatarFallback>
              </Avatar>

              <span className="absolute bottom-0 right-0 h-2.5 w-2.5 rounded-full border-2 border-[#0b1020] bg-emerald-400" />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
