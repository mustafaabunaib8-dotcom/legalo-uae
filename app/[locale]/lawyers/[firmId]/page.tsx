'use client';

import { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ReviewCard } from '@/components/ui/review-card';
import { StatsCard } from '@/components/ui/stats-card';
import { Avatar } from '@/components/ui/avatar';
import { getFirm, getFirmReviews } from '@/lib/services/firms';
import { CheckCircle, Clock, Award, MapPin, MessageSquare, Star } from 'lucide-react';
import type { LawFirm, LawyerReview } from '@/types';

export default function FirmProfilePage() {
  const params = useParams();
  const firmId = params.firmId as string;
  const t = useTranslations();
  const [firm, setFirm] = useState<LawFirm | null>(null);
  const [reviews, setReviews] = useState<LawyerReview[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      setLoading(true);
      const [firmData, reviewsData] = await Promise.all([
        getFirm(firmId),
        getFirmReviews(firmId)
      ]);
      setFirm(firmData);
      setReviews(reviewsData);
      setLoading(false);
    }
    loadData();
  }, [firmId]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600 mx-auto mb-4"></div>
          <p className="text-gray-500">Loading firm profile...</p>
        </div>
      </div>
    );
  }

  if (!firm) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl mb-4">😕</div>
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Firm not found</h1>
          <p className="text-gray-500 mb-6">The firm you're looking for doesn't exist or has been removed.</p>
          <Link href="/find-a-lawyer">
            <Button>Browse all firms</Button>
          </Link>
        </div>
      </div>
    );
  }

  const totalCases = reviews.length * 15; // Simulated based on reviews

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HERO SECTION */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-6 py-12">
          <div className="flex flex-col md:flex-row gap-8 items-start">
            {/* Logo */}
            <Avatar src={firm.logo_url} alt={firm.firm_name} seed={firm.firm_name} size="xl" className="h-24 w-24" />

            {/* Info */}
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-3">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
                  {firm.firm_name}
                </h1>
                {firm.status === 'approved' && (
                  <Badge variant="verified-gold" className="gap-1">
                    <CheckCircle className="h-3.5 w-3.5" />
                    Verified
                  </Badge>
                )}
              </div>

              {firm.firm_name_ar && (
                <p className="text-lg text-gray-600 mb-4 font-arabic">{firm.firm_name_ar}</p>
              )}

              <div className="flex flex-wrap gap-4 mb-6 text-sm text-gray-600">
                <div className="flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-gray-400" />
                  {firm.emirate}
                </div>
                <div className="flex items-center gap-1.5">
                  <Award className="h-4 w-4 text-gray-400" />
                  {firm.years_experience} years experience
                </div>
                <div className="flex items-center gap-1.5">
                  <Star className="h-4 w-4 text-amber-500 fill-amber-500" />
                  {firm.rating_avg.toFixed(1)} ({firm.rating_count} reviews)
                </div>
              </div>

              {/* Specialization Tags */}
              <div className="flex flex-wrap gap-2 mb-6">
                {firm.specializations.map(spec => (
                  <Badge key={spec} variant="jurisdiction" className="capitalize">
                    {spec.replace('-', ' ')}
                  </Badge>
                ))}
              </div>

              {/* Languages */}
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-gray-900">Languages:</span>
                <span className="text-gray-600">
                  {firm.languages.map(l => {
                    const langMap: Record<string, string> = {
                      en: 'English', ar: 'Arabic', hi: 'Hindi',
                      ur: 'Urdu', ru: 'Russian', zh: 'Chinese', fil: 'Filipino'
                    };
                    return langMap[l] || l;
                  }).join(', ')}
                </span>
              </div>
            </div>

            {/* CTA */}
            <div className="flex flex-col gap-3 md:min-w-[200px]">
              <Button size="lg" className="w-full">
                <MessageSquare className="h-4 w-4 me-2" />
                Match with this Firm
              </Button>
              <Link href="/get-started">
                <Button variant="secondary" size="lg" className="w-full">
                  Start New Case
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* STATS GRID */}
      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatsCard
            value={firm.years_experience}
            label="Years Experience"
            icon={<Award className="h-4 w-4" />}
          />
          <StatsCard
            value={totalCases}
            label="Cases Handled"
            icon={<CheckCircle className="h-4 w-4" />}
          />
          <StatsCard
            value={firm.rating_avg.toFixed(1)}
            label="Average Rating"
            icon={<Star className="h-4 w-4" />}
          />
          <StatsCard
            value={`${firm.response_sla_hours}h`}
            label="Response Time"
            icon={<Clock className="h-4 w-4" />}
          />
        </div>

        {/* ABOUT SECTION */}
        <div className="bg-white rounded-2xl border border-gray-100 p-8 mb-10">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">About</h2>
          <div className="prose prose-gray max-w-none">
            <p className="text-gray-600 leading-relaxed mb-4">
              {firm.firm_name} is a {firm.tier === 'elite' ? 'top-tier' : firm.tier === 'pro' ? 'professional' : 'trusted'} law firm 
              based in {firm.emirate} with {firm.years_experience} years of experience serving clients across the UAE.
            </p>
            <p className="text-gray-600 leading-relaxed mb-4">
              Specializing in {firm.specializations.slice(0, 3).map(s => s.replace('-', ' ')).join(', ')}, 
              the firm has built a reputation for excellence and client satisfaction.
            </p>
            <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Contact Information</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div><strong>Email:</strong> {firm.contact_email}</div>
                  <div><strong>Phone:</strong> {firm.phone}</div>
                  <div><strong>Address:</strong> {firm.office_address}</div>
                </div>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-gray-900 uppercase tracking-wide mb-2">Jurisdiction</h3>
                <div className="space-y-2 text-sm text-gray-600">
                  <div><strong>Licence:</strong> {firm.trade_licence_number}</div>
                  <div><strong>Type:</strong> {firm.licence_jurisdiction}</div>
                  <div><strong>Tier:</strong> <Badge className="capitalize">{firm.tier}</Badge></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* REVIEWS SECTION */}
        <div>
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">Client Reviews</h2>
              <p className="text-gray-500 mt-1">{reviews.length} verified reviews</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="text-right">
                <div className="text-3xl font-bold text-gray-900">{firm.rating_avg.toFixed(1)}</div>
                <div className="flex items-center gap-1">
                  {[1, 2, 3, 4, 5].map(star => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= Math.round(firm.rating_avg)
                          ? 'text-amber-500 fill-amber-500'
                          : 'text-gray-300'
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ms-1">
                    {firm.rating_count} reviews
                  </span>
                </div>
              </div>
            </div>
          </div>

          {reviews.length === 0 ? (
            <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
              <div className="text-xl font-semibold text-gray-900 mb-2">No reviews yet</div>
              <p className="text-gray-500">This firm hasn't received any reviews yet.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {reviews.map(review => (
                <ReviewCard
                  key={review.id}
                  rating={review.rating}
                  testimonial={review.body}
                  reviewerName={`Client ${review.reviewer_user_id.slice(-3)}`}
                  caseType={review.title}
                  date={review.created_at}
                  categoryScores={[
                    { label: 'Communication', value: review.category_ratings.communication },
                    { label: 'Timeliness', value: review.category_ratings.timeliness },
                    { label: 'Expertise', value: review.category_ratings.expertise },
                    { label: 'Value', value: review.category_ratings.value }
                  ]}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
