"use client";

import * as React from "react";
import { TimetableGrid } from "@/components/timetable/timetable-grid";
import { DraggableSubject } from "@/components/timetable/draggable-subject";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Download,
  Upload,
  Sparkles,
  Save,
  Undo2,
  Redo2,
  Filter,
  AlertTriangle,
  CheckCircle2,
  Eye,
  Calendar,
  Users,
  Building2,
} from "lucide-react";
import { Subject, TimeSlot as TimeSlotType, TimetableConflict, Faculty, Room } from "@/types";
import { cn } from "@/lib/utils";

// Mock Data
const mockSubjects: Subject[] = [
  { id: "1", code: "CS101", name: "Data Structures", credits: 4, type: "both", color: "#3b82f6" },
  { id: "2", code: "CS102", name: "Algorithms", credits: 3, type: "theory", color: "#8b5cf6" },
  { id: "3", code: "CS103", name: "Database Systems", credits: 4, type: "both", color: "#ec4899" },
  { id: "4", code: "CS104", name: "Operating Systems", credits: 3, type: "theory", color: "#f59e0b" },
  { id: "5", code: "CS105", name: "Computer Networks", credits: 4, type: "both", color: "#10b981" },
  { id: "6", code: "CS106", name: "Software Engineering", credits: 3, type: "theory", color: "#06b6d4" },
  { id: "7", code: "CS107", name: "Web Development", credits: 3, type: "lab", color: "#f43f5e" },
  { id: "8", code: "MATH201", name: "Discrete Mathematics", credits: 3, type: "theory", color: "#6366f1" },
];

const mockFaculty: Faculty[] = [
  { id: "f1", name: "Dr. John Smith", email: "john@uni.edu", department: "CS", subjects: ["1", "2"], maxHoursPerWeek: 20 },
  { id: "f2", name: "Dr. Sarah Johnson", email: "sarah@uni.edu", department: "CS", subjects: ["3", "4"], maxHoursPerWeek: 20 },
  { id: "f3", name: "Prof. Michael Brown", email: "michael@uni.edu", department: "CS", subjects: ["5", "6"], maxHoursPerWeek: 18 },
  { id: "f4", name: "Dr. Emily Davis", email: "emily@uni.edu", department: "CS", subjects: ["7", "8"], maxHoursPerWeek: 20 },
];

const mockRooms: Room[] = [
  { id: "r1", name: "Room 101", building: "A Block", capacity: 60, type: "lecture", features: ["projector", "whiteboard"] },
  { id: "r2", name: "Room 102", building: "A Block", capacity: 60, type: "lecture", features: ["projector", "whiteboard"] },
  { id: "r3", name: "Lab 201", building: "B Block", capacity: 40, type: "lab", features: ["computers", "projector"] },
  { id: "r4", name: "Lab 202", building: "B Block", capacity: 40, type: "lab", features: ["computers", "projector"] },
];

const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
const timeSlots = [
  "08:00-09:00",
  "09:00-10:00",
  "10:00-11:00",
  "11:00-12:00",
  "12:00-01:00",
  "01:00-02:00",
  "02:00-03:00",
  "03:00-04:00",
  "04:00-05:00",
];

export default function ClassSchedulePage() {
  const [schedule, setSchedule] = React.useState<Map<string, TimeSlotType>>(new Map());
  const [subjects] = React.useState<Map<string, Subject>>(
    new Map(mockSubjects.map((s) => [s.id, s]))
  );
  const [faculty] = React.useState<Map<string, Faculty>>(
    new Map(mockFaculty.map((f) => [f.id, f]))
  );
  const [rooms] = React.useState<Map<string, Room>>(
    new Map(mockRooms.map((r) => [r.id, r]))
  );
  const [history, setHistory] = React.useState<Map<string, TimeSlotType>[]>([]);
  const [historyIndex, setHistoryIndex] = React.useState(-1);
  const [selectedView, setSelectedView] = React.useState<"grid" | "faculty" | "room">("grid");
  const [conflictCount, setConflictCount] = React.useState(0);

  // Conflict Detection
  const detectConflicts = React.useCallback((slotId: string, newSchedule: Map<string, TimeSlotType>): TimetableConflict[] => {
    const conflicts: TimetableConflict[] = [];
    const slot = newSchedule.get(slotId);
    if (!slot) return conflicts;

    const [day, time] = slotId.split("-");

    // Check faculty conflicts
    for (const [otherId, otherSlot] of newSchedule.entries()) {
      if (otherId === slotId) continue;
      const [otherDay, otherTime] = otherId.split("-");
      
      if (day === otherDay && time === otherTime && slot.facultyId === otherSlot.facultyId) {
        conflicts.push({
          type: "faculty",
          message: `${getFacultyName(slot.facultyId)} is already assigned to another class at this time`,
          slots: [slotId, otherId],
          severity: "error",
        });
      }

      // Check room conflicts
      if (day === otherDay && time === otherTime && slot.roomId === otherSlot.roomId) {
        conflicts.push({
          type: "room",
          message: `${getRoomName(slot.roomId)} is already occupied at this time`,
          slots: [slotId, otherId],
          severity: "error",
        });
      }
    }

    // Check faculty workload
    const facultySlots = Array.from(newSchedule.values()).filter(
      (s) => s.facultyId === slot.facultyId
    );
    const facultyMember = faculty.get(slot.facultyId);
    if (facultyMember && facultySlots.length > facultyMember.maxHoursPerWeek) {
      conflicts.push({
        type: "faculty",
        message: `${facultyMember.name} exceeds maximum weekly hours (${facultyMember.maxHoursPerWeek})`,
        slots: [slotId],
        severity: "warning",
      });
    }

    return conflicts;
  }, [faculty]);

  const getAllConflicts = React.useCallback(() => {
    const allConflicts = new Set<string>();
    for (const [slotId] of schedule) {
      const conflicts = detectConflicts(slotId, schedule);
      conflicts.forEach((c) => c.slots.forEach((s) => allConflicts.add(s)));
    }
    return allConflicts.size;
  }, [schedule, detectConflicts]);

  React.useEffect(() => {
    setConflictCount(getAllConflicts());
  }, [schedule, getAllConflicts]);

  const addToHistory = (newSchedule: Map<string, TimeSlotType>) => {
    const newHistory = history.slice(0, historyIndex + 1);
    newHistory.push(new Map(newSchedule));
    setHistory(newHistory);
    setHistoryIndex(newHistory.length - 1);
  };

  const handleSlotAdd = (slotId: string, subject: Subject) => {
    const newSchedule = new Map(schedule);
    
    // Randomly assign faculty and room for demo
    const availableFaculty = mockFaculty.filter((f) => f.subjects.includes(subject.id));
    const assignedFaculty = availableFaculty[0] || mockFaculty[0];
    
    const availableRooms = mockRooms.filter((r) => 
      subject.type === "lab" ? r.type === "lab" : r.type === "lecture"
    );
    const assignedRoom = availableRooms[0] || mockRooms[0];

    const [day, time] = slotId.split("-");
    const [startTime] = time.split("-");

    newSchedule.set(slotId, {
      id: slotId,
      day,
      startTime,
      endTime: time.split("-")[1],
      subjectId: subject.id,
      facultyId: assignedFaculty.id,
      roomId: assignedRoom.id,
      sectionId: "section-1",
      semesterId: "semester-1",
      type: subject.type === "lab" ? "lab" : "lecture",
    });

    setSchedule(newSchedule);
    addToHistory(newSchedule);
  };

  const handleSlotRemove = (slotId: string) => {
    const newSchedule = new Map(schedule);
    newSchedule.delete(slotId);
    setSchedule(newSchedule);
    addToHistory(newSchedule);
  };

  const getConflicts = (slotId: string): TimetableConflict[] => {
    return detectConflicts(slotId, schedule);
  };

  const getFacultyName = (facultyId: string): string => {
    return faculty.get(facultyId)?.name || "Unknown";
  };

  const getRoomName = (roomId: string): string => {
    return rooms.get(roomId)?.name || "Unknown";
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setSchedule(new Map(history[historyIndex - 1]));
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setSchedule(new Map(history[historyIndex + 1]));
    }
  };

  const handleAutoGenerate = () => {
    // Simple auto-generation algorithm
    const newSchedule = new Map<string, TimeSlotType>();
    let slotIndex = 0;
    
    mockSubjects.forEach((subject) => {
      const slotsNeeded = subject.type === "both" ? 4 : subject.type === "lab" ? 2 : 3;
      
      for (let i = 0; i < slotsNeeded && slotIndex < days.length * timeSlots.length; i++) {
        const dayIndex = Math.floor(slotIndex / timeSlots.length);
        const timeIndex = slotIndex % timeSlots.length;
        
        if (dayIndex < days.length) {
          const slotId = `${days[dayIndex]}-${timeSlots[timeIndex]}`;
          
          const availableFaculty = mockFaculty.filter((f) => f.subjects.includes(subject.id));
          const assignedFaculty = availableFaculty[0] || mockFaculty[0];
          
          const availableRooms = mockRooms.filter((r) => 
            subject.type === "lab" ? r.type === "lab" : r.type === "lecture"
          );
          const assignedRoom = availableRooms[Math.floor(Math.random() * availableRooms.length)] || mockRooms[0];

          newSchedule.set(slotId, {
            id: slotId,
            day: days[dayIndex],
            startTime: timeSlots[timeIndex].split("-")[0],
            endTime: timeSlots[timeIndex].split("-")[1],
            subjectId: subject.id,
            facultyId: assignedFaculty.id,
            roomId: assignedRoom.id,
            sectionId: "section-1",
            semesterId: "semester-1",
            type: subject.type === "lab" ? "lab" : "lecture",
          });
          
          slotIndex++;
        }
      }
    });

    setSchedule(newSchedule);
    addToHistory(newSchedule);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h1 className="text-3xl font-bold">Class Schedule</h1>
          <p className="text-muted-foreground mt-1">
            Drag and drop subjects to create your timetable
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <Button variant="outline" size="sm" onClick={handleUndo} disabled={historyIndex <= 0}>
            <Undo2 className="h-4 w-4" />
            Undo
          </Button>
          <Button variant="outline" size="sm" onClick={handleRedo} disabled={historyIndex >= history.length - 1}>
            <Redo2 className="h-4 w-4" />
            Redo
          </Button>
          <Button variant="outline" size="sm" onClick={handleAutoGenerate}>
            <Sparkles className="h-4 w-4" />
            Auto-Generate
          </Button>
          <Button variant="outline" size="sm">
            <Upload className="h-4 w-4" />
            Import
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4" />
            Export
          </Button>
          <Button size="sm">
            <Save className="h-4 w-4" />
            Save Timetable
          </Button>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Total Classes</p>
          </div>
          <p className="text-2xl font-bold mt-2">{schedule.size}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {schedule.size} / {days.length * timeSlots.length} slots filled
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            {conflictCount > 0 ? (
              <AlertTriangle className="h-5 w-5 text-destructive" />
            ) : (
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            )}
            <p className="text-sm font-medium">Conflicts</p>
          </div>
          <p className="text-2xl font-bold mt-2">{conflictCount}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {conflictCount === 0 ? "No conflicts found" : "Need resolution"}
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Faculty</p>
          </div>
          <p className="text-2xl font-bold mt-2">{mockFaculty.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Set(Array.from(schedule.values()).map(s => s.facultyId)).size} assigned
          </p>
        </div>

        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2">
            <Building2 className="h-5 w-5 text-primary" />
            <p className="text-sm font-medium">Rooms</p>
          </div>
          <p className="text-2xl font-bold mt-2">{mockRooms.length}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {new Set(Array.from(schedule.values()).map(s => s.roomId)).size} in use
          </p>
        </div>
      </div>

      {/* View Tabs */}
      <div className="flex items-center gap-2 border-b">
        <Button
          variant={selectedView === "grid" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedView("grid")}
        >
          <Calendar className="h-4 w-4" />
          Grid View
        </Button>
        <Button
          variant={selectedView === "faculty" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedView("faculty")}
        >
          <Users className="h-4 w-4" />
          Faculty View
        </Button>
        <Button
          variant={selectedView === "room" ? "default" : "ghost"}
          size="sm"
          onClick={() => setSelectedView("room")}
        >
          <Building2 className="h-4 w-4" />
          Room View
        </Button>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-[280px_1fr]">
        {/* Subjects Panel */}
        <div className="lg:sticky lg:top-20 lg:h-[calc(100vh-140px)]">
          <div className="rounded-lg border bg-card">
            <div className="border-b p-4">
              <div className="flex items-center justify-between">
                <h2 className="font-semibold">Available Subjects</h2>
                <Badge variant="secondary">{mockSubjects.length}</Badge>
              </div>
              <p className="text-xs text-muted-foreground mt-1">
                Drag subjects to the timetable
              </p>
            </div>

            <ScrollArea className="h-[calc(100vh-250px)] p-4">
              <div className="space-y-2">
                {mockSubjects.map((subject) => (
                  <DraggableSubject key={subject.id} subject={subject} />
                ))}
              </div>
            </ScrollArea>
          </div>
        </div>

        {/* Timetable Grid */}
        <div className="rounded-lg border bg-card p-6">
          <TimetableGrid
            days={days}
            timeSlots={timeSlots}
            schedule={schedule}
            subjects={subjects}
            onSlotAdd={handleSlotAdd}
            onSlotRemove={handleSlotRemove}
            getConflicts={getConflicts}
            getFacultyName={getFacultyName}
            getRoomName={getRoomName}
          />
        </div>
      </div>
    </div>
  );
}
