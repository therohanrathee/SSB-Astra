"use client";

/**
 * Web Audio API synthesizer for SSB Examination Signals
 * Generates pure synthesizer tones with zero external asset dependencies.
 */
class ExamAudioEngine {
  private ctx: AudioContext | null = null;

  private initCtx() {
    if (!this.ctx && typeof window !== "undefined") {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === "suspended") {
      this.ctx.resume();
    }
  }

  /**
   * Authentic single chime / gong for picture projection end (30s)
   */
  public playProjectionChime() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = "sine";
      osc.frequency.setValueAtTime(587.33, this.ctx.currentTime); // D5
      osc.frequency.exponentialRampToValueAtTime(293.66, this.ctx.currentTime + 1.2); // D4

      gain.gain.setValueAtTime(0.4, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 1.5);

      osc.connect(gain);
      gain.connect(this.ctx.destination);

      osc.start();
      osc.stop(this.ctx.currentTime + 1.5);
    } catch {
      // Audio autoplay policy catch
    }
  }

  /**
   * Loud, urgent official SSB buzzer when 4:00 writing time is up (Pen-Down buzzer)
   */
  public playPenDownBuzzer() {
    try {
      this.initCtx();
      if (!this.ctx) return;

      const now = this.ctx.currentTime;
      // Dual tone dissonant square wave buzzer
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = "sawtooth";
      osc1.frequency.setValueAtTime(220, now); // A3

      osc2.type = "square";
      osc2.frequency.setValueAtTime(233.08, now); // Bb3 (dissonant semitone for urgency)

      gain.gain.setValueAtTime(0.5, now);
      gain.gain.setValueAtTime(0.5, now + 1.2);
      gain.gain.exponentialRampToValueAtTime(0.01, now + 1.8);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(now);
      osc2.start(now);

      osc1.stop(now + 1.8);
      osc2.stop(now + 1.8);
    } catch {
      // Audio autoplay catch
    }
  }
}

export const examAudio = new ExamAudioEngine();
