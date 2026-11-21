import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  ChevronDown,
  ShieldCheck,
  CreditCard,
  Banknote,
  Smartphone,
  Info
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
  const [amount, setAmount] = useState<string>('5000');
  const [purpose, setPurpose] = useState<string>('Salary');
  const [description, setDescription] = useState<string>('November Monthly Salary');
  const [paymentMode, setPaymentMode] = useState<'UPI' | 'Cash'>('UPI');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [completedTx, setCompletedTx] = useState<StaffTransaction | null>(null);

  const presetAmounts = ['1000', '2500', '5000', `${staff.salaryPerMonth || 5000}`];

  const purposeOptions = [
    'Salary',
    'Salary Advance',
    'Bonus',
    'Overtime',
    'Tips',
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
        purpose: purpose || 'Salary',
        description: description || `Payment for ${staff.name}`,
        mode: paymentMode,
        date: '21 Nov 2026',
        time: '08:12 PM',
        status: 'Completed',
        referenceId: `HUNT-PAY-${Math.floor(100000 + Math.random() * 900000)}`,
      };

      setIsProcessing(false);
      setCompletedTx(newTx);
      if (onPaymentSuccess) onPaymentSuccess(newTx);
    }, 900);
  };

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
              Pay Staff
            </h1>
            <p className="text-[10px] font-semibold text-slate-400 dark:text-slate-500">
              {staff.name} • {staff.role}
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onViewTransactions}
          className="text-xs font-bold text-[#03963B] dark:text-[#0ECD5A] hover:underline"
        >
          History
        </button>
      </div>

      {/* Main Content Area - Flows from top without voids */}
      <div className="flex-1 p-4 flex flex-col gap-4">
        {/* Recipient Profile Banner Card */}
        <div className="p-3.5 rounded-[22px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-2xs flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full overflow-hidden border border-slate-100 dark:border-white/10 shadow-2xs shrink-0">
              <img
                src={staff.avatarUrl}
                alt={staff.name}
                className="w-11 h-11 rounded-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white">
                  {staff.name}
                </h3>
                <span className="px-1.5 py-0.2 rounded-full bg-slate-100 dark:bg-white/10 text-slate-600 dark:text-slate-300 text-[9px] font-bold">
                  {staff.role}
                </span>
              </div>
              <p className="text-[11px] text-slate-400 font-mono">
                📞 +91 {staff.maskedPhone || '*********91'}
              </p>
            </div>
          </div>

          <div className="text-right">
            <span className="text-[10px] text-slate-400 block font-medium">Monthly Due</span>
            <span className="text-xs font-black text-slate-900 dark:text-white">
              ₹{(staff.salaryPerMonth || 5000).toLocaleString('en-IN')}
            </span>
          </div>
        </div>

        {/* Card: Payment Parameters Form */}
        <div className="p-4 rounded-[26px] bg-white dark:bg-slate-900 border border-slate-100/90 dark:border-white/10 shadow-[0_4px_24px_-4px_rgba(0,0,0,0.04)] flex flex-col gap-4">
          {/* Field 1: Amount */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Payment Amount (₹)
            </label>
            <div className="relative">
              <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-lg font-black text-slate-400">
                ₹
              </span>
              <input
                type="number"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                placeholder="0"
                className="w-full h-12 pl-8 pr-4 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-lg font-black text-slate-900 dark:text-white focus:outline-none focus:border-[#04BB49] focus:ring-1 focus:ring-[#04BB49] transition-all"
              />
            </div>

            {/* Quick Amount Suggestion Chips */}
            <div className="flex items-center gap-1.5 pt-1 overflow-x-auto scrollbar-none">
              {presetAmounts.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setAmount(p)}
                  className={`px-3 py-1 rounded-xl text-xs font-bold transition-all press-scale ${
                    amount === p
                      ? 'bg-[#04BB49] text-white shadow-xs'
                      : 'bg-slate-100 dark:bg-white/5 text-slate-600 dark:text-slate-300 hover:bg-slate-200'
                  }`}
                >
                  ₹{parseInt(p, 10).toLocaleString('en-IN')}
                </button>
              ))}
            </div>
          </div>

          {/* Field 2: What's this for? */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Payment Purpose
            </label>
            <div className="relative">
              <select
                value={purpose}
                onChange={(e) => setPurpose(e.target.value)}
                className="w-full h-11 px-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-bold text-slate-800 dark:text-slate-200 appearance-none focus:outline-none focus:border-[#04BB49] focus:ring-1 focus:ring-[#04BB49] transition-all cursor-pointer"
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

          {/* Field 3: Description */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Note / Description
            </label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="e.g. November monthly wages"
              className="w-full h-11 px-3.5 rounded-2xl bg-slate-50/70 dark:bg-white/5 border border-slate-200 dark:border-white/10 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:border-[#04BB49] focus:ring-1 focus:ring-[#04BB49] transition-all"
            />
          </div>

          {/* Field 4: Payment Mode Selection */}
          <div className="flex flex-col gap-2.5 pt-1">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Choose Payment Method
            </label>

            <div className="grid grid-cols-2 gap-2.5">
              {/* Mode 1: UPI */}
              <div
                onClick={() => setPaymentMode('UPI')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  paymentMode === 'UPI'
                    ? 'bg-[#E8FBF0] dark:bg-emerald-950/20 border-[#04BB49] shadow-xs'
                    : 'bg-slate-50/60 dark:bg-white/5 border-slate-200 dark:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 flex items-center justify-center font-mono font-black text-[10px] text-[#04BB49]">
                    UPI
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">UPI / GPay</h4>
                    <p className="text-[10px] text-slate-400">Instant transfer</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentMode === 'UPI' ? 'border-[#04BB49]' : 'border-slate-300'
                }`}>
                  {paymentMode === 'UPI' && <div className="w-2 h-2 rounded-full bg-[#04BB49]" />}
                </div>
              </div>

              {/* Mode 2: Paid via Cash */}
              <div
                onClick={() => setPaymentMode('Cash')}
                className={`p-3 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  paymentMode === 'Cash'
                    ? 'bg-[#E8FBF0] dark:bg-emerald-950/20 border-[#04BB49] shadow-xs'
                    : 'bg-slate-50/60 dark:bg-white/5 border-slate-200 dark:border-white/10'
                }`}
              >
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-xl bg-white dark:bg-slate-800 border border-slate-200/80 flex items-center justify-center text-sm">
                    💵
                  </div>
                  <div>
                    <h4 className="text-xs font-black text-slate-900 dark:text-white">Cash Paid</h4>
                    <p className="text-[10px] text-slate-400">Log to ledger</p>
                  </div>
                </div>
                <div className={`w-4 h-4 rounded-full border flex items-center justify-center ${
                  paymentMode === 'Cash' ? 'border-[#04BB49]' : 'border-slate-300'
                }`}>
                  {paymentMode === 'Cash' && <div className="w-2 h-2 rounded-full bg-[#04BB49]" />}
                </div>
              </div>
            </div>
          </div>

          {/* Security Notice */}
          <div className="flex items-center gap-2 p-2.5 rounded-xl bg-slate-50 dark:bg-white/5 text-[11px] text-slate-500 font-medium">
            <ShieldCheck size={14} className="text-[#04BB49] shrink-0" />
            <span>Recorded in official society household ledger with instant digital receipt.</span>
          </div>

          {/* Primary Action Button: Continue */}
          <button
            type="button"
            disabled={!amount || parseFloat(amount) <= 0 || isProcessing}
            onClick={handleContinue}
            className="w-full h-12 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] disabled:opacity-50 text-white font-extrabold text-sm shadow-md shadow-[#04BB49]/25 transition-all press-scale flex items-center justify-center gap-2 mt-1"
          >
            {isProcessing ? 'Processing Transaction...' : `Confirm Payment of ₹${parseFloat(amount || '0').toLocaleString('en-IN')}`}
          </button>
        </div>
      </div>

      {/* Success Receipt Modal */}
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
              <h3 className="text-2xl font-black text-slate-900 dark:text-white mt-1">
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
                className="w-full h-11 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] text-white font-bold text-xs shadow-md transition-all press-scale"
              >
                View Transaction History
              </button>
              <button
                type="button"
                onClick={onBack}
                className="w-full h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-white/10 text-slate-700 dark:text-slate-200 font-semibold text-xs transition-colors"
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
