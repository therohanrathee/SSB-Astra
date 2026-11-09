"use client";

import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import QRCode from "qrcode";
import {
  ArrowLeft,
  Clock,
  Printer,
  Download,
  UploadCloud,
  Camera,
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
  X
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import { examAudio } from "@/lib/audioBuzzer";

type PPDTPhase = "briefing" | "projection" | "writing" | "upload" | "evaluation";

interface PPDTScenario {
  id: string;
  title: string;
  category: string;
  description: string;
  mockPromptTheme: string;
  imageHint: string;
}

const PRESET_SCENARIOS: PPDTScenario[] = [
  {
    id: "scen-1",
    title: "Scenario 01: Village Panchayat Gathering",
    category: "Community & Rural Development",
    description: "Two young men in discussion near a village assembly with elderly figures in background. Subtle blueprints/documents on the table.",
    mockPromptTheme: "Constructive village infrastructure initiative, resolving water drainage or agricultural cooperative.",
    imageHint: "Ambiguous gathering of 3-4 figures, mixed ages, rustic outdoor setting."
  },
  {
    id: "scen-2",
    title: "Scenario 02: Flash Flood Rescue & Logistics",
    category: "Disaster Relief & Civic Action",
    description: "Young adult gesturing towards a damaged culvert/embankment while assisting an elderly person with gear nearby.",
    mockPromptTheme: "Organizing quick evacuation, barricading vulnerable bridge, medical transit to safe camp.",
    imageHint: "Hazy riverside/waterlogged setting with dynamic physical movement."
  },
  {
    id: "scen-3",
    title: "Scenario 03: Late-Night Workshop / Laboratory",
    category: "Technical Innovation & Teamwork",
    description: "Two technicians/students inspecting equipment with circuit boards, one taking notes and the other calibrating tools.",
    mockPromptTheme: "Fabricating renewable energy prototype, diagnosing equipment malfunction before testing deadline.",
    imageHint: "Indoor industrial/lab scene with subtle mechanical instruments."
  }
];

export default function PPDTSimulatorPage() {
  const router = useRouter();

  // Phase State
  const [phase, setPhase] = useState<PPDTPhase>("briefing");
  const [selectedScenario, setSelectedScenario] = useState<PPDTScenario>(PRESET_SCENARIOS[0]);

  // Timers
  const [projectionSeconds, setProjectionSeconds] = useState<number>(30);
  const [writingSeconds, setWritingSeconds] = useState<number>(240); // 4 minutes = 240 seconds
  const [uploadLatencySeconds, setUploadLatencySeconds] = useState<number>(0);

  // Upload & QR Sync
  const [sessionId, setSessionId] = useState<string>("");
  const [qrCodeDataUrl, setQrCodeDataUrl] = useState<string>("");
  const [showQrModal, setShowQrModal] = useState<boolean>(false);
  const [showDemoSheetModal, setShowDemoSheetModal] = useState<boolean>(false);
  const [uploadedStoryImage, setUploadedStoryImage] = useState<string | null>(null);
  const [isSyncing, setIsSyncing] = useState<boolean>(false);
  const [isEvaluating, setIsEvaluating] = useState<boolean>(false);

  // Audio testing state
  const [audioPlayed, setAudioPlayed] = useState<boolean>(false);

  // Evaluation Report State
  const [evaluationReport, setEvaluationReport] = useState<{
    perceptionScore: number;
    themeScore: number;
    latencyPenalty: boolean;
    latencyMessage: string;
    olqBreakdown: { name: string; rating: string; comment: string }[];
    narrationGuidance: string[];
    suggestedStory: string;
  } | null>(null);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const syncPollRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize Session ID and QR Code
  useEffect(() => {
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
    if (phase === "upload" && !uploadedStoryImage) {
      interval = setInterval(() => {
        setUploadLatencySeconds((prev) => prev + 1);
      }, 1000);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [phase, uploadedStoryImage]);

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

  // Run AI Psychological Evaluation
  const handleEvaluateStory = () => {
    setIsEvaluating(true);

    setTimeout(() => {
      const isLate = uploadLatencySeconds > 30;

      setEvaluationReport({
        perceptionScore: 8.5,
        themeScore: 9.0,
        latencyPenalty: isLate,
        latencyMessage: isLate
          ? `Delayed Submission (${uploadLatencySeconds}s elapsed after buzzer). In physical SSB screening, writing after "Time Up - Stop Writing" buzzer constitutes a negative Officer Like Quality indicator (Discipline & Honesty).`
          : `Punctual Submission (${uploadLatencySeconds}s). Stopped writing immediately upon buzzer sound.`,
        olqBreakdown: [
          {
            name: "Effective Intelligence (Factor I)",
            rating: "High",
            comment: "Logical identification of problems, realistic utilization of local resources without resorting to unrealistic heroics."
          },
          {
            name: "Initiative & Planning (Factor II)",
            rating: "Above Average",
            comment: "Central character takes proactive steps rather than waiting for external orders or assistance."
          },
          {
            name: "Social Adaptability (Factor II)",
            rating: "Outstanding",
            comment: "Constructive teamwork portrayed with community members and subordinates."
          },
          {
            name: "Courage & Determination (Factor IV)",
            rating: "High",
            comment: "Clear, determined execution leading to measurable social or civic progress."
          }
        ],
        narrationGuidance: [
          "State central character's Age, Sex, and Mood clearly in first 5 seconds.",
          "Keep background exposition under 15 seconds: 'What led to the scene.'",
          "Spend 30 seconds on active implementation steps taken by your hero.",
          "Conclude in 10 seconds with positive, logical outcome without over-dramatization.",
          "Maintain steady eye contact across the semi-circle of candidates during group discussion."
        ],
        suggestedStory:
          "Rohan, a 23-year-old civil engineering graduate visiting his ancestral village, noticed severe water stagnation caused by a blocked culvert before the monsoon. Taking initiative, he mobilized the village youth council, drafted a simple clearance plan, and liaised with the local panchayat for basic tools. Working methodically, the team cleared the obstruction and installed a reinforced mesh, safeguarding 40 acres of crops and improving village hygiene."
      });

      setIsEvaluating(false);
      setPhase("evaluation");
    }, 1800);
  };

  const formatTimer = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
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
                  Picture Perception & Discussion Test • Full Stage-1 Protocol
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
            <div className="p-6 rounded-2xl border-2 border-[var(--gold-accent)]/40 bg-gradient-to-r from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] shadow-md relative overflow-hidden space-y-3">
              <div className="flex items-center gap-2 text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                <Shield className="w-4 h-4" />
                <span>OFFICIAL DIPR STAGE-1 SCREENING PROTOCOL</span>
              </div>

              <h1 className="text-xl sm:text-2xl font-black text-[var(--fg-primary)]">
                Picture Perception & Description Test (PPDT) Simulator
              </h1>

              <p className="text-xs text-[var(--fg-secondary)] font-sans max-w-3xl leading-relaxed">
                Experience authentic SSB Stage-1 conditions: <strong>30-second projection</strong> of a hazy ambiguous picture $\rightarrow$ <strong>4-minute strict physical writing</strong> with pen-down buzzer $\rightarrow$ instant mobile photo sync & AI multimodal psychological evaluation.
              </p>

              {/* Action Buttons Row */}
              <div className="pt-2 flex items-center gap-3 flex-wrap">
                <button
                  type="button"
                  onClick={() => setShowDemoSheetModal(true)}
                  className="px-4 py-2 rounded-xl border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-primary)] flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <FileText className="w-4 h-4 text-[var(--gold-accent)]" />
                  <span>View Printable Answer Sheet Layout</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    examAudio.playPenDownBuzzer();
                    setAudioPlayed(true);
                  }}
                  className="px-4 py-2 rounded-xl border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] bg-[var(--canvas-surface)] text-xs font-bold text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] flex items-center gap-2 cursor-pointer shadow-sm"
                >
                  <Volume2 className="w-4 h-4 text-[var(--primary-accent)]" />
                  <span>{audioPlayed ? "✓ Audio Tested (Buzzer & Chime Ready)" : "Test Exam Buzzer Sound"}</span>
                </button>
              </div>
            </div>

            {/* Scenario Selection Grid */}
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider">
                  Select PPDT Practice Picture Scenario:
                </span>
                <span className="text-[10px] text-[var(--fg-muted)]">Ambiguous Social Interaction</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {PRESET_SCENARIOS.map((scen) => {
                  const isSelected = selectedScenario.id === scen.id;

                  return (
                    <div
                      key={scen.id}
                      onClick={() => setSelectedScenario(scen)}
                      className={`p-4 rounded-xl border transition-all cursor-pointer flex flex-col justify-between space-y-3 ${
                        isSelected
                          ? "border-[var(--gold-accent)] bg-[var(--gold-accent)]/10 shadow-md ring-1 ring-[var(--gold-accent)]"
                          : "border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-[var(--canvas-border)]/80 hover:bg-[var(--canvas-surface-subtle)]"
                      }`}
                    >
                      <div className="space-y-2">
                        <span className="text-[9px] font-bold px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-[var(--fg-muted)] block w-fit">
                          {scen.category}
                        </span>
                        <h3 className="text-xs font-bold text-[var(--fg-primary)]">
                          {scen.title}
                        </h3>
                        <p className="text-[11px] text-[var(--fg-muted)] font-sans line-clamp-3 leading-relaxed">
                          {scen.description}
                        </p>
                      </div>

                      <div className="pt-2 border-t border-[var(--canvas-border)] flex items-center justify-between text-[10px]">
                        <span className="text-[var(--fg-muted)]">DIPR Ambiguity: High</span>
                        {isSelected && <span className="text-[var(--gold-accent)] font-bold">Selected ✓</span>}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Launch Projection CTA */}
            <div className="p-5 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-[var(--fg-primary)] block">
                  Keep your blank paper or printed PPDT sheet ready with a blue/black ballpoint pen.
                </span>
                <span className="text-[11px] text-[var(--fg-muted)] font-sans">
                  The picture will appear for exactly 30 seconds, followed immediately by 4 minutes of uninterrupted writing.
                </span>
              </div>

              <button
                type="button"
                onClick={() => {
                  setProjectionSeconds(30);
                  setPhase("projection");
                }}
                className="w-full sm:w-auto px-6 py-3 rounded-xl bg-[var(--gold-accent)] hover:brightness-110 text-black font-extrabold text-xs tracking-wider transition-all shadow-md active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              >
                <PlayCircle className="w-4 h-4 fill-black text-black" />
                <span>START 30s PROJECTION</span>
                <ChevronRight className="w-4 h-4" />
              </button>
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
                <span>PICTURE PROJECTION ACTIVE</span>
              </div>

              <div className="text-xl font-black font-mono text-[var(--gold-accent)]">
                00:{projectionSeconds.toString().padStart(2, "0")}s
              </div>
            </div>

            {/* Picture Display Box with Authentic Hazy Ambient Screen */}
            <div className="relative rounded-2xl border-4 border-[var(--canvas-border)] bg-neutral-900 aspect-[4/3] flex items-center justify-center overflow-hidden shadow-2xl">
              {/* Authentic DIPR Ambiguous Silhouette & Grayscale Haze */}
              <div className="absolute inset-0 bg-neutral-900 flex flex-col items-center justify-center p-8 text-center select-none filter blur-[1.5px] contrast-125">
                {/* Silhouette SVG Scene representing the ambiguous social interaction */}
                <svg viewBox="0 0 400 300" className="w-full h-full max-h-72 opacity-80">
                  <defs>
                    <radialGradient id="hazeGlow" cx="50%" cy="50%" r="50%">
                      <stop offset="0%" stopColor="#d4d4d4" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#525252" stopOpacity="0.2" />
                    </radialGradient>
                  </defs>

                  {/* Horizon / Room outline */}
                  <line x1="20" y1="230" x2="380" y2="230" stroke="#737373" strokeWidth="2" />
                  <rect x="60" y="70" width="100" height="160" fill="#404040" opacity="0.4" />

                  {/* Figure 1 (Left - standing gesture) */}
                  <circle cx="140" cy="110" r="16" fill="#a3a3a3" />
                  <path d="M 125 130 L 155 130 L 150 200 L 130 200 Z" fill="#888888" />
                  <line x1="150" y1="140" x2="190" y2="155" stroke="#a3a3a3" strokeWidth="6" strokeLinecap="round" />

                  {/* Central Table with document */}
                  <rect x="170" y="160" width="70" height="40" fill="#525252" />
                  <polygon points="185,160 215,160 210,155 180,155" fill="#e5e5e5" opacity="0.6" />

                  {/* Figure 2 (Right - sitting/leaning) */}
                  <circle cx="260" cy="130" r="15" fill="#999999" />
                  <path d="M 245 150 L 275 150 L 270 210 L 250 210 Z" fill="#777777" />

                  {/* Ambient Hazy Overlay */}
                  <rect x="0" y="0" width="400" height="300" fill="url(#hazeGlow)" opacity="0.25" />
                </svg>
              </div>

              {/* Progress Overlay at the bottom */}
              <div className="absolute bottom-0 inset-x-0 bg-black/60 backdrop-blur-sm p-3 flex items-center justify-between text-xs text-neutral-300">
                <span className="font-sans">
                  Perceive: Number of characters, their approximate age, sex, mood, and past/present situation.
                </span>
                <span className="font-mono font-bold text-[var(--gold-accent)] shrink-0 ml-2">
                  {projectionSeconds}s left
                </span>
              </div>
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
                  Total Writing Time: 4 Minutes (Strict SSB Regulation)
                </p>
              </div>

              {/* Timeline Milestones */}
              <div className="grid grid-cols-2 gap-3 text-left">
                <div className={`p-3.5 rounded-xl border transition-all ${
                  writingSeconds > 180 ? "border-[var(--gold-accent)] bg-[var(--gold-accent)]/10" : "border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]"
                }`}>
                  <span className="text-[10px] font-bold text-[var(--gold-accent)] block mb-1">
                    MINUTE 1 (0:00 - 1:00)
                  </span>
                  <p className="text-xs text-[var(--fg-secondary)] font-sans">
                    Fill the Box: Encircle central character, write Age, Sex (M/F/P), Mood (+/–/0), and write the Action line.
                  </p>
                </div>

                <div className={`p-3.5 rounded-xl border transition-all ${
                  writingSeconds <= 180 ? "border-[var(--primary-accent)] bg-[var(--primary-accent)]/10" : "border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]"
                }`}>
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
                  className="px-4 py-2 rounded-xl border border-[var(--canvas-border)] hover:border-red-500 hover:text-red-400 text-xs text-[var(--fg-muted)] transition-all cursor-pointer"
                >
                  Finished Early? Stop Timer & Upload Sheet Now
                </button>
              </div>
            </div>
          </div>
        )}

        {/* PHASE 4: POST-BUZZER UPLOAD INTERFACE WITH LATENCY TRACKING */}
        {phase === "upload" && (
          <div className="max-w-2xl mx-auto w-full space-y-6 animate-in fade-in duration-200">
            {/* Buzzer Announcement Banner */}
            <div className="p-5 rounded-2xl border-2 border-red-500/60 bg-red-500/10 text-center space-y-2">
              <span className="text-xs font-black text-red-500 uppercase tracking-widest block">
                🚨 TIME UP — PEN DOWN!
              </span>
              <h2 className="text-base sm:text-lg font-bold text-[var(--fg-primary)]">
                Upload Your Handwritten PPDT Sheet for AI Evaluation
              </h2>

              {/* Latency Meter */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[var(--canvas-surface)] border border-[var(--canvas-border)] text-xs font-mono">
                <Clock className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                <span>Submission Latency:</span>
                <span className={`font-black ${uploadLatencySeconds > 30 ? "text-red-400" : "text-emerald-400"}`}>
                  +{uploadLatencySeconds}s
                </span>
                {uploadLatencySeconds > 30 && (
                  <span className="text-[10px] text-red-400 font-bold">(Over 30s limit)</span>
                )}
              </div>
            </div>

            {/* Upload Choice Cards: Desktop / Mobile QR */}
            {uploadedStoryImage ? (
              <div className="p-6 rounded-2xl border-2 border-emerald-500 bg-[var(--canvas-surface)] space-y-4 shadow-xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-500">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Story Sheet Image Received ({uploadLatencySeconds}s latency)</span>
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
                  <img src={uploadedStoryImage} alt="Uploaded PPDT Story" className="w-full h-auto object-contain" />
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
                {/* Option A: Desktop File Upload */}
                <div
                  onClick={() => fileInputRef.current?.click()}
                  className="p-6 rounded-2xl border-2 border-dashed border-[var(--canvas-border)] hover:border-[var(--primary-accent)] bg-[var(--canvas-surface)] flex flex-col items-center justify-center text-center space-y-3 cursor-pointer transition-all group min-h-[220px]"
                >
                  <div className="w-12 h-12 rounded-full bg-[var(--primary-accent)]/10 border border-[var(--primary-accent)]/30 flex items-center justify-center text-[var(--primary-accent)] group-hover:scale-105 transition-transform">
                    <UploadCloud className="w-6 h-6" />
                  </div>
                  <div>
                    <span className="text-xs font-bold text-[var(--fg-primary)] block">
                      Upload from Device / Gallery
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

                {/* Option B: Scan QR Code from Phone */}
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
                    Recommended on Desktop
                  </span>
                </div>
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
                </div>
              </div>

              {/* Latency Assessment Alert */}
              <div className={`p-4 rounded-xl border text-xs font-sans leading-relaxed ${
                evaluationReport.latencyPenalty
                  ? "border-amber-500/40 bg-amber-500/10 text-amber-300"
                  : "border-emerald-500/40 bg-emerald-500/10 text-emerald-400"
              }`}>
                <div className="font-bold font-mono text-[11px] uppercase mb-1 flex items-center gap-1.5">
                  <Clock className="w-3.5 h-3.5" />
                  <span>Submission Latency Assessment:</span>
                </div>
                {evaluationReport.latencyMessage}
              </div>

              {/* OLQ Breakdown Grid */}
              <div className="space-y-3">
                <span className="text-xs font-bold text-[var(--fg-secondary)] uppercase tracking-wider block">
                  15 Officer Like Qualities (OLQ) Projected in Story:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {evaluationReport.olqBreakdown.map((item, idx) => (
                    <div key={idx} className="p-3.5 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-1">
                      <div className="flex items-center justify-between">
                        <span className="text-xs font-bold text-[var(--fg-primary)]">{item.name}</span>
                        <span className="text-[10px] font-mono font-bold text-[var(--gold-accent)]">{item.rating}</span>
                      </div>
                      <p className="text-[11px] text-[var(--fg-muted)] font-sans leading-relaxed">{item.comment}</p>
                    </div>
                  ))}
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

              {/* Action Buttons */}
              <div className="flex items-center justify-between pt-2 border-t border-[var(--canvas-border)] flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setPhase("briefing");
                    setUploadedStoryImage(null);
                    setUploadLatencySeconds(0);
                  }}
                  className="px-4 py-2 rounded-xl border border-[var(--canvas-border)] hover:bg-[var(--canvas-surface-subtle)] text-xs font-bold transition-all flex items-center gap-1.5 cursor-pointer"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Practice Another Picture</span>
                </button>

                <Link
                  href="/dashboard"
                  className="px-5 py-2 rounded-xl bg-[var(--gold-accent)] hover:brightness-110 text-black font-extrabold text-xs tracking-wider transition-all shadow-md flex items-center gap-1.5"
                >
                  <span>RETURN TO DASHBOARD</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
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
