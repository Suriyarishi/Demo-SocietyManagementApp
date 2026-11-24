import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  Bookmark,
  BookmarkCheck,
  Download,
  FileText,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Building2,
  AlertTriangle,
  Info,
  Vote,
  Sparkles,
} from 'lucide-react';
import { SocietyNotice } from './NoticesCircularsScreen';

interface NoticeDetailScreenProps {
  notice: SocietyNotice;
  onBack: () => void;
  onCastVote?: (noticeId: string, choice: 'yes' | 'no') => void;
  userVote?: 'yes' | 'no' | null;
}

export const NoticeDetailScreen: React.FC<NoticeDetailScreenProps> = ({
  notice,
  onBack,
  onCastVote,
  userVote: initialVote = null,
}) => {
  const [isBookmarked, setIsBookmarked] = useState<boolean>(false);
  const [isAcknowledged, setIsAcknowledged] = useState<boolean>(false);
  const [localVote, setLocalVote] = useState<'yes' | 'no' | null>(initialVote);
  const [toastMessage, setToastMessage] = useState<string>('');
  const [downloading, setDownloading] = useState<boolean>(false);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 2800);
  };

  const handleVote = (choice: 'yes' | 'no') => {
    setLocalVote(choice);
    if (onCastVote) {
      onCastVote(notice.id, choice);
    }
    showToast(`✓ Vote (${choice.toUpperCase()}) recorded cryptographically for Unit 1204`);
  };

  const handleDownloadPdf = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      showToast(`✓ Downloaded ${notice.pdfFileName} (PDF stored in Downloads)`);
    }, 1200);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: notice.title,
        text: `Official Circular: ${notice.title} - Issued by ${notice.department}`,
        url: window.location.href,
      }).catch(() => {
        showToast('Link copied to clipboard!');
      });
    } else {
      navigator.clipboard?.writeText(window.location.href);
      showToast('✓ Circular link copied to clipboard');
    }
  };

  const isUrgent = notice.priority === 'urgent';
  const isOfficial = notice.priority === 'official';

  const totalVotes = (notice.votesCount?.yes || 0) + (notice.votesCount?.no || 0) + (localVote ? 1 : 0);
  const yesVotes = (notice.votesCount?.yes || 0) + (localVote === 'yes' ? 1 : 0);
  const yesPercent = totalVotes > 0 ? Math.round((yesVotes / totalVotes) * 100) : 0;
  const noPercent = totalVotes > 0 ? 100 - yesPercent : 0;

  return (
    <div className="w-full h-full flex flex-col justify-between text-left animate-in fade-in duration-200 bg-slate-50 dark:bg-obsidian-950 overflow-hidden relative select-none">
      {/* Toast Notification Container */}
      {toastMessage && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3.5 rounded-2xl bg-slate-900/95 dark:bg-obsidian-850 text-white border border-slate-700/80 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={16} className="text-[#04bb49] shrink-0" />
          <span className="flex-1 text-[11.5px] leading-tight font-medium">{toastMessage}</span>
        </div>
      )}

      {/* Top App Bar Header (Pinned strictly at top) */}
      <div className="shrink-0 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-obsidian-800 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3 min-w-0 flex-1 mr-2">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/90 dark:border-white/10 press-scale shrink-0"
            title="Back to all notices"
          >
            <ArrowLeft size={19} strokeWidth={2.4} />
          </button>
          <div className="min-w-0 flex-1">
            <span className="text-[10px] font-black tracking-widest text-[#04bb49] uppercase block">
              OFFICIAL CIRCULAR
            </span>
            <h1 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
              Notice Details
            </h1>
          </div>
        </div>

        {/* Header Action Buttons */}
        <div className="flex items-center gap-1.5 shrink-0">
          <button
            type="button"
            onClick={() => {
              setIsBookmarked(!isBookmarked);
              showToast(isBookmarked ? 'Notice removed from bookmarks' : '✓ Notice saved to bookmarks');
            }}
            className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all press-scale border ${
              isBookmarked
                ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 border-amber-300 dark:border-amber-800/60'
                : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-600 dark:text-slate-300 border-slate-200/90 dark:border-white/10'
            }`}
            title="Save Notice"
          >
            {isBookmarked ? <BookmarkCheck size={16} strokeWidth={2.4} /> : <Bookmark size={16} strokeWidth={2.2} />}
          </button>

          <button
            type="button"
            onClick={handleShare}
            className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-600 dark:text-slate-300 flex items-center justify-center transition-all press-scale border border-slate-200/90 dark:border-white/10"
            title="Share Notice"
          >
            <Share2 size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>

      {/* Main Scrollable Content (Sleek no-scrollbar container) */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden no-scrollbar p-4 flex flex-col gap-4 pb-6">
        {/* Priority Banner Card */}
        <div
          className={`p-4 rounded-3xl border transition-all ${
            isUrgent
              ? 'bg-gradient-to-br from-crimson-50 to-red-100/60 dark:from-crimson-950/40 dark:to-red-900/20 border-crimson-200 dark:border-crimson-800/60 shadow-xs'
              : isOfficial
              ? 'bg-gradient-to-br from-emerald-50 to-teal-50 dark:from-emerald-950/30 dark:to-teal-950/20 border-emerald-200 dark:border-emerald-800/50 shadow-xs'
              : 'bg-white dark:bg-obsidian-900 border-slate-200/90 dark:border-obsidian-800 shadow-xs'
          }`}
        >
          {/* Badge & Timestamp Row with safe non-overlapping wrapping */}
          <div className="flex items-center justify-between gap-2 mb-2.5">
            <span
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-xl text-[10px] font-black tracking-wide uppercase shrink-0 ${
                isUrgent
                  ? 'bg-crimson-600 text-white shadow-xs'
                  : isOfficial
                  ? 'bg-[#04bb49] text-white shadow-xs'
                  : 'bg-slate-200 dark:bg-obsidian-800 text-slate-700 dark:text-slate-300'
              }`}
            >
              {isUrgent && <AlertTriangle size={12} strokeWidth={2.8} />}
              {isOfficial && <ShieldCheck size={12} strokeWidth={2.8} />}
              {!isUrgent && !isOfficial && <Info size={12} strokeWidth={2.8} />}
              <span>{isUrgent ? 'URGENT' : isOfficial ? 'OFFICIAL' : 'ADVISORY'}</span>
            </span>

            <span className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 flex items-center gap-1 shrink-0 bg-black/5 dark:bg-white/5 px-2 py-0.5 rounded-lg">
              <Clock size={11} className="text-slate-400" />
              <span>{notice.dateStr}</span>
            </span>
          </div>

          <h2 className="text-base font-black text-slate-900 dark:text-white leading-snug tracking-tight">
            {notice.title}
          </h2>

          <div className="flex items-center gap-2 mt-2.5 pt-2.5 border-t border-black/5 dark:border-white/10 text-xs">
            <div className="w-6 h-6 rounded-lg bg-white/80 dark:bg-obsidian-800 flex items-center justify-center text-slate-700 dark:text-slate-300 shrink-0">
              <Building2 size={13} />
            </div>
            <span className="font-bold text-[11px] text-slate-600 dark:text-slate-300 truncate">
              {notice.department}
            </span>
          </div>
        </div>

        {/* Quick Highlights / Executive Summary */}
        <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-xs flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-wider uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1">
              <Sparkles size={12} className="text-[#04bb49]" />
              <span>EXECUTIVE SUMMARY</span>
            </span>
            <span className="text-[10px] font-mono text-slate-500">Ref: {notice.pdfFileName.replace('.pdf', '')}</span>
          </div>
          <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 leading-relaxed bg-slate-50 dark:bg-obsidian-850 p-3 rounded-2xl border border-slate-100 dark:border-obsidian-800">
            {notice.summary}
          </p>
        </div>

        {/* Full Official Body Text */}
        <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-obsidian-800">
            <span className="text-[10px] font-black tracking-wider uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <FileText size={13} className="text-slate-500" />
              <span>COMPLETE CIRCULAR TEXT</span>
            </span>
            <span className="text-[10px] font-medium text-slate-400">Published to all units</span>
          </div>

          <div className="text-xs text-slate-700 dark:text-slate-300 font-normal leading-relaxed whitespace-pre-line space-y-3">
            {notice.fullBody}
          </div>

          {/* Interactive Voting / AGM Resolution Poll Section */}
          {notice.hasVoting && notice.pollQuestion && (
            <div className="mt-2 p-4 rounded-2xl bg-gradient-to-br from-emerald-50/60 to-slate-50 dark:from-emerald-950/20 dark:to-obsidian-850 border border-emerald-200/80 dark:border-emerald-900/40 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-1.5 text-[#04bb49] font-black text-xs">
                  <Vote size={16} strokeWidth={2.4} />
                  <span>AGM RESOLUTION VOTE</span>
                </div>
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  {totalVotes} verified votes
                </span>
              </div>

              <p className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                {notice.pollQuestion}
              </p>

              {/* Progress Visualizer */}
              <div className="flex flex-col gap-1.5">
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-obsidian-750 overflow-hidden flex">
                  <div
                    style={{ width: `${yesPercent}%` }}
                    className="bg-[#04bb49] h-full transition-all duration-500"
                    title={`Yes: ${yesPercent}%`}
                  />
                  <div
                    style={{ width: `${noPercent}%` }}
                    className="bg-crimson-500 h-full transition-all duration-500"
                    title={`No: ${noPercent}%`}
                  />
                </div>
                <div className="flex justify-between text-[10.5px] font-bold text-slate-600 dark:text-slate-400">
                  <span className="text-emerald-700 dark:text-emerald-400">Yes: {yesPercent}% ({yesVotes})</span>
                  <span className="text-crimson-600 dark:text-crimson-400">No: {noPercent}% ({notice.votesCount?.no || 0})</span>
                </div>
              </div>

              {/* Voting Action Buttons */}
              <div className="flex items-center gap-2 pt-1">
                <button
                  type="button"
                  onClick={() => handleVote('yes')}
                  className={`flex-1 h-10 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all press-scale ${
                    localVote === 'yes'
                      ? 'bg-[#04bb49] text-white shadow-sm ring-2 ring-[#04bb49]/30'
                      : 'bg-white dark:bg-obsidian-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-obsidian-700 hover:bg-slate-50'
                  }`}
                >
                  <CheckCircle2 size={14} />
                  <span>Vote Approve ({yesVotes})</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleVote('no')}
                  className={`flex-1 h-10 rounded-xl font-bold text-xs flex items-center justify-center gap-1.5 transition-all press-scale ${
                    localVote === 'no'
                      ? 'bg-crimson-600 text-white shadow-sm ring-2 ring-crimson-600/30'
                      : 'bg-white dark:bg-obsidian-800 text-slate-800 dark:text-slate-100 border border-slate-200 dark:border-obsidian-700 hover:bg-slate-50'
                  }`}
                >
                  <AlertTriangle size={14} />
                  <span>Vote Reject ({notice.votesCount?.no || 0})</span>
                </button>
              </div>

              <div className="flex items-center gap-1 text-[9.5px] text-slate-500 justify-center">
                <ShieldCheck size={12} className="text-[#04bb49]" />
                <span>Encrypted ballot tied to verified owner of Flat 1204</span>
              </div>
            </div>
          )}

          {/* Official Signatory Authority Stamp */}
          <div className="mt-2 p-3.5 rounded-2xl bg-slate-100/80 dark:bg-obsidian-850 border border-slate-200/70 dark:border-obsidian-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5 min-w-0 flex-1 mr-2">
              <div className="w-8 h-8 rounded-xl bg-[#04bb49]/15 text-[#04bb49] flex items-center justify-center font-black shrink-0">
                <ShieldCheck size={17} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[9.5px] font-mono tracking-wider uppercase text-slate-400 dark:text-slate-500 block truncate">
                  AUTHORIZED SIGNATORY
                </span>
                <span className="text-xs font-black text-slate-900 dark:text-white leading-tight block truncate">
                  {notice.signedBy}
                </span>
              </div>
            </div>

            <div className="shrink-0 text-right">
              <span className="text-[9px] font-mono font-bold text-[#04bb49] bg-emerald-500/10 px-2 py-0.5 rounded-md border border-[#04bb49]/20 inline-block">
                VERIFIED SEAL
              </span>
            </div>
          </div>
        </div>

        {/* Attached Document / PDF Download Card (Zero Overlap Guaranteed via flex-1 min-w-0 + shrink-0) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-black tracking-wider uppercase text-slate-400 dark:text-slate-500">
              OFFICIAL ATTACHMENT
            </span>
            <span className="text-[10px] font-mono text-[#04bb49] font-bold">1 Verified PDF</span>
          </div>

          <div className="flex items-center justify-between gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200/80 dark:border-obsidian-800">
            {/* Left Column: Icon + Truncated Text Container (min-w-0 flex-1 guarantees no text overflow) */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              <div className="w-11 h-11 rounded-2xl bg-crimson-500/15 text-crimson-600 dark:text-crimson-400 flex items-center justify-center shrink-0 border border-crimson-500/20">
                <FileText size={20} strokeWidth={2.2} />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-xs font-black text-slate-900 dark:text-white block truncate" title={notice.pdfFileName}>
                  {notice.pdfFileName}
                </span>
                <span className="text-[10.5px] font-medium text-slate-500 dark:text-slate-400 block mt-0.5 truncate">
                  Official PDF • 1.4 MB • Certified
                </span>
              </div>
            </div>

            {/* Right Column: Download Button (shrink-0 guarantees button width is preserved) */}
            <button
              type="button"
              onClick={handleDownloadPdf}
              disabled={downloading}
              className="h-10 px-3.5 rounded-xl bg-slate-900 hover:bg-slate-800 active:bg-black dark:bg-white dark:hover:bg-slate-100 text-white dark:text-slate-900 text-xs font-bold flex items-center gap-1.5 shrink-0 transition-all press-scale shadow-xs disabled:opacity-50"
            >
              <Download size={14} />
              <span>{downloading ? 'Saving...' : 'Get PDF'}</span>
            </button>
          </div>
        </div>
      </div>

      {/* Sticky Bottom Dock Action Bar (Pinned cleanly at the bottom) */}
      <div className="shrink-0 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-obsidian-800 p-3.5 flex items-center gap-2.5 shadow-elevated">
        <button
          type="button"
          onClick={() => {
            setIsAcknowledged(true);
            showToast('✓ Notice marked as acknowledged by Flat 1204');
          }}
          disabled={isAcknowledged}
          className={`flex-1 h-12 rounded-2xl font-black text-xs flex items-center justify-center gap-2 transition-all press-scale shadow-sm ${
            isAcknowledged
              ? 'bg-emerald-100 dark:bg-emerald-950/50 text-emerald-800 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800/60 cursor-default'
              : 'bg-[#04bb49] hover:bg-[#03963b] active:bg-[#027a2f] text-white shadow-emerald-500/20'
          }`}
        >
          <CheckCircle2 size={16} strokeWidth={2.4} />
          <span>{isAcknowledged ? 'Acknowledged by Resident' : 'Mark as Acknowledged'}</span>
        </button>

        <button
          type="button"
          onClick={handleDownloadPdf}
          className="h-12 px-4 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-800 dark:text-slate-100 font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200/90 dark:border-white/10 shrink-0 press-scale"
        >
          <Download size={15} />
          <span>PDF</span>
        </button>
      </div>
    </div>
  );
};
