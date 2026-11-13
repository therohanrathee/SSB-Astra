"use client";

import React, { useState, useEffect, useRef, useCallback, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  Clock,
  Volume2,
  VolumeX,
  Play,
  RotateCcw,
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Shield,
  Eye,
  EyeOff,
  Headphones,
  Box,
  Brain,
  Zap,
  Layers,
  Sparkles,
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import {
  CsssSet,
  CsssQuestion,
  CsssAttemptRecord,
  getCsssSetById,
  calculateCsssResult,
  csssSet1,
} from "@/data/csss";
import { csssAudio } from "@/lib/csssAudioEngine";

function CsssTestRunner() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const setId = searchParams.get("set") || "csss-set-1";

  const [currentSet, setCurrentSet] = useState<CsssSet>(() => {
    return getCsssSetById(setId) || csssSet1;
  });

  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [timeRemaining, setTimeRemaining] = useState<number>(20);
  const [records, setRecords] = useState<CsssAttemptRecord[]>([]);

  // Subtest specific states
  const [memoryPhase, setMemoryPhase] = useState<"flash" | "masked">("flash");
  const [memoryCountdown, setMemoryCountdown] = useState<number>(4);
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [audioPlayedCount, setAudioPlayedCount] = useState(0);

  const questionStartTimeRef = useRef<number>(Date.now());
  const timerIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const memoryIntervalRef = useRef<NodeJS.Timeout | null>(null);

  const currentQ: CsssQuestion = currentSet.questions[currentIndex] || currentSet.questions[0];

  // Audio Playback Handler
  const playCurrentAudio = useCallback(() => {
    if (!currentQ.audioSpec) return;
    setIsPlayingAudio(true);

    if (currentQ.audioSpec.type === "tone_pair" && currentQ.audioSpec.tonePair) {
      csssAudio.playTonePair(currentQ.audioSpec.tonePair, () => {
        setIsPlayingAudio(false);
        setAudioPlayedCount((prev) => prev + 1);
      });
    } else if (
      currentQ.audioSpec.type === "tone_sequence" &&
      currentQ.audioSpec.toneSequence
    ) {
      csssAudio.playToneSequence(currentQ.audioSpec.toneSequence, () => {
        setIsPlayingAudio(false);
        setAudioPlayedCount((prev) => prev + 1);
      });
    } else if (
      currentQ.audioSpec.type === "radio_callsign" &&
      currentQ.audioSpec.radioCallsign
    ) {
      csssAudio.playRadioCallsign(currentQ.audioSpec.radioCallsign, () => {
        setIsPlayingAudio(false);
        setAudioPlayedCount((prev) => prev + 1);
      });
    }
  }, [currentQ]);

  // Advance to next question or complete test
  const advanceQuestion = useCallback(
    (isTimeout = false) => {
      // Stop all active audio
      csssAudio.stopAll();
      setIsPlayingAudio(false);

      const timeSpent = Math.min(
        currentQ.timeLimitSec,
        Math.max(1, Math.round((Date.now() - questionStartTimeRef.current) / 1000))
      );

      const record: CsssAttemptRecord = {
        questionId: currentQ.id,
        subtest: currentQ.subtest,
        selectedOptionIndex: selectedOption,
        isCorrect: selectedOption === currentQ.correctIndex,
        timeSpentSec: timeSpent,
        timedOut: isTimeout && selectedOption === null,
      };

      const nextRecords = [...records, record];
      setRecords(nextRecords);

      if (currentIndex + 1 < currentSet.questions.length) {
        setCurrentIndex((prev) => prev + 1);
        setSelectedOption(null);
      } else {
        // Complete test!
        if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
        const finalResult = calculateCsssResult(currentSet.id, nextRecords);
        try {
          localStorage.setItem("ssb_csss_latest_result", JSON.stringify(finalResult));
        } catch {
          // ignore
        }
        router.push(`/screening/csss/result?set=${currentSet.id}`);
      }
    },
    [currentIndex, currentQ, currentSet, records, router, selectedOption]
  );

  // Initialize and tick question micro-timer
  useEffect(() => {
    questionStartTimeRef.current = Date.now();
    setTimeRemaining(currentQ.timeLimitSec);
    setSelectedOption(null);
    setAudioPlayedCount(0);

    // If Memory subtest: start flash phase
    if (currentQ.subtest === "memory" && currentQ.memorySpec) {
      setMemoryPhase("flash");
      const duration = currentQ.memorySpec.displayDurationSec || 4;
      setMemoryCountdown(duration);

      if (memoryIntervalRef.current) clearInterval(memoryIntervalRef.current);
      memoryIntervalRef.current = setInterval(() => {
        setMemoryCountdown((prev) => {
          if (prev <= 1) {
            if (memoryIntervalRef.current) clearInterval(memoryIntervalRef.current);
            setMemoryPhase("masked");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      setMemoryPhase("masked");
    }

    // Auto-play audio on question mount if it's an auditory question
    if (currentQ.subtest === "auditory" && currentQ.audioSpec) {
      const audioTimer = setTimeout(() => {
        playCurrentAudio();
      }, 350);
      return () => clearTimeout(audioTimer);
    }

    return () => {
      if (memoryIntervalRef.current) clearInterval(memoryIntervalRef.current);
      csssAudio.stopAll();
    };
  }, [currentIndex, currentQ, playCurrentAudio]);

  // Main countdown timer interval
  useEffect(() => {
    if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);

    timerIntervalRef.current = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
          advanceQuestion(true); // timed out
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => {
      if (timerIntervalRef.current) clearInterval(timerIntervalRef.current);
    };
  }, [advanceQuestion, currentIndex]);

  const timerRatio = timeRemaining / currentQ.timeLimitSec;
  const isUrgent = timeRemaining <= 5;
  const isWarning = timeRemaining <= 10 && !isUrgent;

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)] select-none">
      {/* Top Testing Terminal HUD */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3 bg-[var(--canvas-surface)]/95 backdrop-blur-md border-b border-[var(--canvas-border)] shadow-md">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          {/* Left: Terminal ID & Set */}
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg border border-emerald-500/40 bg-[var(--canvas-surface)] flex items-center justify-center text-emerald-500">
              <CrossedSwords className="w-4 h-4" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                  TERMINAL <span className="text-emerald-500">#04</span>
                </span>
                <span className="text-[10px] px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold">
                  {currentSet.code}
                </span>
              </div>
              <span className="text-[9px] block text-[var(--fg-muted)] uppercase">
                DIPR COMPUTERISED COGNITIVE BATTERY
              </span>
            </div>
          </div>

          {/* Right: Question Progress & Micro-Timer */}
          <div className="flex items-center gap-4">
            <div className="text-right hidden sm:block">
              <span className="text-[10px] text-[var(--fg-muted)] block">QUESTION</span>
              <span className="text-sm font-bold text-[var(--fg-primary)] font-mono">
                {currentIndex + 1} / {currentSet.totalQuestions}
              </span>
            </div>

            {/* Countdown Badge */}
            <div
              className={`flex items-center gap-2 px-3.5 py-1.5 rounded-xl border font-mono font-bold text-sm sm:text-base transition-all ${
                isUrgent
                  ? "bg-red-500/20 border-red-500 text-red-500 animate-pulse"
                  : isWarning
                  ? "bg-amber-500/20 border-amber-500 text-amber-500"
                  : "bg-emerald-500/15 border-emerald-500/40 text-emerald-500"
              }`}
            >
              <Clock className={`w-4 h-4 ${isUrgent ? "animate-spin" : ""}`} />
              <span>
                00:{timeRemaining < 10 ? `0${timeRemaining}` : timeRemaining}
              </span>
            </div>

            <ThemeToggle compact />
          </div>
        </div>

        {/* Real-Time Micro-Timer Progress Bar */}
        <div className="w-full bg-[var(--canvas-border)] h-1.5 mt-3 rounded-full overflow-hidden">
          <div
            className={`h-full transition-all duration-1000 ease-linear ${
              isUrgent ? "bg-red-500" : isWarning ? "bg-amber-500" : "bg-emerald-500"
            }`}
            style={{ width: `${Math.max(0, timerRatio * 100)}%` }}
          />
        </div>
      </header>

      {/* Main Examination Viewport */}
      <main className="max-w-4xl mx-auto px-4 sm:px-6 pt-4 pb-20 w-full space-y-6 flex-1 flex flex-col justify-between">
        <div className="space-y-6">
          {/* Item Meta Bar */}
          <div className="flex items-center justify-between flex-wrap gap-2 text-xs">
            <div className="flex items-center gap-2">
              <span className="px-2.5 py-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] font-bold text-[var(--fg-primary)]">
                Q{currentIndex + 1} of {currentSet.totalQuestions}
              </span>
              <span className="px-2.5 py-1 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold uppercase">
                {currentQ.subtestName}
              </span>
            </div>

            <span className="text-[11px] text-[var(--fg-muted)] font-mono">
              Strict 1-Way Auto Advance • Item ID: {currentQ.id}
            </span>
          </div>

          {/* ============================================================ */}
          {/* SPECIAL SUBTEST STIMULUS VIEWPORTS                          */}
          {/* ============================================================ */}

          {/* 1. AUDITORY DISCRIMINATION CONSOLE */}
          {currentQ.subtest === "auditory" && (
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-emerald-500/30 bg-[var(--canvas-surface)] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-emerald-500 font-bold text-xs">
                  <Headphones className="w-4 h-4" />
                  <span>ACOUSTIC STIMULUS PLAYER</span>
                </div>
                <span className="text-[10px] text-[var(--fg-muted)] font-mono">
                  Played {audioPlayedCount}x
                </span>
              </div>

              <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex flex-col sm:flex-row items-center justify-between gap-4">
                <div className="space-y-1 text-center sm:text-left">
                  <span className="text-xs font-bold text-[var(--fg-primary)] block">
                    {currentQ.audioSpec?.type === "tone_pair"
                      ? "Sequential Tone Pair (Tone A ➔ Tone B)"
                      : currentQ.audioSpec?.type === "tone_sequence"
                      ? "High/Low Frequency Burst Sequence"
                      : "Tactical Radio Callsign Transmission"}
                  </span>
                  <span className="text-[11px] text-[var(--fg-muted)] font-sans">
                    Listen closely with headphones. Identify pitch change, pip count, or callsign.
                  </span>
                </div>

                <button
                  type="button"
                  onClick={playCurrentAudio}
                  disabled={isPlayingAudio}
                  className="px-5 py-2.5 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center gap-2 transition-all shadow-md active:scale-95 disabled:opacity-50 cursor-pointer shrink-0"
                >
                  <Volume2 className={`w-4 h-4 ${isPlayingAudio ? "animate-pulse text-amber-300" : ""}`} />
                  <span>{isPlayingAudio ? "Transmitting Audio..." : "Replay Audio Stimulus"}</span>
                </button>
              </div>
            </div>
          )}

          {/* 2. WORKING MEMORY FLASH MATRIX */}
          {currentQ.subtest === "memory" && currentQ.memorySpec && (
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-amber-500/40 bg-[var(--canvas-surface)] shadow-md space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-amber-500 font-bold text-xs">
                  <Brain className="w-4 h-4" />
                  <span>
                    {memoryPhase === "flash" ? "MEMORY PRESENTATION PHASE" : "RECALL & QUERY PHASE"}
                  </span>
                </div>
                {memoryPhase === "flash" ? (
                  <span className="px-2.5 py-0.5 rounded bg-amber-500/20 text-amber-500 border border-amber-500/40 font-bold text-xs animate-pulse">
                    Vanish in {memoryCountdown}s
                  </span>
                ) : (
                  <span className="px-2.5 py-0.5 rounded bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 font-bold text-xs">
                    Matrix Vanished
                  </span>
                )}
              </div>

              {memoryPhase === "flash" ? (
                <div className="space-y-3">
                  <p className="text-xs text-amber-400 font-sans text-center font-bold">
                    Memorize all 9 positions and contents before the grid disappears:
                  </p>
                  <div className="grid grid-cols-3 gap-2.5 max-w-[280px] mx-auto text-center font-bold font-mono text-base sm:text-lg">
                    {currentQ.memorySpec.matrix.map((row, rIdx) =>
                      row.map((cell, cIdx) => (
                        <div
                          key={`${rIdx}-${cIdx}`}
                          className="p-3 sm:p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border-2 border-amber-500/40 text-[var(--fg-primary)] shadow-sm flex items-center justify-center min-h-[55px]"
                        >
                          {cell}
                        </div>
                      ))
                    )}
                  </div>
                </div>
              ) : (
                <div className="p-6 rounded-xl bg-[var(--canvas-surface-subtle)] border border-dashed border-[var(--canvas-border)] text-center space-y-2">
                  <div className="w-8 h-8 rounded-full bg-[var(--canvas-border)]/50 mx-auto flex items-center justify-center text-[var(--fg-muted)]">
                    <EyeOff className="w-4 h-4" />
                  </div>
                  <span className="text-xs text-[var(--fg-muted)] block font-mono">
                    [Stimulus Matrix Hidden — Recall from Working Memory]
                  </span>
                </div>
              )}
            </div>
          )}

          {/* 3. SPACE & FORM PERCEPTION SVG FIGURE */}
          {currentQ.figureSvg && (
            <div className="p-4 sm:p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-sm flex items-center justify-center">
              <div
                className="w-full flex justify-center"
                dangerouslySetInnerHTML={{ __html: currentQ.figureSvg }}
              />
            </div>
          )}

          {/* QUESTION PROMPT */}
          <div className="p-5 sm:p-6 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3 shadow-sm">
            <span className="text-[10px] font-bold uppercase text-[var(--fg-muted)] block">
              ITEM PROMPT:
            </span>
            <p className="text-sm sm:text-base font-bold text-[var(--fg-primary)] leading-relaxed font-sans whitespace-pre-line">
              {currentQ.subtest === "memory" && memoryPhase === "masked" && currentQ.memorySpec
                ? currentQ.memorySpec.maskedPrompt
                : currentQ.prompt}
            </p>
          </div>

          {/* MULTIPLE-CHOICE OPTIONS */}
          <div className="space-y-3">
            <span className="text-[10px] font-bold uppercase text-[var(--fg-muted)] block">
              SELECT YOUR DEDUCTION:
            </span>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {currentQ.options.map((optText, optIdx) => {
                const isSelected = selectedOption === optIdx;
                const letter = String.fromCharCode(65 + optIdx); // A, B, C, D

                return (
                  <button
                    key={optIdx}
                    type="button"
                    onClick={() => setSelectedOption(optIdx)}
                    className={`p-4 rounded-xl border-2 text-left transition-all flex items-start gap-3 cursor-pointer group ${
                      isSelected
                        ? "border-emerald-500 bg-emerald-500/10 text-[var(--fg-primary)] shadow-md"
                        : "border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-emerald-500/50 text-[var(--fg-secondary)]"
                    }`}
                  >
                    <span
                      className={`w-6 h-6 rounded-md flex items-center justify-center text-xs font-bold font-mono shrink-0 transition-all ${
                        isSelected
                          ? "bg-emerald-500 text-white"
                          : "bg-[var(--canvas-surface-subtle)] text-[var(--fg-muted)] group-hover:text-[var(--fg-primary)]"
                      }`}
                    >
                      {letter}
                    </span>

                    <span className="text-xs sm:text-sm font-sans font-medium leading-snug pt-0.5">
                      {optText}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>
        </div>

        {/* BOTTOM ACTION BAR */}
        <div className="pt-6 border-t border-[var(--canvas-border)] flex items-center justify-between gap-4">
          <div className="text-xs text-[var(--fg-muted)] hidden sm:block">
            {selectedOption !== null ? (
              <span className="text-emerald-500 font-bold flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Response Marked (Option {String.fromCharCode(65 + selectedOption)})
              </span>
            ) : (
              <span>Select an option before timer runs out</span>
            )}
          </div>

          <button
            type="button"
            onClick={() => advanceQuestion(false)}
            className="w-full sm:w-auto px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-md active:scale-95 cursor-pointer ml-auto"
          >
            <span>
              {currentIndex + 1 === currentSet.totalQuestions
                ? "CONFIRM & SUBMIT TEST"
                : "SAVE & ADVANCE"}
            </span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </main>
    </div>
  );
}

export default function CsssTestPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-military-grid flex items-center justify-center text-emerald-500 font-mono text-sm">
          INITIALIZING CSSS TEST TERMINAL...
        </div>
      }
    >
      <CsssTestRunner />
    </Suspense>
  );
}
