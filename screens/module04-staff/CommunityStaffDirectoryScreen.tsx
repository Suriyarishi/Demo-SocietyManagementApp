import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Plus,
  ChevronRight,
  CheckCircle2,
  Clock,
  Hand
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
  // Cooks (Matching Screenshot 9)
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
  // Maids (Matching Screenshot 9)
  {
    id: 'dir_maid_01',
    name: 'kumkum',
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
    name: 'shashi',
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
    openToWork: true,
    experienceStr: '17 days',
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
  onBookCarpentry,
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');

  const cooks = DIRECTORY_STAFF_CARDS.filter((s) => s.role === 'Cook');
  const maids = DIRECTORY_STAFF_CARDS.filter((s) => s.role === 'Maid');

  const filteredCategories = DIRECTORY_CATEGORIES.filter((c) =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-[#F8FAF9] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 pb-12">
      {/* Top Header Bar (Matching Screenshot 9) */}
      <div className="px-4 py-3 bg-white dark:bg-obsidian-900 border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-30">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
            aria-label="Back"
          >
            <ArrowLeft size={18} className="text-slate-800 dark:text-white" />
          </button>
          <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
            Find Daily Help
          </h1>
        </div>

        {/* Add Daily Help Pill Button */}
        <button
          type="button"
          onClick={onAddNewStaff || onBack}
          className="h-8 px-3 rounded-full bg-[#E8FBF0] hover:bg-[#d5f7e3] text-[#03963B] border border-[#04BB49]/30 text-xs font-bold flex items-center gap-1.5 transition-colors press-scale shadow-2xs"
        >
          <Plus size={13} strokeWidth={3} />
          <span>Add daily help</span>
        </button>
      </div>

      <div className="p-4 flex flex-col gap-4">
        {/* Search Input Bar (Matching Screenshot 9) */}
        <div className="relative">
          <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search category or name"
            className="w-full h-11 pl-10 pr-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white placeholder:text-slate-400 shadow-2xs focus:outline-none focus:border-[#04BB49] focus:ring-1 focus:ring-[#04BB49] transition-all"
          />
        </div>

        {/* SECTION 1: Cook (9 >) Minimal Cards (Matching Screenshot 9) */}
        <div className="p-4 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Cook
            </h3>
            <div className="text-xs font-bold text-slate-400 flex items-center gap-0.5">
              <span>9</span>
              <ChevronRight size={14} />
            </div>
          </div>

          {/* Minimal Compact Cards Grid */}
          <div className="grid grid-cols-2 gap-3">
            {cooks.map((staff) => (
              <div
                key={staff.id}
                onClick={() => onSelectStaff(staff)}
                className="p-3 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center gap-1.5 hover:border-[#04BB49]/40 hover:bg-white transition-all cursor-pointer press-scale"
              >
                {/* Minimal 44px Circular Avatar (Never stretches) */}
                <div className="w-11 h-11 min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-white/10 shadow-2xs shrink-0">
                  <img
                    src={staff.avatarUrl}
                    alt={staff.name}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full object-cover"
                  />
                </div>

                {/* Open to Work Badge */}
                {staff.openToWork ? (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 text-[9px] font-bold inline-flex items-center gap-0.5">
                    <Hand size={9} />
                    <span>Open to work</span>
                  </span>
                ) : (
                  <div className="h-4" />
                )}

                {/* Name */}
                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate w-full">
                  {staff.name}
                </h4>

                {/* Info row */}
                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                  <span>🏠 {staff.flatsWorking} {staff.flatsWorking === 1 ? 'Home' : 'Homes'}</span>
                  {staff.rating > 0 && (
                    <span className="flex items-center text-amber-500 font-bold ml-0.5">
                      ⭐ {staff.rating}
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-0.5">
                  <CheckCircle2 size={10} />
                  <span>{staff.experienceStr || 'Verified'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* SECTION 2: Maid (706 >) Minimal Cards (Matching Screenshot 9) */}
        <div className="p-4 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
              Maid
            </h3>
            <div className="text-xs font-bold text-slate-400 flex items-center gap-0.5">
              <span>706</span>
              <ChevronRight size={14} />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {maids.map((staff) => (
              <div
                key={staff.id}
                onClick={() => onSelectStaff(staff)}
                className="p-3 rounded-2xl bg-slate-50/60 dark:bg-white/5 border border-slate-100 dark:border-white/10 flex flex-col items-center text-center gap-1.5 hover:border-[#04BB49]/40 hover:bg-white transition-all cursor-pointer press-scale"
              >
                <div className="w-11 h-11 min-w-[44px] min-h-[44px] max-w-[44px] max-h-[44px] rounded-full overflow-hidden bg-slate-100 dark:bg-slate-800 border border-slate-200/80 dark:border-white/10 shadow-2xs shrink-0">
                  <img
                    src={staff.avatarUrl}
                    alt={staff.name}
                    className="w-11 h-11 min-w-[44px] min-h-[44px] rounded-full object-cover"
                  />
                </div>

                {staff.openToWork ? (
                  <span className="px-2 py-0.5 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 border border-indigo-200/50 text-[9px] font-bold inline-flex items-center gap-0.5">
                    <Hand size={9} />
                    <span>Open to work</span>
                  </span>
                ) : (
                  <div className="h-4" />
                )}

                <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate w-full">
                  {staff.name}
                </h4>

                <div className="text-[10px] text-slate-500 dark:text-slate-400 flex items-center justify-center gap-1">
                  <span>🏠 {staff.flatsWorking} Homes</span>
                  {staff.rating > 0 && (
                    <span className="flex items-center text-amber-500 font-bold ml-0.5">
                      ⭐ {staff.rating}
                    </span>
                  )}
                </div>

                <div className="text-[10px] font-semibold text-sky-600 dark:text-sky-400 flex items-center gap-0.5">
                  <CheckCircle2 size={10} />
                  <span>{staff.experienceStr || 'Verified'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Promo Banner: Carpentry Inspection @ ₹99 (Matching Screenshot 9) */}
        <div className="rounded-[28px] bg-gradient-to-r from-amber-50/80 via-orange-50/50 to-stone-50 border border-orange-100 dark:border-orange-950/40 p-4 relative overflow-hidden shadow-xs">
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

              <h4 className="text-sm font-black text-amber-950 dark:text-amber-100 flex items-center gap-1">
                <span>Repaired in 60 mins!</span>
                <Clock size={13} className="text-amber-700" />
              </h4>

              <p className="text-xs text-slate-700 dark:text-slate-300 font-medium mt-0.5 leading-snug">
                Book a <span className="font-bold text-slate-900 dark:text-white">Carpentry Inspection</span>{' '}
                <span className="text-rose-600 font-black">@₹99</span>
              </p>

              <div className="pt-2">
                <button
                  type="button"
                  onClick={onBookCarpentry || onBack}
                  className="px-4 py-2 rounded-xl bg-[#7c2d12] hover:bg-[#5b210e] text-white font-extrabold text-xs shadow-xs transition-all press-scale"
                >
                  Book Now
                </button>
              </div>
            </div>

            <div className="w-20 h-20 min-w-[80px] min-h-[80px] relative flex items-center justify-center shrink-0">
              <img
                src="https://images.unsplash.com/photo-1581783342308-f792dbdd27c5?auto=format&fit=crop&w=250&q=80"
                alt="Carpentry Inspection"
                className="w-18 h-18 rounded-2xl object-cover shadow-xs border-2 border-white dark:border-slate-800"
              />
            </div>
          </div>
        </div>

        {/* SECTION 3: All 16 Categories Vertical Directory (Matching Screenshot 9) */}
        <div className="p-3 rounded-[28px] bg-white dark:bg-slate-900 border border-slate-100 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.05)] flex flex-col divide-y divide-slate-100 dark:divide-white/5">
          {filteredCategories.map((cat) => (
            <button
              key={cat.id}
              type="button"
              onClick={() => {
                const match = DIRECTORY_STAFF_CARDS.find(
                  (s) => s.role.toLowerCase() === cat.name.toLowerCase()
                );
                if (match) {
                  onSelectStaff(match);
                } else {
                  onSelectStaff(DIRECTORY_STAFF_CARDS[0]);
                }
              }}
              className="py-3 flex items-center justify-between text-left hover:bg-slate-50 dark:hover:bg-white/5 px-2.5 rounded-xl transition-colors group"
            >
              <div className="flex items-center gap-3">
                <span className="text-base group-hover:scale-110 transition-transform">
                  {cat.icon}
                </span>
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {cat.name}
                </span>
              </div>

              <div className="flex items-center gap-1 text-slate-400">
                <span className="text-xs font-bold">{cat.count}</span>
                <ChevronRight size={14} />
              </div>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
