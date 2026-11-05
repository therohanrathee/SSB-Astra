"use client";

import React from "react";
import { Terminal, Crosshair, Headphones } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-3.75rem)] mt-15 flex items-center py-6 sm:py-8 lg:py-0 overflow-hidden">
      {/* Background Ambience / Cockpit HUD Gradients */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[var(--primary-glow)] rounded-full blur-[140px] pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 items-center">
          
          {/* Left Column: Headlines & High-Value Pitch */}
          <div className="lg:col-span-7 space-y-4">
            
            {/* Mission Identifier Badge */}
            <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-full border border-[var(--service-badge-border)] bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] text-[11px] font-mono tracking-wider font-semibold">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              TRI-SERVICES OFFICER PREPARATION PLATFORM
            </div>

            {/* Main Headline */}
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold tracking-tight leading-[1.15] text-[var(--fg-primary)]">
              Master the New{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--primary-accent)] to-[var(--gold-accent)]">
                SSB Computerised Screening
              </span>{" "}
              Process.
            </h1>

            {/* Sub-headline */}
            <p className="text-xs sm:text-sm lg:text-base text-[var(--fg-secondary)] max-w-2xl leading-relaxed">
              The Indian Armed Forces are modernizing Stage-1 screening: moving away from subjective 
              fish-market group discussions to the <strong className="text-[var(--fg-primary)]">CSSS cognitive battery</strong> (~70 timed items) and the <strong className="text-[var(--fg-primary)]">OPAM psychometric profile</strong> (~120 questions). Train on the exact terminal interface before reporting to your board.
            </p>

            {/* Key Terminal Feature Bullets */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 font-mono text-[11px] text-[var(--fg-secondary)]">
              <div className="flex items-center gap-2 p-1.5 px-2.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
                <Terminal className="w-3.5 h-3.5 text-[var(--primary-accent)] shrink-0" />
                <span>16-30s Micro-Timers</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 px-2.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface)]">
                <Headphones className="w-3.5 h-3.5 text-[var(--primary-accent)] shrink-0" />
                <span>Audio Discrimination</span>
              </div>
              <div className="flex items-center gap-2 p-1.5 px-2.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface)] col-span-2 sm:col-span-1">
                <Crosshair className="w-3.5 h-3.5 text-[var(--gold-accent)] shrink-0" />
                <span>Lie-Scale & OLQ Radar</span>
              </div>
            </div>

            {/* CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 pt-1">
              <a
                href="#journey"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wider text-white bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] transition-all shadow-md hover:shadow-[0_0_15px_var(--primary-glow)] active:scale-95"
              >
                <span>Walkthrough Journey</span>
                <span className="text-xs">↓</span>
              </a>

              <a
                href="#subtests"
                className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded font-mono text-xs font-bold uppercase tracking-wider border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--fg-primary)] hover:border-[var(--primary-accent)] transition-all active:scale-95"
              >
                <span>Inspect Subtests</span>
              </a>
            </div>

            {/* Social Trust / Aspirant Focus */}
            <div className="pt-2 flex flex-wrap items-center gap-2.5 sm:gap-3 text-[11px] text-[var(--fg-muted)]">
              <div className="flex items-center gap-1.5 font-mono text-[10px]">
                <span className="px-2 py-0.5 rounded bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/25 font-bold shadow-xs">
                  NDA
                </span>
                <span className="px-2 py-0.5 rounded bg-sky-500/10 text-sky-600 dark:text-sky-400 border border-sky-500/25 font-bold shadow-xs">
                  CDS
                </span>
                <span className="px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/25 font-bold shadow-xs">
                  AFCAT
                </span>
                <span className="px-2 py-0.5 rounded bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25 font-bold shadow-xs">
                  TGC / TES
                </span>
              </div>
              <span className="text-[11px] font-sans">
                Engineered for all Armed Forces commissioning entries
              </span>
            </div>

          </div>

          {/* Right Column: Live Military Terminal Simulation Card */}
          <div className="lg:col-span-5 relative mt-4 lg:mt-0">
            {/* Terminal Window Frame */}
            <div className="hud-corner rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-xl p-3.5 sm:p-4 font-mono">
              
              {/* Header Status Bar */}
              <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-2 mb-2.5">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                  <span className="text-[11px] font-bold tracking-widest text-[var(--fg-primary)]">
                    CSSS TERMINAL #04
                  </span>
                </div>
                <div className="text-[10px] px-1.5 py-0.5 rounded bg-rose-500/10 text-rose-500 border border-rose-500/20 font-bold">
                  MICRO-TIMER: 00:19s
                </div>
              </div>

              {/* Subtest Information Banner */}
              <div className="bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border-subtle)] rounded p-2 mb-2.5">
                <div className="flex items-center justify-between text-[10px] text-[var(--fg-muted)] mb-0.5">
                  <span>SUBTEST 03 OF 06</span>
                  <span className="text-[var(--primary-accent)] font-semibold">SPACE & FORM PERCEPTION</span>
                </div>
                <div className="text-[11px] text-[var(--fg-primary)] font-sans font-medium leading-tight">
                  Select the 3D folded cube that corresponds to the unfolded net:
                </div>
              </div>

              {/* Graphical Simulated Test Visual */}
              <div className="h-28 rounded border border-dashed border-[var(--canvas-border)] bg-[var(--canvas-bg)] flex items-center justify-center relative overflow-hidden mb-2.5">
                <div className="absolute inset-0 bg-military-grid opacity-40" />
                <div className="relative z-10 text-center space-y-1">
                  {/* Geometric Cube SVG */}
                  <svg className="w-12 h-12 mx-auto text-[var(--primary-accent)] animate-pulse" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
                    <polyline points="3.27 6.96 12 12.01 20.73 6.96" />
                    <line x1="12" y1="22.08" x2="12" y2="12" />
                  </svg>
                  <span className="text-[9px] text-[var(--fg-muted)] uppercase tracking-wider block">
                    Target Pattern: Orthogonal Folding Net
                  </span>
                </div>
              </div>

              {/* Simulated Options */}
              <div className="grid grid-cols-2 gap-1.5 mb-2.5">
                {["A. Isometric Rotated 45°", "B. Inverted Face Variant", "C. Matched Projection", "D. None of the above"].map((opt, i) => (
                  <button
                    key={i}
                    className={`text-left text-[10px] p-2 rounded border transition-colors leading-tight ${
                      i === 2
                        ? "border-[var(--primary-accent)] bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] font-bold"
                        : "border-[var(--canvas-border)] text-[var(--fg-secondary)] hover:border-[var(--primary-accent)]/50"
                    }`}
                  >
                    {opt}
                  </button>
                ))}
              </div>

              {/* Progress & Rules Warning */}
              <div className="flex items-center justify-between text-[9px] text-[var(--fg-muted)] border-t border-[var(--canvas-border)] pt-2">
                <span className="flex items-center gap-1 text-amber-500 font-semibold">
                  <span>⚠</span> No Backtracking Allowed
                </span>
                <span>Question 24/70</span>
              </div>

            </div>

            {/* Floating Accreditations / Trait Radar Badge */}
            <div className="absolute -bottom-4 -left-3 hidden sm:flex items-center gap-2.5 p-2 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-lg text-xs font-mono">
              <div className="w-6 h-6 rounded bg-lime-500/10 border border-lime-500/20 text-lime-500 flex items-center justify-center font-bold text-[11px]">
                15
              </div>
              <div>
                <div className="font-bold text-[var(--fg-primary)] text-[11px] leading-tight">OLQ Psychometric Map</div>
                <div className="text-[9px] text-[var(--fg-muted)]">Real-time Factor I-IV Scoring</div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
