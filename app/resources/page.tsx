"use client";

import Layout from "@/components/Layout";
import {
  Folder,
  FileText,
  Link as LinkIcon,
  Star,
  Upload,
  Sparkles,
} from "lucide-react";

type Resource = {
  id: number;
  name: string;
  type: "Doc" | "File" | "Link";
  category: string;
  updated: string;
  pinned?: boolean;
};

export default function ResourcesPage() {
  const resources: Resource[] = [
    {
      id: 1,
      name: "Product Strategy Doc",
      type: "Doc",
      category: "Product",
      updated: "2d ago",
      pinned: true,
    },
    {
      id: 2,
      name: "Design System Figma",
      type: "Link",
      category: "Design",
      updated: "1d ago",
      pinned: true,
    },
    {
      id: 3,
      name: "API Architecture",
      type: "Doc",
      category: "Engineering",
      updated: "5d ago",
    },
    {
      id: 4,
      name: "Landing Page Assets",
      type: "File",
      category: "Marketing",
      updated: "3d ago",
    },
  ];

  const stats = [
    { label: "Total resources", value: resources.length, icon: Folder },
    {
      label: "Documents",
      value: resources.filter((r) => r.type === "Doc").length,
      icon: FileText,
    },
    {
      label: "Links",
      value: resources.filter((r) => r.type === "Link").length,
      icon: LinkIcon,
    },
    {
      label: "Pinned",
      value: resources.filter((r) => r.pinned).length,
      icon: Star,
    },
  ];

  const categories = ["Product", "Design", "Engineering", "Marketing"];

  return (
    <Layout currentPageName="Resources">
      <div className="mx-auto max-w-7xl space-y-6">
        {/* Hero */}
        <section className="rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(59,130,246,0.16),rgba(139,92,246,0.08),rgba(255,255,255,0.03))] p-6 lg:p-8">
          <div className="max-w-3xl">
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-blue-300" />
              Resource layer
            </div>

            <h2 className="text-3xl font-semibold text-white lg:text-4xl">
              Central hub for all resources and assets
            </h2>

            <p className="mt-3 text-sm text-slate-300 lg:text-base">
              Organize files, links, and documents so your team can quickly
              access what matters without friction.
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
            {/* Categories */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Categories</h3>

              <div className="flex flex-wrap gap-2">
                {categories.map((cat) => (
                  <span
                    key={cat}
                    className="rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-slate-300"
                  >
                    {cat}
                  </span>
                ))}
              </div>
            </div>

            {/* Pinned */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Pinned Resources</h3>

              <div className="space-y-3">
                {resources
                  .filter((r) => r.pinned)
                  .map((r) => (
                    <div
                      key={r.id}
                      className="flex justify-between rounded-2xl border border-white/8 bg-black/20 p-4"
                    >
                      <div>
                        <p className="text-white">{r.name}</p>
                        <p className="text-xs text-slate-400 mt-1">
                          {r.category} · {r.type}
                        </p>
                      </div>

                      <Star className="h-4 w-4 text-yellow-300" />
                    </div>
                  ))}
              </div>
            </div>

            {/* All Resources */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">All Resources</h3>

              <div className="space-y-3">
                {resources.map((r) => (
                  <div
                    key={r.id}
                    className="flex justify-between rounded-2xl border border-white/8 bg-black/20 p-4"
                  >
                    <div>
                      <p className="text-white">{r.name}</p>
                      <p className="text-xs text-slate-400 mt-1">
                        {r.category} · {r.type}
                      </p>
                    </div>

                    <span className="text-xs text-slate-400">{r.updated}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right */}
          <div className="xl:col-span-4 space-y-6">
            {/* Actions */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">Quick Actions</h3>

              <div className="space-y-3">
                <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  <Upload className="h-4 w-4" />
                  Upload file
                </button>

                <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  <FileText className="h-4 w-4" />
                  Create document
                </button>

                <button className="flex w-full items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-4 py-2 text-sm text-slate-300">
                  <LinkIcon className="h-4 w-4" />
                  Add link
                </button>
              </div>
            </div>

            {/* Principles */}
            <div className="rounded-2xl border border-white/10 bg-white/4 p-5">
              <h3 className="text-white font-medium mb-4">
                Resource Principles
              </h3>

              <div className="space-y-3 text-sm text-slate-300">
                <p>• Keep resources structured and easy to find</p>
                <p>• Avoid duplication and outdated files</p>
                <p>• Prioritize clarity over volume</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </Layout>
  );
}
