/**
 * Backend API helpers. All ML Canvas API calls go through here.
 * Uses fetch; base URL is configurable via API_BASE.
 */
const API_BASE = 'http://127.0.0.1:8000'

export async function uploadCsv(file) {
  const formData = new FormData()
  formData.append('file', file)
  const res = await fetch(`${API_BASE}/upload`, { method: 'POST', body: formData })
  const data = await res.json()
  return data.columns || []
}

export async function train(options) {
  const { model_names, predictors, target } = options
  const res = await fetch(`${API_BASE}/train`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ model_names, predictors, target }),
  })
  return res.json()
}
