import React, { useId } from 'react';
import {
  type Icon3DProps,
  GuardCall3D,
  BellAlert3D,
  TabVisitors3D,
  NavHome3D,
} from './Module3DIconsA';

const useSvgUid = (prefix: string) => {
  const raw = useId().replace(/:/g, '');
  return `${prefix}_${raw}`;
};

/* ============================================================================
 * MODULE 05 — FINANCIALS & PAYMENTS 3D ICONS
 * ============================================================================ */

export const MaintenanceBill3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => {
  const id = useSvgUid('mbll');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_p`} x1="10%" y1="10%" x2="90%" y2="95%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E2E8F0" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="18" ry="3.2" fill="#04BB49" opacity="0.18" />
      <rect x="14" y="10" width="36" height="44" rx="6" fill="#047857" transform="translate(2, 2)" />
      <rect x="14" y="10" width="36" height="44" rx="6" fill={`url(#${id}_p)`} />
      <path d="M14 16 C14 12.7 16.7 10 20 10 H44 C47.3 10 50 12.7 50 16 V21 H14 V16 Z" fill="#04BB49" />
      <rect x="20" y="27" width="16" height="3.5" rx="1.7" fill="#94A3B8" />
      <rect x="20" y="34" width="24" height="3.5" rx="1.7" fill="#CBD5E1" />
      <rect x="20" y="41" width="14" height="3.5" rx="1.7" fill="#CBD5E1" />
      <circle cx="43" cy="43" r="6" fill="#04BB49" />
      <path d="M40.5 43 L42.5 45 L46 41" stroke="#FFFFFF" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const MeterRecharge3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => {
  const id = useSvgUid('mrch');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_orb`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="19" ry="3.2" fill="#04BB49" opacity="0.2" />
      <circle cx="33.5" cy="32.5" r="22" fill="#027A2F" />
      <circle cx="32" cy="31" r="22" fill={`url(#${id}_orb)`} />
      <path d="M35 16 L24 33 H33 L29 46 L42 29 H33 Z" fill="#FDE047" />
    </svg>
  );
};

export const UtilityReceipt3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="17" ry="3" fill="#0D9488" opacity="0.18" />
    <path d="M16 10 H48 V52 L42.5 48 L37 52 L32 48 L27 52 L21.5 48 L16 52 Z" fill="#0F766E" transform="translate(2, 2)" />
    <path d="M16 10 H48 V52 L42.5 48 L37 52 L32 48 L27 52 L21.5 48 L16 52 Z" fill="#F8FAFC" />
    <rect x="22" y="18" width="20" height="4" rx="2" fill="#14B8A6" />
    <rect x="22" y="26" width="14" height="3.5" rx="1.7" fill="#94A3B8" />
    <rect x="22" y="33" width="20" height="3.5" rx="1.7" fill="#CBD5E1" />
    <rect x="22" y="40" width="12" height="3.5" rx="1.7" fill="#CBD5E1" />
  </svg>
);

export const RentHome3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => {
  const id = useSvgUid('rnth');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_b`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#6EE7B7" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="56" rx="19" ry="3.2" fill="#04BB49" opacity="0.2" />
      <path d="M12 28 L30 12 L48 28 V50 C48 52 46 54 44 54 H16 C14 54 12 52 12 50 Z" fill="#027A2F" transform="translate(1.5, 1.5)" />
      <path d="M12 28 L30 12 L48 28 V49 C48 51.5 46 53.5 43.5 53.5 H16.5 C14 53.5 12 51.5 12 49 Z" fill={`url(#${id}_b)`} />
      <rect x="24" y="34" width="12" height="19.5" rx="6" fill="#FFFFFF" opacity="0.9" />
      {/* Gold Coin Badge */}
      <circle cx="48" cy="43" r="10" fill="#B45309" transform="translate(1, 1.5)" />
      <circle cx="47.5" cy="42.5" r="10" fill="#F59E0B" />
      <path d="M44 38 H51 M44 41.5 H51 M46 38 C48.5 38 49.5 41.5 46 43.5 L50 47.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const ConsumptionGauge3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="55" rx="20" ry="3.2" fill="#2563EB" opacity="0.2" />
    <circle cx="33.5" cy="34.5" r="22" fill="#1E40AF" />
    <circle cx="32" cy="33" r="22" fill="#3B82F6" />
    <circle cx="32" cy="33" r="16.5" fill="#EFF6FF" />
    <path d="M20 39 C18 30 23 21 32 21 C41 21 46 30 44 39" stroke="#10B981" strokeWidth="4.5" strokeLinecap="round" />
    <path d="M32 34 L41 24" stroke="#E11D48" strokeWidth="3.8" strokeLinecap="round" />
    <circle cx="32" cy="34" r="3.5" fill="#1E293B" />
  </svg>
);

export const PaymentCard3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <rect x="8" y="16" width="48" height="33" rx="7" fill="#027A2F" transform="translate(1.5, 2)" />
    <rect x="8" y="16" width="48" height="33" rx="7" fill="#04BB49" />
    <rect x="8" y="23" width="48" height="7" fill="#015E24" opacity="0.45" />
    <rect x="14" y="35" width="12" height="8" rx="2" fill="#FCD34D" />
    <circle cx="45" cy="39" r="5" fill="#FFFFFF" opacity="0.85" />
  </svg>
);

/* ============================================================================
 * MODULE 06 — HELPDESK & 15m EXPRESS SERVICES 3D ICONS
 * ============================================================================ */

export const CleaningSparkle3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="18" ry="3" fill="#04BB49" opacity="0.18" />
    <path d="M28 10 L33 25 L48 30 L33 35 L28 50 L23 35 L8 30 L23 25 Z" fill="#027A2F" transform="translate(1.5, 2)" />
    <path d="M28 10 L33 25 L48 30 L33 35 L28 50 L23 35 L8 30 L23 25 Z" fill="#04BB49" />
    <path d="M48 12 L50.5 18.5 L57 21 L50.5 23.5 L48 30 L45.5 23.5 L39 21 L45.5 18.5 Z" fill="#F59E0B" />
    <circle cx="48" cy="45" r="5.5" fill="#34D399" />
  </svg>
);

export const PaintRoller3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="16" ry="3" fill="#0D9488" opacity="0.18" />
    <path d="M46 19 H51 C53 19 54 20.5 54 22.5 V28 C54 30 52.5 31 50.5 31 H34 C32 31 31 32 31 34 V38" stroke="#475569" strokeWidth="3.8" strokeLinecap="round" />
    <rect x="27" y="38" width="8" height="17" rx="4" fill="#04BB49" />
    <rect x="11" y="12" width="35" height="14" rx="5" fill="#0F766E" transform="translate(1.5, 1.5)" />
    <rect x="11" y="12" width="35" height="14" rx="5" fill="#14B8A6" />
    <rect x="15" y="15" width="22" height="3.5" rx="1.7" fill="#FFFFFF" opacity="0.6" />
  </svg>
);

export const MoverTruck3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="55" rx="22" ry="3.2" fill="#0F172A" opacity="0.18" />
    <rect x="8" y="17" width="31" height="26" rx="5" fill="#027A2F" transform="translate(1.5, 1.5)" />
    <rect x="8" y="17" width="31" height="26" rx="5" fill="#04BB49" />
    <path d="M39 24 H50 L56 32 V43 H39 Z" fill="#F59E0B" />
    <path d="M42 27 H49 L53 32 H42 Z" fill="#EFF6FF" />
    <circle cx="19" cy="45" r="6" fill="#1E293B" />
    <circle cx="19" cy="45" r="2.2" fill="#CBD5E1" />
    <circle cx="47" cy="45" r="6" fill="#1E293B" />
    <circle cx="47" cy="45" r="2.2" fill="#CBD5E1" />
  </svg>
);

export const PlumbingWrench3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="18" ry="3" fill="#2563EB" opacity="0.18" />
    <path d="M43 11 C37 11 32 15 32 21 C32 22.8 32.5 24.5 33.4 26 L15 44.4 C12.8 46.6 12.8 50.2 15 52.4 C17.2 54.6 20.8 54.6 23 52.4 L41.4 34 C42.9 34.9 44.6 35.4 46.4 35.4 C52.4 35.4 56.4 30.4 56.4 24.4 C56.4 22.6 55.9 20.9 55.1 19.5 L48.5 26.1 L41.9 19.5 L48.5 12.9 C46.9 11.7 45 11 43 11 Z" fill="#1E40AF" transform="translate(1.5, 2)" />
    <path d="M43 11 C37 11 32 15 32 21 C32 22.8 32.5 24.5 33.4 26 L15 44.4 C12.8 46.6 12.8 50.2 15 52.4 C17.2 54.6 20.8 54.6 23 52.4 L41.4 34 C42.9 34.9 44.6 35.4 46.4 35.4 C52.4 35.4 56.4 30.4 56.4 24.4 C56.4 22.6 55.9 20.9 55.1 19.5 L48.5 26.1 L41.9 19.5 L48.5 12.9 C46.9 11.7 45 11 43 11 Z" fill="#3B82F6" />
    <circle cx="19" cy="48.5" r="2.8" fill="#FFFFFF" />
  </svg>
);

export const CarpentryHammer3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="30" cy="57" rx="18" ry="3" fill="#92400E" opacity="0.18" />
    <path d="M35 28 L16 49 C14 51 14 54 16 55 C18 56 21 55 22 53 L41 32 Z" fill="#B45309" />
    <path d="M22 14 L38 11 L52 24 L45 31 L36 22 L28 28 L20 20 Z" fill="#475569" transform="translate(1.5, 1.5)" />
    <path d="M22 14 L38 11 L52 24 L45 31 L36 22 L28 28 L20 20 Z" fill="#94A3B8" />
  </svg>
);

export const BathroomDroplet3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="16" ry="3" fill="#0284C7" opacity="0.22" />
    <path d="M32 9 C32 9 14 29 14 40 C14 49.5 22 55 32 55 C42 55 50 49.5 50 40 C50 29 32 9 32 9 Z" fill="#0369A1" transform="translate(1.5, 2)" />
    <path d="M32 9 C32 9 14 29 14 40 C14 49.5 22 55 32 55 C42 55 50 49.5 50 40 C50 29 32 9 32 9 Z" fill="#0EA5E9" />
    <path d="M23 36 C21 41 24 47 29 48.5" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" opacity="0.85" />
  </svg>
);

export const LegalAgreement3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="18" ry="3" fill="#04BB49" opacity="0.18" />
    <rect x="13" y="10" width="38" height="44" rx="6" fill="#047857" transform="translate(2, 2)" />
    <rect x="13" y="10" width="38" height="44" rx="6" fill="#FFFFFF" />
    <rect x="19" y="18" width="26" height="3.5" rx="1.7" fill="#94A3B8" />
    <rect x="19" y="25" width="22" height="3.5" rx="1.7" fill="#CBD5E1" />
    <path d="M19 42 Q24 36 29 42 T39 40" stroke="#04BB49" strokeWidth="3" strokeLinecap="round" fill="none" />
    <circle cx="46" cy="46" r="8" fill="#F59E0B" />
  </svg>
);

export const TicketSla3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <rect x="14" y="12" width="36" height="42" rx="6" fill="#1E40AF" transform="translate(1.5, 2)" />
    <rect x="14" y="12" width="36" height="42" rx="6" fill="#3B82F6" />
    <rect x="24" y="8" width="16" height="8" rx="3" fill="#F59E0B" />
    <path d="M22 31 L29 38 L42 24" stroke="#FFFFFF" strokeWidth="4.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

/* ============================================================================
 * MODULE 08 — SOCIETY LIVING HUB 3D ICONS
 * ============================================================================ */

export const AmenitiesCoffee3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="56" rx="20" ry="3.2" fill="#0F172A" opacity="0.16" />
    {/* Steam */}
    <path d="M24 14 Q26 19 24 23 M32 12 Q34 17 32 21 M40 14 Q42 19 40 23" stroke="#94A3B8" strokeWidth="2.8" strokeLinecap="round" />
    {/* Handle */}
    <path d="M46 29 C53 29 55 39 46 41" stroke="#EA580C" strokeWidth="5.5" strokeLinecap="round" />
    {/* Cup Body */}
    <path d="M16 26 H46 V40 C46 48 40 53 31 53 C22 53 16 48 16 40 Z" fill="#C2410C" transform="translate(1.5, 1.5)" />
    <path d="M16 26 H46 V40 C46 48 40 53 31 53 C22 53 16 48 16 40 Z" fill="#F97316" />
    <ellipse cx="31" cy="26" rx="15" ry="4" fill="#FED7AA" />
  </svg>
);

export const ForumChat3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="19" ry="3" fill="#04BB49" opacity="0.18" />
    {/* Back Bubble */}
    <rect x="24" y="11" width="30" height="22" rx="8" fill="#0369A1" transform="translate(1, 1.5)" />
    <rect x="24" y="11" width="30" height="22" rx="8" fill="#38BDF8" />
    {/* Front Main Bubble */}
    <path d="M10 24 C10 19.6 13.6 16 18 16 H40 C44.4 16 48 19.6 48 24 V38 C48 42.4 44.4 46 40 46 H22 L12 53 V44.5 C10.8 43 10 40.6 10 38 Z" fill="#027A2F" transform="translate(1.5, 2)" />
    <path d="M10 24 C10 19.6 13.6 16 18 16 H40 C44.4 16 48 19.6 48 24 V38 C48 42.4 44.4 46 40 46 H22 L12 53 V44.5 C10.8 43 10 40.6 10 38 Z" fill="#04BB49" />
    <circle cx="21" cy="31" r="3" fill="#FFFFFF" />
    <circle cx="29" cy="31" r="3" fill="#FFFFFF" />
    <circle cx="37" cy="31" r="3" fill="#FFFFFF" />
  </svg>
);

export const DirectoryBook3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="18" ry="3.2" fill="#4338CA" opacity="0.18" />
    <rect x="14" y="10" width="37" height="44" rx="6" fill="#3730A3" transform="translate(2, 2)" />
    <rect x="14" y="10" width="37" height="44" rx="6" fill="#6366F1" />
    <rect x="10" y="17" width="8" height="5" rx="2" fill="#F59E0B" />
    <rect x="10" y="29" width="8" height="5" rx="2" fill="#F59E0B" />
    <rect x="10" y="41" width="8" height="5" rx="2" fill="#F59E0B" />
    <circle cx="34" cy="26" r="6" fill="#FFFFFF" opacity="0.92" />
    <path d="M24 41 C24 35.5 28 33 34 33 C40 33 44 35.5 44 41" fill="#FFFFFF" opacity="0.92" />
  </svg>
);

export const DailyHelpHelmet3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="54" rx="22" ry="3.2" fill="#B45309" opacity="0.2" />
    <path d="M13 38 C13 24 21.5 14 32 14 C42.5 14 51 24 51 38 Z" fill="#D97706" transform="translate(1.5, 1.5)" />
    <path d="M13 38 C13 24 21.5 14 32 14 C42.5 14 51 24 51 38 Z" fill="#F59E0B" />
    <rect x="28.5" y="12" width="7" height="24" rx="3.5" fill="#FDE68A" />
    <rect x="8" y="37" width="48" height="7.5" rx="3.7" fill="#B45309" />
    <rect x="8" y="36" width="48" height="6.5" rx="3.2" fill="#FCD34D" />
  </svg>
);

export const NoticesMegaphone3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="30" cy="56" rx="18" ry="3" fill="#E11D48" opacity="0.2" />
    <rect x="19" y="37" width="7" height="15" rx="3.5" fill="#475569" transform="rotate(-12 19 37)" />
    <path d="M12 26 L44 14 V44 L12 33 Z" fill="#9F1239" transform="translate(1.5, 2)" />
    <path d="M12 26 L44 14 V44 L12 33 Z" fill="#F43F5E" />
    <ellipse cx="44" cy="29" rx="5" ry="15" fill="#FFE4E6" />
    <path d="M53 23 C56 26 56 32 53 35" stroke="#04BB49" strokeWidth="3.5" strokeLinecap="round" />
  </svg>
);

export const PinlessPhone3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="15" ry="3" fill="#0F172A" opacity="0.2" />
    <rect x="17" y="9" width="30" height="46" rx="6.5" fill="#1E293B" transform="translate(2, 2)" />
    <rect x="17" y="9" width="30" height="46" rx="6.5" fill="#334155" />
    <rect x="20" y="14" width="24" height="34" rx="4" fill="#D1FAE5" />
    <path d="M32 23 L40 26.5 V32 C40 36.5 36.5 39.5 32 41 C27.5 39.5 24 36.5 24 32 V26.5 Z" fill="#04BB49" />
    <path d="M29 32 L31.5 34.5 L36 29.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const MarketplaceStore3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="20" ry="3.2" fill="#04BB49" opacity="0.2" />
    <rect x="12" y="26" width="40" height="27" rx="4" fill="#CBD5E1" transform="translate(1.5, 2)" />
    <rect x="12" y="26" width="40" height="27" rx="4" fill="#FFFFFF" />
    {/* Awning */}
    <path d="M8 25 L14 12 H50 L56 25 C56 28.5 52.5 30 49.5 28 C46.5 30 43 28.5 40 28 C37 30 33.5 28.5 32 28 C30.5 28.5 27 30 24 28 C21 28.5 17.5 30 14.5 28 C11.5 30 8 28.5 8 25 Z" fill="#04BB49" />
    <rect x="26" y="34" width="12" height="19" rx="2.5" fill="#F59E0B" />
  </svg>
);

/* ============================================================================
 * MODULE 10 — EMERGENCY SOS 3D ICONS
 * ============================================================================ */

export const MedicalCross3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <rect x="10" y="10" width="44" height="44" rx="14" fill="#9F1239" transform="translate(1.5, 2)" />
    <rect x="10" y="10" width="44" height="44" rx="14" fill="#F43F5E" />
    <rect x="27" y="19" width="10" height="26" rx="4" fill="#FFFFFF" />
    <rect x="19" y="27" width="26" height="10" rx="4" fill="#FFFFFF" />
  </svg>
);

export const FireFlame3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="16" ry="3" fill="#EA580C" opacity="0.22" />
    <path d="M33 9 C33 9 49 23 49 37 C49 47 41.5 54 32 54 C22.5 54 15 47 15 37 C15 28 22 20 26 18 C25 23 28 26 28 26 C28 19 33 9 33 9 Z" fill="#C2410C" transform="translate(1.5, 2)" />
    <path d="M33 9 C33 9 49 23 49 37 C49 47 41.5 54 32 54 C22.5 54 15 47 15 37 C15 28 22 20 26 18 C25 23 28 26 28 26 C28 19 33 9 33 9 Z" fill="#F97316" />
    <path d="M32 30 C32 30 40 37 40 44 C40 49 36.5 52 32 52 C27.5 52 24 49 24 44 C24 38 32 30 32 30 Z" fill="#FDE047" />
  </svg>
);

export const SecurityPolice3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d="M32 9 L52 17 V32 C52 44.5 43 52.5 32 56 C21 52.5 12 44.5 12 32 V17 Z" fill="#4C1D95" transform="translate(1.5, 2)" />
    <path d="M32 9 L52 17 V32 C52 44.5 43 52.5 32 56 C21 52.5 12 44.5 12 32 V17 Z" fill="#7C3AED" />
    <rect x="29.5" y="21" width="5" height="15" rx="2.5" fill="#FDE047" />
    <circle cx="32" cy="42" r="2.8" fill="#FDE047" />
  </svg>
);

export const LiftRescue3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <rect x="12" y="10" width="40" height="44" rx="7" fill="#1E40AF" transform="translate(1.5, 2)" />
    <rect x="12" y="10" width="40" height="44" rx="7" fill="#3B82F6" />
    <rect x="17" y="18" width="13.5" height="32" rx="3" fill="#DBEAFE" />
    <rect x="33.5" y="18" width="13.5" height="32" rx="3" fill="#DBEAFE" />
    <path d="M23.5 30 L27 25 L30.5 30 M33.5 37 L37 42 L40.5 37" stroke="#1D4ED8" strokeWidth="2.8" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

export const HelplinePhone3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <GuardCall3D size={size} className={className} />
);

export const SilentAlarm3D: React.FC<Icon3DProps & { muted?: boolean }> = ({ size = 22, className = '', muted = false }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d="M12 24 H23 L38 13 V51 L23 40 H12 C10 40 9 38.5 9 37 V27 C9 25.5 10 24 12 24 Z" fill="#475569" transform="translate(1.5, 2)" />
    <path d="M12 24 H23 L38 13 V51 L23 40 H12 C10 40 9 38.5 9 37 V27 C9 25.5 10 24 12 24 Z" fill="#64748B" />
    {muted ? (
      <path d="M44 24 L56 40 M56 24 L44 40" stroke="#F43F5E" strokeWidth="5" strokeLinecap="round" />
    ) : (
      <>
        <path d="M45 25 C48 28 48 36 45 39" stroke="#04BB49" strokeWidth="4.2" strokeLinecap="round" />
        <path d="M51 20 C56 25 56 39 51 44" stroke="#34D399" strokeWidth="4" strokeLinecap="round" />
      </>
    )}
  </svg>
);

/* ============================================================================
 * MODULE 01 / 07 / 11 — GOVERNANCE, SETTINGS, AUTH & HOUSEHOLD 3D ICONS
 * ============================================================================ */

export const FamilyUsers3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <circle cx="42" cy="23" r="8" fill="#04BB49" />
    <path d="M31 48 C31 39 36 35 42 35 C48 35 53 39 53 48" fill="#04BB49" />
    <circle cx="24" cy="21" r="9.5" fill="#1D4ED8" transform="translate(1, 1.5)" />
    <circle cx="23.5" cy="20.5" r="9.5" fill="#3B82F6" />
    <path d="M8 50 C8 40 15 35 23.5 35 C32 35 39 40 39 50 Z" fill="#2563EB" />
  </svg>
);

export const VehicleFastag3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="54" rx="22" ry="3.2" fill="#04BB49" opacity="0.2" />
    <path d="M17 29 L23 19 H41 L47 29 Z" fill="#A7F3D0" />
    <rect x="9" y="28" width="46" height="16" rx="6" fill="#027A2F" transform="translate(1, 2)" />
    <rect x="9" y="28" width="46" height="16" rx="6" fill="#04BB49" />
    <rect x="24" y="34" width="16" height="4.5" rx="2" fill="#FDE047" />
    <rect x="13" y="43" width="8" height="5" rx="2" fill="#1E293B" />
    <rect x="43" y="43" width="8" height="5" rx="2" fill="#1E293B" />
  </svg>
);

export const ParkingAlert3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d="M32 10 L55 50 C56 52 54.5 54 52 54 H12 C9.5 54 8 52 9 50 Z" fill="#B45309" transform="translate(1.5, 2)" />
    <path d="M32 10 L55 50 C56 52 54.5 54 52 54 H12 C9.5 54 8 52 9 50 Z" fill="#F59E0B" />
    <rect x="29.5" y="24" width="5" height="15" rx="2.5" fill="#FFFFFF" />
    <circle cx="32" cy="45" r="2.8" fill="#FFFFFF" />
  </svg>
);

export const SmartLock3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d="M21 27 V21 C21 15 26 10 32 10 C38 10 43 15 43 21 V27" stroke="#64748B" strokeWidth="6" strokeLinecap="round" />
    <rect x="14" y="26" width="36" height="28" rx="8" fill="#3730A3" transform="translate(1.5, 2)" />
    <rect x="14" y="26" width="36" height="28" rx="8" fill="#6366F1" />
    <circle cx="32" cy="39" r="4.5" fill="#34D399" />
    <rect x="30" y="40" width="4" height="7" rx="2" fill="#34D399" />
  </svg>
);

export const NotificationBell3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <BellAlert3D size={size} className={className} />
);

export const PrivacyShield3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <TabVisitors3D size={size} className={className} />
);

export const VerifyDoc3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <MaintenanceBill3D size={size} className={className} />
);

export const FlatHome3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <NavHome3D size={size} active className={className} />
);

export const UploadCloud3D: React.FC<Icon3DProps> = ({ size = 24, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <path d="M20 46 H46 C52 46 56 41.5 56 36 C56 31 52 26.5 47 26 C45 17 37 12 28 14 C20 16 16 23 16 29 C11.5 30 8 34 8 38.5 C8 43 12 46 20 46 Z" fill="#1E40AF" transform="translate(1.5, 2)" />
    <path d="M20 46 H46 C52 46 56 41.5 56 36 C56 31 52 26.5 47 26 C45 17 37 12 28 14 C20 16 16 23 16 29 C11.5 30 8 34 8 38.5 C8 43 12 46 20 46 Z" fill="#3B82F6" />
    <path d="M32 39 V25 M26 30 L32 24 L38 30" stroke="#FFFFFF" strokeWidth="4.2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);
