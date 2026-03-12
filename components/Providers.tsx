"use client";

import { ReactNode } from "react";
import { AuthProvider } from "@/lib/AuthContext";
import { Toaster } from "@/components/ui/toaster";
import MainContext from "@/context/MainContext";

type ProvidersProps = {
  children: ReactNode;
};

export function Providers({ children }: ProvidersProps) {
  return (
    <MainContext>
      <AuthProvider>
        {children}
        <Toaster />
      </AuthProvider>
    </MainContext>
  );
}
