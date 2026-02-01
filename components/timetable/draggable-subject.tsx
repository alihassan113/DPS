"use client";

import * as React from "react";
import { useDraggable } from "@dnd-kit/core";
import { CSS } from "@dnd-kit/utilities";
import { cn } from "@/lib/utils";
import { Subject } from "@/types";
import { GripVertical, BookOpen, FlaskConical } from "lucide-react";
import { Badge } from "@/components/ui/badge";

interface DraggableSubjectProps {
  subject: Subject;
}

export function DraggableSubject({ subject }: DraggableSubjectProps) {
  const { attributes, listeners, setNodeRef, transform, isDragging } =
    useDraggable({
      id: `subject-${subject.id}`,
      data: {
        type: "subject",
        subject,
      },
    });

  const style = {
    transform: CSS.Translate.toString(transform),
    backgroundColor: `${subject.color}15`,
    borderLeftColor: subject.color,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={cn(
        "flex items-center gap-2 rounded-lg border p-3 transition-all cursor-move hover:shadow-md",
        isDragging && "opacity-50 scale-95",
        "border-l-4"
      )}
    >
      <GripVertical className="h-4 w-4 text-muted-foreground shrink-0" />
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <p className="text-sm font-semibold truncate" style={{ color: subject.color }}>
            {subject.code}
          </p>
          <Badge variant="secondary" className="h-5 text-xs shrink-0">
            {subject.credits} CR
          </Badge>
        </div>
        <p className="text-xs text-muted-foreground truncate">{subject.name}</p>
      </div>

      <div className="shrink-0">
        {subject.type === "lab" ? (
          <FlaskConical className="h-4 w-4 text-purple-500" />
        ) : subject.type === "both" ? (
          <div className="flex gap-0.5">
            <BookOpen className="h-4 w-4 text-blue-500" />
            <FlaskConical className="h-4 w-4 text-purple-500" />
          </div>
        ) : (
          <BookOpen className="h-4 w-4 text-blue-500" />
        )}
      </div>
    </div>
  );
}
