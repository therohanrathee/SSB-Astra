import { OIRBooklet, OIRQuestion, OIRTestResult } from "./types";
import { BOOKLET_35 } from "./booklet35";
import { BOOKLET_53 } from "./booklet53";
import { BOOKLET_54C } from "./booklet54c";
import { BOOKLET_75D } from "./booklet75d";
import { DDE_TEST_01 } from "./booklets/dde_test01";
import { DDE_TEST_02 } from "./booklets/dde_test02";
import { DDE_TEST_03 } from "./booklets/dde_test03";
import { SSBCRACK_PART_1 } from "./booklets/ssbcrack_part1";
import { SSBCRACK_PART_2 } from "./booklets/ssbcrack_part2";
import { BYJUS_MOCK_02 } from "./booklets/byjus_mock02";
import { BYJUS_MOCK_03 } from "./booklets/byjus_mock03";
import { BYJUS_MOCK_05 } from "./booklets/byjus_mock05";
import { BYJUS_MOCK_11 } from "./booklets/byjus_mock11";
import { BYJUS_MOCK_12 } from "./booklets/byjus_mock12";
import { BYJUS_NV_01 } from "./booklets/byjus_nv01";

export * from "./types";
export {
  BOOKLET_35,
  BOOKLET_53,
  BOOKLET_54C,
  BOOKLET_75D,
  DDE_TEST_01,
  DDE_TEST_02,
  DDE_TEST_03,
  SSBCRACK_PART_1,
  SSBCRACK_PART_2,
  BYJUS_MOCK_02,
  BYJUS_MOCK_03,
  BYJUS_MOCK_05,
  BYJUS_MOCK_11,
  BYJUS_MOCK_12,
  BYJUS_NV_01,
};

/**
 * Universal Catalog of All Curated OIR Test Booklets
 * Spans Authentic DIPR examination sets, DDE preparation series, and Byju's benchmark mocks.
 */
export const ALL_OIR_BOOKLETS: OIRBooklet[] = [
  BOOKLET_35,
  BOOKLET_53,
  BOOKLET_54C,
  BOOKLET_75D,
  DDE_TEST_01,
  DDE_TEST_02,
  DDE_TEST_03,
  SSBCRACK_PART_1,
  SSBCRACK_PART_2,
  BYJUS_MOCK_02,
  BYJUS_MOCK_03,
  BYJUS_MOCK_05,
  BYJUS_MOCK_11,
  BYJUS_MOCK_12,
  BYJUS_NV_01,
];

/**
 * Flat Master Repository of All Modular Building-Block Questions
 * Every single question is self-contained with its source booklet,
 * attributes, figures, dynamic options, and explanation.
 */
export const ALL_OIR_QUESTIONS: OIRQuestion[] = [
  ...BOOKLET_35.questions,
  ...BOOKLET_53.questions,
  ...BOOKLET_54C.questions,
  ...BOOKLET_75D.questions,
  ...DDE_TEST_01.questions,
  ...DDE_TEST_02.questions,
  ...DDE_TEST_03.questions,
  ...SSBCRACK_PART_1.questions,
  ...SSBCRACK_PART_2.questions,
  ...BYJUS_MOCK_02.questions,
  ...BYJUS_MOCK_03.questions,
  ...BYJUS_MOCK_05.questions,
  ...BYJUS_MOCK_11.questions,
  ...BYJUS_MOCK_12.questions,
  ...BYJUS_NV_01.questions,
];

/**
 * Query helper to find any individual question by its building block ID
 */
export function getQuestionById(id: string): OIRQuestion | undefined {
  return ALL_OIR_QUESTIONS.find((q) => q.id === id);
}

/**
 * Query helper to get all questions for a specific booklet
 */
export function getQuestionsByBooklet(bookletId: string): OIRQuestion[] {
  const booklet = ALL_OIR_BOOKLETS.find((b) => b.id === bookletId);
  return booklet ? booklet.questions : [];
}

export interface OIRRatingDetails {
  oirRating: 1 | 2 | 3 | 4 | 5;
  gradeLabel: string;
  screenInProbabilityPct: number;
  badgeColor: string;
  assessorCommentary: string;
}

/**
 * Calculates Official DIPR Officer Intelligence Rating (OIR 1 to 5)
 * Based on standardized Indian Armed Forces Defense Institute of Psychological Research criteria.
 */
export function calculateOirRating(score: number, totalQuestions: number): OIRRatingDetails {
  const percentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0;

  if (percentage >= 88) {
    return {
      oirRating: 1,
      gradeLabel: "OIR-1 (Outstanding)",
      screenInProbabilityPct: 96,
      badgeColor: "text-emerald-500 border-emerald-500/40 bg-emerald-500/10",
      assessorCommentary:
        "Outstanding cognitive speed & analytical accuracy. An OIR-1 rating gives you tremendous leverage during the Stage-1 Conference, granting maximum benefit of doubt on borderline PPDT evaluations."
    };
  } else if (percentage >= 78) {
    return {
      oirRating: 2,
      gradeLabel: "OIR-2 (Very Good)",
      screenInProbabilityPct: 84,
      badgeColor: "text-cyan-500 border-cyan-500/40 bg-cyan-500/10",
      assessorCommentary:
        "Strong mental agility and rapid deduction. Provides a very safe screening baseline, requiring only standard, coherent PPDT story narration to guarantee recommendation for Stage-2."
    };
  } else if (percentage >= 68) {
    return {
      oirRating: 3,
      gradeLabel: "OIR-3 (Average)",
      screenInProbabilityPct: 62,
      badgeColor: "text-amber-500 border-amber-500/40 bg-amber-500/10",
      assessorCommentary:
        "Satisfactory baseline score. However, at OIR-3, screening-in is not automatic — your final recommendation hinges critically on active and logical participation in the PPDT group discussion."
    };
  } else if (percentage >= 55) {
    return {
      oirRating: 4,
      gradeLabel: "OIR-4 (Below Average)",
      screenInProbabilityPct: 35,
      badgeColor: "text-orange-500 border-orange-500/40 bg-orange-500/10",
      assessorCommentary:
        "Borderline cognitive threshold. High vulnerability to Day-1 rejection unless your PPDT theme, confidence, and narration are ranked in the top 10% of your group."
    };
  } else {
    return {
      oirRating: 5,
      gradeLabel: "OIR-5 (Poor / Unsatisfactory)",
      screenInProbabilityPct: 12,
      badgeColor: "text-red-500 border-red-500/40 bg-red-500/10",
      assessorCommentary:
        "Sub-threshold speed and accuracy. At most boards, an OIR-5 score results in near-certain screen-out regardless of PPDT performance. Daily timed speed drills are imperative."
    };
  }
}
