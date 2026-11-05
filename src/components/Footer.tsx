"use client";

import React from "react";
import { Terminal, ArrowRight, CheckCircle2 } from "lucide-react";
import CrossedSwords from "@/components/CrossedSwords";
import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t border-[var(--canvas-border)] bg-[var(--canvas-bg)] text-[var(--fg-secondary)] text-xs font-mono">
      {/* Pre-footer Call to Action Banner */}
      <div className="border-b border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] py-14">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] text-[10px] font-bold">
            STAGE-1 READINESS INITIATIVE
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-[var(--fg-primary)] font-sans">
            Ready to test your reflexes on the computerized simulator?
          </h2>
          <p className="max-w-xl mx-auto text-xs sm:text-sm text-[var(--fg-secondary)] font-sans">
            Do not let your first time facing micro-timers and audio discrimination be on the actual screening day at the selection board.
          </p>
          <div>
            <Link
              href="#subtests"
              className="inline-flex items-center gap-2 px-6 py-3 rounded text-xs font-bold uppercase tracking-wider text-white bg-[var(--primary-accent)] hover:bg-[var(--primary-hover)] shadow-lg hover:shadow-[0_0_20px_var(--primary-glow)] transition-all"
            >
              <span>Explore Subtests & Audio Demo</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* Main Footer Links & Meta */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2.5 text-[var(--fg-primary)] font-bold text-sm">
              <CrossedSwords className="w-5 h-5 text-[var(--primary-accent)]" />
              <span>SSB ASTRA • OFFICER PREPARATION SUITE</span>
            </div>
            <p className="text-[11px] text-[var(--fg-muted)] font-sans max-w-sm">
              Comprehensive full-spectrum preparation suite for Indian Armed Forces aspirants — covering Stage-1 Digital Screening (CSSS & OPAM) and Stage-2 Psych, GTO, and Interview batteries.
            </p>
            <div className="text-[10px] text-[var(--gold-accent)] font-bold">
              INDIAN ARMY • INDIAN NAVY • INDIAN AIR FORCE
            </div>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[var(--fg-primary)] mb-3 uppercase tracking-wider">
              Practice Suites
            </div>
            <ul className="space-y-2 text-[11px] text-[var(--fg-muted)]">
              <li>• Stage-1 CSSS & OPAM Battery</li>
              <li>• Psychology: TAT, WAT, SRT & SD</li>
              <li>• GTO: GPE Tactical Planning & PGT</li>
              <li>• Personal Interview & OIR Drills</li>
            </ul>
          </div>

          <div>
            <div className="text-[11px] font-bold text-[var(--fg-primary)] mb-3 uppercase tracking-wider">
              Target Entries
            </div>
            <ul className="space-y-2 text-[11px] text-[var(--fg-muted)]">
              <li>• National Defence Academy (NDA)</li>
              <li>• Combined Defence Services (CDS)</li>
              <li>• Air Force Common Admission (AFCAT)</li>
              <li>• TGC, TES & NCC Special Entry</li>
            </ul>
          </div>

        </div>

        <div className="border-t border-[var(--canvas-border)] mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between text-[10px] text-[var(--fg-muted)] gap-3">
          <div>
            © 2026 SSB Astra. All rights reserved.
          </div>
          <div>
            Comprehensive Armed Forces Selection Training Suite
          </div>
        </div>
      </div>
    </footer>
  );
}
