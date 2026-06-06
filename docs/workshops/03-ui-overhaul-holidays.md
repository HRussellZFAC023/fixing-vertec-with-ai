# V3: UI Overhaul For Holiday Review

## Goal

Use AI to redesign a clunky holiday-review flow into a clearer interface concept, while keeping the discussion grounded in real user needs and sanitized examples.

## What Participants Build

- A plain-English description of the current holiday-review pain points.
- A simple UI brief for a cleaner review screen.
- A checklist of the information a reviewer needs before approving or querying a holiday entry.

## Suggested Prompt/Tool Interaction

1. Start with the human workflow:

   ```text
   We are improving an internal holiday-review flow connected to Vertec. Using only the sanitized workflow below, identify what a reviewer needs to see, decide, and do. Do not mention implementation yet.
   ```

2. Ask for a compact screen design:

   ```text
   Propose a practical UI layout for this flow. Optimise for a busy manager checking several requests quickly. Include states for approved, queried, missing information, and conflict.
   ```

3. Ask the AI to critique its own design:

   ```text
   Now challenge this layout for accessibility, privacy, error handling, and whether it makes hidden assumptions about Vertec data.
   ```

4. Optional tool interaction:

- Use a design canvas, whiteboard, or markdown table to sketch the interface.
- Use fake employee names, fake dates, and fictional holiday balances.
- If using a coding tool, ask for design notes only in this version.

## Safety/Privacy Notes

- Live Vertec/internal holiday records must be sanitized or abstracted before sharing.
- Avoid real names, absence reasons, medical details, team capacity notes, or screenshots from production.
- Do not ask AI to infer employee performance, health, or sensitive personal context from holiday data.
- Keep policy interpretation with the organisation, not the model.

## Pros/Cons

Pros:

- Makes the value of AI visible to non-technical participants.
- Encourages practical product thinking before code.
- Surfaces privacy risks early, before anyone builds the wrong thing.

Cons:

- A polished mockup can feel more certain than it is.
- AI may invent fields that Vertec does not expose.
- Approval flows often need policy and HR review beyond the workshop.

## Reproducibility Checklist

- [ ] The workflow is described with fictional or abstracted records.
- [ ] The proposed UI lists required fields and missing-data states.
- [ ] Accessibility and privacy are explicitly reviewed.
- [ ] The design avoids unsupported assumptions about Vertec.
- [ ] Participants can explain which parts would need stakeholder approval.
