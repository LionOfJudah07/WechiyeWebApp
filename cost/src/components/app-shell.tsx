"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, currencies, formatCurrency } from "@/lib/finance-data";
import { useFinance } from "@/components/finance-provider";
import { useTheme } from "@/components/theme-provider";
import { ArrowDownIcon, ArrowUpIcon, MenuIcon, MoonIcon, PlusIcon, SparkIcon, SunIcon } from "@/components/icons";

const navigation = [
  { href: "/dashboard", label: "Dashboard" },
  { href: "/transactions", label: "Transactions" },
  { href: "/budget", label: "Budgets" },
  { href: "/reports", label: "Reports" },
  { href: "/profile", label: "Profile" },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { summary, settings, addTransaction } = useFinance();
  const { resolvedTheme, toggleTheme } = useTheme();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [quickAddOpen, setQuickAddOpen] = useState(false);

  const nav = useMemo(
    () =>
      navigation.map((item) => ({
        ...item,
        active: pathname === item.href || pathname.startsWith(`${item.href}/`),
      })),
    [pathname],
  );

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.2),_transparent_30%),radial-gradient(circle_at_top_right,_rgba(15,118,110,0.14),_transparent_28%),linear-gradient(180deg,_#f8fbff_0%,_#eef5ff_100%)] text-slate-950 dark:bg-[radial-gradient(circle_at_top_left,_rgba(56,189,248,0.18),_transparent_28%),radial-gradient(circle_at_top_right,_rgba(15,118,110,0.14),_transparent_30%),linear-gradient(180deg,_#020617_0%,_#081120_100%)] dark:text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-[1720px] gap-0 lg:px-6 lg:py-6">
        <aside className={`fixed inset-y-0 z-40 w-[290px] border-r border-slate-900/5 bg-white/90 p-5 shadow-2xl shadow-slate-900/5 backdrop-blur transition-transform dark:border-white/10 dark:bg-slate-950/90 lg:static lg:translate-x-0 lg:rounded-[32px] lg:shadow-[0_20px_60px_rgba(15,23,42,0.18)] ${sidebarOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"}`}>
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-950 text-white dark:bg-white dark:text-slate-950">
                <SparkIcon className="h-5 w-5" />
              </div>
              <div>
                <p className="font-semibold tracking-tight text-slate-950 dark:text-white">Cost Flow</p>
                <p className="text-xs text-slate-500 dark:text-slate-400">Finance control center</p>
              </div>
            </Link>
            <button
              type="button"
              onClick={() => setSidebarOpen(false)}
              className="rounded-xl border border-slate-200 bg-white p-2 text-slate-700 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
            >
              <MenuIcon className="h-5 w-5 rotate-90" />
            </button>
          </div>

          <div className="mt-6 rounded-[28px] bg-gradient-to-br from-sky-500 via-cyan-500 to-emerald-500 p-5 text-white shadow-[0_18px_36px_rgba(14,165,233,0.28)]">
            <p className="text-xs uppercase tracking-[0.32em] text-white/80">Base currency</p>
            <p className="mt-2 text-3xl font-semibold">{settings.baseCurrency}</p>
            <p className="mt-2 max-w-[18ch] text-sm text-white/80">ETB-first analytics with multi-currency support.</p>
          </div>

          <nav className="mt-6 space-y-1">
            {nav.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center justify-between rounded-2xl px-4 py-3 text-sm font-medium transition ${item.active ? "bg-slate-950 text-white dark:bg-white dark:text-slate-950" : "text-slate-600 hover:bg-slate-950/5 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"}`}
              >
                <span>{item.label}</span>
                {item.active ? <span className="h-2 w-2 rounded-full bg-sky-400" /> : null}
              </Link>
            ))}
          </nav>

          <div className="mt-6 rounded-[28px] border border-slate-200 bg-slate-950/[0.02] p-4 dark:border-white/10 dark:bg-white/[0.03]">
            <p className="text-xs uppercase tracking-[0.28em] text-slate-500 dark:text-slate-400">Live status</p>
            <div className="mt-3 space-y-3 text-sm text-slate-600 dark:text-slate-300">
              <div className="flex items-center justify-between">
                <span>Offline queue</span>
                <span className="text-emerald-500">Ready</span>
              </div>
              <div className="flex items-center justify-between">
                <span>Telebirr</span>
                <span className="text-sky-500">{settings.telebirrEnabled ? "Connected" : "Pending"}</span>
              </div>
              <div className="flex items-center justify-between">
                <span>CBE Birr</span>
                <span className="text-sky-500">{settings.cbeBirrEnabled ? "Connected" : "Pending"}</span>
              </div>
            </div>
          </div>
        </aside>

        <div className="flex min-w-0 flex-1 flex-col lg:gap-6">
          <header className="sticky top-0 z-30 border-b border-slate-900/5 bg-white/80 px-4 py-4 backdrop-blur dark:border-white/10 dark:bg-slate-950/80 lg:rounded-[28px] lg:border lg:border-white/70 lg:px-6 lg:shadow-[0_18px_40px_rgba(15,23,42,0.07)]">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setSidebarOpen((value) => !value)}
                  className="inline-flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-200 bg-white text-slate-700 lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-slate-200"
                >
                  <MenuIcon className="h-5 w-5" />
                </button>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500 dark:text-slate-400">Cost management</p>
                  <h1 className="text-xl font-semibold tracking-tight text-slate-950 dark:text-white">{pathname === "/dashboard" ? "Dashboard" : nav.find((item) => item.active)?.label ?? "Overview"}</h1>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2">
                <button
                  type="button"
                  onClick={toggleTheme}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 dark:border-white/10 dark:bg-white/5 dark:text-slate-200 dark:hover:bg-white/10"
                >
                  {resolvedTheme === "dark" ? <SunIcon className="h-4 w-4" /> : <MoonIcon className="h-4 w-4" />}
                  <span className="hidden sm:inline">{resolvedTheme === "dark" ? "Light mode" : "Dark mode"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => setQuickAddOpen(true)}
                  className="inline-flex h-11 items-center gap-2 rounded-2xl bg-slate-950 px-4 text-sm font-medium text-white shadow-lg shadow-slate-950/20 transition hover:translate-y-[-1px] hover:bg-slate-800 dark:bg-white dark:text-slate-950 dark:hover:bg-slate-200"
                >
                  <PlusIcon className="h-4 w-4" />
                  Add Expense
                </button>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 pb-10 pt-4 lg:px-0 lg:pt-0">
            <div className="grid gap-4 lg:grid-cols-[1fr_320px]">
              <div className="rounded-[28px] border border-white/70 bg-white/80 p-4 shadow-[0_18px_40px_rgba(15,23,42,0.07)] backdrop-blur dark:border-white/10 dark:bg-slate-950/60 lg:p-6">
                {children}
              </div>
              <div className="space-y-4">
                <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)] backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Current balance</p>
                  <p className={`mt-2 text-3xl font-semibold ${summary.balance >= 0 ? "text-emerald-500" : "text-rose-500"}`}>
                    {formatCurrency(summary.balance, settings.baseCurrency)}
                  </p>
                  <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                    <div className="rounded-2xl bg-slate-950/5 p-3 dark:bg-white/5">
                      <p className="text-slate-500 dark:text-slate-400">Income</p>
                      <p className="mt-1 font-semibold text-slate-950 dark:text-white">{formatCurrency(summary.totalIncome, settings.baseCurrency)}</p>
                    </div>
                    <div className="rounded-2xl bg-slate-950/5 p-3 dark:bg-white/5">
                      <p className="text-slate-500 dark:text-slate-400">Expenses</p>
                      <p className="mt-1 font-semibold text-slate-950 dark:text-white">{formatCurrency(summary.totalExpenses, settings.baseCurrency)}</p>
                    </div>
                  </div>
                </div>

                <div className="rounded-[28px] border border-white/70 bg-white/80 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)] backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
                  <p className="text-sm text-slate-500 dark:text-slate-400">Quick insights</p>
                  <div className="mt-4 space-y-3 text-sm text-slate-600 dark:text-slate-300">
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-950/5 p-3 dark:bg-white/5">
                      <ArrowUpIcon className="h-4 w-4 text-emerald-500" />
                      <span>{summary.recurringCount} recurring items are tracked automatically.</span>
                    </div>
                    <div className="flex items-center gap-3 rounded-2xl bg-slate-950/5 p-3 dark:bg-white/5">
                      <ArrowDownIcon className="h-4 w-4 text-sky-500" />
                      <span>Low-balance alert starts at {formatCurrency(settings.lowBalanceAlert, settings.baseCurrency)}.</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>

      {quickAddOpen ? <QuickAddDrawer onClose={() => setQuickAddOpen(false)} onSave={addTransaction} /> : null}
    </div>
  );
}

function QuickAddDrawer({
  onClose,
  onSave,
}: {
  onClose: () => void;
  onSave: (transaction: {
    type: "expense" | "income";
    category: string;
    description: string;
    amount: number;
    date: string;
    currency: (typeof currencies)[number]["code"];
    recurring?: boolean;
  }) => void;
}) {
  const [type, setType] = useState<"expense" | "income">("expense");
  const [amount, setAmount] = useState("0");
  const [category, setCategory] = useState("Food");
  const [currency, setCurrency] = useState<(typeof currencies)[number]["code"]>(currencies[0].code);
  const [description, setDescription] = useState("");
  const [recurring, setRecurring] = useState(false);

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/55 px-4 py-6 backdrop-blur-sm sm:items-center">
      <div className="w-full max-w-lg rounded-[32px] border border-white/20 bg-white p-6 shadow-[0_30px_100px_rgba(15,23,42,0.35)] dark:bg-slate-950">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-xs uppercase tracking-[0.32em] text-sky-500">Quick add</p>
            <h2 className="mt-2 text-2xl font-semibold text-slate-950 dark:text-white">Add a transaction</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-xl border border-slate-200 px-3 py-2 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">
            Close
          </button>
        </div>

        <div className="mt-6 grid gap-3 sm:grid-cols-2">
          <button
            type="button"
            onClick={() => setType("expense")}
            className={`rounded-2xl border px-4 py-3 text-left ${type === "expense" ? "border-rose-300 bg-rose-50 text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-200" : "border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300"}`}
          >
            Expense
          </button>
          <button
            type="button"
            onClick={() => setType("income")}
            className={`rounded-2xl border px-4 py-3 text-left ${type === "income" ? "border-emerald-300 bg-emerald-50 text-emerald-700 dark:border-emerald-500/30 dark:bg-emerald-500/10 dark:text-emerald-200" : "border-slate-200 text-slate-600 dark:border-white/10 dark:text-slate-300"}`}
          >
            Income
          </button>
        </div>

        <div className="mt-5 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            Amount
            <input value={amount} onChange={(event) => setAmount(event.target.value)} type="number" min="0" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none ring-0 placeholder:text-slate-400 focus:border-sky-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
          </label>
          <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            Currency
            <select value={currency} onChange={(event) => setCurrency(event.target.value as (typeof currencies)[number]["code"])} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white">
              {currencies.map((item) => <option key={item.code} value={item.code}>{item.label}</option>)}
            </select>
          </label>
        </div>

        <div className="mt-4 grid gap-4 sm:grid-cols-2">
          <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            Category
            <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none dark:border-white/10 dark:bg-white/5 dark:text-white">
              {categories.map((item) => <option key={item} value={item}>{item}</option>)}
            </select>
          </label>
          <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
            Description
            <input value={description} onChange={(event) => setDescription(event.target.value)} placeholder="Optional note" className="rounded-2xl border border-slate-200 bg-white px-4 py-3 text-slate-950 outline-none placeholder:text-slate-400 dark:border-white/10 dark:bg-white/5 dark:text-white" />
          </label>
        </div>

        <label className="mt-4 flex items-center gap-3 rounded-2xl bg-slate-950/5 px-4 py-3 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-200">
          <input checked={recurring} onChange={(event) => setRecurring(event.target.checked)} type="checkbox" className="h-4 w-4 rounded border-slate-300 text-sky-500 focus:ring-sky-400" />
          Recurring transaction
        </label>

        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() => {
              onSave({
                type,
                category,
                description: description || `${type === "expense" ? "Expense" : "Income"} entry`,
                amount: Number(amount),
                date: new Date().toISOString().slice(0, 10),
                currency,
                recurring,
              });
              onClose();
            }}
            className="flex-1 rounded-2xl bg-slate-950 px-4 py-3 font-medium text-white dark:bg-white dark:text-slate-950"
          >
            Save transaction
          </button>
          <button type="button" onClick={onClose} className="rounded-2xl border border-slate-200 px-4 py-3 text-sm text-slate-600 dark:border-white/10 dark:text-slate-300">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
