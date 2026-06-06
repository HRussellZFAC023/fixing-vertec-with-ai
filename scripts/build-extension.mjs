import { mkdir, readFile, writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const sourceScript = resolve(root, "public/prototypes/v3/holiday-review.user.js");
const outDir = resolve(root, "dist-extension/vertec-helper");

const contentScript = await readFile(sourceScript, "utf8");

const manifest = {
  manifest_version: 3,
  name: "Fixing Vertec With AI - Workshop Helper",
  version: "0.3.0",
  description:
    "Workshop-only extension build of the synthetic Vertec helper. Uses no live permissions by default.",
  content_scripts: [
    {
      matches: ["https://vertec.example.invalid/*"],
      js: ["content-script.js"],
      run_at: "document_idle",
    },
  ],
};

await mkdir(outDir, { recursive: true });
await writeFile(resolve(outDir, "manifest.json"), `${JSON.stringify(manifest, null, 2)}\n`);
await writeFile(resolve(outDir, "content-script.js"), contentScript);

console.log(`Built extension demo at ${outDir}`);
