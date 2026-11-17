import React, { useState } from 'react';
import {
  Building2,
  Coffee,
  MessagesSquare,
  BookUser,
  HardHat,
  Megaphone,
  Ticket,
  Smartphone,
  Store,
  ArrowUpRight,
  ChevronRight,
  Calendar,
  CheckCircle2,
  Clock,
  Sparkles,
  Phone,
  Search,
  X,
  FileText,
  Users,
  ShieldCheck,
  ArrowLeft
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { Clubhouse3D } from '../../components/3d/Vector3DElements';

interface SocietyHubScreenProps {
  onBack?: () => void;
  onOpenDailyStaff: () => void;
  onOpenGatePass: () => void;
  onOpenAmenities: () => void;
  onOpenNotices: () => void;
  onOpenForum: () => void;
  onOpenDirectory: () => void;
  onOpenPinlessEntry: () => void;
  onOpenMarketplace: () => void;
}

export const SocietyHubScreen: React.FC<SocietyHubScreenProps> = ({
  onBack,
  onOpenDailyStaff,
  onOpenGatePass,
  onOpenAmenities,
  onOpenNotices,
  onOpenForum,
  onOpenDirectory,
  onOpenPinlessEntry,
  onOpenMarketplace,
}) => {
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const amenitiesList = [
    { name: 'Clubhouse Banquet Hall', slot: 'Available Tonight', capacity: '150 Guests', price: 'Free' },
    { name: 'Olympic Swimming Pool', slot: 'Open (6 AM – 9 PM)', capacity: 'Lane 1-4', price: 'Free' },
    { name: 'Badminton Court 1 & 2', slot: 'Slots open from 5 PM', capacity: 'Synthetic Mat', price: 'Free' },
    { name: 'Squash Court', slot: 'Slot: 6:00 PM – 7:00 PM', capacity: 'Air Conditioned', price: 'Free' },
  ];

  const noticesList = [
    {
      title: 'Scheduled Overhead Water Tank Cleaning (Tower 1 & 2)',
      date: 'Tomorrow, 9:00 AM – 1:00 PM',
      priority: 'Urgent',
      dept: 'Facility Maintenance',
    },
    {
      title: 'Annual General Body Meeting (AGM 2026) Circular',
      date: 'Sunday, 30 Nov • 10:30 AM',
      priority: 'Official',
      dept: 'Managing Committee',
    },
    {
      title: 'Electric Vehicle (EV) Charging Station Installation in B2',
      date: 'Notice #EV-2026/08',
      priority: 'General',
      dept: 'Green Energy Committee',
    },
  ];

  const forumPosts = [
    {
      author: 'Society Admin (Water Maintenance)',
      time: '2h ago',
      title: 'Water Supply Maintenance — Tomorrow 10:00 AM - 2:00 PM',
      replies: 8,
      likes: 24,
    },
    {
      author: 'Shweta (Tower 13 - 0801)',
      time: '1d ago',
      title: 'Luvlap highchair · ₹500 (Bought June 2024, Pickup only)',
      replies: 3,
      likes: 12,
    },
  ];

  return (
    <div className="w-full min-h-full flex flex-col justify-between pb-24 text-left animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="px-4 py-2.5 bg-white dark:bg-obsidian-900 border-b border-slate-200/80 dark:border-obsidian-800 flex items-center justify-between sticky top-0 z-30">
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
                  COMMUNITY & RESIDENCE
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                Society Living Hub
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenDirectory}
            className="h-8 px-2.5 rounded-xl bg-crimson-50 hover:bg-crimson-100 dark:bg-crimson-950/60 dark:hover:bg-crimson-900/60 border border-crimson-200 dark:border-crimson-800/40 text-crimson-600 dark:text-crimson-400 text-xs font-bold flex items-center gap-1 transition-colors shrink-0"
          >
            <span>Directory</span>
            <ArrowUpRight size={13} />
          </button>
        </div>

        {/* 8 Feature Action Grid (Matching User Reference Image) */}
        <div className="px-3.5">
          <div className="p-4 rounded-[28px] bg-gradient-to-b from-[#EAF9F3] via-[#F4FDF9] to-[#E7F8F1] dark:from-[#081812] dark:via-[#07130F] dark:to-[#081712] border border-[#BDEBD9]/80 dark:border-emerald-900/40 shadow-sm flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs px-1">
              <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E6555] dark:text-emerald-400">
                SOCIETY LIVING HUB • 8 FEATURES
              </span>
              <button
                type="button"
                onClick={onOpenNotices}
                className="text-[11px] font-bold text-crimson-600 dark:text-crimson-400 hover:underline flex items-center gap-0.5"
              >
                <span>Community Suite</span>
                <ArrowUpRight size={13} />
              </button>
            </div>

            {/* 8 Circular Action Buttons (2 Rows of 4) */}
            <div className="grid grid-cols-4 gap-y-3.5 gap-x-2 py-1">
              {/* 1. Amenities */}
              <button
                type="button"
                onClick={onOpenAmenities}
                className="flex flex-col items-center text-center gap-1.5 press-scale"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                  <Coffee size={20} strokeWidth={2.0} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Amenities
                </span>
              </button>

              {/* 2. Society Forum */}
              <button
                type="button"
                onClick={onOpenForum}
                className="flex flex-col items-center text-center gap-1.5 press-scale"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                  <MessagesSquare size={19} strokeWidth={2.0} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Society Forum
                </span>
              </button>

              {/* 3. Directory */}
              <button
                type="button"
                onClick={onOpenDirectory}
                className="flex flex-col items-center text-center gap-1.5 press-scale"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                  <BookUser size={20} strokeWidth={2.0} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Directory
                </span>
              </button>

              {/* 4. Daily Helps */}
              <button
                type="button"
                onClick={onOpenDailyStaff}
                className="flex flex-col items-center text-center gap-1.5 press-scale"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                  <HardHat size={20} strokeWidth={2.0} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Daily Helps
                </span>
              </button>

              {/* 5. Notices */}
              <button
                type="button"
                onClick={onOpenNotices}
                className="flex flex-col items-center text-center gap-1.5 press-scale"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                  <Megaphone size={19} strokeWidth={2.0} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Notices
                </span>
              </button>

              {/* 6. Visit Pass */}
              <button
                type="button"
                onClick={onOpenGatePass}
                className="flex flex-col items-center text-center gap-1.5 press-scale"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                  <Ticket size={20} strokeWidth={2.0} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Visit Pass
                </span>
              </button>

              {/* 7. Pinless Entry */}
              <button
                type="button"
                onClick={onOpenPinlessEntry}
                className="flex flex-col items-center text-center gap-1.5 press-scale"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                  <Smartphone size={20} strokeWidth={2.0} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Pinless Entry
                </span>
              </button>

              {/* 8. Market Place */}
              <button
                type="button"
                onClick={onOpenMarketplace}
                className="flex flex-col items-center text-center gap-1.5 press-scale"
              >
                <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                  <Store size={19} strokeWidth={2.0} />
                </div>
                <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                  Market Place
                </span>
              </button>
            </div>
          </div>
        </div>

        {/* Section 1: Official Notices Preview */}
        <div className="px-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Official Association Circulars
            </span>
            <button
              type="button"
              onClick={onOpenNotices}
              className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline flex items-center gap-0.5"
            >
              <span>View All</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {noticesList.map((notice, idx) => (
              <div
                key={idx}
                onClick={onOpenNotices}
                className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-start justify-between cursor-pointer hover:border-cobalt-300 dark:hover:border-cobalt-700 transition-all press-scale"
              >
                <div className="flex-1 pr-2">
                  <div className="flex items-center gap-1.5 mb-1">
                    <Badge variant={notice.priority === 'Urgent' ? 'crimson' : 'cobalt'} size="sm">
                      {notice.priority}
                    </Badge>
                    <span className="text-[10px] text-slate-500 dark:text-slate-400 font-semibold truncate">
                      {notice.dept}
                    </span>
                  </div>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-snug line-clamp-1">
                    {notice.title}
                  </h4>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5 block">
                    {notice.date}
                  </span>
                </div>
                <ChevronRight size={15} className="text-slate-400 mt-2 shrink-0" />
              </div>
            ))}
          </div>
        </div>

        {/* Section 2: Clubhouse Amenities Live Slots with 3D Clubhouse */}
        <div className="px-4 flex flex-col gap-2.5">
          <div className="p-3.5 rounded-3xl bg-gradient-to-r from-blue-50/70 via-indigo-50/40 to-white dark:from-obsidian-900 dark:via-obsidian-900 dark:to-obsidian-850 border border-blue-100 dark:border-obsidian-800 flex items-center justify-between gap-3 shadow-sm">
            <div className="flex items-center gap-3">
              <Clubhouse3D size={52} />
              <div>
                <span className="text-[10px] font-extrabold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                  Clubhouse & Sports
                </span>
                <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                  Amenities Live Booking
                </h4>
                <span className="text-[11px] text-slate-500">Banquet, Olympic Pool & Courts</span>
              </div>
            </div>
            <button
              type="button"
              onClick={onOpenAmenities}
              className="px-3 py-1.5 rounded-xl bg-cobalt-600 text-white font-bold text-xs hover:bg-cobalt-700 transition-colors press-scale shrink-0"
            >
              Book Slot
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            {amenitiesList.map((amn, idx) => (
              <div
                key={idx}
                onClick={onOpenAmenities}
                className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col justify-between gap-2 cursor-pointer hover:border-cobalt-300 dark:hover:border-cobalt-700 transition-all press-scale"
              >
                <div>
                  <h5 className="font-extrabold text-slate-900 dark:text-white text-xs leading-tight">
                    {amn.name}
                  </h5>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">
                    {amn.slot}
                  </span>
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-400 border-t border-slate-100 dark:border-obsidian-800 pt-1.5">
                  <span>{amn.capacity}</span>
                  <span className="font-bold text-slate-700 dark:text-slate-200">{amn.price}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section 3: Community Forum Highlights */}
        <div className="px-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Community Forum Discussions
            </span>
            <button
              type="button"
              onClick={onOpenForum}
              className="text-xs font-bold text-[#04BB49] dark:text-[#0ECD5A] hover:underline flex items-center gap-0.5"
            >
              <span>Join Discussion</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {forumPosts.map((post, idx) => (
              <div
                key={idx}
                onClick={onOpenForum}
                className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-start justify-between cursor-pointer hover:border-[#04BB49]/40 dark:hover:border-[#04BB49]/40 transition-all press-scale"
              >
                <div className="flex-1 pr-2">
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">
                    {post.author} • {post.time}
                  </span>
                  <h4 className="font-bold text-slate-900 dark:text-white text-xs leading-snug line-clamp-1 mt-0.5">
                    {post.title}
                  </h4>
                  <div className="flex items-center gap-2 mt-1 text-[10px] text-slate-500 font-medium">
                    <span>❤️ {post.likes} likes</span>
                    <span>💬 {post.replies} replies</span>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400 mt-2 shrink-0" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
