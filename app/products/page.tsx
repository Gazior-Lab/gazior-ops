"use client";

import Layout from "@/components/Layout";
import {
  ArrowUpRight,
  Package,
  Rocket,
  Archive,
  Sparkles,
  ShieldAlert,
  Users,
  TrendingUp,
  Zap,
  Target,
  Layers3,
} from "lucide-react";

type Product = {
  id: number;
  name: string;
  description: string;
  status: "Active" | "Building" | "Paused" | "Archived";
  progress: number;
  team: number;
  owner: string;
  velocity: "High" | "Moderate" | "Low";
  risk: "Low" | "Medium" | "High";
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
      owner: "Karim",
      velocity: "High",
      risk: "Low",
    },
    {
      id: 2,
      name: "Analytics Dashboard",
      description: "Unified metrics and tracking system",
      status: "Building",
      progress: 60,
      team: 4,
      owner: "Rahim",
      velocity: "Moderate",
      risk: "Medium",
    },
    {
      id: 3,
      name: "AI Content Engine",
      description: "Automated content generation system",
      status: "Paused",
      progress: 30,
      team: 2,
      owner: "Sarah",
      velocity: "Low",
      risk: "High",
    },
    {
      id: 4,
      name: "Legacy CRM",
      description: "Old customer management system",
      status: "Archived",
      progress: 100,
      team: 1,
      owner: "Nabila",
      velocity: "Low",
      risk: "Low",
    },
  ];

  const stats = [
    {
      label: "Total products",
      value: products.length,
      icon: Package,
      accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
    },
    {
      label: "Active",
      value: products.filter((p) => p.status === "Active").length,
      icon: Rocket,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
    {
      label: "Building",
      value: products.filter((p) => p.status === "Building").length,
      icon: Sparkles,
      accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    },
    {
      label: "At risk",
      value: products.filter((p) => p.risk === "High").length,
      icon: ShieldAlert,
      accent: "text-rose-300 border-rose-400/20 bg-rose-400/10",
    },
  ];

  const getStatusStyle = (status: Product["status"]) => {
    switch (status) {
      case "Active":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      case "Building":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      case "Paused":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const getRiskStyle = (risk: Product["risk"]) => {
    switch (risk) {
      case "High":
        return "text-rose-300";
      case "Medium":
        return "text-amber-300";
      default:
        return "text-emerald-300";
    }
  };

  return (
    <Layout currentPageName="Products">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HERO */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(34,197,94,0.15),rgba(59,130,246,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-green-300" />
                Product layer
              </div>

              <h2 className="text-3xl font-semibold text-white lg:text-4xl">
                Build, validate, and scale products with clarity
              </h2>

              <p className="mt-3 text-sm text-slate-300 lg:text-base">
                Track product lifecycle, ownership, velocity, and risk. This is
                where your R&D output turns into real products.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-90">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Portfolio health</p>
                <p className="mt-2 text-lg font-semibold text-emerald-300">
                  Growing
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Execution signal</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  2 products need attention
                </p>
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
                </div>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-2xl border ${stat.accent}`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* PRODUCTS GRID */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-2">
          {products.map((p) => (
            <div
              key={p.id}
              className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="text-white font-semibold">{p.name}</h3>
                  <p className="text-sm text-slate-400 mt-1">{p.description}</p>
                </div>

                <span
                  className={`rounded-full border px-2.5 py-1 text-[11px] ${getStatusStyle(
                    p.status,
                  )}`}
                >
                  {p.status}
                </span>
              </div>

              {/* Progress */}
              <div className="mt-5">
                <div className="flex justify-between text-xs text-slate-400 mb-1">
                  <span>Progress</span>
                  <span>{p.progress}%</span>
                </div>
                <div className="h-2 rounded-full bg-white/10">
                  <div
                    className="h-2 rounded-full bg-linear-to-r from-indigo-400 to-cyan-400"
                    style={{ width: `${p.progress}%` }}
                  />
                </div>
              </div>

              {/* Signals */}
              <div className="mt-5 grid grid-cols-3 gap-3 text-xs">
                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-slate-400">Team</p>
                  <p className="text-white font-medium">{p.team}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-slate-400">Velocity</p>
                  <p className="text-white font-medium">{p.velocity}</p>
                </div>

                <div className="rounded-xl border border-white/10 bg-black/20 p-3">
                  <p className="text-slate-400">Risk</p>
                  <p className={`font-medium ${getRiskStyle(p.risk)}`}>
                    {p.risk}
                  </p>
                </div>
              </div>

              {/* Footer */}
              <div className="mt-5 flex items-center justify-between text-xs text-slate-400">
                <span>Owner: {p.owner}</span>

                <button className="flex items-center gap-1 text-slate-300">
                  Open product <ArrowUpRight className="h-3 w-3" />
                </button>
              </div>
            </div>
          ))}
        </section>

        {/* RIGHT SIDE (principles style) */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="rounded-[26px] border border-white/10 bg-white/4 p-6">
            <h3 className="text-white font-medium mb-4">
              Product Operating Principles
            </h3>

            <div className="space-y-3 text-sm text-slate-300">
              <p>• Focus on user value, not features</p>
              <p>• Validate before scaling</p>
              <p>• Measure outcomes, not output</p>
              <p>• Keep ownership clear per product</p>
              <p>• Reduce risk before increasing complexity</p>
            </div>
          </div>

          <div className="rounded-[26px] border border-white/10 bg-white/4 p-6">
            <h3 className="text-white font-medium mb-4">Product System Note</h3>

            <p className="text-sm text-slate-300">
              A strong product page is not just a list of products. It is a
              control layer that shows whether your company is learning,
              shipping, and scaling in the right direction.
            </p>
          </div>
        </section>
      </div>
    </Layout>
  );
}
