import React from "react";

interface CrossedSwordsProps {
  className?: string;
  goldAccent?: boolean;
}

/**
 * Military Officer Crossed Sabres Insignia
 * Handcrafted with authentic curved cavalry sabres, tapered double-edged tips,
 * defined fullers (blood grooves), traditional curved crossguards, ribbed grips, and spherical pommels.
 */
export default function CrossedSwords({ className = "w-6 h-6", goldAccent = true }: CrossedSwordsProps) {
  return (
    <svg
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Steel Blade Gradient */}
        <linearGradient id="bladeGrad1" x1="10" y1="10" x2="52" y2="52" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#E2E8F0" />
          <stop offset="50%" stopColor="#94A3B8" />
          <stop offset="100%" stopColor="#64748B" />
        </linearGradient>
        
        {/* Golden Hilt Gradient */}
        <linearGradient id="goldHiltGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#FDE047" />
          <stop offset="45%" stopColor="#EAB308" />
          <stop offset="100%" stopColor="#CA8A04" />
        </linearGradient>

        {/* Glow filter for the gold central crest */}
        <filter id="crestGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="0" stdDeviation="1.5" floodColor="#EAB308" floodOpacity="0.5" />
        </filter>
      </defs>

      {/* =========================================================================
          SWORD 1: Diagonal Top-Left Tip (11, 11) to Bottom-Right Pommel (53, 53)
          ========================================================================= */}
      <g>
        {/* Blade Body: Tapered Double-Edged Blade with sharp spear tip */}
        <path
          d="M 11 11 
             L 17 13.5 
             L 42 38.5 
             L 38.5 42 
             L 13.5 17 
             Z"
          fill="url(#bladeGrad1)"
        />

        {/* Blade Center Ridge / Fuller (Blood groove) */}
        <line
          x1="11"
          y1="11"
          x2="40.25"
          y2="40.25"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.85"
          strokeLinecap="round"
        />

        {/* Crossguard: Elegant curved officer sabre quillon */}
        <path
          d="M 37 46 
             C 41 43, 44 41, 46 37 
             C 47.2 38.2, 47.5 39.5, 46 41 
             L 41 46 
             C 39.5 47.5, 38.2 47.2, 37 46 Z"
          fill="url(#goldHiltGrad)"
          stroke="#78350F"
          strokeWidth="0.5"
        />

        {/* Sabre Grip / Hilt with wrapped wire texture */}
        <line
          x1="41.5"
          y1="41.5"
          x2="51"
          y2="51"
          stroke="url(#goldHiltGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <line x1="43.5" y1="41.5" x2="41.5" y2="43.5" stroke="#451A03" strokeWidth="0.8" />
        <line x1="46" y1="44" x2="44" y2="46" stroke="#451A03" strokeWidth="0.8" />
        <line x1="48.5" y1="46.5" x2="46.5" y2="48.5" stroke="#451A03" strokeWidth="0.8" />

        {/* Solid Spherical Pommel */}
        <circle
          cx="52.5"
          cy="52.5"
          r="2.5"
          fill="url(#goldHiltGrad)"
          stroke="#78350F"
          strokeWidth="0.6"
        />
      </g>

      {/* =========================================================================
          SWORD 2: Diagonal Top-Right Tip (53, 11) to Bottom-Left Pommel (11, 53)
          ========================================================================= */}
      <g>
        {/* Blade Body: Tapered Double-Edged Blade with sharp spear tip */}
        <path
          d="M 53 11 
             L 50.5 17 
             L 25.5 42 
             L 22 38.5 
             L 47 13.5 
             Z"
          fill="url(#bladeGrad1)"
        />

        {/* Blade Center Ridge / Fuller */}
        <line
          x1="53"
          y1="11"
          x2="23.75"
          y2="40.25"
          stroke="#FFFFFF"
          strokeWidth="0.8"
          strokeOpacity="0.85"
          strokeLinecap="round"
        />

        {/* Crossguard: Elegant curved officer sabre quillon */}
        <path
          d="M 27 46 
             C 23 43, 20 41, 18 37 
             C 16.8 38.2, 16.5 39.5, 18 41 
             L 23 46 
             C 24.5 47.5, 25.8 47.2, 27 46 Z"
          fill="url(#goldHiltGrad)"
          stroke="#78350F"
          strokeWidth="0.5"
        />

        {/* Sabre Grip / Hilt with wrapped wire texture */}
        <line
          x1="22.5"
          y1="41.5"
          x2="13"
          y2="51"
          stroke="url(#goldHiltGrad)"
          strokeWidth="3.2"
          strokeLinecap="round"
        />
        <line x1="20.5" y1="41.5" x2="22.5" y2="43.5" stroke="#451A03" strokeWidth="0.8" />
        <line x1="18" y1="44" x2="20" y2="46" stroke="#451A03" strokeWidth="0.8" />
        <line x1="15.5" y1="46.5" x2="17.5" y2="48.5" stroke="#451A03" strokeWidth="0.8" />

        {/* Solid Spherical Pommel */}
        <circle
          cx="11.5"
          cy="52.5"
          r="2.5"
          fill="url(#goldHiltGrad)"
          stroke="#78350F"
          strokeWidth="0.6"
        />
      </g>

      {/* =========================================================================
          POLISHED CENTRAL EMBLEM: Faceted Ashoka Star / Diamond Crest
          (Replaces the unpolished flat dot with a multi-pointed dimensional insignia)
          ========================================================================= */}
      {goldAccent && (
        <g filter="url(#crestGlow)">
          {/* Diamond base star */}
          <path
            d="M 32 25 
               L 35 30 
               L 39 32 
               L 35 34 
               L 32 39 
               L 29 34 
               L 25 32 
               L 29 30 
               Z"
            fill="url(#goldHiltGrad)"
            stroke="#78350F"
            strokeWidth="0.75"
          />
          {/* Inner core brilliant star */}
          <polygon
            points="32,28 33.5,31 36,32 33.5,33 32,36 30.5,33 28,32 30.5,31"
            fill="#FEF08A"
          />
        </g>
      )}
    </svg>
  );
}
