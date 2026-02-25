import FloatingChoice from "./FloatingChoice";

function AnalyticsModeCard({ analyticsType, setAnalyticsType }) {
  return (
    <div className="choice-group">
      <FloatingChoice
        label="Predictive"
        description="Train and evaluate ML models on labeled data"
        active={analyticsType === "predictive"}
        onClick={() => setAnalyticsType("predictive")}
      />
      <FloatingChoice
        label="Descriptive"
        description="Summarize and explore data distributions"
        active={analyticsType === "descriptive"}
        onClick={() => setAnalyticsType("descriptive")}
      />
    </div>
  );
}

export default AnalyticsModeCard;
