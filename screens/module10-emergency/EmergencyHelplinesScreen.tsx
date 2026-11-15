import React, { useState } from 'react';
import {
  ArrowLeft,
  Ambulance,
  Phone,
  PhoneCall,
  ShieldAlert,
  Flame,
  Building,
  CheckCircle2,
  MapPin,
  Clock,
  HeartPulse,
  Share2,
  Navigation
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';

export interface HelplineItem {
  id: string;
  name: string;
  category: 'Hospital & ICU' | 'Police & Fire' | 'Disaster & Wildlife';
  phone: string;
  distance: string;
  address: string;
  timing: string;
  is24x7: boolean;
  priority: 'high' | 'normal';
}

const HELPLINES: HelplineItem[] = [
  {
    id: 'hl_01',
    name: 'Manipal Hospital Whitefield (Trauma & ICU)',
    category: 'Hospital & ICU',
    phone: '080-6925-5555',
    distance: '2.4 km (7 mins)',
    address: 'ITPL Main Rd, KIADB Export Promotion Park, Whitefield',
    timing: '24/7 Emergency Casualty & Cardiac Ambulance',
    is24x7: true,
    priority: 'high',
  },
  {
    id: 'hl_02',
    name: 'Columbia Asia Hospital (Whitefield)',
    category: 'Hospital & ICU',
    phone: '080-6165-6262',
    distance: '3.8 km (11 mins)',
    address: 'Survey No. 10P & 12P, Ramagondanahalli, Varthur Kodi',
    timing: '24/7 ICU, Pediatric & Emergency Surgery',
    is24x7: true,
    priority: 'high',
  },
  {
    id: 'hl_03',
    name: 'National Emergency Helpline (Police / SOS)',
    category: 'Police & Fire',
    phone: '112',
    distance: 'Toll-Free All India',
    address: 'Centralized Police PCR Van Dispatch',
    timing: '24/7 Central Response',
    is24x7: true,
    priority: 'high',
  },
  {
    id: 'hl_04',
    name: 'Karnataka Fire & Emergency Services',
    category: 'Police & Fire',
    phone: '101',
    distance: 'Varthur Fire Station • 4.1 km',
    address: 'Varthur Main Road, Bengaluru',
    timing: '24/7 Fire Tender & Hydrant Rescue',
    is24x7: true,
    priority: 'high',
  },
  {
    id: 'hl_05',
    name: 'BBMP Snake & Wildlife Rescue Volunteer Squad',
    category: 'Disaster & Wildlife',
    phone: '98450-48210',
    distance: 'East Zone Dispatcher',
    address: 'Certified wildlife rescue team for snakes and reptiles',
    timing: '6:00 AM – 11:00 PM',
    is24x7: false,
    priority: 'normal',
  },
  {
    id: 'hl_06',
    name: 'BESCOM Electrical Breakdown & Grid Helpline',
    category: 'Disaster & Wildlife',
    phone: '1912',
    distance: 'Varthur Substation',
    address: 'Power cut, high-voltage wire snap or transformer issue',
    timing: '24/7 Electricity Grievance',
    is24x7: true,
    priority: 'normal',
  },
];

interface EmergencyHelplinesScreenProps {
  onBack: () => void;
}

export const EmergencyHelplinesScreen: React.FC<EmergencyHelplinesScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const filteredHelplines = HELPLINES.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.phone.includes(searchQuery);
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-20 text-left animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-obsidian-800">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
              title="Back"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-crimson-600 dark:text-crimson-400 uppercase tracking-widest block">
                EXTERNAL AUTHORITIES
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Emergency Helplines & Hospitals
              </h2>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-crimson-50 dark:bg-crimson-950/60 text-crimson-600 flex items-center justify-center">
            <Ambulance size={16} />
          </div>
        </div>

        {/* Search Bar */}
        <Input
          placeholder="Search Hospital, Police, Fire, Ambulance..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Categories Bar */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {['All', 'Hospital & ICU', 'Police & Fire', 'Disaster & Wildlife'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all press-scale ${
                selectedCategory === cat
                  ? 'bg-crimson-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Helpline Cards Feed */}
        <div className="flex flex-col gap-3">
          {filteredHelplines.map((item) => (
            <div
              key={item.id}
              className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <Badge variant={item.priority === 'high' ? 'crimson' : 'muted'} size="sm">
                      {item.is24x7 ? '24/7 Emergency' : 'Day Service'}
                    </Badge>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 font-mono">
                      {item.distance}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-xs text-slate-900 dark:text-white leading-snug">
                    {item.name}
                  </h3>
                </div>

                <button
                  type="button"
                  onClick={() => showToast(`Calling ${item.phone}...`)}
                  className="w-10 h-10 rounded-2xl bg-crimson-600 hover:bg-crimson-700 text-white flex items-center justify-center shadow-sm transition-colors press-scale shrink-0"
                  title={`Dial ${item.phone}`}
                >
                  <PhoneCall size={18} />
                </button>
              </div>

              <p className="text-[11px] text-slate-500 font-medium leading-relaxed">
                {item.timing} • {item.address}
              </p>

              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-obsidian-800 text-[11px]">
                <span className="font-mono font-bold text-crimson-600 dark:text-crimson-400 text-xs">
                  {item.phone}
                </span>

                <button
                  type="button"
                  onClick={() => showToast(`Navigating to ${item.name}`)}
                  className="text-cobalt-600 dark:text-cobalt-400 font-bold flex items-center gap-1 hover:underline"
                >
                  <Navigation size={12} />
                  <span>Get Directions</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
