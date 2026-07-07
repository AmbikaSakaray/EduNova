from rest_framework import serializers
from .models import Exam, ExamSchedule, Mark

class ExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = Exam
        fields = '__all__'

class ExamScheduleSerializer(serializers.ModelSerializer):
    subject_name = serializers.CharField(source='subject.name', read_only=True)
    classroom_name = serializers.CharField(source='classroom.name', read_only=True)

    class Meta:
        model = ExamSchedule
        fields = ('id', 'exam', 'subject', 'subject_name', 'classroom', 'classroom_name', 'date', 'start_time', 'end_time')

class MarkSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.first_name', read_only=True)
    subject_name = serializers.CharField(source='exam_schedule.subject.name', read_only=True)

    class Meta:
        model = Mark
        fields = ('id', 'student', 'student_name', 'exam_schedule', 'subject_name', 'marks_obtained', 'max_marks', 'grade', 'remarks')
        read_only_fields = ('id', 'grade')


from .models import (
    QuestionBank, OnlineExam, OnlineExamQuestion, ExamAttempt, ExamAnswer,
    HallTicket, Result, ReportCard, OMREvaluation, Certificate
)

class QuestionBankSerializer(serializers.ModelSerializer):
    class Meta:
        model = QuestionBank
        fields = '__all__'

class OnlineExamSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineExam
        fields = '__all__'

class OnlineExamQuestionSerializer(serializers.ModelSerializer):
    class Meta:
        model = OnlineExamQuestion
        fields = '__all__'

class ExamAttemptSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamAttempt
        fields = '__all__'

class ExamAnswerSerializer(serializers.ModelSerializer):
    class Meta:
        model = ExamAnswer
        fields = '__all__'

class HallTicketSerializer(serializers.ModelSerializer):
    class Meta:
        model = HallTicket
        fields = '__all__'

class ResultSerializer(serializers.ModelSerializer):
    class Meta:
        model = Result
        fields = '__all__'

class ReportCardSerializer(serializers.ModelSerializer):
    class Meta:
        model = ReportCard
        fields = '__all__'

class OMREvaluationSerializer(serializers.ModelSerializer):
    class Meta:
        model = OMREvaluation
        fields = '__all__'

class CertificateSerializer(serializers.ModelSerializer):
    class Meta:
        model = Certificate
        fields = '__all__'

