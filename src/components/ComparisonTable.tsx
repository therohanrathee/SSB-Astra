"use client";

import React from "react";
import { Check, X, ShieldAlert, Cpu } from "lucide-react";

export default function ComparisonTable() {
  const comparisons = [
    {
      feature: "Cognitive Testing Mode",
      oldSystem: "Paper booklet OIR tests (OIR-1, OIR-2) checked manually or by optical readers.",
      newSystem: "Digital CSSS terminal with strictly enforced individual question micro-timers (16–30s).",
    },
    {
      feature: "Navigation & Question Review",
      oldSystem: "Free backtracking across paper pages; candidates can guess and re-read multiple times.",
      newSystem: "Strict one-way sequence. Unanswered or timed-out items seal permanently.",
    },
    {
      feature: "Sensory & Cognitive Breadth",
      oldSystem: "Basic 2D paper figures, number series, analogies.",
      newSystem: "Audio discrimination (tones/phonetics via headphones), working memory flash matrices, 3D folding.",
    },
    {
      feature: "Personality / Subjective Evaluation",
      oldSystem: "PPDT: 30s blurred picture, 4-min written story, individual narration, and 15-min group discussion.",
      newSystem: "OPAM: ~120 psychometric items (Likert scale & situational dilemmas) directly mapped to 15 OLQs.",
    },
    {
      feature: "Group Discussion Dynamics",
      oldSystem: "Prone to chaotic 'fish markets', assessor subjective bias, and disadvantage for hesitant English speakers.",
      newSystem: "Zero discussion friction. Standardized psychometric baseline for all candidates regardless of language accent.",
    },
    {
      feature: "Faking / Coaching Detection",
      oldSystem: "Assessor relies on intuition and body language during the PPDT discussion.",
      newSystem: "Algorithmic Lie-Scale and Cross-Validation pairs track inconsistencies in psychological responses.",
    },
  ];

  return (
    <section id="comparison" className="py-24 sm:py-32 border-t border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)]">
            Paradigm Shift
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--fg-primary)] tracking-tight">
            Traditional PPDT vs. New DIPR Digital System
          </h2>
          <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed">
            Understand why the Armed Forces transitioned to computerized screening and how the testing parameters differ.
          </p>
        </div>

        {/* Comparison Grid */}
        <div className="hud-corner rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] overflow-hidden shadow-xl">
          {/* Header Row */}
          <div className="grid grid-cols-1 md:grid-cols-12 border-b border-[var(--canvas-border)] font-mono text-xs font-bold uppercase tracking-wider">
            <div className="md:col-span-4 p-4 text-[var(--fg-muted)] bg-[var(--canvas-surface-subtle)]">
              Screening Dimension
            </div>
            <div className="md:col-span-4 p-4 bg-rose-500/10 text-rose-600 dark:text-rose-400 border-t md:border-t-0 md:border-l border-[var(--canvas-border)] flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 shrink-0" />
              <span>Legacy System (OIR + PPDT)</span>
            </div>
            <div className="md:col-span-4 p-4 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border-t md:border-t-0 md:border-l border-[var(--canvas-border)] flex items-center gap-2">
              <Cpu className="w-4 h-4 shrink-0" />
              <span>New DIPR System (CSSS + OPAM)</span>
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y divide-[var(--canvas-border)] text-xs sm:text-sm">
            {comparisons.map((row, i) => (
              <div key={i} className="grid grid-cols-1 md:grid-cols-12 hover:bg-[var(--canvas-surface-subtle)] transition-colors">
                {/* Feature Name */}
                <div className="md:col-span-4 p-4 font-semibold text-[var(--fg-primary)] flex items-center">
                  {row.feature}
                </div>

                {/* Old System */}
                <div className="md:col-span-4 p-4 text-[var(--fg-muted)] border-t md:border-t-0 md:border-l border-[var(--canvas-border)] flex items-start gap-2.5">
                  <X className="w-4 h-4 text-rose-500 shrink-0 mt-0.5" />
                  <span>{row.oldSystem}</span>
                </div>

                {/* New System */}
                <div className="md:col-span-4 p-4 text-[var(--fg-secondary)] border-t md:border-t-0 md:border-l border-[var(--canvas-border)] flex items-start gap-2.5 bg-[var(--primary-glow)]/10 font-medium">
                  <Check className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                  <span>{row.newSystem}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}
