export type UserRole = "admin" | "teacher" | "student";

export interface User {
  id: string;
  name: string;
  role: UserRole;
  avatar?: string;
}

export interface AttendanceRecord {
  [userId: string]: boolean;
}

export interface Lecture {
  id: string;
  date: Date;
  title: string;
  attendance: AttendanceRecord;
}

export interface Subject {
  id: string;
  name: string;
  code: string;
  lectures: Lecture[];
}
