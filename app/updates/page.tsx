"use client";

import Layout from "@/components/Layout";
import {
  Activity,
  Rocket,
  AlertTriangle,
  Clock,
  Plus,
  Sparkles,
} from "lucide-react";

type Update = {
  id: number;
  title: string;
  description: string;
  type: "Release" | "Progress" | "Blocker" | "Note";
  product: string;
  time: string;
};

export default function UpdatesPage() {
  const updates: Update[] = [
    {
      id: 1,
      title: "New profit calculation logic deployed",
      description: "Improved fee accuracy and shipping handling",
      type: "Release",
      product: "eBay Profit Calculator",
      time: "2h ago",
    },
    {
      id: 2,
      title: "Dashboard UI improvements",
      description: "Refined layout and performance optimizations",
      type: "Progress",
      product: "Analytics Dashboard",
      time: "5h ago",
    },
    {
      id: 3,
      title: "Stripe webhook failing",
      description: "Orders not updating after payment",
      type: "Blocker",
      product: "eCommerce System",
      time: "1d ago",
    },
    {
      id: 4,
      title: "Initial AI content experiments",
      description: "Testing prompt quality and outputs",
      type: "Note",
      product: "AI Content Engine",
      time: "2d ago",
    },
  ];

  const stats = [
    {
      label: "Total updates",
      value: updates.length,
      icon: Activity,
    },
    {
      label: "Releases",
      value: updates.filter((u) => u.type === "Release").length,
      icon: Rocket,
    },
    {
      label: "In progress",
      value: updates.filter((u) => u.type === "Progress").length,
      icon: Clock,
    },
    {
      label: "Blockers",
      value: updates.filter((u) => u.type === "Blocker").length,
      icon: AlertTriangle,
    },
  ];

  const typeColor = (type: Update["type"]) => {
    switch (type) {
      case "Release":
        return "text-green-400";
      case "Progress":
        return "text-blue-400";
      case "Blocker":
        return "text-red-400";
      case "Note":
        return "text-slate-400";
    }
  };

  return (
    <Layout currentPageName="Updates">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(34,197,94,0.08),rgba(255,255,255,0.03))] p-6 lg:p-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              Communication layer
            </div>

            <h2 className="text-3xl font-semibold text-white lg:text-4xl">
              Stay aligned with real-time updates
            </h2>

            <p className="mt-3 text-sm text-slate-300 lg:text-base">
              Track releases, progress, and blockers across all products in one
              unified timeline.
            </p>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/4 p-5"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-300">{stat.label}</p>
                  <p className="mt-3 text-3xl text-white">{stat.value}</p>
                </div>
                <stat.icon className="h-5 w-5 text-slate-300" />
              </div>
            </div>
          ))}
        </section>

        {/* Main */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Timeline */}
          <div className="xl:col-span-8 space-y-4">
            {updates.map((u) => (
              <div
                key={u.id}
                className="rounded-2xl border border-white/10 bg-white/4 p-5"
              >
                <div className="flex justify-between">
                  <h3 className="text-white font-medium">{u.title}</h3>
                  <span className={`text-xs ${typeColor(u.type)}`}>
                    {u.type}
                  </span>
                </div>

                <p className="text-sm text-slate-300 mt-2">{u.description}</p>

                <div className="flex justify-between mt-3 text-xs text-slate-400">
                  <span>{u.product}</span>
                  <span>{u.time}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Right */}
          <div className="xl:col-span-4 space-y-6">
            {/* Actions */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  <Plus className="h-4 w-4" />
                  Post update
                </button>

                <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  <Rocket className="h-4 w-4" />
                  Log release
                </button>

                <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  <AlertTriangle className="h-4 w-4" />
                  Report blocker
                </button>
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Update Principles</h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>• Share meaningful progress, not noise</p>
                <p>• Highlight blockers early</p>
                <p>• Focus on impact and outcomes</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
