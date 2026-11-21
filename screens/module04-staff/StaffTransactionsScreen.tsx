import React from 'react';
import {
  ArrowLeft,
  Receipt,
  FileText,
  CreditCard,
  Plus,
  CheckCircle2,
  Calendar,
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
      {/* Header */}
      <div className="px-4 py-3 border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-obsidian-950/95 backdrop-blur-md z-30">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
            aria-label="Back"
          >
            <ArrowLeft size={17} className="text-rose-500" />
          </button>
          <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight truncate max-w-[240px]">
            Transaction history for {staff.name}
          </h2>
        </div>

        {onMakePayment && (
          <button
            type="button"
            onClick={onMakePayment}
            className="h-8 px-2.5 rounded-xl bg-[#E8FBF0] text-[#03963B] border border-[#04BB49]/30 text-xs font-bold flex items-center gap-1 hover:bg-[#d5f7e4] transition-colors press-scale"
          >
            <Plus size={13} />
            <span>Pay</span>
          </button>
        )}
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col p-4">
        {transactions.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center p-6 my-auto">
            {/* Receipt Illustration from screenshot */}
            <div className="relative mb-6">
              <div className="w-28 h-28 rounded-full bg-slate-100 dark:bg-white/5 flex items-center justify-center shadow-inner">
                <div className="w-16 h-20 bg-white dark:bg-slate-800 rounded-lg shadow-md border border-slate-200 dark:border-white/10 flex flex-col p-2 gap-1.5 relative overflow-hidden">
                  <div className="w-8 h-1.5 rounded-full bg-slate-200 dark:bg-white/20" />
                  <div className="w-12 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                  <div className="w-10 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                  <div className="w-7 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                  <div className="mt-auto flex justify-between items-center">
                    <div className="w-4 h-4 rounded-full bg-slate-200 dark:bg-white/20" />
                    <div className="w-6 h-1 rounded-full bg-slate-200 dark:bg-white/20" />
                  </div>
                  {/* Zigzag bottom receipt tear effect */}
                  <div className="absolute -bottom-1 left-0 right-0 h-1 bg-[radial-gradient(circle,transparent_3px,#f1f5f9_3px)] dark:bg-[radial-gradient(circle,transparent_3px,#1e293b_3px)] bg-[length:8px_8px]" />
                </div>
              </div>
            </div>

            <p className="text-sm font-medium text-slate-500 dark:text-slate-400 max-w-[240px] leading-relaxed">
              All payments made to {staff.name} would be shown here.
            </p>

            {onMakePayment && (
              <button
                type="button"
                onClick={onMakePayment}
                className="mt-6 h-11 px-6 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] text-white font-bold text-xs shadow-md shadow-[#04BB49]/20 transition-all press-scale"
              >
                Make First Payment
              </button>
            )}
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recent Transactions ({transactions.length})
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
