"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Plus,
  Search,
  Filter,
  Download,
  Upload,
  MoreVertical,
  Edit,
  Trash2,
  Eye,
  UserPlus,
} from "lucide-react";

export default function StudentsPage() {
  const students = [
    {
      id: "1",
      rollNumber: "CS2024001",
      name: "John Doe",
      email: "john.doe@student.unims.edu",
      program: "Computer Science",
      semester: "Fall 2024",
      status: "active",
      avatar: null,
    },
    {
      id: "2",
      rollNumber: "CS2024002",
      name: "Jane Smith",
      email: "jane.smith@student.unims.edu",
      program: "Computer Science",
      semester: "Fall 2024",
      status: "active",
      avatar: null,
    },
    {
      id: "3",
      rollNumber: "EE2024001",
      name: "Mike Johnson",
      email: "mike.johnson@student.unims.edu",
      program: "Electrical Engineering",
      semester: "Fall 2024",
      status: "inactive",
      avatar: null,
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Students</h1>
          <p className="text-muted-foreground mt-1">
            Manage student records, enrollment, and profiles
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Plus className="h-4 w-4" />
            Add Student
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">
            Total Students
          </p>
          <p className="text-2xl font-bold mt-2">2,847</p>
          <Badge variant="success" className="mt-2">
            +12.5% from last month
          </Badge>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">
            Active Students
          </p>
          <p className="text-2xl font-bold mt-2">2,721</p>
          <Badge variant="secondary" className="mt-2">
            95.6% of total
          </Badge>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">
            New This Month
          </p>
          <p className="text-2xl font-bold mt-2">142</p>
          <Badge variant="success" className="mt-2">
            +8.3%
          </Badge>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <p className="text-sm font-medium text-muted-foreground">
            Graduates
          </p>
          <p className="text-2xl font-bold mt-2">126</p>
          <Badge variant="secondary" className="mt-2">
            4.4% of total
          </Badge>
        </div>
      </div>

      {/* Filters & Search */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search by name, roll number, or email..."
            className="h-10 w-full rounded-lg border bg-background pl-10 pr-4 text-sm outline-none focus:ring-2 focus:ring-ring"
          />
        </div>
        <div className="flex gap-2">
          <Button variant="outline" size="sm">
            <Filter className="h-4 w-4" />
            Filter
          </Button>
          <select className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
            <option>All Programs</option>
            <option>Computer Science</option>
            <option>Electrical Engineering</option>
            <option>Mechanical Engineering</option>
          </select>
          <select className="h-10 rounded-lg border bg-background px-3 text-sm outline-none focus:ring-2 focus:ring-ring">
            <option>All Status</option>
            <option>Active</option>
            <option>Inactive</option>
            <option>Graduated</option>
            <option>Suspended</option>
          </select>
        </div>
      </div>

      {/* Students Table */}
      <div className="rounded-lg border bg-card">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b">
              <tr className="text-sm text-muted-foreground">
                <th className="text-left p-4 font-medium">
                  <input type="checkbox" className="rounded" />
                </th>
                <th className="text-left p-4 font-medium">Student</th>
                <th className="text-left p-4 font-medium">Roll Number</th>
                <th className="text-left p-4 font-medium">Program</th>
                <th className="text-left p-4 font-medium">Semester</th>
                <th className="text-left p-4 font-medium">Status</th>
                <th className="text-left p-4 font-medium">Actions</th>
              </tr>
            </thead>
            <tbody>
              {students.map((student) => (
                <tr
                  key={student.id}
                  className="border-b last:border-0 hover:bg-accent/50 transition-colors"
                >
                  <td className="p-4">
                    <input type="checkbox" className="rounded" />
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold">
                        {student.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <p className="font-medium">{student.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {student.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="p-4">
                    <span className="font-mono text-sm">
                      {student.rollNumber}
                    </span>
                  </td>
                  <td className="p-4">{student.program}</td>
                  <td className="p-4">{student.semester}</td>
                  <td className="p-4">
                    <Badge
                      variant={
                        student.status === "active" ? "success" : "secondary"
                      }
                    >
                      {student.status}
                    </Badge>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center gap-2">
                      <Button variant="ghost" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="icon">
                        <MoreVertical className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-sm text-muted-foreground">
            Showing 1 to 3 of 2,847 students
          </p>
          <div className="flex gap-2">
            <Button variant="outline" size="sm" disabled>
              Previous
            </Button>
            <Button variant="outline" size="sm">
              1
            </Button>
            <Button variant="outline" size="sm">
              2
            </Button>
            <Button variant="outline" size="sm">
              3
            </Button>
            <Button variant="outline" size="sm">
              Next
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
