"use client";

import React from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { createPageUrl } from "@/utils";

type Task = {
  id: string | number;
  title: string;
  assigned_to_name?: string;
  status?: "backlog" | "todo" | "in_progress" | "review" | "done";
  priority?: "low" | "medium" | "high" | "urgent";
};

type RecentTasksProps = {
  tasks: Task[];
};

const statusColors: Record<NonNullable<Task["status"]>, string> = {
  backlog: "bg-gray-100 text-gray-600",
  todo: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  review: "bg-purple-100 text-purple-700",
  done: "bg-emerald-100 text-emerald-700",
};

const priorityDots: Record<NonNullable<Task["priority"]>, string> = {
  low: "bg-gray-400",
  medium: "bg-blue-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

export default function RecentTasks({ tasks }: RecentTasksProps) {
  const recent = tasks.slice(0, 6);

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">Recent Tasks</CardTitle>
        <Link
          href={createPageUrl("Tasks")}
          className="text-sm text-indigo-600 hover:text-indigo-700 font-medium flex items-center gap-1"
        >
          View all <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </CardHeader>
      <CardContent className="space-y-2">
        {recent.length === 0 && (
          <p className="text-sm text-gray-400 text-center py-6">No tasks yet</p>
        )}
        {recent.map((task) => (
          <div
            key={task.id}
            className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
          >
            <div
              className={`w-2 h-2 rounded-full shrink-0 ${
                priorityDots[task.priority ?? "medium"]
              }`}
            />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">
                {task.title}
              </p>
              <p className="text-xs text-gray-400 mt-0.5">
                {task.assigned_to_name || "Unassigned"}
              </p>
            </div>
            <Badge
              className={`text-[10px] shrink-0 ${
                statusColors[task.status ?? "todo"]
              }`}
            >
              {(task.status ?? "todo").replace(/_/g, " ")}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
