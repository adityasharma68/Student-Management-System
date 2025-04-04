"use client";

import { useState } from "react";
import type { User, Subject } from "@/lib/types";
import { mockSubjects, mockUser } from "@/lib/mock-data";
import SubjectList from "@/components/subject-list";
import SubjectDetail from "@/components/subject-detail";
import Statistics from "@/components/statistics";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { DatePickerWithRange } from "@/components/date-range-picker";
import { UserNav } from "@/components/user-nav";

export default function AttendancePage() {
  const [user, setUser] = useState<User>(mockUser);
  const [subjects, setSubjects] = useState<Subject[]>(mockSubjects);
  const [selectedSubject, setSelectedSubject] = useState<Subject | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [dateRange, setDateRange] = useState<{
    from: Date | undefined;
    to: Date | undefined;
  }>({
    from: undefined,
    to: undefined,
  });

  const filteredSubjects = subjects.filter((subject) =>
    subject.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleMarkAttendance = (
    subjectId: string,
    lectureId: string,
    status: boolean
  ) => {
    if (user.role === "student") return;

    setSubjects((prevSubjects) =>
      prevSubjects.map((subject) => {
        if (subject.id === subjectId) {
          return {
            ...subject,
            lectures: subject.lectures.map((lecture) => {
              if (lecture.id === lectureId) {
                return {
                  ...lecture,
                  attendance: {
                    ...(lecture.attendance || {}),
                    [user.id]: status,
                  },
                };
              }
              return lecture;
            }),
          };
        }
        return subject;
      })
    );
  };

  return (
    <div className="min-h-screen bg-white">
      <header className="border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <h1 className="text-2xl font-bold">Attendance Management</h1>
          <UserNav user={user} />
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        <div className="mb-8">
          <Statistics subjects={subjects} userId={user.id} />
        </div>

        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input
              placeholder="Search subjects..."
              className="pl-8 bg-white"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <DatePickerWithRange date={dateRange} setDate={setDateRange} />
        </div>

        {selectedSubject ? (
          <SubjectDetail
            subject={selectedSubject}
            userId={user.id}
            userRole={user.role}
            onBack={() => setSelectedSubject(null)}
            onMarkAttendance={handleMarkAttendance}
            dateRange={dateRange}
          />
        ) : (
          <SubjectList
            subjects={filteredSubjects}
            userId={user.id}
            onSelectSubject={setSelectedSubject}
          />
        )}
      </main>
    </div>
  );
}
