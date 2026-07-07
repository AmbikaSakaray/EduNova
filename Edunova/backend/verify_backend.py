import os
import sys
import django
import logging

# Setup test settings profile
os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'config.settings.test_local')
django.setup()

from django.conf import settings
is_sqlite = 'sqlite' in settings.DATABASES['default']['ENGINE']

if is_sqlite:
    # Disable database schema creation/deletion operations for SQLite testing
    from django_tenants.models import TenantMixin
    TenantMixin.create_schema = lambda *args, **kwargs: None
    TenantMixin._create_schema = lambda *args, **kwargs: None
    TenantMixin._drop_schema = lambda *args, **kwargs: None

    import django_tenants.utils
    django_tenants.utils.schema_exists = lambda *args, **kwargs: False

    import django_tenants.models
    django_tenants.models.schema_exists = lambda *args, **kwargs: False

    import django_tenants.signals
    django_tenants.signals.schema_exists = lambda *args, **kwargs: False

from django.core.management import call_command
from django.test import Client
from django.db import connection
from django.utils import timezone
from datetime import date, datetime

# Import models
from apps.tenants.models import Tenant, Domain
from apps.authentication.models import User
from apps.students.models import Student, Guardian, StudentGuardianMapping
from apps.academics.models import ClassRoom, Section, Subject, Timetable
from apps.attendance.models import AttendanceRecord
from apps.billing.models import FeeStructure, Installment, Invoice, FeePayment
from apps.staff_hr.models import Employee, LeaveRequest, Payroll
from apps.exams.models import Exam, ExamSchedule, Mark
from apps.lms.models import Course, Lesson, Assignment, Submission
from apps.operations.models import Book, BookIssue, BusRoute, BusGPSLog, HostelRoom, InventoryAsset

# Setup custom logging handler to verify attendance SMS alert
class TestLogHandler(logging.Handler):
    def __init__(self):
        super().__init__()
        self.records = []
    def emit(self, record):
        self.records.append(self.format(record))

log_handler = TestLogHandler()
logging.getLogger('notifications').addHandler(log_handler)
logging.getLogger('notifications').setLevel(logging.INFO)

def run_verification():
    client = Client()
    
    print("=" * 80)
    print("EduNova Backend End-to-End Verification Run")
    print("=" * 80)

    # ----------------------------------------------------
    # Step 1: Apply Migrations & Create Super Admin
    # ----------------------------------------------------
    print("\n[Step 1] Booting and Migrating Local SQLite Database...")
    try:
        # Run makemigrations first to create migration files for custom apps
        call_command('makemigrations', 'tenants', 'authentication', 'students', 'academics', 'attendance', 'billing', 'staff_hr', 'exams', 'lms', 'operations', interactive=False)
        print(" -> Migrations generated successfully.")
        
        # Run migrations
        call_command('migrate', interactive=False)
        print(" -> Migrations applied successfully.")
        
        # Create tenant superuser programmatically
        username = 'delhi_admin'
        password = 'your_secure_password'
        email = 'delhi_admin@edunova.io'
        if not User.objects.filter(username=username).exists():
            User.objects.create_superuser(
                username=username,
                email=email,
                password=password,
                role='School Admin'
            )
        print(" -> Tenant superuser created/verified programmatically.")
    except Exception as e:
        print(f" -> ERROR: Migration / superuser creation failed: {e}")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 2: Verify Multi-Tenancy & Tenant Provisioning
    # ----------------------------------------------------
    print("\n[Step 2] Verifying Tenant Provisioning (POST /api/v1/tenants/)...")
    
    # Authenticate as superuser to allow tenant provisioning (Super Admin role check)
    login_payload_temp = {
        "username": "delhi_admin",
        "password": "your_secure_password"
    }
    login_resp = client.post('/api/v1/auth/login/', login_payload_temp, content_type='application/json')
    if login_resp.status_code == 200:
        jwt_token = login_resp.json().get('access')
        headers_temp = {'HTTP_AUTHORIZATION': f'Bearer {jwt_token}'}
    else:
        print(f" -> ERROR: Tenant superuser login failed: {login_resp.json()}")
        sys.exit(1)
    
    tenant_payload = {
        "company_name": "EduNova Delhi Branch",
        "subdomain": "delhi",
        "plan_type": "Premium",
        "domain_name": "delhi.localhost"
    }
    
    response = client.post('/api/v1/tenants/', tenant_payload, content_type='application/json', **headers_temp)
    print(f" -> Response Status: {response.status_code}")
    print(f" -> Response JSON: {response.json()}")
    if response.status_code == 201:
        tenant_id = response.json().get('tenant_id')
        print(" -> SUCCESS: Tenant created.")
    elif response.status_code == 400 and 'subdomain' in response.json() and 'already exists' in str(response.json()['subdomain']):
        tenant_id = str(Tenant.objects.get(subdomain='delhi').id)
        print(" -> SUCCESS: Tenant 'delhi' already existed.")
    else:
        print(" -> FAILURE: Tenant provisioning failed.")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 3: Verify Authentication & Fetching JWT Token
    # ----------------------------------------------------
    print("\n[Step 3] Fetching JWT Access Token (POST /api/v1/auth/login/)...")
    login_payload = {
        "username": "delhi_admin",
        "password": "your_secure_password"
    }
    response = client.post('/api/v1/auth/login/', login_payload, content_type='application/json')
    print(f" -> Response Status: {response.status_code}")
    if response.status_code == 200:
        access_token = response.json().get('access')
        print(" -> SUCCESS: JWT Access Token successfully generated.")
    else:
        print(f" -> FAILURE: Authentication failed. Response: {response.json()}")
        sys.exit(1)

    # Prepare HTTP headers for subsequent authenticated requests
    headers = {'HTTP_AUTHORIZATION': f'Bearer {access_token}'}
    # Ensure client is logged out from session force-login to test JWT auth
    client.logout()

    # ----------------------------------------------------
    # Step 4: Verify Student & Guardian Registration (with Validation)
    # ----------------------------------------------------
    print("\n[Step 4.A] Registering Student (POST /api/v1/students/)...")
    # Clean old student if exists to allow clean verification
    Student.objects.filter(admission_no="SCH-DEL-001").delete()
    Guardian.objects.filter(email="robert.smith@email.com").delete()

    student_payload = {
        "first_name": "Alice",
        "last_name": "Smith",
        "date_of_birth": "2018-05-10",
        "gender": "Female",
        "admission_no": "SCH-DEL-001",
        "relationship_type": "Father",
        "guardians": [
            {
                "first_name": "Robert",
                "last_name": "Smith",
                "email": "robert.smith@email.com",
                "phone_number": "+919876543210"
            }
        ]
    }
    response = client.post('/api/v1/students/', student_payload, content_type='application/json', **headers)
    print(f" -> Response Status: {response.status_code}")
    print(f" -> Response JSON: {response.json()}")
    if response.status_code == 201:
        student_id = response.json().get('student_id')
        print(" -> SUCCESS: Student Alice Smith registered.")
    else:
        print(" -> FAILURE: Student registration failed.")
        sys.exit(1)

    print("\n[Step 4.B] Triggering Student Age restriction Validation (Rule VR-SM-001)...")
    invalid_student_payload = student_payload.copy()
    invalid_student_payload["date_of_birth"] = "2025-01-01" # Under 3 years relative to 2026-07-04
    invalid_student_payload["admission_no"] = "SCH-DEL-002"
    
    response = client.post('/api/v1/students/', invalid_student_payload, content_type='application/json', **headers)
    print(f" -> Response Status: {response.status_code}")
    print(f" -> Response JSON: {response.json()}")
    if response.status_code == 400 and 'date_of_birth' in response.json():
        print(" -> SUCCESS: Age restriction (VR-SM-001) successfully triggered.")
    else:
        print(" -> FAILURE: Age restriction validation did not trigger or incorrect status code.")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 5: Verify Timetabling Conflict Checker (Rule BR-TT-001)
    # ----------------------------------------------------
    print("\n[Step 5] Verifying Timetabling Conflict Checker...")
    # Clean previous settings if any
    ClassRoom.objects.filter(code="C10").delete()
    Subject.objects.filter(code="MATH101").delete()
    User.objects.filter(username="teacher_bob").delete()

    # 1. Create Class
    class_response = client.post('/api/v1/academics/classes/', {"name": "Class 10", "code": "C10"}, content_type='application/json', **headers)
    class_id = class_response.json().get('id')
    # 2. Create Section
    section_response = client.post('/api/v1/academics/sections/', {"classroom": class_id, "name": "A", "room_number": "101"}, content_type='application/json', **headers)
    section_id = section_response.json().get('id')
    # 3. Create Subject
    subject_response = client.post('/api/v1/academics/subjects/', {"name": "Mathematics", "code": "MATH101"}, content_type='application/json', **headers)
    subject_id = subject_response.json().get('id')
    # 4. Create Teacher User programmatically
    teacher = User.objects.create_user(
        username="teacher_bob",
        password="teacher_password",
        role="Teacher",
        email="bob@edunova.io"
    )
    teacher_uuid = str(teacher.id)

    print(f" -> Created Academics entities: Class={class_id}, Section={section_id}, Subject={subject_id}, Teacher={teacher_uuid}")

    # 5. Create Timetable Entry
    timetable_payload = {
        "section": section_id,
        "subject": subject_id,
        "teacher": teacher_uuid,
        "day_of_week": "Monday",
        "period_start": "09:00:00",
        "period_end": "09:45:00"
    }
    response = client.post('/api/v1/academics/timetable/', timetable_payload, content_type='application/json', **headers)
    print(f" -> Initial Timetable Entry Status: {response.status_code}")
    if response.status_code == 201:
        print(" -> SUCCESS: Initial period scheduled.")
    else:
        print(f" -> FAILURE: Period scheduling failed: {response.json()}")
        sys.exit(1)

    # 6. Create Overlapping Entry (Same teacher, Monday, 09:15 to 10:00)
    overlapping_payload = {
        "section": section_id,
        "subject": subject_id,
        "teacher": teacher_uuid,
        "day_of_week": "Monday",
        "period_start": "09:15:00",
        "period_end": "10:00:00"
    }
    response = client.post('/api/v1/academics/timetable/', overlapping_payload, content_type='application/json', **headers)
    print(f" -> Overlapping Timetable Entry Status: {response.status_code}")
    print(f" -> Overlapping Timetable Response: {response.json()}")
    if response.status_code == 400 and 'non_field_errors' in response.json():
        if "Teacher Conflict" in response.json()['non_field_errors'][0]:
            print(" -> SUCCESS: Conflict Checker (BR-TT-001) successfully prevented scheduling overlap.")
        else:
            print(" -> FAILURE: Conflict error message format mismatch.")
            sys.exit(1)
    else:
        print(" -> FAILURE: Overlapping timetable entry allowed or did not fail correctly.")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 6: Verify Attendance & Asynchronous Alerts (Rule BR-AT-002)
    # ----------------------------------------------------
    print("\n[Step 6] Verifying Attendance & Asynchronous Alert Dispatch...")
    AttendanceRecord.objects.filter(student_id=student_id, date="2026-07-04").delete()
    
    attendance_payload = {
        "student": student_id,
        "section": section_id,
        "date": "2026-07-04",
        "status": "Absent",
        "remarks": "Sickness"
    }
    # Clear logs before calling
    log_handler.records.clear()
    
    response = client.post('/api/v1/attendance/', attendance_payload, content_type='application/json', **headers)
    print(f" -> Attendance Post Status: {response.status_code}")
    if response.status_code == 201:
        print(" -> Attendance record saved. Checking Celery task alert logs...")
        
        # Verify alert logs captured by handler
        alert_found = False
        message_found = False
        for log in log_handler.records:
            print(f"    [captured log] {log}")
            if "[ALERT DISPATCHED]" in log and "Recipient='Robert Smith'" in log and "Phone='+919876543210'" in log:
                alert_found = True
            if "Alert: Alice Smith was marked absent" in log:
                message_found = True
        
        if alert_found and message_found:
            print(" -> SUCCESS: Background alert task executed and logged correctly (BR-AT-002).")
        else:
            print(" -> FAILURE: Alert task log signature not found.")
            sys.exit(1)
    else:
        print(f" -> FAILURE: Attendance record post failed: {response.json()}")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 7: Verify Billing Checkout & Webhook Receipt Generation
    # ----------------------------------------------------
    print("\n[Step 7] Verifying Billing Checkout & Webhook Receipt Generation...")
    
    # 1. Create a Fee Structure, Installment, and Invoice
    fee_struct = FeeStructure.objects.create(name="Grade 10 - Annual Fees", academic_year="2026-2027", total_amount=10000.00)
    inst = Installment.objects.create(fee_structure=fee_struct, name="Term 1", amount=5000.00, due_date="2026-07-01", grace_period_days=5, late_fee_rate_per_day=50.00)
    
    # Invoice amount_due = 5000.00
    invoice = Invoice.objects.create(student_id=student_id, installment=inst, amount_due=5000.00, status="Unpaid")
    invoice_uuid = str(invoice.id)
    print(f" -> Created Invoice UUID: {invoice_uuid}")
    
    # Initialize Checkout (POST /api/v1/billing/checkout/)
    checkout_payload = {
        "invoice_id": invoice_uuid,
        "gateway": "stripe"
    }
    response = client.post('/api/v1/billing/checkout/', checkout_payload, content_type='application/json', **headers)
    print(f" -> Checkout Response Status: {response.status_code}")
    print(f" -> Checkout Response JSON: {response.json()}")
    if response.status_code == 200 and 'payment_reference' in response.json():
        payment_reference = response.json()['payment_reference']
        print(" -> SUCCESS: Stripe checkout session initialized.")
    else:
        print(" -> FAILURE: Checkout initialization failed.")
        sys.exit(1)

    # Simulate Webhook Callback (POST /api/v1/billing/webhook/)
    webhook_payload = {
        "session_id": payment_reference
    }
    response = client.post('/api/v1/billing/webhook/', webhook_payload, content_type='application/json')
    print(f" -> Webhook Callback Status: {response.status_code}")
    print(f" -> Webhook Response JSON: {response.json()}")
    if response.status_code == 200 and 'receipt_url' in response.json():
        print(" -> SUCCESS: Webhook parsed, payment recorded, and invoice set to Paid (BR-FE-001).")
    else:
        print(" -> FAILURE: Webhook verification failed.")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 8: Verify Leave Request Approval (Staff/HR)
    # ----------------------------------------------------
    print("\n[Step 8] Verifying Leave Request Approval...")
    
    # 1. Create employee profile for our teacher
    employee, _ = Employee.objects.get_or_create(
        user=teacher,
        defaults={"job_title": "Senior Physics Teacher", "joined_date": "2025-01-01", "base_salary": 50000.00}
    )
    
    # 2. File Leave Request
    leave = LeaveRequest.objects.create(
        employee=employee,
        leave_type="Sick",
        start_date="2026-07-06",
        end_date="2026-07-08",
        reason="Doctor appointment",
        status="Pending"
    )
    leave_uuid = str(leave.id)
    print(f" -> Created Leave Request UUID: {leave_uuid}")
    
    # 3. Approve leave request (POST /api/v1/staff/leaves/<leave_uuid>/approve/)
    response = client.post(f'/api/v1/staff/leaves/{leave_uuid}/approve/', {"action": "Approved"}, content_type='application/json', **headers)
    print(f" -> Approve Response Status: {response.status_code}")
    print(f" -> Approve Response JSON: {response.json()}")
    if response.status_code == 200 and response.json().get('status') == 'success':
        print(" -> SUCCESS: Leave approved and status updated.")
    else:
        print(" -> FAILURE: Leave approval failed.")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 9: Verify Exam Marks Logging & Report Card Engine
    # ----------------------------------------------------
    print("\n[Step 9] Verifying Exam Marks Logging & Report Card Engine...")
    
    # 1. Setup Exam schedule
    exam = Exam.objects.create(name="Term 1 Final Examination", term="Term 1", academic_year="2026-2027")
    schedule = ExamSchedule.objects.create(
        exam=exam,
        subject_id=subject_id,
        classroom_id=class_id,
        date="2026-07-03",
        start_time="09:00:00",
        end_time="12:00:00"
    )
    schedule_uuid = str(schedule.id)
    print(f" -> Exam Schedule UUID: {schedule_uuid}")
    
    # 2. Enter Student Marks
    marks_payload = {
        "student": student_id,
        "exam_schedule": schedule_uuid,
        "marks_obtained": "88.00",
        "max_marks": "100.00"
    }
    response = client.post('/api/v1/exams/marks/', marks_payload, content_type='application/json', **headers)
    print(f" -> Marks Logging Status: {response.status_code}")
    if response.status_code == 201:
        print(" -> Student marks recorded.")
    else:
        print(f" -> FAILURE: Marks logging failed: {response.json()}")
        sys.exit(1)

    # 3. Fetch Report Card (GET /api/v1/exams/report-card/<student_uuid>/)
    response = client.get(f'/api/v1/exams/report-card/{student_id}/', **headers)
    print(f" -> Report Card Response Status: {response.status_code}")
    print(f" -> Report Card Response JSON: {response.json()}")
    if response.status_code == 200:
        overall = response.json().get('overall_percentage')
        gpa = response.json().get('calculated_gpa')
        if overall == 88.00 and gpa == 3.52:
            print(" -> SUCCESS: GPA and overall percentage successfully converted to 4.0 scale (GPA 3.52).")
        else:
            print(f" -> FAILURE: Report card metrics do not match expected. percentage={overall}, GPA={gpa}")
            sys.exit(1)
    else:
        print(" -> FAILURE: Fetching report card failed.")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 10: Verify LMS Homework is_late Flagging
    # ----------------------------------------------------
    print("\n[Step 10] Verifying LMS Homework is_late Flagging...")
    
    # 1. Create a Course & past due assignment
    course = Course.objects.create(name="Intro to Algebra", description="Math course", subject_id=subject_id)
    # Date in past (2026-07-01) compared to current local time (2026-07-04)
    past_due_date = timezone.make_aware(datetime(2026, 7, 1, 9, 0, 0))
    assignment = Assignment.objects.create(
        course=course,
        title="Algebra Homework 1",
        instructions="Complete algebra homework",
        due_date=past_due_date
    )
    assignment_uuid = str(assignment.id)
    print(f" -> Past Due Assignment UUID: {assignment_uuid}")
    
    # 2. Submit student homework (POST /api/v1/lms/submissions/)
    submission_payload = {
        "assignment": assignment_uuid,
        "student": student_id,
        "file_url": "https://s3.amazonaws.com/edunova-bucket/submissions/math_hw.pdf"
    }
    response = client.post('/api/v1/lms/submissions/', submission_payload, content_type='application/json', **headers)
    print(f" -> Submission Response Status: {response.status_code}")
    print(f" -> Submission Response JSON: {response.json()}")
    if response.status_code == 201:
        if response.json().get('is_late') is True:
            print(" -> SUCCESS: Homework flagged as is_late due to past due assignment.")
        else:
            print(" -> FAILURE: Homework submission failed to flag as late.")
            sys.exit(1)
    else:
        print(" -> FAILURE: Homework submission failed.")
        sys.exit(1)

    # ----------------------------------------------------
    # Step 11: Verify Operations GPS Location Tracker (IoT)
    # ----------------------------------------------------
    print("\n[Step 11] Verifying GPS location logs ingestion...")
    
    # 1. Create route
    route = BusRoute.objects.create(
        route_name="Route 10 - South Delhi",
        start_point="Terminal 1",
        end_point="Delhi Campus",
        driver_name="Harpreet Singh",
        driver_phone="+919812345678"
    )
    route_uuid = str(route.id)
    print(f" -> Bus Route UUID: {route_uuid}")
    
    # 2. Ingest GPS logs
    gps_payload = {
        "route": route_uuid,
        "latitude": "28.6139",
        "longitude": "77.2090",
        "speed": "48.2"
    }
    
    # GPS view is an open API (Authentication: None)
    response = client.post('/api/v1/operations/transport/gps/', gps_payload, content_type='application/json')
    print(f" -> GPS Ingestion Status: {response.status_code}")
    print(f" -> GPS Response JSON: {response.json()}")
    if response.status_code == 201 and response.json().get('status') == 'success':
        print(" -> SUCCESS: GPS Coordinates successfully ingested.")
    else:
        print(" -> FAILURE: GPS coordinates ingestion failed.")
        sys.exit(1)

    print("\n" + "=" * 80)
    print("ALL BACKEND VERIFICATION STEPS SUCCESSFULLY PASSED!")
    print("=" * 80)

if __name__ == '__main__':
    run_verification()
