# Cost Flow

Cost Flow is a modern cost management web app built with Next.js App Router.
It helps users track income and expenses, manage budgets, monitor savings goals, and analyze trends with ETB-first multi-currency support.

## Features

- User authentication flow (sign up, login, logout) using local state, ready for production auth integration
- Dashboard with balance, income, expenses, savings rate, and recurring payment insight
- Transaction management with add, edit, delete, category tagging, and recurring flag
- Budget management per category with threshold-based alert indicators
- Savings goals tracking with live progress updates
- Reports page with:
	- Expense category pie chart
	- Income vs expense trend line chart
	- Monthly and yearly summaries
	- CSV export (Excel-friendly)
	- Print-to-PDF workflow
- AI-style recommendations and next-month expense prediction based on spending trends
- Multi-currency support with ETB base currency controls and exchange rate settings
- Ethiopia-focused integration readiness controls for Telebirr and CBE Birr
- Offline-friendly, local-first storage behavior for auth and finance data
- Responsive UI with light/dark theme toggle and quick Add Expense action

## Pages

- Landing page: `/`
- Authentication: `/auth`
- Dashboard: `/dashboard`
- Transactions: `/transactions`
- Budget: `/budget`
- Reports: `/reports`
- Profile/settings: `/profile`

## Run Locally

1. Install dependencies:

```bash
npm install
```

2. Start development server:

```bash
npm run dev
```

3. Open:

```text
http://localhost:3000
```

## Production Build

```bash
npm run build
npm run start
```

## Tech Stack

- Next.js 16 (App Router)
- React 19
- TypeScript
- Tailwind CSS 4

## Notes

- Current auth and data layers are local-storage based for fast prototyping.
- The architecture is designed so you can plug in real backend services (Node/Express + PostgreSQL or MongoDB) without redesigning the UI.
