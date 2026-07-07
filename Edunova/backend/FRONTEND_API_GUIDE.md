# EduNova School ERP & LMS — Frontend Integration Guide

Welcome to the EduNova integration guide. This document outlines the API endpoints, request payloads, response structures, authentication headers, and business rule responses to help the frontend team build the portals (Super Admin, School Admin, Principal, Teacher, Student, Parent, Accountant, HR Manager).

---

## 1. Global Setup & Domain Routing

EduNova utilizes a **Multi-Tenant Schema Architecture** resolved via subdomains.
- **Global / Public Endpoints** (e.g. provisioning new tenants): Route directly to the public domain.
  - Base URL: `http://localhost:8000`
- **Tenant-Specific Portals**: Route to the school's resolved subdomain.
  - Base URL format: `http://<subdomain>.localhost:8000` (e.g., `http://delhi-branch.localhost:8000`)

---

## 2. Authentication & Authorization

All tenant-specific APIs (except login and webhooks) require the JWT header:
```http
Authorization: Bearer <your_access_token>
```

### A. Login User
- **Endpoint**: `POST /api/v1/auth/login/`
- **Authentication**: `None`
- **Request Body**:
  ```json
  {
    "username": "teacher_alice",
    "password": "securepassword123"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "access": "eyJhbGciOiJSUzI1NiIsIn...",
    "refresh": "eyJhbGciOiJSUzI1NiIsIn..."
  }
  ```
- **Token Claims Decoded (JWT Payload)**:
  The access token contains custom claims for routing dashboards dynamically:
  ```json
  {
    "role": "Teacher", // Super Admin, School Admin, Teacher, Student, Parent, Accountant, HR Manager
    "username": "teacher_alice",
    "email": "alice@edunova.com"
  }
  ```

### B. Fetch User Profile
- **Endpoint**: `GET /api/v1/auth/profile/`
- **Response (200 OK)**:
  ```json
  {
    "id": "e45a230f-b230-4e12-ac7f-8d99cba45091",
    "username": "teacher_alice",
    "email": "alice@edunova.com",
    "role": "Teacher",
    "phone_number": "+919876543210",
    "is_otp_verified": false
  }
  ```

---

## 3. Tenant Management (SaaS Admin)

- **Endpoint**: `POST http://localhost:8000/api/v1/tenants/`
- **Required Role**: `Super Admin`
- **Request Body**:
  ```json
  {
    "company_name": "EduNova Global Academy Chennai",
    "subdomain": "chennai-branch",
    "plan_type": "Premium",
    "domain_name": "chennai-branch.localhost"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "Tenant 'EduNova Global Academy Chennai' provisioned successfully.",
    "tenant_id": "4c3d2e1f-7b6a-9f8e-7d6c-5b4a3c2b1a0f",
    "schema_name": "chennai_branch"
  }
  ```

---

## 4. Student & Guardian Registry

- **Endpoint**: `POST /api/v1/students/`
- **Required Role**: `School Admin` or `Registrar Staff`
- **Request Body**:
  ```json
  {
    "first_name": "John",
    "last_name": "Doe",
    "date_of_birth": "2018-05-15",
    "gender": "Male",
    "admission_no": "SCH-DEL-1042",
    "relationship_type": "Father",
    "guardians": [
      {
        "first_name": "Robert",
        "last_name": "Doe",
        "email": "robert.doe@email.com",
        "phone_number": "+919876543210",
        "occupation": "Analyst"
      }
    ]
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "Student profile created successfully.",
    "student_id": "e45a230f-...",
    "admission_no": "SCH-DEL-1042"
  }
  ```
- **Validation Faults**:
  - If Student Age is `< 3` (Rule `VR-SM-001`): `400 Bad Request` -> `{"date_of_birth": ["Minimum age for student admission is 3 years."]}`
  - If `guardians` array is empty (Rule `BR-SM-001`): `400 Bad Request` -> `{"non_field_errors": ["A student must be registered with at least one guardian profile."]}`

---

## 5. Timetabling Conflict Checker

- **Endpoint**: `POST /api/v1/academics/timetable/`
- **Required Role**: `School Admin` or `Vice Principal`
- **Request Body**:
  ```json
  {
    "section": "1a2b3c4d-...", // Section UUID
    "subject": "5e6f7g8h-...", // Subject UUID
    "teacher": "e45a230f-...", // Custom User (Teacher role) UUID
    "day_of_week": "Monday",
    "period_start": "09:00:00",
    "period_end": "09:45:00"
  }
  ```
- **Validation Overlap Faults (Rule BR-TT-001)**:
  - If the teacher is already busy during this time standard slot: `400 Bad Request` -> `{"non_field_errors": ["Teacher Conflict: The assigned teacher is already scheduled for another class during this period."]}`
  - If the class room is occupied: `400 Bad Request` -> `{"non_field_errors": ["Section Conflict: This class section is already scheduled for another subject during this period."]}`

---

## 6. Attendance marking & Notifications

- **Endpoint**: `POST /api/v1/attendance/`
- **Required Role**: `Teacher`
- **Request Body**:
  ```json
  {
    "student": "9f8e7d6c-...", // Student UUID
    "section": "1a2b3c4d-...", // Section UUID
    "date": "2026-07-04",
    "status": "Absent", // Present, Absent, Late
    "remarks": "Flu symptoms"
  }
  ```
- **Asynchronous Side Effect (Rule BR-AT-002)**:
  Setting status to `"Absent"` schedules a background Celery task to verify parent details and dispatch SMS/WhatsApp notifications within the 15-minute SLA limit.

---

## 7. Fees, Invoices, and Checkout

### A. Initialize Checkout
- **Endpoint**: `POST /api/v1/billing/checkout/`
- **Required Role**: `Parent`
- **Request Body**:
  ```json
  {
    "invoice_id": "8f7e6d5c-...", // Invoice UUID
    "gateway": "stripe", // stripe, razorpay
    "payment_method": "Card"
  }
  ```
- **Response (200 OK)**:
  ```json
  {
    "status": "success",
    "payment_reference": "sess_a8b9c0d1...",
    "checkout_data": {
      "session_id": "sess_a8b9c0d1...",
      "checkout_url": "https://checkout.stripe.com/pay/sess_a8b9c0d1..."
    }
  }
  ```
  *(Redirect parent user's web page directly to the `checkout_url`)*

### B. List Fee Defaulters
- **Endpoint**: `GET /api/v1/billing/defaulters/`
- **Required Role**: `Accountant` or `Principal`
- **Response (200 OK)**:
  List of all outstanding invoices whose due date is past today:
  ```json
  [
    {
      "id": "8f7e6d5c-...",
      "student": "9f8e7d6c-...",
      "student_name": "Alice",
      "installment": "5e6f7g8h-...",
      "installment_name": "Grade 10 Annual Fees - Term 1",
      "amount_due": "5000.00",
      "late_fee_accumulated": "250.00", // Dynamically updated daily (Rule BR-FE-002)
      "status": "Unpaid"
    }
  ]
  ```

---

## 8. Staff & HR Operations

- **Endpoint**: `POST /api/v1/staff/leaves/`
- **Required Role**: `Teacher`, `Accountant`, `HR Manager`
- **Request Body**:
  ```json
  {
    "employee": "7f8e9d0c-...",
    "leave_type": "Sick", // Sick, Casual, Maternity, Sabbatical
    "start_date": "2026-07-06",
    "end_date": "2026-07-08",
    "reason": "Doctor appointment"
  }
  ```

- **Approve Leave Request**:
  - **Endpoint**: `POST /api/v1/staff/leaves/<uuid:pk>/approve/`
  - **Required Role**: `HR Manager`
  - **Request Body**:
    ```json
    {
      "action": "Approved" // Approved, Rejected
    }
    ```

---

## 9. Examinations & Gradebook

### A. Enter Student Marks
- **Endpoint**: `POST /api/v1/exams/marks/`
- **Required Role**: `Teacher`
- **Request Body**:
  ```json
  {
    "student": "9f8e7d6c-...",
    "exam_schedule": "3b2c1a0f-...",
    "marks_obtained": "85.00",
    "max_marks": "100.00",
    "remarks": "Excellent work"
  }
  ```
  *(Grades are calculated dynamically on the server: `A+` down to `F`)*

### B. Generate Student Report Card
- **Endpoint**: `GET /api/v1/exams/report-card/<uuid:student_id>/`
- **Required Role**: `Teacher`, `Parent`, `Student`
- **Response (200 OK)**:
  ```json
  {
    "student_id": "9f8e7d6c-...",
    "overall_percentage": 85.00,
    "calculated_gpa": 3.4, // Maps to 4.0 scale dynamically
    "subjects_breakdown": [
      {
        "id": "e45a230f-...",
        "student_name": "Alice",
        "subject_name": "Mathematics",
        "marks_obtained": "85.00",
        "max_marks": "100.00",
        "grade": "A",
        "remarks": "Excellent work"
      }
    ]
  }
  ```

---

## 10. LMS Assignments & Submissions

- **Endpoint**: `POST /api/v1/lms/submissions/`
- **Required Role**: `Student`
- **Request Body**:
  ```json
  {
    "assignment": "5c6d7e8f-...",
    "student": "9f8e7d6c-...",
    "file_url": "https://s3.amazonaws.com/edunova-bucket/submissions/math_hw_alice.pdf"
  }
  ```
- **Response (210 Created)**:
  ```json
  {
    "status": "success",
    "message": "Assignment submitted successfully.",
    "submission_id": "a1b2c3d4-...",
    "is_late": true // Evaluates against assignment's due_date parameters
  }
  ```

---

## 11. GPS Location Tracking (IoT Device)

- **Endpoint**: `POST /api/v1/operations/transport/gps/`
- **Authentication**: `None` (Device specific log key in production)
- **Request Body**:
  ```json
  {
    "route": "5e6f7g8h-...", // BusRoute UUID
    "latitude": "28.613900",
    "longitude": "77.209000",
    "speed": "45.5"
  }
  ```
- **Response (201 Created)**:
  ```json
  {
    "status": "success",
    "message": "GPS coordinates ingested."
  }
  ```
