"use client";

import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth-provider";
import { useFinance } from "@/components/finance-provider";
import { Panel, SectionHeader } from "@/components/ui";
import { currencies } from "@/lib/finance-data";

export default function ProfilePage() {
  const router = useRouter();
  const { user, logout } = useAuth();
  const { settings, setSettings } = useFinance();

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Profile"
        title="Account and settings"
        description="Manage currency preferences, alerts, and Ethiopia-focused payment integration readiness."
      />

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Account</p>
          <div className="mt-4 rounded-2xl bg-slate-950/5 p-4 dark:bg-white/5">
            <p className="font-semibold text-slate-900 dark:text-white">{user?.name}</p>
            <p className="text-sm text-slate-600 dark:text-slate-300">{user?.email}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              logout();
              router.replace("/auth");
            }}
            className="mt-4 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-2 text-sm font-medium text-rose-700 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300"
          >
            Logout
          </button>
        </Panel>

        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Finance preferences</p>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              Base currency
              <select
                value={settings.baseCurrency}
                onChange={(event) => setSettings({ baseCurrency: event.target.value as "ETB" | "USD" | "EUR" })}
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/5"
              >
                {currencies.map((item) => (
                  <option key={item.code} value={item.code}>{item.label}</option>
                ))}
              </select>
            </label>

            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              Low balance alert
              <input
                value={settings.lowBalanceAlert}
                onChange={(event) => setSettings({ lowBalanceAlert: Number(event.target.value) })}
                type="number"
                min="0"
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/5"
              />
            </label>
          </div>
        </Panel>
      </div>

      <div className="grid gap-4 xl:grid-cols-2">
        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Integration readiness</p>
          <div className="mt-4 space-y-3">
            <Toggle label="Telebirr integration ready" checked={settings.telebirrEnabled} onChange={(value) => setSettings({ telebirrEnabled: value })} />
            <Toggle label="CBE Birr integration ready" checked={settings.cbeBirrEnabled} onChange={(value) => setSettings({ cbeBirrEnabled: value })} />
            <Toggle label="Offline-friendly mode" checked={settings.offlineMode} onChange={(value) => setSettings({ offlineMode: value })} />
            <Toggle label="Email weekly reports" checked={settings.emailReports} onChange={(value) => setSettings({ emailReports: value })} />
          </div>
        </Panel>

        <Panel>
          <p className="text-sm text-slate-500 dark:text-slate-400">Exchange rates</p>
          <div className="mt-4 grid gap-3">
            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              1 USD in ETB
              <input
                type="number"
                min="1"
                value={settings.exchangeRates.USD}
                onChange={(event) =>
                  setSettings({
                    exchangeRates: { ...settings.exchangeRates, USD: Number(event.target.value) },
                  })
                }
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/5"
              />
            </label>
            <label className="grid gap-2 text-sm text-slate-600 dark:text-slate-300">
              1 EUR in ETB
              <input
                type="number"
                min="1"
                value={settings.exchangeRates.EUR}
                onChange={(event) =>
                  setSettings({
                    exchangeRates: { ...settings.exchangeRates, EUR: Number(event.target.value) },
                  })
                }
                className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 dark:border-white/10 dark:bg-white/5"
              />
            </label>
          </div>
        </Panel>
      </div>
    </div>
  );
}

function Toggle({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="flex items-center justify-between gap-3 rounded-2xl bg-slate-950/5 px-4 py-3 text-sm text-slate-700 dark:bg-white/5 dark:text-slate-200">
      <span>{label}</span>
      <button
        type="button"
        aria-pressed={checked}
        onClick={() => onChange(!checked)}
        className={`relative inline-flex h-6 w-11 items-center rounded-full transition ${checked ? "bg-sky-500" : "bg-slate-300 dark:bg-slate-600"}`}
      >
        <span className={`h-5 w-5 rounded-full bg-white transition ${checked ? "translate-x-5" : "translate-x-1"}`} />
      </button>
    </label>
  );
}
