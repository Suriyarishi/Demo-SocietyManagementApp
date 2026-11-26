import React, { useId } from 'react';

export interface VisitPassAssetProps {
  size?: number;
  className?: string;
}

function useUid(prefix: string): string {
  return `${prefix}-${useId().replace(/:/g, '')}`;
}

/**
 * 1. Hero 3D Graphic Vector Illustration — Tab 1: "Gate Pass Received"
 * Visitor relaxed in a plush emerald-sage armchair checking an invite pass on smartphone beside an indoor plant.
 */
export const VisitPassReceivedIllustration3D: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const id = useUid('vp-rec');
  return (
    <svg
      viewBox="0 0 280 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[260px] h-auto select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="30" y1="15" x2="245" y2="165" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.55" />
          <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`${id}-chair`} x1="100" y1="60" x2="175" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6EE7B7" stopOpacity="0.45" />
          <stop offset="45%" stopColor="#10B981" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
        <linearGradient id={`${id}-chair-solid`} x1="102" y1="68" x2="170" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#4ADE80" />
          <stop offset="55%" stopColor="#16A34A" />
          <stop offset="100%" stopColor="#14532D" />
        </linearGradient>
        <linearGradient id={`${id}-plant`} x1="56" y1="70" x2="88" y2="132" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#86EFAC" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
        <linearGradient id={`${id}-pot`} x1="58" y1="126" x2="86" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
        <linearGradient id={`${id}-jeans`} x1="138" y1="102" x2="195" y2="152" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
      </defs>

      {/* Grounding contact shadow */}
      <ellipse cx="140" cy="158" rx="112" ry="9" fill="#0F172A" fillOpacity="0.1" />

      {/* Organic architectural room backdrop */}
      <path
        d="M36 154C26 135 28 102 45 86C62 70 64 36 105 26C146 16 175 40 212 34C244 29 258 58 250 96C243 130 248 144 236 154H36Z"
        fill={`url(#${id}-bg)`}
      />

      {/* Subtle framed wall art */}
      <rect x="148" y="42" width="38" height="32" rx="5" fill="#FFFFFF" fillOpacity="0.7" />
      <rect x="154" y="48" width="26" height="20" rx="2.5" fill="#CBD5E1" fillOpacity="0.45" />
      <rect x="196" y="46" width="44" height="28" rx="5" fill="#FFFFFF" fillOpacity="0.7" />
      <rect x="202" y="52" width="32" height="16" rx="2.5" fill="#CBD5E1" fillOpacity="0.45" />

      {/* Minimal pendant lamps */}
      <line x1="74" y1="24" x2="74" y2="48" stroke="#64748B" strokeWidth="1.5" />
      <path d="M70 48H78L79.5 55H68.5L70 48Z" fill="#1E293B" />
      <line x1="86" y1="20" x2="86" y2="62" stroke="#64748B" strokeWidth="1.5" />
      <path d="M82 62H90L91.5 69H80.5L82 62Z" fill="#04BB49" />

      {/* 3D Potted Indoor Plant (Left) */}
      <path d="M68 128C57 110 58 84 65 76C71 86 73 110 72 128H68Z" fill={`url(#${id}-plant)`} />
      <path d="M72 128C72 104 75 74 82 70C85 84 82 110 76 128H72Z" fill="#15803D" />
      <path d="M64 128C52 118 48 100 54 92C61 98 65 114 68 128H64Z" fill="#4ADE80" />
      <path d="M75 128C84 114 91 96 86 88C79 95 75 112 73 128H75Z" fill="#22C55E" />
      <path d="M56 126H88L84 150C83.5 152.5 81.5 154 79 154H65C62.5 154 60.5 152.5 60 150L56 126Z" fill={`url(#${id}-pot)`} />
      <rect x="54" y="124" width="36" height="5" rx="2.5" fill="#F8FAFC" />

      {/* 3D Plush Armchair Back & Cushion */}
      <rect x="115" y="140" width="5" height="14" rx="2" fill="#475569" />
      <rect x="164" y="140" width="5" height="14" rx="2" fill="#475569" />
      <rect x="108" y="68" width="66" height="68" rx="18" fill="#14532D" />
      <rect x="105" y="66" width="64" height="66" rx="18" fill={`url(#${id}-chair-solid)`} />

      {/* Visitor Seated in Chair */}
      {/* Legs & White Sneakers */}
      <path d="M138 110L170 112C176 112.5 180 117 182 123L190 148H178L169 124L138 126V110Z" fill={`url(#${id}-jeans)`} />
      <path d="M134 118L166 122C170 123 172 128 170 133L162 150H151L157 131L132 128L134 118Z" fill="#1E40AF" />
      <path d="M178 147H194C196 147 198 149 198 151.5C198 153 196.5 154 195 154H178V147Z" fill="#FFFFFF" />
      <path d="M150 148H166C168 148 169 150 169 152C169 153.5 167.5 154 166 154H150V148Z" fill="#F1F5F9" />

      {/* Torso & Arms */}
      <path d="M126 78C126 72 132 68 140 68C148 68 154 73 155 82L153 114H125L126 78Z" fill="#FFFFFF" />
      {/* Skin arms */}
      <path d="M126 78C118 84 115 95 121 102C125 106 135 106 142 103" stroke="#FDBA74" strokeWidth="7" strokeLinecap="round" />
      <path d="M151 77L163 92L173 84" stroke="#FDBA74" strokeWidth="6.5" strokeLinecap="round" strokeLinejoin="round" />

      {/* Head & Hair */}
      <circle cx="141" cy="57" r="9" fill="#FED7AA" />
      <path d="M132 56C132 49 138 45 144 46C149 47 151 50 150 54C147 52 141 51 136 54L134 59L132 56Z" fill="#1E293B" />

      {/* Glowing Smartphone Pass */}
      <rect x="169" y="70" width="11" height="19" rx="2.5" transform="rotate(10 169 70)" fill="#0F172A" />
      <rect x="170.5" y="72" width="8" height="14" rx="1.5" transform="rotate(10 170.5 72)" fill="#34D399" />

      {/* Foreground Armrests of Chair */}
      <rect x="100" y="96" width="18" height="44" rx="9" fill="#15803D" />
      <rect x="100" y="94" width="16" height="44" rx="8" fill="#22C55E" />
      <rect x="114" y="118" width="46" height="22" rx="8" fill="#16A34A" />
      <path d="M104 99V126" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 2. Hero 3D Graphic Vector Illustration — Tab 2: "Gate Pass Given"
 * Resident host relaxing in a lounge sofa beside window, wall clock, and console table with books & plant.
 */
export const VisitPassGivenIllustration3D: React.FC<{ className?: string }> = ({
  className = '',
}) => {
  const id = useUid('vp-giv');
  return (
    <svg
      viewBox="0 0 280 185"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`w-full max-w-[260px] h-auto select-none ${className}`}
      aria-hidden="true"
    >
      <defs>
        <linearGradient id={`${id}-bg`} x1="25" y1="20" x2="255" y2="160" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#CBD5E1" stopOpacity="0.25" />
        </linearGradient>
        <linearGradient id={`${id}-win`} x1="50" y1="30" x2="105" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#BAE6FD" />
        </linearGradient>
        <linearGradient id={`${id}-sofa`} x1="75" y1="88" x2="145" y2="145" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#CBD5E1" />
          <stop offset="60%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id={`${id}-cab`} x1="168" y1="106" x2="235" y2="148" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D6D3D1" />
          <stop offset="100%" stopColor="#A8A29E" />
        </linearGradient>
      </defs>

      {/* Contact shadow */}
      <ellipse cx="140" cy="158" rx="112" ry="9" fill="#0F172A" fillOpacity="0.1" />

      {/* Soft room backdrop */}
      <path
        d="M34 154C26 128 36 88 58 66C80 44 128 54 162 34C196 14 238 30 248 68C258 106 250 138 240 154H34Z"
        fill={`url(#${id}-bg)`}
      />

      {/* Tall Arched Window */}
      <path d="M48 152V62C48 44 64 36 86 38V152H48Z" fill={`url(#${id}-win)`} />
      <line x1="68" y1="38" x2="68" y2="152" stroke="#FFFFFF" strokeWidth="2.5" />
      <line x1="48" y1="86" x2="86" y2="86" stroke="#FFFFFF" strokeWidth="2" />
      <line x1="48" y1="118" x2="86" y2="118" stroke="#FFFFFF" strokeWidth="2" />

      {/* Wall Frame & Clock */}
      <rect x="116" y="54" width="38" height="26" rx="4" fill="#FFFFFF" fillOpacity="0.85" />
      <rect x="122" y="60" width="26" height="14" rx="2" fill="#CBD5E1" fillOpacity="0.6" />
      <circle cx="195" cy="52" r="14" fill="#1E293B" />
      <circle cx="195" cy="52" r="11.5" fill="#FFFFFF" />
      <path d="M195 45V52L200 54" stroke="#04BB49" strokeWidth="2" strokeLinecap="round" />

      {/* 3D Lounge Chair */}
      <rect x="82" y="138" width="4" height="14" rx="2" fill="#475569" />
      <rect x="128" y="138" width="4" height="14" rx="2" fill="#475569" />
      <rect x="74" y="92" width="66" height="48" rx="14" fill={`url(#${id}-sofa)`} />
      <rect x="70" y="106" width="14" height="34" rx="7" fill="#64748B" />
      <rect x="130" y="106" width="14" height="34" rx="7" fill="#64748B" />

      {/* Host Resident Seated Holding Phone */}
      <path d="M97 104C97 96 102 92 108 92C114 92 119 96 119 104L117 120H98L97 104Z" fill="#FDE68A" />
      {/* Trousers */}
      <path d="M98 118H116L113 147H104L103 130L98 118Z" fill="#0F172A" />
      <path d="M107 118H118L124 142L116 144L107 118Z" fill="#1E293B" />
      {/* Head & Hair */}
      <circle cx="108" cy="79" r="8" fill="#FED7AA" />
      <path d="M100 79C100 72 105 69 109 69C114 69 117 73 117 82C115 80 113 76 108 76C104 76 102 80 100 83V79Z" fill="#0F172A" />
      {/* Phone */}
      <rect x="105" y="94" width="7" height="11" rx="2" fill="#04BB49" />

      {/* 3D Wooden Drawer Console (Right) */}
      <rect x="172" y="142" width="4" height="10" rx="1.5" fill="#78350F" />
      <rect x="224" y="142" width="4" height="10" rx="1.5" fill="#78350F" />
      <rect x="166" y="108" width="68" height="36" rx="5" fill={`url(#${id}-cab)`} />
      <rect x="164" y="105" width="72" height="5" rx="2.5" fill="#E7E5E4" />
      <rect x="171" y="113" width="58" height="11" rx="2" fill="#FFFFFF" fillOpacity="0.55" />
      <rect x="171" y="128" width="58" height="11" rx="2" fill="#FFFFFF" fillOpacity="0.55" />
      <circle cx="200" cy="118.5" r="1.5" fill="#78716C" />
      <circle cx="200" cy="133.5" r="1.5" fill="#78716C" />

      {/* Stacked Books & 3D Plant on Console */}
      <rect x="182" y="100" width="22" height="5" rx="1.5" fill="#04BB49" />
      <rect x="184" y="95" width="18" height="5" rx="1.5" fill="#F59E0B" />
      <path d="M216 92C213 84 214 75 218 72C221 76 221 85 219 92H216Z" fill="#22C55E" />
      <path d="M220 92C222 82 225 74 228 73C229 79 227 86 223 92H220Z" fill="#04BB49" />
      <path d="M213 92H227L225 105H215L213 92Z" fill="#EA580C" />
    </svg>
  );
};

/**
 * 3. Perforated 3D Gate Pass Ticket Icon
 */
export const VisitPassTicket3D: React.FC<VisitPassAssetProps> = ({ size = 28, className = '' }) => {
  const id = useUid('vptick');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-body`} x1="10" y1="14" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="55%" stopColor="#04BB49" />
          <stop offset="100%" stopColor="#047857" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="22" ry="4" fill="#064E3B" fillOpacity="0.22" />
      <path
        d="M11 20C11 17.8 12.8 16 15 16H49C51.2 16 53 17.8 53 20V27C50.2 27 48 29.2 48 32C48 34.8 50.2 37 53 37V44C53 46.2 51.2 48 49 48H15C12.8 48 11 46.2 11 44V37C13.8 37 16 34.8 16 32C16 29.2 13.8 27 11 27V20Z"
        fill="#065F46"
        transform="translate(0 2.5)"
      />
      <path
        d="M11 20C11 17.8 12.8 16 15 16H49C51.2 16 53 17.8 53 20V27C50.2 27 48 29.2 48 32C48 34.8 50.2 37 53 37V44C53 46.2 51.2 48 49 48H15C12.8 48 11 46.2 11 44V37C13.8 37 16 34.8 16 32C16 29.2 13.8 27 11 27V20Z"
        fill={`url(#${id}-body)`}
      />
      <line x1="25" y1="20" x2="25" y2="44" stroke="#FFFFFF" strokeOpacity="0.45" strokeWidth="2" strokeDasharray="3 3" />
      <rect x="31" y="25" width="13" height="13" rx="3" fill="#FFFFFF" fillOpacity="0.92" />
      <rect x="33.5" y="27.5" width="3.5" height="3.5" rx="0.8" fill="#047857" />
      <rect x="38" y="27.5" width="3.5" height="3.5" rx="0.8" fill="#047857" />
      <rect x="33.5" y="32" width="3.5" height="3.5" rx="0.8" fill="#047857" />
    </svg>
  );
};

/**
 * 4. 3D QR Pass Tile
 */
export const QrPass3D: React.FC<VisitPassAssetProps> = ({ size = 32, className = '' }) => {
  const id = useUid('qr3d');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-tile`} x1="10" y1="10" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <rect x="11" y="12" width="42" height="42" rx="12" fill="#065F46" fillOpacity="0.28" />
      <rect x="10" y="9" width="42" height="42" rx="12" fill={`url(#${id}-tile)`} />
      <rect x="18" y="17" width="10" height="10" rx="2.5" fill="#FFFFFF" />
      <rect x="34" y="17" width="10" height="10" rx="2.5" fill="#FFFFFF" />
      <rect x="18" y="33" width="10" height="10" rx="2.5" fill="#FFFFFF" />
      <rect x="34" y="33" width="5" height="5" rx="1.2" fill="#FFFFFF" />
      <rect x="40" y="39" width="4" height="4" rx="1" fill="#FEF08A" />
    </svg>
  );
};

/**
 * 5. 3D Residential Tower / Host Flat Icon
 */
export const HostFlat3D: React.FC<VisitPassAssetProps> = ({ size = 18, className = '' }) => {
  const id = useUid('hflat');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-b`} x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <path d="M38 16L50 22V54H38V16Z" fill="#047857" />
      <rect x="14" y="10" width="26" height="44" rx="5" fill={`url(#${id}-b)`} />
      <rect x="20" y="17" width="5" height="5" rx="1.2" fill="#FFFFFF" />
      <rect x="29" y="17" width="5" height="5" rx="1.2" fill="#FFFFFF" />
      <rect x="20" y="26" width="5" height="5" rx="1.2" fill="#FFFFFF" />
      <rect x="29" y="26" width="5" height="5" rx="1.2" fill="#FFFFFF" />
      <rect x="24" y="42" width="6" height="12" rx="2" fill="#ECFDF5" />
    </svg>
  );
};

/**
 * 6. 3D Calendar & Time Slot Icon
 */
export const CalendarClock3D: React.FC<VisitPassAssetProps> = ({ size = 18, className = '' }) => {
  const id = useUid('cclk');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-top`} x1="12" y1="12" x2="52" y2="26" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <rect x="11" y="15" width="42" height="39" rx="9" fill="#CBD5E1" />
      <rect x="10" y="13" width="42" height="39" rx="9" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="1.5" />
      <path d="M10 22C10 17 14 13 19 13H43C48 13 52 17 52 22V25H10V22Z" fill={`url(#${id}-top)`} />
      <circle cx="44" cy="44" r="11" fill="#04BB49" stroke="#FFFFFF" strokeWidth="2.5" />
      <path d="M44 39V44L47.5 46" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 7. 3D Guest Badge Icon
 */
export const GuestBadge3D: React.FC<VisitPassAssetProps> = ({ size = 18, className = '' }) => {
  const id = useUid('gbadge');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-c`} x1="12" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="22" r="10" fill={`url(#${id}-c)`} />
      <path d="M14 52C14 41 21 35 32 35C43 35 50 41 50 52C50 53.7 48.7 55 47 55H17C15.3 55 14 53.7 14 52Z" fill={`url(#${id}-c)`} />
    </svg>
  );
};

/**
 * 8. 3D Compact Vehicle Badge
 */
export const VehicleBadge3D: React.FC<VisitPassAssetProps> = ({ size = 18, className = '' }) => {
  const id = useUid('vbadge');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-car`} x1="10" y1="18" x2="54" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <path d="M18 28L23 17H41L46 28H18Z" fill={`url(#${id}-car)`} />
      <rect x="8" y="26" width="48" height="16" rx="7" fill={`url(#${id}-car)`} />
      <circle cx="18" cy="43" r="6" fill="#0F172A" />
      <circle cx="46" cy="43" r="6" fill="#0F172A" />
    </svg>
  );
};

/**
 * 9. 3D Check Orb & Back Arrow
 */
export const CheckOrb3D: React.FC<VisitPassAssetProps> = ({ size = 18, className = '' }) => {
  const id = useUid('vpchk');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-g`} x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="31" r="24" fill={`url(#${id}-g)`} />
      <path d="M21 31L28 38L43 23" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const BackArrow3D: React.FC<VisitPassAssetProps> = ({ size = 18, className = '' }) => {
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
