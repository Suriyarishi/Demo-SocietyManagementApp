import React, { useState } from 'react';
import {
  Shield,
  Search,
  Bell,
  ChevronDown,
  UserPlus,
  Package,
  CreditCard,
  CheckCircle,
  XCircle,
  Zap,
  Clock,
  ShieldAlert,
  ChevronRight,
  FileText,
  Building2,
  Wrench,
  Sparkles,
  ArrowUpRight,
  RefreshCw,
  Receipt,
  Home,
  Gauge,
  Coffee,
  MessagesSquare,
  BookUser,
  HardHat,
  Megaphone,
  Ticket,
  Smartphone,
  Store,
  Paintbrush,
  Truck,
  Hammer,
  Droplets,
  FileSignature,
  Lock,
  Check,
  X,
  Phone,
  ShoppingCart,
  DoorClosed,
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { FlatEntity } from './MultiFlatSelectorSheet';
import { TowerResidence3D, GateBarrier3D, SmartMeter3D } from '../../components/3d/Vector3DElements';

interface HomeScreenProps {
  activeFlat: FlatEntity;
  onOpenFlatSwitcher: () => void;
  onOpenSearch: () => void;
  onOpenProfileSettings?: () => void;
  onOpenActivityHistory: () => void;
  onNavigateTab: (tab: 'home' | 'gate' | 'services' | 'community') => void;
  onTriggerSOS: () => void;
  onPreApproveGuest: () => void;
  onDeliveryPass: () => void;
  onPayBills: () => void;
  onDailyHelp: () => void;
  onOpenAmenities?: () => void;
  onOpenNotices?: () => void;
  onOpenForum?: () => void;
  onOpenDirectory?: () => void;
  onOpenPinless?: () => void;
  onOpenMarketplace?: () => void;
  onOpenSmartMeter?: () => void;
  onOpenItemizedBill?: () => void;
  onSelectExpressService?: (service: { title: string; category: string; basePrice: string; eta: string }) => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  activeFlat,
  onOpenFlatSwitcher,
  onOpenSearch,
  onOpenProfileSettings,
  onOpenActivityHistory,
  onNavigateTab,
  onTriggerSOS,
  onPreApproveGuest,
  onDeliveryPass,
  onPayBills,
  onDailyHelp,
  onOpenAmenities,
  onOpenNotices,
  onOpenForum,
  onOpenDirectory,
  onOpenPinless,
  onOpenMarketplace,
  onOpenSmartMeter,
  onOpenItemizedBill,
  onSelectExpressService,
}) => {
  // Gate Knock Simulator State
  const [hasGateKnock, setHasGateKnock] = useState<boolean>(true);
  const [gateKnockStatus, setGateKnockStatus] = useState<'pending' | 'allowed' | 'denied'>('pending');
  const [showGateKnockModal, setShowGateKnockModal] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Core Residential Hub Segmented Tab State ('visitors' | 'bills' | 'society' | 'services')
  const [activeHubTab, setActiveHubTab] = useState<'visitors' | 'bills' | 'society' | 'services'>('visitors');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handleAllowGate = () => {
    setGateKnockStatus('allowed');
    showToast('Gate cleared: Sandeep M (Amazon Delivery) allowed entry at Gate 1');
    setTimeout(() => setHasGateKnock(false), 1200);
  };

  const handleDenyGate = () => {
    setGateKnockStatus('denied');
    showToast('Entry denied: Gate Guard alerted to reject entry');
    setTimeout(() => setHasGateKnock(false), 1200);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between text-left animate-in fade-in duration-300 relative">
      {/* ========================================================
          1. TOP APP BAR & RESIDENT CONCIERGE HEADER
          Clean, ergonomic, and untruncated header layout
          ======================================================== */}
      <div className="px-3 py-2 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-white/10 shadow-xs sticky top-0 z-20">
        <div className="flex items-center justify-between gap-2 w-full">
          {/* Flat Switcher Pill (Optimized for full legibility without truncation) */}
          <button
            type="button"
            onClick={onOpenFlatSwitcher}
            className="flex items-center gap-2 px-2.5 py-1 rounded-2xl bg-slate-50 hover:bg-slate-100 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 transition-all border border-slate-200/80 dark:border-white/10 text-left flex-1 min-w-0 press-scale shadow-2xs group"
            title="Switch Residence Unit"
          >
            <div className="w-7 h-7 rounded-xl bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] flex items-center justify-center shrink-0 border border-[#04BB49]/20 group-hover:scale-105 transition-transform">
              <Building2 size={15} strokeWidth={2.4} />
            </div>
            <div className="min-w-0 flex-1">
              <span className="text-xs font-extrabold text-slate-900 dark:text-white block leading-tight truncate">
                {activeFlat.unit}
              </span>
              <span className="text-[10px] font-medium text-slate-500 dark:text-slate-400 block truncate leading-tight mt-0.5">
                {activeFlat.societyName}
              </span>
            </div>
            <ChevronDown size={13} className="text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-200 shrink-0 ml-0.5 transition-colors" />
          </button>

          {/* Quick Header Actions (Search, Alerts, SOS, Profile Settings) */}
          <div className="flex items-center gap-1.5 shrink-0">
            {/* Search Quick Action */}
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-white/10 press-scale shrink-0"
              title="Search community, bills, & services"
            >
              <Search size={15} strokeWidth={2.2} />
            </button>

            {/* Notification Alerts */}
            <button
              type="button"
              onClick={() => showToast('Notifications: All perimeter gate alerts synced')}
              className="relative w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/80 dark:border-white/10 press-scale shrink-0"
              title="Gate & Society Alerts"
            >
              <Bell size={15} strokeWidth={2.2} />
              <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#04BB49] ring-2 ring-white dark:ring-obsidian-900 animate-pulse" />
            </button>

            {/* Emergency SOS Quick Trigger */}
            <button
              type="button"
              onClick={onTriggerSOS}
              className="h-8 px-2 rounded-xl bg-crimson-600 hover:bg-crimson-700 active:bg-crimson-800 text-white flex items-center gap-1 text-[10.5px] font-black tracking-wide shadow-xs transition-transform press-scale shrink-0"
              title="Emergency SOS Alarm"
            >
              <ShieldAlert size={13} strokeWidth={2.6} />
              <span>SOS</span>
            </button>
          </div>
        </div>
      </div>

      {/* Floating Action Toast (Anchored strictly inside phone viewport) */}
      {toastMessage && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMessage}</span>
        </div>
      )}

      {/* ========================================================
          2. MAIN CONTENT STREAM
          ======================================================== */}
      <div className="p-3.5 flex flex-col gap-4">
        {/* Urgent Gate Knock Alert Banner (When visitor arrives - Click for Full-Screen View) */}
        {hasGateKnock ? (
          <div
            onClick={() => setShowGateKnockModal(true)}
            className={`p-4 rounded-3xl border transition-all shadow-elevated relative overflow-hidden cursor-pointer group ${
              gateKnockStatus === 'allowed'
                ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100'
                : gateKnockStatus === 'denied'
                ? 'bg-crimson-50 dark:bg-crimson-950/40 border-crimson-500 text-crimson-900 dark:text-crimson-100'
                : 'bg-white dark:bg-obsidian-900 border-cobalt-500/80 ring-2 ring-cobalt-500/20 hover:border-emerald-500'
            }`}
            title="Click to expand full-screen gate knock approval view"
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="shrink-0 group-hover:scale-105 transition-transform">
                  <GateBarrier3D size={48} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest">
                      GATE KNOCK • GATE 1
                    </span>
                  </div>
                  <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5">
                    Amazon Courier (Sandeep M)
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400">
                    At Boom Barrier • Package for Unit 1204
                  </p>
                </div>
              </div>

              <div className="flex flex-col items-end gap-1">
                <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300">
                  00:45s
                </span>
                <span className="text-[9.5px] font-bold text-[#04BB49] group-hover:underline flex items-center gap-0.5">
                  <span>Full Screen</span>
                  <ChevronRight size={11} />
                </span>
              </div>
            </div>

            {/* Split Approval Buttons */}
            {gateKnockStatus === 'pending' ? (
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-obsidian-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDenyGate();
                  }}
                  className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-crimson-50 text-slate-700 hover:text-crimson-600 dark:bg-obsidian-800 dark:hover:bg-crimson-950/40 dark:text-slate-200 dark:hover:text-crimson-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-obsidian-700"
                >
                  <XCircle size={15} />
                  <span>Deny</span>
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleAllowGate();
                  }}
                  className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 active:bg-emerald-800 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm transition-transform press-scale"
                >
                  <CheckCircle size={15} />
                  <span>Allow Entry</span>
                </button>
              </div>
            ) : (
              <div className="mt-2.5 pt-2 text-xs font-bold text-center">
                {gateKnockStatus === 'allowed' ? '✓ Allowed — Gate 1 barrier opening' : '✕ Denied — Guard notified'}
              </div>
            )}
          </div>
        ) : (
          <div className="p-3 rounded-2xl bg-slate-100/70 dark:bg-obsidian-900/40 border border-slate-200/60 dark:border-obsidian-800 flex items-center justify-between text-xs text-slate-500">
            <span>Perimeter Secure • Zero visitors waiting</span>
            <button
              onClick={() => {
                setHasGateKnock(true);
                setGateKnockStatus('pending');
              }}
              className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline"
            >
              Simulate Gate Knock
            </button>
          </div>
        )}

        {/* ========================================================
            3. CORE RESIDENTIAL COMMAND HUB (ADAPTIVE 4-TAB DOCK)
            Matching User Reference Screenshots (Visitors / My Bills / Society / Services 15m ⚡)
            ======================================================== */}
        <div className="p-3.5 rounded-[28px] bg-gradient-to-b from-[#EAF9F3] via-[#F4FDF9] to-[#E7F8F1] dark:from-[#081812] dark:via-[#07130F] dark:to-[#081712] border border-[#BDEBD9]/80 dark:border-emerald-900/40 shadow-sm flex flex-col gap-3">
          
          {/* Master Segmented Floating Tab Bar */}
          <div className="bg-white dark:bg-obsidian-900 rounded-[22px] p-1 shadow-[0_2px_8px_rgba(0,0,0,0.03)] border border-slate-100 dark:border-obsidian-800 flex items-center justify-between gap-1 select-none">
            {/* Tab 1: Visitors */}
            <button
              type="button"
              onClick={() => setActiveHubTab('visitors')}
              className={`flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all press-scale ${
                activeHubTab === 'visitors'
                  ? 'bg-[#D7F5E9] dark:bg-emerald-950/70 border border-[#A2E6CD] dark:border-emerald-600/50 text-slate-900 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 font-semibold'
              }`}
            >
              <Shield size={18} strokeWidth={2.4} />
              <span className="text-[11px] leading-tight">Visitors</span>
            </button>

            {/* Tab 2: My Bills */}
            <button
              type="button"
              onClick={() => setActiveHubTab('bills')}
              className={`flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all press-scale ${
                activeHubTab === 'bills'
                  ? 'bg-[#D7F5E9] dark:bg-emerald-950/70 border border-[#A2E6CD] dark:border-emerald-600/50 text-slate-900 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 font-semibold'
              }`}
            >
              <CreditCard size={18} strokeWidth={2.2} />
              <span className="text-[11px] leading-tight">My Bills</span>
            </button>

            {/* Tab 3: Society */}
            <button
              type="button"
              onClick={() => setActiveHubTab('society')}
              className={`flex-1 py-1.5 px-2 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all press-scale ${
                activeHubTab === 'society'
                  ? 'bg-[#D7F5E9] dark:bg-emerald-950/70 border border-[#A2E6CD] dark:border-emerald-600/50 text-slate-900 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 font-semibold'
              }`}
            >
              <Building2 size={18} strokeWidth={2.2} />
              <span className="text-[11px] leading-tight">Society</span>
            </button>

            {/* Tab 4: Services (15m ⚡) */}
            <button
              type="button"
              onClick={() => setActiveHubTab('services')}
              className={`flex-1 py-1.5 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 transition-all press-scale relative ${
                activeHubTab === 'services'
                  ? 'bg-[#D7F5E9] dark:bg-emerald-950/70 border border-[#A2E6CD] dark:border-emerald-600/50 text-slate-900 dark:text-white font-bold shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 font-semibold'
              }`}
            >
              <div className="flex items-center gap-1">
                <Wrench size={16} strokeWidth={2.2} />
                <span className="px-1.5 py-0.5 rounded-full bg-emerald-500 text-white text-[8px] font-extrabold leading-none">
                  15m ⚡
                </span>
              </div>
              <span className="text-[11px] leading-tight">Services</span>
            </button>
          </div>

          {/* ========================================================
              TAB VIEW 1: VISITORS (GATE 1 & 2 LIVE • 2 EXPECTED)
              ======================================================== */}
          {activeHubTab === 'visitors' && (
            <div className="flex flex-col gap-2.5 animate-in fade-in duration-200">
              <div className="flex items-center gap-1.5 px-1">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E6555] dark:text-emerald-400">
                  GATE 1 & 2 LIVE • 2 EXPECTED
                </span>
              </div>

              {/* 4 Horizontal Action & Delivery Cards */}
              <div className="grid grid-cols-4 gap-2">
                {/* 1. Pre-Approve Card */}
                <button
                  type="button"
                  onClick={onPreApproveGuest}
                  className="bg-white dark:bg-obsidian-900 rounded-2xl p-2.5 flex flex-col items-center justify-between gap-1.5 border border-slate-100 dark:border-obsidian-800 shadow-sm hover:border-emerald-500 transition-all press-scale h-28"
                >
                  <div className="w-11 h-11 rounded-full border border-slate-200 dark:border-obsidian-700 flex items-center justify-center text-slate-700 dark:text-slate-200 bg-slate-50 dark:bg-obsidian-850 mt-1">
                    <UserPlus size={19} />
                  </div>
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
                    Pre-Approve
                  </span>
                </button>

                {/* 2. Zepto Card */}
                <button
                  type="button"
                  onClick={onDeliveryPass}
                  className="bg-white dark:bg-obsidian-900 rounded-2xl p-2.5 flex flex-col items-center justify-between gap-1.5 border border-slate-100 dark:border-obsidian-800 shadow-sm hover:border-emerald-500 transition-all press-scale h-28"
                  title="Issue Instant Delivery Pass for Zepto"
                >
                  <div className="w-11 h-11 rounded-full border-2 border-emerald-500 p-0.5 overflow-hidden bg-slate-100 mt-1">
                    <img
                      src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80"
                      alt="Zepto Delivery"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
                    Zepto
                  </span>
                </button>

                {/* 3. Zomato Card */}
                <button
                  type="button"
                  onClick={onDeliveryPass}
                  className="bg-white dark:bg-obsidian-900 rounded-2xl p-2.5 flex flex-col items-center justify-between gap-1.5 border border-slate-100 dark:border-obsidian-800 shadow-sm hover:border-emerald-500 transition-all press-scale h-28"
                  title="Issue Instant Delivery Pass for Zomato"
                >
                  <div className="w-11 h-11 rounded-full border-2 border-emerald-500 p-0.5 overflow-hidden bg-slate-100 mt-1">
                    <img
                      src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80"
                      alt="Zomato Delivery"
                      className="w-full h-full rounded-full object-cover"
                    />
                  </div>
                  <span className="text-[11.5px] font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
                    Zomato
                  </span>
                </button>

                {/* 4. Gate Log History Card */}
                <button
                  type="button"
                  onClick={onOpenActivityHistory}
                  className="bg-white dark:bg-obsidian-900 rounded-2xl p-2.5 flex flex-col items-center justify-between gap-1.5 border border-slate-100 dark:border-obsidian-800 shadow-sm hover:border-emerald-500 transition-all press-scale h-28"
                >
                  <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-obsidian-800 border border-slate-200 dark:border-obsidian-750 flex items-center justify-center text-slate-700 dark:text-slate-200 mt-1">
                    <ArrowUpRight size={18} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-600 dark:text-slate-400 text-center leading-tight">
                    Gate Log History
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB VIEW 2: MY BILLS (5 CIRCULAR FEATURE ACTIONS)
              ======================================================== */}
          {activeHubTab === 'bills' && (
            <div className="animate-in fade-in duration-200 py-1">
              <div className="grid grid-cols-4 gap-y-3.5 gap-x-2">
                {/* 1. Maintenance Bill */}
                <button
                  type="button"
                  onClick={onPayBills}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <FileText size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Maintenance Bill
                  </span>
                </button>

                {/* 2. Meter Recharge */}
                <button
                  type="button"
                  onClick={onOpenSmartMeter || onPayBills}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <RefreshCw size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Meter Recharge
                  </span>
                </button>

                {/* 3. Utility */}
                <button
                  type="button"
                  onClick={onOpenItemizedBill || onPayBills}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Receipt size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Utility
                  </span>
                </button>

                {/* 4. Pay Rent */}
                <button
                  type="button"
                  onClick={onPayBills}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Home size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Pay Rent
                  </span>
                </button>

                {/* 5. Meter Consumption */}
                <button
                  type="button"
                  onClick={onOpenSmartMeter || onPayBills}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Gauge size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Meter Consumption
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB VIEW 3: SOCIETY (8 FEATURES + COMMUNITY SUITE ↗)
              ======================================================== */}
          {activeHubTab === 'society' && (
            <div className="flex flex-col gap-2.5 animate-in fade-in duration-200 py-1">
              <div className="flex items-center justify-between text-xs px-1">
                <span className="text-[10px] font-extrabold uppercase tracking-wider text-[#2E6555] dark:text-emerald-400">
                  SOCIETY LIVING HUB • 8 FEATURES
                </span>
                <button
                  type="button"
                  onClick={onOpenDirectory || onOpenForum}
                  className="text-[11px] font-bold text-crimson-600 dark:text-crimson-400 hover:underline flex items-center gap-0.5"
                >
                  <span>Community Suite</span>
                  <ArrowUpRight size={13} />
                </button>
              </div>

              {/* 8 Circular Action Buttons (2 Rows of 4) */}
              <div className="grid grid-cols-4 gap-y-3.5 gap-x-2">
                {/* 1. Amenities */}
                <button
                  type="button"
                  onClick={onOpenAmenities}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Coffee size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Amenities
                  </span>
                </button>

                {/* 2. Society Forum */}
                <button
                  type="button"
                  onClick={onOpenForum}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <MessagesSquare size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Society Forum
                  </span>
                </button>

                {/* 3. Directory */}
                <button
                  type="button"
                  onClick={onOpenDirectory}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <BookUser size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Directory
                  </span>
                </button>

                {/* 4. Daily Helps */}
                <button
                  type="button"
                  onClick={onDailyHelp}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <HardHat size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Daily Helps
                  </span>
                </button>

                {/* 5. Notices */}
                <button
                  type="button"
                  onClick={onOpenNotices}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Megaphone size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Notices
                  </span>
                </button>

                {/* 6. Visit Pass */}
                <button
                  type="button"
                  onClick={onPreApproveGuest}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Ticket size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Visit Pass
                  </span>
                </button>

                {/* 7. Pinless Entry */}
                <button
                  type="button"
                  onClick={onOpenPinless}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Smartphone size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Pinless Entry
                  </span>
                </button>

                {/* 8. Market Place */}
                <button
                  type="button"
                  onClick={onOpenMarketplace}
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Store size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Market Place
                  </span>
                </button>
              </div>
            </div>
          )}

          {/* ========================================================
              TAB VIEW 4: SERVICES (7 ON-DEMAND CARE ACTIONS)
              ======================================================== */}
          {activeHubTab === 'services' && (
            <div className="animate-in fade-in duration-200 py-1">
              <div className="grid grid-cols-4 gap-y-3.5 gap-x-2">
                {/* 1. Full House Cleaning */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectExpressService?.({
                      title: 'Full House Cleaning',
                      category: 'Deep Cleaning',
                      basePrice: '₹1,499',
                      eta: '~15 mins',
                    }) || onNavigateTab('services')
                  }
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Sparkles size={20} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Full House Cleaning
                  </span>
                </button>

                {/* 2. Painting */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectExpressService?.({
                      title: 'Home & Balcony Painting',
                      category: 'Wall Finish',
                      basePrice: '₹799',
                      eta: '~20 mins',
                    }) || onNavigateTab('services')
                  }
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Paintbrush size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Painting
                  </span>
                </button>

                {/* 3. Packers & Movers */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectExpressService?.({
                      title: 'Packers & Movers Clearance',
                      category: 'Shift Logistics',
                      basePrice: '₹2,499',
                      eta: 'Scheduled',
                    }) || onNavigateTab('services')
                  }
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Truck size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Packers & Movers
                  </span>
                </button>

                {/* 4. Plumbing */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectExpressService?.({
                      title: 'Emergency Plumbing Repair',
                      category: 'Leak & Fitting',
                      basePrice: '₹199',
                      eta: '~12 mins',
                    }) || onNavigateTab('services')
                  }
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Wrench size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Plumbing
                  </span>
                </button>

                {/* 5. Carpenter */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectExpressService?.({
                      title: 'Door Lock & Woodwork',
                      category: 'Carpentry',
                      basePrice: '₹249',
                      eta: '~15 mins',
                    }) || onNavigateTab('services')
                  }
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Hammer size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Carpenter
                  </span>
                </button>

                {/* 6. Bathroom Cleaning */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectExpressService?.({
                      title: 'Bathroom Deep Scrubbing',
                      category: 'Sanitization',
                      basePrice: '₹449',
                      eta: '~15 mins',
                    }) || onNavigateTab('services')
                  }
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <Droplets size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Bathroom Cleaning
                  </span>
                </button>

                {/* 7. Rental Agreement */}
                <button
                  type="button"
                  onClick={() =>
                    onSelectExpressService?.({
                      title: 'Digital Rental Agreement',
                      category: 'Legal e-Stamp',
                      basePrice: '₹599',
                      eta: 'Digital PDF',
                    }) || onNavigateTab('services')
                  }
                  className="flex flex-col items-center text-center gap-1.5 press-scale"
                >
                  <div className="w-12 h-12 rounded-full bg-[#FFF5F5] dark:bg-[#1C1822] border border-[#FFE3E3] dark:border-[#382633] flex items-center justify-center text-slate-800 dark:text-slate-100 shadow-sm">
                    <FileSignature size={19} strokeWidth={2.0} />
                  </div>
                  <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 leading-tight">
                    Rental Agreement
                  </span>
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Daily Help Today Strip */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
              Household Staff Today
            </h3>
            <button
              onClick={onDailyHelp}
              className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline flex items-center gap-0.5"
            >
              <span>Manage</span>
              <ChevronRight size={13} />
            </button>
          </div>

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-0.5">
            {/* Staff Card 1: Cook */}
            <div className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient min-w-[200px] shrink-0 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-emerald-100 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-400 font-bold flex items-center justify-center text-xs">
                  LR
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Lakshmi R
                  </h4>
                  <p className="text-[11px] text-slate-500">Cook • Morning</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Inside (7:45 AM)
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-mono">Gate 2</span>
              </div>
            </div>

            {/* Staff Card 2: Driver */}
            <div className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient min-w-[200px] shrink-0 text-left">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-cobalt-100 dark:bg-cobalt-950/60 text-cobalt-700 dark:text-cobalt-400 font-bold flex items-center justify-center text-xs">
                  RK
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Ramesh K
                  </h4>
                  <p className="text-[11px] text-slate-500">Driver • Full-Day</p>
                </div>
              </div>
              <div className="mt-2.5 pt-2 border-t border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-[11px]">
                <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Inside (8:15 AM)
                </span>
                <span className="text-slate-500 dark:text-slate-400 font-mono">RFID Fastag</span>
              </div>
            </div>
          </div>
        </div>

        {/* Financials & Smart EB Meter Widget */}
        <div className="p-4 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated">
          <div className="flex items-center justify-between">
            <span className="text-[11px] font-bold text-cobalt-400 uppercase tracking-widest flex items-center gap-1.5">
              <Zap size={14} />
              <span>Society Financials & EB Meter</span>
            </span>
            <span className="text-[10px] px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 border border-amber-500/40 font-bold uppercase">
              Due in 3 Days
            </span>
          </div>

          <div className="mt-3 flex items-center justify-between gap-2 pt-3 border-t border-white/10">
            <div className="flex-1 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Maintenance Due</span>
                <span className="text-xl font-extrabold font-mono text-white">₹4,250</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">Water, Sinking, Guard</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Smart EB Meter</span>
                <span className="text-xl font-extrabold font-mono text-emerald-400">₹840.50</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">~4 Days Power</span>
              </div>
            </div>
            <div className="shrink-0 pl-1">
              <SmartMeter3D size={54} />
            </div>
          </div>

          <div className="mt-3.5 pt-3 border-t border-white/10 flex items-center gap-2">
            <button
              onClick={onPayBills}
              className="flex-1 h-10 rounded-xl bg-cobalt-600 hover:bg-cobalt-500 text-white font-bold text-xs flex items-center justify-center gap-1.5 transition-colors shadow-sm"
            >
              <span>Pay Dues (0% UPI)</span>
            </button>
            <button
              onClick={() => showToast('Smart EB recharge simulator: ₹500 added to meter')}
              className="h-10 px-3.5 rounded-xl bg-white/10 hover:bg-white/20 text-slate-200 font-bold text-xs flex items-center justify-center transition-colors border border-white/15"
            >
              Recharge EB
            </button>
          </div>
        </div>

        {/* Recent Notice Banner */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex items-start gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <FileText size={18} />
          </div>
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-amber-100 dark:bg-amber-950/80 text-amber-800 dark:text-amber-400 uppercase">
                Official Notice
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium">Tomorrow</span>
            </div>
            <h4 className="text-xs font-bold text-slate-900 dark:text-white mt-0.5 leading-snug">
              Scheduled Overhead Water Tank Cleaning (Tower 1 & 2)
            </h4>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
              Water supply will be paused between 9:00 AM – 1:00 PM.
            </p>
          </div>
          <button
            onClick={() => showToast('Notice acknowledged! Your response is logged with the Committee.')}
            className="text-[10px] font-bold px-2.5 py-1.5 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 text-slate-700 dark:text-slate-200 shrink-0 self-center transition-colors"
          >
            Acknowledge
          </button>
        </div>

        {/* Recent Audit Timeline Link */}
        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-300 font-bold">
            <Clock size={15} className="text-cobalt-500" />
            <span>Audited Perimeter Timeline</span>
          </div>
          <button
            onClick={onOpenActivityHistory}
            className="text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline flex items-center gap-0.5"
          >
            <span>View All Activity</span>
            <ChevronRight size={13} />
          </button>
        </div>
      </div>

      {/* ========================================================
          FULL SCREEN GATE KNOCK VIEW (EXACT SCREENSHOT REPLICA)
          Triggered when clicking the Gate Knock Card
          ======================================================== */}
      {showGateKnockModal && (
        <div className="absolute inset-0 z-50 bg-gradient-to-b from-[#1C1308]/95 via-[#2A1D0D]/95 to-[#120C05]/98 backdrop-blur-md flex flex-col items-center justify-center p-4 animate-in fade-in duration-200 select-none">
          {/* Subtle Ambient Radial Gold Glow Overlay */}
          <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-amber-600/15 via-transparent to-transparent pointer-events-none" />

          {/* Top Center Circular Close Button */}
          <button
            type="button"
            onClick={() => setShowGateKnockModal(false)}
            className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all press-scale mb-4 shrink-0 shadow-lg relative z-10"
            title="Close Gate Knock View"
          >
            <X size={18} strokeWidth={2.4} />
          </button>

          {/* Main Floating Modal Card (Exact Screenshot Match) */}
          <div className="w-full max-w-[342px] rounded-[28px] bg-white text-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] p-5 relative overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200 text-left">
            {/* Header: Unit, Society & Red HOOD Brand Badge */}
            <div className="flex items-start justify-between">
              <div>
                <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block leading-tight">
                  {activeFlat.unit ? activeFlat.unit.toUpperCase().replace(/\s+/g, '-') : 'TOWER-10-G003'}
                </span>
                <span className="text-sm font-black tracking-tight uppercase text-slate-900 block leading-tight mt-1">
                  {activeFlat.societyName ? activeFlat.societyName.toUpperCase() : 'LA RESIDENTIA'}
                </span>
              </div>

              {/* Red Infinity HOOD Brand Badge */}
              <div className="w-11 h-11 rounded-2xl bg-[#DC2626] text-white flex flex-col items-center justify-center shadow-md shrink-0">
                <span className="font-black text-xl leading-none">∞</span>
                <span className="text-[7.5px] font-black tracking-widest uppercase leading-none mt-0.5">HOOD</span>
              </div>
            </div>

            {/* Dashed Separator Line */}
            <div className="w-full border-b border-dashed border-slate-200 my-4" />

            {/* Courier Info Row */}
            <div className="flex items-center justify-between">
              <div>
                <div className="flex items-baseline gap-1">
                  <span className="text-lg font-bold text-slate-900">Kunal</span>
                  <span className="text-xs text-slate-400 font-medium">from</span>
                </div>
                <div className="flex items-center gap-2 mt-1.5">
                  <div className="w-7 h-7 rounded-lg bg-[#232F3E] text-white flex items-center justify-center p-1 shrink-0 shadow-xs">
                    <ShoppingCart size={15} className="text-[#FF9900]" />
                  </div>
                  <span className="text-base font-extrabold text-slate-900 tracking-tight">Amazon</span>
                </div>
              </div>

              {/* Courier Avatar & Floating Green Call Button */}
              <div className="relative shrink-0">
                <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-slate-200 shadow-sm bg-slate-100">
                  <img
                    src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=160&q=80"
                    alt="Courier Kunal"
                    className="w-full h-full object-cover"
                  />
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    showToast('Calling Kunal (Amazon Delivery)...');
                  }}
                  className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-[#16A34A] hover:bg-[#15803D] text-white flex items-center justify-center shadow-md border-2 border-white transition-transform active:scale-90"
                  title="Call Courier"
                >
                  <Phone size={13} className="fill-current" />
                </button>
              </div>
            </div>

            {/* Sub-Card Action Box */}
            <div className="mt-4 p-4 rounded-2xl bg-[#F8FAFC] border border-slate-200/80 flex flex-col gap-3">
              <p className="text-xs text-slate-600 text-center leading-relaxed">
                Your delivery is <span className="text-[#DC2626] font-bold">waiting at the gate</span> for approval
              </p>

              {/* Leave with security button */}
              <button
                type="button"
                onClick={() => {
                  showToast('Instruction recorded: Leave package with Gate 1 Security');
                  setShowGateKnockModal(false);
                  setHasGateKnock(false);
                }}
                className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200/90 shadow-2xs flex items-center justify-center gap-2 transition-all press-scale"
              >
                <DoorClosed size={16} className="text-slate-600" />
                <span>Leave with security</span>
              </button>

              {/* Deny & Approve Dual Buttons */}
              <div className="grid grid-cols-2 gap-2.5 pt-0.5">
                <button
                  type="button"
                  onClick={() => {
                    handleDenyGate();
                    setShowGateKnockModal(false);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-transform press-scale"
                >
                  <X size={15} strokeWidth={2.8} />
                  <span>Deny</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    handleAllowGate();
                    setShowGateKnockModal(false);
                  }}
                  className="py-2.5 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-transform press-scale"
                >
                  <Check size={15} strokeWidth={2.8} />
                  <span>Approve</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
