/**
 * Step 03 card: choose prediction type.
 *
 * - Classification: discrete categories/labels.
 * - Regression: continuous numeric values.
 *
 * Props:
 * - predictiveKind: 'classification' | 'regression' | null
 * - onSelect(kind): callback when user chooses a prediction kind
 */
import React from 'react'
import FloatingChoice from './FloatingChoice.jsx'

function PredictiveTypeCard({ predictiveKind, onSelect }) {
  return (
    <div className="choice-group">
      <FloatingChoice
        label="Classification"
        description="Predict discrete categories or classes"
        active={predictiveKind === 'classification'}
        onClick={() => onSelect('classification')}
      />
      <FloatingChoice
        label="Regression"
        description="Predict continuous numeric values"
        active={predictiveKind === 'regression'}
        onClick={() => onSelect('regression')}
      />
    </div>
  )
}

export default PredictiveTypeCard

