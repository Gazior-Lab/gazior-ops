"use client";

import React, { useState, ChangeEvent } from "react";
import Layout from "@/components/Layout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus, Search } from "lucide-react";
import { format } from "date-fns";
import TaskFormDialog from "@/components/tasks/TaskForm";
import TaskDetailSheet from "@/components/tasks/TaskDetailSheet";

// Status colors
const statusColors: Record<
  "backlog" | "todo" | "in_progress" | "review" | "done",
  string
> = {
  backlog: "bg-gray-100 text-gray-600",
  todo: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  review: "bg-purple-100 text-purple-700",
  done: "bg-emerald-100 text-emerald-700",
};

// Priority dots
const priorityDots: Record<"low" | "medium" | "high" | "urgent", string> = {
  low: "bg-gray-400",
  medium: "bg-blue-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

// Task type
interface TaskType {
  id: string;
  title: string;
  priority: keyof typeof priorityDots;
  status: keyof typeof statusColors;
  department: string;
  assigned_to_name?: string;
  due_date?: string;
  tags?: string[];
}

// Mock tasks
const mockTasks: TaskType[] = [
  {
    id: "1",
    title: "Implement Dashboard Layout",
    priority: "high",
    status: "in_progress",
    department: "development",
    assigned_to_name: "Zisan Ahmed",
    due_date: "2026-03-20",
    tags: ["UI", "Frontend"],
  },
  {
    id: "2",
    title: "Design Team Manifesto Page",
    priority: "medium",
    status: "todo",
    department: "design",
    assigned_to_name: "Ayesha Khan",
    due_date: "2026-03-22",
  },
  {
    id: "3",
    title: "Marketing Strategy Review",
    priority: "low",
    status: "backlog",
    department: "marketing",
    assigned_to_name: "Rafiq Hossain",
    due_date: "2026-03-25",
  },
];

export default function Tasks() {
  const [tasks, setTasks] = useState<TaskType[]>(mockTasks);
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState<TaskType | null>(null);
  const [selectedTask, setSelectedTask] = useState<TaskType | null>(null);
  const [detailOpen, setDetailOpen] = useState(false);

  // Filter tasks
  const filtered = tasks.filter((t) => {
    const matchSearch =
      !search || t.title.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || t.department === deptFilter;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchPriority =
      priorityFilter === "all" || t.priority === priorityFilter;
    return matchSearch && matchDept && matchStatus && matchPriority;
  });

  // Add/update task
  const handleSaveTask = (task: TaskType) => {
    setTasks((prev) => {
      const exists = prev.find((t) => t.id === task.id);
      if (exists) return prev.map((t) => (t.id === task.id ? task : t));
      return [...prev, task];
    });
  };

  return (
    <Layout currentPageName="Tasks">
      <div className="p-6 lg:p-10 max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
            <p className="text-sm text-gray-500 mt-1">
              {tasks.length} total tasks
            </p>
          </div>
          <Button
            onClick={() => {
              setEditingTask(null);
              setFormOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> New Task
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-50 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search tasks..."
              value={search}
              onChange={(e: ChangeEvent<HTMLInputElement>) =>
                setSearch(e.target.value)
              }
              className="pl-9"
            />
          </div>

          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Depts</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>

          <Select value={statusFilter} onValueChange={setStatusFilter}>
            <SelectTrigger className="w-36">
              <SelectValue placeholder="Status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Status</SelectItem>
              <SelectItem value="backlog">Backlog</SelectItem>
              <SelectItem value="todo">To Do</SelectItem>
              <SelectItem value="in_progress">In Progress</SelectItem>
              <SelectItem value="review">Review</SelectItem>
              <SelectItem value="done">Done</SelectItem>
            </SelectContent>
          </Select>

          <Select value={priorityFilter} onValueChange={setPriorityFilter}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priority</SelectItem>
              <SelectItem value="low">Low</SelectItem>
              <SelectItem value="medium">Medium</SelectItem>
              <SelectItem value="high">High</SelectItem>
              <SelectItem value="urgent">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Table */}
        <div className="bg-white rounded-xl border overflow-hidden shadow-sm">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50/50">
                <TableHead className="w-8"></TableHead>
                <TableHead>Task</TableHead>
                <TableHead className="hidden md:table-cell">Assignee</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="hidden lg:table-cell">
                  Department
                </TableHead>
                <TableHead className="hidden sm:table-cell">Due Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filtered.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="text-center py-12 text-gray-400"
                  >
                    No tasks found
                  </TableCell>
                </TableRow>
              ) : (
                filtered.map((task: TaskType) => (
                  <TableRow
                    key={task.id}
                    className="cursor-pointer hover:bg-gray-50/70 hover:shadow-sm transition-all rounded-lg"
                    onClick={() => {
                      setSelectedTask(task);
                      setDetailOpen(true);
                    }}
                  >
                    <TableCell>
                      <div
                        className={`w-2.5 h-2.5 rounded-full ${priorityDots[task.priority]}`}
                      />
                    </TableCell>
                    <TableCell>
                      <p className="font-medium text-gray-900 text-sm">
                        {task.title}
                      </p>
                      {(task.tags ?? []).length > 0 && (
                        <div className="flex gap-1 mt-1">
                          {(task.tags ?? []).slice(0, 2).map((tag: string) => (
                            <span
                              key={tag}
                              className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500"
                            >
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="hidden md:table-cell text-sm text-gray-600">
                      {task.assigned_to_name || "—"}
                    </TableCell>
                    <TableCell>
                      <Badge
                        className={`text-[10px] ${statusColors[task.status]}`}
                      >
                        {task.status.replace(/_/g, " ")}
                      </Badge>
                    </TableCell>
                    <TableCell className="hidden lg:table-cell text-sm text-gray-600 capitalize">
                      {task.department}
                    </TableCell>
                    <TableCell className="hidden sm:table-cell text-sm text-gray-500">
                      {task.due_date
                        ? format(new Date(task.due_date), "MMM d")
                        : "—"}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>

        {/* Task Form & Detail */}
        <TaskFormDialog
          open={formOpen}
          onOpenChange={setFormOpen}
          task={editingTask}
          onSaved={handleSaveTask}
        />
        <TaskDetailSheet
          task={selectedTask}
          open={detailOpen}
          onOpenChange={setDetailOpen}
          onEdit={(task: TaskType) => {
            setEditingTask(task);
            setFormOpen(true);
          }}
          onDelete={() => {
            if (!selectedTask) return;
            setTasks((prev) => prev.filter((t) => t.id !== selectedTask.id));
            setDetailOpen(false);
          }}
          onRefresh={() => {}}
        />
      </div>
    </Layout>
  );
}
