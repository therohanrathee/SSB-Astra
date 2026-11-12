"use client";

import React from "react";
import CubeRenderer from "@/components/oir/CubeRenderer";
import { CubeFaceConfig, OIRQuestionOption, QuestionFigureConfig } from "@/data/oir/types";

interface OptionVisualProps {
  option: OIRQuestionOption;
  highlight?: boolean;
  compact?: boolean;
}

/**
 * Renders the visual media attached to an individual answer option (3D cube,
 * inline vector SVG, or digital illustration) for both test and review views.
 */
export function OptionVisual({
  option,
  highlight = false,
  compact = false,
}: OptionVisualProps) {
  if (!option.cubeFaces && !option.svgMarkup && !option.imageUrl) {
    return null;
  }

  return (
    <>
      {option.cubeFaces && (
        <div
          className={`shrink-0 ${
            compact ? "p-0.5" : "p-1"
          } bg-[var(--canvas-surface-subtle)] rounded-lg border border-[var(--canvas-border)] shadow-sm`}
        >
          <CubeRenderer
            faces={option.cubeFaces}
            size={compact ? 45 : 65}
            highlight={highlight}
          />
        </div>
      )}

      {option.svgMarkup && (
        <div
          className={`shrink-0 ${
            compact ? "p-1 max-w-[96px]" : "p-1.5 max-w-[140px]"
          } bg-[var(--canvas-surface-subtle)] rounded-lg border border-[var(--canvas-border)] text-[var(--fg-primary)] flex items-center justify-center`}
          dangerouslySetInnerHTML={{ __html: option.svgMarkup }}
        />
      )}

      {option.imageUrl && (
        <div
          className={`shrink-0 ${
            compact ? "p-1" : "p-1.5"
          } bg-white rounded-lg border border-[var(--canvas-border)]`}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={option.imageUrl}
            alt={`Option ${option.key}`}
            className={`object-contain ${compact ? "max-h-14 max-w-[96px]" : "max-h-24 max-w-[140px]"}`}
          />
        </div>
      )}
    </>
  );
}

interface QuestionFiguresProps {
  figures?: QuestionFigureConfig;
  compact?: boolean;
}

/**
 * Renders the visual figure block (cubes, 3-set cube matches, vector SVG diagrams,
 * or digital figure sheets) shared by both the live OIR exam viewport and post-test review.
 */
export default function QuestionFigures({
  figures,
  compact = false,
}: QuestionFiguresProps) {
  if (!figures || figures.type === "none") {
    return null;
  }

  const groupCubeSize = compact ? 64 : 80;
  const compareCubeSize = compact ? 84 : 110;
  const set3CubeSize = compact ? 58 : 74;

  const renderCubeGroups = (
    groups: {
      title: string;
      titleColor: string;
      cubes?: { label?: string; faces: CubeFaceConfig }[];
    }[],
    cubeSize: number,
    colsClass: string
  ) => (
    <div className={`grid ${colsClass} ${compact ? "gap-3" : "gap-4"}`}>
      {groups.map((group) => (
        <div
          key={group.title}
          className={`${
            compact ? "p-2.5" : "p-3.5"
          } rounded-xl bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-center space-y-2 shadow-sm`}
        >
          <span
            className={`text-xs font-black ${group.titleColor} block uppercase tracking-wider`}
          >
            {group.title}
          </span>
          <div className="flex flex-wrap items-center justify-center gap-2.5">
            {group.cubes?.map((cube, idx) => (
              <CubeRenderer
                key={idx}
                label={cube.label}
                faces={cube.faces}
                size={cubeSize}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <div
      className={`${
        compact ? "p-3" : "p-4"
      } rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-3`}
    >
      {figures.type === "cubes_group" && (
        <div className="space-y-3">
          {renderCubeGroups(
            [
              {
                title: "GROUP A",
                titleColor: "text-[var(--gold-accent)]",
                cubes: figures.groupA,
              },
              {
                title: "GROUP B",
                titleColor: "text-[var(--fg-muted)]",
                cubes: figures.groupB,
              },
            ],
            groupCubeSize,
            "grid-cols-1 sm:grid-cols-2"
          )}

          {!compact && (
            <p className="text-[11px] text-[var(--fg-muted)] text-center font-sans">
              {figures.instructionHint ||
                "Identify the orientation property distinguishing Group A and pick the candidate cube below."}
            </p>
          )}
        </div>
      )}

      {figures.type === "cubes_sets_3" && (
        <div className="space-y-3">
          {renderCubeGroups(
            [
              {
                title: "SET A",
                titleColor: "text-[var(--gold-accent)]",
                cubes: figures.groupA,
              },
              {
                title: "SET B",
                titleColor: "text-[var(--fg-primary)]",
                cubes: figures.groupB,
              },
              {
                title: "SET C",
                titleColor: "text-[var(--fg-secondary)]",
                cubes: figures.groupC,
              },
            ],
            set3CubeSize,
            "grid-cols-1 lg:grid-cols-3"
          )}

          {!compact && (
            <p className="text-[11px] text-[var(--fg-muted)] text-center font-sans">
              {figures.instructionHint ||
                "Examine Set A and determine whether Set B or Set C matches its defining property."}
            </p>
          )}
        </div>
      )}

      {figures.type === "cubes_compare" && (
        <div
          className={`flex flex-col items-center justify-center ${
            compact ? "py-1" : "py-2"
          } space-y-2`}
        >
          <div
            className={`flex flex-wrap items-center justify-center ${
              compact ? "gap-4 sm:gap-8" : "gap-6 sm:gap-12"
            }`}
          >
            {figures.cubeA && (
              <CubeRenderer
                label={figures.cubeA.label || "Cube 1"}
                faces={figures.cubeA.faces}
                size={compareCubeSize}
              />
            )}

            <div className="px-3 py-1 rounded-full bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-xs font-black text-[var(--gold-accent)] shadow-sm">
              VS
            </div>

            {figures.cubeB && (
              <CubeRenderer
                label={figures.cubeB.label || "Cube 2"}
                faces={figures.cubeB.faces}
                size={compareCubeSize}
              />
            )}
          </div>

          {!compact && (
            <p className="text-[11px] text-[var(--fg-muted)] text-center font-sans">
              {figures.instructionHint ||
                "Determine if Cube 1 and Cube 2 are rotated views of the identical cube."}
            </p>
          )}
        </div>
      )}

      {figures.type === "svg" && figures.svgMarkup && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div
            className={`w-full flex items-center justify-center overflow-x-auto text-[var(--fg-primary)] ${
              compact ? "max-h-44" : "max-h-64"
            }`}
            dangerouslySetInnerHTML={{ __html: figures.svgMarkup }}
          />
          {figures.instructionHint && !compact && (
            <p className="text-[11px] text-[var(--fg-muted)] text-center font-sans">
              {figures.instructionHint}
            </p>
          )}
        </div>
      )}

      {figures.type === "image" && figures.imageUrl && (
        <div className="flex flex-col items-center justify-center space-y-2">
          <div className="p-2 rounded-lg bg-white border border-[var(--canvas-border)] shadow-sm">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={figures.imageUrl}
              alt={figures.imageCaption || "OIR Problem Figure"}
              className={`object-contain mx-auto ${compact ? "max-h-40" : "max-h-64"}`}
            />
          </div>
          {figures.imageCaption && !compact && (
            <p className="text-[11px] text-[var(--fg-muted)] text-center font-sans">
              {figures.imageCaption}
            </p>
          )}
        </div>
      )}
    </div>
  );
}
