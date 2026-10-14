export { normalize, tokens } from './normalize';
export { expandContractions, fullForm, hasContraction } from './contractions';
export { levenshtein } from './levenshtein';
export { countWordsCambridge, containsKeyword } from './kwt';
export {
  checkItem,
  matchText,
  answerText,
  acceptedAnswersOf,
  FUNCTION_WORDS,
  type CheckResult,
  type CheckOptions,
  type Verdict,
  type ItemResponse,
  type ErrorResponse,
} from './check';
