from django.db import models
from django.conf import settings
from apps.core.models import AbstractAuditModel
from apps.students.models import Student

# --- Library ---
class Book(AbstractAuditModel):
    title = models.CharField(max_length=200)
    author = models.CharField(max_length=150)
    isbn = models.CharField(max_length=20, unique=True)
    rfid_tag = models.CharField(max_length=50, unique=True, blank=True, null=True)
    quantity = models.IntegerField(default=1)

    class Meta:
        db_table = 'library_books'

    def __str__(self):
        return self.title

class BookIssue(AbstractAuditModel):
    STATUS_CHOICES = (
        ('Issued', 'Issued'),
        ('Returned', 'Returned'),
    )

    book = models.ForeignKey(Book, on_delete=models.CASCADE, related_name='issues')
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='borrowed_books')
    issue_date = models.DateField(auto_now_add=True)
    due_date = models.DateField()
    return_date = models.DateField(blank=True, null=True)
    fine_amount = models.DecimalField(max_digits=8, decimal_places=2, default=0.00)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Issued')

    class Meta:
        db_table = 'library_issues'

    def __str__(self):
        return f"{self.student.first_name} borrowed {self.book.title} ({self.status})"


# --- Transport ---
class BusRoute(AbstractAuditModel):
    route_name = models.CharField(max_length=100) # e.g. "Route 10 - South Delhi"
    start_point = models.CharField(max_length=150)
    end_point = models.CharField(max_length=150)
    driver_name = models.CharField(max_length=100)
    driver_phone = models.CharField(max_length=15)

    class Meta:
        db_table = 'bus_routes'

    def __str__(self):
        return self.route_name

class BusGPSLog(AbstractAuditModel):
    route = models.ForeignKey(BusRoute, on_delete=models.CASCADE, related_name='gps_logs')
    latitude = models.DecimalField(max_digits=9, decimal_places=6)
    longitude = models.DecimalField(max_digits=9, decimal_places=6)
    speed = models.DecimalField(max_digits=5, decimal_places=2, default=0.00)
    logged_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = 'bus_gps_logs'

    def __str__(self):
        return f"Route {self.route.route_name} - ({self.latitude}, {self.longitude})"


# --- Hostel ---
class Hostel(AbstractAuditModel):
    HOSTEL_TYPE_CHOICES = (('Boys', 'Boys'), ('Girls', 'Girls'), ('Co-ed', 'Co-ed'))
    name = models.CharField(max_length=150)
    hostel_type = models.CharField(max_length=20, choices=HOSTEL_TYPE_CHOICES, default='Boys')
    warden_name = models.CharField(max_length=150, blank=True, null=True)
    warden_phone = models.CharField(max_length=20, blank=True, null=True)
    address = models.TextField(blank=True, null=True)
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'hostels'

    def __str__(self):
        return self.name


class HostelRoom(AbstractAuditModel):
    hostel = models.ForeignKey(Hostel, on_delete=models.CASCADE, related_name='rooms', null=True, blank=True)
    room_number = models.CharField(max_length=20)
    capacity = models.IntegerField()
    occupied_beds = models.IntegerField(default=0)
    cost_per_month = models.DecimalField(max_digits=10, decimal_places=2)

    class Meta:
        db_table = 'hostel_rooms'

    def __str__(self):
        return f"Room {self.room_number}"


# --- Inventory ---
class InventoryAsset(AbstractAuditModel):
    asset_name = models.CharField(max_length=150)
    sku_number = models.CharField(max_length=50, unique=True)
    quantity = models.IntegerField(default=0)
    unit_cost = models.DecimalField(max_digits=12, decimal_places=2)

    class Meta:
        db_table = 'inventory_assets'

    def __str__(self):
        return self.asset_name


class HostelAllocation(AbstractAuditModel):
    STATUS_CHOICES = (('Active', 'Active'), ('Vacated', 'Vacated'))
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='hostel_allocations')
    room = models.ForeignKey(HostelRoom, on_delete=models.CASCADE, related_name='allocations')
    allocated_from = models.DateField()
    allocated_until = models.DateField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Active')

    class Meta:
        db_table = 'hostel_allocations'

    def __str__(self):
        return f"{self.student} - {self.room}"


# --- Transport (extra) ---
class Vehicle(AbstractAuditModel):
    STATUS_CHOICES = (('Active', 'Active'), ('Under Maintenance', 'Under Maintenance'), ('Retired', 'Retired'))
    registration_number = models.CharField(max_length=30, unique=True)
    vehicle_type = models.CharField(max_length=40, blank=True, null=True)
    capacity = models.IntegerField(blank=True, null=True)
    route = models.ForeignKey(BusRoute, on_delete=models.SET_NULL, null=True, blank=True, related_name='vehicles')
    status = models.CharField(max_length=30, choices=STATUS_CHOICES, default='Active')

    class Meta:
        db_table = 'vehicles'

    def __str__(self):
        return self.registration_number


class BusRouteStop(AbstractAuditModel):
    route = models.ForeignKey(BusRoute, on_delete=models.CASCADE, related_name='stops')
    stop_name = models.CharField(max_length=150)
    sequence_order = models.IntegerField(default=0)
    pickup_time = models.TimeField(blank=True, null=True)
    drop_time = models.TimeField(blank=True, null=True)
    latitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)
    longitude = models.DecimalField(max_digits=9, decimal_places=6, blank=True, null=True)

    class Meta:
        db_table = 'bus_route_stops'

    def __str__(self):
        return f"{self.route.route_name} - {self.stop_name}"


class TransportAllocation(AbstractAuditModel):
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='transport_allocations')
    route = models.ForeignKey(BusRoute, on_delete=models.CASCADE, related_name='student_allocations')
    stop = models.ForeignKey(BusRouteStop, on_delete=models.SET_NULL, null=True, blank=True, related_name='student_allocations')
    is_active = models.BooleanField(default=True)

    class Meta:
        db_table = 'transport_allocations'
        unique_together = ('student', 'route')

    def __str__(self):
        return f"{self.student} - {self.route}"


class BusMaintenanceLog(AbstractAuditModel):
    vehicle = models.ForeignKey(Vehicle, on_delete=models.CASCADE, related_name='maintenance_logs')
    description = models.TextField()
    cost = models.DecimalField(max_digits=12, decimal_places=2, default=0)
    serviced_at = models.DateField()
    next_service_due = models.DateField(blank=True, null=True)

    class Meta:
        db_table = 'bus_maintenance_logs'

    def __str__(self):
        return f"{self.vehicle} - {self.serviced_at}"


# --- Inventory (extra) ---
class InventoryTransaction(AbstractAuditModel):
    TRANSACTION_TYPE_CHOICES = (('In', 'In'), ('Out', 'Out'), ('Adjustment', 'Adjustment'))
    asset = models.ForeignKey(InventoryAsset, on_delete=models.CASCADE, related_name='transactions')
    transaction_type = models.CharField(max_length=20, choices=TRANSACTION_TYPE_CHOICES, default='In')
    quantity = models.IntegerField()
    note = models.TextField(blank=True, null=True)
    handled_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='inventory_transactions')

    class Meta:
        db_table = 'inventory_transactions'

    def __str__(self):
        return f"{self.asset} - {self.transaction_type} ({self.quantity})"


# --- Visitor / feedback / PTM ---
class VisitorManagement(AbstractAuditModel):
    STATUS_CHOICES = (('Checked In', 'Checked In'), ('Checked Out', 'Checked Out'))
    visitor_name = models.CharField(max_length=150)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    purpose = models.CharField(max_length=200, blank=True, null=True)
    host_user = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='hosted_visitors')
    check_in_time = models.DateTimeField(auto_now_add=True)
    check_out_time = models.DateTimeField(blank=True, null=True)
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Checked In')
    photo_url = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'visitor_management'

    def __str__(self):
        return self.visitor_name


class PTMBooking(AbstractAuditModel):
    STATUS_CHOICES = (('Requested', 'Requested'), ('Confirmed', 'Confirmed'), ('Completed', 'Completed'), ('Cancelled', 'Cancelled'))
    student = models.ForeignKey(Student, on_delete=models.CASCADE, related_name='ptm_bookings')
    teacher = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='ptm_bookings')
    requested_by = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.SET_NULL, null=True, blank=True, related_name='ptm_requested')
    scheduled_at = models.DateTimeField()
    status = models.CharField(max_length=20, choices=STATUS_CHOICES, default='Requested')
    notes = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'ptm_bookings'

    def __str__(self):
        return f"PTM - {self.student} with {self.teacher}"


class ParentFeedback(AbstractAuditModel):
    parent = models.ForeignKey('students.Parent', on_delete=models.CASCADE, related_name='feedback_entries')
    subject = models.CharField(max_length=200, blank=True, null=True)
    message = models.TextField()
    rating = models.IntegerField(blank=True, null=True)
    responded = models.BooleanField(default=False)
    response = models.TextField(blank=True, null=True)

    class Meta:
        db_table = 'parent_feedbacks'

    def __str__(self):
        return f"Feedback - {self.parent}"
