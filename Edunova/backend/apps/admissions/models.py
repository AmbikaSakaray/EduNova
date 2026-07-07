from django.db import models
from django.conf import settings
from apps.core.models import AbstractAuditModel


class Admission(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Draft', 'Draft'), ('Submitted', 'Submitted'), ('Under Review', 'Under Review'),
        ('Shortlisted', 'Shortlisted'), ('Approved', 'Approved'), ('Rejected', 'Rejected'),
        ('Waitlisted', 'Waitlisted'), ('Converted', 'Converted'),
    )
    registration_number = models.CharField(max_length=50, unique=True)
    applicant_first_name = models.CharField(max_length=80)
    applicant_last_name = models.CharField(max_length=80, blank=True, null=True)
    date_of_birth = models.DateField(blank=True, null=True)
    gender = models.CharField(max_length=20, blank=True, null=True)
    target_class = models.ForeignKey('academics.ClassRoom', on_delete=models.PROTECT, null=True, blank=True, related_name='admission_applications')
    target_program = models.ForeignKey('academics.AcademicProgram', on_delete=models.SET_NULL, null=True, blank=True, related_name='admission_applications')
    parent_name = models.CharField(max_length=180, blank=True, null=True)
    parent_phone = models.CharField(max_length=20)
    parent_email = models.EmailField(blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    previous_school = models.CharField(max_length=200, blank=True, null=True)
    scholarship_applied = models.BooleanField(default=False)
    admission_source = models.CharField(max_length=80, blank=True, null=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Submitted')
    remarks = models.TextField(blank=True, null=True)
    submitted_at = models.DateTimeField(blank=True, null=True)
    reviewed_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='admissions_reviewed')
    reviewed_at = models.DateTimeField(blank=True, null=True)
    converted_student = models.ForeignKey('students.Student', on_delete=models.SET_NULL, null=True, blank=True, related_name='admission_record')

    class Meta:
        db_table = 'admissions'

    def __str__(self):
        return f"{self.registration_number} - {self.applicant_first_name}"


class AdmissionDocument(AbstractAuditModel):
    VERIFIED_STATUS_CHOICES = (('Pending', 'Pending'), ('Verified', 'Verified'), ('Rejected', 'Rejected'))
    admission = models.ForeignKey(Admission, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=80)
    file_url = models.TextField()
    file_name = models.CharField(max_length=255, blank=True, null=True)
    mime_type = models.CharField(max_length=120, blank=True, null=True)
    verified_status = models.CharField(max_length=30, choices=VERIFIED_STATUS_CHOICES, default='Pending')
    verified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='admission_documents_verified')
    verified_at = models.DateTimeField(blank=True, null=True)
    remarks = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'admission_documents'

    def __str__(self):
        return f"{self.admission} - {self.document_type}"
