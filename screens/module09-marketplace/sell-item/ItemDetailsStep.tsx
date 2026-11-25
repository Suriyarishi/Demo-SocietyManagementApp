import React from 'react';
import { Input, Select } from '../../../components/UIComponents';
import {
  SellItemDraft,
  PURCHASE_YEARS,
  getProductTypesForSelection,
} from './sellItemData';
import { InfoOrb3D } from './SellItem3DIcons';

interface ItemDetailsStepProps {
  draft: SellItemDraft;
  onChange: (patch: Partial<SellItemDraft>) => void;
  onShowTip: (msg: string) => void;
}

export const ItemDetailsStep: React.FC<ItemDetailsStepProps> = ({
  draft,
  onChange,
  onShowTip,
}) => {
  const productTypes = getProductTypesForSelection(draft.category, draft.subCategory);

  const handleToggleFree = () => {
    const nextFree = !draft.isFree;
    onChange({
      isFree: nextFree,
      sellingPrice: nextFree ? '0' : '',
      isNegotiable: nextFree ? false : draft.isNegotiable,
    });
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      {/* Header Title with Subcategory Context */}
      <div>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
          Sell {draft.subCategory} item
        </span>
        <div className="flex items-center gap-2 mt-0.5">
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Add item details
          </h2>
          <button
            type="button"
            onClick={() =>
              onShowTip('Accurate pricing and condition help verified neighbors decide faster.')
            }
            className="w-7 h-7 rounded-full flex items-center justify-center transition-transform press-scale cursor-pointer"
            title="Listing details tip"
            aria-label="Listing details tip"
          >
            <InfoOrb3D size={20} />
          </button>
        </div>
      </div>

      {/* Card 1: Pricing Parameters */}
      <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-4">
        <Input
          label="Original price (MRP)"
          type="number"
          inputMode="numeric"
          min="0"
          placeholder="Enter original price (mrp)"
          value={draft.originalPrice}
          onChange={(e) => onChange({ originalPrice: e.target.value })}
        />

        <div className="flex flex-col gap-1.5 text-left">
          <label
            htmlFor="sell-selling-price"
            className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1"
          >
            <span>Selling price</span>
            <span className="text-crimson-500">*</span>
          </label>
          <div className="relative flex items-center h-[54px] rounded-2xl border border-slate-300/80 dark:border-obsidian-750 bg-slate-50/90 dark:bg-obsidian-900/90 hover:bg-slate-100/70 dark:hover:bg-obsidian-850 focus-within:bg-white dark:focus-within:bg-obsidian-900 focus-within:border-cobalt-600 dark:focus-within:border-cobalt-500 focus-within:ring-4 focus-within:ring-cobalt-500/15 transition-all shadow-2xs">
            <span className="pl-4 pr-2 text-sm font-bold text-slate-500 dark:text-slate-400 select-none">
              ₹
            </span>
            <input
              id="sell-selling-price"
              type="number"
              inputMode="numeric"
              min="0"
              disabled={draft.isFree}
              placeholder={draft.isFree ? '0 (Free giveaway)' : 'Enter price'}
              value={draft.isFree ? '0' : draft.sellingPrice}
              onChange={(e) => onChange({ sellingPrice: e.target.value })}
              className="w-full h-full pr-4 text-slate-900 dark:text-white placeholder:text-slate-400 dark:placeholder:text-slate-500 text-sm font-semibold outline-none bg-transparent disabled:opacity-60"
            />
          </div>
        </div>

        {/* Negotiable / Mark as free pills */}
        <div className="flex items-center gap-2.5 flex-wrap">
          <button
            type="button"
            disabled={draft.isFree}
            onClick={() => onChange({ isNegotiable: !draft.isNegotiable })}
            className={`h-10 px-4 rounded-full text-xs font-bold border transition-all press-scale cursor-pointer disabled:opacity-40 disabled:cursor-not-allowed ${
              draft.isNegotiable
                ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500 ring-1 ring-primary-500/20'
                : 'bg-white dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750 hover:bg-slate-50 dark:hover:bg-obsidian-800'
            }`}
          >
            Negotiable
          </button>

          <button
            type="button"
            onClick={handleToggleFree}
            className={`h-10 px-4 rounded-full text-xs font-bold border transition-all press-scale cursor-pointer ${
              draft.isFree
                ? 'bg-primary-600 text-white border-primary-600 shadow-xs'
                : 'bg-white dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750 hover:bg-slate-50 dark:hover:bg-obsidian-800'
            }`}
          >
            Mark as free
          </button>
        </div>
      </div>

      {/* Card 2: Product Specification Parameters */}
      <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-4">
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sell-product-type"
            className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1"
          >
            <span>Product type</span>
            <span className="text-crimson-500">*</span>
          </label>
          <Select
            id="sell-product-type"
            value={draft.productType}
            onChange={(e) => onChange({ productType: e.target.value })}
          >
            <option value="">Select product type</option>
            {productTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </Select>
        </div>

        {/* Condition Selector */}
        <div className="flex flex-col gap-2">
          <span className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1">
            <span>Condition</span>
            <span className="text-crimson-500">*</span>
          </span>
          <div className="flex items-center gap-2 flex-wrap">
            {(['Like new', 'Fairly used', 'Old'] as const).map((cond) => {
              const active = draft.condition === cond;
              return (
                <button
                  key={cond}
                  type="button"
                  onClick={() => onChange({ condition: cond })}
                  className={`h-10 px-4 rounded-full text-xs font-bold border transition-all press-scale cursor-pointer ${
                    active
                      ? 'bg-primary-50 dark:bg-primary-950/40 text-primary-700 dark:text-primary-300 border-primary-500 ring-1 ring-primary-500/20'
                      : 'bg-white dark:bg-obsidian-850 text-slate-700 dark:text-slate-300 border-slate-200 dark:border-obsidian-750 hover:bg-slate-50 dark:hover:bg-obsidian-800'
                  }`}
                >
                  {cond}
                </button>
              );
            })}
          </div>
        </div>

        {/* Year of purchase */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sell-purchase-year"
            className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1"
          >
            <span>Year of purchase</span>
            <span className="text-crimson-500">*</span>
          </label>
          <Select
            id="sell-purchase-year"
            value={draft.yearOfPurchase}
            onChange={(e) => onChange({ yearOfPurchase: e.target.value })}
          >
            {PURCHASE_YEARS.map((yr) => (
              <option key={yr} value={yr}>
                {yr}
              </option>
            ))}
          </Select>
        </div>

        <Input
          label="Brand"
          placeholder="Item brand"
          value={draft.brand}
          onChange={(e) => onChange({ brand: e.target.value })}
        />

        <Input
          label="Product link"
          type="url"
          placeholder="e.g., https://amazon.com/..."
          value={draft.productLink}
          onChange={(e) => onChange({ productLink: e.target.value })}
        />
      </div>
    </div>
  );
};
