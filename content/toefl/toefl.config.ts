/**
 * Structure of the TOEFL iBT as revised by ETS from January 2026, as
 * understood when this simulator was built. Durations and item counts are
 * kept here so they can be adjusted when ETS publishes changes — nothing
 * else in the code hard-codes them. Check ets.org for the current format.
 */

export const TOEFL_CONFIG = {
  formatLabel: 'TOEFL iBT — format introduced in January 2026 (approximate timings)',
  /** Score scale reported by ETS for the new format. */
  bandMin: 1,
  bandMax: 6,
  bandStep: 0.5,
  /** Module 1 accuracy needed to be routed to the harder Module 2. */
  routingThreshold: 0.6,
  /** Navigation: the real test does not let you return to earlier questions. */
  allowBack: false,
  sections: {
    reading: {
      title: 'Reading',
      minutes: 27,
      adaptive: true,
      tasks: {
        completeTheWords: { title: 'Complete the Words', blanksPerPassage: 10 },
        dailyLife: { title: 'Read in Daily Life' },
        academic: { title: 'Read an Academic Passage' },
      },
    },
    listening: {
      title: 'Listening',
      minutes: 27,
      adaptive: true,
      /** Audio is played once, as in the real test. */
      playsAllowed: 1,
      tasks: {
        chooseResponse: { title: 'Listen and Choose a Response' },
        conversation: { title: 'Listen to a Conversation' },
        announcement: { title: 'Listen to an Announcement' },
        academicTalk: { title: 'Listen to an Academic Talk' },
      },
    },
    writing: {
      title: 'Writing',
      minutes: 23,
      adaptive: false,
      tasks: {
        buildSentence: { title: 'Build a Sentence', count: 10, minutes: 6 },
        email: { title: 'Write an Email', minutes: 7, targetWords: 120 },
        discussion: { title: 'Write for an Academic Discussion', minutes: 10, targetWords: 100 },
      },
    },
    speaking: {
      title: 'Speaking',
      minutes: 8,
      adaptive: false,
      tasks: {
        listenRepeat: { title: 'Listen and Repeat', count: 7, responseSeconds: 12 },
        interview: { title: 'Take an Interview', count: 4, responseSeconds: 45 },
      },
    },
  },
  /** CEFR alignment of the 1–6 bands. */
  cefr: [
    { min: 6, level: 'C2' },
    { min: 5, level: 'C1' },
    { min: 4, level: 'B2' },
    { min: 3, level: 'B1' },
    { min: 2, level: 'A2' },
    { min: 1, level: 'A1' },
  ],
  rubric: ['Task fulfilled: I answered every part of the prompt', 'Organisation: clear structure and linking', 'Grammatical range and accuracy', 'Vocabulary: precise and varied', 'Few errors that affect understanding'],
} as const;

export type SectionKey = keyof typeof TOEFL_CONFIG.sections;
export const SECTION_ORDER: SectionKey[] = ['reading', 'listening', 'writing', 'speaking'];
