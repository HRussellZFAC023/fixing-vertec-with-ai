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
vertec.checkSession
vertec.prepareTimesheetDraft
vertec.validateDraft
vertec.applyDraft
```

Check the boundary:

- `prepareTimesheetDraft` reads workshop-copy workdays.
- `checkSession` must pass before any real Vertec read/write tool can run.
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
- Auth/session precondition
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
| Check Vertec session/capabilities | Read-only | Blocks if the browser is at Vertec login or API access is unavailable. |
| Read workshop-copy Services rows | Read-only | Local training records only. |
| Prepare draft entries | Draft-only | No record mutation. |
| Validate missing Text/hours | Draft-only | Uses proposed entries. |
| Apply to live Vertec | Human approval required | Consequence-bearing write. |
| Infer absence reason | Never automate | Sensitive and unsupported. |

## Auth Boundary

The live experiment found two separate gates:

- Zühlke access/SSO can launch the app.
- Vertec's own app session can still fall back to a `vertec_username` and
  `password` login page.

An MCP server should not treat copied browser cookies as infrastructure. A real
tool boundary needs one of these:

- A supported scoped API/service account.
- A browser helper that runs in the user's active session and stops at draft.
- A clear blocked response that says Vertec login/API capability is missing.

Useful tool output:

```json
{
  "tool": "vertec.checkSession",
  "output": {
    "workspaceAccess": "unknown",
    "vertecSession": "missing",
    "canReadServices": false,
    "canWriteServices": false,
    "reason": "Vertec app session is at login page"
  }
}
```

That is not a failed demo. That is the demo becoming honest.

## References

- [Model Context Protocol introduction](https://modelcontextprotocol.io/docs/getting-started/intro)
- [Model Context Protocol authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- [Model Context Protocol security best practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)

## Safety Notes

- Do not expose broad credentials to an agent.
- Do not replay Vertec browser cookies as a server auth model.
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
