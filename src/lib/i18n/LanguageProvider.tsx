'use client';

/**
 * LanguageProvider — client-side language state for Legalo.
 *
 * This is a *companion* to next-intl, not a replacement:
 *   - next-intl owns routing (`/[locale]/...`), server-side message loading,
 *     and the `useTranslations` hook used by server + client components alike.
 *   - This provider owns the *document-level* attributes (`lang`, `dir`) and
 *     exposes a lightweight client-side `t(key)` helper so imperative code
 *     (toasts, aria-live regions, etc.) can translate without going through
 *     a server request.
 *
 * Storage key: `legalo.lang` → 'en' | 'ar' (default: 'en').
 *
 * On change we:
 *   1. Update `document.documentElement.lang`.
 *   2. Update `document.documentElement.dir` ('ltr' for en, 'rtl' for ar).
 *   3. Persist to localStorage so the choice outlives the session.
 *
 * The actual locale routing switch (changing the URL) is the caller's
 * responsibility — see the Navbar's language toggle for usage.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

import { messages, resolvePath, type SupportedLanguage } from './messages';

interface LanguageContextValue {
  /** Current ISO language code ('en' | 'ar'). */
  language: SupportedLanguage;
  /** Replace the active language. Persists to storage and updates <html>. */
  setLanguage: (next: SupportedLanguage) => void;
  /** Flip between EN ↔ AR. */
  toggle: () => void;
  /**
   * Lightweight translate helper. Supports dot-paths (e.g. 'hero.headline').
   * Returns the key itself if not found — never throws.
   */
  t: (key: string) => string;
  /** 'ltr' or 'rtl' derived from the current language. */
  dir: 'ltr' | 'rtl';
}

const LanguageContext = createContext<LanguageContextValue | null>(null);

const STORAGE_KEY = 'legalo.lang';
const DEFAULT_LANGUAGE: SupportedLanguage = 'en';

function isSupported(value: string | null): value is SupportedLanguage {
  return value === 'en' || value === 'ar';
}

function readStorageLanguage(): SupportedLanguage {
  if (typeof window === 'undefined') return DEFAULT_LANGUAGE;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  return isSupported(raw) ? raw : DEFAULT_LANGUAGE;
}

function applyLanguageToDocument(lang: SupportedLanguage): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('lang', lang);
  root.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
}

export function LanguageProvider({
  children,
  initialLanguage,
}: {
  children: React.ReactNode;
  /** Starting language — typically read from the current URL or cookie. */
  initialLanguage?: SupportedLanguage;
}) {
  const [language, setLanguageState] = useState<SupportedLanguage>(
    initialLanguage ?? DEFAULT_LANGUAGE,
  );

  // Hydrate from storage (or URL-derived prop) on mount.
  useEffect(() => {
    const stored = readStorageLanguage();
    const resolved = initialLanguage ?? stored;
    setLanguageState(resolved);
    applyLanguageToDocument(resolved);
  }, [initialLanguage]);

  // Re-apply document attrs whenever language changes.
  useEffect(() => {
    applyLanguageToDocument(language);
  }, [language]);

  const setLanguage = useCallback((next: SupportedLanguage) => {
    setLanguageState(next);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* Ignore — storage may be disabled */
      }
    }
  }, []);

  const toggle = useCallback(() => {
    setLanguage(language === 'ar' ? 'en' : 'ar');
  }, [language, setLanguage]);

  const t = useCallback(
    (key: string): string => resolvePath(messages[language] as never, key),
    [language],
  );

  const value = useMemo<LanguageContextValue>(
    () => ({
      language,
      setLanguage,
      toggle,
      t,
      dir: language === 'ar' ? 'rtl' : 'ltr',
    }),
    [language, setLanguage, toggle, t],
  );

  return (
    <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
  );
}

export function useLanguage(): LanguageContextValue {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error('useLanguage must be used inside a <LanguageProvider>');
  }
  return ctx;
}
