# FoiceDetect 🎙️

AI-powered voice deepfake detection and classification platform to protect against scams

## 📋 Overview

FoiceDetect is a cutting-edge platform that leverages Nebius AI to identify and classify AI-generated voices (deepfakes). As voice scams become increasingly sophisticated with scammers using AI to impersonate friends and family members, FoiceDetect provides robust protection through advanced detection algorithms and practical countermeasures.

### 🛡️ Key Features

- **Deepfake Detection**: Analyzes audio to determine authenticity with high accuracy
- **Risk Classification**: Evaluates potential threat levels of suspicious voice samples
- **Real-time Analysis**: Processes audio inputs with minimal latency
- **Smart Responses**: Suggests effective countermeasures, including humorous replies to confuse scammers
- **Secure Storage**: Maintains evidence and reports for future reference and potential legal action
- **User Empowerment**: Provides tools and knowledge to recognize and respond to voice-based threats

## 🚀 Technologies

### Frontend
- React.js
- React Bootstrap
- Axios
- JavaScript ES6+

### Backend
- Python
- Django
- RESTful API architecture

### Machine Learning
- NumPy
- Scikit-learn (SVC, train_test_split, StandardScaler)
- Librosa (Audio feature extraction)
- Joblib (Model serialization)

### Integrations
- **Nebius AI**: Powers core detection algorithms
- **AssemblyAI**: Enhanced audio processing capabilities

## 🛠️ Installation

### Prerequisites
- Python 3.8+
- Node.js 14+
- npm/yarn
- Git

### Quick Start

1. **Clone the repository**
   ```bash
   git clone https://github.com/dahomita/foicedetect.git
   cd foicedetect
   ```

2. **Set up API keys**
   Create a `.env` file in the project root with:
   ```
   NEBIUS_API_KEY=your_nebius_api_key
   ASSEMBLY_API_KEY=your_assembly_api_key
   ```

3. **Backend setup**
   ```bash
   cd backend
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   cd foicedetect_backend
   pip install -r requirements.txt
   pip install assemblyai
   python manage.py makemigrations
   python manage.py migrate
   python manage.py runserver
   ```

4. **Frontend setup**
   ```bash
   cd frontend
   npm install
   npm start
   ```

5. **Access the application**
   Open your browser and navigate to `http://localhost:3000`

## 📊 Usage

1. Upload an audio file or record directly through the application
2. Our AI will analyze the voice patterns and determine authenticity
3. Review the detailed analysis report with confidence scores
4. Use the suggested responses or countermeasures if the voice is classified as fake

## 🧪 Demo

Check out our [video demo](https://youtu.be/YJB9-aR2dEc) to see FoiceDetect in action.

## 🏆 Recognition

FoiceDetect has been recognized in multiple tracks:
- Cybersecurity Track (WithSandra) - $325
- Most Technically Impressive - Modal - $2,000 credits grand prize
- Nethenoob spinning cat - $65 cash
- Nebius Exploratory Use of LLMs and Vision Models:
  - 1st Place: $2,000 credits
  - 2nd Place: $1,000 credits
  - 3rd Place: $500 credits
- STATSIG GRAND PRIZE - $1,625 CASH
- Magic loops - $325 CASH
- Beginner tracks (20 winners) - $10 each in credits

---

Built with ❤️ by the FoiceDetect Team
