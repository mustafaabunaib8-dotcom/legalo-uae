import { unstable_setRequestLocale, getTranslations } from 'next-intl/server';
import Link from 'next/link';
import { Button, Card, CardContent, Badge, TrustCard, ElevatedCard } from '@/components/ui';
import { FirmCard } from '@/components/ui/firm-card';
import { ReviewCard } from '@/components/ui/review-card';
import { getTopFirms } from '@/lib/services/firms';
import { getVerifiedReviews } from '@/lib/services/reviews';
import { Zap, Shield, DollarSign, MessageSquare, Brain, Users, CheckCircle, Star } from 'lucide-react';

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  unstable_setRequestLocale(locale);
  const t = await getTranslations('home');

  // Fetch data at build time
  const topFirms = await getTopFirms(6);
  const featuredReviews = getVerifiedReviews().slice(0, 3);

  return (
    <main className="flex min-h-screen flex-col bg-[var(--surface-bg)]">
      {/* ==================== HERO ==================== */}
      <section className="relative px-6 py-20 md:py-32 lg:py-40">
        <div className="container mx-auto max-w-6xl text-center">
          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[var(--border-subtle)] bg-[var(--surface-card)] px-4 py-2 shadow-[var(--shadow-card)]">
            <CheckCircle className="h-4 w-4 text-[var(--emerald-500)]" />
            <span className="text-sm font-medium text-[var(--text-secondary)]">
              {t('heroBadge')}
            </span>
          </div>

          {/* Headline */}
          <h1 className="mb-6 font-[var(--font-display)] text-4xl font-light tracking-tight text-[var(--text-primary)] md:text-5xl lg:text-6xl" style={{ letterSpacing: 'var(--tracking-display)' }}>
            {t('headline')}
          </h1>

          {/* Subheadline */}
          <p className="mx-auto mb-10 max-w-2xl text-lg text-[var(--text-secondary)] md:text-xl">
            {t('subheadline')}
          </p>

          {/* CTAs */}
          <div className="mb-16 flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/find-lawyer">
              <Button variant="primary" size="lg" className="w-full sm:w-auto">
                {t('ctaPrimary')}
              </Button>
            </Link>
            <Link href="/providers">
              <Button variant="secondary" size="lg" className="w-full sm:w-auto">
                {t('ctaSecondary')}
              </Button>
            </Link>
          </div>

          {/* Trust Bar (below fold) */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { icon: Shield, label: t('trustVerifiedFirms') },
              { icon: Shield, label: t('trustEscrow') },
              { icon: Zap, label: t('trustInstantMatch') },
              { icon: MessageSquare, label: t('trustLanguages') },
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-2 text-center">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-muted)]">
                  <item.icon className="h-6 w-6 text-[var(--emerald-600)]" />
                </div>
                <span className="text-sm font-medium text-[var(--text-primary)]">
                  {item.label}
                </span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== VALUE PROPOSITIONS ==================== */}
      <section className="px-6 py-20 md:py-28 bg-[var(--surface-muted)]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              {t('valuePropsTitle')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
              {t('valuePropsSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                icon: Zap,
                title: t('vp1Title'),
                description: t('vp1Description'),
              },
              {
                icon: Shield,
                title: t('vp2Title'),
                description: t('vp2Description'),
              },
              {
                icon: DollarSign,
                title: t('vp3Title'),
                description: t('vp3Description'),
              },
            ].map((card, i) => (
              <TrustCard key={i} className="p-6">
                <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-[var(--radius-md)] bg-[var(--emerald-50)] dark:bg-[var(--emerald-900)]/20">
                  <card.icon className="h-6 w-6 text-[var(--emerald-600)] dark:text-[var(--emerald-300)]" />
                </div>
                <h3 className="mb-3 text-xl font-semibold text-[var(--text-primary)]">
                  {card.title}
                </h3>
                <p className="text-[var(--text-secondary)]">{card.description}</p>
              </TrustCard>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== HOW IT WORKS ==================== */}
      <section className="px-6 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              {t('howItWorksTitle')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
              {t('howItWorksSubtitle')}
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { step: 1, icon: MessageSquare, title: t('step1Title'), description: t('step1Description') },
              { step: 2, icon: Brain, title: t('step2Title'), description: t('step2Description') },
              { step: 3, icon: Users, title: t('step3Title'), description: t('step3Description'), glow: true },
              { step: 4, icon: CheckCircle, title: t('step4Title'), description: t('step4Description') },
            ].map((item, i) => (
              <div key={i} className="relative flex flex-col items-center text-center">
                {/* Step number */}
                <div
                  className={`relative z-10 mb-6 flex h-16 w-16 items-center justify-center rounded-full border-4 border-[var(--surface-bg)] text-lg font-bold text-white shadow-[var(--shadow-elevated)] ${
                    item.glow
                      ? 'bg-gradient-to-br from-[var(--emerald-400)] to-[var(--emerald-600)] animate-pulse'
                      : 'bg-[var(--emerald-500)]'
                  }`}
                >
                  {item.step}
                </div>

                {/* Connector line (hidden on mobile/last item) */}
                {i < 3 && (
                  <div className="absolute inset-x-1/2 top-8 hidden h-0.5 -translate-x-1/2 bg-[var(--border-strong)] lg:block" style={{ width: 'calc(100% - 4rem)' }} />
                )}

                {/* Icon */}
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[var(--surface-muted)]">
                  <item.icon className="h-6 w-6 text-[var(--emerald-600)]" />
                </div>

                <h3 className="mb-2 text-lg font-semibold text-[var(--text-primary)]">
                  {item.title}
                </h3>
                <p className="text-sm text-[var(--text-secondary)]">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FEATURED FIRMS ==================== */}
      <section className="px-6 py-20 md:py-28 bg-[var(--surface-muted)]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 flex flex-col items-center justify-between gap-4 md:flex-row">
            <div>
              <h2 className="mb-2 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
                {t('featuredFirmsTitle')}
              </h2>
              <p className="text-lg text-[var(--text-secondary)]">
                {t('featuredFirmsSubtitle')}
              </p>
            </div>
            <Link href="/directory">
              <Button variant="secondary" size="md">
                {t('viewAllFirms')}
              </Button>
            </Link>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {topFirms.map((firm) => (
              <FirmCard
                key={firm.id}
                name={firm.firm_name}
                logo={firm.logo_url}
                verified={true}
                emirate={firm.emirate}
                yearsExperience={firm.years_experience}
                rating={firm.rating_avg}
                reviewCount={firm.rating_count}
                specializations={firm.specializations.slice(0, 3)}
                responseTime={`Responds in ${firm.response_sla_hours}h`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== STATS ==================== */}
      <section className="px-6 py-20 md:py-28">
        <div className="container mx-auto max-w-6xl">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {[
              { value: '500+', label: t('statsFirms'), color: 'emerald' },
              { value: '10,000+', label: t('statsCases'), color: 'emerald' },
              { value: '4.8★', label: t('statsRating'), color: 'emerald' },
              { value: '₳50M+', label: t('statsEscrow'), color: 'emerald' },
            ].map((stat, i) => (
              <ElevatedCard key={i} className="p-8 text-center">
                <div className="mb-3 text-5xl font-bold text-[var(--emerald-600)] dark:text-[var(--emerald-400)]">
                  {stat.value}
                </div>
                <div className="text-sm font-medium text-[var(--text-secondary)]">
                  {stat.label}
                </div>
              </ElevatedCard>
            ))}
          </div>
        </div>
      </section>

      {/* ==================== TESTIMONIALS ==================== */}
      <section className="px-6 py-20 md:py-28 bg-[var(--surface-muted)]">
        <div className="container mx-auto max-w-6xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-3xl font-semibold tracking-tight text-[var(--text-primary)] md:text-4xl">
              {t('testimonialsTitle')}
            </h2>
            <p className="mx-auto max-w-2xl text-lg text-[var(--text-secondary)]">
              {t('testimonialsSubtitle')}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {featuredReviews.map((review) => (
              <ReviewCard
                key={review.id}
                rating={review.rating}
                testimonial={review.body}
                reviewerName={`Client ${review.reviewer_user_id.slice(-3)}`}
                caseType={review.title}
                date={review.created_at}
              />
            ))}
          </div>
        </div>
      </section>

      {/* ==================== FINAL CTA ==================== */}
      <section className="relative px-6 py-20 md:py-28 bg-gradient-to-br from-[var(--emerald-700)] to-[var(--emerald-900)] text-white">
        <div className="container mx-auto max-w-4xl text-center">
          <h2 className="mb-6 text-4xl font-semibold tracking-tight md:text-5xl">
            {t('ctaTitle')}
          </h2>
          <p className="mx-auto mb-10 max-w-2xl text-lg text-white/80">
            {t('ctaSubtitle')}
          </p>
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/signup">
              <Button
                variant="gold"
                size="lg"
                className="w-full sm:w-auto bg-white text-[var(--emerald-800)] hover:bg-[var(--surface-muted)]"
              >
                {t('ctaButton')}
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
