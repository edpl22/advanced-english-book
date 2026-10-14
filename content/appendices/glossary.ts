/** Glossary of grammatical terms used in the book (original definitions). */
export interface GlossaryEntry {
  term: string;
  def: string;
  example?: string;
  /** Portuguese equivalent. */
  pt?: string;
  ref?: string;
}

export const GLOSSARY: GlossaryEntry[] = [
  { term: 'active voice', def: 'The form of a clause in which the subject performs the action.', example: 'The committee approved the plan.', pt: 'voz ativa', ref: '9.1' },
  { term: 'adverbial', def: 'A word, phrase or clause that adds information about time, place, manner, reason or condition.', example: 'In 2019 · very quickly · because it rained', pt: 'adjunto adverbial' },
  { term: 'agent', def: 'In a passive sentence, the person or thing that performs the action, introduced by “by”.', example: 'The bridge was designed by a local engineer.', pt: 'agente da passiva', ref: '9.1' },
  { term: 'auxiliary verb', def: 'A verb (be, have, do, or a modal) used with a main verb to form tenses, questions, negatives and the passive.', example: 'She has finished. · Did you call?', pt: 'verbo auxiliar' },
  { term: 'backshift', def: 'Moving a verb one step back in time when reporting what someone said after a past reporting verb.', example: '“I am tired.” → She said she was tired.', ref: '10.1' },
  { term: 'causative', def: 'A structure (have/get + object + past participle) used when someone else does something for us.', example: 'I had my car serviced.', pt: 'voz causativa', ref: '9.3' },
  { term: 'clause', def: 'A group of words containing a subject and a verb. A sentence may contain one or more clauses.', pt: 'oração' },
  { term: 'cleft sentence', def: 'A sentence divided into two clauses to give emphasis to one part.', example: 'It was Ana who found the error. · What I need is time.', pt: 'frase clivada', ref: '24.1' },
  { term: 'collocation', def: 'A combination of words that frequently occur together and sound natural to native speakers.', example: 'make a decision · heavy rain', pt: 'colocação', ref: '27.1' },
  { term: 'conditional', def: 'A sentence with a condition (often introduced by if) and a result.', example: 'If it rains, we will stay in.', pt: 'oração condicional', ref: '7.1' },
  { term: 'contraction', def: 'A short form in which letters are replaced by an apostrophe.', example: 'don’t · I’d · it’s', pt: 'contração' },
  { term: 'countable noun', def: 'A noun with singular and plural forms, used with a/an and numbers.', example: 'a suitcase · three suitcases', pt: 'substantivo contável', ref: '12.1' },
  { term: 'defining relative clause', def: 'A relative clause that identifies which person or thing we mean; it is not separated by commas.', example: 'The student who won the prize is from Belém.', pt: 'oração adjetiva restritiva', ref: '20.1' },
  { term: 'determiner', def: 'A word placed before a noun to show which or how many: articles, demonstratives, possessives and quantifiers.', example: 'the · this · my · some · every', pt: 'determinante' },
  { term: 'ellipsis', def: 'Leaving out words that can be understood from the context.', example: 'She can swim but I can’t (swim).', pt: 'elipse', ref: '24.3' },
  { term: 'false friend', def: 'A word that looks like a word in another language but has a different meaning.', example: 'actually ≠ atualmente', pt: 'falso cognato', ref: '28.1' },
  { term: 'fronting', def: 'Moving a part of the sentence to the beginning for emphasis or contrast.', example: 'This point I cannot accept.', ref: '24.2' },
  { term: 'gerund', def: 'The -ing form of a verb used as a noun.', example: 'Swimming is good exercise. · I enjoy reading.', pt: 'gerúndio (em função de substantivo)', ref: '11.1' },
  { term: 'hedging', def: 'Using cautious language to avoid overstating a claim, typical of academic writing.', example: 'The results suggest that… · This may indicate…', pt: 'atenuação', ref: '29.1' },
  { term: 'infinitive', def: 'The base form of a verb, with or without “to”.', example: 'to go · (can) go', pt: 'infinitivo' },
  { term: 'inversion', def: 'Placing an auxiliary verb before the subject, as in questions or after certain adverbials and in formal conditionals.', example: 'Never have I seen… · Had I known…', pt: 'inversão', ref: '23.1' },
  { term: 'key word transformation', def: 'An exam task: rewrite a sentence using a given word without changing it, so that the meaning stays the same.', ref: '7.4' },
  { term: 'mixed conditional', def: 'A conditional sentence in which the two clauses refer to different times.', example: 'If I had studied medicine, I would be a doctor now.', pt: 'condicional misto', ref: '7.3' },
  { term: 'modal verb', def: 'An auxiliary that expresses ideas such as ability, possibility, obligation or deduction: can, could, may, might, must, shall, should, will, would.', pt: 'verbo modal', ref: '5.1' },
  { term: 'nominalisation', def: 'Expressing an action or quality as a noun, a typical feature of academic style.', example: 'They decided → their decision', pt: 'nominalização', ref: '13.4' },
  { term: 'non-defining relative clause', def: 'A relative clause that adds extra information and is separated by commas.', example: 'My sister, who lives in Lisbon, is a doctor.', pt: 'oração adjetiva explicativa', ref: '20.1' },
  { term: 'object', def: 'The person or thing affected by the action of a transitive verb.', example: 'She wrote **a report**.', pt: 'objeto' },
  { term: 'particle', def: 'An adverb or preposition that combines with a verb to form a phrasal verb.', example: 'up in give up · out in find out', pt: 'partícula', ref: '22.1' },
  { term: 'passive voice', def: 'The form of a clause in which the subject receives the action (be + past participle).', example: 'The plan was approved.', pt: 'voz passiva', ref: '9.1' },
  { term: 'past participle', def: 'The verb form used in perfect tenses and the passive.', example: 'gone · written · finished', pt: 'particípio passado' },
  { term: 'phrasal verb', def: 'A verb combined with one or two particles, often with an idiomatic meaning.', example: 'put off · run out of', pt: 'phrasal verb / verbo frasal', ref: '22.1' },
  { term: 'register', def: 'The level of formality of language chosen for a particular situation.', example: 'find out (neutral) / discover (formal)', pt: 'registro', ref: '22.5' },
  { term: 'reporting verb', def: 'A verb used to report what someone said or thought: say, tell, deny, urge, suggest…', pt: 'verbo de elocução', ref: '10.4' },
  { term: 'separable phrasal verb', def: 'A transitive phrasal verb whose object can come between the verb and the particle; a pronoun object must come between them.', example: 'turn it off', ref: '22.2' },
  { term: 'stative verb', def: 'A verb describing a state rather than an action, not normally used in continuous forms.', example: 'know · believe · own', pt: 'verbo de estado', ref: '1.4' },
  { term: 'subjunctive', def: 'A verb form used for unreal or desired situations; in English it is visible mainly in “were” and in the base form after verbs like suggest and insist.', example: 'If I were you… · I suggest that he be informed.', pt: 'subjuntivo', ref: '8.3' },
  { term: 'tense', def: 'The form of a verb that shows time and aspect.', example: 'present simple · past perfect', pt: 'tempo verbal' },
  { term: 'transitive verb', def: 'A verb that takes a direct object.', example: 'She **opened** the door.', pt: 'verbo transitivo' },
  { term: 'uncountable noun', def: 'A noun with no plural form that is not used with a/an.', example: 'advice · information · furniture', pt: 'substantivo incontável', ref: '12.1' },
  { term: 'unreal past', def: 'The use of a past form to describe a present or future situation that is imagined, not real.', example: 'I wish I knew. · It’s time we left.', pt: 'passado irreal', ref: '8.1' },
];
