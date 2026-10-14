import type { ToeflTest } from './types';

/** TOEFL practice test 3 — all texts, scripts and questions are original. */
export const TEST_03: ToeflTest = {
  "id": "toefl-03",
  "title": "Practice Test 3",
  "reading": {
    "m1": {
      "ctw": [
        {
          "id": "t3-ctw-1",
          "text": "In autumn, the leaves of many trees turn yellow, orange and red. During the summer, leaves contain large amounts of chlorophyll, the green pigment that plants use to capture energy from sunlight. As the days become shorter and cooler, trees stop producing chlorophyll, and the green colour slowly disappears. Yellow and orange pigments, which were present all the time, then become visible, while red colours are produced by new chemicals that form in the leaves during the autumn."
        }
      ],
      "daily": [
        {
          "id": "t3-d1",
          "kind": "schedule",
          "title": "Young Researchers Conference — Day 1 Programme",
          "body": "09:00–09:30  Registration and coffee (Main Hall)\n09:30–10:30  Opening lecture: “Data and Democracy” — Prof. Elisa Duarte (Auditorium)\n10:45–12:15  Parallel sessions A (Rooms 1–4)\n12:15–13:30  Lunch (Cafeteria — vegetarian options available)\n13:30–15:00  Poster session (Main Hall)\n15:15–16:30  Parallel sessions B (Rooms 1–4)\n16:30         Closing remarks and certificates (Auditorium)\n\nPresenters should upload their slides to the conference website by 8 a.m. on the day of their talk.",
          "questions": [
            {
              "q": "Where will the poster session take place?",
              "options": [
                "In the Auditorium",
                "In Rooms 1–4",
                "In the Cafeteria",
                "In the Main Hall"
              ],
              "answer": 3
            },
            {
              "q": "What happens immediately after lunch?",
              "options": [
                "The opening lecture",
                "Parallel sessions A",
                "The poster session",
                "The closing remarks"
              ],
              "answer": 2
            },
            {
              "q": "What must presenters do before 8 a.m. on the day of their talk?",
              "options": [
                "Upload their slides",
                "Register in the Main Hall",
                "Collect their certificates",
                "Book a room"
              ],
              "answer": 0
            }
          ]
        },
        {
          "id": "t3-d2",
          "kind": "email",
          "title": "Subject: Water supply interruption — Building C",
          "body": "Dear residents,\n\nPlease note that the water supply to Building C will be interrupted on Thursday from 10 a.m. to approximately 4 p.m. while the main tank is cleaned. We recommend storing some water for drinking and cooking before 10 a.m.\n\nThe gym showers in Building A will be available to Building C residents during this period. If the work finishes early, we will notify you by text message.\n\nWe apologise for the inconvenience.\n\nBuilding Management",
          "questions": [
            {
              "q": "What is the purpose of the email?",
              "options": [
                "To announce a new gym",
                "To inform residents about a temporary interruption",
                "To ask residents to clean their tanks",
                "To apologise for a broken shower"
              ],
              "answer": 1
            },
            {
              "q": "What are residents advised to do?",
              "options": [
                "Leave the building for the day",
                "Use the showers in Building C",
                "Call the management after 4 p.m.",
                "Store water before 10 a.m."
              ],
              "answer": 3
            },
            {
              "q": "How will residents know if the work finishes early?",
              "options": [
                "They will receive a text message.",
                "They will receive another email.",
                "A notice will be posted in Building A.",
                "The water will be turned on at 4 p.m."
              ],
              "answer": 0
            }
          ]
        }
      ],
      "academic": [
        {
          "id": "t3-a1",
          "title": "Sinking Cities",
          "text": "When people think of cities threatened by water, they usually imagine rising sea levels. In many coastal cities, however, a second process is equally important and often faster: the land itself is sinking. This phenomenon, known as subsidence, can lower the ground by several centimetres each year — far more than the current rate of sea-level rise.\n\nThe most common cause of rapid subsidence is the extraction of groundwater. Many cities are built on layers of soft clay and sand that contain water in the spaces between their particles. When large quantities of this water are pumped out for drinking, industry or agriculture, the layers compress, rather like a sponge that is squeezed. Unlike a sponge, however, clay layers do not recover when water returns; much of the compaction is permanent.\n\nThe consequences can be severe. In parts of Jakarta and Mexico City, the ground has dropped by several metres over the past century. Buildings tilt, pipes crack and drainage systems fail, because water no longer flows in the direction for which they were designed. In coastal areas, subsidence makes flooding more frequent, since land that was once safely above high tide may now lie below it.\n\nSolutions exist, but they are not simple. Some cities, such as Tokyo, managed to slow subsidence dramatically in the second half of the twentieth century by strictly limiting groundwater extraction and providing alternative water supplies from rivers and reservoirs. Such measures require large investments and effective regulation, and they cannot reverse the sinking that has already occurred. For many rapidly growing cities, the challenge is to act before the damage becomes irreversible.",
          "questions": [
            {
              "q": "According to paragraph 1, how does subsidence compare with sea-level rise?",
              "options": [
                "It is always slower.",
                "It happens only in rivers.",
                "It can be much faster.",
                "It is caused by sea-level rise."
              ],
              "answer": 2
            },
            {
              "q": "Why does the author compare clay layers to a sponge?",
              "options": [
                "To show that clay absorbs pollution",
                "To explain how the layers compress when water is removed",
                "To explain why clay is soft",
                "To describe how water is cleaned"
              ],
              "answer": 1
            },
            {
              "q": "What is an important difference between clay layers and a sponge?",
              "options": [
                "Clay layers hold less water.",
                "Sponges are heavier than clay.",
                "Clay layers do not recover their shape.",
                "Clay layers expand when water is removed."
              ],
              "answer": 2
            },
            {
              "q": "Why do drainage systems fail in sinking cities?",
              "options": [
                "The pipes are too old.",
                "There is too little rain.",
                "The systems are blocked by sand.",
                "Water no longer flows in the planned direction."
              ],
              "answer": 3
            },
            {
              "q": "What does the example of Tokyo show?",
              "options": [
                "Limiting groundwater extraction can slow subsidence.",
                "Subsidence can be completely reversed.",
                "Rivers cause more subsidence than wells.",
                "Coastal cities cannot stop sinking."
              ],
              "answer": 0
            }
          ]
        }
      ]
    },
    "easy": {
      "ctw": [
        {
          "id": "t3-ctw-2",
          "text": "Almost all wild penguins live in the Southern Hemisphere. Many people imagine them only on the ice of Antarctica, but several species live in much warmer places, such as the coasts of South Africa, Australia and South America. One species even lives near the equator, on islands where cold ocean currents bring plenty of fish. All penguins are excellent swimmers, and they use their short wings like flippers to move quickly through the water."
        }
      ],
      "daily": [
        {
          "id": "t3-d3",
          "kind": "notice",
          "title": "Lost and Found — Student Centre",
          "body": "Items found on campus are kept at the Student Centre information desk for 30 days. To collect an item, please bring your student card and describe the item.\n\nValuable items, such as phones, wallets and laptops, are kept in a locked cabinet and can only be collected between 10 a.m. and 4 p.m. on weekdays.\n\nItems not collected after 30 days are donated to charity. Umbrellas and water bottles are donated after 7 days.",
          "questions": [
            {
              "q": "What must students bring to collect an item?",
              "options": [
                "A receipt",
                "Their student card",
                "A photo of the item",
                "A letter from a teacher"
              ],
              "answer": 1
            },
            {
              "q": "When can a lost laptop be collected?",
              "options": [
                "At any time",
                "On weekdays between 10 a.m. and 4 p.m.",
                "Only at weekends",
                "After 30 days"
              ],
              "answer": 1
            },
            {
              "q": "What happens to an umbrella after a week?",
              "options": [
                "It is sold.",
                "It is kept in a locked cabinet.",
                "It is thrown away.",
                "It is given to charity."
              ],
              "answer": 3
            }
          ]
        }
      ],
      "academic": [
        {
          "id": "t3-a2",
          "title": "The First Postage Stamp",
          "text": "Before 1840, sending a letter in Britain was complicated and expensive. The price depended on the distance and on the number of sheets of paper, and it was usually paid by the person who received the letter, not the sender. Many people refused to pay, and the letters had to be taken back, which cost the postal service money.\n\nA teacher and reformer named Rowland Hill proposed a simple solution. He suggested a single low price for any letter of a certain weight sent anywhere in the country, paid in advance by the sender. To show that the price had been paid, the sender would attach a small printed label to the letter.\n\nIn May 1840, the first adhesive postage stamp, known as the Penny Black, was introduced. It showed a portrait of Queen Victoria and cost one penny. The new system was a great success: the number of letters sent in Britain increased dramatically in the following years. Soon, other countries copied the idea, and Brazil became one of the first, issuing its own stamps in 1843.",
          "questions": [
            {
              "q": "Who usually paid for letters before 1840?",
              "options": [
                "The sender",
                "The government",
                "The person who received them",
                "The postal workers"
              ],
              "answer": 2
            },
            {
              "q": "What problem did the old system cause?",
              "options": [
                "Some people refused to pay, and letters had to be returned.",
                "Letters were often lost.",
                "Stamps were too expensive.",
                "There were not enough post offices."
              ],
              "answer": 0
            },
            {
              "q": "What was the main idea of Rowland Hill’s proposal?",
              "options": [
                "Different prices for each city",
                "Free letters for teachers",
                "A tax on paper",
                "A single low price paid in advance by the sender"
              ],
              "answer": 3
            },
            {
              "q": "What happened after the Penny Black was introduced?",
              "options": [
                "People stopped writing letters.",
                "The price of letters went up.",
                "The number of letters increased greatly.",
                "Brazil banned British stamps."
              ],
              "answer": 2
            }
          ]
        }
      ]
    },
    "hard": {
      "ctw": [
        {
          "id": "t3-ctw-3",
          "text": "Psychologists use the term confirmation bias for a persistent tendency in human reasoning. People tend to search for, interpret and remember information in ways that support what they already believe, while giving less attention to evidence that contradicts their views. This tendency is not limited to strongly held political opinions; it can affect scientists evaluating their own hypotheses, doctors forming a diagnosis and investors judging the prospects of a company in which they have already invested."
        }
      ],
      "daily": [
        {
          "id": "t3-d4",
          "kind": "email",
          "title": "Subject: Research grant applications — new requirements",
          "body": "Dear applicants,\n\nPlease be aware that the guidelines for this year's Early Career Research Grants have changed in two important respects.\n\nFirst, applications must now include a data management plan of no more than two pages, describing how research data will be stored, shared and protected. Applications without this plan will be returned without review.\n\nSecond, the maximum budget has been raised from R$ 40,000 to R$ 60,000. However, equipment purchases may not exceed 30 per cent of the total requested.\n\nThe deadline remains 15 September at 5 p.m. Late submissions cannot be accepted under any circumstances.\n\nResearch Office",
          "questions": [
            {
              "q": "What will happen to an application without a data management plan?",
              "options": [
                "It will receive a lower score.",
                "It will be returned without being evaluated.",
                "It will be accepted if submitted early.",
                "It will be reviewed after the deadline."
              ],
              "answer": 1
            },
            {
              "q": "What is the maximum that can be spent on equipment in a R$ 60,000 application?",
              "options": [
                "R$ 18,000",
                "R$ 12,000",
                "R$ 30,000",
                "R$ 40,000"
              ],
              "answer": 0
            },
            {
              "q": "What has NOT changed this year?",
              "options": [
                "The maximum budget",
                "The required documents",
                "The rules for submitting applications",
                "The deadline"
              ],
              "answer": 3
            }
          ]
        }
      ],
      "academic": [
        {
          "id": "t3-a3",
          "title": "Keystone Species",
          "text": "In the 1960s, the ecologist Robert Paine conducted a simple but influential experiment on the rocky shores of the north-west coast of the United States. In one area, he repeatedly removed a species of predatory starfish and threw it back into the sea; a nearby area was left untouched for comparison. Within a few years, the community in the experimental area had changed dramatically. Mussels, previously kept in check by the starfish, spread across the rocks and crowded out many other organisms. The number of species in the area fell sharply.\n\nPaine used the term keystone species to describe organisms like the starfish, whose effect on their ecosystem is disproportionately large relative to their abundance. The metaphor comes from architecture: the keystone is the wedge-shaped stone at the top of an arch, which holds the other stones in place. Remove it, and the arch collapses.\n\nAnother frequently cited example is the sea otter of the North Pacific. Otters feed on sea urchins, which in turn graze on kelp, a large seaweed that forms underwater forests. Where otters were hunted almost to extinction, urchin populations exploded and the kelp forests were reduced to barren areas. Where otters returned, the kelp often recovered, along with the fish and other species that depend on it.\n\nThe concept has had a considerable influence on conservation, since it suggests that protecting certain species may protect entire communities. Critics caution, however, that identifying keystone species is difficult in practice: their importance may only become evident after they have disappeared, and the same species may play a keystone role in one location but not in another.",
          "questions": [
            {
              "q": "What did Paine observe in the area where the starfish were removed?",
              "options": [
                "The starfish returned within weeks.",
                "Mussels spread and the number of species decreased.",
                "The number of species increased.",
                "Mussels disappeared from the rocks."
              ],
              "answer": 1
            },
            {
              "q": "Why did Paine leave a nearby area untouched?",
              "options": [
                "To compare it with the experimental area",
                "Because it had no starfish",
                "Because it was too dangerous to work there",
                "To study the mussels separately"
              ],
              "answer": 0
            },
            {
              "q": "The phrase “kept in check” in paragraph 1 is closest in meaning to",
              "options": [
                "protected",
                "counted",
                "controlled",
                "fed"
              ],
              "answer": 2
            },
            {
              "q": "Why does the author mention the architectural keystone?",
              "options": [
                "To describe the shape of the starfish",
                "To explain why the term is used for species with a large effect",
                "To show how rocks form on the shore",
                "To compare ecosystems with buildings in cities"
              ],
              "answer": 1
            },
            {
              "q": "Which difficulty with the concept is mentioned in the last paragraph?",
              "options": [
                "Keystone species are always very common.",
                "The concept cannot be applied to the sea.",
                "A species’ keystone role may only be noticed after it disappears.",
                "Conservation laws do not protect keystone species."
              ],
              "answer": 2
            }
          ]
        }
      ]
    }
  },
  "listening": {
    "m1": {
      "choose": [
        {
          "id": "t3-c1",
          "speaker": "Man",
          "line": "Did you remember to send the invitations?",
          "options": [
            "Yes, I sent them all this morning.",
            "I remember the party very well.",
            "No, I didn’t invite the post office.",
            "They were very nice invitations."
          ],
          "answer": 0
        },
        {
          "id": "t3-c2",
          "speaker": "Woman",
          "line": "This printer isn’t working again.",
          "options": [
            "I printed it again yesterday.",
            "It works in the library.",
            "Yes, it’s a new printer.",
            "Let me call technical support."
          ],
          "answer": 3
        },
        {
          "id": "t3-c3",
          "speaker": "Man",
          "line": "How was your weekend?",
          "options": [
            "It’s at the end of the week.",
            "Relaxing — I mostly stayed at home and read.",
            "I’ll spend it with my family.",
            "Yes, it was on Saturday."
          ],
          "answer": 1
        },
        {
          "id": "t3-c4",
          "speaker": "Woman",
          "line": "Is there anything I can do to help with the move?",
          "options": [
            "I moved here last year.",
            "The removal van is white.",
            "No, I can’t move at all.",
            "Could you bring some boxes on Friday?"
          ],
          "answer": 3
        },
        {
          "id": "t3-c5",
          "speaker": "Man",
          "line": "I didn’t know you spoke Japanese.",
          "options": [
            "I didn’t know either.",
            "Japanese food is delicious.",
            "Only a little — I lived in Osaka for a year.",
            "Yes, I spoke to them yesterday."
          ],
          "answer": 2
        },
        {
          "id": "t3-c6",
          "speaker": "Woman",
          "line": "When’s the deadline for the scholarship application?",
          "options": [
            "The end of this month, I think.",
            "I applied for it at the bank.",
            "It’s a generous scholarship.",
            "The dead line was cut."
          ],
          "answer": 0
        }
      ],
      "audio": [
        {
          "id": "t3-l1",
          "kind": "conversation",
          "title": "A student and a professor",
          "lines": [
            {
              "speaker": "Student",
              "text": "Professor Lin, could I ask you about my essay topic?"
            },
            {
              "speaker": "Professor",
              "text": "Of course. You chose renewable energy policy in Germany, didn’t you?"
            },
            {
              "speaker": "Student",
              "text": "Yes, but I’ve found that most of the important sources are only in German, and I can’t read them."
            },
            {
              "speaker": "Professor",
              "text": "I see. That would make it hard to do the topic justice. Have you thought about another country?"
            },
            {
              "speaker": "Student",
              "text": "I was thinking of Brazil, actually. There’s a lot of material on wind power in the north-east."
            },
            {
              "speaker": "Professor",
              "text": "That sounds like a good alternative, and you’d have access to sources in Portuguese and English. Just send me a short paragraph describing your new focus by Friday, so I can approve the change."
            }
          ],
          "questions": [
            {
              "q": "Why does the student want to change the essay topic?",
              "options": [
                "The main sources are in a language the student cannot read.",
                "The topic is too easy.",
                "The professor rejected the topic.",
                "There is no information about Germany."
              ],
              "answer": 0
            },
            {
              "q": "What does the professor ask the student to do?",
              "options": [
                "Learn German",
                "Write the whole essay by Friday",
                "Send a short description of the new topic by Friday",
                "Choose a topic about Germany"
              ],
              "answer": 2
            }
          ]
        },
        {
          "id": "t3-l2",
          "kind": "announcement",
          "title": "An announcement about a career fair",
          "lines": [
            {
              "speaker": "Announcer",
              "text": "The annual Career Fair will take place next Wednesday in the Sports Hall from 10 a.m. to 4 p.m. More than sixty companies and public institutions will be present, including engineering firms, banks and research centres. Students are encouraged to bring printed copies of their CV. Free CV-checking sessions will be offered by the Careers Office on Monday and Tuesday; places are limited and must be booked online. Please note that the Sports Hall will be closed for sports activities all day on Wednesday."
            }
          ],
          "questions": [
            {
              "q": "What are students advised to bring to the fair?",
              "options": [
                "Their sports equipment",
                "A letter from a professor",
                "A list of companies",
                "Printed copies of their CV"
              ],
              "answer": 3
            },
            {
              "q": "What is offered on Monday and Tuesday?",
              "options": [
                "Interviews with companies",
                "Sessions to check students’ CVs",
                "Sports activities",
                "A tour of the research centres"
              ],
              "answer": 1
            }
          ]
        },
        {
          "id": "t3-l3",
          "kind": "talk",
          "title": "A lecture in a geology class",
          "lines": [
            {
              "speaker": "Professor",
              "text": "Let’s talk about how caves form. Most large caves in the world are found in limestone, a rock made mainly of calcium carbonate."
            },
            {
              "speaker": "Professor",
              "text": "Rainwater is not pure water. As it falls through the air and passes through soil, it absorbs carbon dioxide and becomes a weak acid. When this slightly acidic water seeps into cracks in limestone, it slowly dissolves the rock. Over tens of thousands of years, small cracks can grow into passages and large chambers."
            },
            {
              "speaker": "Professor",
              "text": "The same chemistry also works in reverse. When water containing dissolved limestone drips from the ceiling of a cave, some carbon dioxide escapes into the air, and the mineral is deposited again. That’s how stalactites and stalagmites form — very slowly, often just a few millimetres per century."
            }
          ],
          "questions": [
            {
              "q": "Why are most large caves found in limestone?",
              "options": [
                "Limestone can be dissolved by slightly acidic water.",
                "Limestone is the hardest type of rock.",
                "Limestone contains a lot of water.",
                "Limestone is found only underground."
              ],
              "answer": 0
            },
            {
              "q": "How does rainwater become acidic?",
              "options": [
                "By mixing with sea water",
                "By absorbing carbon dioxide from the air and soil",
                "By dissolving limestone",
                "By freezing in cracks"
              ],
              "answer": 1
            },
            {
              "q": "What does the professor say about stalactites?",
              "options": [
                "They form in a few years.",
                "They are made of ice.",
                "They dissolve the cave ceiling.",
                "They grow extremely slowly."
              ],
              "answer": 3
            }
          ]
        }
      ]
    },
    "easy": {
      "choose": [
        {
          "id": "t3-c7",
          "speaker": "Man",
          "line": "Would you like some more coffee?",
          "options": [
            "Yes, I like it here.",
            "It’s more expensive.",
            "No, thanks. I’ve had enough.",
            "I made it yesterday."
          ],
          "answer": 2
        },
        {
          "id": "t3-c8",
          "speaker": "Woman",
          "line": "What are you doing after class?",
          "options": [
            "I did it before class.",
            "The class is after lunch.",
            "I’m going to the gym.",
            "I’m a good student."
          ],
          "answer": 2
        },
        {
          "id": "t3-c9",
          "speaker": "Man",
          "line": "Is it far to the train station?",
          "options": [
            "The train is very fast.",
            "Yes, I trained there.",
            "It’s at the station.",
            "No, it’s only a ten-minute walk."
          ],
          "answer": 3
        },
        {
          "id": "t3-c10",
          "speaker": "Woman",
          "line": "I’m sorry I’m late.",
          "options": [
            "Don’t worry, we’ve just started.",
            "I’m late too, thanks.",
            "Yes, it’s very late.",
            "Sorry, I don’t know."
          ],
          "answer": 0
        }
      ],
      "audio": [
        {
          "id": "t3-l4",
          "kind": "conversation",
          "title": "A student at the housing office",
          "lines": [
            {
              "speaker": "Student",
              "text": "Hello. The heater in my room hasn’t worked since Sunday."
            },
            {
              "speaker": "Officer",
              "text": "I’m sorry to hear that. What’s your room number?"
            },
            {
              "speaker": "Student",
              "text": "It’s 214, in North Hall."
            },
            {
              "speaker": "Officer",
              "text": "OK. I’ll send a technician tomorrow morning. Will you be in?"
            },
            {
              "speaker": "Student",
              "text": "No, I have classes until one."
            },
            {
              "speaker": "Officer",
              "text": "That’s fine. The technician can go in with a master key, unless you prefer to be there."
            },
            {
              "speaker": "Student",
              "text": "No, that’s OK. Thank you."
            }
          ],
          "questions": [
            {
              "q": "What is the student’s problem?",
              "options": [
                "The room is too small.",
                "The heater is not working.",
                "The student lost the key.",
                "The window is broken."
              ],
              "answer": 1
            },
            {
              "q": "How will the technician enter the room?",
              "options": [
                "With the student’s key",
                "After one o’clock, with the student",
                "Through the window",
                "With a master key"
              ],
              "answer": 3
            }
          ]
        },
        {
          "id": "t3-l5",
          "kind": "talk",
          "title": "A short talk about the colour of the sky",
          "lines": [
            {
              "speaker": "Lecturer",
              "text": "Why is the sky blue? Sunlight looks white, but it is really a mixture of all the colours of the rainbow."
            },
            {
              "speaker": "Lecturer",
              "text": "When sunlight enters the atmosphere, it hits tiny particles of gas. These particles scatter blue light much more than red light, because blue light has a shorter wavelength. So when we look at the sky, we see blue light coming from every direction."
            },
            {
              "speaker": "Lecturer",
              "text": "At sunset, the light has to travel through much more air to reach our eyes. Most of the blue light is scattered away before it arrives, and the light that is left is mainly orange and red. That’s why sunsets are so colourful."
            }
          ],
          "questions": [
            {
              "q": "According to the lecturer, what is sunlight?",
              "options": [
                "A mixture of all colours",
                "Only blue light",
                "Only white light",
                "Mainly red light"
              ],
              "answer": 0
            },
            {
              "q": "Why is blue light scattered more?",
              "options": [
                "It is brighter.",
                "It is warmer.",
                "It has a shorter wavelength.",
                "It comes from the sea."
              ],
              "answer": 2
            },
            {
              "q": "Why are sunsets orange and red?",
              "options": [
                "The sun becomes colder.",
                "Most of the blue light is scattered before it reaches us.",
                "Clouds reflect red light.",
                "The air is cleaner in the evening."
              ],
              "answer": 1
            }
          ]
        }
      ]
    },
    "hard": {
      "choose": [
        {
          "id": "t3-c11",
          "speaker": "Man",
          "line": "I take it you weren’t particularly impressed by the keynote speaker.",
          "options": [
            "I took it with me, thanks.",
            "The speaker was particularly tall.",
            "Yes, I gave the keynote last year.",
            "Not really — it was mostly things we already knew."
          ],
          "answer": 3
        },
        {
          "id": "t3-c12",
          "speaker": "Woman",
          "line": "Had I known the meeting was cancelled, I wouldn’t have come all this way.",
          "options": [
            "I’m sorry — I thought someone had emailed you.",
            "Yes, you would have come.",
            "The way is quite long, isn’t it?",
            "I didn’t know you had a meeting room."
          ],
          "answer": 0
        },
        {
          "id": "t3-c13",
          "speaker": "Man",
          "line": "Do you reckon the committee will approve the budget as it stands?",
          "options": [
            "It stands next to the committee room.",
            "I doubt it — they’ll probably ask for cuts.",
            "I reckon the budget is in the drawer.",
            "Yes, they stood up to approve it."
          ],
          "answer": 1
        },
        {
          "id": "t3-c14",
          "speaker": "Woman",
          "line": "It might be worth checking whether the lab is free before we set everything up.",
          "options": [
            "It’s worth about three thousand reais.",
            "The lab was set up last year.",
            "Good point — I’ll ask the technician now.",
            "I’m free on Tuesdays, actually."
          ],
          "answer": 2
        }
      ],
      "audio": [
        {
          "id": "t3-l6",
          "kind": "announcement",
          "title": "An announcement about examination rules",
          "lines": [
            {
              "speaker": "Announcer",
              "text": "This is a reminder of the regulations for end-of-term examinations. Students must arrive at least fifteen minutes before the start of each exam and present a photo identity document. Anyone arriving more than thirty minutes after the start will not be admitted. Mobile phones and smartwatches must be switched off and left in the bags at the front of the room; possession of an electronic device during the exam will be treated as a breach of the regulations, whether or not it is used. Students with approved special arrangements should go directly to Room 12."
            }
          ],
          "questions": [
            {
              "q": "What happens to a student who arrives forty minutes late?",
              "options": [
                "The student loses fifteen minutes.",
                "The student is not allowed to enter.",
                "The student must go to Room 12.",
                "The student must show a photo document."
              ],
              "answer": 1
            },
            {
              "q": "What is said about mobile phones?",
              "options": [
                "They may be used as calculators.",
                "They must be given to the examiner.",
                "They may be kept if they are switched off.",
                "Having one during the exam is a breach even if it is not used."
              ],
              "answer": 3
            }
          ]
        },
        {
          "id": "t3-l7",
          "kind": "talk",
          "title": "A lecture in an economics class",
          "lines": [
            {
              "speaker": "Professor",
              "text": "Today’s topic is network effects. A product has a network effect when its value to each user increases as more people use it. The classic example is the telephone: a single telephone is useless; two are of limited value; millions make the system indispensable."
            },
            {
              "speaker": "Professor",
              "text": "Network effects help explain why some markets tend towards a single dominant firm. Once a platform has more users than its rivals, it becomes more attractive to new users, which increases its lead. Economists sometimes describe such markets as “winner-take-most”."
            },
            {
              "speaker": "Professor",
              "text": "Now, this has an important implication for competition policy. A dominant platform may not be dominant because its product is technically superior. Users may stay simply because everyone else is there — switching would mean losing contact with their network. So regulators can’t assume that a firm’s market share reflects consumer preference alone."
            }
          ],
          "questions": [
            {
              "q": "What is a network effect?",
              "options": [
                "An increase in a product’s value as more people use it",
                "A fall in prices when there are many competitors",
                "A technical improvement in telephones",
                "The growth of computer networks"
              ],
              "answer": 0
            },
            {
              "q": "Why does the professor mention the telephone?",
              "options": [
                "To describe a technically superior product",
                "To explain the history of competition law",
                "To give a clear example of a network effect",
                "To show that old technology is useless"
              ],
              "answer": 2
            },
            {
              "q": "What implication for regulators does the professor point out?",
              "options": [
                "Dominant firms always have better products.",
                "Network effects make markets more competitive.",
                "Users can easily switch between platforms.",
                "A large market share may not mean that users prefer the product."
              ],
              "answer": 3
            }
          ]
        }
      ]
    }
  },
  "writing": {
    "buildSentenceIds": [
      "bs-007",
      "bs-005",
      "bs-009",
      "bs-023",
      "bs-029",
      "bs-026",
      "bs-038",
      "bs-048",
      "bs-050",
      "bs-052"
    ],
    "email": {
      "id": "t3-email",
      "situation": "Last weekend you stayed at the Hotel Vista Mar. After returning home, you realised that you had left a jacket in your room. Write an email to the hotel.",
      "bullets": [
        "Explain when you stayed and which room you had.",
        "Describe the jacket.",
        "Explain how you would like to get it back."
      ],
      "model": "Dear Sir or Madam,\n\nI stayed at the Hotel Vista Mar from Friday 12 to Sunday 14 April, in room 507. When I unpacked my suitcase at home, I realised that I had left my jacket in the room, probably in the wardrobe next to the door.\n\nThe jacket is dark green and made of light waterproof material, with a hood and two zip pockets. It is a medium size, and there may be a small notebook in the left pocket.\n\nIf you have found it, I would be very grateful if you could send it to me by post. I am happy to pay the postage costs, either by bank transfer or by card over the phone. My address is Rua das Flores 230, Curitiba. Alternatively, a friend of mine will be in your city next week and could collect it from reception.\n\nThank you very much for your help.\n\nKind regards,\nBeatriz Lopes"
    },
    "discussion": {
      "id": "t3-discussion",
      "professor": "Professor Mendes",
      "prompt": "Many universities require students to take some courses outside their main field — for example, engineering students taking philosophy, or literature students taking statistics. Some people think this creates well-rounded graduates. Others believe it wastes time that could be spent developing specialist knowledge. What is your opinion? Should universities require courses outside students’ main field?",
      "posts": [
        {
          "name": "Kenji",
          "text": "I support the requirement. Many real-world problems need knowledge from several areas. An engineer designing a city transport system needs to understand people and society, not only machines. Courses outside our field teach us to think differently."
        },
        {
          "name": "Laura",
          "text": "I see the benefits, but degrees are already long and expensive. If I have to take courses that are not related to my career, I may graduate later and with more debt. I think students should be able to choose whether to take these courses or not."
        }
      ],
      "model": "I agree with Kenji that broad knowledge is valuable, but Laura raises a practical concern that universities should take seriously. In my view, the best approach is to require a small number of courses outside the main field, while giving students real freedom to choose them. For instance, an engineering student might take economics or a foreign language, which are clearly useful in many careers. This way, students gain different perspectives without adding much time or cost to their degree. In my own experience, an introductory psychology course I took has helped me understand teamwork in group projects, which I did not expect. A limited, flexible requirement seems to offer the advantages of both positions."
    }
  },
  "speaking": {
    "repeatContext": "You are being trained to work at the information desk of an airport. Listen to your supervisor and repeat exactly what she says.",
    "repeat": [
      "Good morning. How can I help you?",
      "The check-in desks are on the left.",
      "Please have your passport ready.",
      "Flight two hundred is delayed by forty minutes.",
      "Liquids must be placed in a clear plastic bag.",
      "Passengers for international flights should go to the upper level.",
      "The shuttle to the city centre leaves every twenty minutes from exit four."
    ],
    "interviewContext": "A researcher is interviewing you about food and eating habits.",
    "interview": [
      {
        "q": "How often do you cook at home, and what kind of food do you usually prepare?",
        "model": "I cook at home most evenings, but usually something simple. I often make rice and beans with some grilled chicken or eggs, and a salad. At weekends I have more time, so I sometimes try new recipes, especially pasta dishes."
      },
      {
        "q": "Describe a meal that is important in your family or culture.",
        "model": "In my family, Sunday lunch is very important. My grandmother usually prepares a big meal, often feijoada or roast chicken with farofa, and all my aunts, uncles and cousins come. It’s the one time of the week when everyone is together, so it’s more about the conversation than the food."
      },
      {
        "q": "Some people say that young people today eat too much fast food. Do you agree?",
        "model": "Partly. Fast food is cheap and convenient, so many students eat it when they are busy. But I also see a lot of young people interested in healthy eating and cooking, partly because of social media. So I think the situation is mixed rather than simply negative."
      },
      {
        "q": "Should schools teach students how to cook? Why or why not?",
        "model": "Yes, I think so. Cooking is a basic life skill, and many people leave home without knowing how to prepare a simple meal. School lessons could also teach nutrition and how to plan a budget, which would help students eat better and save money later."
      }
    ]
  }
};
