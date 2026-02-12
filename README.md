# Machine Learning Web Application

A full-stack web application for training and testing machine learning models, built with FastAPI (backend) and React (frontend).

## ⚠️ Important Note

**This project is a SCAFFOLD ONLY.** All machine learning logic contains placeholder functions with TODO comments. The actual ML implementations need to be completed by you.

## 🏗️ Project Structure

```
ml-app/
│
├── backend/                 # FastAPI Backend
│   ├── main.py             # API routes and server
│   ├── models/             # ML model implementations (PLACEHOLDERS)
│   │   ├── base_model.py
│   │   ├── linear_regression.py
│   │   ├── logistic_regression.py
│   │   ├── knn.py
│   │   └── decision_tree.py
│   ├── services/
│   │   └── training_service.py
│   ├── utils/
│   │   └── preprocessing.py
│   ├── datasets/           # Store preloaded datasets here
│   └── requirements.txt
│
└── frontend/               # React Frontend
    ├── public/
    ├── src/
    │   ├── App.jsx
    │   ├── api.js
    │   ├── pages/
    │   │   ├── Home.jsx
    │   │   ├── TaskSelect.jsx
    │   │   ├── ModelSelect.jsx
    │   │   └── TrainPage.jsx
    │   ├── components/
    │   │   ├── ModelCard.jsx
    │   │   ├── DatasetUploader.jsx
    │   │   ├── DatasetSelector.jsx
    │   │   └── ResultsDisplay.jsx
    │   └── styles/
    │       └── globals.css
    └── package.json
```

## 🚀 Quick Start

### Backend Setup

```bash
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
uvicorn main:app --reload
```

Backend will run on `http://localhost:8000`

### Frontend Setup

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm start
```

Frontend will run on `http://localhost:3000`

## 📋 Features

### Current (Scaffolded)

- ✅ Interactive landing page
- ✅ Task type selection (Classification/Regression)
- ✅ Dynamic model loading
- ✅ CSV dataset upload
- ✅ Preloaded dataset selection
- ✅ API endpoints for training
- ✅ Results display interface
- ✅ Clean, professional UI

### To Be Implemented (By You)

All model logic in `backend/models/` needs implementation:

#### 1. Linear Regression ([linear_regression.py](backend/models/linear_regression.py))
- [ ] Gradient descent training loop
- [ ] Weight and bias updates
- [ ] Prediction formula
- [ ] Loss tracking

#### 2. Logistic Regression ([logistic_regression.py](backend/models/logistic_regression.py))
- [ ] Sigmoid activation function
- [ ] Binary cross-entropy loss
- [ ] Gradient calculation
- [ ] Probability predictions

#### 3. K-Nearest Neighbors ([knn.py](backend/models/knn.py))
- [ ] Euclidean distance calculation
- [ ] K-neighbor selection
- [ ] Majority voting (classification)
- [ ] Mean calculation (regression)

#### 4. Decision Tree ([decision_tree.py](backend/models/decision_tree.py))
- [ ] Gini impurity / variance calculation
- [ ] Information gain computation
- [ ] Best split selection
- [ ] Recursive tree building
- [ ] Tree traversal for predictions

#### 5. Preprocessing ([utils/preprocessing.py](backend/utils/preprocessing.py))
- [ ] Train/test split
- [ ] Normalization
- [ ] Standardization
- [ ] Missing value handling
- [ ] Categorical encoding

## 🎯 User Flow

1. **Home Page** → Click "Get Started"
2. **Task Selection** → Choose Classification or Regression
3. **Model Selection** → Pick an ML model
4. **Training Page** → Upload CSV or select preloaded dataset → Train → View results

## 📊 Available Models

### Classification
- Logistic Regression
- K-Nearest Neighbors
- Decision Tree Classifier

### Regression
- Linear Regression
- K-Nearest Neighbors Regressor
- Decision Tree Regressor

## 📁 Preloaded Datasets

The following datasets are available (currently returning synthetic data):

- **Iris** - Classification
- **Wine Quality** - Classification
- **Boston Housing** - Regression
- **Diabetes** - Regression
- **California Housing** - Regression

You can implement real dataset loading in [training_service.py](backend/services/training_service.py:30).

## 🔧 API Endpoints

- `GET /` - Health check
- `GET /models/{task_type}` - Get available models
- `GET /datasets` - Get preloaded datasets
- `POST /upload` - Upload and validate CSV
- `POST /train/{model_name}` - Train model and get predictions

API documentation available at `http://localhost:8000/docs` when backend is running.

## 📝 Implementation Checklist

### High Priority
- [ ] Implement gradient descent for Linear Regression
- [ ] Implement sigmoid and loss for Logistic Regression
- [ ] Implement distance calculations for KNN
- [ ] Implement tree building for Decision Tree
- [ ] Implement train/test split

### Medium Priority
- [ ] Add evaluation metrics (accuracy, MSE, R², etc.)
- [ ] Implement data normalization
- [ ] Add real dataset loading
- [ ] Handle missing values

### Nice to Have
- [ ] Add cross-validation
- [ ] Implement hyperparameter tuning
- [ ] Add visualization for predictions
- [ ] Add confusion matrix for classification
- [ ] Export trained models

## 🎓 Learning Resources

Each model file contains detailed TODO comments explaining:
- What needs to be implemented
- The mathematical formulas involved
- Step-by-step implementation guides

## ⚙️ Tech Stack

**Backend:**
- FastAPI
- Uvicorn
- Pandas
- NumPy

**Frontend:**
- React 18
- React Router
- Axios
- CSS3

## 🚫 What's NOT Included

- ❌ Actual ML algorithm implementations
- ❌ Real training loops
- ❌ Evaluation metrics
- ❌ Hyperparameter optimization
- ❌ Data preprocessing logic
- ❌ scikit-learn (intentionally excluded)

## 📖 Notes

- All models inherit from `BaseModel` class
- Models must implement `fit()` and `predict()` methods
- Current predictions are dummy values (zeros or random)
- The structure is production-ready, only logic is missing
- Follow the TODO comments in each file for guidance

## 🤝 Contributing

This is a personal learning project. Implement the ML algorithms yourself to maximize learning!

## 📄 License

This scaffold is provided as-is for educational purposes.

---

**Remember:** The goal is to learn by implementing. Don't skip the TODO comments - they're your roadmap to understanding ML algorithms!
