from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from models.linear_regression import LinearRegression


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

    model_name = data.get("model_name")
    X = data.get("X", [])
    y = data.get("y", [])

    if model_name not in MODEL_REGISTRY:
        return {"error": "Model not found"}

    model_class = MODEL_REGISTRY[model_name]
    model = model_class()

    model.train(X, y)
    predictions = model.predict(X)

    return {"model_used": model_name, "predictions": predictions}
