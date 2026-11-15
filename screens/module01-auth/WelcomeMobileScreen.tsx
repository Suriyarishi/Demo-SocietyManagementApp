import React, { useState } from 'react';
import { Shield, Lock, CheckCircle2, ChevronRight, Phone, Info, ArrowLeft } from 'lucide-react';
import { Button, Input, Badge } from '../../components/UIComponents';

interface WelcomeMobileScreenProps {
  onContinue: (phone: string) => void;
  onBack?: () => void;
  initialPhone?: string;
}

export const WelcomeMobileScreen: React.FC<WelcomeMobileScreenProps> = ({
  onContinue,
  onBack,
  initialPhone = '',
}) => {
  const [phoneNumber, setPhoneNumber] = useState<string>(initialPhone);
  const [agreedToTerms, setAgreedToTerms] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorText, setErrorText] = useState<string>('');

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/\D/g, '').slice(0, 10);
    setPhoneNumber(rawVal);
    if (errorText) setErrorText('');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.length !== 10) {
      setErrorText('Please enter a valid 10-digit mobile number');
      return;
    }
    if (!agreedToTerms) {
      setErrorText('Please accept terms & society perimeter privacy policy');
      return;
    }

    setIsLoading(true);
    // Simulate secure network handoff
    setTimeout(() => {
      setIsLoading(false);
      onContinue(phoneNumber);
    }, 700);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300">
      {/* Top Brand & Status Section */}
      <div className="flex flex-col gap-6">
        {/* Brand Header */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2.5">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale mr-1"
                title="Back"
              >
                <ArrowLeft size={18} strokeWidth={2.4} />
              </button>
            )}
            <div className="w-10 h-10 rounded-2xl bg-cobalt-600 dark:bg-cobalt-600 flex items-center justify-center text-white shadow-md shadow-cobalt-600/30">
              <Shield size={22} strokeWidth={2.4} />
            </div>
            <div>
              <h1 className="text-base font-extrabold tracking-tight text-slate-900 dark:text-white leading-none">
                HUNT LOCKDOOR
              </h1>
              <p className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 tracking-wider uppercase mt-1">
                Residential Security OS
              </p>
            </div>
          </div>
          <Badge variant="emerald" icon={CheckCircle2} size="sm">
            2026 Ready
          </Badge>
        </div>

        {/* Hero Value Prop Banner */}
        <div className="mt-2 p-5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient">
          <div className="w-9 h-9 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center mb-3">
            <Lock size={18} strokeWidth={2.2} />
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight leading-snug">
            High-trust residential gate access & community living.
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
            Zero advertising clutter. Instant gate clearance, verified daily staff check-ins, and accountable society management.
          </p>

          <div className="mt-4 pt-4 border-t border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
              Sub-second gate alerts
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-cobalt-500" />
              AES-256 encrypted
            </span>
          </div>
        </div>

        {/* Mobile Input Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 mt-2">
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
                Resident Mobile Number
              </label>
              <button
                type="button"
                onClick={() => setPhoneNumber('9876543210')}
                className="text-[11px] font-mono font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline bg-cobalt-50 dark:bg-cobalt-950/60 px-2 py-0.5 rounded-lg border border-cobalt-200/60 dark:border-cobalt-800/40"
              >
                Auto-fill Demo
              </button>
            </div>
            <div className={`
              relative flex items-center h-[54px] rounded-2xl border transition-all duration-150 shadow-sm
              ${errorText 
                ? 'border-crimson-500 focus-within:ring-4 focus-within:ring-crimson-500/15 bg-crimson-50/30 dark:bg-crimson-950/20' 
                : 'border-slate-200/90 dark:border-obsidian-750 bg-slate-50/80 dark:bg-obsidian-900/90 hover:bg-slate-100/60 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15'}
            `}>
              {/* Country Code Pill */}
              <div className="pl-4 pr-3 flex items-center gap-1.5 border-r border-slate-200 dark:border-obsidian-800 text-slate-700 dark:text-slate-200 font-bold text-sm select-none">
                <span className="text-base">🇮🇳</span>
                <span>+91</span>
              </div>
              <input
                type="tel"
                value={phoneNumber}
                onChange={handlePhoneChange}
                placeholder="98765 43210"
                className="w-full h-full px-4 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-base font-mono font-bold outline-none tracking-wider"
                autoFocus
              />
              {phoneNumber.length > 0 && (
                <button
                  type="button"
                  onClick={() => setPhoneNumber('')}
                  className="mr-3.5 px-2 py-1 rounded-md text-xs font-bold text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200/60 dark:bg-obsidian-800"
                >
                  Clear
                </button>
              )}
            </div>
            {errorText ? (
              <span className="text-xs font-semibold text-crimson-600 dark:text-crimson-500 mt-1 flex items-center gap-1">
                <Info size={13} />
                {errorText}
              </span>
            ) : (
              <span className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                We will send an encrypted 6-digit one-time passcode.
              </span>
            )}
          </div>

          {/* Privacy & Society Policy Consent */}
          <div className="flex items-start gap-3 mt-1 p-3.5 rounded-2xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800">
            <input
              type="checkbox"
              id="terms"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="mt-0.5 w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 border-slate-300 dark:border-obsidian-700 dark:bg-obsidian-950 cursor-pointer"
            />
            <label htmlFor="terms" className="text-[11px] text-slate-600 dark:text-slate-400 leading-normal cursor-pointer">
              I agree to the <span className="font-semibold text-cobalt-600 dark:text-cobalt-400">Hunt Lockdoor Security Terms</span>. Your data is isolated to your society perimeter and is never sold to brokers or advertisers.
            </label>
          </div>
        </form>
      </div>

      {/* Bottom Thumb-Zone CTA */}
      <div className="pt-6 flex flex-col gap-3">
        <Button
          onClick={handleSubmit}
          isLoading={isLoading}
          disabled={phoneNumber.length !== 10}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Get Verification Code
        </Button>

        <div className="flex items-center justify-center gap-1.5 text-xs text-slate-500 dark:text-slate-400">
          <span>Are you a Security Guard or Facility Admin?</span>
          <button
            type="button"
            onClick={() => alert('Society Gate Kiosk & Admin Station portal is separate for perimeter security.')}
            className="font-semibold text-cobalt-600 dark:text-cobalt-400 hover:underline"
          >
            Gate Kiosk
          </button>
        </div>
      </div>
    </div>
  );
};
