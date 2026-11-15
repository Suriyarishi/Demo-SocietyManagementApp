import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  User,
  Package,
  Bell,
  PhoneCall,
  Wrench,
  ChevronRight,
  Clock,
  X
} from 'lucide-react';
import { Badge } from '../../components/UIComponents';

interface SearchResultItem {
  id: string;
  category: 'visitor' | 'staff' | 'notice' | 'contact' | 'ticket';
  title: string;
  subtitle: string;
  badgeText: string;
  badgeVariant: 'emerald' | 'cobalt' | 'amber' | 'crimson' | 'neutral';
  actionLabel?: string;
  actionPayload?: string;
}

const SEARCH_DATABASE: SearchResultItem[] = [
  {
    id: 'res_01',
    category: 'visitor',
    title: 'Swiggy Food Delivery',
    subtitle: 'Expected at Gate 1 • Pre-approved',
    badgeText: 'Gate Pass',
    badgeVariant: 'emerald',
    actionLabel: 'View PIN',
  },
  {
    id: 'res_02',
    category: 'staff',
    title: 'Lakshmi R (Cook)',
    subtitle: 'Inside Campus since 7:45 AM • Gate 2',
    badgeText: 'Daily Help',
    badgeVariant: 'cobalt',
    actionLabel: 'Call',
  },
  {
    id: 'res_03',
    category: 'notice',
    title: 'Scheduled Water Tank Cleaning',
    subtitle: 'Tower 1 & 2 • Tomorrow 9:00 AM – 1:00 PM',
    badgeText: 'Notice',
    badgeVariant: 'amber',
    actionLabel: 'Read',
  },
  {
    id: 'res_04',
    category: 'contact',
    title: 'Main Gate Security Kiosk',
    subtitle: '24x7 Emergency Guard Station • Gate 1',
    badgeText: 'Helpline',
    badgeVariant: 'crimson',
    actionLabel: 'Dial',
  },
  {
    id: 'res_05',
    category: 'ticket',
    title: 'Master Bathroom Geyser MCB Trip',
    subtitle: 'Ticket #HNT-409 • Technician Assigned (Rajesh)',
    badgeText: 'Helpdesk',
    badgeVariant: 'neutral',
    actionLabel: 'Track',
  },
  {
    id: 'res_06',
    category: 'staff',
    title: 'Ramesh K (Personal Driver)',
    subtitle: 'RFID Registered • Vehicle KA-04-MB-8291',
    badgeText: 'Daily Help',
    badgeVariant: 'cobalt',
    actionLabel: 'Profile',
  },
];

interface GlobalSearchScreenProps {
  onBack: () => void;
  onSelectResult: (item: SearchResultItem) => void;
}

export const GlobalSearchScreen: React.FC<GlobalSearchScreenProps> = ({
  onBack,
  onSelectResult,
}) => {
  const [query, setQuery] = useState<string>('');
  const [selectedFilter, setSelectedFilter] = useState<string>('All');

  const filters = ['All', 'Visitors', 'Staff', 'Notices', 'Emergency', 'Tickets'];

  const filteredResults = SEARCH_DATABASE.filter((item) => {
    const matchesFilter =
      selectedFilter === 'All' ||
      (selectedFilter === 'Visitors' && item.category === 'visitor') ||
      (selectedFilter === 'Staff' && item.category === 'staff') ||
      (selectedFilter === 'Notices' && item.category === 'notice') ||
      (selectedFilter === 'Emergency' && item.category === 'contact') ||
      (selectedFilter === 'Tickets' && item.category === 'ticket');

    const matchesQuery =
      item.title.toLowerCase().includes(query.toLowerCase()) ||
      item.subtitle.toLowerCase().includes(query.toLowerCase());

    return matchesFilter && matchesQuery;
  });

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-200">
      <div className="flex flex-col gap-4">
        {/* Header & Search Bar */}
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 shrink-0"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>

          <div className="relative flex-1 flex items-center h-[50px] rounded-2xl border border-slate-200/90 dark:border-obsidian-750 bg-slate-50/80 dark:bg-obsidian-900/90 hover:bg-slate-100/60 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15 shadow-sm transition-all group">
            <div className="w-10 h-full flex items-center justify-center text-slate-400 dark:text-slate-500 group-focus-within:text-cobalt-600 shrink-0 pointer-events-none">
              <Search size={18} />
            </div>
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search visitors, staff, notices, contacts..."
              className="w-full h-full pr-8 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm font-semibold outline-none"
              autoFocus
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                className="mr-3 px-2 py-0.5 rounded-md text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200/60 dark:bg-obsidian-800"
              >
                Clear
              </button>
            )}
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {filters.map((f) => (
            <button
              key={f}
              type="button"
              onClick={() => setSelectedFilter(f)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedFilter === f
                  ? 'bg-cobalt-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-obsidian-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-obsidian-850'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* Results Stream */}
        <div className="flex flex-col gap-2 max-h-[520px] overflow-y-auto no-scrollbar pr-0.5 mt-1">
          {filteredResults.length > 0 ? (
            filteredResults.map((item) => (
              <div
                key={item.id}
                onClick={() => onSelectResult(item)}
                className="p-3.5 rounded-xl border border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 hover:border-cobalt-500/60 dark:hover:border-cobalt-500/60 transition-all cursor-pointer flex items-center justify-between gap-3 shadow-ambient"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-obsidian-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
                    {item.category === 'visitor' && <Package size={18} />}
                    {item.category === 'staff' && <User size={18} />}
                    {item.category === 'notice' && <Bell size={18} />}
                    {item.category === 'contact' && <PhoneCall size={18} />}
                    {item.category === 'ticket' && <Wrench size={18} />}
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {item.title}
                      </h4>
                      <Badge variant={item.badgeVariant} size="sm">
                        {item.badgeText}
                      </Badge>
                    </div>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
                </div>

                {item.actionLabel && (
                  <span className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 shrink-0 px-2 py-1 rounded-md bg-cobalt-50 dark:bg-cobalt-950/60">
                    {item.actionLabel}
                  </span>
                )}
              </div>
            ))
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 text-center flex flex-col items-center gap-2">
              <Search size={28} className="text-slate-400" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No results found</p>
              <p className="text-xs text-slate-500">Try searching for "Swiggy", "Guard", "Cook", or "Water".</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
