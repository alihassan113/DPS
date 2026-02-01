"use client";

import * as React from "react";
import { useDroppable } from "@dnd-kit/core";
import { cn } from "@/lib/utils";
import { TimeSlot as TimeSlotType, Subject, TimetableConflict } from "@/types";
import { Clock, MapPin, User, X, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface TimeSlotProps {
  id: string;
  day: string;
  time: string;
  slot?: TimeSlotType;
  subject?: Subject;
  facultyName?: string;
  roomName?: string;
  conflicts?: TimetableConflict[];
  onRemove?: () => void;
  onEdit?: () => void;
}

export function TimeSlot({
  id,
  day,
  time,
  slot,
  subject,
  facultyName,
  roomName,
  conflicts = [],
  onRemove,
  onEdit,
}: TimeSlotProps) {
  const { isOver, setNodeRef } = useDroppable({
    id,
    data: {
      day,
      time,
      accepts: ["subject"],
    },
  });

  const hasErrors = conflicts.some((c) => c.severity === "error");
  const hasWarnings = conflicts.some((c) => c.severity === "warning");

  return (
    <div
      ref={setNodeRef}
      className={cn(
        "relative h-24 rounded-lg border-2 border-dashed transition-all",
        isOver && "border-primary bg-primary/5 scale-105",
        !slot && "border-muted bg-background hover:border-primary/50",
        slot && !hasErrors && !hasWarnings && "border-solid border-transparent",
        hasWarnings && "border-yellow-500 bg-yellow-50 dark:bg-yellow-950/20",
        hasErrors && "border-red-500 bg-red-50 dark:bg-red-950/20"
      )}
    >
      {!slot && (
        <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
          Drop subject here
        </div>
      )}

      {slot && subject && (
        <div
          className={cn(
            "group relative h-full rounded-lg border p-2 transition-all hover:shadow-md cursor-pointer",
            `border-l-4`,
          )}
          style={{
            backgroundColor: `${subject.color}15`,
            borderLeftColor: subject.color,
          }}
          onClick={onEdit}
        >
          {/* Remove Button */}
          <Button
            variant="ghost"
            size="icon"
            className="absolute -top-2 -right-2 h-6 w-6 rounded-full bg-destructive text-destructive-foreground opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={(e) => {
              e.stopPropagation();
              onRemove?.();
            }}
          >
            <X className="h-3 w-3" />
          </Button>

          {/* Conflict Badge */}
          {(hasErrors || hasWarnings) && (
            <div className="absolute -top-2 left-2">
              <Badge
                variant={hasErrors ? "destructive" : "warning"}
                className="h-5 gap-1 px-1.5"
              >
                <AlertTriangle className="h-3 w-3" />
                {conflicts.length}
              </Badge>
            </div>
          )}

          {/* Content */}
          <div className="flex flex-col gap-1 h-full justify-between">
            <div>
              <p className="text-xs font-bold truncate" style={{ color: subject.color }}>
                {subject.code}
              </p>
              <p className="text-xs font-medium truncate">{subject.name}</p>
            </div>

            <div className="space-y-0.5">
              {facultyName && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <User className="h-3 w-3" />
                  <span className="truncate">{facultyName}</span>
                </div>
              )}
              {roomName && (
                <div className="flex items-center gap-1 text-xs text-muted-foreground">
                  <MapPin className="h-3 w-3" />
                  <span className="truncate">{roomName}</span>
                </div>
              )}
              <div className="flex items-center gap-1 text-xs text-muted-foreground">
                <Clock className="h-3 w-3" />
                <Badge variant="secondary" className="h-4 text-xs px-1">
                  {slot.type}
                </Badge>
              </div>
            </div>
          </div>

          {/* Tooltip on hover showing conflicts */}
          {conflicts.length > 0 && (
            <div className="absolute left-0 top-full z-50 mt-2 hidden w-64 rounded-lg border bg-background p-2 shadow-lg group-hover:block">
              <p className="text-xs font-semibold mb-2">Conflicts:</p>
              {conflicts.map((conflict, idx) => (
                <div
                  key={idx}
                  className={cn(
                    "text-xs p-1.5 rounded mb-1",
                    conflict.severity === "error"
                      ? "bg-red-100 dark:bg-red-950/30 text-red-800 dark:text-red-300"
                      : "bg-yellow-100 dark:bg-yellow-950/30 text-yellow-800 dark:text-yellow-300"
                  )}
                >
                  <strong className="capitalize">{conflict.type}:</strong> {conflict.message}
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
