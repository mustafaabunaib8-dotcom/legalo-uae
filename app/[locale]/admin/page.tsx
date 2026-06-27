'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import { StatsCard } from '@/components/ui/stats-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { FilterChip } from '@/components/ui/filter-chip';
import { Input } from '@/components/ui/input';
import {
  Building2, Briefcase, Banknote, ShieldCheck,
  CheckCircle, XCircle, Search, Activity, KeyRound
} from 'lucide-react';
import { useDemoRole } from '../dashboard/useDemoRole';
import { mockFirms } from '@/lib/mock-data/firms';
import { mockCases } from '@/lib/mock-data/cases';
import { mockUsers } from '@/lib/mock-data/users';
import { getAdminStats } from '@/lib/services/admin';

export default function AdminConsole() {
  const t = useTranslations();
  const { user } = useDemoRole();
  const [activeTab, setActiveTab] = useState('overview');
  const [firmFilter, setFirmFilter] = useState<string>('all');
  const [caseSearch, setCaseSearch] = useState('');
  const [caseFilter, setCaseFilter] = useState<string>('all');
  const [userFilter, setUserFilter] = useState<string>('all');

  const stats = getAdminStats();

  const filteredFirms = mockFirms.filter(f => firmFilter === 'all' || f.status === firmFilter);
  const filteredCases = mockCases.filter(c => {
    if (caseFilter !== 'all' && c.status !== caseFilter) return false;
    if (caseSearch && !c.case_number.toLowerCase().includes(caseSearch.toLowerCase())) return false;
    return true;
  });
  const filteredUsers = mockUsers.filter(u => userFilter === 'all' || u.role === userFilter);

  const roleBadge: any = {
    client: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    law_firm: 'bg-emerald-500/10 text-emerald-500 border-emerald-500/20',
    admin: 'bg-purple-500/10 text-purple-500 border-purple-500/20',
  };

  const statusBadge: any = {
    pending: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    approved: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    rejected: 'bg-rose-500/10 text-rose-600 border-rose-500/20',
    active: 'bg-emerald-500/10 text-emerald-600 border-emerald-500/20',
    matched: 'bg-blue-500/10 text-blue-500 border-blue-500/20',
    quoted: 'bg-amber-500/10 text-amber-600 border-amber-500/20',
    completed: 'bg-zinc-100 text-zinc-600 border-zinc-200',
    open: 'bg-zinc-100 text-zinc-600 border-zinc-200',
  };

  // Recent activity mock
  const activity = [
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

  // Weekly sparkline mock
  const weekly = [12, 18, 14, 22, 28, 25, 31];
  const maxWeekly = Math.max(...weekly);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-6 py-10">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 tracking-tight">Admin Console</h1>
            <Badge className="bg-purple-500/10 text-purple-700 border border-purple-500/20 gap-1">
              <KeyRound className="h-3 w-3" />
              Administrator
            </Badge>
          </div>
        </div>

        {/* STATS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          <StatsCard
            value={stats.totalFirms}
            label="Total Firms"
            icon={<Building2 className="h-4 w-4" />}
            trend={{ value: 8, isPositive: true }}
          />
          <StatsCard
            value={stats.activeCases}
            label="Active Cases"
            icon={<Briefcase className="h-4 w-4" />}
            trend={{ value: 12, isPositive: true }}
          />
          <StatsCard
            value={`₳${(stats.revenue / 1000000).toFixed(1)}M`}
            label="Revenue"
            icon={<Banknote className="h-4 w-4" />}
            trend={{ value: 24, isPositive: true }}
          />
          <StatsCard
            value={stats.pendingApprovals}
            label="Pending Approvals"
            icon={<ShieldCheck className="h-4 w-4" />}
          />
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="bg-white border border-gray-200 mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="firms">Firms</TabsTrigger>
            <TabsTrigger value="cases">Cases</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
          </TabsList>

          {/* OVERVIEW */}
          <TabsContent value="overview">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* SPARKLINE */}
              <div className="bg-white rounded-2xl border border-gray-100 p-6">
                <h3 className="text-sm font-semibold text-gray-900 mb-1">Cases per week</h3>
                <p className="text-xs text-gray-500 mb-4">Last 7 days</p>
                <div className="flex items-end gap-2 h-32">
                  {weekly.map((v, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-t bg-emerald-500 hover:bg-emerald-600 transition-colors"
                        style={{ height: `${(v / maxWeekly) * 100}%` }}
                      />
                    </div>
                  ))}
                </div>
                <div className="flex justify-between mt-2 text-[10px] text-gray-400">
                  {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((d, i) => <span key={i}>{d}</span>)}
                </div>
              </div>

              {/* ACTIVITY */}
              <div className="lg:col-span-2 bg-white rounded-2xl border border-gray-100 p-6">
                <div className="flex items-center gap-2 mb-4">
                  <Activity className="h-4 w-4 text-gray-500" />
                  <h3 className="text-sm font-semibold text-gray-900">Recent activity</h3>
                </div>
                <ul className="space-y-3">
                  {activity.map((a, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm">
                      <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 mt-2 flex-shrink-0" />
                      <div className="flex-1">
                        <div className="text-gray-700">{a.text}</div>
                        <div className="text-xs text-gray-400 mt-0.5">{a.at}</div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </TabsContent>

          {/* FIRMS TAB */}
          <TabsContent value="firms">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <FilterChip active={firmFilter === 'all'} onClick={() => setFirmFilter('all')}>All ({mockFirms.length})</FilterChip>
              <FilterChip active={firmFilter === 'pending'} onClick={() => setFirmFilter('pending')}>Pending ({mockFirms.filter(f => f.status === 'pending').length})</FilterChip>
              <FilterChip active={firmFilter === 'approved'} onClick={() => setFirmFilter('approved')}>Approved ({mockFirms.filter(f => f.status === 'approved').length})</FilterChip>
              <FilterChip active={firmFilter === 'rejected'} onClick={() => setFirmFilter('rejected')}>Rejected ({mockFirms.filter(f => f.status === 'rejected').length})</FilterChip>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Firm</th>
                    <th className="px-6 py-3 text-left">Emirate</th>
                    <th className="px-6 py-3 text-left">Tier</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3"></th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredFirms.map(f => (
                    <tr key={f.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center">
                            <Building2 className="h-4 w-4 text-emerald-600" />
                          </div>
                          <div>
                            <div className="font-medium text-gray-900 text-sm">{f.firm_name}</div>
                            <div className="text-xs text-gray-500">{f.licence_jurisdiction}</div>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{f.emirate}</td>
                      <td className="px-6 py-4">
                        <Badge className="capitalize">{f.tier}</Badge>
                      </td>
                      <td className="px-6 py-4">
                        <Badge className={`${statusBadge[f.status]} capitalize`}>{f.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-end">
                        {f.status === 'pending' && (
                          <div className="flex items-center justify-end gap-2">
                            <Button size="sm" className="bg-emerald-500 hover:bg-emerald-600 text-white text-xs h-8">
                              <CheckCircle className="h-3 w-3 me-1" />Approve
                            </Button>
                            <Button size="sm" variant="destructive" className="h-8 text-xs">
                              <XCircle className="h-3 w-3 me-1" />Reject
                            </Button>
                          </div>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* CASES TAB */}
          <TabsContent value="cases">
            <div className="flex flex-col md:flex-row gap-3 mb-4">
              <div className="relative flex-1 max-w-sm">
                <Search className="absolute start-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input placeholder="Search by case number..." className="ps-10" value={caseSearch} onChange={(e) => setCaseSearch(e.target.value)} />
              </div>
              <div className="flex items-center gap-2 flex-wrap">
                <FilterChip active={caseFilter === 'all'} onClick={() => setCaseFilter('all')}>All</FilterChip>
                <FilterChip active={caseFilter === 'open'} onClick={() => setCaseFilter('open')}>Open</FilterChip>
                <FilterChip active={caseFilter === 'matched'} onClick={() => setCaseFilter('matched')}>Matched</FilterChip>
                <FilterChip active={caseFilter === 'active'} onClick={() => setCaseFilter('active')}>Active</FilterChip>
                <FilterChip active={caseFilter === 'completed'} onClick={() => setCaseFilter('completed')}>Completed</FilterChip>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">Case #</th>
                    <th className="px-6 py-3 text-left">Service</th>
                    <th className="px-6 py-3 text-left">Emirate</th>
                    <th className="px-6 py-3 text-left">Firm</th>
                    <th className="px-6 py-3 text-left">Status</th>
                    <th className="px-6 py-3 text-left">Created</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredCases.map(c => (
                    <tr key={c.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4 text-sm font-mono font-medium text-gray-900">{c.case_number}</td>
                      <td className="px-6 py-4 text-sm text-gray-600 capitalize">{c.service_type.replace('-', ' ')}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{c.emirate}</td>
                      <td className="px-6 py-4 text-sm text-gray-600">{c.lawyer_firm || '—'}</td>
                      <td className="px-6 py-4">
                        <Badge className={`${statusBadge[c.status]} capitalize`}>{c.status}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(c.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>

          {/* USERS TAB */}
          <TabsContent value="users">
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              <FilterChip active={userFilter === 'all'} onClick={() => setUserFilter('all')}>All ({mockUsers.length})</FilterChip>
              <FilterChip active={userFilter === 'client'} onClick={() => setUserFilter('client')}>Clients ({mockUsers.filter(u => u.role === 'client').length})</FilterChip>
              <FilterChip active={userFilter === 'law_firm'} onClick={() => setUserFilter('law_firm')}>Firms ({mockUsers.filter(u => u.role === 'law_firm').length})</FilterChip>
              <FilterChip active={userFilter === 'admin'} onClick={() => setUserFilter('admin')}>Admins ({mockUsers.filter(u => u.role === 'admin').length})</FilterChip>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100 text-xs font-semibold uppercase text-gray-500 tracking-wider">
                  <tr>
                    <th className="px-6 py-3 text-left">User</th>
                    <th className="px-6 py-3 text-left">Email</th>
                    <th className="px-6 py-3 text-left">Role</th>
                    <th className="px-6 py-3 text-left">Languages</th>
                    <th className="px-6 py-3 text-left">Joined</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {filteredUsers.map(u => (
                    <tr key={u.id} className="hover:bg-gray-50/60 transition-colors">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-100 to-emerald-50 flex items-center justify-center text-xs font-semibold text-emerald-700">
                            {u.display_name.charAt(0)}
                          </div>
                          <span className="text-sm font-medium text-gray-900">{u.display_name}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600">{u.email}</td>
                      <td className="px-6 py-4">
                        <Badge className={`${roleBadge[u.role]} capitalize`}>{u.role.replace('_', ' ')}</Badge>
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-600 uppercase">{u.preferred_language}</td>
                      <td className="px-6 py-4 text-sm text-gray-500">{new Date(u.created_at).toLocaleDateString()}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
