"use client";

import React, { useState, useEffect, useMemo, Suspense } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {
  CheckCircle2,
  XCircle,
  Clock,
  AlertTriangle,
  RotateCcw,
  ArrowRight,
  Headphones,
  Box,
  Brain,
  Zap,
  Layers,
  Award,
  Sparkles,
  Volume2,
  ChevronDown,
  ChevronUp,
  Filter,
  Eye,
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import {
  CsssTestResult,
  CsssQuestion,
  CsssSubtest,
  CsssAttemptRecord,
  getCsssSetById,
  csssSet1,
} from "@/data/csss";
import { csssAudio } from "@/lib/csssAudioEngine";

function CsssResultContent() {
  const searchParams = useSearchParams();
  const setId = searchParams.get("set") || "csss-set-1";

  const [result, setResult] = useState<CsssTestResult | null>(null);
  const [filterStatus, setFilterStatus] = useState<"all" | "correct" | "incorrect" | "timedOut">("all");
  const [filterSubtest, setFilterSubtest] = useState<"all" | CsssSubtest>("all");
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(null);

  const currentSet = useMemo(() => {
    return getCsssSetById(setId) || csssSet1;
  }, [setId]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem("ssb_csss_latest_result");
      if (raw) {
        const parsed = JSON.parse(raw) as CsssTestResult;
        // Ensure unique records per questionId to prevent any duplicate keys
        if (parsed && Array.isArray(parsed.records)) {
          const uniqueMap = new Map<string, CsssAttemptRecord>();
          parsed.records.forEach((r) => uniqueMap.set(r.questionId, r));
          parsed.records = Array.from(uniqueMap.values());
        }
        setResult(parsed);
      }
    } catch {
      // ignore
    }
  }, []);

  // Map of questions for review
  const questionsMap = useMemo(() => {
    const map = new Map<string, CsssQuestion>();
    currentSet.questions.forEach((q) => map.set(q.id, q));
    return map;
  }, [currentSet]);

  const filteredRecords = useMemo(() => {
    if (!result) return [];
    return result.records.filter((rec) => {
      // Status filter
      if (filterStatus === "correct" && !rec.isCorrect) return false;
      if (filterStatus === "incorrect" && (rec.isCorrect || rec.timedOut)) return false;
      if (filterStatus === "timedOut" && !rec.timedOut) return false;

      // Subtest filter
      if (filterSubtest !== "all" && rec.subtest !== filterSubtest) return false;

      return true;
    });
  }, [result, filterStatus, filterSubtest]);

  if (!result) {
    return (
      <div className="min-h-screen bg-military-grid flex flex-col items-center justify-center p-6 text-center font-mono space-y-4">
        <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-500">
          <CrossedSwords className="w-6 h-6" />
        </div>
        <h2 className="text-lg font-bold text-[var(--fg-primary)]">
          NO RECENT CSSS RESULT FOUND
        </h2>
        <p className="text-xs text-[var(--fg-secondary)] max-w-sm">
          Please launch an active CSSS Cognitive battery to generate your performance diagnostic report.
        </p>
        <Link
          href="/screening/csss"
          className="px-5 py-2.5 rounded-xl bg-emerald-600 text-white font-bold text-xs"
        >
          Go to CSSS Test Battery
        </Link>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
      {/* Header */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 bg-[var(--canvas-surface)]/90 backdrop-blur-md border-b border-[var(--canvas-border)] shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          <Link
            href="/screening/csss"
            className="flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-emerald-500 transition-all shadow-sm"
          >
            <div className="w-7 h-7 rounded-md border border-emerald-500/50 bg-[var(--canvas-surface)] flex items-center justify-center">
              <CrossedSwords className="w-4 h-4 text-emerald-500" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                CSSS<span className="text-emerald-500 font-semibold">DIAGNOSTICS</span>
              </span>
              <span className="text-[8px] sm:text-[9px] block text-[var(--fg-muted)] uppercase">
                {result.setName}
              </span>
            </div>
          </Link>

          <div className="flex items-center gap-2">
            <Link
              href="/screening/csss"
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
        {/* 1. HERO COGNITIVE SCORE CARD */}
        <div className="p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/40 bg-gradient-to-br from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left 5 cols: OIR Grade & Probability */}
            <div className="lg:col-span-5 space-y-4 border-b lg:border-b-0 lg:border-r border-[var(--canvas-border)] pb-6 lg:pb-0 lg:pr-8">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                <Sparkles className="w-3.5 h-3.5" />
                <span>OFFICIAL DIPR COGNITIVE RATING</span>
              </div>

              <div>
                <span className="text-4xl sm:text-6xl font-black text-[var(--fg-primary)] tracking-tight">
                  GRADE {result.oirGrade}
                </span>
                <span className="text-xs sm:text-sm text-emerald-500 font-bold block mt-1 tracking-wider uppercase">
                  {result.oirGrade === 1
                    ? "OIR-1 • Exceptional Cognitive Processing"
                    : result.oirGrade === 2
                    ? "OIR-2 • Above Average Potential"
                    : result.oirGrade === 3
                    ? "OIR-3 • Average Potential"
                    : "OIR-4 / 5 • Needs Speed Calibration"}
                </span>
              </div>

              {/* Screen-in Probability Meter */}
              <div className="space-y-1.5 pt-2">
                <div className="flex items-center justify-between text-xs font-bold">
                  <span className="text-[var(--fg-muted)]">SCREEN-IN PROBABILITY:</span>
                  <span className="text-emerald-500 font-mono text-sm">
                    {result.screenInProbability}%
                  </span>
                </div>
                <div className="w-full bg-[var(--canvas-border)] h-2.5 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-emerald-500 rounded-full transition-all duration-1000"
                    style={{ width: `${result.screenInProbability}%` }}
                  />
                </div>
              </div>
            </div>

            {/* Right 7 cols: Key Metrics Matrix */}
            <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-4 gap-3 text-center">
              <div className="p-4 rounded-2xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                <span className="text-[10px] text-[var(--fg-muted)] uppercase block">
                  ACCURACY
                </span>
                <span className="text-2xl font-black text-[var(--fg-primary)] font-mono">
                  {result.percentageScore}%
                </span>
                <span className="text-[10px] text-emerald-500 font-bold block">
                  {result.correct} / {result.totalQuestions} Correct
                </span>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                <span className="text-[10px] text-[var(--fg-muted)] uppercase block">
                  AVG REACTION
                </span>
                <span className="text-2xl font-black text-[var(--fg-primary)] font-mono">
                  {result.avgResponseTimeSec}s
                </span>
                <span className="text-[10px] text-[var(--fg-muted)] block">Per Question</span>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                <span className="text-[10px] text-[var(--fg-muted)] uppercase block">
                  INCORRECT
                </span>
                <span className="text-2xl font-black text-red-500 font-mono">
                  {result.incorrect}
                </span>
                <span className="text-[10px] text-[var(--fg-muted)] block">Miscalculated</span>
              </div>

              <div className="p-4 rounded-2xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                <span className="text-[10px] text-[var(--fg-muted)] uppercase block">
                  TIMED OUT
                </span>
                <span className="text-2xl font-black text-amber-500 font-mono">
                  {result.timedOut}
                </span>
                <span className="text-[10px] text-[var(--fg-muted)] block">00:00 Expired</span>
              </div>
            </div>
          </div>
        </div>

        {/* 2. SUBTEST PERFORMANCE CARDS */}
        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-[var(--fg-muted)]">
            5-SUBTEST PERFORMANCE BREAKDOWN
          </h2>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3">
            {[
              {
                key: "auditory" as CsssSubtest,
                title: "Auditory Discrimination",
                icon: Headphones,
              },
              {
                key: "spatial" as CsssSubtest,
                title: "Space & Form Perception",
                icon: Box,
              },
              {
                key: "memory" as CsssSubtest,
                title: "Working Memory",
                icon: Brain,
              },
              {
                key: "perceptual" as CsssSubtest,
                title: "Perceptual Speed",
                icon: Zap,
              },
              {
                key: "linguistic" as CsssSubtest,
                title: "Linguistic Reasoning",
                icon: Layers,
              },
            ].map((st) => {
              const data = result.subtestPerformance[st.key];
              const Icon = st.icon;
              return (
                <div
                  key={st.key}
                  className="p-4 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3 flex flex-col justify-between shadow-sm"
                >
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                        <Icon className="w-4 h-4" />
                      </div>
                      <span className="text-sm font-black font-mono text-[var(--fg-primary)]">
                        {data?.accuracy ?? 0}%
                      </span>
                    </div>

                    <div>
                      <h3 className="text-xs font-bold text-[var(--fg-primary)] leading-tight">
                        {st.title}
                      </h3>
                      <span className="text-[10px] text-[var(--fg-muted)] block mt-0.5">
                        {data?.correct ?? 0} of {data?.total ?? 5} answered correctly
                      </span>
                    </div>
                  </div>

                  <div className="pt-2 border-t border-[var(--canvas-border)] flex items-center justify-between text-[10px] text-[var(--fg-muted)]">
                    <span>Avg Time:</span>
                    <span className="font-bold text-emerald-500 font-mono">
                      {data?.avgTimeSec ?? 0}s
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* 3. MODULAR QUESTION-BY-QUESTION REVIEW LIST */}
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-[var(--canvas-border)] pb-3">
            <div>
              <h2 className="text-base font-extrabold text-[var(--fg-primary)] tracking-wide">
                COMPREHENSIVE QUESTION AUDIT & SOLUTIONS
              </h2>
              <p className="text-xs text-[var(--fg-secondary)] font-sans">
                Review every stimulus, your deduction, the correct key, and assessor cognitive explanations.
              </p>
            </div>

            {/* Filter Pills */}
            <div className="flex items-center gap-1.5 flex-wrap text-xs">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterStatus === "all"
                    ? "bg-[var(--fg-primary)] text-[var(--canvas-bg)]"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--fg-secondary)]"
                }`}
              >
                All ({result.records.length})
              </button>
              <button
                onClick={() => setFilterStatus("correct")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterStatus === "correct"
                    ? "bg-emerald-600 text-white"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500"
                }`}
              >
                Correct ({result.correct})
              </button>
              <button
                onClick={() => setFilterStatus("incorrect")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterStatus === "incorrect"
                    ? "bg-red-600 text-white"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-red-500"
                }`}
              >
                Incorrect ({result.incorrect})
              </button>
              <button
                onClick={() => setFilterStatus("timedOut")}
                className={`px-3 py-1.5 rounded-lg font-bold transition-all ${
                  filterStatus === "timedOut"
                    ? "bg-amber-600 text-white"
                    : "bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-amber-500"
                }`}
              >
                Timed Out ({result.timedOut})
              </button>
            </div>
          </div>

          {/* List of Questions */}
          <div className="space-y-4">
            {filteredRecords.map((rec, idx) => {
              const q = questionsMap.get(rec.questionId);
              if (!q) return null;

              const isExpanded = expandedQuestionId === q.id;

              return (
                <div
                  key={`${rec.questionId}-${idx}`}
                  className={`p-5 rounded-2xl border-2 transition-all bg-[var(--canvas-surface)] ${
                    rec.isCorrect
                      ? "border-emerald-500/30"
                      : rec.timedOut
                      ? "border-amber-500/30"
                      : "border-red-500/30"
                  }`}
                >
                  {/* Top Item Summary Strip */}
                  <div className="flex items-center justify-between flex-wrap gap-2 mb-3">
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                        {q.id}
                      </span>
                      <span className="text-xs font-bold text-emerald-500 uppercase">
                        {q.subtestName}
                      </span>
                      <span className="text-[10px] text-[var(--fg-muted)] font-mono">
                        • {rec.timeSpentSec}s / {q.timeLimitSec}s
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      {rec.isCorrect ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                          <CheckCircle2 className="w-3.5 h-3.5" />
                          <span>CORRECT</span>
                        </span>
                      ) : rec.timedOut ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-amber-500/15 text-amber-500 border border-amber-500/30">
                          <Clock className="w-3.5 h-3.5" />
                          <span>TIMED OUT</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-red-500/15 text-red-500 border border-red-500/30">
                          <XCircle className="w-3.5 h-3.5" />
                          <span>INCORRECT</span>
                        </span>
                      )}

                      <button
                        onClick={() => setExpandedQuestionId(isExpanded ? null : q.id)}
                        className="p-1 rounded hover:bg-[var(--canvas-surface-subtle)] text-[var(--fg-muted)] cursor-pointer"
                      >
                        {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {/* Prompt */}
                  <p className="text-xs sm:text-sm font-bold text-[var(--fg-primary)] font-sans leading-relaxed mb-3 whitespace-pre-line">
                    {q.memorySpec ? q.memorySpec.maskedPrompt : q.prompt}
                  </p>

                  {/* Figure or Audio Replay if present */}
                  {q.figureSvg && (
                    <div className="my-3 p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex justify-center">
                      <div dangerouslySetInnerHTML={{ __html: q.figureSvg }} />
                    </div>
                  )}

                  {q.audioSpec && (
                    <div className="my-3 p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex items-center justify-between gap-3">
                      <span className="text-xs font-sans text-[var(--fg-secondary)]">
                        🎧 <strong>Acoustic Spec:</strong> {q.audioSpec.transcriptHint || "Frequency tone trial"}
                      </span>
                      <button
                        onClick={() => {
                          if (q.audioSpec?.type === "tone_pair" && q.audioSpec.tonePair) {
                            csssAudio.playTonePair(q.audioSpec.tonePair);
                          } else if (q.audioSpec?.type === "tone_sequence" && q.audioSpec.toneSequence) {
                            csssAudio.playToneSequence(q.audioSpec.toneSequence);
                          } else if (q.audioSpec?.type === "radio_callsign" && q.audioSpec.radioCallsign) {
                            csssAudio.playRadioCallsign(q.audioSpec.radioCallsign);
                          }
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-[11px] flex items-center gap-1.5 shrink-0"
                      >
                        <Volume2 className="w-3.5 h-3.5" />
                        <span>Replay Audio</span>
                      </button>
                    </div>
                  )}

                  {q.memorySpec && (
                    <div className="my-3 p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                      <span className="text-[10px] text-amber-500 font-bold block mb-2 uppercase">
                        Original 3x3 Memory Matrix (Vanished):
                      </span>
                      <div className="grid grid-cols-3 gap-1.5 max-w-[180px] mx-auto text-center font-bold text-xs">
                        {q.memorySpec.matrix.map((row, r) =>
                          row.map((cell, c) => (
                            <div
                              key={`${r}-${c}`}
                              className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]"
                            >
                              {cell}
                            </div>
                          ))
                        )}
                      </div>
                    </div>
                  )}

                  {/* Options Comparison */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 my-3 text-xs">
                    {q.options.map((optText, optIdx) => {
                      const isCorrectOpt = optIdx === q.correctIndex;
                      const isCandidatePick = optIdx === rec.selectedOptionIndex;

                      return (
                        <div
                          key={optIdx}
                          className={`p-2.5 rounded-xl border flex items-start gap-2.5 ${
                            isCorrectOpt
                              ? "border-emerald-500 bg-emerald-500/10 text-emerald-400 font-bold"
                              : isCandidatePick && !isCorrectOpt
                              ? "border-red-500 bg-red-500/10 text-red-400 font-bold"
                              : "border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)]"
                          }`}
                        >
                          <span className="w-5 h-5 rounded flex items-center justify-center font-mono font-bold text-[10px] shrink-0 bg-[var(--canvas-surface)]">
                            {String.fromCharCode(65 + optIdx)}
                          </span>
                          <span className="flex-1 font-sans">{optText}</span>
                          {isCorrectOpt && (
                            <span className="text-[10px] font-mono text-emerald-400 uppercase">
                              [CORRECT KEY]
                            </span>
                          )}
                          {isCandidatePick && !isCorrectOpt && (
                            <span className="text-[10px] font-mono text-red-400 uppercase">
                              [YOUR ANSWER]
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>

                  {/* Assessor Cognitive Solution Box */}
                  <div className="mt-3 p-3.5 rounded-xl bg-[var(--canvas-surface-subtle)] border-l-4 border-emerald-500 space-y-1">
                    <span className="text-[10px] font-bold uppercase text-emerald-500 font-mono block">
                      DIPR COGNITIVE EXPLANATION:
                    </span>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                      {q.explanation}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Bottom Navigation CTAs */}
        <div className="pt-6 border-t border-[var(--canvas-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
          <Link
            href="/screening/csss"
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-[var(--canvas-border)] hover:border-emerald-500 text-xs font-bold text-[var(--fg-primary)] flex items-center justify-center gap-2"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake / Choose Another Set</span>
          </Link>

          <Link
            href="/screening/opam"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <span>PROCEED TO OPAM PSYCHOMETRICS</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>
    </div>
  );
}

export default function CsssResultPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-military-grid flex items-center justify-center text-emerald-500 font-mono text-sm">
          LOADING CSSS COGNITIVE REPORT...
        </div>
      }
    >
      <CsssResultContent />
    </Suspense>
  );
}
