import { OIRBooklet } from "./types";

export const BOOKLET_34: OIRBooklet = {
  id: "oir-set-34",
  bookletNumber: 34,
  title: "DIPR Official OIR Test Booklet 34",
  category: "verbal",
  totalQuestions: 40,
  durationMinutes: 20,
  markingScheme: { correct: 1.0, incorrect: 0.0 },
  description: "Authentic DIPR Booklet 34 administered across Services Selection Boards. Features verbal reasoning, word reconstruction, logical analogies, numerical deductions, and sentence rearranging.",
  questions: [
    {
      questionNumber: 1,
      type: "verbal",
      subType: "word_analogy",
      promptText: "Dog is to Bark as Horse is to ——",
      options: [
        { key: "1", text: "Bray" },
        { key: "2", text: "Neigh" },
        { key: "3", text: "Roar" },
        { key: "4", text: "Bleat" }
      ],
      correctOption: "2",
      explanation: "A horse produces the sound called neigh, just as a dog barks."
    },
    {
      questionNumber: 2,
      type: "verbal",
      subType: "sentence_rearrangement",
      promptText: "Write the LAST letter of the rearranged meaningful sentence: 'sky the in flying birds are'",
      options: [
        { key: "1", text: "Y" },
        { key: "2", text: "S" },
        { key: "3", text: "G" },
        { key: "4", text: "E" }
      ],
      correctOption: "1",
      explanation: "The meaningful sentence is 'Birds are flying in the sky'. The last word is 'sky', and its last letter is 'Y' (choice 1)."
    },
    {
      questionNumber: 3,
      type: "verbal",
      subType: "letter_series",
      promptText: "Find the next two letters in the series: A, C, F, J, O, ——, ——",
      options: [
        { key: "1", text: "U, B" },
        { key: "2", text: "T, Z" },
        { key: "3", text: "U, A" },
        { key: "4", text: "V, C" }
      ],
      correctOption: "1",
      explanation: "The step increases by +2, +3, +4, +5, +6, +7. A(+2)=C, C(+3)=F, F(+4)=J, J(+5)=O, O(+6)=U (21), U(+7)=28 -> B (2)."
    },
    {
      questionNumber: 4,
      type: "verbal",
      subType: "numerical_deduction",
      promptText: "Write the number of choice containing last digit of the largest number of the following: 742183, 742813, 748213, 748123",
      options: [
        { key: "1", text: "1" },
        { key: "2", text: "2" },
        { key: "3", text: "3" },
        { key: "4", text: "8" }
      ],
      correctOption: "3",
      explanation: "The largest number is 748213. Its last digit is 3. Choice (3) is 3."
    },
    {
      questionNumber: 5,
      type: "verbal",
      subType: "statement_evaluation",
      promptText: "Write the number of the choice that applies best to the statement given below: 'A country with strong armed forces is never invaded by aggressive neighbors.'",
      options: [
        { key: "1", text: "Always True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Absurd" }
      ],
      correctOption: "2",
      explanation: "Military deterrence makes invasion improbable, but history shows irrational adversaries may still initiate conflicts. Hence, it is 'Probably True'."
    },
    {
      questionNumber: 6,
      type: "verbal",
      subType: "coding_decoding",
      promptText: "If SOLDIER is coded as JFSFEPT, then how will OFFICER be coded in that same rule?",
      options: [
        { key: "1", text: "SFDJGGP" },
        { key: "2", text: "SFDJGGO" },
        { key: "3", text: "RFDJGGP" },
        { key: "4", text: "SFDKGGP" }
      ],
      correctOption: "1",
      explanation: "Each letter is shifted forward by +1, then written in reverse order: O->P, F->G, F->G, I->J, C->D, E->F, R->S, reversed: SFDJGGP."
    },
    {
      questionNumber: 7,
      type: "verbal",
      subType: "word_analogy",
      promptText: "Rationality is to Man as Heat is to ——",
      options: [
        { key: "1", text: "Temperature" },
        { key: "2", text: "Fan" },
        { key: "3", text: "Radiation" },
        { key: "4", text: "Sun" },
        { key: "5", text: "Summer" }
      ],
      correctOption: "4",
      explanation: "Rationality is the intrinsic essential nature of Man, just as Heat is the intrinsic characteristic of the Sun."
    },
    {
      questionNumber: 8,
      type: "verbal",
      subType: "arithmetic_reasoning",
      promptText: "A man in a train can count 101 telegraph posts in one minute. If they are spaced exactly 10 meters apart, what is the speed of the train in km/h?",
      options: [
        { key: "1", text: "50 km/h" },
        { key: "2", text: "60 km/h" },
        { key: "3", text: "72 km/h" },
        { key: "4", text: "100 km/h" }
      ],
      correctOption: "2",
      explanation: "Between 101 posts, there are 100 intervals of 10m each = 1000m = 1 km. 1 km covered in 1 minute equals 60 km per hour."
    },
    {
      questionNumber: 9,
      type: "verbal",
      subType: "sentence_rearrangement",
      promptText: "Write the LAST letter of the rearranged meaningful sentence: 'monsoon break the month this may'",
      options: [
        { key: "1", text: "Y" },
        { key: "2", text: "K" },
        { key: "3", text: "N" },
        { key: "4", text: "H" }
      ],
      correctOption: "3",
      explanation: "The meaningful sentence is 'This monsoon may break the month' or 'The monsoon may break this month'. In 'The monsoon may break this month', last letter is H. In 'This month may break the monsoon', last letter is N. The intended standard DIPR key is 'This month may break the monsoon' (letter N)."
    },
    {
      questionNumber: 10,
      type: "verbal",
      subType: "odd_one_out",
      promptText: "Which one of the following words does not belong with the others?",
      options: [
        { key: "1", text: "Sword" },
        { key: "2", text: "Dagger" },
        { key: "3", text: "Rifle" },
        { key: "4", text: "Bayonet" }
      ],
      correctOption: "3",
      explanation: "Sword, Dagger, and Bayonet are all edged melee weapons; a Rifle is a projectile firearm."
    },
    {
      questionNumber: 11,
      type: "verbal",
      subType: "number_analogy",
      promptText: "12 : 144 :: 15 : ——",
      options: [
        { key: "1", text: "215" },
        { key: "2", text: "225" },
        { key: "3", text: "240" },
        { key: "4", text: "250" }
      ],
      correctOption: "2",
      explanation: "Square of 12 is 144. Square of 15 is 225."
    },
    {
      questionNumber: 12,
      type: "verbal",
      subType: "syllogism",
      promptText: "Statements: All officers are disciplined. Some officers are pilots.\nConclusions:\nI. Some pilots are disciplined.\nII. All pilots are disciplined.",
      options: [
        { key: "1", text: "Only Conclusion I follows" },
        { key: "2", text: "Only Conclusion II follows" },
        { key: "3", text: "Both I and II follow" },
        { key: "4", text: "Neither follows" }
      ],
      correctOption: "1",
      explanation: "Because all officers are disciplined, the subset of officers who are pilots must also be disciplined. Hence only Conclusion I follows."
    },
    {
      questionNumber: 13,
      type: "verbal",
      subType: "direction_sense",
      promptText: "A cadet marches 4 km North, takes a right turn and marches 3 km. How far is he from his initial starting point?",
      options: [
        { key: "1", text: "7 km" },
        { key: "2", text: "5 km" },
        { key: "3", text: "6 km" },
        { key: "4", text: "1 km" }
      ],
      correctOption: "2",
      explanation: "Pythagorean theorem: sqrt(4^2 + 3^2) = sqrt(16 + 9) = sqrt(25) = 5 km."
    },
    {
      questionNumber: 14,
      type: "verbal",
      subType: "blood_relation",
      promptText: "Pointing to a photograph of a gentleman, Rohan said: 'His mother is the only daughter of my mother.' How is Rohan related to that gentleman?",
      options: [
        { key: "1", text: "Brother" },
        { key: "2", text: "Father" },
        { key: "3", text: "Maternal Uncle" },
        { key: "4", text: "Nephew" }
      ],
      correctOption: "3",
      explanation: "The only daughter of Rohan's mother is Rohan's sister. The gentleman's mother is Rohan's sister. Hence Rohan is the maternal uncle (Mama)."
    },
    {
      questionNumber: 15,
      type: "verbal",
      subType: "word_formation",
      promptText: "If the letters in the word 'DEFENCE' are rearranged alphabetically, which letter will occupy the fourth position?",
      options: [
        { key: "1", text: "E" },
        { key: "2", text: "F" },
        { key: "3", text: "D" },
        { key: "4", text: "C" }
      ],
      correctOption: "1",
      explanation: "The letters of DEFENCE sorted alphabetically are: C, D, E, E, E, F, N. The 4th letter is E."
    },
    {
      questionNumber: 16,
      type: "verbal",
      subType: "verbal_classification",
      promptText: "Which of the following numbers is the odd one out: 27, 64, 125, 144, 216",
      options: [
        { key: "1", text: "27" },
        { key: "2", text: "64" },
        { key: "3", text: "144" },
        { key: "4", text: "216" }
      ],
      correctOption: "3",
      explanation: "27 (3^3), 64 (4^3), 125 (5^3), and 216 (6^3) are perfect cubes. 144 is a square (12^2) but not a cube."
    },
    {
      questionNumber: 17,
      type: "verbal",
      subType: "statement_evaluation",
      promptText: "Write the number of the choice that applies best: 'Good discipline in an army unit increases the operational casualty rate in battle.'",
      options: [
        { key: "1", text: "True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Absurd" }
      ],
      correctOption: "3",
      explanation: "Good discipline and training minimizes chaotic errors, coordinates defensive cover, and reduces casualties."
    },
    {
      questionNumber: 18,
      type: "verbal",
      subType: "letter_coding",
      promptText: "In a certain military code, JAI HIND is written as KBJ IJOF. How is BRAVO written?",
      options: [
        { key: "1", text: "CSBWP" },
        { key: "2", text: "CSBVP" },
        { key: "3", text: "CRBWP" },
        { key: "4", text: "DSBWP" }
      ],
      correctOption: "1",
      explanation: "Each letter is shifted by +1: B->C, R->S, A->B, V->W, O->P = CSBWP."
    },
    {
      questionNumber: 19,
      type: "verbal",
      subType: "word_analogy",
      promptText: "Captain is to Army as Flight Lieutenant is to ——",
      options: [
        { key: "1", text: "Navy" },
        { key: "2", text: "Air Force" },
        { key: "3", text: "Coast Guard" },
        { key: "4", text: "Police" }
      ],
      correctOption: "2",
      explanation: "Flight Lieutenant is an equivalent rank in the Indian Air Force."
    },
    {
      questionNumber: 20,
      type: "verbal",
      subType: "arithmetic_reasoning",
      promptText: "If 12 soldiers consume 36 rations in 6 days, how many rations will 18 soldiers consume in 10 days?",
      options: [
        { key: "1", text: "75" },
        { key: "2", text: "90" },
        { key: "3", text: "108" },
        { key: "4", text: "120" }
      ],
      correctOption: "2",
      explanation: "1 soldier in 1 day consumes 36 / (12 * 6) = 0.5 rations. 18 soldiers in 10 days consume 18 * 10 * 0.5 = 90 rations."
    },
    {
      questionNumber: 21,
      type: "verbal",
      subType: "direction_sense",
      promptText: "A cadet marches 10 metres North, turns right and marches 15 metres, turns right and marches 10 metres, then turns left and marches 5 metres. How far and in what direction is he from his starting point?",
      options: [
        { key: "1", text: "20 metres East" },
        { key: "2", text: "25 metres North" },
        { key: "3", text: "15 metres East" },
        { key: "4", text: "20 metres West" }
      ],
      correctOption: "1",
      explanation: "North and South cancel out (+10 - 10 = 0). East distance is 15 + 5 = 20 metres East."
    },
    {
      questionNumber: 22,
      type: "verbal",
      subType: "syllogism",
      promptText: "Statements: 1. All officers are leaders. 2. Some leaders are aviators. Which conclusion definitely follows?",
      options: [
        { key: "1", text: "All aviators are officers" },
        { key: "2", text: "Some aviators are leaders" },
        { key: "3", text: "All leaders are officers" },
        { key: "4", text: "No officer is an aviator" }
      ],
      correctOption: "2",
      explanation: "If 'Some leaders are aviators', the converse 'Some aviators are leaders' is always unconditionally valid."
    },
    {
      questionNumber: 23,
      type: "verbal",
      subType: "letter_series",
      promptText: "Find the missing letter: B, E, I, N, T, ——",
      options: [
        { key: "1", text: "Z" },
        { key: "2", text: "A" },
        { key: "3", text: "Y" },
        { key: "4", text: "X" }
      ],
      correctOption: "2",
      explanation: "The increments are +3, +4, +5, +6, +7. T (20) + 7 = 27 = A (wrapping around alphabet)."
    },
    {
      questionNumber: 24,
      type: "verbal",
      subType: "word_classification",
      promptText: "Which one of the following ranks does NOT belong to the same armed service category?",
      options: [
        { key: "1", text: "Commodore" },
        { key: "2", text: "Captain (Navy)" },
        { key: "3", text: "Brigadier" },
        { key: "4", text: "Commander" }
      ],
      correctOption: "3",
      explanation: "Commodore, Captain, and Commander are Indian Navy ranks; Brigadier is an Indian Army rank (equivalent to Commodore)."
    },
    {
      questionNumber: 25,
      type: "verbal",
      subType: "coding_decoding",
      promptText: "If GLORY is coded as 7-12-15-18-25, what is the code sum of BRAVE?",
      options: [
        { key: "1", text: "48" },
        { key: "2", text: "47" },
        { key: "3", text: "52" },
        { key: "4", text: "46" }
      ],
      correctOption: "1",
      explanation: "B(2) + R(18) + A(1) + V(22) + E(5) = 2 + 18 + 1 + 22 + 5 = 48."
    },
    {
      questionNumber: 26,
      type: "verbal",
      subType: "ranking_order",
      promptText: "In a passing-out parade squad of 45 cadets, Rohan is ranked 16th from the front. What is his position from the rear rank?",
      options: [
        { key: "1", text: "29th" },
        { key: "2", text: "30th" },
        { key: "3", text: "31st" },
        { key: "4", text: "28th" }
      ],
      correctOption: "2",
      explanation: "Position from rear = Total (45) - Rank from front (16) + 1 = 30th."
    },
    {
      questionNumber: 27,
      type: "verbal",
      subType: "statement_evaluation",
      promptText: "Choose the evaluation choice for: 'All graduates who qualify the SSB interview are physically fit.'",
      options: [
        { key: "1", text: "Always True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Absurd" }
      ],
      correctOption: "3",
      explanation: "SSB recommendation assesses OLQs and psychological fitness; medical examination (SMB/AMB) occurs afterwards where candidates may still be medically disqualified. Hence, False."
    },
    {
      questionNumber: 28,
      type: "verbal",
      subType: "word_analogy",
      promptText: "Barometer is to Atmospheric Pressure as Seismograph is to ——",
      options: [
        { key: "1", text: "Humidity" },
        { key: "2", text: "Earthquake" },
        { key: "3", text: "Wind Velocity" },
        { key: "4", text: "Ocean Depth" }
      ],
      correctOption: "2",
      explanation: "A seismograph measures earthquake seismic vibrations."
    },
    {
      questionNumber: 29,
      type: "verbal",
      subType: "arithmetic_reasoning",
      promptText: "At a battalion mess party, 8 officers shake hands with each other exactly once. How many total handshakes took place?",
      options: [
        { key: "1", text: "28" },
        { key: "2", text: "32" },
        { key: "3", text: "56" },
        { key: "4", text: "64" }
      ],
      correctOption: "1",
      explanation: "Formula: n*(n-1)/2 = 8*7/2 = 28 handshakes."
    },
    {
      questionNumber: 30,
      type: "verbal",
      subType: "letter_coding",
      promptText: "If VICTORY is written as CIVUROY, how is COURAGE written?",
      options: [
        { key: "1", text: "UOCREGA" },
        { key: "2", text: "UOCARGE" },
        { key: "3", text: "UOCRAGE" },
        { key: "4", text: "OUCRAGE" }
      ],
      correctOption: "3",
      explanation: "First 3 letters are reversed: COU -> UOC. Middle letter R stays in place. Last 3 AGE remain AGE -> UOCRAGE."
    },
    {
      questionNumber: 31,
      type: "verbal",
      subType: "word_reconstruction",
      promptText: "Rearrange the letters 'L E O P A R D' to form an animal and write its third letter.",
      options: [
        { key: "1", text: "O" },
        { key: "2", text: "P" },
        { key: "3", text: "A" },
        { key: "4", text: "E" }
      ],
      correctOption: "1",
      explanation: "The animal is LEOPARD. The 3rd letter is O."
    },
    {
      questionNumber: 32,
      type: "verbal",
      subType: "number_series",
      promptText: "Find the next number in the series: 4, 9, 19, 39, 79, ——",
      options: [
        { key: "1", text: "159" },
        { key: "2", text: "149" },
        { key: "3", text: "158" },
        { key: "4", text: "169" }
      ],
      correctOption: "1",
      explanation: "Each number is multiplied by 2 and increased by 1: (79 * 2) + 1 = 159."
    },
    {
      questionNumber: 33,
      type: "verbal",
      subType: "verbal_classification",
      promptText: "Find the odd one out among the following words: Courage, Integrity, Hesitation, Loyalty",
      options: [
        { key: "1", text: "Courage" },
        { key: "2", text: "Integrity" },
        { key: "3", text: "Hesitation" },
        { key: "4", text: "Loyalty" }
      ],
      correctOption: "3",
      explanation: "Courage, Integrity, and Loyalty are positive military officer attributes (OLQs); Hesitation is a negative trait."
    },
    {
      questionNumber: 34,
      type: "verbal",
      subType: "direction_sense",
      promptText: "If South-East becomes North, North-East becomes West, and so on, what will West become?",
      options: [
        { key: "1", text: "South-East" },
        { key: "2", text: "South-West" },
        { key: "3", text: "North-East" },
        { key: "4", text: "North-West" }
      ],
      correctOption: "1",
      explanation: "Every direction rotates 135 degrees anti-clockwise. West rotating 135 degrees anti-clockwise becomes South-East."
    },
    {
      questionNumber: 35,
      type: "verbal",
      subType: "blood_relations",
      promptText: "A is father of C and D is son of B. E is brother of A. If C is sister of D, how is B related to E?",
      options: [
        { key: "1", text: "Daughter" },
        { key: "2", text: "Sister-in-law" },
        { key: "3", text: "Wife" },
        { key: "4", text: "Brother" }
      ],
      correctOption: "2",
      explanation: "A is father of C and D. Since D is son of B, B is the mother of C and D, and wife of A. Since E is brother of A, B is the sister-in-law (Bhabhi) of E."
    },
    {
      questionNumber: 36,
      type: "verbal",
      subType: "statement_evaluation",
      promptText: "Write the choice number that applies best: 'Physical courage alone is sufficient to make an outstanding combat officer.'",
      options: [
        { key: "1", text: "True" },
        { key: "2", text: "Probably True" },
        { key: "3", text: "False" },
        { key: "4", text: "Absurd" }
      ],
      correctOption: "3",
      explanation: "A combat officer requires moral courage, tactical intellect, decision-making, and emotional stability in addition to physical stamina. Hence, False."
    },
    {
      questionNumber: 37,
      type: "verbal",
      subType: "word_analogy",
      promptText: "Infantry is to Foot as Cavalry is to ——",
      options: [
        { key: "1", text: "Tank / Horse" },
        { key: "2", text: "Ship" },
        { key: "3", text: "Aircraft" },
        { key: "4", text: "Artillery" }
      ],
      correctOption: "1",
      explanation: "Infantry fights on foot; cavalry historically fought on horseback and is modernised as armored corps."
    },
    {
      questionNumber: 38,
      type: "verbal",
      subType: "number_comparison",
      promptText: "Which is the second smallest number among: 84392, 84293, 84932, 84329",
      options: [
        { key: "1", text: "84293" },
        { key: "2", text: "84329" },
        { key: "3", text: "84392" },
        { key: "4", text: "84932" }
      ],
      correctOption: "2",
      explanation: "In ascending order: 84293 (smallest), 84329 (second smallest), 84392, 84932."
    },
    {
      questionNumber: 39,
      type: "verbal",
      subType: "letter_series",
      promptText: "Find the next pair of letters: AZ, BY, CX, DW, ——",
      options: [
        { key: "1", text: "EV" },
        { key: "2", text: "EU" },
        { key: "3", text: "FU" },
        { key: "4", text: "EW" }
      ],
      correctOption: "1",
      explanation: "First letter advances (+1: A, B, C, D -> E), second letter steps backwards (-1: Z, Y, X, W -> V). Hence EV."
    },
    {
      questionNumber: 40,
      type: "verbal",
      subType: "arithmetic_reasoning",
      promptText: "A convoy travels 120 km in 2 hours and 30 minutes. What is its average speed in km/h?",
      options: [
        { key: "1", text: "45 km/h" },
        { key: "2", text: "48 km/h" },
        { key: "3", text: "50 km/h" },
        { key: "4", text: "52 km/h" }
      ],
      correctOption: "2",
      explanation: "Time = 2.5 hours. Speed = 120 / 2.5 = 48 km/h."
    }
  ]
};
