'use client';

/**
 * ThemeProvider — persist + apply the Legalo visual theme.
 *
 * Storage key: `legalo.theme` → 'light' | 'dark' | 'system' (default: 'system').
 *
 * Resolution rules:
 *   - 'light'       → apply `<html data-theme="light">`
 *   - 'dark'        → apply `<html data-theme="dark">`
 *   - 'system'      → match `prefers-color-scheme`, re-resolve on change.
 *
 * We set `data-theme` (not a `.dark` class) because the theme tokens in
 * `src/styles/globals.css` are keyed off `[data-theme="dark"]`. `suppressHydrationWarning`
 * on <html> in root layout prevents mismatch warnings between server
 * (no preference) and the first client render.
 */

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';

export type ThemePreference = 'light' | 'dark' | 'system';
export type ResolvedTheme = 'light' | 'dark';

interface ThemeContextValue {
  /** Stored preference — may be 'system' */
  preference: ThemePreference;
  /** Actually applied theme after system resolution */
  theme: ResolvedTheme;
  /** Replace the preference wholesale */
  setTheme: (next: ThemePreference) => void;
  /** Flip light ↔ dark, leaving 'system' alone if it's current */
  toggle: () => void;
}

const ThemeContext = createContext<ThemeContextValue | null>(null);

const STORAGE_KEY = 'legalo.theme';
const DEFAULT_PREFERENCE: ThemePreference = 'system';

function readStoragePreference(): ThemePreference {
  if (typeof window === 'undefined') return DEFAULT_PREFERENCE;
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (raw === 'light' || raw === 'dark' || raw === 'system') return raw;
  return DEFAULT_PREFERENCE;
}

function getSystemThemeValue(): ResolvedTheme {
  if (typeof window === 'undefined') return 'light';
  return window.matchMedia('(prefers-color-scheme: dark)').matches
    ? 'dark'
    : 'light';
}

function resolve(preference: ThemePreference): ResolvedTheme {
  return preference === 'system' ? getSystemThemeValue() : preference;
}

function applyTheme(resolved: ResolvedTheme): void {
  if (typeof document === 'undefined') return;
  const root = document.documentElement;
  root.setAttribute('data-theme', resolved);
  // Keep color-scheme in sync for native widgets (scrollbar, form controls)
  root.style.colorScheme = resolved;
}

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [preference, setPreference] = useState<ThemePreference>(DEFAULT_PREFERENCE);
  const [systemTheme, setSystemTheme] = useState<ResolvedTheme>('light');

  // Hydrate from storage once on mount.
  useEffect(() => {
    const stored = readStoragePreference();
    setPreference(stored);
    const sys = getSystemThemeValue();
    setSystemTheme(sys);
    // Apply immediately (prevents a flash on first render after hydration)
    applyTheme(resolve(stored));
  }, []);

  // Listen to OS theme changes when preference is 'system'.
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const mq = window.matchMedia('(prefers-color-scheme: dark)');
    const handler = (e: MediaQueryListEvent) => {
      const next = e.matches ? 'dark' : 'light';
      setSystemTheme(next);
      if (readStoragePreference() === 'system') applyTheme(next);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Whenever preference or system theme change, recompose and apply.
  useEffect(() => {
    applyTheme(resolve(preference));
  }, [preference, systemTheme]);

  const setTheme = useCallback((next: ThemePreference) => {
    setPreference(next);
    if (typeof window !== 'undefined') {
      try {
        window.localStorage.setItem(STORAGE_KEY, next);
      } catch {
        /* Ignore — storage may be disabled (private mode, etc.) */
      }
    }
  }, []);

  const toggle = useCallback(() => {
    setPreference((prev) => {
      // If currently following 'system', resolve it, then flip.
      const current = resolve(prev);
      const next: ThemePreference = current === 'dark' ? 'light' : 'dark';
      if (typeof window !== 'undefined') {
        try {
          window.localStorage.setItem(STORAGE_KEY, next);
        } catch {
          /* ignore */
        }
      }
      return next;
    });
  }, []);

  const theme = resolve(preference);

  const value = useMemo<ThemeContextValue>(
    () => ({
      preference,
      theme,
      setTheme,
      toggle,
    }),
    [preference, theme, setTheme, toggle],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}

export function useTheme(): ThemeContextValue {
  const ctx = useContext(ThemeContext);
  if (!ctx) {
    throw new Error('useTheme must be used inside a <ThemeProvider>');
  }
  return ctx;
}
