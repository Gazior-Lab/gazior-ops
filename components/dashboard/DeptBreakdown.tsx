"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Code2, Palette, BarChart3 } from "lucide-react";

type Task = {
  id: string | number;
  department?: "development" | "marketing" | "design";
  status?: "backlog" | "todo" | "in_progress" | "review" | "done";
};

type DeptBreakdownProps = {
  tasks: Task[];
};

const deptConfig = {
  development: {
    icon: Code2,
    color: "text-blue-600",
    bg: "bg-blue-50",
    bar: "bg-blue-500",
  },
  marketing: {
    icon: BarChart3,
    color: "text-green-600",
    bg: "bg-green-50",
    bar: "bg-green-500",
  },
  design: {
    icon: Palette,
    color: "text-purple-600",
    bg: "bg-purple-50",
    bar: "bg-purple-500",
  },
} as const;

export default function DeptBreakdown({ tasks }: DeptBreakdownProps) {
  const totalTasks = tasks.length || 1;

  const depts = (["development", "marketing", "design"] as const).map((d) => {
    const deptTasks = tasks.filter((t) => t.department === d);
    const doneCount = deptTasks.filter((t) => t.status === "done").length;

    return {
      name: d,
      total: deptTasks.length,
      done: doneCount,
      pct: Math.round((deptTasks.length / totalTasks) * 100),
      ...deptConfig[d],
    };
  });

  return (
    <Card>
      <CardHeader className="pb-3">
        <CardTitle className="text-base font-semibold">
          Department Overview
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {depts.map((dept) => (
          <div key={dept.name} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className={`p-1.5 rounded-md ${dept.bg}`}>
                  <dept.icon className={`w-3.5 h-3.5 ${dept.color}`} />
                </div>
                <span className="text-sm font-medium text-gray-700 capitalize">
                  {dept.name}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {dept.done}/{dept.total} done
              </span>
            </div>
            <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full ${dept.bar} transition-all duration-500`}
                style={{
                  width: `${dept.total > 0 ? (dept.done / dept.total) * 100 : 0}%`,
                }}
              />
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
