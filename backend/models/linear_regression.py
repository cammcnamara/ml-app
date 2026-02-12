from .base_model import BaseModel
from sklearn.linear_model import LinearRegression as SklearnLinear


class LinearRegression(BaseModel):

    def __init__(self):
        self.model = SklearnLinear()

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X).tolist()
