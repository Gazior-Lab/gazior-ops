"use client";

import { useState, useRef } from "react";
import { X, LayoutTemplate, Loader2, Code2 } from "lucide-react";
import { createTemplate } from "@/services/communicationsService";

interface TemplateEditorModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function TemplateEditorModal({
  isOpen,
  onClose,
  onSuccess,
}: TemplateEditorModalProps) {
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [name, setName] = useState("");
  const [category, setCategory] = useState("Sales");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");

  // Ref to track the textarea element for cursor position
  const bodyRef = useRef<HTMLTextAreaElement>(null);

  if (!isOpen) return null;

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !subject || !body) {
      setError("Name, Subject, and Body are required.");
      return;
    }

    setIsSaving(true);
    setError(null);

    const result = await createTemplate({ name, category, subject, body });

    setIsSaving(false);

    if (result.success) {
      setName("");
      setSubject("");
      setBody("");
      setCategory("Sales");
      onSuccess();
      onClose();
    } else {
      setError(result.error || "Failed to save template.");
    }
  };

  // Function to inject variable at cursor position
  const handleInsertVariable = (variable: string) => {
    const textarea = bodyRef.current;
    if (!textarea) return;

    // Get current cursor position
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;

    // Split the body and insert the variable
    const newBody = body.substring(0, start) + variable + body.substring(end);

    setBody(newBody);

    // After updating state, put the focus back and move cursor after the inserted variable
    setTimeout(() => {
      textarea.focus();
      const newCursorPos = start + variable.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative flex w-full max-w-3xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(110deg,rgba(15,23,42,0.95),rgba(9,9,11,0.98))] shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <LayoutTemplate className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-white">
              Create Template
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {error && (
          <div className="border-b border-rose-500/20 bg-rose-500/10 px-6 py-3">
            <p className="text-xs font-medium text-rose-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleSave} className="flex flex-col">
          <div className="custom-scrollbar flex max-h-[65vh] flex-col overflow-y-auto lg:flex-row">
            {/* Left side: Editor */}
            <div className="flex-1 space-y-4 p-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Template Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g., Initial Outreach"
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Category
                  </label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  >
                    <option value="Sales">Sales & Outreach</option>
                    <option value="Client">Client Management</option>
                    <option value="General">General</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="mb-1 block text-xs font-medium text-slate-400">
                  Email Subject
                </label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Improving {{companyName}}'s Operations"
                  className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>

              <div className="flex flex-1 flex-col">
                <label className="mb-1 block text-xs font-medium text-slate-400">
                  Email Body
                </label>
                <textarea
                  ref={bodyRef}
                  value={body}
                  onChange={(e) => setBody(e.target.value)}
                  placeholder="Hi {{name}}, ..."
                  className="custom-scrollbar min-h-62.5 w-full flex-1 resize-none rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-slate-300 placeholder-slate-600 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                />
              </div>
            </div>

            {/* Right side: Variable Reference */}
            <div className="w-full border-t border-white/10 bg-black/20 p-6 lg:w-64 lg:border-l lg:border-t-0">
              <div className="mb-4 flex items-center gap-2 text-fuchsia-400">
                <Code2 className="h-4 w-4" />
                <h4 className="text-xs font-semibold uppercase tracking-wider">
                  Dynamic Variables
                </h4>
              </div>
              <p className="mb-4 text-[11px] text-slate-400 leading-relaxed">
                Click to insert into the email body.
              </p>

              <div className="space-y-2">
                {[
                  "{{name}}",
                  "{{companyName}}",
                  "{{role}}",
                  "{{website}}",
                  "{{industry}}",
                  "{{businessChallenge}}",
                  "{{sender_name}}",
                ].map((variable) => (
                  <button
                    key={variable}
                    type="button"
                    onClick={() => handleInsertVariable(variable)}
                    className="flex w-full items-center justify-between rounded-lg border border-white/5 bg-white/5 p-2 transition hover:bg-white/10"
                  >
                    <code className="text-xs text-indigo-300">{variable}</code>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-black/40 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isSaving}
              className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:opacity-50"
            >
              {isSaving && <Loader2 className="h-4 w-4 animate-spin" />}
              Save Template
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
