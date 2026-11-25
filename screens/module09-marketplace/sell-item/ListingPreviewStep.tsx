import React from 'react';
import { SellItemDraft } from './sellItemData';
import {
  PriceTag3D,
  LocationPin3D,
  ContactPhone3D,
  ExternalLink3D,
  ShieldCheck3D,
} from './SellItem3DIcons';

interface ListingPreviewStepProps {
  draft: SellItemDraft;
}

export const ListingPreviewStep: React.FC<ListingPreviewStepProps> = ({ draft }) => {
  const numericPrice = draft.isFree ? 0 : parseInt(draft.sellingPrice, 10) || 0;
  const numericOriginal = parseInt(draft.originalPrice, 10) || 0;
  const coverImage = draft.photos[0];
  const displayUnit = draft.showFlatNumber
    ? draft.location
    : 'Verified Resident (Tower 2)';

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div>
        <span className="text-[10px] font-black tracking-widest text-primary-600 uppercase block">
          LISTING PREVIEW
        </span>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5">
          Review before publishing
        </h2>
      </div>

      {/* Live Marketplace Card Preview */}
      <div className="p-3.5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3">
        {coverImage && (
          <div className="w-full h-44 rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-obsidian-800">
            <img
              src={coverImage}
              alt={draft.title || 'Listing cover'}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5">
              <span className="px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wide bg-white/95 dark:bg-obsidian-900/95 text-slate-900 dark:text-white backdrop-blur-md shadow-xs">
                {draft.isFree ? 'Freecycle (₹0)' : draft.condition}
              </span>
              <span className="px-2 py-0.5 rounded-lg text-[9.5px] font-bold uppercase tracking-wider bg-black/55 text-white backdrop-blur-md">
                {draft.subCategory}
              </span>
            </div>
            {draft.photos.length > 1 && (
              <span className="absolute bottom-2.5 right-2.5 px-2 py-0.5 rounded-lg bg-black/65 text-white text-[10px] font-bold backdrop-blur-md">
                +{draft.photos.length - 1} more
              </span>
            )}
          </div>
        )}

        <div className="px-0.5">
          <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-snug">
            {draft.title || 'Untitled Item'}
          </h3>
          {draft.description && (
            <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 leading-relaxed">
              {draft.description}
            </p>
          )}
        </div>

        <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-obsidian-800 px-0.5">
          <div className="flex items-baseline gap-2">
            <span className="text-base font-black text-slate-900 dark:text-white">
              {numericPrice === 0 ? (
                <span className="text-primary-600">FREE GIVEAWAY</span>
              ) : (
                `₹${numericPrice.toLocaleString()}`
              )}
            </span>
            {numericOriginal > numericPrice && numericPrice > 0 && (
              <span className="text-xs text-slate-400 line-through font-medium">
                ₹{numericOriginal.toLocaleString()}
              </span>
            )}
            {draft.isNegotiable && numericPrice > 0 && (
              <span className="text-[10px] font-bold text-primary-600 bg-primary-50 dark:bg-primary-950/40 px-2 py-0.5 rounded-md">
                Negotiable
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Captured Parameter Summary */}
      <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-3 text-xs">
        <span className="text-[10px] font-black tracking-wider uppercase text-slate-400 dark:text-slate-500 flex items-center gap-1.5">
          <PriceTag3D size={16} />
          <span>ITEM PARAMETERS</span>
        </span>

        <div className="grid grid-cols-2 gap-2.5">
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800">
            <span className="text-[10px] text-slate-400 block">Category</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
              {draft.category}
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800">
            <span className="text-[10px] text-slate-400 block">Product Type</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
              {draft.productType || 'Standard'}
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800">
            <span className="text-[10px] text-slate-400 block">Purchase Year</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 block">
              {draft.yearOfPurchase}
            </span>
          </div>
          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800">
            <span className="text-[10px] text-slate-400 block">Brand</span>
            <span className="font-bold text-slate-800 dark:text-slate-100 block truncate">
              {draft.brand || 'Unbranded'}
            </span>
          </div>
        </div>

        <div className="p-3 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 flex flex-col gap-2">
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
            <LocationPin3D size={18} />
            <span className="truncate">
              {displayUnit} • {draft.deliveryMode}
            </span>
          </div>
          <div className="flex items-center gap-2 text-slate-700 dark:text-slate-200 font-semibold">
            <ContactPhone3D size={18} />
            <span>Contact via {draft.contactMethod} & Hunt Lockdoor Chat</span>
          </div>
          {draft.productLink && (
            <div className="flex items-center gap-2 text-primary-600 font-semibold">
              <ExternalLink3D size={18} />
              <span className="truncate">{draft.productLink}</span>
            </div>
          )}
        </div>

        <div className="flex items-center gap-2 p-2.5 rounded-2xl bg-primary-50/70 dark:bg-primary-950/30 border border-primary-200/70 dark:border-primary-900/40 text-[11px] text-slate-700 dark:text-slate-300 font-medium">
          <ShieldCheck3D size={18} />
          <span>Resident-verified zero-brokerage community listing</span>
        </div>
      </div>
    </div>
  );
};
