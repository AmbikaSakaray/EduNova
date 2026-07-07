from django.contrib import admin
from .models import (
    Student, Guardian, StudentGuardianMapping, Parent, StudentDocument,
    StudentEnrollment, AlumniRegistry, MedicalRecord
)

admin.site.register(Student)
admin.site.register(Guardian)
admin.site.register(StudentGuardianMapping)
admin.site.register(Parent)
admin.site.register(StudentDocument)
admin.site.register(StudentEnrollment)
admin.site.register(AlumniRegistry)
admin.site.register(MedicalRecord)
