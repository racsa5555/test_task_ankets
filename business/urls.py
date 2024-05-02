from django.urls import path
from .views import *

urlpatterns = [
    path('', AnketAPIView.as_view()),
]