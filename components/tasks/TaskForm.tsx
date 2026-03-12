"use client";
import * as React from "react";
import { useState, useEffect } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Loader2 } from "lucide-react";

// Mock members and tasks
const mockMembers = [
  { id: "1", email: "alice@example.com", full_name: "Alice Johnson" },
  { id: "2", email: "bob@example.com", full_name: "Bob Smith" },
];

export type TaskType = {
  id?: string;
  title: string;
  description: string;
  assigned_to: string;
  assigned_to_name: string;
  status: "backlog" | "todo" | "in_progress" | "review" | "done";
  priority: "low" | "medium" | "high" | "urgent";
  department: "development" | "marketing" | "design";
  due_date: string;
  tags: string[];
};

type Props = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  task?: TaskType;
  onSaved: (task: TaskType) => void;
};

export default function TaskFormDialog({
  open,
  onOpenChange,
  task,
  onSaved,
}: Props) {
  const [form, setForm] = useState<TaskType>({
    title: "",
    description: "",
    assigned_to: "",
    assigned_to_name: "",
    status: "todo",
    priority: "medium",
    department: "development",
    due_date: "",
    tags: [],
  });

  const [members] = useState(mockMembers);
  const [saving, setSaving] = useState(false);
  const [tagInput, setTagInput] = useState("");

  // Sync task into form when opening
  useEffect(() => {
    if (task) {
      setForm({
        ...task,
        tags: task.tags || [],
      });
    } else {
      setForm({
        title: "",
        description: "",
        assigned_to: "",
        assigned_to_name: "",
        status: "todo",
        priority: "medium",
        department: "development",
        due_date: "",
        tags: [],
      });
    }
  }, [task, open]);

  const handleMemberSelect = (email: string) => {
    const member = members.find((m) => m.email === email);
    setForm((prev) => ({
      ...prev,
      assigned_to: email,
      assigned_to_name: member?.full_name || email,
    }));
  };

  const handleAddTag = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && tagInput.trim()) {
      e.preventDefault();
      if (!form.tags.includes(tagInput.trim())) {
        setForm((prev) => ({ ...prev, tags: [...prev.tags, tagInput.trim()] }));
      }
      setTagInput("");
    }
  };

  const removeTag = (tag: string) => {
    setForm((prev) => ({ ...prev, tags: prev.tags.filter((t) => t !== tag) }));
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    setSaving(true);
    setTimeout(() => {
      // simulate saving
      setSaving(false);
      onSaved(form);
      onOpenChange(false);
    }, 500);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{task ? "Edit Task" : "Create Task"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div>
            <Label>Title *</Label>
            <Input
              value={form.title}
              onChange={(e) => setForm({ ...form, title: e.target.value })}
              placeholder="Task title"
              className="mt-1"
            />
          </div>

          <div>
            <Label>Description</Label>
            <Textarea
              value={form.description}
              onChange={(e) =>
                setForm({ ...form, description: e.target.value })
              }
              placeholder="Task details..."
              className="mt-1 h-20"
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <Label>Department</Label>
              <Select
                value={form.department}
                onValueChange={(v) =>
                  setForm({ ...form, department: v as TaskType["department"] })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="development">Development</SelectItem>
                  <SelectItem value="marketing">Marketing</SelectItem>
                  <SelectItem value="design">Design</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <Label>Priority</Label>
              <Select
                value={form.priority}
                onValueChange={(v) =>
                  setForm({ ...form, priority: v as TaskType["priority"] })
                }
              >
                <SelectTrigger className="mt-1">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="low">Low</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="urgent">Urgent</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <div>
            <Label>Assign To</Label>
            <Select value={form.assigned_to} onValueChange={handleMemberSelect}>
              <SelectTrigger className="mt-1">
                <SelectValue placeholder="Select team member" />
              </SelectTrigger>
              <SelectContent>
                {members.map((m) => (
                  <SelectItem key={m.id} value={m.email}>
                    {m.full_name || m.email}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div>
            <Label>Tags</Label>
            <div className="flex flex-wrap gap-1.5 mt-1">
              {form.tags?.map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-0.5 bg-indigo-50 text-indigo-700 text-xs rounded-full cursor-pointer hover:bg-indigo-100"
                  onClick={() => removeTag(tag)}
                >
                  {tag} ×
                </span>
              ))}
            </div>
            <Input
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleAddTag}
              placeholder="Type and press Enter to add tags"
              className="mt-1.5"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={handleSave} disabled={saving || !form.title.trim()}>
            {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
            {task ? "Update" : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
