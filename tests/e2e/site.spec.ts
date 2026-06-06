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
