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

### API Key Setup

#### Environment Configuration

1. Create a `.env` file in the project root directory
2. Add the following API keys to the `.env` file:

```
NEBIUS_API_KEY=eyJhbGciOiJIUzI1NiIsImtpZCI6IlV6SXJWd1h0dnprLVRvdzlLZWstc0M1akptWXBvX1VaVkxUZlpnMDRlOFUiLCJ0eXAiOiJKV1QifQ.eyJzdWIiOiJnb29nbGUtb2F1dGgyfDExMTY5ODA4MDkyNDAxNzkyMjcxOSIsInNjb3BlIjoib3BlbmlkIG9mZmxpbmVfYWNjZXNzIiwiaXNzIjoiYXBpX2tleV9pc3N1ZXIiLCJhdWQiOlsiaHR0cHM6Ly9uZWJpdXMtaW5mZXJlbmNlLmV1LmF1dGgwLmNvbS9hcGkvdjIvIl0sImV4cCI6MTg5NDY1NTAyMCwidXVpZCI6Ijc2NGNlOTc1LWI4ZjUtNDNkNi1hMTI1LTgzNDQwY2Y5MWVmYSIsIm5hbWUiOiJVbm5hbWVkIGtleSIsImV4cGlyZXNfYXQiOiIyMDMwLTAxLTE0VDIxOjAzOjQwKzAwMDAifQ.UXQkWATEndFFSgnZss62eQ9c7S64AfGLy2qOLJtDKQ8
ASSEMBLY_API_KEY=e98e3dcc13624e2c846c6de74a34809e
```

⚠️ **Security Warning:**
- NEVER commit your `.env` file to version control
- Add `.env` to your `.gitignore` file to prevent accidental exposure
- Treat API keys as sensitive credentials
- Rotate these keys periodically
- Do not share these keys publicly

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
