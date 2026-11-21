import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  CreditCard,
  Banknote,
  Smartphone,
  ChevronDown,
  ShieldCheck,
  X
} from 'lucide-react';
import { DomesticStaffMember } from './StaffDashboardScreen';

export interface StaffTransaction {
  id: string;
  staffId: string;
  staffName: string;
  amount: number;
  purpose: string;
  description: string;
  mode: 'UPI' | 'Cash';
  date: string;
  time: string;
  status: 'Completed' | 'Pending';
  referenceId: string;
}

interface StaffPaymentScreenProps {
  staff: DomesticStaffMember;
  onBack: () => void;
  onViewTransactions: () => void;
  onPaymentSuccess?: (tx: StaffTransaction) => void;
}

export const StaffPaymentScreen: React.FC<StaffPaymentScreenProps> = ({
  staff,
  onBack,
  onViewTransactions,
  onPaymentSuccess,
}) => {
  const [amount, setAmount] = useState<string>('3500');
  const [purpose, setPurpose] = useState<string>('Monthly Salary');
  const [description, setDescription] = useState<string>('');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Cash'>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedTx, setCompletedTx] = useState<StaffTransaction | null>(null);

  const quickAmounts = ['1000', '2500', '3500', '5000', '7500'];

  const purposeOptions = [
    'Monthly Salary',
    'Salary Advance',
    'Festival Bonus',
    'Overtime Work',
    'Tips / Appreciation',
    'Reimbursement',
    'Other'
  ];

  const handleContinue = () => {
    const numAmount = parseFloat(amount);
    if (isNaN(numAmount) || numAmount <= 0) return;

    setIsProcessing(true);
    setTimeout(() => {
      const newTx: StaffTransaction = {
        id: `tx_${Date.now()}`,
        staffId: staff.id,
        staffName: staff.name,
        amount: numAmount,
        purpose,
        description: description || `${purpose} for ${staff.name}`,
        mode: paymentMode,
        date: '21 Nov 2026',
        time: '08:12 PM',
        status: 'Completed',
        referenceId: `HUNT-PAY-${Math.floor(100000 + Math.random() * 900000)}`,
      };

      setIsProcessing(false);
      setCompletedTx(newTx);
      if (onPaymentSuccess) onPaymentSuccess(newTx);
    }, 1200);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between bg-white dark:bg-obsidian-950 text-slate-900 dark:text-white text-left animate-in fade-in duration-200 relative pb-10">
      {/* Top Header */}
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
            Payment for {staff.name}
          </h2>
        </div>
      </div>

      <div className="p-4 flex flex-col gap-6">
        {/* Amount Input Section */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Amount
          </label>
          <div className="relative flex items-center">
            <span className="absolute left-3.5 text-lg font-bold text-slate-400">₹</span>
            <input
              type="number"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="0.00"
              className="w-full h-13 pl-8 pr-4 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xl font-black text-slate-900 dark:text-white focus:outline-none focus:border-[#04BB49] focus:ring-2 focus:ring-[#04BB49]/20 transition-all"
            />
          </div>

          {/* Quick Amount Chips */}
          <div className="flex items-center gap-2 overflow-x-auto py-1 no-scrollbar">
            {quickAmounts.map((q) => (
              <button
                key={q}
                type="button"
                onClick={() => setAmount(q)}
                className={`px-3 py-1 rounded-full text-xs font-bold border transition-colors shrink-0 ${
                  amount === q
                    ? 'bg-[#E8FBF0] text-[#03963B] border-[#04BB49]/40'
                    : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-transparent hover:bg-slate-200'
                }`}
              >
                ₹{parseInt(q).toLocaleString('en-IN')}
              </button>
            ))}
          </div>
        </div>

        {/* What's this for? Dropdown */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            What's this for?
          </label>
          <div className="relative">
            <select
              value={purpose}
              onChange={(e) => setPurpose(e.target.value)}
              className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-semibold text-slate-900 dark:text-white appearance-none focus:outline-none focus:border-[#04BB49] focus:ring-2 focus:ring-[#04BB49]/20 transition-all cursor-pointer"
            >
              {purposeOptions.map((opt) => (
                <option key={opt} value={opt} className="bg-white dark:bg-slate-900 text-slate-900 dark:text-white">
                  {opt}
                </option>
              ))}
            </select>
            <ChevronDown size={16} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Description Input */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Description
          </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add note (optional)"
            className="w-full h-12 px-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-sm font-medium text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none focus:border-[#04BB49] focus:ring-2 focus:ring-[#04BB49]/20 transition-all"
          />
        </div>

        {/* Choose Payment Mode */}
        <div className="flex flex-col gap-3 pt-2">
          <h3 className="text-sm font-bold text-slate-800 dark:text-white tracking-tight">
            Choose Payment Mode
          </h3>

          <div className="flex flex-col gap-2.5">
            {/* UPI Option */}
            <label
              onClick={() => setPaymentMode('UPI')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                paymentMode === 'UPI'
                  ? 'bg-[#F7FCF9] dark:bg-emerald-950/20 border-[#04BB49] shadow-xs'
                  : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-slate-100 dark:bg-white/10 flex items-center justify-center shrink-0 border border-slate-200/60 dark:border-white/10">
                  <span className="font-mono font-black text-xs text-slate-800 dark:text-white">UPI</span>
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">UPI</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Pay via BHIM, Google Pay or any UPI App
                  </p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMode === 'UPI'
                  ? 'border-[#04BB49] bg-white'
                  : 'border-slate-300 dark:border-slate-600'
              }`}>
                {paymentMode === 'UPI' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#04BB49]" />
                )}
              </div>
            </label>

            {/* Paid via Cash Option */}
            <label
              onClick={() => setPaymentMode('Cash')}
              className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                paymentMode === 'Cash'
                  ? 'bg-[#F7FCF9] dark:bg-emerald-950/20 border-[#04BB49] shadow-xs'
                  : 'bg-white dark:bg-white/5 border-slate-200 dark:border-white/10 hover:border-slate-300'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 flex items-center justify-center shrink-0 border border-emerald-200/60 dark:border-emerald-800/40 text-[#03963B]">
                  <Banknote size={20} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white">Paid via Cash</h4>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                    Record payment given in cash
                  </p>
                </div>
              </div>

              <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                paymentMode === 'Cash'
                  ? 'border-[#04BB49] bg-white'
                  : 'border-slate-300 dark:border-slate-600'
              }`}>
                {paymentMode === 'Cash' && (
                  <div className="w-2.5 h-2.5 rounded-full bg-[#04BB49]" />
                )}
              </div>
            </label>
          </div>
        </div>

        {/* Primary Action Button */}
        <div className="pt-2">
          <button
            type="button"
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
            onClick={handleContinue}
            className="w-full h-12 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-[#04BB49]/30 transition-all press-scale flex items-center justify-center gap-2"
          >
            {isProcessing ? (
              <span className="animate-pulse">Processing Payment...</span>
            ) : (
              <span>Continue</span>
            )}
          </button>
        </div>

        {/* View all Transactions Link */}
        <div className="flex justify-center pt-1">
          <button
            type="button"
            onClick={onViewTransactions}
            className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-slate-800 dark:text-slate-400 dark:hover:text-white transition-colors"
          >
            <Clock size={14} className="text-slate-400" />
            <span>View all Transactions</span>
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {completedTx && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[320px] p-6 rounded-[28px] bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-100 dark:border-white/10 shadow-2xl flex flex-col gap-4 text-center animate-in zoom-in-95 duration-200 relative">
            <div className="w-14 h-14 rounded-full bg-[#E8FBF0] text-[#04BB49] flex items-center justify-center mx-auto shadow-inner">
              <CheckCircle2 size={32} />
            </div>

            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-emerald-600 dark:text-emerald-400">
                Payment Recorded
              </span>
              <h3 className="text-xl font-black text-slate-900 dark:text-white mt-1">
                ₹{completedTx.amount.toLocaleString('en-IN')}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                Paid to {completedTx.staffName} via {completedTx.mode}
              </p>
            </div>

            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-left text-xs space-y-1.5">
              <div className="flex justify-between text-slate-500">
                <span>Reference:</span>
                <span className="font-mono font-bold text-slate-900 dark:text-white">{completedTx.referenceId}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Purpose:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{completedTx.purpose}</span>
              </div>
              <div className="flex justify-between text-slate-500">
                <span>Date:</span>
                <span className="font-semibold text-slate-800 dark:text-slate-200">{completedTx.date}, {completedTx.time}</span>
              </div>
            </div>

            <div className="flex flex-col gap-2 pt-1">
              <button
                type="button"
                onClick={onViewTransactions}
                className="w-full h-11 rounded-xl bg-[#04BB49] hover:bg-[#03963B] text-white font-bold text-xs shadow-md transition-all press-scale"
              >
                View Transaction History
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full h-10 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
              >
                Done
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
