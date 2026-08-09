"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  LayoutTemplate,
  Plus,
  Search,
  MoreVertical,
  Code2,
  FolderOpen,
  Loader2,
} from "lucide-react";
import TemplateEditorModal from "@/components/modals/TemplateEditorModal";
import { EmailTemplate } from "@/types/Communication";
import { getTemplates } from "@/services/communicationsService";

export default function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditorOpen, setIsEditorOpen] = useState(false);

  const fetchTemplates = async () => {
    setIsLoading(true);
    try {
      const data = await getTemplates();
      setTemplates(data);
    } catch (err) {
      console.log(err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  const filteredTemplates = templates.filter(
    (t) =>
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const salesTemplates = filteredTemplates.filter(
    (t) => t.category === "Sales",
  );
  const clientTemplates = filteredTemplates.filter(
    (t) => t.category === "Client",
  );
  const generalTemplates = filteredTemplates.filter(
    (t) => t.category === "General",
  );

  const TemplateCard = ({ template }: { template: EmailTemplate }) => (
    <div className="group flex cursor-pointer flex-col gap-4 rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl transition hover:bg-white/5">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-indigo-500/20 bg-indigo-500/10 text-indigo-400">
            <LayoutTemplate className="h-4.5 w-4.5" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-white">
              {template.name}
            </h3>
            <p className="mt-0.5 text-xs text-slate-400">
              Updated{" "}
              {new Date(parseInt(template.updatedAt)).toLocaleDateString()}
            </p>
          </div>
        </div>
        <button className="text-slate-500 opacity-0 transition hover:text-white group-hover:opacity-100">
          <MoreVertical className="h-4 w-4" />
        </button>
      </div>

      <div className="rounded-xl border border-white/5 bg-black/20 p-3">
        <p className="truncate text-xs font-medium text-slate-300">
          <span className="mr-2 text-slate-500">Subj:</span>
          {template.subject}
        </p>
      </div>

      <p className="line-clamp-2 text-xs leading-relaxed text-slate-400">
        {template.preview}
      </p>
    </div>
  );

  return (
    <Layout currentPageName="Templates">
      <div className="mx-auto max-w-7xl space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
              <Code2 className="h-3.5 w-3.5 text-fuchsia-400" />
              Dynamic Variables
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Email Templates
            </h2>
            <p className="mt-2 max-w-xl text-sm text-slate-400">
              Create reusable email scripts with dynamic CRM placeholders like{" "}
              <code className="rounded bg-indigo-500/10 px-1 text-indigo-300">
                {"{{first_name}}"}
              </code>
              .
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="relative flex w-full max-w-xs items-center">
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search templates..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-white/10 bg-black/20 pl-9 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-md transition focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
            </div>
            <button
              onClick={() => setIsEditorOpen(true)}
              className="inline-flex h-10 shrink-0 items-center gap-2 rounded-xl bg-indigo-500 px-4 text-sm font-medium text-white transition hover:bg-indigo-600"
            >
              <Plus className="h-4 w-4" />
              New Template
            </button>
          </div>
        </div>

        {/* Dynamic Categories */}
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
          </div>
        ) : templates.length === 0 ? (
          <div className="flex h-64 flex-col items-center justify-center rounded-[28px] border border-white/10 bg-white/4 backdrop-blur-xl">
            <LayoutTemplate className="mb-4 h-10 w-10 text-slate-500 opacity-50" />
            <p className="text-sm text-slate-400">No templates created yet.</p>
          </div>
        ) : (
          <div className="space-y-8">
            {salesTemplates.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2 text-slate-300">
                  <FolderOpen className="h-4 w-4 text-indigo-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Sales & Outreach
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {salesTemplates.map((t) => (
                    <TemplateCard key={t._id} template={t} />
                  ))}
                </div>
              </section>
            )}

            {clientTemplates.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2 text-slate-300">
                  <FolderOpen className="h-4 w-4 text-emerald-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    Client Management
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {clientTemplates.map((t) => (
                    <TemplateCard key={t._id} template={t} />
                  ))}
                </div>
              </section>
            )}

            {generalTemplates.length > 0 && (
              <section>
                <div className="mb-4 flex items-center gap-2 text-slate-300">
                  <FolderOpen className="h-4 w-4 text-slate-400" />
                  <h3 className="text-sm font-semibold uppercase tracking-wider">
                    General
                  </h3>
                </div>
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                  {generalTemplates.map((t) => (
                    <TemplateCard key={t._id} template={t} />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}

        <TemplateEditorModal
          isOpen={isEditorOpen}
          onClose={() => setIsEditorOpen(false)}
          onSuccess={fetchTemplates}
        />
      </div>
    </Layout>
  );
}
