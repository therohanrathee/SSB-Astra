export interface CubeFaceConfig {
  top?: string;
  left?: string;
  right?: string;
}

export interface QuestionFigureConfig {
  type: "cubes_group" | "cubes_compare" | "dice" | "pattern" | "none";
  groupA?: { label?: string; faces: CubeFaceConfig }[];
  groupB?: { label?: string; faces: CubeFaceConfig }[];
  cubeA?: { label?: string; faces: CubeFaceConfig };
  cubeB?: { label?: string; faces: CubeFaceConfig };
  instructionHint?: string;
}

export interface OIRQuestionOption {
  key: string;
  text?: string;
  cubeFaces?: CubeFaceConfig;
}

/**
 * Universal Building Block Question Schema for OIR
 * Every single question stores its full metadata, source booklet,
 * attributes, figures, dynamic options, and explanation.
 */
export interface OIRQuestion {
  id: string; // e.g. "oir_set35_q01", "oir_dde01_q05"
  source: "Authentic DIPR" | "DDE" | "Byjus";
  sourceBookletId: string;
  sourceBookletName: string;
  questionNumber: number;
  type: "verbal" | "non_verbal";
  subType: string;
  difficulty: "easy" | "medium" | "hard";
  tags: string[];
  promptText: string;
  figures?: QuestionFigureConfig;
  options: OIRQuestionOption[];
  correctOption: string;
  explanation: string;
}

export interface OIRBooklet {
  id: string;
  source: "Authentic DIPR" | "DDE" | "Byjus";
  bookletNumber: number | string;
  title: string;
  category: "verbal" | "non_verbal" | "mixed";
  totalQuestions: number;
  durationMinutes: number;
  markingScheme: {
    correct: number;
    incorrect: number;
  };
  boardLocations?: string[];
  description: string;
  questions: OIRQuestion[];
}

export interface OIRTestResult {
  bookletId: string;
  totalQuestions: number;
  attempted: number;
  correct: number;
  incorrect: number;
  score: number;
  accuracyPct: number;
  oirRating: 1 | 2 | 3 | 4 | 5;
  screenInProbabilityPct: number;
  timeSpentSeconds: number;
  userAnswers: Record<number, string>;
}
