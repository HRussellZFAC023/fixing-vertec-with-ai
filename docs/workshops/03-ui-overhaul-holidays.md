# 03 - Holiday Review UI

## Goal

Design a small review panel that catches the obvious timesheet trap: Services are
not the whole month. Public holidays, absences, and vacation balance exist, even
when Vertec politely hides the plot in another corner.

## What Participants Build

- A compact review brief for missing workdays, planned leave, and public
  holidays.
- A local panel that summarizes training Services and absence context.
- A critique of what the panel must not infer.

## Run It

```sh
npm run dev
```

Open:

```text
http://127.0.0.1:5173/prototypes/runner.html?demo=v3
```

Expected result:

- The panel shows missing workdays.
- It shows remaining vacation balance from fixture attributes.
- It lists UK public holidays for the fixture month.
- If the public fetch fails, it falls back to a local 2026 list.

The demo may fetch [GOV.UK bank holidays JSON](https://www.gov.uk/bank-holidays.json).

## Inspect

Open:

```text
public/prototypes/v3/holiday-review.user.js
public/fixtures/vertec-workshop-copy.html
```

Check:

- `missingWorkDays()` reads `[data-vt-row-kind="workday"]`.
- `vacationBalance()` reads `data-vt-vacation-*` attributes.
- `loadBankHolidays()` fetches a public reference URL and has a local fallback.
- The panel reports context; it does not approve, reject, or judge anyone's
  health, performance, or character. Revolutionary restraint.

## Prompt On Screen

```text
We are improving a Vertec month-review flow.

The user needs to compare:
- Services rows with hours
- Missing workdays
- Planned absences
- Remaining vacation balance
- Public holidays from an approved public source

Design a compact review panel for a busy manager. Include states for:
- OK
- Missing Services entry
- Public holiday
- Planned absence
- Needs human policy review

Separate fields visible in the fixture from assumptions that would need Vertec
API or HR approval.
```

Then:

```text
Critique the design for accessibility, privacy, selector brittleness, failure
handling, and unsupported Vertec assumptions.
```

## Verification

```sh
npm run test
```

Expected result: the v3 test reports `5` missing days, `11.5 days` vacation
balance, and text mentioning UK public holidays.

## Safety Notes

- Your own timesheet is fair game. Keep colleagues' absence *reasons* (the HR
  bits) out of it, and remember the panel can point but not bless: policy
  interpretation still belongs to the organisation.

## Pros

- Connects Services to the context that makes Services safe.
- Makes failure modes visible early.
- Gives non-technical participants a concrete review artifact.

## Cons

- Public holiday data is not the same as employment policy.
- The fixture can miss messy real cases.
- A polished panel can look more authoritative than it is.

## Checklist

- [ ] Missing Services, absences, balance, and public holidays are separated.
- [ ] External fetch behavior is visible and has a fallback.
- [ ] Unsupported assumptions are named.
- [ ] Participants know what needs stakeholder approval.
