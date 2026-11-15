import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  ShieldCheck,
  MapPin,
  CheckCircle2,
  Sparkles,
  ChevronRight,
  Info
} from 'lucide-react';
import { Button, Input } from '../../components/UIComponents';
import { ExpressServiceItem } from './ExpressServicesScreen';

interface BookServiceScreenProps {
  service: ExpressServiceItem;
  onBack: () => void;
  onBookingConfirmed: (bookingData: any) => void;
}

export const BookServiceScreen: React.FC<BookServiceScreenProps> = ({
  service,
  onBack,
  onBookingConfirmed,
}) => {
  const [selectedDate, setSelectedDate] = useState<'today' | 'tomorrow' | 'day_after'>('today');
  const [selectedSlot, setSelectedSlot] = useState<string>('03:00 PM – 05:00 PM');
  const [instructions, setInstructions] = useState<string>('Please ring door bell twice, toddler sleeping.');
  const [paymentMode, setPaymentMode] = useState<'after_service' | 'wallet'>('after_service');
  const [isBooking, setIsBooking] = useState<boolean>(false);

  const timeSlots = [
    '10:00 AM – 12:00 PM',
    '12:00 PM – 02:00 PM',
    '03:00 PM – 05:00 PM',
    '06:00 PM – 08:00 PM',
  ];

  const handleConfirm = () => {
    setIsBooking(true);
    setTimeout(() => {
      setIsBooking(false);
      onBookingConfirmed({
        service,
        date: selectedDate === 'today' ? 'Today, 15 Nov' : selectedDate === 'tomorrow' ? 'Tomorrow, 16 Nov' : '17 Nov',
        slot: selectedSlot,
        instructions,
        paymentMode,
        bookingId: `SRV-${Math.floor(1000 + Math.random() * 9000)}`,
      });
    }, 700);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-5">
        {/* Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">
            Technician Dispatch
          </span>
          <div className="w-10" />
        </div>

        {/* Selected Service Card */}
        <div className="p-4 rounded-3xl glass-card-elevated flex items-start justify-between gap-3 shadow-ambient">
          <div>
            <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
              {service.category.toUpperCase()} EXPRESS
            </span>
            <h3 className="text-base font-bold text-slate-900 dark:text-white leading-tight mt-0.5">
              {service.title}
            </h3>
            <p className="text-xs text-slate-500 mt-1">
              Flat 1204 • Tower 2
            </p>
          </div>
          <div className="text-right shrink-0">
            <span className="text-xl font-mono font-extrabold text-slate-900 dark:text-white block">
              ₹{service.price}
            </span>
            <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400">
              ✓ Fixed Rate
            </span>
          </div>
        </div>

        {/* Date Selector Pills */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Select Service Date
          </label>
          <div className="grid grid-cols-3 gap-2">
            {[
              { id: 'today', label: 'Today (15 Nov)', sub: 'Fastest ETA' },
              { id: 'tomorrow', label: 'Tomorrow', sub: '16 Nov' },
              { id: 'day_after', label: 'Day After', sub: '17 Nov' },
            ].map((d) => (
              <button
                key={d.id}
                type="button"
                onClick={() => setSelectedDate(d.id as any)}
                className={`p-3 rounded-2xl border text-center transition-all press-scale ${
                  selectedDate === d.id
                    ? 'border-cobalt-600 bg-cobalt-50/50 dark:bg-cobalt-950/40 text-slate-900 dark:text-white ring-1 ring-cobalt-500/30'
                    : 'glass-card text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-xs font-bold block">{d.label}</span>
                <span className="text-[10px] text-slate-400 block mt-0.5">{d.sub}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Time Slot Selector */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Preferred Time Slot
          </label>
          <div className="grid grid-cols-2 gap-2">
            {timeSlots.map((slot) => {
              const isSelected = selectedSlot === slot;
              return (
                <button
                  key={slot}
                  type="button"
                  onClick={() => setSelectedSlot(slot)}
                  className={`p-3 rounded-2xl border text-center text-xs font-mono transition-all press-scale ${
                    isSelected
                      ? 'border-cobalt-600 bg-cobalt-50/50 dark:bg-cobalt-950/40 text-cobalt-600 dark:text-cobalt-400 font-bold ring-1 ring-cobalt-500/30'
                      : 'glass-card text-slate-700 dark:text-slate-300'
                  }`}
                >
                  {slot}
                </button>
              );
            })}
          </div>
        </div>

        {/* Special Instructions */}
        <Input
          label="Technician Entry Instructions"
          placeholder="e.g. Ring bell twice, toddler sleeping"
          value={instructions}
          onChange={(e) => setInstructions(e.target.value)}
        />

        {/* Transparent Bill Card */}
        <div className="p-4 rounded-3xl glass-card flex flex-col gap-2 text-xs">
          <span className="font-bold text-slate-900 dark:text-white uppercase tracking-wider text-[11px]">
            Billing Summary
          </span>

          <div className="flex items-center justify-between text-slate-500">
            <span>Base Service Charge:</span>
            <span className="font-mono font-bold text-slate-800 dark:text-slate-200">₹{service.price}.00</span>
          </div>

          <div className="flex items-center justify-between text-slate-500">
            <span>Society Platform Fee:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">₹0.00 (Free)</span>
          </div>

          <div className="pt-2 border-t border-slate-100 dark:border-white/10 flex items-center justify-between font-bold text-slate-900 dark:text-white">
            <span>Total Payable:</span>
            <span className="text-base font-mono">₹{service.price}.00</span>
          </div>
        </div>

        {/* Payment Timing Choice */}
        <div className="flex items-center justify-between p-3.5 rounded-2xl glass-pill text-xs">
          <span className="text-slate-600 dark:text-slate-300 font-medium">
            Payment Mode:
          </span>
          <span className="font-bold text-emerald-600 dark:text-emerald-400">
            Pay After Service Completion (UPI/Cash)
          </span>
        </div>
      </div>

      {/* Bottom Confirm Action */}
      <div className="pt-6">
        <Button
          onClick={handleConfirm}
          isLoading={isBooking}
          icon={CheckCircle2}
          iconPosition="left"
          size="lg"
        >
          Confirm Booking • ₹{service.price}
        </Button>
      </div>
    </div>
  );
};