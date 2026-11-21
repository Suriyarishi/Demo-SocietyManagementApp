import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  Share2,
  Hand,
  ChevronDown,
  ChevronUp,
  ChevronRight,
  Edit2,
  Trash2,
  Bell,
  KeyRound,
  History,
  X,
  Check,
  HelpCircle,
  Sun,
  Sunset
} from 'lucide-react';
import { DomesticStaffMember } from './StaffDashboardScreen';

interface StaffProfileAttendanceScreenProps {
  staff: DomesticStaffMember;
  onBack: () => void;
  onOpenLedger?: () => void;
  onMakePayment?: (staff: DomesticStaffMember) => void;
  onViewTransactions?: (staff: DomesticStaffMember) => void;
  onViewAttendance?: (staff: DomesticStaffMember) => void;
  onRemoveStaff?: (staffId: string) => void;
}

export const StaffProfileAttendanceScreen: React.FC<StaffProfileAttendanceScreenProps> = ({
  staff,
  onBack,
  onOpenLedger,
  onMakePayment,
  onViewTransactions,
  onViewAttendance,
  onRemoveStaff,
}) => {
  // Interactive Local States
  const [openToWork, setOpenToWork] = useState<boolean>(staff.openToWork ?? false);
  const [notifyEntryExit, setNotifyEntryExit] = useState<boolean>(staff.notifyOnEntryExit ?? true);
  const [rating, setRating] = useState<number>(staff.rating || 0);
  const [languages, setLanguages] = useState<string[]>(staff.languages || ['Hindi']);
  
  // Accordion toggle states
  const [isFlatsOpen, setIsFlatsOpen] = useState<boolean>(true);
  const [isAboutOpen, setIsAboutOpen] = useState<boolean>(true);

  // Modal / Drawer states
  const [showPasscodeDrawer, setShowPasscodeDrawer] = useState<boolean>(false);
  const [showAvailabilityDrawer, setShowAvailabilityDrawer] = useState<boolean>(false);
  const [showLanguageEdit, setShowLanguageEdit] = useState<boolean>(false);
  const [showRemoveConfirm, setShowRemoveConfirm] = useState<boolean>(false);
  const [isPasscodeFaqOpen, setIsPasscodeFaqOpen] = useState<boolean>(false);

  // Availability state
  const [selectedDays, setSelectedDays] = useState<string[]>(['Mon', 'Tue', 'Wed', 'Thu', 'Fri']);
  const [selectedTimes, setSelectedTimes] = useState<string[]>(['Morning']);

  // Toast
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${staff.name} - ${staff.role}`,
        text: `Hire ${staff.name} (${staff.role}) on Hunt Lockdoor. Verified staff in Tower 10.`,
      }).catch(() => {});
    } else {
      showToast(`✓ Copied ${staff.name}'s profile share link to clipboard!`);
    }
  };

  const handleCall = () => {
    showToast(`Calling ${staff.name} at +91 ${staff.phone}...`);
  };

  const handleSendPasscode = () => {
    setShowPasscodeDrawer(false);
    showToast(`✓ SMS sent to ${staff.maskedPhone || 'staff'} with gate entry passcode.`);
  };

  const daysList = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const allLanguages = ['Hindi', 'English', 'Kannada', 'Tamil', 'Telugu', 'Bengali', 'Marathi'];

  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-[#F7F8F4] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 relative pb-12">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      {/* Top Header (Matching Image 2) */}
      <div className="px-4 py-3 bg-white dark:bg-obsidian-900 border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
            aria-label="Back"
          >
            <ArrowLeft size={17} className="text-slate-800 dark:text-white" />
          </button>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            {staff.role === 'Other' ? 'Others Profile' : `${staff.role} Profile`}
          </h2>
        </div>

        <button
          type="button"
          onClick={handleShare}
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-600 dark:text-slate-300 hover:text-slate-900 dark:hover:text-white transition-colors press-scale"
        >
          <Share2 size={15} />
          <span>Share</span>
        </button>
      </div>

      <div className="p-4 flex flex-col gap-3.5">
        {/* CARD 1: Profile Summary Card (Matching Image 2) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              {/* Avatar */}
              <div className="w-13 h-13 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-800 shadow-xs shrink-0">
                {staff.avatarUrl ? (
                  <img
                    src={staff.avatarUrl}
                    alt={staff.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-slate-500 text-sm">
                    {staff.name.slice(0, 2).toUpperCase()}
                  </div>
                )}
              </div>

              {/* Info */}
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  {staff.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                  📞 {staff.maskedPhone || '*********91'}
                </p>

                <div className="flex items-center gap-2 mt-1 text-xs">
                  <span className="text-slate-400 dark:text-slate-500 flex items-center gap-1">
                    <Clock size={12} />
                    <span>{staff.statusText || 'Not in yet'}</span>
                  </span>
                  <span className="text-slate-300 dark:text-slate-700">•</span>
                  <span className="text-sky-600 dark:text-sky-400 font-medium flex items-center gap-1">
                    <CheckCircle2 size={12} />
                    <span>Since {staff.sinceYear || '2024'}</span>
                  </span>
                </div>
              </div>
            </div>

            {/* Circular Call Button */}
            <button
              type="button"
              onClick={handleCall}
              className="w-10 h-10 rounded-full bg-[#E8FBF0] dark:bg-emerald-950/60 text-[#03963B] dark:text-[#0ECD5A] flex items-center justify-center hover:bg-[#d2f7e0] transition-colors press-scale shrink-0 shadow-2xs"
              aria-label={`Call ${staff.name}`}
            >
              <Phone size={17} />
            </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-white/5" />

          {/* Add Your Review Row */}
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Add your review
            </span>
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((s) => (
                <button
                  key={s}
                  type="button"
                  onClick={() => {
                    setRating(s);
                    showToast(`✓ Submitted ${s}-star review for ${staff.name}!`);
                  }}
                  className="p-0.5 text-slate-300 dark:text-slate-600 hover:text-amber-400 hover:scale-110 transition-all press-scale"
                >
                  <Star
                    size={17}
                    className={
                      s <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-400'
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 2: Mark as open to work (Matching Image 2) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Hand size={18} />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                  Mark as open to work
                </h4>
                <span className="px-1.5 py-0.2 rounded-full bg-rose-500 text-white text-[9px] font-black uppercase tracking-wider">
                  NEW
                </span>
              </div>
              <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                Help them find work faster
              </p>
            </div>
          </div>

          {/* Toggle Switch */}
          <button
            type="button"
            onClick={() => {
              const nextState = !openToWork;
              setOpenToWork(nextState);
              showToast(
                nextState
                  ? `✓ ${staff.name} is now marked as Open to Work in society directory`
                  : `✓ Updated: ${staff.name} is no longer taking new flats`
              );
            }}
            className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
              openToWork ? 'bg-[#04BB49]' : 'bg-slate-200 dark:bg-slate-700'
            }`}
          >
            <div
              className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                openToWork ? 'translate-x-5' : 'translate-x-0'
              }`}
            />
          </button>
        </div>

        {/* CARD 3: Attendance Summary (Matching Image 2) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xs flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Attendance
            </h4>
          </div>

          <div className="flex items-center justify-between text-xs text-slate-500 dark:text-slate-400">
            <span>Last 30 days</span>
            <span className="font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-1">
              <CheckCircle2 size={13} />
              <span>{staff.monthlyAttendance || '0/30'}</span>
            </span>
          </div>

          <div className="pt-1 border-t border-slate-100 dark:border-white/5">
            <button
              type="button"
              onClick={() => {
                if (onViewAttendance) {
                  onViewAttendance(staff);
                } else if (onOpenLedger) {
                  onOpenLedger();
                }
              }}
              className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center justify-between w-full hover:underline pt-1"
            >
              <div className="flex items-center gap-1.5">
                <Calendar size={14} />
                <span>View attendance</span>
              </div>
              <ChevronRight size={15} />
            </button>
          </div>
        </div>

        {/* CARD 4: Flats Accordion (Matching Image 2) */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setIsFlatsOpen(!isFlatsOpen)}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Flats
            </h4>
            {isFlatsOpen ? (
              <ChevronUp size={16} className="text-slate-400" />
            ) : (
              <ChevronDown size={16} className="text-slate-400" />
            )}
          </button>

          {isFlatsOpen && (
            <div className="px-4 pb-4 animate-in slide-in-from-top-1 duration-150">
              <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">📍</span>
                  <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    {staff.towerFlat || 'TOWER-10'}
                  </span>
                </div>
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
                  2+ years
                </span>
              </div>
            </div>
          )}
        </div>

        {/* CARD 5: About Accordion (Matching Image 2) */}
        <div className="rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xs overflow-hidden">
          <button
            type="button"
            onClick={() => setIsAboutOpen(!isAboutOpen)}
            className="w-full p-4 flex items-center justify-between text-left"
          >
            <h4 className="text-sm font-extrabold text-slate-900 dark:text-white">
              About
            </h4>
            {isAboutOpen ? (
              <ChevronUp size={16} className="text-slate-400" />
            ) : (
              <ChevronDown size={16} className="text-slate-400" />
            )}
          </button>

          {isAboutOpen && (
            <div className="px-4 pb-4 flex flex-col gap-3 animate-in slide-in-from-top-1 duration-150 text-xs">
              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400">
                <span>Joined</span>
                <span className="font-semibold text-slate-900 dark:text-white">
                  {staff.joinedDate || '6 September 2024'}
                </span>
              </div>

              <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 pt-2 border-t border-slate-100 dark:border-white/5">
                <span>Languages</span>
                <div className="flex items-center gap-1.5">
                  <span className="font-semibold text-slate-900 dark:text-white">
                    {languages.join(', ') || '-'}
                  </span>
                  <button
                    type="button"
                    onClick={() => setShowLanguageEdit(true)}
                    className="p-1 text-slate-400 hover:text-slate-800 dark:hover:text-white"
                  >
                    <Edit2 size={13} />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* CARD 6: Actions (Matching Image 2) */}
        <div className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xs flex flex-col gap-1">
          <h4 className="text-sm font-extrabold text-slate-900 dark:text-white mb-1">
            Actions
          </h4>

          {/* Action 1: Pay Staff */}
          <button
            type="button"
            onClick={() => onMakePayment && onMakePayment(staff)}
            className="w-full py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 px-2 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <span className="text-slate-500">💳</span>
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Pay {staff.name}
              </span>
            </div>
            <ChevronRight size={15} className="text-slate-400" />
          </button>

          {/* Action 2: View Transactions */}
          <button
            type="button"
            onClick={() => onViewTransactions && onViewTransactions(staff)}
            className="w-full py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 px-2 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <History size={16} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                View Transactions
              </span>
            </div>
            <ChevronRight size={15} className="text-slate-400" />
          </button>

          {/* Action 3: Send Passcode */}
          <button
            type="button"
            onClick={() => setShowPasscodeDrawer(true)}
            className="w-full py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 px-2 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <KeyRound size={16} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Send Passcode
              </span>
            </div>
            <ChevronRight size={15} className="text-slate-400" />
          </button>

          {/* Action 3.5: Set Availability */}
          <button
            type="button"
            onClick={() => setShowAvailabilityDrawer(true)}
            className="w-full py-2.5 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 px-2 rounded-xl transition-colors"
          >
            <div className="flex items-center gap-3">
              <Clock size={16} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Working Availability
              </span>
            </div>
            <ChevronRight size={15} className="text-slate-400" />
          </button>

          {/* Action 4: Notify on entry & exit toggle */}
          <div className="w-full py-2.5 flex items-center justify-between px-2">
            <div className="flex items-center gap-3">
              <Bell size={16} className="text-slate-500" />
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                Notify on entry & exit
              </span>
            </div>

            <button
              type="button"
              onClick={() => {
                const nextState = !notifyEntryExit;
                setNotifyEntryExit(nextState);
                showToast(
                  nextState
                    ? '✓ Entry & exit push alerts activated'
                    : '✓ Entry & exit notifications silenced'
                );
              }}
              className={`w-11 h-6 rounded-full transition-colors relative p-0.5 ${
                notifyEntryExit ? 'bg-[#04BB49]' : 'bg-slate-200 dark:bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white shadow-sm transition-transform ${
                  notifyEntryExit ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="h-px bg-slate-100 dark:bg-white/5 my-1" />

          {/* Action 5: Remove from flat */}
          <button
            type="button"
            onClick={() => setShowRemoveConfirm(true)}
            className="w-full py-2.5 flex items-center gap-3 text-left hover:bg-rose-50 dark:hover:bg-rose-950/20 px-2 rounded-xl transition-colors text-rose-600 font-bold text-xs"
          >
            <Trash2 size={16} />
            <span>Remove from flat</span>
          </button>
        </div>
      </div>

      {/* ========================================================
          DRAWER 1: SEND PASSCODE BOTTOM SHEET (Matching Image 5)
          ======================================================== */}
      {showPasscodeDrawer && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-[32px] p-5 shadow-2xl border-t border-slate-100 dark:border-white/10 flex flex-col gap-4 animate-in slide-in-from-bottom duration-200 relative">
            {/* Grab handle */}
            <div className="w-10 h-1 bg-slate-200 dark:bg-white/20 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Send passcode
              </h3>
              <button
                type="button"
                onClick={() => setShowPasscodeDrawer(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <p className="text-xs text-slate-500 dark:text-slate-400 -mt-1 leading-relaxed">
              {staff.name}'s passcode will be sent again if it's lost or forgotten.
            </p>

            {/* 3 Guided Steps (Matching Image 5) */}
            <div className="flex flex-col gap-3 py-1">
              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  1
                </span>
                <span>
                  Tap <strong className="font-bold text-slate-900 dark:text-white">Send</strong> below
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  2
                </span>
                <span>
                  {staff.name} gets it by SMS on{' '}
                  <strong className="font-mono font-bold text-slate-900 dark:text-white">
                    {staff.maskedPhone || '*********91'}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-3 text-xs text-slate-700 dark:text-slate-300">
                <span className="w-6 h-6 rounded-full bg-emerald-100 dark:bg-emerald-950/80 text-emerald-700 dark:text-emerald-400 font-bold text-xs flex items-center justify-center shrink-0">
                  3
                </span>
                <span>They share it with the guard to enter</span>
              </div>
            </div>

            {/* What's a passcode? Accordion */}
            <div className="border-t border-slate-100 dark:border-white/5 pt-2">
              <button
                type="button"
                onClick={() => setIsPasscodeFaqOpen(!isPasscodeFaqOpen)}
                className="text-xs font-semibold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-1"
              >
                <span>What's a passcode?</span>
                <ChevronDown size={14} className={isPasscodeFaqOpen ? 'rotate-180 transition-transform' : ''} />
              </button>

              {isPasscodeFaqOpen && (
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5 leading-relaxed bg-slate-50 dark:bg-white/5 p-2.5 rounded-xl border border-slate-100 dark:border-white/10">
                  A passcode is a unique 6-digit access code linked to your flat. The security guard verifies it upon arrival to allow turnstile entry.
                </p>
              )}
            </div>

            {/* Action CTA Button */}
            <button
              type="button"
              onClick={handleSendPasscode}
              className="w-full h-12 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] text-white font-extrabold text-sm shadow-md shadow-[#04BB49]/30 transition-all press-scale flex items-center justify-center gap-2"
            >
              <span>Send passcode</span>
            </button>
          </div>
        </div>
      )}

      {/* ========================================================
          DRAWER 2: AVAILABILITY BOTTOM SHEET (Matching Image 7)
          ======================================================== */}
      {showAvailabilityDrawer && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-[32px] p-5 shadow-2xl border-t border-slate-100 dark:border-white/10 flex flex-col gap-4 animate-in slide-in-from-bottom duration-200 relative max-h-[85%] overflow-y-auto">
            {/* Grab handle */}
            <div className="w-10 h-1 bg-slate-200 dark:bg-white/20 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-black text-slate-900 dark:text-white">
                Availability
              </h3>
              <button
                type="button"
                onClick={() => setShowAvailabilityDrawer(false)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Days Selection (Matching Image 7) */}
            <div className="flex flex-col gap-2.5">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Days</span>
              <div className="flex flex-wrap gap-2.5">
                {daysList.map((day) => {
                  const isSelected = selectedDays.includes(day);
                  return (
                    <button
                      key={day}
                      type="button"
                      onClick={() => {
                        setSelectedDays((prev) =>
                          isSelected ? prev.filter((d) => d !== day) : [...prev, day]
                        );
                      }}
                      className={`w-11 h-11 rounded-full border text-xs font-bold flex items-center justify-center transition-all press-scale ${
                        isSelected
                          ? 'bg-[#04BB49] text-white border-[#04BB49] shadow-xs'
                          : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 hover:border-slate-300'
                      }`}
                    >
                      {day}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Time Selection (Matching Image 7) */}
            <div className="flex flex-col gap-2.5 pt-2">
              <span className="text-xs font-bold text-slate-900 dark:text-white">Time</span>

              <div className="flex flex-col gap-2">
                {[
                  { id: 'Morning', label: 'Morning', timing: '5:00 am - 12:00 pm', icon: Sun },
                  { id: 'Afternoon', label: 'Afternoon', timing: '12:00 pm - 5:00 pm', icon: Sun },
                  { id: 'Evening', label: 'Evening', timing: '5:00 pm - 11:00 pm', icon: Sunset },
                  { id: 'Full Day', label: 'Full Day', timing: 'All Day', icon: Clock },
                ].map((slot) => {
                  const isChecked = selectedTimes.includes(slot.id);
                  const Icon = slot.icon;

                  return (
                    <label
                      key={slot.id}
                      onClick={() => {
                        setSelectedTimes((prev) =>
                          isChecked ? prev.filter((t) => t !== slot.id) : [...prev, slot.id]
                        );
                      }}
                      className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                        isChecked
                          ? 'bg-[#F7FCF9] dark:bg-emerald-950/20 border-[#04BB49]'
                          : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10'
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Icon size={16} className="text-slate-500" />
                        <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                          {slot.label}
                        </span>
                        {slot.timing !== 'All Day' && (
                          <span className="text-xs text-slate-400">
                            {slot.timing}
                          </span>
                        )}
                      </div>

                      <div className={`w-4 h-4 rounded-md border flex items-center justify-center ${
                        isChecked
                          ? 'bg-[#04BB49] border-[#04BB49] text-white'
                          : 'border-slate-300 dark:border-slate-600'
                      }`}>
                        {isChecked && <Check size={11} strokeWidth={3} />}
                      </div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Footer Actions (Matching Image 7) */}
            <div className="flex items-center justify-between pt-3 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={() => {
                  setSelectedDays([]);
                  setSelectedTimes([]);
                }}
                className="text-xs font-bold text-slate-400 hover:text-slate-600 transition-colors"
              >
                Clear all
              </button>

              <button
                type="button"
                onClick={() => {
                  setShowAvailabilityDrawer(false);
                  showToast(`✓ Updated working availability for ${staff.name}`);
                }}
                className="h-11 px-7 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] text-white font-extrabold text-xs shadow-md transition-all press-scale"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Language Edit Modal */}
      {showLanguageEdit && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[320px] p-5 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Select Languages
              </h3>
              <button
                type="button"
                onClick={() => setShowLanguageEdit(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <div className="flex flex-wrap gap-2">
              {allLanguages.map((lang) => {
                const isSelected = languages.includes(lang);
                return (
                  <button
                    key={lang}
                    type="button"
                    onClick={() => {
                      setLanguages((prev) =>
                        isSelected ? prev.filter((l) => l !== lang) : [...prev, lang]
                      );
                    }}
                    className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-colors ${
                      isSelected
                        ? 'bg-[#E8FBF0] text-[#03963B] border-[#04BB49]/40'
                        : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
                    }`}
                  >
                    {lang}
                  </button>
                );
              })}
            </div>

            <button
              type="button"
              onClick={() => {
                setShowLanguageEdit(false);
                showToast(`✓ Updated languages for ${staff.name}`);
              }}
              className="w-full h-10 rounded-xl bg-[#04BB49] text-white font-bold text-xs shadow-md transition-all press-scale"
            >
              Save
            </button>
          </div>
        </div>
      )}

      {/* Remove from flat confirmation modal */}
      {showRemoveConfirm && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[320px] p-6 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-2xl flex flex-col gap-4 text-center">
            <div className="w-12 h-12 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Trash2 size={24} />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Remove {staff.name}?
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                This will revoke their automated gate pass for your flat (Tower 10). You can re-link them anytime.
              </p>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowRemoveConfirm(false)}
                className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  setShowRemoveConfirm(false);
                  if (onRemoveStaff) onRemoveStaff(staff.id);
                  showToast(`✓ Removed ${staff.name} from flat.`);
                  onBack();
                }}
                className="flex-1 h-10 rounded-xl bg-rose-600 hover:bg-rose-700 text-white font-bold text-xs shadow-md"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
