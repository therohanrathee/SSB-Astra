export interface OIRQuestion {
  questionNumber: number;
  type: "verbal" | "non_verbal";
  subType: string;
  promptText: string;
  figureDescription?: string;
  options: {
    key: string;
    text: string;
  }[];
  correctOption: string;
  explanation: string;
}

export interface OIRBooklet {
  id: string;
  bookletNumber: number;
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
