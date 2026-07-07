import { Route, Routes, useLocation } from 'react-router-dom'
import { ReactNode, useEffect } from 'react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import Home from '@/pages/Home'
import About from '@/pages/About'
import Admissions from '@/pages/Admissions'
import Academics from '@/pages/Academics'
import Facilities from '@/pages/Facilities'
import Faculty from '@/pages/Faculty'
import Contact from '@/pages/Contact'
import FAQ from '@/pages/FAQ'
import Login from '@/pages/Login'
import ComingSoon from '@/pages/ComingSoon'
import Departments from '@/pages/Departments'
import DepartmentSingle from '@/pages/DepartmentSingle'
import { AuthProvider } from '@/lib/auth'
import AdminGuard from '@/pages/admin/AdminGuard'
import AdminDashboard from '@/pages/admin/Dashboard'
import AdminUsers from '@/pages/admin/Users'
import { PlaceholderPage } from '@/pages/admin/Placeholders'
import AdminStudents from '@/pages/admin/Students'
import AdminTimetable from '@/pages/admin/Timetable'
import AdminAttendance from '@/pages/admin/Attendance'
import AdminFinance from '@/pages/admin/Finance'
import AdminExams from '@/pages/admin/Exams'
import AdminLMS from '@/pages/admin/LMS'
import AdminStaff from '@/pages/admin/Staff'
import AdminOperations from '@/pages/admin/Operations'
import Infrastructure from '@/pages/Infrastructure'
import Library from '@/pages/Library'
import Transport from '@/pages/Transport'
import Hostel from '@/pages/Hostel'
import Sports from '@/pages/Sports'
import Achievements from '@/pages/Achievements'
import Careers from '@/pages/Careers'
import Downloads from '@/pages/Downloads'
import StudentLife from '@/pages/StudentLife'
import Events from '@/pages/Events'
import Gallery from '@/pages/Gallery'
import News from '@/pages/News'
import Privacy from '@/pages/Privacy'
import Terms from '@/pages/Terms'

function ScrollToTop() {
  const { pathname } = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [pathname])
  return null
}

function SiteLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <Navbar />
      <main className="flex-1">{children}</main>
      <Footer />
    </div>
  )
}

export default function App() {
  return (
    <AuthProvider>
      <>
      <ScrollToTop />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          path="/*"
          element={
            <SiteLayout>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/academics" element={<Academics />} />
                <Route path="/facilities" element={<Facilities />} />
                <Route path="/faculty" element={<Faculty />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/faq" element={<FAQ />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/departments/:slug" element={<DepartmentSingle />} />
                <Route path="/admin" element={<AdminGuard />}> 
                  <Route index element={<AdminDashboard />} />
                  <Route path="users" element={<AdminUsers />} />
                  <Route path="students" element={<AdminStudents />} />
                  <Route path="departments" element={<PlaceholderPage title="Departments (admin)" />} />
                  <Route path="courses" element={<PlaceholderPage title="Courses (admin)" />} />
                  <Route path="timetable" element={<AdminTimetable />} />
                  <Route path="attendance" element={<AdminAttendance />} />
                  <Route path="finance" element={<AdminFinance />} />
                  <Route path="exams" element={<AdminExams />} />
                  <Route path="lms" element={<AdminLMS />} />
                  <Route path="staff" element={<AdminStaff />} />
                  <Route path="operations" element={<AdminOperations />} />
                  <Route path="notifications" element={<PlaceholderPage title="Notifications (admin)" />} />
                  <Route path="settings" element={<PlaceholderPage title="Settings" />} />
                </Route>
                <Route path="/infrastructure" element={<Infrastructure />} />
                <Route path="/library" element={<Library />} />
                <Route path="/transport" element={<Transport />} />
                <Route path="/hostel" element={<Hostel />} />
                <Route path="/sports" element={<Sports />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/careers" element={<Careers />} />
                <Route path="/downloads" element={<Downloads />} />
                <Route path="/student-life" element={<StudentLife />} />
                <Route path="/events" element={<Events />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="/news" element={<News />} />
                <Route path="/privacy" element={<Privacy />} />
                <Route path="/terms" element={<Terms />} />
                <Route path="*" element={<ComingSoon title="Page not found" />} />
              </Routes>
            </SiteLayout>
          }
        />
      </Routes>
      </>
    </AuthProvider>
  )
}
