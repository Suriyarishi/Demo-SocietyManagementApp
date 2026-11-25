import React from 'react';
import { Select } from '../../../components/UIComponents';
import { SellItemDraft, RESIDENT_LOCATIONS } from './sellItemData';

interface DeliveryContactStepProps {
  draft: SellItemDraft;
  onChange: (patch: Partial<SellItemDraft>) => void;
}

export const DeliveryContactStep: React.FC<DeliveryContactStepProps> = ({
  draft,
  onChange,
}) => {
  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Delivery & Contact
        </h2>
      </div>

      {/* Card 1: Location, Delivery / Pickup, Show Flat Number */}
      <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-4">
        {/* Location */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sell-location-select"
            className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1"
          >
            <span>Location</span>
            <span className="text-crimson-500">*</span>
          </label>
          <Select
            id="sell-location-select"
            value={draft.location}
            onChange={(e) => onChange({ location: e.target.value })}
          >
            {RESIDENT_LOCATIONS.map((loc) => (
              <option key={loc} value={loc}>
                {loc}
              </option>
            ))}
          </Select>
        </div>

        {/* Delivery / Pickup */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Delivery / Pickup
          </span>
          <div className="flex items-center gap-2.5 flex-wrap">
            {(['Buyer picks up', 'I deliver nearby'] as const).map((mode) => {
              const active = draft.deliveryMode === mode;
              return (
                <button
                  key={mode}
                  type="button"
                  onClick={() => onChange({ deliveryMode: mode })}
                  className={`h-10 px-4 rounded-full text-xs font-bold border transition-all press-scale cursor-pointer ${
                    active
                      ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500 ring-1 ring-primary-500/20'
                      : 'bg-white dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750 hover:bg-slate-50 dark:hover:bg-obsidian-800'
                  }`}
                >
                  {mode}
                </button>
              );
            })}
          </div>
        </div>

        {/* Show flat number */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Show flat number
          </span>
          <div className="flex items-center gap-2.5">
            {([
              { label: 'Yes', value: true },
              { label: 'No', value: false },
            ] as const).map((opt) => {
              const active = draft.showFlatNumber === opt.value;
              return (
                <button
                  key={opt.label}
                  type="button"
                  onClick={() => onChange({ showFlatNumber: opt.value })}
                  className={`h-10 px-5 rounded-full text-xs font-bold border transition-all press-scale cursor-pointer ${
                    active
                      ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500 ring-1 ring-primary-500/20'
                      : 'bg-white dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750 hover:bg-slate-50 dark:hover:bg-obsidian-800'
                  }`}
                >
                  {opt.label}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Card 2: Contact Number Preferences */}
      <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3">
        <div>
          <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase block">
            Contact number
          </span>
          <p className="text-xs font-medium text-slate-500 dark:text-slate-400 mt-1">
            Buyers can always reach you on Hunt Lockdoor chat
          </p>
        </div>

        <div className="flex items-center gap-2.5 flex-wrap pt-0.5">
          {(['Call', 'Whatsapp', 'Both'] as const).map((channel) => {
            const active = draft.contactMethod === channel;
            return (
              <button
                key={channel}
                type="button"
                onClick={() => onChange({ contactMethod: channel })}
                className={`h-10 px-4 rounded-full text-xs font-bold border transition-all press-scale cursor-pointer ${
                  active
                    ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500 ring-1 ring-primary-500/20'
                    : 'bg-white dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750 hover:bg-slate-50 dark:hover:bg-obsidian-800'
                }`}
              >
                {channel}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};
