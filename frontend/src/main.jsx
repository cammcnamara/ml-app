/**
 * React entry point. Imports global CSS and mounts the App to #app via Vite.
 * Run with: npm run dev (Vite dev server).
 */
import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './styles/variables.css'
import './styles/layout.css'
import './styles/components.css'
import './styles/transitions.css'

const container = document.getElementById('app')
const root = createRoot(container)

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)

