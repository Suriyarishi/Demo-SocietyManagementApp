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
  Share2,
  Search,
  Dumbbell,
  Waves,
  PartyPopper,
  Flame,
  Award,
  CreditCard,
  Check,
  Building2,
  CalendarCheck,
  Filter,
  AlertCircle
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';

export interface AmenityItem {
  id: string;
  name: string;
  category: 'Sports' | 'Aquatics' | 'Clubhouse' | 'Wellness' | 'Recreation';
  capacity: string;
  timing: string;
  charge: string;
  status: 'available' | 'few_slots' | 'maintenance';
  slots: string[];
  rules: string;
  image: string;
  description: string;
}

export interface ClassItem {
  id: string;
  title: string;
  category: 'Yoga & Mindfulness' | 'Swimming' | 'Sports' | 'Dance & Fitness' | 'Kids';
  instructor: string;
  instructorTitle: string;
  schedule: string;
  location: string;
  level: string;
  enrolledCount: number;
  maxCapacity: number;
  fee: string;
  status: 'Filling Fast' | 'Few Spots Left' | 'Open' | 'Waitlist';
  image: string;
  description: string;
}

export interface BookingEntity {
  id: string;
  type: 'amenity' | 'class' | 'subscription';
  title: string;
  subtitle: string;
  dateStr: string;
  timeSlot: string;
  status: 'Confirmed' | 'Active' | 'Completed';
  turnstilePin?: string;
  bookingRef: string;
  attendees?: string;
  category: string;
}

const INITIAL_AMENITIES: AmenityItem[] = [
  {
    id: 'amn_badminton',
    name: 'Synthetic Badminton Courts (1 & 2)',
    category: 'Sports',
    capacity: 'Max 4 Players / Court',
    timing: '6:00 AM – 10:00 PM',
    charge: 'Free for Residents',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
    slots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
    rules: 'Non-marking badminton shoes mandatory. 1 hr slot per flat per day.',
    description: 'BWF standard wooden spring synthetic floor with anti-glare LED tournament lighting.',
  },
  {
    id: 'amn_pool',
    name: 'Olympic Swimming Pool & Jacuzzi',
    category: 'Aquatics',
    capacity: 'Lanes 1 to 6 • 50m Olympic Size',
    timing: '6:00 AM – 9:30 PM',
    charge: 'Free for Residents',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
    slots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '04:30 PM - 05:30 PM', '05:30 PM - 06:30 PM', '06:30 PM - 07:30 PM'],
    rules: 'Nylon swimwear and silicone cap mandatory. Shower required prior to entry.',
    description: 'Temperature-controlled lap pool with certified lifeguard and poolside hydrotherapy jacuzzi.',
  },
  {
    id: 'amn_banquet',
    name: 'Clubhouse Grand Banquet Hall',
    category: 'Clubhouse',
    capacity: 'Up to 150 Guests',
    timing: '10:00 AM – 11:00 PM',
    charge: '₹5,000 Refundable Deposit',
    status: 'few_slots',
    image: 'https://images.unsplash.com/photo-1519167758481-83f550bb49b3?auto=format&fit=crop&w=600&q=80',
    slots: ['10:00 AM - 03:00 PM (Lunch Event)', '05:00 PM - 11:00 PM (Dinner & Celebration)'],
    rules: 'Music allowed until 10:00 PM as per Bangalore noise guidelines. Catering pantry included.',
    description: 'Acoustically treated multi-purpose banquet space with Bose audio and mood chandeliers.',
  },
  {
    id: 'amn_tennis',
    name: 'Floodlit Rooftop Tennis Court',
    category: 'Sports',
    capacity: 'Singles / Doubles (Max 4)',
    timing: '6:00 AM – 10:00 PM',
    charge: 'Free for Residents',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1595435934249-5df7ed86e1c0?auto=format&fit=crop&w=600&q=80',
    slots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
    rules: 'Tennis hard-court shoes only. Automated floodlights activate for night slots.',
    description: 'DecoTurf cushion acrylic surface with perimeter safety netting and panoramic skyline views.',
  },
  {
    id: 'amn_squash',
    name: 'Air-Conditioned Squash Court',
    category: 'Sports',
    capacity: '2 Players',
    timing: '6:00 AM – 9:30 PM',
    charge: 'Free for Residents',
    status: 'few_slots',
    image: 'https://images.unsplash.com/photo-1554068865-24cecd4e34b8?auto=format&fit=crop&w=600&q=80',
    slots: ['06:00 AM - 07:00 AM', '05:30 PM - 06:30 PM', '06:30 PM - 07:30 PM'],
    rules: 'Protective eyewear recommended. Non-marking gum rubber shoes required.',
    description: 'Glass-backed international regulation court with climate control and spectator seating.',
  },
  {
    id: 'amn_gym',
    name: 'Gymnasium & CrossFit Strength Arena',
    category: 'Wellness',
    capacity: 'Max 25 Members / Hour',
    timing: '5:30 AM – 10:30 PM',
    charge: 'Included in Maintenance',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80',
    slots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
    rules: 'Workout towel and sports shoes mandatory. Sanitize equipment after use.',
    description: 'LifeFitness cardio suite, Olympic barbells, kettlebells, and resident fitness trainer desk.',
  },
  {
    id: 'amn_yoga',
    name: 'Sunrise Yoga & Meditation Deck',
    category: 'Wellness',
    capacity: '20 Practitioners',
    timing: '6:00 AM – 11:00 AM • 4:00 PM – 8:00 PM',
    charge: 'Free for Residents',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
    slots: ['06:00 AM - 07:00 AM', '07:00 AM - 08:00 AM', '05:00 PM - 06:00 PM'],
    rules: 'Quiet zone. Please carry your personal yoga mat. Barefoot or socks only.',
    description: 'Teakwood shaded pavilion surrounded by lotus ponds and bamboo landscape.',
  },
  {
    id: 'amn_snooker',
    name: 'Snooker, Billiards & Table Tennis',
    category: 'Recreation',
    capacity: '2 Tables • Max 8 Players',
    timing: '10:00 AM – 10:00 PM',
    charge: 'Free for Residents',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1609710228159-0fa9bd7c0827?auto=format&fit=crop&w=600&q=80',
    slots: ['04:00 PM - 05:00 PM', '05:00 PM - 06:00 PM', '06:00 PM - 07:00 PM', '07:00 PM - 08:00 PM'],
    rules: 'Cues and balls available at clubhouse counter. No drinks on green baize.',
    description: 'Championship English slate snooker table and Stiga competition table tennis boards.',
  },
  {
    id: 'amn_kids',
    name: 'Kids Adventure Play Zone & Soft Creche',
    category: 'Recreation',
    capacity: 'Up to 20 Kids (Ages 2-10)',
    timing: '9:00 AM – 8:00 PM',
    charge: 'Free for Residents',
    status: 'available',
    image: 'https://images.unsplash.com/photo-1566454544259-f4b94c3d758c?auto=format&fit=crop&w=600&q=80',
    slots: ['04:30 PM - 06:00 PM', '06:00 PM - 07:30 PM'],
    rules: 'Parent or guardian supervision required. Grip socks mandatory in soft play.',
    description: 'Foam-padded jungle gym, ball pit, mini climbing wall, and toddler play stations.',
  },
];

const INITIAL_CLASSES: ClassItem[] = [
  {
    id: 'cls_yoga',
    title: 'Morning Hatha Yoga & Pranayama',
    category: 'Yoga & Mindfulness',
    instructor: 'Master Ananya Sharma',
    instructorTitle: 'Certified Yoga Alliance 500-HR',
    schedule: 'Mon, Wed, Fri • 6:30 AM - 7:30 AM',
    location: 'Clubhouse Yoga Deck (Tower 2)',
    level: 'All Levels Welcome',
    enrolledCount: 14,
    maxCapacity: 20,
    fee: 'Free for Residents • 1st Trial Free',
    status: 'Filling Fast',
    image: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597?auto=format&fit=crop&w=600&q=80',
    description: 'Energizing breathwork, asanas, and guided mindfulness for stress release and flexibility.',
  },
  {
    id: 'cls_swim',
    title: 'Junior Dolphins Swimming Academy',
    category: 'Swimming',
    instructor: 'Coach David Fernandes',
    instructorTitle: 'Former National Swimmer & ASCA Level 2',
    schedule: 'Tue, Thu, Sat • 5:00 PM - 6:00 PM',
    location: 'Olympic Pool (Lanes 1-3)',
    level: 'Beginner & Intermediate (Ages 5-14)',
    enrolledCount: 10,
    maxCapacity: 12,
    fee: '₹1,800 / Month (3 Days/Week)',
    status: 'Few Spots Left',
    image: 'https://images.unsplash.com/photo-1576013551627-0cc20b96c2a7?auto=format&fit=crop&w=600&q=80',
    description: 'Structured stroke technique, water safety drills, and endurance building for children.',
  },
  {
    id: 'cls_zumba',
    title: 'Zumba & Aerobics High-Energy Dance',
    category: 'Dance & Fitness',
    instructor: 'Priya Sen',
    instructorTitle: 'Licensed Zumba® Zin Trainer',
    schedule: 'Mon, Thu • 7:00 PM - 8:00 PM',
    location: 'Multi-Purpose Studio (Floor 1)',
    level: 'High Energy • All Ages',
    enrolledCount: 18,
    maxCapacity: 25,
    fee: 'Free Community Session',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    description: 'Cardio calorie-burning dance workout set to upbeat Latin and international rhythms.',
  },
  {
    id: 'cls_badminton',
    title: 'Weekend Badminton Smash Academy',
    category: 'Sports',
    instructor: 'Coach Ramesh Babu',
    instructorTitle: 'Karnataka State Level Badminton Coach',
    schedule: 'Saturday & Sunday • 8:00 AM - 9:30 AM',
    location: 'Badminton Court 1',
    level: 'Intermediate & Advanced (Teens & Adults)',
    enrolledCount: 8,
    maxCapacity: 10,
    fee: '₹1,500 / Month',
    status: 'Few Spots Left',
    image: 'https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?auto=format&fit=crop&w=600&q=80',
    description: 'Footwork agility drills, net play, drop shots, and tactical match simulation.',
  },
  {
    id: 'cls_karate',
    title: 'Shotokan Karate & Self-Defence for Kids',
    category: 'Kids',
    instructor: 'Sensei Suresh K',
    instructorTitle: '4th Dan Black Belt (JKA Certified)',
    schedule: 'Saturday & Sunday • 4:00 PM - 5:00 PM',
    location: 'Clubhouse Terrace Deck',
    level: 'Yellow to Black Belt (Ages 6-16)',
    enrolledCount: 16,
    maxCapacity: 20,
    fee: '₹1,200 / Month',
    status: 'Filling Fast',
    image: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?auto=format&fit=crop&w=600&q=80',
    description: 'Discipline, kata forms, agility, and practical self-defence awareness for boys and girls.',
  },
  {
    id: 'cls_pilates',
    title: 'Pilates, Core Strength & Posture Therapy',
    category: 'Yoga & Mindfulness',
    instructor: 'Dr. Sunita Rao',
    instructorTitle: 'Physiotherapist & Stott Pilates Specialist',
    schedule: 'Tuesday & Friday • 7:30 AM - 8:30 AM',
    location: 'Wellness Studio (Tower 4)',
    level: 'Gentle & Restorative • Adults',
    enrolledCount: 9,
    maxCapacity: 15,
    fee: '₹1,400 / Month',
    status: 'Open',
    image: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?auto=format&fit=crop&w=600&q=80',
    description: 'Pelvic floor alignment, spine decompression, and deep abdominal muscle strengthening.',
  },
];

const INITIAL_BOOKINGS: BookingEntity[] = [
  {
    id: 'bk_01',
    type: 'amenity',
    title: 'Synthetic Badminton Court 1',
    subtitle: 'Court 1 • Non-marking shoes mandatory',
    dateStr: 'Today, 18 Nov 2026',
    timeSlot: '06:00 PM - 07:00 PM',
    status: 'Confirmed',
    turnstilePin: '8492',
    bookingRef: 'AMN-984210',
    attendees: '2 Players',
    category: 'Sports',
  },
  {
    id: 'bk_02',
    type: 'amenity',
    title: 'Olympic Swimming Pool & Jacuzzi',
    subtitle: 'Lanes 1 to 4 • Silicone cap required',
    dateStr: 'Tomorrow, 19 Nov 2026',
    timeSlot: '07:30 AM - 08:30 AM',
    status: 'Confirmed',
    turnstilePin: '3120',
    bookingRef: 'AMN-723145',
    attendees: '1 Swimmer',
    category: 'Aquatics',
  },
  {
    id: 'bk_03',
    type: 'amenity',
    title: 'Clubhouse Grand Banquet Hall',
    subtitle: '150 Guests Celebration • Security Deposit Settled',
    dateStr: '14 Nov 2026 (Past)',
    timeSlot: '05:00 PM - 11:00 PM',
    status: 'Completed',
    bookingRef: 'AMN-312984',
    attendees: '120 Guests',
    category: 'Clubhouse',
  },
  {
    id: 'bk_04',
    type: 'class',
    title: 'Morning Hatha Yoga & Pranayama',
    subtitle: 'Master Ananya Sharma • Clubhouse Yoga Pavilion',
    dateStr: 'Next: Tomorrow, 19 Nov 2026',
    timeSlot: '06:30 AM - 07:30 AM (Mon, Wed, Fri)',
    status: 'Active',
    bookingRef: 'CLS-441829',
    category: 'Yoga & Mindfulness',
  },
  {
    id: 'bk_05',
    type: 'class',
    title: 'Zumba & Aerobics High-Energy Dance',
    subtitle: 'Priya Sen • Multi-Purpose Studio',
    dateStr: 'Thursday, 20 Nov 2026',
    timeSlot: '07:00 PM - 08:00 PM',
    status: 'Confirmed',
    bookingRef: 'CLS-892144',
    category: 'Dance & Fitness',
  },
  {
    id: 'bk_06',
    type: 'subscription',
    title: 'Annual Clubhouse Gym & Fitness Resident Pass',
    subtitle: 'Access to Cardio, Strength Suite & Steam Room',
    dateStr: 'Valid Till: 31 Dec 2026',
    timeSlot: 'All Day (5:30 AM – 10:30 PM)',
    status: 'Active',
    turnstilePin: 'RFID-GYM-9912',
    bookingRef: 'SUB-GYM-2026',
    category: 'Wellness',
  },
  {
    id: 'bk_07',
    type: 'subscription',
    title: 'Quarterly Aquatics Family Membership',
    subtitle: 'Olympic Pool & Jacuzzi (Up to 4 Household Members)',
    dateStr: 'Valid Till: 31 Jan 2027',
    timeSlot: 'All Swimming Slots',
    status: 'Active',
    turnstilePin: 'RFID-POOL-4410',
    bookingRef: 'SUB-POOL-2027',
    category: 'Aquatics',
  },
];

interface AmenityBookingScreenProps {
  onBack: () => void;
}

export const AmenityBookingScreen: React.FC<AmenityBookingScreenProps> = ({ onBack }) => {
  // Main view state: 'catalog' | 'my_bookings'
  const [viewState, setViewState] = useState<'catalog' | 'my_bookings'>('catalog');

  // Main Segmented Tab in Catalog: 'amenities' | 'classes'
  const [catalogTab, setCatalogTab] = useState<'amenities' | 'classes'>('amenities');

  // Filter in My Bookings view: 'amenities' | 'classes' | 'subscriptions'
  const [bookingsFilter, setBookingsFilter] = useState<'amenities' | 'classes' | 'subscriptions'>('amenities');

  // Category filters
  const [selectedAmenityCategory, setSelectedAmenityCategory] = useState<string>('All');
  const [selectedClassCategory, setSelectedClassCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Interactive booking & modal state
  const [amenities, setAmenities] = useState<AmenityItem[]>(INITIAL_AMENITIES);
  const [classes, setClasses] = useState<ClassItem[]>(INITIAL_CLASSES);
  const [myBookings, setMyBookings] = useState<BookingEntity[]>(INITIAL_BOOKINGS);

  const [bookingAmenity, setBookingAmenity] = useState<AmenityItem | null>(null);
  const [enrollClass, setEnrollClass] = useState<ClassItem | null>(null);
  const [bookingDate, setBookingDate] = useState<'today' | 'tomorrow' | 'custom'>('today');
  const [customDate, setCustomDate] = useState<string>('2026-11-20');
  const [selectedSlot, setSelectedSlot] = useState<string>('');
  const [attendeesCount, setAttendeesCount] = useState<number>(2);

  const formatCustomDateSub = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return d.toLocaleDateString('en-US', { day: 'numeric', month: 'short' });
    } catch {
      return 'Pick Date';
    }
  };

  const formatCustomDateLong = (dateStr: string) => {
    try {
      const [year, month, day] = dateStr.split('-');
      const d = new Date(parseInt(year), parseInt(month) - 1, parseInt(day));
      return d.toLocaleDateString('en-US', { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' });
    } catch {
      return dateStr;
    }
  };

  // QR Pass preview modal
  const [activeQrPass, setActiveQrPass] = useState<BookingEntity | null>(null);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2800);
  };

  // Filtered Amenities
  const filteredAmenities = amenities.filter((a) => {
    const matchCategory = selectedAmenityCategory === 'All' || a.category === selectedAmenityCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      a.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      a.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Filtered Classes
  const filteredClasses = classes.filter((c) => {
    const matchCategory = selectedClassCategory === 'All' || c.category === selectedClassCategory;
    const matchSearch =
      searchQuery.trim() === '' ||
      c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.instructor.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCategory && matchSearch;
  });

  // Filtered Bookings in "My Bookings" view
  const filteredBookings = myBookings.filter((b) => {
    if (bookingsFilter === 'amenities') return b.type === 'amenity';
    if (bookingsFilter === 'classes') return b.type === 'class';
    if (bookingsFilter === 'subscriptions') return b.type === 'subscription';
    return true;
  });

  // Confirm Amenity Booking
  const handleConfirmAmenityBooking = () => {
    if (!bookingAmenity || !selectedSlot) {
      showToast('Please select a time slot');
      return;
    }

    const dateLabel =
      bookingDate === 'today'
        ? 'Today, 18 Nov 2026'
        : bookingDate === 'tomorrow'
        ? 'Tomorrow, 19 Nov 2026'
        : formatCustomDateLong(customDate);

    const newBooking: BookingEntity = {
      id: `bk_${Date.now()}`,
      type: 'amenity',
      title: bookingAmenity.name,
      subtitle: `${bookingAmenity.capacity} • Rules: ${bookingAmenity.rules.slice(0, 40)}...`,
      dateStr: dateLabel,
      timeSlot: selectedSlot,
      status: 'Confirmed',
      turnstilePin: `${Math.floor(1000 + Math.random() * 9000)}`,
      bookingRef: `AMN-${Math.floor(100000 + Math.random() * 900000)}`,
      attendees: `${attendeesCount} ${attendeesCount === 1 ? 'Player' : 'Players'}`,
      category: bookingAmenity.category,
    };

    setMyBookings([newBooking, ...myBookings]);
    setBookingAmenity(null);
    setActiveQrPass(newBooking);
    showToast(`✓ Booking Confirmed: ${bookingAmenity.name}`);
  };

  // Confirm Class Enrollment
  const handleConfirmClassEnroll = () => {
    if (!enrollClass) return;

    const newClassBooking: BookingEntity = {
      id: `cls_${Date.now()}`,
      type: 'class',
      title: enrollClass.title,
      subtitle: `${enrollClass.instructor} • ${enrollClass.location}`,
      dateStr: `Schedule: ${enrollClass.schedule.split('•')[0]}`,
      timeSlot: enrollClass.schedule.split('•')[1] || enrollClass.schedule,
      status: 'Confirmed',
      bookingRef: `CLS-${Math.floor(100000 + Math.random() * 900000)}`,
      category: enrollClass.category,
    };

    setMyBookings([newClassBooking, ...myBookings]);
    setEnrollClass(null);
    showToast(`✓ Enrolled successfully in ${enrollClass.title}!`);
  };

  // Cancel Booking
  const handleCancelBooking = (bookingId: string) => {
    setMyBookings((prev) => prev.filter((b) => b.id !== bookingId));
    if (activeQrPass?.id === bookingId) setActiveQrPass(null);
    showToast('✓ Booking cancelled successfully');
  };

  // Common Empty State Graphic matching Reference Screenshots
  const renderEmptyState = (title: string, subtitle: string, onResetAction?: () => void) => (
    <div className="w-full flex-1 flex flex-col items-center justify-center p-8 text-center animate-in fade-in zoom-in-95 duration-200">
      {/* Characteristic Jumping Figure & Checklist Card Illustration */}
      <div className="relative w-44 h-44 mb-4 flex items-center justify-center select-none">
        {/* Soft Aura */}
        <div className="absolute w-36 h-36 rounded-full bg-amber-100/60 dark:bg-amber-950/20 blur-xl" />

        {/* Orange Checklist Device / Card */}
        <div className="absolute w-24 h-32 rounded-2xl bg-gradient-to-b from-amber-400 to-amber-500 shadow-md p-2.5 flex flex-col items-center justify-between z-10 border border-amber-300">
          <div className="w-7 h-7 rounded-full bg-white flex items-center justify-center shadow-xs text-[#04BB49]">
            <Check size={16} strokeWidth={3.2} />
          </div>
          <div className="w-full flex flex-col gap-1.5 px-1 pb-2">
            <div className="w-full h-2.5 rounded-full bg-white/70" />
            <div className="w-3/4 h-2 rounded-full bg-white/50" />
            <div className="w-full h-2 rounded-full bg-white/50" />
          </div>
        </div>

        {/* Green Botanical Leaves at bottom */}
        <div className="absolute -bottom-1 -right-2 z-20 flex items-end gap-0.5">
          <div className="w-4 h-9 bg-emerald-500 rounded-t-full rotate-12 origin-bottom shadow-xs" />
          <div className="w-5 h-11 bg-[#04BB49] rounded-t-full origin-bottom shadow-xs" />
          <div className="w-4 h-8 bg-emerald-600 rounded-t-full -rotate-12 origin-bottom shadow-xs" />
        </div>

        {/* Jumping Joyful Resident Figure */}
        <div className="absolute -left-2 top-4 z-20 flex flex-col items-center animate-bounce duration-1000">
          {/* Head & Hair */}
          <div className="relative">
            <div className="w-7 h-7 rounded-full bg-[#334155] absolute -top-1 -left-1" />
            <div className="w-6 h-6 rounded-full bg-[#FED7AA] relative z-10" />
          </div>
          {/* Red Torso & Arms Extended */}
          <div className="relative flex items-center justify-center mt-0.5">
            <div className="w-8 h-10 bg-[#EF4444] rounded-xl flex items-center justify-center text-white text-[8px] font-bold shadow-xs">
              ★
            </div>
            {/* Extended Arms */}
            <div className="absolute -left-3 top-2 w-4 h-1.5 bg-[#EF4444] -rotate-45 rounded-full" />
            <div className="absolute -right-3 top-1 w-4 h-1.5 bg-[#EF4444] rotate-45 rounded-full" />
          </div>
          {/* White Legs in mid-air */}
          <div className="flex gap-1.5 -mt-1">
            <div className="w-2.5 h-6 bg-white rounded-b-md shadow-xs -rotate-12" />
            <div className="w-2.5 h-6 bg-white rounded-b-md shadow-xs rotate-12" />
          </div>
        </div>
      </div>

      <h3 className="text-base font-extrabold text-slate-800 dark:text-slate-100">
        {title}
      </h3>
      <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1 max-w-[240px] leading-relaxed">
        {subtitle}
      </p>

      {onResetAction && (
        <button
          type="button"
          onClick={onResetAction}
          className="mt-4 px-4 py-2 rounded-xl bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] text-xs font-bold border border-[#04BB49]/30 hover:bg-[#04BB49] hover:text-white transition-all press-scale"
        >
          Reset Filters & Show All
        </button>
      )}
    </div>
  );

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#F8FAF9] dark:bg-[#070A11] text-slate-900 dark:text-white select-none relative overflow-hidden text-left">
      {/* Toast Notification Container */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-[#0B1528]/95 dark:bg-[#070A11]/95 text-white border border-[#04BB49]/40 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={16} className="text-[#04BB49] shrink-0" />
          <span className="flex-1 text-[11px] leading-tight font-medium">{toastMsg}</span>
        </div>
      )}

      {/* ========================================================
          TOP APP BAR (MATCHING USER REFERENCE SCREENSHOTS)
          ======================================================== */}
      <div className="w-full bg-white dark:bg-[#0B0F19] border-b border-slate-200/80 dark:border-white/10 shrink-0 z-20 shadow-xs">
        {viewState === 'catalog' ? (
          <div className="flex flex-col">
            {/* Top Navigation Row */}
            <div className="h-14 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors press-scale"
                  aria-label="Back to Society Hub"
                >
                  <ArrowLeft size={22} strokeWidth={2.4} />
                </button>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  Amenities
                </h1>
              </div>

              {/* Top-Right "My Bookings 📅" Button */}
              <button
                type="button"
                onClick={() => setViewState('my_bookings')}
                className="h-8 px-3 rounded-xl border border-slate-300 dark:border-white/15 bg-white dark:bg-white/5 text-slate-700 dark:text-slate-200 text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:border-[#04BB49] hover:text-[#04BB49] transition-all press-scale"
              >
                <span>My Bookings</span>
                <Calendar size={13} className="text-slate-600 dark:text-slate-300" />
              </button>
            </div>

            {/* Segmented Control: AMENITIES | CLASSES (Exact screenshot layout) */}
            <div className="w-full grid grid-cols-2 border-t border-slate-100 dark:border-white/5 text-xs font-extrabold uppercase tracking-wider">
              <button
                type="button"
                onClick={() => setCatalogTab('amenities')}
                className={`py-3 text-center transition-all relative ${
                  catalogTab === 'amenities'
                    ? 'text-slate-900 dark:text-white font-extrabold'
                    : 'text-slate-400 dark:text-slate-500 font-bold hover:text-slate-700'
                }`}
              >
                <span>AMENITIES</span>
                {catalogTab === 'amenities' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white rounded-full animate-in fade-in" />
                )}
              </button>

              <button
                type="button"
                onClick={() => setCatalogTab('classes')}
                className={`py-3 text-center transition-all relative ${
                  catalogTab === 'classes'
                    ? 'text-slate-900 dark:text-white font-extrabold'
                    : 'text-slate-400 dark:text-slate-500 font-bold hover:text-slate-700'
                }`}
              >
                <span>CLASSES</span>
                {catalogTab === 'classes' && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-slate-900 dark:bg-white rounded-full animate-in fade-in" />
                )}
              </button>
            </div>
          </div>
        ) : (
          /* "My Bookings" Top Header View (Matching Screenshot 3) */
          <div className="flex flex-col">
            <div className="h-14 px-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => setViewState('catalog')}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-rose-500 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors press-scale"
                  aria-label="Back to Amenities Catalog"
                >
                  <ArrowLeft size={22} strokeWidth={2.4} />
                </button>
                <h1 className="text-lg font-bold text-slate-900 dark:text-white tracking-tight">
                  My Bookings
                </h1>
              </div>

              <span className="text-[11px] font-bold text-[#04BB49] bg-[#E8FBF0] dark:bg-[#0A2E18] px-2.5 py-1 rounded-full border border-[#04BB49]/20">
                {myBookings.length} Active
              </span>
            </div>

            {/* Filter Pills: Amenities | Classes | Subscriptions (Screenshot 3) */}
            <div className="px-4 py-2.5 flex items-center gap-2 overflow-x-auto no-scrollbar border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={() => setBookingsFilter('amenities')}
                className={`h-8 px-4 rounded-full text-xs font-bold transition-all press-scale ${
                  bookingsFilter === 'amenities'
                    ? 'bg-[#04BB49] text-white shadow-sm shadow-[#04BB49]/25'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                Amenities
              </button>

              <button
                type="button"
                onClick={() => setBookingsFilter('classes')}
                className={`h-8 px-4 rounded-full text-xs font-bold transition-all press-scale ${
                  bookingsFilter === 'classes'
                    ? 'bg-[#04BB49] text-white shadow-sm shadow-[#04BB49]/25'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                Classes
              </button>

              <button
                type="button"
                onClick={() => setBookingsFilter('subscriptions')}
                className={`h-8 px-4 rounded-full text-xs font-bold transition-all press-scale ${
                  bookingsFilter === 'subscriptions'
                    ? 'bg-[#04BB49] text-white shadow-sm shadow-[#04BB49]/25'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300'
                }`}
              >
                Subscriptions
              </button>
            </div>
          </div>
        )}
      </div>

      {/* ========================================================
          MAIN BODY CONTENT STREAM
          ======================================================== */}
      {viewState === 'catalog' ? (
        catalogTab === 'amenities' ? (
          /* ----------------------------------------------------
             VIEW 1: AMENITIES CATALOG (RICH INSERTED DATA)
             ---------------------------------------------------- */
          <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 flex flex-col gap-3.5">
            {/* Search & Category Pills */}
            <div className="flex flex-col gap-2.5">
              {/* Search Input */}
              <div className="w-full h-11 px-3.5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/90 dark:border-white/10 flex items-center gap-2 shadow-xs">
                <Search size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search courts, pool, banquet hall, gym..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {['All', 'Sports', 'Aquatics', 'Clubhouse', 'Wellness', 'Recreation'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedAmenityCategory(cat)}
                    className={`h-8 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all press-scale ${
                      selectedAmenityCategory === cat
                        ? 'bg-[#04BB49] text-white shadow-xs'
                        : 'bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List or Empty State */}
            {filteredAmenities.length > 0 ? (
              <div className="flex flex-col gap-3 pb-6">
                {filteredAmenities.map((amn) => (
                  <div
                    key={amn.id}
                    className="w-full bg-white dark:bg-[#0B0F19] rounded-3xl overflow-hidden border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col transition-all hover:border-[#04BB49]/40"
                  >
                    {/* Amenity Photo with Badges */}
                    <div className="w-full h-36 bg-slate-100 dark:bg-slate-800 relative overflow-hidden">
                      <img
                        src={amn.image}
                        alt={amn.name}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        onError={(e) => {
                          (e.target as HTMLImageElement).src =
                            'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?auto=format&fit=crop&w=600&q=80';
                        }}
                      />
                      {/* Status Chip on Photo */}
                      <div className="absolute top-3 left-3 flex items-center gap-1.5">
                        <span
                          className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-wider backdrop-blur-md shadow-xs ${
                            amn.status === 'available'
                              ? 'bg-emerald-500/90 text-white'
                              : 'bg-amber-500/90 text-white'
                          }`}
                        >
                          {amn.status === 'available' ? 'Slots Available' : 'Few Slots Left'}
                        </span>
                        <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-black/60 backdrop-blur-md text-white">
                          {amn.category}
                        </span>
                      </div>

                      {/* Charge Tag */}
                      <div className="absolute bottom-3 right-3 px-2.5 py-1 rounded-xl bg-white/95 dark:bg-[#070A11]/95 text-slate-900 dark:text-white text-[11px] font-extrabold shadow-sm">
                        {amn.charge}
                      </div>
                    </div>

                    {/* Content Details */}
                    <div className="p-4 flex flex-col gap-2.5">
                      <div>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white leading-tight">
                          {amn.name}
                        </h3>
                        <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400 mt-1 leading-snug">
                          {amn.description}
                        </p>
                      </div>

                      {/* Specs Row: Timing & Capacity */}
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400 text-xs font-medium">
                        <span className="flex items-center gap-1">
                          <Clock size={13} className="text-[#04BB49]" /> {amn.timing}
                        </span>
                        <span className="flex items-center gap-1">
                          <Users size={13} className="text-indigo-500" /> {amn.capacity}
                        </span>
                      </div>

                      {/* Guidelines Pill */}
                      <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 text-[11px] text-slate-600 dark:text-slate-300 flex items-start gap-1.5">
                        <Info size={13} className="text-[#04BB49] shrink-0 mt-0.5" />
                        <span className="line-clamp-1">{amn.rules}</span>
                      </div>

                      {/* Footer CTA: Upcoming slots + Book Slot */}
                      <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/5">
                        <span className="text-[11px] font-semibold text-slate-400">
                          {amn.slots.length} daily booking slots
                        </span>

                        <button
                          type="button"
                          onClick={() => {
                            setBookingAmenity(amn);
                            setSelectedSlot(amn.slots[0] || '');
                          }}
                          className="h-9 px-4 rounded-xl bg-[#04BB49] hover:bg-[#03963B] text-white font-bold text-xs flex items-center gap-1 transition-all press-scale shadow-sm shadow-[#04BB49]/25"
                        >
                          <span>Book Slot</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              renderEmptyState(
                'No amenities found!',
                'All society amenities would show up here',
                () => {
                  setSelectedAmenityCategory('All');
                  setSearchQuery('');
                }
              )
            )}
          </div>
        ) : (
          /* ----------------------------------------------------
             VIEW 2: CLASSES & COACHING (RICH INSERTED DATA)
             ---------------------------------------------------- */
          <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 flex flex-col gap-3.5">
            {/* Search & Category Pills for Classes */}
            <div className="flex flex-col gap-2.5">
              <div className="w-full h-11 px-3.5 rounded-2xl bg-white dark:bg-[#0B0F19] border border-slate-200/90 dark:border-white/10 flex items-center gap-2 shadow-xs">
                <Search size={16} className="text-slate-400 shrink-0" />
                <input
                  type="text"
                  placeholder="Search yoga, swimming coaching, zumba, karate..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
                {searchQuery && (
                  <button type="button" onClick={() => setSearchQuery('')} className="text-slate-400 hover:text-slate-600">
                    <X size={14} />
                  </button>
                )}
              </div>

              {/* Category Pills */}
              <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
                {['All', 'Yoga & Mindfulness', 'Swimming', 'Sports', 'Dance & Fitness', 'Kids'].map((cat) => (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedClassCategory(cat)}
                    className={`h-8 px-3 rounded-full text-xs font-semibold whitespace-nowrap transition-all press-scale ${
                      selectedClassCategory === cat
                        ? 'bg-[#04BB49] text-white shadow-xs'
                        : 'bg-white dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>

            {/* List or Empty State */}
            {filteredClasses.length > 0 ? (
              <div className="flex flex-col gap-3 pb-6">
                {filteredClasses.map((cls) => (
                  <div
                    key={cls.id}
                    className="w-full bg-white dark:bg-[#0B0F19] rounded-3xl p-4 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col gap-3 transition-all hover:border-[#04BB49]/40"
                  >
                    {/* Header Row: Class Title + Category Badge */}
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <span className="text-[10px] font-bold text-[#04BB49] uppercase tracking-wider block">
                          {cls.category}
                        </span>
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 leading-tight">
                          {cls.title}
                        </h3>
                      </div>
                      <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] border border-[#04BB49]/20 shrink-0">
                        {cls.status}
                      </span>
                    </div>

                    {/* Instructor Profile Card */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#04BB49]/15 flex items-center justify-center text-[#04BB49] font-bold text-xs shrink-0">
                          {cls.instructor.split(' ')[1]?.[0] || 'IN'}
                        </div>
                        <div>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                            {cls.instructor}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400">
                            {cls.instructorTitle}
                          </p>
                        </div>
                      </div>

                      <div className="text-right">
                        <span className="text-xs font-extrabold text-slate-900 dark:text-white block">
                          {cls.fee}
                        </span>
                        <span className="text-[10px] text-[#04BB49] font-semibold">
                          {cls.enrolledCount}/{cls.maxCapacity} Enrolled
                        </span>
                      </div>
                    </div>

                    {/* Schedule & Location Chips */}
                    <div className="flex flex-col gap-1 text-xs text-slate-600 dark:text-slate-300">
                      <div className="flex items-center gap-1.5">
                        <Calendar size={13} className="text-[#04BB49]" />
                        <span className="font-medium">{cls.schedule}</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <Building2 size={13} className="text-indigo-500" />
                        <span className="text-slate-500">{cls.location} • {cls.level}</span>
                      </div>
                    </div>

                    {/* CTA Action */}
                    <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/5">
                      <span className="text-[11px] font-medium text-slate-400">
                        Resident Community Coaching
                      </span>

                      <button
                        type="button"
                        onClick={() => setEnrollClass(cls)}
                        className="h-9 px-4 rounded-xl bg-[#04BB49] hover:bg-[#03963B] text-white font-bold text-xs flex items-center gap-1 transition-all press-scale shadow-sm shadow-[#04BB49]/25"
                      >
                        <span>Join Class</span>
                        <ChevronRight size={14} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              renderEmptyState(
                'No classes found!',
                'All classes added would show up here',
                () => {
                  setSelectedClassCategory('All');
                  setSearchQuery('');
                }
              )
            )}
          </div>
        )
      ) : (
        /* ----------------------------------------------------
           VIEW 3: "MY BOOKINGS" VIEW (MATCHING SCREENSHOT 3)
           ---------------------------------------------------- */
        <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 flex flex-col gap-3">
          {filteredBookings.length > 0 ? (
            <div className="flex flex-col gap-3 pb-6">
              {filteredBookings.map((b) => (
                <div
                  key={b.id}
                  className="w-full bg-white dark:bg-[#0B0F19] rounded-3xl p-4 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col gap-3 transition-all hover:border-[#04BB49]/40"
                >
                  {/* Top Status Header */}
                  <div className="flex items-start justify-between">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-[#04BB49]">
                        {b.category} • REF: {b.bookingRef}
                      </span>
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white mt-0.5 leading-tight">
                        {b.title}
                      </h3>
                      <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5">
                        {b.subtitle}
                      </p>
                    </div>

                    <span
                      className={`px-2.5 py-1 rounded-full text-[10px] font-extrabold ${
                        b.status === 'Confirmed'
                          ? 'bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] border border-[#04BB49]/20'
                          : b.status === 'Active'
                          ? 'bg-blue-50 dark:bg-blue-950/40 text-blue-600 dark:text-blue-400 border border-blue-200'
                          : 'bg-slate-100 dark:bg-white/10 text-slate-500'
                      }`}
                    >
                      {b.status}
                    </span>
                  </div>

                  {/* Schedule Details Box */}
                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex items-center justify-between text-xs">
                    <div className="flex flex-col gap-0.5">
                      <span className="text-[10px] font-semibold text-slate-400">SCHEDULE</span>
                      <span className="font-bold text-slate-900 dark:text-white">{b.dateStr}</span>
                    </div>

                    <div className="flex flex-col gap-0.5 text-right">
                      <span className="text-[10px] font-semibold text-slate-400">TIMING</span>
                      <span className="font-bold text-[#04BB49]">{b.timeSlot}</span>
                    </div>
                  </div>

                  {/* Turnstile PIN & Pass Actions */}
                  {b.turnstilePin && (
                    <div className="flex items-center justify-between p-2.5 rounded-xl bg-slate-900 text-white text-xs font-mono">
                      <div className="flex items-center gap-2">
                        <QrCode size={15} className="text-[#04BB49]" />
                        <span className="text-[11px] text-slate-400">TURNSTILE PIN:</span>
                        <span className="font-bold tracking-widest text-[#0ECD5A]">{b.turnstilePin}</span>
                      </div>
                      <span className="text-[10px] text-slate-400 font-sans">NFC Tap Active</span>
                    </div>
                  )}

                  {/* Booking Action Buttons */}
                  <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-white/5">
                    <button
                      type="button"
                      onClick={() => handleCancelBooking(b.id)}
                      className="text-xs font-semibold text-rose-500 hover:text-rose-700 transition-colors press-scale"
                    >
                      Cancel Booking
                    </button>

                    <button
                      type="button"
                      onClick={() => setActiveQrPass(b)}
                      className="h-8 px-3.5 rounded-xl bg-[#04BB49] text-white font-bold text-xs flex items-center gap-1.5 shadow-sm shadow-[#04BB49]/20 press-scale"
                    >
                      <QrCode size={13} />
                      <span>View Pass</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            renderEmptyState(
              bookingsFilter === 'amenities'
                ? "You haven't booked any amenity"
                : bookingsFilter === 'classes'
                ? "You haven't enrolled in any class"
                : "No active subscriptions found",
              'All your bookings would show up here',
              () => {
                setViewState('catalog');
                setCatalogTab(bookingsFilter === 'classes' ? 'classes' : 'amenities');
              }
            )
          )}
        </div>
      )}

      {/* ========================================================
          MODAL 1: AMENITY BOOKING DRAWER (CONFINED ABSOLUTELY)
          ======================================================== */}
      {bookingAmenity && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div onClick={() => setBookingAmenity(null)} className="flex-1 w-full" />

          <div className="w-full rounded-t-[32px] bg-white dark:bg-[#0B0F19] p-5 pt-3 border-t border-slate-200/90 dark:border-white/10 shadow-2xl flex flex-col gap-3.5 animate-in slide-in-from-bottom duration-250">
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />

            {/* Header: Title & Close */}
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#04BB49] uppercase tracking-wider block">
                  BOOK AMENITY SLOT
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  {bookingAmenity.name}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setBookingAmenity(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors press-scale"
              >
                <X size={16} strokeWidth={2.4} />
              </button>
            </div>

            {/* Date Selector */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                SELECT DAY
              </label>
              <div className="grid grid-cols-3 gap-2">
                {[
                  { id: 'today', label: 'Today', sub: '18 Nov' },
                  { id: 'tomorrow', label: 'Tomorrow', sub: '19 Nov' },
                  { id: 'custom', label: 'Custom Date', sub: customDate ? formatCustomDateSub(customDate) : 'Pick Date' },
                ].map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setBookingDate(d.id as any)}
                    className={`h-11 rounded-2xl flex flex-col items-center justify-center border transition-all press-scale ${
                      bookingDate === d.id
                        ? 'bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] border-[#04BB49] font-bold shadow-xs'
                        : 'bg-slate-50 dark:bg-white/5 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span className="text-xs font-bold leading-tight">{d.label}</span>
                    <span className="text-[9px] opacity-75">{d.sub}</span>
                  </button>
                ))}
              </div>

              {/* Inline Custom Date Picker when 'Custom Date' is selected */}
              {bookingDate === 'custom' && (
                <div className="mt-2.5 p-3 rounded-2xl bg-[#E8FBF0]/60 dark:bg-[#0A2E18]/60 border border-[#04BB49]/35 flex items-center justify-between gap-3 animate-in fade-in slide-in-from-top-1 duration-200">
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-xl bg-[#04BB49] text-white flex items-center justify-center shrink-0 shadow-xs">
                      <Calendar size={15} strokeWidth={2.4} />
                    </div>
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 block">
                        BOOKING DATE
                      </span>
                      <span className="text-xs font-bold text-slate-900 dark:text-white">
                        {formatCustomDateLong(customDate)}
                      </span>
                    </div>
                  </div>

                  <div className="relative">
                    <input
                      type="date"
                      min="2026-11-18"
                      value={customDate}
                      onChange={(e) => {
                        if (e.target.value) setCustomDate(e.target.value);
                      }}
                      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer z-10"
                    />
                    <div className="h-8 px-3 rounded-xl bg-white dark:bg-white/10 border border-[#04BB49]/40 text-[#04BB49] dark:text-[#0ECD5A] text-xs font-bold flex items-center gap-1.5 shadow-2xs hover:bg-[#04BB49] hover:text-white transition-all press-scale pointer-events-none">
                      <Calendar size={13} />
                      <span>Choose</span>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Time Slots Selector */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                AVAILABLE SLOTS ({bookingAmenity.slots.length})
              </label>
              <div className="flex flex-col gap-1.5 max-h-40 overflow-y-auto no-scrollbar">
                {bookingAmenity.slots.map((s) => (
                  <button
                    key={s}
                    type="button"
                    onClick={() => setSelectedSlot(s)}
                    className={`p-3 rounded-2xl text-xs font-bold text-left flex items-center justify-between border transition-all press-scale ${
                      selectedSlot === s
                        ? 'bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] border-[#04BB49] shadow-xs'
                        : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    <span className="flex items-center gap-2">
                      <Clock size={13} className={selectedSlot === s ? 'text-[#04BB49]' : 'text-slate-400'} />
                      <span>{s}</span>
                    </span>
                    {selectedSlot === s && <CheckCircle2 size={16} className="text-[#04BB49]" />}
                  </button>
                ))}
              </div>
            </div>

            {/* Attendees Count */}
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400 mb-1.5 block">
                PLAYERS / GUESTS
              </label>
              <div className="flex items-center gap-2">
                {[1, 2, 4].map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => setAttendeesCount(num)}
                    className={`flex-1 h-9 rounded-xl font-bold text-xs border transition-all press-scale ${
                      attendeesCount === num
                        ? 'bg-[#04BB49] text-white border-[#04BB49]'
                        : 'bg-slate-50 dark:bg-white/5 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-white/10'
                    }`}
                  >
                    {num} {num === 1 ? 'Player' : 'Players'}
                  </button>
                ))}
              </div>
            </div>

            {/* Bottom Actions */}
            <div className="flex items-center gap-2 pt-2 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={() => setBookingAmenity(null)}
                className="flex-1 h-11 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs press-scale"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmAmenityBooking}
                className="flex-1 h-11 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#04BB49]/30 press-scale"
              >
                <CheckCircle2 size={15} />
                <span>Confirm & Get Pass</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 2: CLASS ENROLLMENT CONFIRMATION
          ======================================================== */}
      {enrollClass && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div onClick={() => setEnrollClass(null)} className="flex-1 w-full" />

          <div className="w-full rounded-t-[32px] bg-white dark:bg-[#0B0F19] p-5 pt-3 border-t border-slate-200/90 dark:border-white/10 shadow-2xl flex flex-col gap-3.5 animate-in slide-in-from-bottom duration-250">
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />

            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-bold text-[#04BB49] uppercase tracking-wider block">
                  RESIDENT CLASS ENROLLMENT
                </span>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  {enrollClass.title}
                </h3>
              </div>

              <button
                type="button"
                onClick={() => setEnrollClass(null)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors press-scale"
              >
                <X size={16} strokeWidth={2.4} />
              </button>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-100 dark:border-white/5 flex flex-col gap-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Lead Coach:</span>
                <span className="font-bold text-slate-900 dark:text-white">{enrollClass.instructor}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Batch Schedule:</span>
                <span className="font-bold text-[#04BB49]">{enrollClass.schedule}</span>
              </div>
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Class Venue:</span>
                <span className="font-bold text-slate-900 dark:text-white">{enrollClass.location}</span>
              </div>
              <div className="flex items-center justify-between text-xs border-t border-slate-200/80 dark:border-white/10 pt-2">
                <span className="text-slate-400">Resident Fee:</span>
                <span className="font-extrabold text-[#04BB49]">{enrollClass.fee}</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-relaxed">
              Enrolling grants immediate entry through turnstiles during class hours with automated attendance logging.
            </p>

            <div className="flex items-center gap-2 pt-1 border-t border-slate-100 dark:border-white/5">
              <button
                type="button"
                onClick={() => setEnrollClass(null)}
                className="flex-1 h-11 rounded-2xl border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-300 font-bold text-xs press-scale"
              >
                Cancel
              </button>

              <button
                type="button"
                onClick={handleConfirmClassEnroll}
                className="flex-1 h-11 rounded-2xl bg-[#04BB49] hover:bg-[#03963B] text-white font-bold text-xs flex items-center justify-center gap-1.5 shadow-md shadow-[#04BB49]/30 press-scale"
              >
                <CheckCircle2 size={15} />
                <span>Confirm Enrollment</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================
          MODAL 3: TURNSTILE QR ENTRY PASS MODAL
          ======================================================== */}
      {activeQrPass && (
        <div className="absolute inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col gap-4 text-center relative overflow-hidden animate-in zoom-in-95 duration-200">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 text-[#0ECD5A] font-bold text-xs">
                <CheckCircle2 size={14} />
                <span>AMENITY PASS ACTIVE</span>
              </div>
              <button
                type="button"
                onClick={() => setActiveQrPass(null)}
                className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center hover:bg-white/20 transition-colors"
              >
                <X size={14} />
              </button>
            </div>

            <div>
              <h3 className="text-base font-extrabold text-white leading-tight">
                {activeQrPass.title}
              </h3>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Prestige Palm Heights Clubhouse
              </p>
            </div>

            {/* QR Pass Box with Turnstile Code */}
            <div className="p-4 rounded-2xl bg-white text-slate-900 flex flex-col items-center gap-2 shadow-inner">
              <div className="w-36 h-36 border-4 border-slate-900 rounded-xl p-2 flex items-center justify-center relative">
                <QrCode size={110} className="text-slate-900" />
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  <div className="w-8 h-8 rounded-lg bg-[#04BB49] text-white flex items-center justify-center font-extrabold text-[10px] shadow-md">
                    HL
                  </div>
                </div>
              </div>
              <span className="font-mono font-bold text-xs text-slate-700 tracking-widest">
                TURNSTILE PIN: {activeQrPass.turnstilePin || 'PASS-9402'}
              </span>
            </div>

            {/* Pass Metadata List */}
            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-left text-xs flex flex-col gap-1.5">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>BOOKING REF:</span>
                <span className="text-white font-mono font-bold">{activeQrPass.bookingRef}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>SCHEDULE:</span>
                <span className="text-white font-bold">{activeQrPass.dateStr}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>TIME SLOT:</span>
                <span className="text-[#0ECD5A] font-bold">{activeQrPass.timeSlot}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>RESIDENT:</span>
                <span className="text-white font-bold">Vinay (Tower 10 - G003)</span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setActiveQrPass(null)}
              className="w-full h-11 rounded-2xl bg-[#04BB49] text-white font-bold text-xs shadow-md shadow-[#04BB49]/30 hover:bg-[#03963B] transition-all press-scale"
            >
              Done & Save to Passbook
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
