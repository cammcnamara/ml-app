from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi import UploadFile, File
import pandas as pd
import io


from models.linear_regression import LinearRegression
from models.logistic_regression import LogisticRegression
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
MODEL_REGISTRY = {"linear_regression": LinearRegression}


@app.get("/")
def root():
    return {"status": "running"}


@app.post("/train")
def train(data: dict):
    global CURRENT_DATASET

    model_name = data.get("model_name")
    predictors = data.get("predictors")
    target = data.get("target")

    if CURRENT_DATASET is None:
        return {"error": "No dataset uploaded"}

    if model_name not in MODEL_REGISTRY:
        return {"error": "Model not found"}

    X = CURRENT_DATASET[predictors].values
    y = CURRENT_DATASET[target].values

    model = MODEL_REGISTRY[model_name]()
    model.train(X, y)

    predictions = model.predict(X)

    return {"predictions": predictions}


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
