import {
  Book,
  ClipboardList,
  FileQuestionMark,
  GraduationCap,
  Laptop,
  LayoutGrid,
  MessageCircle,
  SquareUser,
  UserRoundCog,
  Users,
} from "lucide-react";
import type {
  ICourseContentList,
  IDashboardTopBoxes,
  IQuiz,
  ISideBarList,
} from "../interfaces";
import { v4 as uuidv4 } from "uuid";

export const adminSideBarList: ISideBarList[] = [
  {
    id: uuidv4(),
    name: "dashboard",
    icon: <LayoutGrid />,
    path: "/admin",
  },
  {
    id: uuidv4(),
    name: "admins",
    icon: <UserRoundCog />,
    path: "/admin/adminView",
  },
  {
    id: uuidv4(),
    name: "teachers",
    icon: <SquareUser />,
    path: "/admin/teacherView",
  },
  {
    id: uuidv4(),
    name: "students",
    icon: <Users />,
    path: "/admin/studentView",
  },
  {
    id: uuidv4(),
    name: "courses",
    icon: <Laptop />,
    path: "/admin/courseView",
  },
  {
    id: uuidv4(),
    name: "departments",
    icon: <Laptop />,
    path: "/admin/departmentView",
  },
];

export const teacherSideBarList: ISideBarList[] = [
  {
    id: uuidv4(),
    name: "dashboard",
    icon: <LayoutGrid />,
    path: "/teacher",
  },
  {
    id: uuidv4(),
    name: "courses",
    icon: <Laptop />,
    path: "/teacher/courseView",
  },
  {
    id: uuidv4(),
    name: "Quizes",
    icon: <FileQuestionMark />,
    path: "/teacher/teacherQuizes",
  },
  {
    id: uuidv4(),
    name: "Tasks",
    icon: <ClipboardList />,
    path: "/teacher/teacherTasks",
  },
];

export const studentSideBarList: ISideBarList[] = [
  {
    id: uuidv4(),
    name: "dashboard",
    icon: <LayoutGrid />,
    path: "/student",
  },
  {
    id: uuidv4(),
    name: "courses",
    icon: <Laptop />,
    path: "/student/courseView",
  },
];

export const adminDashboardTopBoxes: IDashboardTopBoxes[] = [
  {
    id: uuidv4(),
    mainTxt: "total Students",
    number: 2000,
    icon: <GraduationCap size={30} color="white" />,
    iconBackGround: "#4361EE",
  },
  {
    id: uuidv4(),
    mainTxt: "total Teachers",
    number: 20,
    icon: <SquareUser size={28} color="white" />,
    iconBackGround: "#7209B7",
  },
  {
    id: uuidv4(),
    mainTxt: "total courses",
    number: 84,
    icon: <Laptop size={30} color="white" />,
    iconBackGround: "#F72585",
  },
];

export const teacherDashboardTopBoxes: IDashboardTopBoxes[] = [
  {
    id: uuidv4(),
    mainTxt: "Students",
    number: 2000,
    icon: <GraduationCap size={30} color="white" />,
    iconBackGround: "#4361EE",
  },
  {
    id: uuidv4(),
    mainTxt: "Courses",
    number: 20,
    icon: <Laptop size={30} color="white" />,
    iconBackGround: "#7209B7",
  },
  {
    id: uuidv4(),
    mainTxt: "Tasks",
    number: 84,
    icon: <ClipboardList size={30} color="white" />,
    iconBackGround: "#F72585",
  },
  {
    id: uuidv4(),
    mainTxt: "Quizes",
    number: 84,
    icon: <FileQuestionMark size={30} color="white" />,
    iconBackGround: "#F72585",
  },
];
export const studentDashboardTopBoxes: IDashboardTopBoxes[] = [
  {
    id: uuidv4(),
    mainTxt: "Courses",
    number: 20,
    icon: <Laptop size={30} color="white" />,
    iconBackGround: "#7209B7",
  },
  {
    id: uuidv4(),
    mainTxt: "Tasks",
    number: 84,
    icon: <ClipboardList size={30} color="white" />,
    iconBackGround: "#F72585",
  },
  {
    id: uuidv4(),
    mainTxt: "Quizes",
    number: 84,
    icon: <FileQuestionMark size={30} color="white" />,
    iconBackGround: "#F72585",
  },
];

export const DashboardBottomBoxes = [
  { id: uuidv4(), text: "Courses Progress :", number: 90 },
  { id: uuidv4(), text: "Attendance Progress :", number: 97 },
  { id: uuidv4(), text: "Assignment Progress :", number: 10 },
  { id: uuidv4(), text: "Student Progress :", number: 50 },
];

export const teacherCourseContentList: ICourseContentList[] = [
  {
    id: uuidv4(),
    icon: <Users size={30} />,
    txt: "course students",
    number: 80,
    linkOfNextPage: "/teacher/courseStudents",
  },
  {
    id: uuidv4(),
    icon: <Book size={30} />,
    txt: "material",
    number: 10,
    linkOfNextPage: "/teacher/courseMaterial",
  },
  {
    id: uuidv4(),
    icon: <FileQuestionMark size={30} />,
    txt: "Quizes",
    number: 2,
    linkOfNextPage: "/teacher/courseQuizes",
  },
  {
    id: uuidv4(),
    icon: <ClipboardList size={30} />,
    txt: "tasks",
    number: 3,
    linkOfNextPage: "/teacher/courseTasks",
  },
];

export const studentCourseContentList: ICourseContentList[] = [
  {
    id: uuidv4(),
    icon: <Book size={30} />,
    txt: "material",
    number: 10,
    linkOfNextPage: "/student/courseMaterial",
  },
  {
    id: uuidv4(),
    icon: <FileQuestionMark size={30} />,
    txt: "Quizes",
    number: 2,
    linkOfNextPage: "/student/courseQuizes",
  },
  {
    id: uuidv4(),
    icon: <ClipboardList size={30} />,
    txt: "tasks",
    number: 3,
    linkOfNextPage: "/student/courseTasks",
  },
  {
    id: uuidv4(),
    icon: <MessageCircle size={30} />,
    txt: "Discussions",
    number: 80,
    linkOfNextPage: "/student/courseContent",
  },
];

export const quizesBoxes = [
  { id: uuidv4(), name: "Lec1 quiz" },
  { id: uuidv4(), name: "Lec2 quiz" },
  { id: uuidv4(), name: "Lec3 quiz" },
  { id: uuidv4(), name: "Lec4 quiz" },
];

export const tasksBoxes = [
  { id: uuidv4(), name: "Lec1 quiz" },
  { id: uuidv4(), name: "Lec2 quiz" },
  { id: uuidv4(), name: "Lec3 quiz" },
  { id: uuidv4(), name: "Lec4 quiz" },
];

export const quizes: IQuiz[] = [
  {
    id: 1,
    quizname: "CCNA-Lec3",
    coursename: "CCNA",
    duedate: "----",
    quesnum: 10,
    status: "Published",
    timelimit: "30m",
  },
];

export const advTableHeads = {
  quizTableHead: [
    { id: uuidv4(), text: "quiz name" },
    { id: uuidv4(), text: "course name" },
    { id: uuidv4(), text: "time-limit" },
    { id: uuidv4(), text: "due-date" },
    { id: uuidv4(), text: "Question num" },
    { id: uuidv4(), text: "status" },
    { id: uuidv4(), text: "" },
  ],
  quizResultsTableHead: [
    { id: uuidv4(), text: "student name" },
    { id: uuidv4(), text: "student email" },
    { id: uuidv4(), text: "status" },
    { id: uuidv4(), text: "score" },
  ],
  taskTableHead: [
    { id: uuidv4(), text: "Task name" },
    { id: uuidv4(), text: "course name" },
    { id: uuidv4(), text: "due-date" },
    { id: uuidv4(), text: "description" },
    { id: uuidv4(), text: "" },
  ],
  taskResultsTableHead: [
    { id: uuidv4(), text: "student name" },
    { id: uuidv4(), text: "student email" },
    { id: uuidv4(), text: "status" },
    { id: uuidv4(), text: "message" },
    { id: uuidv4(), text: "" },
  ],
  studentQuizTableHead: [
    { id: uuidv4(), text: "quiz name" },
    { id: uuidv4(), text: "time-limit" },
    { id: uuidv4(), text: "due-date" },
    { id: uuidv4(), text: "Question num" },
    { id: uuidv4(), text: "status" },
    { id: uuidv4(), text: "score" },
    { id: uuidv4(), text: "action" },
    { id: uuidv4(), text: "" },
  ],
  studentTaskTableHead: [
    { id: uuidv4(), text: "task name" },
    { id: uuidv4(), text: "description" },
    { id: uuidv4(), text: "due-date" },
    { id: uuidv4(), text: "action" },
    { id: uuidv4(), text: "status" },
    { id: uuidv4(), text: "" },
  ],
};

export const quizQuestions = [
  {
    id: uuidv4(),
    question: "Ethernet is a common name to copper cable with speed equal to …",
    options: ["10 Mbps", "100 Mbps", "1000 Mbps", "10000 Mbps"],
    answer: "10 Mbps",
  },
  {
    id: uuidv4(),
    question: "Ethernet is a common name to copper cable with speed equal to …",
    options: ["10 Mbps", "100 Mbps", "1000 Mbps", "10000 Mbps"],
    answer: "10 Mbps",
  },
];
