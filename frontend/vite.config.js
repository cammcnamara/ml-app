/**
 * Vite config for ML Canvas frontend (React).
 * Uses @vitejs/plugin-react-swc for fast JSX/TSX transform and HMR.
 */
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

export default defineConfig({
  plugins: [react()],
})
