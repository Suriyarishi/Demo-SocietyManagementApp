import React from 'react';
import { Search, PieChart, LayoutGrid, User } from 'lucide-react';

export type RootTabType = 'home' | 'search' | 'society' | 'services' | 'profile' | 'activity' | 'bills';

interface AppBottomNavProps {
  activeTab: RootTabType;
  onTabChange: (tab: RootTabType) => void;
}

const HomeGlyph: React.FC<{ active: boolean; className?: string }> = ({ active, className = '' }) => {
  if (active) {
    return (
      <svg width="19" height="19" viewBox="0 0 24 24" fill="currentColor" className={className}>
        <path d="M11 20v-5a1 1 0 0 1 2 0v5h5a2 2 0 0 0 2-2V9.6a2 2 0 0 0-.74-1.55l-6-4.8a2 2 0 0 0-2.52 0l-6 4.8A2 2 0 0 0 4 9.6V18a2 2 0 0 0 2 2h5z" />
      </svg>
    );
  }
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
      <path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
      <polyline points="9 22 9 12 15 12 15 22" />
    </svg>
  );
};

export const AppBottomNav: React.FC<AppBottomNavProps> = ({ activeTab, onTabChange }) => {
  // Normalize legacy tabs to our 5 primary icons in requested order: home, search, society, services, profile
  const normalizedActiveTab = ((): 'home' | 'search' | 'society' | 'services' | 'profile' => {
    if (activeTab === 'search') return 'search';
    if (activeTab === 'society') return 'society';
    if (activeTab === 'services' || activeTab === 'bills' || activeTab === 'activity') return 'services';
    if (activeTab === 'profile') return 'profile';
    return 'home';
  })();

  const tabs = [
    { id: 'home' as const, label: 'Home' },
    { id: 'search' as const, label: 'Search' },
    { id: 'society' as const, label: 'Society' },
    { id: 'services' as const, label: 'Services' },
    { id: 'profile' as const, label: 'Profile' },
  ];

  return (
    <nav className="w-full bg-white/95 dark:bg-[#070A11]/95 backdrop-blur-xl rounded-t-[32px] pt-3 pb-2.5 px-3.5 shadow-[0_-8px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_-10px_35px_rgba(0,0,0,0.5)] border-t border-slate-200/80 dark:border-white/10 z-40 shrink-0 select-none flex flex-col items-center">
      {/* 5-Tab Bar Container (Strict Order: Home, Search, Society, Services, Profile) */}
      <div className="w-full flex items-center justify-between px-0.5">
        {tabs.map((tab) => {
          const isActive = normalizedActiveTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center justify-center transition-all duration-300 ease-out press-scale focus:outline-none ${
                isActive
                  ? 'h-11 px-4 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] border border-[#04BB49]/35 dark:border-[#04BB49]/40 shadow-sm shadow-[#04BB49]/15 dark:shadow-[#04BB49]/20 gap-2 shrink-0'
                  : 'w-11 h-11 rounded-full text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 transition-colors shrink-0'
              }`}
            >
              {tab.id === 'home' && (
                <HomeGlyph active={isActive} className={isActive ? 'text-[#04BB49] dark:text-[#0ECD5A]' : 'text-current'} />
              )}
              {tab.id === 'search' && (
                <Search size={20} strokeWidth={isActive ? 2.4 : 1.9} className={isActive ? 'text-[#04BB49] dark:text-[#0ECD5A]' : 'text-current'} />
              )}
              {tab.id === 'society' && (
                <PieChart size={20} strokeWidth={isActive ? 2.4 : 1.9} className={isActive ? 'text-[#04BB49] dark:text-[#0ECD5A]' : 'text-current'} />
              )}
              {tab.id === 'services' && (
                <LayoutGrid size={20} strokeWidth={isActive ? 2.4 : 1.9} className={isActive ? 'text-[#04BB49] dark:text-[#0ECD5A]' : 'text-current'} />
              )}
              {tab.id === 'profile' && (
                <User size={20} strokeWidth={isActive ? 2.4 : 1.9} className={isActive ? 'text-[#04BB49] dark:text-[#0ECD5A]' : 'text-current'} />
              )}

              {/* Expanding Label for Active Tab */}
              {isActive && (
                <span className="text-xs font-bold text-[#04BB49] dark:text-[#0ECD5A] tracking-wide animate-in fade-in zoom-in-95 duration-200">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sleek iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-black/25 dark:bg-white/25 rounded-full mt-3 mb-0.5" />
    </nav>
  );
};
