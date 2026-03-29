---
name: learn-anything
description: Generate an interactive, self-paced learning website on any topic. Use this skill whenever a user wants to learn, study, understand, or master anything — academic subjects (machine learning, quantum physics, multi-agent systems), practical skills (cooking, photography, woodworking), creative pursuits (music, drawing, writing), or professional topics (finance, marketing, management). Also triggers when users bring papers, textbooks, or documents they want systematically explained as structured learning material. Key phrases include "teach me", "I want to learn", "help me understand", "create a course", "explain X systematically", "I found these papers but can't understand them", "build me a tutorial", "我想学", "教我", "帮我搞懂". If a user mentions wanting to learn, study, or understand ANY topic — even casually — use this skill.
---

# Learn Anything

Transform any learning goal into an interactive, locally-served web course. The output is a React-based reading experience — like a more concise, more interactive Hugging Face course — with structured chapters, generated illustrations, and hands-on interactive elements tailored to both the subject and the learner.

## Core Philosophy

Every topic deserves a different teaching approach. A machine learning course needs runnable code and algorithm visualizations. A cooking course needs step-by-step timing guides and visual references. A photography course needs composition overlays and before/after comparisons. Adapt content types and interactive elements to the subject rather than forcing every topic into the same mold.

All content and UI language follows the user's explicit preference — there is no default language. Ask.

## Workflow

```
Interview → Plan → Create Content → Build Site → Iterate with User
```

---

## Phase 1: Interview

**Goal**: Understand exactly what the user wants to learn, their background, and constraints.

Read `references/interview-guide.md` for domain-specific question strategies.

### Must-gather information

1. **Topic scope**: Narrow the request. "Machine learning" is too broad — supervised learning basics? Deep learning architectures? RL for robotics? Help the user focus.

2. **Background level**: What do they already know? For technical topics: math level, programming experience. For practical topics: prior hands-on experience. This sets the starting point and determines how much prerequisite material to include.

3. **Language**: What language should everything be in — content, UI, code comments, button labels? Ask explicitly, never assume.

4. **Reference materials**: Do they have papers, articles, textbooks they want incorporated? If yes, read and analyze them before planning.

5. **Learning goals**: What should they be able to DO after this course? Understand theory? Build something? Pass an exam? Teach others?

6. **System check**: Run `node --version` silently. If Node.js is missing, install it (e.g., via Homebrew on macOS: `brew install node`). The user should not need to do anything.

### For advanced requests (user provides papers/documents)

Read the provided materials first. Map the key concepts, identify prerequisite knowledge the user might lack, and design the course to bridge from their current level to understanding those materials. The papers become destination chapters; earlier chapters build the prerequisites.

### Interview style

Ask 3-5 focused questions, not 15. If the user's initial message already answers some, don't re-ask. Be conversational, adapt to their communication style.

---

## Phase 2: Content Planning

**Goal**: Create a course outline that serves as the blueprint for everything.

Read `references/content-planning.md` for curriculum design methodology.

### Steps

1. **Research the topic**: Web-search for authoritative explanations, current best practices, and key frameworks. For academic topics, identify seminal papers and core concepts. For practical topics, find proven learning progressions.

2. **Design the structure**:
   - 5–10 chapters for initial generation
   - Each chapter: 2–4 pages of content
   - Total target: ~15–20 pages (substantial but digestible in one sitting)
   - Clear progression from foundations → application

3. **Plan per-chapter content types**:
   - Text explanations needed
   - Diagrams or illustrations that would help
   - Interactive elements that deepen understanding
   - Exercises or hands-on practice

4. **Save as `course-plan.md`** in the project directory. Present the outline to the user for approval before writing content. Let them adjust scope, reorder, add, or remove topics.

---

## Phase 3: Content Creation

**Goal**: Write markdown content that teaches effectively. Content quality matters more than anything else — a plain page with excellent explanations beats a beautifully interactive page with shallow content.

Read `references/content-creation.md` for writing guidelines, image generation techniques, and the interactive element catalog.

### Teaching quality comes first

Before worrying about interactive elements or images, make sure every explanation follows this progression:

1. **Intuition first** — Start with a real-world analogy or everyday example that maps directly to the concept. The reader should feel "aha, that makes sense" before seeing any formal definition. Use at least 2-3 analogies per chapter.

2. **Why it matters** — Explain why this concept exists, what problem it solves. Don't just define it. "RNNs have a vanishing gradient problem" is not as good as "Imagine trying to remember the beginning of a 500-page novel by the time you reach the end — that's what happens to RNNs."

3. **Concrete before abstract** — Show a worked example with real numbers before giving the general formula. Walk through calculations step by step with actual values. "Here's a 3x3 attention matrix with real numbers → here's why it works → here's the general formula."

4. **Progressive depth** — Build understanding in layers: intuition → analogy → example → formal definition → edge cases. Don't skip layers. Each layer should feel like a natural next step, not a jump.

5. **Connect to prior knowledge** — Reference what was covered in previous chapters. "Remember how we said RNNs process tokens one at a time? Self-attention processes all tokens simultaneously — here's what that means..."

### Content pipeline

1. **Write markdown files**: One `.md` per chapter, stored in `src/content/`. Write at the learner's level — don't talk down to experts or overwhelm beginners. Every concept connects to what came before. Use concrete examples, not just abstract definitions.

2. **Generate images** (priority order):
   - **SVG**: Best for diagrams, flowcharts, architecture — crisp at any size, editable
   - **Python (matplotlib/PIL)**: Best for charts, graphs, data visualizations
   - **Web search**: For reference photos, real-world examples, screenshots
   - **AI generation** (optional): Only if user has configured an API token
   - Save to `public/images/chapter-XX/`

3. **Embed interactive elements**: Use the marker syntax in markdown (documented in the reference) to specify where interactive components go. The site builder creates the corresponding React components.

### Quality bar

- Content accuracy matters most. Verify facts, especially for technical and academic topics.
- Images should genuinely aid understanding, not decorate.
- Interactive elements let users explore and verify concepts — not just click buttons.
- Appropriate difficulty curve: each chapter builds on the last.

---

## Phase 4: Site Building

**Goal**: Assemble everything into a working interactive website.

Read `references/site-building.md` for the complete technical setup.

### High-level steps

1. **Scaffold**: Create a Vite + React project, install all dependencies. Everything automated, zero user intervention.

2. **Set up the reader**: Copy and customize the template components from this skill's `assets/site-template/` directory. These provide:
   - Chapter navigation sidebar
   - Markdown reader with syntax highlighting and line references
   - Responsive, clean layout

3. **Build interactive components**: Based on the markers in content, create React components for this course's specific needs (code runners, quizzes, diagrams, sliders, etc.).

4. **Integrate content**: Import markdown files, set up routing, configure navigation with chapter titles from the manifest.

5. **Generate images**: Run any Python scripts needed for charts/diagrams. Verify all image paths resolve.

6. **Test and serve**: Start `npm run dev`, verify rendering, open the browser for the user.

### Error handling

Fix build errors silently. The user should never see npm errors, React stack traces, or terminal output. If a dependency fails, try alternatives. If a component doesn't render, simplify until it works. Only involve the user if automated recovery fails and their input is required (e.g., Node.js installation needs admin permissions).

---

## Phase 5: Feedback & Iteration

**Goal**: Refine and expand the course through the line reference system.

Read `references/feedback-loop.md` for implementation details.

### The line reference system

When users click any content block (paragraph, heading, code block, image) on the site, they see a reference tag like `chapter-02.md:15-22`. They paste this back to the agent to request changes.

This is efficient because:
- The reference is short and precise
- The agent can immediately locate the exact source lines
- It works across conversation turns without context loss
- Line numbers are easier for the agent to remember than content blocks

### Common user interactions

| User says | Agent does |
|-----------|-----------|
| `chapter-03.md:45-60 — I don't understand this` | Rewrite those lines with a different approach, more examples, or simpler language |
| `Add more after chapter 4` | Create new chapters, update manifest and navigation |
| `The diagram at chapter-02.md:30 is confusing` | Regenerate or redesign the image |
| `Can you add a demo for this concept?` | Create an interactive component and embed it |
| `Make the whole thing more hands-on` | Add interactive elements across multiple chapters |

### Expanding the course

When the user wants more content: review `course-plan.md`, plan new chapters, generate content, and integrate into the existing site. No rebuild needed — add files, update the chapter index, and the dev server hot-reloads.

---

## Key Principles

1. **User language is sacred.** All generated content, UI text, button labels, navigation, tooltips, and code comments follow the user's language choice. If they say Chinese, everything is Chinese. If they switch languages mid-conversation, follow the switch.

2. **Zero user debugging.** The user should never see a terminal error, be asked to run a command, or need to fix anything. If something breaks, fix it. If it can't be fixed silently, explain in plain language and offer alternatives.

3. **Content over chrome.** Prioritize depth, clarity, and accuracy over visual polish. The site should be clean and readable, not flashy. A beautifully styled page with shallow content is worse than a plain page with excellent explanations.

4. **Interactivity with purpose.** Every interactive element should help the user understand something they couldn't understand from text alone. Don't add interactivity for its own sake.

5. **Progressive generation.** Generate the framework and initial chapters (~15-20 pages), serve them, let the user explore. Don't try to produce a 50-page course in one shot. Expand based on what the user finds most valuable.

6. **Domain-appropriate teaching.** Adapt the teaching approach to the subject. Code topics get runnable examples. Visual topics get rich imagery. Hands-on topics get interactive simulations. Abstract topics get intuitive analogies and geometric visualizations.
