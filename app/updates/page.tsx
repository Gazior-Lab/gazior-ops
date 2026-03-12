"use client";

import React, { useState } from "react";
import Layout from "@/components/Layout";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import {
  Plus,
  Megaphone,
  Pin,
  Bell,
  AlertCircle,
  CheckCircle2,
  Loader2,
  Trash2,
} from "lucide-react";
import { Skeleton } from "@/components/ui/skeleton";

// ---------------- Types ----------------
type DepartmentType = "all" | "development" | "marketing" | "design";
type UpdateType = "announcement" | "update" | "milestone" | "alert";

interface TeamUpdate {
  id: number;
  title: string;
  content: string;
  department: DepartmentType;
  type: UpdateType;
  pinned: boolean;
  author_name: string;
  created_date: string;
}

// ---------------- Type Config ----------------
const typeConfig: Record<
  UpdateType,
  {
    icon: React.FC<React.SVGProps<SVGSVGElement>>;
    color: string;
    badge: string;
  }
> = {
  announcement: {
    icon: Megaphone,
    color: "bg-indigo-50 text-indigo-600",
    badge: "bg-indigo-100 text-indigo-700",
  },
  update: {
    icon: Bell,
    color: "bg-blue-50 text-blue-600",
    badge: "bg-blue-100 text-blue-700",
  },
  milestone: {
    icon: CheckCircle2,
    color: "bg-emerald-50 text-emerald-600",
    badge: "bg-emerald-100 text-emerald-700",
  },
  alert: {
    icon: AlertCircle,
    color: "bg-red-50 text-red-600",
    badge: "bg-red-100 text-red-700",
  },
};

// ---------------- Mock Data ----------------
const mockUpdates: TeamUpdate[] = [
  {
    id: 1,
    title: "Server Migration Completed",
    content:
      "All servers have been successfully migrated to the new cloud infrastructure.",
    department: "development",
    type: "milestone",
    pinned: true,
    author_name: "Alice Johnson",
    created_date: new Date().toISOString(),
  },
  {
    id: 2,
    title: "Marketing Strategy Update",
    content:
      "We are adjusting our Q2 campaigns to focus more on social media channels.",
    department: "marketing",
    type: "update",
    pinned: false,
    author_name: "Bob Smith",
    created_date: new Date().toISOString(),
  },
  {
    id: 3,
    title: "Urgent Security Alert",
    content:
      "Please update your passwords immediately due to a recent security breach.",
    department: "all",
    type: "alert",
    pinned: true,
    author_name: "Security Team",
    created_date: new Date().toISOString(),
  },
];

// ---------------- Component ----------------
export default function Updates() {
  const [deptFilter, setDeptFilter] = useState<DepartmentType>("all");
  const [formOpen, setFormOpen] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updates, setUpdates] = useState<TeamUpdate[]>(mockUpdates);

  const [form, setForm] = useState<
    Omit<TeamUpdate, "id" | "author_name" | "created_date">
  >({
    title: "",
    content: "",
    department: "all",
    type: "update",
    pinned: false,
  });

  const filtered = [...updates]
    .filter(
      (u) =>
        deptFilter === "all" ||
        u.department === "all" ||
        u.department === deptFilter,
    )
    .sort((a, b) => Number(b.pinned) - Number(a.pinned));

  const handleSave = () => {
    if (!form.title.trim() || !form.content.trim()) return;
    setSaving(true);
    const newUpdate: TeamUpdate = {
      id: updates.length + 1,
      author_name: "You",
      created_date: new Date().toISOString(),
      ...form,
    };
    setUpdates([newUpdate, ...updates]);
    setForm({
      title: "",
      content: "",
      department: "all",
      type: "update",
      pinned: false,
    });
    setFormOpen(false);
    setSaving(false);
  };

  const handleDelete = (id: number) => {
    setUpdates(updates.filter((u) => u.id !== id));
  };

  return (
    <Layout currentPageName="Updates">
      <div className="p-4 lg:p-8 max-w-4xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">
              Updates & Announcements
            </h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Keep your team informed
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
            <Button onClick={() => setFormOpen(true)}>
              <Plus className="w-4 h-4 mr-2" /> Post Update
            </Button>
          </div>
        </div>

        {/* Updates List */}
        <div className="space-y-3">
          {filtered.length === 0 ? (
            <div className="text-center py-16 text-gray-400">
              <Megaphone className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p>No updates yet</p>
            </div>
          ) : (
            filtered.map((update) => {
              const config = typeConfig[update.type];
              const Icon = config.icon;
              return (
                <Card
                  key={update.id}
                  className={`p-5 ${update.pinned ? "ring-1 ring-indigo-200 bg-indigo-50/30" : ""}`}
                >
                  <div className="flex items-start gap-4">
                    <div
                      className={`p-2.5 rounded-xl ${config.color} shrink-0`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className="font-semibold text-gray-900">
                              {update.title}
                            </h3>
                            {update.pinned && (
                              <Pin className="w-3.5 h-3.5 text-indigo-500" />
                            )}
                          </div>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-xs text-gray-400">
                              {update.author_name} ·{" "}
                              {format(
                                new Date(update.created_date),
                                "MMM d, yyyy",
                              )}
                            </span>
                            <Badge className={`text-[10px] ${config.badge}`}>
                              {update.type}
                            </Badge>
                            {update.department !== "all" && (
                              <Badge
                                variant="outline"
                                className="text-[10px] capitalize"
                              >
                                {update.department}
                              </Badge>
                            )}
                          </div>
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="shrink-0 text-gray-400 hover:text-red-500"
                          onClick={() => handleDelete(update.id)}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                      <p className="text-sm text-gray-600 mt-3 whitespace-pre-wrap">
                        {update.content}
                      </p>
                    </div>
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Post Update Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Post Update</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Update title"
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Content *</Label>
                <Textarea
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Share your update with the team..."
                  className="mt-1 h-32"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Type</Label>
                  <Select
                    value={form.type}
                    onValueChange={(v) =>
                      setForm({ ...form, type: v as UpdateType })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="announcement">Announcement</SelectItem>
                      <SelectItem value="update">Update</SelectItem>
                      <SelectItem value="milestone">Milestone</SelectItem>
                      <SelectItem value="alert">Alert</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select
                    value={form.department}
                    onValueChange={(v) =>
                      setForm({ ...form, department: v as DepartmentType })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Teams</SelectItem>
                      <SelectItem value="development">Development</SelectItem>
                      <SelectItem value="marketing">Marketing</SelectItem>
                      <SelectItem value="design">Design</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Switch
                  checked={form.pinned}
                  onCheckedChange={(checked) =>
                    setForm({ ...form, pinned: checked })
                  }
                />
                <Label>Pin to top</Label>
              </div>
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !form.title.trim() || !form.content.trim()}
              >
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}{" "}
                Post
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
