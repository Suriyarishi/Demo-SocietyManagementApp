import {
  Armchair,
  Package,
  Smartphone,
  UserCheck,
  Shirt,
  Utensils,
  Car,
  BookOpen,
  Baby,
  SquareParking,
  PawPrint,
  Sofa,
  Bed,
  Flower2,
  UtensilsCrossed,
  LampDesk,
  LucideIcon,
} from 'lucide-react';

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
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
}

export interface SellSubCategoryConfig {
  id: string;
  label: string;
  icon: LucideIcon;
  iconBg: string;
  iconColor: string;
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
    icon: Armchair,
    iconBg: 'bg-orange-50 dark:bg-orange-950/40',
    iconColor: 'text-orange-600 dark:text-orange-400',
  },
  {
    id: 'Others',
    label: 'Others',
    icon: Package,
    iconBg: 'bg-yellow-50 dark:bg-yellow-950/40',
    iconColor: 'text-amber-700 dark:text-amber-300',
  },
  {
    id: 'Electronics & Appliances',
    label: 'Electronics & Appliances',
    icon: Smartphone,
    iconBg: 'bg-slate-100 dark:bg-obsidian-800',
    iconColor: 'text-slate-700 dark:text-slate-200',
  },
  {
    id: 'Services',
    label: 'Services',
    icon: UserCheck,
    iconBg: 'bg-primary-50 dark:bg-primary-950/40',
    iconColor: 'text-primary-600 dark:text-primary-400',
  },
  {
    id: 'Fashion & Accessories',
    label: 'Fashion & Accessories',
    icon: Shirt,
    iconBg: 'bg-rose-50 dark:bg-rose-950/40',
    iconColor: 'text-rose-500 dark:text-rose-400',
  },
  {
    id: 'Food',
    label: 'Food',
    icon: Utensils,
    iconBg: 'bg-stone-100 dark:bg-obsidian-800',
    iconColor: 'text-stone-600 dark:text-stone-300',
  },
  {
    id: 'Vehicles',
    label: 'Vehicles',
    icon: Car,
    iconBg: 'bg-amber-50 dark:bg-amber-950/40',
    iconColor: 'text-amber-600 dark:text-amber-400',
  },
  {
    id: 'Books, Sports & Hobbies',
    label: 'Books, Sports & Hobbies',
    icon: BookOpen,
    iconBg: 'bg-crimson-50 dark:bg-crimson-950/40',
    iconColor: 'text-crimson-600 dark:text-crimson-400',
  },
  {
    id: 'Kids & Baby Products',
    label: 'Kids & Baby Products',
    icon: Baby,
    iconBg: 'bg-sky-50 dark:bg-sky-950/40',
    iconColor: 'text-sky-600 dark:text-sky-400',
  },
  {
    id: 'Parking',
    label: 'Parking',
    icon: SquareParking,
    iconBg: 'bg-blue-50 dark:bg-blue-950/40',
    iconColor: 'text-blue-600 dark:text-blue-400',
  },
  {
    id: 'Pets',
    label: 'Pets',
    icon: PawPrint,
    iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
    iconColor: 'text-indigo-600 dark:text-indigo-400',
  },
];

export const SUB_CATEGORIES_BY_CATEGORY: Record<string, SellSubCategoryConfig[]> = {
  'Furniture & Decor': [
    {
      id: 'Living Room',
      label: 'Living Room',
      icon: Sofa,
      iconBg: 'bg-orange-50 dark:bg-orange-950/40',
      iconColor: 'text-orange-600 dark:text-orange-400',
    },
    {
      id: 'Bedroom',
      label: 'Bedroom',
      icon: Bed,
      iconBg: 'bg-indigo-50 dark:bg-indigo-950/40',
      iconColor: 'text-indigo-600 dark:text-indigo-400',
    },
    {
      id: 'Kids Furniture',
      label: 'Kids Furniture',
      icon: Baby,
      iconBg: 'bg-amber-50 dark:bg-amber-950/40',
      iconColor: 'text-amber-600 dark:text-amber-400',
    },
    {
      id: 'Decor & Garden',
      label: 'Decor & Garden',
      icon: Flower2,
      iconBg: 'bg-primary-50 dark:bg-primary-950/40',
      iconColor: 'text-primary-600 dark:text-primary-400',
    },
    {
      id: 'Dining',
      label: 'Dining',
      icon: UtensilsCrossed,
      iconBg: 'bg-stone-100 dark:bg-obsidian-800',
      iconColor: 'text-stone-600 dark:text-stone-300',
    },
    {
      id: 'Study & Home Office',
      label: 'Study & Home Office',
      icon: LampDesk,
      iconBg: 'bg-sky-50 dark:bg-sky-950/40',
      iconColor: 'text-sky-600 dark:text-sky-400',
    },
    {
      id: 'Other',
      label: 'Other',
      icon: Package,
      iconBg: 'bg-yellow-50 dark:bg-yellow-950/40',
      iconColor: 'text-amber-700 dark:text-amber-300',
    },
  ],
  'Electronics & Appliances': [
    { id: 'Phones & Tablets', label: 'Phones & Tablets', icon: Smartphone, iconBg: 'bg-slate-100 dark:bg-obsidian-800', iconColor: 'text-slate-700 dark:text-slate-200' },
    { id: 'Kitchen Appliances', label: 'Kitchen Appliances', icon: UtensilsCrossed, iconBg: 'bg-orange-50 dark:bg-orange-950/40', iconColor: 'text-orange-600 dark:text-orange-400' },
    { id: 'Workstations & Audio', label: 'Workstations & Audio', icon: LampDesk, iconBg: 'bg-indigo-50 dark:bg-indigo-950/40', iconColor: 'text-indigo-600 dark:text-indigo-400' },
    { id: 'Other', label: 'Other', icon: Package, iconBg: 'bg-yellow-50 dark:bg-yellow-950/40', iconColor: 'text-amber-700 dark:text-amber-300' },
  ],
  'Kids & Baby Products': [
    { id: 'Strollers & Gear', label: 'Strollers & Gear', icon: Baby, iconBg: 'bg-sky-50 dark:bg-sky-950/40', iconColor: 'text-sky-600 dark:text-sky-400' },
    { id: 'Toys & Building Sets', label: 'Toys & Building Sets', icon: Package, iconBg: 'bg-amber-50 dark:bg-amber-950/40', iconColor: 'text-amber-600 dark:text-amber-400' },
    { id: 'Books & Learning', label: 'Books & Learning', icon: BookOpen, iconBg: 'bg-primary-50 dark:bg-primary-950/40', iconColor: 'text-primary-600 dark:text-primary-400' },
    { id: 'Other', label: 'Other', icon: Package, iconBg: 'bg-slate-100 dark:bg-obsidian-800', iconColor: 'text-slate-600 dark:text-slate-300' },
  ],
  Food: [
    { id: 'Home Bakes & Breads', label: 'Home Bakes & Breads', icon: Utensils, iconBg: 'bg-amber-50 dark:bg-amber-950/40', iconColor: 'text-amber-600 dark:text-amber-400' },
    { id: 'Tiffin & Meals', label: 'Tiffin & Meals', icon: UtensilsCrossed, iconBg: 'bg-primary-50 dark:bg-primary-950/40', iconColor: 'text-primary-600 dark:text-primary-400' },
    { id: 'Snacks & Organic', label: 'Snacks & Organic', icon: Flower2, iconBg: 'bg-orange-50 dark:bg-orange-950/40', iconColor: 'text-orange-600 dark:text-orange-400' },
    { id: 'Other', label: 'Other', icon: Package, iconBg: 'bg-slate-100 dark:bg-obsidian-800', iconColor: 'text-slate-600 dark:text-slate-300' },
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
      iconColor: catMeta.iconColor,
    },
    {
      id: 'Accessories & Add-ons',
      label: 'Accessories & Add-ons',
      icon: Package,
      iconBg: 'bg-slate-100 dark:bg-obsidian-800',
      iconColor: 'text-slate-600 dark:text-slate-300',
    },
    {
      id: 'Other',
      label: 'Other',
      icon: Package,
      iconBg: 'bg-yellow-50 dark:bg-yellow-950/40',
      iconColor: 'text-amber-700 dark:text-amber-300',
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
