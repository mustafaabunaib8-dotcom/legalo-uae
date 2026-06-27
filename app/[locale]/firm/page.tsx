'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';
import Link from 'next/link';
import { StatsCard } from '@/components/ui/stats-card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { ProgressRing } from '@/components/ui/progress-ring';
import { FilterChip } from '@/components/ui/filter-chip';
import {
  Briefcase, CheckCircle, Wallet, Lock,
  LayoutDashboard, BriefcaseBusiness, BarChart3, Settings, Sparkles,
  ChevronRight, TrendingUp
} from 'lucide-react';
import { useDemoRole } from '../dashboard/useDemoRole';
import { mockCases } from '@/lib/mock-data/cases';
import { mockFirms } from '@/lib/mock-data/firms';
import { userToFirmMap } from '@/lib/mock-data/users';

export default function FirmDashboard() {
  const t = useTranslations();
  const { user } = useDemoRole();
  const [activeTab, setActiveTab] = useState('cases');
  const firmId = userToFirmMap[user.id];
  const firm = mockFirms.find(f => f.id === firmId);
  const cases = mockCases.filter(c => c.lawyer_user_id === user.id);

  const activeCases = cases.filter(c => c.status === 'active').length;
  const completedCases = cases.filter(c => c.status === 'completed').length;

  // Mock earnings
  const totalEarned = 284500;
  const inEscrow = 48200;
  const last6Months = [
    { month: 'Jul', amount: 32000 },
    { month: 'Aug', amount: 45000 },
    { month: 'Sep', amount: 38000 },
    { month: 'Oct', amount: 52000 },
    { month: 'Nov', amount: 61500 },
    { month: 'Dec', amount: 55000 },
  ];
  const maxAmount = Math.max(...last6Months.map(m => m.amount));

  const profileCompleteness = 72;
  const checklist = [
    { label: 'Firm Description', done: true },
    { label: 'Firm Logo', done: true },
    { label: 'Specializations', done: true },
    { label: 'Response SLA set', done: false },
    { label: 'Trade Licence verified', done: false },
  ];

  const navItems = [
    { label: 'Dashboard', icon: LayoutDashboard, active: true },
    { label: 'Cases', icon: BriefcaseBusiness },
    { label: 'Earnings', icon: BarChart3 },
    { label: 'Settings', icon: Settings },
  ];

  return (
    <div data-theme="dark" className="min-h-screen bg-zinc-950 text-zinc-100">
      <div className="flex min-h-screen">
        {/* SIDEBAR */}
        <aside className="hidden lg:flex flex-col w-60 border-r border-zinc-800/80 bg-zinc-900/60 backdrop-blur sticky top-0 h-screen">
          <div className="p-6 flex items-center gap-2">
            <div className="w-7 h-7 rounded-md bg-emerald-500 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <span className="font-semibold tracking-tight">Legalo</span>
          </div>

          <nav className="flex-1 px-3 space-y-1">
            {navItems.map(item => (
              <button
                key={item.label}
                className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-colors ${
                  item.active
                    ? 'bg-zinc-800 text-white ring-1 ring-zinc-700 border-l-2 border-emerald-500 ps-2'
                    : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                }`}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4">
            <div className="rounded-xl bg-gradient-to-br from-emerald-500/20 to-emerald-600/5 border border-emerald-500/20 p-4">
              <Sparkles className="h-4 w-4 text-emerald-400 mb-2" />
              <h4 className="text-sm font-semibold text-white mb-1">Upgrade to Pro</h4>
              <p className="text-xs text-zinc-400 mb-3">Unlock priority matching and analytics.</p>
              <button className="w-full text-xs font-medium bg-emerald-500 hover:bg-emerald-400 transition-colors text-white rounded-md py-2">
                Upgrade
              </button>
            </div>
          </div>
        </aside>

        {/* MAIN */}
        <div className="flex-1 min-w-0">
          {/* HEADER */}
          <header className="border-b border-zinc-800/80 bg-zinc-950/60 backdrop-blur sticky top-0 z-10">
            <div className="px-6 md:px-10 py-5 flex items-center justify-between">
              <div>
                <h1 className="text-xl font-semibold tracking-tight">{firm?.firm_name || 'Law Firm'}</h1>
                <p className="text-sm text-zinc-400 mt-0.5">{firm?.specializations.slice(0, 3).join(' · ')}</p>
              </div>
              <div className="hidden md:flex items-center gap-2">
                <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 capitalize">{firm?.tier}</Badge>
                <Badge className="bg-zinc-800 text-zinc-300 border border-zinc-700">{firm?.emirate}</Badge>
              </div>
            </div>
          </header>

          <main className="px-6 md:px-10 py-8 max-w-7xl">
            {/* STATS */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
              <StatsCard
                value={activeCases}
                label="Active Cases"
                icon={<Briefcase className="h-4 w-4" />}
                className="bg-zinc-900 border border-zinc-800 shadow-none"
              />
              <StatsCard
                value={completedCases}
                label="Completed"
                icon={<CheckCircle className="h-4 w-4" />}
                className="bg-zinc-900 border border-zinc-800 shadow-none"
              />
              <StatsCard
                value={`₳${(totalEarned / 1000).toFixed(1)}K`}
                label="Total Earned AED"
                icon={<Wallet className="h-4 w-4" />}
                trend={{ value: 18, isPositive: true }}
                className="bg-zinc-900 border border-zinc-800 shadow-none"
              />
              <StatsCard
                value={`₳${(inEscrow / 1000).toFixed(1)}K`}
                label="In Escrow AED"
                icon={<Lock className="h-4 w-4" />}
                className="bg-zinc-900 border border-zinc-800 shadow-none"
              />
            </div>

            <Tabs value={activeTab} onValueChange={setActiveTab}>
              <TabsList className="bg-zinc-900 border border-zinc-800 mb-6">
                <TabsTrigger value="cases" className="text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Assigned Cases</TabsTrigger>
                <TabsTrigger value="earnings" className="text-zinc-400 data-[state=active]:bg-zinc-800 data-[state=active]:text-white">Earnings & Payments</TabsTrigger>
              </TabsList>

              {/* CASES TAB */}
              <TabsContent value="cases">
                <div className="flex items-center gap-2 mb-4 overflow-x-auto">
                  <FilterChip active>All</FilterChip>
                  <FilterChip>Active</FilterChip>
                  <FilterChip>Open</FilterChip>
                  <FilterChip>Completed</FilterChip>
                </div>

                <div className="bg-zinc-900 border border-zinc-800 rounded-xl overflow-hidden">
                  <table className="w-full">
                    <thead className="bg-zinc-950/50 border-b border-zinc-800 text-xs font-semibold uppercase text-zinc-500">
                      <tr className="text-start">
                        <th className="px-4 py-3 text-start">Case #</th>
                        <th className="px-4 py-3 text-start">Client</th>
                        <th className="px-4 py-3 text-start">Service</th>
                        <th className="px-4 py-3 text-start">Status</th>
                        <th className="px-4 py-3 text-start">Match</th>
                        <th className="px-4 py-3 text-start">Date</th>
                        <th className="px-4 py-3"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-zinc-800">
                      {cases.map(c => (
                        <tr key={c.id} className="hover:bg-zinc-800/40 transition-colors">
                          <td className="px-4 py-3 text-sm font-medium text-zinc-200 font-mono">{c.case_number}</td>
                          <td className="px-4 py-3 text-sm text-zinc-300">{c.description.split(' ').slice(0, 3).join(' ')}...</td>
                          <td className="px-4 py-3 text-sm text-zinc-300 capitalize">{c.service_type.replace('-', ' ')}</td>
                          <td className="px-4 py-3">
                            <Badge className={
                              c.status === 'active' ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' :
                              c.status === 'completed' ? 'bg-zinc-800 text-zinc-400' :
                              'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }>
                              {c.status}
                            </Badge>
                          </td>
                          <td className="px-4 py-3">
                            <ProgressRing value={85} size={32} strokeWidth={3} />
                          </td>
                          <td className="px-4 py-3 text-sm text-zinc-500">{new Date(c.created_at).toLocaleDateString()}</td>
                          <td className="px-4 py-3 text-end">
                            <Link href={`/case/${c.id}/chat`}>
                              <button className="text-emerald-400 hover:text-emerald-300 text-sm font-medium">
                                View →
                              </button>
                            </Link>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                  {cases.length === 0 && (
                    <div className="py-16 text-center text-zinc-500 text-sm">No cases assigned yet</div>
                  )}
                </div>
              </TabsContent>

              {/* EARNINGS TAB */}
              <TabsContent value="earnings">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                  {/* CHART */}
                  <div className="lg:col-span-2 bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <h3 className="text-sm font-semibold text-zinc-100">Earnings · Last 6 months</h3>
                        <p className="text-xs text-zinc-500 mt-0.5">Gross payout, AED</p>
                      </div>
                      <div className="flex items-center gap-1 text-emerald-400 text-sm">
                        <TrendingUp className="h-4 w-4" />
                        <span className="font-medium">+18%</span>
                      </div>
                    </div>

                    <div className="flex items-end gap-4 h-56">
                      {last6Months.map(m => (
                        <div key={m.month} className="flex-1 flex flex-col items-center gap-2">
                          <div className="w-full flex-1 flex items-end">
                            <div
                              className="w-full rounded-t-md bg-gradient-to-t from-emerald-600 to-emerald-400 transition-all hover:from-emerald-500 hover:to-emerald-300"
                              style={{ height: `${(m.amount / maxAmount) * 100}%` }}
                              title={`${m.amount.toLocaleString()} AED`}
                            />
                          </div>
                          <span className="text-xs text-zinc-500">{m.month}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* PAYOUT */}
                  <div className="bg-zinc-900 border border-zinc-800 rounded-xl p-6">
                    <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold">Available for payout</p>
                    <div className="mt-3 text-3xl font-bold text-white">₳38,420</div>
                    <p className="text-xs text-zinc-500 mt-1">Next payout: Dec 30</p>
                    <Button className="w-full mt-6 bg-emerald-500 hover:bg-emerald-400 text-white">
                      Request Payout
                    </Button>

                    <div className="mt-8">
                      <p className="text-xs text-zinc-500 uppercase tracking-wider font-semibold mb-3">Recent transactions</p>
                      <ul className="space-y-3 text-sm">
                        <li className="flex items-center justify-between">
                          <div>
                            <div className="text-zinc-200 font-medium">LG-2024-0001</div>
                            <div className="text-xs text-zinc-500">Payout · Dec 12</div>
                          </div>
                          <span className="font-mono text-zinc-300">+₳12,500</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <div>
                            <div className="text-zinc-200 font-medium">LG-2024-0008</div>
                            <div className="text-xs text-zinc-500">Payout · Dec 05</div>
                          </div>
                          <span className="font-mono text-zinc-300">+₳8,200</span>
                        </li>
                        <li className="flex items-center justify-between">
                          <div>
                            <div className="text-zinc-200 font-medium">Platform fee</div>
                            <div className="text-xs text-zinc-500">Nov 28</div>
                          </div>
                          <span className="font-mono text-rose-400">-₳720</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>

        {/* RIGHT SIDEBAR - PROFILE COMPLETENESS */}
        <aside className="hidden xl:block w-72 border-l border-zinc-800/80 bg-zinc-900/40 p-6 sticky top-0 h-screen overflow-y-auto">
          <h3 className="text-xs uppercase tracking-wider font-semibold text-zinc-500 mb-4">Profile Completeness</h3>
          <div className="flex flex-col items-center py-4 mb-4">
            <ProgressRing value={profileCompleteness} size={140} strokeWidth={8} color="#10b981" />
            <div className="mt-4 text-center">
              <div className="text-2xl font-bold text-white">{profileCompleteness}%</div>
              <div className="text-xs text-zinc-500">complete</div>
            </div>
          </div>

          <ul className="space-y-2">
            {checklist.map((item) => (
              <li key={item.label} className="flex items-center gap-3 text-sm">
                <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs ${item.done ? 'bg-emerald-500/20 text-emerald-400' : 'bg-zinc-800 text-zinc-500'}`}>
                  {item.done ? '✓' : '·'}
                </div>
                <span className={item.done ? 'text-zinc-300' : 'text-zinc-500'}>{item.label}</span>
              </li>
            ))}
          </ul>

          <Button className="w-full mt-8 bg-zinc-800 hover:bg-zinc-700 text-white border border-zinc-700">
            Complete Profile <ChevronRight className="h-4 w-4 ms-1" />
          </Button>
        </aside>
      </div>
    </div>
  );
}
