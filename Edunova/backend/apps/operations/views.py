from rest_framework import status
from rest_framework.views import APIView
from rest_framework.response import Response
from apps.core.permissions import RoleBasedAccessControl
from .models import BookIssue, BusRoute, BusGPSLog, HostelRoom, InventoryAsset
from .serializers import BookIssueSerializer, BusRouteSerializer, BusGPSLogSerializer, HostelRoomSerializer, InventoryAssetSerializer

class BookIssueListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'hostel' # using hostel/operations RBAC mapped scope

    def get(self, request):
        issues = BookIssue.objects.filter(deleted_at__isnull=True)
        serializer = BookIssueSerializer(issues, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BookIssueSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BusRouteListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'hostel'

    def get(self, request):
        routes = BusRoute.objects.filter(deleted_at__isnull=True)
        serializer = BusRouteSerializer(routes, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = BusRouteSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class BusGPSLogIngestView(APIView):
    # GPS trackers send logs without user login session.
    # In production, secure with specialized API keys/device tokens.
    permission_classes = []

    def post(self, request):
        serializer = BusGPSLogSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"status": "success", "message": "GPS coordinates ingested."}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class HostelRoomListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'hostel'

    def get(self, request):
        rooms = HostelRoom.objects.filter(deleted_at__isnull=True)
        serializer = HostelRoomSerializer(rooms, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = HostelRoomSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class InventoryAssetListCreateView(APIView):
    permission_classes = [RoleBasedAccessControl]
    audit_module_name = 'hostel'

    def get(self, request):
        assets = InventoryAsset.objects.filter(deleted_at__isnull=True)
        serializer = InventoryAssetSerializer(assets, many=True)
        return Response(serializer.data)

    def post(self, request):
        serializer = InventoryAssetSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


from apps.core.generic_views import BaseListCreateView, BaseRetrieveUpdateDestroyView
from .models import Book, HostelRoom as _HostelRoom
from .models import (
    Hostel, HostelAllocation, Vehicle, BusRouteStop, TransportAllocation,
    BusMaintenanceLog, InventoryTransaction, VisitorManagement, PTMBooking, ParentFeedback
)
from .serializers import (
    BookSerializer,
    HostelSerializer, HostelAllocationSerializer, VehicleSerializer, BusRouteStopSerializer,
    TransportAllocationSerializer, BusMaintenanceLogSerializer, InventoryTransactionSerializer,
    VisitorManagementSerializer, PTMBookingSerializer, ParentFeedbackSerializer
)

class BookListCreateView(BaseListCreateView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Book.objects.all()
    serializer_class = BookSerializer

class BookIssueDetailView(BaseRetrieveUpdateDestroyView):
    queryset = BookIssue.objects.all()
    serializer_class = BookIssueSerializer

class BusRouteDetailView(BaseRetrieveUpdateDestroyView):
    queryset = BusRoute.objects.all()
    serializer_class = BusRouteSerializer

class HostelRoomDetailView(BaseRetrieveUpdateDestroyView):
    queryset = _HostelRoom.objects.all()
    serializer_class = HostelRoomSerializer

class InventoryAssetDetailView(BaseRetrieveUpdateDestroyView):
    queryset = InventoryAsset.objects.all()
    serializer_class = InventoryAssetSerializer

class HostelListCreateView(BaseListCreateView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer

class HostelDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Hostel.objects.all()
    serializer_class = HostelSerializer

class HostelAllocationListCreateView(BaseListCreateView):
    queryset = HostelAllocation.objects.all()
    serializer_class = HostelAllocationSerializer

class HostelAllocationDetailView(BaseRetrieveUpdateDestroyView):
    queryset = HostelAllocation.objects.all()
    serializer_class = HostelAllocationSerializer

class VehicleListCreateView(BaseListCreateView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class VehicleDetailView(BaseRetrieveUpdateDestroyView):
    queryset = Vehicle.objects.all()
    serializer_class = VehicleSerializer

class BusRouteStopListCreateView(BaseListCreateView):
    queryset = BusRouteStop.objects.all()
    serializer_class = BusRouteStopSerializer

class BusRouteStopDetailView(BaseRetrieveUpdateDestroyView):
    queryset = BusRouteStop.objects.all()
    serializer_class = BusRouteStopSerializer

class TransportAllocationListCreateView(BaseListCreateView):
    queryset = TransportAllocation.objects.all()
    serializer_class = TransportAllocationSerializer

class TransportAllocationDetailView(BaseRetrieveUpdateDestroyView):
    queryset = TransportAllocation.objects.all()
    serializer_class = TransportAllocationSerializer

class BusMaintenanceLogListCreateView(BaseListCreateView):
    queryset = BusMaintenanceLog.objects.all()
    serializer_class = BusMaintenanceLogSerializer

class BusMaintenanceLogDetailView(BaseRetrieveUpdateDestroyView):
    queryset = BusMaintenanceLog.objects.all()
    serializer_class = BusMaintenanceLogSerializer

class InventoryTransactionListCreateView(BaseListCreateView):
    queryset = InventoryTransaction.objects.all()
    serializer_class = InventoryTransactionSerializer

class InventoryTransactionDetailView(BaseRetrieveUpdateDestroyView):
    queryset = InventoryTransaction.objects.all()
    serializer_class = InventoryTransactionSerializer

class VisitorManagementListCreateView(BaseListCreateView):
    queryset = VisitorManagement.objects.all()
    serializer_class = VisitorManagementSerializer

class VisitorManagementDetailView(BaseRetrieveUpdateDestroyView):
    queryset = VisitorManagement.objects.all()
    serializer_class = VisitorManagementSerializer

class PTMBookingListCreateView(BaseListCreateView):
    queryset = PTMBooking.objects.all()
    serializer_class = PTMBookingSerializer

class PTMBookingDetailView(BaseRetrieveUpdateDestroyView):
    queryset = PTMBooking.objects.all()
    serializer_class = PTMBookingSerializer

class ParentFeedbackListCreateView(BaseListCreateView):
    queryset = ParentFeedback.objects.all()
    serializer_class = ParentFeedbackSerializer

class ParentFeedbackDetailView(BaseRetrieveUpdateDestroyView):
    queryset = ParentFeedback.objects.all()
    serializer_class = ParentFeedbackSerializer

