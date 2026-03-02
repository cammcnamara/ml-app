/**
 * Step 02 card: choose analytics mode.
 *
 * Uses FloatingChoice buttons for:
 * - Predictive: train/evaluate ML models
 * - Descriptive: summarize/explore data
 *
 * Props:
 * - analyticsType: 'predictive' | 'descriptive' | null
 * - onSelect(type): callback when user chooses a mode
 */
import React from 'react'
import FloatingChoice from './FloatingChoice.jsx'

function AnalyticsModeCard({ analyticsType, onSelect }) {
  return (
    <div className="choice-group">
      <FloatingChoice
        label="Predictive"
        description="Train and evaluate ML models on labeled data"
        active={analyticsType === 'predictive'}
        onClick={() => onSelect('predictive')}
      />
      <FloatingChoice
        label="Descriptive"
        description="Summarize and explore data distributions"
        active={analyticsType === 'descriptive'}
        onClick={() => onSelect('descriptive')}
      />
    </div>
  )
}

export default AnalyticsModeCard

