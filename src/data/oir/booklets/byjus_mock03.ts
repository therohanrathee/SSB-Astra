import { OIRBooklet } from "../types";
import { svgCanvas } from "../svgHelpers";

function grid3x3Svg(rows: string[][], w = 186, h = 108): string {
  const cw = w / 3;
  const ch = h / 3;
  let body = `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  for (let r = 1; r < 3; r++) {
    body += `<line x1="1" y1="${r * ch}" x2="${w - 1}" y2="${r * ch}" stroke="currentColor" stroke-width="1.4"/>`;
    body += `<line x1="${r * cw}" y1="1" x2="${r * cw}" y2="${h - 1}" stroke="currentColor" stroke-width="1.4"/>`;
  }
  rows.forEach((row, r) => {
    row.forEach((val, c) => {
      body += `<text x="${c * cw + cw / 2}" y="${r * ch + ch / 2 + 5.5}" text-anchor="middle" font-size="16" font-weight="700" fill="currentColor">${val}</text>`;
    });
  });
  return svgCanvas(body, w, h);
}

const wheelQ35Svg = svgCanvas(
  `<circle cx="70" cy="60" r="50" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <line x1="70" y1="10" x2="70" y2="110" stroke="currentColor" stroke-width="1.4"/>
   <line x1="26.7" y1="35" x2="113.3" y2="85" stroke="currentColor" stroke-width="1.4"/>
   <line x1="26.7" y1="85" x2="113.3" y2="35" stroke="currentColor" stroke-width="1.4"/>
   <text x="86" y="34" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">8</text>
   <text x="104" y="64" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">13</text>
   <text x="86" y="92" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">18</text>
   <text x="54" y="96" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">24</text>
   <text x="36" y="64" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">39</text>
   <text x="54" y="34" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">?</text>`,
  140,
  120
);

const starQ36Svg = svgCanvas(
  `<polygon points="80,10 96,52 142,52 105,78 120,124 80,96 40,124 55,78 18,52 64,52" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
   <text x="80" y="42" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">18</text>
   <text x="108" y="66" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">36</text>
   <text x="98" y="98" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">?</text>
   <text x="62" y="98" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">432</text>
   <text x="52" y="66" text-anchor="middle" font-size="11.5" font-weight="700" fill="currentColor">2160</text>`,
  160,
  134
);

const cartQ37Svg = (() => {
  const drawCart = (ox: number, topVal: string, wheels: string[]) => {
    let s = `<rect x="${ox}" y="8" width="24" height="24" fill="none" stroke="currentColor" stroke-width="1.6"/>
      <text x="${ox + 12}" y="24" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">${topVal}</text>
      <rect x="${ox}" y="32" width="110" height="32" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
    wheels.forEach((v, i) => {
      const cx = ox + 11 + i * 22;
      s += `<circle cx="${cx}" cy="74" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
        <text x="${cx}" y="78" text-anchor="middle" font-size="11" font-weight="700" fill="currentColor">${v}</text>`;
    });
    return s;
  };
  return svgCanvas(
    drawCart(12, "28", ["7", "4", "7", "3", "7"]) +
      drawCart(146, "?", ["9", "-4", "-2", "0", "0"]),
    270,
    92
  );
})();

const ySpokesQ38Svg = svgCanvas(
  `<rect x="10" y="10" width="116" height="86" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <path d="M68,24 V54 L46,78 M68,54 L90,78" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <text x="52" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">8</text>
   <text x="84" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">5</text>
   <text x="68" y="75" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">3</text>
   <rect x="144" y="10" width="116" height="86" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <path d="M202,24 V54 L180,78 M202,54 L224,78" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <text x="184" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">17</text>
   <text x="220" y="48" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">11</text>
   <text x="202" y="75" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">?</text>`,
  270,
  106
);

const sportsQ39Svg = svgCanvas(
  `<rect x="8" y="8" width="214" height="84" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <text x="24" y="28" font-size="12" font-weight="700" fill="currentColor">Roger Federer</text>
   <text x="182" y="28" text-anchor="middle" font-size="12" font-weight="700" fill="currentColor">Tennis</text>
   <text x="24" y="74" font-size="12" font-weight="700" fill="currentColor">Moeen Ali</text>
   <text x="182" y="74" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">?</text>`,
  230,
  100
);

const letterArrowQ40Svg = svgCanvas(
  `<rect x="8" y="8" width="174" height="82" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <text x="28" y="34" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">A</text>
   <line x1="48" y1="30" x2="112" y2="30" stroke="currentColor" stroke-width="1.6"/><polygon points="124,30 110,25 110,35" fill="none" stroke="currentColor" stroke-width="1.4"/>
   <text x="148" y="34" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">J</text>
   <text x="28" y="72" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">F</text>
   <line x1="48" y1="68" x2="112" y2="68" stroke="currentColor" stroke-width="1.6"/><polygon points="124,68 110,63 110,73" fill="none" stroke="currentColor" stroke-width="1.4"/>
   <text x="148" y="72" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">?</text>`,
  190,
  98
);

export const BYJUS_MOCK_03: OIRBooklet = {
  id: "oir-byjus-03",
  source: "Byjus",
  bookletNumber: "BYJUS-03",
  title: "Byju's Exam Prep OIR Verbal Mock Test 3",
  category: "verbal",
  totalQuestions: 40,
  durationMinutes: 18,
  markingScheme: { correct: 1, incorrect: 0 },
  description:
    "Authentic 40-question Byju's Exam Prep Verbal Reasoning Mock Test 3 with vector-rebuilt number grids, wheel puzzles, star progressions, analogies, coding-decoding, and word-order sequences.",
  questions: [
    {
      id: "oir_bj03_q01",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 1,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy", "geometry"],
      promptText: "Diagonal is to Square as Diameter is to ________.",
      options: [
        { key: "A", text: "Volume" },
        { key: "B", text: "Circle" },
        { key: "C", text: "Radius" },
        { key: "D", text: "Circumference" },
        { key: "E", text: "Cylinder" },
      ],
      correctOption: "B",
      explanation:
        "A diagonal is the longest internal segment across a Square; likewise, a Diameter is the longest chord across a Circle (Option B).",
    },
    {
      id: "oir_bj03_q02",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 2,
      type: "verbal",
      subType: "numerical_reasoning",
      difficulty: "easy",
      tags: ["arithmetic", "algebra"],
      promptText:
        "The number when multiplied by itself is 6 less than one half of 44. The number is ________.",
      options: [
        { key: "A", text: "2" },
        { key: "B", text: "4" },
        { key: "C", text: "6" },
        { key: "D", text: "8" },
      ],
      correctOption: "B",
      explanation:
        "Half of 44 is 22; 6 less than 22 is 16. Since x² = 16, the positive number is 4 (Option B).",
    },
    {
      id: "oir_bj03_q03",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 3,
      type: "verbal",
      subType: "letter_series",
      difficulty: "easy",
      tags: ["series", "letters"],
      promptText:
        "Find the two letters which will come next in the series:\nA,  F,  J,  M,  O,  __,  __",
      options: [
        { key: "A", text: "O, P" },
        { key: "B", text: "P, P" },
        { key: "C", text: "Q, P" },
        { key: "D", text: "P, R" },
      ],
      correctOption: "B",
      explanation:
        "Steps decrease by 1 each time (+5, +4, +3, +2, +1, +0): A→F→J→M→O→P→P (Option B).",
    },
    {
      id: "oir_bj03_q04",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 4,
      type: "verbal",
      subType: "alphabet_position",
      difficulty: "easy",
      tags: ["alphabet", "position"],
      promptText:
        "What will be the fourth letter before the seventh letter after M in the alphabet?\nA B C D E F G H I J K L M N O P Q R S T U V W X Y Z",
      options: [
        { key: "A", text: "M" },
        { key: "B", text: "P" },
        { key: "C", text: "T" },
        { key: "D", text: "U" },
      ],
      correctOption: "B",
      explanation:
        "The 7th letter after M is T (13 + 7 = 20). The 4th letter before T is P (20 − 4 = 16) → Option B.",
    },
    {
      id: "oir_bj03_q05",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 5,
      type: "verbal",
      subType: "number_series",
      difficulty: "easy",
      tags: ["series", "fractions"],
      promptText:
        "Find the two numbers which will come next in the series:\n3/4,  5/7,  7/10,  9/13,  11/16,  ____,  ____",
      options: [
        { key: "A", text: "12/13, 14/15" },
        { key: "B", text: "13/15, 17/19" },
        { key: "C", text: "13/19, 15/22" },
        { key: "D", text: "13/18, 15/20" },
      ],
      correctOption: "C",
      explanation:
        "Numerators increase by +2 (11 → 13 → 15) and denominators increase by +3 (16 → 19 → 22), giving 13/19, 15/22 (Option C).",
    },
    {
      id: "oir_bj03_q06",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 6,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy", "calendar"],
      promptText: "Tomorrow is to Yesterday as Tuesday is to ________?",
      options: [
        { key: "A", text: "Wednesday" },
        { key: "B", text: "Thursday" },
        { key: "C", text: "Sunday" },
        { key: "D", text: "Monday" },
      ],
      correctOption: "C",
      explanation:
        "Yesterday is 2 days before Tomorrow; similarly, 2 days before Tuesday is Sunday (Option C).",
    },
    {
      id: "oir_bj03_q07",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 7,
      type: "verbal",
      subType: "synonyms",
      difficulty: "easy",
      tags: ["vocabulary", "synonyms"],
      promptText: "'Digress' means the same as ________?",
      options: [
        { key: "A", text: "To suggest" },
        { key: "B", text: "To turn aside" },
        { key: "C", text: "To give dignity" },
        { key: "D", text: "To be angry" },
      ],
      correctOption: "B",
      explanation:
        "Digress means to leave the main subject temporarily or turn aside from a path (Option B).",
    },
    {
      id: "oir_bj03_q08",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 8,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "easy",
      tags: ["coding", "substitution"],
      promptText:
        "If PALE is coded as 2134 and EARTH is coded as 41590, how is PEARL coded in that language?",
      options: [
        { key: "A", text: "25430" },
        { key: "B", text: "29530" },
        { key: "C", text: "25413" },
        { key: "D", text: "24153" },
      ],
      correctOption: "D",
      explanation:
        "Direct letter-digit mapping: P=2, E=4, A=1, R=5, L=3. Hence PEARL = 24153 (Option D).",
    },
    {
      id: "oir_bj03_q09",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 9,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "pairs"],
      promptText: "Find the odd one out:",
      options: [
        { key: "A", text: "Circle : Diameter" },
        { key: "B", text: "Chair : House" },
        { key: "C", text: "Flower : Petal" },
        { key: "D", text: "Book : Title" },
      ],
      correctOption: "B",
      explanation:
        "Diameter belongs to a circle, petal is a part of a flower, and title belongs to a book, whereas Chair and House are two distinct standalone objects (Option B).",
    },
    {
      id: "oir_bj03_q10",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 10,
      type: "verbal",
      subType: "numerical_reasoning",
      difficulty: "easy",
      tags: ["arithmetic", "fractions"],
      promptText:
        "Tommy weighs three-fourths of his weight plus 12 kgs. How much is his total weight?",
      options: [
        { key: "A", text: "40" },
        { key: "B", text: "45" },
        { key: "C", text: "48" },
        { key: "D", text: "42" },
      ],
      correctOption: "C",
      explanation:
        "Let weight be x: x = (3/4)x + 12 ⇒ (1/4)x = 12 ⇒ x = 48 kg (Option C).",
    },
    {
      id: "oir_bj03_q11",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 11,
      type: "verbal",
      subType: "number_counting",
      difficulty: "easy",
      tags: ["counting", "attention"],
      promptText:
        "5,  26,  12,  27,  15,  9,  7,  10,  23,  1,  22,  14,  31,  17,  3\nIn the above sequence, how many numbers being odd are greater than 7 and smaller than 23?",
      options: [
        { key: "A", text: "4" },
        { key: "B", text: "2" },
        { key: "C", text: "3" },
        { key: "D", text: "1" },
      ],
      correctOption: "C",
      explanation:
        "Strictly between 7 and 23 (odd only): 15, 9, and 17. Total count = 3 (Option C).",
    },
    {
      id: "oir_bj03_q12",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 12,
      type: "verbal",
      subType: "vocabulary_logic",
      difficulty: "easy",
      tags: ["vocabulary"],
      promptText: "An outrageous person can easily be ___________?",
      options: [
        { key: "A", text: "Satisfied" },
        { key: "B", text: "Pleased" },
        { key: "C", text: "Offended" },
        { key: "D", text: "Tough" },
      ],
      correctOption: "C",
      explanation:
        "Official Byju's Key: Offended (C).",
    },
    {
      id: "oir_bj03_q13",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 13,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy", "geometry"],
      promptText: "Triangle is to Prism as Circle is to __________?",
      options: [
        { key: "A", text: "Cylinder" },
        { key: "B", text: "Sphere" },
        { key: "C", text: "Radius" },
        { key: "D", text: "Chord" },
      ],
      correctOption: "B",
      explanation:
        "Mapping a 2D figure to its 3D counterpart: Triangle → Prism, and per the Byju's solution key Circle → Sphere (Option B).",
    },
    {
      id: "oir_bj03_q14",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 14,
      type: "verbal",
      subType: "letter_series",
      difficulty: "easy",
      tags: ["series", "letters"],
      promptText: "Complete the series:\nSCD,  TEF,  UGH,  ____,  WKL",
      options: [
        { key: "A", text: "DCS" },
        { key: "B", text: "HIJ" },
        { key: "C", text: "VIJ" },
        { key: "D", text: "LMK" },
      ],
      correctOption: "C",
      explanation:
        "First letter advances sequentially (S, T, U, V, W) and the trailing pair steps by +2 (CD, EF, GH, IJ, KL) → VIJ (Option C).",
    },
    {
      id: "oir_bj03_q15",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 15,
      type: "verbal",
      subType: "digit_counting",
      difficulty: "easy",
      tags: ["counting", "attention"],
      promptText:
        "How many 6's are there in the following sequence which are followed by 3 and preceded by 8?\n5  4  8  6  3  2  7  1  8  6  8  1  8  1  3  6  8  9  0  8  6  3  1  3  6  8  4  3  2  3  5",
      options: [
        { key: "A", text: "1" },
        { key: "B", text: "2" },
        { key: "C", text: "3" },
        { key: "D", text: "4" },
      ],
      correctOption: "B",
      explanation:
        "Looking for '8 6 3': 5 4 [8 6 3] 2 7 ... 9 0 [8 6 3] 1 3 ... Exactly 2 occurrences (Option B).",
    },
    {
      id: "oir_bj03_q16",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 16,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "vocabulary"],
      promptText: "Point out the odd word among the following:",
      options: [
        { key: "A", text: "Cool" },
        { key: "B", text: "Warm" },
        { key: "C", text: "Sultry" },
        { key: "D", text: "Hot" },
      ],
      correctOption: "A",
      explanation:
        "Warm, Sultry, and Hot all describe high temperature/heat, whereas Cool (A) refers to low temperature.",
    },
    {
      id: "oir_bj03_q17",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 17,
      type: "verbal",
      subType: "number_series",
      difficulty: "easy",
      tags: ["series", "numbers"],
      promptText:
        "The two numbers coming next in the series will be:\n15,  24,  35,  44,  ____,  ____",
      options: [
        { key: "A", text: "56, 64" },
        { key: "B", text: "55, 68" },
        { key: "C", text: "55, 64" },
        { key: "D", text: "59, 70" },
      ],
      correctOption: "C",
      explanation:
        "Alternating steps +9 and +11: 15+9=24, 24+11=35, 35+9=44, 44+11=55, 55+9=64 (Option C).",
    },
    {
      id: "oir_bj03_q18",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 18,
      type: "verbal",
      subType: "direction_sense",
      difficulty: "medium",
      tags: ["directions"],
      promptText:
        "A is in the East, which is exactly in the North of B. C is towards North-West of B. D lies above A. Who is most towards the North?",
      options: [
        { key: "A", text: "A" },
        { key: "B", text: "B" },
        { key: "C", text: "No one" },
        { key: "D", text: "D" },
      ],
      correctOption: "D",
      explanation:
        "Since A is due North of B and D lies above (further North of) A, D is farthest North (Option D).",
    },
    {
      id: "oir_bj03_q19",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 19,
      type: "verbal",
      subType: "number_series",
      difficulty: "medium",
      tags: ["series", "geometric-progression"],
      promptText: "In the series 2, 6, 18, 54, ... find the 8th term:",
      options: [
        { key: "A", text: "4273" },
        { key: "B", text: "4723" },
        { key: "C", text: "4374" },
        { key: "D", text: "4070" },
      ],
      correctOption: "C",
      explanation:
        "Geometric progression with first term a = 2 and common ratio r = 3. The 8th term is 2 × 3⁷ = 2 × 2187 = 4374 (Option C).",
    },
    {
      id: "oir_bj03_q20",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 20,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy"],
      promptText: "Marathon is to Race as Hibernation is to:",
      options: [
        { key: "A", text: "Dream" },
        { key: "B", text: "Sleep" },
        { key: "C", text: "Track" },
        { key: "D", text: "Mood" },
      ],
      correctOption: "B",
      explanation:
        "A marathon is a prolonged form of race; similarly, hibernation is a prolonged period of sleep (Option B).",
    },
    {
      id: "oir_bj03_q21",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 21,
      type: "verbal",
      subType: "word_formation",
      difficulty: "easy",
      tags: ["vocabulary", "letters"],
      promptText:
        "Select the word which CAN be formed using the letters of the given word (each letter used only as often as it appears):\nJOURNALIST",
      options: [
        { key: "A", text: "TOURIST" },
        { key: "B", text: "RATION" },
        { key: "C", text: "NATION" },
        { key: "D", text: "JOURNEY" },
      ],
      correctOption: "B",
      explanation:
        "RATION (B) uses R, A, T, I, O, N — all present in JOURNALIST (TOURIST needs two Ts, NATION needs two Ns, and JOURNEY needs E & Y).",
    },
    {
      id: "oir_bj03_q22",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 22,
      type: "verbal",
      subType: "word_formation",
      difficulty: "easy",
      tags: ["vocabulary", "letters"],
      promptText:
        "Select the word which CANNOT be formed using the letters of the given word:\nALTERNATE",
      options: [
        { key: "A", text: "NALE" },
        { key: "B", text: "LETER" },
        { key: "C", text: "RAN" },
        { key: "D", text: "RAIN" },
      ],
      correctOption: "D",
      explanation:
        "ALTERNATE does not contain the letter 'I', so RAIN (D) cannot be formed.",
    },
    {
      id: "oir_bj03_q23",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 23,
      type: "verbal",
      subType: "letter_series",
      difficulty: "easy",
      tags: ["series", "letters"],
      promptText:
        "Select the letter that can replace the question mark (?):\nA,  E,  I,  ?,  Q,  U",
      options: [
        { key: "A", text: "M" },
        { key: "B", text: "N" },
        { key: "C", text: "K" },
        { key: "D", text: "O" },
      ],
      correctOption: "A",
      explanation:
        "Each letter advances by +4: A(1) → E(5) → I(9) → M(13) → Q(17) → U(21). Thus M (Option A) is missing.",
    },
    {
      id: "oir_bj03_q24",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 24,
      type: "verbal",
      subType: "letter_series",
      difficulty: "medium",
      tags: ["series", "letters"],
      promptText:
        "Select the letter-cluster that replaces the question mark (?):\neBd,  hXi,  kTn,  nPs,  ?",
      options: [
        { key: "A", text: "pLw" },
        { key: "B", text: "qKx" },
        { key: "C", text: "Qlv" },
        { key: "D", text: "qLx" },
      ],
      correctOption: "D",
      explanation:
        "1st letter +3 (e→h→k→n→q); middle uppercase −4 (B→X→T→P→L); 3rd letter +5 (d→i→n→s→x) → qLx (Option D).",
    },
    {
      id: "oir_bj03_q25",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 25,
      type: "verbal",
      subType: "letter_series",
      difficulty: "medium",
      tags: ["series", "letters"],
      promptText:
        "Select the letter-pair that replaces the question mark (?):\nGK,  HJ,  JH,  ME,  ?",
      options: [
        { key: "A", text: "PA" },
        { key: "B", text: "QB" },
        { key: "C", text: "QA" },
        { key: "D", text: "PB" },
      ],
      correctOption: "C",
      explanation:
        "First letters increase by +1, +2, +3, +4 (G→H→J→M→Q); second letters decrease by −1, −2, −3, −4 (K→J→H→E→A) → QA (Option C).",
    },
    {
      id: "oir_bj03_q26",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 26,
      type: "verbal",
      subType: "missing_number_matrix",
      difficulty: "easy",
      tags: ["matrix", "arithmetic"],
      promptText:
        "Study the given number grid carefully and select the number that replaces (?):",
      figures: {
        type: "svg",
        svgMarkup: grid3x3Svg([
          ["10", "3", "14"],
          ["49", "15", "68"],
          ["33", "19", "?"],
        ]),
      },
      options: [
        { key: "A", text: "25" },
        { key: "B", text: "29" },
        { key: "C", text: "28" },
        { key: "D", text: "27" },
      ],
      correctOption: "C",
      explanation:
        "In each row, Col 3 = (Col 1 − Col 2) × 2: (10−3)×2=14; (49−15)×2=68; (33−19)×2=14×2=28 (Option C).",
    },
    {
      id: "oir_bj03_q27",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 27,
      type: "verbal",
      subType: "missing_number_matrix",
      difficulty: "medium",
      tags: ["matrix", "squares"],
      promptText:
        "Select the number that can replace the question mark (?):",
      figures: {
        type: "svg",
        svgMarkup: grid3x3Svg([
          ["15", "10", "125"],
          ["17", "9", "208"],
          ["12", "7", "?"],
        ]),
      },
      options: [
        { key: "A", text: "50" },
        { key: "B", text: "53" },
        { key: "C", text: "125" },
        { key: "D", text: "95" },
      ],
      correctOption: "D",
      explanation:
        "In each row, Col 3 = Col 1² − Col 2²: 15²−10²=125; 17²−9²=208; 12²−7² = 144−49 = 95 (Option D).",
    },
    {
      id: "oir_bj03_q28",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 28,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "easy",
      tags: ["coding", "numbers"],
      promptText:
        "If O = 20 and LIT = 46, how will PIG be coded using the same code language?",
      options: [
        { key: "A", text: "37" },
        { key: "B", text: "53" },
        { key: "C", text: "41" },
        { key: "D", text: "46" },
      ],
      correctOption: "A",
      explanation:
        "Sum of letter values + 5: O(15)+5=20; L(12)+I(9)+T(20)+5=46. So PIG = P(16)+I(9)+G(7)+5 = 37 (Option A).",
    },
    {
      id: "oir_bj03_q29",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 29,
      type: "verbal",
      subType: "word_substitution_coding",
      difficulty: "easy",
      tags: ["coding", "logic"],
      promptText:
        "If 'moon' is called 'sea', 'sea' is 'water', 'water' is 'air', 'air' is 'sun' and 'sun' is 'river', then from which do we get light and heat?",
      options: [
        { key: "A", text: "Sea" },
        { key: "B", text: "Water" },
        { key: "C", text: "Sun" },
        { key: "D", text: "River" },
      ],
      correctOption: "D",
      explanation:
        "We get heat and light from the sun, and in this code 'sun' is called 'river' (Option D).",
    },
    {
      id: "oir_bj03_q30",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 30,
      type: "verbal",
      subType: "number_classification",
      difficulty: "easy",
      tags: ["odd-one-out", "cubes"],
      promptText:
        "Three of the following four numbers are alike in a certain way and one is different. Pick the odd number:",
      options: [
        { key: "A", text: "216" },
        { key: "B", text: "159" },
        { key: "C", text: "512" },
        { key: "D", text: "343" },
      ],
      correctOption: "B",
      explanation:
        "216 = 6³, 512 = 8³, and 343 = 7³ are perfect cubes, whereas 159 (B) is not a perfect cube.",
    },
    {
      id: "oir_bj03_q31",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 31,
      type: "verbal",
      subType: "number_classification",
      difficulty: "easy",
      tags: ["odd-one-out", "primes"],
      promptText:
        "Three of the following four numbers are alike in a certain way and one is different. Pick the odd number:",
      options: [
        { key: "A", text: "71" },
        { key: "B", text: "87" },
        { key: "C", text: "59" },
        { key: "D", text: "73" },
      ],
      correctOption: "B",
      explanation:
        "71, 59, and 73 are prime numbers, whereas 87 (B) is composite (87 = 3 × 29).",
    },
    {
      id: "oir_bj03_q32",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 32,
      type: "verbal",
      subType: "number_classification",
      difficulty: "easy",
      tags: ["odd-one-out", "digits"],
      promptText:
        "Three of the following four numbers are alike in a certain way and one is different. Pick the odd number:",
      options: [
        { key: "A", text: "224" },
        { key: "B", text: "336" },
        { key: "C", text: "226" },
        { key: "D", text: "448" },
      ],
      correctOption: "C",
      explanation:
        "In 224 (2+2=4), 336 (3+3=6), and 448 (4+4=8), the third digit equals the sum of the first two digits, whereas 2+2 ≠ 6 in 226 (Option C).",
    },
    {
      id: "oir_bj03_q33",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 33,
      type: "verbal",
      subType: "logical_order",
      difficulty: "easy",
      tags: ["word-order", "sequence"],
      promptText:
        "Arrange the following words in a logical and meaningful order:\n1) Alarm Set   2) Office   3) Car   4) Wake up   5) Alarm Rang   6) Get Ready",
      options: [
        { key: "A", text: "1, 5, 4, 3, 6, 2" },
        { key: "B", text: "1, 2, 3, 4, 5, 6" },
        { key: "C", text: "1, 5, 4, 6, 3, 2" },
        { key: "D", text: "1, 4, 5, 6, 3, 2" },
      ],
      correctOption: "C",
      explanation:
        "Chronological order: Alarm Set (1) → Alarm Rang (5) → Wake up (4) → Get Ready (6) → Car (3) → Office (2), which is Option C.",
    },
    {
      id: "oir_bj03_q34",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 34,
      type: "verbal",
      subType: "logical_order",
      difficulty: "easy",
      tags: ["word-order", "sequence"],
      promptText:
        "Arrange the following words in a logical and meaningful order:\n1) Ornament   2) Gold   3) Goldsmith   4) Jewelry shop   5) Bride",
      options: [
        { key: "A", text: "4, 2, 5, 3, 1" },
        { key: "B", text: "2, 5, 4, 3, 1" },
        { key: "C", text: "2, 4, 5, 1, 3" },
        { key: "D", text: "2, 3, 1, 4, 5" },
      ],
      correctOption: "D",
      explanation:
        "Gold (2) is crafted by a Goldsmith (3) into an Ornament (1), sold at a Jewelry shop (4) for the Bride (5) → 2, 3, 1, 4, 5 (Option D).",
    },
    {
      id: "oir_bj03_q35",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 35,
      type: "verbal",
      subType: "missing_number_diagram",
      difficulty: "easy",
      tags: ["diagram", "multiplication"],
      promptText: "What will be the missing number (?):",
      figures: { type: "svg", svgMarkup: wheelQ35Svg },
      options: [
        { key: "A", text: "28" },
        { key: "B", text: "54" },
        { key: "C", text: "36" },
        { key: "D", text: "72" },
      ],
      correctOption: "B",
      explanation:
        "Opposite sectors satisfy ×3: 8×3=24 and 13×3=39; therefore opposite 18 is 18×3 = 54 (Option B).",
    },
    {
      id: "oir_bj03_q36",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 36,
      type: "verbal",
      subType: "missing_number_diagram",
      difficulty: "easy",
      tags: ["diagram", "series"],
      promptText: "What will be the missing number (?):",
      figures: { type: "svg", svgMarkup: starQ36Svg },
      options: [
        { key: "A", text: "54" },
        { key: "B", text: "90" },
        { key: "C", text: "108" },
        { key: "D", text: "144" },
      ],
      correctOption: "C",
      explanation:
        "Clockwise around the star points: 18×2=36, 36×3=108, 108×4=432, 432×5=2160. Thus ? = 108 (Option C).",
    },
    {
      id: "oir_bj03_q37",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 37,
      type: "verbal",
      subType: "missing_number_diagram",
      difficulty: "easy",
      tags: ["diagram", "addition"],
      promptText: "What will be the missing number (?):",
      figures: { type: "svg", svgMarkup: cartQ37Svg },
      options: [
        { key: "A", text: "2" },
        { key: "B", text: "6" },
        { key: "C", text: "7" },
        { key: "D", text: "3" },
      ],
      correctOption: "D",
      explanation:
        "The top cab equals the sum of the 5 bottom circles: 7+4+7+3+7 = 28; similarly 9 + (−4) + (−2) + 0 + 0 = 3 (Option D).",
    },
    {
      id: "oir_bj03_q38",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 38,
      type: "verbal",
      subType: "missing_number_diagram",
      difficulty: "easy",
      tags: ["diagram", "subtraction"],
      promptText: "What will be the missing number (?):",
      figures: { type: "svg", svgMarkup: ySpokesQ38Svg },
      options: [
        { key: "A", text: "6" },
        { key: "B", text: "5" },
        { key: "C", text: "4" },
        { key: "D", text: "7" },
      ],
      correctOption: "A",
      explanation:
        "The bottom sector equals left minus right (or right + bottom = left): 8 − 5 = 3; similarly 17 − 11 = 6 (Option A).",
    },
    {
      id: "oir_bj03_q39",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 39,
      type: "verbal",
      subType: "verbal_analogy",
      difficulty: "easy",
      tags: ["analogy", "sports"],
      promptText: "What will replace the question mark (?):",
      figures: { type: "svg", svgMarkup: sportsQ39Svg },
      options: [
        { key: "A", text: "Billiards" },
        { key: "B", text: "Football" },
        { key: "C", text: "Squash" },
        { key: "D", text: "Cricket" },
      ],
      correctOption: "D",
      explanation:
        "Roger Federer is a Tennis player; Moeen Ali is an international Cricket player (Option D).",
    },
    {
      id: "oir_bj03_q40",
      source: "Byjus",
      sourceBookletId: "oir-byjus-03",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 3",
      questionNumber: 40,
      type: "verbal",
      subType: "letter_analogy",
      difficulty: "easy",
      tags: ["analogy", "alphabet"],
      promptText: "What will replace the question mark (?):",
      figures: { type: "svg", svgMarkup: letterArrowQ40Svg },
      options: [
        { key: "A", text: "K" },
        { key: "B", text: "H" },
        { key: "C", text: "N" },
        { key: "D", text: "O" },
      ],
      correctOption: "D",
      explanation:
        "From A(1) to J(10) is +9 steps. Adding 9 to F(6) gives 15, which is the letter O (Option D).",
    },
  ],
};
