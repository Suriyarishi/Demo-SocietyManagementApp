import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldAlert,
  PhoneCall,
  CheckCircle2,
  Clock,
  Radio,
  MapPin,
  Building,
  UserCheck,
  Ambulance,
  Sparkles,
  Phone
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { EmergencyType } from './EmergencyHubScreen';

interface GuardDispatchLiveScreenProps {
  emergencyType: EmergencyType;
  onResolve: () => void;
  onCallGuard: () => void;
}

export const GuardDispatchLiveScreen: React.FC<GuardDispatchLiveScreenProps> = ({
  emergencyType,
  onResolve,
  onCallGuard,
}) => {
  const [etaSeconds, setEtaSeconds] = useState<number>(38);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
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
        {/* Urgent Header Bar */}
        <div className="p-3.5 rounded-2xl bg-crimson-600 text-white flex items-center justify-between shadow-lg shadow-crimson-600/30">
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-white animate-ping" />
            <div>
              <span className="text-[10px] font-mono font-bold uppercase tracking-wider block text-crimson-100">
                INCIDENT #SOS-2026-9812
              </span>
              <h2 className="text-sm font-extrabold text-white tracking-tight leading-tight">
                Emergency Dispatch Active
              </h2>
            </div>
          </div>

          <span className="font-mono font-bold text-xs bg-black/30 px-2 py-1 rounded-lg">
            LIVE 01:24
          </span>
        </div>

        {/* ETA Countdown Tracker */}
        <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-center justify-between">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
              GUARD INTERVENTION ETA
            </span>
            <div className="flex items-baseline gap-1 mt-0.5">
              <span className="text-3xl font-black font-mono text-crimson-600 dark:text-crimson-400">
                {etaSeconds}s
              </span>
              <span className="text-xs font-bold text-slate-500">estimated arrival</span>
            </div>
          </div>

          <div className="w-12 h-12 rounded-2xl bg-crimson-50 dark:bg-crimson-950/60 border border-crimson-200 dark:border-crimson-800/40 flex items-center justify-center text-crimson-600 dark:text-crimson-400">
            <Clock size={24} className="animate-pulse" />
          </div>
        </div>

        {/* Dispatched Guard Officer Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              ASSIGNED RESPONDER
            </span>
            <Badge variant="emerald" size="sm">
              En Route
            </Badge>
          </div>

          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-slate-800 to-slate-900 text-white font-extrabold text-sm flex items-center justify-center shadow-sm border border-slate-700">
                RS
              </div>
              <div>
                <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                  Head Guard Ratan Singh
                </h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                  Gate 1 Quick Response Patrol • First-Aid Certified
                </p>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-mono mt-0.5 font-bold">
                  Entering Tower 2 Lift Lobby
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={onCallGuard}
              className="w-10 h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm transition-colors press-scale shrink-0"
              title="Call Guard Intercom"
            >
              <PhoneCall size={18} />
            </button>
          </div>
        </div>

        {/* Multi-Channel Automated Broadcast Checklist */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Automated Protocol Checklist
          </span>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex flex-col gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span>Gate 1 & Gate 2 Security Cabin Sirens Triggered</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span>Tower 2 Service Lift Ground Override Activated</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span>Emergency SMS with Live Map Pin Sent to 2 Family Contacts</span>
            </div>

            <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-medium">
              <CheckCircle2 size={15} className="text-emerald-500 shrink-0" />
              <span>Estate Facility Manager Notified via High-Priority Intercom</span>
            </div>
          </div>
        </div>

        {/* Address Verification Note */}
        <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 text-xs flex items-center gap-2.5">
          <MapPin size={18} className="text-cobalt-600 dark:text-cobalt-400 shrink-0" />
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
            Guard team has master RFID turnstile pass for <strong>Tower 2 • Flat 1204</strong>. Keep main door unlocked if safe.
          </p>
        </div>
      </div>

      {/* Resolve Incident Button */}
      <div className="pt-3">
        <Button
          type="button"
          variant="primary"
          onClick={onResolve}
          className="w-full h-12 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white font-extrabold text-xs"
        >
          ✓ Guard Has Arrived • Resolve Emergency
        </Button>
      </div>
    </div>
  );
};
