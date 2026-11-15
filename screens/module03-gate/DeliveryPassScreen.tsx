import React, { useState } from 'react';
import {
  ArrowLeft,
  Package,
  Clock,
  ShieldCheck,
  CheckCircle2,
  MapPin,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/UIComponents';

export interface DeliveryPassData {
  company: string;
  durationMinutes: number;
  dropInstruction: 'doorstep' | 'gate' | 'lobby';
  claimPin: string;
}

interface DeliveryPassScreenProps {
  onBack: () => void;
  onActivated: (pass: DeliveryPassData) => void;
}

export const DeliveryPassScreen: React.FC<DeliveryPassScreenProps> = ({
  onBack,
  onActivated,
}) => {
  const [selectedCompany, setSelectedCompany] = useState<string>('Blinkit');
  const [duration, setDuration] = useState<number>(30);
  const [dropInstruction, setDropInstruction] = useState<'doorstep' | 'gate' | 'lobby'>('doorstep');
  const [isActivating, setIsActivating] = useState<boolean>(false);

  const deliveryApps = [
    { name: 'Blinkit', color: 'bg-amber-400 text-black' },
    { name: 'Swiggy', color: 'bg-orange-500 text-white' },
    { name: 'Zomato', color: 'bg-red-500 text-white' },
    { name: 'Amazon', color: 'bg-slate-900 text-white' },
    { name: 'Zepto', color: 'bg-purple-600 text-white' },
    { name: 'Instamart', color: 'bg-orange-600 text-white' },
    { name: 'Flipkart', color: 'bg-blue-600 text-white' },
    { name: 'Other', color: 'bg-slate-700 text-white' },
  ];

  const handleActivate = () => {
    setIsActivating(true);
    setTimeout(() => {
      setIsActivating(false);
      onActivated({
        company: selectedCompany,
        durationMinutes: duration,
        dropInstruction,
        claimPin: Math.floor(1000 + Math.random() * 9000).toString(),
      });
    }, 600);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-200">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Express Clearance
          </span>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Cancel
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Delivery Pass
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Pre-clear delivery agents so they enter without intercom delays.
          </p>
        </div>

        {/* Courier App Picker Grid */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Select Delivery Service
          </label>
          <div className="grid grid-cols-4 gap-2">
            {deliveryApps.map((app) => {
              const isSelected = selectedCompany === app.name;
              return (
                <button
                  key={app.name}
                  type="button"
                  onClick={() => setSelectedCompany(app.name)}
                  className={`py-3 px-1 rounded-2xl flex flex-col items-center gap-1.5 transition-all text-xs font-bold border ${
                    isSelected
                      ? 'border-cobalt-600 bg-cobalt-50/50 dark:bg-cobalt-950/40 text-cobalt-600 dark:text-cobalt-400 ring-2 ring-cobalt-500/30'
                      : 'border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 text-slate-700 dark:text-slate-300 hover:bg-slate-50'
                  }`}
                >
                  <div className={`w-7 h-7 rounded-lg ${app.color} flex items-center justify-center text-[10px] font-black`}>
                    {app.name.slice(0, 1)}
                  </div>
                  <span className="truncate w-full text-center text-[11px]">{app.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Pass Duration */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Pass Validity Window
          </label>
          <div className="flex items-center gap-2">
            {[
              { mins: 30, label: '30 Mins (Instant)' },
              { mins: 60, label: '1 Hour' },
              { mins: 120, label: '2 Hours' },
            ].map((d) => (
              <button
                key={d.mins}
                type="button"
                onClick={() => setDuration(d.mins)}
                className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                  duration === d.mins
                    ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                    : 'bg-white dark:bg-obsidian-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-800'
                }`}
              >
                {d.label}
              </button>
            ))}
          </div>
        </div>

        {/* Drop Instructions */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Drop-off Instruction
          </label>
          <div className="flex flex-col gap-2">
            {[
              { id: 'doorstep', title: 'Deliver to Doorstep', subtitle: 'Tower 2 - Flat 1204 (Guard allows lift access)' },
              { id: 'gate', title: 'Leave at Main Gate Security', subtitle: 'Guard receives package; unique claim PIN generated' },
              { id: 'lobby', title: 'Leave at Tower Lobby Parcel Rack', subtitle: 'Convenient ground floor pickup box' },
            ].map((opt) => {
              const isSelected = dropInstruction === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setDropInstruction(opt.id as any)}
                  className={`
                    p-3.5 rounded-xl border transition-all cursor-pointer flex items-center justify-between
                    ${isSelected
                      ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/30 dark:bg-cobalt-950/40 ring-1 ring-cobalt-500/30'
                      : 'border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900'}
                  `}
                >
                  <div>
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      {opt.title}
                    </h4>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                      {opt.subtitle}
                    </p>
                  </div>
                  <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-cobalt-600 bg-cobalt-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={handleActivate}
          isLoading={isActivating}
          icon={CheckCircle2}
          iconPosition="right"
          size="lg"
        >
          Activate {selectedCompany} Pass
        </Button>
      </div>
    </div>
  );
};
