'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { StatsCard } from '@/components/ui/stats-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import {
  Briefcase, MessageSquare, FileText, CalendarClock, Sparkles
} from 'lucide-react';
import { useDemoRole } from './useDemoRole';
import { mockCases } from '@/lib/mock-data/cases';
import { mockUsers } from '@/lib/mock-data/users';

export default function ClientDashboard() {
  const t = useTranslations();
  const { user } = useDemoRole();
  const cases = mockCases.filter(c => c.user_id === user.id);

  const activeCases = cases.filter(c => c.status === 'active').length;
  const quotedCases = cases.filter(c => c.status === 'quoted' || c.status === 'matched').length;
  const completedCases = cases.filter(c => c.status === 'completed').length;

  const statusVariant: Record<string, any> = {
    active: 'risk-low',
    matched: 'jurisdiction',
    quoted: 'risk-med',
    completed: 'status',
    open: 'status',
    cancelled: 'status',
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">
            Welcome back, <span className="text-emerald-600">{user.display_name}</span>
          </h1>
          <p className="mt-2 text-gray-500">{t('dashboard.client.subtitle')}</p>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatsCard
            value={activeCases}
            label="Active Cases"
            icon={<Briefcase className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            value={quotedCases}
            label="Messages"
            icon={<MessageSquare className="h-4 w-4" />}
          />
          <StatsCard
            value={cases.length}
            label="Documents"
            icon={<FileText className="h-4 w-4" />}
            trend={{ value: 4, isPositive: true }}
          />
          <StatsCard
            value={2}
            label="Upcoming Deadlines"
            icon={<CalendarClock className="h-4 w-4" />}
          />
        </div>

        {/* CASES TABLE OR EMPTY STATE */}
        {cases.length === 0 ? (
          <EmptyState t={t} />
        ) : (
          <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
            {/* Desktop Table */}
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr className="text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                    <th className="px-6 py-3">Case Number</th>
                    <th className="px-6 py-3">Service</th>
                    <th className="px-6 py-3">Status</th>
                    <th className="px-6 py-3">Matched Firm</th>
                    <th className="px-6 py-3">Created</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {cases.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4 text-sm font-medium text-gray-900">{c.case_number}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{c.service_type.replace('-', ' ')}</td>
                      <td className="px-6 py-4">
                        <Badge variant={statusVariant[c.status] || 'status'} className="capitalize">{c.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{c.lawyer_firm || '—'}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
                      <td className="px-6 py-4">
                        <Link href={`/case/${c.id}/chat`}>
                          <Button size="sm" variant="secondary">View Chat</Button>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Mobile Cards */}
            <div className="md:hidden divide-y divide-gray-100">
              {cases.map(c => (
                <div key={c.id} className="p-5 space-y-3">
                  <div className="flex items-start justify-between">
                    <div>
                      <div className="font-semibold text-gray-900">{c.case_number}</div>
                      <div className="text-xs text-gray-500 capitalize">{c.service_type.replace('-', ' ')}</div>
                    </div>
                    <Badge variant={statusVariant[c.status] || 'status'} className="capitalize">{c.status}</Badge>
                  </div>
                  <div className="text-sm text-gray-600">{c.lawyer_firm || 'Waiting for firm assignment'}</div>
                  <Link href={`/case/${c.id}/chat`}>
                    <Button size="sm" variant="secondary" className="w-full">View Chat</Button>
                  </Link>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function EmptyState({ t }: { t: any }) {
  return (
    <div className="bg-white rounded-2xl border border-dashed border-gray-200 p-16 text-center">
      <div className="mx-auto w-16 h-16 rounded-full bg-emerald-50 flex items-center justify-center mb-6">
        <Sparkles className="h-7 w-7 text-emerald-600" />
      </div>
      <h3 className="text-xl font-semibold text-gray-900 mb-2">Get Started with your first case</h3>
      <p className="text-gray-500 mb-8 max-w-md mx-auto">
        Tell us about your legal matter and we'll match you with the right verified firm in minutes.
      </p>
      <Link href="/get-started">
        <Button size="lg">Start a new case</Button>
      </Link>
    </div>
  );
}
