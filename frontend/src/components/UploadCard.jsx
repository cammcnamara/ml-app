import axios from "axios";
import { useRef, useState } from "react";

const API_BASE = "http://127.0.0.1:8000";

function UploadCard({ setColumns, setError, columns }) {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return;
    setLoading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      const response = await axios.post(`${API_BASE}/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setColumns(response.data.columns || []);
    } catch {
      setError("Failed to upload dataset.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="upload-stack">
      <div
        className={`file-drop ${file ? "file-drop--has-file" : ""}`}
        onClick={() => inputRef.current?.click()}
      >
        <div className="file-drop__icon">⬆</div>
        <div className="file-drop__label">
          {file ? file.name : "Click to select a CSV file"}
        </div>
        <div className="file-drop__sub">
          {file
            ? `${(file.size / 1024).toFixed(1)} KB`
            : ".csv — any size"}
        </div>
        <input
          ref={inputRef}
          type="file"
          accept=".csv"
          onChange={(e) => {
            setFile(e.target.files?.[0] || null);
            setColumns([]);
          }}
        />
      </div>

      {file && (
        <button
          className="btn btn--primary btn--full"
          onClick={handleUpload}
          disabled={loading}
        >
          {loading ? <><span className="spinner" /> Uploading…</> : "Upload Dataset"}
        </button>
      )}

      {columns.length > 0 && (
        <div className="status-chip status-chip--success">
          ✓ &nbsp;{columns.length} columns loaded
        </div>
      )}
    </div>
  );
}

export default UploadCard;
