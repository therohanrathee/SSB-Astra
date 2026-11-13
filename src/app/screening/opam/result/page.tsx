"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  Award,
  Shield,
  ShieldCheck,
  ShieldAlert,
  Scale,
  RotateCcw,
  ArrowRight,
  CheckCircle2,
  AlertTriangle,
  Compass,
  HeartHandshake,
  Sparkles,
  ChevronDown,
  ChevronUp,
  Filter,
  Eye,
  Info,
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import {
  OpamTestResult,
  OpamQuestion,
  OlqKey,
  OlqFactor,
  OLQ_DEFINITIONS,
  getOpamSetById,
  opamSet1,
} from "@/data/opam";

function OpamResultContent() {
  const searchParams = useSearchParams();
  const setId = searchParams.get("set") || "opam-set-1";

  const [result, setResult] = useState<OpamTestResult | null>(null);
  const [filterFactor, setFilterFactor] = useState<"all" | OlqFactor | "lie">("all");
  const [expandedId, setExpandedId] = useState<string | null>(null);

  const currentSet = useMemo(() => {
    return getOpamSetById(setId) || opamSet1;
  }, [setId]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ssb_opam_latest_result");
      if (raw) {
        const parsed = JSON.parse(raw) as OpamTestResult;
        setResult(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  const questionsMap = useMemo(() => {
    const map = new Map<string, OpamQuestion>();
    currentSet.questions.forEach((q) => map.set(q.id, q));
    return map;
  }, [currentSet]);

  const filteredRecords = useMemo(() => {
    if (!result) return [];
    return result.records.filter((rec) => {
      const q = questionsMap.get(rec.questionId);
      if (!q) return false;

      if (filterFactor === "lie") return q.isLieScale;
      if (filterFactor !== "all") return q.factor === filterFactor;
      return true;
    });
  }, [result, filterFactor, questionsMap]);

  if (!result) {
    return (
      <div className="min-h-screen bg-military-grid flex flex-col items-center justify-center p-6 text-center font-mono space-y-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
          <CrossedSwords className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-[var(--fg-primary)]">
          NO RECENT OPAM ASSESSMENT FOUND
        </h2>
        <p className="text-xs text-[var(--fg-secondary)] max-w-sm">
          Please complete an OPAM psychometric battery to generate your 15 OLQ radar diagnostics.
        </p>
        <Link
          href="/screening/opam"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          Go to OPAM Battery
        </Link>
      </div>
    );
  }

  const isRecommended = result.recommendationVerdict.includes("SCREEN-IN");
  const isBorderline = result.recommendationVerdict.includes("BORDERLINE");

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 bg-[var(--canvas-surface)]/90 backdrop-blur-md border-b border-[var(--canvas-border)] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <Link
            href="/screening/opam"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-emerald-500 transition-all shadow-sm"
          >
            <div className="w-7 h-7 rounded-md border border-emerald-500/50 bg-[var(--canvas-surface)] flex items-center justify-center">
              <CrossedSwords className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                OPAM<span className="text-emerald-500 font-semibold">REPORT</span>
              </span>
              <span className="text-[8px] sm:text-[9px] block text-[var(--fg-muted)] uppercase">
                {result.setName}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/screening/opam"
              className="px-3 py-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
            >
              All Sets
            </Link>
            <ThemeToggle compact />
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4 pb-20 w-full space-y-8 flex-1">
        {/* 1. HERO VERDICT & ASSESSOR OVERVIEW */}
        <div
          className={`p-6 sm:p-8 rounded-3xl border-2 bg-gradient-to-br from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] shadow-xl relative overflow-hidden ${
            isRecommended
              ? "border-emerald-500/40"
              : isBorderline
              ? "border-amber-500/40"
              : "border-red-500/40"
          }`}
        >
          <div className="relative z-10 space-y-4">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <span
                className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase border ${
                  isRecommended
                    ? "bg-emerald-500/15 text-emerald-500 border-emerald-500/30"
                    : isBorderline
                    ? "bg-amber-500/15 text-amber-500 border-amber-500/30"
                    : "bg-red-500/15 text-red-500 border-red-500/30"
                }`}
              >
                {isRecommended ? (
                  <ShieldCheck className="w-3.5 h-3.5" />
                ) : (
                  <ShieldAlert className="w-3.5 h-3.5" />
                )}
                <span>{result.recommendationVerdict}</span>
              </span>

              <span className="text-xs text-[var(--fg-muted)] font-mono">
                {result.attempted} of {result.totalItems} Items Evaluated • Avg {result.avgTimePerItemSec}s/item
              </span>
            </div>

            <h1 className="text-xl sm:text-3xl font-extrabold text-[var(--fg-primary)] tracking-tight">
              Psychological Suitability Profile
            </h1>

            <p className="text-xs sm:text-sm text-[var(--fg-secondary)] font-sans leading-relaxed max-w-4xl">
              {result.assessorOverview}
            </p>
          </div>
        </div>

        {/* 2. PSYCHOMETRIC INTEGRITY & TRAP METERS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Lie Scale Card */}
          <div className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--fg-muted)] uppercase">
                SOCIAL DESIRABILITY (LIE SCALE)
              </span>
              <Scale className="w-4 h-4 text-amber-500" />
            </div>

            <div className="flex items-baseline gap-2">
              <span
                className={`text-2xl font-black font-mono ${
                  result.lieScaleScore >= 50
                    ? "text-red-500"
                    : result.lieScaleScore >= 25
                    ? "text-amber-500"
                    : "text-emerald-500"
                }`}
              >
                {result.lieScaleScore}%
              </span>
              <span className="text-xs font-bold text-[var(--fg-primary)]">
                {result.lieScaleVerdict}
              </span>
            </div>

            <div className="w-full bg-[var(--canvas-border)] h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-700 ${
                  result.lieScaleScore >= 50
                    ? "bg-red-500"
                    : result.lieScaleScore >= 25
                    ? "bg-amber-500"
                    : "bg-emerald-500"
                }`}
                style={{ width: `${result.lieScaleScore}%` }}
              />
            </div>

            <p className="text-[11px] text-[var(--fg-muted)] font-sans leading-relaxed">
              {result.lieScaleScore < 25
                ? "Excellent: Candidate avoided the Saint Traps and answered with realistic human vulnerability."
                : "Alert: Excessive saintly claims detected. DIPR assessors look for authentic self-awareness rather than manufactured perfection."}
            </p>
          </div>

          {/* Consistency Card */}
          <div className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--fg-muted)] uppercase">
                TWIN PAIR CONSISTENCY
              </span>
              <Sparkles className="w-4 h-4 text-emerald-500" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-emerald-500">
                {result.consistencyScore}%
              </span>
              <span className="text-xs font-bold text-[var(--fg-primary)]">
                {result.consistencyVerdict}
              </span>
            </div>

            <div className="w-full bg-[var(--canvas-border)] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-emerald-500 rounded-full transition-all duration-700"
                style={{ width: `${result.consistencyScore}%` }}
              />
            </div>

            <p className="text-[11px] text-[var(--fg-muted)] font-sans leading-relaxed">
              Measures variance across paired cross-validation twin items asked across different points of the test.
            </p>
          </div>

          {/* Decision Speed Index */}
          <div className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3 shadow-sm">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[var(--fg-muted)] uppercase">
                INSTINCT TEMPO INDEX
              </span>
              <Award className="w-4 h-4 text-cyan-500" />
            </div>

            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-black font-mono text-[var(--fg-primary)]">
                {result.avgTimePerItemSec}s
              </span>
              <span className="text-xs font-bold text-emerald-500">
                Optimal Tempo
              </span>
            </div>

            <div className="w-full bg-[var(--canvas-border)] h-2 rounded-full overflow-hidden">
              <div
                className="h-full bg-cyan-500 rounded-full transition-all duration-700"
                style={{ width: `${Math.min(100, (result.avgTimePerItemSec / 20) * 100)}%` }}
              />
            </div>

            <p className="text-[11px] text-[var(--fg-muted)] font-sans leading-relaxed">
              Standard target is 12-18s per item. Rapid instinct indicates genuine reaction rather than calculated personas.
            </p>
          </div>
        </div>

        {/* 3. THE 4 CLASSICAL FACTORS PERFORMANCE CARDS */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)]">
            THE 4 ASSESSMENT PILLARS (DIPR FACTOR I TO IV)
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {(
              [
                { key: "factor_1" as OlqFactor, icon: Compass },
                { key: "factor_2" as OlqFactor, icon: HeartHandshake },
                { key: "factor_3" as OlqFactor, icon: Sparkles },
                { key: "factor_4" as OlqFactor, icon: Shield },
              ] as const
            ).map((fac) => {
              const data = result.factorScores[fac.key];
              const Icon = fac.icon;
              return (
                <div
                  key={fac.key}
                  className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3 shadow-sm flex flex-col justify-between"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-lg font-black font-mono text-[var(--fg-primary)]">
                        {data?.score ?? 0}%
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[var(--fg-primary)] leading-tight">
                        {data?.name}
                      </h3>
                      <span className="text-[10px] font-bold text-emerald-500 block mt-1 uppercase">
                        {data?.grade}
                      </span>
                    </div>
                  </div>

                  <div className="w-full bg-[var(--canvas-border)] h-1.5 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full"
                      style={{ width: `${data?.score ?? 0}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 4. ALL 15 OFFICER-LIKE QUALITIES (OLQ) MATRIX */}
        <div className="space-y-4 p-6 rounded-3xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-md">
          <div className="flex items-center justify-between flex-wrap gap-2 border-b border-[var(--canvas-border)] pb-3">
            <div>
              <h2 className="text-base font-extrabold text-[var(--fg-primary)] tracking-wide">
                15 OFFICER-LIKE QUALITIES (OLQ) RADAR AUDIT
              </h2>
              <p className="text-xs text-[var(--fg-secondary)] font-sans">
                Granular score breakdown across the 15 qualities evaluated across the 5-day SSB interview.
              </p>
            </div>
            <span className="text-xs font-bold px-2.5 py-1 rounded bg-[var(--canvas-surface-subtle)] text-emerald-500 border border-[var(--canvas-border)]">
              15 Qualities
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {(Object.keys(OLQ_DEFINITIONS) as OlqKey[]).map((olqKey) => {
              const meta = OLQ_DEFINITIONS[olqKey];
              const scoreData = result.olqScores[olqKey];
              const score = scoreData?.score ?? 60;
              const grade = scoreData?.grade ?? "Above Average";

              return (
                <div
                  key={olqKey}
                  className="p-3.5 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-2 flex flex-col justify-between"
                >
                  <div className="space-y-1">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--fg-primary)]">
                        {meta.name}
                      </span>
                      <span className="text-xs font-mono font-bold text-emerald-500">
                        {score}%
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--fg-muted)] font-sans block leading-tight">
                      {meta.description}
                    </span>
                  </div>

                  <div className="pt-2 border-t border-[var(--canvas-border)]/60 flex items-center justify-between text-[10px]">
                    <span className="text-[var(--fg-muted)] font-mono">{meta.factorName.split(":")[0]}</span>
                    <span
                      className={`font-bold ${
                        grade === "Outstanding"
                          ? "text-emerald-400"
                          : grade === "High"
                          ? "text-emerald-500"
                          : grade === "Above Average"
                          ? "text-cyan-400"
                          : "text-amber-400"
                      }`}
                    >
                      {grade}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 5. QUESTION-BY-QUESTION AUDIT & PSYCHOLOGIST NOTES */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--canvas-border)] pb-3">
            <div>
              <h2 className="text-base font-extrabold text-[var(--fg-primary)] tracking-wide">
                ITEM-BY-ITEM PSYCHOLOGICAL AUDIT
              </h2>
              <p className="text-xs text-[var(--fg-secondary)] font-sans">
                Review your responses alongside DIPR psychologist insights and behavioral projections.
              </p>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <button
                onClick={() => setFilterFactor("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterFactor === "all"
                    ? "bg-[var(--fg-primary)] text-[var(--canvas-bg)]"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--fg-secondary)]"
                }`}
              >
                All ({result.records.length})
              </button>
              <button
                onClick={() => setFilterFactor("factor_1")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterFactor === "factor_1"
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500"
                }`}
              >
                Factor I
              </button>
              <button
                onClick={() => setFilterFactor("factor_2")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterFactor === "factor_2"
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500"
                }`}
              >
                Factor II
              </button>
              <button
                onClick={() => setFilterFactor("factor_3")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterFactor === "factor_3"
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500"
                }`}
              >
                Factor III
              </button>
              <button
                onClick={() => setFilterFactor("factor_4")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterFactor === "factor_4"
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500"
                }`}
              >
                Factor IV
              </button>
              <button
                onClick={() => setFilterFactor("lie")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterFactor === "lie"
                    ? "bg-amber-600 text-white"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-amber-500"
                }`}
              >
                Lie Traps
              </button>
            </div>
          </div>

          <div className="space-y-4">
            {filteredRecords.map((rec) => {
              const q = questionsMap.get(rec.questionId);
              if (!q) return null;

              const isExpanded = expandedId === q.id;
              const olqMeta = OLQ_DEFINITIONS[q.primaryOlq];

              // Label response
              let responseLabel = "";
              if (q.type === "likert") {
                const labels = ["Strongly Disagree", "Disagree", "Neutral", "Agree", "Strongly Agree"];
                responseLabel = labels[rec.selectedValue - 1] || `Rating ${rec.selectedValue}`;
              } else if (q.type === "forced_choice" && q.options) {
                responseLabel = q.options[rec.selectedOptionIndex ?? 0]?.text || "Selected Option";
              } else if (q.type === "scenario" && q.options) {
                responseLabel = q.options[rec.selectedOptionIndex ?? 0]?.text || "Selected Action";
              }

              return (
                <div
                  key={q.id}
                  className={`p-5 rounded-2xl border-2 transition-all bg-[var(--canvas-surface)] ${
                    q.isLieScale
                      ? "border-amber-500/30"
                      : "border-[var(--canvas-border)]"
                  }`}
                >
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                        {q.id}
                      </span>
                      <span className="text-xs font-bold text-emerald-500 uppercase">
                        {olqMeta?.name || q.primaryOlq}
                      </span>
                      {q.isLieScale && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          LIE SCALE TRAP
                        </span>
                      )}
                      {q.consistencyPairId && (
                        <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-cyan-500/15 text-cyan-500 border border-cyan-500/30">
                          TWIN PAIR
                        </span>
                      )}
                    </div>

                    <span className="text-[11px] text-[var(--fg-muted)] font-mono">
                      Latency: {rec.timeSpentSec}s
                    </span>
                  </div>

                  <p className="text-xs sm:text-sm font-bold text-[var(--fg-primary)] font-sans leading-relaxed mb-3">
                    "{q.prompt}"
                  </p>

                  <div className="p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex items-center justify-between flex-wrap gap-2 text-xs mb-3">
                    <span className="text-[var(--fg-muted)] font-mono">
                      CANDIDATE RESPONSE:
                    </span>
                    <span className="font-bold text-emerald-400 font-sans">
                      {responseLabel}
                    </span>
                  </div>

                  {/* Assessor Insight */}
                  <div className="p-3.5 rounded-xl bg-[var(--canvas-surface-subtle)] border-l-4 border-emerald-500 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-500 font-mono block">
                      DIPR PSYCHOLOGIST INSIGHT:
                    </span>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                      {q.assessorInsight}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Actions */}
        <div className="pt-6 border-t border-[var(--canvas-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/screening/opam"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[var(--canvas-border)] hover:border-emerald-500 text-xs font-bold text-[var(--fg-primary)] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake / Choose Another Set</span>
          </Link>

          <Link
            href="/screening"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <span>RETURN TO SCREENING HQ</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function OpamResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-military-grid flex items-center justify-center text-emerald-500 font-mono text-sm">
          GENERATING OPAM 15-OLQ DIAGNOSTICS...
        </div>
      }
    >
      <OpamResultContent />
    </Suspense>
  );
}
