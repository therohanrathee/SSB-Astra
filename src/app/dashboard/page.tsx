"use client";

import React, { useEffect, useState } from "react";
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
  Target 
} from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import { supabase } from "@/lib/supabaseClient";

interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  dob?: string;
  target_entry?: string;
  profile_completion_pct: number;
}

export default function DashboardPage() {
  const router = useRouter();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadUser() {
      try {
        const { data: { user } } = await supabase.auth.getUser();
        if (!user) {
          // If no active session, show preview cadet
          setProfile({
            id: "demo-officer",
            email: "candidate@ssbastra.in",
            full_name: "Cadet Aspirant",
            target_entry: "NDA",
            profile_completion_pct: 30,
          });
        } else {
          // Fetch user profile from Supabase
          const { data } = await supabase
            .from("profiles")
            .select("*")
            .eq("id", user.id)
            .maybeSingle();

          if (data) {
            setProfile(data);
          } else {
            setProfile({
              id: user.id,
              email: user.email || "",
              full_name: user.user_metadata?.full_name || "Cadet Aspirant",
              target_entry: user.user_metadata?.target_entry || "CDS",
              profile_completion_pct: 30,
            });
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
      {/* Top HUD Professional Navigation Bar */}
      <header className="border-b border-[var(--canvas-border)] bg-[var(--canvas-surface)]/90 backdrop-blur-md px-4 sm:px-8 py-3 flex items-center justify-between sticky top-0 z-40">
        
        {/* Left: Brand / Home Link */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md border border-[var(--primary-accent)]/60 bg-[var(--canvas-surface)] flex items-center justify-center shadow-sm">
            <CrossedSwords className="w-5 h-5 text-[var(--primary-accent)]" />
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-wider">
              SSB<span className="text-[var(--gold-accent)] font-semibold">ASTRA</span>
            </span>
            <span className="text-[9px] block text-[var(--fg-muted)] leading-none uppercase">CANDIDATE HQ</span>
          </div>
        </Link>

        {/* Right: Professional User Profile Widget with Completion Meter */}
        <div className="flex items-center gap-3 sm:gap-5">
          
          {/* Embedded Profile Status & Completion Bar */}
          <div className="flex items-center gap-3 bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border)] rounded-lg py-1.5 px-3">
            
            {/* User Avatar Circle */}
            <div className="w-8 h-8 rounded-full border border-[var(--primary-accent)]/40 bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center font-bold text-xs shrink-0">
              {profile?.full_name?.charAt(0).toUpperCase() || "C"}
            </div>

            {/* Candidate Metadata & Micro Progress */}
            <div className="hidden sm:block text-left">
              <div className="flex items-center justify-between gap-3 leading-tight">
                <span className="text-xs font-bold text-[var(--fg-primary)] max-w-[120px] truncate">
                  {profile?.full_name}
                </span>
                <span className="text-[10px] font-bold text-[var(--gold-accent)]">
                  {completionPct}%
                </span>
              </div>
              
              {/* Micro Progress Bar */}
              <div className="w-28 h-1.5 bg-[var(--canvas-border)] rounded-full overflow-hidden mt-1">
                <div
                  className="h-full bg-gradient-to-r from-[var(--gold-accent)] to-[var(--primary-accent)]"
                  style={{ width: `${completionPct}%` }}
                />
              </div>
            </div>

            {/* Quick Action to Complete Dossier */}
            <button
              onClick={() => alert("PIQ Dossier editor will open in the next module.")}
              className="text-[10px] font-bold px-2 py-1 rounded bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-hover)] transition-all whitespace-nowrap hidden md:inline-block"
              title="Complete your Personal Information Questionnaire to reach 100%"
            >
              Complete PIQ
            </button>
          </div>

          {/* Sign Out Button */}
          <button
            onClick={handleLogout}
            className="p-2 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-rose-500 hover:text-rose-500 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
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
              Officer Candidate Terminal
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
