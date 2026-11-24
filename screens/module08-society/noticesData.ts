export interface SocietyNotice {
  id: string;
  title: string;
  department: string;
  dateStr: string;
  priority: 'urgent' | 'official' | 'general';
  summary: string;
  fullBody: string;
  hasVoting?: boolean;
  pollQuestion?: string;
  votesCount?: { yes: number; no: number };
  signedBy: string;
  pdfFileName: string;
  readTime?: string;
  category?: string;
}

export const SAMPLE_NOTICES: SocietyNotice[] = [
  {
    id: 'not_01',
    title: 'Scheduled Overhead Water Tank Cleaning (Tower 1 & Tower 2)',
    department: 'Facility & Plumbing Maintenance',
    dateStr: 'Tomorrow • 9:00 AM – 1:00 PM',
    priority: 'urgent',
    summary: 'Water supply to kitchen and master bathrooms will be suspended during high-pressure tank disinfection.',
    fullBody: 'Dear Residents of Tower 1 and Tower 2, please note that semi-annual deep microbiological sanitization and scouring of the rooftop 80,000L water reservoirs will be conducted tomorrow between 9:00 AM and 1:00 PM. Please store sufficient municipal drinking water for cooking and emergencies. Supply will resume with normal RO filtration pressure by 1:30 PM.',
    signedBy: 'Mr. Rajesh Hegde (Estate Manager) & President MC',
    pdfFileName: 'Circular-2026-WT-04.pdf',
    readTime: '2 min read',
    category: 'Facility Maintenance',
  },
  {
    id: 'not_02',
    title: 'Notice for 12th Annual General Body Meeting (AGM 2026)',
    department: 'Executive Managing Committee',
    dateStr: 'Sunday, 30 Nov 2026 • 10:30 AM',
    priority: 'official',
    summary: 'Audited balance sheets, clubhouse expansion budget review, and committee election voting.',
    fullBody: 'In accordance with the Karnataka Apartment Ownership Act and Society By-Laws, the 12th AGM of Prestige Lakeside Habitat Owners Association will convene at the Main Banquet Hall. Physical attendance and verified in-app proxy voting are both supported. The audited financials for FY 2025-26 have been published in the Hunt Lockdoor Financials ledger.',
    hasVoting: true,
    pollQuestion: 'Do you approve the proposed Solar Rooftop & EV Fast-Charging CapEx budget of ₹42 Lakhs?',
    votesCount: { yes: 184, no: 22 },
    signedBy: 'Association General Secretary',
    pdfFileName: 'AGM-Notice-Agenda-2026.pdf',
    readTime: '3 min read',
    category: 'Governance & AGM',
  },
  {
    id: 'not_03',
    title: 'Updated Policy for Resident Pets in Elevators & Lawns',
    department: 'Community Living Guidelines',
    dateStr: 'Effective 1 Dec 2026',
    priority: 'general',
    summary: 'Leash requirements in common corridors and dedicated pet waste disposal bins on North Lawn.',
    fullBody: 'To ensure comfort and hygiene for all community members, pet dogs must remain leashed at all times within elevator lobbies and landscaped jogging tracks. Please utilize the dedicated bio-degradable waste dispensers installed across the perimeter park.',
    signedBy: 'Grievance & Amenities Subcommittee',
    pdfFileName: 'Pet-Guidelines-Policy-V2.pdf',
    readTime: '1 min read',
    category: 'Community Guidelines',
  },
];
