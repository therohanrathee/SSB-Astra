import React from "react";

interface CrossedSwordsProps {
  className?: string;
}

/**
 * Authentic Indian Army-Style Crossed Scimitars / Sabres.
 * Clean, majestic, bare-metal golden blades with classic curved scimitar tips,
 * traditional Rajput/Mughal disc pommels, and crossguards.
 * Pure transparent background for web UI.
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
        {/* Regal Military Gold Gradient */}
        <linearGradient id="armyGoldLight" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FFF099" />
          <stop offset="35%" stopColor="#EAB308" />
          <stop offset="70%" stopColor="#CA8A04" />
          <stop offset="100%" stopColor="#92400E" />
        </linearGradient>

        <linearGradient id="armyGoldDark" x1="0" y1="0" x2="100" y2="100" gradientUnits="userSpaceOnUse">
          <stop offset="0%" stopColor="#FACC15" />
          <stop offset="40%" stopColor="#CA8A04" />
          <stop offset="85%" stopColor="#78350F" />
          <stop offset="100%" stopColor="#451A03" />
        </linearGradient>

        {/* Subtle metallic bevel highlight */}
        <linearGradient id="bladeBevel" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8" />
          <stop offset="50%" stopColor="#FDE047" stopOpacity="0.3" />
          <stop offset="100%" stopColor="#78350F" stopOpacity="0.6" />
        </linearGradient>
      </defs>

      {/* =========================================================================
          SWORD 1: Top-Left Curve to Bottom-Right Hilt (Crossing UNDER)
          Authentic curved talwar/scimitar blade
          ========================================================================= */}
      <g>
        {/* Curved Blade Spine and Edge */}
        <path
          d="M 12 18 
             C 15 15, 25 18, 38 27
             C 52 37, 65 52, 70 65
             L 66 68
             C 61 55, 48 41, 35 32
             C 23 23, 14 20, 12 18 Z"
          fill="url(#armyGoldLight)"
        />
        {/* Blade Spine Edge Highlight */}
        <path
          d="M 12 18 
             C 15 15, 25 18, 38 27
             C 52 37, 65 52, 70 65"
          stroke="url(#bladeBevel)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Traditional Indian Crossguard (Straight Quillon with Langet) */}
        <path
          d="M 64 61 L 76 71 L 74 73 L 62 63 Z"
          fill="url(#armyGoldDark)"
        />
        <circle cx="63" cy="62" r="1.5" fill="#FEF08A" />
        <circle cx="75" cy="72" r="1.5" fill="#FEF08A" />

        {/* Central Langet Peak over blade */}
        <polygon points="68,64 70,67 66,67" fill="url(#armyGoldLight)" />

        {/* Grip */}
        <line
          x1="68"
          y1="67"
          x2="78"
          y2="77"
          stroke="url(#armyGoldDark)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Traditional Rajput/Sikh/Mughal Disc Pommel */}
        <ellipse
          cx="81"
          cy="80"
          rx="5.5"
          ry="3"
          transform="rotate(45 81 80)"
          fill="url(#armyGoldLight)"
          stroke="#78350F"
          strokeWidth="0.8"
        />
        {/* Pommel Spike Dome */}
        <circle cx="83" cy="82" r="1.2" fill="#FEF08A" />
      </g>

      {/* =========================================================================
          SWORD 2: Top-Right Curve to Bottom-Left Hilt (Crossing OVER)
          ========================================================================= */}
      <g>
        {/* Curved Blade Spine and Edge */}
        <path
          d="M 88 18 
             C 85 15, 75 18, 62 27
             C 48 37, 35 52, 30 65
             L 34 68
             C 39 55, 52 41, 65 32
             C 77 23, 86 20, 88 18 Z"
          fill="url(#armyGoldLight)"
        />
        {/* Blade Spine Edge Highlight */}
        <path
          d="M 88 18 
             C 85 15, 75 18, 62 27
             C 48 37, 35 52, 30 65"
          stroke="url(#bladeBevel)"
          strokeWidth="1.2"
          strokeLinecap="round"
        />

        {/* Crossguard */}
        <path
          d="M 36 61 L 24 71 L 26 73 L 38 63 Z"
          fill="url(#armyGoldDark)"
        />
        <circle cx="37" cy="62" r="1.5" fill="#FEF08A" />
        <circle cx="25" cy="72" r="1.5" fill="#FEF08A" />

        {/* Langet Peak */}
        <polygon points="32,64 30,67 34,67" fill="url(#armyGoldLight)" />

        {/* Grip */}
        <line
          x1="32"
          y1="67"
          x2="22"
          y2="77"
          stroke="url(#armyGoldDark)"
          strokeWidth="4"
          strokeLinecap="round"
        />

        {/* Disc Pommel */}
        <ellipse
          cx="19"
          cy="80"
          rx="5.5"
          ry="3"
          transform="rotate(-45 19 80)"
          fill="url(#armyGoldLight)"
          stroke="#78350F"
          strokeWidth="0.8"
        />
        {/* Pommel Spike Dome */}
        <circle cx="17" cy="82" r="1.2" fill="#FEF08A" />
      </g>
    </svg>
  );
}
