"use client";

import { useData } from "@/context/MainContext";
import { X } from "lucide-react";
import NavItems from "./NavItems";
import { navGroupList } from "@/constants/navGroupList";
import { PageName } from "@/types/LayoutTypes";

interface PropsType {
  currentPage: PageName;
}

const Sidebar = ({ currentPage }: PropsType) => {
  const { sidebarOpen, setSidebarOpen } = useData();

  return (
    <aside
      className={`fixed inset-y-0 left-0 z-50 flex w-55 transform flex-col border-r border-white/8 bg-[linear-gradient(180deg,rgba(10,14,28,0.96),rgba(8,11,22,0.98))] backdrop-blur-2xl transition-transform duration-300 lg:static ${
        sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
      }`}
    >
      <div className="flex h-15 items-center justify-between border-b border-white/6 px-5">
        <div className="flex items-center gap-3">
          <div>
            <p className="text-xl font-semibold tracking-tight text-white">
              Gazior Ops
            </p>
            <p className="text-[10px] text-slate-400">
              Company Operational Center
            </p>
          </div>
        </div>

        <button
          onClick={() => setSidebarOpen(false)}
          className="rounded-xl p-2 text-slate-400 transition hover:bg-white/5 hover:text-white lg:hidden"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      <nav className="flex-1 overflow-y-auto px-5 py-5">
        <div className="space-y-4">
          {navGroupList.map((group) => (
            <div key={group.title}>
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-slate-500">
                {group.title}
              </p>

              <div className="space-y-0.5">
                {group.items.map((item) => {
                  const isActive =
                    currentPage.toLowerCase() === item.page.toLowerCase();

                  return (
                    <NavItems key={item.name} isActive={isActive} item={item} />
                  );
                })}
              </div>
            </div>
          ))}
        </div>
      </nav>
    </aside>
  );
};

export default Sidebar;
