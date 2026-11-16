import React, { useState, useEffect, useRef } from 'react';
import { ArrowLeft, RotateCw, MessageSquare, CheckCircle, AlertTriangle, ShieldCheck } from 'lucide-react';
import { Button, StepProgress } from '../../components/UIComponents';

interface OtpVerificationScreenProps {
  phoneNumber: string;
  onVerified: () => void;
  onBack: () => void;
}

export const OtpVerificationScreen: React.FC<OtpVerificationScreenProps> = ({
  phoneNumber,
  onVerified,
  onBack,
}) => {
  const [otp, setOtp] = useState<string[]>(['', '', '', '', '', '']);
  const [timer, setTimer] = useState<number>(28);
  const [canResend, setCanResend] = useState<boolean>(false);
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [infoBanner, setInfoBanner] = useState<string>('');

  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => setTimer((prev) => prev - 1), 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  // Handle digit input
  const handleChange = (index: number, val: string) => {
    const char = val.replace(/\D/g, '').slice(-1);
    const newOtp = [...otp];
    newOtp[index] = char;
    setOtp(newOtp);
    if (errorMsg) setErrorMsg('');

    // Advance to next box if char entered
    if (char && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto verify if all 6 filled
    if (char && index === 5 && newOtp.every((d) => d !== '')) {
      triggerVerification(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length > 0) {
      const newOtp = [...otp];
      for (let i = 0; i < pasted.length; i++) {
        newOtp[i] = pasted[i];
      }
      setOtp(newOtp);
      if (pasted.length === 6) {
        triggerVerification(pasted);
      } else {
        inputRefs.current[Math.min(pasted.length, 5)]?.focus();
      }
    }
  };

  const triggerVerification = (code: string) => {
    setIsVerifying(true);
    setErrorMsg('');

    // Simulate verification check (Sample code accepted: any 6 digits or '123456')
    setTimeout(() => {
      setIsVerifying(false);
      if (code === '000000') {
        setErrorMsg('Invalid passcode. 2 attempts remaining.');
      } else {
        setIsSuccess(true);
        setTimeout(() => {
          onVerified();
        }, 600);
      }
    }, 650);
  };

  const handleResend = (channel: 'sms' | 'whatsapp') => {
    setTimer(30);
    setCanResend(false);
    setErrorMsg('');
    setInfoBanner(`Fresh verification code dispatched via ${channel.toUpperCase()} to ${formattedPhone}`);
    setTimeout(() => setInfoBanner(''), 3500);
  };

  const formattedPhone = phoneNumber
    ? `+91 ${phoneNumber.slice(0, 5)} ${phoneNumber.slice(5)}`
    : '+91 98765 43210';

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300 relative">
      {infoBanner && (
        <div className="absolute top-2 left-4 right-4 z-50 p-2.5 rounded-xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={14} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{infoBanner}</span>
        </div>
      )}
      {/* Top Header & Step Bar */}
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <div className="w-48">
            <StepProgress currentStep={1} totalSteps={4} stepLabels={['Verification', 'Society', 'Unit', 'Role']} />
          </div>
        </div>

        {/* Title & Phone Callout */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 border border-cobalt-200 dark:border-cobalt-800/40 uppercase tracking-wider">
              Identity Verification
            </span>
            <button
              type="button"
              onClick={() => {
                const testOtp = ['1', '2', '3', '4', '5', '6'];
                setOtp(testOtp);
                triggerVerification('123456');
              }}
              className="text-[11px] font-mono font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline bg-cobalt-50 dark:bg-cobalt-950/60 px-2 py-0.5 rounded-lg border border-cobalt-200/60 dark:border-cobalt-800/40"
            >
              Auto-fill 123456
            </button>
          </div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Enter 6-digit code
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1.5 flex items-center gap-1.5 flex-wrap">
            <span>Sent to</span>
            <span className="font-semibold text-slate-800 dark:text-slate-200 font-mono">{formattedPhone}</span>
            <button
              type="button"
              onClick={onBack}
              className="text-cobalt-600 dark:text-cobalt-400 font-semibold hover:underline ml-1"
            >
              (Edit)
            </button>
          </p>
        </div>

        {/* 6-Digit OTP Inputs */}
        <div className="mt-2 flex flex-col gap-4">
          <div className="flex items-center justify-between gap-1.5 sm:gap-2" onPaste={handlePaste}>
            {otp.map((digit, idx) => (
              <input
                key={idx}
                ref={(el) => (inputRefs.current[idx] = el)}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(idx, e.target.value)}
                onKeyDown={(e) => handleKeyDown(idx, e)}
                disabled={isVerifying || isSuccess}
                className={`
                  w-11 h-13 sm:w-12 sm:h-15 text-center text-xl font-bold font-mono rounded-2xl border transition-all duration-150 outline-none shadow-2xs
                  ${digit ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/30 dark:bg-cobalt-950/40 text-slate-900 dark:text-white' : 'border-slate-300 dark:border-obsidian-700 bg-slate-50/70 dark:bg-obsidian-900 text-slate-900 dark:text-white'}
                  ${errorMsg ? 'border-crimson-500 bg-crimson-50/30 dark:bg-crimson-950/20' : ''}
                  focus:border-cobalt-600 dark:focus:border-cobalt-500 focus:ring-4 focus:ring-cobalt-500/15
                `}
                autoFocus={idx === 0}
              />
            ))}
          </div>

          {/* Error Feedback */}
          {errorMsg && (
            <div className="p-3 rounded-xl bg-crimson-50 dark:bg-crimson-950/40 border border-crimson-200 dark:border-crimson-800/40 flex items-center gap-2 text-xs text-crimson-700 dark:text-crimson-400 font-medium">
              <AlertTriangle size={15} />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Success Feedback */}
          {isSuccess && (
            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800/40 flex items-center gap-2 text-xs text-emerald-700 dark:text-emerald-400 font-semibold animate-in zoom-in-95">
              <CheckCircle size={15} />
              <span>Passcode verified. Connecting to society registry...</span>
            </div>
          )}

          {/* Resend Channels & Timer */}
          <div className="mt-3 p-4 rounded-xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs">
              <span className="text-slate-500 dark:text-slate-400">Didn't receive the passcode?</span>
              {!canResend ? (
                <span className="font-mono font-semibold text-slate-700 dark:text-slate-300">
                  Resend in 00:{timer < 10 ? `0${timer}` : timer}
                </span>
              ) : (
                <span className="font-semibold text-emerald-600 dark:text-emerald-400">Ready to resend</span>
              )}
            </div>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-200/60 dark:border-obsidian-800">
              <button
                type="button"
                disabled={!canResend}
                onClick={() => handleResend('sms')}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white dark:bg-obsidian-850 hover:bg-slate-50 dark:hover:bg-obsidian-800 text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-obsidian-700"
              >
                <RotateCw size={13} />
                <span>Resend SMS</span>
              </button>
              <button
                type="button"
                disabled={!canResend}
                onClick={() => handleResend('whatsapp')}
                className="flex-1 py-2 px-3 rounded-lg text-xs font-semibold flex items-center justify-center gap-1.5 transition-colors disabled:opacity-40 disabled:cursor-not-allowed bg-white dark:bg-obsidian-850 hover:bg-slate-50 dark:hover:bg-obsidian-800 text-emerald-600 dark:text-emerald-400 border border-slate-200 dark:border-obsidian-700"
              >
                <MessageSquare size={13} />
                <span>Via WhatsApp</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="pt-6">
        <Button
          onClick={() => triggerVerification(otp.join(''))}
          isLoading={isVerifying}
          disabled={otp.some((d) => d === '') || isSuccess}
          size="lg"
        >
          {isSuccess ? 'Verified ✓' : 'Verify & Continue'}
        </Button>
      </div>
    </div>
  );
};
