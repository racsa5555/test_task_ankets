from rest_framework.serializers import ModelSerializer

from .models import Anket

class AnketSerializer(ModelSerializer):

    class Meta:
        fields = '__all__'
        model = Anket