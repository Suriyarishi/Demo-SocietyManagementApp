import React from 'react';
import {
  ArrowLeft,
  Receipt,
  CheckCircle2,
  Banknote,
  Smartphone
} from 'lucide-react';
import { DomesticStaffMember } from './StaffDashboardScreen';
import { StaffTransaction } from './StaffPaymentScreen';

interface StaffTransactionsScreenProps {
  staff: DomesticStaffMember;
  transactions?: StaffTransaction[];
  onBack: () => void;
  onMakePayment?: () => void;
}

export const StaffTransactionsScreen: React.FC<StaffTransactionsScreenProps> = ({
  staff,
  transactions = [],
  onBack,
  onMakePayment,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-white dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 pb-10">
      {/* Top Header Bar (Matching Screenshot 4) */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-obsidian-950/95 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/20 transition-colors press-scale"
            aria-label="Back"
          >
            <ArrowLeft size={19} strokeWidth={2.4} className="text-rose-500" />
          </button>
          <h2 className="text-base font-bold text-slate-800 dark:text-white tracking-tight truncate max-w-[260px]">
            Transaction history for {staff.name}
          </h2>
        </div>
      </div>

      {/* Main Content - Exact Screenshot Parameter Fields */}
      <div className="flex-1 flex flex-col p-4 justify-center">
        {transactions.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center p-6 my-auto">
            {/* Receipt Illustration with Circular Backdrop (Matching Screenshot 4) */}
            <div className="w-28 h-28 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shadow-inner mb-6">
              <div className="w-14 h-18 bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200/80 dark:border-white/10 flex flex-col p-2 gap-1.5 relative overflow-hidden">
                <div className="w-7 h-1.5 rounded-full bg-slate-200 dark:bg-white/20" />
                <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                <div className="w-8 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                <div className="w-6 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                <div className="mt-auto flex justify-between items-center pt-1">
                  <div className="w-3 h-3 rounded-full bg-slate-200 dark:bg-white/20" />
                  <div className="w-5 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                </div>
                {/* Zigzag bottom receipt tear effect */}
                <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[radial-gradient(circle,transparent_2px,#f1f5f9_2px)] dark:bg-[radial-gradient(circle,transparent_2px,#1e293b_2px)] bg-[length:6px_6px]" />
              </div>
            </div>

            <p className="text-xs font-semibold text-slate-500 dark:text-slate-400 max-w-[220px] leading-relaxed">
              All payments made to {staff.name} would be shown here.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Payments
            </span>

            {transactions.map((tx) => (
              <div
                key={tx.id}
                className="p-4 rounded-2xl bg-white dark:bg-white/5 border border-slate-100 dark:border-white/10 shadow-xs flex flex-col gap-2.5"
              >
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-xl bg-[#E8FBF0] text-[#04BB49] flex items-center justify-center">
                      {tx.mode === 'UPI' ? <Smartphone size={16} /> : <Banknote size={16} />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                        {tx.purpose}
                      </h4>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {tx.date} • {tx.time}
                      </p>
                    </div>
                  </div>

                  <div className="text-right">
                    <span className="text-base font-black text-slate-900 dark:text-white">
                      ₹{tx.amount.toLocaleString('en-IN')}
                    </span>
                    <div className="flex items-center gap-1 justify-end text-[10px] text-emerald-600 dark:text-emerald-400 font-bold mt-0.5">
                      <CheckCircle2 size={11} />
                      <span>{tx.status}</span>
                    </div>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-100 dark:border-white/5 flex items-center justify-between text-[11px] text-slate-400">
                  <span className="font-mono">{tx.referenceId}</span>
                  <span className="font-medium text-slate-600 dark:text-slate-300">Paid via {tx.mode}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
