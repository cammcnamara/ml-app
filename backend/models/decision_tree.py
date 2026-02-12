from .base_model import BaseModel
from sklearn.tree import DecisionTreeClassifier


class DecisionTree(BaseModel):

    def __init__(self, max_depth=None):
        self.model = DecisionTreeClassifier(max_depth=max_depth)

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X).tolist()
