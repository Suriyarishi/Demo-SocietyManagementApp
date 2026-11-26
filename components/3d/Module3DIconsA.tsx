import React, { useId } from 'react';

export interface Icon3DProps {
  size?: number;
  className?: string;
  active?: boolean;
}

const useSvgUid = (prefix: string) => {
  const raw = useId().replace(/:/g, '');
  return `${prefix}_${raw}`;
};

/* ============================================================================
 * GLOBAL BOTTOM NAVIGATION 3D ICONS (AppBottomNav)
 * Clean silhouettes legible at 20px–26px, 3/4 bevel depth + studio highlights
 * ============================================================================ */

export const NavHome3D: React.FC<Icon3DProps> = ({ size = 22, className = '', active = false }) => {
  const id = useSvgUid('nhm');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_body`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor={active ? '#34D399' : '#CBD5E1'} />
          <stop offset="55%" stopColor={active ? '#04BB49' : '#94A3B8'} />
          <stop offset="100%" stopColor={active ? '#027A2F' : '#64748B'} />
        </linearGradient>
        <linearGradient id={`${id}_roof`} x1="15%" y1="10%" x2="85%" y2="90%">
          <stop offset="0%" stopColor={active ? '#6EE7B7' : '#E2E8F0'} />
          <stop offset="100%" stopColor={active ? '#059669' : '#475569'} />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="20" ry="3.8" fill={active ? '#04BB49' : '#0F172A'} opacity={active ? '0.24' : '0.16'} />
      {/* Extruded 3D Side Shadow */}
      <path d="M13 28 L33 11 L52 28 L52 49 C52 52 49.5 54 46.5 54 L18.5 54 C15.5 54 13 52 13 49 Z" fill={active ? '#015E24' : '#475569'} transform="translate(2, 2.5)" />
      {/* House Body */}
      <path d="M13 28 L32 12 L51 28 L51 48.5 C51 51.5 48.5 53.5 45.5 53.5 L18.5 53.5 C15.5 53.5 13 51.5 13 48.5 Z" fill={`url(#${id}_body)`} />
      {/* Roof Cap Highlight */}
      <path d="M8 29 C7 27.5 7.5 25.5 9 24.3 L29.5 8.5 C31 7.3 33 7.3 34.5 8.5 L55 24.3 C56.5 25.5 57 27.5 56 29 C54.8 30.6 52.8 30.8 51.2 29.5 L32 14.8 L12.8 29.5 C11.2 30.8 9.2 30.6 8 29 Z" fill={`url(#${id}_roof)`} />
      {/* Specular Roof Sheen */}
      <path d="M13 25 L31 11.2 L39 17.5" stroke="#FFFFFF" strokeWidth="2.2" strokeLinecap="round" opacity="0.55" />
      {/* Glowing Arched Door */}
      <rect x="25" y="34" width="14" height="19.5" rx="7" fill="#FFFFFF" opacity={active ? '0.95' : '0.85'} />
      <rect x="27" y="36" width="10" height="17.5" rx="5" fill={active ? '#D1FAE5' : '#E2E8F0'} />
      <circle cx="34.5" cy="45" r="1.4" fill={active ? '#04BB49' : '#64748B'} />
    </svg>
  );
};

export const NavSearch3D: React.FC<Icon3DProps> = ({ size = 22, className = '', active = false }) => {
  const id = useSvgUid('nsc');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_rim`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor={active ? '#34D399' : '#CBD5E1'} />
          <stop offset="100%" stopColor={active ? '#04BB49' : '#64748B'} />
        </linearGradient>
        <radialGradient id={`${id}_lens`} cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor={active ? '#D1FAE5' : '#E2E8F0'} />
          <stop offset="100%" stopColor={active ? '#A7F3D0' : '#94A3B8'} />
        </radialGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="18" ry="3.5" fill={active ? '#04BB49' : '#0F172A'} opacity="0.18" />
      {/* Handle Extrusion */}
      <path d="M39 39 L53 53" stroke={active ? '#015E24' : '#334155'} strokeWidth="10" strokeLinecap="round" transform="translate(1, 1.5)" />
      <path d="M39 39 L52.5 52.5" stroke={`url(#${id}_rim)`} strokeWidth="8.5" strokeLinecap="round" />
      {/* Rim Depth */}
      <circle cx="28.5" cy="28" r="18" fill={active ? '#027A2F' : '#475569'} />
      <circle cx="27" cy="26.5" r="18" fill={`url(#${id}_rim)`} />
      <circle cx="27" cy="26.5" r="12" fill={`url(#${id}_lens)`} />
      {/* Lens Glossy Crescent */}
      <path d="M19 22 C21 18 26 16.5 31 18.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" opacity="0.85" />
    </svg>
  );
};

export const NavSociety3D: React.FC<Icon3DProps> = ({ size = 22, className = '', active = false }) => {
  const id = useSvgUid('nsoc');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_t1`} x1="10%" y1="10%" x2="90%" y2="95%">
          <stop offset="0%" stopColor={active ? '#34D399' : '#CBD5E1'} />
          <stop offset="100%" stopColor={active ? '#04BB49' : '#64748B'} />
        </linearGradient>
        <linearGradient id={`${id}_t2`} x1="15%" y1="15%" x2="85%" y2="95%">
          <stop offset="0%" stopColor={active ? '#6EE7B7' : '#E2E8F0'} />
          <stop offset="100%" stopColor={active ? '#059669' : '#475569'} />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="22" ry="3.5" fill={active ? '#04BB49' : '#0F172A'} opacity="0.18" />
      {/* Back Right Tower */}
      <rect x="33" y="21" width="18" height="32" rx="4.5" fill={active ? '#015E24' : '#334155'} transform="translate(1.5, 1.5)" />
      <rect x="33" y="21" width="18" height="32" rx="4.5" fill={`url(#${id}_t2)`} />
      {/* Front Main Tower */}
      <rect x="13" y="11" width="24" height="42" rx="5.5" fill={active ? '#027A2F' : '#475569'} transform="translate(1.5, 1.8)" />
      <rect x="13" y="11" width="24" height="42" rx="5.5" fill={`url(#${id}_t1)`} />
      {/* Windows Grid */}
      <rect x="18" y="17" width="5.5" height="5" rx="1.5" fill="#FFFFFF" opacity="0.88" />
      <rect x="26.5" y="17" width="5.5" height="5" rx="1.5" fill="#FFFFFF" opacity="0.65" />
      <rect x="18" y="26" width="5.5" height="5" rx="1.5" fill="#FFFFFF" opacity="0.72" />
      <rect x="26.5" y="26" width="5.5" height="5" rx="1.5" fill="#FFFFFF" opacity="0.9" />
      <rect x="18" y="35" width="5.5" height="5" rx="1.5" fill="#FFFFFF" opacity="0.88" />
      <rect x="26.5" y="35" width="5.5" height="5" rx="1.5" fill="#FFFFFF" opacity="0.65" />
      <rect x="40" y="27" width="5.5" height="4.5" rx="1.2" fill="#FFFFFF" opacity="0.8" />
      <rect x="40" y="35" width="5.5" height="4.5" rx="1.2" fill="#FFFFFF" opacity="0.65" />
      {/* Entrance Pill */}
      <rect x="21.5" y="45" width="7" height="8" rx="3.5" fill="#FFFFFF" opacity="0.9" />
    </svg>
  );
};

export const NavServices3D: React.FC<Icon3DProps> = ({ size = 22, className = '', active = false }) => {
  const id = useSvgUid('nsrv');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_g1`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={active ? '#34D399' : '#CBD5E1'} />
          <stop offset="100%" stopColor={active ? '#04BB49' : '#64748B'} />
        </linearGradient>
        <linearGradient id={`${id}_g2`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={active ? '#FCD34D' : '#E2E8F0'} />
          <stop offset="100%" stopColor={active ? '#F59E0B' : '#94A3B8'} />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="20" ry="3.5" fill={active ? '#04BB49' : '#0F172A'} opacity="0.16" />
      {/* Top Left Tile */}
      <rect x="11" y="12" width="19" height="19" rx="6" fill={active ? '#027A2F' : '#475569'} transform="translate(1.5, 2)" />
      <rect x="11" y="12" width="19" height="19" rx="6" fill={`url(#${id}_g1)`} />
      <rect x="14" y="15" width="7" height="3" rx="1.5" fill="#FFFFFF" opacity="0.5" />
      {/* Top Right Tile (Accent 15m lightning orb) */}
      <rect x="34" y="12" width="19" height="19" rx="6" fill={active ? '#B45309' : '#475569'} transform="translate(1.5, 2)" />
      <rect x="34" y="12" width="19" height="19" rx="6" fill={`url(#${id}_g2)`} />
      <rect x="37" y="15" width="7" height="3" rx="1.5" fill="#FFFFFF" opacity="0.55" />
      {/* Bottom Left Tile */}
      <rect x="11" y="34" width="19" height="19" rx="6" fill={active ? '#027A2F' : '#475569'} transform="translate(1.5, 2)" />
      <rect x="11" y="34" width="19" height="19" rx="6" fill={`url(#${id}_g1)`} />
      {/* Bottom Right Tile */}
      <rect x="34" y="34" width="19" height="19" rx="6" fill={active ? '#027A2F' : '#475569'} transform="translate(1.5, 2)" />
      <rect x="34" y="34" width="19" height="19" rx="6" fill={`url(#${id}_g1)`} />
    </svg>
  );
};

export const NavProfile3D: React.FC<Icon3DProps> = ({ size = 22, className = '', active = false }) => {
  const id = useSvgUid('nprf');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_c`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor={active ? '#34D399' : '#CBD5E1'} />
          <stop offset="100%" stopColor={active ? '#04BB49' : '#64748B'} />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="19" ry="3.5" fill={active ? '#04BB49' : '#0F172A'} opacity="0.18" />
      {/* Head Sphere Shadow + Body */}
      <circle cx="33.2" cy="22.5" r="11.5" fill={active ? '#015E24' : '#475569'} />
      <circle cx="32" cy="21" r="11.5" fill={`url(#${id}_c)`} />
      <ellipse cx="28" cy="16.5" rx="4" ry="2.2" fill="#FFFFFF" opacity="0.45" transform="rotate(-20 28 16.5)" />
      {/* Shoulders Torso */}
      <path d="M13 49 C13 38.5 21.5 34 32 34 C42.5 34 51 38.5 51 49 C51 52 48.5 54 45 54 L19 54 C15.5 54 13 52 13 49 Z" fill={active ? '#015E24' : '#475569'} transform="translate(1.2, 2)" />
      <path d="M13 48 C13 38.5 21.5 34 32 34 C42.5 34 51 38.5 51 48 C51 51.5 48.5 53.5 45 53.5 L19 53.5 C15.5 53.5 13 51.5 13 48 Z" fill={`url(#${id}_c)`} />
      <path d="M20 39.5 C24 37.5 28 37 32 37" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity="0.5" />
    </svg>
  );
};

/* ============================================================================
 * MODULE 02 — HOME COMMAND HUB HEADER & SEGMENTED TABS
 * ============================================================================ */

export const SearchOrb3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('sorb');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_rim`} x1="10%" y1="10%" x2="90%" y2="95%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <path d="M40 40 L54 54" stroke="#1E40AF" strokeWidth="10" strokeLinecap="round" transform="translate(1,1.5)" />
      <path d="M39 39 L53 53" stroke={`url(#${id}_rim)`} strokeWidth="8" strokeLinecap="round" />
      <circle cx="28" cy="28" r="18" fill="#1E40AF" transform="translate(1,1.5)" />
      <circle cx="27" cy="27" r="18" fill={`url(#${id}_rim)`} />
      <circle cx="27" cy="27" r="12" fill="#EFF6FF" />
      <path d="M19 22 C21.5 18 26 17 31 18.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
};

export const BellAlert3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('bell');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_gold`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="55%" stopColor="#F59E0B" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <circle cx="32" cy="51" r="6" fill="#B45309" />
      <circle cx="32" cy="11" r="4" fill="#D97706" />
      <path d="M16 40 C16 25 22 14 32 14 C42 14 48 25 48 40 L52 46 C53 47.5 52 49 50 49 L14 49 C12 49 11 47.5 12 46 Z" fill="#B45309" transform="translate(1.5, 2)" />
      <path d="M16 40 C16 25 22 14 32 14 C42 14 48 25 48 40 L52 46 C53 47.5 52 49 50 49 L14 49 C12 49 11 47.5 12 46 Z" fill={`url(#${id}_gold)`} />
      <path d="M22 23 C23.5 19 26.5 17 29 16.5" stroke="#FFFFFF" strokeWidth="2.8" strokeLinecap="round" opacity="0.7" />
    </svg>
  );
};

export const SosBeaconOrb3D: React.FC<Icon3DProps> = ({ size = 18, className = '' }) => {
  const id = useSvgUid('sosorb');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_red`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#FDA4AF" />
          <stop offset="45%" stopColor="#F43F5E" />
          <stop offset="100%" stopColor="#9F1239" />
        </linearGradient>
      </defs>
      <rect x="10" y="45" width="44" height="9" rx="4.5" fill="#475569" />
      <path d="M17 45 L19 26 C20 17 25 13 32 13 C39 13 44 17 45 26 L47 45 Z" fill={`url(#${id}_red)`} />
      <path d="M24 22 C25.5 18 28.5 16.5 31 16.5" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity="0.75" />
      <rect x="29.5" y="24" width="5" height="11" rx="2.5" fill="#FFFFFF" />
      <circle cx="32" cy="39.5" r="2.6" fill="#FFFFFF" />
    </svg>
  );
};

export const TabVisitors3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('tvst');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_s`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="16" ry="3" fill="#04BB49" opacity="0.2" />
      <path d="M32 9 L51 16 V32 C51 44 42.5 52 32 55.5 C21.5 52 13 44 13 32 V16 Z" fill="#027A2F" transform="translate(1.5, 2)" />
      <path d="M32 9 L51 16 V32 C51 44 42.5 52 32 55.5 C21.5 52 13 44 13 32 V16 Z" fill={`url(#${id}_s)`} />
      <path d="M23.5 31 L29.5 37 L41.5 24" stroke="#FFFFFF" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const TabBills3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('tbll');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_c`} x1="10%" y1="10%" x2="90%" y2="95%">
          <stop offset="0%" stopColor="#60A5FA" />
          <stop offset="100%" stopColor="#2563EB" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="55" rx="20" ry="3" fill="#2563EB" opacity="0.18" />
      <rect x="9" y="16" width="46" height="33" rx="7" fill="#1E40AF" transform="translate(1.5, 2)" />
      <rect x="9" y="16" width="46" height="33" rx="7" fill={`url(#${id}_c)`} />
      <rect x="9" y="23" width="46" height="6.5" fill="#1E3A8A" opacity="0.55" />
      <rect x="15" y="34" width="11" height="8" rx="2" fill="#FCD34D" />
      <rect x="31" y="36" width="17" height="3.5" rx="1.7" fill="#FFFFFF" opacity="0.85" />
    </svg>
  );
};

export const TabSociety3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => (
  <NavSociety3D size={size} active className={className} />
);

export const TabServices3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('tsrv');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_m`} x1="10%" y1="10%" x2="90%" y2="90%">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="18" ry="3" fill="#0F172A" opacity="0.16" />
      <path
        d="M44 12 C38 12 33 16 33 22 C33 23.8 33.5 25.5 34.4 27 L16 45.4 C13.8 47.6 13.8 51.2 16 53.4 C18.2 55.6 21.8 55.6 24 53.4 L42.4 35 C43.9 35.9 45.6 36.4 47.4 36.4 C53.4 36.4 57.4 31.4 57.4 25.4 C57.4 23.6 56.9 21.9 56.1 20.5 L49.5 27.1 L42.9 20.5 L49.5 13.9 C47.9 12.7 46 12 44 12 Z"
        fill="#334155"
        transform="translate(1.5, 2)"
      />
      <path
        d="M43 11 C37 11 32 15 32 21 C32 22.8 32.5 24.5 33.4 26 L15 44.4 C12.8 46.6 12.8 50.2 15 52.4 C17.2 54.6 20.8 54.6 23 52.4 L41.4 34 C42.9 34.9 44.6 35.4 46.4 35.4 C52.4 35.4 56.4 30.4 56.4 24.4 C56.4 22.6 55.9 20.9 55.1 19.5 L48.5 26.1 L41.9 19.5 L48.5 12.9 C46.9 11.7 45 11 43 11 Z"
        fill={`url(#${id}_m)`}
      />
      {/* Emerald Handle Accent */}
      <circle cx="19" cy="48.5" r="3" fill="#04BB49" />
    </svg>
  );
};

export const GateHistory3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => {
  const id = useSvgUid('ghst');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_orb`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#2DD4BF" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="18" ry="3.2" fill="#04BB49" opacity="0.2" />
      <circle cx="33.5" cy="32.5" r="22" fill="#027A2F" />
      <circle cx="32" cy="31" r="22" fill={`url(#${id}_orb)`} />
      <circle cx="32" cy="31" r="15.5" fill="#FFFFFF" opacity="0.2" />
      <path d="M22 39 L40 21 M40 21 H28 M40 21 V33" stroke="#FFFFFF" strokeWidth="5.2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

/* ============================================================================
 * MODULE 03 — GATE & VISITORS 3D ICONS
 * ============================================================================ */

export const PreApproveGuest3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => {
  const id = useSvgUid('pags');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_g`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#059669" />
        </linearGradient>
      </defs>
      <ellipse cx="30" cy="57" rx="19" ry="3.2" fill="#04BB49" opacity="0.2" />
      <circle cx="27" cy="21" r="10.5" fill="#027A2F" transform="translate(1.5, 1.5)" />
      <circle cx="27" cy="21" r="10.5" fill={`url(#${id}_g)`} />
      <path d="M10 49 C10 38.5 17.5 34 27 34 C36.5 34 44 38.5 44 49 C44 52 41.5 54 38.5 54 L15.5 54 C12.5 54 10 52 10 49 Z" fill="#027A2F" transform="translate(1.5, 1.8)" />
      <path d="M10 48 C10 38.5 17.5 34 27 34 C36.5 34 44 38.5 44 48 C44 51.2 41.5 53 38.5 53 L15.5 53 C12.5 53 10 51.2 10 48 Z" fill={`url(#${id}_g)`} />
      {/* Raised Amber '+' Approval Orb */}
      <circle cx="48" cy="39" r="10.5" fill="#B45309" transform="translate(1, 1.5)" />
      <circle cx="47.5" cy="38.5" r="10.5" fill="#F59E0B" />
      <path d="M47.5 33.5 V43.5 M42.5 38.5 H52.5" stroke="#FFFFFF" strokeWidth="3.5" strokeLinecap="round" />
    </svg>
  );
};

export const DeliveryBox3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => {
  const id = useSvgUid('dbox');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_top`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FDE68A" />
          <stop offset="100%" stopColor="#F59E0B" />
        </linearGradient>
        <linearGradient id={`${id}_left`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#D97706" />
          <stop offset="100%" stopColor="#B45309" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="57" rx="20" ry="3.5" fill="#92400E" opacity="0.2" />
      <path d="M32 10 L54 21 V44 L32 55 L10 44 V21 Z" fill={`url(#${id}_left)`} />
      <path d="M32 10 L54 21 L32 32 L10 21 Z" fill={`url(#${id}_top)`} />
      <path d="M32 32 L54 21 V44 L32 55 Z" fill="#B45309" />
      {/* Sealing Ribbon */}
      <path d="M21 15.5 L43 26.5 L43 37 L38 39 L38 29 L16 18 Z" fill="#FFFFFF" opacity="0.88" />
      {/* Emerald Fast Seal */}
      <circle cx="45" cy="43" r="8" fill="#04BB49" />
      <path d="M41.5 43 L44 45.5 L49 40.5" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
};

export const CabPass3D: React.FC<Icon3DProps> = ({ size = 28, className = '' }) => {
  const id = useSvgUid('cabs');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_y`} x1="10%" y1="10%" x2="90%" y2="95%">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="100%" stopColor="#EAB308" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="54" rx="22" ry="3.5" fill="#713F12" opacity="0.22" />
      {/* Roof Taxi Sign */}
      <rect x="26" y="13" width="12" height="5" rx="2" fill="#1E293B" />
      {/* Cabin Top */}
      <path d="M18 28 L23 18 H41 L46 28 Z" fill="#FEF08A" />
      <path d="M21 27 L24.5 20 H39.5 L43 27 Z" fill="#38BDF8" opacity="0.85" />
      {/* Chassis */}
      <rect x="9" y="27" width="46" height="17" rx="6" fill="#CA8A04" transform="translate(1, 2)" />
      <rect x="9" y="27" width="46" height="17" rx="6" fill={`url(#${id}_y)`} />
      {/* Headlights & Grille */}
      <circle cx="15" cy="35" r="3" fill="#FFFFFF" />
      <circle cx="49" cy="35" r="3" fill="#FFFFFF" />
      <rect x="24" y="34" width="16" height="4" rx="2" fill="#1E293B" />
      {/* Wheels */}
      <rect x="13" y="43" width="8" height="6" rx="2.5" fill="#1E293B" />
      <rect x="43" y="43" width="8" height="6" rx="2.5" fill="#1E293B" />
    </svg>
  );
};

export const IncomingKnock3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => (
  <BellAlert3D size={size} className={className} />
);

export const GuardCall3D: React.FC<Icon3DProps> = ({ size = 20, className = '' }) => {
  const id = useSvgUid('gcl');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_g`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#34D399" />
          <stop offset="100%" stopColor="#04BB49" />
        </linearGradient>
      </defs>
      <path d="M18 14 L25 14 C27 14 28.5 15.5 29 18 L30 24 C30.3 26 29.5 28 28 29 L24 32 C26.5 36.5 30 40 34.5 42.5 L37.5 38.5 C38.5 37 40.5 36.2 42.5 36.5 L48.5 37.5 C51 38 52.5 39.5 52.5 41.5 V48.5 C52.5 51.5 50 54 47 54 C28 54 12.5 38.5 12.5 19.5 C12.5 16.5 15 14 18 14 Z" fill="#027A2F" transform="translate(1.5, 2)" />
      <path d="M18 14 L25 14 C27 14 28.5 15.5 29 18 L30 24 C30.3 26 29.5 28 28 29 L24 32 C26.5 36.5 30 40 34.5 42.5 L37.5 38.5 C38.5 37 40.5 36.2 42.5 36.5 L48.5 37.5 C51 38 52.5 39.5 52.5 41.5 V48.5 C52.5 51.5 50 54 47 54 C28 54 12.5 38.5 12.5 19.5 C12.5 16.5 15 14 18 14 Z" fill={`url(#${id}_g)`} />
      <path d="M38 16 C44 16 49 21 49 27" stroke="#04BB49" strokeWidth="4" strokeLinecap="round" />
      <path d="M38 10 C47 10 55 18 55 27" stroke="#34D399" strokeWidth="3.5" strokeLinecap="round" opacity="0.65" />
    </svg>
  );
};

/* ============================================================================
 * MODULE 04 — DAILY STAFF 3D ICONS (Quick Hire + Compass Directory)
 * Replaces flat emojis 👨‍🍳 🧹 🚘 🚗 🍼 🪴 with sculptural 3D vectors
 * ============================================================================ */

export const ChefCook3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => {
  const id = useSvgUid('cook');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_hat`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#CBD5E1" />
        </linearGradient>
      </defs>
      <ellipse cx="32" cy="56" rx="18" ry="3.2" fill="#0F172A" opacity="0.16" />
      <rect x="19" y="38" width="26" height="14" rx="4" fill="#04BB49" />
      <path d="M16 39 C10 38 9 27 16 23 C16 15 24 10 32 10 C40 10 48 15 48 23 C55 27 54 38 48 39 Z" fill="#94A3B8" transform="translate(1.5, 2)" />
      <path d="M16 38 C10 37 9 26 16 22 C16 14 24 9 32 9 C40 9 48 14 48 22 C55 26 54 37 48 38 Z" fill={`url(#${id}_hat)`} />
      <path d="M25 18 V32 M32 16 V32 M39 18 V32" stroke="#94A3B8" strokeWidth="2.2" strokeLinecap="round" opacity="0.6" />
    </svg>
  );
};

export const MaidBroom3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => {
  const id = useSvgUid('maid');
  return (
    <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
      <defs>
        <linearGradient id={`${id}_br`} x1="15%" y1="10%" x2="85%" y2="95%">
          <stop offset="0%" stopColor="#FCD34D" />
          <stop offset="100%" stopColor="#D97706" />
        </linearGradient>
      </defs>
      <ellipse cx="29" cy="56" rx="18" ry="3.2" fill="#92400E" opacity="0.18" />
      <path d="M35 30 L50 10" stroke="#04BB49" strokeWidth="6" strokeLinecap="round" />
      <rect x="24" y="25" width="16" height="8" rx="3" fill="#027A2F" transform="rotate(35 32 29)" />
      <path d="M21 31 L39 42 L28 54 C25 56 17 52 12 46 Z" fill={`url(#${id}_br)`} />
      <circle cx="48" cy="39" r="4" fill="#38BDF8" opacity="0.7" />
      <circle cx="52" cy="31" r="2.5" fill="#7DD3FC" opacity="0.8" />
    </svg>
  );
};

export const DriverWheel3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="18" ry="3.2" fill="#0F172A" opacity="0.18" />
    <circle cx="33" cy="32" r="21" stroke="#334155" strokeWidth="7" />
    <circle cx="32" cy="31" r="21" stroke="#64748B" strokeWidth="6.5" />
    <path d="M13 29 H51 M32 31 V51" stroke="#475569" strokeWidth="6" strokeLinecap="round" />
    <circle cx="32" cy="31" r="7" fill="#04BB49" />
    <circle cx="31" cy="30" r="2.5" fill="#FFFFFF" opacity="0.6" />
  </svg>
);

export const CarWash3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="55" rx="22" ry="3.2" fill="#0284C7" opacity="0.2" />
    <path d="M18 30 L24 20 H40 L46 30 Z" fill="#BAE6FD" />
    <rect x="9" y="29" width="46" height="16" rx="6" fill="#0284C7" transform="translate(1, 2)" />
    <rect x="9" y="29" width="46" height="16" rx="6" fill="#38BDF8" />
    <rect x="13" y="44" width="8" height="5" rx="2" fill="#1E293B" />
    <rect x="43" y="44" width="8" height="5" rx="2" fill="#1E293B" />
    <circle cx="48" cy="17" r="6" fill="#FFFFFF" opacity="0.9" />
    <circle cx="53" cy="24" r="3.5" fill="#E0F2FE" />
  </svg>
);

export const NannyBottle3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="14" ry="3" fill="#0284C7" opacity="0.16" />
    <path d="M28 11 C28 8 36 8 36 11 L38 17 H26 Z" fill="#FBBF24" />
    <rect x="22" y="17" width="20" height="7" rx="3" fill="#04BB49" />
    <rect x="20" y="24" width="24" height="29" rx="7" fill="#94A3B8" transform="translate(1.5, 1.5)" />
    <rect x="20" y="24" width="24" height="29" rx="7" fill="#F8FAFC" />
    <rect x="22" y="33" width="20" height="18" rx="5" fill="#BAE6FD" />
    <path d="M23 30 H30 M23 36 H28 M23 42 H30" stroke="#64748B" strokeWidth="2" strokeLinecap="round" />
  </svg>
);

export const GardenerPlant3D: React.FC<Icon3DProps> = ({ size = 22, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <ellipse cx="32" cy="57" rx="16" ry="3" fill="#9A3412" opacity="0.2" />
    {/* Leaves */}
    <path d="M32 34 C19 32 14 21 21 15 C28 14 33 23 32 34 Z" fill="#059669" />
    <path d="M32 34 C45 32 50 21 43 15 C36 14 31 23 32 34 Z" fill="#34D399" />
    <path d="M32 33 C27 21 28 10 32 9 C36 10 37 21 32 33 Z" fill="#04BB49" />
    {/* Terracotta Pot */}
    <path d="M20 35 H44 L40 54 H24 Z" fill="#C2410C" transform="translate(1.5, 1.5)" />
    <path d="M20 35 H44 L40 54 H24 Z" fill="#EA580C" />
    <rect x="17" y="32" width="30" height="6" rx="2.5" fill="#F97316" />
  </svg>
);

export const CompassDirectory3D: React.FC<Icon3DProps> = ({ size = 18, className = '' }) => (
  <svg width={size} height={size} viewBox="0 0 64 64" fill="none" className={`shrink-0 ${className}`} aria-hidden="true">
    <circle cx="33" cy="33" r="22" fill="#027A2F" />
    <circle cx="32" cy="31" r="22" fill="#04BB49" />
    <circle cx="32" cy="31" r="16" fill="#FFFFFF" opacity="0.92" />
    <path d="M40 23 L35 34 L24 39 L29 28 Z" fill="#F43F5E" />
    <path d="M24 39 L29 28 L35 34 Z" fill="#334155" />
    <circle cx="32" cy="31" r="2.2" fill="#FFFFFF" />
  </svg>
);
