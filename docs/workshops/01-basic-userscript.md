# 01 - Basic Userscript

## Goal

Build the smallest useful helper: a floating toolbar with `Previous`, `Fill 8h`,
and `Next` controls.

This version is intentionally modest. It does not infer your week, submit
anything, call private APIs, or pretend to understand project policy. It removes
one bit of repetitive manual work and gives participants a safe pattern they can
inspect.

## What participants build

- A synthetic Vertec-style fixture.
- A userscript that adds a small control surface.
- A fill action that writes a default project, hours, and comment into the
  selected day.
- Navigation actions that move between rows.
- Tests that prove the helper mounts and edits only the selected row.

## Suggested interaction with AI tools

Start by asking for a critique, not code:

```text
I have a legacy timesheet UI with repeated rows for date, project, phase,
service type, hours, and comment. The task is to fill 8 hours for each normal
working day. What are the smallest useful improvements we can make without
changing the backend?
```

Then narrow the ask:

```text
Write a browser userscript that only works on rows marked with data-vt-row.
It should add Previous, Fill 8h, and Next buttons. The fill action should update
the selected row and dispatch input/change events.
```

Review the generated code before running it. The key checks are:

- Does it target only the intended page or fixture?
- Does it avoid submitting or saving automatically?
- Does it dispatch the same events a human edit would trigger?
- Does it fail quietly when it cannot find the expected rows?

## Run the demo

```sh
npm install
npm run dev
```

Open the local Vite URL, go to the v1 demo, and click `Fill 8h`.

## Safety notes

Use the synthetic fixture for the workshop. If adapting this to a real system,
start in read-only observation mode and avoid auto-save behavior until the team
has reviewed the implementation.

## Pros

- Fast to understand and easy to delete.
- Keeps the user in control.
- Works as a teaching bridge for non-specialists.
- Gives agents a small, testable target.

## Cons

- DOM selectors can break when the app changes.
- It still depends on the UI being loaded and usable.
- It does not understand policy, holidays, approvals, or project-specific
  comments.

## Reproducibility checklist

- The fixture uses synthetic data.
- The userscript is a standalone file in `public/prototypes/v1/`.
- Unit tests cover mount, fill, and row navigation.
- Playwright opens the site, enters the iframe, and verifies the visible result.
