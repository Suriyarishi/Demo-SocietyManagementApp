import React, { useState } from 'react';
import {
  ArrowLeft,
  Bell,
  Volume2,
  VolumeX,
  Moon,
  Clock,
  ShieldCheck,
  CheckCircle2,
  Smartphone,
  Sliders,
  Sparkles
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';

interface NotificationSoundScreenProps {
  onBack: () => void;
}

export const NotificationSoundScreen: React.FC<NotificationSoundScreenProps> = ({ onBack }) => {
  const [gateKnockSound, setGateKnockSound] = useState<boolean>(true);
  const [dailyStaffAlerts, setDailyStaffAlerts] = useState<boolean>(true);
  const [billsReminder, setBillsReminder] = useState<boolean>(true);
  const [communityNotices, setCommunityNotices] = useState<boolean>(false);
  const [quietHoursActive, setQuietHoursActive] = useState<boolean>(true);
  const [quietStart, setQuietStart] = useState<string>('23:00');
  const [quietEnd, setQuietEnd] = useState<string>('07:00');
  const [chimeType, setChimeType] = useState<string>('Hunt Lockdoor Classic');
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
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                ALERT PREFERENCES
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Notifications & Sounds
              </h2>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center">
            <Bell size={16} />
          </div>
        </div>

        {/* Critical Alerts Banner */}
        <div className="p-3.5 rounded-2xl bg-crimson-50/70 dark:bg-crimson-950/40 border border-crimson-200/80 dark:border-crimson-900/40 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-crimson-600 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Volume2 size={16} />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                Emergency SOS: Always Critical
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Bypasses device mute for fire, medical, or security distress
              </p>
            </div>
          </div>
          <Badge variant="crimson" size="sm">Locked</Badge>
        </div>

        {/* Granular Notification Channels */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 px-1">
            Notification Categories
          </span>

          <div className="rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm overflow-hidden divide-y divide-slate-100 dark:divide-obsidian-800 text-xs">
            {/* Gate Knock Intercom */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  VoIP Gate Knock Intercom
                </h4>
                <p className="text-[11px] text-slate-500">
                  Full screen incoming call when delivery/guest checks in
                </p>
              </div>
              <input
                type="checkbox"
                checked={gateKnockSound}
                onChange={(e) => {
                  setGateKnockSound(e.target.checked);
                  showToast(e.target.checked ? 'Gate Intercom Sound On' : 'Gate Intercom Muted');
                }}
                className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
              />
            </div>

            {/* Daily Help Entry/Exit */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Daily Help Turnstile Attendance
                </h4>
                <p className="text-[11px] text-slate-500">
                  Notify when maid or driver punches RFID at Gate 2
                </p>
              </div>
              <input
                type="checkbox"
                checked={dailyStaffAlerts}
                onChange={(e) => {
                  setDailyStaffAlerts(e.target.checked);
                  showToast(e.target.checked ? 'Staff Alerts On' : 'Staff Alerts Muted');
                }}
                className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
              />
            </div>

            {/* Dues & Bills */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Society Dues & Sub-Meter Low Balance
                </h4>
                <p className="text-[11px] text-slate-500">
                  Alert when prepaid electricity drops below ₹250
                </p>
              </div>
              <input
                type="checkbox"
                checked={billsReminder}
                onChange={(e) => setBillsReminder(e.target.checked)}
                className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
              />
            </div>

            {/* Community Notices */}
            <div className="p-3.5 flex items-center justify-between">
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Noticeboard & Forum Discussions
                </h4>
                <p className="text-[11px] text-slate-500">
                  Community chatter and non-emergency circulars
                </p>
              </div>
              <input
                type="checkbox"
                checked={communityNotices}
                onChange={(e) => setCommunityNotices(e.target.checked)}
                className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
              />
            </div>
          </div>
        </div>

        {/* Quiet Hours Mode */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-3 text-xs">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 flex items-center justify-center shrink-0">
                <Moon size={16} />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 dark:text-white">
                  Scheduled Quiet Hours
                </h4>
                <p className="text-[11px] text-slate-500">
                  Silence non-critical chimes during night
                </p>
              </div>
            </div>
            <input
              type="checkbox"
              checked={quietHoursActive}
              onChange={(e) => setQuietHoursActive(e.target.checked)}
              className="w-4 h-4 rounded text-cobalt-600 cursor-pointer"
            />
          </div>

          {quietHoursActive && (
            <div className="pt-2 border-t border-slate-100 dark:border-obsidian-800 grid grid-cols-2 gap-2">
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">BEDTIME</span>
                <input
                  type="time"
                  value={quietStart}
                  onChange={(e) => setQuietStart(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 font-bold text-slate-800 dark:text-slate-200 text-xs"
                />
              </div>
              <div>
                <span className="text-[10px] font-bold text-slate-400 block mb-1">WAKE UP</span>
                <input
                  type="time"
                  value={quietEnd}
                  onChange={(e) => setQuietEnd(e.target.value)}
                  className="w-full h-10 px-3 rounded-xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 font-bold text-slate-800 dark:text-slate-200 text-xs"
                />
              </div>
            </div>
          )}
        </div>

        {/* Chime Selector */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block px-1">
            GATE CHIME RINGTONE
          </label>
          <select
            value={chimeType}
            onChange={(e) => {
              setChimeType(e.target.value);
              showToast(`Playing sample: ${e.target.value}`);
            }}
            className="w-full h-[52px] rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-750 px-3.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
          >
            <option value="Hunt Lockdoor Classic">Hunt Lockdoor Classic (2026 Edition)</option>
            <option value="Executive Chime">Executive Chime</option>
            <option value="Minimal Acoustic Pulse">Minimal Acoustic Pulse</option>
            <option value="Subtle Haptic Tap">Subtle Haptic Only</option>
          </select>
        </div>

        <Button
          type="button"
          variant="primary"
          onClick={() => {
            showToast('✓ Notification preferences saved');
            onBack();
          }}
          className="w-full mt-2"
        >
          Save Notification Settings
        </Button>
      </div>
    </div>
  );
};
