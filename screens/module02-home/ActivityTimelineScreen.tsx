import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Filter,
  Package,
  User,
  CreditCard,
  Wrench,
  ShieldCheck,
  CheckCircle2,
  Clock,
  Car
} from 'lucide-react';
import { Badge } from '../../components/UIComponents';

export interface ActivityEvent {
  id: string;
  category: 'gate' | 'delivery' | 'staff' | 'payment' | 'ticket';
  title: string;
  detail: string;
  timestamp: string;
  dateGroup: 'Today' | 'Yesterday' | 'Earlier this week';
  gateOrLocation: string;
  verifiedBy: string;
  statusVariant: 'emerald' | 'cobalt' | 'neutral' | 'amber';
}

const SAMPLE_ACTIVITIES: ActivityEvent[] = [
  {
    id: 'act_01',
    category: 'delivery',
    title: 'Swiggy Food Courier Cleared',
    detail: 'Delivery Agent: Sandeep M • 1 Package',
    timestamp: '09:15 AM',
    dateGroup: 'Today',
    gateOrLocation: 'Gate 1 (Main Gate)',
    verifiedBy: 'App Pre-Approved (PIN: 8941)',
    statusVariant: 'emerald',
  },
  {
    id: 'act_02',
    category: 'staff',
    title: 'Ramesh K (Personal Driver) Entered',
    detail: 'Vehicle KA-04-MB-8291 • Campus Arrival',
    timestamp: '08:15 AM',
    dateGroup: 'Today',
    gateOrLocation: 'Gate 2 (Basement Boom Barrier)',
    verifiedBy: 'RFID Fastag Auto-Sync',
    statusVariant: 'cobalt',
  },
  {
    id: 'act_03',
    category: 'staff',
    title: 'Lakshmi R (Cook) Checked In',
    detail: 'Daily Household Staff Attendance Recorded',
    timestamp: '07:45 AM',
    dateGroup: 'Today',
    gateOrLocation: 'Gate 2 Pedestrian Turnstile',
    verifiedBy: 'Facial Scan at Guard Kiosk',
    statusVariant: 'cobalt',
  },
  {
    id: 'act_04',
    category: 'payment',
    title: 'Monthly Maintenance Paid',
    detail: '₹4,250 • UPI Reference #HNT-9402910',
    timestamp: '04:30 PM',
    dateGroup: 'Yesterday',
    gateOrLocation: 'Society Accounts Desk',
    verifiedBy: 'Instant Digital Receipt',
    statusVariant: 'neutral',
  },
  {
    id: 'act_05',
    category: 'ticket',
    title: 'Geyser MCB Replacement Completed',
    detail: 'Assigned Electrician: Rajesh Kumar',
    timestamp: '11:20 AM',
    dateGroup: 'Earlier this week',
    gateOrLocation: 'Tower 2 - Flat 1204',
    verifiedBy: 'Resident Digital Signoff',
    statusVariant: 'emerald',
  },
];

interface ActivityTimelineScreenProps {
  onBack: () => void;
}

export const ActivityTimelineScreen: React.FC<ActivityTimelineScreenProps> = ({ onBack }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');

  const categories = ['All', 'Deliveries', 'Staff', 'Gate', 'Payments'];

  const filteredEvents = SAMPLE_ACTIVITIES.filter((e) => {
    if (activeCategory === 'All') return true;
    if (activeCategory === 'Deliveries') return e.category === 'delivery';
    if (activeCategory === 'Staff') return e.category === 'staff';
    if (activeCategory === 'Gate') return e.category === 'gate' || e.category === 'delivery';
    if (activeCategory === 'Payments') return e.category === 'payment';
    return true;
  });

  const dateGroups = Array.from(new Set(filteredEvents.map((e) => e.dateGroup)));

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-28 text-left animate-in fade-in duration-200">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                Activity History
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Audited perimeter & household events.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-obsidian-900 text-xs font-semibold text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-obsidian-800">
            <Calendar size={13} />
            <span>Past 7 Days</span>
          </div>
        </div>

        {/* Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {categories.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                activeCategory === cat
                  ? 'bg-cobalt-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-obsidian-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-obsidian-850'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Chronological Timeline */}
        <div className="flex flex-col gap-5 max-h-[520px] overflow-y-auto no-scrollbar pr-0.5">
          {dateGroups.map((group) => {
            const eventsInGroup = filteredEvents.filter((e) => e.dateGroup === group);
            return (
              <div key={group} className="flex flex-col gap-2.5">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                    {group}
                  </span>
                  <div className="flex-1 h-px bg-slate-200 dark:bg-obsidian-800" />
                </div>

                <div className="flex flex-col gap-2.5">
                  {eventsInGroup.map((event) => (
                    <div
                      key={event.id}
                      className="p-4 rounded-2xl border border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 shadow-ambient flex items-start gap-3.5 text-left"
                    >
                      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 mt-0.5 ${
                        event.category === 'delivery'
                          ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                          : event.category === 'staff'
                          ? 'bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-950/60 dark:text-cobalt-400'
                          : 'bg-slate-100 text-slate-700 dark:bg-obsidian-800 dark:text-slate-300'
                      }`}>
                        {event.category === 'delivery' && <Package size={18} />}
                        {event.category === 'staff' && <User size={18} />}
                        {event.category === 'payment' && <CreditCard size={18} />}
                        {event.category === 'ticket' && <Wrench size={18} />}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate">
                            {event.title}
                          </h4>
                          <span className="text-[11px] font-mono font-semibold text-slate-500 shrink-0">
                            {event.timestamp}
                          </span>
                        </div>
                        <p className="text-xs text-slate-600 dark:text-slate-400 mt-0.5">
                          {event.detail}
                        </p>
                        <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-obsidian-800 text-[11px] text-slate-500 dark:text-slate-400">
                          <span className="truncate">{event.gateOrLocation}</span>
                          <span className="font-semibold text-cobalt-600 dark:text-cobalt-400 shrink-0 ml-2">
                            {event.verifiedBy}
                          </span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
