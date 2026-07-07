from django.urls import path
from .views import (
    ClassRoomListCreateView, ClassRoomDetailView,
    SectionListCreateView, SectionDetailView,
    SubjectListCreateView, SubjectDetailView,
    TimetableListCreateView, TimetableDetailView,
    AcademicProgramListCreateView, AcademicProgramDetailView,
    AcademicAllocationListCreateView, AcademicAllocationDetailView,
    HomeworkListCreateView, HomeworkDetailView,
    HomeworkSubmissionListCreateView, HomeworkSubmissionDetailView,
)

urlpatterns = [
    path('classes/', ClassRoomListCreateView.as_view(), name='classroom_list_create'),
    path('classes/<uuid:pk>/', ClassRoomDetailView.as_view(), name='classroom_detail'),
    path('sections/', SectionListCreateView.as_view(), name='section_list_create'),
    path('sections/<uuid:pk>/', SectionDetailView.as_view(), name='section_detail'),
    path('subjects/', SubjectListCreateView.as_view(), name='subject_list_create'),
    path('subjects/<uuid:pk>/', SubjectDetailView.as_view(), name='subject_detail'),
    path('timetable/', TimetableListCreateView.as_view(), name='timetable_list_create'),
    path('timetable/<uuid:pk>/', TimetableDetailView.as_view(), name='timetable_detail'),

    path('programs/', AcademicProgramListCreateView.as_view(), name='academic_program_list_create'),
    path('programs/<uuid:pk>/', AcademicProgramDetailView.as_view(), name='academic_program_detail'),
    path('allocations/', AcademicAllocationListCreateView.as_view(), name='academic_allocation_list_create'),
    path('allocations/<uuid:pk>/', AcademicAllocationDetailView.as_view(), name='academic_allocation_detail'),
    path('homework/', HomeworkListCreateView.as_view(), name='homework_list_create'),
    path('homework/<uuid:pk>/', HomeworkDetailView.as_view(), name='homework_detail'),
    path('homework-submissions/', HomeworkSubmissionListCreateView.as_view(), name='homework_submission_list_create'),
    path('homework-submissions/<uuid:pk>/', HomeworkSubmissionDetailView.as_view(), name='homework_submission_detail'),
]
