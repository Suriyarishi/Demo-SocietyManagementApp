import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  UserPlus,
  Car,
  Plus,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Smartphone,
  Share2,
  KeyRound,
  Radio,
  X
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';

export interface FamilyMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  role: 'Admin' | 'Co-Resident' | 'Minor Dependent';
  avatarInitials: string;
  hasAppAccess: boolean;
  canApproveGuests: boolean;
}

export interface ResidentVehicle {
  id: string;
  plateNumber: string;
  type: 'Car (4W)' | 'Bike (2W)' | 'EV Scooter';
  model: string;
  parkingSlot: string;
  rfidTag: string;
  fastagSyncStatus: 'synced' | 'pending';
}

interface HouseholdMembersScreenProps {
  onBack: () => void;
}

export const HouseholdMembersScreen: React.FC<HouseholdMembersScreenProps> = ({ onBack }) => {
  const [activeTab, setActiveTab] = useState<'members' | 'vehicles'>('members');
  const [toastMsg, setToastMsg] = useState<string>('');

  // Sample Household Members
  const [members, setMembers] = useState<FamilyMember[]>([
    {
      id: 'mem_01',
      name: 'Suriya K',
      relation: 'Self (Primary Owner)',
      phone: '+91 98765 43210',
      role: 'Admin',
      avatarInitials: 'SK',
      hasAppAccess: true,
      canApproveGuests: true,
    },
    {
      id: 'mem_02',
      name: 'Pooja Suriya',
      relation: 'Spouse',
      phone: '+91 98450 11223',
      role: 'Co-Resident',
      avatarInitials: 'PS',
      hasAppAccess: true,
      canApproveGuests: true,
    },
    {
      id: 'mem_03',
      name: 'Aarav Suriya',
      relation: 'Child (Minor)',
      phone: 'No phone registered',
      role: 'Minor Dependent',
      avatarInitials: 'AS',
      hasAppAccess: false,
      canApproveGuests: false,
    },
  ]);

  // Sample Vehicles
  const [vehicles, setVehicles] = useState<ResidentVehicle[]>([
    {
      id: 'veh_01',
      plateNumber: 'KA-05-MQ-3819',
      type: 'Car (4W)',
      model: 'Tata Nexon EV (Dark Edition)',
      parkingSlot: 'Basement 1 - Slot #B1-142',
      rfidTag: 'RFID-FASTAG-984210',
      fastagSyncStatus: 'synced',
    },
    {
      id: 'veh_02',
      plateNumber: 'KA-03-JJ-8210',
      type: 'Bike (2W)',
      model: 'Ather 450X (White)',
      parkingSlot: 'Basement 1 - Slot #2W-88',
      rfidTag: 'RFID-BARRIER-33120',
      fastagSyncStatus: 'synced',
    },
  ]);

  // Modal States
  const [showAddMemberModal, setShowAddMemberModal] = useState<boolean>(false);
  const [newMemberName, setNewMemberName] = useState<string>('');
  const [newMemberRelation, setNewMemberRelation] = useState<string>('Spouse');
  const [newMemberPhone, setNewMemberPhone] = useState<string>('');
  const [newMemberCanApprove, setNewMemberCanApprove] = useState<boolean>(true);

  const [showAddVehicleModal, setShowAddVehicleModal] = useState<boolean>(false);
  const [newPlateNumber, setNewPlateNumber] = useState<string>('');
  const [newVehicleModel, setNewVehicleModel] = useState<string>('');
  const [newVehicleType, setNewVehicleType] = useState<'Car (4W)' | 'Bike (2W)'>('Car (4W)');
  const [newParkingSlot, setNewParkingSlot] = useState<string>('B1-');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMemberName.trim()) {
      showToast('Please enter the family member name');
      return;
    }
    const initials = newMemberName
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newMem: FamilyMember = {
      id: `mem_${Date.now()}`,
      name: newMemberName.trim(),
      relation: newMemberRelation,
      phone: newMemberPhone.trim() || 'Not specified',
      role: 'Co-Resident',
      avatarInitials: initials || 'FM',
      hasAppAccess: true,
      canApproveGuests: newMemberCanApprove,
    };

    setMembers((prev) => [...prev, newMem]);
    setShowAddMemberModal(false);
    setNewMemberName('');
    setNewMemberPhone('');
    showToast(`✓ Invitation link sent via WhatsApp to ${newMem.name}`);
  };

  const handleAddVehicle = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPlateNumber.trim()) {
      showToast('Please enter the vehicle registration number');
      return;
    }
    const newVeh: ResidentVehicle = {
      id: `veh_${Date.now()}`,
      plateNumber: newPlateNumber.toUpperCase().trim(),
      type: newVehicleType,
      model: newVehicleModel.trim() || 'Standard Vehicle',
      parkingSlot: newParkingSlot.trim() || 'B1-General',
      rfidTag: `RFID-AUTO-${Math.floor(100000 + Math.random() * 900000)}`,
      fastagSyncStatus: 'synced',
    };

    setVehicles((prev) => [...prev, newVeh]);
    setShowAddVehicleModal(false);
    setNewPlateNumber('');
    setNewVehicleModel('');
    showToast(`✓ Vehicle ${newVeh.plateNumber} bound to Gate 2 Boom Barrier`);
  };

  const handleRemoveMember = (id: string, name: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast(`Removed ${name} from Flat 1204 access`);
  };

  const handleRemoveVehicle = (id: string, plate: string) => {
    setVehicles((prev) => prev.filter((v) => v.id !== id));
    showToast(`Vehicle ${plate} unlinked from RFID gate barrier`);
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
              title="Back to Settings"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                FLAT 1204 • GOVERNANCE
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Household & Vehicles
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => {
              if (activeTab === 'members') setShowAddMemberModal(true);
              else setShowAddVehicleModal(true);
            }}
            className="h-9 px-3 rounded-2xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors press-scale"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>{activeTab === 'members' ? 'Add Member' : 'Add Vehicle'}</span>
          </button>
        </div>

        {/* Tab Switcher */}
        <div className="p-1 rounded-2xl bg-slate-100 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex gap-1">
          <button
            type="button"
            onClick={() => setActiveTab('members')}
            className={`flex-1 h-9 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'members'
                ? 'bg-white dark:bg-obsidian-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Users size={14} />
            <span>Family Members ({members.length})</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('vehicles')}
            className={`flex-1 h-9 rounded-xl font-bold text-xs flex items-center justify-center gap-2 transition-all ${
              activeTab === 'vehicles'
                ? 'bg-white dark:bg-obsidian-800 text-slate-900 dark:text-white shadow-sm'
                : 'text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <Car size={14} />
            <span>Vehicles & RFID ({vehicles.length})</span>
          </button>
        </div>

        {/* Tab 1: Family Members */}
        {activeTab === 'members' && (
          <div className="flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/40 text-xs flex items-center gap-2.5">
              <ShieldCheck size={18} className="text-cobalt-600 dark:text-cobalt-400 shrink-0" />
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                Co-residents have digital gate approval privileges and receive instant gate knock VoIP calls.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {members.map((member) => (
                <div
                  key={member.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cobalt-500 to-indigo-600 text-white font-extrabold text-sm flex items-center justify-center shadow-sm">
                      {member.avatarInitials}
                    </div>
                    <div>
                      <div className="flex items-center gap-1.5">
                        <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                          {member.name}
                        </h4>
                        <Badge
                          variant={member.role === 'Admin' ? 'cobalt' : member.role === 'Co-Resident' ? 'emerald' : 'muted'}
                          size="sm"
                        >
                          {member.role}
                        </Badge>
                      </div>
                      <p className="text-[11px] text-slate-500 font-medium">
                        {member.relation} • {member.phone}
                      </p>
                      <div className="flex items-center gap-2 mt-1">
                        {member.canApproveGuests && (
                          <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                            <KeyRound size={10} /> Gate Approvals Active
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {member.role !== 'Admin' && (
                    <button
                      type="button"
                      onClick={() => handleRemoveMember(member.id, member.name)}
                      className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-crimson-50 dark:bg-obsidian-800 dark:hover:bg-crimson-950/60 text-slate-400 hover:text-crimson-600 transition-colors flex items-center justify-center"
                      title="Remove Member"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              ))}
            </div>

            {/* Invite via WhatsApp Card */}
            <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between mt-1">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Share2 size={16} />
                </div>
                <div>
                  <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                    Invite Family via WhatsApp
                  </h4>
                  <p className="text-[11px] text-slate-600 dark:text-slate-300">
                    Instant verified digital pass link for Flat 1204
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => showToast('Invite link copied for family WhatsApp!')}
                className="h-8 px-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-1 transition-colors press-scale"
              >
                Share
              </button>
            </div>
          </div>
        )}

        {/* Tab 2: Vehicles & Fastag */}
        {activeTab === 'vehicles' && (
          <div className="flex flex-col gap-3">
            <div className="p-3 rounded-2xl bg-amber-50/70 dark:bg-amber-950/40 border border-amber-200/80 dark:border-amber-900/40 text-xs flex items-center gap-2.5">
              <Radio size={18} className="text-amber-600 dark:text-amber-400 shrink-0" />
              <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
                Bound vehicles automatically raise Gate 2 boom barrier via high-speed RFID camera scanners.
              </p>
            </div>

            <div className="flex flex-col gap-2.5">
              {vehicles.map((v) => (
                <div
                  key={v.id}
                  className="p-3.5 rounded-2xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex items-center justify-between"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 rounded-2xl bg-slate-100 dark:bg-obsidian-800 text-slate-700 dark:text-slate-200 flex items-center justify-center font-bold text-xs border border-slate-200 dark:border-obsidian-700">
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
                      <p className="text-[10px] text-slate-500 dark:text-slate-400 font-mono mt-0.5">
                        Slot: {v.parkingSlot} • {v.rfidTag}
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
          </div>
        )}
      </div>

      {/* Add Member Modal */}
      {showAddMemberModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Add Household Member
              </h3>
              <button
                type="button"
                onClick={() => setShowAddMemberModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="flex flex-col gap-3">
              <Input
                label="FULL NAME"
                placeholder="e.g. Rahul Sharma"
                value={newMemberName}
                onChange={(e) => setNewMemberName(e.target.value)}
                required
              />

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  RELATIONSHIP
                </label>
                <select
                  value={newMemberRelation}
                  onChange={(e) => setNewMemberRelation(e.target.value)}
                  className="w-full h-[52px] rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 px-3.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Child (Minor)">Child (Minor)</option>
                  <option value="Parent / Senior Resident">Parent / Senior Resident</option>
                  <option value="Sibling">Sibling</option>
                  <option value="Tenant / Flatmate">Tenant / Flatmate</option>
                </select>
              </div>

              <Input
                label="MOBILE NUMBER (WHATSAPP)"
                placeholder="e.g. 98450 12345"
                type="tel"
                value={newMemberPhone}
                onChange={(e) => setNewMemberPhone(e.target.value)}
              />

              <div className="p-3 rounded-xl bg-slate-50 dark:bg-obsidian-800 border border-slate-200 dark:border-obsidian-750 flex items-center justify-between text-xs">
                <span className="font-bold text-slate-700 dark:text-slate-200">
                  Allow Gate Approvals
                </span>
                <input
                  type="checkbox"
                  checked={newMemberCanApprove}
                  onChange={(e) => setNewMemberCanApprove(e.target.checked)}
                  className="w-4 h-4 rounded text-cobalt-600 focus:ring-cobalt-500 cursor-pointer"
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddMemberModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1">
                  Send Invite
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Vehicle Modal */}
      {showAddVehicleModal && (
        <div className="absolute inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Add Vehicle & RFID Tag
              </h3>
              <button
                type="button"
                onClick={() => setShowAddVehicleModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleAddVehicle} className="flex flex-col gap-3">
              <Input
                label="VEHICLE REGISTRATION NUMBER"
                placeholder="e.g. KA-05-MQ-3819"
                value={newPlateNumber}
                onChange={(e) => setNewPlateNumber(e.target.value)}
                required
              />

              <Input
                label="MAKE & MODEL"
                placeholder="e.g. Honda City / Ather 450X"
                value={newVehicleModel}
                onChange={(e) => setNewVehicleModel(e.target.value)}
              />

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  VEHICLE CATEGORY
                </label>
                <select
                  value={newVehicleType}
                  onChange={(e) => setNewVehicleType(e.target.value as any)}
                  className="w-full h-[52px] rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 px-3.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
                >
                  <option value="Car (4W)">Car (4W) - Four Wheeler</option>
                  <option value="Bike (2W)">Bike / Scooter (2W)</option>
                </select>
              </div>

              <Input
                label="ALLOCATED PARKING SLOT"
                placeholder="e.g. Basement 1 - #B1-142"
                value={newParkingSlot}
                onChange={(e) => setNewParkingSlot(e.target.value)}
              />

              <div className="flex items-center gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowAddVehicleModal(false)}
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
    </div>
  );
};
