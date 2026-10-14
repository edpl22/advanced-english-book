import { PARTICLE_SENSES, PHRASAL_VERBS, pvLabel, type PvTheme } from '../phrasal/dictionary';
import { buildUnit, type Block, type UnitInput } from './types';

const THEME_TITLES: Partial<Record<PvTheme, string>> = {
  work: 'Work and business',
  relationships: 'Relationships',
  travel: 'Travel',
  problems: 'Problems and solutions',
  money: 'Money',
};

function themeTable(theme: PvTheme): Block {
  const rows = PHRASAL_VERBS.filter((p) => p.themes.includes(theme))
    .slice(0, 12)
    .map((p) => [`**${pvLabel(p)}**`, p.meaning, `*${p.examples[0].replace(/[{}]/g, '')}*`]);
  return { kind: 'table', caption: THEME_TITLES[theme], head: ['Phrasal verb', 'Meaning', 'Example'], rows };
}

const registerRows = PHRASAL_VERBS.filter((p) => p.formal && p.type !== 'intransitive')
  .slice(0, 28)
  .map((p) => [pvLabel(p), p.formal!, p.meaning]);

const threePartRows = PHRASAL_VERBS.filter((p) => p.type === 'three-part').map((p) => [`**${pvLabel(p)}**`, p.meaning, `*${p.examples[0].replace(/[{}]/g, '')}*`]);

const unit: UnitInput = {
  id: 'u22',
  number: 22,
  part: 'IV',
  topic: 'phrasal-verbs',
  title: 'Phrasal verbs',
  levelRange: 'B1–C2',
  intro:
    'Phrasal verbs are the everyday engine of English: native speakers use them constantly, often where a Portuguese speaker would choose a single verb of Latin origin. Learning them one by one is slow. This unit shows how they behave grammatically, what the main particles mean, and when to replace them with formal verbs in academic writing. Appendix B lists every phrasal verb in the book’s dictionary.',
  sections: [
    {
      id: '22.1',
      title: 'What is a phrasal verb?',
      blocks: [
        {
          kind: 'p',
          text: 'A **phrasal verb** is a verb followed by one or two **particles** (adverbs or prepositions such as *up, out, off, with*). Together they form a unit of meaning that is often idiomatic — impossible to guess from the separate words: *give up* (stop), *turn down* (refuse), *put up with* (tolerate).',
        },
        {
          kind: 'p',
          text: 'The same combination can be literal or idiomatic: *She picked up the pen* (lifted it) · *She picked up some Italian in Milan* (learned it informally). Many phrasal verbs have several meanings, so always read the context.',
        },
        {
          kind: 'table',
          caption: 'Four types of phrasal verb',
          head: ['Type', 'Object?', 'Word order', 'Examples'],
          rows: [
            ['Intransitive', 'no', 'verb + particle', '*The car broke down.* · *Prices went up.*'],
            ['Transitive, separable', 'yes', 'noun before or after the particle; pronoun between', '*turn off the lights / turn the lights off / turn them off*'],
            ['Transitive, inseparable', 'yes', 'object always after the particle', '*look after the children / look after them*'],
            ['Three-part', 'yes', 'never separated; object at the end', '*put up with the noise / put up with it*'],
          ],
        },
        {
          kind: 'note',
          variant: 'note',
          title: 'Phrasal or prepositional?',
          text: 'Some grammars call inseparable verbs like *look after, deal with, rely on* “prepositional verbs”. For learners the practical rule is the same: the object never goes between the verb and the particle.',
        },
        {
          kind: 'pt',
          title: 'Para falantes de português',
          text: 'Em português, o sentido costuma estar no verbo (“adiar”, “cancelar”, “descobrir”); em inglês, muitas vezes está na partícula (*put off, call off, find out*). Evite traduzir palavra por palavra: “desistir” não é *give in* em todos os contextos (*give up* = parar de tentar; *give in* = ceder à pressão). E cuidado com os verbos que regem preposição diferente da do português: *depend on* (depender **de**), *consist of* (consistir **em**), *dream of / about* (sonhar **com**).',
        },
      ],
    },
    {
      id: '22.2',
      title: 'Word order and pronouns',
      blocks: [
        {
          kind: 'p',
          text: 'With **separable** verbs, a noun object can go before or after the particle: *She turned down the offer* / *She turned the offer down*. A **pronoun** must go between the verb and the particle: *She turned it down* — never *turned down it*.',
        },
        {
          kind: 'table',
          caption: 'Where does the object go?',
          head: ['', 'Noun object', 'Pronoun object'],
          rows: [
            ['separable (turn off)', 'turn off the radio ✓ · turn the radio off ✓', 'turn it off ✓ · *turn off it* ✗'],
            ['inseparable (look after)', 'look after the kids ✓ · *look the kids after* ✗', 'look after them ✓ · *look them after* ✗'],
            ['three-part (put up with)', 'put up with the noise ✓', 'put up with it ✓ · *put it up with* ✗'],
          ],
        },
        {
          kind: 'p',
          text: 'When the object is long, it normally goes **after** the particle (end weight): *She turned down the offer from the bank in Curitiba* is more natural than *She turned the offer from the bank in Curitiba down*.',
        },
        {
          kind: 'note',
          variant: 'watch',
          title: 'Watch out!',
          text: 'A gerund after a three-part verb ending in *to* is common: *I look forward to hearing from you* (not *to hear*). Here *to* is a preposition, not part of an infinitive.',
        },
      ],
    },
    {
      id: '22.3',
      title: 'Particles and their core meanings',
      blocks: [
        {
          kind: 'p',
          text: 'Particles are not random. Each has a few core meanings, and once you know them many phrasal verbs become transparent. The table below lists the main meanings; the dictionary in Appendix B can be filtered by particle.',
        },
        {
          kind: 'table',
          caption: 'Core meanings of the main particles',
          head: ['Particle', 'Core meanings', 'Examples'],
          rows: PARTICLE_SENSES.map((p) => [`**${p.particle}**`, p.senses, `*${p.examples.join(', ')}*`]),
        },
        {
          kind: 'examples',
          items: [
            { en: 'Sales picked up in the second quarter.', note: 'up = increase' },
            { en: 'We have used up all the printer paper.', note: 'up = completion' },
            { en: 'The heat finally died down after sunset.', note: 'down = reduction' },
            { en: 'The researchers found out that the samples were contaminated.', note: 'out = discovery' },
            { en: 'The concert was called off at the last minute.', note: 'off = cancellation' },
            { en: 'Carry on — I didn’t mean to interrupt.', note: 'on = continuation' },
          ],
        },
      ],
    },
    {
      id: '22.4',
      title: 'Phrasal verbs by theme',
      blocks: [
        { kind: 'p', text: 'Learning phrasal verbs in topic groups helps you use them in speaking and writing tasks. Each table shows a selection from the dictionary; the full lists are in Appendix B.' },
        themeTable('work'),
        themeTable('relationships'),
        themeTable('travel'),
        themeTable('problems'),
        themeTable('money'),
      ],
    },
    {
      id: '22.5',
      title: 'Register: phrasal verbs and formal equivalents',
      blocks: [
        {
          kind: 'p',
          text: 'Phrasal verbs are normal in speech and in most writing, but in **formal and academic writing** a single verb of Latin origin is often preferred: *The researchers carried out a survey* → *The researchers conducted a survey*. This matters in TOEFL and IELTS writing tasks, where an appropriate register is assessed.',
        },
        {
          kind: 'table',
          caption: 'Phrasal verb ↔ formal equivalent',
          head: ['Phrasal verb', 'Formal verb', 'Meaning'],
          rows: registerRows,
        },
        {
          kind: 'note',
          variant: 'exam',
          title: 'Exam focus',
          text: 'Don’t remove every phrasal verb from an essay — that sounds unnatural. Replace only the informal ones (*find out, figure out, sort out, put up with*) and keep the neutral ones (*carry out, set up, point out*), which are common in academic prose.',
        },
      ],
    },
    {
      id: '22.6',
      title: 'Three-part verbs',
      blocks: [
        {
          kind: 'p',
          text: 'Three-part verbs combine a verb, an adverb particle and a preposition. They are never separated, and a pronoun object goes at the end: *I can’t put up with it*.',
        },
        { kind: 'table', caption: 'Three-part verbs in the dictionary', head: ['Verb', 'Meaning', 'Example'], rows: threePartRows },
      ],
    },
  ],
  examples: {
    title: 'In context: an email to a colleague',
    text:
      'Hi Marta — Just a quick update. The client called off Friday’s meeting, so we’ve put the presentation off until the 12th. I’ve looked into the delivery problem: it turns out the supplier ran out of packaging, which held up the whole order. I’ve sorted it out for now, but we need to come up with a long-term solution. Could you go over the new figures before Monday and point out anything that doesn’t add up? I’m counting on you! Speak soon, Rafael',
    note: 'Find ten phrasal verbs. Which are separable? Which would you replace in a formal report?',
  },
  mistakes: [
    { wrong: 'Turn off it, please.', right: 'Turn it off, please.', why: 'Com verbos separáveis, o pronome fica entre o verbo e a partícula.' },
    { wrong: 'I look forward to hear from you.', right: 'I look forward to hearing from you.', why: 'Em *look forward to*, o *to* é preposição: use o gerúndio (-ing).' },
    { wrong: 'She looked them after.', right: 'She looked after them.', why: '*Look after* é inseparável: o objeto vem sempre depois da partícula.' },
    { wrong: 'We need to come up a solution.', right: 'We need to come up with a solution.', why: '*Come up with* tem três partes; sem *with* o sentido muda.' },
    { wrong: 'I gave up to smoke last year.', right: 'I gave up smoking last year.', why: 'Depois de *give up*, use o gerúndio.' },
    { wrong: 'The meeting was put up until Friday.', right: 'The meeting was put off until Friday.', why: '“Adiar” = *put off*. *Put up* = hospedar, aumentar, erguer.' },
    { wrong: 'I can’t support this noise.', right: 'I can’t put up with this noise.', why: '“Suportar” no sentido de tolerar é *put up with* ou *stand*, não *support* (que significa apoiar).' },
    { wrong: 'Depend of the weather.', right: 'Depend on the weather.', why: 'Em inglês é *depend on*, não “of” (do português “depender de”).' },
  ],
  examFocus: [
    { exam: 'TOEFL iBT (2026)', tags: ['TOEFL'], text: 'Listening (conversations and announcements) is full of phrasal verbs; in Write an Email they sound natural, while in the Academic Discussion a mix of neutral phrasal verbs and formal verbs is ideal.' },
    { exam: 'IELTS', tags: ['IELTS'], text: 'Speaking: idiomatic phrasal verbs raise your Lexical Resource score. Writing Task 2: prefer formal equivalents for informal verbs (find out → discover).' },
    { exam: 'Cambridge C1 / C2', tags: ['CAE', 'CPE'], text: 'Key word transformations often require a phrasal verb (PUT → put up with; OFF → called off). Open cloze tests particles.' },
    { exam: 'ENEM · FUVEST', tags: ['ENEM', 'FUVEST'], text: 'Reading questions ask for the meaning of a phrasal verb in context; the literal meaning of the parts is usually a trap.' },
    { exam: 'EsPCEx · AFA · EFOMM · EN', tags: ['EsPCEx', 'AFA', 'EFOMM', 'EN'], text: 'Multiple-choice synonyms (“The underlined phrasal verb is closest in meaning to…”) and particle choice.' },
  ],
  exercises: [
    {
      id: '22.1',
      title: 'Choosing the particle',
      instruction: 'Choose the particle that completes the phrasal verb.',
      ref: '22.3',
      level: 'B2',
      difficulty: 2,
      examTags: ['ENEM', 'EsPCEx', 'TOEFL'],
      skill: 'vocabulary',
      items: [
        { type: 'mcq', prompt: 'The meeting has been called ___ because the director is ill.', options: ['off', 'out', 'up', 'down'], answer: 0, explanation: 'call off = cancel.' },
        { type: 'mcq', prompt: 'I can’t figure ___ how this new printer works.', options: ['in', 'out', 'up', 'off'], answer: 1, explanation: 'figure out = understand after thinking.' },
        { type: 'mcq', prompt: 'Prices went ___ by 12% last year.', options: ['off', 'out', 'up', 'on'], answer: 2, explanation: 'go up = increase (up = increase).' },
        { type: 'mcq', prompt: 'Don’t give ___ — you’re nearly at the top!', options: ['off', 'away', 'over', 'up'], answer: 3, explanation: 'give up = stop trying.' },
        { type: 'mcq', prompt: 'She takes ___ her mother: same eyes, same laugh.', options: ['after', 'over', 'on', 'up'], answer: 0, explanation: 'take after = resemble an older relative.' },
        { type: 'mcq', prompt: 'We ran ___ of milk, so I had black coffee.', options: ['away', 'out', 'off', 'over'], answer: 1, ref: '22.6', explanation: 'run out of = have none left.' },
        { type: 'mcq', prompt: 'Could you turn ___ the volume? I can’t hear the speaker.', options: ['down', 'off', 'up', 'over'], answer: 2, explanation: 'turn up = increase the volume (you can’t hear).' },
        { type: 'mcq', prompt: 'The plane took ___ two hours late because of fog.', options: ['up', 'out', 'over', 'off'], answer: 3, explanation: 'take off = leave the ground.' },
        { type: 'mcq', prompt: 'I came ___ an old photo of my grandparents while tidying the attic.', options: ['across', 'along', 'over', 'round'], answer: 0, explanation: 'come across = find by chance.' },
        { type: 'mcq', prompt: 'The company had to lay ___ 200 workers after the crisis.', options: ['down', 'off', 'out', 'up'], answer: 1, explanation: 'lay off = dismiss because there is no work.' },
        { type: 'mcq', prompt: 'Can you look ___ my cat while I’m away?', options: ['on', 'into', 'after', 'over'], answer: 2, explanation: 'look after = take care of.' },
        { type: 'mcq', prompt: 'The negotiators finally came ___ with a compromise.', options: ['off', 'down', 'in', 'up'], answer: 3, ref: '22.6', explanation: 'come up with = think of (an idea, a solution).' },
        { type: 'mcq', prompt: 'Please fill ___ this form in block capitals.', options: ['in', 'up', 'down', 'off'], answer: 0, explanation: 'fill in (or fill out) = complete a form.' },
        { type: 'mcq', prompt: 'It took her months to get ___ the divorce.', options: ['out', 'over', 'by', 'off'], answer: 1, explanation: 'get over = recover from.' },
        { type: 'mcq', prompt: 'I can’t put ___ with this noise any longer.', options: ['off', 'on', 'up', 'out'], answer: 2, ref: '22.6', explanation: 'put up with = tolerate.' },
      ],
    },
    {
      id: '22.2',
      title: 'Phrasal verbs in the right form',
      instruction: 'Complete each sentence with the phrasal verb in brackets in the correct form.',
      ref: '22.4',
      level: 'B2',
      difficulty: 3,
      examTags: ['CAE', 'IELTS', 'TOEFL'],
      skill: 'vocabulary',
      items: [
        { type: 'phrasal-choice', prompt: 'The government ___ a new tax on sugary drinks last year.', cue: 'bring in', acceptedAnswers: ['brought in'], explanation: 'bring in = introduce (a law, a tax); past simple.' },
        { type: 'phrasal-choice', prompt: 'Our flight was cancelled, so we ___ at the airport hotel.', cue: 'end up', acceptedAnswers: ['ended up'], explanation: 'end up = finally be in a place you did not plan.' },
        { type: 'phrasal-choice', prompt: 'I ___ smoking ten years ago and have never felt better.', cue: 'give up', acceptedAnswers: ['gave up'], explanation: 'give up = stop.' },
        { type: 'phrasal-choice', prompt: 'The manager is ___ the complaint right now.', cue: 'look into', acceptedAnswers: ['looking into'], explanation: 'look into = investigate (present continuous).' },
        { type: 'phrasal-choice', prompt: 'Before you decide, ___ the offer carefully.', cue: 'think over', acceptedAnswers: ['think over'], explanation: 'think over = consider; imperative.' },
        { type: 'phrasal-choice', prompt: 'The fire alarm ___ in the middle of the exam.', cue: 'go off', acceptedAnswers: ['went off'], explanation: 'go off = start ringing.' },
        { type: 'phrasal-choice', prompt: 'She ___ by her grandparents in a small town in Minas Gerais.', cue: 'bring up', acceptedAnswers: ['was brought up'], explanation: 'bring up = raise a child; passive.' },
        { type: 'phrasal-choice', prompt: 'The talks ___ after the two sides failed to agree on wages.', cue: 'break down', acceptedAnswers: ['broke down'], explanation: 'break down = fail (negotiations).' },
        { type: 'phrasal-choice', prompt: 'We need to ___ the cost of the project before we ask for funding.', cue: 'work out', acceptedAnswers: ['work out'], explanation: 'work out = calculate.' },
        { type: 'phrasal-choice', prompt: 'Several employees ___ at the meeting without having read the report.', cue: 'turn up', acceptedAnswers: ['turned up'], explanation: 'turn up = arrive.' },
        { type: 'phrasal-choice', prompt: 'The new software ___ our accounting process considerably since it was installed.', cue: 'speed up', acceptedAnswers: ['has sped up', 'has speeded up'], explanation: 'speed up = make faster; present perfect with since.' },
        { type: 'phrasal-choice', prompt: 'By the time the firefighters arrived, the neighbours ___ the fire.', cue: 'put out', acceptedAnswers: ['had put out'], explanation: 'put out = extinguish; past perfect.' },
        { type: 'phrasal-choice', prompt: 'I’m really ___ the conference in Lisbon next month.', cue: 'look forward to', acceptedAnswers: ['looking forward to'], ref: '22.6', explanation: 'look forward to + noun / -ing.' },
        { type: 'phrasal-choice', prompt: 'The company ___ by a Chinese group in 2021.', cue: 'take over', acceptedAnswers: ['was taken over'], explanation: 'take over = acquire control; passive.' },
        { type: 'phrasal-choice', prompt: 'The children ___ quickly after the long journey.', cue: 'calm down', acceptedAnswers: ['calmed down'], explanation: 'calm down = become calm.' },
      ],
    },
    {
      id: '22.3',
      title: 'Pronouns in their place',
      instruction: 'Put the fragments in order. Pay attention to the position of the pronoun.',
      ref: '22.2',
      level: 'B1',
      difficulty: 2,
      examTags: ['TOEFL', 'ENEM'],
      items: [
        { type: 'word-order', fragments: ['The radio is', 'too loud.', 'Please', 'turn', 'it', 'down.'], acceptedAnswers: ['The radio is too loud. Please turn it down.'], explanation: 'Separable: pronoun between verb and particle — turn it down.' },
        { type: 'word-order', fragments: ['She offered me', 'a lift,', 'but I', 'turned', 'it', 'down.'], acceptedAnswers: ['She offered me a lift, but I turned it down.'], explanation: 'turn it down (separable).' },
        { type: 'word-order', fragments: ['My grandmother', 'is ill,', 'so I', 'look', 'after', 'her.'], acceptedAnswers: ['My grandmother is ill, so I look after her.'], explanation: 'Inseparable: look after her.' },
        { type: 'word-order', fragments: ['That noise', 'is unbearable.', 'I can’t', 'put up', 'with', 'it.'], acceptedAnswers: ['That noise is unbearable. I can’t put up with it.'], ref: '22.6', explanation: 'Three-part verb: the pronoun goes at the end.' },
        { type: 'word-order', fragments: ['If you', 'don’t know', 'the word,', 'look', 'it', 'up.'], acceptedAnswers: ['If you don’t know the word, look it up.'], explanation: 'Separable: look it up.' },
        { type: 'word-order', fragments: ['These boxes', 'are in the way.', 'Could you', 'put', 'them', 'away?'], acceptedAnswers: ['These boxes are in the way. Could you put them away?'], explanation: 'Separable: put them away.' },
        { type: 'word-order', fragments: ['Here’s', 'the form.', 'Please', 'fill', 'it', 'in.'], acceptedAnswers: ['Here’s the form. Please fill it in.'], explanation: 'Separable: fill it in.' },
        { type: 'word-order', fragments: ['I lost', 'my old diary', 'and never', 'came', 'across', 'it again.'], acceptedAnswers: ['I lost my old diary and never came across it again.'], explanation: 'Inseparable: come across it.' },
      ],
    },
    {
      id: '22.4',
      title: 'Spot the error',
      instruction: 'One underlined part in each sentence is wrong. Select it and write the correction.',
      ref: '22.2',
      level: 'B2',
      difficulty: 3,
      examTags: ['ITA', 'IME', 'EN', 'EFOMM'],
      items: [
        { type: 'error-correction', parts: ['Could you ', { u: 'turn off it' }, ' before you ', { u: 'leave' }, '?'], errorIndex: 0, acceptedAnswers: ['turn it off', 'switch it off'], explanation: 'Pronoun between verb and particle: turn it off.' },
        { type: 'error-correction', parts: ['I’ve been ', { u: 'looking for' }, ' my glasses all morning, but I can’t ', { u: 'find out' }, ' them.'], errorIndex: 1, acceptedAnswers: ['find'], ref: '22.3', explanation: 'find (a lost object) ≠ find out (discover information).' },
        { type: 'error-correction', parts: ['Don’t ', { u: 'put off it' }, ' any longer — ', { u: 'call' }, ' the bank today.'], errorIndex: 0, acceptedAnswers: ['put it off'], explanation: 'Separable: put it off.' },
        { type: 'error-correction', parts: ['We need to ', { u: 'come up' }, ' a better solution ', { u: 'before' }, ' the deadline.'], errorIndex: 0, acceptedAnswers: ['come up with'], ref: '22.6', explanation: 'come up with + noun.' },
        { type: 'error-correction', parts: ['My car ', { u: 'broke down' }, ' on the motorway, so I ', { u: 'called' }, ' a mechanic to ', { u: 'look it at' }, '.'], errorIndex: 2, acceptedAnswers: ['look at it'], explanation: 'look at is inseparable: look at it.' },
        { type: 'error-correction', parts: ['I ', { u: 'get along' }, ' very well ', { u: 'to' }, ' my new flatmates.'], errorIndex: 1, acceptedAnswers: ['with'], ref: '22.6', explanation: 'get along with someone.' },
        { type: 'error-correction', parts: ['We have ', { u: 'run out' }, ' of milk, so I’ll ', { u: 'pick up it' }, ' on the way home.'], errorIndex: 1, acceptedAnswers: ['pick it up', 'pick some up'], explanation: 'Separable: pick it up.' },
        { type: 'error-correction', parts: ['The meeting has been ', { u: 'put up' }, ' until next week because the director is ', { u: 'away' }, '.'], errorIndex: 0, acceptedAnswers: ['put off', 'put back', 'postponed'], explanation: 'put off / put back = postpone. Put up = raise, accommodate.' },
        { type: 'error-correction', parts: ['I ', { u: 'look forward to hear' }, ' from you ', { u: 'soon' }, '.'], errorIndex: 0, acceptedAnswers: ['look forward to hearing'], ref: '22.6', explanation: 'look forward to + -ing.' },
        { type: 'error-correction', parts: ['The firm ', { u: 'laid off' }, ' fifty workers and ', { u: 'took on them' }, ' again a year later.'], errorIndex: 1, acceptedAnswers: ['took them on'], explanation: 'Separable: took them on.' },
        { type: 'error-correction', parts: ['She ', { u: 'gave up to smoke' }, ' when she ', { u: 'found out' }, ' she was pregnant.'], errorIndex: 0, acceptedAnswers: ['gave up smoking'], explanation: 'give up + -ing.' },
      ],
    },
    {
      id: '22.5',
      title: 'Matching registers',
      instruction: 'Match each verb on the left with its equivalent on the right. There is one extra option.',
      ref: '22.5',
      level: 'B2',
      difficulty: 3,
      examTags: ['TOEFL', 'IELTS', 'CAE'],
      skill: 'vocabulary',
      items: [
        { type: 'matching', prompt: 'Phrasal verb → formal verb', left: ['put off', 'find out', 'carry out', 'set up', 'turn down'], right: ['decline', 'establish', 'postpone', 'tolerate', 'conduct', 'discover'], answer: [2, 5, 4, 1, 0], explanation: 'put off = postpone; find out = discover; carry out = conduct; set up = establish; turn down = decline.' },
        { type: 'matching', prompt: 'Formal verb → phrasal verb', left: ['investigate', 'tolerate', 'cancel', 'reduce', 'recover from'], right: ['get over', 'call off', 'take after', 'look into', 'cut down on', 'put up with'], answer: [3, 5, 1, 4, 0], explanation: 'investigate = look into; tolerate = put up with; cancel = call off; reduce = cut down on; recover from = get over.' },
      ],
    },
    {
      id: '22.6',
      title: 'Key word transformations',
      instruction: 'Complete the second sentence so that it has a similar meaning to the first, using the word given. Use between two and five words.',
      ref: '22.5',
      level: 'C1',
      difficulty: 4,
      examTags: ['CAE', 'CPE', 'ITA'],
      items: [
        { type: 'kwt', first: 'The match was cancelled because of the storm.', keyword: 'OFF', before: 'The match was', after: 'because of the storm.', acceptedAnswers: ['called off'], explanation: 'cancel = call off.' },
        { type: 'kwt', first: 'I can’t tolerate his rudeness any more.', keyword: 'PUT', before: 'I can’t', after: 'his rudeness any more.', acceptedAnswers: ['put up with'], ref: '22.6', explanation: 'tolerate = put up with.' },
        { type: 'kwt', first: 'Who will take care of your dog while you’re on holiday?', keyword: 'AFTER', before: 'Who will', after: 'your dog while you’re on holiday?', acceptedAnswers: ['look after'], explanation: 'take care of = look after.' },
        { type: 'kwt', first: 'We have no coffee left.', keyword: 'OUT', before: 'We have', after: 'coffee.', acceptedAnswers: ['run out of'], ref: '22.6', explanation: 'have none left = run out of.' },
        { type: 'kwt', first: 'She resembles her grandmother.', keyword: 'TAKES', before: 'She', after: 'her grandmother.', acceptedAnswers: ['takes after'], explanation: 'resemble = take after.' },
        { type: 'kwt', first: 'The police are investigating the cause of the accident.', keyword: 'LOOKING', before: 'The police are', after: 'the cause of the accident.', acceptedAnswers: ['looking into'], explanation: 'investigate = look into.' },
        { type: 'kwt', first: 'I’m excited about seeing you next week.', keyword: 'FORWARD', before: 'I’m', after: 'you next week.', acceptedAnswers: ['looking forward to seeing'], ref: '22.6', explanation: 'look forward to + -ing.' },
        { type: 'kwt', first: 'He invented an excuse for being late.', keyword: 'MADE', before: 'He', after: 'for being late.', acceptedAnswers: ['made up an excuse', 'made an excuse up'], explanation: 'invent (a story, an excuse) = make up; separable.' },
        { type: 'kwt', first: 'Somebody should deal with this problem immediately.', keyword: 'SORTED', before: 'This problem should', after: 'immediately.', acceptedAnswers: ['be sorted out'], explanation: 'deal with a problem = sort it out; passive with should.' },
        { type: 'kwt', first: 'The company refused my application.', keyword: 'DOWN', before: 'My application', after: 'by the company.', acceptedAnswers: ['was turned down'], explanation: 'refuse = turn down; passive.' },
      ],
    },
    {
      id: '22.7',
      title: 'Open cloze: particles',
      instruction: 'Write ONE particle in each gap.',
      ref: '22.3',
      level: 'B2',
      difficulty: 3,
      examTags: ['CAE', 'ENEM', 'TOEFL'],
      skill: 'vocabulary',
      items: [
        {
          type: 'open-cloze',
          title: 'From dream to bakery',
          text:
            'When Júlia decided to set [1] her own bakery, her friends tried to talk her [2] of it. “You’ll run [3] of money in six months,” they warned. But she didn’t give [4]. She drew [5] a business plan, looked [6] the cost of renting a shop and worked [7] that she needed at least R$ 80,000. When the first bank turned her [8], she did not lose heart: she put [9] a new proposal, and a local credit union finally backed her [10].',
          gaps: [
            { acceptedAnswers: ['up'], explanation: 'set up = start a business.' },
            { acceptedAnswers: ['out'], explanation: 'talk someone out of something = persuade them not to do it.' },
            { acceptedAnswers: ['out'], explanation: 'run out of = have none left.' },
            { acceptedAnswers: ['up', 'in'], explanation: 'give up = stop trying; give in = yield to pressure.' },
            { acceptedAnswers: ['up'], explanation: 'draw up = prepare a document.' },
            { acceptedAnswers: ['into', 'at', 'up'], explanation: 'look into = investigate (look at / look up are also possible here).' },
            { acceptedAnswers: ['out'], explanation: 'work out = calculate.' },
            { acceptedAnswers: ['down'], explanation: 'turn down = refuse.' },
            { acceptedAnswers: ['forward', 'together'], explanation: 'put forward = propose; put together = prepare.' },
            { acceptedAnswers: ['up'], explanation: 'back up = support.' },
          ],
          explanation: 'Particles with their core meanings in a short narrative.',
        },
      ],
    },
    {
      id: '22.8',
      title: 'Multiple-choice cloze',
      instruction: 'Choose the best option (A, B, C or D) for each gap.',
      ref: '22.4',
      level: 'B2',
      difficulty: 3,
      examTags: ['CAE', 'EsPCEx', 'EFOMM', 'ENEM'],
      skill: 'vocabulary',
      items: [
        {
          type: 'mc-cloze',
          title: 'My first week',
          text:
            'On my first day, the manager showed me [1] the office and introduced me to the team. Everyone was friendly, and I got [2] well with my colleagues from the start. The workload, however, was heavy, and I often had to stay late to catch [3] with emails. One day the printer broke [4] just before an important meeting, and I had to [5] out a solution fast. Fortunately, a colleague offered to print the slides at home and [6] them off at the office. The meeting went [7] without problems, and afterwards my manager said she had been impressed by the way I had dealt [8] the situation.',
          gaps: [
            { options: ['around', 'up', 'off', 'after'], answer: 0, explanation: 'show someone around = give a tour.' },
            { options: ['over', 'along', 'through', 'by'], answer: 1, explanation: 'get along (well) with.' },
            { options: ['on', 'out', 'up', 'in'], answer: 2, explanation: 'catch up with = reach the same level.' },
            { options: ['up', 'out', 'off', 'down'], answer: 3, explanation: 'break down = stop working.' },
            { options: ['find', 'figure', 'give', 'take'], answer: 1, explanation: 'figure out a solution.' },
            { options: ['take', 'put', 'drop', 'turn'], answer: 2, explanation: 'drop off = deliver and leave.' },
            { options: ['up', 'out', 'in', 'off'], answer: 3, explanation: 'go off (well / without problems) = happen.' },
            { options: ['with', 'for', 'about', 'by'], answer: 0, explanation: 'deal with = handle.' },
          ],
          explanation: 'Phrasal verbs in a workplace narrative.',
        },
      ],
    },
  ],
  quickReview: {
    points: [
      'Separable verbs: noun before or after the particle; pronoun always between (turn it off).',
      'Inseparable and three-part verbs: object after the whole verb (look after it, put up with it).',
      'Particles have core meanings: up (increase, completion), down (reduction, recording), out (discovery, exhaustion), off (cancellation, departure), on (continuation), over (review, transfer).',
      'In formal writing, replace informal phrasal verbs with single verbs: find out → discover, put off → postpone.',
      'look forward to / object to / get round to + -ing.',
    ],
    selfCheck: [
      { q: 'Correct it: “Please hand in it by Friday.”', a: 'Please hand it in by Friday.' },
      { q: 'What does “turn up” mean in “Only six people turned up”?', a: 'arrived / came' },
      { q: 'Give a formal equivalent of “carry out a survey”.', a: 'conduct a survey' },
      { q: 'Complete: “I can’t put up ___ it any more.”', a: 'with' },
    ],
  },
  generators: ['phrasal-verbs', 'phrasal-up', 'phrasal-out', 'phrasal-off'],
};

export const U22 = buildUnit(unit);
