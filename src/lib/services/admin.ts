import { mockFirms } from '../mock-data/firms';
import { mockCases } from '../mock-data/cases';
import { mockUsers } from '../mock-data/users';

export interface AdminStats {
  totalFirms: number;
  activeCases: number;
  revenue: number;
  pendingApprovals: number;
}

/**
 * Aggregate platform statistics for admin console.
 */
export function getAdminStats(): AdminStats {
  const totalFirms = mockFirms.length;
  const activeCases = mockCases.filter(c => c.status === 'active' || c.status === 'matched' || c.status === 'open').length;
  // Mock revenue: completed + active cases × average fee
  const revenue = mockCases.length * 8500;
  const pendingApprovals = mockFirms.filter(f => f.status === 'pending').length;

  return {
    totalFirms,
    activeCases,
    revenue,
    pendingApprovals,
  };
}

/**
 * Mock recent activity feed.
 */
export function getRecentActivities(): Array<{ at: string; text: string; kind: string }> {
  return [
    { at: '2 min ago', text: 'New firm registered: Crescent Moon Law Firm', kind: 'firm' },
    { at: '14 min ago', text: 'Case LG-2024-0001 matched to Habtoor & Partners', kind: 'match' },
    { at: '32 min ago', text: 'Payment of ₳8,200 released to Falcon Legal', kind: 'payment' },
    { at: '1 h ago', text: 'Firm Al Shamsi Legal verified licence', kind: 'firm' },
    { at: '2 h ago', text: 'Client John Smith submitted case LG-2024-0011', kind: 'case' },
    { at: '3 h ago', text: 'Review approved for Marina Legal Solutions', kind: 'review' },
    { at: '4 h ago', text: 'Firm Arabian Shield Legal application pending review', kind: 'firm' },
    { at: '5 h ago', text: 'Case LG-2024-0009 marked urgent', kind: 'case' },
    { at: '6 h ago', text: 'Payout request approved for Gulf Horizon', kind: 'payment' },
    { at: '8 h ago', text: 'Admin Mustafa promoted user user-client-002', kind: 'admin' },
  ];
}

/**
 * Get firm cases (cases where the firm's user is the assigned lawyer).
 */
export function getFirmCases(firmUserId: string) {
  return mockCases.filter(c => c.lawyer_user_id === firmUserId);
}
