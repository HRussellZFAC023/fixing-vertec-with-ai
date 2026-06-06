# V4: Harness With Vite And E2E Tests

## Goal

Show how AI can help create a small, local test harness around a Vertec improvement so participants can verify behaviour without touching production.

## What Participants Build

- A local-only test plan for the chosen flow.
- A mock data set that resembles the Vertec scenario without exposing real data.
- An end-to-end checklist for proving the happy path and one or two failure paths.

## Suggested Prompt/Tool Interaction

1. Ask for a testable slice:

   ```text
   Given this sanitized Vertec workflow, identify the smallest local web prototype we could test with Vite and an end-to-end tool. Do not connect to real Vertec.
   ```

2. Ask for mock data:

   ```text
   Create fictional test records for this flow. Include normal, missing-data, and conflict cases. Do not use real names, real clients, or production identifiers.
   ```

3. Ask for E2E scenarios:

   ```text
   Write human-readable end-to-end scenarios for the prototype. Each scenario should say: setup, action, expected result, and what a facilitator should observe.
   ```

4. If using a coding agent later, keep the implementation prompt narrow:

   ```text
   Implement only the local harness and tests described here. No live APIs, no credentials, no production URLs.
   ```

## Safety/Privacy Notes

- Live Vertec/internal data must be sanitized or abstracted before it becomes a fixture.
- Local harnesses should use fake records and fake identifiers only.
- Do not store credentials, cookies, exports, or screenshots from production in the repo.
- Make sure participants understand that passing local tests does not prove production integration is safe.

## Pros/Cons

Pros:

- Gives sceptics something concrete to inspect.
- Makes regressions easier to discuss in plain language.
- Separates "does the idea work?" from "can we safely integrate it?"

Cons:

- A local harness can drift from the real system.
- E2E tests need maintenance when the prototype changes.
- Mock data can miss messy real-world cases if nobody reviews it carefully.

## Reproducibility Checklist

- [ ] The harness plan avoids live Vertec access.
- [ ] Mock data is fictional and safe to commit.
- [ ] Scenarios cover happy path, missing data, and an error or conflict.
- [ ] Expected results are observable by a non-technical participant.
- [ ] The limits of local testing are stated clearly.
