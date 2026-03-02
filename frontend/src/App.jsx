/**
 * Root React component.
 *
 * - Owns all wizard state: scene, columns, analyticsType, predictiveKind,
 *   selectedModels, predictors, target, result, error, loading flags.
 * - Builds a `sceneConfigs` array where each scene has left/right panels,
 *   each panel specifying a React component and its props.
 * - Renders the `Stage` layout component, which handles header, horizontal
 *   sliding track, and bottom navigation (Back / Continue dots).
 *
 * JSX note:
 * - Tags like <Stage ... /> are just function calls in JSX form.
 * - `{...}` inside JSX means "evaluate JavaScript here".
 * - State updates (`setX`) trigger a re-render of this component tree.
 */
import React, { useMemo, useState, useEffect } from 'react'
import Stage from './components/layout/Stage.jsx'
import UploadCard from './components/UploadCard.jsx'
import AnalyticsModeCard from './components/AnalyticsModeCard.jsx'
import PredictiveTypeCard from './components/PredictiveTypeCard.jsx'
import ModelSelectionCard from './components/ModelSelectionCard.jsx'
import ColumnConfigCard from './components/ColumnConfigCard.jsx'
import ResultsCard from './components/ResultsCard.jsx'
import { uploadCsv, train } from './api.js'

function App() {
  const [scene, setScene] = useState(0)
  const [columns, setColumns] = useState([])
  const [analyticsType, setAnalyticsType] = useState(null) // 'predictive' | 'descriptive' | null
  const [predictiveKind, setPredictiveKind] = useState(null) // 'classification' | 'regression' | null
  const [selectedModels, setSelectedModels] = useState([])
  const [predictors, setPredictors] = useState([])
  const [target, setTarget] = useState('')
  const [result, setResult] = useState(null)
  const [error, setError] = useState('')
  const [training, setTraining] = useState(false)
  const [file, setFile] = useState(null)
  const [uploadLoading, setUploadLoading] = useState(false)

  // Reset downstream choices when analytics type changes.
  useEffect(() => {
    setPredictiveKind(null)
    setSelectedModels([])
    setResult(null)
    setScene(0)
  }, [analyticsType])

  const sceneConfigs = useMemo(() => {
    const scenes = []

    // Scene 0: upload + analytics mode
    scenes.push({
      label: 'Data & Mode',
      left: {
        eyebrow: 'Step 01',
        title: 'Load Dataset',
        subtitle: 'Upload a CSV file to get started.',
        component: UploadCard,
        props: {
          columns,
          file,
          uploadLoading,
          onUpload: handleUpload,
          onFileChange: (f) => {
            setFile(f)
            setColumns([])
          },
        },
      },
      right: {
        eyebrow: 'Step 02',
        title: 'Analytics Mode',
        subtitle: 'How would you like to analyze your data?',
        component: AnalyticsModeCard,
        props: {
          analyticsType,
          onSelect: setAnalyticsType,
        },
      },
    })

    // Scene 1: predictive only — prediction type + models
    if (analyticsType === 'predictive') {
      scenes.push({
        label: 'Model Setup',
        left: {
          eyebrow: 'Step 03',
          title: 'Prediction Type',
          subtitle: 'What kind of outcome are you modeling?',
          component: PredictiveTypeCard,
          props: {
            predictiveKind,
            onSelect: (kind) => {
              setPredictiveKind(kind)
              setSelectedModels([])
            },
          },
        },
        right: {
          eyebrow: 'Step 04',
          title: 'Select Models',
          subtitle: 'Pick algorithms to train and compare.',
          component: ModelSelectionCard,
          props: {
            predictiveKind,
            selectedModels,
            onUpdate: setSelectedModels,
          },
        },
      })
    }

    // Final scene: column config + results (for any analyticsType)
    const stepOffset = analyticsType === 'predictive' ? 4 : 2
    if (analyticsType) {
      scenes.push({
        label: 'Run & Results',
        left: {
          eyebrow: `Step 0${stepOffset + 1}`,
          title: 'Configure Columns',
          subtitle: 'Set your target and predictor variables.',
          component: ColumnConfigCard,
          props: {
            columns,
            target,
            predictors,
            training,
            onUpdateTarget: setTarget,
            onUpdatePredictors: setPredictors,
            onRun: handleTrain,
          },
        },
        right: {
          eyebrow: `Step 0${stepOffset + 2}`,
          title: 'Results',
          subtitle: 'Model performance after training.',
          component: ResultsCard,
          props: {
            result,
            training,
            error,
          },
        },
      })
    }

    return scenes
  }, [
    analyticsType,
    columns,
    error,
    file,
    predictiveKind,
    predictors,
    result,
    selectedModels,
    target,
    training,
    uploadLoading,
  ])

  const clampedScene = Math.min(scene, Math.max(0, sceneConfigs.length - 1))

  const canAdvance = useMemo(() => {
    const s = clampedScene
    if (s === 0) return columns.length > 0 && analyticsType != null
    if (s === 1 && analyticsType === 'predictive')
      return predictiveKind != null && selectedModels.length > 0
    return false
  }, [analyticsType, clampedScene, columns.length, predictiveKind, selectedModels.length])

  async function handleUpload() {
    if (!file) return
    setUploadLoading(true)
    setError('')
    try {
      const cols = await uploadCsv(file)
      setColumns(cols)
    } catch {
      setError('Failed to upload dataset.')
    } finally {
      setUploadLoading(false)
    }
  }

  async function handleTrain() {
    setTraining(true)
    setResult(null)
    setError('')
    try {
      const res = await train({
        model_names: selectedModels,
        predictors,
        target,
      })
      setResult(res)
    } catch {
      setError('Training failed. Check your column selection and try again.')
    } finally {
      setTraining(false)
    }
  }

  if (scene !== clampedScene) {
    // keep local scene index in range of available scenes
    // (e.g. when analyticsType toggles and reduces scenes)
    // eslint-disable-next-line react/no-useless-call
    setScene(clampedScene)
  }

  return (
    <Stage
      scenes={sceneConfigs}
      currentScene={clampedScene}
      canAdvance={canAdvance}
      onNext={() => setScene((s) => Math.min(s + 1, sceneConfigs.length - 1))}
      onBack={() => setScene((s) => Math.max(s - 1, 0))}
    />
  )
}

export default App
