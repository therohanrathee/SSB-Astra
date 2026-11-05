"use client";

import React, { useState } from "react";
import { ChevronDown, HelpCircle, ShieldCheck } from "lucide-react";

const faqs = [
  {
    q: "Is the new CSSS and OPAM process officially implemented in all SSB boards?",
    a: "The system was designed and validated by DIPR (DRDO). The Indian Armed Forces have conducted extensive pilot batches and phased parallel trials across multiple boards (including 1 AFSB Dehradun, 3 AFSB Gandhinagar, SCS Bhopal, and SCC Allahabad). While traditional PPDT is still encountered in some centers, transition toward full digital screening is ongoing. Our simulator prepares you for both.",
  },
  {
    q: "Why are per-question timers (16 to 30 seconds) enforced in CSSS?",
    a: "Unlike civilian competitive exams where candidates can skip and return, the Armed Forces specifically assess rapid cognitive processing, spatial orientation under stress, and decisiveness. If a candidate cannot solve a problem within 20 seconds, it reflects hesitation in high-pressure operational environments.",
  },
  {
    q: "What is the Lie Scale in the OPAM psychometric test?",
    a: "The Lie Scale (Social Desirability Scale) is a psychological mechanism embedded in OPAM to catch candidates who try to portray an unrealistically virtuous persona (e.g., claiming they 'never get angry' or 'have never broken any rule'). Choosing artificially perfect responses raises your Lie score and can cause rejection.",
  },
  {
    q: "Do I really need headphones for the screening test?",
    a: "Yes! In the real CSSS battery at the selection center, candidates are issued headphones for the Auditory Discrimination subtest to evaluate phonetic comprehension, tone differentiation, and signal isolation under radio noise. Our platform's audio calibration tool tests your headphones before every mock drill.",
  },
  {
    q: "Will this platform also support candidates preparing for traditional PPDT?",
    a: "Yes. In Phase 2 and 3, our platform includes both the Digital Mode (CSSS + OPAM) and a Transition Mode (OIR Booklet Practice + PPDT Picture Story Writing & Narration Timer), ensuring 100% coverage no matter which board you are summoned to.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (i: number) => {
    setOpenIndex(openIndex === i ? null : i);
  };

  return (
    <section id="faq" className="py-24 sm:py-32 border-t border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)]">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)]">
            Intelligence & Briefing
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--fg-primary)] tracking-tight">
            Frequently Asked Questions
          </h2>
          <p className="text-sm sm:text-base text-[var(--fg-secondary)]">
            Everything you need to know about the modern computerized screening system and our simulator.
          </p>
        </div>

        {/* Accordion */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx;
            return (
              <div
                key={idx}
                className="hud-corner rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] overflow-hidden shadow-sm transition-all"
              >
                <button
                  onClick={() => toggle(idx)}
                  className="w-full text-left p-5 sm:p-6 flex items-center justify-between gap-4 font-semibold text-[var(--fg-primary)] text-sm sm:text-base hover:text-[var(--primary-accent)] transition-colors"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className="w-4 h-4 text-[var(--primary-accent)] shrink-0" />
                    <span>{faq.q}</span>
                  </span>
                  <ChevronDown
                    className={`w-4 h-4 text-[var(--fg-muted)] shrink-0 transition-transform duration-200 ${
                      isOpen ? "rotate-180 text-[var(--primary-accent)]" : ""
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-xs sm:text-sm text-[var(--fg-secondary)] leading-relaxed border-t border-[var(--canvas-border-subtle)] pt-4 bg-[var(--canvas-surface-subtle)]/40">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
