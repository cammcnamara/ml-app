/**
 * Model definitions per prediction type. Used by ModelSelectionCard
 * to show available algorithms (classification vs regression).
 */
export const PREDICTIVE_MODELS = {
  classification: [
    { id: 'logistic_regression', label: 'Logistic Regression' },
    { id: 'knn', label: 'K-Nearest Neighbors' },
    { id: 'decision_tree', label: 'Decision Tree' },
  ],
  regression: [
    { id: 'linear_regression', label: 'Linear Regression' },
    { id: 'ridge_regression', label: 'Ridge Regression' },
  ],
}
