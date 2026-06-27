'use client';

/**
 * Navbar — glass-morphic, sticky, fully bilingual, accessible.
 *
 * Layout (LTR):
 *   LEFT   → Logo mark + "Legalo" wordmark (navigates home)
 *   CENTER → Nav links (desktop) — collapse to hamburger on mobile
 *   RIGHT  → Language toggle · Theme toggle · Sign in · Get Started CTA
 *
 * Layout (RTL):
 *   All logical properties (`ps-`, `pe-`, `ms-`, `me-`, `start`, `end`)
 *   automatically mirror. The JSX tree is *not* reversed — CSS handles it.
 *
 * Behavior:
 *   - Sticky top-0 with shadow only after scroll (via `data-scrolled` attr)
 *   - Focus trap not needed; mobile drawer uses a simple `hidden` toggle
 *   - Respects `prefers-reduced-motion` for all transitions
 */

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import { useLanguage } from '@/lib/i18n/LanguageProvider';
import type { SupportedLanguage } from '@/lib/i18n/messages';
import { useTheme } from '@/lib/theme/ThemeProvider';

interface NavItem {
  key: string;          // translation key under `nav.*`
  href: string;         // relative to current locale
}

const DESKTOP_NAV: NavItem[] = [
  { key: 'findLawyer',     href: '/find-a-lawyer' },
  { key: 'services',       href: '/services' },
  { key: 'business',       href: '/business' },
  { key: 'pricing',        href: '/pricing' },
  { key: 'legalResources', href: '/resources' },
];

export function Navbar() {
  const t = useTranslations();
  const { language, setLanguage, dir } = useLanguage();
  const { theme, toggle: toggleTheme, preference } = useTheme();
  const router = useRouter();
  const pathname = usePathname();
  const params = useParams<{ locale: string }>();
  const currentLocale = (params?.locale as SupportedLanguage) ?? 'en';

  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Track scroll position to elevate navbar after a small offset.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile drawer on route change.
  useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  // Close on Escape.
  useEffect(() => {
    if (!mobileOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [mobileOpen]);

  const switchLanguage = (next: SupportedLanguage) => {
    if (next === currentLocale) return;
    setLanguage(next);
    // Swap the locale segment in the URL; keep the trailing path the same.
    const rest = pathname.replace(/^\/(en|ar)/, '');
    router.push(`/${next}${rest || '/'}`);
  };

  const themeLabel =
    preference === 'system'
      ? t('common.system')
      : preference === 'dark'
        ? t('common.dark')
        : t('common.light');

  const nextLang: SupportedLanguage = language === 'ar' ? 'en' : 'ar';
  const nextLangLabel = nextLang === 'ar' ? 'العربية' : 'EN';

  return (
    <header
      className={[
        'sticky top-0 z-40 w-full',
        'transition-shadow duration-base ease-out-expo',
        scrolled ? 'shadow-nav' : '',
      ].join(' ')}
      data-scrolled={scrolled || undefined}
    >
      <div
        className={[
          'glass',
          'mx-auto w-full max-w-[1280px]',
          'flex items-center justify-between',
          'ps-safe pe-safe',
          'block h-16 py-3',
        ].join(' ')}
      >
        {/* ---- Logo ---------------------------------------------------- */}
        <Link
          href={`/${currentLocale}`}
          className="flex items-center gap-2 interactive"
          aria-label={t('common.brand')}
        >
          <LogoMark />
          <span className="text-lg font-semibold tracking-tight text-text-primary">
            {t('common.brand')}
          </span>
        </Link>

        {/* ---- Desktop nav --------------------------------------------- */}
        <nav
          aria-label={t('common.menu')}
          className="-translate-x-1/2 absolute start-1/2 top-1/2 hidden -translate-y-1/2 items-center gap-1 lg:flex"
        >
          {DESKTOP_NAV.map((item) => (
            <Link
              key={item.key}
              href={`/${currentLocale}${item.href}`}
              className={[
                'interactive inline-flex items-center rounded-md px-3 py-2 text-sm font-medium',
                'text-text-secondary hover:text-text-primary hover:bg-surface-muted',
              ].join(' ')}
            >
              {t(`nav.${item.key}` as 'nav.findLawyer')}
            </Link>
          ))}
        </nav>

        {/* ---- Right-hand actions -------------------------------------- */}
        <div className="flex items-center gap-1">
          {/* Language toggle */}
          <button
            type="button"
            onClick={() => switchLanguage(nextLang)}
            className="interactive hidden rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary sm:inline-flex"
            aria-label={`${t('common.language')}: ${nextLangLabel}`}
          >
            {nextLangLabel}
          </button>

          {/* Theme toggle */}
          <button
            type="button"
            onClick={toggleTheme}
            className="interactive inline-flex h-9 w-9 items-center justify-center rounded-md text-text-secondary hover:bg-surface-muted hover:text-text-primary"
            aria-label={`${t('common.theme')}: ${themeLabel}`}
          >
            <ThemeIcon theme={theme} />
          </button>

          {/* Sign in */}
          <Link
            href={`/${currentLocale}/sign-in`}
            className="interactive hidden rounded-md px-3 py-2 text-sm font-medium text-text-primary hover:bg-surface-muted sm:inline-flex"
          >
            {t('common.signIn')}
          </Link>

          {/* Get Started CTA */}
          <Link
            href={`/${currentLocale}/get-started`}
            className="btn-primary interactive ms-1 hidden text-sm font-medium sm:inline-flex"
          >
            {t('common.getStarted')}
          </Link>

          {/* Mobile hamburger ----------------------------------------- */}
          <button
            type="button"
            onClick={() => setMobileOpen((v) => !v)}
            className="interactive inline-flex h-10 w-10 items-center justify-center rounded-md text-text-primary hover:bg-surface-muted lg:hidden"
            aria-label={mobileOpen ? t('common.closeMenu') : t('common.openMenu')}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
          >
            {mobileOpen ? <CloseIcon /> : <MenuIcon />}
          </button>
        </div>
      </div>

      {/* ---- Mobile drawer ------------------------------------------------ */}
      {mobileOpen && (
        <div
          id="mobile-nav"
          role="dialog"
          aria-modal="true"
          // Logical block-start / inline-fullsheet — renders correctly in both LTR and RTL.
          className="absolute inset-x-0 top-full z-30 border-block-start border-border-subtle bg-surface-bg shadow-nav"
        >
          <nav className="mx-auto flex max-w-[1280px] flex-col gap-1 px-4 py-4 sm:px-6">
            {DESKTOP_NAV.map((item) => (
              <Link
                key={item.key}
                href={`/${currentLocale}${item.href}`}
                className="rounded-md px-3 py-3 text-base font-medium text-text-primary hover:bg-surface-muted"
              >
                {t(`nav.${item.key}` as 'nav.findLawyer')}
              </Link>
            ))}
            <div className="mt-2 flex items-center justify-between gap-3 border-t border-border-subtle pt-4">
              <button
                type="button"
                onClick={() => switchLanguage(nextLang)}
                className="interactive rounded-md px-3 py-2 text-sm font-medium text-text-secondary hover:bg-surface-muted hover:text-text-primary"
              >
                {nextLangLabel === 'EN' ? 'العربية' : 'EN'}
              </button>
              <Link
                href={`/${currentLocale}/sign-in`}
                className="rounded-md px-3 py-2 text-sm font-medium text-text-primary"
              >
                {t('common.signIn')}
              </Link>
              <Link
                href={`/${currentLocale}/get-started`}
                className="btn-primary"
              >
                {t('common.getStarted')}
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}

/* -------------------------------------------------------------------------- */
/* Presentation helpers                                                        */
/* -------------------------------------------------------------------------- */

function LogoMark() {
  // A stylised emerald mark — geometric column (scales motif) in a rounded square.
  return (
    <svg
      width="28"
      height="28"
      viewBox="0 0 28 28"
      fill="none"
      aria-hidden="true"
      className="shrink-0"
    >
      <defs>
        <linearGradient id="legalo-mark" x1="0" y1="0" x2="28" y2="28" gradientUnits="userSpaceOnUse">
          <stop offset="0" stopColor="#0D8A75" />
          <stop offset="1" stopColor="#065E4F" />
        </linearGradient>
      </defs>
      <rect width="28" height="28" rx="7" fill="url(#legalo-mark)" />
      <path
        d="M8 9h12v1.4H8zM13.5 10.4V20M10 13h7v1.6H10zM9 20h10"
        stroke="#fff"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ThemeIcon({ theme }: { theme: 'light' | 'dark' }) {
  if (theme === 'dark') {
    return (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
        <path
          d="M21 12.8A9 9 0 0 1 11.2 3a7 7 0 1 0 9.8 9.8Z"
          stroke="currentColor"
          strokeWidth="1.8"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    );
  }
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <circle cx="12" cy="12" r="4" stroke="currentColor" strokeWidth="1.8" />
      <path
        d="M12 2v2M12 20v2M4.93 4.93l1.41 1.41M17.66 17.66l1.41 1.41M2 12h2M20 12h2M4.93 19.07l1.41-1.41M17.66 6.34l1.41-1.41"
        stroke="currentColor"
        strokeWidth="1.8"
        strokeLinecap="round"
      />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M4 7h16M4 12h16M4 17h16" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
}
