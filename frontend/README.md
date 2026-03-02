# Frontend (React + Vite)

React JSX frontend for the ML app wizard.

## Run

```bash
cd /Users/cammcnamara/Documents/Code/ml-app/frontend
npm install
npm run dev
```

Build:

```bash
npm run build
npm run preview
```

## File Map

- `index.html`: app shell and `#app` mount point.
- `vite.config.js`: Vite + React SWC config.
- `src/main.jsx`: entrypoint that mounts React app and imports global CSS.
- `src/App.jsx`: root state machine and scene orchestration.
- `src/api.js`: API helpers (`uploadCsv`, `train`).
- `src/config/models.js`: model options shown in UI.
- `src/components/`: step cards.
- `src/components/layout/`: shell layout and step indicator.
- `src/styles/`: variables/layout/components/transitions CSS.

## Customization Guide

### Update backend URL
Edit `src/api.js`:

```js
const API_BASE = 'http://127.0.0.1:8000'
```

### Add/remove models in the UI
Edit `src/config/models.js` and keep IDs aligned with backend `MODEL_REGISTRY`.

### Modify step flow
Edit `sceneConfigs` and `canAdvance` in `src/App.jsx`.

### Theme changes
Start in `src/styles/variables.css`, then adjust `components.css` as needed.

## JSX Quick Notes

- JSX looks like HTML but is JavaScript.
- Use `className` instead of `class`.
- Use `{}` for JS expressions: `<div>{value}</div>`.
- Conditionals: `{ok && <Badge />}`.
- Lists: `{rows.map((r) => <Row key={r.id} />)}`.
- Props are function inputs for components:
  - `<Card title="A" onClick={fn} />`

Pattern used in this app:

```jsx
<scene.left.component {...scene.left.props} />
```

That renders a component dynamically from config and spreads object props into it.
