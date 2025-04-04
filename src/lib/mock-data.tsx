import type { User, Subject } from "./types";

export const mockUser: User = {
  id: "user1",
  name: "John Doe",
  role: "teacher",
  avatar: "/placeholder.svg?height=40&width=40",
};

// Helper function to generate random attendance
const generateAttendance = (userIds: string[]) => {
  const attendance: { [key: string]: boolean } = {};
  userIds.forEach((id) => {
    attendance[id] = Math.random() > 0.2;
  });
  return attendance;
};

// Generate dates for the past 30 days
const generateDates = (count: number) => {
  const dates: Date[] = [];
  const today = new Date();

  for (let i = 0; i < count; i++) {
    const date = new Date();
    date.setDate(today.getDate() - i);
    dates.push(date);
  }

  return dates;
};

const userIds = ["user1", "user2", "user3", "user4", "user5"];
const dates = generateDates(30);

export const mockSubjects: Subject[] = [
  {
    id: "subject1",
    name: "Mathematics",
    code: "MATH101",
    lectures: dates.slice(0, 10).map((date, index) => ({
      id: `math-lecture-${index}`,
      date,
      title: `Lecture ${index + 1}: Algebra Fundamentals`,
      attendance: generateAttendance(userIds),
    })),
  },
  {
    id: "subject2",
    name: "Physics",
    code: "PHYS101",
    lectures: dates.slice(0, 8).map((date, index) => ({
      id: `physics-lecture-${index}`,
      date,
      title: `Lecture ${index + 1}: Mechanics`,
      attendance: generateAttendance(userIds),
    })),
  },
  {
    id: "subject3",
    name: "Computer Science",
    code: "CS101",
    lectures: dates.slice(0, 12).map((date, index) => ({
      id: `cs-lecture-${index}`,
      date,
      title: `Lecture ${index + 1}: Data Structures`,
      attendance: generateAttendance(userIds),
    })),
  },
  {
    id: "subject4",
    name: "Chemistry",
    code: "CHEM101",
    lectures: dates.slice(0, 9).map((date, index) => ({
      id: `chem-lecture-${index}`,
      date,
      title: `Lecture ${index + 1}: Organic Chemistry`,
      attendance: generateAttendance(userIds),
    })),
  },
  {
    id: "subject5",
    name: "Biology",
    code: "BIO101",
    lectures: dates.slice(0, 11).map((date, index) => ({
      id: `bio-lecture-${index}`,
      date,
      title: `Lecture ${index + 1}: Cell Structure`,
      attendance: generateAttendance(userIds),
    })),
  },
  {
    id: "subject6",
    name: "History",
    code: "HIST101",
    lectures: dates.slice(0, 7).map((date, index) => ({
      id: `hist-lecture-${index}`,
      date,
      title: `Lecture ${index + 1}: World War II`,
      attendance: generateAttendance(userIds),
    })),
  },
];

// Helper function to calculate attendance percentage
export const calculateAttendancePercentage = (
  subject: Subject,
  userId: string
): number => {
  const totalLectures = subject.lectures.length;
  if (totalLectures === 0) return 0;

  const attendedLectures = subject.lectures.filter(
    (lecture) => lecture.attendance && lecture.attendance[userId] === true
  ).length;
  return Math.round((attendedLectures / totalLectures) * 100);
};

// Helper function to calculate overall attendance percentage
export const calculateOverallAttendance = (
  subjects: Subject[],
  userId: string
): number => {
  const totalLectures = subjects.reduce(
    (sum, subject) => sum + subject.lectures.length,
    0
  );
  if (totalLectures === 0) return 0;

  const attendedLectures = subjects.reduce((sum, subject) => {
    return (
      sum +
      subject.lectures.filter(
        (lecture) => lecture.attendance && lecture.attendance[userId] === true
      ).length
    );
  }, 0);

  return Math.round((attendedLectures / totalLectures) * 100);
};
