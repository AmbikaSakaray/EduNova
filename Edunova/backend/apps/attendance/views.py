from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.core.permissions import RoleBasedAccessControl
from .models import AttendanceRecord
from .serializers import AttendanceRecordSerializer

class AttendanceRecordListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'attendance'

    def get(self, request):
        records = AttendanceRecord.objects.filter(deleted_at__isnull=True)
        serializer = AttendanceRecordSerializer(records, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AttendanceRecordSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": "success",
                "message": "Attendance record created successfully."
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class AttendanceRecordDetailView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'attendance'

    def _get_record(self, pk):
        try:
            return AttendanceRecord.objects.get(pk=pk, deleted_at__isnull=True)
        except AttendanceRecord.DoesNotExist:
            return None

    def get(self, request, pk):
        record = self._get_record(pk)
        if not record:
            return Response({"error": "Attendance record not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = AttendanceRecordSerializer(record)
        return Response(serializer.data)

    def put(self, request, pk):
        record = self._get_record(pk)
        if not record:
            return Response({"error": "Attendance record not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = AttendanceRecordSerializer(record, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "message": "Attendance record updated successfully."})
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
