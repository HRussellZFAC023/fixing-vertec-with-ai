# Facilitating With Subagents

## Purpose

Subagents can help a workshop manager divide the "Fixing Vertec With AI" flow into small, reviewable workstreams. The manager stays responsible for scope, privacy, and final judgement; subagents help gather, draft, test, and critique.

This is especially useful for AI sceptics because it makes the process visible. Each agent has a job, a boundary, and an output that humans can inspect.

## Manager Responsibilities

- Define the objective in plain English.
- Keep live Vertec/internal data local unless it has been sanitized or abstracted.
- Decide which tools are allowed.
- Review every output before it becomes a workshop instruction, code change, or operational recommendation.
- Stop delegation when the task involves credentials, personal data, contracts, HR information, commercial sensitivity, or production writes.

## Suggested Agent Assignments

### V2: Templates

Delegate:

- Turn a sanitized issue into a reusable prompt template.
- Produce acceptance criteria and facilitator questions.
- Identify where the prompt could produce misleading answers.

Keep local:

- Real examples, names, screenshots, URLs, credentials, and internal policy details.
- Final choice of wording for the workshop audience.

### V3: UI Overhaul For Holiday Review

Delegate:

- Summarise the sanitized workflow.
- Propose layout options and review states.
- Critique accessibility, privacy, and missing information risks.

Keep local:

- Live holiday records, absence reasons, employee names, team capacity data, and HR policy interpretation.
- Stakeholder judgement about whether the design supports the real approval process.

### V4: Harness With Vite And E2E Tests

Delegate:

- Draft mock records and test scenarios.
- Suggest local-only verification steps.
- Review the harness plan for gaps and confusing assumptions.

Keep local:

- Production exports, Vertec credentials, real browser sessions, and screenshots with identifiable data.
- The decision to connect anything to a real environment.

### V5: Userscript To Browser Extension

Delegate:

- Compare userscript and extension trade-offs.
- Draft a permissions explanation for non-technical reviewers.
- Build a migration checklist and pilot plan.

Keep local:

- Exact production selectors, internal URLs, cookies, extension signing details, and deployment channels.
- Approval from IT, security, or system owners.

### V6: Direct API Integration

Delegate:

- Map read/write boundaries from sanitized examples.
- Draft a plain-English API contract.
- Identify failure cases, audit requirements, and rollback questions.

Keep local:

- API keys, tokens, sample live payloads, account IDs, customer data, and production endpoint details.
- Any decision to request or use write access.

### V8: MCP Automation

Delegate:

- Classify steps as read-only, draft-only, approval-required, or never automate.
- Draft candidate tool definitions and dry-run protocols.
- Review proposed boundaries for privacy and operational risk.

Keep local:

- Broad credentials, live data, high-risk approval decisions, and anything that could change real Vertec records.
- Final governance rules for who can run or approve automation.

## Delegation Pattern

1. Manager writes a sanitized brief.
2. Subagent produces one narrow artifact.
3. A second subagent critiques the artifact for privacy, clarity, and assumptions.
4. Manager reviews, edits, and decides what enters the workshop.
5. Nothing touches live Vertec data unless the manager has explicit approval and a safe operational plan.

## Practical Prompts

Manager to drafting subagent:

```text
Using only the sanitized brief below, draft the requested workshop artifact. Do not invent live system details. Mark assumptions clearly.
```

Manager to review subagent:

```text
Review this artifact for privacy risk, unsupported assumptions, confusing wording for non-technical participants, and missing human approval points.
```

Manager to implementation subagent, only when implementation is in scope:

```text
Implement only the approved local prototype. Do not connect to live Vertec, do not use credentials, and do not modify files outside the assigned scope.
```

## What To Delegate Vs Keep Local

Good to delegate:

- Summaries of sanitized workflows.
- Prompt templates.
- Mock data design.
- Test scenario drafting.
- Accessibility and privacy critique.
- Plain-English explanations of technical choices.

Keep local:

- Live Vertec records and exports.
- Credentials, tokens, cookies, and session data.
- Personal, HR, payroll, client, contract, or commercially sensitive information.
- Production writes or irreversible actions.
- Final sign-off and accountability.

## Facilitator Checklist

- [ ] Every agent has a narrow job and an explicit output.
- [ ] Sanitization happened before delegation.
- [ ] The manager knows which files or artifacts each agent may edit.
- [ ] A separate review step checks privacy and assumptions.
- [ ] Human approval is required before any real integration or automation.
- [ ] The final workshop material is understandable without trusting hidden AI work.
