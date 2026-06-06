// ==UserScript==
// @name         Fixing Vertec With AI - v2 templates
// @namespace    https://github.com/HRussellZFAC023/fixing-vertec-with-ai
// @version      0.2.0
// @description  Workshop demo: local templates for repeated timesheet entries.
// @match        https://vertec.zuehlke.com/webapp/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_ID = "vertec-helper-v2";
  const templates = {
    delivery: {
      label: "Barclays delivery",
      project: "C34157, Barclaycard Website Re",
      phase: "10_DELIVERY",
      serviceType: "003_DAILY RATE",
      hours: "8.00",
      text: "Project delivery",
    },
    enablement: {
      label: "Internal enablement",
      project: "Internal Enablement",
      phase: "Enablement",
      serviceType: "Internal",
      hours: "8.00",
      text: "Workshop preparation",
    },
  };

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
    return row.querySelector(`[name="${name}"]`);
  }

  function dispatchInput(element) {
    element.dispatchEvent(new Event("input", { bubbles: true }));
    element.dispatchEvent(new Event("change", { bubbles: true }));
  }

  function setValue(element, value) {
    if (!element) return;
    element.value = value;
    dispatchInput(element);
  }

  function selectedTemplate() {
    const select = document.querySelector("[data-v2-template]");
    return templates[select?.value] || templates.delivery;
  }

  function selectedRow() {
    return (
      rows().find((row) => row.dataset.selected === "true") ||
      rows().find((row) => !field(row, "hours")?.value) ||
      rows()[0] ||
      null
    );
  }

  function selectRow(row) {
    if (!row) return;
    rows().forEach((candidate) => {
      candidate.dataset.selected = candidate === row ? "true" : "false";
    });
    updateStatus(`Selected ${row.dataset.date || "row"}.`);
  }

  function isFillable(row) {
    return row?.dataset.vtRowKind !== "absence" && row?.dataset.publicHoliday !== "true";
  }

  function applyTemplate(row, template) {
    if (!row || !isFillable(row)) return false;

    setValue(field(row, "project"), template.project);
    setValue(field(row, "phase"), template.phase);
    setValue(field(row, "serviceType"), template.serviceType);
    setValue(field(row, "hours"), template.hours);

    const text = field(row, "text");
    if (text && !text.value.trim()) {
      setValue(text, template.text);
    }

    row.dataset.vtDrafted = "true";
    return true;
  }

  function fillSelected() {
    const template = selectedTemplate();
    const ok = applyTemplate(selectedRow(), template);
    updateStatus(ok ? `Drafted selected day with ${template.label}.` : "Selected row was skipped.");
  }

  function fillWeek() {
    const template = selectedTemplate();
    const count = rows().reduce((total, row) => total + (applyTemplate(row, template) ? 1 : 0), 0);
    updateStatus(`Drafted ${count} day${count === 1 ? "" : "s"} with ${template.label}.`);
  }

  function clearDrafts() {
    rows().forEach((row) => {
      ["project", "phase", "serviceType", "hours", "text"].forEach((name) => setValue(field(row, name), ""));
      delete row.dataset.vtDrafted;
    });
    updateStatus("Cleared local draft values.");
  }

  function updateStatus(message) {
    const status = document.querySelector("[data-v2-status]");
    if (status) status.textContent = message;
  }

  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `
      #${ROOT_ID} {
        background: #fff;
        border: 1px solid #a8bac6;
        box-shadow: 0 14px 34px rgba(25, 43, 55, 0.18);
        color: #1e2b34;
        display: grid;
        font: 13px/1.35 Arial, Helvetica, sans-serif;
        gap: 10px;
        max-width: 340px;
        width: min(320px, calc(100vw - 244px));
        padding: 12px;
        position: fixed;
        left: clamp(224px, 62vw, calc(100vw - 336px));
        top: 16px;
        overflow-wrap: anywhere;
        z-index: 2147483647;
      }

      #${ROOT_ID} strong {
        font-size: 14px;
      }

      #${ROOT_ID} select,
      #${ROOT_ID} button {
        border: 1px solid #9cafbd;
        font: inherit;
        min-height: 34px;
      }

      #${ROOT_ID} button {
        background: #fff;
        cursor: pointer;
        font-weight: 700;
      }

      #${ROOT_ID} button[data-primary] {
        background: #1769aa;
        border-color: #1769aa;
        color: #fff;
      }

      #${ROOT_ID} .v2-actions {
        display: grid;
        gap: 8px;
        grid-template-columns: repeat(3, 1fr);
      }

      [data-vt-row][data-vt-drafted="true"] .vt-cell {
        background: #e9f7ef;
      }

      [data-vt-row][data-selected="true"] {
        outline: 2px solid #1769aa;
        outline-offset: -2px;
      }
    `;
    document.head.append(style);
  }

  function mount() {
    addStyles();

    const root = document.createElement("section");
    root.id = ROOT_ID;
    root.setAttribute("aria-label", "Vertec helper v2 templates");
    root.innerHTML = `
      <strong>v2 local templates</strong>
      <label>
        Template
        <select data-v2-template>
          <option value="delivery">Client delivery</option>
          <option value="enablement">Internal enablement</option>
        </select>
      </label>
      <div class="v2-actions">
        <button type="button" data-action="selected">Selected</button>
        <button type="button" data-primary data-action="week">Fill week</button>
        <button type="button" data-action="clear">Clear</button>
      </div>
      <p data-v2-status>Ready. Drafts stay local until a human reviews them.</p>
    `;

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      if (target.dataset.action === "selected") fillSelected();
      if (target.dataset.action === "week") fillWeek();
      if (target.dataset.action === "clear") clearDrafts();
    });

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const row = target.closest("[data-vt-row]");
      if (row) selectRow(row);
    });

    document.body.append(root);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
