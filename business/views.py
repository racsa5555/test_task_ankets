from django.shortcuts import render

from rest_framework.generics import CreateAPIView
from rest_framework.permissions import AllowAny

from .serializers import AnketSerializer

class AnketAPIView(CreateAPIView):
    serializer_class = AnketSerializer
    permission_classes = [AllowAny]