import React, { useState } from 'react';
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
  ChevronRight
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';

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
}

const SAMPLE_NOTICES: SocietyNotice[] = [
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
  },
];

interface NoticesCircularsScreenProps {
  onBack: () => void;
}

export const NoticesCircularsScreen: React.FC<NoticesCircularsScreenProps> = ({ onBack }) => {
  const [filter, setFilter] = useState<'all' | 'urgent' | 'official'>('all');
  const [selectedNotice, setSelectedNotice] = useState<SocietyNotice | null>(null);
  const [userVote, setUserVote] = useState<'yes' | 'no' | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const filteredNotices = SAMPLE_NOTICES.filter((n) => {
    if (filter === 'urgent') return n.priority === 'urgent';
    if (filter === 'official') return n.priority === 'official';
    return true;
  });

  const handleCastVote = (choice: 'yes' | 'no') => {
    setUserVote(choice);
    showToast(`✓ Your vote (${choice.toUpperCase()}) recorded cryptographically for Flat 1204`);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-20 text-left animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-obsidian-800">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
              title="Back to Society Hub"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                OFFICIAL COMMUNICATIONS
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Notices & Circulars
              </h2>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center">
            <Megaphone size={16} />
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex gap-1.5 py-0.5">
          {[
            { id: 'all', label: 'All Notices' },
            { id: 'urgent', label: '🚨 Urgent Maintenance' },
            { id: 'official', label: '🏛️ Official MC' },
          ].map((pill) => (
            <button
              key={pill.id}
              type="button"
              onClick={() => setFilter(pill.id as any)}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all press-scale ${
                filter === pill.id
                  ? 'bg-cobalt-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {pill.label}
            </button>
          ))}
        </div>

        {/* Notices Cards List */}
        <div className="flex flex-col gap-3">
          {filteredNotices.map((n) => (
            <div
              key={n.id}
              onClick={() => setSelectedNotice(n)}
              className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-2.5 cursor-pointer hover:border-cobalt-400 dark:hover:border-cobalt-600 transition-all press-scale"
            >
              <div className="flex items-center justify-between">
                <Badge
                  variant={n.priority === 'urgent' ? 'crimson' : n.priority === 'official' ? 'cobalt' : 'muted'}
                  size="sm"
                >
                  {n.priority === 'urgent' ? 'URGENT NOTICE' : n.priority === 'official' ? 'OFFICIAL CIRCULAR' : 'ADVISORY'}
                </Badge>
                <span className="text-[10px] font-mono font-bold text-slate-400">
                  {n.dateStr}
                </span>
              </div>

              <div>
                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white leading-snug">
                  {n.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium mt-1 leading-relaxed line-clamp-2">
                  {n.summary}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-obsidian-800 text-[11px]">
                <span className="font-bold text-slate-400 truncate max-w-[190px]">
                  {n.department}
                </span>

                <span className="text-cobalt-600 dark:text-cobalt-400 font-bold flex items-center gap-0.5">
                  <span>Read Notice</span>
                  <ChevronRight size={13} />
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Full Circular Details Modal */}
      {selectedNotice && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] max-h-[85vh] overflow-y-auto no-scrollbar p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <Badge
                variant={selectedNotice.priority === 'urgent' ? 'crimson' : 'cobalt'}
                size="sm"
              >
                {selectedNotice.priority.toUpperCase()}
              </Badge>
              <button
                type="button"
                onClick={() => setSelectedNotice(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                {selectedNotice.department}
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                {selectedNotice.title}
              </h3>
              <p className="text-[10px] font-mono text-slate-400 mt-1">
                Issued: {selectedNotice.dateStr}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 text-xs text-slate-700 dark:text-slate-300 leading-relaxed whitespace-pre-line">
              {selectedNotice.fullBody}
            </div>

            {/* In-Circular Voting / Poll if attached */}
            {selectedNotice.hasVoting && selectedNotice.pollQuestion && (
              <div className="p-3.5 rounded-2xl bg-cobalt-50/70 dark:bg-cobalt-950/40 border border-cobalt-200/80 dark:border-cobalt-900/40 flex flex-col gap-2.5">
                <div className="flex items-center gap-1.5 text-cobalt-700 dark:text-cobalt-300 font-bold text-xs">
                  <Vote size={15} />
                  <span>AGM RESOLUTION VOTE</span>
                </div>
                <p className="text-[11px] font-semibold text-slate-800 dark:text-slate-200">
                  {selectedNotice.pollQuestion}
                </p>

                <div className="flex items-center gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => handleCastVote('yes')}
                    className={`flex-1 h-9 rounded-xl font-bold text-xs transition-all ${
                      userVote === 'yes'
                        ? 'bg-emerald-600 text-white shadow-sm'
                        : 'bg-white dark:bg-obsidian-800 text-slate-800 dark:text-white border border-slate-200 dark:border-obsidian-700'
                    }`}
                  >
                    ✓ Yes ({selectedNotice.votesCount?.yes || 0})
                  </button>
                  <button
                    type="button"
                    onClick={() => handleCastVote('no')}
                    className={`flex-1 h-9 rounded-xl font-bold text-xs transition-all ${
                      userVote === 'no'
                        ? 'bg-crimson-600 text-white shadow-sm'
                        : 'bg-white dark:bg-obsidian-800 text-slate-800 dark:text-white border border-slate-200 dark:border-obsidian-700'
                    }`}
                  >
                    ✗ No ({selectedNotice.votesCount?.no || 0})
                  </button>
                </div>
              </div>
            )}

            {/* Official Signoff Stamp */}
            <div className="p-2.5 rounded-xl bg-slate-100/70 dark:bg-obsidian-800/60 text-[10px] text-slate-500 flex items-center justify-between font-mono">
              <span>AUTHORIZED BY:</span>
              <span className="font-bold text-slate-800 dark:text-slate-200">{selectedNotice.signedBy}</span>
            </div>

            {/* Download PDF button */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-obsidian-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => showToast(`Downloaded: ${selectedNotice.pdfFileName}`)}
                className="flex-1 flex items-center justify-center gap-1 text-xs"
              >
                <Download size={14} />
                <span>Download PDF</span>
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => setSelectedNotice(null)}
                className="flex-1"
              >
                Close Notice
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
