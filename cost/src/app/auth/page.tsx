"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { SparkIcon } from "@/components/icons";
import { useAuth } from "@/components/auth-provider";

export default function AuthPage() {
  const router = useRouter();
  const params = useSearchParams();
  const { isAuthenticated, login, signup } = useAuth();
  const next = params.get("next") || "/dashboard";

  const [mode, setMode] = useState<"login" | "signup">("login");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("user@example.com");
  const [password, setPassword] = useState("password123");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      router.replace(next);
    }
  }, [isAuthenticated, next, router]);

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.2),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(6,182,212,0.18),transparent_34%),linear-gradient(180deg,#f5f9ff_0%,#edf4ff_100%)] px-4 py-8 dark:bg-[radial-gradient(circle_at_20%_15%,rgba(37,99,235,0.28),transparent_36%),radial-gradient(circle_at_80%_10%,rgba(20,184,166,0.2),transparent_34%),linear-gradient(180deg,#020617_0%,#081327_100%)]">
      <div className="mx-auto max-w-5xl">
        <div className="grid gap-6 lg:grid-cols-[1fr_420px]">
          <section className="rounded-[32px] border border-white/70 bg-white/85 p-8 shadow-[0_24px_60px_rgba(8,32,58,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-950/55">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <SparkIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold text-slate-900 dark:text-white">Cost Flow</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Finance platform for modern teams</p>
              </div>
            </div>

            <h1 className="mt-8 text-4xl font-semibold leading-tight text-slate-900 dark:text-white">Build better money habits with clear financial insight.</h1>
            <p className="mt-4 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Track income and expenses, set category budgets, monitor recurring costs, and receive AI-powered suggestions in one secure workspace.
            </p>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              {[
                "Monthly + yearly financial summaries",
                "ETB-focused multi-currency support",
                "Savings goals and progress tracking",
                "Offline-friendly transaction management",
              ].map((item) => (
                <div key={item} className="rounded-2xl bg-slate-900/5 p-3 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-200">
                  {item}
                </div>
              ))}
            </div>
          </section>

          <section className="rounded-[32px] border border-white/70 bg-white/90 p-6 shadow-[0_24px_60px_rgba(8,32,58,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-950/70">
            <div className="rounded-2xl bg-slate-950/5 p-1 dark:bg-white/10">
              <div className="grid grid-cols-2 gap-1">
                <button type="button" onClick={() => setMode("login")} className={`rounded-xl px-4 py-2 text-sm font-medium ${mode === "login" ? "bg-white text-slate-900 shadow dark:bg-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-300"}`}>
                  Login
                </button>
                <button type="button" onClick={() => setMode("signup")} className={`rounded-xl px-4 py-2 text-sm font-medium ${mode === "signup" ? "bg-white text-slate-900 shadow dark:bg-slate-900 dark:text-white" : "text-slate-500 dark:text-slate-300"}`}>
                  Sign up
                </button>
              </div>
            </div>

            <form
              className="mt-5 grid gap-4"
              onSubmit={async (event) => {
                event.preventDefault();
                setError(null);
                setLoading(true);
                try {
                  if (mode === "login") {
                    await login(email, password);
                  } else {
                    await signup(name, email, password);
                  }
                  router.replace(next);
                } catch (err) {
                  const message = err instanceof Error ? err.message : "Authentication failed.";
                  setError(message);
                } finally {
                  setLoading(false);
                }
              }}
            >
              {mode === "signup" ? (
                <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                  Full name
                  <input value={name} onChange={(event) => setName(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-white" placeholder="Abel Mulu" required />
                </label>
              ) : null}

              <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                Email
                <input value={email} onChange={(event) => setEmail(event.target.value)} type="email" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-white" required />
              </label>

              <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
                Password
                <input value={password} onChange={(event) => setPassword(event.target.value)} type="password" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 outline-none focus:border-sky-500 dark:border-white/10 dark:bg-white/5 dark:text-white" required />
              </label>

              {error ? <p className="rounded-xl bg-rose-500/10 px-3 py-2 text-sm text-rose-600 dark:text-rose-300">{error}</p> : null}

              <button type="submit" disabled={loading} className="mt-1 rounded-2xl bg-slate-950 px-4 py-3 text-sm font-semibold text-white transition hover:bg-slate-800 disabled:opacity-60 dark:bg-white dark:text-slate-950">
                {loading ? "Please wait..." : mode === "login" ? "Login to dashboard" : "Create account"}
              </button>
            </form>

            <p className="mt-4 text-xs leading-6 text-slate-500 dark:text-slate-400">
              Demo mode uses local storage for authentication state. Ready to replace with production auth providers.
            </p>
            <p className="mt-2 text-xs text-slate-500 dark:text-slate-400">
              <Link href="/" className="text-sky-600 hover:underline dark:text-sky-300">Back to landing page</Link>
            </p>
          </section>
        </div>
      </div>
    </div>
  );
}
