from django.db import models
from django.conf import settings
from apps.core.models import AbstractAuditModel

class AcademicProgram(AbstractAuditModel):
    name = models.CharField(max_length=120)
    code = models.CharField(max_length=40, unique=True, blank=True, null=True)
    program_level = models.CharField(max_length=60)
    curriculum = models.CharField(max_length=80, blank=True, null=True)
    description = models.TextField(blank=True, null=True)
    min_age = models.IntegerField(blank=True, null=True)
    max_age = models.IntegerField(blank=True, null=True)
    duration_years = models.DecimalField(max_digits=4, decimal_places=1, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'academic_programs'

    def __str__(self):
        return self.name


class ClassRoom(AbstractAuditModel):
    program = models.ForeignKey(AcademicProgram, on_delete=models.SET_NULL, null=True, blank=True, related_name='classes')
    name = models.CharField(max_length=50) # e.g. "Class 10"
    code = models.CharField(max_length=20, unique=True) # e.g. "C10"
    curriculum = models.CharField(max_length=80, blank=True, null=True)
    academic_year = models.CharField(max_length=20, blank=True, null=True)
    class_order = models.IntegerField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'classes'

    def __str__(self):
        return self.name

class Section(AbstractAuditModel):
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE, related_name='sections')
    name = models.CharField(max_length=10) # e.g. "A", "B"
    room_number = models.CharField(max_length=20, blank=True, null=True)
    class_teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='class_teacher_sections')
    capacity = models.IntegerField(blank=True, null=True)

    class Meta:
        db_table = 'sections'
        unique_together = ('classroom', 'name')

    def __str__(self):
        return f"{self.classroom.name} - Section {self.name}"

class Subject(AbstractAuditModel):
    SUBJECT_TYPE_CHOICES = (
        ('Core', 'Core'), ('Elective', 'Elective'), ('Language', 'Language'),
        ('Lab', 'Lab'), ('Activity', 'Activity'), ('Skill', 'Skill'), ('Other', 'Other'),
    )
    name = models.CharField(max_length=100) # e.g. "Mathematics"
    code = models.CharField(max_length=20, unique=True) # e.g. "MATH101"
    subject_type = models.CharField(max_length=40, choices=SUBJECT_TYPE_CHOICES, default='Core')
    description = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'subjects'

    def __str__(self):
        return self.name

class Timetable(AbstractAuditModel):
    DAYS_OF_WEEK = (
        ('Monday', 'Monday'),
        ('Tuesday', 'Tuesday'),
        ('Wednesday', 'Wednesday'),
        ('Thursday', 'Thursday'),
        ('Friday', 'Friday'),
        ('Saturday', 'Saturday'),
        ('Sunday', 'Sunday'),
    )

    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='timetables')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE)
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, limit_choices_to={'role': 'Teacher'})
    day_of_week = models.CharField(max_length=15, choices=DAYS_OF_WEEK)
    
    # Period timings
    period_start = models.TimeField()
    period_end = models.TimeField()

    room_number = models.CharField(max_length=20, blank=True, null=True)

    class Meta:
        db_table = 'timetables'

    def __str__(self):
        return f"{self.day_of_week} ({self.period_start}-{self.period_end}) - {self.subject.name} by {self.teacher.username}"


class AcademicAllocation(AbstractAuditModel):
    """Teacher <-> subject <-> class/section allocation for a given academic year."""
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE, related_name='allocations')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='allocations', null=True, blank=True)
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='allocations')
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='subject_allocations')
    academic_year = models.CharField(max_length=20)

    class Meta:
        db_table = 'academic_allocations'
        unique_together = ('classroom', 'section', 'subject', 'teacher', 'academic_year')

    def __str__(self):
        return f"{self.classroom} / {self.subject} - {self.teacher}"


class Homework(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Draft', 'Draft'), ('Published', 'Published'), ('Closed', 'Closed'), ('Archived', 'Archived'),
    )
    classroom = models.ForeignKey(ClassRoom, on_delete=models.CASCADE, related_name='homework_set')
    section = models.ForeignKey(Section, on_delete=models.SET_NULL, null=True, blank=True, related_name='homework_set')
    subject = models.ForeignKey(Subject, on_delete=models.CASCADE, related_name='homework_set')
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.PROTECT, related_name='homework_assigned')
    title = models.CharField(max_length=200)
    description = models.TextField()
    attachment_url = models.CharField(max_length=255, blank=True, null=True)
    assigned_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Published')

    class Meta:
        db_table = 'homework'

    def __str__(self):
        return f"{self.title} ({self.classroom})"


class HomeworkSubmission(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Submitted', 'Submitted'), ('Late', 'Late'), ('Reviewed', 'Reviewed'), ('Returned', 'Returned'),
    )
    homework = models.ForeignKey(Homework, on_delete=models.CASCADE, related_name='submissions')
    student = models.ForeignKey('students.Student', on_delete=models.CASCADE, related_name='homework_submissions')
    submission_text = models.TextField(blank=True, null=True)
    file_url = models.CharField(max_length=255, blank=True, null=True)
    submitted_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Submitted')
    marks_obtained = models.DecimalField(max_digits=6, decimal_places=2, blank=True, null=True)
    teacher_feedback = models.TextField(blank=True, null=True)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='homework_reviews')
    reviewed_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'homework_submissions'
        unique_together = ('homework', 'student')

    def __str__(self):
        return f"{self.student} - {self.homework.title}"
