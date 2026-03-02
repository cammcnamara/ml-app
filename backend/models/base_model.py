"""
Shared model interface for all trainable algorithms.

How to customize:
- Keep this contract (`train`, `predict`) stable so `backend/main.py` can call
  every model the same way.
- Add optional shared helpers here only if all models should inherit them.
"""
class BaseModel:
    def train(self, X, y):
        # TODO: Implement training logic
        raise NotImplementedError

    def predict(self, X):
        # TODO: Implement prediction logic
        raise NotImplementedError
