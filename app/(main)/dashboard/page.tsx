"use client";

import * as React from "react";
import {
  Users,
  UserPlus,
  DollarSign,
  TrendingUp,
  AlertTriangle,
  Calendar,
  BookOpen,
  GraduationCap,
  CheckCircle2,
  Clock,
  Award,
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface StatCardProps {
  title: string;
  value: string | number;
  change?: string;
  changeType?: "positive" | "negative";
  icon: React.ReactNode;
  description?: string;
}

function StatCard({ title, value, change, changeType, icon, description }: StatCardProps) {
  return (
    <div className="rounded-lg border bg-card p-6 transition-all hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div className="flex-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
          {description && (
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
          )}
        </div>
        <div className="rounded-full bg-primary/10 p-3">{icon}</div>
      </div>
      {change && (
        <div className="mt-4">
          <Badge
            variant={changeType === "positive" ? "success" : "destructive"}
            className="gap-1"
          >
            <TrendingUp className="h-3 w-3" />
            {change}
          </Badge>
        </div>
      )}
    </div>
  );
}

export default function DashboardPage() {
  const stats = [
    {
      title: "Total Students",
      value: "2,847",
      change: "+12.5%",
      changeType: "positive" as const,
      icon: <Users className="h-6 w-6 text-primary" />,
      description: "Active enrollments",
    },
    {
      title: "Pending Admissions",
      value: "124",
      change: "+8 new",
      changeType: "positive" as const,
      icon: <UserPlus className="h-6 w-6 text-yellow-500" />,
      description: "Awaiting review",
    },
    {
      title: "Revenue (Today)",
      value: "$45,280",
      change: "+22.3%",
      changeType: "positive" as const,
      icon: <DollarSign className="h-6 w-6 text-green-500" />,
      description: "Fee collections",
    },
    {
      title: "Attendance Rate",
      value: "92.4%",
      change: "-2.1%",
      changeType: "negative" as const,
      icon: <CheckCircle2 className="h-6 w-6 text-blue-500" />,
      description: "Last 7 days average",
    },
  ];

  const recentActivities = [
    {
      id: 1,
      type: "admission",
      message: "New admission application from John Doe",
      time: "5 minutes ago",
      icon: <UserPlus className="h-4 w-4" />,
    },
    {
      id: 2,
      type: "payment",
      message: "Fee payment received - $2,500",
      time: "23 minutes ago",
      icon: <DollarSign className="h-4 w-4" />,
    },
    {
      id: 3,
      type: "exam",
      message: "Mid-term exam scheduled for CS101",
      time: "1 hour ago",
      icon: <Calendar className="h-4 w-4" />,
    },
    {
      id: 4,
      type: "attendance",
      message: "Low attendance alert for Section A",
      time: "2 hours ago",
      icon: <AlertTriangle className="h-4 w-4" />,
    },
  ];

  const upcomingEvents = [
    {
      id: 1,
      title: "Faculty Meeting",
      date: "Today, 3:00 PM",
      type: "meeting",
    },
    {
      id: 2,
      title: "Final Exams Begin",
      date: "Dec 15, 2024",
      type: "exam",
    },
    {
      id: 3,
      title: "Admission Deadline",
      date: "Dec 20, 2024",
      type: "deadline",
    },
  ];

  const quickActions = [
    {
      title: "Admission Applications",
      count: 12,
      href: "/admission/applications",
      icon: <UserPlus className="h-5 w-5" />,
      color: "bg-blue-500",
    },
    {
      title: "Create Timetable",
      href: "/timetable/class-schedule",
      icon: <Calendar className="h-5 w-5" />,
      color: "bg-purple-500",
      badge: "NEW",
    },
    {
      title: "Mark Attendance",
      href: "/students/attendance",
      icon: <CheckCircle2 className="h-5 w-5" />,
      color: "bg-green-500",
    },
    {
      title: "Fee Collection",
      count: 5,
      href: "/fees/collect",
      icon: <DollarSign className="h-5 w-5" />,
      color: "bg-yellow-500",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-1">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={index} {...stat} />
        ))}
      </div>

      {/* Quick Actions */}
      <div className="rounded-lg border bg-card p-6">
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              href={action.href}
              className="flex items-center gap-4 rounded-lg border p-4 transition-all hover:border-primary hover:shadow-md"
            >
              <div className={`rounded-lg ${action.color} p-3 text-white`}>
                {action.icon}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">{action.title}</p>
                {action.count && (
                  <Badge variant="destructive" className="mt-1">
                    {action.count} pending
                  </Badge>
                )}
                {action.badge && (
                  <Badge variant="secondary" className="mt-1">
                    {action.badge}
                  </Badge>
                )}
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Recent Activities */}
        <div className="lg:col-span-2 rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">Recent Activities</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {recentActivities.map((activity) => (
                <div
                  key={activity.id}
                  className="flex items-start gap-4 p-3 rounded-lg hover:bg-accent transition-colors"
                >
                  <div className="rounded-full bg-primary/10 p-2">
                    {activity.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium">{activity.message}</p>
                    <p className="text-xs text-muted-foreground mt-1">
                      {activity.time}
                    </p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              View All Activities
            </Button>
          </div>
        </div>

        {/* Upcoming Events */}
        <div className="rounded-lg border bg-card">
          <div className="border-b p-6">
            <h2 className="text-lg font-semibold">Upcoming Events</h2>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {upcomingEvents.map((event) => (
                <div
                  key={event.id}
                  className="p-3 rounded-lg border hover:border-primary transition-colors cursor-pointer"
                >
                  <p className="text-sm font-medium">{event.title}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Clock className="h-3 w-3 text-muted-foreground" />
                    <p className="text-xs text-muted-foreground">{event.date}</p>
                  </div>
                </div>
              ))}
            </div>
            <Button variant="outline" className="w-full mt-4">
              <Calendar className="h-4 w-4" />
              View Calendar
            </Button>
          </div>
        </div>
      </div>

      {/* Charts Section (Placeholder) */}
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Enrollment Trends</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
            <div className="text-center">
              <BookOpen className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Chart visualization will be displayed here
              </p>
            </div>
          </div>
        </div>

        <div className="rounded-lg border bg-card p-6">
          <h2 className="text-lg font-semibold mb-4">Fee Collection</h2>
          <div className="h-64 flex items-center justify-center border-2 border-dashed rounded-lg">
            <div className="text-center">
              <DollarSign className="h-12 w-12 text-muted-foreground mx-auto mb-2" />
              <p className="text-sm text-muted-foreground">
                Chart visualization will be displayed here
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
