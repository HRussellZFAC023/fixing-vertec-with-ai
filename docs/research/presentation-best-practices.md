# Presentation And Workshop Best Practices Used

Current as of 2026-06-06.

This note captures the public sources used to reshape the Reveal deck into a
one-hour, mostly visual workshop. The sources are not there to make the talk
sound academic; they are there to keep the deck readable, accessible, and
teachable.

## Sources

- [W3C WAI: Making Events Accessible](https://www.w3.org/WAI/teach-advocate/accessible-presentations/)
  - Applied in the deck by using accessible web materials, clear sectioning,
    larger readable text, explicit visual descriptions in speaker notes, and a
    shareable HTML format.
  - W3C specifically recommends an overview and review, consistent design to
    reduce cognitive load, accessible materials, readable visuals, sufficient
    contrast, and describing relevant visual information aloud.

- [Microsoft: Make PowerPoint presentations accessible](https://support.microsoft.com/en-us/office/make-your-powerpoint-presentations-accessible-to-people-with-disabilities-6f7772b2-2f33-4bd2-8ca7-dae3b2b3ef25)
  - Applied through meaningful image alt text, consistent reading structure,
    high contrast, meaningful links, and notes that explain visual evidence
    rather than assuming everyone can read the slide.

- [TED Ideas: 6 dos and don'ts for next-level slides](https://ideas.ted.com/6-dos-and-donts-for-next-level-slides-from-a-ted-presentation-expert/)
  - Applied through one clear claim per slide, visual proof objects, and moving
    detail into speaker notes or handouts.

- [Harvard Catalyst: Slides](https://catalyst.harvard.edu/writing-communication-center/visualize-science/slides/)
  - Applied through an assertion-evidence style: the headline carries the
    claim, and the screenshot, diagram, table, or live demo carries the proof.

- [OpenAI Academy: Working with files in ChatGPT](https://openai.com/academy/working-with-files/)
  - Used for the ChatGPT-only exercise: participants can bring small supporting
    artifacts into chat, such as a redacted screenshot, PDF, or DOM snippet.

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

## Design Decisions

- Use redacted screenshots from the source PowerPoint as proof objects instead
  of generic diagrams.
- Keep slide text short and put the real explanation in speaker notes and
  markdown handouts.
- Preserve Zühlke visual cues: white slides, strong left rules, blue/purple/green
  accent system, photographic chapter slides, and restrained corporate layout.
- Make the workshop artifacts runnable and inspectable so sceptics can test the
  claims rather than applaud them.
- Treat accessibility and automation as related: structure, labels, and clear
  state help people, scripts, and agents.
