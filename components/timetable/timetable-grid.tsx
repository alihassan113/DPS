"use client";

import * as React from "react";
import { DndContext, DragEndEvent, DragOverlay, DragStartEvent } from "@dnd-kit/core";
import { TimeSlot } from "./time-slot";
import { DraggableSubject } from "./draggable-subject";
import { Subject, TimeSlot as TimeSlotType, TimetableConflict } from "@/types";
import { cn } from "@/lib/utils";

interface TimetableGridProps {
  days: string[];
  timeSlots: string[];
  schedule: Map<string, TimeSlotType>;
  subjects: Map<string, Subject>;
  onSlotAdd: (slotId: string, subject: Subject) => void;
  onSlotRemove: (slotId: string) => void;
  getConflicts: (slotId: string) => TimetableConflict[];
  getFacultyName: (facultyId: string) => string;
  getRoomName: (roomId: string) => string;
}

export function TimetableGrid({
  days,
  timeSlots,
  schedule,
  subjects,
  onSlotAdd,
  onSlotRemove,
  getConflicts,
  getFacultyName,
  getRoomName,
}: TimetableGridProps) {
  const [activeSubject, setActiveSubject] = React.useState<Subject | null>(null);

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    if (active.data.current?.type === "subject") {
      setActiveSubject(active.data.current.subject);
    }
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.data.current?.type === "subject") {
      const subject = active.data.current.subject as Subject;
      onSlotAdd(over.id as string, subject);
    }

    setActiveSubject(null);
  };

  const getSlotId = (day: string, time: string) => `${day}-${time}`;

  return (
    <DndContext onDragStart={handleDragStart} onDragEnd={handleDragEnd}>
      <div className="overflow-x-auto">
        <div className="inline-block min-w-full">
          {/* Header Row */}
          <div className="grid grid-cols-[100px_repeat(5,1fr)] gap-2 mb-2">
            <div className="h-10 flex items-center justify-center font-semibold text-sm">
              Time
            </div>
            {days.map((day) => (
              <div
                key={day}
                className="h-10 flex items-center justify-center font-semibold text-sm bg-primary/10 rounded-lg"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Time Slots Grid */}
          <div className="space-y-2">
            {timeSlots.map((time) => (
              <div
                key={time}
                className="grid grid-cols-[100px_repeat(5,1fr)] gap-2"
              >
                {/* Time Label */}
                <div className="flex items-center justify-center text-xs font-medium text-muted-foreground bg-muted/50 rounded-lg">
                  {time}
                </div>

                {/* Day Slots */}
                {days.map((day) => {
                  const slotId = getSlotId(day, time);
                  const slot = schedule.get(slotId);
                  const subject = slot ? subjects.get(slot.subjectId) : undefined;
                  const conflicts = getConflicts(slotId);

                  return (
                    <TimeSlot
                      key={slotId}
                      id={slotId}
                      day={day}
                      time={time}
                      slot={slot}
                      subject={subject}
                      facultyName={slot ? getFacultyName(slot.facultyId) : undefined}
                      roomName={slot ? getRoomName(slot.roomId) : undefined}
                      conflicts={conflicts}
                      onRemove={() => onSlotRemove(slotId)}
                    />
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Drag Overlay */}
      <DragOverlay>
        {activeSubject ? (
          <div
            className="rounded-lg border p-3 shadow-2xl bg-background"
            style={{
              borderLeftWidth: "4px",
              borderLeftColor: activeSubject.color,
            }}
          >
            <p className="text-sm font-semibold" style={{ color: activeSubject.color }}>
              {activeSubject.code}
            </p>
            <p className="text-xs text-muted-foreground">{activeSubject.name}</p>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}
