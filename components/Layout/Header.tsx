"use client";

import { useData } from "@/context/MainContext";
import { Menu, Search, Bell, Command, ChevronRight } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { PageName } from "@/types/layout";
import { navGroupList } from "@/constants/navGroupList";

interface PropsType {
  currentPage: PageName;
}

const user = {
  full_name: "Zisanur Haque",
  department: "R&D Operations",
  role: "Founder",
};

const initials = user.full_name
  .split(" ")
  .map((n) => n[0])
  .join("")
  .toUpperCase();

const Header = ({ currentPage }: PropsType) => {
  const { setSidebarOpen } = useData();
  const activeMatch = navGroupList.reduce<{
    groupName: string;
    name: string;
    subtitle?: string;
  } | null>((acc, group) => {
    if (acc) return acc;
    const found = group.items.find(
      (item) => item.page.toLowerCase() === currentPage.toLowerCase(),
    );
    if (found) {
      return {
        groupName: group.title,
        name: found.name,
        subtitle: found.subtitle,
      };
    }
    return null;
  }, null);

  const meta = {
    groupName: activeMatch?.groupName || "Workspace",
    title: activeMatch?.name || currentPage,
    subtitle:
      activeMatch?.subtitle ||
      "Manage your workspace with clarity and momentum.",
  };

  return (
    <header className="sticky top-0 z-30 border-b border-white/8 bg-[rgba(7,10,20,0.72)] backdrop-blur-2xl">
      <div className="mx-auto flex h-15 w-full max-w-420 items-center justify-between px-4 sm:px-6 lg:px-8">
        <div className="flex min-w-0 items-center gap-4">
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden flex h-11 w-11 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>

          <div className="min-w-0 flex flex-col">
            <div className="flex items-center gap-1 truncate text-[16px] font-semibold tracking-tight text-white 2xl:text-xl">
              <span>{meta.groupName}</span>
              <ChevronRight className="h-5 w-5" />
              <span>{meta.title}</span>
            </div>
            <span className="text-[11px] text-slate-400">{meta.subtitle}</span>
          </div>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Search */}
          <button className="hidden items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-3.5 py-2 text-sm text-slate-300 transition hover:bg-white/10 lg:flex">
            <Search className="h-4 w-4" />
            <span>Search</span>
            <span className="ml-1 inline-flex items-center gap-1 rounded-lg border border-white/10 bg-white/5 px-1.5 py-0.5 text-[11px] text-slate-400">
              <Command className="h-3 w-3" />K
            </span>
          </button>

          {/* Notification */}
          <button className="relative flex h-10 w-10 items-center justify-center rounded-2xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white">
            <Bell className="h-4.5 w-4.5" />
            <span className="absolute right-3 top-3 h-2 w-2 rounded-full bg-rose-400" />
          </button>

          {/* User */}
          <div className="flex items-center gap-3 rounded-2xl border border-white/10 bg-white/5 px-2 pl-3 py-1">
            <div className="hidden text-right sm:block">
              <p className="text-xs font-medium text-slate-100">
                {user.full_name}
              </p>
              <p className="text-[10px] text-slate-400">{user.role}</p>
            </div>

            <div className="relative">
              <Avatar className="h-7 w-7 bg-linear-to-br from-indigo-500 via-violet-500 to-cyan-400 text-white shadow-[0_10px_25px_rgba(99,102,241,0.35)]">
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
