function FloatingChoice({ label, description, active, onClick }) {
  const cls = ["choice-card", active ? "choice-card--active" : ""]
    .filter(Boolean)
    .join(" ");

  return (
    <button type="button" className={cls} onClick={onClick}>
      <div className="choice-card__label">{label}</div>
      {description && <div className="choice-card__desc">{description}</div>}
    </button>
  );
}

export default FloatingChoice;
