import { PREDICTIVE_MODELS } from "../config/models";

function ModelSelectionCard({ predictiveKind, selectedModels, setSelectedModels }) {
  if (!predictiveKind) {
    return (
      <div className="results-empty">
        <div className="results-empty__icon">⬅</div>
        <div className="results-empty__label">Select a prediction type first</div>
      </div>
    );
  }

  const toggle = (id) => {
    setSelectedModels((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  return (
    <div className="model-grid">
      {PREDICTIVE_MODELS[predictiveKind].map((m) => (
        <button
          key={m.id}
          className={`model-chip ${selectedModels.includes(m.id) ? "model-chip--selected" : ""}`}
          onClick={() => toggle(m.id)}
        >
          {m.label}
        </button>
      ))}
    </div>
  );
}

export default ModelSelectionCard;
