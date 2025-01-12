import openai

# Load environment variables from .env file
load_dotenv()

# Securely retrieve the API key
OPENAI_API_KEY = os.getenv('OPENAI_API_KEY')

# Validate the API key
if not OPENAI_API_KEY:
    raise ValueError("No OpenAI API key found. Please set the OPENAI_API_KEY environment variable.")