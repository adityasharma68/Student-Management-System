import type { Subject } from "@/lib/types";
import { calculateOverallAttendance } from "@/lib/mock-data";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

interface StatisticsProps {
  subjects: Subject[];
  userId: string;
}

export default function Statistics({ subjects, userId }: StatisticsProps) {
  const overallAttendance = calculateOverallAttendance(subjects, userId);

  const totalLectures = subjects.reduce(
    (sum, subject) => sum + subject.lectures.length,
    0
  );
  const attendedLectures = subjects.reduce((sum, subject) => {
    return (
      sum +
      subject.lectures.filter(
        (lecture) => lecture.attendance && lecture.attendance[userId] === true
      ).length
    );
  }, 0);

  return (
    <Card className="bg-gradient-to-r from-[#CFCEFF]/30 to-[#FAE27C]/30">
      <CardContent className="p-6">
        <div className="flex flex-col md:flex-row justify-between md:items-end gap-4">
          <div>
            <h2 className="text-xl font-bold mb-1">Overall Attendance</h2>
            <p className="text-sm text-gray-600">
              Attended {attendedLectures} out of {totalLectures} lectures
            </p>
          </div>
          <div className="text-3xl font-bold">{overallAttendance}%</div>
        </div>

        <div className="mt-4">
          <Progress
            value={overallAttendance}
            className="h-4"
            indicatorClassName="bg-gradient-to-r from-[#CFCEFF] to-[#FAE27C]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
