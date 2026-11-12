import { OIRBooklet } from "../types";
import {
  svgAnalogy,
  svgCanvas,
  svgClassAB,
  svgFramed,
  svgSeries,
} from "../svgHelpers";

const S = (inner: string) => `svg:${inner}`;

// Isometric cube-face glyphs for Q3 & Q4
const gStar4 = S(
  `<polygon points="0,-9 2.4,-2.4 9,0 2.4,2.4 0,9 -2.4,2.4 -9,0 -2.4,-2.4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`
);
const gStar6 = S(
  `<polygon points="0,-9 2.6,-3.5 8.5,-4.5 4.2,0 8.5,4.5 2.6,3.5 0,9 -2.6,3.5 -8.5,4.5 -4.2,0 -8.5,-4.5 -2.6,-3.5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>`
);
const gDiagHalfBR = S(
  `<rect x="-11" y="-11" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/><polygon points="-11,11 11,-11 11,11" fill="currentColor"/>`
);
const gHeart = S(
  `<path d="M0 8.5C-8.5 3-10-4-5.5-7.5C-2.5-9.5 0-6 0-4C0-6 2.5-9.5 5.5-7.5C10-4 8.5 3 0 8.5Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`
);
const gPentagon = S(
  `<polygon points="0,-8.5 8.5,-2 5.2,8 -5.2,8 -8.5,-2" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`
);
const gHalfTop = S(
  `<rect x="-10" y="-10" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/><rect x="-10" y="-10" width="20" height="10" fill="currentColor"/>`
);
const gHalfRight = S(
  `<rect x="-10" y="-10" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1" opacity="0.3"/><rect x="0" y="-10" width="10" height="20" fill="currentColor"/>`
);
const gArcUp = S(
  `<path d="M-7,3 Q0,-5 7,3" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`
);
const gArcRight = S(
  `<path d="M-3,-7 Q5,0 -3,7" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`
);
const gDot = S(`<circle cx="0" cy="0" r="4.8" fill="currentColor"/>`);
const gOval = S(
  `<ellipse cx="0" cy="0" rx="7.5" ry="4.8" fill="none" stroke="currentColor" stroke-width="2"/>`
);

// Helper for 6 vertical arrows (Q5) in 84x84 or 100x100 box
function arrows6(dirs: Array<"U" | "D">, box = 84): string {
  const padX = box === 84 ? 10 : 12;
  const span = box - padX * 2;
  const step = span / 5;
  const topY = box * 0.2;
  const botY = box * 0.8;
  return dirs
    .map((d, i) => {
      const x = padX + i * step;
      if (d === "U") {
        return `<line x1="${x}" y1="${botY}" x2="${x}" y2="${topY}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M${x - 4},${topY + 6} L${x},${topY} L${x + 4},${topY + 6}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
      }
      return `<line x1="${x}" y1="${topY}" x2="${x}" y2="${botY}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/><path d="M${x - 4},${botY - 6} L${x},${botY} L${x + 4},${botY - 6}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`;
    })
    .join("");
}

// Helper for Q8 5-pointed star half-shaded at angle (deg)
let q8Uid = 0;
function halfStar(
  side: "topRight" | "botLeft" | "botRight" | "topLeft" | "right" | "topLeftSteep" | "left" | "top",
  cx: number,
  cy: number,
  R = 26
): string {
  q8Uid += 1;
  const cid = `q8c_${q8Uid}`;
  const r = R * 0.382;
  const pts: string[] = [];
  for (let i = 0; i < 10; i++) {
    const ang = ((-90 + i * 36) * Math.PI) / 180;
    const rad = i % 2 === 0 ? R : r;
    pts.push(`${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`);
  }
  const poly = pts.join(" ");
  let clipRect = "";
  if (side === "topRight") {
    clipRect = `<rect x="${cx - 60}" y="${cy - 60}" width="120" height="60" transform="rotate(18 ${cx} ${cy})"/>`;
  } else if (side === "botLeft") {
    clipRect = `<rect x="${cx - 60}" y="${cy}" width="120" height="60" transform="rotate(18 ${cx} ${cy})"/>`;
  } else if (side === "botRight") {
    clipRect = `<rect x="${cx - 60}" y="${cy}" width="120" height="60" transform="rotate(-18 ${cx} ${cy})"/>`;
  } else if (side === "topLeft") {
    clipRect = `<rect x="${cx - 60}" y="${cy - 60}" width="120" height="60" transform="rotate(-18 ${cx} ${cy})"/>`;
  } else if (side === "right") {
    clipRect = `<rect x="${cx}" y="${cy - 60}" width="60" height="120"/>`;
  } else if (side === "left") {
    clipRect = `<rect x="${cx - 60}" y="${cy - 60}" width="60" height="120"/>`;
  } else if (side === "topLeftSteep") {
    clipRect = `<rect x="${cx - 60}" y="${cy - 60}" width="120" height="60" transform="rotate(-54 ${cx} ${cy})"/>`;
  } else {
    clipRect = `<rect x="${cx - 60}" y="${cy - 60}" width="120" height="60" transform="rotate(54 ${cx} ${cy})"/>`;
  }
  return `<defs><clipPath id="${cid}">${clipRect}</clipPath></defs><polygon points="${poly}" fill="currentColor" clip-path="url(#${cid})"/><polygon points="${poly}" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`;
}

// Helper for Q14 cross with 4 boxed letters [top, right, bottom, left]
function crossLetters(t: string, r: string, b: string, l: string, size = 84): string {
  const c = size / 2;
  const off = size * 0.29;
  const bw = 18;
  const half = bw / 2;
  const box = (x: number, y: number, ch: string) =>
    `<rect x="${x - half}" y="${y - half}" width="${bw}" height="${bw}" rx="2" fill="none" stroke="currentColor" stroke-width="1.6"/><text x="${x}" y="${y + 4.5}" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${ch}</text>`;
  return `<line x1="${c}" y1="${c - off + half}" x2="${c}" y2="${c + off - half}" stroke="currentColor" stroke-width="1.6"/><line x1="${c - off + half}" y1="${c}" x2="${c + off - half}" y2="${c}" stroke="currentColor" stroke-width="1.6"/>${box(c, c - off, t)}${box(c + off, c, r)}${box(c, c + off, b)}${box(c - off, c, l)}`;
}

// Helper for n-pointed star polygon string centered at (cx, cy)
function starPoly(
  n: number,
  cx: number,
  cy: number,
  R: number,
  r: number,
  rotDeg = -90
): string {
  const pts: string[] = [];
  for (let i = 0; i < n * 2; i++) {
    const ang = ((rotDeg + (i * 180) / n) * Math.PI) / 180;
    const rad = i % 2 === 0 ? R : r;
    pts.push(`${(cx + rad * Math.cos(ang)).toFixed(1)},${(cy + rad * Math.sin(ang)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function hexPoly(cx: number, cy: number, r: number, flatTop = false): string {
  const pts: string[] = [];
  const base = flatTop ? 0 : -90;
  for (let i = 0; i < 6; i++) {
    const a = ((base + i * 60) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

function pentPoly(cx: number, cy: number, r: number): string {
  const pts: string[] = [];
  for (let i = 0; i < 5; i++) {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    pts.push(`${(cx + r * Math.cos(a)).toFixed(1)},${(cy + r * Math.sin(a)).toFixed(1)}`);
  }
  return pts.join(" ");
}

// Helper for Q21 hexagon (flat-top) with outer diamond at vertex idx (0..5 CW starting top-left? Use angles) and inner dot
function q21Panel(
  diamAngleDeg: number,
  dotX: number,
  dotY: number,
  size = 84
): string {
  const cx = size / 2;
  const cy = size / 2;
  const r = size * 0.29;
  const poly = hexPoly(cx, cy, r, false);
  const a = (diamAngleDeg * Math.PI) / 180;
  const dx = cx + (r + 8) * Math.cos(a);
  const dy = cy + (r + 8) * Math.sin(a);
  const s = 4.8;
  return `<polygon points="${poly}" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="${dx},${dy - s} ${dx + s},${dy} ${dx},${dy + s} ${dx - s},${dy}" fill="currentColor"/><circle cx="${dotX}" cy="${dotY}" r="3.6" fill="currentColor"/>`;
}

// Helper for Q36 hollow arrow + inner polygon in 90x90 or 100x100 cell
function arrowWithInner(
  arrowDir: "U" | "D" | "L" | "R",
  innerKind: "rectV" | "rectH" | "pentR" | "pentL" | "pentU",
  box = 90
): string {
  const c = box / 2;
  const arrowRot = arrowDir === "U" ? 0 : arrowDir === "R" ? 90 : arrowDir === "D" ? 180 : 270;
  const arrow = `<g transform="rotate(${arrowRot} ${c} ${c})"><path d="M${c},${c - 30} L${c + 24},${c - 4} L${c + 11},${c - 4} L${c + 11},${c + 28} L${c - 11},${c + 28} L${c - 11},${c - 4} L${c - 24},${c - 4} Z" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></g>`;
  let inner = "";
  const icx = arrowDir === "R" ? c - 4 : arrowDir === "L" ? c + 4 : c;
  const icy = arrowDir === "U" ? c + 4 : arrowDir === "D" ? c - 4 : c;
  if (innerKind === "rectV") {
    inner = `<rect x="${icx - 5}" y="${icy - 10}" width="10" height="20" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  } else if (innerKind === "rectH") {
    inner = `<rect x="${icx - 10}" y="${icy - 5}" width="20" height="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  } else {
    const pRot = innerKind === "pentU" ? 0 : innerKind === "pentR" ? 90 : 270;
    inner = `<g transform="rotate(${pRot} ${icx} ${icy})"><polygon points="${pentPoly(icx, icy, 8.5)}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/></g>`;
  }
  return `${arrow}${inner}`;
}

export const DDE_TEST_02: OIRBooklet = {
  id: "oir-dde-02",
  source: "DDE",
  bookletNumber: "DDE-02",
  title: "DDE OIR 20-Set Practice Paper (Set 1)",
  category: "mixed",
  totalQuestions: 50,
  durationMinutes: 20,
  markingScheme: { correct: 1, incorrect: 0 },
  description:
    "Official Set 1 (50 mixed Verbal & Non-Verbal questions) from DDE / SSBCrack 20-Set OIR Practice E-Book, rebuilt with crisp theme-aware vector diagrams, 3D isometric cubes, Class A/B dual-select visual reasoning, and independently verified solutions.",
  questions: [
    // Q1
    {
      id: "oir_dde02_q01",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 1,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "easy",
      tags: ["cubes", "group-a-b", "alphabets"],
      promptText: "Which one of the following cubes can possibly belong to Group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { faces: { top: "c", left: "t", right: "q" } },
          { faces: { top: "q", left: "d", right: "r" } },
          { faces: { top: "b", left: "s", right: "c" } },
        ],
        groupB: [
          { faces: { top: "e", left: "a", right: "o" } },
          { faces: { top: "u", left: "o", right: "a" } },
          { faces: { top: "i", left: "e", right: "u" } },
        ],
      },
      options: [
        { key: "1", text: "Cube 1", cubeFaces: { top: "d", left: "a", right: "z" } },
        { key: "2", text: "Cube 2", cubeFaces: { top: "e", left: "q", right: "o" } },
        { key: "3", text: "Cube 3", cubeFaces: { top: "c", left: "m", right: "y" } },
      ],
      correctOption: "3",
      explanation:
        "Group A cubes display only consonants (c, t, q, d, r, b, s), whereas Group B cubes display only vowels (a, e, i, o, u). Cube 1 contains 'a', Cube 2 contains 'e' and 'o', while Cube 3 (c, m, y) has only consonants. Thus Cube 3 belongs to Group A.",
    },
    // Q2
    {
      id: "oir_dde02_q02",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 2,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["logic", "physics"],
      promptText:
        "Write the number of the choice that applies best to the statement given below:\n\"A boy is sitting on the back-seat of the car. When the driver of the car starts it suddenly, the boy bends towards the backside.\"",
      options: [
        { key: "1", text: "(1) True" },
        { key: "2", text: "(2) Probable" },
        { key: "3", text: "(3) False" },
        { key: "4", text: "(4) Absurd" },
      ],
      correctOption: "1",
      explanation:
        "True (1): Due to inertia of rest, when a stationary car accelerates forward suddenly, the passenger's upper body tends to remain at rest and thus lurches backward.",
    },
    // Q3
    {
      id: "oir_dde02_q03",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 3,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "spatial"],
      promptText: "Find if the two cubes are alike. Choose 'Yes' or 'No':",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: gStar4, left: gDiagHalfBR, right: gHeart } },
        cubeB: { label: "Cube 2", faces: { top: gStar6, left: gDiagHalfBR, right: gPentagon } },
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" },
      ],
      correctOption: "Yes",
      explanation:
        "Official DDE Key: Yes — the diagonal half-shaded face matches on the front-left of both views, treating the pentagon and heart (as well as 4-star and 6-star) as opposite faces of the same cube.",
    },
    // Q4
    {
      id: "oir_dde02_q04",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 4,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "spatial"],
      promptText: "Find if the two cubes are alike. Choose 'Yes' or 'No':",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: gHalfTop, left: gArcUp, right: gDot } },
        cubeB: { label: "Cube 2", faces: { top: gOval, left: gArcRight, right: gHalfRight } },
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" },
      ],
      correctOption: "Yes",
      explanation:
        "Official DDE Key: Yes — rotating Cube 1 by 90° clockwise turns the half-shaded top face onto the right side and rotates the curved arc 90°, bringing an oval top face into view.",
    },
    // Q5
    {
      id: "oir_dde02_q05",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 5,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "easy",
      tags: ["series", "arrows"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            arrows6(["D", "U", "D", "U", "D", "U"]),
            arrows6(["U", "U", "D", "U", "D", "U"]),
            arrows6(["U", "U", "U", "U", "D", "U"]),
          ],
          84
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(arrows6(["D", "U", "U", "U", "U", "D"], 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(arrows6(["D", "U", "U", "D", "D", "U"], 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(arrows6(["D", "U", "U", "U", "U", "U"], 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(arrows6(["U", "D", "U", "D", "D", "U"], 100)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(arrows6(["U", "U", "U", "U", "U", "U"], 100)) },
      ],
      correctOption: "5",
      explanation:
        "In each step, the leftmost downward arrow (↓) flips upward (↑): step 1→2 flips arrow #1, step 2→3 flips arrow #3, so step 3→4 flips arrow #5, leaving all 6 arrows pointing upward (Figure 5).",
    },
    // Q6
    {
      id: "oir_dde02_q06",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 6,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "easy",
      tags: ["class-a-b", "nested-shapes"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<rect x="16" y="16" width="50" height="50" fill="none" stroke="currentColor" stroke-width="2"/><rect x="28" y="28" width="26" height="26" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<circle cx="41" cy="41" r="26" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="41" cy="41" r="14" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="41,14 14,66 68,66" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="41,30 28,57 54,57" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          [
            `<path d="M62,18 L18,62 L64,62 M58,28 L30,55 L60,55" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`,
            `<path d="M56,22 C30,14 26,38 42,41 C24,44 30,68 56,60 M54,30 C40,26 38,38 44,41 C38,44 40,56 54,52" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round"/>`,
            `<circle cx="41" cy="41" r="24" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="41" cy="41" r="19" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
          ],
          82
        ),
        instructionHint: "Compare nested similar closed outlines against open/ringed patterns.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Open double S ribbon)",
          svgMarkup: svgFramed(`<path d="M66,22 C36,14 28,36 50,48 C72,60 64,82 34,74 M60,30 C42,24 38,38 54,46 C66,54 60,72 40,66" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Nested diamonds)",
          svgMarkup: svgFramed(`<polygon points="50,16 84,50 50,84 16,50" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,30 70,50 50,70 30,50" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Nested pentagons)",
          svgMarkup: svgFramed(`<polygon points="${pentPoly(50, 50, 32)}" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="${pentPoly(50, 52, 17)}" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Open double C-bracket)",
          svgMarkup: svgFramed(`<path d="M78,22 H22 V78 H78 M78,34 H34 V66 H78" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`),
        },
      ],
      correctOption: "2,3",
      explanation:
        "Each figure in Class A consists of two similar closed polygons/shapes placed symmetrically one inside the other. Figures (2) and (3) share this property (whereas Figures 1 and 4 are open ribbon/bracket paths).",
    },
    // Q7
    {
      id: "oir_dde02_q07",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 7,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "arrows", "rotation"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            `<line x1="42" y1="16" x2="42" y2="68" stroke="currentColor" stroke-width="1.8"/><path d="M36,24 L42,16 L48,24 M36,60 L42,68 L48,60" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="42" cy="42" r="5" fill="currentColor"/>`,
            `<path d="M62,24 V58 H22" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M56,31 L62,24 L68,31 M29,52 L22,58 L29,64" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="62" cy="58" r="5" fill="currentColor"/>`,
            `<line x1="42" y1="62" x2="42" y2="14" stroke="currentColor" stroke-width="1.8"/><path d="M36,22 L42,14 L48,22 M36,34 L42,26 L48,34" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="42" cy="62" r="5" fill="currentColor"/>`,
            `<path d="M22,24 V58 H64" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M16,31 L22,24 L28,31 M57,52 L64,58 L57,64" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="22" cy="58" r="5" fill="currentColor"/>`,
            `<line x1="42" y1="16" x2="42" y2="68" stroke="currentColor" stroke-width="1.8"/><path d="M36,24 L42,16 L48,24 M36,60 L42,68 L48,60" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="42" cy="42" r="5" fill="currentColor"/>`,
          ],
          84
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<path d="M26,74 V26 H74" fill="none" stroke="currentColor" stroke-width="2"/><path d="M66,20 L74,26 L66,32 M20,66 L26,74 L32,66" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="26" cy="26" r="5.5" fill="currentColor"/>`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" stroke-width="2"/><path d="M26,44 L18,50 L26,56 M74,44 L82,50 L74,56" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="5.5" fill="currentColor"/>`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<path d="M74,26 V70 H26" fill="none" stroke="currentColor" stroke-width="2"/><path d="M68,34 L74,26 L80,34 M34,64 L26,70 L34,76" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="74" cy="70" r="5.5" fill="currentColor"/>`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<path d="M26,26 V70 H74" fill="none" stroke="currentColor" stroke-width="2"/><path d="M20,34 L26,26 L32,34 M66,64 L74,70 L66,76" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="26" cy="70" r="5.5" fill="currentColor"/>`),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(`<line x1="22" y1="50" x2="82" y2="50" stroke="currentColor" stroke-width="2"/><path d="M52,44 L60,50 L52,56 M74,44 L82,50 L74,56" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="22" cy="50" r="5.5" fill="currentColor"/>`),
        },
      ],
      correctOption: "3",
      explanation:
        "The short upward arrow stays fixed while the second arrow steps 90° clockwise each frame: ↓ (1) → ← (2) → ↑ (3) → → (4) → ↓ (5). Note also Panel 5 repeats Panel 1, so Panel 6 repeats Panel 2, which is Figure (3).",
    },
    // Q8
    {
      id: "oir_dde02_q08",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 8,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "easy",
      tags: ["analogy", "stars", "shading"],
      promptText:
        "Observe the analogy between the first two stars (first → second) and find the matching fourth star for the third:",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          halfStar("topRight", 45, 45, 28),
          halfStar("botLeft", 45, 45, 28),
          halfStar("botRight", 45, 45, 28),
          90
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(halfStar("right", 50, 50, 30)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(halfStar("top", 50, 50, 30)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(halfStar("topLeft", 50, 50, 30)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(halfStar("topLeftSteep", 50, 50, 30)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(halfStar("left", 50, 50, 30)) },
      ],
      correctOption: "3",
      explanation:
        "The second star inverts the shaded and unshaded halves of the first star along the exact same dividing line. Inverting the shaded half of the third star yields Figure (3).",
    },
    // Q9
    {
      id: "oir_dde02_q09",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 9,
      type: "verbal",
      subType: "jumbled_sentence",
      difficulty: "easy",
      tags: ["proverb", "sentence-rearrangement"],
      promptText:
        "Write the LAST letter of the rearranged sentence:\n\"not   that   gold   glitters   is   all\"",
      options: [
        { key: "D", text: "D" },
        { key: "L", text: "L" },
        { key: "T", text: "T" },
        { key: "S", text: "S" },
      ],
      correctOption: "D",
      explanation:
        "Rearranging forms the proverb: \"All that glitters is not gold\". Its last letter is 'D'.",
    },
    // Q10
    {
      id: "oir_dde02_q10",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 10,
      type: "verbal",
      subType: "anagram",
      difficulty: "easy",
      tags: ["anagram", "spelling"],
      promptText:
        "Write the SECOND letter of the rearranged word:\n\"LESINANCSEL is next to godliness.\"",
      options: [
        { key: "L", text: "L" },
        { key: "E", text: "E" },
        { key: "C", text: "C" },
        { key: "N", text: "N" },
      ],
      correctOption: "L",
      explanation:
        "Unscrambling LESINANCSEL gives CLEANLINESS (\"Cleanliness is next to godliness\"). The second letter is 'L'.",
    },
    // Q11
    {
      id: "oir_dde02_q11",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 11,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy"],
      promptText: "Animal is to Meat as Mine is to __________.",
      options: [
        { key: "1", text: "(1) Cloth" },
        { key: "2", text: "(2) Paper" },
        { key: "3", text: "(3) Mineral" },
        { key: "4", text: "(4) Fabric" },
        { key: "5", text: "(5) Memory" },
      ],
      correctOption: "3",
      explanation:
        "Meat is obtained from animals; similarly, minerals are extracted from a mine. Thus (3) Mineral is correct.",
    },
    // Q12
    {
      id: "oir_dde02_q12",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 12,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "medium",
      tags: ["analogy", "polygons", "diagonals"],
      promptText: "Observe A is to B as C is to which numbered figure?",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          `<polygon points="45,17 73,45 45,73 17,45" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          `<polygon points="45,17 73,45 45,73 17,45" fill="none" stroke="currentColor" stroke-width="2.2"/><line x1="45" y1="17" x2="45" y2="73" stroke="currentColor" stroke-width="1.8"/><line x1="17" y1="45" x2="73" y2="45" stroke="currentColor" stroke-width="1.8"/>`,
          `<polygon points="${hexPoly(45, 45, 28, false)}" fill="none" stroke="currentColor" stroke-width="2.2"/>`,
          90
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(
            `<polygon points="${hexPoly(50, 50, 32, false)}" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" stroke-width="1.6"/><line x1="22.3" y1="34" x2="77.7" y2="34" stroke="currentColor" stroke-width="1.6"/><line x1="22.3" y1="66" x2="77.7" y2="66" stroke="currentColor" stroke-width="1.6"/>`
          ),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(
            `<polygon points="${hexPoly(50, 50, 32, false)}" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" stroke-width="1.5"/><line x1="22.3" y1="34" x2="77.7" y2="66" stroke="currentColor" stroke-width="1.5"/><line x1="77.7" y1="34" x2="22.3" y2="66" stroke="currentColor" stroke-width="1.5"/><line x1="22.3" y1="34" x2="77.7" y2="34" stroke="currentColor" stroke-width="1.5"/><line x1="22.3" y1="66" x2="77.7" y2="66" stroke="currentColor" stroke-width="1.5"/>`
          ),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(
            `<polygon points="${hexPoly(50, 50, 32, false)}" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" stroke-width="1.4"/><line x1="22.3" y1="34" x2="77.7" y2="66" stroke="currentColor" stroke-width="1.4"/><line x1="77.7" y1="34" x2="22.3" y2="66" stroke="currentColor" stroke-width="1.4"/><line x1="22.3" y1="50" x2="77.7" y2="50" stroke="currentColor" stroke-width="1.4"/><line x1="36.2" y1="26" x2="63.8" y2="74" stroke="currentColor" stroke-width="1.4"/><line x1="63.8" y1="26" x2="36.2" y2="74" stroke="currentColor" stroke-width="1.4"/>`
          ),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(
            `<polygon points="${hexPoly(50, 50, 32, false)}" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" stroke-width="1.6"/><line x1="22.3" y1="34" x2="77.7" y2="66" stroke="currentColor" stroke-width="1.6"/><line x1="77.7" y1="34" x2="22.3" y2="66" stroke="currentColor" stroke-width="1.6"/>`
          ),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(
            `<polygon points="${hexPoly(50, 50, 32, false)}" fill="none" stroke="currentColor" stroke-width="2"/><line x1="22.3" y1="34" x2="77.7" y2="66" stroke="currentColor" stroke-width="1.6"/><line x1="77.7" y1="34" x2="22.3" y2="66" stroke="currentColor" stroke-width="1.6"/>`
          ),
        },
      ],
      correctOption: "2",
      explanation:
        "Official DDE Key: Figure (2) — all opposite vertices and parallel edges across the hexagon are connected internally (mirroring how the diamond's opposite vertices are joined in B).",
    },
    // Q13
    {
      id: "oir_dde02_q13",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 13,
      type: "verbal",
      subType: "letter_series",
      difficulty: "medium",
      tags: ["series", "reverse-alphabet"],
      promptText:
        "Which two sets of letters will come next in the following series?\nZXW,  VTS,  RPO,  NLK,  ________,  ________.",
      options: [
        { key: "JHG, FDC", text: "JHG, FDC" },
        { key: "JIG, FED", text: "JIG, FED" },
        { key: "IHG, EDC", text: "IHG, EDC" },
        { key: "JHF, ECB", text: "JHF, ECB" },
      ],
      correctOption: "JHG, FDC",
      explanation:
        "Take consecutive 4-letter blocks in reverse alphabet order and drop the 2nd letter of each block: Z[Y]XW → ZXW, V[U]TS → VTS, R[Q]PO → RPO, N[M]LK → NLK, J[I]HG → JHG, F[E]DC → FDC.",
    },
    // Q14
    {
      id: "oir_dde02_q14",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 14,
      type: "non_verbal",
      subType: "letter_figure_series",
      difficulty: "medium",
      tags: ["series", "letters", "cross-diagram"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            crossLetters("X", "A", "G", "J"),
            crossLetters("V", "Y", "E", "H"),
            crossLetters("S", "V", "B", "E"),
          ],
          84
        ),
      },
      options: [
        { key: "1", text: "Figure 1 (P/L/X/R)", svgMarkup: svgFramed(crossLetters("P", "L", "X", "R", 100)) },
        { key: "2", text: "Figure 2 (O/R/X/A)", svgMarkup: svgFramed(crossLetters("O", "R", "X", "A", 100)) },
        { key: "3", text: "Figure 3 (I/T/W/D)", svgMarkup: svgFramed(crossLetters("I", "T", "W", "D", 100)) },
        { key: "4", text: "Figure 4 (Q/T/Y/F)", svgMarkup: svgFramed(crossLetters("Q", "T", "Y", "F", 100)) },
        { key: "5", text: "Figure 5 (F/T/X/P)", svgMarkup: svgFramed(crossLetters("F", "T", "X", "P", 100)) },
      ],
      correctOption: "2",
      explanation:
        "Each letter arm shifts backward cyclically by 2, then 3, then 4 steps: Top: X−2=V, V−3=S, S−4=O; Right: A−2=Y, Y−3=V, V−4=R; Bottom: G−2=E, E−3=B, B−4=X; Left: J−2=H, H−3=E, E−4=A → (O, R, X, A), Figure (2).",
    },
    // Q15
    {
      id: "oir_dde02_q15",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 15,
      type: "verbal",
      subType: "logical_order",
      difficulty: "easy",
      tags: ["word-order", "sequence"],
      promptText:
        "Which item will stand middle if the following are rearranged in proper order?",
      options: [
        { key: "1", text: "(1) College" },
        { key: "2", text: "(2) Marriage" },
        { key: "3", text: "(3) Kindergarten" },
        { key: "4", text: "(4) Profession" },
        { key: "5", text: "(5) School" },
      ],
      correctOption: "1",
      explanation:
        "Chronological order: Kindergarten → School → College → Profession → Marriage. The middle (3rd) item is College, which corresponds to Option (1). [Note: DDE printed '(3)' referring to the 3rd position rather than option label (1).]",
    },
    // Q16
    {
      id: "oir_dde02_q16",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 16,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "animals"],
      promptText: "Which word does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) Deer" },
        { key: "2", text: "(2) Kangaroo" },
        { key: "3", text: "(3) Zebra" },
        { key: "4", text: "(4) Hyena" },
        { key: "5", text: "(5) Giraffe" },
      ],
      correctOption: "4",
      explanation:
        "Deer, Kangaroo, Zebra, and Giraffe are herbivores; Hyena (4) is a carnivore/scavenger.",
    },
    // Q17
    {
      id: "oir_dde02_q17",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 17,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "easy",
      tags: ["series", "lines"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            `<line x1="20" y1="42" x2="42" y2="20" stroke="currentColor" stroke-width="1.8"/><line x1="24" y1="46" x2="46" y2="24" stroke="currentColor" stroke-width="1.8"/>`,
            `<polyline points="20,44 42,22 64,44" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><polyline points="24,48 42,29 60,48" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
            `<polyline points="20,42 42,20 64,42 42,64" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/><polyline points="24,46 42,27 57,42 39,60" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
          ],
          84
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<polyline points="50,24 24,50 50,76 76,50" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polyline points="54,28 31,50 50,69 72,46" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<line x1="28" y1="54" x2="54" y2="28" stroke="currentColor" stroke-width="2"/><line x1="32" y1="58" x2="58" y2="32" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<polyline points="24,36 50,62 76,36" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polyline points="28,32 50,55 72,32" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polygon points="50,28 72,50 50,72 28,50" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(`<polyline points="66,24 38,50 66,76" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polyline points="70,28 45,50 70,72" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`),
        },
      ],
      correctOption: "4",
      explanation:
        "One double-line side of the diamond is added clockwise in each step (1 side → 2 sides → 3 sides → 4 sides). Completing the fourth edge gives Figure (4).",
    },
    // Q18
    {
      id: "oir_dde02_q18",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 18,
      type: "verbal",
      subType: "sentence_completion",
      difficulty: "easy",
      tags: ["sentence", "grammar"],
      promptText:
        "Choose one word number from each of the following three lines to make a correct, true and meaningful sentence:\nLine 1: If you  [(1) sing   (2) hear   (3) speak   (4) dance]\nLine 2: [(1) loud   (2) mild   (3) melody   (4) jazz]  music,\nLine 3: it will  [(1) impede   (2) impair   (3) impose   (4) impel]  your hearing.",
      options: [
        { key: "2, 1, 2", text: "2, 1, 2 (hear, loud, impair)" },
        { key: "1, 2, 1", text: "1, 2, 1 (sing, mild, impede)" },
        { key: "2, 4, 3", text: "2, 4, 3 (hear, jazz, impose)" },
        { key: "3, 1, 2", text: "3, 1, 2 (speak, loud, impair)" },
      ],
      correctOption: "2, 1, 2",
      explanation:
        "Selecting (2) hear, (1) loud, and (2) impair forms the true statement: \"If you hear loud music, it will impair your hearing.\"",
    },
    // Q19
    {
      id: "oir_dde02_q19",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 19,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical"],
      promptText: "Write the number which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "(1) Sports" },
        { key: "2", text: "(2) Sparrow" },
        { key: "3", text: "(3) Study" },
        { key: "4", text: "(4) Speaker" },
        { key: "5", text: "(5) Swift" },
      ],
      correctOption: "5",
      explanation:
        "Alphabetical order: Sparrow → Speaker → Sports → Study → Swift. Thus Swift (5) comes last.",
    },
    // Q20
    {
      id: "oir_dde02_q20",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 20,
      type: "verbal",
      subType: "missing_digit_arithmetic",
      difficulty: "easy",
      tags: ["arithmetic", "subtraction"],
      promptText: "Subtract and find the digit inside the boxed [ ? ]:",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          `<text x="120" y="34" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">5 3 0 8</text>
           <text x="120" y="60" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">− x x 2 x</text>
           <line x1="22" y1="70" x2="128" y2="70" stroke="currentColor" stroke-width="1.8"/>
           <text x="80" y="96" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">3 4</text>
           <rect x="82" y="77" width="22" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <text x="93" y="95" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">?</text>
           <text x="120" y="96" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor">5</text>`,
          150,
          112
        ),
      },
      options: [
        { key: "6", text: "6" },
        { key: "7", text: "7" },
        { key: "8", text: "8" },
        { key: "9", text: "9" },
      ],
      correctOption: "8",
      explanation:
        "In the units place 8 − 3 = 5; in the tens place borrowing 1 gives 10 − 2 = 8 (leaving 52 − 18 = 34 → 5308 − 1823 = 3485). Thus the missing boxed digit is 8.",
    },
    // Q21
    {
      id: "oir_dde02_q21",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 21,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "rotation", "hexagon"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            q21Panel(-90, 56, 50),
            q21Panel(-150, 42, 60),
            q21Panel(150, 28, 34),
            q21Panel(90, 28, 34),
            q21Panel(30, 42, 26),
          ],
          84
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(q21Panel(150, 68, 38, 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(q21Panel(90, 66, 62, 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(q21Panel(-90, 34, 42, 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(q21Panel(-90, 50, 32, 100)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(q21Panel(-30, 66, 40, 100)) },
      ],
      correctOption: "5",
      explanation:
        "The outer diamond moves 1 vertex anticlockwise each frame (top → top-left → bottom-left → bottom → bottom-right → top-right), while the inner dot shifts clockwise around the hexagon. Only Figure (5) places the outer diamond at the top-right vertex.",
    },
    // Q22
    {
      id: "oir_dde02_q22",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 22,
      type: "verbal",
      subType: "number_classification",
      difficulty: "easy",
      tags: ["odd-one-out", "digit-sum"],
      promptText: "Which group of numbers does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) 5212" },
        { key: "2", text: "(2) 7111" },
        { key: "3", text: "(3) 3214" },
        { key: "4", text: "(4) 1090" },
        { key: "5", text: "(5) 1608" },
      ],
      correctOption: "5",
      explanation:
        "The digit sum is 10 for 5212 (5+2+1+2), 7111 (7+1+1+1), 3214 (3+2+1+4), and 1090 (1+0+9+0), whereas 1608 sums to 1+6+0+8 = 15. Thus (5) 1608 is the odd one out.",
    },
    // Q23
    {
      id: "oir_dde02_q23",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 23,
      type: "verbal",
      subType: "missing_digit_arithmetic",
      difficulty: "easy",
      tags: ["arithmetic", "addition"],
      promptText: "Add and find the digit inside the boxed [ ? ]:",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          `<text x="118" y="34" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">3 4 2</text>
           <text x="118" y="60" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">+ 5 x x</text>
           <line x1="22" y1="70" x2="126" y2="70" stroke="currentColor" stroke-width="1.8"/>
           <rect x="44" y="77" width="22" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <text x="55" y="95" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">?</text>
           <text x="118" y="96" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">2 6</text>`,
          144,
          112
        ),
      },
      options: [
        { key: "7", text: "7" },
        { key: "8", text: "8" },
        { key: "9", text: "9" },
        { key: "6", text: "6" },
      ],
      correctOption: "9",
      explanation:
        "342 + 584 = 926: 2 + 4 = 6, 4 + 8 = 12 (2 carry 1), and 1 + 3 + 5 = 9. Thus the boxed hundreds digit is 9.",
    },
    // Q24
    {
      id: "oir_dde02_q24",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 24,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "easy",
      tags: ["series", "stars", "pentagon"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          `<g transform="translate(8,14)">
            <polygon points="${pentPoly(16, 20, 12)}" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <polygon points="${starPoly(5, 44, 20, 13, 5.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${starPoly(4, 72, 20, 13, 4.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${starPoly(4, 100, 20, 13, 4.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${pentPoly(128, 20, 12)}" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <polygon points="${starPoly(4, 156, 20, 13, 4.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${starPoly(6, 184, 20, 13, 6.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${starPoly(6, 212, 20, 13, 6.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${pentPoly(240, 20, 12)}" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <polygon points="${starPoly(6, 268, 20, 13, 6.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${starPoly(5, 296, 20, 13, 5.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${starPoly(5, 324, 20, 13, 5.2)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
            <polygon points="${pentPoly(352, 20, 12)}" fill="none" stroke="currentColor" stroke-width="1.6"/>
            <text x="380" y="25" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">?</text>
          </g>`,
          404,
          66
        ),
      },
      options: [
        { key: "1", text: "Figure 1 (Pentagon)", svgMarkup: svgFramed(`<polygon points="${pentPoly(50, 50, 28)}" fill="none" stroke="currentColor" stroke-width="2"/>`) },
        { key: "2", text: "Figure 2 (6-pointed star)", svgMarkup: svgFramed(`<polygon points="${starPoly(6, 50, 50, 30, 15)}" fill="none" stroke="currentColor" stroke-width="2"/>`) },
        { key: "3", text: "Figure 3 (5-pointed star)", svgMarkup: svgFramed(`<polygon points="${starPoly(5, 50, 50, 30, 12)}" fill="none" stroke="currentColor" stroke-width="2"/>`) },
        { key: "4", text: "Figure 4 (4-pointed star)", svgMarkup: svgFramed(`<polygon points="${starPoly(4, 50, 50, 30, 9)}" fill="none" stroke="currentColor" stroke-width="2"/>`) },
        { key: "5", text: "Figure 5 (Pentagon)", svgMarkup: svgFramed(`<polygon points="${pentPoly(50, 50, 28)}" fill="none" stroke="currentColor" stroke-width="2"/>`) },
      ],
      correctOption: "3",
      explanation:
        "Each pentagon is flanked symmetrically by a single star on the back matching the pair of stars right before it (… 4★ 4★ ⬠ 4★ → 6★ 6★ ⬠ 6★ → 5★ 5★ ⬠ 5★). Thus a 5-pointed star (Figure 3) follows next.",
    },
    // Q25
    {
      id: "oir_dde02_q25",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 25,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "easy",
      tags: ["class-a-b", "combined-shapes"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<circle cx="41" cy="34" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="41" cy="48" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="41,42 29,22 53,22" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="41,40 29,60 53,60" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="41,18 55,34 41,50 27,34" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="41,30 55,46 41,62 27,46" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          [
            `<polygon points="41,20 18,62 64,62" fill="none" stroke="currentColor" stroke-width="2"/>`,
            `<circle cx="41" cy="41" r="22" fill="none" stroke="currentColor" stroke-width="2"/>`,
            `<polygon points="41,18 68,41 41,64 14,41" fill="none" stroke="currentColor" stroke-width="2"/>`,
          ],
          82
        ),
        instructionHint: "Identify figures made from two similar intersecting/combined shapes.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Two overlapping upright triangles)",
          svgMarkup: svgFramed(`<polygon points="50,20 26,64 74,64" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,36 26,80 74,80" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Two overlapping vertical hexagons)",
          svgMarkup: svgFramed(`<polygon points="${hexPoly(43, 50, 22, false)}" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="${hexPoly(57, 50, 22, false)}" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Two separated small circles)",
          svgMarkup: svgFramed(`<circle cx="34" cy="36" r="12" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="66" cy="64" r="12" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Two side-by-side diamonds)",
          svgMarkup: svgFramed(`<polygon points="32,32 50,50 32,68 14,50" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="68,32 86,50 68,68 50,50" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
      ],
      correctOption: "1,2",
      explanation:
        "Each figure in Class A consists of two overlapping/combined copies of the same shape (unlike Class B single shapes). Figures (1) and (2) match this rule.",
    },
    // Q26
    {
      id: "oir_dde02_q26",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 26,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "(1) People" },
        { key: "2", text: "(2) Calculator" },
        { key: "3", text: "(3) Etiquette" },
        { key: "4", text: "(4) Newspaper" },
      ],
      correctOption: "1",
      explanation:
        "Alphabetical order: Calculator → Etiquette → Newspaper → People. Since P comes after N, People (1) comes last in the dictionary. [Correction applied: the DDE PDF key erroneously printed (4) Newspaper.]",
    },
    // Q27
    {
      id: "oir_dde02_q27",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 27,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "(1) Urgent" },
        { key: "2", text: "(2) Utmost" },
        { key: "3", text: "(3) University" },
        { key: "4", text: "(4) Umbrella" },
      ],
      correctOption: "2",
      explanation:
        "Alphabetical order: Umbrella → University → Urgent → Utmost. Thus Utmost (2) comes last. [Correction applied: the DDE explanation text names 'Utmost', while its heading misprinted '(4)'.]",
    },
    // Q28
    {
      id: "oir_dde02_q28",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 28,
      type: "verbal",
      subType: "digit_counting",
      difficulty: "easy",
      tags: ["counting", "attention"],
      promptText:
        "How many 6's come just after 2 in the following numbers?\n1  6  2  4  3  5  8  2  6  8  9  6  2  5  4  7  8  6  1  3  7  8  2  6  5  4  2  1  7  9  5  2  4  6  2  4  2  6  9  8",
      options: [
        { key: "1", text: "(1) 3" },
        { key: "2", text: "(2) 5" },
        { key: "3", text: "(3) 1" },
        { key: "4", text: "(4) 6" },
      ],
      correctOption: "1",
      explanation:
        "Scanning for '2 6' pairs: ... 5 8 [2 6] 8 9 ... 7 8 [2 6] 5 4 ... 2 4 [2 6] 9 8. There are exactly 3 occurrences of 6 immediately following 2.",
    },
    // Q29
    {
      id: "oir_dde02_q29",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 29,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "(1) Traffic" },
        { key: "2", text: "(2) Helicopter" },
        { key: "3", text: "(3) Vaccination" },
        { key: "4", text: "(4) Judgement" },
      ],
      correctOption: "3",
      explanation:
        "Alphabetical order: Helicopter → Judgement → Traffic → Vaccination. Thus (3) Vaccination comes last.",
    },
    // Q30
    {
      id: "oir_dde02_q30",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 30,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "(1) Name" },
        { key: "2", text: "(2) Common" },
        { key: "3", text: "(3) Things" },
        { key: "4", text: "(4) Mouse" },
      ],
      correctOption: "3",
      explanation:
        "Alphabetical order: Common → Mouse → Name → Things. Thus (3) Things comes last.",
    },
    // Q31
    {
      id: "oir_dde02_q31",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 31,
      type: "verbal",
      subType: "statement_justification",
      difficulty: "easy",
      tags: ["reasoning", "cause-effect"],
      promptText:
        "Choose the serial number of the reason you think is correct:\n\"Majority of the students in many schools do not pass in the final examination. Because:\"",
      options: [
        { key: "1", text: "(1) These schools should be closed down as these have become unproductive." },
        { key: "2", text: "(2) The teachers of these schools should immediately be retrenched." },
        { key: "3", text: "(3) These schools are following different syllabus." },
        { key: "4", text: "(4) The students are not getting proper guidance from their teachers." },
      ],
      correctOption: "4",
      explanation:
        "Options (1) and (2) state courses of action rather than causes; option (3) is irrelevant to passing an exam. Lack of proper teacher guidance (4) directly explains poor student pass rates.",
    },
    // Q32
    {
      id: "oir_dde02_q32",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 32,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "(1) Queen" },
        { key: "2", text: "(2) Watch" },
        { key: "3", text: "(3) Ultimate" },
        { key: "4", text: "(4) Xerox" },
      ],
      correctOption: "4",
      explanation:
        "Alphabetical order: Queen → Ultimate → Watch → Xerox. Thus (4) Xerox comes last.",
    },
    // Q33
    {
      id: "oir_dde02_q33",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 33,
      type: "verbal",
      subType: "time_arithmetic",
      difficulty: "easy",
      tags: ["time", "arithmetic"],
      promptText:
        "Swathi started her bike at 20:30 and reached the destination at 22:00. Find how much time she spent in her travel:",
      options: [
        { key: "1", text: "(1) 70 minutes" },
        { key: "2", text: "(2) 150 minutes" },
        { key: "3", text: "(3) 90 minutes" },
        { key: "4", text: "(4) 30 minutes" },
      ],
      correctOption: "3",
      explanation:
        "From 20:30 (8:30 PM) to 22:00 (10:00 PM) is 1 hour 30 minutes = 90 minutes (3).",
    },
    // Q34
    {
      id: "oir_dde02_q34",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 34,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "easy",
      tags: ["class-a-b", "dissimilar-nested"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<polygon points="41,14 14,64 68,64" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="41" cy="48" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<circle cx="41" cy="41" r="25" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="41,24 25,54 57,54" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<circle cx="41" cy="41" r="25" fill="none" stroke="currentColor" stroke-width="2"/><rect x="27" y="27" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          [
            `<rect x="18" y="18" width="46" height="46" fill="none" stroke="currentColor" stroke-width="2"/><rect x="30" y="30" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<circle cx="41" cy="41" r="25" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="41" cy="41" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="41,16 15,64 67,64" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="41,30 28,56 54,56" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          82
        ),
        instructionHint: "Compare nested dissimilar shapes (Class A) vs identical nested shapes (Class B).",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Square inside pentagon)",
          svgMarkup: svgFramed(`<polygon points="${pentPoly(50, 50, 32)}" fill="none" stroke="currentColor" stroke-width="2"/><rect x="36" y="38" width="28" height="26" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Single 6-pointed star)",
          svgMarkup: svgFramed(`<polygon points="${starPoly(6, 50, 50, 32, 16)}" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Single hexagon)",
          svgMarkup: svgFramed(`<polygon points="${hexPoly(50, 50, 30, false)}" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Diamond inside rectangle)",
          svgMarkup: svgFramed(`<rect x="18" y="28" width="64" height="44" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,32 70,50 50,68 30,50" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
      ],
      correctOption: "1,4",
      explanation:
        "Each figure in Class A contains two DIFFERENT closed geometric shapes, one placed inside the other. Figures (1) (square in pentagon) and (4) (diamond in rectangle) belong to Class A.",
    },
    // Q35
    {
      id: "oir_dde02_q35",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 35,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "symmetry"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<path d="M41,66 C18,52 16,30 28,22 C35,17 41,25 41,29 C41,25 47,17 54,22 C66,30 64,52 41,66 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="41" y1="28" x2="41" y2="66" stroke="currentColor" stroke-width="1.6"/>`,
            `<polygon points="${hexPoly(41, 41, 24, false)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="41" y1="17" x2="41" y2="65" stroke="currentColor" stroke-width="1.6"/>`,
            `<polygon points="41,15 67,41 41,67 15,41" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="41" y1="15" x2="41" y2="67" stroke="currentColor" stroke-width="1.6"/>`,
          ],
          [
            `<polygon points="${pentPoly(41, 43, 24)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="18" y1="36" x2="64" y2="36" stroke="currentColor" stroke-width="1.6"/>`,
            `<path d="M41,18 C16,32 16,58 30,62 C36,64 41,56 41,52 C41,56 46,64 52,62 C66,58 66,32 41,18 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="21" y1="42" x2="61" y2="42" stroke="currentColor" stroke-width="1.6"/>`,
            `<polygon points="${starPoly(5, 41, 43, 25, 10)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="17" y1="35" x2="65" y2="35" stroke="currentColor" stroke-width="1.6"/>`,
          ],
          82
        ),
        instructionHint: "Check whether the dividing line serves as an axis of reflection symmetry.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Pentagon with vertical bisector)",
          svgMarkup: svgFramed(`<polygon points="${pentPoly(50, 52, 30)}" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="22" x2="50" y2="76" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Arrow with vertical cross-cut)",
          svgMarkup: svgFramed(`<path d="M18,40 H52 V24 L82,50 L52,76 V60 H18 Z" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><line x1="52" y1="24" x2="52" y2="76" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Triangle with vertical bisector)",
          svgMarkup: svgFramed(`<polygon points="50,18 20,78 80,78" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="18" x2="50" y2="78" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Heart with horizontal cut)",
          svgMarkup: svgFramed(`<path d="M50,78 C22,60 20,34 34,24 C42,18 50,27 50,32 C50,27 58,18 66,24 C80,34 78,60 50,78 Z" fill="none" stroke="currentColor" stroke-width="2"/><line x1="25" y1="45" x2="75" y2="45" stroke="currentColor" stroke-width="1.8"/>`),
        },
      ],
      correctOption: "1,3",
      explanation:
        "In Class A, the dividing line cuts each shape into two symmetric halves (axis of reflection symmetry). Class B cuts shapes asymmetrically. Figures (1) and (3) are symmetric across their dividing lines.",
    },
    // Q36
    {
      id: "oir_dde02_q36",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 36,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "medium",
      tags: ["analogy", "rotation", "arrows"],
      promptText: "Observe A is to B as C is to which numbered figure?",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          arrowWithInner("U", "rectV", 90),
          arrowWithInner("D", "rectH", 90),
          arrowWithInner("L", "pentR", 90),
          90
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(arrowWithInner("R", "pentL", 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(arrowWithInner("U", "pentU", 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(arrowWithInner("R", "pentR", 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(arrowWithInner("L", "pentR", 100)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(arrowWithInner("R", "pentU", 100)) },
      ],
      correctOption: "5",
      explanation:
        "From A to B, the outer arrow reverses direction (180° turn: up → down) while the inner shape rotates 90° (vertical → horizontal). Applying 180° flip to C's left arrow (→ right) and 90° turn to its pentagon (→ upright) yields Figure (5).",
    },
    // Q37
    {
      id: "oir_dde02_q37",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 37,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy", "antonyms"],
      promptText: "Weakling is to Daring as Dangerous is to ___________.",
      options: [
        { key: "1", text: "(1) Hazardous" },
        { key: "2", text: "(2) Perilous" },
        { key: "3", text: "(3) Unthreatening" },
        { key: "4", text: "(4) Detrimental" },
        { key: "5", text: "(5) Wild" },
      ],
      correctOption: "3",
      explanation:
        "Weakling and Daring are antonyms; the antonym of Dangerous is Unthreatening (3), whereas the other choices are synonyms or unrelated.",
    },
    // Q38
    {
      id: "oir_dde02_q38",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 38,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "easy",
      tags: ["class-a-b", "intersecting-lines"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<line x1="41" y1="16" x2="41" y2="66" stroke="currentColor" stroke-width="2"/><line x1="16" y1="41" x2="66" y2="41" stroke="currentColor" stroke-width="2"/>`,
            `<line x1="20" y1="20" x2="62" y2="62" stroke="currentColor" stroke-width="2"/><line x1="62" y1="20" x2="20" y2="62" stroke="currentColor" stroke-width="2"/>`,
            `<line x1="16" y1="28" x2="66" y2="48" stroke="currentColor" stroke-width="2"/><line x1="62" y1="30" x2="40" y2="64" stroke="currentColor" stroke-width="2"/>`,
          ],
          [
            `<line x1="20" y1="18" x2="66" y2="42" stroke="currentColor" stroke-width="2"/><line x1="18" y1="62" x2="54" y2="44" stroke="currentColor" stroke-width="2"/>`,
            `<line x1="36" y1="14" x2="14" y2="68" stroke="currentColor" stroke-width="2"/><line x1="66" y1="24" x2="48" y2="68" stroke="currentColor" stroke-width="2"/>`,
            `<line x1="18" y1="34" x2="64" y2="34" stroke="currentColor" stroke-width="2"/><line x1="18" y1="48" x2="64" y2="48" stroke="currentColor" stroke-width="2"/>`,
          ],
          82
        ),
        instructionHint: "Notice whether the two line segments meet/intersect or remain disconnected.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Disjoint slanted V-lines)",
          svgMarkup: svgFramed(`<line x1="20" y1="32" x2="72" y2="82" stroke="currentColor" stroke-width="2.2"/><line x1="62" y1="18" x2="80" y2="74" stroke="currentColor" stroke-width="2.2"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Crossing slant lines)",
          svgMarkup: svgFramed(`<line x1="56" y1="18" x2="40" y2="82" stroke="currentColor" stroke-width="2.2"/><line x1="26" y1="68" x2="78" y2="34" stroke="currentColor" stroke-width="2.2"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Disjoint obtuse segments)",
          svgMarkup: svgFramed(`<line x1="48" y1="18" x2="24" y2="60" stroke="currentColor" stroke-width="2.2"/><line x1="52" y1="54" x2="80" y2="82" stroke="currentColor" stroke-width="2.2"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Joined V-angle lines)",
          svgMarkup: svgFramed(`<line x1="22" y1="30" x2="54" y2="74" stroke="currentColor" stroke-width="2.2"/><line x1="54" y1="74" x2="78" y2="46" stroke="currentColor" stroke-width="2.2"/>`),
        },
      ],
      correctOption: "2,4",
      explanation:
        "Each figure in Class A consists of two touching/intersecting line segments, whereas Class B contains disconnected pairs. Figures (2) and (4) belong to Class A.",
    },
    // Q39
    {
      id: "oir_dde02_q39",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 39,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "diagonals"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<polygon points="${starPoly(4, 41, 41, 26, 7)}" fill="none" stroke="currentColor" stroke-width="1.7"/><line x1="41" y1="15" x2="41" y2="67" stroke="currentColor" stroke-width="1.4"/><line x1="15" y1="41" x2="67" y2="41" stroke="currentColor" stroke-width="1.4"/>`,
            `<rect x="20" y="20" width="42" height="42" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="20" y1="20" x2="62" y2="62" stroke="currentColor" stroke-width="1.5"/><line x1="62" y1="20" x2="20" y2="62" stroke="currentColor" stroke-width="1.5"/>`,
            `<polygon points="${hexPoly(41, 41, 22, false)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="41" y1="19" x2="41" y2="63" stroke="currentColor" stroke-width="1.5"/><line x1="21.9" y1="30" x2="60.1" y2="52" stroke="currentColor" stroke-width="1.5"/><line x1="60.1" y1="30" x2="21.9" y2="52" stroke="currentColor" stroke-width="1.5"/>`,
          ],
          [
            `<rect x="14" y="24" width="54" height="34" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="41" y1="24" x2="41" y2="58" stroke="currentColor" stroke-width="1.5"/><line x1="14" y1="41" x2="68" y2="41" stroke="currentColor" stroke-width="1.5"/>`,
            `<polygon points="${pentPoly(41, 43, 24)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="41" y1="19" x2="41" y2="62" stroke="currentColor" stroke-width="1.4"/><line x1="18.2" y1="35.6" x2="55.1" y2="62" stroke="currentColor" stroke-width="1.4"/><line x1="63.8" y1="35.6" x2="26.9" y2="62" stroke="currentColor" stroke-width="1.4"/><line x1="20" y1="48" x2="62" y2="48" stroke="currentColor" stroke-width="1.4"/>`,
            `<polygon points="41,16 66,41 41,66 16,41" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="28.5" y1="28.5" x2="53.5" y2="53.5" stroke="currentColor" stroke-width="1.5"/><line x1="53.5" y1="28.5" x2="28.5" y2="53.5" stroke="currentColor" stroke-width="1.5"/>`,
          ],
          82
        ),
        instructionHint: "Look at whether the internal lines join opposite vertices/corners or edge midpoints.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Triangle with medians from vertices to opposite edge midpoints)",
          svgMarkup: svgFramed(`<polygon points="50,18 20,76 80,76" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="18" x2="50" y2="76" stroke="currentColor" stroke-width="1.5"/><line x1="20" y1="76" x2="65" y2="47" stroke="currentColor" stroke-width="1.5"/><line x1="80" y1="76" x2="35" y2="47" stroke="currentColor" stroke-width="1.5"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Circle divided by +)",
          svgMarkup: svgFramed(`<circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="26" x2="50" y2="74" stroke="currentColor" stroke-width="1.6"/><line x1="26" y1="50" x2="74" y2="50" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (6-pointed star with vertex-to-vertex diagonals)",
          svgMarkup: svgFramed(`<polygon points="${starPoly(6, 50, 50, 32, 16)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" stroke-width="1.5"/><line x1="22.3" y1="34" x2="77.7" y2="66" stroke="currentColor" stroke-width="1.5"/><line x1="77.7" y1="34" x2="22.3" y2="66" stroke="currentColor" stroke-width="1.5"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Diamond with opposite corners joined)",
          svgMarkup: svgFramed(`<polygon points="50,18 82,50 50,82 18,50" fill="none" stroke="currentColor" stroke-width="2"/><line x1="50" y1="18" x2="50" y2="82" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="50" x2="82" y2="50" stroke="currentColor" stroke-width="1.6"/>`),
        },
      ],
      correctOption: "3,4",
      explanation:
        "In Class A, internal lines join opposite vertices/corners through the center (unlike Class B midpoint cuts or triangles without opposite vertices). Figures (3) and (4) belong to Class A.",
    },
    // Q40
    {
      id: "oir_dde02_q40",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 40,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification"],
      promptText: "Which word does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) Can" },
        { key: "2", text: "(2) Pot" },
        { key: "3", text: "(3) Mug" },
        { key: "4", text: "(4) Tank" },
        { key: "5", text: "(5) River" },
      ],
      correctOption: "5",
      explanation:
        "Can, Pot, Mug, and Tank are artificial containers for holding liquids; River (5) is a natural flowing watercourse.",
    },
    // Q41
    {
      id: "oir_dde02_q41",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 41,
      type: "verbal",
      subType: "anagram",
      difficulty: "easy",
      tags: ["anagram", "spelling"],
      promptText:
        "Write the SECOND letter of the rearranged word:\n\"HTNAEPEL is the national animal of Thailand.\"",
      options: [
        { key: "L", text: "L" },
        { key: "E", text: "E" },
        { key: "P", text: "P" },
        { key: "H", text: "H" },
      ],
      correctOption: "L",
      explanation:
        "Unscrambling HTNAEPEL gives ELEPHANT. Its second letter is 'L'.",
    },
    // Q42
    {
      id: "oir_dde02_q42",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 42,
      type: "verbal",
      subType: "jumbled_sentence",
      difficulty: "easy",
      tags: ["sentence-rearrangement"],
      promptText:
        "Write the LAST letter of the rearranged sentence:\n\"Ladakh   is   Anjali   by   to   road   going\"",
      options: [
        { key: "D", text: "D" },
        { key: "H", text: "H" },
        { key: "Y", text: "Y" },
        { key: "G", text: "G" },
      ],
      correctOption: "D",
      explanation:
        "Rearranging forms: \"Anjali is going to Ladakh by road\". The last word is 'road', whose last letter is 'D'.",
    },
    // Q43
    {
      id: "oir_dde02_q43",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 43,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "hard",
      tags: ["analogy", "color-inversion", "lines"],
      promptText: "Observe A is to B as C is to which numbered figure?",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          `<rect x="14" y="14" width="62" height="62" fill="none" stroke="currentColor" stroke-width="2"/><line x1="14" y1="14" x2="76" y2="76" stroke="currentColor" stroke-width="1.6"/><line x1="76" y1="14" x2="14" y2="76" stroke="currentColor" stroke-width="1.6"/><polygon points="${starPoly(4, 45, 45, 25, 9)}" fill="currentColor"/>`,
          `<rect x="14" y="14" width="62" height="62" fill="currentColor"/><polygon points="${starPoly(4, 45, 45, 22, 8)}" fill="white"/><line x1="45" y1="23" x2="45" y2="67" stroke="currentColor" stroke-width="1.6"/><line x1="23" y1="45" x2="67" y2="45" stroke="currentColor" stroke-width="1.6"/>`,
          `<rect x="14" y="14" width="62" height="62" fill="none" stroke="currentColor" stroke-width="2"/><line x1="14" y1="14" x2="32" y2="45" stroke="currentColor" stroke-width="1.6"/><line x1="76" y1="14" x2="58" y2="45" stroke="currentColor" stroke-width="1.6"/><line x1="45" y1="68" x2="45" y2="76" stroke="currentColor" stroke-width="1.6"/><polygon points="45,20 20,68 70,68" fill="currentColor"/>`,
          90
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<rect x="14" y="14" width="72" height="72" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,24 22,74 78,74" fill="currentColor"/>`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<rect x="14" y="14" width="72" height="72" fill="currentColor"/><polygon points="22,50 74,24 74,76" fill="white"/><line x1="22" y1="50" x2="74" y2="50" stroke="currentColor" stroke-width="1.6"/><line x1="48" y1="37" x2="74" y2="76" stroke="currentColor" stroke-width="1.6"/><line x1="48" y1="63" x2="74" y2="24" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<rect x="14" y="14" width="72" height="72" fill="currentColor"/><polygon points="50,22 24,74 76,74" fill="white"/><line x1="50" y1="22" x2="50" y2="74" stroke="currentColor" stroke-width="1.6"/><line x1="37" y1="48" x2="76" y2="74" stroke="currentColor" stroke-width="1.6"/><line x1="63" y1="48" x2="24" y2="74" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<rect x="14" y="14" width="72" height="72" fill="none" stroke="currentColor" stroke-width="2"/><line x1="14" y1="14" x2="36" y2="48" stroke="currentColor" stroke-width="1.6"/><line x1="86" y1="14" x2="64" y2="48" stroke="currentColor" stroke-width="1.6"/><line x1="50" y1="74" x2="50" y2="86" stroke="currentColor" stroke-width="1.6"/><polygon points="50,24 24,74 76,74" fill="none" stroke="currentColor" stroke-width="5"/>`),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(`<rect x="14" y="14" width="72" height="72" fill="currentColor"/><polygon points="50,76 24,24 76,24" fill="white"/><line x1="50" y1="24" x2="50" y2="76" stroke="currentColor" stroke-width="1.6"/><line x1="37" y1="50" x2="76" y2="24" stroke="currentColor" stroke-width="1.6"/><line x1="63" y1="50" x2="24" y2="24" stroke="currentColor" stroke-width="1.6"/>`),
        },
      ],
      correctOption: "2",
      explanation:
        "Official DDE Key: Figure (2) — black/white shading is inverted, the outer segments move inside the white triangle, and the inner motif rotates 90° counterclockwise (leaving the 4-way symmetric star visually unchanged in B).",
    },
    // Q44
    {
      id: "oir_dde02_q44",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 44,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "easy",
      tags: ["analogy", "stars", "counting"],
      promptText: "Observe A is to B as C is to which numbered figure?",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          `<polygon points="${starPoly(4, 45, 45, 26, 8)}" fill="none" stroke="currentColor" stroke-width="2"/>`,
          `<polygon points="${starPoly(4, 45, 45, 26, 8)}" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="24" cy="24" r="6" fill="currentColor"/><circle cx="66" cy="24" r="6" fill="currentColor"/><circle cx="24" cy="66" r="6" fill="currentColor"/><circle cx="66" cy="66" r="6" fill="currentColor"/>`,
          `<polygon points="${starPoly(5, 45, 45, 26, 11)}" fill="none" stroke="currentColor" stroke-width="2"/>`,
          90
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<polygon points="${starPoly(6, 50, 50, 26, 13)}" fill="none" stroke="currentColor" stroke-width="2"/>${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${50 + 28 * Math.cos(((a - 60) * Math.PI) / 180)}" cy="${50 + 28 * Math.sin(((a - 60) * Math.PI) / 180)}" r="5" fill="currentColor"/>`).join("")}`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<polygon points="${starPoly(5, 50, 50, 26, 11)}" fill="currentColor"/>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${50 + 28 * Math.cos(((a - 54) * Math.PI) / 180)}" cy="${50 + 28 * Math.sin(((a - 54) * Math.PI) / 180)}" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")}`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<polygon points="${starPoly(5, 50, 50, 26, 11)}" fill="none" stroke="currentColor" stroke-width="2"/>${[0, 72, 144, 216, 288].map((a) => `<circle cx="${50 + 28 * Math.cos(((a - 54) * Math.PI) / 180)}" cy="${50 + 28 * Math.sin(((a - 54) * Math.PI) / 180)}" r="5.2" fill="currentColor"/>`).join("")}`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<polygon points="${starPoly(6, 50, 50, 26, 13)}" fill="currentColor"/>${[0, 60, 120, 180, 240, 300].map((a) => `<circle cx="${50 + 28 * Math.cos(((a - 60) * Math.PI) / 180)}" cy="${50 + 28 * Math.sin(((a - 60) * Math.PI) / 180)}" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")}`),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(`<polygon points="${starPoly(4, 50, 50, 26, 8)}" fill="currentColor"/><circle cx="24" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="76" cy="24" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="24" cy="76" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="76" cy="76" r="6" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
      ],
      correctOption: "3",
      explanation:
        "A 4-pointed white star gains 4 solid black dots in its recesses. Similarly, C's 5-pointed white star gains 5 solid black dots around it, which is Figure (3).",
    },
    // Q45
    {
      id: "oir_dde02_q45",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 45,
      type: "verbal",
      subType: "number_series",
      difficulty: "medium",
      tags: ["series", "arithmetic"],
      promptText:
        "Which two numbers will come next in the following series?\n1,  6,  10,  5,  10,  14,  7,  12,  16,  _____,  _____.",
      options: [
        { key: "8, 13", text: "8 and 13" },
        { key: "8, 12", text: "8 and 12" },
        { key: "9, 14", text: "9 and 14" },
        { key: "10, 15", text: "10 and 15" },
      ],
      correctOption: "8, 13",
      explanation:
        "The rule repeats (+5, +4, ÷2): 1+5=6, 6+4=10, 10÷2=5; 5+5=10, 10+4=14, 14÷2=7; 7+5=12, 12+4=16, 16÷2=8, 8+5=13. The next two numbers are 8 and 13.",
    },
    // Q46
    {
      id: "oir_dde02_q46",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 46,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy", "animal-sounds"],
      promptText: "Cow is to Moo as Bee is to ___________.",
      options: [
        { key: "1", text: "(1) Quack" },
        { key: "2", text: "(2) Cackle" },
        { key: "3", text: "(3) Buzz" },
        { key: "4", text: "(4) Sing" },
        { key: "5", text: "(5) Tweet" },
      ],
      correctOption: "3",
      explanation:
        "Moo is the sound made by a cow; Buzz (3) is the sound made by a bee.",
    },
    // Q47
    {
      id: "oir_dde02_q47",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 47,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "easy",
      tags: ["class-a-b", "letters", "stroke-count"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<path d="M26,18 V64 M56,18 L26,42 L56,64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<path d="M24,64 L41,18 L58,64 M30,48 H52" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<path d="M24,64 V18 L58,64 V18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
          ],
          [
            `<path d="M20,64 V18 L41,46 L62,18 V64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<path d="M22,18 L41,64 L60,18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<path d="M26,18 V64 H58" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
          ],
          82
        ),
        instructionHint: "Count the number of straight strokes/lines forming each letter.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Letter I with top/bottom bars)",
          svgMarkup: svgFramed(`<path d="M32,20 H68 M50,20 V80 M32,80 H68" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Letter Z)",
          svgMarkup: svgFramed(`<path d="M26,24 H74 L26,76 H74" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Letter E)",
          svgMarkup: svgFramed(`<path d="M68,20 H32 V80 H68 M32,50 H62" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Letter T)",
          svgMarkup: svgFramed(`<path d="M24,22 H76 M50,22 V80" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`),
        },
      ],
      correctOption: "1,2",
      explanation:
        "Every letter in Class A (K, A, N) is drawn with exactly 3 straight line segments. In the options, I (with top/bottom bars) and Z have 3 straight lines, whereas E has 4 and T has 2. Thus Figures (1) and (2) belong to Class A.",
    },
    // Q48
    {
      id: "oir_dde02_q48",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 48,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "hard",
      tags: ["class-a-b", "shapes", "edge-count"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<rect x="16" y="42" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="${pentPoly(56, 26, 13)}" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="16,44 16,66 40,66" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="${starPoly(4, 56, 26, 14, 4.5)}" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="${pentPoly(26, 56, 13)}" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="${hexPoly(56, 26, 13, false)}" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          [
            `<polygon points="20,18 62,18 46,41 62,64 20,64" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="41,18 33,44 18,44 18,62 64,62 64,44 49,44" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="16,22 41,38 66,22 66,46 16,46" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M26,46 A16,16 0 0,0 56,46" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          82
        ),
        instructionHint: "Compare pairs of two polygons in each box (Class A) against single/curved shapes (Class B).",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Oval & Diamond)",
          svgMarkup: svgFramed(`<ellipse cx="34" cy="70" rx="18" ry="11" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="66,20 84,38 66,56 48,38" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Pentagon & Diamond)",
          svgMarkup: svgFramed(`<polygon points="${pentPoly(32, 32, 16)}" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="68,54 84,70 68,86 52,70" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Hexagon & Notched Pentagon/Hexagon)",
          svgMarkup: svgFramed(`<polygon points="${hexPoly(38, 42, 17, false)}" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="34,42 64,28 72,42 84,56 38,80" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (6-pointed star & 5-pointed star)",
          svgMarkup: svgFramed(`<polygon points="${starPoly(6, 32, 34, 16, 8)}" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="${starPoly(5, 68, 68, 16, 6.5)}" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
      ],
      correctOption: "3,4",
      explanation:
        "Official DDE Key: Figures (3) and (4) — DDE notes each Class A frame contains two straight-edged shapes of different edge counts (unlike the curved oval in Figure 1; though note Figure 2 also shows two separate polygons of 5 and 4 sides).",
    },
    // Q49
    {
      id: "oir_dde02_q49",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 49,
      type: "verbal",
      subType: "letter_classification",
      difficulty: "medium",
      tags: ["odd-one-out", "letters"],
      promptText: "Which group of letters does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) RQNO" },
        { key: "2", text: "(2) IHFG" },
        { key: "3", text: "(3) MLJK" },
        { key: "4", text: "(4) TSPQ" },
        { key: "5", text: "(5) YXUV" },
      ],
      correctOption: "3",
      explanation:
        "All options follow (−1, −3, +1) except MLJK: R−1=Q, Q−3=N, N+1=O; I−1=H, H−3=F, F+1=G; T−1=S, S−3=P, P+1=Q; Y−1=X, X−3=U, U+1=V; whereas M−1=L, L−2=J, J+1=K. Thus (3) MLJK is different.",
    },
    // Q50
    {
      id: "oir_dde02_q50",
      source: "DDE",
      sourceBookletId: "oir-dde-02",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 1)",
      questionNumber: 50,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["word-length", "odd-one-out"],
      promptText: "Which word does not belong to the same class as the others?",
      options: [
        { key: "1", text: "(1) Knife" },
        { key: "2", text: "(2) Parrot" },
        { key: "3", text: "(3) Green" },
        { key: "4", text: "(4) Lotus" },
        { key: "5", text: "(5) Class" },
      ],
      correctOption: "2",
      explanation:
        "Knife, Green, Lotus, and Class each have 5 letters, whereas Parrot (2) has 6 letters.",
    },
  ],
};
