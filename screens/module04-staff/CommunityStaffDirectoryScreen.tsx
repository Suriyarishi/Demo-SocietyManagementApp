import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Plus,
  ChevronRight,
  CheckCircle2,
  Clock,
  Hand,
  Star,
  Users,
  Compass,
  Filter
} from 'lucide-react';
import { DomesticStaffMember } from './StaffDashboardScreen';

export interface DirectoryStaffItem extends DomesticStaffMember {
  experienceStr?: string;
  verifiedBadge?: string;
}

const DIRECTORY_CATEGORIES = [
  { id: 'cat_cook', name: 'Cook', count: 9, icon: '👨‍🍳' },
  { id: 'cat_maid', name: 'Maid', count: 706, icon: '🧹' },
  { id: 'cat_car_cleaner', name: 'Car Cleaner', count: 16, icon: '🚗' },
  { id: 'cat_full_time_maid', name: 'Full Time Maid', count: 1, icon: '🏠' },
  { id: 'cat_milkman', name: 'Milkman', count: 5, icon: '🥛' },
  { id: 'cat_gardener', name: 'Gardener', count: 1, icon: '🪴' },
  { id: 'cat_school_bus', name: 'School Bus', count: 1, icon: '🚌' },
  { id: 'cat_staff', name: 'Staff', count: 3, icon: '👔' },
  { id: 'cat_salon', name: 'Salon', count: 3, icon: '💇' },
  { id: 'cat_tuition', name: 'Tution Teacher', count: 2, icon: '📚' },
  { id: 'cat_paper_boy', name: 'Paper Boy', count: 1, icon: '📰' },
  { id: 'cat_driver', name: 'Driver', count: 7, icon: '🚘' },
  { id: 'cat_pet_walker', name: 'Pet Walker', count: 2, icon: '🐕' },
  { id: 'cat_others', name: 'Others', count: 17, icon: '👥' },
  { id: 'cat_laundry', name: 'Laundry', count: 4, icon: '🧺' },
  { id: 'cat_sport', name: 'Sport', count: 1, icon: '🏸' },
  { id: 'cat_electrician', name: 'Electrician', count: 1, icon: '⚡' },
  { id: 'cat_newspaper', name: 'Newspaper', count: 1, icon: '🗞️' },
];

const DIRECTORY_STAFF_CARDS: DirectoryStaffItem[] = [
  // Cooks
  {
    id: 'dir_cook_01',
    name: 'Vikram',
    role: 'Cook',
    phone: '98450 11928',
    maskedPhone: '*********28',
    rating: 5.0,
    reviewsCount: 16,
    flatsWorking: 3,
    status: 'in_campus',
    statusText: 'In Campus',
    monthlyAttendance: '26/26 Days',
    policeVerified: true,
    salaryPerMonth: 7000,
    salaryDueDays: 14,
    sinceYear: '2024',
    towerFlat: 'TOWER-10',
    openToWork: true,
    experienceStr: '7 months',
    avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'dir_cook_02',
    name: 'Sunil cook',
    role: 'Cook',
    phone: '98192 84710',
    maskedPhone: '*********10',
    rating: 4.8,
    reviewsCount: 28,
    flatsWorking: 1,
    status: 'not_in_campus',
    statusText: 'Not in yet',
    monthlyAttendance: '25/26 Days',
    policeVerified: true,
    salaryPerMonth: 6500,
    salaryDueDays: 14,
    sinceYear: '2020',
    towerFlat: 'TOWER-10',
    openToWork: false,
    experienceStr: '4+ years',
    avatarUrl: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=200&q=80',
  },
  // Maids
  {
    id: 'dir_maid_01',
    name: 'Kumkum',
    role: 'Maid',
    phone: '98761 29384',
    maskedPhone: '*********84',
    rating: 4.9,
    reviewsCount: 12,
    flatsWorking: 7,
    status: 'in_campus',
    statusText: 'In Campus',
    monthlyAttendance: '26/26 Days',
    policeVerified: true,
    salaryPerMonth: 4500,
    salaryDueDays: 14,
    sinceYear: '2024',
    towerFlat: 'TOWER-10',
    openToWork: true,
    experienceStr: '2 months',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=200&q=80',
  },
  {
    id: 'dir_maid_02',
    name: 'Shashi',
    role: 'Maid',
    phone: '98451 90281',
    maskedPhone: '*********81',
    rating: 5.0,
    reviewsCount: 9,
    flatsWorking: 7,
    status: 'in_campus',
    statusText: 'In Campus',
    monthlyAttendance: '26/26 Days',
    policeVerified: true,
    salaryPerMonth: 4200,
    salaryDueDays: 14,
    sinceYear: '2024',
    towerFlat: 'TOWER-10',
    openToWork: false,
    experienceStr: '4+ years',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=200&q=80',
  },
];

interface CommunityStaffDirectoryScreenProps {
  onBack: () => void;
  onSelectStaff: (staff: DomesticStaffMember) => void;
  onAddStaffToFlat: (staff: DomesticStaffMember) => void;
  onAddNewStaff?: () => void;
  onBookCarpentry?: () => void;
}

export const CommunityStaffDirectoryScreen: React.FC<CommunityStaffDirectoryScreenProps> = ({
  onBack,
  onSelectStaff,
  onAddStaffToFlat,
  onAddNewStaff,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeCategory, setActiveCategory] = useState<string>('all');

  const cooks = DIRECTORY_STAFF_CARDS.filter((s) => s.role === 'Cook');
  const maids = DIRECTORY_STAFF_CARDS.filter((s) => s.role === 'Maid');

  const filteredCategories = DIRECTORY_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-full flex flex-col bg-[#F8FAF9] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 pb-16">
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
              Find Daily Help
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              700+ Verified Community Helpers
            </p>
          </div>
        </div>

        {/* Add Daily Help Pill Button */}
        <button
          type="button"
          onClick={onAddNewStaff || onBack}
          className="h-8 px-3 rounded-full bg-[#E8FBF0] hover:bg-[#d5f7e3] text-[#03963B] border border-[#04BB49]/30 text-xs font-bold flex items-center gap-1.5 transition-colors press-scale shadow-2xs"
        >
          <Plus size={13} strokeWidth={2.5} />
          <span>Add New</span>
        </button>
      </div>

      {/* Main Content Area - Flows from top without voids */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Search Input Bar with Category Filters */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by role or helper name..."
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 shadow-2xs focus:outline-none focus:border-[#04BB49] focus:ring-1 focus:ring-[#04BB49] transition-all"
          />
        </div>

        {/* SECTION 1: Cook (9) Cards (Redesigned with /ui-ux-pro-max) */}
        <div className="p-4 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">👨‍🍳</span>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Cooks Available
              </h2>
            </div>
            <div className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-0.5">
              <span>9 in Society</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Minimal High-Density Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {cooks.map((staff) => (
              <div
                key={staff.id}
                onClick={() => onSelectStaff(staff)}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center gap-2 hover:border-[#04BB49]/40 hover:bg-white dark:hover:bg-slate-800/80 transition-all cursor-pointer press-scale shadow-2xs group"
              >
                {/* Minimal 48px Circular Avatar with Online Indicator */}
                <div className="relative w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-full shrink-0">
                  <img
                    src={staff.avatarUrl}
                    alt={staff.name}
                    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-2xs group-hover:scale-105 transition-transform"
                  />
                  <span
                    className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                      staff.status === 'in_campus' ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                </div>

                {/* Open to Work Badge */}
                {staff.openToWork ? (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 text-[9px] font-bold inline-flex items-center gap-0.5">
                    <Hand size={9} />
                    <span>Open to work</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 text-[9px] font-bold">
                    Taking inquiries
                  </span>
                )}

                {/* Name */}
                <h3 className="text-xs font-black text-slate-900 dark:text-white truncate w-full">
                  {staff.name}
                </h3>

                {/* Stats row */}
                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
                  <span>🏠 {staff.flatsWorking} {staff.flatsWorking === 1 ? 'Home' : 'Homes'}</span>
                  {staff.rating > 0 && (
                    <span className="flex items-center text-amber-500 font-bold">
                      ⭐ {staff.rating}
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-semibold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-0.5">
                  <CheckCircle2 size={10} />
                  <span>{staff.experienceStr || 'Verified'}</span>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddStaffToFlat(staff);
                  }}
                  className="w-full mt-1 py-1 px-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-[#E8FBF0] text-slate-800 dark:text-white hover:text-[#03963B] border border-slate-200 dark:border-white/10 text-[10px] font-bold transition-all press-scale shadow-2xs"
                >
                  + Add to Flat
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Maid (706) Cards (Redesigned with /ui-ux-pro-max) */}
        <div className="p-4 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-base">🧹</span>
              <h2 className="text-sm font-extrabold text-slate-900 dark:text-white">
                Maids Available
              </h2>
            </div>
            <div className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-0.5">
              <span>706 in Society</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Minimal High-Density Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {maids.map((staff) => (
              <div
                key={staff.id}
                onClick={() => onSelectStaff(staff)}
                className="p-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center gap-2 hover:border-[#04BB49]/40 hover:bg-white dark:hover:bg-slate-800/80 transition-all cursor-pointer press-scale shadow-2xs group"
              >
                {/* Minimal 48px Circular Avatar with Online Indicator */}
                <div className="relative w-12 h-12 min-w-[48px] min-h-[48px] max-w-[48px] max-h-[48px] rounded-full shrink-0">
                  <img
                    src={staff.avatarUrl}
                    alt={staff.name}
                    className="w-12 h-12 min-w-[48px] min-h-[48px] rounded-full object-cover border-2 border-white dark:border-slate-800 shadow-2xs group-hover:scale-105 transition-transform"
                  />
                  <span
                    className={`absolute -top-0.5 -right-0.5 w-3 h-3 rounded-full border-2 border-white dark:border-slate-900 ${
                      staff.status === 'in_campus' ? 'bg-emerald-500' : 'bg-amber-400'
                    }`}
                  />
                </div>

                {/* Open to Work Badge */}
                {staff.openToWork ? (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 text-[9px] font-bold inline-flex items-center gap-0.5">
                    <Hand size={9} />
                    <span>Open to work</span>
                  </span>
                ) : (
                  <span className="px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 text-[9px] font-bold">
                    Taking inquiries
                  </span>
                )}

                {/* Name */}
                <h3 className="text-xs font-black text-slate-900 dark:text-white truncate w-full">
                  {staff.name}
                </h3>

                {/* Stats row */}
                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1.5 flex-wrap">
                  <span>🏠 {staff.flatsWorking} {staff.flatsWorking === 1 ? 'Home' : 'Homes'}</span>
                  {staff.rating > 0 && (
                    <span className="flex items-center text-amber-500 font-bold">
                      ⭐ {staff.rating}
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-semibold text-[#03963B] dark:text-[#0ECD5A] flex items-center gap-0.5">
                  <CheckCircle2 size={10} />
                  <span>{staff.experienceStr || 'Verified'}</span>
                </div>

                {/* Action button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onAddStaffToFlat(staff);
                  }}
                  className="w-full mt-1 py-1 px-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-[#E8FBF0] text-slate-800 dark:text-white hover:text-[#03963B] border border-slate-200 dark:border-white/10 text-[10px] font-bold transition-all press-scale shadow-2xs"
                >
                  + Add to Flat
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 3: All 18 Domestic Help Categories List */}
        <div className="p-4 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col gap-1">
          <h2 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider mb-2">
            All Helper Categories ({filteredCategories.length})
          </h2>

          <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
            {filteredCategories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => {
                  const sampleMember = DIRECTORY_STAFF_CARDS.find((s) => s.role.toLowerCase() === cat.name.toLowerCase()) || DIRECTORY_STAFF_CARDS[0];
                  onSelectStaff(sampleMember);
                }}
                className="py-3 px-2 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
              >
                <div className="flex items-center gap-3">
                  <span className="text-xl group-hover:scale-110 transition-transform">
                    {cat.icon}
                  </span>
                  <div>
                    <h3 className="text-xs font-bold text-slate-900 dark:text-white">
                      {cat.name}
                    </h3>
                    <p className="text-[10px] text-slate-400">
                      {cat.count} verified {cat.count === 1 ? 'helper' : 'helpers'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 text-xs font-bold text-slate-400 group-hover:text-[#03963B] transition-colors">
                  <ChevronRight size={15} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
