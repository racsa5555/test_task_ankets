from django.urls import path
from .views import *

urlpatterns = [
    path('', index, name='index'),
    path('get_questions/',get_questions),
    path('get_base_questions/',get_base_questions),
]