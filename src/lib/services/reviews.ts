import { Review } from '@/types';
import { mockReviews } from '@/lib/mock-data/reviews';

// Get all reviews
export function getReviews(): Review[] {
  return [...mockReviews];
}

// Get review by ID
export function getReviewById(id: string): Review | undefined {
  return mockReviews.find(r => r.id === id);
}

// Get reviews by case ID
export function getReviewsByCaseId(caseId: string): Review[] {
  return mockReviews.filter(r => r.case_id === caseId);
}

// Get reviews by firm ID
export function getReviewsByFirmId(firmId: string): Review[] {
  return mockReviews.filter(r => r.firm_id === firmId);
}

// Get reviews by user ID (reviewer)
export function getReviewsByReviewerId(reviewerId: string): Review[] {
  return mockReviews.filter(r => r.reviewer_id === reviewerId);
}

// Get verified reviews only
export function getVerifiedReviews(): Review[] {
  return mockReviews.filter(r => r.verified);
}

// Get average rating by firm ID
export function getAverageRatingByFirmId(firmId: string): { avg: number; count: number } {
  const reviews = mockReviews.filter(r => r.firm_id === firmId);
  if (reviews.length === 0) return { avg: 0, count: 0 };
  
  const avg = reviews.reduce((sum, r) => sum + r.rating, 0) / reviews.length;
  return { avg: Math.round(avg * 10) / 10, count: reviews.length };
}

// Create new review
export function createReview(reviewData: Omit<Review, 'id' | 'created_at'>): Review {
  const newReview: Review = {
    ...reviewData,
    id: `review_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
  };
  mockReviews.push(newReview);
  return newReview;
}

// Update review
export function updateReview(id: string, updates: Partial<Review>): Review | undefined {
  const reviewIndex = mockReviews.findIndex(r => r.id === id);
  if (reviewIndex === -1) return undefined;
  
  mockReviews[reviewIndex] = {
    ...mockReviews[reviewIndex],
    ...updates,
  };
  
  return mockReviews[reviewIndex];
}

// Verify review (admin action)
export function verifyReview(id: string): Review | undefined {
  const reviewIndex = mockReviews.findIndex(r => r.id === id);
  if (reviewIndex === -1) return undefined;
  
  mockReviews[reviewIndex].verified = true;
  
  return mockReviews[reviewIndex];
}

// Get recent reviews (sorted by date)
export function getRecentReviews(limit: number = 10): Review[] {
  return [...mockReviews]
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime())
    .slice(0, limit);
}

// Get reviews by rating
export function getReviewsByRating(rating: number): Review[] {
  return mockReviews.filter(r => r.rating === rating);
}

// Get rating distribution for a firm
export function getRatingDistribution(firmId: string): Record<number, number> {
  const reviews = mockReviews.filter(r => r.firm_id === firmId);
  const distribution: Record<number, number> = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  
  reviews.forEach(r => {
    if (r.rating >= 1 && r.rating <= 5) {
      distribution[r.rating]++;
    }
  });
  
  return distribution;
}

export default {
  getReviews,
  getReviewById,
  getReviewsByCaseId,
  getReviewsByFirmId,
  getReviewsByReviewerId,
  getVerifiedReviews,
  getAverageRatingByFirmId,
  createReview,
  updateReview,
  verifyReview,
  getRecentReviews,
  getReviewsByRating,
  getRatingDistribution,
};
