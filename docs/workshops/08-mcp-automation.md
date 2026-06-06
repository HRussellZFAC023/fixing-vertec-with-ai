# V8: MCP Automation

## Goal

Show how an agent can be given a toolbelt with labels, locks, and a logbook.

The demo behaves like an MCP-shaped wrapper around a fictional workflow: tools can inspect synthetic data and propose changes, but the default path is dry-run with human confirmation before anything is applied.

## What Participants Build

- A candidate automation map for one Vertec-related workflow.
- A boundary list showing what the AI may read, propose, or change.
- A human approval checkpoint for any action that could affect real records.
- A local dry-run wrapper that shows proposed tool calls, evidence, and approval prompts against toy data.

## Suggested Prompt/Tool Interaction

1. Start with boundaries:

   ```text
   We are exploring MCP-style automation for an internal Vertec workflow. Based on this sanitized workflow, classify each step as: read-only, draft-only, human approval required, or never automate.
   ```

2. Ask for a tool design:

   ```text
   Propose a small set of MCP tools for this workflow. For each tool, define input, output, allowed data, blocked data, audit log fields, and when human approval is required.
   ```

3. Ask for a dry-run protocol:

   ```text
   Design a dry-run mode that proves the automation path without changing live Vertec data. Include what evidence a facilitator should capture.
   ```

4. Connect it to the local demo:

   ```text
   Sketch an MCP-shaped local wrapper for this fictional workflow. Define tools for reading synthetic records, preparing a proposed change, showing a dry-run diff, and asking a human to confirm before apply. Make the confirmation step explicit and easy to decline.
   ```

5. Optional discussion:

- Compare "AI suggests, human acts" with "AI acts after approval".
- Decide which steps should stay manual even if automation is possible.
- Ask participants what evidence would make them comfortable approving a dry-run result.

## Safety/Privacy Notes

- Live Vertec/internal data must be sanitized or abstracted for workshop prompts and examples.
- Any tool that can change real records needs explicit human approval, logging, and rollback planning.
- Do not expose broad credentials to an AI agent. Prefer narrowly scoped tools.
- Keep sensitive reasoning local when it involves people, payroll, contracts, or commercially sensitive records.
- The local wrapper should default to dry-run and synthetic data. "Apply" should be a deliberate workshop action, never an invisible side effect.
- Human confirmation should include the proposed change, why it was suggested, what data was used, and how to cancel.

## Pros/Cons

Pros:

- Gives AI a clear operating boundary instead of vague access.
- Supports audit logs and human approval points.
- Helps non-technical stakeholders discuss automation in concrete terms.
- Makes automation less magical: participants can see the tool call, proposed diff, and approval gate.

Cons:

- Requires careful tool design and governance.
- Bad boundaries can make automation risky at scale.
- More setup is needed than a prompt template or local prototype.
- A dry-run wrapper can still create false confidence if the evidence is thin or the approval screen is rushed.

## Reproducibility Checklist

- [ ] The automation map distinguishes read, draft, approve, and block actions.
- [ ] Every proposed tool has input, output, audit, and approval rules.
- [ ] Dry-run mode avoids live writes.
- [ ] Sensitive data categories are named and excluded from prompts.
- [ ] The team has agreed who can approve real automation.
- [ ] The local demo shows the proposed change before any apply step.
- [ ] The human confirmation step can reject or cancel the automation cleanly.

## References

- [Model Context Protocol: authorization](https://modelcontextprotocol.io/specification/2025-06-18/basic/authorization)
- [Model Context Protocol: security best practices](https://modelcontextprotocol.io/specification/2025-06-18/basic/security_best_practices)
