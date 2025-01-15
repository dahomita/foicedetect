from django.urls import path
from . import views
# from .views import SaveDetectionDocumentView

urlpatterns = [
    path('detect/', views.detect_audio, name='detect_audio'),
    # path('save_detection_document/', views.save_detection_document, name='save_detection_document')
    # path('save_detection_document/', SaveDetectionDocument.as_view(), name='save_detection_document')
    path('reply/', views.reply, name='reply'),
]