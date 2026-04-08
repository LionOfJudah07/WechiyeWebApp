"use client";

import { formatCurrency, type CurrencyCode } from "@/lib/finance-data";

type PieSlice = {
  label: string;
  amount: number;
  percentage: number;
  color: string;
};

type TrendPoint = {
  label: string;
  income: number;
  expense: number;
};

export function PieChart({ data, currency }: { data: PieSlice[]; currency: CurrencyCode }) {
  const total = data.reduce((sum, slice) => sum + slice.amount, 0);
  let offset = 0;

  return (
    <div className="grid gap-4 lg:grid-cols-[260px_1fr]">
      <div className="relative mx-auto flex h-[260px] w-[260px] items-center justify-center rounded-full bg-slate-950/5 p-4 dark:bg-white/5">
        <svg viewBox="0 0 200 200" className="h-full w-full -rotate-90">
          {data.map((slice) => {
            const circumference = 2 * Math.PI * 64;
            const dash = (slice.amount / Math.max(1, total)) * circumference;
            const ring = (
              <circle
                key={slice.label}
                cx="100"
                cy="100"
                r="64"
                fill="none"
                stroke={slice.color}
                strokeWidth="28"
                strokeDasharray={`${dash} ${circumference - dash}`}
                strokeDashoffset={-offset}
                strokeLinecap="round"
                className="transition-all duration-500"
              />
            );

            offset += dash;
            return ring;
          })}
        </svg>
        <div className="absolute text-center">
          <p className="text-xs uppercase tracking-[0.3em] text-slate-500 dark:text-slate-400">Expense mix</p>
          <p className="mt-2 text-3xl font-semibold text-slate-950 dark:text-white">{formatCurrency(total, currency)}</p>
        </div>
      </div>

      <div className="grid gap-3">
        {data.map((slice) => (
          <div key={slice.label} className="rounded-2xl border border-white/60 bg-white/80 p-4 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="h-3 w-3 rounded-full" style={{ backgroundColor: slice.color }} />
                <div>
                  <p className="font-medium text-slate-950 dark:text-white">{slice.label}</p>
                  <p className="text-sm text-slate-500 dark:text-slate-400">{slice.percentage.toFixed(1)}% of spend</p>
                </div>
              </div>
              <p className="font-semibold text-slate-950 dark:text-white">{formatCurrency(slice.amount, currency)}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LineChart({ data, currency }: { data: TrendPoint[]; currency: CurrencyCode }) {
  const maxValue = Math.max(...data.flatMap((point) => [point.income, point.expense]), 1);

  const buildPoints = (key: keyof TrendPoint) =>
    data
      .map((point, index) => {
        const x = data.length === 1 ? 10 : 10 + (index / (data.length - 1)) * 280;
        const y = 170 - (point[key] / maxValue) * 130;
        return `${x},${y}`;
      })
      .join(" ");

  return (
    <div className="rounded-[28px] border border-white/60 bg-white/80 p-5 shadow-sm backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
      <div className="mb-4 flex items-center justify-between">
        <div>
          <p className="text-sm text-slate-500 dark:text-slate-400">Spending trend</p>
          <p className="text-lg font-semibold text-slate-950 dark:text-white">Income vs expenses</p>
        </div>
        <div className="flex items-center gap-3 text-sm text-slate-500 dark:text-slate-400">
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-sky-500" />Income</span>
          <span className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-rose-500" />Expense</span>
        </div>
      </div>
      <svg viewBox="0 0 300 190" className="h-56 w-full">
        <defs>
          <linearGradient id="trend-income" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#38bdf8" />
            <stop offset="100%" stopColor="#2563eb" />
          </linearGradient>
          <linearGradient id="trend-expense" x1="0" x2="1" y1="0" y2="0">
            <stop offset="0%" stopColor="#fb7185" />
            <stop offset="100%" stopColor="#e11d48" />
          </linearGradient>
        </defs>
        <path d="M 10 170 H 290" stroke="currentColor" className="text-slate-300 dark:text-slate-700" />
        <polyline points={buildPoints("income")} fill="none" stroke="url(#trend-income)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <polyline points={buildPoints("expense")} fill="none" stroke="url(#trend-expense)" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        {data.map((point, index) => {
          const x = data.length === 1 ? 10 : 10 + (index / (data.length - 1)) * 280;
          return (
            <text key={point.label} x={x} y="184" textAnchor="middle" className="fill-slate-500 text-[11px] dark:fill-slate-400">
              {point.label}
            </text>
          );
        })}
      </svg>
      <div className="grid gap-3 sm:grid-cols-2">
        {data.map((point) => (
          <div key={point.label} className="rounded-2xl bg-slate-950/5 p-4 dark:bg-white/5">
            <p className="text-sm font-medium text-slate-500 dark:text-slate-400">{point.label}</p>
            <div className="mt-2 flex items-center justify-between gap-4 text-sm">
              <span className="text-sky-500">{formatCurrency(point.income, currency)}</span>
              <span className="text-rose-500">{formatCurrency(point.expense, currency)}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
