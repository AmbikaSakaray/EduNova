from django.db import models
from django.conf import settings
from django.contrib.auth.models import AbstractUser
from apps.core.models import AbstractAuditModel

class User(AbstractUser, AbstractAuditModel):
    ROLE_CHOICES = (
        ('Super Admin', 'Super Admin'),
        ('School Admin', 'School Admin'),
        ('Principal', 'Principal'),
        ('Vice Principal', 'Vice Principal'),
        ('Teacher', 'Teacher'),
        ('Student', 'Student'),
        ('Parent', 'Parent'),
        ('Accountant', 'Accountant'),
        ('HR Manager', 'HR Manager'),
    )

    role = models.CharField(max_length=20, choices=ROLE_CHOICES, default='Student')
    phone_number = models.CharField(max_length=15, blank=True, null=True)
    is_otp_verified = models.BooleanField(default=False)

    # Security / RBAC fields required by the client requirements schema
    otp_secret = models.CharField(max_length=255, blank=True, null=True)
    password_policy_version = models.IntegerField(default=1)
    last_password_change = models.DateTimeField(blank=True, null=True)
    failed_login_attempts = models.IntegerField(default=0)
    locked_until = models.DateTimeField(blank=True, null=True)
    profile_photo_url = models.TextField(blank=True, null=True)

    # Resolve reverse conflicts by custom related_name overrides
    groups = models.ManyToManyField(
        'auth.Group',
        related_name='custom_user_groups',
        blank=True,
        help_text='The groups this user belongs to.',
        verbose_name='groups',
    )
    user_permissions = models.ManyToManyField(
        'auth.Permission',
        related_name='custom_user_permissions',
        blank=True,
        help_text='Specific permissions for this user.',
        verbose_name='user permissions',
    )

    class Meta:
        db_table = 'users'

    def __str__(self):
        return f"{self.username} ({self.role})"


import uuid as _uuid


class Role(AbstractAuditModel):
    """Application-level RBAC role, additional to the coarse `User.role` field."""
    name = models.CharField(max_length=80, unique=True)
    description = models.TextField(blank=True, null=True)
    is_system = models.BooleanField(default=False)

    class Meta:
        db_table = 'roles'

    def __str__(self):
        return self.name


class Permission(models.Model):
    id = models.UUIDField(primary_key=True, default=_uuid.uuid4, editable=False)
    module = models.CharField(max_length=80)
    action = models.CharField(max_length=80)
    description = models.TextField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'permissions'
        unique_together = ('module', 'action')

    def __str__(self):
        return f"{self.module}:{self.action}"


class UserRole(models.Model):
    user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='assigned_roles')
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='user_assignments')
    assigned_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='roles_assigned_by_me')
    assigned_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'user_roles'
        unique_together = ('user', 'role')

    def __str__(self):
        return f"{self.user} - {self.role}"


class RolePermission(models.Model):
    role = models.ForeignKey(Role, on_delete=models.CASCADE, related_name='role_permissions')
    permission = models.ForeignKey(Permission, on_delete=models.CASCADE, related_name='permission_roles')

    class Meta:
        db_table = 'role_permissions'
        unique_together = ('role', 'permission')

    def __str__(self):
        return f"{self.role} - {self.permission}"
