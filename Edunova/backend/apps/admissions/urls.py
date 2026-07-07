from django.urls import path
from .views import (
    AdmissionListCreateView, AdmissionDetailView,
    AdmissionDocumentListCreateView, AdmissionDocumentDetailView,
)

urlpatterns = [
    path('', AdmissionListCreateView.as_view(), name='admission_list_create'),
    path('<uuid:pk>/', AdmissionDetailView.as_view(), name='admission_detail'),
    path('documents/', AdmissionDocumentListCreateView.as_view(), name='admission_document_list_create'),
    path('documents/<uuid:pk>/', AdmissionDocumentDetailView.as_view(), name='admission_document_detail'),
]
