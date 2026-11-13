export interface PPDTExpectedCharacters {
  countRange: string;
  typicalRoles: string[];
  typicalAge: string;
}

export interface PPDTPerspective {
  id: string;
  name: string;
  coreTheme: string;
  visualCuesUsed: string; // which ambiguous visual cues justify this POV
  validRoles: string[]; // character roles perceived under this POV
  actionFocus: string; // what the hero does in this POV
  acceptableVariations: string[]; // alternate angles within this perspective
}

export interface PPDTPerceptualBoundaries {
  plausibleInterpretations: string[]; // valid themes that can be perceived
  implausibleDistortions: string[]; // delusions / completely disconnected themes
}

export interface PPDTModelStory {
  hero: string;
  action: string;
  past: string;
  present: string;
  future: string;
  fullStory: string;
}

export interface PPDTScenario {
  id: string;
  number: number;
  title: string;
  category: string;
  imagePath: string;
  description: string;
  diprAmbiguity: "High" | "Medium";
  expectedCharacters: PPDTExpectedCharacters;
  validPerspectives: PPDTPerspective[];
  perceptualBoundaries: PPDTPerceptualBoundaries;
  benchmarkThemes: string[];
  antiPatterns: string[];
  modelStory: PPDTModelStory;
}

export interface PPDTHistoryEntry {
  id?: string;
  scenarioId: string;
  scenarioNumber?: number;
  completedAt: string;
  cycle: number;
  score?: number;
  verdict?: "SCREEN-IN" | "BORDERLINE" | "SCREEN-OUT";
  actionLine?: string;
  storyText?: string;
  detectedPOV?: string;
  evaluation?: PPDTEvaluationResult;
}

export interface PPDTCycleState {
  cycleNumber: number;
  queue: string[]; // Ordered list of scenario IDs for the current cycle
  queueIndex: number; // Current pointer in queue (0 to queue.length - 1)
  seenScenarioIds: string[]; // Scenario IDs seen in this cycle
  history: PPDTHistoryEntry[];
}

export interface PPDTOLQRating {
  factor: "Factor I" | "Factor II" | "Factor III" | "Factor IV";
  olqName: string;
  rating: "Outstanding" | "High" | "Above Average" | "Average" | "Vulnerable";
  observation: string;
}

export interface PPDTDetectedPerspective {
  matchedPerspectiveName: string;
  isPlausiblePOV: boolean;
  justification: string;
  detectedVisualCues: string[];
  alternativePOVsCandidateCouldHaveChosen: string[];
}

export interface PPDTNarrativePhaseAnalysis {
  pastGenesis: {
    score: number; // 0 - 10
    textExtracted: string;
    critique: string;
  };
  presentAction: {
    score: number; // 0 - 10
    textExtracted: string;
    critique: string;
  };
  futureOutcome: {
    score: number; // 0 - 10
    textExtracted: string;
    critique: string;
  };
}

export interface PPDTHeroAnalysis {
  name: string;
  age: string;
  sex: string;
  mood: string;
  isAgeAppropriate: boolean;
  isMoodConstructive: boolean;
  assessorNotes: string;
}

export interface PPDTRedFlag {
  type: string; // e.g. "Superman Syndrome", "Passive Bystander", "Morbid Theme", "Wishful Thinking", "Crammed Story"
  severity: "Critical" | "Warning" | "Clean";
  observation: string;
}

export interface PPDTEvaluationResult {
  perceptionScore: number; // 0 - 10
  themeScore: number; // 0 - 10
  overallScore: number; // 0 - 100
  recommendationVerdict: "SCREEN-IN" | "BORDERLINE" | "SCREEN-OUT";
  verdictReasoning: string;
  latencyPenalty: boolean;
  latencySeconds: number;
  latencyMessage: string;
  detectedPerspective?: PPDTDetectedPerspective;
  narrativePhases?: PPDTNarrativePhaseAnalysis;
  heroProfile?: PPDTHeroAnalysis;
  redFlagsDetected?: PPDTRedFlag[];
  transcription?: {
    boxDetected: boolean;
    charactersFound: number;
    mainCharacterEncircled: boolean;
    mainCharacterDetails: { age: string; sex: string; mood: string };
    actionLine: string;
    storyText: string;
  };
  olqBreakdown: PPDTOLQRating[];
  strengths: string[];
  vulnerabilities: string[];
  assessorRewrite?: string;
  narrationGuidance: string[];
  suggestedStory: string;
}
