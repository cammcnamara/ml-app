from .base_model import BaseModel
from sklearn.linear_model import LogisticRegression as SklearnLogistic


class LogisticRegression(BaseModel):

    def __init__(self):
        self.model = SklearnLogistic()

    def train(self, X, y):
        self.model.fit(X, y)

    def predict(self, X):
        return self.model.predict(X).tolist()
