import React, { useState } from 'react';
import {
  ArrowLeft,
  Clock,
  Phone,
  MessageSquare,
  ShieldCheck,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  User,
  Star,
  Camera,
  Play,
  RotateCcw,
  Sparkles
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { MaintenanceTicket } from './HelpdeskHubScreen';

interface TicketDetailSlaScreenProps {
  ticket: MaintenanceTicket;
  onBack: () => void;
  onProceedToSignoff: () => void;
  onEscalate: () => void;
}

export const TicketDetailSlaScreen: React.FC<TicketDetailSlaScreenProps> = ({
  ticket,
  onBack,
  onProceedToSignoff,
  onEscalate,
}) => {
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [escalated, setEscalated] = useState<boolean>(false);

  const handleEscalate = () => {
    setEscalated(true);
    onEscalate();
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-5">
        {/* Header Bar */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <div className="flex items-center gap-2">
            <span className="font-mono text-xs font-bold text-cobalt-600 dark:text-cobalt-400 px-2.5 py-1 rounded-lg glass-pill">
              #{ticket.id}
            </span>
            <Badge variant="cobalt" size="sm">
              In Progress
            </Badge>
          </div>
          <button
            type="button"
            onClick={() => alert(`Calling Society Facility Manager on duty (+91 98450 11223)...`)}
            className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200"
            title="Call Facility Manager"
          >
            <Phone size={17} />
          </button>
        </div>

        {/* Ticket Title & Location */}
        <div>
          <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest">
            {ticket.category.toUpperCase()} • {ticket.scope === 'personal' ? 'PRIVATE FLAT' : 'COMMON AREA'}
          </span>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
            {ticket.title}
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            {ticket.unitOrArea} • Logged at {ticket.createdAt}
          </p>
        </div>

        {/* SLA Countdown Timer Hero Card */}
        <div className="p-5 rounded-3xl bg-gradient-to-br from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated relative overflow-hidden">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-amber-400 uppercase tracking-widest flex items-center gap-1.5">
              <Clock size={13} />
              <span>SLA Resolution Clock</span>
            </span>
            <span className="text-xs font-mono font-bold text-emerald-400 flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              On Track
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <span className="text-3xl font-extrabold font-mono text-white tracking-tight">
              01h 28m 42s
            </span>
            <span className="text-xs text-slate-400">remaining</span>
          </div>

          {/* SLA Elapsed Progress Bar */}
          <div className="mt-3.5 w-full bg-white/10 h-1.5 rounded-full overflow-hidden">
            <div className="bg-emerald-500 h-full w-[65%] rounded-full" />
          </div>

          <p className="text-[11px] text-slate-400 mt-2">
            Target Resolution by 01:00 PM today. Escalates to President automatically if breached.
          </p>
        </div>

        {/* 4-Stage Audited SLA Timeline */}
        <div className="p-5 rounded-3xl glass-card flex flex-col gap-3.5">
          <h4 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Audited Stage Progress
          </h4>

          <div className="flex flex-col gap-3 text-xs">
            {/* Stage 1: Logged */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 size={14} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Ticket Logged & Classified</span>
                  <span className="font-mono text-[10px] text-slate-400">09:30 AM</span>
                </div>
                <p className="text-[11px] text-slate-500">Auto-assigned to Electrical & Plumbing desk</p>
              </div>
            </div>

            {/* Stage 2: Assigned */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5">
                <CheckCircle2 size={14} />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-900 dark:text-white">Technician Allocated</span>
                  <span className="font-mono text-[10px] text-slate-400">10:15 AM</span>
                </div>
                <p className="text-[11px] text-slate-500">Assigned to Kishore Verma (Electrician)</p>
              </div>
            </div>

            {/* Stage 3: In Progress (Active) */}
            <div className="flex items-start gap-3">
              <div className="w-6 h-6 rounded-full bg-cobalt-600 text-white flex items-center justify-center shrink-0 mt-0.5 ring-2 ring-cobalt-400/40">
                <Clock size={13} className="animate-spin" />
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-cobalt-600 dark:text-cobalt-400">Work in Progress</span>
                  <span className="font-mono text-[10px] text-cobalt-500 font-bold">11:00 AM (Live)</span>
                </div>
                <p className="text-[11px] text-slate-500">Technician entered campus at Gate 1 turnstile</p>
              </div>
            </div>

            {/* Stage 4: Resident Signoff (Pending) */}
            <div className="flex items-start gap-3 opacity-60">
              <div className="w-6 h-6 rounded-full bg-slate-200 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center shrink-0 mt-0.5">
                <span className="text-[10px] font-bold font-mono">4</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <span className="font-bold text-slate-700 dark:text-slate-300">Resident Digital Signoff</span>
                  <span className="font-mono text-[10px] text-slate-400">Awaiting</span>
                </div>
                <p className="text-[11px] text-slate-500">Signoff required to close ticket in registry</p>
              </div>
            </div>
          </div>
        </div>

        {/* Assigned Technician Profile Card */}
        {ticket.technician && (
          <div className="p-5 rounded-3xl glass-card flex flex-col gap-3.5">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-2xl bg-cobalt-600 text-white font-bold text-sm flex items-center justify-center shadow-md shadow-cobalt-600/30">
                  {ticket.technician.avatar}
                </div>
                <div>
                  <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                    {ticket.technician.name}
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {ticket.technician.role}
                  </p>
                  <div className="flex items-center gap-1.5 mt-1 text-xs">
                    <div className="flex items-center text-amber-500 font-bold">
                      <Star size={12} className="fill-current" />
                      <span className="ml-0.5">{ticket.technician.rating}</span>
                    </div>
                    <span className="text-slate-300">•</span>
                    <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-semibold">
                      ✓ Society Certified
                    </span>
                  </div>
                </div>
              </div>

              {/* Direct Actions */}
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => alert(`Calling technician ${ticket.technician?.name} at +91 ${ticket.technician?.phone}...`)}
                  className="w-10 h-10 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white flex items-center justify-center transition-colors shadow-md shadow-emerald-600/30 press-scale"
                  title="Call Technician"
                >
                  <Phone size={17} />
                </button>
                <button
                  type="button"
                  onClick={() => alert(`Opening in-app resident chat with ${ticket.technician?.name}...`)}
                  className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 press-scale"
                  title="Chat with Technician"
                >
                  <MessageSquare size={17} />
                </button>
              </div>
            </div>

            <div className="p-3 rounded-2xl glass-card-subtle flex items-center justify-between text-xs">
              <span className="font-semibold text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Inside Tower 2 • Arriving in ~{ticket.technician.etaMinutes} mins</span>
              </span>
              <span className="text-[11px] text-slate-400 font-mono">Turnstile Logged</span>
            </div>
          </div>
        )}

        {/* Attached Evidence Audio Memo */}
        <div className="p-4 rounded-3xl glass-card flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className="w-10 h-10 rounded-2xl bg-cobalt-600 text-white flex items-center justify-center press-scale shadow-sm"
            >
              <Play size={16} className={isPlayingAudio ? 'animate-pulse text-amber-300' : ''} />
            </button>
            <div>
              <span className="text-xs font-bold text-slate-900 dark:text-white block">
                Resident Audio Note (0:18s)
              </span>
              <span className="text-[11px] text-slate-500">
                {isPlayingAudio ? 'Playing back explanation...' : 'Tap to listen to problem description'}
              </span>
            </div>
          </div>
          <span className="text-xs font-mono font-bold text-cobalt-600 dark:text-cobalt-400">
            {isPlayingAudio ? '0:07 / 0:18' : '0:18'}
          </span>
        </div>
      </div>

      {/* Bottom Signoff & Escalation Actions */}
      <div className="pt-6 flex flex-col gap-2.5">
        <Button
          onClick={onProceedToSignoff}
          icon={CheckCircle2}
          iconPosition="left"
          size="lg"
        >
          Confirm Work & Sign Off
        </Button>

        <button
          type="button"
          onClick={handleEscalate}
          disabled={escalated}
          className="py-2.5 rounded-2xl glass-pill text-xs font-bold text-slate-600 dark:text-slate-300 hover:text-crimson-600 dark:hover:text-crimson-400 transition-colors"
        >
          {escalated ? '✓ Escalated to Association Committee' : 'Escalate Delay to Society Committee'}
        </button>
      </div>
    </div>
  );
};