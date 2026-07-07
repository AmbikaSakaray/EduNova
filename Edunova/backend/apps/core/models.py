import uuid
from django.db import models
from django.utils import timezone

class AbstractAuditModel(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    created_at = models.DateTimeField(default=timezone.now, db_index=True)
    updated_at = models.DateTimeField(auto_now=True)
    deleted_at = models.DateTimeField(null=True, blank=True, db_index=True)

    class Meta:
        abstract = True

    def soft_delete(self):
        """Perform soft delete by setting deleted_at timestamp"""
        self.deleted_at = timezone.now()
        self.save(update_fields=['deleted_at', 'updated_at'])

    def restore(self):
        """Restore a soft-deleted record"""
        self.deleted_at = None
        self.save(update_fields=['deleted_at', 'updated_at'])


# ---------------------------------------------------------------------------
# Cross-cutting / system tables added to match the client requirements schema
# (settings, notifications, notices, messages, audit, reporting, jobs, backups)
# ---------------------------------------------------------------------------
from django.conf import settings as dj_settings


class Notification(AbstractAuditModel):
    CHANNEL_CHOICES = (
        ('In-App', 'In-App'), ('Email', 'Email'), ('SMS', 'SMS'), ('Push', 'Push'),
    )
    recipient = models.ForeignKey(dj_settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='notifications')
    title = models.CharField(max_length=200)
    body = models.TextField(blank=True, null=True)
    channel = models.CharField(max_length=20, choices=CHANNEL_CHOICES, default='In-App')
    is_read = models.BooleanField(default=False)
    read_at = models.DateTimeField(blank=True, null=True)
    link_url = models.CharField(max_length=255, blank=True, null=True)

    class Meta:
        db_table = 'notifications'

    def __str__(self):
        return f"{self.title} -> {self.recipient}"


class Message(AbstractAuditModel):
    sender = models.ForeignKey(dj_settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='sent_messages')
    recipient = models.ForeignKey(dj_settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='received_messages')
    subject = models.CharField(max_length=200, blank=True, null=True)
    body = models.TextField()
    is_read = models.BooleanField(default=False)
    sent_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'messages'

    def __str__(self):
        return f"{self.sender} -> {self.recipient}: {self.subject}"


class Notice(AbstractAuditModel):
    AUDIENCE_CHOICES = (
        ('All', 'All'), ('Students', 'Students'), ('Parents', 'Parents'),
        ('Teachers', 'Teachers'), ('Staff', 'Staff'),
    )
    title = models.CharField(max_length=200)
    content = models.TextField()
    audience = models.CharField(max_length=20, choices=AUDIENCE_CHOICES, default='All')
    published_by = models.ForeignKey(dj_settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(blank=True, null=True)
    expires_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'notices'

    def __str__(self):
        return self.title


class AuditLog(models.Model):
    id = models.UUIDField(primary_key=True, default=__import__('uuid').uuid4, editable=False)
    actor = models.ForeignKey(dj_settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)
    event_type = models.CharField(max_length=20)
    endpoint = models.CharField(max_length=255)
    ip_address = models.CharField(max_length=50, blank=True, null=True)
    status_code = models.IntegerField(blank=True, null=True)
    payload = models.JSONField(default=dict, blank=True)
    created_at = models.DateTimeField(auto_now_add=True, db_index=True)

    class Meta:
        db_table = 'audit_logs'
        ordering = ['-created_at']

    def __str__(self):
        return f"{self.event_type} {self.endpoint} @ {self.created_at}"


class SystemSetting(models.Model):
    key = models.CharField(max_length=100, unique=True)
    value = models.JSONField(default=dict, blank=True)
    description = models.TextField(blank=True, null=True)
    updated_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'settings'

    def __str__(self):
        return self.key


class Report(AbstractAuditModel):
    name = models.CharField(max_length=150)
    report_type = models.CharField(max_length=60)
    parameters = models.JSONField(default=dict, blank=True)
    generated_by = models.ForeignKey(dj_settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True)

    class Meta:
        db_table = 'reports'

    def __str__(self):
        return self.name


class ReportExport(AbstractAuditModel):
    FORMAT_CHOICES = (('PDF', 'PDF'), ('CSV', 'CSV'), ('XLSX', 'XLSX'))
    report = models.ForeignKey(Report, on_delete=models.CASCADE, related_name='exports')
    file_format = models.CharField(max_length=10, choices=FORMAT_CHOICES, default='PDF')
    file_url = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, default='Pending')

    class Meta:
        db_table = 'report_exports'

    def __str__(self):
        return f"{self.report.name} ({self.file_format})"


class DashboardMetric(models.Model):
    metric_key = models.CharField(max_length=80, unique=True)
    metric_value = models.JSONField(default=dict, blank=True)
    computed_at = models.DateTimeField(auto_now=True)

    class Meta:
        db_table = 'dashboard_metrics'

    def __str__(self):
        return self.metric_key


class BackgroundJob(models.Model):
    STATUS_CHOICES = (
        ('Queued', 'Queued'), ('Running', 'Running'), ('Completed', 'Completed'), ('Failed', 'Failed'),
    )
    id = models.UUIDField(primary_key=True, default=__import__('uuid').uuid4, editable=False)
    job_name = models.CharField(max_length=150)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Queued')
    payload = models.JSONField(default=dict, blank=True)
    result = models.JSONField(default=dict, blank=True)
    started_at = models.DateTimeField(blank=True, null=True)
    finished_at = models.DateTimeField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'background_jobs'

    def __str__(self):
        return f"{self.job_name} ({self.status})"


class BackupLog(models.Model):
    id = models.UUIDField(primary_key=True, default=__import__('uuid').uuid4, editable=False)
    backup_type = models.CharField(max_length=40, default='Daily')
    file_url = models.CharField(max_length=255, blank=True, null=True)
    status = models.CharField(max_length=20, default='Success')
    size_bytes = models.BigIntegerField(blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'backup_logs'

    def __str__(self):
        return f"Backup {self.backup_type} @ {self.created_at}"
