"use client";

import { useData } from "@/context/MainContext";
import {
  X,
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
} from "lucide-react";
import Link from "next/link";

const navGroups = [
  {
    title: "Workspace",
    items: [
      { name: "Overview", icon: LayoutDashboard, page: "Overview" },
      { name: "Roadmap", icon: Target, page: "Roadmap" },
      { name: "Execution", icon: ListTodo, page: "Execution" },
      { name: "Board", icon: Columns3, page: "Board" },
    ],
  },
  {
    title: "Team & Knowledge",
    items: [
      { name: "Team", icon: Users, page: "Team" },
      { name: "Knowledge", icon: BookOpen, page: "Knowledge" },
      { name: "Resources", icon: FolderOpen, page: "Resources" },
    ],
  },
  {
    title: "Product",
    items: [
      { name: "Products", icon: Rocket, page: "Products" },
      { name: "Updates", icon: Megaphone, page: "Updates" },
      { name: "Manifesto", icon: Sparkles, page: "Manifesto" },
    ],
  },
];

interface PropsType {
  currentPage: string;
}

const Sidebar = ({ currentPage }: PropsType) => {
  const { sidebarOpen, setSidebarOpen } = useData();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-[288px] transform flex-col border-r border-white/8 bg-[linear-gradient(180deg,rgba(10,14,28,0.96),rgba(8,11,22,0.98))] backdrop-blur-2xl transition-transform duration-300 lg:static ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex h-20 items-center justify-between border-b border-white/6 px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-[0_12px_30px_rgba(99,102,241,0.35)]">
            <Rocket className="h-5 w-5" />
          </div>

          <div>
            <p className="text-[15px] font-semibold tracking-tight text-white">
              Gazior Ops
            </p>
            <p className="text-xs text-slate-400">R&D Command Workspace</p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-4 py-5">
        <div className="space-y-6">
          {navGroups.map((group) => (
            <div key={group.title}>
              <p className="mb-2 px-3 text-[11px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {group.title}
              </p>

              <div className="space-y-1.5">
                {group.items.map((item) => {
                  const isActive =
                    currentPage.toLowerCase() === item.page.toLowerCase();

                  return (
                    <Link
                      key={item.page}
                      href={`/${item.page.toLowerCase()}`}
                      onClick={() => setSidebarOpen(false)}
                      className={`group flex items-center gap-3 rounded-lg px-2 2xl:px-3 py-2 2xl:py-3 text-sm font-medium transition-all ${
                        isActive
                          ? "bg-linear-to-r from-indigo-500/20 to-cyan-400/10 text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]"
                          : "text-slate-400 hover:bg-white/4] hover:text-slate-200"
                      }`}
                    >
                      <div
                        className={`flex h-8 2xl:h-10 w-8 2xl:w-10 items-center justify-center rounded-lg transition ${
                          isActive
                            ? "bg-indigo-500/20 text-indigo-300 ring-1 ring-indigo-400/20"
                            : "bg-white/4 text-slate-400 group-hover:bg-white/8"
                        }`}
                      >
                        <item.icon className="h-4 w-4" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <p className="truncate text-xs 2xl:text-sm">
                          {item.name}
                        </p>
                      </div>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
      <div className="px-4 pb-4">
        <div className="surface rounded-2xl p-4">
          <div className="mb-3 flex items-start justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                Active cycle
              </p>
              <h3 className="mt-1 text-sm font-semibold text-white">
                Q2 Product Velocity
              </h3>
            </div>
            <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
              On Track
            </span>
          </div>

          <p className="text-xs leading-5 text-slate-400">
            Align roadmap, ownership, execution, and research into one focused
            operating system.
          </p>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
