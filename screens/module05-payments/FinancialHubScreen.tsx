import React, { useState } from 'react';
import {
  CreditCard,
  Zap,
  ArrowRight,
  ArrowLeft,
  Download,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Receipt,
  ShieldCheck,
  ChevronRight,
  TrendingDown,
  Sparkles
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { SmartMeter3D } from '../../components/3d/Vector3DElements';
import {
  MaintenanceBill3D,
  MeterRecharge3D,
  UtilityReceipt3D,
  PrivacyShield3D,
  PaymentCard3D,
} from '../../components/3d/Module3DIcons';

interface FinancialHubScreenProps {
  onBack?: () => void;
  onPayNow: (amount: number) => void;
  onViewItemizedBill: () => void;
  onOpenSmartMeter: () => void;
  onOpenLedger: () => void;
  onQuickRechargeEB: (amount: number) => void;
}

export const FinancialHubScreen: React.FC<FinancialHubScreenProps> = ({
  onBack,
  onPayNow,
  onViewItemizedBill,
  onOpenSmartMeter,
  onOpenLedger,
  onQuickRechargeEB,
}) => {
  const [maintenanceDue, setMaintenanceDue] = useState<number>(4250);
  const [ebBalance, setEbBalance] = useState<number>(840.5);

  return (
    <div className="w-full min-h-full flex flex-col justify-between pb-24 text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-4">
        {/* Header */}
        <div className="px-4 py-2.5 bg-white dark:bg-obsidian-900 border-b border-slate-200/80 dark:border-obsidian-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-700 press-scale shrink-0"
                title="Back to Previous Screen"
              >
                <ArrowLeft size={16} strokeWidth={2.4} />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest truncate">
                  SOCIETY FINANCIALS
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                Payments & Utilities
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenLedger}
            className="h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 flex items-center gap-1.5 text-xs font-bold text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-700 shrink-0"
          >
            <UtilityReceipt3D size={15} />
            <span className="text-[11px]">Ledger</span>
          </button>
        </div>

        {/* Maintenance Due Hero Card (High Luxury 2026 Card) */}
        <div className="px-4">
          <div className="relative p-5 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated overflow-hidden">
            <div className="absolute top-0 right-0 w-36 h-36 bg-cobalt-600/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-start justify-between relative z-10">
              <div>
                <span className="text-[10px] font-bold text-cobalt-400 uppercase tracking-widest">
                  Monthly Maintenance (November 2026)
                </span>
                <div className="mt-1 flex items-baseline gap-2">
                  <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
                    ₹{maintenanceDue.toLocaleString()}
                  </span>
                  <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Flat 1204</span>
                </div>
              </div>

              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 uppercase">
                Due in 5 Days
              </span>
            </div>

            {/* Early Bird Rebate Callout */}
            <div className="mt-4 p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between text-xs relative z-10">
              <span className="text-emerald-300 font-semibold flex items-center gap-2">
                <MeterRecharge3D size={18} />
                <span>Early Bird Rebate: Save ₹150 if paid by Nov 28</span>
              </span>
              <span className="text-emerald-400 font-bold font-mono text-[11px]">-₹150</span>
            </div>

            {/* Action Bar */}
            <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between relative z-10">
              <button
                type="button"
                onClick={onViewItemizedBill}
                className="text-xs font-semibold text-slate-300 hover:text-white flex items-center gap-1"
              >
                <span>View Itemized Bill & Tax Invoice</span>
                <ChevronRight size={13} />
              </button>

              <span className="text-[11px] text-slate-500 dark:text-slate-400">0% UPI Fee</span>
            </div>
          </div>
        </div>

        {/* Primary Pay Action */}
        <div className="px-4">
          <button
            type="button"
            onClick={() => onPayNow(maintenanceDue)}
            className="w-full h-12 rounded-2xl bg-cobalt-600 hover:bg-cobalt-700 active:bg-cobalt-800 text-white font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cobalt-600/20 transition-all press-scale"
          >
            <PaymentCard3D size={20} />
            <span>Pay ₹{maintenanceDue.toLocaleString()} via UPI (Instant Receipt)</span>
          </button>
        </div>

        {/* Smart Prepaid Sub-Meter Card with 3D Smart Meter Visual */}
        <div className="px-4">
          <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3 relative overflow-hidden">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <SmartMeter3D size={54} />
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                    Smart EB & Water Meter
                  </h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Prepaid Sub-Meter #MTR-1204
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-base font-extrabold font-mono text-emerald-600 dark:text-emerald-400 block">
                  ₹{ebBalance.toFixed(2)}
                </span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">~4 Days Left</span>
              </div>
            </div>

            <div className="p-2.5 rounded-xl bg-slate-50 dark:bg-obsidian-850 flex items-center justify-between text-xs text-slate-600 dark:text-slate-400">
              <span>Avg Daily Consumption: <strong className="text-slate-900 dark:text-white font-mono">18.4 kWh (~₹195)</strong></span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">Normal Load</span>
            </div>

            {/* Quick Recharge Chips */}
            <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-obsidian-800">
              <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">Top-up:</span>
              {[500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => onQuickRechargeEB(amt)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 text-xs font-mono font-bold text-slate-800 dark:text-slate-200 transition-colors"
                >
                  +₹{amt}
                </button>
              ))}
              <button
                type="button"
                onClick={onOpenSmartMeter}
                className="ml-auto text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline"
              >
                Analytics →
              </button>
            </div>
          </div>
        </div>

        {/* Recent Payment Receipts */}
        <div className="px-4 flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Recent Society Receipts
            </h3>
            <button
              onClick={onOpenLedger}
              className="text-xs font-semibold text-cobalt-600 dark:text-cobalt-400 hover:underline"
            >
              View All
            </button>
          </div>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-teal-50 dark:bg-teal-950/40 border border-teal-200/70 dark:border-teal-800/40 flex items-center justify-center shrink-0">
                <UtilityReceipt3D size={24} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block">
                  October 2026 Maintenance
                </span>
                <span className="text-[11px] text-slate-500 dark:text-slate-400">
                  Paid on Oct 28 • Receipt #HNT-9402
                </span>
              </div>
            </div>

            <div className="text-right">
              <span className="text-xs font-mono font-bold text-slate-900 dark:text-white block">
                ₹4,250
              </span>
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                Success ✓
              </span>
            </div>
          </div>
        </div>

        {/* Association Trust Notice */}
        <div className="px-4">
          <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-start gap-2.5 text-[11px] text-slate-500 dark:text-slate-400">
            <PrivacyShield3D size={20} className="mt-0.5" />
            <span>
              100% of your payment is deposited directly into the Prestige Lakeside Habitat Association Account at HDFC Bank. Hunt Lockdoor charges 0% convenience markups.
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
