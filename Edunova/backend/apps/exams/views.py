from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.core.permissions import RoleBasedAccessControl
from .models import Exam, ExamSchedule, Mark
from .serializers import ExamSerializer, ExamScheduleSerializer, MarkSerializer

class ExamListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'exams'

    def get(self, request):
        exams = Exam.objects.filter(deleted_at__isnull=True)
        serializer = ExamSerializer(exams, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExamSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ExamScheduleListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'exams'

    def get(self, request):
        schedules = ExamSchedule.objects.filter(deleted_at__isnull=True)
        serializer = ExamScheduleSerializer(schedules, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = ExamScheduleSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class MarkListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'exams'

    def get(self, request):
        marks = Mark.objects.filter(deleted_at__isnull=True)
        serializer = MarkSerializer(marks, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Allow Teachers or Admins to log student grades
        serializer = MarkSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class StudentReportCardView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'exams'

    def get(self, request, student_id):
        # Fetch all marks records for this student
        student_marks = Mark.objects.filter(student_id=student_id, deleted_at__isnull=True).select_related('exam_schedule__subject')
        
        if not student_marks:
            return Response({"error": "No marks records found for this student."}, status=status.HTTP_404_NOT_FOUND)

        serializer = MarkSerializer(student_marks, many=True)
        
        # Calculate grade statistics (GPA mapping)
        total_obtained = sum([m.marks_obtained for m in student_marks])
        total_max = sum([m.max_marks for m in student_marks])
        overall_percentage = (total_obtained / total_max) * 100 if total_max > 0 else 0

        # Simple GPA translation
        gpa = round(float(overall_percentage) / 25.0, 2)  # Translate percentage to a 4.0 scale

        return Response({
            "student_id": student_id,
            "overall_percentage": round(overall_percentage, 2),
            "calculated_gpa": gpa,
            "subjects_breakdown": serializer.data
        })


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import (
    QuestionBank, OnlineExam, OnlineExamQuestion, ExamAttempt, ExamAnswer,
    HallTicket, Result, ReportCard, OMREvaluation, Certificate
)
from .serializers import (
    QuestionBankSerializer, OnlineExamSerializer, OnlineExamQuestionSerializer,
    ExamAttemptSerializer, ExamAnswerSerializer, HallTicketSerializer,
    ResultSerializer, ReportCardSerializer, OMREvaluationSerializer, CertificateSerializer
)

class ExamDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Exam.objects.all()
    serializer_class = ExamSerializer

class ExamScheduleDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ExamSchedule.objects.all()
    serializer_class = ExamScheduleSerializer

class MarkDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Mark.objects.all()
    serializer_class = MarkSerializer

class QuestionBankListCreateView(BaseListCreateView):
    queryset = QuestionBank.objects.all()
    serializer_class = QuestionBankSerializer

class QuestionBankDetailView(BaseRetrieveUpdateDestroyView):
    queryset = QuestionBank.objects.all()
    serializer_class = QuestionBankSerializer

class OnlineExamListCreateView(BaseListCreateView):
    queryset = OnlineExam.objects.all()
    serializer_class = OnlineExamSerializer

class OnlineExamDetailView(BaseRetrieveUpdateDestroyView):
    queryset = OnlineExam.objects.all()
    serializer_class = OnlineExamSerializer

class OnlineExamQuestionListCreateView(BaseListCreateView):
    queryset = OnlineExamQuestion.objects.all()
    serializer_class = OnlineExamQuestionSerializer

class OnlineExamQuestionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = OnlineExamQuestion.objects.all()
    serializer_class = OnlineExamQuestionSerializer

class ExamAttemptListCreateView(BaseListCreateView):
    queryset = ExamAttempt.objects.all()
    serializer_class = ExamAttemptSerializer

class ExamAttemptDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ExamAttempt.objects.all()
    serializer_class = ExamAttemptSerializer

class ExamAnswerListCreateView(BaseListCreateView):
    queryset = ExamAnswer.objects.all()
    serializer_class = ExamAnswerSerializer

class ExamAnswerDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ExamAnswer.objects.all()
    serializer_class = ExamAnswerSerializer

class HallTicketListCreateView(BaseListCreateView):
    queryset = HallTicket.objects.all()
    serializer_class = HallTicketSerializer

class HallTicketDetailView(BaseRetrieveUpdateDestroyView):
    queryset = HallTicket.objects.all()
    serializer_class = HallTicketSerializer

class ResultListCreateView(BaseListCreateView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class ResultDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Result.objects.all()
    serializer_class = ResultSerializer

class ReportCardListCreateView(BaseListCreateView):
    queryset = ReportCard.objects.all()
    serializer_class = ReportCardSerializer

class ReportCardDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ReportCard.objects.all()
    serializer_class = ReportCardSerializer

class OMREvaluationListCreateView(BaseListCreateView):
    queryset = OMREvaluation.objects.all()
    serializer_class = OMREvaluationSerializer

class OMREvaluationDetailView(BaseRetrieveUpdateDestroyView):
    queryset = OMREvaluation.objects.all()
    serializer_class = OMREvaluationSerializer

class CertificateListCreateView(BaseListCreateView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

class CertificateDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Certificate.objects.all()
    serializer_class = CertificateSerializer

