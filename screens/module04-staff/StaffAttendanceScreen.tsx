import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CheckCircle2,
  Clock,
  X,
  Check
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
  // Initially days 1-21 are absent (matching Screenshot 6)
  const [attendanceMap, setAttendanceMap] = useState<Record<number, 'present' | 'half_day' | 'absent' | 'future'>>(() => {
    const map: Record<number, 'present' | 'half_day' | 'absent' | 'future'> = {};
    for (let i = 1; i <= 30; i++) {
      if (i <= 21) {
        map[i] = 'absent';
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

  const handleMarkPresent = (day: number) => {
    setAttendanceMap((prev) => ({
      ...prev,
      [day]: 'present',
    }));
    setSelectedDayForModal(null);
    showToast(`✓ Marked ${staff.name} as Present for ${day} Nov 2026`);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-[#F8FAF9] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 relative pb-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-[#04BB49]/40 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-[#04BB49] shrink-0" />
          <span className="flex-1 text-[11px] leading-tight font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Header Bar (Matching Screenshot 6) */}
      <div className="px-4 py-3 bg-white dark:bg-obsidian-900 border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
            aria-label="Back"
          >
            <ArrowLeft size={18} className="text-slate-800 dark:text-white" />
          </button>
          <h2 className="text-base font-bold text-slate-800 dark:text-white tracking-tight truncate max-w-[240px]">
            {staff.name}'s Attendance
          </h2>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Top Calendar Card (Matching Screenshot 6) */}
        <div className="p-5 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] flex flex-col gap-4">
          {/* Days Grid (1 to 30) */}
          <div className="grid grid-cols-7 gap-2 text-center">
            {/* Empty offset if needed for calendar alignment */}
            <div className="invisible" />
            <div className="invisible" />
            <div className="invisible" />
            <div className="invisible" />
            <div className="invisible" />
            <div className="invisible" />

            {/* Render 30 Days */}
            {Array.from({ length: 30 }, (_, i) => {
              const day = i + 1;
              const status = attendanceMap[day];
              const isToday = day === 21;

              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => setSelectedDayForModal(day)}
                  className={`h-9 rounded-xl flex items-center justify-center text-xs font-bold transition-all press-scale relative ${
                    status === 'present'
                      ? 'bg-[#04BB49] text-white shadow-xs'
                      : isToday
                      ? 'bg-[#E11D48] text-white font-extrabold shadow-sm'
                      : status === 'absent'
                      ? 'bg-[#FFF1F2] dark:bg-rose-950/40 text-[#E11D48] dark:text-rose-400'
                      : 'text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-white/10'
                  }`}
                >
                  <span>{day}</span>
                </button>
              );
            })}
          </div>

          {/* Attendance Stats Counters (Matching Screenshot 6) */}
          <div className="grid grid-cols-3 gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
            <div className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-center flex items-center justify-center gap-1.5">
              <span className="font-bold text-xs text-[#04BB49]">{presentCount}</span>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Present</span>
            </div>

            <div className="py-2 px-1 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-center flex items-center justify-center gap-1.5">
              <span className="font-bold text-xs text-[#04BB49]">{halfDayCount}</span>
              <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-300">Half day</span>
            </div>

            <div className="py-2 px-1 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-100 dark:border-rose-900/40 text-center flex items-center justify-center gap-1.5">
              <span className="font-bold text-xs text-[#E11D48]">{absentCount}</span>
              <span className="text-[11px] font-semibold text-[#E11D48]">Absent</span>
            </div>
          </div>
        </div>

        {/* Airtel / Croma Promotional Banner (Matching Screenshot 8) */}
        <div className="rounded-[28px] bg-gradient-to-r from-[#8B0000] via-[#C41224] to-[#A30012] text-white p-4 relative overflow-hidden shadow-md flex items-center justify-between">
          <div className="flex flex-col gap-1 max-w-[62%] z-10">
            <div className="flex items-center gap-2 text-[10px] font-bold tracking-wider opacity-90">
              <span className="font-extrabold">airtel insider</span>
              <span>|</span>
              <span>cromā A TATA Enterprise</span>
            </div>
            <h4 className="text-sm font-black leading-tight mt-0.5">
              Being on Airtel pays off!
            </h4>
            <p className="text-[11px] text-white/90">
              Save up to ₹26,000 on your first iPhone.
            </p>
            <div className="pt-2">
              <button
                type="button"
                className="px-3.5 py-1.5 rounded-full bg-black text-white font-bold text-[10px] hover:bg-black/80 transition-colors shadow-xs"
              >
                Claim Now
              </button>
            </div>
          </div>

          <div className="w-22 h-22 relative flex items-center justify-center shrink-0">
            <img
              src="https://images.unsplash.com/photo-1695048133142-1a20484d2569?auto=format&fit=crop&w=250&q=80"
              alt="iPhone 17 Pro"
              className="w-20 h-20 rounded-2xl object-cover shadow-sm"
            />
          </div>
        </div>

        {/* Bottom Card: Today's Status (Matching Screenshot 6) */}
        <div className="p-4 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.06)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Today, 21 Nov
            </h3>

            {attendanceMap[21] === 'present' ? (
              <span className="text-xs font-bold text-[#03963B] bg-[#E8FBF0] px-2.5 py-1 rounded-full border border-[#04BB49]/20">
                ✓ Present in Flat
              </span>
            ) : (
              <button
                type="button"
                onClick={() => handleMarkPresent(21)}
                className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] hover:underline"
              >
                Mark As Present
              </button>
            )}
          </div>

          <p className="text-xs text-slate-400 dark:text-slate-500 -mt-1 font-medium">
            Arrived in your flat?
          </p>

          {/* Desert Cactus Empty State Box (Matching Screenshot 6) */}
          <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-white/5 flex flex-col items-center justify-center text-center gap-2">
            <div className="w-20 h-14 relative flex items-center justify-center text-slate-300 dark:text-slate-600">
              <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="14" fill="#E2E8F0" />
                <path d="M0 40C12 36 28 36 64 40V48H0V40Z" fill="#CBD5E1" />
                <path d="M38 18V38M38 24H34V20M38 28H42V24" stroke="#64748B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </div>
            <p className="text-xs font-semibold text-slate-400 dark:text-slate-500">
              {attendanceMap[21] === 'present'
                ? 'Entry logged today via Gate Turnstile'
                : 'No entries on this date'}
            </p>
          </div>
        </div>
      </div>

      {/* Date Detail / Attendance Bottom Sheet (Matching Screenshot 8) */}
      {selectedDayForModal && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div className="w-full bg-white dark:bg-slate-900 rounded-t-[32px] p-5 shadow-2xl border-t border-slate-100 dark:border-white/10 flex flex-col gap-4 animate-in slide-in-from-bottom duration-200 relative">
            {/* Grab Handle */}
            <div className="w-10 h-1 bg-slate-200 dark:bg-white/20 rounded-full mx-auto" />

            {/* Header */}
            <div className="flex items-center justify-between">
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                {selectedDayForModal} November 2026, Saturday
              </h3>
              <button
                type="button"
                onClick={() => setSelectedDayForModal(null)}
                className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 text-slate-500 flex items-center justify-center transition-colors"
              >
                <X size={15} />
              </button>
            </div>

            {/* Cactus Box */}
            <div className="p-6 rounded-2xl border border-slate-100 dark:border-white/5 bg-slate-50/60 dark:bg-white/5 flex flex-col items-center justify-center text-center gap-2">
              <svg width="64" height="48" viewBox="0 0 64 48" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="28" cy="28" r="14" fill="#E2E8F0" />
                <path d="M0 40C12 36 28 36 64 40V48H0V40Z" fill="#CBD5E1" />
                <path d="M38 18V38M38 24H34V20M38 28H42V24" stroke="#64748B" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
              <p className="text-xs font-semibold text-slate-500">
                {attendanceMap[selectedDayForModal] === 'present'
                  ? 'Resident marked staff present in flat'
                  : 'No entries on this date'}
              </p>
            </div>

            {/* Explanatory Note */}
            <p className="text-xs text-slate-400 dark:text-slate-400 text-center px-2 leading-relaxed">
              Entry and exit data is recorded at the gate, not at the individual flat level.
            </p>

            {/* Action Button */}
            {attendanceMap[selectedDayForModal] === 'present' ? (
              <div className="w-full h-12 rounded-2xl bg-[#E8FBF0] text-[#03963B] font-extrabold text-sm flex items-center justify-center gap-2">
                <CheckCircle2 size={16} />
                <span>Marked as Present</span>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => handleMarkPresent(selectedDayForModal)}
                className="w-full h-12 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] text-white font-extrabold text-sm shadow-md shadow-[#04BB49]/30 transition-all press-scale flex items-center justify-center gap-2"
              >
                <Check size={16} strokeWidth={3} />
                <span>Mark As Present</span>
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
