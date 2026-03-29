"use client";

import { ArrowLeft, Compass, Search, Sparkles } from "lucide-react";

export default function NotFound() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[linear-gradient(180deg,#070b14,#0b1020)] text-white">
      {/* Background glow */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-[-10%] top-[-10%] h-80 w-[320px] rounded-full bg-indigo-500/20 blur-3xl" />
        <div className="absolute right-[-10%] top-[10%] h-80 w-80 rounded-full bg-cyan-400/10 blur-3xl" />
        <div className="absolute bottom-[-10%] left-[35%] h-65 w-65 rounded-full bg-violet-500/10 blur-3xl" />
      </div>

      <div className="relative mx-auto flex min-h-screen max-w-6xl items-center justify-center px-6 py-10">
        <div className="grid w-full items-center gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          {/* Left content */}
          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
              <Sparkles className="h-3.5 w-3.5 text-indigo-300" />
              Premium Workspace
            </div>

            <p className="text-sm uppercase tracking-[0.24em] text-slate-500">
              Error 404
            </p>

            <h1 className="mt-3 text-5xl font-semibold tracking-tight text-white sm:text-6xl">
              This page is out of scope.
            </h1>

            <p className="mt-5 max-w-lg text-base leading-7 text-slate-400">
              The page you’re trying to access does not exist, may have been
              moved, or is not yet part of this workspace structure.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <button
                onClick={() => window.history.back()}
                className="inline-flex items-center gap-2 rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-sm font-medium text-slate-100 transition hover:bg-white/10"
              >
                <ArrowLeft className="h-4 w-4" />
                Go back
              </button>

              <button
                onClick={() => (window.location.href = "/")}
                className="inline-flex items-center gap-2 rounded-2xl bg-linear-to-r from-indigo-500 to-cyan-400 px-4 py-3 text-sm font-medium text-white shadow-[0_10px_30px_rgba(99,102,241,0.35)] transition hover:scale-[1.01]"
              >
                <Compass className="h-4 w-4" />
                Return to workspace
              </button>
            </div>

            <div className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-3">
              {[
                {
                  title: "Overview",
                  desc: "Team momentum, execution, and priorities",
                  href: "/overview",
                },
                {
                  title: "Roadmap",
                  desc: "Milestones, owners, and dependencies",
                  href: "/roadmap",
                },
                {
                  title: "Team",
                  desc: "Ownership and responsibility clarity",
                  href: "/team",
                },
              ].map((item) => (
                <button
                  key={item.title}
                  onClick={() => (window.location.href = item.href)}
                  className="rounded-2xl border border-white/10 bg-white/4 p-4 text-left transition hover:bg-white/[0.07]"
                >
                  <p className="text-sm font-semibold text-white">
                    {item.title}
                  </p>
                  <p className="mt-1 text-xs leading-5 text-slate-400">
                    {item.desc}
                  </p>
                </button>
              ))}
            </div>
          </div>

          {/* Right visual card */}
          <div className="rounded-4xl border border-white/10 bg-white/4 p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-2xl">
            <div className="rounded-[28px] border border-white/8 bg-black/20 p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">
                    Navigation status
                  </p>
                  <h2 className="mt-2 text-lg font-semibold text-white">
                    Unavailable route
                  </h2>
                </div>

                <div className="rounded-2xl border border-rose-400/20 bg-rose-400/10 px-3 py-1.5 text-xs font-medium text-rose-300">
                  Missing
                </div>
              </div>

              <div className="mt-8 rounded-3xl border border-dashed border-white/10 bg-linear-to-br from-white/3 to-white/1 p-8">
                <div className="mx-auto flex h-28 w-28 items-center justify-center rounded-full border border-white/10 bg-white/5 text-slate-200 shadow-[inset_0_1px_0_rgba(255,255,255,0.08)]">
                  <Search className="h-10 w-10" />
                </div>

                <div className="mt-6 text-center">
                  <p className="text-6xl font-semibold tracking-tight text-white/90">
                    404
                  </p>
                  <p className="mt-2 text-sm text-slate-400">
                    This route is not currently mapped in your workspace.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                  <p className="text-xs text-slate-500">Suggested action</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Return to main navigation
                  </p>
                </div>

                <div className="rounded-2xl border border-white/8 bg-white/3 p-4">
                  <p className="text-xs text-slate-500">System note</p>
                  <p className="mt-2 text-sm font-medium text-white">
                    Check route naming consistency
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
