import { TonePairSpec, ToneSequenceSpec, RadioCallsignSpec } from "@/lib/csssAudioEngine";

export type CsssSubtest =
  | "auditory"
  | "spatial"
  | "memory"
  | "perceptual"
  | "linguistic";

export interface CsssMemorySpec {
  displayDurationSec: number;
  matrix: string[][]; // e.g. 3x3 grid of symbols/numbers
  highlightCells?: Array<{ row: number; col: number; color?: string }>;
  maskedPrompt: string; // The specific question asked once memory matrix disappears
}

export interface CsssAudioSpec {
  type: "tone_pair" | "tone_sequence" | "radio_callsign";
  tonePair?: TonePairSpec;
  toneSequence?: ToneSequenceSpec;
  radioCallsign?: RadioCallsignSpec;
  transcriptHint?: string; // Revealed in solutions review
}

export interface CsssQuestion {
  id: string; // e.g., "CSSS-SET1-Q01"
  setId: string; // "csss-set-1" | "csss-set-2" | "csss-set-3"
  subtest: CsssSubtest;
  subtestName: string; // e.g., "Auditory Discrimination"
  difficulty: "easy" | "medium" | "hard";
  timeLimitSec: number; // strict micro-timer: 16 to 30s
  prompt: string;
  figureSvg?: string; // Theme-compatible SVG diagram
  memorySpec?: CsssMemorySpec;
  audioSpec?: CsssAudioSpec;
  options: string[];
  correctIndex: number;
  explanation: string;
}

export interface CsssSet {
  id: string;
  name: string;
  code: string;
  title: string;
  description: string;
  totalQuestions: number;
  estimatedTimeMin: number;
  subtestCounts: Record<CsssSubtest, number>;
  questions: CsssQuestion[];
}

export interface CsssAttemptRecord {
  questionId: string;
  subtest: CsssSubtest;
  selectedOptionIndex: number | null; // null if timed out
  isCorrect: boolean;
  timeSpentSec: number;
  timedOut: boolean;
}

export interface CsssTestResult {
  setId: string;
  setName: string;
  timestamp: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  timedOut: number;
  percentageScore: number;
  oirGrade: 1 | 2 | 3 | 4 | 5; // DIPR Grade 1 (Top) to Grade 5
  screenInProbability: number; // 0 to 100%
  subtestPerformance: Record<
    CsssSubtest,
    {
      total: number;
      correct: number;
      accuracy: number;
      avgTimeSec: number;
    }
  >;
  avgResponseTimeSec: number;
  records: CsssAttemptRecord[];
}
