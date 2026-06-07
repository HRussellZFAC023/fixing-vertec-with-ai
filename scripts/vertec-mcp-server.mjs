#!/usr/bin/env node
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import * as z from "zod/v4";
import {
  buildMcpTranscript,
  defaultTemplate,
  loadWorkshopDocument,
  prepareTimesheetDraft,
  readWorkshopState,
  validateDraft,
} from "./vertec-draft-core.mjs";

async function state() {
  return readWorkshopState(await loadWorkshopDocument());
}

function textResult(structuredContent) {
  return {
    content: [{ type: "text", text: JSON.stringify(structuredContent, null, 2) }],
    structuredContent,
  };
}

export function createServer() {
  const server = new McpServer({
    name: "vertec-workshop-wrapper",
    version: "0.8.0",
  });

  server.registerTool(
    "vertec.checkSession",
    {
      title: "Check Vertec session",
      description: "Check whether the wrapper can read the Services context before drafting anything.",
      inputSchema: {
        target: z.string().default("Services"),
      },
      outputSchema: {
        target: z.string(),
        month: z.string(),
        canReadServices: z.boolean(),
        canWriteServices: z.boolean(),
        plannedAbsences: z.number(),
        vacationRemainingDays: z.number(),
        liveWrite: z.boolean(),
      },
    },
    async ({ target }) => {
      const current = await state();
      return textResult({
        target,
        month: current.month,
        canReadServices: true,
        canWriteServices: false,
        plannedAbsences: current.plannedAbsences.length,
        vacationRemainingDays: current.vacation.remaining,
        liveWrite: false,
      });
    },
  );

  server.registerTool(
    "vertec.prepareTimesheetDraft",
    {
      title: "Prepare timesheet draft",
      description: "Build draft Services entries from the current month context.",
      inputSchema: {
        hours: z.number().default(defaultTemplate.hours),
        text: z.string().default(defaultTemplate.text),
      },
      outputSchema: {
        entries: z.array(
          z.object({
            date: z.string(),
            project: z.string(),
            phase: z.string(),
            serviceType: z.string(),
            text: z.string(),
            hours: z.number(),
            source: z.string(),
            mode: z.string(),
          }),
        ),
        skippedPlannedAbsences: z.number(),
        liveWrite: z.boolean(),
      },
    },
    async ({ hours, text }) => {
      const current = await state();
      const entries = prepareTimesheetDraft(current, { ...defaultTemplate, hours, text });
      return textResult({
        entries,
        skippedPlannedAbsences: current.plannedAbsences.length,
        liveWrite: false,
      });
    },
  );

  server.registerTool(
    "vertec.validateDraft",
    {
      title: "Validate timesheet draft",
      description: "Validate a draft before any apply step is allowed.",
      inputSchema: {
        entries: z
          .array(
            z.object({
              date: z.string(),
              project: z.string(),
              phase: z.string(),
              serviceType: z.string(),
              text: z.string(),
              hours: z.number(),
            }),
          )
          .optional(),
      },
      outputSchema: {
        ok: z.boolean(),
        errors: z.array(z.string()),
        warnings: z.array(z.string()),
        wouldCreate: z.number(),
        liveWrite: z.boolean(),
      },
    },
    async ({ entries }) => {
      const current = await state();
      return textResult(validateDraft(entries || prepareTimesheetDraft(current)));
    },
  );

  server.registerTool(
    "vertec.applyDraft",
    {
      title: "Apply draft",
      description: "Demonstrate the write boundary. The workshop server never writes live Vertec data.",
      inputSchema: {
        confirmedByHuman: z.boolean().default(false),
      },
      outputSchema: {
        status: z.string(),
        liveWrite: z.boolean(),
        reason: z.string().optional(),
      },
    },
    async ({ confirmedByHuman }) => {
      return textResult(
        confirmedByHuman
          ? { status: "would-apply-in-demo-only", liveWrite: false }
          : {
              status: "blocked",
              reason: "Human confirmation has not been given.",
              liveWrite: false,
            },
      );
    },
  );

  server.registerResource(
    "workshop-transcript",
    "vertec://workshop/transcript",
    {
      title: "Workshop MCP transcript",
      description: "The same tool sequence shown in the browser demo.",
      mimeType: "application/json",
    },
    async (uri) => {
      const current = await state();
      return {
        contents: [
          {
            uri: uri.href,
            mimeType: "application/json",
            text: JSON.stringify(buildMcpTranscript(current), null, 2),
          },
        ],
      };
    },
  );

  return server;
}

if (import.meta.url === `file://${process.argv[1]}`) {
  const server = createServer();
  const transport = new StdioServerTransport();
  await server.connect(transport);
}
