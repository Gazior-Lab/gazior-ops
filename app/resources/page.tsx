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
import { Textarea } from "@/components/ui/textarea";
import {
  Plus,
  ExternalLink,
  FileText,
  Wrench,
  BookOpen,
  LayoutTemplate,
  BookMarked,
  Package,
  Upload,
  Loader2,
  Trash2,
  Search,
} from "lucide-react";

// ---------------- Types ----------------
type CategoryType =
  | "document"
  | "tool"
  | "guide"
  | "template"
  | "reference"
  | "other";

interface Resource {
  id: number;
  title: string;
  description?: string;
  url?: string;
  file_url?: string;
  department: string;
  category: CategoryType;
}

// ---------------- Mock Data ----------------
const mockResources: Resource[] = [
  {
    id: 1,
    title: "React Docs",
    description: "Official React documentation",
    url: "https://reactjs.org",
    department: "development",
    category: "document",
  },
  {
    id: 2,
    title: "Figma UI Kit",
    description: "Premium Figma components",
    file_url: "/mock-files/figma-ui-kit.zip",
    department: "design",
    category: "tool",
  },
  {
    id: 3,
    title: "Marketing Guide 2026",
    description: "Step-by-step marketing strategies",
    url: "https://marketingguide.com",
    department: "marketing",
    category: "guide",
  },
  {
    id: 4,
    title: "Template Pack",
    description: "Project templates for designers",
    file_url: "/mock-files/template-pack.zip",
    department: "design",
    category: "template",
  },
];

// ---------------- Category Config ----------------
const categoryConfig: Record<
  CategoryType,
  { icon: React.FC<React.SVGProps<SVGSVGElement>>; color: string }
> = {
  document: { icon: FileText, color: "bg-blue-50 text-blue-600" },
  tool: { icon: Wrench, color: "bg-orange-50 text-orange-600" },
  guide: { icon: BookOpen, color: "bg-green-50 text-green-600" },
  template: { icon: LayoutTemplate, color: "bg-purple-50 text-purple-600" },
  reference: { icon: BookMarked, color: "bg-cyan-50 text-cyan-600" },
  other: { icon: Package, color: "bg-gray-50 text-gray-600" },
};

// ---------------- Page Component ----------------
export default function Resources() {
  const [search, setSearch] = useState("");
  const [deptFilter, setDeptFilter] = useState("all");
  const [catFilter, setCatFilter] = useState("all");
  const [formOpen, setFormOpen] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [resources, setResources] = useState<Resource[]>(mockResources);
  const [form, setForm] = useState<Omit<Resource, "id">>({
    title: "",
    description: "",
    url: "",
    file_url: "",
    department: "all",
    category: "document",
  });
  const [saving, setSaving] = useState(false);

  // ---------------- Filtered Resources ----------------
  const filtered = resources.filter((r) => {
    const matchSearch =
      !search || r.title.toLowerCase().includes(search.toLowerCase());
    const matchDept =
      deptFilter === "all" ||
      r.department === "all" ||
      r.department === deptFilter;
    const matchCat = catFilter === "all" || r.category === catFilter;
    return matchSearch && matchDept && matchCat;
  });

  // ---------------- Handlers ----------------
  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    // Mock upload: in real use your API here
    setTimeout(() => {
      setForm((prev) => ({ ...prev, file_url: URL.createObjectURL(file) }));
      setUploading(false);
    }, 1000);
  };

  const handleSave = () => {
    if (!form.title.trim()) return;
    setSaving(true);
    setTimeout(() => {
      setResources((prev) => [...prev, { ...form, id: prev.length + 1 }]);
      setSaving(false);
      setForm({
        title: "",
        description: "",
        url: "",
        file_url: "",
        department: "all",
        category: "document",
      });
      setFormOpen(false);
    }, 500);
  };

  const handleDelete = (id: number) => {
    setResources((prev) => prev.filter((r) => r.id !== id));
  };

  // ---------------- Render ----------------
  return (
    <Layout currentPageName="Resources">
      <div className="p-4 lg:p-8 max-w-7xl mx-auto space-y-5">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Resources</h2>
            <p className="text-sm text-gray-500 mt-0.5">
              Shared tools, docs, and references
            </p>
          </div>
          <Button onClick={() => setFormOpen(true)}>
            <Plus className="w-4 h-4 mr-2" /> Add Resource
          </Button>
        </div>

        {/* Filters */}
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative flex-1 min-w-50 max-w-sm">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            <Input
              placeholder="Search resources..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9"
            />
          </div>

          <Select value={deptFilter} onValueChange={setDeptFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Teams</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="marketing">Marketing</SelectItem>
              <SelectItem value="design">Design</SelectItem>
            </SelectContent>
          </Select>

          <Select value={catFilter} onValueChange={setCatFilter}>
            <SelectTrigger className="w-36">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Types</SelectItem>
              <SelectItem value="document">Document</SelectItem>
              <SelectItem value="tool">Tool</SelectItem>
              <SelectItem value="guide">Guide</SelectItem>
              <SelectItem value="template">Template</SelectItem>
              <SelectItem value="reference">Reference</SelectItem>
              <SelectItem value="other">Other</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Resource Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.length === 0 ? (
            <div className="col-span-full text-center py-16 text-gray-400">
              <Package className="w-10 h-10 mx-auto mb-3 text-gray-300" />
              <p>No resources found</p>
            </div>
          ) : (
            filtered.map((resource) => {
              const config = categoryConfig[resource.category];
              const Icon = config.icon;
              return (
                <Card
                  key={resource.id}
                  className="p-5 hover:shadow-md transition-shadow group"
                >
                  <div className="flex items-start justify-between">
                    <div className={`p-2 rounded-lg ${config.color}`}>
                      <Icon className="w-4 h-4" />
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="opacity-0 group-hover:opacity-100 transition-opacity text-gray-400 hover:text-red-500"
                      onClick={() => handleDelete(resource.id)}
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                  <h3 className="font-semibold text-gray-900 mt-3 text-sm">
                    {resource.title}
                  </h3>
                  {resource.description && (
                    <p className="text-xs text-gray-500 mt-1 line-clamp-2">
                      {resource.description}
                    </p>
                  )}
                  <div className="flex items-center gap-2 mt-3 flex-wrap">
                    <Badge variant="outline" className="text-[10px] capitalize">
                      {resource.category}
                    </Badge>
                    {resource.department !== "all" && (
                      <Badge
                        variant="outline"
                        className="text-[10px] capitalize"
                      >
                        {resource.department}
                      </Badge>
                    )}
                  </div>
                  <div className="flex gap-2 mt-3">
                    {resource.url && (
                      <a
                        href={resource.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                      >
                        <ExternalLink className="w-3 h-3" /> Open Link
                      </a>
                    )}
                    {resource.file_url && (
                      <a
                        href={resource.file_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-xs text-indigo-600 hover:text-indigo-700 flex items-center gap-1"
                      >
                        <FileText className="w-3 h-3" /> View File
                      </a>
                    )}
                  </div>
                </Card>
              );
            })
          )}
        </div>

        {/* Add Resource Dialog */}
        <Dialog open={formOpen} onOpenChange={setFormOpen}>
          <DialogContent className="sm:max-w-lg">
            <DialogHeader>
              <DialogTitle>Add Resource</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-2">
              <div>
                <Label>Title *</Label>
                <Input
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  placeholder="Resource title"
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
                  placeholder="Brief description"
                  className="mt-1 h-16"
                />
              </div>
              <div>
                <Label>URL</Label>
                <Input
                  value={form.url}
                  onChange={(e) => setForm({ ...form, url: e.target.value })}
                  placeholder="https://..."
                  className="mt-1"
                />
              </div>
              <div>
                <Label>Or Upload File</Label>
                <div className="mt-1">
                  <label className="flex items-center gap-2 px-4 py-2 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors text-sm text-gray-600">
                    {uploading ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Upload className="w-4 h-4" />
                    )}
                    {form.file_url ? "File uploaded ✓" : "Choose file"}
                    <input
                      type="file"
                      className="hidden"
                      onChange={handleUpload}
                    />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <Label>Category</Label>
                  <Select
                    value={form.category}
                    onValueChange={(v) =>
                      setForm({ ...form, category: v as CategoryType })
                    }
                  >
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="tool">Tool</SelectItem>
                      <SelectItem value="guide">Guide</SelectItem>
                      <SelectItem value="template">Template</SelectItem>
                      <SelectItem value="reference">Reference</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label>Department</Label>
                  <Select
                    value={form.department}
                    onValueChange={(v) => setForm({ ...form, department: v })}
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
            </div>
            <DialogFooter>
              <Button variant="outline" onClick={() => setFormOpen(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSave}
                disabled={saving || !form.title.trim()}
              >
                {saving && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
                Add
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </Layout>
  );
}
