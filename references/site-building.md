# Site Building

Complete technical guide for building the learning website. The goal is a working, interactive site with zero user intervention.

## Table of Contents

1. Prerequisites and installation
2. Project scaffolding
3. Package installation
4. Content loader setup
5. Component architecture
6. Interactive component builders
7. Math rendering setup
8. Building and serving
9. Troubleshooting

---

## 1. Prerequisites and Installation

### Node.js check

```bash
node --version  # Need 18+
```

If not installed, install silently:
- **macOS**: `brew install node` (if Homebrew available) or download from nodejs.org
- **Linux**: `curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash - && sudo apt-get install -y nodejs`
- **Windows**: Download installer from nodejs.org

Only ask the user for help if automated installation fails (e.g., needs admin password).

---

## 2. Project Scaffolding

Create the project in the user's working directory or a specified location:

```bash
npm create vite@latest learn-[topic-slug] -- --template react
cd learn-[topic-slug]
```

Replace `[topic-slug]` with a URL-safe version of the topic name (e.g., `multi-agent-rl`, `italian-cooking`, `phone-photography`).

### Directory structure after scaffolding

```
learn-[topic]/
├── public/
│   └── images/           # Generated images go here
├── src/
│   ├── content/          # Markdown files + manifest
│   ├── components/       # React components
│   ├── styles/           # CSS
│   ├── App.jsx
│   └── main.jsx
├── index.html
├── package.json
└── vite.config.js
```

Create the subdirectories:
```bash
mkdir -p src/{content,components,styles} public/images
```

---

## 3. Package Installation

### Core packages (always install)

```bash
npm install react-router-dom react-markdown remark-gfm rehype-raw react-syntax-highlighter
```

- `react-router-dom`: Chapter routing
- `react-markdown`: Markdown → React rendering
- `remark-gfm`: GitHub Flavored Markdown (tables, task lists, strikethrough)
- `rehype-raw`: Allow HTML in markdown
- `react-syntax-highlighter`: Code block highlighting

### Math support (install for academic/technical topics)

```bash
npm install remark-math rehype-katex katex
```

Then add the KaTeX CSS to `index.html`:
```html
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">
```

### Optional packages (install based on course needs)

| Package | When to install |
|---------|----------------|
| `reactflow` | Course has interactive node-based diagrams |
| `recharts` | Course has interactive data charts |
| `@uiw/react-codemirror` | Course has editable code blocks |
| `pyodide` | Course needs in-browser Python execution (large download, only if user specifically wants it) |

---

## 4. Content Loader Setup

Create `src/content/index.js` — this loads all markdown files and the manifest:

```javascript
import manifest from './manifest.json'

// Vite's import.meta.glob loads all .md files at build time
const markdownModules = import.meta.glob('./*.md', {
  query: '?raw',
  import: 'default',
  eager: true,
})

export const chapters = manifest.chapters.map((ch) => {
  const raw = markdownModules[`./${ch.file}`] || ''
  return {
    id: ch.id,
    title: ch.title,
    file: ch.file,
    content: raw,
  }
})

export const courseTitle = manifest.title
export const courseLanguage = manifest.language
```

---

## 5. Component Architecture

The skill provides template components in `assets/site-template/`. Copy them into the project's `src/` directory and customize as needed.

### Copying templates

The template files are in this skill's `assets/site-template/` directory. Copy them into the project:

```bash
# From the project directory
cp <skill-base-dir>/assets/site-template/App.jsx src/App.jsx
cp <skill-base-dir>/assets/site-template/main.jsx src/main.jsx
cp <skill-base-dir>/assets/site-template/index.html index.html
cp <skill-base-dir>/assets/site-template/components/Reader.jsx src/components/
cp <skill-base-dir>/assets/site-template/components/Sidebar.jsx src/components/
cp <skill-base-dir>/assets/site-template/styles/index.css src/styles/
```

Replace `<skill-base-dir>` with this skill's base directory path.

After copying, customize:
- **App.jsx**: Update the page title to the course title. The template includes a home page with progress tracking.
- **Sidebar.jsx**: Shows chapter list with progress indicators. Supports completion tracking via localStorage. No changes needed.
- **Reader.jsx**: Add custom component renderers for the interactive elements this course uses
- **index.css**: Adjust the CSS variables at the top (`--color-primary`, etc.) to match the topic's feel

### Component overview

**App.jsx** — Root component. Sets up HashRouter with routes for home page and each chapter. Includes:
- Home page with course overview, progress bar, and chapter card grid
- Progress tracking via localStorage
- Sidebar toggle for mobile

**Sidebar.jsx** — Left navigation panel. Shows chapter list with progress indicators. Collapsible on mobile. Highlights current chapter. Shows completion progress bar.

**Reader.jsx** — The core reading component. Renders markdown via react-markdown with:
- Custom heading renderers (clickable line references)
- Custom paragraph renderers (clickable line references)
- Custom code block renderer (dispatches to CodeRunner, Quiz, etc. based on language tag)
- Custom image renderer (figure with caption)
- Math rendering (if KaTeX is installed)

---

## 6. Interactive Component Builders

Based on the interactive markers in the markdown (see `content-creation.md`), create the corresponding React components. These are topic-specific — not all courses need all components.

### CodeRunner component

For `run-javascript` and other `run-*` code blocks:

```jsx
import { useState } from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'

function CodeRunner({ language, initialCode }) {
  const [code, setCode] = useState(initialCode)
  const [output, setOutput] = useState('')

  const run = () => {
    if (language === 'javascript' || language === 'js') {
      try {
        const logs = []
        const fakeConsole = { log: (...args) => logs.push(args.map(String).join(' ')) }
        const fn = new Function('console', code)
        fn(fakeConsole)
        setOutput(logs.join('\n'))
      } catch (e) {
        setOutput(`Error: ${e.message}`)
      }
    }
  }

  const copy = () => navigator.clipboard.writeText(code)

  return (
    <div className="code-runner">
      <div className="code-runner-header">
        <span className="code-runner-lang">{language}</span>
        <div className="code-runner-actions">
          <button onClick={copy} title="Copy code">📋</button>
          {(language === 'javascript' || language === 'js') && (
            <button onClick={run} className="run-btn">▶ Run</button>
          )}
        </div>
      </div>
      <textarea
        className="code-runner-editor"
        value={code}
        onChange={(e) => setCode(e.target.value)}
        spellCheck={false}
      />
      {output && (
        <pre className="code-runner-output">{output}</pre>
      )}
    </div>
  )
}

export default CodeRunner
```

### Quiz component

For `quiz` code blocks:

```jsx
import { useState } from 'react'

function Quiz({ data }) {
  const { question, options, answer, explanation } = data
  const [selected, setSelected] = useState(null)
  const [revealed, setRevealed] = useState(false)

  const check = (index) => {
    setSelected(index)
    setRevealed(true)
  }

  return (
    <div className="quiz">
      <p className="quiz-question">{question}</p>
      <div className="quiz-options">
        {options.map((opt, i) => (
          <button
            key={i}
            className={`quiz-option ${revealed ? (i === answer ? 'correct' : i === selected ? 'incorrect' : '') : ''}`}
            onClick={() => !revealed && check(i)}
            disabled={revealed}
          >
            {opt}
          </button>
        ))}
      </div>
      {revealed && (
        <div className={`quiz-feedback ${selected === answer ? 'correct' : 'incorrect'}`}>
          <p>{selected === answer ? '✓' : '✗'} {explanation}</p>
        </div>
      )}
    </div>
  )
}

export default Quiz
```

### InteractiveSteps component

For `interactive-steps` blocks:

```jsx
import { useState } from 'react'

function InteractiveSteps({ data }) {
  const { title, steps } = data
  const [currentStep, setCurrentStep] = useState(0)
  const [completed, setCompleted] = useState(new Set())

  const toggleComplete = (index) => {
    const next = new Set(completed)
    if (next.has(index)) next.delete(index)
    else next.add(index)
    setCompleted(next)
  }

  return (
    <div className="interactive-steps">
      <h4>{title}</h4>
      <div className="steps-progress">
        {completed.size} / {steps.length}
      </div>
      {steps.map((step, i) => (
        <div key={i} className={`step ${completed.has(i) ? 'completed' : ''} ${i === currentStep ? 'active' : ''}`}>
          <div className="step-header" onClick={() => setCurrentStep(i)}>
            <input
              type="checkbox"
              checked={completed.has(i)}
              onChange={() => toggleComplete(i)}
            />
            <span className="step-number">{i + 1}</span>
            <span className="step-text">{step.text}</span>
          </div>
          {i === currentStep && step.tip && (
            <div className="step-tip">💡 {step.tip}</div>
          )}
        </div>
      ))}
    </div>
  )
}

export default InteractiveSteps
```

### Adding other interactive components

Follow the same pattern:
1. Read the JSON data from the markdown code block
2. Create a React component that renders the interactive element
3. Register it in the Reader's code block dispatcher

The Reader.jsx template handles the dispatching — just add new cases to the `renderCodeBlock` function.

---

## 7. Math Rendering Setup

For courses with mathematical content, add KaTeX support:

1. Install packages (done in step 3)
2. Add to index.html: `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.16.11/dist/katex.min.css">`
3. Add plugins to the Reader's ReactMarkdown:

```jsx
import remarkMath from 'remark-math'
import rehypeKatex from 'rehype-katex'

// In the ReactMarkdown component:
<ReactMarkdown
  remarkPlugins={[remarkGfm, remarkMath]}
  rehypePlugins={[rehypeRaw, rehypeKatex]}
  components={components}
>
  {content}
</ReactMarkdown>
```

---

## 8. Building and Serving

### Development server

```bash
npm run dev
```

This starts the Vite dev server with hot module replacement. Changes to markdown files, components, or styles are reflected immediately.

After starting, open the URL (typically `http://localhost:5173`) in the user's browser:
```bash
open http://localhost:5173    # macOS
xdg-open http://localhost:5173  # Linux
start http://localhost:5173     # Windows
```

### Production build (if user needs static files)

```bash
npm run build
```

Output goes to `dist/`. These files can be served by any static file server or opened directly.

---

## 9. Troubleshooting

### Common issues and silent fixes

| Problem | Fix |
|---------|-----|
| `npm create vite` fails | Try `npx create-vite@latest` instead |
| Port 5173 in use | Vite auto-selects next available port; check terminal output |
| Import errors for `.md` files | Ensure `?raw` query in import.meta.glob call |
| KaTeX not rendering | Verify the CSS link in index.html, check import spelling |
| Images not loading | Verify paths are relative to `public/` (use `/images/...` in markdown) |
| Code runner `eval` blocked | Use `new Function()` instead of `eval()` for code execution |
| React hydration warnings | These are usually harmless in dev mode; ignore them |

### If something fails during setup

1. Delete `node_modules` and `package-lock.json`, then `npm install` again
2. If a specific package fails, check if there's an alternative (e.g., `prism-react-renderer` instead of `react-syntax-highlighter`)
3. If Vite has issues, try clearing the cache: `npx vite --force`
4. Never show error output to the user. Fix it or find an alternative.
