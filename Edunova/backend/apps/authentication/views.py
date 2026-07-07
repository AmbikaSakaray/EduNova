from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from .serializers import CustomTokenObtainPairSerializer, UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView

User = get_user_model()


class UserListCreateView(BaseListCreateView):
    queryset = User.objects.all().order_by('-date_joined')
    serializer_class = UserSerializer

    def perform_create(self, serializer):
        password = self.request.data.get('password')
        user = serializer.save()
        if password:
            user.set_password(password)
            user.save(update_fields=['password'])


class UserDetailView(BaseRetrieveUpdateDestroyView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def perform_update(self, serializer):
        password = self.request.data.get('password')
        user = serializer.save()
        if password:
            user.set_password(password)
            user.save(update_fields=['password'])


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import Role, Permission, UserRole, RolePermission
from .serializers import RoleSerializer, PermissionSerializer, UserRoleSerializer, RolePermissionSerializer


class RoleListCreateView(BaseListCreateView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class RoleDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Role.objects.all()
    serializer_class = RoleSerializer

class PermissionListCreateView(BaseListCreateView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class PermissionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Permission.objects.all()
    serializer_class = PermissionSerializer

class UserRoleListCreateView(BaseListCreateView):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer

class UserRoleDetailView(BaseRetrieveUpdateDestroyView):
    queryset = UserRole.objects.all()
    serializer_class = UserRoleSerializer

class RolePermissionListCreateView(BaseListCreateView):
    queryset = RolePermission.objects.all()
    serializer_class = RolePermissionSerializer

class RolePermissionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = RolePermission.objects.all()
    serializer_class = RolePermissionSerializer
