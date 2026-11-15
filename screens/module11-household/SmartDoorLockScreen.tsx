import React, { useState } from 'react';
import {
  ArrowLeft,
  Lock,
  Unlock,
  Battery,
  Wifi,
  KeyRound,
  CheckCircle2,
  Clock,
  Sparkles,
  Share2,
  ShieldCheck,
  RefreshCw
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';
import { DigitalLock3D } from '../../components/3d/Vector3DElements';

interface SmartDoorLockScreenProps {
  onBack: () => void;
}

export const SmartDoorLockScreen: React.FC<SmartDoorLockScreenProps> = ({ onBack }) => {
  const [isLocked, setIsLocked] = useState<boolean>(true);
  const [guestPin, setGuestPin] = useState<string>('8492');
  const [guestPinActive, setGuestPinActive] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleToggleLock = () => {
    const next = !isLocked;
    setIsLocked(next);
    showToast(next ? '✓ Front Door Deadbolted Securely' : '⚠️ Front Door Unlocked');
  };

  const handleGenerateNewPin = () => {
    const newPin = `${Math.floor(1000 + Math.random() * 9000)}`;
    setGuestPin(newPin);
    setGuestPinActive(true);
    showToast(`New 4-Hour Guest PIN Generated: ${newPin}`);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-20 text-left animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-obsidian-800">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
              title="Back"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                SMART HOME INTEGRATION
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Digital Door Lock
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
            <Wifi size={12} className="text-emerald-500" />
            <span>BLE Synced</span>
          </div>
        </div>

        {/* Lock Hero Card */}
        <div className="p-6 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated flex flex-col items-center text-center relative overflow-hidden">
          <div className="absolute top-3 left-4 flex items-center gap-1 text-[10px] text-slate-400">
            <Battery size={14} className="text-emerald-400 fill-current" />
            <span>94% Battery</span>
          </div>

          <div className="absolute top-3 right-4">
            <Badge variant={isLocked ? 'emerald' : 'amber'} size="sm">
              {isLocked ? 'Deadbolted' : 'Unlocked'}
            </Badge>
          </div>

          {/* 3D Digital Keypad Deadbolt Vector */}
          <div className="my-2 cursor-pointer press-scale" onClick={handleToggleLock} title="Tap to toggle lock">
            <DigitalLock3D size={84} glow={true} />
          </div>

          <button
            type="button"
            onClick={handleToggleLock}
            className={`px-4 py-1.5 rounded-full flex items-center justify-center gap-1.5 transition-all mb-2 press-scale shadow-lg border ${
              isLocked
                ? 'bg-emerald-600/30 text-emerald-300 border-emerald-500/50'
                : 'bg-amber-600/30 text-amber-300 border-amber-500/50'
            }`}
            title="Tap to Lock/Unlock"
          >
            {isLocked ? <Lock size={15} /> : <Unlock size={15} />}
            <span className="text-xs font-bold font-mono uppercase tracking-wider">
              {isLocked ? 'Deadbolt Secured' : 'Unlocked (Tap to Bolt)'}
            </span>
          </button>

          <h3 className="text-base font-extrabold text-white">
            {isLocked ? 'Front Door is Secured' : 'Front Door is Unlocked'}
          </h3>
          <p className="text-xs text-slate-400 mt-0.5">
            Yale Assure Deadbolt 2026 • Tower 2 - Flat 1204
          </p>
        </div>

        {/* Temporary Guest PIN Generator */}
        <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <KeyRound size={16} className="text-cobalt-600" />
              <span className="font-extrabold text-xs text-slate-900 dark:text-white">
                Temporary 4-Hour Guest PIN
              </span>
            </div>

            <button
              type="button"
              onClick={handleGenerateNewPin}
              className="text-[11px] font-bold text-cobalt-600 hover:underline flex items-center gap-1"
            >
              <RefreshCw size={11} />
              <span>Regenerate</span>
            </button>
          </div>

          {guestPinActive && (
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  PASSCODE (EXPIRES IN 03:45h)
                </span>
                <span className="text-xl font-black font-mono tracking-widest text-slate-900 dark:text-white">
                  {guestPin}
                </span>
              </div>

              <button
                type="button"
                onClick={() => showToast(`Guest PIN ${guestPin} copied for WhatsApp!`)}
                className="h-9 px-3 rounded-xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs flex items-center gap-1.5 transition-colors press-scale"
              >
                <Share2 size={13} />
                <span>Share</span>
              </button>
            </div>
          )}

          <p className="text-[11px] text-slate-500 leading-snug">
            Ideal for daily maids, deep cleaners or guests. Pin automatically deactivates after 4 hours.
          </p>
        </div>

        {/* Recent Lock Activity Logs */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Door Lock Audit Logs
          </span>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex flex-col gap-2.5 text-xs text-slate-700 dark:text-slate-300">
            <div className="flex items-center justify-between">
              <span>✓ Unlocked via Optical Fingerprint (Suriya K)</span>
              <span className="font-mono text-slate-400 text-[10px]">Today 08:14 AM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>✓ Auto-Deadbolted (Door closed sensor)</span>
              <span className="font-mono text-slate-400 text-[10px]">Yesterday 6:30 PM</span>
            </div>
            <div className="flex items-center justify-between">
              <span>✓ Unlocked via Guest PIN (Sunita Devi - Maid)</span>
              <span className="font-mono text-slate-400 text-[10px]">Yesterday 09:02 AM</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
