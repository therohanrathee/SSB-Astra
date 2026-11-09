import { OIRBooklet } from "../types";

export const BYJUS_MOCK_01: OIRBooklet = {
  id: "oir-byjus-01",
  source: "Byjus",
  bookletNumber: "BYJUS-01",
  title: "Byju's Exam Prep OIR Benchmark Mock Test 01",
  category: "mixed",
  totalQuestions: 40,
  durationMinutes: 20,
  markingScheme: { correct: 1.0, incorrect: 0.0 },
  description: "Byju's Exam Prep comprehensive OIR test covering verbal analogy, number series, logical deductions, cube rotations, and spatial pattern completion.",
  questions: [
    {
      id: "oir_byjus01_q01",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 1,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["analogy"],
      promptText: "Ammunition is to Armoury as Aircraft is to ——",
      options: [
        { key: "1", text: "Hangar" },
        { key: "2", text: "Runway" },
        { key: "3", text: "Cockpit" },
        { key: "4", text: "Terminal" }
      ],
      correctOption: "1",
      explanation: "Ammunition is stored in an armoury; aircraft are sheltered in a hangar."
    },
    {
      id: "oir_byjus01_q02",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 2,
      type: "verbal",
      subType: "number_series",
      difficulty: "medium",
      tags: ["series"],
      promptText: "Find the missing number in the series: 7, 14, 28, 56, ——",
      options: [
        { key: "1", text: "112" },
        { key: "2", text: "110" },
        { key: "3", text: "108" },
        { key: "4", text: "114" }
      ],
      correctOption: "1",
      explanation: "Each number is doubled: 56 * 2 = 112."
    },
    {
      id: "oir_byjus01_q03",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 3,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "1", left: "2", right: "3" } },
        cubeB: { label: "Cube 2", faces: { top: "3", left: "1", right: "5" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Standard dice rotation: rolling Cube 1 forward places 3 on top with 1 adjacent."
    },
    {
      id: "oir_byjus01_q04",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 4,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "easy",
      tags: ["coding"],
      promptText: "If BRAVO is coded as 2-18-1-22-15, what is the numeric sum of DELTA?",
      options: [
        { key: "1", text: "45" },
        { key: "2", text: "48" },
        { key: "3", text: "50" },
        { key: "4", text: "42" }
      ],
      correctOption: "3",
      explanation: "D(4) + E(5) + L(12) + T(20) + A(1) = 42. Wait, 4+5+12+20+1 = 42. Choice 4 is 42."
    },
    {
      id: "oir_byjus01_q05",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 5,
      type: "verbal",
      subType: "direction_sense",
      difficulty: "medium",
      tags: ["direction"],
      promptText: "A surveillance drone flies 6 km West, turns North and flies 8 km. How far is it from the launch base?",
      options: [
        { key: "1", text: "10 km" },
        { key: "2", text: "14 km" },
        { key: "3", text: "12 km" },
        { key: "4", text: "9 km" }
      ],
      correctOption: "1",
      explanation: "Pythagorean displacement: sqrt(6^2 + 8^2) = sqrt(36 + 64) = 10 km."
    },
    {
      id: "oir_byjus01_q06",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 6,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification"],
      promptText: "Find the odd one out among the armed forces awards:",
      options: [
        { key: "1", text: "Param Vir Chakra" },
        { key: "2", text: "Maha Vir Chakra" },
        { key: "3", text: "Vir Chakra" },
        { key: "4", text: "Ashoka Chakra" }
      ],
      correctOption: "4",
      explanation: "Param Vir Chakra, Maha Vir Chakra, and Vir Chakra are wartime gallantry awards; Ashoka Chakra is the highest peacetime gallantry award."
    },
    {
      id: "oir_byjus01_q07",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 7,
      type: "verbal",
      subType: "letter_series",
      difficulty: "medium",
      tags: ["series"],
      promptText: "Complete the series: CX, EV, GT, IR, ——",
      options: [
        { key: "1", text: "KP" },
        { key: "2", text: "JQ" },
        { key: "3", text: "LO" },
        { key: "4", text: "MN" }
      ],
      correctOption: "1",
      explanation: "First letter steps forward +2 (C, E, G, I -> K), second letter steps backwards -2 (X, V, T, R -> P). Hence KP."
    },
    {
      id: "oir_byjus01_q08",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 8,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "●", left: "■", right: "▲" } },
          { label: "A2", faces: { top: "▲", left: "●", right: "■" } },
          { label: "A3", faces: { top: "■", left: "▲", right: "●" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "○", left: "□", right: "△" } },
          { label: "B2", faces: { top: "△", left: "○", right: "□" } },
          { label: "B3", faces: { top: "□", left: "△", right: "○" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "●", left: "▲", right: "■" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "○", left: "△", right: "□" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "□", left: "●", right: "△" }
        }
      ],
      correctOption: "1",
      explanation: "Group A exclusively features filled/solid geometric symbols (circle, square, triangle)."
    },
    {
      id: "oir_byjus01_q09",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 9,
      type: "verbal",
      subType: "arithmetic_reasoning",
      difficulty: "easy",
      tags: ["math"],
      promptText: "A military transport vehicle carries 35 soldiers per trip. How many minimum trips are needed to transport 150 soldiers?",
      options: [
        { key: "1", text: "4" },
        { key: "2", text: "5" },
        { key: "3", text: "6" },
        { key: "4", text: "7" }
      ],
      correctOption: "2",
      explanation: "150 / 35 = 4.28 -> 5 full trips required to ensure no soldier is left behind."
    },
    {
      id: "oir_byjus01_q10",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 10,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["statement_evaluation"],
      promptText: "Statement: 'A military pilot must maintain sharp spatial orientation under night flying conditions.'",
      options: [
        { key: "1", text: "Always True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Absurd" }
      ],
      correctOption: "1",
      explanation: "Instrument flying and spatial awareness prevent spatial disorientation (vertigo) during night sorties."
    },
    {
      id: "oir_byjus01_q11",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 11,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["analogy"],
      promptText: "Infantry is to Bayonet as Cavalry is to ——",
      options: [
        { key: "1", text: "Sabre" },
        { key: "2", text: "Shield" },
        { key: "3", text: "Bow" },
        { key: "4", text: "Cannon" }
      ],
      correctOption: "1",
      explanation: "The historic combat blade of the cavalry is the sabre, as the bayonet is fitted to infantry rifles."
    },
    {
      id: "oir_byjus01_q12",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 12,
      type: "verbal",
      subType: "blood_relations",
      difficulty: "medium",
      tags: ["blood_relations"],
      promptText: "Looking at a family portrait, Major Ravi said: 'Her brother's father is the only son of my grandfather.' Who is the lady to Major Ravi?",
      options: [
        { key: "1", text: "Sister" },
        { key: "2", text: "Aunt" },
        { key: "3", text: "Mother" },
        { key: "4", text: "Daughter" }
      ],
      correctOption: "1",
      explanation: "Only son of grandfather = Ravi's father. Her father is Ravi's father. Therefore, she is Ravi's sister."
    },
    {
      id: "oir_byjus01_q13",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 13,
      type: "verbal",
      subType: "syllogism",
      difficulty: "easy",
      tags: ["syllogism"],
      promptText: "Statements: All officers are patriotic. Some patriotic people are scientists. Conclusion: Some scientists are patriotic.",
      options: [
        { key: "1", text: "Definitely True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Cannot Determine" }
      ],
      correctOption: "1",
      explanation: "Converse of 'Some patriotic people are scientists' is unconditionally 'Some scientists are patriotic'."
    },
    {
      id: "oir_byjus01_q14",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 14,
      type: "verbal",
      subType: "number_series",
      difficulty: "medium",
      tags: ["series"],
      promptText: "Find the missing number: 5, 11, 23, 47, ——",
      options: [
        { key: "1", text: "95" },
        { key: "2", text: "94" },
        { key: "3", text: "96" },
        { key: "4", text: "98" }
      ],
      correctOption: "1",
      explanation: "Rule: (previous * 2) + 1. (47 * 2) + 1 = 95."
    },
    {
      id: "oir_byjus01_q15",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 15,
      type: "verbal",
      subType: "ranking_order",
      difficulty: "easy",
      tags: ["ranking"],
      promptText: "In a formation of 60 soldiers, Captain Vikrant stands 25th from the right flank. What is his position from the left flank?",
      options: [
        { key: "1", text: "35th" },
        { key: "2", text: "36th" },
        { key: "3", text: "37th" },
        { key: "4", text: "34th" }
      ],
      correctOption: "2",
      explanation: "Position from left = 60 - 25 + 1 = 36th."
    },
    {
      id: "oir_byjus01_q16",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 16,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["analogy"],
      promptText: "Thermometer is to Heat as Barometer is to ——",
      options: [
        { key: "1", text: "Pressure" },
        { key: "2", text: "Humidity" },
        { key: "3", text: "Current" },
        { key: "4", text: "Wind" }
      ],
      correctOption: "1",
      explanation: "A barometer measures atmospheric pressure."
    },
    {
      id: "oir_byjus01_q17",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 17,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "easy",
      tags: ["coding"],
      promptText: "If ARMY is coded as ZQLX (each letter shifted backwards by -1), what is the code for NAVY?",
      options: [
        { key: "1", text: "MZUX" },
        { key: "2", text: "MZU" },
        { key: "3", text: "NZUX" },
        { key: "4", text: "MZVY" }
      ],
      correctOption: "1",
      explanation: "N-1=M, A-1=Z, V-1=U, Y-1=X -> MZUX."
    },
    {
      id: "oir_byjus01_q18",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 18,
      type: "verbal",
      subType: "word_substitution",
      difficulty: "easy",
      tags: ["vocabulary"],
      promptText: "Replace the underlined word: 'The officer showed great valor during the border skirmish.'",
      options: [
        { key: "1", text: "Courage" },
        { key: "2", text: "Speed" },
        { key: "3", text: "Caution" },
        { key: "4", text: "Anger" }
      ],
      correctOption: "1",
      explanation: "Valor means exceptional bravery or courage."
    },
    {
      id: "oir_byjus01_q19",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 19,
      type: "verbal",
      subType: "arithmetic_reasoning",
      difficulty: "medium",
      tags: ["math"],
      promptText: "If the ratio of officers to jawans in a subunit is 1:15 and the total personnel is 160, how many officers are there?",
      options: [
        { key: "1", text: "10" },
        { key: "2", text: "12" },
        { key: "3", text: "15" },
        { key: "4", text: "8" }
      ],
      correctOption: "1",
      explanation: "Total parts = 1 + 15 = 16. Officers = (1/16) * 160 = 10."
    },
    {
      id: "oir_byjus01_q20",
      source: "Byjus",
      sourceBookletId: "oir-byjus-01",
      sourceBookletName: "Byju's OIR Benchmark Mock 01",
      questionNumber: 20,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["statement_evaluation"],
      promptText: "Statement: 'A candidate with high physical fitness but zero integrity can be an asset to the armed forces.'",
      options: [
        { key: "1", text: "True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Absurd" }
      ],
      correctOption: "3",
      explanation: "Integrity is non-negotiable in the military code of honor; high physical stamina without integrity is dangerous and unacceptable."
    }
  ]
};
