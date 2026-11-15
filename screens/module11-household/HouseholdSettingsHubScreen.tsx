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
  X,
  CreditCard,
  Smartphone,
  LogOut,
  Zap,
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
  onOpenSecurityPreferences?: () => void;
  onOpenStaffHub?: () => void;
  onOpenBillsHub?: () => void;
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
  onOpenSecurityPreferences,
  onOpenStaffHub,
  onOpenBillsHub,
}) => {
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');
  const [gateKnockVoip, setGateKnockVoip] = useState<boolean>(true);
  const [autoApproveDeliveries, setAutoApproveDeliveries] = useState<boolean>(true);
  const [fastagAutoOpen, setFastagAutoOpen] = useState<boolean>(true);

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
                <p className="text-[11px] text-slate-500 dark:text-slate-400 truncate max-w-[200px]">
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

            {/* 4. Daily Household Staff */}
            {onOpenStaffHub && (
              <button
                type="button"
                onClick={onOpenStaffHub}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
                    <ShieldCheck size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Household Staff Access (2 Active)
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      Lakshmi R (Cook), Ramesh K (Driver) • Pass attendance
                    </p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400" />
              </button>
            )}
          </div>
        </div>

        {/* Section 2: Gate Clearance & Perimeter Rules */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between px-1">
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400">
              Gate & Perimeter Clearance
            </span>
            {onOpenSecurityPreferences && (
              <button
                type="button"
                onClick={onOpenSecurityPreferences}
                className="text-[11px] font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline flex items-center gap-0.5"
              >
                <span>Advanced Privacy</span>
                <ChevronRight size={13} />
              </button>
            )}
          </div>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            {/* Smart Door Lock */}
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

            {/* Toggle: VoIP Gate Intercom */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center shrink-0">
                  <Bell size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    VoIP Gate Knock Intercom
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    High-priority ringing when guard checks in a guest
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={gateKnockVoip}
                onChange={(e) => {
                  setGateKnockVoip(e.target.checked);
                  showToast(e.target.checked ? 'VoIP Gate Intercom Enabled' : 'VoIP Intercom Muted');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 border-slate-300 cursor-pointer"
              />
            </div>

            {/* Toggle: 1-Tap Delivery Pass */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center shrink-0">
                  <Smartphone size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Express 1-Tap Delivery Pass
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Auto-clear Zepto, Blinkit & Swiggy within 30 mins
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={autoApproveDeliveries}
                onChange={(e) => {
                  setAutoApproveDeliveries(e.target.checked);
                  showToast(e.target.checked ? 'Express Delivery Auto-Pass Active' : 'Manual Approval Required');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 border-slate-300 cursor-pointer"
              />
            </div>

            {/* Toggle: Boom Barrier Fastag */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Car size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Boom Barrier RFID Fastag Auto-Lift
                  </h4>
                  <p className="text-[11px] text-slate-500 font-mono">
                    KA-05-MQ-3819 • Auto-lift barrier at Gate 2
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={fastagAutoOpen}
                onChange={(e) => {
                  setFastagAutoOpen(e.target.checked);
                  showToast(e.target.checked ? 'RFID Fastag Auto-Lift Active' : 'Fastag Auto-Lift Disabled');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 border-slate-300 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 3: App Controls & Billing */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            App Controls & Billing
          </span>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            {/* Notification Sounds */}
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

            {/* Maintenance Dues & UPI Auto-Pay */}
            {onOpenBillsHub && (
              <button
                type="button"
                onClick={onOpenBillsHub}
                className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                    <CreditCard size={18} />
                  </div>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white">
                      Maintenance Dues & UPI Auto-Pay
                    </h4>
                    <p className="text-[11px] text-slate-500">
                      PhonePe / BHIM • 0% Gateway surcharge • GST receipts
                    </p>
                  </div>
                </div>
                <ChevronRight size={15} className="text-slate-400" />
              </button>
            )}

            {/* Audited Perimeter Log */}
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

        {/* Section 4: Residence & Session Management */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            type="button"
            onClick={onOpenFlatSwitcher}
            className="w-full p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-center justify-between text-left press-scale hover:border-cobalt-500 transition-colors text-xs"
          >
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center shrink-0">
                <Home size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Switch Active Residence
                </h4>
                <p className="text-[11px] text-slate-500">
                  Current: {activeFlat.unit} ({activeFlat.societyName.split(' ')[0]})
                </p>
              </div>
            </div>
            <ChevronRight size={15} className="text-slate-400" />
          </button>

          <button
            type="button"
            onClick={() => showToast('Session locked. Enter PIN to resume.')}
            className="w-full p-3.5 rounded-2xl bg-crimson-50/60 dark:bg-crimson-950/30 border border-crimson-200/70 dark:border-crimson-800/40 text-crimson-600 dark:text-crimson-400 flex items-center justify-center gap-2 text-xs font-bold transition-all press-scale hover:bg-crimson-100/60"
          >
            <LogOut size={16} />
            <span>Lock Session & Sign Out</span>
          </button>
        </div>

        {/* Security OS Footnote */}
        <div className="text-center py-2">
          <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400 dark:text-slate-500">
            HUNT LOCKDOOR RESIDENTIAL OS • BUILD 2026.4
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 dark:text-slate-600 mt-0.5">
            Zero brokerage • Perimeter isolated • AES-256 encrypted
          </p>
        </div>
      </div>

      {/* QR Code Pass Modal */}
      {showQrModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
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
