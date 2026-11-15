import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  Car,
  AlertTriangle,
  Lock,
  Bell,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Phone,
  Mail,
  Home,
  CheckCircle2,
  FileText,
  Sliders,
  Sparkles,
  X
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { FlatEntity } from '../module02-home/MultiFlatSelectorSheet';
import { DigitalLock3D } from '../../components/3d/Vector3DElements';

interface HouseholdSettingsHubScreenProps {
  activeFlat: FlatEntity;
  onBack: () => void;
  onOpenFamily: () => void;
  onOpenVehicles: () => void;
  onOpenWrongParking: () => void;
  onOpenSmartLock: () => void;
  onOpenNotifications: () => void;
  onOpenFlatSwitcher: () => void;
  onOpenActivityHistory: () => void;
}

export const HouseholdSettingsHubScreen: React.FC<HouseholdSettingsHubScreenProps> = ({
  activeFlat,
  onBack,
  onOpenFamily,
  onOpenVehicles,
  onOpenWrongParking,
  onOpenSmartLock,
  onOpenNotifications,
  onOpenFlatSwitcher,
  onOpenActivityHistory,
}) => {
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
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
              title="Back"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                RESIDENCE GOVERNANCE
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Household & Settings Hub
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onOpenFlatSwitcher}
            className="h-8 px-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1 transition-colors press-scale shrink-0"
          >
            <span>Switch Flat</span>
          </button>
        </div>

        {/* Resident Identity Card (2026 High Luxury Dark Card) */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-cobalt-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-cobalt-600 to-indigo-700 text-white font-black text-lg flex items-center justify-center shadow-lg shadow-cobalt-600/30 border border-white/10">
                  SK
                </div>
                <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-slate-900 text-[10px]">
                  ✓
                </div>
              </div>

              <div>
                <div className="flex items-center gap-1.5">
                  <h3 className="text-base font-extrabold text-white leading-tight">
                    Suriya K
                  </h3>
                  <Badge variant="emerald" size="sm">
                    Verified Owner
                  </Badge>
                </div>
                <p className="text-xs text-slate-300 font-medium mt-0.5">
                  {activeFlat.unit}
                </p>
                <p className="text-[11px] text-slate-400 truncate max-w-[200px]">
                  {activeFlat.societyName}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 shrink-0">
              <DigitalLock3D size={44} glow={false} />
              <button
                type="button"
                onClick={() => setShowQrModal(true)}
                className="w-10 h-10 rounded-2xl bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors border border-white/15 press-scale shrink-0"
                title="Show Resident QR Pass"
              >
                <QrCode size={18} />
              </button>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-white/10 grid grid-cols-2 gap-2 text-xs relative z-10">
            <div className="flex items-center gap-1.5 text-slate-300">
              <Phone size={12} className="text-cobalt-400" />
              <span className="font-mono text-[11px]">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-300">
              <Mail size={12} className="text-emerald-400" />
              <span className="text-[11px] truncate">suriya@huntlock.in</span>
            </div>
          </div>
        </div>

        {/* Section 1: Household Governance Modules */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Household Access & Vehicles
          </span>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            {/* 1. Family & Co-Residents */}
            <button
              type="button"
              onClick={onOpenFamily}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center shrink-0">
                  <Users size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Family & Co-Residents (3 Members)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Spouse, 2 Dependents • Gate approval permissions
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            {/* 2. Registered Vehicles & Fastag */}
            <button
              type="button"
              onClick={onOpenVehicles}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Car size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Vehicles & RFID Fastag (2 Registered)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    KA-05-MQ-3819 • Auto-lift barrier at Gate 2
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            {/* 3. Wrong Parking Dispute */}
            <button
              type="button"
              onClick={onOpenWrongParking}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <AlertTriangle size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Slot #B1-142 Wrong Parking Report
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Report unauthorized car parked in your designated slot
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>
          </div>
        </div>

        {/* Section 2: Smart Home & Privacy Settings */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Smart Home & App Controls
          </span>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            {/* 4. Smart Door Lock */}
            <button
              type="button"
              onClick={onOpenSmartLock}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                  <Lock size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Smart Door Lock BLE & Passcodes
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Yale Smart Deadbolt (94% Battery) • Temporary guest PINs
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            {/* 5. Notification Sounds */}
            <button
              type="button"
              onClick={onOpenNotifications}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Bell size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    App Notifications & Quiet Hours
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Prioritize Gate Knock & SOS • Mute society notice chimes
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            {/* 6. Audited Perimeter Log */}
            <button
              type="button"
              onClick={onOpenActivityHistory}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-xl bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <FileText size={18} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Audited Perimeter Access Logs
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Cryptographic gate entries, vehicle logs & receipts
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>
          </div>
        </div>
      </div>

      {/* QR Code Pass Modal */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col items-center gap-4 text-center relative overflow-hidden">
            <div className="flex items-center justify-between w-full border-b border-white/10 pb-2">
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest">
                VERIFIED RESIDENT PASS
              </span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <div className="p-4 rounded-2xl bg-white text-slate-900 shadow-inner">
              <QrCode size={130} className="text-slate-900" />
            </div>

            <div>
              <h4 className="text-base font-extrabold text-white">Suriya K</h4>
              <p className="text-xs text-slate-300 font-mono mt-0.5">
                {activeFlat.unit} • {activeFlat.societyName}
              </p>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => setShowQrModal(false)}
              className="w-full"
            >
              Close Pass
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
