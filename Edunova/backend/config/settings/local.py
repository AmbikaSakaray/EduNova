from .base import *

DEBUG = True

ALLOWED_HOSTS = ['*']

# Local DB override if needed
DATABASES = {
    'default': {
        'ENGINE': 'django_tenants.postgresql_backend',
        'NAME': 'edunova_db',
        'USER': 'edunova_admin',
        'PASSWORD': 'secure_db_password_2026',
        'HOST': os.environ.get('DB_HOST', 'db'),
        'PORT': '5432',
    }
}

CORS_ALLOW_ALL_ORIGINS = True
