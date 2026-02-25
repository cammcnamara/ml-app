function StepIndicator({ total, current }) {
  return (
    <div className="step-indicator">
      {Array.from({ length: total }, (_, i) => {
        const cls = [
          "step-indicator__dot",
          i === current ? "step-indicator__dot--active" : "",
          i < current ? "step-indicator__dot--done" : "",
        ]
          .filter(Boolean)
          .join(" ");
        return <div key={i} className={cls} />;
      })}
    </div>
  );
}

export default StepIndicator;
