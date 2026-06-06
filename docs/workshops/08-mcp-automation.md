# V8: MCP Automation

## Goal

Introduce Model Context Protocol automation as a controlled way for AI tools to interact with approved systems, while making boundaries, approvals, and observability clear.

## What Participants Build

- A candidate automation map for one Vertec-related workflow.
- A boundary list showing what the AI may read, propose, or change.
- A human approval checkpoint for any action that could affect real records.

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

4. Optional discussion:

- Compare "AI suggests, human acts" with "AI acts after approval".
- Decide which steps should stay manual even if automation is possible.

## Safety/Privacy Notes

- Live Vertec/internal data must be sanitized or abstracted for workshop prompts and examples.
- Any tool that can change real records needs explicit human approval, logging, and rollback planning.
- Do not expose broad credentials to an AI agent. Prefer narrowly scoped tools.
- Keep sensitive reasoning local when it involves people, payroll, contracts, or commercially sensitive records.

## Pros/Cons

Pros:

- Gives AI a clear operating boundary instead of vague access.
- Supports audit logs and human approval points.
- Helps non-technical stakeholders discuss automation in concrete terms.

Cons:

- Requires careful tool design and governance.
- Bad boundaries can make automation risky at scale.
- More setup is needed than a prompt template or local prototype.

## Reproducibility Checklist

- [ ] The automation map distinguishes read, draft, approve, and block actions.
- [ ] Every proposed tool has input, output, audit, and approval rules.
- [ ] Dry-run mode avoids live writes.
- [ ] Sensitive data categories are named and excluded from prompts.
- [ ] The team has agreed who can approve real automation.
