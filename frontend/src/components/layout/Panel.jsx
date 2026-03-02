/**
 * One side of a scene (left or right).
 *
 * Shows:
 * - eyebrow (step label)
 * - title (panel title)
 * - subtitle (short description)
 * - body content via `children` (card components like UploadCard, ResultsCard).
 */
import React from 'react'

function Panel({ side, eyebrow, title, subtitle, children }) {
  return (
    <div className={`panel panel--${side}`}>
      {eyebrow && <div className="panel__eyebrow">{eyebrow}</div>}
      {title && <h2 className="panel__title">{title}</h2>}
      {subtitle && <p className="panel__subtitle">{subtitle}</p>}
      <div className="panel__body">{children}</div>
    </div>
  )
}

export default Panel

