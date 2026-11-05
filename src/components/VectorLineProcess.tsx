"use client";

import React, { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { MapPin, Cpu, UserCheck, CheckCircle2, Headphones, ShieldAlert, Award } from "lucide-react";

interface Step {
  id: string;
  stageBadge: string;
  title: string;
  timeConstraint: string;
  icon: React.ElementType;
  description: string;
  militaryProtocol: string;
  tacticalDetails: string[];
}

const steps: Step[] = [
  {
    id: "step-1",
    stageBadge: "PHASE 01: ARRIVAL & BIOMETRICS",
    title: "Reporting & Headphone Allocation",
    timeConstraint: "06:30 - 08:00 HRS",
    icon: MapPin,
    description:
      "Candidates report to the Selection Centre (e.g. Allahabad, Bhopal, Bangalore, Dehradun). Document verification is followed by allotment of individual Computer Terminal IDs and testing headphones.",
    militaryProtocol: "Hardware Calibration Protocol: Web audio and frequency check must be verified before proceeding to the cognitive chamber.",
    tacticalDetails: [
      "Chest number generation and terminal mapping",
      "Headset volume & clarity threshold test",
      "Digital orientation briefing (Strict no-cellphone rules)",
    ],
  },
  {
    id: "step-2",
    stageBadge: "PHASE 02: COGNITIVE BATTERY",
    title: "CSSS (Computerised Stage-1 Selection System)",
    timeConstraint: "~70 QUESTIONS | 16-30s PER ITEM",
    icon: Cpu,
    description:
      "Replaces the traditional paper OIR. Rapid-fire digital subtests evaluating working memory, spatial folding, auditory discrimination, and perceptual speed under stringent countdown pressure.",
    militaryProtocol: "Non-Linear Navigation Forbidden: The screen auto-advances at 00:00s. No return button. Once committed or timed out, your answer is sealed.",
    tacticalDetails: [
      "Working Memory: 3-second flash matrix recall",
      "Auditory Discrimination: Tone pairs & NATO phonetic callouts",
      "Spatial & Mechanical Reasoning: 2D-to-3D block rotations",
    ],
  },
  {
    id: "step-3",
    stageBadge: "PHASE 03: PSYCHOMETRIC BATTERY",
    title: "OPAM (Objective Personality Assessment Measure)",
    timeConstraint: "~120 QUESTIONS | ~35 MINUTES",
    icon: UserCheck,
    description:
      "Replaces subjective PPDT discussion disputes. Tests candidates on behavioral Likert-scale statements and situational forced-choice dilemmas directly mapped against the 15 Officer-Like Qualities (OLQs).",
    militaryProtocol: "Algorithmic Consistency & Lie Check: Cross-checks identical psychological traits phrased positively and inversely to catch 'social faking' or coached responses.",
    tacticalDetails: [
      "Factor I: Planning & Organizing (Effective Intelligence)",
      "Factor II & III: Social Adjustment & Dynamic Effectiveness",
      "Social Desirability Scale: Flags artificial perfectionism",
    ],
  },
  {
    id: "step-4",
    stageBadge: "PHASE 04: COMPUTATIONAL SCREENING",
    title: "Automated Result & Stage-2 Callup",
    timeConstraint: "INSTANT COMPILATION | 13:00 HRS",
    icon: Award,
    description:
      "Results are compiled algorithmically by the DIPR software without assessor bias or discussion shouting matches. Recommended candidates proceed immediately to the 4-Day Stage-2 testing.",
    militaryProtocol: "Transparent Metric: Evaluates composite cognitive velocity, factor balance, and psychometric reliability threshold.",
    tacticalDetails: [
      "Screened-in candidates receive Stage-2 chest numbers",
      "Complete 15-factor radar profile generated for assessors",
      "Screened-out candidates debriefed and cleared for departure",
    ],
  },
];

export default function VectorLineProcess() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track scroll inside this specific section
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end end"],
  });

  // Calculate SVG line drawing height percentage
  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      ref={containerRef}
      className="relative py-24 sm:py-32 border-t border-[var(--canvas-border)] bg-[var(--canvas-bg)]"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-20 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)]">
            Mission Timeline
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--fg-primary)] tracking-tight">
            The Digital Stage-1 Screening Journey
          </h2>
          <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed">
            Follow the exact step-by-step vector path a candidate navigates on Day 1 at the selection centre under the new DIPR computerized procedure.
          </p>
        </div>

        {/* Vector Line Animated Timeline Container */}
        <div className="relative max-w-4xl mx-auto">
          
          {/* Background Vector Line Track (Muted) */}
          <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-1 -translate-x-1/2 bg-[var(--canvas-border)] rounded-full hidden sm:block" />

          {/* Foreground Animated Vector Line (Scroll-Driven Glow) */}
          <motion.div
            style={{ height: pathHeight }}
            className="absolute left-6 md:left-1/2 top-4 w-1 -translate-x-1/2 bg-gradient-to-b from-[var(--primary-accent)] to-[var(--gold-accent)] rounded-full shadow-[0_0_12px_var(--primary-accent)] hidden sm:block z-10"
          />

          {/* Timeline Milestones */}
          <div className="space-y-16 relative z-20">
            {steps.map((step, idx) => {
              const isEven = idx % 2 === 0;
              const Icon = step.icon;

              return (
                <div
                  key={step.id}
                  className={`flex flex-col sm:flex-row items-center gap-8 ${
                    isEven ? "sm:flex-row-reverse" : ""
                  }`}
                >
                  {/* Step Card Content */}
                  <div className="w-full sm:w-1/2">
                    <div
                      className={`hud-corner p-6 sm:p-7 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] shadow-lg hover:border-[var(--primary-accent)] transition-all ${
                        isEven ? "sm:text-left" : "sm:text-left"
                      }`}
                    >
                      {/* Top Meta info */}
                      <div className="flex items-center justify-between gap-2 mb-3">
                        <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)]">
                          {step.stageBadge}
                        </span>
                        <span className="text-xs font-mono font-semibold text-[var(--gold-accent)]">
                          {step.timeConstraint}
                        </span>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-[var(--fg-primary)] mb-2">
                        {step.title}
                      </h3>

                      {/* Description */}
                      <p className="text-xs sm:text-sm text-[var(--fg-secondary)] leading-relaxed mb-4">
                        {step.description}
                      </p>

                      {/* Military Protocol Alert Box */}
                      <div className="p-3 rounded bg-[var(--canvas-surface-subtle)] border-l-2 border-[var(--primary-accent)] text-xs text-[var(--fg-secondary)] mb-4 font-mono">
                        <span className="text-[var(--primary-accent)] font-bold block mb-1">
                          OPERATIONAL PROTOCOL:
                        </span>
                        {step.militaryProtocol}
                      </div>

                      {/* Tactical Checklist Bullets */}
                      <ul className="space-y-1.5 text-xs text-[var(--fg-muted)]">
                        {step.tacticalDetails.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <CheckCircle2 className="w-3.5 h-3.5 text-[var(--primary-accent)] shrink-0" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Center Node Indicator on the Vector Line */}
                  <div className="relative flex items-center justify-center shrink-0">
                    <div className="w-12 h-12 rounded-full border-2 border-[var(--primary-accent)] bg-[var(--canvas-surface)] flex items-center justify-center shadow-lg relative z-20 group">
                      <div className="absolute inset-0 rounded-full bg-[var(--primary-glow)] animate-ping opacity-30" />
                      <Icon className="w-5 h-5 text-[var(--primary-accent)]" />
                    </div>
                  </div>

                  {/* Empty Spacer Column for Desktop Balance */}
                  <div className="w-full sm:w-1/2 hidden sm:block" />
                </div>
              );
            })}
          </div>

        </div>

      </div>
    </section>
  );
}
