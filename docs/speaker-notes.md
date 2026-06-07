# Speaker notes: fixing Vertec with AI

Target duration: 60 minutes.

Audience: AI sceptics, non-technical colleagues, and technical people who want a
practical way into agentic engineering without pretending a browser agent is a
strategy.

## Run of show

| Time | Segment | Slides |
| ---: | --- | --- |
| 0-6 min | Opening and shared pain | 1-4 |
| 6-16 min | Why the workflow matters | 5-10 |
| 16-23 min | AI and Cybernetic Delivery framing | 11-14 |
| 23-34 min | Browser agents, Atlas, and the first real wall | 15-19 |
| 34-44 min | Personal path, ChatGPT-only DOM work, Codex Annotate, V1 | 20-24 |
| 44-52 min | From script to harness, compiler, features, API, MCP | 25-34 |
| 52-58 min | Consultancy, agentic engineering, AI-output checks, stopping | 35-40 |
| 58-60 min | Repo, sources, close | 41-43 |

## Presenter setup

- Open the deck at the local Vite URL, usually `http://127.0.0.1:5173/`.
- Open speaker notes with `s` in Reveal if presenting from the browser.
- Keep real Vertec open for short inspection only. Do not live-save anything.
- Keep `/#/demo-v1` ready. The embedded demo uses the local workshop copy, so the room can repeat it without writing to production.
- Keep the mini-workshop docs ready from the final "Yours to keep" slide.

## Slide notes

### 1. Fixing Vertec with AI - 2 min

Open with the rough-deck joke: "We love Vertec." Let the room do the rest.

The point is not that timesheets are boring. They are. The point is that we make
clever people act as memory, policy engine, copy-paste machine, and QA for a grid
every week.

Set the promise: this hour starts with Vertec, then turns into a way to fix any
awkward internal tool without handing judgement to the model.

### 2. What you will learn today - 2 min

Use the skeleton's promise: what makes Vertec painful, the business case for
making it better, Cybernetic Delivery as a method we can apply to real tools, and
the tools and habits for the agentic world.

Line: "We are a consultancy. We fix exactly this kind of thing for a living."

### 3. Hands up - 1 min

Ask who has filled in Vertec this week. Describe the room out loud. This is the
first bit of fieldwork.

The useful observation: people do not resent accuracy. They resent paying for
accuracy in tiny manual acts.

### 4. The Vertec interface - 2 min

Let the screenshot sit. Say: "Isn't she beautiful?" Pause. The joke works because
she is not.

Point to the side nav, week controls, attendance fields, services grid, tiny
text, empty space, and sideways scrolling. Do not blame the people who operate
the tool. Blame the workflow shape.

### 5. We lose a quarter of the day to admin - 2 min

Put a number on the pain, then keep it grounded. Time recording feeds billing,
project planning, approvals, fairness, and vacation balance.

The enemy line comes next, so do not make this "admin bad". The record matters.
The friction around the record is the part we can attack.

### 6. The enemy is not time recording - 2 min

Use the core line:

```text
The enemy is not time recording. The enemy is making the human act as the integration layer.
```

Explain the hidden integration layer: policy, holidays, absences, approvals,
the delivery lead's preferred wording, and which grid actually saves.

### 7. The tool does not hold all the rules - 2 min

Show the guidance crop. The key phrase is that the delivery lead decides. That
means the important rule may be outside the UI.

This is the first agent lesson: "fill 8 hours" is incomplete. It omits service
Text, public holidays, absences, half days, and local project policy.

### 8. Vertec does not follow Jakob's law - 3 min

Pick five callouts, not the whole screenshot. Suggested set: no clear page
structure, manual navigation, icon-only controls, not a real table, fill
everything by hand.

Bridge to automation: the same weak handles hurt humans, keyboard users,
scripts, and agents.

### 9. Weak handles make everyone work harder - 2 min

Make accessibility concrete. Labels, focus order, structure, and state are not a
side quest. They are how work becomes legible.

Line: "A new joiner and a browser agent have the same problem on day one.
Neither has the folklore yet."

### 10. Same page, different anxieties - 2 min

Read the personas quickly. Friday backfiller, project switcher, approver, new
joiner. Ask the room which one they are on Friday afternoon.

Keep the empathy sharp: the participants are competent. The workflow is asking
them to compensate for missing product decisions.

### 11. To get our evenings back - 2 min

Give the honest AI motivation. Catch mistakes, do boring repeats, remember what
I did from commits, tickets, calendar, and chat.

Use the token-maxxing line if the room is warm. It lands because it is silly and
also obviously true.

### 12. A feedback system, not a tool rollout - 2 min

Anchor in Cybernetic Delivery. In this room, CDM means: make the work visible,
shorten feedback, measure the system, keep humans accountable for judgement.

Link it back to Zühlke's public CDM story: AI works when it is embedded in real
delivery, measured, and turned into repeatable patterns.

### 13. Follow the artefacts. Then improve the loop - 3 min

Walk the room through artefacts: screenshot, DOM, network trace, prompt, script,
test, speaker note. These are the things moving through the system.

Then walk the CDM cycle: tools, delivery, experiences, patterns, platform,
community. Vertec is small enough to show the whole loop without needing a
three-month transformation programme.

### 14. Can we do better? - 1 min

This is the spine. We ask the question again and again. Each answer moves one
rung up: browser agent, DOM prompt, userscript, packaged extension, harness,
holiday context, API, MCP.

Stress that not everyone needs to climb every rung. Knowing where to get off is
the skill.

### 15. First temptation: just ask the browser - 2 min

Start where a normal person starts. "Fill in my timesheet from now until the end
of the month." No code. No project. No install. It feels like delegation.

Then set up the fall: this works for about ninety seconds before the UI starts
charging interest.

### 16. Watch it grind - 3 min

Use the real browser-agent screenshot. It did many steps, filled the wrong area,
got slower, and eventually hit limits.

Line: "The one job a browser agent is built for, it could barely do. Vertec has
achieved cross-species friction."

### 17. Two agents, same wall - 2 min

Compare Claude in Chrome and ChatGPT Atlas without turning it into a vendor
fight. Atlas is a serious step forward because it brings the agent into the
browser context. It still inherits page confusion.

Use the official caveat: agent mode can act on pages, but needs confirmations,
permissions, and supervision. More convenience creates more boundary work.

### 18. The agent did exactly what we asked - 2 min

Show the bank holiday callback. The punchline:

```text
The agent did what we asked. That was the problem.
```

The missing thing was judgement: public holidays, leave, half days, and project
rules.

### 19. "Make no mistakes" met Vertec's object fields - 3 min

This is the credibility slide. We tried the helper against the signed-in Services
page. Text and Hours could be driven through the visible editor. Project, Phase,
and Service type were object references, not plain strings.

The lesson: a useful helper reports the wall instead of faking success. That is
where API discovery begins.

### 20. Let me show you how I got here - 30 sec

Change tone. Move from audit to personal path. This is not a sudden AI fad. It
is a long-running habit: notice friction, add a tiny layer, then ask if the layer
should be shared.

### 21. "Great, but it could be better" - 2 min

Tell the JPDB and UchiDb story. A good Japanese study site lacked the context
you wanted, so userscripts brought the context into the page.

Transferable idea: do not make the human fetch context. Bring context to the
work.

### 22. Save the page. Ask AI. Get a script - 2 min

This is the ChatGPT-only mini-workshop. Save the page, copy a small DOM slice,
ask ChatGPT to critique it and draft a userscript.

Stress that the value is not the first code answer. The value is turning "this
bit is bad" into a bounded requirement with selectors, scope, and an acceptance
check.

### 23. Annotate the mess before asking for code - 2 min

This is the Codex bridge. Annotate the Services row, object-field wall, absence
context, public holidays, and save boundary. Then ask for the smallest change
plus tests.

Line: "Annotate first. Code second."

### 24. Fill. Next. Fill. Next - 4 min

Show `/#/demo-v1`. Click a row, click Fill, click Next. Keep it deliberately
plain.

Line: "This is a button. Revolutionary. It does one thing, which is why we can
review it without needing a lie down."

Remind the room: the same helper shape was tried on signed-in Vertec, and the
object-reference wall is part of the story.

### 25. A script earns its keep when it comes back tomorrow - 2 min

Explain userscripts in normal language: JavaScript that runs on matching pages.
Tampermonkey, Violentmonkey, or Greasemonkey make the console trick repeatable.

The gap: a console snippet helps me. A packaged thing helps the colleague who
will never paste anything into DevTools, and fair enough.

### 26. I built a compiler, not a single extension - 2 min

Tell the UserScript-Compiler story. Do not package one Vertec script. Build the
generic tool that turns any userscript into Chrome, Firefox, and Safari
extension packages.

Consultancy lesson: one fix is nice. A tool that makes fixes is leverage.

### 27. The mistakes mostly live outside the row - 2 min

Bring back the bank holiday bug and now show the Absences crop. Filling the row
is not the job. Knowing whether the row should exist is the job.

Walk the features: templates, service Text rules, public holidays, absences,
vacation balance, approval comments.

Mention the live Absences finding: it is another custom Vertec grid with Date,
until date, Type, Absence group, Description, and Hours. It mixes public-holiday
style rows with booked absence rows. That is why V3 reports planned absences,
vacation balance, and public holidays before V6/V8 ever think about writes.

### 28. AI confidence is not a test strategy - 2 min

This is where the talk turns into engineering. A saved Vertec DOM fixture plus
Vitest and Playwright lets a sceptic run the same thing and get the same result.

Tie to CDM: proof objects matter. The demo is not done because the agent sounded
pleased with itself.

The proof commands are:

```text
npm run test
npm run test:labs
npm run build:extension
npm run build
npm run test:e2e
```

### 29. The page gives people and agents bad handles - 2 min

Use the live structural audit. Services had custom grids, no real tables, no
forms, no labels, and no ARIA roles. Absences had even more grid rows and the
same basic semantic problem.

Do not make it a nerdy DOM slide. Make it practical: weak handles mean people
squint, keyboard users fight focus, scripts guess selectors, and agents burn
steps trying to infer structure.

### 30. Give the agent a job, a boundary, and proof - 3 min

Knowledge-sharing slide. Move quickly through the way you actually work:

- Subagents for research, lab audit, and deck critique.
- The main thread keeps taste and final edits.
- Every useful task should end in a file, command, screenshot, or reviewable PR.
- If the prose sounds like a conference sponsor wrote it in a lift, cut it.

This is one of the slides to tailor with your own screenshots from Codex,
Claude, GitHub, or your commit-log workflow.

### 31. Bypass the UI, but stop before the write - 2 min

Do not pretend we found a neat REST POST. The observed traffic was `/uisync` and
SignalR-shaped. Session state also had two gates: Zühlke access and Vertec's own
app login.

Run `npm run lab:api` if time allows. It reads the fixture, skips the planned
absence, drafts five workday entries, and prints `liveWrite: false`.

The responsible path is read, draft, validate, confirm, write, audit. When you
remove accidental friction, add intentional friction in the right places.

### 32. Now the chat can use tools instead of guessing - 2 min

This is the MCP wrapper slide. Run `npm run lab:mcp` if time allows. It starts a
real stdio MCP server, lists the tools, calls `vertec.checkSession`, prepares and
validates a draft, proves apply is blocked without confirmation, then proves the
demo-confirmed apply still writes nothing live.

This is the answer to "is Codex signed into everything the future?" Maybe, if
"signed in" means scoped tools, readable logs, dry runs, and human confirmation.

### 33. "What did I do today?" is already in your tools - 2 min

Use the commit-message idea. For developers, the end-of-day helper reads Git
history and linked tickets, drafts service Text, and asks before filling.

Read-only evidence in. Draft out. Human approves. Once it writes, the bar rises.

### 34. Each feature is its own small rung - 2 min

Walk the rungs as user needs, not prototypes. Templates for the backfiller.
Public holidays for the bank-holiday callback. House-style comments for the
lead. Commit and Slack summaries for memory. Vacation maths near the booking.

Ask: "Which of these would save you the most annoyance next week?"

### 35. This was never really about Vertec - 30 sec

Pivot. The timesheet is the specimen. The real skill is spotting hidden
integration work and building something small enough to prove.

### 36. This is the forward deployed move - 2 min

Use the forward-deployed engineering frame carefully. The point is not copying
Palantir. The point is going to where the workflow actually happens, building a
small thing in the field, and feeding the pattern back.

Connect to Zühlke: our public AI implementation language is about real impact,
getting tools into users' hands, and trusted systems in complex domains.

### 37. Forward deployed taste beats slideware - 2 min

Use the table as consultancy method. Observe pain. Build a tiny thing. Test the
boundary. Package the pattern.

Line: "Slides say transformation. A prototype lets them press a button."

### 38. Spot the AI slop - 2 min

Make this useful and funny. Tells include negative parallelism, em dash overuse,
neat lists of three, generic cards and gradients, image weirdness, and prose
that sounds like it has never been tired.

Be fair: one tell proves nothing. The real point is editing. Output is raw
material. Make it yours.

### 39. Better is not always more AI - 2 min

Discuss blast radius. Throwaway personal exploration can tolerate rough edges.
Client work, billing, HR, and teammate-maintained systems cannot.

Line: "A multi-agent swarm to fill three timesheet rows is a microservice for a
to-do list."

### 40. I made this talk in my sleep - 2 min

The meta reveal. One prompt before bed became an overnight research and coding
run. The deck and workshop repo were waiting in the morning.

Then be honest: the job was reading it, cutting the rubbish, checking the facts,
fixing tone, and owning the result. That is the talk happening inside the talk.

### 41. The whole repo, if you want it - 1 min

Point to the handouts. Participants can run the deck, open the scripts, inspect
the fixture, build the extension, and read the API/MCP dry runs.

Do not read every link. Say: "Take what is useful. Delete what is ridiculous.
Send me your userscripts."

### 42. The useful bits, with credit - 1 min

Name the source families: Zühlke CDM and AI implementation, OpenAI agent and
Codex docs, browser/DOM/userscript docs, Ousterhout for deep modules, Ralph and
Peter Steinberger for agent workflows, W3C for accessible presentation practice.

This is not academic cover. It is provenance.

### 43. Find the hidden integration work - 1 min

Close on the craft. Vertec got us into the room. The transferable skill is
finding where humans bridge systems, policy, and memory, then building the
smallest thing that makes that work visible, testable, and safe enough for a
sceptical colleague to run after lunch.

Final line: "Go fix something this week."

## Source links

- [Zühlke: Cybernetic Delivery Method case study](https://www.zuehlke.com/en/case-studies/cybernetic-delivery-method-adding-value)
- [Zühlke: AI implementation](https://www.zuehlke.com/en/expertise/ai-implementation)
- [Zühlke: ZenAI and governed enterprise AI](https://www.zuehlke.com/en/insights/zenai-solving-the-challenge-of-secure-scalable-enterprise-ai)
- [OpenAI Help: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [OpenAI: Introducing ChatGPT Atlas](https://openai.com/index/introducing-chatgpt-atlas/)
- [OpenAI: Codex](https://openai.com/codex/)
- [OpenAI: connectors and MCP](https://developers.openai.com/api/docs/guides/tools-connectors-mcp)
- [Chrome DevTools: view and change the DOM](https://developer.chrome.com/docs/devtools/dom/)
- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php)
- [John Ousterhout: A Philosophy of Software Design](https://web.stanford.edu/~ouster/cgi-bin/aposd.php)
- [Simon Willison on Peter Steinberger: Just Talk To It](https://simonwillison.net/2025/Oct/14/agentic-engineering/)
- [Ralph loop](https://ralph-cli.dev/docs/core-concepts/ralph-loop/)
- [W3C WAI: accessible presentations](https://www.w3.org/WAI/teach-advocate/accessible-presentations/)
