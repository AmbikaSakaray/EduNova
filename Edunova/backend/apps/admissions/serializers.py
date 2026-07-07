from rest_framework import serializers
from .models import Admission, AdmissionDocument


class AdmissionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Admission
        fields = '__all__'


class AdmissionDocumentSerializer(serializers.ModelSerializer):
    class Meta:
        model = AdmissionDocument
        fields = '__all__'
