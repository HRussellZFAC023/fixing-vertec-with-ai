# 06 - Direct API Dry Run

## Goal

Ask whether the helper should stop poking the DOM and use a proper boundary.

The answer might be "yes, eventually". It is not "give the browser a token and
hope Vertec develops a conscience".

## What Participants Build

- A contract-first map for reading and drafting Services entries.
- A mock direct API payload with training data.
- Validation and audit fields.
- A decision note on whether real API access is justified.

## Run It

```sh
npm run dev
```

Open:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v6
```

Click `Build mock API request`.

Expected result: the panel prints JSON with:

- `endpoint: "mock://vertec.local/services/bulk-draft"`
- `method: "POST"`
- `mode: "dry-run"`
- Services entries containing `date`, `project`, `phase`, `serviceType`,
  `hours`, and `text`.
- `humanConfirmationRequired: true`
- `liveWrite: false`

## Inspect

Open:

```text
public/prototypes/v6/direct-api-dry-run.user.js
src/prototypes/v1/vertec-helper.test.ts
```

Check:

- `buildDraftPayload()` reads workshop-copy DOM rows.
- `validatePayload()` fails missing date, project, hours, or service Text.
- The endpoint is `mock://`, not a live Vertec URL.
- The response says what would be created, not what was created.
- No API token is present. Tiny miracles do happen.

Live discovery from the workshop account:

- The captured webapp boot traffic loads `boot/index.js`, negotiates
  `/uisync/negotiate`, and then opens `/uisync/connect` over WebSockets.
- A read-only probe of the documented REST base path returned `404` on this
  installation, which likely means the REST web service is not enabled at that
  URL here.
- A later attempt to capture a temporary Services `Text` edit did not reach the
  Services grid. Vertec served its own login page with `vertec_username`,
  `password`, and `save_credentials` fields instead.
- Translation: "use the API" is a discovery task, not a magic spell. "Reuse the
  browser cookies" is also not a plan. Make no mistakes, and then still check
  the tenant.

## Auth Reality

The live system has at least two gates:

| Gate | What It Proves | Why It Matters |
| --- | --- | --- |
| Zühlke access / SSO launch | The user can reach the Vertec app entry point. | This is not the same as an active Vertec app session. |
| Vertec app session | The Services grid is loaded and `/uisync` can connect. | Without this, automation is staring at a login form in a nice suit. |
| Supported API credential | A service/API caller is allowed to read or write records. | MCP should not scrape private browser cookies and call that architecture. |

For a real pilot, the integration should ask system owners which supported
surface exists:

- REST web service enabled for a scoped technical user.
- XML/SOAP-style interface if that is the supported installation path.
- A browser helper that stays human-confirmed and never pretends it is an API.

The demo therefore uses a dry-run contract. It shows the shape of the request a
proper integration would need, not the captured webapp transport.

## Prompt On Screen

```text
We are considering a direct API integration for a Vertec Services workflow.

Using only sanitized data, define a dry-run contract.

Read inputs:
- Month
- Existing Services rows
- Absence/public-holiday context if approved

Draft write fields:
- Date
- Project
- Phase
- Service type
- Text
- Hours

Output:
- Request JSON
- Validation rules
- Audit log fields
- Permission needed
- Human approval point
- Rollback or correction path

No live endpoints, no credentials, no copied payloads.
```

## Dry-Run Rules

- The dry run should use the same field names and validation logic a real
  integration would need.
- It must never mutate live records.
- It must log what evidence was used.
- It must show the exact proposed entries before any apply step.
- It must make approval boring, explicit, and cancellable. Boring is a feature.

## References

- [Vertec REST API](https://www.vertec.com/en-gb/kb/vertec-rest-api/)
- [Vertec XML interface note](https://www.vertec.com/en-at/kb/vertec-xml-interface/)

## Safety Notes

- Never paste API keys, bearer tokens, cookies, database exports, or live Vertec
  payloads into AI tools.
- System owners approve real API access.
- Browser helpers and API integrations have different risk profiles. Do not
  smuggle one into the other because the mock looked tidy.
- Do not store or replay `vertec_auth_token`, `vertec_session_id`, or access
  gateway cookies as the basis of an MCP server. That is how a demo becomes a
  security incident wearing a lanyard.

## Pros

- Reduces fragile DOM automation if the API is supported.
- Makes contracts, validation, and audit visible.
- Creates a clean discussion with system owners.

## Cons

- Write access can affect real records.
- The documented REST API may not be enabled on the tenant, may sit behind a
  different base URL, or may need a separate web-service/API-token setup.
- The live webapp may use SignalR/WebSocket state rather than a friendly JSON
  `POST /timesheet` endpoint.
- Access control, audit, rollback, and rate limits become mandatory.
- A mock proves the shape of the conversation, not production safety.

## Checklist

- [ ] Payloads use fake identifiers and training entries.
- [ ] Read, draft write, validation, and audit are separated.
- [ ] Live writes are impossible in the demo.
- [ ] Permission and approval owners are named.
- [ ] Participants can state what changes before a real pilot.
