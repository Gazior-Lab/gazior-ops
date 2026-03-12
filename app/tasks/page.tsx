"use client";

import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
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
import { Plus, Search, Filter } from "lucide-react";
import { format } from "date-fns";
import TaskFormDialog from "@/components/tasks/TaskFormDialog";
import TaskDetailSheet from "@/components/tasks/TaskDetailSheet";
import { Skeleton } from "@/components/ui/skeleton";

const statusColors = {
  backlog: "bg-gray-100 text-gray-600",
  todo: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  review: "bg-purple-100 text-purple-700",
  done: "bg-emerald-100 text-emerald-700",
};

const priorityDots = {
  low: "bg-gray-400",
  medium: "bg-blue-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

export default function Tasks() {
  const queryClient = useQueryClient();
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [statusFilter, setStatusFilter] = useState("all");
  const [priorityFilter, setPriorityFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => base44.entities.Task.list("-created_date", 200),
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const filtered = tasks.filter((t) => {
    const matchSearch =
      !search || t.title?.toLowerCase().includes(search.toLowerCase());
    const matchDept = deptFilter === "all" || t.department === deptFilter;
    const matchStatus = statusFilter === "all" || t.status === statusFilter;
    const matchPriority =
      priorityFilter === "all" || t.priority === priorityFilter;
    return matchSearch && matchDept && matchStatus && matchPriority;
  });

  return (
    <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Tasks</h2>
          <p className="text-sm text-gray-500 mt-0.5">
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
        <div className="relative flex-1 min-w-[200px] max-w-sm">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
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
      <div className="bg-white rounded-xl border overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow className="bg-gray-50/50">
              <TableHead className="w-8"></TableHead>
              <TableHead>Task</TableHead>
              <TableHead className="hidden md:table-cell">Assignee</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="hidden lg:table-cell">Department</TableHead>
              <TableHead className="hidden sm:table-cell">Due Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="w-3 h-3 rounded-full" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell className="hidden md:table-cell">
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-5 w-20 rounded-full" />
                    </TableCell>
                    <TableCell className="hidden lg:table-cell">
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                    <TableCell className="hidden sm:table-cell">
                      <Skeleton className="h-4 w-20" />
                    </TableCell>
                  </TableRow>
                ))
            ) : filtered.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={6}
                  className="text-center py-12 text-gray-400"
                >
                  No tasks found
                </TableCell>
              </TableRow>
            ) : (
              filtered.map((task) => (
                <TableRow
                  key={task.id}
                  className="cursor-pointer hover:bg-gray-50/50 transition-colors"
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
                    {task.tags?.length > 0 && (
                      <div className="flex gap-1 mt-1">
                        {task.tags.slice(0, 2).map((t) => (
                          <span
                            key={t}
                            className="text-[10px] px-1.5 py-0.5 bg-gray-100 rounded text-gray-500"
                          >
                            {t}
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
                      {task.status?.replace(/_/g, " ")}
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

      <TaskFormDialog
        open={formOpen}
        onOpenChange={setFormOpen}
        task={editingTask}
        onSaved={refresh}
      />

      <TaskDetailSheet
        task={selectedTask}
        open={detailOpen}
        onOpenChange={setDetailOpen}
        onEdit={(t) => {
          setEditingTask(t);
          setFormOpen(true);
        }}
        onDelete={() => {}}
        onRefresh={async () => {
          await refresh();
          const updated = await base44.entities.Task.list("-created_date", 200);
          const refreshed = updated.find((t) => t.id === selectedTask?.id);
          if (refreshed) setSelectedTask(refreshed);
        }}
      />
    </div>
  );
}
