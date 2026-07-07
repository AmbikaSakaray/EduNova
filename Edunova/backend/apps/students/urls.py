from django.urls import path
from .views import (
    StudentListCreateView, StudentDetailView,
    ParentListCreateView, ParentDetailView,
    StudentDocumentListCreateView, StudentDocumentDetailView,
    StudentEnrollmentListCreateView, StudentEnrollmentDetailView,
    AlumniRegistryListCreateView, AlumniRegistryDetailView,
    MedicalRecordListCreateView, MedicalRecordDetailView,
)

urlpatterns = [
    path('', StudentListCreateView.as_view(), name='student_list_create'),
    path('<uuid:pk>/', StudentDetailView.as_view(), name='student_detail'),

    path('parents/', ParentListCreateView.as_view(), name='parent_list_create'),
    path('parents/<uuid:pk>/', ParentDetailView.as_view(), name='parent_detail'),
    path('documents/', StudentDocumentListCreateView.as_view(), name='student_document_list_create'),
    path('documents/<uuid:pk>/', StudentDocumentDetailView.as_view(), name='student_document_detail'),
    path('enrollments/', StudentEnrollmentListCreateView.as_view(), name='student_enrollment_list_create'),
    path('enrollments/<uuid:pk>/', StudentEnrollmentDetailView.as_view(), name='student_enrollment_detail'),
    path('alumni/', AlumniRegistryListCreateView.as_view(), name='alumni_registry_list_create'),
    path('alumni/<uuid:pk>/', AlumniRegistryDetailView.as_view(), name='alumni_registry_detail'),
    path('medical-records/', MedicalRecordListCreateView.as_view(), name='medical_record_list_create'),
    path('medical-records/<uuid:pk>/', MedicalRecordDetailView.as_view(), name='medical_record_detail'),
]
