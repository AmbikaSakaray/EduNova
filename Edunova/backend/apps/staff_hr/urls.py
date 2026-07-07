from django.urls import path
from .views import (
    EmployeeListCreateView, EmployeeDetailView,
    LeaveRequestListCreateView, LeaveRequestDetailView, LeaveApprovalView,
    PayrollListCreateView, PayrollDetailView,
    TeacherProfileListCreateView, TeacherProfileDetailView,
)

urlpatterns = [
    path('employees/', EmployeeListCreateView.as_view(), name='employee_list_create'),
    path('employees/<uuid:pk>/', EmployeeDetailView.as_view(), name='employee_detail'),
    path('leaves/', LeaveRequestListCreateView.as_view(), name='leave_list_create'),
    path('leaves/<uuid:pk>/', LeaveRequestDetailView.as_view(), name='leave_detail'),
    path('leaves/<uuid:pk>/approve/', LeaveApprovalView.as_view(), name='leave_approval'),
    path('payroll/', PayrollListCreateView.as_view(), name='payroll_list_create'),
    path('payroll/<uuid:pk>/', PayrollDetailView.as_view(), name='payroll_detail'),
    path('teacher-profiles/', TeacherProfileListCreateView.as_view(), name='teacher_profile_list_create'),
    path('teacher-profiles/<uuid:pk>/', TeacherProfileDetailView.as_view(), name='teacher_profile_detail'),
]
