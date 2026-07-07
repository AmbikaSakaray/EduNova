from django.urls import path
from .views import AttendanceRecordListCreateView, AttendanceRecordDetailView

urlpatterns = [
    path('', AttendanceRecordListCreateView.as_view(), name='attendance_list_create'),
    path('<uuid:pk>/', AttendanceRecordDetailView.as_view(), name='attendance_detail'),
]
