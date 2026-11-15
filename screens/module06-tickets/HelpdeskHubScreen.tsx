import React, { useState } from 'react';
import {
  Wrench,
  Plus,
  Clock,
  CheckCircle2,
  AlertCircle,
  ChevronRight,
  Filter,
  User,
  Zap,
  Sparkles,
  PhoneCall,
  Search,
  MessageSquare,
  ArrowLeft
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { ExpressToolbox3D } from '../../components/3d/Vector3DElements';

export interface MaintenanceTicket {
  id: string;
  title: string;
  category: 'plumbing' | 'electrical' | 'lift' | 'carpentry' | 'civil' | 'security';
  scope: 'personal' | 'common';
  unitOrArea: string;
  status: 'logged' | 'assigned' | 'in_progress' | 'pending_signoff' | 'resolved';
  slaHoursLeft?: number;
  slaTimeStr?: string;
  technician?: {
    name: string;
    role: string;
    phone: string;
    rating: number;
    avatar: string;
    etaMinutes: number;
  };
  createdAt: string;
  photoUrl?: string;
}

export const SAMPLE_TICKETS: MaintenanceTicket[] = [
  {
    id: 'TKT-4921',
    title: 'Master Bathroom Geyser Not Heating',
    category: 'electrical',
    scope: 'personal',
    unitOrArea: 'Flat 1204 • Tower 2',
    status: 'in_progress',
    slaHoursLeft: 1.5,
    slaTimeStr: '1h 30m SLA remaining',
    technician: {
      name: 'Kishore Verma',
      role: 'Certified Electrician',
      phone: '9845123940',
      rating: 4.9,
      avatar: 'KV',
      etaMinutes: 12,
    },
    createdAt: 'Today, 09:30 AM',
  },
  {
    id: 'TKT-4819',
    title: 'Tower 2 Corridor 12th Floor LED Flickering',
    category: 'electrical',
    scope: 'common',
    unitOrArea: 'Tower 2 • 12th Floor Lift Lobby',
    status: 'assigned',
    slaHoursLeft: 3.8,
    slaTimeStr: '3h 48m SLA remaining',
    technician: {
      name: 'Ratan Lal',
      role: 'Facility Maintenance',
      phone: '9820194821',
      rating: 4.7,
      avatar: 'RL',
      etaMinutes: 45,
    },
    createdAt: 'Today, 08:15 AM',
  },
  {
    id: 'TKT-4520',
    title: 'Main Kitchen Sink Tap Water Pressure Low',
    category: 'plumbing',
    scope: 'personal',
    unitOrArea: 'Flat 1204 • Tower 2',
    status: 'resolved',
    createdAt: '12 Nov 2026',
  },
  {
    id: 'TKT-4310',
    title: 'Clubhouse Gymnasium Treadmill 3 Belt Slipping',
    category: 'civil',
    scope: 'common',
    unitOrArea: 'Clubhouse Level 1',
    status: 'resolved',
    createdAt: '08 Nov 2026',
  },
];

interface HelpdeskHubScreenProps {
  onBack?: () => void;
  onRaiseTicket: () => void;
  onSelectTicket: (ticket: MaintenanceTicket) => void;
  onOpenExpressServices: () => void;
}

export const HelpdeskHubScreen: React.FC<HelpdeskHubScreenProps> = ({
  onBack,
  onRaiseTicket,
  onSelectTicket,
  onOpenExpressServices,
}) => {
  const [activeFilter, setActiveFilter] = useState<'all' | 'personal' | 'common'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredTickets = SAMPLE_TICKETS.filter((t) => {
    const matchesFilter = activeFilter === 'all' || t.scope === activeFilter;
    const matchesSearch =
      t.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  const activeCount = SAMPLE_TICKETS.filter((t) => t.status !== 'resolved').length;
  const resolvedCount = SAMPLE_TICKETS.filter((t) => t.status === 'resolved').length;

  return (
    <div className="w-full min-h-full flex flex-col justify-between pb-24 text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-4">
        {/* ========================================================
            1. FROSTED GLASSPHISM HEADER
            ======================================================== */}
        <div className="px-4 py-2.5 glass-dock sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-700 press-scale shrink-0"
                title="Back to Previous Screen"
              >
                <ArrowLeft size={16} strokeWidth={2.4} />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest truncate">
                  FACILITY HELPDESK
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                Tickets & Repairs
              </h2>
            </div>
          </div>

          {/* Quick Express Services Pill */}
          <button
            type="button"
            onClick={onOpenExpressServices}
            className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl glass-pill text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:scale-105 transition-all press-scale shadow-sm shrink-0"
          >
            <Sparkles size={13} className="text-amber-500" />
            <span className="text-[11px]">15m Services</span>
          </button>
        </div>

        {/* ========================================================
            2. SLA STATUS METRICS HERO
            ======================================================== */}
        <div className="px-4">
          <div className="p-4 rounded-3xl glass-card-elevated text-left relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest block">
                  Society SLA Guarantee
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-slate-900 dark:text-white">
                    {activeCount} Active
                  </span>
                  <span className="text-xs text-slate-500 font-medium">
                    • {resolvedCount} Resolved
                  </span>
                </div>
              </div>
              <Badge variant="emerald" icon={CheckCircle2} size="sm">
                SLA 98.4%
              </Badge>
            </div>

            <p className="text-xs text-slate-600 dark:text-slate-300 mt-2 leading-relaxed">
              Every complaint is logged with an auditable timer. Facility managers cannot close tickets without your digital signoff.
            </p>

            <div className="mt-4 pt-3 border-t border-slate-200/60 dark:border-white/10 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                Emergency: 2h Max
              </span>
              <span className="flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-cobalt-500" />
                Standard: 24h Max
              </span>
            </div>
          </div>
        </div>

        {/* ========================================================
            3. EXPRESS SERVICES MINI PROMO BANNER WITH 3D TOOLBOX
            ======================================================== */}
        <div className="px-4">
          <div
            onClick={onOpenExpressServices}
            className="p-3.5 rounded-3xl glass-card hover:border-amber-500/60 transition-all cursor-pointer flex items-center justify-between gap-3 press-scale shadow-sm relative overflow-hidden"
          >
            <div className="flex items-center gap-3">
              <ExpressToolbox3D size={52} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-extrabold text-slate-900 dark:text-white">
                    Need Private Flat Repairs?
                  </span>
                  <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-amber-500/20 text-amber-600 dark:text-amber-400 font-bold font-mono">
                    15 MINS
                  </span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  Pre-vetted society plumbers, electricians & carpenters with fixed rate card.
                </p>
              </div>
            </div>
            <ChevronRight size={16} className="text-slate-400 shrink-0" />
          </div>
        </div>

        {/* ========================================================
            4. SEARCH & FILTER TABS
            ======================================================== */}
        <div className="px-4 flex flex-col gap-2.5">
          {/* Glass Search Input */}
          <div className="relative flex items-center h-[54px] rounded-2xl border border-slate-300/80 dark:border-obsidian-750 bg-slate-50/90 dark:bg-obsidian-900/90 hover:bg-slate-100/70 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15 shadow-2xs transition-all group">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-obsidian-800 text-slate-500 dark:text-slate-400 border border-slate-200/90 dark:border-obsidian-700 shadow-2xs flex items-center justify-center shrink-0 ml-2 mr-2.5 group-focus-within:text-cobalt-600 dark:group-focus-within:text-cobalt-400 pointer-events-none transition-colors">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search ticket #, issue, category..."
              className="w-full h-full pr-10 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm font-semibold outline-none"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 text-xs text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
              >
                Clear
              </button>
            )}
          </div>

          {/* Segmented Filter Pills */}
          <div className="flex items-center gap-2">
            {[
              { id: 'all', label: `All (${SAMPLE_TICKETS.length})` },
              { id: 'personal', label: 'My Flat 1204' },
              { id: 'common', label: 'Common Society Area' },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                onClick={() => setActiveFilter(f.id as any)}
                className={`flex-1 py-2 px-1 text-center rounded-xl text-xs font-bold transition-all press-scale ${
                  activeFilter === f.id
                    ? 'bg-cobalt-600 text-white shadow-sm ring-1 ring-cobalt-500/30'
                    : 'glass-pill text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* ========================================================
            5. TICKET CARDS STREAM
            ======================================================== */}
        <div className="px-4 flex flex-col gap-3">
          <div className="flex items-center justify-between text-xs">
            <span className="font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Tickets ({filteredTickets.length})
            </span>
            <span className="text-[11px] text-slate-500 dark:text-slate-400">Tap card to inspect SLA</span>
          </div>

          {filteredTickets.length > 0 ? (
            filteredTickets.map((ticket) => {
              const isInProgress = ticket.status === 'in_progress';
              const isAssigned = ticket.status === 'assigned';
              const isResolved = ticket.status === 'resolved';

              return (
                <div
                  key={ticket.id}
                  onClick={() => onSelectTicket(ticket)}
                  className={`p-4 rounded-3xl glass-card hover:border-cobalt-500/60 transition-all cursor-pointer flex flex-col gap-3 press-scale shadow-sm ${
                    isInProgress ? 'ring-1 ring-cobalt-500/30' : ''
                  }`}
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-xs font-bold px-2 py-0.5 rounded-lg bg-slate-100 dark:bg-obsidian-850 text-cobalt-600 dark:text-cobalt-400 border border-slate-200 dark:border-obsidian-750">
                        #{ticket.id}
                      </span>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider ${
                        ticket.scope === 'personal'
                          ? 'bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800/40'
                          : 'bg-sky-50 text-sky-700 dark:bg-sky-950/60 dark:text-sky-300 border border-sky-200 dark:border-sky-800/40'
                      }`}>
                        {ticket.scope === 'personal' ? 'Private Unit' : 'Common Area'}
                      </span>
                    </div>

                    <Badge
                      variant={isInProgress ? 'cobalt' : isAssigned ? 'amber' : 'emerald'}
                      size="sm"
                    >
                      {isInProgress ? 'In Progress' : isAssigned ? 'Assigned' : 'Resolved'}
                    </Badge>
                  </div>

                  <div>
                    <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
                      {ticket.title}
                    </h3>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {ticket.unitOrArea} • {ticket.createdAt}
                    </p>
                  </div>

                  {/* Technician Inset & SLA Tracker */}
                  {ticket.technician && !isResolved && (
                    <div className="p-3 rounded-2xl glass-card-subtle flex items-center justify-between text-xs">
                      <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 rounded-xl bg-cobalt-600 text-white font-bold text-xs flex items-center justify-center">
                          {ticket.technician.avatar}
                        </div>
                        <div>
                          <span className="font-bold text-slate-900 dark:text-white block leading-tight">
                            {ticket.technician.name}
                          </span>
                          <span className="text-[11px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                            Arriving in ~{ticket.technician.etaMinutes} mins
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center gap-1.5">
                        <span className="text-[10px] font-mono font-bold text-amber-600 dark:text-amber-400">
                          {ticket.slaTimeStr}
                        </span>
                        <ChevronRight size={14} className="text-slate-400" />
                      </div>
                    </div>
                  )}

                  {isResolved && (
                    <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs text-emerald-600 dark:text-emerald-400 font-semibold">
                      <span className="flex items-center gap-1">
                        <CheckCircle2 size={13} />
                        <span>Work approved by resident • 5.0★ Rating</span>
                      </span>
                      <span className="text-slate-500 dark:text-slate-400 font-mono text-[11px]">Closed</span>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div className="p-8 rounded-3xl glass-card text-center flex flex-col items-center gap-2">
              <CheckCircle2 size={32} className="text-emerald-500" />
              <span className="text-sm font-bold text-slate-900 dark:text-white">Zero Active Complaints</span>
              <p className="text-xs text-slate-500">All maintenance requests for your society are resolved.</p>
            </div>
          )}
        </div>
      </div>

      {/* ========================================================
          6. FLOATING PRIMARY ACTION (Raise New Ticket)
          ======================================================== */}
      <div className="sticky bottom-3 left-0 right-0 w-full px-4 z-30 pb-2">
        <Button
          onClick={onRaiseTicket}
          icon={Plus}
          iconPosition="left"
          size="lg"
          className="shadow-xl shadow-cobalt-600/30"
        >
          Raise Maintenance Ticket
        </Button>
      </div>
    </div>
  );
};