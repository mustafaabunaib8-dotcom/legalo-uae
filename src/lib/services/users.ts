import { UserProfile, UserRole } from '@/types';
import { mockUsers } from '@/lib/mock-data/users';

// Get all users
export function getUsers(): UserProfile[] {
  return [...mockUsers];
}

// Get user by ID
export function getUserById(id: string): UserProfile | undefined {
  return mockUsers.find(u => u.id === id);
}

// Get user by email
export function getUserByEmail(email: string): UserProfile | undefined {
  return mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
}

// Get users by role
export function getUsersByRole(role: UserRole): UserProfile[] {
  return mockUsers.filter(u => u.role === role);
}

// Get admin users
export function getAdminUsers(): UserProfile[] {
  return mockUsers.filter(u => u.role === 'admin');
}

// Get client users
export function getClientUsers(): UserProfile[] {
  return mockUsers.filter(u => u.role === 'client');
}

// Get law firm users
export function getLawFirmUsers(): UserProfile[] {
  return mockUsers.filter(u => u.role === 'law_firm');
}

// Create new user
export function createUser(userData: Omit<UserProfile, 'id' | 'created_at' | 'updated_at'>): UserProfile {
  const newUser: UserProfile = {
    ...userData,
    id: `user_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };
  mockUsers.push(newUser);
  return newUser;
}

// Update user
export function updateUser(id: string, updates: Partial<UserProfile>): UserProfile | undefined {
  const userIndex = mockUsers.findIndex(u => u.id === id);
  if (userIndex === -1) return undefined;
  
  mockUsers[userIndex] = {
    ...mockUsers[userIndex],
    ...updates,
    updated_at: new Date().toISOString(),
  };
  
  return mockUsers[userIndex];
}

// Update user role
export function updateUserRole(id: string, role: UserRole): UserProfile | undefined {
  return updateUser(id, { role });
}

// Update preferred language
export function updatePreferredLanguage(id: string, language: UserProfile['preferred_language']): UserProfile | undefined {
  return updateUser(id, { preferred_language: language });
}

// Get user count by role
export function getUserCountByRole(): Record<UserRole, number> {
  return {
    client: mockUsers.filter(u => u.role === 'client').length,
    law_firm: mockUsers.filter(u => u.role === 'law_firm').length,
    admin: mockUsers.filter(u => u.role === 'admin').length,
  };
}

// Check if user is admin
export function isAdmin(id: string): boolean {
  const user = mockUsers.find(u => u.id === id);
  return user?.role === 'admin';
}

// Check if user is law firm
export function isLawFirm(id: string): boolean {
  const user = mockUsers.find(u => u.id === id);
  return user?.role === 'law_firm';
}

// Check if user is client
export function isClient(id: string): boolean {
  const user = mockUsers.find(u => u.id === id);
  return user?.role === 'client';
}

export default {
  getUsers,
  getUserById,
  getUserByEmail,
  getUsersByRole,
  getAdminUsers,
  getClientUsers,
  getLawFirmUsers,
  createUser,
  updateUser,
  updateUserRole,
  updatePreferredLanguage,
  getUserCountByRole,
  isAdmin,
  isLawFirm,
  isClient,
};
