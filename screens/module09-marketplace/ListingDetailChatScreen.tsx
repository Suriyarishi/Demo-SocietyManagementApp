import React, { useState } from 'react';
import {
  ArrowLeft,
  Send,
  PhoneCall,
  ShieldCheck,
  CheckCircle2,
  Ticket,
  MapPin,
  Clock,
  Heart,
  DollarSign,
  Share2,
  X,
  QrCode
} from 'lucide-react';
import { Badge, Button, Input } from '../../components/UIComponents';
import { MarketplaceItem } from './MarketplaceHubScreen';

interface ChatMessage {
  id: string;
  sender: 'user' | 'seller';
  text: string;
  time: string;
}

interface ListingDetailChatScreenProps {
  item: MarketplaceItem;
  onBack: () => void;
}

export const ListingDetailChatScreen: React.FC<ListingDetailChatScreenProps> = ({
  item,
  onBack,
}) => {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      id: 'm1',
      sender: 'user',
      text: `Hi ${item.sellerName}! Is "${item.title}" still available? Can I inspect it this evening?`,
      time: '10:14 AM',
    },
    {
      id: 'm2',
      sender: 'seller',
      text: `Hi Suriya! Yes it is. I am home at ${item.sellerUnit}. Feel free to drop by around 6:30 PM!`,
      time: '10:18 AM',
    },
  ]);
  const [inputText, setInputText] = useState<string>('');
  const [showGatePassModal, setShowGatePassModal] = useState<boolean>(false);
  const [showOfferModal, setShowOfferModal] = useState<boolean>(false);
  const [offerPrice, setOfferPrice] = useState<string>(`${Math.round(item.price * 0.9)}`);
  const [toastMsg, setToastMsg] = useState<string>('');

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 2500);
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg: ChatMessage = {
      id: `m_${Date.now()}`,
      sender: 'user',
      text: inputText.trim(),
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate instant neighbor reply
    setTimeout(() => {
      const sellerReply: ChatMessage = {
        id: `m_${Date.now() + 1}`,
        sender: 'seller',
        text: 'Sounds great! Looking forward to meeting you.',
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      };
      setMessages((prev) => [...prev, sellerReply]);
    }, 1200);
  };

  return (
    <div className="w-full min-h-full flex flex-col justify-between p-4 pb-20 text-left animate-in fade-in duration-200">
      {/* Toast Notification */}
      {toastMsg && (
        <div className="absolute top-14 left-3 right-3 z-50 p-3 rounded-2xl bg-slate-900/95 text-white border border-slate-700 text-xs font-semibold shadow-2xl flex items-center gap-2 animate-in slide-in-from-top duration-200">
          <CheckCircle2 size={15} className="text-emerald-400 shrink-0" />
          <span className="flex-1 text-[11px] leading-tight">{toastMsg}</span>
        </div>
      )}

      <div className="flex flex-col gap-3">
        {/* Header Bar */}
        <div className="flex items-center justify-between pb-1 border-b border-slate-200/80 dark:border-obsidian-800">
          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={onBack}
              className="w-10 h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 flex items-center justify-center text-slate-700 dark:text-slate-200 transition-colors border border-slate-200 dark:border-obsidian-800 press-scale"
              title="Back to Marketplace"
            >
              <ArrowLeft size={18} strokeWidth={2.4} />
            </button>
            <div>
              <span className="text-[10px] font-bold text-cobalt-600 dark:text-cobalt-400 uppercase tracking-widest block">
                CLASSIFIED DETAILS
              </span>
              <h2 className="text-base font-extrabold text-slate-900 dark:text-white tracking-tight leading-tight">
                {item.category}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-1.5">
            <button
              type="button"
              onClick={() => showToast('Listing link shared with Flat 1204')}
              className="w-9 h-9 rounded-xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 text-slate-600 dark:text-slate-300 flex items-center justify-center"
            >
              <Share2 size={15} />
            </button>
          </div>
        </div>

        {/* Item Header Card */}
        <div className="p-4 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200/90 dark:border-obsidian-800 shadow-sm flex flex-col gap-3">
          <div className="flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-1">
                <Badge variant={item.price === 0 ? 'emerald' : 'cobalt'} size="sm">
                  {item.condition}
                </Badge>
                <span className="text-[10px] font-bold text-slate-400 font-mono">
                  Posted {item.postedAgo}
                </span>
              </div>
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white leading-tight">
                {item.title}
              </h3>
            </div>

            <div className="text-right">
              <span className="text-base font-extrabold text-slate-900 dark:text-white block">
                {item.price === 0 ? 'FREE' : `₹${item.price.toLocaleString()}`}
              </span>
            </div>
          </div>

          <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
            {item.description}
          </p>

          <div className="p-2.5 rounded-2xl bg-slate-50 dark:bg-obsidian-850 border border-slate-100 dark:border-obsidian-800 flex items-center gap-2 text-[11px] text-slate-600 dark:text-slate-300 font-medium">
            <MapPin size={14} className="text-cobalt-600 dark:text-cobalt-400 shrink-0" />
            <span>Handover: {item.handover}</span>
          </div>

          {/* Seller Profile Row */}
          <div className="pt-2 border-t border-slate-100 dark:border-obsidian-800 flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-indigo-500 to-cobalt-600 text-white font-extrabold text-xs flex items-center justify-center">
                {item.sellerName.substring(0, 2).toUpperCase()}
              </div>
              <div>
                <h4 className="font-bold text-xs text-slate-900 dark:text-white">
                  {item.sellerName}
                </h4>
                <p className="text-[10px] text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-0.5">
                  <ShieldCheck size={11} /> {item.sellerUnit} • {item.sellerRating}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => showToast(`VoIP Intercom dialed to ${item.sellerUnit}`)}
              className="h-8 px-2.5 rounded-xl bg-cobalt-50 hover:bg-cobalt-100 dark:bg-cobalt-950/60 dark:hover:bg-cobalt-900/60 border border-cobalt-200 dark:border-cobalt-800/40 text-cobalt-700 dark:text-cobalt-300 text-xs font-bold flex items-center gap-1 transition-colors"
            >
              <PhoneCall size={12} />
              <span>Intercom</span>
            </button>
          </div>
        </div>

        {/* Quick Action Grid */}
        <div className="grid grid-cols-2 gap-2">
          <button
            type="button"
            onClick={() => setShowOfferModal(true)}
            className="h-10 rounded-2xl bg-slate-100 hover:bg-slate-200 dark:bg-obsidian-900 dark:hover:bg-obsidian-850 text-slate-900 dark:text-white font-bold text-xs flex items-center justify-center gap-1.5 border border-slate-200 dark:border-obsidian-800 transition-colors press-scale"
          >
            <DollarSign size={14} className="text-emerald-600" />
            <span>Make Offer</span>
          </button>

          <button
            type="button"
            onClick={() => setShowGatePassModal(true)}
            className="h-10 rounded-2xl bg-emerald-50 hover:bg-emerald-100 dark:bg-emerald-950/60 dark:hover:bg-emerald-900/60 text-emerald-700 dark:text-emerald-300 font-bold text-xs flex items-center justify-center gap-1.5 border border-emerald-200 dark:border-emerald-800/40 transition-colors press-scale"
          >
            <Ticket size={14} />
            <span>Gate Handover Pass</span>
          </button>
        </div>

        {/* Resident In-App Direct Chat Stream */}
        <div className="p-3.5 rounded-3xl bg-slate-50 dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 flex flex-col gap-2.5">
          <div className="flex items-center justify-between text-[10px] font-bold text-slate-400 uppercase tracking-wider px-1">
            <span>RESIDENT DIRECT CHAT</span>
            <span className="text-emerald-500">Encrypted</span>
          </div>

          <div className="flex flex-col gap-2 max-h-48 overflow-y-auto no-scrollbar py-1">
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex flex-col max-w-[85%] ${
                  m.sender === 'user' ? 'self-end items-end' : 'self-start items-start'
                }`}
              >
                <div
                  className={`p-2.5 rounded-2xl text-xs font-medium ${
                    m.sender === 'user'
                      ? 'bg-cobalt-600 text-white rounded-br-none shadow-sm'
                      : 'bg-white dark:bg-obsidian-800 text-slate-900 dark:text-white border border-slate-200 dark:border-obsidian-750 rounded-bl-none shadow-sm'
                  }`}
                >
                  {m.text}
                </div>
                <span className="text-[9px] text-slate-400 font-mono mt-0.5 px-1">
                  {m.time}
                </span>
              </div>
            ))}
          </div>

          {/* Chat Input Bar */}
          <form onSubmit={handleSendMessage} className="flex items-center gap-1.5 pt-1">
            <input
              type="text"
              placeholder="Type message to neighbor..."
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              className="flex-1 h-10 px-3.5 rounded-xl bg-white dark:bg-obsidian-800 border border-slate-200 dark:border-obsidian-750 text-xs font-medium text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-cobalt-500"
            />
            <button
              type="submit"
              className="w-10 h-10 rounded-xl bg-cobalt-600 hover:bg-cobalt-700 text-white flex items-center justify-center shrink-0 shadow-sm transition-colors press-scale"
            >
              <Send size={15} />
            </button>
          </form>
        </div>
      </div>

      {/* Make Offer Modal */}
      {showOfferModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="w-full max-w-[320px] p-5 rounded-3xl bg-white dark:bg-obsidian-900 border border-slate-200 dark:border-obsidian-800 shadow-2xl flex flex-col gap-4 text-left">
            <div className="flex items-center justify-between border-b border-slate-100 dark:border-obsidian-800 pb-2">
              <h3 className="font-extrabold text-sm text-slate-900 dark:text-white">
                Make Price Offer
              </h3>
              <button
                type="button"
                onClick={() => setShowOfferModal(false)}
                className="w-7 h-7 rounded-lg bg-slate-100 dark:bg-obsidian-800 text-slate-500 flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <p className="text-xs text-slate-500">
              Listed Price: <strong>₹{item.price.toLocaleString()}</strong>
            </p>

            <Input
              label="YOUR OFFER PRICE (₹ INR)"
              type="number"
              value={offerPrice}
              onChange={(e) => setOfferPrice(e.target.value)}
              required
            />

            <div className="flex items-center gap-2 pt-1">
              <Button
                type="button"
                variant="outline"
                onClick={() => setShowOfferModal(false)}
                className="flex-1"
              >
                Cancel
              </Button>
              <Button
                type="button"
                variant="primary"
                onClick={() => {
                  setShowOfferModal(false);
                  showToast(`Offer of ₹${offerPrice} submitted to ${item.sellerName}!`);
                }}
                className="flex-1"
              >
                Send Offer
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Gate Handover Pass Modal */}
      {showGatePassModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="w-full max-w-[340px] p-5 rounded-3xl bg-slate-900 border border-slate-800 text-white shadow-2xl flex flex-col gap-4 text-center relative overflow-hidden">
            <div className="flex items-center justify-between border-b border-white/10 pb-2">
              <div className="flex items-center gap-1.5 text-emerald-400 font-bold text-xs">
                <Ticket size={14} />
                <span>GATE HANDOVER CLEARANCE</span>
              </div>
              <button
                type="button"
                onClick={() => setShowGatePassModal(false)}
                className="w-7 h-7 rounded-lg bg-white/10 text-white flex items-center justify-center"
              >
                <X size={14} />
              </button>
            </div>

            <h3 className="text-sm font-extrabold text-white">
              Package Handover Pass
            </h3>

            {/* QR Pass */}
            <div className="p-4 rounded-2xl bg-white text-slate-900 flex flex-col items-center gap-2 shadow-inner">
              <div className="w-32 h-32 border-4 border-slate-900 rounded-xl p-2 flex items-center justify-center relative">
                <QrCode size={95} className="text-slate-900" />
              </div>
              <span className="font-mono font-bold text-xs text-slate-700 tracking-widest">
                CLAIM CODE: HL-MKT-4892
              </span>
            </div>

            <div className="p-3 rounded-xl bg-slate-800/80 border border-slate-700/80 text-left text-xs flex flex-col gap-1 text-slate-300">
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>ITEM:</span>
                <span className="text-white font-bold truncate max-w-[180px]">{item.title}</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>SELLER:</span>
                <span className="text-white font-bold">{item.sellerName} ({item.sellerUnit})</span>
              </div>
              <div className="flex justify-between text-slate-400 text-[11px]">
                <span>DROP DESK:</span>
                <span className="text-emerald-400 font-bold">Gate 1 Security Desk</span>
              </div>
            </div>

            <Button
              type="button"
              variant="primary"
              onClick={() => {
                setShowGatePassModal(false);
                showToast('✓ Handover Pass saved to Passbook & shared with Gate 1 Security');
              }}
              className="w-full"
            >
              Confirm Handover Pass
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
