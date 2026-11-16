import React, { useState } from 'react';
import {
  ArrowLeft,
  Download,
  Calendar,
  Receipt,
  CheckCircle2,
  Zap,
  CreditCard,
  Building,
  Filter
} from 'lucide-react';
import { Button } from '../../components/UIComponents';

interface LedgerItem {
  id: string;
  type: 'maintenance' | 'smart_eb' | 'rebate';
  title: string;
  date: string;
  amount: number;
  status: 'paid' | 'credit';
  receiptNo: string;
}

const LEDGER_HISTORY: LedgerItem[] = [
  {
    id: 'led_01',
    type: 'maintenance',
    title: 'November 2026 Maintenance',
    date: '26 Nov 2026',
    amount: 4165.0,
    status: 'paid',
    receiptNo: 'HNT-2026-11-1204',
  },
  {
    id: 'led_02',
    type: 'smart_eb',
    title: 'Smart EB Meter Top-Up',
    date: '15 Nov 2026',
    amount: 1000.0,
    status: 'paid',
    receiptNo: 'EB-9402194',
  },
  {
    id: 'led_03',
    type: 'maintenance',
    title: 'October 2026 Maintenance',
    date: '28 Oct 2026',
    amount: 4250.0,
    status: 'paid',
    receiptNo: 'HNT-2026-10-1204',
  },
  {
    id: 'led_04',
    type: 'smart_eb',
    title: 'Smart EB Meter Top-Up',
    date: '10 Oct 2026',
    amount: 1000.0,
    status: 'paid',
    receiptNo: 'EB-9102831',
  },
  {
    id: 'led_05',
    type: 'maintenance',
    title: 'September 2026 Maintenance',
    date: '29 Sep 2026',
    amount: 4250.0,
    status: 'paid',
    receiptNo: 'HNT-2026-09-1204',
  },
];

interface AccountLedgerScreenProps {
  onBack: () => void;
}

export const AccountLedgerScreen: React.FC<AccountLedgerScreenProps> = ({ onBack }) => {
  const [filterType, setFilterType] = useState<string>('all');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const filtered = LEDGER_HISTORY.filter((item) => {
    if (filterType === 'all') return true;
    if (filterType === 'maintenance') return item.type === 'maintenance';
    if (filterType === 'smart_eb') return item.type === 'smart_eb';
    return true;
  });

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
            Statement of Accounts
          </span>
          <button
            type="button"
            onClick={() => showToast('✓ Downloading official FY 2026-27 ledger statement...')}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
            title="Download PDF"
          >
            <Download size={16} />
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Account Ledger
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Complete financial history for Tower 2 - Flat 1204 (FY 2026–27).
          </p>
        </div>

        {/* Summary Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 text-white border border-obsidian-800 shadow-elevated">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-widest">
              Financial Status
            </span>
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 uppercase">
              Zero Outstanding Due
            </span>
          </div>

          <div className="mt-3 grid grid-cols-2 gap-3 pt-3 border-t border-white/10 text-xs text-slate-300">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Total Paid this Year</span>
              <span className="text-xl font-bold text-white font-mono">₹48,250</span>
            </div>
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Current Balance</span>
              <span className="text-xl font-bold text-emerald-400 font-mono">₹0.00</span>
            </div>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {[
            { id: 'all', label: 'All Transactions' },
            { id: 'maintenance', label: 'Society Maintenance' },
            { id: 'smart_eb', label: 'Smart EB Recharges' },
          ].map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFilterType(f.id)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                filterType === f.id
                  ? 'bg-cobalt-600 text-white shadow-sm'
                  : 'bg-slate-100 dark:bg-obsidian-900 text-slate-600 dark:text-slate-400 hover:bg-slate-200'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        {/* Ledger Transaction Stream */}
        <div className="flex flex-col gap-2.5 max-h-[380px] overflow-y-auto no-scrollbar pr-0.5">
          {filtered.map((item) => (
            <div
              key={item.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                  item.type === 'smart_eb'
                    ? 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                    : 'bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-950/60 dark:text-cobalt-400'
                }`}>
                  {item.type === 'smart_eb' ? <Zap size={18} /> : <Receipt size={18} />}
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    {item.title}
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono mt-0.5">
                    {item.date} • #{item.receiptNo}
                  </p>
                </div>
              </div>

              <div className="text-right">
                <span className="text-sm font-extrabold font-mono text-slate-900 dark:text-white block">
                  ₹{item.amount.toLocaleString()}
                </span>
                <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase">
                  Cleared ✓
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={() => showToast('✓ Exporting full audited statement for FY 2026-27...')}
          icon={Download}
          iconPosition="left"
          size="lg"
        >
          Export FY 2026–27 Statement (PDF)
        </Button>
      </div>
    </div>
  );
};
