# V6: Direct API Integration

## Goal

Ask the grown-up question: should this stop poking the page and talk to a proper boundary instead?

The demo uses a mock API because the grown-up question is about boundaries before access. Participants inspect requests, responses, validation, and failure handling without touching a real Vertec system.

## What Participants Build

- A sanitized API interaction map for one Vertec-related task.
- A list of required inputs, outputs, permissions, and failure cases.
- A decision note on whether direct API access is justified.
- A local mock API exercise using fictional data and clear read/write boundaries.

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

4. Connect it to the local demo:

   ```text
   Design a mock direct API demo using synthetic Vertec-like records only. Include one safe read endpoint, one draft write endpoint, example JSON, validation failures, and the audit log fields a human would expect to see.
   ```

5. Optional tool interaction:

- Use mock JSON with fake IDs.
- Use a diagram or table to show read/write boundaries.
- Keep any code generation out of scope unless the facilitator explicitly moves to implementation.
- Run the local mock API and compare the request log with the plain-English contract.

## Safety/Privacy Notes

- Never paste API keys, bearer tokens, session cookies, database exports, or live Vertec payloads into AI tools.
- Live Vertec/internal data must be sanitized or abstracted before discussion.
- Direct integrations need access control, audit trails, and rollback thinking.
- AI can help draft a plan, but system owners must approve real API access.
- The runnable V6 demo must use synthetic data only. No copied payloads, no exported records, and no production-like secrets.
- Keep mock writes reversible and clearly labelled as drafts.

## Pros/Cons

Pros:

- Can remove fragile browser automation.
- Makes data contracts and failure handling explicit.
- Encourages a mature conversation about ownership and auditability.
- Lets sceptical participants test the shape of an integration without granting access to anything real.

Cons:

- Higher risk than a local prototype or userscript.
- Requires reliable API documentation and system-owner approval.
- Mistakes can affect real records if write access is not tightly controlled.
- A mock API proves the conversation, not the production integration.

## Reproducibility Checklist

- [ ] All example payloads use fake identifiers and fictional records.
- [ ] Read operations, write operations, and audit logs are separated clearly.
- [ ] Required permissions are named and justified.
- [ ] Failure cases include validation errors, unavailable service, and partial success.
- [ ] The team has documented who must approve direct API access.
- [ ] The local demo can be reset to its original synthetic dataset.
- [ ] Participants can explain what would change before a real API pilot.

## References

- [Vertec REST API](https://www.vertec.com/en-gb/kb/vertec-rest-api/)
- [Vertec XML interface note](https://www.vertec.com/en-at/kb/vertec-xml-interface/)
