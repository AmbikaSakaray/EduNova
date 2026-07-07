from django.db import models
from django.conf import settings
from apps.core.models import AbstractAuditModel
from apps.students.models import Student
from apps.academics.models import Subject

class Course(AbstractAuditModel):
    name = models.CharField(max_length=150) # e.g. "Intro to Algebra"
    description = models.TextField(blank=True, null=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='courses')

    class Meta:
        db_table = 'lms_courses'

    def __str__(self):
        return self.name

class Lesson(AbstractAuditModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='lessons')
    title = models.CharField(max_length=200)
    content = models.TextField(blank=True, null=True)
    video_url = models.CharField(max_length=255, blank=True, null=True) # AWS S3 asset

    class Meta:
        db_table = 'lms_lessons'

    def __str__(self):
        return f"{self.course.name} - {self.title}"

class Assignment(AbstractAuditModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='assignments')
    title = models.CharField(max_length=200)
    instructions = models.TextField(blank=True, null=True)
    due_date = models.DateTimeField()
    max_score = models.DecimalField(max_digits=5, decimal_places=2, default=100.00)

    class Meta:
        db_table = 'lms_assignments'

    def __str__(self):
        return f"{self.course.name} - {self.title}"

class Submission(AbstractAuditModel):
    assignment = models.ForeignKey(Assignment, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='submissions')
    submitted_at = models.DateTimeField(auto_now_add=True)
    file_url = models.CharField(max_length=255) # S3 uploaded assignment file path
    score_obtained = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    feedback = models.TextField(blank=True, null=True)
    is_late = models.BooleanField(default=False)

    class Meta:
        db_table = 'lms_submissions'
        unique_together = ('assignment', 'student')

    def save(self, *args, **kwargs):
        # Auto calculate if submission is late based on assignment due date
        # In Django models, auto_now_add saves on create, so we compare current timezone details
        from django.utils import timezone
        now = timezone.now()
        if now > self.assignment.due_date:
            self.is_late = True
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.first_name} - {self.assignment.title} (Late: {self.is_late})"


class Enrollment(AbstractAuditModel):
    STATUS_CHOICES = (('Active', 'Active'), ('Completed', 'Completed'), ('Dropped', 'Dropped'))
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='enrollments')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='lms_enrollments')
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')
    enrolled_at = models.DateTimeField(auto_now_add=True)
    completed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'lms_enrollments'
        unique_together = ('course', 'student')

    def __str__(self):
        return f"{self.student} -> {self.course}"


class Progress(AbstractAuditModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='lms_progress')
    lesson = models.ForeignKey(Lesson, on_delete=models.CASCADE, related_name='progress_records')
    is_completed = models.BooleanField(default=False)
    completion_percent = models.DecimalField(max_digits=5, decimal_places=2, default=0)
    last_accessed_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'lms_progress'
        unique_together = ('student', 'lesson')

    def __str__(self):
        return f"{self.student} - {self.lesson}"


class OnlineClass(AbstractAuditModel):
    STATUS_CHOICES = (('Scheduled', 'Scheduled'), ('Live', 'Live'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled'))
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='online_classes')
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='online_classes_taught')
    title = models.CharField(max_length=200)
    meeting_url = models.TextField(blank=True, null=True)
    scheduled_at = models.DateTimeField()
    duration_minutes = models.IntegerField(default=45)
    recording_url = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Scheduled')

    class Meta:
        db_table = 'lms_online_classes'

    def __str__(self):
        return self.title


class Quiz(AbstractAuditModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='quizzes')
    title = models.CharField(max_length=200)
    time_limit_minutes = models.IntegerField(blank=True, null=True)
    max_attempts = models.IntegerField(default=1)
    is_published = models.BooleanField(default=False)

    class Meta:
        db_table = 'lms_quizzes'

    def __str__(self):
        return self.title


class QuizQuestion(AbstractAuditModel):
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='questions')
    question_text = models.TextField()
    options = models.JSONField(default=list, blank=True)
    correct_answer = models.TextField(blank=True, null=True)
    marks = models.DecimalField(max_digits=6, decimal_places=2, default=1)
    sort_order = models.IntegerField(default=0)

    class Meta:
        db_table = 'lms_quiz_questions'


class QuizAttempt(AbstractAuditModel):
    STATUS_CHOICES = (('In Progress', 'In Progress'), ('Submitted', 'Submitted'), ('Evaluated', 'Evaluated'))
    quiz = models.ForeignKey(Quiz, on_delete=models.CASCADE, related_name='attempts')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='quiz_attempts')
    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(blank=True, null=True)
    score = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='In Progress')
    answers = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'lms_quiz_attempts'

    def __str__(self):
        return f"{self.student} - {self.quiz}"


class ForumTopic(AbstractAuditModel):
    course = models.ForeignKey(Course, on_delete=models.CASCADE, related_name='forum_topics')
    created_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='forum_topics_created')
    title = models.CharField(max_length=200)
    is_locked = models.BooleanField(default=False)

    class Meta:
        db_table = 'lms_forum_topics'

    def __str__(self):
        return self.title


class ForumPost(AbstractAuditModel):
    topic = models.ForeignKey(ForumTopic, on_delete=models.CASCADE, related_name='posts')
    author = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='forum_posts')
    content = models.TextField()

    class Meta:
        db_table = 'lms_forum_posts'

    def __str__(self):
        return f"{self.author} - {self.topic}"


class AITutorSession(AbstractAuditModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='ai_tutor_sessions')
    course = models.ForeignKey(Course, on_delete=models.SET_NULL, null=True, blank=True, related_name='ai_tutor_sessions')
    prompt = models.TextField()
    response = models.TextField(blank=True, null=True)
    model_used = models.CharField(max_length=80, blank=True, null=True)

    class Meta:
        db_table = 'ai_tutor_sessions'

    def __str__(self):
        return f"AI Tutor - {self.student}"
