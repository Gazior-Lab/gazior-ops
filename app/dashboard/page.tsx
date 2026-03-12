"use client";

import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery } from "@tanstack/react-query";
import StatCard from "@/components/dashboard/StatCard";
import RecentTasks from "@/components/dashboard/RecentTasks";
import DeptBreakdown from "@/components/dashboard/DeptBreakdown";
import {
  ListTodo,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Users,
  Megaphone,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

export default function Dashboard() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    base44.auth
      .me()
      .then(setUser)
      .catch(() => {});
  }, []);

  const { data: tasks = [], isLoading: tasksLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => base44.entities.Task.list("-created_date", 100),
  });

  const { data: updates = [] } = useQuery({
    queryKey: ["updates"],
    queryFn: () => base44.entities.TeamUpdate.list("-created_date", 5),
  });

  const { data: members = [] } = useQuery({
    queryKey: ["members"],
    queryFn: () => base44.entities.User.list(),
  });

  const totalTasks = tasks.length;
  const inProgress = tasks.filter((t) => t.status === "in_progress").length;
  const completed = tasks.filter((t) => t.status === "done").length;
  const overdue = tasks.filter(
    (t) =>
      t.due_date && new Date(t.due_date) < new Date() && t.status !== "done",
  ).length;

  const greeting = user?.full_name
    ? `Welcome back, ${user.full_name.split(" ")[0]}`
    : "Welcome back";

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
      <div>
        <h2 className="text-2xl font-bold text-gray-900">{greeting}</h2>
        <p className="text-gray-500 text-sm mt-1">
          Here's what's happening across your teams today.
        </p>
      </div>

      {tasksLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Skeleton key={i} className="h-28 rounded-xl" />
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Tasks"
            value={totalTasks}
            icon={ListTodo}
            color="indigo"
          />
          <StatCard
            title="In Progress"
            value={inProgress}
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="Completed"
            value={completed}
            icon={CheckCircle2}
            color="green"
          />
          <StatCard
            title="Overdue"
            value={overdue}
            icon={AlertTriangle}
            color="red"
            subtitle={overdue > 0 ? "Needs attention" : "All on track"}
          />
        </div>
      )}

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <RecentTasks tasks={tasks} />
        </div>
        <DeptBreakdown tasks={tasks} />
      </div>

      {/* Recent Updates */}
      {updates.length > 0 && (
        <div className="space-y-3">
          <h3 className="text-base font-semibold text-gray-900">
            Latest Updates
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {updates.slice(0, 4).map((update) => (
              <div
                key={update.id}
                className="bg-white rounded-xl border p-4 hover:shadow-sm transition-shadow"
              >
                <div className="flex items-start gap-3">
                  <div className="p-1.5 rounded-md bg-indigo-50">
                    <Megaphone className="w-3.5 h-3.5 text-indigo-600" />
                  </div>
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      {update.title}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">
                      {update.author_name} · {update.department}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
