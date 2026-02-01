# DPS - University Management System

A comprehensive, production-ready University Management System with advanced timetable scheduling, student management, and enterprise-grade features.

## 🌟 Features

### Core Modules

1. **Dashboard** - Overview with KPIs, charts, and quick actions
2. **Admission Management** - Online portal, merit lists, document verification
3. **Student Management** - Lifecycle management, attendance, leave management
4. **Academic Management** - Programs, courses, departments, rooms
5. **Advanced Timetable** ⭐ - Drag-and-drop scheduling with conflict detection
6. **Examinations** - Scheduling, mark entry, results, admit cards
7. **Study Materials** - Content library, assignments, submissions
8. **Fee Collection** - Payment processing, invoices, defaulter tracking
9. **Human Resources** - Faculty/staff management, payroll
10. **Attendance & Leave** - Biometric integration, approval workflows
11. **Accounts** - Income/expense tracking, ledger, budgeting
12. **Communication** - Email/SMS campaigns, announcements
13. **Library** - Catalog, circulation, RFID integration
14. **Inventory** - Stock management, purchase orders
15. **Hostels** - Room allocation, floor plans, visitor management
16. **Transport** - Route optimization, GPS tracking, vehicle management
17. **Front Desk** - Visitor management, token system
18. **Transcripts** - Generation, templates, e-signatures
19. **Reports** - Comprehensive reporting with analytics
20. **Front Website** - Public CMS for university website
21. **Settings** - System configuration, roles & permissions

## 🎯 Advanced Timetable Features (World-Class)

The timetable module is the star feature with:

- **Drag & Drop Interface**: Intuitive subject placement
- **Real-time Conflict Detection**:
  - Faculty double-booking prevention
  - Room capacity conflicts
  - Student cohort overlaps
  - Faculty workload limits
  - Travel time between rooms
- **Visual Feedback**: Color-coded conflicts with detailed tooltips
- **Auto-Generation**: Intelligent scheduling algorithm
- **Multiple Views**: Grid, Faculty, Room utilization
- **Undo/Redo**: Full history management
- **Import/Export**: Template support
- **Scenario Planning**: What-if analysis

## 🏗️ Architecture

### Tech Stack

**Frontend:**
- Next.js 15 (App Router)
- TypeScript
- Tailwind CSS
- Radix UI Components
- @dnd-kit for drag-and-drop
- Zustand for state management
- TanStack Query for data fetching

**Backend (Recommended):**
- Next.js API Routes OR
- Node.js/Express + TypeScript OR
- NestJS for enterprise

**Database:**
- PostgreSQL with Prisma ORM
- Redis for caching

**Authentication:**
- NextAuth.js or Clerk
- Role-Based Access Control (RBAC)
- Multi-factor authentication

### Project Structure

```
project/
├── app/
│   ├── (main)/              # Authenticated routes
│   │   ├── dashboard/
│   │   ├── timetable/
│   │   ├── students/
│   │   ├── admission/
│   │   └── ...
│   ├── api/                 # API routes
│   ├── layout.tsx
│   └── globals.css
├── components/
│   ├── layout/              # Layout components
│   │   ├── sidebar-nav.tsx  # Enhanced sidebar
│   │   ├── header.tsx       # Header with search
│   │   └── app-layout.tsx   # Main layout wrapper
│   ├── timetable/           # Timetable components
│   │   ├── timetable-grid.tsx
│   │   ├── time-slot.tsx
│   │   └── draggable-subject.tsx
│   └── ui/                  # Reusable UI components
├── lib/
│   └── utils.ts             # Utility functions
├── types/
│   └── index.ts             # TypeScript types
└── prisma/
    └── schema.prisma        # Database schema
```

## 📊 Database Schema

### Core Tables

```sql
-- Users & Authentication
User (id, email, name, role, avatar, created_at)
Role (id, name, permissions)
Permission (id, resource, action)

-- Academic
Program (id, name, code, department_id, duration)
Department (id, name, code, head_id)
Course (id, code, name, credits, type, prerequisites)
Semester (id, name, start_date, end_date, academic_year)
Section (id, name, program_id, semester_id, capacity)
Room (id, name, building, capacity, type, features)

-- Students
Student (id, roll_number, user_id, program_id, admission_date, status)
Enrollment (id, student_id, course_id, semester_id, section_id)
Attendance (id, student_id, course_id, date, status)

-- Timetable
TimeSlot (id, day, start_time, end_time, course_id, faculty_id, room_id, section_id, type)
TimetableTemplate (id, name, semester_id, created_by)

-- Faculty
Faculty (id, user_id, department_id, designation, max_hours_per_week)
FacultyPreference (id, faculty_id, preferred_days, preferred_times, blocked_slots)

-- Examinations
Exam (id, course_id, type, date, start_time, end_time, room_id)
ExamInvigilator (id, exam_id, faculty_id)
Mark (id, student_id, exam_id, marks, grade)

-- Fees
FeeStructure (id, name, program_id, semester_id, amount)
FeePayment (id, student_id, amount, payment_date, payment_method, status)

-- Additional modules...
```

### Relationships

- User → Student (one-to-one)
- User → Faculty (one-to-one)
- Student → Enrollment (one-to-many)
- Course → TimeSlot (one-to-many)
- Faculty → TimeSlot (one-to-many)
- Room → TimeSlot (one-to-many)

## 🔐 Security Features

- Role-based access control (RBAC)
- JWT authentication with refresh tokens
- Input validation with Zod
- SQL injection prevention (Prisma)
- XSS protection
- CORS configuration
- Rate limiting
- Audit logs for all operations
- Encrypted sensitive data
- GDPR/FERPA compliance

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL 14+
- Redis (optional, for caching)

### Installation

```bash
# Clone the repository
git clone <repository-url>

# Install dependencies
npm install

# Setup environment variables
cp .env.example .env
# Edit .env with your configuration

# Setup database
npx prisma generate
npx prisma db push

# Run development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🎨 UI/UX Features

- **Responsive Design**: Mobile-first approach
- **Dark/Light Mode**: System-aware theme switching
- **Collapsible Sidebar**: Desktop optimization
- **Global Search**: ⌘K shortcut
- **Notifications**: Real-time updates
- **Breadcrumb Navigation**: Context awareness
- **Keyboard Shortcuts**: Power user support
- **Loading States**: Skeleton screens
- **Error Boundaries**: Graceful error handling
- **Accessibility**: ARIA labels, keyboard navigation

## 📱 API Endpoints

### Authentication
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
GET    /api/auth/me
```

### Students
```
GET    /api/students
GET    /api/students/:id
POST   /api/students
PUT    /api/students/:id
DELETE /api/students/:id
GET    /api/students/:id/attendance
POST   /api/students/:id/attendance
```

### Timetable
```
GET    /api/timetable/schedule
POST   /api/timetable/schedule
PUT    /api/timetable/schedule/:id
DELETE /api/timetable/schedule/:id
GET    /api/timetable/conflicts
POST   /api/timetable/auto-generate
GET    /api/timetable/faculty/:id
GET    /api/timetable/room/:id
```

### Courses
```
GET    /api/courses
GET    /api/courses/:id
POST   /api/courses
PUT    /api/courses/:id
DELETE /api/courses/:id
```

Full API documentation available at `/api/docs` (Swagger UI)

## 🧪 Testing

```bash
# Run unit tests
npm test

# Run e2e tests
npm run test:e2e

# Run with coverage
npm run test:coverage
```

## 📦 Deployment

### Vercel (Frontend)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Docker

```bash
# Build image
docker build -t dps .

# Run container
docker run -p 3000:3000 dps
```

### Docker Compose

```bash
docker-compose up -d
```

## 🔄 CI/CD

The project includes GitHub Actions workflows for:

- Linting and type checking
- Running tests
- Building the application
- Deploying to staging/production

## 📈 Performance Optimizations

- Server-side rendering (SSR)
- Static site generation (SSG) for public pages
- Image optimization with Next.js Image
- Code splitting and lazy loading
- React Query caching
- Redis caching for frequently accessed data
- Database query optimization with indexes
- CDN for static assets

## 🌍 Internationalization

The system supports multiple languages:

- English (default)
- Spanish
- French
- Add more in `locales/`

## 📊 Analytics & Monitoring

- Google Analytics integration
- Custom event tracking
- Error monitoring (Sentry)
- Performance monitoring
- Database query analysis

## 🤖 AI Features

- **Smart Scheduling**: ML-based timetable optimization
- **Predictive Analytics**: Enrollment forecasting, dropout risk
- **Faculty Workload Balancing**: Automatic distribution
- **Conflict Prevention**: Intelligent suggestions

## 🔌 Integrations

- **Payment Gateways**: Stripe, PayPal
- **Email**: SendGrid, AWS SES
- **SMS**: Twilio
- **LMS**: Moodle, Canvas (API)
- **Biometric**: Placeholder APIs
- **Calendar**: Google Calendar, Outlook
- **Storage**: AWS S3, Cloudflare R2

## 📝 License

MIT License - see LICENSE file

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📞 Support

For support, email support@dps.edu or join our Slack channel.

## 🎓 Credits

Built with ❤️ for modern universities

---

**Version**: 1.0.0  
**Last Updated**: 2024
