"use client";

import Layout from "@/components/Layout";
import { Sparkles, ShieldCheck, Zap, BrainCircuit, Star } from "lucide-react";

const principles = [
  {
    title: "Innovation First",
    description:
      "We prioritize creative solutions and experiment boldly to solve complex problems.",
  },
  {
    title: "Collaboration Over Ego",
    description:
      "We grow stronger by sharing knowledge and supporting each other.",
  },
  {
    title: "Quality & Excellence",
    description:
      "Every output reflects our standards. We don’t ship mediocrity.",
  },
  {
    title: "Transparency & Trust",
    description: "We communicate openly and operate with honesty.",
  },
  {
    title: "Continuous Learning",
    description: "We stay curious, evolve constantly, and share insights.",
  },
];

const rules = [
  "We ship fast, but never careless",
  "We document decisions, not just outcomes",
  "We solve problems, not assign blame",
  "We focus on impact, not activity",
];

const standards = [
  "Clarity over complexity",
  "Consistency over randomness",
  "Ownership over dependency",
  "Execution over intention",
];

export default function ManifestoPage() {
  return (
    <Layout currentPageName="Manifesto">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* HERO (match system style) */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.18),rgba(139,92,246,0.10),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:justify-between">
            <div className="max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
                <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
                System foundation
              </div>

              <h1 className="text-3xl font-semibold text-white lg:text-4xl">
                Gazior R&D Manifesto
              </h1>

              <p className="mt-3 text-sm text-slate-300 lg:text-base">
                This is the operating philosophy behind everything we build. Not
                opinions — but standards that define how our system works.
              </p>

              <div className="mt-6 flex gap-3 flex-wrap">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-400">System role</p>
                  <p className="text-sm text-white">Behavioral foundation</p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs text-slate-400">Impact</p>
                  <p className="text-sm text-cyan-300">Guides all decisions</p>
                </div>
              </div>
            </div>

            {/* right signal */}
            <div className="grid grid-cols-2 gap-3">
              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Consistency</p>
                <p className="text-lg text-emerald-300">High</p>
              </div>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <p className="text-xs text-slate-400">Clarity</p>
                <p className="text-lg text-white">Strong</p>
              </div>
            </div>
          </div>
        </section>

        {/* PRINCIPLES */}
        <section>
          <div className="mb-5">
            <h2 className="text-white text-lg font-semibold">
              Core Principles
            </h2>
            <p className="text-sm text-slate-400">
              The mindset that shapes how we think and build
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {principles.map((p, i) => (
              <div
                key={i}
                className="rounded-[24px] border border-white/10 bg-white/4 p-5 backdrop-blur-xl"
              >
                <h3 className="text-white font-semibold">{p.title}</h3>
                <p className="text-sm text-slate-300 mt-3 leading-6">
                  {p.description}
                </p>
              </div>
            ))}
          </div>
        </section>

        {/* RULES + STANDARDS */}
        <section className="grid md:grid-cols-2 gap-6">
          {/* RULES */}
          <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-yellow-300" />
              <h3 className="text-white font-semibold">Operating Rules</h3>
            </div>

            <div className="space-y-3">
              {rules.map((rule, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-black/20 p-3"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-yellow-300" />
                  <p className="text-sm text-slate-300">{rule}</p>
                </div>
              ))}
            </div>
          </div>

          {/* STANDARDS */}
          <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-4 w-4 text-green-300" />
              <h3 className="text-white font-semibold">Cultural Standards</h3>
            </div>

            <div className="space-y-3">
              {standards.map((s, i) => (
                <div
                  key={i}
                  className="flex items-start gap-3 rounded-xl border border-white/8 bg-black/20 p-3"
                >
                  <div className="mt-1 h-2 w-2 rounded-full bg-green-300" />
                  <p className="text-sm text-slate-300">{s}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SYSTEM NOTE (very important) */}
        <section className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
          <div className="flex items-center gap-2 mb-4">
            <BrainCircuit className="text-cyan-300" />
            <h3 className="text-white font-semibold">System Note</h3>
          </div>

          <p className="text-sm text-slate-300 max-w-3xl">
            This manifesto is not a statement — it is infrastructure. Every
            product, decision, and execution layer is shaped by these
            principles. If the system drifts, we return here.
          </p>

          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-indigo-400/20 bg-indigo-400/10 px-3 py-1 text-xs text-indigo-300">
            <Star className="h-3 w-3" />
            Foundation of the system
          </div>
        </section>

        {/* COMMITMENT */}
        <section className="rounded-[26px] border border-white/10 bg-white/4 p-6 text-center backdrop-blur-xl">
          <p className="text-slate-300 max-w-2xl mx-auto">
            This manifesto defines how we operate. Every team member is expected
            to align with these principles in daily work.
          </p>

          <button className="mt-5 px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition">
            Commit to the System
          </button>
        </section>
      </div>
    </Layout>
  );
}
