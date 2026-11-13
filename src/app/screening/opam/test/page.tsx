"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Award,
  Layers,
  Sparkles,
  ChevronRight,
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import {
  OpamSet,
  OpamQuestion,
  OpamResponseRecord,
  getOpamSetById,
  calculateOpamResult,
  opamSet1,
} from "@/data/opam";

const LIKERT_OPTIONS = [
  { label: "Strongly Disagree", value: 1, keyNum: "1", color: "hover:border-red-500" },
  { label: "Disagree", value: 2, keyNum: "2", color: "hover:border-amber-500" },
  { label: "Neutral / Undecided", value: 3, keyNum: "3", color: "hover:border-slate-500" },
  { label: "Agree", value: 4, keyNum: "4", color: "hover:border-emerald-500" },
  { label: "Strongly Agree", value: 5, keyNum: "5", color: "hover:border-emerald-500" },
];

function OpamTestRunner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setId = searchParams.get("set") || "opam-set-1";

  const [currentSet, setCurrentSet] = useState<OpamSet>(() => {
    return getOpamSetById(setId) || opamSet1;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOptionIndex, setSelectedOptionIndex] = useState<number | null>(null);
  const [records, setRecords] = useState<OpamResponseRecord[]>([]);
  const [timeRemaining, setTimeRemaining] = useState<number>(20); // 20s per-item instinct timer

  const itemStartTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const isAdvancingRef = useRef<boolean>(false);

  const currentQ: OpamQuestion = currentSet.questions[currentIndex] || currentSet.questions[0];

  // Advance question handler
  const handleSelectAnswer = useCallback(
    (optionIndex: number, optionValue: number) => {
      if (isAdvancingRef.current) return;
      isAdvancingRef.current = true;
      setSelectedOptionIndex(optionIndex);

      const timeSpent = Math.max(
        1,
        Math.round((Date.now() - itemStartTimeRef.current) / 1000)
      );

      const record: OpamResponseRecord = {
        questionId: currentQ.id,
        type: currentQ.type,
        selectedOptionIndex: optionIndex,
        selectedValue: optionValue,
        timeSpentSec: timeSpent,
        factor: currentQ.factor,
        primaryOlq: currentQ.primaryOlq,
        isLieScale: currentQ.isLieScale,
        consistencyPairId: currentQ.consistencyPairId,
      };

      const nextRecords = [...records, record];
      setRecords(nextRecords);

      // Brief 300ms pause for visual feedback before auto-advancing
      setTimeout(() => {
        if (currentIndex + 1 < currentSet.questions.length) {
          setCurrentIndex((prev) => prev + 1);
          setSelectedOptionIndex(null);
          isAdvancingRef.current = false;
        } else {
          // Final submission
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          const finalResult = calculateOpamResult(currentSet.id, nextRecords);
          try {
            localStorage.setItem("ssb_opam_latest_result", JSON.stringify(finalResult));
          } catch {
            // ignore
          }
          router.push(`/screening/opam/result?set=${currentSet.id}`);
        }
      }, 280);
    },
    [currentIndex, currentQ, currentSet, records, router]
  );

  // Keyboard shortcut listener
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (isAdvancingRef.current) return;

      if (currentQ.type === "likert") {
        if (["1", "2", "3", "4", "5"].includes(e.key)) {
          const val = parseInt(e.key, 10);
          handleSelectAnswer(val - 1, val);
        }
      } else if (currentQ.type === "forced_choice" && currentQ.options) {
        if (e.key.toLowerCase() === "a") {
          handleSelectAnswer(0, currentQ.options[0].value);
        } else if (e.key.toLowerCase() === "b") {
          handleSelectAnswer(1, currentQ.options[1].value);
        }
      } else if (currentQ.type === "scenario" && currentQ.options) {
        if (["1", "2", "3"].includes(e.key)) {
          const idx = parseInt(e.key, 10) - 1;
          if (currentQ.options[idx]) {
            handleSelectAnswer(idx, currentQ.options[idx].value);
          }
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentQ, handleSelectAnswer]);

  // Reset timer on question change
  useEffect(() => {
    itemStartTimeRef.current = Date.now();
    setTimeRemaining(20);
    setSelectedOptionIndex(null);
    isAdvancingRef.current = false;

    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          // Time-out fallback: record neutral answer if candidate freezes
          if (!isAdvancingRef.current) {
            handleSelectAnswer(2, 3); // neutral option 3
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [currentIndex, handleSelectAnswer]);

  const progressPercent = Math.round(
    ((currentIndex + 1) / currentSet.totalItems) * 100
  );

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)] select-none">
      {/* Top Testing Terminal HUD */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3 bg-[var(--canvas-surface)]/95 backdrop-blur-md border-b border-[var(--canvas-border)] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Terminal & Set code */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-emerald-500/40 bg-[var(--canvas-surface)] flex items-center justify-center text-emerald-500">
              <CrossedSwords className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                  OPAM TERMINAL <span className="text-emerald-500">#02</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                  {currentSet.code}
                </span>
              </div>
              <span className="text-[9px] block text-[var(--fg-muted)] uppercase">
                OBJECTIVE PERSONALITY ASSESSMENT MEASURE
              </span>
            </div>
          </div>

          {/* Right: Progress & Timer */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-[var(--fg-muted)] block">PROGRESS</span>
              <span className="text-sm font-bold text-[var(--fg-primary)] font-mono">
                {currentIndex + 1} / {currentSet.totalItems} ({progressPercent}%)
              </span>
            </div>

            <div
              className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border font-mono font-bold text-xs sm:text-sm ${
                timeRemaining <= 5
                  ? "bg-amber-500/20 border-amber-500 text-amber-500 animate-pulse"
                  : "bg-emerald-500/15 border-emerald-500/40 text-emerald-500"
              }`}
            >
              <Clock className="w-3.5 h-3.5" />
              <span>00:{timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}</span>
            </div>

            <ThemeToggle compact />
          </div>
        </div>

        {/* Global Progress Line */}
        <div className="w-full bg-[var(--canvas-border)] h-1.5 mt-3 rounded-full overflow-hidden">
          <div
            className="h-full bg-emerald-500 transition-all duration-300 ease-out"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </header>

      {/* Main Testing Viewport */}
      <main className="max-w-3xl mx-auto px-4 sm:px-6 pt-8 pb-20 w-full space-y-8 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Item Meta Pill Strip */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] font-bold text-[var(--fg-primary)]">
                ITEM {currentIndex + 1} of {currentSet.totalItems}
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold uppercase">
                {currentQ.type === "likert"
                  ? "BEHAVIORAL RATING"
                  : currentQ.type === "forced_choice"
                  ? "FORCED-CHOICE DILEMMA"
                  : "TACTICAL SCENARIO"}
              </span>
            </div>

            <span className="text-[11px] text-[var(--fg-muted)] font-mono">
              ID: {currentQ.id}
            </span>
          </div>

          {/* QUESTION PROMPT CARD */}
          <div className="p-6 sm:p-8 rounded-3xl border-2 border-emerald-500/30 bg-[var(--canvas-surface)] space-y-4 shadow-lg">
            <span className="text-[10px] font-bold uppercase text-[var(--fg-muted)] block tracking-wider">
              {currentQ.type === "likert"
                ? "INDICATE YOUR NATURAL DEGREE OF AGREEMENT:"
                : currentQ.type === "forced_choice"
                ? "WHICH STATEMENT MORE ACCURATELY REFLECTS YOU?"
                : "CHOOSE YOUR IMMEDIATE COURSE OF ACTION:"}
            </span>

            <p className="text-base sm:text-xl font-bold text-[var(--fg-primary)] leading-relaxed font-sans">
              "{currentQ.prompt}"
            </p>
          </div>

          {/* ============================================================ */}
          {/* FORMAT 1: 5-POINT LIKERT SCALE (STANDARD BEHAVIORAL ITEMS)   */}
          {/* ============================================================ */}
          {currentQ.type === "likert" && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase text-[var(--fg-muted)] block">
                SELECT INSTINCTIVELY (OR PRESS 1 TO 5 ON KEYBOARD):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-5 gap-2.5">
                {LIKERT_OPTIONS.map((opt, optIdx) => {
                  const isSelected = selectedOptionIndex === optIdx;

                  return (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => handleSelectAnswer(optIdx, opt.value)}
                      className={`p-4 rounded-2xl border-2 text-center transition-all flex flex-col items-center justify-between gap-2 cursor-pointer group active:scale-95 ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/15 text-[var(--fg-primary)] shadow-lg"
                          : `border-[var(--canvas-border)] bg-[var(--canvas-surface)] ${opt.color} text-[var(--fg-secondary)]`
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono transition-all ${
                          isSelected
                            ? "bg-emerald-500 text-white"
                            : "bg-[var(--canvas-surface-subtle)] text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)]"
                        }`}
                      >
                        {opt.keyNum}
                      </span>

                      <span className="text-xs font-sans font-bold leading-tight">
                        {opt.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* FORMAT 2: FORCED-CHOICE IPSATIVE DILEMMAS                    */}
          {/* ============================================================ */}
          {currentQ.type === "forced_choice" && currentQ.options && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase text-[var(--fg-muted)] block">
                CHOOSE ONE (OR PRESS KEY A / B):
              </span>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedOptionIndex === optIdx;
                  const keyLetter = optIdx === 0 ? "A" : "B";

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(optIdx, opt.value)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all flex items-start gap-4 cursor-pointer group active:scale-95 ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/15 text-[var(--fg-primary)] shadow-lg"
                          : "border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-emerald-500/50 text-[var(--fg-secondary)]"
                      }`}
                    >
                      <span
                        className={`w-8 h-8 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-all ${
                          isSelected
                            ? "bg-emerald-500 text-white"
                            : "bg-[var(--canvas-surface-subtle)] text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)]"
                        }`}
                      >
                        {keyLetter}
                      </span>

                      <span className="text-xs sm:text-sm font-sans font-semibold leading-relaxed pt-1">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* ============================================================ */}
          {/* FORMAT 3: TACTICAL SCENARIO CHOICES                         */}
          {/* ============================================================ */}
          {currentQ.type === "scenario" && currentQ.options && (
            <div className="space-y-3">
              <span className="text-[10px] font-bold uppercase text-[var(--fg-muted)] block">
                SELECT YOUR COURSE OF ACTION (PRESS 1, 2, OR 3):
              </span>

              <div className="space-y-3">
                {currentQ.options.map((opt, optIdx) => {
                  const isSelected = selectedOptionIndex === optIdx;

                  return (
                    <button
                      key={optIdx}
                      type="button"
                      onClick={() => handleSelectAnswer(optIdx, opt.value)}
                      className={`w-full p-4 sm:p-5 rounded-2xl border-2 text-left transition-all flex items-start gap-3.5 cursor-pointer group active:scale-95 ${
                        isSelected
                          ? "border-emerald-500 bg-emerald-500/15 text-[var(--fg-primary)] shadow-lg"
                          : "border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-emerald-500/50 text-[var(--fg-secondary)]"
                      }`}
                    >
                      <span
                        className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-all ${
                          isSelected
                            ? "bg-emerald-500 text-white"
                            : "bg-[var(--canvas-surface-subtle)] text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)]"
                        }`}
                      >
                        {optIdx + 1}
                      </span>

                      <span className="text-xs sm:text-sm font-sans font-semibold leading-relaxed pt-0.5">
                        {opt.text}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}
        </div>

        {/* BOTTOM HUD FOOTER */}
        <div className="pt-6 border-t border-[var(--canvas-border)] flex items-center justify-between text-xs text-[var(--fg-muted)] font-mono">
          <span>⚡ Instant Auto-Advance Engine</span>
          <span>Answer instinctively • Do not second-guess</span>
        </div>
      </main>
    </div>
  );
}

export default function OpamTestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-military-grid flex items-center justify-center text-emerald-500 font-mono text-sm">
          INITIALIZING OPAM PSYCHOMETRIC ENGINE...
        </div>
      }
    >
      <OpamTestRunner />
    </Suspense>
  );
}
