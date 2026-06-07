# Vertec Empathy Map

This map is based on safe structural observations from the saved Vertec
snapshot and the workshop objective. It intentionally avoids names, clients,
rates, and real entries.

## What people are trying to do

- Record normal working days, often as 8 hours on the current project.
- Add the right service Text when a project lead requires specific wording.
- Keep absences and holidays aligned with the services view.
- Understand remaining vacation balance without digging through separate tabs.
- Backfill a week or month without making a billing or approval mistake.

## What they see

- A dense spreadsheet-like interface.
- Small text and many repeated cells.
- Several adjacent concepts: services, expenses, activities, approvals,
  absences, working hours, attendance, and difference.
- Controls that are meaningful to the system but not always meaningful to the
  person doing a Friday afternoon admin task.

## What they think

- "I know what I did, why am I acting as the integration layer?"
- "Can I copy yesterday without accidentally copying the wrong thing?"
- "Have I handled holidays and absences, or only services?"
- "Will this be rejected because the service Text is not specific enough?"

## What they feel

- Mild dread around a task that should be quick.
- Uncertainty about whether a field is required by the tool or by local policy.
- Friction when switching projects or catching up after travel, illness, or
  client work.
- Relief when a helper makes the next correct action obvious.

## What an agent struggles with

- Custom div-based grids are harder to reason about than semantic tables.
- Tiny inline-styled cells provide weak accessibility and automation signals.
- The UI mixes data entry, navigation, approval context, and absence context.
- The safest action is rarely "fill everything"; it is usually "prepare a clear,
  reviewable draft."

## Design principle

Time recording was never the enemy. The enemy is making the human act as the
integration layer.
