import { useState } from "react";
import axios from "axios";

function App() {
  const [file, setFile] = useState(null);
  const [columns, setColumns] = useState([]);
  const [predictors, setPredictors] = useState([]);
  const [target, setTarget] = useState("");
  const [model, setModel] = useState("linear_regression");
  const [result, setResult] = useState(null);

  const uploadFile = async () => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.post(
      "http://127.0.0.1:8000/upload",
      formData
    );

    setColumns(response.data.columns);
  };

  const trainModel = async () => {
    const response = await axios.post(
      "http://127.0.0.1:8000/train",
      {
        model_name: model,
        predictors: predictors,
        target: target
      }
    );

    setResult(response.data);
  };

  return (
    <div style={{ padding: 40 }}>
      <h1>ML Web App</h1>

      <h3>1. Upload CSV</h3>
      <input
        type="file"
        onChange={(e) => setFile(e.target.files[0])}
      />
      <button onClick={uploadFile}>Upload</button>

      {columns.length > 0 && (
        <>
          <h3>2. Select Target</h3>
          <select onChange={(e) => setTarget(e.target.value)}>
            <option>Select target</option>
            {columns.map(col => (
              <option key={col}>{col}</option>
            ))}
          </select>

          <h3>3. Select Predictors</h3>
          {columns.map(col => (
            <div key={col}>
              <input
                type="checkbox"
                value={col}
                onChange={(e) => {
                  if (e.target.checked) {
                    setPredictors([...predictors, col]);
                  } else {
                    setPredictors(
                      predictors.filter(p => p !== col)
                    );
                  }
                }}
              />
              {col}
            </div>
          ))}

          <h3>4. Select Model</h3>
          <select onChange={(e) => setModel(e.target.value)}>
            <option value="linear_regression">Linear Regression</option>
            <option value="logistic_regression">Logistic Regression</option>
            <option value="ridge">Ridge</option>
            <option value="knn">KNN</option>
            <option value="decision_tree">Decision Tree</option>
          </select>

          <button onClick={trainModel}>Train</button>
        </>
      )}

      {result && (
        <>
          <h3>Results</h3>
          <pre>{JSON.stringify(result, null, 2)}</pre>
        </>
      )}
    </div>
  );
}

export default App;
