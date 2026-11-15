import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldCheck,
  CreditCard,
  Lock,
  CheckCircle2,
  ChevronRight,
  Smartphone
} from 'lucide-react';
import { Button } from '../../components/UIComponents';

interface CheckoutGatewayScreenProps {
  amount: number;
  onBack: () => void;
  onPaymentSuccess: (receiptData: any) => void;
}

export const CheckoutGatewayScreen: React.FC<CheckoutGatewayScreenProps> = ({
  amount,
  onBack,
  onPaymentSuccess,
}) => {
  const [selectedMethod, setSelectedMethod] = useState<string>('phonepe');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);

  const upiApps = [
    { id: 'gpay', name: 'Google Pay', subtitle: 'Fastest UPI app', color: 'bg-blue-50 text-blue-600' },
    { id: 'phonepe', name: 'PhonePe', subtitle: 'Recommended • 1-Tap', color: 'bg-purple-50 text-purple-600' },
    { id: 'paytm', name: 'Paytm UPI', subtitle: 'UPI / Wallet', color: 'bg-sky-50 text-sky-600' },
    { id: 'bhim', name: 'Other UPI ID', subtitle: 'Enter your @upi VPA', color: 'bg-emerald-50 text-emerald-600' },
  ];

  const handlePay = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSuccess({
        amount,
        txnId: `TXN${Date.now().toString().slice(-8)}`,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        date: new Date().toLocaleDateString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }),
        method: selectedMethod.toUpperCase(),
        flat: 'Tower 2 - Flat 1204',
        society: 'Prestige Lakeside Habitat Association',
      });
    }, 1200);
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
          <div className="flex items-center gap-1.5 text-xs font-semibold text-emerald-600 dark:text-emerald-400">
            <Lock size={13} />
            <span>256-Bit SSL Encrypted</span>
          </div>
          <div className="w-8" />
        </div>

        {/* Amount Banner */}
        <div className="p-5 rounded-3xl bg-slate-900 text-white border border-slate-800 shadow-elevated text-center flex flex-col items-center gap-1">
          <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Total Amount to Pay
          </span>
          <span className="text-3xl font-mono font-extrabold text-white">
            ₹{amount.toLocaleString()}
          </span>
          <span className="text-[11px] text-emerald-400 font-semibold mt-1">
            0% Surcharge • Direct Association Bank Deposit
          </span>
        </div>

        {/* UPI Apps Grid */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Recommended: UPI (0% Convenience Fee)
          </label>
          <div className="flex flex-col gap-2">
            {upiApps.map((app) => {
              const isSelected = selectedMethod === app.id;
              return (
                <div
                  key={app.id}
                  onClick={() => setSelectedMethod(app.id)}
                  className={`
                    p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between
                    ${isSelected
                      ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/30 dark:bg-cobalt-950/40 ring-1 ring-cobalt-500/30'
                      : 'border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 hover:border-slate-300'}
                  `}
                >
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center font-bold text-xs text-slate-800 dark:text-slate-200 shrink-0">
                      <Smartphone size={18} className="text-cobalt-500" />
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {app.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {app.subtitle}
                      </p>
                    </div>
                  </div>

                  <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
                    isSelected ? 'border-cobalt-600 bg-cobalt-600 text-white' : 'border-slate-300'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Other Payment Methods */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Other Payment Rails
          </label>
          <div
            onClick={() => setSelectedMethod('card')}
            className={`
              p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between
              ${selectedMethod === 'card'
                ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/30 dark:bg-cobalt-950/40 ring-1 ring-cobalt-500/30'
                : 'border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900'}
            `}
          >
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-600 dark:text-slate-300 shrink-0">
                <CreditCard size={18} />
              </div>
              <div>
                <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  Credit / Debit Card or Netbanking
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  Visa, Mastercard, RuPay, HDFC, ICICI, SBI
                </p>
              </div>
            </div>
            <div className={`w-5 h-5 rounded-full border flex items-center justify-center ${
              selectedMethod === 'card' ? 'border-cobalt-600 bg-cobalt-600 text-white' : 'border-slate-300'
            }`}>
              {selectedMethod === 'card' && <div className="w-2 h-2 rounded-full bg-white" />}
            </div>
          </div>
        </div>
      </div>

      {/* Pay CTA */}
      <div className="pt-6">
        <Button
          onClick={handlePay}
          isLoading={isProcessing}
          icon={ShieldCheck}
          iconPosition="left"
          size="lg"
        >
          {isProcessing ? 'Securing Transaction...' : `Pay ₹${amount.toLocaleString()} Securely`}
        </Button>
      </div>
    </div>
  );
};
