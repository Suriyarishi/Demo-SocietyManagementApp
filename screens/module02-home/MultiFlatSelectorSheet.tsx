import React from 'react';
import { Building2, Check, Plus, ShieldCheck, Home, X } from 'lucide-react';
import { Badge } from '../../components/UIComponents';

export interface FlatEntity {
  id: string;
  societyName: string;
  unit: string;
  locality: string;
  role: 'Owner' | 'Tenant' | 'Owner (Non-Residing)';
  status: 'verified' | 'provisional';
  unreadAlerts: number;
}

export const USER_FLATS: FlatEntity[] = [
  {
    id: 'flat_1204',
    societyName: 'Prestige Lakeside Habitat',
    unit: 'Tower 2 - Flat 1204',
    locality: 'Whitefield, Bengaluru',
    role: 'Tenant',
    status: 'verified',
    unreadAlerts: 1,
  },
  {
    id: 'flat_villa42',
    societyName: 'Sobha Lifestyle Legacy',
    unit: 'Villa 42 - Phase 1',
    locality: 'Devanahalli, Bengaluru',
    role: 'Owner (Non-Residing)',
    status: 'verified',
    unreadAlerts: 0,
  },
  {
    id: 'flat_302',
    societyName: 'Godrej Woods',
    unit: 'Tower A - Flat 302',
    locality: 'Sector 43, Noida',
    role: 'Owner',
    status: 'provisional',
    unreadAlerts: 2,
  },
];

interface MultiFlatSelectorSheetProps {
  activeFlatId: string;
  onSelectFlat: (flat: FlatEntity) => void;
  onClose: () => void;
  onAddNewFlat: () => void;
}

export const MultiFlatSelectorSheet: React.FC<MultiFlatSelectorSheetProps> = ({
  activeFlatId,
  onSelectFlat,
  onClose,
  onAddNewFlat,
}) => {
  return (
    <div className="absolute inset-0 z-50 bg-black/70 backdrop-blur-sm flex flex-col justify-end animate-in fade-in duration-200">
      <div className="w-full max-h-[85%] bg-white dark:bg-obsidian-900 rounded-t-3xl border-t border-slate-200 dark:border-obsidian-800 p-4 pb-6 flex flex-col gap-4 text-left shadow-2xl animate-in slide-in-from-bottom duration-300">
        {/* Drag Handle & Header */}
        <div className="flex flex-col items-center">
          <div className="w-12 h-1 bg-slate-300 dark:bg-obsidian-700 rounded-full mb-3" />
          <div className="w-full flex items-center justify-between">
            <div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Switch Residence
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Manage all your residential units in one place.
              </p>
            </div>
            <button
              onClick={onClose}
              className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-700 flex items-center justify-center text-slate-500 dark:text-slate-300"
            >
              <X size={16} />
            </button>
          </div>
        </div>

        {/* Flats List */}
        <div className="flex flex-col gap-2.5 overflow-y-auto no-scrollbar max-h-[360px] py-1">
          {USER_FLATS.map((f) => {
            const isActive = f.id === activeFlatId;
            return (
              <div
                key={f.id}
                onClick={() => {
                  onSelectFlat(f);
                  onClose();
                }}
                className={`
                  p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between gap-3
                  ${isActive
                    ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/40 dark:bg-cobalt-950/40 ring-1 ring-cobalt-500/40'
                    : 'border-slate-200 dark:border-obsidian-800 bg-slate-50/50 dark:bg-obsidian-850 hover:border-slate-300 dark:hover:border-obsidian-700'}
                `}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                    isActive
                      ? 'bg-cobalt-600 text-white'
                      : 'bg-slate-200 dark:bg-obsidian-700 text-slate-700 dark:text-slate-300'
                  }`}>
                    <Home size={20} strokeWidth={2.2} />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold text-slate-900 dark:text-white font-mono">
                        {f.unit}
                      </span>
                      {f.unreadAlerts > 0 && (
                        <span className="w-2 h-2 rounded-full bg-crimson-500 animate-pulse" />
                      )}
                    </div>
                    <p className="text-xs text-slate-600 dark:text-slate-300 font-medium">
                      {f.societyName}
                    </p>
                    <div className="flex items-center gap-2 mt-1.5">
                      <span className="text-[10px] font-semibold text-slate-500 dark:text-slate-400">
                        {f.role}
                      </span>
                      <span className="text-slate-300 dark:text-obsidian-700">•</span>
                      <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                        {f.status === 'verified' ? 'Verified Gate' : 'Provisional'}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="shrink-0 flex items-center gap-2">
                  {isActive ? (
                    <div className="w-6 h-6 rounded-full bg-cobalt-600 text-white flex items-center justify-center">
                      <Check size={14} strokeWidth={3} />
                    </div>
                  ) : (
                    <span className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200">
                      Switch
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Add Property Button */}
        <button
          onClick={() => {
            onClose();
            onAddNewFlat();
          }}
          className="w-full h-[52px] rounded-2xl border-2 border-dashed border-slate-300 dark:border-obsidian-700 hover:border-cobalt-500 dark:hover:border-cobalt-500 flex items-center justify-center gap-2 text-xs font-bold text-slate-700 dark:text-slate-200 transition-all bg-slate-50/60 hover:bg-cobalt-50/40 dark:bg-obsidian-850 press-scale shadow-sm"
        >
          <Plus size={16} className="text-cobalt-500" />
          <span>Add Another Residence / Flat</span>
        </button>
      </div>
    </div>
  );
};
