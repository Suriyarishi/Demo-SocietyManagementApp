import React from 'react';
import {
  SELL_CATEGORIES,
  getSubCategoriesForCategory,
} from './sellItemData';

interface CategoryStepProps {
  mode: 'category' | 'subcategory';
  selectedCategory: string;
  selectedSubCategory: string;
  onSelectCategory: (categoryId: string) => void;
  onSelectSubCategory: (subCategoryId: string) => void;
}

export const CategoryStep: React.FC<CategoryStepProps> = ({
  mode,
  selectedCategory,
  selectedSubCategory,
  onSelectCategory,
  onSelectSubCategory,
}) => {
  if (mode === 'category') {
    return (
      <div className="flex flex-col gap-4 animate-in fade-in duration-200">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
            What are you listing?
          </h2>
        </div>

        {/* 3-Column Category Grid with 3D Vector Icons */}
        <div className="p-3 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient">
          <div className="grid grid-cols-3 gap-2">
            {SELL_CATEGORIES.map((cat) => {
              const Icon3D = cat.icon;
              const isSelected = selectedCategory === cat.id;

              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => onSelectCategory(cat.id)}
                  className={`flex flex-col items-center justify-start gap-2 p-2 rounded-2xl border transition-all duration-150 press-scale cursor-pointer text-center min-h-[100px] ${
                    isSelected
                      ? 'bg-primary-50/90 dark:bg-primary-950/35 border-primary-300 dark:border-primary-700/60 shadow-2xs ring-1 ring-primary-500/20'
                      : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-obsidian-850'
                  }`}
                >
                  <div
                    className={`w-12 h-12 p-1.5 rounded-2xl ${cat.iconBg} flex items-center justify-center shrink-0 shadow-2xs border border-black/5 dark:border-white/10 transition-transform ${
                      isSelected ? 'scale-105' : ''
                    }`}
                  >
                    <Icon3D size={34} />
                  </div>
                  <span
                    className={`text-[11px] leading-tight font-bold line-clamp-2 ${
                      isSelected
                        ? 'text-primary-800 dark:text-primary-300'
                        : 'text-slate-700 dark:text-slate-200'
                    }`}
                  >
                    {cat.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    );
  }

  const subCategories = getSubCategoriesForCategory(selectedCategory);

  return (
    <div className="flex flex-col gap-4 animate-in fade-in duration-200">
      <div>
        <span className="text-xs font-bold text-slate-500 dark:text-slate-400 block mb-0.5">
          Select Sub Category
        </span>
        <h2 className="text-xl font-extrabold text-slate-900 dark:text-white tracking-tight leading-snug">
          What best describes your listing?
        </h2>
      </div>

      {/* Vertical Sub-Category List Card with 3D Vector Icons */}
      <div className="p-2 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-ambient flex flex-col gap-1">
        {subCategories.map((sub) => {
          const Icon3D = sub.icon;
          const isSelected = selectedSubCategory === sub.id;

          return (
            <button
              key={sub.id}
              type="button"
              onClick={() => onSelectSubCategory(sub.id)}
              className={`w-full flex items-center gap-3.5 px-3 py-2.5 rounded-2xl border transition-all duration-150 press-scale cursor-pointer text-left ${
                isSelected
                  ? 'bg-primary-50/90 dark:bg-primary-950/35 border-primary-300 dark:border-primary-700/60 shadow-2xs'
                  : 'bg-transparent border-transparent hover:bg-slate-50 dark:hover:bg-obsidian-850'
              }`}
            >
              <div
                className={`w-11 h-11 rounded-xl ${sub.iconBg} flex items-center justify-center shrink-0 border border-black/5 dark:border-white/10`}
              >
                <Icon3D size={30} />
              </div>
              <span
                className={`text-sm font-bold flex-1 ${
                  isSelected
                    ? 'text-primary-800 dark:text-primary-300'
                    : 'text-slate-800 dark:text-slate-100'
                }`}
              >
                {sub.label}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
