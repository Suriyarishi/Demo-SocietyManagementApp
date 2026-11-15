import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Plus,
  CheckCircle2,
  Clock,
  Download,
  AlertCircle
} from 'lucide-react';
import { Button, Input, Select } from '../../components/UIComponents';

interface StaffSalaryLedgerScreenProps {
  onBack: () => void;
}

export const StaffSalaryLedgerScreen: React.FC<StaffSalaryLedgerScreenProps> = ({ onBack }) => {
  const [selectedMonth, setSelectedMonth] = useState<string>('November 2026');
  const [showAdvanceModal, setShowAdvanceModal] = useState<boolean>(false);
  const [advanceAmount, setAdvanceAmount] = useState<string>('1000');
  const [targetStaff, setTargetStaff] = useState<string>('Lakshmi R (Cook)');

  const staffLedgers = [
    {
      name: 'Lakshmi R',
      role: 'Cook',
      baseSalary: 6500,
      daysPresent: 24,
      totalDays: 26,
      advanceTaken: 1000,
      netPayable: 5500,
      status: 'pending',
    },
    {
      name: 'Ramesh Kumar',
      role: 'Driver',
      baseSalary: 18000,
      daysPresent: 25,
      totalDays: 26,
      advanceTaken: 0,
      netPayable: 18000,
      status: 'pending',
    },
    {
      name: 'Anita M',
      role: 'Cleaner',
      baseSalary: 4000,
      daysPresent: 22,
      totalDays: 26,
      advanceTaken: 500,
      netPayable: 3500,
      status: 'pending',
    },
  ];

  const totalMonthlyDue = staffLedgers.reduce((acc, s) => acc + s.netPayable, 0);

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
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Financial Governance
          </span>
          <button
            type="button"
            onClick={() => setShowAdvanceModal(true)}
            className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline"
          >
            + Advance
          </button>
        </div>

        {/* Title & Month Selector */}
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
              Staff Salary Ledger
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
              Transparent monthly calculation based on turnstile attendance.
            </p>
          </div>

          <div className="px-3 py-1.5 rounded-xl bg-slate-100 dark:bg-obsidian-900 text-xs font-bold text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-800">
            {selectedMonth}
          </div>
        </div>

        {/* Total Salary Summary Box */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-obsidian-900 to-obsidian-950 text-white border border-obsidian-800 shadow-elevated">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-cobalt-400 uppercase tracking-widest">
              Total Household Staff Due
            </span>
            <span className="text-[11px] font-mono text-emerald-400 font-bold">
              Due on Dec 1st
            </span>
          </div>

          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white">
              ₹{totalMonthlyDue.toLocaleString()}
            </span>
            <span className="text-xs text-slate-500 dark:text-slate-400">for 3 staff members</span>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 flex items-center justify-between text-xs text-slate-300">
            <span>Combined Turnstile Days: <strong className="text-white">71 Days</strong></span>
            <span>Advance Deductions: <strong className="text-amber-400 font-mono">₹1,500</strong></span>
          </div>
        </div>

        {/* Staff Breakdown List */}
        <div className="flex flex-col gap-3 max-h-[360px] overflow-y-auto no-scrollbar">
          {staffLedgers.map((item) => (
            <div
              key={item.name}
              className="p-4 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-2.5"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {item.name}
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                    {item.role} • {item.daysPresent} of {item.totalDays} days worked
                  </p>
                </div>
                <div className="text-right">
                  <span className="text-base font-extrabold font-mono text-slate-900 dark:text-white block">
                    ₹{item.netPayable.toLocaleString()}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 block">Net Payable</span>
                </div>
              </div>

              <div className="pt-2 border-t border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-[11px] text-slate-500">
                <span>Base: ₹{item.baseSalary}</span>
                {item.advanceTaken > 0 ? (
                  <span className="font-semibold text-amber-600 dark:text-amber-400 font-mono">
                    -₹{item.advanceTaken} Advance
                  </span>
                ) : (
                  <span className="text-slate-500 dark:text-slate-400">Zero Advance</span>
                )}
                <button
                  type="button"
                  onClick={() => alert(`Initiating direct zero-markup UPI transfer of ₹${item.netPayable} to ${item.name}`)}
                  className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline"
                >
                  Pay via UPI
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Advance Modal Sheet (Anchored strictly inside phone frame) */}
      {showAdvanceModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col gap-4">
            <h3 className="text-base font-bold">Record Advance Salary Note</h3>
            <p className="text-xs text-slate-500 dark:text-slate-400">
              Advance payments are automatically deducted from the month-end net payable ledger.
            </p>

            <Select
              label="Select Domestic Staff Member"
              value={targetStaff}
              onChange={(e) => setTargetStaff(e.target.value)}
            >
              <option value="Lakshmi R (Cook)">Lakshmi R (Cook)</option>
              <option value="Ramesh Kumar (Driver)">Ramesh Kumar (Driver)</option>
              <option value="Anita M (Cleaner)">Anita M (Cleaner)</option>
            </Select>

            <Input
              label="Advance Amount (₹)"
              type="number"
              value={advanceAmount}
              onChange={(e) => setAdvanceAmount(e.target.value)}
              prefixElement={<CreditCard size={18} />}
            />

            <div className="flex gap-2 pt-2">
              <button
                type="button"
                onClick={() => setShowAdvanceModal(false)}
                className="flex-1 h-11 rounded-xl bg-slate-800 text-xs font-bold text-slate-300"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert(`Advance of ₹${advanceAmount} recorded for ${targetStaff}`);
                  setShowAdvanceModal(false);
                }}
                className="flex-1 h-11 rounded-xl bg-cobalt-600 hover:bg-cobalt-500 text-xs font-bold text-white"
              >
                Save Record
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Bottom Export CTA */}
      <div className="pt-6">
        <Button
          onClick={() => alert('Exporting monthly audit PDF receipt for November 2026...')}
          icon={Download}
          iconPosition="left"
          size="lg"
        >
          Export Salary Statement (PDF)
        </Button>
      </div>
    </div>
  );
};
