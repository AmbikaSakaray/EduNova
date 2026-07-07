from django.contrib import admin
from .models import FeeStructure, Installment, Invoice, FeePayment, Scholarship, StudentScholarship

admin.site.register(FeeStructure)
admin.site.register(Installment)
admin.site.register(Invoice)
admin.site.register(FeePayment)
admin.site.register(Scholarship)
admin.site.register(StudentScholarship)
