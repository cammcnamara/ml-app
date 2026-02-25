function ColumnConfigCard({ columns, target, setTarget, predictors, setPredictors, onRun, training }) {
  const togglePredictor = (col) => {
    setPredictors((prev) =>
      prev.includes(col) ? prev.filter((c) => c !== col) : [...prev, col]
    );
  };

  if (!columns.length) {
    return (
      <div className="results-empty">
        <div className="results-empty__icon">⬅</div>
        <div className="results-empty__label">Upload a dataset first</div>
      </div>
    );
  }

  const canRun = target && predictors.length > 0;

  return (
    <div className="column-config-stack">
      <div className="field">
        <div className="field-label">Target column</div>
        <select
          className="field-select"
          value={target}
          onChange={(e) => setTarget(e.target.value)}
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
          {columns
            .filter((col) => col !== target)
            .map((col) => {
              const checked = predictors.includes(col);
              return (
                <label
                  key={col}
                  className={`col-item ${checked ? "col-item--checked" : ""}`}
                >
                  <input
                    type="checkbox"
                    checked={checked}
                    onChange={() => togglePredictor(col)}
                  />
                  <span className="col-item__name">{col}</span>
                </label>
              );
            })}
        </div>
      </div>

      <button
        className="btn btn--primary btn--full"
        onClick={onRun}
        disabled={!canRun || training}
      >
        {training ? <><span className="spinner" /> Running…</> : "Run Models"}
      </button>
    </div>
  );
}

export default ColumnConfigCard;
