from django.urls import path
from rest_framework_simplejwt.views import TokenRefreshView
from .views import (
    CustomTokenObtainPairView, UserProfileView,
    RoleListCreateView, RoleDetailView,
    PermissionListCreateView, PermissionDetailView,
    UserRoleListCreateView, UserRoleDetailView,
    RolePermissionListCreateView, RolePermissionDetailView,
)

urlpatterns = [
    path('login/', CustomTokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
    path('profile/', UserProfileView.as_view(), name='user_profile'),

    path('roles/', RoleListCreateView.as_view(), name='role_list_create'),
    path('roles/<uuid:pk>/', RoleDetailView.as_view(), name='role_detail'),
    path('permissions/', PermissionListCreateView.as_view(), name='permission_list_create'),
    path('permissions/<uuid:pk>/', PermissionDetailView.as_view(), name='permission_detail'),
    path('user-roles/', UserRoleListCreateView.as_view(), name='user_role_list_create'),
    path('user-roles/<int:pk>/', UserRoleDetailView.as_view(), name='user_role_detail'),
    path('role-permissions/', RolePermissionListCreateView.as_view(), name='role_permission_list_create'),
    path('role-permissions/<int:pk>/', RolePermissionDetailView.as_view(), name='role_permission_detail'),
]
