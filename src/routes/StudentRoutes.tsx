import { Route } from "react-router-dom";
import StudentDashboard from "../Pages/StudentPages/StudentDashboard";
import CoursesView from "../Pages/StudentPages/CourseView";
import CourseContent from "../Pages/StudentPages/CourseContent";
import CourseMaterial from "../Pages/StudentPages/CourseMaterial";
import JoinCourse from "../Pages/StudentPages/JoinCourse";
import StudentCourseQuizes from "../Pages/StudentPages/CourseQuizes";
import TakeQuiz from "../Pages/StudentPages/TakeQuiz";
import EndQuiz from "../Pages/StudentPages/EndQuiz";
import StudentCourseTasks from "../Pages/StudentPages/CourseTasks";
import ViewTask from "../Pages/StudentPages/ViewTask";
import SubmitTask from "../Pages/StudentPages/SubmitTask";
import ViewQuestions from "../Pages/StudentPages/ViewQuestions";
import ErrorPage from "../Pages/ErrorPage";

const StudentRoutes = () => {
  return (
    <>
      <Route index element={<StudentDashboard />} />
      <Route path="courseView" element={<CoursesView />} />
      <Route path="courseContent/:id" element={<CourseContent />} />
      <Route path="courseMaterial/:id" element={<CourseMaterial />} />
      <Route path="joinCourse" element={<JoinCourse />} />
      <Route path="courseQuizes/:id" element={<StudentCourseQuizes />} />
      <Route path="takeQuiz/:id" element={<TakeQuiz />} />
      <Route path="endQuiz" element={<EndQuiz />} />
      <Route path="viewQuestions/:id" element={<ViewQuestions />} />
      <Route path="courseTasks/:id" element={<StudentCourseTasks />} />
      <Route path="viewSubmission/:id" element={<ViewTask />} />
      <Route path="submitTask/:id" element={<SubmitTask />} />
      <Route path="*" element={<ErrorPage role="student" />} />
    </>
  );
};

export default StudentRoutes;
