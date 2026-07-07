from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import (
    CMSPage, CMSSection, News, Event, Gallery, FAQ, Download, Achievement,
    Testimonial, Facility, CareerPost, CareerApplication, ContactInquiry
)
from .serializers import (
    CMSPageSerializer, CMSSectionSerializer, NewsSerializer, EventSerializer, GallerySerializer,
    FAQSerializer, DownloadSerializer, AchievementSerializer, TestimonialSerializer,
    FacilitySerializer, CareerPostSerializer, CareerApplicationSerializer, ContactInquirySerializer
)

class CMSPageListCreateView(BaseListCreateView):
    queryset = CMSPage.objects.all()
    serializer_class = CMSPageSerializer

class CMSPageDetailView(BaseRetrieveUpdateDestroyView):
    queryset = CMSPage.objects.all()
    serializer_class = CMSPageSerializer

class CMSSectionListCreateView(BaseListCreateView):
    queryset = CMSSection.objects.all()
    serializer_class = CMSSectionSerializer

class CMSSectionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = CMSSection.objects.all()
    serializer_class = CMSSectionSerializer

class NewsListCreateView(BaseListCreateView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class NewsDetailView(BaseRetrieveUpdateDestroyView):
    queryset = News.objects.all()
    serializer_class = NewsSerializer

class EventListCreateView(BaseListCreateView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class EventDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Event.objects.all()
    serializer_class = EventSerializer

class GalleryListCreateView(BaseListCreateView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class GalleryDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Gallery.objects.all()
    serializer_class = GallerySerializer

class FAQListCreateView(BaseListCreateView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class FAQDetailView(BaseRetrieveUpdateDestroyView):
    queryset = FAQ.objects.all()
    serializer_class = FAQSerializer

class DownloadListCreateView(BaseListCreateView):
    queryset = Download.objects.all()
    serializer_class = DownloadSerializer

class DownloadDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Download.objects.all()
    serializer_class = DownloadSerializer

class AchievementListCreateView(BaseListCreateView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

class AchievementDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Achievement.objects.all()
    serializer_class = AchievementSerializer

class TestimonialListCreateView(BaseListCreateView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class TestimonialDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Testimonial.objects.all()
    serializer_class = TestimonialSerializer

class FacilityListCreateView(BaseListCreateView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

class FacilityDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Facility.objects.all()
    serializer_class = FacilitySerializer

class CareerPostListCreateView(BaseListCreateView):
    queryset = CareerPost.objects.all()
    serializer_class = CareerPostSerializer

class CareerPostDetailView(BaseRetrieveUpdateDestroyView):
    queryset = CareerPost.objects.all()
    serializer_class = CareerPostSerializer

class CareerApplicationListCreateView(BaseListCreateView):
    queryset = CareerApplication.objects.all()
    serializer_class = CareerApplicationSerializer

class CareerApplicationDetailView(BaseRetrieveUpdateDestroyView):
    queryset = CareerApplication.objects.all()
    serializer_class = CareerApplicationSerializer

class ContactInquiryListCreateView(BaseListCreateView):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer

class ContactInquiryDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ContactInquiry.objects.all()
    serializer_class = ContactInquirySerializer

