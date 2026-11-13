/**
 * Clean, lightweight SVG vector generators for CSSS Space & Form Perception
 * Fully theme-adaptive using currentColor, canvas borders, and military accents.
 */

export function createCubeNetSvg(faces: [string, string, string, string, string, string]): string {
  // Standard T-cross net:
  //      [0]
  //   [1][2][3][4]
  //      [5]
  // Each cell is 40x40. Total viewBox: 0 0 200 150
  return `
    <svg viewBox="0 0 220 150" class="w-full max-w-[240px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .net-box { fill: var(--canvas-surface, #1e293b); stroke: var(--canvas-border, #475569); stroke-width: 2; }
          .net-txt { font-family: monospace; font-size: 16px; font-weight: bold; fill: var(--fg-primary, #f8fafc); text-anchor: middle; dominant-baseline: central; }
        </style>
      </defs>
      <!-- Face 0 (Top) -->
      <rect x="75" y="10" width="35" height="35" class="net-box" rx="2" />
      <text x="92.5" y="27.5" class="net-txt">${faces[0]}</text>
      
      <!-- Middle Row: Face 1, Face 2, Face 3, Face 4 -->
      <rect x="40" y="45" width="35" height="35" class="net-box" rx="2" />
      <text x="57.5" y="62.5" class="net-txt">${faces[1]}</text>

      <rect x="75" y="45" width="35" height="35" class="net-box" rx="2" />
      <text x="92.5" y="62.5" class="net-txt">${faces[2]}</text>

      <rect x="110" y="45" width="35" height="35" class="net-box" rx="2" />
      <text x="127.5" y="62.5" class="net-txt">${faces[3]}</text>

      <rect x="145" y="45" width="35" height="35" class="net-box" rx="2" />
      <text x="162.5" y="62.5" class="net-txt">${faces[4]}</text>

      <!-- Face 5 (Bottom) -->
      <rect x="75" y="80" width="35" height="35" class="net-box" rx="2" />
      <text x="92.5" y="97.5" class="net-txt">${faces[5]}</text>
    </svg>
  `.trim();
}

export function createIsometricCubeOptionSvg(top: string, left: string, right: string): string {
  // Isometric cube showing 3 visible faces: Top rhombus, Left parallelogram, Right parallelogram
  return `
    <svg viewBox="0 0 100 100" class="w-16 h-16 mx-auto" xmlns="http://www.w3.org/2000/svg">
      <!-- Top Face: (50,15) - (80,32) - (50,49) - (20,32) -->
      <polygon points="50,15 80,32 50,49 20,32" fill="var(--canvas-surface-subtle, #334155)" stroke="var(--canvas-border, #64748b)" stroke-width="1.5" />
      <text x="50" y="32" font-family="monospace" font-size="12" font-weight="bold" fill="var(--fg-primary, #f8fafc)" text-anchor="middle" dominant-baseline="central">${top}</text>

      <!-- Left Face: (20,32) - (50,49) - (50,85) - (20,68) -->
      <polygon points="20,32 50,49 50,85 20,68" fill="var(--canvas-surface, #1e293b)" stroke="var(--canvas-border, #64748b)" stroke-width="1.5" />
      <text x="35" y="58" font-family="monospace" font-size="12" font-weight="bold" fill="var(--fg-primary, #f8fafc)" text-anchor="middle" dominant-baseline="central">${left}</text>

      <!-- Right Face: (50,49) - (80,32) - (80,68) - (50,85) -->
      <polygon points="50,49 80,32 80,68 50,85" fill="var(--canvas-surface-subtle, #0f172a)" stroke="var(--canvas-border, #64748b)" stroke-width="1.5" />
      <text x="65" y="58" font-family="monospace" font-size="12" font-weight="bold" fill="var(--fg-primary, #f8fafc)" text-anchor="middle" dominant-baseline="central">${right}</text>
    </svg>
  `.trim();
}

export function createHiddenFigureSvg(keyShape: string, complexContext: string): string {
  return `
    <svg viewBox="0 0 200 120" class="w-full max-w-[220px] h-auto mx-auto" xmlns="http://www.w3.org/2000/svg">
      <rect x="5" y="5" width="80" height="110" rx="4" fill="var(--canvas-surface, #1e293b)" stroke="var(--primary-accent, #0284c7)" stroke-width="2" />
      <text x="45" y="20" font-family="monospace" font-size="10" font-weight="bold" fill="var(--primary-accent, #0284c7)" text-anchor="middle">KEY FIGURE</text>
      ${keyShape}

      <rect x="95" y="5" width="100" height="110" rx="4" fill="var(--canvas-surface, #1e293b)" stroke="var(--canvas-border, #475569)" stroke-width="1.5" />
      <text x="145" y="20" font-family="monospace" font-size="10" font-weight="bold" fill="var(--fg-muted, #94a3b8)" text-anchor="middle">COMPLEX MATRIX</text>
      ${complexContext}
    </svg>
  `.trim();
}
