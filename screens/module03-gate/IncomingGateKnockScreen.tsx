import React, { useState } from 'react';
import {
  X,
  Phone,
  ShoppingCart,
  DoorClosed,
  Check,
} from 'lucide-react';

interface IncomingGateKnockScreenProps {
  onClose?: () => void;
  onAllow?: () => void;
  onAllowEntry?: () => void;
  onDeny?: () => void;
  onDenyEntry?: () => void;
  onLeaveAtGate?: () => void;
  onCallGuard?: () => void;
}

export const IncomingGateKnockScreen: React.FC<IncomingGateKnockScreenProps> = ({
  onClose,
  onAllow,
  onAllowEntry,
  onDeny,
  onDenyEntry,
  onLeaveAtGate,
  onCallGuard,
}) => {
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleApprove = () => {
    if (onAllow) onAllow();
    else if (onAllowEntry) onAllowEntry();
    else if (onClose) onClose();
  };

  const handleDeny = () => {
    if (onDeny) onDeny();
    else if (onDenyEntry) onDenyEntry();
    else if (onClose) onClose();
  };

  const handleLeaveSecurity = () => {
    showToast('Instruction recorded: Leave package with Gate 1 Security');
    setTimeout(() => {
      if (onLeaveAtGate) onLeaveAtGate();
      else if (onClose) onClose();
    }, 1000);
  };

  return (
    <div className="w-full min-h-full bg-gradient-to-b from-[#1C1308]/95 via-[#2A1D0D]/95 to-[#120C05]/98 text-slate-900 text-left flex flex-col items-center justify-center p-4 relative select-none animate-in fade-in duration-300">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-12 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <Check size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      {/* Close Button at Top */}
      <button
        type="button"
        onClick={onClose || handleDeny}
        className="w-9 h-9 rounded-full bg-white/20 hover:bg-white/30 backdrop-blur-md flex items-center justify-center text-white transition-all press-scale mb-4 shrink-0 shadow-lg relative z-10"
        title="Close View"
      >
        <X size={18} strokeWidth={2.4} />
      </button>

      {/* Main Floating Modal Card (Exact Screenshot Match) */}
      <div className="w-full max-w-[342px] rounded-[28px] bg-white text-slate-900 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.6)] p-5 relative overflow-hidden flex flex-col z-10 animate-in zoom-in-95 duration-200">
        {/* Header: Unit, Society & Red HOOD Brand Badge */}
        <div className="flex items-start justify-between">
          <div>
            <span className="text-[11px] font-bold tracking-wider uppercase text-slate-500 block leading-tight">
              TOWER-10-G003
            </span>
            <span className="text-sm font-black tracking-tight uppercase text-slate-900 block leading-tight mt-1">
              LA RESIDENTIA
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
              onClick={() => {
                if (onCallGuard) onCallGuard();
                else showToast('Calling Kunal (Amazon Delivery)...');
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
            onClick={handleLeaveSecurity}
            className="w-full py-2.5 px-4 rounded-xl bg-white hover:bg-slate-50 active:bg-slate-100 text-slate-800 font-bold text-xs border border-slate-200/90 shadow-2xs flex items-center justify-center gap-2 transition-all press-scale"
          >
            <DoorClosed size={16} className="text-slate-600" />
            <span>Leave with security</span>
          </button>

          {/* Deny & Approve Dual Buttons */}
          <div className="grid grid-cols-2 gap-2.5 pt-0.5">
            <button
              type="button"
              onClick={handleDeny}
              className="py-2.5 px-4 rounded-xl bg-[#DC2626] hover:bg-[#B91C1C] active:bg-[#991B1B] text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-transform press-scale"
            >
              <X size={15} strokeWidth={2.8} />
              <span>Deny</span>
            </button>

            <button
              type="button"
              onClick={handleApprove}
              className="py-2.5 px-4 rounded-xl bg-[#16A34A] hover:bg-[#15803D] active:bg-[#166534] text-white font-extrabold text-xs shadow-sm flex items-center justify-center gap-1.5 transition-transform press-scale"
            >
              <Check size={15} strokeWidth={2.8} />
              <span>Approve</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
