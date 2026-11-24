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
  Building2,
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
import { SocietyNotice, SAMPLE_NOTICES } from './noticesData';
export type { SocietyNotice };

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
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-24 text-left animate-in fade-in duration-200 bg-slate-50 dark:bg-obsidian-950 no-scrollbar">
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
                  className={`relative rounded-[22px] p-4 transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md press-scale group overflow-hidden border ${
                    isUrgent
                      ? 'bg-gradient-to-br from-red-500/[0.04] via-white to-white dark:from-red-950/25 dark:via-obsidian-900 dark:to-obsidian-900 border-crimson-200/90 dark:border-crimson-900/40 hover:border-crimson-400 dark:hover:border-crimson-600'
                      : isOfficial
                      ? 'bg-gradient-to-br from-emerald-500/[0.04] via-white to-white dark:from-emerald-950/25 dark:via-obsidian-900 dark:to-obsidian-900 border-emerald-200/90 dark:border-emerald-900/40 hover:border-[#04bb49]'
                      : 'bg-white dark:bg-obsidian-900 border-slate-200/90 dark:border-obsidian-800 hover:border-slate-300 dark:hover:border-slate-700'
                  }`}
                >
                  {/* Subtle top indicator bar */}
                  <div
                    className={`absolute top-0 left-4 right-4 h-[2px] rounded-full ${
                      isUrgent
                        ? 'bg-gradient-to-r from-transparent via-crimson-500 to-transparent opacity-90'
                        : isOfficial
                        ? 'bg-gradient-to-r from-transparent via-[#04bb49] to-transparent opacity-90'
                        : 'hidden'
                    }`}
                  />

                  {/* Top Row: Category Badge + Clean Single-line Timestamp */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Priority Tag */}
                    {isUrgent && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-crimson-500/10 dark:bg-crimson-950/60 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20 text-[10.5px] font-black uppercase tracking-wider shrink-0">
                        <span className="relative flex h-2 w-2">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-crimson-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-2 w-2 bg-crimson-600"></span>
                        </span>
                        <span>Urgent Maintenance</span>
                      </div>
                    )}

                    {isOfficial && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[#04bb49]/10 dark:bg-emerald-950/60 text-[#04bb49] border border-[#04bb49]/20 text-[10.5px] font-black uppercase tracking-wider shrink-0">
                        <ShieldCheck size={12} strokeWidth={2.6} />
                        <span>Official Circular</span>
                      </div>
                    )}

                    {!isUrgent && !isOfficial && (
                      <div className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300 text-[10.5px] font-bold tracking-wider shrink-0">
                        <Sparkles size={11} className="text-slate-400" />
                        <span>Advisory</span>
                      </div>
                    )}

                    {/* Single-Line Timestamp Pill */}
                    <div className="flex items-center gap-1 text-[10.5px] font-mono font-medium text-slate-500 dark:text-slate-400 bg-slate-100/70 dark:bg-obsidian-800/70 px-2.5 py-0.5 rounded-full border border-slate-200/60 dark:border-white/5 whitespace-nowrap shrink-0">
                      <Clock size={11} className="text-slate-400 shrink-0" />
                      <span>{n.dateStr}</span>
                    </div>
                  </div>

                  {/* Title & Summary */}
                  <div className="mt-2.5">
                    <h3 className="text-[14px] font-extrabold text-slate-900 dark:text-white leading-[1.38] tracking-tight group-hover:text-[#04bb49] transition-colors">
                      {n.title}
                    </h3>
                    <p className="text-[12px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed line-clamp-2 mt-1.5">
                      {n.summary}
                    </p>
                  </div>

                  {/* Context Micro-Badges */}
                  <div className="flex items-center gap-1.5 flex-wrap pt-2.5">
                    {n.impactTag && (
                      <span className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-bold ${
                        isUrgent
                          ? 'bg-crimson-500/10 text-crimson-600 dark:text-crimson-400 border border-crimson-500/20'
                          : isOfficial
                          ? 'bg-emerald-500/10 text-emerald-700 dark:text-emerald-400 border border-emerald-500/20'
                          : 'bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300'
                      }`}>
                        <AlertTriangle size={11} className={isUrgent ? 'text-crimson-500' : 'text-emerald-500'} />
                        <span>{n.impactTag}</span>
                      </span>
                    )}

                    {n.affectedScope && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-semibold bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300">
                        <Building2 size={11} className="text-slate-400" />
                        <span>{n.affectedScope}</span>
                      </span>
                    )}

                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-semibold bg-slate-100 dark:bg-obsidian-800 text-slate-500 dark:text-slate-400">
                      <FileText size={11} className="text-slate-400" />
                      <span>PDF</span>
                    </span>

                    {n.hasVoting && (
                      <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md text-[10.5px] font-bold bg-[#04bb49]/15 text-[#04bb49] border border-[#04bb49]/20">
                        <Vote size={11} />
                        <span>Vote Open</span>
                      </span>
                    )}
                  </div>

                  {/* Card Footer: Department & Interactive CTA Button */}
                  <div className="flex items-center justify-between pt-3 mt-3 border-t border-slate-100 dark:border-obsidian-800 text-[11px]">
                    <div className="flex items-center gap-1.5 min-w-0 flex-1 mr-2 text-slate-500 dark:text-slate-400 truncate">
                      <span className="font-semibold text-slate-700 dark:text-slate-300 truncate">{n.department}</span>
                      <span className="text-slate-300 dark:text-slate-600">•</span>
                      <span className="shrink-0">{n.readTime || '2 min read'}</span>
                    </div>

                    <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-slate-100 group-hover:bg-[#04bb49] dark:bg-obsidian-800 dark:group-hover:bg-[#04bb49] text-slate-700 group-hover:text-white dark:text-slate-200 dark:group-hover:text-white text-[11px] font-black shrink-0 transition-all duration-200 shadow-2xs">
                      <span>View Notice</span>
                      <ChevronRight size={13} strokeWidth={2.8} className="group-hover:translate-x-0.5 transition-transform" />
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
