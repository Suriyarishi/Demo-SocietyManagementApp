import React, { useState } from 'react';
import {
  ArrowLeft,
  Store,
  Plus,
  Search,
  Tag,
  ShieldCheck,
  CheckCircle2,
  Heart,
  ChevronRight,
  Filter,
  Sparkles,
  ShoppingBag
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';

export interface MarketplaceItem {
  id: string;
  title: string;
  category: 'Furniture' | 'Electronics' | 'Kids & Toys' | 'Home Bakes' | 'Freecycle';
  price: number;
  condition: 'Brand New' | 'Like New' | 'Gently Used' | 'Freecycle (₹0)';
  sellerName: string;
  sellerUnit: string;
  sellerRating: string;
  postedAgo: string;
  handover: string;
  description: string;
  imageUrl?: string;
  likes: number;
}

export const SAMPLE_MARKETPLACE_ITEMS: MarketplaceItem[] = [
  {
    id: 'mkt_01',
    title: 'Solid Teak Wood Study Table with 3 Drawers',
    category: 'Furniture',
    price: 3800,
    condition: 'Like New',
    sellerName: 'Vikram Mehta',
    sellerUnit: 'Tower 3 - 802',
    sellerRating: '4.9 ★',
    postedAgo: '2h ago',
    handover: 'Tower 3 Lobby or Unit 802',
    description: 'Selling because we are renovating study room into nursery. Extremely sturdy teak wood, zero scratches, drawer locks intact with key.',
    likes: 8,
  },
  {
    id: 'mkt_02',
    title: 'Philips Digital Air Fryer 4.1L (Rapid Air)',
    category: 'Electronics',
    price: 2400,
    condition: 'Gently Used',
    sellerName: 'Priya Sundaram',
    sellerUnit: 'Tower 1 - 504',
    sellerRating: '5.0 ★',
    postedAgo: '4h ago',
    handover: 'Leave at Gate 1 Guard Desk or Flat Handover',
    description: 'Used for 6 months. Works flawlessly with original non-stick basket and recipe booklet. Upgrading to dual-zone model.',
    likes: 14,
  },
  {
    id: 'mkt_03',
    title: 'Freshly Baked Sourdough Loaf & Chocolate Babka',
    category: 'Home Bakes',
    price: 350,
    condition: 'Brand New',
    sellerName: 'Chef Ananya (Home Baker)',
    sellerUnit: 'Tower 4 - 302',
    sellerRating: '5.0 ★',
    postedAgo: 'Today 8 AM',
    handover: 'Pick up from Tower 4 Lobby at 5 PM',
    description: '100% organic flour, 36-hour cold fermented artisan sourdough with crispy crust. Batch of 6 loaves baked fresh this morning!',
    likes: 27,
  },
  {
    id: 'mkt_04',
    title: 'Pre-Loved Lego Classic Creative Bricks (790 pcs)',
    category: 'Kids & Toys',
    price: 950,
    condition: 'Gently Used',
    sellerName: 'Kavita N',
    sellerUnit: 'Tower 2 - 904',
    sellerRating: '4.8 ★',
    postedAgo: '1d ago',
    handover: 'Tower 2 Podium Play Area',
    description: 'Cleaned and sanitized in storage tub. All essential building pieces intact with base plate.',
    likes: 11,
  },
  {
    id: 'mkt_05',
    title: 'Indoor Ficus Bonsai Tree & Ceramic Planter',
    category: 'Freecycle',
    price: 0,
    condition: 'Freecycle (₹0)',
    sellerName: 'Dr. Aruna Rao',
    sellerUnit: 'Tower 1 - 404',
    sellerRating: '4.9 ★',
    postedAgo: 'Yesterday',
    handover: 'Free to good home • Collect from Unit 404',
    description: 'Healthy 3-year-old bonsai plant. Moving overseas soon so giving away to plant enthusiasts in our society.',
    likes: 35,
  },
];

interface MarketplaceHubScreenProps {
  onBack?: () => void;
  onSelectItem: (item: MarketplaceItem) => void;
  onCreateListing: () => void;
}

export const MarketplaceHubScreen: React.FC<MarketplaceHubScreenProps> = ({
  onBack,
  onSelectItem,
  onCreateListing,
}) => {
  const [items, setItems] = useState<MarketplaceItem[]>(SAMPLE_MARKETPLACE_ITEMS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleLike = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    setItems((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, likes: item.likes + 1 } : item
      )
    );
    showToast('Saved to your marketplace wishlist');
  };

  const filteredItems = items.filter((item) => {
    const matchesCat = selectedCategory === 'All' || item.category === selectedCategory;
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.sellerUnit.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-24 text-left animate-in fade-in duration-200">
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
            {onBack && (
              <button
                type="button"
                onClick={onBack}
                className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
                title="Back to Previous Screen"
              >
                <ArrowLeft size={18} strokeWidth={2.4} />
              </button>
            )}
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                COMMUNITY MARKETPLACE
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Resident Pre-Loved & Goods
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={onCreateListing}
            className="h-9 px-3 rounded-2xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors press-scale"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>Sell Item</span>
          </button>
        </div>

        {/* Zero-Brokerage Trust Banner */}
        <div className="p-3.5 rounded-2xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-teal-500/10 border border-emerald-500/30 text-xs flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0 shadow-sm">
              <ShieldCheck size={16} />
            </div>
            <div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs">
                Zero Brokerage • 100% Verified Residents
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300">
                Direct tower-to-tower handover or security desk drop-off
              </p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <Input
          placeholder="Search pre-loved furniture, bakes, toys, electronics..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />

        {/* Categories Bar */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {['All', 'Furniture', 'Electronics', 'Kids & Toys', 'Home Bakes', 'Freecycle'].map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setSelectedCategory(cat)}
              className={`h-8 px-3 rounded-xl text-xs font-bold whitespace-nowrap transition-all press-scale ${
                selectedCategory === cat
                  ? 'bg-cobalt-600 text-white shadow-sm'
                  : 'bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-800 text-slate-600 dark:text-slate-300'
              }`}
            >
              {cat === 'Freecycle' ? '🎁 Freecycle (₹0)' : cat}
            </button>
          ))}
        </div>

        {/* Classified Listings Feed */}
        <div className="flex flex-col gap-3">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-2.5 cursor-pointer hover:border-cobalt-300 dark:hover:border-cobalt-700 transition-all press-scale"
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <Badge
                    variant={item.price === 0 ? 'emerald' : 'cobalt'}
                    size="sm"
                  >
                    {item.condition}
                  </Badge>
                  <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">
                    {item.category}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={(e) => handleLike(item.id, e)}
                  className="w-7 h-7 rounded-lg bg-slate-100 hover:bg-rose-50 dark:bg-obsidian-800 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-colors"
                >
                  <Heart size={14} />
                </button>
              </div>

              <div>
                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white leading-snug">
                  {item.title}
                </h3>
                <p className="text-[11px] text-slate-500 font-medium line-clamp-2 mt-0.5 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Seller Row */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-obsidian-800">
                <div>
                  <span className="text-sm font-extrabold text-slate-900 dark:text-white">
                    {item.price === 0 ? (
                      <span className="text-emerald-600 dark:text-emerald-400 font-bold">FREE GIVEAWAY</span>
                    ) : (
                      `₹${item.price.toLocaleString()}`
                    )}
                  </span>
                  <span className="text-[10px] text-slate-400 block">
                    {item.sellerUnit} • {item.postedAgo}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-cobalt-600 dark:text-cobalt-400 font-bold text-xs">
                  <span>Chat & Buy</span>
                  <ChevronRight size={14} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
