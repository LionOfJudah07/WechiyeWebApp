export type CurrencyCode = "ETB" | "USD" | "EUR";

export type TransactionType = "income" | "expense";

export type Transaction = {
  id: string;
  type: TransactionType;
  category: string;
  description: string;
  amount: number;
  date: string;
  currency: CurrencyCode;
  recurring?: boolean;
  source?: string;
};

export type Budget = {
  id: string;
  category: string;
  limit: number;
  spent: number;
  period: "monthly" | "yearly";
  alertThreshold: number;
};

export type Goal = {
  id: string;
  name: string;
  target: number;
  saved: number;
  deadline: string;
  accent: string;
};

export type Suggestion = {
  title: string;
  detail: string;
  priority: "high" | "medium" | "low";
};

export type ExchangeRates = Record<CurrencyCode, number>;

export type FinanceSettings = {
  baseCurrency: CurrencyCode;
  exchangeRates: ExchangeRates;
  lowBalanceAlert: number;
  telebirrEnabled: boolean;
  cbeBirrEnabled: boolean;
  offlineMode: boolean;
  emailReports: boolean;
};

export type FinanceSnapshot = {
  transactions: Transaction[];
  budgets: Budget[];
  goals: Goal[];
  settings: FinanceSettings;
};

export type SummaryMetrics = {
  totalIncome: number;
  totalExpenses: number;
  balance: number;
  savingsRate: number;
  recurringCount: number;
  savingsProgress: number;
};

export type CategoryBreakdown = {
  category: string;
  amount: number;
  percentage: number;
  color: string;
};

export type TrendPoint = {
  label: string;
  income: number;
  expense: number;
};

export const currencies: { code: CurrencyCode; label: string; symbol: string }[] = [
  { code: "ETB", label: "Ethiopian Birr", symbol: "Br" },
  { code: "USD", label: "US Dollar", symbol: "$" },
  { code: "EUR", label: "Euro", symbol: "€" },
];

export const categories = [
  "Food",
  "Transport",
  "Rent",
  "Entertainment",
  "Bills",
  "Savings",
  "Health",
  "Education",
  "Business",
  "Other",
];

export const initialFinanceData: FinanceSnapshot = {
  transactions: [
    {
      id: "txn-1",
      type: "income",
      category: "Salary",
      description: "Monthly salary from TechWorks",
      amount: 42000,
      date: "2026-04-01",
      currency: "ETB",
      source: "Employer",
    },
    {
      id: "txn-2",
      type: "expense",
      category: "Rent",
      description: "Apartment rent in Bole",
      amount: 12000,
      date: "2026-04-03",
      currency: "ETB",
      recurring: true,
      source: "Landlord",
    },
    {
      id: "txn-3",
      type: "expense",
      category: "Food",
      description: "Lunch and groceries",
      amount: 3400,
      date: "2026-04-04",
      currency: "ETB",
    },
    {
      id: "txn-4",
      type: "expense",
      category: "Transport",
      description: "Fuel and ride-hailing",
      amount: 1800,
      date: "2026-04-06",
      currency: "ETB",
    },
    {
      id: "txn-5",
      type: "income",
      category: "Freelance",
      description: "Website redesign project",
      amount: 8600,
      date: "2026-03-28",
      currency: "USD",
      source: "Client",
    },
    {
      id: "txn-6",
      type: "expense",
      category: "Subscriptions",
      description: "Cloud tools and music plan",
      amount: 120,
      date: "2026-04-02",
      currency: "USD",
      recurring: true,
    },
  ],
  budgets: [
    {
      id: "budget-food",
      category: "Food",
      limit: 9000,
      spent: 6400,
      period: "monthly",
      alertThreshold: 80,
    },
    {
      id: "budget-transport",
      category: "Transport",
      limit: 4500,
      spent: 3250,
      period: "monthly",
      alertThreshold: 75,
    },
    {
      id: "budget-entertainment",
      category: "Entertainment",
      limit: 3000,
      spent: 2560,
      period: "monthly",
      alertThreshold: 85,
    },
  ],
  goals: [
    {
      id: "goal-phone",
      name: "New smartphone",
      target: 25000,
      saved: 14800,
      deadline: "2026-09-30",
      accent: "from-sky-500 to-cyan-400",
    },
    {
      id: "goal-car",
      name: "First car fund",
      target: 180000,
      saved: 54000,
      deadline: "2027-06-30",
      accent: "from-emerald-500 to-teal-400",
    },
  ],
  settings: {
    baseCurrency: "ETB",
    exchangeRates: {
      ETB: 1,
      USD: 117.5,
      EUR: 128.2,
    },
    lowBalanceAlert: 1500,
    telebirrEnabled: true,
    cbeBirrEnabled: true,
    offlineMode: true,
    emailReports: true,
  },
};

export function formatCurrency(value: number, currency: CurrencyCode = "ETB") {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency,
    maximumFractionDigits: 0,
  }).format(value);
}

export function convertToBaseCurrency(
  amount: number,
  currency: CurrencyCode,
  settings: FinanceSettings,
) {
  const rate = settings.exchangeRates[currency] ?? 1;
  return amount * rate;
}

export function summarizeTransactions(
  transactions: Transaction[],
  settings: FinanceSettings,
): SummaryMetrics {
  const totals = transactions.reduce(
    (accumulator, transaction) => {
      const amount = convertToBaseCurrency(
        transaction.amount,
        transaction.currency,
        settings,
      );

      if (transaction.type === "income") {
        accumulator.income += amount;
      } else {
        accumulator.expense += amount;
      }

      if (transaction.recurring) {
        accumulator.recurring += 1;
      }

      return accumulator;
    },
    { income: 0, expense: 0, recurring: 0 },
  );

  const balance = totals.income - totals.expense;
  const savingsRate = totals.income > 0 ? (balance / totals.income) * 100 : 0;
  const savingsProgress = Math.min(100, Math.max(0, (balance / 20000) * 100));

  return {
    totalIncome: totals.income,
    totalExpenses: totals.expense,
    balance,
    savingsRate,
    recurringCount: totals.recurring,
    savingsProgress,
  };
}

export function getCategoryBreakdown(
  transactions: Transaction[],
  settings: FinanceSettings,
): CategoryBreakdown[] {
  const palette = [
    "#2563eb",
    "#0f766e",
    "#f97316",
    "#7c3aed",
    "#0891b2",
    "#be123c",
    "#16a34a",
    "#9333ea",
  ];

  const expenseTotals = transactions
    .filter((transaction) => transaction.type === "expense")
    .reduce<Record<string, number>>((accumulator, transaction) => {
      const amount = convertToBaseCurrency(
        transaction.amount,
        transaction.currency,
        settings,
      );

      accumulator[transaction.category] = (accumulator[transaction.category] ?? 0) + amount;
      return accumulator;
    }, {});

  const total = Object.values(expenseTotals).reduce((sum, value) => sum + value, 0);

  return Object.entries(expenseTotals)
    .sort((left, right) => right[1] - left[1])
    .map(([category, amount], index) => ({
      category,
      amount,
      percentage: total > 0 ? (amount / total) * 100 : 0,
      color: palette[index % palette.length],
    }));
}

export function getTrendPoints(
  transactions: Transaction[],
  settings: FinanceSettings,
  months = 6,
): TrendPoint[] {
  const now = new Date("2026-04-06T00:00:00Z");
  const points: TrendPoint[] = [];

  for (let index = months - 1; index >= 0; index -= 1) {
    const date = new Date(Date.UTC(now.getUTCFullYear(), now.getUTCMonth() - index, 1));
    const key = `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
    const label = date.toLocaleDateString("en-US", { month: "short" });

    const monthTransactions = transactions.filter((transaction) =>
      transaction.date.startsWith(key),
    );

    const income = monthTransactions
      .filter((transaction) => transaction.type === "income")
      .reduce(
        (sum, transaction) => sum + convertToBaseCurrency(transaction.amount, transaction.currency, settings),
        0,
      );

    const expense = monthTransactions
      .filter((transaction) => transaction.type === "expense")
      .reduce(
        (sum, transaction) => sum + convertToBaseCurrency(transaction.amount, transaction.currency, settings),
        0,
      );

    points.push({ label, income, expense });
  }

  return points;
}

export function getMonthlySummary(transactions: Transaction[], settings: FinanceSettings) {
  const summary = new Map<string, { income: number; expense: number }>();

  transactions.forEach((transaction) => {
    const month = transaction.date.slice(0, 7);
    const entry = summary.get(month) ?? { income: 0, expense: 0 };
    const amount = convertToBaseCurrency(transaction.amount, transaction.currency, settings);

    if (transaction.type === "income") {
      entry.income += amount;
    } else {
      entry.expense += amount;
    }

    summary.set(month, entry);
  });

  return Array.from(summary.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([month, value]) => ({
      month,
      ...value,
    }));
}

export function getYearlySummary(transactions: Transaction[], settings: FinanceSettings) {
  const summary = new Map<string, { income: number; expense: number }>();

  transactions.forEach((transaction) => {
    const year = transaction.date.slice(0, 4);
    const entry = summary.get(year) ?? { income: 0, expense: 0 };
    const amount = convertToBaseCurrency(transaction.amount, transaction.currency, settings);

    if (transaction.type === "income") {
      entry.income += amount;
    } else {
      entry.expense += amount;
    }

    summary.set(year, entry);
  });

  return Array.from(summary.entries())
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([year, value]) => ({
      year,
      ...value,
    }));
}

export function estimateNextMonthExpenses(transactions: Transaction[], settings: FinanceSettings) {
  const trend = getTrendPoints(transactions, settings, 3);
  const average = trend.reduce((sum, point) => sum + point.expense, 0) / Math.max(1, trend.length);
  return Math.round(average * 1.08);
}

export function getSuggestions(
  transactions: Transaction[],
  budgets: Budget[],
  settings: FinanceSettings,
): Suggestion[] {
  const breakdown = getCategoryBreakdown(transactions, settings);
  const topExpense = breakdown[0];
  const overBudget = budgets.find((budget) => budget.spent > budget.limit);
  const recurring = transactions.filter((transaction) => transaction.recurring);

  const suggestions: Suggestion[] = [];

  if (topExpense) {
    suggestions.push({
      title: `Reduce ${topExpense.category} spend`,
      detail: `${formatCurrency(topExpense.amount, settings.baseCurrency)} is flowing into ${topExpense.category.toLowerCase()} this month. A capped weekly budget could free up cash for your goals.`,
      priority: "high",
    });
  }

  if (overBudget) {
    suggestions.push({
      title: `${overBudget.category} budget is over limit`,
      detail: `${formatCurrency(overBudget.spent - overBudget.limit, settings.baseCurrency)} is above your target. Consider shifting ${overBudget.alertThreshold}% alerts into a push notification.`,
      priority: "high",
    });
  }

  if (recurring.length > 0) {
    suggestions.push({
      title: "Review recurring subscriptions",
      detail: `${recurring.length} recurring items are active. Renegotiating just one monthly subscription can improve your savings rate quickly.`,
      priority: "medium",
    });
  }

  suggestions.push({
    title: "Forecast next month",
    detail: `Your recent spending trends suggest a projected expense range of about ${formatCurrency(
      estimateNextMonthExpenses(transactions, settings),
      settings.baseCurrency,
    )}.`,
    priority: "low",
  });

  return suggestions;
}

export function getGoalProgress(goal: Goal) {
  return Math.min(100, Math.round((goal.saved / goal.target) * 100));
}
