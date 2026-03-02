/**
 * Reusable choice button used by AnalyticsModeCard and PredictiveTypeCard.
 *
 * Props:
 * - label: main text
 * - description: secondary text (optional)
 * - active: whether this choice is currently selected
 * - onClick: handler when the choice is clicked
 */
import React from 'react'

function FloatingChoice({ label, description, active, onClick }) {
  const cls = ['choice-card', active ? 'choice-card--active' : '']
    .filter(Boolean)
    .join(' ')

  return (
    <button type="button" className={cls} onClick={onClick}>
      <div className="choice-card__label">{label}</div>
      {description && <div className="choice-card__desc">{description}</div>}
    </button>
  )
}

export default FloatingChoice
