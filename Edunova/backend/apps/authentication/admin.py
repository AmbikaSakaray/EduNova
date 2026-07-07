from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import User, Role, Permission, UserRole, RolePermission

admin.site.register(User, UserAdmin)
admin.site.register(Role)
admin.site.register(Permission)
admin.site.register(UserRole)
admin.site.register(RolePermission)
