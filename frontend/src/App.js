import { useState } from "react";
import axios from "axios";

import Stage from "./components/layout/Stage";
import UploadCard from "./components/UploadCard";
import AnalyticsModeCard from "./components/AnalyticsModeCard";
import PredictiveTypeCard from "./components/PredictiveTypeCard";
import ModelSelectionCard from "./components/ModelSelectionCard";
import ColumnConfigCard from "./components/ColumnConfigCard";
import ResultsCard from "./components/ResultsCard";

const API_BASE = "http://127.0.0.1:8000";

function App() {
  const [scene, setScene] = useState(0);

  // Data state
  const [columns, setColumns] = useState([]);
  const [analyticsType, setAnalyticsType] = useState(null);
  const [predictiveKind, setPredictiveKind] = useState(null);
  const [selectedModels, setSelectedModels] = useState([]);
  const [predictors, setPredictors] = useState([]);
  const [target, setTarget] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState("");
  const [training, setTraining] = useState(false);

  const handleSetAnalyticsType = (type) => {
    setAnalyticsType(type);
    setPredictiveKind(null);
    setSelectedModels([]);
    setResult(null);
    // Keep user on scene 0 if they change mode from a later scene
    setScene(0);
  };

  const handleTrain = async () => {
    setTraining(true);
    setResult(null);
    setError("");
    try {
      const response = await axios.post(`${API_BASE}/train`, {
        model_names: selectedModels,
        predictors,
        target,
      });
      setResult(response.data);
    } catch {
      setError("Training failed. Check your column selection and try again.");
    } finally {
      setTraining(false);
    }
  };

  // ── Scene definitions ──────────────────────────────────────
  const scenes = [];

  // Scene 0: always — Upload + Analytics Mode
  scenes.push({
    label: "Data & Mode",
    left: {
      eyebrow: "Step 01",
      title: "Load Dataset",
      subtitle: "Upload a CSV file to get started.",
      content: (
        <UploadCard
          setColumns={setColumns}
          setError={setError}
          columns={columns}
        />
      ),
    },
    right: {
      eyebrow: "Step 02",
      title: "Analytics Mode",
      subtitle: "How would you like to analyze your data?",
      content: (
        <AnalyticsModeCard
          analyticsType={analyticsType}
          setAnalyticsType={handleSetAnalyticsType}
        />
      ),
    },
  });

  // Scene 1: predictive only — Prediction Type + Model Selection
  if (analyticsType === "predictive") {
    scenes.push({
      label: "Model Setup",
      left: {
        eyebrow: "Step 03",
        title: "Prediction Type",
        subtitle: "What kind of outcome are you modeling?",
        content: (
          <PredictiveTypeCard
            predictiveKind={predictiveKind}
            setPredictiveKind={setPredictiveKind}
            setSelectedModels={setSelectedModels}
          />
        ),
      },
      right: {
        eyebrow: "Step 04",
        title: "Select Models",
        subtitle: "Pick algorithms to train and compare.",
        content: (
          <ModelSelectionCard
            predictiveKind={predictiveKind}
            selectedModels={selectedModels}
            setSelectedModels={setSelectedModels}
          />
        ),
      },
    });
  }

  // Final scene: Column Config + Results
  if (analyticsType) {
    const stepOffset = analyticsType === "predictive" ? 4 : 2;
    scenes.push({
      label: "Run & Results",
      left: {
        eyebrow: `Step 0${stepOffset + 1}`,
        title: "Configure Columns",
        subtitle: "Set your target and predictor variables.",
        content: (
          <ColumnConfigCard
            columns={columns}
            target={target}
            setTarget={setTarget}
            predictors={predictors}
            setPredictors={setPredictors}
            onRun={handleTrain}
            training={training}
          />
        ),
      },
      right: {
        eyebrow: `Step 0${stepOffset + 2}`,
        title: "Results",
        subtitle: "Model performance after training.",
        content: (
          <ResultsCard result={result} training={training} error={error} />
        ),
      },
    });
  }

  // ── Navigation logic ───────────────────────────────────────
  const clampedScene = Math.min(scene, scenes.length - 1);

  const canAdvance = (() => {
    if (clampedScene === 0) return columns.length > 0 && analyticsType !== null;
    if (clampedScene === 1 && analyticsType === "predictive")
      return predictiveKind !== null && selectedModels.length > 0;
    return false;
  })();

  return (
    <Stage
      scenes={scenes}
      currentScene={clampedScene}
      onNext={() => setScene((s) => Math.min(s + 1, scenes.length - 1))}
      onBack={() => setScene((s) => Math.max(s - 1, 0))}
      canAdvance={canAdvance}
    />
  );
}

export default App;
