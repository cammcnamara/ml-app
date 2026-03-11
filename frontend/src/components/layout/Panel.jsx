/**
 * A content section within a scene.
 * Shows eyebrow, title, subtitle, and body children.
 * No left/right distinction — all panels are full-width in the vertical layout.
 */
import React from 'react'

function Panel({ eyebrow, title, subtitle, children }) {
  return (
    <div className="panel">
      {eyebrow && <div className="panel__eyebrow">{eyebrow}</div>}
      {title && <h2 className="panel__title">{title}</h2>}
      {subtitle && <p className="panel__subtitle">{subtitle}</p>}
      <div className="panel__body">{children}</div>
    </div>
  )
}

export default Panel
