export type OlqKey =
  | "effective_intelligence"
  | "reasoning_ability"
  | "organizing_ability"
  | "power_of_expression"
  | "social_adaptability"
  | "cooperation"
  | "sense_of_responsibility"
  | "initiative"
  | "self_confidence"
  | "speed_of_decision"
  | "ability_to_influence"
  | "liveliness"
  | "determination"
  | "courage"
  | "stamina";

export type OlqFactor = "factor_1" | "factor_2" | "factor_3" | "factor_4";

export interface OlqMeta {
  key: OlqKey;
  name: string;
  factor: OlqFactor;
  factorName: string;
  description: string;
}

export type OpamQuestionType = "likert" | "forced_choice" | "scenario";

export interface OpamOption {
  text: string;
  value: number; // 1 to 5 or scored weight
  olqBias?: OlqKey; // for forced-choice
  assessorNote?: string;
}

export interface OpamQuestion {
  id: string; // e.g. "OPAM-SET1-Q01"
  setId: string; // "opam-set-1" | "opam-set-2" | "opam-set-3"
  type: OpamQuestionType;
  prompt: string;
  factor: OlqFactor;
  primaryOlq: OlqKey;
  secondaryOlq?: OlqKey;
  isReverseKeyed: boolean; // if true, higher Likert choice indicates lower OLQ
  isLieScale: boolean; // Social Desirability / Saint scale check
  consistencyPairId?: string; // ID of paired twin question
  options?: OpamOption[]; // custom options for forced_choice or scenario; omit for standard 5-point Likert
  assessorInsight: string; // Why DIPR evaluates this item and what assessors look for
}

export interface OpamSet {
  id: string;
  name: string;
  code: string;
  title: string;
  description: string;
  totalItems: number;
  estimatedTimeMin: number;
  questions: OpamQuestion[];
}

export interface OpamResponseRecord {
  questionId: string;
  type: OpamQuestionType;
  selectedOptionIndex: number | null; // 0 to 4 for Likert, 0 to 1 for forced-choice
  selectedValue: number; // 1 to 5
  timeSpentSec: number;
  factor: OlqFactor;
  primaryOlq: OlqKey;
  isLieScale: boolean;
  consistencyPairId?: string;
}

export interface OpamTestResult {
  setId: string;
  setName: string;
  timestamp: string;
  totalItems: number;
  attempted: number;
  avgTimePerItemSec: number;
  // 15 OLQs score map (0 to 100 scale)
  olqScores: Record<
    OlqKey,
    {
      score: number;
      grade: "Outstanding" | "High" | "Above Average" | "Average" | "Vulnerable";
      itemsCount: number;
    }
  >;
  // 4 Factors score map (0 to 100 scale)
  factorScores: Record<
    OlqFactor,
    {
      name: string;
      score: number;
      grade: "Outstanding" | "High" | "Above Average" | "Average" | "Vulnerable";
    }
  >;
  // Psychometric Validity & Trap Analysis
  lieScaleScore: number; // 0 to 100% (High means trying to fake/impress)
  lieScaleVerdict: "Authentic & Natural" | "Minor Idealization" | "High Coaching / Faking Alert";
  consistencyScore: number; // 0 to 100% (Higher means highly consistent responses across pairs)
  consistencyVerdict: "High Psychological Stability" | "Moderate Variance" | "Erratic / Contradictory";
  recommendationVerdict: "SCREEN-IN (STRONG POTENTIAL)" | "BORDERLINE (FURTHER REVIEW)" | "SCREEN-OUT (LOW COMPATIBILITY)";
  assessorOverview: string;
  records: OpamResponseRecord[];
}
