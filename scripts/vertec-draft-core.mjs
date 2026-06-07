import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";

export const root = resolve(import.meta.dirname, "..");
export const fixturePath = resolve(root, "public/fixtures/vertec-workshop-copy.html");

export const defaultTemplate = {
  project: "C34157, Barclaycard Website Re",
  phase: "10_DELIVERY",
  serviceType: "003_DAILY RATE",
  text: "Project delivery",
  hours: 8,
};

export async function loadWorkshopDocument(path = fixturePath) {
  const html = await readFile(path, "utf8");
  return new JSDOM(html, {
    url: "http://127.0.0.1:5173/fixtures/vertec-workshop-copy.html",
  }).window.document;
}

export function readWorkshopState(document) {
  const timesheet = document.querySelector("[data-vt-month]");
  const absence = document.querySelector("[data-vt-absences]");
  const rows = Array.from(document.querySelectorAll("[data-vt-row]")).map((row) => {
    const field = (name) => row.querySelector(`[name="${name}"]`)?.value?.trim() || "";
    return {
      date: row.dataset.date || "",
      kind: row.dataset.vtRowKind || "unknown",
      publicHoliday: row.dataset.publicHoliday === "true",
      project: field("project"),
      phase: field("phase"),
      serviceType: field("serviceType"),
      text: field("text"),
      hours: Number(field("hours") || 0),
    };
  });

  const allowance = Number(absence?.dataset.vtVacationAllowance || 0);
  const used = Number(absence?.dataset.vtVacationUsed || 0);
  const planned = Number(absence?.dataset.vtVacationPlanned || 0);
  const plannedAbsences = rows.filter((row) => row.kind === "absence");

  return {
    month: timesheet?.dataset.vtMonth || "unknown",
    country: timesheet?.dataset.vtCountry || "england-and-wales",
    vacation: {
      allowance,
      used,
      planned,
      remaining: allowance - used - planned,
    },
    plannedAbsences,
    rows,
  };
}

export function prepareTimesheetDraft(state, template = defaultTemplate) {
  return state.rows
    .filter((row) => row.kind === "workday" && !row.publicHoliday)
    .map((row) => ({
      date: row.date,
      project: row.project || template.project,
      phase: row.phase || template.phase,
      serviceType: row.serviceType || template.serviceType,
      text: row.text || template.text,
      hours: row.hours || template.hours,
      source: "workshop-copy",
      mode: "draft-only",
    }));
}

export function validateDraft(entries) {
  const errors = [];
  const warnings = [];

  for (const entry of entries) {
    if (!entry.date) errors.push("Missing date");
    if (!entry.project) errors.push(`Missing project for ${entry.date || "unknown date"}`);
    if (!entry.phase) errors.push(`Missing phase for ${entry.date || "unknown date"}`);
    if (!entry.serviceType) errors.push(`Missing service type for ${entry.date || "unknown date"}`);
    if (!entry.text) errors.push(`Missing service Text for ${entry.date || "unknown date"}`);
    if (!Number.isFinite(Number(entry.hours)) || Number(entry.hours) <= 0) {
      errors.push(`Invalid hours for ${entry.date || "unknown date"}`);
    }
  }

  if (entries.length === 0) warnings.push("No workday entries were drafted.");

  return {
    ok: errors.length === 0,
    errors,
    warnings,
    wouldCreate: entries.length,
    liveWrite: false,
  };
}

export function buildDirectApiDryRun(state, entries = prepareTimesheetDraft(state)) {
  return {
    request: {
      endpoint: "mock://vertec.local/services/bulk-draft",
      method: "POST",
      mode: "dry-run",
      month: state.month,
      entries,
      audit: {
        source: "workshop-copy",
        observedWebappTransport: "SignalR/WebSocket via /uisync, not a friendly POST /timesheet",
        supportedApiAccessRequired: true,
        humanConfirmationRequired: true,
        plannedAbsencesSkipped: state.plannedAbsences.length,
        vacationRemainingDays: state.vacation.remaining,
        liveWrite: false,
      },
    },
    response: validateDraft(entries),
  };
}

export function buildMcpTranscript(state, confirmedByHuman = false) {
  const entries = prepareTimesheetDraft(state);
  const validation = validateDraft(entries);

  return [
    {
      role: "user",
      content: "Fill this month with 8h project delivery entries, but only as a draft.",
    },
    {
      tool: "vertec.checkSession",
      output: {
        month: state.month,
        canReadServices: true,
        canWriteServices: false,
        plannedAbsences: state.plannedAbsences.length,
        vacationRemainingDays: state.vacation.remaining,
        liveWrite: false,
      },
    },
    {
      tool: "vertec.prepareTimesheetDraft",
      output: {
        entries,
        writesLiveData: false,
      },
    },
    {
      tool: "vertec.validateDraft",
      output: validation,
    },
    {
      tool: "vertec.applyDraft",
      output: confirmedByHuman
        ? {
            status: "would-apply-in-demo-only",
            liveWrite: false,
          }
        : {
            status: "blocked",
            reason: "Human confirmation has not been given.",
            liveWrite: false,
          },
    },
  ];
}
