# Content Creation

Guidelines for writing chapter content, generating images, and embedding interactive elements.

## Writing Guidelines

### The most important thing: teach well

The single biggest factor in whether a course succeeds is **how well the explanations work**. Not the interactive elements, not the diagrams, not the visual design — the words on the page. Every chapter should feel like sitting with a great tutor who knows exactly how to make you understand.

### The explanation template

For every significant concept, follow this structure:

```
1. INTUITION (analogy + everyday example)
   "Think of Q/K/V like a search engine:
    Query = your search keywords
    Key = page titles/tags
    Value = actual page content"

2. WHY IT EXISTS (what problem does it solve?)
   "Before self-attention, we had to compress entire sequences
    into a single vector. That's like summarizing a 500-page
    novel in one sentence — you lose almost everything."

3. CONCRETE WALKTHROUGH (real numbers, step by step)
   Show a 3×3 or 4×4 matrix with actual numbers.
   Walk through EVERY computation step with those numbers.
   Don't skip steps — the reader needs to see the arithmetic.

4. FORMAL DEFINITION (now they're ready for it)
   Now give the general formula. At this point the reader
   already knows what each piece does from the walkthrough.

5. COMMON MISCONCEPTIONS
   "A common mistake is to think attention weights are
    probabilities — they are, but over the KEY dimension,
    not the output dimension."
```

### Voice and tone

- **Match the learner's level.** If they're a beginner, use simple language and build up vocabulary gradually. If they're advanced, respect their knowledge and don't over-explain basics.
- **Be concrete.** Every abstract concept should have a concrete example within a paragraph or two. "A neural network learns by adjusting weights" → show a simple network with actual numbers changing.
- **Use analogies appropriate to the domain.** Aim for at least 2-3 analogies per chapter. For a programmer learning ML: "Think of gradient descent like binary search — you're narrowing in on the answer." For a chef learning food science: "Gluten networks are like the scaffolding on a building."
- **Progressive disclosure.** Start with the intuition, then add formality. "Here's the idea → here's why it works → here's the math if you want it."
- **Active voice.** "The optimizer updates the weights" not "The weights are updated by the optimizer."
- **Numerical walkthroughs.** For any algorithm or mathematical process, include a worked example with real numbers. Show the actual computation at every step. This is the single most effective teaching technique for technical content — far more impactful than interactive widgets.
- **Connect chapters.** Each chapter should reference specific concepts from previous chapters. "Remember the gradient vanishing problem from Chapter 1? Here's how attention solves it..."

### Structure within a chapter

```markdown
# Chapter Title

Opening paragraph — what this chapter covers and why it matters. Connect to what came before.

## Section 1: Core Concept

Explanation with examples...

![Diagram showing concept](./images/chapter-XX/diagram-01.svg)

More explanation building on the diagram...

## Section 2: Going Deeper

More detailed treatment...

```run-javascript
// Interactive code example
const result = someFunction(input);
console.log(result);
```

## Section 3: Practice / Application

Exercises, examples, or hands-on activities...

```quiz
{
  "question": "Which approach would you use for X?",
  "options": ["Option A", "Option B", "Option C"],
  "answer": 1,
  "explanation": "Option B because..."
}
```

## Summary

Key takeaways — 3-5 bullet points.
```

### Math notation

Use LaTeX syntax for mathematical expressions. The site renders them via KaTeX.

- Inline: `$E = mc^2$`
- Block: `$$\nabla_\theta J(\theta) = \mathbb{E}[\nabla_\theta \log \pi_\theta(a|s) \cdot R]$$`

### Markdown conventions for line references

The site's line reference system tracks source positions in the markdown files. To make references maximally useful:

- Put each paragraph on contiguous lines (don't split a sentence across many blank-line-separated lines)
- Give each significant section its own heading (h2 or h3)
- Keep code blocks self-contained — they should make sense without the surrounding text
- Put image references on their own line: `![caption](path)`

---

## Image Generation

### Priority 1: SVG (diagrams, flowcharts, architecture)

SVGs are the best choice for most diagrams because they're crisp at any zoom level, can be edited later, and don't require external tools.

**How to generate:**
- Write SVG markup directly — the agent is capable of producing clean, well-structured SVG
- Use clear colors, readable font sizes (14px+ for body text, 16px+ for labels)
- Include a viewBox for responsive sizing
- Save to `public/images/chapter-XX/name.svg`

**Good uses:** Architecture diagrams, flowcharts, concept maps, comparison tables, process flows, tree structures, network diagrams

**Example pattern:**
```svg
<svg viewBox="0 0 600 400" xmlns="http://www.w3.org/2000/svg">
  <style>
    text { font-family: system-ui, sans-serif; }
    .node { fill: #e8f4fd; stroke: #2196F3; stroke-width: 2; rx: 8; }
    .label { font-size: 14px; text-anchor: middle; fill: #333; }
    .arrow { stroke: #666; stroke-width: 2; marker-end: url(#arrowhead); }
  </style>
  <defs>
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="10" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#666"/>
    </marker>
  </defs>
  <!-- nodes and connections here -->
</svg>
```

### Priority 2: Python (charts, graphs, data visualizations)

Use matplotlib or similar libraries when data visualization is needed.

**How to generate:**
- Write a Python script that saves the figure to the correct path
- Use `plt.savefig('public/images/chapter-XX/name.png', dpi=150, bbox_inches='tight')`
- Set figure size appropriately: `plt.figure(figsize=(8, 5))` for standard, `(10, 6)` for wide
- Use a clean style: `plt.style.use('seaborn-v0_8-whitegrid')` or similar
- Run the script with `python script.py`

**Good uses:** Training curves, data distributions, comparison bar charts, scatter plots, heatmaps

### Priority 3: Web search (reference photos, real-world examples)

When the concept needs a real-world photograph or screenshot that can't be generated.

**How to use:**
- Search for images using web search
- Verify the image is appropriate and relevant
- Download to `public/images/chapter-XX/`
- Always include proper attribution in the image caption

**Good uses:** Real-world examples (cooking results, photography samples, product screenshots), historical images, UI references

### Priority 4: AI image generation (optional)

Only if the user has explicitly configured an API token for an image generation service.

- Ask the user before using this — never call an API that costs money without permission
- Good for: conceptual illustrations, artistic representations, realistic scenarios that can't be photographed

---

## Interactive Element Catalog

Interactive elements are embedded in markdown using special code block syntax. The language tag tells the site builder what component to create.

### Runnable Code Blocks

````markdown
```run-javascript
// This code can be edited and run in the browser
const fibonacci = (n) => n <= 1 ? n : fibonacci(n-1) + fibonacci(n-2);
console.log(fibonacci(10)); // 55
```
````

````markdown
```run-python
# Python code is displayed with syntax highlighting and a copy button
# (Browser-based Python execution via Pyodide is optional — see site-building.md)
import numpy as np
x = np.linspace(0, 2*np.pi, 100)
print(f"Generated {len(x)} points")
```
````

**Supported run- languages:**
- `run-javascript` / `run-js`: Executes in a sandboxed iframe in the browser
- `run-python`: Display with copy button by default. If Pyodide is configured, can execute in-browser.
- `run-html`: Renders HTML in an iframe preview
- Other `run-*` languages: Display with syntax highlighting and copy button

### Quizzes

````markdown
```quiz
{
  "question": "What does the softmax function output?",
  "options": [
    "Raw logits",
    "A probability distribution that sums to 1",
    "Binary 0 or 1 values",
    "Negative log likelihood"
  ],
  "answer": 1,
  "explanation": "Softmax converts raw scores (logits) into probabilities. Each output is between 0 and 1, and all outputs sum to 1, making it a valid probability distribution."
}
```
````

### Interactive Diagrams

````markdown
```interactive-diagram
{
  "type": "flowchart",
  "title": "Neural Network Forward Pass",
  "nodes": [
    {"id": "input", "label": "Input Layer", "x": 50, "y": 200},
    {"id": "hidden", "label": "Hidden Layer", "x": 250, "y": 200},
    {"id": "output", "label": "Output Layer", "x": 450, "y": 200}
  ],
  "edges": [
    {"from": "input", "to": "hidden", "label": "W1"},
    {"from": "hidden", "to": "output", "label": "W2"}
  ]
}
```
````

The site builder creates a draggable, zoomable diagram from this data. Nodes can be repositioned by the user.

### Parameter Sliders

````markdown
```interactive-slider
{
  "title": "Learning Rate Effect",
  "parameters": [
    {"name": "learning_rate", "label": "Learning Rate", "min": 0.001, "max": 1.0, "step": 0.001, "default": 0.01}
  ],
  "visualization": "line-chart",
  "description": "Drag the slider to see how different learning rates affect convergence"
}
```
````

### Step-by-Step Guides

````markdown
```interactive-steps
{
  "title": "Making Fresh Pasta",
  "steps": [
    {"text": "Mound 200g flour on a clean surface, make a well in the center", "tip": "The well should be wide enough to hold 2 eggs"},
    {"text": "Crack 2 eggs into the well, add a pinch of salt", "tip": "Room temperature eggs incorporate better"},
    {"text": "Gradually mix flour into eggs with a fork", "tip": "Start from the inner wall of the well"},
    {"text": "Knead for 8-10 minutes until smooth", "tip": "The dough should feel like your earlobe when pressed"}
  ]
}
```
````

### Comparison / Before-After

````markdown
```interactive-compare
{
  "title": "Rule of Thirds vs Center Composition",
  "left": {"label": "Center", "image": "./images/chapter-03/center.jpg"},
  "right": {"label": "Rule of Thirds", "image": "./images/chapter-03/thirds.jpg"},
  "mode": "slider"
}
```
````

### Tabs / Variant Selector

````markdown
```interactive-tabs
{
  "title": "Implementation in Different Frameworks",
  "tabs": [
    {"label": "PyTorch", "content": "```python\nimport torch\nmodel = torch.nn.Linear(10, 5)\n```"},
    {"label": "TensorFlow", "content": "```python\nimport tensorflow as tf\nmodel = tf.keras.layers.Dense(5)\n```"},
    {"label": "JAX", "content": "```python\nimport jax.numpy as jnp\nparams = jnp.zeros((10, 5))\n```"}
  ]
}
```
````

### Collapsible Details

````markdown
```interactive-details
{
  "summary": "Mathematical proof (click to expand)",
  "content": "The full proof using LaTeX notation...\n\n$$\\frac{\\partial L}{\\partial w} = ...$$"
}
```
````

---

## Content File Organization

```
src/content/
├── manifest.json          # Chapter ordering and metadata
├── chapter-01.md          # Chapter 1 source
├── chapter-02.md          # Chapter 2 source
└── ...

public/images/
├── chapter-01/
│   ├── architecture.svg
│   └── training-curve.png
├── chapter-02/
│   └── comparison.svg
└── ...
```

### manifest.json structure

```json
{
  "title": "Course Title in User's Language",
  "language": "zh-CN",
  "chapters": [
    {
      "id": "chapter-01",
      "title": "Chapter Title",
      "file": "chapter-01.md"
    },
    {
      "id": "chapter-02",
      "title": "Another Chapter",
      "file": "chapter-02.md"
    }
  ]
}
```

The content loader (`src/content/index.js`) reads the manifest and imports all markdown files. See `references/site-building.md` for the loader implementation.
