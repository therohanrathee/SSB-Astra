"use client";

/**
 * SSB ASTRA — CSSS Web Audio Synthesizer Engine
 * Generates pure synthesizer acoustic signals for the DIPR Auditory Discrimination battery.
 * Completely autonomous: zero external sound file dependencies.
 */

export interface TonePairSpec {
  freq1: number; // in Hz, e.g., 440
  freq2: number; // in Hz, e.g., 520
  durationSec?: number; // duration of each tone, default 0.4
  gapSec?: number; // gap between tones, default 0.25
}

export interface ToneSequenceSpec {
  tones: Array<{ freq: number; duration: number }>;
  gapSec?: number;
}

export interface RadioCallsignSpec {
  callsign: string; // e.g. "BRAVO 7 ECHO"
  noiseLevel?: number; // 0.05 to 0.3
  noiseDurationSec?: number;
}

class CsssAudioEngine {
  private ctx: AudioContext | null = null;
  private activeNodes: Array<{ stop?: () => void; disconnect?: () => void }> = [];

  private initCtx(): AudioContext | null {
    if (typeof window === "undefined") return null;
    try {
      if (!this.ctx) {
        const AudioCtx =
          window.AudioContext ||
          (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          this.ctx = new AudioCtx();
        }
      }
      if (this.ctx && this.ctx.state === "suspended") {
        this.ctx.resume();
      }
      return this.ctx;
    } catch {
      return null;
    }
  }

  public stopAll() {
    try {
      this.activeNodes.forEach((node) => {
        try {
          if (node.stop) node.stop();
          if (node.disconnect) node.disconnect();
        } catch {
          // ignore
        }
      });
      this.activeNodes = [];
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    } catch {
      // ignore
    }
  }

  /**
   * Plays two sequential tones (Tone A followed by Tone B)
   * Candidate must decide whether Tone B is Higher, Lower, or Identical.
   */
  public async playTonePair(
    spec: TonePairSpec,
    onComplete?: () => void
  ): Promise<void> {
    const ctx = this.initCtx();
    if (!ctx) return;
    this.stopAll();

    const d = spec.durationSec ?? 0.4;
    const gap = spec.gapSec ?? 0.25;
    const now = ctx.currentTime;

    // Tone 1
    const osc1 = ctx.createOscillator();
    const gain1 = ctx.createGain();
    osc1.type = "sine";
    osc1.frequency.setValueAtTime(spec.freq1, now);
    gain1.gain.setValueAtTime(0.001, now);
    gain1.gain.exponentialRampToValueAtTime(0.25, now + 0.05);
    gain1.gain.setValueAtTime(0.25, now + d - 0.05);
    gain1.gain.exponentialRampToValueAtTime(0.001, now + d);
    osc1.connect(gain1);
    gain1.connect(ctx.destination);
    osc1.start(now);
    osc1.stop(now + d);

    // Tone 2
    const start2 = now + d + gap;
    const osc2 = ctx.createOscillator();
    const gain2 = ctx.createGain();
    osc2.type = "sine";
    osc2.frequency.setValueAtTime(spec.freq2, start2);
    gain2.gain.setValueAtTime(0.001, start2);
    gain2.gain.exponentialRampToValueAtTime(0.25, start2 + 0.05);
    gain2.gain.setValueAtTime(0.25, start2 + d - 0.05);
    gain2.gain.exponentialRampToValueAtTime(0.001, start2 + d);
    osc2.connect(gain2);
    gain2.connect(ctx.destination);
    osc2.start(start2);
    osc2.stop(start2 + d);

    this.activeNodes.push(osc1, osc2, gain1, gain2);

    const totalDurationMs = (d * 2 + gap) * 1000;
    setTimeout(() => {
      if (onComplete) onComplete();
    }, totalDurationMs + 50);
  }

  /**
   * Plays a rhythmic sequence of tone bursts (pips)
   * e.g. Count how many high-frequency pips occur
   */
  public async playToneSequence(
    spec: ToneSequenceSpec,
    onComplete?: () => void
  ): Promise<void> {
    const ctx = this.initCtx();
    if (!ctx) return;
    this.stopAll();

    const gap = spec.gapSec ?? 0.12;
    let cursor = ctx.currentTime + 0.05;

    spec.tones.forEach((t) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = "sine";
      osc.frequency.setValueAtTime(t.freq, cursor);

      gain.gain.setValueAtTime(0.001, cursor);
      gain.gain.exponentialRampToValueAtTime(0.22, cursor + 0.02);
      gain.gain.setValueAtTime(0.22, cursor + t.duration - 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, cursor + t.duration);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start(cursor);
      osc.stop(cursor + t.duration);

      this.activeNodes.push(osc, gain);
      cursor += t.duration + gap;
    });

    const totalDurationMs = (cursor - ctx.currentTime) * 1000;
    setTimeout(() => {
      if (onComplete) onComplete();
    }, totalDurationMs + 50);
  }

  /**
   * Plays a military radio static burst with spoken NATO phonetic callsign
   */
  public async playRadioCallsign(
    spec: RadioCallsignSpec,
    onComplete?: () => void
  ): Promise<void> {
    const ctx = this.initCtx();
    if (!ctx) return;
    this.stopAll();

    const now = ctx.currentTime;
    const noiseLevel = spec.noiseLevel ?? 0.08;
    const noiseDuration = spec.noiseDurationSec ?? 2.8;

    // Create White Noise Buffer for military radio crackle
    const bufferSize = ctx.sampleRate * noiseDuration;
    const noiseBuffer = ctx.createBuffer(1, bufferSize, ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;

    // Bandpass filter to emulate tactical walkie-talkie / radio bandwidth (300Hz - 3400Hz)
    const bandpass = ctx.createBiquadFilter();
    bandpass.type = "bandpass";
    bandpass.frequency.setValueAtTime(1200, now);
    bandpass.Q.setValueAtTime(1.2, now);

    const noiseGain = ctx.createGain();
    noiseGain.gain.setValueAtTime(noiseLevel, now);
    noiseGain.gain.setValueAtTime(noiseLevel, now + noiseDuration - 0.2);
    noiseGain.gain.exponentialRampToValueAtTime(0.001, now + noiseDuration);

    whiteNoise.connect(bandpass);
    bandpass.connect(noiseGain);
    noiseGain.connect(ctx.destination);

    whiteNoise.start(now);
    whiteNoise.stop(now + noiseDuration);

    // Initial tactical radio squelch / mic click
    const clickOsc = ctx.createOscillator();
    const clickGain = ctx.createGain();
    clickOsc.type = "sawtooth";
    clickOsc.frequency.setValueAtTime(950, now);
    clickGain.gain.setValueAtTime(0.18, now);
    clickGain.gain.exponentialRampToValueAtTime(0.001, now + 0.08);
    clickOsc.connect(clickGain);
    clickGain.connect(ctx.destination);
    clickOsc.start(now);
    clickOsc.stop(now + 0.08);

    this.activeNodes.push(whiteNoise, noiseGain, clickOsc, clickGain);

    // Voice synthesis of callsign with radio pitch
    if (typeof window !== "undefined" && "speechSynthesis" in window) {
      setTimeout(() => {
        const utterance = new SpeechSynthesisUtterance(spec.callsign);
        utterance.rate = 0.95;
        utterance.pitch = 1.05;
        utterance.volume = 0.9;
        utterance.onend = () => {
          if (onComplete) onComplete();
        };
        utterance.onerror = () => {
          if (onComplete) onComplete();
        };
        window.speechSynthesis.speak(utterance);
      }, 250);
    } else {
      setTimeout(() => {
        if (onComplete) onComplete();
      }, noiseDuration * 1000);
    }
  }

  /**
   * Headphone Test Sound (Calibrator)
   */
  public playCalibrationChime(onComplete?: () => void) {
    const ctx = this.initCtx();
    if (!ctx) return;
    this.stopAll();

    const now = ctx.currentTime;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();

    osc.type = "sine";
    osc.frequency.setValueAtTime(523.25, now); // C5
    osc.frequency.exponentialRampToValueAtTime(659.25, now + 0.2); // E5
    osc.frequency.exponentialRampToValueAtTime(783.99, now + 0.4); // G5

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.exponentialRampToValueAtTime(0.2, now + 0.05);
    gain.gain.setValueAtTime(0.2, now + 0.5);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 0.8);

    osc.connect(gain);
    gain.connect(ctx.destination);

    osc.start(now);
    osc.stop(now + 0.8);

    this.activeNodes.push(osc, gain);

    setTimeout(() => {
      if (onComplete) onComplete();
    }, 850);
  }
}

export const csssAudio = new CsssAudioEngine();
