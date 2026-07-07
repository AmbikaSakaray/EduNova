from rest_framework import permissions

class RoleBasedAccessControl(permissions.BasePermission):
    """
    Custom permission checking the user's role against the required permissions
    for the API module.
    """
    # Permissions matrix mapped from PRD Part 7 Section 23
    ROLE_PERMISSIONS = {
        'Super Admin': {
            'tenants': ['create', 'read', 'update', 'delete', 'approve', 'export'],
            'students': ['read'],
        },
        'School Admin': {
            'students': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
            'fees': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
            'attendance': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
            'exams': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
            'payroll': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
            'lms': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
            'hostel': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
        },
        'Teacher': {
            'students': ['create', 'read'],
            'attendance': ['create', 'read', 'update'],
            'exams': ['create', 'read', 'update'],
            'lms': ['create', 'read', 'update'],
        },
        'Student': {
            'students': ['read_own'],
            'fees': ['read_own'],
            'attendance': ['read_own'],
            'exams': ['read_own'],
            'lms': ['read', 'update'],
            'hostel': ['update_own'],  # Apply
        },
        'Parent': {
            'students': ['read_own'],
            'fees': ['read_own', 'update_own'],  # Pay
            'attendance': ['read_own'],
            'exams': ['read_own'],
            'lms': ['read_own'],
            'hostel': ['read_own'],
        },
        'Accountant': {
            'students': ['read'],
            'fees': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
            'payroll': ['read', 'update'],
            'hostel': ['read'],
        },
        'HR Manager': {
            'payroll': ['create', 'read', 'update', 'delete', 'approve', 'export', 'print'],
        }
    }

    def has_permission(self, request, view):
        # Allow open/unauthenticated endpoints (e.g. login, registry check)
        if not request.user or not request.user.is_authenticated:
            return False

        user_role = getattr(request.user, 'role', None)
        if not user_role:
            return False

        # Superuser bypass
        if request.user.is_superuser:
            return True

        module_name = getattr(view, 'audit_module_name', None)
        if not module_name:
            # If no module name is set on view, default to standard authentication block
            return True

        # Check permission mappings
        role_rules = self.ROLE_PERMISSIONS.get(user_role, {})
        allowed_actions = role_rules.get(module_name, [])

        # Map HTTP method to CRUD action
        action = self._get_required_action(request.method)
        
        # Verify permissions
        return action in allowed_actions or f"{action}_own" in allowed_actions

    def _get_required_action(self, method):
        mapping = {
            'GET': 'read',
            'POST': 'create',
            'PUT': 'update',
            'PATCH': 'update',
            'DELETE': 'delete'
        }
        return mapping.get(method, 'read')
