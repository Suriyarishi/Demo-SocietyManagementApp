import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  XCircle,
  AlertTriangle,
  Building,
  Volume2,
  VolumeX,
  Radio,
  CheckCircle2
} from 'lucide-react';
import { EmergencyType } from './EmergencyHubScreen';
import { Button } from '../../components/UIComponents';

interface ActiveSosCountdownScreenProps {
  emergencyType: EmergencyType;
  isSilent: boolean;
  onCancel: () => void;
  onCountdownComplete: () => void;
}

export const ActiveSosCountdownScreen: React.FC<ActiveSosCountdownScreenProps> = ({
  emergencyType,
  isSilent,
  onCancel,
  onCountdownComplete,
}) => {
  const [countdown, setCountdown] = useState<number>(3);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          onCountdownComplete();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [onCountdownComplete]);

  const typeLabels: Record<EmergencyType, { title: string; subtitle: string }> = {
    medical: { title: 'MEDICAL EMERGENCY', subtitle: 'Dispatched paramedic & first-aid kit' },
    fire: { title: 'FIRE & GAS LEAK', subtitle: 'Hydrant team & emergency evacuation' },
    lift: { title: 'LIFT STUCK 24/7', subtitle: 'Otis elevator emergency rescue unit' },
    intruder: { title: 'SECURITY INTRUDER', subtitle: 'Armed gate patrol squad' },
    animal: { title: 'WILDLIFE / ANIMAL', subtitle: 'Snake & wildlife rescue specialist' },
  };

  const currentInfo = typeLabels[emergencyType] || typeLabels.medical;

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-5 pb-20 bg-gradient-to-b from-[#180509] via-obsidian-950 to-black text-white text-left animate-in fade-in duration-200 relative overflow-hidden">
      {/* Background Pulsating Emergency Radar */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-crimson-600/20 rounded-full blur-3xl pointer-events-none" />

      {/* Top Header */}
      <div className="flex items-center justify-between z-10">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-crimson-500 animate-ping" />
          <span className="text-xs font-mono font-bold tracking-widest text-crimson-400 uppercase">
            SOS COUNTDOWN ACTIVE
          </span>
        </div>

        <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-crimson-950/80 border border-crimson-800 text-[10px] font-bold text-crimson-300">
          {isSilent ? <VolumeX size={12} /> : <Volume2 size={12} className="animate-bounce" />}
          <span>{isSilent ? 'Silent Mode' : 'Audible Siren'}</span>
        </div>
      </div>

      {/* Central Countdown Circle */}
      <div className="flex flex-col items-center justify-center text-center my-auto z-10 gap-4">
        <div className="relative flex items-center justify-center">
          {/* Outer Pulsating Rings */}
          <div className="w-44 h-44 rounded-full border-2 border-crimson-500/30 animate-ping absolute pointer-events-none" />
          <div className="w-36 h-36 rounded-full border border-crimson-500/50 absolute" />

          {/* Central Circular Badge */}
          <div className="w-28 h-28 rounded-full bg-gradient-to-br from-crimson-600 to-rose-700 text-white flex flex-col items-center justify-center shadow-2xl shadow-crimson-600/50 border-2 border-white/30">
            <span className="text-4xl font-black font-mono tracking-tighter leading-none">
              {countdown}
            </span>
            <span className="text-[9px] font-bold uppercase tracking-wider text-white/80 mt-1">
              SECONDS
            </span>
          </div>
        </div>

        <div>
          <span className="text-[11px] font-extrabold uppercase tracking-widest text-crimson-400 block font-mono">
            {currentInfo.title}
          </span>
          <h2 className="text-xl font-extrabold text-white mt-1">
            Dispatching Guards in {countdown}s...
          </h2>
          <p className="text-xs text-slate-300 max-w-[260px] mx-auto mt-1">
            {currentInfo.subtitle}
          </p>
        </div>

        {/* Dispatch Location Card */}
        <div className="w-full max-w-[320px] p-3.5 rounded-2xl bg-white/5 border border-white/10 text-left text-xs flex flex-col gap-1.5 backdrop-blur-md">
          <div className="flex justify-between text-slate-400 text-[11px]">
            <span>LOCATION:</span>
            <span className="text-white font-bold">Tower 2 • Flat 1204</span>
          </div>
          <div className="flex justify-between text-slate-400 text-[11px]">
            <span>COMMUNITY:</span>
            <span className="text-white font-bold">Prestige Lakeside Habitat</span>
          </div>
          <div className="flex justify-between text-slate-400 text-[11px]">
            <span>SIREN RECEPTORS:</span>
            <span className="text-emerald-400 font-mono font-bold">Gate 1 & Gate 2 Cabin</span>
          </div>
        </div>
      </div>

      {/* Abort Button at Bottom */}
      <div className="z-10 flex flex-col gap-2">
        <button
          type="button"
          onClick={onCancel}
          className="w-full h-14 rounded-2xl bg-slate-800 hover:bg-slate-700 active:bg-slate-900 text-white font-bold text-xs flex items-center justify-center gap-2 border border-slate-700 transition-colors press-scale"
        >
          <XCircle size={18} className="text-slate-400" />
          <span>CANCEL FALSE ALARM (ABORT)</span>
        </button>
        <span className="text-[10px] text-slate-500 text-center font-medium">
          Tap anywhere above to immediately cancel dispatch
        </span>
      </div>
    </div>
  );
};
