import type { ReactNode } from "react";

export interface IUser {
  _id: string;
  avatar: string;
  name: string;
  role: string;
  email: string;
}

export interface ISideBarList {
  id: string;
  name: string;
  icon: ReactNode;
  path: string;
}

export interface IDashboardTopBoxes {
  id: string;
  mainTxt: string;
  number: number;
  icon: ReactNode;
  iconBackGround: string;
}
export interface ICourseContentList {
  id: string;
  txt: "course students" | "Quizes" | "tasks" | "material" | "Discussions";
  icon: ReactNode;
  number: number;
  linkOfNextPage: string;
}

export interface ICourse {
  _id: string;
  name: string;
  department: string;
  year: number;
  code?: string;
  quizes: number;
  tasks: number;
  createdBy: {
    _id: string;
    name: string;
    email: string;
  };
  isArchived: boolean;
  cover?: string;
  students?: [];
  quizzesCount: number;
  tasksCount: number;
  materialsCount: number;
  discussionsCount: number;
}

export type UserRole = "admin" | "teacher" | "student";

export interface IUserProfile {
  name: string;
  email: string;
  role: UserRole;
  department?: string;
  year?: number;
  joinedAt: string;
}

export interface IQuiz {
  id: number;
  coursename: string;
  quizname: string;
  duedate: string;
  quesnum: number;
  status: string;
  timelimit: string;
}

export interface IQuizzes {
  _id: string;
  courseId: string;
  title: string;
  status: "active" | "closed";
  questionsCount: number;
  timeLimit: number;
  dueDate: string;
  completionStatus?: "completed" | "notcompleted";
  score: string;
}

export interface IQuizResult {
  _id: string;
  studentId: {
    name: string;
    email: string;
    _id: string;
  };
  completionStatus: string;
  score: number;
}

export interface ITask {
  _id: string;
  courseId: string;
  createdAt: string;
  createdBy: string;
  description: string;
  dueDate: string;
  status: "active" | "closed";
  title: string;
  updatedAt: string;
  isSubmitted: boolean;
  completionStatus: string;
}

export interface ITeacherTask {
  _id: string;
  courseId: {
    _id: string;
    name: string;
  };
  createdAt: string;
  createdBy: string;
  description: string;
  dueDate: string;
  status: "active" | "closed";
  title: string;
  updatedAt: string;
}

export interface ITaskResult {
  _id: string;
  assignmentId: string;
  completionStatus: string;
  createdAt: string;
  studentId: { _id: string; name: string; email: string };
  submittedAt: string;
  submittedFile: string;
  submittedText: string;
  updatedAt: string;
}

export interface IStudentQuiz {
  id: string;
  quizname: string;
  timelimit: number;
  duedate: string;
  quesnum: number;
  status: "completed" | "not completed";
  score: number;
}

export interface IStudentTask {
  id: number;
  taskname: string;
  duedate: string;
  description: string;
  status: "completed" | "not completed";
  action: "Approved" | "no Action" | "Not Approved";
}

export interface IUserPRofile {
  name: string;
  email: string;
  avatar: string;
  role: string;
}

export interface IMaterial {
  _id: string;
  courseId: string;
  title: string;
  file: string;
  fileType: string;
  uploadedAt: string;
  createdAt?: string;
}

export interface IQuizQuestion {
  _id: string;
  text: string;
  options: string[];
  points: number;
}

export interface ITeacherQuiz {
  _id: string;
  courseId: { _id: string; name: string };
  createdAt: string;
  createdBy: string;
  dueDate: string;
  questionsCount: number;
  status: string;
  timeLimit: number;
  title: string;
  updatedAt: string;
}

export interface ISubmittedTask {
  success: boolean;
  submission: {
    _id: string;
    assignmentId: string;
    studentId: {
      _id: string;
      name: string;
      email: string;
    };
    submittedFile: string;
    submittedText: string;
    completionStatus: string;
    submittedAt: string;
  };
}
