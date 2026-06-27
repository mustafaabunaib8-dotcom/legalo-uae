import type { LawFirm, FirmStatus, FirmTier, Emirate, LawyerReview } from '../../types';
import { mockFirms } from '../mock-data/firms';
import { mockReviews } from '../mock-data/reviews';

export interface FirmFilters {
  status?: FirmStatus;
  tier?: FirmTier;
  emirate?: Emirate;
  specialization?: string;
  language?: string;
  acceptingNewCases?: boolean;
  minRating?: number;
}

/**
 * Get all firms, optionally filtered.
 */
export async function getFirms(filters?: FirmFilters): Promise<LawFirm[]> {
  let results = [...mockFirms];

  if (filters) {
    if (filters.status) {
      results = results.filter(f => f.status === filters.status);
    }
    if (filters.tier) {
      results = results.filter(f => f.tier === filters.tier);
    }
    if (filters.emirate) {
      results = results.filter(f => f.emirate === filters.emirate);
    }
    if (filters.specialization) {
      results = results.filter(f => f.specializations.includes(filters.specialization!));
    }
    if (filters.language) {
      results = results.filter(f => f.languages.includes(filters.language as any));
    }
    if (filters.acceptingNewCases !== undefined) {
      results = results.filter(f => f.acceptingNewCases === filters.acceptingNewCases);
    }
    if (filters.minRating) {
      results = results.filter(f => f.rating_avg >= filters.minRating!);
    }
  }

  return results;
}

/**
 * Get a single firm by ID.
 */
export async function getFirm(id: string): Promise<LawFirm | null> {
  return mockFirms.find(f => f.id === id) || null;
}

/**
 * Search firms by name or specialization.
 */
export async function searchFirms(query: string): Promise<LawFirm[]> {
  const q = query.toLowerCase();
  return mockFirms.filter(f => {
    if (f.firm_name.toLowerCase().includes(q)) return true;
    if (f.firm_name_ar && f.firm_name_ar.includes(query)) return true;
    if (f.specializations.some(s => s.toLowerCase().includes(q))) return true;
    if (f.emirate.toLowerCase().includes(q)) return true;
    if (f.languages.some(l => l.toLowerCase().includes(q))) return true;
    return false;
  });
}

/**
 * Get top-rated firms.
 */
export async function getTopFirms(limit: number = 10): Promise<LawFirm[]> {
  return [...mockFirms]
    .filter(f => f.status === 'approved' && f.rating_count > 0)
    .sort((a, b) => b.rating_avg - a.rating_avg)
    .slice(0, limit);
}

/**
 * Get all reviews for a specific firm.
 */
export async function getFirmReviews(firmId: string): Promise<LawyerReview[]> {
  return mockReviews
    .filter(r => r.firm_id === firmId && r.is_verified)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

/**
 * Update firm settings (simulated).
 */
export async function updateFirmSettings(
  id: string,
  data: Partial<LawFirm>
): Promise<LawFirm | null> {
  const firm = mockFirms.find(f => f.id === id);
  if (!firm) return null;
  Object.assign(firm, data);
  return firm;
}
