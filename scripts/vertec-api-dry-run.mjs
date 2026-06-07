#!/usr/bin/env node
import { buildDirectApiDryRun, loadWorkshopDocument, readWorkshopState } from "./vertec-draft-core.mjs";

const document = await loadWorkshopDocument();
const state = readWorkshopState(document);
const result = buildDirectApiDryRun(state);

if (process.argv.includes("--check")) {
  if (!result.response.ok || result.response.wouldCreate !== 5 || result.response.liveWrite !== false) {
    console.error(JSON.stringify(result, null, 2));
    process.exit(1);
  }
}

console.log(JSON.stringify(result, null, 2));
