import { Route } from "react-router-dom";
import TeacherDashboard from "../Pages/TeacherPages/TeacherDashboard";
import AddCourse from "../Pages/TeacherPages/AddCourse";
import EditCourse from "../Pages/TeacherPages/EditCourse";
import CourseStudents from "../Pages/TeacherPages/CourseStudents";
import CourseMaterial from "../Pages/TeacherPages/CourseMaterial";
import AddMaterial from "../Pages/TeacherPages/AddMaterial";
import CoursesView from "../Pages/TeacherPages/CourseView";
import CourseContent from "../Pages/TeacherPages/CourseContent";
import QuizTab from "../Pages/TeacherPages/QuizTab";
import EditQuiz from "../Pages/TeacherPages/EditQuiz";
import AddQuiz from "../Pages/TeacherPages/AddQuiz";
import AddQuestions from "../Pages/TeacherPages/AddQuestions";
import CourseQuizes from "../Pages/TeacherPages/CourseQuizes";
import QuizResults from "../Pages/TeacherPages/QuizResults";
import TaskTab from "../Pages/TeacherPages/TaskTab";
import AddTask from "../Pages/TeacherPages/AddTask";
import EditTask from "../Pages/TeacherPages/EditTask";
import CourseTasks from "../Pages/TeacherPages/CourseTasks";
import TaskResults from "../Pages/TeacherPages/TaskResults";
import ViewTask from "../Pages/TeacherPages/ViewTask";
import ErrorPage from "../Pages/ErrorPage";

const TeacherRoutes = () => {
  return (
    <>
      <Route path="*" element={<ErrorPage role="teacher" />} />
      <Route index element={<TeacherDashboard />} />
      <Route path="courseView" element={<CoursesView />} />
      <Route path="addCourse" element={<AddCourse />} />
      <Route path="editCourse/:id" element={<EditCourse />} />
      <Route path="courseContent/:id" element={<CourseContent />} />
      <Route path="courseStudents/:id" element={<CourseStudents />} />
      <Route path="courseMaterial/:id" element={<CourseMaterial />} />
      <Route path="addMaterial/:id" element={<AddMaterial />} />
      <Route path="teacherQuizes" element={<QuizTab />} />
      <Route path="editQuiz/:id" element={<EditQuiz />} />
      <Route path="addQuiz" element={<AddQuiz />} />
      <Route path="addQuestions" element={<AddQuestions />} />
      <Route path="courseQuizes/:id" element={<CourseQuizes />} />
      <Route path="quizResults/:id" element={<QuizResults />} />
      <Route path="teacherTasks" element={<TaskTab />} />
      <Route path="addTask" element={<AddTask />} />
      <Route path="editTask/:id" element={<EditTask />} />
      <Route path="courseTasks/:id" element={<CourseTasks />} />
      <Route path="taskResults/:id" element={<TaskResults />} />
      <Route path="viewTask/:id" element={<ViewTask />} />
    </>
  );
};

export default TeacherRoutes;
