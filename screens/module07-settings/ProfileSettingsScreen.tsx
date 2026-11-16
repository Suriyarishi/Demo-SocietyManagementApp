import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Shield,
  Phone,
  Mail,
  Home,
  Bell,
  Lock,
  Smartphone,
  ChevronRight,
  CheckCircle2,
  QrCode,
  Users,
  Car,
  CreditCard,
  Moon,
  Sun,
  ShieldCheck,
  LogOut,
  Zap,
  HelpCircle,
  FileText,
  Share2
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { FlatEntity } from '../module02-home/MultiFlatSelectorSheet';
import { DigitalLock3D, ResidentSmartPass3D } from '../../components/3d/Vector3DElements';

interface ProfileSettingsScreenProps {
  activeFlat: FlatEntity;
  onBack: () => void;
  onOpenFlatSwitcher: () => void;
  onOpenActivityHistory: () => void;
  onOpenStaffHub: () => void;
  onOpenGateHub: () => void;
  onOpenBillsHub: () => void;
  onOpenHouseholdMembers?: () => void;
  onOpenSecurityPreferences?: () => void;
}

export const ProfileSettingsScreen: React.FC<ProfileSettingsScreenProps> = ({
  activeFlat,
  onBack,
  onOpenFlatSwitcher,
  onOpenActivityHistory,
  onOpenStaffHub,
  onOpenGateHub,
  onOpenBillsHub,
  onOpenHouseholdMembers,
  onOpenSecurityPreferences,
}) => {
  const [gateKnockVoip, setGateKnockVoip] = useState<boolean>(true);
  const [autoApproveDeliveries, setAutoApproveDeliveries] = useState<boolean>(true);
  const [fastagAutoOpen, setFastagAutoOpen] = useState<boolean>(true);
  const [ebAlerts, setEbAlerts] = useState<boolean>(true);
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
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
            title="Back to Home Hub"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="text-[11px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
            Resident Governance & Settings
          </span>
          <div className="w-10" />
        </div>

        {/* Resident Identity Card (Ultra-Premium 3D Vector Membership & Access Pass) */}
        <div className="rounded-[28px] bg-white dark:bg-gradient-to-br dark:from-[#0D131F] dark:via-[#090D16] dark:to-[#05070E] border border-slate-200/90 dark:border-white/10 shadow-[0_12px_36px_rgba(4,187,73,0.08),0_2px_8px_rgba(0,0,0,0.04)] dark:shadow-[0_16px_40px_rgba(0,0,0,0.7)] relative overflow-hidden transition-all">
          {/* Top Holographic Emerald Accent Line */}
          <div className="h-1.5 w-full bg-gradient-to-r from-[#04BB49] via-[#0ECD5A] to-[#34D399]" />

          {/* Ambient Specular Glow */}
          <div className="absolute -top-12 -right-12 w-40 h-40 bg-[#04BB49]/15 dark:bg-[#04BB49]/20 rounded-full blur-3xl pointer-events-none" />

          {/* Guilloche Micro-Security Watermark Background SVG */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.03] dark:opacity-[0.06]" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <pattern id="guillochePattern" width="30" height="30" patternUnits="userSpaceOnUse">
                <circle cx="15" cy="15" r="14" fill="none" stroke="currentColor" strokeWidth="0.5" />
                <path d="M0 15Q15 0 30 15Q15 30 0 15Z" fill="none" stroke="currentColor" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#guillochePattern)" />
          </svg>

          <div className="p-4 relative z-10 flex flex-col gap-3.5">
            {/* Top Pass Header (Brand & NFC Active Indicator) */}
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-white/5 pb-2">
              <div className="flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full bg-[#04BB49] animate-pulse" />
                <span className="text-[9.5px] font-black uppercase tracking-widest text-[#038334] dark:text-[#0ECD5A]">
                  HUNT LOCKDOOR • RESIDENTIAL ACCESS PASS
                </span>
              </div>
              <div className="flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/60 dark:border-white/10 text-[9px] font-mono font-bold text-slate-600 dark:text-slate-400">
                <span>NFC ACTIVE</span>
              </div>
            </div>

            {/* Main Stage: Resident Details (Left) & 3D Graphic Vector Element (Right) */}
            <div className="flex items-center justify-between gap-3">
              {/* Left Column: Avatar & Resident Meta */}
              <div className="flex items-center gap-3 min-w-0 flex-1">
                <div className="relative shrink-0">
                  <div className="w-13 h-13 rounded-2xl bg-gradient-to-br from-[#04BB49] to-[#027A2F] text-white font-black text-xl flex items-center justify-center shadow-md shadow-[#04BB49]/30 border-2 border-white dark:border-slate-800">
                    SK
                  </div>
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 rounded-full bg-[#04BB49] text-white flex items-center justify-center border-2 border-white dark:border-[#090D16] shadow-xs">
                    <CheckCircle2 size={12} strokeWidth={2.6} />
                  </div>
                </div>

                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 flex-wrap">
                    <h2 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                      Suriya K
                    </h2>
                    <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#038334] dark:text-[#0ECD5A] border border-[#04BB49]/30 text-[10px] font-bold tracking-tight shadow-2xs">
                      <ShieldCheck size={11} strokeWidth={2.4} />
                      <span>Verified Owner</span>
                    </span>
                  </div>
                  <p className="text-xs font-bold text-slate-700 dark:text-slate-200 mt-1 flex items-center gap-1.5">
                    <span>{activeFlat.unit}</span>
                  </p>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400 truncate max-w-[180px] mt-0.5">
                    {activeFlat.societyName}
                  </p>
                </div>
              </div>

              {/* Right Column: 3D Graphic Vector Element & QR Pass Trigger */}
              <div className="flex flex-col items-center justify-center shrink-0">
                <div className="transform hover:scale-105 transition-transform duration-300">
                  <ResidentSmartPass3D size={74} glow={true} />
                </div>
                <button
                  type="button"
                  onClick={() => setShowQrModal(true)}
                  className="mt-1 flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8FBF0] hover:bg-[#D3F8E2] dark:bg-[#0A2E18] dark:hover:bg-[#0E3D20] text-[#038334] dark:text-[#0ECD5A] border border-[#04BB49]/35 transition-all press-scale text-[11px] font-bold shadow-2xs group"
                  title="View Resident Gate QR Pass"
                >
                  <QrCode size={13} strokeWidth={2.4} className="group-hover:rotate-12 transition-transform" />
                  <span>View Pass</span>
                </button>
              </div>
            </div>

            {/* Security Smart Lock Token Bar */}
            <div className="p-2 rounded-xl bg-slate-50 dark:bg-white/5 border border-slate-200/70 dark:border-white/5 flex items-center justify-between text-[11px]">
              <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-400">
                <Lock size={12} className="text-[#04BB49] shrink-0" />
                <span className="font-mono text-[10.5px] font-bold text-slate-800 dark:text-slate-200">
                  KEY: {activeFlat.gateKey || 'GATE-PLH-9402'}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px] font-extrabold text-[#038334] dark:text-[#0ECD5A]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#04BB49] animate-pulse" />
                <span>PAIRED & SECURED</span>
              </div>
            </div>

            {/* Quick Contact Line */}
            <div className="pt-2 border-t border-slate-100 dark:border-white/5 grid grid-cols-2 gap-2 text-xs">
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
        </div>

        {/* Section 1: Security & Gate Preferences */}
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
            {/* Toggle 1: Gate Knock VoIP */}
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

            {/* Toggle 2: Auto-Clear Deliveries */}
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

            {/* Toggle 3: Boom Barrier Fastag */}
            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <Car size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Boom Barrier RFID Fastag
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

        {/* Section 2: Household & People */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Household Governance
          </span>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            {/* Co-Residents */}
            <button
              type="button"
              onClick={onOpenHouseholdMembers || (() => showToast('Invite link copied for WhatsApp sharing!'))}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Users size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Family & Co-Residents (3 Members)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Spouse, 2 Dependents • Invite family member
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            {/* Daily Household Staff */}
            <button
              type="button"
              onClick={onOpenStaffHub}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center shrink-0">
                  <ShieldCheck size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Household Staff Access (2 Active)
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Lakshmi R (Cook), Ramesh K (Driver)
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            {/* Audited Access Timeline */}
            <button
              type="button"
              onClick={onOpenActivityHistory}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300 flex items-center justify-center shrink-0">
                  <FileText size={16} />
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

        {/* Section 3: Financial & Utility Preferences */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Financial & Association Dues
          </span>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            <button
              type="button"
              onClick={onOpenBillsHub}
              className="w-full p-3.5 flex items-center justify-between hover:bg-slate-50 dark:hover:bg-obsidian-850 transition-colors text-left"
            >
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
                  <CreditCard size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    UPI Auto-Pay & GST Invoice
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    PhonePe / BHIM • 0% Gateway surcharge
                  </p>
                </div>
              </div>
              <ChevronRight size={15} className="text-slate-400" />
            </button>

            <div className="p-3.5 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
                  <Zap size={16} />
                </div>
                <div>
                  <h4 className="font-bold text-slate-900 dark:text-white">
                    Smart EB Low-Balance Warning
                  </h4>
                  <p className="text-[11px] text-slate-500">
                    Push notification when meter balance &lt; ₹200
                  </p>
                </div>
              </div>
              <input
                type="checkbox"
                checked={ebAlerts}
                onChange={(e) => {
                  setEbAlerts(e.target.checked);
                  showToast(e.target.checked ? 'EB Balance Alerts Enabled' : 'EB Alerts Disabled');
                }}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 border-slate-300 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Section 4: Society Switching & Logout */}
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
          <p className="text-[10px] font-mono font-bold text-slate-500 dark:text-slate-400">
            HUNT LOCKDOOR RESIDENTIAL OS • BUILD 2026.4
          </p>
          <p className="text-[10px] text-slate-500 dark:text-slate-400 mt-0.5">
            Zero brokerage • Perimeter isolated • AES-256 encrypted
          </p>
        </div>
      </div>

      {/* Resident Digital QR Modal */}
      {showQrModal && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-5 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col items-center text-center gap-4">
            <div className="flex items-center justify-between w-full">
              <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
                Official Resident Gate Badge
              </span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500 hover:text-slate-900"
              >
                ✕
              </button>
            </div>

            <div className="p-3 rounded-2xl bg-white border border-slate-200 shadow-md">
              <img
                src="https://api.qrserver.com/v1/create-qr-code/?size=180x180&data=HNT-RES-PLH-1204-SURIYA"
                alt="Resident QR Pass"
                className="w-44 h-44 rounded-xl"
              />
            </div>

            <div>
              <h3 className="text-base font-extrabold text-slate-900 dark:text-white">
                Suriya K • {activeFlat.unit}
              </h3>
              <p className="text-xs text-slate-500 mt-0.5 font-mono">
                PASSCODE: HNT-1204-OWNER
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold mt-1">
                ✓ Auto-validated at Gate 1, 2 & Turnstiles
              </p>
            </div>

            <button
              type="button"
              onClick={() => {
                showToast('Badge saved to Apple Wallet / Google Pay!');
                setShowQrModal(false);
              }}
              className="w-full h-11 rounded-2xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs transition-colors"
            >
              Add to Phone Wallet
            </button>
          </div>
        </div>
      )}
    </div>
  );
};