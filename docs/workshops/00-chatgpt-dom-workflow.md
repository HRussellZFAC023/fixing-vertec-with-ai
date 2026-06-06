# 00 - From awkward UI to a first userscript requirement

This mini-workshop shows how to use ChatGPT without Codex to turn a small UI annoyance into a clear, safe requirement for a userscript.

The point is not to trust AI blindly. The point is to give ChatGPT just enough sanitized evidence to help us name what is wrong, then keep a human in charge of the decision.

## Timebox

20 to 30 minutes.

## Outcome

By the end, each participant should have one first-draft requirement in this shape:

```text
On pages matching [safe URL pattern], when [target UI state exists], the userscript should [specific visible improvement], using only data already present on the page. It must not send page content to any external service. It should keep working if the panel reloads, and it is done when [simple acceptance checks].
```

## Safety rules

Use a public demo page, a training copy, or a screenshot/DOM snippet that has been cleaned first.

Do not paste:

- Customer names, employee names, emails, phone numbers, IDs, addresses, case notes, payment data, health data, or legal data.
- Internal URLs, hostnames, tokens, cookies, session IDs, API keys, auth headers, or hidden form values.
- Full-page HTML from an internal system.
- Screenshots that still show real records, names, notifications, tabs, bookmarks, or browser extensions.

Safer defaults:

- Use the company-approved ChatGPT workspace if one exists.
- Use Temporary Chat when appropriate, but still sanitize. Temporary Chat is a guardrail, not permission to paste secrets.
- Paste the smallest useful DOM slice, usually one card, form row, table row, button group, or panel.
- Replace real values with placeholders like `[CUSTOMER_NAME]`, `[ORDER_ID]`, `[DATE]`, `[STATUS]`, and `[INTERNAL_URL]`.
- Keep ChatGPT Agent or Atlas agent mode for public/mock pages unless the organization has explicitly approved internal browser-agent use.

## Step 1: Pick one small pain

Choose one UI moment that is annoying but not huge.

Good examples:

- A button label is vague.
- Important status text is buried.
- A table row is too hard to scan.
- A panel opens with too much noise.
- A useful value is visible but hard to copy.
- A warning looks the same as normal text.

Avoid broad prompts like "make this page better." We want one inspectable target.

Write the pain in plain English:

```text
When I am checking a customer record, I have to hunt for the current status because it is mixed in with less important metadata.
```

## Step 2: Inspect the awkward thing

In Chrome or Edge:

1. Open the safe demo page or sanitized training page.
2. Right-click the awkward part of the UI.
3. Choose `Inspect`.
4. If the wrong element is selected, use the element picker:
   - macOS: `Cmd+Option+C`
   - Windows/Linux: `Ctrl+Shift+C`
5. In the Elements panel, look for the nearest meaningful wrapper: a row, card, form group, toolbar, or panel.

You are looking for the smallest container that still explains the problem.

## Step 3: Copy a small DOM slice

In the Elements panel:

1. Right-click the selected wrapper.
2. Choose `Copy` -> `Copy outerHTML`, or use `Edit as HTML` and copy the visible snippet.
3. Paste it into a scratch note first, not directly into ChatGPT.
4. Delete unrelated sibling elements.
5. Replace real data with placeholders.

Before:

```html
<section class="customer-summary" data-customer-id="938177">
  <h2>Jane Smith</h2>
  <div class="meta">
    <span>Plan: Enterprise</span>
    <span>Status: At risk</span>
    <span>Renewal: 12/07/2026</span>
  </div>
  <button class="btn btn-secondary">Actions</button>
</section>
```

After:

```html
<section class="customer-summary" data-customer-id="[CUSTOMER_ID]">
  <h2>[CUSTOMER_NAME]</h2>
  <div class="meta">
    <span>Plan: [PLAN_NAME]</span>
    <span>Status: [STATUS]</span>
    <span>Renewal: [DATE]</span>
  </div>
  <button class="btn btn-secondary">Actions</button>
</section>
```

If the class names reveal internal product language, simplify those too:

```html
<section class="record-summary">
  <h2>[RECORD_NAME]</h2>
  <div class="meta">
    <span>Type: [TYPE]</span>
    <span>Status: [STATUS]</span>
    <span>Date: [DATE]</span>
  </div>
  <button class="secondary-action">Actions</button>
</section>
```

## Step 4: Add a redacted screenshot if helpful

A screenshot helps ChatGPT critique spacing, visual hierarchy, density, and contrast. Only use one if it is clean.

Before uploading:

- Crop to the target area.
- Blur or cover real text.
- Hide browser tabs, bookmarks, profile icons, notifications, and extensions.
- Check the image twice before sending.

If redaction is too hard, skip the screenshot. A sanitized DOM slice plus a plain-English description is still useful.

## Step 5: Ask ChatGPT for a critique

Paste this prompt into ChatGPT. Add your sanitized DOM and attach a redacted screenshot only if safe.

````text
I am reviewing a small piece of web UI for an internal workshop.

Please treat all bracketed values as fake placeholders. Do not infer business details from them. Do not ask for real data.

Goal:
Help me identify what is bad or risky about this UI and turn the issue into a small userscript-friendly improvement.

Context:
- The user is trying to: [TASK]
- The current pain is: [PAIN]
- We are allowed to improve only the browser presentation layer with a userscript.
- The userscript must not send page data to any external service.

Sanitized DOM:
```html
[PASTE SANITIZED DOM HERE]
```

Please respond with:
1. What looks hard for a human user, in plain English.
2. What you can tell from the DOM versus what is only a guess.
3. The smallest useful UI improvement.
4. A first userscript requirement with page scope, target element, behavior, privacy rule, dynamic-page note, and acceptance checks.
5. Any question you must ask before implementation.
````

For sceptics in the room: notice that the prompt asks ChatGPT to separate evidence from guesses. That keeps the critique honest.

## Step 6: Decide what is actually bad

Use ChatGPT's critique as a draft, then apply human judgement.

Look for problems like:

- Labels do not describe purpose.
- Buttons use vague text like `Actions`, `Submit`, or `OK`.
- Important information has the same visual weight as everything else.
- Status, warning, or error text relies only on color.
- The next action is far away from the information needed to decide.
- Text is technically present but hard to scan.
- The DOM has no stable wrapper, label, role, or class that a script could target.
- The UI updates dynamically, so a one-time script may work once and then disappear.

Cross out anything that depends on business knowledge you did not provide. Keep only the observations supported by the sanitized evidence and your own experience.

## Step 7: Turn the critique into a first requirement

Ask ChatGPT to convert the chosen improvement into a requirement:

```text
Turn this chosen improvement into a first userscript requirement.

Chosen improvement:
[ONE SENTENCE]

Please include:
- Safe page match pattern using placeholders, not real internal domains.
- Target element or selector candidates based on the sanitized DOM.
- User-visible behavior.
- What data stays local in the browser.
- What should happen if the element is missing.
- What should happen if the page updates after load.
- Acceptance checks a non-technical participant can understand.

Do not write the full userscript yet. Write the requirement.
```

Example output:

```text
On pages matching https://example.invalid/records/*, when a record summary panel exists, the userscript should make the status easier to scan by moving or copying the `Status: [STATUS]` text into a small visible badge near the record heading. It should use only text already present in the DOM, must not send page content to any external service, and should do nothing if the summary panel or status text is missing. It should re-apply after dynamic panel refreshes. It is done when a participant can identify the current status within two seconds, the original status text remains available, and the page still works with the script disabled.
```

That is enough for a developer, a userscript author, or a later coding-agent step.

## Step 8: Keep the first requirement small

A good first userscript requirement usually changes one thing:

- Add a clearer label.
- Highlight an existing status.
- Add a local-only copy button.
- Collapse repeated noise.
- Move one existing value closer to the action that needs it.
- Add a warning style to already-present warning text.

It should not:

- Change server data.
- Create new business rules.
- Hide audit-critical information.
- Depend on private APIs.
- Send page content to ChatGPT or any external service after installation.
- Require real user credentials during the workshop.

## Facilitator notes

The important teaching move is to keep asking: "What evidence did we give the model?"

If ChatGPT makes a confident claim that is not visible in the DOM or screenshot, mark it as a guess. If it suggests a broad redesign, ask for the smallest userscript-friendly improvement. If it asks for real data, stop and replace the data with safer placeholders.

Useful public references:

- [Chrome DevTools: viewing and changing the DOM](https://developer.chrome.com/docs/devtools/dom/)
- [Chrome DevTools: Inspect mode](https://developer.chrome.com/docs/devtools/inspect-mode)
- [OpenAI: Working with files in ChatGPT](https://openai.com/academy/working-with-files/)
- [OpenAI: Temporary Chat FAQ](https://help.openai.com/en/articles/8914046-temporary-chat-faq/)
- [OpenAI: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
- [OpenAI: ChatGPT Atlas data controls and privacy](https://help.openai.com/en/articles/12574142-chatgpt-atlas-data-controls-and-privacy)
- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php?locale=en)
