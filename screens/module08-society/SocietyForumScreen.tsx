import React, { useState } from 'react';
import {
  ArrowLeft,
  Search,
  Bell,
  Building2,
  ChevronDown,
  Image as ImageIcon,
  BarChart2,
  Megaphone,
  MessageSquare,
  Tag,
  MoreVertical,
  ThumbsUp,
  MessageCircle,
  Share2,
  Eye,
  Calendar,
  Clock,
  Plus,
  Send,
  X,
  Lock,
  Camera,
  Users,
  Store,
  HelpCircle,
  CheckCircle2,
  ChevronRight,
  Sparkles,
  PieChart,
  User,
  Heart
} from 'lucide-react';
import { AppBottomNav, RootTabType } from '../../components/AppBottomNav';

export interface ForumComment {
  id: string;
  author: string;
  unit: string;
  timeAgo: string;
  text: string;
  avatarUrl?: string;
  avatarInitials: string;
}

export interface ForumPostItem {
  id: string;
  type: 'notice' | 'classified' | 'general';
  category: 'Announcements' | 'General' | 'Buy & Sell' | 'Help';
  author: string;
  unit: string;
  roleSubtitle?: string;
  avatarUrl?: string;
  avatarInitials: string;
  timeAgo: string;
  title: string;
  description: string;
  price?: string;
  scheduleTime?: string;
  images?: string[];
  likes: number;
  commentsCount: number;
  views: number;
  userLiked?: boolean;
  comments?: ForumComment[];
}

const INITIAL_POSTS: ForumPostItem[] = [
  {
    id: 'notice_01',
    type: 'notice',
    category: 'Announcements',
    author: 'Society Notice',
    unit: 'Tower 10',
    roleSubtitle: 'By Society Admin · 2h ago',
    avatarInitials: 'SA',
    timeAgo: '2h ago',
    title: 'Water Supply Maintenance',
    description:
      'Water supply will be unavailable tomorrow from 10:00 AM to 2:00 PM due to pipeline maintenance. Please plan accordingly.',
    scheduleTime: 'Tomorrow, 10:00 AM - 2:00 PM',
    likes: 24,
    commentsCount: 8,
    views: 214,
    userLiked: false,
    comments: [
      {
        id: 'c_not_1',
        author: 'Ramesh Gupta',
        unit: 'Tower 10 · 0402',
        timeAgo: '1h ago',
        text: 'Will tankers be arranged for emergency usage on upper floors?',
        avatarInitials: 'RG',
      },
    ],
  },
  {
    id: 'market_01',
    type: 'classified',
    category: 'Buy & Sell',
    author: 'Shweta',
    unit: 'Tower 13 · 0801',
    roleSubtitle: 'Tower 13 · 0801 · 1d ago',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=300&q=80',
    avatarInitials: 'SW',
    timeAgo: '1d ago',
    title: 'Luvlap highchair',
    price: '₹500',
    description: 'Bought in June 2024.\nSelling price ₹500.\nPickup only.',
    images: [
      '/assets/forum/luvlap_highchair.jpg',
      '/assets/forum/luvlap_highchair.jpg',
      '/assets/forum/luvlap_highchair.jpg',
    ],
    likes: 12,
    commentsCount: 3,
    views: 35,
    userLiked: true,
    comments: [
      {
        id: 'c1',
        author: 'Faizan Ahmad',
        unit: 'Tower 11 · 0701',
        timeAgo: '46m ago',
        text: 'Is it still available?',
        avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=300&q=80',
        avatarInitials: 'FA',
      },
      {
        id: 'c2',
        author: 'Priya Nair',
        unit: 'Tower 12 · 0304',
        timeAgo: '30m ago',
        text: "Yes, it's available. You can DM me.",
        avatarUrl: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80',
        avatarInitials: 'PN',
      },
    ],
  },
  {
    id: 'gen_01',
    type: 'general',
    category: 'General',
    author: 'Kunal Sharma',
    unit: 'Tower 10 · G003',
    roleSubtitle: 'Tower 10 · G003 · 3d ago',
    avatarUrl: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=300&q=80',
    avatarInitials: 'KS',
    timeAgo: '3d ago',
    title: 'Weekend Badminton Doubles Match',
    description: 'Booked Court 2 at the Clubhouse this Saturday 7:00 AM - 8:30 AM. Need 2 intermediate players to join. Let me know in comments!',
    likes: 19,
    commentsCount: 5,
    views: 112,
    userLiked: false,
    comments: [],
  },
];

interface SocietyForumScreenProps {
  onBack: () => void;
  onNavigateTab?: (tab: RootTabType) => void;
}

export const SocietyForumScreen: React.FC<SocietyForumScreenProps> = ({ onBack, onNavigateTab }) => {
  // Navigation / View state: 'feed' | 'detail' | 'create'
  const [viewMode, setViewMode] = useState<'feed' | 'detail' | 'create'>('feed');
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [posts, setPosts] = useState<ForumPostItem[]>(INITIAL_POSTS);
  const [selectedPostId, setSelectedPostId] = useState<string>('market_01');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);

  // Bottom action sheet: "Start a conversation"
  const [showConversationSheet, setShowConversationSheet] = useState<boolean>(false);

  // Create post state
  const [createContent, setCreateContent] = useState<string>('');
  const [createCategory, setCreateCategory] = useState<'General' | 'Announcement' | 'Help' | 'Buy & Sell'>('General');
  const [hasAttachedImage, setHasAttachedImage] = useState<boolean>(true);

  // New comment input state (Screen 2)
  const [commentInput, setCommentInput] = useState<string>('');

  // Toast notification feedback
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  // Selected post object for detail view
  const currentPost = posts.find((p) => p.id === selectedPostId) || posts[1];

  // Like / Unlike handler
  const handleToggleLike = (postId: string, e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === postId) {
          const isLiked = !post.userLiked;
          return {
            ...post,
            userLiked: isLiked,
            likes: isLiked ? post.likes + 1 : post.likes - 1,
          };
        }
        return post;
      })
    );
  };

  // Add Comment handler
  const handleAddComment = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!commentInput.trim()) return;

    const newComment: ForumComment = {
      id: `c_${Date.now()}`,
      author: 'Vinay (You)',
      unit: 'Tower 10 · G003',
      timeAgo: 'Just now',
      text: commentInput.trim(),
      avatarInitials: 'VN',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
    };

    setPosts((prev) =>
      prev.map((post) => {
        if (post.id === currentPost.id) {
          return {
            ...post,
            commentsCount: post.commentsCount + 1,
            comments: [...(post.comments || []), newComment],
          };
        }
        return post;
      })
    );

    setCommentInput('');
    showToast('✓ Comment published to discussion thread');
  };

  // Publish Post handler (Screen 3)
  const handlePublishPost = () => {
    if (!createContent.trim() && !hasAttachedImage) {
      showToast('Please add your thoughts or attach an image');
      return;
    }

    const newPost: ForumPostItem = {
      id: `post_${Date.now()}`,
      type: createCategory === 'Buy & Sell' ? 'classified' : createCategory === 'Announcement' ? 'notice' : 'general',
      category: createCategory,
      author: 'Vinay',
      unit: 'Tower 10 · G003',
      roleSubtitle: 'Tower 10 · G003 · Just now',
      avatarUrl: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=300&q=80',
      avatarInitials: 'VN',
      timeAgo: 'Just now',
      title: createContent.trim().split('\n')[0].slice(0, 48) || 'Community Conversation',
      description: createContent.trim() || 'Attached item photo for society residents.',
      images: hasAttachedImage ? ['/assets/forum/luvlap_highchair.jpg'] : undefined,
      likes: 1,
      commentsCount: 0,
      views: 1,
      userLiked: true,
      comments: [],
    };

    setPosts([newPost, ...posts]);
    setCreateContent('');
    setViewMode('feed');
    showToast('✓ Discussion posted to Society Forum!');
  };

  // Filtered post list
  const filteredPosts = posts.filter((post) => {
    if (selectedCategory === 'All') return true;
    if (selectedCategory === 'Announcements') return post.category === 'Announcements' || post.type === 'notice';
    if (selectedCategory === 'General') return post.category === 'General' || post.type === 'general';
    if (selectedCategory === 'Buy & Sell') return post.category === 'Buy & Sell' || post.type === 'classified';
    return true;
  });

  return (
    <div className="w-full h-full flex flex-col justify-between bg-[#F8FAF9] dark:bg-[#070A11] text-slate-900 dark:text-white select-none relative overflow-hidden">
      {/* Toast Notification Container */}
      {toastMsg && (
        <div className="absolute top-14 left-4 right-4 z-50 p-3 rounded-2xl bg-[#0B1528]/95 dark:bg-[#070A11]/95 text-white border border-[#04BB49]/40 text-xs font-semibold shadow-2xl flex items-center gap-2.5 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={16} className="text-[#04BB49] shrink-0" />
          <span className="flex-1 text-[11px] leading-tight font-medium">{toastMsg}</span>
        </div>
      )}

      {/* ========================================================
          VIEW MODE 1: FORUM MAIN FEED (SCREEN 1)
          ======================================================== */}
      {viewMode === 'feed' && (
        <div className="w-full h-full flex flex-col justify-between overflow-hidden">
          {/* Top Sticky Header & Controls Bar */}
          <div className="w-full bg-white dark:bg-[#0B0F19] border-b border-slate-100 dark:border-white/5 pt-3 pb-2.5 px-4 flex flex-col gap-3 shadow-xs shrink-0 z-10">
            {/* Top Navigation Row: Back, Title, Search, Notification */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onBack}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors press-scale"
                  aria-label="Back to Society Hub"
                >
                  <ArrowLeft size={20} strokeWidth={2.4} />
                </button>
                <h1 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                  Forum
                </h1>
              </div>

              <div className="flex items-center gap-1.5">
                <button
                  type="button"
                  onClick={() => showToast('Search discussions, classifieds & notices')}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors press-scale"
                  aria-label="Search Forum"
                >
                  <Search size={19} strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={() => showToast('No new forum alerts')}
                  className="w-9 h-9 rounded-full flex items-center justify-center text-slate-700 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-white/10 transition-colors press-scale relative"
                  aria-label="Notifications"
                >
                  <Bell size={19} strokeWidth={2.2} />
                  <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-[#04BB49] ring-2 ring-white dark:ring-[#0B0F19]" />
                </button>
              </div>
            </div>

            {/* Residence Selector Pill (Green Mint theme) */}
            <button
              type="button"
              onClick={() => showToast('Society: Prestige Palm Heights')}
              className="w-full h-10 px-3.5 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] flex items-center justify-between transition-colors press-scale border border-[#04BB49]/15"
            >
              <div className="flex items-center gap-2 overflow-hidden">
                <div className="w-6 h-6 rounded-md bg-[#04BB49]/20 flex items-center justify-center text-[#04BB49] shrink-0">
                  <Building2 size={15} strokeWidth={2.3} />
                </div>
                <span className="text-xs font-bold tracking-tight truncate text-slate-900 dark:text-slate-100">
                  Prestige Palm Heights · Tower 10
                </span>
              </div>
              <ChevronDown size={16} strokeWidth={2.5} className="text-[#04BB49] shrink-0 ml-1" />
            </button>

            {/* Composer Bar: Resident avatar + "Share something..." + icons */}
            <div
              onClick={() => setShowConversationSheet(true)}
              className="w-full h-12 px-3 rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center justify-between cursor-pointer hover:border-[#04BB49]/40 transition-all press-scale shadow-xs"
            >
              <div className="flex items-center gap-2.5 flex-1 min-w-0 pr-2">
                <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80"
                    alt="Resident Avatar"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLElement).style.display = 'none';
                    }}
                  />
                </div>
                <span className="text-xs font-medium text-slate-400 dark:text-slate-400 truncate">
                  Share something with your society...
                </span>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCreateCategory('General');
                    setHasAttachedImage(true);
                    setViewMode('create');
                  }}
                  className="p-1.5 text-[#04BB49] hover:bg-[#E8FBF0] dark:hover:bg-[#0A2E18] rounded-lg transition-colors"
                  title="Attach Photo"
                >
                  <ImageIcon size={18} strokeWidth={2.2} />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setCreateCategory('Help');
                    setViewMode('create');
                  }}
                  className="p-1.5 text-[#04BB49] hover:bg-[#E8FBF0] dark:hover:bg-[#0A2E18] rounded-lg transition-colors"
                  title="Create Poll"
                >
                  <BarChart2 size={18} strokeWidth={2.2} />
                </button>
              </div>
            </div>

            {/* Category Pills Bar: All, Announcements, General, Buy & Sell */}
            <div className="flex items-center gap-2 overflow-x-auto no-scrollbar py-0.5">
              {/* Pill: All */}
              <button
                type="button"
                onClick={() => setSelectedCategory('All')}
                className={`h-8 px-3.5 rounded-full text-xs font-bold whitespace-nowrap transition-all duration-150 flex items-center gap-1 press-scale ${
                  selectedCategory === 'All'
                    ? 'bg-[#04BB49] text-white shadow-sm shadow-[#04BB49]/25'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-[#04BB49]/40'
                }`}
              >
                <span>All</span>
                <ChevronDown size={14} strokeWidth={2.5} />
              </button>

              {/* Pill: Announcements */}
              <button
                type="button"
                onClick={() => setSelectedCategory('Announcements')}
                className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 press-scale ${
                  selectedCategory === 'Announcements'
                    ? 'bg-[#04BB49] text-white shadow-sm'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-[#04BB49]/40'
                }`}
              >
                <Megaphone size={14} className={selectedCategory === 'Announcements' ? 'text-white' : 'text-amber-500'} />
                <span>Announcements</span>
              </button>

              {/* Pill: General */}
              <button
                type="button"
                onClick={() => setSelectedCategory('General')}
                className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 press-scale ${
                  selectedCategory === 'General'
                    ? 'bg-[#04BB49] text-white shadow-sm'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-[#04BB49]/40'
                }`}
              >
                <MessageSquare size={14} className={selectedCategory === 'General' ? 'text-white' : 'text-indigo-500'} />
                <span>General</span>
              </button>

              {/* Pill: Buy & Sell */}
              <button
                type="button"
                onClick={() => setSelectedCategory('Buy & Sell')}
                className={`h-8 px-3.5 rounded-full text-xs font-semibold whitespace-nowrap transition-all duration-150 flex items-center gap-1.5 press-scale ${
                  selectedCategory === 'Buy & Sell'
                    ? 'bg-[#04BB49] text-white shadow-sm'
                    : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200 hover:border-[#04BB49]/40'
                }`}
              >
                <Tag size={14} className={selectedCategory === 'Buy & Sell' ? 'text-white' : 'text-emerald-500'} />
                <span>Buy & Sell</span>
              </button>
            </div>
          </div>

          {/* Posts Feed Stream (Scrollable) */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-3.5 flex flex-col gap-3 pb-36">
            {filteredPosts.map((post) => {
              // Post 1: Notice / Announcement Style
              if (post.type === 'notice') {
                return (
                  <div
                    key={post.id}
                    className="w-full bg-white dark:bg-[#0B0F19] rounded-3xl p-4 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col gap-3 transition-all hover:border-[#04BB49]/35"
                  >
                    {/* Header Row: Notice Megaphone Icon + Author + Three dots */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2.5">
                        <div className="w-10 h-10 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] flex items-center justify-center text-[#04BB49] shrink-0 border border-[#04BB49]/20">
                          <Megaphone size={18} strokeWidth={2.4} />
                        </div>
                        <div>
                          <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                            {post.author}
                          </h3>
                          <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                            {post.roleSubtitle}
                          </p>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => showToast('Notice options')}
                        className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                      >
                        <MoreVertical size={16} />
                      </button>
                    </div>

                    {/* Notice Title & Content */}
                    <div>
                      <h4 className="text-sm font-extrabold text-slate-900 dark:text-white leading-snug">
                        {post.title}
                      </h4>
                      <p className="text-xs font-normal text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {post.description}
                      </p>
                    </div>

                    {/* Event Schedule Chip (Mint green pill) */}
                    {post.scheduleTime && (
                      <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] text-[11px] font-bold border border-[#04BB49]/20 w-fit">
                        <Calendar size={13} strokeWidth={2.4} />
                        <span>{post.scheduleTime}</span>
                      </div>
                    )}

                    {/* Engagement & Metric Footer */}
                    <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
                      <div className="flex items-center gap-4">
                        <button
                          type="button"
                          onClick={(e) => handleToggleLike(post.id, e)}
                          className={`flex items-center gap-1.5 transition-colors press-scale ${
                            post.userLiked ? 'text-[#04BB49] font-bold' : 'hover:text-slate-900 dark:hover:text-white'
                          }`}
                        >
                          <ThumbsUp size={14} className={post.userLiked ? 'fill-[#04BB49]' : ''} />
                          <span>{post.likes}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => {
                            setSelectedPostId(post.id);
                            setViewMode('detail');
                          }}
                          className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors press-scale"
                        >
                          <MessageCircle size={14} />
                          <span>{post.commentsCount}</span>
                        </button>

                        <button
                          type="button"
                          onClick={() => showToast('✓ Notice link shared')}
                          className="hover:text-slate-900 dark:hover:text-white transition-colors press-scale"
                        >
                          <Share2 size={14} />
                        </button>
                      </div>

                      <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                        <Eye size={13} />
                        <span>{post.views}</span>
                      </div>
                    </div>
                  </div>
                );
              }

              // Post 2: Marketplace / Classifieds Style (e.g. Luvlap highchair)
              return (
                <div
                  key={post.id}
                  onClick={() => {
                    setSelectedPostId(post.id);
                    setViewMode('detail');
                  }}
                  className="w-full bg-white dark:bg-[#0B0F19] rounded-3xl p-4 border border-slate-200/90 dark:border-white/10 shadow-xs flex flex-col gap-3 cursor-pointer transition-all hover:border-[#04BB49]/40 press-scale"
                >
                  {/* Header Row: Resident Avatar + Name & Tower + Three dots */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2.5">
                      <div className="w-9 h-9 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                        {post.avatarUrl ? (
                          <img src={post.avatarUrl} alt={post.author} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center font-bold text-xs text-white bg-[#04BB49]">
                            {post.avatarInitials}
                          </div>
                        )}
                      </div>
                      <div>
                        <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                          {post.author}
                        </h3>
                        <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                          {post.roleSubtitle || `${post.unit} · ${post.timeAgo}`}
                        </p>
                      </div>
                    </div>

                    <button
                      type="button"
                      onClick={(e) => {
                        e.stopPropagation();
                        showToast('Post options');
                      }}
                      className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
                    >
                      <MoreVertical size={16} />
                    </button>
                  </div>

                  {/* Body Content with Left Thumbnail (Highchair) & Right Details */}
                  {post.images && post.images.length > 0 ? (
                    <div className="flex items-start gap-3">
                      {/* Image Thumbnail */}
                      <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 shrink-0 border border-slate-200/80 dark:border-white/10 relative">
                        <img
                          src={post.images[0]}
                          alt={post.title}
                          className="w-full h-full object-cover"
                          onError={(e) => {
                            // Fallback to high quality baby chair image if local file isn't loaded
                            (e.target as HTMLImageElement).src =
                              'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80';
                          }}
                        />
                      </div>

                      {/* Right Text Details */}
                      <div className="flex-1 min-w-0">
                        <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                          {post.title}
                        </h4>
                        {post.price && (
                          <p className="text-sm font-extrabold text-[#04BB49] mt-0.5">
                            {post.price}
                          </p>
                        )}
                        <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-1 leading-snug line-clamp-2">
                          {post.description}
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <h4 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                        {post.title}
                      </h4>
                      <p className="text-xs font-normal text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {post.description}
                      </p>
                    </div>
                  )}

                  {/* Engagement & Metric Footer */}
                  <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-white/5 text-xs text-slate-500 dark:text-slate-400">
                    <div className="flex items-center gap-4">
                      <button
                        type="button"
                        onClick={(e) => handleToggleLike(post.id, e)}
                        className={`flex items-center gap-1.5 transition-colors press-scale ${
                          post.userLiked ? 'text-[#04BB49] font-bold' : 'hover:text-slate-900 dark:hover:text-white'
                        }`}
                      >
                        <ThumbsUp size={14} className={post.userLiked ? 'fill-[#04BB49]' : ''} />
                        <span>{post.likes}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedPostId(post.id);
                          setViewMode('detail');
                        }}
                        className="flex items-center gap-1.5 hover:text-slate-900 dark:hover:text-white transition-colors press-scale"
                      >
                        <MessageCircle size={14} />
                        <span>{post.commentsCount}</span>
                      </button>

                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          showToast('✓ Classified post shared with neighbours');
                        }}
                        className="hover:text-slate-900 dark:hover:text-white transition-colors press-scale"
                      >
                        <Share2 size={14} />
                      </button>
                    </div>

                    <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                      <Eye size={13} />
                      <span>{post.views}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Floating Action Button (FAB) at Bottom-Right */}
          <div className="absolute bottom-[98px] right-4 z-30">
            <button
              type="button"
              onClick={() => setShowConversationSheet(true)}
              className="w-14 h-14 rounded-full bg-[#04BB49] text-white flex items-center justify-center shadow-lg shadow-[#04BB49]/40 hover:bg-[#03963B] hover:scale-105 active:scale-95 transition-all duration-150 press-scale"
              aria-label="Start Conversation"
            >
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </button>
          </div>

          {/* Bottom Navigation Dock (Synchronized AppBottomNav: Home, Search, Society, Services, Profile) */}
          <AppBottomNav
            activeTab="society"
            onTabChange={(tab) => {
              if (tab === 'society') {
                setViewMode('feed');
              } else if (onNavigateTab) {
                onNavigateTab(tab);
              }
            }}
          />
        </div>
      )}

      {/* ========================================================
          VIEW MODE 2: POST DETAIL VIEW (SCREEN 2)
          ======================================================== */}
      {viewMode === 'detail' && (
        <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-white dark:bg-[#070A11] animate-in fade-in duration-200">
          {/* Header Bar */}
          <div className="w-full bg-white dark:bg-[#0B0F19] border-b border-slate-100 dark:border-white/5 pt-3 pb-2.5 px-4 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setViewMode('feed')}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors press-scale"
                aria-label="Back to Forum Feed"
              >
                <ArrowLeft size={20} strokeWidth={2.4} />
              </button>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Post
              </h2>
            </div>

            <button
              type="button"
              onClick={() => showToast('Post options')}
              className="text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 p-1"
            >
              <MoreVertical size={18} />
            </button>
          </div>

          {/* Post Detail Body Stream (Scrollable) */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4">
            {/* Author Row */}
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                {currentPost.avatarUrl ? (
                  <img src={currentPost.avatarUrl} alt={currentPost.author} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center font-bold text-xs text-white bg-[#04BB49]">
                    {currentPost.avatarInitials}
                  </div>
                )}
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white leading-tight">
                  {currentPost.author}
                </h3>
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">
                  {currentPost.roleSubtitle || `${currentPost.unit} · ${currentPost.timeAgo}`}
                </p>
              </div>
            </div>

            {/* Media Carousel (Highchair gallery matching screenshot 2) */}
            {currentPost.images && currentPost.images.length > 0 && (
              <div className="w-full flex flex-col gap-2">
                <div className="w-full aspect-square rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative border border-slate-200/80 dark:border-white/10 shadow-sm">
                  <img
                    src={currentPost.images[activeImageIndex] || currentPost.images[0]}
                    alt={currentPost.title}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=600&q=80';
                    }}
                  />

                  {/* 1/3 Pagination Pill on top-right corner */}
                  <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-white text-[11px] font-bold tracking-wider">
                    {activeImageIndex + 1}/{currentPost.images.length}
                  </div>
                </div>

                {/* Carousel Dots */}
                <div className="flex items-center justify-center gap-1.5 py-1">
                  {currentPost.images.map((_, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => setActiveImageIndex(idx)}
                      className={`h-1.5 rounded-full transition-all duration-200 ${
                        activeImageIndex === idx
                          ? 'w-4 bg-[#04BB49]'
                          : 'w-1.5 bg-slate-300 dark:bg-slate-700'
                      }`}
                    />
                  ))}
                </div>
              </div>
            )}

            {/* Post Title & Description & Price */}
            <div className="flex flex-col gap-1">
              <h3 className="text-lg font-extrabold text-slate-900 dark:text-white leading-snug">
                {currentPost.title}
              </h3>
              <p className="text-xs text-slate-700 dark:text-slate-300 leading-relaxed font-normal whitespace-pre-line">
                {currentPost.description}
              </p>
            </div>

            {/* Metric Counters & Interaction Bar */}
            <div className="flex items-center justify-between py-2 border-y border-slate-100 dark:border-white/10 text-xs text-slate-500 dark:text-slate-400">
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => handleToggleLike(currentPost.id)}
                  className={`flex items-center gap-1.5 transition-colors press-scale ${
                    currentPost.userLiked ? 'text-[#04BB49] font-bold' : 'hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <ThumbsUp size={15} className={currentPost.userLiked ? 'fill-[#04BB49]' : ''} />
                  <span>{currentPost.likes}</span>
                </button>

                <div className="flex items-center gap-1.5 text-slate-600 dark:text-slate-300">
                  <MessageCircle size={15} />
                  <span>{currentPost.commentsCount}</span>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('✓ Post link copied')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors press-scale"
                >
                  <Share2 size={15} />
                </button>
              </div>

              <div className="flex items-center gap-1 text-[11px] font-medium text-slate-400">
                <Eye size={14} />
                <span>{currentPost.views}</span>
              </div>
            </div>

            {/* Comments Stream */}
            <div className="flex flex-col gap-3 pb-6">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Comments ({currentPost.comments?.length || 0})
              </h4>

              {currentPost.comments && currentPost.comments.length > 0 ? (
                currentPost.comments.map((comment) => (
                  <div key={comment.id} className="flex items-start gap-2.5">
                    <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0 mt-0.5">
                      {comment.avatarUrl ? (
                        <img src={comment.avatarUrl} alt={comment.author} className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center font-bold text-[10px] text-white bg-[#04BB49]">
                          {comment.avatarInitials}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 bg-slate-50 dark:bg-white/5 p-3 rounded-2xl border border-slate-100 dark:border-white/5">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-slate-900 dark:text-white">
                          {comment.author}
                        </span>
                        <span className="text-[10px] text-slate-400">
                          {comment.timeAgo}
                        </span>
                      </div>
                      <p className="text-[10px] text-[#04BB49] font-medium">
                        {comment.unit}
                      </p>
                      <p className="text-xs text-slate-700 dark:text-slate-300 mt-1 font-normal">
                        {comment.text}
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-xs text-slate-400 italic py-2">
                  No comments yet. Start the conversation!
                </p>
              )}
            </div>
          </div>

          {/* Sticky Bottom Comment Bar (Matching Screen 2) */}
          <div className="w-full bg-white dark:bg-[#0B0F19] border-t border-slate-100 dark:border-white/10 px-4 py-2.5 flex flex-col gap-2 shrink-0 z-20 shadow-lg">
            <form onSubmit={handleAddComment} className="w-full flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                <img
                  src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80"
                  alt="Vinay"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 h-11 px-3.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 flex items-center">
                <input
                  type="text"
                  placeholder="Add a comment..."
                  value={commentInput}
                  onChange={(e) => setCommentInput(e.target.value)}
                  className="w-full bg-transparent text-xs text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={!commentInput.trim()}
                className="w-10 h-10 rounded-full bg-[#04BB49] disabled:bg-slate-200 dark:disabled:bg-slate-800 text-white flex items-center justify-center transition-all press-scale shrink-0 shadow-sm shadow-[#04BB49]/25"
                aria-label="Send Comment"
              >
                <Send size={16} strokeWidth={2.5} className="translate-x-0.5" />
              </button>
            </form>

            {/* iOS Indicator */}
            <div className="w-32 h-1 bg-black/25 dark:bg-white/25 rounded-full mx-auto mt-1" />
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW MODE 3: CREATE A POST (SCREEN 3)
          ======================================================== */}
      {viewMode === 'create' && (
        <div className="w-full h-full flex flex-col justify-between overflow-hidden bg-white dark:bg-[#070A11] animate-in fade-in duration-200">
          {/* Header Bar */}
          <div className="w-full bg-white dark:bg-[#0B0F19] border-b border-slate-100 dark:border-white/5 pt-3 pb-2.5 px-4 flex items-center justify-between shrink-0 z-10">
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => setViewMode('feed')}
                className="w-9 h-9 rounded-full flex items-center justify-center text-slate-800 dark:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors press-scale"
                aria-label="Cancel Create Post"
              >
                <ArrowLeft size={20} strokeWidth={2.4} />
              </button>
              <h2 className="text-xl font-bold tracking-tight text-slate-900 dark:text-white">
                Create a post
              </h2>
            </div>

            <button
              type="button"
              onClick={handlePublishPost}
              className="h-9 px-4 rounded-xl bg-[#04BB49] text-white font-bold text-xs flex items-center justify-center hover:bg-[#03963B] transition-colors press-scale shadow-sm shadow-[#04BB49]/25"
            >
              Post
            </button>
          </div>

          {/* Form Content Stream */}
          <div className="flex-1 overflow-y-auto no-scrollbar p-4 flex flex-col gap-4">
            {/* Author & Audience Selector */}
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <div className="w-10 h-10 rounded-full overflow-hidden bg-slate-200 dark:bg-slate-700 shrink-0">
                  <img
                    src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=160&q=80"
                    alt="Vinay"
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h3 className="text-xs font-bold text-slate-900 dark:text-white leading-tight">
                    Vinay
                  </h3>
                  <p className="text-[11px] font-medium text-slate-500 dark:text-slate-400">
                    Tower 10 · G003
                  </p>
                </div>
              </div>

              {/* Audience Pill */}
              <button
                type="button"
                onClick={() => showToast('Visibility: Verified Residents of Society')}
                className="h-8 px-3 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] border border-[#04BB49]/20 text-xs font-semibold flex items-center gap-1.5 press-scale"
              >
                <Lock size={12} strokeWidth={2.5} />
                <span>My Society</span>
                <ChevronDown size={13} strokeWidth={2.5} />
              </button>
            </div>

            {/* Textarea with Character Counter */}
            <div className="w-full rounded-2xl bg-slate-50 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 p-3.5 flex flex-col gap-2">
              <textarea
                rows={5}
                placeholder="What's on your mind?"
                value={createContent}
                maxLength={500}
                onChange={(e) => setCreateContent(e.target.value)}
                className="w-full bg-transparent text-sm text-slate-900 dark:text-white placeholder:text-slate-400 focus:outline-none resize-none leading-relaxed"
              />
              <div className="text-right text-[11px] font-medium text-slate-400">
                {createContent.length}/500
              </div>
            </div>

            {/* Media Attachment Preview Box */}
            <div className="flex items-center gap-3">
              {hasAttachedImage && (
                <div className="w-24 h-24 rounded-2xl overflow-hidden bg-slate-100 dark:bg-slate-800 relative border border-slate-200 dark:border-white/10 group">
                  <img
                    src="/assets/forum/luvlap_highchair.jpg"
                    alt="Attached preview"
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        'https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&w=400&q=80';
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setHasAttachedImage(false)}
                    className="absolute top-1.5 right-1.5 w-6 h-6 rounded-full bg-black/70 text-white flex items-center justify-center hover:bg-black transition-colors"
                  >
                    <X size={13} strokeWidth={2.5} />
                  </button>
                </div>
              )}

              {/* + Add Photo Box */}
              <button
                type="button"
                onClick={() => {
                  setHasAttachedImage(true);
                  showToast('✓ Photo attached from gallery');
                }}
                className="w-24 h-24 rounded-2xl border-2 border-dashed border-slate-300 dark:border-slate-700 flex flex-col items-center justify-center gap-1 text-slate-500 hover:border-[#04BB49] hover:text-[#04BB49] transition-colors press-scale"
              >
                <Plus size={20} strokeWidth={2.4} />
                <span className="text-[11px] font-bold">Add Photo</span>
              </button>
            </div>

            {/* Quick Action Bar Pills: Camera, Photo, Poll */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => {
                  setHasAttachedImage(true);
                  showToast('Camera opened');
                }}
                className="h-9 px-3.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:border-[#04BB49]/40 transition-colors press-scale"
              >
                <Camera size={15} className="text-[#04BB49]" />
                <span>Camera</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setHasAttachedImage(true);
                  showToast('Gallery opened');
                }}
                className="h-9 px-3.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:border-[#04BB49]/40 transition-colors press-scale"
              >
                <ImageIcon size={15} className="text-[#04BB49]" />
                <span>Photo</span>
              </button>

              <button
                type="button"
                onClick={() => {
                  setCreateCategory('Help');
                  showToast('Poll template added');
                }}
                className="h-9 px-3.5 rounded-full bg-slate-100 dark:bg-white/5 border border-slate-200/80 dark:border-white/10 text-xs font-semibold text-slate-700 dark:text-slate-200 flex items-center gap-1.5 hover:border-[#04BB49]/40 transition-colors press-scale"
              >
                <BarChart2 size={15} className="text-[#04BB49]" />
                <span>Poll</span>
              </button>
            </div>

            {/* Post Category Section */}
            <div className="flex flex-col gap-2 pt-2">
              <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                Post Category
              </h4>
              <div className="flex items-center gap-2 flex-wrap">
                <button
                  type="button"
                  onClick={() => setCreateCategory('General')}
                  className={`h-9 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all press-scale ${
                    createCategory === 'General'
                      ? 'bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] border-2 border-[#04BB49]'
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <MessageSquare size={14} />
                  <span>General</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCreateCategory('Announcement')}
                  className={`h-9 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all press-scale ${
                    createCategory === 'Announcement'
                      ? 'bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] border-2 border-[#04BB49]'
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Megaphone size={14} className="text-amber-500" />
                  <span>Announcement</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCreateCategory('Help')}
                  className={`h-9 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all press-scale ${
                    createCategory === 'Help'
                      ? 'bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] border-2 border-[#04BB49]'
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <HelpCircle size={14} className="text-red-500" />
                  <span>Help</span>
                </button>

                <button
                  type="button"
                  onClick={() => setCreateCategory('Buy & Sell')}
                  className={`h-9 px-3.5 rounded-full text-xs font-bold flex items-center gap-1.5 transition-all press-scale ${
                    createCategory === 'Buy & Sell'
                      ? 'bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] dark:text-[#0ECD5A] border-2 border-[#04BB49]'
                      : 'bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 text-slate-700 dark:text-slate-200'
                  }`}
                >
                  <Tag size={14} className="text-emerald-500" />
                  <span>Buy & Sell</span>
                </button>
              </div>
            </div>
          </div>

          {/* iOS Bottom Indicator */}
          <div className="w-full pb-3 pt-1 flex justify-center">
            <div className="w-32 h-1 bg-black/25 dark:bg-white/25 rounded-full" />
          </div>
        </div>
      )}

      {/* ========================================================
          VIEW MODE 4: "START A CONVERSATION" BOTTOM ACTION SHEET (SCREEN 4)
          ======================================================== */}
      {showConversationSheet && (
        <div className="absolute inset-0 z-50 bg-black/60 backdrop-blur-xs flex flex-col justify-end animate-in fade-in duration-200">
          <div
            onClick={() => setShowConversationSheet(false)}
            className="flex-1 w-full"
          />

          <div className="w-full rounded-t-[32px] bg-white dark:bg-[#0B0F19] p-5 pt-3 border-t border-slate-200/90 dark:border-white/10 shadow-2xl flex flex-col gap-3 animate-in slide-in-from-bottom duration-250">
            {/* Drag Handle Bar */}
            <div className="w-12 h-1.5 bg-slate-300 dark:bg-slate-700 rounded-full mx-auto" />

            {/* Header: Title & Close Button */}
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-base font-extrabold text-slate-900 dark:text-white leading-tight">
                  Start a conversation
                </h3>
                <p className="text-xs font-normal text-slate-500 dark:text-slate-400 mt-0.5">
                  Share something with your society or sell an item
                </p>
              </div>

              <button
                type="button"
                onClick={() => setShowConversationSheet(false)}
                className="w-8 h-8 rounded-full bg-slate-100 dark:bg-white/10 text-slate-500 hover:text-slate-900 dark:hover:text-white flex items-center justify-center transition-colors press-scale"
              >
                <X size={16} strokeWidth={2.4} />
              </button>
            </div>

            {/* 4 Action Options */}
            <div className="flex flex-col gap-2 pt-1">
              {/* Option 1: Post to Society */}
              <button
                type="button"
                onClick={() => {
                  setShowConversationSheet(false);
                  setCreateCategory('General');
                  setViewMode('create');
                }}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-[#E8FBF0]/50 dark:hover:bg-[#0A2E18]/50 border border-slate-100 dark:border-white/5 flex items-center justify-between transition-all press-scale"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] flex items-center justify-center shrink-0">
                    <MessageSquare size={18} strokeWidth={2.4} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Post to Society
                    </h4>
                    <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                      Share updates, questions or news
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              {/* Option 2: Start a Group Chat */}
              <button
                type="button"
                onClick={() => {
                  setShowConversationSheet(false);
                  showToast('✓ Opening Tower 10 Neighbours Group Chat...');
                }}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-[#E8FBF0]/50 dark:hover:bg-[#0A2E18]/50 border border-slate-100 dark:border-white/5 flex items-center justify-between transition-all press-scale"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] flex items-center justify-center shrink-0">
                    <Users size={18} strokeWidth={2.4} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Start a Group Chat
                    </h4>
                    <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                      Create a chat with your neighbours
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              {/* Option 3: Sell on Marketplace */}
              <button
                type="button"
                onClick={() => {
                  setShowConversationSheet(false);
                  setCreateCategory('Buy & Sell');
                  setHasAttachedImage(true);
                  setViewMode('create');
                }}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-[#E8FBF0]/50 dark:hover:bg-[#0A2E18]/50 border border-slate-100 dark:border-white/5 flex items-center justify-between transition-all press-scale"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] flex items-center justify-center shrink-0">
                    <Store size={18} strokeWidth={2.4} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Sell on Marketplace
                    </h4>
                    <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                      Buy or sell items within your society
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>

              {/* Option 4: Community Poll / Discussion */}
              <button
                type="button"
                onClick={() => {
                  setShowConversationSheet(false);
                  setCreateCategory('Help');
                  setViewMode('create');
                }}
                className="w-full p-3.5 rounded-2xl bg-slate-50 dark:bg-white/5 hover:bg-[#E8FBF0]/50 dark:hover:bg-[#0A2E18]/50 border border-slate-100 dark:border-white/5 flex items-center justify-between transition-all press-scale"
              >
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-[#E8FBF0] dark:bg-[#0A2E18] text-[#04BB49] flex items-center justify-center shrink-0">
                    <Building2 size={18} strokeWidth={2.4} />
                  </div>
                  <div className="text-left">
                    <h4 className="text-xs font-bold text-slate-900 dark:text-white">
                      Community Help & Polls
                    </h4>
                    <p className="text-[11px] font-normal text-slate-500 dark:text-slate-400">
                      Ask for advice, lost & found, or recommendations
                    </p>
                  </div>
                </div>
                <ChevronRight size={16} className="text-slate-400" />
              </button>
            </div>

            {/* iOS Indicator */}
            <div className="w-32 h-1 bg-black/25 dark:bg-white/25 rounded-full mx-auto mt-2" />
          </div>
        </div>
      )}
    </div>
  );
};