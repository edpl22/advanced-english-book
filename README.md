# Advanced English — a textbook on the web

**Tutorial em português: [TUTORIAL.md](TUTORIAL.md)** — como instalar, rodar, testar e publicar o site.

Grammar, vocabulary and exam practice for Brazilian learners (B2–C2): The Book, Practice Tests, TOEFL Simulator (2026 format), Lexicon, Old & Middle English and My Progress.

```
npm install
npm run dev          # http://localhost:5173
npm test             # Vitest: checking engine, generators, content QA, sampler, TOEFL
npm run build        # production build with offline service worker
npm run bank:stats   # items by topic/level/type/exam + coverage gaps per phase
npm run bank:validate
npm run bank:balance # add --fix to redistribute MCQ answers A–D in bank batches
```

Content lives in `/content` (units, bank batches `/content/bank/<topic>/<batch>.json`, reading texts, phrasal dictionary, lexicon, medieval, TOEFL with `toefl.config.ts`). Code lives in `/src` (`lib/checking`, `lib/generators`, `features/*`).

Fonts: EB Garamond (bundled). For Junicode in the medieval pages, add Junicode as a local font or `@font-face` — the CSS stack already falls back to EB Garamond, which covers þ ð æ ƿ ȝ.
