import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Phone,
  Star,
  ChevronRight,
  CheckCircle2,
  Plus,
  Search,
  CreditCard,
  Calendar,
  Sparkles,
  Users,
  Compass
} from 'lucide-react';
import {
  ChefCook3D,
  MaidBroom3D,
  DriverWheel3D,
  CarWash3D,
  NannyBottle3D,
  GardenerPlant3D,
  CompassDirectory3D,
} from '../../components/3d/Module3DIcons';

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
  attendancePresentCount?: number;
  attendanceTotalDays?: number;
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
    attendancePresentCount: 0,
    attendanceTotalDays: 30,
    policeVerified: true,
    salaryPerMonth: 5000,
    salaryDueDays: 14,
    joinedDate: '6 September 2024',
    sinceYear: '2024',
    towerFlat: 'TOWER-10 • Flat 1204',
    openToWork: false,
    notifyOnEntryExit: true,
    languages: ['Hindi'],
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'stf_sunita',
    name: 'Sunita Devi',
    role: 'Maid',
    phone: '98452 38102',
    maskedPhone: '*********02',
    rating: 5.0,
    reviewsCount: 24,
    flatsWorking: 4,
    status: 'in_campus',
    statusText: 'In Campus • 08:30 AM',
    entryTime: '08:30 AM',
    gateNumber: 'Gate 2',
    monthlyAttendance: '22/30 Days',
    attendancePresentCount: 22,
    attendanceTotalDays: 30,
    policeVerified: true,
    salaryPerMonth: 4500,
    salaryDueDays: 9,
    joinedDate: '12 January 2023',
    sinceYear: '2023',
    towerFlat: 'TOWER-10 • Flat 1204',
    openToWork: true,
    notifyOnEntryExit: true,
    languages: ['Hindi', 'English'],
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
];

const QUICK_CATEGORIES = [
  { id: 'cat_cook', name: 'Cook', Icon3D: ChefCook3D, count: 9 },
  { id: 'cat_maid', name: 'Maid', Icon3D: MaidBroom3D, count: 706 },
  { id: 'cat_driver', name: 'Driver', Icon3D: DriverWheel3D, count: 7 },
  { id: 'cat_cleaner', name: 'Car Cleaner', Icon3D: CarWash3D, count: 16 },
  { id: 'cat_nanny', name: 'Nanny', Icon3D: NannyBottle3D, count: 4 },
  { id: 'cat_gardener', name: 'Gardener', Icon3D: GardenerPlant3D, count: 3 },
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
}) => {
  const [staffList, setStaffList] = useState<DomesticStaffMember[]>(SAMPLE_HOUSEHOLD_STAFF);
  const [ratings, setRatings] = useState<Record<string, number>>({
    stf_vikash: 0,
    stf_sunita: 5,
  });
  const [toastMsg, setToastMsg] = useState<string>('');
  const [activeFilter, setActiveFilter] = useState<'all' | 'in_campus' | 'not_in_campus'>('all');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleRate = (e: React.MouseEvent, staffId: string, staffName: string, starVal: number) => {
    e.stopPropagation();
    setRatings((prev) => ({ ...prev, [staffId]: starVal }));
    showToast(`✓ Submitted ${starVal}-star review for ${staffName}!`);
  };

  const handleCall = (e: React.MouseEvent, staff: DomesticStaffMember) => {
    e.stopPropagation();
    showToast(`Calling ${staff.name} at +91 ${staff.phone}...`);
  };

  const handleAttendanceClick = (e: React.MouseEvent, staff: DomesticStaffMember) => {
    e.stopPropagation();
    if (onViewAttendance) {
      onViewAttendance(staff);
    } else {
      onSelectStaff(staff);
    }
  };

  const filteredStaff = staffList.filter((s) => {
    if (activeFilter === 'in_campus') return s.status === 'in_campus';
    if (activeFilter === 'not_in_campus') return s.status === 'not_in_campus';
    return true;
  });

  const inCampusCount = staffList.filter((s) => s.status === 'in_campus').length;
  const notInCount = staffList.filter((s) => s.status === 'not_in_campus').length;

  return (
    <div className="w-full min-h-full flex flex-col bg-[#F8FAF9] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 relative pb-16">
      {/* Toast Notification Container */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-[#04BB49]/40 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200 backdrop-blur-md">
          <CheckCircle2 size={15} className="text-[#04BB49] shrink-0" />
          <span className="flex-1 text-[11px] leading-tight font-medium">{toastMsg}</span>
        </div>
      )}

      {/* Sticky Top Header Bar */}
      <div className="px-4 py-3 bg-white/90 dark:bg-obsidian-900/90 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
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
          <div>
            <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Daily Help
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              Tower 10 • Flat 1204
            </p>
          </div>
        </div>

        {/* Action: Find Daily Help */}
        <button
          type="button"
          onClick={onBrowseDirectory}
          className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8FBF0] dark:bg-emerald-950/60 border border-[#04BB49]/20 text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] hover:bg-[#d4f8e1] transition-all press-scale shadow-2xs"
        >
          <CompassDirectory3D size={16} />
          <span>Find daily help</span>
        </button>
      </div>

      {/* Main Content Area - Flows from top without awkward voids */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* SECTION 1: Status & Household Summary Bar */}
        <div className="flex items-center justify-between gap-2 bg-white dark:bg-slate-900/80 p-2 rounded-2xl border border-slate-100 dark:border-white/10 shadow-2xs">
          <button
            type="button"
            onClick={() => setActiveFilter('all')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all text-center ${
              activeFilter === 'all'
                ? 'bg-[#04BB49] text-white shadow-xs'
                : 'text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-white/5'
            }`}
          >
            All Staff ({staffList.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('in_campus')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeFilter === 'in_campus'
                ? 'bg-[#04BB49] text-white shadow-xs'
                : 'text-emerald-700 dark:text-emerald-400 hover:bg-emerald-50 dark:hover:bg-emerald-950/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
            <span>In Campus ({inCampusCount})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveFilter('not_in_campus')}
            className={`flex-1 py-1.5 px-2 rounded-xl text-[11px] font-bold transition-all flex items-center justify-center gap-1.5 ${
              activeFilter === 'not_in_campus'
                ? 'bg-[#04BB49] text-white shadow-xs'
                : 'text-amber-700 dark:text-amber-400 hover:bg-amber-50 dark:hover:bg-amber-950/30'
            }`}
          >
            <span className="w-2 h-2 rounded-full bg-amber-500 shrink-0" />
            <span>Not in yet ({notInCount})</span>
          </button>
        </div>

        {/* SECTION 2: Quick Hire Categories Horizontal Row */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h2 className="text-xs font-bold text-slate-800 dark:text-slate-200">
              Explore Community Helpers
            </h2>
            <button
              type="button"
              onClick={onBrowseDirectory}
              className="text-[11px] font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-0.5 hover:underline"
            >
              <span>View All 18</span>
              <ChevronRight size={12} />
            </button>
          </div>

          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none -mx-1 px-1">
            {QUICK_CATEGORIES.map((cat) => {
              const Icon3D = cat.Icon3D;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={onBrowseDirectory}
                  className="shrink-0 flex items-center gap-1.5 px-3 py-2 rounded-2xl bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 hover:border-[#04BB49]/40 hover:bg-[#E8FBF0]/40 transition-all press-scale shadow-2xs"
                >
                  <Icon3D size={18} />
                  <span className="text-xs font-bold text-slate-800 dark:text-white">
                    {cat.name}
                  </span>
                  <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-white/10 text-[9px] font-bold text-slate-500 dark:text-slate-400">
                    {cat.count}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* SECTION 3: My Household Staff Cards (Redesigned with /ui-ux-pro-max) */}
        <div className="flex flex-col gap-3.5">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Assigned to Flat 1204 ({filteredStaff.length})
            </h2>
            <button
              type="button"
              onClick={onAddNewStaff}
              className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-1 hover:underline press-scale"
            >
              <Plus size={13} strokeWidth={2.5} />
              <span>Add Staff</span>
            </button>
          </div>

          {filteredStaff.map((staff) => {
            const isOnline = staff.status === 'in_campus';
            const userRating = ratings[staff.id] ?? staff.rating;
            const attendancePresent = staff.attendancePresentCount ?? 0;
            const attendanceTotal = staff.attendanceTotalDays ?? 30;
            const attendancePercent = Math.round((attendancePresent / attendanceTotal) * 100);

            return (
              <div
                key={staff.id}
                onClick={() => onSelectStaff(staff)}
                className="p-4 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:border-[#04BB49]/30 transition-all cursor-pointer flex flex-col gap-3.5 relative group"
              >
                {/* Top Section: Avatar, Status Badge, Identity, Call Button */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3.5 min-w-0 flex-1">
                    {/* Minimal 48px Avatar with Status Indicator Ring */}
                    <div className="relative w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-full shrink-0">
                      <img
                        src={staff.avatarUrl}
                        alt={staff.name}
                        className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-2xs group-hover:scale-105 transition-transform"
                      />
                      {/* Presence Status Dot */}
                      <span
                        className={`absolute -top-0.5 -right-0.5 w-3.5 h-3.5 rounded-full border-2 border-white dark:border-slate-900 flex items-center justify-center ${
                          isOnline ? 'bg-emerald-500' : 'bg-amber-400'
                        }`}
                        title={isOnline ? 'In campus' : 'Not in yet'}
                      />
                    </div>

                    {/* Name, Role & Presence Pill */}
                    <div className="min-w-0 flex-1">
                      <div className="flex items-center gap-1.5 flex-wrap">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight truncate">
                          {staff.name}
                        </h3>
                        <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[10px] font-bold shrink-0">
                          {staff.role}
                        </span>
                      </div>

                      {/* Presence status with icon */}
                      <div className="flex items-center gap-1.5 mt-1">
                        <span
                          className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold ${
                            isOnline
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-400 border border-emerald-200/60'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-400 border border-amber-200/60'
                          }`}
                        >
                          <Clock size={10} className="shrink-0" />
                          <span>{staff.statusText || (isOnline ? 'In Campus' : 'Not in yet')}</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Circular Call Button (Accessible 40px Hit Target) */}
                  <button
                    type="button"
                    onClick={(e) => handleCall(e, staff)}
                    className="w-10 h-10 min-w-[40px] rounded-full bg-[#E8FBF0] dark:bg-emerald-950/60 text-[#03963B] dark:text-[#0ECD5A] border border-[#04BB49]/20 flex items-center justify-center hover:bg-[#d5f7e3] transition-colors press-scale shrink-0 shadow-2xs"
                    aria-label={`Call ${staff.name}`}
                  >
                    <Phone size={16} />
                  </button>
                </div>

                {/* Middle Metrics Cardlet: Attendance Bar & Salary Status */}
                <div className="grid grid-cols-2 gap-2 bg-slate-50/70 dark:bg-white/5 p-2.5 rounded-2xl border border-slate-100 dark:border-white/5">
                  {/* Left: Monthly Attendance */}
                  <div
                    onClick={(e) => handleAttendanceClick(e, staff)}
                    className="flex flex-col gap-1 cursor-pointer hover:opacity-80 transition-opacity"
                  >
                    <div className="flex items-center justify-between text-[10px] font-bold text-slate-500 dark:text-slate-400">
                      <span>Attendance</span>
                      <span className="text-[#03963B] dark:text-[#0ECD5A]">{staff.monthlyAttendance}</span>
                    </div>
                    {/* Micro Progress Bar */}
                    <div className="w-full h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-[#04BB49] rounded-full transition-all duration-500"
                        style={{ width: `${Math.max(attendancePercent, 6)}%` }}
                      />
                    </div>
                  </div>

                  {/* Right: Salary Info */}
                  <div className="flex flex-col justify-center border-l border-slate-200/60 dark:border-white/10 pl-2.5">
                    <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400">
                      Monthly Salary
                    </span>
                    <span className="text-xs font-black text-slate-900 dark:text-white">
                      ₹{staff.salaryPerMonth.toLocaleString('en-IN')}{' '}
                      <span className="text-[10px] font-normal text-slate-400">/ mo</span>
                    </span>
                  </div>
                </div>

                {/* Primary Action Row: View Attendance > */}
                <div className="flex items-center justify-between pt-0.5">
                  <button
                    type="button"
                    onClick={(e) => handleAttendanceClick(e, staff)}
                    className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-1 hover:gap-1.5 transition-all press-scale"
                  >
                    <Calendar size={13} className="shrink-0" />
                    <span>View Attendance Calendar</span>
                    <ChevronRight size={14} />
                  </button>

                  <span className="text-[10px] font-semibold text-slate-400">
                    {staff.towerFlat || 'Tower 10'}
                  </span>
                </div>

                {/* Bottom Review Row: Add your review & 5 Stars */}
                <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5">
                  <span className="text-xs font-semibold text-slate-600 dark:text-slate-400">
                    Add your review
                  </span>

                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={(e) => handleRate(e, staff.id, staff.name, star)}
                        className="p-1 text-slate-300 dark:text-slate-600 hover:text-amber-400 hover:scale-110 transition-all press-scale"
                        aria-label={`Rate ${star} star`}
                      >
                        <Star
                          size={16}
                          className={
                            star <= userRating
                              ? 'text-amber-400 fill-amber-400'
                              : 'text-slate-300 dark:text-slate-600'
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

        {/* SECTION 4: Browse Community Staff Invite Card */}
        <div className="p-4 rounded-[26px] bg-gradient-to-br from-[#E8FBF0] to-[#E0F7EB] dark:from-emerald-950/30 dark:to-teal-950/20 border border-[#04BB49]/20 flex flex-col gap-2.5">
          <div className="flex items-center gap-2">
            <span className="w-6 h-6 rounded-full bg-[#04BB49] text-white flex items-center justify-center text-xs shadow-xs">
              ✦
            </span>
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white">
              Need another helper for your flat?
            </h3>
          </div>
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            Over 700+ verified maids, cooks, drivers, and car cleaners are currently active in Prestige Palm Heights with reviews from your neighbors.
          </p>
          <button
            type="button"
            onClick={onBrowseDirectory}
            className="self-start mt-1 px-3.5 py-1.5 rounded-xl bg-[#04BB49] hover:bg-[#03963B] text-white text-xs font-bold flex items-center gap-1 shadow-2xs transition-all press-scale"
          >
            <span>Explore Community Directory</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>
    </div>
  );
};
