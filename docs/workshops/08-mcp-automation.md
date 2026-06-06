# 08 - MCP Automation Dry Run

## Goal

Show how an agent gets a toolbelt without being handed the building keys.

The lab uses an MCP-shaped transcript over local workshop-copy Services data. Tools
can read copied rows, prepare a draft, validate it, and stop at confirmation.
The default state is blocked. Very unromantic. Very good.

## What Participants Build

- A boundary map: read-only, draft-only, approval required, never automate.
- Tool definitions for a Vertec-like Services workflow.
- A dry-run transcript with proposed changes and human confirmation.
- A rejection path.

## Run It

```sh
npm run dev
```

Open:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v8
```

Expected result:

- The first transcript ends with `status: "blocked"`.
- `vertec.applyDraft` reports `liveWrite: false`.
- Clicking `Simulate approved apply (no write)` changes the transcript to
  `would-apply-in-demo-only`, still with `liveWrite: false`.

## Inspect

Open:

```text
public/prototypes/v8/mcp-dry-run.user.js
src/prototypes/v1/vertec-helper.test.ts
```

Check the tool sequence:

```text
vertec.prepareTimesheetDraft
vertec.validateDraft
vertec.applyDraft
```

Check the boundary:

- `prepareTimesheetDraft` reads workshop-copy workdays.
- `validateDraft` checks public holidays and absences in concept.
- `applyDraft` stays blocked until `confirmedByHuman` is true.
- Even after simulated confirmation, `liveWrite` remains false.

## Prompt On Screen

```text
We are designing MCP-style tools for a sanitized Vertec Services workflow.

Classify each action:
- Read-only
- Draft-only
- Human approval required
- Never automate

Then define tools with:
- Name
- Inputs
- Outputs
- Allowed data
- Blocked data
- Audit fields
- Confirmation rule
- Dry-run behavior
```

Then:

```text
Write a dry-run transcript for the request:
"Fill this month with 8h project delivery entries, but only as a draft."

The transcript must show evidence, proposed entries, validation warnings, and a
blocked apply step unless a human confirms. No live writes.
```

## Boundary Example

| Action | Classification | Reason |
| --- | --- | --- |
| Read workshop-copy Services rows | Read-only | Local training records only. |
| Prepare draft entries | Draft-only | No record mutation. |
| Validate missing Text/hours | Draft-only | Uses proposed entries. |
| Apply to live Vertec | Human approval required | Consequence-bearing write. |
| Infer absence reason | Never automate | Sensitive and unsupported. |

## References

- [Model Context Protocol introduction](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Model Context Protocol authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- [Model Context Protocol security best practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)

## Safety Notes

- Do not expose broad credentials to an agent.
- Prefer narrow, task-specific tools over generic browser access.
- Every write-capable tool needs approval, logging, and rollback planning.
- Dry-run output must include what data was used, what would change, and how to
  cancel.

## Pros

- Tool boundaries are inspectable.
- Human confirmation is part of the design, not a guilty afterthought.
- Non-technical stakeholders can review the transcript.

## Cons

- Bad boundaries scale quickly.
- More setup is required than a prompt or userscript.
- A neat transcript can still hide weak evidence if nobody reads it.

## Checklist

- [ ] Actions are classified before tools are designed.
- [ ] Every tool has input, output, audit, and approval rules.
- [ ] Dry-run is the default.
- [ ] Apply can be declined.
- [ ] Participants can explain what would be forbidden in a real integration.
