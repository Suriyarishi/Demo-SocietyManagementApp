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
import { MarketplaceBox3D } from '../../components/3d/Vector3DElements';

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
    imageUrl: 'https://images.unsplash.com/photo-1518455027359-f3f8164ba6bd?auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1585659722983-3a675dabf23d?auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1585366119957-e9730b6d0f60?auto=format&fit=crop&w=600&q=80',
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
    imageUrl: 'https://images.unsplash.com/photo-1512428813834-c702c7702b78?auto=format&fit=crop&w=600&q=80',
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

        {/* Zero-Brokerage Trust Banner with 3D Marketplace Package */}
        <div className="p-3.5 rounded-3xl bg-gradient-to-r from-emerald-500/10 via-emerald-500/5 to-teal-500/10 border border-emerald-500/30 text-xs flex items-center justify-between shadow-sm relative overflow-hidden">
          <div className="flex items-center gap-3">
            <MarketplaceBox3D size={50} />
            <div>
              <div className="flex items-center gap-1.5 mb-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                <span className="text-[10px] font-extrabold text-emerald-700 dark:text-emerald-400 uppercase tracking-widest">
                  100% Resident Verified
                </span>
              </div>
              <h4 className="font-extrabold text-slate-900 dark:text-white text-xs leading-tight">
                Zero Brokerage Marketplace
              </h4>
              <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-0.5">
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
        <div className="flex flex-col gap-3.5">
          {filteredItems.map((item) => (
            <div
              key={item.id}
              onClick={() => onSelectItem(item)}
              className="p-3.5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-xs flex flex-col gap-3 cursor-pointer hover:border-[#04bb49]/60 dark:hover:border-[#04bb49]/60 hover:shadow-md transition-all press-scale group overflow-hidden"
            >
              {/* Product Photo Banner */}
              {item.imageUrl ? (
                <div className="w-full h-44 rounded-2xl overflow-hidden relative bg-slate-100 dark:bg-obsidian-800">
                  <img
                    src={item.imageUrl}
                    alt={item.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    loading="lazy"
                  />

                  {/* Floating Badges on Image */}
                  <div className="absolute top-2.5 left-2.5 flex items-center gap-1.5 z-10">
                    <span
                      className={`px-2.5 py-1 rounded-xl text-[10px] font-extrabold uppercase tracking-wide backdrop-blur-md shadow-xs ${
                        item.price === 0
                          ? 'bg-emerald-500/95 text-white'
                          : 'bg-white/95 dark:bg-obsidian-900/95 text-slate-900 dark:text-white border border-white/20'
                      }`}
                    >
                      {item.condition}
                    </span>
                    <span className="px-2 py-0.5 rounded-lg text-[9.5px] font-bold uppercase tracking-wider bg-black/55 text-white backdrop-blur-md">
                      {item.category}
                    </span>
                  </div>

                  {/* Wishlist Heart Icon Floating Button */}
                  <button
                    type="button"
                    onClick={(e) => handleLike(item.id, e)}
                    className="absolute top-2.5 right-2.5 w-8 h-8 rounded-full bg-white/95 dark:bg-obsidian-900/95 backdrop-blur-md text-slate-500 hover:text-rose-500 flex items-center justify-center transition-colors shadow-xs press-scale z-10"
                    title="Save to wishlist"
                    aria-label="Save to wishlist"
                  >
                    <Heart size={14} className={item.likes > 0 ? 'fill-rose-500 text-rose-500' : ''} />
                  </button>

                  <div className="absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-black/25 to-transparent pointer-events-none" />
                </div>
              ) : (
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2">
                    <Badge variant={item.price === 0 ? 'emerald' : 'cobalt'} size="sm">
                      {item.condition}
                    </Badge>
                    <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                      {item.category}
                    </span>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => handleLike(item.id, e)}
                    className="w-8 h-8 rounded-xl bg-slate-100 hover:bg-rose-50 dark:bg-obsidian-800 dark:hover:bg-rose-950/60 text-slate-400 hover:text-rose-500 flex items-center justify-center transition-colors"
                  >
                    <Heart size={14} />
                  </button>
                </div>
              )}

              {/* Title & Description */}
              <div className="px-0.5">
                <h3 className="font-extrabold text-[13.5px] sm:text-sm text-slate-900 dark:text-white leading-snug group-hover:text-[#04bb49] transition-colors">
                  {item.title}
                </h3>
                <p className="text-[11.5px] text-slate-500 dark:text-slate-400 font-medium line-clamp-2 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </div>

              {/* Price & Seller Row */}
              <div className="flex items-center justify-between pt-2.5 border-t border-slate-100 dark:border-obsidian-800 px-0.5">
                <div>
                  <span className="text-sm font-black text-slate-900 dark:text-white block">
                    {item.price === 0 ? (
                      <span className="text-[#04bb49] font-black">FREE GIVEAWAY</span>
                    ) : (
                      `₹${item.price.toLocaleString()}`
                    )}
                  </span>
                  <span className="text-[10px] text-slate-500 dark:text-slate-400 font-medium block mt-0.5">
                    {item.sellerUnit} • {item.postedAgo}
                  </span>
                </div>

                <div className="flex items-center gap-1 text-[#04bb49] font-black text-xs group-hover:translate-x-0.5 transition-transform">
                  <span>Chat & Buy</span>
                  <ChevronRight size={14} strokeWidth={2.4} />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
