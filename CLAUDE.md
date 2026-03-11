# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

### Backend
```bash
cd backend
python3 -m venv venv && source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### Frontend
```bash
cd frontend
npm install
npm run dev       # dev server at http://127.0.0.1:5173
npm run build     # production build
npm run preview   # preview production build
```

No test suite is configured yet.

## Architecture

This is a full-stack ML training app ("ML Canvas") with two independently running services:

- **Backend** (`http://127.0.0.1:8000`): FastAPI + scikit-learn
- **Frontend** (`http://127.0.0.1:5173`): React 19 + Vite (JSX, no TypeScript)

### Backend

`backend/main.py` owns three routes (`GET /`, `POST /upload`, `POST /train`) and holds the uploaded dataset in a global `CURRENT_DATASET` variable (resets on restart). `MODEL_REGISTRY` maps string IDs to model classes — add a new model here and in `frontend/src/config/models.js`.

Each model in `backend/models/` extends `BaseModel` and must implement `train(X, y)` and `predict(X)`. Regression models (`linear_regression`, `ridge_regression`) return MSE/RMSE/R²; all others return accuracy.

### Frontend

`App.jsx` owns all state and builds a `sceneConfigs` array dynamically based on the user's `analyticsType` choice:
- `'predictive'` → 3 scenes (Data & Mode → Model Setup → Run & Results)
- `'descriptive'` → 2 scenes (Data & Mode → Run & Results)

Each scene has a `left` and `right` panel, each specifying a `component` and its `props`. `Stage.jsx` renders all scenes in a horizontal sliding track (`translateX`) and shows Back/Continue navigation — it has no knowledge of what the scenes contain. `Panel.jsx` provides the card frame. Components are purely presentational; all state lives in `App.jsx`.

### Key files

| File | Purpose |
|---|---|
| `backend/main.py` | Routes, `MODEL_REGISTRY`, in-memory dataset |
| `backend/models/base_model.py` | Interface contract for all models |
| `frontend/src/App.jsx` | All wizard state, `sceneConfigs`, `canAdvance` gating |
| `frontend/src/api.js` | `uploadCsv` / `train` fetch helpers; change `API_BASE` here |
| `frontend/src/config/models.js` | `PREDICTIVE_MODELS` map used by `ModelSelectionCard` |
| `frontend/src/components/layout/Stage.jsx` | Shell, horizontal slide, nav |
| `frontend/src/styles/variables.css` | Design tokens (colors, radius, fonts) |
