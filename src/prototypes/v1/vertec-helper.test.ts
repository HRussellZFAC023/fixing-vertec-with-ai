import { readFile } from "node:fs/promises";
import { resolve } from "node:path";
import { JSDOM } from "jsdom";
import { describe, expect, it } from "vitest";

async function loadDemo(scriptPath = "public/prototypes/v1/vertec-helper.user.js") {
  const root = process.cwd();
  const html = await readFile(resolve(root, "public/fixtures/vertec-synthetic.html"), "utf8");
  const script = await readFile(resolve(root, scriptPath), "utf8");
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

describe("later prototype helpers", () => {
  it("v2 fills a local weekly draft from a template", async () => {
    const dom = await loadDemo("public/prototypes/v2/templates-helper.user.js");
    const document = dom.window.document;

    document.querySelector<HTMLButtonElement>("[data-action='week']")?.click();

    const rows = Array.from(document.querySelectorAll<HTMLElement>("[data-vt-row]"));
    expect(rows).toHaveLength(5);
    expect(rows.every((row) => row.dataset.vtDrafted === "true")).toBe(true);
    expect(rows.every((row) => row.querySelector<HTMLInputElement>("[name='hours']")?.value === "8.00")).toBe(
      true,
    );
  });

  it("v3 reviews missing days and vacation balance without live data", async () => {
    const dom = await loadDemo("public/prototypes/v3/holiday-review.user.js");
    const document = dom.window.document;

    await new Promise((resolve) => dom.window.setTimeout(resolve, 0));

    expect(document.querySelector("[data-vt-missing-days]")?.textContent).toBe("5");
    expect(document.querySelector("[data-vt-vacation-balance]")?.textContent).toBe("11.5 days");
    expect(document.querySelector("#vertec-helper-v3")?.textContent).toContain("UK public holidays");
  });

  it("v6 emits a mock direct API dry-run payload", async () => {
    const dom = await loadDemo("public/prototypes/v6/direct-api-dry-run.user.js");
    const document = dom.window.document;

    document.querySelector<HTMLButtonElement>("[data-action='dry-run']")?.click();

    const output = document.querySelector("[data-v6-output]")?.textContent || "";
    expect(output).toContain("mock://vertec.local/services/bulk-draft");
    expect(output).toContain("\"liveWrite\": false");
    expect(output).toContain("\"wouldCreate\": 5");
  });

  it("v4 exposes the local verification contract", async () => {
    const dom = await loadDemo("public/prototypes/v4/harness-report.user.js");
    const document = dom.window.document;

    const output = document.querySelector("[data-v4-output]")?.textContent || "";
    expect(output).toContain("npm run check");
    expect(output).toContain("five workday rows available");
    expect(output).toContain("\"ok\": true");
  });

  it("v5 exposes the extension package review", async () => {
    const dom = await loadDemo("public/prototypes/v5/extension-review.user.js");
    const document = dom.window.document;

    const output = document.querySelector("[data-v5-output]")?.textContent || "";
    expect(output).toContain("npm run build:extension");
    expect(output).toContain("https://vertec.example.invalid/*");
    expect(output).toContain("Does the match pattern avoid production Vertec?");
  });

  it("v8 blocks MCP-shaped apply until human confirmation", async () => {
    const dom = await loadDemo("public/prototypes/v8/mcp-dry-run.user.js");
    const document = dom.window.document;

    let output = document.querySelector("[data-v8-output]")?.textContent || "";
    expect(output).toContain("\"status\": \"blocked\"");

    document.querySelector<HTMLButtonElement>("[data-action='confirm']")?.click();

    output = document.querySelector("[data-v8-output]")?.textContent || "";
    expect(output).toContain("would-apply-in-demo-only");
    expect(output).toContain("\"liveWrite\": false");
  });
});
