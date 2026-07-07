from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from django.shortcuts import get_object_or_404
from apps.core.permissions import RoleBasedAccessControl
from .models import Student
from .serializers import StudentSerializer

class StudentListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'students'

    def get(self, request):
        # Exclude soft-deleted students
        students = Student.objects.filter(deleted_at__isnull=True)
        serializer = StudentSerializer(students, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = StudentSerializer(data=request.data)
        if serializer.is_valid():
            student = serializer.save()
            return Response({
                "status": "success",
                "message": "Student profile created successfully.",
                "student_id": str(student.id),
                "admission_no": student.admission_no
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class StudentDetailView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'students'

    def _get_student(self, pk):
        try:
            return Student.objects.get(pk=pk, deleted_at__isnull=True)
        except Student.DoesNotExist:
            return None

    def get(self, request, pk):
        student = self._get_student(pk)
        if not student:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        serializer = StudentSerializer(student)
        return Response(serializer.data)

    def put(self, request, pk):
        student = self._get_student(pk)
        if not student:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        
        serializer = StudentSerializer(student, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response({
                "status": "success",
                "message": "Student profile updated successfully."
            })
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

    def delete(self, request, pk):
        student = self._get_student(pk)
        if not student:
            return Response({"error": "Student not found"}, status=status.HTTP_404_NOT_FOUND)
        
        student.soft_delete()
        return Response({
            "status": "success",
            "message": "Student profile archived successfully."
        }, status=status.HTTP_200_OK)


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import Parent, StudentDocument, StudentEnrollment, AlumniRegistry, MedicalRecord
from .serializers import (
    ParentSerializer, StudentDocumentSerializer, StudentEnrollmentSerializer,
    AlumniRegistrySerializer, MedicalRecordSerializer
)


class ParentListCreateView(BaseListCreateView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

class ParentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Parent.objects.all()
    serializer_class = ParentSerializer

class StudentDocumentListCreateView(BaseListCreateView):
    queryset = StudentDocument.objects.all()
    serializer_class = StudentDocumentSerializer

class StudentDocumentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = StudentDocument.objects.all()
    serializer_class = StudentDocumentSerializer

class StudentEnrollmentListCreateView(BaseListCreateView):
    queryset = StudentEnrollment.objects.all()
    serializer_class = StudentEnrollmentSerializer

class StudentEnrollmentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = StudentEnrollment.objects.all()
    serializer_class = StudentEnrollmentSerializer

class AlumniRegistryListCreateView(BaseListCreateView):
    queryset = AlumniRegistry.objects.all()
    serializer_class = AlumniRegistrySerializer

class AlumniRegistryDetailView(BaseRetrieveUpdateDestroyView):
    queryset = AlumniRegistry.objects.all()
    serializer_class = AlumniRegistrySerializer

class MedicalRecordListCreateView(BaseListCreateView):
    queryset = MedicalRecord.objects.all()
    serializer_class = MedicalRecordSerializer

class MedicalRecordDetailView(BaseRetrieveUpdateDestroyView):
    queryset = MedicalRecord.objects.all()
    serializer_class = MedicalRecordSerializer
