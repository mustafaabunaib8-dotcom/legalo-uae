import type { Metadata, Viewport } from 'next';
import { Inter_Tight, IBM_Plex_Sans_Arabic } from 'next/font/google';
import '@/styles/globals.css';
import { getMessages } from 'next-intl/server';
import { Providers } from './providers';

/* -------------------------------------------------------------------------- */
/* Fonts                                                                       */
/* -------------------------------------------------------------------------- */
const interTight = Inter_Tight({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-inter-tight',
  display: 'swap',
});

const ibmPlexArabic = IBM_Plex_Sans_Arabic({
  subsets: ['arabic'],
  weight: ['300', '400', '500', '600'],
  variable: '--font-ibm-plex-arabic',
  display: 'swap',
});

/* -------------------------------------------------------------------------- */
/* Viewport + metadata                                                         */
/* -------------------------------------------------------------------------- */
export const viewport: Viewport = {
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#FCFAF8' },
    { media: '(prefers-color-scheme: dark)', color: '#080F0E' },
  ],
  width: 'device-width',
  initialScale: 1,
};

export const metadata: Metadata = {
  title: {
    default: 'Legalo — The trusted UAE legal marketplace',
    template: '%s · Legalo',
  },
  description:
    'Book regulated lawyers, review fixed-fee services, and get your legal matter moving — in Arabic or English. Trusted by 2,400+ verified UAE lawyers.',
  applicationName: 'Legalo',
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Legalo',
  },
  category: 'legal',
};

/* -------------------------------------------------------------------------- */
/* Root layout                                                                 */
/* -------------------------------------------------------------------------- */
export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      dir="ltr"
      suppressHydrationWarning
      className={`${interTight.variable} ${ibmPlexArabic.variable}`}
    >
      <body suppressHydrationWarning>
        {/* ClientProviders is populated by the /[locale] layout below */}
        <ClientShell>{children}</ClientShell>
      </body>
    </html>
  );
}

/* -------------------------------------------------------------------------- */
/* Deferred client wrapper (root layout stays a server component)              */
/* -------------------------------------------------------------------------- */
async function ClientShell({ children }: { children: React.ReactNode }) {
  // The /:locale layout fills in locale + messages before this renders.
  // We render children directly here without intl context; the locale layout
  // wraps locale-aware content with <Providers locale messages={...}>.
  return <>{children}</>;
}
