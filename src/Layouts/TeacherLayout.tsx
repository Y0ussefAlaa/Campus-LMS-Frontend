import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const TeacherLayout = () => {
  return (
    <DashboardLayout role="teacher">
      <Outlet />
    </DashboardLayout>
  );
};

export default TeacherLayout;
