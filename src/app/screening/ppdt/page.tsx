"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import {
  ArrowLeft,
  Clock,
  Printer,
  UploadCloud,
  QrCode,
  CheckCircle2,
  AlertTriangle,
  PlayCircle,
  RotateCcw,
  Sparkles,
  Volume2,
  FileText,
  Shield,
  Layers,
  Award,
  ChevronRight,
  Eye,
  Info,
  Maximize2,
  HelpCircle,
  X,
  Shuffle,
  Check,
  Edit3,
  BookOpen,
  Lock
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import { examAudio } from "@/lib/audioBuzzer";
import { PPDTScenario, PPDTEvaluationResult, PPDTCycleState } from "@/data/ppdt/types";
import { PPDT_SCENARIOS, getScenarioById } from "@/data/ppdt/scenarios";
import {
  loadCycleState,
  saveCycleState,
  getActiveCycleScenario,
  getCycleMetrics,
  createFreshCycle,
  createDeterministicInitialCycle,
  consumeScenarioOnTestStart,
  recordEvaluationScore
} from "@/data/ppdt/cycleManager";

type PPDTPhase = "briefing" | "projection" | "writing" | "upload" | "evaluation";

export default function PPDTSimulatorPage() {
  const router = useRouter();

  // Cycle & Scenario State
  const [cycleState, setCycleState] = useState<PPDTCycleState>(() => createDeterministicInitialCycle(1));
  const [selectedScenario, setSelectedScenario] = useState<PPDTScenario>(PPDT_SCENARIOS[0]);
  const [isClientLoaded, setIsClientLoaded] = useState<boolean>(false);
  const [cycleNotice, setCycleNotice] = useState<string | null>(null);

  // Phase State
  const [phase, setPhase] = useState<PPDTPhase>("briefing");

  // Timers
  const [projectionSeconds, setProjectionSeconds] = useState<number>(30);
  const [writingSeconds, setWritingSeconds] = useState<number>(240); // 4 minutes = 240 seconds
  const [uploadLatencySeconds, setUploadLatencySeconds] = useState<number>(0);

  // Upload, Typing & QR Sync
  const [sessionId, setSessionId] = useState<string>("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showDemoSheetModal, setShowDemoSheetModal] = useState<boolean>(false);
  const [uploadedStoryImage, setUploadedStoryImage] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);
  const [evalError, setEvalError] = useState<string | null>(null);

  // Online Story Typing Option
  const [activeUploadTab, setActiveUploadTab] = useState<"upload" | "type">("upload");
  const [typedHeroAge, setTypedHeroAge] = useState<string>("23");
  const [typedHeroSex, setTypedHeroSex] = useState<string>("Male");
  const [typedHeroMood, setTypedHeroMood] = useState<string>("Positive (+)");
  const [typedAction, setTypedAction] = useState<string>("");
  const [typedStoryText, setTypedStoryText] = useState<string>("");

  // Audio testing state
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);

  // Evaluation Report State
  const [evaluationReport, setEvaluationReport] = useState<PPDTEvaluationResult | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const syncPollRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Cycle State & Session ID on Client Mount
  useEffect(() => {
    setIsClientLoaded(true);
    const loaded = loadCycleState();
    setCycleState(loaded);
    const activeScen = getActiveCycleScenario(loaded);
    setSelectedScenario(activeScen);

    const sid = `ppdt_${Date.now()}_${Math.random().toString(36).substring(2, 7)}`;
    setSessionId(sid);

    if (typeof window !== "undefined") {
      const mobileUrl = `${window.location.origin}/screening/ppdt/mobile-upload?session=${sid}`;
      QRCode.toDataURL(mobileUrl, { width: 260, margin: 2 })
        .then((url) => setQrCodeDataUrl(url))
        .catch((err) => console.error("QR Code Error:", err));
    }
  }, []);

  // 1. Projection Countdown (30s)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (phase === "projection") {
      interval = setInterval(() => {
        setProjectionSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            examAudio.playProjectionChime();
            setPhase("writing");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase]);

  // 2. Writing Countdown (4 Minutes = 240s)
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (phase === "writing") {
      interval = setInterval(() => {
        setWritingSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(interval!);
            examAudio.playPenDownBuzzer();
            setPhase("upload");
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase]);

  // 3. Post-Buzzer Upload Latency Tracker
  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    if (phase === "upload" && !uploadedStoryImage && !typedStoryText.trim()) {
      interval = setInterval(() => {
        setUploadLatencySeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase, uploadedStoryImage, typedStoryText]);

  // 4. Poll Mobile Sync endpoint if waiting on Desktop
  useEffect(() => {
    if (phase === "upload" && sessionId && !uploadedStoryImage) {
      syncPollRef.current = setInterval(async () => {
        try {
          const res = await fetch(`/api/screening/ppdt-sync?session=${sessionId}`);
          if (res.ok) {
            const data = await res.json();
            if (data.status === "ready" && data.imageBase64) {
              setUploadedStoryImage(`data:${data.mimeType};base64,${data.imageBase64}`);
              setShowQrModal(false);
              clearInterval(syncPollRef.current!);
            }
          }
        } catch {
          // Poll retry
        }
      }, 2000);
    }

    return () => {
      if (syncPollRef.current) clearInterval(syncPollRef.current);
    };
  }, [phase, sessionId, uploadedStoryImage]);

  // Handle Local Image Selection
  const handleLocalImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setUploadedStoryImage(reader.result as string);
    };
    reader.readAsDataURL(file);
  };

  /**
   * LAUNCH TEST ENGINE:
   * Consumes the scenario immediately upon launching projection.
   * Persists to localStorage the exact millisecond projection starts so that
   * even if the candidate closes the browser, reloads, or turns off the machine,
   * the next time they open the site they will NEVER see this picture again!
   */
  const launchProjectionTest = (scenarioToTest?: PPDTScenario) => {
    const target = scenarioToTest || selectedScenario || getActiveCycleScenario(cycleState);
    setSelectedScenario(target);

    // CRITICAL: Consume the picture the EXACT MOMENT projection starts!
    const { nextState, cycleCompleted } = consumeScenarioOnTestStart(cycleState, target.id);
    setCycleState(nextState);

    if (cycleCompleted) {
      setCycleNotice(
        `Cycle #${cycleState.cycleNumber} Complete! You have perceived all ${PPDT_SCENARIOS.length} unique pictures. Starting Cycle #${nextState.cycleNumber} with a freshly randomized shuffle.`
      );
    }

    setProjectionSeconds(30);
    setWritingSeconds(240);
    setUploadLatencySeconds(0);
    setUploadedStoryImage(null);
    setTypedStoryText("");
    setTypedAction("");
    setEvaluationReport(null);
    setPhase("projection");
  };

  const startNextRotationTest = () => {
    const nextUnseen = getActiveCycleScenario(cycleState);
    launchProjectionTest(nextUnseen);
  };

  // Run AI Psychological Evaluation
  const handleEvaluateStory = async () => {
    setIsEvaluating(true);
    setEvalError(null);

    try {
      const payload: {
        scenarioId: string;
        latencySeconds: number;
        imageBase64?: string;
        typedStory?: string;
      } = {
        scenarioId: selectedScenario.id,
        latencySeconds: uploadLatencySeconds
      };

      if (uploadedStoryImage) {
        payload.imageBase64 = uploadedStoryImage;
      }

      if (typedStoryText.trim()) {
        const fullTyped = `[BOX PERCEPTION: Hero Age: ${typedHeroAge}, Sex: ${typedHeroSex}, Mood: ${typedHeroMood}]\n[ACTION: ${typedAction}]\n\n${typedStoryText}`;
        payload.typedStory = fullTyped;
      }

      const res = await fetch("/api/screening/ppdt-evaluate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      if (!res.ok) {
        throw new Error(`Evaluation failed with status ${res.status}`);
      }

      const data: PPDTEvaluationResult = await res.json();
      setEvaluationReport(data);

      // Record evaluation score in history (scenario was already consumed at test launch)
      const storyToSave = data.transcription?.storyText || typedStoryText;
      const actionToSave = data.transcription?.actionLine || typedAction;
      const updatedState = recordEvaluationScore(
        cycleState,
        selectedScenario.id,
        data.overallScore,
        {
          verdict: data.recommendationVerdict,
          actionLine: actionToSave,
          storyText: storyToSave,
          detectedPOV: data.detectedPerspective?.matchedPerspectiveName,
          evaluation: data,
          scenarioNumber: selectedScenario.number
        }
      );
      setCycleState(updatedState);

      setPhase("evaluation");
    } catch (err: unknown) {
      console.error("Evaluation error:", err);
      const msg = err instanceof Error ? err.message : "Failed to complete psychological evaluation";
      setEvalError(msg);
    } finally {
      setIsEvaluating(false);
    }
  };

  const resetAllCycles = () => {
    if (confirm("Reset picture rotation queue? This will re-shuffle all 10 pictures into Cycle #1.")) {
      const fresh = createFreshCycle(1, []);
      saveCycleState(fresh);
      setCycleState(fresh);
      setSelectedScenario(getActiveCycleScenario(fresh));
      setCycleNotice("Picture rotation queue has been reset to Cycle #1.");
    }
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  const metrics = isClientLoaded
    ? getCycleMetrics(cycleState)
    : {
        cycleNumber: 1,
        currentNumber: 1,
        total: PPDT_SCENARIOS.length,
        remaining: PPDT_SCENARIOS.length,
        completedInCycle: 0,
        percentComplete: 0,
        isScenarioSeen: () => false
      };

  return (
    <div className="min-h-screen bg-[var(--canvas-bg)] text-[var(--fg-primary)] flex flex-col font-mono selection:bg-[var(--primary-accent)] selection:text-white">
      {/* 1. TOP APP BAR */}
      <header className="sticky top-0 z-40 bg-[var(--canvas-surface)]/90 backdrop-blur-md border-b border-[var(--canvas-border)] px-4 py-2.5 sm:px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
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
                  <span className="text-[9px] px-1.5 py-0.2 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] border border-[var(--gold-accent)]/30 font-bold hidden sm:inline-block">
                    PPDT SIMULATOR
                  </span>
                </div>
                <p className="text-[9px] text-[var(--fg-muted)] hidden md:block">
                  Picture Perception & Discussion Test • Zero-Repeat Guarantee
                </p>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setShowDemoSheetModal(true)}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface-subtle)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-all cursor-pointer"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
              <span>Sheet Format Guide</span>
            </button>

            <ThemeToggle />
          </div>
        </div>
      </header>

      {/* 2. MAIN BODY ACCORDING TO PHASE */}
      <main className="flex-1 flex flex-col justify-center p-4 sm:p-6 max-w-5xl mx-auto w-full">
        {/* PHASE 1: PRE-PROJECTION BRIEFING & CONTROLS */}
        {phase === "briefing" && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Banner */}
            <div className="p-6 rounded-2xl border-2 border-[var(--gold-accent)]/40 bg-gradient-to-r from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] shadow-md relative overflow-hidden space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--canvas-border)] pb-3">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                  <Shield className="w-4 h-4" />
                  <span>OFFICIAL DIPR STAGE-1 SCREENING PROTOCOL</span>
                </div>

                {/* Non-repeating rotation status badge */}
                <div className="flex items-center gap-2">
                  <span className="text-[10px] px-2.5 py-1 rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30 font-bold flex items-center gap-1.5">
                    <Shuffle className="w-3 h-3" />
                    <span>NON-REPEATING ROTATION • {metrics.completedInCycle} OF {metrics.total} COMPLETED</span>
                  </span>
                </div>
              </div>

              <div className="space-y-2">
                <h1 className="text-xl sm:text-2xl font-black text-[var(--fg-primary)]">
                  Picture Perception & Description Test (PPDT) Simulator
                </h1>

                <p className="text-xs text-[var(--fg-secondary)] font-sans max-w-3xl leading-relaxed">
                  Authentic SSB Stage-1 conditions: <strong>30-second projection</strong> of an ambiguous picture $\rightarrow$ <strong>4-minute strict physical writing</strong> with pen-down buzzer $\rightarrow$ instant mobile photo sync or digital submission $\rightarrow$ AI psychological evaluation across the 15 OLQs.
                </p>
              </div>

              {/* Cycle Notice Alert if applicable */}
              {cycleNotice && (
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs flex items-center justify-between">
                  <span>{cycleNotice}</span>
                  <button
                    type="button"
                    onClick={() => setCycleNotice(null)}
                    className="text-emerald-300 hover:text-white"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              )}

              {/* NON-REPEATING ROTATION ENGINE HUD CARD */}
              <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] space-y-3">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-xs font-bold text-[var(--fg-primary)]">
                      Non-Repeating Picture Rotation Active (Zero-Repeat Guarantee)
                    </span>
                  </div>

                  <span className="text-[11px] text-[var(--gold-accent)] font-bold">
                    Shown pictures are never repeated until all {metrics.total} have been perceived
                  </span>
                </div>

                <div className="w-full bg-[var(--canvas-surface-subtle)] rounded-full h-2 overflow-hidden border border-[var(--canvas-border)]">
                  <div
                    className="bg-[var(--gold-accent)] h-full transition-all duration-500 rounded-full"
                    style={{ width: `${metrics.percentComplete}%` }}
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-[var(--fg-muted)]">
                  <span>
                    Current Cycle #{metrics.cycleNumber}: {metrics.completedInCycle} seen, {metrics.remaining} remaining before fresh shuffle.
                  </span>
                  <button
                    type="button"
                    onClick={resetAllCycles}
                    className="text-[var(--fg-muted)] hover:text-red-400 underline cursor-pointer"
                  >
                    Reset Rotation
                  </button>
                </div>
              </div>

              {/* Action Buttons Row */}
              <div className="pt-2 flex items-center justify-between flex-wrap gap-3">
                <div className="flex items-center gap-3 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setShowDemoSheetModal(true)}
                    className="px-3.5 py-2 rounded-xl border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-primary)] flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <FileText className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                    <span>View DIPR Sheet Layout</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      examAudio.playPenDownBuzzer();
                      setAudioPlayed(true);
                    }}
                    className="px-3.5 py-2 rounded-xl border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] flex items-center gap-2 cursor-pointer shadow-sm"
                  >
                    <Volume2 className="w-3.5 h-3.5 text-[var(--primary-accent)]" />
                    <span>{audioPlayed ? "✓ Audio Ready" : "Test Buzzer"}</span>
                  </button>
                </div>

                {/* Primary CTA: Launch Next Guaranteed Unseen Picture */}
                <button
                  type="button"
                  onClick={startNextRotationTest}
                  className="px-6 py-2.5 rounded-xl bg-[var(--gold-accent)] hover:brightness-110 text-black font-extrabold text-xs tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-2 cursor-pointer shrink-0"
                >
                  <PlayCircle className="w-4 h-4 fill-black text-black" />
                  <span>START NEXT PPDT TEST (PICTURE #{metrics.currentNumber})</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* HISTORY OF TAKEN PPDT TESTS, STORIES & EVALUATIONS */}
            <div className="space-y-4">
              <div className="flex items-center justify-between flex-wrap gap-2">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-[var(--gold-accent)]" />
                  <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider">
                    Past PPDT Test History & Evaluated Stories ({cycleState.history.length}):
                  </span>
                </div>

                {cycleState.history.length > 0 && (
                  <span className="text-[10px] text-[var(--gold-accent)] font-bold">
                    {metrics.completedInCycle} of {metrics.total} Completed in Rotation Cycle #{metrics.cycleNumber}
                  </span>
                )}
              </div>

              {cycleState.history.length === 0 ? (
                <div className="p-8 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-center space-y-3">
                  <div className="w-12 h-12 rounded-full bg-[var(--gold-accent)]/10 text-[var(--gold-accent)] flex items-center justify-center mx-auto">
                    <FileText className="w-6 h-6" />
                  </div>
                  <h3 className="text-sm font-bold text-[var(--fg-primary)]">
                    No PPDT Tests Taken Yet
                  </h3>
                  <p className="text-xs text-[var(--fg-muted)] font-sans max-w-md mx-auto leading-relaxed">
                    Once you start and complete a PPDT test, your transcribed story (OCR from physical sheet or typed text), psychological verdict, and 15-OLQ breakdown will be archived here.
                  </p>
                  <button
                    type="button"
                    onClick={startNextRotationTest}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--gold-accent)] hover:brightness-110 text-black text-xs font-extrabold cursor-pointer transition-all shadow-md active:scale-95"
                  >
                    <PlayCircle className="w-4 h-4 fill-black" />
                    <span>Start Your First Test (Picture #{metrics.currentNumber})</span>
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {cycleState.history.map((entry, idx) => {
                    const scen = getScenarioById(entry.scenarioId);
                    const picNum = entry.scenarioNumber || scen?.number || (cycleState.history.length - idx);
                    const formattedDate = new Date(entry.completedAt).toLocaleDateString("en-IN", {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit"
                    });

                    return (
                      <div
                        key={entry.id || `hist-${idx}`}
                        className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-[var(--gold-accent)]/50 transition-all space-y-3 shadow-sm"
                      >
                        {/* Top Meta Bar */}
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--canvas-border)] pb-3">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-mono font-black px-2.5 py-0.5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] border border-[var(--gold-accent)]/30">
                              Picture #{picNum.toString().padStart(2, "0")}
                            </span>
                            <span className="text-xs font-bold text-[var(--fg-primary)]">
                              Attempt #{cycleState.history.length - idx}
                            </span>
                            <span className="text-[10px] text-[var(--fg-muted)]">
                              • {formattedDate}
                            </span>
                          </div>

                          <div className="flex items-center gap-2">
                            {entry.verdict && (
                              <span
                                className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full border ${
                                  entry.verdict === "SCREEN-IN"
                                    ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                                    : entry.verdict === "BORDERLINE"
                                    ? "bg-amber-500/15 text-amber-300 border-amber-500/30"
                                    : "bg-red-500/15 text-red-400 border-red-500/30"
                                }`}
                              >
                                {entry.verdict}
                              </span>
                            )}
                            {typeof entry.score === "number" && (
                              <span className="text-xs font-mono font-bold text-[var(--gold-accent)] px-2 py-0.5 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                                {entry.score} / 100
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Action / Theme if available */}
                        {(entry.actionLine || entry.detectedPOV) && (
                          <div className="flex items-center gap-2 text-xs flex-wrap">
                            {entry.actionLine && (
                              <span className="text-[11px] font-bold text-[var(--fg-primary)]">
                                Action: <span className="font-normal text-[var(--fg-secondary)]">{entry.actionLine}</span>
                              </span>
                            )}
                            {entry.detectedPOV && (
                              <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] border border-[var(--primary-accent)]/20 font-bold">
                                Angle: {entry.detectedPOV}
                              </span>
                            )}
                          </div>
                        )}

                        {/* Story Content (Text / OCR Transcription) */}
                        <div className="p-3.5 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1.5">
                          <div className="flex items-center justify-between text-[10px] text-[var(--fg-muted)]">
                            <span className="font-bold uppercase tracking-wider flex items-center gap-1 text-[var(--gold-accent)]">
                              <FileText className="w-3 h-3" />
                              <span>Story Text (Transcribed OCR / Typed):</span>
                            </span>
                          </div>
                          <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed whitespace-pre-wrap">
                            {entry.storyText || "Story text was evaluated directly through image submission."}
                          </p>
                        </div>

                        {/* Bottom Actions */}
                        {entry.evaluation && (
                          <div className="flex items-center justify-end pt-1">
                            <button
                              type="button"
                              onClick={() => {
                                if (scen) setSelectedScenario(scen);
                                setEvaluationReport(entry.evaluation!);
                                setPhase("evaluation");
                              }}
                              className="text-xs font-bold text-[var(--gold-accent)] hover:underline flex items-center gap-1 cursor-pointer"
                            >
                              <span>View Full Psychological Evaluation Report</span>
                              <ChevronRight className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          </div>
        )}

        {/* PHASE 2: 30-SECOND PICTURE PROJECTION */}
        {phase === "projection" && (
          <div className="max-w-3xl mx-auto w-full space-y-4 animate-in fade-in duration-300">
            {/* Projection Top Timer Bar */}
            <div className="flex items-center justify-between px-2">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold-accent)]">
                <Clock className="w-4 h-4 animate-spin" />
                <span>PICTURE PROJECTION ACTIVE (DIPR AMBIGUOUS STIMULUS)</span>
              </div>

              <div className="text-xl font-black font-mono text-[var(--gold-accent)]">
                00:{projectionSeconds.toString().padStart(2, "0")}s
              </div>
            </div>

            {/* Authentic Picture Projection Screen (100% Unobstructed Raw Stimulus) */}
            <div className="relative rounded-2xl border-4 border-[var(--canvas-border)] bg-black aspect-[4/3] flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Actual PPDT Picture - Clean & Unobscured */}
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={selectedScenario.imagePath}
                alt={`PPDT Stimulus Picture #${selectedScenario.number}`}
                className="w-full h-full object-contain filter contrast-110 brightness-95 select-none"
              />
            </div>
          </div>
        )}

        {/* PHASE 3: 4-MINUTE PHYSICAL WRITING COUNTDOWN */}
        {phase === "writing" && (
          <div className="max-w-2xl mx-auto w-full space-y-6 text-center animate-in fade-in duration-300">
            <div className="p-8 rounded-3xl border-2 border-[var(--primary-accent)] bg-[var(--canvas-surface)] shadow-2xl space-y-6">
              <div className="flex items-center justify-center gap-2 text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                <Clock className="w-4 h-4 animate-pulse" />
                <span>PHASE 2: PHYSICAL STORY WRITING</span>
              </div>

              {/* Big Countdown Timer */}
              <div className="space-y-1">
                <span className="text-6xl sm:text-7xl font-black font-mono tracking-widest text-[var(--fg-primary)]">
                  {formatTimer(writingSeconds)}
                </span>
                <p className="text-xs text-[var(--fg-muted)]">
                  Total Writing Time: 4 Minutes (Strict DIPR Regulation)
                </p>
              </div>

              {/* Timeline Milestones */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    writingSeconds > 180
                      ? "border-[var(--gold-accent)] bg-[var(--gold-accent)]/10"
                      : "border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]"
                  }`}
                >
                  <span className="text-[10px] font-bold text-[var(--gold-accent)] block mb-1">
                    MINUTE 1 (0:00 - 1:00)
                  </span>
                  <p className="text-xs text-[var(--fg-secondary)] font-sans">
                    Fill the Box: Encircle central character, write Age, Sex (M/F/P), Mood (+/–/0), and write the Action line.
                  </p>
                </div>

                <div
                  className={`p-3.5 rounded-xl border transition-all ${
                    writingSeconds <= 180
                      ? "border-[var(--primary-accent)] bg-[var(--primary-accent)]/10"
                      : "border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]"
                  }`}
                >
                  <span className="text-[10px] font-bold text-[var(--primary-accent)] block mb-1">
                    MINUTES 2 - 4 (1:00 - 4:00)
                  </span>
                  <p className="text-xs text-[var(--fg-secondary)] font-sans">
                    Draft full story: What led to the scene, what is currently happening, and what is the final outcome.
                  </p>
                </div>
              </div>

              {/* Manual Pen-Down Trigger if candidate finishes early */}
              <div className="pt-2">
                <button
                  type="button"
                  onClick={() => {
                    examAudio.playPenDownBuzzer();
                    setPhase("upload");
                  }}
                  className="px-5 py-2.5 rounded-xl border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] text-xs text-[var(--fg-muted)] hover:text-[var(--fg-primary)] transition-all cursor-pointer"
                >
                  Finished Writing Early? (Click to Stop Timer)
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 4: SUBMISSION INTAKE (MOBILE SYNC, FILE UPLOAD, OR DIRECT TYPING) */}
        {phase === "upload" && (
          <div className="max-w-2xl mx-auto w-full space-y-6 animate-in fade-in duration-300">
            {/* Header Alert */}
            <div className="p-5 rounded-2xl border-2 border-[var(--primary-accent)] bg-[var(--canvas-surface)] shadow-md space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>TIME UP — PEN DOWN!</span>
                </div>

                <div className="text-xs font-mono font-bold text-[var(--fg-muted)]">
                  Submission Latency: <span className={uploadLatencySeconds > 30 ? "text-red-400 font-black" : "text-emerald-400"}>{uploadLatencySeconds}s</span>
                </div>
              </div>

              <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                Choose how you want to submit your story for psychological evaluation: snap a photo of your handwritten sheet (via phone QR sync or file upload) or type it directly below.
              </p>
            </div>

            {/* Segmented Submission Mode Switcher */}
            <div className="grid grid-cols-2 gap-2 p-1 bg-[var(--canvas-surface-subtle)] rounded-xl border border-[var(--canvas-border)] text-xs font-bold">
              <button
                type="button"
                onClick={() => setActiveUploadTab("upload")}
                className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeUploadTab === "upload"
                    ? "bg-[var(--canvas-surface)] text-[var(--gold-accent)] shadow border border-[var(--canvas-border)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                }`}
              >
                <UploadCloud className="w-4 h-4" />
                <span>Upload Sheet Photo</span>
              </button>

              <button
                type="button"
                onClick={() => setActiveUploadTab("type")}
                className={`py-2 rounded-lg transition-all cursor-pointer flex items-center justify-center gap-1.5 ${
                  activeUploadTab === "type"
                    ? "bg-[var(--canvas-surface)] text-[var(--gold-accent)] shadow border border-[var(--canvas-border)]"
                    : "text-[var(--fg-muted)] hover:text-[var(--fg-primary)]"
                }`}
              >
                <Edit3 className="w-4 h-4" />
                <span>Type Story Online</span>
              </button>
            </div>

            {/* Error Banner if any */}
            {evalError && (
              <div className="p-4 rounded-xl border border-red-500/40 bg-red-500/10 text-xs text-red-400 flex items-center justify-between">
                <span>{evalError}</span>
                <button type="button" onClick={() => setEvalError(null)}>
                  <X className="w-3.5 h-3.5" />
                </button>
              </div>
            )}

            {/* Tab A: Upload Sheet (Image Preview or Upload Triggers) */}
            {activeUploadTab === "upload" && (
              <div>
                {uploadedStoryImage ? (
                  <div className="p-6 rounded-2xl border-2 border-emerald-500/50 bg-[var(--canvas-surface)] space-y-4">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2 text-xs font-bold text-emerald-400">
                        <CheckCircle2 className="w-4 h-4" />
                        <span>Story Sheet Captured & Ready</span>
                      </div>
                      <button
                        type="button"
                        onClick={() => setUploadedStoryImage(null)}
                        className="text-xs text-[var(--fg-muted)] hover:text-red-400 underline cursor-pointer"
                      >
                        Retake / Change
                      </button>
                    </div>

                    <div className="relative rounded-xl overflow-hidden border border-[var(--canvas-border)] max-h-80 flex items-center justify-center bg-black/40">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={uploadedStoryImage}
                        alt="Uploaded PPDT Story"
                        className="w-full h-auto object-contain max-h-72"
                      />
                    </div>

                    <button
                      type="button"
                      disabled={isEvaluating}
                      onClick={handleEvaluateStory}
                      className="w-full py-3.5 rounded-xl bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                    >
                      {isEvaluating ? (
                        <span>Evaluating Psychological Attributes...</span>
                      ) : (
                        <>
                          <Sparkles className="w-4 h-4 text-[var(--gold-accent)]" />
                          <span>ANALYZE STORY WITH SENIOR DIPR PSYCHOLOGIST AI</span>
                        </>
                      )}
                    </button>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {/* Option 1: Desktop File Upload */}
                    <div
                      onClick={() => fileInputRef.current?.click()}
                      className="p-6 rounded-2xl border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] bg-[var(--canvas-surface)] flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all group min-h-[220px]"
                    >
                      <div className="w-12 h-12 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/30 flex items-center justify-center text-[var(--primary-accent)] group-hover:scale-105 transition-transform">
                        <UploadCloud className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--fg-primary)] block">
                          Upload from Device
                        </span>
                        <span className="text-[10px] text-[var(--fg-muted)]">
                          JPG, PNG, or photo taken with phone
                        </span>
                      </div>
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleLocalImageSelect}
                      />
                    </div>

                    {/* Option 2: Scan QR Code from Phone */}
                    <div
                      onClick={() => setShowQrModal(true)}
                      className="p-6 rounded-2xl border-2 border-[var(--gold-accent)]/50 hover:border-[var(--gold-accent)] bg-[var(--canvas-surface)] flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all group min-h-[220px]"
                    >
                      <div className="w-12 h-12 rounded-full bg-[var(--gold-accent)]/10 border border-[var(--gold-accent)]/30 flex items-center justify-center text-[var(--gold-accent)] group-hover:scale-105 transition-transform">
                        <QrCode className="w-6 h-6" />
                      </div>
                      <div>
                        <span className="text-xs font-bold text-[var(--fg-primary)] block">
                          Snap on Phone via QR Code
                        </span>
                        <span className="text-[10px] text-[var(--fg-muted)]">
                          Instant live camera sync to desktop
                        </span>
                      </div>
                      <span className="text-[10px] font-bold text-[var(--gold-accent)] px-2 py-0.5 rounded bg-[var(--gold-accent)]/15 border border-[var(--gold-accent)]/30">
                        Recommended for Hand-Written Sheet
                      </span>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* Tab B: Direct Online Story Typing */}
            {activeUploadTab === "type" && (
              <div className="p-6 rounded-2xl border-2 border-[var(--gold-accent)]/40 bg-[var(--canvas-surface)] space-y-4">
                <div className="space-y-1">
                  <span className="text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider block">
                    Online DIPR Answer Sheet Entry
                  </span>
                  <p className="text-[11px] text-[var(--fg-muted)] font-sans">
                    Fill the character box details and write your complete story as perceived during the 30-second projection.
                  </p>
                </div>

                {/* Character Box Inputs */}
                <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-3">
                  <span className="text-[10px] font-bold text-[var(--fg-secondary)] uppercase tracking-wider block">
                    1. Character Box (Main Hero Demographic)
                  </span>

                  <div className="grid grid-cols-3 gap-3">
                    <div>
                      <label className="text-[10px] text-[var(--fg-muted)] block mb-1">Age</label>
                      <input
                        type="text"
                        value={typedHeroAge}
                        onChange={(e) => setTypedHeroAge(e.target.value)}
                        placeholder="e.g. 23"
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs font-bold"
                      />
                    </div>

                    <div>
                      <label className="text-[10px] text-[var(--fg-muted)] block mb-1">Sex</label>
                      <select
                        value={typedHeroSex}
                        onChange={(e) => setTypedHeroSex(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs font-bold"
                      >
                        <option value="Male">Male (M)</option>
                        <option value="Female">Female (F)</option>
                        <option value="Person">Person (P)</option>
                      </select>
                    </div>

                    <div>
                      <label className="text-[10px] text-[var(--fg-muted)] block mb-1">Mood</label>
                      <select
                        value={typedHeroMood}
                        onChange={(e) => setTypedHeroMood(e.target.value)}
                        className="w-full px-2.5 py-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs font-bold"
                      >
                        <option value="Positive (+)">Positive (+)</option>
                        <option value="Neutral (0)">Neutral (0)</option>
                        <option value="Negative (-)">Negative (-)</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="text-[10px] text-[var(--fg-muted)] block mb-1">
                      Action / Heading (e.g. &ldquo;Organizing flood relief camp&rdquo;)
                    </label>
                    <input
                      type="text"
                      value={typedAction}
                      onChange={(e) => setTypedAction(e.target.value)}
                      placeholder="Write concise title line..."
                      className="w-full px-3 py-1.5 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-xs font-bold"
                    />
                  </div>
                </div>

                {/* Story Body */}
                <div className="space-y-1">
                  <div className="flex items-center justify-between">
                    <label className="text-[10px] font-bold text-[var(--fg-secondary)] uppercase tracking-wider">
                      2. Complete Story (Past, Present Action, Future Outcome)
                    </label>
                    <span className="text-[10px] font-mono text-[var(--fg-muted)]">
                      {typedStoryText.trim() ? typedStoryText.trim().split(/\s+/).length : 0} words
                    </span>
                  </div>

                  <textarea
                    rows={6}
                    value={typedStoryText}
                    onChange={(e) => setTypedStoryText(e.target.value)}
                    placeholder="What led to the scene, what is currently happening, and what is the final outcome..."
                    className="w-full p-3.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] text-xs font-sans leading-relaxed focus:border-[var(--gold-accent)] focus:outline-none"
                  />
                </div>

                <button
                  type="button"
                  disabled={isEvaluating || !typedStoryText.trim()}
                  onClick={handleEvaluateStory}
                  className="w-full py-3.5 rounded-xl bg-[var(--gold-accent)] hover:brightness-110 text-black text-xs font-extrabold transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {isEvaluating ? (
                    <span>Evaluating Psychological Attributes...</span>
                  ) : (
                    <>
                      <Sparkles className="w-4 h-4 text-black" />
                      <span>EVALUATE TYPED STORY WITH DIPR PSYCHOLOGIST AI</span>
                    </>
                  )}
                </button>
              </div>
            )}
          </div>
        )}

        {/* PHASE 5: AI MULTIMODAL EVALUATION & OLQ REPORT */}
        {phase === "evaluation" && evaluationReport && (
          <div className="space-y-6 animate-in fade-in duration-200">
            {/* Header Scorecard */}
            <div className="p-6 rounded-2xl border-2 border-[var(--gold-accent)]/50 bg-[var(--canvas-surface)] shadow-xl relative overflow-hidden space-y-6">
              <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--canvas-border)] pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <Award className="w-5 h-5 text-[var(--gold-accent)]" />
                    <span className="text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                      DIPR PSYCHOLOGIST PPDT EVALUATION
                    </span>
                  </div>
                  <h2 className="text-xl sm:text-2xl font-black text-[var(--fg-primary)] mt-1">
                    Officer Story Assessment & Group Discussion Prep
                  </h2>
                  <p className="text-xs text-[var(--fg-muted)] font-sans mt-0.5">
                    Picture #{selectedScenario.number.toString().padStart(2, "0")} • Psychological Projection Assessment
                  </p>
                </div>

                <div className="flex items-center gap-2">
                  <div className="px-4 py-2 rounded-xl border border-emerald-500/40 bg-emerald-500/10 text-center">
                    <span className="text-[10px] font-bold text-emerald-400 block uppercase">PERCEPTION SCORE</span>
                    <span className="text-xl font-black text-emerald-400">{evaluationReport.perceptionScore} / 10</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl border border-[var(--gold-accent)]/40 bg-[var(--gold-accent)]/10 text-center">
                    <span className="text-[10px] font-bold text-[var(--gold-accent)] block uppercase">THEME RATING</span>
                    <span className="text-xl font-black text-[var(--gold-accent)]">{evaluationReport.themeScore} / 10</span>
                  </div>
                  <div className="px-4 py-2 rounded-xl border border-[var(--primary-accent)]/40 bg-[var(--primary-accent)]/10 text-center">
                    <span className="text-[10px] font-bold text-[var(--primary-accent)] block uppercase">OVERALL SCORE</span>
                    <span className="text-xl font-black text-[var(--primary-accent)]">{evaluationReport.overallScore} / 100</span>
                  </div>
                </div>
              </div>

              {/* 1. OFFICIAL BOARD SCREEN-IN RECOMMENDATION BANNER */}
              <div
                className={`p-5 rounded-2xl border-2 space-y-2 ${
                  evaluationReport.recommendationVerdict === "SCREEN-IN"
                    ? "border-emerald-500 bg-emerald-500/10 text-emerald-400"
                    : evaluationReport.recommendationVerdict === "BORDERLINE"
                    ? "border-amber-500 bg-amber-500/10 text-amber-300"
                    : "border-red-500 bg-red-500/10 text-red-400"
                }`}
              >
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Shield className="w-5 h-5 shrink-0" />
                    <span className="text-sm font-black uppercase tracking-wider font-mono">
                      OFFICIAL STAGE-1 SCREENING VERDICT: {evaluationReport.recommendationVerdict}
                    </span>
                  </div>

                  <span className="text-[11px] font-bold px-3 py-1 rounded-full border bg-[var(--canvas-surface)] border-current">
                    STAGE-1 SCREEN-IN PROBABILITY: {evaluationReport.overallScore}%
                  </span>
                </div>

                <p className="text-xs font-sans leading-relaxed text-[var(--fg-secondary)]">
                  {evaluationReport.verdictReasoning}
                </p>
              </div>

              {/* 2. TRIPARTITE NARRATIVE ARCHITECTURE SCORECARDS */}
              {evaluationReport.narrativePhases && (
                <div className="space-y-3">
                  <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider block">
                    Tripartite Narrative Architecture (Past • Present • Future):
                  </span>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {/* Phase 1: Past / Genesis */}
                    <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[var(--gold-accent)] uppercase">
                            1. PAST / GENESIS (~20%)
                          </span>
                          <span className="text-xs font-mono font-bold text-[var(--gold-accent)]">
                            {evaluationReport.narrativePhases.pastGenesis.score}/10
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--fg-muted)] font-sans italic line-clamp-2">
                          &ldquo;{evaluationReport.narrativePhases.pastGenesis.textExtracted || "Antecedent scenario"}&rdquo;
                        </p>
                      </div>
                      <p className="text-[10px] text-[var(--fg-secondary)] font-sans leading-snug border-t border-[var(--canvas-border)] pt-2">
                        {evaluationReport.narrativePhases.pastGenesis.critique}
                      </p>
                    </div>

                    {/* Phase 2: Present / Action */}
                    <div className="p-4 rounded-xl border border-[var(--primary-accent)]/50 bg-[var(--primary-accent)]/5 space-y-2 flex flex-col justify-between ring-1 ring-[var(--primary-accent)]/30">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-[var(--primary-accent)] uppercase">
                            2. PRESENT ACTION (~60% OLQs)
                          </span>
                          <span className="text-xs font-mono font-bold text-[var(--primary-accent)]">
                            {evaluationReport.narrativePhases.presentAction.score}/10
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--fg-muted)] font-sans italic line-clamp-2">
                          &ldquo;{evaluationReport.narrativePhases.presentAction.textExtracted || "Hero action steps"}&rdquo;
                        </p>
                      </div>
                      <p className="text-[10px] text-[var(--fg-secondary)] font-sans leading-snug border-t border-[var(--canvas-border)] pt-2">
                        {evaluationReport.narrativePhases.presentAction.critique}
                      </p>
                    </div>

                    {/* Phase 3: Future / Outcome */}
                    <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-2 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] font-bold text-emerald-400 uppercase">
                            3. FUTURE OUTCOME (~20%)
                          </span>
                          <span className="text-xs font-mono font-bold text-emerald-400">
                            {evaluationReport.narrativePhases.futureOutcome.score}/10
                          </span>
                        </div>
                        <p className="text-[11px] text-[var(--fg-muted)] font-sans italic line-clamp-2">
                          &ldquo;{evaluationReport.narrativePhases.futureOutcome.textExtracted || "Resolution outcome"}&rdquo;
                        </p>
                      </div>
                      <p className="text-[10px] text-[var(--fg-secondary)] font-sans leading-snug border-t border-[var(--canvas-border)] pt-2">
                        {evaluationReport.narrativePhases.futureOutcome.critique}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* 3. HERO PSYCHOLOGICAL PROFILE & RED FLAG AUDIT */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                {/* Hero Demographics & Projection */}
                {evaluationReport.heroProfile && (
                  <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-2.5">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider">
                        Hero Psychological Projection Profile:
                      </span>
                      <span
                        className={`text-[9px] font-bold px-2 py-0.5 rounded-full ${
                          evaluationReport.heroProfile.isAgeAppropriate && evaluationReport.heroProfile.isMoodConstructive
                            ? "bg-emerald-500/15 text-emerald-400 border border-emerald-500/30"
                            : "bg-amber-500/15 text-amber-300 border border-amber-500/30"
                        }`}
                      >
                        {evaluationReport.heroProfile.isAgeAppropriate && evaluationReport.heroProfile.isMoodConstructive
                          ? "Appropriate Projection ✓"
                          : "Projection Anomaly"}
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2 text-xs">
                      <div className="p-2 rounded-lg bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                        <span className="text-[9px] text-[var(--fg-muted)] block">Hero Age:</span>
                        <span className="font-bold">{evaluationReport.heroProfile.age} yrs</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                        <span className="text-[9px] text-[var(--fg-muted)] block">Gender:</span>
                        <span className="font-bold">{evaluationReport.heroProfile.sex}</span>
                      </div>
                      <div className="p-2 rounded-lg bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                        <span className="text-[9px] text-[var(--fg-muted)] block">Perceived Mood:</span>
                        <span className="font-bold">{evaluationReport.heroProfile.mood}</span>
                      </div>
                    </div>

                    <p className="text-[11px] text-[var(--fg-secondary)] font-sans leading-relaxed">
                      {evaluationReport.heroProfile.assessorNotes}
                    </p>
                  </div>
                )}

                {/* Red Flags & Antipatterns */}
                {evaluationReport.redFlagsDetected && (
                  <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-2.5">
                    <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider block">
                      Psychological Antipattern & Trap Audit:
                    </span>

                    <div className="space-y-2">
                      {evaluationReport.redFlagsDetected.map((rf, idx) => (
                        <div
                          key={idx}
                          className={`p-2.5 rounded-lg border text-xs font-sans space-y-0.5 ${
                            rf.severity === "Critical"
                              ? "border-red-500/40 bg-red-500/10 text-red-300"
                              : rf.severity === "Warning"
                              ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                              : "border-emerald-500/30 bg-emerald-500/5 text-emerald-400"
                          }`}
                        >
                          <div className="flex items-center justify-between font-mono text-[10px] font-bold">
                            <span>{rf.type}</span>
                            <span className="uppercase">{rf.severity}</span>
                          </div>
                          <p className="text-[11px] leading-snug">{rf.observation}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Latency Assessment Alert */}
              <div
                className={`p-4 rounded-xl border text-xs font-sans leading-relaxed ${
                  evaluationReport.latencyPenalty
                    ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                    : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
                }`}
              >
                <div className="font-bold font-mono text-[11px] uppercase mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Submission Latency Assessment:</span>
                </div>
                {evaluationReport.latencyMessage}
              </div>

              {/* MULTIPLE POV PERSPECTIVE ANALYSIS CARD */}
              {evaluationReport.detectedPerspective && (
                <div className="p-4 rounded-xl border border-[var(--gold-accent)]/40 bg-[var(--gold-accent)]/5 space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-[var(--canvas-border)] pb-2.5">
                    <div className="flex items-center gap-2">
                      <Sparkles className="w-4 h-4 text-[var(--gold-accent)]" />
                      <span className="text-xs font-bold text-[var(--fg-primary)] uppercase tracking-wider">
                        Perceived Perspective Analysis (Multi-POV Evaluation)
                      </span>
                    </div>

                    <span
                      className={`text-[10px] font-bold px-2 py-0.5 rounded-full border ${
                        evaluationReport.detectedPerspective.isPlausiblePOV
                          ? "bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                          : "bg-amber-500/15 text-amber-300 border-amber-500/30"
                      }`}
                    >
                      {evaluationReport.detectedPerspective.isPlausiblePOV
                        ? "Plausible DIPR Perspective ✓"
                        : "Perceptual Distortion"}
                    </span>
                  </div>

                  <div className="space-y-1.5">
                    <div className="text-xs font-bold text-[var(--gold-accent)]">
                      Candidate&apos;s Identified Angle: {evaluationReport.detectedPerspective.matchedPerspectiveName}
                    </div>
                    <p className="text-[11px] text-[var(--fg-secondary)] font-sans leading-relaxed">
                      {evaluationReport.detectedPerspective.justification}
                    </p>
                  </div>

                  {/* Alternative POVs for Group Discussion Prep */}
                  {evaluationReport.detectedPerspective.alternativePOVsCandidateCouldHaveChosen?.length > 0 && (
                    <div className="pt-2 border-t border-[var(--canvas-border)] space-y-1.5">
                      <span className="text-[10px] font-bold text-[var(--fg-muted)] uppercase tracking-wider block">
                        Other Valid Perspectives from this Ambiguous Slide (Valuable for GD Discussion):
                      </span>
                      <div className="flex flex-wrap gap-1.5">
                        {evaluationReport.detectedPerspective.alternativePOVsCandidateCouldHaveChosen.map(
                          (alt, idx) => (
                            <span
                              key={idx}
                              className="text-[10px] px-2 py-0.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] text-[var(--fg-muted)]"
                            >
                              • {alt}
                            </span>
                          )
                        )}
                      </div>
                    </div>
                  )}
                </div>
              )}

              {/* Transcribed Character Box Summary */}
              {evaluationReport.transcription && (
                <div className="p-4 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-2">
                  <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider block">
                    Perceptual Box & Action Verification:
                  </span>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 text-xs font-sans">
                    <div>
                      <span className="text-[10px] text-[var(--fg-muted)] block">Characters Perceived:</span>
                      <span className="font-bold text-[var(--fg-primary)]">
                        {evaluationReport.transcription.charactersFound} Characters
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--fg-muted)] block">Main Hero Encircled:</span>
                      <span className="font-bold text-emerald-400">
                        {evaluationReport.transcription.mainCharacterEncircled ? "Yes (Verified ✓)" : "Missing Box Circle"}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--fg-muted)] block">Hero Demographics:</span>
                      <span className="font-bold text-[var(--fg-primary)]">
                        {evaluationReport.transcription.mainCharacterDetails.age} yrs, {evaluationReport.transcription.mainCharacterDetails.sex}, {evaluationReport.transcription.mainCharacterDetails.mood}
                      </span>
                    </div>
                    <div>
                      <span className="text-[10px] text-[var(--fg-muted)] block">Action Line:</span>
                      <span className="font-bold text-[var(--gold-accent)] truncate block">
                        {evaluationReport.transcription.actionLine || "Constructive action"}
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* OLQ Breakdown Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider block">
                  15 Officer Like Qualities (OLQ) Projected in Story:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {evaluationReport.olqBreakdown.map((item, idx) => (
                    <div
                      key={idx}
                      className="p-3.5 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1"
                    >
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[var(--fg-primary)]">{item.olqName}</span>
                        <span className="text-[10px] font-mono font-bold text-[var(--gold-accent)]">
                          {item.rating}
                        </span>
                      </div>
                      <span className="text-[9px] text-[var(--fg-muted)] font-mono block">{item.factor}</span>
                      <p className="text-[11px] text-[var(--fg-secondary)] font-sans leading-relaxed">
                        {item.observation}
                      </p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Strengths & Vulnerabilities */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs font-sans">
                <div className="p-4 rounded-xl border border-emerald-500/30 bg-emerald-500/5 space-y-2">
                  <span className="font-bold font-mono text-[11px] text-emerald-400 uppercase block">
                    Observed Officer Strengths:
                  </span>
                  <ul className="space-y-1 text-[var(--fg-secondary)] list-disc list-inside">
                    {evaluationReport.strengths.map((str, idx) => (
                      <li key={idx} className="leading-relaxed">{str}</li>
                    ))}
                  </ul>
                </div>

                <div className="p-4 rounded-xl border border-amber-500/30 bg-amber-500/5 space-y-2">
                  <span className="font-bold font-mono text-[11px] text-amber-300 uppercase block">
                    Vulnerabilities & Assessor Red Flags:
                  </span>
                  <ul className="space-y-1 text-[var(--fg-secondary)] list-disc list-inside">
                    {evaluationReport.vulnerabilities.map((vuln, idx) => (
                      <li key={idx} className="leading-relaxed">{vuln}</li>
                    ))}
                  </ul>
                </div>
              </div>

              {/* 1-Minute Narration Script Guidance */}
              <div className="p-4 rounded-xl border border-[var(--primary-accent)]/30 bg-[var(--primary-accent)]/5 space-y-2">
                <div className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-[var(--gold-accent)]" />
                  <span className="text-xs font-bold text-[var(--primary-accent)] uppercase tracking-wider">
                    Senior Assessor 1-Minute Individual Narration Strategy
                  </span>
                </div>
                <ul className="space-y-1 text-xs text-[var(--fg-secondary)] font-sans list-disc list-inside">
                  {evaluationReport.narrationGuidance.map((bullet, idx) => (
                    <li key={idx} className="leading-relaxed">{bullet}</li>
                  ))}
                </ul>
              </div>

              {/* Reference Benchmark Model Story */}
              <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-2">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-4 h-4 text-[var(--gold-accent)]" />
                  <span className="text-xs font-bold text-[var(--fg-primary)] uppercase tracking-wider">
                    DIPR Benchmark Reference Model Story
                  </span>
                </div>
                <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed italic">
                  &ldquo;{selectedScenario.modelStory.fullStory}&rdquo;
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--canvas-border)] flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPhase("briefing");
                    setUploadedStoryImage(null);
                    setUploadLatencySeconds(0);
                    setTypedStoryText("");
                    setTypedAction("");
                  }}
                  className="px-4 py-2 rounded-xl border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Return to Catalog</span>
                </button>

                {/* Next Rotation Picture Trigger */}
                <button
                  type="button"
                  onClick={startNextRotationTest}
                  className="px-6 py-2.5 rounded-xl bg-[var(--gold-accent)] hover:brightness-110 text-black font-extrabold text-xs tracking-wider transition-all shadow-md active:scale-95 flex items-center gap-1.5 cursor-pointer"
                >
                  <span>START NEXT PICTURE IN ROTATION</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* 3. MODAL: QR CODE MOBILE CAMERA SYNC */}
      {showQrModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="fixed inset-0" onClick={() => setShowQrModal(false)} />
          <div className="relative z-10 w-full max-w-sm bg-[var(--canvas-surface)] border-2 border-[var(--gold-accent)] rounded-2xl p-6 shadow-2xl text-center space-y-4">
            <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-2">
              <span className="text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                MOBILE LIVE CAMERA SYNC
              </span>
              <button
                type="button"
                onClick={() => setShowQrModal(false)}
                className="p-1 rounded-lg border border-[var(--canvas-border)] text-[var(--fg-muted)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs text-[var(--fg-secondary)] font-sans">
              Scan this QR code with your phone camera to snap and submit your physical PPDT story sheet.
            </p>

            {qrCodeDataUrl ? (
              <div className="p-3 bg-white rounded-2xl inline-block shadow-inner mx-auto">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={qrCodeDataUrl} alt="PPDT Mobile Sync QR Code" className="w-48 h-48 mx-auto" />
              </div>
            ) : (
              <div className="w-48 h-48 rounded-2xl bg-[var(--canvas-surface-subtle)] animate-pulse mx-auto flex items-center justify-center text-xs">
                Generating QR...
              </div>
            )}

            <div className="flex items-center justify-center gap-2 text-xs font-mono text-emerald-400">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
              <span>Listening for phone upload...</span>
            </div>
          </div>
        </div>
      )}

      {/* 4. MODAL: PRINTABLE ANSWER SHEET FORMAT & DEMO GUIDE */}
      {showDemoSheetModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-md animate-in fade-in duration-150">
          <div className="fixed inset-0" onClick={() => setShowDemoSheetModal(false)} />
          <div className="relative z-10 w-full max-w-2xl bg-[var(--canvas-surface)] border-2 border-[var(--primary-accent)] rounded-2xl p-6 shadow-2xl space-y-4 max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3">
              <div className="flex items-center gap-2">
                <FileText className="w-4 h-4 text-[var(--gold-accent)]" />
                <h3 className="text-sm font-bold text-[var(--fg-primary)]">
                  Official DIPR PPDT Answer Sheet Layout & Dimensions
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDemoSheetModal(false)}
                className="p-1 rounded-lg border border-[var(--canvas-border)] text-[var(--fg-muted)]"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Visual Representation of the Answer Sheet */}
            <div className="p-5 rounded-xl border border-[var(--canvas-border)] bg-white text-black font-sans space-y-4 text-xs shadow-inner">
              <div className="text-center font-bold border-b pb-2 text-sm uppercase tracking-wide">
                SERVICES SELECTION BOARD — PPDT ANSWER SHEET
              </div>

              <div className="grid grid-cols-2 gap-4 pb-2 border-b">
                <div>Batch No: ______________</div>
                <div>Chest No: ______________</div>
              </div>

              {/* Character Box */}
              <div className="grid grid-cols-12 gap-3 items-start">
                <div className="col-span-4 border-2 border-dashed border-neutral-700 h-28 p-2 flex flex-col justify-between text-[10px]">
                  <span className="font-bold text-center block">BOX FOR CHARACTERS</span>
                  <div className="text-neutral-600 text-[9px] text-center">
                    Encircle Central Character. Write Age, Sex (M/F/P), Mood (+/–/0).
                  </div>
                </div>

                <div className="col-span-8 space-y-2">
                  <div className="font-bold">
                    ACTION / TITLE: _____________________________________________
                  </div>
                  <p className="text-[10px] text-neutral-600">
                    Write concise title (e.g. &ldquo;Clearing village culvert before monsoon&rdquo;). Avoid vague titles like &ldquo;Helping people&rdquo;.
                  </p>
                </div>
              </div>

              {/* Ruled lines */}
              <div className="space-y-3 pt-2">
                <span className="font-bold text-[11px] block">STORY:</span>
                <div className="border-b border-neutral-300 h-5" />
                <div className="border-b border-neutral-300 h-5" />
                <div className="border-b border-neutral-300 h-5" />
                <div className="border-b border-neutral-300 h-5" />
                <div className="border-b border-neutral-300 h-5" />
                <div className="border-b border-neutral-300 h-5" />
              </div>
            </div>

            <p className="text-xs text-[var(--fg-muted)] font-sans">
              <strong>Tip:</strong> If practicing on plain A4 sheet, draw a square of approx 4cm $\times$ 4cm on the top-left corner for the characters, write one line for Action below it, and proceed with your story.
            </p>

            <div className="flex items-center justify-end gap-2 pt-2 border-t border-[var(--canvas-border)]">
              <button
                type="button"
                onClick={() => window.print()}
                className="px-4 py-2 rounded-lg border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Printer className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                <span>Print Answer Sheet Template</span>
              </button>

              <button
                type="button"
                onClick={() => setShowDemoSheetModal(false)}
                className="px-4 py-2 rounded-lg bg-[var(--primary-accent)] text-white text-xs font-bold cursor-pointer"
              >
                Got It
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
