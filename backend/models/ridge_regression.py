from .base_model import BaseModel
from sklearn.linear_model import Ridge as SklearnRidge


class RidgeRegression(BaseModel):

    def __init__(self, alpha=1.0):
        self.model = SklearnRidge(alpha=alpha)

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X).tolist()
