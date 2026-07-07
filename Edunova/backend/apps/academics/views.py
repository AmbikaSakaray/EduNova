from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.core.permissions import RoleBasedAccessControl
from .models import ClassRoom, Section, Subject, Timetable, AcademicProgram, AcademicAllocation, Homework, HomeworkSubmission
from .serializers import (
    ClassRoomSerializer, SectionSerializer, SubjectSerializer, TimetableSerializer,
    AcademicProgramSerializer, AcademicAllocationSerializer, HomeworkSerializer, HomeworkSubmissionSerializer
)
from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView

class ClassRoomListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'students' # mapped permissions index

    def get(self, request):
        classes = ClassRoom.objects.filter(deleted_at__isnull=True)
        serializer = ClassRoomSerializer(classes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ClassRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SectionListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'students'

    def get(self, request):
        sections = Section.objects.filter(deleted_at__isnull=True)
        serializer = SectionSerializer(sections, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SectionSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubjectListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'students'

    def get(self, request):
        subjects = Subject.objects.filter(deleted_at__isnull=True)
        serializer = SubjectSerializer(subjects, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = SubjectSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class TimetableListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'students'

    def get(self, request):
        schedules = Timetable.objects.filter(deleted_at__isnull=True)
        serializer = TimetableSerializer(schedules, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = TimetableSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


# --- Detail (retrieve/update/delete) endpoints, previously missing ---
class ClassRoomDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ClassRoom.objects.all()
    serializer_class = ClassRoomSerializer

class SectionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Section.objects.all()
    serializer_class = SectionSerializer

class SubjectDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Subject.objects.all()
    serializer_class = SubjectSerializer

class TimetableDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Timetable.objects.all()
    serializer_class = TimetableSerializer


# --- New modules from the client requirements schema ---
class AcademicProgramListCreateView(BaseListCreateView):
    queryset = AcademicProgram.objects.all()
    serializer_class = AcademicProgramSerializer

class AcademicProgramDetailView(BaseRetrieveUpdateDestroyView):
    queryset = AcademicProgram.objects.all()
    serializer_class = AcademicProgramSerializer

class AcademicAllocationListCreateView(BaseListCreateView):
    queryset = AcademicAllocation.objects.all()
    serializer_class = AcademicAllocationSerializer

class AcademicAllocationDetailView(BaseRetrieveUpdateDestroyView):
    queryset = AcademicAllocation.objects.all()
    serializer_class = AcademicAllocationSerializer

class HomeworkListCreateView(BaseListCreateView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer

class HomeworkDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Homework.objects.all()
    serializer_class = HomeworkSerializer

class HomeworkSubmissionListCreateView(BaseListCreateView):
    queryset = HomeworkSubmission.objects.all()
    serializer_class = HomeworkSubmissionSerializer

class HomeworkSubmissionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = HomeworkSubmission.objects.all()
    serializer_class = HomeworkSubmissionSerializer
