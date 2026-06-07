// ==UserScript==
// @name         Fixing Vertec With AI - v3 holiday review
// @namespace    https://github.com/HRussellZFAC023/fixing-vertec-with-ai
// @version      0.3.0
// @description  Workshop demo: vacation balance, missing days, and UK public holiday review.
// @match        https://vertec.zuehlke.com/webapp/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_ID = "vertec-helper-v3";
  const GOV_BANK_HOLIDAYS_URL = "https://www.gov.uk/bank-holidays.json";

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

  function monthKey() {
    return document.querySelector("[data-vt-month]")?.dataset.vtMonth || "2026-06";
  }

  function divisionKey() {
    return document.querySelector("[data-vt-country]")?.dataset.vtCountry || "england-and-wales";
  }

  function field(row, name) {
    return row.querySelector(`[name="${name}"]`);
  }

  function rowHasHours(row) {
    return Boolean(field(row, "hours")?.value.trim());
  }

  function missingWorkDays() {
    return rows().filter((row) => row.dataset.vtRowKind === "workday" && !rowHasHours(row)).length;
  }

  function plannedAbsences() {
    return rows().filter((row) => row.dataset.vtRowKind === "absence").length;
  }

  function vacationBalance() {
    const absences = document.querySelector("[data-vt-absences]");
    const allowance = Number(absences?.dataset.vtVacationAllowance || 0);
    const used = Number(absences?.dataset.vtVacationUsed || 0);
    const planned = Number(absences?.dataset.vtVacationPlanned || 0);
    return { allowance, used, planned, remaining: allowance - used - planned };
  }

  function setSummary(selector, value) {
    const target = document.querySelector(selector);
    if (target) target.textContent = value;
  }

  function localBankHolidayFallback() {
    return {
      "england-and-wales": {
        events: [
          { title: "New Year's Day", date: "2026-01-01" },
          { title: "Good Friday", date: "2026-04-03" },
          { title: "Easter Monday", date: "2026-04-06" },
          { title: "Early May bank holiday", date: "2026-05-04" },
          { title: "Spring bank holiday", date: "2026-05-25" },
          { title: "Summer bank holiday", date: "2026-08-31" },
          { title: "Christmas Day", date: "2026-12-25" },
          { title: "Boxing Day", date: "2026-12-28" },
        ],
      },
    };
  }

  async function loadBankHolidays() {
    if (!window.fetch) return localBankHolidayFallback();

    try {
      const response = await fetch(GOV_BANK_HOLIDAYS_URL, { cache: "force-cache" });
      if (!response.ok) throw new Error("Bank holiday API unavailable");
      return await response.json();
    } catch {
      return localBankHolidayFallback();
    }
  }

  function holidaysForMonth(payload) {
    const division = payload[divisionKey()] || payload["england-and-wales"] || { events: [] };
    return division.events.filter((event) => event.date.startsWith(monthKey()));
  }

  function updatePanel(holidays) {
    const missing = missingWorkDays();
    const absences = plannedAbsences();
    const balance = vacationBalance();

    setSummary("[data-vt-public-holidays-count]", String(holidays.length));
    setSummary("[data-vt-planned-absences]", String(absences));
    setSummary("[data-vt-missing-days]", String(missing));
    setSummary("[data-vt-vacation-balance]", `${balance.remaining.toFixed(1)} days`);

    const status = document.querySelector("[data-v3-status]");
    if (status) {
      status.textContent = `${missing} missing work days. ${absences} planned absences. ${holidays.length} UK public holidays in ${monthKey()}. ${balance.remaining.toFixed(1)} vacation days remain after planned leave.`;
    }

    const list = document.querySelector("[data-v3-holidays]");
    if (list) {
      list.innerHTML = holidays.length
        ? holidays.map((event) => `<li>${event.date}: ${event.title}</li>`).join("")
        : "<li>No UK public holidays found for this fixture month.</li>";
    }
  }

  async function refreshReview() {
    const payload = await loadBankHolidays();
    updatePanel(holidaysForMonth(payload));
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
        max-width: 380px;
        width: min(340px, calc(100vw - 244px));
        padding: 12px;
        position: fixed;
        left: clamp(224px, 60vw, calc(100vw - 356px));
        top: 16px;
        overflow-wrap: anywhere;
        z-index: 2147483647;
      }

      #${ROOT_ID} strong {
        font-size: 14px;
      }

      #${ROOT_ID} button {
        background: #1769aa;
        border: 1px solid #1769aa;
        color: #fff;
        cursor: pointer;
        font: inherit;
        font-weight: 700;
        min-height: 34px;
      }

      #${ROOT_ID} ul {
        margin: 0;
        padding-left: 18px;
      }

      #${ROOT_ID} li {
        margin-bottom: 3px;
      }
    `;
    document.head.append(style);
  }

  function mount() {
    addStyles();

    const root = document.createElement("section");
    root.id = ROOT_ID;
    root.setAttribute("aria-label", "Vertec helper v3 holiday review");
    root.innerHTML = `
      <strong>v3 month review</strong>
      <p data-v3-status>Checking missing days, vacation balance, and UK public holidays...</p>
      <ul data-v3-holidays></ul>
      <button type="button" data-action="refresh">Refresh review</button>
    `;

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (target instanceof HTMLElement && target.dataset.action === "refresh") {
        refreshReview();
      }
    });

    document.body.append(root);
    refreshReview();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
