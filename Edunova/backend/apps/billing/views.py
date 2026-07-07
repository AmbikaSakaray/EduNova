from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from datetime import date
from apps.core.permissions import RoleBasedAccessControl
from .models import Invoice, FeePayment
from .serializers import InvoiceSerializer, FeePaymentSerializer
from .services import StripeGatewayService, RazorpayGatewayService

class FeeCheckoutView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'fees'

    def post(self, request):
        invoice_id = request.data.get('invoice_id')
        gateway = request.data.get('gateway', 'stripe')
        payment_method = request.data.get('payment_method', 'Card')

        try:
            invoice = Invoice.objects.get(id=invoice_id, deleted_at__isnull=True)
        except Invoice.DoesNotExist:
            return Response({"error": "Invoice not found"}, status=status.HTTP_404_NOT_FOUND)

        if invoice.status == 'Paid':
            return Response({"message": "Invoice is already paid"}, status=status.HTTP_400_BAD_REQUEST)

        amount_to_charge = invoice.amount_due + invoice.late_fee_accumulated

        # Invoke gateway services
        if gateway == 'stripe':
            checkout_data = StripeGatewayService.create_checkout_session(invoice, amount_to_charge)
            tx_ref = checkout_data['session_id']
        else:
            checkout_data = RazorpayGatewayService.create_order(invoice, amount_to_charge)
            tx_ref = checkout_data['order_id']

        # Create Pending transaction log
        FeePayment.objects.create(
            invoice=invoice,
            amount_paid=amount_to_charge,
            transaction_reference=tx_ref,
            payment_method=payment_method,
            gateway=gateway,
            status='Pending'
        )

        return Response({
            "status": "success",
            "payment_reference": tx_ref,
            "checkout_data": checkout_data
        })


class FeeWebhookView(APIView):
    # Webhooks are open endpoints verified with cryptographic signatures
    permission_classes = []

    def post(self, request):
        payload = request.data
        sig_header = request.headers.get('Stripe-Signature')

        # Verify signature
        if not StripeGatewayService.verify_webhook_signature(payload, sig_header):
            return Response({"error": "Invalid signature"}, status=status.HTTP_400_BAD_REQUEST)

        # Mock processing: find payment reference
        session_id = payload.get('session_id')
        try:
            payment = FeePayment.objects.get(transaction_reference=session_id)
            if payment.status != 'Success':
                payment.status = 'Success'
                payment.save(update_fields=['status'])

                invoice = payment.invoice
                invoice.status = 'Paid'
                invoice.amount_due = 0.00
                invoice.save(update_fields=['status', 'amount_due'])
                
                # Rule BR-FE-001: Receipt generation must occur automatically upon payment processing success
                receipt_url = f"https://cdn.edunova.io/receipts/rec_{payment.id.hex[:8]}.pdf"
                
                return Response({
                    "status": "success",
                    "message": "Payment verified and invoice updated to Paid.",
                    "receipt_url": receipt_url
                })
        except FeePayment.DoesNotExist:
            return Response({"error": "Transaction not found"}, status=status.HTTP_404_NOT_FOUND)

        return Response({"message": "Webhook processed"})


class FeeDefaultersListView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'fees'

    def get(self, request):
        today = date.today()
        # Find unpaid/partially paid invoices past their installment due date
        defaulter_invoices = Invoice.objects.filter(
            status__in=['Unpaid', 'Partially Paid'],
            installment__due_date__lt=today,
            deleted_at__isnull=True
        ).select_related('student', 'installment')

        serializer = InvoiceSerializer(defaulter_invoices, many=True)
        return Response(serializer.data)


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import FeeStructure, Installment, Scholarship, StudentScholarship
from .serializers import (
    FeeStructureSerializer, InstallmentSerializer, ScholarshipSerializer, StudentScholarshipSerializer
)


class FeeStructureListCreateView(BaseListCreateView):
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer

class FeeStructureDetailView(BaseRetrieveUpdateDestroyView):
    queryset = FeeStructure.objects.all()
    serializer_class = FeeStructureSerializer

class InstallmentListCreateView(BaseListCreateView):
    queryset = Installment.objects.all()
    serializer_class = InstallmentSerializer

class InstallmentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Installment.objects.all()
    serializer_class = InstallmentSerializer

class InvoiceListCreateView(BaseListCreateView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class InvoiceDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Invoice.objects.all()
    serializer_class = InvoiceSerializer

class FeePaymentListCreateView(BaseListCreateView):
    queryset = FeePayment.objects.all()
    serializer_class = FeePaymentSerializer

class FeePaymentDetailView(BaseRetrieveUpdateDestroyView):
    queryset = FeePayment.objects.all()
    serializer_class = FeePaymentSerializer

class ScholarshipListCreateView(BaseListCreateView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

class ScholarshipDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Scholarship.objects.all()
    serializer_class = ScholarshipSerializer

class StudentScholarshipListCreateView(BaseListCreateView):
    queryset = StudentScholarship.objects.all()
    serializer_class = StudentScholarshipSerializer

class StudentScholarshipDetailView(BaseRetrieveUpdateDestroyView):
    queryset = StudentScholarship.objects.all()
    serializer_class = StudentScholarshipSerializer
