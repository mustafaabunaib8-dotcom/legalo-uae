import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button, Card, CardContent } from '@/components/ui';
import { Briefcase, Users, TrendingUp, Calendar, CheckCircle2 } from 'lucide-react';

export default async function ForProvidersPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations('forProviders');

  const benefits = [
    {
      icon: Briefcase,
      title: t('benefit1Title'),
      description: t('benefit1Description'),
    },
    {
      icon: Users,
      title: t('benefit2Title'),
      description: t('benefit2Description'),
    },
    {
      icon: TrendingUp,
      title: t('benefit3Title'),
      description: t('benefit3Description'),
    },
    {
      icon: Calendar,
      title: t('benefit4Title'),
      description: t('benefit4Description'),
    },
  ];

  return (
    <main className="flex min-h-screen flex-col bg-[var(--surface-bg)]">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 bg-gradient-to-br from-emerald-700 to-emerald-900 text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <CheckCircle2 className="mx-auto mb-6 h-16 w-16 text-emerald-300" />
          <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
            {t('heroTitle')}
          </h1>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-emerald-100 md:text-xl">
            {t('heroDescription')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/get-started">
              <Button
                variant="gold"
                size="lg"
                className="w-full sm:w-auto bg-white text-emerald-800 hover:bg-emerald-50"
              >
                {t('ctaButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="px-6 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              {t('benefitsTitle')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
              {t('benefitsSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {benefits.map((benefit, i) => (
              <Card key={i} className="p-6">
                <CardContent className="space-y-4">
                  <div className="inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-emerald-50 dark:bg-emerald-900/20">
                    <benefit.icon className="h-6 w-6 text-emerald-600 dark:text-emerald-300" />
                  </div>
                  <h3 className="text-xl font-semibold text-[var(--text-primary)]">
                    {benefit.title}
                  </h3>
                  <p className="text-[var(--text-secondary)]">{benefit.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="px-6 py-20 md:py-28 bg-[var(--surface-muted)]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              {t('howItWorksTitle')}
            </h2>
          </div>

          <div className="space-y-8">
            {[
              { step: '1', title: t('step1Title'), description: t('step1Description') },
              { step: '2', title: t('step2Title'), description: t('step2Description') },
              { step: '3', title: t('step3Title'), description: t('step3Description') },
              { step: '4', title: t('step4Title'), description: t('step4Description') },
            ].map((item, i) => (
              <div key={i} className="flex gap-6 items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-600 text-xl font-bold text-white shadow-lg">
                  {item.step}
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="mb-2 text-xl font-semibold text-[var(--text-primary)]">
                    {item.title}
                  </h3>
                  <p className="text-[var(--text-secondary)]">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="px-6 py-20 md:py-28">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
            {t('finalCtaTitle')}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--text-secondary)]">
            {t('finalCtaDescription')}
          </p>
          <Link href="/get-started">
            <Button variant="primary" size="lg">
              {t('finalCtaButton')}
            </Button>
          </Link>
        </div>
      </section>
    </main>
  );
}
