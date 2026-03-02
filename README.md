# ML App Repository

Cleaned full-stack machine learning app with:
- `backend/`: FastAPI API for CSV upload + model training
- `frontend/`: React (JSX) wizard UI

This repository was cleaned to keep one frontend implementation (React JSX) and remove duplicate Vue files/build artifacts.

## What Runs

- Backend API: `http://127.0.0.1:8000`
- Frontend UI (dev): Vite local URL (usually `http://127.0.0.1:5173`)

## Quick Start

### 1) Backend

```bash
cd /Users/cammcnamara/Documents/Code/ml-app/backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload --port 8000
```

### 2) Frontend

```bash
cd /Users/cammcnamara/Documents/Code/ml-app/frontend
npm install
npm run dev
```

### 3) Production Build Check

```bash
cd /Users/cammcnamara/Documents/Code/ml-app/frontend
npm run build
```

## Repository Layout

```text
ml-app/
├── backend/
│   ├── main.py
│   ├── requirements.txt
│   └── models/
│       ├── base_model.py
│       ├── linear_regression.py
│       ├── logistic_regression.py
│       ├── ridge_regression.py
│       ├── knn.py
│       └── decision_tree.py
├── frontend/
│   ├── index.html
│   ├── package.json
│   ├── vite.config.js
│   └── src/
│       ├── main.jsx
│       ├── App.jsx
│       ├── api.js
│       ├── config/models.js
│       ├── components/
│       └── styles/
└── README.md
```

## File-by-File Customization Guide

### Backend

- `backend/main.py`
  - Purpose: API routes (`/`, `/upload`, `/train`) and model execution flow.
  - Customize:
    - Add models by editing `MODEL_REGISTRY`.
    - Change CORS rules in `app.add_middleware(...)`.
    - Replace `CURRENT_DATASET` in-memory storage with persistent storage.

- `backend/models/base_model.py`
  - Purpose: interface contract for all model wrappers.
  - Customize: keep `train(X, y)` and `predict(X)` signatures stable.

- `backend/models/*.py`
  - Purpose: each file wraps a sklearn model.
  - Customize:
    - tune constructor defaults (`alpha`, `max_depth`, `n_neighbors`, etc.)
    - replace sklearn wrapper with your own algorithm while keeping same public methods.

- `backend/requirements.txt`
  - Purpose: Python dependencies.
  - Customize: pin versions once your environment is stable.

### Frontend

- `frontend/index.html`
  - Purpose: single HTML shell containing `#app` mount target.
  - Customize: page `<title>`, metadata, static head tags.

- `frontend/src/main.jsx`
  - Purpose: React entrypoint; mounts `<App />` and imports global CSS files.
  - Customize: global providers, additional global styles.

- `frontend/src/App.jsx`
  - Purpose: central state + step flow orchestration.
  - Customize:
    - add/remove wizard scenes in `sceneConfigs`
    - change navigation gating in `canAdvance`
    - adjust upload/train behavior in `handleUpload` and `handleTrain`.

- `frontend/src/api.js`
  - Purpose: backend request helpers.
  - Customize: `API_BASE`, auth headers, error handling shape.

- `frontend/src/config/models.js`
  - Purpose: model choices shown in UI.
  - Customize: add/remove model IDs and labels to match backend registry.

- `frontend/src/components/*.jsx`
  - Purpose: presentational cards and interactions per step.
  - Customize: text, inputs, conditional rendering, UX behavior.

- `frontend/src/components/layout/*.jsx`
  - Purpose: shell layout, panel framing, step indicator.
  - Customize: scene layout, nav behavior, indicator style.

- `frontend/src/styles/*.css`
  - Purpose: design tokens + layout + component visuals + animations.
  - Customize (best order):
    1. `variables.css` (colors/radius/fonts)
    2. `layout.css` (page structure)
    3. `components.css` (card/button/input look)
    4. `transitions.css` (motion)

## JSX Syntax Notes (Beginner-Friendly)

JSX is JavaScript syntax that looks like HTML.

### Core rules

- Use `className`, not `class`:
  - `className="btn"`
- Use `{}` to run JS inside JSX:
  - `<div>{userName}</div>`
- Conditional rendering:
  - `{isLoading && <Spinner />}`
- Lists need `key`:
  - `{items.map((item) => <Row key={item.id} />)}`
- Fragments avoid extra wrapper divs:
  - `<>...</>`

### Props

- Pass data to components like attributes:
  - `<UploadCard file={file} onUpload={handleUpload} />`
- `onSomething` props are callback functions.

### State

- `const [value, setValue] = useState(initial)`
- Call `setValue(next)` to trigger re-render.

### Dynamic component pattern used here

In `Stage.jsx`, this is valid JSX:

```jsx
<scene.left.component {...scene.left.props} />
```

It means: render the component function stored in `scene.left.component`, and pass all props from the object.

## Common Custom Changes

1. Add a new model
   - Backend: add class + `MODEL_REGISTRY` entry.
   - Frontend: add same model ID in `src/config/models.js`.

2. Change API URL
   - Edit `frontend/src/api.js` `API_BASE`.

3. Adjust UI theme quickly
   - Edit `frontend/src/styles/variables.css` only.

4. Add a new wizard step
   - Update `sceneConfigs` in `frontend/src/App.jsx`.

## Notes

- Uploaded dataset is currently stored in memory (`CURRENT_DATASET`) and resets when backend restarts.
- KNN/DecisionTree wrappers are classification-focused right now.
- The frontend build currently succeeds with `npm run build`.
