# 02 - Templates and service text

## Goal

Turn the repeated "same project, same phase, same service type, usually 8 hours,
always the right Text" pattern into a local template.

This is not intelligence. It is a named default with a review button, which is
already more honest than pretending the human enjoys typing the same thing for
five days.

## What participants build

- Two local templates: client delivery and internal enablement.
- A `Fill week` action that drafts five training Services rows.
- A `Clear` action so nobody mistakes the draft for an act of fate.
- A checklist for what a human must review before saving.

## Run it

```sh
npm run dev
```

Open:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v2
```

Choose a template and click `Fill week`.

Expected result:

- Five workday rows receive draft values.
- Each drafted row has `data-vt-drafted="true"`.
- Project, Phase, Service type, Hours, and service Text are visible before any
  human save.

## Inspect

Open:

```text
public/prototypes/v2/templates-helper.user.js
src/prototypes/v1/vertec-helper.test.ts
```

Check:

- The `templates` object is local and readable.
- `applyTemplate()` skips absence and public-holiday rows.
- `clearDrafts()` resets draft values.
- No persistence, token, API call, or auto-submit is present.

## Prompt on screen

```text
You are helping design a local Vertec Services template helper.

Ask up to five questions before proposing defaults. Focus on:
- Project
- Phase
- Service type
- Text required by the project lead
- Normal hours
- Exceptions: public holiday, vacation, sick day, project switch

Paste in a real row from your own current-month timesheet if it helps.
Do not write code yet.
Make no mistakes, and then assume Vertec will still find something weird.
```

Then:

```text
Convert the answers into a local template design.

Output:
- Template fields and editable defaults
- Which rows are fillable
- Which rows must be skipped
- What the helper shows before a human saves
- Acceptance checks for the fixture
- Risks a human must review
```

## Verification

```sh
npm run test
```

Expected result: the v2 test clicks `Fill week`, finds five `[data-vt-row]`
items, and verifies each drafted workday has `8.00` hours.

## Notes

- Use your own real projects and service Text. That is the point.
- Apply normal judgement to genuinely sensitive client contract terms or rates.
- A template is a draft. The save button remains a human problem, as tradition
  demands.

## Pros

- Makes repeat work explicit and reviewable.
- Exposes service Text policy instead of leaving it in Slack folklore.
- Teaches that "automation" can mean "prepare a draft".

## Cons

- Bad defaults scale bad habits.
- Holidays and absences need data, not optimism.
- Project-specific Text rules can be subtle.

## Checklist

- [ ] Template values reflect your own real timesheet patterns.
- [ ] Fillable and skipped rows are defined.
- [ ] Draft rows are visibly marked.
- [ ] The helper can clear local drafts.
- [ ] Participants can name what they would inspect before saving.
