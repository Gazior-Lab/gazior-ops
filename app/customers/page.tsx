"use client";

import React from "react";
import Layout from "@/components/Layout";
import {
  ArrowUpRight,
  BarChart3,
  Building2,
  Filter,
  Flag,
  LineChart,
  Target,
  TrendingUp,
  Users,
  Wallet,
  Zap,
} from "lucide-react";

type Customer = {
  id: number;
  name: string;
  tier: "Enterprise" | "Mid-Market" | "Startup";
  stage: "Discovery" | "Validation" | "Negotiation" | "Closed";
  owner: string;
  value: string;
  icpFit: "High" | "Medium" | "Low";
  lastAction: string;
};

export default function CustomersPage() {
  const pipeline: Customer[] = [
    {
      id: 1,
      name: "Nexus Dynamics",
      tier: "Enterprise",
      stage: "Negotiation",
      owner: "Zisanur H.",
      value: "$120k ARR",
      icpFit: "High",
      lastAction: "Sent technical requirements doc",
    },
    {
      id: 2,
      name: "Stellar Cloud Systems",
      tier: "Enterprise",
      stage: "Validation",
      owner: "Sarah M.",
      value: "$85k ARR",
      icpFit: "High",
      lastAction: "Completed security review",
    },
    {
      id: 3,
      name: "Acme Corp",
      tier: "Mid-Market",
      stage: "Discovery",
      owner: "Rahim K.",
      value: "$40k ARR",
      icpFit: "Medium",
      lastAction: "Initial demo completed",
    },
    {
      id: 4,
      name: "Global Trade Inc",
      tier: "Enterprise",
      stage: "Closed",
      owner: "Zisanur H.",
      value: "$150k ARR",
      icpFit: "High",
      lastAction: "Contract signed, handing off to success",
    },
    {
      id: 5,
      name: "Quantum Analytics",
      tier: "Startup",
      stage: "Discovery",
      owner: "Nabila A.",
      value: "$15k ARR",
      icpFit: "Low",
      lastAction: "Evaluating budget constraints",
    },
  ];

  const pipelineStats = [
    {
      label: "Total Pipeline",
      value: "$2.4M",
      subtext: "Across all active stages",
      icon: Wallet,
      accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
    },
    {
      label: "Qualified (MQL)",
      value: "128",
      subtext: "Ready for discovery",
      icon: Users,
      accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    },
    {
      label: "ICP Match Rate",
      value: "78%",
      subtext: "High-fit prospect ratio",
      icon: Target,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
    {
      label: "Win Rate",
      value: "32%",
      subtext: "Trailing 90 days",
      icon: TrendingUp,
      accent: "text-violet-300 border-violet-400/20 bg-violet-400/10",
    },
  ];

  const funnelStreams = [
    {
      name: "Discovery",
      count: 24,
      note: "Initial qualification and demos",
      icon: Zap,
      accent: "border-indigo-400/20 bg-indigo-400/10 text-indigo-300",
    },
    {
      name: "Validation",
      count: 12,
      note: "Technical deep dives and POCs",
      icon: LineChart,
      accent: "border-amber-400/20 bg-amber-400/10 text-amber-300",
    },
    {
      name: "Negotiation",
      count: 8,
      note: "Procurement and legal review",
      icon: Building2,
      accent: "border-rose-400/20 bg-rose-400/10 text-rose-300",
    },
  ];

  const getStageStyle = (stage: Customer["stage"]) => {
    switch (stage) {
      case "Discovery":
        return "border-indigo-400/20 bg-indigo-400/10 text-indigo-300";
      case "Validation":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      case "Negotiation":
        return "border-rose-400/20 bg-rose-400/10 text-rose-300";
      case "Closed":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const getFitStyle = (fit: Customer["icpFit"]) => {
    switch (fit) {
      case "High":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      case "Medium":
        return "border-cyan-400/20 bg-cyan-400/10 text-cyan-300";
      case "Low":
        return "border-white/10 bg-white/5 text-slate-300";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  return (
    <Layout currentPageName="Customers">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(16,185,129,0.12),rgba(59,130,246,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <BarChart3 className="h-3.5 w-3.5 text-emerald-300" />
                Customer Intelligence
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Growth, pipeline, and ICP momentum
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                Track how our product is translating to market value. Monitor
                active opportunities, qualify against our Ideal Customer
                Profile, and accelerate the sales funnel.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Quarter goal
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    Upmarket Expansion
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Focus segment
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-300">
                    Enterprise SaaS
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3 lg:w-90">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Current Velocity</p>
                <p className="mt-2 text-lg font-semibold text-white">
                  +18% M/M
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Deal velocity is increasing compared to last quarter.
                </p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Pipeline Health</p>
                <p className="mt-2 text-lg font-semibold text-emerald-300">
                  Strong
                </p>
                <p className="mt-1 text-xs leading-5 text-slate-400">
                  Good distribution across early and late stages.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stats */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {pipelineStats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <p className="text-sm font-medium text-slate-300">
                    {stat.label}
                  </p>
                  <p className="mt-3 text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-2 text-xs leading-5 text-slate-400">
                    {stat.subtext}
                  </p>
                </div>

                <div
                  className={`flex h-8 2xl:h-12 w-8 2xl:w-12 items-center justify-center rounded-2xl border ${stat.accent}`}
                >
                  <stat.icon className="h-4 2xl:h-5 w-4 2xl:w-5" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Main grid */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left side */}
          <div className="space-y-6 xl:col-span-8">
            {/* Queue */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Active Pipeline
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Accounts currently moving through validation and
                    negotiation.
                  </p>
                </div>

                <div className="flex flex-wrap gap-2">
                  <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-sm text-slate-200 transition hover:bg-white/10">
                    <Filter className="h-4 w-4" />
                    Filter
                  </button>
                </div>
              </div>

              <div className="space-y-3">
                {pipeline.map((deal) => {
                  return (
                    <div
                      key={deal.id}
                      className="rounded-[22px] border border-white/8 bg-black/20 p-4 transition hover:bg-white/5"
                    >
                      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                        <div className="min-w-0 flex-1">
                          <div className="flex flex-wrap items-center gap-2">
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStageStyle(deal.stage)}`}
                            >
                              {deal.stage}
                            </span>
                            <span
                              className={`rounded-full border px-2.5 py-1 text-[11px] font-medium ${getFitStyle(deal.icpFit)}`}
                            >
                              {deal.icpFit} ICP Fit
                            </span>
                            <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                              {deal.tier}
                            </span>
                          </div>

                          <h4 className="mt-3 text-base font-semibold text-white">
                            {deal.name}{" "}
                            <span className="text-slate-400 font-normal mx-2">
                              ·
                            </span>{" "}
                            {deal.value}
                          </h4>

                          <div className="mt-3 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate-400">
                            <span>Owner: {deal.owner}</span>
                            <span className="text-slate-500">|</span>
                            <span>Latest: {deal.lastAction}</span>
                          </div>
                        </div>

                        <button className="rounded-xl border border-white/10 bg-white/5 px-3 py-2 text-xs 2xl:text-sm text-slate-200 transition hover:bg-white/10">
                          Open account
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right side */}
          <div className="space-y-6 xl:col-span-4">
            {/* Streams */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-emerald-400/20 bg-emerald-400/10 text-emerald-300">
                  <LineChart className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    Funnel Distribution
                  </h3>
                  <p className="text-sm text-slate-400">
                    Current volume by stage
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {funnelStreams.map((stream) => (
                  <div
                    key={stream.name}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div>
                        <p className="text-sm font-medium text-white">
                          {stream.name}
                        </p>
                        <p className="mt-1 text-xs text-slate-400">
                          {stream.note}
                        </p>
                      </div>

                      <div className="flex items-center gap-3">
                        <span className="text-xl font-semibold tracking-tight text-white">
                          {stream.count}
                        </span>
                        <div
                          className={`flex h-8 w-8 items-center justify-center rounded-xl border ${stream.accent}`}
                        >
                          <stream.icon className="h-4 w-4" />
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-violet-400/20 bg-violet-400/10 text-violet-300">
                  <Flag className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-base font-semibold text-white">
                    ICP Principles
                  </h3>
                  <p className="text-sm text-slate-400">
                    What makes a great customer
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {[
                  "Clear technical complexity we uniquely solve",
                  "Internal champion with budget authority",
                  "Alignment with our Q2 platform roadmap",
                  "Willingness to act as a design partner",
                ].map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="mt-0.5 h-2.5 w-2.5 rounded-full bg-emerald-400" />
                    <p className="text-sm leading-6 text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
