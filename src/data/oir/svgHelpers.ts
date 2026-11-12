/**
 * Lightweight SVG helper primitives for crisp, theme-aware OIR non-verbal diagrams.
 * All graphics use `currentColor` so they adapt automatically to Light (Air Force)
 * and Dark (Olive Army) themes.
 */

let hatchUid = 0;

export function svgCanvas(body: string, width = 100, height = 100): string {
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" class="w-full h-full">${body}</svg>`;
}

export function svgFramed(body: string, size = 100): string {
  return svgCanvas(
    `<rect x="4" y="4" width="${size - 8}" height="${size - 8}" rx="4" fill="none" stroke="currentColor" stroke-width="2" stroke-opacity="0.45"/>${body}`,
    size,
    size
  );
}

/**
 * Generates a unique hatch `<pattern>` definition and returns `{ def, fill }`.
 */
export function makeHatch(
  kind: "diag" | "diag2" | "horiz" | "vert" | "grid" | "dots" = "diag"
): { def: string; fill: string } {
  const id = `oir_h_${++hatchUid}`;
  let pat = "";
  if (kind === "diag") {
    pat = `<pattern id="${id}" width="6" height="6" patternTransform="rotate(45 0 0)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="1.7"/></pattern>`;
  } else if (kind === "diag2") {
    pat = `<pattern id="${id}" width="6" height="6" patternTransform="rotate(-45 0 0)" patternUnits="userSpaceOnUse"><line x1="0" y1="0" x2="0" y2="6" stroke="currentColor" stroke-width="1.7"/></pattern>`;
  } else if (kind === "horiz") {
    pat = `<pattern id="${id}" width="6" height="5" patternUnits="userSpaceOnUse"><line x1="0" y1="2.5" x2="6" y2="2.5" stroke="currentColor" stroke-width="1.5"/></pattern>`;
  } else if (kind === "vert") {
    pat = `<pattern id="${id}" width="5" height="6" patternUnits="userSpaceOnUse"><line x1="2.5" y1="0" x2="2.5" y2="6" stroke="currentColor" stroke-width="1.5"/></pattern>`;
  } else if (kind === "dots") {
    pat = `<pattern id="${id}" width="5" height="5" patternUnits="userSpaceOnUse"><circle cx="2.5" cy="2.5" r="1.1" fill="currentColor"/></pattern>`;
  } else {
    pat = `<pattern id="${id}" width="6" height="6" patternUnits="userSpaceOnUse"><line x1="0" y1="3" x2="6" y2="3" stroke="currentColor" stroke-width="1.15"/><line x1="3" y1="0" x2="3" y2="6" stroke="currentColor" stroke-width="1.15"/></pattern>`;
  }
  return { def: `<defs>${pat}</defs>`, fill: `url(#${id})` };
}

/**
 * Renders a sequence of figure-series panels ending with `[ ? ]` in a horizontal strip.
 */
export function svgSeries(panels: string[], cell = 84, showQuestionMark = true): string {
  const items = showQuestionMark
    ? [...panels, `<text x="${cell / 2}" y="${cell / 2 + 7}" text-anchor="middle" font-size="24" font-weight="700" fill="currentColor" fill-opacity="0.45">?</text>`]
    : panels;
  const gap = 8;
  const totalW = items.length * cell + (items.length - 1) * gap;
  const body = items
    .map((p, idx) => {
      const x = idx * (cell + gap);
      return `<g transform="translate(${x}, 0)"><rect x="2" y="2" width="${cell - 4}" height="${cell - 4}" rx="5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-opacity="0.35"/>${p}</g>`;
    })
    .join("");
  return svgCanvas(body, totalW, cell);
}

/**
 * Renders CLASS A (3-4 panels) and CLASS B (3-4 panels) side by side in a crisp SVG.
 */
export function svgClassAB(classA: string[], classB: string[], cell = 82): string {
  const gap = 6;
  const groupGap = 32;
  const wA = classA.length * cell + (classA.length - 1) * gap;
  const wB = classB.length * cell + (classB.length - 1) * gap;
  const totalW = wA + groupGap + wB;
  const headerH = 22;
  const totalH = headerH + cell + 4;

  const renderGroup = (items: string[], offsetX: number, label: string) => {
    const gw = items.length * cell + (items.length - 1) * gap;
    const labelEl = `<text x="${offsetX + gw / 2}" y="14" text-anchor="middle" font-size="11" font-weight="800" letter-spacing="1.2" fill="currentColor">${label}</text>`;
    const boxes = items
      .map((p, i) => {
        const x = offsetX + i * (cell + gap);
        return `<g transform="translate(${x}, ${headerH})"><rect x="1.5" y="1.5" width="${cell - 3}" height="${cell - 3}" rx="4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-opacity="0.55"/>${p}</g>`;
      })
      .join("");
    return labelEl + boxes;
  };

  return svgCanvas(
    renderGroup(classA, 0, "CLASS A") + renderGroup(classB, wA + groupGap, "CLASS B"),
    totalW,
    totalH
  );
}

/**
 * Renders visual analogy `[ A ] IS TO [ B ]   AS   [ C ] IS TO [ ? ]`.
 */
export function svgAnalogy(a: string, b: string, c: string, cell = 90): string {
  const textW = 46;
  const totalW = cell * 4 + textW * 3 + 24;
  const h = cell + 20;
  const y0 = 16;

  const xA = 4;
  const xT1 = xA + cell;
  const xB = xT1 + textW;
  const xT2 = xB + cell;
  const xC = xT2 + textW + 8;
  const xT3 = xC + cell;
  const xQ = xT3 + textW;

  const box = (x: number, title: string, inner: string) =>
    `<text x="${x + cell / 2}" y="12" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor">${title}</text><g transform="translate(${x}, ${y0})"><rect x="1.5" y="1.5" width="${cell - 3}" height="${cell - 3}" rx="4" fill="none" stroke="currentColor" stroke-width="1.8" stroke-opacity="0.6"/>${inner}</g>`;

  const midY = y0 + cell / 2 + 4;
  const lbl = (x: number, t: string) =>
    `<text x="${x + textW / 2}" y="${midY}" text-anchor="middle" font-size="10.5" font-weight="700" fill="currentColor" fill-opacity="0.75">${t}</text>`;

  return svgCanvas(
    box(xA, "A", a) +
      lbl(xT1, "IS TO") +
      box(xB, "B", b) +
      lbl(xT2, "AS") +
      box(xC, "C", c) +
      lbl(xT3, "IS TO") +
      box(
        xQ,
        "?",
        `<text x="${cell / 2}" y="${cell / 2 + 8}" text-anchor="middle" font-size="26" font-weight="800" fill="currentColor" fill-opacity="0.45">?</text>`
      ),
    totalW,
    h
  );
}
