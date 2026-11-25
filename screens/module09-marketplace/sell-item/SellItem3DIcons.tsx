import React, { useId } from 'react';

export interface Icon3DProps {
  size?: number;
  className?: string;
}

/**
 * Helper hook for collision-free SVG gradient/filter IDs when multiple icons render simultaneously.
 */
function useUid(prefix: string): string {
  const raw = useId().replace(/:/g, '');
  return `${prefix}-${raw}`;
}

/**
 * 1. Furniture & Decor — Three-quarter 3D plush armchair (terracotta/coral)
 */
export const Armchair3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('armchair');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-back`} x1="14" y1="10" x2="50" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FB923C" />
          <stop offset="60%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
        <linearGradient id={`${id}-cushion`} x1="16" y1="26" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#EA580C" />
        </linearGradient>
        <linearGradient id={`${id}-arm`} x1="10" y1="26" x2="24" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="50%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>
      {/* Grounding shadow */}
      <ellipse cx="32" cy="56" rx="20" ry="4" fill="#7C2D12" fillOpacity="0.22" />
      {/* Wooden legs */}
      <rect x="17" y="47" width="4" height="8" rx="2" fill="#78350F" />
      <rect x="43" y="47" width="4" height="8" rx="2" fill="#78350F" />
      {/* Backrest 3D extrusion & front */}
      <rect x="15" y="12" width="34" height="27" rx="9" fill="#9A3412" />
      <rect x="14" y="10" width="34" height="27" rx="9" fill={`url(#${id}-back)`} />
      {/* Top backrest specular highlight */}
      <path d="M21 12.5H41" stroke="#FFEDD5" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
      {/* Seat cushion */}
      <rect x="15" y="31" width="34" height="16" rx="6" fill="#C2410C" />
      <rect x="14" y="29" width="34" height="15" rx="6" fill={`url(#${id}-cushion)`} />
      {/* Left & Right Rounded Armrests */}
      <rect x="9" y="26" width="10" height="22" rx="5" fill={`url(#${id}-arm)`} />
      <rect x="45" y="26" width="10" height="22" rx="5" fill={`url(#${id}-arm)`} />
      <path d="M12 29.5V41" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="1.8" strokeLinecap="round" />
      <path d="M48 29.5V41" stroke="#FFFFFF" strokeOpacity="0.35" strokeWidth="1.8" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 2. Others / Package — Three-quarter 3D parcel box with satin packing tape
 */
export const ParcelBox3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('parcel');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-top`} x1="14" y1="12" x2="50" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={`${id}-left`} x1="10" y1="24" x2="32" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FBBF24" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
        <linearGradient id={`${id}-right`} x1="32" y1="24" x2="54" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="20" ry="4.5" fill="#78350F" fillOpacity="0.22" />
      {/* Left face */}
      <path d="M12 24L32 34V54L12 44V24Z" fill={`url(#${id}-left)`} />
      {/* Right face */}
      <path d="M52 24L32 34V54L52 44V24Z" fill={`url(#${id}-right)`} />
      {/* Top face */}
      <path d="M32 13L52 24L32 34L12 24L32 13Z" fill={`url(#${id}-top)`} />
      {/* Top-left bevel highlight */}
      <path d="M14 24L32 14.5L49 23.5" stroke="#FEF3C7" strokeOpacity="0.7" strokeWidth="1.5" strokeLinecap="round" />
      {/* Glossy tape ribbon across top & down side */}
      <path d="M21 19L41 29.5L46 27L26 16.5L21 19Z" fill="#FFFFFF" fillOpacity="0.75" />
      <path d="M41 29.5L46 27V38L41 40.5V29.5Z" fill="#FEF3C7" fillOpacity="0.85" />
    </svg>
  );
};

/**
 * 3. Electronics & Appliances — Sleek 3D three-quarter smartphone
 */
export const Smartphone3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('phone');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-body`} x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#0F172A" />
        </linearGradient>
        <linearGradient id={`${id}-screen`} x1="20" y1="12" x2="44" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="50%" stopColor="#3B82F6" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="16" ry="3.5" fill="#0F172A" fillOpacity="0.25" />
      {/* Extruded metallic side edge */}
      <rect x="20" y="9" width="27" height="46" rx="7" fill="#1E293B" />
      {/* Main phone frame */}
      <rect x="17" y="7" width="27" height="46" rx="7" fill={`url(#${id}-body)`} stroke="#94A3B8" strokeWidth="1" strokeOpacity="0.5" />
      {/* Glossy glass screen */}
      <rect x="19.5" y="10" width="22" height="40" rx="5" fill={`url(#${id}-screen)`} />
      {/* Dynamic notch */}
      <rect x="26" y="11.5" width="9" height="2.6" rx="1.3" fill="#0F172A" />
      {/* Diagonal studio glass reflection */}
      <path d="M21 15L35 10L24 38L20 34V18C20 16.3 20.4 15.5 21 15Z" fill="#FFFFFF" fillOpacity="0.28" />
      {/* Bottom home indicator pill */}
      <rect x="26.5" y="46.5" width="8" height="1.8" rx="0.9" fill="#FFFFFF" fillOpacity="0.7" />
    </svg>
  );
};

/**
 * 4. Services — 3D verified person silhouette with floating emerald checkmark orb
 */
export const ServiceVerified3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('service');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-person`} x1="16" y1="10" x2="46" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="55%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1D4ED8" />
        </linearGradient>
        <linearGradient id={`${id}-badge`} x1="36" y1="34" x2="54" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="56" rx="18" ry="4" fill="#1E3A8A" fillOpacity="0.22" />
      {/* Head with upper-left highlight */}
      <circle cx="30" cy="21" r="10" fill="#1E40AF" />
      <circle cx="29" cy="20" r="10" fill={`url(#${id}-person)`} />
      <ellipse cx="26" cy="16" rx="3.5" ry="2" fill="#FFFFFF" fillOpacity="0.35" transform="rotate(-25 26 16)" />
      {/* Shoulders */}
      <path d="M13 50C13 39.5 20 34 30 34C40 34 47 39.5 47 50C47 52.2 45.2 54 43 54H17C14.8 54 13 52.2 13 50Z" fill="#1E40AF" />
      <path d="M12 49C12 38.5 19 33 29 33C39 33 46 38.5 46 49C46 51.2 44.2 53 42 53H16C13.8 53 12 51.2 12 49Z" fill={`url(#${id}-person)`} />
      {/* Floating Emerald Verified Orb */}
      <circle cx="45" cy="44" r="10.5" fill="#065F46" />
      <circle cx="44" cy="43" r="10" fill={`url(#${id}-badge)`} stroke="#FFFFFF" strokeWidth="1.8" />
      <path d="M39.5 43L42.5 46L48.5 40" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * 5. Fashion & Accessories — Soft 3D sculpted pastel coral apparel tee
 */
export const FashionTee3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('tee');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-shirt`} x1="12" y1="12" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="50%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#BE123C" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="18" ry="4" fill="#881337" fillOpacity="0.2" />
      {/* Extrusion depth */}
      <path d="M23 14C25 18 39 18 41 14L54 20L49 32L44 30V52C44 53.5 42.8 54.5 41.2 54.5H22.8C21.2 54.5 20 53.5 20 52V30L15 32L10 20L23 14Z" fill="#9F1239" />
      {/* Main sculpted tee */}
      <path d="M22 12C24.5 16.8 38.5 16.8 41 12L53 18.5L48 30.5L43 28.5V50.5C43 52 41.8 53 40.2 53H21.8C20.2 53 19 52 19 50.5V28.5L14 30.5L9 18.5L22 12Z" fill={`url(#${id}-shirt)`} />
      {/* Collar inner shadow & top-left highlight */}
      <path d="M23 12.5C26 17.5 37 17.5 40 12.5" stroke="#FFE4E6" strokeWidth="2.2" strokeLinecap="round" />
      <path d="M13 20.5L20 16" stroke="#FFFFFF" strokeOpacity="0.4" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 6. Food — 3D ceramic dish with crossed metallic fork & spoon
 */
export const FoodCutlery3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('food');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-plate`} x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#94A3B8" />
        </linearGradient>
        <linearGradient id={`${id}-metal`} x1="20" y1="16" x2="46" y2="46" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="20" ry="4" fill="#334155" fillOpacity="0.2" />
      {/* Ceramic plate base & rim */}
      <circle cx="32" cy="33" r="22" fill="#94A3B8" />
      <circle cx="32" cy="31" r="22" fill={`url(#${id}-plate)`} />
      <circle cx="32" cy="31" r="15" fill="#F8FAFC" stroke="#CBD5E1" strokeWidth="1.5" />
      {/* Fork */}
      <path d="M21 20L42 41" stroke={`url(#${id}-metal)`} strokeWidth="3.5" strokeLinecap="round" />
      <path d="M18 22L22 18M20 24L24 20M22 26L26 22" stroke="#475569" strokeWidth="1.8" strokeLinecap="round" />
      {/* Spoon */}
      <path d="M41 21L22 41" stroke="#F59E0B" strokeWidth="3.5" strokeLinecap="round" />
      <ellipse cx="42" cy="20" rx="4.5" ry="6" transform="rotate(45 42 20)" fill="#FBBF24" stroke="#B45309" strokeWidth="1.2" />
    </svg>
  );
};

/**
 * 7. Vehicles — 3D rounded amber compact car in three-quarter view
 */
export const VehicleCar3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('car');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-body`} x1="10" y1="20" x2="54" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="20" y1="18" x2="44" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E0F2FE" />
          <stop offset="100%" stopColor="#38BDF8" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="52" rx="23" ry="4.5" fill="#78350F" fillOpacity="0.25" />
      {/* Cabin roof */}
      <path d="M19 29L24 18C25 16 27 15 29.5 15H39.5C42 15 44 16.5 45.5 19L50 29H19Z" fill="#D97706" />
      <path d="M18 28L23 17C24 15.2 26 14.5 28.5 14.5H38.5C41 14.5 43 16 44.5 18.5L49 28H18Z" fill={`url(#${id}-body)`} />
      {/* Windshield & side window */}
      <path d="M21.5 27L25.5 18.5H38L42.5 27H21.5Z" fill={`url(#${id}-glass)`} />
      {/* Lower chassis */}
      <rect x="8" y="27" width="48" height="17" rx="8" fill="#B45309" />
      <rect x="7" y="25.5" width="48" height="16.5" rx="8" fill={`url(#${id}-body)`} />
      {/* Headlights */}
      <rect x="10" y="30" width="6" height="4" rx="2" fill="#FEF9C3" />
      <rect x="46" y="30" width="6" height="4" rx="2" fill="#FEF9C3" />
      {/* Wheels */}
      <circle cx="18" cy="43" r="6.5" fill="#0F172A" />
      <circle cx="18" cy="43" r="3" fill="#CBD5E1" />
      <circle cx="44" cy="43" r="6.5" fill="#0F172A" />
      <circle cx="44" cy="43" r="3" fill="#CBD5E1" />
    </svg>
  );
};

/**
 * 8. Books, Sports & Hobbies — 3D hardcover book with ivory pages and bookmark ribbon
 */
export const Book3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('book');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-cover`} x1="14" y1="10" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="60%" stopColor="#DC2626" />
          <stop offset="100%" stopColor="#991B1B" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="18" ry="4" fill="#7F1D1D" fillOpacity="0.22" />
      {/* Back cover & page block */}
      <rect x="17" y="13" width="33" height="41" rx="5" fill="#7F1D1D" />
      <rect x="16" y="45" width="32" height="7" rx="3" fill="#FEF3C7" />
      {/* Front 3D cover */}
      <rect x="14" y="9" width="33" height="39" rx="5" fill={`url(#${id}-cover)`} />
      {/* Spine bevel */}
      <rect x="14" y="9" width="6.5" height="39" rx="3" fill="#B91C1C" />
      <path d="M23 16H41" stroke="#FECACA" strokeOpacity="0.7" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M23 22H36" stroke="#FECACA" strokeOpacity="0.5" strokeWidth="2" strokeLinecap="round" />
      {/* Golden ribbon bookmark hanging from page block */}
      <path d="M36 47V57L39.5 54L43 57V47H36Z" fill="#FBBF24" />
    </svg>
  );
};

/**
 * 9. Kids & Baby Products — Cute 3D friendly pastel baby/pacifier badge
 */
export const BabyProduct3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('baby');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-face`} x1="16" y1="12" x2="48" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFEDD5" />
          <stop offset="60%" stopColor="#FED7AA" />
          <stop offset="100%" stopColor="#FDBA74" />
        </linearGradient>
        <linearGradient id={`${id}-pacifier`} x1="24" y1="32" x2="40" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#7DD3FC" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="17" ry="4" fill="#0369A1" fillOpacity="0.18" />
      {/* Ears */}
      <circle cx="15" cy="31" r="5" fill="#FDBA74" />
      <circle cx="49" cy="31" r="5" fill="#FDBA74" />
      {/* Head with top-left tuft */}
      <circle cx="32" cy="31" r="18" fill={`url(#${id}-face)`} />
      <path d="M30 13C30 9.5 34.5 9.5 34 13.5" stroke="#D97706" strokeWidth="2.5" strokeLinecap="round" />
      {/* Eyes & rosy cheeks */}
      <circle cx="25.5" cy="27.5" r="2.2" fill="#1E293B" />
      <circle cx="38.5" cy="27.5" r="2.2" fill="#1E293B" />
      <ellipse cx="22" cy="32" rx="3" ry="1.8" fill="#FDA4AF" fillOpacity="0.65" />
      <ellipse cx="42" cy="32" rx="3" ry="1.8" fill="#FDA4AF" fillOpacity="0.65" />
      {/* 3D Sky-Blue Pacifier */}
      <rect x="24" y="34" width="16" height="10" rx="5" fill={`url(#${id}-pacifier)`} />
      <circle cx="32" cy="41" r="4.5" stroke="#BAE6FD" strokeWidth="2.2" fill="none" />
    </svg>
  );
};

/**
 * 10. Parking — 3D rounded cobalt tile with extruded white P emblem
 */
export const Parking3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('parking');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-tile`} x1="12" y1="8" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="50%" stopColor="#2563EB" />
          <stop offset="100%" stopColor="#1E40AF" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="18" ry="4" fill="#1E3A8A" fillOpacity="0.24" />
      {/* 3D extruded tile depth */}
      <rect x="13" y="11" width="40" height="42" rx="11" fill="#1E3A8A" />
      {/* Main front tile */}
      <rect x="11" y="9" width="40" height="42" rx="11" fill={`url(#${id}-tile)`} />
      {/* Top highlight edge */}
      <path d="M18 11.5H44" stroke="#BFDBFE" strokeOpacity="0.65" strokeWidth="2" strokeLinecap="round" />
      {/* Crisp geometric P path */}
      <path
        d="M25 40V20H33.5C37.5 20 40 22.5 40 26.2C40 29.9 37.5 32.5 33.5 32.5H25"
        stroke="#FFFFFF"
        strokeWidth="4.8"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

/**
 * 11. Pets — 3D sculpted slate-indigo paw print with cushioned pads
 */
export const Paw3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('paw');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-pad`} x1="14" y1="12" x2="50" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#94A3B8" />
          <stop offset="55%" stopColor="#64748B" />
          <stop offset="100%" stopColor="#334155" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="18" ry="4" fill="#334155" fillOpacity="0.22" />
      {/* Toes */}
      <ellipse cx="16" cy="27" rx="5" ry="6.5" transform="rotate(-15 16 27)" fill={`url(#${id}-pad)`} />
      <ellipse cx="26" cy="18" rx="5" ry="6.5" transform="rotate(-5 26 18)" fill={`url(#${id}-pad)`} />
      <ellipse cx="38" cy="18" rx="5" ry="6.5" transform="rotate(5 38 18)" fill={`url(#${id}-pad)`} />
      <ellipse cx="48" cy="27" rx="5" ry="6.5" transform="rotate(15 48 27)" fill={`url(#${id}-pad)`} />
      {/* Main palm cushion */}
      <path d="M21 48C16.5 48 14.5 43.5 17 39.5L23.5 30.5C27.5 25.5 36.5 25.5 40.5 30.5L47 39.5C49.5 43.5 47.5 48 43 48C39.5 48 36 46 32 46C28 46 24.5 48 21 48Z" fill="#334155" />
      <path d="M21 46.5C16.5 46.5 14.5 42 17 38L23.5 29C27.5 24 36.5 24 40.5 29L47 38C49.5 42 47.5 46.5 43 46.5C39.5 46.5 36 44.5 32 44.5C28 44.5 24.5 46.5 21 46.5Z" fill={`url(#${id}-pad)`} />
      {/* Highlight */}
      <ellipse cx="28" cy="34" rx="4" ry="2" fill="#FFFFFF" fillOpacity="0.3" transform="rotate(-20 28 34)" />
    </svg>
  );
};

/**
 * 12. Subcategory — Living Room 3D Sofa & Warm Lamp
 */
export const Sofa3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('sofa');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-sofa`} x1="10" y1="22" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="55%" stopColor="#F97316" />
          <stop offset="100%" stopColor="#C2410C" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="23" ry="4" fill="#7C2D12" fillOpacity="0.2" />
      {/* Legs */}
      <rect x="13" y="46" width="4" height="6" rx="1.5" fill="#78350F" />
      <rect x="47" y="46" width="4" height="6" rx="1.5" fill="#78350F" />
      {/* Backrest */}
      <rect x="12" y="19" width="40" height="20" rx="7" fill="#9A3412" />
      <rect x="11" y="17" width="40" height="20" rx="7" fill={`url(#${id}-sofa)`} />
      {/* Seat cushions */}
      <rect x="12" y="33" width="40" height="14" rx="5" fill="#C2410C" />
      <rect x="12" y="31" width="19.5" height="12" rx="4" fill="#FED7AA" />
      <rect x="32.5" y="31" width="19.5" height="12" rx="4" fill="#FED7AA" />
      {/* Armrests */}
      <rect x="7" y="27" width="8" height="20" rx="4" fill="#EA580C" />
      <rect x="49" y="27" width="8" height="20" rx="4" fill="#EA580C" />
    </svg>
  );
};

/**
 * 13. Subcategory — Bedroom 3D Bed with Pillows
 */
export const Bed3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('bed');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-blanket`} x1="12" y1="30" x2="52" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#818CF8" />
          <stop offset="100%" stopColor="#4338CA" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="22" ry="4" fill="#312E81" fillOpacity="0.22" />
      {/* Headboard */}
      <rect x="11" y="15" width="42" height="22" rx="5" fill="#475569" />
      <rect x="11" y="14" width="42" height="18" rx="5" fill="#64748B" />
      {/* Pillows */}
      <rect x="15" y="21" width="15" height="9" rx="4" fill="#FFFFFF" />
      <rect x="34" y="21" width="15" height="9" rx="4" fill="#F1F5F9" />
      {/* Mattress & Blanket */}
      <rect x="9" y="31" width="46" height="17" rx="5" fill="#312E81" />
      <rect x="9" y="29" width="46" height="16" rx="5" fill={`url(#${id}-blanket)`} />
      <path d="M12 31H52" stroke="#E0E7FF" strokeOpacity="0.6" strokeWidth="2.5" strokeLinecap="round" />
      {/* Bed posts */}
      <rect x="12" y="45" width="4" height="7" rx="1.5" fill="#334155" />
      <rect x="48" y="45" width="4" height="7" rx="1.5" fill="#334155" />
    </svg>
  );
};

/**
 * 14. Subcategory — Kids Furniture 3D Wooden Crib
 */
export const Crib3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('crib');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-wood`} x1="12" y1="16" x2="52" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="20" ry="4" fill="#78350F" fillOpacity="0.22" />
      {/* Frame back & side rails */}
      <rect x="12" y="18" width="40" height="28" rx="4" fill="#92400E" />
      <rect x="14" y="28" width="36" height="10" rx="2" fill="#FEF3C7" />
      {/* Vertical crib slats */}
      <rect x="18" y="21" width="3" height="20" rx="1.5" fill={`url(#${id}-wood)`} />
      <rect x="25" y="21" width="3" height="20" rx="1.5" fill={`url(#${id}-wood)`} />
      <rect x="32" y="21" width="3" height="20" rx="1.5" fill={`url(#${id}-wood)`} />
      <rect x="39" y="21" width="3" height="20" rx="1.5" fill={`url(#${id}-wood)`} />
      <rect x="46" y="21" width="3" height="20" rx="1.5" fill={`url(#${id}-wood)`} />
      {/* Top & bottom beams */}
      <rect x="10" y="17" width="44" height="5" rx="2.5" fill={`url(#${id}-wood)`} />
      <rect x="10" y="40" width="44" height="6" rx="2.5" fill={`url(#${id}-wood)`} />
      <rect x="12" y="45" width="4" height="7" rx="1.5" fill="#78350F" />
      <rect x="48" y="45" width="4" height="7" rx="1.5" fill="#78350F" />
    </svg>
  );
};

/**
 * 15. Subcategory — Decor & Garden 3D Planter Pot with Sprout
 */
export const Planter3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('planter');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-pot`} x1="18" y1="30" x2="46" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDBA74" />
          <stop offset="60%" stopColor="#EA580C" />
          <stop offset="100%" stopColor="#9A3412" />
        </linearGradient>
        <linearGradient id={`${id}-leaf`} x1="20" y1="10" x2="44" y2="32" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="15" ry="3.5" fill="#064E3B" fillOpacity="0.2" />
      {/* Stems & vibrant leaves */}
      <path d="M32 34V18" stroke="#059669" strokeWidth="3" strokeLinecap="round" />
      <path d="M32 24C23 24 18 18 20 12C27 12 32 18 32 24Z" fill={`url(#${id}-leaf)`} />
      <path d="M32 21C41 21 46 15 44 9C37 9 32 15 32 21Z" fill="#04BB49" />
      {/* Terracotta pot */}
      <path d="M21 34H43L40 53C39.8 54.2 38.8 55 37.5 55H26.5C25.2 55 24.2 54.2 24 53L21 34Z" fill={`url(#${id}-pot)`} />
      <rect x="18" y="30" width="28" height="6" rx="3" fill="#FB923C" />
      <path d="M21 32H43" stroke="#FFEDD5" strokeOpacity="0.55" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 16. Subcategory — Dining 3D Table & Chairs
 */
export const Dining3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('dining');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-wood`} x1="12" y1="22" x2="52" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="60%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#78350F" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="22" ry="4" fill="#78350F" fillOpacity="0.2" />
      {/* Left chair */}
      <rect x="10" y="24" width="3.5" height="25" rx="1.5" fill="#92400E" />
      <rect x="10" y="35" width="10" height="4" rx="1.5" fill="#D97706" />
      <rect x="16" y="38" width="3" height="11" rx="1.5" fill="#92400E" />
      {/* Right chair */}
      <rect x="50.5" y="24" width="3.5" height="25" rx="1.5" fill="#92400E" />
      <rect x="44" y="35" width="10" height="4" rx="1.5" fill="#D97706" />
      <rect x="45" y="38" width="3" height="11" rx="1.5" fill="#92400E" />
      {/* Center dining table */}
      <rect x="21" y="29" width="3" height="21" rx="1.5" fill="#78350F" />
      <rect x="40" y="29" width="3" height="21" rx="1.5" fill="#78350F" />
      <rect x="15" y="24" width="34" height="6" rx="3" fill={`url(#${id}-wood)`} />
      <path d="M18 25.8H46" stroke="#FEF3C7" strokeOpacity="0.65" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 17. Subcategory — Study & Home Office 3D Desk Lamp
 */
export const DeskLamp3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('lamp');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-shade`} x1="20" y1="10" x2="46" y2="30" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#0284C7" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="55" rx="16" ry="3.5" fill="#0369A1" fillOpacity="0.22" />
      {/* Light beam glow */}
      <path d="M34 26L46 42H26L34 26Z" fill="#FEF08A" fillOpacity="0.45" />
      {/* Arm & Pivot */}
      <path d="M22 50L16 32L32 18" stroke="#475569" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="16" cy="32" r="3" fill="#94A3B8" />
      {/* Weighted base */}
      <rect x="15" y="48" width="20" height="6" rx="3" fill="#0284C7" />
      {/* 3D Cone Shade */}
      <path d="M28 15L42 12L46 27L28 24L28 15Z" fill={`url(#${id}-shade)`} />
      <ellipse cx="37" cy="25.5" rx="8" ry="2.5" transform="rotate(10 37 25.5)" fill="#FEF08A" />
    </svg>
  );
};

/**
 * 19. Photos Uploader — 3D Studio Camera with Floating Emerald Plus Badge
 */
export const CameraPlus3D: React.FC<Icon3DProps> = ({ size = 40, className = '' }) => {
  const id = useUid('cam');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-body`} x1="10" y1="16" x2="54" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F1F5F9" />
          <stop offset="60%" stopColor="#CBD5E1" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        <linearGradient id={`${id}-lens`} x1="22" y1="22" x2="40" y2="42" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#38BDF8" />
          <stop offset="100%" stopColor="#1E3A8A" />
        </linearGradient>
        <linearGradient id={`${id}-plus`} x1="40" y1="36" x2="56" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="20" ry="4" fill="#0F172A" fillOpacity="0.18" />
      {/* Camera Top Prism */}
      <path d="M22 18L25 13H37L40 18H22Z" fill="#94A3B8" />
      {/* Camera 3D Body */}
      <rect x="11" y="19" width="42" height="31" rx="8" fill="#64748B" />
      <rect x="10" y="17" width="42" height="31" rx="8" fill={`url(#${id}-body)`} stroke="#FFFFFF" strokeWidth="1" />
      {/* Lens Ring & Glass */}
      <circle cx="31" cy="32.5" r="10.5" fill="#1E293B" />
      <circle cx="31" cy="32.5" r="7.5" fill={`url(#${id}-lens)`} />
      <circle cx="28.5" cy="30" r="2.2" fill="#FFFFFF" fillOpacity="0.65" />
      {/* Floating Emerald + Orb */}
      <circle cx="48" cy="44" r="9.5" fill="#047857" />
      <circle cx="47" cy="43" r="9" fill={`url(#${id}-plus)`} stroke="#FFFFFF" strokeWidth="1.8" />
      <path d="M47 39V47M43 43H51" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 20. Quick Attach Gallery — 3D Layered Photo Cards
 */
export const PhotoStack3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useUid('photos');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-sky`} x1="14" y1="16" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <rect x="16" y="10" width="38" height="38" rx="8" transform="rotate(8 35 29)" fill="#CBD5E1" />
      <rect x="10" y="14" width="40" height="40" rx="9" fill="#FFFFFF" stroke="#E2E8F0" strokeWidth="2" />
      <rect x="15" y="19" width="30" height="24" rx="5" fill={`url(#${id}-sky)`} />
      <circle cx="24" cy="27" r="3.5" fill="#FEF08A" />
      <path d="M16 40L25 32L32 38L37 33L44 40V42H16V40Z" fill="#065F46" fillOpacity="0.65" />
    </svg>
  );
};

/**
 * 21. Info Tooltip Badge — Glossy 3D Slate/Emerald Info Sphere
 */
export const InfoOrb3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useUid('info');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-orb`} x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="34" r="24" fill="#065F46" fillOpacity="0.25" />
      <circle cx="32" cy="31" r="24" fill={`url(#${id}-orb)`} />
      <ellipse cx="24" cy="20" rx="8" ry="4" transform="rotate(-30 24 20)" fill="#FFFFFF" fillOpacity="0.35" />
      <circle cx="32" cy="21" r="3.2" fill="#FFFFFF" />
      <rect x="29" y="28" width="6" height="16" rx="3" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * 22. Location Pin — 3D Emerald & Coral Map Pin on Ground Disk
 */
export const LocationPin3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => {
  const id = useUid('pin');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-pin`} x1="18" y1="8" x2="46" y2="48" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="16" ry="4" fill="#047857" fillOpacity="0.25" />
      <path d="M32 8C21 8 13 16 13 26.5C13 39 32 52 32 52C32 52 51 39 51 26.5C51 16 43 8 32 8Z" fill={`url(#${id}-pin)`} />
      <circle cx="32" cy="25" r="7.5" fill="#FFFFFF" />
      <path d="M21 15C23 12 27 10.5 31 10.5" stroke="#FFFFFF" strokeOpacity="0.55" strokeWidth="2.2" strokeLinecap="round" />
    </svg>
  );
};

/**
 * 23. Contact Phone — 3D Emerald Handset Orb
 */
export const ContactPhone3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => {
  const id = useUid('cphone');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-bg`} x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="34" r="24" fill="#065F46" fillOpacity="0.22" />
      <circle cx="32" cy="31" r="24" fill={`url(#${id}-bg)`} />
      <path
        d="M23 20C21.5 20 20 21.5 20 23C20 35 29 44 41 44C42.5 44 44 42.5 44 41V36.5C44 35.5 43.2 34.7 42.2 34.5L37.5 33.7C36.7 33.6 35.9 33.9 35.4 34.5L33.5 36.8C30.2 35.1 27.6 32.5 25.9 29.2L28.2 27.3C28.8 26.8 29.1 26 29 25.2L28.2 20.5C28 19.5 27.2 18.8 26.2 18.8L23 20Z"
        fill="#FFFFFF"
      />
    </svg>
  );
};

/**
 * 24. Price Tag / Item Parameters — 3D Emerald Price Tag
 */
export const PriceTag3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useUid('tag');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-tag`} x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <path d="M12 14C12 11.8 13.8 10 16 10H31.5C33.1 10 34.6 10.6 35.7 11.8L52.2 28.3C54.5 30.6 54.5 34.4 52.2 36.7L38.7 50.2C36.4 52.5 32.6 52.5 30.3 50.2L13.8 33.7C12.6 32.6 12 31.1 12 29.5V14Z" fill="#065F46" fillOpacity="0.25" transform="translate(0 3)" />
      <path d="M12 14C12 11.8 13.8 10 16 10H31.5C33.1 10 34.6 10.6 35.7 11.8L52.2 28.3C54.5 30.6 54.5 34.4 52.2 36.7L38.7 50.2C36.4 52.5 32.6 52.5 30.3 50.2L13.8 33.7C12.6 32.6 12 31.1 12 29.5V14Z" fill={`url(#${id}-tag)`} />
      <circle cx="22" cy="20" r="3.5" fill="#FFFFFF" />
    </svg>
  );
};

/**
 * 25. Verified Shield Badge — 3D Emerald Shield with White Checkmark
 */
export const ShieldCheck3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => {
  const id = useUid('shield');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-sh`} x1="16" y1="8" x2="48" y2="56" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <path d="M32 56L14 46C12 33 12 20 13 13L32 7L51 13C52 20 52 33 50 46L32 56Z" fill="#065F46" fillOpacity="0.25" transform="translate(0 2)" />
      <path d="M32 55L14 45C12 32 12 19 13 12L32 6L51 12C52 19 52 32 50 45L32 55Z" fill={`url(#${id}-sh)`} />
      <path d="M23 30L29 36L41 24" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * 26. Toast / Confirmation Check — 3D Glossy Emerald Check Orb
 */
export const CheckOrb3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useUid('chk');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-c`} x1="12" y1="10" x2="52" y2="54" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="34" r="24" fill="#065F46" fillOpacity="0.25" />
      <circle cx="32" cy="31" r="24" fill={`url(#${id}-c)`} />
      <path d="M21 31L28 38L43 23" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * 27. Navigation Back Arrow — 3D Beveled Chevron Arrow
 */
export const BackArrow3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
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
 * 28. External Link — 3D Cobalt Arrow-Out Tile
 */
export const ExternalLink3D: React.FC<Icon3DProps> = ({ size = 18, className = '' }) => {
  const id = useUid('ext');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-box`} x1="12" y1="12" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <rect x="10" y="10" width="44" height="44" rx="12" fill={`url(#${id}-box)`} />
      <path d="M24 40L40 24M28 24H40V36" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/**
 * 29. Delete / Remove Photo — 3D Crimson Close Orb
 */
export const CloseOrb3D: React.FC<Icon3DProps> = ({ size = 18, className = '' }) => {
  const id = useUid('cls');
  return (
    <svg viewBox="0 0 64 64" width={size} height={size} fill="none" className={`shrink-0 select-none ${className}`}>
      <defs>
        <linearGradient id={`${id}-x`} x1="14" y1="14" x2="50" y2="50" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#F87171" />
          <stop offset="100%" stopColor="#DC2626" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="32" r="24" fill={`url(#${id}-x)`} stroke="#FFFFFF" strokeWidth="3" />
      <path d="M23 23L41 41M41 23L23 41" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" />
    </svg>
  );
};
