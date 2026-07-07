from django.contrib import admin
from django.urls import path, include
from django.http import JsonResponse
from django.shortcuts import render

def api_root_view(request):
    return JsonResponse({
        "status": "success",
        "message": "EduNova School ERP & LMS API Gateway Active.",
        "version": "v1",
        "developer_dashboard": "/dev-dashboard/",
        "documentation": "See FRONTEND_API_GUIDE.md for details"
    })

def dev_dashboard_view(request):
    return render(request, 'dev_dashboard.html')

urlpatterns = [
    path('', api_root_view, name='api-root'),
    path('dev-dashboard/', dev_dashboard_view, name='dev-dashboard'),
    path('monitor/', dev_dashboard_view, name='monitor'),
    path('admin/', admin.site.urls),
    path('api/v1/auth/', include('apps.authentication.urls')),
    path('api/v1/tenants/', include('apps.tenants.urls')),
    path('api/v1/students/', include('apps.students.urls')),
    path('api/v1/academics/', include('apps.academics.urls')),
    path('api/v1/attendance/', include('apps.attendance.urls')),
    path('api/v1/billing/', include('apps.billing.urls')),
    path('api/v1/staff/', include('apps.staff_hr.urls')),
    path('api/v1/exams/', include('apps.exams.urls')),
    path('api/v1/lms/', include('apps.lms.urls')),
    path('api/v1/operations/', include('apps.operations.urls')),
    path('api/v1/admissions/', include('apps.admissions.urls')),
    path('api/v1/cms/', include('apps.cms.urls')),
]

