import type { UserProfile, UserRole } from '../../types';
import { mockUsers } from '../mock-data/users';

// Simulated session storage
let _currentUser: UserProfile | null = null;

/**
 * Sign in with email and password.
 * In mock mode, password is ignored — accepts any email matching a user, or 'password' as universal password.
 */
export async function signIn(
  email: string,
  _password: string
): Promise<UserProfile | null> {
  const user = mockUsers.find(u => u.email.toLowerCase() === email.toLowerCase());
  if (user) {
    _currentUser = user;
    return user;
  }
  return null;
}

/**
 * Register a new user.
 */
export async function signUp(data: {
  email: string;
  display_name: string;
  password: string;
  role?: UserRole;
  preferred_language?: 'en' | 'ar';
}): Promise<UserProfile> {
  // Check for duplicate email
  const existing = mockUsers.find(u => u.email.toLowerCase() === data.email.toLowerCase());
  if (existing) {
    throw new Error('A user with this email already exists.');
  }

  const newUser: UserProfile = {
    id: `user-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    email: data.email,
    display_name: data.display_name,
    preferred_language: data.preferred_language || 'en',
    role: data.role || 'client',
    created_at: new Date().toISOString()
  };

  mockUsers.push(newUser);
  _currentUser = newUser;
  return newUser;
}

/**
 * Sign out the current user.
 */
export async function signOut(): Promise<void> {
  _currentUser = null;
}

/**
 * Get the currently signed-in user.
 */
export async function getCurrentUser(): Promise<UserProfile | null> {
  return _currentUser;
}

/**
 * Check if a user has a specific role.
 */
export async function hasRole(userId: string, role: UserRole): Promise<boolean> {
  const user = mockUsers.find(u => u.id === userId);
  if (!user) return false;
  return user.role === role || user.role === 'admin';
}

/**
 * Get a user by ID.
 */
export async function getUserById(userId: string): Promise<UserProfile | null> {
  return mockUsers.find(u => u.id === userId) || null;
}
