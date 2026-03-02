/**
 * Simple dot step indicator for the wizard footer.
 *
 * Props:
 * - total: number of scenes
 * - current: index of active scene (0-based)
 */
import React from 'react'

function StepIndicator({ total, current }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: total }).map((_, i) => {
        const classes = [
          'step-indicator__dot',
          i === current ? 'step-indicator__dot--active' : '',
          i < current ? 'step-indicator__dot--done' : '',
        ]
          .filter(Boolean)
          .join(' ')

        return <div key={i} className={classes} />
      })}
    </div>
  )
}

export default StepIndicator

