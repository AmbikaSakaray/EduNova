from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import AllowAny
from apps.core.permissions import RoleBasedAccessControl
from .models import Tenant
from .serializers import TenantSerializer

class TenantPingView(APIView):
    permission_classes = [AllowAny]

    def get(self, request):
        return Response({"status": "success", "message": "Tenant system active."})


class TenantListCreateView(APIView):
    # Protect using RBAC matrix (Super Admin only can manage)
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'tenants'

    def get(self, request):
        tenants = Tenant.objects.all()
        serializer = TenantSerializer(tenants, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TenantSerializer(data=request.data)
        if serializer.is_valid():
            tenant = serializer.save()
            return Response({
                "status": "success",
                "message": f"Tenant '{tenant.company_name}' provisioned successfully.",
                "tenant_id": str(tenant.id),
                "schema_name": tenant.schema_name
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import CompanyProfile, Campus, Department
from .serializers import CompanyProfileSerializer, CampusSerializer, DepartmentSerializer


class CompanyProfileListCreateView(BaseListCreateView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer

class CompanyProfileDetailView(BaseRetrieveUpdateDestroyView):
    queryset = CompanyProfile.objects.all()
    serializer_class = CompanyProfileSerializer

class CampusListCreateView(BaseListCreateView):
    queryset = Campus.objects.all()
    serializer_class = CampusSerializer

class CampusDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Campus.objects.all()
    serializer_class = CampusSerializer

class DepartmentListCreateView(BaseListCreateView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer

class DepartmentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Department.objects.all()
    serializer_class = DepartmentSerializer
