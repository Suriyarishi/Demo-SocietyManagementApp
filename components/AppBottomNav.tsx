import React from 'react';
import { Shield, Building2, CreditCard, Wrench } from 'lucide-react';

export type RootTabType = 'home' | 'society' | 'bills' | 'services';

interface AppBottomNavProps {
  activeTab: RootTabType;
  onTabChange: (tab: RootTabType) => void;
}

export const AppBottomNav: React.FC<AppBottomNavProps> = ({ activeTab, onTabChange }) => {
  const tabs = [
    { id: 'home', label: 'Home', icon: Shield },
    { id: 'society', label: 'Society', icon: Building2 },
    { id: 'bills', label: 'My Bills', icon: CreditCard },
    { id: 'services', label: 'Services', icon: Wrench, badge: '15m ⚡' },
  ] as const;

  return (
    <nav className="w-full h-[54px] bg-white/95 dark:bg-[#070A11]/95 backdrop-blur-xl border-t border-slate-200/90 dark:border-white/10 px-2 flex items-center justify-around z-40 shadow-[0_-4px_16px_rgba(0,0,0,0.05)] shrink-0 select-none">
      {tabs.map((tab) => {
        const Icon = tab.icon;
        const isActive = activeTab === tab.id;
        return (
          <button
            key={tab.id}
            type="button"
            onClick={() => onTabChange(tab.id)}
            className={`flex-1 flex flex-col items-center justify-center gap-0.5 py-1 px-1 rounded-2xl transition-all press-scale ${
              isActive
                ? 'bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-950/80 dark:text-cobalt-400 font-extrabold shadow-sm'
                : 'text-slate-400 hover:text-slate-700 dark:hover:text-slate-200 font-medium'
            }`}
          >
            <div className="relative flex items-center justify-center">
              <Icon size={18} strokeWidth={isActive ? 2.5 : 2.0} />
              {'badge' in tab && tab.badge && (
                <span className="absolute -top-1 -right-3 px-1 py-0.2 bg-emerald-500 text-white text-[7px] font-extrabold rounded-full leading-tight">
                  ⚡
                </span>
              )}
            </div>
            <span className="text-[10.5px] tracking-tight leading-none mt-0.5">{tab.label}</span>
          </button>
        );
      })}
    </nav>
  );
};
