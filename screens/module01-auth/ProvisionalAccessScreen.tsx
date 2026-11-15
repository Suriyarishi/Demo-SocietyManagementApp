import React from 'react';
import {
  ShieldCheck,
  CheckCircle,
  Clock,
  QrCode,
  Users,
  ChevronRight,
  Sparkles,
  Bell,
  Lock,
  Building,
  ArrowLeft
} from 'lucide-react';
import { Button, Badge } from '../../components/UIComponents';
import { ResidentRole } from './DocumentUploadScreen';

interface ProvisionalAccessScreenProps {
  residentName?: string;
  societyName: string;
  unitInfo: { tower: string; flatNumber: string; floor: string };
  role: ResidentRole;
  isDocumentSubmitted: boolean;
  onEnterApp: () => void;
  onInviteFamily: () => void;
  onBack?: () => void;
}

export const ProvisionalAccessScreen: React.FC<ProvisionalAccessScreenProps> = ({
  residentName = 'Suriya K',
  societyName,
  unitInfo,
  role,
  isDocumentSubmitted,
  onEnterApp,
  onInviteFamily,
  onBack,
}) => {
  const roleDisplay = role === 'tenant' ? 'Tenant Resident' : role === 'owner_residing' ? 'Owner Resident' : 'Non-Resident Owner';

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300">
      {/* Top Status & Welcome Card */}
      <div className="flex flex-col gap-5">
        {/* Verification Status Pill */}
        <div className="flex items-center justify-between pt-2">
          <div className="flex items-center gap-2">
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
                title="Back"
              >
                <ArrowLeft size={16} strokeWidth={2.4} />
              </button>
            )}
            <Badge
              variant={isDocumentSubmitted ? 'emerald' : 'amber'}
              icon={isDocumentSubmitted ? ShieldCheck : Clock}
              size="md"
            >
              {isDocumentSubmitted ? 'Documents Submitted' : 'Provisional Mode (48h)'}
            </Badge>
          </div>
          <span className="text-[11px] font-mono font-bold text-slate-500 dark:text-slate-400">
            ID: HNT-{unitInfo.flatNumber}-26
          </span>
        </div>

        {/* Hero Title */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
            Welcome to {societyName.split(' ')[0]}!
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Your provisional gate pass is active. You can now clear visitors and receive live turnstile alerts.
          </p>
        </div>

        {/* Digital Resident Security Pass Card (2026 Concierge Card) */}
        <div className="relative p-5 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 right-0 w-44 h-44 bg-cobalt-600/15 rounded-full blur-2xl pointer-events-none" />

          <div className="flex items-start justify-between relative z-10">
            <div>
              <div className="flex items-center gap-1.5 mb-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-[10px] font-extrabold text-cobalt-400 uppercase tracking-widest">
                  RESIDENT DIGITAL PASS
                </span>
              </div>
              <h3 className="text-xl font-extrabold text-white mt-0.5 tracking-tight">
                {residentName}
              </h3>
              <p className="text-xs text-slate-300 font-medium">
                {roleDisplay}
              </p>
            </div>
            <div className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center p-2 shadow-inner">
              <QrCode size={40} className="text-white" />
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs relative z-10">
            <div>
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Unit Allocation</span>
              <span className="font-mono font-bold text-slate-100 text-sm">
                {unitInfo.tower} - {unitInfo.flatNumber}
              </span>
            </div>
            <div className="text-right">
              <span className="text-[10px] text-slate-500 dark:text-slate-400 uppercase block font-semibold">Gate Security SLA</span>
              <span className="font-bold text-emerald-400 flex items-center gap-1 justify-end font-mono">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                Live Active
              </span>
            </div>
          </div>
        </div>

        {/* Feature Clearance Matrix */}
        <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3">
          <div className="flex items-center justify-between">
            <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Gate Clearance Privileges
            </h4>
            <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
              Active Now
            </span>
          </div>

          <div className="space-y-2.5 text-xs">
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <CheckCircle size={15} className="text-emerald-500 shrink-0" />
              <span>Pre-Approve Visitors (WhatsApp QR Passcodes)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <CheckCircle size={15} className="text-emerald-500 shrink-0" />
              <span>Instant Gate Knock Alerts & Intercom Calls</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-700 dark:text-slate-300">
              <CheckCircle size={15} className="text-emerald-500 shrink-0" />
              <span>Daily Help (Maid/Cook) Campus Arrival Notifications</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-400 dark:text-slate-500">
              <Clock size={15} className="text-amber-500 shrink-0" />
              <span>Society AGM Voting & Bill Receipts (unlocked post-review)</span>
            </div>
          </div>

          {isDocumentSubmitted && (
            <div className="mt-2 pt-3 border-t border-slate-100 dark:border-obsidian-800 text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
              <Clock size={13} className="text-cobalt-500" />
              <span>Management Committee review SLA: ~4 to 8 hours.</span>
            </div>
          )}
        </div>

        {/* Invite Family Quick Card */}
        <div
          onClick={onInviteFamily}
          className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-center justify-between cursor-pointer hover:bg-slate-200/60 dark:hover:bg-obsidian-850 transition-colors"
        >
          <div className="flex items-center gap-2.5 text-xs font-bold text-slate-800 dark:text-slate-200">
            <Users size={16} className="text-cobalt-500" />
            <span>Invite family members to this flat</span>
          </div>
          <ChevronRight size={14} className="text-slate-400" />
        </div>
      </div>

      {/* Primary CTA */}
      <div className="pt-6">
        <Button
          onClick={onEnterApp}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Enter Hunt Lockdoor Dashboard
        </Button>
      </div>
    </div>
  );
};
