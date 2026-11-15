import React, { useState } from 'react';
import {
  ArrowLeft,
  Users,
  UserPlus,
  ShieldCheck,
  CheckCircle2,
  Trash2,
  Share2,
  KeyRound,
  CreditCard,
  Coffee,
  X
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';

export interface GovernanceMember {
  id: string;
  name: string;
  relation: string;
  phone: string;
  role: 'Primary Admin' | 'Co-Resident' | 'Tenant' | 'Minor Dependent';
  avatarInitials: string;
  canApproveGuests: boolean;
  canPayBills: boolean;
  canBookAmenities: boolean;
  canManageStaff: boolean;
}

interface FamilyTenantGovernanceScreenProps {
  onBack: () => void;
}

export const FamilyTenantGovernanceScreen: React.FC<FamilyTenantGovernanceScreenProps> = ({ onBack }) => {
  const [members, setMembers] = useState<GovernanceMember[]>([
    {
      id: 'gov_01',
      name: 'Suriya K',
      relation: 'Self (Primary Owner)',
      phone: '+91 98765 43210',
      role: 'Primary Admin',
      avatarInitials: 'SK',
      canApproveGuests: true,
      canPayBills: true,
      canBookAmenities: true,
      canManageStaff: true,
    },
    {
      id: 'gov_02',
      name: 'Pooja Suriya',
      relation: 'Spouse',
      phone: '+91 98450 11223',
      role: 'Co-Resident',
      avatarInitials: 'PS',
      canApproveGuests: true,
      canPayBills: true,
      canBookAmenities: true,
      canManageStaff: true,
    },
    {
      id: 'gov_03',
      name: 'Aarav Suriya',
      relation: 'Child (Minor)',
      phone: 'No cellular registered',
      role: 'Minor Dependent',
      avatarInitials: 'AS',
      canApproveGuests: false,
      canPayBills: false,
      canBookAmenities: true,
      canManageStaff: false,
    },
  ]);

  const [selectedMember, setSelectedMember] = useState<GovernanceMember | null>(null);
  const [showAddModal, setShowAddModal] = useState<boolean>(false);
  const [newName, setNewName] = useState<string>('');
  const [newRelation, setNewRelation] = useState<string>('Spouse');
  const [newPhone, setNewPhone] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim()) {
      showToast('Please enter the member name');
      return;
    }

    const initials = newName
      .split(' ')
      .map((p) => p[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);

    const newMem: GovernanceMember = {
      id: `gov_${Date.now()}`,
      name: newName.trim(),
      relation: newRelation,
      phone: newPhone.trim() || 'Not specified',
      role: newRelation === 'Tenant' ? 'Tenant' : 'Co-Resident',
      avatarInitials: initials || 'FM',
      canApproveGuests: true,
      canPayBills: false,
      canBookAmenities: true,
      canManageStaff: false,
    };

    setMembers((prev) => [...prev, newMem]);
    setShowAddModal(false);
    setNewName('');
    setNewPhone('');
    showToast(`✓ Invitation link sent via WhatsApp to ${newMem.name}`);
  };

  const handleRemoveMember = (id: string, name: string) => {
    setMembers((prev) => prev.filter((m) => m.id !== id));
    showToast(`Removed access for ${name}`);
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
                FLAT 1204 ACCESS
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Family & Tenant Governance
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowAddModal(true)}
            className="h-9 px-3 rounded-2xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors press-scale"
          >
            <UserPlus size={15} strokeWidth={2.5} />
            <span>Add Member</span>
          </button>
        </div>

        {/* Info Banner */}
        <div className="p-3.5 rounded-2xl bg-blue-50/70 dark:bg-blue-950/40 border border-blue-200/80 dark:border-blue-900/40 text-xs flex items-center gap-2.5">
          <ShieldCheck size={18} className="text-cobalt-600 dark:text-cobalt-400 shrink-0" />
          <p className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
            Assign granular security privileges. Only authorized members can clear gate knocks or access society financial ledgers.
          </p>
        </div>

        {/* Member Cards */}
        <div className="flex flex-col gap-2.5">
          {members.map((member) => (
            <div
              key={member.id}
              className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-3"
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-11 h-11 rounded-2xl bg-gradient-to-br from-cobalt-600 to-indigo-700 text-white font-black text-sm flex items-center justify-center shadow-sm">
                    {member.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-extrabold text-xs text-slate-900 dark:text-white">
                        {member.name}
                      </h4>
                      <Badge
                        variant={member.role === 'Primary Admin' ? 'cobalt' : member.role === 'Co-Resident' ? 'emerald' : 'muted'}
                        size="sm"
                      >
                        {member.role}
                      </Badge>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {member.relation} • {member.phone}
                    </p>
                  </div>
                </div>

                {member.role !== 'Primary Admin' && (
                  <button
                    type="button"
                    onClick={() => handleRemoveMember(member.id, member.name)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-crimson-50 dark:bg-obsidian-800 dark:hover:bg-crimson-950/60 text-slate-400 hover:text-crimson-600 transition-colors flex items-center justify-center"
                    title="Remove Access"
                  >
                    <Trash2 size={14} />
                  </button>
                )}
              </div>

              {/* Permission Badges Grid */}
              <div className="grid grid-cols-2 gap-1.5 text-[10px] font-semibold border-t border-slate-100 dark:border-obsidian-800 pt-2.5">
                <span className={`flex items-center gap-1.5 ${member.canApproveGuests ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                  <KeyRound size={12} /> {member.canApproveGuests ? 'Gate Approvals' : 'No Gate Pass'}
                </span>

                <span className={`flex items-center gap-1.5 ${member.canPayBills ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                  <CreditCard size={12} /> {member.canPayBills ? 'Pay Society Bills' : 'No Bill Access'}
                </span>

                <span className={`flex items-center gap-1.5 ${member.canBookAmenities ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                  <Coffee size={12} /> {member.canBookAmenities ? 'Clubhouse Pass' : 'No Bookings'}
                </span>

                <span className={`flex items-center gap-1.5 ${member.canManageStaff ? 'text-emerald-600 dark:text-emerald-400' : 'text-slate-400'}`}>
                  <Users size={12} /> {member.canManageStaff ? 'Manage Daily Staff' : 'Staff Restricted'}
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* WhatsApp Invite Card */}
        <div className="p-4 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/30 border border-emerald-200/80 dark:border-emerald-900/40 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <Share2 size={16} />
            </div>
            <div>
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Share Digital Invite Link
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Send onboarding pass to co-resident WhatsApp
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

      {/* Add Member Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Add Household Member
              </h3>
              <button
                type="button"
                onClick={() => setShowAddModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleAddMember} className="flex flex-col gap-3">
              <Input
                label="FULL NAME"
                placeholder="e.g. Ramesh K"
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                required
              />

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  ROLE / RELATIONSHIP
                </label>
                <select
                  value={newRelation}
                  onChange={(e) => setNewRelation(e.target.value)}
                  className="w-full h-[52px] rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 px-3.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
                >
                  <option value="Spouse">Spouse</option>
                  <option value="Child (Minor)">Child (Minor)</option>
                  <option value="Parent / Senior Resident">Parent / Senior Resident</option>
                  <option value="Tenant">Tenant / Flatmate</option>
                </select>
              </div>

              <Input
                label="WHATSAPP PHONE NUMBER"
                placeholder="e.g. 98450 12345"
                type="tel"
                value={newPhone}
                onChange={(e) => setNewPhone(e.target.value)}
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
                  Send Invite
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
