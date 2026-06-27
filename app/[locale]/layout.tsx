import { useMessages } from 'next-intl';
import { unstable_setRequestLocale } from 'next-intl/server';
import { Providers } from '../providers';
import Link from 'next/link';
import { Shield, Menu } from 'lucide-react';

interface LocaleLayoutProps {
  children: React.ReactNode;
  params: { locale: string };
}

export default function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = params;
  unstable_setRequestLocale(locale);
  const messages = useMessages();

  const otherLocale = locale === 'en' ? 'ar' : 'en';
  const navLinks =
    locale === 'en'
      ? {
          findLawyer: 'Find a Lawyer',
          getStarted: 'Get Started',
          wills: 'Wills & Inheritance',
          forProviders: 'For Providers',
          signIn: 'Sign In',
          cta: 'Get Started',
        }
      : {
          findLawyer: 'ابحث عن محامٍ',
          getStarted: 'ابدأ',
          wills: 'الوصايا والمواريث',
          forProviders: 'للمحامين',
          signIn: 'تسجيل الدخول',
          cta: 'ابدأ الآن',
        };

  return (
    <Providers locale={locale} messages={messages}>
      {/* ========= NAVBAR ========= */}
      <header className="sticky top-0 z-50 border-b border-neutral-200/60 bg-white/80 backdrop-blur-xl dark:bg-neutral-950/80 dark:border-neutral-800/60">
        <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between px-6">
          {/* Logo */}
          <Link href={`/${locale}`} className="flex items-center gap-2 font-bold">
            <div className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-700 shadow-sm">
              <Shield className="h-5 w-5 text-white" />
            </div>
            <span className="text-lg tracking-tight text-neutral-900 dark:text-white">
              Legalo
            </span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden items-center gap-1 md:flex">
            <Link
              href={`/${locale}/find-a-lawyer`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {navLinks.findLawyer}
            </Link>
            <Link
              href={`/${locale}/get-started`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {navLinks.getStarted}
            </Link>
            <Link
              href={`/${locale}/wills`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {navLinks.wills}
            </Link>
            <Link
              href={`/${locale}/for-providers`}
              className="rounded-lg px-3 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 hover:text-neutral-900 transition dark:text-neutral-400 dark:hover:bg-neutral-800 dark:hover:text-white"
            >
              {navLinks.forProviders}
            </Link>
          </nav>

          {/* Desktop CTAs */}
          <div className="hidden items-center gap-2 md:flex">
            <Link
              href={`/${otherLocale}`}
              className="rounded-lg px-2.5 py-2 text-sm font-medium text-neutral-600 hover:bg-neutral-100 transition dark:text-neutral-400 dark:hover:bg-neutral-800"
            >
              {otherLocale === 'ar' ? 'العربية' : 'EN'}
            </Link>
            <Link
              href={`/${locale}/signin`}
              className="px-3 py-2 text-sm font-semibold text-neutral-900 hover:text-emerald-700 transition dark:text-white dark:hover:text-emerald-400"
            >
              {navLinks.signIn}
            </Link>
            <Link
              href={`/${locale}/get-started`}
              className="inline-flex items-center justify-center rounded-xl bg-amber-400 px-4 py-2 text-sm font-semibold text-neutral-900 shadow-sm hover:bg-amber-500 transition"
            >
              {navLinks.cta}
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="inline-grid h-10 w-10 place-items-center rounded-lg hover:bg-neutral-100 md:hidden dark:hover:bg-neutral-800"
            aria-label="Toggle menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* ========= MAIN ========= */}
      <main>{children}</main>

      {/* ========= FOOTER ========= */}
      <footer className="border-t border-neutral-200/60 bg-neutral-50 dark:border-neutral-800/60 dark:bg-neutral-950">
        <div className="mx-auto max-w-7xl px-6 py-12">
          <div className="grid gap-8 md:grid-cols-4">
            <div>
              <Link href={`/${locale}`} className="flex items-center gap-2 font-bold">
                <div className="grid h-8 w-8 place-items-center rounded-lg bg-emerald-700">
                  <Shield className="h-4 w-4 text-white" />
                </div>
                <span className="text-base text-neutral-900 dark:text-white">Legalo</span>
              </Link>
              {locale === 'en' ? (
                <p className="mt-4 max-w-xs text-sm text-neutral-600">
                  The legal infrastructure of the UAE — verified providers, instant matching,
                  and escrow-protected engagements on a single trusted platform.
                </p>
              ) : (
                <p className="mt-4 max-w-xs text-sm text-neutral-400">
                  البنية التحتية القانونية في الإمارات — مقدمون موثقون، مطابقة فورية.
                </p>
              )}
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                {locale === 'en' ? 'Platform' : 'المنصة'}
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>
                  <Link
                    href={`/${locale}/find-a-lawyer`}
                    className="hover:text-neutral-900 dark:hover:text-white"
                  >
                    {locale === 'en' ? 'Find a lawyer' : 'ابحث عن محامٍ'}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/get-started`}
                    className="hover:text-neutral-900 dark:hover:text-white"
                  >
                    {locale === 'en' ? 'Get matched' : 'ابدأ'}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/wills`}
                    className="hover:text-neutral-900 dark:hover:text-white"
                  >
                    {locale === 'en' ? 'Wills & Inheritance' : 'الوصايا والمواريث'}
                  </Link>
                </li>
                <li>
                  <Link
                    href={`/${locale}/for-providers`}
                    className="hover:text-neutral-900 dark:hover:text-white"
                  >
                    {locale === 'en' ? 'For providers' : 'للمحامين'}
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-sm font-semibold text-neutral-900 dark:text-white">
                {locale === 'en' ? 'Contact' : 'تواصل'}
              </h4>
              <ul className="mt-4 space-y-2 text-sm text-neutral-600 dark:text-neutral-400">
                <li>{locale === 'en' ? 'Dubai, United Arab Emirates' : 'دبي، الإمارات'}</li>
                <li>hello@legalo.ae</li>
                <li>+971 4 212 3456</li>
              </ul>
            </div>

            <div className="md:col-span-1">
              <div className="space-y-2 text-xs text-neutral-500">
                <p>
                  {locale === 'en'
                    ? 'Legalo is a neutral marketplace, not a law firm, and does not provide legal advice.'
                    : 'ليجالو منصة محايدة وليست مكتب محاماة ولا تقدم استشارات قانونية.'}
                </p>
                <div className="flex gap-4 pt-2 text-xs text-neutral-500">
                  <span>© 2026 Legalo</span>
                  <Link href="/" className="hover:text-neutral-900">
                    {locale === 'en' ? 'Privacy' : 'الخصوصية'}
                  </Link>
                  <Link href="/" className="hover:text-neutral-900">
                    {locale === 'en' ? 'Terms' : 'الشروط'}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </Providers>
  );
}
