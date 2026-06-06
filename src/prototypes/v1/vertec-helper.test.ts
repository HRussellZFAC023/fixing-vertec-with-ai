import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

async function loadDemo() {
  const root = process.cwd();
  const html = await readFile(resolve(root, "public/fixtures/vertec-synthetic.html"), "utf8");
  const script = await readFile(
    resolve(root, "public/prototypes/v1/vertec-helper.user.js"),
    "utf8",
  );
  const dom = new JSDOM(html, {
    runScripts: "outside-only",
    url: "http://127.0.0.1:5173/fixtures/vertec-synthetic.html",
  });

  dom.window.eval(script);

  return dom;
}

describe("v1 userscript helper", () => {
  it("mounts the helper controls", async () => {
    const dom = await loadDemo();

    expect(dom.window.document.querySelector("#vertec-helper-v1")).not.toBeNull();
    expect(dom.window.document.querySelector("[data-action='fill']")?.textContent).toContain("Fill 8h");
  });

  it("fills the selected row with default workshop values", async () => {
    const dom = await loadDemo();
    const document = dom.window.document;

    document.querySelector<HTMLButtonElement>("[data-action='fill']")?.click();

    const selected = document.querySelector<HTMLElement>("[data-vt-row][data-selected='true']");
    expect(selected?.querySelector<HTMLInputElement>("[name='hours']")?.value).toBe("8.00");
    expect(selected?.querySelector<HTMLSelectElement>("[name='project']")?.value).toBe(
      "Client Delivery Project",
    );
    expect(selected?.querySelector<HTMLInputElement>("[name='comment']")?.value).toBe(
      "Project delivery",
    );
  });

  it("moves selection to the next and previous rows", async () => {
    const dom = await loadDemo();
    const document = dom.window.document;

    document.querySelector<HTMLButtonElement>("[data-action='next']")?.click();
    expect(document.querySelector<HTMLElement>("[data-vt-row][data-selected='true']")?.dataset.date).toBe(
      "2026-06-02",
    );

    document.querySelector<HTMLButtonElement>("[data-action='previous']")?.click();
    expect(document.querySelector<HTMLElement>("[data-vt-row][data-selected='true']")?.dataset.date).toBe(
      "2026-06-01",
    );
  });
});
