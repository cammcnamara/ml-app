"""
Decision tree classifier wrapper.

How to customize:
- Set defaults like `max_depth`, `min_samples_split`, or `criterion`.
- Keep `train` and `predict` signatures unchanged for registry compatibility.
"""
from .base_model import BaseModel
from sklearn.tree import DecisionTreeClassifier


class DecisionTree(BaseModel):
    """Classification tree model used when frontend selects `decision_tree`."""

    def __init__(self, max_depth=None):
        self.model = DecisionTreeClassifier(max_depth=max_depth)

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X).tolist()
