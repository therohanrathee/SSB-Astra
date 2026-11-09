"use client";

import React, { useEffect, useState, useRef } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  User, 
  Award, 
  CheckCircle2, 
  ChevronRight, 
  LogOut, 
  Terminal, 
  BookOpen, 
  Compass, 
  Shield, 
  ShieldAlert, 
  Sparkles, 
  Clock, 
  Flame, 
  Target,
  Edit3,
  PlayCircle,
  ArrowRight,
  UserCheck,
  AlertTriangle,
  Zap,
  BarChart3,
  FileText,
  Layers,
  HelpCircle,
  Crosshair,
  TrendingUp,
  RotateCcw,
  MessageSquareQuote,
  Radio,
  Briefcase
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/lib/supabaseClient";
import { getDynamicOfficerGreeting } from "@/lib/greeting";
import type { PiqAssessment, PiqFormData } from "@/app/profile/page";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  dob?: string;
  gender?: string | null;
  target_entry?: string;
  profile_completion_pct: number;
  last_piq_uploaded_at?: string;
}

interface LastActivity {
  id: "interview" | "screening" | "psychology" | "gto" | "piq";
  title: string;
  subtitle: string;
  moduleLabel: string;
  badge: string;
  actionUrl: string;
  actionLabel: string;
  estTime: string;
  progressPct?: number;
  timestamp?: string;
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [assessment, setAssessment] = useState<PiqAssessment | null>(null);
  const [piqData, setPiqData] = useState<PiqFormData | null>(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Welcome, Future Officer");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Active testing wing tab
  const [activeTab, setActiveTab] = useState<"all" | "screening" | "psychology" | "gto" | "interview">("all");

  // Continue where left off state
  const [lastActivity, setLastActivity] = useState<LastActivity | null>(null);

  // Interactive modal for practicing predicted IO question
  const [selectedQuestion, setSelectedQuestion] = useState<string | null>(null);
  const [drillLaunchedNotice, setDrillLaunchedNotice] = useState<string | null>(null);

  useEffect(() => {
    // Close dropdown on outside click
    const handleClickOutside = (e: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(e.target as Node)) {
        setMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    async function loadUser() {
      try {
        let activeProfile: UserProfile = {
          id: "demo-officer",
          email: "cadet@ssbastra.in",
          full_name: "Cadet Aspirant",
          target_entry: "CDS",
          gender: null,
          profile_completion_pct: 30,
        };
        let activeAssessment: PiqAssessment | null = null;
        let activePiqData: PiqFormData | null = null;

        const { data: { user } } = await supabase.auth.getUser();
        if (user) {
          // Fetch user profile from Supabase
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

          if (data) {
            activeProfile = data;
            if (data.piq_assessment) {
              try {
                activeAssessment = typeof data.piq_assessment === "string" 
                  ? JSON.parse(data.piq_assessment) 
                  : data.piq_assessment;
              } catch (e) {
                console.warn("[Dashboard] Could not parse remote piq_assessment:", e);
              }
            }
            if (data.piq_data) {
              try {
                activePiqData = typeof data.piq_data === "string"
                  ? JSON.parse(data.piq_data)
                  : data.piq_data;
              } catch (e) {
                console.warn("[Dashboard] Could not parse remote piq_data:", e);
              }
            }
          } else {
            activeProfile = {
              id: user.id,
              email: user.email || "",
              full_name: user.user_metadata?.full_name || "Cadet Aspirant",
              target_entry: user.user_metadata?.target_entry || "CDS",
              gender: null,
              profile_completion_pct: 30,
            };
          }
        }

        // LocalStorage fallback for assessment & piqData
        if (!activeAssessment) {
          try {
            const cachedAss = localStorage.getItem("ssb_candidate_piq_assessment");
            if (cachedAss) activeAssessment = JSON.parse(cachedAss);
          } catch {}
        }
        if (!activePiqData) {
          try {
            const cachedPiq = localStorage.getItem("ssb_candidate_piq_data");
            if (cachedPiq) activePiqData = JSON.parse(cachedPiq);
          } catch {}
        }

        setProfile(activeProfile);
        setAssessment(activeAssessment);
        setPiqData(activePiqData);
        setGreeting(getDynamicOfficerGreeting(activeProfile.full_name, activeProfile.gender));

        // Load or initialize "Continue where we left off"
        try {
          const savedActivity = localStorage.getItem("ssb_last_activity");
          if (savedActivity) {
            setLastActivity(JSON.parse(savedActivity));
          } else {
            // Intelligent initial activity based on dossier readiness
            if (activeAssessment) {
              const qCount = activeAssessment.io_probable_questions?.length || 15;
              setLastActivity({
                id: "interview",
                title: "Personal Interview & Predicted IO Questions",
                subtitle: `${qCount} tailored rapid-fire questions ready based on your PIQ`,
                moduleLabel: "Stage-2 Interview Wing",
                badge: "IO PREDICTIONS ACTIVE",
                actionUrl: "#interview",
                actionLabel: "Resume Interview Prep",
                estTime: "15-20 min drill",
                progressPct: 70,
                timestamp: "Recent Session"
              });
            } else {
              setLastActivity({
                id: "piq",
                title: "PIQ Dossier Intake & Form 107-A",
                subtitle: "Autofill your 14 dossier sections or scan physical form to unlock Officer scoring & interview forecast",
                moduleLabel: "Dossier Foundation",
                badge: "STEP 1 OF 5",
                actionUrl: "/profile",
                actionLabel: "Complete Dossier",
                estTime: "5 min AI scan",
                progressPct: activeProfile.profile_completion_pct || 30,
                timestamp: "Pending Verification"
              });
            }
          }
        } catch (e) {
          console.warn("[Dashboard] Last activity error:", e);
        }

      } catch (err) {
        console.error("Failed to load user:", err);
      } finally {
        setLoading(false);
      }
    }

    loadUser();
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  const updateLastActivity = (activity: LastActivity) => {
    setLastActivity(activity);
    try {
      localStorage.setItem("ssb_last_activity", JSON.stringify(activity));
    } catch (e) {
      console.warn("Could not save last activity", e);
    }
  };

  const handleResumeActivity = () => {
    if (!lastActivity) return;
    if (lastActivity.actionUrl === "/profile") {
      router.push("/profile");
    } else if (lastActivity.actionUrl.startsWith("#")) {
      const tab = lastActivity.actionUrl.replace("#", "") as "screening" | "psychology" | "gto" | "interview";
      if (["screening", "psychology", "gto", "interview"].includes(tab)) {
        setActiveTab(tab);
      } else {
        setActiveTab("interview");
      }
      const el = document.getElementById("suites-section");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleLaunchDrill = (
    moduleKey: "interview" | "screening" | "psychology" | "gto",
    drillName: string,
    estTime: string
  ) => {
    const activityMap: Record<typeof moduleKey, { label: string; badge: string }> = {
      interview: { label: "Stage-2 Interview Wing", badge: "IO DRILL IN PROGRESS" },
      screening: { label: "Stage-1 Screening Wing", badge: "CSSS COGNITIVE BATTERY" },
      psychology: { label: "Stage-2 Psychology Lab", badge: "MANSO VACHA DRILL" },
      gto: { label: "Stage-2 GTO Ground Tasks", badge: "TACTICAL SAND MODEL" }
    };

    updateLastActivity({
      id: moduleKey,
      title: drillName,
      subtitle: `Active drill simulation in ${activityMap[moduleKey].label}`,
      moduleLabel: activityMap[moduleKey].label,
      badge: activityMap[moduleKey].badge,
      actionUrl: `#${moduleKey}`,
      actionLabel: "Continue Drill",
      estTime,
      progressPct: 45,
      timestamp: "Just Now"
    });

    setDrillLaunchedNotice(`⚡ Loading ${drillName} environment (${estTime})...`);
    setTimeout(() => {
      setDrillLaunchedNotice(null);
    }, 3500);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-military-grid flex flex-col items-center justify-center font-mono text-xs text-[var(--fg-muted)] gap-3">
        <CrossedSwords className="w-8 h-8 text-[var(--primary-accent)] animate-pulse" />
        <span className="tracking-widest">AUTHENTICATING CANDIDATE DOSSIER...</span>
      </div>
    );
  }

  const completionPct = profile?.profile_completion_pct || (assessment ? 100 : 30);
  const targetEntry = profile?.target_entry || piqData?.target_entry || "CDS";
  const piqScore = assessment?.piq_score || null;
  const verdict = assessment?.overall_verdict || "Assessment Pending";
  const predictedQuestions: string[] = assessment?.io_probable_questions || [];

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
      
      {/* Top Floating Action Pill Header */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Brand / Home Link */}
          <Link 
            href="/" 
            className="pointer-events-auto flex items-center gap-2.5 px-3 py-1.5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/85 backdrop-blur-md hover:border-[var(--primary-accent)] transition-all shadow-sm group"
          >
            <div className="w-7 h-7 rounded-md border border-[var(--primary-accent)]/60 bg-[var(--canvas-surface)] flex items-center justify-center shadow-sm">
              <CrossedSwords className="w-4 h-4 text-[var(--primary-accent)]" />
            </div>
            <div>
              <span className="text-xs sm:text-sm font-extrabold tracking-wider">
                SSB<span className="text-[var(--gold-accent)] font-semibold">ASTRA</span>
              </span>
              <span className="text-[8px] sm:text-[9px] block text-[var(--fg-muted)] leading-none uppercase">CANDIDATE HQ</span>
            </div>
          </Link>

          {/* Center Navigation Shortcuts (Desktop) */}
          <div className="pointer-events-auto hidden md:flex items-center gap-1.5 px-2 py-1 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)]/85 backdrop-blur-md shadow-sm text-xs">
            <button
              onClick={() => {
                setActiveTab("all");
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
              className="px-3 py-1 rounded-lg font-bold text-[var(--primary-accent)] bg-[var(--primary-accent)]/10 transition-colors"
            >
              HQ Dashboard
            </button>
            <Link
              href="/profile"
              className="px-3 py-1 rounded-lg font-medium text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface-subtle)] transition-colors flex items-center gap-1.5"
            >
              <FileText className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
              <span>PIQ Dossier</span>
              {assessment && (
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--military-olive)]" />
              )}
            </Link>
          </div>

          {/* Right: Floating Theme Toggle & User Profile Widget */}
          <div className="pointer-events-auto flex items-center gap-2.5 sm:gap-3">
            <ThemeToggle compact />

            <div className="relative" ref={menuRef}>
              {completionPct < 100 ? (
                /* Extended Profile Window when profile is not complete */
                <div className="flex items-center gap-2 sm:gap-2.5 bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] rounded-lg py-1 px-2.5 shadow-sm">
                  <Link
                    href="/profile"
                    className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-hover)] transition-all whitespace-nowrap active:scale-95 shadow-sm"
                    title="Complete your Personal Information Questionnaire"
                  >
                    Complete PIQ
                  </Link>

                  <div className="hidden sm:block text-right">
                    <span className="text-xs font-bold text-[var(--fg-primary)] block truncate max-w-[100px]">
                      {profile?.full_name?.split(" ")[0]}
                    </span>
                    <span className="text-[9px] text-[var(--gold-accent)] font-semibold block">
                      {completionPct}% Dossier
                    </span>
                  </div>

                  <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="w-7 h-7 rounded-full border border-[var(--primary-accent)]/50 bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] hover:border-[var(--primary-accent)] flex items-center justify-center font-bold text-xs shrink-0 cursor-pointer"
                    title="Account menu"
                  >
                    {profile?.full_name?.charAt(0).toUpperCase() || "C"}
                  </button>
                </div>
              ) : (
                /* Compact Icon when profile is 100% complete */
                <button
                  onClick={() => setMenuOpen(!menuOpen)}
                  className="w-8 h-8 rounded-full border border-[var(--primary-accent)]/60 bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] hover:border-[var(--primary-accent)] flex items-center justify-center font-bold text-xs shrink-0 transition-transform active:scale-95 shadow-sm cursor-pointer"
                  title="Account menu"
                >
                  {profile?.full_name?.charAt(0).toUpperCase() || "C"}
                </button>
              )}

              {/* Profile Dropdown Menu */}
              {menuOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 font-mono">
                  <div className="p-2 border-b border-[var(--canvas-border)] mb-1">
                    <div className="text-xs font-bold text-[var(--fg-primary)] truncate">
                      {profile?.full_name}
                    </div>
                    <div className="text-[10px] text-[var(--fg-muted)] truncate">
                      {profile?.email}
                    </div>
                    <div className="mt-1.5 flex items-center gap-1.5 flex-wrap">
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] font-semibold border border-[var(--service-badge-border)]">
                        ENTRY: {targetEntry}
                      </span>
                      {piqScore !== null && (
                        <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--military-olive)]/15 text-[var(--military-olive)] font-bold border border-[var(--military-olive)]/30">
                          PIQ: {piqScore}/100
                        </span>
                      )}
                    </div>
                  </div>

                  <Link
                    href="/profile"
                    onClick={() => setMenuOpen(false)}
                    className="w-full text-left flex items-center gap-2 px-2.5 py-2 text-xs rounded-lg hover:bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
                  >
                    <Edit3 className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                    <span>View / Re-Scan PIQ Dossier</span>
                  </Link>

                  <button
                    onClick={() => {
                      setMenuOpen(false);
                      handleLogout();
                    }}
                    className="w-full text-left flex items-center gap-2 px-2.5 py-2 text-xs rounded-lg hover:bg-rose-500/10 text-rose-500 transition-colors cursor-pointer"
                  >
                    <LogOut className="w-3.5 h-3.5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Command Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-2 pb-12 w-full space-y-6 sm:space-y-8 flex-1">
        
        {/* Notice Toast when drill is triggered */}
        {drillLaunchedNotice && (
          <div className="p-3 rounded-xl border border-[var(--primary-accent)] bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] text-xs font-bold flex items-center justify-between shadow-sm animate-in fade-in duration-200">
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 animate-bounce" />
              <span>{drillLaunchedNotice}</span>
            </div>
            <span className="text-[10px] text-[var(--fg-muted)]">Terminal Launching</span>
          </div>
        )}

        {/* 1. Personalised Command Briefing Header */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 border-b border-[var(--canvas-border)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SSB ENTRY: {targetEntry} • ARMED FORCES SELECTION BOARD
            </div>
            
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg-primary)] tracking-tight">
              {greeting}
            </h1>
            
            <p className="text-xs sm:text-sm text-[var(--fg-secondary)] font-sans max-w-2xl mt-1">
              {assessment 
                ? `Your PIQ dossier is evaluated (Score: ${piqScore}/100 • ${verdict}). Master your predicted Interview questions or launch high-fidelity Stage-1 and Stage-2 drills.`
                : "Welcome to Candidate HQ. Select your targeted testing battery below or complete your PIQ dossier to unlock tailored Interviewing Officer predictions."}
            </p>
          </div>

          {/* Tactical Candidate Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 w-full lg:w-auto text-xs font-mono bg-[var(--canvas-surface)] border border-[var(--canvas-border)] p-2.5 rounded-xl shadow-sm">
            <div className="p-2 rounded-lg bg-[var(--canvas-surface-subtle)]">
              <span className="text-[9px] text-[var(--fg-muted)] block uppercase">TARGET</span>
              <span className="font-extrabold text-[var(--primary-accent)]">{targetEntry}</span>
            </div>

            <div className="p-2 rounded-lg bg-[var(--canvas-surface-subtle)]">
              <span className="text-[9px] text-[var(--fg-muted)] block uppercase">PIQ SCORE</span>
              <span className={`font-extrabold ${piqScore && piqScore >= 70 ? "text-[var(--military-olive)]" : "text-[var(--gold-accent)]"}`}>
                {piqScore !== null ? `${piqScore}/100` : "Pending"}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[var(--canvas-surface-subtle)]">
              <span className="text-[9px] text-[var(--fg-muted)] block uppercase">DOSSIER</span>
              <span className="font-extrabold text-emerald-500">
                {completionPct === 100 ? "100% Ready" : `${completionPct}%`}
              </span>
            </div>

            <div className="p-2 rounded-lg bg-[var(--canvas-surface-subtle)]">
              <span className="text-[9px] text-[var(--fg-muted)] block uppercase">IO FORECAST</span>
              <span className="font-extrabold text-[var(--fg-primary)]">
                {predictedQuestions.length > 0 ? `${predictedQuestions.length} Qs` : "Pending"}
              </span>
            </div>
          </div>
        </div>

        {/* 2. Top Hero: Continue Where You Left Off Module */}
        {lastActivity && (
          <div className="p-4 sm:p-5 rounded-2xl border border-[var(--primary-accent)]/50 bg-gradient-to-r from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] relative overflow-hidden shadow-md group">
            <div className="absolute top-0 right-0 w-80 h-full bg-[var(--primary-accent)]/5 rounded-full blur-3xl pointer-events-none" />
            
            {/* Top row metadata */}
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--primary-accent)] opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--primary-accent)]" />
                </span>
                <span className="text-[10px] font-bold text-[var(--primary-accent)] uppercase tracking-wider">
                  CONTINUE MISSION • WHERE YOU LEFT OFF
                </span>
              </div>
              <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] font-bold border border-[var(--primary-accent)]/30">
                {lastActivity.badge}
              </span>
            </div>

            {/* Core Activity Details & Action */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
              <div className="space-y-1.5 max-w-2xl">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-mono font-bold text-[var(--gold-accent)] uppercase">
                    {lastActivity.moduleLabel}
                  </span>
                  <span className="text-[10px] text-[var(--fg-muted)]">• {lastActivity.estTime}</span>
                </div>
                <h2 className="text-base sm:text-lg font-extrabold text-[var(--fg-primary)] tracking-wide">
                  {lastActivity.title}
                </h2>
                <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                  {lastActivity.subtitle}
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-2.5 shrink-0">
                <button
                  type="button"
                  onClick={handleResumeActivity}
                  className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-md active:scale-95 cursor-pointer group-hover:shadow-[0_0_20px_var(--primary-glow)]"
                >
                  <PlayCircle className="w-4 h-4 text-white" />
                  <span>{lastActivity.actionLabel}</span>
                  <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                </button>
              </div>
            </div>

            {/* Quick module jumps */}
            <div className="mt-4 pt-3 border-t border-[var(--canvas-border)] flex items-center gap-2 text-[10px] text-[var(--fg-muted)] flex-wrap">
              <span className="font-bold text-[var(--fg-secondary)]">Quick Jump:</span>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("interview");
                  document.getElementById("suites-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] transition-colors cursor-pointer"
              >
                Personal Interview
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("screening");
                  document.getElementById("suites-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] transition-colors cursor-pointer"
              >
                Stage-1 Screening
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("psychology");
                  document.getElementById("suites-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] transition-colors cursor-pointer"
              >
                Psychology (TAT/WAT)
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab("gto");
                  document.getElementById("suites-section")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] transition-colors cursor-pointer"
              >
                GTO Ground Tasks
              </button>
            </div>
          </div>
        )}

        {/* 3. Tactical Testing Hub & Segmented Suite Switcher */}
        <div id="suites-section" className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h2 className="text-xs sm:text-sm font-bold uppercase tracking-widest text-[var(--fg-muted)]">
                Armed Forces Selection Testing Suites
              </h2>
              <p className="text-[11px] text-[var(--fg-secondary)] font-sans">
                Full-spectrum 5-day assessment battery matching Services Selection Board (DIPR) standards
              </p>
            </div>

            <div className="text-[11px] font-bold text-[var(--gold-accent)] shrink-0">
              4 Tactical Assessment Wings
            </div>
          </div>

          {/* Responsive Segmented Tabs Bar */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-1.5 p-1 rounded-xl bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] w-full text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab("all")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[var(--primary-accent)] text-white shadow-sm"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]"
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>All 4 Wings</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("screening")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === "screening"
                  ? "bg-[var(--primary-accent)] text-white shadow-sm"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]"
              }`}
            >
              <Terminal className="w-3.5 h-3.5" />
              <span>Day 1: Screening</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("psychology")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === "psychology"
                  ? "bg-[var(--primary-accent)] text-white shadow-sm"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]"
              }`}
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>Day 2: Psychology</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab("gto")}
              className={`flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === "gto"
                  ? "bg-[var(--primary-accent)] text-white shadow-sm"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]"
              }`}
            >
              <Compass className="w-3.5 h-3.5" />
              <span>Day 3-4: GTO</span>
            </button>

            {/* TAB 4: PERSONAL INTERVIEW (REQUESTED SUITE) */}
            <button
              type="button"
              onClick={() => setActiveTab("interview")}
              className={`col-span-2 sm:col-span-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg transition-all cursor-pointer ${
                activeTab === "interview"
                  ? "bg-[var(--primary-accent)] text-white shadow-sm"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] hover:bg-[var(--canvas-surface)]"
              }`}
            >
              <UserCheck className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
              <span>Day 2-4: Interview</span>
            </button>
          </div>

          {/* VIEW A: ALL 4 SUITES OVERVIEW GRID */}
          {activeTab === "all" && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
              
              {/* CARD 1: SCREENING */}
              <div className="hud-corner rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 flex flex-col justify-between shadow-sm hover:border-[var(--primary-accent)] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center border border-[var(--primary-accent)]/20 group-hover:scale-105 transition-transform">
                      <Terminal className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)]">
                      DAY 01
                    </span>
                  </div>

                  <div className="text-[10px] font-bold text-[var(--gold-accent)] uppercase mb-0.5">
                    Stage-1 Testing
                  </div>
                  <h3 className="text-base font-extrabold text-[var(--fg-primary)] mb-2">
                    Screening Battery
                  </h3>
                  <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-4">
                    Master the DIPR computerized battery: <strong className="text-[var(--fg-primary)]">CSSS cognitive</strong> micro-timers (16-30s) and <strong className="text-[var(--fg-primary)]">OPAM psychometric</strong> consistency checks, plus OIR & PPDT.
                  </p>

                  <div className="space-y-1.5 font-mono text-[10px] text-[var(--fg-muted)] border-t border-[var(--canvas-border)] pt-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span>• CSSS Cognitive</span>
                      <span className="text-[var(--primary-accent)] font-semibold">~70 Qs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• OPAM Psychometric</span>
                      <span className="text-[var(--primary-accent)] font-semibold">15 OLQs</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Legacy OIR / PPDT</span>
                      <span className="text-[var(--military-olive)] font-semibold">Available</span>
                    </div>
                  </div>
                </div>

                <Link 
                  href="/screening"
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[var(--canvas-surface-subtle)] hover:bg-[var(--primary-accent)] text-[var(--fg-primary)] hover:text-white transition-all text-xs font-bold border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] cursor-pointer"
                >
                  <span>Open Screening Command Hub</span>
                  <ChevronRight className="w-4 h-4" />
                </Link>
              </div>

              {/* CARD 2: PSYCHOLOGY */}
              <div className="hud-corner rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 flex flex-col justify-between shadow-sm hover:border-[var(--military-olive)] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--military-olive)]/15 text-[var(--military-olive)] flex items-center justify-center border border-[var(--military-olive)]/25 group-hover:scale-105 transition-transform">
                      <BookOpen className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--military-olive)]/15 text-[var(--military-olive)] border border-[var(--military-olive)]/30">
                      DAY 02
                    </span>
                  </div>

                  <div className="text-[10px] font-bold text-[var(--military-olive)] uppercase mb-0.5">
                    Manso Vacha
                  </div>
                  <h3 className="text-base font-extrabold text-[var(--fg-primary)] mb-2">
                    Psychology Series
                  </h3>
                  <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-4">
                    Rigorous projective personality testing under strict time pressure: <strong className="text-[var(--fg-primary)]">TAT</strong> 4-min projection, <strong className="text-[var(--fg-primary)]">WAT</strong> 15-sec word flashes, <strong className="text-[var(--fg-primary)]">SRT</strong> dilemmas, and <strong className="text-[var(--fg-primary)]">SD</strong>.
                  </p>

                  <div className="space-y-1.5 font-mono text-[10px] text-[var(--fg-muted)] border-t border-[var(--canvas-border)] pt-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span>• TAT Projection</span>
                      <span className="text-[var(--military-olive)] font-semibold">11+1 Slides</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• WAT Flash Words</span>
                      <span className="text-[var(--military-olive)] font-semibold">60 Words (15s)</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• SRT Scenarios & SD</span>
                      <span className="text-[var(--military-olive)] font-semibold">60 Situations</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setActiveTab("psychology")}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[var(--canvas-surface-subtle)] hover:bg-[var(--military-olive)] text-[var(--fg-primary)] hover:text-white transition-all text-xs font-bold border border-[var(--canvas-border)] hover:border-[var(--military-olive)] cursor-pointer"
                >
                  <span>Open Psychology Lab</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* CARD 3: GTO */}
              <div className="hud-corner rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 flex flex-col justify-between shadow-sm hover:border-[var(--gold-accent)] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] flex items-center justify-center border border-[var(--gold-accent)]/25 group-hover:scale-105 transition-transform">
                      <Compass className="w-5 h-5" />
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] border border-[var(--gold-accent)]/30">
                      DAY 03 & 04
                    </span>
                  </div>

                  <div className="text-[10px] font-bold text-[var(--gold-accent)] uppercase mb-0.5">
                    Karmana Series
                  </div>
                  <h3 className="text-base font-extrabold text-[var(--fg-primary)] mb-2">
                    GTO Ground Tasks
                  </h3>
                  <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-4">
                    Master outdoor group planning & ground obstacle dynamics: <strong className="text-[var(--fg-primary)]">GPE</strong> tactical sand models, <strong className="text-[var(--fg-primary)]">PGT/HGT</strong> cantilever & bridging mechanics, and <strong className="text-[var(--fg-primary)]">Lecturette</strong>.
                  </p>

                  <div className="space-y-1.5 font-mono text-[10px] text-[var(--fg-muted)] border-t border-[var(--canvas-border)] pt-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span>• GPE Sand Models</span>
                      <span className="text-[var(--gold-accent)] font-semibold">Priority Map</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• PGT/HGT & Command</span>
                      <span className="text-[var(--gold-accent)] font-semibold">Bridging Physics</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Lecturette & GD</span>
                      <span className="text-[var(--gold-accent)] font-semibold">Defense Intel</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setActiveTab("gto")}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[var(--canvas-surface-subtle)] hover:bg-[var(--gold-accent)] text-[var(--fg-primary)] hover:text-white transition-all text-xs font-bold border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] cursor-pointer"
                >
                  <span>Open GTO Simulator</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              {/* CARD 4: PERSONAL INTERVIEW (REQUESTED NEW TAB) */}
              <div className="hud-corner rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 flex flex-col justify-between shadow-sm hover:border-[var(--primary-accent)] transition-all group">
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-lg bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] flex items-center justify-center border border-[var(--primary-accent)]/25 group-hover:scale-105 transition-transform">
                      <UserCheck className="w-5 h-5 text-[var(--gold-accent)]" />
                    </div>
                    <span className="text-[9px] font-bold px-2 py-0.5 rounded-full bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] border border-[var(--primary-accent)]/30">
                      DAY 02 - 04
                    </span>
                  </div>

                  <div className="text-[10px] font-bold text-[var(--primary-accent)] uppercase mb-0.5">
                    Interviewing Officer
                  </div>
                  <h3 className="text-base font-extrabold text-[var(--fg-primary)] mb-2">
                    Personal Interview
                  </h3>
                  <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-4">
                    Master the IO interaction: rapid-fire <strong className="text-[var(--fg-primary)]">CIQ 1 to 5</strong> question sequences, deep defense of your <strong className="text-[var(--fg-primary)]">PIQ Form 107-A</strong>, and Armed Forces current affairs.
                  </p>

                  <div className="space-y-1.5 font-mono text-[10px] text-[var(--fg-muted)] border-t border-[var(--canvas-border)] pt-3 mb-4">
                    <div className="flex items-center justify-between">
                      <span>• CIQ 1-5 Rapid-Fire</span>
                      <span className="text-[var(--primary-accent)] font-semibold">10-15 Qs/Breath</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• PIQ Cross-Exam</span>
                      <span className="text-[var(--gold-accent)] font-semibold">
                        {predictedQuestions.length > 0 ? `${predictedQuestions.length} AI Qs` : "Personalized"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span>• Armed Forces GK</span>
                      <span className="text-[var(--military-olive)] font-semibold">Tri-Services</span>
                    </div>
                  </div>
                </div>

                <button 
                  type="button"
                  onClick={() => setActiveTab("interview")}
                  className="w-full flex items-center justify-between p-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white transition-all text-xs font-bold shadow-sm active:scale-95 cursor-pointer"
                >
                  <span>Launch Interview Wing</span>
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>

            </div>
          )}

          {/* VIEW B: DEDICATED PERSONAL INTERVIEW COMMAND WING */}
          {activeTab === "interview" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Senior Assessor Strategy Overview */}
              <div className="p-4 sm:p-5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-sm">
                <div className="flex items-center justify-between mb-3 border-b border-[var(--canvas-border)] pb-2.5">
                  <div className="flex items-center gap-2">
                    <UserCheck className="w-5 h-5 text-[var(--gold-accent)]" />
                    <span className="text-sm font-extrabold tracking-wide">
                      INTERVIEWING OFFICER (IO) COMMAND CENTER
                    </span>
                  </div>
                  <span className="text-[10px] font-bold text-[var(--fg-muted)]">
                    CONDUCTED BY BRIGADIER / COLONEL ASSESSOR
                  </span>
                </div>

                <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-4">
                  The Personal Interview assesses all 15 Officer Like Qualities (OLQs) through directed conversation. The IO utilizes the <strong className="text-[var(--fg-primary)]">Comprehensive Information Questionnaire (CIQ)</strong> technique to evaluate your logical memory, self-awareness, moral values, and poise under deliberate stress and rapid questioning.
                </p>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs font-mono">
                  <div className="p-2.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                    <span className="text-[10px] text-[var(--primary-accent)] font-bold block mb-1">
                      FACTOR I: INTELLECT
                    </span>
                    <span className="text-[11px] text-[var(--fg-secondary)] block">
                      Assessed through academic performance, reasons for fluctuations, and current defense knowledge.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                    <span className="text-[10px] text-[var(--military-olive)] font-bold block mb-1">
                      FACTOR II & III: SOCIAL DYNAMICS
                    </span>
                    <span className="text-[11px] text-[var(--fg-secondary)] block">
                      Assessed via relations with family, friends, teachers, team sports, and conflict resolution.
                    </span>
                  </div>
                  <div className="p-2.5 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                    <span className="text-[10px] text-[var(--gold-accent)] font-bold block mb-1">
                      FACTOR IV: DYNAMIC QUALITIES
                    </span>
                    <span className="text-[11px] text-[var(--fg-secondary)] block">
                      Assessed through stamina, determination under pressure, and conviction in joining Armed Forces.
                    </span>
                  </div>
                </div>
              </div>

              {/* Personalised Predicted Questions based on Cadet's PIQ */}
              <div className="p-4 sm:p-5 rounded-xl border-2 border-dashed border-[var(--gold-accent)]/50 bg-[var(--canvas-surface)] shadow-sm space-y-4">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <div className="flex items-center gap-2">
                    <Sparkles className="w-4 h-4 text-[var(--gold-accent)] animate-pulse" />
                    <span className="text-xs sm:text-sm font-extrabold tracking-wide">
                      PREDICTED IO QUESTIONS FOR {profile?.full_name?.toUpperCase() || "CADET"}
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] border border-[var(--gold-accent)]/30">
                      {predictedQuestions.length > 0 ? `${predictedQuestions.length} TAILORED QUESTIONS` : "PIQ REQUIRED"}
                    </span>
                    <Link
                      href="/profile#interview-questions"
                      className="text-[11px] text-[var(--primary-accent)] hover:underline font-bold flex items-center gap-1"
                    >
                      <span>Full PIQ Breakdown</span>
                      <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>

                {predictedQuestions.length > 0 ? (
                  <div className="space-y-2.5">
                    <p className="text-[11px] text-[var(--fg-muted)] font-sans">
                      These rapid-fire questions were formulated directly from your uploaded DIPR Form 107-A scan. Click any question to practice your response composure:
                    </p>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-2.5">
                      {predictedQuestions.slice(0, 4).map((q: string, idx: number) => (
                        <div 
                          key={idx}
                          onClick={() => setSelectedQuestion(q)}
                          className="p-3 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface-subtle)] hover:bg-[var(--canvas-surface)] transition-all cursor-pointer group flex flex-col justify-between"
                        >
                          <div className="flex items-start gap-2 mb-2">
                            <span className="w-5 h-5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] flex items-center justify-center font-bold text-[10px] shrink-0">
                              {idx + 1}
                            </span>
                            <span className="text-xs font-semibold text-[var(--fg-primary)] line-clamp-2">
                              {q}
                            </span>
                          </div>
                          
                          <div className="flex items-center justify-between pt-2 border-t border-[var(--canvas-border)] text-[10px] text-[var(--fg-muted)]">
                            <span className="font-mono text-[9px] uppercase">Senior IO Question</span>
                            <span className="text-[var(--gold-accent)] font-bold group-hover:underline flex items-center gap-1">
                              Practice <ChevronRight className="w-3 h-3" />
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="p-4 rounded-lg bg-[var(--canvas-surface-subtle)] text-center space-y-2">
                    <p className="text-xs text-[var(--fg-secondary)] font-sans">
                      Upload your handwritten or printed PIQ scan to generate senior assessor interview questions tailored specifically to your schools, marks, family background, and sports records.
                    </p>
                    <Link
                      href="/profile"
                      className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                      <span>Upload PIQ to Unlock Personalized Questions</span>
                    </Link>
                  </div>
                )}
              </div>

              {/* 4 Interactive Interview Drill Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                
                {/* DRILL 1: CIQ RAPID FIRE */}
                <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-sm hover:border-[var(--primary-accent)] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[var(--primary-accent)] uppercase">
                        Drill Suite 1
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] font-bold">
                        15 MINS
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--fg-primary)] mb-1.5 flex items-center gap-1.5">
                      <Flame className="w-4 h-4 text-orange-500" />
                      <span>CIQ 1 to 5 Rapid-Fire Sequences</span>
                    </h3>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-3">
                      Simulate the IO delivering 10 to 15 interrelated questions in one continuous breath. Train your working memory to recall all questions in chronological order without asking the assessor to repeat.
                    </p>
                    <div className="space-y-1 text-[11px] text-[var(--fg-muted)] mb-4">
                      <div>• CIQ-1: Academics, Teachers, Fluctuations</div>
                      <div>• CIQ-2: Family Structure & Financial Independence</div>
                      <div>• CIQ-3: Friends, Mutual Disagreements & Leisure</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunchDrill("interview", "CIQ 1 to 5 Rapid-Fire Drill", "15 mins")}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Launch CIQ Rapid-Fire Simulator</span>
                  </button>
                </div>

                {/* DRILL 2: RED FLAGS & VULNERABILITY DEFENSE */}
                <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-sm hover:border-[var(--gold-accent)] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[var(--gold-accent)] uppercase">
                        Drill Suite 2
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] font-bold">
                        10 MINS
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--fg-primary)] mb-1.5 flex items-center gap-1.5">
                      <Shield className="w-4 h-4 text-[var(--gold-accent)]" />
                      <span>Vulnerability Defense & Cross-Exam</span>
                    </h3>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-3">
                      Prepare airtight, honest justifications for common assessor pressure points: academic drops, gap years, repeat SSB attempts, lack of NCC/sports, and handling high-stress hypothetical dilemmas.
                    </p>
                    <div className="space-y-1 text-[11px] text-[var(--fg-muted)] mb-4">
                      <div>• Addressing Low Percentage or Backlogs</div>
                      <div>• Handling Why Armed Forces over Corporate/Civil</div>
                      <div>• Prior SSB Failure Self-Analysis</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunchDrill("interview", "Vulnerability Defense Drill", "10 mins")}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface-subtle)] hover:bg-[var(--canvas-surface)] text-[var(--fg-primary)] text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                    <span>Practice Vulnerability Defense</span>
                  </button>
                </div>

                {/* DRILL 3: ARMED FORCES & GEOPOLITICS */}
                <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-sm hover:border-[var(--military-olive)] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[var(--military-olive)] uppercase">
                        Drill Suite 3
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--military-olive)]/15 text-[var(--military-olive)] font-bold">
                        12 MINS
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--fg-primary)] mb-1.5 flex items-center gap-1.5">
                      <Crosshair className="w-4 h-4 text-[var(--military-olive)]" />
                      <span>Defense Awareness & Geopolitics</span>
                    </h3>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-3">
                      Master operational military intelligence expected of an officer candidate: command structure across Army, Navy & Air Force, weapons platforms, recent defense procurements, and strategic border geography.
                    </p>
                    <div className="space-y-1 text-[11px] text-[var(--fg-muted)] mb-4">
                      <div>• Tri-Services Equivalent Ranks & Insignias</div>
                      <div>• Theater Commands & Border Management</div>
                      <div>• Recent Indigenous Defense Developments</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunchDrill("interview", "Defense Knowledge Drill", "12 mins")}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--military-olive)] bg-[var(--canvas-surface-subtle)] hover:bg-[var(--canvas-surface)] text-[var(--fg-primary)] text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5 text-[var(--military-olive)]" />
                    <span>Test Military Awareness</span>
                  </button>
                </div>

                {/* DRILL 4: MOTIVATION & SELF-KNOWLEDGE */}
                <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-sm hover:border-[var(--primary-accent)] transition-all">
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-[10px] font-bold text-[var(--primary-accent)] uppercase">
                        Drill Suite 4
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] font-bold">
                        8 MINS
                      </span>
                    </div>
                    <h3 className="text-sm font-extrabold text-[var(--fg-primary)] mb-1.5 flex items-center gap-1.5">
                      <Target className="w-4 h-4 text-[var(--primary-accent)]" />
                      <span>Officer Motivation & Self-Drive</span>
                    </h3>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-3">
                      Formulate authentic, non-cliché responses to foundational questions: Why Armed Forces? What if you are not selected? 3 strengths you will bring to the academy and 3 genuine weaknesses you are working on.
                    </p>
                    <div className="space-y-1 text-[11px] text-[var(--fg-muted)] mb-4">
                      <div>• Alternative Career Backup Plan Analysis</div>
                      <div>• Authentic Self-Improvement Identification</div>
                      <div>• Conviction & Determination Demonstration</div>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleLaunchDrill("interview", "Officer Motivation Drill", "8 mins")}
                    className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                  >
                    <PlayCircle className="w-3.5 h-3.5" />
                    <span>Practice Motivation Response</span>
                  </button>
                </div>

              </div>

            </div>
          )}

          {/* VIEW C: SCREENING WING - DUAL COLUMN ARCHITECTURE (LEGACY LEFT vs NEW RIGHT) */}
          {activeTab === "screening" && (
            <div className="space-y-6 animate-in fade-in duration-200">
              
              {/* Official Operational Advisory Banner */}
              <div className="p-4 sm:p-5 rounded-2xl border border-[var(--gold-accent)]/40 bg-gradient-to-r from-[var(--canvas-surface)] via-[var(--canvas-surface-subtle)] to-[var(--canvas-surface)] relative overflow-hidden shadow-sm">
                <div className="flex items-start gap-3.5">
                  <div className="w-9 h-9 rounded-xl bg-[var(--gold-accent)]/15 border border-[var(--gold-accent)]/30 flex items-center justify-center text-[var(--gold-accent)] shrink-0 mt-0.5">
                    <ShieldAlert className="w-5 h-5" />
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-xs font-bold text-[var(--gold-accent)] uppercase tracking-wider">
                        OFFICIAL SCREENING PROTOCOL ADVISORY
                      </span>
                      <span className="text-[9px] px-2 py-0.5 rounded bg-[var(--gold-accent)]/15 text-[var(--gold-accent)] font-bold border border-[var(--gold-accent)]/30">
                        DUAL-BATTERY PREPARATION
                      </span>
                    </div>
                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed">
                      The <strong>New System (CSSS + OPAM)</strong> is currently being tested at select boards in some batches, but the <strong>Legacy System (OIR + PPDT)</strong> is also still being followed across all boards. Practice both to ensure full recommendation readiness.
                    </p>
                  </div>
                </div>
              </div>

              {/* Dual-Column Symmetrical Viewport */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                
                {/* LEFT COLUMN: ACTIVE OPERATIONAL LEGACY SCREENING (OIR + PPDT) */}
                <div className="p-5 sm:p-6 rounded-2xl border-2 border-[var(--primary-accent)]/40 bg-[var(--canvas-surface)] flex flex-col justify-between shadow-md relative overflow-hidden group space-y-6">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-[var(--primary-accent)]/5 rounded-full blur-3xl pointer-events-none" />

                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between mb-3 border-b border-[var(--canvas-border)] pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center border border-[var(--primary-accent)]/20">
                          <FileText className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wide text-[var(--fg-primary)]">
                            LEGACY SCREENING SYSTEM
                          </h2>
                          <span className="text-[9px] text-[var(--primary-accent)] font-bold tracking-wider uppercase block">
                            Active Operational Protocol (All Boards)
                          </span>
                        </div>
                      </div>

                      <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-[var(--military-olive)]/15 text-[var(--military-olive)] border border-[var(--military-olive)]/30">
                        PRIMARY STANDARD
                      </span>
                    </div>

                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-5">
                      The battle-tested 2-stage battery followed across Prayagraj (Allahabad), Bhopal, Bengaluru, Kapurthala, Gandhinagar, Varanasi, Dehradun, Coimbatore, Visakhapatnam, and Kolkata.
                    </p>

                    {/* Sub-Module 1: OIR CBT Question Simulator */}
                    <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Terminal className="w-4 h-4 text-[var(--primary-accent)]" />
                          <span className="text-xs font-bold text-[var(--fg-primary)]">
                            Part 1: Officer Intelligence Rating (OIR)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--primary-accent)] font-bold">
                          CBT Exam Mode
                        </span>
                      </div>

                      <p className="text-[11px] text-[var(--fg-muted)] font-sans leading-relaxed">
                        Authentic DIPR booklets digitized item-by-item in a full CBT interface (Testbook style). Features the right-hand Question Palette, dynamic options (2 to 5 options), strict countdown timers, and official OIR Rating (1 to 5) calculation.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          <span className="text-[var(--fg-muted)] block">VERBAL SETS</span>
                          <span className="font-bold text-[var(--fg-primary)]">Sets 34, 53, 54, 6...</span>
                        </div>
                        <div className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          <span className="text-[var(--fg-muted)] block">NON-VERBAL SETS</span>
                          <span className="font-bold text-[var(--fg-primary)]">Sets 35, 71, 75D...</span>
                        </div>
                      </div>

                      <Link
                        href="/screening/oir"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Launch CBT OIR Simulator</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>

                    {/* Sub-Module 2: PPDT Simulator with QR Mobile Sync */}
                    <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Sparkles className="w-4 h-4 text-[var(--gold-accent)]" />
                          <span className="text-xs font-bold text-[var(--fg-primary)]">
                            Part 2: PPDT (Picture Perception & Discussion)
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-[var(--gold-accent)] font-bold">
                          Physical + AI Vision
                        </span>
                      </div>

                      <p className="text-[11px] text-[var(--fg-muted)] font-sans leading-relaxed">
                        30s authentic hazy projection $\rightarrow$ 4-min writing on physical paper with buzzer $\rightarrow$ instant photo upload via mobile QR Code with submission latency tracking and AI psychological assessment.
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-[var(--fg-muted)] flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          📄 Printable Sheet
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          ⏱️ 4-Min Strict Buzzer
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          📱 QR Code Mobile Sync
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          🧠 AI OLQ Scoring
                        </span>
                      </div>

                      <Link
                        href="/screening/ppdt"
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--gold-accent)] bg-[var(--canvas-surface)] text-[var(--fg-primary)] text-xs font-bold transition-all shadow-sm active:scale-95"
                      >
                        <PlayCircle className="w-4 h-4 text-[var(--gold-accent)]" />
                        <span>Launch PPDT Simulator</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </Link>
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-[var(--fg-muted)] flex items-center justify-between border-t border-[var(--canvas-border)]">
                    <span>Includes Official Authentic Booklets & Scored Sets</span>
                    <span className="text-emerald-500 font-bold">Ready to Practice</span>
                  </div>
                </div>

                {/* RIGHT COLUMN: NEW DIPR SYSTEM (CSSS + OPAM COMPUTERIZED) */}
                <div className="p-5 sm:p-6 rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] flex flex-col justify-between shadow-md relative overflow-hidden group space-y-6">
                  <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />

                  <div>
                    {/* Header Badge */}
                    <div className="flex items-center justify-between mb-3 border-b border-[var(--canvas-border)] pb-3">
                      <div className="flex items-center gap-2">
                        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 text-emerald-500 flex items-center justify-center border border-emerald-500/20">
                          <Terminal className="w-4 h-4" />
                        </div>
                        <div>
                          <h2 className="text-sm font-extrabold tracking-wide text-[var(--fg-primary)]">
                            NEW DIPR SCREENING BATTERY
                          </h2>
                          <span className="text-[9px] text-emerald-500 font-bold tracking-wider uppercase block">
                            Computerised Testing (CSSS + OPAM)
                          </span>
                        </div>
                      </div>

                      <span className="text-[9px] font-bold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-500 border border-emerald-500/30">
                        TRIAL BATCHES
                      </span>
                    </div>

                    <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-5">
                      The next-generation computerized selection battery developed by the Defence Institute of Psychological Research (DRDO), being rolled out at select SSB computer labs.
                    </p>

                    {/* Sub-Module 1: CSSS Cognitive Battery */}
                    <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3 mb-4">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Zap className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold text-[var(--fg-primary)]">
                            Battery 1: CSSS Cognitive Engine
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold">
                          ~70 Questions
                        </span>
                      </div>

                      <p className="text-[11px] text-[var(--fg-muted)] font-sans leading-relaxed">
                        Strict 16 to 30-second micro-timers per question with <strong>zero backtracking</strong>. Evaluates working memory, selective attention, spatial box folding, and headphone audio discrimination.
                      </p>

                      <div className="grid grid-cols-2 gap-2 text-[10px] font-mono">
                        <div className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          <span className="text-[var(--fg-muted)] block">SPEED RULE</span>
                          <span className="font-bold text-emerald-500">16-30s / Q Auto-Advance</span>
                        </div>
                        <div className="p-2 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          <span className="text-[var(--fg-muted)] block">AUDIO BATTERY</span>
                          <span className="font-bold text-[var(--fg-primary)]">Headphones Required</span>
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLaunchDrill("screening", "CSSS Cognitive Drill", "25 mins")}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4" />
                        <span>Start CSSS Cognitive Trial</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Sub-Module 2: OPAM Psychometric Measure */}
                    <div className="p-4 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <Award className="w-4 h-4 text-emerald-500" />
                          <span className="text-xs font-bold text-[var(--fg-primary)]">
                            Battery 2: OPAM Psychometrics
                          </span>
                        </div>
                        <span className="text-[10px] font-mono text-emerald-500 font-bold">
                          ~120 Items
                        </span>
                      </div>

                      <p className="text-[11px] text-[var(--fg-muted)] font-sans leading-relaxed">
                        Rapid psychometric evaluation mapping the 15 OLQs. Features paired consistency questions across time intervals and built-in Social Desirability ("Lie Scale") filters.
                      </p>

                      <div className="flex items-center gap-2 text-[10px] text-[var(--fg-muted)] flex-wrap">
                        <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          🎯 15 Factor OLQ Map
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          ⚖️ Social Desirability Check
                        </span>
                        <span className="px-2 py-0.5 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">
                          🔄 Consistency Pair Engine
                        </span>
                      </div>

                      <button
                        type="button"
                        onClick={() => handleLaunchDrill("screening", "OPAM Psychometric Battery", "20 mins")}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border border-[var(--canvas-border)] hover:border-emerald-500 bg-[var(--canvas-surface)] text-[var(--fg-primary)] text-xs font-bold transition-all shadow-sm active:scale-95 cursor-pointer"
                      >
                        <PlayCircle className="w-4 h-4 text-emerald-500" />
                        <span>Start OPAM Assessment</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  </div>

                  <div className="pt-2 text-[10px] text-[var(--fg-muted)] flex items-center justify-between border-t border-[var(--canvas-border)]">
                    <span>Trial Protocol (Computer Labs at 1 AFSB, 24 SSB, etc.)</span>
                    <span className="text-emerald-500 font-bold">In Active Development</span>
                  </div>
                </div>

              </div>

            </div>
          )}

          {/* VIEW D: PSYCHOLOGY WING */}
          {activeTab === "psychology" && (
            <div className="p-6 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-sm space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3">
                <div className="flex items-center gap-2">
                  <BookOpen className="w-5 h-5 text-[var(--military-olive)]" />
                  <span className="text-sm font-extrabold tracking-wide">
                    STAGE-2 PSYCHOLOGY LAB (MANSO VACHA)
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--military-olive)]/15 text-[var(--military-olive)]">
                  DAY 02 SELECTION
                </span>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[var(--military-olive)] block mb-1">TAT (Thematic Apperception)</span>
                    <p className="text-[11px] text-[var(--fg-muted)] font-sans mb-3">
                      11 ambiguous slides + 1 blank slide. 30 seconds viewing, exactly 4 minutes per story.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleLaunchDrill("psychology", "TAT Slide Projection Session", "50 mins")}
                    className="w-full py-2 rounded bg-[var(--military-olive)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                  >
                    Start TAT Drill
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[var(--military-olive)] block mb-1">WAT (Word Association)</span>
                    <p className="text-[11px] text-[var(--fg-muted)] font-sans mb-3">
                      60 rapid-fire words flashing for 15 seconds each. Instant sentence construction.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleLaunchDrill("psychology", "WAT 60-Word Rapid Flash", "15 mins")}
                    className="w-full py-2 rounded bg-[var(--military-olive)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                  >
                    Start WAT Drill
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[var(--military-olive)] block mb-1">SRT (Situation Reaction)</span>
                    <p className="text-[11px] text-[var(--fg-muted)] font-sans mb-3">
                      60 real-life dilemmas in exactly 30 minutes. Tests practical intelligence & initiative.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleLaunchDrill("psychology", "SRT 60-Situation Pacing", "30 mins")}
                    className="w-full py-2 rounded bg-[var(--military-olive)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                  >
                    Start SRT Drill
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex flex-col justify-between">
                  <div>
                    <span className="text-xs font-bold text-[var(--military-olive)] block mb-1">SD (Self-Description)</span>
                    <p className="text-[11px] text-[var(--fg-muted)] font-sans mb-3">
                      5 paragraphs: Parents, Teachers, Friends, Self, and Future Aims. Paced 15-min drill.
                    </p>
                  </div>
                  <button 
                    onClick={() => handleLaunchDrill("psychology", "SD 5-Paragraph Drafter", "15 mins")}
                    className="w-full py-2 rounded bg-[var(--military-olive)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                  >
                    Start SD Drafter
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* VIEW E: GTO GROUND TASKS WING */}
          {activeTab === "gto" && (
            <div className="p-6 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-sm space-y-6 animate-in fade-in duration-200">
              <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3">
                <div className="flex items-center gap-2">
                  <Compass className="w-5 h-5 text-[var(--gold-accent)]" />
                  <span className="text-sm font-extrabold tracking-wide">
                    STAGE-2 GTO GROUND SERIES (KARMANA)
                  </span>
                </div>
                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--gold-accent)]/15 text-[var(--gold-accent)]">
                  DAY 03 & 04 SELECTION
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="p-4 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-2">
                  <span className="text-xs font-bold text-[var(--gold-accent)] block">1. GPE (Group Planning Exercise)</span>
                  <p className="text-[11px] text-[var(--fg-muted)] font-sans">
                    Tactical sand model map scenarios. Practice scale calculation, multi-priority crisis management, and individual plan drafting.
                  </p>
                  <button 
                    onClick={() => handleLaunchDrill("gto", "GPE Sand Model Tactical Map", "25 mins")}
                    className="w-full mt-2 py-2 rounded bg-[var(--gold-accent)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                  >
                    Open GPE Simulator
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-2">
                  <span className="text-xs font-bold text-[var(--gold-accent)] block">2. PGT/HGT & Command Task</span>
                  <p className="text-[11px] text-[var(--fg-muted)] font-sans">
                    Physics of cantilever, fulcrum, tying rope, and bridging techniques. Understand Red, Blue, and White boundary rules.
                  </p>
                  <button 
                    onClick={() => handleLaunchDrill("gto", "PGT Bridging Mechanics Guide", "15 mins")}
                    className="w-full mt-2 py-2 rounded bg-[var(--gold-accent)] text-white text-xs font-bold hover:opacity-90 transition-all cursor-pointer"
                  >
                    Review Ground Physics
                  </button>
                </div>

                <div className="p-4 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] space-y-2">
                  <span className="text-xs font-bold text-[var(--gold-accent)] block">3. Lecturette & GD Intel</span>
                  <p className="text-[11px] text-[var(--fg-muted)] font-sans">
                    Curated defense intelligence, geopolitical developments, national security doctrine, and structured 3-minute speech frameworks.
                  </p>
                  <button 
                    onClick={() => handleLaunchDrill("gto", "Defense Lecturette Drills", "15 mins")}
                    className="w-full mt-2 py-2 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface)] text-[var(--fg-primary)] text-xs font-bold hover:border-[var(--gold-accent)] transition-all cursor-pointer"
                  >
                    Explore Defense Feeds
                  </button>
                </div>
              </div>
            </div>
          )}

        </div>

        {/* 4. Candidate Dossier & Officer Assessment Sync Panel */}
        <div className="p-4 sm:p-5 rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-sm">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-[var(--canvas-border)]">
            <div className="flex items-center gap-2">
              <Award className="w-5 h-5 text-[var(--primary-accent)]" />
              <div>
                <h3 className="text-xs sm:text-sm font-extrabold tracking-wide">
                  OFFICER CANDIDATE DOSSIER & OLQ ASSESSMENT
                </h3>
                <span className="text-[10px] text-[var(--fg-muted)]">
                  Standardized Armed Forces DIPR Questionnaire No. 107-A (Revised)
                </span>
              </div>
            </div>

            <Link
              href="/profile"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg border border-[var(--canvas-border)] hover:border-[var(--primary-accent)] bg-[var(--canvas-surface-subtle)] text-xs font-bold text-[var(--primary-accent)] transition-all shrink-0"
            >
              <span>{assessment ? "View Full Assessment" : "Complete / Scan PIQ"}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          {assessment ? (
            <div className="mt-4 grid grid-cols-1 md:grid-cols-4 gap-4">
              <div className="p-3 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                <span className="text-[10px] text-[var(--fg-muted)] block">COMPOSITE SCORE</span>
                <span className="text-xl font-extrabold text-[var(--primary-accent)]">
                  {assessment.piq_score} <span className="text-xs text-[var(--fg-muted)] font-normal">/ 100</span>
                </span>
                <span className="text-[10px] block font-bold text-[var(--military-olive)] mt-0.5">
                  {assessment.overall_verdict}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                <span className="text-[10px] text-[var(--fg-muted)] block">TOP STRENGTH</span>
                <span className="text-xs font-bold text-[var(--fg-primary)] line-clamp-2 mt-1">
                  {assessment.key_strengths?.[0] || "Academic & Sports Foundation"}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)]">
                <span className="text-[10px] text-[var(--fg-muted)] block">INTERVIEW FOCUS AREA</span>
                <span className="text-xs font-bold text-[var(--gold-accent)] line-clamp-2 mt-1">
                  {assessment.vulnerabilities_and_red_flags?.[0] || "Be ready for CIQ-2 cross-examination"}
                </span>
              </div>

              <div className="p-3 rounded-lg bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] flex flex-col justify-between">
                <div>
                  <span className="text-[10px] text-[var(--fg-muted)] block">PREDICTED QUESTIONS</span>
                  <span className="text-sm font-extrabold text-[var(--fg-primary)]">
                    {predictedQuestions.length} Questions Ready
                  </span>
                </div>
                <Link
                  href="/profile#interview-questions"
                  className="text-[10px] font-bold text-[var(--primary-accent)] hover:underline flex items-center gap-1 mt-1"
                >
                  Review Questions <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ) : (
            <div className="mt-4 p-4 rounded-lg bg-[var(--canvas-surface-subtle)] border border-dashed border-[var(--canvas-border)] flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <span className="text-xs font-bold text-[var(--fg-primary)] block">
                  Unlock Personalized Officer Score & IO Forecast
                </span>
                <p className="text-[11px] text-[var(--fg-muted)] font-sans mt-0.5">
                  Upload your handwritten DIPR 107-A scan in PDF or Photo format. Senior Assessor AI will evaluate your dossier and formulate predicted questions.
                </p>
              </div>
              <Link
                href="/profile"
                className="px-4 py-2 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold shrink-0 text-center transition-all shadow-sm"
              >
                Scan PIQ Form 107-A
              </Link>
            </div>
          )}
        </div>

      </main>

      {/* Interactive Practice Modal for Predicted Question */}
      {selectedQuestion && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="w-full max-w-lg rounded-2xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 sm:p-6 shadow-2xl space-y-4 font-mono">
            <div className="flex items-center justify-between border-b border-[var(--canvas-border)] pb-3">
              <div className="flex items-center gap-2">
                <MessageSquareQuote className="w-4 h-4 text-[var(--gold-accent)]" />
                <span className="text-xs font-extrabold text-[var(--fg-primary)] uppercase">
                  Interviewing Officer Practice Drill
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedQuestion(null)}
                className="text-xs text-[var(--fg-muted)] hover:text-[var(--fg-primary)] px-2 py-1 rounded border border-[var(--canvas-border)] cursor-pointer"
              >
                ESC
              </button>
            </div>

            <div className="space-y-2">
              <span className="text-[10px] text-[var(--fg-muted)] uppercase tracking-wider block">
                Target Question (From Your PIQ):
              </span>
              <p className="text-sm font-bold text-[var(--fg-primary)] leading-relaxed bg-[var(--canvas-surface-subtle)] p-3 rounded-xl border border-[var(--canvas-border)]">
                &ldquo;{selectedQuestion}&rdquo;
              </p>
            </div>

            <div className="space-y-1.5 text-xs text-[var(--fg-secondary)] font-sans">
              <span className="text-[11px] font-bold text-[var(--gold-accent)] uppercase font-mono block">
                Senior Assessor Advice:
              </span>
              <p className="text-[11px] leading-relaxed">
                Maintain direct eye contact, avoid defensive hand gestures, and provide a direct factual answer before elaborating on the context. Never fabricate details that contradict items in your written Form 107-A.
              </p>
            </div>

            <div className="pt-2 flex items-center justify-end gap-2">
              <button
                type="button"
                onClick={() => setSelectedQuestion(null)}
                className="px-4 py-2 rounded-lg border border-[var(--canvas-border)] text-xs font-bold hover:bg-[var(--canvas-surface-subtle)] cursor-pointer"
              >
                Close
              </button>
              <button
                type="button"
                onClick={() => {
                  setSelectedQuestion(null);
                  handleLaunchDrill("interview", "PIQ Question Audio Drill", "5 mins");
                }}
                className="px-4 py-2 rounded-lg bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] text-white text-xs font-bold transition-all shadow-sm cursor-pointer"
              >
                Record Spoken Response
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
}