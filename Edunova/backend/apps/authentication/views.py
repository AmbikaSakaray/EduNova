from rest_framework_simplejwt.views import TokenObtainPairView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from .serializers import CustomTokenObtainPairSerializer, UserSerializer

class CustomTokenObtainPairView(TokenObtainPairView):
    serializer_class = CustomTokenObtainPairSerializer

class UserProfileView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response(serializer.data)


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
