# Speaker Notes: Fixing Vertec With AI

Target duration: 60 minutes.

Audience: AI sceptics, non-technical colleagues, and technical people who want a
practical route into agentic engineering without pretending a browser agent is a
strategy.

## Run Of Show

| Time | Segment | Slides |
| ---: | --- | --- |
| 0-5 min | Opening and audience check | 1-3 |
| 5-11 min | Fieldwork and why time recording matters | 4-6 |
| 11-21 min | UI audit, empathy map, and CDM lens | 7-11 |
| 21-35 min | ChatGPT-only workflow, naive browser agents, and the live V1 wall | 12-17 |
| 35-51 min | Prototype ladder | 18-25 |
| 51-58 min | Subagents, Codex workbench, trade-offs | 26-29 |
| 58-60 min | Participant kit, sources, close | 30-32 |

## Presenter Setup

- Open the deck at `http://127.0.0.1:5173/`.
- Open speaker notes with `s` in Reveal if presenting from the browser.
- Keep the prototype studio ready at `/#/prototype-studio`.
- Do not show live Vertec row data unless the room and data path have been
  explicitly cleared. Use the redacted screenshots and local workshop copy.
- For the repeatable V1 demo, use `/#/demo-v1`, click a workshop-copy row, click `Fill service row`,
  then stop before it starts pretending to be a product launch.

## Slide Notes

### 1. Fixing Vertec With AI - 2 min

Open with recognition, not complaint. "We use Vertec because everyone knows the
ritual. The subject is not whether timesheets are boring. They are. The subject
is what happens when a human quietly becomes the unofficial bridge between policy,
memory, billing, approvals, and a UI, and is then thanked for it once a year."

Set the promise: the hour starts with diagnosis, moves through a ChatGPT-only
workflow, then uses Codex and small prototypes to show increasing capability and
increasing responsibility.

### 2. What You Will Learn Today - 2 min

Walk through the four beats: name the pain precisely, show why enterprise UI
fights humans and agents, use cybernetic delivery as a loop, then practise
agentic engineering without donating judgement to the machine.

Use the phrase "workflow evidence" early. It makes the session feel practical
rather than ideological.

### 3. Hands Up - 1 min

Ask who has filled in Vertec this week. Describe the response out loud for
accessibility: "about half the room", "nearly everyone", or "a noble minority".

This is the first research moment. People are not annoyed because they dislike
accuracy. They are annoyed because the cost of accuracy is paid in tiny manual
acts.

### 4. The Vertec Interface - 2 min

Let the redacted screenshot breathe. Point out the main shapes: side navigation,
week controls, attendance grid, services grid, tiny text, empty space, and
horizontal scrolling.

Do not dunk on the people who bought or maintain the tool. The joke is that this
is normal enterprise software. That is the disturbing part.

### 5. The Enemy Is Not Time Recording - 2 min

Use the core line:

```text
The enemy is not time recording. The enemy is making the human act as the integration layer.
```

Explain why the record matters: billing, approvals, planning, fairness, and
vacation balance. This keeps the talk from sliding into "admin bad".

### 6. Hidden Policy - 2 min

Show the cropped guidance. The key line is that the delivery lead decides. That
means a correct entry can depend on local context that is not in the UI.

This is the first big agent lesson: "fill 8 hours" is not a complete
requirement. It omits service Text, holidays, absences, half days, and project
policy.

### 7. Thirteen Small Frictions - 3 min

Pick five callouts from the annotated screenshot:

- No clear page structure.
- Manual navigation.
- Icon-only controls.
- Not a real table.
- Fill everything manually.

Then connect them: these are not just aesthetic problems. They weaken the
handles used by humans, keyboard users, scripts, and agents.

### 8. Weak Handles - 2 min

Make accessibility concrete. A page with labels, structure, focus order, and
predictable controls is easier for everyone to operate and automate.

This is a useful moment for non-technical participants: accessibility is not a
specialist checklist at the end. It is a way of making work legible.

### 9. Empathy Map - 2 min

Read the four personas quickly. Add one line: the new joiner and the AI agent
have the same problem. Neither has the folklore, and only one of them can be sent
on an induction day.

Ask the room: "Which of these are you on a Friday?" Keep it quick.

### 10. Cybernetic Delivery - 2 min

Use the Camp template framing, but translate it into workshop language. This is
not a tool rollout, not a Scrum replacement, and not an AI campaign. It is a way
to improve how a delivery system learns and adapts.

The serious line: make artefact flow visible, shorten feedback loops, measure
the system, and keep humans accountable for judgement.

The less serious line: "Buy a tool and hope morale improves" has already had a
fair trial. It went about as well as the Vertec date picker.

### 11. CDM Translated For Vertec - 3 min

Walk the room through the two graphics.

Artefact flow: screenshot, DOM slice, network trace, prompt, script, test,
speaker note. These are the things moving through the system. If they are
invisible, people compensate with memory and guesswork.

CDM cycle: tools, delivery, experiences, patterns, platform, community. For this
talk, that becomes: try a tiny helper, observe the wall, capture the lesson,
turn it into a reusable workshop step, and feed that back into the next
prototype.

### 12. ChatGPT, No Codex - 3 min

Teach the first mini-workshop. Use a redacted screenshot or a tiny DOM slice.
Ask ChatGPT to critique from three views: tired human, assistive-tech user, and
automation script.

Stress the data boundary: no real names, clients, row Text, URLs, tokens, or
hidden values.

### 13. DOM Slice - 3 min

Explain why the snippet is tiny. It is small enough to paste safely and rich
enough for critique. ChatGPT can help name repetition, missing labels, risky
assumptions, and acceptance criteria.

The win is not code yet. The win is a better sentence describing the first fix.

### 14. Browser Agent Attempt - 3 min

Tell the story: a browser agent can sometimes grind through the workflow, but it
inherits the page's confusion. If the page makes humans zoom, scroll, guess, and
choose between similar tables, the agent gets the same obstacle course with a
token meter attached.

Line to use if it fits the room: "A browser agent is a lot of confidence wrapped
around a mouse cursor."

### 15. The Callback - 2 min

Show the bank-holiday callback. The punchline is:

```text
The agent did what we asked. That was the problem.
```

Do not overplay it. The serious lesson is that policy context has to be made
explicit before an automation boundary moves toward writing data.

### 16. Live V1 Finding - 3 min

This is where you earn credibility with the sceptics. Say plainly: we tried the
obvious thing on the signed-in Services page. Text and Hours could be driven
through the visible grid editor. Project, Phase, and Service type are Vertec
object-reference fields. Typing a label is not the same as binding the object.

Use the line:

```text
"Make no mistakes" met a field that was not really a field.
```

The lesson is not "AI failed, everyone go home". The lesson is that V1 should
report the wall instead of hallucinating success. V6 exists because the honest
answer is sometimes API discovery, authentication, permissions, and audit.

### 17. Current Agent Reality - 2 min

Keep this factual and sourced. ChatGPT agent can use a visual browser, apps,
files, and confirmations. Atlas brings agent mode into the browser with page
visibility and privacy controls. Those are useful. They also make data and
permission boundaries more important.

### 18. The Prototype Ladder - 1 min

Transition from diagnosis to build. Explain that the ladder is not a maturity
model where everyone must reach V8. It is a set of stops. The skill is knowing
where to get off.

### 19. V1 Live Demo - 4 min

Show the local workshop copy after explaining that the userscript has already
been tried against the signed-in Services page. Click a row and use the helper.
Keep the demo deliberately small.

Say: "This is a button. Revolutionary. It does one thing, which is why we can
review it without needing a lie down."

### 20. Why Userscripts - 2 min

Connect console snippet, userscript, harness, and extension. Bring in your
UchiDb/userscript-compiler story here. The important lesson is taste: not every
workflow pain needs a six-month platform project.

### 21. V2 And V3 - 2 min

Templates make service Text policy visible. Holiday review handles the callback
problem before it happens. Vacation balance belongs near the decision, not in a
separate mental tab.

Ask: "What would you want this panel to warn you about before it filled a week?"

### 22. V4 And V5 - 2 min

This is the credibility bit. Tests and packaging are not glamorous, and nobody
was ever promoted for writing a fixture, but they make the demo shareable. Once
it becomes extension-shaped, permissions, deployment, and ownership become real.

### 23. V6 And V8 - 2 min

Direct API calls can be the robust path, if policy allows it. MCP turns the same
idea into chat-native tools. Both need gates: read, draft, validate, confirm,
write.

Make clear that bypassing the UI removes accidental friction. We then need to
add intentional friction in the right places.

For this tenant, the webapp traffic observed during the experiment was
SignalR/WebSocket-shaped, and a read-only probe of the obvious REST path returned
404. That is not a blocker for the talk; it is the talk. "Use the API" is
discovery work, not a spell.

### 24. Prototype Studio - 2 min

Show the links. Explain that each version uses the same local workshop copy so
participants can compare boundaries. This makes the demos reproducible and
safe.

### 25. Architecture - 2 min

Explain the five pieces: userscript UI, Vertec DOM adapter, core rules,
integrations, tests. This is how the work becomes delegable to agents without
turning into a blob.

### 26. Evidence Chain - 2 min

Use the "check my commit messages" idea. Git, calendar, tickets, and chat can
produce draft service Text. The human approves. This is a better request than
"fill my timesheet" because it starts read-only and produces reviewable text.

### 27. Subagents - 2 min

Frame subagents as a delivery-management pattern. Research, fixtures, scripts,
holiday rules, tests, docs, and integration can run in parallel. The human lead
keeps taste, risk calls, and the story.

### 28. Superapp Question - 2 min

Ask: "Is Codex signed into everything the future?"

Answer: maybe, but only if "signed in" means scoped tools, permissions,
confirmations, and traces. The silly version is an assistant with vague
authority. The useful version is a workbench.

### 29. Pros And Cons - 2 min

Use the table as the decision guide. No approach wins forever. The right rung
depends on blast radius, maintenance, proof, permissions, and policy.

### 30. Participant Kit - 1 min

Point to the handouts and demos. This is what participants can take away and
adapt.

### 31. Sources - 1 min

Mention that the deck follows accessible presentation guidance: large readable
visuals, consistent structure, speaker notes, and shareable material. The AI
product claims are linked to current OpenAI pages.

### 32. Close - 1 min

End with: "Find the hidden integration work."

Bring it back to consultancy skill. Clients have this problem everywhere, usually
buried in a tool nobody will admit to having chosen. The job is to spot where
humans are bridging systems, policy, and memory, then make that work visible,
testable, and safer.

## Source Links

- [W3C WAI: Making Events Accessible](https://www.w3.org/WAI/teach-advocate/accessible-presentations/)
- [Microsoft: Make PowerPoint presentations accessible](https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2f33-4bd2-8ca7-dae3b2b3ef25)
- [TED Ideas: slide design tips](https://ideas.ted.com/6-dos-and-donts-for-next-level-slides-from-a-ted-presentation-expert/)
- [OpenAI Academy: Working with files in ChatGPT](https://openai.com/academy/working-with-files/)
- [OpenAI Help: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [OpenAI: Introducing ChatGPT Atlas](https://openai.com/index/introducing-chatgpt-atlas/)
- [OpenAI Help: Atlas data controls and privacy](https://help.openai.com/en/articles/12574142-chatgpt-atlas-data-controls-and-privacy)
- [OpenAI: Codex for every role, tool, and workflow](https://openai.com/index/codex-for-every-role-tool-workflow/)
