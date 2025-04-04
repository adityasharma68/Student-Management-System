"use client";

import type { Subject } from "@/lib/types";
import { calculateAttendancePercentage } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface SubjectListProps {
  subjects: Subject[];
  userId: string;
  onSelectSubject: (subject: Subject) => void;
}

export default function SubjectList({
  subjects,
  userId,
  onSelectSubject,
}: SubjectListProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {subjects.map((subject) => {
        const attendancePercentage = calculateAttendancePercentage(
          subject,
          userId
        );

        return (
          <Card
            key={subject.id}
            className="bg-[#CFCEFF] hover:bg-[#FAE27C] transition-colors cursor-pointer"
            onClick={() => onSelectSubject(subject)}
          >
            <CardContent className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg">{subject.name}</h3>
                  <p className="text-sm text-gray-700">{subject.code}</p>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-bold">
                    {attendancePercentage}%
                  </span>
                  <p className="text-sm text-gray-700">Attendance</p>
                </div>
              </div>

              <Progress
                value={attendancePercentage}
                className="h-2 bg-white"
                indicatorClassName={
                  attendancePercentage >= 75
                    ? "bg-[#4CAF50]"
                    : attendancePercentage >= 50
                    ? "bg-amber-500"
                    : "bg-[#F44336]"
                }
              />

              <div className="mt-4 text-sm">
                <p>{subject.lectures.length} lectures</p>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
