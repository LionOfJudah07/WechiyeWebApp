"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  type Budget,
  type FinanceSettings,
  type Goal,
  type Transaction,
  initialFinanceData,
  summarizeTransactions,
  getSuggestions,
  getMonthlySummary,
  getYearlySummary,
  getCategoryBreakdown,
  getTrendPoints,
} from "@/lib/finance-data";

type TransactionInput = Omit<Transaction, "id">;

type FinanceContextValue = {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  settings: FinanceSettings;
  summary: ReturnType<typeof summarizeTransactions>;
  monthlySummary: ReturnType<typeof getMonthlySummary>;
  yearlySummary: ReturnType<typeof getYearlySummary>;
  breakdown: ReturnType<typeof getCategoryBreakdown>;
  trend: ReturnType<typeof getTrendPoints>;
  suggestions: ReturnType<typeof getSuggestions>;
  addTransaction: (transaction: TransactionInput) => void;
  updateTransaction: (id: string, transaction: Partial<TransactionInput>) => void;
  deleteTransaction: (id: string) => void;
  updateBudget: (id: string, budget: Partial<Budget>) => void;
  addBudget: (budget: Omit<Budget, "id">) => void;
  updateGoal: (id: string, goal: Partial<Goal>) => void;
  setSettings: (settings: Partial<FinanceSettings>) => void;
};

const FinanceContext = createContext<FinanceContextValue | undefined>(undefined);
const storageKey = "cost-finance-state";

function buildInitialState() {
  return initialFinanceData;
}

export function FinanceProvider({ children }: { children: React.ReactNode }) {
  const [state, setState] = useState(buildInitialState);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    const stored = window.localStorage.getItem(storageKey);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as typeof initialFinanceData;
        setState(parsed);
      } catch {
        window.localStorage.removeItem(storageKey);
      }
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) {
      return;
    }
    window.localStorage.setItem(storageKey, JSON.stringify(state));
  }, [hydrated, state]);

  const summary = useMemo(() => summarizeTransactions(state.transactions, state.settings), [state]);
  const monthlySummary = useMemo(() => getMonthlySummary(state.transactions, state.settings), [state]);
  const yearlySummary = useMemo(() => getYearlySummary(state.transactions, state.settings), [state]);
  const breakdown = useMemo(() => getCategoryBreakdown(state.transactions, state.settings), [state]);
  const trend = useMemo(() => getTrendPoints(state.transactions, state.settings, 6), [state]);
  const suggestions = useMemo(() => getSuggestions(state.transactions, state.budgets, state.settings), [state]);

  const value = useMemo<FinanceContextValue>(
    () => ({
      transactions: state.transactions,
      budgets: state.budgets,
      goals: state.goals,
      settings: state.settings,
      summary,
      monthlySummary,
      yearlySummary,
      breakdown,
      trend,
      suggestions,
      addTransaction: (transaction) => {
        setState((current) => ({
          ...current,
          transactions: [{ ...transaction, id: `txn-${Date.now()}` }, ...current.transactions],
        }));
      },
      updateTransaction: (id, transaction) => {
        setState((current) => ({
          ...current,
          transactions: current.transactions.map((entry) =>
            entry.id === id ? { ...entry, ...transaction } : entry,
          ),
        }));
      },
      deleteTransaction: (id) => {
        setState((current) => ({
          ...current,
          transactions: current.transactions.filter((entry) => entry.id !== id),
        }));
      },
      updateBudget: (id, budget) => {
        setState((current) => ({
          ...current,
          budgets: current.budgets.map((entry) => (entry.id === id ? { ...entry, ...budget } : entry)),
        }));
      },
      addBudget: (budget) => {
        setState((current) => ({
          ...current,
          budgets: [...current.budgets, { ...budget, id: `budget-${Date.now()}` }],
        }));
      },
      updateGoal: (id, goal) => {
        setState((current) => ({
          ...current,
          goals: current.goals.map((entry) => (entry.id === id ? { ...entry, ...goal } : entry)),
        }));
      },
      setSettings: (settings) => {
        setState((current) => ({
          ...current,
          settings: { ...current.settings, ...settings },
        }));
      },
    }),
    [breakdown, monthlySummary, yearlySummary, suggestions, state, summary, trend],
  );

  return <FinanceContext.Provider value={value}>{children}</FinanceContext.Provider>;
}

export function useFinance() {
  const context = useContext(FinanceContext);
  if (!context) {
    throw new Error("useFinance must be used within FinanceProvider");
  }

  return context;
}
