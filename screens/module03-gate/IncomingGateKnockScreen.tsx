import React, { useState, useEffect } from 'react';
import {
  ShieldAlert,
  PhoneCall,
  CheckCircle,
  XCircle,
  Package,
  Camera,
  Volume2,
  Clock,
  Building,
  User
} from 'lucide-react';
import { Button } from '../../components/UIComponents';

interface IncomingGateKnockScreenProps {
  onAllow: () => void;
  onDeny: () => void;
  onLeaveAtGate: () => void;
  onCallGuard: () => void;
}

export const IncomingGateKnockScreen: React.FC<IncomingGateKnockScreenProps> = ({
  onAllow,
  onDeny,
  onLeaveAtGate,
  onCallGuard,
}) => {
  const [countdown, setCountdown] = useState<number>(28);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setInterval(() => setCountdown((c) => c - 1), 1000);
      return () => clearInterval(timer);
    } else {
      // Auto-fallback to leave with guard or IVR call
      onLeaveAtGate();
    }
  }, [countdown, onLeaveAtGate]);

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 bg-slate-950 text-white text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-4">
        {/* Urgent Top Bar */}
        <div className="flex items-center justify-between pt-1">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-[11px] font-extrabold tracking-widest uppercase text-emerald-400">
              INCOMING GATE KNOCK
            </span>
          </div>
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-mono font-bold text-amber-300">
            <Clock size={13} />
            <span>00:{countdown < 10 ? `0${countdown}` : countdown}s</span>
          </div>
        </div>

        {/* Gate Camera Live Snapshot Box */}
        <div className="relative rounded-3xl bg-slate-900 border border-white/15 overflow-hidden shadow-2xl">
          {/* Simulated Gate Kiosk Camera View */}
          <div className="w-full h-56 bg-slate-800 relative flex flex-col items-center justify-center overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent z-10" />
            
            {/* Camera Overlay Elements */}
            <div className="absolute top-3 left-3 z-20 flex items-center gap-1.5 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono text-white">
              <Camera size={11} className="text-red-500 animate-pulse" />
              <span>LIVE CAM • GATE 1 KIOSK</span>
            </div>

            <div className="absolute top-3 right-3 z-20 bg-black/60 backdrop-blur-md px-2.5 py-1 rounded-full border border-white/10 text-[10px] font-mono text-slate-300">
              1080p HD
            </div>

            {/* Courier Visual Representation */}
            <div className="flex flex-col items-center gap-2 z-10">
              <div className="w-20 h-20 rounded-full bg-slate-700 border-2 border-white/30 flex items-center justify-center text-white shadow-xl">
                <Package size={36} className="text-cobalt-400" />
              </div>
              <span className="text-xs font-mono font-bold text-white bg-black/50 px-2 py-0.5 rounded-md">
                Verified Courier Uniform
              </span>
            </div>

            {/* Bottom Camera Metadata */}
            <div className="absolute bottom-3 left-3 right-3 z-20 flex items-center justify-between text-[11px] text-slate-300">
              <span>Guard Ratan on station</span>
              <span className="font-mono">Unit: Tower 2 - 1204</span>
            </div>
          </div>

          {/* Visitor Details Inset */}
          <div className="p-4 bg-slate-900 flex flex-col gap-2">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-white">
                  Amazon Delivery (Sandeep M)
                </h3>
                <p className="text-xs text-slate-400">
                  Parcel #AZ-9402 • At Boom Barrier Gate 1
                </p>
              </div>
              <span className="text-xs font-bold px-2 py-1 rounded-lg bg-cobalt-500/20 text-cobalt-300 border border-cobalt-500/30 uppercase">
                Courier
              </span>
            </div>

            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed bg-white/5 p-2 rounded-xl border border-white/5">
              Guard Note: "Delivery agent requesting access to Tower 2 passenger lift."
            </p>
          </div>
        </div>

        {/* Wireless Intercom Audio Trigger */}
        <button
          type="button"
          onClick={onCallGuard}
          className="w-full py-2.5 px-4 rounded-xl bg-white/10 hover:bg-white/15 text-xs font-semibold text-slate-200 border border-white/10 flex items-center justify-center gap-2 transition-colors"
        >
          <PhoneCall size={14} className="text-cobalt-400" />
          <span>Speak with Gate Guard (Wireless Intercom)</span>
        </button>
      </div>

      {/* Decision CTAs (Large 54dp Thumb Accessible Buttons) */}
      <div className="pt-4 flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onDeny}
            className="h-14 rounded-2xl bg-crimson-600 hover:bg-crimson-700 active:bg-crimson-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-crimson-600/30 transition-transform press-scale"
          >
            <XCircle size={18} />
            <span>Deny Entry</span>
          </button>

          <button
            type="button"
            onClick={onAllow}
            className="h-14 rounded-2xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-emerald-600/30 transition-transform press-scale"
          >
            <CheckCircle size={18} />
            <span>Allow Entry</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onLeaveAtGate}
          className="w-full h-12 rounded-xl bg-slate-900 hover:bg-slate-800 text-xs font-bold text-slate-300 border border-white/15 transition-colors"
        >
          Leave with Guard at Security Desk
        </button>
      </div>
    </div>
  );
};
