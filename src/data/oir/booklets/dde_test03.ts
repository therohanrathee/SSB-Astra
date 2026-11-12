import { OIRBooklet } from "../types";
import {
  svgAnalogy,
  svgCanvas,
  svgClassAB,
  svgFramed,
  svgSeries,
} from "../svgHelpers";

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

// Compact isometric-face SVG glyph helpers (authored in 110px cube scale: safe bounds -13..+13)
const S = (inner: string) => `svg:${inner}`;

// Q1 Unequally vs Equally bisected shape glyphs for 3D cubes
const q1CircleUnequalH = S(
  `<circle cx="0" cy="-1" r="7.5" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="-8" y1="4.5" x2="10" y2="4.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1CircleUnequalV = S(
  `<circle cx="0" cy="0" r="7.5" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="-2.8" y1="-9.5" x2="-2.8" y2="9.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1CircleUnequalTail = S(
  `<circle cx="0" cy="-1.5" r="7" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="-2.5" y1="-8.5" x2="-2.5" y2="10.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1TriUnequal = S(
  `<polygon points="0,-9 -8.5,7.5 8.5,7.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><line x1="-2.5" y1="-8" x2="-2.5" y2="8.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1TriEqual = S(
  `<polygon points="0,-9 -8.5,7.5 8.5,7.5" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><line x1="0" y1="-10" x2="0" y2="8.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1RectUnequalV = S(
  `<rect x="-7.5" y="-6.5" width="15" height="13" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="2.2" y1="-9" x2="2.2" y2="7" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1RectUnequalH = S(
  `<rect x="-7.5" y="-6.5" width="15" height="13" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="-8" y1="-2" x2="10" y2="-2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1ShieldUnequal = S(
  `<polygon points="-7,-6.5 7,-6.5 7,2 0,8.5 -7,2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><line x1="-9.5" y1="-2" x2="8" y2="-2" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1PentUnequal = S(
  `<polygon points="0,-8 8,-2 5.5,7 -5.5,7 -8,-2" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><line x1="-9.5" y1="-1.5" x2="9.5" y2="-1.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1CircleEqualH = S(
  `<circle cx="0" cy="0" r="7.5" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="-9.5" y1="0" x2="9.5" y2="0" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1CircleEqualV = S(
  `<circle cx="0" cy="0" r="7.5" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="0" y1="-10" x2="0" y2="10" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1RectEqualV = S(
  `<rect x="-7.5" y="-6.5" width="15" height="13" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="0" y1="-6.5" x2="0" y2="9.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1RectEqualH = S(
  `<rect x="-8" y="-6" width="16" height="12" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="-8" y1="0" x2="10.5" y2="0" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1HexEqualV = S(
  `<polygon points="0,-8.5 7.5,-4 7.5,4 0,8.5 -7.5,4 -7.5,-4" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><line x1="0" y1="-9" x2="0" y2="10.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1DiaEqualV = S(
  `<polygon points="0,-9 8,0 0,9 -8,0" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linejoin="round"/><line x1="0" y1="-10.5" x2="0" y2="10.5" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);
const q1PillEqual = S(
  `<rect x="-8" y="-6" width="16" height="11" rx="2" fill="none" stroke="currentColor" stroke-width="1.9"/><line x1="-8" y1="-0.5" x2="8" y2="-0.5" stroke="currentColor" stroke-width="1.9"/><line x1="0" y1="-6" x2="0" y2="10" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"/>`
);

// Q3 & Q4 glyphs
const gEq = S(
  `<path d="M-8-3.5H8M-8 3.5H8" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`
);
const gParSlash = S(
  `<path d="M-7-3L4-9M-4 9L7 3" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round"/>`
);
const gPlus = S(
  `<path d="M0-9V9M-9 0H9" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`
);
const gCross = S(
  `<path d="M-7-7L7 7M7-7L-7 7" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>`
);
const gArrowN = S(
  `<path d="M0 10V-9M-5-4L0-10L5-4" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>`
);
const gArrowE = S(
  `<path d="M-10 0H9M4-5L10 0L4 5" fill="none" stroke="currentColor" stroke-width="2.1" stroke-linecap="round" stroke-linejoin="round"/>`
);
const gCircle = S(
  `<circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" stroke-width="2.1"/>`
);
const gDivHollowH = S(
  `<line x1="-9" y1="0" x2="9" y2="0" stroke="currentColor" stroke-width="2"/><circle cx="0" cy="-5.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="0" cy="5.5" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/>`
);
const gDivHollowV = S(
  `<line x1="0" y1="-9" x2="0" y2="9" stroke="currentColor" stroke-width="2"/><circle cx="-5.5" cy="0" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="5.5" cy="0" r="2.2" fill="none" stroke="currentColor" stroke-width="1.7"/>`
);

// Q5 Cross-arm + migrating cup arc helper
type ArmTip = "none" | "left" | "right" | "up" | "down" | "arcOut" | "arcIn" | "tbar";
function q5Cross(
  top: ArmTip,
  right: ArmTip,
  bottom: ArmTip,
  left: ArmTip,
  size = 84
): string {
  const c = size / 2;
  const r = size * 0.25;
  const t = size * 0.11;
  const drawTip = (angle: number, tip: ArmTip): string => {
    if (tip === "none") return "";
    let g = "";
    if (tip === "right" || tip === "down") {
      // perpendicular forward (+CW relative to outward arm? We pass canonical orientation by tip name)
      g = `<line x1="0" y1="${-r}" x2="${t}" y2="${-r}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    } else if (tip === "left" || tip === "up") {
      g = `<line x1="0" y1="${-r}" x2="${-t}" y2="${-r}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    } else if (tip === "tbar") {
      g = `<line x1="${-t * 0.9}" y1="${-r}" x2="${t * 0.9}" y2="${-r}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    } else if (tip === "arcOut") {
      g = `<path d="M ${-t * 0.85},${-r - t * 0.55} Q 0,${-r + t * 0.25} ${t * 0.85},${-r - t * 0.55}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    } else if (tip === "arcIn") {
      g = `<path d="M ${-t * 0.85},${-r + t * 0.45} Q 0,${-r - t * 0.35} ${t * 0.85},${-r + t * 0.45}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>`;
    }
    return `<g transform="rotate(${angle} ${c} ${c}) translate(${c},${c})">${g}</g>`;
  };
  // Map absolute direction tips to top-arm relative clockwise/counterclockwise
  const mapTop = (tip: ArmTip): ArmTip => tip;
  const mapRight = (tip: ArmTip): ArmTip =>
    tip === "down" ? "right" : tip === "up" ? "left" : tip;
  const mapBottom = (tip: ArmTip): ArmTip =>
    tip === "left" ? "right" : tip === "right" ? "left" : tip;
  const mapLeft = (tip: ArmTip): ArmTip =>
    tip === "down" ? "left" : tip === "up" ? "right" : tip;

  return `
    <line x1="${c}" y1="${c - r}" x2="${c}" y2="${c + r}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    <line x1="${c - r}" y1="${c}" x2="${c + r}" y2="${c}" stroke="currentColor" stroke-width="2" stroke-linecap="round"/>
    ${drawTip(0, mapTop(top))}
    ${drawTip(90, mapRight(right))}
    ${drawTip(180, mapBottom(bottom))}
    ${drawTip(270, mapLeft(left))}
  `;
}

// Q7 Faceted 5-pointed star + 2 dots
function q7StarBox(
  solid: boolean,
  dotA: [number, number],
  dotB: [number, number],
  size = 84
): string {
  const c = size / 2;
  const R = size * 0.24;
  const r = size * 0.11;
  const dr = size * 0.042;
  const s = size / 100;
  const facets = solid
    ? `<polygon points="${starPoly(5, c, c, R, r)}" fill="currentColor" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>`
    : `<polygon points="${starPoly(5, c, c, R, r)}" fill="currentColor" fill-opacity="0.16" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
       ${[0, 72, 144, 216, 288]
         .map((deg) => {
           const rad = ((deg - 90) * Math.PI) / 180;
           return `<line x1="${c}" y1="${c}" x2="${(c + R * Math.cos(rad)).toFixed(1)}" y2="${(c + R * Math.sin(rad)).toFixed(1)}" stroke="currentColor" stroke-width="1.1" stroke-opacity="0.65"/>`;
         })
         .join("")}`;
  return `
    ${facets}
    <circle cx="${(dotA[0] * s).toFixed(1)}" cy="${(dotA[1] * s).toFixed(1)}" r="${dr.toFixed(1)}" fill="currentColor"/>
    <circle cx="${(dotB[0] * s).toFixed(1)}" cy="${(dotB[1] * s).toFixed(1)}" r="${dr.toFixed(1)}" fill="currentColor"/>
  `;
}

// Q14 Cross letters box
function q14Cross(
  top: string,
  right: string,
  bottom: string,
  left: string,
  size = 86
): string {
  const s = size / 100;
  const rect = (x: number, y: number, w: number, h: number, lbl: string) => `
    <rect x="${(x * s).toFixed(1)}" y="${(y * s).toFixed(1)}" width="${(w * s).toFixed(1)}" height="${(h * s).toFixed(1)}" fill="none" stroke="currentColor" stroke-width="1.5"/>
    <text x="${((x + w / 2) * s).toFixed(1)}" y="${((y + h / 2 + 4.5) * s).toFixed(1)}" text-anchor="middle" font-size="${(13 * s).toFixed(1)}" font-weight="700" fill="currentColor">${lbl}</text>
  `;
  return `
    <line x1="${(50 * s).toFixed(1)}" y1="${(28 * s).toFixed(1)}" x2="${(50 * s).toFixed(1)}" y2="${(72 * s).toFixed(1)}" stroke="currentColor" stroke-width="1.4"/>
    <line x1="${(28 * s).toFixed(1)}" y1="${(50 * s).toFixed(1)}" x2="${(72 * s).toFixed(1)}" y2="${(50 * s).toFixed(1)}" stroke="currentColor" stroke-width="1.4"/>
    ${rect(40, 8, 20, 20, top)}
    ${rect(72, 40, 20, 20, right)}
    ${rect(40, 72, 20, 20, bottom)}
    ${rect(8, 40, 20, 20, left)}
  `;
}

// Q21 Rotating arrow + curves box
function q21ArrowBox(
  angleDeg: number,
  curveSide: "none" | "E" | "NE" | "N" | "NW" | "W",
  curveCount: 0 | 1 | 2,
  size = 84
): string {
  const c = size / 2;
  const s = size / 100;
  const arrow = `<g transform="translate(${c},${c}) rotate(${angleDeg})">
    <line x1="0" y1="${19 * s}" x2="0" y2="${-18 * s}" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/>
    <polyline points="${-9 * s},${-8 * s} 0,${-19 * s} ${9 * s},${-8 * s}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>
  </g>`;

  if (curveCount === 0 || curveSide === "none") return arrow;

  let arcGroup = "";
  const arcAngle =
    curveSide === "E"
      ? 90
      : curveSide === "NE"
      ? 45
      : curveSide === "N"
      ? 0
      : curveSide === "NW"
      ? -45
      : -90;
  const rBase = 23 * s;
  const rOuter = 29 * s;
  arcGroup = `<g transform="translate(${c},${c}) rotate(${arcAngle})">
    <path d="M ${-7 * s},${-rBase} Q 0,${-rBase - 4 * s} ${7 * s},${-rBase}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
    ${
      curveCount === 2
        ? `<path d="M ${-7 * s},${-rOuter} Q 0,${-rOuter - 4 * s} ${7 * s},${-rOuter}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>`
        : ""
    }
  </g>`;
  return arrow + arcGroup;
}

// Q25 Lollipop polygon helper
function q25LollipopBox(
  shape: "pent" | "hex" | "dia" | "sq" | "pill" | "rtri" | "etri" | "rect",
  fromCorner: boolean,
  dots: 2 | 3 | 4,
  splitStems: boolean,
  size = 82
): string {
  const s = size / 100;
  let poly = "";
  if (shape === "pent") {
    poly = `<polygon points="${pentPoly(50 * s, 68 * s, 21 * s)}" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  } else if (shape === "hex") {
    poly = `<polygon points="${hexPoly(50 * s, 68 * s, 21 * s, false)}" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  } else if (shape === "dia") {
    poly = `<polygon points="${50 * s},${47 * s} ${71 * s},${68 * s} ${50 * s},${89 * s} ${29 * s},${68 * s}" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  } else if (shape === "sq") {
    poly = `<rect x="${30 * s}" y="${48 * s}" width="${40 * s}" height="${36 * s}" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  } else if (shape === "rect") {
    poly = `<rect x="${20 * s}" y="${52 * s}" width="${60 * s}" height="${28 * s}" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  } else if (shape === "pill") {
    poly = `<rect x="${20 * s}" y="${52 * s}" width="${60 * s}" height="${26 * s}" rx="${11 * s}" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  } else if (shape === "rtri") {
    poly = `<polygon points="${24 * s},${44 * s} ${78 * s},${84 * s} ${24 * s},${84 * s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`;
  } else if (shape === "etri") {
    poly = `<polygon points="${50 * s},${46 * s} ${76 * s},${84 * s} ${24 * s},${84 * s}" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`;
  }

  const rootX = fromCorner ? 50 * s : shape === "rtri" ? 50 * s : 50 * s;
  const rootY =
    shape === "rtri"
      ? 63 * s
      : shape === "sq"
      ? 48 * s
      : shape === "rect" || shape === "pill"
      ? 52 * s
      : 47 * s;

  const spreads =
    dots === 2
      ? [-14, 14]
      : dots === 3
      ? [-18, 0, 18]
      : [-21, -7, 7, 21];

  const stemsAndDots = spreads
    .map((dx, i) => {
      const rx = splitStems ? rootX + (dx * s) * 0.45 : rootX;
      const tipX = rootX + dx * s;
      const tipY = rootY - (18 + (i % 2) * 3) * s;
      return `<line x1="${rx.toFixed(1)}" y1="${rootY.toFixed(1)}" x2="${tipX.toFixed(1)}" y2="${tipY.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/>
              <circle cx="${tipX.toFixed(1)}" cy="${tipY.toFixed(1)}" r="${(3.8 * s).toFixed(1)}" fill="currentColor"/>`;
    })
    .join("");

  return poly + stemsAndDots;
}

// Q39 8-sector divided square helper
// Sector indices clockwise from 12 o'clock:
// 0=NNE, 1=ENE, 2=ESE, 3=SSE, 4=SSW, 5=WSW, 6=WNW, 7=NNW
function q39OctantBox(shaded: number[], size = 82): string {
  const pad = size * 0.1;
  const a = pad;
  const b = size - pad;
  const m = size / 2;
  const pts: Record<number, string> = {
    0: `${m},${m} ${m},${a} ${b},${a}`,
    1: `${m},${m} ${b},${a} ${b},${m}`,
    2: `${m},${m} ${b},${m} ${b},${b}`,
    3: `${m},${m} ${b},${b} ${m},${b}`,
    4: `${m},${m} ${m},${b} ${a},${b}`,
    5: `${m},${m} ${a},${b} ${a},${m}`,
    6: `${m},${m} ${a},${m} ${a},${a}`,
    7: `${m},${m} ${a},${a} ${m},${a}`,
  };
  return `
    <rect x="${a}" y="${a}" width="${b - a}" height="${b - a}" fill="none" stroke="currentColor" stroke-width="1.7"/>
    ${shaded.map((idx) => `<polygon points="${pts[idx]}" fill="currentColor"/>`).join("")}
    <line x1="${m}" y1="${a}" x2="${m}" y2="${b}" stroke="currentColor" stroke-width="1.4"/>
    <line x1="${a}" y1="${m}" x2="${b}" y2="${m}" stroke="currentColor" stroke-width="1.4"/>
    <line x1="${a}" y1="${a}" x2="${b}" y2="${b}" stroke="currentColor" stroke-width="1.4"/>
    <line x1="${a}" y1="${b}" x2="${b}" y2="${a}" stroke="currentColor" stroke-width="1.4"/>
  `;
}

// Q44 Diamond-in-square with inner symbols & 4 corner arrows
type Arr44 = "SE" | "SW" | "NE" | "NW" | "none";
function q44Box(
  centerText: string,
  tl: Arr44,
  tr: Arr44,
  br: Arr44,
  bl: Arr44,
  size = 90
): string {
  const s = size / 100;
  const arrowAt = (cx: number, cy: number, dir: Arr44) => {
    if (dir === "none") return "";
    const rot =
      dir === "NE" ? 45 : dir === "SE" ? 135 : dir === "SW" ? -135 : -45;
    return `<g transform="translate(${(cx * s).toFixed(1)},${(cy * s).toFixed(1)}) rotate(${rot})">
      <line x1="0" y1="${8 * s}" x2="0" y2="${-8 * s}" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
      <polyline points="${-4 * s},${-3 * s} 0,${-8 * s} ${4 * s},${-3 * s}" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"/>
    </g>`;
  };
  return `
    <rect x="${12 * s}" y="${12 * s}" width="${76 * s}" height="${76 * s}" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <polygon points="${50 * s},${12 * s} ${88 * s},${50 * s} ${50 * s},${88 * s} ${12 * s},${50 * s}" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <text x="${50 * s}" y="${54 * s}" text-anchor="middle" font-size="${11 * s}" font-weight="700" fill="currentColor" letter-spacing="${1.5 * s}">${centerText}</text>
    ${arrowAt(24, 24, tl)}
    ${arrowAt(76, 24, tr)}
    ${arrowAt(76, 76, br)}
    ${arrowAt(24, 76, bl)}
  `;
}

export const DDE_TEST_03: OIRBooklet = {
  id: "oir-dde-03",
  source: "DDE",
  bookletNumber: "DDE-03",
  title: "DDE OIR 20-Set Practice Paper (Set 2)",
  category: "mixed",
  totalQuestions: 50,
  durationMinutes: 20,
  markingScheme: { correct: 1, incorrect: 0 },
  description:
    "Official Set 2 (50 mixed Verbal & Non-Verbal questions) from DDE / SSBCrack 20-Set OIR Practice E-Book (Booklet 02, Set 2), rebuilt with crisp theme-aware vector diagrams, 3D isometric cubes, Class A/B dual-select visual reasoning, and independently verified keys & explanations.",
  questions: [
    // Q1
    {
      id: "oir_dde03_q01",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 1,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "bisection", "symmetry", "group-a-b"],
      promptText: "Which one of the following cubes can possibly belong to Group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { faces: { top: q1CircleUnequalH, left: q1TriUnequal, right: q1RectUnequalV } },
          { faces: { top: q1RectUnequalH, left: q1ShieldUnequal, right: q1CircleUnequalTail } },
          { faces: { top: q1TriUnequal, left: q1CircleUnequalH, right: q1PentUnequal } },
        ],
        groupB: [
          { faces: { top: q1TriEqual, left: q1CircleEqualH, right: q1RectEqualV } },
          { faces: { top: q1RectEqualH, left: q1HexEqualV, right: q1TriEqual } },
          { faces: { top: q1CircleEqualV, left: q1DiaEqualV, right: q1CircleEqualV } },
        ],
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: q1PillEqual, left: q1CircleUnequalV, right: q1DiaEqualV },
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: q1DiaEqualV, left: q1HexEqualV, right: q1RectEqualH },
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: q1TriEqual, left: q1CircleEqualV, right: q1RectEqualV },
        },
      ],
      correctOption: "1",
      explanation:
        "In Group A every figure is bisected into two unequal parts, whereas in Group B every figure is bisected into two equal halves. Among the options, only Cube 1 contains an unequally bisected circle on its front-left face (while Cubes 2 and 3 have all three faces equally bisected). Hence Cube 1 belongs to Group A.",
    },
    // Q2
    {
      id: "oir_dde03_q02",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 2,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["logic", "physics"],
      promptText:
        "Write the number of the choice that applies best to the statement given below:\n\"A boy driving a bicycle put the brake suddenly he bends forward.\"",
      options: [
        { key: "1", text: "(1) True" },
        { key: "2", text: "(2) Probable" },
        { key: "3", text: "(3) False" },
        { key: "4", text: "(4) Absurd" },
      ],
      correctOption: "1",
      explanation:
        "True (1): By Newton's first law (inertia of motion), when brakes are applied suddenly on a moving bicycle, the rider's upper body continues moving forward and bends forward.",
    },
    // Q3
    {
      id: "oir_dde03_q03",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 3,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "spatial"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No':",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: gEq, left: gPlus, right: gArrowN } },
        cubeB: { label: "Cube 2", faces: { top: gParSlash, left: gArrowN, right: gCross } },
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" },
      ],
      correctOption: "Yes",
      explanation:
        "Official DDE Key: Yes — rotating Cube 1 brings its right-face upward arrow (↑) to the front-left position, turns '=' into parallel diagonal lines '//', and exposes the adjacent/rotated cross ('+' / '×'), so both views can represent the same cube.",
    },
    // Q4
    {
      id: "oir_dde03_q04",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 4,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "spatial"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No':",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: gDivHollowH, left: gCross, right: gArrowE } },
        cubeB: { label: "Cube 2", faces: { top: gCircle, left: gDivHollowV, right: gArrowN } },
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" },
      ],
      correctOption: "No",
      explanation:
        "No — rotating the top split-dot face into Cube 2's front-left vertical split-dot face would place Cube 1's front-left ('×') onto the right face rather than an arrow, and neither view aligns the arrows consistently. Hence the two cubes are not alike.",
    },
    // Q5
    {
      id: "oir_dde03_q05",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 5,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "rotation", "addition"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            q5Cross("arcOut", "none", "none", "down"),
            q5Cross("right", "arcOut", "none", "down"),
            q5Cross("right", "down", "arcOut", "down"),
          ],
          84
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(q5Cross("tbar", "down", "left", "up", 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(q5Cross("right", "down", "left", "arcOut", 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(q5Cross("left", "arcOut", "right", "down", 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(q5Cross("right", "arcIn", "left", "down", 100)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(q5Cross("left", "down", "arcOut", "up", 100)) },
      ],
      correctOption: "2",
      explanation:
        "The curved end shifts one arm clockwise each step (Top → Right → Bottom → Left), while each arm sequentially gains a clockwise perpendicular tick (Left↓ → Top→ → Right↓ → Bottom←). Thus the next figure places the curve on the Left arm with clockwise ticks on Top, Right, and Bottom, which is Figure (2).",
    },
    // Q6
    {
      id: "oir_dde03_q06",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 6,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "counting", "shading"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<polygon points="${starPoly(4, 34, 42, 20, 6)}" fill="currentColor"/><circle cx="65" cy="24" r="7" fill="none" stroke="currentColor" stroke-width="2"/>`,
            `<polygon points="${starPoly(4, 32, 56, 15, 4.5)}" fill="currentColor"/><polygon points="${starPoly(4, 58, 34, 15, 4.5)}" fill="currentColor"/><circle cx="24" cy="24" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="62" cy="60" r="6" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="${starPoly(4, 24, 24, 12, 4)}" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="${starPoly(4, 60, 42, 12, 4)}" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="${starPoly(4, 28, 60, 12, 4)}" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="58" cy="18" r="5.5" fill="currentColor"/><circle cx="16" cy="48" r="5.5" fill="currentColor"/><circle cx="60" cy="66" r="5.5" fill="currentColor"/>`,
          ],
          [
            `<polygon points="${starPoly(4, 52, 42, 20, 6)}" fill="currentColor"/><circle cx="22" cy="26" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="22" cy="58" r="7.5" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<polygon points="${starPoly(4, 30, 34, 16, 5)}" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="${starPoly(4, 62, 22, 11, 3.5)}" fill="none" stroke="currentColor" stroke-width="1.7"/><circle cx="58" cy="56" r="8" fill="currentColor"/>`,
            `<polygon points="${starPoly(4, 44, 44, 18, 5.5)}" fill="currentColor"/><circle cx="20" cy="22" r="7" fill="currentColor"/><circle cx="66" cy="20" r="7" fill="currentColor"/><circle cx="20" cy="62" r="6.5" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="62" cy="64" r="5.5" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          82
        ),
        instructionHint: "Count total stars & circles and compare shaded vs unshaded counts.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<polygon points="${starPoly(4, 38, 42, 15, 4.5)}" fill="currentColor"/><polygon points="${starPoly(4, 68, 28, 13, 4)}" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="64" cy="66" rx="14" ry="9" fill="currentColor"/>`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<polygon points="${starPoly(4, 62, 46, 24, 7)}" fill="currentColor"/><ellipse cx="22" cy="66" rx="7" ry="10" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<polygon points="${starPoly(4, 28, 44, 18, 5)}" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="${starPoly(4, 72, 48, 16, 4.5)}" fill="none" stroke="currentColor" stroke-width="2"/><ellipse cx="52" cy="24" rx="7" ry="10" fill="currentColor"/><circle cx="52" cy="70" r="9" fill="currentColor"/>`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<polygon points="${starPoly(4, 56, 36, 16, 5)}" fill="currentColor"/><polygon points="${starPoly(4, 28, 70, 15, 4.5)}" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="${starPoly(4, 72, 74, 12, 3.5)}" fill="currentColor"/><circle cx="24" cy="26" r="9" fill="currentColor"/><circle cx="80" cy="30" r="7" fill="none" stroke="currentColor" stroke-width="2"/>`),
        },
      ],
      correctOption: "2,3",
      explanation:
        "Each frame in Class A contains an even total number of shapes (2, 4, 6) with exactly half shaded solid black and half hollow (1/2, 2/4, 3/6). Among the options, Figure 2 (1 shaded + 1 unshaded = 2) and Figure 3 (2 shaded + 2 unshaded = 4) obey this rule, whereas Figures 1 and 4 have odd totals (3 and 5). Thus (2) and (3) belong to Class A.",
    },
    // Q7
    {
      id: "oir_dde03_q07",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 7,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "stars", "dots"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            q7StarBox(true, [34, 24], [48, 79]),
            q7StarBox(false, [20, 56], [76, 62]),
            q7StarBox(true, [34, 24], [48, 79]),
            q7StarBox(false, [20, 56], [76, 62]),
            q7StarBox(true, [34, 24], [48, 79]),
          ],
          84
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(q7StarBox(false, [18, 52], [80, 68], 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(q7StarBox(false, [20, 56], [76, 62], 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(q7StarBox(true, [20, 56], [76, 62], 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(q7StarBox(false, [20, 58], [62, 80], 100)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(q7StarBox(false, [22, 48], [80, 58], 100)) },
      ],
      correctOption: "2",
      explanation:
        "The star alternates between a solid black star (steps 1, 3, 5) with dots at top-left and bottom, and a faceted light 3D star (steps 2, 4) with the two dots shifted one position anticlockwise to left and lower-right. Step 6 must therefore be the faceted light 3D star with left & lower-right dots, which is Figure (2).",
    },
    // Q8
    {
      id: "oir_dde03_q08",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 8,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "easy",
      tags: ["series", "polygons", "sides"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            `<polyline points="56,28 32,42 56,56" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<polygon points="56,26 30,42 56,58" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`,
            `<rect x="24" y="28" width="36" height="28" fill="none" stroke="currentColor" stroke-width="2"/>`,
          ],
          84
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1 (Circle)",
          svgMarkup: svgFramed(`<circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" stroke-width="2.2"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Pentagon)",
          svgMarkup: svgFramed(`<polygon points="${pentPoly(50, 52, 24)}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Rectangle)",
          svgMarkup: svgFramed(`<rect x="22" y="34" width="56" height="32" fill="none" stroke="currentColor" stroke-width="2.2"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Hexagon)",
          svgMarkup: svgFramed(`<polygon points="${hexPoly(50, 50, 24, true)}" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/>`),
        },
        {
          key: "5",
          text: "Figure 5 (Star)",
          svgMarkup: svgFramed(`<polygon points="${starPoly(6, 50, 50, 25, 11)}" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`),
        },
      ],
      correctOption: "2",
      explanation:
        "Each subsequent figure adds one straight line segment: 2 lines ('<') → 3 sides (triangle) → 4 sides (rectangle). Therefore the 4th figure must have 5 sides — a pentagon, which is Figure (2).",
    },
    // Q9
    {
      id: "oir_dde03_q09",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 9,
      type: "verbal",
      subType: "jumbled_sentence",
      difficulty: "easy",
      tags: ["sentence-rearrangement", "grammar"],
      promptText:
        "Write the LAST letter of the rearranged sentence:\n\"The teacher us to assignment complete the go before wants we home\"",
      options: [
        { key: "E", text: "E" },
        { key: "M", text: "M" },
        { key: "T", text: "T" },
        { key: "S", text: "S" },
      ],
      correctOption: "E",
      explanation:
        "Rearranging the words yields: \"The teacher wants us to complete the assignment before we go home\". Its last letter is 'E'.",
    },
    // Q10
    {
      id: "oir_dde03_q10",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 10,
      type: "verbal",
      subType: "anagram",
      difficulty: "easy",
      tags: ["anagram", "spelling"],
      promptText:
        "Write the SECOND letter of the rearranged word:\n\"What are their RAEVAEG salaries?\"",
      options: [
        { key: "V", text: "V" },
        { key: "A", text: "A" },
        { key: "E", text: "E" },
        { key: "R", text: "R" },
      ],
      correctOption: "V",
      explanation:
        "Unscrambling RAEVAEG gives AVERAGE (\"What are their average salaries?\"). Its second letter is 'V'.",
    },
    // Q11
    {
      id: "oir_dde03_q11",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 11,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy", "synonyms"],
      promptText: "Envy is to Jealous as Shrewd is to ___________.",
      options: [
        { key: "1", text: "(1) Clever" },
        { key: "2", text: "(2) Ingenuous" },
        { key: "3", text: "(3) Beginner" },
        { key: "4", text: "(4) Angry" },
        { key: "5", text: "(5) Dense" },
      ],
      correctOption: "1",
      explanation:
        "Envy and jealous are closely related in meaning (synonyms); similarly, shrewd means sharp-witted or Clever (1).",
    },
    // Q12
    {
      id: "oir_dde03_q12",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 12,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "easy",
      tags: ["analogy", "nesting", "inversion"],
      promptText: "Observe A is to B as C is to which numbered figure?",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          `<circle cx="45" cy="45" r="24" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="45,32 54,40 54,50 45,58 36,50 36,40" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
          `<polygon points="45,21 63,34 63,56 45,69 27,56 27,34" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="45" cy="45" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `<polygon points="45,19 69,66 21,66" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polygon points="37,39 53,39 53,51 45,59 37,51" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
          90
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<polygon points="50,24 72,42 72,74 28,74 28,42" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><circle cx="50" cy="54" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<polygon points="50,24 72,42 72,74 28,74 28,42" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polygon points="50,42 61,63 39,63" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="41,38 59,38 59,53 50,62 41,53" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<polygon points="28,26 72,26 72,58 50,76 28,58" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/><polygon points="50,36 60,55 40,55" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(`<circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="50" cy="50" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
      ],
      correctOption: "4",
      explanation:
        "From A to B, the inner shape enlarges to become the outer shape and the outer shape shrinks to become the inner shape (maintaining orientation). Applying the same swap to C (downward pentagon-shield inside an upward triangle) places the upward triangle inside the enlarged downward shield, which is Figure (4).",
    },
    // Q13
    {
      id: "oir_dde03_q13",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 13,
      type: "verbal",
      subType: "letter_series",
      difficulty: "medium",
      tags: ["series", "alphabets"],
      promptText:
        "Which two sets of letters will come next in the following series?\nANZ,  DPY,  GRX,  JSW,  ________,  ________.",
      options: [
        { key: "MUV, PWU", text: "MUV, PWU" },
        { key: "MUV, PXU", text: "MUV, PXU" },
        { key: "MTV, PWU", text: "MTV, PWU" },
        { key: "NUV, QWU", text: "NUV, QWU" },
      ],
      correctOption: "MUV, PWU",
      explanation:
        "Each letter position follows its own shift (+3 for 1st, +2 for 2nd starting from S in the official DDE key — note 'JSW' has S instead of T in the print set, −1 for 3rd): J+3=M, S+2=U, W−1=V → MUV; then M+3=P, U+2=W, V−1=U → PWU.",
    },
    // Q14
    {
      id: "oir_dde03_q14",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 14,
      type: "non_verbal",
      subType: "letter_figure_series",
      difficulty: "medium",
      tags: ["series", "letters", "arithmetic"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            q14Cross("K", "O", "R", "T", 86),
            q14Cross("I", "M", "P", "R", 86),
            q14Cross("F", "J", "M", "O", 86),
          ],
          86
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(q14Cross("R", "D", "F", "H", 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(q14Cross("B", "F", "I", "K", 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(q14Cross("G", "J", "N", "O", 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(q14Cross("Y", "C", "R", "T", 100)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(q14Cross("X", "V", "E", "J", 100)) },
      ],
      correctOption: "2",
      explanation:
        "All four letters in each cross decrease uniformly by 2, then 3, then 4 alphabetical steps: (K, O, R, T) − 2 = (I, M, P, R); − 3 = (F, J, M, O); − 4 = (B, F, I, K). Thus Figure (2) is next.",
    },
    // Q15
    {
      id: "oir_dde03_q15",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 15,
      type: "verbal",
      subType: "logical_order",
      difficulty: "easy",
      tags: ["logical-sequence", "recruitment"],
      promptText: "Which item will stand middle if the following are rearranged in proper order?",
      options: [
        { key: "1", text: "(1) Probation" },
        { key: "2", text: "(2) Interview" },
        { key: "3", text: "(3) Selection" },
        { key: "4", text: "(4) Appointment" },
        { key: "5", text: "(5) Advertisement" },
      ],
      correctOption: "3",
      explanation:
        "The chronological recruitment sequence is: (5) Advertisement → (2) Interview → (3) Selection → (4) Appointment → (1) Probation. The middle (3rd) item is Selection (3).",
    },
    // Q16
    {
      id: "oir_dde03_q16",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 16,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "physics", "units"],
      promptText: "Which word does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) Tesla" },
        { key: "2", text: "(2) Volt" },
        { key: "3", text: "(3) Ampere" },
        { key: "4", text: "(4) Ohm" },
        { key: "5", text: "(5) Watt" },
      ],
      correctOption: "1",
      explanation:
        "Volt, Ampere, Ohm, and Watt are SI units for electrical circuit quantities (voltage, current, resistance, power), whereas Tesla (1) is the SI unit of magnetic flux density.",
    },
    // Q17
    {
      id: "oir_dde03_q17",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 17,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "hard",
      tags: ["series", "addition", "circle-segments"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            `<line x1="42" y1="16" x2="42" y2="66" stroke="currentColor" stroke-width="1.8"/><path d="M42,16 A25,25 0 0,1 60,24" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<line x1="42" y1="16" x2="42" y2="66" stroke="currentColor" stroke-width="1.8"/><path d="M18,41 A24,24 0 0,1 66,41" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
            `<line x1="42" y1="16" x2="42" y2="68" stroke="currentColor" stroke-width="1.8"/><line x1="16" y1="42" x2="68" y2="42" stroke="currentColor" stroke-width="1.8"/><path d="M42,68 A26,26 0 1,1 68,42" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          84
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/>`
          ),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/><path d="M35,50 A15,15 0 0,0 65,50" fill="none" stroke="currentColor" stroke-width="1.8"/>`
          ),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/><path d="M62,38 A17,17 0 1,0 62,62" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="50" cy="50" r="7" fill="none" stroke="currentColor" stroke-width="1.5"/>`
          ),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/>`
          ),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="28" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="50" cy="50" r="19" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.8"/>`
          ),
        },
      ],
      correctOption: "1",
      explanation:
        "Two elements (arcs/line radii) are added at each step to progressively complete the outer circle and interior perpendicular axes. Completing the fourth outer quadrant yields the full circle with vertical and horizontal diameters — Figure (1).",
    },
    // Q18
    {
      id: "oir_dde03_q18",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 18,
      type: "verbal",
      subType: "sentence_completion",
      difficulty: "easy",
      tags: ["sentence", "grammar"],
      promptText:
        "Choose one word number from each of the following three lines to make a correct, true and meaningful sentence:\nLine 1: Break [(1) fast   (2) right   (3) left   (4) up]\nLine 2: was on the [(1) chair   (2) car   (3) table   (4) bike]\nLine 3: when she entered the dining [(1) room   (2) kitchen   (3) table   (4) door].",
      options: [
        { key: "1, 3, 1", text: "1, 3, 1 (fast, table, room)" },
        { key: "1, 1, 2", text: "1, 1, 2 (fast, chair, kitchen)" },
        { key: "4, 3, 1", text: "4, 3, 1 (up, table, room)" },
        { key: "1, 3, 3", text: "1, 3, 3 (fast, table, table)" },
      ],
      correctOption: "1, 3, 1",
      explanation:
        "Selecting (1) fast, (3) table, and (1) room forms the meaningful sentence: \"Breakfast was on the table when she entered the dining room.\"",
    },
    // Q19
    {
      id: "oir_dde03_q19",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 19,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["alphabetical", "dictionary"],
      promptText: "Write the number which will come LAST in the dictionary?",
      options: [
        { key: "1", text: "(1) Transfer" },
        { key: "2", text: "(2) Table" },
        { key: "3", text: "(3) Treatment" },
        { key: "4", text: "(4) Tribal" },
        { key: "5", text: "(5) Treatment" },
      ],
      correctOption: "4",
      explanation:
        "Alphabetical order is: Table (2) → Transfer (1) → Treatment (3/5) → Tribal (4). Since 'Tri-' follows 'Tra-' and 'Tre-', Tribal (4) comes last.",
    },
    // Q20
    {
      id: "oir_dde03_q20",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 20,
      type: "verbal",
      subType: "missing_digit_arithmetic",
      difficulty: "easy",
      tags: ["arithmetic", "subtraction"],
      promptText: "Subtract and find the digit inside the boxed [ ? ]:",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          `<text x="120" y="34" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">2 5 0 1</text>
           <text x="120" y="60" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">− x 3 x x</text>
           <line x1="22" y1="70" x2="128" y2="70" stroke="currentColor" stroke-width="1.8"/>
           <text x="58" y="96" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor">1</text>
           <rect x="61" y="77" width="22" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <text x="72" y="95" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">?</text>
           <text x="120" y="96" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">4 2</text>`,
          150,
          112
        ),
      },
      options: [
        { key: "0", text: "0" },
        { key: "1", text: "1" },
        { key: "2", text: "2" },
        { key: "3", text: "3" },
      ],
      correctOption: "1",
      explanation:
        "Units: 11 − 9 = 2 (borrowing 1 from tens); Tens: 9 − 5 = 4 (having borrowed 1 from hundreds 5 → 4); Hundreds: 4 − 3 = 1; Thousands: 2 − 1 = 1 (2501 − 1359 = 1142). Thus the boxed digit is 1.",
    },
    // Q21
    {
      id: "oir_dde03_q21",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 21,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "rotation", "arrows"],
      promptText: "Write the number of the figure which will come next in the series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            q21ArrowBox(0, "none", 0),
            q21ArrowBox(0, "E", 1),
            q21ArrowBox(-45, "NE", 2),
            q21ArrowBox(-90, "N", 1),
            q21ArrowBox(-135, "NW", 2),
          ],
          84
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(q21ArrowBox(180, "NE", 2, 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(q21ArrowBox(-45, "E", 1, 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(q21ArrowBox(180, "NE", 1, 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(q21ArrowBox(45, "NW", 1, 100)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(q21ArrowBox(180, "W", 1, 100)) },
      ],
      correctOption: "5",
      explanation:
        "From step 2 onward, the arrow rotates 45° anticlockwise each step (↑ → ↖ → ← → ↙ → ↓), while small curves stay on the arrow's local right side (rotating E → NE → N → NW → W on the screen) and alternate between 1 and 2 curves (1, 2, 1, 2, 1). Thus step 6 points straight down (↓) with 1 curve on the left side, which is Figure (5).",
    },
    // Q22
    {
      id: "oir_dde03_q22",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 22,
      type: "verbal",
      subType: "number_classification",
      difficulty: "medium",
      tags: ["numbers", "odd-one-out"],
      promptText: "Which group of numbers does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) 8122" },
        { key: "2", text: "(2) 6111" },
        { key: "3", text: "(3) 7121" },
        { key: "4", text: "(4) 9321" },
        { key: "5", text: "(5) 9513" },
      ],
      correctOption: "5",
      explanation:
        "Subtracting the last three digits from the first digit gives 3 in options (1)–(4): 8−1−2−2=3, 6−1−1−1=3, 7−1−2−1=3, 9−3−2−1=3. In (5) 9513: 9−5−1−3 = 0. Thus 9513 (5) is the odd one out.",
    },
    // Q23
    {
      id: "oir_dde03_q23",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 23,
      type: "verbal",
      subType: "missing_digit_arithmetic",
      difficulty: "easy",
      tags: ["arithmetic", "addition"],
      promptText: "Add and find the digit inside the boxed [ ? ]:",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          `<text x="116" y="34" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">4 1 0</text>
           <text x="116" y="60" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">+ 1 x x</text>
           <line x1="26" y1="70" x2="124" y2="70" stroke="currentColor" stroke-width="1.8"/>
           <rect x="38" y="77" width="22" height="24" rx="2" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <text x="49" y="95" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">?</text>
           <text x="116" y="96" text-anchor="end" font-family="monospace" font-size="18" font-weight="700" fill="currentColor" letter-spacing="6">6 7</text>`,
          150,
          112
        ),
      },
      options: [
        { key: "4", text: "4" },
        { key: "5", text: "5" },
        { key: "6", text: "6" },
        { key: "7", text: "7" },
      ],
      correctOption: "5",
      explanation:
        "Units: 0 + 7 = 7; Tens: 1 + 5 = 6 (no carry into hundreds); Hundreds: 4 + 1 = 5 (410 + 157 = 567). Thus the boxed digit is 5.",
    },
    // Q24
    {
      id: "oir_dde03_q24",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 24,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "easy",
      tags: ["series", "triads", "shading"],
      promptText: "Write the number of the figure which will come next in the series (to complete the 3rd triad):",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          `<circle cx="24" cy="40" r="8" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <circle cx="56" cy="36" r="16" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <circle cx="88" cy="40" r="8" fill="currentColor"/>
           <polygon points="128,31 119,47 137,47" fill="currentColor"/>
           <polygon points="164,20 147,50 181,50" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <polygon points="198,31 189,47 207,47" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <rect x="232" y="32" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.7"/>
           <text x="268" y="45" font-size="16" font-weight="700" fill="currentColor">?</text>`,
          292,
          72
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<rect x="24" y="34" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.9"/><rect x="64" y="48" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<rect x="24" y="34" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.9"/><rect x="64" y="48" width="16" height="16" fill="currentColor"/>`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<polygon points="40,34 22,66 58,66" fill="none" stroke="currentColor" stroke-width="1.9"/><polygon points="71,48 62,64 80,64" fill="currentColor"/>`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<rect x="20" y="48" width="16" height="16" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="44" y="34" width="32" height="32" fill="currentColor"/>`),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(`<polygon points="40,34 22,66 58,66" fill="currentColor"/><polygon points="71,48 62,64 80,64" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
      ],
      correctOption: "2",
      explanation:
        "Each triad shows [small, large, small] of the same shape, with one small shape shaded alternating right → left → right (Triad 1 right circle shaded; Triad 2 left triangle shaded; Triad 3 right square shaded). Completing Triad 3 requires a large white square followed by a small solid black square, which is Figure (2).",
    },
    // Q25
    {
      id: "oir_dde03_q25",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 25,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "corners", "edges"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            q25LollipopBox("pent", true, 2, false, 82),
            q25LollipopBox("hex", true, 3, false, 82),
            q25LollipopBox("dia", true, 4, false, 82),
          ],
          [
            q25LollipopBox("sq", false, 2, true, 82),
            q25LollipopBox("pill", false, 3, true, 82),
            q25LollipopBox("rtri", false, 3, true, 82),
          ],
          82
        ),
        instructionHint: "Check where the dot-bearing stems attach to each polygon.",
      },
      selectCount: 2,
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(q25LollipopBox("etri", true, 2, false, 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(q25LollipopBox("rtri", false, 2, false, 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(q25LollipopBox("rect", false, 2, false, 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(q25LollipopBox("dia", true, 2, false, 100)) },
      ],
      correctOption: "1,4",
      explanation:
        "In Class A all stems grow outward from a vertex/corner of the shape, whereas in Class B they emerge from a flat edge/side. In the options, Figure 1 (triangle top corner) and Figure 4 (diamond top corner) share Class A's property.",
    },
    // Q26
    {
      id: "oir_dde03_q26",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 26,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["alphabetical", "dictionary"],
      promptText: "Write the number of the word which will come last in the dictionary?",
      options: [
        { key: "1", text: "(1) Letter" },
        { key: "2", text: "(2) Engine" },
        { key: "3", text: "(3) Pen" },
        { key: "4", text: "(4) Required" },
      ],
      correctOption: "4",
      explanation:
        "Alphabetical order: Engine (2) → Letter (1) → Pen (3) → Required (4). Hence Required (4) comes last.",
    },
    // Q27
    {
      id: "oir_dde03_q27",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 27,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["alphabetical", "dictionary"],
      promptText: "Write the number of the word which will come last in the dictionary?",
      options: [
        { key: "1", text: "(1) Contest" },
        { key: "2", text: "(2) Cool" },
        { key: "3", text: "(3) Concentration" },
        { key: "4", text: "(4) Convocation" },
      ],
      correctOption: "2",
      explanation:
        "Alphabetical order: Concentration (3) → Contest (1) → Convocation (4) → Cool (2), since 'Coo-' comes after 'Con-'. Hence Cool (2) comes last.",
    },
    // Q28
    {
      id: "oir_dde03_q28",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 28,
      type: "verbal",
      subType: "number_counting",
      difficulty: "easy",
      tags: ["counting", "observation"],
      promptText:
        "How many 3’s come just after 4 in the following numbers?\n1 2 3 4 3 5 8 2 6 8 9 6 2 5 4 3 8 6 1 3 7 8 2 6 5 4 3 1 7 9 5 2 4 2 2 4 2 6 9 8",
      options: [
        { key: "1", text: "(1) 3" },
        { key: "2", text: "(2) 5" },
        { key: "3", text: "(3) 4" },
        { key: "4", text: "(4) 7" },
      ],
      correctOption: "1",
      explanation:
        "Scanning for the sequence '4 3': [1 2 3 (4 3) 5 8 2 6 8 9 6 2 5 (4 3) 8 6 1 3 7 8 2 6 5 (4 3) 1 7 9 5 2 4 2 2 4 2 6 9 8]. There are 3 such occurrences. Option (1) is correct.",
    },
    // Q29
    {
      id: "oir_dde03_q29",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 29,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["alphabetical", "dictionary"],
      promptText: "Write the number of the word which will come last in the dictionary?",
      options: [
        { key: "1", text: "(1) Groups" },
        { key: "2", text: "(2) Property" },
        { key: "3", text: "(3) Determining" },
        { key: "4", text: "(4) Between" },
      ],
      correctOption: "2",
      explanation:
        "Alphabetical order: Between (4) → Determining (3) → Groups (1) → Property (2). Thus Property (2) comes last.",
    },
    // Q30
    {
      id: "oir_dde03_q30",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 30,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["alphabetical", "dictionary"],
      promptText: "Write the number of the word which will come last in the dictionary?",
      options: [
        { key: "1", text: "(1) Pairs" },
        { key: "2", text: "(2) Letters" },
        { key: "3", text: "(3) Forms" },
        { key: "4", text: "(4) Except" },
      ],
      correctOption: "1",
      explanation:
        "Alphabetical order: Except (4) → Forms (3) → Letters (2) → Pairs (1). Thus Pairs (1) comes last.",
    },
    // Q31
    {
      id: "oir_dde03_q31",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 31,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "medium",
      tags: ["comprehension", "inference"],
      promptText:
        "Read the statement below and choose the reason that best reflects the intention of the writer:\n\"Some men are definitely intelligent, others are definitely not intelligent, but of intermediate men, we should say, 'intelligent'? Yes, I think, so or no, I shouldn't be inclined to call him intelligent.\"",
      options: [
        {
          key: "1",
          text: "(1) To call men intelligent who are not strikingly so must be to use the concept with undue imprecision",
        },
        { key: "2", text: "(2) Every empirical concept has a degree of vagueness" },
        { key: "3", text: "(3) Calling someone intelligent or not depends upon one's whim" },
        { key: "4", text: "(4) There is no need to be as indecisive as the writer of the above" },
      ],
      correctOption: "1",
      explanation:
        "The writer closes by stating he would not be inclined to call an intermediate man 'intelligent', matching (1): applying 'intelligent' to borderline cases uses the concept with undue imprecision.",
    },
    // Q32
    {
      id: "oir_dde03_q32",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 32,
      type: "verbal",
      subType: "dictionary_order",
      difficulty: "easy",
      tags: ["alphabetical", "dictionary"],
      promptText: "Write the number of the word which will come last in the dictionary?",
      options: [
        { key: "1", text: "(1) Contains" },
        { key: "2", text: "(2) Consecutive" },
        { key: "3", text: "(3) Alternatives" },
        { key: "4", text: "(4) Sparrow" },
      ],
      correctOption: "4",
      explanation:
        "Alphabetical order: Alternatives (3) → Consecutive (2) → Contains (1) → Sparrow (4). Thus Sparrow (4) comes last.",
    },
    // Q33
    {
      id: "oir_dde03_q33",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 33,
      type: "verbal",
      subType: "arithmetic_counting",
      difficulty: "medium",
      tags: ["arithmetic", "digits"],
      promptText: "The total number of digits used in numbering the pages of a book having 366 pages is:",
      options: [
        { key: "1", text: "(1) 732" },
        { key: "2", text: "(2) 990" },
        { key: "3", text: "(3) 1098" },
        { key: "4", text: "(4) 1305" },
      ],
      correctOption: "2",
      explanation:
        "1-digit pages (1–9): 9 × 1 = 9; 2-digit pages (10–99): 90 × 2 = 180; 3-digit pages (100–366): 267 × 3 = 801. Total = 9 + 180 + 801 = 990 digits. Option (2) is correct.",
    },
    // Q34
    {
      id: "oir_dde03_q34",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 34,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "triangles", "vowels"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<polygon points="14,16 14,44 36,44" fill="currentColor"/><polygon points="52,44 52,70 72,70" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="48" y="34" font-size="18" font-weight="700" fill="currentColor">e</text><text x="20" y="72" font-size="18" font-weight="700" fill="currentColor">a</text>`,
            `<polygon points="14,32 14,58 34,58" fill="currentColor"/><polygon points="22,12 22,32 38,32" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="44,12 44,44 68,44" fill="currentColor"/><polygon points="14,64 14,76 28,76" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="36,52 36,64 50,64" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="56,52 56,74 74,74" fill="currentColor"/><text x="68" y="32" font-size="18" font-weight="700" fill="currentColor">i</text>`,
            `<polygon points="18,14 18,38 36,38" fill="currentColor"/><polygon points="54,18 42,38 66,38" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="22,48 12,68 32,68" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="54,38 54,74 76,74" fill="currentColor"/><text x="40" y="54" font-size="18" font-weight="700" fill="currentColor">o</text>`,
          ],
          [
            `<polygon points="20,16 10,36 30,36" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="46,16 46,38 64,38" fill="currentColor"/><polygon points="18,44 18,68 38,68" fill="currentColor"/><polygon points="42,46 32,66 52,66" fill="none" stroke="currentColor" stroke-width="1.7"/><text x="34" y="34" font-size="17" font-weight="700" fill="currentColor">t</text>`,
            `<polygon points="38,20 26,42 50,42" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="22,46 22,74 48,74" fill="currentColor"/><polygon points="54,50 54,72 74,72" fill="currentColor"/><text x="12" y="26" font-size="17" font-weight="700" fill="currentColor">u</text><text x="58" y="38" font-size="17" font-weight="700" fill="currentColor">m</text>`,
            `<polygon points="34,14 34,54 68,54" fill="currentColor"/><polygon points="26,56 20,72 32,72" fill="none" stroke="currentColor" stroke-width="1.7"/><polygon points="62,56 56,72 68,72" fill="none" stroke="currentColor" stroke-width="1.7"/><text x="12" y="42" font-size="17" font-weight="700" fill="currentColor">n</text>`,
          ],
          82
        ),
        instructionHint: "Compare triangle counts (total vs shaded) and letters (vowels vs consonants).",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<text x="48" y="34" font-size="22" font-weight="700" fill="currentColor">u</text><polygon points="22,42 46,24 46,42" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="74,24 64,58 84,58" fill="currentColor"/><polygon points="22,52 14,82 30,82" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="50,48 40,82 60,82" fill="currentColor"/>`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<polygon points="22,16 14,34 30,34" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="76,16 68,34 84,34" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="50,18 34,56 66,56" fill="currentColor"/><polygon points="26,64 16,80 36,80" fill="currentColor"/><polygon points="76,58 66,80 86,80" fill="currentColor"/><text x="16" y="60" font-size="20" font-weight="700" fill="currentColor">y</text>`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<text x="34" y="34" font-size="20" font-weight="700" fill="currentColor">i</text><text x="58" y="34" font-size="20" font-weight="700" fill="currentColor">e</text><polygon points="26,40 16,80 36,80" fill="currentColor"/><polygon points="72,40 62,80 82,80" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<polygon points="18,34 18,62 42,62" fill="currentColor"/><polygon points="48,26 48,54 74,54" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="56,64 56,84 84,84" fill="currentColor"/><text x="72" y="36" font-size="20" font-weight="700" fill="currentColor">o</text>`),
        },
      ],
      correctOption: "1,3",
      explanation:
        "Class A pairs an even number of triangles (half shaded, half hollow) exclusively with lowercase vowels (a, e, i, o). In the options, Figure 1 (u; 2 shaded + 2 hollow = 4 triangles) and Figure 3 (i, e; 1 shaded + 1 hollow = 2 triangles) satisfy both rules. Hence (1) and (3) belong to Class A.",
    },
    // Q35
    {
      id: "oir_dde03_q35",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 35,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "coding", "alphabet-positions"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          `<text x="115" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Class A</text>
           <rect x="10" y="28" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="45" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">poi</text>
           <rect x="80" y="28" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="115" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">111221</text>
           <rect x="150" y="28" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="185" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">ytu</text>
           <rect x="10" y="52" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="45" y="69" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">16159</text>
           <rect x="80" y="52" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="115" y="69" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">klu</text>
           <rect x="150" y="52" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="185" y="69" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">252021</text>

           <text x="355" y="18" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">Class B</text>
           <rect x="250" y="28" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="285" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">112233</text>
           <rect x="320" y="28" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="355" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">fgg</text>
           <rect x="390" y="28" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="425" y="45" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">12234</text>
           <rect x="250" y="52" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="285" y="69" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">rty</text>
           <rect x="320" y="52" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="355" y="69" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">23211</text>
           <rect x="390" y="52" width="70" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>
           <text x="425" y="69" text-anchor="middle" font-size="12" font-weight="600" fill="currentColor">dsg</text>`,
          470,
          86
        ),
        instructionHint: "Match each 3-letter group with its alphabetical position code (A=1 … Z=26).",
      },
      selectCount: 2,
      options: [
        { key: "1", text: "1: dgg / 477" },
        { key: "2", text: "2: sdf / 34563" },
        { key: "3", text: "3: wer / 868686" },
        { key: "4", text: "4: nfg / 1476" },
      ],
      correctOption: "1,4",
      explanation:
        "In Class A every triad encodes its exact alphabetical letter positions A=1…Z=26 (poi → 16-15-9; klu → 11-12-21; ytu → 25-20-21). In the options, 1 matches (d=4, g=7, g=7 → 477) and 4 is the official key's second match (n=14, f=6, g=7 — note '1476' has the 6 and 7 transposed for nfg/ngf in the print edition, while 2 and 3 are wholly unrelated numbers). Thus (1) and (4) belong to Class A.",
    },
    // Q36
    {
      id: "oir_dde03_q36",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 36,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "medium",
      tags: ["analogy", "polygons", "radial-pins"],
      promptText: "Observe A is to B as C is to which numbered figure?",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          `<polygon points="${hexPoly(45, 45, 16, true)}" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `<polygon points="${hexPoly(45, 45, 16, true)}" fill="none" stroke="currentColor" stroke-width="1.8"/>${[0, 60, 120, 180, 240, 300]
            .map((a) => {
              const r = ((a + 30) * Math.PI) / 180;
              const x = 45 + 10.5 * Math.cos(r);
              const y = 45 + 10.5 * Math.sin(r);
              return `<line x1="45" y1="45" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-width="1.4"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="currentColor"/>`;
            })
            .join("")}`,
          `<polygon points="45,27 65,45 45,63 25,45" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          90
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<rect x="28" y="30" width="44" height="40" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="37" y="39" width="26" height="22" fill="none" stroke="currentColor" stroke-width="1.5"/>${[45, 135, 225, 315].map((a) => { const r = (a * Math.PI) / 180; const x = 50 + 8 * Math.cos(r); const y = 50 + 8 * Math.sin(r); return `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-width="1.4"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="currentColor"/>`; }).join("")}`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<polygon points="50,24 76,50 50,76 24,50" fill="none" stroke="currentColor" stroke-width="1.9"/>${[45, 135, 225, 315].map((a) => { const r = (a * Math.PI) / 180; const x = 50 + 13 * Math.cos(r); const y = 50 + 13 * Math.sin(r); return `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="currentColor"/>`; }).join("")}`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<polygon points="50,20 80,50 50,80 20,50" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="38" y="38" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.4"/>${[45, 135, 225, 315].map((a) => { const r = (a * Math.PI) / 180; const x = 50 + 7.5 * Math.cos(r); const y = 50 + 7.5 * Math.sin(r); return `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-width="1.4"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2" fill="currentColor"/>`; }).join("")}`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<rect x="30" y="32" width="40" height="36" fill="none" stroke="currentColor" stroke-width="1.8"/>${[0, 90, 180, 270].map((a) => { const r = (a * Math.PI) / 180; const x = 50 + 13 * Math.cos(r); const y = 50 + 13 * Math.sin(r); return `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="currentColor"/>`; }).join("")}`),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(`<polygon points="50,24 76,50 50,76 24,50" fill="none" stroke="currentColor" stroke-width="1.9"/>${[0, 90, 180, 270].map((a) => { const r = (a * Math.PI) / 180; const x = 50 + 14 * Math.cos(r); const y = 50 + 14 * Math.sin(r); return `<line x1="50" y1="50" x2="${x.toFixed(1)}" y2="${y.toFixed(1)}" stroke="currentColor" stroke-width="1.5"/><circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="2.6" fill="currentColor"/>`; }).join("")}`),
        },
      ],
      correctOption: "2",
      explanation:
        "From A to B, the 6-sided hexagon receives 6 dot-headed pins radiating from the center toward its 6 sides. Similarly, C's 4-sided diamond receives 4 dot-headed pins pointing toward its 4 sides (diagonal '×' directions inside the diamond), which is Figure (2).",
    },
    // Q37
    {
      id: "oir_dde03_q37",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 37,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "medium",
      tags: ["analogy", "antonyms", "vocabulary"],
      promptText: "Quixotic is to pragmatic as murky is to ___________.",
      options: [
        { key: "1", text: "(1) Consider" },
        { key: "2", text: "(2) Clear" },
        { key: "3", text: "(3) Maiden" },
        { key: "4", text: "(4) Angel" },
        { key: "5", text: "(5) Enlighten" },
      ],
      correctOption: "2",
      explanation:
        "Quixotic (impractically idealistic) and pragmatic (practical) are antonyms. Similarly, the antonym of murky (cloudy/obscure) is Clear (2).",
    },
    // Q38
    {
      id: "oir_dde03_q38",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 38,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "letters", "stroke-count"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<path d="M24,64 V18 H56 V40 H24 L56,64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<path d="M24,64 L41,18 L58,64 M30,48 H52" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
            `<path d="M24,64 V18 L58,64 V18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
          ],
          [
            `<path d="M24,64 V18 H54 L36,41 L56,64 H24 Z" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linejoin="round"/><line x1="24" y1="41" x2="36" y2="41" stroke="currentColor" stroke-width="2.3"/>`,
            `<rect x="24" y="20" width="34" height="42" fill="none" stroke="currentColor" stroke-width="2.4"/>`,
            `<path d="M22,64 V18 L41,44 L60,18 V64" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`,
          ],
          82
        ),
        instructionHint: "Count the number of straight line segments making each angular letter.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (Letter F)",
          svgMarkup: svgFramed(`<path d="M32,80 V22 H70 M32,50 H62" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`),
        },
        {
          key: "2",
          text: "Figure 2 (Letter I with top/bottom bars)",
          svgMarkup: svgFramed(`<path d="M30,22 H70 M50,22 V78 M30,78 H70" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`),
        },
        {
          key: "3",
          text: "Figure 3 (Angular Letter P)",
          svgMarkup: svgFramed(`<path d="M32,80 V22 H68 V52 H32" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"/>`),
        },
        {
          key: "4",
          text: "Figure 4 (Square O)",
          svgMarkup: svgFramed(`<rect x="26" y="24" width="48" height="52" fill="none" stroke="currentColor" stroke-width="2.6"/>`),
        },
      ],
      correctOption: "1,2",
      explanation:
        "Each letter in Class A is drawn with an odd number of straight line segments (block R = 5, A = 3, N = 3), whereas Class B letters use an even number of segments (block B = 6, square O = 4, M = 4). In the options, F (3 lines) and barred I (3 lines) are odd, while block P (4) and square O (4) are even. Thus (1) and (2) belong to Class A.",
    },
    // Q39
    {
      id: "oir_dde03_q39",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 39,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "hard",
      tags: ["class-a-b", "symmetry", "triangles"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            q39OctantBox([0, 4], 82),
            q39OctantBox([7, 3], 82),
            q39OctantBox([7, 5, 1, 3], 82),
          ],
          [
            q39OctantBox([0, 5], 82),
            q39OctantBox([7, 4], 82),
            q39OctantBox([7, 5, 2], 82),
          ],
          82
        ),
        instructionHint: "Check whether shaded triangles come in diagonally opposite pairs.",
      },
      selectCount: 2,
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(q39OctantBox([1, 5], 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(q39OctantBox([6, 0, 2, 4], 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(q39OctantBox([6, 4, 1, 2], 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(q39OctantBox([6, 0, 2], 100)) },
      ],
      correctOption: "1,2",
      explanation:
        "In Class A, every shaded triangle is paired with its exact diagonally opposite triangle across the center (even totals with 180° point symmetry). Only Figure 1 (opposite pair 1 & 5) and Figure 2 (opposite pairs 0 & 4 plus 2 & 6) preserve opposite pairing. Hence (1) and (2) belong to Class A.",
    },
    // Q40
    {
      id: "oir_dde03_q40",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 40,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "chemistry"],
      promptText: "Which word does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) Neon" },
        { key: "2", text: "(2) Silicon" },
        { key: "3", text: "(3) Xenon" },
        { key: "4", text: "(4) Krypton" },
        { key: "5", text: "(5) Helium" },
      ],
      correctOption: "2",
      explanation:
        "Neon, Xenon, Krypton, and Helium are all noble gases (Group 18), whereas Silicon (2) is a solid metalloid/semiconductor (Group 14).",
    },
    // Q41
    {
      id: "oir_dde03_q41",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 41,
      type: "verbal",
      subType: "anagram",
      difficulty: "easy",
      tags: ["anagram", "spelling"],
      promptText:
        "Write the SECOND letter of the rearranged word:\n\"I made DNSEIRF with many people on the train.\"",
      options: [
        { key: "R", text: "R" },
        { key: "F", text: "F" },
        { key: "I", text: "I" },
        { key: "E", text: "E" },
      ],
      correctOption: "R",
      explanation:
        "Unscrambling DNSEIRF gives FRIENDS (\"I made FRIENDS with many people on the train.\"). Its second letter is 'R'.",
    },
    // Q42
    {
      id: "oir_dde03_q42",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 42,
      type: "verbal",
      subType: "jumbled_sentence",
      difficulty: "easy",
      tags: ["sentence-rearrangement", "grammar"],
      promptText:
        "Write the LAST letter of the rearranged sentence:\n\"His medication mother advised to take without Rohan fail\"",
      options: [
        { key: "L", text: "L" },
        { key: "N", text: "N" },
        { key: "E", text: "E" },
        { key: "I", text: "I" },
      ],
      correctOption: "L",
      explanation:
        "Rearranging the words gives: \"Mother advised Rohan to take his medication without fail.\" Its last letter is 'L'.",
    },
    // Q43
    {
      id: "oir_dde03_q43",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 43,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "easy",
      tags: ["analogy", "shading"],
      promptText: "Observe A is to B as C is to which numbered figure?",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          `<circle cx="45" cy="45" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          `<circle cx="45" cy="45" r="10" fill="currentColor"/>`,
          `<path d="M29,31 H61 M45,31 L34,47 H56 Z M45,47 L31,64 H59 Z" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>`,
          90
        ),
      },
      options: [
        {
          key: "1",
          text: "Figure 1",
          svgMarkup: svgFramed(`<line x1="30" y1="30" x2="70" y2="30" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/><polygon points="34,36 66,36 50,53" fill="currentColor"/><polygon points="50,50 32,74 68,74" fill="currentColor"/>`),
        },
        {
          key: "2",
          text: "Figure 2",
          svgMarkup: svgFramed(`<polygon points="50,24 68,54 50,76 32,54" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="50,24 32,54 50,54" fill="currentColor"/><polygon points="50,54 68,54 50,76" fill="currentColor"/>`),
        },
        {
          key: "3",
          text: "Figure 3",
          svgMarkup: svgFramed(`<rect x="33" y="45" width="34" height="30" fill="currentColor"/><polygon points="50,24 67,45 33,45" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "4",
          text: "Figure 4",
          svgMarkup: svgFramed(`<path d="M32,68 A18,18 0 0,1 68,68" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,36 36,54 64,54" fill="currentColor"/><circle cx="50" cy="64" r="3" fill="currentColor"/>`),
        },
        {
          key: "5",
          text: "Figure 5",
          svgMarkup: svgFramed(`<circle cx="50" cy="36" r="10" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="50,46 34,74 66,74" fill="currentColor"/>`),
        },
      ],
      correctOption: "1",
      explanation:
        "From A to B, the hollow shape becomes completely solid shaded while keeping its exact form and orientation. Filling C's hourglass-and-bar silhouette solid black yields Figure (1).",
    },
    // Q44
    {
      id: "oir_dde03_q44",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 44,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "hard",
      tags: ["analogy", "arrows", "inversion"],
      promptText: "Observe A is to B as C is to which numbered figure?",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy(
          q44Box("++", "SE", "NE", "SE", "NE", 90),
          q44Box("+", "none", "SW", "none", "SW", 90),
          q44Box("oooo", "SE", "SW", "SE", "SW", 90),
          90
        ),
      },
      options: [
        { key: "1", text: "Figure 1", svgMarkup: svgFramed(q44Box("ooo", "none", "SW", "none", "SW", 100)) },
        { key: "2", text: "Figure 2", svgMarkup: svgFramed(q44Box("oo", "none", "NE", "none", "NE", 100)) },
        { key: "3", text: "Figure 3", svgMarkup: svgFramed(q44Box("ooo", "none", "SW", "none", "NE", 100)) },
        { key: "4", text: "Figure 4", svgMarkup: svgFramed(q44Box("oo", "none", "SW", "none", "NE", 100)) },
        { key: "5", text: "Figure 5", svgMarkup: svgFramed(q44Box("o", "none", "NE", "none", "NE", 100)) },
      ],
      correctOption: "2",
      explanation:
        "From A to B, the top-left and bottom-right corner arrows are deleted, both remaining corner arrows (top-right and bottom-left) reverse direction, and the interior count halves (2 '+' → 1 '+'). Applying this to C deletes TL & BR, reverses TR & BL from '↙' to '↗', and halves 'oooo' to 'oo' — Figure (2).",
    },
    // Q45
    {
      id: "oir_dde03_q45",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 45,
      type: "verbal",
      subType: "number_series",
      difficulty: "easy",
      tags: ["series", "numbers"],
      promptText:
        "Which two numbers will come next in the following series?\n31,  29,  24,  ________,  ________.",
      options: [
        { key: "22, 17", text: "22, 17" },
        { key: "21, 16", text: "21, 16" },
        { key: "22, 19", text: "22, 19" },
        { key: "19, 14", text: "19, 14" },
      ],
      correctOption: "22, 17",
      explanation:
        "Alternating subtraction of 2 and 5: 31 − 2 = 29; 29 − 5 = 24; 24 − 2 = 22; 22 − 5 = 17. Hence the next two numbers are 22, 17.",
    },
    // Q46
    {
      id: "oir_dde03_q46",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 46,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy", "categories"],
      promptText: "Salsa is to Dance as Rock is to ___________.",
      options: [
        { key: "1", text: "(1) Cuisine" },
        { key: "2", text: "(2) Music" },
        { key: "3", text: "(3) Stone" },
        { key: "4", text: "(4) Singing" },
        { key: "5", text: "(5) Bike" },
      ],
      correctOption: "2",
      explanation:
        "Salsa is a style of Dance; similarly, Rock is a genre of Music (2).",
    },
    // Q47
    {
      id: "oir_dde03_q47",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 47,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "symmetry", "multiples-of-29"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<circle cx="48" cy="40" r="18" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="35" y1="53" x2="61" y2="27" stroke="currentColor" stroke-width="1.8"/><text x="14" y="72" font-size="12" font-weight="700" fill="currentColor">58</text>`,
            `<rect x="20" y="20" width="44" height="36" rx="8" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="22" y1="54" x2="62" y2="22" stroke="currentColor" stroke-width="1.8"/><text x="34" y="42" font-size="12" font-weight="700" fill="currentColor">29</text>`,
            `<polygon points="${pentPoly(48, 42, 19)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="48" y1="23" x2="59" y2="57" stroke="currentColor" stroke-width="1.6"/><text x="12" y="70" font-size="12" font-weight="700" fill="currentColor">87</text>`,
          ],
          [
            `<polygon points="${starPoly(4, 48, 42, 18, 5)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="32" y1="45" x2="64" y2="45" stroke="currentColor" stroke-width="1.6"/><text x="12" y="70" font-size="12" font-weight="700" fill="currentColor">78</text>`,
            `<polygon points="${hexPoly(44, 42, 20, false)}" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="25" y1="54" x2="63" y2="54" stroke="currentColor" stroke-width="1.7"/><text x="44" y="44" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">92</text>`,
            `<polygon points="48,20 68,62 28,62" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="34" y1="52" x2="60" y2="34" stroke="currentColor" stroke-width="1.7"/><text x="14" y="34" font-size="12" font-weight="700" fill="currentColor">85</text>`,
          ],
          82
        ),
        instructionHint: "Check both the symmetry of the cut and the divisibility of each number.",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (116)",
          svgMarkup: svgFramed(`<polygon points="50,24 76,50 50,76 24,50" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="24" y1="50" x2="76" y2="50" stroke="currentColor" stroke-width="1.8"/><text x="16" y="28" font-size="14" font-weight="700" fill="currentColor">116</text>`),
        },
        {
          key: "2",
          text: "Figure 2 (145)",
          svgMarkup: svgFramed(`<polygon points="24,26 76,74 24,74" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="24" y1="74" x2="50" y2="50" stroke="currentColor" stroke-width="1.8"/><text x="58" y="34" font-size="14" font-weight="700" fill="currentColor">145</text>`),
        },
        {
          key: "3",
          text: "Figure 3 (453)",
          svgMarkup: svgFramed(`<rect x="26" y="26" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="26" y1="74" x2="52" y2="26" stroke="currentColor" stroke-width="1.8"/><text x="54" y="64" font-size="14" font-weight="700" fill="currentColor">453</text>`),
        },
        {
          key: "4",
          text: "Figure 4 (23)",
          svgMarkup: svgFramed(`<polygon points="52,24 76,74 28,74" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="28" y1="74" x2="66" y2="54" stroke="currentColor" stroke-width="1.8"/><text x="16" y="34" font-size="14" font-weight="700" fill="currentColor">23</text>`),
        },
      ],
      correctOption: "1,2",
      explanation:
        "In Class A every shape is bisected symmetrically into equal halves and paired with a multiple of 29 (58 = 29×2, 29 = 29×1, 87 = 29×3). In the options, Figure 1 (116 = 29×4; horizontal bisector) and Figure 2 (145 = 29×5; equal-half altitude) satisfy both rules. Hence (1) and (2) belong to Class A.",
    },
    // Q48
    {
      id: "oir_dde03_q48",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 48,
      type: "non_verbal",
      subType: "figure_group_classification_two",
      difficulty: "medium",
      tags: ["class-a-b", "symmetry", "vowels"],
      promptText: "Which two of the following figures belong to Class A?",
      figures: {
        type: "svg",
        svgMarkup: svgClassAB(
          [
            `<rect x="3" y="3" width="76" height="76" rx="4" fill="#111827"/><circle cx="41" cy="41" r="22" fill="#ffffff" stroke="#ffffff" stroke-width="1.5"/><line x1="25" y1="57" x2="57" y2="25" stroke="#111827" stroke-width="1.8"/><text x="31" y="39" font-size="15" font-weight="700" fill="#111827">e</text>`,
            `<rect x="3" y="3" width="76" height="76" rx="4" fill="#111827"/><rect x="16" y="18" width="50" height="46" rx="10" fill="#ffffff"/><line x1="18" y1="60" x2="64" y2="22" stroke="#111827" stroke-width="1.8"/><text x="41" y="53" text-anchor="middle" font-size="15" font-weight="700" fill="#111827">o</text>`,
            `<rect x="3" y="3" width="76" height="76" rx="4" fill="#111827"/><polygon points="${pentPoly(41, 42, 23)}" fill="#ffffff"/><line x1="41" y1="19" x2="54" y2="61" stroke="#111827" stroke-width="1.8"/><text x="29" y="49" font-size="15" font-weight="700" fill="#111827">i</text>`,
          ],
          [
            `<rect x="3" y="3" width="76" height="76" rx="4" fill="#111827"/><polygon points="${starPoly(4, 41, 41, 22, 6)}" fill="#ffffff"/><line x1="22" y1="45" x2="60" y2="45" stroke="#111827" stroke-width="1.8"/>`,
            `<rect x="3" y="3" width="76" height="76" rx="4" fill="#111827"/><polygon points="${hexPoly(41, 41, 24, false)}" fill="#ffffff"/><line x1="18" y1="54" x2="64" y2="54" stroke="#111827" stroke-width="1.8"/><text x="41" y="45" text-anchor="middle" font-size="15" font-weight="700" fill="#111827">p</text>`,
            `<rect x="3" y="3" width="76" height="76" rx="4" fill="#111827"/><polygon points="41,16 64,62 18,62" fill="#ffffff"/><line x1="25" y1="53" x2="55" y2="33" stroke="#111827" stroke-width="1.8"/><text x="43" y="58" font-size="15" font-weight="700" fill="#111827">n</text>`,
          ],
          82
        ),
        instructionHint: "Compare both bisection symmetry and the letter inside (vowel vs consonant).",
      },
      selectCount: 2,
      options: [
        {
          key: "1",
          text: "Figure 1 (a)",
          svgMarkup: svgFramed(`<rect x="5" y="5" width="90" height="90" rx="5" fill="#111827"/><polygon points="50,18 82,50 50,82 18,50" fill="#ffffff"/><line x1="18" y1="50" x2="82" y2="50" stroke="#111827" stroke-width="2"/><text x="50" y="43" text-anchor="middle" font-size="17" font-weight="700" fill="#111827">a</text>`),
        },
        {
          key: "2",
          text: "Figure 2 (u)",
          svgMarkup: svgFramed(`<rect x="5" y="5" width="90" height="90" rx="5" fill="#111827"/><polygon points="22,20 80,78 22,78" fill="#ffffff"/><line x1="22" y1="78" x2="51" y2="49" stroke="#111827" stroke-width="2"/><text x="42" y="74" text-anchor="middle" font-size="17" font-weight="700" fill="#111827">u</text>`),
        },
        {
          key: "3",
          text: "Figure 3 (t)",
          svgMarkup: svgFramed(`<rect x="5" y="5" width="90" height="90" rx="5" fill="#111827"/><rect x="22" y="22" width="56" height="56" fill="#ffffff"/><line x1="22" y1="78" x2="52" y2="22" stroke="#111827" stroke-width="2"/><text x="46" y="57" font-size="17" font-weight="700" fill="#111827">t</text>`),
        },
        {
          key: "4",
          text: "Figure 4 (g)",
          svgMarkup: svgFramed(`<rect x="5" y="5" width="90" height="90" rx="5" fill="#111827"/><polygon points="50,18 78,78 22,78" fill="#ffffff"/><line x1="22" y1="78" x2="66" y2="54" stroke="#111827" stroke-width="2"/><text x="46" y="61" font-size="17" font-weight="700" fill="#111827">g</text>`),
        },
      ],
      correctOption: "1,2",
      explanation:
        "Class A shapes are symmetrically bisected into equal halves and contain vowels (e, o, i), whereas Class B shapes are unequally divided and carry consonants (p, n). Figure 1 ('a', symmetrical diamond) and Figure 2 ('u', symmetrical triangle) match Class A. Hence (1) and (2) belong to Class A.",
    },
    // Q49
    {
      id: "oir_dde03_q49",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 49,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "medium",
      tags: ["letters", "classification"],
      promptText: "Which group of letters does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) KMNL" },
        { key: "2", text: "(2) PRSQ" },
        { key: "3", text: "(3) VWYZ" },
        { key: "4", text: "(4) JLMK" },
        { key: "5", text: "(5) WYZX" },
      ],
      correctOption: "3",
      explanation:
        "Options (1), (2), (4), and (5) all follow the pattern (+2, +1, −2): K+2=M, M+1=N, N−2=L; P+2=R, R+1=S, S−2=Q; J+2=L, L+1=M, M−2=K; W+2=Y, Y+1=Z, Z−2=X. In (3) VWYZ, the pattern is (+1, +2, +1). Thus VWYZ (3) is the odd one out.",
    },
    // Q50
    {
      id: "oir_dde03_q50",
      source: "DDE",
      sourceBookletId: "oir-dde-03",
      sourceBookletName: "DDE OIR 20-Set Practice Paper (Set 2)",
      questionNumber: 50,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "emotions", "vocabulary"],
      promptText: "Which word does not belong to the same class as others?",
      options: [
        { key: "1", text: "(1) Anger" },
        { key: "2", text: "(2) Loathe" },
        { key: "3", text: "(3) Envy" },
        { key: "4", text: "(4) Laugh" },
        { key: "5", text: "(5) Fear" },
      ],
      correctOption: "4",
      explanation:
        "Anger, Loathe, Envy, and Fear denote internal emotions/feelings (specifically negative emotions), whereas Laugh (4) is a physical action/expression.",
    },
  ],
};
