import React, { useState } from 'react';
import {
  ArrowLeft,
  Zap,
  TrendingDown,
  Clock,
  ShieldCheck,
  AlertTriangle,
  RotateCcw,
  CheckCircle2,
  ChevronRight,
  Droplet
} from 'lucide-react';
import { Button } from '../../components/UIComponents';

interface SmartMeterScreenProps {
  onBack: () => void;
  onRecharge: (amount: number) => void;
}

export const SmartMeterScreen: React.FC<SmartMeterScreenProps> = ({
  onBack,
  onRecharge,
}) => {
  const [balance, setBalance] = useState<number>(840.5);
  const [selectedTopUp, setSelectedTopUp] = useState<number>(1000);
  const [autoRecharge, setAutoRecharge] = useState<boolean>(true);
  const [alertThreshold, setAlertThreshold] = useState<number>(200);
  const [activeDayIdx, setActiveDayIdx] = useState<number>(6); // Sun default

  const past7Days = [
    { day: 'Mon', kwh: 16.2, cost: 132.8, height: '60%' },
    { day: 'Tue', kwh: 18.4, cost: 150.8, height: '70%' },
    { day: 'Wed', kwh: 19.1, cost: 156.6, height: '75%' },
    { day: 'Thu', kwh: 15.8, cost: 129.5, height: '58%' },
    { day: 'Fri', kwh: 21.0, cost: 172.2, height: '85%' },
    { day: 'Sat', kwh: 24.2, cost: 198.4, height: '98%' },
    { day: 'Sun', kwh: 22.1, cost: 181.2, height: '90%' },
  ];

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
          <div className="flex items-center gap-1.5 text-xs font-mono font-bold text-slate-500">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>METER #MTR-1204</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Real-Time Balance Gauge Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 text-white border border-obsidian-800 shadow-elevated">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Zap size={14} />
              <span>Smart Prepaid EB Meter</span>
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              Online • Live
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-4xl font-extrabold font-mono text-white">
              ₹{balance.toFixed(2)}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">credit balance</span>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-3 text-xs text-slate-300">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Estimated Runtime</span>
              <span className="text-sm font-bold text-emerald-400 font-mono">~4.2 Days</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Current Active Load</span>
              <span className="text-sm font-bold text-white font-mono">1.8 kW</span>
            </div>
          </div>
        </div>

        {/* 7-Day Consumption Bar Chart */}
        <div className="p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Daily Electricity Consumption (kWh)
              </h4>
              <p className="text-[11px] text-slate-500">
                Selected: <strong className="text-slate-800 dark:text-slate-200">{past7Days[activeDayIdx].day}</strong> • {past7Days[activeDayIdx].kwh} kWh (~₹{past7Days[activeDayIdx].cost.toFixed(0)})
              </p>
            </div>
            <span className="text-xs font-bold font-mono text-cobalt-600 dark:text-cobalt-400">
              ₹8.20/kWh
            </span>
          </div>

          {/* Interactive Bar Chart Container */}
          <div className="h-28 pt-4 flex items-end justify-between gap-2 border-b border-slate-100 dark:border-obsidian-800 pb-2">
            {past7Days.map((item, idx) => {
              const isSelected = activeDayIdx === idx;
              return (
                <div
                  key={item.day}
                  onClick={() => setActiveDayIdx(idx)}
                  className="flex-1 flex flex-col items-center gap-1.5 h-full justify-end cursor-pointer group"
                >
                  <div
                    className={`w-full max-w-[28px] rounded-t-lg transition-all ${
                      isSelected
                        ? 'bg-cobalt-600 dark:bg-cobalt-400 shadow-md ring-2 ring-cobalt-500/30'
                        : 'bg-slate-200 dark:bg-obsidian-800 group-hover:bg-cobalt-300'
                    }`}
                    style={{ height: item.height }}
                  />
                  <span className={`text-[10px] font-bold ${isSelected ? 'text-cobalt-600 dark:text-cobalt-400' : 'text-slate-500'}`}>
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Instant Recharge Selector */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Quick Recharge Amount
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[500, 1000, 2500].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setSelectedTopUp(amt)}
                className={`py-3 rounded-2xl text-xs font-mono font-bold transition-all border ${
                  selectedTopUp === amt
                    ? 'border-cobalt-600 bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 ring-2 ring-cobalt-500/30'
                    : 'border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 text-slate-700 dark:text-slate-200'
                }`}
              >
                +₹{amt.toLocaleString()}
              </button>
            ))}
          </div>

          {/* Auto Recharge Toggle & Threshold Slider */}
          <div className="mt-1 p-3.5 rounded-2xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">
                  Auto-Top Up Protection
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Prevents power cut if balance drops below threshold
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoRecharge}
                onChange={(e) => setAutoRecharge(e.target.checked)}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 border-slate-300 cursor-pointer"
              />
            </div>

            {autoRecharge && (
              <div className="pt-2 border-t border-slate-200/60 dark:border-obsidian-800 flex flex-col gap-1.5">
                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-500 dark:text-slate-400 font-medium">Low-Balance Cutoff Alert</span>
                  <span className="font-mono font-bold text-cobalt-600 dark:text-cobalt-400">
                    ₹{alertThreshold}
                  </span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="1000"
                  step="50"
                  value={alertThreshold}
                  onChange={(e) => setAlertThreshold(Number(e.target.value))}
                  className="w-full h-1.5 bg-slate-200 dark:bg-obsidian-750 rounded-lg appearance-none cursor-pointer accent-cobalt-600"
                />
                <div className="flex justify-between text-[10px] text-slate-400 font-mono">
                  <span>₹100 (Min)</span>
                  <span>₹500</span>
                  <span>₹1,000 (Max)</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Recharge CTA */}
      <div className="pt-6">
        <Button
          onClick={() => onRecharge(selectedTopUp)}
          icon={Zap}
          iconPosition="left"
          size="lg"
        >
          Recharge Meter +₹{selectedTopUp.toLocaleString()}
        </Button>
      </div>
    </div>
  );
};
