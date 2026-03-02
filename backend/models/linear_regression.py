"""
Linear regression model wrapper.

How to customize:
- Swap `SklearnLinear()` args (for example `fit_intercept`) in `__init__`.
- Replace with your own implementation while keeping `train`/`predict`.
"""
from .base_model import BaseModel
from sklearn.linear_model import LinearRegression as SklearnLinear


class LinearRegression(BaseModel):
    """Regression model used when frontend selects `linear_regression`."""

    def __init__(self):
        self.model = SklearnLinear()

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X).tolist()
