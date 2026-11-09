"use client";

import React from "react";
import { CubeFaceConfig } from "@/data/oir/types";

interface CubeRendererProps {
  label?: string;
  faces: CubeFaceConfig;
  size?: number;
  highlight?: boolean;
}

/**
 * High-Precision Isometric 3D Cube Renderer
 * Programmatically renders true isometric projection (30 degrees)
 * with top, front-left, and front-right faces.
 * Dynamically scales text and symbols to fit face boundaries without clipping.
 */
export default function CubeRenderer({
  label,
  faces,
  size = 110,
  highlight = false
}: CubeRendererProps) {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.44;

  const cos30 = Math.cos(Math.PI / 6); // ~0.866
  const sin30 = Math.sin(Math.PI / 6); // 0.5

  // Hexagon Vertices
  const pCenter = { x: cx, y: cy };
  const pTop = { x: cx, y: cy - r };
  const pTopRight = { x: cx + r * cos30, y: cy - r * sin30 };
  const pBottomRight = { x: cx + r * cos30, y: cy + r * sin30 };
  const pBottom = { x: cx, y: cy + r };
  const pBottomLeft = { x: cx - r * cos30, y: cy + r * sin30 };
  const pTopLeft = { x: cx - r * cos30, y: cy - r * sin30 };

  // Face Path Polygons
  const topFacePath = `M ${pCenter.x} ${pCenter.y} L ${pTopRight.x} ${pTopRight.y} L ${pTop.x} ${pTop.y} L ${pTopLeft.x} ${pTopLeft.y} Z`;
  const leftFacePath = `M ${pCenter.x} ${pCenter.y} L ${pTopLeft.x} ${pTopLeft.y} L ${pBottomLeft.x} ${pBottomLeft.y} L ${pBottom.x} ${pBottom.y} Z`;
  const rightFacePath = `M ${pCenter.x} ${pCenter.y} L ${pTopRight.x} ${pTopRight.y} L ${pBottomRight.x} ${pBottomRight.y} L ${pBottom.x} ${pBottom.y} Z`;

  // Centroids for text
  const topFaceCenter = { x: cx, y: cy - r * 0.48 };
  const leftFaceCenter = { x: cx - r * 0.44 * cos30, y: cy + r * 0.35 * sin30 + 4 };
  const rightFaceCenter = { x: cx + r * 0.44 * cos30, y: cy + r * 0.35 * sin30 + 4 };

  // Dynamic font sizing based on string length
  const getFontSize = (str?: string) => {
    if (!str) return size * 0.16;
    if (str.length >= 4) return size * 0.11;
    if (str.length >= 3) return size * 0.13;
    if (str.length >= 2) return size * 0.15;
    return size * 0.18;
  };

  return (
    <div className="flex flex-col items-center justify-center inline-flex p-1 select-none">
      {label && (
        <span className="text-[10px] font-bold tracking-wider mb-1 text-[var(--fg-secondary)]">
          {label}
        </span>
      )}
      <svg
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="transition-transform duration-200"
      >
        {/* Top Face */}
        <path
          d={topFacePath}
          className={`${
            highlight ? "fill-[var(--primary-accent)]/20" : "fill-[var(--canvas-surface-subtle)]"
          } stroke-[var(--fg-primary)] stroke-[1.6] transition-colors`}
        />
        {faces.top && (
          <text
            x={topFaceCenter.x}
            y={topFaceCenter.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold fill-[var(--fg-primary)] font-mono"
            style={{ fontSize: `${getFontSize(faces.top)}px` }}
          >
            {faces.top}
          </text>
        )}

        {/* Left Face */}
        <path
          d={leftFacePath}
          className={`${
            highlight ? "fill-[var(--primary-accent)]/15" : "fill-[var(--canvas-surface)]"
          } stroke-[var(--fg-primary)] stroke-[1.6] transition-colors`}
        />
        {faces.left && (
          <text
            x={leftFaceCenter.x}
            y={leftFaceCenter.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold fill-[var(--fg-primary)] font-mono"
            style={{ fontSize: `${getFontSize(faces.left)}px` }}
          >
            {faces.left}
          </text>
        )}

        {/* Right Face */}
        <path
          d={rightFacePath}
          className={`${
            highlight ? "fill-[var(--primary-accent)]/30" : "fill-[var(--canvas-surface-subtle)]/80"
          } stroke-[var(--fg-primary)] stroke-[1.6] transition-colors`}
        />
        {faces.right && (
          <text
            x={rightFaceCenter.x}
            y={rightFaceCenter.y}
            textAnchor="middle"
            dominantBaseline="central"
            className="font-bold fill-[var(--fg-primary)] font-mono"
            style={{ fontSize: `${getFontSize(faces.right)}px` }}
          >
            {faces.right}
          </text>
        )}

        {/* Outer Hexagon Outline */}
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
          strokeWidth="2.2"
          className="text-[var(--fg-primary)]"
        />
      </svg>
    </div>
  );
}
