import { useState, useCallback, useMemo } from 'react'
import { Link } from 'react-router-dom'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'
import rehypeRaw from 'rehype-raw'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { oneLight } from 'react-syntax-highlighter/dist/esm/styles/prism'
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism'

/*
 * Optional imports for math support — uncomment if course needs LaTeX:
 * import remarkMath from 'remark-math'
 * import rehypeKatex from 'rehype-katex'
 */

function LineRefTag({ reference }) {
  const [copied, setCopied] = useState(false)

  const handleCopy = (e) => {
    e.stopPropagation()
    e.preventDefault()
    navigator.clipboard.writeText(reference).then(() => {
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    }).catch(() => {
      // Fallback for clipboard API failure
      const textarea = document.createElement('textarea')
      textarea.value = reference
      textarea.style.position = 'fixed'
      textarea.style.opacity = '0'
      document.body.appendChild(textarea)
      textarea.select()
      document.execCommand('copy')
      document.body.removeChild(textarea)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    })
  }

  return (
    <button
      className="line-ref-tag"
      onClick={handleCopy}
      title={`Click to copy line reference: ${reference}`}
    >
      {copied ? '✓ Copied!' : reference}
    </button>
  )
}

function Reader({ chapter, prevChapter, nextChapter, onComplete, isCompleted, fontSize }) {
  const [activeBlock, setActiveBlock] = useState(null)
  const isDark = document.documentElement.classList.contains('dark')

  const handleBlockClick = useCallback((file, start, end) => {
    const ref = `${file}:${start}${end && end !== start ? `-${end}` : ''}`
    setActiveBlock((prev) => (prev === ref ? null : ref))
  }, [])

  const components = useMemo(() => {
    const file = chapter.file

    const wrapWithLineRef = (Tag) => {
      return ({ children, node, ...props }) => {
        const start = node?.position?.start?.line
        const end = node?.position?.end?.line
        if (!start) return <Tag {...props}>{children}</Tag>

        const ref = `${file}:${start}${end && end !== start ? `-${end}` : ''}`
        const isActive = activeBlock === ref

        return (
          <Tag
            {...props}
            className={`has-line-ref ${isActive ? 'line-ref-active' : ''}`}
            onClick={(e) => {
              if (window.getSelection().toString()) return
              if (e.target.closest('a')) return
              if (e.target.closest('button')) return
              handleBlockClick(file, start, end)
            }}
            data-lines={ref}
          >
            {children}
            {isActive && <LineRefTag reference={ref} />}
          </Tag>
        )
      }
    }

    return {
      p: wrapWithLineRef('p'),
      h1: wrapWithLineRef('h1'),
      h2: wrapWithLineRef('h2'),
      h3: wrapWithLineRef('h3'),
      h4: wrapWithLineRef('h4'),
      li: wrapWithLineRef('li'),
      blockquote: wrapWithLineRef('blockquote'),

      code: ({ node, inline, className, children, ...props }) => {
        const raw = String(children).replace(/\n$/, '')
        const langMatch = /language-(\S+)/.exec(className || '')
        const lang = langMatch ? langMatch[1] : ''

        if (inline) {
          return <code className="inline-code" {...props}>{children}</code>
        }

        // Interactive code blocks
        if (lang.startsWith('run-')) {
          const actualLang = lang.replace('run-', '')
          return (
            <div className="code-runner-placeholder" data-lang={actualLang}>
              <SyntaxHighlighter style={isDark ? oneDark : oneLight} language={actualLang} PreTag="div">
                {raw}
              </SyntaxHighlighter>
              <button
                className="copy-btn"
                onClick={() => navigator.clipboard.writeText(raw)}
              >
                Copy
              </button>
            </div>
          )
        }

        // Quiz blocks
        if (lang === 'quiz') {
          try {
            const data = JSON.parse(raw)
            return (
              <div className="quiz-placeholder">
                <p><strong>{data.question}</strong></p>
                {data.options?.map((opt, i) => (
                  <div key={i}>• {opt}</div>
                ))}
              </div>
            )
          } catch {
            return <pre>{raw}</pre>
          }
        }

        // Interactive diagram blocks
        if (lang === 'interactive-diagram') {
          try {
            const data = JSON.parse(raw)
            return (
              <div className="diagram-placeholder">
                <p><em>{data.title || 'Interactive Diagram'}</em></p>
                <pre>{JSON.stringify(data, null, 2)}</pre>
              </div>
            )
          } catch {
            return <pre>{raw}</pre>
          }
        }

        // Standard code blocks
        const start = node?.position?.start?.line
        const end = node?.position?.end?.line
        const ref = start ? `${file}:${start}${end && end !== start ? `-${end}` : ''}` : null

        return (
          <div
            className={`code-block-wrapper has-line-ref ${activeBlock === ref ? 'line-ref-active' : ''}`}
            onClick={() => ref && handleBlockClick(file, start, end)}
            data-lines={ref}
          >
            <div className="code-block-header">
              <span className="code-block-lang">{lang}</span>
              <button
                className="copy-btn"
                onClick={(e) => {
                  e.stopPropagation()
                  navigator.clipboard.writeText(raw)
                }}
              >
                Copy
              </button>
            </div>
            <SyntaxHighlighter
              style={isDark ? oneDark : oneLight}
              language={lang || 'text'}
              PreTag="div"
              showLineNumbers={raw.split('\n').length > 3}
            >
              {raw}
            </SyntaxHighlighter>
            {activeBlock === ref && <LineRefTag reference={ref} />}
          </div>
        )
      },

      img: ({ src, alt, node }) => {
        const start = node?.position?.start?.line
        const ref = start ? `${file}:${start}` : null

        return (
          <figure
            className={`image-figure has-line-ref ${activeBlock === ref ? 'line-ref-active' : ''}`}
            onClick={() => ref && handleBlockClick(file, start, start)}
            data-lines={ref}
          >
            <img src={src} alt={alt || ''} loading="lazy" />
            {alt && <figcaption>{alt}</figcaption>}
            {activeBlock === ref && <LineRefTag reference={ref} />}
          </figure>
        )
      },

      table: ({ children }) => (
        <div className="table-wrapper">
          <table>{children}</table>
        </div>
      ),
    }
  }, [chapter.file, activeBlock, handleBlockClick, isDark])

  return (
    <article className="reader">
      <div className="reader-header">
        <div className="reader-content" style={{ fontSize: `${fontSize}px` }}>
          <ReactMarkdown
            remarkPlugins={[remarkGfm]}
            rehypePlugins={[rehypeRaw]}
            components={components}
          >
            {chapter.content}
          </ReactMarkdown>
        </div>
      </div>

      <div className="reader-footer">
        {!isCompleted && onComplete && (
          <button className="mark-complete-btn" onClick={onComplete}>
            ✓ Mark chapter as complete
          </button>
        )}
        {isCompleted && (
          <span className="chapter-completed-badge">✓ Chapter completed</span>
        )}

        <nav className="chapter-nav">
          {prevChapter ? (
            <Link to={`/${prevChapter.id}`} className="chapter-nav-link prev">
              ← {prevChapter.title}
            </Link>
          ) : (
            <span />
          )}
          {nextChapter ? (
            <Link to={`/${nextChapter.id}`} className="chapter-nav-link next">
              {nextChapter.title} →
            </Link>
          ) : (
            <span />
          )}
        </nav>
      </div>
    </article>
  )
}

export default Reader
