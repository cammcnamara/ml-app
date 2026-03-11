"""
FastAPI backend for ML Canvas.

What this file does:
- Defines API endpoints for health check, CSV upload, and model training.
- Stateless: /train accepts the CSV file directly alongside training config.
- Maps frontend model IDs to Python model classes in `MODEL_REGISTRY`.

How to customize:
- Add/remove model classes in `MODEL_REGISTRY` to control what the UI can train.
- Tighten CORS by changing `allow_origins` from `"*"` to specific frontend URLs.
"""
import io
import json

from fastapi import FastAPI, File, Form, UploadFile
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
from sklearn.metrics import accuracy_score, mean_squared_error, r2_score
from sklearn.model_selection import train_test_split

from models.linear_regression import LinearRegression
from models.logistic_regression import LogisticRegression
from models.ridge_regression import RidgeRegression
from models.knn import KNN
from models.decision_tree import DecisionTree


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

MODEL_REGISTRY = {
    "linear_regression": LinearRegression,
    "logistic_regression": LogisticRegression,
    "knn": KNN,
    "decision_tree": DecisionTree,
    "ridge_regression": RidgeRegression,
}


def _parse_csv(contents: bytes) -> pd.DataFrame:
    try:
        return pd.read_csv(io.StringIO(contents.decode("utf-8")))
    except UnicodeDecodeError:
        return pd.read_csv(io.StringIO(contents.decode("latin1")))


@app.get("/")
def root():
    return {"status": "running"}


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    """Parse CSV and return column names. Stateless — nothing is stored."""
    contents = await file.read()
    df = _parse_csv(contents)
    return {"columns": list(df.columns)}


@app.post("/train")
async def train(
    file: UploadFile = File(...),
    model_names: str = Form(...),
    predictors: str = Form(...),
    target: str = Form(...),
):
    """Parse CSV, train selected models, return metrics. Fully stateless."""
    model_names = json.loads(model_names)
    predictors = json.loads(predictors)

    if not model_names:
        return {"error": "No models selected"}
    if not predictors:
        return {"error": "No predictors selected"}
    if not target:
        return {"error": "No target selected"}
    for model_name in model_names:
        if model_name not in MODEL_REGISTRY:
            return {"error": f"Model {model_name} not found"}

    contents = await file.read()
    df = _parse_csv(contents)

    try:
        X = df[predictors].values
        y = df[target].values
    except KeyError:
        return {"error": "Invalid column selection"}

    X_train, X_test, y_train, y_test = train_test_split(
        X, y, test_size=0.2, random_state=42
    )

    results = {}
    for model_name in model_names:
        model = MODEL_REGISTRY[model_name]()
        model.train(X_train, y_train)
        predictions = model.predict(X_test)

        if model_name in ["linear_regression", "ridge_regression"]:
            mse = mean_squared_error(y_test, predictions)
            results[model_name] = {
                "mse": float(mse),
                "rmse": float(mse ** 0.5),
                "r2": float(r2_score(y_test, predictions)),
            }
        else:
            results[model_name] = {"accuracy": float(accuracy_score(y_test, predictions))}

    return results
