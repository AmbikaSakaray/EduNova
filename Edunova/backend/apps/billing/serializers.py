from rest_framework import serializers
from .models import FeeStructure, Installment, Invoice, FeePayment

class FeeStructureSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeeStructure
        fields = '__all__'

class InstallmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Installment
        fields = '__all__'

class InvoiceSerializer(serializers.ModelSerializer):
    student_name = serializers.CharField(source='student.first_name', read_only=True)
    installment_name = serializers.CharField(source='installment.name', read_only=True)

    class Meta:
        model = Invoice
        fields = ('id', 'student', 'student_name', 'installment', 'installment_name', 'amount_due', 'late_fee_accumulated', 'status')

class FeePaymentSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeePayment
        fields = ('id', 'invoice', 'amount_paid', 'payment_date', 'transaction_reference', 'payment_method', 'gateway', 'status')
        read_only_fields = ('id', 'payment_date', 'status')


from .models import Scholarship, StudentScholarship


class ScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = Scholarship
        fields = '__all__'


class StudentScholarshipSerializer(serializers.ModelSerializer):
    class Meta:
        model = StudentScholarship
        fields = '__all__'
