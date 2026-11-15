import React, { useState } from 'react';
import { EmergencyHubScreen, EmergencyType } from './EmergencyHubScreen';
import { ActiveSosCountdownScreen } from './ActiveSosCountdownScreen';
import { GuardDispatchLiveScreen } from './GuardDispatchLiveScreen';
import { GuardIntercomDialerScreen } from './GuardIntercomDialerScreen';
import { EmergencyHelplinesScreen } from './EmergencyHelplinesScreen';

export interface Module10ControllerProps {
  currentStep: 'SCR_SOS_01' | 'SCR_SOS_02' | 'SCR_SOS_03' | 'SCR_SOS_04' | 'SCR_SOS_05';
  onBack: () => void;
  onNavigateScreen: (screenId: string) => void;
  onCloseEmergency: () => void;
}

export const Module10Controller: React.FC<Module10ControllerProps> = ({
  currentStep,
  onBack,
  onNavigateScreen,
  onCloseEmergency,
}) => {
  const [activeEmergencyType, setActiveEmergencyType] = useState<EmergencyType>('medical');
  const [isSilentAlarm, setIsSilentAlarm] = useState<boolean>(false);

  switch (currentStep) {
    case 'SCR_SOS_02':
      return (
        <ActiveSosCountdownScreen
          emergencyType={activeEmergencyType}
          isSilent={isSilentAlarm}
          onCancel={onBack}
          onCountdownComplete={() => onNavigateScreen('SCR_SOS_03')}
        />
      );
    case 'SCR_SOS_03':
      return (
        <GuardDispatchLiveScreen
          emergencyType={activeEmergencyType}
          onResolve={onCloseEmergency}
          onCallGuard={() => onNavigateScreen('SCR_SOS_04')}
        />
      );
    case 'SCR_SOS_04':
      return <GuardIntercomDialerScreen onBack={onBack} />;
    case 'SCR_SOS_05':
      return <EmergencyHelplinesScreen onBack={onBack} />;
    case 'SCR_SOS_01':
    default:
      return (
        <EmergencyHubScreen
          onBack={onBack}
          onTriggerSos={(type, silent) => {
            setActiveEmergencyType(type);
            setIsSilentAlarm(silent);
            onNavigateScreen('SCR_SOS_02');
          }}
          onOpenIntercom={() => onNavigateScreen('SCR_SOS_04')}
          onOpenHelplines={() => onNavigateScreen('SCR_SOS_05')}
        />
      );
  }
};
