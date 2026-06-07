# 00 - DOM evidence to a userscript requirement

## Goal

Use ChatGPT without Codex to turn one ugly Vertec moment into a bounded userscript
requirement. Not a vibe, not a vague "make it better". You start from one observed
problem, land on one local browser-side change, and write down one way to check it
worked.

Vertec remains the villain. The participant is a competent person currently
being asked to reverse-engineer policy from a grid.

## What participants produce

- A DOM slice from a Services row or small panel.
- Selector candidates for the smallest useful target.
- A first requirement with page scope, behavior, dynamic-page note, and
  acceptance checks.
- A short list of assumptions the model was not allowed to invent.

Expected shape:

```text
On pages matching https://vertec.zuehlke.com/webapp/*, when a Services row exists
with Project, Phase, Service type, Text, and Hours fields, the userscript should
[specific visible helper]. It must use only data already present in the page,
do nothing if the expected row is missing, and re-check after dynamic page
updates. Done means [observable check].
```

## Exercise

### 1. Inspect the target

Open the fixture, or just open your own current-month timesheet in Vertec. Both
work.

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

### 2. Copy a small DOM slice

Copy the row or panel. Pasting a real Vertec row, screenshot, or DOM slice into
ChatGPT, Claude, or Codex is fine. These are Zühlke-approved tools and it's your
own timesheet. Keep it small because smaller context is easier to reason about,
not because anyone needs to be nervous about it.

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
Hours. The field is `Text`. The policy around that text may still be the messy
part.

### 3. Ask for the helper

Paste the DOM and ask for what you want:

```text
Here's a row from my Vertec timesheet (DOM below). Filling it in is death by a
thousand clicks. Write me a userscript that adds a "Fill" and "Next" button so I
can blast through the week.

[PASTE DOM]
```

That's the whole prompt. You refine it by talking back to the model, like you
actually would.

The teaching moment isn't whether the first answer is brilliant. It probably
won't be. The useful question is whether ChatGPT noticed that Project, Phase, and
Service type might be object references rather than plain text. If it didn't,
excellent. Vertec has now annoyed a language model too, and we can use that.

### 4. Tighten the requirement

Keep only claims supported by the DOM and the participant's actual workflow.

Reject:

- Any inferred client, policy, holiday, absence, or approval rule.
- Any instruction to save or submit.
- Any broad domain match such as `*://*/*`.
- Any selector that targets by row text when a structural selector exists.

Keep:

- A narrow page allowlist.
- Explicit fields: Project, Phase, Service type, Text, Hours.
- `input` and `change` event dispatch after programmatic edits.
- A fallback when selectors are missing.
- A dynamic-page note: use `MutationObserver` only if rows are redrawn after
  navigation or filtering.

## Acceptance check

By the end, each participant can say:

```text
The userscript is allowed to run on [page scope]. It targets [selector]. It
changes [visible local behavior]. It never submits or saves. It handles
dynamic redraws by [mount strategy]. I will inspect [specific result].
```

## References

- [Chrome DevTools: view and change the DOM](https://developer.chrome.com/docs/devtools/dom/)
- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver)
- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php)
