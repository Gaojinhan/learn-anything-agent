# Feedback Loop

How the line reference system works and how to handle user requests for changes and expansions.

## Line Reference System

The key innovation of this learning site is the **line reference system**: users can click on any content block to see its source location, then paste that reference back to the agent for targeted modifications.

### How it works technically

1. The markdown files have natural line numbers (line 1, line 2, etc.)
2. `react-markdown` parses the markdown AST and each node includes position data (`node.position.start.line`, `node.position.end.line`)
3. The Reader component attaches `data-lines` attributes to rendered elements
4. On click, a small overlay shows the reference: `chapter-02.md:15-22`
5. The user copies this reference (click-to-copy) and pastes it to the agent

### Reference format

```
{filename}:{start_line}-{end_line}
```

Examples:
- `chapter-01.md:5` — a single-line element (heading)
- `chapter-03.md:45-60` — a multi-line block (paragraph, code block)
- `chapter-05.md:12-15` — an image with caption

### Why this matters

This approach solves a fundamental problem with iterative content creation:
- **Without references**: The user has to describe or copy-paste what they want changed. The agent has to search for it. Both are slow and error-prone.
- **With references**: The user pastes `chapter-03.md:45-60`, the agent reads those exact lines, makes changes, and the site hot-reloads. Fast, precise, no ambiguity.

Line numbers are also much easier for the agent to track across turns than full content strings.

---

## Handling User Requests

### Content modification

When the user provides a line reference with a change request:

1. Read the referenced file and lines
2. Understand what the user wants changed
3. Make the edit — use the same style and tone as the rest of the chapter
4. The Vite dev server hot-reloads automatically; the user sees the change immediately

**Common requests:**
- "This is too complex" → Simplify the language, add a more intuitive explanation first, then optionally keep the detailed version in a collapsible section
- "I don't get this" → Try a different explanation approach — different analogy, worked example, or visual
- "This is wrong" → Fix the error, verify accuracy
- "Add more detail here" → Expand the section, potentially splitting it into subsections
- "This is boring" → Add an example, an interactive element, or a more engaging framing

### Adding interactive elements

When the user wants more interactivity at a specific point:

1. Identify what kind of interaction would help (see the catalog in `content-creation.md`)
2. Add the interactive marker to the markdown at the right location
3. If the component type doesn't exist yet, create the React component
4. Register it in the Reader's code block dispatcher
5. The site hot-reloads with the new interactive element

### Expanding the course

When the user wants more chapters:

1. Review `course-plan.md` to see what was originally planned but not yet written
2. Discuss with the user what to add next
3. Write the new chapter's markdown file
4. Add it to `src/content/manifest.json`
5. Update `src/content/index.js` if needed (usually not, since `import.meta.glob` auto-discovers `.md` files)
6. The new chapter appears in the sidebar navigation automatically

### Reorganizing content

If the user wants to reorder chapters or move content between them:

1. Move the content in the markdown files
2. Update `manifest.json` to reflect the new order
3. Renumber chapter files if needed for clarity (optional — IDs matter more than filenames)
4. Update any cross-references between chapters

---

## Iteration Best Practices

### Keep the dev server running

Don't stop and restart the dev server between edits. Vite's HMR (Hot Module Replacement) handles updates automatically. The user sees changes within seconds of the agent saving a file.

### Batch related changes

If the user has multiple change requests, make them all before telling the user to refresh. This avoids the user seeing partially-updated content.

### Track what changed

When making changes, briefly tell the user what you modified:
- "Updated chapter-03.md:45-60 with a simpler explanation of backpropagation"
- "Added an interactive code example at chapter-02.md:80"
- "Created chapter-08 on advanced optimization techniques"

This keeps the user informed without requiring them to diff files.

### When to suggest more content

After the user has reviewed the initial chapters, proactively suggest expansions based on:
- Topics mentioned in `course-plan.md` that weren't included in the initial generation
- Concepts the user seems most interested in (based on their questions)
- Natural next steps in the learning progression
- Areas where the existing content is thin

But don't push — let the user drive the pace.

---

## Session Continuity

If the user returns in a new conversation:

1. Check if the project directory still exists
2. Read `course-plan.md` and `manifest.json` to understand the current state
3. Start the dev server if it's not running
4. Pick up where the user left off

The line reference system makes it easy to resume — the user can point to exactly where they want to continue working.
