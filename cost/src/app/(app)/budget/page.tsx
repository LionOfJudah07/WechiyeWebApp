"use client";

import { useMemo, useState } from "react";
import { useFinance } from "@/components/finance-provider";
import { Badge, Panel, ProgressBar, SectionHeader } from "@/components/ui";
import { categories, formatCurrency, getGoalProgress } from "@/lib/finance-data";

export default function BudgetPage() {
  const { budgets, transactions, goals, settings, addBudget, updateGoal } = useFinance();
  const [category, setCategory] = useState("Food");
  const [limit, setLimit] = useState("5000");
  const [period, setPeriod] = useState<"monthly" | "yearly">("monthly");

  const spentByCategory = useMemo(() => {
    return transactions
      .filter((item) => item.type === "expense")
      .reduce<Record<string, number>>((acc, item) => {
        acc[item.category] = (acc[item.category] ?? 0) + item.amount;
        return acc;
      }, {});
  }, [transactions]);

  const recurring = useMemo(() => transactions.filter((item) => item.recurring), [transactions]);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Budgets"
        title="Category budget control"
        description="Set monthly or yearly limits and monitor category-specific spending before you cross thresholds."
      />

      <Panel>
        <form
          className="grid gap-3 md:grid-cols-4"
          onSubmit={(event) => {
            event.preventDefault();
            addBudget({
              category,
              limit: Number(limit),
              spent: spentByCategory[category] ?? 0,
              period,
              alertThreshold: 80,
            });
            setLimit("5000");
          }}
        >
          <select value={category} onChange={(event) => setCategory(event.target.value)} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={limit} onChange={(event) => setLimit(event.target.value)} type="number" min="0" className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5" />
          <select value={period} onChange={(event) => setPeriod(event.target.value as "monthly" | "yearly")} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5">
            <option value="monthly">Monthly</option>
            <option value="yearly">Yearly</option>
          </select>
          <button type="submit" className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Add budget</button>
        </form>
      </Panel>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Budget health</p>
          <div className="mt-4 space-y-3">
            {budgets.map((budget) => {
              const spent = spentByCategory[budget.category] ?? budget.spent;
              const progress = Math.round((spent / Math.max(1, budget.limit)) * 100);
              const hasAlert = progress >= budget.alertThreshold;

              return (
                <div key={budget.id} className="rounded-2xl bg-slate-950/5 p-4 dark:bg-white/5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-900 dark:text-white">{budget.category}</p>
                    <div className="flex items-center gap-2">
                      <Badge label={budget.period} tone="slate" />
                      {hasAlert ? <Badge label="alert" tone="rose" /> : <Badge label="safe" tone="emerald" />}
                    </div>
                  </div>
                  <ProgressBar value={progress} />
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    {formatCurrency(spent, settings.baseCurrency)} / {formatCurrency(budget.limit, settings.baseCurrency)} ({progress}%)
                  </p>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Savings goals</p>
          <div className="mt-4 space-y-3">
            {goals.map((goal) => {
              const progress = getGoalProgress(goal);
              return (
                <div key={goal.id} className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/40">
                  <div className="flex items-center justify-between gap-2">
                    <p className="font-semibold text-slate-900 dark:text-white">{goal.name}</p>
                    <Badge label={`${progress}%`} tone={progress > 70 ? "emerald" : "sky"} />
                  </div>
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Deadline: {goal.deadline}</p>
                  <ProgressBar value={progress} />
                  <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">
                    Saved {formatCurrency(goal.saved, settings.baseCurrency)} of {formatCurrency(goal.target, settings.baseCurrency)}
                  </p>
                  <button
                    type="button"
                    onClick={() => updateGoal(goal.id, { saved: goal.saved + 1000 })}
                    className="mt-3 rounded-xl border border-slate-300 px-3 py-1.5 text-xs font-medium text-slate-700 dark:border-white/20 dark:text-slate-200"
                  >
                    Add {formatCurrency(1000, settings.baseCurrency)}
                  </button>
                </div>
              );
            })}
          </div>
        </Panel>
      </div>

      <Panel>
        <p className="text-sm text-slate-500 dark:text-slate-400">Recurring transactions</p>
        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {recurring.map((item) => (
            <div key={item.id} className="rounded-2xl bg-slate-950/5 p-4 dark:bg-white/5">
              <div className="flex items-center justify-between gap-3">
                <p className="font-medium text-slate-900 dark:text-white">{item.description}</p>
                <Badge label={item.type} tone={item.type === "income" ? "emerald" : "rose"} />
              </div>
              <p className="mt-1 text-sm text-slate-600 dark:text-slate-300">
                {item.category} • {formatCurrency(item.amount, item.currency)}
              </p>
            </div>
          ))}
        </div>
      </Panel>
    </div>
  );
}
