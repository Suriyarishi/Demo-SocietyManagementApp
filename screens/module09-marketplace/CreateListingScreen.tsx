import React, { useState, useEffect } from 'react';
import { ArrowLeft, CheckCircle2 } from 'lucide-react';
import { Button } from '../../components/UIComponents';
import { MarketplaceItem } from './MarketplaceHubScreen';
import {
  SellItemDraft,
  SellWizardStep,
  INITIAL_SELL_DRAFT,
  SELL_CATEGORIES,
  getSubCategoriesForCategory,
} from './sell-item/sellItemData';
import { CategoryStep } from './sell-item/CategoryStep';
import { ItemDetailsStep } from './sell-item/ItemDetailsStep';
import { PhotosDetailsStep } from './sell-item/PhotosDetailsStep';
import { DeliveryContactStep } from './sell-item/DeliveryContactStep';
import { ListingPreviewStep } from './sell-item/ListingPreviewStep';

const DRAFT_STORAGE_KEY = 'huntlockdoor_marketplace_sell_draft';

interface CreateListingScreenProps {
  onBack: () => void;
  onListingCreated: (item: MarketplaceItem) => void;
}

export const CreateListingScreen: React.FC<CreateListingScreenProps> = ({
  onBack,
  onListingCreated,
}) => {
  const [step, setStep] = useState<SellWizardStep>('category');
  const [draft, setDraft] = useState<SellItemDraft>(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SellItemDraft>;
        const validCategory = SELL_CATEGORIES.some((c) => c.id === parsed.category)
          ? parsed.category
          : INITIAL_SELL_DRAFT.category;
        return { ...INITIAL_SELL_DRAFT, ...parsed, category: validCategory! };
      }
    } catch {
      // Ignore storage errors
    }
    return INITIAL_SELL_DRAFT;
  });
  const [toastMsg, setToastMsg] = useState<string>('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(DRAFT_STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved) as Partial<SellItemDraft>;
        if (parsed.title || parsed.sellingPrice) {
          setToastMsg('Saved draft loaded');
          const timer = setTimeout(() => setToastMsg(''), 2200);
          return () => clearTimeout(timer);
        }
      }
    } catch {
      // Ignore storage errors
    }
  }, []);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2600);
  };

  const updateDraft = (patch: Partial<SellItemDraft>) => {
    setDraft((prev) => ({ ...prev, ...patch }));
  };

  const handleSelectCategory = (categoryId: string) => {
    const subs = getSubCategoriesForCategory(categoryId);
    const firstSub = subs[0]?.id || 'Other';
    updateDraft({
      category: categoryId,
      subCategory: firstSub,
      productType: '',
    });
  };

  const handleSelectSubCategory = (subCategoryId: string) => {
    updateDraft({
      subCategory: subCategoryId,
      productType: '',
    });
  };

  const handleSaveDraft = () => {
    try {
      localStorage.setItem(DRAFT_STORAGE_KEY, JSON.stringify(draft));
      showToast('✓ Draft saved locally');
    } catch {
      showToast('Could not save draft');
    }
  };

  const handleStepBack = () => {
    if (step === 'category') onBack();
    else if (step === 'subcategory') setStep('category');
    else if (step === 'details') setStep('subcategory');
    else if (step === 'photos') setStep('details');
    else if (step === 'delivery') setStep('photos');
    else if (step === 'preview') setStep('delivery');
  };

  const handleNext = () => {
    if (step === 'category') {
      if (!draft.category) {
        showToast('Please select a listing category');
        return;
      }
      setStep('subcategory');
      return;
    }

    if (step === 'subcategory') {
      if (!draft.subCategory) {
        showToast('Please select a sub-category');
        return;
      }
      setStep('details');
      return;
    }

    if (step === 'details') {
      if (!draft.isFree && (!draft.sellingPrice.trim() || Number(draft.sellingPrice) < 0)) {
        showToast('Please enter a selling price or mark as free');
        return;
      }
      if (!draft.productType) {
        showToast('Please select a product type');
        return;
      }
      setStep('photos');
      return;
    }

    if (step === 'photos') {
      if (draft.photos.length === 0) {
        showToast('Please add at least 1 photo of your item');
        return;
      }
      if (!draft.title.trim()) {
        showToast('Please enter an item title');
        return;
      }
      setStep('delivery');
      return;
    }

    if (step === 'delivery') {
      if (!draft.location) {
        showToast('Please select a pickup location');
        return;
      }
      setStep('preview');
    }
  };

  const handlePublish = () => {
    const price = draft.isFree ? 0 : parseInt(draft.sellingPrice, 10) || 0;
    const originalPrice = draft.originalPrice ? parseInt(draft.originalPrice, 10) : undefined;
    const shortLocation = draft.location.split(',')[0].trim();

    const newItem: MarketplaceItem = {
      id: `mkt_${Date.now()}`,
      title: draft.title.trim(),
      category: draft.isFree ? 'Freecycle' : draft.category,
      subCategory: draft.subCategory,
      price,
      originalPrice,
      isNegotiable: draft.isNegotiable,
      condition: draft.isFree ? 'Freecycle (₹0)' : draft.condition,
      productType: draft.productType,
      yearOfPurchase: draft.yearOfPurchase,
      brand: draft.brand.trim() || undefined,
      productLink: draft.productLink.trim() || undefined,
      sellerName: 'Suriya K',
      sellerUnit: draft.showFlatNumber ? shortLocation : 'Verified Resident (Tower 2)',
      sellerRating: '5.0 ★',
      postedAgo: 'Just now',
      handover: `${draft.deliveryMode} • ${draft.showFlatNumber ? draft.location : 'Tower 2 Lobby / Guard Desk'}`,
      deliveryMode: draft.deliveryMode,
      showFlatNumber: draft.showFlatNumber,
      contactMethod: draft.contactMethod,
      description:
        draft.description.trim() ||
        `${draft.condition} ${draft.productType || draft.subCategory} available for direct handover.`,
      imageUrl: draft.photos[0],
      images: draft.photos,
      likes: 0,
    };

    try {
      localStorage.removeItem(DRAFT_STORAGE_KEY);
    } catch {
      // Ignore storage errors
    }

    onListingCreated(newItem);
  };

  const stepNumber =
    step === 'details' ? 1 : step === 'photos' ? 2 : step === 'delivery' ? 3 : null;
  const progressPercent = stepNumber ? (stepNumber / 3) * 100 : 0;

  return (
    <div className="w-full h-full min-h-0 flex-1 flex flex-col justify-between bg-slate-50 dark:bg-obsidian-950 text-left animate-in fade-in duration-200 overflow-hidden relative select-none">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-slate-900/95 dark:bg-obsidian-850 text-white border border-slate-700/80 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-primary-500 shrink-0" />
          <span className="flex-1 text-[11.5px] leading-tight">{toastMsg}</span>
        </div>
      )}

      {/* Top Navigation & Step Progress Bar */}
      <div className="shrink-0 z-20 px-4 pt-3 pb-2 bg-slate-50/95 dark:bg-obsidian-950/95 backdrop-blur-md flex items-center gap-3">
        <button
          type="button"
          onClick={handleStepBack}
          className="w-10 h-10 rounded-full bg-white hover:bg-slate-100 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200/90 dark:border-obsidian-800 shadow-2xs press-scale shrink-0"
          title="Go back"
          aria-label="Go back"
        >
          <ArrowLeft size={18} strokeWidth={2.4} />
        </button>

        {stepNumber !== null && (
          <div className="flex-1 flex items-center gap-3">
            <div className="flex-1 h-1.5 bg-slate-200 dark:bg-obsidian-800 rounded-full relative flex items-center">
              <div
                className="h-full bg-primary-600 dark:bg-primary-500 rounded-full transition-all duration-300 ease-out"
                style={{ width: `${progressPercent}%` }}
              />
              <div
                className="w-2.5 h-2.5 rounded-full bg-primary-600 dark:bg-primary-400 border-2 border-white dark:border-obsidian-950 shadow-xs absolute -translate-x-1/2 transition-all duration-300 ease-out"
                style={{ left: `${progressPercent}%` }}
              />
            </div>
            <span className="text-xs font-bold text-slate-500 dark:text-slate-400 tabular-nums shrink-0">
              Step {stepNumber}/3
            </span>
          </div>
        )}
      </div>

      {/* Scrollable Step Body */}
      <div className="flex-1 min-h-0 overflow-y-auto overflow-x-hidden no-scrollbar px-4 pt-2 pb-6">
        {(step === 'category' || step === 'subcategory') && (
          <CategoryStep
            mode={step}
            selectedCategory={draft.category}
            selectedSubCategory={draft.subCategory}
            onSelectCategory={handleSelectCategory}
            onSelectSubCategory={handleSelectSubCategory}
          />
        )}

        {step === 'details' && (
          <ItemDetailsStep
            draft={draft}
            onChange={updateDraft}
            onShowTip={showToast}
          />
        )}

        {step === 'photos' && (
          <PhotosDetailsStep
            draft={draft}
            onChange={updateDraft}
            onShowTip={showToast}
          />
        )}

        {step === 'delivery' && (
          <DeliveryContactStep draft={draft} onChange={updateDraft} />
        )}

        {step === 'preview' && <ListingPreviewStep draft={draft} />}
      </div>

      {/* Sticky Bottom Action Bar */}
      <div className="shrink-0 z-20 bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md border-t border-slate-200/80 dark:border-obsidian-800 p-3.5 flex items-center gap-2.5 shadow-elevated">
        {(step === 'category' || step === 'subcategory') && (
          <Button type="button" variant="primary" size="md" onClick={handleNext}>
            Continue
          </Button>
        )}

        {(step === 'details' || step === 'photos') && (
          <>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleSaveDraft}
              className="flex-1 border-primary-600/50 text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30"
            >
              Save draft
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              className="flex-1"
            >
              Continue
            </Button>
          </>
        )}

        {step === 'delivery' && (
          <>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={handleSaveDraft}
              className="flex-1 border-primary-600/50 text-primary-700 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-primary-950/30"
            >
              Save draft
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handleNext}
              className="flex-1"
            >
              See preview
            </Button>
          </>
        )}

        {step === 'preview' && (
          <>
            <Button
              type="button"
              variant="outline"
              size="md"
              onClick={() => setStep('delivery')}
              className="flex-1"
            >
              Edit Details
            </Button>
            <Button
              type="button"
              variant="primary"
              size="md"
              onClick={handlePublish}
              className="flex-1"
            >
              Publish Listing
            </Button>
          </>
        )}
      </div>
    </div>
  );
};
