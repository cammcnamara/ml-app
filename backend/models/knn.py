"""
K-nearest neighbors classifier wrapper.

How to customize:
- Change default `n_neighbors` in `__init__`.
- Swap to `KNeighborsRegressor` if you want a separate regression variant.
"""
from .base_model import BaseModel
from sklearn.neighbors import KNeighborsClassifier


class KNN(BaseModel):
    """Classification KNN model used when frontend selects `knn`."""

    def __init__(self, n_neighbors=3):
        self.model = KNeighborsClassifier(n_neighbors=n_neighbors)

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X).tolist()
