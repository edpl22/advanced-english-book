import type { ChooseResponse, CtwPassage, DiscussionTask, EmailTask } from './types';

/**
 * Extra items for "practise one task" mode, beyond those inside the six
 * complete tests. All prompts, scripts and model answers are original.
 */
export const PRACTICE_CHOOSE: ChooseResponse[] = [
  {
    "id": "pb-c001",
    "speaker": "Woman",
    "line": "Do you happen to know what time the post office closes?",
    "options": [
      "I posted it yesterday.",
      "It’s next to the bakery.",
      "No, I didn’t happen to go.",
      "I think it’s open until six."
    ],
    "answer": 3
  },
  {
    "id": "pb-c002",
    "speaker": "Man",
    "line": "I failed my driving test again.",
    "options": [
      "I drove there last week.",
      "Oh no! Will you try again soon?",
      "The test was in English.",
      "Yes, it’s a nice car."
    ],
    "answer": 1
  },
  {
    "id": "pb-c003",
    "speaker": "Woman",
    "line": "Shall I bring anything to the barbecue?",
    "options": [
      "Maybe some drinks, if you don’t mind.",
      "It’s a big barbecue.",
      "I brought it on Sunday.",
      "No, I shall not."
    ],
    "answer": 0
  },
  {
    "id": "pb-c004",
    "speaker": "Man",
    "line": "How long does it take to get to the airport?",
    "options": [
      "It takes off at noon.",
      "The airport is very modern.",
      "About forty minutes by taxi.",
      "I took the plane."
    ],
    "answer": 2
  },
  {
    "id": "pb-c005",
    "speaker": "Woman",
    "line": "Why weren’t you at the meeting this morning?",
    "options": [
      "I had a doctor’s appointment.",
      "The meeting was very long.",
      "Because it’s morning.",
      "I met them this morning."
    ],
    "answer": 0
  },
  {
    "id": "pb-c006",
    "speaker": "Man",
    "line": "Is it OK if I open the window?",
    "options": [
      "The window is made of glass.",
      "Yes, I opened it last time.",
      "Go ahead — it’s quite warm in here.",
      "It’s OK, thank you."
    ],
    "answer": 2
  },
  {
    "id": "pb-c007",
    "speaker": "Woman",
    "line": "Which platform does the train to Santos leave from?",
    "options": [
      "It leaves at the station.",
      "Platform three, but it’s running late.",
      "I’ve been to Santos.",
      "The train is very long."
    ],
    "answer": 1
  },
  {
    "id": "pb-c008",
    "speaker": "Man",
    "line": "I’ve just been promoted to team leader!",
    "options": [
      "I promoted the team too.",
      "The leader is in the office.",
      "Yes, it’s just a team.",
      "That’s fantastic news — you deserve it."
    ],
    "answer": 3
  },
  {
    "id": "pb-c009",
    "speaker": "Woman",
    "line": "Did you manage to fix your bike?",
    "options": [
      "I managed the shop.",
      "It’s a mountain bike.",
      "Yes, I ride every day.",
      "Not yet — I need a new chain."
    ],
    "answer": 3
  },
  {
    "id": "pb-c010",
    "speaker": "Man",
    "line": "Could you recommend a good place for lunch nearby?",
    "options": [
      "The vegetarian restaurant on the corner is excellent.",
      "I had lunch at one.",
      "Yes, it’s nearby.",
      "Lunch is a good meal."
    ],
    "answer": 0
  },
  {
    "id": "pb-c011",
    "speaker": "Woman",
    "line": "I keep forgetting my password.",
    "options": [
      "I forgot it too, thanks.",
      "The password is very long.",
      "Why don’t you use a password manager?",
      "Keep it, please."
    ],
    "answer": 2
  },
  {
    "id": "pb-c012",
    "speaker": "Man",
    "line": "Are you coming to the study group on Thursday?",
    "options": [
      "We studied on Thursday.",
      "Yes, but I might be a few minutes late.",
      "The group is very big.",
      "I’m coming from home."
    ],
    "answer": 1
  },
  {
    "id": "pb-c013",
    "speaker": "Woman",
    "line": "Wouldn’t it be cheaper to buy the books second-hand?",
    "options": [
      "Yes, I bought two hands.",
      "The books are very cheap.",
      "It would be cheaper yesterday.",
      "Probably, but I need the latest edition."
    ],
    "answer": 3
  },
  {
    "id": "pb-c014",
    "speaker": "Man",
    "line": "You look exhausted. Didn’t you sleep well?",
    "options": [
      "Not really — my neighbours had a party.",
      "I look at the clock every night.",
      "I slept in the bed.",
      "Yes, I look tired."
    ],
    "answer": 0
  },
  {
    "id": "pb-c015",
    "speaker": "Woman",
    "line": "I was hoping you could explain the last exercise to me.",
    "options": [
      "I hoped so too.",
      "Of course. Which part is confusing you?",
      "The exercise was last.",
      "Yes, I exercise every day."
    ],
    "answer": 1
  },
  {
    "id": "pb-c016",
    "speaker": "Man",
    "line": "The lecture has been moved to the main auditorium.",
    "options": [
      "The auditorium is very old.",
      "I moved last year.",
      "Thanks for letting me know — I’d have gone to the wrong room.",
      "It was a long lecture."
    ],
    "answer": 2
  },
  {
    "id": "pb-c017",
    "speaker": "Woman",
    "line": "It’s a shame the trip was cancelled.",
    "options": [
      "It was a shame trip.",
      "The trip was very long.",
      "I know. Maybe we can organise it ourselves.",
      "I cancelled it myself."
    ],
    "answer": 2
  },
  {
    "id": "pb-c018",
    "speaker": "Man",
    "line": "Would it be possible to submit the form by email?",
    "options": [
      "The form is possible.",
      "I emailed it last year.",
      "It’s a long form.",
      "Yes, but you’ll need to sign it first."
    ],
    "answer": 3
  },
  {
    "id": "pb-c019",
    "speaker": "Woman",
    "line": "I can’t decide between the two job offers.",
    "options": [
      "I decided last week.",
      "What matters more to you — salary or location?",
      "Both of them are jobs.",
      "Offer them to me, then."
    ],
    "answer": 1
  },
  {
    "id": "pb-c020",
    "speaker": "Man",
    "line": "Haven’t we met somewhere before?",
    "options": [
      "I think so — at Ana’s birthday party, maybe?",
      "We met before lunch.",
      "Somewhere is a nice place.",
      "No, I haven’t eaten."
    ],
    "answer": 0
  }
];

export const PRACTICE_EMAIL: EmailTask[] = [
  {
    "id": "pb-email-01",
    "situation": "You ordered a birthday cake from a bakery for your mother’s party, but when you collected it, the message written on it was wrong. Write an email to the bakery.",
    "bullets": [
      "Describe your order and what was wrong.",
      "Explain how the problem affected you.",
      "Say what you would like the bakery to do."
    ],
    "model": "Dear Doce Sabor Bakery,\n\nOn Saturday I collected a chocolate cake that I had ordered for my mother’s sixtieth birthday (order no. 1187). I asked for the message “Happy Birthday, Mum – 60 years!”, but the cake said “Happy Birthday, Tom”.\n\nI only noticed the mistake when I opened the box at the party, in front of all our guests. Fortunately, everyone laughed, but my mother was a little disappointed, and I was quite embarrassed, as I had planned the surprise for weeks.\n\nThe cake itself was delicious, so I am not asking for a full refund. However, I would appreciate a partial refund or a discount on my next order, and I hope you will check orders more carefully in future.\n\nKind regards,\nSilvia Ramos"
  },
  {
    "id": "pb-email-02",
    "situation": "Your neighbour regularly plays loud music late at night, and it is affecting your sleep before important exams. Write an email to your neighbour.",
    "bullets": [
      "Introduce yourself and explain the problem politely.",
      "Explain why it is particularly difficult for you at the moment.",
      "Suggest a solution."
    ],
    "model": "Dear Mr Castro,\n\nMy name is Eduarda, and I live in flat 302, just above yours. I hope you don’t mind me writing to you directly. Over the last few weeks, I have been able to hear music from your flat quite late at night, sometimes after midnight.\n\nI am a university student, and my final exams start next week. I need to get up very early to study, so it has been difficult for me to sleep properly, and I am finding it hard to concentrate.\n\nI completely understand that you want to enjoy your music. Would it be possible to keep the volume lower after 10 p.m., at least until the end of the month? If you have any concerns about noise from my flat, please let me know as well.\n\nThank you very much for your understanding.\n\nBest wishes,\nEduarda Lima"
  },
  {
    "id": "pb-email-03",
    "situation": "You are organising a farewell party for a colleague who is leaving your company. Write an email to the other colleagues in your department.",
    "bullets": [
      "Explain the reason for the party.",
      "Give details of the date, time and place.",
      "Ask colleagues to do something to help."
    ],
    "model": "Hi everyone,\n\nAs most of you know, Marcos is leaving the company at the end of the month to start a new job in Lisbon. After eight years in our department, he definitely deserves a proper goodbye, so I am organising a small farewell party.\n\nIt will be on Friday 28 June, from 6 to 9 p.m., at the Bar do Porto, which is just two minutes from the office. I have reserved the terrace, and the bar will provide some snacks.\n\nWe would also like to give Marcos a present. If you would like to contribute, please give me any amount you wish by Wednesday. I am also collecting messages for a card, so please send me a short note by email.\n\nPlease keep it a secret!\n\nThanks,\nJuliana"
  },
  {
    "id": "pb-email-04",
    "situation": "You recently attended a free public lecture at a science museum and found it very useful. Write an email to the museum.",
    "bullets": [
      "Say which lecture you attended.",
      "Explain what you found most useful or interesting.",
      "Suggest a topic for a future lecture."
    ],
    "model": "Dear Museum Education Team,\n\nI am writing to thank you for the public lecture “How Climate Models Work”, given by Dr Paula Freitas last Thursday evening. I attended with two classmates from my environmental science course.\n\nWhat I found most useful was the clear explanation of why different models produce different predictions. Dr Freitas used simple examples and graphs, and for the first time I understood the role of uncertainty in climate science. The questions at the end were also very interesting.\n\nFor a future lecture, I would like to suggest a talk on the science of water scarcity, especially in Brazilian cities. Many people in my region are worried about it, and I am sure the topic would attract a large audience.\n\nThank you again for organising these free events.\n\nBest regards,\nGustavo Pinto"
  },
  {
    "id": "pb-email-05",
    "situation": "You booked a room at a guesthouse for your holiday next month, but the website now shows a different price from the one in your confirmation. Write an email to the guesthouse.",
    "bullets": [
      "Give the details of your booking.",
      "Explain the difference in price you have noticed.",
      "Ask the guesthouse to confirm the correct price."
    ],
    "model": "Dear Pousada Mar Azul,\n\nI booked a double room at your guesthouse for three nights, from 14 to 17 July, under the name Renata Souza. My confirmation email, dated 2 May, states a total price of R$ 840, including breakfast.\n\nHowever, when I checked my booking on your website yesterday, the total price shown was R$ 1,020. I have not made any changes to my reservation, so I am not sure why the price is different. It is possible that the website is showing the current price rather than the price I agreed.\n\nCould you please confirm that the price in my original confirmation will be honoured? I have attached a copy of the confirmation email for your reference.\n\nThank you in advance, and I look forward to my stay.\n\nKind regards,\nRenata Souza"
  },
  {
    "id": "pb-email-06",
    "situation": "Your English teacher has asked students to suggest an activity for the last class of the semester. Write an email to your teacher.",
    "bullets": [
      "Describe the activity you suggest.",
      "Explain why it would be useful or enjoyable.",
      "Offer to help organise it."
    ],
    "model": "Dear Ms Turner,\n\nThank you for asking for our suggestions for the last class of the semester. I would like to suggest a short film festival. Students could work in small groups to create a three-minute video in English about our city, and then we could watch all the videos together in class.\n\nI think this activity would be both useful and enjoyable. Writing the scripts and recording the videos would give us a lot of speaking practice, and working in groups would be a fun way to end the semester. We could also vote for the best film in different categories.\n\nIf you like the idea, I would be happy to help organise it. I could prepare a simple set of instructions and help set up the projector on the day.\n\nBest wishes,\nMateus Rocha"
  },
  {
    "id": "pb-email-07",
    "situation": "A company that sells running shoes has asked customers to give feedback on a product. You bought a pair three months ago. Write an email to the company.",
    "bullets": [
      "Say which product you bought and how you use it.",
      "Describe one positive and one negative aspect.",
      "Suggest an improvement."
    ],
    "model": "Dear RunFast team,\n\nThank you for asking for my opinion. Three months ago I bought a pair of RunFast Pro 3 shoes, and since then I have used them for running about four times a week, mostly on city streets and sometimes in parks.\n\nI am very happy with the comfort of the shoes. The cushioning is excellent, and even after long runs my knees and feet do not hurt. However, the outer sole has worn down much faster than I expected, especially at the heel, so I am worried that the shoes will not last very long.\n\nI would suggest using a more resistant material on the parts of the sole that receive the most impact. I would be happy to pay a little more for shoes that last longer.\n\nBest regards,\nPriscila Dantas"
  },
  {
    "id": "pb-email-08",
    "situation": "You have moved to a new city for your studies and want to join a local volunteer organisation. Write an email to the organisation.",
    "bullets": [
      "Introduce yourself and explain why you want to volunteer.",
      "Describe any relevant skills or experience.",
      "Ask about the next steps."
    ],
    "model": "Dear Amigos do Bairro team,\n\nMy name is Henrique Alves, and I have just moved to Porto Alegre to study social work at the federal university. I saw your website and was very interested in your after-school programme for children, and I would love to join as a volunteer.\n\nIn my home town I volunteered for two years at a community centre, where I helped children with their homework and organised sports activities on Saturdays. I am patient, I enjoy working with young people, and I am available on Tuesday and Thursday afternoons.\n\nCould you please tell me what the next steps would be? I would be happy to come for an interview or attend a training session, and I can provide references from the community centre if necessary.\n\nThank you for your time.\n\nBest regards,\nHenrique Alves"
  },
  {
    "id": "pb-email-09",
    "situation": "You borrowed a camera from a friend for a trip, and it was accidentally damaged. Write an email to your friend.",
    "bullets": [
      "Explain what happened to the camera.",
      "Apologise and describe how you feel.",
      "Suggest how you will solve the problem."
    ],
    "model": "Hi Bia,\n\nI’m really sorry, but I have some bad news about your camera. On the last day of the trip, we were walking near a waterfall and I slipped on a wet rock. I didn’t fall badly, but the camera hit the ground, and now the lens doesn’t close properly.\n\nI feel terrible about it, especially because you were kind enough to lend it to me. I know how much you use it, and I should have kept it in its case on the trail.\n\nI’ve already taken it to a repair shop near my house, and they said they can fix it in about a week. I will of course pay for the repair. If it can’t be repaired properly, I’ll buy you a new lens. Let me know what you prefer.\n\nSorry again,\nCaio"
  },
  {
    "id": "pb-email-10",
    "situation": "Your university is planning to close the student cafeteria in the evenings to save money. Write an email to the Student Services director.",
    "bullets": [
      "Explain how the change would affect students.",
      "Give an example of a group of students who would be most affected.",
      "Suggest an alternative to closing the cafeteria."
    ],
    "model": "Dear Dr Monteiro,\n\nI am writing as a representative of the evening students’ association about the plan to close the student cafeteria in the evenings. We understand the need to reduce costs, but we believe this change would have a serious impact on many students.\n\nThe group most affected would be evening students, many of whom work during the day and come straight to the university without time to eat. For them, the cafeteria is the only affordable place to have a proper meal before classes that finish at 10:30 p.m.\n\nAs an alternative, we would like to suggest keeping the cafeteria open with a reduced menu and fewer staff, or installing vending machines with healthy, low-cost meals. We would be glad to discuss these options with you.\n\nYours sincerely,\nAdriana Melo"
  },
  {
    "id": "pb-email-11",
    "situation": "You saw an advertisement for a part-time job as a tour guide at a historic building. Write an email to apply for the job.",
    "bullets": [
      "Say where you saw the advertisement and which job you are applying for.",
      "Describe why you would be suitable.",
      "Say when you are available."
    ],
    "model": "Dear Sir or Madam,\n\nI am writing to apply for the part-time tour guide position at the Palácio da Liberdade, which I saw advertised on your website last week.\n\nI am a second-year history student, and I am particularly interested in the architecture and politics of the nineteenth century, so I would be very excited to share the history of the palace with visitors. I speak Portuguese, English and some Spanish, and I have experience of speaking in public from presenting projects at university and taking part in a debate club.\n\nI am available on weekends and on Wednesday afternoons, and I could start next month. I have attached my CV and would be happy to attend an interview at your convenience.\n\nYours faithfully,\nVinícius Barros"
  },
  {
    "id": "pb-email-12",
    "situation": "You took part in a group project, but one member of the group did not contribute. Write an email to your professor.",
    "bullets": [
      "Describe the project and the problem.",
      "Explain what the group has already done to solve it.",
      "Ask the professor for advice or action."
    ],
    "model": "Dear Professor Duarte,\n\nI am writing about our group project for Urban Planning, the study of public transport in the eastern districts, which is due on 30 November. Our group has four members, but one of them has not contributed to the work for the past month.\n\nWe have tried to solve the problem ourselves. We sent several messages asking this student to complete their section, invited them to our weekly meetings and even offered to change their task, but they have not replied or attended.\n\nWe are worried that this will affect the quality of the project and that the final grade will not reflect the work of the three active members. Could you please advise us on what to do? We would be grateful if we could discuss this with you during your office hours.\n\nKind regards,\nLarissa Freire"
  },
  {
    "id": "pb-email-13",
    "situation": "A friend from another country is going to visit your city for the first time. Write an email to your friend.",
    "bullets": [
      "Recommend two places to visit.",
      "Give advice about transport or safety.",
      "Suggest something you could do together."
    ],
    "model": "Hi Emma,\n\nI’m so glad you’re finally coming to Salvador! You’ll love it here. There are two places you really shouldn’t miss. The first is Pelourinho, the historic centre, with its colourful buildings and live music in the squares. The second is the Barra lighthouse, where you can watch one of the most beautiful sunsets in the world.\n\nFor getting around, I’d recommend using app taxis at night, as some areas can be quiet and not very safe after dark. During the day, the buses are cheap, but they can be crowded, so keep your phone and wallet in a safe place.\n\nI’d love to take you to a beach outside the city one weekend — maybe Praia do Forte. We could spend the day there and have fresh fish for lunch. What do you think?\n\nSee you soon!\nLívia"
  },
  {
    "id": "pb-email-14",
    "situation": "You recently bought a monthly subscription to an online language course, but you are having technical problems. Write an email to customer support.",
    "bullets": [
      "Describe the problem you are having.",
      "Explain how it is affecting your learning.",
      "Say what you would like the company to do."
    ],
    "model": "Dear LinguaPlus Support,\n\nI subscribed to your Advanced English course on 5 March, but since last week I have been unable to watch the video lessons. Every time I click on a video, the screen goes black and an error message appears. I have tried using two different browsers and my phone, but the problem is the same.\n\nThis is very frustrating, because the video lessons are the main part of the course, and I am preparing for an important exam in May. I have now missed a full week of study, which is a quarter of the time I paid for this month.\n\nCould you please fix the problem as soon as possible? I would also appreciate it if you could extend my subscription by one week to compensate for the lost time.\n\nThank you,\nOtávio Matos"
  },
  {
    "id": "pb-email-15",
    "situation": "Your local gym has recently changed its opening hours, and you are not satisfied with the change. Write an email to the gym manager.",
    "bullets": [
      "Describe the change in opening hours.",
      "Explain why it is a problem for you.",
      "Propose a solution."
    ],
    "model": "Dear Ms Albuquerque,\n\nI have been a member of Vida Ativa Gym for three years, and I am writing about the recent change in opening hours. Since 1 August, the gym opens at 7 a.m. instead of 5:30 a.m. on weekdays.\n\nThis change is a real problem for me. I start work at 7:30 a.m., so I used to train from 5:45 to 6:45 before going to the office. In the evenings I often finish work late, and the gym is very crowded at that time. As a result, I have hardly been able to train this month.\n\nI understand that there may be fewer members in the early morning. Perhaps the gym could open early on at least three days a week, or offer a lower price for members who cannot use the new hours. I am sure I am not the only member affected.\n\nYours sincerely,\nFábio Cardoso"
  },
  {
    "id": "pb-email-16",
    "situation": "You have been offered a place on a summer course abroad, but you need more information before accepting. Write an email to the course coordinator.",
    "bullets": [
      "Thank the coordinator for the offer.",
      "Ask about accommodation.",
      "Ask one other question about the course."
    ],
    "model": "Dear Dr Hughes,\n\nThank you very much for offering me a place on the Summer School in Environmental Policy at your university. I am delighted to have been selected and I am very keen to accept.\n\nBefore confirming, I would like to ask about accommodation. The information pack mentions university residences, but it does not say whether rooms are single or shared, or whether meals are included. Could you also tell me whether it is possible to arrive a day early, as the cheapest flights from Brazil arrive on the Saturday?\n\nI would also like to know whether the course includes any assessed work, as my university may be able to recognise it as credits towards my degree.\n\nThank you for your help. I look forward to your reply.\n\nKind regards,\nAna Clara Fontes"
  },
  {
    "id": "pb-email-17",
    "situation": "You left a review of a restaurant online, and the owner replied asking you to explain your negative comments. Write an email to the owner.",
    "bullets": [
      "Explain what happened during your visit.",
      "Describe what disappointed you most.",
      "Say what would make you return to the restaurant."
    ],
    "model": "Dear Mr Bastos,\n\nThank you for replying to my review and for your interest in my experience. My partner and I had dinner at Cantina Bella on Saturday 9 March to celebrate our anniversary. We had a reservation for 8 p.m., but we waited forty minutes for a table, and then another hour for our main courses.\n\nWhat disappointed us most was not the delay itself but the lack of communication. Nobody explained why the food was taking so long, and when we asked, the waiter seemed annoyed. When the pasta finally arrived, it was very good, which made the situation even more frustrating.\n\nWe would be happy to return if we knew that reservations were respected and that staff would keep customers informed when there are delays. I hope my comments are helpful.\n\nBest regards,\nMarcela Tavares"
  },
  {
    "id": "pb-email-18",
    "situation": "You missed an important online seminar because of an internet problem. Write an email to the seminar organiser.",
    "bullets": [
      "Explain why you missed the seminar.",
      "Say why the seminar was important to you.",
      "Ask whether a recording or materials are available."
    ],
    "model": "Dear Dr Seixas,\n\nI was registered for yesterday’s online seminar on “Research Methods in Public Health”, but unfortunately I was unable to attend. Just before the start, there was a power cut in my neighbourhood, and my internet connection was down for the whole afternoon.\n\nThe seminar was particularly important to me because I am starting the data collection for my master’s research next month, and I was hoping to learn more about designing questionnaires, which was one of the main topics.\n\nCould you please tell me whether the session was recorded, and if so, how I could access it? If there is no recording, I would be very grateful if you could send me the slides or any recommended reading.\n\nThank you very much for your help.\n\nBest regards,\nTatiana Correia"
  },
  {
    "id": "pb-email-19",
    "situation": "Your class is planning a trip, and you have been asked to contact a transport company about hiring a bus. Write an email to the company.",
    "bullets": [
      "Explain who you are and what you need.",
      "Give details about the trip.",
      "Ask about the price and any conditions."
    ],
    "model": "Dear ViaSul Transportes,\n\nI am a student at the Federal Institute of Technology, and I am organising a class trip on behalf of my classmates. We would like to hire a bus with a driver for a one-day trip.\n\nThe trip will take place on Saturday 12 October. There will be 38 students and two teachers. We plan to leave the institute at 7 a.m., travel to the Itaipu Dam visitor centre, which is about 150 kilometres away, and return by 8 p.m. the same day.\n\nCould you please send us a quote for this trip? I would also like to know whether the price includes tolls and the driver’s meals, whether the bus has air conditioning and toilets, and what your cancellation policy is.\n\nThank you in advance for your reply.\n\nKind regards,\nDaniel Guerra"
  },
  {
    "id": "pb-email-20",
    "situation": "You received a parcel that was supposed to be delivered to your neighbour. Your neighbour is away on holiday. Write an email to your neighbour.",
    "bullets": [
      "Explain what happened.",
      "Describe the parcel.",
      "Ask what they would like you to do with it."
    ],
    "model": "Hi Sandra,\n\nI hope you’re having a lovely holiday! I just wanted to let you know that a parcel addressed to you was delivered to my flat by mistake this morning. The courier said there was nobody at your door and asked if I could keep it.\n\nIt’s a medium-sized cardboard box, quite light, from an online shop called CasaViva. It looks like it might contain kitchen items, but of course I haven’t opened it. There’s a label saying “Fragile”, so I’ve put it somewhere safe in my living room.\n\nWould you like me to keep it until you come back, or would you prefer me to leave it with the building manager? If it’s something urgent, I could also take it to someone else for you. Just let me know.\n\nEnjoy the rest of your trip!\nRegina"
  },
  {
    "id": "pb-email-21",
    "situation": "You would like to change the topic of your final-year project. Write an email to your supervisor.",
    "bullets": [
      "Explain why you want to change the topic.",
      "Describe the new topic you have in mind.",
      "Ask to arrange a meeting."
    ],
    "model": "Dear Professor Antunes,\n\nI would like to ask whether it would be possible to change the topic of my final-year project. As you know, I originally planned to study the use of solar energy in rural schools. However, after contacting several schools, I discovered that very few have installed solar panels, so it would be difficult to collect enough data.\n\nInstead, I would like to investigate how small businesses in our city are using solar energy to reduce their costs. I have already spoken to the local business association, and they have offered to help me contact around thirty companies. Much of the literature I have read so far would still be relevant.\n\nCould we arrange a meeting next week to discuss this? I am free on Tuesday and Thursday afternoons.\n\nBest regards,\nIgor Paiva"
  },
  {
    "id": "pb-email-22",
    "situation": "You recently stayed in a hostel and were impressed by one of the staff members. Write an email to the hostel manager.",
    "bullets": [
      "Say when you stayed at the hostel.",
      "Describe what the staff member did.",
      "Explain how this affected your stay."
    ],
    "model": "Dear Manager,\n\nI stayed at Hostel Caminho from 3 to 7 September, and I would like to tell you about the excellent service I received from Rodrigo at the reception desk.\n\nOn my second day, I lost my wallet, with my bank cards and identity document, during a walking tour of the city. I was very worried, as I was travelling alone. Rodrigo helped me call my bank to block my cards, showed me how to report the loss to the police, and even phoned the tour company to ask whether anyone had found the wallet. Thanks to him, it was returned the next day.\n\nWhat could have been a disastrous trip became a very positive experience, and I left with a great impression of your hostel. I hope you will pass on my thanks to him.\n\nWith best wishes,\nNatália Coelho"
  },
  {
    "id": "pb-email-23",
    "situation": "A local newspaper has asked readers to suggest ways to improve their town. Write an email to the newspaper.",
    "bullets": [
      "Describe one problem in your town.",
      "Suggest a solution.",
      "Explain how the solution would benefit residents."
    ],
    "model": "Dear Editor,\n\nI am writing in response to your request for suggestions about improving our town. In my opinion, one of the biggest problems is the lack of safe spaces for cycling. More and more people are using bicycles to go to work and school, but there are no cycle lanes on the main roads, and cyclists have to compete with heavy traffic.\n\nI would suggest creating a network of protected cycle lanes connecting the town centre, the bus station and the main schools. Some lanes could be built simply by using part of the wide pavements on Avenida Central.\n\nThis would make cycling safer, especially for teenagers, and encourage more people to leave their cars at home. As a result, there would be less traffic, less pollution and healthier residents.\n\nYours faithfully,\nRoberto Assis"
  },
  {
    "id": "pb-email-24",
    "situation": "You have been invited to speak about your career at your old school, but you cannot attend on the proposed date. Write an email to the teacher who invited you.",
    "bullets": [
      "Thank the teacher for the invitation.",
      "Explain why you cannot attend on that date.",
      "Suggest an alternative."
    ],
    "model": "Dear Mrs Gonçalves,\n\nThank you very much for inviting me to speak to your final-year students about my career in nursing. I have very happy memories of my time at the school, and it would be a real pleasure to come back and talk to the students.\n\nUnfortunately, I will not be able to attend on 15 May, as I will be working a night shift at the hospital that week and will need to sleep during the day.\n\nWould it be possible to arrange another date? I am free on most Fridays in May and June, apart from 7 June. Alternatively, if the date cannot be changed, I could give a short talk online, or record a video answering questions that the students send me in advance.\n\nBest wishes,\nCamila Barreto"
  },
  {
    "id": "pb-email-25",
    "situation": "You bought a second-hand laptop from a website, but it does not match the description in the advertisement. Write an email to the seller.",
    "bullets": [
      "Describe what was promised in the advertisement.",
      "Explain what is different.",
      "Say what you would like the seller to do."
    ],
    "model": "Dear Mr Leite,\n\nLast week I bought a second-hand laptop from you through the website TrocaJá (advertisement no. 55210). The advertisement described it as being “in excellent condition”, with 16 GB of memory and a battery that “lasts around eight hours”.\n\nWhen the laptop arrived, I discovered several differences. It has only 8 GB of memory, there is a large scratch across the screen, and the battery lasts less than two hours, even with low brightness. I have attached photos and a screenshot of the system information.\n\nSince the laptop does not match the description, I would like to return it and receive a full refund, including the delivery costs. If you prefer, I would also accept a partial refund of R$ 600 and keep the laptop. Please let me know which option you choose.\n\nRegards,\nLeonardo Brito"
  },
  {
    "id": "pb-email-26",
    "situation": "Your university library is asking students for feedback about its services. Write an email to the library.",
    "bullets": [
      "Describe one service you find useful.",
      "Describe one problem you have experienced.",
      "Suggest how the library could improve."
    ],
    "model": "Dear Library Team,\n\nThank you for inviting students to give feedback. I use the library almost every day, and I find the online reservation system for books extremely useful. Being able to reserve a book from my phone and collect it the next day saves me a lot of time.\n\nHowever, I have often had difficulty finding a place to study, especially in the weeks before exams. Many seats are occupied by bags or books while their owners are away for hours, so students who arrive later have nowhere to sit.\n\nI would suggest introducing a rule that seats left empty for more than thirty minutes can be used by other students. Another option would be a seat booking system, similar to the one for group study rooms. I believe either measure would make the library much fairer.\n\nBest regards,\nJéssica Moura"
  },
  {
    "id": "pb-email-27",
    "situation": "You have been chosen to represent your class at a meeting with the head of your department. Write an email to your classmates.",
    "bullets": [
      "Explain the purpose of the meeting.",
      "Ask classmates to send you their opinions on a topic.",
      "Give a deadline and explain what you will do next."
    ],
    "model": "Hi everyone,\n\nAs you know, I was chosen as our class representative for this semester. Next Thursday I will be meeting Professor Valente, the head of department, to discuss students’ feedback about the course before the curriculum is reviewed for next year.\n\nI would like to represent everyone’s views, not just my own, so please send me your opinions on the course structure. In particular, I would like to know which subjects you found most useful, which ones could be improved, and whether you think we need more practical classes.\n\nPlease email me your comments by Monday at 6 p.m. I will put them together in a short report, without including anyone’s name, and present it at the meeting. Afterwards, I will share a summary of the discussion with the whole class.\n\nThanks a lot,\nPaulo"
  },
  {
    "id": "pb-email-28",
    "situation": "You lent a book to a classmate several months ago, and they have not returned it. You now need it. Write an email to your classmate.",
    "bullets": [
      "Remind your classmate about the book.",
      "Explain why you need it now.",
      "Suggest how and when they could return it."
    ],
    "model": "Hi Marina,\n\nI hope your semester is going well! I’m writing about the book I lent you in March — “Introduction to Microeconomics” by Mankiw. I know it’s easy to forget about these things, so I just wanted to remind you.\n\nThe reason I’m asking now is that I’ve enrolled in Intermediate Microeconomics this semester, and the professor uses several chapters from that book. Our first assignment is due in two weeks, so I really need it soon.\n\nWould it be possible for you to bring it to university this week? I’m usually in the library on Tuesday and Wednesday afternoons, so we could meet there. If that’s difficult, you could leave it with the secretary at the Economics department, and I’ll collect it.\n\nThanks a lot,\nFelipe"
  },
  {
    "id": "pb-email-29",
    "situation": "Your company is going to introduce a new software system, and you have been asked to collect colleagues’ concerns. Write an email to your manager.",
    "bullets": [
      "Summarise the main concerns of your colleagues.",
      "Give one specific example.",
      "Suggest a way to address the concerns."
    ],
    "model": "Dear Mr Siqueira,\n\nAs requested, I have spoken to colleagues in the sales department about the new customer management software that will be introduced next month. Most people are positive about the change, but there are two main concerns.\n\nFirst, many colleagues are worried that there has not been enough training. At present, only one two-hour session is planned. Second, some people are concerned that customer data might be lost when it is transferred from the old system. For example, Laura mentioned that she has notes on more than three hundred clients that are not stored in the standard fields.\n\nI would suggest organising additional training in smaller groups and keeping the old system available in read-only mode for the first three months, so that any missing information can be recovered.\n\nBest regards,\nCristina Lopes"
  },
  {
    "id": "pb-email-30",
    "situation": "You participated in a marathon that was badly organised. Write an email to the organisers.",
    "bullets": [
      "Describe the problems you experienced.",
      "Explain how they affected you or other runners.",
      "Suggest improvements for next year."
    ],
    "model": "Dear Organising Committee,\n\nI took part in the City Marathon last Sunday, and I would like to share some concerns about the organisation of the event.\n\nThe main problem was the water stations. On the second half of the course, two stations had run out of water by the time I passed, although I was in the middle of the field. On such a hot morning, this was dangerous: I saw several runners who were clearly dehydrated, and one had to receive medical help. In addition, the start was delayed by forty minutes without any announcement.\n\nFor next year, I would suggest increasing the number of water stations and the supply at each one, especially after the twenty-kilometre mark. Clear communication with runners when there are delays would also make a big difference.\n\nI hope these comments are useful.\n\nRegards,\nMarcelo Fonseca"
  },
  {
    "id": "pb-email-31",
    "situation": "You want to apply for a scholarship that requires a recommendation letter. Write an email to a former teacher asking for a letter.",
    "bullets": [
      "Explain what the scholarship is for.",
      "Explain why you are asking this teacher.",
      "Give details about the deadline and what the teacher needs to do."
    ],
    "model": "Dear Professor Moreira,\n\nI hope you are well. I was a student in your Chemistry class in 2023, and I am now in my second year of pharmacy at the State University. I am writing to ask whether you would be willing to write a recommendation letter for me.\n\nI am applying for the Young Scientists Scholarship, which would allow me to spend six months doing research at a laboratory in Portugal. Your classes were the reason I chose pharmacy, and you supervised my science fair project, so I believe you know my abilities and work habits well.\n\nThe letter should be about one page long and must be uploaded directly to the scholarship website by 20 August. I would be happy to send you my CV and a description of the project to help you.\n\nThank you very much for considering my request.\n\nKind regards,\nBeatriz Nogueira"
  },
  {
    "id": "pb-email-32",
    "situation": "A friend has asked for your advice about whether to take a gap year before starting university. Write an email to your friend.",
    "bullets": [
      "Give your opinion about taking a gap year.",
      "Mention one advantage and one risk.",
      "Suggest what your friend could do during the year."
    ],
    "model": "Hi Gabi,\n\nThanks for your message. It’s a big decision, but I think a gap year could be a really good idea for you, as long as you plan it carefully.\n\nThe biggest advantage is that you’d have time to think about what you really want to study. You’ve told me you’re not sure about engineering, and a year of new experiences might help you decide. The risk, though, is that a year without structure can easily be wasted, and some people find it hard to go back to studying afterwards.\n\nIf you decide to do it, I’d suggest finding a part-time job to save some money, and then spending a few months volunteering or doing an intensive language course abroad. You could also try an internship in an engineering company to see if you like it.\n\nTalk soon,\nRafa"
  },
  {
    "id": "pb-email-33",
    "situation": "You would like to rent a room in a shared house that you saw advertised online. Write an email to the landlord.",
    "bullets": [
      "Introduce yourself.",
      "Ask two questions about the room or the house.",
      "Ask to arrange a visit."
    ],
    "model": "Dear Mrs Pacheco,\n\nI saw your advertisement on the website MoradiaFácil for a room in a shared house on Rua das Acácias, and I am very interested. My name is Lucas Medeiros. I am 22 years old and I am starting a master’s degree in biology at the federal university in March, so I am looking for a room for at least two years.\n\nI would like to ask a couple of questions. First, are bills such as electricity, water and internet included in the rent of R$ 900? Second, could you tell me a little about the other people living in the house, and whether there are any house rules?\n\nIf the room is still available, I would be very grateful if we could arrange a visit. I am free most afternoons this week.\n\nKind regards,\nLucas Medeiros"
  },
  {
    "id": "pb-email-34",
    "situation": "You attended a job interview last week and have not yet received a reply. Write an email to the company.",
    "bullets": [
      "Remind the company of your interview.",
      "Restate your interest in the position.",
      "Ask politely about the timeline for a decision."
    ],
    "model": "Dear Ms Caldeira,\n\nI am writing to follow up on my interview for the position of Junior Marketing Analyst, which took place at your office on Tuesday 4 June. I would like to thank you again for the opportunity to meet the team and learn more about the company.\n\nOur conversation confirmed my interest in the role. I was particularly excited to hear about the new campaign for the north-eastern market, as I have experience analysing social media data for regional audiences and would be keen to contribute to the project.\n\nI understand that you may still be interviewing other candidates, but I would be grateful if you could let me know when a decision is expected. Please do not hesitate to contact me if you need any further information.\n\nBest regards,\nAndré Teles"
  }
];

export const PRACTICE_DISCUSSION: DiscussionTask[] = [
  {
    "id": "pb-disc-01",
    "professor": "Dr Carvalho",
    "prompt": "In our sociology class we have been discussing technology and childhood. Some parents give smartphones to children as young as eight, arguing that it keeps them safe and connected. Others think children should not have their own phones until they are teenagers. At what age should children have their own smartphones, and why?",
    "posts": [
      {
        "name": "Isabela",
        "text": "I think around twelve is reasonable. At that age many children start going to school alone, and parents need to contact them. Before that, children are almost always with an adult, so they don’t really need a phone."
      },
      {
        "name": "Jonas",
        "text": "I would wait until fourteen or fifteen. Smartphones give access to social media, which can affect self-esteem and sleep. If safety is the concern, a simple phone without internet is enough for younger children."
      }
    ],
    "model": "I find Jonas’s distinction between a phone and a smartphone very useful. Children who travel alone, as Isabela mentions, do need a way to contact their parents, but that does not require internet access. A basic phone at around eleven or twelve would solve the safety problem without exposing children to social media too early. A smartphone could then come at around fourteen, together with clear rules about screen time and privacy that parents and children agree on. My younger brother received a smartphone at nine, and I noticed that he started sleeping later and spending less time playing outside. That experience makes me think that delaying full access is the wiser choice."
  },
  {
    "id": "pb-disc-02",
    "professor": "Professor Lemos",
    "prompt": "We have been studying how cities change over time. Some historic city centres have banned cars completely, turning streets into pedestrian areas. Supporters say this makes cities more pleasant and attracts visitors. Critics argue that it harms local businesses and makes life difficult for residents. Should historic city centres ban cars? Why or why not?",
    "posts": [
      {
        "name": "Aline",
        "text": "Yes. Historic centres were not built for cars. Narrow streets full of traffic are dangerous and polluted, and they damage old buildings. Pedestrian areas are much more attractive, and research often shows that shops in them actually sell more."
      },
      {
        "name": "Ricardo",
        "text": "I understand the idea, but what about elderly people, disabled residents and deliveries? A total ban could make the centre accessible only to young and healthy people. Restrictions are fine, but not a complete ban."
      }
    ],
    "model": "I support banning private cars from historic centres, but with the kind of exceptions Ricardo describes. Aline is right that narrow old streets are not suitable for heavy traffic, and pedestrian areas usually become livelier and safer. However, a well-designed policy can protect accessibility at the same time. Residents with disabilities could have special permits, deliveries could be allowed in the early morning, and small electric shuttles could connect the centre with car parks on its edge. This is what happened in the historic centre of a city I visited in Portugal, where the streets were full of people but older residents still moved around easily. In my view, the question is not whether to restrict cars, but how to do it fairly."
  },
  {
    "id": "pb-disc-03",
    "professor": "Dr Pires",
    "prompt": "This week our topic is education and assessment. Many universities rely heavily on final exams to evaluate students. Others prefer continuous assessment, such as projects, presentations and weekly assignments throughout the semester. Which approach do you think is better for evaluating students, and why?",
    "posts": [
      {
        "name": "Fernanda",
        "text": "Continuous assessment is better. One exam can be affected by stress, illness or a bad day. When the grade comes from many tasks, it reflects what students have really learned over the whole semester."
      },
      {
        "name": "Hugo",
        "text": "I prefer exams. With continuous assessment, it’s hard to know who really did the work, especially with group projects and online tools. An exam shows what each student can do alone, under the same conditions."
      }
    ],
    "model": "I believe a combination of the two approaches is the most accurate way to evaluate students. Fernanda makes a strong point: a single exam can be unfair to someone who is ill or extremely anxious on that day. At the same time, Hugo’s concern about authorship is increasingly important now that artificial intelligence tools can write essays. A good system might give about half of the grade to continuous work, such as projects and presentations, and half to a final exam taken in class. In one of my courses this semester, we wrote short weekly reflections and then took an exam based on similar questions, and I felt the final grade truly represented my effort and my knowledge. Balance seems fairer than either extreme."
  },
  {
    "id": "pb-disc-04",
    "professor": "Professor Arruda",
    "prompt": "We have been discussing the economics of food. Some experts argue that reducing meat consumption is one of the most effective ways for individuals to reduce their environmental impact. Others say that individual dietary choices make little difference compared with changes in farming and industry. Should people be encouraged to eat less meat? Why or why not?",
    "posts": [
      {
        "name": "Thaís",
        "text": "Yes. Meat production uses huge amounts of land and water and produces a lot of greenhouse gases. If many people ate meat only a few times a week, the impact would be significant. It’s one of the few things everyone can do today."
      },
      {
        "name": "Diego",
        "text": "I think it’s more complicated. In many places, especially in rural areas, meat is an important source of income and nutrition. Instead of telling people what to eat, governments should support farmers to use more sustainable methods."
      }
    ],
    "model": "I think people should be encouraged to eat less meat, but Diego is right that this should not be the only strategy. Thaís’s argument about the environmental cost of meat production is supported by a lot of evidence, and reducing consumption, rather than eliminating it, is a realistic goal for many families. However, encouragement should come through information and attractive alternatives, not pressure, because diets are also connected to culture and income. At the same time, investing in more sustainable farming practices would reduce the impact of the meat that people continue to eat. My family started having two vegetarian days a week last year, mostly for health reasons, and we hardly noticed the change. Small adjustments like this, combined with better farming, seem more effective than either strategy alone."
  },
  {
    "id": "pb-disc-05",
    "professor": "Dr Matsuda",
    "prompt": "In our psychology course we have been studying motivation. Some companies give employees financial bonuses for meeting targets. Others focus on non-financial rewards, such as recognition, flexible hours or opportunities to learn. Which do you think motivates employees more effectively, and why?",
    "posts": [
      {
        "name": "Bruna",
        "text": "Money is the most effective motivator. People work to earn a living, and a bonus is a clear and fair reward. It shows the company values results, and everyone understands it."
      },
      {
        "name": "Caio",
        "text": "I think non-financial rewards work better in the long term. A bonus makes people happy for a short time, but feeling respected, learning new things and having flexibility make people want to stay in a company."
      }
    ],
    "model": "In my opinion, Caio’s view is more convincing for most jobs, although Bruna is right that fair pay is essential. If salaries are too low, no amount of recognition will keep employees motivated. But once people are paid fairly, bonuses seem to have a limited effect, and they can even create unhealthy competition when targets are too narrow. Recognition, flexibility and the chance to develop new skills give employees a sense that their work matters and that they are growing. My mother works in a company that offers paid courses to employees, and she says that this is the main reason she has stayed there for ten years. So I would recommend fair salaries combined with meaningful non-financial rewards."
  },
  {
    "id": "pb-disc-06",
    "professor": "Professor Saraiva",
    "prompt": "This week we are discussing space exploration. Some people argue that governments should invest much more in space programmes because they produce scientific knowledge and new technologies. Others believe this money should be used to solve problems on Earth, such as poverty and climate change. What is your opinion?",
    "posts": [
      {
        "name": "Gael",
        "text": "Space research has given us satellites for weather forecasting, GPS and many medical technologies. Investing in space is investing in innovation that helps people on Earth too, so it should be a priority."
      },
      {
        "name": "Mirela",
        "text": "I agree that space research is interesting, but we have urgent problems now. Millions of people lack clean water and healthcare. I think governments should focus on these problems first and leave space exploration to private companies."
      }
    ],
    "model": "I believe governments should continue to invest in space programmes, but in a balanced way that does not compete with basic needs. Gael makes an important point that is often forgotten: satellites are essential for monitoring deforestation, droughts and storms, which helps us fight climate change, one of the problems Mirela mentions. In that sense, space research and solving problems on Earth are not completely separate. However, Mirela is right that the budget for space should be proportional to a country’s situation. For a country like Brazil, focusing on satellites for environmental monitoring and communication seems more reasonable than sending people to Mars. Leaving everything to private companies, though, would mean that their priorities, not the public interest, would decide what research is done."
  },
  {
    "id": "pb-disc-07",
    "professor": "Dr Siqueira",
    "prompt": "We have been talking about the role of universities in society. Some people think universities should focus mainly on preparing students for the job market. Others believe their main purpose is to develop critical thinking and knowledge for its own sake, even if it does not lead directly to a job. What do you think the main purpose of a university should be?",
    "posts": [
      {
        "name": "Lorena",
        "text": "Most students go to university to get a good job. Universities should listen to employers and teach practical skills. Otherwise, graduates leave with a diploma but cannot find work."
      },
      {
        "name": "Mateus",
        "text": "If universities only follow the job market, they will become training centres. Jobs change quickly, so what students really need is the ability to think critically and learn on their own. That’s what makes them valuable in the long term."
      }
    ],
    "model": "I agree with Mateus that universities should not become simple training centres, but I think Lorena’s concern is also legitimate. The job market changes so quickly that specific technical skills learned in the first year may be outdated by graduation. The ability to analyse problems, communicate clearly and keep learning will remain useful throughout a career. Still, universities should help students connect their knowledge with real-world applications, for example through internships or projects with companies. In my own course, a project in which we analysed real data from a local hospital taught me both statistical theory and how it is used in practice. In my view, the main purpose of a university is to develop thinking, but it should do so in a way that prepares students for meaningful work."
  },
  {
    "id": "pb-disc-08",
    "professor": "Professor Dias",
    "prompt": "In our environmental studies class, we have been looking at waste. Some cities charge households according to the amount of rubbish they throw away, while recycling is collected for free. Supporters say this encourages people to recycle and reduce waste. Critics say it is unfair and may lead to illegal dumping. Is this a good policy? Why or why not?",
    "posts": [
      {
        "name": "Patrícia",
        "text": "I think it’s an excellent policy. People pay for water and electricity according to how much they use, so why not rubbish? When there’s a cost, people think twice and recycle more."
      },
      {
        "name": "Henrique",
        "text": "In theory it sounds good, but some people will just leave their rubbish in the street or in empty land to avoid paying. And large families would pay more, even if they are careful."
      }
    ],
    "model": "I think this policy can work well, but only if it is designed to address the problems Henrique raises. Patrícia’s comparison with water and electricity is persuasive: when people pay for what they use, they usually become more careful. Still, illegal dumping is a real risk, so the policy would need to be accompanied by inspections, fines and convenient recycling points. Large or low-income families could also receive a basic free allowance of rubbish bags each month. I read that in some European towns, households reduced their waste considerably after this kind of system was introduced, mainly because they started composting food scraps. With these safeguards, paying for waste seems a fair way to encourage more responsible behaviour."
  },
  {
    "id": "pb-disc-09",
    "professor": "Dr Bezerra",
    "prompt": "This week we are discussing tourism and heritage. Some famous historical sites have started limiting the number of daily visitors to protect them from damage. This means that some tourists who travel a long way may not be able to enter. Is it right to limit the number of visitors at historical sites? Why or why not?",
    "posts": [
      {
        "name": "Vanessa",
        "text": "Yes. If too many people visit, the sites will be damaged, and in the future nobody will be able to see them. Limiting numbers is the only way to preserve them for future generations."
      },
      {
        "name": "Otávio",
        "text": "I understand the need to protect the sites, but limits may make visits much more expensive and available only to people who can book months in advance. Culture should be accessible to everyone."
      }
    ],
    "model": "I agree with Vanessa that limits are necessary, but Otávio’s concern about fairness should shape how they are applied. Some historical sites are extremely fragile, and uncontrolled numbers of visitors can cause permanent damage, so protecting them is a responsibility to future generations. However, limits do not have to mean higher prices. Sites could keep a percentage of tickets for people who arrive on the day, offer free entry to local residents on certain days and use virtual tours for those who cannot visit in person. When I visited a historic church in Ouro Preto, visits were organised in small groups every half hour, and this made the experience calmer and more enjoyable. A fair booking system can protect both the sites and access to them."
  },
  {
    "id": "pb-disc-10",
    "professor": "Professor Queiroz",
    "prompt": "Our topic is work and well-being. Some companies have introduced policies that prevent employees from sending or answering work emails after working hours. Supporters say this protects mental health. Others argue that it reduces flexibility and can make work harder. Should companies adopt this kind of policy? Why or why not?",
    "posts": [
      {
        "name": "Elaine",
        "text": "Yes. Many people feel they must always be available, and this causes stress and burnout. A clear rule protects employees, because nobody has to worry about answering messages at night."
      },
      {
        "name": "Sérgio",
        "text": "I’m not sure. Some people prefer to work flexible hours — for example, leaving early to pick up their children and finishing some tasks in the evening. A strict rule would make that impossible."
      }
    ],
    "model": "Both Elaine and Sérgio raise valid points, so I would support a policy that protects employees’ right to disconnect without banning evening work completely. The key problem Elaine describes is the expectation that everyone must answer immediately, at any hour. A company could address this by establishing that no one is required to respond to messages outside their working hours, and by encouraging managers to schedule emails to be delivered the next morning. At the same time, employees who prefer flexible schedules, like the parents Sérgio mentions, could continue to work when it suits them. My uncle’s company introduced this kind of guideline, and he says the atmosphere improved because people no longer felt guilty about ignoring messages at night."
  },
  {
    "id": "pb-disc-11",
    "professor": "Dr Falcão",
    "prompt": "We have been studying language learning. Some people believe that the best way to learn a foreign language is to live in a country where it is spoken. Others argue that with modern technology and good teaching, it is possible to reach a high level without leaving your own country. What is your view?",
    "posts": [
      {
        "name": "Raquel",
        "text": "Living abroad is the best way. You are surrounded by the language all day and you have to use it for everything, from shopping to making friends. No classroom can give you that."
      },
      {
        "name": "Bernardo",
        "text": "Living abroad helps, but it’s not necessary. Today you can watch films, talk to people online and use apps. I know people who never left Brazil and speak English better than some who lived in the United States."
      }
    ],
    "model": "I agree with Bernardo that living abroad is not essential, although Raquel is right that it offers a level of immersion that is hard to reproduce. What matters most is the amount of meaningful contact with the language, not the place. Some people who live abroad spend most of their time with people from their own country and make little progress, while others at home create an immersive environment by watching series without subtitles, reading news and joining online conversation groups. Technology has made this much easier than it was twenty years ago. Personally, I reached an advanced level of English without travelling, mainly by playing online games with people from other countries and reading books I enjoyed. Motivation and regular practice seem more important than location."
  },
  {
    "id": "pb-disc-12",
    "professor": "Professor Aguiar",
    "prompt": "This week we are discussing public health. Some countries require people to be registered as organ donors automatically unless they choose to opt out. Others require people to actively register if they want to be donors. Which system do you think is better, and why?",
    "posts": [
      {
        "name": "Cecília",
        "text": "The opt-out system is better. Most people say they would be willing to donate, but they never register. Automatic registration saves lives because it increases the number of donors."
      },
      {
        "name": "Rodrigo",
        "text": "I think donating organs should be an active decision. With an opt-out system, some people may become donors simply because they didn’t know about the law. The decision about our bodies should be a conscious choice."
      }
    ],
    "model": "I believe an opt-out system is better, as long as it is accompanied by strong public information campaigns. Cecília points out an important gap between what people say and what they do: many support donation but never take the time to register. An opt-out system closes that gap and could save many lives. However, Rodrigo’s concern about informed choice is serious, which is why the government must make sure everyone knows about the law and that opting out is quick and simple. Families should also continue to be consulted. In my own family, nobody had ever discussed the topic until a relative needed a transplant, and that experience showed me how many lives depend on these decisions."
  },
  {
    "id": "pb-disc-13",
    "professor": "Dr Rezende",
    "prompt": "Our class has been discussing childhood and education. Some people think children should start learning a second language as early as possible, ideally in pre-school. Others believe children should first develop their first language well and start a second language later, around age ten. What do you think?",
    "posts": [
      {
        "name": "Melissa",
        "text": "Earlier is better. Young children learn languages naturally, especially pronunciation. If they start in pre-school, they can become bilingual without much effort."
      },
      {
        "name": "Artur",
        "text": "I’m not sure that’s true in a school context. Young children need many hours of exposure to really learn a language. One or two short lessons a week in pre-school probably don’t help much, and that time could be used for other activities."
      }
    ],
    "model": "I think Artur makes an important distinction between learning a language at home and learning it at school. Melissa is right that young children can acquire pronunciation very naturally, but that usually happens when they are exposed to the language for many hours a day, for example in bilingual families. In schools with only one or two short lessons a week, older children often learn faster, because they can understand grammar explanations and use learning strategies. So the answer depends on the amount of exposure available. If a school can offer substantial daily contact with the language, starting early is a great idea. If not, it may be better to start a little later, with more intensive lessons. My cousin started English at four but only became confident when she had daily classes at twelve."
  },
  {
    "id": "pb-disc-14",
    "professor": "Professor Teixeira",
    "prompt": "We have been discussing media and democracy. Some people argue that social media platforms should be legally responsible for false information published by their users. Others say this would lead to censorship and limit freedom of expression. Should platforms be responsible for false content? Why or why not?",
    "posts": [
      {
        "name": "Joana",
        "text": "Yes. Platforms make money from the content that people share, and false information can cause real harm, like during elections or health crises. They have the technology to control it, so they should be responsible."
      },
      {
        "name": "Lucas",
        "text": "If platforms are punished for every false post, they will delete anything controversial to protect themselves. That would limit free speech. Education is a better solution — people need to learn how to identify false information."
      }
    ],
    "model": "I think platforms should have some legal responsibility, but not for every single post. Joana is right that platforms profit from the content they distribute, and their algorithms often promote sensational posts, including false ones. Therefore, it seems reasonable to require them to act quickly when false information is reported, especially in serious cases such as health emergencies or elections. However, Lucas’s concern about censorship is valid, so the rules should be clear and focused on content that causes demonstrable harm, with independent review of decisions to remove posts. I also agree that media education is essential. At my school, we had a project on checking sources, and it changed the way I read the news. Regulation and education should work together."
  },
  {
    "id": "pb-disc-15",
    "professor": "Dr Mourão",
    "prompt": "In our urban planning class, we have been discussing housing. In many cities, short-term rentals through apps have become very popular. Supporters say they help owners earn extra income and give tourists more options. Critics argue that they reduce the number of homes available for residents and increase rents. Should cities restrict short-term rentals? Why or why not?",
    "posts": [
      {
        "name": "Priscila",
        "text": "Yes, they should. In some neighbourhoods, entire buildings are rented to tourists, and local people can no longer afford to live there. Cities need to protect housing for residents."
      },
      {
        "name": "Eduardo",
        "text": "I don’t think strict restrictions are fair. Many ordinary families rent a room or their apartment occasionally to pay the bills. The problem is big investors, not ordinary people."
      }
    ],
    "model": "I agree with both Priscila and Eduardo, which is why I think restrictions should target professional operators rather than ordinary residents. Priscila describes a real problem: when investors buy many apartments only for tourists, the supply of homes for local people falls and rents rise. However, as Eduardo explains, a family renting a spare room occasionally is not causing this problem and may depend on the income. A sensible policy could allow residents to rent their own home for a limited number of nights per year, while requiring special licences and higher taxes for anyone who owns several properties for short-term rental. Some cities have adopted rules like these, and in my opinion they offer a fair balance between economic opportunity and the right to housing."
  },
  {
    "id": "pb-disc-16",
    "professor": "Professor Galvão",
    "prompt": "This week we are discussing science and society. Some scientists believe that researchers should spend more time communicating their work to the general public, through social media, talks and interviews. Others think that scientists should focus on research and leave communication to journalists. What is your view?",
    "posts": [
      {
        "name": "Amanda",
        "text": "Scientists should communicate directly. Journalists often simplify or exaggerate results, and this creates confusion. When scientists explain their own work, people trust it more."
      },
      {
        "name": "Vitor",
        "text": "Not all scientists are good communicators, and time spent on social media is time not spent on research. Universities should employ professional science communicators to do this job."
      }
    ],
    "model": "I believe scientists should take part in communicating their research, but Vitor is right that they need support. Amanda makes a strong point about trust: during health crises, for example, people often want to hear explanations directly from experts rather than from second-hand reports. However, communication is a skill that requires training and time, and not every researcher is comfortable with it. A good solution would be for universities to offer communication training and to employ professionals who work together with scientists, rather than replacing them. My biology professor posts short videos about her research on social media, and they have encouraged many students, including me, to become interested in her field. That shows how valuable direct communication can be."
  },
  {
    "id": "pb-disc-17",
    "professor": "Dr Cordeiro",
    "prompt": "We have been discussing sport and society. Some people believe that governments should spend public money to host major international sporting events, such as the Olympic Games or the World Cup, because they bring tourism and international visibility. Others argue that the costs are too high and the benefits are temporary. What do you think?",
    "posts": [
      {
        "name": "Laís",
        "text": "Hosting these events is a great opportunity. They attract tourists, create jobs and improve infrastructure like airports and public transport. They also make people proud of their country."
      },
      {
        "name": "Gustavo",
        "text": "The costs are enormous, and many stadiums are almost never used afterwards. The money could be spent on schools and hospitals. The benefits usually go to a few companies, not to ordinary people."
      }
    ],
    "model": "I think hosting major sporting events can be positive, but only under strict conditions, so in practice I am closer to Gustavo’s view. Laís is right that these events can improve infrastructure, but this only happens when the investments, such as new transport lines, are planned for long-term needs rather than for a few weeks of competition. Too often, as Gustavo says, expensive stadiums are built in places where there is no demand for them afterwards. Governments should therefore use existing facilities whenever possible and publish clear, independent estimates of costs and benefits before deciding to host an event. In my city, a stadium built for a recent tournament is now used only a few times a year, which is a clear warning about the risks of these projects."
  },
  {
    "id": "pb-disc-18",
    "professor": "Dr Paixão",
    "prompt": "This week we are discussing technology in education. Artificial intelligence tools can now write essays, solve problems and answer questions. Some teachers want to ban these tools in schools and universities. Others believe students should be taught to use them responsibly. What should educational institutions do about artificial intelligence tools?",
    "posts": [
      {
        "name": "Sabrina",
        "text": "They should be banned for assignments. If students let a machine write their essays, they never learn to think and write for themselves. Assessment would become meaningless."
      },
      {
        "name": "Murilo",
        "text": "Banning them is impossible — students will use them anyway. It’s better to teach students how these tools work, where they make mistakes and how to use them ethically. They will need these skills at work."
      }
    ],
    "model": "I agree with Murilo that a complete ban is unrealistic, but Sabrina’s concern about learning is serious and should influence how these tools are used. If students use artificial intelligence to replace their own thinking, they will not develop the writing and reasoning skills that education is supposed to build. However, institutions can adapt. Teachers could design some tasks to be done in class, ask students to explain their reasoning orally and require them to show the drafts of their work. At the same time, students could learn to use these tools for specific purposes, such as getting feedback on a draft or checking explanations, while always verifying the information. In one of my courses, we compared an AI-generated answer with academic sources and found several errors, which taught us to use such tools critically."
  },
  {
    "id": "pb-disc-19",
    "professor": "Professor Couto",
    "prompt": "We have been discussing democracy and participation. In some countries, the minimum voting age is sixteen rather than eighteen. Supporters say this increases young people’s interest in politics. Critics argue that sixteen-year-olds are not mature enough to make informed decisions. Should the voting age be sixteen? Why or why not?",
    "posts": [
      {
        "name": "Yasmin",
        "text": "Yes. At sixteen, many people already work and pay taxes, so they should have a say in decisions that affect them. Voting early also creates the habit of participating."
      },
      {
        "name": "Renan",
        "text": "I don’t think most sixteen-year-olds are interested in politics or well informed. They may be easily influenced by their parents or by social media. Eighteen is a better age."
      }
    ],
    "model": "I support allowing sixteen-year-olds to vote, especially since in Brazil it is already optional at that age. Yasmin’s argument about habits is convincing: people who vote in their first election are more likely to keep voting throughout their lives, and at sixteen most young people still live at home and attend school, where they can discuss politics and learn about the system. Renan is right that some young voters may be poorly informed, but the same is true of many adults, and we do not test adults before allowing them to vote. The solution is better civic education in schools. When I voted for the first time at seventeen, my school organised debates with candidates’ proposals, which made me feel much more prepared and responsible."
  },
  {
    "id": "pb-disc-20",
    "professor": "Dr Lacerda",
    "prompt": "In our biology class we have been discussing animal welfare and conservation. Some people believe zoos play an important role in protecting endangered species and educating the public. Others argue that keeping wild animals in captivity is cruel and that zoos should be closed. What is your opinion?",
    "posts": [
      {
        "name": "Débora",
        "text": "Modern zoos are important for conservation. Some species exist today only because of breeding programmes in zoos. They also help children learn to care about animals."
      },
      {
        "name": "Fábio",
        "text": "Even good zoos can’t give animals the space and freedom they need. Many animals show signs of stress. Conservation should happen in the wild, in protected areas."
      }
    ],
    "model": "I think zoos can be justified, but only those that prioritise conservation and animal welfare, so my view is between Débora’s and Fábio’s. Débora is right that breeding programmes have saved some species from extinction, and well-designed educational visits can make people care more about nature. However, Fábio raises a strong objection: large, intelligent animals, such as elephants or orcas, often suffer in captivity, even in good facilities. Zoos should therefore focus on species that can live well in captivity and on those that are part of real conservation programmes, while supporting protection projects in the wild. When I visited a zoo that worked with the reintroduction of the golden lion tamarin, I saw how a zoo can contribute directly to saving a species in its natural habitat."
  },
  {
    "id": "pb-disc-21",
    "professor": "Professor Antunes",
    "prompt": "Our topic this week is the future of money. In some countries, cash is rapidly disappearing as people use cards and mobile payments. Some people welcome a cashless society because it is convenient and reduces crime. Others worry about privacy and the exclusion of people without bank accounts. Should societies move towards eliminating cash?",
    "posts": [
      {
        "name": "Kelly",
        "text": "Yes. Digital payments are faster and safer. Nobody needs to carry money that can be stolen, and it’s harder to hide illegal activities when every payment is recorded."
      },
      {
        "name": "Thiago",
        "text": "That’s exactly the problem — every payment is recorded. Governments and companies would know everything we buy. And elderly people or those without internet access would be left out."
      }
    ],
    "model": "Although digital payments have clear advantages, I do not think societies should eliminate cash completely. Kelly is right that instant payment systems are convenient and can reduce certain crimes, and in Brazil they have helped many small businesses. However, Thiago raises two concerns that a fully cashless society would not solve. First, privacy: when all transactions are digital, very detailed information about people’s lives is collected. Second, inclusion: some elderly people, rural residents and people with low incomes still depend on cash. In addition, power cuts or system failures could leave people unable to buy basic products. My grandmother, for instance, only uses cash because she finds apps confusing. I think the best approach is to encourage digital payments while guaranteeing that cash remains accepted for essential goods and services."
  },
  {
    "id": "pb-disc-22",
    "professor": "Dr Medina",
    "prompt": "We have been discussing education policy. Some schools require students to wear uniforms, while others allow them to choose their own clothes. Supporters of uniforms say they reduce social differences and help students focus. Opponents argue that they limit self-expression. Should schools require uniforms? Why or why not?",
    "posts": [
      {
        "name": "Letícia",
        "text": "Uniforms are a good idea. Without them, students compare brands, and those from poorer families can feel excluded. Uniforms make everyone equal, at least in appearance."
      },
      {
        "name": "Bruno",
        "text": "Clothes are a way of expressing personality, especially for teenagers. And uniforms can be expensive too. Schools should teach respect for differences instead of hiding them."
      }
    ],
    "model": "I generally support school uniforms, provided that they are affordable and practical. Letícia’s point about social pressure is important: at my school, which did not have uniforms, some students were teased because of their clothes, and many families spent money they did not have on brand names. A simple uniform, such as a T-shirt with the school logo and any type of trousers, reduces this pressure without being expensive. Bruno is right that teenagers need to express their identity, but there are many other ways to do so, through hairstyles, accessories, art and opinions. Schools could also involve students in choosing the uniform design. In my view, the benefits of reducing competition and discrimination outweigh the limits on self-expression."
  },
  {
    "id": "pb-disc-23",
    "professor": "Professor Feitosa",
    "prompt": "In our energy policy course, we have been discussing nuclear power. Some experts argue that nuclear energy is essential for reducing carbon emissions because it produces large amounts of electricity without burning fossil fuels. Others believe its risks, costs and waste make it a poor choice compared with renewable sources. Should countries invest in nuclear energy?",
    "posts": [
      {
        "name": "Natália",
        "text": "Yes. Solar and wind are great, but they don’t produce energy all the time. Nuclear power provides a stable supply with very low emissions. Modern plants are much safer than older ones."
      },
      {
        "name": "Diego",
        "text": "Nuclear plants take many years to build and cost a fortune. And we still don’t have a permanent solution for nuclear waste. The money would be better spent on renewables and energy storage."
      }
    ],
    "model": "This is a difficult question, and I think the answer depends on each country’s situation. Natália is right that a stable, low-carbon source of electricity is valuable, especially in countries that still depend heavily on coal. For them, nuclear energy could be part of the solution. However, Diego’s points about cost, construction time and waste are serious. In a country like Brazil, which already produces much of its electricity from hydropower and has excellent conditions for solar and wind energy, I believe it makes more sense to invest mainly in renewables and storage. The money needed for a single nuclear plant could install a large amount of solar capacity in a much shorter time. So I would support nuclear power in some contexts, but not as a universal solution."
  },
  {
    "id": "pb-disc-24",
    "professor": "Dr Bastos",
    "prompt": "This week we are discussing teamwork. Many university courses include a large number of group projects. Some students find group work valuable because it develops collaboration skills. Others prefer individual assignments because grades depend only on their own effort. Should universities use more or fewer group projects?",
    "posts": [
      {
        "name": "Lara",
        "text": "More. In almost every job, people work in teams. Group projects teach us to communicate, divide tasks and resolve conflicts, which are skills employers value."
      },
      {
        "name": "Henrique",
        "text": "Fewer. In most groups, one or two students do most of the work, and everyone gets the same grade. It’s frustrating and unfair, and it doesn’t really teach collaboration."
      }
    ],
    "model": "I believe group projects are valuable, but universities should use them more carefully rather than more often. Lara is right that teamwork is essential in most careers, and university is a safe place to practise it. However, Henrique describes a problem that almost every student has experienced: unequal contribution and a shared grade. This can be reduced if teachers assess both the group product and individual contributions, for instance through peer evaluation, individual reports or short presentations by each member. Teachers could also teach students how to organise group work, which is rarely done. In one of my courses, each member had to submit a brief reflection on their role, and this made everyone more responsible. With such measures, group projects can be fair and genuinely educational."
  },
  {
    "id": "pb-disc-25",
    "professor": "Professor Valadares",
    "prompt": "We have been discussing advertising and consumers. Some countries have banned advertising aimed at children, such as television adverts for toys and snacks during children’s programmes. Supporters say children cannot understand persuasion and need protection. Others argue that parents, not governments, should control what children watch. Should advertising aimed at children be banned?",
    "posts": [
      {
        "name": "Gabriela",
        "text": "Yes. Young children believe what they see in adverts, and companies take advantage of this. Many adverts promote unhealthy food, which contributes to childhood obesity."
      },
      {
        "name": "Leandro",
        "text": "Parents are responsible for educating their children. A ban won’t work anyway, because children see advertising on the internet, on games and in videos made by influencers. Teaching children to understand adverts is more useful."
      }
    ],
    "model": "I support banning advertising aimed at young children, although I agree with Leandro that a ban alone is not enough. Gabriela makes an important point: research suggests that young children cannot easily distinguish between entertainment and persuasion, so it seems unfair to target them with sophisticated marketing techniques, especially for unhealthy food. Parents play a key role, but they cannot monitor every screen at every moment. Leandro is right that a large part of advertising has moved to the internet, which is why the rules should also apply to online videos and influencers. In addition, schools could teach children how advertising works. My younger cousin used to ask for every toy he saw in videos until his teacher explained how adverts are made, which really changed his attitude."
  },
  {
    "id": "pb-disc-26",
    "professor": "Dr Gusmão",
    "prompt": "This week our topic is culture in the digital age. With so much information available online, some people believe public libraries are no longer necessary and that their funding should be reduced. Others argue that libraries are more important than ever. What role, if any, should public libraries play today?",
    "posts": [
      {
        "name": "Michele",
        "text": "Libraries are still essential. Not everyone has internet access or a quiet place to study at home. Libraries offer free books, computers, courses and a safe public space."
      },
      {
        "name": "Rafael",
        "text": "Most information is online now, and e-books are cheaper. Libraries could be smaller and more digital. The money saved could be used for internet access for everyone."
      }
    ],
    "model": "I agree with Michele that libraries remain essential, although Rafael is right that they need to adapt. The internet has not made libraries unnecessary; it has changed their role. Today, a public library is not only a place to borrow books but also a place where people can use computers and the internet for free, get help with digital skills, attend workshops and study in a quiet environment. For many students and unemployed people, these services are not available at home. Libraries should therefore invest in digital resources, as Rafael suggests, but without losing their physical spaces. When I was preparing for university entrance exams, I studied in the municipal library every afternoon because my home was too noisy, and I am sure I would not have passed without it."
  },
  {
    "id": "pb-disc-27",
    "professor": "Professor Rangel",
    "prompt": "We have been discussing transport and the environment. Some governments offer subsidies to people who buy electric cars, such as tax reductions or direct payments. Supporters say this speeds up the transition away from fossil fuels. Critics argue that it mainly benefits wealthy people and that the money should be spent on public transport. Should governments subsidise electric cars?",
    "posts": [
      {
        "name": "Joyce",
        "text": "Yes. Electric cars produce much less pollution in cities. Subsidies help create a market, and as more people buy them, prices will fall for everyone."
      },
      {
        "name": "Arthur",
        "text": "Electric cars are still expensive, so subsidies go to people who could afford a new car anyway. Better buses and trains would reduce emissions more and help many more people."
      }
    ],
    "model": "I think Arthur’s argument is stronger, although subsidies for electric vehicles can have a role in specific cases. Joyce is right that early subsidies can help a new technology become cheaper, but in many countries electric cars remain affordable only for high-income families, so public money ends up supporting people who need it least. Moreover, replacing petrol cars with electric ones does not solve traffic congestion or the lack of space in cities. I would prefer governments to focus on improving public transport and to target subsidies at vehicles used intensively, such as buses, taxis and delivery vans, where the environmental benefit per vehicle is much greater. My city recently introduced electric buses on several routes, and the reduction in noise and fumes was noticeable immediately."
  },
  {
    "id": "pb-disc-28",
    "professor": "Dr Freire",
    "prompt": "This week we are discussing citizenship and education. Some schools require students to complete a certain number of hours of community service before they graduate. Supporters say it develops a sense of responsibility. Others argue that compulsory volunteering is a contradiction and should remain optional. Should community service be required for graduation?",
    "posts": [
      {
        "name": "Bianca",
        "text": "Yes. Many students would never volunteer otherwise, and the experience can change how they see their community. It teaches empathy and responsibility in a way that classes cannot."
      },
      {
        "name": "Caio",
        "text": "If it’s compulsory, it isn’t volunteering. Students just do the minimum hours to get a signature. And some students already have family responsibilities or jobs and don’t have time."
      }
    ],
    "model": "I support requiring a small amount of community service, but the programme should be flexible and meaningful to avoid the problems Caio describes. Bianca is right that many students would never discover the value of community work without an initial push, and some continue volunteering after the requirement ends. At the same time, compulsory service can become a bureaucratic exercise if students are simply sent to do boring tasks. Schools should therefore let students choose among different projects related to their interests, and they should count existing responsibilities, such as caring for a family member, as equivalent experience. At my school, we had to complete twenty hours of community service, and I chose to teach basic computer skills to elderly people. It was one of the most rewarding experiences I had at school."
  },
  {
    "id": "pb-disc-29",
    "professor": "Professor Amaral",
    "prompt": "Our topic is history education. Some people believe that schools should focus mainly on national history, to help students understand their own country and identity. Others argue that, in a globalised world, students should spend more time learning world history. Which should schools prioritise, and why?",
    "posts": [
      {
        "name": "Débora",
        "text": "National history should come first. To be good citizens, students need to understand their own country’s institutions, conflicts and achievements. World history is interesting, but it’s less directly relevant."
      },
      {
        "name": "Luan",
        "text": "Our country’s history can’t be understood without world history. Colonisation, migration, trade and wars connect us with the rest of the world. Focusing only on national history gives a limited view."
      }
    ],
    "model": "I agree with Luan that national and world history cannot really be separated, although Débora is right that students need a deep understanding of their own country. The history of Brazil, for example, cannot be explained without Portuguese colonisation, the Atlantic slave trade, European and Japanese immigration or the global economy of coffee. Rather than choosing between the two, schools could teach national history within its international context. This approach would help students understand both their identity and their connections with other societies. When I studied the history of rubber production in the Amazon, I was surprised to learn how closely it was linked to the growth of the car industry in other countries. That kind of connection makes history both more accurate and more interesting."
  },
  {
    "id": "pb-disc-30",
    "professor": "Dr Sobral",
    "prompt": "We have been discussing workplace design. Many companies have replaced individual offices with open-plan spaces, where employees work together in large rooms without walls. Supporters say this improves communication. Critics argue that it causes distraction and reduces productivity. Are open-plan offices a good idea? Why or why not?",
    "posts": [
      {
        "name": "Tamires",
        "text": "I like open-plan offices. It’s easier to ask colleagues questions and share ideas. People feel more like a team, and managers are more accessible."
      },
      {
        "name": "Rogério",
        "text": "They’re terrible for concentration. There’s constant noise, phone calls and interruptions. Many people end up wearing headphones all day, which defeats the purpose of communication."
      }
    ],
    "model": "I think open-plan offices can work, but only if they also provide quiet spaces for concentration. Tamires is right that open spaces make informal communication easier, which is important for teams that need to collaborate constantly. However, Rogério describes a real problem: tasks that require deep concentration, such as writing reports or analysing data, are very difficult in a noisy environment. A good design could combine open areas for teamwork with small rooms or quiet zones that anyone can use when they need to focus, as well as clear rules about phone calls. My sister’s company redesigned its office in this way, and she says productivity improved because people could choose the environment that suited each task. Flexibility seems more effective than either extreme."
  },
  {
    "id": "pb-disc-31",
    "professor": "Professor Caldas",
    "prompt": "This week we are discussing educational policy. In some school systems, students who fail several subjects must repeat the whole school year. Others have abolished this practice, arguing that repeating a year damages motivation and that students should receive extra support instead. Should students who fail be required to repeat a year?",
    "posts": [
      {
        "name": "Karina",
        "text": "Yes. If students move to the next year without learning the basics, they will fall even further behind. Repeating gives them a second chance to learn the content properly."
      },
      {
        "name": "Edson",
        "text": "Repeating a year is often humiliating. Students lose their friends and may lose interest in school. Research suggests that targeted support, like tutoring, is more effective."
      }
    ],
    "model": "I am closer to Edson’s position, although Karina identifies a real risk. It is true that promoting students who have not learned the basics can make their difficulties worse. However, repeating a whole year means studying again every subject, including those the student has already passed, and many students who repeat become discouraged or leave school. A more effective alternative would be to identify difficulties early and offer intensive support, such as tutoring, summer classes or reinforcement sessions, in the specific subjects where the student is struggling. Repeating a year could remain an option in exceptional cases. A friend of mine repeated a year at school and told me that he felt embarrassed and bored for most of it, which supports the idea that targeted help would have been better."
  },
  {
    "id": "pb-disc-32",
    "professor": "Dr Holanda",
    "prompt": "We have been studying population and work. As people live longer, many governments have raised the retirement age. Some argue that this is necessary to keep pension systems sustainable. Others say it is unfair to people in physically demanding jobs. Should the retirement age be raised? Why or why not?",
    "posts": [
      {
        "name": "Mônica",
        "text": "It’s necessary. People live much longer than in the past, and there are fewer young workers to pay for pensions. Without changes, the system will collapse."
      },
      {
        "name": "Jorge",
        "text": "For a lawyer, working until sixty-seven may be fine. For a construction worker or a nurse, it’s very hard. A single retirement age for everyone ignores these differences."
      }
    ],
    "model": "I believe that raising the retirement age is probably unavoidable, but Jorge is right that the rules should consider the nature of different jobs. Mônica’s demographic argument is strong: as life expectancy increases and birth rates fall, fewer workers must support more retirees, and pension systems become harder to finance. However, a single age for everyone can be unfair, since people in physically demanding jobs often have worse health and shorter lives. A fairer system could allow earlier retirement for workers in particularly demanding occupations or for those who started working very young, while gradually raising the age for others. My grandfather worked in construction from the age of fifteen, and by sixty his back problems made it impossible for him to continue, which shows why flexibility is needed."
  },
  {
    "id": "pb-disc-33",
    "professor": "Professor Brandão",
    "prompt": "Our topic this week is health and technology. Wearable devices, such as smartwatches, can track sleep, heart rate and physical activity. Some people think these devices help users live healthier lives. Others believe they create anxiety and raise privacy concerns. Are wearable health devices beneficial overall?",
    "posts": [
      {
        "name": "Paula",
        "text": "Yes. My smartwatch reminds me to move and shows how much I sleep. Having data motivates people to change habits. Some devices can even detect heart problems early."
      },
      {
        "name": "Wesley",
        "text": "They can become an obsession. Some people check their data constantly and worry about every number. And companies collect very personal health information that could be sold or misused."
      }
    ],
    "model": "I think wearable devices are beneficial overall, as long as users understand their limitations and their data is properly protected. Paula is right that simple feedback, such as the number of steps or hours of sleep, can motivate people to change their habits, and early warnings about irregular heart rhythms have helped some users seek medical advice. However, Wesley’s concerns are important. These devices are not medical instruments, and focusing too much on numbers can cause unnecessary anxiety. In addition, health data is extremely sensitive, so there should be strict rules about how companies store and share it. In my experience, my fitness band helped me realise that I was sleeping less than six hours a night, and I changed my routine. Used sensibly, these devices can be useful tools."
  },
  {
    "id": "pb-disc-34",
    "professor": "Dr Viana",
    "prompt": "This week we are discussing food culture. Some people think restaurants and food companies should be required to display the number of calories on their menus and packaging. Supporters say this helps consumers make healthier choices. Others argue that it makes eating less enjoyable and has little real effect. Should calorie labelling be compulsory?",
    "posts": [
      {
        "name": "Elisa",
        "text": "Yes. People have a right to know what they are eating. Many people are surprised when they see how many calories are in some dishes, and this can help them choose better."
      },
      {
        "name": "Marcos",
        "text": "Calories are not the only thing that matters. A salad with nuts may have more calories than a fried snack but be much healthier. Focusing on numbers can encourage unhealthy attitudes towards food."
      }
    ],
    "model": "I support compulsory calorie labelling, but I agree with Marcos that calories alone give an incomplete picture. Elisa makes a strong case about consumers’ right to information: when people eat out, it is very difficult to estimate how much energy a meal contains, and some dishes contain far more than expected. Clear information allows people to make informed decisions, even if many choose to ignore it. However, labels could be more useful if they included other information, such as the amount of sugar, salt and saturated fat, perhaps using simple colour codes. It is also important that schools teach basic nutrition, so that people understand what the numbers mean. When a café near my university started displaying nutritional information, I realised that my favourite drink contained almost as much sugar as two soft drinks, and I changed my order."
  }
];

export const PRACTICE_INTERVIEW: Array<{ context: string; questions: Array<{ q: string; model: string }> }> = [
  {
    "context": "A researcher is interviewing you about friendship and social life.",
    "questions": [
      {
        "q": "How do you usually spend time with your friends?",
        "model": "We usually meet at weekends. Sometimes we go to a café or watch a football match together, and sometimes we just meet at someone’s house to cook and talk. During the week we mostly keep in touch through group messages."
      },
      {
        "q": "Describe a friend who has had an important influence on you.",
        "model": "My friend Paula has had a big influence on me. We met at school, and she was always very organised and determined. When I was struggling with maths, she helped me study every week, and she taught me that hard work is more important than talent."
      },
      {
        "q": "Some people say social media makes friendships weaker. Do you agree?",
        "model": "Partly. Social media makes it easy to stay in contact with people who live far away, which is positive. But it can also make friendships more superficial, because we see what people post without really talking to them. I think it depends on how we use it."
      },
      {
        "q": "Is it easier to make friends at school, at university or at work? Explain.",
        "model": "I think school is the easiest place, because you see the same people every day for years and share many experiences. At university people are more independent, and at work relationships are often more formal, so friendships take more effort."
      }
    ]
  },
  {
    "context": "A researcher is interviewing you about reading habits.",
    "questions": [
      {
        "q": "What kinds of things do you read in a typical week?",
        "model": "Mostly articles for my course and news on my phone. I also try to read a novel before going to sleep, even if it’s only a few pages. At weekends I sometimes read longer magazine articles about science."
      },
      {
        "q": "Describe a book that you would recommend to a friend.",
        "model": "I would recommend “Vidas Secas” by Graciliano Ramos. It’s a short novel about a poor family in the north-east of Brazil. The language is simple but very powerful, and it made me think about inequality in a way that no textbook did."
      },
      {
        "q": "Do you think people read less today than in the past? Why?",
        "model": "I think people read different things rather than less. We read lots of short texts on screens every day, but fewer long books, because we are constantly interrupted by notifications. Concentrating on a long text has become harder."
      },
      {
        "q": "Should schools let students choose the books they read? Explain.",
        "model": "I think there should be a balance. Choosing books helps students enjoy reading, which is very important. But teachers should also introduce classic or challenging books that students would not choose on their own, because they can open new perspectives."
      }
    ]
  },
  {
    "context": "A researcher is interviewing you about health and exercise.",
    "questions": [
      {
        "q": "What do you do to stay healthy?",
        "model": "I try to sleep at least seven hours, eat regular meals and do some exercise three times a week, usually running or swimming. I also try to drink enough water, which I often forget when I’m busy."
      },
      {
        "q": "Describe a sport or physical activity you enjoy.",
        "model": "I really enjoy volleyball. I play with a group of friends on the beach on Sunday mornings. It’s good exercise, but the best part is that it’s social — we laugh a lot and usually have lunch together afterwards."
      },
      {
        "q": "Some people think companies should give employees time to exercise during the working day. What is your opinion?",
        "model": "I think it’s a good idea. Employees who exercise are usually healthier and more productive, and they take fewer sick days. Even a short break for a walk can reduce stress and help people concentrate better in the afternoon."
      },
      {
        "q": "Is it the government’s responsibility to make people healthier? Explain.",
        "model": "Partly. Individuals are responsible for their own choices, but the government can make healthy choices easier — for example, by building parks and cycle lanes and by making sure school meals are nutritious. Without that support, it’s hard for many people to live healthily."
      }
    ]
  },
  {
    "context": "A researcher is interviewing you about cities and housing.",
    "questions": [
      {
        "q": "Describe the neighbourhood where you live.",
        "model": "I live in a fairly quiet residential neighbourhood with small shops, a market on Wednesdays and a park nearby. It’s about twenty minutes from the city centre by bus. The main problem is that there are not many places for young people to meet."
      },
      {
        "q": "What is the biggest advantage of living in a big city?",
        "model": "For me, the biggest advantage is opportunities — there are more jobs, universities, cultural events and services. You can also meet people from many different backgrounds, which makes life more interesting."
      },
      {
        "q": "Many young people today live with their parents for longer than in the past. Why do you think this is?",
        "model": "Mainly because housing has become very expensive compared with salaries. Many young people also study for longer and start working later, so they can’t afford their own place. In some cultures it’s also normal and even preferred to stay with family."
      },
      {
        "q": "What could governments do to make housing more affordable? Explain.",
        "model": "They could build more public housing and encourage the renovation of empty buildings in city centres. Improving public transport would also help, because people could live further from the centre, where housing is cheaper, without spending hours travelling."
      }
    ]
  }
];

/**
 * Extra Complete the Words passages: seven easy, seven medium and eight hard.
 * The first sentence stays intact; ten blanks are clipped from the rest.
 */
export const PRACTICE_CTW: CtwPassage[] = [
  {
    id: 'p-ctw-01',
    text: 'A camel’s hump does not contain water, as many people think. It is mostly made of fat, which the animal can use as a source of energy when food is hard to find. Camels survive long journeys in the desert because their bodies lose very little water. They produce dry waste, they sweat only when their temperature rises a great deal, and they can drink a huge amount of water in a few minutes when they finally reach a well.',
  },
  {
    id: 'p-ctw-02',
    text: 'Almost everyone gets hiccups from time to time. They begin when the diaphragm, the large muscle below the lungs, suddenly tightens without warning. Air rushes into the throat, and a small flap closes quickly behind it, which produces the familiar sound. Hiccups can be caused by eating too fast, drinking fizzy drinks or feeling excited. Most attacks stop on their own after a few minutes, although people have invented many strange remedies to end them sooner.',
  },
  {
    id: 'p-ctw-03',
    text: 'In cold countries, workers often spread salt on roads during the winter. Salt lowers the temperature at which water freezes, so ice melts even when the air is a little below zero. This makes the roads much safer for cars and for people walking. However, salt is less useful in very severe cold, and it can damage cars, bridges and plants near the road. For this reason, some cities now mix it with sand or use other chemicals instead.',
  },
  {
    id: 'p-ctw-04',
    text: 'Ants are able to find food and return to their nest with remarkable accuracy. When an ant discovers something to eat, it leaves a chemical trail on the ground as it walks home. Other ants follow this trail and add more of the chemical, so the path to a good food source becomes stronger over time. When the food is gone, the ants stop marking the trail, and the scent slowly fades away.',
  },
  {
    id: 'p-ctw-05',
    text: 'Twice a day, the level of the sea rises and falls along most coasts. These changes, called tides, are caused mainly by the pull of the moon. As the Earth turns, different places pass under the area where the moon pulls the water most strongly, and the sea rises there. The sun also has an effect, and when the sun and the moon pull in the same direction, the tides become especially high and low.',
  },
  {
    id: 'p-ctw-06',
    text: 'Yoghurt is made by adding friendly bacteria to warm milk. The bacteria feed on the natural sugar in the milk and turn it into an acid. This acid makes the milk thicker and gives yoghurt its slightly sour taste. The process works best at a steady, warm temperature, so it usually takes several hours. Because the acid prevents many harmful bacteria from growing, yoghurt was an important way of keeping milk safe before people had fridges.',
  },
  {
    id: 'p-ctw-07',
    text: 'Cacti are well adapted to life in hot, dry deserts. Instead of broad leaves, most species have sharp spines, which lose far less water and protect the plant from hungry animals. Their thick green stems carry out the work that leaves do in other plants, and they can store large amounts of water after a rare storm. Many cacti also have wide, shallow roots that spread just below the surface, so they can absorb rain quickly before it evaporates.',
  },
  {
    id: 'p-ctw-08',
    text: 'The sky looks blue on a clear day because of the way sunlight interacts with the air. Sunlight contains all the colours of the rainbow, but when it passes through the atmosphere, tiny gas molecules scatter short blue waves much more than long red ones. This scattered blue light reaches our eyes from every part of the sky. At sunrise and sunset, the light travels through much more air, so most of the blue is lost and the sky turns orange and red.',
  },
  {
    id: 'p-ctw-09',
    text: 'Every year, many birds travel thousands of kilometres between their breeding and wintering grounds. Scientists have long wondered how they find their way with such precision. Experiments suggest that birds combine several sources of information: they use the position of the sun during the day, the patterns of stars at night and, it seems, the magnetic field of the Earth. Young birds of some species make their first journey alone, which suggests that much of this ability is inherited rather than learned.',
  },
  {
    id: 'p-ctw-10',
    text: 'Glaciers are among the most powerful forces that shape the landscape. As a large mass of ice moves slowly downhill, it picks up rocks and scrapes them along the ground like a giant file. Over thousands of years, this process can turn a narrow river valley into a wide valley with steep sides and a flat floor. When the climate warms and the ice melts, it leaves behind these broad valleys, along with piles of rock and long, deep lakes.',
  },
  {
    id: 'p-ctw-11',
    text: 'Cities are often several degrees warmer than the countryside around them. This effect, known as the urban heat island, has a number of causes. Roads and buildings absorb heat from the sun during the day and release it slowly at night, while cars, factories and air conditioners add even more warmth. In addition, cities usually have fewer trees, which cool the air by providing shade and releasing water through their leaves. Planners now try to reduce the problem with parks, green roofs and lighter building materials.',
  },
  {
    id: 'p-ctw-12',
    text: 'Sleep plays an important role in the formation of long-term memories. During the day, new information is stored only temporarily in a part of the brain called the hippocampus. While we sleep, the brain appears to replay these recent experiences and gradually transfer the most useful ones to other regions, where they become more stable. Students who sleep well after studying tend to remember the material better than those who stay awake, even when both groups spend the same amount of time learning.',
  },
  {
    id: 'p-ctw-13',
    text: 'Plants cannot move, but their seeds can travel surprising distances. Some seeds have light, feathery parts that allow the wind to carry them across whole fields, while others are hidden inside sweet fruits that birds and mammals eat. The seeds pass through the animal unharmed and are dropped far from the parent plant, often with a little natural fertiliser. A few plants even have pods that dry out and burst open, throwing their seeds several metres away.',
  },
  {
    id: 'p-ctw-14',
    text: 'The arrival of the printing press in fifteenth-century Europe changed the way knowledge spread. Before that time, books were copied by hand, a slow and costly process that made them rare and expensive. Printing allowed hundreds of identical copies to be produced in the time a scribe needed for one, and prices fell sharply. As books became cheaper, more people learned to read, and new ideas in religion, science and politics could reach a wide audience within a few years.',
  },
  {
    id: 'p-ctw-15',
    text: 'Epidemiologists use the term herd immunity for the indirect protection that a population gains when a large share of its members is immune to an infection. Once enough people can no longer catch and transmit the disease, chains of infection are broken before they reach the few who remain vulnerable, such as newborn babies or patients whose treatment weakens the immune system. The proportion required depends on how contagious the disease is: the more easily it spreads, the higher the share of immune individuals needed to keep outbreaks from growing.',
  },
  {
    id: 'p-ctw-16',
    text: 'Behavioural economists have documented a bias known as anchoring. When people are asked to estimate an unknown quantity, their answers are strongly influenced by any number they have recently encountered, even one that is obviously irrelevant. In a well-known type of experiment, participants who first consider a high figure give much larger estimates than those who first consider a low one. The effect has practical consequences: an initial asking price in a negotiation, for instance, tends to shape the final agreement far more than either party realises.',
  },
  {
    id: 'p-ctw-17',
    text: 'The sunk cost fallacy describes the tendency to continue an activity because of what has already been invested in it. Rationally, past expenses that cannot be recovered should play no part in a decision about the future; only the expected costs and benefits from this point onwards are relevant. Nevertheless, individuals and organisations frequently persist with failing projects, arguing that abandoning them would waste the money already spent. Governments, too, are sometimes accused of prolonging expensive programmes for the same reason, when withdrawing earlier would have been less costly.',
  },
  {
    id: 'p-ctw-18',
    text: 'Price elasticity of demand measures how strongly the quantity people buy responds to a change in price. For goods with few substitutes, such as basic fuel or essential medicines, demand is relatively inelastic: consumers continue to buy similar amounts even when prices rise. Luxury items and products with many close alternatives, by contrast, tend to be highly elastic, because buyers can easily postpone a purchase or switch to a competitor. Governments take these differences into account when designing taxes, since a tax on an inelastic good raises revenue without greatly reducing consumption.',
  },
  {
    id: 'p-ctw-19',
    text: 'Social psychologists have observed that people are less likely to help a stranger in an emergency when other witnesses are present. This phenomenon, called the bystander effect, is usually explained by a diffusion of responsibility: each observer assumes that someone else will intervene, or that others are better qualified to act. Uncertainty also plays a role, since individuals look to the reactions of those around them to decide whether a situation is serious. Training programmes therefore encourage people who need assistance to address one specific person directly.',
  },
  {
    id: 'p-ctw-20',
    text: 'Some products become more valuable as the number of their users increases, a property economists call a network effect. A telephone, for instance, is of little use if nobody else owns one, but its value grows with every new subscriber who can be reached. Markets with strong network effects often tend towards a single dominant supplier, because new customers prefer the service that their friends and colleagues already use. Consequently, firms in these markets may accept heavy initial losses in order to attract a large user base as quickly as possible.',
  },
  {
    id: 'p-ctw-21',
    text: 'The Doppler effect is the change in the observed frequency of a wave when its source moves relative to the listener. As an ambulance approaches, each successive sound wave is emitted from a slightly closer position, so the waves arrive compressed and the siren seems higher in pitch; once the vehicle has passed, the waves are stretched and the pitch drops. The same principle applies to light, and astronomers rely on it to determine whether distant galaxies are moving towards or away from us, as well as to estimate their speed.',
  },
  {
    id: 'p-ctw-22',
    text: 'Linguists distinguish between the inherited vocabulary of a language and the words it has borrowed from others. English is an unusually clear example of extensive borrowing: after the Norman Conquest, thousands of French terms entered the language, particularly in the domains of law, government and cuisine. Many everyday concepts are consequently expressed by pairs of words with different origins, such as the native word for an animal and the borrowed word for its meat. Later centuries added scholarly vocabulary from Latin and Greek, which explains why academic English often sounds more formal than ordinary speech.',
  },
];
