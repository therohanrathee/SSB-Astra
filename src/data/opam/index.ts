import {
  OpamSet,
  OpamQuestion,
  OpamResponseRecord,
  OpamTestResult,
  OlqKey,
  OlqFactor,
  OlqMeta,
} from "./types";
import { opamSet1 } from "./sets/set1";
import { opamSet2 } from "./sets/set2";
import { opamSet3 } from "./sets/set3";

export * from "./types";
export * from "./sets/set1";
export * from "./sets/set2";
export * from "./sets/set3";

export const opamSets: OpamSet[] = [opamSet1, opamSet2, opamSet3];

export function getOpamSetById(id: string): OpamSet | undefined {
  return opamSets.find((s) => s.id === id);
}

export const OLQ_DEFINITIONS: Record<OlqKey, OlqMeta> = {
  effective_intelligence: {
    key: "effective_intelligence",
    name: "Effective Intelligence",
    factor: "factor_1",
    factorName: "Factor I: Planning & Organizing",
    description: "Ability to tackle practical problems using common sense and resourcefulness under field constraints.",
  },
  reasoning_ability: {
    key: "reasoning_ability",
    name: "Reasoning Ability",
    factor: "factor_1",
    factorName: "Factor I: Planning & Organizing",
    description: "Grasping fundamental concepts, logical deduction, and objective evaluation under stress.",
  },
  organizing_ability: {
    key: "organizing_ability",
    name: "Organizing Ability",
    factor: "factor_1",
    factorName: "Factor I: Planning & Organizing",
    description: "Systematic resource allocation, sequencing duties, and logistical coordination.",
  },
  power_of_expression: {
    key: "power_of_expression",
    name: "Power of Expression",
    factor: "factor_1",
    factorName: "Factor I: Planning & Organizing",
    description: "Putting thoughts into clear, concise, and lucid speech or writing for operational clarity.",
  },
  social_adaptability: {
    key: "social_adaptability",
    name: "Social Adaptability",
    factor: "factor_2",
    factorName: "Factor II: Social Adjustment",
    description: "Warmth, humility, and ability to adjust harmoniously with diverse social and cultural groups.",
  },
  cooperation: {
    key: "cooperation",
    name: "Cooperation",
    factor: "factor_2",
    factorName: "Factor II: Social Adjustment",
    description: "Subordinating personal ego and credit-seeking for the collective team objective.",
  },
  sense_of_responsibility: {
    key: "sense_of_responsibility",
    name: "Sense of Responsibility",
    factor: "factor_2",
    factorName: "Factor II: Social Adjustment",
    description: "Moral duty, thorough execution without supervision, and deep care for subordinates.",
  },
  initiative: {
    key: "initiative",
    name: "Initiative",
    factor: "factor_3",
    factorName: "Factor III: Social Effectiveness",
    description: "Taking the first constructive step in unfamiliar, chaotic situations without waiting for orders.",
  },
  self_confidence: {
    key: "self_confidence",
    name: "Self Confidence",
    factor: "factor_3",
    factorName: "Factor III: Social Effectiveness",
    description: "Poise, inner conviction, and emotional stability when facing danger or unexpected setbacks.",
  },
  speed_of_decision: {
    key: "speed_of_decision",
    name: "Speed of Decision",
    factor: "factor_3",
    factorName: "Factor III: Social Effectiveness",
    description: "Arriving at sound, workable tactical choices rapidly without paralysis.",
  },
  ability_to_influence: {
    key: "ability_to_influence",
    name: "Ability to Influence",
    factor: "factor_3",
    factorName: "Factor III: Social Effectiveness",
    description: "Rallying and persuading group members through logic, character, and infectious morale.",
  },
  liveliness: {
    key: "liveliness",
    name: "Liveliness",
    factor: "factor_3",
    factorName: "Factor III: Social Effectiveness",
    description: "Cheerfulness, capacity to overcome fatigue, and lifting team morale in adverse conditions.",
  },
  determination: {
    key: "determination",
    name: "Determination",
    factor: "factor_4",
    factorName: "Factor IV: Dynamic",
    description: "Sustained grit and refusal to give up when faced with repeated failures or exhaustion.",
  },
  courage: {
    key: "courage",
    name: "Courage",
    factor: "factor_4",
    factorName: "Factor IV: Dynamic",
    description: "Physical bravery in the face of danger and moral courage to stand up for the truth.",
  },
  stamina: {
    key: "stamina",
    name: "Stamina",
    factor: "factor_4",
    factorName: "Factor IV: Dynamic",
    description: "Physical endurance and sustained mental alertness through prolonged exertion.",
  },
};

export function calculateOpamResult(
  setId: string,
  records: OpamResponseRecord[]
): OpamTestResult {
  const currentSet = getOpamSetById(setId) || opamSet1;
  const questionsMap = new Map<string, OpamQuestion>();
  currentSet.questions.forEach((q) => questionsMap.set(q.id, q));

  const totalItems = currentSet.questions.length;
  const attempted = records.filter((r) => r.selectedOptionIndex !== null).length;
  const totalTimeSpent = records.reduce((acc, curr) => acc + curr.timeSpentSec, 0);
  const avgTimePerItemSec = attempted > 0 ? +(totalTimeSpent / attempted).toFixed(1) : 0;

  // Initialize OLQ scores container
  const olqScoresMap: Record<
    OlqKey,
    { totalPoints: number; maxPoints: number; itemsCount: number }
  > = {
    effective_intelligence: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    reasoning_ability: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    organizing_ability: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    power_of_expression: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    social_adaptability: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    cooperation: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    sense_of_responsibility: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    initiative: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    self_confidence: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    speed_of_decision: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    ability_to_influence: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    liveliness: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    determination: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    courage: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
    stamina: { totalPoints: 0, maxPoints: 0, itemsCount: 0 },
  };

  let lieScalePoints = 0;
  let lieScaleMaxPoints = 0;

  // Consistency pair tracker
  const pairValues = new Map<string, number[]>();

  records.forEach((rec) => {
    const q = questionsMap.get(rec.questionId);
    if (!q || rec.selectedOptionIndex === null) return;

    // Check Lie Scale
    if (q.isLieScale) {
      lieScaleMaxPoints += 4;
      // In 5-point Likert, choosing 5 (Strongly Agree) or 4 (Agree) indicates saint faking
      const val = rec.selectedValue; // 1 to 5
      if (val >= 4) {
        lieScalePoints += val === 5 ? 4 : 2;
      }
      return; // Do not contaminate normal OLQ with Lie items
    }

    // Normal item score
    let points = 3;
    if (q.type === "likert") {
      const raw = rec.selectedValue; // 1 to 5
      points = q.isReverseKeyed ? 6 - raw : raw; // 1 to 5
    } else if (q.type === "forced_choice" || q.type === "scenario") {
      points = rec.selectedValue; // 1 to 5
    }

    const olqKey = q.primaryOlq;
    if (olqScoresMap[olqKey]) {
      olqScoresMap[olqKey].totalPoints += points;
      olqScoresMap[olqKey].maxPoints += 5;
      olqScoresMap[olqKey].itemsCount += 1;
    }

    // Track consistency pairs
    if (q.consistencyPairId) {
      const existing = pairValues.get(q.consistencyPairId) || [];
      existing.push(points);
      pairValues.set(q.consistencyPairId, existing);
    }
  });

  // Helper for grade assignment
  const getGrade = (
    pct: number
  ): "Outstanding" | "High" | "Above Average" | "Average" | "Vulnerable" => {
    if (pct >= 80) return "Outstanding";
    if (pct >= 68) return "High";
    if (pct >= 52) return "Above Average";
    if (pct >= 38) return "Average";
    return "Vulnerable";
  };

  // Build final OLQ Score map
  const olqScores = {} as OpamTestResult["olqScores"];
  (Object.keys(olqScoresMap) as OlqKey[]).forEach((key) => {
    const data = olqScoresMap[key];
    const score =
      data.maxPoints > 0
        ? Math.round((data.totalPoints / data.maxPoints) * 100)
        : 60; // neutral fallback
    olqScores[key] = {
      score,
      grade: getGrade(score),
      itemsCount: data.itemsCount,
    };
  });

  // Calculate Factor Scores
  const factorMap: Record<OlqFactor, OlqKey[]> = {
    factor_1: [
      "effective_intelligence",
      "reasoning_ability",
      "organizing_ability",
      "power_of_expression",
    ],
    factor_2: [
      "social_adaptability",
      "cooperation",
      "sense_of_responsibility",
    ],
    factor_3: [
      "initiative",
      "self_confidence",
      "speed_of_decision",
      "ability_to_influence",
      "liveliness",
    ],
    factor_4: ["determination", "courage", "stamina"],
  };

  const factorNames: Record<OlqFactor, string> = {
    factor_1: "Factor I: Planning & Organizing",
    factor_2: "Factor II: Social Adjustment",
    factor_3: "Factor III: Social Effectiveness",
    factor_4: "Factor IV: Dynamic",
  };

  const factorScores = {} as OpamTestResult["factorScores"];
  (Object.keys(factorMap) as OlqFactor[]).forEach((fKey) => {
    const olqs = factorMap[fKey];
    const avgScore = Math.round(
      olqs.reduce((acc, curr) => acc + (olqScores[curr]?.score || 60), 0) /
        olqs.length
    );
    factorScores[fKey] = {
      name: factorNames[fKey],
      score: avgScore,
      grade: getGrade(avgScore),
    };
  });

  // Lie Scale Analysis
  const lieScaleScore =
    lieScaleMaxPoints > 0
      ? Math.round((lieScalePoints / lieScaleMaxPoints) * 100)
      : 10;
  let lieScaleVerdict: OpamTestResult["lieScaleVerdict"] = "Authentic & Natural";
  if (lieScaleScore >= 50) {
    lieScaleVerdict = "High Coaching / Faking Alert";
  } else if (lieScaleScore >= 25) {
    lieScaleVerdict = "Minor Idealization";
  }

  // Consistency Analysis
  let totalDeltas = 0;
  let pairCount = 0;
  pairValues.forEach((vals) => {
    if (vals.length >= 2) {
      const delta = Math.abs(vals[0] - vals[1]); // 0 to 4
      totalDeltas += delta;
      pairCount++;
    }
  });

  let consistencyScore = 88; // baseline
  if (pairCount > 0) {
    const avgDelta = totalDeltas / pairCount; // 0 to 4
    consistencyScore = Math.max(
      15,
      Math.round(100 - (avgDelta / 4) * 85)
    );
  }

  let consistencyVerdict: OpamTestResult["consistencyVerdict"] =
    "High Psychological Stability";
  if (consistencyScore < 50) {
    consistencyVerdict = "Erratic / Contradictory";
  } else if (consistencyScore < 70) {
    consistencyVerdict = "Moderate Variance";
  }

  // Composite Recommendation Verdict
  const compositeFactorAverage = Math.round(
    (factorScores.factor_1.score +
      factorScores.factor_2.score +
      factorScores.factor_3.score +
      factorScores.factor_4.score) /
      4
  );

  let recommendationVerdict: OpamTestResult["recommendationVerdict"] =
    "SCREEN-IN (STRONG POTENTIAL)";
  if (
    lieScaleScore >= 60 ||
    consistencyScore < 45 ||
    compositeFactorAverage < 42
  ) {
    recommendationVerdict = "SCREEN-OUT (LOW COMPATIBILITY)";
  } else if (
    lieScaleScore >= 35 ||
    consistencyScore < 65 ||
    compositeFactorAverage < 60
  ) {
    recommendationVerdict = "BORDERLINE (FURTHER REVIEW)";
  }

  // Assessor Overview synthesis
  let assessorOverview = "";
  if (recommendationVerdict === "SCREEN-IN (STRONG POTENTIAL)") {
    assessorOverview = `Candidate exhibits a well-balanced psychometric profile across all 4 OLQ Factors (Composite: ${compositeFactorAverage}%). Responses demonstrate natural psychological authenticity (Lie Scale: ${lieScaleScore}%) and strong cross-battery consistency (${consistencyScore}%). Outstanding natural strengths identified in ${
      factorScores.factor_3.score >= factorScores.factor_1.score
        ? "Social Effectiveness & Dynamic Drive"
        : "Planning, Organizing & Practical Reasoning"
    }. High potential for leadership in armed forces officer training.`;
  } else if (recommendationVerdict === "BORDERLINE (FURTHER REVIEW)") {
    assessorOverview = `Candidate exhibits borderline psychological profile (Composite: ${compositeFactorAverage}%). ${
      lieScaleScore >= 35
        ? "Responses exhibit minor social desirability (attempting to present an idealized saintly persona in some items)."
        : consistencyScore < 65
        ? "Noticeable variance across paired cross-validation items, indicating fluctuating confidence or calculated answers under time pressure."
        : "Factor scores reflect adequate potential but require deeper stabilization during interview and GTO drills."
    }`;
  } else {
    assessorOverview = `Candidate flagged for psychological friction or artificial impression management (Lie Scale: ${lieScaleScore}%, Consistency: ${consistencyScore}%). In DIPR assessment, high faking or significant contradictions between twin items substantially diminish credibility in Stage-1 screening. Recommend practicing genuine self-knowledge and answering instinctively without second-guessing.`;
  }

  return {
    setId: currentSet.id,
    setName: currentSet.name,
    timestamp: new Date().toISOString(),
    totalItems,
    attempted,
    avgTimePerItemSec,
    olqScores,
    factorScores,
    lieScaleScore,
    lieScaleVerdict,
    consistencyScore,
    consistencyVerdict,
    recommendationVerdict,
    assessorOverview,
    records,
  };
}
