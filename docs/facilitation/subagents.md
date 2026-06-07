# Facilitating with subagents

## Purpose

Subagents let a workshop manager split the "Fixing Vertec With AI" flow into small, reviewable workstreams. The manager owns scope and the final call. Subagents do the gathering, drafting, testing, and critiquing.

That split helps with AI sceptics in the room, because it makes the process visible. Each agent has a job, a boundary, and an output a human can read and check.

## Manager responsibilities

- Define the objective in plain English.
- Decide which tools are allowed.
- Review every output before it becomes a workshop instruction, code change, or operational recommendation.
- Keep production writes and final sign-off with the manager.

## Suggested agent assignments

### V2: templates

Delegate:

- Turn a real Vertec issue into a reusable prompt template.
- Produce acceptance criteria and facilitator questions.
- Identify where the prompt could produce misleading answers.

Keep local:

- Final choice of wording for the workshop audience.

### V3: UI overhaul for holiday review

Delegate:

- Summarise the holiday review workflow.
- Propose layout options and review states.
- Critique accessibility and missing information risks.

Keep local:

- Stakeholder judgement about whether the design supports the real approval process.

### V4: harness with Vite and e2e tests

Delegate:

- Draft mock records and test scenarios.
- Suggest local verification steps.
- Review the harness plan for gaps and confusing assumptions.

Keep local:

- The decision to connect anything to a real environment.

### V5: userscript to browser extension

Delegate:

- Compare userscript and extension trade-offs.
- Draft a permissions explanation for non-technical reviewers.
- Build a migration checklist and pilot plan.

Keep local:

- Approval from IT, security, or system owners.

### V6: direct API integration

Delegate:

- Map read/write boundaries from real examples.
- Draft a plain-English API contract.
- Identify failure cases, audit requirements, and rollback questions.

Keep local:

- Any decision to request or use write access. Vertec gives you `/uisync` over SignalR and no friendly REST POST, so a write path deserves a deliberate decision rather than happening by accident.

### V8: MCP automation

Delegate:

- Classify steps as read-only, draft-only, approval-required, or never automate.
- Draft candidate tool definitions and dry-run protocols.
- Review proposed boundaries for operational risk.

Keep local:

- High-risk approval decisions and anything that could change real Vertec records without a heads-up.
- Final governance rules for who can run or approve automation.

## Delegation pattern

1. Manager writes the brief.
2. Subagent produces one narrow artifact.
3. A second subagent critiques the artifact for clarity and assumptions.
4. Manager reviews, edits, and decides what enters the workshop.
5. Production writes get an explicit decision from someone who can sign off.

## Practical prompts

Manager to drafting subagent:

```text
Using the brief below, draft the requested workshop artifact. Mark assumptions clearly.
```

Manager to review subagent:

```text
Review this artifact for unsupported assumptions, confusing wording for non-technical participants, and missing human approval points.
```

Manager to implementation subagent, only when implementation is in scope:

```text
Implement only the approved local prototype. Do not modify files outside the assigned scope.
```

## What to delegate vs keep local

Good to delegate:

- Summaries of real workflows. Pasting a real Vertec row, screenshot, or DOM slice into ChatGPT, Claude, or Codex is fine.
- Prompt templates.
- Mock data design.
- Test scenario drafting.
- Accessibility critique.
- Plain-English explanations of technical choices.

Keep local:

- Production writes or irreversible actions.
- Final sign-off and accountability.

## Facilitator checklist

- [ ] Every agent has a narrow job and an explicit output.
- [ ] The manager knows which files or artifacts each agent may edit.
- [ ] A separate review step checks assumptions.
- [ ] Production writes have an owner who said yes.
- [ ] The final workshop material is understandable without trusting hidden AI work.
- [ ] Make no mistakes.
