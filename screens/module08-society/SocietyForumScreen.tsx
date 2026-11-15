import React, { useState } from 'react';
import {
  ArrowLeft,
  MessagesSquare,
  Plus,
  ThumbsUp,
  MessageCircle,
  Share2,
  CheckCircle2,
  Search,
  Sparkles,
  ShieldCheck,
  Send,
  X
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';

export interface ForumPost {
  id: string;
  author: string;
  unit: string;
  avatarInitials: string;
  timeAgo: string;
  category: 'Sports & Fitness' | 'Recommendations' | 'General' | 'Lost & Found';
  title: string;
  content: string;
  likes: number;
  commentsCount: number;
  userLiked?: boolean;
}

const SAMPLE_POSTS: ForumPost[] = [
  {
    id: 'post_01',
    author: 'Vikram Mehta',
    unit: 'Tower 3 - 802',
    avatarInitials: 'VM',
    timeAgo: '1h ago',
    category: 'Sports & Fitness',
    title: 'Weekend Tennis Doubles Match at 7 AM? Looking for 2 players!',
    content: 'Hey neighbors! Booked the Rooftop Tennis Court for this Saturday from 7:00 AM to 8:30 AM. Looking for 2 intermediate/advanced players for doubles. Drop a comment below if you want to join!',
    likes: 12,
    commentsCount: 6,
  },
  {
    id: 'post_02',
    author: 'Dr. Aruna Rao',
    unit: 'Tower 1 - 404',
    avatarInitials: 'AR',
    timeAgo: '3h ago',
    category: 'Recommendations',
    title: 'Recommendations for reliable pediatric dentists nearby in Whitefield?',
    content: 'Looking for a gentle and experienced pediatric dentist within 15-20 mins drive from Prestige Lakeside Habitat for my 6-year-old daughter. Any personal experiences with Rainbow or Columbia Asia?',
    likes: 9,
    commentsCount: 14,
  },
  {
    id: 'post_03',
    author: 'Siddharth Roy',
    unit: 'Tower 4 - 1101',
    avatarInitials: 'SR',
    timeAgo: 'Yesterday',
    category: 'Lost & Found',
    title: 'Found: Toddler Blue Water Bottle near Clubhouse Sandpit',
    content: 'Left with the clubhouse security reception desk. It has superhero stickers on it. Please claim with guard supervisor Mr. Ramesh.',
    likes: 18,
    commentsCount: 2,
  },
];

interface SocietyForumScreenProps {
  onBack: () => void;
}

export const SocietyForumScreen: React.FC<SocietyForumScreenProps> = ({ onBack }) => {
  const [posts, setPosts] = useState<ForumPost[]>(SAMPLE_POSTS);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showNewPostModal, setShowNewPostModal] = useState<boolean>(false);
  const [newTitle, setNewTitle] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Sports & Fitness' | 'Recommendations' | 'General' | 'Lost & Found'>('General');
  const [newContent, setNewContent] = useState<string>('');
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleLikePost = (postId: string) => {
    setPosts((prev) =>
      prev.map((p) => {
        if (p.id === postId) {
          const userLiked = !p.userLiked;
          return {
            ...p,
            userLiked,
            likes: userLiked ? p.likes + 1 : p.likes - 1,
          };
        }
        return p;
      })
    );
  };

  const handleCreatePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim() || !newContent.trim()) {
      showToast('Please enter both title and content');
      return;
    }

    const created: ForumPost = {
      id: `post_${Date.now()}`,
      author: 'Suriya K',
      unit: 'Tower 2 - 1204',
      avatarInitials: 'SK',
      timeAgo: 'Just now',
      category: newCategory,
      title: newTitle.trim(),
      content: newContent.trim(),
      likes: 1,
      commentsCount: 0,
      userLiked: true,
    };

    setPosts([created, ...posts]);
    setShowNewPostModal(false);
    setNewTitle('');
    setNewContent('');
    showToast('✓ Discussion posted to Society Forum!');
  };

  const filteredPosts = selectedCategory === 'All'
    ? posts
    : posts.filter((p) => p.category === selectedCategory);

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-20 text-left animate-in fade-in duration-200">
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
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
              title="Back to Society Hub"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                COMMUNITY NETWORK
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                Society Forum & Discussions
              </h2>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setShowNewPostModal(true)}
            className="h-9 px-3 rounded-2xl bg-cobalt-600 hover:bg-cobalt-700 text-white font-bold text-xs flex items-center gap-1.5 shadow-sm transition-colors press-scale"
          >
            <Plus size={15} strokeWidth={2.5} />
            <span>New Post</span>
          </button>
        </div>

        {/* Categories Bar */}
        <div className="flex gap-1.5 overflow-x-auto no-scrollbar py-0.5">
          {['All', 'Sports & Fitness', 'Recommendations', 'General', 'Lost & Found'].map((cat) => (
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
              {cat}
            </button>
          ))}
        </div>

        {/* Forum Posts Feed */}
        <div className="flex flex-col gap-3">
          {filteredPosts.map((post) => (
            <div
              key={post.id}
              className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-3"
            >
              {/* Author Row */}
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-cobalt-500 to-indigo-600 text-white font-extrabold text-xs flex items-center justify-center shadow-sm">
                    {post.avatarInitials}
                  </div>
                  <div>
                    <div className="flex items-center gap-1.5">
                      <h4 className="font-bold text-slate-900 dark:text-white text-xs">
                        {post.author}
                      </h4>
                      <span className="text-[10px] font-semibold text-slate-400">
                        • {post.timeAgo}
                      </span>
                    </div>
                    <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                      <ShieldCheck size={10} /> {post.unit} (Verified Resident)
                    </p>
                  </div>
                </div>

                <Badge variant="muted" size="sm">
                  {post.category}
                </Badge>
              </div>

              {/* Title & Content */}
              <div>
                <h3 className="font-extrabold text-xs text-slate-900 dark:text-white leading-snug">
                  {post.title}
                </h3>
                <p className="text-[11px] text-slate-600 dark:text-slate-300 font-medium mt-1 leading-relaxed">
                  {post.content}
                </p>
              </div>

              {/* Engagement Bar */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-obsidian-800 text-xs text-slate-500">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleLikePost(post.id)}
                    className={`flex items-center gap-1 transition-colors ${
                      post.userLiked ? 'text-cobalt-600 font-bold' : 'hover:text-slate-900 dark:hover:text-white'
                    }`}
                  >
                    <ThumbsUp size={13} className={post.userLiked ? 'fill-current' : ''} />
                    <span>{post.likes}</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => showToast('Discussion thread replies expanded')}
                    className="flex items-center gap-1 hover:text-slate-900 dark:hover:text-white transition-colors"
                  >
                    <MessageCircle size={13} />
                    <span>{post.commentsCount} replies</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => showToast('Discussion link copied!')}
                  className="hover:text-slate-900 dark:hover:text-white transition-colors"
                >
                  <Share2 size={13} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* New Post Modal */}
      {showNewPostModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Start Community Discussion
              </h3>
              <button
                type="button"
                onClick={() => setShowNewPostModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <form onSubmit={handleCreatePost} className="flex flex-col gap-3">
              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  CATEGORY
                </label>
                <select
                  value={newCategory}
                  onChange={(e) => setNewCategory(e.target.value as any)}
                  className="w-full h-[52px] rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 px-3.5 text-xs font-semibold text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
                >
                  <option value="General">General Neighborhood</option>
                  <option value="Sports & Fitness">Sports & Fitness</option>
                  <option value="Recommendations">Local Recommendations</option>
                  <option value="Lost & Found">Lost & Found</option>
                </select>
              </div>

              <Input
                label="POST TITLE"
                placeholder="e.g. Weekend Badminton partners needed"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
                required
              />

              <div>
                <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 mb-1.5 block">
                  DISCUSSION DETAILS
                </label>
                <textarea
                  rows={3}
                  placeholder="Share details, dates, or questions with verified society residents..."
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  className="w-full rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-200 dark:border-obsidian-750 p-3.5 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500 resize-none"
                  required
                />
              </div>

              <div className="flex items-center gap-2 pt-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowNewPostModal(false)}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button type="submit" variant="primary" className="flex-1 flex items-center justify-center gap-1.5">
                  <Send size={13} />
                  <span>Publish</span>
                </Button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
