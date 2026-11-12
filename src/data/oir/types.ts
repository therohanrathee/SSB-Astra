export interface CubeFaceConfig {
  top?: string;
  left?: string;
  right?: string;
}

export interface QuestionFigureConfig {
  type:
    | "cubes_group"
    | "cubes_sets_3"
    | "cubes_compare"
    | "svg"
    | "image"
    | "dice"
    | "pattern"
    | "none";
  groupA?: { label?: string; faces: CubeFaceConfig }[];
  groupB?: { label?: string; faces: CubeFaceConfig }[];
  groupC?: { label?: string; faces: CubeFaceConfig }[];
  cubeA?: { label?: string; faces: CubeFaceConfig };
  cubeB?: { label?: string; faces: CubeFaceConfig };
  svgMarkup?: string;
  imageUrl?: string;
  imageCaption?: string;
  instructionHint?: string;
}

export interface OIRQuestionOption {
  key: string;
  text?: string;
  cubeFaces?: CubeFaceConfig;
  svgMarkup?: string;
  imageUrl?: string;
}

/**
 * Universal Building Block Question Schema for OIR.
 * Every question stores its full metadata, source booklet,
 * attributes, figures, dynamic options, and verified explanation.
 */
export interface OIRQuestion {
  id: string;
  source: "Authentic DIPR" | "DDE" | "SSBCrack" | "Byjus";
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
  /** Number of choices the candidate must pick (default 1; 2 for "Which two..." DIPR questions). */
  selectCount?: number;
  /** Canonical answer key; comma-separated sorted keys (e.g. "1,4") when selectCount > 1. */
  correctOption: string;
  explanation: string;
}

export interface OIRBooklet {
  id: string;
  source: "Authentic DIPR" | "DDE" | "SSBCrack" | "Byjus";
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
