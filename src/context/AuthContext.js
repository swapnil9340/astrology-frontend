"use client";

import { createContext, useContext, useEffect, useState, useCallback, useMemo } from "react";
import { apiLogin, apiRegister, apiMe } from "@/lib/api";

const STORAGE_KEY = "astroveda_token";
const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true); // hydrating from storage

  // On mount, restore any saved token and verify it against the API.
  useEffect(() => {
    let active = true;
    let saved = null;
    try {
      saved = localStorage.getItem(STORAGE_KEY);
    } catch {
      saved = null;
    }
    if (!saved) {
      setLoading(false);
      return;
    }
    apiMe(saved)
      .then((data) => {
        if (!active) return;
        setToken(saved);
        setUser(data.user);
      })
      .catch(() => {
        try { localStorage.removeItem(STORAGE_KEY); } catch {}
      })
      .finally(() => active && setLoading(false));
    return () => { active = false; };
  }, []);

  const persist = useCallback((tok, usr) => {
    setToken(tok);
    setUser(usr);
    try { localStorage.setItem(STORAGE_KEY, tok); } catch {}
  }, []);

  const login = useCallback(async (email, password) => {
    const data = await apiLogin({ email, password });
    persist(data.token, data.user);
    return data.user;
  }, [persist]);

  // payload: { name, email, password, gender, dateOfBirth, timeOfBirth, placeOfBirth }
  const register = useCallback(async (payload) => {
    const data = await apiRegister(payload);
    persist(data.token, data.user);
    return data.user;
  }, [persist]);

  // Re-fetch the current user (e.g. after a payment updates credits/subscription).
  const refreshUser = useCallback(async () => {
    if (!token) return null;
    try {
      const data = await apiMe(token);
      setUser(data.user);
      return data.user;
    } catch {
      return null;
    }
  }, [token]);

  const logout = useCallback(() => {
    setToken(null);
    setUser(null);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  }, []);

  // Memoized so consumers (e.g. Header) don't re-render on unrelated renders.
  const value = useMemo(
    () => ({ user, token, loading, login, register, logout, refreshUser }),
    [user, token, loading, login, register, logout, refreshUser]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within <AuthProvider>");
  return ctx;
}
