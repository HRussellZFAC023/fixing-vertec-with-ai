# V2: Timesheet Templates And Comments

## Goal

Turn the repeated "same project, same service type, usually 8 hours, sometimes a required comment" pattern into a reusable local template.

This is the version where the helper becomes more personal, but still not clever enough to be dangerous.

## What Participants Build

- A fictional timesheet template for one current project.
- A comment template that can be changed per project or lead preference.
- A short acceptance checklist that proves the helper prepares entries without submitting them.

Runnable demo:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v2
```

## Suggested Prompt/Tool Interaction

1. Ask the AI to interview you before proposing changes:

   ```text
   You are helping improve an internal Vertec timesheet workflow. Ask up to five clarifying questions about repeat entries, comments, holidays, and approval constraints. Do not write code yet.
   ```

2. Provide only sanitized details:

   ```text
   The usual pattern is: [fictional project], [service type], [hours], [comment rule].
   Exceptions are: [public holiday], [vacation], [sick day], [project switch].
   Success looks like: [reviewable draft, no auto-submit].
   Constraints: [browser-only, local data, no production secrets].
   ```

3. Ask for a repeatable output:

   ```text
   Convert this into a local template design. Include editable defaults, acceptance criteria, and the risks a human must check before using it.
   ```

## Safety/Privacy Notes

- Do not paste live Vertec records, client names, employee details, credentials, tokens, screenshots with identifiers, or internal URLs that reveal sensitive context.
- Sanitize or abstract live Vertec/internal data before using it in any AI tool.
- Keep the first version low-stakes: process notes, UI labels, fake records, and mock examples are enough.
- Treat AI output as a draft. A human still owns the decision and verification.

## Pros/Cons

Pros:

- Helps sceptics see that AI can structure a repeated task without taking control.
- Works for non-technical participants because it starts with their real admin pattern.
- Makes project-specific comments and exceptions explicit instead of tribal knowledge.

Cons:

- Templates can encode the wrong habit if nobody reviews them.
- Still needs holiday and absence awareness.
- Some project leads may require comments that cannot be guessed safely.

## Reproducibility Checklist

- [ ] The example contains no live Vertec/internal personal or commercial data.
- [ ] The template uses fictional or sanitized defaults.
- [ ] The prompt asks the AI to clarify before solving.
- [ ] The output includes acceptance criteria a human can test.
- [ ] The helper prepares a draft but does not submit it.
- [ ] Participants can explain what they would check before trusting the template.
