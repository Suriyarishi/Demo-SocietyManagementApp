import React, { useState } from 'react';
import { WelcomeMobileScreen } from './WelcomeMobileScreen';
import { OtpVerificationScreen } from './OtpVerificationScreen';
import { SocietySearchScreen, SocietyItem } from './SocietySearchScreen';
import { FlatSelectionScreen } from './FlatSelectionScreen';
import { DocumentUploadScreen, ResidentRole } from './DocumentUploadScreen';
import { ProvisionalAccessScreen } from './ProvisionalAccessScreen';

export const MODULE01_SCREENS = [
  { id: 'SCR_AUTH_01', name: 'Welcome & Mobile Input', step: 1 },
  { id: 'SCR_AUTH_02', name: 'OTP Verification', step: 2 },
  { id: 'SCR_AUTH_03', name: 'Society Search', step: 3 },
  { id: 'SCR_AUTH_04', name: 'Tower & Flat Selection', step: 4 },
  { id: 'SCR_AUTH_05', name: 'Occupancy & Document Upload', step: 5 },
  { id: 'SCR_AUTH_06', name: 'Provisional Access Welcome', step: 6 },
];

interface Module01ControllerProps {
  currentScreenId: string;
  onScreenChange: (screenId: string) => void;
}

export const Module01Controller: React.FC<Module01ControllerProps> = ({
  currentScreenId,
  onScreenChange,
}) => {
  // Shared Onboarding State
  const [phoneNumber, setPhoneNumber] = useState<string>('9876543210');
  const [selectedSociety, setSelectedSociety] = useState<SocietyItem>({
    id: 'soc_01',
    name: 'Prestige Lakeside Habitat',
    locality: 'Whitefield',
    city: 'Bengaluru',
    flatsCount: '3,428 Flats',
    gateStatus: 'verified',
    address: 'Varthur Main Road, Gunjur, Bengaluru, Karnataka 560087',
  });
  const [unitInfo, setUnitInfo] = useState<{ tower: string; flatNumber: string; floor: string }>({
    tower: 'Tower 2',
    flatNumber: '1204',
    floor: '12',
  });
  const [residentRole, setResidentRole] = useState<ResidentRole>('tenant');
  const [isDocumentSubmitted, setIsDocumentSubmitted] = useState<boolean>(true);
  const [showCompletionModal, setShowCompletionModal] = useState<boolean>(false);

  // Screen 1 -> Screen 2
  const handleMobileContinue = (phone: string) => {
    setPhoneNumber(phone);
    onScreenChange('SCR_AUTH_02');
  };

  // Screen 2 -> Screen 3
  const handleOtpVerified = () => {
    onScreenChange('SCR_AUTH_03');
  };

  // Screen 3 -> Screen 4
  const handleSocietySelected = (soc: SocietyItem) => {
    setSelectedSociety(soc);
    onScreenChange('SCR_AUTH_04');
  };

  // Screen 4 -> Screen 5
  const handleUnitConfirmed = (unit: { tower: string; flatNumber: string; floor: string }) => {
    setUnitInfo(unit);
    onScreenChange('SCR_AUTH_05');
  };

  // Screen 5 -> Screen 6 (Standard submission)
  const handleDocumentSubmitted = (data: { role: ResidentRole; documentUploaded: boolean }) => {
    setResidentRole(data.role);
    setIsDocumentSubmitted(data.documentUploaded);
    onScreenChange('SCR_AUTH_06');
  };

  // Screen 5 -> Screen 6 (Skip to Provisional)
  const handleSkipToProvisional = (role: ResidentRole) => {
    setResidentRole(role);
    setIsDocumentSubmitted(false);
    onScreenChange('SCR_AUTH_06');
  };

  // Screen 6 -> Enter App completion
  const handleEnterApp = () => {
    setShowCompletionModal(true);
  };

  const handleInviteFamily = () => {
    alert(`Invite link generated for ${unitInfo.tower} - Unit ${unitInfo.flatNumber}. You can share this via WhatsApp with family members.`);
  };

  return (
    <div className="w-full h-full relative">
      {currentScreenId === 'SCR_AUTH_01' && (
        <WelcomeMobileScreen
          onContinue={handleMobileContinue}
          initialPhone={phoneNumber}
        />
      )}

      {currentScreenId === 'SCR_AUTH_02' && (
        <OtpVerificationScreen
          phoneNumber={phoneNumber}
          onVerified={handleOtpVerified}
          onBack={() => onScreenChange('SCR_AUTH_01')}
        />
      )}

      {currentScreenId === 'SCR_AUTH_03' && (
        <SocietySearchScreen
          selectedSocietyId={selectedSociety.id}
          onSelectSociety={handleSocietySelected}
          onBack={() => onScreenChange('SCR_AUTH_02')}
        />
      )}

      {currentScreenId === 'SCR_AUTH_04' && (
        <FlatSelectionScreen
          society={selectedSociety}
          onSelectUnit={handleUnitConfirmed}
          onBack={() => onScreenChange('SCR_AUTH_03')}
        />
      )}

      {currentScreenId === 'SCR_AUTH_05' && (
        <DocumentUploadScreen
          unitInfo={unitInfo}
          societyName={selectedSociety.name}
          onSubmitVerification={handleDocumentSubmitted}
          onSkipProvisional={handleSkipToProvisional}
          onBack={() => onScreenChange('SCR_AUTH_04')}
        />
      )}

      {currentScreenId === 'SCR_AUTH_06' && (
        <ProvisionalAccessScreen
          societyName={selectedSociety.name}
          unitInfo={unitInfo}
          role={residentRole}
          isDocumentSubmitted={isDocumentSubmitted}
          onEnterApp={handleEnterApp}
          onInviteFamily={handleInviteFamily}
        />
      )}

      {/* Completion Dialog */}
      {showCompletionModal && (
        <div className="absolute inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-6 text-left animate-in fade-in duration-200">
          <div className="w-full p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col gap-4">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center">
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <div>
              <h3 className="text-lg font-bold tracking-tight">
                Module 01 Flow Complete!
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
                You have successfully experienced all 6 screens of <strong>Module 01: Authentication, Onboarding & Society Verification</strong>.
              </p>
            </div>
            <div className="p-3 rounded-xl bg-slate-800/60 border border-slate-700/60 text-xs text-slate-300">
              <span className="text-emerald-400 font-bold block mb-1">Resident Verified:</span>
              <span>{unitInfo.tower} - Flat {unitInfo.flatNumber} • {selectedSociety.name}</span>
            </div>
            <div className="flex flex-col gap-2 pt-2">
              <button
                type="button"
                onClick={() => {
                  setShowCompletionModal(false);
                  onScreenChange('SCR_AUTH_01');
                }}
                className="w-full h-12 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs font-bold text-slate-200 transition-colors"
              >
                Replay Onboarding Journey
              </button>
              <button
                type="button"
                onClick={() => setShowCompletionModal(false)}
                className="w-full h-12 rounded-xl bg-cobalt-600 hover:bg-cobalt-500 text-xs font-bold text-white transition-colors"
              >
                Close & Review Screens
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
