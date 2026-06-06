const demos = {
  v1: {
    title: "V1 - Basic userscript",
    summary: "Fill one selected row with a safe default.",
    script: "/prototypes/v1/vertec-helper.user.js",
  },
  v2: {
    title: "V2 - Templates",
    summary: "Apply a local project/comment template to one day or a reviewable week.",
    script: "/prototypes/v2/templates-helper.user.js",
  },
  v3: {
    title: "V3 - UI overhaul and holiday calculator",
    summary: "Add a humane review panel for missing days, vacation balance, and UK public holidays.",
    script: "/prototypes/v3/holiday-review.user.js",
  },
  v4: {
    title: "V4 - Harness, Vite, and e2e tests",
    summary: "Show the local verification harness that makes the workshop demos reproducible.",
    script: "/prototypes/v4/harness-report.user.js",
  },
  v5: {
    title: "V5 - Userscript to extension",
    summary: "Review the extension-shaped package and permissions before any real deployment.",
    script: "/prototypes/v5/extension-review.user.js",
  },
  v6: {
    title: "V6 - Direct API dry run",
    summary: "Bypass the UI in a mock API draft without writing to a real system.",
    script: "/prototypes/v6/direct-api-dry-run.user.js",
  },
  v8: {
    title: "V8 - MCP-shaped automation",
    summary: "Turn a chat request into scoped tool calls, dry-run validation, and a confirmation gate.",
    script: "/prototypes/v8/mcp-dry-run.user.js",
  },
};

const params = new URLSearchParams(window.location.search);
const demoId = params.get("demo") || "v1";
const demo = demos[demoId] || demos.v1;
const frame = document.querySelector("#prototype-frame");

document.querySelector("#runner-title").textContent = demo.title;
document.querySelector("#runner-summary").textContent = demo.summary;
document.querySelectorAll(".runner-nav a").forEach((link) => {
  if (link.href.includes(`demo=${demoId}`)) {
    link.setAttribute("aria-current", "page");
  }
});

function injectDemo() {
  const doc = frame?.contentDocument;
  if (!doc || doc.querySelector("[data-prototype-runner-loader]")) return;

  const script = doc.createElement("script");
  script.src = demo.script;
  script.dataset.prototypeRunnerLoader = "true";
  doc.head.append(script);
}

frame?.addEventListener("load", injectDemo);
if (frame?.contentDocument?.readyState && frame.contentDocument.readyState !== "loading") {
  injectDemo();
}
