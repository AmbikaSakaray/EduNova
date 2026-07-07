from django.urls import path
from .views import (
    TenantPingView, TenantListCreateView,
    CompanyProfileListCreateView, CompanyProfileDetailView,
    CampusListCreateView, CampusDetailView,
    DepartmentListCreateView, DepartmentDetailView,
)

urlpatterns = [
    path('', TenantListCreateView.as_view(), name='tenant_list_create'),
    path('ping/', TenantPingView.as_view(), name='tenant_ping'),

    path('company-profile/', CompanyProfileListCreateView.as_view(), name='company_profile_list_create'),
    path('company-profile/<uuid:pk>/', CompanyProfileDetailView.as_view(), name='company_profile_detail'),
    path('campuses/', CampusListCreateView.as_view(), name='campus_list_create'),
    path('campuses/<uuid:pk>/', CampusDetailView.as_view(), name='campus_detail'),
    path('departments/', DepartmentListCreateView.as_view(), name='department_list_create'),
    path('departments/<uuid:pk>/', DepartmentDetailView.as_view(), name='department_detail'),
]
