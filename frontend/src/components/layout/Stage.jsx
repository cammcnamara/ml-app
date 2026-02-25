import Panel from "./Panel";
import StepIndicator from "./StepIndicator";

function Stage({ scenes, currentScene, onNext, onBack, canAdvance }) {
  const isFirst = currentScene === 0;
  const isLast = currentScene === scenes.length - 1;
  const active = scenes[currentScene];

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-header__brand">
          ML <span>Canvas</span>
        </span>
        {active && (
          <span className="app-header__scene">{active.label}</span>
        )}
      </header>

      <div className="stage-wrapper">
        <div
          className="stage-track"
          style={{ transform: `translateX(-${currentScene * 100}%)` }}
        >
          {scenes.map((scene, i) => (
            <div key={i} className="scene">
              <Panel
                side="a"
                eyebrow={scene.left.eyebrow}
                title={scene.left.title}
                subtitle={scene.left.subtitle}
              >
                {scene.left.content}
              </Panel>

              <Panel
                side="b"
                eyebrow={scene.right.eyebrow}
                title={scene.right.title}
                subtitle={scene.right.subtitle}
              >
                {scene.right.content}
              </Panel>
            </div>
          ))}
        </div>
      </div>

      <nav className="stage-nav">
        <div className="stage-nav__side">
          {!isFirst && (
            <button className="btn btn--ghost" onClick={onBack}>
              ← Back
            </button>
          )}
        </div>

        <StepIndicator total={scenes.length} current={currentScene} />

        <div className="stage-nav__side stage-nav__side--right">
          {!isLast && (
            <button
              className="btn btn--primary"
              onClick={onNext}
              disabled={!canAdvance}
            >
              Continue →
            </button>
          )}
        </div>
      </nav>
    </div>
  );
}

export default Stage;
