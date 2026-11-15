import React, { useState } from 'react';
import {
  ArrowLeft,
  Phone,
  PhoneCall,
  ShieldAlert,
  HardHat,
  Building2,
  Users,
  Search,
  CheckCircle2,
  Volume2,
  Radio,
  X
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';

export interface IntercomContact {
  id: string;
  title: string;
  category: 'Emergency Gate' | 'Facility Operations' | 'Managing Committee';
  subtext: string;
  extension: string;
  is24x7: boolean;
  priority: 'high' | 'normal';
}

const INTERCOM_CONTACTS: IntercomContact[] = [
  {
    id: 'int_01',
    title: 'Gate 1 Security Kiosk (Main Gate)',
    category: 'Emergency Gate',
    subtext: 'Main entrance boom barrier, visitor passes, delivery clearance',
    extension: 'Ext. 101',
    is24x7: true,
    priority: 'high',
  },
  {
    id: 'int_02',
    title: 'Gate 2 Security Kiosk (Resident RFID)',
    category: 'Emergency Gate',
    subtext: 'Back exit, school bus bay, commercial courier loading zone',
    extension: 'Ext. 102',
    is24x7: true,
    priority: 'high',
  },
  {
    id: 'int_03',
    title: '24/7 Lift Rescue & Technical Emergency',
    category: 'Emergency Gate',
    subtext: 'Direct hotline to Otis / Schindler on-site technicians & security',
    extension: 'Ext. 999',
    is24x7: true,
    priority: 'high',
  },
  {
    id: 'int_04',
    title: 'Estate & Facility Operations Manager',
    category: 'Facility Operations',
    subtext: 'Mr. Rajesh Hegde • Water supply, DG backup, civil repairs',
    extension: 'Ext. 201',
    is24x7: false,
    priority: 'normal',
  },
  {
    id: 'int_05',
    title: 'Clubhouse Concierge & Sports Desk',
    category: 'Facility Operations',
    subtext: 'Swimming pool, badminton courts, banquet hall bookings',
    extension: 'Ext. 301',
    is24x7: false,
    priority: 'normal',
  },
  {
    id: 'int_06',
    title: 'Association President (Managing Committee)',
    category: 'Managing Committee',
    subtext: 'Mr. Anand Ramanathan (Tower 2 - 1401)',
    extension: 'Ext. 401',
    is24x7: false,
    priority: 'normal',
  },
  {
    id: 'int_07',
    title: 'General Secretary (Managing Committee)',
    category: 'Managing Committee',
    subtext: 'Mrs. Sunita Verma (Tower 4 - 502)',
    extension: 'Ext. 402',
    is24x7: false,
    priority: 'normal',
  },
];

interface IntercomDirectoryScreenProps {
  onBack: () => void;
}

export const IntercomDirectoryScreen: React.FC<IntercomDirectoryScreenProps> = ({ onBack }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [activeCall, setActiveCall] = useState<IntercomContact | null>(null);
  const [callDuration, setCallDuration] = useState<number>(0);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleStartCall = (contact: IntercomContact) => {
    setActiveCall(contact);
    setCallDuration(0);
    showToast(`Dialing VoIP Intercom: ${contact.title}`);
  };

  const filteredContacts = INTERCOM_CONTACTS.filter((c) => {
    const matchesSearch = c.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.subtext.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCat = selectedCategory === 'All' || c.category === selectedCategory;
    return matchesSearch && matchesCat;
  });

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
                SPEED DIAL INTERCOM
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Emergency & Directory
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1 px-2.5 py-1 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 border border-cobalt-200 dark:border-cobalt-800/40 text-cobalt-700 dark:text-cobalt-300 text-[10px] font-bold">
            <Radio size={12} className="text-cobalt-600 animate-pulse" />
            <span>VoIP Active</span>
          </div>
        </div>

        {/* Search Input */}
        <Input
          placeholder="Search Gate, Lift Rescue, Facility, Committee..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Category Pills */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {['All', 'Emergency Gate', 'Facility Operations', 'Managing Committee'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all press-scale ${
                selectedCategory === cat
                  ? 'bg-cobalt-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Contacts Directory List */}
        <div className="flex flex-col gap-2.5">
          {filteredContacts.map((contact) => (
            <div
              key={contact.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div
                  className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 ${
                    contact.priority === 'high'
                      ? 'bg-crimson-50 dark:bg-crimson-950/50 text-crimson-600 dark:text-crimson-400 border border-crimson-200/80 dark:border-crimson-900/40'
                      : 'bg-cobalt-50 dark:bg-cobalt-950/50 text-cobalt-600 dark:text-cobalt-400 border border-cobalt-200/80 dark:border-cobalt-900/40'
                  }`}
                >
                  {contact.priority === 'high' ? <ShieldAlert size={20} /> : <Building2 size={20} />}
                </div>

                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                      {contact.title}
                    </h4>
                    {contact.is24x7 && (
                      <span className="px-1.5 py-0.2 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-[9px] font-extrabold rounded-full border border-emerald-500/20">
                        24x7
                      </span>
                    )}
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium line-clamp-1 mt-0.5">
                    {contact.subtext}
                  </p>
                  <span className="text-[10px] font-mono font-bold text-cobalt-600 dark:text-cobalt-400">
                    {contact.extension}
                  </span>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleStartCall(contact)}
                className={`w-10 h-10 rounded-2xl flex items-center justify-center transition-all press-scale shadow-sm shrink-0 ${
                  contact.priority === 'high'
                    ? 'bg-crimson-600 hover:bg-crimson-700 text-white'
                    : 'bg-emerald-600 hover:bg-emerald-700 text-white'
                }`}
                title={`Call ${contact.title}`}
              >
                <PhoneCall size={18} />
              </button>
            </div>
          ))}
        </div>
      </div>

      {/* Active VoIP Intercom Call Modal */}
      {activeCall && (
        <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-6 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col items-center gap-5 text-center relative overflow-hidden">
            <div className="w-20 h-20 rounded-3xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 flex items-center justify-center pulse-ring">
              <PhoneCall size={34} />
            </div>

            <div>
              <span className="text-[10px] font-mono font-bold text-emerald-400 uppercase tracking-widest block">
                HD VOIP INTERCOM CONNECTED
              </span>
              <h3 className="text-base font-extrabold text-white mt-1">
                {activeCall.title}
              </h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                {activeCall.extension} • 00:14
              </p>
            </div>

            <div className="p-3 w-full rounded-2xl bg-slate-800/80 border border-slate-700/80 text-xs text-slate-300 font-medium">
              Line encrypted. Connected from Tower 2 - Flat 1204.
            </div>

            <button
              type="button"
              onClick={() => {
                setActiveCall(null);
                showToast('Intercom call ended');
              }}
              className="w-full h-12 rounded-2xl bg-crimson-600 hover:bg-crimson-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-colors press-scale"
            >
              <Phone size={16} className="rotate-[135deg]" />
              <span>End Intercom Call</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
