import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  Megaphone,
  FileText,
  Download,
  AlertTriangle,
  CheckCircle2,
  Calendar,
  Building,
  Vote,
  X,
  Share2,
  ChevronRight,
  Search,
  Clock,
  ShieldCheck,
  Filter,
  Sparkles,
  Inbox
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { NoticeDetailScreen } from './NoticeDetailScreen';

export interface SocietyNotice {
  id: string;
  title: string;
  department: string;
  dateStr: string;
  priority: 'urgent' | 'official' | 'general';
  summary: string;
  fullBody: string;
  hasVoting?: boolean;
  pollQuestion?: string;
  votesCount?: { yes: number; no: number };
  signedBy: string;
  pdfFileName: string;
  readTime?: string;
  category?: string;
}

export const SAMPLE_NOTICES: SocietyNotice[] = [
  {
    id: 'not_01',
    title: 'Scheduled Overhead Water Tank Cleaning (Tower 1 & Tower 2)',
    department: 'Facility & Plumbing Maintenance',
    dateStr: 'Tomorrow • 9:00 AM – 1:00 PM',
    priority: 'urgent',
    summary: 'Water supply to kitchen and master bathrooms will be suspended during high-pressure tank disinfection.',
    fullBody: 'Dear Residents of Tower 1 and Tower 2, please note that semi-annual deep microbiological sanitization and scouring of the rooftop 80,000L water reservoirs will be conducted tomorrow between 9:00 AM and 1:00 PM. Please store sufficient municipal drinking water for cooking and emergencies. Supply will resume with normal RO filtration pressure by 1:30 PM.',
    signedBy: 'Mr. Rajesh Hegde (Estate Manager) & President MC',
    pdfFileName: 'Circular-2026-WT-04.pdf',
    readTime: '2 min read',
    category: 'Facility Maintenance',
  },
  {
    id: 'not_02',
    title: 'Notice for 12th Annual General Body Meeting (AGM 2026)',
    department: 'Executive Managing Committee',
    dateStr: 'Sunday, 30 Nov 2026 • 10:30 AM',
    priority: 'official',
    summary: 'Audited balance sheets, clubhouse expansion budget review, and committee election voting.',
    fullBody: 'In accordance with the Karnataka Apartment Ownership Act and Society By-Laws, the 12th AGM of Prestige Lakeside Habitat Owners Association will convene at the Main Banquet Hall. Physical attendance and verified in-app proxy voting are both supported. The audited financials for FY 2025-26 have been published in the Hunt Lockdoor Financials ledger.',
    hasVoting: true,
    pollQuestion: 'Do you approve the proposed Solar Rooftop & EV Fast-Charging CapEx budget of ₹42 Lakhs?',
    votesCount: { yes: 184, no: 22 },
    signedBy: 'Association General Secretary',
    pdfFileName: 'AGM-Notice-Agenda-2026.pdf',
    readTime: '3 min read',
    category: 'Governance & AGM',
  },
  {
    id: 'not_03',
    title: 'Updated Policy for Resident Pets in Elevators & Lawns',
    department: 'Community Living Guidelines',
    dateStr: 'Effective 1 Dec 2026',
    priority: 'general',
    summary: 'Leash requirements in common corridors and dedicated pet waste disposal bins on North Lawn.',
    fullBody: 'To ensure comfort and hygiene for all community members, pet dogs must remain leashed at all times within elevator lobbies and landscaped jogging tracks. Please utilize the dedicated bio-degradable waste dispensers installed across the perimeter park.',
    signedBy: 'Grievance & Amenities Subcommittee',
    pdfFileName: 'Pet-Guidelines-Policy-V2.pdf',
    readTime: '1 min read',
    category: 'Community Guidelines',
  },
];

interface NoticesCircularsScreenProps {
  onBack: () => void;
}

export const NoticesCircularsScreen: React.FC<NoticesCircularsScreenProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'official' | 'general'>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedNotice, setSelectedNotice] = useState<SocietyNotice | null>(null);
  const [userVote, setUserVote] = useState<'yes' | 'no' | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleCastVote = (noticeId: string, choice: 'yes' | 'no') => {
    setUserVote(choice);
    showToast(`✓ Your vote (${choice.toUpperCase()}) recorded cryptographically for Flat 1204`);
  };

  const filteredNotices = useMemo(() => {
    return SAMPLE_NOTICES.filter((n) => {
      // Filter tab
      if (filter !== 'all' && n.priority !== filter) {
        return false;
      }
      // Search query
      if (searchQuery.trim()) {
        const q = searchQuery.toLowerCase();
        const matchesTitle = n.title.toLowerCase().includes(q);
        const matchesDept = n.department.toLowerCase().includes(q);
        const matchesSummary = n.summary.toLowerCase().includes(q);
        return matchesTitle || matchesDept || matchesSummary;
      }
      return true;
    });
  }, [filter, searchQuery]);

  // If a notice is selected, show the full dedicated NoticeDetailScreen instead of a popup modal
  if (selectedNotice) {
    return (
      <NoticeDetailScreen
        notice={selectedNotice}
        onBack={() => setSelectedNotice(null)}
        onCastVote={handleCastVote}
        userVote={userVote}
      />
    );
  }

  const urgentCount = SAMPLE_NOTICES.filter((n) => n.priority === 'urgent').length;
  const officialCount = SAMPLE_NOTICES.filter((n) => n.priority === 'official').length;
  const generalCount = SAMPLE_NOTICES.filter((n) => n.priority === 'general').length;

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-24 text-left animate-in fade-in duration-200 bg-slate-50 dark:bg-obsidian-950">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="fixed top-14 left-4 right-4 z-50 p-3.5 rounded-2xl bg-slate-900/95 dark:bg-obsidian-850 text-white border border-slate-700/80 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={16} className="text-[#04bb49] shrink-0" />
          <span className="flex-1 text-[11.5px] leading-tight font-medium">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-3 border-b border-slate-200/80 dark:border-obsidian-800">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/90 dark:border-white/10 press-scale"
              title="Back to Society Hub"
            >
              <ArrowLeft size={19} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-black tracking-widest text-[#04bb49] uppercase block">
                OFFICIAL COMMUNICATIONS
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Notices & Circulars
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[10.5px] font-mono font-bold px-2 py-0.5 rounded-lg bg-emerald-500/15 text-[#04bb49] border border-[#04bb49]/20">
              {SAMPLE_NOTICES.length} Active
            </span>
          </div>
        </div>

        {/* Search Bar Input */}
        <div className="relative flex items-center h-11 rounded-2xl border border-slate-200/90 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 px-3.5 shadow-2xs group focus-within:border-[#04bb49] focus-within:ring-2 focus-within:ring-[#04bb49]/20 transition-all">
          <Search size={16} className="text-slate-400 group-focus-within:text-[#04bb49] transition-colors shrink-0 mr-2.5" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search circulars by keyword, tower, or topic..."
            className="w-full h-full bg-transparent text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="w-5 h-5 rounded-full bg-slate-200 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center text-[10px] hover:text-slate-800"
            >
              <X size={12} />
            </button>
          )}
        </div>

        {/* Filter Pills with Quantities */}
        <div className="flex gap-2 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Notices', count: SAMPLE_NOTICES.length },
            { id: 'urgent', label: '🚨 Urgent', count: urgentCount },
            { id: 'official', label: '🏛️ Official MC', count: officialCount },
            { id: 'general', label: '📋 Guidelines', count: generalCount },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setFilter(pill.id as any)}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all press-scale flex items-center gap-1.5 ${
                filter === pill.id
                  ? 'bg-[#04bb49] text-white shadow-xs'
                  : 'bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-obsidian-850'
              }`}
            >
              <span>{pill.label}</span>
              <span
                className={`text-[10px] font-mono px-1.5 py-0.2 rounded-md ${
                  filter === pill.id
                    ? 'bg-white/25 text-white'
                    : 'bg-slate-100 dark:bg-obsidian-800 text-slate-500'
                }`}
              >
                {pill.count}
              </span>
            </button>
          ))}
        </div>

        {/* Notices Cards Stream */}
        <div className="flex flex-col gap-3.5">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((n) => {
              const isUrgent = n.priority === 'urgent';
              const isOfficial = n.priority === 'official';

              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNotice(n)}
                  className={`p-4 rounded-3xl bg-white dark:bg-obsidian-900 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md press-scale group relative overflow-hidden ${
                    isUrgent
                      ? 'border-crimson-200/80 dark:border-crimson-900/50 hover:border-crimson-400'
                      : isOfficial
                      ? 'border-emerald-200/80 dark:border-emerald-900/50 hover:border-[#04bb49]'
                      : 'border-slate-200/90 dark:border-obsidian-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Left Priority Accent Bar */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-1.5 ${
                      isUrgent ? 'bg-crimson-500' : isOfficial ? 'bg-[#04bb49]' : 'bg-slate-400'
                    }`}
                  />

                  {/* Header Row: Category Badge & Timestamp */}
                  <div className="flex items-center justify-between pl-1">
                    <span
                      className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-lg text-[10px] font-black uppercase tracking-wider ${
                        isUrgent
                          ? 'bg-crimson-50 dark:bg-crimson-950/40 text-crimson-600 dark:text-crimson-400 border border-crimson-200 dark:border-crimson-800/40'
                          : isOfficial
                          ? 'bg-emerald-50 dark:bg-emerald-950/40 text-[#04bb49] border border-emerald-200 dark:border-emerald-800/40'
                          : 'bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300'
                      }`}
                    >
                      {isUrgent && <AlertTriangle size={11} strokeWidth={2.8} />}
                      {isOfficial && <ShieldCheck size={11} strokeWidth={2.8} />}
                      <span>{isUrgent ? 'URGENT MAINTENANCE' : isOfficial ? 'OFFICIAL CIRCULAR' : 'COMMUNITY ADVISORY'}</span>
                    </span>

                    <span className="text-[10px] font-mono font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1">
                      <Clock size={11} />
                      <span>{n.dateStr}</span>
                    </span>
                  </div>

                  {/* Title & Summary */}
                  <div className="pl-1 mt-2.5">
                    <h3 className="font-extrabold text-[13px] text-slate-900 dark:text-white leading-snug group-hover:text-[#04bb49] transition-colors">
                      {n.title}
                    </h3>
                    <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium mt-1 leading-relaxed line-clamp-2">
                      {n.summary}
                    </p>
                  </div>

                  {/* Resolution Voting Chip Preview (if AGM poll attached) */}
                  {n.hasVoting && (
                    <div className="pl-1 mt-2.5">
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl bg-emerald-50/80 dark:bg-emerald-950/30 border border-emerald-200/70 dark:border-emerald-900/30 text-emerald-800 dark:text-emerald-300 text-[10.5px] font-bold">
                        <Vote size={13} className="text-[#04bb49]" />
                        <span>Interactive Vote Open ({((n.votesCount?.yes || 0) + (n.votesCount?.no || 0))} residents voted)</span>
                      </div>
                    </div>
                  )}

                  {/* Card Footer: Metadata & CTA Button */}
                  <div className="flex items-center justify-between pt-3 mt-3 pl-1 border-t border-slate-100 dark:border-obsidian-800 text-[11px]">
                    <div className="flex items-center gap-2 truncate max-w-[210px]">
                      <div className="w-5 h-5 rounded-md bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500 shrink-0">
                        <Building size={11} />
                      </div>
                      <span className="font-bold text-slate-500 dark:text-slate-400 truncate">
                        {n.department}
                      </span>
                    </div>

                    <div className="flex items-center gap-1 text-[#04bb49] font-black group-hover:translate-x-0.5 transition-transform">
                      <span>Open Notice</span>
                      <ChevronRight size={14} strokeWidth={2.4} />
                    </div>
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-8 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 text-center flex flex-col items-center gap-2">
              <div className="w-12 h-12 rounded-2xl bg-slate-100 dark:bg-obsidian-800 text-slate-400 flex items-center justify-center">
                <Inbox size={22} />
              </div>
              <h4 className="text-sm font-bold text-slate-800 dark:text-slate-200">No circulars match your filter</h4>
              <p className="text-xs text-slate-500 max-w-[220px]">Try clearing your search query or switching to &quot;All Notices&quot;.</p>
              <button
                type="button"
                onClick={() => {
                  setFilter('all');
                  setSearchQuery('');
                }}
                className="mt-2 text-xs font-bold text-[#04bb49] hover:underline"
              >
                Reset Filters
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
