"use client";

import React from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import {
  AlertCircle,
  ArrowLeft,
  ArrowUpRight,
  Building2,
  Calendar,
  CheckCircle2,
  Clock,
  GitPullRequest,
  Mail,
  MessageSquare,
  Phone,
  Target,
  User,
  Wallet,
} from "lucide-react";

export default function CustomerDetailPage() {
  // In a real app, you would fetch this based on the ID parameter
  const account = {
    id: 1,
    name: "Nexus Dynamics",
    tier: "Enterprise",
    stage: "Negotiation",
    owner: "Zisanur H.",
    value: "$120k ARR",
    icpFit: "High",
    website: "nexusdynamics.com",
    industry: "Financial Infrastructure",
    location: "New York, NY",
    description:
      "Enterprise fintech provider looking to replace their legacy internal tooling with a unified R&D command center to align their 200+ engineers.",
  };

  const rdDependencies = [
    {
      id: "RD-142",
      title: "Custom SAML SSO Integration",
      status: "In Progress",
      owner: "Rahim K.",
      impact: "Blocker",
    },
    {
      id: "RD-156",
      title: "Advanced Role-Based Access Control",
      status: "Review",
      owner: "Sarah M.",
      impact: "High",
    },
  ];

  const activityLog = [
    {
      id: 1,
      type: "meeting",
      title: "Technical Review with VP of Engineering",
      date: "Today, 10:00 AM",
      user: "Zisanur H.",
      notes:
        "Walked through the platform architecture. They are highly interested in the execution streams but need SAML SSO finalized before procurement signs off.",
    },
    {
      id: 2,
      type: "email",
      title: "Sent Security Questionnaire Responses",
      date: "Yesterday, 2:30 PM",
      user: "Nabila A.",
      notes:
        "Completed the 120-question InfoSec document and attached SOC2 report.",
    },
    {
      id: 3,
      type: "status",
      title: "Stage moved to Negotiation",
      date: "Oct 24, 2026",
      user: "System",
      notes: "",
    },
  ];

  const contacts = [
    {
      name: "Marcus Thorne",
      role: "VP of Engineering",
      email: "m.thorne@nexus.com",
      phone: "+1 (555) 019-2834",
      primary: true,
    },
    {
      name: "Elena Rodriguez",
      role: "Director of Operations",
      email: "elena.r@nexus.com",
      phone: "+1 (555) 019-8821",
      primary: false,
    },
  ];

  return (
    <Layout currentPageName="Customers">
      <div className="mx-auto max-w-7xl space-y-6 pb-12">
        {/* Top Navigation */}
        <div className="flex items-center gap-4">
          <Link
            href="/customers"
            className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft className="h-4.5 w-4.5" />
          </Link>
          <div className="flex items-center gap-2 text-sm text-slate-400">
            <Link href="/customers" className="hover:text-white transition">
              Customers
            </Link>
            <span>/</span>
            <span className="text-slate-200">{account.name}</span>
          </div>
        </div>

        {/* Hero Card */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(147,51,234,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-start lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 flex flex-wrap items-center gap-2">
                <span className="rounded-full border border-rose-400/20 bg-rose-400/10 px-2.5 py-1 text-[11px] font-medium text-rose-300">
                  {account.stage}
                </span>
                <span className="rounded-full border border-emerald-400/20 bg-emerald-400/10 px-2.5 py-1 text-[11px] font-medium text-emerald-300">
                  {account.icpFit} ICP Fit
                </span>
                <span className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[11px] font-medium text-slate-300">
                  {account.tier}
                </span>
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl flex items-center gap-3">
                {account.name}
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300">
                {account.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 min-w-[240px]">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Pipeline Value</p>
                  <p className="mt-1 text-xl font-semibold text-white">
                    {account.value}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-400/20 bg-indigo-400/10 text-indigo-300">
                  <Wallet className="h-4.5 w-4.5" />
                </div>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4 flex items-center justify-between">
                <div>
                  <p className="text-xs text-slate-400">Account Owner</p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {account.owner}
                  </p>
                </div>
                <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300">
                  <User className="h-4.5 w-4.5" />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main grid */}
        <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
          {/* Left side: Timeline & Dependencies */}
          <div className="space-y-6 xl:col-span-8">
            {/* R&D Dependencies */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-3">
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-rose-400/20 bg-rose-400/10 text-rose-300">
                  <GitPullRequest className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    R&D Dependencies
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Product blockers holding up the deal closing.
                  </p>
                </div>
              </div>

              <div className="space-y-3">
                {rdDependencies.map((dep) => (
                  <div
                    key={dep.id}
                    className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between rounded-[22px] border border-rose-400/15 bg-rose-400/5 p-4"
                  >
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-rose-300">
                          {dep.id}
                        </span>
                        <span className="text-slate-500 text-xs">•</span>
                        <span className="rounded-full border border-white/10 bg-black/40 px-2 py-0.5 text-[10px] font-medium text-slate-300 uppercase tracking-wider">
                          {dep.status}
                        </span>
                      </div>
                      <h4 className="mt-2 text-sm font-medium text-white">
                        {dep.title}
                      </h4>
                      <p className="mt-1 text-xs text-slate-400">
                        Owner: {dep.owner}
                      </p>
                    </div>
                    <button className="rounded-xl border border-white/10 bg-black/40 px-3 py-2 text-xs text-slate-200 transition hover:bg-white/10">
                      View in Execution
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Activity Log */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-white">
                    Activity History
                  </h3>
                  <p className="mt-1 text-sm text-slate-400">
                    Recent interactions and stage changes.
                  </p>
                </div>
                <button className="rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
                  Log Activity
                </button>
              </div>

              <div className="relative space-y-6 before:absolute before:inset-y-0 before:left-6 before:w-px before:bg-white/10">
                {activityLog.map((log) => (
                  <div key={log.id} className="relative flex gap-5">
                    <div className="relative z-10 flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-[#070a14]">
                      {log.type === "meeting" && (
                        <Calendar className="h-5 w-5 text-indigo-400" />
                      )}
                      {log.type === "email" && (
                        <Mail className="h-5 w-5 text-cyan-400" />
                      )}
                      {log.type === "status" && (
                        <Target className="h-5 w-5 text-emerald-400" />
                      )}
                    </div>

                    <div className="flex-1 rounded-[22px] border border-white/8 bg-black/20 p-5">
                      <div className="flex items-center justify-between">
                        <h4 className="text-sm font-medium text-white">
                          {log.title}
                        </h4>
                        <span className="text-xs text-slate-400">
                          {log.date}
                        </span>
                      </div>
                      <p className="mt-1 text-xs text-slate-400">
                        Logged by {log.user}
                      </p>

                      {log.notes && (
                        <div className="mt-3 rounded-xl border border-white/5 bg-white/5 p-3">
                          <p className="text-sm leading-6 text-slate-300">
                            {log.notes}
                          </p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right side: Meta & Contacts */}
          <div className="space-y-6 xl:col-span-4">
            {/* Account Details */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <h3 className="text-base font-semibold text-white mb-4">
                Account Details
              </h3>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-slate-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Industry</p>
                    <p className="text-sm font-medium text-slate-200">
                      {account.industry}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-slate-400">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Website</p>
                    <a
                      href="#"
                      className="text-sm font-medium text-indigo-400 hover:underline"
                    >
                      {account.website}
                    </a>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/20 text-slate-400">
                    <Building2 className="h-4 w-4" />
                  </div>
                  <div>
                    <p className="text-xs text-slate-400">Location</p>
                    <p className="text-sm font-medium text-slate-200">
                      {account.location}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Contacts */}
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-4 flex items-center justify-between">
                <h3 className="text-base font-semibold text-white">
                  Key Contacts
                </h3>
                <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
                  Add
                </button>
              </div>

              <div className="space-y-3">
                {contacts.map((contact) => (
                  <div
                    key={contact.email}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex items-center justify-between mb-3">
                      <div>
                        <p className="text-sm font-medium text-white flex items-center gap-2">
                          {contact.name}
                          {contact.primary && (
                            <span className="rounded-full bg-indigo-500/20 px-1.5 py-0.5 text-[9px] uppercase tracking-wider text-indigo-300">
                              Champion
                            </span>
                          )}
                        </p>
                        <p className="text-xs text-slate-400 mt-0.5">
                          {contact.role}
                        </p>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Mail className="h-3.5 w-3.5 text-slate-500" />
                        {contact.email}
                      </div>
                      <div className="flex items-center gap-2 text-xs text-slate-300">
                        <Phone className="h-3.5 w-3.5 text-slate-500" />
                        {contact.phone}
                      </div>
                    </div>
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
