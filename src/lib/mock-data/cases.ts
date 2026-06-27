import type { Case } from '../../types';

export const mockCases: Case[] = [
  {
    id: 'case-001',
    case_number: 'LG-2024-0001',
    user_id: 'user-client-001',
    service_type: 'property',
    description: 'Tenant dispute with landlord over security deposit return and property damage claims',
    status: 'active',
    jurisdiction: 'onshore',
    emirate: 'Dubai',
    payment_method: 'escrow',
    lawyer_user_id: 'user-firm-002',
    lawyer_name: 'Ahmed Al Ketbi',
    lawyer_firm: 'Habtoor & Partners',
    user_language: 'en',
    created_at: '2024-11-15T10:30:00Z',
    ai_analysis: {
      situation_summary: 'Tenant seeking return of AED 15,000 security deposit. Landlord claiming property damage exceeding deposit amount.',
      service_category: 'property',
      jurisdiction: 'Dubai',
      urgency: 'medium',
      mandatory_requirements: [
        'Review tenancy contract terms',
        'Photographic evidence of property condition',
        'Communication records with landlord'
      ],
      optional_requirements: [
        'Independent property inspection report',
        'Previous maintenance requests'
      ],
      recommended_steps: [
        'Gather all documentation',
        'Send formal demand letter',
        'File RDC case if no resolution within 14 days'
      ],
      timeline: {
        best: '2-3 weeks',
        expected: '4-6 weeks',
        worst: '8-10 weeks'
      },
      cost_range: {
        gov_fees: { min: 500, max: 500, currency: 'AED' },
        service_provider: { min: 2000, max: 3500, currency: 'AED' },
        accelerator: { min: 500, max: 1000, currency: 'AED' }
      },
      risk_complexity: {
        level: 'medium',
        reasoning: 'Standard tenancy dispute but documentation quality will be critical'
      },
      recommended_action: 'Engage property dispute specialist in Dubai'
    }
  },
  {
    id: 'case-002',
    case_number: 'LG-2024-0002',
    user_id: 'user-client-002',
    service_type: 'business-setup',
    description: 'Setting up a technology consulting company in DIFC with foreign ownership',
    status: 'matched',
    jurisdiction: 'DIFC',
    emirate: 'DIFC',
    payment_method: 'credit_card',
    user_language: 'en',
    created_at: '2024-11-20T14:15:00Z'
  },
  {
    id: 'case-003',
    case_number: 'LG-2024-0003',
    user_id: 'user-client-003',
    service_type: 'family',
    description: 'Child custody dispute following divorce. Seeking primary custody and visitation schedule.',
    status: 'active',
    jurisdiction: 'onshore',
    emirate: 'Abu Dhabi',
    payment_method: 'bank_transfer',
    lawyer_user_id: 'user-firm-003',
    lawyer_name: 'Fatima Al Neyadi',
    lawyer_firm: 'Rashid Al Owais Law Firm',
    user_language: 'ar',
    created_at: '2024-11-10T09:00:00Z'
  },
  {
    id: 'case-004',
    case_number: 'LG-2024-0004',
    user_id: 'user-client-004',
    service_type: 'employment-issues',
    description: 'Unfair termination after 5 years with company. Seeking end of service benefits and compensation.',
    status: 'completed',
    jurisdiction: 'onshore',
    emirate: 'Dubai',
    payment_method: 'escrow',
    lawyer_user_id: 'user-firm-005',
    lawyer_name: 'Vikram Sharma',
    lawyer_firm: 'Gulf Horizon Advocates',
    user_language: 'hi',
    created_at: '2024-10-05T11:20:00Z'
  },
  {
    id: 'case-005',
    case_number: 'LG-2024-0005',
    user_id: 'user-client-005',
    service_type: 'ip',
    description: 'Trademark registration for new software product across GCC markets',
    status: 'open',
    jurisdiction: 'onshore',
    emirate: 'Dubai',
    payment_method: 'credit_card',
    user_language: 'en',
    created_at: '2024-11-25T16:45:00Z'
  },
  {
    id: 'case-006',
    case_number: 'LG-2024-0006',
    user_id: 'user-client-001',
    service_type: 'wills',
    description: 'Drafting a DIFC will for non-Muslim expatriate with assets in multiple emirates',
    status: 'quoted',
    jurisdiction: 'DIFC',
    emirate: 'DIFC',
    payment_method: 'credit_card',
    user_language: 'en',
    created_at: '2024-11-22T13:30:00Z'
  },
  {
    id: 'case-007',
    case_number: 'LG-2024-0007',
    user_id: 'user-client-002',
    service_type: 'criminal',
    description: 'Defense against fraud allegations related to business transaction',
    status: 'active',
    jurisdiction: 'onshore',
    emirate: 'Dubai',
    payment_method: 'escrow',
    lawyer_user_id: 'user-firm-007',
    lawyer_name: 'Mohammed Al Falasi',
    lawyer_firm: 'Falcon Legal Group',
    user_language: 'en',
    created_at: '2024-11-18T08:00:00Z'
  },
  {
    id: 'case-008',
    case_number: 'LG-2024-0008',
    user_id: 'user-client-003',
    service_type: 'contracts',
    description: 'Review and negotiation of commercial lease agreement for office space',
    status: 'completed',
    jurisdiction: 'onshore',
    emirate: 'Abu Dhabi',
    payment_method: 'bank_transfer',
    lawyer_user_id: 'user-firm-013',
    lawyer_name: 'Khalid Al Mazroui',
    lawyer_firm: 'Heritage Law Associates',
    user_language: 'ar',
    created_at: '2024-10-15T10:00:00Z'
  },
  {
    id: 'case-009',
    case_number: 'LG-2024-0009',
    user_id: 'user-client-004',
    service_type: 'injury',
    description: 'Workplace injury compensation claim after construction site accident',
    status: 'active',
    jurisdiction: 'onshore',
    emirate: 'Sharjah',
    payment_method: 'escrow',
    lawyer_user_id: 'user-firm-011',
    lawyer_name: 'Omar Al Shamsi',
    lawyer_firm: 'Al Shamsi Legal Consultancy',
    user_language: 'hi',
    created_at: '2024-11-12T15:20:00Z',
    ai_analysis: {
      situation_summary: 'Construction worker injured on site. Employer failed to provide safety equipment. Seeking medical expenses and lost wages.',
      service_category: 'injury',
      jurisdiction: 'Sharjah',
      urgency: 'high',
      mandatory_requirements: [
        'Medical reports and bills',
        'Employment contract',
        'Incident report',
        'Witness statements'
      ],
      optional_requirements: [
        'Site safety inspection records',
        'Previous safety violations',
        'CCTV footage'
      ],
      recommended_steps: [
        'Document all medical treatment',
        'File labor complaint',
        'Preserve evidence',
        'Calculate total damages'
      ],
      timeline: {
        best: '2-3 months',
        expected: '4-6 months',
        worst: '8-12 months'
      },
      cost_range: {
        gov_fees: { min: 1000, max: 2000, currency: 'AED' },
        service_provider: { min: 3000, max: 5000, currency: 'AED' },
        accelerator: { min: 1000, max: 2000, currency: 'AED' }
      },
      risk_complexity: {
        level: 'high',
        reasoning: 'Serious injury with potential for significant compensation but employer liability must be proven'
      },
      recommended_action: 'Engage injury compensation specialist immediately'
    }
  },
  {
    id: 'case-010',
    case_number: 'LG-2024-0010',
    user_id: 'user-client-005',
    service_type: 'banking',
    description: 'Dispute with bank over frozen accounts and suspicious transaction flags',
    status: 'matched',
    jurisdiction: 'onshore',
    emirate: 'Dubai',
    payment_method: 'credit_card',
    user_language: 'en',
    created_at: '2024-11-24T11:00:00Z'
  },
  {
    id: 'case-011',
    case_number: 'LG-2024-0011',
    user_id: 'user-client-001',
    service_type: 'corporate',
    description: 'Shareholder agreement drafting for startup with 3 co-founders',
    status: 'open',
    jurisdiction: 'ADGM',
    emirate: 'ADGM',
    payment_method: 'credit_card',
    user_language: 'en',
    created_at: '2024-11-26T09:30:00Z'
  },
  {
    id: 'case-012',
    case_number: 'LG-2024-0012',
    user_id: 'user-client-003',
    service_type: 'notary',
    description: 'Power of attorney attestation for property sale abroad',
    status: 'completed',
    jurisdiction: 'onshore',
    emirate: 'Dubai',
    payment_method: 'credit_card',
    lawyer_user_id: 'user-firm-008',
    lawyer_name: 'Hassan Al Zaabi',
    lawyer_firm: 'Oasis Law Firm',
    user_language: 'ar',
    created_at: '2024-10-28T14:45:00Z'
  },
  {
    id: 'case-013',
    case_number: 'LG-2024-0013',
    user_id: 'user-client-002',
    service_type: 'disputes',
    description: 'Debt recovery of AED 500,000 from defaulting business partner',
    status: 'matched',
    jurisdiction: 'onshore',
    emirate: 'Dubai',
    payment_method: 'escrow',
    user_language: 'en',
    created_at: '2024-11-23T10:15:00Z'
  },
  {
    id: 'case-014',
    case_number: 'LG-2024-0014',
    user_id: 'user-client-004',
    service_type: 'translation',
    description: 'Legal document translation from Arabic to Hindi for court proceedings',
    status: 'completed',
    jurisdiction: 'onshore',
    emirate: 'Sharjah',
    payment_method: 'credit_card',
    lawyer_user_id: 'user-firm-006',
    lawyer_name: 'Layla Hassan',
    lawyer_firm: 'Desert Rose Legal Consultants',
    user_language: 'hi',
    created_at: '2024-10-20T13:00:00Z'
  },
  {
    id: 'case-015',
    case_number: 'LG-2024-0015',
    user_id: 'user-client-005',
    service_type: 'insurance',
    description: 'Claim denial dispute with health insurance provider over pre-existing condition',
    status: 'open',
    jurisdiction: 'onshore',
    emirate: 'Abu Dhabi',
    payment_method: 'credit_card',
    user_language: 'en',
    created_at: '2024-11-27T15:30:00Z'
  }
];
