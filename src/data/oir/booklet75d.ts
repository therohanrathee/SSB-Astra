import { OIRBooklet, OIRQuestion } from "./types";
import {
  makeHatch,
  svgAnalogy,
  svgCanvas,
  svgFramed,
  svgSeries,
} from "./svgHelpers";

const hHoriz = makeHatch("horiz");
const hVert = makeHatch("vert");
const hGrid = makeHatch("grid");
const hDiag = makeHatch("diag");
const hDiag2 = makeHatch("diag2");
const hDots = makeHatch("dots");

/**
 * Renders a 3x3 design-completion matrix with a question-mark target in bottom-right.
 * Each cell expects content in an 80x80 coordinate space.
 */
function svgMatrix3x3(cells: string[]): string {
  const cell = 80;
  const gap = 8;
  const pad = 8;
  const w = pad * 2 + cell * 3 + gap * 2;
  const h = pad * 2 + cell * 3 + gap * 2;
  let body = "";
  for (let idx = 0; idx < 9; idx++) {
    const r = Math.floor(idx / 3);
    const c = idx % 3;
    const x = pad + c * (cell + gap);
    const y = pad + r * (cell + gap);
    if (idx < 8 && cells[idx]) {
      body += `<g transform="translate(${x},${y})"><rect width="${cell}" height="${cell}" rx="4" fill="none" stroke="currentColor" stroke-opacity="0.22" stroke-width="1.2"/>${cells[idx]}</g>`;
    } else {
      body += `<g transform="translate(${x},${y})"><rect width="${cell}" height="${cell}" rx="4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-dasharray="4 3"/><text x="${cell / 2}" y="${cell / 2 + 7}" text-anchor="middle" font-size="22" font-weight="700" fill="currentColor">?</text></g>`;
    }
  }
  return svgCanvas(body, w, h);
}

/**
 * Helper for Test D Q38 & Q46 quadrant/strip hatch blocks in 80x80 cell (or 100x100 option).
 */
function fillStyle(kind: "empty" | "dark" | "horiz" | "vert" | "grid"): {
  defs: string;
  fill: string;
} {
  if (kind === "empty") return { defs: "", fill: "none" };
  if (kind === "dark") return { defs: hDots.def, fill: "currentColor" };
  if (kind === "horiz") return { defs: hHoriz.def, fill: hHoriz.fill };
  if (kind === "vert") return { defs: hVert.def, fill: hVert.fill };
  return { defs: hGrid.def, fill: hGrid.fill };
}

function tileGrid(
  cols: number,
  rows: number,
  kinds: Array<"empty" | "dark" | "horiz" | "vert" | "grid" | null>,
  boxSize = 80,
  tile = 20
): string {
  const tw = cols * tile;
  const th = rows * tile;
  const ox = (boxSize - tw) / 2;
  const oy = (boxSize - th) / 2;
  const usedDefs = new Set<string>();
  let rects = "";
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      const k = kinds[r * cols + c];
      if (!k) continue;
      const st = fillStyle(k);
      if (st.defs) usedDefs.add(st.defs);
      const fillAttr =
        k === "dark" ? `fill="currentColor" fill-opacity="0.82"` : `fill="${st.fill}"`;
      rects += `<rect x="${ox + c * tile}" y="${oy + r * tile}" width="${tile}" height="${tile}" ${fillAttr} stroke="currentColor" stroke-width="1.6"/>`;
    }
  }
  return `${Array.from(usedDefs).join("")}${rects}`;
}

export const BOOKLET_75D_QUESTIONS: OIRQuestion[] = [
  {
    id: "oir_set75d_q01",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 1,
    type: "verbal",
    subType: "coded_arithmetic",
    difficulty: "medium",
    tags: ["arithmetic", "pattern", "coded-operator"],
    promptText:
      "Which choice mentions the answer to the following:\nIf 9 ÷ 3 = 3,  100 ÷ 4 = 48,  56 ÷ 14 = 21,  15 ÷ 3 = 6,  64 ÷ 8 = 28,\nthen  45 ÷ 5 = _____",
    options: [
      { key: "1", text: "25" },
      { key: "2", text: "40" },
      { key: "3", text: "20" },
      { key: "4", text: "50" },
    ],
    correctOption: "3",
    explanation:
      "Each '÷' expression follows the rule (A − B) / 2: (9−3)/2 = 3, (100−4)/2 = 48, (56−14)/2 = 21, (15−3)/2 = 6, and (64−8)/2 = 28. Therefore 45 ÷ 5 = (45 − 5) / 2 = 20, which is option (3).",
  },
  {
    id: "oir_set75d_q02",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 2,
    type: "non_verbal",
    subType: "figure_classification",
    difficulty: "medium",
    tags: ["angles", "odd-one-out", "geometry"],
    promptText: "Write the number of the figure which does not belong to the same class as the others.",
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<polyline points="72,26 26,70 76,70" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<polyline points="24,20 38,76 76,76" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<polyline points="78,34 26,34 62,72" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<polyline points="32,20 32,76 74,76" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<polyline points="78,34 32,34 20,76" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>`
        ),
      },
    ],
    correctOption: "4",
    explanation:
      "Figures (1) and (3) are acute angles (~45°), while (2) and (5) are obtuse angles (~100°). Only Figure (4) forms an exact 90° right angle.",
  },
  {
    id: "oir_set75d_q03",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 3,
    type: "verbal",
    subType: "letter_series",
    difficulty: "medium",
    tags: ["letters", "series", "multi-select"],
    promptText:
      "Which choices mention the two letters that will come next in the following series in the correct order?\nA   B   O   C   E   O   F   I   O   J   ___   ___",
    options: [
      { key: "1", text: "N" },
      { key: "2", text: "M" },
      { key: "3", text: "O" },
      { key: "4", text: "L" },
    ],
    selectCount: 2,
    correctOption: "1,3",
    explanation:
      "Each triplet ends with the separator 'O', while the alphabetical step inside the first two letters increases by 1 each group: A (+1) B, C (+2) E, F (+3) I, so J (+4) gives N, followed by O → N (1) and O (3).",
  },
  {
    id: "oir_set75d_q04",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 4,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "medium",
    tags: ["series", "symmetry", "shapes"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<line x1="16" y1="48" x2="68" y2="48" stroke="currentColor" stroke-width="2"/><circle cx="42" cy="41" r="6.5" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>`,
          `<line x1="48" y1="16" x2="48" y2="68" stroke="currentColor" stroke-width="2"/><rect x="36" y="36" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `<line x1="16" y1="36" x2="68" y2="36" stroke="currentColor" stroke-width="2"/><rect x="28" y="36" width="28" height="11" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>`,
          `<line x1="16" y1="48" x2="68" y2="48" stroke="currentColor" stroke-width="2"/><rect x="28" y="37" width="28" height="11" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `<line x1="48" y1="16" x2="48" y2="68" stroke="currentColor" stroke-width="2"/><rect x="36" y="36" width="12" height="12" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<line x1="20" y1="42" x2="80" y2="42" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<line x1="20" y1="42" x2="80" y2="42" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="7.5" fill="currentColor" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<line x1="20" y1="58" x2="80" y2="58" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<line x1="20" y1="58" x2="80" y2="58" stroke="currentColor" stroke-width="2.2"/><circle cx="50" cy="50" r="7.5" fill="currentColor" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<line x1="20" y1="42" x2="80" y2="42" stroke="currentColor" stroke-width="2.2"/><rect x="34" y="42" width="32" height="12" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
    ],
    correctOption: "1",
    explanation:
      "Three rules act simultaneously: (1) Shading alternates Solid → Hollow → Solid → Hollow → Solid → Hollow. (2) Shape forms a mirror palindrome: Circle, Square, Rectangle | Rectangle, Square, Circle. (3) Placement cycles Above, Left, Below | Above, Left, Below. Thus figure 6 has a hollow circle below a horizontal line (Figure 1).",
  },
  {
    id: "oir_set75d_q05",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 5,
    type: "verbal",
    subType: "number_series",
    difficulty: "easy",
    tags: ["numbers", "series"],
    promptText:
      "Write the next two numbers in the series:\n5,  15,  20,  60,  65,  195,  200,  _____,  _____",
    options: [
      { key: "600,605", text: "600, 605" },
      { key: "205,615", text: "205, 615" },
      { key: "400,405", text: "400, 405" },
      { key: "600,610", text: "600, 610" },
    ],
    correctOption: "600,605",
    explanation:
      "The operations alternate ×3 and +5: 5 × 3 = 15, +5 = 20, ×3 = 60, +5 = 65, ×3 = 195, +5 = 200 → 200 × 3 = 600 and 600 + 5 = 605.",
  },
  {
    id: "oir_set75d_q06",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 6,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "hatching", "rotation"],
    promptText:
      "Figures A and B are related. Figure C has the same relation with one of the four choices given. Write the number of the correct choice.",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `${hVert.def}${hHoriz.def}${hGrid.def}
         <rect x="15" y="15" width="42" height="30" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>
         <rect x="15" y="45" width="42" height="30" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/>
         <rect x="57" y="15" width="18" height="60" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        `${hVert.def}${hHoriz.def}${hGrid.def}
         <rect x="15" y="15" width="60" height="42" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>
         <rect x="15" y="57" width="30" height="18" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>
         <rect x="45" y="57" width="30" height="18" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        `${hVert.def}${hHoriz.def}${hGrid.def}
         <rect x="15" y="15" width="18" height="30" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.6"/>
         <rect x="15" y="45" width="18" height="30" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.6"/>
         <rect x="33" y="15" width="42" height="60" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.6"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Choice 1",
        svgMarkup: svgFramed(
          `${hVert.def}${hHoriz.def}${hGrid.def}
           <rect x="18" y="18" width="64" height="16" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/>
           <rect x="18" y="34" width="32" height="48" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/>
           <rect x="50" y="34" width="32" height="48" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "2",
        text: "Choice 2",
        svgMarkup: svgFramed(
          `${hVert.def}${hHoriz.def}${hGrid.def}
           <rect x="18" y="18" width="64" height="16" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/>
           <rect x="18" y="34" width="32" height="48" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.8"/>
           <rect x="50" y="34" width="32" height="48" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "3",
        text: "Choice 3",
        svgMarkup: svgFramed(
          `${hVert.def}${hHoriz.def}${hGrid.def}
           <rect x="18" y="18" width="32" height="48" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.8"/>
           <rect x="50" y="18" width="32" height="48" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/>
           <rect x="18" y="66" width="64" height="16" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "4",
        text: "Choice 4",
        svgMarkup: svgFramed(
          `${hVert.def}${hHoriz.def}${hGrid.def}
           <rect x="18" y="18" width="48" height="32" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/>
           <rect x="18" y="50" width="48" height="32" fill="${hVert.fill}" stroke="currentColor" stroke-width="1.8"/>
           <rect x="66" y="18" width="16" height="64" fill="${hGrid.fill}" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
    ],
    correctOption: "2",
    explanation:
      "In A → B, the single cross-hatched band shifts to the top and swaps its proportion with the two-part vertical/horizontal hatched block placed side by side at the bottom (vertical hatching on the left, horizontal on the right). Applying the same size swap and layout to C gives Choice (2).",
  },
  {
    id: "oir_set75d_q07",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 7,
    type: "verbal",
    subType: "word_pair_classification",
    difficulty: "easy",
    tags: ["vocabulary", "synonyms", "odd-one-out"],
    promptText:
      "Write the number of the pair which is different from the other pairs in the following:",
    options: [
      { key: "1", text: "Announce and Advertise" },
      { key: "2", text: "Hate and Detest" },
      { key: "3", text: "Declare and Cancel" },
      { key: "4", text: "Admire and Adore" },
    ],
    correctOption: "3",
    explanation:
      "(1), (2), and (4) are pairs of near-synonyms, whereas (3) 'Declare and Cancel' are contrasting/non-synonymous actions.",
  },
  {
    id: "oir_set75d_q08",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 8,
    type: "non_verbal",
    subType: "figure_classification",
    difficulty: "medium",
    tags: ["odd-one-out", "symmetry", "radial"],
    promptText: "Write the number of the figure which does not belong to the same class as the others.",
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="14" fill="none" stroke="currentColor" stroke-width="2"/>
           <polygon points="44,37 50,15 56,37" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polygon points="44,63 50,85 56,63" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polygon points="37,44 15,50 37,56" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polygon points="63,44 85,50 63,56" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="16" fill="none" stroke="currentColor" stroke-width="2"/>
           ${Array.from({ length: 16 }, (_, i) => {
             const a = (i * Math.PI) / 8;
             const x1 = (50 + 16 * Math.cos(a)).toFixed(1);
             const y1 = (50 + 16 * Math.sin(a)).toFixed(1);
             const x2 = (50 + 30 * Math.cos(a)).toFixed(1);
             const y2 = (50 + 30 * Math.sin(a)).toFixed(1);
             return `<line x1="${x1}" y1="${y1}" x2="${x2}" y2="${y2}" stroke="currentColor" stroke-width="1.7"/>`;
           }).join("")}`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<circle cx="37" cy="37" r="13" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="63" cy="37" r="13" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="37" cy="63" r="13" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="63" cy="63" r="13" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="20" y1="20" x2="32" y2="32" stroke="currentColor" stroke-width="1.6"/>
           <line x1="80" y1="20" x2="68" y2="32" stroke="currentColor" stroke-width="1.6"/>
           <line x1="20" y1="80" x2="32" y2="68" stroke="currentColor" stroke-width="1.6"/>
           <line x1="80" y1="80" x2="68" y2="68" stroke="currentColor" stroke-width="1.6"/>
           <line x1="50" y1="18" x2="50" y2="38" stroke="currentColor" stroke-width="1.5"/>
           <line x1="50" y1="62" x2="50" y2="82" stroke="currentColor" stroke-width="1.5"/>
           <line x1="18" y1="50" x2="38" y2="50" stroke="currentColor" stroke-width="1.5"/>
           <line x1="62" y1="50" x2="82" y2="50" stroke="currentColor" stroke-width="1.5"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<rect x="34" y="34" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <rect x="46" y="24" width="8" height="52" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <rect x="24" y="46" width="52" height="8" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <rect x="38" y="16" width="24" height="8" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <rect x="38" y="76" width="24" height="8" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <rect x="16" y="38" width="8" height="24" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <rect x="76" y="38" width="8" height="24" fill="none" stroke="currentColor" stroke-width="1.7"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" stroke-width="2"/>
           <rect x="46" y="16" width="8" height="68" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <rect x="16" y="46" width="68" height="8" fill="none" stroke="currentColor" stroke-width="1.7"/>`
        ),
      },
    ],
    correctOption: "1",
    explanation:
      "Per DIPR Test D Master Key, Figure (1) is the odd one out: it features four pointed triangular cones radiating from an unmarked circle, whereas Figures (2)–(5) extend straight/rectangular line or circular spokes rather than triangular spikes.",
  },
  {
    id: "oir_set75d_q09",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 9,
    type: "verbal",
    subType: "coding_decoding",
    difficulty: "medium",
    tags: ["coding", "atbash", "reverse-alphabet"],
    promptText: 'If URT means "FIG", IFHG means _____',
    options: [
      { key: "1", text: "RUST" },
      { key: "2", text: "RUSE" },
      { key: "3", text: "ROSE" },
      { key: "4", text: "RUSH" },
      { key: "5", text: "BUST" },
    ],
    correctOption: "1",
    explanation:
      "Each letter maps to its reverse-alphabet partner (sum of positions = 27: A↔Z, B↔Y, ..., F↔U, I↔R, G↔T). Decoding IFHG gives I→R, F→U, H→S, G→T = RUST, which is choice (1).",
  },
  {
    id: "oir_set75d_q10",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 10,
    type: "non_verbal",
    subType: "figure_classification",
    difficulty: "medium",
    tags: ["dots", "geometry", "odd-one-out"],
    promptText: "Write the number of the figure which does not belong to the same class as the others.",
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<rect x="26" y="26" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
           <circle cx="26" cy="26" r="6" fill="currentColor"/><circle cx="74" cy="26" r="6" fill="currentColor"/>
           <circle cx="26" cy="74" r="6" fill="currentColor"/><circle cx="74" cy="74" r="6" fill="currentColor"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<polygon points="34,26 34,76 66,51" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
           <circle cx="34" cy="26" r="6" fill="currentColor"/><circle cx="34" cy="51" r="6" fill="currentColor"/>
           <circle cx="34" cy="76" r="6" fill="currentColor"/><circle cx="66" cy="51" r="6" fill="currentColor"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
           <circle cx="22" cy="50" r="6" fill="currentColor"/><circle cx="50" cy="50" r="6" fill="currentColor"/><circle cx="78" cy="50" r="6" fill="currentColor"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<polygon points="50,34 26,68 74,68" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
           <circle cx="50" cy="34" r="6" fill="currentColor"/><circle cx="26" cy="68" r="6" fill="currentColor"/><circle cx="74" cy="68" r="6" fill="currentColor"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<polygon points="50,24 76,50 50,76 24,50" fill="none" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4 4"/>
           <circle cx="50" cy="24" r="6" fill="currentColor"/><circle cx="76" cy="50" r="6" fill="currentColor"/>
           <circle cx="50" cy="76" r="6" fill="currentColor"/><circle cx="24" cy="50" r="6" fill="currentColor"/>`
        ),
      },
    ],
    correctOption: "3",
    explanation:
      "In (1), (2), (4), and (5), the dots form closed two-dimensional geometric shapes (square, 4-dot triangle, triangle, rhombus). Only Figure (3) consists of three collinear dots forming a 1D straight line without enclosing any area.",
  },
  {
    id: "oir_set75d_q11",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 11,
    type: "verbal",
    subType: "jumbled_word",
    difficulty: "easy",
    tags: ["anagram", "spelling"],
    promptText:
      "Which choice mentions the last letter of the arranged word from the following jumbled spellings:\nG  I  G  N  I  R  B  N",
    options: [
      { key: "1", text: "R" },
      { key: "2", text: "I" },
      { key: "3", text: "G" },
      { key: "4", text: "N" },
    ],
    correctOption: "3",
    explanation:
      "Unscrambling G I G N I R B N forms BRINGING, whose last letter is G, which is choice (3).",
  },
  {
    id: "oir_set75d_q12",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 12,
    type: "non_verbal",
    subType: "figure_matrix",
    difficulty: "hard",
    tags: ["matrix", "movement", "grid"],
    promptText: "Write the number of the figure which will complete the design:",
    figures: {
      type: "svg",
      svgMarkup: svgMatrix3x3([
        `<line x1="40" y1="14" x2="40" y2="66" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="40" x2="66" y2="40" stroke="currentColor" stroke-width="1.5"/>
         <rect x="30" y="30" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2"/>
         <text x="45" y="25" font-size="9" fill="currentColor">↑</text><text x="54" y="39" font-size="9" fill="currentColor">→</text>
         <text x="44" y="61" font-size="9" fill="currentColor">↓</text><text x="19" y="50" font-size="9" fill="currentColor">←</text>`,
        `<line x1="40" y1="14" x2="40" y2="66" stroke="currentColor" stroke-width="1.6"/><line x1="14" y1="40" x2="66" y2="40" stroke="currentColor" stroke-width="1.6"/>
         <line x1="33" y1="24" x2="47" y2="24" stroke="currentColor" stroke-width="2.2"/><line x1="33" y1="56" x2="47" y2="56" stroke="currentColor" stroke-width="2.2"/>
         <line x1="24" y1="33" x2="24" y2="47" stroke="currentColor" stroke-width="2.2"/><line x1="56" y1="33" x2="56" y2="47" stroke="currentColor" stroke-width="2.2"/>`,
        `<line x1="40" y1="14" x2="40" y2="66" stroke="currentColor" stroke-width="2"/><line x1="14" y1="40" x2="66" y2="40" stroke="currentColor" stroke-width="2"/>
         <line x1="31" y1="14" x2="49" y2="14" stroke="currentColor" stroke-width="2.2"/><line x1="31" y1="66" x2="49" y2="66" stroke="currentColor" stroke-width="2.2"/>
         <line x1="14" y1="31" x2="14" y2="49" stroke="currentColor" stroke-width="2.2"/><line x1="66" y1="31" x2="66" y2="49" stroke="currentColor" stroke-width="2.2"/>`,
        `<line x1="31" y1="16" x2="31" y2="64" stroke="currentColor" stroke-width="2"/><line x1="49" y1="16" x2="49" y2="64" stroke="currentColor" stroke-width="2"/>
         <line x1="16" y1="31" x2="64" y2="31" stroke="currentColor" stroke-width="2"/><line x1="16" y1="49" x2="64" y2="49" stroke="currentColor" stroke-width="2"/>`,
        `<line x1="40" y1="14" x2="40" y2="66" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="40" x2="66" y2="40" stroke="currentColor" stroke-width="1.5"/>
         <rect x="26" y="26" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2"/>`,
        `<line x1="40" y1="14" x2="40" y2="66" stroke="currentColor" stroke-width="2"/><line x1="14" y1="40" x2="66" y2="40" stroke="currentColor" stroke-width="2"/>
         <line x1="28" y1="14" x2="52" y2="14" stroke="currentColor" stroke-width="2.2"/><line x1="28" y1="66" x2="52" y2="66" stroke="currentColor" stroke-width="2.2"/>
         <line x1="14" y1="18" x2="14" y2="62" stroke="currentColor" stroke-width="2.2"/><line x1="66" y1="18" x2="66" y2="62" stroke="currentColor" stroke-width="2.2"/>`,
        `<line x1="28" y1="14" x2="28" y2="66" stroke="currentColor" stroke-width="2"/><line x1="52" y1="14" x2="52" y2="66" stroke="currentColor" stroke-width="2"/>
         <line x1="14" y1="28" x2="66" y2="28" stroke="currentColor" stroke-width="2"/><line x1="14" y1="52" x2="66" y2="52" stroke="currentColor" stroke-width="2"/>
         <text x="54" y="22" font-size="9" fill="currentColor">↑</text><text x="64" y="38" font-size="9" fill="currentColor">→</text>
         <text x="53" y="65" font-size="9" fill="currentColor">↓</text><text x="16" y="61" font-size="9" fill="currentColor">←</text>`,
        `<line x1="25" y1="14" x2="25" y2="66" stroke="currentColor" stroke-width="2"/><line x1="55" y1="14" x2="55" y2="66" stroke="currentColor" stroke-width="2"/>
         <line x1="14" y1="25" x2="66" y2="25" stroke="currentColor" stroke-width="2"/><line x1="14" y1="55" x2="66" y2="55" stroke="currentColor" stroke-width="2"/>
         <line x1="40" y1="16" x2="40" y2="64" stroke="currentColor" stroke-width="1.2"/>`,
      ]),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<line x1="34" y1="18" x2="34" y2="82" stroke="currentColor" stroke-width="2"/><line x1="66" y1="18" x2="66" y2="82" stroke="currentColor" stroke-width="2"/>
           <line x1="18" y1="34" x2="82" y2="34" stroke="currentColor" stroke-width="2"/><line x1="18" y1="66" x2="82" y2="66" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 4"/>
           <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="1.6" stroke-dasharray="6 4"/>
           <line x1="35" y1="38" x2="35" y2="62" stroke="currentColor" stroke-width="2"/><line x1="65" y1="38" x2="65" y2="62" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <line x1="50" y1="20" x2="50" y2="80" stroke="currentColor" stroke-width="2"/>
           <line x1="20" y1="50" x2="80" y2="50" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<line x1="36" y1="18" x2="36" y2="82" stroke="currentColor" stroke-width="1.8"/><line x1="64" y1="18" x2="64" y2="82" stroke="currentColor" stroke-width="1.8"/>
           <line x1="18" y1="36" x2="82" y2="36" stroke="currentColor" stroke-width="1.8"/><line x1="18" y1="64" x2="82" y2="64" stroke="currentColor" stroke-width="1.8"/>
           <line x1="50" y1="16" x2="50" y2="84" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5"/>
           <line x1="16" y1="50" x2="84" y2="50" stroke="currentColor" stroke-width="1.4" stroke-dasharray="5 5"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" stroke-width="1.8"/>
           <line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" stroke-width="1.8"/>
           <rect x="38" y="38" width="24" height="24" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "6",
        text: "Figure 6",
        svgMarkup: svgFramed(
          `<line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" stroke-width="1.8"/>
           <line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" stroke-width="1.8"/>
           <rect x="36" y="36" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="36" y1="18" x2="64" y2="18" stroke="currentColor" stroke-width="2.2"/><line x1="36" y1="82" x2="64" y2="82" stroke="currentColor" stroke-width="2.2"/>
           <line x1="18" y1="26" x2="18" y2="74" stroke="currentColor" stroke-width="2.2"/><line x1="82" y1="26" x2="82" y2="74" stroke="currentColor" stroke-width="2.2"/>`
        ),
      },
    ],
    correctOption: "3",
    explanation:
      "In Row 1, the four sides of the central square move outward step by step along the arms of the cross to form I-beam caps. In Row 3, all four parallel grid bars move outward along the indicated arrows to the outer perimeter, forming the closed 2×2 window frame of Figure (3).",
  },
  {
    id: "oir_set75d_q13",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 13,
    type: "verbal",
    subType: "word_pair_classification",
    difficulty: "easy",
    tags: ["vocabulary", "synonyms", "odd-one-out"],
    promptText:
      "Write the number of the pair which is different from the other pairs in the following:",
    options: [
      { key: "1", text: "Hunt and Explore" },
      { key: "2", text: "Pursue and Follow" },
      { key: "3", text: "Investigate and Probe" },
      { key: "4", text: "Search and Secret" },
    ],
    correctOption: "4",
    explanation:
      "Pairs (1), (2), and (3) consist of closely related synonymous action verbs. Choice (4) pairs the verb 'Search' with the unrelated noun/adjective 'Secret'.",
  },
  {
    id: "oir_set75d_q14",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 14,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "rotation", "arrows"],
    promptText:
      "Figures A and B are related. Figure C has the same relation with one of the four choices given. Write the number of the correct choice.",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `<line x1="20" y1="20" x2="70" y2="70" stroke="currentColor" stroke-width="2.2"/>
         <line x1="70" y1="20" x2="20" y2="70" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="20,30 20,20 30,20" fill="none" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="60,20 70,20 70,30" fill="none" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="20,60 20,70 30,70" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
        `<line x1="20" y1="20" x2="70" y2="70" stroke="currentColor" stroke-width="2.2"/>
         <line x1="70" y1="20" x2="20" y2="70" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="20,30 20,20 30,20" fill="none" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="20,60 20,70 30,70" fill="none" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="60,70 70,70 70,60" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
        `<line x1="20" y1="20" x2="70" y2="70" stroke="currentColor" stroke-width="2.2"/>
         <line x1="70" y1="20" x2="20" y2="70" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="20,30 20,20 30,20" fill="none" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="60,20 70,20 70,30" fill="none" stroke="currentColor" stroke-width="2.2"/>
         <polyline points="60,70 70,70 70,60" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Choice 1",
        svgMarkup: svgFramed(
          `<line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" stroke-width="2.2"/>
           <line x1="78" y1="22" x2="22" y2="78" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="67,22 78,22 78,33" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="22,67 22,78 33,78" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="67,78 78,78 78,67" fill="none" stroke="currentColor" stroke-width="2.2"/>`
        ),
      },
      {
        key: "2",
        text: "Choice 2",
        svgMarkup: svgFramed(
          `<line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" stroke-width="2.2"/>
           <line x1="78" y1="22" x2="22" y2="78" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="22,33 22,22 33,22" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="67,22 78,22 78,33" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="22,67 22,78 33,78" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="67,78 78,78 78,67" fill="none" stroke="currentColor" stroke-width="2.2"/>`
        ),
      },
      {
        key: "3",
        text: "Choice 3",
        svgMarkup: svgFramed(
          `<line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" stroke-width="2.2"/>
           <line x1="78" y1="22" x2="22" y2="78" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="22,33 22,22 33,22" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="22,67 22,78 33,78" fill="none" stroke="currentColor" stroke-width="2.2"/>`
        ),
      },
      {
        key: "4",
        text: "Choice 4",
        svgMarkup: svgFramed(
          `<line x1="22" y1="22" x2="78" y2="78" stroke="currentColor" stroke-width="2.2"/>
           <line x1="78" y1="22" x2="22" y2="78" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="22,33 22,22 33,22" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="67,22 78,22 78,33" fill="none" stroke="currentColor" stroke-width="2.2"/>
           <polyline points="22,67 22,78 33,78" fill="none" stroke="currentColor" stroke-width="2.2"/>`
        ),
      },
    ],
    correctOption: "4",
    explanation:
      "Rotating Figure A 90° counter-clockwise produces Figure B (the blank bottom-right arm moves to top-right). Rotating Figure C 90° counter-clockwise moves its blank bottom-left arm to bottom-right, yielding Choice (4).",
  },
  {
    id: "oir_set75d_q15",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 15,
    type: "verbal",
    subType: "number_series",
    difficulty: "easy",
    tags: ["numbers", "series"],
    promptText:
      "Write the next two numbers in the series:\n63,  61,  62,  59,  60,  56,  57,  _____,  _____",
    options: [
      { key: "52,53", text: "52, 53" },
      { key: "53,54", text: "53, 54" },
      { key: "51,52", text: "51, 52" },
      { key: "52,54", text: "52, 54" },
    ],
    correctOption: "52,53",
    explanation:
      "The difference pattern is −2, +1, −3, +1, −4, +1. Continuing with −5 gives 57 − 5 = 52, followed by +1 giving 53.",
  },
  {
    id: "oir_set75d_q16",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 16,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "easy",
    tags: ["series", "symbols"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<circle cx="15" cy="42" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
           <line x1="27" y1="42" x2="39" y2="42" stroke="currentColor" stroke-width="2"/><line x1="33" y1="36" x2="33" y2="48" stroke="currentColor" stroke-width="2"/>
           <circle cx="51" cy="42" r="7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="65" cy="42" r="7" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<circle cx="31" cy="42" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="53" cy="42" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<line x1="23" y1="42" x2="37" y2="42" stroke="currentColor" stroke-width="2.2"/><line x1="30" y1="35" x2="30" y2="49" stroke="currentColor" stroke-width="2.2"/>
           <line x1="47" y1="42" x2="61" y2="42" stroke="currentColor" stroke-width="2.2"/><line x1="54" y1="35" x2="54" y2="49" stroke="currentColor" stroke-width="2.2"/>`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<line x1="22" y1="50" x2="38" y2="50" stroke="currentColor" stroke-width="2.2"/><line x1="30" y1="42" x2="30" y2="58" stroke="currentColor" stroke-width="2.2"/>
           <circle cx="55" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="71" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<circle cx="20" cy="50" r="7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="34" cy="50" r="7" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="64" cy="50" r="7" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="78" cy="50" r="7" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<circle cx="36" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="64" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<line x1="26" y1="50" x2="42" y2="50" stroke="currentColor" stroke-width="2.2"/><line x1="34" y1="42" x2="34" y2="58" stroke="currentColor" stroke-width="2.2"/>
           <line x1="58" y1="50" x2="74" y2="50" stroke="currentColor" stroke-width="2.2"/><line x1="66" y1="42" x2="66" y2="58" stroke="currentColor" stroke-width="2.2"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<circle cx="24" cy="50" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="52" cy="50" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="67" cy="50" r="7.5" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
    ],
    correctOption: "2",
    explanation:
      "The first frame shows three elements: ○, +, and ∞ (paired circles). Subsequent frames double each element in order: ○○, ++, so the fourth frame must show ∞ ∞ (Figure 2).",
  },
  {
    id: "oir_set75d_q17",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 17,
    type: "verbal",
    subType: "letter_series",
    difficulty: "medium",
    tags: ["letters", "series", "multi-select"],
    promptText:
      "Which choices mention the two letters which will come next in the following series in the correct order?\nB  A  O   E  D  O   H  G  O   K  J  O   ___   ___",
    options: [
      { key: "1", text: "O" },
      { key: "2", text: "N" },
      { key: "3", text: "M" },
      { key: "4", text: "L" },
    ],
    selectCount: 2,
    correctOption: "2,3",
    explanation:
      "Each triplet starts with two consecutive letters in reverse order and ends with 'O', advancing by +3 each group: BA(O), ED(O), HG(O), KJ(O) → NM(O). The next two letters are N (2) then M (3).",
  },
  {
    id: "oir_set75d_q18",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 18,
    type: "non_verbal",
    subType: "figure_matrix",
    difficulty: "hard",
    tags: ["matrix", "transformation"],
    promptText: "Write the number of the figure which will complete the design:",
    figures: {
      type: "svg",
      svgMarkup: svgMatrix3x3([
        `<rect x="24" y="24" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"/>`,
        `<path d="M22,42 Q40,56 58,42" fill="none" stroke="currentColor" stroke-width="2"/>`,
        `<path d="M22,22 Q40,30 58,22 Q50,40 58,58 Q40,50 22,58 Q30,40 22,22 Z" fill="none" stroke="currentColor" stroke-width="2"/>`,
        `<line x1="22" y1="40" x2="58" y2="40" stroke="currentColor" stroke-width="2"/><line x1="40" y1="22" x2="40" y2="58" stroke="currentColor" stroke-width="2"/>`,
        `<line x1="26" y1="20" x2="54" y2="60" stroke="currentColor" stroke-width="2"/>`,
        `<line x1="24" y1="20" x2="54" y2="60" stroke="currentColor" stroke-width="2"/><line x1="30" y1="45" x2="46" y2="33" stroke="currentColor" stroke-width="2"/>`,
        `<rect x="20" y="32" width="40" height="16" fill="none" stroke="currentColor" stroke-width="2"/>`,
        `<path d="M26,20 Q36,44 58,60" fill="none" stroke="currentColor" stroke-width="2"/>`,
      ]),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<path d="M20,40 Q50,47 80,40 L80,60 Q50,53 20,60 Z" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<path d="M28,28 Q50,37 72,28 Q63,50 72,72 Q50,63 28,72 Q37,50 28,28 Z" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<polygon points="24,30 78,56 72,70 18,44" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<path d="M28,28 Q50,37 72,28 Q63,50 72,72 Q50,63 28,72 Q37,50 28,28 Z" fill="none" stroke="currentColor" stroke-width="2"/>
           <line x1="28" y1="28" x2="72" y2="72" stroke="currentColor" stroke-width="1.5"/>
           <line x1="72" y1="28" x2="28" y2="72" stroke="currentColor" stroke-width="1.5"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<path d="M18,38 Q50,45 82,38 L82,62 Q50,55 18,62 Z" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "6",
        text: "Figure 6",
        svgMarkup: svgFramed(
          `<path d="M22,28 Q50,45 78,56 L72,70 Q44,58 18,42 Z" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
    ],
    correctOption: "6",
    explanation:
      "The middle column applies an operator to the left shape: Row 1's arc pinches/curves the square's sides inward; Row 2's diagonal line tilts the cross; Row 3 combines both a curve and a diagonal tilt, transforming the horizontal rectangle into the tilted pinched rectangle (Figure 6).",
  },
  {
    id: "oir_set75d_q19",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 19,
    type: "verbal",
    subType: "number_series",
    difficulty: "easy",
    tags: ["numbers", "series", "interleaved"],
    promptText:
      "Write the next two numbers in the series:\n3,  7,  5,  10,  7,  13,  9,  _____,  _____",
    options: [
      { key: "16,11", text: "16, 11" },
      { key: "15,11", text: "15, 11" },
      { key: "16,12", text: "16, 12" },
      { key: "14,11", text: "14, 11" },
    ],
    correctOption: "16,11",
    explanation:
      "Two interleaved series: even positions increase by +3 (7, 10, 13 → 16) and odd positions increase by +2 (3, 5, 7, 9 → 11). Thus the next two numbers are 16 and 11.",
  },
  {
    id: "oir_set75d_q20",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 20,
    type: "non_verbal",
    subType: "figure_matrix",
    difficulty: "medium",
    tags: ["matrix", "counting", "circles"],
    promptText: "Write the number of the figure which will complete the design:",
    figures: {
      type: "svg",
      svgMarkup: svgMatrix3x3([
        `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="40" cy="17" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="20" cy="52" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="60" cy="52" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="29" cy="29" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="51" cy="29" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="29" cy="51" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="51" cy="51" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="49" cy="26" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="17" cy="40" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="63" cy="40" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="17" cy="40" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="17" cy="40" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="54" cy="23" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="54" cy="57" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="40" cy="63" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="22" cy="26" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="58" cy="26" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="18" cy="48" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="62" cy="48" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        `<circle cx="40" cy="40" r="20" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="27" cy="28" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="53" cy="28" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>
         <circle cx="40" cy="56" r="3" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
      ]),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="50" cy="24" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="50" cy="76" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="24" cy="50" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="76" cy="50" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="50" cy="33" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="50" cy="67" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="37" cy="38" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="63" cy="38" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="50" cy="66" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="24" cy="50" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="76" cy="50" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="33" cy="50" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="67" cy="50" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "6",
        text: "Figure 6",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="50" cy="24" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="28" cy="64" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>
           <circle cx="72" cy="64" r="3.5" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
    ],
    correctOption: "4",
    explanation:
      "Treat outer small rings as +1 and inner small rings as −1. Row 1: (+3) + (−4) = −1 (1 inside). Row 2: (+2) + (+1) = +3 (3 outside). Row 3: (+5) + (−3) = +2 (2 outside), which is Figure (4) (note Figure 5 has 2 inside).",
  },
  {
    id: "oir_set75d_q21",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 21,
    type: "verbal",
    subType: "letter_series",
    difficulty: "medium",
    tags: ["letters", "series", "multi-select"],
    promptText:
      "Which choices mention the two letters that will come next in the following series in the correct order?\nA  O  B  O  D  O  G  O  ___  ___",
    options: [
      { key: "1", text: "I" },
      { key: "2", text: "J" },
      { key: "3", text: "O" },
      { key: "4", text: "K" },
    ],
    selectCount: 2,
    correctOption: "4,3",
    explanation:
      "Every alternate letter is 'O'. The odd-position letters advance by +1, +2, +3, +4: A(1), B(2), D(4), G(7) → K(11), followed by O. In order, that is K (4) then O (3).",
  },
  {
    id: "oir_set75d_q22",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 22,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "easy",
    tags: ["pictorial", "sequence", "nature"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<ellipse cx="42" cy="45" rx="18" ry="11" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="40" cy="39" rx="7" ry="3.5" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
          `<path d="M36,70 L38,44 Q20,42 22,26 Q32,12 48,18 Q64,14 64,32 Q62,44 46,44 L48,70 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `<path d="M42,42 C32,20 18,28 30,44 C18,58 34,68 42,50 C50,68 66,58 54,44 C66,28 52,20 42,42 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="42" cy="44" r="5" fill="none" stroke="currentColor" stroke-width="1.5"/>`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1 (Leaf)",
        svgMarkup: svgFramed(
          `<path d="M50,20 C70,35 72,62 50,78 C28,62 30,35 50,20 Z" fill="none" stroke="currentColor" stroke-width="2"/>
           <line x1="50" y1="20" x2="50" y2="86" stroke="currentColor" stroke-width="1.8"/>
           <line x1="50" y1="42" x2="62" y2="34" stroke="currentColor" stroke-width="1.4"/>
           <line x1="50" y1="54" x2="36" y2="46" stroke="currentColor" stroke-width="1.4"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2 (Branch)",
        svgMarkup: svgFramed(
          `<path d="M22,78 L72,28 M46,54 L36,30 M58,42 L74,44" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3 (Grass Plot)",
        svgMarkup: svgFramed(
          `<polygon points="22,62 50,36 78,62 50,82" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="36" y1="58" x2="36" y2="48" stroke="currentColor" stroke-width="1.5"/>
           <line x1="50" y1="66" x2="50" y2="54" stroke="currentColor" stroke-width="1.5"/>
           <line x1="62" y1="56" x2="62" y2="46" stroke="currentColor" stroke-width="1.5"/>
           <line x1="50" y1="50" x2="50" y2="40" stroke="currentColor" stroke-width="1.5"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4 (Well)",
        svgMarkup: svgFramed(
          `<rect x="28" y="48" width="44" height="32" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <ellipse cx="50" cy="48" rx="22" ry="6" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="34" y1="48" x2="34" y2="24" stroke="currentColor" stroke-width="2"/>
           <line x1="66" y1="48" x2="66" y2="24" stroke="currentColor" stroke-width="2"/>
           <line x1="26" y1="24" x2="74" y2="24" stroke="currentColor" stroke-width="2.2"/>
           <circle cx="50" cy="24" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5 (Apple)",
        svgMarkup: svgFramed(
          `<path d="M50,36 C36,30 24,42 28,60 C31,74 42,80 50,76 C58,80 69,74 72,60 C76,42 64,30 50,36 Z" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M50,36 Q52,22 60,20" fill="none" stroke="currentColor" stroke-width="2.2"/>`
        ),
      },
    ],
    correctOption: "5",
    explanation:
      "The developmental plant sequence goes Seed → Tree → Flower → Fruit (Apple), which is Figure (5).",
  },
  {
    id: "oir_set75d_q23",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 23,
    type: "verbal",
    subType: "word_classification",
    difficulty: "easy",
    tags: ["vocabulary", "odd-one-out"],
    promptText:
      "Write the number of the word which does not belong to the same class as the others:",
    options: [
      { key: "1", text: "Dove" },
      { key: "2", text: "Crow" },
      { key: "3", text: "Pigeon" },
      { key: "4", text: "Sparrow" },
      { key: "5", text: "Hawk" },
    ],
    correctOption: "5",
    explanation:
      "Hawk (5) is a bird of prey / raptor, whereas Dove, Crow, Pigeon, and Sparrow are non-raptor perching/grain-eating birds.",
  },
  {
    id: "oir_set75d_q24",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 24,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "medium",
    tags: ["analogy", "hatching", "perpendicular"],
    promptText:
      "Figures A and B are related. Figure C has the same relation with one of the four choices given. Write the number of the correct choice.",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `${hDiag.def}
         <rect x="16" y="16" width="58" height="58" fill="${hDiag.fill}" stroke="currentColor" stroke-width="1.8"/>
         <rect x="33" y="33" width="24" height="24" fill="white" fill-opacity="0.92" stroke="currentColor" stroke-width="1.8"/>`,
        `${hDiag2.def}
         <rect x="33" y="33" width="24" height="24" fill="${hDiag2.fill}" stroke="currentColor" stroke-width="1.8"/>`,
        `${hHoriz.def}
         <rect x="16" y="16" width="58" height="58" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="1.8"/>
         <rect x="33" y="33" width="24" height="24" fill="white" fill-opacity="0.92" stroke="currentColor" stroke-width="1.8"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Choice 1",
        svgMarkup: svgFramed(
          `${hDiag.def}<rect x="34" y="34" width="32" height="32" fill="${hDiag.fill}" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "2",
        text: "Choice 2",
        svgMarkup: svgFramed(
          `${hHoriz.def}<rect x="34" y="34" width="32" height="32" fill="${hHoriz.fill}" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "3",
        text: "Choice 3",
        svgMarkup: svgFramed(
          `${hVert.def}<rect x="34" y="34" width="32" height="32" fill="${hVert.fill}" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "4",
        text: "Choice 4",
        svgMarkup: svgFramed(
          `${hGrid.def}<rect x="34" y="34" width="32" height="32" fill="${hGrid.fill}" stroke="currentColor" stroke-width="2"/>`
        ),
      },
    ],
    correctOption: "3",
    explanation:
      "Figure B retains the small inner square and shades it with hatching perpendicular to A's outer square (45° / becomes 135° \\). Since C's outer square has horizontal hatching, the inner square must receive vertical hatching, giving Choice (3).",
  },
  {
    id: "oir_set75d_q25",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 25,
    type: "verbal",
    subType: "jumbled_sentence_truth",
    difficulty: "easy",
    tags: ["jumbled-sentence", "true-false"],
    promptText:
      "Arrange the words to form a sentence in your mind and then state if the statement is 'True' or 'False':\nmen   run   than   faster   Horses.",
    options: [
      { key: "1", text: "True" },
      { key: "2", text: "False" },
    ],
    correctOption: "1",
    explanation:
      'Rearranging the words gives "Horses run faster than men.", which is a True statement.',
  },
  {
    id: "oir_set75d_q26",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 26,
    type: "non_verbal",
    subType: "figure_matrix",
    difficulty: "medium",
    tags: ["matrix", "union", "grid"],
    promptText: "Write the number of the figure which will complete the design:",
    figures: {
      type: "svg",
      svgMarkup: svgMatrix3x3([
        `<rect x="18" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="40" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M18,40 A22,22 0 0,0 40,18 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M62,40 A22,22 0 0,1 40,18 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="18" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="18" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M40,18 A22,22 0 0,0 62,40 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M40,62 A22,22 0 0,1 62,40 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="18" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="18" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="40" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M40,18 A22,22 0 0,0 62,40 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="40" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="40" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M40,18 A22,22 0 0,1 18,40 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M40,62 A22,22 0 0,0 18,40 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="18" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="40" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M18,40 A22,22 0 0,1 40,62 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M62,40 A22,22 0 0,0 40,62 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="18" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="40" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="40" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M18,40 A22,22 0 0,1 40,62 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="40" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="18" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="40" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M18,40 A22,22 0 0,0 40,18 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="18" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="40" y="18" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="18" y="40" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <path d="M40,62 A22,22 0 0,1 62,40 L40,40 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
      ]),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<rect x="50" y="24" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <rect x="24" y="50" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <path d="M24,50 A26,26 0 0,0 50,24 L50,50 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <path d="M50,76 A26,26 0 0,1 76,50 L50,50 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<path d="M50,24 A26,26 0 0,1 24,50 A26,26 0 0,1 50,76 A26,26 0 0,1 76,50 A26,26 0 0,1 50,24 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.6"/>
           <line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<line x1="24" y1="50" x2="76" y2="50" stroke="currentColor" stroke-width="2.2"/>
           <line x1="50" y1="24" x2="50" y2="76" stroke="currentColor" stroke-width="2.2"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<rect x="24" y="24" width="52" height="52" fill="none" stroke="currentColor" stroke-width="2"/>
           <line x1="50" y1="24" x2="50" y2="76" stroke="currentColor" stroke-width="1.8"/>
           <line x1="24" y1="50" x2="76" y2="50" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<path d="M50,22 A28,28 0 0,1 22,50 A28,28 0 0,1 50,78 A28,28 0 0,1 78,50 A28,28 0 0,1 50,22 Z" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "6",
        text: "Figure 6",
        svgMarkup: svgFramed(
          `<rect x="24" y="24" width="52" height="52" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="50" y1="24" x2="50" y2="76" stroke="currentColor" stroke-width="1.6"/>
           <line x1="24" y1="50" x2="76" y2="50" stroke="currentColor" stroke-width="1.6"/>
           <path d="M50,24 A26,26 0 0,1 24,50 A26,26 0 0,1 50,76 A26,26 0 0,1 76,50 A26,26 0 0,1 50,24 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
    ],
    correctOption: "4",
    explanation:
      "In each row, the 3rd panel is the union of the full square quadrants from Columns 1 and 2: Row 1 {BL,BR} ∪ {TL,BL} = {TL,BL,BR}; Row 2 {TR,BR} ∪ {TL,TR} = {TL,TR,BR}; Row 3 {TR,BL,BR} ∪ {TL,TR,BL} = all 4 quadrants complete, which is the full 2×2 window grid of Figure (4).",
  },
  {
    id: "oir_set75d_q27",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 27,
    type: "verbal",
    subType: "coded_arithmetic",
    difficulty: "easy",
    tags: ["arithmetic", "digit-reversal"],
    promptText:
      "Which choice mentions the answer to the following?\nIf 4 × 3 = 34,   17 × 98 = 8971,   25 × 12 = 2152,\nThen 28 × 35 = _____",
    options: [
      { key: "1", text: "5832" },
      { key: "2", text: "3528" },
      { key: "3", text: "3285" },
      { key: "4", text: "5382" },
    ],
    correctOption: "4",
    explanation:
      'Concatenate the digits of both numbers and reverse the entire digit string: "1798" → "8971", "2512" → "2152". Reversing "2835" produces 5382, which is choice (4).',
  },
  {
    id: "oir_set75d_q28",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 28,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "medium",
    tags: ["series", "chevrons", "arcs"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<rect x="10" y="24" width="64" height="36" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <path d="M12,26 Q28,42 12,58" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="20" y1="42" x2="36" y2="42" stroke="currentColor" stroke-width="1.8"/>
           <path d="M72,26 Q56,42 72,58" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="64" y1="42" x2="48" y2="42" stroke="currentColor" stroke-width="1.8"/>`,
          `<rect x="10" y="24" width="64" height="36" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="10" y1="42" x2="30" y2="42" stroke="currentColor" stroke-width="1.8"/><path d="M40,26 Q24,42 40,58" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="74" y1="42" x2="54" y2="42" stroke="currentColor" stroke-width="1.8"/><path d="M44,26 Q60,42 44,58" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `<rect x="10" y="24" width="64" height="36" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polyline points="12,33 20,42 12,51" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="20" y1="42" x2="34" y2="42" stroke="currentColor" stroke-width="1.8"/>
           <polyline points="72,33 64,42 72,51" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="64" y1="42" x2="50" y2="42" stroke="currentColor" stroke-width="1.8"/>`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<rect x="14" y="30" width="72" height="40" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="26" y1="50" x2="38" y2="50" stroke="currentColor" stroke-width="1.8"/><polyline points="46,42 38,50 46,58" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polyline points="54,42 62,50 54,58" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="62" y1="50" x2="74" y2="50" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<rect x="14" y="30" width="72" height="40" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="18" y1="50" x2="32" y2="50" stroke="currentColor" stroke-width="1.8"/><polyline points="40,42 32,50 40,58" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polyline points="48,42 56,50 48,58" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="56" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<rect x="14" y="30" width="72" height="40" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="18" y1="50" x2="44" y2="50" stroke="currentColor" stroke-width="1.8"/><polyline points="36,42 44,50 36,58" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polyline points="64,42 56,50 64,58" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="56" y1="50" x2="82" y2="50" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<rect x="14" y="30" width="72" height="40" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="14" y1="50" x2="38" y2="50" stroke="currentColor" stroke-width="1.8"/><polyline points="46,42 38,50 46,58" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polyline points="54,42 62,50 54,58" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="62" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<rect x="14" y="30" width="72" height="40" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <path d="M16,32 Q36,50 16,68" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="26" y1="50" x2="44" y2="50" stroke="currentColor" stroke-width="1.8"/>
           <path d="M84,32 Q64,50 84,68" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="74" y1="50" x2="56" y2="50" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
    ],
    correctOption: "3",
    explanation:
      "In Panels 1 → 2, the outer arcs and horizontal stems relocate their ends between the wall and the center. Moving the chevron stems of Panel 3 from the center out to the vertical walls gives → ← facing inward at the center (Figure 3), matching DIPR Master Key Col D.",
  },
  {
    id: "oir_set75d_q29",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 29,
    type: "verbal",
    subType: "word_analogy_pair",
    difficulty: "easy",
    tags: ["analogy", "anatomy", "multi-select"],
    promptText:
      "Write the numbers of the two choices which have the same relationship as 'Foot and Man':",
    options: [
      { key: "1", text: "Shoe" },
      { key: "2", text: "Hoof" },
      { key: "3", text: "Leg" },
      { key: "4", text: "Cow" },
    ],
    selectCount: 2,
    correctOption: "2,4",
    explanation:
      "A Foot is the lower extremity/part of a Man, just as a Hoof (2) is the lower extremity/part of a Cow (4).",
  },
  {
    id: "oir_set75d_q30",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 30,
    type: "non_verbal",
    subType: "figure_analogy",
    difficulty: "easy",
    tags: ["analogy", "nested-shapes"],
    promptText:
      "Figures A and B are related. Figure C has the same relation with one of the four choices given. Write the number of the correct choice.",
    figures: {
      type: "svg",
      svgMarkup: svgAnalogy(
        `<rect x="16" y="18" width="58" height="54" fill="none" stroke="currentColor" stroke-width="2"/>
         <polygon points="45,27 25,62 65,62" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <circle cx="45" cy="51" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        `<circle cx="45" cy="45" r="30" fill="none" stroke="currentColor" stroke-width="2"/>
         <polygon points="45,23 23,60 67,60" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="38" y="42" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        `<polygon points="45,15 14,72 76,72" fill="none" stroke="currentColor" stroke-width="2"/>
         <circle cx="45" cy="52" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/>
         <rect x="38" y="45" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        90
      ),
    },
    options: [
      {
        key: "1",
        text: "Choice 1",
        svgMarkup: svgFramed(
          `<rect x="18" y="18" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="50" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polygon points="50,35 35,61 65,61" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "2",
        text: "Choice 2",
        svgMarkup: svgFramed(
          `<polygon points="50,16 18,78 82,78" fill="none" stroke="currentColor" stroke-width="2"/>
           <rect x="35" y="46" width="30" height="24" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="50" cy="58" r="8" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "3",
        text: "Choice 3",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="32" fill="none" stroke="currentColor" stroke-width="2"/>
           <rect x="29" y="29" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polygon points="50,37 36,62 64,62" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
      {
        key: "4",
        text: "Choice 4",
        svgMarkup: svgFramed(
          `<rect x="18" y="20" width="64" height="60" fill="none" stroke="currentColor" stroke-width="2"/>
           <polygon points="50,27 26,71 74,71" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <rect x="42" y="51" width="16" height="15" fill="none" stroke="currentColor" stroke-width="1.6"/>`
        ),
      },
    ],
    correctOption: "1",
    explanation:
      "Between A and B, the outermost and innermost shapes swap places while the middle shape stays unchanged (Square(Triangle(Circle)) → Circle(Triangle(Square))). Applying this to C (Triangle(Circle(Square))) gives Square(Circle(Triangle)), which is Choice (1).",
  },
  {
    id: "oir_set75d_q31",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 31,
    type: "verbal",
    subType: "word_classification",
    difficulty: "easy",
    tags: ["vocabulary", "odd-one-out"],
    promptText:
      "Write the number of the word which does not belong to the same class as the others:",
    options: [
      { key: "1", text: "Work" },
      { key: "2", text: "Labour" },
      { key: "3", text: "Rest" },
      { key: "4", text: "Task" },
      { key: "5", text: "Toil" },
    ],
    correctOption: "3",
    explanation:
      "Work, Labour, Task, and Toil all denote exertion/effort, whereas Rest (3) is its antonym.",
  },
  {
    id: "oir_set75d_q32",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 32,
    type: "non_verbal",
    subType: "figure_matrix",
    difficulty: "medium",
    tags: ["matrix", "latin-square", "superposition"],
    promptText: "Write the number of the figure which will complete the design:",
    figures: {
      type: "svg",
      svgMarkup: svgMatrix3x3([
        `<circle cx="40" cy="40" r="21" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="33" y="33" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        `<rect x="21" y="21" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="40" y1="30" x2="40" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="30" y1="40" x2="50" y2="40" stroke="currentColor" stroke-width="1.8"/>`,
        `<line x1="20" y1="20" x2="60" y2="60" stroke="currentColor" stroke-width="1.8"/><line x1="60" y1="20" x2="20" y2="60" stroke="currentColor" stroke-width="1.8"/><circle cx="40" cy="40" r="14" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        `<circle cx="40" cy="40" r="21" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="40" y1="30" x2="40" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="30" y1="40" x2="50" y2="40" stroke="currentColor" stroke-width="1.8"/>`,
        `<rect x="21" y="21" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="40" cy="40" r="12" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        `<line x1="20" y1="20" x2="60" y2="60" stroke="currentColor" stroke-width="1.8"/><line x1="60" y1="20" x2="20" y2="60" stroke="currentColor" stroke-width="1.8"/><rect x="31" y="31" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        `<circle cx="40" cy="40" r="21" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="40" cy="40" r="11" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        `<rect x="21" y="21" width="38" height="38" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="31" y="31" width="18" height="18" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
      ]),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
           <line x1="50" y1="36" x2="50" y2="64" stroke="currentColor" stroke-width="2"/><line x1="36" y1="50" x2="64" y2="50" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<line x1="24" y1="24" x2="76" y2="76" stroke="currentColor" stroke-width="2"/><line x1="76" y1="24" x2="24" y2="76" stroke="currentColor" stroke-width="2"/>
           <line x1="50" y1="32" x2="50" y2="68" stroke="currentColor" stroke-width="2"/><line x1="32" y1="50" x2="68" y2="50" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<line x1="24" y1="24" x2="76" y2="76" stroke="currentColor" stroke-width="2"/><line x1="76" y1="24" x2="24" y2="76" stroke="currentColor" stroke-width="2"/>
           <circle cx="50" cy="50" r="17" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<line x1="24" y1="24" x2="76" y2="76" stroke="currentColor" stroke-width="2"/><line x1="76" y1="24" x2="24" y2="76" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<rect x="25" y="25" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/>
           <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "6",
        text: "Figure 6",
        svgMarkup: svgFramed(
          `<line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/>
           <rect x="37" y="37" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
    ],
    correctOption: "2",
    explanation:
      "Double Latin Square: Column outer elements are Circle (Col 1), Square (Col 2), Diagonal Cross × (Col 3). Inner elements in every row and column cycle through {small square, small +, small circle}. Row 3 already has inner circle and square, so Col 3 combines outer × with inner +, giving Figure (2).",
  },
  {
    id: "oir_set75d_q33",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 33,
    type: "verbal",
    subType: "direction_sense",
    difficulty: "easy",
    tags: ["direction", "distance"],
    promptText:
      "I drove West for two kilometers, then I turned to my right and drove North for half-a-Kilometer, then I turned to my right again and drove two Kilometers further. Which choice mentions the distance from the starting point to the place where I stopped?",
    options: [
      { key: "1", text: "1/2 Kilometer" },
      { key: "2", text: "1 Kilometer" },
      { key: "3", text: "2 Kilometers" },
      { key: "4", text: "3 Kilometers" },
    ],
    correctOption: "1",
    explanation:
      "Driving 2 km West, turning North for 0.5 km, and then driving 2 km East cancels the horizontal displacement, leaving you 0.5 km (1/2 Kilometer) due North of the starting point.",
  },
  {
    id: "oir_set75d_q34",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 34,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "medium",
    tags: ["pictorial", "clothing", "pairs"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<path d="M22,22 L34,18 L42,32 L50,18 L62,22 L68,54 L57,56 L55,34 L55,66 L29,66 L29,34 L27,56 L16,54 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="42" y1="32" x2="42" y2="66" stroke="currentColor" stroke-width="1.6"/>`,
          `<rect x="26" y="22" width="32" height="44" fill="none" stroke="currentColor" stroke-width="1.8"/><polyline points="32,22 42,32 52,22" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="42" y1="32" x2="42" y2="66" stroke="currentColor" stroke-width="1.6"/><rect x="46" y="42" width="8" height="10" fill="none" stroke="currentColor" stroke-width="1.4"/>`,
          `<path d="M16,54 L28,54 L36,44 L50,52 L66,54 L66,64 L16,64 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M22,42 L34,42 L42,33 L54,40 L68,42 L68,50 L22,50 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1 (Hat)",
        svgMarkup: svgFramed(
          `<ellipse cx="50" cy="58" rx="30" ry="18" fill="none" stroke="currentColor" stroke-width="2"/>
           <ellipse cx="50" cy="48" rx="16" ry="14" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2 (Sock)",
        svgMarkup: svgFramed(
          `<path d="M48,22 L62,22 L62,62 Q62,76 46,76 L28,76 Q20,76 22,68 Q26,60 40,60 L48,54 Z" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3 (Belt)",
        svgMarkup: svgFramed(
          `<ellipse cx="50" cy="52" rx="26" ry="14" fill="none" stroke="currentColor" stroke-width="2"/>
           <rect x="44" y="59" width="12" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4 (Trousers)",
        svgMarkup: svgFramed(
          `<polygon points="56,22 72,34 44,78 28,68 48,40 34,34 44,22" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5 (Coat)",
        svgMarkup: svgFramed(
          `<path d="M30,24 L42,20 L50,34 L58,20 L70,24 L74,60 L64,62 L62,38 L62,76 L38,76 L38,38 L36,62 L26,60 Z" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
    ],
    correctOption: "2",
    explanation:
      "The first pair goes from outer upper wear (Coat) to inner upper wear (Shirt). Completing the footwear pair from outer Shoes goes to inner Socks, which is Figure (2).",
  },
  {
    id: "oir_set75d_q35",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 35,
    type: "verbal",
    subType: "jumbled_word",
    difficulty: "easy",
    tags: ["anagram", "india", "spelling"],
    promptText:
      "Write the last letter of the arranged word.\nA  B  G  E  L  N  was a state of India.",
    options: [
      { key: "L", text: "L" },
      { key: "N", text: "N" },
      { key: "G", text: "G" },
      { key: "A", text: "A" },
    ],
    correctOption: "L",
    explanation: "Rearranging A B G E L N gives BENGAL, whose last letter is L.",
  },
  {
    id: "oir_set75d_q36",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 36,
    type: "non_verbal",
    subType: "figure_classification",
    difficulty: "medium",
    tags: ["arches", "pattern", "odd-one-out"],
    promptText:
      "Write the number of the figure which does not belong to the same class as the others.",
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<path d="M16,52 L16,38 A6,6 0 0,1 28,38 L28,52" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M35,48 L35,62 A6,6 0 0,0 47,62 L47,48" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M53,52 L53,38 A6,6 0 0,1 65,38 L65,52" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M72,48 L72,62 A6,6 0 0,0 84,62 L84,48" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<path d="M16,56 L16,42 A6,6 0 0,1 28,42 L28,56" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M35,56 L35,42 A6,6 0 0,1 47,42 L47,56" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M53,56 L53,42 A6,6 0 0,1 65,42 L65,56" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M72,56 L72,42 A6,6 0 0,1 84,42 L84,56" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<path d="M16,44 L16,58 A6,6 0 0,0 28,58 L28,44" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M35,44 L35,58 A6,6 0 0,0 47,58 L47,44" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M53,44 L53,58 A6,6 0 0,0 65,58 L65,44" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M72,44 L72,58 A6,6 0 0,0 84,58 L84,44" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<path d="M16,52 L16,38 A6,6 0 0,1 28,38 L28,52" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M35,52 L35,38 A6,6 0 0,1 47,38 L47,52" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M53,48 L53,62 A6,6 0 0,0 65,62 L65,48" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M72,48 L72,62 A6,6 0 0,0 84,62 L84,48" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<path d="M16,48 L16,62 A6,6 0 0,0 28,62 L28,48" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M35,52 L35,38 A6,6 0 0,1 47,38 L47,52" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M53,48 L53,62 A6,6 0 0,0 65,62 L65,48" fill="none" stroke="currentColor" stroke-width="2"/>
           <path d="M72,52 L72,38 A6,6 0 0,1 84,38 L84,52" fill="none" stroke="currentColor" stroke-width="2"/>`
        ),
      },
    ],
    correctOption: "4",
    explanation:
      "Figures (2) and (3) keep all four arches uniform (all ∩ or all ∪), while (1) and (5) strictly alternate every element (∩∪∩∪ and ∪∩∪∩). Only Figure (4) splits into two uniform halves (∩∩ followed by ∪∪).",
  },
  {
    id: "oir_set75d_q37",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 37,
    type: "verbal",
    subType: "coded_arithmetic",
    difficulty: "easy",
    tags: ["arithmetic", "squares"],
    promptText:
      "Which choice mentions the correct answer to the following?\nIf 3 × 2 = 94,   4 × 1 = 161,   4 × 5 = 1625,   9 × 8 = 8164,   7 × 6 = 4936,\nThen 2 × 2 = _____",
    options: [
      { key: "1", text: "4884" },
      { key: "2", text: "11" },
      { key: "3", text: "44" },
      { key: "4", text: "486" },
    ],
    correctOption: "3",
    explanation:
      "A × B is formed by concatenating A² followed by B²: 3²=9, 2²=4 → 94; 4²=16, 5²=25 → 1625. Hence 2 × 2 gives 2² and 2² concatenated = 44, which is choice (3).",
  },
  {
    id: "oir_set75d_q38",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 38,
    type: "non_verbal",
    subType: "figure_matrix",
    difficulty: "medium",
    tags: ["matrix", "decomposition", "hatching"],
    promptText: "Write the number of the figure which will complete the design:",
    figures: {
      type: "svg",
      svgMarkup: svgMatrix3x3([
        tileGrid(2, 2, ["dark", "horiz", "vert", "empty"], 80, 22),
        tileGrid(1, 2, ["dark", "vert"], 80, 22),
        tileGrid(1, 2, ["horiz", "empty"], 80, 22),
        tileGrid(2, 1, ["dark", "horiz"], 80, 22),
        tileGrid(1, 1, ["dark"], 80, 22),
        tileGrid(1, 1, ["horiz"], 80, 22),
        tileGrid(2, 1, ["vert", "empty"], 80, 22),
        tileGrid(1, 1, ["vert"], 80, 22),
      ]),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(tileGrid(1, 1, ["horiz"], 100, 26)),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(tileGrid(1, 1, ["empty"], 100, 26)),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(tileGrid(2, 2, ["empty", "vert", "horiz", "dark"], 100, 22)),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(tileGrid(1, 2, ["vert", "vert"], 100, 22)),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(tileGrid(1, 1, ["dark"], 100, 26)),
      },
      {
        key: "6",
        text: "Figure 6",
        svgMarkup: svgFramed(tileGrid(2, 2, [null, "vert", "horiz", "grid"], 100, 22)),
      },
    ],
    correctOption: "2",
    explanation:
      "Column 1 splits horizontally into Column 2 (left half) and Column 3 (right half). In Row 3, the left half is vertically hatched (Col 2) and the right half is an empty square, leaving Figure (2) to complete the design.",
  },
  {
    id: "oir_set75d_q39",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 39,
    type: "verbal",
    subType: "conditional_instruction",
    difficulty: "easy",
    tags: ["logic", "following-instructions"],
    promptText:
      "If 5 is less than 8 write 7, unless 5 and 4 make 12, in that case write 9 on your answer sheet.",
    options: [
      { key: "7", text: "7" },
      { key: "9", text: "9" },
      { key: "5", text: "5" },
      { key: "12", text: "12" },
    ],
    correctOption: "7",
    explanation:
      "5 is less than 8 (true), and the exception '5 + 4 = 12' is false (5 + 4 = 9). Therefore write 7.",
  },
  {
    id: "oir_set75d_q40",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 40,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "easy",
    tags: ["series", "symbols", "alternation"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<circle cx="12" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <rect x="21" y="37" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="40" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="51" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="60" y1="42" x2="72" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="66" y1="36" x2="66" y2="48" stroke="currentColor" stroke-width="1.8"/>`,
          `<rect x="10" y="37" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="30" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="40" y1="42" x2="50" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="45" y1="37" x2="45" y2="47" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="59" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="70" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `<circle cx="12" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <rect x="21" y="37" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="40" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="51" cy="42" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="60" y1="42" x2="72" y2="42" stroke="currentColor" stroke-width="1.8"/><line x1="66" y1="36" x2="66" y2="48" stroke="currentColor" stroke-width="1.8"/>`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<line x1="12" y1="50" x2="22" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="17" y1="45" x2="17" y2="55" stroke="currentColor" stroke-width="1.8"/>
           <rect x="27" y="45" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="46" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="57" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="68" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="73" y1="45" x2="73" y2="55" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<rect x="14" y="45" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="34" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="44" y1="50" x2="54" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="49" y1="45" x2="49" y2="55" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="65" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="77" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<circle cx="16" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <rect x="26" y="45" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="45" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="57" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="68" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="73" y1="45" x2="73" y2="55" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<circle cx="16" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="28" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="39" y1="50" x2="49" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="44" y1="45" x2="44" y2="55" stroke="currentColor" stroke-width="1.8"/>
           <rect x="55" y="45" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="76" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<circle cx="16" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="27" y1="50" x2="37" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="32" y1="45" x2="32" y2="55" stroke="currentColor" stroke-width="1.8"/>
           <circle cx="48" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="60" cy="50" r="5" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <rect x="70" y="45" width="10" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
    ],
    correctOption: "2",
    explanation:
      "The third frame repeats the first frame exactly, so the series alternates between Frame 1 and Frame 2. Frame 4 repeats Frame 2 (□ ○ + ∞), which is Figure (2).",
  },
  {
    id: "oir_set75d_q41",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 41,
    type: "verbal",
    subType: "word_analogy",
    difficulty: "easy",
    tags: ["vocabulary", "antonyms", "analogy"],
    promptText: "THIS is to THAT as NEAR is to _____",
    options: [
      { key: "1", text: "THOSE" },
      { key: "2", text: "THESE" },
      { key: "3", text: "FAR" },
      { key: "4", text: "CLEAR" },
      { key: "5", text: "CLOSE" },
    ],
    correctOption: "3",
    explanation:
      "THIS (proximal) contrasts with THAT (distal) in the same way NEAR contrasts with FAR (3).",
  },
  {
    id: "oir_set75d_q46",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 46,
    type: "non_verbal",
    subType: "figure_matrix",
    difficulty: "medium",
    tags: ["matrix", "symmetry", "hatching"],
    promptText: "Write the number of the figure which will complete the design:",
    figures: {
      type: "svg",
      svgMarkup: svgMatrix3x3([
        tileGrid(2, 1, ["empty", "vert"], 80, 18),
        tileGrid(1, 1, ["empty"], 80, 18),
        tileGrid(3, 1, ["empty", "vert", "empty"], 80, 16),
        tileGrid(2, 1, ["horiz", "dark"], 80, 16),
        tileGrid(1, 1, ["horiz"], 80, 16),
        tileGrid(3, 1, ["horiz", "dark", "horiz"], 80, 16),
        tileGrid(2, 2, ["empty", "vert", "horiz", "dark"], 80, 18),
        tileGrid(1, 2, ["empty", "horiz"], 80, 18),
      ]),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          tileGrid(3, 2, [null, "vert", null, "horiz", "dark", "horiz"], 100, 18)
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(tileGrid(3, 1, ["horiz", "dark", "horiz"], 100, 18)),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(tileGrid(2, 2, ["empty", "vert", "horiz", "dark"], 100, 18)),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(tileGrid(1, 2, ["vert", "dark"], 100, 20)),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          tileGrid(
            3,
            3,
            [null, "vert", null, "horiz", "dark", "horiz", null, "vert", null],
            100,
            16
          )
        ),
      },
      {
        key: "6",
        text: "Figure 6",
        svgMarkup: svgFramed(
          tileGrid(3, 2, ["empty", "vert", "empty", "horiz", "dark", "horiz"], 100, 18)
        ),
      },
    ],
    correctOption: "6",
    explanation:
      "In every row, Column 2 appends its strip to the right edge of Column 1 to symmetrically balance Column 1's left half. In Row 3, appending [Empty; Horiz] creates the symmetrical 3×2 block [Empty | Vert | Empty ; Horiz | Dark | Horiz], which is Figure (6).",
  },
  {
    id: "oir_set75d_q47",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 47,
    type: "verbal",
    subType: "coding_decoding",
    difficulty: "easy",
    tags: ["coding", "caesar-shift"],
    promptText: 'If UGDC means "WIFE", QFMPR means _____',
    options: [
      { key: "1", text: "SHORT" },
      { key: "2", text: "SHARP" },
      { key: "3", text: "QUICK" },
      { key: "4", text: "SHORE" },
      { key: "5", text: "RIVAL" },
    ],
    correctOption: "1",
    explanation:
      "Every letter shifts forward by +2: U→W, G→I, D→F, C→E. Shifting QFMPR by +2 yields S-H-O-R-T = SHORT, which is choice (1).",
  },
  {
    id: "oir_set75d_q48",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 48,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "easy",
    tags: ["series", "shapes"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<circle cx="42" cy="42" r="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="42" y1="20" x2="42" y2="64" stroke="currentColor" stroke-width="1.6"/>
           <line x1="20" y1="42" x2="64" y2="42" stroke="currentColor" stroke-width="1.6"/>
           <polygon points="42,36 48,42 42,48 36,42" fill="currentColor"/>`,
          `<circle cx="42" cy="42" r="22" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="42" y1="20" x2="42" y2="64" stroke="currentColor" stroke-width="1.6"/>
           <line x1="20" y1="42" x2="64" y2="42" stroke="currentColor" stroke-width="1.6"/>`,
          `<line x1="22" y1="22" x2="62" y2="62" stroke="currentColor" stroke-width="1.8"/>
           <line x1="62" y1="22" x2="22" y2="62" stroke="currentColor" stroke-width="1.8"/>
           <rect x="38" y="38" width="8" height="8" fill="currentColor"/>`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="31" y1="31" x2="69" y2="69" stroke="currentColor" stroke-width="1.8"/><line x1="69" y1="31" x2="31" y2="69" stroke="currentColor" stroke-width="1.8"/>
           <rect x="45" y="45" width="10" height="10" fill="currentColor"/>`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<rect x="24" y="24" width="52" height="52" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="24" y1="24" x2="76" y2="76" stroke="currentColor" stroke-width="1.8"/><line x1="76" y1="24" x2="24" y2="76" stroke="currentColor" stroke-width="1.8"/>
           <rect x="45" y="45" width="10" height="10" fill="currentColor"/>`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<line x1="24" y1="24" x2="76" y2="76" stroke="currentColor" stroke-width="1.8"/>
           <line x1="76" y1="24" x2="24" y2="76" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="31" y1="31" x2="69" y2="69" stroke="currentColor" stroke-width="1.8"/><line x1="69" y1="31" x2="31" y2="69" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<rect x="24" y="24" width="52" height="52" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <line x1="24" y1="24" x2="76" y2="76" stroke="currentColor" stroke-width="1.8"/><line x1="76" y1="24" x2="24" y2="76" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
    ],
    correctOption: "3",
    explanation:
      "Frame 2 drops the solid central diamond from Frame 1 while keeping the rest unchanged. Applying the same rule to Frame 3 drops its central solid square, leaving the plain × of Figure (3).",
  },
  {
    id: "oir_set75d_q49",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 49,
    type: "verbal",
    subType: "jumbled_word",
    difficulty: "easy",
    tags: ["anagram", "spelling"],
    promptText:
      "Write the last letter of the arranged word.\nC  I  P  L  N  E  is an item of stationery.",
    options: [
      { key: "L", text: "L" },
      { key: "E", text: "E" },
      { key: "N", text: "N" },
      { key: "I", text: "I" },
    ],
    correctOption: "L",
    explanation: "Unscrambling C I P L N E gives PENCIL, whose last letter is L.",
  },
  {
    id: "oir_set75d_q50",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_75d",
    sourceBookletName: "DIPR Booklet 75D / 71 (Test D)",
    questionNumber: 50,
    type: "non_verbal",
    subType: "figure_series",
    difficulty: "medium",
    tags: ["series", "patterns", "3d-rotation"],
    promptText: "Write the number of the figure which will come next in the series:",
    figures: {
      type: "svg",
      svgMarkup: svgSeries(
        [
          `<rect x="8" y="34" width="68" height="7" fill="none" stroke="currentColor" stroke-width="1.7"/>
           ${[16, 29, 42, 55, 68].map((x) => `<path d="M${x - 4},41 L${x - 4},48 A4,4 0 0,0 ${x + 4},48 L${x + 4},41" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")}`,
          `<rect x="8" y="34" width="68" height="7" fill="none" stroke="currentColor" stroke-width="1.7"/>
           ${[16, 29, 42, 55, 68].map((x) => `<path d="M${x - 4},41 L${x - 4},48 A4,4 0 0,0 ${x + 4},48 L${x + 4},41" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>`).join("")}`,
          `<rect x="8" y="38" width="68" height="9" fill="none" stroke="currentColor" stroke-width="1.7"/>
           ${[16, 29, 42, 55, 68].map((x) => `<circle cx="${x}" cy="42.5" r="2.6" fill="none" stroke="currentColor" stroke-width="1.5"/>`).join("")}`,
        ],
        84
      ),
    },
    options: [
      {
        key: "1",
        text: "Figure 1",
        svgMarkup: svgFramed(
          `<rect x="12" y="50" width="76" height="8" fill="none" stroke="currentColor" stroke-width="1.8"/>
           ${[21, 35, 50, 65, 79].map((x) => `<path d="M${x - 4},50 L${x - 4},42 A4,4 0 0,1 ${x + 4},42 L${x + 4},50" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")}`
        ),
      },
      {
        key: "2",
        text: "Figure 2",
        svgMarkup: svgFramed(
          `<rect x="12" y="45" width="76" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           ${[21, 35, 50, 65, 79].map((x, idx) => `<circle cx="${x}" cy="50" r="3" fill="${idx % 2 === 1 ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.6"/>`).join("")}`
        ),
      },
      {
        key: "3",
        text: "Figure 3",
        svgMarkup: svgFramed(
          `<rect x="12" y="45" width="76" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>
           ${[21, 35, 50, 65, 79].map((x) => `<circle cx="${x}" cy="50" r="3" fill="currentColor" stroke="currentColor" stroke-width="1.6"/>`).join("")}`
        ),
      },
      {
        key: "4",
        text: "Figure 4",
        svgMarkup: svgFramed(
          `<rect x="12" y="42" width="76" height="8" fill="none" stroke="currentColor" stroke-width="1.8"/>
           ${[21, 35, 50, 65, 79].map((x) => `<path d="M${x - 4},50 L${x - 4},58 A4,4 0 0,0 ${x + 4},58 L${x + 4},50" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")}`
        ),
      },
      {
        key: "5",
        text: "Figure 5",
        svgMarkup: svgFramed(
          `<rect x="12" y="45" width="76" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
    ],
    correctOption: "3",
    explanation:
      "The first pair keeps the same bar orientation (5 downward pegs) and transitions from hollow to solid pegs. The second pair keeps the front-facing bar (5 small circles inside the bar) and transitions from hollow circles in Panel 3 to 5 solid circles in Figure (3).",
  },
];

export const BOOKLET_75D: OIRBooklet = {
  id: "booklet_75d",
  source: "Authentic DIPR",
  bookletNumber: "DIPR-75D",
  title: "DIPR Booklet 75D / 71 (Test D — Authentic)",
  category: "mixed",
  totalQuestions: 46,
  durationMinutes: 20,
  markingScheme: { correct: 1.0, incorrect: 0.0 },
  boardLocations: ["NSB Vizag", "NSB Kolkata"],
  description:
    "Authentic DIPR Booklet 75D / 71 (NSB Vizag / Kolkata, Test D) — 46 complete verified questions (Q1–41, Q46–50; original source pages for Q42–45 are absent across all scanned copies).",
  questions: BOOKLET_75D_QUESTIONS,
};
