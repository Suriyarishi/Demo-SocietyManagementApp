import React, { useState } from 'react';
import { HomeScreen } from './HomeScreen';
import { GlobalSearchScreen } from './GlobalSearchScreen';
import { MultiFlatSelectorSheet, FlatEntity, USER_FLATS } from './MultiFlatSelectorSheet';
import { ActivityTimelineScreen } from './ActivityTimelineScreen';
import { ShieldAlert, PhoneCall, X, CheckCircle2, QrCode } from 'lucide-react';
import { Button } from '../../components/UIComponents';

export const MODULE02_SCREENS = [
  { id: 'SCR_HOME_01', name: 'Command Dashboard Hub', step: 1 },
  { id: 'SCR_HOME_02', name: 'Global Concierge Search', step: 2 },
  { id: 'SCR_HOME_03', name: 'Multi-Flat Switcher Sheet', step: 3 },
  { id: 'SCR_HOME_04', name: 'Perimeter Audit Timeline', step: 4 },
];

interface Module02ControllerProps {
  currentScreenId: string;
  onScreenChange: (screenId: string) => void;
  onSwitchToModule01?: () => void;
  onSwitchToModule?: (mod: 'm01' | 'm02' | 'm03' | 'm04' | 'm05' | 'm06', screenId?: string) => void;
}

export const Module02Controller: React.FC<Module02ControllerProps> = ({
  currentScreenId,
  onScreenChange,
  onSwitchToModule01,
  onSwitchToModule,
}) => {
  const [activeFlat, setActiveFlat] = useState<FlatEntity>(USER_FLATS[0]);
  const [showFlatSheet, setShowFlatSheet] = useState<boolean>(false);
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [sosCountdown, setSosCountdown] = useState<number>(3);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  // Quick Action Sheet Simulators
  const [activeModalAction, setActiveModalAction] = useState<string | null>(null);

  const handleTriggerSOS = () => {
    setShowSosModal(true);
    setSosTriggered(false);
    setSosCountdown(3);

    const interval = setInterval(() => {
      setSosCountdown((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          setSosTriggered(true);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
  };

  const handleCancelSOS = () => {
    setShowSosModal(false);
    setSosTriggered(false);
    setSosCountdown(3);
  };

  return (
    <div className="w-full h-full relative">
      {/* Screen 1: Main Dashboard */}
      {currentScreenId === 'SCR_HOME_01' && (
        <HomeScreen
          activeFlat={activeFlat}
          onOpenFlatSwitcher={() => setShowFlatSheet(true)}
          onOpenSearch={() => onScreenChange('SCR_HOME_02')}
          onOpenActivityHistory={() => onScreenChange('SCR_HOME_04')}
          onNavigateTab={(tab) => {
            if (tab === 'home') onScreenChange('SCR_HOME_01');
            else if (tab === 'gate' && onSwitchToModule) onSwitchToModule('m03', 'SCR_GATE_01');
            else if (tab === 'services' && onSwitchToModule) onSwitchToModule('m06', 'SCR_TICK_01');
            else {
              alert(`Tab "${tab.toUpperCase()}" selected.`);
            }
          }}
          onTriggerSOS={handleTriggerSOS}
          onPreApproveGuest={() => {
            if (onSwitchToModule) onSwitchToModule('m03', 'SCR_GATE_02');
            else setActiveModalAction('pre_approve');
          }}
          onDeliveryPass={() => {
            if (onSwitchToModule) onSwitchToModule('m03', 'SCR_GATE_04');
            else setActiveModalAction('delivery_pass');
          }}
          onPayBills={() => {
            if (onSwitchToModule) onSwitchToModule('m05', 'SCR_PAY_01');
            else setActiveModalAction('pay_bills');
          }}
          onDailyHelp={() => {
            if (onSwitchToModule) onSwitchToModule('m04', 'SCR_STAFF_01');
            else setActiveModalAction('daily_help');
          }}
        />
      )}

      {/* Screen 2: Global Search */}
      {currentScreenId === 'SCR_HOME_02' && (
        <GlobalSearchScreen
          onBack={() => onScreenChange('SCR_HOME_01')}
          onSelectResult={(item) => {
            alert(`Selected: ${item.title} (${item.subtitle})`);
            onScreenChange('SCR_HOME_01');
          }}
        />
      )}

      {/* Screen 3: Multi-Flat Selector as Dedicated View */}
      {currentScreenId === 'SCR_HOME_03' && (
        <div className="p-6 text-left">
          <MultiFlatSelectorSheet
            activeFlatId={activeFlat.id}
            onSelectFlat={(f) => {
              setActiveFlat(f);
              onScreenChange('SCR_HOME_01');
            }}
            onClose={() => onScreenChange('SCR_HOME_01')}
            onAddNewFlat={() => {
              if (onSwitchToModule01) onSwitchToModule01();
            }}
          />
        </div>
      )}

      {/* Screen 4: Activity History Timeline */}
      {currentScreenId === 'SCR_HOME_04' && (
        <ActivityTimelineScreen
          onBack={() => onScreenChange('SCR_HOME_01')}
        />
      )}

      {/* Floating Bottom Sheet for Flat Switcher (Triggered from Home Header) */}
      {showFlatSheet && (
        <MultiFlatSelectorSheet
          activeFlatId={activeFlat.id}
          onSelectFlat={(f) => {
            setActiveFlat(f);
            setShowFlatSheet(false);
          }}
          onClose={() => setShowFlatSheet(false)}
          onAddNewFlat={() => {
            setShowFlatSheet(false);
            if (onSwitchToModule01) onSwitchToModule01();
          }}
        />
      )}

      {/* ========================================================
          EMERGENCY SOS FULL-SCREEN MODAL SIMULATOR
          ======================================================== */}
      {showSosModal && (
        <div className="absolute inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-5 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-slate-900 border border-crimson-600/50 text-white shadow-2xl flex flex-col gap-4 relative overflow-hidden">
            <div className="w-14 h-14 rounded-2xl bg-crimson-600/20 text-crimson-400 border border-crimson-600/40 flex items-center justify-center self-center pulse-ring">
              <ShieldAlert size={28} />
            </div>

            <div className="text-center">
              <h3 className="text-xl font-extrabold tracking-tight text-white">
                {sosTriggered ? 'SOS DISPATCH BROADCASTED' : 'EMERGENCY SOS ACTIVATING'}
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                {sosTriggered
                  ? 'Main gate security siren triggered. Guard dispatched to your unit.'
                  : `Slide or tap cancel within ${sosCountdown} seconds to abort false alarm.`}
              </p>
            </div>

            {!sosTriggered ? (
              <div className="my-2 p-4 rounded-2xl bg-crimson-950/40 border border-crimson-800/60 text-center">
                <span className="text-3xl font-mono font-extrabold text-crimson-400 block">
                  00:0{sosCountdown}
                </span>
                <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-widest mt-1 block">
                  Auto-Dispatching Gate Security
                </span>
              </div>
            ) : (
              <div className="my-1 p-3.5 rounded-2xl bg-emerald-950/40 border border-emerald-800/40 text-xs text-emerald-300 space-y-1">
                <div className="flex items-center gap-1.5 font-bold">
                  <CheckCircle2 size={15} />
                  <span>Guard Patrol Dispatched (ETA: 45s)</span>
                </div>
                <p className="text-[11px] text-slate-300">
                  Target: {activeFlat.unit} • {activeFlat.societyName}
                </p>
              </div>
            )}

            <div className="flex flex-col gap-2 pt-2">
              {!sosTriggered ? (
                <button
                  type="button"
                  onClick={handleCancelSOS}
                  className="w-full h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-white transition-colors"
                >
                  Cancel / False Alarm
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={() => alert('Direct 24/7 VoIP line opened to Gate Guard Kiosk')}
                    className="w-full h-12 rounded-xl bg-crimson-600 hover:bg-crimson-700 text-xs font-bold text-white flex items-center justify-center gap-2"
                  >
                    <PhoneCall size={16} />
                    <span>Direct Call Gate Security</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelSOS}
                    className="w-full h-10 rounded-xl bg-slate-800 text-xs font-semibold text-slate-300"
                  >
                    Close Emergency Screen
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Quick Action Modal Simulator */}
      {activeModalAction && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-5 text-left animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col gap-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-cobalt-400 uppercase tracking-wider">
                {activeModalAction === 'pre_approve' ? 'Pre-Approve Guest Pass' : activeModalAction === 'delivery_pass' ? 'Quick Delivery Pass' : activeModalAction === 'pay_bills' ? 'Society Maintenance UPI' : 'Daily Staff Roster'}
              </span>
              <button
                onClick={() => setActiveModalAction(null)}
                className="w-7 h-7 rounded-full bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white"
              >
                <X size={15} />
              </button>
            </div>

            <p className="text-xs text-slate-300">
              {activeModalAction === 'pre_approve'
                ? 'Generate an encrypted 6-digit PIN & WhatsApp QR code for guests.'
                : activeModalAction === 'delivery_pass'
                ? 'Generate a 30-minute auto-expiry pass for Swiggy, Zomato, Amazon, Blinkit, etc.'
                : activeModalAction === 'pay_bills'
                ? 'Pay ₹4,250 with 0% UPI convenience fee to Society Bank Account.'
                : 'View daily in-campus attendance timestamps for cooks, maids, and drivers.'}
            </p>

            <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60 flex items-center justify-between text-xs">
              <span className="font-mono text-slate-200">Flat: {activeFlat.unit}</span>
              <span className="text-emerald-400 font-bold">Perimeter Active</span>
            </div>

            <button
              onClick={() => {
                alert(`Action completed successfully for ${activeFlat.unit}`);
                setActiveModalAction(null);
              }}
              className="w-full h-12 rounded-xl bg-cobalt-600 hover:bg-cobalt-500 font-bold text-xs text-white"
            >
              Confirm Action
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
