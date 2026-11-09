"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeft,
  Clock,
  CheckCircle2,
  AlertCircle,
  HelpCircle,
  PlayCircle,
  RotateCcw,
  Sparkles,
  ChevronRight,
  ChevronLeft,
  Flag,
  FileText,
  Shield,
  Layers,
  Award,
  BarChart3,
  Check,
  X,
  Menu,
  Eye,
  Zap,
  Target,
  BookOpen
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import CubeRenderer from "@/components/oir/CubeRenderer";
import {
  OIRBooklet,
  OIRQuestion,
  OIRTestResult,
  ALL_OIR_BOOKLETS,
  BOOKLET_35,
  BOOKLET_34,
  BOOKLET_53,
  DDE_TEST_01,
  BYJUS_MOCK_01,
  calculateOirRating,
  OIRRatingDetails
} from "@/data/oir";

type TestState = "catalog" | "instruction" | "testing" | "scorecard";
type ExamMode = "cbt" | "practice";
type CatalogFilter = "all" | "authentic" | "dde" | "byjus" | "non_verbal" | "verbal";

export default function OIRSimulatorPage() {
  const router = useRouter();

  // Test Selection & Flow States
  const [testState, setTestState] = useState<TestState>("catalog");
  const [selectedBooklet, setSelectedBooklet] = useState<OIRBooklet>(BOOKLET_35);
  const [examMode, setExamMode] = useState<ExamMode>("cbt");
  const [catalogFilter, setCatalogFilter] = useState<CatalogFilter>("all");

  // CBT Live Engine States
  const [currentIdx, setCurrentIdx] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Set<number>>(new Set());
  const [visitedQuestions, setVisitedQuestions] = useState<Set<number>>(new Set([0]));
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(17 * 60);
  const [isTimeCritical, setIsTimeCritical] = useState<boolean>(false);
  const [showSubmitModal, setShowSubmitModal] = useState<boolean>(false);
  const [showMobilePalette, setShowMobilePalette] = useState<boolean>(false);

  // Scorecard / Diagnostic Report
  const [testResult, setTestResult] = useState<OIRTestResult | null>(null);
  const [reviewFilter, setReviewFilter] = useState<"all" | "correct" | "incorrect" | "unattempted">("all");

  // Timer Ref
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  // Handle Starting a Test
  const handleStartTest = (booklet: OIRBooklet, mode: ExamMode) => {
    setSelectedBooklet(booklet);
    setExamMode(mode);
    setTestState("instruction");
  };

  const handleBeginLiveCBT = () => {
    setCurrentIdx(0);
    setUserAnswers({});
    setMarkedForReview(new Set());
    setVisitedQuestions(new Set([0]));
    setTimeRemainingSeconds(selectedBooklet.durationMinutes * 60);
    setTestState("testing");
  };

  // Timer Effect
  useEffect(() => {
    if (testState === "testing" && examMode === "cbt") {
      timerRef.current = setInterval(() => {
        setTimeRemainingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerRef.current!);
            handleFinalSubmit();
            return 0;
          }
          if (prev <= 120 && !isTimeCritical) {
            setIsTimeCritical(true);
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [testState, examMode, isTimeCritical]);

  // Track Question Visits
  const navigateToQuestion = (idx: number) => {
    if (idx >= 0 && idx < selectedBooklet.questions.length) {
      setCurrentIdx(idx);
      setVisitedQuestions((prev) => new Set(prev).add(idx));
      setShowMobilePalette(false);
    }
  };

  // User Answer Selection
  const handleSelectOption = (key: string) => {
    const qNum = selectedBooklet.questions[currentIdx].questionNumber;
    setUserAnswers((prev) => ({
      ...prev,
      [qNum]: key
    }));
  };

  const handleClearResponse = () => {
    const qNum = selectedBooklet.questions[currentIdx].questionNumber;
    setUserAnswers((prev) => {
      const next = { ...prev };
      delete next[qNum];
      return next;
    });
  };

  const handleToggleMarkReview = () => {
    const qNum = selectedBooklet.questions[currentIdx].questionNumber;
    setMarkedForReview((prev) => {
      const next = new Set(prev);
      if (next.has(qNum)) {
        next.delete(qNum);
      } else {
        next.add(qNum);
      }
      return next;
    });
  };

  const handleSaveAndNext = () => {
    if (currentIdx < selectedBooklet.questions.length - 1) {
      navigateToQuestion(currentIdx + 1);
    } else {
      setShowSubmitModal(true);
    }
  };

  // Final Test Submission & Scoring
  const handleFinalSubmit = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setShowSubmitModal(false);

    let correctCount = 0;
    let incorrectCount = 0;
    let attemptedCount = 0;

    selectedBooklet.questions.forEach((q) => {
      const ans = userAnswers[q.questionNumber];
      if (ans !== undefined) {
        attemptedCount++;
        if (ans.trim().toLowerCase() === q.correctOption.trim().toLowerCase()) {
          correctCount++;
        } else {
          incorrectCount++;
        }
      }
    });

    const score = correctCount * selectedBooklet.markingScheme.correct;
    const accuracy = attemptedCount > 0 ? (correctCount / attemptedCount) * 100 : 0;
    const ratingData = calculateOirRating(score, selectedBooklet.questions.length);

    const timeSpent = selectedBooklet.durationMinutes * 60 - timeRemainingSeconds;

    const result: OIRTestResult = {
      bookletId: selectedBooklet.id,
      totalQuestions: selectedBooklet.questions.length,
      attempted: attemptedCount,
      correct: correctCount,
      incorrect: incorrectCount,
      score,
      accuracyPct: Math.round(accuracy),
      oirRating: ratingData.oirRating,
      screenInProbabilityPct: ratingData.screenInProbabilityPct,
      timeSpentSeconds: timeSpent,
      userAnswers
    };

    setTestResult(result);
    setTestState("scorecard");
  };

  // Helper formatting for seconds to MM:SS
  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const currentQuestion: OIRQuestion | undefined = selectedBooklet.questions[currentIdx];
  const currentQNum = currentQuestion ? currentQuestion.questionNumber : 1;
  const isCurrentMarked = markedForReview.has(currentQNum);
  const isCurrentAnswered = userAnswers[currentQNum] !== undefined;

  // Filtered Booklets for Catalog
  const filteredBooklets = ALL_OIR_BOOKLETS.filter((b) => {
    if (catalogFilter === "all") return true;
    if (catalogFilter === "authentic") return b.source === "Authentic DIPR";
    if (catalogFilter === "dde") return b.source === "DDE";
    if (catalogFilter === "byjus") return b.source === "Byjus";
    if (catalogFilter === "non_verbal") return b.category === "non_verbal";
    if (catalogFilter === "verbal") return b.category === "verbal";
    return true;
  });

  return (
    <div className="min-h-screen bg-[var(--canvas-bg)] text-[var(--fg-primary)] flex flex-col font-mono selection:bg-[var(--primary-accent)] selection:text-white">
      {/* 1. TOP HEADER / APP BAR */}
      <header className="sticky top-0 z-40 bg-[var(--canvas-surface)]/90 backdrop-blur-md border-b border-[var(--canvas-border)] px-4 py-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Left: Branding & Breadcrumb */}
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="p-1.5 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] hover:bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors cursor-pointer"
              title="Return to Dashboard"
            >
              <ArrowLeft className="w-4 h-4" />
            </Link>

            <div className="flex items-center gap-2">
              <CrossedSwords className="w-6 h-6" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                    SSB <span className="text-[var(--gold-accent)]">ASTRA</span>
                  </span>
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30 font-bold hidden sm:inline-block">
                    DIPR OIR CBT
                  </span>
                </div>
                <p className="text-[9px] text-[var(--fg-muted)] hidden md:block">
                  Officer Intelligence Rating Examination System
                </p>
              </div>
            </div>
          </div>

          {/* Center: Live Timer if in Test */}
          {testState === "testing" && (
            <div className="flex items-center gap-2">
              <div
                className={`flex items-center gap-2 px-3 py-1.5 rounded-xl border text-xs font-bold font-mono transition-all ${
                  isTimeCritical
                    ? "bg-red-500/15 border-red-500 text-red-500 animate-pulse shadow-sm shadow-red-500/20"
                    : "bg-[var(--canvas-surface-subtle)] border-[var(--canvas-border)] text-[var(--fg-primary)]"
                }`}
              >
                <Clock className="w-4 h-4 text-[var(--gold-accent)]" />
                <span>TIME REMAINING:</span>
                <span className="text-sm font-black tracking-widest">
                  {formatTime(timeRemainingSeconds)}
                </span>
              </div>
            </div>
          )}

          {/* Right: Actions & Theme Toggle */}
          <div className="flex items-center gap-2">
            {testState === "testing" && (
              <>
                <button
                  type="button"
                  onClick={() => setShowMobilePalette(!showMobilePalette)}
                  className="lg:hidden p-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] text-[var(--fg-primary)]"
                  title="Toggle Question Palette"
                >
                  <Menu className="w-4 h-4" />
                </button>

                <button
                  type="button"
                  onClick={() => setShowSubmitModal(true)}
                  className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                >
                  Submit Test
                </button>
              </>
            )}

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 2. BODY VIEWS BASED ON TEST STATE */}
      <main className="flex-1 flex flex-col">
        {/* VIEW A: BOOKLET SELECTION CATALOG */}
        {testState === "catalog" && (
          <div className="max-w-6xl mx-auto w-full p-4 sm:p-6 space-y-6">
            {/* Header Banner */}
            <div className="p-6 rounded-2xl border-2 border-[var(--primary-accent)]/30 bg-gradient-to-r from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] shadow-md relative overflow-hidden space-y-3">
              <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--gold-accent)]/5 rounded-full blur-3xl pointer-events-none" />

              <div className="flex items-center gap-2 text-xs font-bold text-[var(--primary-accent)] uppercase tracking-wider">
                <Shield className="w-4 h-4 text-[var(--gold-accent)]" />
                <span>MODULAR ARMED FORCES DIPR OIR BATTERY</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black tracking-wide text-[var(--fg-primary)]">
                Officer Intelligence Rating (OIR) CBT Engine
              </h1>

              <p className="text-xs text-[var(--fg-secondary)] font-sans max-w-3xl leading-relaxed">
                Authentic, high-resolution digitized test booklets administered across Indian Army, Navy, and Air Force Selection Boards (11 SSB, 33 SSB, 24 SSB, 1 AFSB, 4 AFSB, NSB Vizag). Practice under strict official micro-timers with the complete <strong>Testbook-style CBT interface</strong>, dynamic 2 to 5 option schemas, and authentic DIPR OIR-1 to OIR-5 rating generation.
              </p>

              <div className="flex items-center gap-3 pt-2 flex-wrap text-[11px] font-mono">
                <span className="px-2.5 py-1 rounded-lg bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-emerald-500 font-bold flex items-center gap-1.5">
                  <CheckCircle2 className="w-3.5 h-3.5" /> Authentic Sets + DDE + Byju&apos;s
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--gold-accent)] font-bold flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" /> Strict Official Timers
                </span>
                <span className="px-2.5 py-1 rounded-lg bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--primary-accent)] font-bold flex items-center gap-1.5">
                  <Layers className="w-3.5 h-3.5" /> Modular Question Building Blocks
                </span>
              </div>
            </div>

            {/* Filter Tabs */}
            <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3 flex-wrap gap-2">
              <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex-wrap">
                <button
                  type="button"
                  onClick={() => setCatalogFilter("all")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    catalogFilter === "all"
                      ? "bg-[var(--primary-accent)] text-white shadow-sm"
                      : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  All Sets ({ALL_OIR_BOOKLETS.length})
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogFilter("authentic")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    catalogFilter === "authentic"
                      ? "bg-[var(--primary-accent)] text-white shadow-sm"
                      : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  Authentic DIPR Sets
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogFilter("dde")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    catalogFilter === "dde"
                      ? "bg-[var(--primary-accent)] text-white shadow-sm"
                      : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  DDE Sets
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogFilter("byjus")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    catalogFilter === "byjus"
                      ? "bg-[var(--primary-accent)] text-white shadow-sm"
                      : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  Byju&apos;s Mocks
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogFilter("non_verbal")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    catalogFilter === "non_verbal"
                      ? "bg-[var(--primary-accent)] text-white shadow-sm"
                      : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  Non-Verbal / Spatial
                </button>
                <button
                  type="button"
                  onClick={() => setCatalogFilter("verbal")}
                  className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all cursor-pointer ${
                    catalogFilter === "verbal"
                      ? "bg-[var(--primary-accent)] text-white shadow-sm"
                      : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
                  }`}
                >
                  Verbal Reasoning
                </button>
              </div>

              <span className="text-xs text-[var(--fg-muted)]">
                Select a booklet to launch exam mode or practice mode
              </span>
            </div>

            {/* Booklet Cards Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {filteredBooklets.map((booklet) => (
                <div
                  key={booklet.id}
                  className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-[var(--primary-accent)]/60 transition-all shadow-sm flex flex-col justify-between group relative overflow-hidden"
                >
                  <div className="absolute top-0 right-0 w-28 h-28 bg-[var(--primary-accent)]/5 rounded-full blur-2xl pointer-events-none" />

                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] font-bold border border-[var(--gold-accent)]/30">
                        {booklet.source.toUpperCase()} • {booklet.bookletNumber}
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded uppercase tracking-wider ${
                          booklet.category === "non_verbal"
                            ? "bg-purple-500/15 text-purple-400 border border-purple-500/30"
                            : booklet.category === "verbal"
                            ? "bg-blue-500/15 text-blue-400 border border-blue-500/30"
                            : "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                        }`}
                      >
                        {booklet.category === "non_verbal"
                          ? "Non-Verbal / Spatial"
                          : booklet.category === "verbal"
                          ? "Verbal Reasoning"
                          : "Combined Battery"}
                      </span>
                    </div>

                    <h2 className="text-sm font-bold text-[var(--fg-primary)] group-hover:text-[var(--primary-accent)] transition-colors leading-snug">
                      {booklet.title}
                    </h2>

                    <p className="text-[11px] text-[var(--fg-muted)] font-sans line-clamp-3 leading-relaxed">
                      {booklet.description}
                    </p>

                    <div className="grid grid-cols-2 gap-2 text-[10px] font-mono pt-1">
                      <div className="p-2 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                        <span className="text-[var(--fg-muted)] block">QUESTIONS</span>
                        <span className="font-bold text-[var(--fg-primary)] text-xs">
                          {booklet.totalQuestions} Questions
                        </span>
                      </div>
                      <div className="p-2 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                        <span className="text-[var(--fg-muted)] block">TIME ALLOTTED</span>
                        <span className="font-bold text-[var(--gold-accent)] text-xs">
                          {booklet.durationMinutes} Minutes
                        </span>
                      </div>
                    </div>

                    {booklet.boardLocations && (
                      <div className="text-[10px] text-[var(--fg-muted)] flex items-center gap-1.5 flex-wrap">
                        <span className="font-bold text-[var(--fg-secondary)]">Boards:</span>
                        <span>{booklet.boardLocations.join(" • ")}</span>
                      </div>
                    )}
                  </div>

                  {/* Action Buttons */}
                  <div className="pt-4 mt-3 border-t border-[var(--canvas-border)] grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => handleStartTest(booklet, "practice")}
                      className="py-2 px-3 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] bg-[var(--canvas-surface-subtle)] text-[11px] font-bold text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)] transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                    >
                      <Eye className="w-3.5 h-3.5 text-[var(--fg-muted)]" />
                      <span>Practice</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => handleStartTest(booklet, "cbt")}
                      className="py-2 px-3 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-[11px] font-bold transition-all shadow-sm flex items-center justify-center gap-1.5 active:scale-95 cursor-pointer"
                    >
                      <PlayCircle className="w-3.5 h-3.5" />
                      <span>Start CBT</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Official 2-Set Battery Simulation Card */}
            <div className="p-5 sm:p-6 rounded-2xl border-2 border-[var(--gold-accent)]/50 bg-[var(--canvas-surface)] shadow-md flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--gold-accent)]/20 text-[var(--gold-accent)] border border-[var(--gold-accent)]/40">
                    FULL OFFICIAL STAGE-1 SIMULATION
                  </span>
                  <span className="text-xs text-[var(--fg-muted)]">Verbal + Non-Verbal Combined</span>
                </div>
                <h3 className="text-base sm:text-lg font-extrabold text-[var(--fg-primary)]">
                  Standard 2-Booklet Combined SSB Screening Battery
                </h3>
                <p className="text-xs text-[var(--fg-secondary)] font-sans max-w-2xl leading-relaxed">
                  In actual SSB boards, candidates sit for <strong>Set 1 (Verbal, 40 Qs)</strong> followed immediately by <strong>Set 2 (Non-Verbal, 40 Qs)</strong> with a 1-minute instructions transition. Your final DIPR OIR Rating is derived from the composite score across both sets.
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleStartTest(BOOKLET_35, "cbt")}
                className="w-full md:w-auto px-6 py-3 rounded-xl bg-[var(--gold-accent)] hover:brightness-110 text-black font-extrabold text-xs tracking-wider transition-all shadow-md shrink-0 flex items-center justify-center gap-2 cursor-pointer"
              >
                <Zap className="w-4 h-4 fill-black" />
                <span>LAUNCH FULL 2-SET BATTERY</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* VIEW B: TEST INSTRUCTION MODAL / SCREEN */}
        {testState === "instruction" && (
          <div className="max-w-3xl mx-auto w-full p-4 sm:p-6 my-auto space-y-6 animate-in fade-in duration-200">
            <div className="p-6 rounded-2xl border-2 border-[var(--primary-accent)] bg-[var(--canvas-surface)] shadow-2xl space-y-6">
              <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-4">
                <div>
                  <span className="text-[10px] font-bold text-[var(--gold-accent)] uppercase tracking-wider block">
                    SSB STAGE-1 PRE-EXAMINATION BRIEFING
                  </span>
                  <h2 className="text-lg font-black text-[var(--fg-primary)]">
                    {selectedBooklet.title}
                  </h2>
                </div>
                <span className="text-xs font-mono px-3 py-1 rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30 font-bold">
                  {examMode === "cbt" ? "CBT Timed Mode" : "Untimed Practice Mode"}
                </span>
              </div>

              {/* Instructions List */}
              <div className="space-y-3 text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--primary-accent)]/20 text-[var(--primary-accent)] flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                    1
                  </div>
                  <div>
                    <span className="font-bold text-[var(--fg-primary)] block">Total Questions & Duration:</span>
                    This booklet contains <strong>{selectedBooklet.totalQuestions} questions</strong>. The total time allowed is <strong>{selectedBooklet.durationMinutes} minutes</strong> ({selectedBooklet.durationMinutes * 60} seconds).
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                  <div className="w-6 h-6 rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                    2
                  </div>
                  <div>
                    <span className="font-bold text-[var(--fg-primary)] block">Marking Scheme (Official DIPR Rules):</span>
                    Each correct answer yields <strong>+{selectedBooklet.markingScheme.correct} mark</strong>. There is <strong>NO negative marking</strong>. Attempt every question before the timer elapses.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                  <div className="w-6 h-6 rounded-full bg-purple-500/20 text-purple-400 flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                    3
                  </div>
                  <div>
                    <span className="font-bold text-[var(--fg-primary)] block">Modular Figure Graphics & Dynamic Choices:</span>
                    All non-verbal spatial cube configurations are accurately projected in 3D isometric view. Options display the exact candidate cubes (Cube 1, Cube 2, Cube 3) with their respective symbols so you can compare and mark directly.
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                  <div className="w-6 h-6 rounded-full bg-[var(--gold-accent)]/20 text-[var(--gold-accent)] flex items-center justify-center shrink-0 font-mono font-bold text-xs">
                    4
                  </div>
                  <div>
                    <span className="font-bold text-[var(--fg-primary)] block">Question Palette Color Indicators:</span>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-2 font-mono text-[10px]">
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-emerald-600 inline-block" /> Answered
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-red-500/30 border border-red-500 inline-block" /> Not Answered
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-purple-600 inline-block" /> Marked for Review
                      </span>
                      <span className="flex items-center gap-1.5">
                        <span className="w-3 h-3 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] inline-block" /> Not Visited
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-4 border-t border-[var(--canvas-border)]">
                <button
                  type="button"
                  onClick={() => setTestState("catalog")}
                  className="px-4 py-2.5 rounded-xl border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all cursor-pointer"
                >
                  Back to Booklet Catalog
                </button>

                <button
                  type="button"
                  onClick={handleBeginLiveCBT}
                  className="px-6 py-2.5 rounded-xl bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <span>I AM READY TO BEGIN</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* VIEW C: ACTIVE CBT TEST ENGINE (TESTBOOK STYLE) */}
        {testState === "testing" && currentQuestion && (
          <div className="flex-1 flex flex-col lg:flex-row overflow-hidden max-w-[1500px] w-full mx-auto">
            {/* LEFT / MAIN VIEWPORT (70%) */}
            <div className="flex-1 flex flex-col justify-between p-4 sm:p-6 overflow-y-auto border-r border-[var(--canvas-border)] space-y-6">
              <div className="space-y-4">
                {/* Question Info Bar */}
                <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3">
                  <div className="flex items-center gap-3">
                    <span className="text-sm sm:text-base font-black tracking-wide text-[var(--fg-primary)]">
                      Question {currentIdx + 1} of {selectedBooklet.questions.length}
                    </span>
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30 uppercase">
                      {currentQuestion.subType.replace(/_/g, " ")}
                    </span>
                    <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--canvas-surface-subtle)] text-[var(--fg-muted)] border border-[var(--canvas-border)] hidden sm:inline-block">
                      ID: {currentQuestion.id}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 text-xs font-mono">
                    <span className="text-emerald-500 font-bold">+{selectedBooklet.markingScheme.correct}</span>
                    <span className="text-[var(--fg-muted)]">|</span>
                    <span className="text-red-400 font-bold">-{selectedBooklet.markingScheme.incorrect}</span>
                  </div>
                </div>

                {/* Question Prompt */}
                <div className="space-y-4">
                  <h3 className="text-sm sm:text-base font-bold text-[var(--fg-primary)] leading-relaxed">
                    {currentQuestion.promptText}
                  </h3>

                  {/* Dynamic Problem Figures from Question Data */}
                  {currentQuestion.figures && currentQuestion.figures.type !== "none" && (
                    <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-4">
                      {/* Subtype A: Cube Group Classification (Group A vs Group B) */}
                      {currentQuestion.figures.type === "cubes_group" && (
                        <div className="space-y-3">
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                            {/* Group A Box */}
                            <div className="p-3.5 rounded-xl bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-center space-y-2 shadow-sm">
                              <span className="text-xs font-black text-[var(--gold-accent)] block uppercase tracking-wider">
                                GROUP A
                              </span>
                              <div className="flex flex-wrap items-center justify-center gap-3">
                                {currentQuestion.figures.groupA?.map((cube, idx) => (
                                  <CubeRenderer
                                    key={idx}
                                    label={cube.label}
                                    faces={cube.faces}
                                    size={80}
                                  />
                                ))}
                              </div>
                            </div>

                            {/* Group B Box */}
                            <div className="p-3.5 rounded-xl bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-center space-y-2 shadow-sm">
                              <span className="text-xs font-black text-[var(--fg-muted)] block uppercase tracking-wider">
                                GROUP B
                              </span>
                              <div className="flex flex-wrap items-center justify-center gap-3">
                                {currentQuestion.figures.groupB?.map((cube, idx) => (
                                  <CubeRenderer
                                    key={idx}
                                    label={cube.label}
                                    faces={cube.faces}
                                    size={80}
                                  />
                                ))}
                              </div>
                            </div>
                          </div>

                          <p className="text-[11px] text-[var(--fg-muted)] text-center font-sans">
                            Identify the orientation property distinguishing Group A and pick the candidate cube below.
                          </p>
                        </div>
                      )}

                      {/* Subtype B: Cube Comparison (Cube 1 vs Cube 2) */}
                      {currentQuestion.figures.type === "cubes_compare" && (
                        <div className="flex flex-col items-center justify-center py-2 space-y-2">
                          <div className="flex items-center justify-center gap-6 sm:gap-12">
                            {currentQuestion.figures.cubeA && (
                              <CubeRenderer
                                label={currentQuestion.figures.cubeA.label || "Cube 1"}
                                faces={currentQuestion.figures.cubeA.faces}
                                size={110}
                              />
                            )}

                            <div className="px-3 py-1 rounded-full bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-xs font-black text-[var(--gold-accent)] shadow-sm">
                              VS
                            </div>

                            {currentQuestion.figures.cubeB && (
                              <CubeRenderer
                                label={currentQuestion.figures.cubeB.label || "Cube 2"}
                                faces={currentQuestion.figures.cubeB.faces}
                                size={110}
                              />
                            )}
                          </div>
                          <p className="text-[11px] text-[var(--fg-muted)] text-center font-sans">
                            Determine if Cube 1 and Cube 2 are rotated views of the identical cube.
                          </p>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Dynamic Options List with Embedded Visual Cube Renders */}
                  <div className="space-y-3 pt-2">
                    {currentQuestion.options.map((opt) => {
                      const isSelected = userAnswers[currentQNum] === opt.key;

                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleSelectOption(opt.key)}
                          className={`w-full p-3.5 sm:p-4 rounded-xl border text-left transition-all flex items-center justify-between cursor-pointer group ${
                            isSelected
                              ? "border-[var(--primary-accent)] bg-[var(--primary-accent)]/10 shadow-md ring-1 ring-[var(--primary-accent)]"
                              : "border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-[var(--fg-secondary)]/50 hover:bg-[var(--canvas-surface-subtle)]"
                          }`}
                        >
                          <div className="flex items-center gap-3.5 flex-wrap sm:flex-nowrap">
                            {/* Option Key Badge */}
                            <div
                              className={`w-7 h-7 rounded-lg border flex items-center justify-center font-mono font-bold text-xs shrink-0 transition-colors ${
                                isSelected
                                  ? "border-[var(--primary-accent)] bg-[var(--primary-accent)] text-white"
                                  : "border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)] group-hover:border-[var(--primary-accent)]/50"
                              }`}
                            >
                              {opt.key}
                            </div>

                            {/* Render Cube Drawing if Option Contains a 3D Cube */}
                            {opt.cubeFaces && (
                              <div className="shrink-0 p-1 bg-[var(--canvas-surface-subtle)] rounded-lg border border-[var(--canvas-border)] shadow-sm">
                                <CubeRenderer faces={opt.cubeFaces} size={65} highlight={isSelected} />
                              </div>
                            )}

                            {/* Option Text Label */}
                            {opt.text && (
                              <span className="text-xs sm:text-sm text-[var(--fg-primary)] font-semibold">
                                {opt.text}
                              </span>
                            )}
                          </div>

                          {/* Selection Indicator Dot */}
                          <div
                            className={`w-5 h-5 rounded-full border flex items-center justify-center shrink-0 transition-colors ${
                              isSelected
                                ? "border-[var(--primary-accent)] bg-[var(--primary-accent)] text-white"
                                : "border-[var(--canvas-border)]"
                            }`}
                          >
                            {isSelected && <div className="w-2 h-2 rounded-full bg-white" />}
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Practice Mode: Instant Explanation Reveal */}
                  {examMode === "practice" && userAnswers[currentQNum] !== undefined && (
                    <div className="p-4 rounded-xl border border-emerald-500/40 bg-emerald-500/10 space-y-1.5 animate-in fade-in duration-150">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>
                          Correct Answer: Option {currentQuestion.correctOption}
                        </span>
                      </div>
                      <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                        {currentQuestion.explanation}
                      </p>
                    </div>
                  )}
                </div>
              </div>

              {/* Bottom Testbook-style Action Bar */}
              <div className="pt-4 border-t border-[var(--canvas-border)] flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={handleToggleMarkReview}
                    className={`px-3 py-2 rounded-lg border text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 ${
                      isCurrentMarked
                        ? "bg-purple-600 text-white border-purple-600"
                        : "border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] hover:border-purple-500 text-purple-400"
                    }`}
                  >
                    <Flag className="w-3.5 h-3.5" />
                    <span>{isCurrentMarked ? "Marked for Review" : "Mark for Review"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleClearResponse}
                    disabled={!isCurrentAnswered}
                    className="px-3 py-2 rounded-lg border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs text-[var(--fg-muted)] hover:text-red-400 transition-all disabled:opacity-30 disabled:cursor-not-allowed cursor-pointer"
                  >
                    Clear Response
                  </button>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => navigateToQuestion(currentIdx - 1)}
                    disabled={currentIdx === 0}
                    className="px-3 py-2 rounded-lg border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold disabled:opacity-30 disabled:cursor-not-allowed flex items-center gap-1 cursor-pointer"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    <span>Previous</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleSaveAndNext}
                    className="px-5 py-2 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 flex items-center gap-1.5 cursor-pointer"
                  >
                    <span>{currentIdx === selectedBooklet.questions.length - 1 ? "Review & Finish" : "Save & Next"}</span>
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>

            {/* RIGHT SIDEBAR: QUESTION PALETTE (30% ON DESKTOP) */}
            <aside
              className={`${
                showMobilePalette ? "fixed inset-0 z-50 bg-[var(--canvas-bg)] p-4 overflow-y-auto" : "hidden lg:flex"
              } lg:w-80 flex flex-col justify-between bg-[var(--canvas-surface)] p-4 sm:p-5 border-l border-[var(--canvas-border)] space-y-4`}
            >
              <div className="space-y-4">
                {/* Header in mobile */}
                <div className="flex items-center justify-between pb-2 border-b border-[var(--canvas-border)]">
                  <div className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-[var(--gold-accent)]" />
                    <span className="text-xs font-extrabold tracking-wider">
                      QUESTION PALETTE
                    </span>
                  </div>
                  {showMobilePalette && (
                    <button
                      type="button"
                      onClick={() => setShowMobilePalette(false)}
                      className="p-1 rounded-lg border border-[var(--canvas-border)] text-[var(--fg-muted)]"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>

                {/* Status Legend Counters */}
                <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                    <span className="w-3.5 h-3.5 rounded bg-emerald-600 text-white font-bold flex items-center justify-center text-[9px]">
                      {Object.keys(userAnswers).length}
                    </span>
                    <span className="text-[var(--fg-secondary)]">Answered</span>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                    <span className="w-3.5 h-3.5 rounded bg-red-500/20 text-red-400 border border-red-500/40 font-bold flex items-center justify-center text-[9px]">
                      {selectedBooklet.questions.length - Object.keys(userAnswers).length}
                    </span>
                    <span className="text-[var(--fg-secondary)]">Unanswered</span>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                    <span className="w-3.5 h-3.5 rounded bg-purple-600 text-white font-bold flex items-center justify-center text-[9px]">
                      {markedForReview.size}
                    </span>
                    <span className="text-[var(--fg-secondary)]">Marked Review</span>
                  </div>

                  <div className="flex items-center gap-2 p-1.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                    <span className="w-3.5 h-3.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--fg-muted)] font-bold flex items-center justify-center text-[9px]">
                      {selectedBooklet.questions.length - visitedQuestions.size}
                    </span>
                    <span className="text-[var(--fg-secondary)]">Not Visited</span>
                  </div>
                </div>

                {/* Number Grid (1 to N) */}
                <div className="space-y-1.5">
                  <span className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-wider block">
                    Choose a Question:
                  </span>
                  <div className="grid grid-cols-5 gap-2 max-h-[380px] overflow-y-auto p-1">
                    {selectedBooklet.questions.map((q, idx) => {
                      const isAnswered = userAnswers[q.questionNumber] !== undefined;
                      const isMarked = markedForReview.has(q.questionNumber);
                      const isCurrent = idx === currentIdx;
                      const isVisited = visitedQuestions.has(idx);

                      let stateStyle = "bg-[var(--canvas-surface-subtle)] text-[var(--fg-muted)] border-[var(--canvas-border)]";

                      if (isMarked && isAnswered) {
                        stateStyle = "bg-purple-600 text-white border-purple-500 ring-2 ring-emerald-400";
                      } else if (isMarked) {
                        stateStyle = "bg-purple-600 text-white border-purple-500";
                      } else if (isAnswered) {
                        stateStyle = "bg-emerald-600 text-white border-emerald-500";
                      } else if (isVisited) {
                        stateStyle = "bg-red-500/15 text-red-400 border-red-500/30";
                      }

                      return (
                        <button
                          key={q.questionNumber}
                          type="button"
                          onClick={() => navigateToQuestion(idx)}
                          className={`h-9 rounded-lg border text-xs font-mono font-bold transition-all relative flex items-center justify-center cursor-pointer ${stateStyle} ${
                            isCurrent ? "ring-2 ring-[var(--gold-accent)] scale-105" : "hover:brightness-110"
                          }`}
                        >
                          {q.questionNumber}
                          {isMarked && isAnswered && (
                            <span className="absolute -top-1 -right-1 w-2.5 h-2.5 rounded-full bg-emerald-400 border border-white" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Sidebar Bottom CTA */}
              <button
                type="button"
                onClick={() => setShowSubmitModal(true)}
                className="w-full py-2.5 rounded-xl bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer"
              >
                Submit Examination
              </button>
            </aside>
          </div>
        )}

        {/* VIEW D: DIAGNOSTIC SCORECARD & OFFICIAL DIPR OIR REPORT */}
        {testState === "scorecard" && testResult && (
          <div className="max-w-5xl mx-auto w-full p-4 sm:p-6 space-y-6 animate-in fade-in duration-200">
            {/* OIR Master Grade Card */}
            {(() => {
              const ratingData = calculateOirRating(testResult.score, testResult.totalQuestions);

              return (
                <div className="p-6 rounded-2xl border-2 border-[var(--gold-accent)]/50 bg-[var(--canvas-surface)] shadow-xl relative overflow-hidden space-y-6">
                  <div className="absolute top-0 right-0 w-80 h-80 bg-[var(--gold-accent)]/5 rounded-full blur-3xl pointer-events-none" />

                  <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--canvas-border)] pb-5">
                    <div>
                      <div className="flex items-center gap-2">
                        <Award className="w-5 h-5 text-[var(--gold-accent)]" />
                        <span className="text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                          DIPR OFFICER INTELLIGENCE RATING (OIR) REPORT
                        </span>
                      </div>
                      <h2 className="text-xl sm:text-2xl font-black text-[var(--fg-primary)] mt-1">
                        {selectedBooklet.title}
                      </h2>
                    </div>

                    <div className="flex items-center gap-3">
                      <div className={`px-4 py-2 rounded-xl border text-center ${ratingData.badgeColor}`}>
                        <span className="text-[10px] font-bold block uppercase tracking-wider">OFFICIAL RATING</span>
                        <span className="text-xl font-black">{ratingData.gradeLabel}</span>
                      </div>
                    </div>
                  </div>

                  {/* Probability Meter & Stats Row */}
                  <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                    <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                      <span className="text-[10px] text-[var(--fg-muted)] block">STAGE-1 CLEARANCE PROBABILITY</span>
                      <span className="text-2xl font-black text-emerald-500">
                        {ratingData.screenInProbabilityPct}%
                      </span>
                      <div className="w-full bg-[var(--canvas-border)] h-1.5 rounded-full overflow-hidden mt-1">
                        <div
                          className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                          style={{ width: `${ratingData.screenInProbabilityPct}%` }}
                        />
                      </div>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                      <span className="text-[10px] text-[var(--fg-muted)] block">RAW SCORE</span>
                      <span className="text-2xl font-black text-[var(--fg-primary)]">
                        {testResult.score} / {testResult.totalQuestions}
                      </span>
                      <span className="text-[10px] text-[var(--fg-muted)] block">
                        Marks Yielded (+1, -0)
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                      <span className="text-[10px] text-[var(--fg-muted)] block">ACCURACY RATE</span>
                      <span className="text-2xl font-black text-[var(--primary-accent)]">
                        {testResult.accuracyPct}%
                      </span>
                      <span className="text-[10px] text-[var(--fg-muted)] block">
                        {testResult.correct} Correct, {testResult.incorrect} Incorrect
                      </span>
                    </div>

                    <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                      <span className="text-[10px] text-[var(--fg-muted)] block">TIME EXPENDITURE</span>
                      <span className="text-2xl font-black text-[var(--gold-accent)]">
                        {formatTime(testResult.timeSpentSeconds)}
                      </span>
                      <span className="text-[10px] text-[var(--fg-muted)] block">
                        Avg: {Math.round(testResult.timeSpentSeconds / Math.max(testResult.attempted, 1))}s / Q
                      </span>
                    </div>
                  </div>

                  {/* Assessor Commentary Box */}
                  <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1.5">
                    <span className="text-[10px] font-bold text-[var(--gold-accent)] uppercase tracking-wider block">
                      OFFICER PSYCHOLOGICAL APPRAISAL & SCREENING LEVERAGE
                    </span>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                      {ratingData.assessorCommentary}
                    </p>
                  </div>

                  {/* CTAs */}
                  <div className="flex items-center justify-between pt-2 border-t border-[var(--canvas-border)] flex-wrap gap-2">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleStartTest(selectedBooklet, examMode)}
                        className="px-4 py-2 rounded-xl border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                      >
                        <RotateCcw className="w-3.5 h-3.5" />
                        <span>Retake Booklet</span>
                      </button>

                      <button
                        type="button"
                        onClick={() => setTestState("catalog")}
                        className="px-4 py-2 rounded-xl border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all cursor-pointer"
                      >
                        Choose Other Booklet
                      </button>
                    </div>

                    <Link
                      href="/screening/ppdt"
                      className="px-5 py-2 rounded-xl bg-[var(--gold-accent)] hover:brightness-110 text-black font-extrabold text-xs tracking-wider transition-all shadow-md flex items-center gap-1.5"
                    >
                      <span>PROCEED TO PPDT SIMULATOR</span>
                      <ChevronRight className="w-4 h-4" />
                    </Link>
                  </div>
                </div>
              );
            })()}

            {/* Question Review Section */}
            <div className="p-6 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-4">
              <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3 flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <FileText className="w-4 h-4 text-[var(--primary-accent)]" />
                  <span className="text-xs font-bold uppercase tracking-wider">
                    DETAILED QUESTION-BY-QUESTION SOLUTIONS
                  </span>
                </div>

                <div className="flex items-center gap-1.5 p-1 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] text-[11px]">
                  <button
                    type="button"
                    onClick={() => setReviewFilter("all")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      reviewFilter === "all" ? "bg-[var(--primary-accent)] text-white" : "text-[var(--fg-muted)]"
                    }`}
                  >
                    All ({selectedBooklet.questions.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter("correct")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      reviewFilter === "correct" ? "bg-emerald-600 text-white" : "text-[var(--fg-muted)]"
                    }`}
                  >
                    Correct ({testResult.correct})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter("incorrect")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      reviewFilter === "incorrect" ? "bg-red-600 text-white" : "text-[var(--fg-muted)]"
                    }`}
                  >
                    Incorrect ({testResult.incorrect})
                  </button>
                  <button
                    type="button"
                    onClick={() => setReviewFilter("unattempted")}
                    className={`px-2.5 py-1 rounded-lg font-bold transition-all cursor-pointer ${
                      reviewFilter === "unattempted" ? "bg-amber-600 text-white" : "text-[var(--fg-muted)]"
                    }`}
                  >
                    Skipped ({selectedBooklet.questions.length - testResult.attempted})
                  </button>
                </div>
              </div>

              {/* Questions List */}
              <div className="space-y-4">
                {selectedBooklet.questions
                  .filter((q) => {
                    const ans = testResult.userAnswers[q.questionNumber];
                    if (reviewFilter === "all") return true;
                    if (reviewFilter === "unattempted") return ans === undefined;
                    if (reviewFilter === "correct") {
                      return ans !== undefined && ans.trim().toLowerCase() === q.correctOption.trim().toLowerCase();
                    }
                    if (reviewFilter === "incorrect") {
                      return ans !== undefined && ans.trim().toLowerCase() !== q.correctOption.trim().toLowerCase();
                    }
                    return true;
                  })
                  .map((q) => {
                    const userAns = testResult.userAnswers[q.questionNumber];
                    const isCorrect =
                      userAns !== undefined && userAns.trim().toLowerCase() === q.correctOption.trim().toLowerCase();
                    const isSkipped = userAns === undefined;

                    return (
                      <div
                        key={q.questionNumber}
                        className={`p-4 rounded-xl border space-y-3 ${
                          isSkipped
                            ? "border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]/50"
                            : isCorrect
                            ? "border-emerald-500/40 bg-emerald-500/5"
                            : "border-red-500/40 bg-red-500/5"
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-bold text-[var(--fg-primary)]">
                              Q{q.questionNumber}.
                            </span>
                            <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--fg-secondary)]">
                              {q.subType.replace(/_/g, " ")}
                            </span>
                            <span className="text-[9px] text-[var(--fg-muted)]">
                              ID: {q.id}
                            </span>
                          </div>

                          <span
                            className={`text-[10px] font-bold px-2 py-0.5 rounded ${
                              isSkipped
                                ? "bg-amber-500/15 text-amber-500"
                                : isCorrect
                                ? "bg-emerald-500/15 text-emerald-500"
                                : "bg-red-500/15 text-red-500"
                            }`}
                          >
                            {isSkipped ? "SKIPPED" : isCorrect ? "CORRECT (+1)" : "INCORRECT (0)"}
                          </span>
                        </div>

                        <p className="text-xs sm:text-sm font-semibold text-[var(--fg-primary)]">
                          {q.promptText}
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                          {q.options.map((opt) => {
                            const isUserPick = userAns === opt.key;
                            const isAnswerKey = opt.key.trim().toLowerCase() === q.correctOption.trim().toLowerCase();

                            let optBorder = "border-[var(--canvas-border)] bg-[var(--canvas-surface)]";
                            if (isAnswerKey) {
                              optBorder = "border-emerald-500 bg-emerald-500/15 text-emerald-400 font-bold";
                            } else if (isUserPick) {
                              optBorder = "border-red-500 bg-red-500/15 text-red-400 font-bold";
                            }

                            return (
                              <div
                                key={opt.key}
                                className={`p-2.5 rounded-lg border flex items-center justify-between ${optBorder}`}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="font-mono font-bold">({opt.key})</span>
                                  {opt.cubeFaces && (
                                    <div className="p-0.5 bg-[var(--canvas-surface-subtle)] rounded border border-[var(--canvas-border)]">
                                      <CubeRenderer faces={opt.cubeFaces} size={45} />
                                    </div>
                                  )}
                                  {opt.text && <span>{opt.text}</span>}
                                </div>
                                {isAnswerKey && <Check className="w-3.5 h-3.5 text-emerald-500" />}
                                {!isAnswerKey && isUserPick && <X className="w-3.5 h-3.5 text-red-400" />}
                              </div>
                            );
                          })}
                        </div>

                        <div className="p-3 rounded-lg bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-xs font-sans text-[var(--fg-secondary)]">
                          <span className="font-bold text-[var(--fg-primary)] block mb-0.5">DIPR Solution:</span>
                          {q.explanation}
                        </div>
                      </div>
                    );
                  })}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. SUBMIT CONFIRMATION MODAL */}
      {showSubmitModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="fixed inset-0" onClick={() => setShowSubmitModal(false)} />
          <div className="relative z-10 w-full max-w-md bg-[var(--canvas-surface)] border-2 border-[var(--primary-accent)] rounded-2xl p-5 sm:p-6 shadow-2xl space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-500/15 border border-red-500/30 flex items-center justify-center text-red-500">
                <AlertCircle className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-[var(--fg-primary)]">
                  Confirm Examination Submission
                </h3>
                <p className="text-[11px] text-[var(--fg-muted)]">
                  Are you sure you wish to submit {selectedBooklet.title}?
                </p>
              </div>
            </div>

            {/* Test Summary Breakdown */}
            <div className="grid grid-cols-2 gap-2 text-xs font-mono p-3 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
              <div>
                <span className="text-[var(--fg-muted)] block text-[10px]">TOTAL QUESTIONS</span>
                <span className="font-bold text-[var(--fg-primary)]">{selectedBooklet.questions.length}</span>
              </div>
              <div>
                <span className="text-[var(--fg-muted)] block text-[10px]">TIME REMAINING</span>
                <span className="font-bold text-[var(--gold-accent)]">{formatTime(timeRemainingSeconds)}</span>
              </div>
              <div>
                <span className="text-[var(--fg-muted)] block text-[10px]">ATTEMPTED</span>
                <span className="font-bold text-emerald-500">{Object.keys(userAnswers).length}</span>
              </div>
              <div>
                <span className="text-[var(--fg-muted)] block text-[10px]">UNANSWERED</span>
                <span className="font-bold text-red-400">
                  {selectedBooklet.questions.length - Object.keys(userAnswers).length}
                </span>
              </div>
            </div>

            {selectedBooklet.questions.length - Object.keys(userAnswers).length > 0 && (
              <p className="text-[11px] text-amber-500 font-sans">
                ⚠️ You still have <strong>{selectedBooklet.questions.length - Object.keys(userAnswers).length} unattempted questions</strong>. Remember that DIPR tests have NO negative marking.
              </p>
            )}

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--canvas-border)]">
              <button
                type="button"
                onClick={() => setShowSubmitModal(false)}
                className="px-4 py-2 rounded-lg border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all cursor-pointer"
              >
                Return to Test
              </button>

              <button
                type="button"
                onClick={handleFinalSubmit}
                className="px-5 py-2 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
              >
                Confirm & Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
