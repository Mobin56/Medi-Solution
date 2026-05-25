"use client";

import { createContext, useContext, useSyncExternalStore, useCallback, type ReactNode } from "react";
import { translations, type Locale, type TranslationKey } from "@/lib/translations";

interface LanguageContextType {
  locale: Locale;
  toggleLocale: () => void;
  t: (key: TranslationKey) => string;
}

const LanguageContext = createContext<LanguageContextType>({
  locale: "en",
  toggleLocale: () => {},
  t: (key) => translations.en[key],
});

export function useLanguage() {
  return useContext(LanguageContext);
}

function getLocaleSnapshot(): Locale {
  if (typeof window === "undefined") return "en";
  return (localStorage.getItem("medi-locale") as Locale) || "en";
}

function getServerSnapshot(): Locale {
  return "en";
}

function subscribeToLocale(callback: () => void) {
  window.addEventListener("storage", callback);
  window.addEventListener("locale-change", callback);
  return () => {
    window.removeEventListener("storage", callback);
    window.removeEventListener("locale-change", callback);
  };
}

export default function LanguageProvider({ children }: { children: ReactNode }) {
  const locale = useSyncExternalStore(subscribeToLocale, getLocaleSnapshot, getServerSnapshot);

  const toggleLocale = useCallback(() => {
    const next = locale === "en" ? "bn" : "en";
    localStorage.setItem("medi-locale", next);
    window.dispatchEvent(new Event("locale-change"));
  }, [locale]);

  const t = useCallback(
    (key: TranslationKey): string => {
      return translations[locale][key] || translations.en[key] || key;
    },
    [locale]
  );

  return (
    <LanguageContext.Provider value={{ locale, toggleLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}
