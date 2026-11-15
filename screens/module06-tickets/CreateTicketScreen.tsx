import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Mic,
  AlertTriangle,
  CheckCircle2,
  Image as ImageIcon,
  Building,
  Home,
  Wrench,
  Zap,
  Droplet,
  ShieldAlert,
  Sparkles,
  ChevronRight,
  X
} from 'lucide-react';
import { Button, Input, Textarea, StepProgress } from '../../components/UIComponents';

export interface TicketFormData {
  scope: 'personal' | 'common';
  category: 'plumbing' | 'electrical' | 'lift' | 'carpentry' | 'civil' | 'security';
  title: string;
  description: string;
  priority: 'standard' | 'emergency';
  hasPhoto: boolean;
  hasVoiceNote: boolean;
}

interface CreateTicketScreenProps {
  onBack: () => void;
  onSubmitTicket: (data: TicketFormData) => void;
}

export const CreateTicketScreen: React.FC<CreateTicketScreenProps> = ({
  onBack,
  onSubmitTicket,
}) => {
  const [scope, setScope] = useState<'personal' | 'common'>('personal');
  const [category, setCategory] = useState<'plumbing' | 'electrical' | 'lift' | 'carpentry' | 'civil' | 'security'>('plumbing');
  const [title, setTitle] = useState<string>('Kitchen Sink Tap Dripping Continuously');
  const [description, setDescription] = useState<string>('Water is dripping from the mixer faucet joint even after tightening the valve. Need washer replacement.');
  const [priority, setPriority] = useState<'standard' | 'emergency'>('standard');
  const [hasPhoto, setHasPhoto] = useState<boolean>(true);
  const [isRecordingVoice, setIsRecordingVoice] = useState<boolean>(false);
  const [hasVoiceNote, setHasVoiceNote] = useState<boolean>(false);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const categories = [
    { id: 'plumbing', label: 'Plumbing', icon: Droplet },
    { id: 'electrical', label: 'Electrical', icon: Zap },
    { id: 'lift', label: 'Lift & Elevator', icon: Building },
    { id: 'carpentry', label: 'Carpentry', icon: Wrench },
    { id: 'civil', label: 'Civil & Seepage', icon: Home },
    { id: 'security', label: 'Security & Gate', icon: ShieldAlert },
  ];

  const handleToggleVoice = () => {
    if (!isRecordingVoice && !hasVoiceNote) {
      setIsRecordingVoice(true);
      setTimeout(() => {
        setIsRecordingVoice(false);
        setHasVoiceNote(true);
      }, 1500);
    } else {
      setHasVoiceNote(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onSubmitTicket({
        scope,
        category,
        title,
        description,
        priority,
        hasPhoto,
        hasVoiceNote,
      });
    }, 700);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-5">
        {/* Top Header */}
        <div className="flex items-center justify-between">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 rounded-2xl glass-pill flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors press-scale"
          >
            <ArrowLeft size={18} strokeWidth={2.4} />
          </button>
          <div className="w-48">
            <StepProgress currentStep={1} totalSteps={2} stepLabels={['Details', 'Assignment']} />
          </div>
          <button
            type="button"
            onClick={onBack}
            className="text-xs font-semibold text-slate-500 dark:text-slate-400 hover:text-slate-600 dark:hover:text-slate-200"
          >
            Cancel
          </button>
        </div>

        {/* Title */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white tracking-tight">
            Raise Maintenance Ticket
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
            Logged into society facility ledger with strict SLA countdown.
          </p>
        </div>

        {/* Scope Selector (Personal Unit vs Common Area) */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Location Scope
          </label>
          <div className="grid grid-cols-2 gap-2.5">
            <button
              type="button"
              onClick={() => setScope('personal')}
              className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 press-scale ${
                scope === 'personal'
                  ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/50 dark:bg-cobalt-950/40 ring-1 ring-cobalt-500/30'
                  : 'glass-card hover:border-slate-300 dark:hover:border-obsidian-700'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                scope === 'personal' ? 'bg-cobalt-600 text-white' : 'glass-pill text-slate-500'
              }`}>
                <Home size={18} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                  My Flat (1204)
                </span>
                <span className="text-[11px] text-slate-500">Private Unit</span>
              </div>
            </button>

            <button
              type="button"
              onClick={() => setScope('common')}
              className={`p-3.5 rounded-2xl border transition-all text-left flex items-center gap-3 press-scale ${
                scope === 'common'
                  ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/50 dark:bg-cobalt-950/40 ring-1 ring-cobalt-500/30'
                  : 'glass-card hover:border-slate-300 dark:hover:border-obsidian-700'
              }`}
            >
              <div className={`w-9 h-9 rounded-xl flex items-center justify-center shrink-0 ${
                scope === 'common' ? 'bg-cobalt-600 text-white' : 'glass-pill text-slate-500'
              }`}>
                <Building size={18} />
              </div>
              <div>
                <span className="text-xs font-bold text-slate-900 dark:text-white block leading-tight">
                  Common Area
                </span>
                <span className="text-[11px] text-slate-500">Corridor, Lift, Club</span>
              </div>
            </button>
          </div>
        </div>

        {/* Category Grid */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            Service Category
          </label>
          <div className="grid grid-cols-3 gap-2">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isSelected = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id as any)}
                  className={`p-2.5 rounded-2xl text-center flex flex-col items-center gap-1.5 transition-all press-scale border ${
                    isSelected
                      ? 'border-cobalt-600 dark:border-cobalt-500 bg-cobalt-50/50 dark:bg-cobalt-950/40 text-cobalt-600 dark:text-cobalt-400 ring-1 ring-cobalt-500/30 font-bold'
                      : 'glass-card text-slate-700 dark:text-slate-300 hover:border-slate-300'
                  }`}
                >
                  <Icon size={18} strokeWidth={2.2} />
                  <span className="text-[11px] leading-tight">{cat.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Issue Details Form */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3.5">
          <Input
            label="Issue Summary"
            placeholder="e.g. Master bathroom tap leaking"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <Textarea
            label="Detailed Description"
            rows={3}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Explain the problem and exact location..."
          />

          {/* Media Attachments (Photo + Voice Note) */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
              Attach Evidence
            </label>
            <div className="grid grid-cols-2 gap-2">
              {/* Photo Attachment Button */}
              <button
                type="button"
                onClick={() => setHasPhoto(!hasPhoto)}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 press-scale ${
                  hasPhoto
                    ? 'border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                    : 'glass-card text-slate-600 dark:text-slate-300'
                }`}
              >
                <Camera size={16} />
                <span className="text-xs font-bold">
                  {hasPhoto ? 'Photo Attached (1)' : 'Take Photo'}
                </span>
              </button>

              {/* Voice Memo Button */}
              <button
                type="button"
                onClick={handleToggleVoice}
                className={`p-3 rounded-2xl border transition-all flex items-center justify-center gap-2 press-scale ${
                  isRecordingVoice
                    ? 'border-crimson-500 bg-crimson-500 text-white animate-pulse'
                    : hasVoiceNote
                    ? 'border-emerald-500/60 bg-emerald-50/40 dark:bg-emerald-950/30 text-emerald-700 dark:text-emerald-300'
                    : 'glass-card text-slate-600 dark:text-slate-300'
                }`}
              >
                <Mic size={16} />
                <span className="text-xs font-bold">
                  {isRecordingVoice ? 'Recording... 00:03s' : hasVoiceNote ? 'Voice Note (0:18s)' : 'Add Voice Note'}
                </span>
              </button>
            </div>

            {hasPhoto && (
              <div className="mt-1 p-2 rounded-xl glass-card flex items-center justify-between text-xs text-slate-500">
                <span className="flex items-center gap-1.5">
                  <CheckCircle2 size={13} className="text-emerald-500" />
                  faucet_leak_photo_01.jpg (1.8 MB)
                </span>
                <button
                  type="button"
                  onClick={() => setHasPhoto(false)}
                  className="text-slate-400 hover:text-crimson-500"
                >
                  <X size={14} />
                </button>
              </div>
            )}
          </div>

          {/* Priority Level SLA Toggle */}
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
              Urgency & SLA Level
            </label>
            <div className="grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setPriority('standard')}
                className={`p-3 rounded-2xl border text-left transition-all press-scale ${
                  priority === 'standard'
                    ? 'border-cobalt-600 bg-cobalt-50/50 dark:bg-cobalt-950/40 text-slate-900 dark:text-white ring-1 ring-cobalt-500/30'
                    : 'glass-card text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-xs font-bold block">Standard Ticket</span>
                <span className="text-[11px] text-slate-500 font-mono">24 Hours SLA</span>
              </button>

              <button
                type="button"
                onClick={() => setPriority('emergency')}
                className={`p-3 rounded-2xl border text-left transition-all press-scale ${
                  priority === 'emergency'
                    ? 'border-crimson-600 bg-crimson-50/50 dark:bg-crimson-950/40 text-slate-900 dark:text-white ring-1 ring-crimson-500/30'
                    : 'glass-card text-slate-600 dark:text-slate-400'
                }`}
              >
                <span className="text-xs font-bold text-crimson-600 dark:text-crimson-400 flex items-center gap-1 block">
                  <span className="w-1.5 h-1.5 rounded-full bg-crimson-500 animate-pulse" />
                  Urgent Emergency
                </span>
                <span className="text-[11px] text-slate-500 font-mono">2 Hours Priority SLA</span>
              </button>
            </div>
          </div>
        </form>
      </div>

      {/* Bottom CTA */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          icon={ChevronRight}
          iconPosition="right"
          size="lg"
        >
          Submit Ticket & Start SLA Timer
        </Button>
      </div>
    </div>
  );
};