import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Phone,
  Star,
  ChevronRight,
  CheckCircle2
} from 'lucide-react';

export interface DomesticStaffMember {
  id: string;
  name: string;
  role: 'Cook' | 'Driver' | 'Cleaner' | 'Nanny' | 'Dog Walker' | 'Other' | 'Maid' | string;
  phone: string;
  maskedPhone?: string;
  rating: number;
  reviewsCount: number;
  flatsWorking: number;
  status: 'in_campus' | 'not_in_campus';
  statusText?: string;
  entryTime?: string;
  gateNumber?: string;
  expectedTime?: string;
  monthlyAttendance: string;
  policeVerified: boolean;
  salaryPerMonth: number;
  salaryDueDays: number;
  joinedDate?: string;
  sinceYear?: string;
  towerFlat?: string;
  openToWork?: boolean;
  notifyOnEntryExit?: boolean;
  languages?: string[];
  avatarUrl?: string;
}

export const SAMPLE_HOUSEHOLD_STAFF: DomesticStaffMember[] = [
  {
    id: 'stf_vikash',
    name: 'Vikash Ku.ar',
    role: 'Other',
    phone: '98765 43291',
    maskedPhone: '*********91',
    rating: 0,
    reviewsCount: 0,
    flatsWorking: 1,
    status: 'not_in_campus',
    statusText: 'Not in yet',
    monthlyAttendance: '0/30',
    policeVerified: true,
    salaryPerMonth: 5000,
    salaryDueDays: 14,
    joinedDate: '6 September 2024',
    sinceYear: '2024',
    towerFlat: 'TOWER-10',
    openToWork: false,
    notifyOnEntryExit: true,
    languages: ['Hindi'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
];

interface StaffDashboardScreenProps {
  onBack?: () => void;
  onSelectStaff: (staff: DomesticStaffMember) => void;
  onBrowseDirectory: () => void;
  onAddNewStaff: () => void;
  onOpenLedger: () => void;
  onViewAttendance?: (staff: DomesticStaffMember) => void;
  onBookService?: () => void;
}

export const StaffDashboardScreen: React.FC<StaffDashboardScreenProps> = ({
  onBack,
  onSelectStaff,
  onBrowseDirectory,
  onAddNewStaff,
  onOpenLedger,
  onViewAttendance,
  onBookService,
}) => {
  const staff = SAMPLE_HOUSEHOLD_STAFF[0];
  const [rating, setRating] = useState<number>(0);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleRate = (e: React.MouseEvent, starVal: number) => {
    e.stopPropagation();
    setRating(starVal);
    showToast(`✓ Submitted ${starVal}-star review for ${staff.name}!`);
  };

  const handleCall = (e: React.MouseEvent) => {
    e.stopPropagation();
    showToast(`Calling ${staff.name} at +91 ${staff.phone}...`);
  };

  const handleAttendanceClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (onViewAttendance) {
      onViewAttendance(staff);
    } else {
      onSelectStaff(staff);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-[#F8FAF9] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 relative pb-10">
      {/* Toast Notification Container */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-[#04BB49]/40 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-[#04BB49] shrink-0" />
          <span className="flex-1 text-[11px] leading-tight font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Top Header Bar (Matching Screenshot 1) */}
      <div className="px-4 py-3 bg-white dark:bg-obsidian-900 border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
              aria-label="Back"
            >
              <ArrowLeft size={18} className="text-slate-800 dark:text-white" />
            </button>
          )}
          <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Daily Help
          </h1>
        </div>

        {/* Find daily help Action (Top Right Link in Screenshot 1) */}
        <button
          type="button"
          onClick={onBrowseDirectory}
          className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] hover:underline transition-all press-scale"
        >
          Find daily help
        </button>
      </div>

      {/* Main Content Area */}
      <div className="p-4 flex flex-col gap-4">
        {/* CARD 1: Domestic Staff Member Card (Strictly Minimal & Pixel-Perfect) */}
        <div
          onClick={() => onSelectStaff(staff)}
          className="p-4 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] hover:shadow-md transition-all cursor-pointer flex flex-col gap-3 relative"
        >
          {/* Top Row: Avatar (48px fixed circle), Name, Role Tag, Status, Call Button */}
          <div className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Minimal Circle Avatar (strictly 48px, never stretches) */}
              <div className="relative w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-full shrink-0">
                <img
                  src={staff.avatarUrl}
                  alt={staff.name}
                  className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full object-cover border border-slate-100 dark:border-slate-800 shadow-2xs"
                />
                {/* Yellow status indicator dot for "Not in yet" */}
                <span className="absolute top-0 right-0 w-3 h-3 rounded-full bg-[#EAB308] border-2 border-white dark:border-slate-900" />
              </div>

              {/* Name & Role */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight truncate">
                    {staff.name}
                  </h3>
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-bold shrink-0">
                    {staff.role}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-0.5 font-medium">
                  <Clock size={12} className="shrink-0" />
                  <span>{staff.statusText || 'Not in yet'}</span>
                </div>
              </div>
            </div>

            {/* Circular Call Button (Matching Screenshot 1) */}
            <button
              type="button"
              onClick={handleCall}
              className="w-10 h-10 min-w-[40px] rounded-full bg-[#E8FBF0] dark:bg-emerald-950/60 text-[#03963B] dark:text-[#0ECD5A] flex items-center justify-center hover:bg-[#d5f7e3] transition-colors press-scale shrink-0 shadow-2xs"
              aria-label={`Call ${staff.name}`}
            >
              <Phone size={16} />
            </button>
          </div>

          {/* Thin Divider Line */}
          <div className="h-px bg-slate-100 dark:bg-white/5" />

          {/* Middle Link: View Attendance > */}
          <div className="flex items-center justify-between">
            <button
              type="button"
              onClick={handleAttendanceClick}
              className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-1 hover:gap-1.5 transition-all"
            >
              <span>View Attendance</span>
              <ChevronRight size={14} />
            </button>
          </div>

          {/* Bottom Review Row: Add your review & 5 Stars */}
          <div className="flex items-center justify-between pt-1 border-t border-slate-50 dark:border-white/5">
            <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
              Add your review
            </span>

            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={(e) => handleRate(e, star)}
                  className="p-0.5 text-slate-300 dark:text-slate-600 hover:text-amber-400 hover:scale-110 transition-all press-scale"
                  aria-label={`Rate ${star} star`}
                >
                  <Star
                    size={16}
                    className={
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-slate-300 dark:text-slate-600'
                    }
                  />
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* CARD 2: Promotional Service Banner (Matching Screenshot 1) */}
        <div className="rounded-[28px] bg-gradient-to-r from-[#EBF7FF] via-[#E1F2FE] to-[#D7EDFD] dark:from-sky-950/40 dark:via-cyan-950/30 dark:to-blue-950/40 border border-[#D5EEFF] dark:border-sky-900/40 p-4 relative overflow-hidden shadow-[0_4px_20px_-4px_rgba(0,102,204,0.08)]">
          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col gap-1 max-w-[62%]">
              <div className="flex items-center gap-1">
                <span className="text-[10px] font-bold text-rose-500 uppercase tracking-tight">
                  Don't Wait Around!
                </span>
                <span className="w-3.5 h-3.5 rounded-full bg-rose-500 text-white flex items-center justify-center text-[9px] font-bold">
                  ↘
                </span>
              </div>

              <h4 className="text-sm font-black text-[#0B3A68] dark:text-sky-100 flex items-center gap-1">
                <span>Repaired in 30 mins!</span>
                <Clock size={13} className="text-[#0B3A68] dark:text-sky-300" />
              </h4>

              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-0.5 leading-snug">
                Book an <span className="font-bold text-slate-900 dark:text-white">Electrical Services</span>{' '}
                <span className="text-rose-600 font-black">@₹99</span>
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookService || onAddNewStaff}
                  className="px-4 py-2 rounded-xl bg-[#0055A5] hover:bg-[#004182] text-white font-extrabold text-xs shadow-xs transition-all press-scale"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="w-20 h-20 min-w-[80px] min-h-[80px] relative flex items-center justify-center shrink-0">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=250&q=80"
                alt="Electrical Services"
                className="w-18 h-18 rounded-2xl object-cover shadow-xs border-2 border-white dark:border-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
