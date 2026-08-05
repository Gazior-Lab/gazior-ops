"use client";

import { useEffect, useState } from "react";
import Layout from "@/components/Layout";
import {
  CheckCircle2,
  Download,
  Filter,
  Inbox,
  Mail,
  MessageSquare,
  MoreHorizontal,
  Plus,
  Search,
  Send,
  UserCheck,
  UserX,
} from "lucide-react";
import { getLeads } from "@/services/leads";

type Lead = {
  id: string;
  name: string;
  role: string;
  company: string;
  email: string;
  source: "Inbound Form" | "Cold Outreach" | "Messenger";
  interest: string;
  budget: string;
  status: "New" | "Contacted" | "Evaluating" | "Unqualified";
  date: string;
};

export default function LeadsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [leads, setLeads] = useState<Lead[]>([]);

  const stats = [
    {
      label: "New Inbound",
      value: "14",
      subtext: "Awaiting triage",
      icon: Inbox,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
    {
      label: "Active Outreach",
      value: "245",
      subtext: "Emails in sequence",
      icon: Send,
      accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
    },
    {
      label: "Conversion Rate",
      value: "8.4%",
      subtext: "Leads to Qualified Pipeline",
      icon: UserCheck,
      accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    },
  ];

  const getStatusStyle = (status: Lead["status"]) => {
    switch (status) {
      case "New":
        return "border-emerald-400/20 bg-emerald-400/10 text-emerald-300";
      case "Contacted":
        return "border-indigo-400/20 bg-indigo-400/10 text-indigo-300";
      case "Evaluating":
        return "border-amber-400/20 bg-amber-400/10 text-amber-300";
      case "Unqualified":
        return "border-white/10 bg-white/5 text-slate-400";
      default:
        return "border-white/10 bg-white/5 text-slate-300";
    }
  };

  const getSourceIcon = (source: Lead["source"]) => {
    switch (source) {
      case "Inbound Form":
        return <Inbox className="h-3.5 w-3.5" />;
      case "Cold Outreach":
        return <Mail className="h-3.5 w-3.5" />;
      case "Messenger":
        return <MessageSquare className="h-3.5 w-3.5" />;
    }
  };

  useEffect(() => {
    const fetchLeads = async () => {
      try {
        const res = await getLeads();
        setLeads(res);
      } catch (err) {
        console.log(err);
      }
    };
    fetchLeads();
  }, []);

  return (
    <Layout currentPageName="Leads">
      <div className="mx-auto max-w-7xl space-y-6 pb-12">
        {/* Header Section */}
        <section className="flex flex-col space-x-5 gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="flex-1">
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Lead Inbox
            </h2>
            <p className="mt-2 text-sm text-slate-400 max-w-2xl">
              Triage inbound inquiries, manage cold outreach lists, and qualify
              prospects before moving them into the active sales pipeline.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-white/10">
              <Download className="h-4 w-4" />
              Import CSV
            </button>
            <button className="inline-flex items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600">
              <Plus className="h-4 w-4" />
              Add Lead
            </button>
          </div>
        </section>

        {/* Stats Grid */}
        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
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
                  className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${stat.accent}`}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
              </div>
            </div>
          ))}
        </section>

        {/* Leads Table Area */}
        <section className="rounded-[28px] border border-white/10 bg-white/4 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl flex flex-col">
          {/* Toolbar */}
          <div className="flex flex-col gap-4 border-b border-white/8 p-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="relative w-full max-w-md">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-500" />
              <input
                type="text"
                placeholder="Search leads by name, company, or email..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-black/20 py-2.5 pl-10 pr-4 text-sm text-white placeholder:text-slate-500 focus:border-indigo-500/50 focus:outline-none focus:ring-1 focus:ring-indigo-500/50 transition"
              />
            </div>
            <div className="flex items-center gap-3">
              <button className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white">
                <Filter className="h-4 w-4" />
                Filter View
              </button>
            </div>
          </div>

          {/* List Headers (Desktop) */}
          <div className="hidden grid-cols-12 gap-4 border-b border-white/8 px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 lg:grid">
            <div className="col-span-3">Prospect</div>
            <div className="col-span-3">Source & Intent</div>
            <div className="col-span-2">Budget</div>
            <div className="col-span-2">Status</div>
            <div className="col-span-2 text-right">Actions</div>
          </div>

          {/* List Body */}
          <div className="flex flex-col">
            {leads.map((lead, idx) => (
              <div
                key={lead.id}
                className={`grid grid-cols-1 gap-4 px-6 py-5 transition hover:bg-white/5 lg:grid-cols-12 lg:items-center ${
                  idx !== leads.length - 1 ? "border-b border-white/6" : ""
                }`}
              >
                {/* Prospect Info */}
                <div className="col-span-3 flex items-start gap-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/10 bg-[linear-gradient(110deg,rgba(10,14,28,0.8),rgba(15,22,40,0.9))] text-sm font-bold text-slate-300">
                    {lead.name.charAt(0)}
                  </div>
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-white">
                      {lead.name}
                    </p>
                    <p className="truncate text-xs text-slate-400 mt-0.5">
                      {lead.role} at{" "}
                      <span className="text-slate-300">{lead.company}</span>
                    </p>
                  </div>
                </div>

                {/* Source & Intent */}
                <div className="col-span-3 flex flex-col gap-1.5">
                  <div className="flex items-center gap-2 text-xs text-slate-300">
                    <span className="flex items-center justify-center rounded bg-white/10 p-1 text-slate-400">
                      {getSourceIcon(lead.source)}
                    </span>
                    {lead.source}
                  </div>
                  <p className="truncate text-xs text-slate-400">
                    Interested in:{" "}
                    <span className="text-slate-300">{lead.interest}</span>
                  </p>
                </div>

                {/* Budget */}
                <div className="col-span-2">
                  <span className="inline-flex items-center rounded-lg border border-white/10 bg-black/20 px-2.5 py-1 text-xs font-medium text-slate-300">
                    {lead.budget}
                  </span>
                </div>

                {/* Status */}
                <div className="col-span-2 flex flex-col items-start gap-1">
                  <span
                    className={`inline-flex items-center rounded-full border px-2.5 py-1 text-[11px] font-medium ${getStatusStyle(
                      lead.status,
                    )}`}
                  >
                    {lead.status}
                  </span>
                  <span className="text-[10px] text-slate-500">
                    {lead.date}
                  </span>
                </div>

                {/* Actions */}
                <div className="col-span-2 flex items-center justify-end gap-2">
                  {lead.status !== "Unqualified" && (
                    <button
                      title="Qualify & Move to Pipeline"
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-emerald-400/20 bg-emerald-400/10 text-emerald-400 transition hover:bg-emerald-400/20 hover:text-emerald-300"
                    >
                      <CheckCircle2 className="h-4 w-4" />
                    </button>
                  )}
                  <button
                    title="Reject Lead"
                    className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-rose-400/10 hover:text-rose-400 hover:border-rose-400/20"
                  >
                    <UserX className="h-4 w-4" />
                  </button>
                  <button className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-400 transition hover:bg-white/10 hover:text-white">
                    <MoreHorizontal className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </Layout>
  );
}
