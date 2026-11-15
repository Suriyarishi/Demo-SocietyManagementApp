import React from 'react';
import { ProfileSettingsScreen } from './ProfileSettingsScreen';
import { HouseholdMembersScreen } from './HouseholdMembersScreen';
import { SecurityPreferencesScreen } from './SecurityPreferencesScreen';
import { FlatEntity } from '../module02-home/MultiFlatSelectorSheet';

export interface Module07ControllerProps {
  currentStep: 'SCR_SET_01' | 'SCR_SET_02' | 'SCR_SET_03';
  activeFlat: FlatEntity;
  onBack: () => void;
  onNavigateScreen: (screenId: string) => void;
  onOpenFlatSwitcher: () => void;
  onOpenActivityHistory: () => void;
  onOpenStaffHub: () => void;
  onOpenGateHub: () => void;
  onOpenBillsHub: () => void;
}

export const Module07Controller: React.FC<Module07ControllerProps> = ({
  currentStep,
  activeFlat,
  onBack,
  onNavigateScreen,
  onOpenFlatSwitcher,
  onOpenActivityHistory,
  onOpenStaffHub,
  onOpenGateHub,
  onOpenBillsHub,
}) => {
  switch (currentStep) {
    case 'SCR_SET_02':
      return <HouseholdMembersScreen onBack={onBack} />;
    case 'SCR_SET_03':
      return <SecurityPreferencesScreen onBack={onBack} />;
    case 'SCR_SET_01':
    default:
      return (
        <ProfileSettingsScreen
          activeFlat={activeFlat}
          onBack={onBack}
          onOpenFlatSwitcher={onOpenFlatSwitcher}
          onOpenActivityHistory={onOpenActivityHistory}
          onOpenStaffHub={onOpenStaffHub}
          onOpenGateHub={onOpenGateHub}
          onOpenBillsHub={onOpenBillsHub}
          onOpenHouseholdMembers={() => onNavigateScreen('SCR_SET_02')}
          onOpenSecurityPreferences={() => onNavigateScreen('SCR_SET_03')}
        />
      );
  }
};
