import { cp, mkdir, rm } from "node:fs/promises";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const source = resolve(root, "docs");
const destination = resolve(root, "dist/docs");

await mkdir(resolve(root, "dist"), { recursive: true });
await rm(destination, { force: true, recursive: true });
await cp(source, destination, { recursive: true });

console.log(`Copied participant docs to ${destination}`);
