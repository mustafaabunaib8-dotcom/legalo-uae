'use client';

import { useEffect, useState } from 'react';
import { mockUsers } from '@/lib/mock-data/users';
import { useSearchParams } from 'next/navigation';

export function useDemoRole() {
  const [role, setRole] = useState<'client' | 'law_firm' | 'admin'>('client');
  const searchParams = useSearchParams();

  useEffect(() => {
    const queryRole = searchParams.get('role');
    if (queryRole === 'law_firm' || queryRole === 'admin' || queryRole === 'client') {
      setRole(queryRole);
      if (typeof window !== 'undefined') {
        window.localStorage.setItem('legalo_demo_role', queryRole);
        window.dispatchEvent(new CustomEvent('legalo:role_change', { detail: queryRole }));
      }
    } else {
      if (typeof window !== 'undefined') {
        const stored = window.localStorage.getItem('legalo_demo_role');
        if (stored === 'law_firm' || stored === 'admin' || stored === 'client') {
          setRole(stored);
        }
      }
    }
  }, [searchParams]);

  const user = mockUsers.find(u => u.role === role)!;

  return { role, setRole, user };
}
