"use client";

import { ReactNode, useState } from "react";
import Sidebar from "../sidebar";
import Header from "./Header";

interface PropsType {
  children: ReactNode;
  currentPageName: string;
}

export default function Layout({ children, currentPageName }: PropsType) {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#f8fafc] overflow-hidden">
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 backdrop-blur-sm z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      <Sidebar currentPage={currentPageName} />
      <div className="flex-1 flex flex-col min-w-0">
        <Header currentPage={currentPageName} />
        <main className="flex-1 overflow-y-auto">
          <div className="min-h-full">{children}</div>
        </main>
      </div>
    </div>
  );
}
