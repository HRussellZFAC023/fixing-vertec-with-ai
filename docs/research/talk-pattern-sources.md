# Talk Pattern Sources

Current as of 2026-06-06. These sources informed the session shape: start from
a real workflow, show why naive agents struggle, then move from small safe
prototypes toward governed automation.

## Sources

- [From Demo to Production: Building Enterprise AI Agents on Databricks](https://www.meetup.com/pydata-huddersfield/events/314844350/)
  - Useful pattern: a short story about an agent demo that did not ship, then a
    practical rubric and a hands-on lab. This supports opening with a real
    enterprise pain before code.

- [The Knowledge Gap: Why AI Agents Fail in Real Life](https://www.case-conf.com/session/the-knowledge-gap-why-ai-agents-fail-in-real-life)
  - Useful pattern: follow a broken demo agent into real workflows and explain
    the missing context humans carry. This maps well to Vertec: the hidden work
    is project policy, service Text, holidays, approvals, and memory.

- [Stop Typing, Start Orchestrating](https://busse.github.io/workshop-2601/)
  - Useful pattern: a workshop structure that explicitly teaches multi-agent
    orchestration after fundamentals. This supports the subagent section as a
    facilitation pattern, not a gimmick.

- [Supporting Our AI Overlords workshop](https://bauplanlabs.github.io/SAO-workshop/)
  - Useful pattern: agents plus observability, guardrails, governance, and cost
    controls. This reinforces the closing point that serious automation needs
    traces and controls.

- [Why Agentic AI demands business process re-engineering](https://www.techradar.com/pro/why-agentic-ai-demands-business-process-re-engineering)
  - Useful pattern: agentic AI is not just interface modernisation; it changes
    how work is distributed across process, data, and systems.

- [Breaking free from pilot purgatory](https://www.techradar.com/pro/breaking-free-from-pilot-purgatory-the-strategies-needed-to-scale-agentic-ai)
  - Useful pattern: the industry tone has moved from novelty pilots to trust,
    oversight, and scaling. This supports the prototype ladder from userscript
    to MCP and automation.

## Structural Takeaway

The talk should not be "eight demos in a row." A stronger shape is:

1. Field note: the small ritual everyone recognises.
2. Diagnosis: why the human is acting as integration middleware.
3. First evidence: screenshots, DOM, accessibility, and workflow observations.
4. Low-stakes AI critique: paste a real Vertec slice into ChatGPT.
5. Agentic engineering: use Codex/annotate to turn critique into a bounded fix.
6. Prototype ladder: increase capability only when verification and governance
   increase with it.
7. Closing: the future is less about autonomous demos and more about designing
   accountable operating surfaces.
