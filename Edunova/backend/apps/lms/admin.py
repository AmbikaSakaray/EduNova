from django.contrib import admin
from .models import (
    Course, Lesson, Assignment, Submission, Enrollment, Progress, OnlineClass,
    Quiz, QuizQuestion, QuizAttempt, ForumTopic, ForumPost, AITutorSession
)

for m in [Course, Lesson, Assignment, Submission, Enrollment, Progress, OnlineClass,
          Quiz, QuizQuestion, QuizAttempt, ForumTopic, ForumPost, AITutorSession]:
    admin.site.register(m)
