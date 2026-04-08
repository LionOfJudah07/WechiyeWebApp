import Link from "next/link";
import { ShieldIcon, SparkIcon } from "@/components/icons";

export default function Home() {
  return (
    <div className="relative min-h-screen overflow-hidden bg-[radial-gradient(circle_at_10%_20%,rgba(21,112,239,0.25),transparent_38%),radial-gradient(circle_at_80%_15%,rgba(14,165,233,0.2),transparent_34%),linear-gradient(180deg,#f8fbff_0%,#edf4ff_55%,#f7fbff_100%)] px-6 py-8 dark:bg-[radial-gradient(circle_at_10%_20%,rgba(37,99,235,0.3),transparent_35%),radial-gradient(circle_at_80%_15%,rgba(20,184,166,0.2),transparent_34%),linear-gradient(180deg,#020617_0%,#081327_55%,#020617_100%)]">
      <div className="mx-auto max-w-6xl">
        <header className="fade-up flex items-center justify-between rounded-[30px] border border-white/70 bg-white/80 px-5 py-4 shadow-[0_20px_40px_rgba(8,32,58,0.08)] backdrop-blur dark:border-white/10 dark:bg-slate-950/50">
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
              <SparkIcon className="h-5 w-5" />
            </div>
            <div>
              <p className="font-semibold tracking-tight text-slate-950 dark:text-white">Cost Flow</p>
              <p className="text-xs text-slate-500 dark:text-slate-400">Smart personal and business finance</p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Link href="/auth" className="rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 transition hover:bg-slate-100 dark:border-white/20 dark:text-slate-100 dark:hover:bg-white/10">
              Login
            </Link>
            <Link href="/dashboard" className="rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950">
              Open app
            </Link>
          </div>
        </header>

        <main className="mt-8 grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="fade-up rounded-[34px] border border-white/70 bg-white/85 p-8 shadow-[0_24px_60px_rgba(8,32,58,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-950/55">
            <p className="text-xs uppercase tracking-[0.34em] text-sky-600 dark:text-sky-300">Cost management platform</p>
            <h1 className="mt-4 text-4xl font-semibold leading-tight text-slate-950 dark:text-white md:text-5xl">
              Track every birr. Grow every goal.
            </h1>
            <p className="mt-5 max-w-2xl text-base leading-7 text-slate-600 dark:text-slate-300">
              Cost Flow helps you manage income, expenses, budgets, recurring payments, and savings goals with AI-powered guidance tailored for Ethiopia-first finance workflows.
            </p>

            <div className="mt-8 flex flex-wrap gap-3">
              <Link href="/auth" className="inline-flex items-center rounded-2xl bg-sky-600 px-5 py-3 text-sm font-semibold text-white transition hover:bg-sky-500">
                Create free account
              </Link>
              <Link href="/reports" className="inline-flex items-center rounded-2xl border border-slate-300 bg-white px-5 py-3 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 dark:border-white/15 dark:bg-white/5 dark:text-slate-100 dark:hover:bg-white/10">
                See analytics preview
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {[
                ["Budget Alerts", "Get notified before overspending"],
                ["AI Suggestions", "Receive smart cost optimization hints"],
                ["Multi-Currency", "ETB-first with USD and EUR support"],
              ].map(([title, detail]) => (
                <div key={title} className="rounded-2xl bg-slate-900/5 p-4 dark:bg-white/5">
                  <p className="text-sm font-semibold text-slate-900 dark:text-white">{title}</p>
                  <p className="mt-1 text-xs text-slate-600 dark:text-slate-400">{detail}</p>
                </div>
              ))}
            </div>
          </section>

          <section className="fade-up rounded-[34px] border border-white/70 bg-white/85 p-6 shadow-[0_24px_60px_rgba(8,32,58,0.12)] backdrop-blur dark:border-white/10 dark:bg-slate-950/55">
            <div className="rounded-[28px] bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 p-6 text-white shadow-[0_20px_42px_rgba(14,165,233,0.35)]">
              <p className="text-xs uppercase tracking-[0.3em] text-white/80">Live financial snapshot</p>
              <p className="mt-3 text-4xl font-semibold">Br 34,750</p>
              <p className="mt-2 text-sm text-white/85">Total available balance</p>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/20 p-3">
                  <p className="text-white/80">Income</p>
                  <p className="mt-1 font-semibold">Br 42,000</p>
                </div>
                <div className="rounded-xl bg-white/20 p-3">
                  <p className="text-white/80">Expenses</p>
                  <p className="mt-1 font-semibold">Br 19,250</p>
                </div>
              </div>
            </div>

            <div className="mt-5 rounded-[28px] border border-slate-200 bg-slate-50/80 p-5 dark:border-white/10 dark:bg-white/5">
              <div className="flex items-start gap-3">
                <div className="mt-0.5 rounded-xl bg-emerald-500/15 p-2 text-emerald-500">
                  <ShieldIcon className="h-4 w-4" />
                </div>
                <div>
                  <p className="font-semibold text-slate-900 dark:text-white">Offline-first and payment-ready</p>
                  <p className="mt-1 text-sm leading-6 text-slate-600 dark:text-slate-300">
                    Built for low-connectivity environments with queue-ready design for Telebirr and CBE Birr integrations.
                  </p>
                </div>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
