import { formatCurrency, type CurrencyCode } from "@/lib/finance-data";

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
}: {
  eyebrow?: string;
  title: string;
  description?: string;
  action?: React.ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow ? <p className="text-xs uppercase tracking-[0.32em] text-sky-500 dark:text-sky-400">{eyebrow}</p> : null}
        <h2 className="mt-2 text-2xl font-semibold tracking-tight text-slate-950 dark:text-white">{title}</h2>
        {description ? <p className="mt-2 max-w-2xl text-sm leading-6 text-slate-600 dark:text-slate-400">{description}</p> : null}
      </div>
      {action ? <div>{action}</div> : null}
    </div>
  );
}

export function StatCard({
  label,
  value,
  change,
  icon,
  tone = "sky",
}: {
  label: string;
  value: string;
  change: string;
  icon: React.ReactNode;
  tone?: "sky" | "emerald" | "amber" | "rose";
}) {
  const toneClass = {
    sky: "from-sky-500/20 to-cyan-400/20 text-sky-600 dark:text-sky-300",
    emerald: "from-emerald-500/20 to-teal-400/20 text-emerald-600 dark:text-emerald-300",
    amber: "from-amber-500/20 to-orange-400/20 text-amber-600 dark:text-amber-300",
    rose: "from-rose-500/20 to-pink-400/20 text-rose-600 dark:text-rose-300",
  }[tone];

  return (
    <div className="rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)] backdrop-blur dark:border-white/10 dark:bg-slate-950/60">
      <div className={`mb-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br ${toneClass}`}>
        {icon}
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-slate-950 dark:text-white">{value}</p>
      <p className="mt-2 text-sm text-slate-500 dark:text-slate-400">{change}</p>
    </div>
  );
}

export function Panel({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div className={`rounded-[28px] border border-white/70 bg-white/85 p-5 shadow-[0_18px_40px_rgba(15,23,42,0.07)] backdrop-blur dark:border-white/10 dark:bg-slate-950/60 ${className}`}>
      {children}
    </div>
  );
}

export function Badge({ label, tone = "sky" }: { label: string; tone?: "sky" | "emerald" | "amber" | "rose" | "slate" }) {
  const classes = {
    sky: "bg-sky-500/12 text-sky-700 dark:text-sky-300",
    emerald: "bg-emerald-500/12 text-emerald-700 dark:text-emerald-300",
    amber: "bg-amber-500/12 text-amber-700 dark:text-amber-300",
    rose: "bg-rose-500/12 text-rose-700 dark:text-rose-300",
    slate: "bg-slate-500/12 text-slate-700 dark:text-slate-300",
  }[tone];

  return <span className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-medium ${classes}`}>{label}</span>;
}

export function ProgressBar({ value }: { value: number }) {
  const bounded = Math.max(0, Math.min(100, value));
  return (
    <div className="h-2 rounded-full bg-slate-900/5 dark:bg-white/10">
      <div className="h-full rounded-full bg-gradient-to-r from-sky-500 via-cyan-400 to-emerald-400" style={{ width: `${bounded}%` }} />
    </div>
  );
}

export function Metric({ label, amount, currency }: { label: string; amount: number; currency: CurrencyCode }) {
  return (
    <div className="rounded-2xl bg-slate-950/5 p-4 dark:bg-white/5">
      <p className="text-sm text-slate-500 dark:text-slate-400">{label}</p>
      <p className="mt-2 text-lg font-semibold text-slate-950 dark:text-white">{formatCurrency(amount, currency)}</p>
    </div>
  );
}
