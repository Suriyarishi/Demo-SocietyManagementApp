import React from 'react';
import { HouseholdSettingsHubScreen } from './HouseholdSettingsHubScreen';
import { FamilyTenantGovernanceScreen } from './FamilyTenantGovernanceScreen';
import { VehicleRegistryScreen } from './VehicleRegistryScreen';
import { WrongParkingReportScreen } from './WrongParkingReportScreen';
import { SmartDoorLockScreen } from './SmartDoorLockScreen';
import { NotificationSoundScreen } from './NotificationSoundScreen';
import { FlatEntity } from '../module02-home/MultiFlatSelectorSheet';

export interface Module11ControllerProps {
  currentStep: 'SCR_SETT_01' | 'SCR_SETT_02' | 'SCR_SETT_03' | 'SCR_SETT_04' | 'SCR_SETT_05' | 'SCR_SETT_06';
  activeFlat: FlatEntity;
  onBack: () => void;
  onNavigateScreen: (screenId: string) => void;
  onOpenFlatSwitcher: () => void;
  onOpenActivityHistory: () => void;
}

export const Module11Controller: React.FC<Module11ControllerProps> = ({
  currentStep,
  activeFlat,
  onBack,
  onNavigateScreen,
  onOpenFlatSwitcher,
  onOpenActivityHistory,
}) => {
  switch (currentStep) {
    case 'SCR_SETT_02':
      return <FamilyTenantGovernanceScreen onBack={onBack} />;
    case 'SCR_SETT_03':
      return <VehicleRegistryScreen onBack={onBack} />;
    case 'SCR_SETT_04':
      return <WrongParkingReportScreen onBack={onBack} />;
    case 'SCR_SETT_05':
      return <SmartDoorLockScreen onBack={onBack} />;
    case 'SCR_SETT_06':
      return <NotificationSoundScreen onBack={onBack} />;
    case 'SCR_SETT_01':
    default:
      return (
        <HouseholdSettingsHubScreen
          activeFlat={activeFlat}
          onBack={onBack}
          onOpenFamily={() => onNavigateScreen('SCR_SETT_02')}
          onOpenVehicles={() => onNavigateScreen('SCR_SETT_03')}
          onOpenWrongParking={() => onNavigateScreen('SCR_SETT_04')}
          onOpenSmartLock={() => onNavigateScreen('SCR_SETT_05')}
          onOpenNotifications={() => onNavigateScreen('SCR_SETT_06')}
          onOpenFlatSwitcher={onOpenFlatSwitcher}
          onOpenActivityHistory={onOpenActivityHistory}
        />
      );
  }
};
