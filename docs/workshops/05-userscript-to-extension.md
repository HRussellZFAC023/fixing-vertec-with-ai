# V5: From Userscript To Browser Extension

## Goal

Decide when the helpful little script has outgrown a sticky note and needs packaging, permissions, and adult supervision.

The demo stays toy-sized: compile a tiny sanitized userscript into an extension-shaped folder people can inspect. It does not need Vertec access. If the packaged helper includes the V3 public bank-holiday fetch, review that visible network behaviour as part of the content-script discussion.

## What Participants Build

- A migration brief comparing userscript and extension approaches.
- A permissions list written in plain English.
- A small risk register for browser automation around Vertec.
- A local demo output showing how a userscript could be packaged into a browser-extension shape.

Runnable demo:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v5
```

The real package command is `npm run build:extension`.

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

4. Connect it to the local demo:

   ```text
   For a workshop demo, design a local compiler that accepts a small sanitized userscript and writes an extension-style manifest plus content script. Keep the output easy to inspect, and explain which generated files would need human review before use.
   ```

5. Optional facilitator move:

- Ask participants to vote on whether each permission is justified.
- Rewrite any technical permission into a sentence a manager could understand.
- Open the generated manifest and ask: "Would we approve this permission for a pilot?"

## Safety/Privacy Notes

- Do not include production Vertec URLs, credentials, cookies, internal selectors, or screenshots with identifiable data in prompts.
- Live Vertec/internal data must be sanitized or abstracted.
- Browser extensions can see powerful context. Keep permissions narrow and explain them.
- Pilot with fictional or non-sensitive examples before any real workflow.
- The local demo should use fictional selectors, fake host names, and toy data only.
- If the content script fetches public reference data, it must send no page or fixture data and must have a local fallback.
- Treat generated extension files as draft artefacts. A person still reviews the manifest, permissions, and behaviour.

## Pros/Cons

Pros:

- Turns a "clever hack" into something easier to review and support.
- Makes browser permissions visible instead of mysterious.
- Creates a useful governance conversation for non-technical stakeholders.
- Gives AI sceptics something inspectable: files on disk, not just a persuasive chat answer.

Cons:

- Extension packaging adds friction.
- Review and deployment may involve IT or security teams.
- A bad extension can create more risk than a simple manual process.
- A generated manifest can look official even when it still needs careful review.

## Reproducibility Checklist

- [ ] The migration brief names the current behaviour without exposing sensitive details.
- [ ] Every proposed permission has a plain-English justification.
- [ ] The plan includes a pilot stage before broader rollout.
- [ ] The team has identified who approves extension use.
- [ ] Participants can state when a userscript is still the simpler choice.
- [ ] The local demo runs without real Vertec data and still works if public reference data is unavailable.
- [ ] Generated manifest and script output are small enough for participants to read during the workshop.

## References

- [Chrome Extensions: Manifest V3](https://developer.chrome.com/docs/extensions/develop/migrate/what-is-mv3)
- [Chrome Extensions: content scripts](https://developer.chrome.com/docs/extensions/reference/manifest/content-scripts)
- [Chrome Extensions: declare permissions](https://developer.chrome.com/docs/extensions/develop/concepts/declare-permissions)
