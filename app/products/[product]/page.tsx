"use client";

import Layout from "@/components/Layout";
import { Sparkles, CheckCircle2, Users, FileText, Plus } from "lucide-react";

export default function ProductDetailsPage() {
  const product = {
    name: "eBay Profit Calculator",
    description:
      "Advanced calculator for sellers to track profit, fees, and margins.",
    status: "Active",
    progress: 82,
  };

  const initiatives = [
    { id: 1, title: "Improve fee accuracy", progress: 90 },
    { id: 2, title: "Add analytics dashboard", progress: 60 },
  ];

  const tasks = [
    { id: 1, title: "Fix shipping calculation bug", status: "In Progress" },
    { id: 2, title: "Refactor pricing logic", status: "Todo" },
    { id: 3, title: "Optimize API performance", status: "Done" },
  ];

  const updates = [
    {
      id: 1,
      text: "New fee logic deployed",
      time: "2h ago",
    },
    {
      id: 2,
      text: "Bug found in shipping module",
      time: "1d ago",
    },
  ];

  const resources = [
    "Product Strategy Doc",
    "API Architecture",
    "Design System",
  ];

  const team = ["Zisan", "Dev A", "Designer B"];

  return (
    <Layout currentPageName="Product Details">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.15),rgba(59,130,246,0.08),rgba(255,255,255,0.03))] p-6 lg:p-8">
          <div className="max-w-3xl">
            <div className="mb-3 inline-flex items-center gap-2 text-xs text-slate-200 bg-white/5 px-3 py-1.5 rounded-full">
              <Sparkles className="h-3.5 w-3.5 text-green-300" />
              Product overview
            </div>

            <h1 className="text-3xl lg:text-4xl text-white font-semibold">
              {product.name}
            </h1>

            <p className="text-slate-300 mt-3 text-sm lg:text-base">
              {product.description}
            </p>

            <div className="mt-4 flex items-center gap-4 text-sm text-slate-300">
              <span>Status: {product.status}</span>
              <span>Progress: {product.progress}%</span>
            </div>
          </div>
        </section>

        {/* Main */}
        <section className="grid grid-cols-1 xl:grid-cols-12 gap-6">
          {/* LEFT */}
          <div className="xl:col-span-8 space-y-6">
            {/* Initiatives */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white mb-4 font-medium">Initiatives</h3>

              <div className="space-y-4">
                {initiatives.map((i) => (
                  <div
                    key={i.id}
                    className="rounded-xl border border-white/10 bg-black/20 p-4"
                  >
                    <div className="flex justify-between text-sm">
                      <span className="text-white">{i.title}</span>
                      <span className="text-slate-400">{i.progress}%</span>
                    </div>

                    <div className="mt-2 h-2 bg-black/30 rounded-full">
                      <div
                        className="h-2 bg-green-400 rounded-full"
                        style={{ width: `${i.progress}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Tasks */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white mb-4 font-medium">Tasks</h3>

              <div className="space-y-3">
                {tasks.map((t) => (
                  <div
                    key={t.id}
                    className="flex justify-between rounded-xl border border-white/10 bg-black/20 p-3"
                  >
                    <span className="text-white text-sm">{t.title}</span>
                    <span className="text-xs text-slate-400">{t.status}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div className="xl:col-span-4 space-y-6">
            {/* Updates */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white mb-4 font-medium">Recent Updates</h3>

              <div className="space-y-3 text-sm text-slate-300">
                {updates.map((u) => (
                  <div key={u.id}>
                    <p>{u.text}</p>
                    <span className="text-xs text-slate-400">{u.time}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Resources */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white mb-4 font-medium">Resources</h3>

              <div className="space-y-2 text-sm text-slate-300">
                {resources.map((r, i) => (
                  <p key={i}>• {r}</p>
                ))}
              </div>
            </div>

            {/* Team */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <div className="flex items-center gap-2 mb-4">
                <Users className="h-4 w-4 text-blue-300" />
                <h3 className="text-white font-medium">Team</h3>
              </div>

              <div className="space-y-2 text-sm text-slate-300">
                {team.map((member, i) => (
                  <p key={i}>{member}</p>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white mb-4 font-medium">Quick Actions</h3>

              <div className="space-y-3">
                <button className="flex w-full items-center gap-2 px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-sm text-slate-300">
                  <Plus className="h-4 w-4" />
                  Add task
                </button>

                <button className="flex w-full items-center gap-2 px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-sm text-slate-300">
                  <FileText className="h-4 w-4" />
                  Add update
                </button>

                <button className="flex w-full items-center gap-2 px-4 py-2 rounded-xl bg-black/20 border border-white/10 text-sm text-slate-300">
                  <CheckCircle2 className="h-4 w-4" />
                  Attach resource
                </button>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
