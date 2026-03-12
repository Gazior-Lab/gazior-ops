"use client";

import { useData } from "@/context/MainContext";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  X,
  ChevronDown,
  LayoutDashboard,
  ListTodo,
  Columns3,
  Users,
  Megaphone,
  FolderOpen,
} from "lucide-react";
import Link from "next/link";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { name: "Tasks", icon: ListTodo, page: "Tasks" },
  { name: "Board", icon: Columns3, page: "Board" },
  { name: "Team", icon: Users, page: "Team" },
  { name: "Updates", icon: Megaphone, page: "Updates" },
  { name: "Resources", icon: FolderOpen, page: "Resources" },
  { name: "Manifesto", icon: FolderOpen, page: "Manifesto" },
];

interface PropsType {
  currentPage: string;
}

const Sidebar = ({ currentPage }: PropsType) => {
  const { sidebarOpen, setSidebarOpen } = useData();

  // mock user
  const user = {
    full_name: "Zisan Ahmed",
    department: "Development",
  };

  const initials = user.full_name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  return (
    <aside
      className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0b1220] border-r border-white/5 transform transition-transform duration-300 ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      } flex flex-col`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 h-16 border-b border-white/5">
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl flex items-center justify-center shadow-md">
            <Columns3 className="w-4 h-4 text-white" />
          </div>

          <span className="text-white font-semibold tracking-tight text-lg">
            Gazior Ops
          </span>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden text-white/50 hover:text-white transition"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-3 py-4 space-y-1.5 overflow-y-auto">
        {navItems.map((item) => {
          const isActive = currentPage === item.page;

          return (
            <Link
              key={item.page}
              href={`/${item.page.toLowerCase()}`}
              onClick={() => setSidebarOpen(false)}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-indigo-500/15 text-indigo-300"
                  : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
              }`}
            >
              <div
                className={`flex items-center justify-center w-8 h-8 rounded-lg transition ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "bg-white/5 text-slate-400 group-hover:bg-white/10"
                }`}
              >
                <item.icon className="w-4 h-4" />
              </div>

              <span className="truncate">{item.name}</span>
            </Link>
          );
        })}
      </nav>

      <div className="p-3 border-t border-white/5">
        <div className="flex items-center gap-3 p-3 rounded-xl transition cursor-pointer">
          <Avatar className="w-9 h-9">
            <AvatarFallback className="bg-indigo-500/20 text-indigo-300 text-xs">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="flex-1 min-w-0">
            <p className="text-sm text-slate-200 font-medium truncate">
              {user.full_name}
            </p>
            <p className="text-xs text-slate-500 truncate">{user.department}</p>
          </div>

          <ChevronDown className="w-4 h-4 text-slate-500" />
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
