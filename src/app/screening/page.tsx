"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  FileText, 
  Terminal, 
  Clock, 
  CheckCircle2, 
  AlertTriangle, 
  ChevronRight, 
  PlayCircle, 
  Download, 
  QrCode, 
  Sparkles, 
  Award, 
  Layers, 
  BookOpen, 
  ShieldAlert, 
  ShieldCheck,
  Zap,
  ArrowRight
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";

export default function ScreeningHubPage() {
  const [selectedTab, setSelectedTab] = useState<"legacy" | "new" | "both">("both");

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
      
      {/* Top Floating Action Pill Header */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Brand / Home Link */}
          <Link 
            href="/dashboard" 
            className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/85 backdrop-blur-md hover:border-[var(--primary-accent)] transition-all shadow-sm group"
          >
            <div className="w-7 h-7 rounded-md border border-[var(--primary-accent)]/60 bg-[var(--canvas-surface)] flex items-center justify-center shadow-sm">
              <CrossedSwords className="w-4 h-4 text-[var(--primary-accent)]" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                SSB<span className="text-[var(--gold-accent)] font-semibold">ASTRA</span>
              </span>
              <span className="text-[8px] sm:text-[9px] block text-[var(--fg-muted)] leading-none uppercase">STAGE-1 SCREENING</span>
            </div>
          </Link>

          {/* Navigation Pill Shortcuts */}
          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              href="/dashboard"
              className="px-3 py-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all"
            >
              Candidate HQ
            </Link>
            <ThemeToggle compact />
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 w-full space-y-6 flex-1">
        
        {/* 1. Official Operational Advisory Banner */}
        <div className="p-4 sm:p-5 rounded-2xl border border-[var(--gold-accent)]/40 bg-gradient-to-r from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] relative overflow-hidden shadow-sm">
          <div className="flex items-start gap-3.5">
            <div className="w-9 h-9 rounded-xl bg-[var(--gold-accent)]/15 border border-[var(--gold-accent)]/30 flex items-center justify-center text-[var(--gold-accent)] shrink-0 mt-0.5">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                  OFFICIAL SCREENING PROTOCOL ADVISORY
                </span>
                <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] font-bold border border-[var(--gold-accent)]/30">
                  DUAL-BATTERY PREPARATION
                </span>
              </div>
              <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                The <strong>New DIPR System (CSSS + OPAM)</strong> is currently being administered at select Selection Boards in trial batches, while the <strong>Legacy System (OIR Booklets + PPDT)</strong> remains the primary operational screening standard across the Indian Army, Navy, and Air Force. To ensure 100% recommendation readiness, candidates must practice both testing systems.
              </p>
            </div>
          </div>
        </div>

        {/* 2. Dual-Column Symmetrical Viewport */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          
          {/* ============================================================ */}
          {/* LEFT COLUMN: ACTIVE OPERATIONAL LEGACY SCREENING (OIR + PPDT) */}
          {/* ============================================================ */}
          <div className="p-5 sm:p-6 rounded-2xl border-2 border-[var(--primary-accent)]/40 bg-[var(--canvas-surface)] flex flex-col justify-between shadow-md relative overflow-hidden group space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-accent)]/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3 border-b border-[var(--canvas-border)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center border border-[var(--primary-accent)]/20">
                    <FileText className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold tracking-wide text-[var(--fg-primary)]">
                      LEGACY SCREENING SYSTEM
                    </h2>
                    <span className="text-[9px] text-[var(--primary-accent)] font-bold tracking-wider uppercase block">
                      Active Operational Protocol (All Boards)
                    </span>
                  </div>
                </div>

                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-[var(--military-olive)]/15 text-[var(--military-olive)] border border-[var(--military-olive)]/30">
                  PRIMARY STANDARD
                </span>
              </div>

              <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-5">
                The battle-tested 2-stage battery followed across Prayagraj (Allahabad), Bhopal, Bengaluru, Kapurthala, Gandhinagar, Varanasi, Dehradun, Coimbatore, Visakhapatnam, and Kolkata.
              </p>

              {/* Sub-Module 1: OIR CBT Question Simulator */}
              <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Terminal className="w-4 h-4 text-[var(--primary-accent)]" />
                    <span className="text-xs font-bold text-[var(--fg-primary)]">
                      Part 1: Officer Intelligence Rating (OIR)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--primary-accent)] font-bold">
                    Basic Reasoning & Speed
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                  <p className="text-[var(--fg-secondary)]">
                    <strong className="text-[var(--fg-primary)]">What to Expect:</strong> 40–50 verbal and non-verbal reasoning problems solved under strict booklet time limits (approx. 17–30 mins).
                  </p>
                  <p className="text-[var(--fg-muted)]">
                    <strong className="text-[var(--fg-primary)]">Assessor Motive:</strong> Assessors evaluate your innate analytical acumen, numerical-logical reasoning, and mental processing speed under pressure. Your rating establishes your official DIPR OIR benchmark (Rating 1 to 5).
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    <span className="text-[var(--fg-muted)] block">EVALUATION METRIC</span>
                    <span className="font-bold text-[var(--fg-primary)]">Logical & Spatial Reasoning</span>
                  </div>
                  <div className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    <span className="text-[var(--fg-muted)] block">BENCHMARK</span>
                    <span className="font-bold text-[var(--primary-accent)]">DIPR OIR Grade 1 to 5</span>
                  </div>
                </div>

                <Link
                  href="/screening/oir"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Start OIR Test</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sub-Module 2: PPDT Simulator */}
              <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--gold-accent)]" />
                    <span className="text-xs font-bold text-[var(--fg-primary)]">
                      Part 2: PPDT (Picture Perception & Discussion)
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-[var(--gold-accent)] font-bold">
                    Perceptual Projection
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                  <p className="text-[var(--fg-secondary)]">
                    <strong className="text-[var(--fg-primary)]">What to Expect:</strong> 30s observation of an ambiguous, hazy picture, 1 min to record character details (number, age, sex, mood) & action, followed by 4 mins to formulate a complete individual story.
                  </p>
                  <p className="text-[var(--fg-muted)]">
                    <strong className="text-[var(--gold-accent)]">Assessor Motive:</strong> Assessors evaluate how you perceive situations and project your spontaneous thought processes. <span className="text-[var(--fg-primary)] font-semibold">Remember: No perspective or story theme is right or wrong</span> — assessors strictly observe how you structure thinking, maintain realism, and exhibit constructive, action-oriented leadership.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[var(--fg-muted)] flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    30s Ambiguous Observation
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    No Perspective Is Wrong or Right
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    Constructive Action & Initiative
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    Individual Narrative Framing
                  </span>
                </div>

                <Link
                  href="/screening/ppdt"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface)] text-[var(--fg-primary)] text-xs font-bold transition-all shadow-sm active:scale-95"
                >
                  <PlayCircle className="w-4 h-4 text-[var(--gold-accent)]" />
                  <span>Launch PPDT Simulator</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-[var(--fg-muted)] flex items-center justify-between border-t border-[var(--canvas-border)]">
              <span>Includes Official Authentic Booklets & Scored Sets</span>
              <span className="text-emerald-500 font-bold">Ready to Practice</span>
            </div>
          </div>

          {/* ============================================================ */}
          {/* RIGHT COLUMN: NEW DIPR SYSTEM (CSSS + OPAM COMPUTERIZED)     */}
          {/* ============================================================ */}
          <div className="p-5 sm:p-6 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-md relative overflow-hidden group space-y-6">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

            <div>
              {/* Header Badge */}
              <div className="flex items-center justify-between mb-3 border-b border-[var(--canvas-border)] pb-3">
                <div className="flex items-center gap-2">
                  <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                    <Terminal className="w-4 h-4" />
                  </div>
                  <div>
                    <h2 className="text-sm font-extrabold tracking-wide text-[var(--fg-primary)]">
                      NEW DIPR SCREENING BATTERY
                    </h2>
                    <span className="text-[9px] text-emerald-500 font-bold tracking-wider uppercase block">
                      Computerised Testing (CSSS + OPAM)
                    </span>
                  </div>
                </div>

                <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                  TRIAL BATCHES
                </span>
              </div>

              <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-5">
                The next-generation computerized selection battery developed by the Defence Institute of Psychological Research (DRDO), being rolled out at select SSB computer labs.
              </p>

              {/* Sub-Module 1: CSSS Cognitive Battery */}
              <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3 mb-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-[var(--fg-primary)]">
                      Battery 1: CSSS Cognitive Engine
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">
                    Cognitive Speed & Memory
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                  <p className="text-[var(--fg-secondary)]">
                    <strong className="text-[var(--fg-primary)]">What to Expect:</strong> Rapid computerised battery measuring working memory recall, selective attention, spatial box folding, and audio signal discrimination under strict 16–30s micro-timers with zero backtracking.
                  </p>
                  <p className="text-[var(--fg-muted)]">
                    <strong className="text-emerald-500">Assessor Motive:</strong> Assessors evaluate your cognitive processing speed, divided attention, and short-term retention fidelity required during high-tempo military operational tasks.
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    <span className="text-[var(--fg-muted)] block">CORE TESTING</span>
                    <span className="font-bold text-emerald-500">Memory, Spatial & Audio</span>
                  </div>
                  <div className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    <span className="text-[var(--fg-muted)] block">TEMPO RULE</span>
                    <span className="font-bold text-[var(--fg-primary)]">16-30s / Q Auto-Advance</span>
                  </div>
                </div>

                <Link
                  href="/screening/csss"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>Start CSSS Cognitive Trial</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              {/* Sub-Module 2: OPAM Psychometric Measure */}
              <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <Award className="w-4 h-4 text-emerald-500" />
                    <span className="text-xs font-bold text-[var(--fg-primary)]">
                      Battery 2: OPAM Psychometrics
                    </span>
                  </div>
                  <span className="text-[10px] font-mono text-emerald-500 font-bold">
                    15 OLQs & Temperament
                  </span>
                </div>

                <div className="space-y-1.5 text-[11px] font-sans leading-relaxed">
                  <p className="text-[var(--fg-secondary)]">
                    <strong className="text-[var(--fg-primary)]">What to Expect:</strong> Timed self-administered psychometric statements evaluating personal attitudes, work habits, social dynamics, and decision-making under stress.
                  </p>
                  <p className="text-[var(--fg-muted)]">
                    <strong className="text-emerald-500">Assessor Motive:</strong> Assessors evaluate your natural temperament across the 15 Officer Like Qualities (OLQs), testing for behavioural congruence, emotional resilience, and honesty through embedded consistency twin-pairs.
                  </p>
                </div>

                <div className="flex items-center gap-1.5 text-[10px] text-[var(--fg-muted)] flex-wrap">
                  <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    15 Factor OLQ Dimensions
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    Behavioural Authenticity
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    Consistency Twin-Pairing
                  </span>
                  <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                    Emotional Resilience
                  </span>
                </div>

                <Link
                  href="/screening/opam"
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--canvas-border)] hover:border-emerald-500 bg-[var(--canvas-surface)] text-[var(--fg-primary)] text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  <PlayCircle className="w-4 h-4 text-emerald-500" />
                  <span>Start OPAM Assessment</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </div>

            <div className="pt-2 text-[10px] text-[var(--fg-muted)] flex items-center justify-between border-t border-[var(--canvas-border)]">
              <span>Trial Protocol (Computer Labs at 1 AFSB, 24 SSB, etc.)</span>
              <span className="text-emerald-500 font-bold">In Active Development</span>
            </div>
          </div>

        </div>

      </main>
    </div>
  );
}