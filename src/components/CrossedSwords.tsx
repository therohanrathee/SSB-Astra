import React from "react";

interface CrossedSwordsProps {
  className?: string;
}

export default function CrossedSwords({ className = "w-6 h-6" }: CrossedSwordsProps) {
  return (
    <svg
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor"
    >
      {/* Sword 1: Top-Left to Bottom-Right */}
      <g>
        {/* Blade */}
        <line
          x1="10"
          y1="10"
          x2="33"
          y2="33"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Blade Center Ridge / Edge Detail */}
        <line
          x1="11"
          y1="11"
          x2="30"
          y2="30"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        {/* Blade Tip Point */}
        <polygon points="10,10 7,12 12,7" fill="currentColor" />
        {/* Guard Crossbar */}
        <line
          x1="30"
          y1="36"
          x2="36"
          y2="30"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Hilt / Grip */}
        <line
          x1="33"
          y1="33"
          x2="39"
          y2="39"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Pommel */}
        <circle cx="40" cy="40" r="2" fill="currentColor" />
      </g>

      {/* Sword 2: Top-Right to Bottom-Left */}
      <g>
        {/* Blade */}
        <line
          x1="38"
          y1="10"
          x2="15"
          y2="33"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Blade Center Ridge / Edge Detail */}
        <line
          x1="37"
          y1="11"
          x2="18"
          y2="30"
          strokeWidth="1"
          strokeOpacity="0.4"
        />
        {/* Blade Tip Point */}
        <polygon points="38,10 41,12 36,7" fill="currentColor" />
        {/* Guard Crossbar */}
        <line
          x1="18"
          y1="36"
          x2="12"
          y2="30"
          strokeWidth="3"
          strokeLinecap="round"
        />
        {/* Hilt / Grip */}
        <line
          x1="15"
          y1="33"
          x2="9"
          y2="39"
          strokeWidth="2.5"
          strokeLinecap="round"
        />
        {/* Pommel */}
        <circle cx="8" cy="40" r="2" fill="currentColor" />
      </g>

      {/* Center Shield/Emblem Hub */}
      <circle
        cx="24"
        cy="21.5"
        r="3"
        fill="var(--gold-accent, #eab308)"
        stroke="currentColor"
        strokeWidth="1"
      />
    </svg>
  );
}
