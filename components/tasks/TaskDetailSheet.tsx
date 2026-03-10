import React, { useState } from "react";
import { base44 } from "@/api/base44Client";
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

const statusColors = {
  backlog: "bg-gray-100 text-gray-600",
  todo: "bg-blue-100 text-blue-700",
  in_progress: "bg-amber-100 text-amber-700",
  review: "bg-purple-100 text-purple-700",
  done: "bg-emerald-100 text-emerald-700",
};

const priorityColors = {
  low: "bg-gray-100 text-gray-600",
  medium: "bg-blue-100 text-blue-700",
  high: "bg-orange-100 text-orange-700",
  urgent: "bg-red-100 text-red-700",
};

export default function TaskDetailSheet({
  task,
  open,
  onOpenChange,
  onEdit,
  onDelete,
  onRefresh,
}) {
  const [comment, setComment] = useState("");
  const [sending, setSending] = useState(false);

  if (!task) return null;

  const handleComment = async () => {
    if (!comment.trim()) return;
    setSending(true);
    const user = await base44.auth.me();
    const newComment = {
      author: user.email,
      author_name: user.full_name || user.email,
      text: comment.trim(),
      timestamp: new Date().toISOString(),
    };
    const existingComments = task.comments || [];
    await base44.entities.Task.update(task.id, {
      comments: [...existingComments, newComment],
    });
    setComment("");
    setSending(false);
    onRefresh();
  };

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="sm:max-w-md overflow-y-auto">
        <SheetHeader className="pb-4">
          <div className="flex items-start justify-between gap-2">
            <SheetTitle className="text-lg text-left">{task.title}</SheetTitle>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            <Badge className={statusColors[task.status]}>
              {task.status?.replace(/_/g, " ")}
            </Badge>
            <Badge className={priorityColors[task.priority]}>
              {task.priority}
            </Badge>
            <Badge variant="outline" className="capitalize">
              {task.department}
            </Badge>
          </div>
        </SheetHeader>

        <div className="space-y-5 mt-2">
          {task.description && (
            <div>
              <p className="text-sm text-gray-500 font-medium mb-1">
                Description
              </p>
              <p className="text-sm text-gray-700 whitespace-pre-wrap">
                {task.description}
              </p>
            </div>
          )}

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 text-sm">
              <User className="w-4 h-4 text-gray-400" />
              <span className="text-gray-600">
                {task.assigned_to_name || "Unassigned"}
              </span>
            </div>
            {task.due_date && (
              <div className="flex items-center gap-2 text-sm">
                <Calendar className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">
                  {format(new Date(task.due_date), "MMM d, yyyy")}
                </span>
              </div>
            )}
          </div>

          {task.tags?.length > 0 && (
            <div className="flex items-center gap-2 flex-wrap">
              <Tag className="w-4 h-4 text-gray-400" />
              {task.tags.map((t) => (
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
                onEdit(task);
              }}
            >
              <Pencil className="w-3.5 h-3.5 mr-1.5" /> Edit
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="text-red-600 hover:text-red-700 hover:bg-red-50"
              onClick={async () => {
                await base44.entities.Task.delete(task.id);
                onOpenChange(false);
                onRefresh();
              }}
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
              {(!task.comments || task.comments.length === 0) && (
                <p className="text-xs text-gray-400 text-center py-3">
                  No comments yet
                </p>
              )}
              {task.comments?.map((c, i) => (
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
