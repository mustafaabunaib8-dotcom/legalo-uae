'use client';

import { useState, useMemo } from 'react';
import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { FirmCard } from '@/components/ui/firm-card';
import { Search, Filter, X } from 'lucide-react';
import { getTopFirms } from '@/lib/services/firms';
import type { LawFirm } from '@/types';

const EMIRATES = ['Dubai', 'Abu Dhabi', 'Sharjah', 'Ajman', 'Ras Al Khaimah', 'Fujairah', 'Umm Al Quwain', 'DIFC', 'ADGM'];
const LANGUAGES = ['English', 'Arabic', 'Hindi', 'Urdu', 'Russian', 'Chinese', 'Filipino'];
const SPECIALIZATIONS = [
  'corporate', 'business-setup', 'contracts', 'banking',
  'property', 'construction', 'disputes', 'insurance',
  'family', 'wills', 'inheritance', 'criminal',
  'employment-hr', 'employment-issues', 'injury',
  'ip', 'white-collar', 'harassment',
  'notary', 'attestation', 'translation'
];

export default function FindLawyerPage() {
  const t = useTranslations();
  const [allFirms, setAllFirms] = useState<LawFirm[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedEmirate, setSelectedEmirate] = useState<string>('');
  const [selectedLanguage, setSelectedLanguage] = useState<string>('');
  const [selectedSpecialization, setSelectedSpecialization] = useState<string>('');
  const [minRating, setMinRating] = useState<number>(0);
  const [showFilters, setShowFilters] = useState(false);

  // Load firms on client side
  useMemo(() => {
    getTopFirms(100).then(firms => setAllFirms(firms));
  }, []);

  const filteredFirms = allFirms.filter(firm => {
    // Search filter
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      const matchesSearch =
        firm.firm_name.toLowerCase().includes(query) ||
        firm.specializations.some(s => s.toLowerCase().includes(query)) ||
        firm.emirate.toLowerCase().includes(query);
      if (!matchesSearch) return false;
    }

    // Emirate filter
    if (selectedEmirate && firm.emirate !== selectedEmirate) return false;

    // Language filter
    if (selectedLanguage) {
      const langMap: Record<string, string> = {
        'English': 'en',
        'Arabic': 'ar',
        'Hindi': 'hi',
        'Urdu': 'ur',
        'Russian': 'ru',
        'Chinese': 'zh',
        'Filipino': 'fil'
      };
      const langCode = langMap[selectedLanguage];
      if (!firm.languages.includes(langCode as any)) return false;
    }

    // Specialization filter
    if (selectedSpecialization && !firm.specializations.includes(selectedSpecialization)) return false;

    // Rating filter
    if (minRating && firm.rating_avg < minRating) return false;

    return true;
  });

  const clearFilters = () => {
    setSearchQuery('');
    setSelectedEmirate('');
    setSelectedLanguage('');
    setSelectedSpecialization('');
    setMinRating(0);
  };

  const hasActiveFilters = searchQuery || selectedEmirate || selectedLanguage || selectedSpecialization || minRating > 0;

  const handleViewProfile = (firmName: string) => {
    const firm = allFirms.find(f => f.firm_name === firmName);
    if (firm) {
      window.location.href = `/lawyers/${firm.id}`;
    }
  };

  const handleRequestMatch = () => {
    window.location.href = '/get-started';
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER */}
      <div className="bg-white border-b border-gray-100 sticky top-0 z-20">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight mb-2">
            Find a Lawyer
          </h1>
          <p className="text-gray-500 text-lg">
            Browse verified law firms across the UAE
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* SEARCH BAR */}
        <div className="mb-6">
          <div className="relative">
            <Search className="absolute start-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <Input
              placeholder="Search by firm name, specialization, or emirate..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="ps-12 h-12 text-base rounded-xl"
            />
          </div>
        </div>

        {/* FILTER TOGGLE */}
        <div className="mb-6 flex items-center gap-3">
          <Button
            variant="secondary"
            onClick={() => setShowFilters(!showFilters)}
            className="gap-2"
          >
            <Filter className="h-4 w-4" />
            {showFilters ? 'Hide Filters' : 'Show Filters'}
          </Button>

          {hasActiveFilters && (
            <Button variant="secondary" onClick={clearFilters} className="gap-2 text-gray-600">
              <X className="h-4 w-4" />
              Clear all
            </Button>
          )}

          {hasActiveFilters && (
            <div className="text-sm text-gray-500">
              {filteredFirms.length} {filteredFirms.length === 1 ? 'firm' : 'firms'} found
            </div>
          )}
        </div>

        {/* FILTERS */}
        {showFilters && (
          <div className="bg-white rounded-2xl border border-gray-100 p-6 mb-8 space-y-6">
            {/* Emirate */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-3 block">Emirate</label>
              <div className="flex flex-wrap gap-2">
                {EMIRATES.map(emirate => (
                  <button
                    key={emirate}
                    onClick={() => setSelectedEmirate(selectedEmirate === emirate ? '' : emirate)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedEmirate === emirate
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {emirate}
                  </button>
                ))}
              </div>
            </div>

            {/* Specialization */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-3 block">Specialization</label>
              <div className="flex flex-wrap gap-2">
                {SPECIALIZATIONS.map(spec => (
                  <button
                    key={spec}
                    onClick={() => setSelectedSpecialization(selectedSpecialization === spec ? '' : spec)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all ${
                      selectedSpecialization === spec
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {spec.replace('-', ' ')}
                  </button>
                ))}
              </div>
            </div>

            {/* Language */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-3 block">Language</label>
              <div className="flex flex-wrap gap-2">
                {LANGUAGES.map(lang => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(selectedLanguage === lang ? '' : lang)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      selectedLanguage === lang
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Min Rating */}
            <div>
              <label className="text-sm font-semibold text-gray-900 mb-3 block">
                Minimum Rating: {minRating > 0 ? `${minRating}★` : 'Any'}
              </label>
              <div className="flex gap-2">
                {[0, 4.0, 4.5, 4.8].map(rating => (
                  <button
                    key={rating}
                    onClick={() => setMinRating(rating)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                      minRating === rating
                        ? 'bg-emerald-500 text-white'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                    }`}
                  >
                    {rating === 0 ? 'Any' : `${rating}★+`}
                  </button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* RESULTS GRID */}
        {filteredFirms.length === 0 ? (
          <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
            <div className="text-xl font-semibold text-gray-900 mb-2">No firms found</div>
            <p className="text-gray-500 mb-6">Try adjusting your filters or search terms</p>
            <Button onClick={clearFilters}>Clear filters</Button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredFirms.map(firm => (
              <FirmCard
                key={firm.id}
                name={firm.firm_name}
                logo={firm.logo_url}
                verified={firm.status === 'approved'}
                emirate={firm.emirate}
                yearsExperience={firm.years_experience}
                rating={firm.rating_avg}
                reviewCount={firm.rating_count}
                specializations={firm.specializations.slice(0, 3)}
                responseTime={`Responds in ${firm.response_sla_hours}h`}
                onViewProfile={() => handleViewProfile(firm.firm_name)}
                onRequestMatch={handleRequestMatch}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
