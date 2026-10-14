export interface TMcq {
  q: string;
  options: string[];
  answer: number;
  explanation?: string;
}

export interface Line {
  speaker: string;
  text: string;
}

export interface CtwPassage {
  id: string;
  /** Full text; the first sentence stays intact, later words are clipped automatically. */
  text: string;
}

export interface DailyText {
  id: string;
  kind: 'notice' | 'email' | 'menu' | 'schedule' | 'advert' | 'message';
  title: string;
  body: string;
  questions: TMcq[];
}

export interface AcademicPassage {
  id: string;
  title: string;
  text: string;
  questions: TMcq[];
}

export interface ChooseResponse {
  id: string;
  speaker: string;
  line: string;
  options: string[];
  answer: number;
}

export interface Listening {
  id: string;
  kind: 'conversation' | 'announcement' | 'talk';
  title: string;
  lines: Line[];
  questions: TMcq[];
}

export interface ReadingModule {
  ctw: CtwPassage[];
  daily: DailyText[];
  academic: AcademicPassage[];
}

export interface ListeningModule {
  choose: ChooseResponse[];
  audio: Listening[];
}

export interface EmailTask {
  id: string;
  situation: string;
  bullets: string[];
  model: string;
}

export interface DiscussionTask {
  id: string;
  professor: string;
  prompt: string;
  posts: Array<{ name: string; text: string }>;
  model: string;
}

export interface SpeakingTasks {
  repeatContext: string;
  repeat: string[];
  interviewContext: string;
  interview: Array<{ q: string; model: string }>;
}

export interface ToeflTest {
  id: string;
  title: string;
  reading: { m1: ReadingModule; easy: ReadingModule; hard: ReadingModule };
  listening: { m1: ListeningModule; easy: ListeningModule; hard: ListeningModule };
  writing: { buildSentenceIds: string[]; email: EmailTask; discussion: DiscussionTask };
  speaking: SpeakingTasks;
}

/** Build a Sentence item (imported from the Build a Sentence bank). */
export interface BuildSentenceItem {
  id: string;
  context: string;
  chunks: string[];
  distractor: string | null;
  acceptedAnswers: string[][];
  topic: string;
  difficulty: 'easy' | 'medium' | 'hard';
  explanation: string;
  punctuation?: '.' | '?';
}
