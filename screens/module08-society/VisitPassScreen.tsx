import React, { useState, useEffect, useMemo } from 'react';
import { Badge, Button, Input, Select } from '../../components/UIComponents';
import {
  VisitPassRecord,
  SAMPLE_RECEIVED_PASSES,
  SAMPLE_GIVEN_PASSES,
} from './visitPassData';
import {
  VisitPassReceivedIllustration3D,
  VisitPassGivenIllustration3D,
  VisitPassTicket3D,
  QrPass3D,
  HostFlat3D,
  CalendarClock3D,
  GuestBadge3D,
  VehicleBadge3D,
  CheckOrb3D,
  BackArrow3D,
  CopyPin3D,
  SharePass3D,
  ShieldGate3D,
  QrMatrixVector,
} from './VisitPass3DAssets';

export type { VisitPassRecord };

interface VisitPassScreenProps {
  onBack: () => void;
  onPreApproveGuest: () => void;
  givenPasses?: VisitPassRecord[];
}

export const VisitPassScreen: React.FC<VisitPassScreenProps> = ({
  onBack,
  onPreApproveGuest,
  givenPasses = [],
}) => {
  const [activeTab, setActiveTab] = useState<'received' | 'given'>('received');
  const [statusFilter, setStatusFilter] = useState<'all' | 'approved' | 'pending'>('all');
  const [viewMode, setViewMode] = useState<'list' | 'request' | 'ticket'>('list');
  const [selectedTicket, setSelectedTicket] = useState<VisitPassRecord | null>(null);

  const [receivedPasses, setReceivedPasses] = useState<VisitPassRecord[]>(SAMPLE_RECEIVED_PASSES);
  const [localGivenPasses, setLocalGivenPasses] = useState<VisitPassRecord[]>(SAMPLE_GIVEN_PASSES);
  const [toastMsg, setToastMsg] = useState<string>('');

  // Sync any newly pre-approved passes from App state into Gate Pass Given
  useEffect(() => {
    if (givenPasses.length > 0) {
      setLocalGivenPasses((prev) => {
        const existingIds = new Set(prev.map((p) => p.id));
        const incoming = givenPasses.filter((g) => !existingIds.has(g.id));
        return incoming.length > 0 ? [...incoming, ...prev] : prev;
      });
    }
  }, [givenPasses]);

  // Request Visit Pass form state
  const [hostUnit, setHostUnit] = useState<string>('Tower 3 - 802');
  const [hostName, setHostName] = useState<string>('Vikram Mehta');
  const [visitorName, setVisitorName] = useState<string>('Suriya K');
  const [purpose, setPurpose] = useState<string>('Personal Guest');
  const [visitDate, setVisitDate] = useState<string>('Today, 26 Nov 2026');
  const [timeSlot, setTimeSlot] = useState<string>('Afternoon (12 PM – 5 PM)');
  const [vehicleNo, setVehicleNo] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2600);
  };

  const handleRequestSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostUnit.trim() || !visitorName.trim()) {
      showToast('Please enter host flat and your name');
      return;
    }

    const newPass: VisitPassRecord = {
      id: `vpr_${Date.now()}`,
      direction: 'received',
      personName: hostName.trim() || 'Resident Host',
      unitLabel: `${hostUnit.trim()} • Prestige Lakeside`,
      purpose,
      dateStr: visitDate,
      timeSlot,
      vehicleNo: vehicleNo.trim() || undefined,
      gateName: 'Gate 1 (Main Security Kiosk)',
      pinCode: String(Math.floor(100000 + Math.random() * 900000)),
      status: 'pending',
    };

    setReceivedPasses((prev) => [newPass, ...prev]);
    setViewMode('list');
    setActiveTab('received');
    setStatusFilter('all');
    showToast(`✓ Visit pass request sent to ${hostUnit}`);
  };

  const handleApprovePass = (passId: string, dir: 'received' | 'given') => {
    if (dir === 'received') {
      setReceivedPasses((prev) =>
        prev.map((p) => (p.id === passId ? { ...p, status: 'approved' } : p))
      );
      showToast('✓ Host approved! Encrypted Gate QR & PIN active');
    } else {
      setLocalGivenPasses((prev) =>
        prev.map((p) => (p.id === passId ? { ...p, status: 'approved' } : p))
      );
      showToast('✓ Guest approved! 6-digit pass PIN dispatched');
    }
  };

  const handleRevokePass = (passId: string, dir: 'received' | 'given') => {
    if (dir === 'received') {
      setReceivedPasses((prev) => prev.filter((p) => p.id !== passId));
      showToast('Visit pass removed');
    } else {
      setLocalGivenPasses((prev) => prev.filter((p) => p.id !== passId));
      showToast('Guest pass removed');
    }
  };

  const handleCopyPin = (pin: string, e?: React.MouseEvent) => {
    e?.stopPropagation();
    navigator.clipboard?.writeText(pin).catch(() => {});
    showToast(`✓ Entry PIN ${pin} copied to clipboard`);
  };

  const handleSharePass = (pass: VisitPassRecord, e?: React.MouseEvent) => {
    e?.stopPropagation();
    const text = `Hunt Lockdoor Visit Pass\n${pass.personName} (${pass.unitLabel})\nDate: ${pass.dateStr} • ${pass.timeSlot}\nEntry PIN: ${pass.pinCode}`;
    if (navigator.share) {
      navigator.share({ title: 'Hunt Lockdoor Gate Pass', text }).catch(() => {
        showToast('✓ Gate pass details copied');
      });
    } else {
      navigator.clipboard?.writeText(text).catch(() => {});
      showToast('✓ Gate pass details copied to share');
    }
  };

  const currentTabList = activeTab === 'received' ? receivedPasses : localGivenPasses;

  const filteredList = useMemo(() => {
    if (statusFilter === 'all') return currentTabList;
    return currentTabList.filter((p) => p.status === statusFilter);
  }, [currentTabList, statusFilter]);

  const approvedCount = currentTabList.filter((p) => p.status === 'approved').length;
  const pendingCount = currentTabList.filter((p) => p.status === 'pending').length;

  // ========================================================
  // VIEW 1: DEDICATED DIGITAL QR TICKET VIEW (NO MODAL POPUP)
  // ========================================================
  if (viewMode === 'ticket' && selectedTicket) {
    return (
      <div className="w-full h-full min-h-0 flex-1 flex flex-col justify-between bg-slate-50 dark:bg-obsidian-950 text-left animate-in fade-in duration-200 overflow-hidden relative select-none">
        {toastMsg && (
          <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 dark:bg-obsidian-850 text-white border border-slate-700/80 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
            <CheckOrb3D size={18} />
            <span className="flex-1 text-[11.5px] leading-tight">{toastMsg}</span>
          </div>
        )}

        {/* Header */}
        <div className="shrink-0 z-20 px-4 py-3 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-obsidian-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => {
                setViewMode('list');
                setSelectedTicket(null);
              }}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center transition-colors border border-slate-200/90 dark:border-obsidian-700 press-scale shrink-0"
              title="Back to Gate Passes"
              aria-label="Back to Gate Passes"
            >
              <BackArrow3D size={18} />
            </button>
            <div>
              <span className="text-[10px] font-black tracking-widest text-primary-600 uppercase block">
                DIGITAL GATE PASS
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                QR & Entry Pass
              </h2>
            </div>
          </div>

          <VisitPassTicket3D size={30} />
        </div>

        {/* Ticket Body */}
        <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar p-4 flex flex-col gap-4">
          <div className="rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-elevated overflow-hidden ticket-perforated">
            {/* Top Emerald Ticket Banner */}
            <div className="p-4 bg-gradient-to-br from-primary-600 to-emerald-700 text-white flex items-center justify-between">
              <div className="min-w-0 flex-1 pr-2">
                <span className="text-[10px] font-mono uppercase tracking-widest text-emerald-100 block">
                  {selectedTicket.direction === 'received' ? 'INVITE RECEIVED' : 'PRE-APPROVED PASS'}
                </span>
                <h3 className="text-base font-black truncate mt-0.5">
                  {selectedTicket.personName}
                </h3>
                <span className="text-[11px] font-semibold text-emerald-50 block truncate">
                  {selectedTicket.unitLabel}
                </span>
              </div>
              <ShieldGate3D size={34} />
            </div>

            {/* QR Code & 6-Digit PIN */}
            <div className="p-5 flex flex-col items-center gap-3 border-b border-dashed border-slate-200 dark:border-obsidian-750">
              <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200/80 dark:border-obsidian-750 shadow-inner">
                <QrMatrixVector seed={selectedTicket.pinCode} size={140} />
              </div>

              <div className="text-center">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-400 block">
                  6-DIGIT KIOSK ENTRY PIN
                </span>
                <span className="text-2xl font-mono font-black tracking-[0.25em] text-slate-900 dark:text-white mt-0.5 block">
                  {selectedTicket.pinCode}
                </span>
              </div>
            </div>

            {/* Pass Details Metadata */}
            <div className="p-4 flex flex-col gap-2.5 text-xs">
              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <CalendarClock3D size={16} />
                  <span>Schedule</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-right">
                  {selectedTicket.dateStr}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500 dark:text-slate-400 pl-6">Time Window</span>
                <span className="font-semibold text-slate-700 dark:text-slate-200 text-right">
                  {selectedTicket.timeSlot}
                </span>
              </div>

              <div className="flex items-center justify-between gap-2">
                <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                  <HostFlat3D size={16} />
                  <span>Checkpoint</span>
                </span>
                <span className="font-bold text-slate-900 dark:text-white text-right">
                  {selectedTicket.gateName || 'Gate 1 (Main Kiosk)'}
                </span>
              </div>

              {selectedTicket.vehicleNo && (
                <div className="flex items-center justify-between gap-2">
                  <span className="text-slate-500 dark:text-slate-400 flex items-center gap-1.5">
                    <VehicleBadge3D size={16} />
                    <span>Vehicle</span>
                  </span>
                  <span className="font-mono font-bold text-slate-900 dark:text-white">
                    {selectedTicket.vehicleNo}
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Sticky Ticket Bottom Actions */}
        <div className="shrink-0 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-obsidian-800 p-3.5 flex items-center gap-2.5 shadow-elevated">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => handleCopyPin(selectedTicket.pinCode)}
            className="flex-1"
          >
            <CopyPin3D size={16} />
            <span>Copy PIN</span>
          </Button>
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() => handleSharePass(selectedTicket)}
            className="flex-1"
          >
            <SharePass3D size={16} />
            <span>Share Pass</span>
          </Button>
        </div>
      </div>
    );
  }

  // ========================================================
  // VIEW 2: DEDICATED "REQUEST VISIT PASS" FORM PAGE
  // ========================================================
  if (viewMode === 'request') {
    return (
      <div className="w-full h-full min-h-0 flex-1 flex flex-col justify-between bg-slate-50 dark:bg-obsidian-950 text-left animate-in fade-in duration-200 overflow-hidden relative select-none">
        {toastMsg && (
          <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 dark:bg-obsidian-850 text-white border border-slate-700/80 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
            <CheckOrb3D size={18} />
            <span className="flex-1 text-[11.5px] leading-tight">{toastMsg}</span>
          </div>
        )}

        {/* Top Bar */}
        <div className="shrink-0 z-20 px-4 py-3 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-obsidian-800 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('list')}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center transition-colors border border-slate-200/90 dark:border-obsidian-700 press-scale shrink-0"
              title="Back to Gate Passes"
              aria-label="Back to Gate Passes"
            >
              <BackArrow3D size={18} />
            </button>
            <div>
              <span className="text-[10px] font-black tracking-widest text-primary-600 uppercase block">
                PRE-APPROVAL REQUEST
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Request Visit Pass
              </h2>
            </div>
          </div>

          <VisitPassTicket3D size={30} />
        </div>

        {/* Request Form Body */}
        <form
          id="request-visit-pass-form"
          onSubmit={handleRequestSubmit}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar p-4 flex flex-col gap-4 pb-6"
        >
          {/* Host Details Card */}
          <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3.5">
            <span className="text-[10px] font-black tracking-wider uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <HostFlat3D size={16} />
              <span>HOST DESTINATION</span>
            </span>

            <Input
              label="Host Flat / Tower *"
              placeholder="e.g., Tower 3 - 802"
              value={hostUnit}
              onChange={(e) => setHostUnit(e.target.value)}
              required
            />

            <Input
              label="Host Resident Name"
              placeholder="e.g., Vikram Mehta"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
            />
          </div>

          {/* Visitor & Purpose Card */}
          <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3.5">
            <span className="text-[10px] font-black tracking-wider uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <GuestBadge3D size={16} />
              <span>VISITOR DETAILS</span>
            </span>

            <Input
              label="Your Full Name *"
              placeholder="Enter visitor name"
              value={visitorName}
              onChange={(e) => setVisitorName(e.target.value)}
              required
            />

            <div className="flex flex-col gap-1.5">
              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
                Purpose of Visit
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {['Personal Guest', 'Family Visit', 'Marketplace Pickup', 'Service'].map((p) => {
                  const active = purpose === p;
                  return (
                    <button
                      key={p}
                      type="button"
                      onClick={() => setPurpose(p)}
                      className={`h-9 px-3.5 rounded-full text-xs font-bold border transition-all press-scale cursor-pointer ${
                        active
                          ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500 ring-1 ring-primary-500/20'
                          : 'bg-white dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750 hover:bg-slate-50 dark:hover:bg-obsidian-800'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Schedule & Vehicle Card */}
          <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3.5">
            <span className="text-[10px] font-black tracking-wider uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
              <CalendarClock3D size={16} />
              <span>ARRIVAL SCHEDULE</span>
            </span>

            <div className="flex items-center gap-2">
              {['Today, 26 Nov 2026', 'Tomorrow, 27 Nov 2026', 'Sat, 28 Nov 2026'].map((d) => {
                const shortLabel = d.split(',')[0];
                const active = visitDate === d;
                return (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setVisitDate(d)}
                    className={`flex-1 h-10 rounded-2xl text-xs font-bold border transition-all press-scale cursor-pointer ${
                      active
                        ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750'
                    }`}
                  >
                    {shortLabel}
                  </button>
                );
              })}
            </div>

            <Select
              label="Expected Time Slot"
              value={timeSlot}
              onChange={(e) => setTimeSlot(e.target.value)}
            >
              <option value="Morning (8 AM – 12 PM)">Morning (8 AM – 12 PM)</option>
              <option value="Afternoon (12 PM – 5 PM)">Afternoon (12 PM – 5 PM)</option>
              <option value="Evening (5 PM – 10 PM)">Evening (5 PM – 10 PM)</option>
              <option value="All Day">All Day</option>
            </Select>

            <Input
              label="Vehicle Number (Optional)"
              placeholder="e.g., KA-05-MQ-3819"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
              prefixElement={<VehicleBadge3D size={18} />}
            />
          </div>
        </form>

        {/* Bottom Action Dock */}
        <div className="shrink-0 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-obsidian-800 p-3.5 flex items-center gap-2.5 shadow-elevated">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setViewMode('list')}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            type="submit"
            form="request-visit-pass-form"
            variant="primary"
            size="md"
            className="flex-1"
          >
            Send Request
          </Button>
        </div>
      </div>
    );
  }

  // ========================================================
  // VIEW 3: MAIN GATE PASSES HUB (RECEIVED / GIVEN)
  // ========================================================
  return (
    <div className="w-full h-full min-h-0 flex-1 flex flex-col justify-between bg-slate-50 dark:bg-obsidian-950 text-left animate-in fade-in duration-200 overflow-hidden relative select-none">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 dark:bg-obsidian-850 text-white border border-slate-700/80 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <CheckOrb3D size={18} />
          <span className="flex-1 text-[11.5px] leading-tight">{toastMsg}</span>
        </div>
      )}

      {/* Top Header + 2-Tab Segmented Navigation */}
      <div className="shrink-0 z-20 bg-white dark:bg-obsidian-900 border-b border-slate-200/80 dark:border-obsidian-800 shadow-2xs">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-full bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center transition-colors border border-slate-200/80 dark:border-obsidian-700 press-scale shrink-0"
              title="Back to Society Hub"
              aria-label="Back to Society Hub"
            >
              <BackArrow3D size={18} />
            </button>
            <div>
              <span className="text-[10px] font-black tracking-widest text-primary-600 uppercase block">
                SOCIETY ACCESS
              </span>
              <h1 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Gate Passes
              </h1>
            </div>
          </div>

          <VisitPassTicket3D size={30} />
        </div>

        {/* 2-Tab Underline Navigation: Gate Pass Received | Gate Pass Given */}
        <div className="grid grid-cols-2 w-full border-t border-slate-100 dark:border-obsidian-800">
          <button
            type="button"
            onClick={() => {
              setActiveTab('received');
              setStatusFilter('all');
            }}
            className={`py-3 px-2 text-xs font-extrabold transition-colors relative cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'received'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Gate Pass Received</span>
            {receivedPasses.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-[10px] font-mono">
                {receivedPasses.length}
              </span>
            )}
            {activeTab === 'received' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary-600 dark:bg-primary-500 rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => {
              setActiveTab('given');
              setStatusFilter('all');
            }}
            className={`py-3 px-2 text-xs font-extrabold transition-colors relative cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'given'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Gate Pass Given</span>
            {localGivenPasses.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-[10px] font-mono">
                {localGivenPasses.length}
              </span>
            )}
            {activeTab === 'given' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary-600 dark:bg-primary-500 rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar p-4 flex flex-col gap-3">
        {currentTabList.length === 0 ? (
          activeTab === 'received' ? (
            /* Empty State 1: Gate Pass Received */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 gap-5 animate-in fade-in duration-200">
              <VisitPassReceivedIllustration3D />
              <div className="max-w-[260px] flex flex-col gap-1.5">
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  Don&apos;t wait for approval
                </h2>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  Ask pre-approval and receive invite pass to make your visit hassle free
                </p>
              </div>
              <div className="w-full max-w-[230px] pt-1">
                <Button type="button" variant="primary" size="md" onClick={() => setViewMode('request')}>
                  Request Visit Pass
                </Button>
              </div>
            </div>
          ) : (
            /* Empty State 2: Gate Pass Given */
            <div className="flex-1 flex flex-col items-center justify-center text-center px-4 py-8 gap-5 animate-in fade-in duration-200">
              <VisitPassGivenIllustration3D />
              <div className="max-w-[270px] flex flex-col gap-1.5">
                <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
                  No Approval Requests
                </h2>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400 leading-relaxed">
                  When your guest ask for visit pass, their requests will appear here for your approval
                </p>
              </div>
              <div className="w-full max-w-[210px] pt-1">
                <Button type="button" variant="primary" size="md" onClick={onPreApproveGuest}>
                  Pre Approve
                </Button>
              </div>
            </div>
          )
        ) : (
          <>
            {/* Status Filter Chips */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5 shrink-0">
              {[
                { id: 'all', label: 'All Passes', count: currentTabList.length },
                { id: 'approved', label: 'Active PIN', count: approvedCount },
                { id: 'pending', label: 'Pending', count: pendingCount },
              ].map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={() => setStatusFilter(pill.id as 'all' | 'approved' | 'pending')}
                  className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all press-scale flex items-center gap-1.5 cursor-pointer ${
                    statusFilter === pill.id
                      ? 'bg-primary-600 text-white shadow-xs'
                      : 'bg-white dark:bg-obsidian-900 border border-slate-200/80 dark:border-obsidian-800 text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-obsidian-850'
                  }`}
                >
                  <span>{pill.label}</span>
                  <span
                    className={`text-[10px] font-mono px-1.5 rounded-md ${
                      statusFilter === pill.id
                        ? 'bg-white/25 text-white'
                        : 'bg-slate-100 dark:bg-obsidian-800 text-slate-500'
                    }`}
                  >
                    {pill.count}
                  </span>
                </button>
              ))}
            </div>

            {/* Pass Cards Stream */}
            <div className="flex flex-col gap-3 pb-4">
              {filteredList.map((pass) => {
                const isApproved = pass.status === 'approved';
                const primaryHeading =
                  pass.direction === 'received' ? pass.unitLabel : pass.personName;
                const secondarySubtitle =
                  pass.direction === 'received'
                    ? `Host: ${pass.personName} • ${pass.purpose}`
                    : `${pass.purpose}${pass.phone ? ` • ${pass.phone}` : ''}`;

                return (
                  <div
                    key={pass.id}
                    onClick={() => {
                      if (isApproved) {
                        setSelectedTicket(pass);
                        setViewMode('ticket');
                      }
                    }}
                    className={`p-4 rounded-3xl bg-white dark:bg-obsidian-900 border transition-all shadow-ambient flex flex-col gap-3 ${
                      isApproved
                        ? 'border-slate-200/90 dark:border-obsidian-800 hover:border-primary-400 cursor-pointer press-scale'
                        : 'border-amber-200/90 dark:border-amber-900/40'
                    }`}
                  >
                    {/* Top Row: 3D Icon + Title + Status Badge */}
                    <div className="flex items-start justify-between gap-2.5">
                      <div className="flex items-center gap-3 min-w-0 flex-1">
                        {isApproved ? <QrPass3D size={40} /> : <GuestBadge3D size={38} />}
                        <div className="min-w-0 flex-1">
                          <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate leading-snug">
                            {primaryHeading}
                          </h3>
                          <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate mt-0.5">
                            {secondarySubtitle}
                          </span>
                        </div>
                      </div>

                      <div className="shrink-0">
                        <Badge variant={isApproved ? 'emerald' : 'amber'} size="sm">
                          {isApproved ? 'Approved' : 'Pending'}
                        </Badge>
                      </div>
                    </div>

                    {/* Date, Time Slot & Optional Vehicle/Gate Metadata */}
                    <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 flex flex-col gap-2 text-[11px]">
                      <div className="flex items-center justify-between gap-2 flex-wrap">
                        <span className="flex items-center gap-1.5 font-bold text-slate-700 dark:text-slate-200">
                          <CalendarClock3D size={16} />
                          <span>{pass.dateStr}</span>
                        </span>
                        <span className="font-mono text-[10.5px] font-semibold text-slate-500 dark:text-slate-400">
                          {pass.timeSlot}
                        </span>
                      </div>

                      {(pass.vehicleNo || pass.gateName) && (
                        <div className="flex items-center justify-between gap-2 pt-1.5 border-t border-slate-200/70 dark:border-obsidian-800 text-[10.5px] text-slate-500 dark:text-slate-400">
                          <span className="flex items-center gap-1.5 truncate">
                            <HostFlat3D size={14} />
                            <span className="truncate">{pass.gateName || pass.unitLabel}</span>
                          </span>
                          {pass.vehicleNo && (
                            <span className="flex items-center gap-1 font-mono font-bold text-slate-700 dark:text-slate-300 shrink-0">
                              <VehicleBadge3D size={14} />
                              <span>{pass.vehicleNo}</span>
                            </span>
                          )}
                        </div>
                      )}
                    </div>

                    {/* Approved Pass PIN Strip + Quick 3D Action Buttons */}
                    {isApproved ? (
                      <div className="p-3 rounded-2xl bg-primary-50/85 dark:bg-primary-950/35 border border-primary-200/90 dark:border-primary-800/40 flex items-center justify-between gap-2">
                        <div className="min-w-0">
                          <span className="text-[10px] font-bold text-primary-800 dark:text-primary-300 uppercase tracking-wider block">
                            Gate Entry PIN • Tap card for QR
                          </span>
                          <span className="text-base font-mono font-black tracking-widest text-primary-700 dark:text-primary-300">
                            {pass.pinCode}
                          </span>
                        </div>

                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={(e) => handleCopyPin(pass.pinCode, e)}
                            className="w-9 h-9 rounded-xl bg-white dark:bg-obsidian-900 border border-primary-200 dark:border-obsidian-700 flex items-center justify-center press-scale cursor-pointer shadow-2xs"
                            title="Copy PIN"
                            aria-label="Copy PIN"
                          >
                            <CopyPin3D size={17} />
                          </button>
                          <button
                            type="button"
                            onClick={(e) => handleSharePass(pass, e)}
                            className="w-9 h-9 rounded-xl bg-white dark:bg-obsidian-900 border border-primary-200 dark:border-obsidian-700 flex items-center justify-center press-scale cursor-pointer shadow-2xs"
                            title="Share Pass"
                            aria-label="Share Pass"
                          >
                            <SharePass3D size={17} />
                          </button>
                        </div>
                      </div>
                    ) : (
                      /* Pending Approval Actions */
                      <div
                        className="flex items-center gap-2 pt-0.5"
                        onClick={(e) => e.stopPropagation()}
                      >
                        <Button
                          type="button"
                          variant="primary"
                          size="sm"
                          onClick={() => handleApprovePass(pass.id, pass.direction)}
                          className="flex-1"
                        >
                          {pass.direction === 'given'
                            ? 'Approve & Issue PIN'
                            : 'Simulate Host Approve'}
                        </Button>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          onClick={() => handleRevokePass(pass.id, pass.direction)}
                          className="flex-1"
                        >
                          {pass.direction === 'given' ? 'Decline' : 'Cancel'}
                        </Button>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </>
        )}
      </div>

      {/* Bottom Sticky Action Bar when list is populated */}
      {currentTabList.length > 0 && (
        <div className="shrink-0 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-obsidian-800 p-3.5 shadow-elevated">
          <Button
            type="button"
            variant="primary"
            size="md"
            onClick={() =>
              activeTab === 'received' ? setViewMode('request') : onPreApproveGuest()
            }
          >
            {activeTab === 'received' ? 'Request Visit Pass' : 'Pre Approve'}
          </Button>
        </div>
      )}
    </div>
  );
};
