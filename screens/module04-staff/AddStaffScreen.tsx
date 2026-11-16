import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  ShieldCheck,
  CheckCircle2,
  KeyRound,
  CreditCard,
  Clock,
  ChevronRight
} from 'lucide-react';
import { Button, Input } from '../../components/UIComponents';

interface AddStaffScreenProps {
  onBack: () => void;
  onStaffAdded: (staffData: any) => void;
}

export const AddStaffScreen: React.FC<AddStaffScreenProps> = ({
  onBack,
  onStaffAdded,
}) => {
  const [addMode, setAddMode] = useState<'passcode' | 'manual'>('passcode');
  const [staffPasscode, setStaffPasscode] = useState<string>('STF-4029');
  const [name, setName] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [role, setRole] = useState<string>('Cook');
  const [salary, setSalary] = useState<string>('6500');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const roles = ['Cook', 'Driver', 'Cleaner', 'Nanny', 'Dog Walker'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onStaffAdded({
        name: addMode === 'passcode' ? 'Sunita Devi' : name,
        role: addMode === 'passcode' ? 'Cook' : role,
        passcode: staffPasscode,
        salary: Number(salary),
      });
    }, 600);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-20 text-left animate-in fade-in duration-200">
      <div className="flex flex-col gap-5">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
            title="Back to Staff Hub"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Household Staff Registration
          </span>
          <div className="w-10" />
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Add Staff to Flat 1204
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Link domestic personnel to automatically receive turnstile arrival alerts.
          </p>
        </div>

        {/* Add Mode Selector */}
        <div className="p-1 rounded-2xl bg-slate-200/70 dark:bg-obsidian-850 flex items-center gap-1 border border-slate-200/50 dark:border-obsidian-800 shadow-inner">
          <button
            type="button"
            onClick={() => setAddMode('passcode')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all press-scale ${
              addMode === 'passcode'
                ? 'bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            By Staff Passcode
          </button>
          <button
            type="button"
            onClick={() => setAddMode('manual')}
            className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all press-scale ${
              addMode === 'manual'
                ? 'bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
            }`}
          >
            New Registration
          </button>
        </div>

        {/* Form Body */}
        {addMode === 'passcode' ? (
          <div className="flex flex-col gap-4">
            <div className="p-4 rounded-2xl bg-cobalt-50/70 dark:bg-cobalt-950/30 border border-cobalt-200/80 dark:border-cobalt-800/40 text-xs text-slate-700 dark:text-slate-300">
              <span className="font-bold text-cobalt-600 dark:text-cobalt-400 block mb-1">
                Fast Linking via Security Passcode:
              </span>
              <span>
                Staff already verified in the society have a 6-character Passcode issued by the Security Kiosk.
              </span>
            </div>

            <Input
              label="Staff Passcode (from Guard Kiosk)"
              placeholder="e.g. STF-4029"
              value={staffPasscode}
              onChange={(e) => setStaffPasscode(e.target.value.toUpperCase())}
              prefixElement={<KeyRound size={18} />}
            />

            <div className="p-4 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs shadow-sm">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-bold tracking-wider">Matched Worker</span>
                <span className="font-bold text-slate-900 dark:text-white text-sm">Sunita Devi (Cook)</span>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold block mt-0.5">✓ Police Cleared • 4.8★ Rating</span>
              </div>
              <CheckCircle2 size={22} className="text-emerald-500" />
            </div>

            <Input
              label="Monthly Salary (₹)"
              placeholder="6000"
              value={salary}
              inputMode="numeric"
              onChange={(e) => setSalary(e.target.value.replace(/\D/g, ''))}
              prefixElement={<CreditCard size={18} />}
            />
          </div>
        ) : (
          <div className="flex flex-col gap-4">
            <Input
              label="Staff Full Name"
              placeholder="e.g. Sunita Devi"
              value={name}
              onChange={(e) => setName(e.target.value)}
              prefixElement={<User size={18} />}
            />

            <Input
              label="Mobile Number"
              placeholder="98765 43210"
              value={phone}
              inputMode="tel"
              onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
              prefixElement={<Phone size={18} />}
            />

            <div className="flex flex-col gap-1.5">
              <label className="text-[11px] font-bold text-slate-600 dark:text-slate-300 tracking-wider uppercase">
                Staff Category / Role
              </label>
              <div className="grid grid-cols-3 gap-2">
                {roles.map((r) => (
                  <button
                    key={r}
                    type="button"
                    onClick={() => setRole(r)}
                    className={`py-2.5 px-1 text-center rounded-xl text-xs font-bold transition-all press-scale ${
                      role === r
                        ? 'bg-cobalt-600 text-white shadow-sm ring-2 ring-cobalt-600/30'
                        : 'bg-slate-50 dark:bg-obsidian-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-800 hover:bg-slate-100'
                    }`}
                  >
                    {r}
                  </button>
                ))}
              </div>
            </div>

            <Input
              label="Agreed Monthly Salary (₹)"
              placeholder="6500"
              value={salary}
              inputMode="numeric"
              onChange={(e) => setSalary(e.target.value.replace(/\D/g, ''))}
              prefixElement={<CreditCard size={18} />}
            />
          </div>
        )}

        {/* Security Notice */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-start gap-2.5 text-xs text-slate-600 dark:text-slate-400">
          <ShieldCheck size={16} className="text-emerald-500 shrink-0 mt-0.5" />
          <span>
            Once linked, you will receive real-time notifications whenever this staff member taps into Gate 1 or Gate 2.
          </span>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Link Staff & Activate Access
        </Button>
      </div>
    </div>
  );
};
