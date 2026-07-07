from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.core.permissions import RoleBasedAccessControl
from .models import Employee, LeaveRequest, Payroll
from .serializers import EmployeeSerializer, LeaveRequestSerializer, PayrollSerializer

class EmployeeListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'payroll'

    def get(self, request):
        employees = Employee.objects.filter(deleted_at__isnull=True)
        serializer = EmployeeSerializer(employees, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LeaveRequestListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'payroll'

    def get(self, request):
        leaves = LeaveRequest.objects.filter(deleted_at__isnull=True)
        serializer = LeaveRequestSerializer(leaves, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LeaveRequestSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LeaveApprovalView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'payroll'

    def post(self, request, pk):
        action = request.data.get('action') # Approved/Rejected
        if action not in ['Approved', 'Rejected']:
            return Response({"error": "Action must be Approved or Rejected"}, status=status.HTTP_400_BAD_REQUEST)

        try:
            leave = LeaveRequest.objects.get(pk=pk, deleted_at__isnull=True)
        except LeaveRequest.DoesNotExist:
            return Response({"error": "Leave request not found"}, status=status.HTTP_404_NOT_FOUND)

        leave.status = action
        leave.save(update_fields=['status', 'updated_at'])

        return Response({
            "status": "success",
            "message": f"Leave request is now {action}."
        })

class PayrollListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'payroll'

    def get(self, request):
        payrolls = Payroll.objects.filter(deleted_at__isnull=True)
        serializer = PayrollSerializer(payrolls, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Allow HR Manager or Accountant to generate monthly payroll registers
        serializer = PayrollSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import TeacherProfile
from .serializers import TeacherProfileSerializer


class EmployeeDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Employee.objects.all()
    serializer_class = EmployeeSerializer

class LeaveRequestDetailView(BaseRetrieveUpdateDestroyView):
    queryset = LeaveRequest.objects.all()
    serializer_class = LeaveRequestSerializer

class PayrollDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Payroll.objects.all()
    serializer_class = PayrollSerializer

class TeacherProfileListCreateView(BaseListCreateView):
    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer

class TeacherProfileDetailView(BaseRetrieveUpdateDestroyView):
    queryset = TeacherProfile.objects.all()
    serializer_class = TeacherProfileSerializer
