'use client';

import { createContext, useContext, useState, useCallback, ReactNode, useEffect } from 'react';
import { translations, Locale } from './translations';

interface LanguageContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, replacements?: Record<string, string>) => string;
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<Locale>('en');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    try {
      const saved = localStorage.getItem('viabtech-lang') as Locale | null;
      if (saved && (saved === 'en' || saved === 'sw')) {
        setLocaleState(saved);
      }
    } catch {
      // localStorage may not be available (e.g., private browsing in some browsers)
    }
  }, []);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    try {
      localStorage.setItem('viabtech-lang', newLocale);
    } catch {
      // ignore
    }
    document.documentElement.lang = newLocale;
  }, []);

  const t = useCallback(
    (key: string, replacements?: Record<string, string>) => {
      // Use 'en' during SSR/hydration, actual locale after mount
      const activeLocale = mounted ? locale : 'en';
      let value = translations[activeLocale]?.[key] || translations.en[key] || key;
      if (replacements) {
        Object.entries(replacements).forEach(([k, v]) => {
          value = value.replace(`{${k}}`, v);
        });
      }
      return value;
    },
    [locale, mounted],
  );

  return (
    <LanguageContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
