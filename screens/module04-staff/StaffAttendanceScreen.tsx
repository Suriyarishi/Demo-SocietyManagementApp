import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  X,
  Check,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  Sparkles
} from 'lucide-react';
import { DomesticStaffMember } from './StaffDashboardScreen';

interface StaffAttendanceScreenProps {
  staff: DomesticStaffMember;
  onBack: () => void;
}

export const StaffAttendanceScreen: React.FC<StaffAttendanceScreenProps> = ({
  staff,
  onBack,
}) => {
  // Calendar attendance status state (key: day number)
  const [attendanceMap, setAttendanceMap] = useState<Record<number, 'present' | 'half_day' | 'absent' | 'future'>>(() => {
    const map: Record<number, 'present' | 'half_day' | 'absent' | 'future'> = {};
    for (let i = 1; i <= 30; i++) {
      if (i < 21) {
        // Sample realistic pattern: weekdays mostly present
        map[i] = i % 7 === 0 ? 'absent' : (i % 5 === 0 ? 'half_day' : 'present');
      } else if (i === 21) {
        map[i] = 'present';
      } else {
        map[i] = 'future';
      }
    }
    return map;
  });

  const [selectedDayForModal, setSelectedDayForModal] = useState<number | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const presentCount = Object.values(attendanceMap).filter((s) => s === 'present').length;
  const halfDayCount = Object.values(attendanceMap).filter((s) => s === 'half_day').length;
  const absentCount = Object.values(attendanceMap).filter((s) => s === 'absent').length;

  const handleUpdateStatus = (day: number, status: 'present' | 'half_day' | 'absent') => {
    setAttendanceMap((prev) => ({
      ...prev,
      [day]: status,
    }));
    setSelectedDayForModal(null);
    showToast(`✓ Updated ${staff.name}'s status to ${status.toUpperCase()} for Day ${day}`);
  };

  const weekDayLabels = ['S', 'M', 'T', 'W', 'T', 'F', 'S'];

  return (
    <div className="w-full min-h-full flex flex-col bg-[#F8FAF9] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 pb-16">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-[#04BB49]/40 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200 backdrop-blur-md">
          <CheckCircle2 size={15} className="text-[#04BB49] shrink-0" />
          <span className="flex-1 text-[11px] leading-tight font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Sticky Top Header Bar */}
      <div className="px-4 py-3 bg-white/90 dark:bg-obsidian-900/90 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
            aria-label="Back"
          >
            <ArrowLeft size={18} className="text-slate-800 dark:text-white" />
          </button>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Attendance Log
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              {staff.name} • Flat 1204
            </p>
          </div>
        </div>

        <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-[#E8FBF0] text-[#03963B] border border-[#04BB49]/20">
          Nov 2026
        </span>
      </div>

      {/* Main Content Area - Flows naturally from top */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* CARD 1: Monthly Attendance Grid Card (Redesigned with /ui-ux-pro-max) */}
        <div className="p-4 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col gap-3.5">
          {/* Month Header Switcher */}
          <div className="flex items-center justify-between">
            <h2 className="text-sm font-extrabold text-slate-900 dark:text-white flex items-center gap-2">
              <Calendar size={15} className="text-[#04BB49]" />
              <span>November 2026</span>
            </h2>
            <div className="flex items-center gap-1">
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Previous month"
              >
                <ChevronLeft size={14} />
              </button>
              <button
                type="button"
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 flex items-center justify-center text-slate-600 transition-colors"
                aria-label="Next month"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>

          {/* Weekday Row */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {weekDayLabels.map((w, idx) => (
              <span key={idx} className="text-[11px] font-bold text-slate-400">
                {w}
              </span>
            ))}
          </div>

          {/* Days Grid (1 to 30) */}
          <div className="grid grid-cols-7 gap-1.5 text-center">
            {/* Offset for Nov 2026 starts on Sunday (no offset needed if starting 1st) */}
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const status = attendanceMap[day];
              const isToday = day === 21;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDayForModal(day)}
                  className={`h-9 rounded-xl flex flex-col items-center justify-center text-xs font-bold transition-all press-scale relative ${
                    isToday
                      ? 'bg-[#04BB49] text-white font-black shadow-xs ring-2 ring-[#04BB49]/30 ring-offset-1'
                      : status === 'present'
                      ? 'bg-[#E8FBF0] dark:bg-emerald-950/40 text-[#03963B] dark:text-[#0ECD5A] border border-[#04BB49]/30'
                      : status === 'half_day'
                      ? 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/50'
                      : status === 'absent'
                      ? 'bg-rose-50 dark:bg-rose-950/40 text-rose-600 dark:text-rose-400 border border-rose-200/50'
                      : 'text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
                  }`}
                >
                  <span>{day}</span>
                  {isToday && (
                    <span className="w-1 h-1 rounded-full bg-white -mt-0.5" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Attendance Counters Strip */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
            <div className="py-2 px-2 rounded-2xl bg-[#E8FBF0] dark:bg-emerald-950/30 border border-[#04BB49]/20 text-center flex items-center justify-center gap-1.5">
              <span className="font-black text-xs text-[#03963B] dark:text-[#0ECD5A]">{presentCount}</span>
              <span className="text-[10px] font-bold text-[#03963B] dark:text-[#0ECD5A]">Present</span>
            </div>

            <div className="py-2 px-2 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200/50 text-center flex items-center justify-center gap-1.5">
              <span className="font-black text-xs text-amber-700 dark:text-amber-400">{halfDayCount}</span>
              <span className="text-[10px] font-bold text-amber-700 dark:text-amber-400">Half day</span>
            </div>

            <div className="py-2 px-2 rounded-2xl bg-rose-50 dark:bg-rose-950/30 border border-rose-200/50 text-center flex items-center justify-center gap-1.5">
              <span className="font-black text-xs text-rose-600 dark:text-rose-400">{absentCount}</span>
              <span className="text-[10px] font-bold text-rose-600 dark:text-rose-400">Absent</span>
            </div>
          </div>
        </div>

        {/* CARD 2: Today's Status & Quick Mark Card */}
        <div className="p-4 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 block">
                Today
              </span>
              <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Saturday, 21 November 2026
              </h3>
            </div>

            <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-[#E8FBF0] text-[#03963B] border border-[#04BB49]/30 text-xs font-bold">
              <CheckCircle2 size={12} />
              <span>Marked Present</span>
            </span>
          </div>

          <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex items-center justify-between text-xs">
            <div className="flex items-center gap-2">
              <Clock size={14} className="text-slate-400" />
              <span className="text-slate-600 dark:text-slate-300 font-medium">
                Entered Main Gate 2 at 08:30 AM
              </span>
            </div>
            <span className="text-[10px] font-bold text-[#03963B] dark:text-[#0ECD5A]">
              Verified
            </span>
          </div>

          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={() => handleUpdateStatus(21, 'present')}
              className="flex-1 py-2 rounded-xl bg-[#04BB49] text-white text-xs font-bold hover:bg-[#03963B] transition-colors press-scale"
            >
              Present
            </button>
            <button
              type="button"
              onClick={() => handleUpdateStatus(21, 'half_day')}
              className="flex-1 py-2 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-800 text-xs font-bold transition-colors press-scale"
            >
              Half Day
            </button>
            <button
              type="button"
              onClick={() => handleUpdateStatus(21, 'absent')}
              className="flex-1 py-2 rounded-xl bg-rose-100 hover:bg-rose-200 text-rose-800 text-xs font-bold transition-colors press-scale"
            >
              Absent
            </button>
          </div>
        </div>

        {/* CARD 3: Turnstile Policy Info Card */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-white/5 text-[11px] text-slate-500 dark:text-slate-400 flex items-start gap-2.5">
          <ShieldCheck size={16} className="text-[#04BB49] shrink-0 mt-0.5" />
          <span>
            Daily attendance is synchronized directly from residential gate RFID / Turnstile sensors. Manual edits will be recorded in the flat ledger history.
          </span>
        </div>
      </div>

      {/* Date Detail Bottom Sheet */}
      {selectedDayForModal !== null && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-[32px] p-5 shadow-2xl border-t border-slate-100 dark:border-white/10 flex flex-col gap-4 animate-in slide-in-from-bottom duration-200 relative">
            <div className="w-10 h-1 bg-slate-200 dark:bg-white/20 rounded-full mx-auto" />

            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                  {selectedDayForModal} November 2026
                </h3>
                <p className="text-xs text-slate-400">
                  Select attendance status for {staff.name}
                </p>
              </div>

              <button
                type="button"
                onClick={() => setSelectedDayForModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            <div className="grid grid-cols-3 gap-2.5 py-2">
              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedDayForModal, 'present')}
                className="py-3 px-2 rounded-2xl bg-[#E8FBF0] hover:bg-[#d5f7e3] text-[#03963B] border border-[#04BB49]/30 text-xs font-black flex flex-col items-center gap-1 transition-all press-scale"
              >
                <CheckCircle2 size={18} />
                <span>Present</span>
              </button>

              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedDayForModal, 'half_day')}
                className="py-3 px-2 rounded-2xl bg-amber-50 hover:bg-amber-100 text-amber-700 border border-amber-200/60 text-xs font-black flex flex-col items-center gap-1 transition-all press-scale"
              >
                <Clock size={18} />
                <span>Half Day</span>
              </button>

              <button
                type="button"
                onClick={() => handleUpdateStatus(selectedDayForModal, 'absent')}
                className="py-3 px-2 rounded-2xl bg-rose-50 hover:bg-rose-100 text-rose-600 border border-rose-200/60 text-xs font-black flex flex-col items-center gap-1 transition-all press-scale"
              >
                <X size={18} />
                <span>Absent</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
