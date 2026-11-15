import React, { useState } from 'react';
import {
  ArrowLeft,
  ShieldAlert,
  Flame,
  HeartPulse,
  PhoneCall,
  Volume2,
  VolumeX,
  AlertTriangle,
  Building,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  Phone,
  Radio,
  Ambulance,
  LifeBuoy
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { EmergencyBeacon3D } from '../../components/3d/Vector3DElements';

export type EmergencyType = 'medical' | 'fire' | 'lift' | 'intruder' | 'animal';

interface EmergencyHubScreenProps {
  onBack: () => void;
  onTriggerSos: (type: EmergencyType, isSilent: boolean) => void;
  onOpenIntercom: () => void;
  onOpenHelplines: () => void;
}

export const EmergencyHubScreen: React.FC<EmergencyHubScreenProps> = ({
  onBack,
  onTriggerSos,
  onOpenIntercom,
  onOpenHelplines,
}) => {
  const [selectedType, setSelectedType] = useState<EmergencyType>('medical');
  const [isSilentAlarm, setIsSilentAlarm] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const categories = [
    {
      id: 'medical' as EmergencyType,
      title: 'Medical Emergency',
      subtext: 'Ambulance, elderly fall, cardiac trauma',
      icon: HeartPulse,
      color: 'from-rose-500 to-crimson-600',
      badge: 'Immediate Paramedic',
      border: 'border-rose-300 dark:border-rose-900',
    },
    {
      id: 'fire' as EmergencyType,
      title: 'Fire & Gas Leak',
      subtext: 'Kitchen flame, LPG odor, corridor smoke',
      icon: Flame,
      color: 'from-amber-500 to-orange-600',
      badge: 'Hydrant Team',
      border: 'border-amber-300 dark:border-amber-900',
    },
    {
      id: 'lift' as EmergencyType,
      title: 'Lift Stuck (24/7)',
      subtext: 'Trapped in elevator cab with passenger',
      icon: Building,
      color: 'from-cobalt-500 to-blue-600',
      badge: 'Otis Tech On-Site',
      border: 'border-blue-300 dark:border-blue-900',
    },
    {
      id: 'intruder' as EmergencyType,
      title: 'Intruder / Security Threat',
      subtext: 'Physical aggression, trespasser at door',
      icon: ShieldAlert,
      color: 'from-purple-600 to-slate-900',
      badge: 'Armed Gate Guards',
      border: 'border-purple-300 dark:border-purple-900',
    },
  ];

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
              <span className="text-[10px] font-bold text-crimson-600 dark:text-crimson-400 uppercase tracking-widest block">
                FAIL-SAFE RESIDENT SAFETY
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Emergency SOS Hub
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-crimson-50 dark:bg-crimson-950/60 border border-crimson-200 dark:border-crimson-800/40 text-crimson-700 dark:text-crimson-400 text-[10px] font-bold">
            <Radio size={12} className="text-crimson-600 animate-pulse" />
            <span>Guards Live</span>
          </div>
        </div>

        {/* Location Dispatch Banner with 3D Emergency Siren Beacon */}
        <div className="p-4 rounded-3xl bg-gradient-to-r from-crimson-600/15 via-rose-500/10 to-amber-500/10 border border-crimson-500/30 flex items-center justify-between text-xs shadow-ambient relative overflow-hidden">
          <div className="flex items-center gap-3 relative z-10">
            <EmergencyBeacon3D size={52} />
            <div>
              <span className="text-[10px] font-bold text-crimson-600 dark:text-crimson-400 uppercase tracking-wider block">
                DISPATCH COORDINATES
              </span>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs mt-0.5">
                Tower 2 • Flat 1204 (Floor 12)
              </h4>
              <p className="text-[11px] text-slate-500 mt-0.5">
                Prestige Lakeside, Gate 1 & 2 Fast Response
              </p>
            </div>
          </div>

          <Badge variant="crimson" size="sm" className="relative z-10">
            High Priority
          </Badge>
        </div>

        {/* Crisis Category Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Select Crisis Category
          </span>

          <div className="grid grid-cols-2 gap-2.5">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = selectedType === cat.id;
              return (
                <div
                  key={cat.id}
                  onClick={() => setSelectedType(cat.id)}
                  className={`p-3.5 rounded-3xl border text-left cursor-pointer transition-all press-scale flex flex-col justify-between gap-2.5 shadow-sm ${
                    isSelected
                      ? 'bg-crimson-50/70 dark:bg-crimson-950/40 border-crimson-500 ring-2 ring-crimson-500/20'
                      : 'bg-white dark:bg-obsidian-900 border-slate-200/90 dark:border-obsidian-800 hover:border-slate-300'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div
                      className={`w-9 h-9 rounded-2xl bg-gradient-to-br ${cat.color} text-white flex items-center justify-center shadow-sm`}
                    >
                      <Icon size={18} />
                    </div>
                    {isSelected && (
                      <span className="w-4 h-4 rounded-full bg-crimson-600 text-white flex items-center justify-center text-[10px] font-bold">
                        ✓
                      </span>
                    )}
                  </div>

                  <div>
                    <h4 className="font-extrabold text-xs text-slate-900 dark:text-white leading-tight">
                      {cat.title}
                    </h4>
                    <p className="text-[10px] text-slate-500 font-medium line-clamp-2 mt-0.5">
                      {cat.subtext}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Silent Alarm Toggle */}
        <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-slate-200 dark:bg-obsidian-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0">
              {isSilentAlarm ? <VolumeX size={16} /> : <Volume2 size={16} />}
            </div>
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white">
                Silent Security Dispatch
              </h4>
              <p className="text-[11px] text-slate-500">
                Dispatch guards silently without sounding flat chime
              </p>
            </div>
          </div>

          <input
            type="checkbox"
            checked={isSilentAlarm}
            onChange={(e) => {
              setIsSilentAlarm(e.target.checked);
              showToast(e.target.checked ? 'Silent Dispatch Enabled' : 'Audible Siren Enabled');
            }}
            className="w-4 h-4 rounded text-crimson-600 focus:ring-crimson-500 cursor-pointer"
          />
        </div>

        {/* Huge One-Touch SOS Dispatch Button */}
        <div className="pt-1">
          <button
            type="button"
            onClick={() => onTriggerSos(selectedType, isSilentAlarm)}
            className="w-full h-16 rounded-3xl bg-gradient-to-r from-crimson-600 via-rose-600 to-crimson-700 hover:from-crimson-700 hover:to-crimson-800 text-white font-extrabold text-base flex items-center justify-center gap-3 shadow-lg shadow-crimson-600/30 transition-transform active:scale-[0.98] press-scale border border-white/20"
          >
            <ShieldAlert size={26} className="animate-bounce" />
            <span>TRIGGER EMERGENCY SOS</span>
          </button>
          <span className="text-[10px] text-slate-500 dark:text-slate-400 text-center block mt-1.5 font-medium">
            3-second abort window provided to prevent accidental alarms
          </span>
        </div>

        {/* Quick Speed Dial Bar */}
        <div className="flex flex-col gap-2 pt-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Emergency Speed Dial
          </span>

          <div className="grid grid-cols-2 gap-2 text-xs">
            <button
              type="button"
              onClick={onOpenIntercom}
              className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-crimson-50 dark:bg-crimson-950/60 text-crimson-600 flex items-center justify-center shrink-0">
                <PhoneCall size={16} />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-slate-900 dark:text-white block truncate">Gate 1 Guard</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Ext. 101</span>
              </div>
            </button>

            <button
              type="button"
              onClick={onOpenHelplines}
              className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 flex items-center gap-2.5 hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 flex items-center justify-center shrink-0">
                <Ambulance size={16} />
              </div>
              <div className="min-w-0">
                <span className="font-bold text-slate-900 dark:text-white block truncate">Hospital & Police</span>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 font-mono">Nearby 2.4 km</span>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
