from .base import *
import environ
import os

env = environ.Env()

ENV_FILE = BASE_DIR / '.env'
if ENV_FILE.exists():
    environ.Env.read_env(str(ENV_FILE))

DEBUG = False

SECRET_KEY = env('SECRET_KEY', default=os.environ.get('SECRET_KEY', 'django-insecure-key-for-dev-only'))

ALLOWED_HOSTS = env.list('ALLOWED_HOSTS', default=['*'])

# Supabase database configuration using DATABASE_URL env variable
DATABASES = {
    'default': env.db('DATABASE_URL')
}
DATABASES['default']['ENGINE'] = 'django_tenants.postgresql_backend'
DATABASES['default']['CONN_MAX_AGE'] = 60

DATABASE_ROUTERS = (
    'django_tenants.routers.TenantSyncRouter',
)

# CORS Config
CORS_ALLOWED_ORIGINS = env.list('CORS_ALLOWED_ORIGINS', default=[])
CORS_ALLOW_ALL_ORIGINS = env.bool('CORS_ALLOW_ALL_ORIGINS', default=True)
CORS_ALLOW_CREDENTIALS = True

# Static files
STATIC_URL = '/static/'
STATIC_ROOT = BASE_DIR / 'staticfiles'

# Celery — use eager execution if no Redis available
CELERY_TASK_ALWAYS_EAGER = env.bool('CELERY_TASK_ALWAYS_EAGER', default=True)
CELERY_TASK_EAGER_PROPAGATES = env.bool('CELERY_TASK_EAGER_PROPAGATES', default=True)
CELERY_BROKER_URL = env('REDIS_URL', default='memory://')
CELERY_RESULT_BACKEND = env('REDIS_URL', default='cache+memory://')

# Security (relaxed for Render free tier)
SECURE_SSL_REDIRECT = False
SESSION_COOKIE_SECURE = True
CSRF_COOKIE_SECURE = True
