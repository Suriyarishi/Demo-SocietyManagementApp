import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Star,
  ShieldCheck,
  Plus,
  Phone,
  Filter,
  CheckCircle2,
  Building,
  UserCheck
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { DomesticStaffMember } from './StaffDashboardScreen';

const COMMUNITY_STAFF_CATALOG: DomesticStaffMember[] = [
  {
    id: 'cat_01',
    name: 'Lakshmi R',
    role: 'Cook',
    phone: '98451 92831',
    rating: 4.9,
    reviewsCount: 38,
    flatsWorking: 4,
    status: 'in_campus',
    monthlyAttendance: '26/26 Days',
    policeVerified: true,
    salaryPerMonth: 6500,
    salaryDueDays: 14,
  },
  {
    id: 'cat_02',
    name: 'Sunita Devi',
    role: 'Cook',
    phone: '98112 40291',
    rating: 4.8,
    reviewsCount: 29,
    flatsWorking: 3,
    status: 'in_campus',
    monthlyAttendance: '25/26 Days',
    policeVerified: true,
    salaryPerMonth: 6000,
    salaryDueDays: 14,
  },
  {
    id: 'cat_03',
    name: 'Ramesh Kumar',
    role: 'Driver',
    phone: '98204 11294',
    rating: 4.8,
    reviewsCount: 22,
    flatsWorking: 2,
    status: 'in_campus',
    monthlyAttendance: '25/26 Days',
    policeVerified: true,
    salaryPerMonth: 18000,
    salaryDueDays: 14,
  },
  {
    id: 'cat_04',
    name: 'Pooja Verma',
    role: 'Nanny',
    phone: '98402 81920',
    rating: 4.9,
    reviewsCount: 19,
    flatsWorking: 1,
    status: 'not_in_campus',
    monthlyAttendance: '26/26 Days',
    policeVerified: true,
    salaryPerMonth: 12000,
    salaryDueDays: 14,
  },
  {
    id: 'cat_05',
    name: 'Kishore G',
    role: 'Dog Walker',
    phone: '98701 44021',
    rating: 4.9,
    reviewsCount: 15,
    flatsWorking: 6,
    status: 'in_campus',
    monthlyAttendance: '24/26 Days',
    policeVerified: true,
    salaryPerMonth: 3500,
    salaryDueDays: 14,
  },
];

interface CommunityStaffDirectoryScreenProps {
  onBack: () => void;
  onSelectStaff: (staff: DomesticStaffMember) => void;
  onAddStaffToFlat: (staff: DomesticStaffMember) => void;
}

export const CommunityStaffDirectoryScreen: React.FC<CommunityStaffDirectoryScreenProps> = ({
  onBack,
  onSelectStaff,
  onAddStaffToFlat,
}) => {
  const [selectedRole, setSelectedRole] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const roles = ['All', 'Cook', 'Driver', 'Cleaner', 'Nanny', 'Dog Walker'];

  const filteredStaff = COMMUNITY_STAFF_CATALOG.filter((s) => {
    const matchesRole = selectedRole === 'All' || s.role === selectedRole;
    const matchesQuery =
      s.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.role.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRole && matchesQuery;
  });

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-200">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 shrink-0"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <div>
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              Society Staff Directory
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Pre-vetted workers with neighbor ratings.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center h-[54px] rounded-2xl border border-slate-300/80 dark:border-obsidian-750 bg-slate-50/90 dark:bg-obsidian-900/90 hover:bg-slate-100/70 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15 shadow-2xs transition-all group">
          <div className="w-9 h-9 rounded-xl bg-white dark:bg-obsidian-800 text-slate-500 dark:text-slate-400 border border-slate-200/90 dark:border-obsidian-700 shadow-2xs flex items-center justify-center shrink-0 ml-2 mr-2.5 group-focus-within:text-cobalt-600 dark:group-focus-within:text-cobalt-400 pointer-events-none transition-colors">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name, role (Cook, Driver)..."
            className="w-full h-full pr-8 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm font-semibold outline-none"
          />
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {roles.map((r) => (
            <button
              key={r}
              type="button"
              onClick={() => setSelectedRole(r)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedRole === r
                  ? 'bg-cobalt-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-obsidian-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {r}
            </button>
          ))}
        </div>

        {/* Staff Catalog Cards */}
        <div className="flex flex-col gap-3 max-h-[490px] overflow-y-auto no-scrollbar pr-0.5">
          {filteredStaff.map((staff) => (
            <div
              key={staff.id}
              className="p-4 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3"
            >
              <div className="flex items-start justify-between gap-3">
                <div
                  onClick={() => onSelectStaff(staff)}
                  className="flex items-center gap-3 cursor-pointer flex-1"
                >
                  <div className="w-12 h-12 rounded-2xl bg-cobalt-50 text-cobalt-700 dark:bg-cobalt-950/60 dark:text-cobalt-400 font-bold text-sm flex items-center justify-center shrink-0">
                    {staff.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {staff.name}
                      </h4>
                      {staff.policeVerified && (
                        <ShieldCheck size={14} className="text-emerald-500 shrink-0" />
                      )}
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {staff.role} • Works in {staff.flatsWorking} flats
                    </p>
                    <div className="flex items-center gap-1 text-[11px] text-amber-500 font-bold mt-1">
                      <Star size={11} className="fill-current" />
                      <span>{staff.rating}</span>
                      <span className="text-slate-500 dark:text-slate-400 font-normal">({staff.reviewsCount} reviews)</span>
                    </div>
                  </div>
                </div>

                <div className="text-right shrink-0">
                  <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                    ~₹{staff.salaryPerMonth.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">per month</span>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="pt-2.5 border-t border-slate-100 dark:border-obsidian-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Calling ${staff.name} at +91 ${staff.phone}`)}
                  className="h-10 px-3 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-700 dark:text-slate-200 text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-obsidian-700"
                >
                  <Phone size={13} />
                  <span>Call</span>
                </button>
                <button
                  type="button"
                  onClick={() => onAddStaffToFlat(staff)}
                  className="flex-1 h-10 rounded-xl bg-cobalt-600 hover:bg-cobalt-500 text-white text-xs font-bold flex items-center justify-center gap-1.5 transition-colors"
                >
                  <Plus size={14} />
                  <span>Add to My Flat (Flat 1204)</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
