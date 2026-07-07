from django.contrib import admin
from .models import ClassRoom, Section, Subject, Timetable, AcademicProgram, AcademicAllocation, Homework, HomeworkSubmission

admin.site.register(ClassRoom)
admin.site.register(Section)
admin.site.register(Subject)
admin.site.register(Timetable)
admin.site.register(AcademicProgram)
admin.site.register(AcademicAllocation)
admin.site.register(Homework)
admin.site.register(HomeworkSubmission)
