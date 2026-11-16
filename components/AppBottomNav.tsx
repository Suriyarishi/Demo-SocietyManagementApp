import React from 'react';
import { Search, PieChart, Clock, User } from 'lucide-react';

export type RootTabType = 'home' | 'search' | 'society' | 'activity' | 'profile' | 'bills' | 'services';

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
  // Normalize legacy tabs to our 5 primary icons
  const normalizedActiveTab = ((): 'home' | 'search' | 'society' | 'activity' | 'profile' => {
    if (activeTab === 'bills') return 'activity';
    if (activeTab === 'services') return 'society';
    if (activeTab === 'search') return 'search';
    if (activeTab === 'activity') return 'activity';
    if (activeTab === 'profile') return 'profile';
    if (activeTab === 'society') return 'society';
    return 'home';
  })();

  const tabs = [
    { id: 'home' as const, label: 'Home' },
    { id: 'search' as const, label: 'Search' },
    { id: 'society' as const, label: 'Society' },
    { id: 'activity' as const, label: 'Activity' },
    { id: 'profile' as const, label: 'Profile' },
  ];

  return (
    <nav className="w-full bg-[#12131A] text-white rounded-t-[32px] pt-3 pb-2.5 px-3.5 shadow-[0_-10px_35px_rgba(0,0,0,0.5)] border-t border-white/5 z-40 shrink-0 select-none flex flex-col items-center">
      {/* 5-Tab Bar Container */}
      <div className="w-full flex items-center justify-between px-0.5">
        {tabs.map((tab) => {
          const isActive = normalizedActiveTab === tab.id;

          return (
            <button
              key={tab.id}
              type="button"
              onClick={() => onTabChange(tab.id)}
              className={`relative flex items-center justify-center transition-all duration-300 ease-out press-scale ${
                isActive
                  ? 'h-11 px-4 rounded-full bg-[#29273D] border border-purple-500/25 shadow-lg shadow-purple-950/40 gap-2 shrink-0'
                  : 'w-11 h-11 rounded-full text-[#7E8299] hover:text-white hover:bg-white/5 transition-colors shrink-0'
              }`}
            >
              {tab.id === 'home' && (
                <HomeGlyph active={isActive} className={isActive ? 'text-[#A78BFA]' : 'text-current'} />
              )}
              {tab.id === 'search' && (
                <Search size={20} strokeWidth={isActive ? 2.4 : 1.9} className={isActive ? 'text-[#A78BFA]' : 'text-current'} />
              )}
              {tab.id === 'society' && (
                <PieChart size={20} strokeWidth={isActive ? 2.4 : 1.9} className={isActive ? 'text-[#A78BFA]' : 'text-current'} />
              )}
              {tab.id === 'activity' && (
                <Clock size={20} strokeWidth={isActive ? 2.4 : 1.9} className={isActive ? 'text-[#A78BFA]' : 'text-current'} />
              )}
              {tab.id === 'profile' && (
                <User size={20} strokeWidth={isActive ? 2.4 : 1.9} className={isActive ? 'text-[#A78BFA]' : 'text-current'} />
              )}

              {/* Expanding Label for Active Tab */}
              {isActive && (
                <span className="text-xs font-bold text-[#A78BFA] tracking-wide animate-in fade-in zoom-in-95 duration-200">
                  {tab.label}
                </span>
              )}
            </button>
          );
        })}
      </div>

      {/* Sleek iOS Home Indicator Bar */}
      <div className="w-32 h-1 bg-white/20 rounded-full mt-3 mb-0.5" />
    </nav>
  );
};
