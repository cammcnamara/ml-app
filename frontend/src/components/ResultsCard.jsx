function ResultsCard({ result, training, error }) {
  if (error) {
    return <div className="error-banner">{error}</div>;
  }

  if (training) {
    return (
      <div className="results-empty">
        <span className="spinner" style={{ width: 20, height: 20, borderWidth: 2.5 }} />
        <div className="results-empty__label">Training models…</div>
      </div>
    );
  }

  if (!result) {
    return (
      <div className="results-empty">
        <div className="results-empty__icon">◎</div>
        <div className="results-empty__label">Results will appear here</div>
      </div>
    );
  }

  return (
    <div className="results-stack">
      {Object.entries(result).map(([model, metrics]) => (
        <div key={model} className="result-card">
          <div className="result-card__model">{model.replace(/_/g, " ")}</div>
          <div className="result-card__metrics">
            {typeof metrics === "object" && metrics !== null ? (
              Object.entries(metrics).map(([key, val]) => (
                <div key={key} className="result-metric">
                  {key}:{" "}
                  <span className="result-metric__val">
                    {typeof val === "number" ? val.toFixed(4) : String(val)}
                  </span>
                </div>
              ))
            ) : (
              <div className="result-metric">
                <span className="result-metric__val">{String(metrics)}</span>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}

export default ResultsCard;
