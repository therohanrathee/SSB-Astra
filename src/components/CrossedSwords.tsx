import React from "react";
import Image from "next/image";

interface CrossedSwordsProps {
  className?: string;
}

/**
 * Exact Indian Army Crest Crossed Swords:
 * Directly extracted from the official Indian Army Insignia vector.
 * Pure golden military swords with exact hilt guards, langets, and double-edged blades.
 * Pure transparent background for web UI.
 */
export default function CrossedSwords({ className = "w-7 h-7" }: CrossedSwordsProps) {
  return (
    <div className={`relative inline-flex items-center justify-center ${className}`}>
      <Image
        src="/swords.svg"
        alt="Indian Army Crossed Swords"
        width={60}
        height={40}
        priority
        className="w-full h-full object-contain filter drop-shadow-[0_1px_3px_rgba(0,0,0,0.4)]"
      />
    </div>
  );
}
