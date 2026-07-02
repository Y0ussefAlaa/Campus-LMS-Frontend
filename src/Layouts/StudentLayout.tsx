import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const StudentLayout = () => {
  return (
    <DashboardLayout role="student">
      <Outlet />
    </DashboardLayout>
  );
};

export default StudentLayout;
