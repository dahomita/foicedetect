from django.contrib.auth.models import User
from rest_framework import serializers
from .models import DetectionDocument

class UserSerializer(serializers.ModelSerializer):
  class Meta:
    model = User
    fields = ["id", "username", "password", "email"]
    # extra_kwargs = {"password": {"write_only": True}}
    extra_kwargs = {
      "password": {"write_only": True},
      "email": {"required": True},  # Ensure email is mandatory
    }

  def validate_email(self, value):
    if User.objects.filter(email=value).exists():
        raise serializers.ValidationError("A user with this email already exists.")
    return value

  def create(self, validated_data):
    email = validated_data.pop("email", None)
    user = User.objects.create_user(**validated_data)
    if email:
      user.email = email
      user.save()
    return user
    # user = User.objects.create_user(**validated_data)
    # return user

class DetectionDocumentSerializer(serializers.ModelSerializer):
  user = UserSerializer()  # Include user information via a nested serializer

  class Meta:
    model = DetectionDocument
    fields = ['id', 'name', 'recording_name', 'is_genuine', 'confidence_score', 'ai_analysis', 'user', 'reply']  # Add or remove fields as needed