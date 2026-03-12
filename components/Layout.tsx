"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createPageUrl } from "@/utils";
import { base44 } from "@/api/base44Client";
import {
  LayoutDashboard,
  ListTodo,
  Columns3,
  Users,
  Megaphone,
  FolderOpen,
  Menu,
  X,
  LogOut,
  ChevronDown,
  Code2,
  Palette,
  BarChart3,
} from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const navItems = [
  { name: "Dashboard", icon: LayoutDashboard, page: "Dashboard" },
  { name: "Tasks", icon: ListTodo, page: "Tasks" },
  { name: "Board", icon: Columns3, page: "Board" },
  { name: "Team", icon: Users, page: "Team" },
  { name: "Updates", icon: Megaphone, page: "Updates" },
  { name: "Resources", icon: FolderOpen, page: "Resources" },
];

const deptIcons = {
  development: Code2,
  marketing: BarChart3,
  design: Palette,
};

export default function Layout({ children, currentPageName }) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [user, setUser] = useState(null);
  const router = useRouter();

  useEffect(() => {
    base44.auth
      .me()
      .then(setUser)
      .catch(() => {});
  }, []);

  const initials = user?.full_name
    ? user.full_name
        .split(" ")
        .map((n) => n[0])
        .join("")
        .toUpperCase()
    : "?";

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      <style>{`
        :root {
          --sidebar-bg: #0f172a;
          --sidebar-hover: #1e293b;
          --sidebar-active: #6366f1;
          --accent: #6366f1;
          --accent-light: #818cf8;
        }
      `}</style>

      {/* Mobile overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-64 bg-[#0f172a] transform transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between px-6 h-16 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-500 flex items-center justify-center">
              <Columns3 className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-semibold text-lg tracking-tight">
              TeamFlow
            </span>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-white/60 hover:text-white"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <nav className="flex-1 px-3 py-4 space-y-1 overflow-y-auto">
          {navItems.map((item) => {
            const isActive = currentPageName === item.page;
            return (
              <Link
                key={item.page}
                href={createPageUrl(item.page)}
                onClick={() => setSidebarOpen(false)}
                className={`flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-150 ${
                  isActive
                    ? "bg-indigo-500/20 text-indigo-300"
                    : "text-slate-400 hover:bg-white/5 hover:text-slate-200"
                }`}
              >
                <item.icon
                  className={`w-[18px] h-[18px] ${isActive ? "text-indigo-400" : ""}`}
                />
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* User section */}
        {user && (
          <div className="px-3 py-4 border-t border-white/10">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button className="flex items-center gap-3 w-full px-3 py-2 rounded-lg hover:bg-white/5 transition-colors">
                  <Avatar className="w-8 h-8 bg-indigo-500/30 text-indigo-300">
                    <AvatarFallback className="bg-indigo-500/30 text-indigo-300 text-xs">
                      {initials}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">
                      {user.full_name}
                    </p>
                    <p className="text-xs text-slate-500 truncate">
                      {user.department || "No dept"}
                    </p>
                  </div>
                  <ChevronDown className="w-4 h-4 text-slate-500" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => base44.auth.logout()}>
                  <LogOut className="w-4 h-4 mr-2" />
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        )}
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top bar */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-4 lg:px-6 shrink-0">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden p-2 rounded-lg hover:bg-gray-100"
          >
            <Menu className="w-5 h-5 text-gray-600" />
          </button>
          <div className="hidden lg:block">
            <h1 className="text-lg font-semibold text-gray-900">
              {currentPageName}
            </h1>
          </div>
          <div className="flex items-center gap-3">
            {user?.department && (
              <div className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium capitalize">
                {React.createElement(deptIcons[user.department] || Code2, {
                  className: "w-3.5 h-3.5",
                })}
                {user.department}
              </div>
            )}
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 overflow-y-auto">{children}</main>
      </div>
    </div>
  );
}
