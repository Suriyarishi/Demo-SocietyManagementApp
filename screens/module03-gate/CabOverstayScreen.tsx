import React, { useState } from 'react';
import {
  ArrowLeft,
  Car,
  Clock,
  ShieldCheck,
  AlertTriangle,
  Phone,
  CheckCircle2,
  ChevronRight,
  ShieldAlert
} from 'lucide-react';
import { Button, Input } from '../../components/UIComponents';

interface CabOverstayScreenProps {
  onBack: () => void;
  onPassCreated: (cabData: any) => void;
}

export const CabOverstayScreen: React.FC<CabOverstayScreenProps> = ({
  onBack,
  onPassCreated,
}) => {
  const [provider, setProvider] = useState<string>('Uber');
  const [cabNumber, setCabNumber] = useState<string>('KA-01-AJ-4921');
  const [purpose, setPurpose] = useState<'pickup' | 'drop'>('pickup');
  const [isCreating, setIsCreating] = useState<boolean>(false);

  // Active Cab in campus simulation
  const [activeCab, setActiveCab] = useState({
    plate: 'KA-01-AJ-4921',
    driver: 'Manoj Kumar (Uber Premier)',
    entryTime: '09:12 AM',
    gate: 'Gate 1',
    minsLeft: 8,
  });

  const providers = ['Uber', 'Ola', 'BluSmart', 'Rapido'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsCreating(true);
    setTimeout(() => {
      setIsCreating(false);
      onPassCreated({ provider, cabNumber, purpose });
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
            Vehicle Governance
          </span>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Cancel
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Cab Pass & Overstay
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Automated boom barrier clearance with 15-minute campus overstay monitoring.
          </p>
        </div>

        {/* Active Cab Live Monitor Card */}
        {activeCab && (
          <div className="p-5 rounded-3xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 text-white border border-obsidian-800 shadow-elevated">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
                <Clock size={13} />
                <span>Active Cab on Campus</span>
              </span>
              <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                08:42 mins left
              </span>
            </div>

            <div className="mt-3.5 flex items-start justify-between">
              <div>
                <h4 className="text-sm font-bold text-white">
                  {activeCab.driver}
                </h4>
                <div className="mt-1.5 flex items-center gap-2">
                  <span className="bg-amber-400 text-black font-mono font-black px-2 py-0.5 rounded border border-amber-600/30 text-[11px] tracking-wider">
                    {activeCab.plate}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">Boom Barrier Passed</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1.5">
                  Entered {activeCab.entryTime} at {activeCab.gate} • Tower 2 Drop
                </p>
              </div>

              <button
                type="button"
                onClick={() => alert('Calling driver Manoj Kumar...')}
                className="w-11 h-11 rounded-2xl bg-cobalt-600 text-white flex items-center justify-center hover:bg-cobalt-500 transition-colors shadow-md shadow-cobalt-600/30 press-scale"
                title="Call Cab Driver"
              >
                <Phone size={18} />
              </button>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 flex items-center gap-2">
              <button
                type="button"
                onClick={() => alert('Added +10 minutes grace period for cab departure')}
                className="flex-1 py-2.5 rounded-2xl bg-white/10 hover:bg-white/20 text-xs font-bold text-slate-200 border border-white/15 transition-colors press-scale"
              >
                Extend +10m
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('Cab marked as departed from campus');
                  setActiveCab(null as any);
                }}
                className="flex-1 py-2.5 rounded-2xl bg-emerald-600/30 hover:bg-emerald-600/40 text-emerald-300 text-xs font-bold border border-emerald-500/40 transition-colors press-scale"
              >
                Mark Departed
              </button>
            </div>
          </div>
        )}

        {/* Pre-Approve New Incoming Cab Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
              Cab Service Provider
            </label>
            <div className="grid grid-cols-4 gap-2">
              {providers.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setProvider(p)}
                  className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                    provider === p
                      ? 'bg-cobalt-600 text-white shadow-sm'
                      : 'bg-white dark:bg-obsidian-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-800'
                  }`}
                >
                  {p}
                </button>
              ))}
            </div>
          </div>

          <Input
            label="Cab Vehicle Plate Number (Last 4 digits or Full)"
            placeholder="e.g. KA-01-AJ-4921"
            value={cabNumber}
            onChange={(e) => setCabNumber(e.target.value.toUpperCase())}
            prefixElement={<Car size={18} />}
            required
          />

          <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
            <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
            <span>
              Cabs are granted 15 minutes by society security to pick up or drop passengers at Tower 2 lobby.
            </span>
          </div>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          isLoading={isCreating}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Issue Cab Entry Pass
        </Button>
      </div>
    </div>
  );
};
