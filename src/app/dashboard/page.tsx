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
  Sparkles, 
  Clock, 
  Flame, 
  Target,
  Edit3
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import ThemeToggle from "@/components/ThemeToggle";
import { supabase } from "@/lib/supabaseClient";
import { getDynamicOfficerGreeting } from "@/lib/greeting";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  dob?: string;
  gender?: string | null; // Future field: to be populated in Phase 3.5 PIQ completion
  target_entry?: string;
  profile_completion_pct: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [greeting, setGreeting] = useState("Welcome, Future Officer");
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

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
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // If no active session, show preview cadet
          const demoProfile = {
            id: "demo-officer",
            email: "candidate@ssbastra.in",
            full_name: "Cadet Aspirant",
            target_entry: "NDA",
            gender: null,
            profile_completion_pct: 30,
          };
          setProfile(demoProfile);
          setGreeting(getDynamicOfficerGreeting(demoProfile.full_name, demoProfile.gender));
        } else {
          // Fetch user profile from Supabase
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

          if (data) {
            setProfile(data);
            setGreeting(getDynamicOfficerGreeting(data.full_name, data.gender));
          } else {
            const fallbackProfile = {
              id: user.id,
              email: user.email || "",
              full_name: user.user_metadata?.full_name || "Cadet Aspirant",
              target_entry: user.user_metadata?.target_entry || "CDS",
              gender: null,
              profile_completion_pct: 30,
            };
            setProfile(fallbackProfile);
            setGreeting(getDynamicOfficerGreeting(fallbackProfile.full_name, fallbackProfile.gender));
          }
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

  if (loading) {
    return (
      <div className="min-h-screen bg-military-grid flex items-center justify-center font-mono text-xs text-[var(--fg-muted)]">
        AUTHENTICATING DOSSIER...
      </div>
    );
  }

  const completionPct = profile?.profile_completion_pct || 30;

  return (
    <div className="min-h-screen bg-military-grid flex flex-col font-mono text-[var(--fg-primary)]">
      {/* Floating Top HUD (Invisible Header Container with Floating Action Pills) */}
      <header className="sticky top-0 z-40 px-4 sm:px-8 py-3.5 pointer-events-none">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-3">
          
          {/* Left: Brand / Home Link Floating Pill */}
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

          {/* Right: Floating Theme Toggle & User Profile Widget */}
          <div className="pointer-events-auto flex items-center gap-3">
            <ThemeToggle compact />

          <div className="relative" ref={menuRef}>
          {completionPct < 100 ? (
            /* Extended Profile Window when profile is not complete:
               Complete button on LEFT, Profile info & Avatar on RIGHT */
            <div className="flex items-center gap-2.5 sm:gap-3 bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] rounded-lg py-1.5 px-3">
              
              {/* Complete PIQ Button on the LEFT */}
              <Link
                href="/profile"
                className="text-[10px] font-bold px-2.5 py-1 rounded bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-hover)] transition-all whitespace-nowrap active:scale-95 shadow-sm inline-block text-center"
                title="Complete your Personal Information Questionnaire (PIQ) to reach 100%"
              >
                Complete PIQ
              </Link>

              {/* Candidate Info & Micro Progress */}
              <div className="hidden sm:block text-right">
                <div className="flex items-center justify-end gap-2 leading-tight">
                  <span className="text-xs font-bold text-[var(--fg-primary)] max-w-[120px] truncate">
                    {profile?.full_name}
                  </span>
                  <span className="text-[10px] font-bold text-[var(--gold-accent)]">
                    {completionPct}% PIQ
                  </span>
                </div>
                
                {/* Micro Progress Bar */}
                <div className="w-24 h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden mt-1 ml-auto">
                  <div
                    className="h-full bg-gradient-to-r from-[var(--gold-accent)] to-[var(--primary-accent)]"
                    style={{ width: `${completionPct}%` }}
                  />
                </div>
              </div>

              {/* Profile Avatar Trigger Button on the RIGHT */}
              <button
                onClick={() => setMenuOpen(!menuOpen)}
                className="w-8 h-8 rounded-full border border-[var(--primary-accent)]/50 bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] hover:border-[var(--primary-accent)] flex items-center justify-center font-bold text-xs shrink-0 transition-transform active:scale-95 focus:outline-none"
                title="Account menu"
              >
                {profile?.full_name?.charAt(0).toUpperCase() || "C"}
              </button>
            </div>
          ) : (
            /* Compact Icon when profile is 100% complete */
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="w-9 h-9 rounded-full border border-[var(--primary-accent)]/60 bg-[var(--primary-accent)]/15 text-[var(--primary-accent)] hover:border-[var(--primary-accent)] flex items-center justify-center font-bold text-sm shrink-0 transition-transform active:scale-95 shadow-sm focus:outline-none"
              title="Account menu"
            >
              {profile?.full_name?.charAt(0).toUpperCase() || "C"}
            </button>
          )}

          {/* Profile Dropdown Menu with Logout Option */}
          {menuOpen && (
            <div className="absolute right-0 mt-2 w-60 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-2xl p-2 z-50 animate-in fade-in zoom-in-95 duration-100 font-mono">
              <div className="p-2 border-b border-[var(--canvas-border)] mb-1">
                <div className="text-xs font-bold text-[var(--fg-primary)] truncate">
                  {profile?.full_name}
                </div>
                <div className="text-[10px] text-[var(--fg-muted)] truncate">
                  {profile?.email}
                </div>
                <div className="mt-1 inline-flex items-center gap-1 text-[9px] px-1.5 py-0.5 rounded bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] font-semibold">
                  ENTRY: {profile?.target_entry || "NDA"}
                </div>
              </div>

              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="w-full text-left flex items-center gap-2 px-2.5 py-2 text-xs rounded hover:bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)] hover:text-[var(--fg-primary)] transition-colors"
              >
                <Edit3 className="w-3.5 h-3.5 text-[var(--gold-accent)]" />
                <span>Edit PIQ Details</span>
              </Link>

              <button
                onClick={() => {
                  setMenuOpen(false);
                  handleLogout();
                }}
                className="w-full text-left flex items-center gap-2 px-2.5 py-2 text-xs rounded hover:bg-rose-500/10 text-rose-500 transition-colors"
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

      {/* Main Dashboard Workspace */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-8 flex-1">
        
        {/* Welcome Briefing Banner */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 border-b border-[var(--canvas-border)] pb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-wider bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)] mb-2">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              SSB ENTRY: {profile?.target_entry || "NDA"} • MISSION ACTIVE
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg-primary)] tracking-tight">
              {greeting}
            </h1>
            <p className="text-xs sm:text-sm text-[var(--fg-secondary)] font-sans max-w-2xl mt-1">
              Select your targeted testing battery below to begin high-fidelity practice drills or launch complete mock evaluation sessions.
            </p>
          </div>

          {/* Fast Stats Pill */}
          <div className="flex items-center gap-4 text-xs font-mono bg-[var(--canvas-surface)] border border-[var(--canvas-border)] p-3 rounded-lg shadow-sm">
            <div className="flex items-center gap-2">
              <Target className="w-4 h-4 text-[var(--primary-accent)]" />
              <div>
                <span className="text-[10px] text-[var(--fg-muted)] block">TARGET</span>
                <span className="font-bold">{profile?.target_entry || "NDA"}</span>
              </div>
            </div>
            <div className="w-[1px] h-6 bg-[var(--canvas-border)]" />
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-[var(--gold-accent)]" />
              <div>
                <span className="text-[10px] text-[var(--fg-muted)] block">STATUS</span>
                <span className="font-bold text-emerald-500">READY</span>
              </div>
            </div>
          </div>
        </div>

        {/* Tactical Testing Hub: 3 Primary Cards */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-widest text-[var(--fg-muted)]">
              Core Selection Assessment Suites
            </h2>
            <span className="text-xs text-[var(--gold-accent)] font-semibold">3 Active Suites</span>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* CARD 1: SCREENING */}
            <div className="hud-corner rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6 flex flex-col justify-between shadow-lg hover:border-[var(--primary-accent)] transition-all group">
              <div>
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center border border-[var(--primary-accent)]/20 group-hover:scale-105 transition-transform">
                    <Terminal className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)]">
                    DAY 01
                  </span>
                </div>

                {/* Title & Badge */}
                <div className="text-[11px] font-mono font-bold text-[var(--gold-accent)] uppercase mb-1">
                  Stage-1 Testing
                </div>
                <h3 className="text-xl font-extrabold text-[var(--fg-primary)] mb-2.5">
                  Screening
                </h3>

                {/* Description */}
                <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-6">
                  Master the new DIPR computerized battery featuring the <strong className="text-[var(--fg-primary)]">CSSS cognitive test</strong> (micro-timers, spatial folding, auditory discrimination) and the <strong className="text-[var(--fg-primary)]">OPAM psychometric profile</strong> with built-in consistency checks, along with traditional OIR & PPDT.
                </p>

                {/* Subtest Bullet Matrix */}
                <div className="space-y-2 mb-6 font-mono text-[11px] text-[var(--fg-muted)] border-t border-[var(--canvas-border)] pt-4">
                  <div className="flex items-center justify-between">
                    <span>• CSSS Cognitive (~70 Qs)</span>
                    <span className="text-[var(--primary-accent)]">16-30s / Q</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• OPAM Psychometric (~120 Qs)</span>
                    <span className="text-[var(--primary-accent)]">15 OLQs</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Legacy OIR & PPDT Mode</span>
                    <span className="text-emerald-500">Available</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => alert("CSSS & OPAM Screening Engine launching...")}
                className="w-full flex items-center justify-between p-3 rounded-lg bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-hover)] transition-all text-xs font-bold shadow-md hover:shadow-[0_0_15px_var(--primary-glow)] active:scale-95"
              >
                <span>Launch Screening Battery</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* CARD 2: PSYCHOLOGY */}
            <div className="hud-corner rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6 flex flex-col justify-between shadow-lg hover:border-lime-500 transition-all group">
              <div>
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-lime-500/10 text-lime-500 flex items-center justify-center border border-lime-500/20 group-hover:scale-105 transition-transform">
                    <BookOpen className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-500/20">
                    DAY 02
                  </span>
                </div>

                {/* Title & Badge */}
                <div className="text-[11px] font-mono font-bold text-lime-600 dark:text-lime-400 uppercase mb-1">
                  Manso Vacha
                </div>
                <h3 className="text-xl font-extrabold text-[var(--fg-primary)] mb-2.5">
                  Psychology
                </h3>

                {/* Description */}
                <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-6">
                  Rigorous projective personality drills simulating real testing conditions. Train on time-pressured story projection for <strong className="text-[var(--fg-primary)]">TAT</strong>, rapid-fire subconscious word reactions for <strong className="text-[var(--fg-primary)]">WAT</strong>, and realistic dilemmas in <strong className="text-[var(--fg-primary)]">SRT</strong> and <strong className="text-[var(--fg-primary)]">SD</strong>.
                </p>

                {/* Subtest Bullet Matrix */}
                <div className="space-y-2 mb-6 font-mono text-[11px] text-[var(--fg-muted)] border-t border-[var(--canvas-border)] pt-4">
                  <div className="flex items-center justify-between">
                    <span>• TAT (11 Slides + 1 Blank)</span>
                    <span className="text-lime-500">4 Mins / Slide</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• WAT (60 Flash Words)</span>
                    <span className="text-lime-500">15s / Word</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• SRT (60 Situations) & SD</span>
                    <span className="text-lime-500">30 Mins Total</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => alert("Psychology Lab suite launching...")}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-lime-500/30 bg-lime-500/10 text-lime-600 dark:text-lime-400 hover:bg-lime-500 hover:text-white transition-all text-xs font-bold shadow-sm active:scale-95"
              >
                <span>Enter Psychology Lab</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

            {/* CARD 3: GTO */}
            <div className="hud-corner rounded-xl border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6 flex flex-col justify-between shadow-lg hover:border-amber-500 transition-all group">
              <div>
                {/* Header Tag & Icon */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-12 h-12 rounded-lg bg-amber-500/10 text-amber-500 flex items-center justify-center border border-amber-500/20 group-hover:scale-105 transition-transform">
                    <Compass className="w-6 h-6" />
                  </div>
                  <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20">
                    DAY 03 & 04
                  </span>
                </div>

                {/* Title & Badge */}
                <div className="text-[11px] font-mono font-bold text-amber-600 dark:text-amber-400 uppercase mb-1">
                  Karmana Series
                </div>
                <h3 className="text-xl font-extrabold text-[var(--fg-primary)] mb-2.5">
                  GTO
                </h3>

                {/* Description */}
                <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-6">
                  Master ground tasks and outdoor challenges. Practice <strong className="text-[var(--fg-primary)]">GPE (Group Planning Exercise)</strong> tactical sand models, prioritize operational assets, learn cantilever/fulcrum bridging physics for <strong className="text-[var(--fg-primary)]">PGT/HGT</strong>, and explore curated <strong className="text-[var(--fg-primary)]">Lecturette</strong> topics.
                </p>

                {/* Subtest Bullet Matrix */}
                <div className="space-y-2 mb-6 font-mono text-[11px] text-[var(--fg-muted)] border-t border-[var(--canvas-border)] pt-4">
                  <div className="flex items-center justify-between">
                    <span>• GPE Tactical Sand Models</span>
                    <span className="text-amber-500">Interactive Map</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• PGT, HGT & Command Task</span>
                    <span className="text-amber-500">Physics & Rules</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span>• Lecturette & GD Intel</span>
                    <span className="text-amber-500">Defense Feeds</span>
                  </div>
                </div>
              </div>

              {/* Action Button */}
              <button 
                onClick={() => alert("GTO Sand Model planner launching...")}
                className="w-full flex items-center justify-between p-3 rounded-lg border border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400 hover:bg-amber-500 hover:text-white transition-all text-xs font-bold shadow-sm active:scale-95"
              >
                <span>Open GTO Simulator</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </main>
    </div>
  );
}
