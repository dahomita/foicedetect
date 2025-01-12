import os
import traceback
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage

# Direct import from the same directory
from .predict import analyze_audio

@csrf_exempt
def detect_audio(request):
    if request.method == 'POST':
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
        
        file = request.FILES['file']
        
        # Ensure file is .wav
        if not file.name.lower().endswith('.wav'):
            return JsonResponse({'error': 'Only .wav files are supported'}, status=400)
        
        # Create uploads directory if it doesn't exist
        upload_dir = 'uploads/'
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save the file
        file_path = default_storage.save(os.path.join(upload_dir, file.name), file)
        full_path = os.path.join(upload_dir, file.name)
        
        try:
            # Use your existing prediction function
            result = analyze_audio(full_path)
            
            # Clean up the uploaded file
            os.remove(full_path)
            
            # Return result based on the prediction
            if isinstance(result, list):
                return JsonResponse({
                    'result': result[0],  # 'Genuine' or 'Deepfake'
                    'confidence': result[1]  # Confidence percentage
                })
            elif result in ['Genuine', 'Deepfake']:
                return JsonResponse({
                    'result': result,
                    'confidence': None  # No confidence if not available
                })
            else:
                return JsonResponse({'error': 'Prediction failed'}, status=500)
        
        except Exception as e:
            # Print full traceback to console for debugging
            print("Full error traceback:")
            traceback.print_exc()
            
            # Clean up the file in case of error
            if os.path.exists(full_path):
                os.remove(full_path)
            
            # Return detailed error response
            return JsonResponse({
                'error': str(e),
                'traceback': traceback.format_exc()
            }, status=500)
    
    return JsonResponse({'error': 'Method not allowed'}, status=405)