# AGENTS.md — Fixing Vertec With AI

Working notes for any agent (Codex, Claude, subagents) editing this repo.

## What this is

A Zühlke Camp talk + workshop pack: a Reveal.js deck (`index.html`), a runnable
local Vertec "workshop copy" fixture, iterative prototypes under
`public/prototypes/`, and participant handouts under `docs/`. Vertec is the
villain. The audience includes AI sceptics and non-technical colleagues.

## Don't be paranoid

The earlier drafts were wrapped in redaction theatre — "sanitize everything",
long "do not paste" lists, hosts swapped to `example.invalid`, privacy notes on
every page. Cut it out. It made the workshop read like a compliance module.

These are **Zühlke-approved tools**, used by Zühlke people, on their **own**
timesheets. Treat them that way:

- A real Vertec row, a real screenshot, or a real DOM slice pasted into ChatGPT,
  Claude, or Codex is **fine**. Say so plainly. Don't tell participants to bracket
  out `[PROJECT]` or scrub every value before they're allowed to think.
- Drop the "sanitized", "redacted", "swap the host", and bulleted prohibition
  lists. Don't add new ones.
- Don't manufacture fear. No "this is how a demo grows teeth", no privacy
  disclaimers stapled to ordinary engineering steps.

Keep the small amount of judgement that's actually real, stated lightly, once:

- Obvious common sense still applies to genuinely sensitive **client / HR /
  contract** data and to anything that writes to **production** without a
  heads-up. One calm sentence, not a warning label on every slide.
- Accurate technical facts stay accurate. "Cookie-replay is a fragile auth model"
  is an *engineering* observation (cookies expire, it isn't a supported path),
  not a secrecy rule — keep the truth, drop the dread.

If you're unsure whether something is a real risk or just nervous framing, assume
it's nervous framing and relax it.

## Voice

Dry, concise, keynote-style (think Frontend Masters), subtly sarcastic. Don't
pretend Vertec is redeemable — it isn't, and that's the joke. Avoid limp AI
filler ("not smart, just humane", "not X, but Y"). "Make no mistakes" is an
intentional running gag; keep it. Prefer real screenshots/assets already in
`public/assets/` over invented ones — never fabricate a screenshot.

## Don't break

- `npm run check` must stay green (Vitest, extension build, Vite build,
  Playwright e2e).
- The v6/v8 dry-run scripts and `vertec-helper.test.ts` assert on specific
  strings. Change prose freely; don't quietly break asserted output.
