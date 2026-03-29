import { NavLink, Link } from 'react-router-dom'

function Sidebar({ title, chapters, isOpen, onToggle, progress }) {
  const completedCount = Object.keys(progress || {}).filter(k => progress[k]).length
  const progressPercent = chapters.length ? Math.round((completedCount / chapters.length) * 100) : 0

  return (
    <aside className={`sidebar ${isOpen ? 'open' : 'closed'}`}>
      <div className="sidebar-header">
        <Link to="/" className="sidebar-title">{title}</Link>
        <button className="sidebar-close" onClick={onToggle} aria-label="Close navigation">
          ✕
        </button>
      </div>

      {chapters.length > 0 && (
        <div className="sidebar-progress">
          <div className="sidebar-progress-bar">
            <div className="sidebar-progress-fill" style={{ width: `${progressPercent}%` }} />
          </div>
          <span className="sidebar-progress-label">{progressPercent}% complete</span>
        </div>
      )}

      <nav className="sidebar-nav">
        <ul className="chapter-list">
          {chapters.map((chapter, index) => {
            const isCompleted = progress && progress[chapter.id]
            return (
              <li key={chapter.id} className="chapter-item">
                <NavLink
                  to={`/${chapter.id}`}
                  className={({ isActive }) =>
                    `chapter-link ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`
                  }
                >
                  <span className={`chapter-number ${isCompleted ? 'done' : ''}`}>
                    {isCompleted ? '✓' : index + 1}
                  </span>
                  <span className="chapter-title">{chapter.title}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>

      <div className="sidebar-footer">
        <p className="sidebar-hint">
          Click any content block to get its line reference for editing.
        </p>
      </div>
    </aside>
  )
}

export default Sidebar
