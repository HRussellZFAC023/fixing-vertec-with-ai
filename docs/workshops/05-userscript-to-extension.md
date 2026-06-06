# V5: From Userscript To Browser Extension

## Goal

Explore when a quick browser userscript should become a more maintainable browser extension, and how AI can help plan that migration safely.

## What Participants Build

- A migration brief comparing userscript and extension approaches.
- A permissions list written in plain English.
- A small risk register for browser automation around Vertec.

## Suggested Prompt/Tool Interaction

1. Frame the decision:

   ```text
   We have a browser-based helper for an internal Vertec workflow. Using the sanitized description below, compare keeping it as a userscript versus turning it into a browser extension.
   ```

2. Ask for a permissions review:

   ```text
   List the minimum browser permissions an extension might need for this flow. For each permission, explain why it is needed, what could go wrong, and whether there is a safer alternative.
   ```

3. Ask for a migration plan:

   ```text
   Produce a staged migration plan: preserve behaviour, isolate Vertec-specific logic, add tests, review permissions, then package for a small pilot.
   ```

4. Optional facilitator move:

- Ask participants to vote on whether each permission is justified.
- Rewrite any technical permission into a sentence a manager could understand.

## Safety/Privacy Notes

- Do not include production Vertec URLs, credentials, cookies, internal selectors, or screenshots with identifiable data in prompts.
- Live Vertec/internal data must be sanitized or abstracted.
- Browser extensions can see powerful context. Keep permissions narrow and explain them.
- Pilot with fictional or non-sensitive examples before any real workflow.

## Pros/Cons

Pros:

- Turns a "clever hack" into something easier to review and support.
- Makes browser permissions visible instead of mysterious.
- Creates a useful governance conversation for non-technical stakeholders.

Cons:

- Extension packaging adds friction.
- Review and deployment may involve IT or security teams.
- A bad extension can create more risk than a simple manual process.

## Reproducibility Checklist

- [ ] The migration brief names the current behaviour without exposing sensitive details.
- [ ] Every proposed permission has a plain-English justification.
- [ ] The plan includes a pilot stage before broader rollout.
- [ ] The team has identified who approves extension use.
- [ ] Participants can state when a userscript is still the simpler choice.
