import React, { useState } from 'react';
import {
  ArrowLeft,
  Wrench,
  Zap,
  Droplet,
  Home,
  ShieldCheck,
  Clock,
  Star,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  Search
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';

export interface ExpressServiceItem {
  id: string;
  title: string;
  category: 'plumbing' | 'electrical' | 'carpentry' | 'appliance' | 'cleaning';
  price: number;
  etaMinutes: number;
  rating: number;
  jobsCompleted: number;
  description: string;
}

export const EXPRESS_CATALOG: ExpressServiceItem[] = [
  {
    id: 'srv_01',
    title: 'Tap Leakage & Flush Valve Repair',
    category: 'plumbing',
    price: 149,
    etaMinutes: 15,
    rating: 4.9,
    jobsCompleted: 342,
    description: 'Fix dripping faucets, washers, internal flush leaks, and mixer valves.',
  },
  {
    id: 'srv_02',
    title: 'Switchboard / Ceiling Fan Repair',
    category: 'electrical',
    price: 199,
    etaMinutes: 15,
    rating: 4.8,
    jobsCompleted: 420,
    description: 'Capacitor replacement, socket sparking fix, fan regulator, and MCB tripping.',
  },
  {
    id: 'srv_03',
    title: 'Door Lock & Handle Replacement',
    category: 'carpentry',
    price: 299,
    etaMinutes: 20,
    rating: 4.9,
    jobsCompleted: 184,
    description: 'Mortise lock fitting, balcony sliding door alignment, and hinge greasing.',
  },
  {
    id: 'srv_04',
    title: 'Kitchen Sink Drain De-clogging',
    category: 'plumbing',
    price: 249,
    etaMinutes: 15,
    rating: 4.7,
    jobsCompleted: 295,
    description: 'Manual snake cleaning of waste pipe, grease trap cleaning, and odor removal.',
  },
  {
    id: 'srv_05',
    title: 'RO Water Purifier Filter Check',
    category: 'appliance',
    price: 349,
    etaMinutes: 30,
    rating: 4.8,
    jobsCompleted: 210,
    description: 'TDS level calibration, sediment filter change, booster pump inspection.',
  },
  {
    id: 'srv_06',
    title: 'Balcony Mesh & Pigeon Netting Fix',
    category: 'cleaning',
    price: 499,
    etaMinutes: 45,
    rating: 4.9,
    jobsCompleted: 98,
    description: 'Nylon net tightening, hook re-securing, and bird repellent installation.',
  },
];

interface ExpressServicesScreenProps {
  onBack: () => void;
  onSelectService: (service: ExpressServiceItem) => void;
}

export const ExpressServicesScreen: React.FC<ExpressServicesScreenProps> = ({
  onBack,
  onSelectService,
}) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');

  const filteredServices = EXPRESS_CATALOG.filter((s) => {
    const matchesCat = activeCategory === 'all' || s.category === activeCategory;
    const matchesQuery =
      s.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      s.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesQuery;
  });

  return (
    <div className="w-full min-h-full flex flex-col justify-between pb-24 text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="px-4 py-2.5 glass-dock sticky top-0 z-30 flex items-center justify-between">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            <button
              type="button"
              onClick={onBack}
              className="w-8 h-8 rounded-xl glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale shrink-0"
            >
              <ArrowLeft size={16} strokeWidth={2.4} />
            </button>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest truncate">
                  ON-DEMAND RESIDENCE CARE
                </span>
              </div>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                Express Home Services
              </h2>
            </div>
          </div>

          <Badge variant="emerald" icon={ShieldCheck} size="sm">
            Fixed Rates
          </Badge>
        </div>

        {/* 15-Minute Guarantee Banner */}
        <div className="px-4">
          <div className="p-4 rounded-3xl glass-card-elevated flex flex-col gap-2 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-500 uppercase tracking-widest flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Society Verified Cooperative</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-600 dark:text-emerald-400">
                ~15 Mins Response
              </span>
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-snug">
              Pre-approved society rates with zero bargaining & 30-day rework warranty.
            </h3>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Technicians are on-campus employees of the association maintenance team, vetted with police verification.
            </p>
          </div>
        </div>

        {/* Search Input */}
        <div className="px-4">
          <div className="relative flex items-center h-[54px] rounded-2xl border border-slate-300/80 dark:border-obsidian-750 bg-slate-50/90 dark:bg-obsidian-900/90 hover:bg-slate-100/70 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15 shadow-2xs transition-all group">
            <div className="w-9 h-9 rounded-xl bg-white dark:bg-obsidian-800 text-slate-500 dark:text-slate-400 border border-slate-200/90 dark:border-obsidian-700 shadow-2xs flex items-center justify-center shrink-0 ml-2 mr-2.5 group-focus-within:text-cobalt-600 dark:group-focus-within:text-cobalt-400 pointer-events-none transition-colors">
              <Search size={16} />
            </div>
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search repair e.g. tap, fan, lock..."
              className="w-full h-full pr-10 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 text-sm font-semibold outline-none"
            />
          </div>
        </div>

        {/* Category Filter Chips */}
        <div className="px-4">
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {[
              { id: 'all', label: 'All Services' },
              { id: 'plumbing', label: 'Plumbing' },
              { id: 'electrical', label: 'Electrical' },
              { id: 'carpentry', label: 'Carpentry' },
              { id: 'appliance', label: 'Appliances' },
              { id: 'cleaning', label: 'Cleaning' },
            ].map((c) => (
              <button
                key={c.id}
                type="button"
                onClick={() => setActiveCategory(c.id)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all press-scale ${
                  activeCategory === c.id
                    ? 'bg-cobalt-600 text-white shadow-sm ring-1 ring-cobalt-500/30'
                    : 'glass-pill text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>

        {/* Service Cards Catalog */}
        <div className="px-4 flex flex-col gap-3">
          {filteredServices.map((service) => (
            <div
              key={service.id}
              onClick={() => onSelectService(service)}
              className="p-4 rounded-3xl glass-card hover:border-cobalt-500/60 transition-all cursor-pointer flex flex-col gap-2.5 press-scale shadow-sm"
            >
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {service.title}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1 leading-relaxed">
                    {service.description}
                  </p>
                </div>
                <div className="text-right shrink-0">
                  <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white block">
                    ₹{service.price}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">fixed rate</span>
                </div>
              </div>

              <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                <div className="flex items-center gap-3 text-[11px] text-slate-500">
                  <span className="flex items-center gap-1 text-emerald-600 dark:text-emerald-400 font-semibold">
                    <Clock size={12} />
                    <span>~{service.etaMinutes}m Arrival</span>
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1 text-amber-500 font-bold">
                    <Star size={11} className="fill-current" />
                    <span>{service.rating} ({service.jobsCompleted})</span>
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    onSelectService(service);
                  }}
                  className="px-3 py-1 rounded-xl bg-cobalt-600 hover:bg-cobalt-700 active:bg-cobalt-800 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-transform press-scale"
                >
                  <span>Book</span>
                  <ChevronRight size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};