# Facilitator Field Guide

This guide is the day-of path through the "Fixing Vertec with AI" workshop. It
connects the Reveal deck, live-system audit, markdown exercises, local
prototypes, and subagent workflow into one teachable story.

The point is not that Vertec is uniquely terrible. The point is that many
enterprise systems quietly make people act as translators between policy,
memory, approval, billing, HR, and a grid of tiny fields. That is exactly the
kind of work AI can help make visible before anyone starts automating it.

## Audience Promise

For AI sceptics:

- You will not be asked to trust a magic demo.
- Every artifact is inspectable: markdown, HTML, userscripts, tests, and mock
  payloads.
- The first useful AI interaction is critique and clarification, not control.
- The more capable the automation becomes, the more explicit the boundary,
  verification, and approval step becomes.

For technical participants:

- Do not rush to the final MCP/API idea.
- The craft is in making each rung of the ladder easier to reason about than the
  one after it.
- Keep the phrase "not smart, just humane" in your head while building.

## Running Order

| Time | Segment | What happens | Artifact |
| ---: | --- | --- | --- |
| 0-5 min | Opening | Name the tiny enterprise ritual without sneering at the people doing it. | Reveal opening |
| 5-12 min | Fieldwork | Observe the workflow: what does the human remember, translate, reassure, or double-check? | [Empathy map](../audit/vertec-empathy-map.md) |
| 12-22 min | Evidence | Show the structural audit: custom div UI, weak semantics, hidden context. | [Live audit](../audit/live-vertec-structural-audit.md) |
| 22-35 min | ChatGPT only | Paste a sanitized DOM slice and ask for critique, assumptions, and a first requirement. | [00 workshop](../workshops/00-chatgpt-dom-workflow.md) |
| 35-45 min | Codex annotate | Point at the awkward UI/DOM and turn "this is bad" into a small fix. | Deck annotate slide |
| 45-75 min | Prototype ladder | Walk V1 to V8. Stop after each rung to ask what got better and what got riskier. | Local demos |
| 75-85 min | Subagents | Explain the manager role: delegate narrow artifacts, review everything, keep judgement human. | [Subagent guide](subagents.md) |
| 85-95 min | Superapp discussion | Discuss Codex signed into tools as a workbench, not a blank cheque. | Discussion prompts below |
| 95-100 min | Close | "Make the work visible. Then make the improvement boring." | Reveal closing |

## The First Move: Fieldwork

Do not call this a warm-up. Treat it like product anthropology.

Ask:

- What is the person trying to finish before they can leave the task?
- What facts live in the tool, in policy, in memory, or in Slack folklore?
- What would make the next correct action obvious?
- What should AI never infer?
- What would a sceptical approver need to see before trusting the result?

Useful line:

```text
The enemy is not time recording. The enemy is making the human act as the integration layer.
```

Things adjacent observers often miss:

- Comments are not just text. They are sometimes local approval policy.
- Absences and public holidays are not side quests. They change whether a day
  should be filled at all.
- A timesheet is not only a personal productivity task. It touches billing,
  fairness, planning, compliance, and trust.
- "Fill all weekdays" is not safe unless the system knows which weekdays are
  actually workdays for this person.
- The UI problem and the agent problem are related: weak semantics make the page
  harder for humans, screen readers, browser automation, and AI agents.

## Tool Interaction Path

### 1. ChatGPT Without Codex

Goal: turn irritation into a requirement.

Use a sanitized DOM slice, not a live page dump. The exercise follows
[00 - ChatGPT and pasted DOM](../workshops/00-chatgpt-dom-workflow.md).

Suggested prompt:

```text
I am reviewing a small piece of web UI for an internal workshop.
The snippet below is sanitized. It contains no real names, client data, URLs,
tokens, or hidden values.

Please critique the interaction from the perspective of:
1. a tired human trying to finish a repetitive admin task,
2. a keyboard or assistive-technology user,
3. a browser automation script that needs reliable selectors.

Separate evidence from guesses. Then propose the smallest userscript-friendly
improvement that keeps the human in control and does not submit anything.
```

Why this works educationally:

- It starts with observation, not implementation.
- It lets non-technical people participate because the output is a critique and
  a requirement.
- It keeps the data boundary visible.
- It teaches that AI is useful when it helps us ask a sharper question.

References used for this exercise:

- [OpenAI: Working with files in ChatGPT](https://openai.com/academy/working-with-files/)
- [OpenAI Help: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [OpenAI Help: ChatGPT Atlas data controls and privacy](https://help.openai.com/en/articles/12574142-chatgpt-atlas-data-controls-and-privacy)
- [Chrome DevTools: viewing and changing the DOM](https://developer.chrome.com/docs/devtools/dom/)

### 2. Codex With Annotate

Goal: turn a critique into a bounded, reviewable change.

The useful instruction is not "fix Vertec." It is closer to:

```text
This row forces the user to remember the normal project, hours, and comment.
Build the smallest helper that prepares a draft for the selected row only.
Do not save, submit, call an API, or use live data.
Add a local fixture and tests so participants can inspect the behaviour.
```

What to annotate:

- The row or panel where memory work happens.
- Missing context such as absences, public holidays, vacation balance, or comment
  policy.
- Semantics that are missing or brittle.
- Any place where "AI could just click it" would become risky.

### 3. Prototype Ladder

| Version | Participant action | Local artifact | Main pro | Main con | Subagent manager pattern |
| --- | --- | --- | --- | --- | --- |
| V1 | Fill one selected synthetic row. | `/prototypes/runner.html?demo=v1` | Immediate relief, easy to delete. | Brittle DOM selectors. | Meitner builds, Avicenna reviews wording. |
| V2 | Apply local templates and required comments. | `/prototypes/runner.html?demo=v2` | Makes tribal knowledge explicit. | Can encode the wrong habit. | Avicenna drafts prompts, Epicurus checks risk. |
| V3 | Review missing days, vacation balance, UK public holidays. | `/prototypes/runner.html?demo=v3` | Connects services and absences. | Policy still needs humans. | Avicenna shapes UI, Epicurus reviews privacy. |
| V4 | Prove behaviour in Vite, Vitest, and Playwright. | `/prototypes/runner.html?demo=v4` and `npm run check` | Makes demos reproducible. | Mock data can drift. | Meitner owns tests, Epicurus reviews fixture safety. |
| V5 | Compile userscript shape into extension shape. | `/prototypes/runner.html?demo=v5` and `npm run build:extension` | Permissions become inspectable. | Deployment/governance overhead. | Epicurus owns permissions, Meitner checks package output. |
| V6 | Build a mock direct API dry run. | `/prototypes/runner.html?demo=v6` | Robust path if policy allows. | Needs real access controls and audit. | Epicurus owns API contract, Meitner tests dry run. |
| V8 | Show MCP-shaped chat automation with confirmation. | `/prototypes/runner.html?demo=v8` | Turns chat into scoped tools. | Bad boundaries scale risk. | Epicurus owns tool boundary, Avicenna reviews human wording. |

The missing V7 is intentional in the talk: leave a gap for the audience to name.
Good candidates are approvals, observability, or a real stakeholder pilot. It is
a small joke with a useful lesson: roadmaps skip numbers when reality gets a
vote.

## Superapp Discussion

Use this as a discussion prompt near the end:

```text
Is Codex signed into everything the future?
```

Better answer:

```text
Maybe, but only if "signed in" means scoped tools, narrow permissions, readable
logs, human approval for consequences, and boring evidence.
```

Examples to contrast:

| Request | Safer version | Why |
| --- | --- | --- |
| "Fill my timesheet from here." | "Prepare a draft from synthetic or approved sources; show the diff; wait for confirmation." | Prevents hidden writes. |
| "Check my commit messages and tell me what I did today." | "Read local Git history for today and draft a timesheet comment for review." | Read-only inputs, useful output. |
| "Handle all my admin." | "List candidate admin tasks, classify read/draft/write risk, and ask which one to inspect." | Avoids vague authority. |
| "Use my calendar, email, Git, and Vertec." | "Use only the approved connector for this task; cite every source used; do not cross personal/client data boundaries." | Keeps provenance visible. |

The future is not one giant assistant doing unbounded work. The useful future is
a workbench where tools can coordinate, but responsibility is explicit.

## Privacy Rules For The Live Vertec Tab

- Use live Vertec only for structural observation unless explicit approval exists
  for more.
- Do not copy row values, client names, people, rates, comments, screenshots, or
  internal URLs into workshop artifacts.
- Prefer synthetic fixtures for demos, tests, screenshots, and public repo files.
- V3 may fetch public GOV.UK bank-holiday JSON. It sends no Vertec fixture data
  and falls back to a local list.
- If a future prototype needs real integration, write the policy and audit trail
  before writing the integration.

## Run And Verify

```sh
npm install
npm run dev
npm run check
npm run build:extension
```

Useful local URLs:

- Deck: `http://127.0.0.1:5173/`
- Prototype studio: `http://127.0.0.1:5173/#/prototype-studio`
- V1: `http://127.0.0.1:5173/prototypes/runner.html?demo=v1`
- V2: `http://127.0.0.1:5173/prototypes/runner.html?demo=v2`
- V3: `http://127.0.0.1:5173/prototypes/runner.html?demo=v3`
- V4: `http://127.0.0.1:5173/prototypes/runner.html?demo=v4`
- V5: `http://127.0.0.1:5173/prototypes/runner.html?demo=v5`
- V6: `http://127.0.0.1:5173/prototypes/runner.html?demo=v6`
- V8: `http://127.0.0.1:5173/prototypes/runner.html?demo=v8`

## Completion Checklist

- [ ] The opening makes fun of the ritual, not the people.
- [ ] The first AI step uses sanitized evidence and asks for critique.
- [ ] Every workshop markdown file has a goal, prompt path, safety notes, pros
      and cons, and reproducibility checklist.
- [ ] Every runnable demo uses synthetic Vertec data only.
- [ ] Any claim about browser agents, ChatGPT, Atlas, or data controls has a
      source link.
- [ ] Subagent work is framed as managed delegation, not autonomous truth.
- [ ] The superapp discussion includes examples that are read-only, draft-only,
      approval-required, and blocked.
- [ ] The close returns to human judgement and inspectable evidence.
