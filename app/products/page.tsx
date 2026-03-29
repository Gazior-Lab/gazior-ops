"use client";

import Layout from "@/components/Layout";
import { Package, Rocket, Archive, Plus, Sparkles } from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Building" | "Paused" | "Archived";
  progress: number;
  team: number;
};

export default function ProductsPage() {
  const products: Product[] = [
    {
      id: 1,
      name: "eBay Profit Calculator",
      description: "Advanced calculator for sellers to track profit",
      status: "Active",
      progress: 85,
      team: 3,
    },
    {
      id: 2,
      name: "Analytics Dashboard",
      description: "Unified metrics and tracking system",
      status: "Building",
      progress: 60,
      team: 4,
    },
    {
      id: 3,
      name: "AI Content Engine",
      description: "Automated content generation system",
      status: "Paused",
      progress: 30,
      team: 2,
    },
    {
      id: 4,
      name: "Legacy CRM",
      description: "Old customer management system",
      status: "Archived",
      progress: 100,
      team: 1,
    },
  ];

  const stats = [
    {
      label: "Total products",
      value: products.length,
      icon: Package,
    },
    {
      label: "Active",
      value: products.filter((p) => p.status === "Active").length,
      icon: Rocket,
    },
    {
      label: "Building",
      value: products.filter((p) => p.status === "Building").length,
      icon: Sparkles,
    },
    {
      label: "Archived",
      value: products.filter((p) => p.status === "Archived").length,
      icon: Archive,
    },
  ];

  const statusColor = (status: Product["status"]) => {
    switch (status) {
      case "Active":
        return "text-green-400";
      case "Building":
        return "text-blue-400";
      case "Paused":
        return "text-yellow-400";
      case "Archived":
        return "text-slate-400";
    }
  };

  return (
    <Layout currentPageName="Products">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.15),rgba(59,130,246,0.08),rgba(255,255,255,0.03))] p-6 lg:p-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-green-300" />
              Product layer
            </div>

            <h2 className="text-3xl font-semibold text-white lg:text-4xl">
              Build, track, and scale your products
            </h2>

            <p className="mt-3 text-sm text-slate-300 lg:text-base">
              Manage product lifecycle, monitor progress, and align teams around
              what matters most.
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
          {/* Left */}
          <div className="xl:col-span-8 space-y-6">
            {/* Product Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {products.map((p) => (
                <div
                  key={p.id}
                  className="rounded-2xl border border-white/10 bg-white/4 p-5"
                >
                  <div className="flex justify-between">
                    <h3 className="text-white font-medium">{p.name}</h3>
                    <span className={`text-xs ${statusColor(p.status)}`}>
                      {p.status}
                    </span>
                  </div>

                  <p className="text-sm text-slate-300 mt-2">{p.description}</p>

                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-xs text-slate-400 mb-1">
                      <span>Progress</span>
                      <span>{p.progress}%</span>
                    </div>
                    <div className="h-2 w-full rounded-full bg-black/30">
                      <div
                        className="h-2 rounded-full bg-green-400"
                        style={{ width: `${p.progress}%` }}
                      />
                    </div>
                  </div>

                  <p className="text-xs text-slate-400 mt-3">
                    Team: {p.team} members
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="xl:col-span-4 space-y-6">
            {/* Actions */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  <Plus className="h-4 w-4" />
                  Create product
                </button>

                <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  <Package className="h-4 w-4" />
                  Import products
                </button>
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">
                Product Principles
              </h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>• Focus on user value, not just features</p>
                <p>• Ship fast and iterate continuously</p>
                <p>• Measure outcomes, not output</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
