"use client";

import React, { useState } from "react";
import { Headphones, Box, Brain, Volume2, Compass, Play, CheckCircle } from "lucide-react";

export default function SubtestShowcase() {
  const [activeTab, setActiveTab] = useState<"csss" | "opam">("csss");
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);

  // Simulated tone burst audio test using Web Audio API
  const playSampleTone = () => {
    if (typeof window === "undefined") return;
    try {
      const audioCtx = new (window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(880, audioCtx.currentTime); // 880 Hz tone
      osc.frequency.exponentialRampToValueAtTime(440, audioCtx.currentTime + 0.5); // drop to 440 Hz

      gain.gain.setValueAtTime(0.15, audioCtx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.01, audioCtx.currentTime + 0.5);

      osc.connect(gain);
      gain.connect(audioCtx.destination);

      setIsPlayingAudio(true);
      osc.start();
      osc.stop(audioCtx.currentTime + 0.5);

      setTimeout(() => {
        setIsPlayingAudio(false);
      }, 500);
    } catch {
      // Audio context might fail without user interaction
    }
  };

  const csssSubtests = [
    {
      title: "Auditory Discrimination",
      icon: Headphones,
      badge: "Headphone Battery",
      time: "18s / Question",
      desc: "Candidates listen to acoustic tone sequences, frequency jumps, radio static bursts, or military phonetic alphabet callouts (Alpha, Echo, Tango) and isolate target occurrences.",
      interactive: (
        <div className="p-4 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] space-y-3 font-mono text-xs">
          <div className="flex items-center justify-between">
            <span className="text-[var(--fg-muted)]">Tone Differential Test:</span>
            <button
              onClick={playSampleTone}
              className="px-3 py-1.5 rounded bg-[var(--primary-accent)] text-white hover:bg-[var(--primary-hover)] flex items-center gap-1.5 transition-all text-[11px] font-bold"
            >
              <Play className="w-3.5 h-3.5" />
              <span>{isPlayingAudio ? "Playing 880Hz..." : "Play Sample Tone"}</span>
            </button>
          </div>
          <div className="text-[11px] text-[var(--fg-secondary)] font-sans">
            Prompt: "Did the second tone transition higher or lower than reference base?"
          </div>
        </div>
      ),
    },
    {
      title: "Space & Form Perception",
      icon: Box,
      badge: "Spatial 3D Unfolding",
      time: "24s / Question",
      desc: "Evaluates rapid mental 3D rotation, net unfolding of isometric dice, hidden geometric figures, and coordinate projection.",
      interactive: (
        <div className="p-4 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] text-xs font-mono space-y-2">
          <div className="flex items-center justify-between text-[11px] text-[var(--primary-accent)]">
            <span>2D NET ➔ 3D ISOMETRIC</span>
            <span>Orthogonal Rule</span>
          </div>
          <div className="h-16 rounded bg-[var(--canvas-surface)] border border-dashed border-[var(--canvas-border)] flex items-center justify-center text-[var(--fg-muted)]">
            <span className="text-[11px]">Cube Unfolded into 6 Cross Faces (T-Pattern)</span>
          </div>
        </div>
      ),
    },
    {
      title: "Working Memory & Selective Attention",
      icon: Brain,
      badge: "Memory Flash",
      time: "16s / Question",
      desc: "A complex 3x3 matrix of symbols or numbers is displayed for 3 seconds, then vanishes. Candidates must answer questions about rotated positions or absent elements.",
      interactive: (
        <div className="p-4 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] text-xs font-mono">
          <div className="text-[11px] text-[var(--fg-muted)] mb-2">3-Second Memory Matrix:</div>
          <div className="grid grid-cols-3 gap-1.5 max-w-[140px] mx-auto text-center font-bold">
            <div className="p-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">▲</div>
            <div className="p-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">7</div>
            <div className="p-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">■</div>
            <div className="p-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">X</div>
            <div className="p-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">●</div>
            <div className="p-1 rounded bg-[var(--canvas-surface)] border border-[var(--canvas-border)]">3</div>
          </div>
        </div>
      ),
    },
  ];

  const opamFactors = [
    {
      factor: "Factor I: Planning & Organizing",
      olqs: ["Effective Intelligence", "Reasoning Ability", "Organizing Ability", "Power of Expression"],
      sample: "When an unexpected operational roadblock occurs, I naturally create an alternate secondary route before informing my team.",
    },
    {
      factor: "Factor II: Social Adjustment",
      olqs: ["Social Adaptability", "Cooperation", "Sense of Responsibility"],
      sample: "I find it easy to adapt to team members whose work habits differ significantly from my own.",
    },
    {
      factor: "Factor III: Social Effectiveness",
      olqs: ["Initiative", "Self Confidence", "Speed of Decision", "Ability to Influence", "Liveliness"],
      sample: "In ambiguous scenarios where guidelines are missing, I step forward and take the first decisive action.",
    },
    {
      factor: "Factor IV: Dynamic",
      olqs: ["Determination", "Courage", "Stamina"],
      sample: "I persevere with difficult physical or mental tasks even after fatigue sets in.",
    },
  ];

  return (
    <section id="subtests" className="py-24 sm:py-32 border-t border-[var(--canvas-border)] bg-[var(--canvas-bg)]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-semibold uppercase tracking-wider bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)]">
            Subtest Matrix
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[var(--fg-primary)] tracking-tight">
            Anatomy of the CSSS & OPAM Batteries
          </h2>
          <p className="text-sm sm:text-base text-[var(--fg-secondary)] leading-relaxed">
            Inspect the cognitive modules, interactive audio tasks, and 15 Officer-Like Qualities tested in the new protocol.
          </p>

          {/* Subtest Switcher Tabs */}
          <div className="inline-flex p-1 rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] font-mono text-xs">
            <button
              onClick={() => setActiveTab("csss")}
              className={`px-5 py-2 rounded font-bold transition-all ${
                activeTab === "csss"
                  ? "bg-[var(--primary-accent)] text-white shadow"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
              }`}
            >
              Part 1: CSSS Cognitive (~70 Qs)
            </button>
            <button
              onClick={() => setActiveTab("opam")}
              className={`px-5 py-2 rounded font-bold transition-all ${
                activeTab === "opam"
                  ? "bg-[var(--primary-accent)] text-white shadow"
                  : "text-[var(--fg-secondary)] hover:text-[var(--fg-primary)]"
              }`}
            >
              Part 2: OPAM Psychometric (~120 Qs)
            </button>
          </div>
        </div>

        {/* Dynamic Tab Content */}
        {activeTab === "csss" ? (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {csssSubtests.map((sub, i) => {
              const Icon = sub.icon;
              return (
                <div
                  key={i}
                  className="hud-corner rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6 flex flex-col justify-between shadow-lg"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-10 h-10 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] flex items-center justify-center text-[var(--primary-accent)]">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded bg-[var(--service-badge-bg)] text-[var(--service-badge-text)] border border-[var(--service-badge-border)]">
                        {sub.badge}
                      </span>
                    </div>

                    <div className="text-xs font-mono text-[var(--gold-accent)] font-semibold mb-1">
                      {sub.time}
                    </div>

                    <h3 className="text-lg font-bold text-[var(--fg-primary)] mb-2">
                      {sub.title}
                    </h3>

                    <p className="text-xs sm:text-sm text-[var(--fg-secondary)] leading-relaxed mb-4">
                      {sub.desc}
                    </p>
                  </div>

                  <div>{sub.interactive}</div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {opamFactors.map((f, i) => (
              <div
                key={i}
                className="hud-corner rounded-lg border border-[var(--canvas-border)] bg-[var(--canvas-surface)] p-6 shadow-lg"
              >
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-base font-bold text-[var(--fg-primary)]">
                    {f.factor}
                  </h3>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-lime-500/10 text-lime-600 dark:text-lime-400 border border-lime-500/20 font-bold">
                    DIPR Factor {i + 1}
                  </span>
                </div>

                {/* 15 OLQ Badges */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {f.olqs.map((olq, idx) => (
                    <span
                      key={idx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded border border-[var(--canvas-border)] bg-[var(--canvas-surface-subtle)] text-[var(--fg-secondary)]"
                    >
                      {olq}
                    </span>
                  ))}
                </div>

                {/* Sample Question */}
                <div className="p-3 rounded bg-[var(--canvas-surface-subtle)] border border-[var(--canvas-border-subtle)] text-xs text-[var(--fg-secondary)]">
                  <div className="text-[10px] font-mono text-[var(--gold-accent)] uppercase mb-1 font-bold">
                    Sample Diagnostic Statement:
                  </div>
                  <p className="italic">"{f.sample}"</p>
                  <div className="flex justify-between text-[10px] font-mono text-[var(--fg-muted)] pt-2 mt-2 border-t border-[var(--canvas-border)]">
                    <span>Strongly Disagree</span>
                    <span>Neutral</span>
                    <span>Strongly Agree</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </section>
  );
}
