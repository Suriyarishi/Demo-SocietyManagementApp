import React, { useState } from 'react';
import { Button, Input, Select } from '../../../components/UIComponents';
import {
  VisitPassReceivedIllustration3D,
  VisitPassGivenIllustration3D,
  TicketPass3D,
  SendInvite3D,
  QrPassOrb3D,
  ClockPending3D,
  CheckOrb3D,
  BackArrow3D,
  HostHome3D,
  ShieldApprove3D,
} from './VisitPassVectorGraphics';

export interface VisitPassRecord {
  id: string;
  direction: 'received' | 'given';
  personName: string;
  unit: string;
  purpose: string;
  dateStr: string;
  timeSlot: string;
  vehicleNo?: string;
  status: 'pending' | 'approved';
  entryCode?: string;
}

interface VisitPassScreenProps {
  onBack: () => void;
  onPreApproveGuest: () => void;
  initialGivenPasses?: VisitPassRecord[];
}

export const VisitPassScreen: React.FC<VisitPassScreenProps> = ({
  onBack,
  onPreApproveGuest,
  initialGivenPasses = [],
}) => {
  const [activeTab, setActiveTab] = useState<'received' | 'given'>('received');
  const [viewMode, setViewMode] = useState<'tabs' | 'request_form'>('tabs');
  const [receivedPasses, setReceivedPasses] = useState<VisitPassRecord[]>([]);
  const [givenPasses, setGivenPasses] = useState<VisitPassRecord[]>(initialGivenPasses);
  const [toastMsg, setToastMsg] = useState<string>('');

  // Request Visit Pass form state
  const [hostUnit, setHostUnit] = useState<string>('Tower 3 - 802');
  const [hostName, setHostName] = useState<string>('Vikram Mehta');
  const [purpose, setPurpose] = useState<string>('Social Visit');
  const [visitDate, setVisitDate] = useState<string>('Today');
  const [timeSlot, setTimeSlot] = useState<string>('Afternoon (12 PM – 5 PM)');
  const [vehicleNo, setVehicleNo] = useState<string>('');

  React.useEffect(() => {
    setGivenPasses(initialGivenPasses);
  }, [initialGivenPasses]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2600);
  };

  const handleSubmitRequest = (e: React.FormEvent) => {
    e.preventDefault();
    if (!hostUnit.trim() || !hostName.trim()) {
      showToast('Please enter host flat number and resident name');
      return;
    }

    const newPass: VisitPassRecord = {
      id: `vp_${Date.now()}`,
      direction: 'received',
      personName: hostName.trim(),
      unit: hostUnit.trim(),
      purpose,
      dateStr: visitDate,
      timeSlot,
      vehicleNo: vehicleNo.trim() || undefined,
      status: 'pending',
    };

    setReceivedPasses((prev) => [newPass, ...prev]);
    setViewMode('tabs');
    setActiveTab('received');
    showToast(`✓ Visit pass request sent to ${hostName.trim()} (${hostUnit.trim()})`);
  };

  const handleSimulateApproval = (id: string) => {
    const pin = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
    setReceivedPasses((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved', entryCode: pin } : p))
    );
    showToast(`✓ Invite pass approved! Entry PIN: ${pin}`);
  };

  const handleApproveGiven = (id: string) => {
    const pin = `${Math.floor(100 + Math.random() * 900)} ${Math.floor(100 + Math.random() * 900)}`;
    setGivenPasses((prev) =>
      prev.map((p) => (p.id === id ? { ...p, status: 'approved', entryCode: pin } : p))
    );
    showToast(`✓ Guest visit pass approved (${pin})`);
  };

  // Dedicated Sub-View: Request Visit Pass Form
  if (viewMode === 'request_form') {
    return (
      <div className="w-full h-full min-h-0 flex-1 flex flex-col justify-between bg-slate-50 dark:bg-obsidian-950 text-left animate-in fade-in duration-200 overflow-hidden relative select-none">
        {toastMsg && (
          <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 dark:bg-obsidian-850 text-white border border-slate-700/80 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
            <CheckOrb3D size={18} />
            <span className="flex-1 text-[11.5px] leading-tight">{toastMsg}</span>
          </div>
        )}

        {/* Header */}
        <div className="shrink-0 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-b border-slate-200/80 dark:border-obsidian-800 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setViewMode('tabs')}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center border border-slate-200/90 dark:border-obsidian-800 press-scale cursor-pointer"
              title="Back to Gate Passes"
              aria-label="Back to Gate Passes"
            >
              <BackArrow3D size={18} />
            </button>
            <div>
              <span className="text-[10px] font-black tracking-widest text-primary-600 uppercase block">
                SOCIETY VISIT PASS
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight">
                Request Visit Pass
              </h2>
            </div>
          </div>

          <TicketPass3D size={30} />
        </div>

        {/* Scrollable Request Form */}
        <form
          id="request-visit-pass-form"
          onSubmit={handleSubmitRequest}
          className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar p-4 flex flex-col gap-4"
        >
          <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="vp-host-unit"
                className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1.5"
              >
                <HostHome3D size={15} />
                <span>Host Flat / Unit</span>
                <span className="text-crimson-500">*</span>
              </label>
              <Select
                id="vp-host-unit"
                value={hostUnit}
                onChange={(e) => {
                  const val = e.target.value;
                  setHostUnit(val);
                  if (val === 'Tower 3 - 802') setHostName('Vikram Mehta');
                  else if (val === 'Tower 1 - 404') setHostName('Dr. Aruna Rao');
                  else if (val === 'Tower 4 - 302') setHostName('Ananya Sharma');
                }}
              >
                <option value="Tower 3 - 802">Tower 3 - 802 (Vikram Mehta)</option>
                <option value="Tower 1 - 404">Tower 1 - 404 (Dr. Aruna Rao)</option>
                <option value="Tower 4 - 302">Tower 4 - 302 (Ananya Sharma)</option>
              </Select>
            </div>

            <Input
              label="Host Resident Name *"
              placeholder="e.g., Vikram Mehta"
              value={hostName}
              onChange={(e) => setHostName(e.target.value)}
              required
            />

            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
                Visit Purpose
              </span>
              <div className="flex items-center gap-2 flex-wrap">
                {['Social Visit', 'Family', 'Pickup / Handover', 'Event'].map((item) => {
                  const active = purpose === item;
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => setPurpose(item)}
                      className={`h-9 px-3.5 rounded-full text-xs font-bold border transition-all press-scale cursor-pointer ${
                        active
                          ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500 ring-1 ring-primary-500/20'
                          : 'bg-white dark:bg-obsidian-850 text-slate-600 dark:text-slate-300 border-slate-200 dark:border-obsidian-750'
                      }`}
                    >
                      {item}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-4">
            <div className="flex flex-col gap-2">
              <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
                Visit Date
              </span>
              <div className="grid grid-cols-3 gap-2">
                {['Today', 'Tomorrow', 'Weekend'].map((d) => (
                  <button
                    key={d}
                    type="button"
                    onClick={() => setVisitDate(d)}
                    className={`h-10 rounded-2xl text-xs font-bold border transition-all press-scale cursor-pointer ${
                      visitDate === d
                        ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                        : 'bg-slate-50 dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750'
                    }`}
                  >
                    {d}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label
                htmlFor="vp-time-slot"
                className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase"
              >
                Arrival Window
              </label>
              <Select
                id="vp-time-slot"
                value={timeSlot}
                onChange={(e) => setTimeSlot(e.target.value)}
              >
                <option value="Morning (8 AM – 12 PM)">Morning (8 AM – 12 PM)</option>
                <option value="Afternoon (12 PM – 5 PM)">Afternoon (12 PM – 5 PM)</option>
                <option value="Evening (5 PM – 10 PM)">Evening (5 PM – 10 PM)</option>
              </Select>
            </div>

            <Input
              label="Vehicle Number (Optional)"
              placeholder="e.g., KA-05-MQ-3819"
              value={vehicleNo}
              onChange={(e) => setVehicleNo(e.target.value.toUpperCase())}
            />
          </div>
        </form>

        {/* Bottom Dock */}
        <div className="shrink-0 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-obsidian-800 p-3.5 flex items-center gap-2.5 shadow-elevated">
          <Button
            type="button"
            variant="outline"
            size="md"
            onClick={() => setViewMode('tabs')}
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
            <span className="inline-flex items-center gap-2">
              <SendInvite3D size={16} />
              <span>Send Request</span>
            </span>
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

      {/* Top Navigation Header + Segmented Tabs */}
      <div className="shrink-0 z-20 bg-white dark:bg-obsidian-900 border-b border-slate-200/80 dark:border-obsidian-800 shadow-2xs">
        <div className="px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onBack}
              className="w-9 h-9 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-850 dark:hover:bg-obsidian-800 flex items-center justify-center border border-slate-200/80 dark:border-obsidian-800 press-scale cursor-pointer"
              title="Back to Society Hub"
              aria-label="Back to Society Hub"
            >
              <BackArrow3D size={18} />
            </button>
            <h1 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight">
              Gate Passes
            </h1>
          </div>

          <TicketPass3D size={30} />
        </div>

        {/* Two Equal Segmented Tabs */}
        <div className="w-full grid grid-cols-2 border-t border-slate-100 dark:border-obsidian-800">
          <button
            type="button"
            onClick={() => setActiveTab('received')}
            className={`py-3 text-xs tracking-tight transition-colors relative cursor-pointer ${
              activeTab === 'received'
                ? 'text-primary-600 dark:text-primary-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 font-semibold hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>Gate Pass Received</span>
            {activeTab === 'received' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary-600 dark:bg-primary-500 rounded-t-full" />
            )}
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('given')}
            className={`py-3 text-xs tracking-tight transition-colors relative cursor-pointer ${
              activeTab === 'given'
                ? 'text-primary-600 dark:text-primary-400 font-bold'
                : 'text-slate-600 dark:text-slate-400 font-semibold hover:text-slate-900 dark:hover:text-slate-200'
            }`}
          >
            <span>Gate Pass Given</span>
            {activeTab === 'given' && (
              <div className="absolute bottom-0 left-0 right-0 h-[2.5px] bg-primary-600 dark:bg-primary-500 rounded-t-full" />
            )}
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar flex flex-col">
        {activeTab === 'received' ? (
          receivedPasses.length === 0 ? (
            /* Empty State 1 — Matches Screenshot 1 */
            <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center animate-in fade-in duration-200">
              <VisitPassReceivedIllustration3D />

              <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mt-5">
                Don&apos;t wait for approval
              </h2>
              <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[260px] mt-1.5">
                Ask pre-approval and receive invite pass to make your visit hassle free
              </p>

              <Button
                type="button"
                variant="primary"
                size="md"
                fullWidth={false}
                onClick={() => setViewMode('request_form')}
                className="mt-6 px-8 rounded-2xl shadow-md shadow-primary-600/20"
              >
                Request Visit Pass
              </Button>
            </div>
          ) : (
            /* Active Received / Requested Passes Stream */
            <div className="p-4 flex flex-col gap-3 pb-10">
              <div className="flex items-center justify-between">
                <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-400">
                  {receivedPasses.length} Pass{receivedPasses.length > 1 ? 'es' : ''}
                </span>
                <button
                  type="button"
                  onClick={() => setViewMode('request_form')}
                  className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
                >
                  + Request Another
                </button>
              </div>

              {receivedPasses.map((pass) => (
                <div
                  key={pass.id}
                  className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3"
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-center gap-3 min-w-0 flex-1">
                      <QrPassOrb3D size={40} />
                      <div className="min-w-0 flex-1">
                        <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                          {pass.personName}
                        </h3>
                        <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block truncate">
                          {pass.unit} • {pass.purpose}
                        </span>
                      </div>
                    </div>

                    <div className="shrink-0">
                      {pass.status === 'approved' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-[10px] font-black uppercase">
                          <ShieldApprove3D size={14} />
                          <span>Approved</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-amber-50 dark:bg-amber-950/40 text-amber-700 dark:text-amber-300 text-[10px] font-black uppercase">
                          <ClockPending3D size={14} />
                          <span>Pending</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-[11px]">
                    <span className="font-semibold text-slate-600 dark:text-slate-300">
                      {pass.dateStr} • {pass.timeSlot}
                    </span>
                    {pass.entryCode && (
                      <span className="font-mono font-black text-primary-600 dark:text-primary-400">
                        PIN: {pass.entryCode}
                      </span>
                    )}
                  </div>

                  {pass.status === 'pending' && (
                    <Button
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => handleSimulateApproval(pass.id)}
                    >
                      Simulate Host Approval
                    </Button>
                  )}
                </div>
              ))}
            </div>
          )
        ) : givenPasses.length === 0 ? (
          /* Empty State 2 — Matches Screenshot 2 */
          <div className="flex-1 flex flex-col items-center justify-center px-6 py-8 text-center animate-in fade-in duration-200">
            <VisitPassGivenIllustration3D />

            <h2 className="text-lg font-extrabold text-slate-900 dark:text-white tracking-tight mt-5">
              No Approval Requests
            </h2>
            <p className="text-xs text-slate-500 dark:text-slate-400 font-medium leading-relaxed max-w-[270px] mt-1.5">
              When your guest ask for visit pass, their requests will appear here for your approval
            </p>

            <Button
              type="button"
              variant="primary"
              size="md"
              fullWidth={false}
              onClick={onPreApproveGuest}
              className="mt-6 px-10 rounded-2xl shadow-md shadow-primary-600/20"
            >
              Pre Approve
            </Button>
          </div>
        ) : (
          /* Active Given Passes Stream */
          <div className="p-4 flex flex-col gap-3 pb-10">
            <div className="flex items-center justify-between">
              <span className="text-[10.5px] font-black uppercase tracking-wider text-slate-400">
                {givenPasses.length} Pre-Approved Pass{givenPasses.length > 1 ? 'es' : ''}
              </span>
              <button
                type="button"
                onClick={onPreApproveGuest}
                className="text-xs font-bold text-primary-600 dark:text-primary-400 hover:underline cursor-pointer"
              >
                + Pre Approve
              </button>
            </div>

            {givenPasses.map((pass) => (
              <div
                key={pass.id}
                className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3"
              >
                <div className="flex items-start justify-between gap-3">
                  <div className="flex items-center gap-3 min-w-0 flex-1">
                    <QrPassOrb3D size={40} />
                    <div className="min-w-0 flex-1">
                      <h3 className="text-sm font-extrabold text-slate-900 dark:text-white truncate">
                        {pass.personName}
                      </h3>
                      <span className="text-[11px] font-semibold text-slate-500 dark:text-slate-400 block truncate">
                        {pass.purpose} {pass.vehicleNo ? `• ${pass.vehicleNo}` : ''}
                      </span>
                    </div>
                  </div>

                  <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 text-[10px] font-black uppercase shrink-0">
                    <ShieldApprove3D size={14} />
                    <span>{pass.status === 'approved' ? 'Active' : 'Pending'}</span>
                  </span>
                </div>

                <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 flex items-center justify-between text-[11px]">
                  <span className="font-semibold text-slate-600 dark:text-slate-300">
                    {pass.dateStr} • {pass.timeSlot}
                  </span>
                  {pass.entryCode && (
                    <span className="font-mono font-black text-primary-600 dark:text-primary-400">
                      PIN: {pass.entryCode}
                    </span>
                  )}
                </div>

                {pass.status === 'pending' && (
                  <Button
                    type="button"
                    variant="primary"
                    size="sm"
                    onClick={() => handleApproveGiven(pass.id)}
                  >
                    Approve Guest Request
                  </Button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
