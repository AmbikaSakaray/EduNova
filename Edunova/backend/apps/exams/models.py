from django.db import models
from django.conf import settings
from apps.core.models import AbstractAuditModel
from apps.students.models import Student
from apps.academics.models import ClassRoom, Subject

class Exam(AbstractAuditModel):
    EXAM_TYPE_CHOICES = (
        ('Online', 'Online'), ('Offline', 'Offline'), ('Hybrid', 'Hybrid'), ('OMR', 'OMR'), ('Practical', 'Practical'),
    )
    STATUS_CHOICES = (
        ('Draft', 'Draft'), ('Scheduled', 'Scheduled'), ('Published', 'Published'),
        ('Completed', 'Completed'), ('Cancelled', 'Cancelled'),
    )
    name = models.CharField(max_length=100) # e.g. "Term 1 Final Examination"
    term = models.CharField(max_length=50) # e.g. "Term 1"
    academic_year = models.CharField(max_length=20) # e.g. "2026-2027"
    exam_type = models.CharField(max_length=40, choices=EXAM_TYPE_CHOICES, default='Offline')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Draft')
    instructions = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'exams'

    def __str__(self):
        return f"{self.name} ({self.academic_year})"

class ExamSchedule(AbstractAuditModel):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='schedules')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE)
    section = models.ForeignKey('academics.Section', on_delete=models.SET_NULL, null=True, blank=True, related_name='exam_schedules')
    date = models.DateField()
    start_time = models.TimeField()
    end_time = models.TimeField()
    max_marks = models.DecimalField(max_digits=6, decimal_places=2, default=100.00)
    passing_marks = models.DecimalField(max_digits=6, decimal_places=2, default=35.00, blank=True, null=True)
    room_number = models.CharField(max_length=40, blank=True, null=True)

    class Meta:
        db_table = 'exam_schedules'

    def __str__(self):
        return f"{self.exam.name} - {self.subject.name} on {self.date}"

class Mark(AbstractAuditModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='marks')
    exam_schedule = models.ForeignKey(ExamSchedule, on_delete=models.CASCADE, related_name='marks')
    marks_obtained = models.DecimalField(max_digits=5, decimal_places=2)
    max_marks = models.DecimalField(max_digits=5, decimal_places=2, default=100.00)
    grade = models.CharField(max_length=10, blank=True, null=True)
    remarks = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'marks'
        unique_together = ('student', 'exam_schedule')

    def save(self, *args, **kwargs):
        # Auto calculate Grade based on standard percentage
        percentage = (self.marks_obtained / self.max_marks) * 100
        if percentage >= 90:
            self.grade = 'A+'
        elif percentage >= 80:
            self.grade = 'A'
        elif percentage >= 70:
            self.grade = 'B'
        elif percentage >= 60:
            self.grade = 'C'
        elif percentage >= 50:
            self.grade = 'D'
        else:
            self.grade = 'F'
        super().save(*args, **kwargs)

    def __str__(self):
        return f"{self.student.first_name} - {self.exam_schedule.subject.name}: {self.marks_obtained}/{self.max_marks} ({self.grade})"


class QuestionBank(AbstractAuditModel):
    QUESTION_TYPE_CHOICES = (
        ('MCQ', 'MCQ'), ('Short Answer', 'Short Answer'), ('Long Answer', 'Long Answer'),
        ('True/False', 'True/False'), ('Fill Blank', 'Fill Blank'), ('Practical', 'Practical'), ('Other', 'Other'),
    )
    DIFFICULTY_CHOICES = (('Easy', 'Easy'), ('Medium', 'Medium'), ('Hard', 'Hard'))
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='question_bank')
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='authored_questions')
    question_type = models.CharField(max_length=40, choices=QUESTION_TYPE_CHOICES, default='Short Answer')
    difficulty_level = models.CharField(max_length=20, choices=DIFFICULTY_CHOICES, default='Medium')
    question_text = models.TextField()
    options = models.JSONField(default=list, blank=True)
    correct_answer = models.TextField(blank=True, null=True)
    answer_schema = models.JSONField(default=dict, blank=True)
    marks = models.DecimalField(max_digits=6, decimal_places=2, default=1)
    tags = models.JSONField(default=list, blank=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'question_bank'

    def __str__(self):
        return self.question_text[:60]


class OnlineExam(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Draft', 'Draft'), ('Open', 'Open'), ('Closed', 'Closed'), ('Evaluated', 'Evaluated'), ('Cancelled', 'Cancelled'),
    )
    exam_schedule = models.OneToOneField(ExamSchedule, on_delete=models.CASCADE, related_name='online_exam')
    duration_minutes = models.IntegerField()
    opens_at = models.DateTimeField()
    closes_at = models.DateTimeField()
    randomize_questions = models.BooleanField(default=False)
    allow_review = models.BooleanField(default=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Draft')

    class Meta:
        db_table = 'online_exams'

    def __str__(self):
        return f"Online exam - {self.exam_schedule}"


class OnlineExamQuestion(AbstractAuditModel):
    online_exam = models.ForeignKey(OnlineExam, on_delete=models.CASCADE, related_name='questions')
    question = models.ForeignKey(QuestionBank, on_delete=models.PROTECT, related_name='online_exam_uses')
    sort_order = models.IntegerField(default=0)
    marks = models.DecimalField(max_digits=6, decimal_places=2, default=1)

    class Meta:
        db_table = 'online_exam_questions'
        unique_together = ('online_exam', 'question')


class ExamAttempt(AbstractAuditModel):
    STATUS_CHOICES = (
        ('In Progress', 'In Progress'), ('Submitted', 'Submitted'), ('Auto Submitted', 'Auto Submitted'),
        ('Evaluated', 'Evaluated'), ('Cancelled', 'Cancelled'),
    )
    online_exam = models.ForeignKey(OnlineExam, on_delete=models.CASCADE, related_name='attempts')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='exam_attempts')
    started_at = models.DateTimeField(auto_now_add=True)
    submitted_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='In Progress')
    total_score = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'exam_attempts'
        unique_together = ('online_exam', 'student')

    def __str__(self):
        return f"{self.student} - {self.online_exam}"


class ExamAnswer(AbstractAuditModel):
    attempt = models.ForeignKey(ExamAttempt, on_delete=models.CASCADE, related_name='answers')
    question = models.ForeignKey(QuestionBank, on_delete=models.PROTECT, related_name='student_answers')
    answer_text = models.TextField(blank=True, null=True)
    is_correct = models.BooleanField(blank=True, null=True)
    marks_obtained = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)

    class Meta:
        db_table = 'exam_answers'
        unique_together = ('attempt', 'question')


class HallTicket(AbstractAuditModel):
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='hall_tickets')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='hall_tickets')
    ticket_number = models.CharField(max_length=60, unique=True)
    file_url = models.TextField(blank=True, null=True)
    issued_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'hall_tickets'
        unique_together = ('exam', 'student')

    def __str__(self):
        return self.ticket_number


class Result(AbstractAuditModel):
    STATUS_CHOICES = (('Pass', 'Pass'), ('Fail', 'Fail'), ('Withheld', 'Withheld'))
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='results')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='results')
    total_marks_obtained = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    total_max_marks = models.DecimalField(max_digits=8, decimal_places=2, default=0)
    percentage = models.DecimalField(max_digits=5, decimal_places=2, blank=True, null=True)
    grade = models.CharField(max_length=10, blank=True, null=True)
    rank = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pass')

    class Meta:
        db_table = 'results'
        unique_together = ('student', 'exam')

    def __str__(self):
        return f"{self.student} - {self.exam} ({self.status})"


class ReportCard(AbstractAuditModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='report_cards')
    exam = models.ForeignKey(Exam, on_delete=models.CASCADE, related_name='report_cards')
    file_url = models.TextField(blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)
    generated_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'report_cards'
        unique_together = ('student', 'exam')

    def __str__(self):
        return f"Report card - {self.student} - {self.exam}"


class OMREvaluation(AbstractAuditModel):
    exam_schedule = models.ForeignKey(ExamSchedule, on_delete=models.CASCADE, related_name='omr_evaluations')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='omr_evaluations')
    sheet_image_url = models.TextField(blank=True, null=True)
    detected_answers = models.JSONField(default=dict, blank=True)
    score = models.DecimalField(max_digits=8, decimal_places=2, blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    class Meta:
        db_table = 'omr_evaluations'
        unique_together = ('exam_schedule', 'student')


class Certificate(AbstractAuditModel):
    CERT_TYPE_CHOICES = (
        ('Bonafide', 'Bonafide'), ('Transfer', 'Transfer'), ('Character', 'Character'),
        ('Merit', 'Merit'), ('Participation', 'Participation'), ('Completion', 'Completion'), ('Other', 'Other'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='certificates')
    certificate_type = models.CharField(max_length=40, choices=CERT_TYPE_CHOICES, default='Other')
    title = models.CharField(max_length=200, blank=True, null=True)
    file_url = models.TextField(blank=True, null=True)
    issued_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='certificates_issued')
    issued_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'certificates'

    def __str__(self):
        return f"{self.certificate_type} - {self.student}"
