// ==UserScript==
// @name         Fixing Vertec With AI - v4 harness report
// @namespace    https://github.com/HRussellZFAC023/fixing-vertec-with-ai
// @version      0.4.0
// @description  Workshop demo: show the local verification harness around the synthetic fixture.
// @match        https://vertec.example.invalid/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_ID = "vertec-helper-v4";

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

  function report() {
    const workdayCount = document.querySelectorAll("[data-vt-row-kind='workday']").length;
    const selectedCount = document.querySelectorAll("[data-vt-row][data-selected='true']").length;

    return {
      command: "npm run check",
      fixture: "public/fixtures/vertec-synthetic.html",
      unitTests: "src/prototypes/v1/vertec-helper.test.ts",
      e2eTests: "tests/e2e/site.spec.ts",
      checks: [
        { name: "synthetic fixture present", ok: true },
        { name: "five workday rows available", ok: workdayCount === 5 },
        { name: "one selected row", ok: selectedCount === 1 },
        { name: "no live Vertec access required", ok: true },
      ],
    };
  }

  function render() {
    const output = document.querySelector("[data-v4-output]");
    if (!output) return;
    output.textContent = JSON.stringify(report(), null, 2);
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
        left: clamp(224px, 55vw, calc(100vw - 436px));
        max-width: 460px;
        overflow-wrap: anywhere;
        padding: 12px;
        position: fixed;
        top: 16px;
        width: min(420px, calc(100vw - 244px));
        z-index: 2147483647;
      }

      #${ROOT_ID} button {
        background: #0099cc;
        border: 1px solid #0099cc;
        color: #fff;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        min-height: 34px;
      }

      #${ROOT_ID} pre {
        background: #20242b;
        color: #f2f4f8;
        font-size: 11px;
        margin: 0;
        max-height: 320px;
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
    root.setAttribute("aria-label", "Vertec helper v4 harness report");
    root.innerHTML = `
      <strong>v4 harness report</strong>
      <p>The browser demo shows what the command-line harness proves against this synthetic fixture.</p>
      <button type="button" data-action="report">Show verification contract</button>
      <pre data-v4-output>{ "status": "waiting" }</pre>
    `;

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.dataset.action === "report") render();
    });

    document.body.append(root);
    render();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
