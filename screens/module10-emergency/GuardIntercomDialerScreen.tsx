import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  PhoneCall,
  PhoneOff,
  Mic,
  MicOff,
  Volume2,
  VolumeX,
  ShieldCheck,
  Building,
  CheckCircle2,
  Radio,
  Search,
  X
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';

interface IntercomTarget {
  id: string;
  name: string;
  role: string;
  extension: string;
  location: string;
  status: 'online' | 'busy';
  is24x7: boolean;
}

const INTERCOM_TARGETS: IntercomTarget[] = [
  {
    id: 'tgt_01',
    name: 'Gate 1 Security Supervisor',
    role: 'Head Guard & Boom Barrier Kiosk',
    extension: 'Ext. 101',
    location: 'Gate 1 Main Entrance',
    status: 'online',
    is24x7: true,
  },
  {
    id: 'tgt_02',
    name: 'Gate 2 Security Patrol',
    role: 'Resident RFID & School Bus Bay',
    extension: 'Ext. 102',
    location: 'Gate 2 East Gate',
    status: 'online',
    is24x7: true,
  },
  {
    id: 'tgt_03',
    name: '24/7 Lift Rescue Technician',
    role: 'Otis On-Site Elevator Emergency',
    extension: 'Ext. 999',
    location: 'Central Control Room B1',
    status: 'online',
    is24x7: true,
  },
  {
    id: 'tgt_04',
    name: 'Fire Pump & Hydrant Station',
    role: 'Emergency Water Pressure Controls',
    extension: 'Ext. 118',
    location: 'Pump House North',
    status: 'online',
    is24x7: true,
  },
  {
    id: 'tgt_05',
    name: 'Estate Facility Manager',
    role: 'Mr. Rajesh Hegde (General Admin)',
    extension: 'Ext. 201',
    location: 'Clubhouse Admin Block',
    status: 'online',
    is24x7: false,
  },
];

interface GuardIntercomDialerScreenProps {
  onBack: () => void;
}

export const GuardIntercomDialerScreen: React.FC<GuardIntercomDialerScreenProps> = ({ onBack }) => {
  const [activeCall, setActiveCall] = useState<IntercomTarget | null>(null);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [isSpeaker, setIsSpeaker] = useState<boolean>(true);
  const [callDuration, setCallDuration] = useState<number>(12);
  const [dialPadInput, setDialPadInput] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleStartCall = (target: IntercomTarget) => {
    setActiveCall(target);
    setCallDuration(0);
    showToast(`Connecting VoIP Intercom to ${target.name}...`);
  };

  const handleKeypadPress = (digit: string) => {
    setDialPadInput((prev) => prev + digit);
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
                DIRECT GUARD LINE
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Emergency Guard Intercom
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
            <Radio size={12} className="text-emerald-500 animate-pulse" />
            <span>VoIP Active</span>
          </div>
        </div>

        {/* Speed Dial Target Cards */}
        <div className="flex flex-col gap-2.5">
          {INTERCOM_TARGETS.map((tgt) => (
            <div
              key={tgt.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-obsidian-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 border border-slate-200 dark:border-obsidian-750">
                  <Building size={20} className="text-cobalt-600 dark:text-cobalt-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                      {tgt.name}
                    </h4>
                    {tgt.is24x7 && (
                      <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold rounded-full border border-emerald-500/20">
                        24x7
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5 line-clamp-1">
                    {tgt.role} • {tgt.location}
                  </p>
                  <span className="text-[10px] font-mono font-bold text-cobalt-600 dark:text-cobalt-400">
                    {tgt.extension}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleStartCall(tgt)}
                className="w-10 h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-700 text-white flex items-center justify-center shadow-sm transition-colors press-scale shrink-0"
                title={`Call ${tgt.name}`}
              >
                <PhoneCall size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active VoIP Intercom Call Dialog Modal */}
      {activeCall && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col items-center gap-5 text-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center pulse-ring">
              <PhoneCall size={34} />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                HD VOIP INTERCOM • CONNECTED
              </span>
              <h3 className="text-base font-extrabold text-white mt-1">
                {activeCall.name}
              </h3>
              <p className="text-xs text-slate-400 font-mono mt-0.5">
                {activeCall.extension} • 00:24
              </p>
            </div>

            <div className="p-3 w-full rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 font-medium">
              Encrypted channel • Tower 2 - Flat 1204
            </div>

            {/* In-Call Audio Controls */}
            <div className="flex items-center justify-center gap-4 w-full">
              <button
                type="button"
                onClick={() => {
                  setIsMuted(!isMuted);
                  showToast(isMuted ? 'Microphone Unmuted' : 'Microphone Muted');
                }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  isMuted ? 'bg-amber-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Mute Mic"
              >
                {isMuted ? <MicOff size={20} /> : <Mic size={20} />}
              </button>

              <button
                type="button"
                onClick={() => {
                  setIsSpeaker(!isSpeaker);
                  showToast(isSpeaker ? 'Ear Speaker Active' : 'Loudspeaker Active');
                }}
                className={`w-12 h-12 rounded-2xl flex items-center justify-center transition-colors ${
                  isSpeaker ? 'bg-cobalt-600 text-white' : 'bg-slate-800 text-slate-300 hover:bg-slate-700'
                }`}
                title="Toggle Speaker"
              >
                {isSpeaker ? <Volume2 size={20} /> : <VolumeX size={20} />}
              </button>
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveCall(null);
                showToast('Intercom line disconnected');
              }}
              className="w-full h-12 rounded-2xl bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors press-scale mt-1"
            >
              <PhoneOff size={18} />
              <span>End Intercom Call</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
