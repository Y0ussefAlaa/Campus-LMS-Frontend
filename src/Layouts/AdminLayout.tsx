import { Outlet } from "react-router-dom";
import DashboardLayout from "./DashboardLayout";

const Layout = () => {
  return (
    <DashboardLayout role="admin">
      <Outlet />
    </DashboardLayout>
  );
};

export default Layout;
