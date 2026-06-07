import { expect, test } from "@playwright/test";

test("website loads the v1 fixture and userscript helper", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Fixing Vertec With AI" })).toBeVisible();

  await page.goto("/#/demo-v1");

  const frame = page.frameLocator("#demo-frame");
  await expect(frame.getByText("v1 Services helper")).toBeVisible();
  await frame.getByRole("button", { name: "Fill service row" }).click();

  const selectedRow = frame.locator("[data-vt-row][data-selected='true']");
  await expect(selectedRow.locator("[data-vt-service-field='project']")).toHaveValue(
    "C34157, Barclaycard Website Re",
  );
  await expect(selectedRow.locator("[data-vt-service-field='phase']")).toHaveValue("10_DELIVERY");
  await expect(selectedRow.locator("[data-vt-service-field='serviceType']")).toHaveValue("003_DAILY RATE");
  await expect(selectedRow.locator("[data-vt-service-field='text']")).toHaveValue("Project delivery");
  await expect(selectedRow.locator("[data-vt-service-field='hours']")).toHaveValue("8.00");
  await expect(frame.locator("[data-vt-attendance-field='from']")).toHaveValue("");
  await expect(frame.locator("[data-vt-attendance-field='to']")).toHaveValue("");
});

test("prototype runner exposes later local demos", async ({ page }) => {
  await page.goto("/prototypes/runner.html?demo=v2");

  await expect(page.getByRole("heading", { name: "V2 - Templates" })).toBeVisible();

  const frame = page.frameLocator("#prototype-frame");
  await expect(frame.getByText("v2 local templates")).toBeVisible();
  await frame.getByRole("button", { name: "Fill week" }).click();
  await expect(frame.locator("[data-vt-row][data-vt-drafted='true']")).toHaveCount(5);

  await page.goto("/prototypes/runner.html?demo=v3");
  await expect(page.getByRole("heading", { name: "V3 - UI overhaul and holiday calculator" })).toBeVisible();
  const v3Frame = page.frameLocator("#prototype-frame");
  await expect(v3Frame.getByText("v3 month review")).toBeVisible();
  await expect(v3Frame.locator("[data-vt-planned-absences]")).toHaveText("1");
  await expect(v3Frame.locator("[data-vt-vacation-balance]")).toHaveText("11.5 days");

  await page.goto("/prototypes/runner.html?demo=v4");
  await expect(page.getByRole("heading", { name: "V4 - Harness, Vite, and e2e tests" })).toBeVisible();
  await expect(page.frameLocator("#prototype-frame").getByText("v4 harness report")).toBeVisible();

  await page.goto("/prototypes/runner.html?demo=v5");
  await expect(page.getByRole("heading", { name: "V5 - Userscript to extension" })).toBeVisible();
  await expect(page.frameLocator("#prototype-frame").getByText("v5 extension package review")).toBeVisible();

  await page.goto("/prototypes/runner.html?demo=v6");
  await expect(page.getByRole("heading", { name: "V6 - Direct API dry run" })).toBeVisible();
  const v6Frame = page.frameLocator("#prototype-frame");
  await expect(v6Frame.getByText("v6 direct API dry run")).toBeVisible();
  await v6Frame.getByRole("button", { name: "Build mock API request" }).click();
  await expect(v6Frame.locator("[data-v6-output]")).toContainText("\"plannedAbsencesSkipped\": 1");

  await page.goto("/prototypes/runner.html?demo=v8");
  await expect(page.getByRole("heading", { name: "V8 - MCP-shaped automation" })).toBeVisible();
  await expect(page.frameLocator("#prototype-frame").getByText("v8 MCP-shaped dry run")).toBeVisible();
});

test("built site serves participant markdown handouts", async ({ page }) => {
  const response = await page.goto("/docs/facilitation/facilitator-field-guide.md");

  expect(response?.ok()).toBe(true);
  await expect(page.getByText("Facilitator Field Guide")).toBeVisible();
  await expect(page.getByText("ChatGPT Without Codex")).toBeVisible();
});
