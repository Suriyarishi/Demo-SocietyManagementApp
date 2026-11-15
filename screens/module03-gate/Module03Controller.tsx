import React, { useState } from 'react';
import { GateOverviewScreen, VisitorRecord, SAMPLE_VISITORS } from './GateOverviewScreen';
import { PreApproveGuestScreen, PreApproveGuestFormData } from './PreApproveGuestScreen';
import { GuestPassShareScreen } from './GuestPassShareScreen';
import { DeliveryPassScreen, DeliveryPassData } from './DeliveryPassScreen';
import { CabOverstayScreen } from './CabOverstayScreen';
import { IncomingGateKnockScreen } from './IncomingGateKnockScreen';
import { VisitorDetailScreen } from './VisitorDetailScreen';

export const MODULE03_SCREENS = [
  { id: 'SCR_GATE_01', name: 'Perimeter Gate Feed', step: 1 },
  { id: 'SCR_GATE_02', name: 'Pre-Approve Guest Form', step: 2 },
  { id: 'SCR_GATE_03', name: 'WhatsApp Digital Pass', step: 3 },
  { id: 'SCR_GATE_04', name: 'Express Courier Pass', step: 4 },
  { id: 'SCR_GATE_05', name: 'Cab Overstay Watch', step: 5 },
  { id: 'SCR_GATE_06', name: 'Incoming Gate Knock Cam', step: 6 },
  { id: 'SCR_GATE_07', name: 'Visitor Audit Record', step: 7 },
];

interface Module03ControllerProps {
  currentScreenId: string;
  onScreenChange: (screenId: string) => void;
  onNavigateHome?: () => void;
}

export const Module03Controller: React.FC<Module03ControllerProps> = ({
  currentScreenId,
  onScreenChange,
  onNavigateHome,
}) => {
  const [selectedVisitor, setSelectedVisitor] = useState<VisitorRecord>(SAMPLE_VISITORS[0]);
  const [activeGuestPass, setActiveGuestPass] = useState<PreApproveGuestFormData>({
    guestName: 'Rahul Sharma & Family',
    phone: '9845012345',
    guestType: 'individual',
    dateStr: 'Today',
    timeSlot: 'Afternoon (12 PM – 5 PM)',
    hasVehicle: true,
    vehicleNo: 'KA-05-MQ-3819',
  });
  const [toastMessage, setToastMessage] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  const handlePreApproveSubmit = (data: PreApproveGuestFormData) => {
    setActiveGuestPass(data);
    onScreenChange('SCR_GATE_03');
  };

  const handleDeliveryPassActivated = (data: DeliveryPassData) => {
    showToast(`Active: ${data.company} Express Pass (Claim PIN: ${data.claimPin})`);
    onScreenChange('SCR_GATE_01');
  };

  const handleCabPassCreated = (cab: any) => {
    showToast(`Cab Pass issued for ${cab.cabNumber} (${cab.provider})`);
    onScreenChange('SCR_GATE_01');
  };

  return (
    <div className="w-full h-full relative">
      {/* Toast Notification (Anchored inside phone frame) */}
      {toastMessage && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <span className="w-2 h-2 rounded-full bg-emerald-400 shrink-0" />
          <span className="text-[11px] leading-tight">{toastMessage}</span>
        </div>
      )}

      {/* Screen 1: Feed */}
      {currentScreenId === 'SCR_GATE_01' && (
        <GateOverviewScreen
          onPreApproveGuest={() => onScreenChange('SCR_GATE_02')}
          onDeliveryPass={() => onScreenChange('SCR_GATE_04')}
          onCabPass={() => onScreenChange('SCR_GATE_05')}
          onSelectVisitor={(v) => {
            setSelectedVisitor(v);
            onScreenChange('SCR_GATE_07');
          }}
          onSimulateIncomingKnock={() => onScreenChange('SCR_GATE_06')}
          onCallGuardKiosk={() => alert('Opening encrypted 2-way VoIP audio line to Gate 1 Guard Kiosk...')}
        />
      )}

      {/* Screen 2: Pre-Approve Form */}
      {currentScreenId === 'SCR_GATE_02' && (
        <PreApproveGuestScreen
          onBack={() => onScreenChange('SCR_GATE_01')}
          onSubmit={handlePreApproveSubmit}
        />
      )}

      {/* Screen 3: Digital Pass & WhatsApp Share */}
      {currentScreenId === 'SCR_GATE_03' && (
        <GuestPassShareScreen
          passData={activeGuestPass}
          onClose={() => onScreenChange('SCR_GATE_01')}
          onRevokePass={() => {
            showToast('Pass revoked. Security guard notified.');
            onScreenChange('SCR_GATE_01');
          }}
        />
      )}

      {/* Screen 4: Delivery Pass */}
      {currentScreenId === 'SCR_GATE_04' && (
        <DeliveryPassScreen
          onBack={() => onScreenChange('SCR_GATE_01')}
          onActivated={handleDeliveryPassActivated}
        />
      )}

      {/* Screen 5: Cab Pass & Overstay */}
      {currentScreenId === 'SCR_GATE_05' && (
        <CabOverstayScreen
          onBack={() => onScreenChange('SCR_GATE_01')}
          onPassCreated={handleCabPassCreated}
        />
      )}

      {/* Screen 6: Incoming Gate Knock Full Screen Alert */}
      {currentScreenId === 'SCR_GATE_06' && (
        <IncomingGateKnockScreen
          onAllow={() => {
            showToast('✓ Entry allowed: Gate 1 boom barrier opened for Amazon courier');
            onScreenChange('SCR_GATE_01');
          }}
          onDeny={() => {
            showToast('✕ Entry denied: Guard instructed to turn visitor away');
            onScreenChange('SCR_GATE_01');
          }}
          onLeaveAtGate={() => {
            showToast('Package held at Security Desk. Pickup PIN sent via SMS');
            onScreenChange('SCR_GATE_01');
          }}
          onCallGuard={() => alert('Direct 2-way wireless intercom connected to Guard Ratan')}
        />
      )}

      {/* Screen 7: Visitor Detail & Audit */}
      {currentScreenId === 'SCR_GATE_07' && (
        <VisitorDetailScreen
          visitor={selectedVisitor}
          onBack={() => onScreenChange('SCR_GATE_01')}
          onCallVisitor={() => alert(`Calling ${selectedVisitor.name}...`)}
          onCallGuard={() => alert(`Calling ${selectedVisitor.guardName || 'Gate 1 Security'}...`)}
        />
      )}
    </div>
  );
};
