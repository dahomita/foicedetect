import os
from .train import extract_mfcc_features
import joblib
import numpy as np

def analyze_audio(input_audio_path):
    # Get the absolute path to the current directory
    current_dir = os.path.dirname(os.path.abspath(__file__))
    
    # Construct full paths to model files
    model_filename = os.path.join(current_dir, "svm_model.pkl")
    scaler_filename = os.path.join(current_dir, "scaler.pkl")
    
    # Check if model files exist
    if not os.path.exists(model_filename):
        raise FileNotFoundError(f"Model file not found: {model_filename}")
    if not os.path.exists(scaler_filename):
        raise FileNotFoundError(f"Scaler file not found: {scaler_filename}")

    # Load model and scaler
    svm_classifier = joblib.load(model_filename)
    scaler = joblib.load(scaler_filename)

    if not os.path.exists(input_audio_path):
        print(f"Error: The specified file {input_audio_path} does not exist.")
        return
    elif not input_audio_path.lower().endswith(".wav"):
        print(f"Error: The specified file {input_audio_path} is not a .wav file.")
        return

    mfcc_features = extract_mfcc_features(input_audio_path)

    if mfcc_features is not None:
        mfcc_features_scaled = scaler.transform(mfcc_features.reshape(1, -1))
        probabilities = svm_classifier.predict_proba(mfcc_features_scaled)
        
        confidence_percentage = np.max(probabilities) * 100
        prediction = svm_classifier.predict(mfcc_features_scaled)
        
        if prediction[0] == 0:
            return ['Genuine', confidence_percentage]
        else:
            return ['Deepfake', confidence_percentage]
    else:
        print(f"Error: Unable to process the input audio {input_audio_path}.")
        return None