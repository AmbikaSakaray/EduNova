export const API_BASE = import.meta.env.VITE_API_BASE_URL || window.location.origin

type LoginResponse = {
  access: string
  refresh: string
}

export async function login(username: string, password: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/v1/auth/login/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  })

  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || err?.message || 'Login failed')
  }

  return res.json()
}

export async function refreshToken(refresh: string): Promise<LoginResponse> {
  const res = await fetch(`${API_BASE}/api/v1/auth/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh }),
  })
  if (!res.ok) throw new Error('Failed to refresh token')
  return res.json()
}

export function logout() {
  try {
    localStorage.removeItem('edunova_access')
    localStorage.removeItem('edunova_refresh')
  } catch (e) {}
}

function authHeaders(): Record<string, string> {
  const token = localStorage.getItem('edunova_access')
  const headers: Record<string, string> = { 'Content-Type': 'application/json' }
  if (token) headers.Authorization = `Bearer ${token}`
  return headers
}

// Users CRUD
export async function getUsers() {
  const res = await fetch(`${API_BASE}/api/v1/users/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed to list users: ${res.status}`)
  return res.json()
}

export async function createUser(payload: { username: string; email: string; password?: string; role?: string }) {
  const res = await fetch(`${API_BASE}/api/v1/users/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || JSON.stringify(err) || `Create failed: ${res.status}`)
  }
  return res.json()
}

export async function updateUser(id: string | number, payload: Partial<{ username: string; email: string; role: string }>) {
  const res = await fetch(`${API_BASE}/api/v1/users/${id}/`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || JSON.stringify(err) || `Update failed: ${res.status}`)
  }
  return res.json()
}

export async function deleteUserApi(id: string | number) {
  const res = await fetch(`${API_BASE}/api/v1/users/${id}/`, { method: 'DELETE', headers: authHeaders() })
  if (!res.ok) {
    const err = await res.text().catch(() => null)
    throw new Error(err || `Delete failed: ${res.status}`)
  }
  return true
}

// Students & Guardians
export async function getStudents() {
  const res = await fetch(`${API_BASE}/api/v1/students/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed to list students: ${res.status}`)
  return res.json()
}

export async function createStudent(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/students/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || JSON.stringify(err) || `Create student failed: ${res.status}`)
  }
  return res.json()
}

export async function updateStudent(id: string | number, payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/students/${id}/`, { method: 'PATCH', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || JSON.stringify(err) || `Update student failed: ${res.status}`)
  }
  return res.json()
}

export async function deleteStudent(id: string | number) {
  const res = await fetch(`${API_BASE}/api/v1/students/${id}/`, { method: 'DELETE', headers: authHeaders() })
  if (!res.ok) {
    const err = await res.text().catch(() => null)
    throw new Error(err || `Delete failed: ${res.status}`)
  }
  return true
}

// Timetable
export async function createTimetable(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/academics/timetable/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.non_field_errors?.[0] || JSON.stringify(err) || `Timetable create failed: ${res.status}`)
  }
  return res.json()
}

// Attendance
export async function postAttendance(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/attendance/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || JSON.stringify(err) || `Attendance failed: ${res.status}`)
  }
  return res.json()
}

// Billing
export async function initCheckout(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/billing/checkout/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) {
    const err = await res.json().catch(() => null)
    throw new Error(err?.detail || JSON.stringify(err) || `Checkout failed: ${res.status}`)
  }
  return res.json()
}

export async function getDefaulters() {
  const res = await fetch(`${API_BASE}/api/v1/billing/defaulters/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed to list defaulters: ${res.status}`)
  return res.json()
}

// Exams
export async function getExams() {
  const res = await fetch(`${API_BASE}/api/v1/exams/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed to list exams: ${res.status}`)
  return res.json()
}

export async function createExam(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/exams/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) { const err = await res.json().catch(() => null); throw new Error(err?.detail || JSON.stringify(err) || `Failed: ${res.status}`) }
  return res.json()
}

export async function getExamSchedules() {
  const res = await fetch(`${API_BASE}/api/v1/exams/schedules/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function getMarks() {
  const res = await fetch(`${API_BASE}/api/v1/exams/marks/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function createMark(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/exams/marks/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) { const err = await res.json().catch(() => null); throw new Error(err?.detail || JSON.stringify(err) || `Failed: ${res.status}`) }
  return res.json()
}

export async function getReportCard(studentId: string) {
  const res = await fetch(`${API_BASE}/api/v1/exams/report-card/${studentId}/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

// LMS
export async function getCourses() {
  const res = await fetch(`${API_BASE}/api/v1/lms/courses/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function createCourse(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/lms/courses/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) { const err = await res.json().catch(() => null); throw new Error(err?.detail || JSON.stringify(err) || `Failed: ${res.status}`) }
  return res.json()
}

export async function getAssignments() {
  const res = await fetch(`${API_BASE}/api/v1/lms/assignments/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function createAssignment(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/lms/assignments/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) { const err = await res.json().catch(() => null); throw new Error(err?.detail || JSON.stringify(err) || `Failed: ${res.status}`) }
  return res.json()
}

// Staff HR
export async function getEmployees() {
  const res = await fetch(`${API_BASE}/api/v1/staff/employees/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function createEmployee(payload: any) {
  const res = await fetch(`${API_BASE}/api/v1/staff/employees/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify(payload) })
  if (!res.ok) { const err = await res.json().catch(() => null); throw new Error(err?.detail || JSON.stringify(err) || `Failed: ${res.status}`) }
  return res.json()
}

export async function getLeaveRequests() {
  const res = await fetch(`${API_BASE}/api/v1/staff/leaves/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function approveLeave(id: string) {
  const res = await fetch(`${API_BASE}/api/v1/staff/leaves/${id}/approve/`, { method: 'POST', headers: authHeaders(), body: JSON.stringify({ action: 'Approved' }) })
  if (!res.ok) { const err = await res.json().catch(() => null); throw new Error(err?.detail || `Failed: ${res.status}`) }
  return res.json()
}

export async function getPayroll() {
  const res = await fetch(`${API_BASE}/api/v1/staff/payroll/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

// Operations
export async function getLibraryIssues() {
  const res = await fetch(`${API_BASE}/api/v1/operations/library/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function getBusRoutes() {
  const res = await fetch(`${API_BASE}/api/v1/operations/transport/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function getHostelRooms() {
  const res = await fetch(`${API_BASE}/api/v1/operations/hostel/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

// Academics
export async function getClasses() {
  const res = await fetch(`${API_BASE}/api/v1/academics/classes/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function getSections() {
  const res = await fetch(`${API_BASE}/api/v1/academics/sections/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function getSubjects() {
  const res = await fetch(`${API_BASE}/api/v1/academics/subjects/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export async function getTimetable() {
  const res = await fetch(`${API_BASE}/api/v1/academics/timetable/`, { headers: authHeaders() })
  if (!res.ok) throw new Error(`Failed: ${res.status}`)
  return res.json()
}

export function storeTokens({ access, refresh }: LoginResponse) {
  try {
    localStorage.setItem('edunova_access', access)
    localStorage.setItem('edunova_refresh', refresh)
  } catch (e) {
    // ignore storage errors
  }
}

export function decodeJwt(token: string | null) {
  if (!token) return null
  try {
    const parts = token.split('.')
    if (parts.length < 2) return null
    const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = payload + '='.repeat((4 - (payload.length % 4)) % 4)
    const json = atob(padded)
    return JSON.parse(json)
  } catch (e) {
    return null
  }
}

export async function fetchProfile() {
  const token = localStorage.getItem('edunova_access')
  const res = await fetch(`${API_BASE}/api/v1/auth/profile/`, {
    headers: { Authorization: `Bearer ${token}` },
  })
  if (res.status === 401) {
    // try refresh
    const refresh = localStorage.getItem('edunova_refresh')
    if (!refresh) throw new Error('Unauthorized')
    try {
      const data = await refreshToken(refresh)
      storeTokens(data)
      const retry = await fetch(`${API_BASE}/api/v1/auth/profile/`, {
        headers: { Authorization: `Bearer ${data.access}` },
      })
      if (!retry.ok) throw new Error('Failed to fetch profile')
      return retry.json()
    } catch (e) {
      throw new Error('Unauthorized')
    }
  }
  if (!res.ok) throw new Error('Failed to fetch profile')
  return res.json()
}
