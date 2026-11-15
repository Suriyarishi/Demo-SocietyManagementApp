import React, { useState } from 'react';
import {
  Shield,
  Search,
  Bell,
  ChevronDown,
  UserPlus,
  Package,
  CreditCard,
  Users,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Zap,
  Clock,
  ArrowRight,
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
  X,
  Phone,
  Check,
  Calendar,
  Lock,
  Star,
  Send
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { FlatEntity } from './MultiFlatSelectorSheet';
import { TowerResidence3D, GateBarrier3D, SmartMeter3D } from '../../components/3d/Vector3DElements';

interface HomeScreenProps {
  activeFlat: FlatEntity;
  onOpenFlatSwitcher: () => void;
  onOpenSearch: () => void;
  onOpenProfileSettings: () => void;
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
}) => {
  // Gate Knock Simulator State
  const [hasGateKnock, setHasGateKnock] = useState<boolean>(true);
  const [gateKnockStatus, setGateKnockStatus] = useState<'pending' | 'allowed' | 'denied'>('pending');
  const [toastMessage, setToastMessage] = useState<string>('');

  // Core Residential Hub Segmented Tab State ('visitors' | 'bills' | 'society' | 'services')
  const [activeHubTab, setActiveHubTab] = useState<'visitors' | 'bills' | 'society' | 'services'>('visitors');
  
  // Interactive Modal State for Core Hub Actions
  const [activeHubModal, setActiveHubModal] = useState<string | null>(null);
  const [selectedService, setSelectedService] = useState<{
    title: string;
    category: string;
    basePrice: string;
    eta: string;
  } | null>(null);

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
          ======================================================== */}
      <div className="px-3.5 py-2.5 bg-white dark:bg-obsidian-900 border-b border-slate-200/80 dark:border-obsidian-800 shadow-sm sticky top-0 z-20">
        <div className="flex items-center justify-between gap-2 w-full">
          {/* Flat Switcher Pill (Auto-truncates cleanly) */}
          <button
            type="button"
            onClick={onOpenFlatSwitcher}
            className="flex items-center gap-2 px-2.5 py-1.5 rounded-xl bg-slate-100 dark:bg-obsidian-800 hover:bg-slate-200 dark:hover:bg-obsidian-750 transition-colors border border-slate-200 dark:border-obsidian-700 text-left flex-1 min-w-0 press-scale"
          >
            <TowerResidence3D size={22} glow={false} className="shrink-0" />
            <div className="min-w-0 flex-1 truncate">
              <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight truncate">
                {activeFlat.unit}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 block truncate leading-tight">
                {activeFlat.societyName}
              </span>
            </div>
            <ChevronDown size={13} className="text-slate-400 shrink-0 ml-0.5" />
          </button>

          {/* Quick Header Actions (Search, Alerts, SOS, Profile Settings) */}
          <div className="flex items-center gap-1 shrink-0">
            <button
              type="button"
              onClick={onOpenSearch}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-700 press-scale"
              title="Search"
            >
              <Search size={15} />
            </button>

            <button
              type="button"
              onClick={() => showToast('Notifications: All perimeter gate alerts synced')}
              className="relative w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-700 press-scale"
              title="Alerts"
            >
              <Bell size={15} />
              <span className="absolute top-1.5 right-1.5 w-1.5 h-1.5 rounded-full bg-cobalt-500" />
            </button>

            {/* Emergency SOS Quick Button */}
            <button
              type="button"
              onClick={onTriggerSOS}
              className="h-8 px-2 rounded-xl bg-crimson-600 hover:bg-crimson-700 active:bg-crimson-800 text-white flex items-center gap-0.5 text-[11px] font-extrabold shadow-sm transition-transform press-scale shrink-0"
              title="Emergency SOS"
            >
              <ShieldAlert size={13} />
              <span>SOS</span>
            </button>

            {/* Top Right Profile & Settings Button */}
            <button
              type="button"
              onClick={onOpenProfileSettings}
              className="relative w-8 h-8 rounded-xl bg-gradient-to-br from-cobalt-600 to-indigo-700 text-white font-extrabold text-[11px] flex items-center justify-center shadow-sm border border-white/20 press-scale shrink-0 ml-0.5"
              title="Resident Profile & Settings"
            >
              <span>SK</span>
              <span className="absolute -bottom-0.5 -right-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 border border-white dark:border-slate-900" />
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
        {/* Urgent Gate Knock Alert Banner (When visitor arrives) */}
        {hasGateKnock ? (
          <div className={`p-4 rounded-3xl border transition-all shadow-elevated relative overflow-hidden ${
            gateKnockStatus === 'allowed'
              ? 'bg-emerald-50 dark:bg-emerald-950/40 border-emerald-500 text-emerald-900 dark:text-emerald-100'
              : gateKnockStatus === 'denied'
              ? 'bg-crimson-50 dark:bg-crimson-950/40 border-crimson-500 text-crimson-900 dark:text-crimson-100'
              : 'bg-white dark:bg-obsidian-900 border-cobalt-500/80 ring-2 ring-cobalt-500/20'
          }`}>
            <div className="flex items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <div className="shrink-0">
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

              <span className="text-[10px] font-mono font-bold px-2 py-1 rounded-md bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300">
                00:45s
              </span>
            </div>

            {/* Split Approval Buttons */}
            {gateKnockStatus === 'pending' ? (
              <div className="mt-3 pt-2.5 border-t border-slate-100 dark:border-obsidian-800 flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleDenyGate}
                  className="flex-1 h-10 rounded-xl bg-slate-100 hover:bg-crimson-50 text-slate-700 hover:text-crimson-600 dark:bg-obsidian-800 dark:hover:bg-crimson-950/40 dark:text-slate-200 dark:hover:text-crimson-400 font-bold text-xs flex items-center justify-center gap-1.5 transition-colors border border-slate-200 dark:border-obsidian-700"
                >
                  <XCircle size={15} />
                  <span>Deny</span>
                </button>
                <button
                  type="button"
                  onClick={handleAllowGate}
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
                  onClick={() => setActiveHubModal('zepto_pass')}
                  className="bg-white dark:bg-obsidian-900 rounded-2xl p-2.5 flex flex-col items-center justify-between gap-1.5 border border-slate-100 dark:border-obsidian-800 shadow-sm hover:border-emerald-500 transition-all press-scale h-28"
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
                  onClick={() => setActiveHubModal('zomato_pass')}
                  className="bg-white dark:bg-obsidian-900 rounded-2xl p-2.5 flex flex-col items-center justify-between gap-1.5 border border-slate-100 dark:border-obsidian-800 shadow-sm hover:border-emerald-500 transition-all press-scale h-28"
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
                  onClick={() => setActiveHubModal('meter_recharge')}
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
                  onClick={() => setActiveHubModal('utility_bill')}
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
                  onClick={() => setActiveHubModal('pay_rent')}
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
                  onClick={() => setActiveHubModal('meter_consumption')}
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
                  onClick={() => setActiveHubModal('directory')}
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
                  onClick={onOpenAmenities || (() => setActiveHubModal('amenities'))}
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
                  onClick={onOpenForum || (() => setActiveHubModal('society_forum'))}
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
                  onClick={onOpenDirectory || (() => setActiveHubModal('directory'))}
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
                  onClick={onOpenNotices || (() => setActiveHubModal('notices'))}
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
                  onClick={onOpenPinless || (() => setActiveHubModal('pinless_entry'))}
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
                  onClick={onOpenMarketplace || (() => setActiveHubModal('marketplace'))}
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
                  onClick={() => {
                    setSelectedService({
                      title: 'Full House Cleaning',
                      category: 'Deep Cleaning',
                      basePrice: '₹1,499',
                      eta: '~15 mins'
                    });
                    setActiveHubModal('express_service_modal');
                  }}
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
                  onClick={() => {
                    setSelectedService({
                      title: 'Home & Balcony Painting',
                      category: 'Wall Finish',
                      basePrice: '₹799',
                      eta: '~20 mins'
                    });
                    setActiveHubModal('express_service_modal');
                  }}
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
                  onClick={() => {
                    setSelectedService({
                      title: 'Packers & Movers Clearance',
                      category: 'Shift Logistics',
                      basePrice: '₹2,499',
                      eta: 'Scheduled'
                    });
                    setActiveHubModal('express_service_modal');
                  }}
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
                  onClick={() => {
                    setSelectedService({
                      title: 'Emergency Plumbing Repair',
                      category: 'Leak & Fitting',
                      basePrice: '₹199',
                      eta: '~12 mins'
                    });
                    setActiveHubModal('express_service_modal');
                  }}
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
                  onClick={() => {
                    setSelectedService({
                      title: 'Door Lock & Woodwork',
                      category: 'Carpentry',
                      basePrice: '₹249',
                      eta: '~15 mins'
                    });
                    setActiveHubModal('express_service_modal');
                  }}
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
                  onClick={() => {
                    setSelectedService({
                      title: 'Bathroom Deep Scrubbing',
                      category: 'Sanitization',
                      basePrice: '₹449',
                      eta: '~15 mins'
                    });
                    setActiveHubModal('express_service_modal');
                  }}
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
                  onClick={() => {
                    setSelectedService({
                      title: 'Digital Rental Agreement',
                      category: 'Legal e-Stamp',
                      basePrice: '₹599',
                      eta: 'Digital PDF'
                    });
                    setActiveHubModal('express_service_modal');
                  }}
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
                <span className="text-slate-400 font-mono">Gate 2</span>
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
                <span className="text-slate-400 font-mono">RFID Fastag</span>
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
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Maintenance Due</span>
                <span className="text-xl font-extrabold font-mono text-white">₹4,250</span>
                <span className="text-[11px] text-slate-300 block mt-0.5">Water, Sinking, Guard</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-400 uppercase block font-semibold">Smart EB Meter</span>
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
              <span className="text-[10px] text-slate-400 font-medium">Tomorrow</span>
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
          5. IN-DEVICE INTERACTIVE MODALS FOR CORE HUB ACTIONS
          (Scoped strictly inside phone chassis with absolute positioning)
          ======================================================== */}

      {/* Modal A: Zepto Expected Courier Pass */}
      {activeHubModal === 'zepto_pass' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300 uppercase tracking-wider">
                Zepto Quick Delivery
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl border-2 border-emerald-500 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=140&q=80" alt="Zepto" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Pooja Sharma (Rider)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Order #ZPT-88402 • 10m Groceries</p>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">At Gate 1 Boom Barrier</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-obsidian-850 text-xs text-slate-600 dark:text-slate-300">
              Clear courier without calling guard intercom. Pre-approves 10-minute turnaround pass.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  showToast('Zepto delivery cleared at Gate 1');
                  setActiveHubModal(null);
                }}
                className="flex-1 h-11 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm press-scale"
              >
                <Check size={16} />
                <span>Allow At Boom Barrier</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal B: Zomato Expected Food Pass */}
      {activeHubModal === 'zomato_pass' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold px-2.5 py-1 rounded-full bg-crimson-100 text-crimson-700 dark:bg-crimson-950 dark:text-crimson-300 uppercase tracking-wider">
                Zomato Food Express
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-14 h-14 rounded-2xl border-2 border-emerald-500 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=140&q=80" alt="Zomato" className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Manoj Kumar (Rider)</h3>
                <p className="text-xs text-slate-500 mt-0.5">Order #ZOM-49102 • Dinner Unit 1204</p>
                <span className="text-[10px] font-mono font-bold text-emerald-600 dark:text-emerald-400">At Gate 2 Visitor Turnstile</span>
              </div>
            </div>
            <div className="p-3 rounded-xl bg-slate-50 dark:bg-obsidian-850 text-xs text-slate-600 dark:text-slate-300">
              Courier has thermal bag and helmet badge. 1-tap fast clearance opens barrier.
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  showToast('Zomato delivery cleared at Gate 2');
                  setActiveHubModal(null);
                }}
                className="flex-1 h-11 rounded-2xl bg-emerald-600 text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-sm press-scale"
              >
                <Check size={16} />
                <span>Allow Food Courier</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal C: Prepaid Smart Meter Fast Topup */}
      {activeHubModal === 'meter_recharge' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-extrabold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300 uppercase">
                Prepaid Meter Recharge
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div>
              <span className="text-xs text-slate-500 block">Sub-Meter #MTR-1204</span>
              <h3 className="text-xl font-bold font-mono text-slate-900 dark:text-white mt-0.5">Current Balance: ₹840.50</h3>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {[500, 1000, 2000].map((amt) => (
                <button
                  key={amt}
                  type="button"
                  onClick={() => {
                    showToast(`₹${amt} recharged to Smart Meter via UPI!`);
                    setActiveHubModal(null);
                  }}
                  className="p-3 rounded-2xl border border-slate-200 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-800 font-mono font-bold text-xs text-slate-900 dark:text-white hover:border-cobalt-500 transition-colors press-scale"
                >
                  +₹{amt}
                </button>
              ))}
            </div>
            <p className="text-[11px] text-slate-500">Auto-credited within 60 seconds via society substation gateway.</p>
          </div>
        </div>
      )}

      {/* Modal D: Meter Consumption Analytics */}
      {activeHubModal === 'meter_consumption' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest">
                Real-Time EB & Water Meter
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Unit 1204 Consumption</h3>
              <p className="text-xs text-slate-500 mt-0.5">Average: 18.4 kWh/day • Normal Residential Load</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 block uppercase">Water Meter</span>
                <span className="font-mono font-bold text-slate-800 dark:text-slate-100">420 Liters / Day</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 block uppercase">Projected Bill</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">₹1,480 / Month</span>
              </div>
            </div>
            <button
              onClick={() => setActiveHubModal(null)}
              className="w-full h-10 rounded-xl bg-slate-900 text-white font-bold text-xs"
            >
              Close Analytics
            </button>
          </div>
        </div>
      )}

      {/* Modal E: Utility Bills */}
      {activeHubModal === 'utility_bill' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest">
                Society Utility Invoices
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold block">Piped LPG Gas (Indraprastha)</span>
                  <span className="text-[11px] text-slate-500">Due Nov 28 • 14.2 m³</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">₹620</span>
              </div>
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
                <div>
                  <span className="font-bold block">DG Backup Generator AMC</span>
                  <span className="text-[11px] text-slate-500">Nov 2026 • 24.5 units</span>
                </div>
                <span className="font-mono font-bold text-slate-900 dark:text-white">₹380</span>
              </div>
            </div>
            <button
              onClick={() => {
                showToast('Utility payment initiated via Bharat BillPay UPI');
                setActiveHubModal(null);
              }}
              className="w-full h-11 rounded-2xl bg-cobalt-600 text-white font-bold text-xs"
            >
              Pay Total ₹1,000 via UPI
            </button>
          </div>
        </div>
      )}

      {/* Modal F: Pay Rent Direct UPI */}
      {activeHubModal === 'pay_rent' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                Direct Landlord Rent UPI
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div>
              <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight">Monthly Rent Transfer</h3>
              <p className="text-xs text-slate-500 mt-0.5">Landlord: R. Narayanan • HDFC A/C ••9402</p>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 flex items-baseline justify-between">
              <span className="text-xs text-slate-500">Rent Payable</span>
              <span className="text-2xl font-extrabold font-mono text-slate-900 dark:text-white">₹38,000</span>
            </div>
            <p className="text-[11px] text-slate-500">Includes auto-generated rent agreement receipt with landlord PAN for HRA tax exemption.</p>
            <button
              onClick={() => {
                showToast('Rent transferred! Official digital receipt sent to your email.');
                setActiveHubModal(null);
              }}
              className="w-full h-11 rounded-2xl bg-emerald-600 text-white font-bold text-xs"
            >
              Transfer ₹38,000 via UPI (0% Fee)
            </button>
          </div>
        </div>
      )}

      {/* Modal G: Amenities Booking */}
      {activeHubModal === 'amenities' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest">
                Clubhouse Amenities
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="flex flex-col gap-2">
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-obsidian-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold">Badminton Court 1</h4>
                  <p className="text-[10px] text-slate-500">Today • 6:00 PM – 7:00 PM</p>
                </div>
                <button
                  onClick={() => {
                    showToast('Slot booked! Pass added to your Gate QR.');
                    setActiveHubModal(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cobalt-50 text-cobalt-600 font-bold text-xs"
                >
                  Book Slot
                </button>
              </div>
              <div className="p-3 rounded-2xl border border-slate-200 dark:border-obsidian-800 flex items-center justify-between">
                <div>
                  <h4 className="text-xs font-bold">Swimming Pool (Adults)</h4>
                  <p className="text-[10px] text-slate-500">Open 6 AM – 9 PM • Heated</p>
                </div>
                <button
                  onClick={() => {
                    showToast('Pool access pass confirmed!');
                    setActiveHubModal(null);
                  }}
                  className="px-3 py-1.5 rounded-xl bg-cobalt-50 text-cobalt-600 font-bold text-xs"
                >
                  Get Pass
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal H: Society Forum & Polls */}
      {activeHubModal === 'society_forum' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                Resident Voting & Forum
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-800 text-xs">
              <span className="text-[10px] font-bold text-purple-700 dark:text-purple-300 block uppercase">Active Resolution Poll</span>
              <h4 className="font-bold text-slate-900 dark:text-white mt-1">Installation of 8 New EV Fast-Chargers in Basement 2</h4>
              <div className="mt-2.5 flex items-center gap-2">
                <button onClick={() => { showToast('Voted: YES on EV Resolution'); setActiveHubModal(null); }} className="flex-1 py-1.5 rounded-xl bg-emerald-600 text-white font-bold text-xs">
                  Vote Yes (84%)
                </button>
                <button onClick={() => { showToast('Voted: NO on EV Resolution'); setActiveHubModal(null); }} className="flex-1 py-1.5 rounded-xl bg-slate-200 dark:bg-obsidian-800 text-slate-700 dark:text-slate-300 font-bold text-xs">
                  Vote No
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal I: Directory & Intercom */}
      {activeHubModal === 'directory' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest">
                Society Directory & Intercom
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-obsidian-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Main Gate 1 Kiosk</h4>
                  <span className="text-[11px] text-slate-500">Ext: 101 • Guard Ratan</span>
                </div>
                <button onClick={() => showToast('Calling Gate 1 Intercom...')} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Phone size={15} />
                </button>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-obsidian-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Estate Management Desk</h4>
                  <span className="text-[11px] text-slate-500">Ext: 104 • Facility Officer</span>
                </div>
                <button onClick={() => showToast('Calling Estate Desk...')} className="w-8 h-8 rounded-lg bg-emerald-50 text-emerald-600 flex items-center justify-center">
                  <Phone size={15} />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal J: Notices & Circulars */}
      {activeHubModal === 'notices' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Official Society Notices
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 text-xs">
              <span className="text-[10px] text-slate-400 font-bold block">Ref #MC-CIR-2026-11</span>
              <h4 className="font-bold text-slate-900 dark:text-white mt-1">Solar Rooftop Inverter Maintenance Schedule</h4>
              <p className="text-[11px] text-slate-500 mt-1">Solar grid sync scheduled for Saturday 10 AM to 2 PM. Main common area power unaffected.</p>
            </div>
            <button onClick={() => setActiveHubModal(null)} className="w-full h-10 rounded-xl bg-slate-900 text-white font-bold text-xs">
              Close Circular
            </button>
          </div>
        </div>
      )}

      {/* Modal K: Multi-Day Visit Pass */}
      {activeHubModal === 'visit_pass' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest">
                Multi-Day Visitor Pass
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <p className="text-xs text-slate-500">For home tutors, relatives, or construction interior workers.</p>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 flex items-center justify-between text-xs font-mono font-bold">
              <span>PASSCODE: 849-204</span>
              <span className="text-emerald-600">Valid 7 Days</span>
            </div>
            <button
              onClick={() => {
                showToast('7-Day Visitor Pass copied & shared via WhatsApp!');
                setActiveHubModal(null);
              }}
              className="w-full h-11 rounded-2xl bg-cobalt-600 text-white font-bold text-xs"
            >
              Share WhatsApp QR Pass
            </button>
          </div>
        </div>
      )}

      {/* Modal L: Pinless ANPR & Bluetooth Entry */}
      {activeHubModal === 'pinless_entry' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest">
                ANPR & Bluetooth Fast-Pass
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="p-3 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 text-xs">
              <span className="font-bold text-emerald-800 dark:text-emerald-300 block">Registered Vehicle</span>
              <h4 className="font-mono font-bold text-sm text-slate-900 dark:text-white mt-0.5">KA-04-MB-1204 (Tesla Model 3)</h4>
              <span className="text-[11px] text-emerald-600 mt-1 block">✓ Auto-Open Boom Barrier Active</span>
            </div>
            <button onClick={() => setActiveHubModal(null)} className="w-full h-10 rounded-xl bg-slate-900 text-white font-bold text-xs">
              Done
            </button>
          </div>
        </div>
      )}

      {/* Modal M: Resident Marketplace */}
      {activeHubModal === 'marketplace' && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest">
                Resident Community Classifieds
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div className="flex flex-col gap-2 text-xs">
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-obsidian-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Solid Wood Study Desk (IKEA)</h4>
                  <span className="text-[11px] text-slate-500">Tower 3 • Flat 402</span>
                </div>
                <span className="font-mono font-bold text-emerald-600">₹2,800</span>
              </div>
              <div className="p-2.5 rounded-xl border border-slate-200 dark:border-obsidian-800 flex items-center justify-between">
                <div>
                  <h4 className="font-bold">Home-Baked Sourdough Loaf</h4>
                  <span className="text-[11px] text-slate-500">Tower 1 • Fresh Daily</span>
                </div>
                <span className="font-mono font-bold text-emerald-600">₹180</span>
              </div>
            </div>
            <button onClick={() => setActiveHubModal(null)} className="w-full h-10 rounded-xl bg-slate-900 text-white font-bold text-xs">
              Close Marketplace
            </button>
          </div>
        </div>
      )}

      {/* Modal N: Express 15m Home Care Service Booking */}
      {activeHubModal === 'express_service_modal' && selectedService && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 text-slate-900 dark:text-white shadow-2xl flex flex-col gap-3.5">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest flex items-center gap-1">
                <Sparkles size={13} />
                <span>15-Minute Response Guaranteed</span>
              </span>
              <button onClick={() => setActiveHubModal(null)} className="w-7 h-7 rounded-full bg-slate-100 dark:bg-obsidian-800 flex items-center justify-center text-slate-500">
                <X size={15} />
              </button>
            </div>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-wider block">
                {selectedService.category}
              </span>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
                {selectedService.title}
              </h3>
            </div>
            <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 flex items-center justify-between text-xs">
              <div>
                <span className="text-[10px] text-slate-400 uppercase block">Society Rate</span>
                <span className="text-lg font-extrabold font-mono text-slate-900 dark:text-white">{selectedService.basePrice}</span>
              </div>
              <div className="text-right">
                <span className="text-[10px] text-slate-400 uppercase block">Arrival SLA</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{selectedService.eta}</span>
              </div>
            </div>
            <p className="text-[11px] text-slate-500 leading-relaxed">
              Assigned to pre-vetted association maintenance team. Digital signoff required upon completion.
            </p>
            <button
              onClick={() => {
                showToast(`Technician booked for ${selectedService.title}! ETA ~15 mins`);
                setActiveHubModal(null);
              }}
              className="w-full h-11 rounded-2xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs shadow-md shadow-cobalt-600/30 transition-transform press-scale"
            >
              Confirm Dispatch to Unit 1204
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
