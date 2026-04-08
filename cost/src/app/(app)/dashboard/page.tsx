"use client";

import { ArrowDownIcon, ArrowUpIcon, SparkIcon } from "@/components/icons";
import { LineChart, PieChart } from "@/components/finance-charts";
import { Badge, Metric, Panel, ProgressBar, SectionHeader, StatCard } from "@/components/ui";
import { useFinance } from "@/components/finance-provider";
import { formatCurrency, getGoalProgress } from "@/lib/finance-data";

export default function DashboardPage() {
  const { summary, breakdown, trend, suggestions, settings, goals } = useFinance();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Overview"
        title="Financial command center"
        description="Monitor balances, detect overspending, and keep savings goals on track with real-time ETB-first analytics."
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Total balance"
          value={formatCurrency(summary.balance, settings.baseCurrency)}
          change={`${summary.savingsRate.toFixed(1)}% savings rate`}
          icon={<SparkIcon className="h-5 w-5" />}
          tone={summary.balance >= 0 ? "emerald" : "rose"}
        />
        <StatCard
          label="Income"
          value={formatCurrency(summary.totalIncome, settings.baseCurrency)}
          change="Across all tracked currencies"
          icon={<ArrowUpIcon className="h-5 w-5" />}
          tone="sky"
        />
        <StatCard
          label="Expenses"
          value={formatCurrency(summary.totalExpenses, settings.baseCurrency)}
          change="Includes recurring expenses"
          icon={<ArrowDownIcon className="h-5 w-5" />}
          tone="rose"
        />
        <StatCard
          label="Active recurring"
          value={String(summary.recurringCount)}
          change="Rent, subscriptions, and fixed bills"
          icon={<SparkIcon className="h-5 w-5" />}
          tone="amber"
        />
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <LineChart data={trend} currency={settings.baseCurrency} />
        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Expense categories</p>
          <p className="mt-1 text-lg font-semibold text-slate-950 dark:text-white">Where your money goes</p>
          <div className="mt-4">
            <PieChart
              data={breakdown.map((item) => ({
                label: item.category,
                amount: item.amount,
                percentage: item.percentage,
                color: item.color,
              }))}
              currency={settings.baseCurrency}
            />
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Savings goals</p>
          <div className="mt-4 space-y-3">
            {goals.map((goal) => {
              const progress = getGoalProgress(goal);
              return (
                <div key={goal.id} className="rounded-2xl bg-slate-950/5 p-4 dark:bg-white/5">
                  <div className="mb-2 flex items-center justify-between gap-3">
                    <p className="font-medium text-slate-950 dark:text-white">{goal.name}</p>
                    <Badge label={`${progress}%`} tone={progress > 70 ? "emerald" : "sky"} />
                  </div>
                  <ProgressBar value={progress} />
                  <div className="mt-2 grid grid-cols-2 gap-2 text-sm">
                    <Metric label="Saved" amount={goal.saved} currency={settings.baseCurrency} />
                    <Metric label="Target" amount={goal.target} currency={settings.baseCurrency} />
                  </div>
                </div>
              );
            })}
          </div>
        </Panel>

        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">AI suggestions</p>
          <div className="mt-4 space-y-3">
            {suggestions.map((item) => (
              <div key={item.title} className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/40">
                <div className="mb-2 flex items-center justify-between gap-3">
                  <p className="font-semibold text-slate-950 dark:text-white">{item.title}</p>
                  <Badge label={item.priority} tone={item.priority === "high" ? "rose" : item.priority === "medium" ? "amber" : "sky"} />
                </div>
                <p className="text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
              </div>
            ))}
          </div>
        </Panel>
      </div>
    </div>
  );
}
