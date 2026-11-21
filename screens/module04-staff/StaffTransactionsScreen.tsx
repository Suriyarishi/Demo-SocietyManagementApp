import React, { useState } from 'react';
import {
  ArrowLeft,
  Receipt,
  CheckCircle2,
  Banknote,
  Smartphone,
  CreditCard,
  Download,
  Calendar,
  Share2
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
  const [selectedTx, setSelectedTx] = useState<StaffTransaction | null>(null);

  // Default sample transactions if list is empty, to provide a rich visual demonstration
  const displayTransactions: StaffTransaction[] = transactions.length > 0
    ? transactions
    : [
        {
          id: 'tx_sample_01',
          staffId: staff.id,
          staffName: staff.name,
          amount: 5000,
          purpose: 'Salary',
          description: 'October 2026 Monthly Salary',
          mode: 'UPI',
          date: '31 Oct 2026',
          time: '07:45 PM',
          status: 'Completed',
          referenceId: 'HUNT-PAY-849201',
        },
        {
          id: 'tx_sample_02',
          staffId: staff.id,
          staffName: staff.name,
          amount: 1000,
          purpose: 'Diwali Bonus',
          description: 'Festive bonus from Flat 1204',
          mode: 'Cash',
          date: '28 Oct 2026',
          time: '06:15 PM',
          status: 'Completed',
          referenceId: 'HUNT-PAY-723190',
        },
      ];

  const totalPaid = displayTransactions.reduce((acc, t) => acc + t.amount, 0);

  return (
    <div className="w-full min-h-full flex flex-col bg-[#F8FAF9] dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 pb-16">
      {/* Sticky Top Header Bar */}
      <div className="px-4 py-3 bg-white/90 dark:bg-obsidian-900/90 backdrop-blur-md border-b border-slate-100 dark:border-white/5 flex items-center justify-between sticky top-0 z-30 shadow-2xs">
        <div className="flex items-center gap-2.5">
          <button
            type="button"
            onClick={onBack}
            className="w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-white/10 dark:hover:bg-white/20 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
            aria-label="Back"
          >
            <ArrowLeft size={18} className="text-slate-800 dark:text-white" />
          </button>
          <div>
            <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
              Payment History
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              {staff.name} • {staff.role}
            </p>
          </div>
        </div>

        {onMakePayment && (
          <button
            type="button"
            onClick={onMakePayment}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-[#E8FBF0] hover:bg-[#d5f7e3] text-[#03963B] border border-[#04BB49]/30 text-xs font-bold transition-all press-scale shadow-2xs"
          >
            <CreditCard size={13} />
            <span>Pay Now</span>
          </button>
        )}
      </div>

      {/* Main Content Area - Flows from top naturally */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* CARD 1: Lifetime Payment Summary Card */}
        <div className="p-4 rounded-[26px] bg-gradient-to-br from-white to-slate-50 dark:from-slate-900 dark:to-slate-800 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
              Total Recorded Payments
            </span>
            <h2 className="text-2xl font-black text-slate-900 dark:text-white mt-0.5">
              ₹{totalPaid.toLocaleString('en-IN')}
            </h2>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 font-medium">
              {displayTransactions.length} payments recorded in ledger
            </p>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-[#E8FBF0] dark:bg-emerald-950/60 text-[#04BB49] flex items-center justify-center text-xl shadow-inner shrink-0">
            🧾
          </div>
        </div>

        {/* CARD 2: Transactions Feed */}
        <div className="p-4 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h3 className="text-xs font-extrabold text-slate-900 dark:text-white uppercase tracking-wider">
              Recent Transactions ({displayTransactions.length})
            </h3>
            <span className="text-[10px] font-bold text-slate-400">
              Verified by Ledger
            </span>
          </div>

          <div className="flex flex-col divide-y divide-slate-100 dark:divide-white/5">
            {displayTransactions.map((tx) => (
              <div
                key={tx.id}
                onClick={() => setSelectedTx(tx)}
                className="py-3 flex items-center justify-between cursor-pointer hover:bg-slate-50 dark:hover:bg-white/5 px-2 rounded-xl transition-colors group"
              >
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 ${
                    tx.mode === 'UPI'
                      ? 'bg-[#E8FBF0] text-[#03963B] border border-[#04BB49]/20'
                      : 'bg-amber-50 text-amber-700 border border-amber-200/50'
                  }`}>
                    {tx.mode === 'UPI' ? <Smartphone size={16} /> : <Banknote size={16} />}
                  </div>

                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white group-hover:text-[#03963B] transition-colors">
                      {tx.purpose}
                    </h4>
                    <p className="text-[10px] text-slate-400 font-medium">
                      {tx.date} • {tx.mode} • <span className="font-mono">{tx.referenceId}</span>
                    </p>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-sm font-black text-slate-900 dark:text-white block">
                    ₹{tx.amount.toLocaleString('en-IN')}
                  </span>
                  <span className="inline-flex items-center gap-0.5 text-[9px] font-bold text-[#03963B]">
                    <CheckCircle2 size={9} />
                    <span>{tx.status}</span>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Transaction Receipt Modal */}
      {selectedTx && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[320px] p-6 rounded-[28px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-100 dark:border-white/10 shadow-2xl flex flex-col gap-4 text-center animate-in zoom-in-95 duration-200 relative">
            <div className="w-14 h-14 rounded-full bg-[#E8FBF0] text-[#04BB49] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Payment Receipt
              </span>
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
                ₹{selectedTx.amount.toLocaleString('en-IN')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Paid to {selectedTx.staffName} via {selectedTx.mode}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Reference:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{selectedTx.referenceId}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Purpose:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTx.purpose}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Description:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTx.description}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Timestamp:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{selectedTx.date}, {selectedTx.time}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={() => setSelectedTx(null)}
                className="w-full h-11 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] text-white font-bold text-xs shadow-md transition-all press-scale"
              >
                Close Receipt
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
