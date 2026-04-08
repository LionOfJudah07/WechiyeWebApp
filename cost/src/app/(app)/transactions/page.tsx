"use client";

import { useMemo, useState } from "react";
import { useFinance } from "@/components/finance-provider";
import { Badge, Panel, SectionHeader } from "@/components/ui";
import { categories, currencies, formatCurrency, type Transaction } from "@/lib/finance-data";

type FormState = {
  type: "income" | "expense";
  category: string;
  description: string;
  amount: string;
  currency: "ETB" | "USD" | "EUR";
  date: string;
  recurring: boolean;
};

const emptyForm: FormState = {
  type: "expense",
  category: "Food",
  description: "",
  amount: "",
  currency: "ETB",
  date: new Date().toISOString().slice(0, 10),
  recurring: false,
};

export default function TransactionsPage() {
  const { transactions, settings, addTransaction, updateTransaction, deleteTransaction } = useFinance();
  const [form, setForm] = useState<FormState>(emptyForm);
  const [editing, setEditing] = useState<Transaction | null>(null);

  const sorted = useMemo(
    () => [...transactions].sort((a, b) => b.date.localeCompare(a.date)),
    [transactions],
  );

  return (
    <div className="space-y-6">
      <SectionHeader
        eyebrow="Transactions"
        title="Income and expense history"
        description="Add, edit, and delete transactions. Mark recurring charges and keep your ledger clean."
      />

      <Panel>
        <form
          className="grid gap-3 md:grid-cols-6"
          onSubmit={(event) => {
            event.preventDefault();
            addTransaction({
              type: form.type,
              category: form.category,
              description: form.description || `${form.type} entry`,
              amount: Number(form.amount),
              date: form.date,
              currency: form.currency as "ETB" | "USD" | "EUR",
              recurring: form.recurring,
            });
            setForm(emptyForm);
          }}
        >
          <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as "income" | "expense" }))} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} placeholder="Description" className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5" />
          <input value={form.amount} onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))} type="number" min="0" step="0.01" placeholder="Amount" required className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5" />
          <select value={form.currency} onChange={(event) => setForm((current) => ({ ...current, currency: event.target.value as "ETB" | "USD" | "EUR" }))} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5">
            {currencies.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}
          </select>
          <button type="submit" className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950">Add transaction</button>
          <label className="md:col-span-6 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input checked={form.recurring} onChange={(event) => setForm((current) => ({ ...current, recurring: event.target.checked }))} type="checkbox" className="h-4 w-4 rounded border-slate-300" />
            Mark as recurring transaction
          </label>
        </form>
      </Panel>

      <Panel className="overflow-hidden p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-slate-950/5 text-left text-slate-600 dark:bg-white/5 dark:text-slate-300">
              <tr>
                <th className="px-4 py-3">Date</th>
                <th className="px-4 py-3">Category</th>
                <th className="px-4 py-3">Description</th>
                <th className="px-4 py-3">Type</th>
                <th className="px-4 py-3">Amount</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((transaction) => (
                <tr key={transaction.id} className="border-t border-slate-200/70 dark:border-white/10">
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{transaction.date}</td>
                  <td className="px-4 py-3 font-medium text-slate-900 dark:text-white">{transaction.category}</td>
                  <td className="px-4 py-3 text-slate-600 dark:text-slate-300">{transaction.description}</td>
                  <td className="px-4 py-3">
                    <Badge label={transaction.type} tone={transaction.type === "expense" ? "rose" : "emerald"} />
                    {transaction.recurring ? <span className="ml-2"><Badge label="recurring" tone="amber" /></span> : null}
                  </td>
                  <td className={`px-4 py-3 font-semibold ${transaction.type === "income" ? "text-emerald-500" : "text-rose-500"}`}>
                    {transaction.type === "income" ? "+" : "-"}
                    {formatCurrency(transaction.amount, transaction.currency)}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex gap-2">
                      <button type="button" onClick={() => setEditing(transaction)} className="rounded-xl border border-slate-300 px-3 py-1.5 text-xs text-slate-700 dark:border-white/20 dark:text-slate-200">Edit</button>
                      <button type="button" onClick={() => deleteTransaction(transaction.id)} className="rounded-xl border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs text-rose-600 dark:border-rose-500/30 dark:bg-rose-500/10 dark:text-rose-300">Delete</button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Panel>

      {editing ? (
        <EditDrawer
          transaction={editing}
          onClose={() => setEditing(null)}
          onSave={(payload) => {
            updateTransaction(editing.id, payload);
            setEditing(null);
          }}
          currency={settings.baseCurrency}
        />
      ) : null}
    </div>
  );
}

function EditDrawer({
  transaction,
  onClose,
  onSave,
}: {
  transaction: Transaction;
  onClose: () => void;
  onSave: (payload: Partial<Omit<Transaction, "id">>) => void;
  currency: "ETB" | "USD" | "EUR";
}) {
  const [form, setForm] = useState({
    type: transaction.type,
    category: transaction.category,
    description: transaction.description,
    amount: String(transaction.amount),
    date: transaction.date,
    currency: transaction.currency,
    recurring: Boolean(transaction.recurring),
  });

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-slate-950/50 px-4 py-6 sm:items-center">
      <div className="w-full max-w-xl rounded-[30px] border border-white/20 bg-white p-6 shadow-2xl dark:bg-slate-950">
        <h3 className="text-xl font-semibold text-slate-900 dark:text-white">Edit transaction</h3>
        <div className="mt-4 grid gap-3 sm:grid-cols-2">
          <select value={form.type} onChange={(event) => setForm((current) => ({ ...current, type: event.target.value as "income" | "expense" }))} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5">
            <option value="expense">Expense</option>
            <option value="income">Income</option>
          </select>
          <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5">
            {categories.map((item) => <option key={item}>{item}</option>)}
          </select>
          <input value={form.description} onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5" />
          <input value={form.amount} onChange={(event) => setForm((current) => ({ ...current, amount: event.target.value }))} type="number" min="0" step="0.01" className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5" />
          <input value={form.date} onChange={(event) => setForm((current) => ({ ...current, date: event.target.value }))} type="date" className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5" />
          <select value={form.currency} onChange={(event) => setForm((current) => ({ ...current, currency: event.target.value as "ETB" | "USD" | "EUR" }))} className="rounded-2xl border border-slate-200 bg-white px-3 py-2.5 text-sm dark:border-white/10 dark:bg-white/5">
            {currencies.map((item) => <option key={item.code} value={item.code}>{item.code}</option>)}
          </select>
          <label className="sm:col-span-2 flex items-center gap-2 text-sm text-slate-600 dark:text-slate-300">
            <input checked={form.recurring} onChange={(event) => setForm((current) => ({ ...current, recurring: event.target.checked }))} type="checkbox" className="h-4 w-4 rounded border-slate-300" />
            Recurring transaction
          </label>
        </div>
        <div className="mt-6 flex gap-3">
          <button
            type="button"
            onClick={() =>
              onSave({
                type: form.type,
                category: form.category,
                description: form.description,
                amount: Number(form.amount),
                date: form.date,
                currency: form.currency,
                recurring: form.recurring,
              })
            }
            className="rounded-2xl bg-slate-950 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-950"
          >
            Save changes
          </button>
          <button type="button" onClick={onClose} className="rounded-2xl border border-slate-300 px-4 py-2.5 text-sm text-slate-700 dark:border-white/20 dark:text-slate-200">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
