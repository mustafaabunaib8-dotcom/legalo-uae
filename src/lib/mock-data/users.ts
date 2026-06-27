import type { UserProfile } from '../../types';

export const mockUsers: UserProfile[] = [
  // Admin user
  {
    id: 'user-admin-001',
    display_name: 'Mustafa Hassan',
    email: 'mustafa@legalo.ae',
    preferred_language: 'en',
    created_at: '2024-09-01T08:00:00Z',
    role: 'admin'
  },
  // Client users
  {
    id: 'user-client-001',
    display_name: 'John Smith',
    email: 'john.smith@example.com',
    preferred_language: 'en',
    created_at: '2024-10-01T10:00:00Z',
    role: 'client'
  },
  {
    id: 'user-client-002',
    display_name: 'Sarah Al Maktoum',
    email: 'sarah.almaktoum@example.com',
    preferred_language: 'en',
    created_at: '2024-10-05T14:30:00Z',
    role: 'client'
  },
  {
    id: 'user-client-003',
    display_name: 'Ahmed Al Naqbi',
    email: 'ahmed.naqbi@example.com',
    preferred_language: 'ar',
    created_at: '2024-10-10T09:15:00Z',
    role: 'client'
  },
  {
    id: 'user-client-004',
    display_name: 'Rajesh Kumar',
    email: 'rajesh.kumar@example.com',
    preferred_language: 'hi',
    created_at: '2024-10-15T11:45:00Z',
    role: 'client'
  },
  {
    id: 'user-client-005',
    display_name: 'Lisa Chen',
    email: 'lisa.chen@example.com',
    preferred_language: 'en',
    created_at: '2024-10-20T16:20:00Z',
    role: 'client'
  },
  // Law firm users (mapped to firms)
  {
    id: 'user-firm-001',
    display_name: 'Abdullah Al Mansoori',
    email: 'abdullah@almansoori.ae',
    preferred_language: 'en',
    created_at: '2024-09-15T08:00:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-002',
    display_name: 'Ahmed Al Ketbi',
    email: 'ahmed@habtoorpartners.ae',
    preferred_language: 'en',
    created_at: '2024-09-20T10:30:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-003',
    display_name: 'Fatima Al Neyadi',
    email: 'fatima@alowaislaw.ae',
    preferred_language: 'ar',
    created_at: '2024-09-25T14:00:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-004',
    display_name: 'Khalid Ibrahim',
    email: 'khalid@emirateshield.ae',
    preferred_language: 'en',
    created_at: '2024-10-01T09:00:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-005',
    display_name: 'Vikram Sharma',
    email: 'vikram@gulfhorizon.ae',
    preferred_language: 'en',
    created_at: '2024-10-05T11:15:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-006',
    display_name: 'Layla Hassan',
    email: 'layla@desertrose.ae',
    preferred_language: 'ar',
    created_at: '2024-10-10T13:45:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-007',
    display_name: 'Mohammed Al Falasi',
    email: 'mohammed@falconlegal.ae',
    preferred_language: 'en',
    created_at: '2024-10-15T08:30:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-008',
    display_name: 'Hassan Al Zaabi',
    email: 'hassan@oasislaw.ae',
    preferred_language: 'ar',
    created_at: '2024-10-20T10:00:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-009',
    display_name: 'Omar Al Suwaidi',
    email: 'omar@pearlcoast.ae',
    preferred_language: 'ar',
    created_at: '2024-10-25T15:20:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-010',
    display_name: 'Wei Zhang',
    email: 'wei@skylinelaw.ae',
    preferred_language: 'en',
    created_at: '2024-10-30T12:00:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-011',
    display_name: 'Omar Al Shamsi',
    email: 'omar@alshamsilegal.ae',
    preferred_language: 'ar',
    created_at: '2024-11-01T09:30:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-012',
    display_name: 'Noor Al Balushi',
    email: 'noor@palmtree.ae',
    preferred_language: 'ar',
    created_at: '2024-11-05T14:15:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-013',
    display_name: 'Khalid Al Mazroui',
    email: 'khalid@heritagelaw.ae',
    preferred_language: 'ar',
    created_at: '2024-11-10T11:00:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-014',
    display_name: 'Elena Petrova',
    email: 'elena@marinalegal.ae',
    preferred_language: 'en',
    created_at: '2024-11-15T13:30:00Z',
    role: 'law_firm'
  },
  {
    id: 'user-firm-015',
    display_name: 'Suresh Patel',
    email: 'suresh@goldensands.ae',
    preferred_language: 'en',
    created_at: '2024-11-20T10:45:00Z',
    role: 'law_firm'
  }
];

// Map firm users to their firms
export const userToFirmMap: Record<string, string> = {
  'user-firm-001': 'firm-001',
  'user-firm-002': 'firm-002',
  'user-firm-003': 'firm-003',
  'user-firm-004': 'firm-004',
  'user-firm-005': 'firm-005',
  'user-firm-006': 'firm-006',
  'user-firm-007': 'firm-007',
  'user-firm-008': 'firm-008',
  'user-firm-009': 'firm-009',
  'user-firm-010': 'firm-010',
  'user-firm-011': 'firm-011',
  'user-firm-012': 'firm-012',
  'user-firm-013': 'firm-013',
  'user-firm-014': 'firm-014',
  'user-firm-015': 'firm-015'
};
