from django.contrib import admin
from .models import (
    CMSPage, CMSSection, News, Event, Gallery, FAQ, Download, Achievement,
    Testimonial, Facility, CareerPost, CareerApplication, ContactInquiry
)

for m in [CMSPage, CMSSection, News, Event, Gallery, FAQ, Download, Achievement,
          Testimonial, Facility, CareerPost, CareerApplication, ContactInquiry]:
    admin.site.register(m)
