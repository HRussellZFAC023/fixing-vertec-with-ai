# Talk pattern sources

Current as of 2026-06-07. These sources shaped the session: start from a real
workflow, show why naive agents struggle, then walk from a small safe fix toward
governed automation.

## Sources

- [From Demo to Production: Building Enterprise AI Agents on Databricks](https://www.meetup.com/pydata-huddersfield/events/314844350/)
  - Pattern worth borrowing: a short story about an agent demo that never
    shipped, then a practical rubric and a hands-on lab. Good reason to open
    with real enterprise pain before any code shows up.

- [The Knowledge Gap: Why AI Agents Fail in Real Life](https://www.case-conf.com/session/the-knowledge-gap-why-ai-agents-fail-in-real-life)
  - Pattern worth borrowing: follow a broken demo agent into real workflows and
    name the context humans carry without thinking. Maps cleanly onto Vertec,
    where the hidden work is project policy, service text, holidays, approvals,
    and memory.

- [Stop Typing, Start Orchestrating](https://busse.github.io/workshop-2601/)
  - Pattern worth borrowing: a workshop that teaches multi-agent orchestration
    on purpose, after the fundamentals are in place. Backs the subagent section
    as a facilitation pattern rather than a gimmick.

- [Supporting Our AI Overlords workshop](https://bauplanlabs.github.io/SAO-workshop/)
  - Pattern worth borrowing: agents alongside observability, guardrails,
    governance, and cost controls. Reinforces the closing point that serious
    automation needs traces and controls behind it.

- [Why Agentic AI demands business process re-engineering](https://www.techradar.com/pro/why-agentic-ai-demands-business-process-re-engineering)
  - Pattern worth borrowing: agentic AI goes past interface modernisation. It
    changes how work gets distributed across process, data, and systems.

- [Breaking free from pilot purgatory](https://www.techradar.com/pro/breaking-free-from-pilot-purgatory-the-strategies-needed-to-scale-agentic-ai)
  - Pattern worth borrowing: the industry tone has moved off novelty pilots and
    onto trust, oversight, and scaling. Backs the feature-rung story from
    userscript to MCP and automation.

- [Zühlke: Cybernetic Delivery Method case study](https://www.zuehlke.com/en/case-studies/cybernetic-delivery-method-adding-value)
  - Pattern worth borrowing: Zühlke frames AI delivery as embedded workflow
    augmentation, measured learning, reusable patterns, and scaling what works.
    That is exactly the arc from Vertec annoyance to workshop repo.

- [OpenAI Help: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
  - Pattern worth borrowing: agent mode is useful because it can navigate,
    research, fill forms, use files, and ask for confirmations. It also needs
    supervision, careful app permissions, and better prompts than "handle
    everything".

- [OpenAI: Codex](https://openai.com/codex/)
  - Pattern worth borrowing: Codex is strongest as a workbench for parallel,
    reviewable engineering work. In the talk, Annotate is the bridge from vague
    complaint to bounded change.

- [Anthropic: Building effective agents](https://www.anthropic.com/engineering/building-effective-agents)
  - Pattern worth borrowing: successful agents are usually built from simple,
    composable patterns. This supports the workshop ladder: browser agent, DOM
    evidence, userscript, harness, API dry run, MCP tools.
  - Short phrase worth quoting with attribution: "simple, composable patterns".

- [Anthropic: Demystifying evals for AI agents](https://www.anthropic.com/engineering/demystifying-evals-for-ai-agents)
  - Pattern worth borrowing: agent work needs evals for real behaviours such as
    over-engineering, not just happy-path demos. This supports the V4 harness
    slide and the "proof objects" language.

- [GitHub Blog: How to debug a web app with Playwright MCP and GitHub Copilot](https://github.blog/ai-and-ml/github-copilot/how-to-debug-a-web-app-with-playwright-mcp-and-github-copilot/)
  - Pattern worth borrowing: give the agent repro steps, let it use a browser,
    then review the fix. This maps cleanly to "make no mistakes" plus the local
    e2e harness.

- [GitHub Blog: The difference between coding agent and agent mode](https://github.blog/developer-skills/github/less-todo-more-done-the-difference-between-coding-agent-and-agent-mode-in-github-copilot/)
  - Pattern worth borrowing: synchronous agent mode and asynchronous coding
    agents are different collaboration shapes. This helps explain why one
    thread owns taste while side agents gather research or test bounded changes.
  - Short phrase worth quoting with attribution: "asynchronous teammate".

- [Model Context Protocol introduction](https://modelcontextprotocol.io/docs/getting-started/intro)
  - Pattern worth borrowing: MCP is the bridge from chat to narrow tools. This
    supports the V8 move away from clicking Vertec and toward `checkSession`,
    `prepareTimesheetDraft`, `validateDraft`, and `applyDraft`.

- [OpenAI: Unrolling the Codex agent loop](https://openai.com/index/unrolling-the-codex-agent-loop/)
  - Pattern worth borrowing: the agent loop is user input, model, tool call,
    observation, repeat. This is the workshop mechanics under the jokes.

- [OpenAI: The OpenAI Deployment Company](https://openai.com/index/openai-launches-the-deployment-company/)
  - Pattern worth borrowing: forward deployed engineers embedded in complex
    organisations. This reinforces the sales-side slide: build in the field,
    make pain clickable, scale the useful bit.

- [iusztinpaul/designing-real-world-ai-agents-workshop](https://github.com/iusztinpaul/designing-real-world-ai-agents-workshop)
  - Pattern worth borrowing: a real hands-on workshop repo with MCP servers and
    a scoped harness. Useful inspiration for making each lab self-contained.

## Structural takeaway

The talk should not be eight demos in a row. A stronger shape:

1. Field note: the small ritual everyone recognises.
2. Diagnosis: why the human is acting as integration middleware.
3. First evidence: screenshots, DOM, accessibility, and workflow observations.
4. Low-stakes AI critique: paste a real Vertec slice into ChatGPT.
5. Agentic engineering: use Codex/annotate to turn that critique into a bounded fix.
6. Feature rungs: add capability only when verification and governance grow with it.
7. Closing: the future is less about autonomous demos and more about designing
   accountable operating surfaces.
