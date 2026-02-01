export type UserRole =
  | "SUPER_ADMIN"
  | "ADMIN"
  | "FACULTY"
  | "STUDENT"
  | "STAFF"
  | "ACCOUNTANT"
  | "LIBRARIAN"
  | "HOSTEL_WARDEN"
  | "TRANSPORT_MANAGER";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  permissions: string[];
}

export interface NavItem {
  title: string;
  href?: string;
  icon?: React.ComponentType<{ className?: string }>;
  badge?: number | string;
  children?: NavItem[];
  roles?: UserRole[];
  shortcut?: string;
}

export interface TimeSlot {
  id: string;
  day: string;
  startTime: string;
  endTime: string;
  subjectId: string;
  facultyId: string;
  roomId: string;
  sectionId: string;
  semesterId: string;
  type: "lecture" | "lab" | "tutorial";
}

export interface TimetableConflict {
  type: "faculty" | "room" | "student" | "preference";
  message: string;
  slots: string[];
  severity: "error" | "warning";
}

export interface Subject {
  id: string;
  code: string;
  name: string;
  credits: number;
  type: "theory" | "lab" | "both";
  color: string;
}

export interface Faculty {
  id: string;
  name: string;
  email: string;
  department: string;
  subjects: string[];
  maxHoursPerWeek: number;
  preferences?: {
    preferredDays?: string[];
    preferredTimes?: string[];
    blockedSlots?: { day: string; time: string }[];
  };
}

export interface Room {
  id: string;
  name: string;
  building: string;
  capacity: number;
  type: "lecture" | "lab" | "seminar";
  features: string[];
}

export interface Section {
  id: string;
  name: string;
  programId: string;
  semesterId: string;
  strength: number;
}

export interface DashboardStats {
  totalStudents: number;
  pendingAdmissions: number;
  todayRevenue: number;
  attendanceRate: number;
  lowAttendanceAlerts: number;
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: "info" | "warning" | "error" | "success";
  read: boolean;
  timestamp: Date;
  link?: string;
}

export interface Student {
  id: string;
  rollNumber: string;
  name: string;
  email: string;
  phone: string;
  dateOfBirth: Date;
  gender: string;
  address: string;
  programId: string;
  semesterId: string;
  sectionId: string;
  admissionDate: Date;
  status: "active" | "inactive" | "graduated" | "suspended";
  avatar?: string;
}

export interface Admission {
  id: string;
  applicationNumber: string;
  studentName: string;
  email: string;
  phone: string;
  programApplied: string;
  status: "pending" | "approved" | "rejected" | "interview_scheduled";
  applicationDate: Date;
  documents: Document[];
}

export interface Document {
  id: string;
  name: string;
  type: string;
  url: string;
  uploadedAt: Date;
}

export interface FeeStructure {
  id: string;
  name: string;
  programId: string;
  semesterId: string;
  amount: number;
  dueDate: Date;
  components: FeeComponent[];
}

export interface FeeComponent {
  name: string;
  amount: number;
}

export interface ExamSchedule {
  id: string;
  subjectId: string;
  date: Date;
  startTime: string;
  endTime: string;
  roomId: string;
  invigilators: string[];
  type: "midterm" | "final" | "quiz";
}
