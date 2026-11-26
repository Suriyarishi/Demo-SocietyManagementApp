import React, { useState } from 'react';
import { Badge, Button, Input, Select } from '../../components/UIComponents';
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
} from './VisitPass3DAssets';

export interface VisitPassRecord {
  id: string;
  direction: 'received' | 'given';
  personName: string;
  unitLabel: string;
  purpose: string;
  dateStr: string;
  timeSlot: string;
  vehicleNo?: string;
  pinCode: string;
  status: 'pending' | 'approved';
}

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
  const [viewMode, setViewMode] = useState<'list' | 'request'>('list');
  const [receivedPasses, setReceivedPasses] = useState<VisitPassRecord[]>([]);
  const [localGivenPasses, setLocalGivenPasses] = useState<VisitPassRecord[]>(givenPasses);
  const [toastMsg, setToastMsg] = useState<string>('');

  // Request Visit Pass form state
  const [hostUnit, setHostUnit] = useState<string>('Tower 3 - 802');
  const [hostName, setHostName] = useState<string>('Vikram Mehta');
  const [visitorName, setVisitorName] = useState<string>('Suriya K');
  const [purpose, setPurpose] = useState<string>('Personal Guest');
  const [visitDate, setVisitDate] = useState<string>('Today');
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
      id: `vp_${Date.now()}`,
      direction: 'received',
      personName: hostName.trim() || 'Resident Host',
      unitLabel: hostUnit.trim(),
      purpose,
      dateStr: visitDate,
      timeSlot,
      vehicleNo: vehicleNo.trim() || undefined,
      pinCode: String(Math.floor(100000 + Math.random() * 900000)),
      status: 'pending',
    };

    setReceivedPasses((prev) => [newPass, ...prev]);
    setViewMode('list');
    setActiveTab('received');
    showToast(`✓ Visit pass request sent to ${hostUnit}`);
  };

  const handleSimulateHostApprove = (passId: string) => {
    setReceivedPasses((prev) =>
      prev.map((p) => (p.id === passId ? { ...p, status: 'approved' } : p))
    );
    showToast('✓ Host approved! Encrypted Gate QR & PIN active');
  };

  const handleRevokePass = (passId: string, dir: 'received' | 'given') => {
    if (dir === 'received') {
      setReceivedPasses((prev) => prev.filter((p) => p.id !== passId));
      showToast('Visit pass request cancelled');
    } else {
      setLocalGivenPasses((prev) => prev.filter((p) => p.id !== passId));
      showToast('Pre-approved pass revoked');
    }
  };

  const allGivenPasses = [...givenPasses, ...localGivenPasses.filter((g) => !givenPasses.some((x) => x.id === g.id))];

  // Dedicated "Request Visit Pass" Form Page (No Modal Popups)
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
              {['Today', 'Tomorrow', 'This Weekend'].map((d) => {
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
                    {d}
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
            onClick={() => setActiveTab('received')}
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
            onClick={() => setActiveTab('given')}
            className={`py-3 px-2 text-xs font-extrabold transition-colors relative cursor-pointer flex items-center justify-center gap-1.5 ${
              activeTab === 'given'
                ? 'text-primary-600 dark:text-primary-400'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
            }`}
          >
            <span>Gate Pass Given</span>
            {allGivenPasses.length > 0 && (
              <span className="px-1.5 py-0.5 rounded-md bg-primary-50 dark:bg-primary-950/60 text-primary-700 dark:text-primary-300 text-[10px] font-mono">
                {allGivenPasses.length}
              </span>
            )}
            {activeTab === 'given' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary-600 dark:bg-primary-500 rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Tab Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar p-4 flex flex-col">
        {activeTab === 'received' ? (
          receivedPasses.length === 0 ? (
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
                <Button
                  type="button"
                  variant="primary"
                  size="md"
                  onClick={() => setViewMode('request')}
                >
                  Request Visit Pass
                </Button>
              </div>
            </div>
          ) : (
            /* Active Received / Requested Passes List */
            <div className="flex flex-col gap-3 pb-4">
              {receivedPasses.map((pass) => (
                <div
                  key={pass.id}
                  className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <QrPass3D size={38} />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                          {pass.unitLabel}
                        </h3>
                        <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate">
                          Host: {pass.personName} • {pass.purpose}
                        </span>
                      </div>
                    </div>

                    <Badge
                      variant={pass.status === 'approved' ? 'emerald' : 'amber'}
                      size="sm"
                    >
                      {pass.status === 'approved' ? 'Approved' : 'Pending'}
                    </Badge>
                  </div>

                  <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-xs">
                    <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
                      <CalendarClock3D size={16} />
                      <span>
                        {pass.dateStr} • {pass.timeSlot}
                      </span>
                    </div>
                  </div>

                  {pass.status === 'approved' && (
                    <div className="p-3 rounded-2xl bg-primary-50/80 dark:bg-primary-950/35 border border-primary-200 dark:border-primary-800/40 flex items-center justify-between">
                      <span className="text-[11px] font-bold text-primary-800 dark:text-primary-300">
                        Gate Pass Entry PIN
                      </span>
                      <span className="text-sm font-mono font-black tracking-widest text-primary-700 dark:text-primary-300">
                        {pass.pinCode}
                      </span>
                    </div>
                  )}

                  <div className="flex items-center gap-2 pt-1">
                    {pass.status === 'pending' && (
                      <Button
                        type="button"
                        variant="primary"
                        size="sm"
                        onClick={() => handleSimulateHostApprove(pass.id)}
                        className="flex-1"
                      >
                        Simulate Host Approve
                      </Button>
                    )}
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleRevokePass(pass.id, 'received')}
                      className="flex-1"
                    >
                      {pass.status === 'approved' ? 'Remove Pass' : 'Cancel Request'}
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : allGivenPasses.length === 0 ? (
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
              <Button
                type="button"
                variant="primary"
                size="md"
                onClick={onPreApproveGuest}
              >
                Pre Approve
              </Button>
            </div>
          </div>
        ) : (
          /* Active Given Passes List */
          <div className="flex flex-col gap-3 pb-4">
            {allGivenPasses.map((pass) => (
              <div
                key={pass.id}
                className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-2">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <QrPass3D size={38} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                        {pass.personName}
                      </h3>
                      <span className="text-[11px] font-medium text-slate-500 dark:text-slate-400 block truncate">
                        {pass.purpose} • {pass.dateStr}
                      </span>
                    </div>
                  </div>

                  <Badge variant="emerald" size="sm">
                    Active PIN
                  </Badge>
                </div>

                <div className="p-3 rounded-2xl bg-primary-50/80 dark:bg-primary-950/35 border border-primary-200 dark:border-primary-800/40 flex items-center justify-between">
                  <span className="text-[11px] font-bold text-primary-800 dark:text-primary-300">
                    Visitor Entry PIN
                  </span>
                  <span className="text-sm font-mono font-black tracking-widest text-primary-700 dark:text-primary-300">
                    {pass.pinCode}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Action Bar when list is populated */}
      {((activeTab === 'received' && receivedPasses.length > 0) ||
        (activeTab === 'given' && allGivenPasses.length > 0)) && (
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
