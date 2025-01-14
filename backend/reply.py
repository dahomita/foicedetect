import os
from dotenv import load_dotenv
from openai import OpenAI
import assemblyai as aai

# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv('NEBIUS_API_KEY')

# Initialize the OpenAI client with the API key
client = OpenAI(base_url="https://api.studio.nebius.ai/v1/", api_key=api_key)

def generate_funny_responses(speech_to_text_output):
    # Create the prompt to generate funny responses
    prompt = f"""
    The following is a transcription of a scam call:
    "{speech_to_text_output}"
    
    Generate three funny and witty responses that a user can use to reply to the scammer. The responses should be humorous, non-offensive, and designed to confuse or amuse the scammer while keeping the tone lighthearted.
    
    Format:
    1. [Funny Response 1]
    2. [Funny Response 2]
    3. [Funny Response 3]
    """

    # Use the OpenAI client to generate a response
    completion = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct",  # Specify the model, adjust as needed
        messages=[
            {"role": "system", "content": "You are a humorous assistant specializing in generating witty replies."},
            {"role": "user", "content": prompt}
        ]
    )

    # Extract and return the generated funny responses
    funny_responses = completion.choices[0].message.content.strip()
    return funny_responses

# Speech-to-Text Function
def transcribe_audio(audio_file):
    aai.settings.api_key = os.getenv('ASSEMBLY_API_KEY')
    transcriber = aai.Transcriber()

    if aai.settings.api_key:
        print(aai.settings.api_key)

    transcript = transcriber.transcribe(audio_file)
    print(transcript.text)
    return transcript.text
