# 00 - DOM Evidence To A Userscript Requirement

## Goal

Use ChatGPT without Codex to turn one ugly Vertec moment into a bounded userscript
requirement. Not a vibe. Not "make it better". One observed problem, one local
browser-side improvement, one acceptance check.

Vertec remains the villain. The participant is a competent person currently
being asked to reverse-engineer policy from a grid.

## What Participants Produce

- A sanitized DOM slice from a Services row or small panel.
- Selector candidates for the smallest useful target.
- A first requirement with page scope, behavior, privacy rule, dynamic-page note,
  and acceptance checks.
- A short list of assumptions the model was not allowed to invent.

Expected shape:

```text
On pages matching https://vertec.zuehlke.com/webapp/*, when a Services row exists
with Project, Phase, Service type, Text, and Hours fields, the userscript should
[specific visible helper]. It must use only data already present in the page,
send nothing externally, do nothing if the expected row is missing, and re-check
after dynamic page updates. Done means [observable check].
```

Use the real allowlist only in internal notes or approved code. If a copy leaves
the internal context, swap the host to `https://vertec.example.invalid/*` so a
sample cannot accidentally target the live webapp.

## Safety Boundary

Use a demo page, training copy, or a cleaned DOM snippet.

Do not paste:

- Credentials, tokens, cookies, session IDs, auth headers, API keys, hidden form
  values, or exported payloads.
- Client names, employee names, emails, IDs, rates, fees, row Text, case
  notes, or commercial details.
- Internal hostnames or full production URLs.
- Screenshots that show real rows, tabs, bookmarks, notifications, profile
  icons, or browser extensions.

Do paste:

- The smallest relevant wrapper: one Services row, panel, toolbar, or table
  fragment.
- Placeholder values such as `[PROJECT]`, `[PHASE]`, `[SERVICE_TYPE]`, `[TEXT]`,
  `[HOURS]`, and `[DATE]`.
- Enough class names or attributes to discuss selector stability.

## Exercise

### 1. Inspect The Target

Open the fixture or a cleaned training page.

```sh
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v1
```

In Chrome DevTools:

1. Right-click a Services row and choose `Inspect`.
2. Use the element picker if the selected node is useless.
3. Find the row wrapper, not just the input.
4. Search the DOM for selector candidates such as `[data-vt-row]`,
   `[data-vt-timesheet]`, `[name="project"]`, `[name="phase"]`,
   `[name="serviceType"]`, `[name="text"]`, `[name="hours"]`, and
   `[data-vt-service-field]`.
5. Note whether the page is likely to redraw rows after navigation. Vertec would,
   naturally, prefer the script to learn this the hard way.

Expected result: participants can point to the row wrapper and name the fields
the helper is allowed to touch.

### 2. Copy A Small DOM Slice

Copy only the row or panel. Replace real values before sharing.

```html
<div class="vt-row" data-vt-row data-date="[DATE]" data-vt-row-kind="workday">
  <div class="vt-cell">[DAY_LABEL]</div>
  <div class="vt-cell"><select name="project">...</select></div>
  <div class="vt-cell"><input name="phase" value="[PHASE]" /></div>
  <div class="vt-cell"><input name="serviceType" value="[SERVICE_TYPE]" /></div>
  <div class="vt-cell"><input name="text" value="[TEXT]" /></div>
  <div class="vt-cell"><input name="hours" inputmode="decimal" /></div>
</div>
```

The real Vertec vocabulary is Services, Project, Phase, Service type, Text, and
Hours. The field is `Text`; the policy around that text may still be the messy
part.

### 3. Ask For Critique, Not Code

Paste this into ChatGPT with the sanitized snippet.

```text
I am reviewing a sanitized Services row from an internal Vertec workshop.
Bracketed values are fake. Do not ask for real data.

Make no mistakes.

Task:
The user needs to prepare a normal service entry with Project, Phase, Service
type, Text, and Hours. The helper may change only the browser presentation layer.
It must not submit, save, call a private API, or send page data externally.

DOM:
[PASTE SANITIZED DOM]

Respond with:
1. What is hard for the human user, using only the evidence shown.
2. Selector candidates and which are brittle.
3. The smallest useful userscript improvement.
4. A Tampermonkey metadata block using the approved page scope:
   @match https://vertec.zuehlke.com/webapp/*
   @grant none unless a specific grant is justified.
5. Whether the implementation needs a MutationObserver or a simpler
   DOMContentLoaded mount.
6. Acceptance checks a facilitator can run on the fixture.
```

Expected result: the answer separates evidence from guesses and produces a
requirement, not a 600-line browser-resident regret machine.

The important teaching moment is not whether the first answer is brilliant. It
probably will not be. The useful question is: did ChatGPT notice that Project,
Phase, and Service type might be object references rather than plain text? If
not, excellent. Vertec has successfully annoyed a language model. We can use
that.

### 4. Tighten The Requirement

Keep only claims supported by the DOM and the participant's actual workflow.

Reject:

- Any inferred client, policy, holiday, absence, or approval rule.
- Any instruction to save or submit.
- Any broad domain match such as `*://*/*`.
- Any dependency on credentials, copied tokens, or live payloads.
- Any selector that targets by row text when a structural selector exists.

Keep:

- A narrow page allowlist.
- Explicit fields: Project, Phase, Service type, Text, Hours.
- `input` and `change` event dispatch after programmatic edits.
- A fallback when selectors are missing.
- A dynamic-page note: use `MutationObserver` only if rows are redrawn after
  navigation or filtering.

## Acceptance Check

By the end, each participant can say:

```text
The userscript is allowed to run on [page scope]. It targets [selector]. It
changes [visible local behavior]. It never sends [data category]. It handles
dynamic redraws by [mount strategy]. I will inspect [specific result].
```

## References

- [Chrome DevTools: view and change the DOM](https://developer.chrome.com/docs/devtools/dom/)
- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php)
