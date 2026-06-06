// ==UserScript==
// @name         Fixing Vertec With AI - v1 helper
// @namespace    https://github.com/heru/fixing-vertec-with-ai
// @version      0.1.0
// @description  Workshop demo: add Fill, Previous, and Next controls to a Vertec-like timesheet.
// @match        https://vertec.example.invalid/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_ID = "vertec-helper-v1";
  const CONFIG = {
    project: "Client Delivery Project",
    hours: "8.00",
    comment: "Project delivery",
  };

  if (document.getElementById(ROOT_ID)) return;

  const rows = () => Array.from(document.querySelectorAll("[data-vt-row]"));

  function field(row, name) {
    return row.querySelector(`[name="${name}"]`);
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
    updateStatus();
  }

  function move(delta) {
    const allRows = rows();
    if (!allRows.length) return;
    const current = selectedRow();
    const currentIndex = Math.max(0, allRows.indexOf(current));
    const nextIndex = Math.min(allRows.length - 1, Math.max(0, currentIndex + delta));
    selectRow(allRows[nextIndex]);
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

  function fillCurrentRow() {
    const row = selectedRow();
    if (!row) {
      updateStatus("No timesheet rows found.");
      return;
    }

    setValue(field(row, "project"), CONFIG.project);
    setValue(field(row, "hours"), CONFIG.hours);

    const comment = field(row, "comment");
    if (comment && !comment.value.trim()) {
      setValue(comment, CONFIG.comment);
    }

    updateStatus(`Filled ${row.dataset.date || "selected day"} with ${CONFIG.hours}h.`);
  }

  function updateStatus(message) {
    const status = document.querySelector("[data-vertec-helper-status]");
    if (!status) return;

    const row = selectedRow();
    const date = row?.dataset.date || "no selected day";
    status.textContent = message || `Selected: ${date}`;
  }

  function addStyles() {
    const style = document.createElement("style");
    style.textContent = `
      #${ROOT_ID} {
        background: #ffffff;
        border: 1px solid #a8bac6;
        border-radius: 8px;
        box-shadow: 0 14px 34px rgba(25, 43, 55, 0.18);
        color: #1e2b34;
        display: grid;
        font: 13px/1.35 Arial, Helvetica, sans-serif;
        gap: 10px;
        max-width: 300px;
        padding: 12px;
        position: fixed;
        right: 16px;
        top: 16px;
        z-index: 2147483647;
      }

      #${ROOT_ID} strong {
        font-size: 14px;
      }

      #${ROOT_ID} p {
        color: #4d6475;
        margin: 0;
      }

      #${ROOT_ID} .vh-actions {
        display: grid;
        gap: 8px;
        grid-template-columns: 1fr 1.4fr 1fr;
      }

      #${ROOT_ID} button {
        background: #ffffff;
        border: 1px solid #9cafbd;
        border-radius: 6px;
        color: #173241;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        min-height: 34px;
      }

      #${ROOT_ID} button[data-primary] {
        background: #1769aa;
        border-color: #1769aa;
        color: #ffffff;
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
    root.setAttribute("aria-label", "Vertec helper v1");
    root.innerHTML = `
      <strong>v1 timesheet helper</strong>
      <p data-vertec-helper-status>Looking for timesheet rows...</p>
      <div class="vh-actions">
        <button type="button" data-action="previous">Previous</button>
        <button type="button" data-primary data-action="fill">Fill 8h</button>
        <button type="button" data-action="next">Next</button>
      </div>
    `;

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const action = target.dataset.action;
      if (action === "previous") move(-1);
      if (action === "fill") fillCurrentRow();
      if (action === "next") move(1);
    });

    document.body.append(root);

    document.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;
      const row = target.closest("[data-vt-row]");
      if (row) selectRow(row);
    });

    selectRow(selectedRow());
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
