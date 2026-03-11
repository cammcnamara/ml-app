/**
 * Step 01 card: dataset upload.
 *
 * - Shows a file-drop area that opens the file picker when clicked.
 * - After a file is selected, shows an Upload button.
 * - Shows a \"X columns loaded\" chip once the backend has returned columns.
 *
 * Props:
 * - columns: string[] of column names (length used to show success chip)
 * - file: File | null (current selected file)
 * - uploadLoading: boolean (controls Upload button spinner/disabled state)
 * - onUpload(): triggers the parent upload handler
 * - onFileChange(file | null): tells parent when a new file is selected
 */
import React, { useRef } from 'react'

function UploadCard({ columns, file, uploadLoading, uploadError, onUpload, onFileChange }) {
  const inputRef = useRef(null)

  const handlePick = () => {
    if (inputRef.current) {
      inputRef.current.click()
    }
  }

  const handleChange = (event) => {
    const nextFile = event.target.files?.[0] ?? null
    onFileChange(nextFile)
  }

  return (
    <div className="upload-stack">
      <div
        className={`file-drop ${file ? 'file-drop--has-file' : ''}`}
        onClick={handlePick}
      >
        <div className="file-drop__icon">⬆</div>
        <div className="file-drop__label">
          {file ? file.name : 'Click to select a CSV file'}
        </div>
        <div className="file-drop__sub">
          {file ? `${(file.size / 1024).toFixed(1)} KB` : '.csv — any size'}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          style={{ display: 'none' }}
          onChange={handleChange}
        />
      </div>

      {file && (
        <button
          type="button"
          className="btn btn--primary btn--full"
          disabled={uploadLoading}
          onClick={onUpload}
        >
          {uploadLoading && <span className="spinner" />}
          {uploadLoading ? ' Uploading…' : 'Upload Dataset'}
        </button>
      )}

      {uploadError && (
        <div className="error-banner">{uploadError}</div>
      )}

      {columns.length > 0 && (
        <div className="status-chip status-chip--success">
          ✓ {columns.length} columns loaded
        </div>
      )}
    </div>
  )
}

export default UploadCard

