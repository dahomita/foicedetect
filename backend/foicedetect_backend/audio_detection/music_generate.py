import os
import traceback
import json
from some_music_library import MusicGenerator  # Replace with your actual library
from django.http import JsonResponse, HttpResponse

# Initialize music generator (replace with actual initialization logic)
music_generator = MusicGenerator(api_key=os.getenv('MUSIC_API_KEY'))

def error_response(message, status=400):
    """Helper function for error responses."""
    return JsonResponse({"error": message}, status=status)

def generate_hilarious_music(lyrics):
    """
    Generates hilarious music using the given lyrics.

    Args:
        lyrics (str): Lyrics provided by the user.

    Returns:
        dict: Contains generated music details or an error message.
    """
    prompt = f"generate a hilarious music using this lyrics: {lyrics}"
    try:
        # Generate music using the fixed prompt
        result = music_generator.generate(prompt)
        # Assuming result contains a path to the music file
        music_file_path = result.get("music_file_path")
        description = result.get("description")

        # Check if music file path is returned
        if music_file_path:
            return {
                "success": True,
                "music_file_path": music_file_path,
                "description": description
            }
        else:
            return {"success": False, "error": "No music file generated"}
    except Exception as e:
        traceback.print_exc()
        return {"success": False, "error": str(e)}

def process_music_request(request):
    """
    Processes a music generation request.

    Args:
        request (HttpRequest): The incoming request object.

    Returns:
        JsonResponse or HttpResponse: The response containing generated music or an error message.
    """
    if request.method != 'POST':
        return error_response("Method not allowed", status=405)

    try:
        # Parse JSON body
        body = json.loads(request.body.decode("utf-8"))
        lyrics = body.get("lyrics", "").strip()

        if not lyrics:
            return error_response("Lyrics are required")

        # Generate music
        response = generate_hilarious_music(lyrics)

        if response["success"]:
            # Serve the generated music file
            music_file_path = response["music_file_path"]
            if os.path.exists(music_file_path):
                with open(music_file_path, 'rb') as music_file:
                    # Serve the file as a response
                    response = HttpResponse(music_file.read(), content_type="audio/mpeg")
                    response['Content-Disposition'] = f'attachment; filename="generated_music.mp3"'
                    return response
            else:
                return error_response("Music file not found", status=404)
        else:
            return error_response(response["error"], status=500)
    except json.JSONDecodeError:
        return error_response("Invalid JSON format", status=400)
    except Exception as e:
        traceback.print_exc()
        return error_response(str(e), status=500)
