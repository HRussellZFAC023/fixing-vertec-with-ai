# V6: Direct API Integration

## Goal

Move the conversation from browser assistance to direct system integration, showing how AI can help map an API workflow while keeping access, privacy, and governance central.

## What Participants Build

- A sanitized API interaction map for one Vertec-related task.
- A list of required inputs, outputs, permissions, and failure cases.
- A decision note on whether direct API access is justified.

## Suggested Prompt/Tool Interaction

1. Define the task without secrets:

   ```text
   We are considering direct API integration for this internal Vertec workflow. Based only on the sanitized description below, identify the data we would need to read, write, validate, and log.
   ```

2. Ask for a contract-first plan:

   ```text
   Draft an API contract in plain English. Include request fields, response fields, validation rules, audit needs, rate limits to consider, and error handling.
   ```

3. Ask for an integration risk review:

   ```text
   Review this plan for privacy, security, operational risk, and whether browser-based or manual review would be safer.
   ```

4. Optional tool interaction:

- Use mock JSON with fake IDs.
- Use a diagram or table to show read/write boundaries.
- Keep any code generation out of scope unless the facilitator explicitly moves to implementation.

## Safety/Privacy Notes

- Never paste API keys, bearer tokens, session cookies, database exports, or live Vertec payloads into AI tools.
- Live Vertec/internal data must be sanitized or abstracted before discussion.
- Direct integrations need access control, audit trails, and rollback thinking.
- AI can help draft a plan, but system owners must approve real API access.

## Pros/Cons

Pros:

- Can remove fragile browser automation.
- Makes data contracts and failure handling explicit.
- Encourages a mature conversation about ownership and auditability.

Cons:

- Higher risk than a local prototype or userscript.
- Requires reliable API documentation and system-owner approval.
- Mistakes can affect real records if write access is not tightly controlled.

## Reproducibility Checklist

- [ ] All example payloads use fake identifiers and fictional records.
- [ ] Read operations, write operations, and audit logs are separated clearly.
- [ ] Required permissions are named and justified.
- [ ] Failure cases include validation errors, unavailable service, and partial success.
- [ ] The team has documented who must approve direct API access.
