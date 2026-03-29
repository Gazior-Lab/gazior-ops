"use client";

import Layout from "@/components/Layout";
import {
  Sparkles,
  TrendingUp,
  AlertTriangle,
  Users,
  Target,
  Layers3,
  ArrowUpRight,
} from "lucide-react";

export default function ProductDetailsPage() {
  return (
    <Layout currentPageName="Product">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* 🔥 HERO (split, asymmetric) */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT BIG */}
          <div className="xl:col-span-8 rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.18),rgba(59,130,246,0.08))] p-8">
            <div className="mb-4 inline-flex items-center gap-2 text-xs text-slate-200 bg-white/5 px-3 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-green-300" />
              Product system
            </div>

            <h1 className="text-4xl text-white font-semibold">
              eBay Profit Calculator
            </h1>

            <p className="mt-4 text-slate-300 max-w-2xl">
              A precision-focused system helping sellers understand real profit,
              fees, and margins across complex scenarios.
            </p>

            <div className="mt-6 flex gap-3 flex-wrap">
              <span className="px-3 py-1 rounded-full text-xs bg-emerald-400/10 text-emerald-300 border border-emerald-400/20">
                Active
              </span>
              <span className="px-3 py-1 rounded-full text-xs bg-cyan-400/10 text-cyan-300 border border-cyan-400/20">
                Strong momentum
              </span>
            </div>
          </div>

          {/* RIGHT PANEL (IMPORTANT DIFFERENCE) */}
          <div className="xl:col-span-4 space-y-3">
            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-slate-400">Progress</p>
              <p className="text-xl text-white mt-1">82%</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-slate-400">Velocity</p>
              <p className="text-xl text-cyan-300 mt-1">High</p>
            </div>

            <div className="rounded-2xl border border-white/10 bg-black/30 p-4">
              <p className="text-xs text-slate-400">Risk</p>
              <p className="text-xl text-amber-300 mt-1">Low</p>
            </div>
          </div>
        </section>

        {/* 🔥 MAIN (not equal grid anymore) */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT (dominant) */}
          <div className="xl:col-span-7 space-y-6">
            {/* INITIATIVE (BIG CARD) */}
            <div className="rounded-[28px] border border-white/10 bg-white/4 p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-white font-semibold">
                  Strategic Direction
                </h3>
                <Target className="text-cyan-300" />
              </div>

              <p className="text-slate-300 text-sm leading-6">
                Current focus is improving calculation accuracy and building an
                analytics layer to increase product intelligence.
              </p>
            </div>

            {/* EXECUTION QUEUE */}
            <div className="rounded-[28px] border border-white/10 bg-white/4 p-6">
              <div className="flex justify-between mb-4">
                <h3 className="text-white font-semibold">Execution Queue</h3>
                <Layers3 className="text-indigo-300" />
              </div>

              <div className="space-y-3">
                {["Fix shipping bug", "Refactor pricing", "Optimize API"].map(
                  (task, i) => (
                    <div
                      key={i}
                      className="flex justify-between p-4 rounded-xl bg-black/20 border border-white/10"
                    >
                      <span className="text-white">{task}</span>
                      <span className="text-xs text-slate-400">
                        In Progress
                      </span>
                    </div>
                  ),
                )}
              </div>
            </div>
          </div>

          {/* RIGHT SIDE (compressed intelligence) */}
          <div className="xl:col-span-5 space-y-6">
            {/* SIGNALS */}
            <div className="rounded-[28px] border border-white/10 bg-white/4 p-6">
              <div className="flex gap-2 mb-4">
                <TrendingUp className="text-cyan-300" />
                <h3 className="text-white font-semibold">Signals</h3>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                <p>New fee logic deployed</p>
                <p>Shipping bug identified</p>
              </div>
            </div>

            {/* RISKS */}
            <div className="rounded-[28px] border border-white/10 bg-white/4 p-6">
              <div className="flex gap-2 mb-4">
                <AlertTriangle className="text-rose-300" />
                <h3 className="text-white font-semibold">Risks</h3>
              </div>

              <p className="text-sm text-slate-300">
                Edge-case calculations still not fully validated.
              </p>
            </div>

            {/* TEAM */}
            <div className="rounded-[28px] border border-white/10 bg-white/4 p-6">
              <div className="flex gap-2 mb-4">
                <Users className="text-blue-300" />
                <h3 className="text-white font-semibold">Ownership</h3>
              </div>

              <p className="text-sm text-slate-300">Karim · Rahim · Sarah</p>
            </div>
          </div>
        </section>

        {/* 🔥 TIMELINE (NEW — this is what you were missing) */}
        <section className="rounded-[28px] border border-white/10 bg-white/4 p-6">
          <h3 className="text-white font-semibold mb-4">Product Timeline</h3>

          <div className="space-y-3">
            {["Release deployed", "Bug discovered", "Refactor started"].map(
              (item, i) => (
                <div
                  key={i}
                  className="p-3 rounded-xl border border-white/10 bg-black/20 text-sm text-slate-300"
                >
                  {item}
                </div>
              ),
            )}
          </div>
        </section>
      </div>
    </Layout>
  );
}
