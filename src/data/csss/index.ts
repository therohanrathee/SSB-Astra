import { CsssSet, CsssAttemptRecord, CsssTestResult, CsssSubtest } from "./types";
import { csssSet1 } from "./sets/set1";
import { csssSet2 } from "./sets/set2";
import { csssSet3 } from "./sets/set3";

export * from "./types";
export * from "./sets/set1";
export * from "./sets/set2";
export * from "./sets/set3";

export const csssSets: CsssSet[] = [csssSet1, csssSet2, csssSet3];

export function getCsssSetById(id: string): CsssSet | undefined {
  return csssSets.find((s) => s.id === id);
}

export function calculateCsssResult(
  setId: string,
  records: CsssAttemptRecord[]
): CsssTestResult {
  const currentSet = getCsssSetById(setId) || csssSet1;
  const totalQuestions = currentSet.questions.length;
  const attempted = records.filter((r) => r.selectedOptionIndex !== null).length;
  const correct = records.filter((r) => r.isCorrect).length;
  const timedOut = records.filter((r) => r.timedOut).length;
  const incorrect = attempted - correct;

  const percentageScore = totalQuestions > 0 ? Math.round((correct / totalQuestions) * 100) : 0;

  // DIPR OIR Equivalent Grading:
  // Grade 1: Top ~10% (>= 85%)
  // Grade 2: Above Average (70% - 84%)
  // Grade 3: Average (55% - 69%)
  // Grade 4: Below Average (40% - 54%)
  // Grade 5: Poor (< 40%)
  let oirGrade: 1 | 2 | 3 | 4 | 5 = 3;
  let screenInProbability = 50;

  if (percentageScore >= 85) {
    oirGrade = 1;
    screenInProbability = 95;
  } else if (percentageScore >= 70) {
    oirGrade = 2;
    screenInProbability = 82;
  } else if (percentageScore >= 55) {
    oirGrade = 3;
    screenInProbability = 60;
  } else if (percentageScore >= 40) {
    oirGrade = 4;
    screenInProbability = 35;
  } else {
    oirGrade = 5;
    screenInProbability = 15;
  }

  // Calculate per-subtest metrics
  const subtests: CsssSubtest[] = ["auditory", "spatial", "memory", "perceptual", "linguistic"];
  const subtestPerformance = {} as CsssTestResult["subtestPerformance"];

  subtests.forEach((st) => {
    const stRecords = records.filter((r) => r.subtest === st);
    const total = stRecords.length || (currentSet.subtestCounts[st] ?? 5);
    const stCorrect = stRecords.filter((r) => r.isCorrect).length;
    const accuracy = total > 0 ? Math.round((stCorrect / total) * 100) : 0;
    const totalTime = stRecords.reduce((acc, curr) => acc + curr.timeSpentSec, 0);
    const avgTimeSec = total > 0 ? +(totalTime / total).toFixed(1) : 0;

    subtestPerformance[st] = {
      total,
      correct: stCorrect,
      accuracy,
      avgTimeSec,
    };
  });

  const totalTimeSpent = records.reduce((acc, curr) => acc + curr.timeSpentSec, 0);
  const avgResponseTimeSec = records.length > 0 ? +(totalTimeSpent / records.length).toFixed(1) : 0;

  return {
    setId: currentSet.id,
    setName: currentSet.name,
    timestamp: new Date().toISOString(),
    totalQuestions,
    attempted,
    correct,
    incorrect,
    timedOut,
    percentageScore,
    oirGrade,
    screenInProbability,
    subtestPerformance,
    avgResponseTimeSec,
    records,
  };
}
