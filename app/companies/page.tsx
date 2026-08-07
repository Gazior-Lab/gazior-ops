"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Layout from "@/components/Layout";
import { Company } from "@/types/InquiryTypes";
import { getCompanies } from "@/services/companyService";
import {
  Building2,
  Search,
  Filter,
  ArrowRight,
  Loader2,
  Globe,
  Inbox,
  Send,
  UserCheck,
} from "lucide-react";

export default function CompaniesPage() {
  const [companies, setCompanies] = useState<Company[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    async function fetchCompanies() {
      try {
        const res = await getCompanies();
        setCompanies(res);
      } catch (error) {
        console.error("Failed to load companies:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompanies();
  }, []);

  const filteredCompanies = companies.filter(
    (company) =>
      company.companyName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      company.name.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const getStatusColor = (status: string) => {
    switch (status) {
      case "New Lead":
      case "Questionnaire Pending":
        return "bg-amber-400/10 text-amber-400 border-amber-400/20";
      case "Discovery":
      case "Discovery Completed":
        return "bg-blue-400/10 text-blue-400 border-blue-400/20";
      case "Meeting Scheduled":
        return "bg-fuchsia-400/10 text-fuchsia-400 border-fuchsia-400/20";
      case "Qualified":
      case "Proposal Sent":
        return "bg-emerald-400/10 text-emerald-400 border-emerald-400/20";
      default:
        return "bg-slate-400/10 text-slate-400 border-slate-400/20";
    }
  };

  const activePipelineCount = companies.filter(
    (c) => !["Closed", "Lost"].includes(c.status),
  ).length;

  const discoveryCompletedCount = companies.filter(
    (c) => c.status === "Discovery Completed",
  ).length;

  const stats = [
    {
      label: "Active Pipeline",
      value: activePipelineCount.toString(),
      subtext: "Companies in engagement",
      icon: Inbox,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
    {
      label: "Discovery Completed",
      value: discoveryCompletedCount.toString(),
      subtext: "Ready for qualification",
      icon: Send,
      accent: "text-blue-300 border-blue-400/20 bg-blue-400/10",
    },
    {
      label: "Avg. GOS Score",
      value: "84",
      subtext: "Overall pipeline quality",
      icon: UserCheck,
      accent: "text-fuchsia-300 border-fuchsia-400/20 bg-fuchsia-400/10",
    },
  ];

  return (
    <Layout currentPageName="Companies">
      <div className="mx-auto max-w-7xl space-y-6 pb-12">
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(139,92,246,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <Building2 className="h-3.5 w-3.5 text-blue-400" />
                Pipeline & Intelligence
              </div>
              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Companies
              </h2>
              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                Manage your active pipeline, review discovery data, and track
                account qualification scores.
              </p>
            </div>

            <div className="flex flex-1 items-center justify-end gap-3">
              <div className="relative flex w-full max-w-xs items-center">
                <Search className="absolute left-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  placeholder="Search companies..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="h-10 w-full rounded-xl border border-white/10 bg-black/20 pl-9 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-md focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>
              <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-slate-300 backdrop-blur-md transition hover:bg-white/10 hover:text-white">
                <Filter className="h-4.5 w-4.5" />
              </button>
            </div>
          </div>
        </section>

        <section className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="rounded-2xl border border-white/10 bg-white/4 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-white/5"
            >
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-sm font-medium text-slate-300">
                    {stat.label}
                  </p>
                  <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
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

        {isLoading ? (
          <div className="flex h-64 w-full items-center justify-center rounded-[26px] border border-white/10 bg-white/4 backdrop-blur-xl">
            <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <div className="hidden grid-cols-12 gap-4 px-6 py-3 text-xs font-medium uppercase tracking-wider text-slate-500 lg:grid">
              <div className="col-span-4">Company</div>
              <div className="col-span-3">Primary Objective</div>
              <div className="col-span-2">Status</div>
              <div className="col-span-2 text-right">GOS Score</div>
              <div className="col-span-1"></div>
            </div>

            {filteredCompanies.length > 0 ? (
              filteredCompanies.map((company) => (
                <Link
                  href={`/companies/${company._id}`}
                  key={company._id}
                  className="group grid grid-cols-1 items-center gap-4 rounded-2xl border border-white/5 bg-white/4 p-4 backdrop-blur-xl transition-all hover:bg-white/10 lg:grid-cols-12 lg:px-6 lg:py-5"
                >
                  <div className="col-span-1 flex flex-col gap-1 lg:col-span-4">
                    <span className="text-base font-semibold text-white">
                      {company.companyName || "Unknown Company"}
                    </span>
                    <div className="flex items-center gap-2 text-sm text-slate-400">
                      <Globe className="h-3.5 w-3.5" />
                      <span className="truncate">
                        {company.website || "No website provided"}
                      </span>
                    </div>
                  </div>

                  <div className="col-span-1 lg:col-span-3">
                    <p className="text-sm font-medium text-slate-300">
                      {company.primaryObjective}
                    </p>
                    <p className="mt-0.5 text-xs text-slate-500">
                      via {company.source}
                    </p>
                  </div>

                  <div className="col-span-1 lg:col-span-2">
                    <span
                      className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusColor(company.status)}`}
                    >
                      {company.status}
                    </span>
                  </div>

                  <div className="col-span-1 flex items-center justify-between lg:col-span-2 lg:justify-end">
                    <span className="text-xs font-medium uppercase text-slate-500 lg:hidden">
                      Score
                    </span>
                    <div className="flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-black/40">
                        <span className="text-sm font-bold text-white">
                          {company.qualification?.score || 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="col-span-1 hidden justify-end lg:col-span-1 lg:flex">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/5 text-slate-400 transition-colors group-hover:bg-blue-500 group-hover:text-white">
                      <ArrowRight className="h-4 w-4" />
                    </div>
                  </div>
                </Link>
              ))
            ) : (
              <div className="flex flex-col items-center justify-center rounded-[26px] border border-white/10 bg-white/4 py-20 backdrop-blur-xl">
                <Building2 className="mb-4 h-12 w-12 text-slate-600" />
                <p className="font-medium text-slate-300">No companies found</p>
                <p className="mt-1 text-sm text-slate-500">
                  Try adjusting your search criteria.
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </Layout>
  );
}
