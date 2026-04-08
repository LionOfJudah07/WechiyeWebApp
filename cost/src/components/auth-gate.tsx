"use client";

import { useEffect } from "react";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";

export function AuthGate({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { isAuthenticated } = useAuth();

  useEffect(() => {
    if (!isAuthenticated) {
      router.replace(`/auth?next=${encodeURIComponent(pathname)}`);
    }
  }, [isAuthenticated, pathname, router]);

  if (!isAuthenticated) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.2),_transparent_34%),linear-gradient(180deg,#f8fbff_0%,#edf4ff_100%)] dark:bg-[radial-gradient(circle_at_top,_rgba(14,165,233,0.24),_transparent_34%),linear-gradient(180deg,#020617_0%,#081327_100%)]">
        <div className="rounded-3xl border border-white/70 bg-white/85 px-6 py-4 text-sm text-slate-600 shadow-xl dark:border-white/10 dark:bg-slate-950/60 dark:text-slate-300">
          Securing your workspace...
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
