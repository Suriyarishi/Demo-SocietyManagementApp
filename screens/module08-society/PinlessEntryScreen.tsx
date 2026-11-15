import React, { useState } from 'react';
import {
  ArrowLeft,
  Smartphone,
  Radio,
  Lock,
  Unlock,
  CheckCircle2,
  Wifi,
  Sparkles,
  ShieldCheck,
  Sliders,
  ChevronRight
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';

export interface BleBeacon {
  id: string;
  name: string;
  type: 'Turnstile' | 'Boom Barrier' | 'Tower Lobby' | 'Clubhouse';
  distance: string;
  rssi: string;
  signalQuality: 'strong' | 'medium' | 'weak';
  isLocked: boolean;
}

const NEARBY_BEACONS: BleBeacon[] = [
  {
    id: 'beacon_01',
    name: 'Tower 2 Ground Lobby Glass Door',
    type: 'Tower Lobby',
    distance: '1.2 m',
    rssi: '-44 dBm',
    signalQuality: 'strong',
    isLocked: true,
  },
  {
    id: 'beacon_02',
    name: 'Gate 1 Pedestrian Turnstile A',
    type: 'Turnstile',
    distance: '2.8 m',
    rssi: '-54 dBm',
    signalQuality: 'strong',
    isLocked: true,
  },
  {
    id: 'beacon_03',
    name: 'Gate 2 Boom Barrier (Resident Lane)',
    type: 'Boom Barrier',
    distance: '6.4 m',
    rssi: '-68 dBm',
    signalQuality: 'medium',
    isLocked: true,
  },
  {
    id: 'beacon_04',
    name: 'Clubhouse Main Gymnasium Door',
    type: 'Clubhouse',
    distance: '14.2 m',
    rssi: '-84 dBm',
    signalQuality: 'weak',
    isLocked: true,
  },
];

interface PinlessEntryScreenProps {
  onBack: () => void;
}

export const PinlessEntryScreen: React.FC<PinlessEntryScreenProps> = ({ onBack }) => {
  const [beacons, setBeacons] = useState<BleBeacon[]>(NEARBY_BEACONS);
  const [autoUnlockNearby, setAutoUnlockNearby] = useState<boolean>(true);
  const [unlockingId, setUnlockingId] = useState<string | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleUnlockDoor = (beacon: BleBeacon) => {
    setUnlockingId(beacon.id);
    setTimeout(() => {
      setBeacons((prev) =>
        prev.map((b) => (b.id === beacon.id ? { ...b, isLocked: false } : b))
      );
      setUnlockingId(null);
      showToast(`✓ ${beacon.name} Unlocked for 10 seconds!`);

      // Auto-relock after 10s
      setTimeout(() => {
        setBeacons((prev) =>
          prev.map((b) => (b.id === beacon.id ? { ...b, isLocked: true } : b))
        );
      }, 10000);
    }, 1200);
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
              title="Back to Society Hub"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                HANDS-FREE ACCESS
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Pinless Bluetooth Entry
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
            <Radio size={12} className="animate-pulse text-emerald-500" />
            <span>BLE Radar Live</span>
          </div>
        </div>

        {/* Radar Scanner Visual Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated relative overflow-hidden flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-cobalt-600/20 border border-cobalt-500/30 flex items-center justify-center relative my-2">
            <div className="w-16 h-16 rounded-full bg-cobalt-600/30 border border-cobalt-400/40 flex items-center justify-center animate-ping pointer-events-none" />
            <div className="w-12 h-12 rounded-full bg-cobalt-600 text-white flex items-center justify-center shadow-lg relative z-10">
              <Smartphone size={22} />
            </div>
          </div>

          <h3 className="text-sm font-extrabold text-white mt-1">
            Scanning Hunt Lockdoor BLE Beacons
          </h3>
          <p className="text-[11px] text-slate-400 max-w-[260px] mt-0.5">
            Hold phone within 2 meters of any turnstile or gate reader to open hands-free.
          </p>

          <div className="mt-4 pt-3 w-full border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-400">Auto-Unlock on Proximity</span>
            <input
              type="checkbox"
              checked={autoUnlockNearby}
              onChange={(e) => {
                setAutoUnlockNearby(e.target.checked);
                showToast(e.target.checked ? 'Auto-Unlock Proximity Active' : 'Auto-Unlock Disabled');
              }}
              className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
            />
          </div>
        </div>

        {/* Nearby Detected Access Points */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Detected Turnstiles & Doors ({beacons.length})
            </span>
            <span className="text-[10px] text-slate-400 font-mono">
              AES-256 Encrypted
            </span>
          </div>

          <div className="flex flex-col gap-2.5">
            {beacons.map((b) => (
              <div
                key={b.id}
                className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-center justify-between"
              >
                <div className="flex items-center gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 border ${
                      !b.isLocked
                        ? 'bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 border-emerald-300 dark:border-emerald-800'
                        : 'bg-slate-100 dark:bg-obsidian-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-obsidian-700'
                    }`}
                  >
                    {!b.isLocked ? <Unlock size={20} /> : <Lock size={20} />}
                  </div>

                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                        {b.name}
                      </h4>
                      <Badge
                        variant={b.signalQuality === 'strong' ? 'emerald' : b.signalQuality === 'medium' ? 'cobalt' : 'muted'}
                        size="sm"
                      >
                        {b.distance}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {b.type} • Signal: {b.rssi}
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  disabled={unlockingId === b.id}
                  onClick={() => handleUnlockDoor(b)}
                  className={`h-9 px-3.5 rounded-xl font-bold text-xs flex items-center gap-1 transition-all press-scale shadow-sm shrink-0 ${
                    !b.isLocked
                      ? 'bg-emerald-600 text-white'
                      : 'bg-cobalt-600 hover:bg-cobalt-700 text-white'
                  }`}
                >
                  {unlockingId === b.id ? (
                    <span className="text-[10px] animate-pulse">Unlocking...</span>
                  ) : !b.isLocked ? (
                    <span>Open ✓</span>
                  ) : (
                    <span>Tap Unlock</span>
                  )}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
