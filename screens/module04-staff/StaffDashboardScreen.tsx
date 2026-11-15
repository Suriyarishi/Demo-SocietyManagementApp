import React from 'react';
import {
  Users,
  UserCheck,
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
  ArrowLeft
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { RfidTurnstile3D } from '../../components/3d/Vector3DElements';

export interface DomesticStaffMember {
  id: string;
  name: string;
  role: 'Cook' | 'Driver' | 'Cleaner' | 'Nanny' | 'Dog Walker';
  phone: string;
  rating: number;
  reviewsCount: number;
  flatsWorking: number;
  status: 'in_campus' | 'not_in_campus';
  entryTime?: string;
  gateNumber?: string;
  expectedTime?: string;
  monthlyAttendance: string;
  policeVerified: boolean;
  salaryPerMonth: number;
  salaryDueDays: number;
}

export const SAMPLE_HOUSEHOLD_STAFF: DomesticStaffMember[] = [
  {
    id: 'stf_01',
    name: 'Lakshmi R',
    role: 'Cook',
    phone: '98451 92831',
    rating: 4.9,
    reviewsCount: 38,
    flatsWorking: 4,
    status: 'in_campus',
    entryTime: '07:45 AM',
    gateNumber: 'Gate 2 Pedestrian Turnstile',
    monthlyAttendance: '24 / 26 Days',
    policeVerified: true,
    salaryPerMonth: 6500,
    salaryDueDays: 14,
  },
  {
    id: 'stf_02',
    name: 'Ramesh Kumar',
    role: 'Driver',
    phone: '98204 11294',
    rating: 4.8,
    reviewsCount: 22,
    flatsWorking: 2,
    status: 'in_campus',
    entryTime: '08:15 AM',
    gateNumber: 'Gate 2 (Basement Boom Barrier)',
    monthlyAttendance: '25 / 26 Days',
    policeVerified: true,
    salaryPerMonth: 18000,
    salaryDueDays: 14,
  },
  {
    id: 'stf_03',
    name: 'Anita M',
    role: 'Cleaner',
    phone: '98721 34910',
    rating: 4.7,
    reviewsCount: 45,
    flatsWorking: 5,
    status: 'not_in_campus',
    expectedTime: '10:30 AM',
    monthlyAttendance: '22 / 26 Days',
    policeVerified: true,
    salaryPerMonth: 4000,
    salaryDueDays: 14,
  },
];

interface StaffDashboardScreenProps {
  onBack?: () => void;
  onSelectStaff: (staff: DomesticStaffMember) => void;
  onBrowseDirectory: () => void;
  onAddNewStaff: () => void;
  onOpenLedger: () => void;
}

export const StaffDashboardScreen: React.FC<StaffDashboardScreenProps> = ({
  onBack,
  onSelectStaff,
  onBrowseDirectory,
  onAddNewStaff,
  onOpenLedger,
}) => {
  const activeInCampusCount = SAMPLE_HOUSEHOLD_STAFF.filter((s) => s.status === 'in_campus').length;

  return (
    <div className="w-full min-h-full flex flex-col justify-between pb-24 text-left animate-in fade-in duration-300">
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
                  HOUSEHOLD PERSONNEL
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                Daily Help & Staff
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onBrowseDirectory}
              className="h-8 px-2.5 rounded-xl bg-cobalt-50 hover:bg-cobalt-100 dark:bg-cobalt-950/60 dark:hover:bg-cobalt-900/60 border border-cobalt-200 dark:border-cobalt-800/40 text-cobalt-600 dark:text-cobalt-400 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Browse Directory"
            >
              <Search size={13} />
              <span className="text-[11px]">Hire</span>
            </button>

            <button
              type="button"
              onClick={onAddNewStaff}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-700"
              title="Link Staff Passcode"
            >
              <Plus size={15} />
            </button>
          </div>
        </div>

        {/* Live In-Campus Summary Card with 3D RFID Turnstile */}
        <div className="px-4">
          <div className="p-4 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated relative overflow-hidden">
            <div className="flex items-center justify-between gap-3 relative z-10">
              <div className="flex items-center gap-3">
                <RfidTurnstile3D size={54} />
                <div>
                  <div className="flex items-center gap-1.5 mb-0.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                      Live Turnstile Sync
                    </span>
                  </div>
                  <span className="text-sm font-extrabold text-white block leading-tight">
                    {activeInCampusCount} of {SAMPLE_HOUSEHOLD_STAFF.length} Staff on Campus
                  </span>
                  <span className="text-[11px] text-slate-400 mt-0.5 block">
                    Latest check-in: 08:15 AM at Gate 2
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center justify-between text-xs">
              <button
                onClick={onOpenLedger}
                className="text-slate-300 hover:text-white font-medium flex items-center gap-1.5"
              >
                <CreditCard size={14} className="text-cobalt-400" />
                <span>Salary & Leave Ledger</span>
              </button>
              <button
                onClick={onBrowseDirectory}
                className="text-cobalt-400 hover:underline font-bold flex items-center gap-0.5"
              >
                <span>Hire Verified Help</span>
                <ChevronRight size={13} />
              </button>
            </div>
          </div>
        </div>

        {/* My Staff List */}
        <div className="px-4 flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              My Household Roster (Flat 1204)
            </h3>
            <span className="text-[11px] text-slate-400 font-medium">Auto-Synced</span>
          </div>

          <div className="flex flex-col gap-3 max-h-[440px] overflow-y-auto no-scrollbar">
            {SAMPLE_HOUSEHOLD_STAFF.map((staff) => {
              const isInside = staff.status === 'in_campus';
              return (
                <div
                  key={staff.id}
                  onClick={() => onSelectStaff(staff)}
                  className="p-4 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 hover:border-cobalt-500/60 dark:hover:border-cobalt-500/60 transition-all cursor-pointer shadow-ambient flex flex-col gap-3 press-scale"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <div className={`w-12 h-12 rounded-2xl flex items-center justify-center font-bold text-sm shrink-0 ${
                        isInside
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : 'bg-slate-100 text-slate-600 dark:bg-obsidian-800 dark:text-slate-400'
                      }`}>
                        {staff.name.slice(0, 2).toUpperCase()}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                            {staff.name}
                          </h4>
                          {staff.policeVerified && (
                            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-0.5">
                              <ShieldCheck size={12} />
                              <span>Verified</span>
                            </span>
                          )}
                        </div>
                        <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                          {staff.role} • Works in {staff.flatsWorking} Flats
                        </p>
                      </div>
                    </div>

                    <div className="text-right shrink-0">
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider block ${
                        isInside
                          ? 'bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40'
                          : 'bg-slate-100 text-slate-500 dark:bg-obsidian-800 dark:text-slate-400 border border-slate-200 dark:border-obsidian-700'
                      }`}>
                        {isInside ? 'In Campus' : 'Not In'}
                      </span>
                      <div className="flex items-center gap-1 justify-end mt-1 text-[11px] text-amber-500 font-bold">
                        <Star size={11} className="fill-current" />
                        <span>{staff.rating}</span>
                        <span className="text-slate-400 font-normal">({staff.reviewsCount})</span>
                      </div>
                    </div>
                  </div>

                  {/* Attendance & Timing Footer */}
                  <div className="pt-2.5 border-t border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                    {isInside ? (
                      <span className="flex items-center gap-1.5 font-semibold text-emerald-600 dark:text-emerald-400">
                        <Clock size={12} />
                        <span>Inside since {staff.entryTime}</span>
                      </span>
                    ) : (
                      <span className="flex items-center gap-1.5 text-slate-400">
                        <Clock size={12} />
                        <span>Expected at {staff.expectedTime}</span>
                      </span>
                    )}

                    <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">
                      {staff.monthlyAttendance}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Floating Bottom Action CTA */}
      <div className="px-4 pt-3 pb-6">
        <Button
          onClick={onAddNewStaff}
          icon={Plus}
          iconPosition="left"
          size="lg"
        >
          + Add Staff to My Flat
        </Button>
      </div>
    </div>
  );
};
