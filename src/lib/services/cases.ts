import type { Case, CaseMatch, CaseMessage } from '../../types';
import { mockCases } from '../mock-data/cases';
import { mockMessages } from '../mock-data/messages';
import { mockFirms } from '../mock-data/firms';
import { userToFirmMap } from '../mock-data/users';

/**
 * Get all cases for a specific user.
 */
export async function getUserCases(userId: string): Promise<Case[]> {
  return mockCases
    .filter(c => c.user_id === userId)
    .sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime());
}

/**
 * Get a single case by ID with associated data.
 */
export async function getCase(id: string): Promise<{
  case: Case;
  messages: CaseMessage[];
  matches: CaseMatch[];
} | null> {
  const c = mockCases.find(x => x.id === id);
  if (!c) return null;

  const messages = getCaseMessages(id);
  const matches = await runMatchFirms(id);

  return {
    case: c,
    messages,
    matches
  };
}

/**
 * Create a new case (simulated).
 */
export async function createCase(data: Partial<Case> & {
  user_id: string;
  service_type: string;
  description: string;
  emirate: string;
}): Promise<Case> {
  const id = `case-${String(mockCases.length + 1).padStart(3, '0')}`;
  const newCase: Case = {
    id,
    case_number: `LG-2024-${String(mockCases.length + 1).padStart(4, '0')}`,
    user_id: data.user_id,
    service_type: data.service_type,
    description: data.description,
    status: 'open',
    jurisdiction: data.jurisdiction || 'onshore',
    emirate: data.emirate as any,
    payment_method: data.payment_method || 'credit_card',
    user_language: data.user_language || 'en',
    created_at: new Date().toISOString(),
    ai_analysis: data.ai_analysis
  };

  mockCases.push(newCase);

  // Add system message
  const sysMsg: CaseMessage = {
    id: `msg-${newCase.id.split('-')[1]}-01`,
    case_id: newCase.id,
    sender_id: 'system',
    sender_name: 'Legalo System',
    sender_role: 'system',
    content: 'Case opened. Matching with firms...',
    created_at: new Date().toISOString(),
    is_milestone: true
  };
  mockMessages.push(sysMsg);

  return newCase;
}

/**
 * Match firms to a case using the specified scoring formula.
 *
 * MATCHING ALGORITHM (exact):
 * score = (emirate === case.emirate ? 30 : 0)
 *       + clamp(50 - response_sla_hours, 0, 50)
 *       + min(years_experience * 2, 40)
 *
 * Returns top 3 firms by score.
 */
export async function runMatchFirms(caseId: string): Promise<CaseMatch[]> {
  const c = mockCases.find(x => x.id === caseId);
  if (!c) return [];

  // Eligible firms only: approved, accepting new cases
  const eligible = mockFirms.filter(
    f => f.status === 'approved' && f.accepting_new_cases
  );

  const scored = eligible.map(firm => {
    const emirateMatch = firm.emirate === c.emirate ? 30 : 0;
    const slaScore = Math.max(0, Math.min(50, 50 - firm.response_sla_hours));
    const experienceScore = Math.min(firm.years_experience * 2, 40);
    const total = emirateMatch + slaScore + experienceScore;
    const firmUserId = Object.keys(userToFirmMap).find(
      uid => userToFirmMap[uid] === firm.id
    ) || `user-firm-${firm.id.split('-')[1]}`;

    return {
      case_id: caseId,
      firm_id: firm.id,
      firm_user_id: firmUserId,
      status: 'pending' as const,
      match_score: Math.round(total * 10) / 10
    };
  });

  // Sort by score descending, take top 3
  scored.sort((a, b) => b.match_score - a.match_score);
  return scored.slice(0, 3);
}

/**
 * Get all messages for a case, sorted chronologically.
 */
export async function getCaseMessages(caseId: string): Promise<CaseMessage[]> {
  return [...mockMessages]
    .filter(m => m.case_id === caseId)
    .sort((a, b) => new Date(a.created_at).getTime() - new Date(b.created_at).getTime());
}

/**
 * Send a new message in a case.
 */
export async function sendMessage(
  caseId: string,
  message: Omit<CaseMessage, 'id' | 'case_id' | 'created_at'>
): Promise<CaseMessage> {
  const newMessage: CaseMessage = {
    ...message,
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    case_id: caseId,
    created_at: new Date().toISOString()
  };

  mockMessages.push(newMessage);
  return newMessage;
}
