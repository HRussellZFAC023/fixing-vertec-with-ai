# Fixing Vertec With AI

This repo is a shareable workshop kit for a Zühlke Camp session about improving
painful enterprise workflows with AI-assisted engineering. The front page is a
one-hour Reveal.js web deck styled from the provided Zühlke PowerPoint template
and assets.

The running example is the real Vertec Services workflow, informed by a live
structural audit and real workshop screenshots. The hands-on demos use a local
workshop copy so participants can repeat the steps without writing to production
or publishing sensitive rows.

## What is included

- A Reveal.js web deck that brings the workshop steps together.
- Redacted real Vertec screenshots and workflow evidence from the source camp
  deck.
- A sanitized live V1 smoke check showing the helper mounted against the real
  signed-in Services grid.
- A sanitized network/auth note showing the webapp uses `/uisync` and that
  Vertec's own app session can still block automation at login.
- Speaker notes for a 60-minute delivery.
- A local Vertec Services workshop copy for safe local demos.
- Runnable local prototypes for v1, v2, v3, v4, v5, v6, and v8.
- v4 verification and v5 packaging via local commands.
- Markdown mini-workshops for the progressive versions of the flow.
- Vitest and Playwright checks so the demos stay reproducible.

## Run it locally

```sh
npm install
npm run dev
```

Open the local URL printed by Vite, usually <http://127.0.0.1:5173>.

Use arrow keys to move through the deck. The v1 demo is embedded as a slide.

Direct prototype links:

- <http://127.0.0.1:5173/prototypes/runner.html?demo=v1>
- <http://127.0.0.1:5173/prototypes/runner.html?demo=v2>
- <http://127.0.0.1:5173/prototypes/runner.html?demo=v3>
- <http://127.0.0.1:5173/prototypes/runner.html?demo=v4>
- <http://127.0.0.1:5173/prototypes/runner.html?demo=v5>
- <http://127.0.0.1:5173/prototypes/runner.html?demo=v6>
- <http://127.0.0.1:5173/prototypes/runner.html?demo=v8>

Build the local extension demo:

```sh
npm run build:extension
```

## Verify it

```sh
npm run check
```

## Workshop trail

- [00 - ChatGPT and pasted DOM](docs/workshops/00-chatgpt-dom-workflow.md)
- [01 - Basic userscript](docs/workshops/01-basic-userscript.md)
- [02 - Templates](docs/workshops/02-templates.md)
- [03 - UI overhaul and holidays](docs/workshops/03-ui-overhaul-holidays.md)
- [04 - Harness, Vite, and e2e tests](docs/workshops/04-harness-vite-e2e.md)
- [05 - Userscript to extension](docs/workshops/05-userscript-to-extension.md)
- [06 - Direct API calls](docs/workshops/06-direct-api.md)
- [08 - MCP server and automation](docs/workshops/08-mcp-automation.md)
- [Facilitator field guide](docs/facilitation/facilitator-field-guide.md)
- [Speaker notes](docs/speaker-notes.md)
- [Subagent facilitation guide](docs/facilitation/subagents.md)
- [Talk structure notes](docs/talk-structure.md)
- [Presentation best-practice sources](docs/research/presentation-best-practices.md)
- [Talk pattern sources](docs/research/talk-pattern-sources.md)
- [Live Vertec structural audit](docs/audit/live-vertec-structural-audit.md)

## Privacy rule

When working with a real enterprise system, use AI to discuss structure,
friction, and interaction patterns. Do not paste live client data, personal
details, rates, comments, timesheet rows, credentials, or internal URLs into any
AI tool unless the organisation has explicitly approved that data path. Never
commit them to a public repo.
