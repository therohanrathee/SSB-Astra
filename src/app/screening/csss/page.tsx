"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Brain,
  Headphones,
  Box,
  Zap,
  ArrowRight,
  ShieldAlert,
  PlayCircle,
  Volume2,
  Clock,
  CheckCircle2,
  AlertTriangle,
  ChevronRight,
  Layers,
  Sparkles,
  HelpCircle,
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import { csssSets } from "@/data/csss";
import { csssAudio } from "@/lib/csssAudioEngine";

export default function CsssHubPage() {
  const [isPlayingCalibration, setIsPlayingCalibration] = useState(false);
  const [calibrated, setCalibrated] = useState(false);

  const handlePlayCalibration = () => {
    setIsPlayingCalibration(true);
    csssAudio.playCalibrationChime(() => {
      setIsPlayingCalibration(false);
      setCalibrated(true);
    });
  };

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
      {/* Top Floating Action Pill Header */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Brand / Home Link */}
          <Link
            href="/screening"
            className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/85 backdrop-blur-md hover:border-emerald-500 transition-all shadow-sm group"
          >
            <div className="w-7 h-7 rounded-md border border-emerald-500/50 bg-[var(--canvas-surface)] flex items-center justify-center shadow-sm">
              <CrossedSwords className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                CSSS<span className="text-emerald-500 font-semibold">COGNITIVE</span>
              </span>
              <span className="text-[8px] sm:text-[9px] block text-[var(--fg-muted)] leading-none uppercase">
                DIPR COMPUTERISED BATTERY
              </span>
            </div>
          </Link>

          {/* Navigation Shortcuts */}
          <div className="pointer-events-auto flex items-center gap-2">
            <Link
              href="/screening"
              className="px-3 py-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all"
            >
              Screening Hub
            </Link>
            <ThemeToggle compact />
          </div>
        </div>
      </header>

      {/* Main Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-16 w-full space-y-8 flex-1">
        {/* Hero Briefing Card */}
        <div className="p-6 sm:p-8 rounded-2xl border-2 border-emerald-500/30 bg-gradient-to-br from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
              <Zap className="w-3.5 h-3.5" />
              <span>DIPR STAGE-1 DE NOVO SELECTION SYSTEM</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--fg-primary)]">
              CSSS Cognitive Trial Battery
            </h1>

            <p className="text-xs sm:text-sm text-[var(--fg-secondary)] font-sans leading-relaxed">
              The <strong>Computerised Stage-1 Selection System (CSSS)</strong> replaces traditional paper-based intelligence booklets with rapid-fire, computerized neuro-cognitive trials. Each item features a strict <strong>16 to 30-second micro-timer with ZERO backtracking</strong>. Evaluates raw neuro-cognitive speed, spatial 3D rotation, auditory frequency acuity, working memory under interference, and linguistic precision.
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500 font-bold">
                ⏱️ Per-Q Micro-Timers
              </span>
              <span className="px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-amber-500 font-bold">
                🚫 Zero Backtracking
              </span>
              <span className="px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-cyan-500 font-bold">
                🎧 Headphone Audio Required
              </span>
            </div>
          </div>
        </div>

        {/* Headphone Audio Calibration Console */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-4 shadow-sm">
          <div className="flex items-center justify-between flex-wrap gap-3 border-b border-[var(--canvas-border)] pb-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center justify-center">
                <Headphones className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-sm sm:text-base font-bold text-[var(--fg-primary)]">
                  Headphone & Audio Calibration Terminal
                </h2>
                <p className="text-xs text-[var(--fg-secondary)] font-sans">
                  The CSSS battery includes live acoustic frequency discrimination. Plug in your headphones and verify clarity.
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              {calibrated ? (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>Audio Calibrated</span>
                </span>
              ) : (
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Calibration Recommended</span>
                </span>
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
            <div className="text-xs text-[var(--fg-secondary)] font-sans space-y-1">
              <span className="font-bold text-[var(--fg-primary)] block font-mono text-[11px]">
                ACOUSTIC FREQUENCY CHECK (C5 ➔ E5 ➔ G5)
              </span>
              <span>
                Plays an ascending multi-frequency synthesizer chime. Confirm you can clearly distinguish the tone progression.
              </span>
            </div>

            <button
              onClick={handlePlayCalibration}
              disabled={isPlayingCalibration}
              className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-sm active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
            >
              <Volume2 className={`w-4 h-4 ${isPlayingCalibration ? "animate-pulse text-amber-300" : ""}`} />
              <span>{isPlayingCalibration ? "Playing Chime..." : "Test Audio Output"}</span>
            </button>
          </div>
        </div>

        {/* 5 Core Subtests Matrix Preview */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)]">
              CSSS 5-Subtest Architecture
            </h2>
            <span className="text-[10px] text-emerald-500 font-bold">DIPR Standard</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                title: "1. Auditory Discrimination",
                desc: "Pitch pair shifts, pip counts, & tactical radio callsigns",
                timer: "18-22s / Q",
                icon: Headphones,
              },
              {
                title: "2. Space & Form Perception",
                desc: "Unfolded cube nets, 3D cuts, and spatial reflections",
                timer: "22-28s / Q",
                icon: Box,
              },
              {
                title: "3. Working Memory",
                desc: "4s matrix flash with mental rotation and arithmetic recall",
                timer: "18-22s / Q",
                icon: Brain,
              },
              {
                title: "4. Perceptual Speed",
                desc: "Rapid coordinate searches, pattern cancellations, and outliers",
                timer: "16-20s / Q",
                icon: Zap,
              },
              {
                title: "5. Linguistic Reasoning",
                desc: "Tactical analogies, military ciphers, and fast syllogisms",
                timer: "16-22s / Q",
                icon: Layers,
              },
            ].map((sub, idx) => {
              const Icon = sub.icon;
              return (
                <div
                  key={idx}
                  className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1.5">
                    <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                      <Icon className="w-4 h-4" />
                    </div>
                    <h3 className="text-xs font-bold text-[var(--fg-primary)] leading-tight">
                      {sub.title}
                    </h3>
                    <p className="text-[11px] text-[var(--fg-secondary)] font-sans leading-relaxed">
                      {sub.desc}
                    </p>
                  </div>
                  <div className="pt-2 border-t border-[var(--canvas-border)] text-[10px] font-mono text-emerald-500 font-bold">
                    ⏱️ {sub.timer}
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Distinct Test Sets Selector */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[var(--fg-primary)] tracking-wide">
                SELECT CSSS COGNITIVE TEST BATTERY
              </h2>
              <p className="text-xs text-[var(--fg-secondary)] font-sans">
                Each set is a complete, modular, verified battery featuring balanced subtests.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500">
              3 Sets Available
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {csssSets.map((set, i) => (
              <div
                key={set.id}
                className="p-6 rounded-2xl border-2 border-[var(--canvas-border)] hover:border-emerald-500 bg-[var(--canvas-surface)] flex flex-col justify-between shadow-md transition-all group space-y-6"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3">
                    <span className="text-[10px] font-bold px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                      {set.code}
                    </span>
                    <span className="text-xs font-mono text-[var(--fg-muted)]">
                      ~{set.estimatedTimeMin} mins
                    </span>
                  </div>

                  <div>
                    <h3 className="text-lg font-bold text-[var(--fg-primary)] group-hover:text-emerald-500 transition-colors">
                      {set.name}
                    </h3>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mt-1.5">
                      {set.description}
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                    <div className="p-2 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                      <span className="text-[var(--fg-muted)] block">QUESTIONS</span>
                      <span className="font-bold text-[var(--fg-primary)]">
                        {set.totalQuestions} Questions
                      </span>
                    </div>
                    <div className="p-2 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                      <span className="text-[var(--fg-muted)] block">TIMING RULE</span>
                      <span className="font-bold text-emerald-500">
                        16-30s / Q Auto
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1 text-[11px] font-sans text-[var(--fg-muted)]">
                    <div className="flex items-center justify-between">
                      <span>• Auditory Discrimination</span>
                      <span className="font-mono text-xs">{set.subtestCounts.auditory} Qs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Space & Form Perception</span>
                      <span className="font-mono text-xs">{set.subtestCounts.spatial} Qs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Working Memory & Attention</span>
                      <span className="font-mono text-xs">{set.subtestCounts.memory} Qs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Perceptual Speed & Search</span>
                      <span className="font-mono text-xs">{set.subtestCounts.perceptual} Qs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Linguistic Reasoning</span>
                      <span className="font-mono text-xs">{set.subtestCounts.linguistic} Qs</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/screening/csss/test?set=${set.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 group-hover:shadow-emerald-500/20"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>LAUNCH {set.code} BATTERY</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>

        {/* Tactical Rules & Instructions Banner */}
        <div className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3">
          <div className="flex items-center gap-2 text-xs font-bold text-amber-500 uppercase tracking-wider">
            <AlertTriangle className="w-4 h-4" />
            <span>CRITICAL DIPR TEST RULES</span>
          </div>
          <ul className="text-xs text-[var(--fg-secondary)] font-sans space-y-2 list-disc pl-5 leading-relaxed">
            <li>
              <strong>Individual Micro-Timers:</strong> Questions do not share a common time pool. When the countdown indicator reaches <code className="text-amber-500">00:00</code>, your answer is locked and the system auto-advances.
            </li>
            <li>
              <strong>One-Way Navigation:</strong> In accordance with authentic DIPR testing protocols, there is <strong>NO Back Button</strong>. Once you advance, you cannot revisit previous items.
            </li>
            <li>
              <strong>Zero Negative Marking:</strong> Attempt every single item. If unsure, mark your best instinctive deduction before the timer expires.
            </li>
            <li>
              <strong>Detailed Solutions & Analysis:</strong> Full cognitive solutions, accuracy diagnostics, speed index, and OIR rating are rendered immediately upon submission.
            </li>
          </ul>
        </div>
      </main>
    </div>
  );
}
