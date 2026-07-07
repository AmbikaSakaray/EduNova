from django.db import models
from apps.core.models import AbstractAuditModel
from apps.students.models import Student
from django.conf import settings
from apps.academics.models import Section

class AttendanceRecord(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Present', 'Present'),
        ('Absent', 'Absent'),
        ('Late', 'Late'),
        ('Half Day', 'Half Day'),
        ('Leave', 'Leave'),
    )

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='attendance_records')
    section = models.ForeignKey(Section, on_delete=models.CASCADE, related_name='attendance_records')
    date = models.DateField(db_index=True)
    status = models.CharField(max_length=15, choices=STATUS_CHOICES, default='Present')
    marked_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='attendance_marked')
    remarks = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'attendance'
        unique_together = ('student', 'date')

    def __str__(self):
        return f"{self.student.first_name} on {self.date} - {self.status}"
