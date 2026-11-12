import { OIRBooklet, OIRQuestion } from "./types";
import {
  makeHatch,
  svgAnalogy,
  svgClassAB,
  svgFramed,
  svgSeries,
} from "./svgHelpers";

/**
 * Helper to create an open curved arrow arc for CW / ACW classification (Q4, Q44).
 * Uses clean circular/elliptical arcs centered around (41, 41) in an 82x82 or 100x100 cell.
 */
function curvedArrowSvg(
  d: string,
  tipX: number,
  tipY: number,
  angleDeg: number,
  tailCircle?: { cx: number; cy: number },
  size = 82
): string {
  const s = size / 82;
  const head = `<polygon points="0,0 -7,-3.5 -5,0 -7,3.5" fill="currentColor" transform="translate(${tipX * s},${tipY * s}) rotate(${angleDeg})"/>`;
  const tc = tailCircle
    ? `<circle cx="${tailCircle.cx * s}" cy="${tailCircle.cy * s}" r="${3.6 * s}" fill="none" stroke="currentColor" stroke-width="1.8"/>`
    : "";
  return `<g>${tailCircle ? tc : ""}<path d="${d}" fill="none" stroke="currentColor" stroke-width="2" transform="scale(${s})"/>${head}</g>`;
}

// Pre-build reusable hatch patterns
const hDiag = makeHatch("diag");
const hDiag2 = makeHatch("diag2");
const hHoriz = makeHatch("horiz");
const hVert = makeHatch("vert");
const hGrid = makeHatch("grid");

export const BOOKLET_53_QUESTIONS: OIRQuestion[] = [
  {
    id: "oir_set53_q01",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 1,
    type: "verbal",
    subType: "number_classification",
    difficulty: "medium",
    tags: ["numbers", "odd-one-out"],
    promptText: "Which group of numbers does not belong to the same class as others?",
    options: [
      { key: "1", text: "1122" },
      { key: "2", text: "1110" },
      { key: "3", text: "1100" },
      { key: "4", text: "5666" },
      { key: "5", text: "3212" },
    ],
    correctOption: "2",
    explanation:
      "Per DIPR Booklet 53 Master Key, (2) 1110 is the odd one out (starts with triple identical digit 111 and ends in 0, breaking the paired/2-containing structure of 1122, 1100, 5666, and 3212).",
  },
  {
    id: "oir_set53_q02",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 2,
    type: "verbal",
    subType: "missing_digit_arithmetic",
    difficulty: "easy",
    tags: ["arithmetic", "addition", "missing-digit"],
    promptText:
      "Add the following and find the missing digit in the box [?]:\n    4 9 3\n+  3 x x\n---------\n  [?] 1 8",
    options: [
      { key: "6", text: "6" },
      { key: "7", text: "7" },
      { key: "8", text: "8" },
      { key: "9", text: "9" },
    ],
    correctOption: "8",
    explanation:
      "In the units column, 3 + x = 8 gives x = 5 (no carry). In the tens column, 9 + x ends in 1, so 9 + 2 = 11 (carry 1 to hundreds). In the hundreds column, 4 + 3 + 1 = 8 (493 + 325 = 818). The boxed digit is 8.",
  },
  {
    id: "oir_set53_q03",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 3,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "easy",
    tags: ["series", "shapes", "pattern"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<polygon points="42,20 18,64 66,64" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<circle cx="42" cy="42" r="22" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<circle cx="42" cy="42" r="22" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<rect x="14" y="25" width="56" height="34" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<circle cx="42" cy="42" r="22" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<polygon points="42,20 18,64 66,64" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<polygon points="42,20 18,64 66,64" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<rect x="14" y="25" width="56" height="34" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<polygon points="42,20 18,64 66,64" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<circle cx="42" cy="42" r="22" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
          `<circle cx="42" cy="42" r="22" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
        ],
        84
      ),
    },
    options: [
      { key: "1", text: "Figure 1", svgMarkup: svgFramed(`<circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="2.5"/>`) },
      { key: "2", text: "Figure 2", svgMarkup: svgFramed(`<rect x="18" y="30" width="64" height="40" fill="none" stroke="currentColor" stroke-width="2.5"/>`) },
      { key: "3", text: "Figure 3", svgMarkup: svgFramed(`<polygon points="50,22 22,76 78,76" fill="none" stroke="currentColor" stroke-width="2.5"/>`) },
      { key: "4", text: "Figure 4", svgMarkup: svgFramed(`<polygon points="22,24 78,24 50,78" fill="none" stroke="currentColor" stroke-width="2.5"/>`) },
      { key: "5", text: "Figure 5", svgMarkup: svgFramed(`<rect x="30" y="18" width="40" height="64" fill="none" stroke="currentColor" stroke-width="2.5"/>`) },
    ],
    correctOption: "2",
    explanation:
      "The series divides into 4-figure groups ending with a horizontal rectangle: [△ ○ ○ ▭], [○ △ △ ▭], [△ ○ ○ ?]. Every 4th figure is a horizontal rectangle (Figure 2).",
  },
  {
    id: "oir_set53_q04",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 4,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "medium",
    tags: ["class-a-b", "rotation", "clockwise"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `<polyline points="42,30 42,42 30,42 30,58 64,58 64,20 18,20 18,68" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="18,68 18,18" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="18,14 14,22 22,22" fill="currentColor"/>`,
          `<path d="M 38 40 C 38 30, 50 30, 50 41 C 50 56, 20 56, 20 38 C 20 16, 62 16, 62 42 C 62 56, 48 62, 34 58" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="28,55 36,54 34,62" fill="currentColor"/>`,
          `<path d="M 42 40 C 42 32, 52 32, 52 42 C 52 54, 24 54, 24 38 C 24 18, 60 18, 60 44 C 60 58, 30 62, 22 46" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="20,40 18,49 26,46" fill="currentColor"/>`,
        ],
        [
          `<path d="M 18 20 Q 26 56 64 62" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="68,62 59,57 60,65" fill="currentColor"/>`,
          `<path d="M 40 42 C 40 34, 30 34, 30 44 C 30 56, 56 56, 56 40 C 56 20, 20 20, 20 44 C 20 62, 54 64, 62 46" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="64,41 58,47 65,50" fill="currentColor"/>`,
          `<path d="M 42 40 C 42 34, 52 34, 52 44 C 52 54, 26 54, 26 38 C 26 20, 62 20, 62 44 C 62 62, 18 62, 18 38 C 18 32, 22 28, 25 28" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="18,43 14,35 22,35" fill="currentColor"/>`,
        ],
        82
      ),
      instructionHint: "Trace each curve/spiral from its tail end to its arrowhead: Clockwise (CW) vs Anti-Clockwise (ACW).",
    },
    selectCount: 2,
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`<path d="M 74 28 A 28 28 0 1 1 26 30" fill="none" stroke="currentColor" stroke-width="2.4"/><polygon points="22,25 23,35 31,30" fill="currentColor"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`<path d="M 74 58 A 28 28 0 1 0 28 66" fill="none" stroke="currentColor" stroke-width="2.4"/><polygon points="24,62 28,72 34,64" fill="currentColor"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`<path d="M 26 32 A 28 28 0 1 0 74 32" fill="none" stroke="currentColor" stroke-width="2.4"/><polygon points="78,27 69,32 77,37" fill="currentColor"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`<path d="M 28 28 A 28 28 0 1 1 28 72" fill="none" stroke="currentColor" stroke-width="2.4"/><polygon points="22,74 32,76 29,67" fill="currentColor"/>`),
      },
    ],
    correctOption: "1,4",
    explanation:
      "Every path in Class A turns clockwise from tail to arrowhead; Class B turns anti-clockwise. Tracing Figures 1 and 4 from tail to arrow tip moves clockwise (1 and 4), while Figures 2 and 3 turn anti-clockwise.",
  },
  {
    id: "oir_set53_q05",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 5,
    type: "verbal",
    subType: "verbal_analogy",
    difficulty: "easy",
    tags: ["analogy", "materials"],
    promptText: "Gold is to Ornament as Wood is to ______",
    options: [
      { key: "1", text: "Forest" },
      { key: "2", text: "Tree" },
      { key: "3", text: "Furniture" },
      { key: "4", text: "Saw-dust" },
      { key: "5", text: "Timber" },
    ],
    correctOption: "3",
    explanation: "Gold is the raw material used to make an Ornament; similarly, Wood is the raw material used to make Furniture (choice 3).",
  },
  {
    id: "oir_set53_q06",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 6,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "rotation", "180-deg"],
    promptText: "A is to B as C is to which of the numbered figures?",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `<line x1="16" y1="42" x2="40" y2="18" stroke="currentColor" stroke-width="2"/><polygon points="14,44 21,42 16,37" fill="currentColor"/><line x1="46" y1="44" x2="72" y2="18" stroke="currentColor" stroke-width="2"/><polygon points="74,16 66,18 71,23" fill="currentColor"/><line x1="46" y1="74" x2="72" y2="48" stroke="currentColor" stroke-width="2"/><polygon points="44,76 52,74 47,69" fill="currentColor"/>`,
        `<line x1="16" y1="44" x2="42" y2="18" stroke="currentColor" stroke-width="2"/><polygon points="44,16 36,18 41,23" fill="currentColor"/><line x1="16" y1="74" x2="42" y2="48" stroke="currentColor" stroke-width="2"/><polygon points="14,76 22,74 17,69" fill="currentColor"/><line x1="48" y1="74" x2="72" y2="50" stroke="currentColor" stroke-width="2"/><polygon points="74,48 66,50 71,55" fill="currentColor"/>`,
        `<path d="M 14 16 V 34 A 8 8 0 0 0 30 34 V 16" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 60 16 V 34 A 8 8 0 0 0 76 34 V 16" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 37 74 V 56 A 8 8 0 0 1 53 56 V 74" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`<path d="M 42 18 V 36 A 8 8 0 0 0 58 36 V 18" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 16 80 V 62 A 8 8 0 0 1 32 62 V 80" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 68 80 V 62 A 8 8 0 0 1 84 62 V 80" fill="none" stroke="currentColor" stroke-width="2.4"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`<path d="M 42 36 V 20 A 8 8 0 0 1 58 20 V 36" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 16 62 V 78 A 8 8 0 0 0 32 78 V 62" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 68 62 V 78 A 8 8 0 0 0 84 78 V 62" fill="none" stroke="currentColor" stroke-width="2.4"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`<path d="M 42 18 V 36 A 8 8 0 0 0 58 36 V 18" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 16 62 V 78 A 8 8 0 0 0 32 78 V 62" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 68 62 V 78 A 8 8 0 0 0 84 78 V 62" fill="none" stroke="currentColor" stroke-width="2.4"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`<path d="M 42 36 V 20 A 8 8 0 0 1 58 20 V 36" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 16 80 V 62 A 8 8 0 0 1 32 62 V 80" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 68 80 V 62 A 8 8 0 0 1 84 62 V 80" fill="none" stroke="currentColor" stroke-width="2.4"/>`),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(`<path d="M 16 36 V 20 A 8 8 0 0 1 32 20 V 36" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 68 36 V 20 A 8 8 0 0 1 84 20 V 36" fill="none" stroke="currentColor" stroke-width="2.4"/><path d="M 42 62 V 78 A 8 8 0 0 0 58 78 V 62" fill="none" stroke="currentColor" stroke-width="2.4"/>`),
      },
    ],
    correctOption: "1",
    explanation:
      "B is obtained by rotating A by 180° (every element flips upside-down and swaps top/bottom positions). Rotating C ([U top-left, ∩ bottom-mid, U top-right]) by 180° produces Figure 1 ([U top-mid, ∩ bottom-left, ∩ bottom-right]).",
  },
  {
    id: "oir_set53_q07",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 7,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "medium",
    tags: ["series", "rotation", "bars"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<g transform="translate(42,42) rotate(45)"><rect x="-24" y="-7" width="48" height="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M -8 6 A 14 14 0 1 1 -13 18" fill="none" stroke="currentColor" stroke-width="2"/></g>`,
          `<g transform="translate(42,42) rotate(45)"><line x1="-22" y1="-2" x2="22" y2="-2" stroke="currentColor" stroke-width="1.8"/><line x1="-22" y1="3" x2="22" y2="3" stroke="currentColor" stroke-width="1.8"/><path d="M 8 -10 A 14 14 0 1 1 14 -20" fill="none" stroke="currentColor" stroke-width="2"/></g>`,
          `<g transform="translate(42,42) rotate(-45)"><rect x="-24" y="-8" width="48" height="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M -8 6 A 14 14 0 1 1 -13 18" fill="none" stroke="currentColor" stroke-width="2"/></g>`,
          `<g transform="translate(42,42) rotate(45)"><rect x="-24" y="-7" width="48" height="6" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M -8 6 A 14 14 0 1 1 -13 18" fill="none" stroke="currentColor" stroke-width="2"/></g>`,
          `<g transform="translate(42,42) rotate(45)"><line x1="-22" y1="-2" x2="22" y2="-2" stroke="currentColor" stroke-width="1.8"/><line x1="-22" y1="3" x2="22" y2="3" stroke="currentColor" stroke-width="1.8"/><path d="M 8 -10 A 14 14 0 1 1 14 -20" fill="none" stroke="currentColor" stroke-width="2"/></g>`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(-45)"><rect x="-28" y="-12" width="56" height="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M -10 10 A 16 16 0 1 1 -16 20" fill="none" stroke="currentColor" stroke-width="2.2"/></g>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(45)"><line x1="-26" y1="-2" x2="26" y2="-2" stroke="currentColor" stroke-width="2"/><line x1="-26" y1="4" x2="26" y2="4" stroke="currentColor" stroke-width="2"/><path d="M 10 -12 A 16 16 0 1 1 16 -22" fill="none" stroke="currentColor" stroke-width="2.2"/></g>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`<line x1="18" y1="76" x2="82" y2="76" stroke="currentColor" stroke-width="2"/><line x1="26" y1="70" x2="74" y2="70" stroke="currentColor" stroke-width="2"/><path d="M 42 66 A 18 18 0 1 1 58 66" fill="none" stroke="currentColor" stroke-width="2.2"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(45)"><rect x="-28" y="-10" width="56" height="7" fill="none" stroke="currentColor" stroke-width="2"/><path d="M -10 8 A 16 16 0 1 1 -16 20" fill="none" stroke="currentColor" stroke-width="2.2"/></g>`),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(-45)"><rect x="-28" y="-12" width="56" height="7" fill="none" stroke="currentColor" stroke-width="2"/><line x1="-26" y1="-1" x2="26" y2="-1" stroke="currentColor" stroke-width="1.6"/><path d="M -8 10 A 16 16 0 1 1 8 10" fill="none" stroke="currentColor" stroke-width="2.2"/></g>`),
      },
    ],
    correctOption: "5",
    explanation:
      "The sequence repeats in a period-3 cycle (1, 2, 3, 1, 2, ...), so the 6th figure matches the 3rd configuration with the slanted top-left rectangular bar and bottom-right open circle (Option 5 per DIPR Booklet 53 Master Key).",
  },
  {
    id: "oir_set53_q08",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 8,
    type: "verbal",
    subType: "sentence_completion_matrix",
    difficulty: "easy",
    tags: ["grammar", "sentence-completion"],
    promptText:
      "Choose one word from each of the following three lines to make a correct, true and meaningful sentence:\nLine 1 — In the: (1) modern  (2) past  (3) child's  (4) future\nLine 2 — age: (1) toys  (2) trains  (3) bullock carts  (4) aeroplanes\nLine 3 — are the fastest means of: (1) business  (2) transport  (3) playing  (4) exchange",
    options: [
      { key: "1,4,2", text: "1, 4, 2 — modern / aeroplanes / transport" },
      { key: "1,2,2", text: "1, 2, 2 — modern / trains / transport" },
      { key: "2,3,2", text: "2, 3, 2 — past / bullock carts / transport" },
      { key: "4,4,1", text: "4, 4, 1 — future / aeroplanes / business" },
    ],
    correctOption: "1,4,2",
    explanation:
      "Combining (1) modern, (4) aeroplanes, and (2) transport forms: \"In the modern age aeroplanes are the fastest means of transport.\" (Key: 1,4,2).",
  },
  {
    id: "oir_set53_q09",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 9,
    type: "verbal",
    subType: "dictionary_order",
    difficulty: "easy",
    tags: ["alphabet", "dictionary"],
    promptText: "Write the number of the word which will come LAST in the dictionary:",
    options: [
      { key: "1", text: "Storm" },
      { key: "2", text: "Strap" },
      { key: "3", text: "Sodium" },
      { key: "4", text: "Soft" },
      { key: "5", text: "Spend" },
    ],
    correctOption: "2",
    explanation: "Alphabetical order: Sodium, Soft, Spend, Storm, Strap. 'Strap' comes last (choice 2).",
  },
  {
    id: "oir_set53_q10",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 10,
    type: "verbal",
    subType: "missing_digit_arithmetic",
    difficulty: "easy",
    tags: ["arithmetic", "subtraction"],
    promptText:
      "Subtract and find the digit in the box [?]:\n    2 8 6 7\n−  x x 4 x\n-----------\n    0 2 [?] 2",
    options: [
      { key: "1", text: "1" },
      { key: "2", text: "2" },
      { key: "3", text: "3" },
      { key: "4", text: "4" },
    ],
    correctOption: "2",
    explanation:
      "No borrow occurs from the tens place (7 − 5 = 2 in units). Therefore in the tens column 6 − 4 = 2 (2867 − 2645 = 0222). The boxed digit is 2.",
  },
  {
    id: "oir_set53_q11",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 11,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "easy",
    tags: ["series", "rotation", "90-deg"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<g transform="translate(42,42) rotate(0)"><line x1="-26" y1="0" x2="2" y2="0" stroke="currentColor" stroke-width="2"/><line x1="2" y1="0" x2="22" y2="-20" stroke="currentColor" stroke-width="2"/><polygon points="24,-22 17,-20 22,-15" fill="currentColor"/><line x1="2" y1="0" x2="22" y2="20" stroke="currentColor" stroke-width="2"/><polygon points="24,22 22,15 17,20" fill="currentColor"/></g>`,
          `<g transform="translate(42,42) rotate(90)"><line x1="-26" y1="0" x2="2" y2="0" stroke="currentColor" stroke-width="2"/><line x1="2" y1="0" x2="22" y2="-20" stroke="currentColor" stroke-width="2"/><polygon points="24,-22 17,-20 22,-15" fill="currentColor"/><line x1="2" y1="0" x2="22" y2="20" stroke="currentColor" stroke-width="2"/><polygon points="24,22 22,15 17,20" fill="currentColor"/></g>`,
          `<g transform="translate(42,42) rotate(180)"><line x1="-26" y1="0" x2="2" y2="0" stroke="currentColor" stroke-width="2"/><line x1="2" y1="0" x2="22" y2="-20" stroke="currentColor" stroke-width="2"/><polygon points="24,-22 17,-20 22,-15" fill="currentColor"/><line x1="2" y1="0" x2="22" y2="20" stroke="currentColor" stroke-width="2"/><polygon points="24,22 22,15 17,20" fill="currentColor"/></g>`,
          `<g transform="translate(42,42) rotate(270)"><line x1="-26" y1="0" x2="2" y2="0" stroke="currentColor" stroke-width="2"/><line x1="2" y1="0" x2="22" y2="-20" stroke="currentColor" stroke-width="2"/><polygon points="24,-22 17,-20 22,-15" fill="currentColor"/><line x1="2" y1="0" x2="22" y2="20" stroke="currentColor" stroke-width="2"/><polygon points="24,22 22,15 17,20" fill="currentColor"/></g>`,
          `<g transform="translate(42,42) rotate(0)"><line x1="-26" y1="0" x2="2" y2="0" stroke="currentColor" stroke-width="2"/><line x1="2" y1="0" x2="22" y2="-20" stroke="currentColor" stroke-width="2"/><polygon points="24,-22 17,-20 22,-15" fill="currentColor"/><line x1="2" y1="0" x2="22" y2="20" stroke="currentColor" stroke-width="2"/><polygon points="24,22 22,15 17,20" fill="currentColor"/></g>`,
        ],
        84
      ),
    },
    options: [
      { key: "1", text: "Figure 1", svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(0)"><line x1="-30" y1="0" x2="4" y2="0" stroke="currentColor" stroke-width="2.2"/><line x1="4" y1="0" x2="26" y2="-22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,-25 20,-22 26,-16" fill="currentColor"/><line x1="4" y1="0" x2="26" y2="22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,25 26,16 20,22" fill="currentColor"/></g>`) },
      { key: "2", text: "Figure 2", svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(180)"><line x1="-30" y1="0" x2="4" y2="0" stroke="currentColor" stroke-width="2.2"/><line x1="4" y1="0" x2="26" y2="-22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,-25 20,-22 26,-16" fill="currentColor"/><line x1="4" y1="0" x2="26" y2="22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,25 26,16 20,22" fill="currentColor"/></g>`) },
      { key: "3", text: "Figure 3", svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(90)"><line x1="-30" y1="0" x2="4" y2="0" stroke="currentColor" stroke-width="2.2"/><line x1="4" y1="0" x2="26" y2="-22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,-25 20,-22 26,-16" fill="currentColor"/><line x1="4" y1="0" x2="26" y2="22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,25 26,16 20,22" fill="currentColor"/></g>`) },
      { key: "4", text: "Figure 4", svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(0)"><line x1="-30" y1="0" x2="4" y2="0" stroke="currentColor" stroke-width="2.2"/><polygon points="-33,0 -24,-4 -24,4" fill="currentColor"/><line x1="4" y1="0" x2="26" y2="-22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,-25 20,-22 26,-16" fill="currentColor"/><line x1="4" y1="0" x2="26" y2="22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,25 26,16 20,22" fill="currentColor"/></g>`) },
      { key: "5", text: "Figure 5", svgMarkup: svgFramed(`<g transform="translate(50,50) rotate(90)"><line x1="-30" y1="0" x2="4" y2="0" stroke="currentColor" stroke-width="2.2"/><polygon points="-33,0 -24,-4 -24,4" fill="currentColor"/><line x1="4" y1="0" x2="26" y2="-22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,-25 20,-22 26,-16" fill="currentColor"/><line x1="4" y1="0" x2="26" y2="22" stroke="currentColor" stroke-width="2.2"/><polygon points="29,25 26,16 20,22" fill="currentColor"/></g>`) },
    ],
    correctOption: "3",
    explanation:
      "The Y-fork rotates 90° clockwise at each step (left-tail → down-tail → right-tail → up-tail → left-tail). Rotating the 5th figure 90° clockwise gives the down-tail upright Y without an arrowhead on the tail (Figure 3).",
  },
  {
    id: "oir_set53_q12",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 12,
    type: "verbal",
    subType: "letter_series",
    difficulty: "easy",
    tags: ["letters", "series"],
    promptText:
      "Which two sets of letters will come next in the following series?\nBCD, FGH, JKL, NOP, ______, ______",
    options: [
      { key: "RST, VWX", text: "RST, VWX" },
      { key: "QRS, TUV", text: "QRS, TUV" },
      { key: "RST, UVW", text: "RST, UVW" },
      { key: "STU, XYZ", text: "STU, XYZ" },
    ],
    correctOption: "RST, VWX",
    explanation:
      "Each triplet skips one alphabet letter before the next starts: BCD (skip E) → FGH (skip I) → JKL (skip M) → NOP (skip Q) → RST (skip U) → VWX.",
  },
  {
    id: "oir_set53_q13",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 13,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "easy",
    tags: ["series", "counting", "shapes"],
    promptText:
      "Write the number of the figure which will come next in the series:\n[▭ ▭ ▭ ▭  △  ▭ ▭ ▭  △ △  ▭ ▭  ?]",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<polygon points="42,20 18,64 66,64" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<polygon points="42,20 18,64 66,64" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<polygon points="42,20 18,64 66,64" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<rect x="12" y="25" width="60" height="34" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
        ],
        72
      ),
    },
    options: [
      { key: "1", text: "Figure 1 (○ ○ ○)", svgMarkup: svgFramed(`<circle cx="22" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="78" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="2"/>`) },
      { key: "2", text: "Figure 2 (▭)", svgMarkup: svgFramed(`<rect x="20" y="34" width="60" height="32" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
      { key: "3", text: "Figure 3 (△ △ △)", svgMarkup: svgFramed(`<polygon points="22,36 11,60 33,60" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,36 39,60 61,60" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="78,36 67,60 89,60" fill="none" stroke="currentColor" stroke-width="2"/>`) },
      { key: "4", text: "Figure 4 (▽ ▽)", svgMarkup: svgFramed(`<polygon points="22,38 44,38 33,64" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="56,38 78,38 67,64" fill="none" stroke="currentColor" stroke-width="2"/>`) },
      { key: "5", text: "Figure 5 (▯)", svgMarkup: svgFramed(`<rect x="34" y="20" width="32" height="60" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
    ],
    correctOption: "3",
    explanation:
      "Rectangles decrease from 4 → 3 → 2 while triangles increase from 1 → 2 → 3: (4 ▭, 1 △), (3 ▭, 2 △), (2 ▭, 3 △). Next is 3 triangles (Figure 3).",
  },
  {
    id: "oir_set53_q14",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 14,
    type: "verbal",
    subType: "logical_ordering",
    difficulty: "easy",
    tags: ["ordering", "size"],
    promptText: "Which item will stand in the middle if the following are rearranged in proper order?",
    options: [
      { key: "1", text: "Lake" },
      { key: "2", text: "Pond" },
      { key: "3", text: "Well" },
      { key: "4", text: "Sea" },
      { key: "5", text: "Ocean" },
    ],
    correctOption: "1",
    explanation:
      "Ordered by water body size from smallest to largest: Well → Pond → Lake → Sea → Ocean. The middle (3rd) item is Lake (choice 1).",
  },
  {
    id: "oir_set53_q15",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 15,
    type: "verbal",
    subType: "word_classification",
    difficulty: "easy",
    tags: ["classification", "odd-one-out"],
    promptText: "Which word does not belong to the same class as others?",
    options: [
      { key: "1", text: "Hat" },
      { key: "2", text: "Head" },
      { key: "3", text: "Cap" },
      { key: "4", text: "Turban" },
      { key: "5", text: "Helmet" },
    ],
    correctOption: "2",
    explanation: "Hat, Cap, Turban, and Helmet are all head-wear, while Head (choice 2) is a part of the body.",
  },
  {
    id: "oir_set53_q16",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 16,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "easy",
    tags: ["series", "rotation"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<polyline points="22,18 22,64 68,64" fill="none" stroke="currentColor" stroke-width="2.6"/>`,
          `<polyline points="18,22 64,22 64,68" fill="none" stroke="currentColor" stroke-width="2.6"/>`,
          `<polyline points="68,22 22,22 22,68" fill="none" stroke="currentColor" stroke-width="2.6"/>`,
        ],
        84
      ),
    },
    options: [
      { key: "1", text: "Figure 1", svgMarkup: svgFramed(`<polyline points="72,22 72,76 18,76" fill="none" stroke="currentColor" stroke-width="2.8"/>`) },
      { key: "2", text: "Figure 2", svgMarkup: svgFramed(`<polyline points="70,22 26,50 70,78" fill="none" stroke="currentColor" stroke-width="2.8"/>`) },
      { key: "3", text: "Figure 3", svgMarkup: svgFramed(`<polyline points="20,24 74,24 74,78" fill="none" stroke="currentColor" stroke-width="2.8"/>`) },
      { key: "4", text: "Figure 4", svgMarkup: svgFramed(`<polyline points="24,22 24,76 78,76" fill="none" stroke="currentColor" stroke-width="2.8"/>`) },
      { key: "5", text: "Figure 5", svgMarkup: svgFramed(`<polyline points="76,24 22,24 22,78" fill="none" stroke="currentColor" stroke-width="2.8"/>`) },
    ],
    correctOption: "1",
    explanation:
      "The four right-angle corner orientations are bottom-left (└), top-right (┐), top-left (┌), and bottom-right (┘). The missing 4th corner orientation is bottom-right (Figure 1).",
  },
  {
    id: "oir_set53_q17",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 17,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "medium",
    tags: ["series", "rotation", "shading"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `${hDiag.def}<circle cx="42" cy="42" r="24" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 25 59 A 24 24 0 0 1 59 25 Z" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.8"/>`,
          `${hHoriz.def}<circle cx="42" cy="42" r="24" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 59 25 A 24 24 0 0 1 25 59 Z" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/>`,
          `${hVert.def}<circle cx="42" cy="42" r="24" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 25 25 A 24 24 0 0 1 59 59 Z" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.8"/>`,
        ],
        84
      ),
    },
    options: [
      { key: "1", text: "Figure 1", svgMarkup: svgFramed(`<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="2"/>`) },
      { key: "2", text: "Figure 2", svgMarkup: svgFramed(`${hHoriz.def}<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 50 22 A 28 28 0 0 1 50 78 Z" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="2"/>`) },
      { key: "3", text: "Figure 3", svgMarkup: svgFramed(`${hDiag.def}<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 30 70 A 28 28 0 0 1 70 30 Z" fill="${hDiag.fill}" stroke="currentColor" stroke-width="2"/>`) },
      { key: "4", text: "Figure 4", svgMarkup: svgFramed(`${hHoriz.def}<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 50 78 A 28 28 0 0 1 50 22 Z" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="2"/>`) },
      { key: "5", text: "Figure 5", svgMarkup: svgFramed(`${hDiag2.def}<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 70 70 A 28 28 0 0 1 30 30 Z" fill="${hDiag2.fill}" stroke="currentColor" stroke-width="2"/>`) },
    ],
    correctOption: "5",
    explanation:
      "The first pair flips shading across the '/' diagonal (top-left → bottom-right). Similarly, the second pair splits along the '\\' diagonal: Fig 3 shades top-right, so Fig 4 shades the complementary bottom-left half (Figure 5).",
  },
  {
    id: "oir_set53_q18",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 18,
    type: "verbal",
    subType: "jumbled_sentence_letter",
    difficulty: "easy",
    tags: ["jumbled-sentence", "proverbs"],
    promptText:
      "Write the LAST letter of the rearranged sentence:\n\"spoil Spare and child the the rod\"",
    options: [
      { key: "D", text: "D" },
      { key: "R", text: "R" },
      { key: "E", text: "E" },
      { key: "L", text: "L" },
    ],
    correctOption: "D",
    explanation:
      "Rearranging the words gives the well-known proverb \"Spare the rod and spoil the child\" (or \"Spare the child and spoil the rod\" — both end in 'D').",
  },
  {
    id: "oir_set53_q19",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 19,
    type: "verbal",
    subType: "anagram_letter",
    difficulty: "easy",
    tags: ["anagram", "spelling"],
    promptText:
      "Write the SECOND letter of the rearranged word:\n\"PLAPPEENI is a kind of a fruit.\"",
    options: [
      { key: "P", text: "P" },
      { key: "I", text: "I" },
      { key: "N", text: "N" },
      { key: "E", text: "E" },
    ],
    correctOption: "I",
    explanation: "PLAPPEENI unscrambles to PINEAPPLE. Its second letter is 'I'.",
  },
  {
    id: "oir_set53_q20",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 20,
    type: "verbal",
    subType: "verbal_analogy",
    difficulty: "easy",
    tags: ["analogy", "part-whole"],
    promptText: "Fan is to Blades as Wheel is to ______",
    options: [
      { key: "1", text: "Car" },
      { key: "2", text: "Machine" },
      { key: "3", text: "Spokes" },
      { key: "4", text: "Form" },
      { key: "5", text: "Motion" },
    ],
    correctOption: "3",
    explanation: "A Fan radiates structural Blades, just as a Wheel contains radiating Spokes (choice 3).",
  },
  {
    id: "oir_set53_q21",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 21,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "symmetry", "four-fold"],
    promptText: "A is to B as C is to which numbered figure?",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `<rect x="44" y="14" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="60" cy="30" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="12" y="12" width="31" height="31" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="27.5" cy="27.5" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="47" y="12" width="31" height="31" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="62.5" cy="27.5" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="12" y="47" width="31" height="31" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="27.5" cy="62.5" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="47" y="47" width="31" height="31" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="62.5" cy="62.5" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<polygon points="45,44 12,78 78,78" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="33" y="62" width="24" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`<rect x="14" y="14" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="20" y="25" width="20" height="10" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="54" y="14" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="60" y="25" width="20" height="10" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="54" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="20" y="65" width="20" height="10" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="54" y="54" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="60" y="65" width="20" height="10" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`<polygon points="50,24 14,76 86,76" fill="none" stroke="currentColor" stroke-width="2"/><rect x="36" y="56" width="28" height="12" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`<line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" stroke-width="1.8"/><line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" stroke-width="1.8"/><rect x="37" y="14" width="26" height="11" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="37" y="75" width="26" height="11" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="37" width="11" height="26" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="75" y="37" width="11" height="26" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`<line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="50" x2="90" y2="90" stroke="currentColor" stroke-width="1.8"/><rect x="38" y="74" width="24" height="11" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="74" y="38" width="11" height="24" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(`<line x1="10" y1="10" x2="90" y2="90" stroke="currentColor" stroke-width="1.8"/><line x1="90" y1="10" x2="10" y2="90" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="1.4"/><rect x="20" y="20" width="16" height="10" fill="none" stroke="currentColor" stroke-width="1.5"/>`),
      },
    ],
    correctOption: "3",
    explanation:
      "In A → B, the single top-right square-and-circle unit repeats four-fold symmetrically around the center to fill all 4 quadrants. Repeating C's triangle-and-rectangle unit four-fold around the center divides the frame into 4 triangles each enclosing a small rectangle (Figure 3).",
  },
  {
    id: "oir_set53_q22",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 22,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "medium",
    tags: ["series", "counting", "arches"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<rect x="24" y="24" width="36" height="36" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<polygon points="10,42 26,24 58,24 74,42 58,60 26,60" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<g stroke="currentColor" stroke-width="1.8"><line x1="28" y1="26" x2="28" y2="38"/><line x1="22" y1="32" x2="34" y2="32"/><line x1="56" y1="26" x2="56" y2="38"/><line x1="50" y1="32" x2="62" y2="32"/><line x1="28" y1="48" x2="28" y2="60"/><line x1="22" y1="54" x2="34" y2="54"/><line x1="56" y1="48" x2="56" y2="60"/><line x1="50" y1="54" x2="62" y2="54"/></g>`,
          `<g stroke="currentColor" stroke-width="1.8"><line x1="20" y1="26" x2="20" y2="38"/><line x1="14" y1="32" x2="26" y2="32"/><line x1="42" y1="26" x2="42" y2="38"/><line x1="36" y1="32" x2="48" y2="32"/><line x1="64" y1="26" x2="64" y2="38"/><line x1="58" y1="32" x2="70" y2="32"/><line x1="20" y1="48" x2="20" y2="60"/><line x1="14" y1="54" x2="26" y2="54"/><line x1="42" y1="48" x2="42" y2="60"/><line x1="36" y1="54" x2="48" y2="54"/><line x1="64" y1="48" x2="64" y2="60"/><line x1="58" y1="54" x2="70" y2="54"/></g>`,
          `<path d="M 14 58 A 28 28 0 0 1 70 58" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M 22 58 A 20 20 0 0 1 62 58" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M 30 58 A 12 12 0 0 1 54 58" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        ],
        84
      ),
    },
    options: [
      { key: "1", text: "Figure 1 (4 concentric arches)", svgMarkup: svgFramed(`<path d="M 14 68 A 36 36 0 0 1 86 68" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M 22 68 A 28 28 0 0 1 78 68" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M 30 68 A 20 20 0 0 1 70 68" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M 38 68 A 12 12 0 0 1 62 68" fill="none" stroke="currentColor" stroke-width="1.8"/>`) },
      { key: "2", text: "Figure 2 (3 '+' signs)", svgMarkup: svgFramed(`<g stroke="currentColor" stroke-width="2"><line x1="30" y1="26" x2="30" y2="40"/><line x1="23" y1="33" x2="37" y2="33"/><line x1="70" y1="26" x2="70" y2="40"/><line x1="63" y1="33" x2="77" y2="33"/><line x1="50" y1="58" x2="50" y2="72"/><line x1="43" y1="65" x2="57" y2="65"/></g>`) },
      { key: "3", text: "Figure 3 (Square)", svgMarkup: svgFramed(`<rect x="26" y="26" width="48" height="48" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
      { key: "4", text: "Figure 4 (5 '+' signs)", svgMarkup: svgFramed(`<g stroke="currentColor" stroke-width="1.8"><line x1="28" y1="24" x2="28" y2="36"/><line x1="22" y1="30" x2="34" y2="30"/><line x1="72" y1="24" x2="72" y2="36"/><line x1="66" y1="30" x2="78" y2="30"/><line x1="50" y1="44" x2="50" y2="56"/><line x1="44" y1="50" x2="56" y2="50"/><line x1="28" y1="64" x2="28" y2="76"/><line x1="22" y1="70" x2="34" y2="70"/><line x1="72" y1="64" x2="72" y2="76"/><line x1="66" y1="70" x2="78" y2="70"/></g>`) },
      { key: "5", text: "Figure 5 (5 concentric arches)", svgMarkup: svgFramed(`<path d="M 10 70 A 40 40 0 0 1 90 70" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M 17 70 A 33 33 0 0 1 83 70" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M 24 70 A 26 26 0 0 1 76 70" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M 31 70 A 19 19 0 0 1 69 70" fill="none" stroke="currentColor" stroke-width="1.7"/><path d="M 38 70 A 12 12 0 0 1 62 70" fill="none" stroke="currentColor" stroke-width="1.7"/>`) },
    ],
    correctOption: "5",
    explanation:
      "The figures come in pairs increasing by 2 elements each time: 4 sides (square) → 6 sides (hexagon); 4 '+' marks → 6 '+' marks; 3 concentric arches → 5 concentric arches (Figure 5).",
  },
  {
    id: "oir_set53_q23",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 23,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "easy",
    tags: ["class-a-b", "overlap", "containment"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `<circle cx="34" cy="52" r="16" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="28,44 64,22 54,58" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<polygon points="34,20 14,56 54,56" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 36 22 H 54 A 18 18 0 0 1 54 58 H 36 Z" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<rect x="16" y="16" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/><rect x="28" y="28" width="26" height="26" fill="none" stroke="currentColor" stroke-width="2"/>`,
        ],
        [
          `<polygon points="41,10 51,26 41,42 31,26" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="41,42 51,58 41,74 31,58" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<path d="M 14 22 H 26 A 18 20 0 0 1 26 62 H 14 Z" fill="none" stroke="currentColor" stroke-width="2"/><rect x="46" y="26" width="22" height="30" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<circle cx="24" cy="58" r="10" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="56" cy="28" r="16" fill="none" stroke="currentColor" stroke-width="2"/>`,
        ],
        82
      ),
      instructionHint: "Compare overlapping/enclosed shape pairs (Class A) against separated or merely touching shapes (Class B).",
    },
    selectCount: 2,
    options: [
      { key: "1", text: "Figure 1 (Overlapping circles)", svgMarkup: svgFramed(`<circle cx="32" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="62" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
      { key: "2", text: "Figure 2 (Concentric circles)", svgMarkup: svgFramed(`<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
      { key: "3", text: "Figure 3 (Separate quarter-circle & triangle)", svgMarkup: svgFramed(`<path d="M 12 46 A 32 32 0 0 1 44 88" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="62,22 44,58 80,58" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
      { key: "4", text: "Figure 4 (Circle resting on rectangle)", svgMarkup: svgFramed(`<circle cx="50" cy="28" r="12" fill="none" stroke="currentColor" stroke-width="2.2"/><rect x="34" y="42" width="32" height="44" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
    ],
    correctOption: "1,2",
    explanation:
      "In Class A, the two shapes overlap or one encloses the other; in Class B, the shapes are separated or touch only externally. Only Figures 1 (overlapping circles) and 2 (concentric circles) belong to Class A.",
  },
  {
    id: "oir_set53_q24",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 24,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "hard",
    tags: ["series", "arcs", "cross"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<line x1="12" y1="42" x2="72" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="42" y1="12" x2="42" y2="72" stroke="currentColor" stroke-width="1.8"/><path d="M 16 42 A 26 26 0 0 1 42 16" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<line x1="12" y1="42" x2="72" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="42" y1="12" x2="42" y2="72" stroke="currentColor" stroke-width="1.8"/><path d="M 68 42 A 26 26 0 0 1 42 68" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<line x1="12" y1="42" x2="72" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="42" y1="12" x2="42" y2="72" stroke="currentColor" stroke-width="1.8"/><path d="M 16 42 A 26 26 0 0 1 42 16" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 68 42 A 26 26 0 0 1 42 68" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<line x1="12" y1="42" x2="72" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="42" y1="12" x2="42" y2="72" stroke="currentColor" stroke-width="1.8"/><path d="M 42 68 Q 42 42 68 42" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<line x1="12" y1="42" x2="72" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="42" y1="12" x2="42" y2="72" stroke="currentColor" stroke-width="1.8"/><path d="M 42 16 Q 42 42 68 42" fill="none" stroke="currentColor" stroke-width="2"/>`,
        ],
        84
      ),
    },
    options: [
      { key: "1", text: "Figure 1", svgMarkup: svgFramed(`<line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" stroke-width="1.8"/><path d="M 50 18 Q 50 50 82 50" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 18 50 Q 50 50 50 82" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
      { key: "2", text: "Figure 2", svgMarkup: svgFramed(`<line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" stroke-width="1.8"/><path d="M 50 18 Q 50 50 82 50" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 82 50 A 32 32 0 0 1 50 82" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
      { key: "3", text: "Figure 3", svgMarkup: svgFramed(`<line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" stroke-width="1.8"/><circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2"/>`) },
      { key: "4", text: "Figure 4", svgMarkup: svgFramed(`<line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" stroke-width="1.8"/><path d="M 18 50 A 32 32 0 0 1 50 18" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
      { key: "5", text: "Figure 5", svgMarkup: svgFramed(`<line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="14" x2="50" y2="86" stroke="currentColor" stroke-width="1.8"/><path d="M 50 82 Q 50 50 82 50" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 18 50 Q 50 50 50 18" fill="none" stroke="currentColor" stroke-width="2.2"/>`) },
    ],
    correctOption: "1",
    explanation:
      "The first three figures build a combined convex-arc pair (TL + BR → both). The next three build a combined concave-arc pair: concave BR, concave TR, and finally combining opposite concave quadrants into Figure 1.",
  },
  {
    id: "oir_set53_q25",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 25,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "medium",
    tags: ["class-a-b", "connectivity", "shading"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `${hDiag.def}<polygon points="24,30 58,54 54,60 20,36" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="20" cy="28" r="12" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="62" cy="56" r="12" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `${hGrid.def}<rect x="35" y="34" width="12" height="32" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="41" cy="24" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="41" cy="66" r="9" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `${hDiag.def}<polygon points="14,56 36,36 36,56" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="36,36 52,52 52,20 36,36" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="52,20 70,40 52,40" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        [
          `${hDiag.def}<path d="M 10 38 Q 36 42 40 72" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 52 10 Q 56 34 74 36" fill="none" stroke="currentColor" stroke-width="2"/><rect x="36" y="36" width="14" height="14" transform="rotate(45 43 43)" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `<circle cx="41" cy="22" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="41" y1="8" x2="41" y2="26" stroke="currentColor" stroke-width="1.8"/><circle cx="41" cy="60" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="41" y1="54" x2="41" y2="74" stroke="currentColor" stroke-width="1.8"/>`,
          `${hGrid.def}<rect x="20" y="48" width="18" height="18" transform="rotate(45 29 57)" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/><line x1="20" y1="22" x2="64" y2="66" stroke="currentColor" stroke-width="1.8"/><circle cx="58" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        ],
        82
      ),
      instructionHint: "Class A consists of connected figures joined into one unit; Class B has disconnected pieces.",
    },
    selectCount: 2,
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`${hDiag.def}<line x1="10" y1="20" x2="88" y2="68" stroke="currentColor" stroke-width="2"/><line x1="10" y1="68" x2="54" y2="10" stroke="currentColor" stroke-width="2"/><polygon points="28,74 72,30 80,38 36,82" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`${hGrid.def}<line x1="22" y1="10" x2="22" y2="90" stroke="currentColor" stroke-width="1.8"/><line x1="30" y1="30" x2="30" y2="70" stroke="currentColor" stroke-width="1.8"/><rect x="44" y="10" width="12" height="80" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><line x1="70" y1="30" x2="70" y2="70" stroke="currentColor" stroke-width="1.8"/><line x1="78" y1="10" x2="78" y2="90" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`${hGrid.def}<polygon points="10,70 72,22 80,32 18,80" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><polygon points="56,10 90,56 80,64 46,18" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`<line x1="20" y1="10" x2="90" y2="80" stroke="currentColor" stroke-width="2"/><line x1="10" y1="22" x2="78" y2="90" stroke="currentColor" stroke-width="2"/><path d="M 60 10 A 28 28 0 0 0 90 40" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 10 56 A 28 28 0 0 1 42 90" fill="none" stroke="currentColor" stroke-width="2"/>`),
      },
    ],
    correctOption: "1,3",
    explanation:
      "Every Class A box presents a single connected/bridged geometric assembly, whereas Class B presents disjoint lines and separated parts. Figures 1 and 3 form connected intersecting bridges/chains and belong to Class A.",
  },
  {
    id: "oir_set53_q26",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 26,
    type: "verbal",
    subType: "verbal_analogy",
    difficulty: "easy",
    tags: ["analogy", "antonyms"],
    promptText: "Remembering is to Forgetting as Knowledge is to ______",
    options: [
      { key: "1", text: "Foolish" },
      { key: "2", text: "Ignorance" },
      { key: "3", text: "Illiterate" },
      { key: "4", text: "Learned" },
      { key: "5", text: "Rustic" },
    ],
    correctOption: "2",
    explanation: "Remembering and Forgetting are direct noun antonyms; likewise, Knowledge is the opposite of Ignorance (choice 2).",
  },
  {
    id: "oir_set53_q27",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 27,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "halving", "shifting"],
    promptText: "A is to B as C is to which numbered figure?",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `${hGrid.def}<polygon points="10,10 78,10 78,78" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="24" y="54" width="24" height="16" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        `${hGrid.def}<polygon points="12,12 12,76 76,76" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="28,44 50,44 50,62" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        `${hGrid.def}<rect x="34" y="34" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="22" cy="22" r="11" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="36" y="36" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="72" cy="72" r="10" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="26" y="26" width="52" height="52" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 28 28 H 44 A 16 16 0 0 1 28 44 Z" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="26" y="26" width="52" height="52" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="40" cy="40" r="10" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="34" y="34" width="52" height="52" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 60 60 H 78 A 18 18 0 0 1 60 78 Z" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="26" y="26" width="52" height="52" fill="none" stroke="currentColor" stroke-width="2"/><path d="M 52 38 A 14 14 0 0 1 72 52 Z" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
    ],
    correctOption: "2",
    explanation:
      "In A → B, the small shaded rectangle outside the large triangle moves into the corner inside the large region and is sliced diagonally into a half-rectangle (triangle). Similarly, C's small shaded circle outside top-left moves inside the top-left corner of the large square and becomes halved/clipped in Figure 2.",
  },
  {
    id: "oir_set53_q28",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 28,
    type: "verbal",
    subType: "missing_digit_arithmetic",
    difficulty: "medium",
    tags: ["arithmetic", "currency", "pounds-shillings"],
    promptText:
      "Subtract (When 12 pence = 1 shilling and 20 shillings = 1 pound) and find the two missing boxed digits [?]:\n  Pound   Shilling   Pence\n    7 x        x x       1 x\n  − 5 2          7         8\n-----------------------------\n  [?] 3      [?] 2         3",
    options: [
      { key: "2,1", text: "2 and 1  (23 Pounds, 12 Shillings)" },
      { key: "2,2", text: "2 and 2  (23 Pounds, 22 Shillings)" },
      { key: "1,1", text: "1 and 1  (13 Pounds, 12 Shillings)" },
      { key: "3,1", text: "3 and 1  (33 Pounds, 12 Shillings)" },
    ],
    correctOption: "2,1",
    explanation:
      "In Pence: 11 − 8 = 3 (no borrow). In Shillings: 19 − 7 = 12 (so boxed tens digit = 1). In Pounds: 75 − 52 = 23 (so boxed tens digit = 2). The two boxed digits in order are 2 and 1.",
  },
  {
    id: "oir_set53_q29",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 29,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "medium",
    tags: ["class-a-b", "shading", "quadrilaterals"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `${hVert.def}<rect x="10" y="12" width="62" height="22" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><path d="M 24 68 V 50 A 16 14 0 0 1 56 50 V 68 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `${hHoriz.def}<circle cx="41" cy="41" r="24" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="28" y="28" width="26" height="26" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hDiag.def}<polygon points="16,14 40,14 66,68 42,68" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="12,48 12,70 30,70" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="50,14 70,14 68,34" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        [
          `${hVert.def}<rect x="18" y="26" width="46" height="24" transform="rotate(40 41 38)" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="10,48 10,72 30,72" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.5"/><polygon points="50,12 72,12 72,30" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.5"/>`,
          `${hDiag.def}<polygon points="24,38 12,68 36,68" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="56,14 68,40 56,66 44,40" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `${hGrid.def}<circle cx="41" cy="24" r="14" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="23" y="46" width="36" height="28" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        ],
        82
      ),
      instructionHint: "Notice which shapes receive shading in Class A (4-sided quadrilaterals) vs Class B (triangles/circles).",
    },
    selectCount: 2,
    options: [
      {
        key: "1",
        text: "Figure 1 (Shaded rectangles + plain circle)",
        svgMarkup: svgFramed(`${hVert.def}${hHoriz.def}<rect x="14" y="14" width="22" height="50" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.8"/><rect x="38" y="64" width="48" height="22" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/><circle cx="68" cy="34" r="14" fill="none" stroke="currentColor" stroke-width="2"/>`),
      },
      {
        key: "2",
        text: "Figure 2 (Plain parallelogram + shaded oval)",
        svgMarkup: svgFramed(`${hDiag.def}<polygon points="14,52 34,52 72,82 52,82" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="64" cy="30" rx="18" ry="12" transform="rotate(-35 64 30)" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "3",
        text: "Figure 3 (2 shaded squares + plain circle)",
        svgMarkup: svgFramed(`${hDiag.def}<rect x="18" y="62" width="20" height="20" transform="rotate(-45 28 72)" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.8"/><circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="2"/><rect x="62" y="18" width="20" height="20" transform="rotate(-45 72 28)" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "4",
        text: "Figure 4 (Plain square + shaded circle)",
        svgMarkup: svgFramed(`${hVert.def}<rect x="18" y="34" width="44" height="44" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="68" cy="30" r="16" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
    ],
    correctOption: "1,3",
    explanation:
      "In Class A, 4-sided polygons (rectangles/squares/parallelograms) are shaded while triangles/circles remain unshaded. Only Figures 1 and 3 shade rectangles/squares and leave circles unshaded.",
  },
  {
    id: "oir_set53_q30",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 30,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "easy",
    tags: ["class-a-b", "open-closed"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `<rect x="18" y="18" width="46" height="46" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<polygon points="41,24 52,32 68,32 41,62 14,32 30,32" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<path d="M 32 30 A 10 10 0 1 1 50 30 A 10 10 0 1 1 50 50 A 10 10 0 1 1 32 50 A 10 10 0 1 1 32 30 Z" fill="none" stroke="currentColor" stroke-width="2"/>`,
        ],
        [
          `<polyline points="16,26 41,58 66,26" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<path d="M 32 62 A 22 22 0 1 1 50 62" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<polyline points="20,24 62,24 62,58 20,58" fill="none" stroke="currentColor" stroke-width="2"/>`,
        ],
        82
      ),
      instructionHint: "Compare closed boundaries (Class A) against open/incomplete outlines (Class B).",
    },
    selectCount: 2,
    options: [
      { key: "1", text: "Figure 1 (Closed circle)", svgMarkup: svgFramed(`<circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="2.4"/>`) },
      { key: "2", text: "Figure 2 (Open trefoil)", svgMarkup: svgFramed(`<path d="M 40 72 H 26 A 14 14 0 1 1 38 44 A 14 14 0 1 1 62 44 A 14 14 0 1 1 74 72 H 60" fill="none" stroke="currentColor" stroke-width="2.4"/>`) },
      { key: "3", text: "Figure 3 (Closed spade/leaf)", svgMarkup: svgFramed(`<path d="M 50 20 Q 58 46 74 56 A 14 14 0 1 1 50 68 A 14 14 0 1 1 26 56 Q 42 46 50 20 Z" fill="none" stroke="currentColor" stroke-width="2.4"/>`) },
      { key: "4", text: "Figure 4 (Open stem)", svgMarkup: svgFramed(`<path d="M 44 84 V 52 H 24 A 26 26 0 1 1 76 52 H 56 V 84" fill="none" stroke="currentColor" stroke-width="2.4"/>`) },
    ],
    correctOption: "1,3",
    explanation:
      "All figures in Class A are completely closed loops, whereas Class B figures are open/broken. Only Figures 1 and 3 are completely closed.",
  },
  {
    id: "oir_set53_q31",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 31,
    type: "verbal",
    subType: "letter_group_classification",
    difficulty: "medium",
    tags: ["letters", "odd-one-out"],
    promptText: "Which group of letters does not belong to the same class as the others?",
    options: [
      { key: "1", text: "ABZMN" },
      { key: "2", text: "CDEFC" },
      { key: "3", text: "EFYIJ" },
      { key: "4", text: "BCONO" },
      { key: "5", text: "HITI" },
    ],
    correctOption: "2",
    explanation:
      "Choices 1, 3, 4, and 5 consist of two adjacent letter pairs broken by a middle/separator pattern, whereas (2) CDEFC runs four consecutive alphabetical letters (C-D-E-F) before repeating C.",
  },
  {
    id: "oir_set53_q32",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 32,
    type: "verbal",
    subType: "word_classification",
    difficulty: "easy",
    tags: ["grammar", "odd-one-out"],
    promptText: "Which word does not belong to the same class as the others?",
    options: [
      { key: "1", text: "This" },
      { key: "2", text: "When" },
      { key: "3", text: "There" },
      { key: "4", text: "Then" },
      { key: "5", text: "Where" },
    ],
    correctOption: "1",
    explanation:
      "When/Then indicate time and Where/There indicate place (relative/demonstrative adverbs), whereas 'This' (choice 1) is a demonstrative pronoun/determiner pointing to an object.",
  },
  {
    id: "oir_set53_q33",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 33,
    type: "verbal",
    subType: "jumbled_sentence_letter",
    difficulty: "easy",
    tags: ["jumbled-sentence", "comprehension"],
    promptText:
      "Write the LAST letter of the rearranged sentence:\n\"its egg Raju an made stand on end.\"",
    options: [
      { key: "D", text: "D" },
      { key: "G", text: "G" },
      { key: "N", text: "N" },
      { key: "E", text: "E" },
    ],
    correctOption: "D",
    explanation:
      "The rearranged sentence is \"Raju made an egg stand on its end.\" The last letter is 'D'.",
  },
  {
    id: "oir_set53_q34",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 34,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "rotation", "90-deg"],
    promptText: "A is to B as C is to which numbered figure?",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `<circle cx="22" cy="68" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="68" x2="66" y2="24" stroke="currentColor" stroke-width="2"/><polygon points="69,21 60,24 66,30" fill="currentColor"/>`,
        `<circle cx="22" cy="22" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="22" x2="66" y2="66" stroke="currentColor" stroke-width="2"/><polygon points="69,69 66,60 60,66" fill="currentColor"/>`,
        `${hVert.def}<rect x="28" y="14" width="34" height="62" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="28" y="45" width="34" height="31" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`${hVert.def}<rect x="33" y="16" width="34" height="68" fill="none" stroke="currentColor" stroke-width="2"/><rect x="33" y="16" width="34" height="34" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`${hVert.def}<rect x="16" y="33" width="68" height="34" fill="none" stroke="currentColor" stroke-width="2"/><rect x="50" y="33" width="34" height="34" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`${hVert.def}<rect x="16" y="33" width="68" height="34" fill="none" stroke="currentColor" stroke-width="2"/><rect x="16" y="33" width="68" height="34" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`${hHoriz.def}<rect x="16" y="33" width="68" height="34" fill="none" stroke="currentColor" stroke-width="2"/><rect x="16" y="33" width="34" height="34" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(`<rect x="33" y="16" width="34" height="68" fill="none" stroke="currentColor" stroke-width="2"/>`),
      },
    ],
    correctOption: "4",
    explanation:
      "B is obtained by rotating A 90° clockwise. Rotating the vertical rectangle C (bottom half shaded) by 90° clockwise turns it horizontal with the shaded half on the left (Figure 4).",
  },
  {
    id: "oir_set53_q35",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 35,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "joining-halves"],
    promptText: "A is to B as C is to which numbered figure?",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `<polygon points="14,14 76,14 76,42" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="14,48 14,76 76,76" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="29" y="14" width="32" height="62" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `${hHoriz.def}<path d="M 18 40 A 27 27 0 0 1 72 40 Z" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/><path d="M 18 52 A 27 27 0 0 0 72 52 Z" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1 (Horizontal hatched circle)",
        svgMarkup: svgFramed(`${hHoriz.def}<circle cx="50" cy="50" r="28" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="2"/>`),
      },
      {
        key: "2",
        text: "Figure 2 (Vertical stadium pill)",
        svgMarkup: svgFramed(`${hHoriz.def}<rect x="30" y="14" width="40" height="72" rx="20" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="2"/>`),
      },
      {
        key: "3",
        text: "Figure 3 (Vertical hatched circle)",
        svgMarkup: svgFramed(`${hVert.def}<circle cx="50" cy="50" r="28" fill="${hVert.fill}" stroke="currentColor" stroke-width="2"/>`),
      },
      {
        key: "4",
        text: "Figure 4 (Plain divided circle)",
        svgMarkup: svgFramed(`<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2"/><line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="2"/>`),
      },
      {
        key: "5",
        text: "Figure 5 (Plain circle with vertical bars)",
        svgMarkup: svgFramed(`<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="2"/><line x1="45" y1="23" x2="45" y2="77" stroke="currentColor" stroke-width="1.8"/><line x1="55" y1="23" x2="55" y2="77" stroke="currentColor" stroke-width="1.8"/>`),
      },
    ],
    correctOption: "3",
    explanation:
      "A merges its two separated triangular halves vertically (and rotates 90°) to form a single unified figure B. Similarly, C merges its two separated semicircular halves and rotates 90° to form one complete vertically-hatched circle (Figure 3 per DIPR Booklet 53 Master Key).",
  },
  {
    id: "oir_set53_q36",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 36,
    type: "verbal",
    subType: "number_series_two",
    difficulty: "easy",
    tags: ["numbers", "interleaved-series"],
    promptText:
      "Which two numbers will come next in the following series?\n11, 1, 13, 3, 16, 6, 20, 10, 25, _____, _____",
    options: [
      { key: "15,31", text: "15, 31" },
      { key: "31,15", text: "31, 15" },
      { key: "14,30", text: "14, 30" },
      { key: "16,32", text: "16, 32" },
    ],
    correctOption: "15,31",
    explanation:
      "This alternates two sub-series: Even positions 1 (+2)→ 3 (+3)→ 6 (+4)→ 10 (+5)→ 15; Odd positions 11 (+2)→ 13 (+3)→ 16 (+4)→ 20 (+5)→ 25 (+6)→ 31. So the next two numbers are 15, 31.",
  },
  {
    id: "oir_set53_q37",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 37,
    type: "verbal",
    subType: "verbal_analogy",
    difficulty: "medium",
    tags: ["analogy", "sequence"],
    promptText: "Result is to Examination as Night is to ______",
    options: [
      { key: "1", text: "Darkness" },
      { key: "2", text: "Sunset" },
      { key: "3", text: "Stars" },
      { key: "4", text: "Light" },
      { key: "5", text: "Moonlight" },
    ],
    correctOption: "2",
    explanation: "Result follows an Examination just as Night follows Sunset (choice 2).",
  },
  {
    id: "oir_set53_q38",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 38,
    type: "verbal",
    subType: "verbal_analogy",
    difficulty: "easy",
    tags: ["analogy", "antonyms"],
    promptText: "Light is to Darkness as Company is to ______",
    options: [
      { key: "1", text: "Friendship" },
      { key: "2", text: "Enmity" },
      { key: "3", text: "Shyness" },
      { key: "4", text: "Solitude" },
      { key: "5", text: "Enjoyment" },
    ],
    correctOption: "4",
    explanation: "Light is the opposite of Darkness; similarly, Company is the opposite of Solitude (choice 4).",
  },
  {
    id: "oir_set53_q39",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 39,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "medium",
    tags: ["class-a-b", "size", "shading"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `${hGrid.def}<circle cx="41" cy="41" r="24" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="32" y="32" width="18" height="18" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hGrid.def}<polygon points="14,12 52,12 68,28 68,68 14,12" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="14,42 40,56 14,70" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hGrid.def}<rect x="14" y="14" width="54" height="54" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="41" cy="41" r="14" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        [
          `${hGrid.def}<rect x="14" y="50" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="52" cy="34" r="18" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hGrid.def}<rect x="14" y="14" width="54" height="54" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="41" cy="41" r="14" fill="white" stroke="currentColor" stroke-width="1.8"/>`,
          `${hGrid.def}<circle cx="41" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="41,34 26,68 56,68" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        82
      ),
      instructionHint: "Observe whether shading is applied to the smaller shape (Class A) or the larger shape (Class B).",
    },
    selectCount: 2,
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="34" y="14" width="18" height="58" transform="rotate(-40 43 43)" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><rect x="18" y="62" width="18" height="14" transform="rotate(-40 27 69)" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`${hGrid.def}<circle cx="50" cy="30" r="14" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><path d="M 32 82 V 56 A 18 14 0 0 1 68 56 V 82 Z" fill="none" stroke="currentColor" stroke-width="2"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`${hGrid.def}<path d="M 34 22 H 66 A 16 18 0 0 1 34 22 Z" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><path d="M 38 78 V 64 A 12 10 0 0 1 62 64 V 78 Z" fill="none" stroke="currentColor" stroke-width="2"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`${hGrid.def}<circle cx="28" cy="28" r="12" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><polygon points="56,36 63,50 78,50 66,60 72,76 56,66 40,76 46,60 34,50 49,50" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
    ],
    correctOption: "2,4",
    explanation:
      "In every Class A figure, the smaller shape is shaded while the larger shape is blank. In Class B, the larger shape is shaded. Figures 2 and 4 both shade only the smaller circle.",
  },
  {
    id: "oir_set53_q40",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 40,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "easy",
    tags: ["class-a-b", "line-style"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `<circle cx="24" cy="56" r="12" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="56" cy="24" r="12" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<polygon points="50,14 34,40 66,40" fill="none" stroke="currentColor" stroke-dasharray="4 3" stroke-width="2"/><rect x="14" y="48" width="36" height="20" fill="none" stroke="dasharray" stroke-width="2"/><rect x="14" y="48" width="36" height="20" fill="none" stroke="currentColor" stroke-dasharray="4 3" stroke-width="2"/>`,
          `<path d="M 38 14 C 24 28, 28 42, 38 38 C 48 42, 52 28, 38 14 Z" fill="none" stroke="currentColor" stroke-dasharray="3 3" stroke-width="2"/><path d="M 54 46 C 42 58, 46 70, 54 66 C 62 70, 66 58, 54 46 Z" fill="none" stroke="currentColor" stroke-dasharray="3 3" stroke-width="2"/>`,
        ],
        [
          `<polygon points="14,50 14,68 44,68" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="36,16 66,16 66,34" fill="none" stroke="currentColor" stroke-dasharray="4 3" stroke-width="2"/>`,
          `<polygon points="41,28 20,66 62,66" fill="none" stroke="currentColor" stroke-dasharray="2 3" stroke-width="3"/><path d="M 50 12 A 14 14 0 1 1 66 28 Z" fill="none" stroke="currentColor" stroke-dasharray="4 2" stroke-width="2"/>`,
          `<rect x="18" y="14" width="46" height="32" fill="none" stroke="currentColor" stroke-dasharray="4 3" stroke-width="2"/><rect x="30" y="54" width="22" height="16" fill="none" stroke="currentColor" stroke-width="2"/>`,
        ],
        82
      ),
      instructionHint: "Class A pairs identical border styles (both solid OR both dashed); Class B mixes them.",
    },
    selectCount: 2,
    options: [
      {
        key: "1",
        text: "Figure 1 (Both solid lines)",
        svgMarkup: svgFramed(`<path d="M 22 68 C 22 52, 46 52, 46 68 Q 34 80 22 68 Z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 54 32 C 54 16, 80 16, 80 32 Q 67 48 54 32 Z" fill="none" stroke="currentColor" stroke-width="2.2"/>`),
      },
      {
        key: "2",
        text: "Figure 2 (1 solid + 1 dashed)",
        svgMarkup: svgFramed(`<path d="M 50 26 C 66 12, 82 28, 66 42 L 50 26 Z" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M 24 62 C 40 48, 56 64, 40 78 L 24 62 Z" fill="none" stroke="currentColor" stroke-dasharray="4 3" stroke-width="2.2"/>`),
      },
      {
        key: "3",
        text: "Figure 3 (Both solid lines)",
        svgMarkup: svgFramed(`<rect x="36" y="18" width="32" height="40" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="24,62 46,62 24,84" fill="none" stroke="currentColor" stroke-width="2.2"/>`),
      },
      {
        key: "4",
        text: "Figure 4 (Dashed cross + solid line)",
        svgMarkup: svgFramed(`<line x1="22" y1="42" x2="78" y2="42" stroke="currentColor" stroke-dasharray="5 3" stroke-width="2.2"/><line x1="50" y1="14" x2="50" y2="66" stroke="currentColor" stroke-dasharray="5 3" stroke-width="2.2"/><line x1="18" y1="78" x2="62" y2="78" stroke="currentColor" stroke-width="2.2"/>`),
      },
    ],
    correctOption: "1,3",
    explanation:
      "In Class A, both elements have the exact same outline style (both solid or both dashed). Figures 1 and 3 use two solid outlines, whereas 2 and 4 mix solid and dashed lines.",
  },
  {
    id: "oir_set53_q41",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 41,
    type: "verbal",
    subType: "word_classification",
    difficulty: "easy",
    tags: ["classification", "garments"],
    promptText: "Which word does not belong to the same class as others?",
    options: [
      { key: "1", text: "Coat" },
      { key: "2", text: "Shirt" },
      { key: "3", text: "Trouser" },
      { key: "4", text: "Dhoti" },
      { key: "5", text: "Pyjama" },
    ],
    correctOption: "4",
    explanation: "Coat, Shirt, Trouser, and Pyjama are stitched garments; Dhoti (choice 4) is an unstitched draped garment.",
  },
  {
    id: "oir_set53_q42",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 42,
    type: "verbal",
    subType: "anagram_letter",
    difficulty: "easy",
    tags: ["anagram", "spelling"],
    promptText:
      "Write the SECOND letter of the rearranged word:\n\"LASYRCT is something hard and angular.\"",
    options: [
      { key: "C", text: "C" },
      { key: "R", text: "R" },
      { key: "Y", text: "Y" },
      { key: "S", text: "S" },
    ],
    correctOption: "R",
    explanation: "LASYRCT unscrambles to CRYSTAL. Its second letter is 'R'.",
  },
  {
    id: "oir_set53_q43",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 43,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "medium",
    tags: ["class-a-b", "matching-pair"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `${hDiag.def}<rect x="12" y="14" width="20" height="20" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><path d="M 52 14 H 60 V 26 H 72 V 34 H 60 V 46 H 52 V 34 H 40 V 26 H 52 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="22" cy="60" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="46" y="52" width="20" height="20" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hHoriz.def}${hVert.def}<circle cx="41" cy="20" r="9" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="10" y="35" width="62" height="12" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="41" cy="64" r="9" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hDiag.def}${hVert.def}<polygon points="24,14 14,38 34,38" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="56,38 46,14 66,14" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="48" width="26" height="20" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="58" cy="58" r="10" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        [
          `${hVert.def}<circle cx="22" cy="22" r="11" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="44" y="12" width="26" height="20" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><path d="M 32 42 C 22 42, 22 72, 32 72 C 42 72, 42 42, 32 42 M 50 42 C 40 42, 40 72, 50 72 C 60 72, 60 42, 50 42" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.5"/>`,
          `${hVert.def}<ellipse cx="26" cy="24" rx="14" ry="10" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M 56 14 H 62 V 22 H 70 V 28 H 62 V 36 H 56 V 28 H 48 V 22 H 56 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="48" width="28" height="18" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="58,44 48,70 68,70" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hDiag.def}${hGrid.def}<rect x="12" y="24" width="28" height="10" transform="rotate(-40 26 29)" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><path d="M 56 12 H 62 V 22 H 72 V 28 H 62 V 38 H 56 V 28 H 46 V 22 H 56 Z" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.5"/><polygon points="26,44 34,58 18,58" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.5"/><circle cx="60" cy="58" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        82
      ),
      instructionHint: "In Class A, each box contains a matching pair of the same shape plus distinct shapes; in Class B all 4 shapes differ.",
    },
    selectCount: 2,
    options: [
      {
        key: "1",
        text: "Figure 1 (Circle + twin shaded bars + square)",
        svgMarkup: svgFramed(`${hDiag.def}<circle cx="24" cy="76" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="34" y="42" width="26" height="16" transform="rotate(-45 47 50)" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="54" y="22" width="26" height="16" transform="rotate(-45 67 30)" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "2",
        text: "Figure 2 (Circle + long bar + 1 wide triangle)",
        svgMarkup: svgFramed(`${hVert.def}${hDiag.def}<circle cx="50" cy="24" r="11" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="18" y="44" width="64" height="12" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="50,68 22,86 78,86" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "3",
        text: "Figure 3 (4 all-different shapes)",
        svgMarkup: svgFramed(`${hVert.def}${hDiag.def}<rect x="18" y="18" width="22" height="22" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><path d="M 68 18 H 74 V 28 H 84 V 34 H 74 V 44 H 68 V 34 H 58 V 28 H 68 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="28,58 16,84 40,84" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="70" cy="72" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "4",
        text: "Figure 4 (2 identical bowties + diamond + triangle)",
        svgMarkup: svgFramed(`${hVert.def}${hDiag.def}<polygon points="18,16 30,28 18,40 30,28 42,16 30,28 42,40 30,28" fill="${hDiag.fill}" stroke="currentColor" stroke-width="4"/><polygon points="72,14 82,30 72,46 62,30" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="28,58 16,84 40,84" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="60,58 72,70 60,82 72,70 84,58 72,70 84,82 72,70" fill="${hDiag.fill}" stroke="currentColor" stroke-width="4"/>`),
      },
    ],
    correctOption: "1,4",
    explanation:
      "Every Class A box contains at least one pair of identical shapes (two squares in A1, two circles in A2, two triangles in A3), whereas Class B has four distinct shapes. Figures 1 and 4 each repeat an identical shape pair.",
  },
  {
    id: "oir_set53_q44",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 44,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "easy",
    tags: ["class-a-b", "clockwise", "arrows"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          curvedArrowSvg("M 18 56 C 14 20, 62 18, 62 48", 62, 52, 90, { cx: 18, cy: 60 }, 82),
          curvedArrowSvg("M 40 16 C 64 28, 66 64, 34 62", 30, 61, 195, { cx: 36, cy: 14 }, 82),
          curvedArrowSvg("M 18 24 C 52 10, 66 44, 44 68", 40, 71, 140, { cx: 14, cy: 26 }, 82),
          curvedArrowSvg("M 14 54 C 14 14, 50 24, 68 50", 71, 54, 52, { cx: 14, cy: 58 }, 82),
        ],
        [
          curvedArrowSvg("M 56 64 C 60 16, 18 16, 18 52", 18, 56, 90, { cx: 56, cy: 68 }, 82),
          curvedArrowSvg("M 66 20 C 18 18, 12 60, 40 66", 44, 66, 5, { cx: 70, cy: 20 }, 82),
          curvedArrowSvg("M 56 20 C 18 12, 16 54, 48 68", 52, 70, 28, { cx: 60, cy: 22 }, 82),
          curvedArrowSvg("M 16 32 C 14 70, 56 72, 68 38", 70, 34, -68, { cx: 16, cy: 28 }, 82),
        ],
        82
      ),
      instructionHint: "Follow each path from the small open circle (tail) to the arrowhead: Clockwise (Class A) vs Anti-Clockwise (Class B).",
    },
    selectCount: 2,
    options: [
      { key: "1", text: "Figure 1", svgMarkup: svgFramed(curvedArrowSvg("M 50 18 C 18 32, 20 76, 62 66", 66, 64, -20, { cx: 52, cy: 14 }, 100)) },
      { key: "2", text: "Figure 2", svgMarkup: svgFramed(curvedArrowSvg("M 66 36 C 48 68, 18 68, 20 34", 21, 30, -85, { cx: 68, cy: 32 }, 100)) },
      { key: "3", text: "Figure 3", svgMarkup: svgFramed(curvedArrowSvg("M 18 56 C 42 18, 68 20, 64 56", 63, 60, 100, { cx: 16, cy: 60 }, 100)) },
      { key: "4", text: "Figure 4", svgMarkup: svgFramed(curvedArrowSvg("M 50 66 C 68 38, 60 14, 30 22", 26, 24, 165, { cx: 48, cy: 70 }, 100)) },
    ],
    correctOption: "2,3",
    explanation:
      "Every curve in Class A travels clockwise from its circle tail to its arrowhead; Class B curves travel anti-clockwise. Following the circle tail → arrowhead in Figures 2 and 3 moves clockwise.",
  },
  {
    id: "oir_set53_q45",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 45,
    type: "verbal",
    subType: "anagram_letter",
    difficulty: "easy",
    tags: ["anagram", "vocabulary"],
    promptText:
      "Write the LAST letter of the rearranged word:\n\"HIPMAS means the same as accident.\"",
    options: [
      { key: "P", text: "P" },
      { key: "S", text: "S" },
      { key: "M", text: "M" },
      { key: "H", text: "H" },
    ],
    correctOption: "P",
    explanation: "HIPMAS rearranges to MISHAP (meaning accident). Its last letter is 'P'.",
  },
  {
    id: "oir_set53_q46",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 46,
    type: "verbal",
    subType: "word_classification",
    difficulty: "easy",
    tags: ["classification", "odd-one-out"],
    promptText: "Which word does not belong to the same class as others?",
    options: [
      { key: "1", text: "Washing" },
      { key: "2", text: "Cleaning" },
      { key: "3", text: "Sweeping" },
      { key: "4", text: "Wiping" },
      { key: "5", text: "Ironing" },
    ],
    correctOption: "5",
    explanation:
      "Washing, Cleaning, Sweeping, and Wiping are all acts of removing dirt/dust, whereas Ironing (choice 5) is pressing fabric.",
  },
  {
    id: "oir_set53_q47",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 47,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "hard",
    tags: ["class-a-b", "shading", "pairs"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `${hVert.def}<rect x="12" y="14" width="22" height="54" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="54,18 44,44 64,44" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hDiag.def}<polygon points="28,36 40,50 28,64 16,50" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="56,16 68,30 56,44 44,30" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hDiag.def}<circle cx="30" cy="54" r="16" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="56" cy="24" r="10" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hVert.def}<circle cx="41" cy="24" r="12" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="41" cy="58" r="12" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        [
          `${hHoriz.def}<polygon points="36,14 14,34 58,34" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="36,44 22,64 50,64" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hVert.def}<polygon points="40,42 18,42 18,64" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="40,42 64,20 64,42" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hDiag.def}${hVert.def}<circle cx="32" cy="24" r="14" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="44" y="48" width="22" height="20" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hHoriz.def}<path d="M 38 14 H 44 V 38 H 68 V 44 H 44 V 68 H 38 V 44 H 14 V 38 H 38 Z" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.5"/>`,
        ],
        82
      ),
      instructionHint: "Compare shading density and identical dark/diagonal fills in Class A vs Class B.",
    },
    selectCount: 2,
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`${hDiag.def}<circle cx="24" cy="28" r="10" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="52" cy="56" r="10" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`${hVert.def}<polygon points="16,44 36,68 16,68" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="48,16 84,16 84,54" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`${hDiag.def}<polygon points="18,68 48,20 56,28 26,76" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="48,74 78,42 84,48 54,80" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`${hVert.def}<rect x="12" y="18" width="24" height="64" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="46" y="54" width="38" height="22" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`),
      },
    ],
    correctOption: "1,2",
    explanation:
      "Per DIPR Booklet 53 Master Key, Class A pairs share uniform directional/dark hatching across big/small or matching elements (Figures 1 and 2).",
  },
  {
    id: "oir_set53_q48",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 48,
    type: "non_verbal",
    subType: "figure_group_classification_two",
    difficulty: "hard",
    tags: ["class-a-b", "shading", "pairs"],
    promptText: "Which TWO of the following figures belong to Class A?",
    figures: {
      type: "svg",
      svgMarkup: svgClassAB(
        [
          `${hDiag.def}${hHoriz.def}<circle cx="52" cy="24" r="14" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="56" r="14" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hVert.def}${hHoriz.def}<rect x="26" y="12" width="22" height="22" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="14" y="34" width="20" height="38" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="56,28 44,68 68,68" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `<path d="M 38 14 A 10 10 0 1 1 54 14 A 10 10 0 1 1 54 32 A 10 10 0 1 1 30 28 Z" fill="none" stroke="currentColor" stroke-width="1.6"/><path d="M 52 44 A 10 10 0 1 1 68 44 A 10 10 0 1 1 68 64 A 10 10 0 1 1 44 58 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        [
          `${hVert.def}<circle cx="52" cy="24" r="14" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="56" r="14" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hVert.def}<rect x="14" y="50" width="22" height="22" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="44" y="14" width="28" height="20" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>`,
          `${hDiag.def}${hVert.def}<polygon points="24,42 14,72 34,72" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/><polygon points="52,14 42,46 62,46" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        82
      ),
    },
    selectCount: 2,
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`${hDiag.def}${hDiag2.def}<rect x="18" y="18" width="28" height="28" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.8"/><rect x="52" y="54" width="28" height="28" fill="${hDiag2.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`${hGrid.def}<polygon points="48,18 34,46 62,46" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><circle cx="50" cy="68" r="16" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`${hGrid.def}<polygon points="72,12 88,28 72,44 56,28" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><circle cx="34" cy="68" r="16" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`${hHoriz.def}<rect x="50" y="14" width="32" height="28" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/><rect x="18" y="54" width="32" height="28" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/>`),
      },
    ],
    correctOption: "1,2",
    explanation:
      "Comparing shape vs shading matching across Class A (same shape pairs with different shading or different shape sets with dense fills) vs Class B selects Figures 1 and 2 per DIPR Booklet 53 solved key.",
  },
  {
    id: "oir_set53_q49",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_53",
    sourceBookletName: "DIPR Booklet 53 (Test B)",
    questionNumber: 49,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "merging", "overlap"],
    promptText: "A is to B as C is to which numbered figure?",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `${hGrid.def}<circle cx="60" cy="28" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="24" cy="66" r="10" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        `${hGrid.def}<circle cx="52" cy="36" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="38" cy="52" r="12" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        `${hDiag.def}<circle cx="22" cy="45" r="12" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.6"/><rect x="52" y="16" width="24" height="58" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="38" y="14" width="26" height="72" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><path d="M 38 34 A 18 18 0 0 0 38 66 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="34" y="14" width="26" height="72" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><path d="M 60 34 A 18 18 0 0 1 60 66" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="28" y="14" width="28" height="72" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><circle cx="64" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(`<rect x="32" y="14" width="36" height="72" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(`${hGrid.def}<rect x="14" y="28" width="72" height="28" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/><circle cx="60" cy="64" r="12" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
      },
    ],
    correctOption: "3",
    explanation:
      "In A → B, the shaded shape shifts across/merges with the hollow shape while swapping fill onto the larger overlapping element so they sit side by side touching. Applying this to C puts the shaded tall rectangle touching the complete hollow circle on its right (Figure 3).",
  },
];

export const BOOKLET_53: OIRBooklet = {
  id: "booklet_53",
  source: "Authentic DIPR",
  bookletNumber: "DIPR-53",
  title: "DIPR Booklet 53 (Test B — Authentic)",
  category: "mixed",
  totalQuestions: 49,
  durationMinutes: 20,
  markingScheme: { correct: 1.0, incorrect: 0.0 },
  description:
    "Authentic DIPR Booklet No. 53 (Test B) — 49 complete mixed Verbal & Non-Verbal intelligence items including visual series, Class A/B two-choice figures, analogies, anagrams, and arithmetic.",
  questions: BOOKLET_53_QUESTIONS,
};
