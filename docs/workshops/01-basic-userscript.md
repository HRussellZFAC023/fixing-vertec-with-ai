# 01 - Basic Userscript

## Goal

Build the smallest useful helper for the Vertec Services grid: `Previous`,
`Fill service row`, and `Next`.

The helper edits one selected Services row in the local fixture. On the real
Vertec page it can detect the live Services grid and show the first hard limit:
Text and Hours behave like editable cells, but Project, Phase, and Service type
are object references. Typing their labels is not the same as selecting the
underlying Vertec objects. This is where "make no mistakes" has its little sit
down.

## What Participants Build

- A userscript-style control surface mounted over the fixture.
- Row selection using `[data-vt-row]` and `data-selected`.
- A fill action for the selected row only.
- Tests proving the helper mounts, fills the expected fields, and moves row
  selection.

The real workflow is Services rows:

```text
Project | Phase | Service type | Text | Hours
```

This lab is not about attendance `From`/`To` punch-in fields.

## Run It

```sh
npm install
npm run dev
```

Open:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v1
```

Click `Fill service row`.

Expected result:

- The selected row stays selected.
- `[name="project"]` becomes `C34157, Barclaycard Website Re`.
- `[name="phase"]` becomes `10_DELIVERY`.
- `[name="serviceType"]` becomes `003_DAILY RATE`.
- `[name="text"]` becomes `Project delivery`.
- `[name="hours"]` becomes `8.00`.
- Nothing is submitted or saved.

## Inspect

Open:

```text
public/fixtures/vertec-workshop-copy.html
public/prototypes/v1/vertec-helper.user.js
src/prototypes/v1/vertec-helper.test.ts
tests/e2e/site.spec.ts
```

Check these details:

- Metadata contains `@match` and `@grant none`.
- The v1 metadata uses the narrow internal allowlist
  `https://vertec.zuehlke.com/webapp/*`, not the internet with a moustache.
- The script refuses to run unless it can find Services rows with the expected
  fields.
- On live Vertec it detects the `.qx-vertec-table` Services grid, but refuses to
  claim success when Project, Phase, or Service type are blank object fields.
- Programmatic edits dispatch both `input` and `change`.
- Selectors are structural: `[data-vt-services-row]`, `[data-vt-row]`,
  `[data-vt-service-field="project"]`, `[data-vt-service-field="phase"]`,
  `[data-vt-service-field="serviceType"]`, `[data-vt-service-field="text"]`,
  and `[data-vt-service-field="hours"]`.

## Prompt On Screen

```text
Write a browser userscript for a sanitized Vertec Services fixture.

Make no mistakes.

Scope:
- It must run only on rows marked [data-vt-row].
- It must add Previous, Fill service row, and Next controls.
- Fill service row updates only the selected row.
- The row fields are Project, Phase, Service type, Text, and Hours.
- The fixture field names are project, phase, serviceType, text, and hours.
- After setting values, dispatch input and change events.
- Do not save, submit, call APIs, or infer policy.
- Fail quietly if the expected fixture is missing.

Then critique the answer: where would this break on the real Vertec grid?
Look specifically for object-reference fields, custom div tables, redraws, and
places where a value can appear typed but not actually become a valid Vertec
object.
```

## Verification

For the focused unit test:

```sh
npm run test
```

For the full local proof, when there is time:

```sh
npm run check
```

Expected result: Vitest verifies the DOM helper in JSDOM, and Playwright clicks
`Fill service row` through the local browser fixture.

## Safety Notes

- Use the local workshop copy in the workshop.
- The live-page experiment showed the joke in useful detail: Vertec accepted
  typed Text and Hours, but object-reference columns need real object selection
  or an API boundary.
- Do not paste production row values, service Text, rates, or project names into
  prompts.
- Start any real adaptation in observation mode.
- Keep auto-save out of the first version. Vertec already has enough confidence.

## Pros

- Easy to read, run, and delete.
- Gives participants a concrete userscript shape.
- Keeps the human in control of saving.

## Cons

- Selectors can break when the page changes.
- It cannot know holidays, absences, approval rules, or project-specific text.
- It cannot safely invent Vertec object references. That is a product fact, not
  a prompt-engineering failure.
- Without a dynamic mount strategy, SPA redraws can remove the helper.

## Checklist

- [ ] Training records stay in the local workshop copy.
- [ ] Page scope is narrow.
- [ ] Services fields are Project, Phase, Service type, Text, and Hours.
- [ ] The script edits only the selected row.
- [ ] It dispatches `input` and `change`.
- [ ] It does not submit or call APIs.
