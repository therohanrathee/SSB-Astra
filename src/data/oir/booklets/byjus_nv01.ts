import { OIRBooklet } from "../types";
import { svgAnalogy, svgCanvas, svgFramed, svgSeries } from "../svgHelpers";

// Helper to draw an affine-projected isometric 3D cube in a 100x100 frame.
// Each face content string is placed inside a 100x100 local coordinate system
// aligned to the center (0,0) of each cube face via SVG transform matrix.
function isoCubeSvg(topG: string, frontG: string, rightG: string, w = 100, h = 100): string {
  // Cube vertices (top, top-left, top-right, mid, left-bot, mid-bot, right-bot)
  // Centered around (50, 52) with edge ~ 30
  const body = `
    <polygon points="50,16 80,32 50,48 20,32" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <polygon points="20,32 50,48 50,84 20,68" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <polygon points="50,48 80,32 80,68 50,84" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    <g transform="translate(50,32) matrix(0.54,-0.28,0.54,0.28,0,0)">${topG}</g>
    <g transform="translate(35,58) matrix(0.54,0.28,0,0.62,0,0)">${frontG}</g>
    <g transform="translate(65,58) matrix(0.54,-0.28,0,0.62,0,0)">${rightG}</g>
  `;
  return svgCanvas(body, w, h);
}

function diceNetCross(top: string, row: [string, string, string, string], bot: string): string {
  const s = 30;
  const cells: Array<{ r: number; c: number; g: string }> = [
    { r: 0, c: 1, g: top },
    { r: 1, c: 0, g: row[0] },
    { r: 1, c: 1, g: row[1] },
    { r: 1, c: 2, g: row[2] },
    { r: 1, c: 3, g: row[3] },
    { r: 2, c: 1, g: bot },
  ];
  const inner = cells
    .map(({ r, c, g }) => {
      const x = 10 + c * s;
      const y = 10 + r * s;
      return `<rect x="${x}" y="${y}" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="1.6"/>
              <g transform="translate(${x + s / 2},${y + s / 2}) scale(0.55)">${g}</g>`;
    })
    .join("");
  return svgCanvas(inner, 140, 110);
}

// Reusable 100x100 Q1 box builder
function q1Box(
  topWave: "solid-hollow" | "hollow-solid" | "hollow-hollow" | "pin-sq-r" | "pin-ci-r",
  botWave: "hollow-hollow" | "arrow-l" | "pin-ci-l",
  leftEl: "pin-ci-d" | "arrow-d" | "arrow-u" | "b-solid-top" | "b-hollow",
  rightEl: "pin-sq-u" | "pin-ci-d" | "b-hollow"
): string {
  let g = "";
  const wave = (cx: number, cy: number, rot: number, fill1: boolean, fill2: boolean) => `
    <g transform="translate(${cx},${cy}) rotate(${rot})">
      <path d="M-20,4 A10,10 0 0,1 0,4 Z" fill="${fill1 ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8"/>
      <path d="M0,4 A10,10 0 0,1 20,4 Z" fill="${fill2 ? "currentColor" : "none"}" stroke="currentColor" stroke-width="1.8"/>
    </g>`;
  const pinSq = (cx: number, cy: number, rot: number) => `
    <g transform="translate(${cx},${cy}) rotate(${rot})">
      <line x1="-14" y1="0" x2="10" y2="0" stroke="currentColor" stroke-width="1.8"/>
      <rect x="8" y="-4" width="8" height="8" fill="none" stroke="currentColor" stroke-width="1.8"/>
    </g>`;
  const pinCi = (cx: number, cy: number, rot: number) => `
    <g transform="translate(${cx},${cy}) rotate(${rot})">
      <line x1="-14" y1="0" x2="8" y2="0" stroke="currentColor" stroke-width="1.8"/>
      <circle cx="13" cy="0" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/>
    </g>`;
  const arrow = (cx: number, cy: number, rot: number) => `
    <g transform="translate(${cx},${cy}) rotate(${rot})">
      <line x1="-14" y1="0" x2="8" y2="0" stroke="currentColor" stroke-width="1.8"/>
      <polygon points="8,-5 16,0 8,5" fill="none" stroke="currentColor" stroke-width="1.8"/>
    </g>`;

  if (topWave === "solid-hollow") g += wave(50, 20, 0, true, false);
  else if (topWave === "hollow-solid") g += wave(50, 20, 0, false, true);
  else if (topWave === "hollow-hollow") g += wave(50, 20, 0, false, false);
  else if (topWave === "pin-sq-r") g += pinSq(50, 18, 0);
  else if (topWave === "pin-ci-r") g += pinCi(50, 18, 0);

  if (botWave === "hollow-hollow") g += wave(50, 78, 180, false, false);
  else if (botWave === "arrow-l") g += arrow(50, 82, 180);
  else if (botWave === "pin-ci-l") g += pinCi(50, 82, 180);

  if (leftEl === "pin-ci-d") g += pinCi(18, 50, 90);
  else if (leftEl === "arrow-d") g += arrow(18, 50, 90);
  else if (leftEl === "arrow-u") g += arrow(18, 50, -90);
  else if (leftEl === "b-solid-top") g += wave(22, 50, 90, true, false);
  else if (leftEl === "b-hollow") g += wave(22, 50, 90, false, false);

  if (rightEl === "pin-sq-u") g += pinSq(82, 50, -90);
  else if (rightEl === "pin-ci-d") g += pinCi(82, 50, 90);
  else if (rightEl === "b-hollow") g += wave(78, 50, -90, false, false);

  return g;
}

// Q2 box helper
function q2Box(openDir: "TL" | "BR" | "L" | "B", sNorm: boolean, sFlip: boolean): string {
  const star = (x: number, y: number) =>
    `<polygon points="0,-6 1.7,-1.7 6,0 1.7,1.7 0,6 -1.7,1.7 -6,0 -1.7,-1.7" transform="translate(${x},${y})" fill="currentColor"/>`;
  const tri = (x: number, y: number, r: number) =>
    `<polygon points="0,-6 5,5 -5,5" transform="translate(${x},${y}) rotate(${r})" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  const pin = (x: number, y: number, r: number) =>
    `<g transform="translate(${x},${y}) rotate(${r})"><circle cx="-7" cy="0" r="3" fill="currentColor"/><line x1="-4" y1="0" x2="9" y2="0" stroke="currentColor" stroke-width="1.8"/></g>`;
  const sMark = (x: number, y: number, flip: boolean) =>
    `<text x="${x}" y="${y}" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor" ${flip ? `transform="translate(${2 * x},0) scale(-1,1)"` : ""}>S</text>`;

  if (openDir === "BR") {
    return `<g transform="translate(50,50) rotate(-45)">
      <polyline points="-18,16 -18,-16 18,-16 18,16" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-90)"/>
      </g>` +
      `<polyline points="26,34 46,16 66,36" fill="none" stroke="currentColor" stroke-width="2"/>` +
      `<polyline points="26,34 46,54 66,34" fill="none" stroke="currentColor" stroke-width="2" opacity="0"/>` +
      sMark(56, 22, false) + star(66, 48) + tri(44, 68, 180) + pin(26, 48, -45);
  }
  if (openDir === "TL") {
    return `<polyline points="42,26 62,46 42,66" fill="none" stroke="currentColor" stroke-width="2" transform="rotate(-45 50 48)"/>` +
      sMark(56, 22, false) + pin(66, 44, -135) + tri(44, 68, 0) + star(26, 48);
  }
  if (openDir === "L") {
    return `<polyline points="28,32 70,32 70,64 28,64" fill="none" stroke="currentColor" stroke-width="2"/>` +
      tri(48, 22, 180) + star(78, 48) + sMark(60, 80, false) + pin(38, 76, 180);
  }
  // openDir === "B" (options A..D): inverted U bracket
  const pinStr = sFlip ? pin(68, 36, 90) : sNorm ? pin(68, 36, -90) : pin(68, 36, 0);
  return `<polyline points="34,76 34,26 62,26 62,76" fill="none" stroke="currentColor" stroke-width="2"/>` +
    tri(22, 34, sFlip && !sNorm ? 180 : 0) +
    star(22, 66) +
    sMark(76, 70, sFlip && sNorm) +
    pinStr;
}

// Q3 concentric layer builder (layer0=outermost, layer1=middle, layer2=innermost)
function q3Box(outer: string, mid: string, inner: string): string {
  return outer + mid + inner;
}
const q3HouseL = `<polygon points="18,50 40,22 78,22 78,78 40,78" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
const q3HouseD = `<polygon points="50,82 20,58 20,22 80,22 80,58" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
const q3HouseU = `<polygon points="50,18 80,42 80,78 20,78 20,42" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
const q3DiamondOuter = `<polygon points="50,14 86,50 50,86 14,50" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
const q3SqOuter = `<rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
const q3SqMid = `<rect x="34" y="34" width="32" height="32" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
const q3SqMidLarge = `<rect x="28" y="28" width="44" height="44" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
const q3OvalH = `<ellipse cx="50" cy="50" rx="22" ry="15" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
const q3CircMid = `<circle cx="50" cy="50" r="17" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
const q3DDown = `<path d="M40,42 L60,42 L60,50 A10,10 0 0,1 40,50 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
const q3DRight = `<path d="M43,40 L52,40 A10,10 0 0,1 52,60 L43,60 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
const q3Lollipop = (angDeg: number) =>
  `<g transform="translate(50,50) rotate(${angDeg})"><circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="0" y1="0" x2="0" y2="-13" stroke="currentColor" stroke-width="1.6"/><circle cx="0" cy="0" r="2.2" fill="currentColor"/></g>`;

// Q4 panel helper
function q4Box(
  shape: "sq-top" | "dia-tl" | "sq-left" | "dia-tr" | "dia-bl",
  arrowDir: "R" | "U" | "D" | "L",
  dots: "1L" | "2R"
): string {
  let sh = "";
  if (shape === "sq-top") {
    sh = `<rect x="40" y="14" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7"/>
          <rect x="40" y="14" width="22" height="9" fill="currentColor"/>`;
  } else if (shape === "sq-left") {
    sh = `<rect x="40" y="14" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.7"/>
          <rect x="40" y="14" width="9" height="22" fill="currentColor"/>`;
  } else {
    sh = `<polygon points="50,11 66,25 50,39 34,25" fill="none" stroke="currentColor" stroke-width="1.7"/>`;
    if (shape === "dia-tl") sh += `<polygon points="50,11 34,25 40,30 56,16" fill="currentColor"/>`;
    if (shape === "dia-tr") sh += `<polygon points="50,11 66,25 60,30 44,16" fill="currentColor"/>`;
    if (shape === "dia-bl") sh += `<polygon points="34,25 50,39 55,34 39,20" fill="currentColor"/>`;
  }
  const rot = arrowDir === "R" ? 0 : arrowDir === "D" ? 90 : arrowDir === "L" ? 180 : -90;
  const arr = `<g transform="translate(50,74) rotate(${rot})"><line x1="-14" y1="0" x2="10" y2="0" stroke="currentColor" stroke-width="1.8"/><polygon points="8,-4 16,0 8,4" fill="currentColor"/></g>`;
  const dt =
    dots === "1L"
      ? `<circle cx="15" cy="52" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/>`
      : `<circle cx="85" cy="43" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><circle cx="85" cy="57" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  return sh + arr + dt;
}

// Q5 symmetric quadrant helper
function q5Quad(
  cx: number,
  cy: number,
  diag: "slash" | "bslash",
  cornerTri: "UR" | "BR" | "UL" | "BL",
  innerRot: number
): string {
  const d =
    diag === "slash"
      ? `<line x1="${cx}" y1="${cy + 50}" x2="${cx + 50}" y2="${cy}" stroke="currentColor" stroke-width="1.6"/>`
      : `<line x1="${cx}" y1="${cy}" x2="${cx + 50}" y2="${cy + 50}" stroke="currentColor" stroke-width="1.6"/>`;
  let cPoly = "";
  if (cornerTri === "UR") {
    cPoly = `<polygon points="${cx + 32},${cy} ${cx + 50},${cy} ${cx + 50},${cy + 22}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
  } else if (cornerTri === "BR") {
    cPoly = `<polygon points="${cx + 28},${cy + 50} ${cx + 50},${cy + 50} ${cx + 50},${cy + 28}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
  } else if (cornerTri === "UL") {
    cPoly = `<polygon points="${cx},${cy} ${cx + 22},${cy} ${cx},${cy + 22}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
  } else {
    cPoly = `<polygon points="${cx},${cy + 50} ${cx + 22},${cy + 50} ${cx},${cy + 28}" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
  }
  const tri = `<polygon points="0,-7 7,6 -7,6" transform="translate(${cx + 25},${cy + 25}) rotate(${innerRot})" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  return d + cPoly + tri;
}

// 4-quadrant puzzle wrapper with bottom-right (or top-left) '?'
function grid2x2Puzzle(tl: string, tr: string, bl: string, br: string): string {
  const inner = `
    <rect x="6" y="6" width="128" height="128" fill="none" stroke="currentColor" stroke-width="1.8"/>
    <line x1="70" y1="6" x2="70" y2="134" stroke="currentColor" stroke-width="1.4"/>
    <line x1="6" y1="70" x2="134" y2="70" stroke="currentColor" stroke-width="1.4"/>
    <g transform="translate(6,6) scale(0.64)">${tl}</g>
    <g transform="translate(70,6) scale(0.64)">${tr}</g>
    <g transform="translate(6,70) scale(0.64)">${bl}</g>
    <g transform="translate(70,70) scale(0.64)">${br}</g>
  `;
  return svgCanvas(inner, 140, 140);
}
const qMarkBox = `<text x="50" y="60" text-anchor="middle" font-size="30" font-weight="700" fill="currentColor">?</text>`;

// Helper for Q9 series panel
function q9Box(
  hgPos: "LR" | "TB",
  leftBr: string,
  rightBr: string,
  triDir: "TL" | "TR" | "BR" | "BL"
): string {
  const hg = (cx: number, cy: number, horiz: boolean) =>
    `<g transform="translate(${cx},${cy}) rotate(${horiz ? 90 : 0})">
      <polygon points="-7,-11 7,-11 -7,11 7,11" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linejoin="round"/>
    </g>`;
  let g =
    hgPos === "LR"
      ? hg(15, 50, false) + hg(85, 50, false)
      : hg(50, 16, true) + hg(50, 84, true);
  g += leftBr + rightBr;
  const pts =
    triDir === "TL"
      ? "41,40 59,40 41,60"
      : triDir === "TR"
      ? "41,40 59,40 59,60"
      : triDir === "BR"
      ? "59,40 59,60 41,60"
      : "41,40 41,60 59,60";
  g += `<polygon points="${pts}" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>`;
  return g;
}

const brTopOpenBL = `<polyline points="42,20 42,13 58,13" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const brBotOpenTL = `<polyline points="42,87 58,87 58,80" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const brLeftL = `<polyline points="14,42 14,58 22,58" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const brRightTop7 = `<polyline points="78,42 86,42 86,58" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const brRightBotJ = `<polyline points="86,42 86,58 78,58" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;
const brLeftTopGamma = `<polyline points="14,58 14,42 22,42" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/>`;

// 5-pointed star SVG for Q10 (option diagrams)
function star5Opt(extra: string): string {
  const outer = [0, 1, 2, 3, 4].map((i) => {
    const a = ((-90 + i * 72) * Math.PI) / 180;
    return [50 + 42 * Math.cos(a), 53 + 42 * Math.sin(a)];
  });
  const inner = [0, 1, 2, 3, 4].map((i) => {
    const a = ((-54 + i * 72) * Math.PI) / 180;
    return [50 + 17 * Math.cos(a), 53 + 17 * Math.sin(a)];
  });
  const starPts = [0, 1, 2, 3, 4]
    .map((i) => `${outer[i][0].toFixed(1)},${outer[i][1].toFixed(1)} ${inner[i][0].toFixed(1)},${inner[i][1].toFixed(1)}`)
    .join(" ");
  return `<polygon points="${starPts}" fill="none" stroke="currentColor" stroke-width="1.3"/>` + extra;
}

// Helper for Q20 (3x3 grid of arches top, circles mid, U bottom, with tiny white dot cutouts)
function q20Grid(
  topDots: number[],
  midDots: [number, number, number], // offset angles in deg for small white square inside 3 solid circles
  botDots: number[]
): string {
  let body = "";
  const xs = [24, 50, 76];
  xs.forEach((x, idx) => {
    // Top inverted U arch
    body += `<path d="M${x - 7},28 L${x - 7},20 A7,7 0 0,1 ${x + 7},20 L${x + 7},28" fill="none" stroke="currentColor" stroke-width="4.2" stroke-linecap="round"/>`;
    if (topDots.includes(idx)) {
      body += `<rect x="${x - 1.6}" y="11.5" width="3.2" height="3.2" fill="var(--background, white)"/>`;
    }
    // Middle solid circle with white dot
    body += `<circle cx="${x}" cy="50" r="9.5" fill="currentColor"/>`;
    const ang = (midDots[idx] * Math.PI) / 180;
    const dx = Math.cos(ang) * 4.5;
    const dy = Math.sin(ang) * 4.5;
    body += `<rect x="${(x + dx - 1.7).toFixed(1)}" y="${(50 + dy - 1.7).toFixed(1)}" width="3.4" height="3.4" fill="var(--background, white)"/>`;
    // Bottom U arch
    body += `<path d="M${x - 7},72 L${x - 7},80 A7,7 0 0,0 ${x + 7},80 L${x + 7},72" fill="none" stroke="currentColor" stroke-width="4.2" stroke-linecap="round"/>`;
    if (botDots.includes(idx)) {
      body += `<rect x="${x - 1.6}" y="85.2" width="3.2" height="3.2" fill="var(--background, white)"/>`;
    }
  });
  return svgFramed(body);
}

// Helper for Q21 (nested square-square-circle-arcs)
function q21Box(orient: "H" | "V", inward: boolean): string {
  const rot = orient === "V" ? 90 : 0;
  const arcTop = inward
    ? `<path d="M36,29 A14,12 0 0,0 64,29" fill="none" stroke="currentColor" stroke-width="1.6"/>`
    : `<path d="M37,39 A14,12 0 0,1 63,39" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  const arcBot = inward
    ? `<path d="M36,71 A14,12 0 0,1 64,71" fill="none" stroke="currentColor" stroke-width="1.6"/>`
    : `<path d="M37,61 A14,12 0 0,0 63,61" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  const body = `
    <rect x="14" y="14" width="72" height="72" fill="none" stroke="currentColor" stroke-width="1.6"/>
    <g transform="rotate(${rot} 50 50)">
      <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <line x1="27" y1="44" x2="73" y2="44" stroke="currentColor" stroke-width="1.6"/>
      <line x1="27" y1="56" x2="73" y2="56" stroke="currentColor" stroke-width="1.6"/>
      ${arcTop}${arcBot}
    </g>
  `;
  return svgFramed(body);
}

// Helper for Q22 (Android-like bot on skateboard with chest polygon)
function q22Bot(chestPoly: string): string {
  const body = `
    <line x1="40" y1="22" x2="34" y2="13" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <line x1="60" y1="22" x2="66" y2="13" stroke="currentColor" stroke-width="2.2" stroke-linecap="round"/>
    <path d="M35,34 A15,15 0 0,1 65,34 Z" fill="currentColor"/>
    <circle cx="44" cy="27" r="1.8" fill="var(--background, white)"/>
    <circle cx="56" cy="27" r="1.8" fill="var(--background, white)"/>
    <rect x="26" y="34" width="6" height="22" rx="3" fill="currentColor"/>
    <rect x="68" y="34" width="6" height="22" rx="3" fill="currentColor"/>
    <rect x="35" y="37" width="30" height="28" rx="3" fill="currentColor"/>
    <rect x="40" y="40" width="20" height="21" fill="var(--background, white)"/>
    ${chestPoly}
    <rect x="40" y="65" width="6" height="10" rx="2" fill="currentColor"/>
    <rect x="54" y="65" width="6" height="10" rx="2" fill="currentColor"/>
    <line x1="30" y1="79" x2="70" y2="79" stroke="currentColor" stroke-width="3.2" stroke-linecap="round"/>
    <circle cx="38" cy="86" r="4" fill="currentColor"/>
    <circle cx="62" cy="86" r="4" fill="currentColor"/>
  `;
  return svgFramed(body);
}

// Cube glyphs for Q24..Q29
const cgSq = `<rect x="-14" y="-14" width="28" height="28" fill="none" stroke="currentColor" stroke-width="2.6"/>`;
const cgHash = `<text x="0" y="8" text-anchor="middle" font-size="28" font-weight="700" fill="currentColor">#</text>`;
const cgHex = `<polygon points="0,-16 14,-8 14,8 0,16 -14,8 -14,-8" fill="none" stroke="currentColor" stroke-width="2.5"/>`;
const cgBull = `<circle cx="0" cy="0" r="15" fill="none" stroke="currentColor" stroke-width="2.4"/><circle cx="0" cy="0" r="8" fill="none" stroke="currentColor" stroke-width="2.4"/>`;
const cgXBox = `<rect x="-16" y="-16" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2.4"/><line x1="-16" y1="-16" x2="16" y2="16" stroke="currentColor" stroke-width="2.2"/><line x1="16" y1="-16" x2="-16" y2="16" stroke="currentColor" stroke-width="2.2"/>`;
const cgDice5 = `<circle cx="-11" cy="-11" r="3.6" fill="currentColor"/><circle cx="11" cy="-11" r="3.6" fill="currentColor"/><circle cx="0" cy="0" r="3.6" fill="currentColor"/><circle cx="-11" cy="11" r="3.6" fill="currentColor"/><circle cx="11" cy="11" r="3.6" fill="currentColor"/>`;
const cgDiv = `<text x="0" y="9" text-anchor="middle" font-size="30" font-weight="700" fill="currentColor">÷</text>`;
const cgMinus = `<line x1="-13" y1="0" x2="13" y2="0" stroke="currentColor" stroke-width="4.2"/>`;
const cgNeq = `<text x="0" y="9" text-anchor="middle" font-size="28" font-weight="700" fill="currentColor">≠</text>`;
const cgEqBox = `<rect x="-15" y="-10" width="30" height="20" fill="none" stroke="currentColor" stroke-width="2.4"/><line x1="-15" y1="0" x2="15" y2="0" stroke="currentColor" stroke-width="2.4"/>`;
const cgCrossX = `<text x="0" y="9" text-anchor="middle" font-size="28" font-weight="700" fill="currentColor">✖</text>`;
const cgLetter = (ch: string) =>
  `<text x="0" y="9" text-anchor="middle" font-size="26" font-weight="700" fill="currentColor">${ch}</text>`;
const cgDot = `<circle cx="0" cy="0" r="7" fill="currentColor"/>`;
const cgSolid = `<rect x="-24" y="-24" width="48" height="48" fill="currentColor"/>`;
const cgBlank = ``;
const cgSmallSq = `<rect x="-9" y="-9" width="18" height="18" fill="currentColor"/>`;
const cgMidline = `<line x1="-22" y1="0" x2="22" y2="0" stroke="currentColor" stroke-width="2.6"/>`;

// Q32 wheel helper (0=NNE 22.5°, ..., 7=NNW 337.5° clockwise from 12 o'clock)
function q32Wheel(diaSec: number, starSec: number, ovalRatio = true): string {
  const rx = ovalRatio ? 36 : 40;
  const ry = ovalRatio ? 43 : 40;
  const cx = 50;
  const cy = 50;
  let g = `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${ry}" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  for (let i = 0; i < 4; i++) {
    const a = ((i * 45) * Math.PI) / 180;
    const x1 = cx + rx * Math.sin(a);
    const y1 = cy - ry * Math.cos(a);
    const x2 = cx - rx * Math.sin(a);
    const y2 = cy + ry * Math.cos(a);
    g += `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="currentColor" stroke-width="1.3"/>`;
  }
  const place = (sec: number, sym: "dia" | "star") => {
    const a = (((sec * 45 + 22.5) * Math.PI) / 180);
    const px = cx + rx * 0.66 * Math.sin(a);
    const py = cy - ry * 0.66 * Math.cos(a);
    if (sym === "dia") {
      return `<polygon points="0,-6 5,0 0,6 -5,0" transform="translate(${px.toFixed(1)},${py.toFixed(1)})" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    }
    return `<polygon points="0,-6 1.8,-1.8 6,-1.8 2.6,1 3.9,5.5 0,2.8 -3.9,5.5 -2.6,1 -6,-1.8 -1.8,-1.8" transform="translate(${px.toFixed(1)},${py.toFixed(1)})" fill="none" stroke="currentColor" stroke-width="1.3"/>`;
  };
  return g + place(diaSec, "dia") + place(starSec, "star");
}

// Q33 star-grid box (sectors 0..7 starting clockwise from 12..1:30)
function q33Box(
  arrSec: number,
  arrUp: boolean,
  arrFill: boolean,
  polySec: number,
  polyType: "tri" | "sq" | "pent" | "hex",
  polyFill: boolean
): string {
  let g = `<line x1="50" y1="8" x2="50" y2="92" stroke="currentColor" stroke-width="1.5"/>
           <line x1="8" y1="50" x2="92" y2="50" stroke="currentColor" stroke-width="1.5"/>
           <line x1="8" y1="8" x2="92" y2="92" stroke="currentColor" stroke-width="1.5"/>
           <line x1="92" y1="8" x2="8" y2="92" stroke="currentColor" stroke-width="1.5"/>`;
  const pts: Array<[number, number]> = [
    [66, 26], [76, 36], [76, 64], [66, 76], [34, 76], [24, 64], [24, 36], [34, 26],
  ];
  const [ax, ay] = pts[arrSec];
  const aFill = arrFill ? "currentColor" : "none";
  g += `<g transform="translate(${ax},${ay}) rotate(${arrUp ? 0 : 180})">
          <polygon points="0,-7 6,0 2.5,0 2.5,7 -2.5,7 -2.5,0 -6,0" fill="${aFill}" stroke="currentColor" stroke-width="1.4" stroke-linejoin="round"/>
        </g>`;
  const [px, py] = pts[polySec];
  const pFill = polyFill ? "currentColor" : "none";
  if (polyType === "tri") {
    g += `<polygon points="0,-6 6,5 -6,5" transform="translate(${px},${py})" fill="${pFill}" stroke="currentColor" stroke-width="1.5"/>`;
  } else if (polyType === "sq") {
    g += `<rect x="${px - 5.5}" y="${py - 5.5}" width="11" height="11" fill="${pFill}" stroke="currentColor" stroke-width="1.5"/>`;
  } else if (polyType === "pent") {
    g += `<polygon points="0,-6 6,-1 4,6 -4,6 -6,-1" transform="translate(${px},${py})" fill="${pFill}" stroke="currentColor" stroke-width="1.5"/>`;
  } else {
    g += `<polygon points="0,-6 5.5,-3 5.5,3 0,6 -5.5,3 -5.5,-3" transform="translate(${px},${py})" fill="${pFill}" stroke="currentColor" stroke-width="1.5"/>`;
  }
  return g;
}

// Q34 cross panel rotated by steps of 90deg ACW (step 0..3)
function q34Box(rotDeg: number): string {
  const crossTop = `<g transform="translate(50,20)"><line x1="0" y1="-8" x2="0" y2="8" stroke="currentColor" stroke-width="1.4"/><line x1="-8" y1="0" x2="8" y2="0" stroke="currentColor" stroke-width="1.4"/></g>`;
  const arrowLeft = `<g transform="translate(20,50)"><line x1="12" y1="0" x2="-10" y2="0" stroke="currentColor" stroke-width="1.5"/><polyline points="-5,-4 -11,0 -5,4" fill="none" stroke="currentColor" stroke-width="1.5"/></g>`;
  const triBot = `<polygon points="50,86 41,72 59,72" fill="currentColor"/>`;
  const sqRight = `<rect x="74" y="44" width="12" height="12" fill="currentColor"/>`;
  return `<g transform="rotate(${rotDeg} 50 50)">
    <line x1="50" y1="22" x2="50" y2="78" stroke="currentColor" stroke-width="1.3"/>
    <line x1="22" y1="50" x2="78" y2="50" stroke="currentColor" stroke-width="1.3"/>
    ${crossTop}${arrowLeft}${triBot}${sqRight}
  </g>`;
}

// Q40 panel helper
function q40Box(topSym: "dot" | "tri", topN: number, botSym: "dot" | "tri", botN: number): string {
  const drawRow = (sym: "dot" | "tri", n: number, x0: number, y: number) => {
    let s = "";
    for (let i = 0; i < n; i++) {
      const x = x0 + i * 11;
      if (sym === "dot") s += `<circle cx="${x}" cy="${y}" r="3.2" fill="currentColor"/>`;
      else s += `<polygon points="${x},${y - 4} ${x + 3.8},${y + 3.5} ${x - 3.8},${y + 3.5}" fill="currentColor"/>`;
    }
    return s;
  };
  return `<line x1="10" y1="50" x2="88" y2="50" stroke="currentColor" stroke-width="2"/>
          <polygon points="84,46 92,50 84,54" fill="currentColor"/>` +
    drawRow(topSym, topN, 16, 39) +
    drawRow(botSym, botN, 48, 63);
}

function svgAnalogy4(a: string, b: string, d: string, cell = 100): string {
  const pad = 6;
  const g1 = 18;
  const g2 = 26;
  const x1 = pad;
  const x2 = x1 + cell + g1;
  const x3 = x2 + cell + g2;
  const x4 = x3 + cell + g1;
  const W = x4 + cell + pad;
  const H = cell + 22;
  const cy = pad + cell / 2 + 4;
  return svgCanvas(
    `
    <rect x="${x1}" y="${pad}" width="${cell}" height="${cell}" rx="4" fill="none" stroke="currentColor" stroke-width="1.3"/>
    <g transform="translate(${x1},${pad})">${a}</g>
    <text x="${x1 + cell + g1 / 2}" y="${cy}" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">:</text>
    <rect x="${x2}" y="${pad}" width="${cell}" height="${cell}" rx="4" fill="none" stroke="currentColor" stroke-width="1.3"/>
    <g transform="translate(${x2},${pad})">${b}</g>
    <text x="${x2 + cell + g2 / 2}" y="${cy}" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">::</text>
    <rect x="${x3}" y="${pad}" width="${cell}" height="${cell}" rx="4" fill="none" stroke="currentColor" stroke-width="1.3" stroke-dasharray="4 3"/>
    <text x="${x3 + cell / 2}" y="${cy + 3}" text-anchor="middle" font-size="22" font-weight="700" fill="currentColor">?</text>
    <text x="${x3 + cell + g1 / 2}" y="${cy}" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">:</text>
    <rect x="${x4}" y="${pad}" width="${cell}" height="${cell}" rx="4" fill="none" stroke="currentColor" stroke-width="1.3"/>
    <g transform="translate(${x4},${pad})">${d}</g>
    `,
    W,
    H
  );
}

export const BYJUS_NV_01: OIRBooklet = {
  id: "oir-byjus-nv-01",
  source: "Byjus",
  bookletNumber: "BYJUS-NV-01",
  title: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
  category: "non_verbal",
  totalQuestions: 40,
  durationMinutes: 20,
  markingScheme: { correct: 1, incorrect: 0 },
  description:
    "Authentic 40-question Byju's Exam Prep Non-Verbal Reasoning Mock Test 1 covering figure analogies, figure series, pattern completion, embedded figures, paper folding/cutting, odd-one-out visual classification, cube unfolding, and dice logic — all rebuilt with crisp theme-aware vector SVGs.",
  questions: [
    // Q1
    {
      id: "oir_bjnv01_q01",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 1,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "hard",
      tags: ["analogy", "rotation", "mirror"],
      promptText:
        "The first figure in the first pair bears a certain relationship to the second figure. Select the figure that completes the second pair (?, fourth figure) with the same relationship:",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy4(
          q1Box("solid-hollow", "hollow-hollow", "pin-ci-d", "pin-sq-u"),
          q1Box("pin-sq-r", "pin-ci-l", "b-solid-top", "b-hollow"),
          q1Box("pin-ci-r", "arrow-l", "b-solid-top", "b-hollow")
        ),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q1Box("solid-hollow", "hollow-hollow", "arrow-d", "pin-ci-d")) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q1Box("solid-hollow", "hollow-hollow", "arrow-d", "pin-ci-d") + `<circle cx="82" cy="36" r="4.5" fill="none" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q1Box("hollow-solid", "hollow-hollow", "arrow-u", "pin-ci-d")) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q1Box("solid-hollow", "hollow-hollow", "arrow-d", "pin-ci-d") + `<line x1="18" y1="30" x2="18" y2="70" opacity="0"/>`) },
        { key: "E", text: "Figure E", svgMarkup: svgFramed(q1Box("hollow-solid", "hollow-hollow", "arrow-u", "pin-ci-d")) },
      ],
      correctOption: "A",
      explanation:
        "All elements shift 90° anti-clockwise from Fig 1 to Fig 2: Right becomes Top (90° ACW), Bottom becomes Right (90° ACW + mirrored), Left becomes Bottom (90° ACW + mirrored), and Top becomes Left (90° ACW + 180° flip). Reversing this from Fig 4 recovers Figure A.",
    },
    // Q2
    {
      id: "oir_bjnv01_q02",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 2,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "medium",
      tags: ["analogy", "rotation"],
      promptText:
        "Find the figure that fits in place of '?' so the second pair follows the same transformation as the first pair:",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy4(q2Box("BR", true, false), q2Box("TL", true, false), q2Box("L", true, false)),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q2Box("B", false, false)) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q2Box("B", true, true)) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q2Box("B", false, true)) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q2Box("B", true, false)) },
      ],
      correctOption: "D",
      explanation:
        "The main U-frame rotates 90° clockwise from the first figure to the second while the outer symbols interchange positions and preserve upright 'S' and upward triangle orientation. Thus Figure D maps to the given fourth figure.",
    },
    // Q3
    {
      id: "oir_bjnv01_q03",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 3,
      type: "non_verbal",
      subType: "figure_analogy",
      difficulty: "medium",
      tags: ["analogy", "nested-shapes"],
      promptText:
        "Select the figure that replaces '?' so that the second pair shares the exact same nested-shape transformation as the first pair:",
      figures: {
        type: "svg",
        svgMarkup: svgAnalogy4(
          q3Box(q3HouseL, q3SqMid, q3Lollipop(180)),
          q3Box(q3DiamondOuter, q3OvalH, q3DDown),
          q3Box(q3DiamondOuter, q3CircMid, q3DRight)
        ),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q3Box(q3HouseU, q3SqMid, q3Lollipop(0))) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q3Box(q3HouseD, q3SqMid, q3Lollipop(180))) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q3Box(q3HouseU, q3CircMid, q3Lollipop(0))) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q3Box(q3HouseD, q3SqMid, q3Lollipop(0))) },
        { key: "E", text: "Figure E", svgMarkup: svgFramed(q3Box(q3HouseD, q3SqMidLarge, q3Lollipop(0))) },
      ],
      correctOption: "D",
      explanation:
        "Outermost rotates 90° ACW to become innermost; middle rotates 90° CW to become outermost; innermost rotates 90° ACW to become middle. Reversing from Figure 4 yields the downward-pointing pentagon, inner square, and upward-ticked circle of Figure D.",
    },
    // Q4
    {
      id: "oir_bjnv01_q04",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 4,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "rotation", "alternating"],
      promptText: "Which of the option figures will come next after the problem figures if the sequence continues?",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            q4Box("sq-top", "R", "1L"),
            q4Box("dia-tl", "U", "2R"),
            q4Box("sq-left", "D", "1L"),
            q4Box("dia-tl", "R", "2R"),
            q4Box("sq-top", "L", "1L"),
          ],
          100,
          false
        ),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q4Box("dia-tl", "D", "2R")) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q4Box("dia-tr", "D", "2R")) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q4Box("dia-tr", "D", "1L")) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q4Box("dia-tr", "U", "2R")) },
      ],
      correctOption: "B",
      explanation:
        "Circles alternate between 1 on the left and 2 on the right (so Panel 6 has 2 circles on the right). The bottom arrow turns 90° ACW and 180° alternately (→ → ↑ → ↓ → → → ← → ↓). The upper half-shaded square/diamond rotates by 45° increments giving Figure B.",
    },
    // Q5
    {
      id: "oir_bjnv01_q05",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 5,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "easy",
      tags: ["symmetry", "grid"],
      promptText: "Which answer figure will complete the pattern in the question figure?",
      figures: {
        type: "svg",
        svgMarkup: grid2x2Puzzle(
          q5Quad(0, 0, "slash", "UR", 0) + q5Quad(50, 0, "bslash", "UL", 180),
          q5Quad(0, 0, "slash", "UR", 0) + q5Quad(50, 0, "bslash", "UR", 0),
          q5Quad(0, 0, "slash", "BL", 0) + q5Quad(50, 0, "bslash", "BL", 0),
          qMarkBox
        ),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q5Quad(0, 0, "slash", "BR", 0) + q5Quad(50, 0, "bslash", "BR", 0)) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q5Quad(0, 0, "slash", "UR", 270) + q5Quad(50, 0, "bslash", "BR", 270)) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q5Quad(0, 0, "bslash", "BR", 180) + q5Quad(50, 0, "slash", "BR", 180)) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q5Quad(0, 0, "slash", "BR", 180) + q5Quad(50, 0, "bslash", "BR", 90)) },
      ],
      correctOption: "A",
      explanation:
        "Completing the central symmetric diamond and corner frame while preserving the upright small central triangle produces Figure A.",
    },
    // Q6
    {
      id: "oir_bjnv01_q06",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 6,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "easy",
      tags: ["symmetry", "concentric"],
      promptText: "Which of the following option figures will complete the pattern given below?",
      figures: {
        type: "svg",
        svgMarkup: (() => {
          const tl = `<polyline points="10,40 10,20 20,10 40,10" fill="none" stroke="currentColor" stroke-width="3"/><polyline points="35,96 35,35 96,35" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M55,96 A40,40 0 0,1 96,55" fill="none" stroke="currentColor" stroke-width="2.6"/>`;
          const tr = `<g transform="translate(100,0) scale(-1,1)">${tl}</g>`;
          const bl = `<g transform="translate(0,100) scale(1,-1)">${tl}</g>`;
          return grid2x2Puzzle(tl, tr, bl, qMarkBox);
        })(),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            `<polyline points="88,42 88,78 78,88 42,88" fill="none" stroke="currentColor" stroke-width="3"/><polyline points="12,68 68,68 68,12" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M45,12 A33,33 0 0,1 12,45" fill="none" stroke="currentColor" stroke-width="2.6"/>`
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            `<polyline points="88,42 88,78 78,88 42,88" fill="none" stroke="currentColor" stroke-width="3"/><polyline points="12,56 56,56 56,12" fill="none" stroke="currentColor" stroke-width="2.2"/><polyline points="12,72 72,72 72,12" fill="none" stroke="currentColor" stroke-width="2.2"/><path d="M40,12 A28,28 0 0,1 12,40" fill="none" stroke="currentColor" stroke-width="2.2"/>`
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            `<polyline points="88,42 88,78 78,88 42,88" fill="none" stroke="currentColor" stroke-width="3"/><polyline points="12,68 68,68 68,12" fill="none" stroke="currentColor" stroke-width="2.6"/><path d="M45,12 A33,33 0 0,1 12,45" fill="none" stroke="currentColor" stroke-width="2.6" opacity="0.3"/><path d="M52,12 A40,40 0 0,1 12,52" fill="none" stroke="currentColor" stroke-width="2"/>`
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            `<polyline points="88,42 88,78 78,88 42,88" fill="none" stroke="currentColor" stroke-width="3"/><path d="M45,12 A33,33 0 0,1 12,45" fill="none" stroke="currentColor" stroke-width="2.6"/>`
          ),
        },
      ],
      correctOption: "A",
      explanation:
        "Four-way reflectional symmetry requires a single inner square corner, one central quarter-circle arc at top-left of the bottom-right quadrant, and the chamfered outer border shown in Figure A.",
    },
    // Q7
    {
      id: "oir_bjnv01_q07",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 7,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "easy",
      tags: ["symmetry", "grid"],
      promptText: "Which answer figure will complete the pattern in the question figure?",
      figures: {
        type: "svg",
        svgMarkup: (() => {
          const tl = `<rect x="14" y="14" width="66" height="66" fill="none" stroke="currentColor" stroke-width="2.2"/><circle cx="38" cy="38" r="10" fill="none" stroke="currentColor" stroke-width="2"/><rect x="64" y="64" width="32" height="32" fill="none" stroke="currentColor" stroke-width="2"/><rect x="40" y="76" width="56" height="20" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="76" y="40" width="20" height="56" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
          const tr = `<g transform="translate(100,0) scale(-1,1)">${tl}</g>`;
          const bl = `<g transform="translate(0,100) scale(1,-1)">${tl}</g>`;
          return grid2x2Puzzle(tl, tr, bl, qMarkBox);
        })(),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(`<rect x="16" y="16" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="38" cy="38" r="10" fill="none" stroke="currentColor" stroke-width="2"/>`) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(`<rect x="16" y="16" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="38" cy="38" r="10" fill="none" stroke="currentColor" stroke-width="2"/><rect x="16" y="16" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="16" y="44" width="16" height="36" fill="none" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(`<rect x="16" y="16" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2"/><rect x="64" y="64" width="22" height="22" fill="none" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(`<rect x="16" y="16" width="64" height="64" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="38" cy="38" r="10" fill="none" stroke="currentColor" stroke-width="2"/><rect x="16" y="16" width="10" height="10" fill="currentColor"/><rect x="68" y="68" width="14" height="14" fill="none" stroke="currentColor" stroke-width="1.8"/>`) },
      ],
      correctOption: "B",
      explanation:
        "By mirror symmetry across both midlines, the bottom-right quadrant must include the inner small circle, the enclosing corner square, and the interlocking central grid bars of Figure B.",
    },
    // Q8
    {
      id: "oir_bjnv01_q08",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 8,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "hard",
      tags: ["symmetry", "arcs", "shading"],
      promptText: "Study the given pattern carefully and select the figure that will complete the pattern:",
      figures: {
        type: "svg",
        svgMarkup: grid2x2Puzzle(
          `<path d="M10,8 A42,46 0 0,0 88,8" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="36" y1="96" x2="96" y2="6" stroke="currentColor" stroke-width="1.8"/><rect x="12" y="34" width="14" height="32" fill="currentColor"/><polygon points="12,34 26,34 12,66" fill="var(--background, white)"/>`,
          `<line x1="6" y1="6" x2="94" y2="96" stroke="currentColor" stroke-width="1.8"/><path d="M6,44 A48,48 0 0,1 96,96" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="74" y="14" width="14" height="32" fill="currentColor"/><polygon points="88,14 74,46 88,46" fill="var(--background, white)"/>`,
          qMarkBox,
          `<path d="M6,6 A42,46 0 0,1 6,94" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="6" y1="6" x2="94" y2="94" stroke="currentColor" stroke-width="1.8"/><rect x="58" y="76" width="32" height="12" fill="currentColor"/><polygon points="58,76 90,76 90,88" fill="var(--background, white)"/>`
        ),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            `<path d="M90,10 A40,42 0 0,0 90,90" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" stroke-width="1.8"/><rect x="24" y="16" width="30" height="11" fill="currentColor"/><polygon points="24,16 54,16 24,27" fill="var(--background, white)"/>`
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            `<path d="M10,12 A42,42 0 0,0 90,12" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" stroke-width="1.8"/><rect x="52" y="74" width="30" height="11" fill="currentColor"/><polygon points="52,74 82,74 52,85" fill="var(--background, white)"/>`
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            `<path d="M12,10 A42,42 0 0,1 12,90" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" stroke-width="1.8"/><rect x="52" y="74" width="30" height="11" fill="currentColor"/><polygon points="52,74 82,74 52,85" fill="var(--background, white)"/>`
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            `<path d="M12,10 A42,42 0 0,0 90,10" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="10" y1="90" x2="90" y2="10" stroke="currentColor" stroke-width="1.8"/><rect x="20" y="16" width="30" height="11" fill="currentColor"/><polygon points="20,27 50,27 50,16" fill="var(--background, white)"/>`
          ),
        },
      ],
      correctOption: "A",
      explanation:
        "Horizontal reflection between the left and right halves mirrors the bottom-right semicircle on the left edge into a matching semicircle on the right edge of the bottom-left quadrant along with the diagonal and split bar in Figure A.",
    },
    // Q9
    {
      id: "oir_bjnv01_q09",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 9,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "alternating", "mirror"],
      promptText: "Select the figure that will come next in the following figure series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries([
          q9Box("LR", brTopOpenBL, brBotOpenTL, "TL"),
          q9Box("TB", brLeftL, brRightTop7, "TR"),
          q9Box("LR", brTopOpenBL, brBotOpenTL, "BR"),
        ]),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q9Box("TB", brLeftL, brRightTop7, "BL")) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q9Box("TB", brLeftL, brRightBotJ, "BL")) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q9Box("TB", brLeftL, brRightBotJ, "BR")) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q9Box("TB", brLeftTopGamma, brRightBotJ, "BR")) },
      ],
      correctOption: "A",
      explanation:
        "Outer symbols alternate positions (Panels 1 & 3 share L/R hourglasses and top/bottom brackets; Panels 2 & 4 share Top/Bottom hourglasses and left/right brackets └ and ┐), while the central right-triangle mirrors horizontally between pairs → Figure A.",
    },
    // Q10
    {
      id: "oir_bjnv01_q10",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 10,
      type: "non_verbal",
      subType: "embedded_figure",
      difficulty: "medium",
      tags: ["embedded", "star"],
      promptText:
        "From the given options, select the figure in which the following target shape is embedded (rotation is NOT allowed):",
      figures: {
        type: "svg",
        svgMarkup: svgFramed(`<polyline points="68,16 50,38 35,38 56,64 38,84" fill="none" stroke="currentColor" stroke-width="2"/>`),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            star5Opt(
              `<line x1="8" y1="8" x2="38" y2="40" stroke="currentColor" stroke-width="1.2"/><line x1="92" y1="8" x2="62" y2="40" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="92" x2="32" y2="66" stroke="currentColor" stroke-width="1.2"/><line x1="92" y1="92" x2="68" y2="66" stroke="currentColor" stroke-width="1.2"/>`
            )
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            star5Opt(
              `<line x1="50" y1="11" x2="26" y2="92" stroke="currentColor" stroke-width="1.2"/><line x1="12" y1="39" x2="88" y2="39" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="8" x2="92" y2="92" stroke="currentColor" stroke-width="1.2"/><line x1="92" y1="8" x2="10" y2="92" stroke="currentColor" stroke-width="1.2"/>`
            )
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            star5Opt(
              `<line x1="50" y1="11" x2="50" y2="92" stroke="currentColor" stroke-width="1.2"/><line x1="12" y1="39" x2="88" y2="39" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="8" x2="50" y2="39" stroke="currentColor" stroke-width="1.2"/><line x1="92" y1="8" x2="50" y2="39" stroke="currentColor" stroke-width="1.2"/>`
            )
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            star5Opt(
              `<line x1="50" y1="11" x2="72" y2="92" stroke="currentColor" stroke-width="1.2"/><line x1="12" y1="39" x2="64" y2="39" stroke="currentColor" stroke-width="1.2"/><line x1="8" y1="8" x2="92" y2="92" stroke="currentColor" stroke-width="1.2"/>`
            )
          ),
        },
      ],
      correctOption: "B",
      explanation:
        "Tracing the star edges down-left from the upper-right arm along the inner left segment and back down the right-sloping diagonal reproduces the exact lightning path inside Figure B.",
    },
    // Q11
    {
      id: "oir_bjnv01_q11",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 11,
      type: "non_verbal",
      subType: "embedded_figure",
      difficulty: "easy",
      tags: ["embedded", "triangle"],
      promptText:
        "Select the option in which the given right-angled triangle is embedded (rotation NOT allowed):",
      figures: {
        type: "svg",
        svgMarkup: svgFramed(`<polygon points="28,22 28,78 76,78" fill="none" stroke="currentColor" stroke-width="2.4"/>`),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(`<line x1="14" y1="86" x2="86" y2="14" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="50" x2="50" y2="86" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(`<line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="22" x2="88" y2="50" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(`<line x1="14" y1="22" x2="86" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="14" y1="50" x2="86" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="86" y1="50" x2="14" y2="78" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(`<line x1="12" y1="40" x2="88" y2="40" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="68" x2="88" y2="68" stroke="currentColor" stroke-width="1.8"/><line x1="28" y1="12" x2="28" y2="88" stroke="currentColor" stroke-width="1.8"/><line x1="28" y1="68" x2="88" y2="40" stroke="currentColor" stroke-width="1.8"/>`),
        },
      ],
      correctOption: "B",
      explanation:
        "In the top-right quadrant of Figure B, the central vertical line, middle horizontal line, and sloping diagonal form the exact upright right-angled triangle without rotation.",
    },
    // Q12
    {
      id: "oir_bjnv01_q12",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 12,
      type: "non_verbal",
      subType: "embedded_figure",
      difficulty: "easy",
      tags: ["embedded", "geometry"],
      promptText:
        "From the given answer figures, select the one in which the question figure is hidden/embedded:",
      figures: {
        type: "svg",
        svgMarkup: svgFramed(`<polyline points="72,30 44,30 28,70 74,70" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linejoin="round"/>`),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(`<rect x="18" y="18" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="36" x2="82" y2="36" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="66" x2="82" y2="66" stroke="currentColor" stroke-width="1.6"/><line x1="56" y1="36" x2="56" y2="82" stroke="currentColor" stroke-width="1.6"/><line x1="56" y1="66" x2="72" y2="36" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(`<rect x="18" y="18" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="36" x2="82" y2="36" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="66" x2="82" y2="66" stroke="currentColor" stroke-width="1.6"/><line x1="48" y1="36" x2="48" y2="82" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="66" x2="48" y2="36" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(`<rect x="18" y="18" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="36" x2="82" y2="36" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="66" x2="82" y2="66" stroke="currentColor" stroke-width="1.6"/><line x1="56" y1="36" x2="56" y2="82" stroke="currentColor" stroke-width="1.6"/><line x1="34" y1="66" x2="56" y2="48" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(`<rect x="18" y="18" width="64" height="64" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="36" x2="82" y2="36" stroke="currentColor" stroke-width="1.6"/><line x1="18" y1="66" x2="82" y2="66" stroke="currentColor" stroke-width="1.6"/><line x1="44" y1="36" x2="44" y2="82" stroke="currentColor" stroke-width="1.6"/><line x1="44" y1="66" x2="72" y2="36" stroke="currentColor" stroke-width="1.6"/>`),
        },
        { key: "E", text: "None of these" },
      ],
      correctOption: "B",
      explanation:
        "In Figure B, tracing along the upper horizontal line to the left-sloping diagonal down to the lower horizontal bar reproduces the exact shape.",
    },
    // Q13
    {
      id: "oir_bjnv01_q13",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 13,
      type: "non_verbal",
      subType: "embedded_figure",
      difficulty: "medium",
      tags: ["embedded", "polygon"],
      promptText:
        "Select the option in which the given figure is embedded (rotation is NOT allowed):",
      figures: {
        type: "svg",
        svgMarkup: svgFramed(`<polyline points="20,82 78,82 78,16 54,48 20,48 40,66 20,66 20,82" fill="none" stroke="currentColor" stroke-width="2" stroke-linejoin="round"/>`),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(`<line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="88" y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="50" y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="50" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="40" x2="88" y2="40" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="70" x2="88" y2="70" stroke="currentColor" stroke-width="1.4"/>`),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(`<line x1="12" y1="40" x2="88" y2="40" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="68" x2="88" y2="68" stroke="currentColor" stroke-width="1.4"/><line x1="36" y1="12" x2="36" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="64" y1="12" x2="64" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="88" y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="50" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.4"/>`),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(`<polygon points="50,12 88,88 12,88" fill="none" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="88" y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="1.4"/>`),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(`<line x1="12" y1="36" x2="88" y2="36" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="64" x2="88" y2="64" stroke="currentColor" stroke-width="1.4"/><line x1="36" y1="12" x2="36" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="64" y1="12" x2="64" y2="88" stroke="currentColor" stroke-width="1.4"/><line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.4"/>`),
        },
      ],
      correctOption: "B",
      explanation:
        "Tracing along the right edge from top-right down the diagonal to the mid-horizontal line, stepping left and down-right to the lower horizontal bar and left border gives the exact figure inside Figure B.",
    },
    // Q14
    {
      id: "oir_bjnv01_q14",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 14,
      type: "non_verbal",
      subType: "embedded_figure",
      difficulty: "easy",
      tags: ["embedded", "curves"],
      promptText: "Select the option in which the given curved J-hook figure is embedded (rotation NOT allowed):",
      figures: {
        type: "svg",
        svgMarkup: svgFramed(`<path d="M22,68 L62,68 Q74,68 74,54 L74,30" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round"/>`),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(`<line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.6"/><line x1="88" y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="1.6"/><path d="M88,52 A32,32 0 0,0 56,88" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(`<line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="50" x2="88" y2="50" stroke="currentColor" stroke-width="1.6"/><path d="M36,12 A24,24 0 0,0 12,36" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(`<line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.6"/><line x1="88" y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(`<line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.6"/><line x1="88" y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="1.6"/><path d="M18,50 L62,50 A12,12 0 0,0 74,38 L74,24" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
      ],
      correctOption: "D",
      explanation:
        "Figure D contains the horizontal middle segment curving smoothly upward into the vertical stem on the right.",
    },
    // Q15
    {
      id: "oir_bjnv01_q15",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 15,
      type: "non_verbal",
      subType: "paper_folding_cutting",
      difficulty: "medium",
      tags: ["paper-folding", "symmetry"],
      promptText:
        "A square paper is folded diagonally twice as shown in X, Y and punched in Z. How will it appear when unfolded?",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            `<line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4,3"/><path d="M68,30 Q46,30 42,50" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="39,46 42,55 46,47" fill="currentColor"/>`,
            `<polygon points="12,12 88,88 12,88" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.5" stroke-dasharray="4,3"/><path d="M26,48 Q26,64 44,68" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="40,71 49,69 42,64" fill="currentColor"/>`,
            `<polygon points="50,50 14,88 86,88" fill="none" stroke="currentColor" stroke-width="1.5"/><path d="M46,82 C54,74 56,66 50,66 C44,66 46,74 54,82" fill="none" stroke="currentColor" stroke-width="1.8"/>`,
          ],
          100,
          false
        ),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            `<rect x="40" y="40" width="20" height="20" fill="none" stroke="currentColor" stroke-width="1.6"/>` +
              [0, 90, 180, 270]
                .map((r) => `<g transform="translate(50,50) rotate(${r}) translate(-25,-25)"><path d="M-4,6 C4,-2 6,-8 0,-8 C-6,-8 -4,-2 4,6" fill="none" stroke="currentColor" stroke-width="1.6"/></g>`)
                .join("")
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            `<g transform="translate(50,22) rotate(180)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(50,78) rotate(180)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(22,50) rotate(90)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(78,50) rotate(-90)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>`
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            `<g transform="translate(50,22) rotate(180)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(50,78) rotate(0)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(22,50) rotate(-90)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(78,50) rotate(90)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>`
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            `<g transform="translate(50,22) rotate(0)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(50,78) rotate(0)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(22,50) rotate(90)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>
             <g transform="translate(78,50) rotate(-90)"><path d="M-5,7 C5,-2 7,-8 0,-8 C-7,-8 -5,-2 5,7" fill="none" stroke="currentColor" stroke-width="1.8"/></g>`
          ),
        },
      ],
      correctOption: "C",
      explanation:
        "Unfolding across the two diagonals reflects the bottom ribbon into all four quadrants: loops face inward/outward symmetrically across each fold diagonal, producing Figure C.",
    },
    // Q16
    {
      id: "oir_bjnv01_q16",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 16,
      type: "non_verbal",
      subType: "paper_folding_cutting",
      difficulty: "easy",
      tags: ["paper-folding", "symmetry"],
      promptText:
        "A paper is folded as shown in figures X, Y and punched in Z. Select the option depicting how it appears when unfolded:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            `<line x1="10" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3,3"/><path d="M50,74 L50,32" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="46,35 50,26 54,35" fill="currentColor"/>`,
            `<rect x="10" y="10" width="80" height="40" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="10" x2="50" y2="50" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3,3"/><path d="M28,30 L68,30" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="64,26 73,30 64,34" fill="currentColor"/>`,
            `<rect x="50" y="10" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5"/><ellipse cx="70" cy="30" rx="11" ry="7" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="59" y1="30" x2="81" y2="30" stroke="currentColor" stroke-width="1.4"/><line x1="70" y1="23" x2="70" y2="37" stroke="currentColor" stroke-width="1.4"/>`,
          ],
          100,
          false
        ),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            [
              [30, 30], [70, 30], [30, 70], [70, 70],
            ]
              .map(([cx, cy]) => `<ellipse cx="${cx}" cy="${cy}" rx="12" ry="8" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="${cx - 12}" y1="${cy}" x2="${cx + 12}" y2="${cy}" stroke="currentColor" stroke-width="1.4"/>`)
              .join("")
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            `<ellipse cx="30" cy="30" rx="8" ry="12" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="70" cy="30" rx="12" ry="8" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="30" cy="70" rx="12" ry="8" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="70" cy="70" rx="8" ry="12" fill="none" stroke="currentColor" stroke-width="1.6"/>`
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            `<ellipse cx="30" cy="30" rx="8" ry="12" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="70" cy="30" rx="12" ry="8" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="30" cy="70" rx="8" ry="12" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="70" cy="70" rx="8" ry="12" fill="none" stroke="currentColor" stroke-width="1.6"/>`
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            [
              [30, 30], [70, 30], [30, 70], [70, 70],
            ]
              .map(([cx, cy]) => `<ellipse cx="${cx}" cy="${cy}" rx="8" ry="12" fill="none" stroke="currentColor" stroke-width="1.6"/><line x1="${cx}" y1="${cy - 12}" x2="${cx}" y2="${cy + 12}" stroke="currentColor" stroke-width="1.4"/>`)
              .join("")
          ),
        },
      ],
      correctOption: "A",
      explanation:
        "Unfolding left across the vertical fold and then downward across the horizontal fold duplicates the horizontal cut into all four quadrants, giving Figure A.",
    },
    // Q17
    {
      id: "oir_bjnv01_q17",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 17,
      type: "non_verbal",
      subType: "paper_folding_cutting",
      difficulty: "easy",
      tags: ["paper-folding", "circle"],
      promptText:
        "The sequence of folding a circular paper and punching it is shown in X, Y and Z. How will it look when unfolded?",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            `<circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3,3"/><path d="M64,50 Q50,40 36,50" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="39,46 32,50 39,54" fill="currentColor"/>`,
            `<path d="M50,12 A38,38 0 0,0 50,88 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="50" x2="50" y2="50" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3,3"/><path d="M32,30 Q24,42 32,58" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="28,55 33,62 36,54" fill="currentColor"/>`,
            `<path d="M12,50 A38,38 0 0,0 50,88 L50,50 Z" fill="none" stroke="currentColor" stroke-width="1.8"/><circle cx="34" cy="64" r="5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="30,69 38,69 41,77 27,77" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
          ],
          100,
          false
        ),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="1.8"/>` +
              [34, 66].map((x) => `<circle cx="${x}" cy="38" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="${x - 4},33 ${x + 4},33 ${x + 7},25 ${x - 7},25" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("") +
              [34, 66].map((x) => `<circle cx="${x}" cy="62" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="${x - 4},67 ${x + 4},67 ${x + 7},75 ${x - 7},75" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="1.8"/>` +
              [34, 66].map((x) => [34, 70].map((y) => `<circle cx="${x}" cy="${y - 6}" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="${x - 4},${y - 1} ${x + 4},${y - 1} ${x + 7},${y + 7} ${x - 7},${y + 7}" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")).join("")
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="1.8"/>` +
              [34, 66].map((x) => [34, 70].map((y) => `<circle cx="${x}" cy="${y + 4}" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="${x - 4},${y - 1} ${x + 4},${y - 1} ${x + 7},${y - 9} ${x - 7},${y - 9}" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")).join("")
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            `<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="1.8"/>` +
              `<circle cx="34" cy="38" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="30,33 38,33 41,25 27,25" fill="none" stroke="currentColor" stroke-width="1.6"/>` +
              `<circle cx="66" cy="28" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="62,33 70,33 73,41 59,41" fill="none" stroke="currentColor" stroke-width="1.6"/>` +
              [34, 66].map((x) => `<circle cx="${x}" cy="62" r="4.5" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="${x - 4},67 ${x + 4},67 ${x + 7},75 ${x - 7},75" fill="none" stroke="currentColor" stroke-width="1.6"/>`).join("")
          ),
        },
      ],
      correctOption: "A",
      explanation:
        "Unfolding upward vertically flips the keyhole cut upside-down in both upper quadrants while keeping the lower quadrants upright, matching Figure A.",
    },
    // Q18
    {
      id: "oir_bjnv01_q18",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 18,
      type: "non_verbal",
      subType: "paper_folding_cutting",
      difficulty: "hard",
      tags: ["paper-folding", "triangles"],
      promptText: "A square sheet of paper is folded and punched as shown. How will it appear when unfolded?",
      figures: {
        type: "svg",
        svgMarkup: svgSeries(
          [
            `<line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3,3"/><line x1="20" y1="50" x2="45" y2="50" stroke="currentColor" stroke-width="1.6"/><polygon points="41,46 48,50 41,54" fill="currentColor"/>`,
            `<rect x="50" y="10" width="40" height="80" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="50" y1="50" x2="90" y2="50" stroke="currentColor" stroke-width="1.4" stroke-dasharray="3,3"/><line x1="70" y1="78" x2="70" y2="55" stroke="currentColor" stroke-width="1.6"/><polygon points="66,59 70,52 74,59" fill="currentColor"/>`,
            `<rect x="50" y="10" width="40" height="40" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="54,14 66,14 54,26" fill="none" stroke="currentColor" stroke-width="1.4"/><polygon points="78,14 86,25 70,25" fill="none" stroke="currentColor" stroke-width="1.4"/><polygon points="78,44 70,33 86,33" fill="none" stroke="currentColor" stroke-width="1.4"/><polygon points="86,46 86,35 74,46" fill="none" stroke="currentColor" stroke-width="1.4"/>`,
          ],
          100,
          false
        ),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            `<polygon points="14,14 28,14 21,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="46,14 34,14 46,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="54,14 66,14 54,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="78,14 86,25 70,25" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="14,86 28,86 21,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="46,86 34,86 46,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="54,86 66,86 54,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="78,86 86,75 70,75" fill="none" stroke="currentColor" stroke-width="1.4"/>`
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            `<polygon points="14,24 22,14 29,24" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="34,14 46,14 46,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="54,14 66,14 54,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="78,14 86,24 70,24" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="14,76 22,86 29,76" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="34,86 46,86 46,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="54,86 66,86 54,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="78,86 86,76 70,76" fill="none" stroke="currentColor" stroke-width="1.4"/>`
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            `<polygon points="14,25 21,14 29,25" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="34,14 46,14 46,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="54,14 66,14 54,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="78,14 86,25 70,25" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="86,46 86,35 74,46" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="86,54 86,65 74,54" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="14,46 14,35 26,46" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="14,54 14,65 26,54" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="14,75 21,86 29,75" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="34,86 46,86 46,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="54,86 66,86 54,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="78,86 86,75 70,75" fill="none" stroke="currentColor" stroke-width="1.4"/>`
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            `<polygon points="14,14 29,14 21,25" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="34,14 46,14 46,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="54,14 66,14 54,26" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="78,14 86,25 70,25" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="14,86 29,86 21,75" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="34,86 46,86 46,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="54,86 66,86 54,74" fill="none" stroke="currentColor" stroke-width="1.4"/>
             <polygon points="78,86 86,75 70,75" fill="none" stroke="currentColor" stroke-width="1.4"/>`
          ),
        },
      ],
      correctOption: "C",
      explanation:
        "Unfolding vertically across the horizontal midline mirrors all four triangles into the lower-right quarter; unfolding horizontally left mirrors both right quarters cleanly to yield Figure C.",
    },
    // Q19
    {
      id: "oir_bjnv01_q19",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 19,
      type: "non_verbal",
      subType: "transparent_sheet_folding",
      difficulty: "medium",
      tags: ["paper-folding", "transparent"],
      promptText:
        "Given here is a square transparent sheet with overlapping diamond patterns. How would the pattern appear when folded along the vertical dotted line?",
      figures: {
        type: "svg",
        svgMarkup: svgFramed(
          `<line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4,3"/>
           <polygon points="16,52 36,41 56,52 36,63" fill="none" stroke="currentColor" stroke-width="1.8"/>
           <polygon points="38,52 63,36 88,52 63,68" fill="none" stroke="currentColor" stroke-width="1.8"/>`
        ),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(`<line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4,3"/><polygon points="50,36 86,52 50,68" fill="none" stroke="currentColor" stroke-width="1.8"/><polyline points="50,42 74,52 50,62" fill="none" stroke="currentColor" stroke-width="1.8"/>`),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(`<line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4,3"/><polygon points="50,42 74,52 50,62" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="54,48 86,52 54,56" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(`<line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4,3"/><polygon points="50,36 88,52 50,68" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="50,43 66,52 50,61" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="50,45 78,52 50,59" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(`<line x1="50" y1="10" x2="50" y2="90" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4,3"/><polygon points="50,52 68,36 86,52 68,68" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="50,52 68,42 86,52 68,62" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
      ],
      correctOption: "C",
      explanation:
        "Folding the left half over onto the right half mirrors the small diamond AND the protruding tip of the large diamond across the dotted centerline, producing the intersecting double-chevron pattern in Figure C.",
    },
    // Q20
    {
      id: "oir_bjnv01_q20",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 20,
      type: "non_verbal",
      subType: "odd_one_out",
      difficulty: "medium",
      tags: ["classification", "counting"],
      promptText: "In the following question, select the figure which is different from the other three figures:",
      options: [
        { key: "A", text: "Figure A", svgMarkup: q20Grid([0, 1], [180, 0, -90], [1]) },
        { key: "B", text: "Figure B", svgMarkup: q20Grid([1], [0, -90, 90], [0]) },
        { key: "C", text: "Figure C", svgMarkup: q20Grid([1], [90, 0, 180], [0]) },
        { key: "D", text: "Figure D", svgMarkup: q20Grid([1], [180, 0, 90], [2]) },
      ],
      correctOption: "A",
      explanation:
        "Counting the small white square cutouts inside each pattern: Figures B, C, and D each contain 5 white squares, whereas Figure A contains 6 white squares (one extra cutout in the arches).",
    },
    // Q21
    {
      id: "oir_bjnv01_q21",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 21,
      type: "non_verbal",
      subType: "odd_one_out",
      difficulty: "medium",
      tags: ["classification", "geometry"],
      promptText: "Select the figure which is different from the other three responses:",
      options: [
        { key: "A", text: "Figure A", svgMarkup: q21Box("H", false) },
        { key: "B", text: "Figure B", svgMarkup: q21Box("V", false) },
        { key: "C", text: "Figure C", svgMarkup: q21Box("V", true) },
        { key: "D", text: "Figure D", svgMarkup: q21Box("H", false) },
      ],
      correctOption: "C",
      explanation:
        "In Figures A, B, and D the two small half-circle arcs curve outward toward the circle boundary, whereas in Figure C the two half-circles curve inward toward the center.",
    },
    // Q22
    {
      id: "oir_bjnv01_q22",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 22,
      type: "non_verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "polygons"],
      promptText: "Select the figure which is different from the other three figures:",
      options: [
        { key: "A", text: "Figure A", svgMarkup: q22Bot(`<polygon points="50,41 59,60 41,60" fill="none" stroke="currentColor" stroke-width="1.6"/>`) },
        { key: "B", text: "Figure B", svgMarkup: q22Bot(`<polygon points="44,41 59,41 55,60 41,60" fill="none" stroke="currentColor" stroke-width="1.6"/>`) },
        { key: "C", text: "Figure C", svgMarkup: q22Bot(`<polygon points="50,41 59,50 50,60 41,50" fill="none" stroke="currentColor" stroke-width="1.6"/>`) },
        { key: "D", text: "Figure D", svgMarkup: q22Bot(`<polygon points="46,41 54,41 59,60 41,60" fill="none" stroke="currentColor" stroke-width="1.6"/>`) },
      ],
      correctOption: "A",
      explanation:
        "The chest window in Figures B, C, and D contains a 4-sided quadrilateral (trapezoid/rhombus), whereas Figure A contains a 3-sided triangle.",
    },
    // Q23
    {
      id: "oir_bjnv01_q23",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 23,
      type: "non_verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "symmetry"],
      promptText: "Select the one which is different from the other three responses:",
      options: [
        { key: "A", text: "Fig A", svgMarkup: svgFramed(`<rect x="26" y="26" width="48" height="48" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="26" y1="26" x2="74" y2="74" stroke="currentColor" stroke-width="1.5"/><line x1="74" y1="26" x2="26" y2="74" stroke="currentColor" stroke-width="1.5"/>`) },
        { key: "B", text: "Fig B", svgMarkup: svgFramed(`<ellipse cx="50" cy="50" rx="16" ry="26" transform="rotate(45 50 50)" fill="none" stroke="currentColor" stroke-width="1.6"/><ellipse cx="50" cy="50" rx="16" ry="26" transform="rotate(-45 50 50)" fill="none" stroke="currentColor" stroke-width="1.6"/>`) },
        { key: "C", text: "Fig C", svgMarkup: svgFramed(`<circle cx="50" cy="50" r="26" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="24" x2="50" y2="76" stroke="currentColor" stroke-width="1.5"/><line x1="24" y1="50" x2="76" y2="50" stroke="currentColor" stroke-width="1.5"/>`) },
        { key: "D", text: "Fig D", svgMarkup: svgFramed(`<path d="M50,24 Q55,45 76,50 Q55,55 50,76 Q45,55 24,50 Q45,45 50,24 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`) },
      ],
      correctOption: "D",
      explanation:
        "Figures A, B, and C each contain intersecting internal lines that divide the shape into four compartments, whereas Figure D has an open interior with no dividing lines.",
    },
    // Q24
    {
      id: "oir_bjnv01_q24",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 24,
      type: "non_verbal",
      subType: "cube_folding",
      difficulty: "easy",
      tags: ["cube", "dice", "net"],
      promptText:
        "Which of the following cubes in the answer options CANNOT be made based on the unfolded cube net below?",
      figures: {
        type: "svg",
        svgMarkup: diceNetCross(cgSq, [cgHash, cgHex, cgBull, cgXBox], cgDice5),
      },
      options: [
        { key: "A", text: "Cube A", svgMarkup: isoCubeSvg(cgSq, cgHex, cgDice5) },
        { key: "B", text: "Cube B", svgMarkup: isoCubeSvg(cgSq, cgBull, cgXBox) },
        { key: "C", text: "Cube C", svgMarkup: isoCubeSvg(cgHex, cgHash, cgDice5) },
        { key: "D", text: "Cube D", svgMarkup: isoCubeSvg(cgSq, cgXBox, cgHash) },
      ],
      correctOption: "A",
      explanation:
        "In the net, the open square (□) lies opposite the 5-dot face (⚄), # lies opposite ◎, and the hexagon lies opposite the X-square. Cube A places □ adjacent to ⚄, so it cannot be formed.",
    },
    // Q25
    {
      id: "oir_bjnv01_q25",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 25,
      type: "non_verbal",
      subType: "cube_folding",
      difficulty: "easy",
      tags: ["cube", "dice", "net"],
      promptText:
        "Which of the following cubes CANNOT be made based on the unfolded cube net shown below?",
      figures: {
        type: "svg",
        svgMarkup: diceNetCross(cgBull, [cgDiv, cgMinus, cgNeq, cgEqBox], cgCrossX),
      },
      options: [
        { key: "A", text: "Cube A", svgMarkup: isoCubeSvg(cgNeq, cgDiv, cgMinus) },
        { key: "B", text: "Cube B", svgMarkup: isoCubeSvg(cgBull, cgDiv, cgMinus) },
        { key: "C", text: "Cube C", svgMarkup: isoCubeSvg(cgNeq, cgMinus, cgCrossX) },
        { key: "D", text: "Cube D", svgMarkup: isoCubeSvg(cgEqBox, cgBull, cgNeq) },
      ],
      correctOption: "A",
      explanation:
        "Opposite pairs in the net are ◎ ↔ ✖, − ↔ ⊟, and ÷ ↔ ≠. Cube A shows ÷ and ≠ adjacent, which is impossible.",
    },
    // Q26
    {
      id: "oir_bjnv01_q26",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 26,
      type: "non_verbal",
      subType: "cube_unfolding",
      difficulty: "hard",
      tags: ["cube", "dice", "net"],
      promptText: "Which of the following unfolded nets can be created by unfolding the given cube shown in 3 views?",
      figures: {
        type: "svg",
        svgMarkup: svgSeries([
          `<g transform="scale(0.85) translate(8,8)"><polygon points="50,14 82,30 50,46 18,30" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="18,30 50,46 50,84 18,68" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,46 82,30 82,68 50,84" fill="none" stroke="currentColor" stroke-width="2"/><text x="50" y="35" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">M</text><text x="34" y="68" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">H</text><text x="66" y="64" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">A</text></g>`,
          `<g transform="scale(0.85) translate(8,8)"><polygon points="50,14 82,30 50,46 18,30" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="18,30 50,46 50,84 18,68" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,46 82,30 82,68 50,84" fill="none" stroke="currentColor" stroke-width="2"/><text x="50" y="35" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">U</text><text x="34" y="68" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">M</text><text x="66" y="64" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">B</text></g>`,
          `<g transform="scale(0.85) translate(8,8)"><polygon points="50,14 82,30 50,46 18,30" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="18,30 50,46 50,84 18,68" fill="none" stroke="currentColor" stroke-width="2"/><polygon points="50,46 82,30 82,68 50,84" fill="none" stroke="currentColor" stroke-width="2"/><text x="50" y="35" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">S</text><text x="34" y="68" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">U</text><text x="66" y="64" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">B</text></g>`,
        ]),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            [
              [14, 10, "U"], [36, 10, "S"], [58, 10, "M"],
              [36, 30, "B"], [36, 50, "H"], [36, 70, "A"],
            ].map(([x, y, t]) => `<rect x="${x}" y="${y}" width="22" height="20" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="${Number(x) + 11}" y="${Number(y) + 14}" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${t}</text>`).join("")
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            [
              [14, 10, "U"], [36, 10, "B"], [58, 10, "H"],
              [36, 30, "S"], [36, 50, "M"], [36, 70, "A"],
            ].map(([x, y, t]) => `<rect x="${x}" y="${y}" width="22" height="20" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="${Number(x) + 11}" y="${Number(y) + 14}" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${t}</text>`).join("")
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            [
              [39, 10, "B"], [39, 30, "S"], [17, 50, "A"], [39, 50, "H"], [39, 70, "M"], [61, 70, "U"],
            ].map(([x, y, t]) => `<rect x="${x}" y="${y}" width="22" height="20" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="${Number(x) + 11}" y="${Number(y) + 14}" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${t}</text>`).join("")
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            [
              [39, 10, "S"], [39, 30, "M"], [17, 50, "B"], [39, 50, "H"], [39, 70, "A"], [61, 70, "U"],
            ].map(([x, y, t]) => `<rect x="${x}" y="${y}" width="22" height="20" fill="none" stroke="currentColor" stroke-width="1.4"/><text x="${Number(x) + 11}" y="${Number(y) + 14}" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${t}</text>`).join("")
          ),
        },
      ],
      correctOption: "C",
      explanation:
        "From the three views, M is adjacent to H, A, U, and B, leaving S opposite M (so M↔S, B↔H, U↔A). Only Figure C places every opposite pair on alternating/opposite faces.",
    },
    // Q27
    {
      id: "oir_bjnv01_q27",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 27,
      type: "non_verbal",
      subType: "cube_folding",
      difficulty: "medium",
      tags: ["cube", "dice", "net"],
      promptText: "From the given options, which answer figure can be formed by folding the unfolded net?",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          [
            [20, 8, "*"], [20, 32, "%"], [20, 56, "#"],
            [44, 56, "$"], [44, 80, ">"], [44, 104, "|"],
          ]
            .map(([x, y, ch]) => `<rect x="${x}" y="${y}" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.5"/><text x="${Number(x) + 12}" y="${Number(y) + 16}" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">${ch}</text>`)
            .join(""),
          90,
          136
        ),
      },
      options: [
        { key: "A", text: "Cube A", svgMarkup: isoCubeSvg(cgLetter("*"), cgLetter(">"), cgLetter("$")) },
        { key: "B", text: "Cube B", svgMarkup: isoCubeSvg(cgLetter("*"), cgLetter("#"), cgLetter("|")) },
        { key: "C", text: "Cube C", svgMarkup: isoCubeSvg(cgLetter("%"), cgLetter("$"), cgLetter("|")) },
        { key: "D", text: "Cube D", svgMarkup: isoCubeSvg(cgLetter("%"), cgLetter(">"), cgLetter("$")) },
      ],
      correctOption: "A",
      explanation:
        "Folding the staircase net gives opposite pairs: * ↔ #, $ ↔ |, and % ↔ >. Cubes B, C, and D each show an opposite pair adjacent, so only Cube A can be formed.",
    },
    // Q28
    {
      id: "oir_bjnv01_q28",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 28,
      type: "non_verbal",
      subType: "dice_opposite",
      difficulty: "easy",
      tags: ["cube", "dice"],
      promptText: "Two positions of a cube are shown below. Which symbol will be opposite to the face containing 'δ'?",
      figures: {
        type: "svg",
        svgMarkup: svgSeries([
          `<polygon points="50,14 82,30 50,46 18,30" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="18,30 50,46 50,84 18,68" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="50,46 82,30 82,68 50,84" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="50" y="34" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">δ</text><text x="34" y="68" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">∞</text><text x="66" y="64" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">α</text>`,
          `<polygon points="50,14 82,30 50,46 18,30" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="18,30 50,46 50,84 18,68" fill="none" stroke="currentColor" stroke-width="1.8"/><polygon points="50,46 82,30 82,68 50,84" fill="none" stroke="currentColor" stroke-width="1.8"/><text x="50" y="34" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">β</text><text x="34" y="68" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">θ</text><text x="66" y="64" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">α</text>`,
        ], 100, false),
      },
      options: [
        { key: "A", text: "δ" },
        { key: "B", text: "θ" },
        { key: "C", text: "β or θ" },
        { key: "D", text: "β" },
      ],
      correctOption: "D",
      explanation:
        "Both positions show 'α' on the same right face, rotating the 4 surrounding faces by 180°. Therefore Top 'δ' is directly opposite Top 'β' (and ∞ opposite θ) → β (D).",
    },
    // Q29
    {
      id: "oir_bjnv01_q29",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 29,
      type: "non_verbal",
      subType: "cube_folding",
      difficulty: "medium",
      tags: ["cube", "net"],
      promptText: "From the given options, which cube can be formed by folding the unfolded net below?",
      figures: {
        type: "svg",
        svgMarkup: svgCanvas(
          [
            { r: 0, c: 1, g: cgDot },
            { r: 1, c: 0, g: cgXBox },
            { r: 1, c: 1, g: cgSolid },
            { r: 2, c: 1, g: cgBlank },
            { r: 2, c: 2, g: cgMidline },
            { r: 3, c: 1, g: cgSmallSq },
          ]
            .map(({ r, c, g }) => {
              const x = 14 + c * 28;
              const y = 8 + r * 28;
              return `<rect x="${x}" y="${y}" width="28" height="28" fill="none" stroke="currentColor" stroke-width="1.5"/><g transform="translate(${x + 14},${y + 14}) scale(0.55)">${g}</g>`;
            })
            .join(""),
          112,
          128
        ),
      },
      options: [
        { key: "A", text: "Cube A", svgMarkup: isoCubeSvg(cgDot, cgBlank, cgSmallSq) },
        { key: "B", text: "Cube B", svgMarkup: isoCubeSvg(cgSolid, cgSmallSq, cgMidline) },
        { key: "C", text: "Cube C", svgMarkup: isoCubeSvg(cgXBox, cgMidline, cgSolid) },
        { key: "D", text: "Cube D", svgMarkup: isoCubeSvg(cgDot, cgSmallSq, cgXBox) },
      ],
      correctOption: "D",
      explanation:
        "Opposite pairs: dot ↔ blank, solid square ↔ small square, and X-box ↔ midline. Only Cube D pairs three mutually non-opposite faces (dot, small square, X-box) in valid orientation.",
    },
    // Q30
    {
      id: "oir_bjnv01_q30",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 30,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "mirror-image"],
      promptText: "Select the figure that can replace the question mark (?) in the following series:",
      figures: {
        type: "svg",
        svgMarkup: (() => {
          const p1 = `<polyline points="20,24 14,24 14,76 20,76" fill="none" stroke="currentColor" stroke-width="1.8"/><rect x="38" y="34" width="16" height="16" fill="currentColor"/><path d="M54,34 L54,50 L28,50 A22,22 0 1,0 54,34 Z" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
          const p2 = `<g transform="translate(100,0) scale(-1,1)">${p1}</g>`;
          const p3 = `<polygon points="18,44 74,44 88,50 74,56 18,56 30,50" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="22,42 48,42 36,30" fill="currentColor"/><polygon points="50,36 56,22 62,36" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="48,60 56,74 64,60" fill="none" stroke="currentColor" stroke-width="1.5"/>`;
          return svgSeries([p1, p2, p3]);
        })(),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            `<polygon points="82,44 26,44 12,50 26,56 82,56 70,50" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="78,42 52,42 64,30" fill="currentColor"/><polygon points="50,36 44,22 38,36" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="52,60 44,74 36,60" fill="none" stroke="currentColor" stroke-width="1.5"/>`
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            `<polygon points="82,44 26,44 12,50 26,56 82,56 70,50" fill="currentColor" opacity="0.75"/><polygon points="50,36 44,22 38,36" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="52,60 44,74 36,60" fill="none" stroke="currentColor" stroke-width="1.5"/>`
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            `<polygon points="18,44 74,44 88,50 74,56 18,56 30,50" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="50,36 56,22 62,36" fill="none" stroke="currentColor" stroke-width="1.5"/><polygon points="48,60 56,74 64,60" fill="none" stroke="currentColor" stroke-width="1.5"/>`
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            `<polygon points="18,44 74,44 88,50 74,56 18,56 30,50" fill="none" stroke="currentColor" stroke-width="1.6"/><polygon points="22,58 48,58 36,70" fill="currentColor"/><polygon points="50,36 56,22 62,36" fill="none" stroke="currentColor" stroke-width="1.5"/>`
          ),
        },
      ],
      correctOption: "A",
      explanation:
        "Figure 2 is the horizontal mirror image of Figure 1; similarly, Figure 4 must be the horizontal mirror image of Figure 3, yielding Figure A.",
    },
    // Q31
    {
      id: "oir_bjnv01_q31",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 31,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "water-image"],
      promptText: "Select the figure that can replace the question mark (?) in the following series:",
      figures: {
        type: "svg",
        svgMarkup: (() => {
          const f1 = `<polygon points="36,38 78,38 36,78" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="28" y1="62" x2="72" y2="28" stroke="currentColor" stroke-width="1.5"/><polygon points="67,27 75,26 71,33" fill="currentColor"/>`;
          const f2 = `<g transform="translate(0,100) scale(1,-1)">${f1}</g>`;
          const f3 = `<polygon points="38,38 76,38 54,58 38,80" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="28" y1="68" x2="54" y2="22" stroke="currentColor" stroke-width="1.5"/><polygon points="50,24 56,18 57,26" fill="currentColor"/>`;
          return svgSeries([f1, f2, f3]);
        })(),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(`<polygon points="38,38 76,38 54,58 38,80" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="54" y1="22" x2="28" y2="68" stroke="currentColor" stroke-width="1.5"/><polygon points="26,64 25,72 32,68" fill="currentColor"/>`),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(`<polygon points="38,38 76,38 54,58 38,80" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="26" y1="68" x2="56" y2="20" stroke="currentColor" stroke-width="1.5"/><polygon points="52,22 58,17 59,25" fill="currentColor"/>`),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(`<g transform="translate(0,100) scale(1,-1)"><polygon points="38,38 76,38 54,58 38,80" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="28" y1="68" x2="54" y2="22" stroke="currentColor" stroke-width="1.5"/><polygon points="50,24 56,18 57,26" fill="currentColor"/></g>`),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(`<g transform="translate(100,100) scale(-1,-1)"><polygon points="38,38 76,38 54,58 38,80" fill="none" stroke="currentColor" stroke-width="1.5"/><line x1="28" y1="68" x2="54" y2="22" stroke="currentColor" stroke-width="1.5"/><polygon points="50,24 56,18 57,26" fill="currentColor"/></g>`),
        },
      ],
      correctOption: "C",
      explanation:
        "Figure 2 is the vertical water image (top-to-bottom reflection) of Figure 1; taking the water image of Figure 3 produces Figure C.",
    },
    // Q32
    {
      id: "oir_bjnv01_q32",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 32,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "medium",
      tags: ["series", "rotation"],
      promptText: "Select the figure that will come next if the sequence is continued:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries([q32Wheel(1, 2), q32Wheel(1, 5), q32Wheel(7, 0), q32Wheel(7, 3)]),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q32Wheel(2, 3, false)) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q32Wheel(5, 6, false)) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q32Wheel(5, 7, false)) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q32Wheel(7, 6, false)) },
      ],
      correctOption: "B",
      explanation:
        "The star advances +3 sectors clockwise every step (2 → 5 → 0 → 3 → 6), while the diamond moves 0, −2, 0, −2 anti-clockwise (1 → 1 → 7 → 7 → 5), giving Figure B.",
    },
    // Q33
    {
      id: "oir_bjnv01_q33",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 33,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "hard",
      tags: ["series", "rotation", "polygons"],
      promptText: "Select the figure that will come next in the following figure series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries([
          q33Box(1, true, false, 7, "tri", false),
          q33Box(0, false, false, 6, "sq", true),
          q33Box(6, true, false, 4, "pent", false),
        ]),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q33Box(4, false, true, 1, "hex", true)) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q33Box(3, true, false, 1, "hex", false)) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q33Box(3, false, false, 1, "hex", true)) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q33Box(3, true, false, 1, "hex", true)) },
      ],
      correctOption: "C",
      explanation:
        "Both elements step −1, −2, −3 sectors anti-clockwise each frame: the hollow arrow moves 1 → 0 → 6 → 3 and flips up/down (down in step 4), while the polygon grows in sides (triangle → square → pentagon → solid hexagon) from 7 → 6 → 4 → 1 → Figure C.",
    },
    // Q34
    {
      id: "oir_bjnv01_q34",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 34,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "easy",
      tags: ["series", "rotation"],
      promptText: "Select the figure that will come next in the following figure series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries([q34Box(0), q34Box(-90), q34Box(-180)]),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q34Box(-270)) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q34Box(-90)) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q34Box(0) + `<polygon points="86,50 74,42 74,58" fill="currentColor"/>`) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q34Box(-180)) },
      ],
      correctOption: "A",
      explanation:
        "The entire four-arm configuration rotates 90° anti-clockwise at every step (0° → −90° → −180° → −270° = +90°), yielding Figure A.",
    },
    // Q35
    {
      id: "oir_bjnv01_q35",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 35,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "easy",
      tags: ["symmetry", "lines"],
      promptText: "Which answer figure will complete the pattern in the question figure?",
      figures: {
        type: "svg",
        svgMarkup: (() => {
          const tl = `<line x1="6" y1="6" x2="96" y2="96" stroke="currentColor" stroke-width="1.8"/><line x1="6" y1="96" x2="96" y2="6" stroke="currentColor" stroke-width="1.8"/><line x1="6" y1="96" x2="96" y2="48" stroke="currentColor" stroke-width="1.8"/><line x1="96" y1="6" x2="48" y2="96" stroke="currentColor" stroke-width="1.8"/>`;
          const tr = `<g transform="translate(100,0) scale(-1,1)">${tl}</g>`;
          const bl = `<g transform="translate(0,100) scale(1,-1)">${tl}</g>`;
          return grid2x2Puzzle(tl, tr, bl, qMarkBox);
        })(),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(`<line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="50" x2="88" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="12" x2="12" y2="88" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(`<line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="50" x2="50" y2="12" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(`<line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="50" x2="50" y2="88" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(`<line x1="12" y1="12" x2="88" y2="88" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="12" x2="50" y2="88" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "E", text: "None of these" },
      ],
      correctOption: "A",
      explanation:
        "Reflective symmetry across both midlines requires both main diagonals plus the two segments radiating from the quadrant corner to the midpoints of the top and left borders, giving Figure A.",
    },
    // Q36
    {
      id: "oir_bjnv01_q36",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 36,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "easy",
      tags: ["symmetry", "hexagon"],
      promptText: "Which answer figure will complete the missing top-left quadrant of the question figure?",
      figures: {
        type: "svg",
        svgMarkup: grid2x2Puzzle(
          qMarkBox,
          `<polyline points="4,30 46,30 78,96" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="56,22 64,10 72,22" fill="currentColor"/><polygon points="74,22 82,10 90,22" fill="currentColor"/>`,
          `<polyline points="96,70 54,70 22,4" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="10,78 26,78 18,90" fill="currentColor"/><polygon points="30,78 46,78 38,90" fill="currentColor"/>`,
          `<polyline points="4,70 46,70 78,4" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="56,78 72,78 64,90" fill="currentColor"/><polygon points="74,78 90,78 82,90" fill="currentColor"/>`
        ),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(`<polyline points="88,30 50,30 22,88" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="16,24 23,12 30,24" fill="currentColor"/><polygon points="33,24 40,12 47,24" fill="currentColor"/>`) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(`<polyline points="88,30 50,30 22,88" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="16,24 23,12 30,24" fill="currentColor"/>`) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(`<polyline points="22,30 58,30 88,88" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="58,24 65,12 72,24" fill="currentColor"/><polygon points="74,24 81,12 88,24" fill="currentColor"/>`) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(`<polyline points="88,30 50,30 22,88" fill="none" stroke="currentColor" stroke-width="2.2"/><polygon points="58,24 65,12 72,24" fill="currentColor"/><polygon points="74,24 81,12 88,24" fill="currentColor"/>`) },
      ],
      correctOption: "A",
      explanation:
        "Completing the top-left side of the central hexagon and placing the pair of upward-pointing triangles in the outer top-left corner yields Figure A.",
    },
    // Q37
    {
      id: "oir_bjnv01_q37",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 37,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "medium",
      tags: ["symmetry", "nested-squares"],
      promptText: "Which answer figure will complete the pattern in the question figure?",
      figures: {
        type: "svg",
        svgMarkup: (() => {
          const tl = `<polyline points="12,96 12,12 96,12" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="30,96 30,30 96,30" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="96" y1="48" x2="48" y2="48" stroke="currentColor" stroke-width="1.8"/><line x1="48" y1="48" x2="96" y2="96" stroke="currentColor" stroke-width="1.8"/><line x1="96" y1="70" x2="70" y2="70" stroke="currentColor" stroke-width="1.6"/>`;
          const tr = `<g transform="translate(100,0) scale(-1,1)">${tl}</g>`;
          const bl = `<g transform="translate(0,100) scale(1,-1)">${tl}</g>`;
          return grid2x2Puzzle(tl, tr, bl, qMarkBox);
        })(),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(`<polyline points="86,12 86,86 12,86" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="68,12 68,68 12,68" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="46" x2="50" y2="46" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="12" x2="50" y2="46" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(`<polyline points="86,12 86,86 12,86" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="68,12 68,68 12,68" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="30" x2="52" y2="30" stroke="currentColor" stroke-width="1.8"/><line x1="52" y1="12" x2="52" y2="52" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="12" x2="52" y2="52" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(`<polyline points="86,12 86,86 12,86" fill="none" stroke="currentColor" stroke-width="2"/><line x1="12" y1="48" x2="52" y2="48" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="12" x2="52" y2="48" stroke="currentColor" stroke-width="1.8"/>`) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(`<polyline points="86,12 86,86 12,86" fill="none" stroke="currentColor" stroke-width="2"/><polyline points="68,12 68,68 12,68" fill="none" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="50" x2="50" y2="50" stroke="currentColor" stroke-width="1.8"/><line x1="50" y1="50" x2="12" y2="12" stroke="currentColor" stroke-width="1.8"/><line x1="12" y1="30" x2="30" y2="30" stroke="currentColor" stroke-width="1.6"/>`) },
      ],
      correctOption: "D",
      explanation:
        "By symmetry across both midlines, the bottom-right quadrant completes the outer concentric L-frames plus the inner diagonal and horizontal stubs in Figure D.",
    },
    // Q38
    {
      id: "oir_bjnv01_q38",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 38,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "easy",
      tags: ["symmetry", "concentric-circles"],
      promptText: "Which answer figure will complete the pattern in the question figure?",
      figures: {
        type: "svg",
        svgMarkup: (() => {
          const tl = `<path d="M12,96 A84,84 0 0,1 96,12" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M28,96 A68,68 0 0,1 96,28" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M74,96 A22,22 0 0,1 96,74" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M40,78 A44,44 0 0,1 78,40 L84,54 A30,30 0 0,0 54,84 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
          const tr = `<g transform="translate(100,0) scale(-1,1)">${tl}</g>`;
          const bl = `<g transform="translate(0,100) scale(1,-1)">${tl}</g>`;
          return grid2x2Puzzle(tl, tr, bl, qMarkBox);
        })(),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(
            `<path d="M84,14 A70,70 0 0,1 14,84" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M70,14 A56,56 0 0,1 14,70" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M34,14 A20,20 0 0,1 14,34" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M58,28 A36,36 0 0,1 28,58 L23,45 A24,24 0 0,0 45,23 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`
          ),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(
            `<path d="M84,14 A70,70 0 0,1 14,84" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M70,14 A56,56 0 0,1 14,70" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M58,28 A36,36 0 0,1 28,58 L23,45 A24,24 0 0,0 45,23 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`
          ),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(
            `<path d="M84,14 A70,70 0 0,1 14,84" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M70,14 A56,56 0 0,1 14,70" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M34,14 A20,20 0 0,1 14,34" fill="none" stroke="currentColor" stroke-width="1.8"/>`
          ),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(
            `<path d="M84,14 A70,70 0 0,1 14,84" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M70,14 A56,56 0 0,1 14,70" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M22,14 A8,8 0 0,1 14,22" fill="none" stroke="currentColor" stroke-width="1.8"/><path d="M58,28 A36,36 0 0,1 28,58 L23,45 A24,24 0 0,0 45,23 Z" fill="none" stroke="currentColor" stroke-width="1.6"/>`
          ),
        },
      ],
      correctOption: "A",
      explanation:
        "Completing the concentric circular rings, the central quarter-circle arc, and the middle-ring curved wedge cleanly matches Figure A.",
    },
    // Q39
    {
      id: "oir_bjnv01_q39",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 39,
      type: "non_verbal",
      subType: "pattern_completion",
      difficulty: "medium",
      tags: ["symmetry", "diamond"],
      promptText: "Which answer figure will complete the pattern in the question figure?",
      figures: {
        type: "svg",
        svgMarkup: grid2x2Puzzle(
          `<line x1="4" y1="96" x2="96" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="42" y1="96" x2="96" y2="42" stroke="currentColor" stroke-width="1.5"/><circle cx="78" cy="78" r="4" fill="currentColor"/><polygon points="22,22 38,32 28,44" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
          `<line x1="96" y1="96" x2="4" y2="4" stroke="currentColor" stroke-width="1.5"/><line x1="58" y1="96" x2="4" y2="42" stroke="currentColor" stroke-width="1.5"/><circle cx="22" cy="78" r="4" fill="currentColor"/><polygon points="78,22 62,32 72,44" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
          `<line x1="4" y1="4" x2="96" y2="96" stroke="currentColor" stroke-width="1.5"/><line x1="42" y1="4" x2="96" y2="58" stroke="currentColor" stroke-width="1.5"/><circle cx="78" cy="22" r="4" fill="currentColor"/><polygon points="22,78 38,68 28,56" fill="none" stroke="currentColor" stroke-width="1.6"/>`,
          qMarkBox
        ),
      },
      options: [
        {
          key: "A",
          text: "Figure A",
          svgMarkup: svgFramed(`<line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="50" x2="50" y2="12" stroke="currentColor" stroke-width="1.6"/><circle cx="26" cy="24" r="3.5" fill="currentColor"/><circle cx="40" cy="40" r="3.5" fill="currentColor"/><polygon points="78,76 58,64 70,52" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "B",
          text: "Figure B",
          svgMarkup: svgFramed(`<line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="50" x2="50" y2="12" stroke="currentColor" stroke-width="1.6"/><circle cx="26" cy="24" r="3.5" fill="currentColor"/><polygon points="56,74 74,56 80,78" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "C",
          text: "Figure C",
          svgMarkup: svgFramed(`<line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="50" x2="50" y2="12" stroke="currentColor" stroke-width="1.6"/><circle cx="26" cy="24" r="3.5" fill="currentColor"/><circle cx="70" cy="70" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
        {
          key: "D",
          text: "Figure D",
          svgMarkup: svgFramed(`<line x1="12" y1="88" x2="88" y2="12" stroke="currentColor" stroke-width="1.6"/><line x1="12" y1="50" x2="50" y2="12" stroke="currentColor" stroke-width="1.6"/><circle cx="26" cy="24" r="3.5" fill="currentColor"/><polygon points="78,76 58,64 68,54" fill="none" stroke="currentColor" stroke-width="1.6"/>`),
        },
      ],
      correctOption: "D",
      explanation:
        "Completing the nested concentric diamonds requires a single dot in the inner top-left corner and the corner triangle reflected cleanly in the outer bottom-right region, giving Figure D.",
    },
    // Q40
    {
      id: "oir_bjnv01_q40",
      source: "Byjus",
      sourceBookletId: "oir-byjus-nv-01",
      sourceBookletName: "Byju's Exam Prep OIR Non-Verbal Reasoning Mock Test 1",
      questionNumber: 40,
      type: "non_verbal",
      subType: "figure_series",
      difficulty: "easy",
      tags: ["series", "counting", "alternating"],
      promptText: "Select the figure that can replace the question mark (?) in the following figure series:",
      figures: {
        type: "svg",
        svgMarkup: svgSeries([q40Box("dot", 2, "tri", 3), q40Box("tri", 3, "dot", 3), q40Box("dot", 3, "tri", 4)]),
      },
      options: [
        { key: "A", text: "Figure A", svgMarkup: svgFramed(q40Box("dot", 3, "tri", 2)) },
        { key: "B", text: "Figure B", svgMarkup: svgFramed(q40Box("tri", 4, "dot", 4)) },
        { key: "C", text: "Figure C", svgMarkup: svgFramed(q40Box("tri", 4, "dot", 3)) },
        { key: "D", text: "Figure D", svgMarkup: svgFramed(q40Box("dot", 3, "tri", 3)) },
      ],
      correctOption: "B",
      explanation:
        "Dots and triangles swap top/bottom sides on each frame while alternating +1 increments: (2 dots, 3 ▲) → (3 ▲, 3 dots) → (3 dots, 4 ▲) → (4 ▲, 4 dots) = Figure B.",
    },
  ],
};
