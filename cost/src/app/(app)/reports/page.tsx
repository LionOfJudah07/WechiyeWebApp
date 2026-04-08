"use client";

import { DownloadIcon, SparkIcon } from "@/components/icons";
import { LineChart, PieChart } from "@/components/finance-charts";
import { Badge, Panel, SectionHeader } from "@/components/ui";
import { useFinance } from "@/components/finance-provider";
import { estimateNextMonthExpenses, formatCurrency } from "@/lib/finance-data";

function downloadCsv(filename: string, rows: string[][]) {
  const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(",")).join("\n");
  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename;
  a.click();
  URL.revokeObjectURL(url);
}

export default function ReportsPage() {
  const { monthlySummary, yearlySummary, trend, breakdown, settings, suggestions, transactions } = useFinance();
  const prediction = estimateNextMonthExpenses(transactions, settings);

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Reports"
        title="Analytics and exports"
        description="Use monthly/yearly reports and predictive insights to make better finance decisions."
        action={
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() =>
                downloadCsv("monthly-report.csv", [
                  ["Month", "Income", "Expense"],
                  ...monthlySummary.map((item) => [item.month, item.income, item.expense].map(String)),
                ])
              }
              className="inline-flex items-center gap-2 rounded-2xl border border-slate-300 px-4 py-2 text-sm font-medium text-slate-700 dark:border-white/20 dark:text-slate-100"
            >
              <DownloadIcon className="h-4 w-4" />
              Download Excel (CSV)
            </button>
            <button
              type="button"
              onClick={() => window.print()}
              className="inline-flex items-center gap-2 rounded-2xl bg-slate-950 px-4 py-2 text-sm font-medium text-white dark:bg-white dark:text-slate-950"
            >
              <DownloadIcon className="h-4 w-4" />
              Download PDF
            </button>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[1.1fr_0.9fr]">
        <LineChart data={trend} currency={settings.baseCurrency} />
        <Panel>
          <PieChart
            data={breakdown.map((item) => ({
              label: item.category,
              amount: item.amount,
              percentage: item.percentage,
              color: item.color,
            }))}
            currency={settings.baseCurrency}
          />
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Monthly summary</p>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-2">Month</th>
                  <th className="py-2">Income</th>
                  <th className="py-2">Expense</th>
                </tr>
              </thead>
              <tbody>
                {monthlySummary.map((item) => (
                  <tr key={item.month} className="border-t border-slate-200/70 dark:border-white/10">
                    <td className="py-2 text-slate-900 dark:text-white">{item.month}</td>
                    <td className="py-2 text-emerald-500">{formatCurrency(item.income, settings.baseCurrency)}</td>
                    <td className="py-2 text-rose-500">{formatCurrency(item.expense, settings.baseCurrency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>

        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Yearly summary</p>
          <div className="mt-3 overflow-x-auto">
            <table className="min-w-full text-sm">
              <thead className="text-left text-slate-500 dark:text-slate-400">
                <tr>
                  <th className="py-2">Year</th>
                  <th className="py-2">Income</th>
                  <th className="py-2">Expense</th>
                </tr>
              </thead>
              <tbody>
                {yearlySummary.map((item) => (
                  <tr key={item.year} className="border-t border-slate-200/70 dark:border-white/10">
                    <td className="py-2 text-slate-900 dark:text-white">{item.year}</td>
                    <td className="py-2 text-emerald-500">{formatCurrency(item.income, settings.baseCurrency)}</td>
                    <td className="py-2 text-rose-500">{formatCurrency(item.expense, settings.baseCurrency)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Panel>
      </div>

      <Panel>
        <div className="flex flex-wrap items-start justify-between gap-3">
          <div>
            <p className="text-sm text-slate-500 dark:text-slate-400">Prediction and recommendations</p>
            <p className="mt-1 text-lg font-semibold text-slate-900 dark:text-white">Projected next month expense: {formatCurrency(prediction, settings.baseCurrency)}</p>
          </div>
          <Badge label="AI forecast" tone="sky" />
        </div>

        <div className="mt-4 grid gap-3 md:grid-cols-2">
          {suggestions.map((item) => (
            <div key={item.title} className="rounded-2xl border border-white/60 bg-white/80 p-4 dark:border-white/10 dark:bg-slate-900/40">
              <div className="flex items-center justify-between gap-2">
                <p className="font-semibold text-slate-900 dark:text-white">{item.title}</p>
                <Badge label={item.priority} tone={item.priority === "high" ? "rose" : item.priority === "medium" ? "amber" : "sky"} />
              </div>
              <p className="mt-2 text-sm leading-6 text-slate-600 dark:text-slate-300">{item.detail}</p>
            </div>
          ))}
          <div className="rounded-2xl bg-gradient-to-br from-sky-500 via-cyan-500 to-teal-500 p-4 text-white shadow-lg">
            <p className="text-sm text-white/80">Smart tip</p>
            <p className="mt-2 text-lg font-semibold">Shift 5% from high-spend categories into savings goals this month.</p>
            <div className="mt-3 inline-flex items-center gap-2 rounded-full bg-white/20 px-3 py-1 text-xs">
              <SparkIcon className="h-3.5 w-3.5" />
              Behavioral optimization
            </div>
          </div>
        </div>
      </Panel>
    </div>
  );
}
