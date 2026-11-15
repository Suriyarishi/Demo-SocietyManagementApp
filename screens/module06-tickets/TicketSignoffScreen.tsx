import React, { useState } from 'react';
import {
  CheckCircle2,
  Star,
  ThumbsUp,
  ShieldCheck,
  ArrowRight,
  Sparkles,
  AlertCircle,
  MessageSquare,
  Heart
} from 'lucide-react';
import { Badge, Button } from '../../components/UIComponents';
import { MaintenanceTicket } from './HelpdeskHubScreen';

interface TicketSignoffScreenProps {
  ticket: MaintenanceTicket;
  onFinishSignoff: (reviewData: any) => void;
  onReopenTicket: () => void;
}

export const TicketSignoffScreen: React.FC<TicketSignoffScreenProps> = ({
  ticket,
  onFinishSignoff,
  onReopenTicket,
}) => {
  const [satisfaction, setSatisfaction] = useState<'satisfied' | 'unsatisfied'>('satisfied');
  const [rating, setRating] = useState<number>(5);
  const [selectedTags, setSelectedTags] = useState<string[]>(['Punctual', 'Cleaned up area', 'Fixed in 1 Visit']);
  const [selectedTip, setSelectedTip] = useState<number>(50);
  const [comment, setComment] = useState<string>('Very prompt service, fixed the thermostat within 20 mins.');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const tags = [
    'Punctual',
    'Cleaned up area',
    'Fixed in 1 Visit',
    'Polite & Professional',
    'Wore ID Badge',
    'Proper Tools',
  ];

  const ratingLabels = ['', 'Poor Fix', 'Below Average', 'Good Service', 'Very Good', 'Flawless Fix!'];

  const toggleTag = (t: string) => {
    if (selectedTags.includes(t)) {
      setSelectedTags(selectedTags.filter((x) => x !== t));
    } else {
      setSelectedTags([...selectedTags, t]);
    }
  };

  const handleSubmit = () => {
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onFinishSignoff({
        ticketId: ticket.id,
        satisfaction,
        rating,
        selectedTags,
        tip: selectedTip,
        comment,
      });
    }, 700);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-6 text-left animate-in fade-in duration-300">
      <div className="flex flex-col gap-5">
        {/* Top Header Success Badge */}
        <div className="flex flex-col items-center text-center pt-2">
          <div className="w-16 h-16 rounded-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 flex items-center justify-center mb-3 shadow-lg shadow-emerald-500/20 animate-in zoom-in-95">
            <ShieldCheck size={36} strokeWidth={2.4} />
          </div>
          <span className="text-[10px] font-bold text-emerald-600 dark:text-emerald-400 uppercase tracking-widest px-2.5 py-0.5 rounded-full glass-pill">
            RESIDENT VERIFICATION SIGNOFF
          </span>
          <h2 className="text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-1">
            Sign Off & Rate Service
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 max-w-[300px]">
            Society rules mandate resident approval before any facility ticket can be closed.
          </p>
        </div>

        {/* Ticket & Technician Summary Card */}
        <div className="p-4 rounded-3xl glass-card flex items-center justify-between text-xs">
          <div>
            <span className="font-mono text-xs font-bold text-cobalt-600 dark:text-cobalt-400 block">
              #{ticket.id}
            </span>
            <span className="font-bold text-slate-900 dark:text-white block mt-0.5">
              {ticket.title}
            </span>
            <span className="text-[11px] text-slate-400">
              Technician: {ticket.technician?.name || 'Kishore Verma'}
            </span>
          </div>
          <Badge variant="emerald" size="sm">
            Work Done
          </Badge>
        </div>

        {/* Satisfaction Toggle */}
        <div className="grid grid-cols-2 gap-2.5">
          <button
            type="button"
            onClick={() => setSatisfaction('satisfied')}
            className={`p-3.5 rounded-2xl border text-center transition-all press-scale ${
              satisfaction === 'satisfied'
                ? 'border-emerald-500 bg-emerald-50/50 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300 font-bold ring-2 ring-emerald-500/30'
                : 'glass-card text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="text-xs block">✓ Fixed Satisfactorily</span>
            <span className="text-[10px] opacity-80 block mt-0.5">Approve ticket closure</span>
          </button>

          <button
            type="button"
            onClick={() => {
              setSatisfaction('unsatisfied');
              onReopenTicket();
            }}
            className={`p-3.5 rounded-2xl border text-center transition-all press-scale ${
              satisfaction === 'unsatisfied'
                ? 'border-crimson-500 bg-crimson-50/50 dark:bg-crimson-950/40 text-crimson-700 dark:text-crimson-300 font-bold ring-2 ring-crimson-500/30'
                : 'glass-card text-slate-600 dark:text-slate-400'
            }`}
          >
            <span className="text-xs block">✕ Issue Persists</span>
            <span className="text-[10px] opacity-80 block mt-0.5">Re-open complaint</span>
          </button>
        </div>

        {/* 5-Star Rating Section */}
        <div className="p-5 rounded-3xl glass-card flex flex-col items-center text-center gap-2">
          <span className="text-xs font-bold text-slate-700 dark:text-slate-300 uppercase tracking-wider">
            Rate Technician's Quality of Work
          </span>

          <div className="flex items-center gap-2 my-1">
            {[1, 2, 3, 4, 5].map((star) => (
              <button
                key={star}
                type="button"
                onClick={() => setRating(star)}
                className="p-1 text-amber-400 hover:scale-110 transition-transform press-scale"
              >
                <Star
                  size={32}
                  className={star <= rating ? 'fill-amber-400 text-amber-400' : 'text-slate-300 dark:text-slate-600'}
                />
              </button>
            ))}
          </div>

          <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
            {ratingLabels[rating]}
          </span>
        </div>

        {/* Compliment Tags */}
        <div className="flex flex-col gap-1.5">
          <label className="text-xs font-bold text-slate-700 dark:text-slate-300 tracking-wider uppercase">
            What went well?
          </label>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => {
              const isSelected = selectedTags.includes(tag);
              return (
                <button
                  key={tag}
                  type="button"
                  onClick={() => toggleTag(tag)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-semibold transition-all press-scale border ${
                    isSelected
                      ? 'border-cobalt-600 bg-cobalt-50 dark:bg-cobalt-950/50 text-cobalt-600 dark:text-cobalt-400 font-bold ring-1 ring-cobalt-500/30'
                      : 'glass-card text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {tag}
                </button>
              );
            })}
          </div>
        </div>

        {/* Technician Appreciation Tip */}
        <div className="p-4 rounded-3xl glass-card flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <span className="text-xs font-bold text-slate-700 dark:text-slate-300 flex items-center gap-1.5">
              <Heart size={14} className="text-crimson-500 fill-crimson-500" />
              <span>Appreciation Tip for Kishore Verma</span>
            </span>
            <span className="text-[11px] text-slate-400">100% goes to staff</span>
          </div>

          <div className="grid grid-cols-4 gap-2">
            {[0, 30, 50, 100].map((amt) => (
              <button
                key={amt}
                type="button"
                onClick={() => setSelectedTip(amt)}
                className={`py-2 rounded-xl text-xs font-mono font-bold transition-all border press-scale ${
                  selectedTip === amt
                    ? 'border-cobalt-600 bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400'
                    : 'glass-pill text-slate-600 dark:text-slate-400'
                }`}
              >
                {amt === 0 ? 'No Tip' : `₹${amt}`}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Signoff CTA */}
      <div className="pt-6">
        <Button
          onClick={handleSubmit}
          isLoading={isSubmitting}
          icon={CheckCircle2}
          iconPosition="left"
          size="lg"
        >
          Submit Signoff & Archive #{ticket.id}
        </Button>
      </div>
    </div>
  );
};