// ==UserScript==
// @name         Fixing Vertec With AI - v1 helper
// @namespace    https://github.com/heru/fixing-vertec-with-ai
// @version      0.1.0
// @description  Workshop demo: add Services-row controls to Vertec.
// @match        https://vertec.zuehlke.com/webapp/*
// @grant        none
// ==/UserScript==

(function () {
  "use strict";

  const ROOT_ID = "vertec-helper-v1";
  const CONFIG = {
    project: "C34157, Barclaycard Website Re",
    phase: "10_DELIVERY",
    serviceType: "003_DAILY RATE",
    text: "Project delivery",
    hours: "8.00",
  };
  const WORKSHOP_COPY_FIELD_SELECTORS = {
    project: ['[data-vt-service-field="project"]', '[name="project"]'],
    phase: ['[data-vt-service-field="phase"]', '[name="phase"]'],
    serviceType: ['[data-vt-service-field="serviceType"]', '[name="serviceType"]'],
    text: ['[data-vt-service-field="text"]', '[name="text"]'],
    hours: ['[data-vt-service-field="hours"]', '[name="hours"]'],
  };

  if (document.getElementById(ROOT_ID)) return;

  function textOf(element) {
    return (element?.innerText || element?.textContent || "").replace(/\s+/g, " ").trim();
  }

  function rectOf(element) {
    return element.getBoundingClientRect();
  }

  function isVisible(element) {
    const rect = rectOf(element);
    return rect.width > 0 && rect.height > 0;
  }

  function clickElement(element) {
    const rect = rectOf(element);
    const clientX = Math.max(0, Math.min(window.innerWidth - 1, rect.left + rect.width / 2));
    const clientY = Math.max(0, Math.min(window.innerHeight - 1, rect.top + rect.height / 2));

    for (const type of ["mouseover", "mousedown", "mouseup", "click"]) {
      element.dispatchEvent(
        new MouseEvent(type, {
          bubbles: true,
          cancelable: true,
          clientX,
          clientY,
          view: window,
        }),
      );
    }
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

  function makeWorkshopCopyAdapter() {
    const rows = () =>
      Array.from(document.querySelectorAll("[data-vt-services-row], [data-vt-row]")).filter(
        hasWorkshopCopyServiceFields,
      );

    function workshopField(row, name) {
      const selectors = WORKSHOP_COPY_FIELD_SELECTORS[name] || [];
      for (const selector of selectors) {
        const element = row.querySelector(selector);
        if (element) return element;
      }
      return null;
    }

    function hasWorkshopCopyServiceFields(row) {
      return Object.keys(WORKSHOP_COPY_FIELD_SELECTORS).every((name) => workshopField(row, name));
    }

    function selectedRow() {
      return (
        rows().find((row) => row.dataset.selected === "true") ||
        rows().find((row) => !workshopField(row, "hours")?.value) ||
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

    return {
      mode: "workshop-copy",
      title: "v1 Services helper",
      fillLabel: "Fill service row",
      available() {
        return rows().length > 0;
      },
      selectedLabel() {
        return selectedRow()?.dataset.date || "no selected service row";
      },
      move(delta) {
        const allRows = rows();
        if (!allRows.length) return;
        const current = selectedRow();
        const currentIndex = Math.max(0, allRows.indexOf(current));
        const nextIndex = Math.min(allRows.length - 1, Math.max(0, currentIndex + delta));
        selectRow(allRows[nextIndex]);
      },
      fill() {
        const row = selectedRow();
        if (!row) {
          updateStatus("No Services rows found.");
          return;
        }

        setValue(workshopField(row, "project"), CONFIG.project);
        setValue(workshopField(row, "phase"), CONFIG.phase);
        setValue(workshopField(row, "serviceType"), CONFIG.serviceType);
        setValue(workshopField(row, "text"), CONFIG.text);
        setValue(workshopField(row, "hours"), CONFIG.hours);

        updateStatus(`Filled service row ${row.dataset.date || "selected day"} with ${CONFIG.hours}h.`);
      },
      bindSelection() {
        document.addEventListener("click", (event) => {
          const target = event.target;
          if (!(target instanceof HTMLElement)) return;
          const row = target.closest("[data-vt-row]");
          if (row) selectRow(row);
        });

        selectRow(selectedRow());
      },
    };
  }

  function makeLiveVertecAdapter() {
    function serviceTable() {
      return Array.from(document.querySelectorAll(".qx-vertec-table")).find((table) => {
        const text = textOf(table);
        const rect = rectOf(table);
        return (
          rect.height > 250 &&
          text.includes("Project") &&
          text.includes("Phase") &&
          text.includes("Service type") &&
          text.includes("Hours")
        );
      });
    }

    function headers() {
      const table = serviceTable();
      if (!table) return [];
      const tableRect = rectOf(table);
      return Array.from(table.querySelectorAll(".qx-vertec-table-header"))
        .map((header) => ({
          element: header,
          name: textOf(header),
          rect: rectOf(header),
        }))
        .filter((header) => {
          const topDelta = Math.abs(header.rect.top - tableRect.top);
          return header.name && topDelta < 80;
        });
    }

    function header(name) {
      return headers().find((candidate) => candidate.name === name) || null;
    }

    function contentRows() {
      const table = serviceTable();
      if (!table) return [];
      return Array.from(table.querySelectorAll(".vertec-grid-row"))
        .filter((row) => rectOf(row).width > 200)
        .sort((a, b) => rectOf(a).top - rectOf(b).top);
    }

    function statusRows() {
      const table = serviceTable();
      if (!table) return [];
      return Array.from(table.querySelectorAll(".vertec-grid-row"))
        .filter((row) => rectOf(row).width <= 80)
        .sort((a, b) => rectOf(a).top - rectOf(b).top);
    }

    function rowAtY(y) {
      return contentRows().find((row) => Math.abs(rectOf(row).top - y) < 3) || null;
    }

    function selectedRow() {
      const selectedStatus = statusRows().find((row) => row.className.includes("selected"));
      if (selectedStatus) {
        const matched = rowAtY(rectOf(selectedStatus).top);
        if (matched) return matched;
      }

      return (
        contentRows().find((row) => row.className.includes("selected")) ||
        contentRows().find((row) => !textOf(liveCell(row, "Project")) && !textOf(liveCell(row, "Hours"))) ||
        contentRows()[0] ||
        null
      );
    }

    function liveCell(row, name) {
      const column = header(name);
      if (!row || !column) return null;

      const rowRect = rectOf(row);
      const columnRect = column.rect;
      const cells = Array.from(row.querySelectorAll(".vertec-grid-cell")).filter((cell) => {
        const cellRect = rectOf(cell);
        const sameRow = Math.abs(cellRect.top - rowRect.top) < 3;
        const sameColumn = Math.abs(cellRect.left - columnRect.left) < 3;
        return sameRow && sameColumn;
      });

      return cells[cells.length - 1] || null;
    }

    function selectedLabel() {
      const row = selectedRow();
      if (!row) return "no selected live row";

      const date = textOf(liveCell(row, "Date")) || "date not visible";
      const project = textOf(liveCell(row, "Project")) || "no project";
      return `${date}, ${project}`;
    }

    function requiredObjectFields(row) {
      return ["Project", "Phase", "Service type"].filter((name) => !textOf(liveCell(row, name)));
    }

    function activateCell(row, name) {
      const cell = liveCell(row, name);
      if (!cell) return null;

      clickElement(cell);
      const editor = Array.from(document.querySelectorAll(".qx-vertec-form-item-grideditor textarea"))
        .filter(isVisible)
        .sort((a, b) => rectOf(b).width - rectOf(a).width)[0];

      return editor || null;
    }

    function commitEditor(editor) {
      editor.dispatchEvent(
        new KeyboardEvent("keydown", {
          bubbles: true,
          cancelable: true,
          key: "Tab",
        }),
      );
      editor.blur();
      dispatchInput(editor);
    }

    function fillEditor(editor, value) {
      editor.focus();
      editor.value = "";
      dispatchInput(editor);
      editor.value = value;
      dispatchInput(editor);
      commitEditor(editor);
    }

    function fillLiveTextAndHours(row) {
      const textEditor = activateCell(row, "Text");
      if (!textEditor) return "Could not activate the live Text cell.";
      fillEditor(textEditor, CONFIG.text);

      const hoursEditor = activateCell(row, "Hours");
      if (!hoursEditor) return "Text changed, but the live Hours cell did not activate.";
      fillEditor(hoursEditor, CONFIG.hours);

      return null;
    }

    return {
      mode: "live",
      title: "v1 live Vertec helper",
      fillLabel: "Fill text + hours",
      available() {
        return Boolean(serviceTable());
      },
      selectedLabel,
      move(delta) {
        const rows = contentRows();
        if (!rows.length) return;
        const current = selectedRow();
        const currentIndex = Math.max(0, rows.indexOf(current));
        const nextIndex = Math.min(rows.length - 1, Math.max(0, currentIndex + delta));
        clickElement(rows[nextIndex]);
        updateStatus();
      },
      fill() {
        const row = selectedRow();
        if (!row) {
          updateStatus("No live Services row found.");
          return;
        }

        const missing = requiredObjectFields(row);
        if (missing.length) {
          updateStatus(
            `V1 hit Vertec's object-field wall: ${missing.join(", ")}. "Make no mistakes" did not survive contact with this grid.`,
          );
          return;
        }

        const error = fillLiveTextAndHours(row);
        updateStatus(error || `Filled live Text/Hours with ${CONFIG.hours}h. Check Vertec before saving.`);
      },
      bindSelection() {
        updateStatus();
      },
    };
  }

  const workshopCopyAdapter = makeWorkshopCopyAdapter();
  const liveAdapter = makeLiveVertecAdapter();
  const adapter = workshopCopyAdapter.available()
    ? workshopCopyAdapter
    : liveAdapter.available()
      ? liveAdapter
      : null;

  if (!adapter) {
    console.warn("Vertec workshop helper found neither the workshop-copy Services rows nor the live Services grid.");
    return;
  }

  function updateStatus(message) {
    const status = document.querySelector("[data-vertec-helper-status]");
    if (!status) return;

    status.textContent = message || `Selected service row: ${adapter.selectedLabel()}`;
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
        max-width: 340px;
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
        grid-template-columns: 1fr 1.6fr 1fr;
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

      #${ROOT_ID}[data-mode="live"] {
        border-color: #985b9c;
      }

      #${ROOT_ID}[data-mode="live"] button[data-primary] {
        background: #985b9c;
        border-color: #985b9c;
      }
    `;
    document.head.append(style);
  }

  function mount() {
    addStyles();

    const root = document.createElement("section");
    root.id = ROOT_ID;
    root.dataset.mode = adapter.mode;
    root.setAttribute("aria-label", "Vertec helper v1");
    root.innerHTML = `
      <strong>${adapter.title}</strong>
      <p data-vertec-helper-status>Looking for Services rows...</p>
      <div class="vh-actions">
        <button type="button" data-action="previous">Previous</button>
        <button type="button" data-primary data-action="fill">${adapter.fillLabel}</button>
        <button type="button" data-action="next">Next</button>
      </div>
    `;

    root.addEventListener("click", (event) => {
      const target = event.target;
      if (!(target instanceof HTMLElement)) return;

      const action = target.dataset.action;
      if (action === "previous") adapter.move(-1);
      if (action === "fill") adapter.fill();
      if (action === "next") adapter.move(1);
    });

    document.body.append(root);
    adapter.bindSelection();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", mount, { once: true });
  } else {
    mount();
  }
})();
