from .base import *
import os

# Monkey patch SQLite DatabaseWrapper to satisfy django-tenants expectations
from django.db.backends.sqlite3.base import DatabaseWrapper as SQLiteDatabaseWrapper

def dummy_set_schema(self, schema_name, *args, **kwargs):
    self.schema_name = schema_name

def dummy_set_schema_to_public(self, *args, **kwargs):
    self.schema_name = 'public'

def dummy_set_tenant(self, tenant, *args, **kwargs):
    self.tenant = tenant
    self.schema_name = tenant.schema_name if tenant else 'public'

SQLiteDatabaseWrapper.set_schema = dummy_set_schema
SQLiteDatabaseWrapper.set_schema_to_public = dummy_set_schema_to_public
SQLiteDatabaseWrapper.set_tenant = dummy_set_tenant
SQLiteDatabaseWrapper.schema_name = 'public'
SQLiteDatabaseWrapper.tenant = None

DEBUG = True

ALLOWED_HOSTS = ['*']

# SQLite database setup for testing without PostgreSQL
DATABASES = {
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
}

# Override database routers - django-tenants requires TenantSyncRouter to be present
DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)
from django_tenants.routers import TenantSyncRouter
TenantSyncRouter.allow_migrate = lambda *args, **kwargs: True

# Celery synchronous configuration for testing in the same process
CELERY_TASK_ALWAYS_EAGER = True
CELERY_TASK_EAGER_PROPAGATES = True

# Replace TenantMainMiddleware with a dummy middleware that supports SQLite
class DummyTenantMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        from django.db import connection
        from apps.tenants.models import Tenant
        
        # Ensure connection methods exist (redundant check but good practice)
        if not hasattr(connection, 'set_tenant'):
            connection.set_tenant = lambda tenant: None
            connection.set_schema_to_public = lambda: None
            connection.set_schema = lambda schema: None
        
        try:
            tenant = Tenant.objects.first()
            request.tenant = tenant
        except Exception:
            request.tenant = None

        return self.get_response(request)

# Swap out django_tenants middleware
NEW_MIDDLEWARE = []
for mw in MIDDLEWARE:
    if mw == 'django_tenants.middleware.main.TenantMainMiddleware':
        NEW_MIDDLEWARE.append('config.settings.test_local.DummyTenantMiddleware')
    else:
        NEW_MIDDLEWARE.append(mw)
MIDDLEWARE = NEW_MIDDLEWARE

# Disable password validators for easier test user creation
AUTH_PASSWORD_VALIDATORS = []

