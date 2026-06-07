# Facilitator Field Guide

This is the day-of path for "Fixing Vertec with AI". It ties the deck, the live
structural audit, the workshop handouts, the local prototypes, and the subagent
discussion into one line you can teach.

The claim is narrow. Vertec makes skilled people act as the integration layer
between policy, memory, billing, absences, approvals, and a grid of fields.
Useful AI work starts by making that hidden work inspectable. In CDM terms, you
make the artefact flow and the feedback loops visible before you add any
capability. After that, very slowly, the tool earns the right to automate
anything.

Vertec is the villain. The participants are not. Keep that distinction clean.

## Audience promise

For sceptics:

- No magic demo you can't open up and look inside.
- Every artifact can be opened: Markdown, fixture HTML, userscript, tests, mock
  payload, extension manifest.
- The first thing they do is critique from real evidence. Nobody hands work to
  a model yet.
- The more capable the workflow gets, the narrower the tool boundary becomes.

For technical participants:

- Do not jump to API/MCP first. That skips the part where the human work becomes
  legible.
- Prefer small, reviewable changes over impressive nonsense.
- If a teammate cannot read it, run it, and delete it, it is too early for a
  workshop lab.

## Running order

| Time | Segment | What Happens | Artifact |
| ---: | --- | --- | --- |
| 0-5 min | Opening | Name the enterprise ritual without mocking the person stuck doing it. | Reveal opening |
| 5-15 min | Fieldwork | Observe what the human remembers, checks, translates, or worries about. | [Empathy map](../audit/vertec-empathy-map.md) |
| 15-25 min | Evidence and CDM lens | Show structural audit, then map it to artefact flow and feedback loops. | [Live audit](../audit/live-vertec-structural-audit.md) |
| 25-35 min | DOM to requirement | Use a real DOM slice to produce a bounded userscript requirement. | [00 workshop](../workshops/00-chatgpt-dom-workflow.md) |
| 35-50 min | Feature rungs | Walk from userscript to MCP. Ask after each rung: whose work got easier, and what proof boundary changed? | Local demos |
| 50-56 min | Subagents | Discuss managed delegation, Codex as workbench, confirmations, and logs. | [Subagent guide](subagents.md) |
| 56-60 min | Close | Return to judgement, evidence, and narrow tools. | Reveal closing |

## First move: fieldwork

Treat the opening audit like product fieldwork rather than a warm-up. You are
aiming at the workflow, not the person coping with it.

Ask:

- Which task is the user trying to finish?
- Which facts live in Vertec, policy, memory, calendar, Git, or Slack folklore?
- Which fields are Services fields: Project, Phase, Service type, Text, Hours?
- Which adjacent context changes the answer: absences, public holidays, working
  hours, approvals?
- What should AI never infer?
- What evidence would a sceptical approver need?

Useful line:

```text
The enemy is not time recording. The enemy is making the human act as the integration layer.
```

Things observers miss:

- Service Text is often policy doing the work of prose.
- "Fill 8 hours" is incomplete until you add holidays, absences, half-days,
  project switches, and the approval that someone expects to see.
- A timesheet touches billing, planning, fairness, and trust. Tiny fields, large
  blast radius. Very enterprise.
- Weak semantics hurt humans, keyboard users, browser automation, and agents.

## CDM lens

Keep this practical. Cybernetic Delivery does not replace Scrum, roll out a tool,
or run a grand AI campaign. For this session it gives you a way to ask better
delivery questions:

- What artefacts are flowing through the system: screenshot, DOM slice, network
  trace, prompt, script, test, workshop note?
- Where is feedback slow, hidden, or dependent on folklore?
- Which small pattern can reduce friction without moving the write boundary too
  early?
- What evidence proves the pattern helped?
- What should feed back into shared tools, templates, prompts, or governance?

Translated to Vertec:

```text
Observe the grid -> capture evidence -> build one rung -> measure the wall -> turn the lesson into a pattern.
```

The running joke is that Vertec makes the loop visible by resisting every lazy
shortcut. Annoying, yes. Pedagogically generous, unfortunately also yes.

## Tool path

### 1. ChatGPT Without Codex

Goal: turn one observed pain into a requirement.

Use [00 - DOM Evidence To A Userscript Requirement](../workshops/00-chatgpt-dom-workflow.md).

Prompt:

```text
I am reviewing a Vertec Services row.

Make no mistakes.

Critique the interaction from the perspective of:
1. a tired human preparing Services entries,
2. a keyboard or assistive-technology user,
3. a userscript that needs reliable selectors.

Separate DOM evidence from guesses. Then propose the smallest userscript-friendly
improvement. It must not submit, save, or call APIs. Scope it to the Vertec webapp
page https://vertec.zuehlke.com/webapp/*.
```

Inspect with participants:

- Selector candidates: `[data-vt-row]`, `[data-vt-timesheet]`,
  `[name="project"]`, `[name="phase"]`, `[name="serviceType"]`,
  `[name="text"]`, `[name="hours"]`, and `[data-vt-service-field]`.
- Whether the implementation needs `MutationObserver` for dynamic redraws.
- Tampermonkey metadata: `@match`, `@grant`, `@run-at` if needed.

References:

- [Chrome DevTools: view and change the DOM](https://developer.chrome.com/docs/devtools/dom/)
- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php)

### 2. Codex with annotate

Goal: turn the requirement into a bounded change.

Good instruction:

```text
Build the smallest helper for the local Vertec Services workshop copy.
It should fill only the selected Services row with Project, Phase, Service type,
Text, and Hours.
Do not save, submit, or call APIs.
Add a local fixture and tests so participants can inspect the behavior.

Then adapt it to the live Vertec page in observation-first mode. If Project,
Phase, or Service type turn out to be object references rather than plain text,
say that clearly instead of pretending the row was filled.
```

What to annotate:

- The Services row where memory work happens.
- Missing context: absences, holidays, vacation balance, approval text.
- Brittle selectors and weak semantics.
- Any place where "the agent can just click it" becomes a consequence-bearing
  write.

### 3. Feature rungs

| Version | Participant Action | Inspect | Main Point | Main Risk |
| --- | --- | --- | --- | --- |
| V1 | Fill one selected Services row in the fixture; detect the live grid and expose the object-field wall. | `public/prototypes/v1/vertec-helper.user.js` | Immediate local relief plus real evidence. | Brittle selectors and false success. |
| V2 | Apply a local Project/Phase/Service type/Text/Hours template. | `public/prototypes/v2/templates-helper.user.js` | Makes defaults reviewable. | Encodes bad habits. |
| V3 | Review missing Services, planned absences, vacation balance, and UK public holidays. | `public/prototypes/v3/holiday-review.user.js` | Services need context. | Policy still needs humans. |
| V4 | Prove behavior with Vite, Vitest, and Playwright. | `src/prototypes/v1/vertec-helper.test.ts`, `tests/e2e/site.spec.ts` | Evidence beats chat confidence. | Fixtures drift. |
| V5 | Package userscript shape into extension shape. | `dist-extension/vertec-helper/manifest.json` | Permissions become inspectable. | Deployment/governance. |
| V6 | Build a mock direct API dry run. | `public/prototypes/v6/direct-api-dry-run.user.js` | Contract, validation, audit. | Real writes require real controls. |
| V8 | Show MCP-shaped automation with confirmation. | `public/prototypes/v8/mcp-dry-run.user.js` | Tool boundaries and blocked apply. | Bad boundaries scale. |

The missing V7 is intentional. Ask the room what belongs there: approvals,
observability, policy review, a stakeholder pilot. Roadmaps skip numbers when
reality files a ticket.

Live Vertec finding to mention:

- The Services grid is a custom Vertec/Qooxdoo-style div table. It is not a
  normal HTML form.
- The Absences tab is another custom grid with Date, until date, Type, Absence
  group, Description, and Hours. It mixes public holidays and booked absence
  rows, so the helper needs context before drafting Services.
- Text and Hours can be edited by driving the visible grid editor.
- Project, Phase, and Service type are object-reference cells. A model can type
  the visible label and still fail to create a valid Vertec object reference.
- The HAR captured `boot/index.js` and `/uisync` SignalR/WebSocket traffic. There
  was no neat REST write request to grab. A read-only probe of the documented
  REST base path returned `404` on this tenant.
- A later temporary-edit capture landed on Vertec's own login page instead of the
  Services grid. So MCP has to check session and capabilities before it reads or
  drafts, and copied browser cookies are not a supportable auth model.
- That is the running joke and the lesson. "Make no mistakes" is not enough when
  the system hides the structure.

## Run and verify

For live demos:

```sh
npm install
npm run dev
```

Useful URLs:

- Deck: `http://127.0.0.1:5173/`
- Prototype studio: `http://127.0.0.1:5173/#/prototype-studio`
- V1: `http://127.0.0.1:5173/prototypes/runner.html?demo=v1`
- V2: `http://127.0.0.1:5173/prototypes/runner.html?demo=v2`
- V3: `http://127.0.0.1:5173/prototypes/runner.html?demo=v3`
- V4: `http://127.0.0.1:5173/prototypes/runner.html?demo=v4`
- V5: `http://127.0.0.1:5173/prototypes/runner.html?demo=v5`
- V6: `http://127.0.0.1:5173/prototypes/runner.html?demo=v6`
- V8: `http://127.0.0.1:5173/prototypes/runner.html?demo=v8`

For focused proof:

```sh
npm run test
npm run lab:api
npm run lab:mcp
```

For full local proof, when time allows:

```sh
npm run check
npm run build:extension
```

`npm run check` already includes the extension build and the e2e run. The separate
extension command is handy when the lab is focused on packaging.

## Superapp discussion

Prompt:

```text
Is Codex signed into everything the future?
```

Better answer:

```text
Only if "signed in" means scoped tools, narrow permissions, readable logs,
human approval for consequences, and evidence a colleague can inspect.
```

Use this contrast:

| Request | Safer Version | Why |
| --- | --- | --- |
| "Fill my timesheet." | "Prepare a draft from approved sources; show the diff; wait for confirmation." | Prevents hidden writes. |
| "Read my commits and tell me what I did." | "Read local Git history for today and draft service Text for review." | Read-only input, draft output. |
| "Use calendar, email, Git, and Vertec." | "Use only the approved connector for this task; cite each source; do not cross personal/client boundaries." | Keeps provenance visible. |
| "Automate all admin." | "List candidate tasks and classify read/draft/write/blocked before choosing one." | Refuses vague authority. |

The useful future is a workbench, not one giant assistant with a master key and a
motivational poster.

## Working with the live Vertec tab

These are Zühlke tools on your own timesheet. Pasting a real Services row, a
screenshot, or a DOM slice into ChatGPT, Claude, or Codex is fine, and so is
experimenting with your own current-month timesheet.

- Use local workshop copies for demos, tests, and committed repo files so the
  prototypes stay reproducible.
- The V3 public GOV.UK bank-holiday fetch sends no Vertec fixture data and has a
  local fallback.
- Anything that writes to production Vertec, or touches client / HR / contract
  data, deserves a heads-up and real controls before code runs.

## Completion checklist

- [ ] The opening makes fun of the ritual, not the participants.
- [ ] Lab 1 uses Services rows: Project, Phase, Service type, Text, Hours.
- [ ] No lab describes attendance `From`/`To` punch-in fields as the main path.
- [ ] Userscript scope mentions `https://vertec.zuehlke.com/webapp/*`.
- [ ] DOM inspection, selectors, metadata, and dynamic redraws are explicit.
- [ ] Vite, Vitest, Playwright, extension packaging, API dry run, and MCP dry run
      each have an inspectable artifact.
- [ ] No lab writes to production Vertec without a heads-up.
- [ ] The close returns to judgement, evidence, and narrow tools.

## Links to have ready

- [Chrome DevTools: view and change the DOM](https://developer.chrome.com/docs/devtools/dom/)
- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php)
- [Vite guide](https://vite.dev/guide/)
- [Vitest guide](https://vitest.dev/guide/)
- [Playwright getting started](https://playwright.dev/docs/intro)
- [Chrome Extensions: get started](https://developer.chrome.com/docs/extensions/get-started)
- [Vertec REST API](https://www.vertec.com/en-gb/kb/vertec-rest-api/)
- [Model Context Protocol introduction](https://modelcontextprotocol.io/docs/getting-started/intro)
