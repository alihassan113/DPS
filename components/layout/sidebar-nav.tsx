"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  UserPlus,
  GraduationCap,
  BookOpen,
  Calendar,
  ClipboardList,
  FileText,
  DollarSign,
  Users,
  UserCheck,
  CalendarClock,
  Wallet,
  MessageSquare,
  Library,
  Package,
  Building,
  Bus,
  HeadphonesIcon,
  ScrollText,
  BarChart3,
  Globe,
  Settings,
  ChevronDown,
  ChevronRight,
  User,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import type { NavItem } from "@/types";

const navigationItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    shortcut: "⌘D",
  },
  {
    title: "Admission",
    icon: UserPlus,
    badge: 12,
    children: [
      { title: "Applications", href: "/admission/applications", badge: 12 },
      { title: "Online Portal", href: "/admission/portal" },
      { title: "Merit Lists", href: "/admission/merit-lists" },
      { title: "Interview Scheduler", href: "/admission/interviews" },
      { title: "Document Verification", href: "/admission/documents" },
      { title: "Transfers", href: "/admission/transfers" },
      { title: "ID Card Generation", href: "/admission/id-cards" },
      { title: "Settings", href: "/admission/settings" },
    ],
  },
  {
    title: "Students",
    icon: GraduationCap,
    children: [
      { title: "All Students", href: "/students" },
      { title: "Enrollment", href: "/students/enrollment" },
      { title: "Attendance", href: "/students/attendance" },
      { title: "Leave Management", href: "/students/leaves" },
      { title: "Course Registration", href: "/students/course-registration" },
      { title: "Alumni", href: "/students/alumni" },
      { title: "Bulk Operations", href: "/students/bulk" },
    ],
  },
  {
    title: "Academic",
    icon: BookOpen,
    children: [
      { title: "Programs", href: "/academic/programs" },
      { title: "Departments", href: "/academic/departments" },
      { title: "Courses & Subjects", href: "/academic/courses" },
      { title: "Semesters", href: "/academic/semesters" },
      { title: "Sections", href: "/academic/sections" },
      { title: "Batches", href: "/academic/batches" },
      { title: "Rooms & Facilities", href: "/academic/rooms" },
      { title: "Course Enrollment", href: "/academic/enrollment" },
      { title: "Prerequisites", href: "/academic/prerequisites" },
    ],
  },
  {
    title: "Timetable",
    icon: Calendar,
    badge: "NEW",
    children: [
      { title: "Class Schedule", href: "/timetable/class-schedule", badge: "★" },
      { title: "Exam Schedule", href: "/timetable/exam-schedule" },
      { title: "Faculty Routines", href: "/timetable/faculty-routines" },
      { title: "Room Utilization", href: "/timetable/room-utilization" },
      { title: "Conflict Resolution", href: "/timetable/conflicts" },
      { title: "Auto-Generate", href: "/timetable/auto-generate" },
      { title: "Templates", href: "/timetable/templates" },
      { title: "Settings", href: "/timetable/settings" },
    ],
  },
  {
    title: "Examinations",
    icon: ClipboardList,
    children: [
      { title: "Exam Schedules", href: "/examinations/schedules" },
      { title: "Mark Entry", href: "/examinations/marks" },
      { title: "Results", href: "/examinations/results" },
      { title: "Grade Sheets", href: "/examinations/grade-sheets" },
      { title: "Admit Cards", href: "/examinations/admit-cards" },
      { title: "Seating Plans", href: "/examinations/seating" },
      { title: "Invigilator Assignment", href: "/examinations/invigilators" },
      { title: "Analytics", href: "/examinations/analytics" },
    ],
  },
  {
    title: "Study Materials",
    icon: FileText,
    children: [
      { title: "Content Library", href: "/study-materials/library" },
      { title: "Assignments", href: "/study-materials/assignments" },
      { title: "Submissions", href: "/study-materials/submissions" },
      { title: "Resources", href: "/study-materials/resources" },
      { title: "Upload Content", href: "/study-materials/upload" },
    ],
  },
  {
    title: "Fees Collection",
    icon: DollarSign,
    badge: 5,
    children: [
      { title: "Fee Structures", href: "/fees/structures" },
      { title: "Collect Fees", href: "/fees/collect" },
      { title: "Invoices & Receipts", href: "/fees/invoices" },
      { title: "Defaulters", href: "/fees/defaulters", badge: 5 },
      { title: "Payment Gateway", href: "/fees/payment-gateway" },
      { title: "Discounts & Fines", href: "/fees/discounts" },
      { title: "Reports", href: "/fees/reports" },
    ],
  },
  {
    title: "Human Resources",
    icon: Users,
    children: [
      { title: "Faculty", href: "/hr/faculty" },
      { title: "Staff", href: "/hr/staff" },
      { title: "Departments", href: "/hr/departments" },
      { title: "Designations", href: "/hr/designations" },
      { title: "Payroll", href: "/hr/payroll" },
      { title: "Contracts", href: "/hr/contracts" },
      { title: "Performance", href: "/hr/performance" },
    ],
  },
  {
    title: "Staff Attendance",
    icon: UserCheck,
    children: [
      { title: "Mark Attendance", href: "/staff-attendance/mark" },
      { title: "Attendance Records", href: "/staff-attendance/records" },
      { title: "Biometric Integration", href: "/staff-attendance/biometric" },
      { title: "Reports", href: "/staff-attendance/reports" },
    ],
  },
  {
    title: "Leave Manager",
    icon: CalendarClock,
    badge: 3,
    children: [
      { title: "Leave Requests", href: "/leaves/requests", badge: 3 },
      { title: "Approve Leaves", href: "/leaves/approve" },
      { title: "Leave Types", href: "/leaves/types" },
      { title: "Leave Balance", href: "/leaves/balance" },
      { title: "Calendar", href: "/leaves/calendar" },
    ],
  },
  {
    title: "Accounts",
    icon: Wallet,
    children: [
      { title: "Income", href: "/accounts/income" },
      { title: "Expenses", href: "/accounts/expenses" },
      { title: "Ledger", href: "/accounts/ledger" },
      { title: "Budget Planning", href: "/accounts/budget" },
      { title: "Tax Management", href: "/accounts/tax" },
      { title: "Reports", href: "/accounts/reports" },
    ],
  },
  {
    title: "Communication",
    icon: MessageSquare,
    children: [
      { title: "Announcements", href: "/communication/announcements" },
      { title: "Email Campaigns", href: "/communication/email" },
      { title: "SMS Gateway", href: "/communication/sms" },
      { title: "Push Notifications", href: "/communication/notifications" },
      { title: "Templates", href: "/communication/templates" },
      { title: "Contact Groups", href: "/communication/groups" },
    ],
  },
  {
    title: "Library",
    icon: Library,
    children: [
      { title: "Books Catalog", href: "/library/books" },
      { title: "Issue & Return", href: "/library/circulation" },
      { title: "Members", href: "/library/members" },
      { title: "Digital Resources", href: "/library/digital" },
      { title: "RFID System", href: "/library/rfid" },
      { title: "Fine Management", href: "/library/fines" },
      { title: "Reports", href: "/library/reports" },
    ],
  },
  {
    title: "Inventory",
    icon: Package,
    children: [
      { title: "Items", href: "/inventory/items" },
      { title: "Categories", href: "/inventory/categories" },
      { title: "Stock Management", href: "/inventory/stock" },
      { title: "Issue Items", href: "/inventory/issue" },
      { title: "Suppliers", href: "/inventory/suppliers" },
      { title: "Purchase Orders", href: "/inventory/purchase-orders" },
      { title: "Reports", href: "/inventory/reports" },
    ],
  },
  {
    title: "Hostels",
    icon: Building,
    children: [
      { title: "Hostel Management", href: "/hostels" },
      { title: "Room Allocation", href: "/hostels/rooms" },
      { title: "Residents", href: "/hostels/residents" },
      { title: "Floor Plans", href: "/hostels/floor-plans" },
      { title: "Maintenance", href: "/hostels/maintenance" },
      { title: "Visitor Log", href: "/hostels/visitors" },
      { title: "Fee Collection", href: "/hostels/fees" },
    ],
  },
  {
    title: "Transport",
    icon: Bus,
    children: [
      { title: "Routes", href: "/transport/routes" },
      { title: "Vehicles", href: "/transport/vehicles" },
      { title: "Drivers", href: "/transport/drivers" },
      { title: "Students Assignment", href: "/transport/assignment" },
      { title: "GPS Tracking", href: "/transport/tracking" },
      { title: "Maintenance", href: "/transport/maintenance" },
      { title: "Route Optimization", href: "/transport/optimization" },
    ],
  },
  {
    title: "Front Desk",
    icon: HeadphonesIcon,
    children: [
      { title: "Visitor Management", href: "/front-desk/visitors" },
      { title: "Token System", href: "/front-desk/tokens" },
      { title: "Enquiries", href: "/front-desk/enquiries" },
      { title: "Appointments", href: "/front-desk/appointments" },
      { title: "Complaints", href: "/front-desk/complaints" },
    ],
  },
  {
    title: "Transcripts",
    icon: ScrollText,
    children: [
      { title: "Generate Transcripts", href: "/transcripts/generate" },
      { title: "Templates", href: "/transcripts/templates" },
      { title: "Requests", href: "/transcripts/requests" },
      { title: "Verification", href: "/transcripts/verification" },
      { title: "E-Signatures", href: "/transcripts/signatures" },
    ],
  },
  {
    title: "Reports",
    icon: BarChart3,
    children: [
      { title: "Student Reports", href: "/reports/students" },
      { title: "Financial Reports", href: "/reports/financial" },
      { title: "Attendance Reports", href: "/reports/attendance" },
      { title: "Academic Performance", href: "/reports/academic" },
      { title: "Custom Reports", href: "/reports/custom" },
      { title: "Scheduled Reports", href: "/reports/scheduled" },
      { title: "Analytics Dashboard", href: "/reports/analytics" },
    ],
  },
  {
    title: "Front Website",
    icon: Globe,
    children: [
      { title: "Pages", href: "/website/pages" },
      { title: "Sliders", href: "/website/sliders" },
      { title: "Events", href: "/website/events" },
      { title: "News", href: "/website/news" },
      { title: "Gallery", href: "/website/gallery" },
      { title: "Testimonials", href: "/website/testimonials" },
      { title: "Course Catalog", href: "/website/courses" },
      { title: "Contact Forms", href: "/website/contact" },
      { title: "SEO Settings", href: "/website/seo" },
    ],
  },
  {
    title: "Settings",
    icon: Settings,
    children: [
      { title: "General", href: "/settings/general" },
      { title: "Academic Year", href: "/settings/academic-year" },
      { title: "Locations", href: "/settings/locations" },
      { title: "Languages", href: "/settings/languages" },
      { title: "Email & SMS", href: "/settings/communication" },
      { title: "Payment Gateways", href: "/settings/payments" },
      { title: "Roles & Permissions", href: "/settings/roles" },
      { title: "Custom Fields", href: "/settings/custom-fields" },
      { title: "Backup & Restore", href: "/settings/backup" },
      { title: "API Keys", href: "/settings/api" },
      { title: "Integrations", href: "/settings/integrations" },
    ],
  },
];

interface SidebarNavProps {
  isCollapsed: boolean;
  onClose?: () => void;
}

export function SidebarNav({ isCollapsed, onClose }: SidebarNavProps) {
  const pathname = usePathname();
  const [expandedItems, setExpandedItems] = React.useState<string[]>([]);

  const toggleItem = (title: string) => {
    setExpandedItems((prev) =>
      prev.includes(title)
        ? prev.filter((item) => item !== title)
        : [...prev, title]
    );
  };

  React.useEffect(() => {
    const currentItem = navigationItems.find((item) =>
      item.children?.some((child) => pathname?.startsWith(child.href || ""))
    );
    if (currentItem && !expandedItems.includes(currentItem.title)) {
      setExpandedItems((prev) => [...prev, currentItem.title]);
    }
  }, [pathname]);

  return (
    <div className="flex h-full flex-col">
      {/* Logo Section */}
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!isCollapsed && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-8 w-8 text-primary" />
            <div>
              <h1 className="text-lg font-bold">UniMS</h1>
              <p className="text-xs text-muted-foreground">
                University Management
              </p>
            </div>
          </div>
        )}
        {isCollapsed && (
          <GraduationCap className="h-8 w-8 text-primary mx-auto" />
        )}
        {onClose && (
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
          >
            <X className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Navigation Items */}
      <ScrollArea className="flex-1 px-3 py-4">
        <nav className="flex flex-col gap-1">
          {navigationItems.map((item) => (
            <NavItemComponent
              key={item.title}
              item={item}
              pathname={pathname}
              isCollapsed={isCollapsed}
              isExpanded={expandedItems.includes(item.title)}
              onToggle={() => toggleItem(item.title)}
            />
          ))}
        </nav>
      </ScrollArea>

      {/* User Profile Section */}
      {!isCollapsed && (
        <Link href="/profile" className="border-t p-4">
          <div className="flex items-center gap-3 rounded-lg p-2 hover:bg-accent transition-colors">
            <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-5 w-5 text-primary" />
            </div>
            <div className="flex-1 overflow-hidden">
              <p className="text-sm font-medium truncate">Admin User</p>
              <p className="text-xs text-muted-foreground truncate">
                admin@unims.edu
              </p>
            </div>
          </div>
        </Link>
      )}
    </div>
  );
}

interface NavItemComponentProps {
  item: NavItem;
  pathname: string | null;
  isCollapsed: boolean;
  isExpanded: boolean;
  onToggle: () => void;
}

function NavItemComponent({
  item,
  pathname,
  isCollapsed,
  isExpanded,
  onToggle,
}: NavItemComponentProps) {
  const Icon = item.icon;
  const hasChildren = item.children && item.children.length > 0;
  const isActive = pathname === item.href;
  const hasActiveChild = item.children?.some(
    (child) => pathname === child.href
  );

  if (hasChildren) {
    return (
      <div>
        <button
          onClick={onToggle}
          className={cn(
            "flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
            (isActive || hasActiveChild) && "bg-accent font-medium",
            isCollapsed && "justify-center"
          )}
        >
          {Icon && <Icon className="h-4 w-4 shrink-0" />}
          {!isCollapsed && (
            <>
              <span className="flex-1 text-left">{item.title}</span>
              {item.badge && (
                <Badge
                  variant={typeof item.badge === "number" ? "destructive" : "secondary"}
                  className="ml-auto"
                >
                  {item.badge}
                </Badge>
              )}
              {isExpanded ? (
                <ChevronDown className="h-4 w-4 shrink-0" />
              ) : (
                <ChevronRight className="h-4 w-4 shrink-0" />
              )}
            </>
          )}
        </button>
        {!isCollapsed && isExpanded && (
          <div className="ml-6 mt-1 space-y-1 border-l pl-3">
            {item.children?.map((child) => {
              const isChildActive = pathname === child.href;
              return (
                <Link
                  key={child.title}
                  href={child.href || "#"}
                  className={cn(
                    "flex items-center gap-2 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
                    isChildActive && "bg-accent font-medium text-primary"
                  )}
                >
                  <span className="flex-1">{child.title}</span>
                  {child.badge && (
                    <Badge
                      variant={
                        typeof child.badge === "number"
                          ? "destructive"
                          : "secondary"
                      }
                      className="text-xs"
                    >
                      {child.badge}
                    </Badge>
                  )}
                </Link>
              );
            })}
          </div>
        )}
      </div>
    );
  }

  return (
    <Link
      href={item.href || "#"}
      className={cn(
        "flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all hover:bg-accent",
        isActive && "bg-accent font-medium",
        isCollapsed && "justify-center"
      )}
    >
      {Icon && <Icon className="h-4 w-4 shrink-0" />}
      {!isCollapsed && (
        <>
          <span className="flex-1">{item.title}</span>
          {item.badge && (
            <Badge
              variant={typeof item.badge === "number" ? "destructive" : "secondary"}
            >
              {item.badge}
            </Badge>
          )}
        </>
      )}
    </Link>
  );
}
