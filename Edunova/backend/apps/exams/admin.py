from django.contrib import admin
from .models import (
    Exam, ExamSchedule, Mark, QuestionBank, OnlineExam, OnlineExamQuestion,
    ExamAttempt, ExamAnswer, HallTicket, Result, ReportCard, OMREvaluation, Certificate
)

for m in [Exam, ExamSchedule, Mark, QuestionBank, OnlineExam, OnlineExamQuestion,
          ExamAttempt, ExamAnswer, HallTicket, Result, ReportCard, OMREvaluation, Certificate]:
    admin.site.register(m)
