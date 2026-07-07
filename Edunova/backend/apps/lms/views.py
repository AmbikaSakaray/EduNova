from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.core.permissions import RoleBasedAccessControl
from .models import Course, Lesson, Assignment, Submission
from .serializers import CourseSerializer, LessonSerializer, AssignmentSerializer, SubmissionSerializer

class CourseListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'lms'

    def get(self, request):
        courses = Course.objects.filter(deleted_at__isnull=True)
        serializer = CourseSerializer(courses, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = CourseSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LessonListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'lms'

    def get(self, request):
        lessons = Lesson.objects.filter(deleted_at__isnull=True)
        serializer = LessonSerializer(lessons, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = LessonSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class AssignmentListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'lms'

    def get(self, request):
        assignments = Assignment.objects.filter(deleted_at__isnull=True)
        serializer = AssignmentSerializer(assignments, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = AssignmentSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubmissionListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'lms'

    def get(self, request):
        submissions = Submission.objects.filter(deleted_at__isnull=True)
        serializer = SubmissionSerializer(submissions, many=True)
        return Response(serializer.data)

    def post(self, request):
        # Allow students to upload homework documents (Rule US-025)
        serializer = SubmissionSerializer(data=request.data)
        if serializer.is_valid():
            submission = serializer.save()
            return Response({
                "status": "success",
                "message": "Assignment submitted successfully.",
                "submission_id": str(submission.id),
                "is_late": submission.is_late
            }, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class SubmissionGradeView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'lms'

    def post(self, request, pk):
        score = request.data.get('score')
        feedback = request.data.get('feedback', '')

        try:
            submission = Submission.objects.get(pk=pk, deleted_at__isnull=True)
        except Submission.DoesNotExist:
            return Response({"error": "Submission record not found"}, status=status.HTTP_404_NOT_FOUND)

        if score is None or float(score) > float(submission.assignment.max_score):
            return Response({"error": f"Score must be between 0 and {submission.assignment.max_score}."}, status=status.HTTP_400_BAD_REQUEST)

        submission.score_obtained = score
        submission.feedback = feedback
        submission.save(update_fields=['score_obtained', 'feedback', 'updated_at'])

        return Response({
            "status": "success",
            "message": "Submission graded successfully."
        })


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import Enrollment, Progress, OnlineClass, Quiz, QuizQuestion, QuizAttempt, ForumTopic, ForumPost, AITutorSession
from .serializers import (
    EnrollmentSerializer, ProgressSerializer, OnlineClassSerializer, QuizSerializer,
    QuizQuestionSerializer, QuizAttemptSerializer, ForumTopicSerializer, ForumPostSerializer, AITutorSessionSerializer
)

class CourseDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Course.objects.all()
    serializer_class = CourseSerializer

class LessonDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Lesson.objects.all()
    serializer_class = LessonSerializer

class AssignmentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Assignment.objects.all()
    serializer_class = AssignmentSerializer

class SubmissionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Submission.objects.all()
    serializer_class = SubmissionSerializer

class EnrollmentListCreateView(BaseListCreateView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class EnrollmentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Enrollment.objects.all()
    serializer_class = EnrollmentSerializer

class ProgressListCreateView(BaseListCreateView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

class ProgressDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Progress.objects.all()
    serializer_class = ProgressSerializer

class OnlineClassListCreateView(BaseListCreateView):
    queryset = OnlineClass.objects.all()
    serializer_class = OnlineClassSerializer

class OnlineClassDetailView(BaseRetrieveUpdateDestroyView):
    queryset = OnlineClass.objects.all()
    serializer_class = OnlineClassSerializer

class QuizListCreateView(BaseListCreateView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Quiz.objects.all()
    serializer_class = QuizSerializer

class QuizQuestionListCreateView(BaseListCreateView):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer

class QuizQuestionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = QuizQuestion.objects.all()
    serializer_class = QuizQuestionSerializer

class QuizAttemptListCreateView(BaseListCreateView):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer

class QuizAttemptDetailView(BaseRetrieveUpdateDestroyView):
    queryset = QuizAttempt.objects.all()
    serializer_class = QuizAttemptSerializer

class ForumTopicListCreateView(BaseListCreateView):
    queryset = ForumTopic.objects.all()
    serializer_class = ForumTopicSerializer

class ForumTopicDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ForumTopic.objects.all()
    serializer_class = ForumTopicSerializer

class ForumPostListCreateView(BaseListCreateView):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer

class ForumPostDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ForumPost.objects.all()
    serializer_class = ForumPostSerializer

class AITutorSessionListCreateView(BaseListCreateView):
    queryset = AITutorSession.objects.all()
    serializer_class = AITutorSessionSerializer

class AITutorSessionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = AITutorSession.objects.all()
    serializer_class = AITutorSessionSerializer

