"use client";

import React, { useState } from "react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Calendar,
  User,
  Tag,
  MessageSquare,
  Send,
  Pencil,
  Trash2,
} from "lucide-react";

type Task = {
  id: string;
  title: string;
  description?: string;
  status: "backlog" | "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  department: string;
  assigned_to_name?: string;
  due_date?: string;
  tags?: string[];
  comments?: Comment[];
};

type Comment = {
  author: string;
  author_name: string;
  text: string;
  timestamp: string;
};

type TaskDetailSheetProps = {
  task: Task | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onEdit: (task: Task) => void;
  onDelete: (taskId: string) => void;
  onRefresh: () => void;
};

const statusColors: Record<Task["status"], string> = {
  backlog: "bg-gray-100 text-gray-600",
  todo: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  review: "bg-purple-100 text-purple-700",
  done: "bg-emerald-100 text-emerald-700",
};

const priorityColors: Record<Task["priority"], string> = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

const MOCK_USER = {
  email: "john@example.com",
  full_name: "John Doe",
};

export default function TaskDetailSheet({
  task,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  onRefresh,
}: TaskDetailSheetProps) {
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);
  const [mockTask, setMockTask] = useState<Task | null>(task);

  if (!mockTask) return null;

  const handleComment = async () => {
    if (!comment.trim()) return;
    setSending(true);

    const newComment: Comment = {
      author: MOCK_USER.email,
      author_name: MOCK_USER.full_name,
      text: comment.trim(),
      timestamp: new Date().toISOString(),
    };

    const updatedTask = {
      ...mockTask,
      comments: [...(mockTask.comments || []), newComment],
    };
    setMockTask(updatedTask);
    setComment("");
    setSending(false);
    onRefresh();
  };

  const handleDelete = (taskId: string) => {
    onDelete(taskId);
    onOpenChange(false);
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between gap-2">
            <SheetTitle className="text-lg text-left">
              {mockTask.title}
            </SheetTitle>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={statusColors[mockTask.status]}>
              {mockTask.status.replace(/_/g, " ")}
            </Badge>
            <Badge className={priorityColors[mockTask.priority]}>
              {mockTask.priority}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {mockTask.department}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-5 mt-2">
          {mockTask.description && (
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Description
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {mockTask.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {mockTask.assigned_to_name || "Unassigned"}
              </span>
            </div>
            {mockTask.due_date && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {format(new Date(mockTask.due_date), "MMM d, yyyy")}
                </span>
              </div>
            )}
          </div>

          {(mockTask.tags || []).length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {(mockTask.tags || []).map((t) => (
                <span
                  key={t}
                  className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                >
                  {t}
                </span>
              ))}
            </div>
          )}

          {/* Actions */}
          <div className="flex gap-2 pt-2 border-t">
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                onOpenChange(false);
                onEdit(mockTask);
              }}
            >
              <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={() => handleDelete(mockTask.id)}
            >
              <Trash2 className="w-3.5 h-3.5 mr-1.5" /> Delete
            </Button>
          </div>

          {/* Comments */}
          <div className="pt-2 border-t">
            <p className="text-sm font-medium text-gray-700 flex items-center gap-1.5 mb-3">
              <MessageSquare className="w-4 h-4" /> Comments
            </p>
            <div className="space-y-3 max-h-60 overflow-y-auto">
              {(!mockTask.comments || mockTask.comments.length === 0) && (
                <p className="text-xs text-gray-400 text-center py-3">
                  No comments yet
                </p>
              )}
              {mockTask.comments?.map((c, i) => (
                <div key={i} className="bg-gray-50 rounded-lg p-3">
                  <div className="flex items-center justify-between mb-1">
                    <span className="text-xs font-medium text-gray-700">
                      {c.author_name}
                    </span>
                    <span className="text-[10px] text-gray-400">
                      {format(new Date(c.timestamp), "MMM d, h:mm a")}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{c.text}</p>
                </div>
              ))}
            </div>
            <div className="flex gap-2 mt-3">
              <Textarea
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Add a comment..."
                className="h-16 text-sm"
              />
              <Button
                size="icon"
                onClick={handleComment}
                disabled={sending || !comment.trim()}
              >
                <Send className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </SheetContent>
    </Sheet>
  );
}
