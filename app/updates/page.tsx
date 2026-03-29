"use client";

import Layout from "@/components/Layout";
import {
  Activity,
  Rocket,
  AlertTriangle,
  Clock,
  Plus,
  Sparkles,
  TrendingUp,
  Filter,
  Zap,
} from "lucide-react";

type Update = {
  id: number;
  title: string;
  description: string;
  type: "Release" | "Progress" | "Blocker" | "Insight";
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
      type: "Insight",
      product: "AI Content Engine",
      time: "2d ago",
    },
  ];

  const stats = [
    {
      label: "Total signals",
      value: updates.length,
      sub: "All updates across products",
      icon: Activity,
      accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
    },
    {
      label: "Releases",
      value: updates.filter((u) => u.type === "Release").length,
      sub: "Delivered changes",
      icon: Rocket,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
    {
      label: "Progress",
      value: updates.filter((u) => u.type === "Progress").length,
      sub: "Work moving forward",
      icon: Clock,
      accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    },
    {
      label: "Blockers",
      value: updates.filter((u) => u.type === "Blocker").length,
      sub: "Needs attention",
      icon: AlertTriangle,
      accent: "text-rose-300 border-rose-400/20 bg-rose-400/10",
    },
  ];

  const getTypeStyle = (type: Update["type"]) => {
    switch (type) {
      case "Release":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      case "Progress":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      case "Blocker":
        return "border-rose-400/20 bg-rose-400/10 text-rose-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  return (
    <Layout currentPageName="Updates">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(34,197,94,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-blue-300" />
                Communication layer
              </div>

              <h2 className="text-3xl font-semibold text-white lg:text-4xl">
                Real-time product signals & updates
              </h2>

              <p className="mt-3 text-sm text-slate-300 lg:text-base">
                Track releases, progress, risks, and insights across all
                products. This is your system-wide communication layer.
              </p>

              <div className="mt-6 flex gap-3 flex-wrap">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-400">System role</p>
                  <p className="text-sm text-white">Signal layer</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-400">Focus</p>
                  <p className="text-sm text-cyan-300">Clarity + visibility</p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Signal quality</p>
                <p className="text-lg text-emerald-300">High</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Noise level</p>
                <p className="text-lg text-white">Low</p>
              </div>
            </div>
          </div>
        </section>

        {/* STATS */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl"
            >
              <div className="flex justify-between">
                <div>
                  <p className="text-sm text-slate-300">{stat.label}</p>
                  <p className="mt-3 text-3xl text-white">{stat.value}</p>
                  <p className="text-xs text-slate-400 mt-2">{stat.sub}</p>
                </div>

                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${stat.accent}`}
                >
                  <stat.icon className="h-4 w-4" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* MAIN */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* TIMELINE */}
          <div className="xl:col-span-8 space-y-4">
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="flex justify-between mb-5">
                <h3 className="text-white font-semibold">Update Timeline</h3>

                <button className="flex items-center gap-2 text-sm text-slate-300">
                  <Filter className="h-4 w-4" />
                  Filter
                </button>
              </div>

              <div className="space-y-3">
                {updates.map((u) => (
                  <div
                    key={u.id}
                    className="rounded-[22px] border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex justify-between items-start">
                      <div>
                        <div className="flex gap-2 items-center">
                          <p className="text-white text-sm font-medium">
                            {u.title}
                          </p>

                          <span
                            className={`rounded-full border px-2 py-0.5 text-[10px] ${getTypeStyle(
                              u.type,
                            )}`}
                          >
                            {u.type}
                          </span>
                        </div>

                        <p className="text-sm text-slate-400 mt-2">
                          {u.description}
                        </p>

                        <div className="flex gap-4 text-xs text-slate-400 mt-3">
                          <span>{u.product}</span>
                          <span>{u.time}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="xl:col-span-4 space-y-6">
            {/* QUICK ACTIONS */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <h3 className="text-white font-semibold mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                  <Plus className="h-4 w-4 text-cyan-300" />
                  Post update
                </button>

                <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                  <Rocket className="h-4 w-4 text-emerald-300" />
                  Log release
                </button>

                <button className="flex w-full items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-slate-300">
                  <AlertTriangle className="h-4 w-4 text-rose-300" />
                  Report blocker
                </button>
              </div>
            </div>

            {/* SIGNAL NOTE */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-4">
                <TrendingUp className="text-cyan-300" />
                <h3 className="text-white font-semibold">System Note</h3>
              </div>

              <p className="text-sm text-slate-300">
                Updates are not just logs. They are signals that help the team
                understand what is happening across products in real-time.
              </p>

              <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-cyan-400/20 bg-cyan-400/10 px-3 py-1 text-xs text-cyan-300">
                <Zap className="h-3 w-3" />
                {`Signal > noise`}
              </div>
            </div>

            {/* PRINCIPLES */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <h3 className="text-white font-semibold mb-4">
                Update Principles
              </h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>• Share impact, not just activity</p>
                <p>• Highlight blockers immediately</p>
                <p>• Keep updates short and useful</p>
                <p>• Connect updates to products</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
