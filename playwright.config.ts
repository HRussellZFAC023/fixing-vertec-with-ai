import { defineConfig, devices } from "@playwright/test";

const localBrowser = process.env.CI ? {} : { channel: "chrome" as const };

export default defineConfig({
  testDir: "tests/e2e",
  webServer: {
    command: "npm run preview",
    url: "http://127.0.0.1:5187",
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
  use: {
    baseURL: "http://127.0.0.1:5187",
    trace: "on-first-retry",
  },
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"], ...localBrowser },
    },
  ],
});
