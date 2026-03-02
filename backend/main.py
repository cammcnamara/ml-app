"""
FastAPI backend for ML Canvas.

What this file does:
- Defines API endpoints for health check, CSV upload, and model training.
- Stores the currently uploaded dataset in memory (`CURRENT_DATASET`).
- Maps frontend model IDs to Python model classes in `MODEL_REGISTRY`.

How to customize:
- Add/remove model classes in `MODEL_REGISTRY` to control what the UI can train.
- Tighten CORS by changing `allow_origins` from `"*"` to specific frontend URLs.
- Replace in-memory storage with a database or file cache if you need persistence.
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
import pandas as pd
import io
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score, accuracy_score


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

# Simple model lookup dictionary
MODEL_REGISTRY = {
    "linear_regression": LinearRegression,
    "logistic_regression": LogisticRegression,
    "knn": KNN,
    "decision_tree": DecisionTree,
    "ridge_regression": RidgeRegression,
}


@app.get("/")
def root():
    return {"status": "running"}


@app.post("/train")
def train(data: dict):
    global CURRENT_DATASET

    if CURRENT_DATASET is None:
        return {"error": "No dataset uploaded"}

    model_names = data.get("model_names", [])
    predictors = data.get("predictors", [])
    target = data.get("target")

    if not model_names:
        return {"error": "No models selected"}

    if not predictors:
        return {"error": "No predictors selected"}

    if not target:
        return {"error": "No target selected"}

    for model_name in model_names:
        if model_name not in MODEL_REGISTRY:
            return {"error": f"Model {model_name} not found"}

    try:
        X = CURRENT_DATASET[predictors].values
        y = CURRENT_DATASET[target].values
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
            rmse = mse**0.5
            r2 = r2_score(y_test, predictions)

            results[model_name] = {
                "mse": float(mse),
                "rmse": float(rmse),
                "r2": float(r2),
            }

        else:  # classification
            acc = accuracy_score(y_test, predictions)
            results[model_name] = {"accuracy": float(acc)}

    return results


# Temporary in-memory dataset storage
CURRENT_DATASET = None


@app.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    global CURRENT_DATASET

    contents = await file.read()
    try:
        df = pd.read_csv(io.StringIO(contents.decode("utf-8")))
    except UnicodeDecodeError:
        df = pd.read_csv(io.StringIO(contents.decode("latin1")))
    CURRENT_DATASET = df

    return {"columns": list(df.columns)}
