# 04 - Harness with Vite, Vitest, and Playwright

## Goal

Stop accepting "it worked in the chat window" as evidence. Build the small local
harness that proves a Vertec helper against a local workshop copy.

## What participants build

- A Vite-served fixture and prototype runner.
- Vitest/JSDOM checks for userscript behavior.
- Playwright checks for the browser path.
- A concise verification contract participants can inspect.

## Run it

```sh
npm run dev
```

Open:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v4
```

Click `Show verification contract`.

Expected result: the panel prints JSON naming the command, fixture, unit tests,
e2e tests, and checks such as `five workday rows available`.

## Commands

Focused unit proof:

```sh
npm run test
```

Full local proof:

```sh
npm run check
```

What `npm run check` does:

```text
vitest run
node scripts/vertec-api-dry-run.mjs --check
node scripts/vertec-mcp-smoke.mjs
node scripts/build-extension.mjs
vite build && node scripts/copy-docs.mjs
playwright test
```

The package script spells this slightly differently, because npm scripts enjoy
being a tiny pipeline language.

## Inspect

Open:

```text
package.json
vitest.config.ts
playwright.config.ts
public/prototypes/v4/harness-report.user.js
src/prototypes/v1/vertec-helper.test.ts
tests/e2e/site.spec.ts
```

Check:

- Vitest runs `src/**/*.test.ts` in Node with JSDOM.
- Playwright serves the built site at `http://127.0.0.1:5187`.
- The e2e test enters the iframe and clicks `Fill service row`.
- The test asserts the visible Services row value, not an internal implementation
  variable.
- Later e2e checks exercise V3 planned-absence context and V6 dry-run output, so
  the late-stage slides have real proof behind them.
- No test needs live Vertec access.

## Prompt on screen

```text
Given this Vertec Services helper, design the smallest local harness.

Use:
- Vite for the local site
- Vitest with JSDOM for userscript DOM behavior
- Playwright for the browser click path

Output:
- Fixture file
- Unit test scenarios
- E2E scenario
- Expected command
- What to inspect when a test fails

Don't invent an API: Vertec has no friendly REST POST, so the harness drives the DOM.
```

## Failure drill

Ask participants where they would look if:

- The helper does not mount: check fixture guard and metadata scope.
- `Fill service row` does nothing: check selectors and event dispatch.
- Playwright cannot see the row: check iframe locator and Vite preview port.
- The fixture passes but production would fail: congratulations, local tests are
  not prophecy.

## References

- [Vite guide](https://vite.dev/guide/)
- [Vitest guide](https://vitest.dev/guide/)
- [Playwright getting started](https://playwright.dev/docs/intro)

## Checklist

- [ ] Harness data is local workshop-copy data.
- [ ] Unit and e2e tests cover observable behavior.
- [ ] Commands are explicit.
- [ ] The harness states what it does not prove.
- [ ] Participants can trace a failure from browser symptom to file.
