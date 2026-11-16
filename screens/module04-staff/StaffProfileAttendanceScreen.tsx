import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  Star,
  CheckCircle2,
  XCircle,
  AlertCircle,
  CreditCard,
  UserX,
  MessageSquare
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { DomesticStaffMember } from './StaffDashboardScreen';

interface StaffProfileAttendanceScreenProps {
  staff: DomesticStaffMember;
  onBack: () => void;
  onOpenLedger: () => void;
}

export const StaffProfileAttendanceScreen: React.FC<StaffProfileAttendanceScreenProps> = ({
  staff,
  onBack,
  onOpenLedger,
}) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('November 2026');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // Simulated 28-day calendar attendance
  const days = Array.from({ length: 28 }, (_, i) => {
    const dayNum = i + 1;
    let status: 'present' | 'leave' | 'future' = 'present';
    if (dayNum === 8 || dayNum === 19) status = 'leave';
    if (dayNum > 26) status = 'future';
    return { day: dayNum, status };
  });

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-200 relative">
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Staff Profile & Attendance
          </span>
          <button
            type="button"
            onClick={() => showToast(`Calling ${staff.name} at +91 ${staff.phone}...`)}
            className="w-10 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-md shadow-emerald-600/30"
            title="Call Staff"
          >
            <Phone size={17} />
          </button>
        </div>

        {/* Profile Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3.5">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3.5">
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 font-bold text-base flex items-center justify-center shrink-0">
                {staff.name.slice(0, 2).toUpperCase()}
              </div>
              <div>
                <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-tight">
                  {staff.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {staff.role} • +91 {staff.phone}
                </p>
                <div className="flex items-center gap-1.5 mt-1.5 text-xs">
                  <div className="flex items-center text-amber-500 font-bold">
                    <Star size={13} className="fill-current" />
                    <span className="ml-0.5">{staff.rating}</span>
                  </div>
                  <span className="text-slate-300 dark:text-obsidian-700">•</span>
                  <span className="text-slate-500 dark:text-slate-400">{staff.reviewsCount} reviews</span>
                </div>
              </div>
            </div>

            <Badge variant="emerald" icon={ShieldCheck} size="sm">
              Police Verified
            </Badge>
          </div>

          <div className="pt-3 border-t border-slate-100 dark:border-obsidian-800 grid grid-cols-2 gap-3 text-xs">
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-850">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Turnstile Status</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1 mt-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                {staff.status === 'in_campus' ? 'Inside Campus' : 'Outside'}
              </span>
            </div>
            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-850">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Monthly Salary</span>
              <span className="font-mono font-bold text-slate-900 dark:text-white mt-0.5 block">
                ₹{staff.salaryPerMonth.toLocaleString()} / mo
              </span>
            </div>
          </div>
        </div>

        {/* Attendance Calendar Grid */}
        <div className="p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Monthly Attendance Log
              </h4>
              <span className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">November 2026 (24 of 26 Days)</span>
            </div>
            <button
              onClick={onOpenLedger}
              className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline"
            >
              Ledger
            </button>
          </div>

          {/* Day Grid */}
          <div className="grid grid-cols-7 gap-1.5 pt-1 text-center">
            {['M', 'T', 'W', 'T', 'F', 'S', 'S'].map((dayName, idx) => (
              <span key={idx} className="text-[10px] font-bold text-slate-500 dark:text-slate-400">
                {dayName}
              </span>
            ))}
            {days.map((d) => (
              <div
                key={d.day}
                className={`py-2 rounded-lg text-xs font-mono font-bold transition-all ${
                  d.status === 'present'
                    ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                    : d.status === 'leave'
                    ? 'bg-crimson-50 text-crimson-700 dark:bg-crimson-950/60 dark:text-crimson-400 border border-crimson-200 dark:border-crimson-800/40'
                    : 'bg-slate-100 text-slate-400 dark:bg-obsidian-800'
                }`}
              >
                {d.day}
              </div>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-obsidian-800 text-[11px] text-slate-500">
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              Present (24)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-crimson-500" />
              Paid Leave (2)
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-slate-300 dark:bg-slate-700" />
              Upcoming (2)
            </span>
          </div>
        </div>

        {/* Recent Turnstile Scan Entries */}
        <div className="p-4 rounded-2xl bg-slate-50 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex flex-col gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Today's Turnstile Entry
          </span>
          <div className="flex items-center justify-between text-xs text-slate-600 dark:text-slate-300">
            <span className="flex items-center gap-1.5">
              <Clock size={13} className="text-emerald-500" />
              <span>Gate 2 Pedestrian Turnstile</span>
            </span>
            <span className="font-mono font-bold text-slate-900 dark:text-white">
              07:45 AM In
            </span>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="pt-6 flex flex-col gap-2.5">
        <Button
          onClick={onOpenLedger}
          icon={CreditCard}
          iconPosition="left"
          size="lg"
        >
          View Salary & Advance Ledger
        </Button>

        <button
          type="button"
          onClick={() => showToast(`Marked ${staff.name} as on-leave for today.`)}
          className="w-full h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors border border-slate-200 dark:border-obsidian-800"
        >
          Mark Leave for Today
        </button>
      </div>
    </div>
  );
};
