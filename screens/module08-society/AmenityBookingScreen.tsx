import React, { useState } from 'react';
import {
  ArrowLeft,
  Calendar,
  Clock,
  Users,
  CheckCircle2,
  Sparkles,
  QrCode,
  ShieldCheck,
  ChevronRight,
  Info,
  X,
  Share2
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';

export interface AmenityItem {
  id: string;
  name: string;
  category: 'Sports' | 'Clubhouse' | 'Aquatics' | 'Wellness';
  capacity: string;
  timing: string;
  charge: string;
  status: 'available' | 'few_slots' | 'maintenance';
  slots: string[];
  rules: string;
}

const AMENITIES: AmenityItem[] = [
  {
    id: 'amn_badminton',
    name: 'Synthetic Badminton Courts (1 & 2)',
    category: 'Sports',
    capacity: 'Max 4 Players / Court',
    timing: '6:00 AM – 10:00 PM',
    charge: 'Free for Residents',
    status: 'available',
    slots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
    rules: 'Non-marking badminton shoes mandatory. 1 hr slot per flat per day.',
  },
  {
    id: 'amn_pool',
    name: 'Olympic Swimming Pool & Jacuzzi',
    category: 'Aquatics',
    capacity: 'Lane 1 to 4 • 25m Length',
    timing: '6:00 AM – 9:00 PM',
    charge: 'Free for Residents',
    status: 'available',
    slots: ['06:30 AM - 07:30 AM', '07:30 AM - 08:30 AM', '04:30 PM - 05:30 PM', '05:30 PM - 06:30 PM'],
    rules: 'Nylon swimwear and silicone swimming cap strictly required. Shower prior to pool entry.',
  },
  {
    id: 'amn_banquet',
    name: 'Clubhouse Grand Banquet Hall',
    category: 'Clubhouse',
    capacity: 'Up to 150 Guests',
    timing: '10:00 AM – 11:00 PM',
    charge: '₹5,000 Refundable Security',
    status: 'few_slots',
    slots: ['10:00 AM - 03:00 PM (Lunch)', '05:00 PM - 11:00 PM (Dinner & Event)'],
    rules: 'Music permitted until 10:00 PM as per Bangalore noise regulations. Dedicated catering pantry included.',
  },
  {
    id: 'amn_tennis',
    name: 'Floodlit Rooftop Tennis Court',
    category: 'Sports',
    capacity: 'Singles / Doubles',
    timing: '6:00 AM – 10:00 PM',
    charge: 'Free for Residents',
    status: 'available',
    slots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
    rules: 'Tennis shoes required. Lights auto-turn on for night bookings.',
  },
  {
    id: 'amn_squash',
    name: 'Air-Conditioned Squash Court',
    category: 'Sports',
    capacity: '2 Players',
    timing: '6:00 AM – 9:30 PM',
    charge: 'Free for Residents',
    status: 'few_slots',
    slots: ['06:00 AM - 07:00 AM', '05:30 PM - 06:30 PM', '06:30 PM - 07:30 PM'],
    rules: 'Protective eyewear recommended. Non-marking gum rubber shoes required.',
  },
];

interface AmenityBookingScreenProps {
  onBack: () => void;
}

export const AmenityBookingScreen: React.FC<AmenityBookingScreenProps> = ({ onBack }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedAmenity, setSelectedAmenity] = useState<AmenityItem | null>(null);
  const [bookingDate, setBookingDate] = useState<'today' | 'tomorrow' | 'weekend'>('today');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [attendeesCount, setAttendeesCount] = useState<number>(2);
  const [confirmedPass, setConfirmedPass] = useState<any | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const filteredAmenities = selectedCategory === 'All'
    ? AMENITIES
    : AMENITIES.filter((a) => a.category === selectedCategory);

  const handleOpenBooking = (amn: AmenityItem) => {
    setSelectedAmenity(amn);
    setSelectedSlot(amn.slots[0] || '');
  };

  const handleConfirmBooking = () => {
    if (!selectedAmenity || !selectedSlot) {
      showToast('Please select a valid time slot');
      return;
    }

    const pass = {
      bookingId: `AMN-${Math.floor(100000 + Math.random() * 900000)}`,
      amenity: selectedAmenity.name,
      date: bookingDate === 'today' ? 'Today, 26 Nov 2026' : bookingDate === 'tomorrow' ? 'Tomorrow, 27 Nov 2026' : 'Saturday, 29 Nov 2026',
      slot: selectedSlot,
      attendees: attendeesCount,
      resident: 'Suriya K (Tower 2 - Flat 1204)',
      turnstilePin: `${Math.floor(1000 + Math.random() * 9000)}`,
    };

    setConfirmedPass(pass);
    setSelectedAmenity(null);
    showToast(`✓ Booking Confirmed: ${selectedAmenity.name}`);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-20 text-left animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-4">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-obsidian-800">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
              title="Back to Society Hub"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                SOCIETY AMENITIES
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Clubhouse & Sports Slots
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-800/40 text-emerald-700 dark:text-emerald-400 text-[10px] font-bold">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
            <span>Slots Live</span>
          </div>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {['All', 'Sports', 'Aquatics', 'Clubhouse'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-8 px-3.5 rounded-xl text-xs font-bold whitespace-nowrap transition-all press-scale ${
                selectedCategory === cat
                  ? 'bg-cobalt-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Amenities Cards Grid */}
        <div className="flex flex-col gap-3">
          {filteredAmenities.map((amn) => (
            <div
              key={amn.id}
              className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-3 transition-all hover:border-cobalt-300 dark:hover:border-cobalt-700"
            >
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <Badge variant={amn.status === 'available' ? 'emerald' : 'amber'} size="sm">
                      {amn.status === 'available' ? 'Slots Available' : 'Few Slots Left'}
                    </Badge>
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                      {amn.category}
                    </span>
                  </div>
                  <h3 className="font-extrabold text-sm text-slate-900 dark:text-white mt-1">
                    {amn.name}
                  </h3>
                  <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs mt-1 font-medium">
                    <span className="flex items-center gap-1">
                      <Clock size={12} className="text-cobalt-500" /> {amn.timing}
                    </span>
                    <span className="flex items-center gap-1">
                      <Users size={12} className="text-emerald-500" /> {amn.capacity}
                    </span>
                  </div>
                </div>

                <div className="text-right">
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400 block">
                    {amn.charge}
                  </span>
                </div>
              </div>

              <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                <Info size={13} className="text-cobalt-500 shrink-0 mt-0.5" />
                <span>{amn.rules}</span>
              </div>

              <div className="flex items-center justify-between pt-1">
                <span className="text-[11px] font-semibold text-slate-400">
                  {amn.slots.length} upcoming slots
                </span>
                <button
                  type="button"
                  onClick={() => handleOpenBooking(amn)}
                  className="h-9 px-4 rounded-xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs flex items-center gap-1 shadow-sm transition-colors press-scale"
                >
                  <span>Book Slot</span>
                  <ChevronRight size={14} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Booking Slot Selection Modal */}
      {selectedAmenity && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <div>
                <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-wider block">
                  CONFIRM AMENITY SLOT
                </span>
                <h3 className="font-extrabold text-sm text-slate-900 dark:text-white truncate max-w-[240px]">
                  {selectedAmenity.name}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setSelectedAmenity(null)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            {/* Date Selector */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                SELECT DAY
              </label>
              <div className="grid grid-cols-3 gap-1.5">
                {[
                  { id: 'today', label: 'Today' },
                  { id: 'tomorrow', label: 'Tomorrow' },
                  { id: 'weekend', label: 'Saturday' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setBookingDate(d.id as any)}
                    className={`h-9 rounded-xl text-xs font-bold border transition-all ${
                      bookingDate === d.id
                        ? 'bg-cobalt-600 text-white border-cobalt-600'
                        : 'bg-slate-50 dark:bg-obsidian-800 text-slate-700 dark:text-slate-200 border-slate-200 dark:border-obsidian-750'
                    }`}
                  >
                    {d.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Time Slots */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                CHOOSE TIME SLOT
              </label>
              <div className="flex flex-col gap-1.5 max-h-36 overflow-y-auto no-scrollbar">
                {selectedAmenity.slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSlot(s)}
                    className={`p-2.5 rounded-xl text-xs font-bold text-left flex items-center justify-between border transition-all ${
                      selectedSlot === s
                        ? 'bg-cobalt-50 dark:bg-cobalt-950/80 text-cobalt-700 dark:text-cobalt-300 border-cobalt-400'
                        : 'bg-slate-50 dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-800'
                    }`}
                  >
                    <span>{s}</span>
                    {selectedSlot === s && <CheckCircle2 size={14} className="text-cobalt-600" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Attendees Count */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                NUMBER OF ATTENDEES
              </label>
              <div className="flex items-center gap-3">
                {[1, 2, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAttendeesCount(num)}
                    className={`flex-1 h-9 rounded-xl font-bold text-xs border ${
                      attendeesCount === num
                        ? 'bg-emerald-600 text-white border-emerald-600'
                        : 'bg-slate-50 dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-800'
                    }`}
                  >
                    {num} {num === 1 ? 'Player' : 'Players'}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-obsidian-800">
              <Button
                type="button"
                variant="outline"
                onClick={() => setSelectedAmenity(null)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={handleConfirmBooking}
                className="flex-1"
              >
                Confirm Pass
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Confirmed QR Entry Pass Modal */}
      {confirmedPass && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col gap-4 text-center relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <CheckCircle2 size={14} />
                <span>BOOKING CONFIRMED</span>
              </div>
              <button
                type="button"
                onClick={() => setConfirmedPass(null)}
                className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <h3 className="text-base font-extrabold text-white">
              {confirmedPass.amenity}
            </h3>

            {/* QR Pass Box */}
            <div className="p-4 rounded-2xl bg-white text-slate-900 flex flex-col items-center gap-2 shadow-inner">
              <div className="w-36 h-36 border-4 border-slate-900 rounded-xl p-2 flex items-center justify-center relative">
                <QrCode size={110} className="text-slate-900" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-lg bg-cobalt-600 text-white flex items-center justify-center font-extrabold text-[10px] shadow-md">
                    HL
                  </div>
                </div>
              </div>
              <span className="font-mono font-bold text-xs text-slate-700 tracking-widest">
                TURNSTILE PIN: {confirmedPass.turnstilePin}
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-left text-xs flex flex-col gap-1">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>BOOKING REF:</span>
                <span className="text-white font-mono font-bold">{confirmedPass.bookingId}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>SCHEDULE:</span>
                <span className="text-white font-bold">{confirmedPass.date}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>TIME SLOT:</span>
                <span className="text-emerald-400 font-bold">{confirmedPass.slot}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>RESIDENT:</span>
                <span className="text-white font-bold">{confirmedPass.resident}</span>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => setConfirmedPass(null)}
              className="w-full"
            >
              Done & Save to Passbook
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
