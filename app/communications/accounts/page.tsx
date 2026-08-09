"use client";

import { useState, useEffect } from "react";
import Layout from "@/components/Layout";
import {
  CheckCircle2,
  Shield,
  Plus,
  Settings2,
  RefreshCw,
  Mail,
  AlertCircle,
  Loader2,
  AtSign,
} from "lucide-react";
import ConnectMailboxModal from "@/components/modals/ConnectMailboxModal";
import { EmailAccountDTO } from "@/types/Communication";
import { getAccounts } from "@/services/communicationsService";

export default function AccountsPage() {
  const [accounts, setAccounts] = useState<EmailAccountDTO[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isConnectModalOpen, setIsConnectModalOpen] = useState(false);

  // FETCH THE LIVE ACCOUNTS FROM MONGODB
  useEffect(() => {
    async function loadAccounts() {
      setIsLoading(true);
      try {
        const data = await getAccounts();
        setAccounts(data);
      } catch (error) {
        console.error("Failed to load accounts:", error);
      } finally {
        setIsLoading(false);
      }
    }
    loadAccounts();
  }, [isConnectModalOpen]); // Re-run when the modal closes so the new account appears instantly

  return (
    <Layout currentPageName="Accounts">
      <div className="mx-auto max-w-5xl space-y-8 pb-12">
        {/* Header */}
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-medium text-slate-200">
              <Shield className="h-3.5 w-3.5 text-emerald-400" />
              Secure Infrastructure
            </div>
            <h2 className="text-3xl font-semibold tracking-tight text-white">
              Email Accounts
            </h2>
            <p className="mt-2 text-sm max-w-xl text-slate-400">
              {`Connect external mailboxes to Gazior Ops. The system will securely
              sync incoming threads and route outgoing messages through your
              provider's SMTP infrastructure.`}
            </p>
          </div>
          <button
            onClick={() => setIsConnectModalOpen(true)}
            className="inline-flex shrink-0 items-center gap-2 rounded-xl bg-indigo-500 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-indigo-600"
          >
            <Plus className="h-4 w-4" />
            Connect Mailbox
          </button>

          <ConnectMailboxModal
            isOpen={isConnectModalOpen}
            onClose={() => setIsConnectModalOpen(false)}
          />
        </div>

        {/* Dynamic Connected Accounts List */}
        <div className="flex flex-col gap-4">
          {isLoading ? (
            <div className="flex h-40 w-full items-center justify-center rounded-[26px] border border-white/10 bg-white/4 backdrop-blur-xl">
              <Loader2 className="h-8 w-8 animate-spin text-indigo-400" />
            </div>
          ) : accounts.length === 0 ? (
            <div className="flex h-40 w-full flex-col items-center justify-center rounded-[26px] border border-white/10 bg-white/4 text-slate-400 backdrop-blur-xl">
              <AtSign className="mb-2 h-8 w-8 opacity-50" />
              <p className="text-sm">No accounts connected yet.</p>
            </div>
          ) : (
            accounts.map((account) => (
              <div
                key={account._id}
                className="flex flex-col gap-4 rounded-2xl border border-white/10 bg-white/4 p-5 backdrop-blur-xl transition hover:bg-white/5 lg:flex-row lg:items-center lg:justify-between"
              >
                {/* Account Info */}
                <div className="flex items-center gap-5">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/10 bg-black/40 text-slate-300 shadow-inner">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="text-base font-semibold text-white">
                        {account.email}
                      </h3>
                      {account.isDefault && (
                        <span className="rounded bg-indigo-500/20 px-2 py-0.5 text-[10px] font-bold uppercase tracking-wider text-indigo-400">
                          Default
                        </span>
                      )}
                    </div>
                    <p className="mt-0.5 text-sm text-slate-400">
                      {account.displayName}{" "}
                      <span className="mx-1.5 text-slate-600">•</span>{" "}
                      {account.provider}
                    </p>
                  </div>
                </div>

                {/* Status & Actions */}
                <div className="flex items-center justify-between gap-6 border-t border-white/5 pt-4 lg:justify-end lg:border-t-0 lg:pt-0">
                  {/* Sync Status */}
                  <div className="flex flex-col items-start gap-1 lg:items-end">
                    {account.status === "connected" ? (
                      <div className="flex items-center gap-1.5 text-emerald-400">
                        <CheckCircle2 className="h-4 w-4" />
                        <span className="text-xs font-medium">Connected</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5 text-rose-400">
                        <AlertCircle className="h-4 w-4" />
                        <span className="text-xs font-medium">Auth Failed</span>
                      </div>
                    )}
                    <div className="flex items-center gap-1 text-[11px] text-slate-500">
                      <RefreshCw className="h-3 w-3" />
                      Last sync:{" "}
                      {account.lastSyncAt
                        ? new Date(
                            parseInt(account.lastSyncAt),
                          ).toLocaleString()
                        : "Never"}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex items-center gap-2">
                    <button className="flex items-center gap-2 rounded-lg border border-white/10 bg-black/20 px-3 py-1.5 text-xs font-medium text-slate-300 transition hover:bg-white/10 hover:text-white">
                      <Settings2 className="h-3.5 w-3.5" />
                      Settings
                    </button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </Layout>
  );
}
