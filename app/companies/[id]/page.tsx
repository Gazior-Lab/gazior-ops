"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Layout from "@/components/Layout";
import { Company } from "@/types/InquiryTypes";
import { getCompanyById } from "@/services/companyService";
import EmailComposer from "@/components/communication/EmailComposer";
import { Send } from "lucide-react"; // Add Send if not already imported
import {
  Building2,
  Mail,
  User,
  Globe,
  Loader2,
  ArrowLeft,
  Clock,
  DollarSign,
  Users2,
  Server,
  Sparkles,
  Target,
  FileText,
  Activity,
} from "lucide-react";

type TabType = "overview" | "discovery" | "intelligence";

export default function CompanyProfilePage() {
  const params = useParams();
  const router = useRouter();
  const [company, setCompany] = useState<Company | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [isComposerOpen, setIsComposerOpen] = useState(false);

  useEffect(() => {
    async function fetchCompany() {
      if (!params.id) return;
      try {
        const companyData = await getCompanyById(params.id as string);
        if (companyData) {
          setCompany(companyData);
        }
      } catch (error) {
        console.error("Failed to load company:", error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchCompany();
  }, [params.id]);

  if (isLoading) {
    return (
      <Layout currentPageName="Companies">
        <div className="flex min-h-[60vh] items-center justify-center">
          <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
        </div>
      </Layout>
    );
  }

  if (!company) {
    return (
      <Layout currentPageName="Companies">
        <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
          <Building2 className="h-12 w-12 text-slate-600" />
          <div>
            <h3 className="text-xl font-medium text-white">
              Company Not Found
            </h3>
            <p className="mt-1 text-sm text-slate-400">
              The record you are looking for does not exist.
            </p>
          </div>
          <button
            onClick={() => router.push("/companies")}
            className="mt-4 rounded-xl bg-white/10 px-4 py-2 text-sm font-medium text-white hover:bg-white/20"
          >
            Back to Companies
          </button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout currentPageName="Companies">
      <div className="mx-auto max-w-7xl space-y-6 pb-12">
        <div className="flex items-center justify-between">
          <button
            onClick={() => router.push("/companies")}
            className="flex items-center gap-2 text-sm font-medium text-slate-400 transition hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Pipeline
          </button>

          <div className="flex items-center gap-3">
            <span className="inline-flex items-center rounded-full border border-white/10 bg-black/40 px-3 py-1.5 text-xs font-semibold text-slate-300">
              {company.lifecycleStage}
            </span>
            <span className="inline-flex items-center rounded-full border border-blue-400/20 bg-blue-400/10 px-3 py-1.5 text-xs font-semibold text-blue-400">
              {company.status}
            </span>

            <button
              onClick={() => setIsComposerOpen(true)}
              className="inline-flex items-center gap-2 rounded-lg bg-indigo-500/10 border border-indigo-500/20 px-3 py-1.5 text-xs font-semibold text-indigo-300 transition hover:bg-indigo-500 hover:text-white"
            >
              <Send className="h-3.5 w-3.5" />
              Send Email
            </button>
          </div>
        </div>

        {/* ADD THE COMPOSER COMPONENT ANYWHERE OUTSIDE THE MAIN FLOW */}
        <EmailComposer
          isOpen={isComposerOpen}
          onClose={() => setIsComposerOpen(false)}
          defaultTo={company.email}
          defaultSubject={`Gazior Ops + ${company.companyName}`}
        />

        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.12),rgba(139,92,246,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-6">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl border border-white/10 bg-black/40 text-blue-400 backdrop-blur-xl">
                <Building2 className="h-8 w-8" />
              </div>
              <div>
                <h2 className="text-3xl font-semibold tracking-tight text-white">
                  {company.companyName}
                </h2>
                <div className="mt-2 flex flex-wrap items-center gap-4 text-sm text-slate-300">
                  <div className="flex items-center gap-1.5">
                    <User className="h-4 w-4 text-slate-400" />
                    {company.name}{" "}
                    {company.role && (
                      <span className="text-slate-500">({company.role})</span>
                    )}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Globe className="h-4 w-4 text-slate-400" />
                    <a
                      href={company.website}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-blue-400 hover:underline"
                    >
                      {company.website.replace(/^https?:\/\//, "")}
                    </a>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Mail className="h-4 w-4 text-slate-400" />
                    <a
                      href={`mailto:${company.email}`}
                      className="hover:text-blue-400 hover:underline"
                    >
                      {company.email}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border border-white/10 bg-black/40 p-4 min-w-30 backdrop-blur-xl">
              <span className="text-xs font-medium uppercase tracking-wider text-slate-400">
                GOS Score
              </span>
              <span className="mt-1 text-3xl font-bold text-white">
                {company.qualification?.score || 0}
              </span>
            </div>
          </div>
        </section>

        <div className="flex items-center gap-2 border-b border-white/10 pb-4">
          <button
            onClick={() => setActiveTab("overview")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "overview" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab("discovery")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "discovery" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}
          >
            Discovery Data
          </button>
          <button
            onClick={() => setActiveTab("intelligence")}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${activeTab === "intelligence" ? "bg-white/10 text-white" : "text-slate-400 hover:text-slate-200 hover:bg-white/5"}`}
          >
            Intelligence & Scoring
          </button>
        </div>

        {activeTab === "overview" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <div className="mb-5 flex items-center gap-2">
                <Target className="h-5 w-5 text-blue-400" />
                <h3 className="text-lg font-semibold text-white">
                  Primary Objective
                </h3>
              </div>
              <p className="text-sm font-medium text-slate-300">
                {company.primaryObjective}
              </p>

              <div className="mt-8 mb-5 flex items-center gap-2">
                <FileText className="h-5 w-5 text-fuchsia-400" />
                <h3 className="text-lg font-semibold text-white">
                  Business Challenge
                </h3>
              </div>
              <div className="rounded-2xl border border-white/5 bg-black/20 p-4 text-sm leading-6 text-slate-300">
                {company.businessChallenge || "No challenge detailed."}
              </div>
            </div>

            <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
              <h3 className="text-lg font-semibold text-white mb-5">
                Lead Meta
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-sm text-slate-400">Source</span>
                  <span className="text-sm font-medium text-white">
                    {company.source}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-sm text-slate-400">Created At</span>
                  <span className="text-sm font-medium text-white">
                    {new Date(parseInt(company.createdAt)).toLocaleDateString()}
                  </span>
                </div>
                <div className="flex items-center justify-between border-b border-white/5 pb-4">
                  <span className="text-sm text-slate-400">Enriched At</span>
                  <span className="text-sm font-medium text-white">
                    {company.updatedAt
                      ? new Date(
                          parseInt(company.updatedAt),
                        ).toLocaleDateString()
                      : "Pending"}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "discovery" && (
          <div className="space-y-6">
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              <div className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl">
                <Users2 className="mb-3 h-5 w-5 text-emerald-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Company Size
                </p>
                <p className="mt-1 font-semibold text-white">
                  {company.discovery.employees || "Unknown"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl">
                <DollarSign className="mb-3 h-5 w-5 text-emerald-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Budget Range
                </p>
                <p className="mt-1 font-semibold text-white">
                  {company.discovery.budget}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl">
                <Clock className="mb-3 h-5 w-5 text-emerald-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Timeline
                </p>
                <p className="mt-1 font-semibold text-white">
                  {company.discovery.timeline || "Unknown"}
                </p>
              </div>
              <div className="rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl">
                <Activity className="mb-3 h-5 w-5 text-emerald-400" />
                <p className="text-xs uppercase tracking-wider text-slate-500">
                  Current Situation
                </p>
                <p
                  className="mt-1 font-semibold text-white truncate"
                  title={company.discovery.currentSituation}
                >
                  {company.discovery.currentSituation || "Unknown"}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                <div className="mb-5 flex items-center gap-2">
                  <Server className="h-5 w-5 text-blue-400" />
                  <h3 className="text-lg font-semibold text-white">
                    Current Tech Stack
                  </h3>
                </div>
                {company.discovery.techStack &&
                company.discovery.techStack.length > 0 ? (
                  <div className="flex flex-wrap gap-2">
                    {company.discovery.techStack.map((tech) => (
                      <span
                        key={tech}
                        className="rounded-lg border border-white/10 bg-black/30 px-3 py-1.5 text-sm text-slate-300"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                ) : (
                  <p className="text-sm text-slate-500">
                    No technology data provided.
                  </p>
                )}
              </div>

              <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                <h3 className="text-lg font-semibold text-white mb-5">
                  Additional Context
                </h3>
                <div className="rounded-2xl border border-white/5 bg-black/20 p-4 text-sm leading-6 text-slate-300 min-h-25">
                  {company.discovery.additionalNotes ||
                    "No additional context provided."}
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "intelligence" && (
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
            <div className="lg:col-span-1 space-y-6">
              <div className="rounded-[26px] border border-blue-500/20 bg-blue-500/5 p-6 backdrop-blur-xl">
                <div className="mb-2 flex items-center gap-2">
                  <Target className="h-5 w-5 text-blue-400" />
                  <h3 className="text-base font-semibold text-white">
                    Recommended Service
                  </h3>
                </div>
                <p className="text-xl font-medium text-white">
                  {company.qualification?.recommendedService ||
                    "Pending Analysis"}
                </p>

                <div className="mt-6 border-t border-white/10 pt-4">
                  <span className="text-xs uppercase tracking-wider text-slate-500">
                    Priority Level
                  </span>
                  <p
                    className={`mt-1 font-semibold ${company.qualification?.priority === "Elite" ? "text-fuchsia-400" : "text-slate-300"}`}
                  >
                    {company.qualification?.priority || "Unscored"}
                  </p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 space-y-6">
              <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                <div className="mb-5 flex items-center gap-2">
                  <Sparkles className="h-5 w-5 text-fuchsia-400" />
                  <h3 className="text-lg font-semibold text-white">
                    AI Account Summary
                  </h3>
                </div>
                <div className="rounded-2xl border border-white/5 bg-black/20 p-4 text-sm leading-6 text-slate-300 min-h-25">
                  {company.ai?.summary ||
                    "AI analysis is currently pending for this account. Enrichment pipeline will populate this automatically."}
                </div>

                {company.ai?.painPoints && company.ai.painPoints.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-sm font-medium text-slate-400 mb-3">
                      Predicted Pain Points
                    </h4>
                    <ul className="space-y-2">
                      {company.ai.painPoints.map((point, idx) => (
                        <li
                          key={idx}
                          className="flex items-start gap-2 text-sm text-slate-300"
                        >
                          <span className="text-fuchsia-400 mt-0.5">•</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}
