from django.db import models
from django.conf import settings
from apps.core.models import AbstractAuditModel

class Employee(AbstractAuditModel):
    EMPLOYMENT_TYPE_CHOICES = (
        ('Full Time', 'Full Time'), ('Part Time', 'Part Time'), ('Contract', 'Contract'),
        ('Intern', 'Intern'), ('Temporary', 'Temporary'),
    )
    STATUS_CHOICES = (
        ('Active', 'Active'), ('Inactive', 'Inactive'), ('On Leave', 'On Leave'), ('Terminated', 'Terminated'),
    )
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='employee_profile')
    department = models.ForeignKey('tenants.Department', on_delete=models.SET_NULL, null=True, blank=True, related_name='employees')
    job_title = models.CharField(max_length=100) # e.g. "Senior Physics Teacher", "Registrar Clerk"
    designation = models.CharField(max_length=100, blank=True, null=True)
    joined_date = models.DateField()
    base_salary = models.DecimalField(max_digits=12, decimal_places=2)
    employee_code = models.CharField(max_length=50, unique=True, blank=True, null=True)
    employment_type = models.CharField(max_length=30, choices=EMPLOYMENT_TYPE_CHOICES, default='Full Time')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Active')
    documents_url = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'employees'

    def __str__(self):
        return f"{self.user.username} - {self.job_title}"

class LeaveRequest(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Pending', 'Pending'),
        ('Approved', 'Approved'),
        ('Rejected', 'Rejected'),
    )

    LEAVE_TYPES = (
        ('Sick', 'Sick Leave'),
        ('Casual', 'Casual Leave'),
        ('Maternity', 'Maternity Leave'),
        ('Sabbatical', 'Sabbatical'),
    )

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='leave_requests')
    leave_type = models.CharField(max_length=20, choices=LEAVE_TYPES)
    start_date = models.DateField()
    end_date = models.DateField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    reason = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'leave_requests'

    def __str__(self):
        return f"{self.employee.user.username} - {self.leave_type} ({self.status})"

class Payroll(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Paid', 'Paid'),
        ('Unpaid', 'Unpaid'),
    )

    employee = models.ForeignKey(Employee, on_delete=models.CASCADE, related_name='payrolls')
    month = models.CharField(max_length=7) # e.g. "2026-07"
    allowances = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    deductions = models.DecimalField(max_digits=10, decimal_places=2, default=0.00) # PF, Taxes
    net_salary = models.DecimalField(max_digits=12, decimal_places=2)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Unpaid')

    class Meta:
        db_table = 'payroll'
        unique_together = ('employee', 'month')

    def __str__(self):
        return f"{self.employee.user.username} - {self.month} (Net: {self.net_salary})"


class TeacherProfile(AbstractAuditModel):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='teacher_profile')
    employee = models.ForeignKey(Employee, on_delete=models.SET_NULL, null=True, blank=True, related_name='teacher_profile_set')
    qualification = models.CharField(max_length=200, blank=True, null=True)
    specialization = models.CharField(max_length=150, blank=True, null=True)
    experience_years = models.IntegerField(default=0)
    date_of_joining = models.DateField(blank=True, null=True)
    bio = models.TextField(blank=True, null=True)
    profile_image_url = models.TextField(blank=True, null=True)
    is_class_teacher = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'teacher_profiles'

    def __str__(self):
        return f"Teacher: {self.user}"
