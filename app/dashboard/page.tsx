"use client";

import React from "react";
import Layout from "@/components/Layout";
import StatCard from "@/components/dashboard/StatCard";
import RecentTasks from "@/components/dashboard/RecentTasks";
import DeptBreakdown from "@/components/dashboard/DeptBreakdown";
import {
  ListTodo,
  Clock,
  CheckCircle2,
  AlertTriangle,
  Megaphone,
} from "lucide-react";

export default function Dashboard() {
  // mock user
  const user = {
    full_name: "Zisan Ahmed",
  };

  // mock tasks
  const tasks = [
    {
      id: 1,
      title: "Design landing page",
      status: "in_progress",
      department: "design",
      due_date: "2026-03-15",
    },
    {
      id: 2,
      title: "Implement auth system",
      status: "done",
      department: "development",
      due_date: "2026-03-10",
    },
    {
      id: 3,
      title: "Marketing campaign planning",
      status: "in_progress",
      department: "marketing",
      due_date: "2026-03-18",
    },
    {
      id: 4,
      title: "Fix dashboard bugs",
      status: "todo",
      department: "development",
      due_date: "2026-03-05",
    },
  ];

  // mock updates
  const updates = [
    {
      id: 1,
      title: "New design system components added",
      author_name: "Sarah",
      department: "design",
    },
    {
      id: 2,
      title: "Backend API performance improved",
      author_name: "Rahim",
      department: "development",
    },
    {
      id: 3,
      title: "New marketing campaign launched",
      author_name: "Karim",
      department: "marketing",
    },
  ];

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
    <Layout currentPageName="Dashboard">
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-6">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">{greeting}</h2>
          <p className="text-gray-500 text-sm mt-1">
            {`Here's what's happening across your teams today.`}
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            title="Total Tasks"
            subtitle={""}
            value={totalTasks}
            icon={ListTodo}
            color="indigo"
          />
          <StatCard
            title="In Progress"
            subtitle={""}
            value={inProgress}
            icon={Clock}
            color="orange"
          />
          <StatCard
            title="Completed"
            subtitle={""}
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

        {/* Tasks + Department Breakdown */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <RecentTasks tasks={tasks} />
          </div>
          <DeptBreakdown tasks={tasks} />
        </div>

        {/* Updates */}
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
    </Layout>
  );
}
