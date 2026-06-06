// ==UserScript==
// @name         Fixing Vertec With AI - v5 extension review
// @namespace    https://github.com/HRussellZFAC023/fixing-vertec-with-ai
// @version      0.5.0
// @description  Workshop demo: review the extension-shaped package before deployment.
// @match        https://vertec.example.invalid/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_ID = "vertec-helper-v5";

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

  function manifestReview() {
    return {
      command: "npm run build:extension",
      outputFolder: "dist-extension/vertec-helper",
      manifest: {
        manifest_version: 3,
        name: "Fixing Vertec With AI - Workshop Helper",
        matches: ["https://vertec.example.invalid/*"],
        permissions: [],
        content_scripts: ["content-script.js"],
      },
      reviewQuestions: [
        "Does the match pattern avoid production Vertec?",
        "Are there any powerful browser permissions?",
        "Does the content script send page data anywhere?",
        "Who would approve a pilot if this were real?",
      ],
      note: "The packaged V3 helper may fetch public GOV.UK bank-holiday JSON, with no fixture data sent.",
    };
  }

  function render() {
    const output = document.querySelector("[data-v5-output]");
    if (!output) return;
    output.textContent = JSON.stringify(manifestReview(), null, 2);
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
        left: clamp(224px, 52vw, calc(100vw - 456px));
        max-width: 480px;
        overflow-wrap: anywhere;
        padding: 12px;
        position: fixed;
        top: 16px;
        width: min(440px, calc(100vw - 244px));
        z-index: 2147483647;
      }

      #${ROOT_ID} button {
        background: #985b9c;
        border: 1px solid #985b9c;
        color: #fff;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        min-height: 34px;
      }

      #${ROOT_ID} pre {
        background: #20242b;
        border-left: 8px solid #ccff00;
        color: #f2f4f8;
        font-size: 11px;
        margin: 0;
        max-height: 340px;
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
    root.setAttribute("aria-label", "Vertec helper v5 extension review");
    root.innerHTML = `
      <strong>v5 extension package review</strong>
      <p>Before an extension feels official, read the manifest like a risk note.</p>
      <button type="button" data-action="manifest">Show manifest review</button>
      <pre data-v5-output>{ "status": "waiting" }</pre>
    `;

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.dataset.action === "manifest") render();
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
