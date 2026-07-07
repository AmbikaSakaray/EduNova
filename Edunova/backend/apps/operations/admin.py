from django.contrib import admin
from .models import (
    Book, BookIssue, BusRoute, BusGPSLog, HostelRoom, InventoryAsset,
    Hostel, HostelAllocation, Vehicle, BusRouteStop, TransportAllocation,
    BusMaintenanceLog, InventoryTransaction, VisitorManagement, PTMBooking, ParentFeedback
)

for m in [Book, BookIssue, BusRoute, BusGPSLog, HostelRoom, InventoryAsset,
          Hostel, HostelAllocation, Vehicle, BusRouteStop, TransportAllocation,
          BusMaintenanceLog, InventoryTransaction, VisitorManagement, PTMBooking, ParentFeedback]:
    admin.site.register(m)
