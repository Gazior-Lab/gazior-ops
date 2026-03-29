"use client";

import React from "react";
import Layout from "@/components/Layout";
import { Sparkles, ShieldCheck, Zap } from "lucide-react";

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

const ManifestoPage = () => {
  return (
    <Layout currentPageName="Manifesto">
      <div className="mx-auto max-w-7xl space-y-8 p-6 lg:p-10">
        {/* Hero */}
        <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(99,102,241,0.2),rgba(139,92,246,0.1),rgba(255,255,255,0.05))] p-8 text-white">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 text-xs bg-white/10 px-3 py-1.5 rounded-full">
              <Sparkles className="h-4 w-4 text-indigo-300" />
              System philosophy
            </div>

            <h1 className="text-3xl lg:text-4xl font-semibold">
              Gazior R&D Lab Manifesto
            </h1>

            <p className="mt-4 text-slate-200 text-sm lg:text-base">
              This is how we think, build, and operate. Not just ideas — but
              standards that guide every decision, product, and action.
            </p>
          </div>
        </section>

        {/* Principles */}
        <section>
          <h2 className="text-white text-xl font-semibold mb-4">
            Core Principles
          </h2>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {principles.map((p, i) => (
              <div
                key={i}
                className="rounded-2xl border border-white/10 bg-white/5 p-5"
              >
                <h3 className="text-white font-medium">{p.title}</h3>
                <p className="text-sm text-slate-300 mt-2">{p.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Operating Rules */}
        <section className="grid md:grid-cols-2 gap-6">
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="h-4 w-4 text-yellow-300" />
              <h3 className="text-white font-medium">Operating Rules</h3>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              {rules.map((rule, i) => (
                <p key={i}>• {rule}</p>
              ))}
            </div>
          </div>

          {/* Standards */}
          <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
            <div className="flex items-center gap-2 mb-4">
              <ShieldCheck className="h-4 w-4 text-green-300" />
              <h3 className="text-white font-medium">Cultural Standards</h3>
            </div>

            <div className="space-y-3 text-sm text-slate-300">
              {standards.map((s, i) => (
                <p key={i}>• {s}</p>
              ))}
            </div>
          </div>
        </section>

        {/* Commitment */}
        <section className="rounded-2xl border border-white/10 bg-white/5 p-6 text-center">
          <p className="text-slate-300 max-w-2xl mx-auto">
            This manifesto is not decoration. It defines how we operate, make
            decisions, and build products every single day.
          </p>

          <button className="mt-5 px-6 py-2 rounded-xl bg-indigo-600 text-white text-sm hover:bg-indigo-700 transition">
            Commit to the System
          </button>
        </section>
      </div>
    </Layout>
  );
};

export default ManifestoPage;
