import { OIRBooklet } from "../types";
import { svgCanvas, svgFramed } from "../svgHelpers";

const vennQ25A = svgFramed(
  `<circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="33" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="50" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="67" cy="50" r="12" fill="none" stroke="currentColor" stroke-width="1.5"/>`
);
const vennQ25B = svgFramed(
  `<circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="29" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="56" cy="50" r="11" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="69" cy="50" r="11" fill="none" stroke="currentColor" stroke-width="1.5"/>`
);
const vennQ25C = svgFramed(
  `<circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="50" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>`
);
const vennQ25D = svgFramed(
  `<circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="50" cy="31" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="34" cy="60" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="66" cy="60" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>`
);

const vennQ26A = svgFramed(
  `<circle cx="50" cy="31" r="13" fill="none" stroke="currentColor" stroke-width="1.7"/>
   <circle cx="32" cy="64" r="13" fill="none" stroke="currentColor" stroke-width="1.7"/>
   <circle cx="68" cy="64" r="13" fill="none" stroke="currentColor" stroke-width="1.7"/>`
);
const vennQ26B = svgFramed(
  `<circle cx="35" cy="50" r="22" fill="none" stroke="currentColor" stroke-width="1.7"/>
   <circle cx="35" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="1.6"/>
   <circle cx="76" cy="50" r="13" fill="none" stroke="currentColor" stroke-width="1.7"/>`
);
const vennQ26C = svgFramed(
  `<circle cx="50" cy="37" r="18" fill="none" stroke="currentColor" stroke-width="1.6"/>
   <circle cx="38" cy="58" r="18" fill="none" stroke="currentColor" stroke-width="1.6"/>
   <circle cx="62" cy="58" r="18" fill="none" stroke="currentColor" stroke-width="1.6"/>`
);
const vennQ26D = svgFramed(
  `<circle cx="50" cy="50" r="37" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="50" cy="50" r="24" fill="none" stroke="currentColor" stroke-width="1.6"/>
   <circle cx="50" cy="50" r="11" fill="none" stroke="currentColor" stroke-width="1.6"/>`
);

const vennQ27A = svgFramed(
  `<circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="35" cy="36" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="65" cy="36" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="35" cy="64" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="65" cy="64" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>`
);
const vennQ27B = svgFramed(
  `<circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="60" cy="50" r="21" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="52" cy="50" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4"/>
   <circle cx="68" cy="50" r="6.5" fill="none" stroke="currentColor" stroke-width="1.4"/>
   <circle cx="25" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>`
);
const vennQ27C = svgFramed(
  `<circle cx="39" cy="50" r="29" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="39" cy="39" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="31" cy="55" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="47" cy="55" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="82" cy="50" r="11" fill="none" stroke="currentColor" stroke-width="1.8"/>`
);
const vennQ27D = svgFramed(
  `<circle cx="50" cy="50" r="38" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <circle cx="60" cy="50" r="21" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="60" cy="50" r="10" fill="none" stroke="currentColor" stroke-width="1.5"/>
   <circle cx="25" cy="50" r="8" fill="none" stroke="currentColor" stroke-width="1.5"/>`
);

const q31ButterflySvg = svgCanvas(
  [
    { cx: 70, tl: "4", tr: "16", bl: "25", br: "9", mid: "14" },
    { cx: 215, tl: "9", tr: "49", bl: "1", br: "36", mid: "?" },
  ]
    .map(
      ({ cx, tl, tr, bl, br, mid }) => `
      <ellipse cx="${cx}" cy="60" rx="52" ry="18" transform="rotate(-35 ${cx} 60)" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <ellipse cx="${cx}" cy="60" rx="52" ry="18" transform="rotate(35 ${cx} 60)" fill="none" stroke="currentColor" stroke-width="1.5"/>
      <circle cx="${cx}" cy="60" r="14" fill="var(--background, white)" stroke="currentColor" stroke-width="1.6"/>
      <text x="${cx}" y="65" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">${mid}</text>
      <text x="${cx - 33}" y="38" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${tl}</text>
      <text x="${cx + 33}" y="38" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${tr}</text>
      <text x="${cx - 33}" y="89" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${bl}</text>
      <text x="${cx + 33}" y="89" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">${br}</text>
    `
    )
    .join(""),
  285,
  120
);

const q32WheelSvg = svgCanvas(
  `<circle cx="68" cy="68" r="54" fill="none" stroke="currentColor" stroke-width="1.8"/>
   <line x1="68" y1="14" x2="68" y2="122" stroke="currentColor" stroke-width="1.4"/>
   <line x1="21.2" y1="41" x2="114.8" y2="95" stroke="currentColor" stroke-width="1.4"/>
   <line x1="21.2" y1="95" x2="114.8" y2="41" stroke="currentColor" stroke-width="1.4"/>
   <text x="49" y="42" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">36</text>
   <text x="87" y="42" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">16</text>
   <text x="103" y="72" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">512</text>
   <text x="87" y="102" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">216</text>
   <text x="49" y="102" text-anchor="middle" font-size="14" font-weight="700" fill="currentColor">?</text>
   <text x="33" y="72" text-anchor="middle" font-size="13" font-weight="700" fill="currentColor">64</text>`,
  136,
  136
);

const q33GridSvg = (() => {
  const rows = [
    ["7", "3", "2"],
    ["4", "9", "6"],
    ["2", "1", "5"],
    ["69", "91", "?"],
  ];
  const w = 180;
  const h = 136;
  const cw = w / 3;
  const ch = h / 4;
  let body = `<rect x="1" y="1" width="${w - 2}" height="${h - 2}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  for (let r = 1; r < 4; r++) {
    body += `<line x1="1" y1="${r * ch}" x2="${w - 1}" y2="${r * ch}" stroke="currentColor" stroke-width="1.4"/>`;
  }
  for (let c = 1; c < 3; c++) {
    body += `<line x1="${c * cw}" y1="1" x2="${c * cw}" y2="${h - 1}" stroke="currentColor" stroke-width="1.4"/>`;
  }
  rows.forEach((row, r) => {
    row.forEach((val, c) => {
      body += `<text x="${c * cw + cw / 2}" y="${r * ch + ch / 2 + 5.5}" text-anchor="middle" font-size="15" font-weight="700" fill="currentColor">${val}</text>`;
    });
  });
  return svgCanvas(body, w, h);
})();

export const BYJUS_MOCK_12: OIRBooklet = {
  id: "oir-byjus-12",
  source: "Byjus",
  bookletNumber: "BYJUS-12",
  title: "Byju's Exam Prep OIR Verbal Mock Test 12",
  category: "verbal",
  totalQuestions: 40,
  durationMinutes: 18,
  markingScheme: { correct: 1, incorrect: 0 },
  description:
    "Authentic 40-question Byju's Exam Prep Verbal Reasoning Mock Test 12 covering letter-pair counting, analogies, logical ordering, blood relations, classification, calendar math, coding-decoding, direction sense, repeated letter series, Venn diagrams, mathematical operators, missing-number figures, and word formation.",
  questions: [
    {
      id: "oir_bj12_q01",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 1,
      type: "verbal",
      subType: "alphabet_pair_count",
      difficulty: "medium",
      tags: ["alphabet-test", "counting"],
      promptText:
        "How many such pairs of letters are there in the word TACKLE, each of which has as many letters between them in the word (in both forward and backward directions) as they have between them in the English alphabetical series?",
      options: [
        { key: "A", text: "None" },
        { key: "B", text: "One" },
        { key: "C", text: "Two" },
        { key: "D", text: "Three" },
        { key: "E", text: "More than three" },
      ],
      correctOption: "C",
      explanation:
        "In TACKLE, the two pairs are K–L (adjacent, 0 letters between) forward and A–E (4 positions apart backwards: E-L-K-C-A matches E-D-C-B-A) → Two (C).",
    },
    {
      id: "oir_bj12_q02",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 2,
      type: "verbal",
      subType: "alphabet_pair_count",
      difficulty: "medium",
      tags: ["alphabet-test", "counting"],
      promptText:
        "How many such pairs of letters are there in the word DECAYS, each of which has as many letters between them in the word (in both forward and backward directions) as they have between them in the English alphabetical series?",
      options: [
        { key: "A", text: "One" },
        { key: "B", text: "Two" },
        { key: "C", text: "Three" },
        { key: "D", text: "None" },
        { key: "E", text: "More than three" },
      ],
      correctOption: "B",
      explanation:
        "In DECAYS, the two pairs are D–E (adjacent forward) and D–A (positions 1 and 4, differing by 3 letters in both the word and alphabet backwards) → Two (B).",
    },
    {
      id: "oir_bj12_q03",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 3,
      type: "verbal",
      subType: "analogy",
      difficulty: "easy",
      tags: ["analogy", "category"],
      promptText:
        "Select the option that is related to the fourth term in the same way as the first term is related to the second term:\nApple : Peach :: ? : Cream",
      options: [
        { key: "A", text: "Butter" },
        { key: "B", text: "Cookie" },
        { key: "C", text: "Bread" },
        { key: "D", text: "Cake" },
      ],
      correctOption: "A",
      explanation:
        "Apple and Peach belong to the same botanical fruit family (Rosaceae). Similarly, Butter (A) and Cream belong to the same dairy category.",
    },
    {
      id: "oir_bj12_q04",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 4,
      type: "verbal",
      subType: "analogy",
      difficulty: "easy",
      tags: ["analogy", "synonyms"],
      promptText:
        "Select the option in which the words share the same relationship as that shared by the given pair:\nCrooked : Twisted :: ______ : _______ ?",
      options: [
        { key: "A", text: "Wail : Happy" },
        { key: "B", text: "Coarse : Rough" },
        { key: "C", text: "Brave : Coward" },
        { key: "D", text: "Calm : Excited" },
      ],
      correctOption: "B",
      explanation:
        "Crooked and Twisted are synonyms, just as Coarse and Rough (B) are synonyms (the other pairs are antonyms).",
    },
    {
      id: "oir_bj12_q05",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 5,
      type: "verbal",
      subType: "logical_word_sequence",
      difficulty: "easy",
      tags: ["ordering", "workflow"],
      promptText:
        "Select the correct alternative to indicate the arrangement of the following words in a logical and meaningful order:\n1. Compose   2. Content   3. Subjects   4. Gmail   5. Send   6. Recipients",
      options: [
        { key: "A", text: "4, 1, 5, 3, 2, 6" },
        { key: "B", text: "6, 1, 4, 3, 2, 5" },
        { key: "C", text: "4, 2, 6, 3, 1, 5" },
        { key: "D", text: "4, 1, 6, 3, 2, 5" },
      ],
      correctOption: "D",
      explanation:
        "Workflow for sending an email: Open Gmail (4) → Compose (1) → Recipients (6) → Subject (3) → Content (2) → Send (5) → 4, 1, 6, 3, 2, 5 (D).",
    },
    {
      id: "oir_bj12_q06",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 6,
      type: "verbal",
      subType: "logical_word_sequence",
      difficulty: "easy",
      tags: ["ordering", "geography"],
      promptText:
        "Select the correct alternative to indicate the arrangement of the following words in a logical and meaningful order:\n1) Gateway of India   2) World   3) Mumbai   4) India   5) Maharashtra",
      options: [
        { key: "A", text: "2, 4, 5, 1, 3" },
        { key: "B", text: "4, 2, 5, 3, 1" },
        { key: "C", text: "2, 4, 5, 3, 1" },
        { key: "D", text: "4, 2, 5, 1, 3" },
      ],
      correctOption: "C",
      explanation:
        "Largest to smallest geographic hierarchy: World (2) → India (4) → Maharashtra (5) → Mumbai (3) → Gateway of India (1) → 2, 4, 5, 3, 1 (C). (Note: PDF solution footer had a typo 'option D', while its key and sequence match C.)",
    },
    {
      id: "oir_bj12_q07",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 7,
      type: "verbal",
      subType: "blood_relations",
      difficulty: "easy",
      tags: ["blood-relation", "family-tree"],
      promptText: "A is the brother of P. P is the mother of Q. Q is the son of F. How is F related to A?",
      options: [
        { key: "A", text: "Brother-in-law" },
        { key: "B", text: "Son" },
        { key: "C", text: "Father" },
        { key: "D", text: "Nephew" },
      ],
      correctOption: "A",
      explanation:
        "P is Q's mother and Q is F's son, so F is P's husband. Since A is P's brother, F is A's Brother-in-law (A).",
    },
    {
      id: "oir_bj12_q08",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 8,
      type: "verbal",
      subType: "coded_blood_relations",
      difficulty: "medium",
      tags: ["blood-relation", "symbols"],
      promptText:
        "'M+N' means M is the brother of N.\n'M-N' means M is the mother of N.\n'M÷N' means M is the sister of N.\n'M×N' means N is the father of M.\nHow is A related to B in the relation 'A÷D×C+B'?",
      options: [
        { key: "A", text: "Daughter" },
        { key: "B", text: "Niece" },
        { key: "C", text: "Son" },
        { key: "D", text: "Mother" },
      ],
      correctOption: "B",
      explanation:
        "A is sister of D (A÷D), C is father of D (D×C), and C is brother of B (C+B). Thus A is the daughter of B's brother C, making A the Niece of B (B).",
    },
    {
      id: "oir_bj12_q09",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 9,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "vocabulary"],
      promptText: "Three of the following four words are alike in a certain way and one is different. Pick the odd word out:",
      options: [
        { key: "A", text: "Deceive" },
        { key: "B", text: "Assist" },
        { key: "C", text: "Abandon" },
        { key: "D", text: "Bluff" },
      ],
      correctOption: "B",
      explanation:
        "Deceive, Abandon, and Bluff carry negative connotations of betrayal or misleading, whereas Assist (B) means to help.",
    },
    {
      id: "oir_bj12_q10",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 10,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "medium",
      tags: ["classification", "vowels"],
      promptText: "Three of the following four words are alike in a certain way and one is different. Pick the odd word out:",
      options: [
        { key: "A", text: "Friday" },
        { key: "B", text: "Tuesday" },
        { key: "C", text: "Monday" },
        { key: "D", text: "Sunday" },
      ],
      correctOption: "B",
      explanation:
        "Friday (i, a), Monday (o, a), and Sunday (u, a) each contain 2 vowels, whereas Tuesday (u, e, a) contains 3 vowels (B).",
    },
    {
      id: "oir_bj12_q11",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 11,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "general-knowledge"],
      promptText: "Three of the following four words are alike in a certain way and one is different. Pick the odd one:",
      options: [
        { key: "A", text: "Yuan" },
        { key: "B", text: "Lira" },
        { key: "C", text: "Cuba" },
        { key: "D", text: "Baht" },
      ],
      correctOption: "C",
      explanation: "Yuan (China), Lira (Turkey), and Baht (Thailand) are currencies, while Cuba (C) is a country.",
    },
    {
      id: "oir_bj12_q12",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 12,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification", "prime-numbers"],
      promptText: "Select the odd number from the given alternatives:",
      options: [
        { key: "A", text: "97" },
        { key: "B", text: "23" },
        { key: "C", text: "59" },
        { key: "D", text: "81" },
      ],
      correctOption: "D",
      explanation: "97, 23, and 59 are prime numbers, whereas 81 = 9² is a composite number (D).",
    },
    {
      id: "oir_bj12_q13",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 13,
      type: "verbal",
      subType: "calendar",
      difficulty: "easy",
      tags: ["calendar", "odd-days"],
      promptText:
        "Ram went to church thirteen days ago. He goes to church only on Monday. What day of the week is today?",
      options: [
        { key: "A", text: "Tuesday" },
        { key: "B", text: "Thursday" },
        { key: "C", text: "Sunday" },
        { key: "D", text: "Friday" },
      ],
      correctOption: "C",
      explanation:
        "Thirteen days ago was Monday, so moving forward 13 days = +6 odd days from Monday → Sunday (C).",
    },
    {
      id: "oir_bj12_q14",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 14,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "easy",
      tags: ["coding", "letter-sum"],
      promptText: "In a certain language, 'FAME' is written as '25' and 'LIKE' is written as '37'. How is 'VINE' written in that code language?",
      options: [
        { key: "A", text: "48" },
        { key: "B", text: "52" },
        { key: "C", text: "50" },
        { key: "D", text: "46" },
      ],
      correctOption: "C",
      explanation:
        "Sum of A=1..Z=26 letter values: FAME = 6+1+13+5 = 25; LIKE = 12+9+11+5 = 37; VINE = 22+9+14+5 = 50 (C).",
    },
    {
      id: "oir_bj12_q15",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 15,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "easy",
      tags: ["coding", "letter-shift"],
      promptText: "If PLANT is coded as SODQW, then MOUNTAIN will be coded as:",
      options: [
        { key: "A", text: "OQWPVCKP" },
        { key: "B", text: "PRXQWDLQ" },
        { key: "C", text: "OKWQVDLQ" },
        { key: "D", text: "JKRKQXFK" },
      ],
      correctOption: "B",
      explanation: "Each letter shifts +3 forward: M+3=P, O+3=R, U+3=X, N+3=Q, T+3=W, A+3=D, I+3=L, N+3=Q → PRXQWDLQ (B).",
    },
    {
      id: "oir_bj12_q16",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 16,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "medium",
      tags: ["coding", "alternating-shift"],
      promptText: "In a certain code language, 'LSSOUL' is written as 'NOUKWH'. What is the code for 'ENTITY' in that code language?",
      options: [
        { key: "A", text: "GHEVEV" },
        { key: "B", text: "DHTDTC" },
        { key: "C", text: "GJVEVU" },
        { key: "D", text: "JGSUSW" },
      ],
      correctOption: "C",
      explanation:
        "Letters shift alternately +2, −4: L(+2)=N, S(−4)=O, S(+2)=U, O(−4)=K, U(+2)=W, L(−4)=H. Applying to ENTITY gives E+2=G, N−4=J, T+2=V, I−4=E, T+2=V, Y−4=U → GJVEVU (C).",
    },
    {
      id: "oir_bj12_q17",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 17,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "medium",
      tags: ["coding", "digit-sum"],
      promptText: "If MIKE = 4925, DICE = 4935, then LIGHT = ?",
      options: [
        { key: "A", text: "58782" },
        { key: "B", text: "39412" },
        { key: "C", text: "39782" },
        { key: "D", text: "39692" },
      ],
      correctOption: "C",
      explanation:
        "Two-digit letter positions are summed to a single digit: L(12→3), I(9), G(7), H(8), T(20→2) → 39782 (C).",
    },
    {
      id: "oir_bj12_q18",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 18,
      type: "verbal",
      subType: "number_coding",
      difficulty: "medium",
      tags: ["coding", "digits"],
      promptText: "If 374 is coded as 62116, and 145 is coded as 21220, then 743 is coded as:",
      options: [
        { key: "A", text: "21169" },
        { key: "B", text: "141212" },
        { key: "C", text: "141612" },
        { key: "D", text: "21129" },
      ],
      correctOption: "B",
      explanation:
        "Hundreds digit ×2, tens digit ×3, units digit ×4 concatenated: 7×2=14, 4×3=12, 3×4=12 → 141212 (B).",
    },
    {
      id: "oir_bj12_q19",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 19,
      type: "verbal",
      subType: "direction_sense",
      difficulty: "easy",
      tags: ["direction", "turns"],
      promptText:
        "Renu starts from a point and walks for 10 km towards East; she then turns towards her right and walks for 5 km. She again turns towards her left and walks 10 km and then turns right and walks for 5 km and stops. In which direction is the final point from the initial point?",
      options: [
        { key: "A", text: "South-North" },
        { key: "B", text: "South-East" },
        { key: "C", text: "North-East" },
        { key: "D", text: "North-West" },
      ],
      correctOption: "B",
      explanation:
        "Net travel: 10 + 10 = 20 km East and 5 + 5 = 10 km South, putting the final point South-East (B) of the starting point.",
    },
    {
      id: "oir_bj12_q20",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 20,
      type: "verbal",
      subType: "direction_sense",
      difficulty: "easy",
      tags: ["direction", "angles"],
      promptText:
        "A man is facing North. He turns 45 degrees in the clockwise direction and then another 180 degrees in the same direction, and then 270 degrees in the anti-clockwise direction. Which direction is he facing now?",
      options: [
        { key: "A", text: "South" },
        { key: "B", text: "North-West" },
        { key: "C", text: "West" },
        { key: "D", text: "South-West" },
      ],
      correctOption: "B",
      explanation:
        "Net rotation from North = (45° + 180°) CW − 270° CCW = 45° anti-clockwise from North → North-West (B).",
    },
    {
      id: "oir_bj12_q21",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 21,
      type: "verbal",
      subType: "letter_series_fill",
      difficulty: "medium",
      tags: ["series", "growing-block"],
      promptText:
        "Which set of letters when sequentially placed at the gaps in the given letter series shall complete it?\nJ _ J _ L _ KL _ JK _ MN",
      options: [
        { key: "A", text: "KKJLM" },
        { key: "B", text: "KKJML" },
        { key: "C", text: "KKMLJ" },
        { key: "D", text: "KMKLJ" },
      ],
      correctOption: "B",
      explanation:
        "Growing block series: JK / JKL / JKLM / JKLMN. Placing K, K, J, M, L → KKJML (B) completes the sequence.",
    },
    {
      id: "oir_bj12_q22",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 22,
      type: "verbal",
      subType: "letter_series_fill",
      difficulty: "medium",
      tags: ["series", "repeating-block"],
      promptText:
        "Which set of letters when sequentially placed at the gaps in the given letter series shall complete it?\n_ b _ b _ d a _ b b c d",
      options: [
        { key: "A", text: "dcdc" },
        { key: "B", text: "caca" },
        { key: "C", text: "addd" },
        { key: "D", text: "abcb" },
      ],
      correctOption: "D",
      explanation:
        "Two repeating 6-letter blocks 'abbbcd / abbbcd' require placing a, b, c, b in the blanks → abcb (D).",
    },
    {
      id: "oir_bj12_q23",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 23,
      type: "verbal",
      subType: "letter_series_fill",
      difficulty: "easy",
      tags: ["series", "repeating-block"],
      promptText:
        "Which set of letters when sequentially placed at the gaps in the given letter series shall complete it?\nCD_E_DD_CD_E",
      options: [
        { key: "A", text: "CDCD" },
        { key: "B", text: "DCCC" },
        { key: "C", text: "DCED" },
        { key: "D", text: "DDDC" },
      ],
      correctOption: "C",
      explanation: "Dividing into three 4-letter blocks 'CDDE / CDDE / CDDE' gives D, C, E, D → DCED (C).",
    },
    {
      id: "oir_bj12_q24",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 24,
      type: "verbal",
      subType: "letter_series_fill",
      difficulty: "easy",
      tags: ["series", "repeating-block"],
      promptText:
        "Which set of letters, when sequentially placed at the gaps in the given letter series, will complete the series?\nLM_L_NL_N_M_",
      options: [
        { key: "A", text: "NNNLL" },
        { key: "B", text: "NMMLN" },
        { key: "C", text: "LMLMN" },
        { key: "D", text: "NMLMM" },
      ],
      correctOption: "B",
      explanation: "Repeating 3-letter blocks 'LMN / LMN / LMN / LMN' fill the blanks with N, M, M, L, N → NMMLN (B).",
    },
    {
      id: "oir_bj12_q25",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 25,
      type: "non_verbal",
      subType: "venn_diagram",
      difficulty: "easy",
      tags: ["venn-diagram", "classification"],
      promptText:
        "Identify the diagram that best represents the relationship among the given classes:\nYandex, Baidu, DuckDuckGo, Search Engine",
      options: [
        { key: "A", text: "Diagram A", svgMarkup: vennQ25A },
        { key: "B", text: "Diagram B", svgMarkup: vennQ25B },
        { key: "C", text: "Diagram C", svgMarkup: vennQ25C },
        { key: "D", text: "Diagram D", svgMarkup: vennQ25D },
      ],
      correctOption: "D",
      explanation:
        "Yandex, Baidu, and DuckDuckGo are three distinct web search engines; hence three separate non-overlapping circles inside one Search Engine circle (D).",
    },
    {
      id: "oir_bj12_q26",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 26,
      type: "non_verbal",
      subType: "venn_diagram",
      difficulty: "easy",
      tags: ["venn-diagram", "hierarchy"],
      promptText:
        "Identify the diagram that best represents the relationship among the given classes:\nDays, Weeks, Months",
      options: [
        { key: "A", text: "Diagram A", svgMarkup: vennQ26A },
        { key: "B", text: "Diagram B", svgMarkup: vennQ26B },
        { key: "C", text: "Diagram C", svgMarkup: vennQ26C },
        { key: "D", text: "Diagram D", svgMarkup: vennQ26D },
      ],
      correctOption: "D",
      explanation:
        "Days are completely contained inside Weeks, and Weeks inside Months, represented by three concentric circles (D).",
    },
    {
      id: "oir_bj12_q27",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 27,
      type: "non_verbal",
      subType: "venn_diagram",
      difficulty: "easy",
      tags: ["venn-diagram", "earth-science"],
      promptText:
        "Identify the diagram that best represents the relationship among the given classes:\nEarth, Moon, Tree, Mountain, Water",
      options: [
        { key: "A", text: "Diagram A", svgMarkup: vennQ27A },
        { key: "B", text: "Diagram B", svgMarkup: vennQ27B },
        { key: "C", text: "Diagram C", svgMarkup: vennQ27C },
        { key: "D", text: "Diagram D", svgMarkup: vennQ27D },
      ],
      correctOption: "C",
      explanation:
        "Tree, Mountain, and Water exist on Earth (three regions sharing habitats inside the Earth circle), while Moon is a completely separate celestial body outside Earth (C).",
    },
    {
      id: "oir_bj12_q28",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 28,
      type: "verbal",
      subType: "mathematical_operator",
      difficulty: "easy",
      tags: ["arithmetic", "interchange"],
      promptText:
        "If the two signs '+' and '-' and the two numbers '16' and '8' are interchanged, what will be the value of the following equation?\n8 + 16 ÷ 2 - 9 = ?",
      options: [
        { key: "A", text: "21" },
        { key: "B", text: "24" },
        { key: "C", text: "26" },
        { key: "D", text: "28" },
      ],
      correctOption: "A",
      explanation: "After swapping: 16 − 8 ÷ 2 + 9 = 16 − 4 + 9 = 21 (A).",
    },
    {
      id: "oir_bj12_q29",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 29,
      type: "verbal",
      subType: "mathematical_operator",
      difficulty: "medium",
      tags: ["arithmetic", "equation-balancing"],
      promptText:
        "Select the correct combination of mathematical signs to replace * signs and balance the equation:\n57 * 4 * 4 * 3 * 17 * 10",
      options: [
        { key: "A", text: "÷  ×  +  ×  =" },
        { key: "B", text: "=  ×  +  −  ×" },
        { key: "C", text: "×  −  +  ÷  =" },
        { key: "D", text: "=  ×  +  ×  −" },
      ],
      correctOption: "D",
      explanation: "Substituting '= × + × −' gives 57 = 4×4 + 3×17 − 10 = 16 + 51 − 10 = 57 (D).",
    },
    {
      id: "oir_bj12_q30",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 30,
      type: "verbal",
      subType: "mathematical_operator",
      difficulty: "easy",
      tags: ["arithmetic", "equation-balancing"],
      promptText:
        "Select the correct combination of mathematical signs to replace * signs and balance the equation:\n21 * 3 * 12 * 9 * 93",
      options: [
        { key: "A", text: "÷  ×  +  =" },
        { key: "B", text: "×  ÷  +  =" },
        { key: "C", text: "=  ÷  ×  +" },
        { key: "D", text: "=  ×  ÷  +" },
      ],
      correctOption: "A",
      explanation: "Substituting '÷ × + =' gives 21 ÷ 3 × 12 + 9 = 7 × 12 + 9 = 84 + 9 = 93 (A).",
    },
    {
      id: "oir_bj12_q31",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 31,
      type: "verbal",
      subType: "missing_number_pattern",
      difficulty: "medium",
      tags: ["square-roots", "pattern"],
      promptText: "Select the missing number from the given responses:",
      figures: {
        type: "svg",
        svgMarkup: q31ButterflySvg,
      },
      options: [
        { key: "A", text: "18" },
        { key: "B", text: "17" },
        { key: "C", text: "19" },
        { key: "D", text: "15" },
      ],
      correctOption: "B",
      explanation:
        "Center value equals the sum of square roots of the four outer wings: √4+√16+√25+√9 = 2+4+5+3 = 14; thus √9+√49+√1+√36 = 3+7+1+6 = 17 (B).",
    },
    {
      id: "oir_bj12_q32",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 32,
      type: "verbal",
      subType: "missing_number_pattern",
      difficulty: "medium",
      tags: ["squares-cubes", "wheel"],
      promptText: "Find the missing number from the given responses:",
      figures: {
        type: "svg",
        svgMarkup: q32WheelSvg,
      },
      options: [
        { key: "A", text: "128" },
        { key: "B", text: "64" },
        { key: "C", text: "72" },
        { key: "D", text: "108" },
      ],
      correctOption: "B",
      explanation:
        "Opposite sectors pair squares and cubes: 36 (6²) ↔ 216 (6³), 64 (8²) ↔ 512 (8³), and 16 (4²) ↔ 4³ = 64 (B).",
    },
    {
      id: "oir_bj12_q33",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 33,
      type: "verbal",
      subType: "missing_number_matrix",
      difficulty: "medium",
      tags: ["matrix", "squares"],
      promptText: "Find the missing number from the given responses:",
      figures: {
        type: "svg",
        svgMarkup: q33GridSvg,
      },
      options: [
        { key: "A", text: "58" },
        { key: "B", text: "65" },
        { key: "C", text: "64" },
        { key: "D", text: "51" },
      ],
      correctOption: "B",
      explanation:
        "Column rule: bottom number = sum of squares of the top 3 entries. Col 1: 7²+4²+2² = 69; Col 2: 3²+9²+1² = 91; Col 3: 2²+6²+5² = 4+36+25 = 65 (B).",
    },
    {
      id: "oir_bj12_q34",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 34,
      type: "verbal",
      subType: "number_series",
      difficulty: "easy",
      tags: ["series", "alternating"],
      promptText: "Select the number that can replace the question mark (?) in the following series:\n9, 5, ?, 7, 25",
      options: [
        { key: "A", text: "12" },
        { key: "B", text: "18" },
        { key: "C", text: "14" },
        { key: "D", text: "16" },
      ],
      correctOption: "D",
      explanation:
        "Alternating series: odd positions are squares (3²=9, 4²=16, 5²=25) while even positions increase by +2 (5, 7). Missing term = 16 (D).",
    },
    {
      id: "oir_bj12_q35",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 35,
      type: "verbal",
      subType: "number_series",
      difficulty: "easy",
      tags: ["series", "cubes"],
      promptText: "Select the number that replaces the question mark (?) in the following series:\n126, 217, 344, ?",
      options: [
        { key: "A", text: "513" },
        { key: "B", text: "521" },
        { key: "C", text: "729" },
        { key: "D", text: "512" },
      ],
      correctOption: "A",
      explanation: "Pattern n³ + 1: 5³+1 = 126, 6³+1 = 217, 7³+1 = 344, 8³+1 = 513 (A).",
    },
    {
      id: "oir_bj12_q36",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 36,
      type: "verbal",
      subType: "letter_series",
      difficulty: "medium",
      tags: ["series", "alternating"],
      promptText:
        "Select the letter that can replace the question mark (?) in the following series:\nA, D, B, F, D, I, G, ?, K",
      options: [
        { key: "A", text: "J" },
        { key: "B", text: "M" },
        { key: "C", text: "E" },
        { key: "D", text: "N" },
      ],
      correctOption: "B",
      explanation:
        "Odd positions advance +1, +2, +3, +4 (A, B, D, G, K); even positions advance +2, +3, +4 (D → F → I → M) (B).",
    },
    {
      id: "oir_bj12_q37",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 37,
      type: "verbal",
      subType: "ranking_order",
      difficulty: "easy",
      tags: ["comparison", "height"],
      promptText:
        "If Ghanshyam is taller than Priyam, Atul is taller than Vivek, and Rakhi is taller than Atul but smaller than Priyam, then who is the smallest among them?",
      options: [
        { key: "A", text: "Vivek" },
        { key: "B", text: "Priyam" },
        { key: "C", text: "Atul" },
        { key: "D", text: "Rakhi" },
      ],
      correctOption: "A",
      explanation: "Ordering tallest to shortest: Ghanshyam > Priyam > Rakhi > Atul > Vivek. Smallest = Vivek (A).",
    },
    {
      id: "oir_bj12_q38",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 38,
      type: "verbal",
      subType: "word_formation",
      difficulty: "easy",
      tags: ["vocabulary", "letters"],
      promptText:
        "Select the word which CANNOT be formed using the letters of the given word:\nSUPERINTENDENT",
      options: [
        { key: "A", text: "DOCTOR" },
        { key: "B", text: "NURSE" },
        { key: "C", text: "INTENSE" },
        { key: "D", text: "DENTIST" },
      ],
      correctOption: "A",
      explanation: "SUPERINTENDENT does not contain the letter 'O', so DOCTOR (A) cannot be formed.",
    },
    {
      id: "oir_bj12_q39",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 39,
      type: "verbal",
      subType: "word_formation",
      difficulty: "easy",
      tags: ["vocabulary", "letters"],
      promptText:
        "Select the word which CANNOT be formed using the letters of the given word:\nAFFORESTATION",
      options: [
        { key: "A", text: "FOREST" },
        { key: "B", text: "TASTE" },
        { key: "C", text: "ATTIRE" },
        { key: "D", text: "EASTER" },
      ],
      correctOption: "D",
      explanation: "AFFORESTATION has only one 'E', so EASTER (D) — needing two 'E's — cannot be formed.",
    },
    {
      id: "oir_bj12_q40",
      source: "Byjus",
      sourceBookletId: "oir-byjus-12",
      sourceBookletName: "Byju's Exam Prep OIR Verbal Mock Test 12",
      questionNumber: 40,
      type: "verbal",
      subType: "word_formation",
      difficulty: "easy",
      tags: ["vocabulary", "letters"],
      promptText:
        "Select the word which CANNOT be formed using the letters of the given word:\nTENDENTIOUS",
      options: [
        { key: "A", text: "INTENTION" },
        { key: "B", text: "DENTIST" },
        { key: "C", text: "TENT" },
        { key: "D", text: "STUDENT" },
      ],
      correctOption: "A",
      explanation: "TENDENTIOUS has only one 'I', so INTENTION (A) — needing two 'I's — cannot be formed.",
    },
  ],
};
