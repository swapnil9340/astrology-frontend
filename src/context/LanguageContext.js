"use client";

import { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import { translate } from "@/lib/i18n";

const KEY = "astroveda_lang";
const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {
  const [lang, setLangState] = useState("en");

  useEffect(() => {
    try {
      const saved = localStorage.getItem(KEY);
      if (saved === "hi" || saved === "en") setLangState(saved);
    } catch {}
  }, []);

  const setLang = useCallback((l) => {
    setLangState(l);
    try { localStorage.setItem(KEY, l); } catch {}
    try { document.documentElement.lang = l; } catch {}
  }, []);

  const toggle = useCallback(() => setLang(lang === "en" ? "hi" : "en"), [lang, setLang]);

  const t = useCallback((key) => translate(lang, key), [lang]);

  const value = useMemo(() => ({ lang, setLang, toggle, t }), [lang, setLang, toggle, t]);

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLang() {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLang must be used within <LanguageProvider>");
  return ctx;
}
