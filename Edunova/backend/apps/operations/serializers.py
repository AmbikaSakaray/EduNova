from rest_framework import serializers
from .models import Book, BookIssue, BusRoute, BusGPSLog, HostelRoom, InventoryAsset

class BookSerializer(serializers.ModelSerializer):
    class Meta:
        model = Book
        fields = '__all__'

class BookIssueSerializer(serializers.ModelSerializer):
    book_title = serializers.CharField(source='book.title', read_only=True)
    student_name = serializers.CharField(source='student.first_name', read_only=True)

    class Meta:
        model = BookIssue
        fields = ('id', 'book', 'book_title', 'student', 'student_name', 'issue_date', 'due_date', 'return_date', 'fine_amount', 'status')
        read_only_fields = ('id', 'issue_date', 'fine_amount')

class BusRouteSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusRoute
        fields = '__all__'

class BusGPSLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusGPSLog
        fields = '__all__'
        read_only_fields = ('id', 'logged_at')

class HostelRoomSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelRoom
        fields = '__all__'

class InventoryAssetSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryAsset
        fields = '__all__'


from .models import (
    Hostel, HostelAllocation, Vehicle, BusRouteStop, TransportAllocation,
    BusMaintenanceLog, InventoryTransaction, VisitorManagement, PTMBooking, ParentFeedback
)

class HostelSerializer(serializers.ModelSerializer):
    class Meta:
        model = Hostel
        fields = '__all__'

class HostelAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = HostelAllocation
        fields = '__all__'

class VehicleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Vehicle
        fields = '__all__'

class BusRouteStopSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusRouteStop
        fields = '__all__'

class TransportAllocationSerializer(serializers.ModelSerializer):
    class Meta:
        model = TransportAllocation
        fields = '__all__'

class BusMaintenanceLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = BusMaintenanceLog
        fields = '__all__'

class InventoryTransactionSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryTransaction
        fields = '__all__'

class VisitorManagementSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitorManagement
        fields = '__all__'

class PTMBookingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PTMBooking
        fields = '__all__'

class ParentFeedbackSerializer(serializers.ModelSerializer):
    class Meta:
        model = ParentFeedback
        fields = '__all__'

