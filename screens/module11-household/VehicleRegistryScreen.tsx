import React, { useState } from 'react';
import {
  ArrowLeft,
  Car,
  Plus,
  Radio,
  Trash2,
  CheckCircle2,
  Ticket,
  ShieldCheck,
  QrCode,
  X
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';
import { GateBarrier3D } from '../../components/3d/Vector3DElements';

export interface ResidentVehicleItem {
  id: string;
  plateNumber: string;
  type: 'Car (4W)' | 'Bike (2W)';
  model: string;
  parkingSlot: string;
  rfidTag: string;
  barrierSync: boolean;
}

interface VehicleRegistryScreenProps {
  onBack: () => void;
}

export const VehicleRegistryScreen: React.FC<VehicleRegistryScreenProps> = ({ onBack }) => {
  const [vehicles, setVehicles] = useState<ResidentVehicleItem[]>([
    {
      id: 'veh_01',
      plateNumber: 'KA-05-MQ-3819',
      type: 'Car (4W)',
      model: 'Tata Nexon EV (Dark Edition)',
      parkingSlot: 'Basement 1 - Slot #B1-142',
      rfidTag: 'RFID-FASTAG-984210',
      barrierSync: true,
    },
    {
      id: 'veh_02',
      plateNumber: 'KA-03-JJ-8210',
      type: 'Bike (2W)',
      model: 'Ather 450X (Gen 3 White)',
      parkingSlot: 'Basement 1 - Slot #2W-88',
      rfidTag: 'RFID-BARRIER-33120',
      barrierSync: true,
    },
  ]);

  const [guestPassesRemaining, setGuestPassesRemaining] = useState<number>(2);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [showGuestPassModal, setShowGuestPassModal] = useState<boolean>(false);
  const [guestCarPlate, setGuestCarPlate] = useState<string>('');
  const [newPlate, setNewPlate] = useState<string>('');
  const [newModel, setNewModel] = useState<string>('');
  const [newType, setNewType] = useState<'Car (4W)' | 'Bike (2W)'>('Car (4W)');
  const [newSlot, setNewSlot] = useState<string>('B1-');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlate.trim()) {
      showToast('Please enter the registration number');
      return;
    }

    const created: ResidentVehicleItem = {
      id: `veh_${Date.now()}`,
      plateNumber: newPlate.toUpperCase().trim(),
      type: newType,
      model: newModel.trim() || 'Resident Vehicle',
      parkingSlot: newSlot.trim() || 'B1-General',
      rfidTag: `RFID-AUTO-${Math.floor(100000 + Math.random() * 900000)}`,
      barrierSync: true,
    };

    setVehicles([...vehicles, created]);
    setShowAddModal(false);
    setNewPlate('');
    setNewModel('');
    showToast(`✓ Vehicle ${created.plateNumber} linked to Gate 2 Boom Barrier`);
  };

  const handleIssueGuestPass = (e: React.FormEvent) => {
    e.preventDefault();
    if (!guestCarPlate.trim()) {
      showToast('Please enter guest vehicle number');
      return;
    }
    setGuestPassesRemaining((prev) => Math.max(0, prev - 1));
    setShowGuestPassModal(false);
    showToast(`✓ Temporary 24h Guest Parking Pass issued for ${guestCarPlate.toUpperCase()}`);
    setGuestCarPlate('');
  };

  const handleRemoveVehicle = (id: string, plate: string) => {
    setVehicles(vehicles.filter((v) => v.id !== id));
    showToast(`Unlinked ${plate} from RFID gate barrier`);
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
              title="Back"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                GATE 2 BOOM BARRIER
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Vehicle Registry & Fastag
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-9 px-3 rounded-2xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors press-scale"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Add Vehicle</span>
          </button>
        </div>

        {/* RFID Fastag Live Banner with 3D Gate Barrier */}
        <div className="p-3.5 rounded-3xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 text-xs flex items-center justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3">
            <GateBarrier3D size={48} />
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] font-extrabold text-amber-700 dark:text-amber-400 uppercase tracking-widest">
                  RFID Fastag Active
                </span>
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                Optical OCR & Auto-Lift Active
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
                Gate 2 camera lifts barrier automatically within 1.5 seconds
              </p>
            </div>
          </div>
        </div>

        {/* Registered Vehicles List */}
        <div className="flex flex-col gap-2.5">
          {vehicles.map((v) => (
            <div
              key={v.id}
              className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-center justify-between"
            >
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-obsidian-800 text-slate-700 dark:text-slate-200 flex items-center justify-center shrink-0 border border-slate-200 dark:border-obsidian-700">
                  <Car size={20} className="text-cobalt-600 dark:text-cobalt-400" />
                </div>
                <div>
                  <div className="flex items-center gap-1.5">
                    <h4 className="font-mono font-bold text-slate-900 dark:text-white text-xs tracking-wider">
                      {v.plateNumber}
                    </h4>
                    <Badge variant="emerald" size="sm">
                      RFID Synced
                    </Badge>
                  </div>
                  <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                    {v.model} • {v.type}
                  </p>
                  <p className="text-[10px] text-slate-400 font-mono mt-0.5">
                    {v.parkingSlot} • {v.rfidTag}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => handleRemoveVehicle(v.id, v.plateNumber)}
                className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-crimson-50 dark:bg-obsidian-800 dark:hover:bg-crimson-950/60 text-slate-400 hover:text-crimson-600 transition-colors flex items-center justify-center"
                title="Remove Vehicle"
              >
                <Trash2 size={14} />
              </button>
            </div>
          ))}
        </div>

        {/* Guest Vehicle Temporary Pass Card */}
        <div className="p-4 rounded-3xl bg-slate-50 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
              <Ticket size={20} />
            </div>
            <div>
              <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                Guest Parking Pass
              </h4>
              <p className="text-[11px] text-slate-500">
                {guestPassesRemaining} complimentary passes remaining this month
              </p>
            </div>
          </div>

          <button
            type="button"
            disabled={guestPassesRemaining <= 0}
            onClick={() => setShowGuestPassModal(true)}
            className="h-8 px-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50 text-white font-bold text-xs transition-colors press-scale"
          >
            Issue Pass
          </button>
        </div>
      </div>

      {/* Add Vehicle Modal */}
      {showAddModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Register Vehicle & RFID
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="flex flex-col gap-3">
              <Input
                label="REGISTRATION PLATE"
                placeholder="e.g. KA-05-MQ-3819"
                value={newPlate}
                onChange={(e) => setNewPlate(e.target.value)}
                required
              />

              <Input
                label="MAKE & MODEL"
                placeholder="e.g. Honda Elevate / Ather 450X"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
              />

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  VEHICLE CATEGORY
                </label>
                <select
                  value={newType}
                  onChange={(e) => setNewType(e.target.value as any)}
                  className="w-full h-[52px] rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 px-3.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
                >
                  <option value="Car (4W)">Car (4W) - Four Wheeler</option>
                  <option value="Bike (2W)">Bike / Scooter (2W)</option>
                </select>
              </div>

              <Input
                label="ALLOTTED SLOT"
                placeholder="e.g. Basement 1 - #B1-142"
                value={newSlot}
                onChange={(e) => setNewSlot(e.target.value)}
              />

              <div className="flex items-center gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Bind Vehicle
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Guest Pass Modal */}
      {showGuestPassModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[320px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Issue Guest Car Pass
              </h3>
              <button
                type="button"
                onClick={() => setShowGuestPassModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleIssueGuestPass} className="flex flex-col gap-3">
              <Input
                label="GUEST VEHICLE NUMBER"
                placeholder="e.g. KA-01-MJ-9912"
                value={guestCarPlate}
                onChange={(e) => setGuestCarPlate(e.target.value)}
                required
              />

              <p className="text-[11px] text-slate-500 leading-snug">
                Valid for 24 hours. Gate 2 boom barrier will scan the vehicle plate and allocate Visitor Parking Bay #V-12.
              </p>

              <div className="flex items-center gap-2 pt-1">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowGuestPassModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Generate Pass
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
