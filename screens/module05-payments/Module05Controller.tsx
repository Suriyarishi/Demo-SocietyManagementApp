import React, { useState } from 'react';
import { FinancialHubScreen } from './FinancialHubScreen';
import { ItemizedBillScreen } from './ItemizedBillScreen';
import { CheckoutGatewayScreen } from './CheckoutGatewayScreen';
import { PaymentReceiptScreen } from './PaymentReceiptScreen';
import { SmartMeterScreen } from './SmartMeterScreen';
import { AccountLedgerScreen } from './AccountLedgerScreen';

export const MODULE05_SCREENS = [
  { id: 'SCR_PAY_01', name: 'Financials Hub & Dues', step: 1 },
  { id: 'SCR_PAY_02', name: 'Itemized Bill & Tax Invoice', step: 2 },
  { id: 'SCR_PAY_03', name: '0% UPI Payment Checkout', step: 3 },
  { id: 'SCR_PAY_04', name: 'Audit Payment Receipt', step: 4 },
  { id: 'SCR_PAY_05', name: 'Smart Prepaid EB Meter', step: 5 },
  { id: 'SCR_PAY_06', name: 'Statement Account Ledger', step: 6 },
];

interface Module05ControllerProps {
  currentScreenId: string;
  onScreenChange: (screenId: string) => void;
  onNavigateHome?: () => void;
}

export const Module05Controller: React.FC<Module05ControllerProps> = ({
  currentScreenId,
  onScreenChange,
  onNavigateHome,
}) => {
  const [payAmount, setPayAmount] = useState<number>(4165.0);
  const [receiptData, setReceiptData] = useState<any>({
    amount: 4165.0,
    txnId: 'TXN9402910',
    timestamp: '09:42 AM',
    date: '26 Nov 2026',
    method: 'PHONEPE',
    flat: 'Tower 2 - Flat 1204',
    society: 'Prestige Lakeside Habitat Association',
  });
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handlePayNow = (amount: number) => {
    setPayAmount(amount);
    onScreenChange('SCR_PAY_03');
  };

  const handleProceedToPay = (amount: number) => {
    setPayAmount(amount);
    onScreenChange('SCR_PAY_03');
  };

  const handlePaymentSuccess = (receipt: any) => {
    setReceiptData(receipt);
    onScreenChange('SCR_PAY_04');
  };

  const handleRechargeEB = (amount: number) => {
    showToast(`Smart EB Meter credited with +₹${amount.toLocaleString()}!`);
    onScreenChange('SCR_PAY_01');
  };

  return (
    <div className="w-full h-full relative">
      {/* Toast Notification (Anchored inside phone frame) */}
      {toastMessage && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[11px] leading-tight">{toastMessage}</span>
        </div>
      )}

      {/* Screen 1: Financials Hub */}
      {currentScreenId === 'SCR_PAY_01' && (
        <FinancialHubScreen
          onPayNow={handlePayNow}
          onViewItemizedBill={() => onScreenChange('SCR_PAY_02')}
          onOpenSmartMeter={() => onScreenChange('SCR_PAY_05')}
          onOpenLedger={() => onScreenChange('SCR_PAY_06')}
          onQuickRechargeEB={handleRechargeEB}
        />
      )}

      {/* Screen 2: Itemized Bill Breakdown */}
      {currentScreenId === 'SCR_PAY_02' && (
        <ItemizedBillScreen
          onBack={() => onScreenChange('SCR_PAY_01')}
          onProceedToPay={handleProceedToPay}
        />
      )}

      {/* Screen 3: Checkout Gateway */}
      {currentScreenId === 'SCR_PAY_03' && (
        <CheckoutGatewayScreen
          amount={payAmount}
          onBack={() => onScreenChange('SCR_PAY_01')}
          onPaymentSuccess={handlePaymentSuccess}
        />
      )}

      {/* Screen 4: Payment Receipt */}
      {currentScreenId === 'SCR_PAY_04' && (
        <PaymentReceiptScreen
          receiptData={receiptData}
          onReturnToHub={() => onScreenChange('SCR_PAY_01')}
        />
      )}

      {/* Screen 5: Smart EB Meter */}
      {currentScreenId === 'SCR_PAY_05' && (
        <SmartMeterScreen
          onBack={() => onScreenChange('SCR_PAY_01')}
          onRecharge={handleRechargeEB}
        />
      )}

      {/* Screen 6: Account Ledger */}
      {currentScreenId === 'SCR_PAY_06' && (
        <AccountLedgerScreen
          onBack={() => onScreenChange('SCR_PAY_01')}
        />
      )}
    </div>
  );
};
