import React, { useState } from 'react';
import { MarketplaceHubScreen, MarketplaceItem, SAMPLE_MARKETPLACE_ITEMS } from './MarketplaceHubScreen';
import { CreateListingScreen } from './CreateListingScreen';
import { ListingDetailChatScreen } from './ListingDetailChatScreen';

export interface Module09ControllerProps {
  currentStep: 'SCR_MKT_01' | 'SCR_MKT_02' | 'SCR_MKT_03';
  onBack?: () => void;
  onNavigateScreen: (screenId: string) => void;
  selectedItem?: MarketplaceItem;
  onSelectItem?: (item: MarketplaceItem) => void;
}

export const Module09Controller: React.FC<Module09ControllerProps> = ({
  currentStep,
  onBack,
  onNavigateScreen,
  selectedItem,
  onSelectItem,
}) => {
  const [activeItem, setActiveItem] = useState<MarketplaceItem>(selectedItem || SAMPLE_MARKETPLACE_ITEMS[0]);

  switch (currentStep) {
    case 'SCR_MKT_02':
      return (
        <CreateListingScreen
          onBack={onBack || (() => onNavigateScreen('SCR_MKT_01'))}
          onListingCreated={(item) => {
            setActiveItem(item);
            if (onSelectItem) onSelectItem(item);
            onNavigateScreen('SCR_MKT_03');
          }}
        />
      );
    case 'SCR_MKT_03':
      return (
        <ListingDetailChatScreen
          item={activeItem}
          onBack={onBack || (() => onNavigateScreen('SCR_MKT_01'))}
        />
      );
    case 'SCR_MKT_01':
    default:
      return (
        <MarketplaceHubScreen
          onBack={onBack}
          onSelectItem={(item) => {
            setActiveItem(item);
            if (onSelectItem) onSelectItem(item);
            onNavigateScreen('SCR_MKT_03');
          }}
          onCreateListing={() => onNavigateScreen('SCR_MKT_02')}
        />
      );
  }
};
