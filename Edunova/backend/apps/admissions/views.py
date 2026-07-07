from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import Admission, AdmissionDocument
from .serializers import AdmissionSerializer, AdmissionDocumentSerializer


class AdmissionListCreateView(BaseListCreateView):
    queryset = Admission.objects.all()
    serializer_class = AdmissionSerializer

class AdmissionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Admission.objects.all()
    serializer_class = AdmissionSerializer

class AdmissionDocumentListCreateView(BaseListCreateView):
    queryset = AdmissionDocument.objects.all()
    serializer_class = AdmissionDocumentSerializer

class AdmissionDocumentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = AdmissionDocument.objects.all()
    serializer_class = AdmissionDocumentSerializer
