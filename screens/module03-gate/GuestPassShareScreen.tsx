import React, { useState } from 'react';
import {
  X,
  Share2,
  Copy,
  Calendar,
  Check,
  QrCode,
  ShieldCheck,
  AlertTriangle,
  Building,
  Car
} from 'lucide-react';
import { Button } from '../../components/UIComponents';
import { PreApproveGuestFormData } from './PreApproveGuestScreen';

interface GuestPassShareScreenProps {
  passData: PreApproveGuestFormData;
  entryCode?: string;
  onClose: () => void;
  onRevokePass: () => void;
}

export const GuestPassShareScreen: React.FC<GuestPassShareScreenProps> = ({
  passData,
  entryCode = '482 910',
  onClose,
  onRevokePass,
}) => {
  const [copied, setCopied] = useState<boolean>(false);
  const [shareSuccess, setShareSuccess] = useState<boolean>(false);

  const handleCopy = () => {
    navigator.clipboard?.writeText(entryCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleWhatsAppShare = () => {
    setShareSuccess(true);
    const message = `Hello ${passData.guestName}! Here is your Hunt Lockdoor digital gate pass for Prestige Lakeside Habitat (Tower 2 - Flat 1204). Entry PIN: ${entryCode}. Show this at Gate 1 or Gate 2 for wait-free entry.`;
    window.open(`https://api.whatsapp.com/send?text=${encodeURIComponent(message)}`, '_blank');
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-200">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
              Passcode Active
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-600 dark:text-slate-300 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Guest Pass Ready
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Share this pass with your guest. Valid for immediate wait-free boom barrier clearance.
          </p>
        </div>

        {/* Luxury Perforated Ticket Pass Card */}
        <div className="relative rounded-3xl bg-gradient-to-b from-obsidian-900 via-obsidian-950 to-black text-white border border-obsidian-800 shadow-elevated overflow-hidden ticket-perforated">
          {/* Ticket Header */}
          <div className="p-5 pb-4 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-cobalt-600 text-white flex items-center justify-center text-xs shadow-md shadow-cobalt-600/30">
                <ShieldCheck size={18} />
              </div>
              <div>
                <span className="text-[11px] font-extrabold tracking-wider uppercase text-slate-100 block leading-tight">
                  HUNT LOCKDOOR PASS
                </span>
                <span className="text-[10px] text-slate-400">Gate 1 & Gate 2 Clearance</span>
              </div>
            </div>
            <span className="text-[10px] font-mono text-emerald-400 bg-emerald-950/60 px-2.5 py-0.5 rounded-full border border-emerald-500/40 font-bold uppercase">
              Pre-Approved
            </span>
          </div>

          {/* Ticket Body: PIN & QR Code */}
          <div className="p-5 text-center flex flex-col items-center gap-4">
            <div>
              <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest block">
                6-Digit Entry Code
              </span>
              <div className="mt-1 flex items-center justify-center gap-2">
                <span className="text-3xl font-mono font-extrabold text-white tracking-widest">
                  {entryCode}
                </span>
                <button
                  onClick={handleCopy}
                  className="p-2 rounded-xl bg-white/10 hover:bg-white/20 text-slate-300 transition-colors border border-white/10"
                  title="Copy PIN"
                >
                  {copied ? <Check size={16} className="text-emerald-400" /> : <Copy size={16} />}
                </button>
              </div>
            </div>

            {/* QR Code Container */}
            <div className="p-3.5 rounded-2xl bg-white text-slate-900 shadow-xl flex flex-col items-center gap-1.5 border-4 border-slate-100">
              <QrCode size={135} className="text-slate-950" />
              <span className="text-[10px] font-mono font-bold text-slate-500 uppercase tracking-wider">
                Scan at Gate Kiosk
              </span>
            </div>

            {/* Guest & Unit Metadata */}
            <div className="w-full pt-3 border-t border-white/10 flex flex-col gap-2 text-left text-xs">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Guest Name:</span>
                <span className="font-bold text-white">{passData.guestName}</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Destination:</span>
                <span className="font-mono font-bold text-slate-200">Tower 2 - Flat 1204</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Time Window:</span>
                <span className="font-semibold text-slate-200">{passData.dateStr} • {passData.timeSlot.split(' ')[0]}</span>
              </div>
              {passData.hasVehicle && passData.vehicleNo && (
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Vehicle Plate:</span>
                  <span className="font-mono font-bold text-emerald-400">{passData.vehicleNo}</span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Secondary Action: Revoke pass button */}
        <div className="flex items-center justify-between px-1 text-xs">
          <button
            type="button"
            onClick={onRevokePass}
            className="text-xs text-crimson-600 dark:text-crimson-400 font-bold hover:underline"
          >
            Revoke Pass
          </button>
          <span className="text-[11px] text-slate-500">Auto-expires at midnight</span>
        </div>
      </div>

      {/* Primary WhatsApp CTA */}
      <div className="pt-6 flex flex-col gap-2.5">
        <button
          type="button"
          onClick={handleWhatsAppShare}
          className="w-full h-14 rounded-2xl bg-[#25D366] hover:bg-[#20ba59] active:bg-[#1da850] text-white font-extrabold text-sm flex items-center justify-center gap-2 shadow-lg shadow-[#25D366]/25 transition-transform press-scale"
        >
          <Share2 size={18} />
          <span>Share Pass via WhatsApp</span>
        </button>

        <button
          type="button"
          onClick={onClose}
          className="w-full h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 text-slate-700 dark:text-slate-200 font-bold text-xs transition-colors border border-slate-200 dark:border-obsidian-800"
        >
          Done & Return to Gate
        </button>
      </div>
    </div>
  );
};
