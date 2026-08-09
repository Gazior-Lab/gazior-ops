"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  Search,
  Filter,
  Reply,
  Forward,
  MoreHorizontal,
  Paperclip,
  Clock,
  Building2,
  CheckCircle2,
  Loader2,
} from "lucide-react";
import { EmailThread, EmailMessage } from "@/types/Communication";
import {
  getInboxThreads,
  getThreadMessages,
} from "@/services/communicationsService";

// Helper function to strip HTML tags for clean text previews
const stripHtml = (html: string) => {
  const tmp = document.createElement("DIV");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
};

export default function InboxPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [threads, setThreads] = useState<EmailThread[]>([]);
  const [activeThread, setActiveThread] = useState<EmailThread | null>(null);
  const [activeMessages, setActiveMessages] = useState<EmailMessage[]>([]);

  const [isLoadingThreads, setIsLoadingThreads] = useState(true);
  const [isLoadingMessages, setIsLoadingMessages] = useState(false);

  // Fetch all threads on initial load
  useEffect(() => {
    async function loadThreads() {
      setIsLoadingThreads(true);
      const data = await getInboxThreads();
      setThreads(data);
      if (data.length > 0) {
        setActiveThread(data[0]);
      }
      setIsLoadingThreads(false);
    }
    loadThreads();
  }, []);

  // Fetch specific messages when a thread is selected
  useEffect(() => {
    async function loadMessages() {
      if (!activeThread?._id) return;
      setIsLoadingMessages(true);
      const data = await getThreadMessages(activeThread._id);
      setActiveMessages(data);
      setIsLoadingMessages(false);
    }
    loadMessages();
  }, [activeThread]);

  const filteredThreads = threads.filter(
    (t) =>
      t.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.participants.some((p) =>
        p.toLowerCase().includes(searchQuery.toLowerCase()),
      ),
  );

  return (
    <Layout currentPageName="Inbox">
      <div className="mx-auto flex max-w-7xl flex-col pb-6">
        {/* Header section */}
        <div className="mb-6 flex shrink-0 flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <h2 className="text-xl font-semibold tracking-tight text-white">
              Communications
            </h2>
            <p className="mt-1 text-xs text-slate-400">
              Manage your active threads and CRM communication.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex w-full max-w-xs items-center">
              <Search className="absolute left-3 h-4 w-4 text-slate-400" />
              <input
                type="text"
                placeholder="Search emails..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-10 w-full rounded-xl border border-white/10 bg-black/20 pl-9 pr-4 text-sm text-white placeholder-slate-400 backdrop-blur-md transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
              />
            </div>
            <button className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-black/20 text-slate-300 backdrop-blur-md transition hover:bg-white/10 hover:text-white">
              <Filter className="h-4.5 w-4.5" />
            </button>
            <button className="rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600">
              Compose
            </button>
          </div>
        </div>

        {/* Split Pane Container */}
        <div className="flex flex-1 overflow-hidden rounded-[10px] border border-white/10 shadow-[0_20px_60px_rgba(0,0,0,0.28)] backdrop-blur-xl">
          {/* Left Pane: Email List */}
          <div className="flex shrink-0 flex-col border-r border-white/10 lg:w-80">
            <div className="flex items-center justify-between border-b border-white/10 bg-black/20 p-4 py-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                Focused Inbox
              </span>
              {isLoadingThreads && (
                <Loader2 className="h-3 w-3 animate-spin text-indigo-400" />
              )}
            </div>

            <div className="custom-scrollbar flex-1 overflow-y-auto max-h-125">
              {filteredThreads.length === 0 && !isLoadingThreads && (
                <div className="p-6 text-center text-sm text-slate-500">
                  No emails found.
                </div>
              )}

              {filteredThreads.map((thread) => (
                <button
                  key={thread._id}
                  onClick={() => setActiveThread(thread)}
                  className={`flex w-full flex-col gap-2 border-b border-white/5 p-4 text-left transition-colors ${
                    activeThread?._id === thread._id
                      ? "border-l-2 border-l-indigo-500 bg-indigo-500/10"
                      : "border-l-2 border-l-transparent hover:bg-white/5"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <span
                      className={`truncate pr-2 text-sm ${!thread.isRead ? "font-bold text-white" : "font-medium text-slate-300"}`}
                    >
                      {thread.participants[0] || "Unknown Sender"}
                    </span>
                    <span className="shrink-0 text-[10px] text-slate-500">
                      {new Date(
                        parseInt(thread.lastMessageAt),
                      ).toLocaleDateString()}
                    </span>
                  </div>
                  <span
                    className={`truncate text-xs ${!thread.isRead ? "font-semibold text-slate-200" : "font-medium text-slate-400"}`}
                  >
                    {thread.subject}
                  </span>
                  {/* Safely strip HTML for the preview snippet */}
                  <p className="line-clamp-2 text-xs leading-relaxed text-slate-500">
                    {stripHtml(thread.previewSnippet)}
                  </p>

                  {thread.companyId && (
                    <div className="mt-1 flex items-center gap-1 text-[10px] font-medium text-indigo-300">
                      <Building2 className="h-3 w-3" />
                      View CRM Profile
                    </div>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Right Pane: Reading & Reply */}
          <div className="hidden flex-1 flex-col overflow-hidden bg-black/20 lg:flex">
            {activeThread ? (
              <>
                {/* Thread Header */}
                <div className="flex shrink-0 items-start justify-between border-b border-white/10 bg-black/40 p-6 py-3">
                  <div>
                    <h3 className="text-xl font-semibold text-white">
                      {activeThread.subject}
                    </h3>
                    <div className="mt-2 text-xs text-slate-400">
                      {activeThread.messageCount} messages in this conversation
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                      title="Reply"
                    >
                      <Reply className="h-4 w-4" />
                    </button>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                      title="Forward"
                    >
                      <Forward className="h-4 w-4" />
                    </button>
                    <button
                      className="flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-slate-300 transition hover:bg-white/10 hover:text-white"
                      title="More"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </div>
                </div>

                {/* Messages Stack */}
                <div className="custom-scrollbar flex-1 space-y-6 overflow-y-auto p-6 max-h-75">
                  {isLoadingMessages ? (
                    <div className="flex h-full items-center justify-center">
                      <Loader2 className="h-6 w-6 animate-spin text-indigo-400" />
                    </div>
                  ) : (
                    activeMessages.map((msg) => (
                      <div
                        key={msg._id}
                        className="overflow-hidden rounded-xl border border-white/10 bg-white/5 shadow-sm"
                      >
                        <div className="flex items-center justify-between border-b border-white/5 bg-black/20 px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-[linear-gradient(135deg,rgba(99,102,241,1),rgba(168,85,247,1))] text-xs font-bold text-white">
                              {msg.from.name
                                ? msg.from.name.charAt(0).toUpperCase()
                                : msg.from.email.charAt(0).toUpperCase()}
                            </div>
                            <div>
                              <p className="text-sm font-medium text-white">
                                {msg.from.name || msg.from.email}
                              </p>
                              <p className="text-[11px] text-slate-400">
                                to{" "}
                                {msg.to
                                  .map((t) => t.name || t.email)
                                  .join(", ")}
                              </p>
                            </div>
                          </div>
                          <span className="text-xs text-slate-500">
                            {new Date(parseInt(msg.createdAt)).toLocaleString()}
                          </span>
                        </div>

                        {/* Render HTML Body safely */}
                        <div className="p-5 text-sm text-slate-300">
                          {/* Check if HTML exists, otherwise fallback to plain text */}
                          <div
                            dangerouslySetInnerHTML={{
                              __html:
                                msg.htmlBody ||
                                msg.textBody.replace(/\n/g, "<br />"),
                            }}
                            className="prose prose-invert max-w-none text-sm"
                          />
                        </div>
                      </div>
                    ))
                  )}
                </div>

                {/* Quick Reply Area */}
                <div className="shrink-0 border-t border-white/10 bg-black/40 p-4">
                  <div className="rounded-xl border border-white/10 bg-white/5 p-1 backdrop-blur-sm transition-all focus-within:border-indigo-500/50 focus-within:ring-1 focus-within:ring-indigo-500/50">
                    <textarea
                      placeholder="Reply to thread..."
                      className="custom-scrollbar h-20 w-full resize-none bg-transparent p-3 text-sm text-white placeholder-slate-500 outline-none"
                    />
                    <div className="flex items-center justify-between px-2 pb-2">
                      <div className="flex items-center gap-1 text-slate-400">
                        <button className="rounded-lg p-2 transition hover:bg-white/10 hover:text-white">
                          <Paperclip className="h-4 w-4" />
                        </button>
                        <button className="rounded-lg p-2 transition hover:bg-white/10 hover:text-white">
                          <Clock className="h-4 w-4" />
                        </button>
                      </div>
                      <button className="flex items-center gap-2 rounded-lg bg-indigo-500 px-4 py-2 text-xs font-semibold text-white transition hover:bg-indigo-600">
                        Send Reply
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              <div className="flex h-full flex-col items-center justify-center text-slate-500">
                <CheckCircle2 className="mb-4 h-12 w-12 opacity-50" />
                <p>Select an email to read</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
}
