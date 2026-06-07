# AGENTS.md: Fixing Vertec With AI

Working notes for any agent (Codex, Claude, subagents) editing this repo.

## What this is

A Zühlke Camp talk + workshop pack: a Reveal.js deck (`index.html`), a runnable
local Vertec "workshop copy" fixture, iterative prototypes under
`public/prototypes/`, and participant handouts under `docs/`. Vertec is the
villain. The audience includes AI sceptics and non-technical colleagues.

## Use the real workflow

This is an internal workshop about approved tools and our own timesheets. Use
real Vertec rows, screenshots, and DOM when they help the story. The local
workshop copy exists so the demos are repeatable.

Do not add warning labels or fake placeholders. Keep the small amount of
judgement that matters: production writes need a deliberate human click, and
technical facts stay accurate.

## Voice

Dry, concise, keynote style (think Frontend Masters) with the warmth of "How to
Win Friends and Influence People". Subtly sarcastic. Do not pretend Vertec is
redeemable; it isn't, and that's the joke. Tell it as a real story: the personal
journey (JPDB userscripts, ChatGPT Automator, UserScript-Compiler, Yomu) and the
repeated "can we do better?" question are the spine. "Make no mistakes" is an
intentional running gag; keep it. Prefer real screenshots/assets already in
`public/assets/` over invented ones; never fabricate a screenshot.

Ground everything in reality: how people actually work and actually prompt. No
ceremony, no rubrics, no idealized workshop scaffolding. The repo is a takeaway,
not a lecture.

### Humanizer checklist (apply to every slide and doc)

From the "Signs of AI writing" guide. The prose must pass all of this:

- No em dashes or en dashes. Use a period, comma, colon, or parentheses.
- No "it's not X, it's Y" or "not only ... but" negative parallelism.
- No rule-of-three padding ("innovation, inspiration, and insights").
- Prefer "is/are/has" over copula avoidance ("serves as", "boasts", "represents").
- No boldface-header bullet lists, no emojis, no curly quotes, no Title Case headings.
- No significance inflation ("marks a pivotal moment", "stands as a testament").
- No filler ("in order to", "it is important to note") or signposting ("let's dive in").
- Vary sentence length. Keep concrete, specific detail. Sound like a person talking.

## Don't break

- `npm run check` must stay green (Vitest, extension build, Vite build,
  Playwright e2e).
- The v6/v8 dry-run scripts and `vertec-helper.test.ts` assert on specific
  strings. Change prose freely; don't quietly break asserted output.
