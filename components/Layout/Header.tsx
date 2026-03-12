"use client";

import { useData } from "@/context/MainContext";
import { Menu } from "lucide-react";
import * as React from "react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface PropsType {
  currentPage: string;
}

// Mock user (frontend-only)
const user = {
  full_name: "Zisan Ahmed",
  department: "development",
};

const initials = user.full_name
  .split(" ")
  .map((n) => n[0])
  .join("")
  .toUpperCase();

const Header = ({ currentPage }: PropsType) => {
  const { setSidebarOpen } = useData();

  return (
    <header className="h-16 bg-white/80 backdrop-blur-md border-b border-slate-200 flex items-center justify-between px-4 lg:px-8 shrink-0">
      {/* Left */}
      <div className="flex items-center gap-4">
        {/* Mobile menu button */}
        <button
          onClick={() => setSidebarOpen(true)}
          className="lg:hidden p-2 rounded-lg hover:bg-slate-100 transition"
        >
          <Menu className="w-5 h-5 text-slate-600" />
        </button>

        {/* Page title */}
        <h1 className="text-lg font-semibold text-slate-900 tracking-tight truncate">
          {currentPage}
        </h1>
      </div>

      {/* Right */}
      <div className="flex items-center gap-4">
        {/* Department badge */}
        <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-50 text-indigo-600 text-xs font-medium capitalize hover:bg-indigo-100 transition">
          {user.department}
        </div>

        {/* Avatar with gradient + shadow + optional status */}
        <div className="relative">
          <Avatar className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-indigo-600 text-white shadow-md">
            <AvatarFallback className="text-xs font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          {/* Optional online status */}
          <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-400 border-2 border-white rounded-full shadow" />
        </div>
      </div>
    </header>
  );
};

export default Header;
