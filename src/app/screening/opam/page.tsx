"use client";

import React from "react";
import Link from "next/link";
import {
  Award,
  Shield,
  ShieldAlert,
  PlayCircle,
  ArrowRight,
  Scale,
  Sparkles,
  Layers,
  HeartHandshake,
  Compass,
  AlertTriangle,
  CheckCircle2,
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import { opamSets } from "@/data/opam";

export default function OpamHubPage() {
  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <Link
            href="/screening"
            className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/85 backdrop-blur-md hover:border-emerald-500 transition-all shadow-sm"
          >
            <div className="w-7 h-7 rounded-md border border-emerald-500/50 bg-[var(--canvas-surface)] flex items-center justify-center shadow-sm">
              <CrossedSwords className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                OPAM<span className="text-emerald-500 font-semibold">PSYCHOMETRIC</span>
              </span>
              <span className="text-[8px] sm:text-[9px] block text-[var(--fg-muted)] leading-none uppercase">
                15-FACTOR OLQ BATTERY
              </span>
            </div>
          </Link>

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
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/30 bg-gradient-to-br from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] relative overflow-hidden shadow-lg">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 space-y-4 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-mono font-bold tracking-wider uppercase bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
              <Award className="w-3.5 h-3.5" />
              <span>DIPR OBJECTIVE PERSONALITY ASSESSMENT MEASURE</span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-extrabold tracking-tight text-[var(--fg-primary)]">
              OPAM Psychometric Battery
            </h1>

            <p className="text-xs sm:text-sm text-[var(--fg-secondary)] font-sans leading-relaxed">
              <strong>OPAM (Objective Personality Assessment Measure)</strong> is the standardized psychometric component of the new computerized Stage-1 screening battery formulated by <strong>DIPR (DRDO)</strong>. It maps a candidate's inherent behavioral tendencies directly against the <strong>15 Officer-Like Qualities (OLQs)</strong> across 4 classical assessment factors, equipped with sophisticated <strong>Lie-Scale (Social Desirability)</strong> filters and paired consistency tracking.
            </p>

            <div className="flex items-center gap-3 pt-2 flex-wrap text-[11px] font-mono">
              <span className="px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500 font-bold">
                🎯 15 OLQ Radar Mapping
              </span>
              <span className="px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-amber-500 font-bold">
                ⚖️ Built-in Lie Scale Traps
              </span>
              <span className="px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-cyan-500 font-bold">
                🔄 Cross-Validation Twins
              </span>
            </div>
          </div>
        </div>

        {/* DIPR Psychometric Traps & "Avoid Faking" Advisory */}
        <div className="p-5 sm:p-6 rounded-2xl border border-[var(--gold-accent)]/30 bg-[var(--canvas-surface)] space-y-4 shadow-sm">
          <div className="flex items-center gap-3 border-b border-[var(--canvas-border)] pb-3">
            <div className="w-9 h-9 rounded-xl bg-[var(--gold-accent)]/15 border border-[var(--gold-accent)]/30 flex items-center justify-center text-[var(--gold-accent)]">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-sm sm:text-base font-bold text-[var(--fg-primary)]">
                Understanding DIPR Psychometric Validity Traps
              </h2>
              <span className="text-xs text-[var(--fg-muted)] font-sans">
                How computerized assessment catches coached and artificial responses
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-xs font-sans">
            <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-2">
              <span className="font-bold text-amber-500 font-mono text-[11px] block">
                1. THE "SAINT SCALE" (LIE TRAP)
              </span>
              <p className="text-[var(--fg-secondary)] leading-relaxed">
                Items asserting absolute perfection (e.g. <em>"I have never spoken a white lie"</em> or <em>"I never get angry"</em>). Candidates who select <strong>Strongly Agree</strong> to look like an unblemished hero trigger high Social Desirability flags, diminishing credibility.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-2">
              <span className="font-bold text-emerald-500 font-mono text-[11px] block">
                2. CROSS-VALIDATION TWIN PAIRS
              </span>
              <p className="text-[var(--fg-secondary)] leading-relaxed">
                The same underlying trait is tested twice separated by 15-20 questions—once positively framed and once negatively/reverse framed. Large discrepancies flag inconsistent or calculating answers under time pressure.
              </p>
            </div>

            <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-2">
              <span className="font-bold text-cyan-500 font-mono text-[11px] block">
                3. FORCED-CHOICE DILEMMAS
              </span>
              <p className="text-[var(--fg-secondary)] leading-relaxed">
                Pits two positive officer behaviors against each other (e.g. Exhaustive Planning vs Swift Forward Momentum). Prevents candidates from giving uniformly high scores across the board and reveals authentic operating style.
              </p>
            </div>
          </div>
        </div>

        {/* 4 Assessment Factors Overview */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)]">
            THE 4 CLASSICAL OLQ FACTORS EVALUATED
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              {
                title: "Factor I: Planning & Organizing",
                olqs: "Effective Intelligence, Reasoning, Organizing Ability, Power of Expression",
                badge: "Intellect & Logic",
                icon: Compass,
              },
              {
                title: "Factor II: Social Adjustment",
                olqs: "Social Adaptability, Cooperation, Sense of Responsibility",
                badge: "Team & Troop Welfare",
                icon: HeartHandshake,
              },
              {
                title: "Factor III: Social Effectiveness",
                olqs: "Initiative, Self-Confidence, Decision Speed, Group Influence, Liveliness",
                badge: "Leadership & Impact",
                icon: Sparkles,
              },
              {
                title: "Factor IV: Dynamic",
                olqs: "Determination, Courage, Stamina",
                badge: "Grit & Courage",
                icon: Shield,
              },
            ].map((fac, idx) => {
              const Icon = fac.icon;
              return (
                <div
                  key={idx}
                  className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500">
                        {fac.badge}
                      </span>
                    </div>

                    <h3 className="text-xs font-bold text-[var(--fg-primary)] leading-tight">
                      {fac.title}
                    </h3>

                    <p className="text-[11px] text-[var(--fg-secondary)] font-sans leading-relaxed">
                      {fac.olqs}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3 Distinct OPAM Test Sets */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base sm:text-lg font-extrabold text-[var(--fg-primary)] tracking-wide">
                SELECT OPAM PSYCHOMETRIC SET
              </h2>
              <p className="text-xs text-[var(--fg-secondary)] font-sans">
                Each set is calibrated to test all 15 OLQs with authentic trap mechanisms.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500">
              3 Sets Available
            </span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {opamSets.map((set) => (
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
                      <span className="text-[var(--fg-muted)] block">TOTAL ITEMS</span>
                      <span className="font-bold text-[var(--fg-primary)]">
                        {set.totalItems} Items
                      </span>
                    </div>
                    <div className="p-2 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                      <span className="text-[var(--fg-muted)] block">FORMAT</span>
                      <span className="font-bold text-emerald-500">
                        Likert & Dilemmas
                      </span>
                    </div>
                  </div>

                  <div className="space-y-1.5 text-[11px] font-sans text-[var(--fg-secondary)] border-t border-[var(--canvas-border)] pt-3">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Maps all 15 Officer-Like Qualities</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Social Desirability (Lie Scale) verification</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                      <span>Cross-validation paired twin checks</span>
                    </div>
                  </div>
                </div>

                <Link
                  href={`/screening/opam/test?set=${set.id}`}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 group-hover:shadow-emerald-500/20"
                >
                  <PlayCircle className="w-4 h-4" />
                  <span>START {set.code} ASSESSMENT</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}
