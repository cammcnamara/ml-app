"""
Logistic regression model wrapper for classification tasks.

How to customize:
- Tune regularization/solver by passing args to `SklearnLogistic(...)`.
- Keep return type from `predict` as a JSON-serializable list.
"""
from .base_model import BaseModel
from sklearn.linear_model import LogisticRegression as SklearnLogistic


class LogisticRegression(BaseModel):
    """Classification model used when frontend selects `logistic_regression`."""

    def __init__(self):
        self.model = SklearnLogistic()

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X).tolist()
