import React, { useState } from 'react';
import { ArrowLeft, Building, Home, Check, ChevronRight, Info, ShieldAlert } from 'lucide-react';
import { Button, StepProgress } from '../../components/UIComponents';
import { SocietyItem } from './SocietySearchScreen';

interface FlatSelectionScreenProps {
  society: SocietyItem;
  onSelectUnit: (unitInfo: { tower: string; flatNumber: string; floor: string }) => void;
  onBack: () => void;
}

export const FlatSelectionScreen: React.FC<FlatSelectionScreenProps> = ({
  society,
  onSelectUnit,
  onBack,
}) => {
  const [selectedTower, setSelectedTower] = useState<string>('Tower 2');
  const [selectedFloor, setSelectedFloor] = useState<string>('12');
  const [selectedFlat, setSelectedFlat] = useState<string>('1204');
  const [searchFlat, setSearchFlat] = useState<string>('1204');

  const towers = ['Tower 1', 'Tower 2', 'Tower 3', 'Tower 4', 'Villas'];
  const floors = ['10', '11', '12', '14', '15', '16'];

  // Generated units on selected floor
  const unitsOnFloor = [
    { flat: `${selectedFloor}01`, type: '2 BHK', status: 'Occupied' },
    { flat: `${selectedFloor}02`, type: '3 BHK', status: 'Occupied' },
    { flat: `${selectedFloor}03`, type: '2 BHK', status: 'Available' },
    { flat: `${selectedFloor}04`, type: '3 BHK Luxury', status: 'Available' },
    { flat: `${selectedFloor}05`, type: '3 BHK', status: 'Occupied' },
    { flat: `${selectedFloor}06`, type: '4 BHK Penthouse', status: 'Available' },
  ];

  const handleConfirm = () => {
    if (selectedFlat) {
      onSelectUnit({
        tower: selectedTower,
        flatNumber: selectedFlat,
        floor: selectedFloor,
      });
    }
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300">
      {/* Top Header & Selected Society Glance */}
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
            <StepProgress currentStep={3} totalSteps={4} stepLabels={['Verification', 'Society', 'Unit', 'Role']} />
          </div>
        </div>

        {/* Selected Society Summary Card */}
        <div className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 flex items-center justify-between shadow-ambient">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center">
              <Building size={18} strokeWidth={2.2} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                {society.name}
              </h4>
              <p className="text-[11px] text-slate-500 dark:text-slate-400">
                {society.locality}, {society.city}
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-cobalt-600 dark:text-cobalt-400 hover:underline px-2"
          >
            Change
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Select Your Unit
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Choose your tower, wing, and flat number to map gate passes.
          </p>
        </div>

        {/* Tower Selector Pills */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Select Tower / Block
          </label>
          <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
            {towers.map((tower) => (
              <button
                key={tower}
                type="button"
                onClick={() => setSelectedTower(tower)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold whitespace-nowrap transition-all ${
                  selectedTower === tower
                    ? 'bg-cobalt-600 text-white shadow-sm ring-2 ring-cobalt-600/30'
                    : 'bg-white dark:bg-obsidian-900 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-obsidian-800 hover:bg-slate-100 dark:hover:bg-obsidian-850'
                }`}
              >
                {tower}
              </button>
            ))}
          </div>
        </div>

        {/* Floor & Flat Selection Area */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-semibold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
              Flats on {selectedFloor}th Floor ({selectedTower})
            </label>
            <div className="flex items-center gap-1 text-xs">
              <span className="text-slate-400">Floor:</span>
              <select
                value={selectedFloor}
                onChange={(e) => {
                  setSelectedFloor(e.target.value);
                  setSelectedFlat(`${e.target.value}04`);
                }}
                className="bg-slate-100 dark:bg-obsidian-850 text-slate-800 dark:text-slate-200 font-bold px-2 py-1 rounded-lg border border-slate-200 dark:border-obsidian-700 outline-none text-xs"
              >
                {floors.map((f) => (
                  <option key={f} value={f}>
                    {f}th Floor
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Unit Grid */}
          <div className="grid grid-cols-2 gap-2.5 max-h-[220px] overflow-y-auto no-scrollbar pt-1">
            {unitsOnFloor.map((u) => {
              const isSelected = selectedFlat === u.flat;
              return (
                <div
                  key={u.flat}
                  onClick={() => {
                    if (typeof window !== 'undefined' && 'vibrate' in navigator) {
                      navigator.vibrate?.(10);
                    }
                    setSelectedFlat(u.flat);
                  }}
                  className={`
                    p-3.5 rounded-2xl border transition-all duration-150 cursor-pointer flex flex-col justify-between press-scale
                    ${isSelected
                      ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/50 dark:bg-cobalt-950/40 ring-2 ring-cobalt-500/30 shadow-sm'
                      : 'border-slate-200 dark:border-obsidian-800 bg-white dark:bg-obsidian-900 hover:border-slate-300 dark:hover:border-obsidian-700 shadow-ambient'}
                  `}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-base font-bold font-mono text-slate-900 dark:text-white">
                      {u.flat}
                    </span>
                    {isSelected ? (
                      <div className="w-5 h-5 rounded-full bg-cobalt-600 text-white flex items-center justify-center">
                        <Check size={12} strokeWidth={3} />
                      </div>
                    ) : (
                      <span className="w-2 h-2 rounded-full bg-slate-200 dark:bg-obsidian-750" />
                    )}
                  </div>
                  <div className="flex items-center justify-between mt-2 pt-2 border-t border-slate-100 dark:border-obsidian-800 text-[11px]">
                    <span className="text-slate-500 dark:text-slate-400">{u.type}</span>
                    <span className="font-semibold text-emerald-600 dark:text-emerald-400">Open</span>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Conflict-Safe Notice */}
          <div className="p-3 rounded-xl bg-slate-100/70 dark:bg-obsidian-900/60 border border-slate-200/60 dark:border-obsidian-800 flex items-start gap-2 text-xs text-slate-600 dark:text-slate-400 mt-1">
            <Info size={15} className="text-cobalt-500 shrink-0 mt-0.5" />
            <span>
              Selected: <strong className="text-slate-900 dark:text-white">{selectedTower} - Unit {selectedFlat}</strong>. In the next step, you will specify whether you are an Owner or Tenant.
            </span>
          </div>
        </div>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={handleConfirm}
          disabled={!selectedFlat}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Confirm Unit & Proceed
        </Button>
      </div>
    </div>
  );
};
