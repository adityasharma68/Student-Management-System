import { z } from "zod";

export const subjectSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  teachers: z.array(z.string()), //teacher ids
});

export type SubjectSchema = z.infer<typeof subjectSchema>;

export const classSchema = z.object({
  id: z.coerce.number().optional(),
  name: z.string().min(1, { message: "Subject name is required!" }),
  capacity: z.coerce.number().min(1, { message: "Capacity name is required!" }),
  gradeId: z.coerce.number().min(1, { message: "Grade name is required!" }),
  supervisorId: z.coerce.string().optional(),
});

export type ClassSchema = z.infer<typeof classSchema>;

export const teacherSchema = z.object({
  id: z.string().optional(),

  username: z.string().regex(/^[A-Za-z][A-Za-z0-9]{2,19}$/, {
    message:
      "Username must start with a letter and be 3-20 characters long (letters and numbers only).",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" })
    .max(20, { message: "Password must be at most 20 characters!" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter!",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number!" })
    .regex(/[!@#$%^&*(),.?":{}|<>_\-+=]/, {
      message: "Password must contain at least one special character!",
    })
    .optional()
    .or(z.literal("")),

  name: z
    .string()
    .min(3, { message: "First name must be at least 3 letters!" })
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters!" }),

  surname: z
    .string()
    .min(3, { message: "Last name must be at least 3 letters!" })
    .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters!" }),

  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, {
      message: "Email must be valid and have a domain like .com or .co!",
    })
    .optional()
    .or(z.literal("")),

  phone: z
    .string()
    .regex(/^\d{10}$/, {
      message: "Phone number must be exactly 10 digits!",
    }),

  address: z.string(),

  img: z.string().optional(),

  bloodType: z.string().regex(/^(A|B|AB|O)[+-]$/, {
    message: "Blood Type must be A+, A-, B+, B-, AB+, AB-, O+, or O- only!",
  }),

  birthday: z.coerce.date({ message: "Birthday is required!" }).refine(
    (date) => {
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 20,
        today.getMonth(),
        today.getDate()
      );
      return date <= minDate;
    },
    { message: "Teacher must be at least 20 years old!" }
  ),

  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),

  subjects: z.array(z.string()).optional(), // subject ids
});


export type TeacherSchema = z.infer<typeof teacherSchema>;

export const studentSchema = z.object({
  id: z.string().optional(),

  username: z.string().regex(/^[A-Za-z][A-Za-z0-9]*$/, {
    message: "Username must start with a letter and have up to 5 digits!",
  }),

  password: z
    .string()
    .min(8, { message: "Password must be at least 8 characters!" })
    .max(20, { message: "Password must be at most 20 characters!" })
    .regex(/[A-Z]/, {
      message: "Password must contain at least one uppercase letter!",
    })
    .regex(/[0-9]/, { message: "Password must contain at least one number!" })
    .regex(/[!@#$%^&*(),.?":{}|<>_\-+=]/, {
      message: "Password must contain at least one special character!",
    }),
    // .optional(),
    // .or(z.literal("")),

  name: z
    .string()
    .min(3, { message: "First name must be at least 3 letters!" })
    .regex(/^[A-Za-z]+$/, { message: "First name must contain only letters!" }),

  surname: z
    .string()
    .min(3, { message: "Last name must be at least 3 letters!" })
    .regex(/^[A-Za-z]+$/, { message: "Last name must contain only letters!" }),

  email: z
    .string()
    .regex(/^[^\s@]+@[^\s@]+\.[A-Za-z]{2,}$/, {
      message: "Email must be valid and have a domain like .com or .co",
    })
    .optional()
    .or(z.literal("")),

  phone: z.string().regex(/^\d{10}$/, {
    message: "Phone number must be exactly 10 digits!",
  }),

  address: z.string(),

  img: z.string().optional(),

  bloodType: z.string().regex(/^(A|B|AB|O)[+-]$/, {
    message: "Blood Type must be A+, A-, B+, B-, AB+, AB-, O+, or O- only!",
  }),

  birthday: z.coerce.date({ message: "Birthday is required!" }).refine(
    (date) => {
      const today = new Date();
      const minDate = new Date(
        today.getFullYear() - 4,
        today.getMonth(),
        today.getDate()
      );
      return date <= minDate;
    },
    { message: "Student must be at least 4 years old!" }
  ),

  sex: z.enum(["MALE", "FEMALE"], { message: "Sex is required!" }),

  gradeId: z.coerce.number().min(1, { message: "Grade is required!" }),

  classId: z.coerce.number().min(1, { message: "Class is required!" }),
});

export type StudentSchema = z.infer<typeof studentSchema>;

export const examSchema = z.object({
  id: z.coerce.number().optional(),
  title: z.string().min(1, { message: "Title name is required!" }),
  startTime: z.coerce.date({ message: "Start time is required!" }),
  endTime: z.coerce.date({ message: "End time is required!" }),
  lessonId: z.coerce.number({ message: "Lesson is required!" }),
});

export type ExamSchema = z.infer<typeof examSchema>;
