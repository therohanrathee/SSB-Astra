"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { User, Award, CheckCircle2, ChevronRight, LogOut, Terminal, BookOpen, MapPin, Compass } from "lucide-react";
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
          // If no active session, show demo candidate or redirect
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
      {/* Top HUD Nav */}
      <header className="border-b border-[var(--canvas-border)] bg-[var(--canvas-surface)]/90 backdrop-blur-md px-4 sm:px-8 py-3.5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-md border border-[var(--primary-accent)]/60 bg-[var(--canvas-surface)] flex items-center justify-center shadow-sm">
            <CrossedSwords className="w-4 h-4 text-[var(--primary-accent)]" />
          </div>
          <div>
            <span className="text-sm font-extrabold tracking-wider">
              SSB<span className="text-[var(--gold-accent)] font-semibold">ASTRA</span>
            </span>
            <span className="text-[9px] block text-[var(--fg-muted)] leading-none">CANDIDATE HQ</span>
          </div>
        </Link>

        <div className="flex items-center gap-3">
          <div className="text-right hidden sm:block">
            <div className="text-xs font-bold">{profile?.full_name}</div>
            <div className="text-[10px] text-[var(--gold-accent)] font-semibold">
              ENTRY: {profile?.target_entry || "NDA"}
            </div>
          </div>
          <button
            onClick={handleLogout}
            className="p-2 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface)] hover:border-rose-500 hover:text-rose-500 transition-colors"
            title="Sign Out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </header>

      {/* Main Dashboard Container */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 w-full space-y-6">
        
        {/* Profile Completion Psychological Progress Bar */}
        <div className="hud-corner rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 shadow-lg">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-3">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold uppercase tracking-wider text-[var(--fg-primary)]">
                  Candidate Dossier Status
                </span>
                <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 border border-amber-500/20">
                  {completionPct}% Complete
                </span>
              </div>
              <p className="text-xs text-[var(--fg-secondary)] font-sans mt-0.5">
                Your dossier is partially initialized. Complete your PIQ (Personal Information Questionnaire) details to unlock accurate 15-OLQ interview predictions.
              </p>
            </div>
            <button className="px-4 py-2 rounded text-xs font-bold uppercase tracking-wider bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-hover)] transition-all shrink-0">
              Complete Profile (+70%)
            </button>
          </div>

          {/* Progress Bar Visual */}
          <div className="w-full h-2.5 rounded-full bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border-subtle)] overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-[var(--gold-accent)] to-[var(--primary-accent)] transition-all duration-500"
              style={{ width: `${completionPct}%` }}
            />
          </div>
        </div>

        {/* Tactical Test Suites Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Suite 1: Stage-1 Computerised Screening */}
          <div className="hud-corner rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded bg-[var(--primary-accent)]/10 text-[var(--primary-accent)] flex items-center justify-center">
                  <Terminal className="w-5 h-5" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] font-bold">
                  STAGE-1
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--fg-primary)] mb-1">
                CSSS & OPAM Simulator
              </h3>
              <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-4">
                ~70 cognitive micro-timed items (Working Memory, Spatial 3D, Audio Tones) followed by ~120 psychometric OLQ Likert items.
              </p>
            </div>
            <button className="w-full flex items-center justify-between p-2.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] hover:border-[var(--primary-accent)] hover:text-[var(--primary-accent)] transition-all text-xs font-bold">
              <span>Launch Screening Mock</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Suite 2: Stage-2 Psychology Series */}
          <div className="hud-corner rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded bg-lime-500/10 text-lime-500 flex items-center justify-center">
                  <BookOpen className="w-5 h-5" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-lime-500/10 text-lime-500 font-bold">
                  STAGE-2 PSYCH
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--fg-primary)] mb-1">
                TAT, WAT, SRT & SD
              </h3>
              <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-4">
                Full-fidelity timed slide projection for Thematic Apperception, 15-second Word Association, and 60 Situations.
              </p>
            </div>
            <button className="w-full flex items-center justify-between p-2.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] hover:border-lime-500 hover:text-lime-500 transition-all text-xs font-bold">
              <span>Enter Psych Practice Lab</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

          {/* Suite 3: Stage-2 GTO Tactical Ground Series */}
          <div className="hud-corner rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-5 flex flex-col justify-between shadow-md">
            <div>
              <div className="flex items-center justify-between mb-3">
                <div className="w-9 h-9 rounded bg-amber-500/10 text-amber-500 flex items-center justify-center">
                  <Compass className="w-5 h-5" />
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded bg-amber-500/10 text-amber-500 font-bold">
                  STAGE-2 GTO
                </span>
              </div>
              <h3 className="text-base font-bold text-[var(--fg-primary)] mb-1">
                GPE Tactical Planning
              </h3>
              <p className="text-xs text-[var(--fg-secondary)] font-sans leading-relaxed mb-4">
                Interactive Group Planning Exercise sand models: distance calculations, priority allocation, and operational draft writing.
              </p>
            </div>
            <button className="w-full flex items-center justify-between p-2.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] hover:border-amber-500 hover:text-amber-500 transition-all text-xs font-bold">
              <span>Open GPE Sand Model</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </main>
    </div>
  );
}
