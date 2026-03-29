# Content Planning

How to design a structured learning progression that's neither too shallow nor overwhelming.

## Course Structure Template

Save this as `course-plan.md` in the project directory after filling it in.

```markdown
# Course: [Title in user's language]
**Language**: [content language]
**Target audience**: [background summary]
**Learning goal**: [what user wants to achieve]
**Estimated scope**: [N chapters, ~M pages]

## Prerequisites covered
- [Prerequisite 1 — covered in Chapter X]
- [Prerequisite 2 — assumed known]

## Chapter Outline

### Chapter 1: [Title]
**Objective**: [What the learner will understand/be able to do after this chapter]
**Content type**: text + [diagrams/images/interactive elements]
**Key concepts**: [concept 1, concept 2, ...]
**Interactive elements**:
- [e.g., "runnable code example showing X"]
- [e.g., "draggable diagram of Y architecture"]
**Estimated length**: [N pages]

### Chapter 2: [Title]
...
```

## Scoping Rules

The initial generation targets **15–20 pages** across 5–10 chapters. This is enough to cover a topic meaningfully without overwhelming a single generation session. The user can always request expansion later.

### How to estimate page count

- 1 "page" ≈ 400-500 words of text, or a mix of ~300 words + 1 image + 1 interactive element
- A chapter with 2 pages has ~800 words and a couple of visuals
- A chapter with 4 pages is a deep dive with multiple examples and interactives

### How to decide number of chapters

- **Broad survey** (e.g., "intro to ML"): 8–10 shorter chapters covering more ground
- **Deep dive** (e.g., "understand attention mechanisms"): 5–6 longer chapters with thorough treatment
- **Practical skill** (e.g., "phone photography basics"): 6–8 chapters mixing theory and practice
- **Paper-driven** (e.g., "explain these 3 papers"): prerequisite chapters + 1 chapter per paper

### Content progression patterns

**Spiral pattern** (best for technical topics):
1. Overview / big picture (what and why)
2. Foundations (prerequisites, basic concepts)
3. Core concepts (the main ideas, one at a time)
4. Connections (how concepts relate to each other)
5. Application (putting it together)
6. Deep dives (advanced topics, edge cases)

**Project-based pattern** (best for practical skills):
1. What we're building / learning to do
2. Essential tools and setup
3. First simple project (guided, step-by-step)
4. Key techniques (each with practice)
5. Intermediate project (more independence)
6. Tips, troubleshooting, next steps

**Paper-reading pattern** (for academic materials):
1. Why this topic matters (motivation)
2. Background knowledge (prerequisites)
3. Core framework / formulation
4. Paper 1 walkthrough
5. Paper 2 walkthrough (building on Paper 1)
6. Synthesis and open questions

## Research Strategies

Before writing content, research the topic to ensure accuracy and find the best teaching approaches.

### Web search priorities

1. **Authoritative sources**: textbooks, course syllabi from top universities, official documentation
2. **Teaching approaches**: how do the best educators explain this? What analogies work?
3. **Common misconceptions**: what do beginners typically get wrong?
4. **Current state**: is this field rapidly evolving? What's the latest?
5. **Practical examples**: real-world applications that make abstract concepts concrete

### For topics with user-provided papers

1. Search for the papers' context: what problem space are they in? What came before?
2. Find tutorial-style explanations of the same concepts (blog posts, lecture notes)
3. Identify the mathematical or technical prerequisites
4. Look for implementations or code repositories

### When NOT to web search

- Well-established fundamentals (basic calculus, Python syntax, etc.) — use your own knowledge
- The user's specific context (their background, goals) — you already gathered this
- When you're confident in the material — don't slow down for unnecessary verification

## Planning Interactive Elements

For each chapter, decide what interactive elements would genuinely help understanding. Don't add interactivity for its own sake.

### Decision framework

Ask: "Would a static explanation be sufficient here, or does the learner need to *experience* this concept?"

| Concept type | Interactive element | Why it helps |
|---|---|---|
| Algorithm steps | Step-through animation or code runner | Seeing execution builds intuition |
| Parameter effects | Slider/knob that updates a visualization | Direct manipulation reveals relationships |
| Architecture/flow | Draggable/zoomable diagram | Spatial understanding of structure |
| Knowledge check | Quiz with immediate feedback | Retrieval practice strengthens memory |
| Comparison | Side-by-side or toggle | Direct comparison reveals differences |
| Process/recipe | Step-by-step with checkboxes | Tracking progress through a procedure |
| Data/statistics | Interactive chart | Exploring data reveals patterns |

### Domain-specific interactive elements

**Coding topics**: Runnable code blocks (JavaScript in-browser, Python display-only with copy button), algorithm visualizations, data structure explorers

**Visual/creative topics**: Image comparison sliders, color pickers, composition grid overlays, parameter adjustment demos

**Science/math topics**: Equation explorers (change variables, see effects), geometric visualizations, simulation playgrounds

**Practical skills**: Step-by-step checklists, timer components, measurement converters, decision trees

**Business/professional**: Scenario simulators, framework templates, ROI calculators, decision matrices
