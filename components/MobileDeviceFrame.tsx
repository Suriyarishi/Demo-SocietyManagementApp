import React, { useState, useEffect } from 'react';
import {
  Wifi,
  Battery,
  Sun,
  Moon
} from 'lucide-react';

interface MobileDeviceFrameProps {
  children: React.ReactNode;
}

export const MobileDeviceFrame: React.FC<MobileDeviceFrameProps> = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);
  const [timeStr, setTimeStr] = useState<string>('12:54');

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      setTimeStr(now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }));
    };
    updateTime();
    const interval = setInterval(updateTime, 30000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-[#F4F5F7] text-slate-900 flex items-center justify-center p-2 sm:p-6 font-sans selection:bg-[#04BB49] selection:text-white relative">
      {/* ========================================================
          AUTHENTIC SMARTPHONE MOCKUP FRAME (CENTER STAGE)
          ======================================================== */}
      <div className="relative shrink-0 my-auto">
        {/* Physical Hardware Buttons (Volume & Power) */}
        <div className="absolute top-28 -left-[13px] w-[3px] h-7 bg-[#27272A] rounded-l-sm" />
        <div className="absolute top-40 -left-[13px] w-[3px] h-12 bg-[#27272A] rounded-l-sm" />
        <div className="absolute top-56 -left-[13px] w-[3px] h-12 bg-[#27272A] rounded-l-sm" />
        <div className="absolute top-40 -right-[13px] w-[3px] h-16 bg-[#27272A] rounded-r-sm" />

        {/* Outer Phone Chassis with Realistic Shadow & Bezel */}
        <div className="relative w-[402px] h-[848px] max-w-[96vw] max-h-[92vh] aspect-[402/848] rounded-[52px] bg-[#18181B] p-[9.5px] shadow-[0_30px_70px_rgba(0,0,0,0.22),0_12px_28px_rgba(0,0,0,0.1),0_0_0_1px_rgba(0,0,0,0.2)] select-none">
          {/* Inner Glass Screen Chassis (Dark Mode Scoped Strictly to Phone Screen) */}
          <div
            className={`w-full h-full rounded-[43px] overflow-hidden flex flex-col relative border border-black/10 dark:border-white/10 shadow-inner ${
              isDarkMode ? 'dark bg-[#070A11] text-slate-100' : 'bg-white text-slate-900'
            }`}
          >
            {/* Native iOS Status Bar with In-Line Dynamic Island */}
            <div className="w-full h-11 px-6 flex items-center justify-between text-xs select-none z-30 bg-white dark:bg-[#070A11] border-b border-slate-100/80 dark:border-white/5 shrink-0">
              <span className="font-mono text-xs font-bold text-slate-800 dark:text-slate-100">{timeStr}</span>

              {/* Centered Dynamic Island Notch */}
              <div className="w-24 h-5 bg-black rounded-full flex items-center justify-between px-2.5 border border-white/10 shadow-sm pointer-events-none">
                <div className="w-2 h-2 rounded-full bg-slate-800 border border-slate-700" />
                <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/90 animate-pulse" />
              </div>

              <div className="flex items-center gap-1.5 text-slate-800 dark:text-slate-100">
                <span className="text-[10px] font-extrabold tracking-wider">5G</span>
                <Wifi size={13} strokeWidth={2.4} />
                <div className="flex items-center gap-0.5">
                  <span className="text-[10px] font-mono font-bold">98%</span>
                  <Battery size={15} strokeWidth={2.4} className="fill-current" />
                </div>
              </div>
            </div>

            {/* Screen Content Viewport (Strictly below the status bar, perfectly contained) */}
            <div className="w-full flex-1 overflow-hidden bg-slate-50 dark:bg-[#070A11] text-slate-900 dark:text-slate-100 relative flex flex-col">
              {children}
            </div>
          </div>
        </div>
      </div>

      {/* Subtle Floating Theme Switcher (Unobtrusive in bottom corner) */}
      <button
        type="button"
        onClick={() => setIsDarkMode(!isDarkMode)}
        className="fixed bottom-4 right-4 z-50 px-3 py-1.5 rounded-full bg-white/90 dark:bg-slate-900/90 hover:bg-white text-slate-700 dark:text-slate-200 border border-slate-200 dark:border-slate-800 shadow-md backdrop-blur-md text-[11px] font-bold flex items-center gap-1.5 transition-all press-scale"
        title="Toggle In-Device Theme"
      >
        {isDarkMode ? <Sun size={13} className="text-amber-500" /> : <Moon size={13} className="text-[#04BB49]" />}
        <span>{isDarkMode ? 'Light' : 'OLED Dark'}</span>
      </button>
    </div>
  );
};
