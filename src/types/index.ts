// Union types for enums
export type Language = 'en' | 'ar' | 'ru' | 'hi' | 'fil' | 'zh';
export type Emirate = 'Dubai' | 'Abu Dhabi' | 'Sharjah' | 'Ras Al Khaimah' | 'Ajman' | 'Fujairah' | 'Umm Al Quwain' | 'DIFC' | 'ADGM';
export type FirmJurisdiction = 'onshore' | 'DIFC' | 'ADGM';
export type FirmStatus = 'pending' | 'approved' | 'rejected' | 'suspended';
export type FirmTier = 'free' | 'pro' | 'elite';
export type CaseStatus = 'open' | 'matched' | 'quoted' | 'active' | 'completed' | 'cancelled';
export type MessageSenderRole = 'client' | 'lawyer' | 'system' | 'admin';
export type QuoteStatus = 'draft' | 'sent' | 'accepted' | 'rejected';
export type EscrowStatus = 'held' | 'released' | 'refunded';
export type PaymentMethod = 'credit_card' | 'bank_transfer' | 'crypto' | 'escrow';
export type UserRole = 'client' | 'law_firm' | 'admin';

// Main interfaces
export interface UserProfile {
  id: string;
  display_name: string;
  email: string;
  preferred_language: Language;
  created_at: string;
  role: UserRole;
}

export interface LawFirm {
  id: string;
  firm_name: string;
  firm_name_ar?: string;
  contact_email: string;
  phone: string;
  trade_licence_number: string;
  licence_jurisdiction: FirmJurisdiction;
  office_address: string;
  emirate: Emirate;
  years_experience: number;
  specializations: string[];
  languages: Language[];
  logo_url: string;
  response_sla_hours: number;
  status: FirmStatus;
  accepting_new_cases: boolean;
  tier: FirmTier;
  rating_avg: number;
  rating_count: number;
}

export interface AIAnalysis {
  situation_summary: string;
  service_category: string;
  jurisdiction: Emirate;
  urgency: 'low' | 'medium' | 'high' | 'critical';
  mandatory_requirements: string[];
  optional_requirements: string[];
  recommended_steps: string[];
  timeline: {
    best: string;
    expected: string;
    worst: string;
  };
  cost_range: {
    gov_fees: { min: number; max: number; currency: string };
    service_provider: { min: number; max: number; currency: string };
    accelerator: { min: number; max: number; currency: string };
  };
  risk_complexity: {
    level: 'low' | 'medium' | 'high';
    reasoning: string;
  };
  recommended_action: string;
}

export interface Case {
  id: string;
  case_number: string;
  user_id: string;
  service_type: string;
  description: string;
  status: CaseStatus;
  jurisdiction: FirmJurisdiction;
  emirate: Emirate;
  payment_method: PaymentMethod;
  lawyer_user_id?: string;
  lawyer_name?: string;
  lawyer_firm?: string;
  user_language: Language;
  created_at: string;
  ai_analysis?: AIAnalysis;
}

export interface CaseMatch {
  case_id: string;
  firm_id: string;
  firm_user_id: string;
  status: 'pending' | 'accepted' | 'rejected';
  match_score: number;
}

export interface CaseMessage {
  id: string;
  case_id: string;
  sender_id: string;
  sender_name: string;
  sender_role: MessageSenderRole;
  content: string;
  created_at: string;
  attachments?: Array<{
    name: string;
    url: string;
    type: string;
    size: number;
  }>;
  is_milestone?: boolean;
}

export interface CaseQuote {
  id: string;
  case_id: string;
  firm_id: string;
  title: string;
  scope: string;
  fixed_fee: number;
  currency: string;
  estimated_timeline_weeks: number;
  valid_until: string;
  status: QuoteStatus;
}

export interface EscrowPayment {
  case_id: string;
  amount: number;
  currency: string;
  status: EscrowStatus;
  stripe_payment_intent_id: string;
  platform_fee: number;
}

export interface CategoryRatings {
  communication: number;
  timeliness: number;
  expertise: number;
  value: number;
}

export interface LawyerReview {
  id: string;
  case_id: string;
  reviewer_user_id: string;
  firm_id: string;
  rating: number;
  category_ratings: CategoryRatings;
  title: string;
  body: string;
  created_at: string;
  is_verified: boolean;
}

export interface Notification {
  id: string;
  user_id: string;
  type: string;
  title: string;
  body: string;
  case_id?: string;
  is_read: boolean;
  created_at: string;
}

// Service catalog types
export interface Service {
  id: string;
  name_en: string;
  name_ar: string;
  icon: string;
}

export interface ServiceCatalog {
  personal: Service[];
  business: Service[];
}

// Emirates data types
export interface EmirateInfo {
  id: Emirate;
  name_en: string;
  name_ar: string;
  abbreviation: string;
  flag?: string;
}
