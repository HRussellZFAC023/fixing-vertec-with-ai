# AI workflow sources for browser/UI improvement work

Current as of 2026-06-06. Scope: public sources that help explain how someone can use ChatGPT, without Codex, to understand a web UI problem, inspect a page, paste sanitized DOM or screenshots, ask for critique, and turn the finding into a first userscript requirement.

## Main arc for the workshop

The useful story for "Fixing Vertec With AI" is not "the AI magically fixes the app." It is:

1. A person spots friction in a real UI.
2. They capture a small, sanitized slice of evidence: screenshot, DOM, labels, selectors, and the exact task that feels awkward.
3. ChatGPT helps critique the evidence and turn vague irritation into a testable requirement.
4. A developer, userscript author, or coding agent can then implement against that requirement.

This keeps the first workshop step safe for internal data and approachable for AI sceptics. It also shows how the field has evolved: from manual copy/paste context, to multimodal files and screenshots, to browser agents that can inspect and act, and finally to AI built into the browser itself.

## Annotated sources

### OpenAI: ChatGPT files, screenshots, and editing context

- [Working with files in ChatGPT](https://openai.com/academy/working-with-files/) - OpenAI Academy, 2026-04-10.
  - Educational usefulness: A gentle public reference that says ordinary users can upload files, images, PDFs, and other artifacts to ChatGPT and ask questions about them. Useful for explaining that a screenshot or sanitized HTML snippet is enough to start a UI critique.
  - Workflow evolution: ChatGPT is no longer only a blank text box. It can sit with supporting artifacts in the conversation.

- [File Uploads FAQ](https://help.openai.com/en/articles/8555545-file-uploads-faq/) - OpenAI Help Center.
  - Educational usefulness: Useful for practical constraints and retention framing. It documents supported file categories, image limits, and how uploaded files relate to chats.
  - Workflow evolution: Uploads make it normal to bring a small design artifact, screenshot, CSV, or text snippet into a chat instead of describing everything from memory.

- [How to launch the Chat Bar](https://help.openai.com/en/articles/9295241-how-to-launch-the-chat-bar) - OpenAI Help Center.
  - Educational usefulness: Shows that on macOS the ChatGPT app can take screenshots from the chat bar. This is relevant for a low-friction "capture what you see" workflow.
  - Workshop caution: Do not use this on confidential screens unless the organization has approved the data handling path. Prefer mock data or redacted screenshots.

- [What is the canvas feature in ChatGPT and how do I use it?](https://help.openai.com/en/articles/9930697-what-is-the-canvas-feature-in-chatgpt-and-how-do-i-use-it) - OpenAI Help Center.
  - Educational usefulness: Canvas is useful after the first critique, because participants can ask ChatGPT to organize requirements, draft code snippets, or review a small HTML/JS idea in a side-by-side editing space.
  - Workflow evolution: The interaction has moved from one-off answers toward collaborative editing and previewing, while still being user-controlled.

### OpenAI: data controls and safe handling

- [Temporary Chat FAQ](https://help.openai.com/en/articles/8914046-temporary-chat-faq/) - OpenAI Help Center.
  - Educational usefulness: Good source for explaining Temporary Chat in simple terms: not in history, no memories, not used for model improvement, with limited retention for safety.
  - Workshop caution: Temporary Chat is not a license to paste secrets. It is a safety layer, not a data classification decision.

- [How your data is used to improve model performance](https://help.openai.com/en/articles/5722486-data-controls-faq) - OpenAI Help Center.
  - Educational usefulness: Clear contrast between individual services and business products. It is useful when explaining why the workshop avoids customer data and asks participants to follow their company's approved workspace policy.
  - Workshop caution: Personal ChatGPT and business/enterprise ChatGPT have different default data handling. Participants should use only the tool path approved by their organization.

### OpenAI: browser agents and Atlas

- [Introducing Operator](https://openai.com/index/introducing-operator/) - OpenAI, 2025-01-23, with 2025-07-17 update.
  - Educational usefulness: Good historical marker for "AI can use a browser." Operator used its own browser and interacted with web pages by looking, clicking, typing, and scrolling.
  - Workflow evolution: Shows the shift from the user pasting page context into ChatGPT to an agent gathering some context through a browser-like environment.

- [ChatGPT agent release notes](https://help.openai.com/en/articles/11794368) - OpenAI Help Center, 2025-07-17 entry.
  - Educational usefulness: Short source showing Operator's core browser functionality being integrated into ChatGPT agent, including a built-in virtual browser.
  - Workflow evolution: Browser use moved from a separate research preview into ChatGPT itself.

- [ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent) - OpenAI Help Center.
  - Educational usefulness: Current explanation of agent mode, including visual browser use, connected apps, files, confirmations, and safety concerns.
  - Workshop caution: The safety section is essential. For this workshop, agent mode should be discussed as evolution and used only on public/mock pages unless the company has explicitly approved internal use.

- [Introducing ChatGPT Atlas](https://openai.com/index/introducing-chatgpt-atlas/) - OpenAI, 2025-10-21.
  - Educational usefulness: Useful for explaining the next step in the arc: ChatGPT integrated into the browser, with page context and an agent mode in preview.
  - Workflow evolution: Atlas reduces copy/paste by letting ChatGPT work alongside pages directly. That is powerful, but for internal systems it makes data visibility rules more important, not less.

- [ChatGPT Atlas - Data Controls and Privacy](https://help.openai.com/en/articles/12574142-chatgpt-atlas-data-controls-and-privacy) - OpenAI Help Center.
  - Educational usefulness: Important companion source for Atlas. It covers page visibility, browser memories, browsing data controls, shared links, and training-related toggles.
  - Workshop caution: If participants ever try Atlas on sensitive tools, page visibility and workspace controls must be understood before the session.

### Browser inspection and UI evidence

- [Chrome DevTools: Get started with viewing and changing the DOM](https://developer.chrome.com/docs/devtools/dom/) - Chrome for Developers.
  - Educational usefulness: The most directly useful source for the first exercise. It explains inspecting nodes, viewing the DOM tree, editing attributes, using "Edit as HTML," searching the DOM tree, and capturing node screenshots.
  - Workflow evolution: Before agentic browsing, this is the human-supervised way to gather precise UI evidence for ChatGPT.

- [Chrome DevTools: Inspect mode](https://developer.chrome.com/docs/devtools/inspect-mode) - Chrome for Developers.
  - Educational usefulness: Gives the simple keyboard shortcuts and mental model for picking an element on the page and seeing its style/accessibility information.
  - Workshop use: Good for non-technical participants because it starts with "point at the awkward thing."

- [Chrome DevTools: View and change CSS](https://developer.chrome.com/docs/devtools/css) - Chrome for Developers.
  - Educational usefulness: Helps participants understand that layout and style problems can be explored safely in the browser before anyone changes the product.
  - Workflow evolution: Manual CSS experiments become prompt material: "This change made it better; how should we express it as a requirement?"

- [Chrome DevTools: Chat with AI assistance](https://developer.chrome.com/docs/devtools/ai-assistance/chat) - Chrome for Developers.
  - Educational usefulness: Not ChatGPT, but useful context. Chrome's own DevTools now includes AI assistance that can select relevant DOM, network, style, and performance context.
  - Workflow evolution: Confirms the broader direction of travel: developer tools increasingly package page context for an AI assistant instead of making humans copy every detail by hand.

### Web platform and userscript implementation references

- [MDN: Document.querySelector()](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) - MDN Web Docs.
  - Educational usefulness: The bridge from DOM critique to a userscript requirement. Participants do not need to master selectors, but they should understand that a script needs a reliable way to find the target element.
  - Workshop use: Ask ChatGPT to propose selector candidates, then ask a human/developer to verify them.

- [MDN: MutationObserver](https://developer.mozilla.org/en-US/docs/Web/API/MutationObserver) - MDN Web Docs.
  - Educational usefulness: Useful when a page updates dynamically. A good userscript requirement can say "work after the panel reloads" without participants needing to know the implementation details.
  - Workshop use: Include this source when explaining why a requirement should mention dynamic content and not just initial page load.

- [Tampermonkey documentation](https://www.tampermonkey.net/documentation.php?locale=en) - Tampermonkey.
  - Educational usefulness: Primary reference for userscript metadata such as `@match`, `@grant`, `@run-at`, and helper APIs.
  - Workshop use: The first requirement should include a safe `@match` scope, minimal permissions, and a clear "does not send data externally" constraint.

### Accessibility and critique rubrics

- [W3C WAI: Labeling Controls](https://www.w3.org/WAI/tutorials/forms/labels/) - Web Accessibility Initiative.
  - Educational usefulness: Gives a grounded, non-AI reason why missing or vague labels matter. This helps sceptics see that ChatGPT is applying known criteria, not inventing taste.
  - Workshop use: Useful when turning "this field is confusing" into "the control needs a programmatic and visible label that describes its purpose."

- [W3C WAI: Easy Checks - A First Review of Web Accessibility](https://www.w3.org/WAI/test-evaluate/preliminary/) - Web Accessibility Initiative.
  - Educational usefulness: Beginner-friendly checks for headings, labels, keyboard access, and other first-pass accessibility concerns.
  - Workshop use: Good optional checklist for the "what is bad?" step.

### Wider agentic/browser workflow context

- [Browser Use GitHub repository](https://github.com/browser-use/browser-use) - Browser Use.
  - Educational usefulness: Shows the open-source version of the same direction: AI agents using browsers, screenshots, page state, clicking, typing, and scripts.
  - Workflow evolution: Helpful comparison point. ChatGPT Agent and Atlas are productized experiences; browser-use shows how developers wire agents to browser automation more directly.

- [Browser Use CLI docs](https://docs.browser-use.com/open-source/browser-use-cli) - Browser Use.
  - Educational usefulness: Makes the observe-act loop concrete: open a page, inspect state, click, type, take screenshots, run JavaScript.
  - Workflow evolution: Reinforces that modern browser agents need both visual evidence and structured page state. For this workshop, participants do the first "observe" step manually and safely.

## Suggested takeaways for the talk

- "AI needs evidence" lands better with sceptics than "AI knows UI." Screenshots show what people see; DOM snippets show what scripts can change.
- The safe beginner workflow is deliberately manual: inspect, copy a small sanitized slice, ask for critique, write a requirement.
- ChatGPT Agent and Atlas matter as evolution, but they should not be the first step on internal systems. Browser control increases convenience and risk at the same time.
- A good userscript requirement is specific about page scope, target element, desired behavior, privacy constraints, dynamic-page behavior, and acceptance criteria.
- The highest-value workshop moment is when a vague complaint becomes a small, testable sentence.
