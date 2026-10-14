import type { ToeflTest } from './types';

/** TOEFL practice test 1 — all texts, scripts and questions are original. */
export const TEST_01: ToeflTest = {
  id: 'toefl-01',
  title: 'Practice Test 1',
  reading: {
    m1: {
      ctw: [
        {
          id: 't1-ctw-1',
          text: 'Bees are not the only animals that pollinate plants. In many tropical regions, bats visit flowers at night and carry pollen from one plant to another. Some of these flowers have evolved pale colours and strong scents that make them easy to find in the dark. Scientists estimate that hundreds of plant species depend largely on bats for reproduction.',
        },
      ],
      daily: [
        {
          id: 't1-d1',
          kind: 'notice',
          title: 'Central Library — Changes to Opening Hours',
          body: 'From Monday 3 March, the Central Library will open at 10 a.m. instead of 9 a.m. on weekdays. Weekend hours will remain unchanged. The later opening allows staff to receive deliveries and reshelve returned books before the doors open.\n\nMembers who need early access to the study rooms can book a 9 a.m. slot online up to three days in advance. Please note that the self-service return machines in the entrance hall will be available from 8 a.m. every day.',
          questions: [
            { q: 'What is the main purpose of the notice?', options: ['To announce a change in opening times', 'To ask members to return books', 'To advertise new study rooms', 'To explain a delay in deliveries'], answer: 0 },
            { q: 'What can members do if they want to study at 9 a.m. on a weekday?', options: ['Use the return machines in the entrance hall', 'Reserve a study room online in advance', 'Come on the weekend instead', 'Ask the staff at the entrance'], answer: 1 },
            { q: 'What is available at 8 a.m. every day?', options: ['The study rooms', 'The reading room', 'The self-service return machines', 'Help from the library staff'], answer: 2 },
          ],
        },
        {
          id: 't1-d2',
          kind: 'email',
          title: 'Subject: Friday’s team lunch — new venue',
          body: 'From: Priya Shah\nTo: Design team\n\nHi all,\n\nJust a quick update about Friday’s team lunch. Casa Verde, the restaurant we booked, has had to close for repairs, so I’ve moved our booking to Lumen Bistro, two doors down on the same street. The time is unchanged (12:30).\n\nLumen has a set menu, so please reply by Wednesday with your choice of main course: grilled fish, mushroom risotto or chicken curry. If you have any dietary requirements, let me know and I’ll pass them on.\n\nSee you there!\nPriya',
          questions: [
            { q: 'Why has the lunch been moved?', options: ['The team changed the date.', 'The set menu was too expensive.', 'Lumen Bistro is closer to the office.', 'The first restaurant is closed for repairs.'], answer: 3 },
            { q: 'What are the recipients asked to do by Wednesday?', options: ['Choose their main course', 'Book a table', 'Pay for the lunch', 'Suggest another restaurant'], answer: 0 },
            { q: 'What is true about Lumen Bistro?', options: ['It opens at 12:30.', 'It is on the same street as Casa Verde.', 'It only serves vegetarian food.', 'A colleague recommended it.'], answer: 1 },
          ],
        },
      ],
      academic: [
        {
          id: 't1-a1',
          title: 'The Return of the Urban Forest',
          text: 'For most of the twentieth century, city planners regarded trees as decoration: pleasant, but optional, and the first item to be cut when budgets were tight. That view has changed dramatically. Research over the past three decades has shown that urban trees provide services with measurable economic value. A mature tree can lower the temperature of the street beneath it by several degrees on a hot afternoon, reducing the energy that nearby buildings use for air conditioning. Tree canopies also intercept rainfall, slowing the flow of water into drains and reducing the risk of flash floods.\n\nThe benefits are not only physical. Several studies have linked access to green spaces with lower levels of stress and faster recovery from illness. In one frequently cited experiment, hospital patients whose windows looked onto trees needed fewer painkillers than those who faced a brick wall. Although such findings do not prove that trees cause better health, they have encouraged health authorities to treat urban greenery as part of public health policy.\n\nPlanting trees in cities, however, is more complicated than it seems. Street trees must survive compacted soil, limited water and air pollution, and their roots can damage pavements and underground pipes. Choosing the wrong species can therefore create costs rather than savings. For this reason, many cities now keep detailed inventories of their trees, recording the species, size and condition of each one. These databases allow planners to predict which trees will need care and to plant a greater variety of species, so that a single disease cannot destroy a large part of the urban forest — as happened to the elm trees of many European and North American cities in the twentieth century.',
          questions: [
            { q: 'In paragraph 1, the word “intercept” is closest in meaning to', options: ['produce', 'catch', 'clean', 'measure'], answer: 1 },
            { q: 'According to paragraph 1, how can trees reduce the energy used by buildings?', options: ['By blocking the wind in winter', 'By absorbing air pollution', 'By cooling the streets around them', 'By supplying wood for fuel'], answer: 2 },
            { q: 'What does the hospital experiment in paragraph 2 suggest?', options: ['Trees can cure illnesses.', 'Patients prefer rooms without windows.', 'Hospitals should plant fruit trees.', 'A view of trees may help patients recover.'], answer: 3 },
            { q: 'Why does the author mention the elm trees of European and North American cities?', options: ['To show the danger of relying on too few species', 'To argue that elms are better than other trees', 'To explain why roots damage pipes', 'To describe how tree inventories began'], answer: 0 },
            { q: 'Which statement best expresses the main idea of the passage?', options: ['Trees are mainly decorative and too costly for most cities.', 'Urban trees bring important benefits, but they must be chosen and managed carefully.', 'Health authorities have proved that trees cause better health.', 'Cities should stop planting trees along their streets.'], answer: 1 },
          ],
        },
      ],
    },
    easy: {
      ctw: [
        {
          id: 't1-ctw-2',
          text: 'Many people believe that reading in dim light damages the eyes. In fact, most eye doctors say that it only makes the eyes tired for a short time. When we read in poor light, we blink less often, and the surface of the eye becomes dry. This can cause discomfort and headaches, but the effects usually disappear after a good night’s sleep.',
        },
      ],
      daily: [
        {
          id: 't1-d3',
          kind: 'menu',
          title: 'Riverside Café — This Week’s Specials',
          body: 'Monday: vegetable soup with homemade bread — R$ 18\nTuesday: pasta of the day — R$ 25\nWednesday: closed for staff training\nThursday: fish tacos — R$ 28\nFriday: feijoada — R$ 32 (served 12–3 p.m. only)\n\nAll specials come with a free fresh juice before 1 p.m.\nGroups of eight or more, please call ahead.',
          questions: [
            { q: 'On which day is the café closed?', options: ['Monday', 'Thursday', 'Wednesday', 'Friday'], answer: 2 },
            { q: 'What do you get if you order a special at 12:30?', options: ['A discount on the next meal', 'Free bread', 'A dessert', 'A free juice'], answer: 3 },
            { q: 'What should a group of ten people do?', options: ['Call the café before they go', 'Arrive before 1 p.m.', 'Order the feijoada', 'Pay in advance'], answer: 0 },
          ],
        },
      ],
      academic: [
        {
          id: 't1-a2',
          title: 'Why Do Some Birds Migrate at Night?',
          text: 'Many small songbirds, such as warblers and thrushes, make their long seasonal journeys at night. At first this seems surprising, since these birds are active during the day for the rest of the year. Scientists have proposed several explanations.\n\nFirst, the air is usually cooler and calmer at night. Flying is hard work, and cooler air helps birds avoid overheating and losing too much water. Calm air also makes it easier to keep a straight course.\n\nSecond, travelling at night leaves the daytime free for feeding. Migrating birds need enormous amounts of energy, so they stop during the day to eat insects, seeds and fruit before continuing the next night. A third explanation is safety: many birds of prey, such as hawks, hunt by day, so small birds that fly in the dark are less likely to be caught.\n\nFinally, the night sky may help with navigation. Experiments have shown that some species use the positions of the stars to find north. They also appear to sense the Earth’s magnetic field, which allows them to navigate even when clouds hide the stars.',
          questions: [
            { q: 'Why does night migration “seem surprising”?', options: ['Nights are colder in autumn.', 'These birds are normally active during the day.', 'Birds cannot see in the dark.', 'Night flights are much longer.'], answer: 1 },
            { q: 'According to the passage, what do migrating birds do during the day?', options: ['They fly at higher altitudes.', 'They hunt smaller birds.', 'They stop to feed.', 'They sleep without eating.'], answer: 2 },
            { q: 'The word “enormous” in paragraph 3 is closest in meaning to', options: ['unusual', 'regular', 'small', 'very large'], answer: 3 },
            { q: 'How can birds find their way when clouds cover the sky?', options: ['By sensing the Earth’s magnetic field', 'By following rivers', 'By flying lower', 'By waiting for the stars to appear'], answer: 0 },
          ],
        },
      ],
    },
    hard: {
      ctw: [
        {
          id: 't1-ctw-3',
          text: 'The concept of opportunity cost lies at the heart of economic reasoning. Whenever a resource is used for one purpose, the benefit it could have produced in its best alternative use is lost. A government that spends money on a new stadium, for example, cannot spend the same funds on hospitals or schools. Economists therefore argue that decisions should be judged not only by their direct costs but by the value of the options they exclude.',
        },
      ],
      daily: [
        {
          id: 't1-d4',
          kind: 'email',
          title: 'Subject: Revised reimbursement policy for conference travel',
          body: 'Dear colleagues,\n\nFollowing the recent budget review, the faculty has revised its policy on conference travel. From 1 August, the department will reimburse economy airfare and up to three nights of accommodation for any conference at which a member of staff presents a paper.\n\nAttendance without presenting will be funded only if the conference is directly related to a current research grant, in which case the costs should be charged to that grant rather than to the department.\n\nAll claims must be submitted within 30 days of return and accompanied by original receipts. Late or incomplete claims will not be processed.\n\nDr Helena Matos\nHead of Department',
          questions: [
            { q: 'Under the new policy, whose travel will the department pay for?', options: ['Any member of staff attending a conference', 'Staff who hold a research grant', 'Staff who present a paper at a conference', 'Students who attend conferences'], answer: 2 },
            { q: 'How should a member of staff pay to attend, without presenting, a conference related to their grant?', options: ['By asking the department for funding', 'They are not allowed to attend.', 'By paying personally and claiming later', 'By charging the costs to the grant'], answer: 3 },
            { q: 'What will happen to a claim submitted 45 days after the trip?', options: ['It will not be processed.', 'It will be paid in part.', 'It must be approved by Dr Matos.', 'It will need extra receipts.'], answer: 0 },
          ],
        },
      ],
      academic: [
        {
          id: 't1-a3',
          title: 'Memory and the Testing Effect',
          text: 'Students commonly prepare for examinations by rereading their notes and highlighting key passages. These strategies feel productive: as the material becomes familiar, learners gain a sense of mastery. Yet a substantial body of research suggests that this sense is often misleading. Familiarity with a text is not the same as the ability to retrieve its content from memory, and it is retrieval that examinations demand.\n\nThe phenomenon known as the testing effect describes the finding that actively recalling information strengthens long-term memory more than additional study does. In a typical experiment, two groups read the same passage. One group then reads it again, while the other attempts to write down everything it can remember. When both groups are tested a week later, the second group usually remembers considerably more, even though it spent less time looking at the material.\n\nPsychologists offer several explanations. One is that retrieval makes memories more accessible by reinforcing the routes through which they are reached. Another is that attempting to recall exposes gaps in knowledge, prompting learners to focus subsequent study where it is most needed. Notably, the benefit appears even when learners fail to recall an answer, provided that they receive the correct answer afterwards.\n\nDespite this evidence, practice testing remains underused. Part of the reason is that it feels harder than rereading, and learners tend to interpret difficulty as a sign that a method is not working. Researchers describe such techniques as “desirable difficulties”: conditions that slow learning in the short term but improve retention over time. Spacing study sessions apart, rather than concentrating them in a single evening, is another example.',
          questions: [
            { q: 'In paragraph 1, the word “misleading” is closest in meaning to', options: ['difficult to read', 'giving a false impression', 'widely accepted', 'very helpful'], answer: 1 },
            { q: 'According to paragraph 2, what did the second group in the experiment do?', options: ['Read the passage a second time', 'Highlighted the key points', 'Tried to write down what they remembered', 'Studied the passage for a week'], answer: 2 },
            { q: 'What can be inferred from paragraph 3 about unsuccessful attempts to recall?', options: ['They always weaken memory.', 'They should be avoided before exams.', 'They help only weak students.', 'They can still be useful if the correct answer is given afterwards.'], answer: 3 },
            { q: 'According to the author, why is practice testing underused?', options: ['Learners take its difficulty as a sign that it does not work.', 'It requires special materials.', 'Teachers do not allow it.', 'It takes more time than rereading.'], answer: 0 },
            { q: 'Why does the author mention spacing study sessions?', options: ['To contradict the testing effect', 'To give another example of a desirable difficulty', 'To describe the experiment in paragraph 2', 'To recommend studying in a single evening'], answer: 1 },
          ],
        },
      ],
    },
  },
  listening: {
    m1: {
      choose: [
        { id: 't1-c1', speaker: 'Woman', line: 'Do you know if the library is open on Sunday?', options: ['Yes, I’ve read that book.', 'I think it opens at noon on Sundays.', 'It’s on the second floor.', 'No, I study at home on Mondays.'], answer: 1 },
        { id: 't1-c2', speaker: 'Man', line: 'I can’t believe I left my laptop charger at home.', options: ['Yes, it’s charging now.', 'I believe you did.', 'You can borrow mine if you like.', 'The home page is loading.'], answer: 2 },
        { id: 't1-c3', speaker: 'Woman', line: 'Would you mind closing the window? It’s freezing in here.', options: ['Yes, it’s a nice window.', 'I don’t mind cold weather in summer.', 'It closed at five.', 'Not at all — I’ll do it now.'], answer: 3 },
        { id: 't1-c4', speaker: 'Man', line: 'How did your presentation go?', options: ['Better than I expected, actually.', 'I went by bus.', 'It’s going to be on Tuesday.', 'I presented them with flowers.'], answer: 0 },
        { id: 't1-c5', speaker: 'Woman', line: 'Shall we grab something to eat after class?', options: ['I grabbed it already.', 'Sure — how about the café on the corner?', 'Class starts at nine.', 'No, it isn’t for sale.'], answer: 1 },
        { id: 't1-c6', speaker: 'Man', line: 'The professor has moved the deadline to next Friday.', options: ['She moved to a new house.', 'Friday comes after Thursday.', 'Great, that gives us more time.', 'I’ll move the desk.'], answer: 2 },
      ],
      audio: [
        {
          id: 't1-l1',
          kind: 'conversation',
          title: 'A student and an academic adviser',
          lines: [
            { speaker: 'Student', text: 'Hi, Ms Carter. Do you have a minute? I’d like to talk about my timetable.' },
            { speaker: 'Adviser', text: 'Of course, Lucas. What’s the problem?' },
            { speaker: 'Student', text: 'I’m registered for Statistics 101, but it clashes with my chemistry lab on Thursday afternoons.' },
            { speaker: 'Adviser', text: 'I see. There’s another section of Statistics on Tuesday mornings. Would that work for you?' },
            { speaker: 'Student', text: 'It would, but I heard it was already full.' },
            { speaker: 'Adviser', text: 'It was, but two students dropped it yesterday. If you fill in the change form today, I can move you.' },
            { speaker: 'Student', text: 'That’s great. Do I need my lab instructor to sign it?' },
            { speaker: 'Adviser', text: 'No, just me. Bring the form back before five and it’ll be processed by tomorrow.' },
          ],
          questions: [
            { q: 'Why does the student go to see the adviser?', options: ['He wants to drop Statistics.', 'He failed his chemistry lab.', 'His Statistics class clashes with his lab.', 'He needs his lab instructor’s signature.'], answer: 2 },
            { q: 'What will the student probably do next?', options: ['Talk to his lab instructor', 'Attend the Thursday class', 'Wait until next semester', 'Fill in a form and return it before five'], answer: 3 },
          ],
        },
        {
          id: 't1-l2',
          kind: 'announcement',
          title: 'A campus announcement',
          lines: [
            { speaker: 'Announcer', text: 'Attention, please. Because of maintenance work on the main water pipe, the Science Building will be closed tomorrow from 8 a.m. until 2 p.m. All morning lectures scheduled in that building will take place in the Arts Centre instead; room numbers will be posted at the entrance. Afternoon classes will continue as normal. We apologise for any inconvenience.' },
          ],
          questions: [
            { q: 'Why will the Science Building be closed?', options: ['For maintenance on a water pipe', 'For an examination', 'For a public holiday', 'Because of a fire drill'], answer: 0 },
            { q: 'Where will the morning lectures take place?', options: ['In the library', 'In the Arts Centre', 'Online', 'In the Science Building, in other rooms'], answer: 1 },
          ],
        },
        {
          id: 't1-l3',
          kind: 'talk',
          title: 'A lecture in a geography class',
          lines: [
            { speaker: 'Professor', text: 'Today I want to look at a question that puzzled early geographers: why do people choose to live on the slopes of active volcanoes, despite the obvious danger? The main answer is the soil.' },
            { speaker: 'Professor', text: 'When volcanic ash weathers, it releases minerals such as potassium and phosphorus, which plants need to grow. Ash is also light and porous, so it holds water well but still lets roots breathe. Over a few centuries, a layer of ash can become some of the most productive farmland on Earth. That’s why regions like the island of Java, or the area around Mount Etna in Sicily, support such dense populations.' },
            { speaker: 'Professor', text: 'Of course, the benefit takes time. Fresh ash can actually damage crops, because it’s sharp and can be acidic. So the fertility we see today is often the result of eruptions that happened hundreds of years ago.' },
          ],
          questions: [
            { q: 'What is the talk mainly about?', options: ['How volcanoes erupt', 'The history of Java', 'Why volcanic soil attracts farmers', 'How to predict eruptions'], answer: 2 },
            { q: 'According to the professor, why is weathered ash good for plants?', options: ['It is sharp.', 'It blocks sunlight.', 'It contains no water.', 'It releases minerals that plants need.'], answer: 3 },
            { q: 'What does the professor say about fresh ash?', options: ['It can harm crops.', 'It is the most fertile kind of soil.', 'It cannot hold water.', 'It disappears within a year.'], answer: 0 },
          ],
        },
      ],
    },
    easy: {
      choose: [
        { id: 't1-c7', speaker: 'Woman', line: 'Is this seat taken?', options: ['I took it yesterday.', 'No, go ahead.', 'It’s a comfortable seat.', 'Yes, I’m seated.'], answer: 1 },
        { id: 't1-c8', speaker: 'Man', line: 'What time does the next bus leave?', options: ['It left me alone.', 'At the bus station.', 'In about ten minutes.', 'Yes, it’s leaving.'], answer: 2 },
        { id: 't1-c9', speaker: 'Woman', line: 'Could you help me carry these boxes?', options: ['They’re very heavy boxes.', 'I carried them last year.', 'Help is in the box.', 'Of course. Where do they go?'], answer: 3 },
        { id: 't1-c10', speaker: 'Man', line: 'I’m thinking of taking Spanish next term.', options: ['Good idea — it’ll be useful on your trip.', 'I thought about it yesterday.', 'The term finishes in June.', 'Spanish is a beautiful country.'], answer: 0 },
      ],
      audio: [
        {
          id: 't1-l4',
          kind: 'conversation',
          title: 'Two students preparing a presentation',
          lines: [
            { speaker: 'Maya', text: 'Have you finished your part of the slides?' },
            { speaker: 'Ben', text: 'Almost. I still need to add the graph with the survey results.' },
            { speaker: 'Maya', text: 'OK. We’re meeting at four to rehearse, right?' },
            { speaker: 'Ben', text: 'Actually, could we make it five? I’ve got a dentist appointment at three.' },
            { speaker: 'Maya', text: 'Five is fine. I’ll let Sam and Julia know.' },
            { speaker: 'Ben', text: 'Thanks. I’ll send you the slides before I leave.' },
          ],
          questions: [
            { q: 'What does Ben still need to do?', options: ['Conduct the survey', 'Add a graph to the slides', 'Book a room', 'Call Sam'], answer: 1 },
            { q: 'Why does Ben want to change the meeting time?', options: ['He hasn’t finished the survey.', 'He has a class at four.', 'He has a dentist appointment.', 'The room is not available.'], answer: 2 },
          ],
        },
        {
          id: 't1-l5',
          kind: 'talk',
          title: 'A talk about the history of an everyday object',
          lines: [
            { speaker: 'Lecturer', text: 'Let’s talk about something you probably use every day: the pencil. In the 1560s, a large deposit of graphite was discovered in Borrowdale, in the north of England.' },
            { speaker: 'Lecturer', text: 'At first, people thought it was a kind of lead, which is why we still talk about pencil “lead”, even though pencils have never contained lead. Shepherds used the graphite to mark their sheep. Later, people wrapped sticks of graphite in string or wood to keep their hands clean.' },
            { speaker: 'Lecturer', text: 'The modern pencil, made of powdered graphite mixed with clay, was developed in France in 1795, when war made English graphite hard to obtain.' },
          ],
          questions: [
            { q: 'Why is the inside of a pencil called “lead”?', options: ['Pencils contained lead until 1795.', 'It was found in a lead mine.', 'Lead was mixed with the clay.', 'People once thought graphite was lead.'], answer: 3 },
            { q: 'What did shepherds use graphite for?', options: ['To mark their sheep', 'To make pencils', 'To build houses', 'To trade with France'], answer: 0 },
            { q: 'Why was the modern pencil developed in France?', options: ['France had more graphite.', 'War made English graphite hard to obtain.', 'French shepherds needed pencils.', 'Clay was cheaper in England.'], answer: 1 },
          ],
        },
      ],
    },
    hard: {
      choose: [
        { id: 't1-c11', speaker: 'Man', line: 'I was wondering whether you’d had a chance to look at my proposal.', options: ['Yes, I was wondering too.', 'The proposal had a chance.', 'Not yet, but I’ll get to it this afternoon.', 'I looked at the chance.'], answer: 2 },
        { id: 't1-c12', speaker: 'Woman', line: 'Wouldn’t it make more sense to postpone the trip until the strike is over?', options: ['The strike makes sense to me.', 'It was postponed last strike.', 'It wouldn’t cost a cent.', 'That’s probably wise, given the circumstances.'], answer: 3 },
        { id: 't1-c13', speaker: 'Man', line: 'You couldn’t lend me your notes from Monday’s lecture, could you?', options: ['Sure — I’ll email you a copy tonight.', 'No, I couldn’t attend on Tuesday.', 'The lecture was lent to me.', 'Monday is a weekday.'], answer: 0 },
        { id: 't1-c14', speaker: 'Woman', line: 'I’m not convinced the data really supports their conclusion.', options: ['The data is on the table.', 'I had the same impression when I read it.', 'Yes, they concluded the meeting.', 'I’m not sure where they live.'], answer: 1 },
      ],
      audio: [
        {
          id: 't1-l6',
          kind: 'announcement',
          title: 'An announcement about a new system',
          lines: [
            { speaker: 'Announcer', text: 'Good morning. This is a reminder that from next Monday the university will introduce a new system for booking study rooms. Rooms can no longer be reserved at the library desk; all bookings must be made through the student portal, up to seven days in advance. Each student may book a maximum of two hours per day, and rooms not occupied within fifteen minutes of the start time will be released to other users. Group rooms require at least three registered students in the booking.' },
          ],
          questions: [
            { q: 'What is changing?', options: ['The library’s opening hours', 'The number of study rooms', 'The way study rooms are booked', 'The price of study rooms'], answer: 2 },
            { q: 'What may happen if a student arrives twenty minutes late for a booking?', options: ['They must pay a fine.', 'They lose their booking rights for a week.', 'They must book again at the desk.', 'The room may be given to someone else.'], answer: 3 },
          ],
        },
        {
          id: 't1-l7',
          kind: 'talk',
          title: 'A lecture in a psychology class',
          lines: [
            { speaker: 'Professor', text: 'In this part of the course we’re looking at cognitive biases — systematic ways in which our judgements depart from rational analysis. One of the most robust is anchoring.' },
            { speaker: 'Professor', text: 'When people estimate a quantity, they are strongly influenced by any number they have seen just before, even if that number is obviously irrelevant. In a classic study, participants spun a wheel that stopped at either 10 or 65 and were then asked what percentage of African countries belonged to the United Nations. Those who had seen 65 gave much higher estimates.' },
            { speaker: 'Professor', text: 'What is striking is that the effect persists when people are warned about it, and even among experts. Estate agents who were shown different asking prices for the same house valued it differently, although most of them denied that the asking price had influenced them. So anchoring is not simply a matter of ignorance; it seems to reflect the way our minds adjust from a starting point — and the adjustment is usually insufficient.' },
          ],
          questions: [
            { q: 'What is the professor’s main point about anchoring?', options: ['Irrelevant numbers can strongly influence estimates.', 'Experts are immune to bias.', 'Wheels of fortune are unreliable.', 'People are usually good at estimating.'], answer: 0 },
            { q: 'Why does the professor mention estate agents?', options: ['To describe the housing market', 'To show that even experts are affected', 'To explain how prices are set', 'To contrast experts with students'], answer: 1 },
            { q: 'What does the professor imply about warning people about anchoring?', options: ['It removes the bias completely.', 'It makes estimates higher.', 'It does not eliminate the effect.', 'It is not allowed in experiments.'], answer: 2 },
          ],
        },
      ],
    },
  },
  writing: {
    buildSentenceIds: ['bs-001', 'bs-004', 'bs-012', 'bs-020', 'bs-031', 'bs-045', 'bs-058', 'bs-077', 'bs-090', 'bs-110'],
    email: {
      id: 't1-email',
      situation: 'You recently bought a pair of wireless headphones from an online store called SoundWay. When they arrived, the left side did not work.',
      bullets: ['Describe the problem.', 'Explain what you have already tried.', 'Say what you would like the store to do.'],
      model:
        'Dear SoundWay Customer Service,\n\nI am writing about order no. 48213, a pair of AirLite wireless headphones that was delivered on Monday. Unfortunately, the left earphone produces no sound at all, although the right one works perfectly.\n\nBefore contacting you, I charged the headphones fully, reset them following the instructions in the manual and tested them with two different phones and a laptop. The problem was the same every time, so I am confident that the fault is in the headphones themselves.\n\nI would be grateful if you could send me a replacement pair as soon as possible. Alternatively, please let me know how to return the item for a full refund. I can send photos or a short video of the problem if that would help.\n\nThank you for your assistance.\n\nYours faithfully,\nMariana Costa',
    },
    discussion: {
      id: 't1-discussion',
      professor: 'Dr Alvarez',
      prompt:
        'This week we are discussing how universities should prepare students for their careers. Some people argue that every student should be required to complete an internship before graduating. Others believe internships should remain optional. What is your view, and why?',
      posts: [
        { name: 'Lena', text: 'I think internships should be compulsory. Real work experience teaches skills you can’t learn in a lecture hall, like teamwork and time management, and it helps students build professional contacts before they graduate.' },
        { name: 'Daniel', text: 'I disagree. Many students already work part-time to pay for their studies, so a compulsory internship would be an extra burden. Also, some fields, like pure mathematics, don’t have obvious internships at all.' },
      ],
      model:
        'Both Lena and Daniel make valid points, but I believe internships should be strongly encouraged rather than compulsory. Lena is right that work experience develops practical skills, yet a requirement would hit hardest the students Daniel mentions — those who already work to support themselves. A better solution would be for universities to count relevant part-time jobs or research projects as equivalent experience. In my own course, for example, students can earn credit by assisting in a laboratory, which provides many of the same benefits as an internship without forcing anyone to give up paid work. This flexible approach would keep the advantages of internships while avoiding the unfairness of a single rule for everyone.',
    },
  },
  speaking: {
    repeatContext: 'You are training to be a guide at a city museum. Listen to the coordinator and repeat exactly what she says.',
    repeat: [
      'Welcome to the City Museum.',
      'Please leave large bags in the lockers.',
      'The new exhibition is on the second floor.',
      'Photographs are allowed, but please don’t use a flash.',
      'Guided tours start every hour from the main entrance.',
      'If you get lost, ask any member of staff wearing a blue badge.',
      'The café on the ground floor serves light meals until half past four.',
    ],
    interviewContext: 'A researcher is interviewing you about how people use public spaces in cities.',
    interview: [
      { q: 'How often do you visit parks or other public spaces in your city, and what do you usually do there?', model: 'I go to the park near my flat about twice a week, usually in the early evening. I like to walk or run around the lake, and on Sundays I sometimes meet friends there for a picnic. It’s one of the few places in the city where I can relax without spending money.' },
      { q: 'What would make the public spaces in your neighbourhood more attractive?', model: 'Mainly better maintenance and more shade. Some of our squares have broken benches and very few trees, so nobody stays there in the afternoon heat. If the council planted trees and installed drinking fountains, I think families and older people would use those spaces much more.' },
      { q: 'Some people say cities should replace car parks with green areas. Do you agree? Why or why not?', model: 'I partly agree. In central areas with good public transport, replacing car parks with green spaces makes sense, because it reduces traffic and heat. However, in neighbourhoods where buses are infrequent, people still depend on their cars, so the change should come together with better transport.' },
      { q: 'In your opinion, should local governments spend more on libraries or on sports facilities? Explain.', model: 'It’s a difficult choice, but I would prioritise libraries. Today they are not just places to borrow books; they offer free internet, study rooms and courses, which help people who can’t afford them at home. Sports facilities are important too, but many sports can be practised in parks at low cost.' },
    ],
  },
};
