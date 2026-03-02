/**
 * Step 04 card: select one or more models to train.
 *
 * - Uses PREDICTIVE_MODELS config to show models per predictiveKind.
 * - Each model is a \"chip\" button you can toggle on/off.
 *
 * Props:
 * - predictiveKind: 'classification' | 'regression' | null
 * - selectedModels: string[] of model ids
 * - onUpdate(list): callback when selection changes
 */
import React, { useMemo } from 'react'
import { PREDICTIVE_MODELS } from '../config/models.js'

function ModelSelectionCard({ predictiveKind, selectedModels, onUpdate }) {
  const models = useMemo(
    () =>
      predictiveKind ? PREDICTIVE_MODELS[predictiveKind] ?? [] : [],
    [predictiveKind],
  )

  if (!predictiveKind) {
    return (
      <div className="results-empty">
        <div className="results-empty__icon">⬅</div>
        <div className="results-empty__label">
          Select a prediction type first
        </div>
      </div>
    )
  }

  const toggle = (id) => {
    const next = selectedModels.includes(id)
      ? selectedModels.filter((m) => m !== id)
      : [...selectedModels, id]
    onUpdate(next)
  }

  return (
    <div className="model-grid">
      {models.map((m) => (
        <button
          key={m.id}
          type="button"
          className={`model-chip ${
            selectedModels.includes(m.id) ? 'model-chip--selected' : ''
          }`}
          onClick={() => toggle(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  )
}

export default ModelSelectionCard

