from django.db import models
from apps.core.models import AbstractAuditModel
from django.conf import settings
from apps.students.models import Student

class FeeStructure(AbstractAuditModel):
    name = models.CharField(max_length=100) # e.g. "Grade 10 - Annual Fees"
    academic_year = models.CharField(max_length=20) # e.g. "2026-2027"
    classroom = models.ForeignKey('academics.ClassRoom', on_delete=models.SET_NULL, null=True, blank=True, related_name='fee_structures')
    tuition_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    transport_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    hostel_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    lab_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    library_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    other_fee = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    total_amount = models.DecimalField(max_digits=12, decimal_places=2)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'fee_structures'

    def __str__(self):
        return f"{self.name} ({self.academic_year})"

class Installment(AbstractAuditModel):
    fee_structure = models.ForeignKey(FeeStructure, on_delete=models.CASCADE, related_name='installments')
    name = models.CharField(max_length=50) # e.g. "Term 1", "Term 2"
    amount = models.DecimalField(max_digits=12, decimal_places=2)
    due_date = models.DateField()
    grace_period_days = models.IntegerField(default=5)
    late_fee_rate_per_day = models.DecimalField(max_digits=8, decimal_places=2, default=50.00) # Daily fine flat rate

    class Meta:
        db_table = 'fee_installments'

    def __str__(self):
        return f"{self.fee_structure.name} - {self.name} (Due: {self.due_date})"

class Invoice(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Unpaid', 'Unpaid'),
        ('Partially Paid', 'Partially Paid'),
        ('Paid', 'Paid'),
        ('Cancelled', 'Cancelled'),
        ('Overdue', 'Overdue'),
    )

    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='invoices')
    installment = models.ForeignKey(Installment, on_delete=models.CASCADE, related_name='invoices')
    amount_due = models.DecimalField(max_digits=12, decimal_places=2)
    late_fee_accumulated = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    discount_amount = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    invoice_number = models.CharField(max_length=60, unique=True, blank=True, null=True)
    issued_at = models.DateTimeField(auto_now_add=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Unpaid')

    class Meta:
        db_table = 'fee_invoices'
        unique_together = ('student', 'installment')

    def __str__(self):
        return f"Invoice for {self.student.first_name} - {self.installment.name} (Status: {self.status})"

class FeePayment(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Success', 'Success'),
        ('Pending', 'Pending'),
        ('Failed', 'Failed'),
        ('Refunded', 'Refunded'),
    )

    invoice = models.ForeignKey(Invoice, on_delete=models.CASCADE, related_name='payments')
    amount_paid = models.DecimalField(max_digits=12, decimal_places=2)
    payment_date = models.DateTimeField(auto_now_add=True)
    transaction_reference = models.CharField(max_length=100, unique=True)
    payment_method = models.CharField(max_length=30) # e.g. "Card", "UPI", "NetBanking"
    gateway = models.CharField(max_length=20, default='stripe') # stripe, razorpay
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Pending')
    receipt_url = models.TextField(blank=True, null=True)
    gateway_payload = models.JSONField(default=dict, blank=True)

    class Meta:
        db_table = 'fee_payments'

    def __str__(self):
        return f"Payment {self.transaction_reference} - {self.status}"


class Scholarship(AbstractAuditModel):
    DISCOUNT_TYPE_CHOICES = (('Percentage', 'Percentage'), ('Fixed', 'Fixed'))
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    discount_type = models.CharField(max_length=20, choices=DISCOUNT_TYPE_CHOICES, default='Percentage')
    discount_value = models.DecimalField(max_digits=12, decimal_places=2)
    eligibility_criteria = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'scholarships'

    def __str__(self):
        return self.name


class StudentScholarship(AbstractAuditModel):
    STATUS_CHOICES = (('Pending', 'Pending'), ('Approved', 'Approved'), ('Rejected', 'Rejected'), ('Revoked', 'Revoked'))
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='scholarships')
    scholarship = models.ForeignKey(Scholarship, on_delete=models.PROTECT, related_name='student_scholarships')
    academic_year = models.CharField(max_length=20)
    approved_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='scholarships_approved')
    approved_at = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Pending')

    class Meta:
        db_table = 'student_scholarships'
        unique_together = ('student', 'scholarship', 'academic_year')

    def __str__(self):
        return f"{self.student} - {self.scholarship}"
