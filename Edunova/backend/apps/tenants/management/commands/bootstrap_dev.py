"""
Bootstraps everything a fresh clone of the backend needs to actually talk to
the React frontend on localhost, without hand-rolling curl requests first:

1. A `public` schema Tenant (django-tenants requires this to exist as a row,
   even though the shared apps already live in the `public` postgres schema).
2. A default school Tenant + Domain ("edunova.localhost") so the tenant-only
   apps (students, academics, exams, billing, etc.) have a real schema with
   migrated tables to read/write against.
3. A Super Admin user inside that tenant schema so the React Login page has
   something to authenticate against immediately.

Usage (from backend/):
    python manage.py migrate_schemas --shared
    python manage.py bootstrap_dev
    python manage.py migrate_schemas   # migrates the new tenant schema
"""
from django.core.management.base import BaseCommand
from django.db import transaction
from django_tenants.utils import schema_context

from apps.tenants.models import Tenant, Domain


class Command(BaseCommand):
    help = "Creates the public tenant, a default 'edunova' school tenant + domain, and a Super Admin user."

    def add_arguments(self, parser):
        parser.add_argument('--subdomain', default='edunova', help="Subdomain / schema name for the default school tenant")
        parser.add_argument('--company-name', default='EduNova Global Academy', help="Display name for the default tenant")
        parser.add_argument('--admin-username', default='admin', help="Username for the seeded Super Admin")
        parser.add_argument('--admin-password', default='Admin@12345', help="Password for the seeded Super Admin")
        parser.add_argument('--admin-email', default='admin@edunova.local', help="Email for the seeded Super Admin")

    def handle(self, *args, **options):
        subdomain = options['subdomain'].lower().replace('-', '_')
        company_name = options['company_name']
        admin_username = options['admin_username']
        admin_password = options['admin_password']
        admin_email = options['admin_email']

        with transaction.atomic():
            public_tenant, created = Tenant.objects.get_or_create(
                schema_name='public',
                defaults={
                    'company_name': 'EduNova Platform (Public)',
                    'subdomain': 'public',
                    'status': 'Active',
                    'plan_type': 'Premium',
                },
            )
            if created:
                Domain.objects.get_or_create(domain='localhost', tenant=public_tenant, defaults={'is_primary': True})
                self.stdout.write(self.style.SUCCESS("Created public tenant + 'localhost' domain."))
            else:
                self.stdout.write("Public tenant already exists — skipping.")

            school_tenant, created = Tenant.objects.get_or_create(
                schema_name=subdomain,
                defaults={
                    'company_name': company_name,
                    'subdomain': subdomain,
                    'status': 'Active',
                    'plan_type': 'Premium',
                },
            )
            domain_host = f"{subdomain}.localhost"
            if created:
                Domain.objects.get_or_create(domain=domain_host, tenant=school_tenant, defaults={'is_primary': True})
                self.stdout.write(self.style.SUCCESS(
                    f"Created tenant '{company_name}' (schema '{subdomain}') with domain '{domain_host}'."
                ))
                self.stdout.write(self.style.WARNING(
                    "Now run: python manage.py migrate_schemas   (to create tables inside the new schema)"
                ))
            else:
                self.stdout.write(f"Tenant '{subdomain}' already exists — skipping creation.")

        # Seed a Super Admin *inside* the new tenant's schema so /admin login works immediately.
        from django.contrib.auth import get_user_model
        User = get_user_model()

        with schema_context(subdomain):
            if not User.objects.filter(username=admin_username).exists():
                User.objects.create_superuser(
                    username=admin_username,
                    email=admin_email,
                    password=admin_password,
                )
                # create_superuser doesn't know about our custom `role` field
                user = User.objects.get(username=admin_username)
                user.role = 'Super Admin'
                user.save(update_fields=['role'])
                self.stdout.write(self.style.SUCCESS(
                    f"Created Super Admin '{admin_username}' / '{admin_password}' inside schema '{subdomain}'."
                ))
            else:
                self.stdout.write(f"User '{admin_username}' already exists in schema '{subdomain}' — skipping.")

        self.stdout.write(self.style.SUCCESS(
            f"\nFrontend .env should point at: VITE_API_BASE_URL=http://{domain_host}:8000"
        ))
