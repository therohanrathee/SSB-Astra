import { OIRBooklet } from "./types";

export const BOOKLET_35: OIRBooklet = {
  id: "oir-set-35",
  source: "Authentic DIPR",
  bookletNumber: 35,
  title: "DIPR Official OIR Test Booklet 35 (Intelligence Test 4)",
  category: "non_verbal",
  totalQuestions: 40,
  durationMinutes: 17,
  markingScheme: { correct: 1.0, incorrect: 0.0 },
  boardLocations: ["1 AFSB Dehradun", "4 AFSB Varanasi", "11 SSB Allahabad", "24 SSB Bengaluru", "33 SSB Bhopal"],
  description: "Authentic 40-question DIPR Booklet 35 (INT TEST 4) administered across Indian Army, Air Force & Navy selection boards. Features cube group classification, cube comparison, word substitution, and spatial deduction.",
  questions: [
    {
      id: "oir_set35_q01",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 1,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification", "spatial"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "○ ○", left: "T T", right: "▷" } },
          { label: "A2", faces: { top: "+ +", left: "= -", right: "○" } },
          { label: "A3", faces: { top: "□", left: "+", right: "x x" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "△ △", left: "x x", right: "○ ○" } },
          { label: "B2", faces: { top: "≡", left: "□ □", right: "||" } },
          { label: "B3", faces: { top: "x x", left: "S S", right: "△ △" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "x x", left: "▷ ▷", right: "o o" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "S S", left: "x x", right: "o o" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "+ +", left: "□", right: "N" }
        }
      ],
      correctOption: "1",
      explanation: "Group A consists of asymmetric directional element configurations, while Group B cubes feature repeated double symmetric shapes. Cube 1 conforms to Group A."
    },
    {
      id: "oir_set35_q02",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 2,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification", "spatial"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "∞", left: "⇦", right: "T" } },
          { label: "A2", faces: { top: "⌂", left: "†", right: "†" } },
          { label: "A3", faces: { top: "+", left: "⊖", right: "†" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "✕", left: "⋈", right: "θ" } },
          { label: "B2", faces: { top: "✢", left: "θ", right: "✕" } },
          { label: "B3", faces: { top: "∞", left: "✕", right: "✕" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "✕", left: "R", right: "θ" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "✕", left: "✕", right: "✕" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "✕", left: "∞", right: "†" }
        }
      ],
      correctOption: "3",
      explanation: "Group A cubes contain cross/dagger and arrow orientations without the closed Greek symbol 'θ'. Cube 3 preserves Group A symbol rules."
    },
    {
      id: "oir_set35_q03",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 3,
      type: "verbal",
      subType: "number_comparison",
      difficulty: "easy",
      tags: ["numbers", "comparison"],
      promptText: "Write the number of choice containing last digit of the smallest number of the following: 564321, 365214, 615342, 146235",
      options: [
        { key: "1", text: "5" },
        { key: "2", text: "2" },
        { key: "3", text: "1" },
        { key: "4", text: "4" }
      ],
      correctOption: "1",
      explanation: "The smallest number among the four is 146235. Its last digit is 5. Choice (1) is 5."
    },
    {
      id: "oir_set35_q04",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 4,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "✉", left: "→", right: "" } },
        cubeB: { label: "Cube 2", faces: { top: "—", left: "▽", right: "↓" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "The two cubes have distinct top and side symbols that cannot be aligned by rigid 3D rotation."
    },
    {
      id: "oir_set35_q05",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 5,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "medium",
      tags: ["statement_evaluation", "logic"],
      promptText: "Write the number of choice that applies best to the statement given below: 'An efficient management initiates labour-strikes, and later on works against them to make them a success.'",
      options: [
        { key: "1", text: "True" },
        { key: "2", text: "Probably" },
        { key: "3", text: "False" },
        { key: "4", text: "Abrupt" }
      ],
      correctOption: "3",
      explanation: "An efficient management actively works to prevent industrial unrest and resolve grievances, never self-sabotaging operations. Hence False."
    },
    {
      id: "oir_set35_q06",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 6,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "✕", left: "✕", right: "●" } },
        cubeB: { label: "Cube 2", faces: { top: "✕", left: "✕", right: "✕" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "Cube 1 has a dotted/textured face while Cube 2 has only cross patterns."
    },
    {
      id: "oir_set35_q07",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 7,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["civics", "constitution"],
      promptText: "The underlined statement has four reasons for its justification. Write the serial number of the reason you think correct: 'India is a secular state because:-'",
      options: [
        { key: "1", text: "The President of the country lives in seclusion." },
        { key: "2", text: "There is full freedom of speech and writing." },
        { key: "3", text: "Indian Government has no religion and treats all religion at par." },
        { key: "4", text: "Indians are orthodox and God fearing men." }
      ],
      correctOption: "3",
      explanation: "Secularism in the Indian constitutional context means state neutrality towards all religions with equal respect and protection."
    },
    {
      id: "oir_set35_q08",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 8,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "▯", left: "8", right: "↗" } },
        cubeB: { label: "Cube 2", faces: { top: "✕", left: "▯", right: "S" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "The symbols across faces do not match under any rigid orientation."
    },
    {
      id: "oir_set35_q09",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 9,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "dice", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "• • •", left: "•••••", right: "•" } },
        cubeB: { label: "Cube 2", faces: { top: "••••", left: "•••", right: "•" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "Cube 1 shows faces 3, 5, 1; Cube 2 shows faces 4, 3, 1. Relative dot positioning differs from standard dice configuration."
    },
    {
      id: "oir_set35_q10",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 10,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "↑", left: "ɣ", right: "§" } },
        cubeB: { label: "Cube 2", faces: { top: "ɣ", left: "▽", right: "§" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "Rotating Cube 1 does not map the top arrow to an inverted triangle."
    },
    {
      id: "oir_set35_q11",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 11,
      type: "verbal",
      subType: "word_substitution",
      difficulty: "easy",
      tags: ["vocabulary", "synonym"],
      promptText: "A statement is given below in which one word is underlined. One of the choices can replace the underlined word without changing the sense: 'Repair this shirt in the best possible way.'",
      options: [
        { key: "1", text: "Sew" },
        { key: "2", text: "Shoe" },
        { key: "3", text: "Couple" },
        { key: "4", text: "Mend" }
      ],
      correctOption: "4",
      explanation: "'Mend' means to repair clothing or fabric without altering the meaning."
    },
    {
      id: "oir_set35_q12",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 12,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "⇦", left: "♟", right: "↑" } },
          { label: "A2", faces: { top: "✉", left: "◩", right: "▼" } },
          { label: "A3", faces: { top: "⇦", left: "◀", right: "⇪" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "◪", left: "▽", right: "↗" } },
          { label: "B2", faces: { top: "✉", left: "●", right: "✕" } },
          { label: "B3", faces: { top: "◪", left: "↙", right: "▯" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "✕", left: "✕", right: "▯" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "⇦", left: "■", right: "8" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "✕", left: "♟", right: "□" }
        }
      ],
      correctOption: "2",
      explanation: "Group A cubes emphasize directional pointers on top; Cube 2 shares this characteristic."
    },
    {
      id: "oir_set35_q13",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 13,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "□", left: "↑", right: "▯" } },
        cubeB: { label: "Cube 2", faces: { top: "▱", left: "⇒", right: "▯" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "Top shape transitions from rectangle to parallelogram; hence not identical."
    },
    {
      id: "oir_set35_q14",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 14,
      type: "verbal",
      subType: "arithmetic_reasoning",
      difficulty: "hard",
      tags: ["math", "geometry", "speed"],
      promptText: "The perimeter of a square is equal to the distance which a horse can run in three minutes. The speed of the horse is 20 miles per hour. The length in yards of the side of the square is:-",
      options: [
        { key: "1", text: "3520" },
        { key: "2", text: "440" },
        { key: "3", text: "1760" },
        { key: "4", text: "880" }
      ],
      correctOption: "2",
      explanation: "Distance run in 3 mins = 20 * (3/60) = 1 mile = 1760 yards. Perimeter of square = 4 * side = 1760 yards. Side = 1760 / 4 = 440 yards."
    },
    {
      id: "oir_set35_q15",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 15,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "+", left: "+", right: "✕" } },
          { label: "A2", faces: { top: "✕", left: "+", right: "✕" } },
          { label: "A3", faces: { top: "✕", left: "✕", right: "✕" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "✕", left: "+", right: "✕" } },
          { label: "B2", faces: { top: "+", left: "✕", right: "✕" } },
          { label: "B3", faces: { top: "+", left: "✕", right: "+" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "✕", left: "✕", right: "✕" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "+", left: "+", right: "✕" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "+", left: "✕", right: "✕" }
        }
      ],
      correctOption: "1",
      explanation: "Analyzing the alternation parity between cross and plus symbols determines Group A membership."
    },
    {
      id: "oir_set35_q16",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 16,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "◪", left: "⌂", right: "●" } },
          { label: "A2", faces: { top: "∞", left: "☘", right: "▯" } },
          { label: "A3", faces: { top: "✕", left: "⌂", right: "●" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "⇦", left: "⌕", right: "✕" } },
          { label: "B2", faces: { top: "◪", left: "☘", right: "✕" } },
          { label: "B3", faces: { top: "⇦", left: "▽", right: "▯" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "✕", left: "⌂", right: "●" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "⇦", left: "⌕", right: "✕" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "◪", left: "▽", right: "▯" }
        }
      ],
      correctOption: "1",
      explanation: "Group A preserves solid circle dot markers on the right face."
    },
    {
      id: "oir_set35_q17",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 17,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["proverbs", "comprehension"],
      promptText: "A proverb with four possible meanings is given below. Write the serial number of meaning which you regard as correct: 'The darkest hour precedes the dawn'",
      options: [
        { key: "1", text: "One has more dreams in the darkest hour." },
        { key: "2", text: "There is no end to human miseries." },
        { key: "3", text: "Every night ends in a day." },
        { key: "4", text: "Dark night is better than a bright dawn." }
      ],
      correctOption: "3",
      explanation: "The proverb signifies that the worst phase of hardship is immediately followed by relief and hope ('every night ends in a day')."
    },
    {
      id: "oir_set35_q18",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 18,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "◇", left: "□", right: "▯" } },
          { label: "A2", faces: { top: "□", left: "◇", right: "▯" } },
          { label: "A3", faces: { top: "□", left: "◇", right: "□" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "△", left: "△", right: "△" } },
          { label: "B2", faces: { top: "△", left: "△", right: "△" } },
          { label: "B3", faces: { top: "△", left: "△", right: "△" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "○○", left: "△", right: "△" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "◇", left: "▼", right: "▯" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "◇", left: "▲", right: "□" }
        }
      ],
      correctOption: "2",
      explanation: "Group A cubes are composed of quadrilateral geometric shapes (diamonds and squares)."
    },
    {
      id: "oir_set35_q19",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 19,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "≡", left: "8", right: "◁" } },
        cubeB: { label: "Cube 2", faces: { top: "∞", left: "日", right: "◁" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "Cube 1 shows three horizontal bars and digit 8, whereas Cube 2 has infinity and grid window."
    },
    {
      id: "oir_set35_q20",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 20,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "○", left: "▼", right: "◐" } },
          { label: "A2", faces: { top: "●", left: "◐", right: "▯" } },
          { label: "A3", faces: { top: "●", left: "▭", right: "▲" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "⊖", left: "A", right: "目" } },
          { label: "B2", faces: { top: "△", left: "⊘", right: "目" } },
          { label: "B3", faces: { top: "▱", left: "日", right: "○" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "□", left: "●", right: "|" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "⊖", left: "A", right: "目" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "◐", left: "中", right: "✕" }
        }
      ],
      correctOption: "1",
      explanation: "Group A cubes emphasize filled solid circles and solid geometric shading."
    },
    {
      id: "oir_set35_q21",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 21,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "letter_cubes"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "A", left: "B", right: "CD" } },
          { label: "A2", faces: { top: "C", left: "DA", right: "E" } },
          { label: "A3", faces: { top: "DE", left: "F", right: "G" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "JK", left: "HI", right: "O" } },
          { label: "B2", faces: { top: "O", left: "KL", right: "M" } },
          { label: "B3", faces: { top: "PQ", left: "O", right: "NP" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "LM", left: "JK", right: "CD" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "OP", left: "N", right: "P" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "MN", left: "NO", right: "HI" }
        }
      ],
      correctOption: "1",
      explanation: "Group A features first-half English alphabet characters (A to G), while Group B features second-half letters."
    },
    {
      id: "oir_set35_q22",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 22,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["statement_evaluation"],
      promptText: "Write the number of choice that applies best to the statement given below: 'A milky sky reminds one of the milk which one gets from the sky for the milk bottle.'",
      options: [
        { key: "1", text: "True" },
        { key: "2", text: "Probably" },
        { key: "3", text: "False" },
        { key: "4", text: "Abrupt" }
      ],
      correctOption: "3",
      explanation: "Milk is produced by dairy cattle and mammals, not delivered from the atmospheric sky. Hence False."
    },
    {
      id: "oir_set35_q23",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 23,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "✉", left: "△", right: "◇" } },
        cubeB: { label: "Cube 2", faces: { top: "✉", left: "✱", right: "△" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "Different symbols on the remaining visible faces."
    },
    {
      id: "oir_set35_q24",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 24,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "⇉", left: "⇗", right: "✕" } },
        cubeB: { label: "Cube 2", faces: { top: "✕", left: "⇗", right: "" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "Yes",
      explanation: "Rotating Cube 1 upwards places the cross face on the top and diagonal arrow in correct relative coordinate position."
    },
    {
      id: "oir_set35_q25",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 25,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["proverbs"],
      promptText: "A proverb with four possible meanings is given below. Write the serial number of meaning which you regard as correct: 'A rolling stone gathers no moss'",
      options: [
        { key: "1", text: "A true-coat rarely enjoys reputation." },
        { key: "2", text: "A rolling stone has no moss." },
        { key: "3", text: "Mossy stone are always good." },
        { key: "4", text: "Gathered moss turns into stones." }
      ],
      correctOption: "1",
      explanation: "Metaphorically, an unstable person who continuously switches pursuits rarely consolidates an established reputation or stability."
    },
    {
      id: "oir_set35_q26",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 26,
      type: "non_verbal",
      subType: "cube_comparison",
      difficulty: "medium",
      tags: ["cubes", "comparison"],
      promptText: "Find if the two cubes are alike. Write 'Yes' or 'No' on the answer sheet.",
      figures: {
        type: "cubes_compare",
        cubeA: { label: "Cube 1", faces: { top: "▨", left: "▦", right: "" } },
        cubeB: { label: "Cube 2", faces: { top: "回", left: "■", right: "" } }
      },
      options: [
        { key: "Yes", text: "Yes" },
        { key: "No", text: "No" }
      ],
      correctOption: "No",
      explanation: "Hatching patterns are completely distinct (diagonal mesh vs concentric square)."
    },
    {
      id: "oir_set35_q27",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 27,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "□ ○", left: "●", right: "▥" } },
          { label: "A2", faces: { top: "▲ ▲", left: "▲", right: "○" } },
          { label: "A3", faces: { top: "○ ○", left: "▦", right: "◁" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "●", left: "△ △", right: "○" } },
          { label: "B2", faces: { top: "△ △", left: "▲", right: "▯" } },
          { label: "B3", faces: { top: "○ ○", left: "▯", right: "●" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "○ ○", left: "▲", right: "◁" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "○ △", left: "○ △", right: "△" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "▨", left: "△ △", right: "||" }
        }
      ],
      correctOption: "1",
      explanation: "Group A preserves paired shapes across the top face with open arrows in right view."
    },
    {
      id: "oir_set35_q28",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 28,
      type: "verbal",
      subType: "word_substitution",
      difficulty: "easy",
      tags: ["vocabulary", "synonym"],
      promptText: "A statement is given below in which one word is underlined. One of these can replace the underlined word without changing the sense: 'He advice to hate the immoral person.'",
      options: [
        { key: "1", text: "Mice" },
        { key: "2", text: "Detest" },
        { key: "3", text: "Resist" },
        { key: "4", text: "Rebel" }
      ],
      correctOption: "2",
      explanation: "'Detest' is a direct synonym for intense dislike or hate."
    },
    {
      id: "oir_set35_q29",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 29,
      type: "verbal",
      subType: "arithmetic_reasoning",
      difficulty: "medium",
      tags: ["math", "equations"],
      promptText: "Two inkpots cost as much as three books and seven books cost equal to three days wages of the labourer. His daily wage is 196 paise. The cost of one inkpot will be :-",
      options: [
        { key: "1", text: "198 paise" },
        { key: "2", text: "120 paise" },
        { key: "3", text: "14 paise" },
        { key: "4", text: "126 paise" }
      ],
      correctOption: "4",
      explanation: "3 days wages = 3 * 196 = 588 paise. 7 books = 588 paise -> 1 book = 84 paise. 3 books = 3 * 84 = 252 paise. 2 inkpots = 252 paise -> 1 inkpot = 126 paise."
    },
    {
      id: "oir_set35_q30",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 30,
      type: "verbal",
      subType: "word_substitution",
      difficulty: "easy",
      tags: ["vocabulary", "synonym"],
      promptText: "A statement is given below in which one word is underlined. One of these can replace the underlined word without changing the sense: 'He shall make adequate arrangement, for your departure.'",
      options: [
        { key: "1", text: "Accurate" },
        { key: "2", text: "Sufficient" },
        { key: "3", text: "Alike" },
        { key: "4", text: "Against" }
      ],
      correctOption: "2",
      explanation: "'Adequate' means sufficient or satisfactory for a particular requirement."
    },
    {
      id: "oir_set35_q31",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 31,
      type: "verbal",
      subType: "arithmetic_reasoning",
      difficulty: "medium",
      tags: ["clocks", "angles"],
      promptText: "It is 3:00 PM by a clock. Its hand moved by 90 degrees in clock wise direction. The estimate of time approximately will be:-",
      options: [
        { key: "1", text: "12:45 AM" },
        { key: "2", text: "3:50 AM" },
        { key: "3", text: "6:15 PM" },
        { key: "4", text: "9:15 PM" }
      ],
      correctOption: "3",
      explanation: "3 hours on the clock dial corresponds to (3/12) * 360 = 90 degrees. Advancing 90 degrees moves from 3:00 to approximately 6:00 to 6:15 PM."
    },
    {
      id: "oir_set35_q32",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 32,
      type: "non_verbal",
      subType: "cube_group_classification",
      difficulty: "medium",
      tags: ["cubes", "group_classification"],
      promptText: "Which of the following can possibly belong to group A?",
      figures: {
        type: "cubes_group",
        groupA: [
          { label: "A1", faces: { top: "△", left: "□", right: "○" } },
          { label: "A2", faces: { top: "◎", left: "◎", right: "□" } },
          { label: "A3", faces: { top: "△", left: "✚", right: "◎" } }
        ],
        groupB: [
          { label: "B1", faces: { top: "○", left: "□", right: "△" } },
          { label: "B2", faces: { top: "△", left: "△", right: "△" } },
          { label: "B3", faces: { top: "○", left: "○", right: "○" } }
        ]
      },
      options: [
        {
          key: "1",
          text: "Cube 1",
          cubeFaces: { top: "▨", left: "△", right: "○" }
        },
        {
          key: "2",
          text: "Cube 2",
          cubeFaces: { top: "△", left: "■", right: "○" }
        },
        {
          key: "3",
          text: "Cube 3",
          cubeFaces: { top: "□", left: "△", right: "8" }
        }
      ],
      correctOption: "2",
      explanation: "Group A cubes feature concentric target rings and triangle faces in combination."
    },
    {
      id: "oir_set35_q33",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 33,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical_order"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "Trophy" },
        { key: "2", text: "Vertex" },
        { key: "3", text: "Ulterior" },
        { key: "4", text: "Rabbit" }
      ],
      correctOption: "2",
      explanation: "Alphabetical sequence: Rabbit (R) -> Trophy (T) -> Ulterior (U) -> Vertex (V). Last word is Vertex (2)."
    },
    {
      id: "oir_set35_q34",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 34,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical_order"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "Jaw" },
        { key: "2", text: "Jerk" },
        { key: "3", text: "Junior" },
        { key: "4", text: "Juice" }
      ],
      correctOption: "3",
      explanation: "Jaw -> Jerk -> Juice (J-U-I) -> Junior (J-U-N). Last word is Junior (3)."
    },
    {
      id: "oir_set35_q35",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 35,
      type: "verbal",
      subType: "number_comparison",
      difficulty: "medium",
      tags: ["number_series", "observation"],
      promptText: "How many 4's come just after 9 in the following numbers? 4 9 4 3 9 2 4 9 1 2 9 4 5 7 3 8 9 3 2 1 4 9 4 1 9 4 3 4 9",
      options: [
        { key: "1", text: "2" },
        { key: "2", text: "5" },
        { key: "3", text: "6" },
        { key: "4", text: "4" }
      ],
      correctOption: "4",
      explanation: "Scan for the pair '94': (1) ...4[94]3..., (2) ...2[94]5..., (3) ...14[94]1..., (4) ...1[94]3... Total occurrences = 4."
    },
    {
      id: "oir_set35_q36",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 36,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical_order"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "Spider" },
        { key: "2", text: "Depart" },
        { key: "3", text: "Label" },
        { key: "4", text: "Budget" }
      ],
      correctOption: "1",
      explanation: "Budget (B) -> Depart (D) -> Label (L) -> Spider (S). Last is Spider (1)."
    },
    {
      id: "oir_set35_q37",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 37,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical_order"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "Zone" },
        { key: "2", text: "Yell" },
        { key: "3", text: "Omen" },
        { key: "4", text: "Marshal" }
      ],
      correctOption: "1",
      explanation: "Marshal (M) -> Omen (O) -> Yell (Y) -> Zone (Z). Last is Zone (1)."
    },
    {
      id: "oir_set35_q38",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 38,
      type: "verbal",
      subType: "statement_evaluation",
      difficulty: "easy",
      tags: ["health", "statement_evaluation"],
      promptText: "Physical exercise is very important for human beings because:-",
      options: [
        { key: "1", text: "It keeps the body fit." },
        { key: "2", text: "It kills some spare time which a man otherwise uses profitably." },
        { key: "3", text: "It creates fear in minds of others about physical strength." },
        { key: "4", text: "One can never feel hungry without physical exercise." }
      ],
      correctOption: "1",
      explanation: "Physical exercise maintains cardiovascular health, muscle tone, and overall physical endurance ('keeps the body fit')."
    },
    {
      id: "oir_set35_q39",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 39,
      type: "verbal",
      subType: "word_analogy",
      difficulty: "easy",
      tags: ["dictionary", "alphabetical_order"],
      promptText: "Write the number of the word which will come LAST in the dictionary:",
      options: [
        { key: "1", text: "Wicket" },
        { key: "2", text: "Homage" },
        { key: "3", text: "Ugly" },
        { key: "4", text: "Quack" }
      ],
      correctOption: "1",
      explanation: "Homage (H) -> Quack (Q) -> Ugly (U) -> Wicket (W). Last word is Wicket (1)."
    },
    {
      id: "oir_set35_q40",
      source: "Authentic DIPR",
      sourceBookletId: "oir-set-35",
      sourceBookletName: "DIPR Official Booklet 35",
      questionNumber: 40,
      type: "verbal",
      subType: "arithmetic_reasoning",
      difficulty: "medium",
      tags: ["math", "arithmetic"],
      promptText: "A gave a ten rupees note to a bearer to be charged for two ice-creams costing 95 paise each. After paying a tip to the bearer he had only seven rupees and twenty paise left. The tip given to the bearer was :-",
      options: [
        { key: "1", text: "135 paise" },
        { key: "2", text: "90 paise" },
        { key: "3", text: "25 paise" },
        { key: "4", text: "86 paise" }
      ],
      correctOption: "2",
      explanation: "Total money = 1000 paise. Cost of 2 ice-creams = 2 * 95 = 190 paise. Balance left = 720 paise. Total spent = 1000 - 720 = 280 paise. Tip = 280 - 190 = 90 paise."
    }
  ]
};
