"use client";

import { ReactNode } from "react";
import Sidebar from "./sidebar";
import Header from "./Header";
import { useData } from "@/context/MainContext";
import { PageName } from "@/types/LayoutTypes";

interface PropsType {
  children: ReactNode;
  currentPageName: PageName;
}

export default function Layout({ children, currentPageName }: PropsType) {
  const { sidebarOpen, setSidebarOpen } = useData();

  return (
    <div className="flex h-screen overflow-hidden bg-transparent text-white app-shell">
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <Sidebar currentPage={currentPageName} />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Header currentPage={currentPageName} />

        <main className="flex-1 overflow-y-auto">
          <div className="mx-auto w-full max-w-420 px-4 pb-6 pt-4 sm:px-6 lg:px-8">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
