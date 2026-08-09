"use client";

import { useState } from "react";
import { X, Server, Shield, Loader2 } from "lucide-react";
import { connectAccount } from "@/services/communicationsService";

interface ConnectMailboxModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ConnectMailboxModal({
  isOpen,
  onClose,
}: ConnectMailboxModalProps) {
  const [isConnecting, setIsConnecting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form State
  const [email, setEmail] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [imapHost, setImapHost] = useState("");
  const [imapPort, setImapPort] = useState("993");
  const [smtpHost, setSmtpHost] = useState("");
  const [smtpPort, setSmtpPort] = useState("465");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  if (!isOpen) return null;

  const handleConnect = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setIsConnecting(true);

    if (!email || !imapHost || !smtpHost || !username || !password) {
      setError("Please fill in all required fields.");
      setIsConnecting(false);
      return;
    }

    const result = await connectAccount({
      email,
      displayName: displayName || email.split("@")[0],
      imapHost,
      imapPort: parseInt(imapPort, 10),
      smtpHost,
      smtpPort: parseInt(smtpPort, 10),
      username,
      password,
    });

    setIsConnecting(false);

    if (result.success) {
      onClose();
      // Reset form
      setEmail("");
      setDisplayName("");
      setImapHost("");
      setSmtpHost("");
      setUsername("");
      setPassword("");
    } else {
      setError(result.error || "Connection failed.");
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="relative flex w-full max-w-2xl flex-col overflow-hidden rounded-3xl border border-white/10 bg-[linear-gradient(110deg,rgba(15,23,42,0.95),rgba(9,9,11,0.98))] shadow-2xl backdrop-blur-xl">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-indigo-500/20 text-indigo-400">
              <Server className="h-4 w-4" />
            </div>
            <h3 className="text-base font-semibold text-white">
              Connect Mailbox
            </h3>
          </div>
          <button
            onClick={onClose}
            className="text-slate-400 transition hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="border-b border-rose-500/20 bg-rose-500/10 px-6 py-3">
            <p className="text-xs font-medium text-rose-400">{error}</p>
          </div>
        )}

        <form onSubmit={handleConnect} className="flex flex-col">
          <div className="custom-scrollbar max-h-[60vh] overflow-y-auto p-6 space-y-6">
            {/* General Settings */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Account Details
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Email Address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (!username) setUsername(e.target.value); // Auto-fill username
                    }}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="sales@gazior.com"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Display Name
                  </label>
                  <input
                    type="text"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="Gazior Sales"
                  />
                </div>
              </div>
            </div>

            {/* Server Settings */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Incoming (IMAP)
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    IMAP Host
                  </label>
                  <input
                    type="text"
                    value={imapHost}
                    onChange={(e) => setImapHost(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="imap.yourhost.com"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Port
                  </label>
                  <input
                    type="text"
                    value={imapPort}
                    onChange={(e) => setImapPort(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>

              <h4 className="mt-6 text-xs font-semibold uppercase tracking-wider text-slate-500">
                Outgoing (SMTP)
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-4">
                <div className="sm:col-span-3">
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    SMTP Host
                  </label>
                  <input
                    type="text"
                    value={smtpHost}
                    onChange={(e) => setSmtpHost(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="smtp.yourhost.com"
                  />
                </div>
                <div className="sm:col-span-1">
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Port
                  </label>
                  <input
                    type="text"
                    value={smtpPort}
                    onChange={(e) => setSmtpPort(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
              </div>
            </div>

            {/* Authentication */}
            <div className="space-y-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-500">
                Authentication
              </h4>
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Username
                  </label>
                  <input
                    type="text"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                  />
                </div>
                <div>
                  <label className="mb-1 block text-xs font-medium text-slate-400">
                    Password / App Password
                  </label>
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-black/20 p-2.5 text-sm text-white placeholder-slate-500 transition focus:border-indigo-500 focus:outline-none focus:ring-1 focus:ring-indigo-500"
                    placeholder="••••••••••••"
                  />
                </div>
              </div>
              <div className="mt-2 flex items-center gap-2 rounded-lg border border-emerald-500/20 bg-emerald-500/10 p-3">
                <Shield className="h-4 w-4 text-emerald-400" />
                <p className="text-[11px] text-emerald-300">
                  Credentials are encrypted before being stored. Gazior Ops
                  never exposes your password to the frontend.
                </p>
              </div>
            </div>
          </div>

          {/* Footer Actions */}
          <div className="flex items-center justify-end gap-3 border-t border-white/10 bg-black/40 px-6 py-4">
            <button
              type="button"
              onClick={onClose}
              disabled={isConnecting}
              className="rounded-xl border border-white/10 bg-transparent px-4 py-2 text-sm font-medium text-slate-300 transition hover:bg-white/5 hover:text-white disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isConnecting}
              className="flex items-center gap-2 rounded-xl bg-indigo-500 px-5 py-2 text-sm font-semibold text-white transition hover:bg-indigo-600 disabled:opacity-50"
            >
              {isConnecting && <Loader2 className="h-4 w-4 animate-spin" />}
              {isConnecting ? "Connecting..." : "Connect Mailbox"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
