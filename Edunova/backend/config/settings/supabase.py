from .base import *
import environ

env = environ.Env()

# Read the .env file if present
ENV_FILE = BASE_DIR / '.env'
if ENV_FILE.exists():
    environ.Env.read_env(str(ENV_FILE))

DEBUG = True

ALLOWED_HOSTS = ['*']

# Supabase database configuration using DATABASE_URL env variable
DATABASES = {
    'default': env.db('DATABASE_URL')
}
DATABASES['default']['ENGINE'] = 'django_tenants.postgresql_backend'

# Enable native Tenant Sync Router
DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)

# Celery settings (default to eager task execution for local development convenience)
CELERY_TASK_ALWAYS_EAGER = env.bool('CELERY_TASK_ALWAYS_EAGER', default=True)
CELERY_TASK_EAGER_PROPAGATES = env.bool('CELERY_TASK_EAGER_PROPAGATES', default=True)
