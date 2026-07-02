import AdminDashboard from "../Pages/AdminPages/AdminDashboard";
import AdminView from "../Pages/AdminPages/AdminView";
import AddAdmin from "../Pages/AdminPages/AddAdmin";
import EditAdmin from "../Pages/AdminPages/EditAdmin";
import TeacherView from "../Pages/AdminPages/TeacherView";
import AddTeacher from "../Pages/AdminPages/AddTeacher";
import EditTeacher from "../Pages/AdminPages/EditTeacher";
import StudentView from "../Pages/AdminPages/StudentView";
import AddStudent from "../Pages/AdminPages/AddStudent";
import EditStudent from "../Pages/AdminPages/EditStudent";
import CoursesView from "../Pages/AdminPages/CoursesView";
import { Route } from "react-router-dom";
import DepartmentView from "../Pages/AdminPages/DepartmentView";
import AddDepartment from "../Pages/AdminPages/AddDepartment";
import ErrorPage from "../Pages/ErrorPage";

const AdminRoutes = () => {
  return (
    <>
      <Route path="*" element={<ErrorPage role="admin" />} />
      <Route index element={<AdminDashboard />} />
      <Route path="adminView" element={<AdminView />} />
      <Route path="addAdmin" element={<AddAdmin />} />
      <Route path="editAdmin/:id" element={<EditAdmin />} />
      <Route path="teacherView" element={<TeacherView />} />
      <Route path="addTeacher" element={<AddTeacher />} />
      <Route path="editTeacher/:id" element={<EditTeacher />} />
      <Route path="studentView" element={<StudentView />} />
      <Route path="addStudent" element={<AddStudent />} />
      <Route path="editStudent/:id" element={<EditStudent />} />
      <Route path="courseView" element={<CoursesView />} />
      <Route path="departmentView" element={<DepartmentView />} />
      <Route path="addDepartment" element={<AddDepartment />} />
    </>
  );
};

export default AdminRoutes;
