import React, { useState } from 'react';
import { MobileDeviceFrame } from './components/MobileDeviceFrame';
import { AppBottomNav, RootTabType } from './components/AppBottomNav';

// Module 01: Auth & Onboarding
import { WelcomeMobileScreen } from './screens/module01-auth/WelcomeMobileScreen';
import { OtpVerificationScreen } from './screens/module01-auth/OtpVerificationScreen';
import { SocietySearchScreen, SocietyItem } from './screens/module01-auth/SocietySearchScreen';
import { FlatSelectionScreen } from './screens/module01-auth/FlatSelectionScreen';
import { DocumentUploadScreen, ResidentRole } from './screens/module01-auth/DocumentUploadScreen';
import { ProvisionalAccessScreen } from './screens/module01-auth/ProvisionalAccessScreen';

// Module 02: Home Hub
import { HomeScreen } from './screens/module02-home/HomeScreen';
import { GlobalSearchScreen } from './screens/module02-home/GlobalSearchScreen';
import { MultiFlatSelectorSheet, FlatEntity, USER_FLATS } from './screens/module02-home/MultiFlatSelectorSheet';
import { ActivityTimelineScreen } from './screens/module02-home/ActivityTimelineScreen';

// Module 07: Profile & Resident Settings
import { ProfileSettingsScreen } from './screens/module07-settings/ProfileSettingsScreen';
import { HouseholdMembersScreen } from './screens/module07-settings/HouseholdMembersScreen';
import { SecurityPreferencesScreen } from './screens/module07-settings/SecurityPreferencesScreen';

// Module 08: Society Living Hub & Community
import { SocietyHubScreen } from './screens/module08-society/SocietyHubScreen';
import { AmenityBookingScreen } from './screens/module08-society/AmenityBookingScreen';
import { NoticesCircularsScreen } from './screens/module08-society/NoticesCircularsScreen';
import { SocietyForumScreen } from './screens/module08-society/SocietyForumScreen';
import { IntercomDirectoryScreen } from './screens/module08-society/IntercomDirectoryScreen';
import { PinlessEntryScreen } from './screens/module08-society/PinlessEntryScreen';

// Module 09: Resident Marketplace & Pre-Loved Classifieds
import { MarketplaceHubScreen, MarketplaceItem, SAMPLE_MARKETPLACE_ITEMS } from './screens/module09-marketplace/MarketplaceHubScreen';
import { CreateListingScreen } from './screens/module09-marketplace/CreateListingScreen';
import { ListingDetailChatScreen } from './screens/module09-marketplace/ListingDetailChatScreen';

// Module 10: Critical Safety, Emergency SOS & Guard Intercom
import { EmergencyHubScreen, EmergencyType } from './screens/module10-emergency/EmergencyHubScreen';
import { ActiveSosCountdownScreen } from './screens/module10-emergency/ActiveSosCountdownScreen';
import { GuardDispatchLiveScreen } from './screens/module10-emergency/GuardDispatchLiveScreen';
import { GuardIntercomDialerScreen } from './screens/module10-emergency/GuardIntercomDialerScreen';
import { EmergencyHelplinesScreen } from './screens/module10-emergency/EmergencyHelplinesScreen';

// Module 11: Household Management, Vehicles, Family & Settings
import { HouseholdSettingsHubScreen } from './screens/module11-household/HouseholdSettingsHubScreen';
import { FamilyTenantGovernanceScreen } from './screens/module11-household/FamilyTenantGovernanceScreen';
import { VehicleRegistryScreen } from './screens/module11-household/VehicleRegistryScreen';
import { WrongParkingReportScreen } from './screens/module11-household/WrongParkingReportScreen';
import { SmartDoorLockScreen } from './screens/module11-household/SmartDoorLockScreen';
import { NotificationSoundScreen } from './screens/module11-household/NotificationSoundScreen';

// Module 03: Gate Pass & Visitors
import { GateOverviewScreen, VisitorRecord, SAMPLE_VISITORS } from './screens/module03-gate/GateOverviewScreen';
import { PreApproveGuestScreen, PreApproveGuestFormData } from './screens/module03-gate/PreApproveGuestScreen';
import { GuestPassShareScreen } from './screens/module03-gate/GuestPassShareScreen';
import { DeliveryPassScreen, DeliveryPassData } from './screens/module03-gate/DeliveryPassScreen';
import { CabOverstayScreen } from './screens/module03-gate/CabOverstayScreen';
import { IncomingGateKnockScreen } from './screens/module03-gate/IncomingGateKnockScreen';
import { VisitorDetailScreen } from './screens/module03-gate/VisitorDetailScreen';

// Module 04: Daily Staff
import { StaffDashboardScreen, DomesticStaffMember, SAMPLE_HOUSEHOLD_STAFF } from './screens/module04-staff/StaffDashboardScreen';
import { StaffProfileAttendanceScreen } from './screens/module04-staff/StaffProfileAttendanceScreen';
import { CommunityStaffDirectoryScreen } from './screens/module04-staff/CommunityStaffDirectoryScreen';
import { AddStaffScreen } from './screens/module04-staff/AddStaffScreen';
import { StaffSalaryLedgerScreen } from './screens/module04-staff/StaffSalaryLedgerScreen';

// Module 05: Financials & Society Dues
import { FinancialHubScreen } from './screens/module05-payments/FinancialHubScreen';
import { ItemizedBillScreen } from './screens/module05-payments/ItemizedBillScreen';
import { CheckoutGatewayScreen } from './screens/module05-payments/CheckoutGatewayScreen';
import { PaymentReceiptScreen } from './screens/module05-payments/PaymentReceiptScreen';
import { SmartMeterScreen } from './screens/module05-payments/SmartMeterScreen';
import { AccountLedgerScreen } from './screens/module05-payments/AccountLedgerScreen';

// Module 06: Tickets & SLA Helpdesk
import { HelpdeskHubScreen, MaintenanceTicket, SAMPLE_TICKETS } from './screens/module06-tickets/HelpdeskHubScreen';
import { CreateTicketScreen, TicketFormData } from './screens/module06-tickets/CreateTicketScreen';
import { TicketDetailSlaScreen } from './screens/module06-tickets/TicketDetailSlaScreen';
import { ExpressServicesScreen, ExpressServiceItem, EXPRESS_CATALOG } from './screens/module06-tickets/ExpressServicesScreen';
import { BookServiceScreen } from './screens/module06-tickets/BookServiceScreen';
import { TicketSignoffScreen } from './screens/module06-tickets/TicketSignoffScreen';

import { ShieldAlert, CheckCircle, X } from 'lucide-react';

export function App() {
  // Navigation History Stack (Back-stack based routing)
  const [navStack, setNavStack] = useState<string[]>(['SCR_HOME_01']);
  const currentScreenId = navStack[navStack.length - 1] || 'SCR_HOME_01';

  // Shared Global App State
  const [activeFlat, setActiveFlat] = useState<FlatEntity>(USER_FLATS[0]);
  const [showFlatSheet, setShowFlatSheet] = useState<boolean>(false);
  const [toastMessage, setToastMessage] = useState<string>('');

  // Emergency SOS State
  const [showSosModal, setShowSosModal] = useState<boolean>(false);
  const [sosCountdown, setSosCountdown] = useState<number>(3);
  const [sosTriggered, setSosTriggered] = useState<boolean>(false);

  // Selected Entities for Detail Views
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
  const [selectedStaff, setSelectedStaff] = useState<DomesticStaffMember>(SAMPLE_HOUSEHOLD_STAFF[0]);
  const [payAmount, setPayAmount] = useState<number>(4250);
  const [receiptData, setReceiptData] = useState<any>({
    amount: 4250,
    txnId: 'TXN-9402910',
    timestamp: '09:42 AM',
    date: '26 Nov 2026',
    method: 'BHARAT UPI (PhonePe)',
    flat: 'Tower 2 - Flat 1204',
    society: 'Prestige Lakeside Habitat Association',
  });
  const [selectedTicket, setSelectedTicket] = useState<MaintenanceTicket>(SAMPLE_TICKETS[0]);
  const [selectedService, setSelectedService] = useState<ExpressServiceItem>(EXPRESS_CATALOG[0]);
  const [selectedMarketplaceItem, setSelectedMarketplaceItem] = useState<MarketplaceItem>(SAMPLE_MARKETPLACE_ITEMS[0]);
  const [activeSosType, setActiveSosType] = useState<EmergencyType>('medical');
  const [isSosSilent, setIsSosSilent] = useState<boolean>(false);

  // Module 01 Onboarding Form State
  const [onboardingPhone, setOnboardingPhone] = useState<string>('9876543210');
  const [onboardingSociety, setOnboardingSociety] = useState<SocietyItem>({
    id: 'soc_01',
    name: 'Prestige Lakeside Habitat',
    locality: 'Whitefield',
    city: 'Bengaluru',
    flatsCount: '3,428 Flats',
    gateStatus: 'verified',
    address: 'Varthur Main Road, Gunjur, Bengaluru, Karnataka 560087',
  });
  const [onboardingUnit, setOnboardingUnit] = useState<{ tower: string; flatNumber: string; floor: string }>({
    tower: 'Tower 2',
    flatNumber: '1204',
    floor: '12',
  });
  const [onboardingRole, setOnboardingRole] = useState<ResidentRole>('tenant');
  const [onboardingDocSubmitted, setOnboardingDocSubmitted] = useState<boolean>(true);

  // Router Functions
  const pushScreen = (screenId: string) => {
    setNavStack((prev) => [...prev, screenId]);
  };

  const goBack = () => {
    setNavStack((prev) => (prev.length > 1 ? prev.slice(0, -1) : ['SCR_HOME_01']));
  };

  const resetTo = (screenId: string) => {
    setNavStack([screenId]);
  };

  const switchTab = (tab: RootTabType) => {
    switch (tab) {
      case 'home':
        resetTo('SCR_HOME_01');
        break;
      case 'search':
        resetTo('SCR_HOME_02');
        break;
      case 'society':
      case 'services':
        resetTo('SCR_SOC_01');
        break;
      case 'activity':
      case 'bills':
        resetTo('SCR_HOME_04');
        break;
      case 'profile':
        resetTo('SCR_SETT_01');
        break;
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(''), 3000);
  };

  // SOS Countdown Trigger
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

  const getActiveTab = (): RootTabType => {
    if (currentScreenId === 'SCR_HOME_02') return 'search';
    if (currentScreenId === 'SCR_HOME_04') return 'activity';
    if (currentScreenId.startsWith('SCR_SETT_') || currentScreenId.startsWith('SCR_SET_')) return 'profile';
    if (currentScreenId.startsWith('SCR_SOC_') || currentScreenId.startsWith('SCR_MKT_')) return 'society';
    if (currentScreenId.startsWith('SCR_PAY_')) return 'activity';
    if (currentScreenId.startsWith('SCR_TICK_')) return 'society';
    if (currentScreenId.startsWith('SCR_STAFF_')) return 'profile';
    return 'home';
  };

  // Only show bottom navigation dock on 5 primary root hub tabs (hidesBottomBarWhenPushed = true on all detail/flow/checkout screens)
  const ROOT_SCREEN_IDS = [
    'SCR_HOME_01', // Home Command Hub
    'SCR_HOME_02', // Global Search & Directory
    'SCR_SOC_01',  // Society Hub
    'SCR_HOME_04', // Activity Timeline
    'SCR_SETT_01', // Household & Settings Hub
    'SCR_SETTING_01',
    'SCR_SET_01',
  ];
  const shouldShowBottomNav = ROOT_SCREEN_IDS.includes(currentScreenId);

  return (
    <MobileDeviceFrame>
      {/* Toast Notification (Anchored inside phone viewport) */}
      {toastMessage && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMessage}</span>
        </div>
      )}

      {/* Main Viewport Routing Canvas (Independently Scrollable Stream) */}
      <div className="w-full flex-1 overflow-y-auto overflow-x-hidden no-scrollbar relative flex flex-col justify-between">
        {/* ========================================================
            MODULE 02: HOME COMMAND HUB
            ======================================================== */}
        {currentScreenId === 'SCR_HOME_01' && (
          <HomeScreen
            activeFlat={activeFlat}
            onOpenFlatSwitcher={() => setShowFlatSheet(true)}
            onOpenSearch={() => pushScreen('SCR_HOME_02')}
            onOpenProfileSettings={() => pushScreen('SCR_SETT_01')}
            onOpenActivityHistory={() => pushScreen('SCR_HOME_04')}
            onNavigateTab={(tab) => {
              if (tab === 'home') resetTo('SCR_HOME_01');
              else if (tab === 'community') resetTo('SCR_SOC_01');
              else if (tab === 'gate') pushScreen('SCR_GATE_01');
              else if (tab === 'services') resetTo('SCR_TICK_01');
            }}
            onTriggerSOS={() => pushScreen('SCR_SOS_01')}
            onPreApproveGuest={() => pushScreen('SCR_GATE_02')}
            onDeliveryPass={() => pushScreen('SCR_GATE_04')}
            onPayBills={() => pushScreen('SCR_PAY_01')}
            onDailyHelp={() => pushScreen('SCR_STAFF_01')}
            onOpenAmenities={() => pushScreen('SCR_SOC_02')}
            onOpenNotices={() => pushScreen('SCR_SOC_03')}
            onOpenForum={() => pushScreen('SCR_SOC_04')}
            onOpenDirectory={() => pushScreen('SCR_SOC_05')}
            onOpenPinless={() => pushScreen('SCR_SOC_06')}
            onOpenMarketplace={() => pushScreen('SCR_MKT_01')}
            onOpenSmartMeter={() => pushScreen('SCR_PAY_04')}
            onOpenItemizedBill={() => pushScreen('SCR_PAY_02')}
            onSelectExpressService={(srv) => {
              const matched = EXPRESS_CATALOG.find(
                (item) =>
                  item.title.toLowerCase().includes(srv.title.toLowerCase()) ||
                  srv.title.toLowerCase().includes(item.title.toLowerCase())
              );
              if (matched) {
                setSelectedService(matched);
              } else {
                setSelectedService({
                  id: `srv_${srv.title.toLowerCase().replace(/\s+/g, '_')}`,
                  title: srv.title,
                  category: (srv.category.toLowerCase().includes('clean')
                    ? 'cleaning'
                    : srv.category.toLowerCase().includes('paint')
                    ? 'cleaning'
                    : srv.category.toLowerCase().includes('shift')
                    ? 'carpentry'
                    : 'plumbing') as any,
                  price: parseInt(srv.basePrice.replace(/\D/g, '')) || 299,
                  etaMinutes: 15,
                  rating: 4.9,
                  jobsCompleted: 142,
                  description: `Pre-vetted society technician for ${srv.title} with 15-minute dispatch SLA.`,
                });
              }
              pushScreen('SCR_TICK_05');
            }}
          />
        )}

        {/* ========================================================
            MODULE 08: SOCIETY LIVING HUB (BOTTOM TAB 2)
            ======================================================== */}
        {currentScreenId === 'SCR_SOC_01' && (
          <SocietyHubScreen
            onBack={navStack.length > 1 ? goBack : undefined}
            onOpenDailyStaff={() => pushScreen('SCR_STAFF_01')}
            onOpenGatePass={() => pushScreen('SCR_GATE_01')}
            onOpenAmenities={() => pushScreen('SCR_SOC_02')}
            onOpenNotices={() => pushScreen('SCR_SOC_03')}
            onOpenForum={() => pushScreen('SCR_SOC_04')}
            onOpenDirectory={() => pushScreen('SCR_SOC_05')}
            onOpenPinlessEntry={() => pushScreen('SCR_SOC_06')}
            onOpenMarketplace={() => pushScreen('SCR_MKT_01')}
          />
        )}

        {currentScreenId === 'SCR_SOC_02' && (
          <AmenityBookingScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SOC_03' && (
          <NoticesCircularsScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SOC_04' && (
          <SocietyForumScreen onBack={goBack} onNavigateTab={switchTab} />
        )}

        {currentScreenId === 'SCR_SOC_05' && (
          <IntercomDirectoryScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SOC_06' && (
          <PinlessEntryScreen onBack={goBack} />
        )}

        {/* ========================================================
            MODULE 09: RESIDENT MARKETPLACE & PRE-LOVED CLASSIFIEDS
            ======================================================== */}
        {currentScreenId === 'SCR_MKT_01' && (
          <MarketplaceHubScreen
            onBack={goBack}
            onSelectItem={(item) => {
              setSelectedMarketplaceItem(item);
              pushScreen('SCR_MKT_03');
            }}
            onCreateListing={() => pushScreen('SCR_MKT_02')}
          />
        )}

        {currentScreenId === 'SCR_MKT_02' && (
          <CreateListingScreen
            onBack={goBack}
            onListingCreated={(item) => {
              setSelectedMarketplaceItem(item);
              showToast(`✓ Published ${item.title}`);
              pushScreen('SCR_MKT_03');
            }}
          />
        )}

        {currentScreenId === 'SCR_MKT_03' && (
          <ListingDetailChatScreen
            item={selectedMarketplaceItem}
            onBack={goBack}
          />
        )}

        {/* ========================================================
            MODULE 07 & MODULE 11: RESIDENT, HOUSEHOLD & SETTINGS HUB
            ======================================================== */}
        {(currentScreenId === 'SCR_SETT_01' || currentScreenId === 'SCR_SETTING_01' || currentScreenId === 'SCR_SET_01') && (
          <HouseholdSettingsHubScreen
            activeFlat={activeFlat}
            onBack={goBack}
            onOpenFamily={() => pushScreen('SCR_SETT_02')}
            onOpenVehicles={() => pushScreen('SCR_SETT_03')}
            onOpenWrongParking={() => pushScreen('SCR_SETT_04')}
            onOpenSmartLock={() => pushScreen('SCR_SETT_05')}
            onOpenNotifications={() => pushScreen('SCR_SETT_06')}
            onOpenSecurityPreferences={() => pushScreen('SCR_SET_03')}
            onOpenStaffHub={() => pushScreen('SCR_STAFF_01')}
            onOpenBillsHub={() => resetTo('SCR_PAY_01')}
            onOpenFlatSwitcher={() => setShowFlatSheet(true)}
            onOpenActivityHistory={() => pushScreen('SCR_HOME_04')}
          />
        )}

        {currentScreenId === 'SCR_SET_02' && (
          <HouseholdMembersScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SET_03' && (
          <SecurityPreferencesScreen onBack={goBack} />
        )}

        {/* ========================================================
            MODULE 10: CRITICAL SAFETY, EMERGENCY SOS & INTERCOM
            ======================================================== */}
        {currentScreenId === 'SCR_SOS_01' && (
          <EmergencyHubScreen
            onBack={goBack}
            onTriggerSos={(type, isSilent) => {
              setActiveSosType(type);
              setIsSosSilent(isSilent);
              pushScreen('SCR_SOS_02');
            }}
            onOpenIntercom={() => pushScreen('SCR_SOS_04')}
            onOpenHelplines={() => pushScreen('SCR_SOS_05')}
          />
        )}

        {currentScreenId === 'SCR_SOS_02' && (
          <ActiveSosCountdownScreen
            emergencyType={activeSosType}
            isSilent={isSosSilent}
            onCancel={goBack}
            onCountdownComplete={() => pushScreen('SCR_SOS_03')}
          />
        )}

        {currentScreenId === 'SCR_SOS_03' && (
          <GuardDispatchLiveScreen
            emergencyType={activeSosType}
            onResolve={() => {
              showToast('✓ Emergency Incident Resolved');
              resetTo('SCR_HOME_01');
            }}
            onCallGuard={() => pushScreen('SCR_SOS_04')}
          />
        )}

        {currentScreenId === 'SCR_SOS_04' && (
          <GuardIntercomDialerScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SOS_05' && (
          <EmergencyHelplinesScreen onBack={goBack} />
        )}

        {/* ========================================================
            MODULE 11: HOUSEHOLD SUB-SCREENS
            ======================================================== */}

        {currentScreenId === 'SCR_SETT_02' && (
          <FamilyTenantGovernanceScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SETT_03' && (
          <VehicleRegistryScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SETT_04' && (
          <WrongParkingReportScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SETT_05' && (
          <SmartDoorLockScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_SETT_06' && (
          <NotificationSoundScreen onBack={goBack} />
        )}

        {currentScreenId === 'SCR_HOME_02' && (
          <GlobalSearchScreen
            onBack={goBack}
            onSelectResult={(item) => {
              showToast(`Navigating to ${item.title}`);
              if (item.category === 'Visitors') pushScreen('SCR_GATE_01');
              else if (item.category === 'Staff') pushScreen('SCR_STAFF_01');
              else if (item.category === 'Bills') pushScreen('SCR_PAY_01');
              else if (item.category === 'Helpdesk') pushScreen('SCR_TICK_01');
              else goBack();
            }}
          />
        )}

        {currentScreenId === 'SCR_HOME_04' && (
          <ActivityTimelineScreen onBack={goBack} />
        )}

        {/* ========================================================
            MODULE 03: GATE PASS & VISITORS
            ======================================================== */}
        {currentScreenId === 'SCR_GATE_01' && (
          <GateOverviewScreen
            onBack={navStack.length > 1 ? goBack : undefined}
            onPreApproveGuest={() => pushScreen('SCR_GATE_02')}
            onDeliveryPass={() => pushScreen('SCR_GATE_04')}
            onCabPass={() => pushScreen('SCR_GATE_05')}
            onSelectVisitor={(v) => {
              setSelectedVisitor(v);
              pushScreen('SCR_GATE_07');
            }}
            onSimulateIncomingKnock={() => pushScreen('SCR_GATE_06')}
            onCallGuardKiosk={() => showToast('VoIP Line connected to Gate 1 Guard Kiosk')}
          />
        )}

        {currentScreenId === 'SCR_GATE_02' && (
          <PreApproveGuestScreen
            onBack={goBack}
            onSubmit={(data) => {
              setActiveGuestPass(data);
              pushScreen('SCR_GATE_03');
            }}
          />
        )}

        {currentScreenId === 'SCR_GATE_03' && (
          <GuestPassShareScreen
            passData={activeGuestPass}
            onClose={() => resetTo('SCR_GATE_01')}
          />
        )}

        {currentScreenId === 'SCR_GATE_04' && (
          <DeliveryPassScreen
            onBack={goBack}
            onPassActivated={(data) => {
              showToast(`Active: ${data.company} Express Pass (Claim PIN: ${data.claimPin})`);
              goBack();
            }}
          />
        )}

        {currentScreenId === 'SCR_GATE_05' && (
          <CabOverstayScreen
            onBack={goBack}
            onCabPassCreated={(cab) => {
              showToast(`Cab Pass issued for ${cab.cabNumber} (${cab.provider})`);
              goBack();
            }}
          />
        )}

        {currentScreenId === 'SCR_GATE_06' && (
          <IncomingGateKnockScreen
            onClose={goBack}
            onAllowEntry={() => {
              showToast('Visitor allowed at Gate 1');
              goBack();
            }}
            onDenyEntry={() => {
              showToast('Visitor denied entry');
              goBack();
            }}
            onCallGuard={() => showToast('Calling Gate 1 guard...')}
          />
        )}

        {currentScreenId === 'SCR_GATE_07' && (
          <VisitorDetailScreen
            visitor={selectedVisitor}
            onBack={goBack}
          />
        )}

        {/* ========================================================
            MODULE 04: DAILY STAFF & TURNSTILE
            ======================================================== */}
        {currentScreenId === 'SCR_STAFF_01' && (
          <StaffDashboardScreen
            onBack={navStack.length > 1 ? goBack : undefined}
            onSelectStaff={(staff) => {
              setSelectedStaff(staff);
              pushScreen('SCR_STAFF_02');
            }}
            onBrowseDirectory={() => pushScreen('SCR_STAFF_03')}
            onAddNewStaff={() => pushScreen('SCR_STAFF_04')}
            onOpenLedger={() => pushScreen('SCR_STAFF_05')}
          />
        )}

        {currentScreenId === 'SCR_STAFF_02' && (
          <StaffProfileAttendanceScreen
            staff={selectedStaff}
            onBack={goBack}
            onOpenLedger={() => pushScreen('SCR_STAFF_05')}
          />
        )}

        {currentScreenId === 'SCR_STAFF_03' && (
          <CommunityStaffDirectoryScreen
            onBack={goBack}
            onSelectStaff={(staff) => {
              setSelectedStaff(staff);
              pushScreen('SCR_STAFF_02');
            }}
            onAddStaffToFlat={(staff) => {
              showToast(`✓ Linked ${staff.name} (${staff.role}) to Flat 1204`);
              goBack();
            }}
          />
        )}

        {currentScreenId === 'SCR_STAFF_04' && (
          <AddStaffScreen
            onBack={goBack}
            onStaffAdded={(staffData) => {
              showToast(`✓ Staff member ${staffData.name} (${staffData.role}) added`);
              goBack();
            }}
          />
        )}

        {currentScreenId === 'SCR_STAFF_05' && (
          <StaffSalaryLedgerScreen onBack={goBack} />
        )}

        {/* ========================================================
            MODULE 05: FINANCIALS & SOCIETY DUES
            ======================================================== */}
        {currentScreenId === 'SCR_PAY_01' && (
          <FinancialHubScreen
            onBack={navStack.length > 1 ? goBack : undefined}
            onPayNow={(amount) => {
              setPayAmount(amount);
              pushScreen('SCR_PAY_03');
            }}
            onViewItemizedBill={() => pushScreen('SCR_PAY_02')}
            onOpenSmartMeter={() => pushScreen('SCR_PAY_04')}
            onOpenLedger={() => pushScreen('SCR_PAY_06')}
            onQuickRechargeEB={(amount) => {
              showToast(`Smart EB Meter credited with +₹${amount.toLocaleString()}!`);
            }}
          />
        )}

        {currentScreenId === 'SCR_PAY_02' && (
          <ItemizedBillScreen
            onBack={goBack}
            onProceedToPay={(amount) => {
              setPayAmount(amount);
              pushScreen('SCR_PAY_03');
            }}
          />
        )}

        {currentScreenId === 'SCR_PAY_03' && (
          <CheckoutGatewayScreen
            amount={payAmount}
            onBack={goBack}
            onPaymentSuccess={(receipt) => {
              setReceiptData(receipt);
              pushScreen('SCR_PAY_05');
            }}
          />
        )}

        {currentScreenId === 'SCR_PAY_04' && (
          <SmartMeterScreen
            onBack={goBack}
            onQuickRecharge={(amount) => {
              showToast(`₹${amount} recharged to Smart Meter via UPI!`);
            }}
          />
        )}

        {currentScreenId === 'SCR_PAY_05' && (
          <PaymentReceiptScreen
            receiptData={receiptData}
            onReturnToHub={() => resetTo('SCR_PAY_01')}
          />
        )}

        {currentScreenId === 'SCR_PAY_06' && (
          <AccountLedgerScreen onBack={goBack} />
        )}

        {/* ========================================================
            MODULE 06: HELPDESK & 15m EXPRESS SERVICES
            ======================================================== */}
        {currentScreenId === 'SCR_TICK_01' && (
          <HelpdeskHubScreen
            onBack={navStack.length > 1 ? goBack : undefined}
            onRaiseTicket={() => pushScreen('SCR_TICK_02')}
            onSelectTicket={(ticket) => {
              setSelectedTicket(ticket);
              pushScreen('SCR_TICK_03');
            }}
            onOpenExpressServices={() => pushScreen('SCR_TICK_04')}
          />
        )}

        {currentScreenId === 'SCR_TICK_02' && (
          <CreateTicketScreen
            onBack={goBack}
            onSubmitTicket={() => {
              showToast(`Ticket submitted with 24h SLA`);
              pushScreen('SCR_TICK_03');
            }}
          />
        )}

        {currentScreenId === 'SCR_TICK_03' && (
          <TicketDetailSlaScreen
            ticket={selectedTicket}
            onBack={goBack}
            onProceedToSignoff={() => pushScreen('SCR_TICK_06')}
            onEscalate={() => showToast('Escalated to Association Secretary & President')}
          />
        )}

        {currentScreenId === 'SCR_TICK_04' && (
          <ExpressServicesScreen
            onBack={goBack}
            onSelectService={(service) => {
              setSelectedService(service);
              pushScreen('SCR_TICK_05');
            }}
          />
        )}

        {currentScreenId === 'SCR_TICK_05' && (
          <BookServiceScreen
            service={selectedService}
            onBack={goBack}
            onBookingConfirmed={(bookingData) => {
              showToast(`Service booked: Technician dispatched for ${bookingData.slot}`);
              pushScreen('SCR_TICK_03');
            }}
          />
        )}

        {currentScreenId === 'SCR_TICK_06' && (
          <TicketSignoffScreen
            ticket={selectedTicket}
            onBack={goBack}
            onSubmitSignoff={(reviewData) => {
              showToast(`Ticket #${reviewData.ticketId} closed successfully. Thank you!`);
              resetTo('SCR_TICK_01');
            }}
          />
        )}

        {/* ========================================================
            MODULE 01: AUTH & ONBOARDING (REACHED VIA FLAT SWITCHER)
            ======================================================== */}
        {currentScreenId === 'SCR_AUTH_01' && (
          <WelcomeMobileScreen
            onContinue={(phone) => {
              setOnboardingPhone(phone);
              pushScreen('SCR_AUTH_02');
            }}
            onBack={navStack.length > 1 ? goBack : undefined}
            initialPhone={onboardingPhone}
          />
        )}

        {currentScreenId === 'SCR_AUTH_02' && (
          <OtpVerificationScreen
            phoneNumber={onboardingPhone}
            onVerified={() => pushScreen('SCR_AUTH_03')}
            onBack={goBack}
          />
        )}

        {currentScreenId === 'SCR_AUTH_03' && (
          <SocietySearchScreen
            selectedSocietyId={onboardingSociety.id}
            onSelectSociety={(soc) => {
              setOnboardingSociety(soc);
              pushScreen('SCR_AUTH_04');
            }}
            onBack={goBack}
          />
        )}

        {currentScreenId === 'SCR_AUTH_04' && (
          <FlatSelectionScreen
            society={onboardingSociety}
            onSelectUnit={(unit) => {
              setOnboardingUnit(unit);
              pushScreen('SCR_AUTH_05');
            }}
            onBack={goBack}
          />
        )}

        {currentScreenId === 'SCR_AUTH_05' && (
          <DocumentUploadScreen
            unitInfo={onboardingUnit}
            societyName={onboardingSociety.name}
            onSubmitVerification={(data) => {
              setOnboardingRole(data.role);
              setOnboardingDocSubmitted(data.documentUploaded);
              pushScreen('SCR_AUTH_06');
            }}
            onSkipProvisional={(role) => {
              setOnboardingRole(role);
              setOnboardingDocSubmitted(false);
              pushScreen('SCR_AUTH_06');
            }}
            onBack={goBack}
          />
        )}

        {currentScreenId === 'SCR_AUTH_06' && (
          <ProvisionalAccessScreen
            societyName={onboardingSociety.name}
            unitInfo={onboardingUnit}
            role={onboardingRole}
            isDocumentSubmitted={onboardingDocSubmitted}
            onBack={goBack}
            onEnterApp={() => {
              setActiveFlat({
                id: `flat_${onboardingUnit.flatNumber}`,
                societyName: onboardingSociety.name,
                unit: `${onboardingUnit.tower} - Flat ${onboardingUnit.flatNumber}`,
                role: onboardingRole === 'owner' ? 'Owner Resident' : 'Tenant Resident',
                gateKey: 'GATE-PLH-9402',
              });
              showToast(`Welcome to ${onboardingSociety.name}!`);
              resetTo('SCR_HOME_01');
            }}
            onInviteFamily={() => {
              showToast('Invite link copied for family WhatsApp!');
            }}
          />
        )}
      </div>

      {/* ========================================================
          PERSISTENT APP BOTTOM NAVIGATION DOCK
          Visible ONLY on 5 Primary Hub Screens (hidesBottomBarWhenPushed)
          ======================================================== */}
      {shouldShowBottomNav ? (
        <AppBottomNav
          activeTab={getActiveTab()}
          onTabChange={switchTab}
        />
      ) : currentScreenId === 'SCR_SOC_04' ? null : (
        <div className="w-full h-6 flex items-center justify-center select-none bg-white dark:bg-[#070A11] shrink-0 border-t border-slate-100/40 dark:border-white/5">
          <div className="w-32 h-1 bg-black/40 dark:bg-white/40 rounded-full" />
        </div>
      )}

      {/* ========================================================
          GLOBAL OVERLAYS (FLAT SWITCHER & SOS)
          Anchored strictly inside phone viewport
          ======================================================== */}

      {/* Multi-Flat Switcher Bottom Sheet */}
      {showFlatSheet && (
        <MultiFlatSelectorSheet
          activeFlatId={activeFlat.id}
          onSelectFlat={(f) => {
            setActiveFlat(f);
            setShowFlatSheet(false);
            showToast(`Switched residence to ${f.unit}`);
          }}
          onClose={() => setShowFlatSheet(false)}
          onAddNewFlat={() => {
            setShowFlatSheet(false);
            pushScreen('SCR_AUTH_01');
          }}
        />
      )}

      {/* Emergency SOS Modal */}
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
                  : `Triggering security siren at Gate 1 & 2 in ${sosCountdown}s...`}
              </p>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs flex flex-col gap-1.5">
              <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                <span>LOCATION:</span>
                <span className="text-white font-bold">{activeFlat.unit}</span>
              </div>
              <div className="flex justify-between text-slate-400 font-mono text-[11px]">
                <span>SOCIETY:</span>
                <span className="text-white font-bold">{activeFlat.societyName}</span>
              </div>
            </div>

            <div className="flex items-center gap-2 pt-1">
              {!sosTriggered ? (
                <button
                  type="button"
                  onClick={() => {
                    setShowSosModal(false);
                    setSosTriggered(false);
                  }}
                  className="w-full h-11 rounded-2xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors"
                >
                  Cancel SOS False Alarm
                </button>
              ) : (
                <button
                  type="button"
                  onClick={() => setShowSosModal(false)}
                  className="w-full h-11 rounded-2xl bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-xs transition-colors"
                >
                  Acknowledge & Close
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </MobileDeviceFrame>
  );
}

export default App;
