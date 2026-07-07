from django.db import models
from django.conf import settings
from apps.core.models import AbstractAuditModel


class CMSPage(AbstractAuditModel):
    STATUS_CHOICES = (('Draft', 'Draft'), ('Published', 'Published'), ('Archived', 'Archived'))
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Draft')
    meta_title = models.CharField(max_length=200, blank=True, null=True)
    meta_description = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'cms_pages'

    def __str__(self):
        return self.title


class CMSSection(AbstractAuditModel):
    page = models.ForeignKey(CMSPage, on_delete=models.CASCADE, related_name='sections')
    section_key = models.CharField(max_length=80)
    title = models.CharField(max_length=200, blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    layout = models.CharField(max_length=60, blank=True, null=True)
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'cms_sections'

    def __str__(self):
        return f"{self.page.title} - {self.section_key}"


class News(AbstractAuditModel):
    title = models.CharField(max_length=200)
    slug = models.SlugField(max_length=220, unique=True, blank=True, null=True)
    summary = models.TextField(blank=True, null=True)
    content = models.TextField(blank=True, null=True)
    cover_image_url = models.TextField(blank=True, null=True)
    published_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='news_published')
    is_published = models.BooleanField(default=True)
    published_at = models.DateTimeField(blank=True, null=True)

    class Meta:
        db_table = 'news'
        verbose_name_plural = 'news'

    def __str__(self):
        return self.title


class Event(AbstractAuditModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=200, blank=True, null=True)
    starts_at = models.DateTimeField()
    ends_at = models.DateTimeField(blank=True, null=True)
    cover_image_url = models.TextField(blank=True, null=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        db_table = 'events'

    def __str__(self):
        return self.title


class Gallery(AbstractAuditModel):
    title = models.CharField(max_length=200, blank=True, null=True)
    image_url = models.TextField()
    category = models.CharField(max_length=80, blank=True, null=True)
    is_published = models.BooleanField(default=True)

    class Meta:
        db_table = 'gallery'
        verbose_name_plural = 'gallery'

    def __str__(self):
        return self.title or str(self.id)


class FAQ(AbstractAuditModel):
    category = models.CharField(max_length=80, blank=True, null=True)
    question = models.CharField(max_length=300)
    answer = models.TextField()
    sort_order = models.IntegerField(default=0)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'faqs'
        verbose_name = 'FAQ'
        verbose_name_plural = 'FAQs'

    def __str__(self):
        return self.question


class Download(AbstractAuditModel):
    title = models.CharField(max_length=200)
    file_url = models.TextField()
    category = models.CharField(max_length=80, blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'downloads'

    def __str__(self):
        return self.title


class Achievement(AbstractAuditModel):
    title = models.CharField(max_length=200)
    description = models.TextField(blank=True, null=True)
    achieved_on = models.DateField(blank=True, null=True)
    image_url = models.TextField(blank=True, null=True)
    student = models.ForeignKey('students.Student', on_delete=models.SET_NULL, null=True, blank=True, related_name='achievements')
    is_published = models.BooleanField(default=True)

    class Meta:
        db_table = 'achievements'

    def __str__(self):
        return self.title


class Testimonial(AbstractAuditModel):
    author_name = models.CharField(max_length=150)
    author_role = models.CharField(max_length=100, blank=True, null=True)
    content = models.TextField()
    photo_url = models.TextField(blank=True, null=True)
    rating = models.IntegerField(default=5)
    is_published = models.BooleanField(default=True)

    class Meta:
        db_table = 'testimonials'

    def __str__(self):
        return self.author_name


class Facility(AbstractAuditModel):
    name = models.CharField(max_length=150)
    description = models.TextField(blank=True, null=True)
    icon = models.CharField(max_length=80, blank=True, null=True)
    image_url = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'facilities'
        verbose_name_plural = 'facilities'

    def __str__(self):
        return self.name


class CareerPost(AbstractAuditModel):
    STATUS_CHOICES = (('Open', 'Open'), ('Closed', 'Closed'))
    title = models.CharField(max_length=200)
    department = models.ForeignKey('tenants.Department', on_delete=models.SET_NULL, null=True, blank=True, related_name='career_posts')
    description = models.TextField(blank=True, null=True)
    requirements = models.TextField(blank=True, null=True)
    location = models.CharField(max_length=150, blank=True, null=True)
    employment_type = models.CharField(max_length=30, blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Open')

    class Meta:
        db_table = 'career_posts'

    def __str__(self):
        return self.title


class CareerApplication(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Applied', 'Applied'), ('Shortlisted', 'Shortlisted'),
        ('Interviewed', 'Interviewed'), ('Hired', 'Hired'), ('Rejected', 'Rejected'),
    )
    career_post = models.ForeignKey(CareerPost, on_delete=models.CASCADE, related_name='applications')
    applicant_name = models.CharField(max_length=150)
    applicant_email = models.EmailField()
    applicant_phone = models.CharField(max_length=20, blank=True, null=True)
    resume_url = models.TextField(blank=True, null=True)
    cover_letter = models.TextField(blank=True, null=True)
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Applied')

    class Meta:
        db_table = 'career_applications'

    def __str__(self):
        return f"{self.applicant_name} - {self.career_post.title}"


class ContactInquiry(AbstractAuditModel):
    STATUS_CHOICES = (('New', 'New'), ('In Progress', 'In Progress'), ('Resolved', 'Resolved'))
    name = models.CharField(max_length=150)
    email = models.EmailField()
    phone = models.CharField(max_length=20, blank=True, null=True)
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='New')

    class Meta:
        db_table = 'contact_inquiries'
        verbose_name_plural = 'contact inquiries'

    def __str__(self):
        return f"{self.name} - {self.subject}"
