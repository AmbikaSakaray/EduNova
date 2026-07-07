from django.db import models
from django_tenants.models import TenantMixin, DomainMixin
from apps.core.models import AbstractAuditModel

class Tenant(TenantMixin, AbstractAuditModel):
    company_name = models.CharField(max_length=150)
    subdomain = models.CharField(max_length=50, unique=True)
    status = models.CharField(max_length=20, default='Active') # Active/Suspended
    plan_type = models.CharField(max_length=20, default='Basic') # Basic/Premium

    # Set auto_drop_schema to True during development for quick schema drops
    auto_drop_schema = True
    auto_create_schema = True

    class Meta:
        db_table = 'tenants'

    def __str__(self):
        return f"{self.company_name} ({self.schema_name})"

class Domain(DomainMixin, AbstractAuditModel):
    class Meta:
        db_table = 'domains'

    def __str__(self):
        return self.domain


from django.conf import settings as dj_settings


class CompanyProfile(models.Model):
    legal_name = models.CharField(max_length=200, default='EduNova Global Academy Private Limited')
    brand_name = models.CharField(max_length=200, blank=True, null=True)
    tagline = models.CharField(max_length=255, default='Inspiring Minds. Building Futures.', blank=True, null=True)
    website_domain = models.CharField(max_length=255, blank=True, null=True)
    industry = models.JSONField(default=list, blank=True)
    company_type = models.CharField(max_length=120, blank=True, null=True)
    established_year = models.IntegerField(blank=True, null=True)
    headquarters = models.TextField(blank=True, null=True)
    student_strength = models.IntegerField(blank=True, null=True)
    staff_strength = models.IntegerField(blank=True, null=True)
    vision = models.TextField(blank=True, null=True)
    mission = models.TextField(blank=True, null=True)
    core_values = models.JSONField(default=list, blank=True)
    color_palette = models.JSONField(default=dict, blank=True)
    typography = models.JSONField(default=dict, blank=True)
    logo_concept = models.TextField(blank=True, null=True)
    brand_personality = models.JSONField(default=list, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'company_profile'

    def __str__(self):
        return self.legal_name


class Campus(AbstractAuditModel):
    name = models.CharField(max_length=150)
    code = models.CharField(max_length=30, unique=True, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    city = models.CharField(max_length=80, blank=True, null=True)
    state = models.CharField(max_length=80, blank=True, null=True)
    country = models.CharField(max_length=80, default='India')
    postal_code = models.CharField(max_length=20, blank=True, null=True)
    phone = models.CharField(max_length=20, blank=True, null=True)
    email = models.EmailField(blank=True, null=True)
    is_headquarters = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'campuses'

    def __str__(self):
        return self.name


class Department(AbstractAuditModel):
    DEPARTMENT_TYPE_CHOICES = (
        ('Academic', 'Academic'), ('Administration', 'Administration'), ('Finance', 'Finance'),
        ('Accounts', 'Accounts'), ('Human Resources', 'Human Resources'), ('IT', 'IT'),
        ('Examination', 'Examination'), ('Sports', 'Sports'), ('Hostel', 'Hostel'),
        ('Medical', 'Medical'), ('Research', 'Research'), ('Innovation', 'Innovation'),
        ('Library', 'Library'), ('Transport', 'Transport'), ('Other', 'Other'),
    )
    campus = models.ForeignKey(Campus, on_delete=models.SET_NULL, null=True, blank=True, related_name='departments')
    name = models.CharField(max_length=120)
    code = models.CharField(max_length=30, unique=True, blank=True, null=True)
    department_type = models.CharField(max_length=60, choices=DEPARTMENT_TYPE_CHOICES, default='Academic')
    description = models.TextField(blank=True, null=True)
    head_user = models.ForeignKey(dj_settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='departments_headed')
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'departments'

    def __str__(self):
        return self.name
