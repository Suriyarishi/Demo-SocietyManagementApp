import React, { useState } from 'react';
import {
  Users,
  Phone,
  Calendar,
  Clock,
  ShieldCheck,
  ChevronRight,
  Plus,
  Star,
  Search,
  CheckCircle2,
  AlertCircle,
  CreditCard,
  ArrowLeft,
  Wrench,
  Zap
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';

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
    monthlyAttendance: '0/30 Days',
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
  {
    id: 'stf_01',
    name: 'Lakshmi R',
    role: 'Cook',
    phone: '98451 92831',
    maskedPhone: '*********31',
    rating: 4.9,
    reviewsCount: 38,
    flatsWorking: 4,
    status: 'in_campus',
    statusText: 'In flat since 08:30 AM',
    entryTime: '07:45 AM',
    gateNumber: 'Gate 2 Pedestrian Turnstile',
    monthlyAttendance: '24 / 26 Days',
    policeVerified: true,
    salaryPerMonth: 6500,
    salaryDueDays: 14,
    joinedDate: '12 January 2023',
    sinceYear: '2023',
    towerFlat: 'TOWER-10',
    openToWork: true,
    notifyOnEntryExit: true,
    languages: ['Hindi', 'English'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'stf_02',
    name: 'Ramesh Kumar',
    role: 'Driver',
    phone: '98204 11294',
    maskedPhone: '*********94',
    rating: 4.8,
    reviewsCount: 22,
    flatsWorking: 2,
    status: 'in_campus',
    statusText: 'In basement parking',
    entryTime: '08:15 AM',
    gateNumber: 'Gate 2 (Basement Boom Barrier)',
    monthlyAttendance: '25 / 26 Days',
    policeVerified: true,
    salaryPerMonth: 18000,
    salaryDueDays: 14,
    joinedDate: '15 March 2022',
    sinceYear: '2022',
    towerFlat: 'TOWER-10',
    openToWork: false,
    notifyOnEntryExit: true,
    languages: ['Hindi', 'English', 'Kannada'],
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'stf_03',
    name: 'Anita M',
    role: 'Cleaner',
    phone: '98721 34910',
    maskedPhone: '*********10',
    rating: 4.7,
    reviewsCount: 45,
    flatsWorking: 5,
    status: 'not_in_campus',
    statusText: 'Not in yet',
    expectedTime: '10:30 AM',
    monthlyAttendance: '22 / 26 Days',
    policeVerified: true,
    salaryPerMonth: 4000,
    salaryDueDays: 14,
    joinedDate: '20 August 2023',
    sinceYear: '2023',
    towerFlat: 'TOWER-10',
    openToWork: true,
    notifyOnEntryExit: true,
    languages: ['Hindi'],
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
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
  const [staffList, setStaffList] = useState<DomesticStaffMember[]>(SAMPLE_HOUSEHOLD_STAFF);
  const [ratings, setRatings] = useState<Record<string, number>>({});
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleRate = (e: React.MouseEvent, staffId: string, starVal: number) => {
    e.stopPropagation();
    setRatings((prev) => ({
      ...prev,
      [staffId]: starVal,
    }));
    showToast(`✓ Submitted ${starVal}-star review! Thank you.`);
  };

  const handleCall = (e: React.MouseEvent, staff: DomesticStaffMember) => {
    e.stopPropagation();
    showToast(`Calling ${staff.name} at +91 ${staff.phone}...`);
  };

  const handleViewAttendanceClick = (e: React.MouseEvent, staff: DomesticStaffMember) => {
    e.stopPropagation();
    if (onViewAttendance) {
      onViewAttendance(staff);
    } else {
      onSelectStaff(staff);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-[#F7F8F4] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 relative pb-10">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      {/* Header Bar (Matching Image 1) */}
      <div className="px-4 py-3 bg-white dark:bg-obsidian-900 border-b border-slate-200/80 dark:border-white/5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          {onBack && (
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
              aria-label="Back"
            >
              <ArrowLeft size={17} className="text-slate-800 dark:text-white" />
            </button>
          )}
          <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
            Daily Help
          </h1>
        </div>

        {/* Find Daily Help Link (Top Right in Image 1) */}
        <button
          type="button"
          onClick={onBrowseDirectory}
          className="text-sm font-semibold text-[#03963B] dark:text-[#0ECD5A] hover:underline transition-all press-scale"
        >
          Find daily help
        </button>
      </div>

      {/* Main Content List */}
      <div className="p-4 flex flex-col gap-4">
        {/* Staff Members List */}
        <div className="flex flex-col gap-3.5">
          {staffList.map((staff) => {
            const userRating = ratings[staff.id] || staff.rating || 0;
            const isInCampus = staff.status === 'in_campus';

            return (
              <div
                key={staff.id}
                onClick={() => onSelectStaff(staff)}
                className="p-4 rounded-3xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-xs hover:shadow-md transition-all cursor-pointer flex flex-col gap-3 relative group"
              >
                {/* Top Section: Avatar, Name, Role, Status, Call Button */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    {/* Avatar with Status Dot */}
                    <div className="relative shrink-0">
                      <div className="w-12 h-12 rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border-2 border-white dark:border-slate-800 shadow-xs">
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

                      {/* Status Beacon (Yellow for Not in yet, Green for in campus) */}
                      <span
                        className={`absolute top-0 right-0 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                          isInCampus ? 'bg-[#04BB49]' : 'bg-amber-400'
                        }`}
                      />
                    </div>

                    {/* Name & Details */}
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                          {staff.name}
                        </h3>
                        <span className="px-2.5 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-xs font-semibold">
                          {staff.role}
                        </span>
                      </div>

                      <div className="flex items-center gap-1.5 text-xs text-slate-400 dark:text-slate-500 mt-1">
                        <Clock size={13} className="shrink-0" />
                        <span>{staff.statusText || (isInCampus ? 'In campus' : 'Not in yet')}</span>
                      </div>
                    </div>
                  </div>

                  {/* Circular Call Button (Matching Image 1) */}
                  <button
                    type="button"
                    onClick={(e) => handleCall(e, staff)}
                    className="w-10 h-10 rounded-full bg-[#E8FBF0] dark:bg-emerald-950/60 text-[#03963B] dark:text-[#0ECD5A] flex items-center justify-center hover:bg-[#d2f7e0] transition-colors press-scale shrink-0 shadow-2xs"
                    aria-label={`Call ${staff.name}`}
                  >
                    <Phone size={17} />
                  </button>
                </div>

                {/* Divider Line */}
                <div className="h-px bg-slate-100 dark:bg-white/5" />

                {/* Middle Action: View Attendance Link */}
                <div className="flex items-center justify-between">
                  <button
                    type="button"
                    onClick={(e) => handleViewAttendanceClick(e, staff)}
                    className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-1 hover:gap-1.5 transition-all"
                  >
                    <span>View Attendance</span>
                    <ChevronRight size={14} />
                  </button>
                </div>

                {/* Bottom Row: Add your review & 5 Stars */}
                <div className="flex items-center justify-between pt-1 border-t border-slate-50 dark:border-white/5">
                  <span className="text-xs font-medium text-slate-600 dark:text-slate-400">
                    Add your review
                  </span>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={(e) => handleRate(e, staff.id, star)}
                        className="p-0.5 text-slate-300 dark:text-slate-600 hover:text-amber-400 hover:scale-110 transition-all press-scale"
                        aria-label={`Rate ${star} star`}
                      >
                        <Star
                          size={18}
                          className={
                            star <= userRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-400'
                          }
                        />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Promotional Service Banner (Matching Image 1) */}
        <div className="rounded-3xl bg-gradient-to-r from-sky-50 via-cyan-50 to-blue-50 dark:from-sky-950/40 dark:via-cyan-950/30 dark:to-blue-950/40 border border-sky-100 dark:border-sky-900/40 p-4 relative overflow-hidden shadow-xs">
          {/* Subtle Ambient Graphic */}
          <div className="absolute -right-6 -bottom-6 w-32 h-32 bg-sky-400/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex items-center justify-between relative z-10">
            <div className="flex flex-col gap-1 max-w-[65%]">
              {/* Badge */}
              <div className="flex items-center gap-1">
                <span className="text-[11px] font-bold text-rose-500 uppercase tracking-tight">
                  Don't Wait Around!
                </span>
                <span className="w-4 h-4 rounded-full bg-rose-500 text-white flex items-center justify-center text-[10px]">
                  ↘
                </span>
              </div>

              {/* Headline */}
              <h4 className="text-sm font-black text-sky-950 dark:text-sky-100 flex items-center gap-1">
                <span>Repaired in 30 mins!</span>
                <Clock size={14} className="text-sky-700" />
              </h4>

              {/* Offer */}
              <p className="text-xs text-slate-700 dark:text-slate-300 font-semibold mt-0.5">
                Book an <span className="font-bold text-slate-900 dark:text-white">Electrical Services</span>{' '}
                <span className="text-rose-600 font-black">@₹99</span>
              </p>

              {/* CTA Button */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookService || onAddNewStaff}
                  className="px-4 py-2 rounded-xl bg-[#0b4d94] hover:bg-[#083a73] text-white font-extrabold text-xs shadow-sm transition-all press-scale"
                >
                  Book Now
                </button>
              </div>
            </div>

            {/* Illustration on Right (Ceiling Fan & Technician) */}
            <div className="w-24 h-24 relative flex items-center justify-center shrink-0">
              <img
                src="https://images.unsplash.com/photo-1621905251189-08b45d6a269e?auto=format&fit=crop&w=250&q=80"
                alt="Electrician Service"
                className="w-20 h-20 rounded-2xl object-cover shadow-sm border-2 border-white dark:border-slate-800"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
