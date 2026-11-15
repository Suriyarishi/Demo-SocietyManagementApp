import React, { useState } from 'react';
import {
  ArrowLeft,
  Shield,
  Bell,
  Smartphone,
  Eye,
  Camera,
  Moon,
  Clock,
  CheckCircle2,
  Lock,
  ScanFace,
  Volume2,
  VolumeX,
  Key,
  Sliders
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';

interface SecurityPreferencesScreenProps {
  onBack: () => void;
}

export const SecurityPreferencesScreen: React.FC<SecurityPreferencesScreenProps> = ({ onBack }) => {
  const [voipGateKnock, setVoipGateKnock] = useState<boolean>(true);
  const [cellCallBackup, setCellCallBackup] = useState<boolean>(true);
  const [dndActive, setDndActive] = useState<boolean>(false);
  const [dndStart, setDndStart] = useState<string>('23:00');
  const [dndEnd, setDndEnd] = useState<string>('07:00');
  const [faceTurnstile, setFaceTurnstile] = useState<boolean>(true);
  const [requireGuardPhoto, setRequireGuardPhoto] = useState<boolean>(true);
  const [autoClearZepto, setAutoClearZepto] = useState<boolean>(true);
  const [autoClearBlinkit, setAutoClearBlinkit] = useState<boolean>(true);
  const [autoClearSwiggy, setAutoClearSwiggy] = useState<boolean>(true);
  const [autoClearAmazon, setAutoClearAmazon] = useState<boolean>(false);
  const [maskUnitNumber, setMaskUnitNumber] = useState<boolean>(false);
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
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-obsidian-800">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
              title="Back to Settings"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                GATE & PRIVACY
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Security & Intercom
              </h2>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center">
            <Shield size={16} />
          </div>
        </div>

        {/* Section 1: Gate Intercom Calling */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Gate Knock & Intercom
          </span>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center shrink-0">
                  <Volume2 size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    HD VoIP Gate Knock
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    High-priority ringing with live security camera preview
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={voipGateKnock}
                onChange={(e) => {
                  setVoipGateKnock(e.target.checked);
                  showToast(e.target.checked ? 'HD VoIP Active' : 'VoIP Muted');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 cursor-pointer"
              />
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Smartphone size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Cellular Call Fallback
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Dial mobile phone directly if VoIP is unanswered for 15s
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={cellCallBackup}
                onChange={(e) => {
                  setCellCallBackup(e.target.checked);
                  showToast(e.target.checked ? 'Cellular Fallback Active' : 'Cellular Fallback Disabled');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 2: DND Quiet Hours */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Do Not Disturb (Quiet Hours)
          </span>

          <div className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-3 text-xs">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Moon size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Scheduled DND Mode
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Route late-night gate knocks to silent notification
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={dndActive}
                onChange={(e) => {
                  setDndActive(e.target.checked);
                  showToast(e.target.checked ? 'Night Quiet Hours Enabled' : 'Quiet Hours Disabled');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 cursor-pointer"
              />
            </div>

            {dndActive && (
              <div className="pt-2 border-t border-slate-100 dark:border-obsidian-800 grid grid-cols-2 gap-2">
                <div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">START TIME</span>
                  <input
                    type="time"
                    value={dndStart}
                    onChange={(e) => setDndStart(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 font-bold text-slate-800 dark:text-slate-200 text-xs"
                  />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 block mb-1">END TIME</span>
                  <input
                    type="time"
                    value={dndEnd}
                    onChange={(e) => setDndEnd(e.target.value)}
                    className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 font-bold text-slate-800 dark:text-slate-200 text-xs"
                  />
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Section 3: Biometrics & AI Perimeter Controls */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Biometrics & Gate Security
          </span>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <ScanFace size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Facial Recognition Turnstile
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Hands-free pedestrian gate access via optical face AI
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={faceTurnstile}
                onChange={(e) => {
                  setFaceTurnstile(e.target.checked);
                  showToast(e.target.checked ? 'Facial Recognition Turnstiles Active' : 'Facial Recognition Disabled');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 cursor-pointer"
              />
            </div>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Camera size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Mandatory Guard Photo Capture
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Require guard kiosk to photograph unverified delivery agents
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={requireGuardPhoto}
                onChange={(e) => {
                  setRequireGuardPhoto(e.target.checked);
                  showToast(e.target.checked ? 'Mandatory Visitor Photos Enforced' : 'Photo Requirement Relaxed');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Express Delivery Auto-Clear Matrix */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Express Delivery Auto-Pass
            </span>
            <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-bold">
              30m Window
            </span>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <div className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Zepto ⚡</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Auto-Pass</span>
              </div>
              <input
                type="checkbox"
                checked={autoClearZepto}
                onChange={(e) => setAutoClearZepto(e.target.checked)}
                className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Blinkit 🛍️</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Auto-Pass</span>
              </div>
              <input
                type="checkbox"
                checked={autoClearBlinkit}
                onChange={(e) => setAutoClearBlinkit(e.target.checked)}
                className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Swiggy / Zomato</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Auto-Pass</span>
              </div>
              <input
                type="checkbox"
                checked={autoClearSwiggy}
                onChange={(e) => setAutoClearSwiggy(e.target.checked)}
                className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
              />
            </div>

            <div className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 flex items-center justify-between">
              <div>
                <span className="font-bold text-slate-900 dark:text-white block">Amazon Parcel</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400">Call First</span>
              </div>
              <input
                type="checkbox"
                checked={autoClearAmazon}
                onChange={(e) => setAutoClearAmazon(e.target.checked)}
                className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={() => {
            showToast('✓ Security & Privacy Preferences Saved');
            onBack();
          }}
          className="w-full mt-2"
        >
          Save Security Preferences
        </Button>
      </div>
    </div>
  );
};
