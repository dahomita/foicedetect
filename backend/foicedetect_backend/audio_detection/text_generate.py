import os
from dotenv import load_dotenv
from openai import OpenAI

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv('OPENAI_API_KEY')

# Initialize the OpenAI client with the API key
client = OpenAI(api_key=api_key)

def generate_analysis(speech_to_text_output, classification_result):
    # Create the prompt by combining the speech-to-text output and the classification result
    prompt = f"""
    Analyze the following potential scam audio and provide a comprehensive user guidance:

    Speech-to-Text Content:
    "{speech_to_text_output}"

    Classification Result:
    "{classification_result}"

    Your response should include:
    1. Detailed Scam Risk Assessment
    - Identify specific red flags in the audio content
    - Explain why the audio might be a potential scam or social engineering attempt
    
    2. Immediate User Recommendations
    - Step-by-step guidance on how to respond to this type of suspicious communication
    - Specific actions to protect personal and financial information
    
    3. Verification Strategies
    - Provide concrete methods to independently verify the claimed authority or request
    - Suggest official channels to confirm the legitimacy of the communication
    
    4. Psychological Manipulation Breakdown
    - Analyze the language techniques used to create urgency or fear
    - Explain common social engineering tactics employed in such communications

    5. Legal and Reporting Guidance
    - Recommend appropriate authorities or agencies to report such suspicious communications
    - Outline potential legal protections and resources for victims of attempted scams

    Tone should be authoritative, calm, and empowering. Focus on educating the user about potential risks and equipping them with practical defense strategies.
    """

    # Use the OpenAI client to generate a response
    completion = client.chat.completions.create(
        model="gpt-4",  # Specify the model, adjust as needed
        messages=[ 
            {"role": "system", "content": "You are a cybersecurity expert specializing in social engineering and scam prevention."},
            {"role": "user", "content": prompt}
        ]
    )

    # Extract and return the generated analysis
    analysis = completion.choices[0].message.content.strip()
    return analysis

# # Example usage
# speech_to_text_output = "Hello, this is John from the IRS. I'm calling to inform you that there's an urgent issue with your tax filing. We've detected some discrepancies, and if they are not resolved immediately, you may face legal action."
# classification_result = "The input audio is classified as genuine with 82.91% confidence."

# # Error handling for API key
# if not api_key:
#     print("Error: OpenAI API key not found. Please check your .env file.")
# else:
#     try:
#         analysis = generate_analysis(speech_to_text_output, classification_result)
#         print("Scam Detection and User Guidance:")
#         print(analysis)
#     except Exception as e:
#         print(f"An error occurred: {e}")

# Speech-to-Text Function
def speech_to_text(audio_file_path):
    audio_file = open(audio_file_path, "rb")
    transcript = client.audio.transcriptions.create(
    model="whisper-1", 
    file=audio_file
)
    return transcript.text