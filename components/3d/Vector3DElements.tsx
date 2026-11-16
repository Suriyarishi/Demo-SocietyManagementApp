import React from 'react';

interface Vector3DProps {
  size?: number;
  className?: string;
  glow?: boolean;
}

/**
 * 1. M01 & Security: 3D Holographic Security Shield & Key
 * Isometric blue-indigo metallic shield with glass bevels, glowing keyhole, and floating ambient rings.
 */
export const ShieldKey3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-cobalt-500/25 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(37,99,235,0.35)] select-none"
      >
        <defs>
          <linearGradient id="shieldGrad" x1="20" y1="10" x2="100" y2="110" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="45%" stopColor="#2563EB" />
            <stop offset="100%" stopColor="#1D4ED8" />
          </linearGradient>
          <linearGradient id="bevelGrad" x1="15" y1="15" x2="105" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#93C5FD" stopOpacity="0.8" />
            <stop offset="50%" stopColor="#60A5FA" stopOpacity="0.1" />
            <stop offset="100%" stopColor="#1E40AF" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="plateGrad" x1="40" y1="30" x2="80" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#DBEAFE" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#93C5FD" stopOpacity="0.1" />
          </linearGradient>
          <radialGradient id="glowPoint" cx="60" cy="52" r="30" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#60A5FA" stopOpacity="0.9" />
            <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
          </radialGradient>
          <filter id="shadow3D" x="-10%" y="-10%" width="130%" height="130%">
            <feDropShadow dx="0" dy="6" stdDeviation="6" floodColor="#0F172A" floodOpacity="0.3" />
          </filter>
        </defs>

        {/* Ambient Orbit Ring */}
        <ellipse cx="60" cy="98" rx="42" ry="12" fill="#1E3A8A" fillOpacity="0.25" />
        <ellipse cx="60" cy="94" rx="36" ry="8" stroke="#93C5FD" strokeOpacity="0.3" strokeWidth="2" strokeDasharray="4 4" />

        {/* Shield Back Extrusion (3D Depth) */}
        <path
          d="M60 110L22 92C18 64 16 38 18 20L60 6L102 20C104 38 102 64 98 92L60 110Z"
          fill="#172554"
        />

        {/* Main 3D Shield Body */}
        <path
          d="M60 106L24 89C20 62 18 37 20 20L60 8L100 20C102 37 100 62 96 89L60 106Z"
          fill="url(#shieldGrad)"
          filter="url(#shadow3D)"
        />

        {/* Glossy Bevel & Light Reflection */}
        <path
          d="M60 106L24 89C20 62 18 37 20 20L60 8V106Z"
          fill="url(#bevelGrad)"
          fillOpacity="0.5"
        />

        {/* Inner Futuristic Emblem Plate */}
        <path
          d="M60 92L34 78C31 56 30 36 32 23L60 15L88 23C90 36 89 56 86 78L60 92Z"
          fill="#1E40AF"
          fillOpacity="0.6"
          stroke="url(#plateGrad)"
          strokeWidth="2"
        />

        {/* Central Glowing Lock Core */}
        <circle cx="60" cy="48" r="14" fill="#0F172A" stroke="#60A5FA" strokeWidth="2.5" />
        <circle cx="60" cy="48" r="10" fill="url(#glowPoint)" />
        <rect x="57" y="48" width="6" height="15" rx="3" fill="#FFFFFF" />

        {/* Specular Highlight Streak */}
        <path
          d="M34 26L54 18L38 48C35 40 34 33 34 26Z"
          fill="#FFFFFF"
          fillOpacity="0.45"
        />
      </svg>
    </div>
  );
};

/**
 * 2. M02 (Home Command Hub): 3D Residential Luxury Towers
 * Futuristic skyscraper twin-towers with glowing skybridge, glass windows, and biometric radar.
 */
export const TowerResidence3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-emerald-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(16,185,129,0.25)] select-none"
      >
        <defs>
          <linearGradient id="towerLeft" x1="20" y1="20" x2="55" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#10B981" />
            <stop offset="60%" stopColor="#059669" />
            <stop offset="100%" stopColor="#047857" />
          </linearGradient>
          <linearGradient id="towerRight" x1="60" y1="10" x2="100" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#34D399" />
            <stop offset="50%" stopColor="#10B981" />
            <stop offset="100%" stopColor="#065F46" />
          </linearGradient>
          <linearGradient id="skyBridge" x1="45" y1="50" x2="80" y2="65" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A7F3D0" />
            <stop offset="100%" stopColor="#059669" />
          </linearGradient>
        </defs>

        {/* Podium Base Shadow */}
        <ellipse cx="60" cy="104" rx="46" ry="12" fill="#064E3B" fillOpacity="0.3" />

        {/* Tower 1 (Left Building) */}
        <path d="M26 100V35L42 25L54 32V100H26Z" fill="#064E3B" />
        <path d="M24 98V33L40 23V98H24Z" fill="url(#towerLeft)" />
        {/* Left Windows */}
        <rect x="28" y="38" width="8" height="4" rx="1.5" fill="#E6FFFA" fillOpacity="0.8" />
        <rect x="28" y="47" width="8" height="4" rx="1.5" fill="#E6FFFA" fillOpacity="0.8" />
        <rect x="28" y="56" width="8" height="4" rx="1.5" fill="#E6FFFA" fillOpacity="0.8" />
        <rect x="28" y="65" width="8" height="4" rx="1.5" fill="#E6FFFA" fillOpacity="0.8" />
        <rect x="28" y="74" width="8" height="4" rx="1.5" fill="#E6FFFA" fillOpacity="0.8" />

        {/* Tower 2 (Right Tall Tower) */}
        <path d="M62 100V22L82 12L96 20V100H62Z" fill="#047857" />
        <path d="M60 98V20L80 10V98H60Z" fill="url(#towerRight)" />
        {/* Right Tower Facet Depth */}
        <path d="M80 10L94 18V98L80 98V10Z" fill="#064E3B" />
        {/* Right Windows */}
        <rect x="66" y="24" width="9" height="4" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="66" y="33" width="9" height="4" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="66" y="42" width="9" height="4" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="66" y="51" width="9" height="4" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="66" y="60" width="9" height="4" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="66" y="69" width="9" height="4" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />
        <rect x="66" y="78" width="9" height="4" rx="1.5" fill="#FFFFFF" fillOpacity="0.9" />

        {/* Skybridge Connecting Twin Towers */}
        <path d="M40 50H60V58H40V50Z" fill="url(#skyBridge)" stroke="#A7F3D0" strokeWidth="1" />
        <line x1="42" y1="54" x2="58" y2="54" stroke="#FFFFFF" strokeWidth="1.5" />

        {/* Rooftop Spire & Beacon */}
        <line x1="80" y1="10" x2="80" y2="2" stroke="#34D399" strokeWidth="2.5" strokeLinecap="round" />
        <circle cx="80" cy="2" r="3" fill="#EF4444" className="animate-pulse" />
      </svg>
    </div>
  );
};

/**
 * 3. M03 (Gate Pass & Visitors): 3D Smart Boom Barrier
 * Isometric automated gate boom barrier with glowing LED status light, optical camera scanner, and stop sign.
 */
export const GateBarrier3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-blue-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(37,99,235,0.3)] select-none"
      >
        <defs>
          <linearGradient id="barrierArm" x1="30" y1="40" x2="110" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" />
            <stop offset="100%" stopColor="#F8FAFC" />
          </linearGradient>
          <linearGradient id="kioskGrad" x1="15" y1="40" x2="35" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#3B82F6" />
            <stop offset="100%" stopColor="#1E3A8A" />
          </linearGradient>
        </defs>

        {/* Ground Foundation */}
        <ellipse cx="60" cy="105" rx="46" ry="10" fill="#0F172A" fillOpacity="0.25" />

        {/* Security Kiosk Post (Left) */}
        <path d="M16 100V48L28 40L38 46V100H16Z" fill="#1E293B" />
        <path d="M14 98V46L26 38V98H14Z" fill="url(#kioskGrad)" />
        <path d="M26 38L36 44V98L26 98V38Z" fill="#1D4ED8" />

        {/* Pivot Hub */}
        <circle cx="26" cy="46" r="8" fill="#0F172A" stroke="#93C5FD" strokeWidth="2" />
        <circle cx="26" cy="46" r="3.5" fill="#3B82F6" />

        {/* 3D Barrier Arm (Extended) */}
        <g transform="rotate(-18 26 46)">
          <path
            d="M26 43H112C114 43 115 45 115 47C115 49 114 51 112 51H26V43Z"
            fill="url(#barrierArm)"
            stroke="#94A3B8"
            strokeWidth="1"
          />
          {/* Reflective Red Chevrons */}
          <path d="M42 43L48 51H56L50 43H42Z" fill="#EF4444" />
          <path d="M64 43L70 51H78L72 43H64Z" fill="#EF4444" />
          <path d="M86 43L92 51H100L94 43H86Z" fill="#EF4444" />
          {/* Arm Tip LED Light */}
          <circle cx="112" cy="47" r="3" fill="#10B981" className="animate-pulse" />
        </g>

        {/* Optical OCR Scanner Camera on Pole */}
        <rect x="22" y="24" width="8" height="14" rx="2" fill="#0F172A" stroke="#60A5FA" strokeWidth="1" />
        <circle cx="26" cy="30" r="2.5" fill="#38BDF8" className="animate-ping" />
      </svg>
    </div>
  );
};

/**
 * 4. M04 (Daily Staff & Turnstile): 3D RFID Card & Pedestrian Turnstile
 * Floating RFID identity card with optical chip, holographic resident badge, and tripod turnstile arm.
 */
export const RfidTurnstile3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-indigo-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(99,102,241,0.3)] select-none"
      >
        <defs>
          <linearGradient id="cardGrad" x1="20" y1="20" x2="95" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#6366F1" />
            <stop offset="60%" stopColor="#4F46E5" />
            <stop offset="100%" stopColor="#3730A3" />
          </linearGradient>
          <linearGradient id="goldChip" x1="30" y1="45" x2="48" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#CA8A04" />
          </linearGradient>
        </defs>

        {/* Floor Shadow */}
        <ellipse cx="60" cy="102" rx="40" ry="10" fill="#1E1B4B" fillOpacity="0.3" />

        {/* Floating 3D RFID Smart Card */}
        <rect
          x="20"
          y="24"
          width="80"
          height="52"
          rx="10"
          fill="url(#cardGrad)"
          stroke="#A5B4FC"
          strokeWidth="1.5"
          transform="rotate(-8 60 50)"
        />

        {/* Holographic Signal Lines */}
        <g transform="rotate(-8 60 50)">
          <rect x="30" y="42" width="16" height="13" rx="2.5" fill="url(#goldChip)" />
          {/* EMV Microchip Lines */}
          <line x1="30" y1="48" x2="46" y2="48" stroke="#713F12" strokeWidth="1" />
          <line x1="38" y1="42" x2="38" y2="55" stroke="#713F12" strokeWidth="1" />

          {/* Wi-Fi / RFID Waves */}
          <path d="M72 40C75 43 75 48 72 51" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" />
          <path d="M76 36C81 41 81 51 76 56" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.6" />
          <path d="M80 32C87 39 87 55 80 62" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" opacity="0.3" />

          <text x="30" y="68" fill="#C7D2FE" fontSize="6" fontFamily="monospace" fontWeight="bold">
            RFID • STAFF ID
          </text>
        </g>

        {/* Verification Checkmark Badge */}
        <circle cx="86" cy="80" r="14" fill="#10B981" stroke="#FFFFFF" strokeWidth="2.5" />
        <path d="M80 80L84 84L92 75" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
};

/**
 * 5. M05 (Financials & Bills): 3D Smart Sub-Meter & Currency Stacks
 * Isometric smart digital electric meter with glowing LED digital readouts and gold coin stack.
 */
export const SmartMeter3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-amber-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(217,119,6,0.25)] select-none"
      >
        <defs>
          <linearGradient id="meterBody" x1="25" y1="20" x2="95" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F8FAFC" />
            <stop offset="100%" stopColor="#E2E8F0" />
          </linearGradient>
          <linearGradient id="coinGrad" x1="70" y1="70" x2="105" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FBBF24" />
            <stop offset="100%" stopColor="#D97706" />
          </linearGradient>
        </defs>

        <ellipse cx="60" cy="105" rx="42" ry="10" fill="#0F172A" fillOpacity="0.2" />

        {/* Meter Outer Casing */}
        <rect x="25" y="20" width="70" height="72" rx="16" fill="url(#meterBody)" stroke="#CBD5E1" strokeWidth="2" />

        {/* Dark Digital LCD Screen */}
        <rect x="33" y="30" width="54" height="26" rx="8" fill="#0F172A" stroke="#334155" strokeWidth="1.5" />
        <text x="40" y="46" fill="#38BDF8" fontSize="12" fontFamily="monospace" fontWeight="bold">
          428.5
        </text>
        <text x="73" y="46" fill="#94A3B8" fontSize="7" fontFamily="sans-serif" fontWeight="bold">
          kWh
        </text>

        {/* Pulse LED */}
        <circle cx="42" cy="65" r="3.5" fill="#10B981" className="animate-ping" />
        <circle cx="42" cy="65" r="3.5" fill="#10B981" />
        <text x="49" y="67" fill="#64748B" fontSize="7" fontWeight="bold">
          LIVE
        </text>

        {/* 3D Gold Coins Stack (Foreground) */}
        <g>
          <ellipse cx="88" cy="94" rx="14" ry="5" fill="#B45309" />
          <ellipse cx="88" cy="91" rx="14" ry="5" fill="url(#coinGrad)" stroke="#FDE68A" strokeWidth="1" />
          <ellipse cx="88" cy="85" rx="14" ry="5" fill="url(#coinGrad)" stroke="#FDE68A" strokeWidth="1" />
          <ellipse cx="88" cy="79" rx="14" ry="5" fill="url(#coinGrad)" stroke="#FDE68A" strokeWidth="1" />
          <text x="85" y="82" fill="#78350F" fontSize="8" fontWeight="black">
            ₹
          </text>
        </g>
      </svg>
    </div>
  );
};

/**
 * 6. M06 (Tickets & SLA Helpdesk): 3D 15m Express Service Toolbox
 * Isometric technician toolbox with speed lightning bolt and ergonomic spanner wrench.
 */
export const ExpressToolbox3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-yellow-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(234,179,8,0.25)] select-none"
      >
        <defs>
          <linearGradient id="boxGrad" x1="20" y1="40" x2="95" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>
          <linearGradient id="boltGrad" x1="60" y1="10" x2="90" y2="60" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FACC15" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        <ellipse cx="60" cy="102" rx="42" ry="10" fill="#431407" fillOpacity="0.25" />

        {/* Toolbox Main Body */}
        <rect x="22" y="46" width="76" height="48" rx="12" fill="url(#boxGrad)" stroke="#FDBA74" strokeWidth="1.5" />
        <rect x="22" y="46" width="76" height="14" rx="6" fill="#C2410C" />

        {/* Heavy Metal Latches */}
        <rect x="36" y="54" width="8" height="12" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />
        <rect x="76" y="54" width="8" height="12" rx="2" fill="#E2E8F0" stroke="#64748B" strokeWidth="1" />

        {/* Sturdy Handle */}
        <path d="M44 46V32C44 28 48 26 52 26H68C72 26 76 28 76 32V46" stroke="#475569" strokeWidth="5" strokeLinecap="round" />

        {/* 15m Express Lightning Energy Bolt */}
        <path
          d="M86 16L68 44H84L70 76L102 40H86L94 16H86Z"
          fill="url(#boltGrad)"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          className="drop-shadow-md"
        />

        {/* 15m Badge */}
        <rect x="34" y="72" width="34" height="14" rx="4" fill="#0F172A" />
        <text x="38" y="82" fill="#FACC15" fontSize="8" fontWeight="black" fontFamily="sans-serif">
          15m ETA ⚡
        </text>
      </svg>
    </div>
  );
};

/**
 * 7. M07 / M11 (Household & Settings): 3D Smart Deadbolt Door Lock
 * Isometric brushed metal keypad lock with illuminated status ring and secure deadbolt cylinder.
 */
export const DigitalLock3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-indigo-500/25 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(79,70,229,0.3)] select-none"
      >
        <defs>
          <linearGradient id="lockPlate" x1="30" y1="15" x2="90" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#1E293B" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
          <linearGradient id="rimGrad" x1="30" y1="15" x2="90" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#94A3B8" />
            <stop offset="100%" stopColor="#334155" />
          </linearGradient>
        </defs>

        <ellipse cx="60" cy="106" rx="38" ry="8" fill="#0F172A" fillOpacity="0.3" />

        {/* Escutcheon Plate (Solid Brushed Body) */}
        <rect x="32" y="16" width="56" height="88" rx="18" fill="url(#lockPlate)" stroke="url(#rimGrad)" strokeWidth="2.5" />

        {/* Keypad Digits Grid */}
        <circle cx="46" cy="32" r="3.5" fill="#334155" />
        <circle cx="60" cy="32" r="3.5" fill="#334155" />
        <circle cx="74" cy="32" r="3.5" fill="#334155" />
        <circle cx="46" cy="42" r="3.5" fill="#334155" />
        <circle cx="60" cy="42" r="3.5" fill="#334155" />
        <circle cx="74" cy="42" r="3.5" fill="#334155" />

        {/* Optical Fingerprint Scanner */}
        <circle cx="60" cy="62" r="12" fill="#020617" stroke="#38BDF8" strokeWidth="2" />
        <circle cx="60" cy="62" r="8" fill="#0369A1" fillOpacity="0.3" />
        <path d="M56 62C58 59 62 59 64 62C65 64 63 66 60 66" stroke="#38BDF8" strokeWidth="1.5" strokeLinecap="round" />

        {/* Heavy Turning Thumbturn */}
        <rect x="48" y="80" width="24" height="8" rx="4" fill="#64748B" stroke="#CBD5E1" strokeWidth="1" />
        <circle cx="60" cy="84" r="2.5" fill="#10B981" />
      </svg>
    </div>
  );
};

/**
 * 8. M08 (Society Living Hub): 3D Clubhouse Pavilion & Swimming Pool
 * Isometric grand clubhouse pavilion with arches, crystal pool ripples, and park greenery.
 */
export const Clubhouse3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-teal-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(13,148,136,0.25)] select-none"
      >
        <defs>
          <linearGradient id="roofGrad" x1="20" y1="20" x2="100" y2="50" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0D9488" />
            <stop offset="100%" stopColor="#042F2E" />
          </linearGradient>
          <linearGradient id="poolWater" x1="30" y1="75" x2="90" y2="95" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#38BDF8" />
            <stop offset="100%" stopColor="#0284C7" />
          </linearGradient>
        </defs>

        <ellipse cx="60" cy="104" rx="46" ry="12" fill="#042F2E" fillOpacity="0.25" />

        {/* Clubhouse Classical Gable Roof */}
        <path d="M18 46L60 22L102 46H18Z" fill="url(#roofGrad)" />
        <path d="M22 46H98V50H22V46Z" fill="#F0FDFA" />

        {/* Grand Pillars */}
        <rect x="28" y="50" width="8" height="30" fill="#CCFBF1" />
        <rect x="46" y="50" width="8" height="30" fill="#CCFBF1" />
        <rect x="66" y="50" width="8" height="30" fill="#CCFBF1" />
        <rect x="84" y="50" width="8" height="30" fill="#CCFBF1" />

        {/* Swimming Pool Basin in Front */}
        <ellipse cx="60" cy="90" rx="36" ry="12" fill="url(#poolWater)" stroke="#BAE6FD" strokeWidth="2" />
        {/* Pool Lane Markers */}
        <path d="M38 88C48 92 72 92 82 88" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
        <path d="M42 93C50 96 70 96 78 93" stroke="#FFFFFF" strokeWidth="1" strokeDasharray="3 3" />
      </svg>
    </div>
  );
};

/**
 * 9. M09 (Resident Marketplace): 3D Community Marketplace Bag & Gift Box
 * Isometric tote bag with verified leaf badge and ribbon gift package for peer-to-peer exchanges.
 */
export const MarketplaceBox3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-rose-500/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_24px_rgba(244,63,94,0.25)] select-none"
      >
        <defs>
          <linearGradient id="bagGrad" x1="25" y1="35" x2="95" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#F43F5E" />
            <stop offset="100%" stopColor="#BE123C" />
          </linearGradient>
          <linearGradient id="ribbonGrad" x1="45" y1="20" x2="75" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FDE047" />
            <stop offset="100%" stopColor="#EAB308" />
          </linearGradient>
        </defs>

        <ellipse cx="60" cy="104" rx="40" ry="10" fill="#4C0519" fillOpacity="0.25" />

        {/* Tote Bag / Gift Box Body */}
        <path d="M30 46L24 96C24 99 26 102 30 102H90C94 102 96 99 96 96L90 46H30Z" fill="url(#bagGrad)" />

        {/* Rope Handles */}
        <path d="M44 46V30C44 22 50 18 60 18C70 18 76 22 76 30V46" stroke="#FFE4E6" strokeWidth="4" strokeLinecap="round" fill="none" />

        {/* Golden Cross Ribbon */}
        <rect x="55" y="46" width="10" height="56" fill="url(#ribbonGrad)" />
        <rect x="27" y="68" width="66" height="10" fill="url(#ribbonGrad)" />

        {/* Verified Community Star Tag */}
        <circle cx="60" cy="73" r="10" fill="#FFFFFF" stroke="#FDE047" strokeWidth="2" />
        <text x="56" y="77" fill="#BE123C" fontSize="10" fontWeight="bold">
          ★
        </text>
      </svg>
    </div>
  );
};

/**
 * 10. M10 (Emergency SOS): 3D Emergency Siren Beacon
 * High-urgency rotating siren with Fresnel glass lens, crimson reflection cone, and soundwaves.
 */
export const EmergencyBeacon3D: React.FC<Vector3DProps> = ({ size = 64, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-red-600/30 rounded-full blur-2xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_28px_rgba(220,38,38,0.45)] select-none"
      >
        <defs>
          <linearGradient id="sirenDome" x1="30" y1="20" x2="90" y2="80" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="60%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>
          <linearGradient id="beaconBase" x1="25" y1="75" x2="95" y2="105" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#334155" />
            <stop offset="100%" stopColor="#0F172A" />
          </linearGradient>
        </defs>

        {/* Bottom Shadow */}
        <ellipse cx="60" cy="105" rx="42" ry="10" fill="#450A0A" fillOpacity="0.4" />

        {/* Heavy Mechanical Base */}
        <path d="M26 84L22 98C22 101 25 103 29 103H91C95 103 98 101 98 98L94 84H26Z" fill="url(#beaconBase)" stroke="#64748B" strokeWidth="1" />
        <rect x="28" y="78" width="64" height="8" rx="2" fill="#1E293B" stroke="#475569" strokeWidth="1" />

        {/* 3D Glass Dome Lens */}
        <path
          d="M32 78V48C32 32 44 20 60 20C76 20 88 32 88 48V78H32Z"
          fill="url(#sirenDome)"
          stroke="#F87171"
          strokeWidth="1.5"
        />

        {/* Fresnel Lens Grooves */}
        <line x1="36" y1="42" x2="84" y2="42" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="34" y1="54" x2="86" y2="54" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />
        <line x1="33" y1="66" x2="87" y2="66" stroke="#FFFFFF" strokeWidth="1.5" strokeOpacity="0.4" />

        {/* Inner Intense Filament Glow */}
        <circle cx="60" cy="52" r="10" fill="#FFFFFF" className="animate-ping" />
        <circle cx="60" cy="52" r="8" fill="#FEF08A" />

        {/* Sound Radiation Arcs */}
        <path d="M16 48C12 55 12 65 16 72" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M104 48C108 55 108 65 104 72" stroke="#EF4444" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    </div>
  );
};

/**
 * 11. M07 / Resident Pass: 3D Holographic Resident Smart Access Keycard
 * Isometric biometric smart card with glowing emerald RFID antenna, gold EMV chip,
 * 3D security shield emblem, and floating contactless transmission waves.
 */
export const ResidentSmartPass3D: React.FC<Vector3DProps> = ({ size = 72, className = '', glow = true }) => {
  return (
    <div
      className={`relative inline-flex items-center justify-center shrink-0 ${className}`}
      style={{ width: size, height: size }}
    >
      {glow && (
        <div className="absolute inset-0 bg-[#04BB49]/20 rounded-full blur-xl animate-pulse pointer-events-none" />
      )}
      <svg
        viewBox="0 0 120 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-[0_12px_28px_rgba(4,187,73,0.35)] select-none"
      >
        <defs>
          {/* Card Body Gradient with #04BB49 Spring Emerald */}
          <linearGradient id="smartCardGrad" x1="15" y1="20" x2="105" y2="100" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#0ECD5A" />
            <stop offset="45%" stopColor="#04BB49" />
            <stop offset="100%" stopColor="#024D1E" />
          </linearGradient>

          {/* Chamfer & Bevel Highlight */}
          <linearGradient id="bevelLight" x1="10" y1="15" x2="95" y2="90" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#A4EFC3" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FFFFFF" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#038032" stopOpacity="0.2" />
          </linearGradient>

          {/* 24K Gold EMV Security Chip */}
          <linearGradient id="emvChipGrad" x1="28" y1="42" x2="48" y2="62" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FEF08A" />
            <stop offset="40%" stopColor="#EAB308" />
            <stop offset="100%" stopColor="#A16207" />
          </linearGradient>

          {/* Hologram Core */}
          <radialGradient id="holoLens" cx="78" cy="50" r="22" gradientUnits="userSpaceOnUse">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="40%" stopColor="#6EE3A1" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#04BB49" stopOpacity="0.1" />
          </radialGradient>
        </defs>

        {/* Ambient Isometric Shadow */}
        <ellipse cx="60" cy="106" rx="44" ry="10" fill="#022B11" fillOpacity="0.3" />

        {/* 3D Extruded Card Base (Thickness/Depth) */}
        <g transform="rotate(-10 60 54)">
          <rect
            x="14"
            y="26"
            width="88"
            height="58"
            rx="12"
            fill="#013615"
          />
        </g>

        {/* Main Floating 3D Isometric Card Surface */}
        <g transform="rotate(-10 60 52)">
          {/* Card Body */}
          <rect
            x="14"
            y="22"
            width="88"
            height="58"
            rx="12"
            fill="url(#smartCardGrad)"
            stroke="url(#bevelLight)"
            strokeWidth="1.5"
          />

          {/* Holographic Security Guilloche Arcs */}
          <path
            d="M20 32C45 28 75 35 96 48"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.25"
            strokeDasharray="3 3"
          />
          <path
            d="M16 46C42 42 70 50 94 65"
            stroke="#FFFFFF"
            strokeWidth="1"
            strokeOpacity="0.2"
            strokeDasharray="4 4"
          />

          {/* EMV Gold Microchip */}
          <rect
            x="26"
            y="36"
            width="18"
            height="15"
            rx="3"
            fill="url(#emvChipGrad)"
            stroke="#CA8A04"
            strokeWidth="0.8"
          />
          <line x1="26" y1="43.5" x2="44" y2="43.5" stroke="#713F12" strokeWidth="0.8" />
          <line x1="35" y1="36" x2="35" y2="51" stroke="#713F12" strokeWidth="0.8" />
          <circle cx="35" cy="43.5" r="2" fill="#FEF08A" stroke="#713F12" strokeWidth="0.6" />

          {/* Contactless RFID Waves (Active Beacon) */}
          <path d="M50 40C53 43 53 47 50 50" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.95" />
          <path d="M54 36C59 41 59 49 54 54" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.7" />
          <path d="M58 32C65 39 65 53 58 60" stroke="#FFFFFF" strokeWidth="1.8" strokeLinecap="round" strokeOpacity="0.4" />

          {/* Hologram Resident Shield Crest */}
          <circle cx="80" cy="50" r="14" fill="url(#holoLens)" stroke="#FFFFFF" strokeWidth="1.2" strokeOpacity="0.6" />
          {/* Mini 3D Keyhole inside Crest */}
          <path
            d="M80 43C77.8 43 76 44.8 76 47C76 48.5 76.8 49.8 78 50.5V55C78 56.1 78.9 57 80 57C81.1 57 82 56.1 82 55V50.5C83.2 49.8 84 48.5 84 47C84 44.8 82.2 43 80 43Z"
            fill="#013615"
            stroke="#6EE3A1"
            strokeWidth="0.8"
          />

          {/* Micro Laser-Engraved Text */}
          <text x="26" y="68" fill="#FFFFFF" fillOpacity="0.9" fontSize="6" fontFamily="monospace" fontWeight="bold" letterSpacing="0.5">
            HUNT • RESIDENT PASS
          </text>

          {/* Glossy Diagonal Specular Highlight */}
          <path
            d="M20 22L45 22L25 78L14 78C14 78 14 65 14 55L20 22Z"
            fill="#FFFFFF"
            fillOpacity="0.25"
          />
        </g>

        {/* Orbiting Laser Ring (3D Particle) */}
        <circle cx="94" cy="40" r="4" fill="#0ECD5A" className="animate-ping" opacity="0.75" />
        <circle cx="94" cy="40" r="3" fill="#FFFFFF" />
      </svg>
    </div>
  );
};
