// ==UserScript==
// @name         Fixing Vertec With AI - v6 direct API dry run
// @namespace    https://github.com/HRussellZFAC023/fixing-vertec-with-ai
// @version      0.6.0
// @description  Workshop demo: prepare direct API payloads without touching live Vertec.
// @match        https://vertec.zuehlke.com/webapp/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_ID = "vertec-helper-v6";
  const mockEndpoint = "mock://vertec.local/services/bulk-draft";

  if (document.getElementById(ROOT_ID)) return;

  function isWorkshopCopy() {
    return Boolean(
      document.querySelector("[data-vt-timesheet]") &&
        document.querySelector(".vt-warning")?.textContent.includes("Workshop copy"),
    );
  }

  if (!isWorkshopCopy()) {
    console.warn("Vertec workshop helper refused to run outside the local workshop copy.");
    return;
  }

  const rows = () => Array.from(document.querySelectorAll("[data-vt-row]"));

  function field(row, name) {
    return row.querySelector(`[name="${name}"]`)?.value.trim() || "";
  }

  function monthKey() {
    return document.querySelector("[data-vt-month]")?.dataset.vtMonth || "2026-06";
  }

  function buildDraftPayload() {
    const entries = rows()
      .filter((row) => row.dataset.vtRowKind === "workday")
      .map((row) => ({
        date: row.dataset.date,
        project: field(row, "project") || "C34157, Barclaycard Website Re",
        phase: field(row, "phase") || "10_DELIVERY",
        serviceType: field(row, "serviceType") || "003_DAILY RATE",
        hours: Number(field(row, "hours") || 8),
        text: field(row, "text") || "Project delivery",
        mode: "draft-only",
      }));

    return {
      endpoint: mockEndpoint,
      method: "POST",
      mode: "dry-run",
      month: monthKey(),
      entries,
      audit: {
        source: "workshop-copy",
        humanConfirmationRequired: true,
        liveWrite: false,
      },
    };
  }

  function validatePayload(payload) {
    const errors = [];
    payload.entries.forEach((entry) => {
      if (!entry.date) errors.push("Missing date");
      if (!entry.project) errors.push(`Missing project for ${entry.date}`);
      if (!Number.isFinite(entry.hours) || entry.hours <= 0) {
        errors.push(`Invalid hours for ${entry.date}`);
      }
      if (!entry.text) errors.push(`Missing service Text for ${entry.date}`);
    });

    return {
      ok: errors.length === 0,
      errors,
      wouldCreate: payload.entries.length,
      liveWrite: false,
    };
  }

  function renderPayload(payload, validation) {
    const output = document.querySelector("[data-v6-output]");
    if (!output) return;

    output.textContent = JSON.stringify(
      {
        request: payload,
        response: validation,
      },
      null,
      2,
    );
  }

  function runDryRun() {
    const payload = buildDraftPayload();
    renderPayload(payload, validatePayload(payload));
  }

  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `
      #${ROOT_ID} {
        background: #20242b;
        border: 1px solid #52606d;
        box-shadow: 0 14px 34px rgba(25, 43, 55, 0.22);
        color: #f2f4f8;
        display: grid;
        font: 13px/1.35 Arial, Helvetica, sans-serif;
        gap: 10px;
        max-width: 480px;
        width: min(440px, calc(100vw - 244px));
        padding: 12px;
        position: fixed;
        left: clamp(224px, 52vw, calc(100vw - 456px));
        top: 16px;
        overflow-wrap: anywhere;
        z-index: 2147483647;
      }

      #${ROOT_ID} button {
        background: #66ccff;
        border: 1px solid #66ccff;
        color: #17202a;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        min-height: 34px;
      }

      #${ROOT_ID} pre {
        background: #14171c;
        border-left: 8px solid #ccff00;
        color: #e8edf2;
        font-size: 11px;
        margin: 0;
        max-height: 360px;
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
    root.setAttribute("aria-label", "Vertec helper v6 direct API dry run");
    root.innerHTML = `
      <strong>v6 direct API dry run</strong>
      <p>Prepare a local dry-run request payload without clicking through the UI or writing to a real endpoint.</p>
      <button type="button" data-action="dry-run">Build mock API request</button>
      <pre data-v6-output>{ "status": "waiting" }</pre>
    `;

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.dataset.action === "dry-run") runDryRun();
    });

    document.body.append(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
