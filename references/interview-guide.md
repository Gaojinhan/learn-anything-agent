# Interview Guide

Strategies for understanding what the user wants to learn and tailoring the course to their needs.

## Universal Questions

Every interview should cover these, but don't re-ask if the user's initial message already answers them.

### Scope Narrowing

Broad topics need focusing. Help the user find the right scope by asking what draws them to the topic and what they'd most like to be able to do.

**Examples of narrowing:**
- "Machine learning" → "Are you interested in the theory, practical model building, or a specific area like NLP/computer vision/RL?"
- "Italian cooking" → "Traditional regional cuisine? Quick weeknight meals? Pasta-making specifically? Baking?"
- "Photography" → "Phone photography? DSLR? A specific genre like street/portrait/landscape?"
- "Multi-agent systems" → "The theory? A specific application domain? Implementation with a particular framework?"

### Background Assessment

Understanding what the user already knows prevents wasting their time on basics they've mastered or losing them with unexplained prerequisites.

**For technical/academic topics:**
- What's their math comfort level? (algebra, calculus, linear algebra, probability)
- Programming experience? Which languages?
- Have they studied related fields? (e.g., for RL: do they know basic ML? probability?)
- Can they run code locally? What's their setup? (OS, GPU availability for ML topics)

**For practical/hands-on topics:**
- Have they tried this before? What happened?
- What equipment/tools do they have? (camera model, kitchen equipment, instruments)
- Are they learning for fun, professionally, or for a specific project?

**For creative topics:**
- What's their experience with related skills?
- Do they have specific inspirations or styles they're drawn to?
- Are they learning fundamentals or refining existing skills?

### Language

Ask directly: "What language should the course content and interface be in?"

Never infer from the user's message language — they might write to you in English but want content in Chinese, or vice versa. The entire output must be in their chosen language: chapter titles, body text, UI buttons, navigation labels, image captions, code comments, error messages, tooltips — everything.

### Learning Goals

Understanding the destination shapes the journey:
- **"I want to understand the theory"** → more conceptual depth, proofs, derivations
- **"I want to build things"** → more code examples, projects, hands-on exercises
- **"I need to pass an exam"** → structured coverage of exam topics, practice problems
- **"I want to teach others"** → deeper coverage, multiple explanation approaches, common misconceptions
- **"I found these papers and can't understand them"** → work backward from the papers to build prerequisites

## Domain-Specific Strategies

### Academic / Scientific Topics

These users often have specific papers or concepts they're targeting. Ask:
- Which specific papers, textbooks, or courses inspired this?
- Are there particular concepts or equations they're stuck on?
- Do they prefer mathematical rigor or intuitive explanations first?
- For interdisciplinary topics: which discipline are they coming from?

**Course design implications:**
- Include mathematical notation (the site supports LaTeX via KaTeX)
- Build prerequisite chains carefully — if they need to understand X before Y, don't skip X
- Include geometric/visual intuitions alongside formal definitions
- Link to original papers or authoritative sources

### Practical / Hands-on Skills

These users want to DO things. Ask:
- What equipment or tools do they have access to?
- What's their immediate goal? (e.g., "cook dinner for 4 tonight" vs "master pasta over months")
- Are there safety considerations? (woodworking, cooking, chemistry)
- Do they learn better by watching or by doing?

**Course design implications:**
- Emphasize step-by-step procedures with clear checkpoints
- Include timing, measurements, and concrete specifications
- Use before/after images, progress photos
- Interactive elements should simulate real decisions (e.g., "what temperature would you set?")

### Creative / Artistic Topics

These users need both technique and taste. Ask:
- What inspires them? Specific artists, styles, works?
- Are they learning fundamentals or developing a personal style?
- What medium or tools are they using?
- Do they want critique-style feedback or encouragement-first?

**Course design implications:**
- Show many examples of the concept in action
- Include comparison images (good vs. common mistakes)
- Interactive elements for experimenting with parameters (color, composition, etc.)
- Reference real works and artists

### Professional / Business Topics

These users need applicable knowledge. Ask:
- What's their role and industry?
- What specific problem are they trying to solve?
- Are there constraints? (budget, timeline, team size)
- Do they need to convince others? (stakeholders, management)

**Course design implications:**
- Use real-world case studies
- Include frameworks and decision tools
- Interactive elements for scenario modeling
- Provide templates and checklists they can use immediately

## Handling Reference Materials

When users provide papers, documents, or other materials:

1. **Read everything first.** Don't start planning until you understand the materials.
2. **Map the concept graph.** What are the key ideas? What depends on what?
3. **Identify prerequisite gaps.** What does the user need to know before they can understand these materials?
4. **Design the bridge.** Earlier chapters build the prerequisites; later chapters walk through the provided materials with the user now equipped to understand them.
5. **Don't just summarize.** The goal is understanding, not compression. Explain WHY things work the way they do, not just WHAT the paper says.

## System Requirements Check

Run silently — the user should not see this process:

```bash
node --version    # Need Node.js 18+
npm --version     # Comes with Node.js
```

If Node.js is not installed:
- **macOS**: Try `brew install node`. If Homebrew isn't available, download from nodejs.org.
- **Linux**: Use the system package manager or nvm.
- **Windows**: Download the installer from nodejs.org.

If installation requires user action (e.g., admin password), explain briefly in plain language what's needed and why.
