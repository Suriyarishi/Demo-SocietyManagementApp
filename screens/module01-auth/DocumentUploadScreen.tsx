import React, { useState } from 'react';
import {
  ArrowLeft,
  UploadCloud,
  FileText,
  Camera,
  CheckCircle2,
  Trash2,
  ShieldCheck,
  Clock,
  ChevronRight,
  UserCheck,
  Sparkles,
  Eye
} from 'lucide-react';
import { Button, StepProgress } from '../../components/UIComponents';

export type ResidentRole = 'owner_residing' | 'tenant' | 'owner_non_residing';

interface DocumentUploadScreenProps {
  unitInfo: { tower: string; flatNumber: string; floor: string };
  societyName: string;
  onSubmitVerification: (data: { role: ResidentRole; documentUploaded: boolean }) => void;
  onSkipProvisional: (role: ResidentRole) => void;
  onBack: () => void;
}

export const DocumentUploadScreen: React.FC<DocumentUploadScreenProps> = ({
  unitInfo,
  societyName,
  onSubmitVerification,
  onSkipProvisional,
  onBack,
}) => {
  const [role, setRole] = useState<ResidentRole>('tenant');
  const [uploadedFile, setUploadedFile] = useState<{ name: string; size: string; preview: boolean } | null>({
    name: 'Registered_Lease_Agreement_2026.pdf',
    size: '2.4 MB',
    preview: true,
  });
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [isScanning, setIsScanning] = useState<boolean>(false);

  const roleOptions: { id: ResidentRole; title: string; subtitle: string; docHint: string }[] = [
    {
      id: 'owner_residing',
      title: 'Owner (Residing)',
      subtitle: 'I own and live in this flat',
      docHint: 'Sale Deed, Property Tax Receipt, or Possession Letter',
    },
    {
      id: 'tenant',
      title: 'Tenant Resident',
      subtitle: 'I am renting this flat',
      docHint: 'Registered Rental / Lease Agreement',
    },
    {
      id: 'owner_non_residing',
      title: 'Owner (Non-Residing)',
      subtitle: 'I own this flat but live elsewhere',
      docHint: 'Sale Deed / Electricity Bill for ownership confirmation',
    },
  ];

  const handleSimulateCameraScan = () => {
    setIsScanning(true);
    setTimeout(() => {
      setIsScanning(false);
      setUploadedFile({
        name: `Camera_Scan_${role === 'tenant' ? 'Lease' : 'SaleDeed'}_Flat${unitInfo.flatNumber}.jpg`,
        size: '1.8 MB',
        preview: true,
      });
    }, 1000);
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitVerification({ role, documentUploaded: !!uploadedFile });
    }, 700);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300">
      {/* Top Header & Step Bar */}
      <div className="flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <div className="w-48">
            <StepProgress currentStep={4} totalSteps={4} stepLabels={['Verification', 'Society', 'Unit', 'Role']} />
          </div>
        </div>

        {/* Title */}
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 border border-cobalt-200 dark:border-cobalt-800/40 uppercase tracking-wider">
              {unitInfo.tower} • Unit {unitInfo.flatNumber}
            </span>
          </div>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Verify Occupancy
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Society Management Committee requires occupancy proof to issue full gate privileges.
          </p>
        </div>

        {/* Resident Role Radio Cards */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Your Resident Status
          </label>
          <div className="flex flex-col gap-2">
            {roleOptions.map((opt) => {
              const isSelected = role === opt.id;
              return (
                <div
                  key={opt.id}
                  onClick={() => setRole(opt.id)}
                  className={`
                    p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer flex items-center justify-between
                    ${isSelected
                      ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/30 dark:bg-cobalt-950/40 ring-1 ring-cobalt-500/40 shadow-sm'
                      : 'border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 hover:border-slate-300 dark:hover:border-obsidian-750'}
                  `}
                >
                  <div>
                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {opt.title}
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                      {opt.subtitle}
                    </p>
                  </div>
                  <div className={`w-5 h-5 rounded-full flex items-center justify-center border transition-all ${
                    isSelected ? 'border-cobalt-600 bg-cobalt-600 text-white' : 'border-slate-300 dark:border-obsidian-700'
                  }`}>
                    {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Document Upload Container */}
        <div className="flex flex-col gap-2">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Upload Document ({roleOptions.find(r => r.id === role)?.docHint})
          </label>

          {uploadedFile ? (
            <div className="p-4 rounded-2xl border border-emerald-500/40 bg-emerald-50/30 dark:bg-emerald-950/20 flex items-center justify-between shadow-ambient">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <FileText size={20} />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <span className="text-xs font-bold text-slate-900 dark:text-white truncate max-w-[180px]">
                      {uploadedFile.name}
                    </span>
                    <CheckCircle2 size={14} className="text-emerald-500 shrink-0" />
                  </div>
                  <span className="text-[11px] text-slate-500 dark:text-slate-400">
                    {uploadedFile.size} • OCR Verified by Gate System
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setUploadedFile(null)}
                className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-500 hover:text-crimson-600 flex items-center justify-center transition-colors"
                title="Remove file"
              >
                <Trash2 size={16} />
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-2">
              <div
                onClick={() => setUploadedFile({ name: 'Rental_Agreement_2026.pdf', size: '2.4 MB', preview: true })}
                className="p-6 rounded-3xl border-2 border-dashed border-slate-300 dark:border-obsidian-750 bg-white dark:bg-obsidian-900 text-center flex flex-col items-center justify-center gap-2 cursor-pointer hover:border-cobalt-500 dark:hover:border-cobalt-500 transition-colors shadow-ambient"
              >
                <div className="w-12 h-12 rounded-2xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center">
                  <UploadCloud size={24} />
                </div>
                <div>
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">
                    Tap to upload PDF, JPG, PNG
                  </p>
                  <p className="text-[11px] text-slate-400 mt-0.5">
                    Max size: 10 MB • Instant OCR Verification
                  </p>
                </div>
              </div>

              {/* Direct Camera Scan Option */}
              <button
                type="button"
                onClick={handleSimulateCameraScan}
                disabled={isScanning}
                className="h-12 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 text-slate-800 dark:text-slate-200 text-xs font-bold flex items-center justify-center gap-2 transition-colors border border-slate-200 dark:border-obsidian-750"
              >
                <Camera size={16} className={isScanning ? 'animate-spin text-cobalt-500' : ''} />
                <span>{isScanning ? 'Scanning document edges...' : 'Scan Physical Document with Camera'}</span>
              </button>
            </div>
          )}
        </div>

        {/* Provisional Access Skip Option */}
        <div className="p-3.5 rounded-2xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-center justify-between text-xs">
          <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
            <Clock size={15} className="text-amber-500 shrink-0" />
            <span>Don't have documents right now?</span>
          </div>
          <button
            type="button"
            onClick={() => onSkipProvisional(role)}
            className="font-bold text-cobalt-600 dark:text-cobalt-400 hover:underline shrink-0"
          >
            Skip to Provisional
          </button>
        </div>
      </div>

      {/* Bottom Action CTA */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Submit for Society Verification
        </Button>
      </div>
    </div>
  );
};
