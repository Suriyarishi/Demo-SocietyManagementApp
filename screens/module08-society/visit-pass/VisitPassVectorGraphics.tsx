import React, { useId } from 'react';

export interface VectorGraphicProps {
  size?: number;
  className?: string;
}

function useSvgUid(prefix: string): string {
  const raw = useId().replace(/:/g, '');
  return `${prefix}-${raw}`;
}

/**
 * Hero 3D Vector Illustration 1 — "Gate Pass Received" Empty State
 * Person comfortably seated in plush emerald armchair holding mobile phone with live pass glow,
 * framed wall gallery, pendant lights, and potted plant in soft upper-left studio lighting.
 */
export const VisitPassReceivedIllustration3D: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const id = useSvgUid('vp-rec');
  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[248px] h-auto select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-wall`} x1="30" y1="20" x2="250" y2="170" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#ECFDF5" />
          <stop offset="100%" stopColor="#D1FAE5" stopOpacity="0.65" />
        </linearGradient>
        <linearGradient id={`${id}-chair`} x1="100" y1="78" x2="176" y2="156" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="55%" stopColor="#059669" />
          <stop offset="100%" stopColor="#065F46" />
        </linearGradient>
        <linearGradient id={`${id}-chairLight`} x1="104" y1="84" x2="156" y2="140" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#10B981" />
        </linearGradient>
        <linearGradient id={`${id}-pot`} x1="60" y1="126" x2="88" y2="156" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={`${id}-leaf`} x1="56" y1="76" x2="88" y2="132" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`${id}-jeans`} x1="138" y1="112" x2="195" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={`${id}-phone`} x1="162" y1="68" x2="176" y2="88" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#1E293B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
      </defs>

      {/* Organic Ambient Wall Blob */}
      <path
        d="M36 154C24 126 30 92 58 84C82 77 92 52 118 36C148 18 192 24 218 48C242 70 256 108 242 154H36Z"
        fill={`url(#${id}-wall)`}
        className="dark:opacity-20"
      />

      {/* Soft Architectural Wall Frames */}
      <rect x="148" y="48" width="38" height="28" rx="5" fill="#FFFFFF" fillOpacity="0.85" stroke="#A7F3D0" strokeWidth="1.5" />
      <rect x="155" y="54" width="24" height="16" rx="2.5" fill="#ECFDF5" />
      <rect x="196" y="42" width="44" height="32" rx="5" fill="#FFFFFF" fillOpacity="0.85" stroke="#A7F3D0" strokeWidth="1.5" />
      <rect x="203" y="48" width="30" height="20" rx="2.5" fill="#ECFDF5" />

      {/* Hanging Pendant Lights */}
      <line x1="76" y1="24" x2="76" y2="54" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="76" cy="56" r="4" fill="#0F172A" />
      <circle cx="76" cy="59" r="2.2" fill="#FDE047" />
      <line x1="88" y1="20" x2="88" y2="44" stroke="#64748B" strokeWidth="1.5" />
      <circle cx="88" cy="46" r="3.5" fill="#0F172A" />
      <circle cx="88" cy="49" r="2" fill="#FDE047" />

      {/* Grounding Floor Shadow */}
      <ellipse cx="140" cy="160" rx="112" ry="9" fill="#064E3B" fillOpacity="0.14" />

      {/* Lush Potted Indoor Plant (Left) */}
      <path d="M74 128C63 114 58 98 63 82C71 94 75 110 75 128H74Z" fill={`url(#${id}-leaf)`} />
      <path d="M76 128C77 104 82 86 91 74C91 93 86 112 78 128H76Z" fill="#10B981" />
      <path d="M71 128C56 120 48 107 49 93C59 102 66 114 72 128H71Z" fill="#059669" />
      <path d="M80 128C88 115 97 104 102 91C96 108 90 120 82 128H80Z" fill="#34D399" />
      <path d="M60 128H92L88 152C87.4 155 85 157 82 157H70C67 157 64.6 155 64 152L60 128Z" fill={`url(#${id}-pot)`} />
      <ellipse cx="76" cy="128" rx="16" ry="3.2" fill="#E2E8F0" />

      {/* 3D Plush Armchair Back & Cushion */}
      <rect x="108" y="80" width="56" height="58" rx="16" fill="#065F46" />
      <rect x="104" y="78" width="54" height="56" rx="16" fill={`url(#${id}-chair)`} />
      {/* Armchair wooden feet */}
      <rect x="114" y="148" width="6" height="10" rx="3" fill="#78350F" />
      <rect x="158" y="148" width="6" height="10" rx="3" fill="#78350F" />

      {/* Character Seated Comfortably */}
      {/* Torso / Crisp White Tee */}
      <path d="M126 92C126 84 134 80 142 82C150 84 155 94 153 114L130 116L126 92Z" fill="#FFFFFF" />
      <path d="M126 92C126 84 134 80 142 82C150 84 155 94 153 114L130 116L126 92Z" stroke="#E2E8F0" strokeWidth="1" />
      {/* Denim Legs */}
      <path d="M132 113H164C169 113 174 117 176 122L189 152H177L163 128H146L154 152H142L129 124C127 119 128 113 132 113Z" fill={`url(#${id}-jeans)`} />
      {/* Clean Sneakers */}
      <path d="M177 150H194C196.5 150 198 152 198 154.5C198 156 196.5 157 194 157H177V150Z" fill="#FFFFFF" />
      <path d="M142 150H159C161.5 150 163 152 163 154.5C163 156 161.5 157 159 157H142V150Z" fill="#F8FAFC" />

      {/* Left Armchair Armrest */}
      <rect x="98" y="106" width="22" height="44" rx="10" fill={`url(#${id}-chairLight)`} />
      {/* Seat Cushion Front */}
      <rect x="112" y="124" width="54" height="26" rx="9" fill={`url(#${id}-chair)`} />
      <path d="M118 127H160" stroke="#A7F3D0" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />

      {/* Head & Hair */}
      <circle cx="142" cy="69" r="9.5" fill="#FDBA74" />
      <path d="M133 67C133 60 139 57 146 58C151 59 153 63 152 67C148 63 140 63 133 67Z" fill="#1E293B" />

      {/* Arm Holding Smartphone */}
      <path d="M148 89L161 95L168 83" stroke="#FDBA74" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />
      {/* Smartphone with Glowing Pass */}
      <rect x="163" y="67" width="13" height="22" rx="3.5" transform="rotate(8 163 67)" fill={`url(#${id}-phone)`} stroke="#34D399" strokeWidth="1.3" />
      {/* Digital Invite Signal Arcs */}
      <path d="M180 65C184 68 184 74 180 77" stroke="#04BB49" strokeWidth="2" strokeLinecap="round" />
      <path d="M185 61C191 66 191 76 185 81" stroke="#34D399" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * Hero 3D Vector Illustration 2 — "Gate Pass Given" Empty State
 * Host relaxing on modern sofa checking phone next to wooden sideboard, books, potted plant,
 * wall clock, and sunlit architectural window in soft upper-left lighting.
 */
export const VisitPassGivenIllustration3D: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const id = useSvgUid('vp-giv');
  return (
    <svg
      viewBox="0 0 280 200"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-[248px] h-auto select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="40" y1="20" x2="240" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="100%" stopColor="#E2E8F0" stopOpacity="0.6" />
        </linearGradient>
        <linearGradient id={`${id}-window`} x1="46" y1="36" x2="96" y2="146" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#BAE6FD" stopOpacity="0.7" />
        </linearGradient>
        <linearGradient id={`${id}-sofa`} x1="66" y1="90" x2="142" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#475569" />
        </linearGradient>
        <linearGradient id={`${id}-cabinet`} x1="168" y1="106" x2="236" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D6B49C" />
          <stop offset="100%" stopColor="#9A6B4C" />
        </linearGradient>
      </defs>

      {/* Ambient Living Room Backdrop */}
      <path
        d="M36 154C28 118 46 82 88 64C128 48 164 26 206 36C240 44 256 96 244 154H36Z"
        fill={`url(#${id}-bg)`}
        className="dark:opacity-15"
      />

      {/* Sunlit Architectural Window */}
      <path d="M48 152V74C48 56 64 40 94 36V152H48Z" fill={`url(#${id}-window)`} stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="72" y1="40" x2="72" y2="152" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="48" y1="86" x2="94" y2="86" stroke="#FFFFFF" strokeWidth="2" />

      {/* Wall Picture & Round Clock */}
      <rect x="118" y="60" width="38" height="24" rx="4" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
      <rect x="124" y="65" width="26" height="14" rx="2" fill="#D1FAE5" />
      <circle cx="192" cy="56" r="13" fill="#FFFFFF" stroke="#334155" strokeWidth="2.5" />
      <path d="M192 48V56L197 59" stroke="#04BB49" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

      {/* Floor Shadow */}
      <ellipse cx="140" cy="159" rx="110" ry="8.5" fill="#0F172A" fillOpacity="0.12" />

      {/* Modern Lounge Sofa */}
      <rect x="78" y="140" width="4.5" height="14" rx="2" fill="#78350F" />
      <rect x="128" y="140" width="4.5" height="14" rx="2" fill="#78350F" />
      <rect x="74" y="92" width="62" height="38" rx="12" fill={`url(#${id}-sofa)`} />
      <rect x="68" y="114" width="74" height="28" rx="10" fill="#64748B" />
      <rect x="65" y="108" width="14" height="32" rx="7" fill="#94A3B8" />
      <rect x="131" y="108" width="14" height="32" rx="7" fill="#94A3B8" />

      {/* Host Resident Seated on Sofa */}
      {/* Hair & Head */}
      <circle cx="96" cy="78" r="10" fill="#0F172A" />
      <circle cx="96" cy="79" r="7.5" fill="#FDBA74" />
      <path d="M88 77C88 71 92 69 96 69C100 69 104 71 104 77C101 74 91 74 88 77Z" fill="#0F172A" />
      {/* Warm Sweater */}
      <path d="M84 96C84 90 90 87 96 87C102 87 108 90 108 96L110 116H82L84 96Z" fill="#E2E8F0" />
      {/* Dark Trousers */}
      <path d="M85 114H108C112 114 115 117 115 122V148H106V128H97V148H88V122C88 118 87 115 85 114Z" fill="#1E293B" />
      {/* Holding Phone */}
      <rect x="92" y="96" width="8.5" height="13" rx="2.5" fill="#0F172A" stroke="#04BB49" strokeWidth="1.2" />

      {/* Wooden Console Sideboard (Right) */}
      <rect x="172" y="144" width="4.5" height="11" rx="1.5" fill="#78350F" />
      <rect x="228" y="144" width="4.5" height="11" rx="1.5" fill="#78350F" />
      <rect x="168" y="108" width="68" height="38" rx="6" fill={`url(#${id}-cabinet)`} />
      <rect x="174" y="114" width="56" height="11" rx="2.5" fill="#F8FAFC" fillOpacity="0.9" />
      <rect x="174" y="129" width="56" height="11" rx="2.5" fill="#F8FAFC" fillOpacity="0.9" />
      <circle cx="202" cy="119.5" r="1.5" fill="#64748B" />
      <circle cx="202" cy="134.5" r="1.5" fill="#64748B" />

      {/* Books Stack on Sideboard */}
      <rect x="179" y="102" width="20" height="5" rx="1.5" fill="#04BB49" />
      <rect x="181" y="97" width="17" height="5" rx="1.5" fill="#38BDF8" />

      {/* Potted Plant on Sideboard */}
      <path d="M218 96C213 86 213 78 216 72C220 79 221 88 220 96H218Z" fill="#059669" />
      <path d="M221 96C222 84 225 74 229 69C229 80 226 89 222 96H221Z" fill="#34D399" />
      <path d="M212 96H228L226 108H214L212 96Z" fill="#EA580C" />
    </svg>
  );
};

/**
 * 3D Vector Icon — Ticket / Visit Pass (Three-quarter emerald & gold QR pass)
 */
export const TicketPass3D: React.FC<VectorGraphicProps> = ({ size = 28, className = '' }) => {
  const id = useSvgUid('tkt');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-body`} x1="10" y1="14" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="55%" stopColor="#04BB49" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="20" ry="4" fill="#064E3B" fillOpacity="0.22" />
      {/* Extrusion depth */}
      <path d="M10 22C10 18.7 12.7 16 16 16H50C53.3 16 56 18.7 56 22V27C53.2 27 51 29.2 51 32C51 34.8 53.2 37 56 37V43C56 46.3 53.3 49 50 49H16C12.7 49 10 46.3 10 43V37C12.8 37 15 34.8 15 32C15 29.2 12.8 27 10 27V22Z" fill="#065F46" />
      {/* Ticket main face */}
      <path d="M8 20C8 16.7 10.7 14 14 14H48C51.3 14 54 16.7 54 20V25C51.2 25 49 27.2 49 30C49 32.8 51.2 35 54 35V41C54 44.3 51.3 47 48 47H14C10.7 47 8 44.3 8 41V35C10.8 35 13 32.8 13 30C13 27.2 10.8 25 8 25V20Z" fill={`url(#${id}-body)`} />
      {/* Perforation line */}
      <line x1="23" y1="18" x2="23" y2="43" stroke="#ECFDF5" strokeOpacity="0.65" strokeWidth="2" strokeDasharray="3 3" />
      {/* QR Mini Emblem */}
      <rect x="29" y="22" width="15" height="16" rx="3" fill="#FFFFFF" fillOpacity="0.92" />
      <rect x="31.5" y="24.5" width="4" height="4" rx="0.8" fill="#047857" />
      <rect x="37.5" y="24.5" width="4" height="4" rx="0.8" fill="#047857" />
      <rect x="31.5" y="31.5" width="4" height="4" rx="0.8" fill="#047857" />
      <rect x="38" y="32" width="3" height="3" rx="0.8" fill="#F59E0B" />
    </svg>
  );
};

/**
 * 3D Vector Icon — Request Visit Pass / Send Invite
 */
export const SendInvite3D: React.FC<VectorGraphicProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('send');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-plane`} x1="10" y1="12" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#D1FAE5" />
        </linearGradient>
      </defs>
      <path d="M54 12L10 29L27 36L45 21L33 40L47 50L54 12Z" fill={`url(#${id}-plane)`} />
      <path d="M27 36V51L35 41" fill="#A7F3D0" />
    </svg>
  );
};

/**
 * 3D Vector Icon — QR Pass Emblem Orb
 */
export const QrPassOrb3D: React.FC<VectorGraphicProps> = ({ size = 36, className = '' }) => {
  const id = useSvgUid('qr');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="10" y1="8" x2="54" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="44" height="44" rx="14" fill="#065F46" fillOpacity="0.22" transform="translate(0 2)" />
      <rect x="10" y="8" width="44" height="44" rx="14" fill={`url(#${id}-bg)`} />
      <rect x="19" y="17" width="11" height="11" rx="2.5" fill="#FFFFFF" />
      <rect x="34" y="17" width="11" height="11" rx="2.5" fill="#FFFFFF" />
      <rect x="19" y="32" width="11" height="11" rx="2.5" fill="#FFFFFF" />
      <rect x="34" y="32" width="5" height="5" rx="1" fill="#FEF08A" />
      <rect x="40" y="38" width="5" height="5" rx="1" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * 3D Vector Icon — Pending Clock Orb
 */
export const ClockPending3D: React.FC<VectorGraphicProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('clk');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-amb`} x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="34" r="24" fill="#78350F" fillOpacity="0.22" />
      <circle cx="32" cy="31" r="24" fill={`url(#${id}-amb)`} />
      <path d="M32 19V32L41 37" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * 3D Vector Icon — Back Chevron Arrow
 */
export const BackArrow3D: React.FC<VectorGraphicProps> = ({ size = 20, className = '' }) => {
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <path
        d="M31 18L15 34L31 50M17 34H50"
        stroke="#0F172A"
        strokeOpacity="0.16"
        strokeWidth="6.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M30 16L14 32L30 48M16 32H50"
        className="stroke-slate-800 dark:stroke-slate-100"
        strokeWidth="6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * 3D Vector Icon — Emerald Verified Check Orb
 */
export const CheckOrb3D: React.FC<VectorGraphicProps> = ({ size = 18, className = '' }) => {
  const id = useSvgUid('chk');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-g`} x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="34" r="24" fill="#065F46" fillOpacity="0.22" />
      <circle cx="32" cy="31" r="24" fill={`url(#${id}-g)`} />
      <path d="M21 31L28 38L43 23" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * 3D Vector Icon — Host Apartment / Unit Badge
 */
export const HostHome3D: React.FC<VectorGraphicProps> = ({ size = 18, className = '' }) => {
  const id = useSvgUid('home');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-roof`} x1="12" y1="10" x2="52" y2="44" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <path d="M16 30V52C16 53.7 17.3 55 19 55H45C46.7 55 48 53.7 48 52V30L32 17L16 30Z" fill="#059669" />
      <path d="M9 31L32 11L55 31" stroke={`url(#${id}-roof)`} strokeWidth="6" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="27" y="38" width="10" height="17" rx="3" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * 3D Vector Icon — Shield Approved Badge
 */
export const ShieldApprove3D: React.FC<VectorGraphicProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('shd');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-s`} x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <path d="M32 55L14 45C12 32 12 19 13 12L32 6L51 12C52 19 52 32 50 45L32 55Z" fill={`url(#${id}-s)`} />
      <path d="M23 30L29 36L41 24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};
