import os
import traceback
from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.core.files.storage import default_storage
# from .models import DetectionDocument


# Direct import from the same directory
from .predict import analyze_audio
from .text_generate import transcribe_audio, generate_analysis

@csrf_exempt
def detect_audio(request):
    if request.method == 'POST':
        if 'file' not in request.FILES:
            return JsonResponse({'error': 'No file uploaded'}, status=400)
        
        file = request.FILES['file']
        print(file.name)
        
        # Ensure file is .wav
        if not file.name.lower().endswith('.wav'):
            return JsonResponse({'error': 'Only .wav files are supported'}, status=400)
        
        # Create uploads directory if it doesn't exist
        upload_dir = 'uploads/'
        os.makedirs(upload_dir, exist_ok=True)
        
        # Save the file
        full_path = os.path.join(upload_dir, file.name)
        
        try:
            # Save the file using default_storage
            with default_storage.open(full_path, 'wb+') as destination:
                for chunk in file.chunks():
                    destination.write(chunk)
            
            # Perform audio analysis
            result = analyze_audio(full_path)
            
            # Perform speech-to-text transcription
            try:
                speech_text = transcribe_audio(full_path)
            except Exception as transcription_error:
                speech_text = "Transcription failed: " + str(transcription_error)
            
            # Generate detailed analysis
            try:
                # Prepare classification result string
                classification_result = f"The input audio is classified as {result[0]} with {result[1]:.2f}% confidence."
                
                # Generate AI-powered analysis
                ai_analysis = generate_analysis(speech_text, classification_result)
            except Exception as analysis_error:
                ai_analysis = "AI analysis generation failed: " + str(analysis_error)
            
            # Clean up the uploaded file
            os.remove(full_path)
            
            # Return comprehensive result
            return JsonResponse({
                'result': result[0],  # 'Genuine' or 'Deepfake'
                'confidence': result[1],  # Confidence percentage
                'speech_to_text': speech_text,
                'ai_analysis': ai_analysis
            })
        
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

# @csrf_exempt
# def save_detection_document(request):
#     if request.method == 'POST':
#       # Ensure user is authenticated
#     #   if not request.user.is_authenticated:
#     #       return JsonResponse({'error': 'Authentication required'}, status=401)

#       # Get uploaded file from request
#       file = request.FILES.get('file')
#       if not file:
#           return JsonResponse({'error': 'No file provided'}, status=400)

#       # Create and save the DetectionDocument
#       try:
#           detection_doc = DetectionDocument.objects.create(
#               user=request.user,
#               name=request.POST.get('name', 'Untitled'),  # Get the document name from the request or default to 'Untitled'
#               recordingName=file.name  # Save the name of the uploaded file
#           )
#           return JsonResponse({
#               'message': 'Detection document saved successfully',
#               'detection_document_id': detection_doc.id
#           }, status=201)

#       except Exception as e:
#           return JsonResponse({'error': str(e)}, status=500)

#     return JsonResponse({'error': 'Only POST method is allowed'}, status=405)