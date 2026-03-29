"use client";

import Layout from "@/components/Layout";
import {
  BookOpen,
  Sparkles,
  Layers3,
  FlaskConical,
  Folder,
  Zap,
} from "lucide-react";

export default function KnowledgePage() {
  const playbooks = [
    {
      title: "Product Discovery Framework",
      description:
        "Structured approach to validate ideas, user needs, and product direction.",
      tag: "Core",
    },
    {
      title: "Launch Readiness Checklist",
      description:
        "Step-by-step checklist to ensure product quality before release.",
      tag: "Execution",
    },
  ];

  const research = [
    {
      title: "User Interview Insights - v1",
      description:
        "Key patterns from early-stage product interviews and feedback loops.",
    },
    {
      title: "Market Positioning Notes",
      description: "Understanding competitive landscape and messaging angles.",
    },
  ];

  const assets = [
    "UI Component Library",
    "Experiment Templates",
    "Design Tokens",
    "Internal Docs Structure",
  ];

  const activeLearning = [
    "Improving onboarding flow based on user friction",
    "Experiment tracking system design",
    "Knowledge tagging & search structure",
  ];

  const stats = [
    { label: "Total resources", value: 24, icon: BookOpen },
    { label: "Playbooks", value: 6, icon: Layers3 },
    { label: "Research notes", value: 12, icon: FlaskConical },
    { label: "Reusable assets", value: 8, icon: Folder },
  ];

  return (
    <Layout currentPageName="Knowledge">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(34,211,238,0.16),rgba(99,102,241,0.08),rgba(255,255,255,0.03))] p-6 lg:p-8">
          <div className="flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-cyan-300" />
                Learning layer
              </div>

              <h2 className="text-3xl font-semibold text-white lg:text-4xl">
                Turn knowledge into execution advantage
              </h2>

              <p className="mt-3 text-sm text-slate-300 lg:text-base">
                Capture insights, reuse proven workflows, and keep learning
                close to the work that drives progress.
              </p>
            </div>
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
            {/* Playbooks */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Playbooks</h3>

              <div className="space-y-3">
                {playbooks.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-white">{item.title}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {item.description}
                        </p>
                      </div>

                      <span className="text-xs text-cyan-300">{item.tag}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Research */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">
                Research & Insights
              </h3>

              <div className="space-y-3">
                {research.map((item) => (
                  <div
                    key={item.title}
                    className="rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <p className="text-white">{item.title}</p>
                    <p className="text-xs text-slate-400 mt-1">
                      {item.description}
                    </p>
                  </div>
                ))}
              </div>
            </div>

            {/* Assets */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Reusable Assets</h3>

              <div className="flex flex-wrap gap-2">
                {assets.map((item) => (
                  <span
                    key={item}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300"
                  >
                    {item}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="xl:col-span-4 space-y-6">
            {/* Active Learning */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Active Learning</h3>

              <div className="space-y-3">
                {activeLearning.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <Zap className="h-4 w-4 text-cyan-300 mt-1" />
                    <p className="text-sm text-slate-300">{item}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">
                Knowledge Principles
              </h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>• Document learnings early</p>
                <p>• Share context, not just results</p>
                <p>• Keep knowledge close to execution</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
