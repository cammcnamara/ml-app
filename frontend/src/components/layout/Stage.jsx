/**
 * Stage layout component.
 *
 * Renders the app shell: brand header, vertical sliding stage track, and bottom nav.
 * Scenes slide vertically (translateY). Within each scene, left and right panels
 * stack as a single column.
 */
import React, { useMemo } from 'react'
import Panel from './Panel.jsx'
import StepIndicator from './StepIndicator.jsx'

function Stage({ scenes, currentScene, canAdvance, onNext, onBack }) {
  const activeScene = useMemo(
    () => (scenes && scenes.length ? scenes[currentScene] ?? null : null),
    [currentScene, scenes],
  )

  const isFirst = currentScene === 0
  const isLast = currentScene === scenes.length - 1

  return (
    <div className="app">
      <header className="app-header">
        <span className="app-header__brand">
          ML <span>Canvas</span>
        </span>
        {activeScene && (
          <span className="app-header__scene">{activeScene.label}</span>
        )}
      </header>

      <div className="stage-wrapper">
        <div
          className="stage-track"
          style={{ transform: `translateY(-${currentScene * 100}%)` }}
        >
          {scenes.map((scene, i) => (
            <div key={i} className="scene">
              <Panel
                eyebrow={scene.left.eyebrow}
                title={scene.left.title}
                subtitle={scene.left.subtitle}
              >
                {scene.left.component && (
                  <scene.left.component {...scene.left.props} />
                )}
              </Panel>
              <Panel
                eyebrow={scene.right.eyebrow}
                title={scene.right.title}
                subtitle={scene.right.subtitle}
              >
                {scene.right.component && (
                  <scene.right.component {...scene.right.props} />
                )}
              </Panel>
            </div>
          ))}
        </div>
      </div>

      <nav className="stage-nav">
        <div className="stage-nav__side">
          {!isFirst && (
            <button
              type="button"
              className="btn btn--ghost"
              onClick={onBack}
            >
              ↑ Back
            </button>
          )}
        </div>

        <StepIndicator total={scenes.length} current={currentScene} />

        <div className="stage-nav__side stage-nav__side--right">
          {!isLast && (
            <button
              type="button"
              className="btn btn--primary"
              disabled={!canAdvance}
              onClick={onNext}
            >
              Continue ↓
            </button>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Stage
