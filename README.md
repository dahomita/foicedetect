# FoiceDetect: AI-Powered Voice Detection and Classification

## Project Overview

We developed Fake Voice Detect, a platform leveraging Nebius AI to identify fake voices (deepfakes) and protect users from scams. As scammers increasingly use AI-generated voices to impersonate friends and request money, our platform evaluates how fake a voice is, provides Nebius AI-driven cybersecurity solutions, and even suggests humorous responses to outsmart scammers. Additionally, we securely store information for future use, including reports, evidence, and identification, empowering users to stay safe and take action against fraud.

## Tracks: 
- Cybersecurity Track (WithSandra) $325
- Most Technically Impressive - Modal (Series A company) $2,000 credits grand prize
- Nethenoob spinning cat ($65 cash)
- Nebius Exploratory Use of LLMs and Vision Models:
    - 1st Place: $2,000 credits
    - 2nd Place: $1,000 credits
    - 3rd Place: $500 credits
- $1625 CASH (STATSIG GRAND PRIZE)
- Magic loops $325 CASH
- Beginner tracks (20 winners) ($10 each credits) 

## 🚀 Technologies Stack

### Frontend
- React.js
- React Bootstrap
- Axios
- JavaScript ES6+

### Backend
- Python
- Django
- Machine Learning Libraries
  ### Backend Machine Learning Libraries
  - NumPy
  - Scikit-learn
    - SVC (Support Vector Classification)
    - train_test_split
    - StandardScaler
  - Librosa (Audio feature extraction)
  - Joblib (Model serialization)
- **AssemblyAI Integration**

### Key Features
- Voice Detection
- Voice Classification
- Real-time Audio Analysis
- Machine Learning Model Training

## 🛠 Installation and Setup

### Prerequisites
- Python 3.8+
- Node.js 14+
- pip
- git

### Repository Clone
```bash
git clone https://github.com/dahomita/foicedetect.git
cd foicedetect
```

### Backend Setup And Run
```bash
cd backend
python -m venv venv
venv\Scripts\activate
cd foicedetect_backend
pip install -r requirements.txt
pip install assemblyai
python manage.py makemigrations
python manage.py migrate
python manage.py runserver
```

### Frontend Setup An Run
```bash
npm install
npm start
```




