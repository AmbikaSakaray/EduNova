from django.contrib import admin
from .models import Employee, LeaveRequest, Payroll, TeacherProfile

admin.site.register(Employee)
admin.site.register(LeaveRequest)
admin.site.register(Payroll)
admin.site.register(TeacherProfile)
