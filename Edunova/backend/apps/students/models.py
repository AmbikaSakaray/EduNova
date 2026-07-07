from django.db import models
from django.conf import settings
from apps.core.models import AbstractAuditModel

class Guardian(AbstractAuditModel):
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    email = models.EmailField(unique=True)
    phone_number = models.CharField(max_length=15)
    occupation = models.CharField(max_length=100, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    emergency_contact = models.CharField(max_length=20, blank=True, null=True)
    is_verified = models.BooleanField(default=False)
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='guardian_profile')

    class Meta:
        db_table = 'guardians'

    def __str__(self):
        return f"{self.first_name} {self.last_name}"

class Student(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Enrolled', 'Enrolled'),
        ('Withdrawn', 'Withdrawn'),
        ('Alumni', 'Alumni'),
        ('Suspended', 'Suspended'),
        ('Graduated', 'Graduated'),
    )

    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='student_profile')
    campus = models.ForeignKey('tenants.Campus', on_delete=models.SET_NULL, null=True, blank=True, related_name='students')
    first_name = models.CharField(max_length=50)
    last_name = models.CharField(max_length=50)
    date_of_birth = models.DateField()
    gender = models.CharField(max_length=10, blank=True, null=True)
    admission_no = models.CharField(max_length=30, unique=True)
    qr_id_code = models.CharField(max_length=120, unique=True, blank=True, null=True)
    blood_group = models.CharField(max_length=10, blank=True, null=True)
    photo_url = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Enrolled')
    admission_date = models.DateField(blank=True, null=True)
    previous_school = models.CharField(max_length=200, blank=True, null=True)
    medical_notes = models.TextField(blank=True, null=True)

    # Relationships
    guardians = models.ManyToManyField(
        Guardian,
        related_name='students',
        through='StudentGuardianMapping'
    )

    class Meta:
        db_table = 'students'

    def __str__(self):
        return f"{self.first_name} {self.last_name} ({self.admission_no})"

class StudentGuardianMapping(AbstractAuditModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE)
    guardian = models.ForeignKey(Guardian, on_delete=models.CASCADE)
    relationship_type = models.CharField(max_length=50, default='Father') # Father, Mother, Guardian

    class Meta:
        db_table = 'student_guardian_mappings'
        unique_together = ('student', 'guardian')


class Parent(AbstractAuditModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, null=True, blank=True, related_name='parent_profile')
    guardian = models.ForeignKey(Guardian, on_delete=models.SET_NULL, null=True, blank=True, related_name='parent_records')
    father_name = models.CharField(max_length=150, blank=True, null=True)
    mother_name = models.CharField(max_length=150, blank=True, null=True)
    father_profession = models.CharField(max_length=150, blank=True, null=True)
    mother_profession = models.CharField(max_length=150, blank=True, null=True)
    emergency_contact = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    class Meta:
        db_table = 'parents'

    def __str__(self):
        return self.father_name or self.mother_name or str(self.id)


class StudentDocument(AbstractAuditModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='documents')
    document_type = models.CharField(max_length=80)
    file_url = models.TextField()
    file_name = models.CharField(max_length=255, blank=True, null=True)
    mime_type = models.CharField(max_length=120, blank=True, null=True)
    verified_status = models.CharField(max_length=30, default='Pending')
    verified_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='verified_student_documents')
    verified_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'student_documents'

    def __str__(self):
        return f"{self.student} - {self.document_type}"


class StudentEnrollment(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Active', 'Active'), ('Promoted', 'Promoted'), ('Transferred', 'Transferred'),
        ('Withdrawn', 'Withdrawn'), ('Completed', 'Completed'),
    )
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='enrollments')
    classroom = models.ForeignKey('academics.ClassRoom', on_delete=models.PROTECT, related_name='enrollments')
    section = models.ForeignKey('academics.Section', on_delete=models.SET_NULL, null=True, blank=True, related_name='enrollments')
    academic_year = models.CharField(max_length=20)
    roll_number = models.IntegerField(blank=True, null=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Active')
    enrolled_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'student_enrollments'
        unique_together = ('student', 'academic_year')

    def __str__(self):
        return f"{self.student} - {self.academic_year}"


class AlumniRegistry(AbstractAuditModel):
    student = models.OneToOneField(Student, on_delete=models.CASCADE, related_name='alumni_record')
    graduation_year = models.CharField(max_length=10, blank=True, null=True)
    current_institution = models.CharField(max_length=200, blank=True, null=True)
    current_occupation = models.CharField(max_length=200, blank=True, null=True)
    contact_email = models.EmailField(blank=True, null=True)
    contact_phone = models.CharField(max_length=20, blank=True, null=True)
    achievements = models.TextField(blank=True, null=True)
    is_verified = models.BooleanField(default=False)

    class Meta:
        db_table = 'alumni_registry'

    def __str__(self):
        return f"Alumni: {self.student}"


class MedicalRecord(AbstractAuditModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='medical_records')
    condition = models.CharField(max_length=200, blank=True, null=True)
    allergies = models.TextField(blank=True, null=True)
    medications = models.TextField(blank=True, null=True)
    doctor_name = models.CharField(max_length=150, blank=True, null=True)
    doctor_contact = models.CharField(max_length=50, blank=True, null=True)
    last_checkup_date = models.DateField(blank=True, null=True)
    notes = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'medical_records'

    def __str__(self):
        return f"Medical record - {self.student}"
