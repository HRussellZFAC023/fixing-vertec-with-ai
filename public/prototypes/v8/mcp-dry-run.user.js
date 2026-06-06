// ==UserScript==
// @name         Fixing Vertec With AI - v8 MCP dry run
// @namespace    https://github.com/HRussellZFAC023/fixing-vertec-with-ai
// @version      0.8.0
// @description  Workshop demo: chat request to MCP-shaped tool calls with confirmation.
// @match        https://vertec.example.invalid/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_ID = "vertec-helper-v8";
  const requestText = "Fill this month with 8h project delivery entries, but only as a draft.";

  if (document.getElementById(ROOT_ID)) return;

  function isSyntheticFixture() {
    return Boolean(
      document.querySelector("[data-vt-timesheet]") &&
        document.querySelector(".vt-warning")?.textContent.includes("Fixture only"),
    );
  }

  if (!isSyntheticFixture()) {
    console.warn("Vertec workshop helper refused to run outside the synthetic fixture.");
    return;
  }

  function rows() {
    return Array.from(document.querySelectorAll("[data-vt-row]"));
  }

  function monthKey() {
    return document.querySelector("[data-vt-month]")?.dataset.vtMonth || "2026-06";
  }

  function toolTranscript(confirmed) {
    const workdays = rows().filter((row) => row.dataset.vtRowKind === "workday");
    const draft = workdays.map((row) => ({
      date: row.dataset.date,
      hours: 8,
      project: "Client Delivery Project",
      comment: "Project delivery",
    }));

    return [
      {
        role: "user",
        content: requestText,
      },
      {
        role: "assistant",
        content: "I will prepare a draft and stop before any live write.",
      },
      {
        tool: "vertec.prepareTimesheetDraft",
        input: {
          month: monthKey(),
          defaultHours: 8,
          project: "Client Delivery Project",
          commentPolicy: "required",
        },
        output: {
          entries: draft,
          writesLiveData: false,
        },
      },
      {
        tool: "vertec.validateDraft",
        input: {
          entries: draft.length,
          checkPublicHolidays: true,
          checkAbsences: true,
        },
        output: {
          ok: true,
          warnings: ["Synthetic fixture has no real Vertec state.", "Human approval required."],
        },
      },
      {
        tool: "vertec.applyDraft",
        input: {
          draftId: "synthetic-draft-001",
          confirmedByHuman: confirmed,
        },
        output: confirmed
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

  function render(confirmed) {
    const output = document.querySelector("[data-v8-output]");
    if (!output) return;
    output.textContent = JSON.stringify(toolTranscript(confirmed), null, 2);
  }

  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `
      #${ROOT_ID} {
        background: #fff;
        border: 1px solid #a8bac6;
        box-shadow: 0 14px 34px rgba(25, 43, 55, 0.2);
        color: #1e2b34;
        display: grid;
        font: 13px/1.35 Arial, Helvetica, sans-serif;
        gap: 10px;
        max-width: 520px;
        width: min(460px, calc(100vw - 244px));
        padding: 12px;
        position: fixed;
        left: clamp(224px, 50vw, calc(100vw - 476px));
        top: 16px;
        overflow-wrap: anywhere;
        z-index: 2147483647;
      }

      #${ROOT_ID} .chat-request {
        background: #eef6fb;
        border-left: 8px solid #0099cc;
        padding: 9px;
      }

      #${ROOT_ID} .v8-actions {
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr 1fr;
      }

      #${ROOT_ID} button {
        background: #fff;
        border: 1px solid #9cafbd;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        min-height: 34px;
      }

      #${ROOT_ID} button[data-primary] {
        background: #0099cc;
        border-color: #0099cc;
        color: #fff;
      }

      #${ROOT_ID} pre {
        background: #20242b;
        color: #f2f4f8;
        font-size: 11px;
        margin: 0;
        max-height: 330px;
        overflow: auto;
        padding: 10px;
        white-space: pre-wrap;
      }
    `;
    document.head.append(style);
  }

  function mount() {
    addStyles();

    const root = document.createElement("section");
    root.id = ROOT_ID;
    root.setAttribute("aria-label", "Vertec helper v8 MCP dry run");
    root.innerHTML = `
      <strong>v8 MCP-shaped dry run</strong>
      <p class="chat-request">${requestText}</p>
      <div class="v8-actions">
        <button type="button" data-action="plan">Decline / keep blocked</button>
        <button type="button" data-primary data-action="confirm">Simulate approved apply (no write)</button>
      </div>
      <pre data-v8-output>{ "status": "waiting" }</pre>
    `;

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      if (target.dataset.action === "plan") render(false);
      if (target.dataset.action === "confirm") render(true);
    });

    document.body.append(root);
    render(false);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
