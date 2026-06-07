#!/usr/bin/env node
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const serverPath = resolve(root, "scripts/vertec-mcp-server.mjs");

const client = new Client({ name: "vertec-workshop-smoke", version: "0.1.0" }, { capabilities: {} });
const transport = new StdioClientTransport({
  command: process.execPath,
  args: [serverPath],
  cwd: root,
  stderr: "pipe",
});

await client.connect(transport);

const tools = await client.listTools();
const checkSession = await client.callTool({
  name: "vertec.checkSession",
  arguments: { target: "Services" },
});
const draft = await client.callTool({
  name: "vertec.prepareTimesheetDraft",
  arguments: { hours: 8, text: "Project delivery" },
});
const validation = await client.callTool({
  name: "vertec.validateDraft",
  arguments: {},
});
const blockedApply = await client.callTool({
  name: "vertec.applyDraft",
  arguments: { confirmedByHuman: false },
});
const approvedApply = await client.callTool({
  name: "vertec.applyDraft",
  arguments: { confirmedByHuman: true },
});

await transport.close();

const report = {
  tools: tools.tools.map((tool) => tool.name),
  checkSession: checkSession.structuredContent,
  draft: {
    entries: draft.structuredContent.entries.length,
    skippedPlannedAbsences: draft.structuredContent.skippedPlannedAbsences,
    liveWrite: draft.structuredContent.liveWrite,
  },
  validation: validation.structuredContent,
  blockedApply: blockedApply.structuredContent,
  approvedApply: approvedApply.structuredContent,
};

if (
  !report.tools.includes("vertec.prepareTimesheetDraft") ||
  report.draft.entries !== 5 ||
  report.checkSession.plannedAbsences !== 1 ||
  report.draft.skippedPlannedAbsences !== 1 ||
  report.validation.ok !== true ||
  report.blockedApply.status !== "blocked" ||
  report.approvedApply.liveWrite !== false
) {
  console.error(JSON.stringify(report, null, 2));
  process.exit(1);
}

console.log(JSON.stringify(report, null, 2));
