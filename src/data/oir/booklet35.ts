import { OIRBooklet, OIRQuestion } from "./types";

/**
 * AUTHENTIC DIPR OIR BOOKLET NO. 35 (TEST A)
 * Source: data/oir_raw/Authentic/Booklet 35.pdf & oir34,35.pdf (Test A)
 * Key & Verification: Cross-checked against Master Key (IQ Tests Col A) + visual/mathematical verification.
 * Note: Q16 option cubes are physically cropped at the bottom scan boundary of page 4 in Booklet 35.pdf
 * and omitted in oir34,35.pdf; 39 complete authentic questions (Q1–Q15, Q17–Q40) are preserved verbatim.
 */
export const BOOKLET_35_QUESTIONS: OIRQuestion[] = [
  {
    id: "oir_set35_q01",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 1,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "medium",
    tags: ["cubes", "group-a-b", "spatial"],
    promptText: "Which one of the following cubes can possibly belong to Group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        {
          faces: {
            top: "svg:<circle cx='-4' cy='0' r='4' fill='none' stroke='currentColor' stroke-width='1.6'/><circle cx='5' cy='1' r='2.3' fill='none' stroke='currentColor' stroke-width='1.5'/>",
            left: "svg:<text x='-5' y='4' font-size='9' text-anchor='middle' fill='currentColor' font-weight='700'>T</text><circle cx='0' cy='1' r='1.1' fill='currentColor'/><text x='5' y='4' font-size='9' text-anchor='middle' fill='currentColor' font-weight='700'>T</text>",
            right: "svg:<polygon points='-4,-7 4,-3 -4,1' fill='none' stroke='currentColor' stroke-width='1.5'/><polygon points='-4,2 4,6 -4,10' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          },
        },
        {
          faces: {
            top: "+ +",
            left: "svg:<line x1='-6' y1='-3' x2='6' y2='-3' stroke='currentColor' stroke-width='1.7'/><circle cx='0' cy='2' r='1.3' fill='currentColor'/><line x1='-6' y1='6' x2='6' y2='6' stroke='currentColor' stroke-width='1.7'/>",
            right: "svg:<circle cx='0' cy='-4.5' r='2.8' fill='none' stroke='currentColor' stroke-width='1.6'/><circle cx='0' cy='4.5' r='2.8' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          },
        },
        {
          faces: {
            top: "svg:<rect x='-7' y='-3.5' width='6.5' height='6.5' fill='none' stroke='currentColor' stroke-width='1.5'/><rect x='2' y='-2.5' width='4.5' height='4.5' fill='none' stroke='currentColor' stroke-width='1.5'/>",
            left: "svg:<path d='M-2,-5 A2.2,2.2 0 1,1 2,-5 A2.2,2.2 0 1,1 4,-1 A2.2,2.2 0 1,1 0,2 A2.2,2.2 0 1,1 -4,-1 A2.2,2.2 0 1,1 -2,-5 Z' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='7' r='2.3' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<text x='0' y='-1.5' font-size='9' text-anchor='middle' fill='currentColor' font-weight='700'>×</text><text x='0' y='8.5' font-size='9' text-anchor='middle' fill='currentColor' font-weight='700'>×</text>",
          },
        },
      ],
      groupB: [
        {
          faces: {
            top: "△ △",
            left: "svg:<text x='0' y='-1.5' font-size='9.5' text-anchor='middle' fill='currentColor' font-weight='700'>×</text><text x='0' y='8' font-size='9.5' text-anchor='middle' fill='currentColor' font-weight='700'>×</text>",
            right: "svg:<circle cx='0' cy='-4.5' r='2.7' fill='none' stroke='currentColor' stroke-width='1.5'/><circle cx='0' cy='4.5' r='2.7' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          },
        },
        {
          faces: {
            top: "=",
            left: "svg:<rect x='-4' y='-8' width='8' height='6.5' fill='none' stroke='currentColor' stroke-width='1.5'/><rect x='-4' y='1.5' width='8' height='6.5' fill='none' stroke='currentColor' stroke-width='1.5'/>",
            right: "||",
          },
        },
        {
          faces: {
            top: "× ×",
            left: "svg:<text x='0' y='-1' font-size='9.5' text-anchor='middle' fill='currentColor' font-weight='700'>S</text><text x='0' y='8.5' font-size='9.5' text-anchor='middle' fill='currentColor' font-weight='700'>S</text>",
            right: "svg:<polygon points='0,-8 -3.5,-2 3.5,-2' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='0,1 -3.5,7 3.5,7' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          },
        },
      ],
      instructionHint: "Inspect which symbol families and face configurations match Group A while avoiding Group B.",
    },
    options: [
      {
        key: "1",
        text: "Cube 1",
        cubeFaces: {
          top: "× · ×",
          left: "▷ ▷",
          right: "svg:<circle cx='0' cy='-4.5' r='2.5' fill='none' stroke='currentColor' stroke-width='1.5'/><circle cx='0' cy='4.5' r='2.5' fill='none' stroke='currentColor' stroke-width='1.5'/>",
        },
      },
      {
        key: "2",
        text: "Cube 2",
        cubeFaces: {
          top: "S S",
          left: "svg:<text x='0' y='-1.5' font-size='9.5' text-anchor='middle' fill='currentColor' font-weight='700'>×</text><text x='0' y='8' font-size='9.5' text-anchor='middle' fill='currentColor' font-weight='700'>×</text>",
          right: "svg:<circle cx='0' cy='-4.5' r='2.5' fill='none' stroke='currentColor' stroke-width='1.5'/><circle cx='0' cy='4.5' r='2.5' fill='none' stroke='currentColor' stroke-width='1.5'/>",
        },
      },
      {
        key: "3",
        text: "Cube 3",
        cubeFaces: {
          top: "+ +",
          left: "svg:<rect x='-5.5' y='-7.5' width='11' height='5.5' fill='none' stroke='currentColor' stroke-width='1.5'/><rect x='-5.5' y='2' width='11' height='5.5' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          right: "svg:<text x='0' y='-1.5' font-size='9' text-anchor='middle' fill='currentColor' font-weight='700'>Z</text><text x='0' y='8.5' font-size='9' text-anchor='middle' fill='currentColor' font-weight='700'>Z</text>",
        },
      },
    ],
    correctOption: "3",
    explanation:
      "Cubes 1 and 2 combine Group B symbols (SS, ××, triangles, and stacked circles from B1 & B3). Cube 3 carries the '+ +' motif directly from Group A (Cube 2) alongside parallel bars and Z-pairs, making Cube 3 the only candidate belonging to Group A.",
  },
  {
    id: "oir_set35_q02",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 2,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "hard",
    tags: ["cubes", "group-a-b", "spatial"],
    promptText: "Which one of the following cubes can possibly belong to Group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        {
          faces: {
            top: "svg:<circle cx='-3' cy='0' r='4.8' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='3' cy='0' r='4.8' fill='none' stroke='currentColor' stroke-width='1.4'/>",
            left: "svg:<line x1='-8' y1='0' x2='8' y2='0' stroke='currentColor' stroke-width='1.6'/><line x1='0' y1='-5' x2='0' y2='5' stroke='currentColor' stroke-width='1.5'/><line x1='-3' y1='-3' x2='-3' y2='3' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<line x1='0' y1='-8' x2='0' y2='8' stroke='currentColor' stroke-width='1.6'/><line x1='-5' y1='-3' x2='5' y2='-3' stroke='currentColor' stroke-width='1.6'/>",
          },
        },
        {
          faces: {
            top: "svg:<circle cx='-3.5' cy='0' r='3.8' fill='none' stroke='currentColor' stroke-width='1.5'/><polygon points='0,0 7,-4 7,4' fill='none' stroke='currentColor' stroke-width='1.5'/>",
            left: "svg:<rect x='-3.5' y='-7.5' width='7' height='15' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='-7' y1='0' x2='7' y2='0' stroke='currentColor' stroke-width='1.4'/><line x1='0' y1='-7.5' x2='0' y2='7.5' stroke='currentColor' stroke-width='1.4'/>",
            right: "svg:<line x1='0' y1='-8' x2='0' y2='8' stroke='currentColor' stroke-width='1.6'/><line x1='-5' y1='-3' x2='5' y2='-3' stroke='currentColor' stroke-width='1.6'/>",
          },
        },
        {
          faces: {
            top: "svg:<line x1='-7' y1='0' x2='7' y2='0' stroke='currentColor' stroke-width='1.6'/><line x1='0' y1='-7' x2='0' y2='7' stroke='currentColor' stroke-width='1.6'/>",
            left: "svg:<circle cx='0' cy='0' r='5.5' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-7.5' y1='0' x2='7.5' y2='0' stroke='currentColor' stroke-width='1.5'/>",
            right: "svg:<line x1='-6' y1='0' x2='6' y2='0' stroke='currentColor' stroke-width='1.6'/><line x1='0' y1='-7' x2='0' y2='7' stroke='currentColor' stroke-width='1.6'/>",
          },
        },
      ],
      groupB: [
        {
          faces: {
            top: "×",
            left: "svg:<path d='M-6,-7 L-3,-8 L0,-3 L3,-8 L6,-7 L2,0 L6,7 L3,8 L0,3 L-3,8 L-6,7 L-2,0 Z' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<ellipse cx='0' cy='0' rx='4.2' ry='6.5' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-4.2' y1='0' x2='4.2' y2='0' stroke='currentColor' stroke-width='1.4'/>",
          },
        },
        {
          faces: {
            top: "svg:<path d='M-2,-7 H2 V-2 H7 V2 H2 V7 H-2 V2 H-7 V-2 H-2 Z' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<circle cx='0' cy='-4' r='3.6' fill='none' stroke='currentColor' stroke-width='1.5'/><circle cx='0' cy='4' r='3.6' fill='none' stroke='currentColor' stroke-width='1.5'/>",
            right: "×",
          },
        },
        {
          faces: {
            top: "svg:<circle cx='-3' cy='0' r='4.5' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='3' cy='0' r='4.5' fill='none' stroke='currentColor' stroke-width='1.4'/>",
            left: "×",
            right: "×",
          },
        },
      ],
      instructionHint: "Compare both the symbols and 3D adjacency relationships across Group A and Group B.",
    },
    options: [
      {
        key: "1",
        text: "Cube 1",
        cubeFaces: {
          top: "×",
          left: "svg:<circle cx='0' cy='-2' r='3.2' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='0' y1='1.2' x2='-6' y2='7' stroke='currentColor' stroke-width='1.5'/><line x1='0' y1='1.2' x2='0' y2='8' stroke='currentColor' stroke-width='1.5'/><line x1='0' y1='1.2' x2='6' y2='7' stroke='currentColor' stroke-width='1.5'/>",
          right: "svg:<ellipse cx='0' cy='0' rx='4' ry='6.5' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-4' y1='0' x2='4' y2='0' stroke='currentColor' stroke-width='1.4'/>",
        },
      },
      {
        key: "2",
        text: "Cube 2",
        cubeFaces: {
          top: "×",
          left: "×",
          right: "+",
        },
      },
      {
        key: "3",
        text: "Cube 3",
        cubeFaces: {
          top: "×",
          left: "svg:<circle cx='-3' cy='0' r='4.5' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='3' cy='0' r='4.5' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<path d='M-2,-7 H2 V-2 H7 V2 H2 V7 H-2 V2 H-7 V-2 H-2 Z' fill='none' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
    ],
    correctOption: "3",
    explanation:
      "In Group B, Cube 1 pairs '×' with the split oval and Cube 2 pairs '×' with the hollow cross, while Cube 3 shows interlocking circles above two adjacent '×' faces. Rotating Group B's configurations shows Cube 1 shares the Group B oval + × pair and Cube 2 repeats the adjacent × pair, whereas Cube 3 breaks Group B's corner arrangement and matches Group A's interlocking-circles family (Master Key: 3).",
  },
  {
    id: "oir_set35_q03",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 3,
    type: "verbal",
    subType: "numerical_smallest_digit",
    difficulty: "easy",
    tags: ["numbers", "digits", "comparison"],
    promptText:
      "Write the number of the choice containing last digit of the smallest number of the following:\n564321   365214   615342   146235",
    options: [
      { key: "1", text: "5" },
      { key: "2", text: "2" },
      { key: "3", text: "1" },
      { key: "4", text: "4" },
    ],
    correctOption: "1",
    explanation:
      "Among 564321, 365214, 615342, and 146235, the smallest number is 146235. Its last digit is 5, which is choice (1).",
  },
  {
    id: "oir_set35_q04",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 4,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "easy",
    tags: ["cubes", "alike-or-not", "spatial"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the Answer Sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<rect x='-5.5' y='-5.5' width='11' height='11' fill='currentColor' fill-opacity='0.75' stroke='currentColor' stroke-width='1.5'/>",
          left: "svg:<line x1='-7' y1='0' x2='6' y2='0' stroke='currentColor' stroke-width='1.6'/><polygon points='7,0 2,-3.2 2,3.2' fill='currentColor'/>",
          right: "",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "—",
          left: "svg:<polygon points='-7,-6 7,-6 0,7' fill='currentColor' fill-opacity='0.6' stroke='currentColor' stroke-width='1.6'/>",
          right: "svg:<line x1='0' y1='-7' x2='0' y2='5' stroke='currentColor' stroke-width='1.6'/><polygon points='0,8 -3.2,3 3.2,3' fill='currentColor'/>",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "A standard cube has 6 faces. Cube 1 shows {shaded square, →, blank} and Cube 2 shows {—, shaded ▽, ↓} — completely distinct faces with no rotational contradiction, so both can be opposite-corner views of the same cube ('Yes').",
  },
  {
    id: "oir_set35_q05",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 5,
    type: "verbal",
    subType: "statement_classification",
    difficulty: "easy",
    tags: ["verbal-logic", "classification"],
    promptText:
      "Write the number of the choice that applies best to the statement given below:\n\"An efficient management initiates labour-strikes, and later on works against them to make them a success.\"",
    options: [
      { key: "1", text: "True" },
      { key: "2", text: "Probable" },
      { key: "3", text: "False" },
      { key: "4", text: "Absurd" },
    ],
    correctOption: "4",
    explanation:
      "The statement is self-contradictory and nonsensical (working against strikes to make them a success, and an efficient management initiating strikes), so it classifies best as 'Absurd' (4).",
  },
  {
    id: "oir_set35_q06",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 6,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "medium",
    tags: ["cubes", "alike-or-not", "spatial"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the Answer Sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<line x1='-6' y1='5' x2='6' y2='-5' stroke='currentColor' stroke-width='1.4'/><circle cx='-5.5' cy='4.5' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/><line x1='-6' y1='-5' x2='6' y2='5' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<line x1='-6' y1='6' x2='6' y2='-6' stroke='currentColor' stroke-width='1.5'/><circle cx='-5.5' cy='5.5' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/><line x1='2' y1='-6' x2='6' y2='-2' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<line x1='-5' y1='5' x2='5' y2='-5' stroke='currentColor' stroke-width='1.5'/><circle cx='-4' cy='4' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/><line x1='-2' y1='-3' x2='3' y2='2' stroke='currentColor' stroke-width='1.4'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<line x1='-6' y1='-5' x2='6' y2='5' stroke='currentColor' stroke-width='1.4'/><circle cx='5.5' cy='4.5' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/><line x1='-6' y1='5' x2='6' y2='-5' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<line x1='-6' y1='6' x2='6' y2='-6' stroke='currentColor' stroke-width='1.4'/><circle cx='-5' cy='5' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/><line x1='-6' y1='-6' x2='6' y2='6' stroke='currentColor' stroke-width='1.4'/><circle cx='-5' cy='-5' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/>",
          right: "svg:<line x1='-5' y1='-5' x2='5' y2='5' stroke='currentColor' stroke-width='1.4'/><line x1='-5' y1='5' x2='5' y2='-5' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2.1' fill='none' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "The crossed-arrow motifs on Cube 1 and Cube 2 represent distinct arrow-circle combinations that can occupy different sets of 3 faces on a single 6-faced cube without contradicting 3D rotation ('Yes').",
  },
  {
    id: "oir_set35_q07",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 7,
    type: "verbal",
    subType: "reason_justification",
    difficulty: "easy",
    tags: ["verbal-reasoning", "civics", "justification"],
    promptText:
      "The underlined statement has four reasons for its justification. Write the serial number of the reason you think correct.\nStatement: India is a **secular** state because :-",
    options: [
      { key: "1", text: "The President of the country lives in seclusion." },
      { key: "2", text: "There is full freedom of speech and writing." },
      { key: "3", text: "Indian Government has no religion and treats all religions at par." },
      { key: "4", text: "Indians are orthodox and God-fearing men." },
    ],
    correctOption: "3",
    explanation:
      "A secular state has no official state religion and treats all religions equally (choice 3).",
  },
  {
    id: "oir_set35_q08",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 8,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "easy",
    tags: ["cubes", "alike-or-not", "spatial"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "",
          left: "svg:<text x='0' y='5' font-size='15' text-anchor='middle' fill='currentColor' font-family='serif'>S</text><line x1='-6' y1='7' x2='6' y2='-7' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<line x1='-2' y1='-5' x2='-2' y2='4' stroke='currentColor' stroke-width='1.3'/><line x1='2' y1='-2' x2='2' y2='6' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<line x1='-6' y1='-6' x2='6' y2='6' stroke='currentColor' stroke-width='1.5'/><line x1='-6' y1='6' x2='6' y2='-6' stroke='currentColor' stroke-width='1.5'/>",
          left: "svg:<polyline points='-6,-7 -6,7 7,7' fill='none' stroke='currentColor' stroke-width='1.7'/>",
          right: "svg:<text x='0' y='5' font-size='15' text-anchor='middle' fill='currentColor' font-family='serif'>S</text><line x1='0' y1='-8' x2='0' y2='8' stroke='currentColor' stroke-width='1.4'/>",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "Even if the slashed 'S' face corresponds between the two views under a rotation, the remaining adjacent faces shown on Cube 1 and Cube 2 can occupy the remaining faces of the same 6-sided cube without any conflict ('Yes').",
  },
  {
    id: "oir_set35_q09",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 9,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "medium",
    tags: ["cubes", "alike-or-not", "dots"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the Answer Sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<circle cx='0' cy='-6' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='6' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<circle cx='0' cy='-6' r='1.9' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='-6' cy='0' r='1.9' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='1.9' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='6' cy='0' r='1.9' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='6' r='1.9' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<circle cx='0' cy='0' r='2.3' fill='none' stroke='currentColor' stroke-width='1.5'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<circle cx='-6.5' cy='0' r='1.7' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='-2.2' cy='0' r='1.7' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='2.2' cy='0' r='1.7' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='6.5' cy='0' r='1.7' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<circle cx='-5.5' cy='0' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='5.5' cy='0' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<circle cx='0' cy='-4.2' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='4.2' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/>",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "Cube 1 shows 3, 5, and 1 circles; Cube 2 shows 4, 3, and 2 circles. On the shared 3-circle face, faces {4, 2} can sit on the two edges opposite {5, 1}, which agrees completely with rigid 3D rotation ('Yes').",
  },
  {
    id: "oir_set35_q10",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 10,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "hard",
    tags: ["cubes", "alike-or-not", "rotation"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the Answer Sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<path d='M-5,4 C-5,-4 5,-4 5,4' fill='none' stroke='currentColor' stroke-width='1.6'/><circle cx='0' cy='-5' r='2' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<path d='M-5,-7 C0,-1 3,3 0,7 C-3,3 0,-1 5,-7' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          right: "svg:<path d='M-2,-7 C4,-5 4,-2 -1,-1 C4,0 4,3 -1,4 C4,5 4,7 -2,8' fill='none' stroke='currentColor' stroke-width='1.5'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<path d='M-5,-7 C0,-1 3,3 0,7 C-3,3 0,-1 5,-7' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          left: "svg:<polygon points='-7,-6 0,7 7,-6' fill='none' stroke='currentColor' stroke-width='1.6'/><polygon points='-3,-6 0,2 3,-6' fill='currentColor' fill-opacity='0.6'/>",
          right: "svg:<path d='M-2,-7 C4,-5 4,-2 -1,-1 C4,0 4,3 -1,4 C4,5 4,7 -2,8' fill='none' stroke='currentColor' stroke-width='1.5'/>",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "No",
    explanation:
      "Both cubes share the ribbon loop ('γ') and the vertical spiral on the Right face. To move 'γ' from the Front face (Cube 1) to the Top face (Cube 2) while keeping the spiral on the Right face, you must tilt backward by 90°, which would rotate the spiral horizontally AND keep 'γ's loop pointing toward the front edge — contradicting Cube 2 ('No').",
  },
  {
    id: "oir_set35_q11",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 11,
    type: "verbal",
    subType: "synonym_replacement",
    difficulty: "easy",
    tags: ["vocabulary", "synonyms"],
    promptText:
      "A sentence is given in which one word is underlined. One of the four choices can replace the underlined word without changing its sense. Write the number of the correct choice.\nSentence: **Repair** this shirt in the best possible way.",
    options: [
      { key: "1", text: "Sew" },
      { key: "2", text: "Shoes" },
      { key: "3", text: "Couple" },
      { key: "4", text: "Mend" },
    ],
    correctOption: "4",
    explanation: "'Mend' directly means to repair or fix torn/damaged clothing.",
  },
  {
    id: "oir_set35_q12",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 12,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "medium",
    tags: ["cubes", "group-a-b", "spatial"],
    promptText: "Which one of the following cubes can possibly belong to Group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        {
          faces: {
            top: "svg:<polygon points='-6,3 0,-5 6,3' fill='currentColor' fill-opacity='0.65' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<polygon points='0,-6 -6,6 6,6' fill='none' stroke='currentColor' stroke-width='1.5'/><circle cx='0' cy='2' r='2' fill='currentColor'/>",
            right: "svg:<polyline points='-3,7 -3,-3 3,-3' fill='none' stroke='currentColor' stroke-width='1.6'/><polygon points='3,-6 7,-3 3,0' fill='currentColor'/>",
          },
        },
        {
          faces: {
            top: "svg:<rect x='-6' y='-4' width='8' height='6' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-width='1.3'/><circle cx='4' cy='2' r='3' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<rect x='-7' y='-1' width='7' height='7' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='-1,-6 6,5 -5,5' fill='currentColor' fill-opacity='0.55' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<polygon points='0,-6 -4,4 4,4' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          },
        },
        {
          faces: {
            top: "svg:<circle cx='-3' cy='0' r='3.5' fill='currentColor' fill-opacity='0.6'/><polygon points='1,-4 7,0 1,4' fill='currentColor'/>",
            left: "svg:<polygon points='-7,0 1,-6 1,6' fill='currentColor' fill-opacity='0.6'/><polygon points='0,0 7,-6 7,6' fill='none' stroke='currentColor' stroke-width='1.4'/>",
            right: "svg:<path d='M-4,5 L0,-5 L4,5' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          },
        },
      ],
      groupB: [
        {
          faces: {
            top: "svg:<rect x='-5' y='0' width='10' height='6' fill='currentColor' fill-opacity='0.7'/><line x1='-2' y1='0' x2='-5' y2='-7' stroke='currentColor' stroke-width='1.3'/><line x1='2' y1='0' x2='5' y2='-7' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<rect x='-5.5' y='-1' width='11' height='7.5' fill='currentColor' fill-opacity='0.75'/><line x1='-2' y1='-1' x2='-6' y2='-8' stroke='currentColor' stroke-width='1.4'/><line x1='2' y1='-1' x2='6' y2='-8' stroke='currentColor' stroke-width='1.4'/>",
            right: "svg:<circle cx='0' cy='-4' r='2.5' fill='currentColor'/><line x1='0' y1='-1.5' x2='-4' y2='7' stroke='currentColor' stroke-width='1.4'/><line x1='0' y1='-1.5' x2='4' y2='7' stroke='currentColor' stroke-width='1.4'/>",
          },
        },
        {
          faces: {
            top: "svg:<rect x='-7' y='-4' width='8' height='7' fill='currentColor' fill-opacity='0.7'/><line x1='1' y1='-2' x2='8' y2='-2' stroke='currentColor' stroke-width='1.4'/><line x1='1' y1='1' x2='8' y2='1' stroke='currentColor' stroke-width='1.4'/>",
            left: "svg:<circle cx='0' cy='2.5' r='5' fill='currentColor' fill-opacity='0.65' stroke='currentColor' stroke-width='1.3'/><line x1='-2' y1='-2' x2='-5' y2='-8' stroke='currentColor' stroke-width='1.4'/><line x1='2' y1='-2' x2='5' y2='-8' stroke='currentColor' stroke-width='1.4'/>",
            right: "svg:<line x1='-4' y1='-6' x2='4' y2='6' stroke='currentColor' stroke-width='1.5'/><line x1='4' y1='-6' x2='-4' y2='6' stroke='currentColor' stroke-width='1.5'/>",
          },
        },
        {
          faces: {
            top: "svg:<circle cx='-3' cy='0' r='4' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='1' y1='-2' x2='8' y2='-4' stroke='currentColor' stroke-width='1.4'/><line x1='1' y1='2' x2='8' y2='4' stroke='currentColor' stroke-width='1.4'/>",
            left: "svg:<polygon points='0,-6 -6,6 6,6' fill='currentColor' fill-opacity='0.65'/><line x1='3' y1='-1' x2='9' y2='-3' stroke='currentColor' stroke-width='1.3'/><line x1='4' y1='2' x2='9' y2='4' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<line x1='-4' y1='-6' x2='4' y2='6' stroke='currentColor' stroke-width='1.5'/><line x1='4' y1='-6' x2='-4' y2='6' stroke='currentColor' stroke-width='1.5'/>",
          },
        },
      ],
      instructionHint: "Notice the two-ray 'antenna' elements across every cube in Group B.",
    },
    options: [
      {
        key: "1",
        text: "Cube 1",
        cubeFaces: {
          top: "svg:<polyline points='-6,-6 6,-1 -6,4 6,7' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<polyline points='-7,6 -3,-6 1,6 5,-6 7,6' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          right: "svg:<rect x='-4.5' y='-5.5' width='9' height='11' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2' fill='currentColor'/>",
        },
      },
      {
        key: "2",
        text: "Cube 2",
        cubeFaces: {
          top: "svg:<circle cx='-3' cy='0' r='4' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='1' y1='-2' x2='8' y2='-4' stroke='currentColor' stroke-width='1.4'/><line x1='1' y1='2' x2='8' y2='4' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<rect x='-5.5' y='-1' width='11' height='7.5' fill='currentColor' fill-opacity='0.75'/><line x1='-2' y1='-1' x2='-6' y2='-8' stroke='currentColor' stroke-width='1.4'/><line x1='2' y1='-1' x2='6' y2='-8' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<ellipse cx='0' cy='0' rx='3.5' ry='5.5' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='-3.5' y1='0' x2='3.5' y2='0' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
      {
        key: "3",
        text: "Cube 3",
        cubeFaces: {
          top: "×",
          left: "svg:<circle cx='0' cy='-3' r='4.5' fill='currentColor' fill-opacity='0.65'/><line x1='-2' y1='1.5' x2='-5' y2='8' stroke='currentColor' stroke-width='1.5'/><line x1='2' y1='1.5' x2='5' y2='8' stroke='currentColor' stroke-width='1.5'/>",
          right: "□",
        },
      },
    ],
    correctOption: "1",
    explanation:
      "Every cube in Group B carries 2-ray antenna figures sprouting from shaded circles, squares, or triangles — and both Cube 2 (repeats B3 Top + B1 Front) and Cube 3 (inverted B2 circle-antenna) match Group B. Cube 1 has no antenna rays and aligns with Group A.",
  },
  {
    id: "oir_set35_q13",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 13,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "easy",
    tags: ["cubes", "alike-or-not", "spatial"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<polygon points='-4,-4 7,-4 4,4 -7,4' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          left: "svg:<line x1='0' y1='8' x2='0' y2='-4' stroke='currentColor' stroke-width='2'/><polygon points='0,-8 -3.5,-2.5 3.5,-2.5' fill='currentColor'/>",
          right: "svg:<rect x='-3.5' y='-6.5' width='7' height='13' fill='none' stroke='currentColor' stroke-width='1.6'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<polygon points='-2,-6 6,-6 2,6 -6,6' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          left: "svg:<path d='M-7,-2.5 H2 V-5 L7,0 L2,5 V2.5 H-7 Z' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          right: "svg:<rect x='-3.5' y='-6.5' width='7' height='13' fill='none' stroke='currentColor' stroke-width='1.6'/>",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "Cube 1 uses a solid vertical arrow and horizontal rectangle; Cube 2 uses a hollow block arrow and slanted parallelogram alongside the rectangular face. All shown faces are mutually compatible on one 6-faced cube ('Yes').",
  },
  {
    id: "oir_set35_q14",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 14,
    type: "verbal",
    subType: "quantitative_word_problem",
    difficulty: "medium",
    tags: ["arithmetic", "speed-distance", "geometry"],
    promptText:
      "Write the number of correct choice.\nThe perimeter of a square is equal to distance which a horse can run in three minutes. The speed of the horse is 20 miles per hour. The length in yard of the square is :-",
    options: [
      { key: "1", text: "3520" },
      { key: "2", text: "440" },
      { key: "3", text: "1760" },
      { key: "4", text: "880" },
    ],
    correctOption: "2",
    explanation:
      "Distance run in 3 minutes at 20 mph = 20 × (3/60) = 1 mile = 1760 yards. Since Perimeter = 4 × side = 1760 yards, the length of one side of the square is 1760 / 4 = 440 yards (choice 2).",
  },
  {
    id: "oir_set35_q15",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 15,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "medium",
    tags: ["cubes", "group-a-b", "spatial"],
    promptText: "Which of the following can possibly belong to group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        { faces: { top: "+", left: "+", right: "+" } },
        { faces: { top: "×", left: "+", right: "×" } },
        { faces: { top: "×", left: "×", right: "+" } },
      ],
      groupB: [
        { faces: { top: "×", left: "+", right: "×" } },
        { faces: { top: "+", left: "×", right: "+" } },
        { faces: { top: "+", left: "×", right: "+" } },
      ],
      instructionHint: "Deduce how '+' and '×' faces are distributed on the 6-sided cube of Group A vs Group B.",
    },
    options: [
      { key: "1", text: "Cube 1", cubeFaces: { top: "×", left: "×", right: "×" } },
      { key: "2", text: "Cube 2", cubeFaces: { top: "+", left: "+", right: "×" } },
      { key: "3", text: "Cube 3", cubeFaces: { top: "+", left: "×", right: "×" } },
    ],
    correctOption: "1",
    explanation:
      "Group A Cube 1 shows three '+' faces meeting at a corner (+, +, +). A 6-sided cube split with 3 adjacent '+' faces on one corner has 3 adjacent '×' faces meeting at the opposite corner — which produces Cube 1 (×, ×, ×). Group B pairs mixed 2+ / 1× views (B2, B3) with their opposite mixed 1+ / 2× view (B1).",
  },
  {
    id: "oir_set35_q17",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 17,
    type: "verbal",
    subType: "proverb_meaning",
    difficulty: "easy",
    tags: ["proverbs", "comprehension"],
    promptText:
      "A proverb with four possible meanings is given below. Write the serial number of meaning which you regard as correct.\nProverb: \"The darkest hour precedes the dawn\"",
    options: [
      { key: "1", text: "One has more dreams in the darkest hour." },
      { key: "2", text: "There is no end to human miseries." },
      { key: "3", text: "Every night ends in a day." },
      { key: "4", text: "Dark night is better than a bright dawn." },
    ],
    correctOption: "3",
    explanation:
      "\"The darkest hour precedes the dawn\" conveys that difficult times give way to better times — literally corresponding to 'Every night ends in a day' (choice 3).",
  },
  {
    id: "oir_set35_q18",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 18,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "medium",
    tags: ["cubes", "group-a-b", "shapes"],
    promptText: "Which of the following can possibly belong to group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        {
          faces: {
            top: "svg:<polygon points='0,-6 6,0 0,6 -6,0' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            left: "svg:<rect x='-5.5' y='-5.5' width='11' height='11' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            right: "svg:<polygon points='0,-7 3.8,0 0,7 -3.8,0' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          },
        },
        {
          faces: {
            top: "svg:<rect x='-5.5' y='-5.5' width='11' height='11' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            left: "svg:<polygon points='0,-6 6,0 0,6 -6,0' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            right: "svg:<rect x='-3.5' y='-6.5' width='7' height='13' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          },
        },
        {
          faces: {
            top: "svg:<rect x='-6' y='-4' width='12' height='8' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            left: "svg:<polygon points='0,-7 3.8,0 0,7 -3.8,0' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            right: "svg:<rect x='-3.5' y='-6.5' width='7' height='13' fill='none' stroke='currentColor' stroke-width='1.6'/>",
          },
        },
      ],
      groupB: [
        {
          faces: {
            top: "△",
            left: "svg:<polygon points='-5,-7 -5,7 5,7' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            right: "svg:<polygon points='2,-6 -4,4 4,4' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          },
        },
        {
          faces: {
            top: "△",
            left: "svg:<polygon points='5,-7 5,7 -5,7' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            right: "svg:<polygon points='2,-6 -4,4 4,4' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          },
        },
        {
          faces: {
            top: "△",
            left: "svg:<polygon points='0,-7 -6.5,6 6.5,6' fill='none' stroke='currentColor' stroke-width='1.6'/>",
            right: "svg:<polygon points='0,-6 -4.5,4 4.5,4' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          },
        },
      ],
      instructionHint: "Group A uses quadrilaterals (squares/diamonds), while Group B consists exclusively of triangles.",
    },
    options: [
      {
        key: "1",
        text: "Cube 1",
        cubeFaces: {
          top: "o o",
          left: "△",
          right: "svg:<polygon points='0,-6 -4,4 4,4' fill='none' stroke='currentColor' stroke-width='1.5'/>",
        },
      },
      {
        key: "2",
        text: "Cube 2",
        cubeFaces: {
          top: "svg:<rect x='-5.5' y='-4.5' width='11' height='9' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-5.5' y1='-4.5' x2='5.5' y2='4.5' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<polygon points='-6,-5 6,-5 0,6' fill='currentColor' fill-opacity='0.65' stroke='currentColor' stroke-width='1.4'/>",
          right: "",
        },
      },
      {
        key: "3",
        text: "Cube 3",
        cubeFaces: {
          top: "svg:<polygon points='-7,-4 7,-4 7,3 3,3 0,6 -3,3 -7,3' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          left: "svg:<polygon points='0,-7 -6.5,6 6.5,6' fill='currentColor' fill-opacity='0.65' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<rect x='-5' y='-5' width='10' height='10' fill='none' stroke='currentColor' stroke-width='1.6'/>",
        },
      },
    ],
    correctOption: "3",
    explanation:
      "Every cube in Group B has triangles on all visible faces (matching Option 1). Cube 3 preserves the plain square ('□') from Group A (Cubes 1 & 2) alongside a notched polygonal block, distinguishing it from Group B (Master Key: 3).",
  },
  {
    id: "oir_set35_q19",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 19,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "medium",
    tags: ["cubes", "alike-or-not", "spatial"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<rect x='-6' y='-5' width='12' height='10' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-6' y1='0' x2='6' y2='0' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<circle cx='0' cy='-4.5' r='2.8' fill='none' stroke='currentColor' stroke-width='1.5'/><polygon points='0,-1.5 -5,7 5,7' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          right: "svg:<polygon points='0,-7 -4,0 4,0' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='0,0 -4,7 4,7' fill='none' stroke='currentColor' stroke-width='1.4'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<circle cx='-3.2' cy='0' r='3.5' fill='none' stroke='currentColor' stroke-width='1.5'/><circle cx='3.2' cy='0' r='3.5' fill='none' stroke='currentColor' stroke-width='1.5'/>",
          left: "svg:<rect x='-6' y='-5' width='12' height='10' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='0' y1='-5' x2='0' y2='5' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<circle cx='0' cy='-4' r='2.6' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='0,-7 -5,3 5,3' fill='none' stroke='currentColor' stroke-width='1.4'/>",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "The divided rectangle rotated 90° and the circle-triangle/double-triangle symbols have no geometric contradiction across the two views, so both can belong to a single 6-sided cube ('Yes').",
  },
  {
    id: "oir_set35_q20",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 20,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "medium",
    tags: ["cubes", "group-a-b", "spatial"],
    promptText: "Which of the following can possibly belong to group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        {
          faces: {
            top: "svg:<circle cx='0' cy='0' r='5.8' fill='none' stroke='currentColor' stroke-width='1.5'/><path d='M-5.8,0 A5.8,5.8 0 0,1 5.8,0 Z' fill='currentColor'/>",
            left: "svg:<polygon points='-6,-5 6,-5 0,6' fill='currentColor' fill-opacity='0.75' stroke='currentColor' stroke-width='1.4'/>",
            right: "svg:<polygon points='0,-6 4,0 0,6 -4,0' fill='currentColor' fill-opacity='0.75' stroke='currentColor' stroke-width='1.3'/>",
          },
        },
        {
          faces: {
            top: "→",
            left: "svg:<line x1='0' y1='-8' x2='0' y2='8' stroke='currentColor' stroke-width='1.5'/><circle cx='0' cy='1' r='3.5' fill='currentColor'/>",
            right: "svg:<rect x='-2.5' y='-5' width='5' height='10' fill='currentColor'/>",
          },
        },
        {
          faces: {
            top: "svg:<circle cx='0' cy='0' r='4.2' fill='currentColor'/>",
            left: "svg:<rect x='-5.5' y='-2' width='6' height='6' fill='currentColor'/><line x1='0' y1='1' x2='7' y2='1' stroke='currentColor' stroke-width='1.5'/>",
            right: "svg:<line x1='0' y1='8' x2='0' y2='-4' stroke='currentColor' stroke-width='1.5'/><polygon points='0,-8 -3,-2 3,-2' fill='currentColor'/>",
          },
        },
      ],
      groupB: [
        {
          faces: {
            top: "svg:<circle cx='0' cy='0' r='5.5' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-5.5' y1='0' x2='5.5' y2='0' stroke='currentColor' stroke-width='1.5'/>",
            left: "svg:<polygon points='0,-6 -5.5,6 5.5,6' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-3' y1='1' x2='3' y2='1' stroke='currentColor' stroke-width='1.4'/>",
            right: "svg:<rect x='-5' y='-5' width='10' height='10' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='0' y1='-5' x2='0' y2='5' stroke='currentColor' stroke-width='1.3'/><line x1='-5' y1='0' x2='5' y2='0' stroke='currentColor' stroke-width='1.3'/>",
          },
        },
        {
          faces: {
            top: "svg:<polygon points='-5,-5 6,0 -5,5' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-5' y1='0' x2='6' y2='0' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<circle cx='0' cy='0' r='5.5' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-4' y1='-4' x2='4' y2='4' stroke='currentColor' stroke-width='1.5'/>",
            right: "svg:<rect x='-5' y='-5' width='10' height='10' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='-5' y1='0' x2='5' y2='0' stroke='currentColor' stroke-width='1.3'/>",
          },
        },
        {
          faces: {
            top: "svg:<rect x='-5.5' y='-4.5' width='11' height='9' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='-5.5' y1='0' x2='5.5' y2='0' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<rect x='-5' y='-5' width='10' height='10' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='0' y1='-5' x2='0' y2='5' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<ellipse cx='0' cy='0' rx='3.2' ry='5' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='0' y1='-5' x2='0' y2='5' stroke='currentColor' stroke-width='1.3'/>",
          },
        },
      ],
      instructionHint: "Group A features solid dark filled elements/beads, whereas Group B uses hollow outlined figures.",
    },
    options: [
      {
        key: "1",
        text: "Cube 1",
        cubeFaces: {
          top: "svg:<rect x='-5' y='-5' width='10' height='8' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<circle cx='0' cy='0' r='4.2' fill='currentColor'/>",
          right: "|",
        },
      },
      {
        key: "2",
        text: "Cube 2",
        cubeFaces: {
          top: "svg:<circle cx='0' cy='0' r='5.5' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-5.5' y1='0' x2='5.5' y2='0' stroke='currentColor' stroke-width='1.5'/>",
          left: "svg:<polygon points='0,-6 -5.5,6 5.5,6' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='-3' y1='1' x2='3' y2='1' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<rect x='-5' y='-5' width='10' height='10' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='-5' y1='0' x2='5' y2='0' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
      {
        key: "3",
        text: "Cube 3",
        cubeFaces: {
          top: "svg:<line x1='-7' y1='0' x2='7' y2='0' stroke='currentColor' stroke-width='1.6'/><circle cx='0' cy='0' r='3.5' fill='currentColor'/>",
          left: "svg:<rect x='-6' y='0' width='12' height='6' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='0' y1='-7' x2='0' y2='6' stroke='currentColor' stroke-width='1.5'/>",
          right: "×",
        },
      },
    ],
    correctOption: "3",
    explanation:
      "Cube 2 reproduces Group B Cube 1's hollow figures (barred circle, barred triangle, divided window). Cube 3 pairs the solid dark bead-on-line (from Group A Cube 2 rotated) with the stemmed box (from Group A Cube 3), matching Group A (Master Key: 3).",
  },
  {
    id: "oir_set35_q21",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 21,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "medium",
    tags: ["cubes", "group-a-b", "letters"],
    promptText: "Which one of the following cubes can possibly belong to Group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        { faces: { top: "A", left: "B", right: "OL" } },
        { faces: { top: "C", left: "OA", right: "E" } },
        { faces: { top: "OE", left: "F", right: "G" } },
      ],
      groupB: [
        { faces: { top: "JK", left: "HI", right: "O" } },
        { faces: { top: "O", left: "KL", right: "LM" } },
        { faces: { top: "PQ", left: "O", right: "NP" } },
      ],
      instructionHint: "Notice the count of single-letter faces vs 'O'+letter pairs vs standalone 'O'.",
    },
    options: [
      { key: "1", text: "Cube 1", cubeFaces: { top: "LM", left: "JK", right: "O" } },
      { key: "2", text: "Cube 2", cubeFaces: { top: "OP", left: "N", right: "P" } },
      { key: "3", text: "Cube 3", cubeFaces: { top: "MN", left: "NO", right: "HI" } },
    ],
    correctOption: "2",
    explanation:
      "Every cube in Group A displays 2 single letters and 1 two-letter 'O+letter' pair (e.g., A, B, OL; C, OA, E; OE, F, G). Every cube in Group B has 2 two-letter pairs (e.g., JK, HI) and a standalone 'O'. Only Cube 2 (OP, N, P) follows Group A's exact pattern.",
  },
  {
    id: "oir_set35_q22",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 22,
    type: "verbal",
    subType: "statement_classification",
    difficulty: "easy",
    tags: ["verbal-logic", "classification"],
    promptText:
      "Write the number of the choice that applies best to the statement given below:\n\"A milky sky reminds one of the milk which one gets from the sky for the milk bottles.\"",
    options: [
      { key: "1", text: "True" },
      { key: "2", text: "Probable" },
      { key: "3", text: "False" },
      { key: "4", text: "Absurd" },
    ],
    correctOption: "4",
    explanation:
      "Claiming milk for milk bottles comes from the sky is nonsensical, so the statement is 'Absurd' (choice 4).",
  },
  {
    id: "oir_set35_q23",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 23,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "easy",
    tags: ["cubes", "alike-or-not", "spatial"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the Answer Sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<rect x='-5.5' y='-4.5' width='11' height='9' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='3.5' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='0' y1='-3.5' x2='0' y2='3.5' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<polygon points='0,-7 -6.5,6 6.5,6' fill='none' stroke='currentColor' stroke-width='1.5'/><path d='M-5,3 Q0,-3 5,3' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<polygon points='0,-7 4.5,0 0,7 -4.5,0' fill='none' stroke='currentColor' stroke-width='1.5'/><line x1='0' y1='-7' x2='0' y2='7' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<rect x='-6' y='-4.5' width='12' height='9' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='2.5' cy='0' r='3.5' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<circle cx='0' cy='0' r='1.8' fill='none' stroke='currentColor' stroke-width='1.2'/><polygon points='0,-7 1.8,-2 6.5,-2 2.8,1.5 4.2,6.5 0,3.5 -4.2,6.5 -2.8,1.5 -6.5,-2 -1.8,-2' fill='none' stroke='currentColor' stroke-width='1.3'/>",
          right: "svg:<path d='M-4,5 L-3,-4 Q0,-7 3,-4 L4,5 Z' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='-1' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "The two views display 6 distinct symbols with no rotational contradiction, so they can belong to opposite sides of the same 6-faced cube ('Yes').",
  },
  {
    id: "oir_set35_q24",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 24,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "medium",
    tags: ["cubes", "alike-or-not", "arrows"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the Answer Sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<line x1='-6' y1='-3.5' x2='6' y2='-3.5' stroke='currentColor' stroke-width='1.5'/><polyline points='2,-6 6,-3.5 2,-1' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='6' y1='3.5' x2='-6' y2='3.5' stroke='currentColor' stroke-width='1.5'/><polyline points='-2,1 -6,3.5 -2,6' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<line x1='-6' y1='6' x2='2' y2='-6' stroke='currentColor' stroke-width='1.5'/><line x1='-1' y1='6' x2='7' y2='-6' stroke='currentColor' stroke-width='1.5'/>",
          right: "svg:<line x1='-4' y1='-6' x2='4' y2='6' stroke='currentColor' stroke-width='1.5'/><line x1='4' y1='-6' x2='-4' y2='6' stroke='currentColor' stroke-width='1.5'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<line x1='-6' y1='-6' x2='6' y2='6' stroke='currentColor' stroke-width='1.5'/><line x1='-6' y1='6' x2='6' y2='-6' stroke='currentColor' stroke-width='1.5'/>",
          left: "svg:<line x1='6' y1='6' x2='-2' y2='-6' stroke='currentColor' stroke-width='1.5'/><line x1='1' y1='6' x2='-7' y2='-6' stroke='currentColor' stroke-width='1.5'/>",
          right: "",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "The crossed arrows and parallel diagonal arrow pairs on Cube 1 and Cube 2 have no impossible edge-adjacency conflict across a 3D rotation ('Yes').",
  },
  {
    id: "oir_set35_q25",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 25,
    type: "verbal",
    subType: "proverb_meaning",
    difficulty: "easy",
    tags: ["proverbs", "comprehension"],
    promptText:
      "A proverb with four possible meanings is given below. Write the serial number of the meaning which you regard as correct.\nProverb: \"A rolling stone gathers no moss\"",
    options: [
      { key: "1", text: "A turn-coat rarely enjoys reputation." },
      { key: "2", text: "A rolling stone has no moss." },
      { key: "3", text: "Mossy stones are always good." },
      { key: "4", text: "Gathered moss turns into stones." },
    ],
    correctOption: "1",
    explanation:
      "Figuratively, someone who constantly shifts loyalties, jobs, or places ('a turn-coat') fails to build lasting standing or reputation (choice 1).",
  },
  {
    id: "oir_set35_q26",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 26,
    type: "non_verbal",
    subType: "cube_comparison",
    difficulty: "easy",
    tags: ["cubes", "alike-or-not", "patterns"],
    promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
    figures: {
      type: "cubes_compare",
      cubeA: {
        label: "Cube 1",
        faces: {
          top: "svg:<rect x='-5.5' y='-5.5' width='11' height='11' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='-2' y1='-5.5' x2='-2' y2='5.5' stroke='currentColor' stroke-width='1.2'/><line x1='2' y1='-5.5' x2='2' y2='5.5' stroke='currentColor' stroke-width='1.2'/>",
          left: "svg:<rect x='-6' y='-6' width='12' height='12' fill='none' stroke='currentColor' stroke-width='1.4'/><line x1='-2' y1='-6' x2='-2' y2='6' stroke='currentColor' stroke-width='1'/><line x1='2' y1='-6' x2='2' y2='6' stroke='currentColor' stroke-width='1'/><line x1='-6' y1='-2' x2='6' y2='-2' stroke='currentColor' stroke-width='1'/><line x1='-6' y1='2' x2='6' y2='2' stroke='currentColor' stroke-width='1'/>",
          right: "svg:<rect x='-6' y='-6' width='12' height='12' fill='currentColor' fill-opacity='0.65' stroke='currentColor' stroke-width='1.4'/>",
        },
      },
      cubeB: {
        label: "Cube 2",
        faces: {
          top: "svg:<rect x='-6' y='-6' width='12' height='12' fill='none' stroke='currentColor' stroke-width='1.4'/><rect x='-3' y='-3' width='6' height='6' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          left: "svg:<rect x='-6' y='-6' width='12' height='12' fill='currentColor' fill-opacity='0.65' stroke='currentColor' stroke-width='1.4'/>",
          right: "",
        },
      },
    },
    options: [
      { key: "Yes", text: "Yes (Alike)" },
      { key: "No", text: "No (Different)" },
    ],
    correctOption: "Yes",
    explanation:
      "Rotating Cube 1 so the speckled square moves from Right to Front exposes new adjacent Top (concentric squares) and Right (blank) faces without contradiction ('Yes').",
  },
  {
    id: "oir_set35_q27",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 27,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "hard",
    tags: ["cubes", "group-a-b", "spatial"],
    promptText: "Which one of the following cubes can possibly belong to Group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        {
          faces: {
            top: "svg:<rect x='-6' y='-3' width='5' height='5' fill='none' stroke='currentColor' stroke-width='1.3'/><circle cx='3.5' cy='-0.5' r='2.5' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<circle cx='-4' cy='-2' r='2.5' fill='currentColor' fill-opacity='0.65'/><circle cx='4' cy='-2' r='2.5' fill='currentColor' fill-opacity='0.65'/><circle cx='0' cy='4' r='2.5' fill='currentColor' fill-opacity='0.65'/>",
            right: "svg:<rect x='-5' y='-5' width='4' height='10' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-width='1.2'/><rect x='1' y='-5' width='4' height='10' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-width='1.2'/>",
          },
        },
        {
          faces: {
            top: "▲ ▲",
            left: "svg:<polygon points='-3,-6 -6,2 0,2' fill='currentColor' fill-opacity='0.65'/><polygon points='3,0 0,7 6,7' fill='none' stroke='currentColor' stroke-width='1.4'/>",
            right: "svg:<circle cx='0' cy='-4.5' r='2.4' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='0,0 -3.5,6 3.5,6' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          },
        },
        {
          faces: {
            top: "svg:<circle cx='-3.5' cy='0' r='2.3' fill='currentColor' fill-opacity='0.65'/><circle cx='3.5' cy='0' r='2.3' fill='currentColor' fill-opacity='0.65'/>",
            left: "svg:<rect x='-7' y='-6' width='14' height='5' fill='none' stroke='currentColor' stroke-width='1.3'/><rect x='-7' y='1' width='14' height='5' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<polygon points='-3,-5 3,-2 -3,1' fill='none' stroke='currentColor' stroke-width='1.3'/><polygon points='-3,2 3,5 -3,8' fill='none' stroke='currentColor' stroke-width='1.3'/>",
          },
        },
      ],
      groupB: [
        {
          faces: {
            top: "svg:<circle cx='-3.5' cy='0' r='2.4' fill='currentColor' fill-opacity='0.65'/><rect x='1' y='-3' width='5' height='6' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-width='1.2'/>",
            left: "svg:<polygon points='0,-7 -4,-1 4,-1' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='0,1 -4,7 4,7' fill='none' stroke='currentColor' stroke-width='1.4'/>",
            right: "svg:<circle cx='0' cy='-4' r='2.3' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='4' r='2.3' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          },
        },
        {
          faces: {
            top: "△ △",
            left: "svg:<rect x='-6' y='-5' width='4.5' height='5' fill='currentColor' fill-opacity='0.65'/><polygon points='3,-1 0,6 6,6' fill='currentColor' fill-opacity='0.65'/>",
            right: "svg:<rect x='-3' y='-6' width='6' height='5' fill='none' stroke='currentColor' stroke-width='1.3'/><rect x='-3' y='1' width='6' height='5' fill='none' stroke='currentColor' stroke-width='1.3'/>",
          },
        },
        {
          faces: {
            top: "o o",
            left: "svg:<rect x='-6' y='-6' width='5' height='11' fill='none' stroke='currentColor' stroke-width='1.3'/><rect x='1' y='-6' width='5' height='11' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<circle cx='0' cy='0' r='3' fill='currentColor' fill-opacity='0.65'/>",
          },
        },
      ],
      instructionHint: "Compare which option repeats the clean hollow circle-and-triangle motif of Group A vs Group B's shaded rectangles.",
    },
    options: [
      {
        key: "1",
        text: "Cube 1",
        cubeFaces: {
          top: "o o",
          left: "svg:<rect x='-3' y='-7' width='6' height='8' fill='currentColor' fill-opacity='0.6'/><polygon points='0,2 -3.5,8 3.5,8' fill='currentColor' fill-opacity='0.65'/>",
          right: "▲ ▲",
        },
      },
      {
        key: "2",
        text: "Cube 2",
        cubeFaces: {
          top: "o △",
          left: "svg:<circle cx='-4' cy='3' r='2.4' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='3,-5 -1,3 7,3' fill='none' stroke='currentColor' stroke-width='1.4'/>",
          right: "svg:<polygon points='0,-6 -3.5,-1 3.5,-1' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='0,1 -3.5,6 3.5,6' fill='none' stroke='currentColor' stroke-width='1.4'/>",
        },
      },
      {
        key: "3",
        text: "Cube 3",
        cubeFaces: {
          top: "svg:<circle cx='-3.5' cy='0' r='2.4' fill='currentColor' fill-opacity='0.65'/><rect x='1' y='-3' width='5' height='6' fill='currentColor' fill-opacity='0.5' stroke='currentColor' stroke-width='1.2'/>",
          left: "△ △",
          right: "svg:<rect x='-3' y='-6' width='6' height='5' fill='none' stroke='currentColor' stroke-width='1.3'/><rect x='-3' y='1' width='6' height='5' fill='none' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
    ],
    correctOption: "2",
    explanation:
      "Cube 3 reproduces Group B elements (B1 Top + B2 Right), and Cube 1 repeats Group B's shaded vertical bar + hollow 'o o' pairing. Cube 2 preserves the hollow triangle pairs and circle+triangle face matching Group A (Cubes 2 & 3).",
  },
  {
    id: "oir_set35_q28",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 28,
    type: "verbal",
    subType: "synonym_replacement",
    difficulty: "easy",
    tags: ["vocabulary", "synonyms"],
    promptText:
      "One of the four choices can replace the underlined word without changing the sense which it conveys.\nSentence: He advised to **hate** the immoral persons.",
    options: [
      { key: "1", text: "Mice" },
      { key: "2", text: "Detest" },
      { key: "3", text: "Resist" },
      { key: "4", text: "Rebel" },
    ],
    correctOption: "2",
    explanation: "'Detest' means to dislike intensely or hate (choice 2).",
  },
  {
    id: "oir_set35_q29",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 29,
    type: "verbal",
    subType: "quantitative_word_problem",
    difficulty: "medium",
    tags: ["arithmetic", "ratios", "word-problem"],
    promptText:
      "Write the number of the correct choice on your answer sheet. Two inkpots cost as much as three books and seven books cost equal to three days wages of a labourer. His daily wages are 196 paise. The cost of one inkpot will be :-",
    options: [
      { key: "1", text: "198 Paise" },
      { key: "2", text: "120 Paise" },
      { key: "3", text: "14 Paise" },
      { key: "4", text: "126 paise" },
    ],
    correctOption: "4",
    explanation:
      "3 days wages = 3 × 196 = 588 paise = cost of 7 books ⇒ 1 book = 588 / 7 = 84 paise. 2 inkpots = 3 books = 3 × 84 = 252 paise ⇒ 1 inkpot = 252 / 2 = 126 paise (choice 4).",
  },
  {
    id: "oir_set35_q30",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 30,
    type: "verbal",
    subType: "synonym_replacement",
    difficulty: "easy",
    tags: ["vocabulary", "synonyms"],
    promptText:
      "One of the four choices can replace the underlined word without changing the sense which it conveys.\nSentence: He shall make **adequate** arrangement, for your departure.",
    options: [
      { key: "1", text: "accurate" },
      { key: "2", text: "sufficient" },
      { key: "3", text: "alike" },
      { key: "4", text: "against" },
    ],
    correctOption: "2",
    explanation: "'Sufficient' means enough or adequate for the need (choice 2).",
  },
  {
    id: "oir_set35_q31",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 31,
    type: "verbal",
    subType: "clock_angles",
    difficulty: "easy",
    tags: ["clocks", "angles", "spatial"],
    promptText:
      "Write the number of the correct choice.\nIt is 3.00 P.M. by a clock. Its hands are moved by 90° in clockwise direction. The estimate of time approximately will be :-",
    options: [
      { key: "1", text: "12.45 AM" },
      { key: "2", text: "3.50 AM" },
      { key: "3", text: "6.15 PM" },
      { key: "4", text: "9.15 PM" },
    ],
    correctOption: "3",
    explanation:
      "Rotating both hands clockwise by 90° moves the hour hand from 3 to 6 (+3 hours) and the minute hand from 12 to 3 (+15 minutes), giving 6.15 PM (choice 3).",
  },
  {
    id: "oir_set35_q32",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 32,
    type: "non_verbal",
    subType: "cube_group_classification",
    difficulty: "medium",
    tags: ["cubes", "group-a-b", "shapes"],
    promptText: "Which one of the following cubes can possibly belong to Group A?",
    figures: {
      type: "cubes_group",
      groupA: [
        {
          faces: {
            top: "svg:<polygon points='0,-7 -7,6 7,6' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='0,-3 -3.5,4 3.5,4' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<rect x='-6' y='-6' width='12' height='12' fill='none' stroke='currentColor' stroke-width='1.4'/><rect x='-3' y='-3' width='6' height='6' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<circle cx='0' cy='0' r='5.5' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2.5' fill='none' stroke='currentColor' stroke-width='1.3'/>",
          },
        },
        {
          faces: {
            top: "svg:<circle cx='0' cy='0' r='5.8' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2.6' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            left: "svg:<circle cx='0' cy='0' r='5.8' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2.6' fill='none' stroke='currentColor' stroke-width='1.3'/>",
            right: "svg:<rect x='-4.5' y='-5.5' width='9' height='11' fill='none' stroke='currentColor' stroke-width='1.4'/><rect x='-2' y='-2.5' width='4' height='5' fill='none' stroke='currentColor' stroke-width='1.2'/>",
          },
        },
        {
          faces: {
            top: "svg:<polygon points='0,-7 -6.5,5.5 6.5,5.5' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='1.5' r='1.5' fill='currentColor'/>",
            left: "svg:<path d='M-2,-5 A2.2,2.2 0 1,1 2,-5 A2.2,2.2 0 1,1 4,-1 A2.2,2.2 0 1,1 0,2 A2.2,2.2 0 1,1 -4,-1 A2.2,2.2 0 1,1 -2,-5 Z' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='1.4' fill='currentColor'/>",
            right: "svg:<circle cx='0' cy='0' r='5' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/>",
          },
        },
      ],
      groupB: [
        { faces: { top: "○", left: "□", right: "△" } },
        { faces: { top: "△", left: "△", right: "△" } },
        { faces: { top: "○", left: "○", right: "○" } },
      ],
      instructionHint: "Every face in Group A contains an inner/concentric or patterned element; Group B uses plain empty outlines.",
    },
    options: [
      {
        key: "1",
        text: "Cube 1",
        cubeFaces: {
          top: "svg:<rect x='-5.5' y='-4.5' width='11' height='9' fill='currentColor' fill-opacity='0.6' stroke='currentColor' stroke-width='1.3'/>",
          left: "svg:<polygon points='0,-7 -7,6 7,6' fill='none' stroke='currentColor' stroke-width='1.4'/><polygon points='0,-3 -3.5,4 3.5,4' fill='none' stroke='currentColor' stroke-width='1.3'/>",
          right: "svg:<circle cx='0' cy='0' r='5' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
      {
        key: "2",
        text: "Cube 2",
        cubeFaces: {
          top: "△",
          left: "svg:<rect x='-5.5' y='-5.5' width='11' height='11' fill='currentColor' fill-opacity='0.6' stroke='currentColor' stroke-width='1.3'/>",
          right: "svg:<circle cx='0' cy='0' r='5' fill='none' stroke='currentColor' stroke-width='1.4'/><circle cx='0' cy='0' r='2' fill='none' stroke='currentColor' stroke-width='1.3'/>",
        },
      },
      {
        key: "3",
        text: "Cube 3",
        cubeFaces: {
          top: "□",
          left: "△",
          right: "8",
        },
      },
    ],
    correctOption: "1",
    explanation:
      "Every cube in Group B has hollow, empty single outlines (plain ○, □, △). Cube 1 shows the nested concentric triangle and concentric circle directly from Group A Cube 1 alongside a shaded square — no hollow Group B faces appear.",
  },
  {
    id: "oir_set35_q33",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 33,
    type: "verbal",
    subType: "dictionary_order",
    difficulty: "easy",
    tags: ["alphabet", "dictionary"],
    promptText: "Write the number of the word which will come last in the dictionary.",
    options: [
      { key: "1", text: "Trophy" },
      { key: "2", text: "Vertex" },
      { key: "3", text: "Ulterior" },
      { key: "4", text: "Rabbit" },
    ],
    correctOption: "2",
    explanation: "Alphabetical order: Rabbit, Trophy, Ulterior, Vertex. 'Vertex' comes last (choice 2).",
  },
  {
    id: "oir_set35_q34",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 34,
    type: "verbal",
    subType: "dictionary_order",
    difficulty: "easy",
    tags: ["alphabet", "dictionary"],
    promptText: "Write the number of the word which will come last in the dictionary.",
    options: [
      { key: "1", text: "Jaw" },
      { key: "2", text: "Jerk" },
      { key: "3", text: "Junior" },
      { key: "4", text: "Juice" },
    ],
    correctOption: "3",
    explanation: "Alphabetical order: Jaw, Jerk, Juice, Junior. Since 'Jun...' follows 'Jui...', 'Junior' comes last (choice 3).",
  },
  {
    id: "oir_set35_q35",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 35,
    type: "verbal",
    subType: "number_sequence_counting",
    difficulty: "easy",
    tags: ["attention-to-detail", "counting"],
    promptText:
      "Write the number of the correct choice.\nHow many 4's come just after 9 in the following numbers?\n4 9 4 3 9 2 4 4 4 2 9 4 5 7 3 8 9 3 2 1 4 9 4 1 9 4 3 4 9",
    options: [
      { key: "1", text: "2" },
      { key: "2", text: "5" },
      { key: "3", text: "6" },
      { key: "4", text: "4" },
    ],
    correctOption: "4",
    explanation:
      "Scanning for '9 4' pairs in the string gives 4 occurrences: 4 [9 4] 3 9 2 4 4 4 2 [9 4] 5 7 3 8 9 3 2 1 4 [9 4] 1 [9 4] 3 4 9 (choice 4).",
  },
  {
    id: "oir_set35_q36",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 36,
    type: "verbal",
    subType: "dictionary_order",
    difficulty: "easy",
    tags: ["alphabet", "dictionary"],
    promptText: "Write the number of the word which will come last in the dictionary.",
    options: [
      { key: "1", text: "Spider" },
      { key: "2", text: "Depart" },
      { key: "3", text: "Label" },
      { key: "4", text: "Budget" },
    ],
    correctOption: "1",
    explanation: "Alphabetical order: Budget, Depart, Label, Spider. 'Spider' comes last (choice 1).",
  },
  {
    id: "oir_set35_q37",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 37,
    type: "verbal",
    subType: "dictionary_order",
    difficulty: "easy",
    tags: ["alphabet", "dictionary"],
    promptText: "Write the number of the word which will come last in the dictionary.",
    options: [
      { key: "1", text: "Zone" },
      { key: "2", text: "Yell" },
      { key: "3", text: "Omen" },
      { key: "4", text: "Marshal" },
    ],
    correctOption: "1",
    explanation: "Alphabetical order: Marshal, Omen, Yell, Zone. 'Zone' comes last (choice 1).",
  },
  {
    id: "oir_set35_q38",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 38,
    type: "verbal",
    subType: "reason_justification",
    difficulty: "easy",
    tags: ["verbal-reasoning", "justification"],
    promptText:
      "The underlined statement has four reasons for its justification. Write the serial number of the reason you think correct.\nStatement: **Physical exercise is very essential for human beings because :-**",
    options: [
      { key: "1", text: "It keeps the body fit." },
      { key: "2", text: "It kills some spare time which a man cannot otherwise use profitably." },
      { key: "3", text: "It creates fear in the mind of others about the physical strength of the person concerned and they invariably accept him as their leader." },
      { key: "4", text: "One can never feel hungry without physical exercise." },
    ],
    correctOption: "1",
    explanation: "Physical exercise keeps the body fit and healthy (choice 1).",
  },
  {
    id: "oir_set35_q39",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 39,
    type: "verbal",
    subType: "dictionary_order",
    difficulty: "easy",
    tags: ["alphabet", "dictionary"],
    promptText: "Write the number of the word which will come last in the dictionary.",
    options: [
      { key: "1", text: "Wicket" },
      { key: "2", text: "Homage" },
      { key: "3", text: "Ugly" },
      { key: "4", text: "Quack" },
    ],
    correctOption: "1",
    explanation: "Alphabetical order: Homage, Quack, Ugly, Wicket. 'Wicket' comes last (choice 1).",
  },
  {
    id: "oir_set35_q40",
    source: "Authentic DIPR",
    sourceBookletId: "booklet_35",
    sourceBookletName: "DIPR Booklet 35 (Test A)",
    questionNumber: 40,
    type: "verbal",
    subType: "quantitative_word_problem",
    difficulty: "easy",
    tags: ["arithmetic", "money", "word-problem"],
    promptText:
      "Write the number of the correct choice.\nA gave a ten rupee note to a bearer to be charged for two ice creams costing 95 paise each. After paying a tip to the bearer he had only seven rupees and twenty paise left. The tip given to the bearer was :-",
    options: [
      { key: "1", text: "135 paise" },
      { key: "2", text: "90 paise" },
      { key: "3", text: "25 paise" },
      { key: "4", text: "85 paise" },
    ],
    correctOption: "2",
    explanation:
      "Total note = 1000 paise. Cost of 2 ice creams = 2 × 95 = 190 paise. Balance left = 720 paise. Tip paid = 1000 − (190 + 720) = 90 paise (choice 2).",
  },
];

export const BOOKLET_35: OIRBooklet = {
  id: "booklet_35",
  source: "Authentic DIPR",
  bookletNumber: "DIPR-35",
  title: "DIPR Booklet 35 (Test A — Authentic)",
  category: "mixed",
  totalQuestions: 39,
  durationMinutes: 17,
  markingScheme: { correct: 1.0, incorrect: 0.0 },
  description:
    "Authentic DIPR Booklet No. 35 (Test A) — 39 complete mixed Verbal & Cube Non-Verbal items (Q1–Q15, Q17–Q40; Q16 option cubes are physically cropped at page 4's scan edge in the original booklet).",
  questions: BOOKLET_35_QUESTIONS,
};
