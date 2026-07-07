// All copy below is derived from the EduNova Global Academy brand & requirements
// document (vision, mission, stats, programs, values, tech partners).

export const siteMeta = {
  name: 'EduNova',
  fullName: 'EduNova Global Academy Private Limited',
  tagline: 'Imagining tomorrow\'s academy today.',
  altTaglines: [
    'Future-ready learning for every student',
    'Innovation-led school experiences',
    'Where talent grows and leaders emerge',
    'Bold learning. Bright futures.',
  ],
  established: 2015,
  domain: 'edunovaacademy.edu.in',
  address: 'EduNova Global Academy Campus, Delhi, India',
  socialLinks: {
    facebook: 'https://facebook.com/edunovaacademy',
    twitter: 'https://twitter.com/edunovaacademy',
    linkedin: 'https://linkedin.com/company/edunova-global-academy',
    instagram: 'https://instagram.com/edunovaacademy',
  }
}

export const heroStats = [
  { value: '6,500+', label: 'Students' },
  { value: '350+', label: 'Teachers' },
  { value: '45+', label: 'Smart classrooms' },
  { value: '98%', label: 'Board results' },
]

export const businessStats = [
  { value: '6,500+', label: 'Students enrolled' },
  { value: '620+', label: 'Employees on staff' },
  { value: '350+', label: 'Qualified teachers' },
  { value: '45+', label: 'Smart classrooms' },
  { value: '18', label: 'Science labs' },
  { value: '6', label: 'Computer labs' },
  { value: '2', label: 'Innovation centers' },
  { value: '100%', label: 'Digital campus' },
]

export type Role = 'admin' | 'teacher' | 'student' | 'parent'

export const roleTabs: {
  id: Role
  label: string
  headline: string
  description: string
  points: string[]
}[] = [
  {
    id: 'admin',
    label: 'School Admin',
    headline: 'Run every department from one dashboard',
    description:
      'From admissions to payroll, give your leadership team a single connected view of the school — no more switching between spreadsheets and registers.',
    points: [
      'Manage students, staff, classes and sections in one place',
      'Build conflict-free timetables automatically',
      'Track fee collection and defaulters in real time',
      'Approve staff leave and run payroll without paperwork',
    ],
  },
  {
    id: 'teacher',
    label: 'Teacher',
    headline: 'Spend less time on admin, more time teaching',
    description:
      'Mark attendance, set assignments, grade submissions and enter exam marks — all from a single, fast workflow built for a teacher\u2019s day.',
    points: [
      'Digital attendance in under a minute per class',
      'Assignments and grading with due-date tracking',
      'Enter marks with grades calculated automatically',
      'View your timetable and apply for leave in a tap',
    ],
  },
  {
    id: 'student',
    label: 'Student',
    headline: 'Everything for your school day, in one app',
    description:
      'Timetable, homework, exam results and fee payments — always up to date, and always where you left them.',
    points: [
      'Check today\u2019s timetable and upcoming exams',
      'Submit assignments and track due dates',
      'View report cards and subject-wise grades',
      'Access the library and school announcements',
    ],
  },
  {
    id: 'parent',
    label: 'Parent',
    headline: 'Stay close to your child\u2019s school life',
    description:
      'Real-time attendance alerts, fee reminders, live bus tracking and direct teacher communication — from your phone.',
    points: [
      'Get notified the moment your child is marked absent',
      'Pay fees online and track upcoming installments',
      'Track the school bus live on its route',
      'Message teachers and book parent-teacher meetings',
    ],
  },
]

export const coreModules = [
  {
    title: 'Academics',
    description: 'Classes, sections, subjects and conflict-free timetabling for the whole school.',
    icon: 'BookOpen',
  },
  {
    title: 'Attendance',
    description: 'Digital daily attendance with instant parent notifications on absence.',
    icon: 'CalendarCheck2',
  },
  {
    title: 'Fee Management',
    description: 'Online checkout, installment tracking and automated defaulter lists.',
    icon: 'Wallet',
  },
  {
    title: 'Examinations',
    description: 'Marks entry, auto-calculated grades and downloadable report cards.',
    icon: 'GraduationCap',
  },
  {
    title: 'Learning Platform',
    description: 'Courses, lessons, assignments and submissions for blended learning.',
    icon: 'Laptop',
  },
  {
    title: 'HR & Payroll',
    description: 'Staff records, leave approvals and payroll processing in one workflow.',
    icon: 'Users',
  },
  {
    title: 'Transport',
    description: 'Live GPS bus tracking with route and pickup-point management.',
    icon: 'Bus',
  },
  {
    title: 'Library & Hostel',
    description: 'Book issue tracking, hostel room allocation and inventory records.',
    icon: 'Library',
  },
]

export const whyChoose = [
  'Smart campus with 100% digital operations',
  'AI-powered learning analytics',
  'Parent mobile app with real-time updates',
  'Secure online fee payments',
  'Digital attendance with instant alerts',
  'CBSE curriculum with international programs',
  'Robotics lab and STEM education',
  'Career counseling for every student',
  '24\u00d77 parent support',
]

export const academicPrograms = [
  'Pre Primary',
  'Middle School',
  'High School',
  'Senior Secondary',
  'Cambridge Curriculum',
  'CBSE',
  'International Programs',
  'STEM Education',
  'Skill Development',
]

export const departments = [
  'Academic Affairs',
  'Admissions',
  'Student Services',
  'Transport',
  'Library',
  'Finance',
  'Accounts',
  'Human Resources',
  'IT Department',
  'Examination Cell',
  'Sports',
  'Hostel',
  'Medical Center',
  'Research',
  'Innovation Lab',
]

export const coreValues = [
  'Academic Excellence',
  'Integrity',
  'Innovation',
  'Discipline',
  'Leadership',
  'Creativity',
  'Respect',
  'Responsibility',
  'Inclusiveness',
  'Continuous Learning',
]

export const techPartners = [
  'Google Workspace',
  'Microsoft Education',
  'AWS Educate',
  'Cisco Networking Academy',
  'Intel Education',
  'Adobe Creative Cloud',
  'Oracle Academy',
  'Zoom',
  'Moodle',
  'OpenAI Education',
]

export const testimonials = [
  {
    quote:
      'Attendance that used to take ten minutes of roll-call now takes under a minute, and parents get notified before the period even ends.',
    name: 'Senior Faculty',
    role: 'Middle School, EduNova',
  },
  {
    quote:
      'I can see every child\u2019s fee status, attendance and exam trend on one screen instead of chasing three different registers.',
    name: 'Academic Coordinator',
    role: 'EduNova Global Academy',
  },
  {
    quote:
      'The parent app finally gives us visibility — bus tracking, fee reminders and report cards, all without a single phone call to the office.',
    name: 'Parent',
    role: 'Grade 6 Guardian',
  },
]

export const faqs = [
  {
    q: 'Which boards and curricula does EduNova follow?',
    a: 'EduNova offers CBSE, Cambridge Curriculum and international programs across Pre Primary, Middle School, High School and Senior Secondary levels.',
  },
  {
    q: 'How does the fee payment process work?',
    a: 'Parents can pay fee installments online through a secure checkout. Outstanding invoices and any late fees are tracked automatically and visible in the parent portal.',
  },
  {
    q: 'How will I know if my child is absent?',
    a: 'The moment a teacher marks a student absent, an automated notification is sent to registered guardians by SMS/WhatsApp, well within the school\u2019s response window.',
  },
  {
    q: 'Can I track the school bus in real time?',
    a: 'Yes. Registered parents can track their child\u2019s bus route live on the transport module of the parent app.',
  },
  {
    q: 'How are exam results and report cards generated?',
    a: 'Teachers enter marks per subject; grades and GPA are calculated automatically and compiled into a downloadable report card for students and parents.',
  },
]

export const footerLinks = {
  platform: [
    { label: 'Academics', to: '/academics' },
    { label: 'Admissions', to: '/admissions' },
    { label: 'Facilities', to: '/facilities' },
    { label: 'Faculty', to: '/faculty' },
  ],
  company: [
    { label: 'About EduNova', to: '/about' },
    { label: 'News & Events', to: '/news' },
    { label: 'Gallery', to: '/gallery' },
    { label: 'Contact', to: '/contact' },
  ],
  resources: [
    { label: 'FAQs', to: '/faq' },
    { label: 'Privacy Policy', to: '/privacy' },
    { label: 'Terms & Conditions', to: '/terms' },
  ],
}
