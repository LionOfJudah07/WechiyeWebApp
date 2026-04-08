"use client";

import { AuthProvider } from "@/components/auth-provider";
import { FinanceProvider } from "@/components/finance-provider";
import { ThemeProvider } from "@/components/theme-provider";

export function RootProviders({ children }: { children: React.ReactNode }) {
  return (
    <ThemeProvider>
      <AuthProvider>
        <FinanceProvider>{children}</FinanceProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}
