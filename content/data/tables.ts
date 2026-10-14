/**
 * Tables for the vocabulary generators. Every frame sentence is original.
 * `exclude` lists options that are not the expected answer but could be
 * defended in some reading, so they are never offered as wrong options.
 */

// ── Plurals ─────────────────────────────────────────────────────────────
export interface PluralRow {
  singular: string;
  plurals: string[];
  /** Typical wrong plurals (regularised). Filtered against `plurals`. */
  wrong: string[];
  note: string;
  level: 'B1' | 'B2' | 'C1' | 'C2';
}

export const PLURALS: PluralRow[] = [
  { singular: 'criterion', plurals: ['criteria'], wrong: ['criterions', 'criterias', 'criterion'], note: 'Greek -on → -a', level: 'C1' },
  { singular: 'phenomenon', plurals: ['phenomena'], wrong: ['phenomenons', 'phenomenas', 'phenomenum'], note: 'Greek -on → -a', level: 'C1' },
  { singular: 'analysis', plurals: ['analyses'], wrong: ['analysises', 'analysis', 'analysies'], note: 'Greek -is → -es', level: 'C1' },
  { singular: 'thesis', plurals: ['theses'], wrong: ['thesises', 'thesis', 'thesies'], note: 'Greek -is → -es', level: 'C1' },
  { singular: 'hypothesis', plurals: ['hypotheses'], wrong: ['hypothesises', 'hypothesis', 'hypothesies'], note: 'Greek -is → -es', level: 'C1' },
  { singular: 'crisis', plurals: ['crises'], wrong: ['crisises', 'crisis', 'crisies'], note: 'Greek -is → -es', level: 'B2' },
  { singular: 'diagnosis', plurals: ['diagnoses'], wrong: ['diagnosises', 'diagnosis', 'diagnosies'], note: 'Greek -is → -es', level: 'C1' },
  { singular: 'basis', plurals: ['bases'], wrong: ['basises', 'basis', 'basies'], note: 'Greek -is → -es', level: 'C1' },
  { singular: 'oasis', plurals: ['oases'], wrong: ['oasises', 'oasis', 'oasies'], note: 'Greek -is → -es', level: 'C1' },
  { singular: 'axis', plurals: ['axes'], wrong: ['axises', 'axis', 'axies'], note: 'Greek -is → -es', level: 'C1' },
  { singular: 'datum', plurals: ['data'], wrong: ['datums', 'datas', 'dates'], note: 'Latin -um → -a (data is now usually treated as uncountable)', level: 'C1' },
  { singular: 'medium', plurals: ['media', 'mediums'], wrong: ['mediae', 'medias', 'medii'], note: 'media (communication); mediums (spiritualists, sizes)', level: 'C1' },
  { singular: 'bacterium', plurals: ['bacteria'], wrong: ['bacteriums', 'bacterias', 'bacterii'], note: 'Latin -um → -a', level: 'C1' },
  { singular: 'curriculum', plurals: ['curricula', 'curriculums'], wrong: ['curriculae', 'curriculi', 'curriculas'], note: 'Latin -um → -a (curriculums also used)', level: 'C1' },
  { singular: 'stimulus', plurals: ['stimuli'], wrong: ['stimuluses', 'stimulae', 'stimulus'], note: 'Latin -us → -i', level: 'C1' },
  { singular: 'nucleus', plurals: ['nuclei'], wrong: ['nucleuses', 'nucleae', 'nucleus'], note: 'Latin -us → -i', level: 'C1' },
  { singular: 'fungus', plurals: ['fungi', 'funguses'], wrong: ['fungae', 'fungus', 'fungies'], note: 'Latin -us → -i (funguses also used)', level: 'C1' },
  { singular: 'cactus', plurals: ['cacti', 'cactuses'], wrong: ['cactae', 'cactus', 'cacties'], note: 'Latin -us → -i (cactuses also used)', level: 'B2' },
  { singular: 'radius', plurals: ['radii', 'radiuses'], wrong: ['radiae', 'radius', 'radies'], note: 'Latin -us → -i', level: 'C1' },
  { singular: 'syllabus', plurals: ['syllabuses', 'syllabi'], wrong: ['syllabae', 'syllabus', 'syllabies'], note: 'syllabuses (BrE) or syllabi', level: 'C1' },
  { singular: 'formula', plurals: ['formulae', 'formulas'], wrong: ['formulaes', 'formulii', 'formulum'], note: 'Latin -a → -ae (formulas in general use)', level: 'C1' },
  { singular: 'larva', plurals: ['larvae'], wrong: ['larvas', 'larvaes', 'larvi'], note: 'Latin -a → -ae', level: 'C2' },
  { singular: 'appendix', plurals: ['appendices', 'appendixes'], wrong: ['appendixs', 'appendics', 'appendixi'], note: 'appendices (books); appendixes (anatomy)', level: 'C1' },
  { singular: 'index', plurals: ['indexes', 'indices'], wrong: ['indexs', 'indics', 'indexi'], note: 'indexes (books); indices (maths, economics)', level: 'C1' },
  { singular: 'matrix', plurals: ['matrices', 'matrixes'], wrong: ['matrixs', 'matrics', 'matrixi'], note: 'Latin -ix → -ices', level: 'C2' },
  { singular: 'vertex', plurals: ['vertices', 'vertexes'], wrong: ['vertexs', 'vertics', 'vertexi'], note: 'Latin -ex → -ices', level: 'C2' },
  { singular: 'child', plurals: ['children'], wrong: ['childs', 'childrens', 'childes'], note: 'irregular (-ren)', level: 'B1' },
  { singular: 'person', plurals: ['people', 'persons'], wrong: ['peoples', 'persones', 'personnes'], note: 'people (general); persons (formal, legal)', level: 'B1' },
  { singular: 'foot', plurals: ['feet'], wrong: ['foots', 'feets', 'footes'], note: 'vowel change', level: 'B1' },
  { singular: 'tooth', plurals: ['teeth'], wrong: ['tooths', 'teeths', 'toothes'], note: 'vowel change', level: 'B1' },
  { singular: 'goose', plurals: ['geese'], wrong: ['gooses', 'geeses', 'goosen'], note: 'vowel change', level: 'B2' },
  { singular: 'mouse', plurals: ['mice', 'mouses'], wrong: ['mices', 'mousen', 'mouse'], note: 'mice (animals); mouses is sometimes used for computer mice', level: 'B1' },
  { singular: 'ox', plurals: ['oxen'], wrong: ['oxes', 'oxs', 'oxens'], note: 'Old English plural in -en', level: 'C1' },
  { singular: 'sheep', plurals: ['sheep'], wrong: ['sheeps', 'sheepes', 'sheepen'], note: 'same form', level: 'B1' },
  { singular: 'species', plurals: ['species'], wrong: ['specieses', 'specie', 'speciess'], note: 'same form', level: 'B2' },
  { singular: 'series', plurals: ['series'], wrong: ['serieses', 'serie', 'seriess'], note: 'same form', level: 'B2' },
  { singular: 'aircraft', plurals: ['aircraft'], wrong: ['aircrafts', 'aircraftes', 'airscraft'], note: 'same form', level: 'B2' },
  { singular: 'knife', plurals: ['knives'], wrong: ['knifes', 'knifs', 'knive'], note: '-fe → -ves', level: 'B1' },
  { singular: 'shelf', plurals: ['shelves'], wrong: ['shelfs', 'shelfes', 'shelve'], note: '-f → -ves', level: 'B1' },
  { singular: 'thief', plurals: ['thieves'], wrong: ['thiefs', 'thiefes', 'thieve'], note: '-f → -ves', level: 'B2' },
  { singular: 'half', plurals: ['halves'], wrong: ['halfs', 'halfes', 'halve'], note: '-f → -ves', level: 'B1' },
  { singular: 'belief', plurals: ['beliefs'], wrong: ['believes', 'beliefes', 'believs'], note: 'regular -s (believes is a verb)', level: 'B2' },
  { singular: 'chief', plurals: ['chiefs'], wrong: ['chieves', 'chiefes', 'chievs'], note: 'regular -s', level: 'B2' },
  { singular: 'roof', plurals: ['roofs'], wrong: ['rooves', 'roofes', 'roovs'], note: 'regular -s', level: 'B2' },
  { singular: 'hero', plurals: ['heroes'], wrong: ['heros', 'heroies', 'heroe'], note: '-o → -oes', level: 'B1' },
  { singular: 'potato', plurals: ['potatoes'], wrong: ['potatos', 'potatoies', 'potatoe'], note: '-o → -oes', level: 'B1' },
  { singular: 'echo', plurals: ['echoes'], wrong: ['echos', 'echoies', 'echoe'], note: '-o → -oes', level: 'B2' },
  { singular: 'photo', plurals: ['photos'], wrong: ['photoes', 'photoies', 'photose'], note: 'shortened words take -s', level: 'B1' },
  { singular: 'piano', plurals: ['pianos'], wrong: ['pianoes', 'pianoies', 'piani'], note: 'musical words from Italian take -s', level: 'B1' },
  { singular: 'passer-by', plurals: ['passers-by'], wrong: ['passer-bys', 'passers-bys', 'passer-byes'], note: 'plural on the main noun', level: 'C1' },
  { singular: 'mother-in-law', plurals: ['mothers-in-law'], wrong: ['mother-in-laws', 'mothers-in-laws', 'mother-ins-law'], note: 'plural on the main noun', level: 'C1' },
];

// ── Countable / uncountable ─────────────────────────────────────────────
export interface UncountableRow {
  noun: string;
  adj: string;
  /** Article for "a/an + adj". */
  art: 'a' | 'an';
  /** Sentence with ___ for the noun phrase. */
  frame: string;
  /** Unit word(s): a piece of advice. */
  units: string[];
  /** Short gap for the unit word: "Let me give you a ___ of advice." */
  unitFrame: string;
  /** How much … ? */
  howFrame: string;
  /** False friend or note for Portuguese speakers. */
  pt: string;
}

export const UNCOUNTABLES: UncountableRow[] = [
  { noun: 'advice', adj: 'valuable', art: 'a', frame: 'Before the interview, my mentor gave me ___.', units: ['piece', 'word'], unitFrame: 'Can I give you a ___ of advice?', howFrame: 'How ___ advice did the lawyer give you?', pt: 'conselhos → advice (sempre singular)' },
  { noun: 'information', adj: 'detailed', art: 'a', frame: 'The website provides ___ about visa requirements.', units: ['piece', 'bit', 'item'], unitFrame: 'That’s a useful ___ of information.', howFrame: 'How ___ information do we have about the suspect?', pt: 'informações → information' },
  { noun: 'furniture', adj: 'second-hand', art: 'a', frame: 'They furnished the flat with ___.', units: ['piece', 'item'], unitFrame: 'The only ___ of furniture in the room was a chair.', howFrame: 'How ___ furniture are you taking to the new flat?', pt: 'móveis → furniture' },
  { noun: 'equipment', adj: 'new', art: 'a', frame: 'The hospital has just bought ___ for the intensive care unit.', units: ['piece', 'item'], unitFrame: 'This ___ of equipment cost over a million reais.', howFrame: 'How ___ equipment do the climbers need?', pt: 'equipamentos → equipment' },
  { noun: 'luggage', adj: 'heavy', art: 'a', frame: 'She was carrying ___ up the stairs.', units: ['piece', 'item', 'bit'], unitFrame: 'Each passenger may bring one ___ of hand luggage.', howFrame: 'How ___ luggage are you taking?', pt: 'bagagens → luggage (BrE) / baggage' },
  { noun: 'evidence', adj: 'new', art: 'a', frame: 'The defence presented ___ on the last day of the trial.', units: ['piece', 'bit', 'shred'], unitFrame: 'Not a single ___ of evidence links him to the crime.', howFrame: 'How ___ evidence is there for this theory?', pt: 'provas/evidências → evidence' },
  { noun: 'research', adj: 'original', art: 'an', frame: 'Her thesis is based on ___ carried out in the Amazon.', units: ['piece'], unitFrame: 'It is an impressive ___ of research.', howFrame: 'How ___ research has been done on this topic?', pt: 'pesquisas → research' },
  { noun: 'homework', adj: 'difficult', art: 'a', frame: 'The students were given ___ over the holidays.', units: ['piece', 'bit'], unitFrame: 'I still have one ___ of homework to finish.', howFrame: 'How ___ homework did the teacher set?', pt: 'deveres/lições de casa → homework' },
  { noun: 'feedback', adj: 'useful', art: 'a', frame: 'The pilot group gave us ___ on the app.', units: ['piece', 'bit'], unitFrame: 'One ___ of feedback surprised the designers.', howFrame: 'How ___ feedback did you get from the clients?', pt: 'comentários/retornos → feedback' },
  { noun: 'progress', adj: 'real', art: 'a', frame: 'Negotiators say they have made ___ this week.', units: [], unitFrame: '', howFrame: 'How ___ progress have the negotiators made?', pt: 'progressos → progress' },
  { noun: 'traffic', adj: 'heavy', art: 'a', frame: 'We ran into ___ on the way to the airport.', units: [], unitFrame: '', howFrame: 'How ___ traffic was there on the motorway?', pt: '“trânsito” → traffic (incontável)' },
  { noun: 'software', adj: 'new', art: 'a', frame: 'The office installed ___ to manage payroll.', units: ['piece', 'bit'], unitFrame: 'It’s a clever ___ of software.', howFrame: 'How ___ software do we need to buy?', pt: 'programas/softwares → software' },
  { noun: 'machinery', adj: 'heavy', art: 'a', frame: 'The site was full of ___ and building materials.', units: ['piece', 'item'], unitFrame: 'This ___ of machinery is older than the factory.', howFrame: 'How ___ machinery was damaged in the flood?', pt: 'maquinário/máquinas → machinery' },
  { noun: 'news', adj: 'exciting', art: 'an', frame: 'I’ve got ___ — I’ve been offered the job!', units: ['piece', 'bit', 'item'], unitFrame: 'That’s the best ___ of news I’ve heard all year.', howFrame: 'How ___ news has come out of the region?', pt: 'notícias → news (verbo no singular: the news is…)' },
  { noun: 'scenery', adj: 'beautiful', art: 'a', frame: 'The train journey through the mountains offers ___.', units: [], unitFrame: '', howFrame: '', pt: 'paisagens → scenery' },
];

export const COUNTABLE_HOW: Array<{ frame: string; note: string }> = [
  { frame: 'How ___ suitcases are you taking?', note: 'suitcases is a plural countable noun' },
  { frame: 'How ___ documents do I need to bring?', note: 'documents is a plural countable noun' },
  { frame: 'How ___ times have you visited Salvador?', note: 'times (occasions) is countable' },
  { frame: 'How ___ people applied for the position?', note: 'people is a plural countable noun' },
  { frame: 'How ___ pieces of furniture fit in the van?', note: 'pieces is a plural countable noun' },
];

// ── Articles with names and institutions ────────────────────────────────
export interface ArticleRow {
  /** Sentence starting with ___ or containing ___ before the name. */
  frame: string;
  answer: 'the' | '-';
  rule: string;
  level: 'B1' | 'B2' | 'C1';
}

export const ARTICLES: ArticleRow[] = [
  { frame: '___ Amazon carries more water than any other river.', answer: 'the', rule: 'the + rivers', level: 'B1' },
  { frame: '___ Thames flows through the centre of London.', answer: 'the', rule: 'the + rivers', level: 'B1' },
  { frame: '___ Andes stretch along the western side of South America.', answer: 'the', rule: 'the + mountain ranges', level: 'B1' },
  { frame: '___ Alps attract skiers from all over the world.', answer: 'the', rule: 'the + mountain ranges', level: 'B1' },
  { frame: '___ Mount Everest was first climbed in 1953.', answer: '-', rule: 'no article with single mountains', level: 'B1' },
  { frame: '___ Kilimanjaro is the highest mountain in Africa.', answer: '-', rule: 'no article with single mountains', level: 'B2' },
  { frame: '___ Lake Titicaca lies on the border between Peru and Bolivia.', answer: '-', rule: 'no article with lakes (Lake + name)', level: 'B2' },
  { frame: '___ Lake Victoria is the largest lake in Africa.', answer: '-', rule: 'no article with lakes (Lake + name)', level: 'B2' },
  { frame: '___ Atlantic separates Brazil from Africa.', answer: 'the', rule: 'the + oceans and seas', level: 'B1' },
  { frame: '___ Mediterranean was the centre of the Roman world.', answer: 'the', rule: 'the + oceans and seas', level: 'B1' },
  { frame: '___ Sahara covers most of North Africa.', answer: 'the', rule: 'the + deserts', level: 'B1' },
  { frame: '___ Brazil has the largest economy in Latin America.', answer: '-', rule: 'no article with most countries', level: 'B1' },
  { frame: '___ Japan has one of the oldest populations in the world.', answer: '-', rule: 'no article with most countries', level: 'B1' },
  { frame: '___ United Kingdom left the European Union in 2020.', answer: 'the', rule: 'the + countries with Kingdom, Republic, States, Union', level: 'B1' },
  { frame: '___ United States has fifty states.', answer: 'the', rule: 'the + countries with Kingdom, Republic, States, Union', level: 'B1' },
  { frame: '___ Czech Republic joined the EU in 2004.', answer: 'the', rule: 'the + countries with Kingdom, Republic, States, Union', level: 'B2' },
  { frame: '___ Netherlands is famous for its canals and tulips.', answer: 'the', rule: 'the + plural country names', level: 'B2' },
  { frame: '___ Philippines consists of more than 7,000 islands.', answer: 'the', rule: 'the + plural country names and island groups', level: 'B2' },
  { frame: '___ Canary Islands belong to Spain.', answer: 'the', rule: 'the + groups of islands', level: 'B2' },
  { frame: '___ Sicily is the largest island in the Mediterranean.', answer: '-', rule: 'no article with single islands', level: 'B2' },
  { frame: '___ Europe is the second-smallest continent.', answer: '-', rule: 'no article with continents', level: 'B1' },
  { frame: '___ Lisbon is built on seven hills.', answer: '-', rule: 'no article with cities', level: 'B1' },
  { frame: '___ Hague is the seat of the Dutch government.', answer: 'the', rule: 'exception: The Hague', level: 'C1' },
  { frame: '___ Oxford University was founded in the twelfth century.', answer: '-', rule: 'no article with Name + University', level: 'B2' },
  { frame: '___ University of São Paulo is the largest public university in Brazil.', answer: 'the', rule: 'the + University of + name', level: 'B2' },
  { frame: '___ British Museum houses the Rosetta Stone.', answer: 'the', rule: 'the + most museums and galleries', level: 'B2' },
  { frame: '___ Heathrow Airport is the busiest airport in the UK.', answer: '-', rule: 'no article with most airports and stations (Name + Airport)', level: 'B2' },
  { frame: '___ Buckingham Palace is open to visitors in the summer.', answer: '-', rule: 'no article with Name + Palace / Castle', level: 'C1' },
  { frame: '___ Golden Gate Bridge opened in 1937.', answer: 'the', rule: 'bridges vary: the Golden Gate Bridge, but Tower Bridge', level: 'C1' },
  { frame: '___ Panama Canal links the Atlantic and the Pacific.', answer: 'the', rule: 'the + canals', level: 'B2' },
  { frame: 'I think ___ honesty is the most important quality in a manager.', answer: '-', rule: 'no article with abstract nouns used in a general sense', level: 'B2' },
  { frame: '___ life in big cities can be exhausting.', answer: '-', rule: 'no article with uncountable nouns used in a general sense', level: 'B2' },
  { frame: 'My grandfather played ___ piano in a jazz band.', answer: 'the', rule: 'the + musical instruments (play the piano)', level: 'B1' },
  { frame: 'She’s studying ___ economics at university.', answer: '-', rule: 'no article with academic subjects', level: 'B1' },
];

// ── Dependent prepositions ──────────────────────────────────────────────
export interface PrepRow {
  head: string;
  frame: string;
  accepted: string[];
  exclude?: string[];
  kind: 'adjective' | 'verb' | 'noun';
  level: 'B1' | 'B2' | 'C1';
}

export const PREPOSITIONS: PrepRow[] = [
  { head: 'interested', frame: 'She has always been interested ___ marine biology.', accepted: ['in'], kind: 'adjective', level: 'B1' },
  { head: 'responsible', frame: 'Who is responsible ___ the delay?', accepted: ['for'], kind: 'adjective', level: 'B1' },
  { head: 'good', frame: 'He’s very good ___ solving problems under pressure.', accepted: ['at'], kind: 'adjective', level: 'B1' },
  { head: 'afraid', frame: 'Many people are afraid ___ flying.', accepted: ['of'], kind: 'adjective', level: 'B1' },
  { head: 'keen', frame: 'My father is very keen ___ jazz.', accepted: ['on'], kind: 'adjective', level: 'B2' },
  { head: 'proud', frame: 'We are proud ___ what the team has achieved.', accepted: ['of'], kind: 'adjective', level: 'B1' },
  { head: 'aware', frame: 'Were you aware ___ the risks?', accepted: ['of'], kind: 'adjective', level: 'B2' },
  { head: 'capable', frame: 'She is capable ___ running the department on her own.', accepted: ['of'], kind: 'adjective', level: 'B2' },
  { head: 'married', frame: 'She is married ___ a diplomat.', accepted: ['to'], kind: 'adjective', level: 'B1' },
  { head: 'similar', frame: 'The new model is similar ___ the old one.', accepted: ['to'], kind: 'adjective', level: 'B1' },
  { head: 'famous', frame: 'Ouro Preto is famous ___ its baroque churches.', accepted: ['for'], kind: 'adjective', level: 'B1' },
  { head: 'fond', frame: 'My grandmother was very fond ___ old films.', accepted: ['of'], kind: 'adjective', level: 'B2' },
  { head: 'tired', frame: 'I’m tired ___ hearing the same excuses.', accepted: ['of'], kind: 'adjective', level: 'B1' },
  { head: 'familiar', frame: 'Are you familiar ___ this software?', accepted: ['with'], kind: 'adjective', level: 'B2' },
  { head: 'satisfied', frame: 'Customers were not satisfied ___ the service.', accepted: ['with'], exclude: ['by'], kind: 'adjective', level: 'B2' },
  { head: 'worried', frame: 'Farmers are worried ___ the lack of rain.', accepted: ['about'], exclude: ['by'], kind: 'adjective', level: 'B1' },
  { head: 'addicted', frame: 'Some teenagers are addicted ___ their phones.', accepted: ['to'], kind: 'adjective', level: 'B2' },
  { head: 'allergic', frame: 'My son is allergic ___ peanuts.', accepted: ['to'], kind: 'adjective', level: 'B2' },
  { head: 'critical', frame: 'The report is highly critical ___ the government’s response.', accepted: ['of'], kind: 'adjective', level: 'C1' },
  { head: 'typical', frame: 'This kind of delay is typical ___ large infrastructure projects.', accepted: ['of'], kind: 'adjective', level: 'C1' },
  { head: 'relevant', frame: 'Is this information relevant ___ the investigation?', accepted: ['to'], kind: 'adjective', level: 'C1' },
  { head: 'eligible', frame: 'Only full-time students are eligible ___ the grant.', accepted: ['for'], kind: 'adjective', level: 'C1' },
  { head: 'rich', frame: 'Oranges are rich ___ vitamin C.', accepted: ['in'], kind: 'adjective', level: 'B2' },
  { head: 'short', frame: 'The hospital is short ___ nurses this month.', accepted: ['of'], kind: 'adjective', level: 'B2' },
  { head: 'depend', frame: 'Our plans depend ___ the weather.', accepted: ['on', 'upon'], kind: 'verb', level: 'B1' },
  { head: 'apologise', frame: 'The airline apologised ___ the delay.', accepted: ['for'], kind: 'verb', level: 'B1' },
  { head: 'insist', frame: 'The client insisted ___ meeting the director in person.', accepted: ['on'], kind: 'verb', level: 'B2' },
  { head: 'succeed', frame: 'They finally succeeded ___ convincing the investors.', accepted: ['in'], kind: 'verb', level: 'B2' },
  { head: 'consist', frame: 'The exam consists ___ four papers.', accepted: ['of'], kind: 'verb', level: 'B2' },
  { head: 'belong', frame: 'This laptop belongs ___ the company.', accepted: ['to'], kind: 'verb', level: 'B1' },
  { head: 'concentrate', frame: 'I can’t concentrate ___ my work with all this noise.', accepted: ['on'], kind: 'verb', level: 'B1' },
  { head: 'contribute', frame: 'Tourism contributes ___ the local economy.', accepted: ['to'], kind: 'verb', level: 'B2' },
  { head: 'participate', frame: 'Over forty countries participated ___ the summit.', accepted: ['in'], kind: 'verb', level: 'B2' },
  { head: 'result', frame: 'The storm resulted ___ widespread power cuts.', accepted: ['in'], kind: 'verb', level: 'B2' },
  { head: 'recover', frame: 'It took the region years to recover ___ the earthquake.', accepted: ['from'], kind: 'verb', level: 'B2' },
  { head: 'object', frame: 'Residents objected ___ the new tower block.', accepted: ['to'], kind: 'verb', level: 'C1' },
  { head: 'accuse', frame: 'The minister was accused ___ lying to parliament.', accepted: ['of'], kind: 'verb', level: 'B2' },
  { head: 'congratulate', frame: 'We congratulated her ___ her promotion.', accepted: ['on'], kind: 'verb', level: 'B2' },
  { head: 'reason', frame: 'What was the reason ___ the cancellation?', accepted: ['for'], kind: 'noun', level: 'B1' },
  { head: 'increase', frame: 'There has been a sharp increase ___ food prices.', accepted: ['in'], exclude: ['of'], kind: 'noun', level: 'B2' },
  { head: 'demand', frame: 'Demand ___ electric cars has grown rapidly.', accepted: ['for'], kind: 'noun', level: 'B2' },
  { head: 'solution', frame: 'Nobody has found a solution ___ the housing crisis.', accepted: ['to'], exclude: ['for'], kind: 'noun', level: 'B2' },
  { head: 'cause', frame: 'Investigators are still looking for the cause ___ the fire.', accepted: ['of'], kind: 'noun', level: 'B1' },
  { head: 'access', frame: 'Millions of people still have no access ___ clean water.', accepted: ['to'], kind: 'noun', level: 'B2' },
  { head: 'effect', frame: 'Stress has a negative effect ___ the immune system.', accepted: ['on'], kind: 'noun', level: 'B2' },
  { head: 'impact', frame: 'The new road will have a major impact ___ the forest.', accepted: ['on'], kind: 'noun', level: 'B2' },
  { head: 'lack', frame: 'The project failed because of a lack ___ funding.', accepted: ['of'], kind: 'noun', level: 'B1' },
  { head: 'damage', frame: 'The flood caused serious damage ___ the bridge.', accepted: ['to'], kind: 'noun', level: 'B2' },
  { head: 'attitude', frame: 'His attitude ___ his colleagues has changed.', accepted: ['to', 'towards', 'toward'], kind: 'noun', level: 'C1' },
];

export const PREP_POOL = ['in', 'on', 'at', 'for', 'of', 'to', 'with', 'about', 'from', 'by'];

// ── Collocations ────────────────────────────────────────────────────────
export interface CollocationRow {
  /** Sentence with ___ for the verb (base form unless the answer is inflected). */
  frame: string;
  answer: string;
  /** Other verbs that are also correct here. */
  also?: string[];
  /** Wrong options — each chosen so that it is wrong in this sentence in any reading. */
  wrong: string[];
  note: string;
  level: 'B1' | 'B2' | 'C1';
}

export const COLLOCATIONS: CollocationRow[] = [
  { frame: 'The committee will ___ a decision next week.', answer: 'make', also: ['take', 'reach'], wrong: ['do', 'pay', 'keep'], note: 'make (or take) a decision', level: 'B1' },
  { frame: 'Everyone can ___ a mistake now and then.', answer: 'make', wrong: ['do', 'have', 'take'], note: 'make a mistake (not do)', level: 'B1' },
  { frame: 'You need to ___ more of an effort in class.', answer: 'make', wrong: ['do', 'have', 'take'], note: 'make an effort', level: 'B1' },
  { frame: 'The negotiators hope to ___ progress this week.', answer: 'make', wrong: ['do', 'have', 'take'], note: 'make progress (not do)', level: 'B2' },
  { frame: 'I’d like to ___ a complaint about the service.', answer: 'make', wrong: ['do', 'take', 'pay'], note: 'make a complaint', level: 'B2' },
  { frame: 'Can I ___ a suggestion?', answer: 'make', wrong: ['do', 'pay', 'break'], note: 'make a suggestion', level: 'B1' },
  { frame: 'Please don’t ___ so much noise — the baby is asleep.', answer: 'make', wrong: ['do', 'have', 'take'], note: 'make noise (not do — Portuguese “fazer barulho”)', level: 'B1' },
  { frame: 'Small changes can ___ a big difference.', answer: 'make', wrong: ['do', 'have', 'take'], note: 'make a difference', level: 'B1' },
  { frame: 'His explanation doesn’t ___ sense.', answer: 'make', wrong: ['do', 'have', 'take'], note: 'make sense (not “have sense” — Portuguese “ter sentido”)', level: 'B1' },
  { frame: 'Did you ___ your homework last night?', answer: 'do', wrong: ['make', 'pay', 'break'], note: 'do homework (not make)', level: 'B1' },
  { frame: 'She went to Lisbon to ___ research on colonial archives.', answer: 'do', wrong: ['make', 'have', 'take'], note: 'do research (not make)', level: 'B2' },
  { frame: 'It’s a pleasure to ___ business with you.', answer: 'do', wrong: ['make', 'have', 'take'], note: 'do business', level: 'B2' },
  { frame: 'Could you ___ me a favour and post this letter?', answer: 'do', wrong: ['make', 'have', 'give'], note: 'do someone a favour (not make — Portuguese “fazer um favor”)', level: 'B1' },
  { frame: 'Don’t worry about the result — just ___ your best.', answer: 'do', also: ['try'], wrong: ['make', 'have', 'take'], note: 'do your best', level: 'B1' },
  { frame: 'One bad review can ___ a lot of damage to a small business.', answer: 'do', also: ['cause'], wrong: ['make', 'have', 'take'], note: 'do damage / do harm', level: 'B2' },
  { frame: 'Let me ___ a look at your essay before you send it.', answer: 'have', also: ['take'], wrong: ['make', 'do', 'pay'], note: 'have a look (BrE) / take a look', level: 'B1' },
  { frame: 'I always ___ a shower after the gym.', answer: 'have', also: ['take'], wrong: ['make', 'do', 'give'], note: 'have/take a shower', level: 'B1' },
  { frame: 'Let’s ___ a ten-minute break.', answer: 'have', also: ['take'], wrong: ['make', 'do', 'pay'], note: 'have/take a break', level: 'B1' },
  { frame: 'Did you ___ fun at the festival?', answer: 'have', wrong: ['make', 'do', 'take'], note: 'have fun (make fun of = mock)', level: 'B1' },
  { frame: 'They ___ a terrible argument about money last night.', answer: 'had', wrong: ['did', 'took', 'gave'], note: 'have an argument', level: 'B1' },
  { frame: 'Could you ___ a photo of us in front of the cathedral?', answer: 'take', wrong: ['make', 'have', 'pay'], note: 'take a photo (not make — Portuguese “tirar/fazer uma foto”)', level: 'B1' },
  { frame: 'The wedding will ___ place in a small church in Paraty.', answer: 'take', wrong: ['make', 'have', 'do'], note: 'take place', level: 'B1' },
  { frame: 'More than 200 schools will ___ part in the project.', answer: 'take', wrong: ['make', 'do', 'give'], note: 'take part', level: 'B1' },
  { frame: 'Students should ___ notes during the lecture.', answer: 'take', also: ['make'], wrong: ['do', 'have', 'pay'], note: 'take (or make) notes', level: 'B1' },
  { frame: 'Investors are unwilling to ___ risks in the current climate.', answer: 'take', also: ['run'], wrong: ['make', 'do', 'have'], note: 'take a risk', level: 'B2' },
  { frame: 'The government must ___ action to reduce pollution.', answer: 'take', wrong: ['make', 'do', 'have'], note: 'take action (not “make action”)', level: 'B2' },
  { frame: 'You should ___ advantage of the discount while it lasts.', answer: 'take', wrong: ['make', 'do', 'have'], note: 'take advantage of', level: 'B2' },
  { frame: 'Please ___ attention to the safety instructions.', answer: 'pay', wrong: ['make', 'do', 'take'], note: 'pay attention (not “give/do attention”)', level: 'B1' },
  { frame: 'We’re going to ___ a visit to my aunt in Salvador.', answer: 'pay', wrong: ['do', 'take', 'have'], note: 'pay someone a visit', level: 'B2' },
  { frame: 'He likes to ___ his colleagues compliments on their work.', answer: 'pay', also: ['give'], wrong: ['make', 'do', 'take'], note: 'pay (or give) someone a compliment — not “make” (Portuguese “fazer um elogio”)', level: 'B2' },
  { frame: 'You can trust her — she always manages to ___ a secret.', answer: 'keep', wrong: ['make', 'do', 'take'], note: 'keep a secret', level: 'B1' },
  { frame: 'Let’s ___ in touch after the course ends.', answer: 'keep', also: ['stay', 'get'], wrong: ['make', 'do', 'take'], note: 'keep/stay in touch', level: 'B1' },
  { frame: 'If you ___ a promise, people stop trusting you.', answer: 'break', wrong: ['do', 'take', 'pay'], note: 'break a promise (≠ keep a promise)', level: 'B1' },
  { frame: 'Driving without a licence is ___ the law.', answer: 'breaking', wrong: ['making', 'doing', 'taking'], note: 'break the law', level: 'B1' },
  { frame: 'Who is going to ___ the news to the staff?', answer: 'break', wrong: ['make', 'do', 'pay'], note: 'break the news (= tell bad news)', level: 'C1' },
  { frame: 'Each student has to ___ a presentation at the end of the term.', answer: 'give', also: ['make', 'do', 'deliver'], wrong: ['take', 'pay', 'break'], note: 'give/make/do a presentation', level: 'B1' },
  { frame: 'Could you ___ me a hand with these boxes?', answer: 'give', also: ['lend'], wrong: ['make', 'do', 'take'], note: 'give/lend someone a hand', level: 'B1' },
  { frame: 'She ___ birth to twins last Tuesday.', answer: 'gave', wrong: ['made', 'did', 'had'], note: 'give birth', level: 'B2' },
];

export interface AdjCollocationRow {
  frame: string;
  answer: string;
  also?: string[];
  options: string[];
  note: string;
  level: 'B2' | 'C1';
}

export const ADJ_COLLOCATIONS: AdjCollocationRow[] = [
  { frame: 'Flights were cancelled because of ___ rain.', answer: 'heavy', options: ['strong', 'hard', 'big'], note: 'heavy rain/snow (not strong rain)', level: 'B2' },
  { frame: 'I need a cup of ___ coffee before the meeting.', answer: 'strong', options: ['heavy', 'hard', 'thick'], note: 'strong coffee/tea', level: 'B2' },
  { frame: 'There was ___ traffic all the way to the airport.', answer: 'heavy', options: ['strong', 'hard', 'thick'], note: 'heavy traffic', level: 'B2' },
  { frame: 'My uncle was a ___ smoker for thirty years.', answer: 'heavy', options: ['strong', 'hard', 'thick'], note: 'a heavy smoker/drinker', level: 'B2' },
  { frame: 'He speaks English with a ___ Scottish accent.', answer: 'strong', also: ['heavy', 'thick'], options: ['high', 'hard', 'deep'], note: 'a strong/heavy/thick accent', level: 'B2' },
  { frame: 'The baby fell into a ___ sleep.', answer: 'deep', also: ['sound'], options: ['strong', 'hard', 'high'], note: 'a deep sleep', level: 'B2' },
  { frame: 'The patient has a very ___ temperature.', answer: 'high', options: ['big', 'strong', 'tall'], note: 'a high temperature/fever', level: 'B2' },
  { frame: 'It is ___ unlikely that the law will change this year.', answer: 'highly', also: ['extremely', 'very'], options: ['strongly', 'deeply', 'heavily'], note: 'highly unlikely/likely/probable', level: 'C1' },
  { frame: 'I would ___ recommend this course to anyone.', answer: 'highly', also: ['strongly', 'thoroughly'], options: ['deeply', 'heavily', 'widely'], note: 'highly/strongly recommend', level: 'C1' },
  { frame: 'We are ___ aware of the risks involved.', answer: 'fully', also: ['well', 'acutely'], options: ['deeply', 'heavily', 'strongly'], note: 'fully/well aware', level: 'C1' },
  { frame: 'The fans were ___ disappointed by the result.', answer: 'bitterly', also: ['deeply', 'terribly', 'very'], options: ['heavily', 'highly', 'strongly'], note: 'bitterly/deeply disappointed', level: 'C1' },
  { frame: 'It was a ___ cold night in the mountains.', answer: 'bitterly', also: ['freezing', 'extremely', 'very'], options: ['heavily', 'highly', 'strongly'], note: 'bitterly cold', level: 'C1' },
  { frame: 'The company suffered ___ losses in the crisis.', answer: 'heavy', also: ['huge', 'significant'], options: ['strong', 'high', 'tall'], note: 'heavy losses', level: 'C1' },
  { frame: 'The plan met with ___ opposition from local residents.', answer: 'strong', also: ['fierce', 'stiff'], options: ['heavy', 'high', 'hard'], note: 'strong/fierce opposition', level: 'C1' },
];

// ── False friends ───────────────────────────────────────────────────────
export interface FalseFriendRow {
  pt: string;
  /** The English false friend and what it really means (in Portuguese). */
  falseFriend: string;
  falseMeaning: string;
  /** Correct translations. */
  correct: string[];
  frame: string;
  wrong: string[];
  level: 'B1' | 'B2' | 'C1';
}

export const FALSE_FRIENDS: FalseFriendRow[] = [
  { pt: 'atualmente', falseFriend: 'actually', falseMeaning: 'na verdade, na realidade', correct: ['Currently', 'Nowadays', 'At present'], frame: '___, most of our customers pay by card. (= atualmente)', wrong: ['Actually', 'Eventually', 'Finally'], level: 'B1' },
  { pt: 'eventualmente', falseFriend: 'eventually', falseMeaning: 'finalmente, no fim', correct: ['occasionally', 'from time to time', 'now and then'], frame: 'We ___ eat out, but usually we cook at home. (= eventualmente)', wrong: ['eventually', 'finally', 'eventual'], level: 'B2' },
  { pt: 'pretender', falseFriend: 'pretend', falseMeaning: 'fingir', correct: ['intend', 'plan', 'mean'], frame: 'I ___ to apply for a master’s degree next year. (= pretendo)', wrong: ['pretend', 'pretext', 'presume'], level: 'B1' },
  { pt: 'biblioteca', falseFriend: 'library (= biblioteca!) vs. livraria', falseMeaning: 'library = biblioteca; livraria = bookshop', correct: ['library'], frame: 'I borrowed this novel from the public ___. (= biblioteca)', wrong: ['bookshop', 'bookstore', 'librarian'], level: 'B1' },
  { pt: 'livraria', falseFriend: 'library', falseMeaning: 'biblioteca', correct: ['bookshop', 'bookstore'], frame: 'You can buy the new edition at any ___. (= livraria)', wrong: ['library', 'librarian', 'bookcase'], level: 'B1' },
  { pt: 'assistir (a um programa)', falseFriend: 'assist', falseMeaning: 'ajudar', correct: ['watch'], frame: 'We stayed in to ___ the final on TV. (= assistir)', wrong: ['assist', 'attend', 'look'], level: 'B1' },
  { pt: 'atender (o telefone)', falseFriend: 'attend', falseMeaning: 'comparecer, frequentar', correct: ['answer', 'get', 'pick up'], frame: 'Could you ___ the phone? I’m cooking. (= atender)', wrong: ['attend', 'assist', 'serve'], level: 'B1' },
  { pt: 'parentes', falseFriend: 'parents', falseMeaning: 'pais (pai e mãe)', correct: ['relatives', 'relations'], frame: 'We have ___ in Portugal, mostly cousins and uncles. (= parentes)', wrong: ['parents', 'familiars', 'parentages'], level: 'B1' },
  { pt: 'resumo', falseFriend: 'resume', falseMeaning: 'retomar (verbo); currículo (AmE résumé)', correct: ['summary'], frame: 'Write a 150-word ___ of the article. (= resumo)', wrong: ['resume', 'resumption', 'sum'], level: 'B2' },
  { pt: 'esquisito', falseFriend: 'exquisite', falseMeaning: 'refinado, primoroso', correct: ['strange', 'weird', 'odd'], frame: 'There’s a ___ smell coming from the fridge. (= esquisito)', wrong: ['exquisite', 'exquisitely', 'refined'], level: 'B2' },
  { pt: 'costume', falseFriend: 'costume', falseMeaning: 'fantasia, traje', correct: ['custom', 'tradition'], frame: 'It’s a local ___ to throw rice at the bride and groom. (= costume)', wrong: ['costume', 'customer', 'costumer'], level: 'B2' },
  { pt: 'fábrica', falseFriend: 'fabric', falseMeaning: 'tecido', correct: ['factory', 'plant'], frame: 'She works at a car ___ in São Bernardo. (= fábrica)', wrong: ['fabric', 'fabrication', 'manufacture'], level: 'B1' },
  { pt: 'tecido', falseFriend: 'tissue', falseMeaning: 'lenço de papel; tecido orgânico', correct: ['fabric', 'material', 'cloth'], frame: 'This dress is made from a light cotton ___. (= tecido)', wrong: ['factory', 'tissue', 'fabrication'], level: 'B2' },
  { pt: 'realizar', falseFriend: 'realise', falseMeaning: 'perceber, dar-se conta', correct: ['carry out', 'conduct', 'hold'], frame: 'The team will ___ a survey of local businesses. (= realizar)', wrong: ['realise', 'realize', 'perceive'], level: 'B2' },
  { pt: 'perceber', falseFriend: '—', falseMeaning: '', correct: ['realise', 'realize', 'notice', 'see'], frame: 'I didn’t ___ how late it was. (= perceber)', wrong: ['carry out', 'accomplish', 'attend'], level: 'B1' },
  { pt: 'notícia(s)', falseFriend: 'notice', falseMeaning: 'aviso, comunicado', correct: ['news'], frame: 'Have you heard the ___ about the merger? (= notícia)', wrong: ['notice', 'notices', 'novelty'], level: 'B1' },
  { pt: 'novela', falseFriend: 'novel', falseMeaning: 'romance (livro)', correct: ['soap opera', 'soap'], frame: 'My grandmother never misses her favourite ___ on TV. (= novela)', wrong: ['novel', 'romance', 'novelty'], level: 'B1' },
  { pt: 'romance (livro)', falseFriend: 'romance', falseMeaning: 'caso amoroso; romantismo', correct: ['novel'], frame: 'Machado de Assis published his most famous ___ in 1899. (= romance)', wrong: ['romance', 'soap opera', 'novelty'], level: 'B2' },
  { pt: 'sensível', falseFriend: 'sensible', falseMeaning: 'sensato', correct: ['sensitive'], frame: 'Be careful what you say — he’s very ___ about his weight. (= sensível)', wrong: ['sensible', 'sensory', 'sensational'], level: 'B2' },
  { pt: 'sensato', falseFriend: 'sensitive', falseMeaning: 'sensível', correct: ['sensible', 'wise'], frame: 'Saving part of your salary is a very ___ decision. (= sensata)', wrong: ['sensitive', 'sensational', 'sensory'], level: 'B2' },
  { pt: 'data', falseFriend: 'data', falseMeaning: 'dados', correct: ['date'], frame: 'What’s the ___ of the meeting — is it the 14th? (= data)', wrong: ['data', 'datum', 'dating'], level: 'B1' },
  { pt: 'prejuízo', falseFriend: 'prejudice', falseMeaning: 'preconceito', correct: ['loss'], frame: 'The company reported a ___ of $2 million last year. (= prejuízo)', wrong: ['prejudice', 'prejudgement', 'lose'], level: 'B2' },
  { pt: 'compromisso', falseFriend: 'compromise', falseMeaning: 'acordo com concessões mútuas', correct: ['appointment', 'engagement', 'commitment'], frame: 'Sorry, I can’t meet today — I have another ___. (= compromisso)', wrong: ['compromise', 'compromising', 'promise'], level: 'B2' },
  { pt: 'legenda (de filme)', falseFriend: 'legend', falseMeaning: 'lenda', correct: ['subtitles'], frame: 'I prefer watching foreign films with ___. (= legendas)', wrong: ['legends', 'signatures', 'letterings'], level: 'B1' },
  { pt: 'lesão', falseFriend: 'injury ≠ injúria', falseMeaning: '“injury” parece “injúria”, mas significa lesão; injúria = insult', correct: ['injury'], frame: 'The player is out for six weeks with a knee ___. (= lesão)', wrong: ['insult', 'injustice', 'injure'], level: 'B1' },
  { pt: 'ultimamente', falseFriend: 'ultimately', falseMeaning: 'em última instância, no fim', correct: ['Lately', 'Recently'], frame: '___, I’ve been sleeping really badly. (= ultimamente)', wrong: ['Ultimately', 'Lastly', 'Late'], level: 'B2' },
  { pt: 'particular (escola)', falseFriend: 'particular', falseMeaning: 'específico', correct: ['private'], frame: 'She went to a ___ school in Campinas. (= particular)', wrong: ['particular', 'individual', 'personal'], level: 'B1' },
  { pt: 'colégio', falseFriend: 'college', falseMeaning: 'faculdade (nível superior)', correct: ['school'], frame: 'My little sister started primary ___ this year. (= escola)', wrong: ['college', 'faculty', 'colleague'], level: 'B1' },
  { pt: 'faculdade', falseFriend: 'faculty', falseMeaning: 'corpo docente; capacidade', correct: ['university', 'college'], frame: 'After school, she went to ___ to study engineering. (= faculdade)', wrong: ['faculty', 'colleague', 'academy'], level: 'B1' },
  { pt: 'pasta (de arquivos)', falseFriend: 'pasta', falseMeaning: 'massa (macarrão)', correct: ['folder'], frame: 'Save the file in the “Reports” ___. (= pasta)', wrong: ['pasta', 'paste', 'past'], level: 'B1' },
  { pt: 'aniversário (de nascimento)', falseFriend: 'anniversary', falseMeaning: 'aniversário de casamento ou de um evento', correct: ['birthday'], frame: 'We’re throwing a party for my daughter’s tenth ___. (= aniversário)', wrong: ['anniversary', 'jubilee', 'birth'], level: 'B1' },
  { pt: 'empurre (na porta)', falseFriend: 'push ≠ puxar', falseMeaning: 'push = empurrar; pull = puxar', correct: ['PUSH'], frame: 'The sign on the door says ___, so don’t pull it. (= empurre)', wrong: ['PULL', 'PUT', 'PASS'], level: 'B1' },
];

// ── Confusable words ────────────────────────────────────────────────────
export interface ConfusableRow {
  frame: string;
  options: string[];
  answer: number;
  note: string;
  level: 'B1' | 'B2' | 'C1';
}

export const CONFUSABLES: ConfusableRow[] = [
  { frame: 'The new policy will ___ thousands of small businesses.', options: ['affect', 'effect', 'affection', 'effective'], answer: 0, note: 'affect = verb (influence); effect = noun (result)', level: 'B2' },
  { frame: 'The policy had a positive ___ on employment.', options: ['effect', 'affect', 'affection', 'efficient'], answer: 0, note: 'effect (noun) on', level: 'B2' },
  { frame: 'Prices ___ sharply after the announcement.', options: ['rose', 'raised', 'rised', 'arose'], answer: 0, note: 'rise (intransitive): rise – rose – risen', level: 'B2' },
  { frame: 'The bank has ___ interest rates twice this year.', options: ['raised', 'risen', 'rose', 'arisen'], answer: 0, note: 'raise (transitive): raise – raised – raised', level: 'B2' },
  { frame: 'I was so tired that I ___ down on the sofa and fell asleep.', options: ['lay', 'laid', 'lied', 'layed'], answer: 0, note: 'lie (recline): lie – lay – lain', level: 'C1' },
  { frame: 'She ___ the documents on the desk and left.', options: ['laid', 'lay', 'lain', 'lied'], answer: 0, note: 'lay (put down): lay – laid – laid', level: 'C1' },
  { frame: 'Could you ___ me your charger for a minute?', options: ['lend', 'borrow', 'loan from', 'borrowed'], answer: 0, note: 'lend = give temporarily; borrow = take temporarily', level: 'B1' },
  { frame: 'Can I ___ your umbrella? It’s pouring.', options: ['borrow', 'lend', 'lent', 'loan'], answer: 0, note: 'borrow something from someone', level: 'B1' },
  { frame: 'Two men ___ the bank on Rua Augusta yesterday.', options: ['robbed', 'stole', 'stolen', 'stealed'], answer: 0, note: 'rob a place or person; steal a thing', level: 'B2' },
  { frame: 'Someone ___ my bike from outside the gym.', options: ['stole', 'robbed', 'stoled', 'robbered'], answer: 0, note: 'steal something (from someone)', level: 'B2' },
  { frame: 'Can you ___ me what happened?', options: ['tell', 'say', 'speak', 'talk'], answer: 0, note: 'tell + person; say + (to person)', level: 'B1' },
  { frame: 'Please ___ me to call the bank tomorrow.', options: ['remind', 'remember', 'recall', 'memorise'], answer: 0, note: 'remind someone to do something', level: 'B1' },
  { frame: 'The ___ reason for the delay was bad weather.', options: ['principal', 'principle', 'principally', 'principled'], answer: 0, note: 'principal = main; principle = rule, belief', level: 'C1' },
  { frame: 'She refused to sign it as a matter of ___.', options: ['principle', 'principal', 'principality', 'principally'], answer: 0, note: 'a matter of principle', level: 'C1' },
  { frame: 'Thank you for the ___ — I’m glad you liked the presentation.', options: ['compliment', 'complement', 'complimentary', 'completion'], answer: 0, note: 'compliment = praise; complement = something that completes', level: 'C1' },
  { frame: 'My doctor ___ me to cut down on salt.', options: ['advised', 'adviced', 'advice', 'advises to'], answer: 0, note: 'advise (verb, -s-) / advice (noun, -c-)', level: 'B2' },
  { frame: 'If you don’t hurry, you’ll ___ the train.', options: ['miss', 'lose', 'loose', 'lost'], answer: 0, note: 'miss a train/class/chance; lose an object/a game', level: 'B1' },
  { frame: 'These trousers are too ___ — I need a belt.', options: ['loose', 'lose', 'lost', 'losing'], answer: 0, note: 'loose (adj.) = not tight; lose (verb)', level: 'B2' },
  { frame: 'There are ___ cars on the road on Sundays.', options: ['fewer', 'less', 'lesser', 'little'], answer: 0, note: 'fewer + plural countable; less + uncountable', level: 'B2' },
  { frame: 'Rio is much bigger ___ Niterói.', options: ['than', 'then', 'that', 'as'], answer: 0, note: 'than (comparison) vs then (time)', level: 'B1' },
  { frame: 'The company has changed ___ logo.', options: ['its', 'it’s', 'its’', 'it is'], answer: 0, note: 'its = possessive; it’s = it is / it has', level: 'B1' },
  { frame: 'They left ___ coats in the car.', options: ['their', 'there', 'they’re', 'theirs'], answer: 0, note: 'their (possessive) / there (place) / they’re (they are)', level: 'B1' },
  { frame: 'The engine made a ___ noise all night, without a single pause.', options: ['continuous', 'continual', 'continuing', 'continuation'], answer: 0, note: 'continuous = without stopping; continual = repeated', level: 'C1' },
  { frame: 'Her grandparents ___ from Italy to Brazil in 1950.', options: ['emigrated', 'immigrated', 'migrated to', 'imigrated'], answer: 0, note: 'emigrate FROM (leave); immigrate TO (arrive)', level: 'C1' },
  { frame: 'Please ___ that all windows are closed before you leave.', options: ['ensure', 'insure', 'assure', 'sure'], answer: 0, note: 'ensure = make certain; insure = buy insurance; assure = tell confidently', level: 'C1' },
  { frame: 'We ordered some ___ for the office: pens, envelopes and paper.', options: ['stationery', 'stationary', 'stationaries', 'stations'], answer: 0, note: 'stationery (-ery) = paper products; stationary (-ary) = not moving', level: 'C1' },
];
