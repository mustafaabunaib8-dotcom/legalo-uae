'use client';

/**
 * Footer — dark, 4-column, with trust line + regulatory disclosure.
 *
 * Layout (all logical, bidi-safe):
 *   ┌────────────────────────────────────┐
 *   │ Product · Company · Legal · Connect│   ← 4 cols on lg, 2 on sm, 1 on xs
 *   │                                    │
 *   │ Trust signal (emerald)             │
 *   │ Regulatory disclosure (muted)      │
 *   │ ─────────────────────────────────  │
 *   │ Copyright    ·    social icons     │
 *   └────────────────────────────────────┘
 *
 * Uses `bg-ink-900` (the brand's deepest tone) — NOT pure black — to preserve
 * the warm-emerald undertone. Text is sand-100 on this surface.
 */

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import type { SupportedLanguage } from '@/lib/i18n/messages';

interface FooterColumn {
  titleKey: string;       // dotted, under `footer.*`
  items: { key: string; href: string; external?: boolean }[];
}

const COLUMNS: FooterColumn[] = [
  {
    titleKey: 'product',
    items: [
      { key: 'findLawyer', href: '/find-a-lawyer' },
      { key: 'services',   href: '/services' },
      { key: 'forBusiness',href: '/business' },
      { key: 'pricing',    href: '/pricing' },
      { key: 'download',   href: '/app',         external: false },
    ],
  },
  {
    titleKey: 'company',
    items: [
      { key: 'about',      href: '/about' },
      { key: 'careers',    href: '/careers' },
      { key: 'press',      href: '/press' },
      { key: 'partners',   href: '/partners' },
    ],
  },
  {
    titleKey: 'legal',
    items: [
      { key: 'terms',      href: '/terms' },
      { key: 'privacy',    href: '/privacy' },
      { key: 'cookies',    href: '/cookies' },
      { key: 'complaints', href: '/complaints' },
    ],
  },
  {
    titleKey: 'connect',
    items: [
      { key: 'support',   href: 'mailto:support@legalo.ae' },
      { key: 'contact',   href: '/contact' },
      { key: 'twitter',   href: 'https://x.com/legalo',  external: true },
      { key: 'linkedin',  href: 'https://linkedin.com/company/legalo', external: true },
      { key: 'instagram', href: 'https://instagram.com/legalo',        external: true },
    ],
  },
];

const YEAR = new Date().getFullYear();

export function Footer() {
  const t = useTranslations();
  const params = useParams<{ locale: string }>();
  const currentLocale = (params?.locale as SupportedLanguage) ?? 'en';

  return (
    <footer
      // Deep warm-ink background — never `#000`
      className="mt-auto border-block-start border-white/5 bg-ink-900 text-sand-100"
      aria-labelledby="footer-heading"
    >
      <h2 id="footer-heading" className="sr-only">
        {t('footer.legal')}
      </h2>

      <div className="mx-auto grid max-w-[1280px] grid-cols-1 gap-10 px-4 py-16 sm:grid-cols-2 sm:px-6 lg:grid-cols-4">
        {COLUMNS.map((col) => (
          <section key={col.titleKey} aria-label={t(`footer.${col.titleKey}` as 'footer.product')}>
            <h3 className="text-sm font-semibold uppercase tracking-wider text-sand-300">
              {t(`footer.${col.titleKey}` as 'footer.product')}
            </h3>
            <ul className="mt-4 space-y-3">
              {col.items.map((item) => {
                const label = t(`footer.productItems.${item.key}` as 'footer.productItems.findLawyer')
                  // The translation key is under a category specific to each column —
                  // the `footer.{column}Items.{key}` shape mirrors the messages files.
                  // Fall back to the column-scoped key if the generic lookup misses.
                  || t(resolveColumnItemKey(col.titleKey, item.key));
                const href = item.href.startsWith('http')
                  ? item.href
                  : `/${currentLocale}${item.href}`;
                const external = item.external ?? item.href.startsWith('http');

                return (
                  <li key={item.key}>
                    <FooterLink href={href} external={external}>
                      {label}
                    </FooterLink>
                  </li>
                );
              })}
            </ul>
          </section>
        ))}
      </div>

      {/* ---- Trust + regulatory ------------------------------------------- */}
      <div className="border-block-start border-white/5 bg-ink-800/40">
        <div className="mx-auto flex max-w-[1280px] flex-col gap-4 px-4 py-8 sm:px-6 md:flex-row md:items-start md:justify-between">
          {/* Trust signal */}
          <p className="flex items-center gap-2 text-sm font-medium text-emerald-300">
            <ShieldIcon />
            {t('common.trustLine')}
          </p>
          {/* Regulatory disclosure — mandatory on UAE-facing legal platforms */}
          <p className="max-w-2xl text-xs leading-relaxed text-sand-400">
            {t('footer.regulatory')}
          </p>
        </div>
      </div>

      {/* ---- Bottom bar --------------------------------------------------- */}
      <div className="border-block-start border-white/5">
        <div className="mx-auto flex max-w-[1280px] flex-col items-start justify-between gap-4 px-4 py-6 sm:flex-row sm:items-center sm:px-6">
          <p className="text-xs text-sand-500">
            {t('common.copyright').replace('{year}', String(YEAR))}
          </p>
          <div className="flex items-center gap-3">
            <SocialLink href="https://x.com/legalo" label="X (Twitter)">
              <XIcon />
            </SocialLink>
            <SocialLink href="https://linkedin.com/company/legalo" label="LinkedIn">
              <LinkedInIcon />
            </SocialLink>
            <SocialLink href="https://instagram.com/legalo" label="Instagram">
              <InstagramIcon />
            </SocialLink>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* -------------------------------------------------------------------------- */
/* Helpers                                                                     */
/* -------------------------------------------------------------------------- */

function FooterLink({
  href,
  external,
  children,
}: {
  href: string;
  external?: boolean;
  children: React.ReactNode;
}) {
  const common =
    'text-sm text-sand-300 transition-colors duration-fast hover:text-sand-100';
  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={common}
      >
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={common}>
      {children}
    </Link>
  );
}

function SocialLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
      className="interactive inline-flex h-8 w-8 items-center justify-center rounded-md text-sand-400 hover:bg-white/5 hover:text-sand-100"
    >
      {children}
    </a>
  );
}

/** Map a column title → its `footer.{category}Items.{key}` translation key. */
function resolveColumnItemKey(columnTitleKey: string, itemKey: string): string {
  const categoryMap: Record<string, string> = {
    product: 'productItems',
    company: 'companyItems',
    legal:   'legalItems',
    connect: 'connectItems',
  };
  const category = categoryMap[columnTitleKey];
  return category ? `footer.${category}.${itemKey}` : `footer.${columnTitleKey}`;
}

/* -------------------------------------------------------------------------- */
/* Icons                                                                       */
/* -------------------------------------------------------------------------- */

function ShieldIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M12 3l8 3v6c0 5-3.5 8.5-8 9-4.5-.5-8-4-8-9V6l8-3Z"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <path d="m9 12 2 2 4-4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
function XIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M18.244 2H21.5l-7.5 8.57L22.5 22H15.8l-5.2-6.81L4.7 22H1.44l8.04-9.19L1.5 2h6.87l4.7 6.22L18.24 2Zm-1.14 18h1.82L7.02 4H5.07l12.03 16Z" />
    </svg>
  );
}
function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M4.98 3.5a2.5 2.5 0 1 1 0 5 2.5 2.5 0 0 1 0-5ZM3 9h4v12H3V9Zm7 0h3.8v1.7h.05c.53-1 1.84-2.05 3.79-2.05 4.06 0 4.81 2.67 4.81 6.14V21h-4v-5.4c0-1.28-.02-2.94-1.79-2.94-1.79 0-2.07 1.4-2.07 2.85V21h-4V9Z" />
    </svg>
  );
}
function InstagramIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}
