from django.contrib import admin
from .models import Tenant, Domain, CompanyProfile, Campus, Department

admin.site.register(Tenant)
admin.site.register(Domain)
admin.site.register(CompanyProfile)
admin.site.register(Campus)
admin.site.register(Department)
