import { OIRBooklet, OIRTestResult } from "./types";
import { BOOKLET_35 } from "./booklet35";
import { BOOKLET_34 } from "./booklet34";
import { BOOKLET_53 } from "./booklet53";

export * from "./types";
export { BOOKLET_35, BOOKLET_34, BOOKLET_53 };

export const ALL_OIR_BOOKLETS: OIRBooklet[] = [
  BOOKLET_35,
  BOOKLET_34,
  BOOKLET_53
];

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
