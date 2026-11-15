import React, { useState } from 'react';
import {
  ArrowLeft,
  Camera,
  Upload,
  CheckCircle2,
  ShieldCheck,
  Tag,
  DollarSign,
  MapPin,
  Sparkles,
  Info
} from 'lucide-react';
import { Button, Input } from '../../components/UIComponents';
import { MarketplaceItem } from './MarketplaceHubScreen';

interface CreateListingScreenProps {
  onBack: () => void;
  onListingCreated: (item: MarketplaceItem) => void;
}

export const CreateListingScreen: React.FC<CreateListingScreenProps> = ({
  onBack,
  onListingCreated,
}) => {
  const [title, setTitle] = useState<string>('');
  const [category, setCategory] = useState<'Furniture' | 'Electronics' | 'Kids & Toys' | 'Home Bakes' | 'Freecycle'>('Furniture');
  const [condition, setCondition] = useState<'Brand New' | 'Like New' | 'Gently Used' | 'Freecycle (₹0)'>('Like New');
  const [priceStr, setPriceStr] = useState<string>('1500');
  const [isFreecycle, setIsFreecycle] = useState<boolean>(false);
  const [handoverOption, setHandoverOption] = useState<string>('Direct Flat Handover (Tower 2 - 1204)');
  const [description, setDescription] = useState<string>('');
  const [photoAdded, setPhotoAdded] = useState<boolean>(true);
  const [agreedTerms, setAgreedTerms] = useState<boolean>(true);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) {
      showToast('Please enter an item title');
      return;
    }
    if (!agreedTerms) {
      showToast('Please agree to resident-only community guidelines');
      return;
    }

    const price = isFreecycle ? 0 : parseInt(priceStr, 10) || 0;

    const newItem: MarketplaceItem = {
      id: `mkt_${Date.now()}`,
      title: title.trim(),
      category: isFreecycle ? 'Freecycle' : category,
      price,
      condition: isFreecycle ? 'Freecycle (₹0)' : condition,
      sellerName: 'Suriya K',
      sellerUnit: 'Tower 2 - 1204',
      sellerRating: '5.0 ★',
      postedAgo: 'Just now',
      handover: handoverOption,
      description: description.trim() || 'Available for immediate campus pickup from verified resident.',
      likes: 0,
    };

    onListingCreated(newItem);
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
              title="Back to Marketplace"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                POST CLASSIFIED
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Create Listing
              </h2>
            </div>
          </div>

          <div className="w-8 h-8 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center">
            <Tag size={16} />
          </div>
        </div>

        {/* Photo Upload Area */}
        <div>
          <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
            ITEM PHOTOS
          </label>
          <div
            onClick={() => {
              setPhotoAdded(!photoAdded);
              showToast(photoAdded ? 'Photo removed' : 'Camera snapshot attached');
            }}
            className="w-full h-32 rounded-2xl border-2 border-dashed border-slate-300 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-900 flex flex-col items-center justify-center gap-2 cursor-pointer hover:bg-slate-100 dark:hover:bg-obsidian-850 transition-colors"
          >
            <div className="w-10 h-10 rounded-xl bg-cobalt-50 dark:bg-cobalt-950/60 text-cobalt-600 dark:text-cobalt-400 flex items-center justify-center">
              <Camera size={20} />
            </div>
            <div className="text-center">
              <span className="text-xs font-bold text-slate-800 dark:text-slate-200 block">
                {photoAdded ? '✓ 1 Photo Attached (Tap to change)' : 'Tap to Take or Upload Photo'}
              </span>
              <span className="text-[10px] text-slate-500 dark:text-slate-400">
                Supports JPG, PNG up to 10MB
              </span>
            </div>
          </div>
        </div>

        {/* Form Inputs */}
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Input
            label="LISTING TITLE"
            placeholder="e.g. Solid Wood Coffee Table / Baby Stroller"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                CATEGORY
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value as any)}
                className="w-full h-[52px] rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 px-3 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
              >
                <option value="Furniture">Furniture</option>
                <option value="Electronics">Electronics</option>
                <option value="Kids & Toys">Kids & Toys</option>
                <option value="Home Bakes">Home Bakes / Culinary</option>
                <option value="Freecycle">Freecycle Giveaway</option>
              </select>
            </div>

            <div>
              <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                CONDITION
              </label>
              <select
                value={condition}
                onChange={(e) => setCondition(e.target.value as any)}
                className="w-full h-[52px] rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 px-3 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
              >
                <option value="Brand New">Brand New</option>
                <option value="Like New">Like New</option>
                <option value="Gently Used">Gently Used</option>
                <option value="Freecycle (₹0)">Freecycle (₹0)</option>
              </select>
            </div>
          </div>

          {/* Pricing & Freecycle Toggle */}
          <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex flex-col gap-2.5">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-900 dark:text-white">
                🎁 Freecycle Giveaway (₹0 Price)
              </span>
              <input
                type="checkbox"
                checked={isFreecycle}
                onChange={(e) => setIsFreecycle(e.target.checked)}
                className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 cursor-pointer"
              />
            </div>

            {!isFreecycle && (
              <Input
                label="SELLING PRICE (₹ INR)"
                placeholder="e.g. 1500"
                type="number"
                value={priceStr}
                onChange={(e) => setPriceStr(e.target.value)}
                required={!isFreecycle}
              />
            )}
          </div>

          {/* Handover Preference */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
              CAMPUS HANDOVER LOCATION
            </label>
            <select
              value={handoverOption}
              onChange={(e) => setHandoverOption(e.target.value)}
              className="w-full h-[52px] rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 px-3.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
            >
              <option value="Direct Flat Handover (Tower 2 - 1204)">
                Direct Flat Handover (Tower 2 - Flat 1204)
              </option>
              <option value="Leave at Gate 1 Guard Security Desk">
                Leave with Gate 1 Guard Security Desk for Buyer
              </option>
              <option value="Meet at Clubhouse Lobby">
                Meet at Clubhouse Lobby
              </option>
            </select>
          </div>

          {/* Description */}
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
              ITEM DESCRIPTION & NOTES
            </label>
            <textarea
              rows={3}
              placeholder="Mention dimensions, purchase date, warranty or baking ingredients..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 p-3.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500 resize-none"
            />
          </div>

          {/* Resident Trust Checkbox */}
          <div className="p-3 rounded-2xl bg-emerald-50/70 dark:bg-emerald-950/40 border border-emerald-200/80 dark:border-emerald-900/40 flex items-start gap-2.5 text-xs">
            <input
              type="checkbox"
              checked={agreedTerms}
              onChange={(e) => setAgreedTerms(e.target.checked)}
              className="w-4 h-4 rounded text-emerald-600 focus:ring-emerald-500 mt-0.5 cursor-pointer shrink-0"
            />
            <label className="text-[11px] text-slate-600 dark:text-slate-300 leading-snug">
              I certify I am an active resident of <strong>Tower 2 - Flat 1204</strong>. Strictly zero commercial brokerage or real estate allowed.
            </label>
          </div>

          <div className="flex items-center gap-2 pt-2">
            <Button
              type="button"
              variant="outline"
              onClick={onBack}
              className="flex-1"
            >
              Cancel
            </Button>
            <Button type="submit" variant="primary" className="flex-1">
              Publish Listing
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
