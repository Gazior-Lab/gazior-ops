import React from "react";
import { LucideIcon, TrendingUp } from "lucide-react";
import { cn } from "@/lib/utils";

export interface StatCardProps extends React.HTMLAttributes<HTMLDivElement> {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon | React.ElementType;
  accent?: string;
  trend?: string;
  isPositive?: boolean;
}

export function StatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  accent = "text-slate-300 border-white/10 bg-white/5",
  trend,
  isPositive = true,
  className,
  ...props
}: StatCardProps) {
  return (
    <div
      className={cn(
        "rounded-3xl border border-white/10 bg-white/4 p-5 shadow-[0_10px_30px_rgba(0,0,0,0.18)] backdrop-blur-xl transition hover:bg-white/5",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col items-start gap-2">
        <div className="flex items-center justify-between w-full">
          <p className="text-sm flex-1 font-medium leading-snug text-slate-300 whitespace-normal">
            {title}
          </p>
          <div
            className={cn(
              "flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl border bg-linear-to-br",
              accent,
            )}
          >
            <Icon className="h-5 w-5" />
          </div>
        </div>

        <div className="w-full flex flex-col">
          <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 w-full">
            <p className="text-3xl flex w-full font-semibold tracking-tight text-white wrap-break-word">
              {value}
            </p>

            {/* Optional Trend Indicator */}
            {trend && (
              <span
                className={cn(
                  "flex items-center gap-1 text-xs font-medium",
                  isPositive ? "text-emerald-400" : "text-rose-400",
                )}
              >
                {trend}
                <TrendingUp
                  className={cn("h-3 w-3", !isPositive && "rotate-180")}
                />
              </span>
            )}
          </div>

          {/* Optional Subtitle */}
          {subtitle && (
            <p className="mt-2 line-clamp-2 text-xs leading-5 text-slate-400">
              {subtitle}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
