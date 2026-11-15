import React from 'react';
import {
  ArrowLeft,
  User,
  Package,
  Car,
  Clock,
  ShieldCheck,
  PhoneCall,
  MapPin,
  AlertTriangle,
  QrCode,
  Share2
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { VisitorRecord } from './GateOverviewScreen';

interface VisitorDetailScreenProps {
  visitor: VisitorRecord;
  onBack: () => void;
  onCallVisitor?: () => void;
  onCallGuard?: () => void;
}

export const VisitorDetailScreen: React.FC<VisitorDetailScreenProps> = ({
  visitor,
  onBack,
  onCallVisitor,
  onCallGuard,
}) => {
  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-200">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Visitor Record
          </span>
          <div className="w-10" />
        </div>

        {/* Profile Card */}
        <div className="p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-4">
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center">
                {visitor.category === 'guest' && <User size={24} />}
                {visitor.category === 'delivery' && <Package size={24} />}
                {visitor.category === 'cab' && <Car size={24} />}
              </div>
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  {visitor.name}
                </h3>
                <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                  {visitor.category.toUpperCase()} • Flat 1204
                </p>
              </div>
            </div>

            <Badge
              variant={visitor.status === 'in_campus' ? 'emerald' : visitor.status === 'expected' ? 'cobalt' : 'neutral'}
              size="sm"
            >
              {visitor.status === 'in_campus' ? 'In Campus' : visitor.status === 'expected' ? 'Expected' : 'Departed'}
            </Badge>
          </div>

          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200/60 dark:border-obsidian-750 flex items-center justify-between">
            <div>
              <span className="text-[10px] text-slate-400 uppercase block font-bold">
                Passcode / PIN
              </span>
              <span className="text-lg font-mono font-extrabold text-cobalt-600 dark:text-cobalt-400">
                {visitor.entryCode}
              </span>
            </div>
            <span className="text-xs font-semibold text-emerald-600 dark:text-emerald-400">
              ✓ Verified Gate
            </span>
          </div>
        </div>

        {/* Audit Details Ledger */}
        <div className="p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Perimeter Audit Log
          </h4>

          <div className="flex flex-col gap-2.5 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-obsidian-800">
              <span className="text-slate-400">Gate Location:</span>
              <span className="font-semibold text-slate-900 dark:text-white">{visitor.gateNumber}</span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-obsidian-800">
              <span className="text-slate-400">Entry Timestamp:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {visitor.entryTimestamp || visitor.expectedTime}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-obsidian-800">
              <span className="text-slate-400">Exit Timestamp:</span>
              <span className="font-mono font-semibold text-slate-900 dark:text-white">
                {visitor.exitTimestamp || 'Active / On Campus'}
              </span>
            </div>

            <div className="flex items-center justify-between py-1 border-b border-slate-100 dark:border-obsidian-800">
              <span className="text-slate-400">Authorized By:</span>
              <span className="font-semibold text-slate-900 dark:text-white">
                {visitor.guardName || 'App Pre-Approval'}
              </span>
            </div>

            {visitor.vehicleNo && (
              <div className="flex items-center justify-between py-1">
                <span className="text-slate-400">Vehicle Registered:</span>
                <span className="font-mono font-bold text-emerald-600 dark:text-emerald-400">
                  {visitor.vehicleNo}
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Security Help */}
        <div className="p-3.5 rounded-xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <AlertTriangle size={15} className="text-amber-500" />
            <span>Notice any unauthorized activity?</span>
          </div>
          <button
            onClick={() => alert('Security report lodged with Facility Management.')}
            className="text-xs font-bold text-crimson-600 dark:text-crimson-400 hover:underline"
          >
            Report
          </button>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="pt-6 flex flex-col gap-2.5">
        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onCallVisitor || (() => alert('Calling visitor...'))}
            className="h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-800 dark:text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-obsidian-700"
          >
            <PhoneCall size={15} />
            <span>Call Visitor</span>
          </button>

          <button
            type="button"
            onClick={onCallGuard || (() => alert('Calling Gate 1 Guard Kiosk...'))}
            className="h-12 rounded-xl bg-cobalt-600 hover:bg-cobalt-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors"
          >
            <ShieldCheck size={16} />
            <span>Call Guard</span>
          </button>
        </div>

        <button
          type="button"
          onClick={onBack}
          className="w-full h-11 rounded-xl bg-transparent hover:bg-slate-100 dark:hover:bg-obsidian-850 text-slate-500 dark:text-slate-400 font-semibold text-xs transition-colors"
        >
          Return to Gate List
        </button>
      </div>
    </div>
  );
};
