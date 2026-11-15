import React, { useState } from 'react';
import {
  ArrowLeft,
  User,
  Phone,
  Calendar,
  Clock,
  Car,
  Users,
  ChevronRight,
  Sparkles,
  CheckCircle2
} from 'lucide-react';
import { Button, Input } from '../../components/UIComponents';

export interface PreApproveGuestFormData {
  guestName: string;
  phone: string;
  guestType: 'individual' | 'party' | 'contractor';
  dateStr: string;
  timeSlot: string;
  hasVehicle: boolean;
  vehicleNo: string;
}

interface PreApproveGuestScreenProps {
  onBack: () => void;
  onSubmit: (data: PreApproveGuestFormData) => void;
}

export const PreApproveGuestScreen: React.FC<PreApproveGuestScreenProps> = ({
  onBack,
  onSubmit,
}) => {
  const [guestName, setGuestName] = useState<string>('Rahul Sharma');
  const [phone, setPhone] = useState<string>('9845012345');
  const [guestType, setGuestType] = useState<'individual' | 'party' | 'contractor'>('individual');
  const [dateStr, setDateStr] = useState<string>('Today');
  const [timeSlot, setTimeSlot] = useState<string>('Afternoon (12 PM – 5 PM)');
  const [hasVehicle, setHasVehicle] = useState<boolean>(true);
  const [vehicleNo, setVehicleNo] = useState<string>('KA-05-MQ-3819');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const dates = ['Today', 'Tomorrow', 'This Weekend'];
  const slots = ['Morning (8 AM – 12 PM)', 'Afternoon (12 PM – 5 PM)', 'Evening (5 PM – 10 PM)', 'All Day'];

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestName.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmit({
        guestName,
        phone,
        guestType,
        dateStr,
        timeSlot,
        hasVehicle,
        vehicleNo: hasVehicle ? vehicleNo : '',
      });
    }, 600);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-200">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Visitor Clearance
          </span>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Cancel
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Pre-Approve Guest
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Generate an encrypted 6-digit entry PIN and QR pass shareable via WhatsApp.
          </p>
        </div>

        {/* Guest Type Selector Chips */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Invitation Type
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'individual', label: 'Single Guest' },
              { id: 'party', label: 'Party (2–50)' },
              { id: 'contractor', label: 'Contractor' },
            ].map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setGuestType(t.id as any)}
                className={`py-2 px-1 text-center rounded-xl text-xs font-bold transition-all ${
                  guestType === t.id
                    ? 'bg-cobalt-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-obsidian-800 hover:bg-slate-200'
                }`}
              >
                {t.label}
              </button>
            ))}
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Guest Full Name"
            placeholder="e.g. Rahul Sharma"
            value={guestName}
            onChange={(e) => setGuestName(e.target.value)}
            prefixElement={<User size={18} />}
            required
          />

          <Input
            label="Guest Mobile Number (Optional for WhatsApp Pass)"
            placeholder="98450 12345"
            value={phone}
            onChange={(e) => setPhone(e.target.value.replace(/\D/g, '').slice(0, 10))}
            prefixElement={<Phone size={18} />}
          />

          {/* Date Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
              Expected Date
            </label>
            <div className="flex items-center gap-2">
              {dates.map((d) => (
                <button
                  key={d}
                  type="button"
                  onClick={() => setDateStr(d)}
                  className={`flex-1 py-2.5 rounded-xl text-xs font-bold transition-all ${
                    dateStr === d
                      ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                      : 'bg-white dark:bg-obsidian-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-800'
                  }`}
                >
                  {d}
                </button>
              ))}
            </div>
          </div>

          {/* Time Slot Selector */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
              Time Slot Window
            </label>
            <select
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
              className="w-full h-12 px-3 rounded-xl border border-slate-300 dark:border-obsidian-700 bg-white dark:bg-obsidian-900 text-slate-900 dark:text-slate-100 text-xs font-semibold outline-none"
            >
              {slots.map((s) => (
                <option key={s} value={s} className="bg-slate-900 text-white">
                  {s}
                </option>
              ))}
            </select>
          </div>

          {/* Vehicle Clearance Toggle */}
          <div className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 flex flex-col gap-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-xs font-bold text-slate-900 dark:text-white">
                <Car size={16} className="text-cobalt-500" />
                <span>Guest Arriving with Vehicle?</span>
              </div>
              <input
                type="checkbox"
                checked={hasVehicle}
                onChange={(e) => setHasVehicle(e.target.checked)}
                className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 border-slate-300 cursor-pointer"
              />
            </div>

            {hasVehicle && (
              <div className="pt-2 border-t border-slate-100 dark:border-obsidian-800">
                <Input
                  label="Vehicle Plate Number (For Boom Barrier Auto-Clear)"
                  placeholder="e.g. KA-05-MQ-3819"
                  value={vehicleNo}
                  onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Generate & Share Pass
        </Button>
      </div>
    </div>
  );
};
