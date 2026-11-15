import React, { useState } from 'react';
import {
  ArrowLeft,
  AlertTriangle,
  Camera,
  Car,
  Clock,
  ShieldAlert,
  CheckCircle2,
  Send,
  Info
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';

interface WrongParkingReportScreenProps {
  onBack: () => void;
}

export const WrongParkingReportScreen: React.FC<WrongParkingReportScreenProps> = ({ onBack }) => {
  const [offendingPlate, setOffendingPlate] = useState<string>('KA-01-MJ-4921');
  const [photoAttached, setPhotoAttached] = useState<boolean>(true);
  const [reportSubmitted, setReportSubmitted] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleSendMoveNotice = (e: React.FormEvent) => {
    e.preventDefault();
    if (!offendingPlate.trim()) {
      showToast('Please enter the vehicle registration plate');
      return;
    }
    setReportSubmitted(true);
    showToast('✓ 15-Minute Move Notice sent to vehicle owner & Gate 2 Security');
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
              <span className="text-[10px] font-bold text-amber-600 dark:text-amber-400 uppercase tracking-widest block">
                PARKING DISPUTE RESOLUTION
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Wrong Parking Notice
              </h2>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 flex items-center justify-center">
            <AlertTriangle size={16} />
          </div>
        </div>

        {/* Slot Ownership Banner */}
        <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex items-center justify-between text-xs">
          <div>
            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
              YOUR ASSIGNED SLOT
            </span>
            <h4 className="font-mono font-extrabold text-slate-900 dark:text-white text-sm">
              Basement 1 • Slot #B1-142
            </h4>
            <p className="text-[11px] text-slate-500">
              Tower 2 Dedicated Covered Resident Bay
            </p>
          </div>

          <Badge variant="emerald" size="sm">
            Owned Slot
          </Badge>
        </div>

        {/* Action Form or Active Notice Status */}
        {!reportSubmitted ? (
          <form onSubmit={handleSendMoveNotice} className="flex flex-col gap-3">
            <Input
              label="OFFENDING VEHICLE NUMBER"
              placeholder="e.g. KA-01-MJ-4921"
              value={offendingPlate}
              onChange={(e) => setOffendingPlate(e.target.value)}
              required
            />

            {/* Photo Attachment */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                PHOTO PROOF OF WRONG PARKING
              </label>
              <div
                onClick={() => {
                  setPhotoAttached(!photoAttached);
                  showToast(photoAttached ? 'Photo removed' : 'Camera photo attached');
                }}
                className="w-full h-28 rounded-2xl border-2 border-dashed border-slate-300 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-900 flex flex-col items-center justify-center gap-1.5 cursor-pointer hover:bg-slate-100 transition-colors"
              >
                <Camera size={22} className="text-amber-600" />
                <span className="text-xs font-bold text-slate-800 dark:text-slate-200">
                  {photoAttached ? '✓ Photo of Car in Slot #B1-142 Attached' : 'Tap to Photograph Offending Car'}
                </span>
                <span className="text-[10px] text-slate-400">
                  Visible plate and slot number required
                </span>
              </div>
            </div>

            {/* Automated Resolution Timeline */}
            <div className="p-3.5 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 flex flex-col gap-2 text-xs">
              <div className="flex items-center gap-1.5 text-amber-700 dark:text-amber-400 font-bold">
                <Clock size={14} />
                <span>Automated 15m Society Move Protocol</span>
              </div>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                1. System looks up car owner across all 3,428 flats.<br />
                2. High-priority SMS & push alert sent: <em>"Please move car from Slot #B1-142 in 15 mins."</em><br />
                3. Gate 2 patrol guard dispatched with wheel lock clamp if unaddressed.
              </p>
            </div>

            <Button type="submit" variant="primary" className="w-full mt-1">
              Dispatch 15m Move Notice
            </Button>
          </form>
        ) : (
          /* Live Move Notice Active State */
          <div className="p-5 rounded-3xl bg-amber-50 dark:bg-amber-950/40 border border-amber-300 dark:border-amber-800 flex flex-col gap-3 text-left">
            <div className="flex items-center justify-between">
              <Badge variant="amber" size="sm">
                15m Notice Active
              </Badge>
              <span className="font-mono text-xs font-bold text-amber-700 dark:text-amber-400">
                12:45s REMAINING
              </span>
            </div>

            <div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Notice Dispatched for {offendingPlate.toUpperCase()}
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 mt-1">
                Owner identified: <strong>Tower 4 - Flat 602</strong>. Push alert & SMS sent. Guard notified.
              </p>
            </div>

            <div className="pt-2 border-t border-amber-200 dark:border-amber-800 flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setReportSubmitted(false);
                  showToast('Dispute resolved: Vehicle has moved');
                }}
                className="flex-1 h-10 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs transition-colors"
              >
                ✓ Car Has Moved • Close
              </button>

              <button
                type="button"
                onClick={() => showToast('Gate 2 security patrol dispatched to wheel-lock car')}
                className="flex-1 h-10 rounded-xl bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-xs transition-colors"
              >
                Request Wheel Clamp
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
