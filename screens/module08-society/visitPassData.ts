export interface VisitPassRecord {
  id: string;
  direction: 'received' | 'given';
  personName: string;
  phone?: string;
  unitLabel: string;
  purpose: string;
  dateStr: string;
  timeSlot: string;
  vehicleNo?: string;
  gateName?: string;
  pinCode: string;
  status: 'pending' | 'approved';
}

export const SAMPLE_RECEIVED_PASSES: VisitPassRecord[] = [
  {
    id: 'vpr_01',
    direction: 'received',
    personName: 'Vikram Mehta',
    phone: '+91 98451 77230',
    unitLabel: 'Tower 3 - 802 • Prestige Lakeside',
    purpose: 'Marketplace Pickup',
    dateStr: 'Today, 26 Nov 2026',
    timeSlot: 'Afternoon (4:00 PM – 6:30 PM)',
    vehicleNo: 'KA-05-MQ-3819',
    gateName: 'Gate 1 (Main RFID Boom)',
    pinCode: '482915',
    status: 'approved',
  },
  {
    id: 'vpr_02',
    direction: 'received',
    personName: 'Dr. Aruna Rao',
    phone: '+91 97400 51920',
    unitLabel: 'Tower 1 - 404 • Prestige Lakeside',
    purpose: 'Personal Guest',
    dateStr: 'Tomorrow, 27 Nov 2026',
    timeSlot: 'Morning (10:30 AM – 12:30 PM)',
    gateName: 'Gate 2 (Visitor Reception)',
    pinCode: '739204',
    status: 'pending',
  },
  {
    id: 'vpr_03',
    direction: 'received',
    personName: 'Ananya Krishnan',
    phone: '+91 99002 64810',
    unitLabel: 'Tower 4 - 302 • Prestige Lakeside',
    purpose: 'Family Visit',
    dateStr: 'Sat, 28 Nov 2026',
    timeSlot: 'Evening (6:00 PM – 9:30 PM)',
    vehicleNo: 'KA-01-HT-9042',
    gateName: 'Gate 1 (Main RFID Boom)',
    pinCode: '615830',
    status: 'approved',
  },
];

export const SAMPLE_GIVEN_PASSES: VisitPassRecord[] = [
  {
    id: 'vpg_01',
    direction: 'given',
    personName: 'Karthik Nair',
    phone: '+91 98801 44210',
    unitLabel: 'Tower 2 - 1204',
    purpose: 'Personal Guest',
    dateStr: 'Today, 26 Nov 2026',
    timeSlot: 'Evening (7:00 PM – 9:30 PM)',
    vehicleNo: 'KA-03-NF-2217',
    gateName: 'Gate 1 (Main Security Kiosk)',
    pinCode: '593018',
    status: 'pending',
  },
  {
    id: 'vpg_02',
    direction: 'given',
    personName: 'Rahul Sharma',
    phone: '+91 98450 12345',
    unitLabel: 'Tower 2 - 1204',
    purpose: 'Family Visit',
    dateStr: 'Today, 26 Nov 2026',
    timeSlot: 'Afternoon (12:00 PM – 5:00 PM)',
    vehicleNo: 'KA-05-MQ-3819',
    gateName: 'Gate 1 (Main RFID Boom)',
    pinCode: '847291',
    status: 'approved',
  },
  {
    id: 'vpg_03',
    direction: 'given',
    personName: 'Ramesh (AC Service Tech)',
    phone: '+91 99162 88341',
    unitLabel: 'Tower 2 - 1204',
    purpose: 'Service',
    dateStr: 'Tomorrow, 27 Nov 2026',
    timeSlot: 'Morning (9:30 AM – 11:30 AM)',
    gateName: 'Gate 2 (Service & Delivery)',
    pinCode: '304612',
    status: 'approved',
  },
];
