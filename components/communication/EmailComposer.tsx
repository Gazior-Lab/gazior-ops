"use client";

import { useState, useEffect, useRef } from "react";
import {
  X,
  Paperclip,
  Clock,
  LayoutTemplate,
  ChevronDown,
  Minimize2,
  Maximize2,
  Loader2,
} from "lucide-react";
import { sendEmail, getTemplates } from "@/services/communicationsService";
import { EmailTemplate } from "@/types/Communication";

interface EmailComposerProps {
  isOpen: boolean;
  onClose: () => void;
  defaultTo?: string;
  defaultSubject?: string;
  companyId?: string; // Crucial for CRM tracking

  // Perfectly aligned with your database schema
  crmContext?: {
    name?: string;
    companyName?: string;
    role?: string;
    website?: string;
    industry?: string | null;
    businessChallenge?: string;
  };
}

export default function EmailComposer({
  isOpen,
  onClose,
  defaultTo = "",
  defaultSubject = "",
  companyId,
  crmContext,
}: EmailComposerProps) {
  const [to, setTo] = useState(defaultTo);
  const [subject, setSubject] = useState(defaultSubject);
  const [body, setBody] = useState("");
  const [showCcBcc, setShowCcBcc] = useState(false);
  const [cc, setCc] = useState("");
  const [bcc, setBcc] = useState("");

  const [isExpanded, setIsExpanded] = useState(false);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [templates, setTemplates] = useState<EmailTemplate[]>([]);
  const [showTemplateMenu, setShowTemplateMenu] = useState(false);
  const [isLoadingTemplates, setIsLoadingTemplates] = useState(false);
  const templateMenuRef = useRef<HTMLDivElement>(null);

  // 1. Load templates when the composer opens
  useEffect(() => {
    if (isOpen) {
      async function loadTemplates() {
        setIsLoadingTemplates(true);
        const data = await getTemplates();
        setTemplates(data);
        setIsLoadingTemplates(false);
      }
      loadTemplates();
    }
  }, [isOpen]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        templateMenuRef.current &&
        !templateMenuRef.current.contains(event.target as Node)
      ) {
        setShowTemplateMenu(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  if (!isOpen) return null;

  const handleApplyTemplate = (template: EmailTemplate) => {
    let parsedSubject = template.subject;
    let parsedBody = template.body;

    // Map exactly to the new schema variables
    const context = {
      "{{name}}": crmContext?.name || "",
      "{{companyName}}": crmContext?.companyName || "",
      "{{role}}": crmContext?.role || "",
      "{{website}}": crmContext?.website || "",
      "{{industry}}": crmContext?.industry || "",
      "{{businessChallenge}}": crmContext?.businessChallenge || "",
      "{{sender_name}}": "Gazior Team",
    };

    Object.entries(context).forEach(([key, value]) => {
      if (value) {
        const regex = new RegExp(key, "g");
        parsedSubject = parsedSubject.replace(regex, value);
        parsedBody = parsedBody.replace(regex, value);
      }
    });

    setSubject(parsedSubject);
    setBody(parsedBody);
    setShowTemplateMenu(false);
  };

  const handleSend = async () => {
    if (!to || !subject || !body) {
      setError("To, Subject, and Body are required.");
      return;
    }

    setIsSending(true);
    setError(null);

    // 1. FINAL VARIABLE PARSING (Ensures manual typing and empty values are caught)
    let finalSubject = subject;
    let finalBody = body;

    const context = {
      "{{name}}": crmContext?.name || "",
      "{{companyName}}": crmContext?.companyName || "",
      "{{role}}": crmContext?.role || "",
      "{{website}}": crmContext?.website || "",
      "{{industry}}": crmContext?.industry || "",
      "{{businessChallenge}}": crmContext?.businessChallenge || "",
      "{{sender_name}}": "Gazior Team",
    };

    // We removed the 'if(value)' check so it replaces missing data with blank spaces
    // instead of leaving the ugly {{variable}} tag in the email.
    Object.entries(context).forEach(([key, value]) => {
      const regex = new RegExp(key, "g");
      finalSubject = finalSubject.replace(regex, value);
      finalBody = finalBody.replace(regex, value);
    });

    const result = await sendEmail({
      to,
      cc: cc || undefined,
      bcc: bcc || undefined,
      subject: finalSubject,
      body: finalBody,
      companyId,
    });

    setIsSending(false);

    if (result.success) {
      setTo("");
      setSubject("");
      setBody("");
      setCc("");
      setBcc("");
      onClose();
    } else {
      setError(result.error || "Failed to send email.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-end p-4 sm:p-6 lg:items-center lg:justify-center bg-black/40 backdrop-blur-sm transition-all">
      <div
        className={`relative flex flex-col overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(110deg,rgba(15,23,42,0.95),rgba(9,9,11,0.98))] shadow-2xl backdrop-blur-xl transition-all w-full ${isExpanded ? "h-[85vh] max-w-3xl" : "h-[75vh] max-w-xl"}`}
      >
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-4 py-3">
          <h3 className="text-sm font-semibold text-white">New Message</h3>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-slate-400 hover:text-white transition"
            >
              {isExpanded ? (
                <Minimize2 className="h-4 w-4" />
              ) : (
                <Maximize2 className="h-4 w-4" />
              )}
            </button>
            <button
              onClick={onClose}
              className="text-slate-400 hover:text-white transition"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {error && (
          <div className="bg-rose-500/10 px-4 py-2 border-b border-rose-500/20">
            <p className="text-xs font-medium text-rose-400">{error}</p>
          </div>
        )}

        <div className="flex flex-col flex-1 overflow-y-auto custom-scrollbar">
          <div className="flex items-center border-b border-white/5 px-4 py-2">
            <span className="w-12 text-sm text-slate-500">To:</span>
            <input
              type="text"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              disabled={isSending}
              className="flex-1 bg-transparent text-sm text-white focus:outline-none disabled:opacity-50"
            />
            <button
              onClick={() => setShowCcBcc(!showCcBcc)}
              className="text-xs font-medium text-slate-400 hover:text-white"
            >
              Cc/Bcc
            </button>
          </div>

          {showCcBcc && (
            <>
              <div className="flex items-center border-b border-white/5 px-4 py-2">
                <span className="w-12 text-sm text-slate-500">Cc:</span>
                <input
                  type="text"
                  value={cc}
                  onChange={(e) => setCc(e.target.value)}
                  disabled={isSending}
                  className="flex-1 bg-transparent text-sm text-white focus:outline-none disabled:opacity-50"
                />
              </div>
              <div className="flex items-center border-b border-white/5 px-4 py-2">
                <span className="w-12 text-sm text-slate-500">Bcc:</span>
                <input
                  type="text"
                  value={bcc}
                  onChange={(e) => setBcc(e.target.value)}
                  disabled={isSending}
                  className="flex-1 bg-transparent text-sm text-white focus:outline-none disabled:opacity-50"
                />
              </div>
            </>
          )}

          <div className="flex items-center border-b border-white/10 px-4 py-2 bg-black/20">
            <span className="w-12 text-sm text-slate-500">From:</span>
            <button className="flex items-center gap-1 text-sm font-medium text-slate-300 hover:text-white transition">
              Default Connected Account <ChevronDown className="h-3 w-3" />
            </button>
          </div>

          <div className="flex items-center border-b border-white/5 px-4 py-2">
            <input
              type="text"
              placeholder="Subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              disabled={isSending}
              className="flex-1 bg-transparent text-sm font-medium text-white placeholder-slate-500 focus:outline-none disabled:opacity-50"
            />
          </div>

          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            disabled={isSending}
            className="flex-1 w-full resize-none bg-transparent p-4 text-sm text-slate-300 placeholder-slate-600 focus:outline-none custom-scrollbar disabled:opacity-50"
            placeholder="Write your message here..."
          />
        </div>

        <div className="flex items-center justify-between border-t border-white/10 bg-black/40 px-4 py-3">
          <div className="flex items-center gap-2">
            <button
              className="flex items-center justify-center rounded-lg p-2 text-slate-400 hover:bg-white/10 hover:text-white transition"
              title="Attach file"
            >
              <Paperclip className="h-4.5 w-4.5" />
            </button>

            <div className="relative" ref={templateMenuRef}>
              <button
                onClick={() => setShowTemplateMenu(!showTemplateMenu)}
                className={`flex items-center justify-center rounded-lg p-2 transition ${showTemplateMenu ? "bg-indigo-500/20 text-indigo-400" : "text-slate-400 hover:bg-white/10 hover:text-white"}`}
                title="Insert template"
              >
                <LayoutTemplate className="h-4.5 w-4.5" />
              </button>

              {showTemplateMenu && (
                <div className="absolute bottom-full left-0 mb-2 w-64 rounded-xl border border-white/10 bg-slate-900/95 p-2 shadow-xl backdrop-blur-xl">
                  <div className="mb-2 px-2 pt-1 text-xs font-semibold uppercase tracking-wider text-slate-500">
                    Insert Template
                  </div>
                  {isLoadingTemplates ? (
                    <div className="flex p-4 justify-center">
                      <Loader2 className="h-4 w-4 animate-spin text-indigo-400" />
                    </div>
                  ) : templates.length === 0 ? (
                    <div className="p-3 text-xs text-slate-400">
                      No templates found.
                    </div>
                  ) : (
                    <div className="max-h-60 overflow-y-auto custom-scrollbar">
                      {templates.map((t) => (
                        <button
                          key={t._id}
                          onClick={() => handleApplyTemplate(t)}
                          className="w-full rounded-lg px-3 py-2 text-left text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
                        >
                          <div className="font-medium">{t.name}</div>
                          <div className="truncate text-xs text-slate-500">
                            {t.subject}
                          </div>
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              className="text-sm font-medium text-slate-400 hover:text-white transition disabled:opacity-50"
              disabled={isSending}
            >
              Save Draft
            </button>
            <div className="flex shadow-sm">
              <button
                onClick={handleSend}
                disabled={isSending}
                className="flex items-center gap-2 rounded-l-lg bg-indigo-500 px-5 py-2 text-sm font-semibold text-white hover:bg-indigo-600 transition disabled:opacity-50"
              >
                {isSending && <Loader2 className="h-4 w-4 animate-spin" />}
                {isSending ? "Sending..." : "Send"}
              </button>
              <button
                disabled={isSending}
                className="flex items-center justify-center rounded-r-lg border-l border-indigo-600 bg-indigo-500 px-2 py-2 text-white hover:bg-indigo-600 transition disabled:opacity-50"
                title="Schedule"
              >
                <Clock className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
