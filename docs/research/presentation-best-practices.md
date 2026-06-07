# Presentation and workshop best practices used

Current as of 2026-06-07.

This note lists the public sources used to reshape the Reveal deck into a
one-hour, mostly visual workshop. They aren't here for academic cover. They're
here to keep the deck readable, accessible, and easy to teach from.

## Sources

- [W3C WAI: Making Events Accessible](https://www.w3.org/WAI/teach-advocate/accessible-presentations/)
  - Applied in the deck by using accessible web materials, clear sectioning,
    larger readable text, explicit visual descriptions in speaker notes, and a
    shareable HTML format.
  - W3C recommends giving an overview and a review, keeping the design
    consistent so it costs less to follow, using accessible materials, making
    visuals readable with enough contrast, and saying the relevant visual detail
    out loud.

- [Microsoft: Make PowerPoint presentations accessible](https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2f33-4bd2-8ca7-dae3b2b3ef25)
  - Applied through meaningful image alt text, a consistent reading structure,
    high contrast, meaningful links, and speaker notes that spell out the visual
    evidence so the slide doesn't have to be legible to land.

- [TED Ideas: 6 dos and don'ts for next-level slides](https://ideas.ted.com/6-dos-and-donts-for-next-level-slides-from-a-ted-presentation-expert/)
  - Applied through one clear claim per slide, visual proof objects, and moving
    detail into speaker notes or handouts.

- [Harvard Catalyst: Slides](https://catalyst.harvard.edu/writing-communication-center/visualize-science/slides/)
  - Applied through an assertion-evidence style: the headline carries the
    claim, and the screenshot, diagram, table, or live demo carries the proof.

- [OpenAI Academy: Working with files in ChatGPT](https://openai.com/academy/working-with-files/)
  - Used for the ChatGPT-only exercise: participants can bring small supporting
    artifacts into chat, such as a screenshot, PDF, or DOM snippet from their own
    Vertec timesheet.

- [OpenAI Help: ChatGPT agent](https://help.openai.com/en/articles/11752874-chatgpt-agent)
  - Used to keep browser-agent claims current. The deck reflects that agent mode
    can use a visual browser, apps, files, and confirmations, while still needing
    caution around sensitive sites, vague prompts, and prompt injection.

- [OpenAI: Introducing ChatGPT Atlas](https://openai.com/index/introducing-chatgpt-atlas/)
  - Used for the browser-native agent discussion: Atlas can run agent mode in
    the browser, but OpenAI describes it as an early experience that can make
    mistakes on complex workflows.

- [OpenAI Help: Atlas data controls and privacy](https://help.openai.com/en/articles/12574142-chatgpt-atlas-data-controls-and-privacy)
  - Used for the safety framing around page visibility, browser memories, and
    data controls.

- [OpenAI: Codex for every role, tool, and workflow](https://openai.com/index/codex-for-every-role-tool-workflow/)
  - Used for the Codex-as-workbench section, especially plugins, Sites, and
    annotations as a way to refine artifacts in place.

- [Zühlke: Cybernetic Delivery Method case study](https://www.zuehlke.com/en/case-studies/cybernetic-delivery-method-adding-value)
  - Used to keep the CDM framing grounded in Zühlke's public language: embed AI
    into delivery workflows, measure what works, share augmentation patterns, and
    scale the useful ones.

- [Zühlke: AI implementation](https://www.zuehlke.com/en/expertise/ai-implementation)
  - Used for the consultancy framing: real impact comes from implementation,
    production-grade systems, and getting the right AI into users' hands.

- [Zühlke: ZenAI](https://www.zuehlke.com/en/insights/zenai-solving-the-challenge-of-secure-scalable-enterprise-ai)
  - Used for the governed enterprise AI thread: workflow integration, secure
    deployment, provider choice, and controls matter as soon as a demo becomes a
    real operating surface.

## Design decisions

- Use real screenshots from the source PowerPoint as proof objects instead
  of generic diagrams.
- Keep slide text short and put the real explanation in speaker notes and
  markdown handouts.
- Preserve Zühlke visual cues: white slides, strong left rules, the
  blue/purple/green accent system, photographic chapter slides, and a restrained
  corporate layout.
- Make the workshop artifacts runnable and inspectable, so a sceptic can test a
  claim and not just take our word for it.
- Treat accessibility and automation as the same problem: structure, labels, and
  clear state help people, scripts, and agents alike.
