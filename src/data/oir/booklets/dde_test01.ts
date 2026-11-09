import { OIRBooklet } from "../types";

export const DDE_TEST_01: OIRBooklet = {
  id: "oir-dde-01",
  source: "DDE",
  bookletNumber: "DDE-01",
  title: "DDE Official OIR Practice Test 01",
  category: "non_verbal",
  totalQuestions: 40,
  durationMinutes: 17,
  markingScheme: { correct: 1.0, incorrect: 0.0 },
  description: "DDE Defence Direct Education standardized OIR non-verbal practice test. Features cube comparison (Q1-15), set matching (Q16-25), and spatial deduction.",
  questions: [
    {
      id: "oir_dde01_q01",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 1,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "○", left: "↑", right: "▷" } },
        cubeB: { label: "Cube 2", faces: { top: "△", left: "↖", right: "S" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Rotating Cube 1 brings the corresponding triangle and arrow into consistent relative coordinates."
    },
    {
      id: "oir_dde01_q02",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 2,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "M", left: "↘", right: "|" } },
        cubeB: { label: "Cube 2", faces: { top: "●", left: "M", right: "—" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Face M is common; rotation preserves orthogonal alignment."
    },
    {
      id: "oir_dde01_q03",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 3,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "=", left: "+", right: "↑" } },
        cubeB: { label: "Cube 2", faces: { top: "//", left: "↑", right: "✕" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Valid 3D rotation maintains orientation of the arrow relative to parallel bars."
    },
    {
      id: "oir_dde01_q04",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 4,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "%", left: "✕", right: "→" } },
        cubeB: { label: "Cube 2", faces: { top: "○", left: "%", right: "↑" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "NO",
      explanation: "Cross-face geometry conflicts with circle on top face under rotation."
    },
    {
      id: "oir_dde01_q05",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 5,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "○", left: "△", right: "↓" } },
        cubeB: { label: "Cube 2", faces: { top: "↘", left: "△", right: "●" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Triangle face alignment is preserved with standard dihedral rotation."
    },
    {
      id: "oir_dde01_q06",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 6,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "✕", left: "↗", right: "↖" } },
        cubeB: { label: "Cube 2", faces: { top: "%", left: "↘", right: "+" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Rotating around the diagonal axis maps arrow pairs consistently."
    },
    {
      id: "oir_dde01_q07",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 7,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "C", left: "●", right: "M" } },
        cubeB: { label: "Cube 2", faces: { top: "●", left: "M", right: "C" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "NO",
      explanation: "Handedness of C relative to M and dot is chiral / inverted."
    },
    {
      id: "oir_dde01_q08",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 8,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "✕", left: "Z", right: "C" } },
        cubeB: { label: "Cube 2", faces: { top: "C", left: "N", right: "→" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "NO",
      explanation: "Letter Z turns into N, but top cross conflicts with arrow vector."
    },
    {
      id: "oir_dde01_q09",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 9,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "T", left: "E", right: "V" } },
        cubeB: { label: "Cube 2", faces: { top: "✕", left: "E", right: "T" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Face E remains on left while 90 degree roll shifts T to right and reveals cross."
    },
    {
      id: "oir_dde01_q10",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 10,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "↘", left: "%", right: "N" } },
        cubeB: { label: "Cube 2", faces: { top: "%", left: "○", right: "Z" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Rotating cube places % on top, mapping N to Z in lateral perspective."
    },
    {
      id: "oir_dde01_q11",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 11,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "%", left: "U", right: "N" } },
        cubeB: { label: "Cube 2", faces: { top: "U", left: "N", right: "●" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "NO",
      explanation: "Relative positioning of U and N is swapped across the hinge axis."
    },
    {
      id: "oir_dde01_q12",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 12,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "↗", left: "ɣ", right: "=" } },
        cubeB: { label: "Cube 2", faces: { top: "○", left: "ɣ", right: "→" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Consistent orthogonal rotation with gamma face intact."
    },
    {
      id: "oir_dde01_q13",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 13,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "♡", left: "C", right: "⤢" } },
        cubeB: { label: "Cube 2", faces: { top: "%", left: "♡", right: "⤢" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Heart shape shifts to left face with double-headed diagonal arrow maintained."
    },
    {
      id: "oir_dde01_q14",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 14,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "○", left: "♀", right: "☾" } },
        cubeB: { label: "Cube 2", faces: { top: "☾", left: "♀", right: "↑" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "YES",
      explanation: "Crescent rotates to top while female symbol preserves horizontal side."
    },
    {
      id: "oir_dde01_q15",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 15,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "easy",
      tags: ["cubes", "comparison"],
      promptText: "Find out if the two cubes look alike or not. Answer with YES or NO.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "↗", left: "%", right: ")" } },
        cubeB: { label: "Cube 2", faces: { top: "%", left: "↑", right: ")" } }
      },
      options: [
        { key: "YES", text: "YES" },
        { key: "NO", text: "NO" }
      ],
      correctOption: "NO",
      explanation: "Arrow direction alters relative to parenthesis curvature."
    },
    {
      id: "oir_dde01_q16",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 16,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "set_matching"],
      promptText: "Find the set which matches with SET A:",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "A", left: "D", right: "⊖" } },
          { label: "A2", faces: { top: "I", left: "V", right: "D" } },
          { label: "A3", faces: { top: "⊘", left: "D", right: "A" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "B", left: "F", right: "U" } },
          { label: "B2", faces: { top: "Z", left: "$", right: "P" } },
          { label: "B3", faces: { top: "T", left: "○", right: "V" } }
        ]
      },
      options: [
        { key: "SET B", text: "SET B" },
        { key: "SET C", text: "SET C" }
      ],
      correctOption: "SET B",
      explanation: "The rightmost cube of Set B shares the identical geometric letter structure of Set A."
    },
    {
      id: "oir_dde01_q17",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 17,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "set_matching"],
      promptText: "Find the set which matches with SET A:",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "J", left: "↑", right: "C" } },
          { label: "A2", faces: { top: "S", left: "L", right: "○" } },
          { label: "A3", faces: { top: "Y", left: "N", right: "S" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "&", left: "A", right: "⊖" } },
          { label: "B2", faces: { top: "Q", left: "↑", right: "E" } },
          { label: "B3", faces: { top: "U", left: "S", right: "B" } }
        ]
      },
      options: [
        { key: "SET B", text: "SET B" },
        { key: "SET C", text: "SET C" }
      ],
      correctOption: "SET B",
      explanation: "Upper face of rightmost cube in Set B shares matching pattern with Set A."
    },
    {
      id: "oir_dde01_q18",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 18,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "set_matching"],
      promptText: "Find the set which matches with SET A:",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "A", left: "C", right: "E" } },
          { label: "A2", faces: { top: "G", left: "I", right: "K" } },
          { label: "A3", faces: { top: "M", left: "O", right: "Q" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "B", left: "D", right: "F" } },
          { label: "B2", faces: { top: "H", left: "J", right: "L" } },
          { label: "B3", faces: { top: "N", left: "P", right: "R" } }
        ]
      },
      options: [
        { key: "SET B", text: "SET B" },
        { key: "SET C", text: "SET C" }
      ],
      correctOption: "SET C",
      explanation: "Set A contains alphabet letters of odd positional places (1, 3, 5, etc.), matching Set C."
    },
    {
      id: "oir_dde01_q19",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 19,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "numbers"],
      promptText: "Find the set which matches with SET A (Odd Number Rule):",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "1", left: "3", right: "5" } },
          { label: "A2", faces: { top: "7", left: "9", right: "11" } },
          { label: "A3", faces: { top: "13", left: "15", right: "17" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "2", left: "4", right: "6" } },
          { label: "B2", faces: { top: "8", left: "10", right: "12" } },
          { label: "B3", faces: { top: "14", left: "16", right: "18" } }
        ]
      },
      options: [
        { key: "SET B", text: "SET B" },
        { key: "SET C", text: "SET C" }
      ],
      correctOption: "SET C",
      explanation: "Set A contains odd numbers exclusively. Set C features matching odd parity."
    },
    {
      id: "oir_dde01_q20",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 20,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "squares"],
      promptText: "Find the set which matches with SET A (Square Numbers):",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "1", left: "4", right: "9" } },
          { label: "A2", faces: { top: "16", left: "25", right: "36" } },
          { label: "A3", faces: { top: "49", left: "64", right: "81" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "2", left: "3", right: "5" } },
          { label: "B2", faces: { top: "6", left: "7", right: "8" } },
          { label: "B3", faces: { top: "10", left: "11", right: "12" } }
        ]
      },
      options: [
        { key: "SET B", text: "SET B" },
        { key: "SET C", text: "SET C" }
      ],
      correctOption: "SET C",
      explanation: "Set A consists of perfect squares (1, 4, 9, 16, 25...), matching Set C."
    },
    {
      id: "oir_dde01_q21",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 21,
      type: "verbal",
      subType: "number_series",
      difficulty: "easy",
      tags: ["series"],
      promptText: "Which number completes the series: 2, 3, 5, 7, 11, ——?",
      options: [
        { key: "1", text: "12" },
        { key: "2", text: "13" },
        { key: "3", text: "14" },
        { key: "4", text: "15" }
      ],
      correctOption: "2",
      explanation: "Prime number series: 2, 3, 5, 7, 11, 13."
    },
    {
      id: "oir_dde01_q22",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 22,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["analogy"],
      promptText: "Soldier is to Army as Sailor is to ——",
      options: [
        { key: "1", text: "Air Force" },
        { key: "2", text: "Navy" },
        { key: "3", text: "Coast Guard" },
        { key: "4", text: "Infantry" }
      ],
      correctOption: "2",
      explanation: "Sailors serve in the Navy, as soldiers serve in the Army."
    },
    {
      id: "oir_dde01_q23",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 23,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "easy",
      tags: ["coding"],
      promptText: "If WAR is coded as 23-1-18, what is the code for PEACE?",
      options: [
        { key: "1", text: "16-5-1-3-5" },
        { key: "2", text: "15-5-1-3-5" },
        { key: "3", text: "16-4-1-3-5" },
        { key: "4", text: "16-5-2-3-5" }
      ],
      correctOption: "1",
      explanation: "Alphabetical numerical positions: P=16, E=5, A=1, C=3, E=5."
    },
    {
      id: "oir_dde01_q24",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 24,
      type: "verbal",
      subType: "direction_sense",
      difficulty: "medium",
      tags: ["direction"],
      promptText: "A radar post tracks an aircraft flying 10 km North, then 10 km East. What is the direct bearing from the radar post?",
      options: [
        { key: "1", text: "North-West" },
        { key: "2", text: "North-East" },
        { key: "3", text: "South-East" },
        { key: "4", text: "South-West" }
      ],
      correctOption: "2",
      explanation: "Equal displacements North and East result in a 45 degree North-East bearing."
    },
    {
      id: "oir_dde01_q25",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 25,
      type: "verbal",
      subType: "odd_one_out",
      difficulty: "easy",
      tags: ["classification"],
      promptText: "Which armed forces aircraft is the odd one out?",
      options: [
        { key: "1", text: "Rafale" },
        { key: "2", text: "Su-30 MKI" },
        { key: "3", text: "MiG-29" },
        { key: "4", text: "C-130J Hercules" }
      ],
      correctOption: "4",
      explanation: "Rafale, Su-30 MKI, and MiG-29 are fighter aircraft; C-130J is a tactical military transport aircraft."
    },
    {
      id: "oir_dde01_q26",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 26,
      type: "verbal",
      subType: "letter_series",
      difficulty: "easy",
      tags: ["series"],
      promptText: "Find the next letter: C, F, I, L, O, ——",
      options: [
        { key: "1", text: "Q" },
        { key: "2", text: "R" },
        { key: "3", text: "S" },
        { key: "4", text: "P" }
      ],
      correctOption: "2",
      explanation: "Increments of +3: C(3), F(6), I(9), L(12), O(15) -> R(18)."
    },
    {
      id: "oir_dde01_q27",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 27,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["analogy"],
      promptText: "Telescope is to Stars as Microscope is to ——",
      options: [
        { key: "1", text: "Bacteria / Cells" },
        { key: "2", text: "Planets" },
        { key: "3", text: "Clouds" },
        { key: "4", text: "Mountains" }
      ],
      correctOption: "1",
      explanation: "A telescope magnifies distant celestial objects; a microscope magnifies microscopic cells and bacteria."
    },
    {
      id: "oir_dde01_q28",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 28,
      type: "verbal",
      subType: "arithmetic_reasoning",
      difficulty: "medium",
      tags: ["math"],
      promptText: "If 6 men build a perimeter wall in 12 days, how many days will 9 men take to build the identical wall?",
      options: [
        { key: "1", text: "6 days" },
        { key: "2", text: "8 days" },
        { key: "3", text: "10 days" },
        { key: "4", text: "9 days" }
      ],
      correctOption: "2",
      explanation: "Man-days = 6 * 12 = 72. Days for 9 men = 72 / 9 = 8 days."
    },
    {
      id: "oir_dde01_q29",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 29,
      type: "verbal",
      subType: "ranking_order",
      difficulty: "easy",
      tags: ["ranking"],
      promptText: "In a class of 50 cadets, Arjun ranks 18th from the top. What is his rank from the bottom?",
      options: [
        { key: "1", text: "32nd" },
        { key: "2", text: "33rd" },
        { key: "3", text: "34th" },
        { key: "4", text: "31st" }
      ],
      correctOption: "2",
      explanation: "Rank from bottom = Total (50) - Rank from top (18) + 1 = 33rd."
    },
    {
      id: "oir_dde01_q30",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 30,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["statement_evaluation"],
      promptText: "Statement: 'A military leader must remain composed under intense operational stress.'",
      options: [
        { key: "1", text: "Always True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Absurd" }
      ],
      correctOption: "1",
      explanation: "Emotional stability under crisis is the core definition of Factor IV OLQ (Liveliness & Courage)."
    },
    {
      id: "oir_dde01_q31",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 31,
      type: "verbal",
      subType: "blood_relations",
      difficulty: "medium",
      tags: ["blood_relations"],
      promptText: "A is father of B, but B is not son of A. What is B to A?",
      options: [
        { key: "1", text: "Brother" },
        { key: "2", text: "Daughter" },
        { key: "3", text: "Niece" },
        { key: "4", text: "Sister" }
      ],
      correctOption: "2",
      explanation: "If B is the child of father A and is not his son, B must be his daughter."
    },
    {
      id: "oir_dde01_q32",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 32,
      type: "verbal",
      subType: "number_comparison",
      difficulty: "easy",
      tags: ["numbers"],
      promptText: "Which number is the largest among: 48921, 48912, 48991, 48982",
      options: [
        { key: "1", text: "48921" },
        { key: "2", text: "48912" },
        { key: "3", text: "48991" },
        { key: "4", text: "48982" }
      ],
      correctOption: "3",
      explanation: "48991 is the largest."
    },
    {
      id: "oir_dde01_q33",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 33,
      type: "verbal",
      subType: "syllogism",
      difficulty: "medium",
      tags: ["syllogism"],
      promptText: "Statements: All tanks are armored. All armored vehicles are combat ready. Conclusion: All tanks are combat ready.",
      options: [
        { key: "1", text: "Definitely True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Cannot Determine" }
      ],
      correctOption: "1",
      explanation: "Transitive logical deduction: All A are B, all B are C -> All A are C. Definitely True."
    },
    {
      id: "oir_dde01_q34",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 34,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["analogy"],
      promptText: "INS Vikrant is to Aircraft Carrier as INS Arihant is to ——",
      options: [
        { key: "1", text: "Nuclear Submarine" },
        { key: "2", text: "Destroyer" },
        { key: "3", text: "Frigate" },
        { key: "4", text: "Corvette" }
      ],
      correctOption: "1",
      explanation: "INS Arihant is India's indigenous nuclear-powered ballistic missile submarine."
    },
    {
      id: "oir_dde01_q35",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 35,
      type: "verbal",
      subType: "coding_decoding",
      difficulty: "easy",
      tags: ["coding"],
      promptText: "If RED is coded as 27 (18 + 5 + 4), what is the sum code of BLUE?",
      options: [
        { key: "1", text: "38" },
        { key: "2", text: "40" },
        { key: "3", text: "42" },
        { key: "4", text: "36" }
      ],
      correctOption: "2",
      explanation: "B(2) + L(12) + U(21) + E(5) = 40."
    },
    {
      id: "oir_dde01_q36",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 36,
      type: "verbal",
      subType: "arithmetic_reasoning",
      difficulty: "easy",
      tags: ["math"],
      promptText: "A patrol jeep travels 150 km in 3 hours. How many km will it travel in 5 hours at the same speed?",
      options: [
        { key: "1", text: "220 km" },
        { key: "2", text: "250 km" },
        { key: "3", text: "275 km" },
        { key: "4", text: "300 km" }
      ],
      correctOption: "2",
      explanation: "Speed = 150 / 3 = 50 km/h. Distance in 5 hours = 50 * 5 = 250 km."
    },
    {
      id: "oir_dde01_q37",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 37,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["dictionary"],
      promptText: "Write the number of the word which will come LAST in the dictionary: (1) Radar (2) Radio (3) Radiation (4) Radius",
      options: [
        { key: "1", text: "Radar" },
        { key: "2", text: "Radio" },
        { key: "3", text: "Radiation" },
        { key: "4", text: "Radius" }
      ],
      correctOption: "4",
      explanation: "Radar -> Radiation -> Radio -> Radius. Radius (R-A-D-I-U) is last."
    },
    {
      id: "oir_dde01_q38",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 38,
      type: "verbal",
      subType: "letter_series",
      difficulty: "medium",
      tags: ["series"],
      promptText: "Find the missing letters in the series: AB, DE, GH, JK, ——",
      options: [
        { key: "1", text: "MN" },
        { key: "2", text: "LM" },
        { key: "3", text: "NO" },
        { key: "4", text: "OP" }
      ],
      correctOption: "1",
      explanation: "Two consecutive letters followed by skipping 1 letter: AB (skip C) DE (skip F) GH (skip I) JK (skip L) MN."
    },
    {
      id: "oir_dde01_q39",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 39,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["statement_evaluation"],
      promptText: "Statement: 'Discipline in the armed forces is only necessary during active wartime.'",
      options: [
        { key: "1", text: "Always True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Absurd" }
      ],
      correctOption: "3",
      explanation: "Discipline is the foundational bedrock of military command 24/7/365 during peacetime training and combat alike. False."
    },
    {
      id: "oir_dde01_q40",
      source: "DDE",
      sourceBookletId: "oir-dde-01",
      sourceBookletName: "DDE OIR Practice Test 01",
      questionNumber: 40,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["military", "ranks"],
      promptText: "Colonel is to Army as Group Captain is to ——",
      options: [
        { key: "1", text: "Navy" },
        { key: "2", text: "Air Force" },
        { key: "3", text: "Coast Guard" },
        { key: "4", text: "Police" }
      ],
      correctOption: "2",
      explanation: "Group Captain is the equivalent rank in the Indian Air Force."
    }
  ]
};
