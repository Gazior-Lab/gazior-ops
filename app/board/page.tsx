"use client";

import { useState } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus } from "lucide-react";

type Priority = "low" | "medium" | "high" | "urgent";
type Department = "development" | "design" | "marketing";
type Status = "backlog" | "todo" | "in_progress" | "review" | "done";

interface Task {
  id: string;
  title: string;
  status: Status;
  priority: Priority;
  department: Department;
  assigned_to_name: string;
}

// Columns definition
const columns: { id: Status; label: string; color: string }[] = [
  { id: "todo", label: "To Do", color: "bg-blue-500" },
  { id: "in_progress", label: "In Progress", color: "bg-amber-500" },
  { id: "review", label: "Review", color: "bg-purple-500" },
  { id: "done", label: "Done", color: "bg-emerald-500" },
];

const priorityDots: Record<Priority, string> = {
  low: "bg-gray-400",
  medium: "bg-blue-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

// Mock data
const initialTasks: Task[] = [
  {
    id: "1",
    title: "Implement Dashboard Layout",
    status: "in_progress",
    priority: "high",
    department: "development",
    assigned_to_name: "Zisan Ahmed",
  },
  {
    id: "2",
    title: "Design Team Manifesto Page",
    status: "todo",
    priority: "medium",
    department: "design",
    assigned_to_name: "Ayesha Khan",
  },
  {
    id: "3",
    title: "Marketing Strategy Review",
    status: "backlog",
    priority: "low",
    department: "marketing",
    assigned_to_name: "Rafiq Hossain",
  },
  {
    id: "4",
    title: "Setup Task Form Modal",
    status: "review",
    priority: "urgent",
    department: "development",
    assigned_to_name: "Zisan Ahmed",
  },
];

export default function Board() {
  const [deptFilter, setDeptFilter] = useState<string>("all");
  const [tasks, setTasks] = useState<Task[]>(initialTasks);
  const [draggedTaskId, setDraggedTaskId] = useState<string | null>(null);

  const filteredTasks = tasks.filter(
    (t) => deptFilter === "all" || t.department === deptFilter,
  );

  const handleDrop = (status: Status) => {
    if (!draggedTaskId) return;

    // Update task in state immutably
    setTasks((prev) =>
      prev.map((t) =>
        t.id === draggedTaskId
          ? {
              ...t,
              status,
            }
          : t,
      ),
    );
    setDraggedTaskId(null);
  };

  return (
    <Layout currentPageName="Board">
      <div className="p-6 lg:p-10 space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Board</h2>
            <p className="text-sm text-gray-500 mt-1">
              Drag tasks between columns to update status
            </p>
          </div>

          <div className="flex gap-3">
            <Select value={deptFilter} onValueChange={setDeptFilter}>
              <SelectTrigger className="w-36">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Depts</SelectItem>
                <SelectItem value="development">Development</SelectItem>
                <SelectItem value="marketing">Marketing</SelectItem>
                <SelectItem value="design">Design</SelectItem>
              </SelectContent>
            </Select>

            <Button>
              <Plus className="w-4 h-4 mr-2" /> New Task
            </Button>
          </div>
        </div>

        {/* Columns */}
        <div className="grid grid-cols-4 gap-3">
          {columns.map((col) => {
            const colTasks = filteredTasks.filter((t) => t.status === col.id);
            return (
              <div
                key={col.id}
                className="shrink-0 full"
                onDragOver={(e) => e.preventDefault()}
                onDrop={() => handleDrop(col.id)}
              >
                {/* Column header */}
                <div className="flex items-center gap-2 mb-3 px-1">
                  <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                  <span className="text-sm font-semibold text-gray-700">
                    {col.label}
                  </span>
                  <span className="text-xs text-gray-400 ml-auto">
                    {colTasks.length}
                  </span>
                </div>

                {/* Column tasks */}
                <div className="space-y-2 min-h-50 bg-gray-50/50 rounded-xl p-2">
                  {colTasks.length === 0 ? (
                    <div className="text-center py-8 text-xs text-gray-400">
                      No tasks
                    </div>
                  ) : (
                    colTasks.map((task) => (
                      <div
                        key={task.id}
                        draggable
                        onDragStart={() => setDraggedTaskId(task.id)}
                        className="bg-white rounded-lg border p-3 cursor-pointer hover:shadow-md transition-shadow group"
                      >
                        <div className="flex items-start gap-2">
                          <div className="min-w-0 flex-1">
                            <p className="text-sm font-medium text-gray-900 line-clamp-2">
                              {task.title}
                            </p>
                            <div className="flex items-center gap-2 mt-2">
                              <div
                                className={`w-2 h-2 rounded-full ${
                                  priorityDots[task.priority]
                                }`}
                              />
                              <span className="text-[10px] text-gray-400 capitalize">
                                {task.department}
                              </span>
                            </div>
                            {task.assigned_to_name && (
                              <p className="text-[11px] text-gray-500 mt-1.5">
                                {task.assigned_to_name}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </Layout>
  );
}
