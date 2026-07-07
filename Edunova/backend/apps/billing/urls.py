from django.urls import path
from .views import (
    FeeCheckoutView, FeeWebhookView, FeeDefaultersListView,
    FeeStructureListCreateView, FeeStructureDetailView,
    InstallmentListCreateView, InstallmentDetailView,
    InvoiceListCreateView, InvoiceDetailView,
    FeePaymentListCreateView, FeePaymentDetailView,
    ScholarshipListCreateView, ScholarshipDetailView,
    StudentScholarshipListCreateView, StudentScholarshipDetailView,
)

urlpatterns = [
    path('checkout/', FeeCheckoutView.as_view(), name='fee_checkout'),
    path('webhook/', FeeWebhookView.as_view(), name='fee_webhook'),
    path('defaulters/', FeeDefaultersListView.as_view(), name='fee_defaulters'),

    path('structures/', FeeStructureListCreateView.as_view(), name='fee_structure_list_create'),
    path('structures/<uuid:pk>/', FeeStructureDetailView.as_view(), name='fee_structure_detail'),
    path('installments/', InstallmentListCreateView.as_view(), name='installment_list_create'),
    path('installments/<uuid:pk>/', InstallmentDetailView.as_view(), name='installment_detail'),
    path('invoices/', InvoiceListCreateView.as_view(), name='invoice_list_create'),
    path('invoices/<uuid:pk>/', InvoiceDetailView.as_view(), name='invoice_detail'),
    path('payments/', FeePaymentListCreateView.as_view(), name='fee_payment_list_create'),
    path('payments/<uuid:pk>/', FeePaymentDetailView.as_view(), name='fee_payment_detail'),
    path('scholarships/', ScholarshipListCreateView.as_view(), name='scholarship_list_create'),
    path('scholarships/<uuid:pk>/', ScholarshipDetailView.as_view(), name='scholarship_detail'),
    path('student-scholarships/', StudentScholarshipListCreateView.as_view(), name='student_scholarship_list_create'),
    path('student-scholarships/<uuid:pk>/', StudentScholarshipDetailView.as_view(), name='student_scholarship_detail'),
]
