/**
 * Backend API helpers. All ML Canvas API calls go through here.
 * API_BASE is empty so requests are relative (same origin on Vercel).
 * For local dev, set API_BASE = 'http://127.0.0.1:8000'.
 */
const API_BASE = ''

export async function uploadCsv(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData })
  const data = await res.json()
  return data.columns || []
}

export async function train({ file, model_names, predictors, target }) {
  const formData = new FormData()
  formData.append('file', file)
  formData.append('model_names', JSON.stringify(model_names))
  formData.append('predictors', JSON.stringify(predictors))
  formData.append('target', target)
  const res = await fetch(`${API_BASE}/train`, { method: 'POST', body: formData })
  return res.json()
}
