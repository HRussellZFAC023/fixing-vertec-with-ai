# Live Vertec Structural Audit

Captured read-only on 2026-06-06 from the signed-in Vertec webapp. This file
contains only structural observations. No row values, client/project names,
people, row Text, rates, or screenshots were copied.

## Safe Findings

- The page title identified the `Services` area.
- The visible workflow vocabulary included services, weekly table, expenses,
  activities, approvals, absences, working hours, attendance, difference,
  project, phase, date, service type, hours, user, rate, and fees.
- The DOM was dominated by custom `div` UI rather than semantic form/table
  structures.
- Live-data risk was detected, so no broad text extraction was retained.

## Structural Counts

| Signal | Count |
| --- | ---: |
| `div` elements | 460 |
| Inline `style` attributes | 467 |
| `table` elements | 0 |
| `form` elements | 0 |
| `button` elements | 0 |
| `label` elements | 0 |
| `role` attributes | 0 |
| `aria-label` attributes | 0 |
| `aria-labelledby` attributes | 0 |
| Vertec grid cell data attributes | 16 |
| Inline `font-size: 11px` mentions | 65 |

## Implications For The Talk

- The human pain and agent pain are related: weak semantics make the UI harder
  to scan, harder to navigate by keyboard, and harder for browser automation to
  target safely.
- The live Services list is not a normal HTML table or form. It behaves like a
  custom grid with positioned headers, rows, cells, and a floating editor.
- Text and Hours can be driven through the visible grid editor. Project, Phase,
  and Service type are object-reference fields: typing a visible label can leave
  the underlying Vertec object blank or invalid.
- The captured webapp traffic used `boot/index.js` plus `/uisync` SignalR /
  WebSocket endpoints. The documented REST API base path returned `404` in a
  read-only probe on this tenant, so "just use the API" requires installation
  discovery and system-owner involvement.
- A userscript helper should start with visible, reviewable assistance rather
  than writes or submissions.
- Any direct API or MCP version needs stronger governance than a browser helper:
  explicit scope, dry-run mode, audit logs, and human confirmation.
- The absences/working-hours context belongs in the product story because
  services alone are not the whole timesheet job.

## Live V1 Smoke Check

After the local workshop copy was renamed, the v1 userscript was also mounted
against the real signed-in Services page in a throwaway browser context.
Sanitized result:

- The browser reached the Vertec webapp rather than an SSO login page.
- The real Services grid was detected.
- Headers included Project, Project description, Phase, Date, User, Service
  type, Text, Hours, Rate, Fees, and cost.
- The helper mounted in `live` mode.
- The live helper exposed `Previous`, `Fill text + hours`, and `Next`.

No live row values, project values, rates, fees, or service Text were copied into
this repository. The smoke check did not click a live write path.

## Privacy Note

The audit intentionally did not preserve live text content beyond known generic
workflow terms. If a future run needs screenshots or exact selectors, use a
training tenant or a redacted/local workshop copy instead.
