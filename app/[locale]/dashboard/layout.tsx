'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname, useSearchParams } from 'next/navigation';
import { User, Building2, Shield, CheckCircle } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [role, setRole] = useState<string>(
    searchParams.get('role') ||
    (typeof window !== 'undefined' ? window.localStorage.getItem('legalo_demo_role') || 'client' : 'client')
  );

  useEffect(() => {
    const handler = (e: Event) => {
      const r = (e as CustomEvent).detail;
      setRole(r);
    };
    window.addEventListener('legalo:role_change', handler);
    return () => window.removeEventListener('legalo:role_change', handler);
  }, []);

  const switchRole = (r: string) => {
    setRole(r);
    window.localStorage.setItem('legalo_demo_role', r);
    window.dispatchEvent(new CustomEvent('legalo:role_change', { detail: r }));
    // Update URL without reload
    const url = new URL(window.location.href);
    url.searchParams.set('role', r);
    window.history.replaceState({}, '', url.toString());
    // Redirect to appropriate dashboard
    if (r === 'client') window.location.href = '/en/dashboard';
    else if (r === 'law_firm') window.location.href = '/en/firm';
    else window.location.href = '/en/admin';
  };

  return (
    <>
      {children}

      {/* ROLE SWITCHER - DEBUG CORNER */}
      <div className="fixed bottom-4 end-4 z-50 bg-white/95 backdrop-blur border border-gray-200 rounded-xl shadow-lg p-2 flex items-center gap-1">
        <div className="px-2 text-[10px] uppercase tracking-wider text-gray-400 font-semibold">Role</div>
        <button
          onClick={() => switchRole('client')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
            role === 'client' ? 'bg-blue-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <User className="h-3 w-3" />
          Client
        </button>
        <button
          onClick={() => switchRole('law_firm')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
            role === 'law_firm' ? 'bg-emerald-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <Building2 className="h-3 w-3" />
          Firm
        </button>
        <button
          onClick={() => switchRole('admin')}
          className={cn(
            'flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium transition-colors',
            role === 'admin' ? 'bg-purple-500 text-white' : 'text-gray-600 hover:bg-gray-100'
          )}
        >
          <Shield className="h-3 w-3" />
          Admin
        </button>
        <div className="w-px h-4 bg-gray-200 mx-1" />
        <div className="px-2 text-[10px] text-gray-400 font-mono flex items-center gap-1">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <CheckCircle className="h-3 w-3" />
          <span>{role}</span>
        </div>
      </div>
    </>
  );
}
