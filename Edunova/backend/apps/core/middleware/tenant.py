import logging
from django.db import connection

logger = logging.getLogger(__name__)

class TenantContextMiddleware:
    """Logs the active Postgres database schema routed for this tenant request."""
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # Retrieve the resolved tenant dynamically (set by TenantMainMiddleware)
        tenant = getattr(request, 'tenant', None)
        schema_name = connection.schema_name

        if tenant:
            logger.info(f"Tenant Active: Subdomain='{tenant.subdomain}', PostgreSQL Schema='{schema_name}'")
        else:
            logger.info(f"Shared Tenant Context (Schema: {schema_name})")

        response = self.get_response(request)
        return response
