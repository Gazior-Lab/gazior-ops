"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  Activity,
  BarChart3,
  Clock,
  Globe,
  Monitor,
  MousePointerClick,
  Smartphone,
  Tablet,
  Users,
  Loader2,
  LucideIcon,
  MapPin,
  Building2,
} from "lucide-react";
import { StatCard } from "@/components/ui/stat-card";
import { getAnalyticsDashboard } from "@/services/analyticsService";

// --- TypeScript Interfaces ---
interface TopPage {
  path: string;
  views: string;
  bounce: string;
  time: string;
}

interface Referrer {
  source: string;
  type: string;
  visits: string;
  share: number;
}

interface DeviceData {
  device: string;
  share: number;
  visits: string;
  color: string;
}

interface LocationData {
  country: string;
  visits: string;
  share: number;
}

interface CityData {
  city: string;
  visits: string;
  share: number;
}

interface DeviceBreakdown extends DeviceData {
  icon: LucideIcon;
}

interface AnalyticsData {
  totalVisits: string;
  uniqueVisitors: string;
  topPages: TopPage[];
  deviceBreakdown: DeviceData[];
  topReferrers: Referrer[];
  chartData: number[];
  topLocations: LocationData[];
  topCities: CityData[];
  globalAvgTime: string;
  globalBounceRate: string;
}
// -----------------------------

export default function AcquisitionPage() {
  const [timeRange, setTimeRange] = useState<string>("Last 30 Days");
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const [analytics, setAnalytics] = useState<AnalyticsData | null>(null);
  const topLocations: LocationData[] = analytics?.topLocations || [];
  const topCities: CityData[] = analytics?.topCities || [];

  // Fetch dynamic data when component mounts or time range changes
  useEffect(() => {
    async function loadData() {
      setIsLoading(true);

      const res = await getAnalyticsDashboard(timeRange);

      if (res.success && res.data) {
        const responseData: AnalyticsData = res.data;
        setAnalytics(responseData);
      }
      setIsLoading(false);
    }
    loadData();
  }, [timeRange]);

  const trafficStats = [
    {
      label: "Total Visits",
      value: analytics?.totalVisits || "0",
      trend: "Real-time",
      isPositive: true,
      icon: Activity,
      accent: "text-indigo-300 border-indigo-400/20 bg-indigo-400/10",
    },
    {
      label: "Unique Visitors",
      value: analytics?.uniqueVisitors || "0",
      trend: "Real-time",
      isPositive: true,
      icon: Users,
      accent: "text-cyan-300 border-cyan-400/20 bg-cyan-400/10",
    },
    {
      label: "Avg. Session Duration",
      value: analytics?.globalAvgTime || "0m 0s",
      trend: "Avg",
      isPositive: true,
      icon: Clock,
      accent: "text-emerald-300 border-emerald-400/20 bg-emerald-400/10",
    },
    {
      label: "Bounce Rate",
      value: analytics?.globalBounceRate || "0%",
      trend: "Avg",
      isPositive: true,
      icon: MousePointerClick,
      accent: "text-violet-300 border-violet-400/20 bg-violet-400/10",
    },
  ];

  const topPages: TopPage[] = analytics?.topPages || [];
  const topReferrers: Referrer[] = analytics?.topReferrers || [];

  const deviceBreakdown: DeviceBreakdown[] =
    analytics?.deviceBreakdown?.map((d: DeviceData) => {
      let icon = Monitor;
      if (d.device === "Mobile") icon = Smartphone;
      if (d.device === "Tablet") icon = Tablet;
      return { ...d, icon };
    }) || [];

  const chartData: number[] = analytics?.chartData || [];
  const maxChartValue = Math.max(...chartData, 1);

  return (
    <Layout currentPageName="Acquisition">
      <div className="mx-auto max-w-7xl space-y-6 pb-12">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-white/10 bg-[linear-gradient(135deg,rgba(236,72,153,0.12),rgba(139,92,246,0.08),rgba(255,255,255,0.03))] p-6 shadow-[0_20px_60px_rgba(0,0,0,0.28)] lg:p-8">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(255,255,255,0.12),transparent_32%)]" />

          <div className="relative flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
            <div className="flex-1">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
                <Globe className="h-3.5 w-3.5 text-fuchsia-300" />
                Telemetry & Analytics
              </div>

              <h2 className="text-3xl font-semibold tracking-tight text-white lg:text-4xl">
                Website Acquisition
              </h2>

              <p className="mt-3 max-w-2xl text-sm leading-6 text-slate-300 lg:text-base">
                Monitor global website performance, visitor behavior, and
                traffic sources to understand the top of your sales funnel.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Highest Converting
                  </p>
                  <p className="mt-1 text-sm font-medium text-white">
                    {topPages[0]?.path || "Gathering data..."}
                  </p>
                </div>

                <div className="rounded-2xl border border-white/10 bg-white/5 px-4 py-3">
                  <p className="text-xs uppercase tracking-[0.18em] text-slate-400">
                    Top Channel
                  </p>
                  <p className="mt-1 text-sm font-medium text-emerald-300">
                    {topReferrers[0]?.source || "Gathering data..."}
                  </p>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-3 flex-1 justify-end">
              <div className="flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 p-1 backdrop-blur-md">
                {["Last 7 Days", "Last 30 Days", "This Quarter"].map(
                  (range) => (
                    <button
                      key={range}
                      onClick={() => setTimeRange(range)}
                      className={`rounded-lg px-3 py-2.5 text-xs font-medium transition ${
                        timeRange === range
                          ? "bg-white/10 text-white"
                          : "text-slate-400 hover:text-slate-200"
                      }`}
                    >
                      {range}
                    </button>
                  ),
                )}
              </div>
            </div>
          </div>
        </section>

        {isLoading ? (
          <div className="flex h-64 w-full items-center justify-center rounded-[26px] border border-white/10 bg-white/4 backdrop-blur-xl">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        ) : (
          <>
            {/* Stats Grid */}
            <section className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
              {trafficStats.map((stat) => (
                <StatCard
                  key={stat.label}
                  title={stat.label}
                  value={stat.value}
                  trend={stat.trend}
                  isPositive={stat.isPositive}
                  icon={stat.icon}
                  accent={stat.accent}
                />
              ))}
            </section>

            {/* Main Grid */}
            <section className="grid grid-cols-1 gap-6 xl:grid-cols-12">
              {/* Left Side: Trends & Pages */}
              <div className="space-y-6 xl:col-span-8">
                {/* Traffic Overview Chart */}
                <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Traffic Overview
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Daily visit volume over the selected period.
                      </p>
                    </div>
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/5 text-slate-300">
                      <BarChart3 className="h-4.5 w-4.5" />
                    </div>
                  </div>

                  {/* Simulated CSS Bar Chart */}
                  <div className="mt-8 flex h-48 items-end gap-2 px-2 sm:gap-4">
                    {chartData.map((value: number, index: number) => {
                      const heightPercent = (value / maxChartValue) * 100;
                      // Ensure a tiny baseline height (4%) even on 0-visit days so the chart renders properly
                      const visualHeight = Math.max(heightPercent, 4);

                      return (
                        <div
                          key={index}
                          className="group relative flex h-full w-full flex-col items-center justify-end"
                        >
                          <div
                            className="w-full rounded-t-md bg-[linear-gradient(180deg,rgba(99,102,241,0.8),rgba(139,92,246,0.2))] transition-all duration-500 hover:bg-[linear-gradient(180deg,rgba(129,140,248,1),rgba(139,92,246,0.4))]"
                            style={{ height: `${visualHeight}%` }}
                          >
                            {/* Tooltip */}
                            <div className="pointer-events-none absolute -top-10 left-1/2 -translate-x-1/2 rounded-lg bg-black/80 px-2 py-1 text-xs text-white opacity-0 backdrop-blur-md transition-opacity group-hover:opacity-100">
                              {value} visits
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  <div className="mt-4 flex justify-between text-[10px] uppercase tracking-wider text-slate-500">
                    <span>
                      {timeRange === "Last 7 Days" ? "7 Days Ago" : "Start"}
                    </span>
                    <span>Today</span>
                  </div>
                </div>

                {/* Top Pages */}
                <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                  <div className="mb-5 flex items-center justify-between">
                    <h3 className="text-lg font-semibold text-white">
                      Top Pages
                    </h3>
                    <button className="text-xs font-medium text-indigo-400 hover:text-indigo-300">
                      View Full Report
                    </button>
                  </div>

                  <div className="flex flex-col">
                    <div className="grid grid-cols-12 gap-4 border-b border-white/8 pb-3 text-xs font-medium uppercase tracking-wider text-slate-500">
                      <div className="col-span-6">Path</div>
                      <div className="col-span-2 text-right">Views</div>
                      <div className="col-span-2 text-right">Bounce</div>
                      <div className="col-span-2 text-right">Avg Time</div>
                    </div>

                    <div className="space-y-1 pt-3">
                      {topPages.map((page: TopPage, idx: number) => (
                        <div
                          key={page.path}
                          className="grid grid-cols-12 items-center gap-4 rounded-xl px-2 py-3 transition hover:bg-white/5"
                        >
                          <div className="col-span-6 flex items-center gap-3 min-w-0">
                            <span className="text-xs font-medium text-slate-500 w-4">
                              {idx + 1}.
                            </span>
                            <p className="truncate text-sm font-medium text-slate-200">
                              {page.path}
                            </p>
                          </div>
                          <div className="col-span-2 text-right text-sm text-white">
                            {page.views}
                          </div>
                          <div className="col-span-2 text-right text-sm text-slate-400">
                            {page.bounce}
                          </div>
                          <div className="col-span-2 text-right text-sm text-slate-400">
                            {page.time}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* Top Cities (Wide Grid Layout) */}
                <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                  <div className="mb-6 flex items-center justify-between">
                    <div>
                      <h3 className="text-lg font-semibold text-white">
                        Top Cities
                      </h3>
                      <p className="mt-1 text-sm text-slate-400">
                        Urban distribution of your visitors.
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {topCities.map((item: CityData, index: number) => (
                      <div
                        key={index}
                        className="flex flex-col gap-3 rounded-2xl border border-white/5 bg-black/20 p-4 transition-colors hover:bg-white/5"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2.5">
                            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-white/5 border border-white/10">
                              <Building2 className="h-4 w-4 text-white" />
                            </div>
                            <p className="text-sm font-medium text-white">
                              {item.city}
                            </p>
                          </div>
                          <div className="flex items-center gap-3">
                            <span className="text-xs font-medium text-slate-400">
                              {item.share}%
                            </span>
                            <p className="text-sm font-semibold text-white">
                              {item.visits}
                            </p>
                          </div>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full overflow-hidden rounded-full bg-black/40">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(180deg,rgba(99,102,241,0.8),rgba(139,92,246,0.2))] transition-all duration-500 hover:bg-[linear-gradient(180deg,rgba(129,140,248,1),rgba(139,92,246,0.4))]"
                            style={{ width: `${item.share}%` }}
                          />
                        </div>
                      </div>
                    ))}

                    {topCities.length === 0 && (
                      <div className="col-span-full py-6 text-center text-sm text-slate-400">
                        Gathering city data...
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Right Side: Sources & Devices */}
              <div className="space-y-6 xl:col-span-4">
                {/* Top Referrers */}
                <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                  <div className="mb-5">
                    <h3 className="text-base font-semibold text-white">
                      Traffic Sources
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Where visitors are originating from.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {topReferrers.map((referrer: Referrer, index: number) => (
                      <div
                        key={`${referrer.source}-${index}`}
                        className="flex flex-col gap-2"
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <p className="text-sm font-medium text-white">
                              {referrer.source}
                            </p>
                            <span className="text-xs text-slate-500 border border-white/10 bg-white/5 px-1.5 py-0.5 rounded-md">
                              {referrer.type}
                            </span>
                          </div>
                          <p className="text-sm font-semibold text-white">
                            {referrer.visits}
                          </p>
                        </div>

                        {/* Progress Bar */}
                        <div className="h-1.5 w-full rounded-full bg-black/40 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-[linear-gradient(180deg,rgba(99,102,241,0.8),rgba(139,92,246,0.2))] transition-all duration-500 hover:bg-[linear-gradient(180deg,rgba(129,140,248,1),rgba(139,92,246,0.4))]"
                            style={{ width: `${referrer.share}%` }}
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Device Breakdown */}
                <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                  <div className="mb-5">
                    <h3 className="text-base font-semibold text-white">
                      Device Breakdown
                    </h3>
                  </div>

                  <div className="space-y-3">
                    {deviceBreakdown.map((device: DeviceBreakdown) => (
                      <div
                        key={device.device}
                        className="flex items-center justify-between rounded-2xl border border-white/8 bg-black/20 p-4"
                      >
                        <div className="flex items-center gap-3">
                          <div
                            className={`flex h-10 w-10 items-center justify-center rounded-xl text-black ${device.color}`}
                          >
                            <device.icon className="h-4.5 w-4.5" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-white">
                              {device.device}
                            </p>
                            <p className="text-xs text-slate-400 mt-0.5">
                              {device.share}% of total
                            </p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-semibold text-white">
                            {device.visits}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Visual Distribution Bar */}
                  <div className="mt-6 flex h-2 w-full overflow-hidden rounded-full border border-white/5">
                    {deviceBreakdown.map((device: DeviceBreakdown) => (
                      <div
                        key={device.device}
                        className={`h-full ${device.color}`}
                        style={{ width: `${device.share}%` }}
                      />
                    ))}
                  </div>
                  <div className="mt-3 flex justify-between px-1 text-[10px] uppercase tracking-wider text-slate-500">
                    {deviceBreakdown.map((device: DeviceBreakdown) => (
                      <div
                        key={device.device}
                        className="flex items-center gap-1.5"
                      >
                        <span
                          className={`h-2 w-2 rounded-full ${device.color}`}
                        />
                        {device.device}
                      </div>
                    ))}
                  </div>
                </div>

                {/* Top Locations */}
                <div className="rounded-[26px] border border-white/10 bg-white/4 p-6 backdrop-blur-xl">
                  <div className="mb-5">
                    <h3 className="text-base font-semibold text-white">
                      Top Locations
                    </h3>
                    <p className="mt-1 text-sm text-slate-400">
                      Geographic distribution of visitors.
                    </p>
                  </div>

                  <div className="space-y-4">
                    {topLocations.map(
                      (location: LocationData, index: number) => (
                        <div key={index} className="flex flex-col gap-2">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <MapPin className="h-4 w-4 text-white" />
                              <p className="text-sm font-medium text-white">
                                {location.country}
                              </p>
                            </div>
                            <div className="flex items-center gap-3">
                              <span className="text-xs text-slate-400">
                                {location.share}%
                              </span>
                              <p className="text-sm font-semibold text-white">
                                {location.visits}
                              </p>
                            </div>
                          </div>

                          {/* Progress Bar */}
                          <div className="h-1.5 w-full rounded-full bg-black/40 overflow-hidden">
                            <div
                              className="h-full rounded-full bg-[linear-gradient(180deg,rgba(99,102,241,0.8),rgba(139,92,246,0.2))] transition-all duration-500 hover:bg-[linear-gradient(180deg,rgba(129,140,248,1),rgba(139,92,246,0.4))]"
                              style={{ width: `${location.share}%` }}
                            />
                          </div>
                        </div>
                      ),
                    )}

                    {topLocations.length === 0 && (
                      <p className="text-sm text-slate-400 text-center py-4">
                        Gathering location data...
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>
          </>
        )}
      </div>
    </Layout>
  );
}
