'use client';

/**
 * Client-only providers bundle.
 *
 * Receives pre-loaded messages from the server locale layout, so client
 * components can consume translations via `useTranslations()` safely.
 */

import { NextIntlClientProvider } from 'next-intl';
import { ThemeProvider } from '@/lib/theme/ThemeProvider';
import { LanguageProvider } from '@/lib/i18n/LanguageProvider';
import type { SupportedLanguage } from '@/lib/i18n/messages';

interface ProvidersProps {
  children: React.ReactNode;
  locale: string;
  messages: Record<string, any>;
}

export function Providers({ children, locale, messages }: ProvidersProps) {
  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <ThemeProvider>
        <LanguageProvider initialLanguage={locale as SupportedLanguage}>
          {children}
        </LanguageProvider>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
