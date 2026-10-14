import type { Item, McqItemT, GapItemT } from '../../src/lib/schema';

/**
 * Old and Middle English. The original texts are in the public domain;
 * the line-by-line modern renderings, notes and quiz items are original.
 */

export const TIMELINE: Array<{ date: string; event: string; period: 'OE' | 'ME' | 'EModE' }> = [
  { date: 'c. 450', event: 'Angles, Saxons and Jutes settle in Britain; their West Germanic dialects become Old English, pushing the Celtic languages west and north.', period: 'OE' },
  { date: '597', event: 'Christian missionaries from Rome arrive in Kent; Latin words such as altar, priest and school enter the language.', period: 'OE' },
  { date: 'c. 700–1000', event: 'Beowulf is composed and later copied in the only surviving manuscript (c. 1000).', period: 'OE' },
  { date: '793–1016', event: 'Viking raids and settlement (the Danelaw). Old Norse gives English everyday words such as sky, egg, skin, window, take and even the pronouns they, them, their.', period: 'OE' },
  { date: '871–899', event: 'Alfred the Great defends Wessex and promotes translation and writing in English.', period: 'OE' },
  { date: '1066', event: 'The Norman Conquest. French becomes the language of the court, law and administration for three centuries.', period: 'ME' },
  { date: 'c. 1100–1500', event: 'Middle English: most inflections disappear, word order becomes fixed, and thousands of French words enter (government, justice, beef, pork, beauty).', period: 'ME' },
  { date: '1362', event: 'The Statute of Pleading allows English to be used in the law courts.', period: 'ME' },
  { date: 'c. 1387–1400', event: 'Geoffrey Chaucer writes The Canterbury Tales in the London dialect.', period: 'ME' },
  { date: 'c. 1400–1700', event: 'The Great Vowel Shift changes the pronunciation of long vowels (bite once sounded like “beet”, house like “hoose”) while spelling stays largely the same.', period: 'EModE' },
  { date: '1476', event: 'William Caxton sets up the first printing press in England, helping to fix spelling.', period: 'EModE' },
  { date: 'c. 1590–1613', event: 'Shakespeare’s plays and poems: thou and you, -eth and -s coexist; hundreds of words are first recorded in his works.', period: 'EModE' },
  { date: '1611', event: 'The King James Bible is published; its language shapes English prose for centuries.', period: 'EModE' },
];

export const LETTERS: Array<{ glyph: string; name: string; sound: string; story: string; example: string }> = [
  { glyph: 'þ Þ', name: 'thorn', sound: '/θ/ or /ð/ (as in thin, this)', story: 'A runic letter. In late Middle English handwriting it came to look like a y, and early printers, who had no thorn in their type, used y instead. That is why “Ye Olde Shoppe” was really pronounced “the old shop”.', example: 'þing → thing' },
  { glyph: 'ð Ð', name: 'eth', sound: '/θ/ or /ð/', story: 'A crossed d borrowed from Irish writing. Old English scribes used thorn and eth for the same sounds, often in the same word. Both were replaced by th.', example: 'eorðe → earth' },
  { glyph: 'æ Æ', name: 'ash', sound: '/æ/ (as in cat)', story: 'Named after the rune for “ash tree”. It survives in some modern spellings of Greek and Latin words (encyclopædia) and in Danish, Norwegian and Icelandic.', example: 'æppel → apple' },
  { glyph: 'ƿ Ƿ', name: 'wynn', sound: '/w/', story: 'A rune meaning “joy”. Norman scribes replaced it with uu, which became the letter w (“double u”).', example: 'ƿīf → wife' },
  { glyph: 'ȝ Ȝ', name: 'yogh', sound: '/j/, /x/ or /ɣ/ (as in yes, Scottish loch)', story: 'A Middle English letter developed from an insular g. It was replaced by y, gh or g, which is why night and daughter still have a silent gh where a sound used to be.', example: 'niȝt → night' },
];

export const PRONOUNS = {
  head: ['', 'Singular (familiar)', 'Plural, or polite singular'],
  rows: [
    ['Subject', 'thou', 'ye'],
    ['Object', 'thee', 'you'],
    ['Possessive determiner', 'thy (thine before a vowel)', 'your'],
    ['Possessive pronoun', 'thine', 'yours'],
  ],
};

export const GRAMMAR_NOTES: Array<{ title: string; text: string }> = [
  { title: 'Cases', text: 'Old English nouns changed their endings to show their role in the sentence (nominative, accusative, genitive, dative), much as Latin or modern German do: *se stān* (the stone, subject), *þæs stānes* (of the stone), *þǣm stāne* (to the stone). Because the endings showed the role, word order was freer than today. The modern possessive ’s is a survivor of the genitive -es.' },
  { title: 'Strong and weak verbs', text: '“Strong” verbs formed their past by changing the vowel (*singan – sang – sungen*), “weak” verbs by adding a dental ending (*lufian – lufode*: loved). Today’s irregular verbs (sing, drive, ride, swim) are the descendants of strong verbs; regular -ed verbs continue the weak pattern, which slowly took over many former strong verbs (helped once had the past *healp*).' },
  { title: 'Thou and you', text: 'In Early Modern English, *thou* was used to one person who was close, younger or socially lower — or to God and in poetry; *you* (originally the plural object) became the polite singular and then replaced *thou* in standard English. Verbs agreeing with thou end in -est or -st: *thou art, thou hast, thou speakest*.' },
  { title: '-eth and -s', text: 'The third person singular ending -eth (*he hath, she doth, it raineth*) came from the south; -s spread from the north. In Shakespeare’s time both were used; by 1700 -s had won, except in fixed texts such as the King James Bible.' },
  { title: 'Double negation', text: 'In Old and Middle English, several negatives reinforced each other: Chaucer says of his knight that *he nevere yet no vileynye ne sayde* (literally “he never yet no villainy not said”). The rule that two negatives cancel each other was promoted by grammarians only in the eighteenth century.' },
];

export interface Text {
  id: string;
  title: string;
  source: string;
  period: 'OE' | 'ME' | 'EModE';
  /** [original line, modern rendering] */
  lines: Array<[string, string]>;
  notes: string[];
}

export const TEXTS: Text[] = [
  {
    id: 'pater-noster',
    title: 'The Lord’s Prayer (Pater Noster)',
    source: 'West Saxon Old English, late tenth century',
    period: 'OE',
    lines: [
      ['Fæder ūre, þū þe eart on heofonum,', 'Father of ours, you who are in the heavens,'],
      ['sī þīn nama gehālgod.', 'may your name be made holy.'],
      ['Tōbecume þīn rīce.', 'May your kingdom come.'],
      ['Gewurþe ðīn willa, on eorðan swā swā on heofonum.', 'May your will be done, on earth just as in the heavens.'],
      ['Ūrne gedæghwāmlīcan hlāf syle ūs tōdæg,', 'Give us today our daily bread (loaf),'],
      ['and forgyf ūs ūre gyltas, swā swā wē forgyfað ūrum gyltendum.', 'and forgive us our sins, just as we forgive those who sin against us.'],
      ['And ne gelǣd þū ūs on costnunge, ac ālȳs ūs of yfele.', 'And do not lead us into temptation, but free us from evil.'],
      ['Sōþlīce.', 'Truly. (Amen.)'],
    ],
    notes: [
      '*Fæder ūre*: the possessive follows the noun, as in Latin *Pater noster*.',
      '*hlāf* gives modern *loaf*; *gyltas* (guilts) means sins.',
      '*sōþlīce* contains *sōþ* (truth), which survives in *forsooth* and *soothsayer*.',
    ],
  },
  {
    id: 'beowulf',
    title: 'Beowulf, lines 1–11',
    source: 'Old English epic, manuscript c. 1000',
    period: 'OE',
    lines: [
      ['Hwæt! Wē Gār-Dena in gēar-dagum,', 'Listen! We have heard of the Spear-Danes in days of old,'],
      ['þēod-cyninga, þrym gefrūnon,', 'of the glory of their kings,'],
      ['hū ðā æþelingas ellen fremedon.', 'how those princes did deeds of courage.'],
      ['Oft Scyld Scēfing sceaþena þrēatum,', 'Often Scyld Scefing, from bands of enemies,'],
      ['monegum mǣgþum, meodo-setla oftēah,', 'from many tribes, took away their mead-benches'],
      ['egsode eorlas. Syððan ǣrest wearð', 'and terrified warriors. After he was first'],
      ['fēasceaft funden, hē þæs frōfre gebād,', 'found destitute, he lived to see comfort for that:'],
      ['wēox under wolcnum, weorð-myndum þāh,', 'he grew under the skies and prospered in honour'],
      ['oð þæt him ǣghwylc þāra ymb-sittendra', 'until every one of the neighbouring peoples'],
      ['ofer hron-rāde hȳran scolde,', 'across the whale-road had to obey him'],
      ['gomban gyldan. Þæt wæs gōd cyning!', 'and pay him tribute. That was a good king!'],
    ],
    notes: [
      'Old English verse is built on alliteration and a pause (caesura) in each line, not on rhyme.',
      '*hron-rād* (whale-road) is a kenning, a compound metaphor for the sea.',
      '*wolcnum* (skies, clouds) survives in German *Wolken* and in the English *welkin*.',
    ],
  },
  {
    id: 'chaucer',
    title: 'The Canterbury Tales, General Prologue, lines 1–18',
    source: 'Geoffrey Chaucer, Middle English, c. 1387',
    period: 'ME',
    lines: [
      ['Whan that Aprille with his shoures soote', 'When April with its sweet showers'],
      ['The droghte of March hath perced to the roote,', 'has pierced the drought of March to the root,'],
      ['And bathed every veyne in swich licour', 'and bathed every vein in such liquid'],
      ['Of which vertu engendred is the flour;', 'by whose power the flower is brought forth;'],
      ['Whan Zephirus eek with his sweete breeth', 'when the west wind too, with its sweet breath,'],
      ['Inspired hath in every holt and heeth', 'has breathed life into, in every wood and heath,'],
      ['The tendre croppes, and the yonge sonne', 'the tender shoots, and the young sun'],
      ['Hath in the Ram his half cours yronne,', 'has run half its course in the sign of the Ram,'],
      ['And smale foweles maken melodye,', 'and small birds make melody'],
      ['That slepen al the nyght with open ye', 'that sleep all night with open eyes'],
      ['(So priketh hem Nature in hir corages),', '(so Nature spurs them in their hearts),'],
      ['Thanne longen folk to goon on pilgrimages,', 'then people long to go on pilgrimages,'],
      ['And palmeres for to seken straunge strondes,', 'and pilgrims to seek foreign shores,'],
      ['To ferne halwes, kowthe in sondry londes;', 'distant shrines, known in various lands;'],
      ['And specially from every shires ende', 'and especially from every county’s end'],
      ['Of Engelond to Caunterbury they wende,', 'of England they travel to Canterbury,'],
      ['The hooly blisful martir for to seke,', 'to seek the holy blessed martyr'],
      ['That hem hath holpen whan that they were seeke.', 'who has helped them when they were sick.'],
    ],
    notes: [
      'The final -e of words like *soote* and *sonne* was still pronounced, which is essential to the rhythm.',
      '*holpen* is the old strong past participle of *help*.',
      '*seeke / seke* (sick / seek) is a rhyme on two different words that sounded alike — rime riche.',
    ],
  },
  {
    id: 'sonnet-18',
    title: 'Sonnet 18, lines 1–4',
    source: 'William Shakespeare, published 1609',
    period: 'EModE',
    lines: [
      ['Shall I compare thee to a summer’s day?', 'Shall I compare you to a summer day?'],
      ['Thou art more lovely and more temperate:', 'You are lovelier and milder:'],
      ['Rough winds do shake the darling buds of May,', 'rough winds shake the dear buds of May,'],
      ['And summer’s lease hath all too short a date;', 'and summer’s lease has far too short a term;'],
    ],
    notes: ['*thee / thou art*: the familiar singular pronoun with its verb form.', 'Unstressed *do* (*do shake*) was common in Early Modern English statements, not only for emphasis.'],
  },
  {
    id: 'hamlet',
    title: 'Hamlet, Act 3, Scene 1',
    source: 'William Shakespeare, c. 1600',
    period: 'EModE',
    lines: [
      ['To be, or not to be, that is the question:', 'To live or to die — that is the question:'],
      ['Whether ’tis nobler in the mind to suffer', 'whether it is nobler to endure in silence'],
      ['The slings and arrows of outrageous fortune,', 'the attacks of cruel fortune,'],
      ['Or to take arms against a sea of troubles,', 'or to fight against an ocean of troubles'],
      ['And by opposing end them.', 'and end them by resisting.'],
    ],
    notes: ['*’tis* = it is. The apostrophe marks the missing *i*.'],
  },
];

export const WORD_ORIGINS: Array<{ word: string; then: string; now: string; note: string }> = [
  { word: 'nice', then: 'foolish, ignorant (Latin nescius “not knowing”)', now: 'pleasant, kind', note: 'It passed through “shy”, “fussy” and “precise” before reaching “pleasant” in the 1700s.' },
  { word: 'silly', then: 'blessed, happy (Old English sǣlig)', now: 'foolish', note: 'From “blessed” to “innocent”, then “helpless”, then “foolish”.' },
  { word: 'girl', then: 'a young person of either sex (Middle English gurle)', now: 'a female child or young woman', note: 'Chaucer could speak of “yonge girles” meaning young people in general.' },
  { word: 'meat', then: 'food in general (Old English mete)', now: 'the flesh of animals', note: 'The old sense survives in “sweetmeat” and “meat and drink”.' },
  { word: 'deer', then: 'any wild animal (Old English dēor)', now: 'one family of animals', note: 'Compare German Tier “animal”.' },
  { word: 'starve', then: 'to die (Old English steorfan)', now: 'to suffer or die from hunger', note: 'Compare German sterben “to die”.' },
  { word: 'awful', then: 'inspiring awe, worthy of respect', now: 'very bad', note: 'Its positive meaning moved to “awesome” — which is now weakening too.' },
  { word: 'knight', then: 'a boy, a servant (Old English cniht)', now: 'a man given a title for service', note: 'Compare German Knecht “servant”. The k was pronounced until about 1600.' },
  { word: 'bead', then: 'a prayer (Old English gebed)', now: 'a small ball with a hole', note: 'People counted prayers on strings of small balls, so the word moved from the prayer to the ball.' },
  { word: 'villain', then: 'a farm worker (Old French vilein, from Latin villa “farm”)', now: 'a wicked person', note: 'An example of how upper-class contempt changed a neutral word.' },
  { word: 'naughty', then: 'having nothing, poor (from naught)', now: 'badly behaved', note: 'From “poor” to “wicked” to the mild modern sense used of children.' },
  { word: 'sad', then: 'full, satisfied (Old English sæd)', now: 'unhappy', note: 'Via “steady, serious” to “sorrowful”.' },
  { word: 'fond', then: 'foolish (Middle English fonned)', now: 'having affection for', note: 'Being foolishly in love became simply being affectionate.' },
  { word: 'clue', then: 'a ball of thread (clew)', now: 'a piece of evidence', note: 'From the thread Theseus used to find his way out of the labyrinth.' },
  { word: 'lady', then: 'loaf-kneader (Old English hlǣfdīge)', now: 'a woman; a woman of high rank', note: 'Its partner lord comes from hlāfweard, “loaf-guardian”.' },
  { word: 'hussy', then: 'housewife', now: 'an impudent woman (dated, offensive)', note: 'Housewife was shortened to hussif, then hussy, and the meaning worsened.' },
];

// ── Quiz ────────────────────────────────────────────────────────────────

type Section = 'timeline' | 'letters' | 'grammar' | 'texts' | 'origins';

function mcq(id: string, section: Section, prompt: string, options: string[], answer: number, explanation: string, level: McqItemT['level'] = 'B2'): McqItemT {
  return { id: `me-${id}`, type: 'mcq', prompt, options, answer, explanation, level, difficulty: 3, topics: ['medieval'], skill: 'reading', examTags: [], source: 'authored', ref: `ME.${section}` };
}

function gap(id: string, section: Section, prompt: string, accepted: string[], explanation: string): GapItemT {
  return { id: `me-${id}`, type: 'gap', prompt, acceptedAnswers: accepted, explanation, level: 'B2', difficulty: 3, topics: ['medieval'], skill: 'vocabulary', examTags: [], source: 'authored', ref: `ME.${section}` };
}

export const MEDIEVAL_QUIZ: Item[] = [
  mcq('t01', 'timeline', 'In which century did the Anglo-Saxons begin to settle in Britain?', ['the 5th century', 'the 2nd century', 'the 9th century', 'the 11th century'], 0, 'Germanic settlement began around 450.'),
  mcq('t02', 'timeline', 'The Norman Conquest of England took place in…', ['1215', '1066', '1381', '1453'], 1, '1066: William of Normandy defeated Harold at Hastings.'),
  mcq('t03', 'timeline', 'After 1066, which language became the language of the English court and law for about three centuries?', ['Old Norse', 'Latin only', 'Norman French', 'Welsh'], 2, 'Norman (Anglo-)French was used by the ruling class, in law and administration.'),
  mcq('t04', 'timeline', 'Words such as sky, egg, window and the pronoun they entered English from…', ['Norman French', 'Latin', 'Dutch', 'Old Norse'], 3, 'They came with Viking settlement in the Danelaw.'),
  mcq('t05', 'timeline', 'Who set up the first printing press in England, in 1476?', ['William Caxton', 'Geoffrey Chaucer', 'John Wycliffe', 'William Tyndale'], 0, 'Caxton printed in Westminster from 1476.'),
  mcq('t06', 'timeline', 'The Canterbury Tales was written in…', ['Old English', 'Middle English', 'Early Modern English', 'Anglo-Norman French'], 1, 'Chaucer wrote in the London dialect of Middle English, c. 1387–1400.'),
  mcq('t07', 'timeline', 'The Great Vowel Shift mainly changed…', ['the spelling of consonants', 'the order of words in a sentence', 'the pronunciation of long vowels', 'the use of articles'], 2, 'Long vowels moved upwards in the mouth; spelling largely stayed the same, which explains many modern spelling oddities.'),
  mcq('t08', 'timeline', 'Approximately when did the Great Vowel Shift take place?', ['c. 700–900', 'c. 1066–1100', 'c. 1800–1900', 'c. 1400–1700'], 3, 'It unfolded over roughly three centuries, from about 1400 to 1700.'),
  mcq('t09', 'timeline', 'The King James Bible was published in…', ['1611', '1066', '1476', '1755'], 0, '1611, during the reign of James I.'),
  mcq('t10', 'timeline', 'Old English is usually dated…', ['c. 1100–1500', 'c. 450–1100', 'c. 1500–1700', 'c. 1066–1300'], 1, 'Old English: c. 450–1100; Middle English: c. 1100–1500; Early Modern English: c. 1500–1700.'),
  mcq('t11', 'timeline', 'Which king fought the Vikings and promoted writing in English in the late 9th century?', ['William the Conqueror', 'Henry VIII', 'Alfred the Great', 'Richard I'], 2, 'Alfred of Wessex (871–899).'),
  mcq('t12', 'timeline', 'Beowulf is written in…', ['Middle English', 'Old Norse', 'Latin', 'Old English'], 3, 'It is the longest surviving Old English poem.'),
  mcq('l01', 'letters', 'The letter þ is called…', ['thorn', 'eth', 'wynn', 'yogh'], 0, 'þ = thorn, a runic letter for the th sounds.'),
  mcq('l02', 'letters', 'The letter ð is called…', ['thorn', 'eth', 'ash', 'yogh'], 1, 'ð = eth, a crossed d.'),
  mcq('l03', 'letters', 'The letter æ is called…', ['eth', 'wynn', 'ash', 'thorn'], 2, 'æ = ash, the vowel in cat.'),
  mcq('l04', 'letters', 'The letter ƿ (wynn) was used for the sound…', ['/θ/', '/ʃ/', '/k/', '/w/'], 3, 'Wynn was replaced by uu, which became w.'),
  mcq('l05', 'letters', 'Yogh (ȝ) was later replaced by spellings such as…', ['gh or y', 'th', 'sh', 'w'], 0, 'niȝt → night; ȝe → ye.'),
  mcq('l06', 'letters', 'In “Ye Olde Shoppe”, the word “Ye” was originally pronounced…', ['“yee”', '“the”', '“you”', '“yeah”'], 1, 'The y is a later form of thorn (þ), so “ye” = “the”.'),
  mcq('l07', 'letters', 'Which spelling replaced both thorn and eth?', ['dh', 'tz', 'th', 'ph'], 2, 'Th, under the influence of French and Latin scribal habits.'),
  mcq('l08', 'letters', 'In Old English, the letters sc (as in scip) sounded like modern…', ['sk', 's', 'ch', 'sh'], 3, 'scip → ship; fisc → fish.'),
  gap('l09', 'letters', 'Write the modern word: þing → ___', ['thing'], 'þ = th.'),
  gap('l10', 'letters', 'Write the modern word: ƿīf → ___', ['wife'], 'ƿ = w; Old English wīf meant woman.'),
  gap('l11', 'letters', 'Write the modern word: cyning → ___', ['king'], 'c before y was pronounced /k/; the word was shortened over time.'),
  gap('l12', 'letters', 'Write the modern word: eorðe → ___', ['earth'], 'ð = th.'),
  mcq('g01', 'grammar', 'In Early Modern English, “thou” was used to address…', ['one person who was close, younger or of lower status', 'a group of people', 'a king formally', 'nobody — it existed only in poetry'], 0, 'Thou was the familiar singular; you was the polite or plural form.'),
  mcq('g02', 'grammar', 'Choose the correct form: “Where ___ thou going?”', ['is', 'art', 'are', 'am'], 1, 'thou art = you are.'),
  mcq('g03', 'grammar', 'Choose the Early Modern form: “The bell ___ at noon.” (ring)', ['ringest', 'ringen', 'ringeth', 'rangeth'], 2, '-eth was the southern third person singular ending: it ringeth.'),
  mcq('g04', 'grammar', 'Choose the form that agrees with thou: “Thou ___ well.” (speak)', ['speaketh', 'speakes', 'spoke', 'speakest'], 3, 'Verbs agreeing with thou end in -est: thou speakest.'),
  mcq('g05', 'grammar', 'Which word is the object form of thou?', ['thee', 'thy', 'thine', 'ye'], 0, 'thou (subject) – thee (object), like I – me.'),
  mcq('g06', 'grammar', 'Complete: “The choice is ___.” (= yours, singular familiar)', ['thy', 'thine', 'thee', 'thou'], 1, 'Thine is the possessive pronoun (it stands alone), like mine.'),
  mcq('g07', 'grammar', 'Originally, ye was the plural subject pronoun and you was…', ['a polite singular only', 'the possessive form', 'the plural object form', 'a verb'], 2, 'ye (subject) – you (object); later you took over both roles.'),
  mcq('g08', 'grammar', 'Old English nouns changed their endings mainly to show…', ['tense', 'aspect', 'mood', 'case (their role in the sentence)'], 3, 'Nominative, accusative, genitive and dative endings.'),
  mcq('g09', 'grammar', 'A verb like singan – sang – sungen, which changes its vowel in the past, is called…', ['a strong verb', 'a weak verb', 'a modal verb', 'an auxiliary'], 0, 'Strong verbs use vowel change; weak verbs add -ed (-ode, -ede).'),
  mcq('g10', 'grammar', 'Which modern verb continues an old strong verb?', ['walk (walked)', 'drive (drove, driven)', 'play (played)', 'want (wanted)'], 1, 'Modern irregular verbs such as drive, ride and sing descend from strong verbs.'),
  mcq('g11', 'grammar', 'Chaucer writes “He nevere yet no vileynye ne sayde.” This shows…', ['a copying error', 'a question form', 'multiple negation, normal in Middle English', 'the passive voice'], 2, 'Negatives reinforced each other in Middle English.'),
  mcq('g12', 'grammar', 'In “Thou art more lovely”, art means…', ['painting', 'were', 'have', 'are'], 3, 'art = are (with thou).'),
  mcq('g13', 'grammar', '“Hath” is an older form of…', ['has', 'had', 'have (plural)', 'hate'], 0, 'he hath = he has.'),
  mcq('g14', 'grammar', '“Doth” is an older form of…', ['did', 'does', 'done', 'death'], 1, 'she doth = she does.'),
  mcq('g15', 'grammar', 'The modern possessive ’s comes from…', ['a French ending', 'a Viking contraction of “his”', 'the Old English genitive ending -es', 'Latin -us'], 2, 'stānes = “of the stone”; the e was later replaced by an apostrophe.'),
  mcq('g16', 'grammar', '“Holpen”, in Chaucer, is an old past participle of…', ['hold', 'hope', 'hollow', 'help'], 3, 'Help was once a strong verb (help – healp – holpen).'),
  mcq('x01', 'texts', 'The first word of Beowulf, “Hwæt!”, is best rendered as…', ['Listen!', 'Why?', 'Who?', 'When?'], 0, 'Hwæt (literally “what”) works as a call for attention at the start of the poem.'),
  mcq('x02', 'texts', 'In Beowulf, “hron-rād” (whale-road) means…', ['a ship', 'the sea', 'a king', 'a battle'], 1, 'It is a kenning, a compound metaphor.'),
  mcq('x03', 'texts', 'A kenning is…', ['a type of rhyme', 'a short poem', 'a compound metaphor such as “whale-road” for the sea', 'a royal title'], 2, 'Kennings are typical of Old English and Old Norse poetry.'),
  mcq('x04', 'texts', 'In Chaucer’s “shoures soote”, soote means…', ['soot', 'soon', 'sour', 'sweet'], 3, 'shoures soote = sweet showers.'),
  mcq('x05', 'texts', 'In Chaucer, “smale foweles” are…', ['small birds', 'small fools', 'little fields', 'short flowers'], 0, 'fowl once meant any bird (compare German Vogel).'),
  mcq('x06', 'texts', '“Thanne longen folk to goon on pilgrimages” — longen means…', ['belong', 'long for, desire', 'grow longer', 'lengthen'], 1, 'Then people long to go on pilgrimages.'),
  mcq('x07', 'texts', 'In the Old English Lord’s Prayer, “hlāf” became modern…', ['half', 'laugh', 'loaf', 'life'], 2, 'hlāf → loaf (and lord, lady contain it too).'),
  mcq('x08', 'texts', 'The Old English “rīce” (kingdom) survives in the modern word…', ['rice', 'price', 'rise', 'bishopric'], 3, 'bishopric = the area governed by a bishop.'),
  mcq('x09', 'texts', 'In “Shall I compare thee to a summer’s day?”, thee refers to…', ['the person the poet is addressing', 'the poet himself', 'summer', 'every reader'], 0, 'thee = you (object, singular).'),
  mcq('x10', 'texts', 'In Hamlet’s “’tis”, the apostrophe replaces…', ['a missing h', 'the i of it (it is)', 'a plural ending', 'a possessive'], 1, '’tis = it is.'),
  mcq('x11', 'texts', 'Old English verse is mainly structured by…', ['end rhyme', 'a fixed number of syllables', 'alliteration and a pause in each line', 'repeated refrains'], 2, 'Each line has two halves linked by alliteration.'),
  mcq('x12', 'texts', 'Why must the final -e in Chaucer’s “soote” and “sonne” be read aloud?', ['Because it is French', 'Because it marks a plural', 'Because it is a question', 'Because the rhythm of the verse needs it'], 3, 'Final -e was still pronounced in Chaucer’s English in many positions.'),
  mcq('o01', 'origins', '“Nice” originally meant…', ['foolish, ignorant', 'kind', 'beautiful', 'expensive'], 0, 'From Latin nescius, “not knowing”.'),
  mcq('o02', 'origins', '“Silly” originally meant…', ['stupid', 'blessed, happy', 'small', 'sick'], 1, 'Old English sǣlig = blessed.'),
  mcq('o03', 'origins', 'In Middle English, “girl” could mean…', ['only a baby girl', 'a servant', 'a young person of either sex', 'an old woman'], 2, 'Its meaning narrowed later.'),
  mcq('o04', 'origins', 'Old English “mete” (meat) meant…', ['only beef', 'a meeting', 'a measure', 'food in general'], 3, 'The old sense survives in sweetmeat.'),
  mcq('o05', 'origins', 'Old English “dēor” (deer) meant…', ['any wild animal', 'a young stag', 'a dear friend', 'a forest'], 0, 'Compare German Tier.'),
  mcq('o06', 'origins', 'Old English “steorfan” (starve) meant…', ['to be hungry', 'to die', 'to work hard', 'to stare'], 1, 'Compare German sterben.'),
  mcq('o07', 'origins', '“Awful” originally meant…', ['terrible', 'lazy', 'inspiring awe', 'full of holes'], 2, 'Its positive sense is now carried by awesome.'),
  mcq('o08', 'origins', 'Old English “cniht” (knight) meant…', ['a noble horseman', 'a night watchman', 'a king’s son', 'a boy or servant'], 3, 'Compare German Knecht.'),
  mcq('o09', 'origins', 'Old English “gebed” (bead) meant…', ['a prayer', 'a small stone', 'a bed', 'a drop of water'], 0, 'Prayers were counted on beads.'),
  mcq('o10', 'origins', '“Villain” originally meant…', ['a criminal', 'a farm worker', 'a city dweller', 'a soldier'], 1, 'From Latin villa, a farm.'),
  mcq('o11', 'origins', '“Clue” comes from an old word for…', ['a key', 'a lock', 'a ball of thread', 'a footprint'], 2, 'Theseus’ clew of thread led him out of the labyrinth.'),
  mcq('o12', 'origins', '“Lady” comes from Old English hlǣfdīge, literally…', ['house-keeper', 'queen', 'fine woman', 'loaf-kneader'], 3, 'Lord is hlāfweard, loaf-guardian.'),
];
