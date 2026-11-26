import React from 'react';
import {
  NavHome3D,
  NavSearch3D,
  NavSociety3D,
  NavServices3D,
  NavProfile3D,
} from './3d/Module3DIcons';

export type RootTabType = 'home' | 'search' | 'society' | 'services' | 'profile' | 'activity' | 'bills';

interface AppBottomNavProps {
  activeTab: RootTabType;
  onTabChange: (tab: RootTabType) => void;
}

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
                <NavHome3D size={isActive ? 22 : 20} active={isActive} className="transition-transform duration-200" />
              )}
              {tab.id === 'search' && (
                <NavSearch3D size={isActive ? 22 : 20} active={isActive} className="transition-transform duration-200" />
              )}
              {tab.id === 'society' && (
                <NavSociety3D size={isActive ? 22 : 20} active={isActive} className="transition-transform duration-200" />
              )}
              {tab.id === 'services' && (
                <NavServices3D size={isActive ? 22 : 20} active={isActive} className="transition-transform duration-200" />
              )}
              {tab.id === 'profile' && (
                <NavProfile3D size={isActive ? 22 : 20} active={isActive} className="transition-transform duration-200" />
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
