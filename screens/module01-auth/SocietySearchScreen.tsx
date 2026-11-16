import React, { useState } from 'react';
import { ArrowLeft, Search, MapPin, Building2, Check, ShieldCheck, ChevronRight, PlusCircle, CheckCircle2 } from 'lucide-react';
import { Button, StepProgress } from '../../components/UIComponents';

export interface SocietyItem {
  id: string;
  name: string;
  locality: string;
  city: string;
  flatsCount: string;
  gateStatus: 'verified' | 'fastag' | 'active';
  address: string;
}

const SAMPLE_SOCIETIES: SocietyItem[] = [
  {
    id: 'soc_01',
    name: 'Prestige Lakeside Habitat',
    locality: 'Whitefield',
    city: 'Bengaluru',
    flatsCount: '3,428 Flats',
    gateStatus: 'verified',
    address: 'Varthur Main Road, Gunjur, Bengaluru, Karnataka 560087',
  },
  {
    id: 'soc_02',
    name: 'Sobha Dream Acres',
    locality: 'Panathur Main Rd',
    city: 'Bengaluru',
    flatsCount: '6,500 Flats',
    gateStatus: 'fastag',
    address: 'Balagere, Panathur, Bengaluru, Karnataka 560087',
  },
  {
    id: 'soc_03',
    name: 'Brigade Cornerstone Utopia',
    locality: 'Varthur',
    city: 'Bengaluru',
    flatsCount: '4,000 Flats',
    gateStatus: 'verified',
    address: 'SH 35, Varthur, Bengaluru, Karnataka 560087',
  },
  {
    id: 'soc_04',
    name: 'Godrej Woods',
    locality: 'Sector 43',
    city: 'Noida',
    flatsCount: '1,200 Flats',
    gateStatus: 'active',
    address: 'Sector 43, Noida, Uttar Pradesh 201303',
  },
  {
    id: 'soc_05',
    name: 'Hiranandani Estate',
    locality: 'Thane West',
    city: 'Mumbai',
    flatsCount: '2,800 Flats',
    gateStatus: 'verified',
    address: 'Ghodbunder Road, Patlipada, Thane, Maharashtra 400607',
  },
];

interface SocietySearchScreenProps {
  onSelectSociety: (society: SocietyItem) => void;
  onBack: () => void;
  selectedSocietyId?: string;
}

export const SocietySearchScreen: React.FC<SocietySearchScreenProps> = ({
  onSelectSociety,
  onBack,
  selectedSocietyId = 'soc_01',
}) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCity, setSelectedCity] = useState<string>('All');
  const [selected, setSelected] = useState<string>(selectedSocietyId);
  const [isDetectingLocation, setIsDetectingLocation] = useState<boolean>(false);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const cities = ['All', 'Bengaluru', 'Mumbai', 'Noida', 'Hyderabad'];

  const filteredSocieties = SAMPLE_SOCIETIES.filter((soc) => {
    const matchesCity = selectedCity === 'All' || soc.city === selectedCity;
    const matchesQuery =
      soc.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soc.locality.toLowerCase().includes(searchQuery.toLowerCase()) ||
      soc.city.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCity && matchesQuery;
  });

  const handleDetectLocation = () => {
    setIsDetectingLocation(true);
    setTimeout(() => {
      setIsDetectingLocation(false);
      setSelectedCity('Bengaluru');
      setSearchQuery('Whitefield');
    }, 600);
  };

  const handleConfirm = () => {
    const found = SAMPLE_SOCIETIES.find((s) => s.id === selected);
    if (found) {
      onSelectSociety(found);
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300 relative">
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}
      {/* Top Header & Search Bar */}
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
            <StepProgress currentStep={2} totalSteps={4} stepLabels={['Verification', 'Society', 'Unit', 'Role']} />
          </div>
        </div>

        {/* Title & Location Banner */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Find Your Society
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Connect to your gated residential community's digital perimeter.
          </p>

          {/* Auto Location Pill */}
          <button
            type="button"
            onClick={handleDetectLocation}
            className="mt-3 inline-flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 hover:bg-cobalt-100 dark:hover:bg-cobalt-900/60 border border-cobalt-200 dark:border-cobalt-800/40 text-xs font-semibold text-cobalt-700 dark:text-cobalt-300 transition-colors"
          >
            <MapPin size={14} className={isDetectingLocation ? 'animate-bounce text-cobalt-500' : 'text-cobalt-600 dark:text-cobalt-400'} />
            <span>{isDetectingLocation ? 'Detecting GPS...' : 'Auto-detect nearby society'}</span>
          </button>
        </div>

        {/* Search Input */}
        <div className="relative flex items-center h-[54px] rounded-2xl border border-slate-300/80 dark:border-obsidian-750 bg-slate-50/90 dark:bg-obsidian-900/90 hover:bg-slate-100/70 dark:hover:bg-obsidian-850 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15 shadow-2xs transition-all group">
          <div className="w-9 h-9 rounded-xl bg-white dark:bg-obsidian-800 text-slate-500 dark:text-slate-400 border border-slate-200/90 dark:border-obsidian-700 shadow-2xs flex items-center justify-center shrink-0 ml-2 mr-2.5 group-focus-within:text-cobalt-600 dark:group-focus-within:text-cobalt-400 pointer-events-none transition-colors">
            <Search size={16} />
          </div>
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search society name, road, PIN..."
            className="w-full h-full pr-10 bg-transparent text-slate-900 dark:text-slate-100 placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-semibold outline-none"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={() => setSearchQuery('')}
              className="absolute right-3.5 px-2 py-1 rounded-md text-xs font-bold text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 bg-slate-200/60 dark:bg-obsidian-800"
            >
              Clear
            </button>
          )}
        </div>

        {/* City Filter Chips */}
        <div className="flex items-center gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {cities.map((city) => (
            <button
              key={city}
              type="button"
              onClick={() => setSelectedCity(city)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                selectedCity === city
                  ? 'bg-slate-900 text-white dark:bg-slate-100 dark:text-slate-900 shadow-sm'
                  : 'bg-slate-100 text-slate-600 dark:bg-obsidian-900 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-obsidian-850'
              }`}
            >
              {city}
            </button>
          ))}
        </div>

        {/* Filtered Society Results List */}
        <div className="flex flex-col gap-2.5 max-h-[300px] overflow-y-auto no-scrollbar pr-0.5">
          {filteredSocieties.length > 0 ? (
            filteredSocieties.map((soc) => {
              const isSelected = selected === soc.id;
              return (
                <div
                  key={soc.id}
                  onClick={() => setSelected(soc.id)}
                  className={`
                    p-4 rounded-2xl border transition-all duration-150 cursor-pointer flex items-start justify-between gap-3
                    ${isSelected
                      ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/30 dark:bg-cobalt-950/40 ring-1 ring-cobalt-500/40'
                      : 'border-slate-200/80 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 hover:border-slate-300 dark:hover:border-obsidian-700 shadow-ambient'}
                  `}
                >
                  <div className="flex items-start gap-3">
                    <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${
                      isSelected ? 'bg-cobalt-600 text-white' : 'bg-slate-100 dark:bg-obsidian-800 text-slate-600 dark:text-slate-300'
                    }`}>
                      <Building2 size={20} strokeWidth={2.2} />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                          {soc.name}
                        </h4>
                      </div>
                      <p className="text-xs text-slate-500 dark:text-slate-400 mt-0.5">
                        {soc.locality}, {soc.city}
                      </p>
                      <div className="flex items-center gap-2 mt-2">
                        <span className="text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                          {soc.flatsCount}
                        </span>
                        <span className="text-slate-300 dark:text-obsidian-700">•</span>
                        <span className="text-[10px] font-bold px-1.5 py-0.5 rounded-md bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/40 uppercase">
                          {soc.gateStatus === 'fastag' ? 'RFID Fastag' : 'Verified Gate'}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className={`w-6 h-6 rounded-full flex items-center justify-center border transition-all shrink-0 mt-1 ${
                    isSelected
                      ? 'bg-cobalt-600 border-cobalt-600 text-white'
                      : 'border-slate-300 dark:border-obsidian-700'
                  }`}>
                    {isSelected && <Check size={14} strokeWidth={3} />}
                  </div>
                </div>
              );
            })
          ) : (
            <div className="p-6 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 text-center flex flex-col items-center gap-2">
              <Building2 size={32} className="text-slate-400" />
              <p className="text-sm font-bold text-slate-800 dark:text-slate-200">No society found</p>
              <p className="text-xs text-slate-500">Check spelling or request your society admin to onboard.</p>
            </div>
          )}

          {/* Request New Society Card */}
          <div
            onClick={() => showToast('✓ Onboarding request submitted! Our community onboarding team will reach out.')}
            className="p-3.5 rounded-2xl border border-dashed border-slate-300 dark:border-obsidian-700 bg-slate-50/50 dark:bg-obsidian-900/30 flex items-center justify-between cursor-pointer hover:bg-slate-100 dark:hover:bg-obsidian-900 transition-colors"
          >
            <div className="flex items-center gap-2.5 text-xs font-semibold text-slate-700 dark:text-slate-300">
              <PlusCircle size={16} className="text-cobalt-500" />
              <span>Can't find your society? Request onboarding</span>
            </div>
            <ChevronRight size={14} className="text-slate-400" />
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={handleConfirm}
          disabled={!selected}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Select Society & Continue
        </Button>
      </div>
    </div>
  );
};
