import { useState, useEffect } from 'react'
import { HashRouter, Routes, Route, Navigate, Link } from 'react-router-dom'
import Sidebar from './components/Sidebar'
import Reader from './components/Reader'
import { chapters, courseTitle } from './content'

function HomePage({ chapters, fontSize }) {
  const [progress, setProgress] = useState({})

  useEffect(() => {
    try {
      const saved = localStorage.getItem('learn-anything-progress')
      if (saved) setProgress(JSON.parse(saved))
    } catch {}
  }, [])

  const completedCount = Object.keys(progress).filter(k => progress[k]).length
  const progressPercent = chapters.length ? Math.round((completedCount / chapters.length) * 100) : 0

  return (
    <div className="home-page" style={{ fontSize: `${fontSize}px` }}>
      <div className="home-hero">
        <h1 className="home-title">{courseTitle}</h1>
        <div className="home-progress-bar">
          <div className="home-progress-fill" style={{ width: `${progressPercent}%` }} />
        </div>
        <p className="home-progress-text">{completedCount} / {chapters.length} chapters completed ({progressPercent}%)</p>
      </div>

      <div className="home-chapters">
        {chapters.map((chapter, index) => {
          const isCompleted = progress[chapter.id]
          return (
            <Link to={`/${chapter.id}`} key={chapter.id} className={`home-chapter-card ${isCompleted ? 'completed' : ''}`}>
              <div className="home-chapter-number">{index + 1}</div>
              <div className="home-chapter-info">
                <h3>{chapter.title}</h3>
                {isCompleted && <span className="home-chapter-check">✓</span>}
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}

function App() {
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [progress, setProgress] = useState({})
  const [darkMode, setDarkMode] = useState(false)
  const [fontSize, setFontSize] = useState(16)

  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('learn-anything-progress')
      if (savedProgress) setProgress(JSON.parse(savedProgress))
      const savedDark = localStorage.getItem('learn-anything-dark')
      if (savedDark !== null) setDarkMode(savedDark === 'true')
      const savedFont = localStorage.getItem('learn-anything-fontsize')
      if (savedFont) setFontSize(parseInt(savedFont, 10))
    } catch {}
  }, [])

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode)
    try { localStorage.setItem('learn-anything-dark', String(darkMode)) } catch {}
  }, [darkMode])

  useEffect(() => {
    try { localStorage.setItem('learn-anything-fontsize', String(fontSize)) } catch {}
  }, [fontSize])

  const markComplete = (chapterId) => {
    const next = { ...progress, [chapterId]: true }
    setProgress(next)
    try { localStorage.setItem('learn-anything-progress', JSON.stringify(next)) } catch {}
  }

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen)

  if (!chapters.length) {
    return <div className="app-empty">No chapters found. Add markdown files to src/content/.</div>
  }

  return (
    <HashRouter>
      <div className={`app ${sidebarOpen ? '' : 'sidebar-collapsed'} ${darkMode ? 'dark' : ''}`}>
        <Sidebar
          title={courseTitle}
          chapters={chapters}
          isOpen={sidebarOpen}
          onToggle={toggleSidebar}
          progress={progress}
        />
        <main className="main-content">
          <div className="top-bar">
            <button className="sidebar-toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
              {sidebarOpen ? '◀' : '▶'}
            </button>
            <div className="top-bar-controls">
              <button
                className="font-btn"
                onClick={() => setFontSize(Math.max(12, fontSize - 2))}
                aria-label="Decrease font size"
              >A-</button>
              <button
                className="font-btn"
                onClick={() => setFontSize(Math.min(24, fontSize + 2))}
                aria-label="Increase font size"
              >A+</button>
              <button
                className="dark-mode-btn"
                onClick={() => setDarkMode(!darkMode)}
                aria-label="Toggle dark mode"
              >{darkMode ? '☀' : '☾'}</button>
            </div>
          </div>
          <button
            className="sidebar-toggle-mobile"
            onClick={toggleSidebar}
            aria-label="Toggle navigation"
          >
            ☰
          </button>
          <Routes>
            <Route path="/" element={<HomePage chapters={chapters} fontSize={fontSize} />} />
            {chapters.map((chapter, index) => (
              <Route
                key={chapter.id}
                path={`/${chapter.id}`}
                element={
                  <Reader
                    chapter={chapter}
                    prevChapter={chapters[index - 1] || null}
                    nextChapter={chapters[index + 1] || null}
                    onComplete={() => markComplete(chapter.id)}
                    isCompleted={!!progress[chapter.id]}
                    fontSize={fontSize}
                  />
                }
              />
            ))}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </main>
      </div>
    </HashRouter>
  )
}

export default App
