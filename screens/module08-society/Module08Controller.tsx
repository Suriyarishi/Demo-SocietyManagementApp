import React from 'react';
import { SocietyHubScreen } from './SocietyHubScreen';
import { AmenityBookingScreen } from './AmenityBookingScreen';
import { NoticesCircularsScreen } from './NoticesCircularsScreen';
import { SocietyForumScreen } from './SocietyForumScreen';
import { IntercomDirectoryScreen } from './IntercomDirectoryScreen';
import { PinlessEntryScreen } from './PinlessEntryScreen';

export interface Module08ControllerProps {
  currentStep: 'SCR_SOC_01' | 'SCR_SOC_02' | 'SCR_SOC_03' | 'SCR_SOC_04' | 'SCR_SOC_05' | 'SCR_SOC_06';
  onBack?: () => void;
  onNavigateScreen: (screenId: string) => void;
  onOpenDailyStaff: () => void;
  onOpenGatePass: () => void;
  onOpenMarketplace: () => void;
}

export const Module08Controller: React.FC<Module08ControllerProps> = ({
  currentStep,
  onBack,
  onNavigateScreen,
  onOpenDailyStaff,
  onOpenGatePass,
  onOpenMarketplace,
}) => {
  switch (currentStep) {
    case 'SCR_SOC_02':
      return <AmenityBookingScreen onBack={onBack || (() => onNavigateScreen('SCR_SOC_01'))} />;
    case 'SCR_SOC_03':
      return <NoticesCircularsScreen onBack={onBack || (() => onNavigateScreen('SCR_SOC_01'))} />;
    case 'SCR_SOC_04':
      return <SocietyForumScreen onBack={onBack || (() => onNavigateScreen('SCR_SOC_01'))} />;
    case 'SCR_SOC_05':
      return <IntercomDirectoryScreen onBack={onBack || (() => onNavigateScreen('SCR_SOC_01'))} />;
    case 'SCR_SOC_06':
      return <PinlessEntryScreen onBack={onBack || (() => onNavigateScreen('SCR_SOC_01'))} />;
    case 'SCR_SOC_01':
    default:
      return (
        <SocietyHubScreen
          onBack={onBack}
          onOpenDailyStaff={onOpenDailyStaff}
          onOpenGatePass={onOpenGatePass}
          onOpenAmenities={() => onNavigateScreen('SCR_SOC_02')}
          onOpenNotices={() => onNavigateScreen('SCR_SOC_03')}
          onOpenForum={() => onNavigateScreen('SCR_SOC_04')}
          onOpenDirectory={() => onNavigateScreen('SCR_SOC_05')}
          onOpenPinlessEntry={() => onNavigateScreen('SCR_SOC_06')}
          onOpenMarketplace={onOpenMarketplace}
        />
      );
  }
};
