import type { LevelT } from '../../src/lib/schema';

/**
 * Word families for word-formation items. Each sentence has exactly one
 * acceptable form (or the listed alternatives) for the gap.
 */
export type WordClass = 'noun' | 'person' | 'verb' | 'adjective' | 'adverb';

export interface WordFamily {
  /** The stem shown in capitals (Cambridge style). */
  stem: string;
  forms: Partial<Record<WordClass, string[]>>;
  /** Negative / opposite forms (unreliable, disagree…). */
  negative?: string[];
  sentences: Array<{ text: string; answer: string[]; level: LevelT; note: string }>;
}

export const WORD_FAMILIES: WordFamily[] = [
  { stem: 'DECIDE', forms: { verb: ['decide'], noun: ['decision'], adjective: ['decisive'], adverb: ['decisively'] }, negative: ['indecisive'], sentences: [
    { text: 'The board will announce its final ___ on Friday.', answer: ['decision'], level: 'B1', note: 'noun after "its final"' },
    { text: 'We need a ___ leader who can act quickly in a crisis.', answer: ['decisive'], level: 'B2', note: 'adjective before a noun' },
  ] },
  { stem: 'EMPLOY', forms: { verb: ['employ'], noun: ['employment'], person: ['employer', 'employee'], adjective: ['employable'] }, negative: ['unemployed', 'unemployment'], sentences: [
    { text: 'Rising ___ has pushed thousands of families into poverty.', answer: ['unemployment'], level: 'B2', note: 'negative noun (un- + employment)' },
    { text: 'Every ___ is entitled to thirty days of paid holiday.', answer: ['employee'], level: 'B1', note: 'person who is employed (-ee)' },
  ] },
  { stem: 'RELY', forms: { verb: ['rely'], noun: ['reliability', 'reliance'], adjective: ['reliable'], adverb: ['reliably'] }, negative: ['unreliable'], sentences: [
    { text: 'The old bus service was so ___ that people stopped using it.', answer: ['unreliable'], level: 'B2', note: 'negative adjective (un- + reliable)' },
    { text: 'The company’s ___ on a single supplier proved disastrous.', answer: ['reliance'], level: 'C1', note: 'noun: reliance on' },
  ] },
  { stem: 'COMPETE', forms: { verb: ['compete'], noun: ['competition', 'competitiveness'], person: ['competitor'], adjective: ['competitive'], adverb: ['competitively'] }, sentences: [
    { text: 'Prices are kept low by fierce ___ between the airlines.', answer: ['competition'], level: 'B1', note: 'abstract noun' },
    { text: 'Our main ___ has just launched a cheaper model.', answer: ['competitor'], level: 'B2', note: 'person/company that competes' },
  ] },
  { stem: 'SUCCEED', forms: { verb: ['succeed'], noun: ['success', 'succession'], adjective: ['successful'], adverb: ['successfully'] }, negative: ['unsuccessful', 'unsuccessfully'], sentences: [
    { text: 'She applied twice ___ before she finally got the grant.', answer: ['unsuccessfully'], level: 'C1', note: 'negative adverb' },
    { text: 'The campaign was a huge ___.', answer: ['success'], level: 'B1', note: 'noun after "a huge"' },
  ] },
  { stem: 'ANALYSE', forms: { verb: ['analyse', 'analyze'], noun: ['analysis'], person: ['analyst'], adjective: ['analytical', 'analytic'], adverb: ['analytically'] }, sentences: [
    { text: 'A detailed ___ of the data revealed two errors.', answer: ['analysis'], level: 'B2', note: 'noun after "a detailed"' },
    { text: 'The job requires strong ___ skills.', answer: ['analytical', 'analytic'], level: 'B2', note: 'adjective before a noun' },
  ] },
  { stem: 'ECONOMY', forms: { noun: ['economy', 'economics'], person: ['economist'], adjective: ['economic', 'economical'], adverb: ['economically'] }, sentences: [
    { text: 'The country is going through a period of rapid ___ growth.', answer: ['economic'], level: 'B2', note: 'economic = related to the economy' },
    { text: 'This car is very ___ — it uses very little fuel.', answer: ['economical'], level: 'B2', note: 'economical = not wasteful' },
  ] },
  { stem: 'ACCEPT', forms: { verb: ['accept'], noun: ['acceptance'], adjective: ['acceptable'], adverb: ['acceptably'] }, negative: ['unacceptable'], sentences: [
    { text: 'Such behaviour is completely ___ in a professional setting.', answer: ['unacceptable'], level: 'B2', note: 'negative adjective' },
  ] },
  { stem: 'RESPONSIBLE', forms: { noun: ['responsibility'], adjective: ['responsible'], adverb: ['responsibly'] }, negative: ['irresponsible', 'irresponsibly'], sentences: [
    { text: 'It was ___ of him to leave the children alone.', answer: ['irresponsible'], level: 'B2', note: 'negative adjective (ir- before r)' },
    { text: 'Managers must take ___ for their decisions.', answer: ['responsibility'], level: 'B1', note: 'noun: take responsibility' },
  ] },
  { stem: 'LEGAL', forms: { noun: ['legality', 'legislation'], verb: ['legalise', 'legalize'], adjective: ['legal'], adverb: ['legally'] }, negative: ['illegal', 'illegally'], sentences: [
    { text: 'The goods had been brought into the country ___, without any customs declaration.', answer: ['illegally'], level: 'B2', note: 'negative adverb (il- before l)' },
  ] },
  { stem: 'POSSIBLE', forms: { noun: ['possibility'], adjective: ['possible'], adverb: ['possibly'] }, negative: ['impossible', 'impossibility'], sentences: [
    { text: 'We cannot rule out the ___ of further delays.', answer: ['possibility'], level: 'B1', note: 'noun after "the"' },
  ] },
  { stem: 'PATIENT', forms: { noun: ['patience'], adjective: ['patient'], adverb: ['patiently'] }, negative: ['impatient', 'impatience', 'impatiently'], sentences: [
    { text: 'Thank you for your ___ while we resolve the issue.', answer: ['patience'], level: 'B1', note: 'noun after "your"' },
    { text: 'The passengers were growing ___ after three hours on the runway.', answer: ['impatient'], level: 'B2', note: 'negative adjective (im- before p)' },
  ] },
  { stem: 'APPEAR', forms: { verb: ['appear'], noun: ['appearance'] }, negative: ['disappear', 'disappearance'], sentences: [
    { text: 'The sudden ___ of the bees left local farmers without pollinators.', answer: ['disappearance'], level: 'C1', note: 'negative noun (dis- + appearance)' },
  ] },
  { stem: 'AGREE', forms: { verb: ['agree'], noun: ['agreement'], adjective: ['agreeable'] }, negative: ['disagree', 'disagreement'], sentences: [
    { text: 'There is considerable ___ among experts about the cause, and the debate continues.', answer: ['disagreement'], level: 'B2', note: 'negative noun' },
    { text: 'The two companies signed an ___ to share research costs.', answer: ['agreement'], level: 'B1', note: 'noun after "an"' },
  ] },
  { stem: 'BELIEVE', forms: { verb: ['believe'], noun: ['belief'], adjective: ['believable'] }, negative: ['unbelievable', 'unbelievably', 'disbelief'], sentences: [
    { text: 'She stared at the results in ___.', answer: ['disbelief'], level: 'C1', note: 'noun: in disbelief' },
    { text: 'The traffic this morning was ___ slow.', answer: ['unbelievably'], level: 'B2', note: 'adverb before an adjective' },
  ] },
  { stem: 'COMFORT', forms: { noun: ['comfort'], adjective: ['comfortable'], adverb: ['comfortably'] }, negative: ['uncomfortable', 'discomfort'], sentences: [
    { text: 'Some patients experience mild ___ after the procedure.', answer: ['discomfort'], level: 'C1', note: 'negative noun (dis-)' },
  ] },
  { stem: 'DEPEND', forms: { verb: ['depend'], noun: ['dependence', 'dependency'], adjective: ['dependent', 'dependable'] }, negative: ['independent', 'independence', 'independently'], sentences: [
    { text: 'Brazil declared ___ from Portugal in 1822.', answer: ['independence'], level: 'B1', note: 'negative noun' },
    { text: 'The study was carried out ___ of the manufacturer.', answer: ['independently'], level: 'C1', note: 'adverb: independently of' },
  ] },
  { stem: 'EFFECT', forms: { noun: ['effect', 'effectiveness'], adjective: ['effective'], adverb: ['effectively'] }, negative: ['ineffective'], sentences: [
    { text: 'The new filters remove 99% of bacteria, which makes them extremely ___.', answer: ['effective'], level: 'B2', note: 'adjective after "extremely"' },
    { text: 'The treatment proved ___ and was withdrawn.', answer: ['ineffective'], level: 'B2', note: 'negative adjective' },
  ] },
  { stem: 'SIGNIFY', forms: { verb: ['signify'], noun: ['significance'], adjective: ['significant'], adverb: ['significantly'] }, negative: ['insignificant'], sentences: [
    { text: 'Sales have increased ___ since the rebranding.', answer: ['significantly'], level: 'B2', note: 'adverb modifying a verb' },
    { text: 'Historians still debate the ___ of the treaty.', answer: ['significance'], level: 'C1', note: 'noun after "the"' },
  ] },
  { stem: 'ACHIEVE', forms: { verb: ['achieve'], noun: ['achievement'], adjective: ['achievable'] }, sentences: [
    { text: 'Winning the award was the greatest ___ of her career.', answer: ['achievement'], level: 'B1', note: 'noun after "the greatest"' },
    { text: 'Set yourself realistic, ___ goals.', answer: ['achievable'], level: 'B2', note: 'adjective (-able)' },
  ] },
  { stem: 'CREATE', forms: { verb: ['create'], noun: ['creation', 'creativity'], person: ['creator'], adjective: ['creative'], adverb: ['creatively'] }, sentences: [
    { text: 'The programme encourages ___ and independent thinking.', answer: ['creativity'], level: 'B2', note: 'abstract noun (-ity)' },
  ] },
  { stem: 'ENVIRONMENT', forms: { noun: ['environment', 'environmentalist'], adjective: ['environmental'], adverb: ['environmentally'] }, sentences: [
    { text: 'Consumers increasingly prefer ___ friendly packaging.', answer: ['environmentally'], level: 'B2', note: 'adverb before the adjective "friendly"' },
    { text: 'The dam will have serious ___ consequences.', answer: ['environmental'], level: 'B2', note: 'adjective before a noun' },
  ] },
  { stem: 'PERSUADE', forms: { verb: ['persuade'], noun: ['persuasion'], adjective: ['persuasive'], adverb: ['persuasively'] }, sentences: [
    { text: 'Her argument was so ___ that the committee changed its mind.', answer: ['persuasive'], level: 'B2', note: 'adjective after "so"' },
  ] },
  { stem: 'BRIEF', forms: { noun: ['brevity', 'briefing'], adjective: ['brief'], adverb: ['briefly'] }, sentences: [
    { text: 'The minister spoke ___ to reporters outside the building.', answer: ['briefly'], level: 'B1', note: 'adverb modifying "spoke"' },
    { text: 'Journalists value ___ and clarity above all.', answer: ['brevity'], level: 'C2', note: 'abstract noun (brief → brevity)' },
  ] },
  { stem: 'STRONG', forms: { noun: ['strength'], verb: ['strengthen'], adjective: ['strong'], adverb: ['strongly'] }, sentences: [
    { text: 'The new law aims to ___ consumer rights.', answer: ['strengthen'], level: 'B2', note: 'verb (-en) after "to"' },
    { text: 'Patience is one of her greatest ___.', answer: ['strengths'], level: 'B2', note: 'plural noun after "one of"' },
  ] },
  { stem: 'WIDE', forms: { noun: ['width'], verb: ['widen'], adjective: ['wide'], adverb: ['widely'] }, sentences: [
    { text: 'The council plans to ___ the road next year.', answer: ['widen'], level: 'B2', note: 'verb (-en)' },
    { text: 'His theory is now ___ accepted.', answer: ['widely'], level: 'B2', note: 'adverb before a participle' },
  ] },
  { stem: 'LONG', forms: { noun: ['length'], verb: ['lengthen'], adjective: ['long', 'lengthy'] }, sentences: [
    { text: 'After a ___ discussion, the proposal was approved.', answer: ['lengthy'], level: 'C1', note: 'adjective: lengthy = (too) long' },
    { text: 'The bridge is 1.2 kilometres in ___.', answer: ['length'], level: 'B1', note: 'noun: in length' },
  ] },
  { stem: 'DEEP', forms: { noun: ['depth'], verb: ['deepen'], adjective: ['deep'], adverb: ['deeply'] }, sentences: [
    { text: 'The lake reaches a ___ of ninety metres.', answer: ['depth'], level: 'B1', note: 'noun after "a"' },
    { text: 'We were ___ moved by her speech.', answer: ['deeply'], level: 'B2', note: 'adverb before a participle' },
  ] },
  { stem: 'ABLE', forms: { noun: ['ability'], verb: ['enable'], adjective: ['able'] }, negative: ['unable', 'inability', 'disability', 'disabled'], sentences: [
    { text: 'The new software will ___ staff to work from home.', answer: ['enable'], level: 'B2', note: 'verb (en- + able)' },
    { text: 'His ___ to make decisions frustrated the whole team.', answer: ['inability'], level: 'C1', note: 'negative noun (in- + ability)' },
  ] },
  { stem: 'COURAGE', forms: { noun: ['courage'], verb: ['encourage'], adjective: ['courageous', 'encouraging'] }, negative: ['discourage', 'discouraging'], sentences: [
    { text: 'Parents should ___ their children to read for pleasure.', answer: ['encourage'], level: 'B1', note: 'verb (en-)' },
    { text: 'It was a ___ decision to speak out against the scheme.', answer: ['courageous'], level: 'C1', note: 'adjective (-ous)' },
  ] },
  { stem: 'DANGER', forms: { noun: ['danger'], verb: ['endanger'], adjective: ['dangerous'], adverb: ['dangerously'] }, sentences: [
    { text: 'Illegal fishing continues to ___ several species.', answer: ['endanger'], level: 'C1', note: 'verb (en-)' },
    { text: 'The river was ___ close to bursting its banks.', answer: ['dangerously'], level: 'B2', note: 'adverb before an adjective' },
  ] },
  { stem: 'INFORM', forms: { verb: ['inform'], noun: ['information'], adjective: ['informative', 'informal', 'informed'] }, sentences: [
    { text: 'The museum guide was friendly and very ___.', answer: ['informative'], level: 'B2', note: 'informative = giving useful information' },
  ] },
  { stem: 'COMMUNICATE', forms: { verb: ['communicate'], noun: ['communication'], adjective: ['communicative'] }, sentences: [
    { text: 'Poor ___ between departments caused the delay.', answer: ['communication'], level: 'B1', note: 'noun after an adjective' },
  ] },
  { stem: 'EXPLAIN', forms: { verb: ['explain'], noun: ['explanation'], adjective: ['explanatory'] }, sentences: [
    { text: 'The manager offered no ___ for the decision.', answer: ['explanation'], level: 'B1', note: 'noun (note the spelling: explanation)' },
  ] },
  { stem: 'PRONOUNCE', forms: { verb: ['pronounce'], noun: ['pronunciation'] }, sentences: [
    { text: 'Her ___ of Portuguese place names is excellent.', answer: ['pronunciation'], level: 'B2', note: 'noun (spelling: pronunciation, not pronounciation)' },
  ] },
  { stem: 'MAINTAIN', forms: { verb: ['maintain'], noun: ['maintenance'] }, sentences: [
    { text: 'The lift is closed for routine ___.', answer: ['maintenance'], level: 'B2', note: 'noun (spelling: maintenance)' },
  ] },
  { stem: 'ARRIVE', forms: { verb: ['arrive'], noun: ['arrival'] }, sentences: [
    { text: 'On ___, please report to the main reception.', answer: ['arrival'], level: 'B1', note: 'noun (-al) after "on"' },
  ] },
  { stem: 'REFUSE', forms: { verb: ['refuse'], noun: ['refusal'] }, sentences: [
    { text: 'His ___ to cooperate surprised everyone.', answer: ['refusal'], level: 'B2', note: 'noun (-al)' },
  ] },
  { stem: 'FAIL', forms: { verb: ['fail'], noun: ['failure'] }, sentences: [
    { text: 'The launch was a complete ___.', answer: ['failure'], level: 'B1', note: 'noun (-ure)' },
  ] },
  { stem: 'PLEASE', forms: { verb: ['please'], noun: ['pleasure'], adjective: ['pleasant', 'pleased', 'pleasing'] }, negative: ['unpleasant', 'displeasure'], sentences: [
    { text: 'It gives me great ___ to introduce our speaker.', answer: ['pleasure'], level: 'B1', note: 'noun (-ure)' },
    { text: 'The medicine has an ___ taste.', answer: ['unpleasant'], level: 'B1', note: 'negative adjective after "an"' },
  ] },
  { stem: 'ORIGIN', forms: { noun: ['origin', 'originality'], verb: ['originate'], adjective: ['original'], adverb: ['originally'] }, sentences: [
    { text: '___, the building was a textile factory.', answer: ['Originally'], level: 'B2', note: 'sentence adverb' },
    { text: 'The judges praised the ___ of her design.', answer: ['originality'], level: 'C1', note: 'abstract noun (-ity)' },
  ] },
  { stem: 'CHOOSE', forms: { verb: ['choose'], noun: ['choice'] }, sentences: [
    { text: 'Customers have a wide ___ of payment methods.', answer: ['choice'], level: 'B1', note: 'noun' },
  ] },
  { stem: 'PROVE', forms: { verb: ['prove'], noun: ['proof'] }, sentences: [
    { text: 'There is no ___ that the drug causes side effects.', answer: ['proof'], level: 'B2', note: 'noun (prove → proof)' },
  ] },
  { stem: 'HIGH', forms: { noun: ['height'], verb: ['heighten'], adjective: ['high'], adverb: ['highly'] }, sentences: [
    { text: 'The tower is over 300 metres in ___.', answer: ['height'], level: 'B1', note: 'noun (high → height)' },
    { text: 'The film was ___ praised by critics.', answer: ['highly'], level: 'B2', note: 'highly = very much (with verbs/participles)' },
  ] },
  { stem: 'COMPARE', forms: { verb: ['compare'], noun: ['comparison'], adjective: ['comparable', 'comparative'], adverb: ['comparatively'] }, sentences: [
    { text: 'Rents here are ___ low for a capital city.', answer: ['comparatively'], level: 'C1', note: 'adverb before an adjective' },
    { text: 'In ___ with last year, profits have doubled.', answer: ['comparison'], level: 'B2', note: 'noun: in comparison with' },
  ] },
  { stem: 'ADMIT', forms: { verb: ['admit'], noun: ['admission', 'admittance'] }, sentences: [
    { text: '___ to the museum is free on Sundays.', answer: ['Admission', 'Admittance'], level: 'B2', note: 'noun (admit → admission)' },
  ] },
  { stem: 'DESCRIBE', forms: { verb: ['describe'], noun: ['description'], adjective: ['descriptive'] }, sentences: [
    { text: 'The witness gave a detailed ___ of the driver.', answer: ['description'], level: 'B1', note: 'noun (-tion; note: describe → description)' },
  ] },
  { stem: 'ASSIST', forms: { verb: ['assist'], noun: ['assistance'], person: ['assistant'] }, sentences: [
    { text: 'If you need any ___, please contact our help desk.', answer: ['assistance'], level: 'B2', note: 'uncountable noun (-ance)' },
  ] },
  { stem: 'EXIST', forms: { verb: ['exist'], noun: ['existence'], adjective: ['existent', 'existing'] }, negative: ['non-existent', 'nonexistent'], sentences: [
    { text: 'Public transport in the area is practically ___.', answer: ['non-existent', 'nonexistent'], level: 'C1', note: 'negative adjective (non-)' },
  ] },
  { stem: 'POLITICS', forms: { noun: ['politics', 'policy'], person: ['politician'], adjective: ['political'], adverb: ['politically'] }, sentences: [
    { text: 'Several ___ attended the opening of the new hospital.', answer: ['politicians'], level: 'B1', note: 'plural person noun' },
  ] },
  { stem: 'SCIENCE', forms: { noun: ['science'], person: ['scientist'], adjective: ['scientific'], adverb: ['scientifically'] }, sentences: [
    { text: 'There is no ___ evidence for the claim.', answer: ['scientific'], level: 'B1', note: 'adjective before a noun' },
  ] },
  { stem: 'CONFIDENT', forms: { noun: ['confidence'], adjective: ['confident', 'confidential'], adverb: ['confidently'] }, sentences: [
    { text: 'All information you provide will be treated as strictly ___.', answer: ['confidential'], level: 'C1', note: 'confidential = secret, private' },
    { text: 'She answered the questions calmly and ___.', answer: ['confidently'], level: 'B2', note: 'adverb' },
  ] },
  { stem: 'HOPE', forms: { noun: ['hope'], adjective: ['hopeful', 'hopeless'], adverb: ['hopefully', 'hopelessly'] }, sentences: [
    { text: 'The rescue team remained ___ that more survivors would be found.', answer: ['hopeful'], level: 'B2', note: 'adjective (-ful)' },
  ] },
  { stem: 'CARE', forms: { noun: ['care'], adjective: ['careful', 'careless'], adverb: ['carefully', 'carelessly'] }, sentences: [
    { text: 'The accident was caused by ___ driving.', answer: ['careless'], level: 'B1', note: 'adjective (-less)' },
  ] },
  { stem: 'POWER', forms: { noun: ['power'], verb: ['empower'], adjective: ['powerful', 'powerless'] }, sentences: [
    { text: 'Without the support of the unions, the minister was ___ to act.', answer: ['powerless'], level: 'B2', note: 'adjective (-less)' },
    { text: 'Education can ___ women in rural communities.', answer: ['empower'], level: 'C1', note: 'verb (em- before p)' },
  ] },
  { stem: 'SOCIETY', forms: { noun: ['society', 'sociology'], person: ['sociologist'], adjective: ['social', 'sociable'], adverb: ['socially'] }, sentences: [
    { text: 'He is a very ___ person who loves meeting new people.', answer: ['sociable', 'social'], level: 'B2', note: 'sociable = friendly, likes company ("social" is also heard in informal AmE)' },
  ] },
  { stem: 'HISTORY', forms: { noun: ['history'], person: ['historian'], adjective: ['historic', 'historical'] }, sentences: [
    { text: 'The signing of the treaty was a ___ moment for the region.', answer: ['historic'], level: 'C1', note: 'historic = very important in history' },
    { text: 'The novel is based on ___ records from the colonial period.', answer: ['historical'], level: 'C1', note: 'historical = relating to the past' },
  ] },
  { stem: 'SENSE', forms: { noun: ['sense', 'sensitivity'], adjective: ['sensible', 'sensitive'], adverb: ['sensibly', 'sensitively'] }, negative: ['insensitive', 'senseless'], sentences: [
    { text: 'It would be ___ to wait until the weather improves.', answer: ['sensible'], level: 'B2', note: 'sensible = reasonable (not "sensitive")' },
    { text: 'Children’s skin is very ___ to the sun.', answer: ['sensitive'], level: 'B2', note: 'sensitive = easily affected' },
  ] },
  { stem: 'CONTINUE', forms: { verb: ['continue'], noun: ['continuation', 'continuity'], adjective: ['continuous', 'continual'], adverb: ['continuously', 'continually'] }, negative: ['discontinue'], sentences: [
    { text: 'The manufacturer decided to ___ the model after poor sales.', answer: ['discontinue'], level: 'C1', note: 'negative verb (dis-)' },
  ] },
  { stem: 'CHILD', forms: { noun: ['child', 'childhood'], adjective: ['childish', 'childlike'] }, sentences: [
    { text: 'She spent most of her ___ in Recife.', answer: ['childhood'], level: 'B1', note: 'noun (-hood)' },
    { text: 'Stop being so ___ and apologise to your colleague.', answer: ['childish'], level: 'B2', note: 'childish = immature (negative)' },
  ] },
  { stem: 'FRIEND', forms: { noun: ['friend', 'friendship', 'friendliness'], adjective: ['friendly'] }, negative: ['unfriendly'], sentences: [
    { text: 'Their ___ began at university and lasted forty years.', answer: ['friendship'], level: 'B1', note: 'noun (-ship)' },
  ] },
  { stem: 'LEAD', forms: { verb: ['lead'], noun: ['leadership'], person: ['leader'] }, sentences: [
    { text: 'Under her ___, the company tripled its profits.', answer: ['leadership'], level: 'B2', note: 'noun (-ship)' },
  ] },
  { stem: 'REAL', forms: { noun: ['reality', 'realism'], verb: ['realise', 'realize'], adjective: ['real', 'realistic'], adverb: ['really', 'realistically'] }, negative: ['unrealistic'], sentences: [
    { text: 'The deadline is completely ___ — we need at least two more weeks.', answer: ['unrealistic'], level: 'B2', note: 'negative adjective' },
  ] },
  { stem: 'CLEAR', forms: { noun: ['clarity', 'clearance'], verb: ['clarify'], adjective: ['clear'], adverb: ['clearly'] }, sentences: [
    { text: 'Could you ___ what you mean by “flexible hours”?', answer: ['clarify'], level: 'C1', note: 'verb (-ify)' },
  ] },
  { stem: 'SIMPLE', forms: { noun: ['simplicity'], verb: ['simplify'], adjective: ['simple'], adverb: ['simply'] }, sentences: [
    { text: 'The government promised to ___ the tax system.', answer: ['simplify'], level: 'B2', note: 'verb (-ify)' },
    { text: 'The beauty of the design lies in its ___.', answer: ['simplicity'], level: 'C1', note: 'abstract noun (-ity)' },
  ] },
  { stem: 'MODERN', forms: { noun: ['modernity', 'modernisation', 'modernization'], verb: ['modernise', 'modernize'], adjective: ['modern'] }, sentences: [
    { text: 'The port needs urgent ___ to handle larger ships.', answer: ['modernisation', 'modernization'], level: 'C1', note: 'noun (-isation / -ization)' },
  ] },
  { stem: 'ACT', forms: { verb: ['act', 'activate'], noun: ['action', 'activity', 'activist'], adjective: ['active'], adverb: ['actively'] }, negative: ['inactive', 'inaction'], sentences: [
    { text: 'Critics accused the government of ___ in the face of the crisis.', answer: ['inaction'], level: 'C1', note: 'negative noun (in- + action)' },
    { text: 'The volcano has been ___ for two centuries, so scientists consider an eruption unlikely.', answer: ['inactive'], level: 'B2', note: 'negative adjective' },
  ] },
];
