"use client"

import { useState } from "react"
import type { Subject, UserRole } from "@/lib/types"
import { calculateAttendancePercentage } from "@/lib/mock-data"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { ArrowLeft, Printer, Download } from "lucide-react"
import { Switch } from "@/components/ui/switch"
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts"
import { ChartContainer } from "@/components/ui/chart"

interface SubjectDetailProps {
  subject: Subject
  userId: string
  userRole: UserRole
  onBack: () => void
  onMarkAttendance: (subjectId: string, lectureId: string, status: boolean) => void
  dateRange: { from: Date | undefined; to: Date | undefined }
}

export default function SubjectDetail({
  subject,
  userId,
  userRole,
  onBack,
  onMarkAttendance,
  dateRange,
}: SubjectDetailProps) {
  const [bulkEdit, setBulkEdit] = useState(false)
  const attendancePercentage = calculateAttendancePercentage(subject, userId)

  const canEdit = userRole === "admin" || userRole === "teacher"

  // Filter lectures based on date range
  const filteredLectures = subject.lectures.filter((lecture) => {
    if (!dateRange.from && !dateRange.to) return true

    const lectureDate = new Date(lecture.date)

    if (dateRange.from && dateRange.to) {
      return lectureDate >= dateRange.from && lectureDate <= dateRange.to
    }

    if (dateRange.from) {
      return lectureDate >= dateRange.from
    }

    if (dateRange.to) {
      return lectureDate <= dateRange.to
    }

    return true
  })

  // Sort lectures by date (newest first)
  const sortedLectures = [...filteredLectures].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  const presentCount = subject.lectures.filter(lecture => 
    lecture.attendance && lecture.attendance[userId] === true
  ).length
  const absentCount = subject.lectures.length - presentCount

  const pieData = [
    { name: "Present", value: presentCount, color: "#4CAF50" },
    { name: "Absent", value: absentCount, color: "#F44336" },
  ]

  const handlePrint = () => {
    window.print()
  }

  const handleExport = () => {
    // In a real app, this would generate a CSV or PDF
    alert("Exporting attendance data...")
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={onBack}>
            <ArrowLeft className="h-4 w-4" />
          </Button>
          <h2 className="text-2xl font-bold">{subject.name}</h2>
          <span className="text-sm text-gray-500">{subject.code}</span>
        </div>

        {canEdit && (
          <div className="flex gap-2">
            <Button variant="outline" size="sm" onClick={handlePrint}>
              <Printer className="h-4 w-4 mr-2" />
              Print
            </Button>
            <Button variant="outline" size="sm" onClick={handleExport}>
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardContent className="p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Attendance Overview</h3>
              <span className="text-lg font-bold">{attendancePercentage}%</span>
            </div>

            <Progress
              value={attendancePercentage}
              className="h-3"
              indicatorClassName={
                attendancePercentage >= 75
                  ? "bg-[#4CAF50]"
                  : attendancePercentage >= 50
                  ? "bg-amber-500"
                  : "bg-[#F44336]"
              }
            />

            <div className="mt-6">
              {canEdit && (
                <div className="flex items-center justify-end mb-4">
                  <span className="text-sm mr-2">Bulk Edit</span>
                  <Switch checked={bulkEdit} onCheckedChange={setBulkEdit} />
                </div>
              )}

              <div className="space-y-3">
                {sortedLectures.map((lecture) => {
                  const isPresent =
                    lecture.attendance && lecture.attendance[userId] === true;
                  const date = new Date(lecture.date);

                  return (
                    <div
                      key={lecture.id}
                      className="flex items-center justify-between p-3 rounded-lg border"
                    >
                      <div>
                        <p className="font-medium">{lecture.title}</p>
                        <p className="text-sm text-gray-500">
                          {date.toLocaleDateString("en-US", {
                            weekday: "short",
                            year: "numeric",
                            month: "short",
                            day: "numeric",
                          })}
                        </p>
                      </div>

                      {canEdit ? (
                        <Switch
                          checked={isPresent}
                          onCheckedChange={(checked) =>
                            onMarkAttendance(subject.id, lecture.id, checked)
                          }
                        />
                      ) : (
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            isPresent
                              ? "bg-green-100 text-green-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {isPresent ? "Present" : "Absent"}
                        </span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardContent className="p-6">
            <h3 className="font-semibold mb-4">Attendance Statistics</h3>

            <div className="h-48">
              <ChartContainer>
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {pieData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </ChartContainer>
            </div>

            <div className="mt-4 space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#4CAF50] mr-2"></div>
                  <span className="text-sm">Present</span>
                </div>
                <span className="font-medium">{presentCount} lectures</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#F44336] mr-2"></div>
                  <span className="text-sm">Absent</span>
                </div>
                <span className="font-medium">{absentCount} lectures</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}