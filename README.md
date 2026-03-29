# learn-anything-agent

A [Claude Code](https://claude.ai/code) skill that transforms any learning goal into an interactive, locally-served web course.

## What it does

Tell Claude what you want to learn — a technical topic, a paper you can't understand, a practical skill — and the agent interviews you, designs a curriculum, writes the content, and builds a React-based reading experience served locally on your machine.

The output is like a more concise, more interactive Hugging Face course: structured chapters, generated diagrams, and hands-on interactive elements tailored to both the subject and the learner.

## Installation

1. Clone this repo into your Claude Code skills directory:

```bash
git clone https://github.com/Gaojinhan/learn-anything-agent.git ~/.claude/skills/learn-anything
```

2. Make sure [Node.js](https://nodejs.org/) is installed.

That's it. Claude handles the rest automatically.

## Usage

Just tell Claude what you want to learn:

```
Teach me how transformers work
帮我搞懂强化学习
I found this paper but can't understand it — [attach PDF]
Create a course on sourdough baking for a complete beginner
```

The agent will ask 3–5 clarifying questions (background, goal, language preference), then build and serve the course.

## Workflow

```
Interview → Plan → Create Content → Build Site → Iterate
```

| Phase | What happens |
|-------|-------------|
| Interview | Agent scopes the topic and learns your background |
| Content Planning | Curriculum outline (5–10 chapters) presented for your approval |
| Content Creation | Markdown chapters with diagrams and interactive elements |
| Site Building | Vite + React site scaffolded and served locally |
| Iteration | Click any content block to get a reference tag, paste it back to request changes |

## Key features

- **Topic-adaptive teaching** — ML courses get runnable code; cooking courses get timing guides; abstract topics get visual analogies
- **Language follows you** — all content, UI, and code comments are generated in your chosen language
- **Zero debugging** — build errors are handled silently; you never see a terminal error
- **Line reference system** — click any paragraph or diagram on the site to get a precise reference (e.g. `chapter-02.md:15-22`) for targeted edits
- **Iterative expansion** — start with ~15 pages, expand based on what you find most valuable

## License

MIT
