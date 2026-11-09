"use client";

import React from "react";

interface CubeFaceSymbols {
  top?: string;
  left?: string;
  right?: string;
}

interface CubeRendererProps {
  label?: string;
  faces: CubeFaceSymbols;
  size?: number;
  highlight?: boolean;
}

/**
 * Isometric 3D Cube Renderer for DIPR Non-Verbal OIR Questions
 * Renders a mathematical isometric projection with top, front-left, and front-right faces.
 * Dynamically supports geometric symbols, numbers, and letter markers with crisp SVG vectors.
 */
export default function CubeRenderer({
  label,
  faces,
  size = 130,
  highlight = false
}: CubeRendererProps) {
  // Center coordinates and isometric projection radius
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.42;

  // Isometric angle trigonometry (30 degrees from horizontal)
  const cos30 = Math.cos(Math.PI / 6); // ~0.866
  const sin30 = Math.sin(Math.PI / 6); // 0.5

  // Points of the outer hexagon
  const pCenter = { x: cx, y: cy };
  const pTop = { x: cx, y: cy - r };
  const pTopRight = { x: cx + r * cos30, y: cy - r * sin30 };
  const pBottomRight = { x: cx + r * cos30, y: cy + r * sin30 };
  const pBottom = { x: cx, y: cy + r };
  const pBottomLeft = { x: cx - r * cos30, y: cy + r * sin30 };
  const pTopLeft = { x: cx - r * cos30, y: cy - r * sin30 };

  // Face path polygons
  const topFacePath = `M ${pCenter.x} ${pCenter.y} L ${pTopRight.x} ${pTopRight.y} L ${pTop.x} ${pTop.y} L ${pTopLeft.x} ${pTopLeft.y} Z`;
  const leftFacePath = `M ${pCenter.x} ${pCenter.y} L ${pTopLeft.x} ${pTopLeft.y} L ${pBottomLeft.x} ${pBottomLeft.y} L ${pBottom.x} ${pBottom.y} Z`;
  const rightFacePath = `M ${pCenter.x} ${pCenter.y} L ${pTopRight.x} ${pTopRight.y} L ${pBottomRight.x} ${pBottomRight.y} L ${pBottom.x} ${pBottom.y} Z`;

  // Center points for face text/symbols
  const topFaceCenter = { x: cx, y: cy - r * 0.5 };
  const leftFaceCenter = { x: cx - r * 0.45 * cos30, y: cy + r * 0.3 * sin30 + 5 };
  const rightFaceCenter = { x: cx + r * 0.45 * cos30, y: cy + r * 0.3 * sin30 + 5 };

  return (
    <div className="flex flex-col items-center justify-center inline-block p-1">
      {label && (
        <span className="text-[11px] font-bold tracking-wider mb-1 text-[var(--fg-secondary)]">
          {label}
        </span>
      )}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transition-transform hover:scale-105 duration-200"
      >
        <defs>
          <filter id={`shadow-${size}`} x="-10%" y="-10%" width="120%" height="120%">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodOpacity="0.15" />
          </filter>
        </defs>

        {/* Top Face */}
        <path
          d={topFacePath}
          className={`${
            highlight ? "fill-[var(--primary-accent)]/20" : "fill-[var(--canvas-surface-subtle)]"
          } stroke-[var(--fg-primary)] stroke-[1.5] transition-colors`}
        />
        {/* Top Face Content */}
        {faces.top && (
          <text
            x={topFaceCenter.x}
            y={topFaceCenter.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-sm font-bold fill-[var(--fg-primary)] select-none font-mono"
            style={{ fontSize: `${size * 0.16}px` }}
          >
            {faces.top}
          </text>
        )}

        {/* Left Face */}
        <path
          d={leftFacePath}
          className={`${
            highlight ? "fill-[var(--primary-accent)]/15" : "fill-[var(--canvas-surface)]"
          } stroke-[var(--fg-primary)] stroke-[1.5] transition-colors`}
        />
        {/* Left Face Content */}
        {faces.left && (
          <text
            x={leftFaceCenter.x}
            y={leftFaceCenter.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-sm font-bold fill-[var(--fg-primary)] select-none font-mono"
            style={{ fontSize: `${size * 0.16}px` }}
          >
            {faces.left}
          </text>
        )}

        {/* Right Face */}
        <path
          d={rightFacePath}
          className={`${
            highlight ? "fill-[var(--primary-accent)]/30" : "fill-[var(--canvas-surface-subtle)]/70"
          } stroke-[var(--fg-primary)] stroke-[1.5] transition-colors`}
        />
        {/* Right Face Content */}
        {faces.right && (
          <text
            x={rightFaceCenter.x}
            y={rightFaceCenter.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="text-sm font-bold fill-[var(--fg-primary)] select-none font-mono"
            style={{ fontSize: `${size * 0.16}px` }}
          >
            {faces.right}
          </text>
        )}

        {/* Outer boundary stroke reinforcement */}
        <polygon
          points={`
            ${pTop.x},${pTop.y} 
            ${pTopRight.x},${pTopRight.y} 
            ${pBottomRight.x},${pBottomRight.y} 
            ${pBottom.x},${pBottom.y} 
            ${pBottomLeft.x},${pBottomLeft.y} 
            ${pTopLeft.x},${pTopLeft.y}
          `}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          className="text-[var(--fg-primary)]"
        />
      </svg>
    </div>
  );
}
