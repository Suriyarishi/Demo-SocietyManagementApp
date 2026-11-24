import React, { useState, useMemo } from 'react';
import {
  ArrowLeft,
  X,
  Share2,
  Bookmark,
  BookmarkCheck,
  Search,
  Clock,
  Inbox,
  CheckCircle2
} from 'lucide-react';
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
  const [bookmarkedIds, setBookmarkedIds] = useState<Set<string>>(new Set());
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

  const handleToggleBookmark = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setBookmarkedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
        showToast('Notice removed from marklist');
      } else {
        next.add(id);
        showToast('✓ Notice added to marklist');
      }
      return next;
    });
  };

  const handleShareNotice = (notice: SocietyNotice, e: React.MouseEvent) => {
    e.stopPropagation();
    if (navigator.share) {
      navigator.share({
        title: notice.title,
        text: `Official Circular: ${notice.title}`,
        url: window.location.href,
      }).catch(() => {
        showToast('✓ Circular link copied to clipboard');
      });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('✓ Circular link copied to clipboard');
    }
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

  // If a notice is selected, show the dedicated full-page NoticeDetailScreen
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

        {/* Minimal Notices Cards Stream (Heading, Description, Time & Date, Share & Marklist icons only) */}
        <div className="flex flex-col gap-3">
          {filteredNotices.length > 0 ? (
            filteredNotices.map((n) => {
              const isUrgent = n.priority === 'urgent';
              const isBookmarked = bookmarkedIds.has(n.id);

              return (
                <div
                  key={n.id}
                  onClick={() => setSelectedNotice(n)}
                  className={`p-4 rounded-3xl bg-white dark:bg-obsidian-900 border transition-all duration-200 cursor-pointer shadow-xs hover:shadow-md press-scale group relative overflow-hidden ${
                    isUrgent
                      ? 'border-crimson-200/80 dark:border-crimson-900/40 hover:border-crimson-400'
                      : 'border-slate-200/80 dark:border-obsidian-800 hover:border-[#04bb49]/60'
                  }`}
                >
                  {/* Top Row: Time & Date on Left, Share & Marklist/Bookmark on Right */}
                  <div className="flex items-center justify-between gap-2">
                    {/* Time and Date with subtle urgency pulse indicator */}
                    <div className="flex items-center gap-1.5 min-w-0">
                      {isUrgent ? (
                        <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse shrink-0" title="Urgent Notice" />
                      ) : (
                        <Clock size={12} className="text-slate-400 shrink-0" />
                      )}
                      <span className="text-[11px] font-mono font-medium text-slate-500 dark:text-slate-400 truncate">
                        {n.dateStr}
                      </span>
                    </div>

                    {/* Quick Action Icons: Share & Marklist */}
                    <div className="flex items-center gap-1 shrink-0">
                      <button
                        type="button"
                        onClick={(e) => handleShareNotice(n, e)}
                        className="w-8 h-8 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-obsidian-800 transition-colors press-scale"
                        title="Share circular"
                        aria-label="Share circular"
                      >
                        <Share2 size={14} strokeWidth={2.2} />
                      </button>

                      <button
                        type="button"
                        onClick={(e) => handleToggleBookmark(n.id, e)}
                        className={`w-8 h-8 rounded-xl flex items-center justify-center transition-colors press-scale ${
                          isBookmarked
                            ? 'text-amber-500 bg-amber-50 dark:bg-amber-950/30'
                            : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-obsidian-800'
                        }`}
                        title={isBookmarked ? 'Remove from marklist' : 'Add to marklist'}
                        aria-label={isBookmarked ? 'Remove from marklist' : 'Add to marklist'}
                      >
                        {isBookmarked ? (
                          <BookmarkCheck size={14} strokeWidth={2.4} />
                        ) : (
                          <Bookmark size={14} strokeWidth={2.2} />
                        )}
                      </button>
                    </div>
                  </div>

                  {/* Heading */}
                  <h3 className="font-extrabold text-[13.5px] sm:text-[14px] text-slate-900 dark:text-white leading-snug group-hover:text-[#04bb49] transition-colors mt-2">
                    {n.title}
                  </h3>

                  {/* Description */}
                  <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-normal leading-relaxed line-clamp-2 mt-1">
                    {n.summary}
                  </p>
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
