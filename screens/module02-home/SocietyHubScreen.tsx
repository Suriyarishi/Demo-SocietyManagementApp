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

interface SocietyHubScreenProps {
  onBack?: () => void;
  onOpenDailyStaff: () => void;
  onOpenGatePass: () => void;
}

export const SocietyHubScreen: React.FC<SocietyHubScreenProps> = ({
  onBack,
  onOpenDailyStaff,
  onOpenGatePass,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState<string>('');
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
      author: 'Vikram Mehta (Tower 3 - 802)',
      time: '1h ago',
      title: 'Weekend Tennis Doubles Match at 7 AM? Looking for 2 players!',
      replies: 6,
      likes: 12,
    },
    {
      author: 'Dr. Aruna Rao (Tower 1 - 404)',
      time: '3h ago',
      title: 'Recommendations for reliable pediatric dentists nearby in Whitefield?',
      replies: 14,
      likes: 9,
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
            onClick={() => setActiveModal('directory')}
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
                onClick={() => setActiveModal('community_suite')}
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
                onClick={() => setActiveModal('amenities')}
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
                onClick={() => setActiveModal('forum')}
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
                onClick={() => setActiveModal('directory')}
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
                onClick={() => setActiveModal('notices')}
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
                onClick={() => setActiveModal('pinless')}
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
                onClick={() => setActiveModal('marketplace')}
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

        {/* Section: Official Association Notices */}
        <div className="px-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <Megaphone size={14} className="text-amber-500" />
              <span>Official Notices & Circulars</span>
            </h3>
            <button
              type="button"
              onClick={() => setActiveModal('notices')}
              className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline"
            >
              View All (8)
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {noticesList.map((notice, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase ${
                    notice.priority === 'Urgent'
                      ? 'bg-amber-100 text-amber-800 dark:bg-amber-950/80 dark:text-amber-400'
                      : 'bg-slate-100 text-slate-700 dark:bg-obsidian-800 dark:text-slate-300'
                  }`}>
                    {notice.priority}
                  </span>
                  <span className="text-[10px] text-slate-400 font-medium">{notice.date}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {notice.title}
                </h4>
                <div className="flex items-center justify-between text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-obsidian-800">
                  <span>Issued by: {notice.dept}</span>
                  <button
                    type="button"
                    onClick={() => showToast('Notice acknowledged by Flat 1204!')}
                    className="text-cobalt-600 dark:text-cobalt-400 font-bold hover:underline"
                  >
                    Acknowledge
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Section: Community Discussion Forum */}
        <div className="px-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider flex items-center gap-1.5">
              <MessagesSquare size={14} className="text-cobalt-500" />
              <span>Resident Forum & Discussions</span>
            </h3>
            <button
              type="button"
              onClick={() => setActiveModal('forum')}
              className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline"
            >
              Start Topic +
            </button>
          </div>

          <div className="flex flex-col gap-2">
            {forumPosts.map((post, idx) => (
              <div
                key={idx}
                className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-1.5"
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400">
                  <span className="font-semibold text-slate-700 dark:text-slate-300">{post.author}</span>
                  <span>{post.time}</span>
                </div>
                <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h4>
                <div className="flex items-center gap-4 text-[11px] text-slate-500 pt-1 border-t border-slate-100 dark:border-obsidian-800">
                  <span>💬 {post.replies} Replies</span>
                  <span>❤️ {post.likes} Helpful</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Interactive Modal 1: Amenities Booking */}
      {activeModal === 'amenities' && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Book Society Amenities
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>
            <p className="text-xs text-slate-500">
              Reserved exclusively for residents of Prestige Lakeside Habitat.
            </p>

            <div className="flex flex-col gap-2.5">
              {amenitiesList.map((a, i) => (
                <div key={i} className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200/80 dark:border-obsidian-800 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{a.name}</h4>
                    <p className="text-[11px] text-slate-500">{a.slot} • {a.capacity}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Slot reserved for ${a.name}! QR pass issued.`);
                      setActiveModal(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs shrink-0"
                  >
                    Reserve
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal 2: Directory */}
      {activeModal === 'directory' && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Society Intercom Directory
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2">
              {[
                { title: 'Gate 1 (Main Security Kiosk)', ext: 'Ext 101', phone: '080-4920-1001' },
                { title: 'Gate 2 (Basement Turnstile)', ext: 'Ext 102', phone: '080-4920-1002' },
                { title: 'Estate Facility Manager', ext: 'Ext 201', phone: '080-4920-2001' },
                { title: 'Emergency Lift Rescue', ext: 'Ext 911', phone: '080-4920-9999' },
                { title: 'Association President Office', ext: 'Ext 301', phone: '080-4920-3001' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-[11px] text-slate-500 font-mono">{item.ext} • {item.phone}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => showToast(`Calling ${item.title}...`)}
                    className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center"
                  >
                    <Phone size={14} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Interactive Modal 3: Pinless Bluetooth Entry */}
      {activeModal === 'pinless' && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Touchless Bluetooth Access
              </span>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="w-16 h-16 rounded-full bg-cobalt-50 dark:bg-cobalt-950/70 text-cobalt-600 flex items-center justify-center pulse-ring">
              <Smartphone size={32} />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Tap Phone to Turnstile
              </h3>
              <p className="text-xs text-slate-500 mt-1">
                Hold your device near the Gate 1 or Gate 2 scanner to automatically unlatch the turnstile without an entry PIN.
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                showToast('✓ Turnstile Unlatched! Walk through within 10s.');
                setActiveModal(null);
              }}
              className="w-full h-11 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
            >
              Simulate Gate Unlatch
            </button>
          </div>
        </div>
      )}

      {/* Interactive Modal 4: Marketplace */}
      {activeModal === 'marketplace' && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-4 max-h-[85vh] overflow-y-auto no-scrollbar">
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Resident Marketplace
              </h3>
              <button
                type="button"
                onClick={() => setActiveModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500"
              >
                ✕
              </button>
            </div>

            <div className="flex flex-col gap-2.5">
              {[
                { title: 'Baby Stroller (Chicco Cortina)', price: '₹3,500', seller: 'Flat 402 • Tower 1' },
                { title: 'Fresh Homemade Sourdough Loaf', price: '₹180', seller: 'Flat 1104 • Tower 2' },
                { title: 'Decathlon 24" Bicycle (Single owner)', price: '₹4,200', seller: 'Flat 701 • Tower 3' },
              ].map((item, idx) => (
                <div key={idx} className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">{item.title}</h4>
                    <p className="text-[11px] text-slate-500">{item.seller}</p>
                    <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">{item.price}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      showToast(`Connected to neighbor in ${item.seller}!`);
                      setActiveModal(null);
                    }}
                    className="px-3 py-1.5 rounded-xl bg-cobalt-600 text-white font-bold text-xs"
                  >
                    Chat
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};