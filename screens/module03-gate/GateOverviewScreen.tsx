import React, { useState } from 'react';
import {
  ShieldCheck,
  UserPlus,
  Package,
  Car,
  PhoneCall,
  QrCode,
  Clock,
  ChevronRight,
  CheckCircle2,
  AlertCircle,
  MoreVertical,
  Plus,
  Share2,
  BellRing,
  ArrowLeft
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { GateBarrier3D } from '../../components/3d/Vector3DElements';
import {
  IncomingKnock3D,
  GuardCall3D,
  PreApproveGuest3D,
  DeliveryBox3D,
  CabPass3D,
} from '../../components/3d/Module3DIcons';

export interface VisitorRecord {
  id: string;
  name: string;
  category: 'guest' | 'delivery' | 'cab' | 'service';
  status: 'expected' | 'in_campus' | 'departed';
  entryCode: string;
  expectedTime: string;
  entryTimestamp?: string;
  exitTimestamp?: string;
  gateNumber: string;
  vehicleNo?: string;
  companyName?: string;
  guardName?: string;
  overstayMinutes?: number;
}

export const SAMPLE_VISITORS: VisitorRecord[] = [
  {
    id: 'vis_01',
    name: 'Rahul Sharma & Family',
    category: 'guest',
    status: 'expected',
    entryCode: '482 910',
    expectedTime: 'Today • 02:00 PM – 06:00 PM',
    gateNumber: 'Gate 1',
    vehicleNo: 'KA-05-MQ-3819 (Creta)',
  },
  {
    id: 'vis_02',
    name: 'Blinkit Instant Grocery',
    category: 'delivery',
    status: 'expected',
    entryCode: '7109',
    expectedTime: 'Next 25 mins • Quick Pass',
    gateNumber: 'Gate 2 (Service)',
    companyName: 'Blinkit',
  },
  {
    id: 'vis_03',
    name: 'Sandeep M (Amazon Delivery)',
    category: 'delivery',
    status: 'in_campus',
    entryCode: '3948',
    expectedTime: 'Today',
    entryTimestamp: '09:15 AM',
    gateNumber: 'Gate 1 (Main Gate)',
    companyName: 'Amazon Prime',
    guardName: 'Guard Ratan',
    overstayMinutes: 12,
  },
  {
    id: 'vis_04',
    name: 'Uber Premier (Driver Manoj)',
    category: 'cab',
    status: 'departed',
    entryCode: '8214',
    expectedTime: 'Yesterday',
    entryTimestamp: '07:30 PM',
    exitTimestamp: '07:44 PM',
    gateNumber: 'Gate 1',
    vehicleNo: 'KA-01-AJ-4921',
    guardName: 'Guard Sunil',
  },
];

interface GateOverviewScreenProps {
  onBack?: () => void;
  onPreApproveGuest: () => void;
  onDeliveryPass: () => void;
  onCabPass: () => void;
  onSelectVisitor: (visitor: VisitorRecord) => void;
  onSimulateIncomingKnock: () => void;
  onCallGuardKiosk: () => void;
}

export const GateOverviewScreen: React.FC<GateOverviewScreenProps> = ({
  onBack,
  onPreApproveGuest,
  onDeliveryPass,
  onCabPass,
  onSelectVisitor,
  onSimulateIncomingKnock,
  onCallGuardKiosk,
}) => {
  const [activeTab, setActiveTab] = useState<'expected' | 'in_campus' | 'departed'>('expected');

  const filteredVisitors = SAMPLE_VISITORS.filter((v) => v.status === activeTab);

  return (
    <div className="w-full min-h-full flex flex-col justify-between pb-24 text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="px-4 py-2.5 bg-white dark:bg-obsidian-900 border-b border-slate-200/80 dark:border-obsidian-800 flex items-center justify-between sticky top-0 z-30">
          <div className="flex items-center gap-2.5 min-w-0 flex-1">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-700 press-scale shrink-0"
                title="Back to Previous Screen"
              >
                <ArrowLeft size={16} strokeWidth={2.4} />
              </button>
            )}
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest truncate">
                  PERIMETER SECURITY
                </span>
              </div>
              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight truncate">
                Gate & Visitors
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5 shrink-0">
            <button
              type="button"
              onClick={onSimulateIncomingKnock}
              className="h-8 px-2.5 rounded-xl bg-cobalt-50 hover:bg-cobalt-100 dark:bg-cobalt-950/60 dark:hover:bg-cobalt-900/60 border border-cobalt-200 dark:border-cobalt-800/40 text-cobalt-600 dark:text-cobalt-400 text-xs font-bold flex items-center gap-1 transition-colors"
              title="Test Incoming Knocker"
            >
              <IncomingKnock3D size={16} />
              <span className="text-[11px]">Knock</span>
            </button>

            <button
              type="button"
              onClick={onCallGuardKiosk}
              className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-800 dark:hover:bg-obsidian-750 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-700"
              title="Direct Call Guard Station"
            >
              <GuardCall3D size={18} />
            </button>
          </div>
        </div>

        {/* 3D Gate Barrier Station Status Card */}
        <div className="px-4">
          <div className="p-4 rounded-3xl bg-gradient-to-br from-emerald-50 via-white to-slate-50 dark:from-emerald-950/30 dark:via-obsidian-900 dark:to-obsidian-900 border border-emerald-500/30 dark:border-emerald-600/30 flex items-center justify-between text-xs shadow-ambient relative overflow-hidden">
            <div className="flex items-center gap-3">
              <GateBarrier3D size={52} />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-700 dark:text-emerald-400">
                    ARMED & SYNCED
                  </span>
                </div>
                <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 leading-tight">
                  Gate 1 & Gate 2 Live
                </h3>
                <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                  On Duty: Guard Ratan & Guard Sunil
                </p>
              </div>
            </div>
            <button
              onClick={onCallGuardKiosk}
              className="px-3 py-1.5 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 border border-cobalt-200 dark:border-cobalt-800 text-xs font-bold text-cobalt-600 dark:text-cobalt-400 hover:bg-cobalt-100 transition-colors press-scale shrink-0"
            >
              Intercom Call
            </button>
          </div>
        </div>

        {/* Quick Action Shortcuts (Thumb Accessible) */}
        <div className="px-4">
          <div className="grid grid-cols-3 gap-2">
            <button
              onClick={onPreApproveGuest}
              className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 hover:border-cobalt-500 shadow-ambient flex flex-col items-center gap-1.5 transition-all press-scale"
            >
              <div className="w-10 h-10 rounded-xl bg-emerald-50 dark:bg-emerald-950/50 border border-emerald-200/70 dark:border-emerald-800/40 flex items-center justify-center">
                <PreApproveGuest3D size={24} />
              </div>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
                Guest Pass
              </span>
            </button>

            <button
              onClick={onDeliveryPass}
              className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 hover:border-emerald-500 shadow-ambient flex flex-col items-center gap-1.5 transition-all press-scale"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/70 dark:border-amber-800/40 flex items-center justify-center">
                <DeliveryBox3D size={24} />
              </div>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
                Delivery Pass
              </span>
            </button>

            <button
              onClick={onCabPass}
              className="p-3 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 hover:border-amber-500 shadow-ambient flex flex-col items-center gap-1.5 transition-all press-scale"
            >
              <div className="w-10 h-10 rounded-xl bg-amber-50 dark:bg-amber-950/50 border border-amber-200/70 dark:border-amber-800/40 flex items-center justify-center">
                <CabPass3D size={24} />
              </div>
              <span className="text-[11px] font-bold text-slate-800 dark:text-slate-200 text-center leading-tight">
                Cab Pass
              </span>
            </button>
          </div>
        </div>

        {/* Segmented Filter Tabs */}
        <div className="px-4">
          <div className="p-1 rounded-xl bg-slate-200/80 dark:bg-obsidian-850 flex items-center gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('expected')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'expected'
                  ? 'bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Expected ({SAMPLE_VISITORS.filter((v) => v.status === 'expected').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('in_campus')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'in_campus'
                  ? 'bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              In Campus ({SAMPLE_VISITORS.filter((v) => v.status === 'in_campus').length})
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('departed')}
              className={`flex-1 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeTab === 'departed'
                  ? 'bg-white dark:bg-obsidian-900 text-slate-900 dark:text-white shadow-sm'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              Departed
            </button>
          </div>
        </div>

        {/* Visitor Cards Feed */}
        <div className="px-4 flex flex-col gap-3 max-h-[380px] overflow-y-auto no-scrollbar">
          {filteredVisitors.length > 0 ? (
            filteredVisitors.map((v) => (
              <div
                key={v.id}
                onClick={() => onSelectVisitor(v)}
                className="p-4 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 hover:border-cobalt-500/60 dark:hover:border-cobalt-500/60 transition-all cursor-pointer shadow-ambient flex flex-col gap-2.5 press-scale"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <div className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                      v.category === 'guest'
                        ? 'bg-cobalt-50 text-cobalt-600 dark:bg-cobalt-950/60 dark:text-cobalt-400'
                        : v.category === 'delivery'
                        ? 'bg-emerald-50 text-emerald-600 dark:bg-emerald-950/60 dark:text-emerald-400'
                        : 'bg-amber-50 text-amber-600 dark:bg-amber-950/60 dark:text-amber-400'
                    }`}>
                      {v.category === 'guest' && <UserPlus size={20} />}
                      {v.category === 'delivery' && <Package size={20} />}
                      {v.category === 'cab' && <Car size={20} />}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {v.name}
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {v.expectedTime}
                      </p>
                    </div>
                  </div>

                  <div className="text-right shrink-0">
                    <span className="text-xs font-mono font-extrabold text-cobalt-600 dark:text-cobalt-400 bg-cobalt-50 dark:bg-cobalt-950/60 px-2 py-1 rounded-lg border border-cobalt-200 dark:border-cobalt-800/40 block">
                      PIN: {v.entryCode}
                    </span>
                  </div>
                </div>

                {/* Sub-status Strip */}
                <div className="pt-2.5 border-t border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-[11px] text-slate-600 dark:text-slate-400">
                  <span className="flex items-center gap-1.5 font-medium">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    {v.gateNumber}
                    {v.vehicleNo && <span className="text-slate-500 dark:text-slate-400 font-mono">({v.vehicleNo})</span>}
                  </span>

                  {v.status === 'in_campus' && v.overstayMinutes && (
                    <span className="font-semibold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                      <Clock size={12} />
                      <span>{v.overstayMinutes}m on campus</span>
                    </span>
                  )}

                  {v.status === 'expected' && (
                    <span className="font-semibold text-cobalt-600 dark:text-cobalt-400 flex items-center gap-1">
                      <Share2 size={12} />
                      <span>Share QR</span>
                    </span>
                  )}

                  {v.status === 'departed' && (
                    <span className="font-medium text-slate-500 dark:text-slate-400">
                      Exited at {v.exitTimestamp}
                    </span>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="p-8 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 text-center flex flex-col items-center gap-2">
              <ShieldCheck size={32} className="text-slate-400" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">
                No {activeTab} visitors
              </p>
              <p className="text-xs text-slate-500">
                Pre-approve family or delivery agents to speed up perimeter gate access.
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Floating Bottom Action Bar */}
      <div className="px-4 pt-3 pb-6">
        <Button
          onClick={onPreApproveGuest}
          icon={UserPlus}
          iconPosition="left"
          size="lg"
        >
          + Pre-Approve Visitor
        </Button>
      </div>
    </div>
  );
};
