import React from 'react';
import {
  Icon3DProps,
  Armchair3D,
  ParcelBox3D,
  Smartphone3D,
  ServiceVerified3D,
  FashionTee3D,
  FoodCutlery3D,
  VehicleCar3D,
  Book3D,
  BabyProduct3D,
  Parking3D,
  Paw3D,
  Sofa3D,
  Bed3D,
  Crib3D,
  Planter3D,
  Dining3D,
  DeskLamp3D,
} from './SellItem3DIcons';

export type SellWizardStep =
  | 'category'
  | 'subcategory'
  | 'details'
  | 'photos'
  | 'delivery'
  | 'preview';

export interface SellCategoryConfig {
  id: string;
  label: string;
  icon: React.FC<Icon3DProps>;
  iconBg: string;
}

export interface SellSubCategoryConfig {
  id: string;
  label: string;
  icon: React.FC<Icon3DProps>;
  iconBg: string;
}

export interface SellItemDraft {
  category: string;
  subCategory: string;
  originalPrice: string;
  sellingPrice: string;
  isNegotiable: boolean;
  isFree: boolean;
  productType: string;
  condition: 'Like new' | 'Fairly used' | 'Old';
  yearOfPurchase: string;
  brand: string;
  productLink: string;
  photos: string[];
  title: string;
  description: string;
  location: string;
  deliveryMode: 'Buyer picks up' | 'I deliver nearby';
  showFlatNumber: boolean;
  contactMethod: 'Call' | 'Whatsapp' | 'Both';
}

export const SELL_CATEGORIES: SellCategoryConfig[] = [
  {
    id: 'Furniture & Decor',
    label: 'Furniture & Decor',
    icon: Armchair3D,
    iconBg: 'bg-orange-50/90 dark:bg-orange-950/35',
  },
  {
    id: 'Others',
    label: 'Others',
    icon: ParcelBox3D,
    iconBg: 'bg-amber-50/90 dark:bg-amber-950/35',
  },
  {
    id: 'Electronics & Appliances',
    label: 'Electronics & Appliances',
    icon: Smartphone3D,
    iconBg: 'bg-slate-100/90 dark:bg-obsidian-800',
  },
  {
    id: 'Services',
    label: 'Services',
    icon: ServiceVerified3D,
    iconBg: 'bg-primary-50/90 dark:bg-primary-950/35',
  },
  {
    id: 'Fashion & Accessories',
    label: 'Fashion & Accessories',
    icon: FashionTee3D,
    iconBg: 'bg-rose-50/90 dark:bg-rose-950/35',
  },
  {
    id: 'Food',
    label: 'Food',
    icon: FoodCutlery3D,
    iconBg: 'bg-stone-100/90 dark:bg-obsidian-800',
  },
  {
    id: 'Vehicles',
    label: 'Vehicles',
    icon: VehicleCar3D,
    iconBg: 'bg-amber-50/90 dark:bg-amber-950/35',
  },
  {
    id: 'Books, Sports & Hobbies',
    label: 'Books, Sports & Hobbies',
    icon: Book3D,
    iconBg: 'bg-crimson-50/90 dark:bg-crimson-950/35',
  },
  {
    id: 'Kids & Baby Products',
    label: 'Kids & Baby Products',
    icon: BabyProduct3D,
    iconBg: 'bg-sky-50/90 dark:bg-sky-950/35',
  },
  {
    id: 'Parking',
    label: 'Parking',
    icon: Parking3D,
    iconBg: 'bg-blue-50/90 dark:bg-blue-950/35',
  },
  {
    id: 'Pets',
    label: 'Pets',
    icon: Paw3D,
    iconBg: 'bg-indigo-50/90 dark:bg-indigo-950/35',
  },
];

export const SUB_CATEGORIES_BY_CATEGORY: Record<string, SellSubCategoryConfig[]> = {
  'Furniture & Decor': [
    {
      id: 'Living Room',
      label: 'Living Room',
      icon: Sofa3D,
      iconBg: 'bg-orange-50/90 dark:bg-orange-950/35',
    },
    {
      id: 'Bedroom',
      label: 'Bedroom',
      icon: Bed3D,
      iconBg: 'bg-indigo-50/90 dark:bg-indigo-950/35',
    },
    {
      id: 'Kids Furniture',
      label: 'Kids Furniture',
      icon: Crib3D,
      iconBg: 'bg-amber-50/90 dark:bg-amber-950/35',
    },
    {
      id: 'Decor & Garden',
      label: 'Decor & Garden',
      icon: Planter3D,
      iconBg: 'bg-primary-50/90 dark:bg-primary-950/35',
    },
    {
      id: 'Dining',
      label: 'Dining',
      icon: Dining3D,
      iconBg: 'bg-stone-100/90 dark:bg-obsidian-800',
    },
    {
      id: 'Study & Home Office',
      label: 'Study & Home Office',
      icon: DeskLamp3D,
      iconBg: 'bg-sky-50/90 dark:bg-sky-950/35',
    },
    {
      id: 'Other',
      label: 'Other',
      icon: ParcelBox3D,
      iconBg: 'bg-amber-50/90 dark:bg-amber-950/35',
    },
  ],
  'Electronics & Appliances': [
    { id: 'Phones & Tablets', label: 'Phones & Tablets', icon: Smartphone3D, iconBg: 'bg-slate-100/90 dark:bg-obsidian-800' },
    { id: 'Kitchen Appliances', label: 'Kitchen Appliances', icon: FoodCutlery3D, iconBg: 'bg-orange-50/90 dark:bg-orange-950/35' },
    { id: 'Workstations & Audio', label: 'Workstations & Audio', icon: DeskLamp3D, iconBg: 'bg-indigo-50/90 dark:bg-indigo-950/35' },
    { id: 'Other', label: 'Other', icon: ParcelBox3D, iconBg: 'bg-amber-50/90 dark:bg-amber-950/35' },
  ],
  'Kids & Baby Products': [
    { id: 'Strollers & Gear', label: 'Strollers & Gear', icon: BabyProduct3D, iconBg: 'bg-sky-50/90 dark:bg-sky-950/35' },
    { id: 'Toys & Building Sets', label: 'Toys & Building Sets', icon: ParcelBox3D, iconBg: 'bg-amber-50/90 dark:bg-amber-950/35' },
    { id: 'Books & Learning', label: 'Books & Learning', icon: Book3D, iconBg: 'bg-primary-50/90 dark:bg-primary-950/35' },
    { id: 'Other', label: 'Other', icon: ParcelBox3D, iconBg: 'bg-slate-100/90 dark:bg-obsidian-800' },
  ],
  Food: [
    { id: 'Home Bakes & Breads', label: 'Home Bakes & Breads', icon: FoodCutlery3D, iconBg: 'bg-amber-50/90 dark:bg-amber-950/35' },
    { id: 'Tiffin & Meals', label: 'Tiffin & Meals', icon: Dining3D, iconBg: 'bg-primary-50/90 dark:bg-primary-950/35' },
    { id: 'Snacks & Organic', label: 'Snacks & Organic', icon: Planter3D, iconBg: 'bg-orange-50/90 dark:bg-orange-950/35' },
    { id: 'Other', label: 'Other', icon: ParcelBox3D, iconBg: 'bg-slate-100/90 dark:bg-obsidian-800' },
  ],
};

export function getSubCategoriesForCategory(categoryId: string): SellSubCategoryConfig[] {
  if (SUB_CATEGORIES_BY_CATEGORY[categoryId]) {
    return SUB_CATEGORIES_BY_CATEGORY[categoryId];
  }
  const catMeta = SELL_CATEGORIES.find((c) => c.id === categoryId) || SELL_CATEGORIES[0];
  return [
    {
      id: `${categoryId} — Standard`,
      label: `${categoryId} Item`,
      icon: catMeta.icon,
      iconBg: catMeta.iconBg,
    },
    {
      id: 'Accessories & Add-ons',
      label: 'Accessories & Add-ons',
      icon: ParcelBox3D,
      iconBg: 'bg-slate-100/90 dark:bg-obsidian-800',
    },
    {
      id: 'Other',
      label: 'Other',
      icon: ParcelBox3D,
      iconBg: 'bg-amber-50/90 dark:bg-amber-950/35',
    },
  ];
}

export const PRODUCT_TYPES_BY_SUBCATEGORY: Record<string, string[]> = {
  'Living Room': ['Sofa / Sectional', 'Coffee Table', 'TV Console', 'Recliner / Accent Chair', 'Bookshelf', 'Center Rug', 'Other'],
  Bedroom: ['Queen / King Bed', 'Wardrobe', 'Mattress', 'Bedside Table', 'Dresser', 'Other'],
  'Kids Furniture': ['Study Desk', 'Bunk Bed', 'Crib / Cot', 'Toy Organizer', 'Other'],
  'Decor & Garden': ['Indoor Planter', 'Wall Art / Mirror', 'Floor Lamp', 'Balcony Seating', 'Other'],
  Dining: ['4/6-Seater Dining Set', 'Dining Chairs', 'Crockery Unit', 'Bar Stools', 'Other'],
  'Study & Home Office': ['Ergonomic Chair', 'Study Table', 'Monitor Stand', 'Filing Cabinet', 'Other'],
};

export function getProductTypesForSelection(category: string, subCategory: string): string[] {
  if (PRODUCT_TYPES_BY_SUBCATEGORY[subCategory]) {
    return PRODUCT_TYPES_BY_SUBCATEGORY[subCategory];
  }
  if (category === 'Electronics & Appliances') {
    return ['Air Fryer / Kitchen Appliance', 'Smartphone / Tablet', 'Laptop / Monitor', 'Audio / Speaker', 'Smart Home Device', 'Other'];
  }
  if (category === 'Vehicles') {
    return ['Hatchback / Sedan', 'Scooter / Motorcycle', 'Bicycle / E-Bike', 'Helmet / Riding Gear', 'Other'];
  }
  if (category === 'Kids & Baby Products') {
    return ['Stroller / Pram', 'High Chair', 'Building Blocks / Toys', 'Kids Bicycle', 'Other'];
  }
  if (category === 'Food') {
    return ['Artisan Sourdough / Bread', 'Cakes & Desserts', 'Homemade Tiffin', 'Organic Produce', 'Other'];
  }
  return ['Standard Item', 'Premium / Branded', 'Custom / Handmade', 'Other'];
}

export const PURCHASE_YEARS: string[] = [
  '2026',
  '2025',
  '2024',
  '2023',
  '2022',
  '2021',
  '2020',
  '2019 or earlier',
];

export const RESIDENT_LOCATIONS: string[] = [
  'Tower 2 - 1204, Hunt Lockdoor',
  'Tower 2 Lobby, Hunt Lockdoor',
  'Gate 1 Guard Security Desk',
  'Clubhouse Concierge Desk',
];

export const QUICK_SAMPLE_PHOTOS: { label: string; url: string }[] = [
  {
    label: 'Sofa / Living',
    url: 'https://images.unsplash.com/photo-1555041469-a586c61ea9bc?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Study Desk',
    url: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
  },
  {
    label: 'Appliance',
    url: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80',
  },
];

export const INITIAL_SELL_DRAFT: SellItemDraft = {
  category: 'Furniture & Decor',
  subCategory: 'Living Room',
  originalPrice: '',
  sellingPrice: '',
  isNegotiable: false,
  isFree: false,
  productType: '',
  condition: 'Like new',
  yearOfPurchase: '2026',
  brand: '',
  productLink: '',
  photos: [],
  title: '',
  description: '',
  location: RESIDENT_LOCATIONS[0],
  deliveryMode: 'Buyer picks up',
  showFlatNumber: true,
  contactMethod: 'Both',
};
