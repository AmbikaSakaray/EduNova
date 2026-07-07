import json
import logging
from django.utils import timezone

logger = logging.getLogger('audit_log')

class AuditLogMiddleware:
    """
    Intercepts POST, PUT, PATCH, and DELETE requests, logging the request details,
    actor identity, and request payloads for audit tracking.
    """
    def __init__(self, get_response):
        self.get_response = get_response

    def __call__(self, request):
        # We process the response first to make sure we capture the outcome
        response = self.get_response(request)

        # We only log modifications
        if request.method in ['POST', 'PUT', 'PATCH', 'DELETE']:
            user = request.user
            actor_id = str(user.id) if user and user.is_authenticated else "Anonymous"
            ip_address = self._get_client_ip(request)
            timestamp = timezone.now().isoformat()
            
            # Read payload (handling potential reading errors/empty payloads)
            payload = None
            if request.method != 'DELETE':
                try:
                    payload = json.loads(request.body.decode('utf-8'))
                    # Redact passwords or cards for compliance
                    self._redact_sensitive_keys(payload)
                except Exception:
                    payload = {}

            log_entry = {
                "timestamp": timestamp,
                "actor_id": actor_id,
                "event_type": request.method,
                "endpoint": request.path,
                "ip_address": ip_address,
                "status_code": response.status_code,
                "payload": payload
            }
            
            logger.info(json.dumps(log_entry))

        return response

    def _get_client_ip(self, request):
        x_forwarded_for = request.META.get('HTTP_X_FORWARDED_FOR')
        if x_forwarded_for:
            ip = x_forwarded_for.split(',')[0].strip()
        else:
            ip = request.META.get('REMOTE_ADDR')
        return ip

    def _redact_sensitive_keys(self, data):
        if not isinstance(data, dict):
            return
        sensitive_keys = ['password', 'card_number', 'cvv', 'token', 'client_secret']
        for key in list(data.keys()):
            if key.lower() in sensitive_keys:
                data[key] = "[REDACTED]"
            elif isinstance(data[key], dict):
                self._redact_sensitive_keys(data[key])
            elif isinstance(data[key], list):
                for item in data[key]:
                    self._redact_sensitive_keys(item)
