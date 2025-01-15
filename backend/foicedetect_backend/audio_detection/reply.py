import os
from dotenv import load_dotenv
from openai import OpenAI
import assemblyai as aai
from .text_generate import transcribe_audio
from django.http import JsonResponse
from rest_framework.response import Response


# Load environment variables from .env file
load_dotenv()

# Get the API key from environment variables
api_key = os.getenv('NEBIUS_API_KEY')

# Initialize the OpenAI client with the API key
client = OpenAI(base_url="https://api.studio.nebius.ai/v1/", api_key=api_key)

def generate_hilarious_reply(transcript_text):
    # Create a humorous and stunning reply
    prompt = f"""
    The following is a transcript of a scammer trying to trick someone:
    "{transcript_text}"

    Your task is to craft a short reply (200 words max) that will completely confuse, shock, and humorously stun the scammer. 
    Use absurd logic, overly complex reasoning, and sprinkle in random but funny facts that make no sense in the context. 
    The reply should leave the scammer speechless and questioning their own choices in life.

    If the transcript is [No Transcript. Audio intelligible.], it means the audio is not intelligible. In that case, just give a general response to a scammer.

    Keep the tone witty, sarcastic, and a little over-the-top, but avoid being rude or offensive.    

    Go straight to the reply to the scammer.
    """

    # Use the OpenAI client to generate the reply
    completion = client.chat.completions.create(
        model="meta-llama/Meta-Llama-3.1-70B-Instruct",
        messages=[
            {"role": "system", "content": "You are a comedic genius specializing in scammer confusion."},
            {"role": "user", "content": prompt}
        ]
    )

    # Extract and return the generated reply
    reply = completion.choices[0].message.content.strip()
    return reply


