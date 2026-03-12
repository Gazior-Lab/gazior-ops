"use client";

import { ReactNode } from "react";
import { QueryClientProvider } from "@tanstack/react-query";

import { queryClientInstance } from "@/lib/query-client";
import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "@/components/ui/toaster";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <AuthProvider>
      <QueryClientProvider client={queryClientInstance}>
        {children}
        <Toaster />
      </QueryClientProvider>
    </AuthProvider>
  );
}

