import React from "react";

interface CrossedSwordsProps {
  className?: string;
}

/**
 * Exact Indian Army Crest Crossed Swords:
 * Straight, double-edged combat military broadswords crossed in saltire (X).
 * Hilts at the bottom, straight blades pointing upward and outward.
 * Features rectangular crossguards with spherical terminals, wrapped grips,
 * solid round pommels, and sharp triangular spear-point tips.
 * Pure bare-metal gold with zero background for web UI.
 */
export default function CrossedSwords({ className = "w-6 h-6" }: CrossedSwordsProps) {
  return (
    <svg
      viewBox="0 0 100 100"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <defs>
        {/* Army Gold Left-Edge Highlight */}
        <linearGradient id="armySwordGoldLight" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFBEB" />
          <stop offset="30%" stopColor="#FEF08A" />
          <stop offset="60%" stopColor="#EAB308" />
          <stop offset="90%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#854D0E" />
        </linearGradient>

        {/* Army Gold Right-Edge Shadow */}
        <linearGradient id="armySwordGoldDark" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="45%" stopColor="#CA8A04" />
          <stop offset="80%" stopColor="#854D0E" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        {/* Sharp Center Spine Highlight */}
        <linearGradient id="spineWhite" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#FEF08A" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#CA8A04" stopOpacity="0.3" />
        </linearGradient>
      </defs>

      {/* =========================================================================
          SWORD 1: From Bottom-Left Hilt (24, 76) to Top-Right Tip (82, 18)
          Passing UNDER at center (50, 50)
          ========================================================================= */}
      <g>
        {/* Pommel (Bottom-Left) */}
        <circle cx="21" cy="79" r="3.5" fill="url(#armySwordGoldLight)" stroke="#582C0E" strokeWidth="0.75" />

        {/* Grip / Handle */}
        <line
          x1="23.5"
          y1="76.5"
          x2="32.5"
          y2="67.5"
          stroke="url(#armySwordGoldDark)"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        {/* Grip Wire Bindings */}
        <line x1="25.5" y1="73.5" x2="27.5" y2="75.5" stroke="#451A03" strokeWidth="0.75" />
        <line x1="28" y1="71" x2="30" y2="73" stroke="#451A03" strokeWidth="0.75" />
        <line x1="30.5" y1="68.5" x2="32.5" y2="70.5" stroke="#451A03" strokeWidth="0.75" />

        {/* Crossguard with cylindrical bar & ball finials */}
        <line
          x1="39"
          y1="61"
          x2="27"
          y2="73"
          stroke="url(#armySwordGoldLight)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="39.5" cy="60.5" r="1.75" fill="url(#armySwordGoldDark)" />
        <circle cx="26.5" cy="73.5" r="1.75" fill="url(#armySwordGoldDark)" />

        {/* Straight Double-Edged Blade: Left Facet (Light) */}
        <path
          d="M 33 67
             L 31 65
             L 79 17
             L 82 18
             Z"
          fill="url(#armySwordGoldLight)"
        />
        {/* Straight Double-Edged Blade: Right Facet (Dark) */}
        <path
          d="M 33 67
             L 35 69
             L 83 21
             L 82 18
             Z"
          fill="url(#armySwordGoldDark)"
        />
        {/* Sharp Center Blade Spine / Ridge */}
        <line
          x1="33"
          y1="67"
          x2="82"
          y2="18"
          stroke="url(#spineWhite)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>

      {/* =========================================================================
          SWORD 2: From Bottom-Right Hilt (76, 76) to Top-Left Tip (18, 18)
          Passing OVER at center (50, 50)
          ========================================================================= */}
      <g>
        {/* Pommel (Bottom-Right) */}
        <circle cx="79" cy="79" r="3.5" fill="url(#armySwordGoldLight)" stroke="#582C0E" strokeWidth="0.75" />

        {/* Grip / Handle */}
        <line
          x1="76.5"
          y1="76.5"
          x2="67.5"
          y2="67.5"
          stroke="url(#armySwordGoldDark)"
          strokeWidth="3.6"
          strokeLinecap="round"
        />
        {/* Grip Wire Bindings */}
        <line x1="74.5" y1="73.5" x2="72.5" y2="75.5" stroke="#451A03" strokeWidth="0.75" />
        <line x1="72" y1="71" x2="70" y2="73" stroke="#451A03" strokeWidth="0.75" />
        <line x1="69.5" y1="68.5" x2="67.5" y2="70.5" stroke="#451A03" strokeWidth="0.75" />

        {/* Crossguard with cylindrical bar & ball finials */}
        <line
          x1="61"
          y1="61"
          x2="73"
          y2="73"
          stroke="url(#armySwordGoldLight)"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        <circle cx="60.5" cy="60.5" r="1.75" fill="url(#armySwordGoldDark)" />
        <circle cx="73.5" cy="73.5" r="1.75" fill="url(#armySwordGoldDark)" />

        {/* Straight Double-Edged Blade: Right Facet (Light) */}
        <path
          d="M 67 67
             L 69 65
             L 21 17
             L 18 18
             Z"
          fill="url(#armySwordGoldLight)"
        />
        {/* Straight Double-Edged Blade: Left Facet (Dark) */}
        <path
          d="M 67 67
             L 65 69
             L 17 21
             L 18 18
             Z"
          fill="url(#armySwordGoldDark)"
        />
        {/* Sharp Center Blade Spine / Ridge */}
        <line
          x1="67"
          y1="67"
          x2="18"
          y2="18"
          stroke="url(#spineWhite)"
          strokeWidth="0.8"
          strokeLinecap="round"
        />
      </g>
    </svg>
  );
}
