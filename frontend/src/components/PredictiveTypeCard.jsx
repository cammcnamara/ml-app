import FloatingChoice from "./FloatingChoice";

function PredictiveTypeCard({ predictiveKind, setPredictiveKind, setSelectedModels }) {
  const select = (kind) => {
    setPredictiveKind(kind);
    setSelectedModels([]);
  };

  return (
    <div className="choice-group">
      <FloatingChoice
        label="Classification"
        description="Predict discrete categories or classes"
        active={predictiveKind === "classification"}
        onClick={() => select("classification")}
      />
      <FloatingChoice
        label="Regression"
        description="Predict continuous numeric values"
        active={predictiveKind === "regression"}
        onClick={() => select("regression")}
      />
    </div>
  );
}

export default PredictiveTypeCard;
