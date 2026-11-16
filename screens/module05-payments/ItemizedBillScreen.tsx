import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Building,
  FileText,
  ShieldCheck,
  ChevronRight,
  Info,
  CheckCircle2,
  Sparkles
} from 'lucide-react';
import { Button } from '../../components/UIComponents';

interface ItemizedBillScreenProps {
  onBack: () => void;
  onProceedToPay: (amount: number) => void;
}

export const ItemizedBillScreen: React.FC<ItemizedBillScreenProps> = ({
  onBack,
  onProceedToPay,
}) => {
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const lineItems = [
    { title: 'Base Flat Maintenance', desc: '₹1.80 / sq.ft on 1,840 sq.ft super built-up area', amount: 3312.0 },
    { title: 'Sinking Fund Allocation', desc: 'Mandatory 10% capital asset replacement reserve', amount: 331.2 },
    { title: 'Common Area Electricity & Lift AMC', desc: 'Otis Lift Maintenance & corridor LED power', amount: 420.0 },
    { title: 'Water Supply & STP Processing', desc: 'Borewell pumping & greywater filtration', amount: 250.0 },
    { title: 'Round-off & Miscellaneous', desc: 'Per association resolution #2026/04', amount: -63.2 },
  ];

  const subtotal = 4250.0;
  const earlyBirdDiscount = 150.0;
  const netDue = subtotal - earlyBirdDiscount;

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-200 relative">
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}
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
            Bill Invoice Breakdown
          </span>
          <button
            type="button"
            onClick={() => {
              showToast('✓ Preparing official GST Tax Invoice PDF for print/save...');
              setTimeout(() => {
                try {
                  window.print();
                } catch (e) {
                  // Fallback
                }
              }, 500);
            }}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
            title="Download PDF"
          >
            <Download size={16} />
          </button>
        </div>

        {/* Invoice Title & Metadata */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest">
              TAX INVOICE #INV-2026-11-1204
            </span>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-0.5">
              November 2026 Dues
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Billing Period: 01 Nov 2026 – 30 Nov 2026
            </p>
          </div>
          <span className="text-xs font-mono font-bold px-2.5 py-1 rounded-lg bg-slate-100 dark:bg-obsidian-850 text-slate-800 dark:text-slate-200 border border-slate-200 dark:border-obsidian-750">
            Flat 1204
          </span>
        </div>

        {/* Association Beneficiary Card */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 flex items-center gap-3 shadow-ambient">
          <div className="w-10 h-10 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center shrink-0">
            <Building size={20} />
          </div>
          <div className="text-xs">
            <span className="font-bold text-slate-900 dark:text-white block">
              Prestige Lakeside Habitat Association
            </span>
            <span className="text-[11px] text-slate-500 font-mono">
              HDFC Bank • A/C: 50200049281902 • IFSC: HDFC0001294
            </span>
          </div>
        </div>

        {/* Line Items Table */}
        <div className="p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Itemized Charge Details
          </h4>

          <div className="flex flex-col gap-3 text-xs">
            {lineItems.map((item, idx) => (
              <div key={idx} className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100 dark:border-obsidian-800">
                <div>
                  <span className="font-bold text-slate-900 dark:text-white block">
                    {item.title}
                  </span>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {item.desc}
                  </span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white shrink-0">
                  ₹{item.amount.toFixed(2)}
                </span>
              </div>
            ))}

            {/* Subtotal */}
            <div className="flex items-center justify-between text-slate-600 dark:text-slate-400 font-semibold pt-1">
              <span>Standard Maintenance Total:</span>
              <span className="font-mono">₹{subtotal.toFixed(2)}</span>
            </div>

            {/* Early Bird Rebate */}
            <div className="flex items-center justify-between text-emerald-600 dark:text-emerald-400 font-bold">
              <span className="flex items-center gap-1.5">
                <Sparkles size={14} />
                <span>Early Bird Green Rebate:</span>
              </span>
              <span className="font-mono">-₹{earlyBirdDiscount.toFixed(2)}</span>
            </div>

            {/* Net Total Payable */}
            <div className="mt-2 pt-3 border-t-2 border-slate-200 dark:border-obsidian-750 flex items-center justify-between text-base">
              <span className="font-extrabold text-slate-900 dark:text-white">Net Amount Payable:</span>
              <span className="font-mono font-extrabold text-2xl text-cobalt-600 dark:text-cobalt-400">
                ₹{netDue.toFixed(2)}
              </span>
            </div>
          </div>
        </div>

        {/* GST Notice */}
        <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-start gap-2.5 text-[11px] text-slate-500 dark:text-slate-400">
          <Info size={15} className="text-cobalt-500 shrink-0 mt-0.5" />
          <span>
            Exempt from GST as monthly maintenance is below ₹7,500/member/month under Section 12(3) of Association bylaws.
          </span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={() => onProceedToPay(netDue)}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Proceed to Pay ₹{netDue.toLocaleString()}
        </Button>
      </div>
    </div>
  );
};
