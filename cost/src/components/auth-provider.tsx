"use client";

import { createContext, useContext, useMemo, useState } from "react";

type AuthUser = {
  name: string;
  email: string;
};

type AuthContextValue = {
  user: AuthUser | null;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | undefined>(undefined);
const storageKey = "cost-auth-user";

function inferName(email: string) {
  const local = email.split("@")[0] || "user";
  return local
    .split(/[._-]/)
    .filter(Boolean)
    .map((part) => part[0].toUpperCase() + part.slice(1))
    .join(" ");
}

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(() => {
    if (typeof window === "undefined") {
      return null;
    }
    const stored = window.localStorage.getItem(storageKey);
    if (!stored) {
      return null;
    }
    try {
      const parsed = JSON.parse(stored) as AuthUser;
      return parsed?.email ? parsed : null;
    } catch {
      window.localStorage.removeItem(storageKey);
      return null;
    }
  });
  const value = useMemo<AuthContextValue>(
    () => ({
      user,
      isAuthenticated: Boolean(user),
      login: async (email, password) => {
        if (!email || !password) {
          throw new Error("Email and password are required.");
        }
        const nextUser = { name: inferName(email), email };
        setUser(nextUser);
        window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
      },
      signup: async (name, email, password) => {
        if (!name || !email || password.length < 6) {
          throw new Error("Provide name, email, and a password of at least 6 characters.");
        }
        const nextUser = { name, email };
        setUser(nextUser);
        window.localStorage.setItem(storageKey, JSON.stringify(nextUser));
      },
      logout: () => {
        setUser(null);
        window.localStorage.removeItem(storageKey);
      },
    }),
    [user],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
