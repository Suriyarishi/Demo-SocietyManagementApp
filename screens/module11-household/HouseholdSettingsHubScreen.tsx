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
import { DigitalLock3D, ResidentSmartPass3D } from '../../components/3d/Vector3DElements';

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

        {/* Resident Identity Card (Clean & Neat UI/UX Architecture) */}
        <div className="rounded-3xl bg-white dark:bg-[#0B0F19] border border-slate-200/90 dark:border-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.04)] dark:shadow-[0_12px_36px_rgba(0,0,0,0.5)] p-4 relative overflow-hidden transition-all flex flex-col gap-3.5">
          {/* Subtle Top Emerald Micro-Gradient Accent */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#04BB49] via-[#0ECD5A] to-[#6EE3A1] opacity-75" />

          {/* Row 1: Resident Identity (Left) & 3D Smart Pass Graphic (Right) */}
          <div className="flex items-center justify-between gap-3 pt-0.5">
            {/* Identity & Residence Group */}
            <div className="flex items-center gap-3 min-w-0 flex-1">
              {/* Resident Initials Avatar */}
              <div className="relative shrink-0">
                <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#04BB49] to-[#027A2F] text-white font-black text-xl flex items-center justify-center shadow-md shadow-[#04BB49]/25 border-2 border-white dark:border-slate-800">
                  SK
                </div>
                <div className="absolute -bottom-1 -right-1 w-4.5 h-4.5 rounded-full bg-[#04BB49] text-white flex items-center justify-center border-2 border-white dark:border-[#0B0F19] shadow-2xs">
                  <CheckCircle2 size={11} strokeWidth={2.8} />
                </div>
              </div>

              {/* Text Hierarchy */}
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-1.5 flex-wrap">
                  <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                    Suriya K
                  </h3>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#038334] dark:text-[#0ECD5A] border border-[#04BB49]/30 text-[10px] font-bold tracking-tight shadow-2xs">
                    <ShieldCheck size={10} strokeWidth={2.4} />
                    <span>Verified Owner</span>
                  </span>
                </div>
                <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1">
                  {activeFlat.unit}
                </p>
                <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate mt-0.5">
                  {activeFlat.societyName}
                </p>
              </div>
            </div>

            {/* 3D Graphic Vector Element (Symmetrical Visual Balance) */}
            <div className="shrink-0 flex items-center justify-center">
              <ResidentSmartPass3D size={64} glow={false} />
            </div>
          </div>

          {/* Row 2: Interactive Gate QR Pass & Digital Key (Fitts's Law Full-Touch Target) */}
          <button
            type="button"
            onClick={() => setShowQrModal(true)}
            className="w-full flex items-center justify-between p-2.5 px-3 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-white/5 dark:hover:bg-white/10 border border-slate-200/80 dark:border-white/10 transition-all press-scale shadow-xs group text-left"
            title="Open Gate QR Pass & Access Key"
          >
            <div className="flex items-center gap-2.5 min-w-0">
              <div className="w-8 h-8 rounded-xl bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] flex items-center justify-center border border-[#04BB49]/25 shrink-0 group-hover:scale-105 transition-transform">
                <QrCode size={17} strokeWidth={2.2} />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Gate QR Pass & Digital Key
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[#04BB49] animate-pulse" />
                </div>
                <span className="text-[10px] font-mono font-medium text-slate-500 dark:text-slate-400 block leading-tight truncate mt-0.5">
                  KEY: {activeFlat.gateKey || 'GATE-PLH-9402'} • TAP TO EXPAND
                </span>
              </div>
            </div>

            <div className="flex items-center gap-1 text-xs font-bold text-[#04BB49] dark:text-[#0ECD5A] shrink-0 pl-2">
              <span className="text-[11px]">Pass</span>
              <ChevronRight size={13} strokeWidth={2.4} className="group-hover:translate-x-0.5 transition-transform" />
            </div>
          </button>

          {/* Row 3: Verified Contact Line */}
          <div className="pt-2.5 border-t border-slate-100 dark:border-white/5 grid grid-cols-2 gap-2 text-xs">
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 min-w-0">
              <div className="w-5 h-5 rounded-md bg-[#E8FBF0] dark:bg-[#0A2E18] flex items-center justify-center text-[#04BB49] dark:text-[#0ECD5A] shrink-0">
                <Phone size={11} strokeWidth={2.4} />
              </div>
              <span className="font-mono text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">+91 98765 43210</span>
            </div>
            <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400 min-w-0">
              <div className="w-5 h-5 rounded-md bg-[#E8FBF0] dark:bg-[#0A2E18] flex items-center justify-center text-[#04BB49] dark:text-[#0ECD5A] shrink-0">
                <Mail size={11} strokeWidth={2.4} />
              </div>
              <span className="text-[11px] font-semibold text-slate-800 dark:text-slate-200 truncate">suriya@huntlock.in</span>
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
