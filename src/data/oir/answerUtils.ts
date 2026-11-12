import { OIRQuestion } from "./types";

/**
 * Splits a stored answer string (single key like "2" or multi-select like "1, 4")
 * into normalized lowercase trimmed tokens sorted lexicographically.
 */
export function normalizeAnswerTokens(answer?: string): string[] {
  if (!answer) return [];
  return answer
    .split(",")
    .map((part) => part.trim().toLowerCase())
    .filter(Boolean)
    .sort();
}

/**
 * Checks whether an individual option key is currently selected for single or multi-select items.
 */
export function isOptionSelected(answer: string | undefined, key: string): boolean {
  if (!answer) return false;
  const target = key.trim().toLowerCase();
  return normalizeAnswerTokens(answer).includes(target);
}

/**
 * Toggles an option key respecting `selectCount` (defaults to 1).
 * For multi-select (e.g. selectCount = 2), preserves up to `selectCount` selections
 * in sorted key order joined by comma (e.g. "1,4").
 */
export function toggleAnswerSelection(
  currentAnswer: string | undefined,
  key: string,
  selectCount = 1
): string | undefined {
  if (selectCount <= 1) {
    return key;
  }

  const existing = currentAnswer
    ? currentAnswer
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean)
    : [];

  const idx = existing.findIndex((item) => item.toLowerCase() === key.trim().toLowerCase());
  let next: string[];
  if (idx >= 0) {
    next = existing.filter((_, i) => i !== idx);
  } else if (existing.length < selectCount) {
    next = [...existing, key];
  } else {
    // Replace oldest pick so the user doesn't have to unselect first
    next = [...existing.slice(1), key];
  }

  if (next.length === 0) return undefined;
  return next.sort((a, b) => a.localeCompare(b, undefined, { numeric: true })).join(",");
}

/**
 * Compares candidate response against the question's answer key,
 * supporting both single-choice and multi-choice ("Which two...") questions.
 */
export function isOirAnswerCorrect(
  question: OIRQuestion,
  userAnswer: string | undefined
): boolean {
  if (!userAnswer) return false;
  const expected = normalizeAnswerTokens(question.correctOption);
  const actual = normalizeAnswerTokens(userAnswer);
  if (expected.length === 0 || expected.length !== actual.length) {
    return false;
  }
  return expected.every((token, i) => token === actual[i]);
}
