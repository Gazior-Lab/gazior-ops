"use client";

import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import Layout from "@/components/Layout";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, GripVertical } from "lucide-react";
import TaskFormDialog from "@/components/tasks/TaskForm";
import TaskDetailSheet from "@/components/tasks/TaskDetailSheet";
import { Skeleton } from "@/components/ui/skeleton";

const columns = [
  { id: "backlog", label: "Backlog", color: "bg-gray-400" },
  { id: "todo", label: "To Do", color: "bg-blue-500" },
  { id: "in_progress", label: "In Progress", color: "bg-amber-500" },
  { id: "review", label: "Review", color: "bg-purple-500" },
  { id: "done", label: "Done", color: "bg-emerald-500" },
];

const priorityDots = {
  low: "bg-gray-400",
  medium: "bg-blue-500",
  high: "bg-orange-500",
  urgent: "bg-red-500",
};

export default function Board() {
  const queryClient = useQueryClient();
  const [deptFilter, setDeptFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);
  const [detailOpen, setDetailOpen] = useState(false);
  const [draggedTaskId, setDraggedTaskId] = useState(null);

  const { data: tasks = [], isLoading } = useQuery({
    queryKey: ["tasks"],
    queryFn: () => base44.entities.Task.list("-created_date", 200),
  });

  const refresh = () => queryClient.invalidateQueries({ queryKey: ["tasks"] });

  const filtered = tasks.filter(
    (t) => deptFilter === "all" || t.department === deptFilter,
  );

  const handleDrop = async (status) => {
    if (!draggedTaskId) return;
    const task = tasks.find((t) => t.id === draggedTaskId);
    if (task && task.status !== status) {
      await base44.entities.Task.update(task.id, { status });
      refresh();
    }
    setDraggedTaskId(null);
  };

  return (
    <Layout currentPageName="Board">
      <div className="p-4 lg:p-8 max-w-full mx-auto space-y-5">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">Board</h2>
          <p className="text-sm text-gray-500 mt-0.5">
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
          <Button
            onClick={() => {
              setEditingTask(null);
              setFormOpen(true);
            }}
          >
            <Plus className="w-4 h-4 mr-2" /> New Task
          </Button>
        </div>
      </div>

      <div className="flex gap-4 overflow-x-auto pb-4">
        {columns.map((col) => {
          const colTasks = filtered.filter((t) => t.status === col.id);
          return (
            <div
              key={col.id}
              className="flex-shrink-0 w-64 lg:w-72"
              onDragOver={(e) => e.preventDefault()}
              onDrop={() => handleDrop(col.id)}
            >
              <div className="flex items-center gap-2 mb-3 px-1">
                <div className={`w-2.5 h-2.5 rounded-full ${col.color}`} />
                <span className="text-sm font-semibold text-gray-700">
                  {col.label}
                </span>
                <span className="text-xs text-gray-400 ml-auto">
                  {colTasks.length}
                </span>
              </div>
              <div className="space-y-2 min-h-[200px] bg-gray-50/50 rounded-xl p-2">
                {isLoading ? (
                  Array(2)
                    .fill(0)
                    .map((_, i) => (
                      <Skeleton key={i} className="h-24 rounded-lg" />
                    ))
                ) : colTasks.length === 0 ? (
                  <div className="text-center py-8 text-xs text-gray-400">
                    No tasks
                  </div>
                ) : (
                  colTasks.map((task) => (
                    <div
                      key={task.id}
                      draggable
                      onDragStart={() => setDraggedTaskId(task.id)}
                      onClick={() => {
                        setSelectedTask(task);
                        setDetailOpen(true);
                      }}
                      className="bg-white rounded-lg border p-3 cursor-pointer hover:shadow-md transition-shadow group"
                    >
                      <div className="flex items-start gap-2">
                        <GripVertical className="w-4 h-4 text-gray-300 mt-0.5 opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                        <div className="min-w-0 flex-1">
                          <p className="text-sm font-medium text-gray-900 line-clamp-2">
                            {task.title}
                          </p>
                          <div className="flex items-center gap-2 mt-2">
                            <div
                              className={`w-2 h-2 rounded-full ${priorityDots[task.priority]}`}
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
    </Layout>
  );
}
