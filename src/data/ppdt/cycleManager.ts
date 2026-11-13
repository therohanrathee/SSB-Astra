import { PPDTCycleState, PPDTScenario } from "./types";
import { PPDT_SCENARIOS, getScenarioById } from "./scenarios";

const PPDT_CYCLE_STORAGE_KEY = "ssb_astra_ppdt_cycle_v1";

/**
 * Fisher-Yates array shuffler for cryptographically uniform random permutations.
 */
function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

/**
 * Generates a deterministic baseline cycle state for SSR rendering
 * without triggering Math.random during prerendering.
 */
export function createDeterministicInitialCycle(cycleNumber: number = 1): PPDTCycleState {
  const allIds = PPDT_SCENARIOS.map((s) => s.id);
  return {
    cycleNumber,
    queue: allIds,
    queueIndex: 0,
    seenScenarioIds: [],
    history: []
  };
}

/**
 * Generates an initial or fresh cycle state with a newly shuffled queue
 * containing every single scenario ID exactly once.
 */
export function createFreshCycle(
  cycleNumber: number = 1,
  history: PPDTCycleState["history"] = []
): PPDTCycleState {
  const allIds = PPDT_SCENARIOS.map((s) => s.id);
  const shuffled = shuffleArray(allIds);

  return {
    cycleNumber,
    queue: shuffled,
    queueIndex: 0,
    seenScenarioIds: [],
    history
  };
}

/**
 * Safe accessor for reading cycle state from localStorage.
 */
export function loadCycleState(): PPDTCycleState {
  if (typeof window === "undefined") {
    return createDeterministicInitialCycle(1);
  }

  try {
    const raw = localStorage.getItem(PPDT_CYCLE_STORAGE_KEY);
    if (!raw) {
      const fresh = createFreshCycle(1, []);
      saveCycleState(fresh);
      return fresh;
    }

    const parsed: PPDTCycleState = JSON.parse(raw);

    // Sanity check: Ensure queue contains all current scenario IDs
    const allIds = PPDT_SCENARIOS.map((s) => s.id);
    const hasAllIds = allIds.every((id) => parsed.queue?.includes(id));

    if (!hasAllIds || !parsed.queue || parsed.queue.length === 0) {
      const repaired = createFreshCycle(parsed.cycleNumber || 1, parsed.history || []);
      saveCycleState(repaired);
      return repaired;
    }

    return parsed;
  } catch (e) {
    console.error("Error reading PPDT cycle state, resetting:", e);
    const fallback = createFreshCycle(1, []);
    saveCycleState(fallback);
    return fallback;
  }
}

/**
 * Safe accessor for writing cycle state to localStorage.
 */
export function saveCycleState(state: PPDTCycleState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(PPDT_CYCLE_STORAGE_KEY, JSON.stringify(state));
  } catch (e) {
    console.error("Error saving PPDT cycle state:", e);
  }
}

/**
 * Retrieves the currently active scenario according to the non-repeating cycle queue.
 * Prioritizes the first scenario in the queue that has NOT yet been seen in this cycle.
 */
export function getActiveCycleScenario(state: PPDTCycleState): PPDTScenario {
  // 1. Look for the next unseen scenario in the current queue starting from queueIndex
  for (let i = state.queueIndex; i < state.queue.length; i++) {
    const id = state.queue[i];
    if (!state.seenScenarioIds.includes(id)) {
      const scen = getScenarioById(id);
      if (scen) return scen;
    }
  }

  // 2. Wrap around and check from 0 up to queueIndex
  for (let i = 0; i < state.queueIndex; i++) {
    const id = state.queue[i];
    if (!state.seenScenarioIds.includes(id)) {
      const scen = getScenarioById(id);
      if (scen) return scen;
    }
  }

  // 3. Fallback: if all in queue have somehow been marked seen, return queue[0]
  const fallbackId = state.queue[0] || PPDT_SCENARIOS[0].id;
  return getScenarioById(fallbackId) || PPDT_SCENARIOS[0];
}

/**
 * CONSUMES a scenario the EXACT MOMENT a test begins (30s projection begins).
 * Marks the picture as seen/shown immediately so that even if the candidate closes
 * the browser, reloads the page, or disconnects, the next visit will NEVER present
 * this picture again until all other pictures in the cycle have been shown.
 */
export function consumeScenarioOnTestStart(
  state: PPDTCycleState,
  scenarioId: string
): { nextState: PPDTCycleState; cycleCompleted: boolean } {
  const updatedSeen = Array.from(new Set([...state.seenScenarioIds, scenarioId]));

  const isCycleFinished = updatedSeen.length >= PPDT_SCENARIOS.length;

  let nextState: PPDTCycleState;

  if (isCycleFinished) {
    // All 10 pictures have now been shown!
    // Initialize Cycle N + 1 with a brand new random shuffle of all 10 pictures,
    // preserving full attempt history
    nextState = createFreshCycle(state.cycleNumber + 1, state.history);
  } else {
    // Find the next unseen scenario's index in the queue
    let nextIndex = (state.queueIndex + 1) % state.queue.length;
    for (let i = 0; i < state.queue.length; i++) {
      const idx = (state.queueIndex + 1 + i) % state.queue.length;
      if (!updatedSeen.includes(state.queue[idx])) {
        nextIndex = idx;
        break;
      }
    }

    nextState = {
      ...state,
      queueIndex: nextIndex,
      seenScenarioIds: updatedSeen
    };
  }

  saveCycleState(nextState);
  return { nextState, cycleCompleted: isCycleFinished };
}

/**
 * Records an evaluation score in history for a completed scenario without re-advancing the queue.
 */
export function recordEvaluationScore(
  state: PPDTCycleState,
  scenarioId: string,
  score?: number,
  details?: {
    verdict?: "SCREEN-IN" | "BORDERLINE" | "SCREEN-OUT";
    actionLine?: string;
    storyText?: string;
    detectedPOV?: string;
    evaluation?: any;
    scenarioNumber?: number;
  }
): PPDTCycleState {
  const scen = getScenarioById(scenarioId);
  const updatedHistory = [
    {
      id: "ppdt-attempt-" + Date.now(),
      scenarioId,
      scenarioNumber: details?.scenarioNumber || scen?.number || 1,
      completedAt: new Date().toISOString(),
      cycle: state.cycleNumber,
      score,
      verdict: details?.verdict,
      actionLine: details?.actionLine,
      storyText: details?.storyText,
      detectedPOV: details?.detectedPOV,
      evaluation: details?.evaluation
    },
    ...state.history
  ];

  const nextState: PPDTCycleState = {
    ...state,
    history: updatedHistory
  };

  saveCycleState(nextState);
  return nextState;
}

/**
 * Summary metrics for candidate dashboard & HUD indicators.
 */
export function getCycleMetrics(state: PPDTCycleState) {
  const total = PPDT_SCENARIOS.length;
  const completedInCycle = state.seenScenarioIds.length;
  const currentNumber = Math.min(completedInCycle + 1, total);
  const remaining = Math.max(0, total - completedInCycle);
  const percentComplete = Math.round((completedInCycle / total) * 100);

  return {
    cycleNumber: state.cycleNumber,
    currentNumber,
    total,
    remaining,
    completedInCycle,
    percentComplete,
    isScenarioSeen: (id: string) => state.seenScenarioIds.includes(id)
  };
}
