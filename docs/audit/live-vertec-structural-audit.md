# Live Vertec structural audit

Captured on 2026-06-06 from the signed-in Vertec webapp.

Updated on 2026-06-07 from the signed-in Absences tab.

## Findings

- The page title identified the `Services` area.
- The visible workflow vocabulary included services, weekly table, expenses,
  activities, approvals, absences, working hours, attendance, difference,
  project, phase, date, service type, hours, user, rate, and fees.
- The DOM was dominated by custom `div` UI rather than semantic form/table
  structures.

## Structural counts

### Services tab

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

### Absences tab

| Signal | Count |
| --- | ---: |
| `div` elements | 1705 |
| `table` elements | 0 |
| `form` elements | 0 |
| `button` elements | 0 |
| `label` elements | 0 |
| `role` attributes | 0 |
| `input`, `textarea`, or `select` elements | 2 |
| Vertec custom grid widgets | 1 |
| Vertec grid rows | 100 |
| Vertec grid cells | 650 |

The Absences grid exposed the columns Date, until date, Type, Absence group,
Description, and Hours. The visible data model mixes public-holiday-style rows
with booked absence rows, so a Services helper must treat absence and holiday
context as input to the draft, not decoration around it.

## Implications for the talk

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
- A userscript helper should start with visible, reviewable assistance. Writes
  and submissions can come later.
- Any direct API or MCP version needs stronger governance than a browser helper:
  explicit scope, dry-run mode, audit logs, and human confirmation.
- The absences/working-hours context belongs in the product story because
  services alone are not the whole timesheet job.
- The Absences tab is its own custom grid, not a simple month summary. That
  makes V3 more than a nice review panel: it is where the helper learns whether
  a Services row should exist at all.

## Live v1 smoke check

After the local workshop copy was renamed, the v1 userscript was also mounted
against the real signed-in Services page. Result:

- The browser reached the Vertec webapp rather than an SSO login page.
- The real Services grid was detected.
- Headers included Project, Project description, Phase, Date, User, Service
  type, Text, Hours, Rate, Fees, and cost.
- The helper mounted in `live` mode.
- The live helper exposed `Previous`, `Fill text + hours`, and `Next`.

The smoke check stopped at detection and did not click a live write path.

## Live network/auth check

A later attempt tried a temporary Services `Text` edit and immediate restore
while watching the network. That attempt did not reach the Services grid. It
landed on `Vertec Web App Login`.

Result:

- The request reached `vertec.zuehlke.com/webapp/`, not the Workspace ONE launch
  URL.
- Vertec served its own login page with `vertec_username`, `password`, and
  `save_credentials` fields.
- The login page loaded Vertec assets including `login.css` and `autologin.js`.
- No `/uisync/connect` WebSocket was opened during that attempt.

Implication: replaying browser cookies is not a reliable automation strategy.
There are at least two boundaries to design for:

1. Zühlke access/SSO launches the Vertec application.
2. Vertec's own application session decides whether the Services grid is usable.

For MCP or direct API work, the first tool should be a session/capability check
before anything like `applyDraft` runs. If the system is at the Vertec login
page, the correct output is to block and return instructions for a supported auth
path. Cookies expire, so build for that case.

## Next runs

If a future run needs screenshots or exact selectors, just grab them from the
signed-in Services page. Filling your own current-month timesheet is fair game to
experiment with. The one line of common sense: someone else's client, HR, or
contract data, and any path that writes to production, deserve a heads-up first.
