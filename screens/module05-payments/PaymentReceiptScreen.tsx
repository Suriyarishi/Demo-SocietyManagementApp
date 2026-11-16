import React, { useState } from 'react';
import {
  CheckCircle2,
  Download,
  Share2,
  Building,
  ShieldCheck,
  QrCode,
  ArrowRight,
  ArrowLeft,
  X,
  FileText
} from 'lucide-react';
import { Button } from '../../components/UIComponents';

interface PaymentReceiptScreenProps {
  receiptData: {
    amount: number;
    txnId: string;
    timestamp: string;
    date: string;
    method: string;
    flat: string;
    society: string;
  };
  onReturnToHub: () => void;
}

export const PaymentReceiptScreen: React.FC<PaymentReceiptScreenProps> = ({
  receiptData,
  onReturnToHub,
}) => {
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300 relative">
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}
      <div className="flex flex-col gap-5">
        {/* Top Navigation Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onReturnToHub}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
            title="Return to Financials Hub"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider">
            Transaction Receipt
          </span>
          <button
            type="button"
            onClick={onReturnToHub}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
            title="Close"
          >
            <X size={18} strokeWidth={2.4} />
          </button>
        </div>

        {/* Success Header */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="w-16 h-16 rounded-full bg-emerald-50 dark:bg-emerald-950/60 text-emerald-500 border border-emerald-500/40 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20 animate-in zoom-in-95">
            <CheckCircle2 size={36} strokeWidth={2.4} />
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest bg-emerald-50 dark:bg-emerald-950/40 px-2.5 py-0.5 rounded-full border border-emerald-200 dark:border-emerald-800/40">
            PAYMENT SUCCESSFUL
          </span>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight mt-1">
            ₹{receiptData.amount.toLocaleString()} Paid
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
            Maintenance cleared for {receiptData.flat}
          </p>
        </div>

        {/* Digital Tax Receipt Ticket */}
        <div className="rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-elevated overflow-hidden text-xs">
          <div className="p-4 bg-slate-50 dark:bg-obsidian-850 border-b border-slate-200 dark:border-obsidian-750 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase font-bold block">Official Receipt</span>
              <span className="font-mono font-bold text-slate-800 dark:text-slate-200 text-sm">
                #{receiptData.txnId}
              </span>
            </div>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
              Audit Cleared
            </span>
          </div>

          <div className="p-5 flex flex-col gap-3">
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-obsidian-800">
              <span className="text-slate-500 dark:text-slate-400">Beneficiary:</span>
              <span className="font-semibold text-slate-900 dark:text-white text-right truncate max-w-[200px]">
                {receiptData.society}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-obsidian-800">
              <span className="text-slate-500 dark:text-slate-400">Payment Rail:</span>
              <span className="font-semibold text-slate-900 dark:text-white font-mono">
                {receiptData.method} UPI (0% Fee)
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-obsidian-800">
              <span className="text-slate-500 dark:text-slate-400">Date & Time:</span>
              <span className="font-mono text-slate-900 dark:text-white">
                {receiptData.date} • {receiptData.timestamp}
              </span>
            </div>

            <div className="flex items-center justify-between py-1">
              <span className="text-slate-500 dark:text-slate-400">Society Green Rebate:</span>
              <span className="font-bold text-emerald-600 dark:text-emerald-400 font-mono">
                -₹150.00 Applied
              </span>
            </div>

            {/* QR Verification Seal */}
            <div className="mt-2 pt-3 border-t border-dashed border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-[11px] text-slate-500">
              <div className="flex items-center gap-2">
                <QrCode size={36} className="text-slate-800 dark:text-slate-200" />
                <span>Digitally signed by Association Treasurer</span>
              </div>
              <ShieldCheck size={20} className="text-emerald-500" />
            </div>
          </div>
        </div>

        {/* Action Shortcuts */}
        <div className="grid grid-cols-2 gap-2 text-xs">
          <button
            type="button"
            onClick={() => showToast('✓ Downloading official GST Tax Invoice PDF...')}
            className="h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-obsidian-750"
          >
            <Download size={14} />
            <span>Download PDF</span>
          </button>
          <button
            type="button"
            onClick={() => showToast('✓ Receipt link copied & prepared for WhatsApp share')}
            className="h-11 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-800 dark:text-slate-200 font-bold flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-obsidian-750"
          >
            <Share2 size={14} />
            <span>Share Receipt</span>
          </button>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={onReturnToHub}
          icon={ArrowRight}
          iconPosition="right"
          size="lg"
        >
          Return to Payments Hub
        </Button>
      </div>
    </div>
  );
};
