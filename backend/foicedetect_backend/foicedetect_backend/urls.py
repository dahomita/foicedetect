from django.contrib import admin
from django.urls import path, include
from api.views import CreateUserView, UserProfileView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from api.views import DeleteAccountView
from api.views import SaveDetectionDocumentView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include('audio_detection.urls')),
    path("api/user/register/", CreateUserView.as_view(), name="register"),
    path("api/token/", TokenObtainPairView.as_view(), name="get_token"),
    path("api/token/refresh/", TokenRefreshView.as_view(), name="refresh"),
    path("api-auth/", include("rest_framework.urls")),
    path("api/user/profile/", UserProfileView.as_view(), name="user_profile"),
    path("api/user/delete/", DeleteAccountView.as_view(), name="delete_account"),
    path('api/save_detection_document/', SaveDetectionDocumentView.as_view(), name='save_detection_document')
]