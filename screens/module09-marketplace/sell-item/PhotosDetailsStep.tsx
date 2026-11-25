import React, { useRef } from 'react';
import { Plus, X, ImagePlus } from 'lucide-react';
import { Input, Textarea } from '../../../components/UIComponents';
import { SellItemDraft, QUICK_SAMPLE_PHOTOS } from './sellItemData';

interface PhotosDetailsStepProps {
  draft: SellItemDraft;
  onChange: (patch: Partial<SellItemDraft>) => void;
  onShowTip: (msg: string) => void;
}

export const PhotosDetailsStep: React.FC<PhotosDetailsStepProps> = ({
  draft,
  onChange,
  onShowTip,
}) => {
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const handleFilesSelected = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []).slice(0, 5 - draft.photos.length);
    e.target.value = '';
    if (!files.length) return;

    Promise.all(
      files.map(
        (file) =>
          new Promise<string>((resolve) => {
            const reader = new FileReader();
            reader.onload = () => resolve(typeof reader.result === 'string' ? reader.result : '');
            reader.onerror = () => resolve('');
            reader.readAsDataURL(file);
          })
      )
    ).then((results) => {
      const valid = results.filter(Boolean);
      if (valid.length > 0) {
        onChange({ photos: [...draft.photos, ...valid].slice(0, 5) });
        onShowTip(`✓ ${valid.length} photo${valid.length > 1 ? 's' : ''} attached to listing`);
      }
    });
  };

  const handleAddSamplePhoto = (url: string) => {
    if (draft.photos.includes(url)) return;
    if (draft.photos.length >= 5) {
      onShowTip('Maximum 5 photos allowed per listing');
      return;
    }
    onChange({ photos: [...draft.photos, url] });
    onShowTip('✓ Cover photo attached');
  };

  const handleRemovePhoto = (index: number) => {
    onChange({
      photos: draft.photos.filter((_, idx) => idx !== index),
    });
  };

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block">
          Sell {draft.subCategory} item
        </span>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight mt-0.5 leading-snug">
          Almost done! Add photos and details
        </h2>
      </div>

      {/* Main Card: Photos, Title, Description */}
      <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-4">
        {/* Photos Uploader */}
        <div className="flex flex-col gap-2">
          <label className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1">
            <span>Photos</span>
            <span className="text-crimson-500">*</span>
          </label>

          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFilesSelected}
            className="hidden"
          />

          <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar pb-1">
            {/* Add Photo Tile */}
            {draft.photos.length < 5 && (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-obsidian-700 bg-slate-50 dark:bg-obsidian-850 hover:bg-slate-100 dark:hover:bg-obsidian-800 hover:border-primary-500 flex flex-col items-center justify-center gap-1 text-slate-500 dark:text-slate-400 hover:text-primary-600 transition-all shrink-0 press-scale cursor-pointer"
                title="Upload item photos"
                aria-label="Upload item photos"
              >
                <Plus size={22} strokeWidth={2.2} />
                <span className="text-[10px] font-bold">Add Photo</span>
              </button>
            )}

            {/* Uploaded Thumbnails */}
            {draft.photos.map((src, idx) => (
              <div
                key={`${src.slice(0, 30)}-${idx}`}
                className="w-24 h-24 rounded-2xl overflow-hidden relative border border-slate-200 dark:border-obsidian-700 shrink-0 bg-slate-100 dark:bg-obsidian-850"
              >
                <img
                  src={src}
                  alt={`Listing preview ${idx + 1}`}
                  className="w-full h-full object-cover"
                />
                {idx === 0 && (
                  <span className="absolute bottom-1.5 left-1.5 px-1.5 py-0.5 rounded-md bg-primary-600 text-white text-[9px] font-black uppercase tracking-wider shadow-xs">
                    Cover
                  </span>
                )}
                <button
                  type="button"
                  onClick={() => handleRemovePhoto(idx)}
                  className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-crimson-600 transition-colors"
                  title="Remove photo"
                  aria-label="Remove photo"
                >
                  <X size={12} strokeWidth={2.6} />
                </button>
              </div>
            ))}
          </div>

          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
            First Photo will be the cover, Use real photos not stock
          </p>

          {/* Quick demo photo picker when testing without local files */}
          {draft.photos.length === 0 && (
            <div className="flex items-center gap-1.5 flex-wrap pt-1">
              <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 flex items-center gap-1 mr-1">
                <ImagePlus size={11} />
                <span>Quick attach:</span>
              </span>
              {QUICK_SAMPLE_PHOTOS.map((sample) => (
                <button
                  key={sample.label}
                  type="button"
                  onClick={() => handleAddSamplePhoto(sample.url)}
                  className="px-2.5 py-1 rounded-lg bg-slate-100 hover:bg-primary-50 dark:bg-obsidian-850 dark:hover:bg-primary-950/40 text-slate-600 dark:text-slate-300 hover:text-primary-700 dark:hover:text-primary-300 text-[10px] font-bold border border-slate-200/80 dark:border-obsidian-750 transition-colors cursor-pointer"
                >
                  + {sample.label}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Title Input */}
        <div className="flex flex-col gap-1.5">
          <label
            htmlFor="sell-item-title"
            className="text-[11px] font-extrabold text-slate-700 dark:text-slate-300 tracking-wider uppercase flex items-center gap-1"
          >
            <span>Title</span>
            <span className="text-crimson-500">*</span>
          </label>
          <Input
            id="sell-item-title"
            placeholder="e.g., Solid Wood Sofa"
            value={draft.title}
            onChange={(e) => onChange({ title: e.target.value })}
            maxLength={100}
          />
        </div>

        {/* Description Textarea with Character Counter */}
        <div className="flex flex-col gap-1.5">
          <Textarea
            label="Description"
            rows={5}
            maxLength={500}
            placeholder="Describe your item in detail..."
            value={draft.description}
            onChange={(e) => onChange({ description: e.target.value })}
          />
          <div className="flex justify-end">
            <span className="text-[11px] font-mono font-medium text-slate-400 dark:text-slate-500">
              {draft.description.length}/500 characters
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
