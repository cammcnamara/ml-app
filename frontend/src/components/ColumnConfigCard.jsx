/**
 * Column configuration card (final scene, left panel).
 *
 * - Lets the user choose:
 *   - target column (select dropdown)
 *   - predictor columns (checkbox list)
 * - Has a primary button to trigger model training.
 *
 * Props:
 * - columns: string[] (all column names)
 * - target: string (current target column)
 * - predictors: string[] (current predictor column names)
 * - training: boolean (disables Run button & shows spinner)
 * - onUpdateTarget(value): set new target
 * - onUpdatePredictors(list): set new predictors array
 * - onRun(): start training
 */
import React, { useMemo } from 'react'

function ColumnConfigCard({
  columns,
  target,
  predictors,
  training,
  onUpdateTarget,
  onUpdatePredictors,
  onRun,
}) {
  if (!columns.length) {
    return (
      <div className="results-empty">
        <div className="results-empty__icon">⬅</div>
        <div className="results-empty__label">Upload a dataset first</div>
      </div>
    )
  }

  const nonTargetColumns = useMemo(
    () => columns.filter((c) => c !== target),
    [columns, target],
  )

  const canRun = Boolean(target && predictors.length > 0)

  const togglePredictor = (col) => {
    const next = predictors.includes(col)
      ? predictors.filter((c) => c !== col)
      : [...predictors, col]
    onUpdatePredictors(next)
  }

  return (
    <div className="column-config-stack">
      <div className="field">
        <div className="field-label">Target column</div>
        <select
          className="field-select"
          value={target}
          onChange={(e) => onUpdateTarget(e.target.value)}
        >
          <option value="">— select target —</option>
          {columns.map((col) => (
            <option key={col} value={col}>
              {col}
            </option>
          ))}
        </select>
      </div>

      <div className="field">
        <div className="field-label">Predictor columns</div>
        <div className="col-list">
          {nonTargetColumns.map((col) => {
            const checked = predictors.includes(col)
            return (
              <label
                key={col}
                className={`col-item ${
                  checked ? 'col-item--checked' : ''
                }`}
              >
                <input
                  type="checkbox"
                  checked={checked}
                  onChange={() => togglePredictor(col)}
                />
                <span className="col-item__name">{col}</span>
              </label>
            )
          })}
        </div>
      </div>

      <button
        type="button"
        className="btn btn--primary btn--full"
        disabled={!canRun || training}
        onClick={onRun}
      >
        {training && <span className="spinner" />}
        {training ? ' Running…' : 'Run Models'}
      </button>
    </div>
  )
}

export default ColumnConfigCard

