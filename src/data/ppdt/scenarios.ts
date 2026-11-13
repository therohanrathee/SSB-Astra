import { PPDTScenario } from "./types";

export const PPDT_SCENARIOS: PPDTScenario[] = [
  {
    id: "ppdt-01",
    number: 1,
    title: "Campus Notice Board / Announcement Gathering",
    category: "Academic & Institutional Life",
    imagePath: "/images/ppdt/ppdt-01-notice-board.webp",
    description:
      "A cluster of college students gathered eagerly around an indoor institutional notice board reviewing pinned notifications and lists.",
    diprAmbiguity: "Medium",
    expectedCharacters: {
      countRange: "4 to 6 characters",
      typicalRoles: ["College students", "Aspirants", "Peer study group", "Club organizers"],
      typicalAge: "20 to 24 years"
    },
    validPerspectives: [
      {
        id: "p1-a",
        name: "Perspective A: Technical Hackathon / Symposium Organization",
        coreTheme: "Organizing an inter-college technical fest, hackathon, or project exhibition.",
        visualCuesUsed: "Document circular on notice board, group of energetic young students discussing details.",
        validRoles: ["Technical club president", "Student organizers", "Project teammates"],
        actionFocus: "Delegating club roles, booking campus auditoriums, coordinating sponsorship and jury panels.",
        acceptableVariations: [
          "Organizing an annual green energy innovation contest",
          "Forming a multidisciplinary robotics team for a state hackathon"
        ]
      },
      {
        id: "p1-b",
        name: "Perspective B: Defense / Competitive Exam Result & Peer Study Circle",
        coreTheme: "Reviewing CDS/AFCAT/GATE entrance results and structuring a peer support group for interviews.",
        visualCuesUsed: "Students intently checking a published merit list with mixed focused expressions.",
        validRoles: ["Successful candidate", "Batchmates", "Study circle coordinator"],
        actionFocus: "Analyzing results, counseling peers who missed cutoff, organizing collective mock interviews and fitness drills.",
        acceptableVariations: [
          "Forming an SSB screening preparation collective on campus",
          "Coordinating evening group study for technical civil service options"
        ]
      },
      {
        id: "p1-c",
        name: "Perspective C: Social Outreach & NCC Blood Donation Camp",
        coreTheme: "Coordinating a campus-wide blood donation or social welfare drive announced on the board.",
        visualCuesUsed: "Large prominent poster notice, students reading instructions in college hallway.",
        validRoles: ["NSS/NCC cadet leader", "Student welfare volunteers"],
        actionFocus: "Partnering with district Red Cross hospital, registering donor students, setting up hydration stations.",
        acceptableVariations: [
          "Organizing a disaster relief collection drive for flood victims",
          "Campus environmental plastic-free drive"
        ]
      },
      {
        id: "p1-d",
        name: "Perspective D: Campus Placement Drive Preparation",
        coreTheme: "Notice announcing core engineering company visit; mobilizing students for aptitude drills.",
        visualCuesUsed: "Academic corridor setting, students reviewing company eligibility criteria.",
        validRoles: ["Placement representative", "Batch students"],
        actionFocus: "Organizing resume review workshops, peer mock coding tests, and technical seminar sessions.",
        acceptableVariations: [
          "Arranging alumni interaction series for career guidance"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Academic fest/competition announcement",
        "Competitive exam result list & group preparation",
        "Campus social welfare / blood donation camp notice",
        "Placement drive or scholarship selection list"
      ],
      implausibleDistortions: [
        "Campus riot, violent student strike, or physical vandalism",
        "Accusing the college administration of malicious bribery or leaked papers",
        "Depicting a candidate committing suicide due to poor marks"
      ]
    },
    benchmarkThemes: [
      "Organizing an inter-college technical symposium or hackathon",
      "Forming a collaborative peer study group following entrance examination results",
      "Drafting an action plan for a campus social outreach / blood donation camp",
      "Coordinating placement drive preparation and mock interview sessions"
    ],
    antiPatterns: [
      "Depicting a candidate breaking down in tears due to failure",
      "Creating conflict or accusing college administration of cheating/corruption",
      "Passive onlooker who just walks away without taking any initiative"
    ],
    modelStory: {
      hero: "Aditya, 22 years, final year mechanical engineering student",
      action: "Organizing an inter-college green robotics competition",
      past: "Aditya noticed on the campus notice board that the annual state robotics hackathon dates had been declared, with registrations closing within three weeks.",
      present: "Taking initiative, Aditya convened his college technical club members, divided tasks into software coding, hardware assembly, and sponsor outreach, and coordinated with the lab in-charge for extended evening working hours.",
      future: "Under his organized leadership, the team designed an automated solar crop-monitoring rover, secured second place at the state symposium, and instituted an annual campus robotics mentorship program for juniors.",
      fullStory:
        "Aditya, a 22-year-old final year mechanical engineering student at Government Engineering College, noticed the state innovation hackathon circular posted on the main notice board. Realizing registrations closed in three weeks, he immediately assembled his batchmates. He analyzed the project guidelines, formed a 4-member multidisciplinary team, and liaised with the HOD for lab access after college hours. Working methodically over the next fortnight, they calibrated sensors and built a low-cost solar agricultural monitoring rover. The team presented their working prototype successfully, winning second place and inspiring juniors to pursue applied research."
    }
  },
  {
    id: "ppdt-02",
    number: 2,
    title: "Late-Night Focused Study & Research",
    category: "Academic Rigor & Innovation",
    imagePath: "/images/ppdt/ppdt-02-late-night-study.webp",
    description:
      "A solitary focused student seated at a study desk late at night under an illuminated desk lamp, surrounded by open reference textbooks and drafting notes.",
    diprAmbiguity: "Medium",
    expectedCharacters: {
      countRange: "1 character",
      typicalRoles: ["Research scholar", "Defense aspirant", "Engineering/Medical student", "Innovator"],
      typicalAge: "21 to 25 years"
    },
    validPerspectives: [
      {
        id: "p2-a",
        name: "Perspective A: Scientific Research Paper / Capstone Design",
        coreTheme: "Finalizing research calculations or patent documentation for an engineering project.",
        visualCuesUsed: "Dense open reference books, graphs/notes spread across table, intense solitary concentration.",
        validRoles: ["Engineering student", "Research intern"],
        actionFocus: "Verifying mathematical models, cross-checking test simulation anomalies, preparing submission draft.",
        acceptableVariations: [
          "Designing renewable energy inverter circuitry",
          "Authoring an aerospace aerodynamics paper for a conference"
        ]
      },
      {
        id: "p2-b",
        name: "Perspective B: Systematic Defense / Competitive Exam Preparation",
        coreTheme: "Targeted late-night error analysis and revision strategy for CDS/AFCAT/UPSC exam.",
        visualCuesUsed: "Study lamp spotlighting notes, notebook with pen in hand, time-table pinned on wall.",
        validRoles: ["Defense aspirant", "Graduate cadet"],
        actionFocus: "Analyzing previous test mistakes, solving high-difficulty numerical problems, consolidating summary flashcards.",
        acceptableVariations: [
          "Overcoming weak areas in advanced trigonometry and reasoning",
          "Preparing GS current affairs dossier before SSB reporting"
        ]
      },
      {
        id: "p2-c",
        name: "Perspective C: Software Debugging & Product Launch",
        coreTheme: "Debugging algorithmic code or platform architecture before client demo / competition.",
        visualCuesUsed: "Desk cluttered with technical manuals, nocturnal coffee mug, intense focus.",
        validRoles: ["Software developer", "Startup founder"],
        actionFocus: "Tracing memory leak, refactoring database queries, optimizing throughput ahead of deadline.",
        acceptableVariations: [
          "Building a rural healthcare mobile app prototype",
          "Calibrating satellite telemetry decoding script"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Academic research or project design",
        "Competitive examination strategy & error analysis",
        "Technical troubleshooting or capstone thesis drafting",
        "Preparing a major keynote or scientific presentation"
      ],
      implausibleDistortions: [
        "Depicting the person writing a suicide note or suffering from acute depression",
        "Insomnia caused by broken relationship or family bankruptcy",
        "Criminal hacker planning a malicious cyber attack"
      ]
    },
    benchmarkThemes: [
      "Synthesizing research data for a university paper submission",
      "Developing a structured revision strategy for competitive examinations (CDS/AFCAT)",
      "Debugging algorithmic code or blueprint calculations for a capstone project",
      "Preparing an impactful presentation for an upcoming technical seminar"
    ],
    antiPatterns: [
      "Exaggerated stress, insomnia, anxiety, or desperation about failing",
      "Depicting sudden miraculous divine revelation without diligent hard work",
      "Writing a sad story about loneliness, isolation, or depression"
    ],
    modelStory: {
      hero: "Vikram, 23 years, graduate defense aspirant",
      action: "Systematic revision and strategic time-management for CDS exam",
      past: "Vikram had completed his daily syllabus and was setting aside midnight hours to analyze his mock test performance and identify conceptual weak spots in mathematics.",
      present: "He systematically cross-referenced error patterns, solved ten difficult trigonometry problems using alternative graphical methods, and created concise flashcards for quick revision.",
      future: "His disciplined study schedule enabled him to score 128 marks in the CDS written examination, clearing the cutoff comfortably with high self-confidence.",
      fullStory:
        "Vikram, a 23-year-old defense aspirant from Chandigarh, was preparing for the Combined Defence Services examination. Recognizing that his speed in advanced mathematics required improvement, he instituted a nightly two-hour targeted analysis session. Sitting under his desk lamp, he reviewed errors from that evening's full-length mock paper, consolidated formula cheat-sheets, and solved twenty timed speed problems. His methodical discipline over four months sharpened his problem-solving accuracy, enabling him to clear the CDS written exam with merit and proceed confidently to the Services Selection Board."
    }
  },
  {
    id: "ppdt-03",
    number: 3,
    title: "Medical Care & Sick Child Attendants",
    category: "Civic Health & Social Responsibility",
    imagePath: "/images/ppdt/ppdt-03-sick-child-medical-care.webp",
    description:
      "A rustic bedroom where two attentive young adults lean over a bed to attend to an ailing child resting under blankets, administering medicine with care.",
    diprAmbiguity: "High",
    expectedCharacters: {
      countRange: "3 characters",
      typicalRoles: ["Elder sibling", "Community youth volunteer", "Medical intern / ASHA worker", "Ailing younger child"],
      typicalAge: "2 adults (21-26 years), 1 child (7-10 years)"
    },
    validPerspectives: [
      {
        id: "p3-a",
        name: "Perspective A: Timely Rural First-Aid & Emergency Clinic Referral",
        coreTheme: "Managing sudden viral fever and dehydration in a village child and organizing clinic transport.",
        visualCuesUsed: "Child lying under quilt, adult checking forehead/administering spoon/cup, second adult assisting.",
        validRoles: ["Youth club volunteer", "Concerned neighbor", "Ailing child"],
        actionFocus: "Cold sponging to reduce fever, administering ORS, arranging rural ambulance/vehicle to PHC.",
        acceptableVariations: [
          "Managing seasonal heat-stroke recovery in summer",
          "Handling water-borne dysentery in monsoon with clean water education"
        ]
      },
      {
        id: "p3-b",
        name: "Perspective B: Responsible Elder Sibling Home Management",
        coreTheme: "Elder siblings caring for an ailing younger brother while parents are attending urgent farm work.",
        visualCuesUsed: "Domestic bedroom setting, compassionate bedside care, medicine dosage management.",
        validRoles: ["Elder brother (college student)", "Sister", "Younger brother"],
        actionFocus: "Following doctor's medication schedule, preparing nutritious porridge, keeping child comfortable.",
        acceptableVariations: [
          "Monitoring post-vaccination fever and recovery",
          "Helping younger sibling recover from asthma weather change"
        ]
      },
      {
        id: "p3-c",
        name: "Perspective C: Primary Health Centre Camp Outreach",
        coreTheme: "Medical intern or NSS volunteers conducting door-to-door child immunization and fever survey.",
        visualCuesUsed: "Attentive posture, thermometer/dosage bottle, organized clinical focus.",
        validRoles: ["Medical student / NSS volunteer", "Local health assistant"],
        actionFocus: "Diagnosing primary symptoms, recording vital signs, supplying anti-pyretics and hygiene counseling.",
        acceptableVariations: [
          "Village polio or vitamin-A supplement administration drive",
          "Monitoring recovery after minor seasonal infection"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "First-aid and fever management with hospital referral",
        "Elder sibling managing family medical responsibility",
        "Community health camp volunteer assisting a sick child",
        "Sports injury or seasonal illness recovery"
      ],
      implausibleDistortions: [
        "Declaring the child dead, fatally poisoned, or terminally ill with cancer",
        "Depicting child abuse, poverty-induced starvation, or kidnapping",
        "Supernatural healing or tantric rituals instead of medical science"
      ]
    },
    benchmarkThemes: [
      "Timely first-aid and medical treatment during seasonal viral fever",
      "Organizing rural health camp awareness and primary medical kit distribution",
      "Caring for a young village boy while arranging medical transport to the primary health centre",
      "Managing an emergency home recovery with proper hydration and doctor consultation"
    ],
    antiPatterns: [
      "Declaring the child terminally ill or dead (morbid/fatalistic mindset)",
      "Hopeless financial distress where family cannot afford 10 rupees for medicine",
      "Panic and hysteria instead of calm, resourceful medical management"
    ],
    modelStory: {
      hero: "Raghav, 24 years, youth club secretary",
      action: "Managing medical care and primary health clinic referral for a village child",
      past: "Raghav was visiting his village when he learned that his neighbor's 8-year-old son, Aman, was suffering from acute fever and dehydration.",
      present: "Raghav checked the child's temperature, administered prescribed ORS fluids, and coordinated with the nearby Primary Health Centre (PHC) medical officer for urgent consultation.",
      future: "With prompt care and prescribed antibiotics, the child recovered fully within 48 hours, and Raghav organized an awareness session on clean drinking water for the locality.",
      fullStory:
        "Raghav, a 24-year-old MSc graduate visiting his hometown, was alerted by a neighbor that 8-year-old Sonu had developed a high fever during the monsoon. Reaching the house immediately, Raghav checked his temperature, sponged his forehead with cool water to bring down the fever, and administered oral rehydration solution. He then arranged a two-wheeler to bring the village ASHA worker and primary health center doctor for an on-site diagnosis. Following proper medication and diet guidelines, Sonu recovered within two days, prompting Raghav to organize a clean sanitation drive in the neighborhood."
    }
  },
  {
    id: "ppdt-04",
    number: 4,
    title: "Campus Dialogue & Peer Counseling",
    category: "Mentorship & Interpersonal Relations",
    imagePath: "/images/ppdt/ppdt-04-park-counsel-discussion.webp",
    description:
      "A young man and a young woman standing outdoors in a garden or campus tree-shaded walkway, engaged in a constructive, expressive discussion.",
    diprAmbiguity: "Medium",
    expectedCharacters: {
      countRange: "2 characters",
      typicalRoles: ["College classmates", "Colleagues", "Project co-leads", "Peer mentor & mentee"],
      typicalAge: "21 to 24 years"
    },
    validPerspectives: [
      {
        id: "p4-a",
        name: "Perspective A: Academic Mentorship & Public Speaking Confidence",
        coreTheme: "Mentoring a project teammate to overcome stage anxiety before a university symposium.",
        visualCuesUsed: "Man speaking encouragingly with open palms, woman listening attentively with hands near chest.",
        validRoles: ["Project lead", "Presentation partner"],
        actionFocus: "Restructuring slide content, conducting dry runs on lawn, practicing voice modulation and posture.",
        acceptableVariations: [
          "Preparing for an inter-college debate tournament",
          "Rehearsing mock technical viva questions"
        ]
      },
      {
        id: "p4-b",
        name: "Perspective B: Environmental / Civic Campus Campaign Planning",
        coreTheme: "Planning an eco-friendly campus initiative (waste segregation, sapling drive, water saving).",
        visualCuesUsed: "Lush green outdoor garden setting, purposeful standing dialogue.",
        validRoles: ["Eco-club presidents", "Student council representatives"],
        actionFocus: "Mapping campus zones for sapling planting, assigning volunteer slots, drafting principal's permission.",
        acceptableVariations: [
          "Organizing a cycling awareness marathon on campus",
          "Coordinating a book donation drive for underprivileged schools"
        ]
      },
      {
        id: "p4-c",
        name: "Perspective C: Civil Services / Career Roadmap Dialogue",
        coreTheme: "Batchmates aligning preparation strategy, syllabus breakdown, and optional subject choices.",
        visualCuesUsed: "Campus setting, serious thoughtful engagement between focused peers.",
        validRoles: ["Aspirants", "College seniors"],
        actionFocus: "Sharing curated notes, setting weekly mock paper deadlines, dividing editorial analysis.",
        acceptableVariations: [
          "Finalizing startup incubation proposal for college entrepreneurship cell"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Peer mentorship and public speaking encouragement",
        "Coordinating a campus club event or environmental initiative",
        "Career guidance or academic project planning"
      ],
      implausibleDistortions: [
        "Romantic breakup, lover's quarrel, eve-teasing, or domestic harassment",
        "Extortion, blackmail, or criminal coercion",
        "Crying uncontrollably over trivial personal relationship drama"
      ]
    },
    benchmarkThemes: [
      "Resolving technical differences and finalizing a college project presentation",
      "Mentoring a peer to overcome public speaking hesitation before a debate contest",
      "Planning a university cultural/social welfare awareness campaign",
      "Career planning and joint preparation for civil services or defense entrance"
    ],
    antiPatterns: [
      "Bollywood-style romantic drama, eve-teasing, or unrequited love",
      "Abrasive argument, domestic quarrel, or relationship breakup",
      "One person weeping while the other provides purely superficial sympathy"
    ],
    modelStory: {
      hero: "Sameer, 22 years, final year commerce student",
      action: "Mentoring his project partner to deliver an impactful seminar presentation",
      past: "Sameer and his classmate Neha were assigned to present their research on rural microfinance at the upcoming university seminar, but Neha felt apprehensive about public speaking.",
      present: "Sameer met her at the campus lawn, reviewed the slide deck, structured her talking points into crisp bullet points, and conducted mock practice sessions focusing on clear voice modulation.",
      future: "With enhanced confidence, Neha co-delivered the presentation seamlessly, earning commendation from the faculty panel.",
      fullStory:
        "Sameer, a 22-year-old final-year student, noticed that his project partner Sneha was anxious about presenting their joint research on rural digital banking before the faculty evaluation committee. Meeting her at the university garden during a free hour, Sameer actively listened to her concerns, divided the speaking sections to match her strengths, and demonstrated practical breathing techniques to manage stage nerves. They conducted two thorough mock runs. Sneha delivered her segment with poise, and the panel commended their teamwork and clarity."
    }
  },
  {
    id: "ppdt-05",
    number: 5,
    title: "High-Altitude Mountain Supply & Expedition",
    category: "Adventure, Stamina & Logistics",
    imagePath: "/images/ppdt/ppdt-05-mountain-supply-trek.webp",
    description:
      "A rugged Himalayan mountain trail with trekkers and laden pack animals navigating steep rocky slopes under snow-capped peaks.",
    diprAmbiguity: "High",
    expectedCharacters: {
      countRange: "3 to 4 characters",
      typicalRoles: ["Trek expedition leader", "Local mountain guides", "Relief convoy team", "Cadets"],
      typicalAge: "22 to 32 years"
    },
    validPerspectives: [
      {
        id: "p5-a",
        name: "Perspective A: Winter Relief & Essential Supplies Delivery",
        coreTheme: "Transporting essential rations, medicines, and solar equipment to a cut-off snow-bound hamlet.",
        visualCuesUsed: "Pack mules loaded with saddlebags, rugged rocky terrain, trekkers with walking sticks.",
        validRoles: ["Youth volunteer / civil defense officer", "Local guides"],
        actionFocus: "Procuring provisions, balancing loads on mules, checking footholds on icy ridges, delivering on time.",
        acceptableVariations: [
          "Supplying emergency medical kits to an isolated border dispensary",
          "Delivering textbooks and winter jackets to an upper-valley school"
        ]
      },
      {
        id: "p5-b",
        name: "Perspective B: High-Altitude NCC / Adventure Trekking Expedition",
        coreTheme: "Leading an adventure mountaineering expedition with rigorous acclimatization and safety protocols.",
        visualCuesUsed: "Steep slope, team ascending in single file, outdoor gear.",
        validRoles: ["Expedition leader", "Cadet trekkers"],
        actionFocus: "Monitoring team pulse/hydration for AMS, establishing base camps, setting rope guidelines.",
        acceptableVariations: [
          "Navigating a high-altitude mountain pass during training course",
          "Conducting an ecological waste-cleanliness trek in high Himalayas"
        ]
      },
      {
        id: "p5-c",
        name: "Perspective C: Geological / Forest Flora Survey Convoy",
        coreTheme: "Assisting forest department or survey team in high-altitude terrain mapping or glacier monitoring.",
        visualCuesUsed: "Scientific equipment on pack animals, specialized mountain navigation.",
        validRoles: ["Geology researcher / forest warden", "Field assistants"],
        actionFocus: "Installing weather sensors, mapping landslide vulnerabilities, recording glacial melt indicators.",
        acceptableVariations: [
          "Wildlife sanctuary biodiversity census in upper Himalayas"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Essential winter supply transport to cut-off village",
        "Youth mountaineering expedition & acclimatization training",
        "Ecological survey or geological monitoring convoy",
        "Assisting border roads / communications survey team"
      ],
      implausibleDistortions: [
        "Warfare firefight, terrorist ambush, or military shootout (no weapons or combat uniform shown)",
        "Trekkers falling down gorge screaming into fatal abyss",
        "Smuggling illegal contraband or narcotics over borders"
      ]
    },
    benchmarkThemes: [
      "Leading an essential winter ration supply mission to a cut-off mountain outpost",
      "Organizing an NCC mountaineering expedition with rigorous safety drills",
      "Disaster relief convoy transporting solar batteries and medical kits to a remote hamlet",
      "Assisting forest department officials in high-altitude flora/fauna ecological survey"
    ],
    antiPatterns: [
      "Sudden terrorist ambush or warfare (unless specifically supported by uniform/weapons)",
      "Fatal mountaineering disaster where teammates fall down gorges",
      "Complete exhaustion and abandonment of mission due to cold weather"
    ],
    modelStory: {
      hero: "Captain Ankit (Retd) / Cadet Ankit, 24 years, NCC mountaineering leader",
      action: "Navigating difficult terrain to deliver supplies to an isolated upper-valley school",
      past: "An unseasonal snowfall had blocked the motorable track leading to a remote tribal village in Himachal Pradesh, delaying essential textbooks and winter clothing.",
      present: "Ankit mobilized a team of local youths and pack ponies, inspected harnesses, mapped the safest windward ridge, and led the convoy with systematic rest breaks.",
      future: "The team delivered the supplies safely ahead of the heavy blizzard, receiving gratitude from the village school headmaster.",
      fullStory:
        "Ankit, a 24-year-old youth expedition leader from Manali, volunteered with the district administration when early snowfall cut off vehicular access to an uphill settlement. Coordinating with three experienced local guides, he secured six sturdy pack mules loaded with emergency medicine, solar lanterns, and grain. He equipped the team with insulated gear, trekking poles, and first-aid kits. Leading from the front, he carefully tested snow-covered footholds along the ridge. The convoy reached the village before nightfall, successfully replenishing community supplies."
    }
  },
  {
    id: "ppdt-06",
    number: 6,
    title: "Village Community Work & Produce Packaging",
    category: "Community Development & Rural Economy",
    imagePath: "/images/ppdt/ppdt-06-village-community-work.webp",
    description:
      "A rural household courtyard where an energetic young woman carries a basket overhead while a young man sorts and sifts agricultural produce in a wide wicker tray.",
    diprAmbiguity: "Medium",
    expectedCharacters: {
      countRange: "2 characters",
      typicalRoles: ["Progressive rural youth", "Siblings / cooperative partners", "Self-help group founders"],
      typicalAge: "20 to 24 years"
    },
    validPerspectives: [
      {
        id: "p6-a",
        name: "Perspective A: Agricultural Produce Grading & Cooperative Marketing",
        coreTheme: "Sorting and grading organic pulses/grains to eliminate middlemen and sell at fair prices.",
        visualCuesUsed: "Wicker sorting tray, basket carried overhead, agricultural courtyard setting.",
        validRoles: ["Agricultural graduate / progressive farmer", "Sister / cooperative partner"],
        actionFocus: "Standardizing grain moisture levels, sieving impurities, packaging in 5kg bags for direct market.",
        acceptableVariations: [
          "Setting up an organic seed preservation bank",
          "Processing turmeric or spices through a village self-help group"
        ]
      },
      {
        id: "p6-b",
        name: "Perspective B: Flood / Monsoon Emergency Relief Ration Packing",
        coreTheme: "Assembling food and grain relief packets for flood-affected low-lying hamlets.",
        visualCuesUsed: "Manual handling of grain containers, urgent purposeful movement.",
        validRoles: ["Village youth club coordinator", "Relief volunteer"],
        actionFocus: "Collecting grain donations from prosperous farmers, sealing dry ration packs, loading carts for transit.",
        acceptableVariations: [
          "Emergency food distribution during localized cyclone alert"
        ]
      },
      {
        id: "p6-c",
        name: "Perspective C: Rural Cottage Industry & Women's Self-Help Enterprise",
        coreTheme: "Reviving local bamboo/wicker craftsmanship and handloom products for urban exhibitions.",
        visualCuesUsed: "Woven baskets, traditional household courtyard workspace.",
        validRoles: ["Rural entrepreneur", "Women's cooperative lead"],
        actionFocus: "Procuring raw bamboo reed, quality-checking finished baskets, liaising with district artisan mela.",
        acceptableVariations: [
          "Community paper-mache or pottery packaging unit"
        ]
      },
      {
        id: "p6-d",
        name: "Perspective D: Village Cleanliness & Organic Composting Initiative",
        coreTheme: "Segregating agricultural biomass and crop residue to prepare vermicompost pits.",
        visualCuesUsed: "Sorting organic matter, carrying biomass basket to disposal/pit area.",
        validRoles: ["Swachh Bharat village champion", "Youth volunteer"],
        actionFocus: "Digging decentralized compost pits, adding earthworm cultures, replacing chemical fertilizers.",
        acceptableVariations: [
          "Village courtyard sanitation drive ahead of festival"
        ]
      },
      {
        id: "p6-e",
        name: "Perspective E: Eradication of Child Labor & School Enrollment Drive",
        coreTheme: "A proactive youth leader taking initiative to resolve child labor by counseling families and enrolling working youth into school.",
        visualCuesUsed: "Adolescent appearance of figures engaged in manual sorting tasks outside house instead of attending school.",
        validRoles: ["College student / NSS volunteer (Hero)", "Working youth", "Village primary school teacher"],
        actionFocus: "Surveying out-of-school working children, educating farm parents on government scholarships and midday meals, setting up evening bridge classes, and formally enrolling children into school.",
        acceptableVariations: [
          "Setting up a community evening study center for children helping parents in farming",
          "Helping marginalized farm families access self-employment schemes so children can study full-time"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Agricultural grading and self-help cooperative",
        "Disaster relief dry ration packet preparation",
        "Rural handicraft / cottage industry enterprise",
        "Community composting or harvest festival preparation",
        "Eradication of child labor through education and school enrollment"
      ],
      implausibleDistortions: [
        "Passive misery / child abuse melodrama where hero weeps helplessly with zero initiative",
        "Hopeless starvation where characters starve to death without constructive effort",
        "Violent crime or human trafficking cartel shootout"
      ]
    },
    benchmarkThemes: [
      "Establishing a village self-help cooperative for sorting and grading organic pulses",
      "Preparing community rations and relief grain packets ahead of monsoon season",
      "Eradicating child labor by counseling parents and enrolling out-of-school youth in primary school",
      "Implementing hygienic cottage-scale agro-processing to eliminate middlemen",
      "Setting up a community seed bank preserving drought-resistant traditional crops"
    ],
    antiPatterns: [
      "Depicting the hero as a helpless victim of child labor crying for rescue (Victim Mindset: Hero should be proactive, age 20-25)",
      "Lamenting child labor with purely passive grief instead of taking concrete reform steps (bridge classes, parent counseling, school enrollment)",
      "Caste discrimination or family disputes over inheritance"
    ],
    modelStory: {
      hero: "Praveen, 23 years, agricultural graduate",
      action: "Forming an organic produce sorting collective with his sister and village youth",
      past: "Praveen returned to his village after completing his B.Sc. in Agriculture and observed that farmers were receiving depressed prices because produce was sold ungraded.",
      present: "With his sister Sunita, he initiated a decentralized grading and packing center in their courtyard, training local youths on moisture testing and hygienic bagging.",
      future: "The sorted produce commanded a 25% premium at the district farmers' market, leading to the registration of a formal village agricultural cooperative.",
      fullStory:
        "Praveen, a 23-year-old agricultural science graduate, returned to his village in Madhya Pradesh to empower local farmers. Noting that unprocessed pulses fetched below-market rates, he and his sister Sunita set up a community grading unit in their courtyard. They introduced calibrated sieves to sort grains by size and packed them in eco-friendly jute bags. Praveen partnered with five neighboring farm families and established direct supply links with an organic supermarket in the city. The cooperative boosted household incomes by 25% and established a sustainable village enterprise."
    }
  },
  {
    id: "ppdt-07",
    number: 7,
    title: "Stuck Vehicle & Monsoon Road Obstruction",
    category: "Crisis Response & Team Mobilization",
    imagePath: "/images/ppdt/ppdt-07-stuck-tractor-road-clearance.webp",
    description:
      "A muddy rural road during inclement weather where a tractor and cart are bogged down in deep slush, surrounded by villagers pulling ropes and placing wooden levers.",
    diprAmbiguity: "High",
    expectedCharacters: {
      countRange: "4 to 6 characters",
      typicalRoles: ["Mechanical engineer / local youth", "Tractor driver", "Village volunteers", "Commuters"],
      typicalAge: "20 to 45 years"
    },
    validPerspectives: [
      {
        id: "p7-a",
        name: "Perspective A: Arterial Road Clearance & Perishable Harvest Transit",
        coreTheme: "Extricating a bogged vegetable tractor to reopen the village's only road before mandi deadline.",
        visualCuesUsed: "Tractor bogged in slush, multiple people pulling tow cables and applying wooden levers.",
        validRoles: ["Mechanical diploma graduate / youth leader", "Driver", "Volunteers"],
        actionFocus: "Wedging wooden planks under wheels, applying gravel, synchronizing push-pull effort with levers.",
        acceptableVariations: [
          "Clearing a milk delivery tractor stranded in mud",
          "Reopening blocked school bus route after heavy showers"
        ]
      },
      {
        id: "p7-b",
        name: "Perspective B: Emergency Medical Transport Extrication",
        coreTheme: "The vehicle was transporting a patient to the civil hospital when caught in road washaway.",
        visualCuesUsed: "Urgent dynamic effort, rainy overcast sky, crowd around vehicle.",
        validRoles: ["Local first responder", "Community youth"],
        actionFocus: "Mobilizing manpower, clearing front axle mud, hoisting vehicle out to resume medical transit.",
        acceptableVariations: [
          "Facilitating an ambulance detour escort through muddy track"
        ]
      },
      {
        id: "p7-c",
        name: "Perspective C: Canal Embankment Breach Sandbag Reinforcement",
        coreTheme: "Tractor carrying emergency sandbags to shore up a cracking canal bund got bogged down.",
        visualCuesUsed: "Slushy river/canal embankment path, heavy load, cooperative teamwork.",
        validRoles: ["Irrigation volunteer", "Village team"],
        actionFocus: "Unloading partial sandbags to lighten weight, extricating tractor, completing bund fortification.",
        acceptableVariations: [
          "Emergency flood barrier placement in low-lying fields"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Unblocking road and extricating stuck farm tractor",
        "Emergency patient or medical vehicle transit rescue",
        "Flood embankment sandbag convoy extrication",
        "Agricultural machinery salvage during flash rain"
      ],
      implausibleDistortions: [
        "Lethal tractor rollover crushing multiple villagers to death",
        "Rioters burning a tractor in protest",
        "Superman lifting a 3-ton tractor singlehandedly"
      ]
    },
    benchmarkThemes: [
      "Clearing a critical arterial village road to transport medical emergency or produce",
      "Coordinating mechanical leverage and stone bedding to extricate a bogged tractor",
      "Organizing volunteer labor to repair a damaged road culvert during heavy rains",
      "Ensuring vital transport connectivity remains unbroken between village and district hospital"
    ],
    antiPatterns: [
      "Panicking and abandoning the tractor in the mud",
      "Expecting the government/police to arrive instantaneously without taking local initiative",
      "Superman hero pushing a 3-ton tractor singlehandedly without leverage or teamwork"
    ],
    modelStory: {
      hero: "Rohit, 23 years, mechanical diploma holder",
      action: "Applying mechanical advantage and community coordination to free a bogged tractor",
      past: "During a torrential downpour, a tractor carrying perishable vegetables to the weekly district mandi got stuck in a deep mud rut, blocking the single arterial road.",
      present: "Rohit gathered nearby youth, arranged sturdy wooden planks to wedge under the drive wheels, hitched tow ropes to a secondary vehicle, and synchronized the push-pull effort.",
      future: "The tractor was freed within 30 minutes, the road reopened, and Rohit later organized a shramdaan to gravel the vulnerable mud stretch.",
      fullStory:
        "Rohit, a 23-year-old mechanical diploma graduate, was cycling home when he saw a tractor carrying fresh harvest bogged down in deep roadside mud, blocking commuter traffic. Rohit stepped forward and took charge. He instructed the driver to keep wheels straight, dispatched two volunteers to fetch stout timber logs from a nearby sawmill, and placed gravel under the tires to generate traction. Synchronizing fifteen villagers on tow cables, they hoisted the tractor out on the second attempt. The road cleared, saving the day's harvest."
    }
  },
  {
    id: "ppdt-08",
    number: 8,
    title: "Village Water Management & Harvesting",
    category: "Civic Infrastructure & Sustainability",
    imagePath: "/images/ppdt/ppdt-08-rural-resource-management.webp",
    description:
      "A crisp village homestead setting where responsible rural youths collaborate in managing water containers, storage vats, and agricultural grain preservation.",
    diprAmbiguity: "Medium",
    expectedCharacters: {
      countRange: "2 characters",
      typicalRoles: ["Village youth leaders", "Environment club volunteers", "Civil engineering students"],
      typicalAge: "21 to 24 years"
    },
    validPerspectives: [
      {
        id: "p8-a",
        name: "Perspective A: Rooftop Rainwater Harvesting & Filtration System",
        coreTheme: "Designing low-cost sand-gravel filter units to conserve monsoon roof runoff.",
        visualCuesUsed: "Water storage vessels, rural homestead roofline, cooperative work.",
        validRoles: ["Civil engineering student", "Youth leader"],
        actionFocus: "Channeling PVC pipes from eaves, building sand-gravel-charcoal filters, filling storage barrels.",
        acceptableVariations: [
          "Building check dams across minor seasonal runoff streams",
          "Recharging depleted open wells with rainwater"
        ]
      },
      {
        id: "p8-b",
        name: "Perspective B: Drinking Water Hygiene & Chlorination Drive",
        coreTheme: "Disinfecting village drinking water tanks and distributing chlorine tablets ahead of monsoon.",
        visualCuesUsed: "Water containers, hygienic handling by young adults.",
        validRoles: ["Health volunteer", "Youth club member"],
        actionFocus: "Testing water samples with field test kits, dosing community tanks with bleaching powder, distributing ORS.",
        acceptableVariations: [
          "Educating community women on boiling drinking water"
        ]
      },
      {
        id: "p8-c",
        name: "Perspective C: Drought Water Rationing & Fair Distribution",
        coreTheme: "Organizing equitable water rationing during summer tanker supply delays.",
        visualCuesUsed: "Careful monitoring of storage pots, community teamwork.",
        validRoles: ["Panchayat youth secretary", "Volunteers"],
        actionFocus: "Establishing queue tokens, prioritizing households with elderly/infants, preventing wastage.",
        acceptableVariations: [
          "Reviving a defunct village handpump"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Rooftop rainwater harvesting and filtration",
        "Water sanitation, testing, and chlorination drive",
        "Equitable summer water management and conservation",
        "Handpump or well maintenance cooperative"
      ],
      implausibleDistortions: [
        "Poisoned well where villagers are dropping dead",
        "Lethal drought causing mass exodus and despair",
        "Violent caste clashes over water bucket access"
      ]
    },
    benchmarkThemes: [
      "Constructing rooftop rainwater collection barrels and filtration pits",
      "Managing community drinking water distribution during peak summer dry spell",
      "Setting up a decentralized vermicomposting and water recycling pit",
      "Organizing hygiene education and chlorine tablet water purification drive"
    ],
    antiPatterns: [
      "Hopeless drought resulting in famine, death of livestock, or mass migration",
      "Blaming authorities while sitting idle without conserving a single drop",
      "Superficial melodrama without realistic civil engineering solutions"
    ],
    modelStory: {
      hero: "Kavita, 22 years, civil engineering student",
      action: "Designing and installing rainwater harvesting drums for village households",
      past: "Noticing that groundwater levels dipped significantly every pre-monsoon summer, Kavita resolved to harness rooftop runoff from the village primary school and houses.",
      present: "She drafted a simple low-cost sand-gravel filter blueprint, pooled resources through the youth club, and demonstrated the installation of storage barrels.",
      future: "Ten households adopted the design before the monsoon, storing 15,000 liters of potable water and mitigating summer tanker dependency.",
      fullStory:
        "Kavita, a 22-year-old civil engineering undergraduate, noticed her ancestral village facing severe water shortages every May. During her summer vacation, she proposed a community rainwater harvesting initiative to the village sarpanch. Partnering with local youth, she built a pilot filtration system using three-tier gravel, charcoal, and sand beds connected to PVC roof channels. The pilot successfully filtered runoff from the school roof into a clean 5,000-liter storage tank, inspiring eight other households to replicate the low-cost design."
    }
  },
  {
    id: "ppdt-09",
    number: 9,
    title: "River Crossing & Improvised Bridging",
    category: "Engineering & Outdoor Resourcefulness",
    imagePath: "/images/ppdt/ppdt-09-wooden-bridge-crossing.webp",
    description:
      "Two agile young men positioned firmly on sturdy branches and fallen timber spanning a rushing stream, securing ropes and constructing a safe passage.",
    diprAmbiguity: "High",
    expectedCharacters: {
      countRange: "2 characters",
      typicalRoles: ["Engineering cadets", "Village scouts / adventure enthusiasts", "Local youth volunteers"],
      typicalAge: "21 to 25 years"
    },
    validPerspectives: [
      {
        id: "p9-a",
        name: "Perspective A: Improvised Footbridge for School Commute",
        coreTheme: "Constructing a secure log-and-rope footbridge after flood washed away the old culvert.",
        visualCuesUsed: "Two men balancing on fallen logs/branches over a watercourse, rigging ropes.",
        validRoles: ["Engineering student / NCC cadet", "Batchmate / scout"],
        actionFocus: "Anchoring cross-timbers, tying secure square lashings, erecting chest-high guide rope on both banks.",
        acceptableVariations: [
          "Restoring pedestrian access for agricultural workers",
          "Repairing a washed-out trekking trail bridge"
        ]
      },
      {
        id: "p9-b",
        name: "Perspective B: Nature / Wildlife Observation Hide Construction",
        coreTheme: "Erecting an elevated wooden hide in tree branches for bird census or ecological survey.",
        visualCuesUsed: "Men positioned in dense tree canopy overlooking waterway.",
        validRoles: ["Forestry student", "Wildlife photographer / researcher"],
        actionFocus: "Securing viewing platform with non-damaging rope ties, installing camouflage mesh, recording fauna.",
        acceptableVariations: [
          "Setting up camera traps for nocturnal animal survey"
        ]
      },
      {
        id: "p9-c",
        name: "Perspective C: Pre-Monsoon Hazard Pruning",
        coreTheme: "Safely pruning heavy dead branches that threaten to snap overhead rural electric cables.",
        visualCuesUsed: "Men standing on high tree boughs with sawing/cutting positioning.",
        validRoles: ["Civil defense youth", "Power department volunteer"],
        actionFocus: "Tying safety harnesses, lopping dry limbs systematically, clearing debris away from wires.",
        acceptableVariations: [
          "Clearing watercourse obstructions to prevent river backflow"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Improvised cantilever footbridge construction",
        "Tree canopy observation platform for ecological survey",
        "Pre-monsoon electrical line safety branch pruning",
        "Flash flood rescue guideline rigging"
      ],
      implausibleDistortions: [
        "A character slipping, breaking his spine, and drowning helplessly",
        "Suicidal leap from high tree into raging rapids",
        "Reckless daredevil stunt without safety precautions"
      ]
    },
    benchmarkThemes: [
      "Constructing an improvised cantilever bamboo/log footbridge for school children",
      "Securing safety safety guide ropes across a swollen stream after flash floods",
      "Pruning precarious hanging branches to prevent damage to rural electrical cables",
      "Building an elevated nature observation hide for wildlife census"
    ],
    antiPatterns: [
      "One character slips, drowns, or breaks his neck (morbid catastrophe)",
      "Reckless stunt without ropes or safety consideration",
      "Fleeing in panic from the river"
    ],
    modelStory: {
      hero: "Arun, 23 years, engineering cadet and trekker",
      action: "Constructing a secure timber footbridge over a swollen mountain nullah",
      past: "A flash stream had washed away the old wooden footbridge connecting two hamlet sections, forcing primary schoolchildren to take a dangerous 4-kilometer detour.",
      present: "Arun and his friend Manpreet identified two sturdy bank trees, felled dead timber logs, lashed them together with heavy Manila rope, and erected secure bamboo handrails.",
      future: "The improvised footbridge restored safe pedestrian crossing until the PWD constructed a permanent culvert post-monsoon.",
      fullStory:
        "Arun, a 23-year-old engineering graduate, noticed that monsoon overflow in a local stream had swept away the wooden walkway used by school students. Taking charge, Arun and his friend Manpreet surveyed the banks for anchor points. Utilizing sturdy fallen logs and heavy-duty nylon ropes from the village sports club, they lashed three parallel timbers across the 12-foot gap. They anchored cross-struts and erected a chest-high taut guide rope on both sides. The secure crossing allowed forty students to reach school safely without risk."
    }
  },
  {
    id: "ppdt-10",
    number: 10,
    title: "Storm Weather Alert & Field Inspection",
    category: "Disaster Preparedness & Civic Action",
    imagePath: "/images/ppdt/ppdt-10-storm-field-patrol.webp",
    description:
      "A resolute young man shielding his face from blowing wind and dust clouds while advancing purposefully along a rural canal embankment during an approaching storm.",
    diprAmbiguity: "High",
    expectedCharacters: {
      countRange: "1 character",
      typicalRoles: ["Village volunteer", "Irrigation engineer", "Civil defense warden", "Youth club president"],
      typicalAge: "22 to 26 years"
    },
    validPerspectives: [
      {
        id: "p10-a",
        name: "Perspective A: Canal Bund Integrity & Early Warning Patrol",
        coreTheme: "Patrolling canal embankments during squall to check sluice gates and alert farmers.",
        visualCuesUsed: "Man shielding eyes from wind/dust, walking firmly along waterway/canal bank.",
        validRoles: ["Civil defense warden", "Irrigation engineer / youth president"],
        actionFocus: "Inspecting vulnerable bund sections, closing excessive sluice flow, alerting field laborers.",
        acceptableVariations: [
          "Guiding elderly farmhands to concrete cyclone shelter",
          "Sounding early warning for flash flood rise in canal"
        ]
      },
      {
        id: "p10-b",
        name: "Perspective B: Accidental Crop / Stubble Fire Containment",
        coreTheme: "Rushing to contain a localized dry crop fire ignited by high winds near village boundary.",
        visualCuesUsed: "Smoke/dust clouds in air, urgent resolute forward movement.",
        validRoles: ["Village volunteer lead", "Farmer"],
        actionFocus: "Mobilizing fire-beaters and tractor-drawn plow to create fire-break trench, dousing sparks.",
        acceptableVariations: [
          "Extinguishing accidental spark near harvested wheat stacks"
        ]
      },
      {
        id: "p10-c",
        name: "Perspective C: Agricultural Silo & Livestock Storm Safeguard",
        coreTheme: "Securing tin roofs, livestock sheds, and grain bags before a dust storm strikes village.",
        visualCuesUsed: "High atmospheric turbulence, solitary determined patrol.",
        validRoles: ["Farm cooperative manager", "Progressive youth"],
        actionFocus: "Weighing down tin roofs with sandbags, herding loose livestock into covered brick enclosures.",
        acceptableVariations: [
          "Securing polyhouse plastic sheets before wind damages saplings"
        ]
      }
    ],
    perceptualBoundaries: {
      plausibleInterpretations: [
        "Canal bund patrol and early warning storm alert",
        "Combating localized crop fire / creating firebreak",
        "Securing farm livestock and silos ahead of squall",
        "Civil defense disaster preparedness inspection"
      ],
      implausibleDistortions: [
        "A helpless victim crying in blindness or getting swept away to death",
        "A criminal fleeing from police in the smoke",
        "Supernatural apocalypse or alien tornado fantasy"
      ]
    },
    benchmarkThemes: [
      "Patrolling a canal embankment during a cyclonic windstorm to inspect bund integrity",
      "Leading an early warning evacuation alert to farm laborers working in open fields",
      "Rushing to douse an accidental dry-crop field fire with beaters and water sprayers",
      "Securing agricultural livestock and grain silos before a dust storm hits the village"
    ],
    antiPatterns: [
      "Helpless victim being blinded and crying for rescue in a storm",
      "A person contemplating self-harm or fleeing from a crime",
      "Absurd alien or supernatural storm fantasy"
    ],
    modelStory: {
      hero: "Devender, 24 years, civil defense volunteer",
      action: "Inspecting canal bund and alerting farmers ahead of a severe squall",
      past: "The meteorological department had issued a severe squall alert for the coastal district, with wind speeds expected to touch 70 km/h.",
      present: "Devender patrolled the outer canal embankment to verify sluice gates, shielded his eyes with his forearm against airborne dust, and alerted farm workers to seek shelter.",
      future: "His proactive field patrol ensured zero livestock casualties, all irrigation gates remained intact, and village emergency response stood fully prepared.",
      fullStory:
        "Devender, a 24-year-old youth club president and civil defense volunteer, received an emergency weather alert warning of a 75 km/h squall approaching his block within the hour. Knowing that field workers were harvesting mustard near the low-lying canal, Devender hurried on foot to alert them. Shielding his eyes against blinding dust, he methodically checked the bund gates, guided eight farm hands to the concrete village shelter, and secured loose tin roofs with sandbags. His swift proactive diligence averted accidents and protected community property."
    }
  }
];

export function getScenarioById(id: string): PPDTScenario | undefined {
  return PPDT_SCENARIOS.find((s) => s.id === id);
}

export function getAllScenarios(): PPDTScenario[] {
  return PPDT_SCENARIOS;
}
