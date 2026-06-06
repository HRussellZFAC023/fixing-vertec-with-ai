import { expect, test } from "@playwright/test";

test("website loads the v1 fixture and userscript helper", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: "Fixing Vertec With AI" })).toBeVisible();

  await page.goto("/#/demo-v1");

  const frame = page.frameLocator("#demo-frame");
  await expect(frame.getByText("v1 timesheet helper")).toBeVisible();
  await frame.getByRole("button", { name: "Fill 8h" }).click();

  await expect(frame.locator("[data-vt-row][data-selected='true'] [name='hours']")).toHaveValue("8.00");
});

test("prototype runner exposes later local demos", async ({ page }) => {
  await page.goto("/prototypes/runner.html?demo=v2");

  await expect(page.getByRole("heading", { name: "V2 - Templates" })).toBeVisible();

  const frame = page.frameLocator("#prototype-frame");
  await expect(frame.getByText("v2 local templates")).toBeVisible();
  await frame.getByRole("button", { name: "Fill week" }).click();
  await expect(frame.locator("[data-vt-row][data-vt-drafted='true']")).toHaveCount(5);

  await page.goto("/prototypes/runner.html?demo=v8");
  await expect(page.getByRole("heading", { name: "V8 - MCP-shaped automation" })).toBeVisible();
  await expect(page.frameLocator("#prototype-frame").getByText("v8 MCP-shaped dry run")).toBeVisible();
});
